import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCHEMA = "causal-order-proving/result";
const SCHEMA_VERSION = 1;
const STACK_PACKAGES = [
  "causal-order",
  "@causal-order/transport",
  "@causal-order/monitor",
  "@causal-order/dedupe",
  "@causal-order/testing",
];

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function percent(numerator, denominator) {
  return denominator > 0 ? (numerator / denominator) * 100 : 0;
}

function round(value, digits = 3) {
  return Number(value.toFixed(digits));
}

function mb(bytes) {
  return round(number(bytes) / 1024 / 1024, 1);
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSummaryPath(inputPath, startedAfterMs) {
  if (inputPath) {
    const resolved = path.resolve(inputPath);
    const inputStats = await stat(resolved);
    return inputStats.isDirectory() ? path.join(resolved, "summary.json") : resolved;
  }

  const runsDir = path.resolve("artifacts", "runs");
  const entries = await readdir(runsDir, { withFileTypes: true });
  const candidates = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const summaryPath = path.join(runsDir, entry.name, "summary.json");
    if (!(await exists(summaryPath))) {
      continue;
    }
    const summaryStats = await stat(summaryPath);
    if (startedAfterMs && summaryStats.mtimeMs < startedAfterMs - 2_000) {
      continue;
    }
    candidates.push({ summaryPath, mtimeMs: summaryStats.mtimeMs });
  }

  candidates.sort((left, right) => right.mtimeMs - left.mtimeMs);
  if (candidates.length === 0) {
    throw new Error("No matching harness summary found under artifacts/runs");
  }
  return candidates[0].summaryPath;
}

async function readNdjson(filePath) {
  if (!(await exists(filePath))) {
    return [];
  }
  const text = await readFile(filePath, "utf8");
  return text
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function readPackageVersions() {
  const lock = JSON.parse(await readFile(path.resolve("package-lock.json"), "utf8"));
  return Object.fromEntries(
    STACK_PACKAGES.map((packageName) => [
      packageName,
      lock.packages?.[`node_modules/${packageName}`]?.version ?? null,
    ]),
  );
}

async function readGitCommit() {
  try {
    const gitDir = path.resolve(".git");
    const head = (await readFile(path.join(gitDir, "HEAD"), "utf8")).trim();
    if (!head.startsWith("ref: ")) {
      return head;
    }
    return (await readFile(path.join(gitDir, head.slice(5)), "utf8")).trim();
  } catch {
    return null;
  }
}

function deriveTestId(runName, override) {
  if (override) {
    return override;
  }
  const explicit = String(runName ?? "").match(/\bT\d{2}\b/iu)?.[0];
  if (explicit) {
    return explicit.toUpperCase();
  }
  if (String(runName).includes("smoke")) {
    return "SMOKE";
  }
  if (String(runName).includes("baseline")) {
    return "T01";
  }
  return "UNASSIGNED";
}

function check(id, label, actual, expected, passed) {
  return {
    id,
    label,
    status: passed ? "pass" : "review",
    actual,
    expected,
  };
}

function renderMarkdown(result) {
  const rows = result.checks
    .map(
      (entry) =>
        `| ${entry.id} | ${entry.label} | ${entry.status.toUpperCase()} | ${entry.actual} | ${entry.expected} |`,
    )
    .join("\n");
  const nodes = result.nodes
    .map(
      (node) =>
        `| ${node.nodeId} | ${node.generated} | ${node.sent} | ${node.received} | ${node.duplicatesInjected} | ${node.maxPendingQueueDepth} |`,
    )
    .join("\n");

  return `# Standard test result

| Field | Value |
| --- | --- |
| Schema | \`${result.schema}@${result.schemaVersion}\` |
| Test | ${result.identity.testId} |
| Run | ${result.identity.runName} |
| Verdict | **${String(result.result.verdict).toUpperCase()}** |
| Status | ${result.result.status} |
| Profile | ${result.configuration.profileName} |
| Nodes | ${result.configuration.nodeIds.length} |
| Wall elapsed | ${result.timing.wallElapsedMs} ms |
| Time scale | ${result.configuration.timeScale}x |

## Accounting

| Metric | Value |
| --- | ---: |
| Generated | ${result.traffic.generated} |
| Duplicates injected | ${result.traffic.duplicatesInjected} |
| Sent | ${result.traffic.sent} |
| Transport received | ${result.traffic.received} |
| Dedupe accepted | ${result.traffic.dedupeAccepted} |
| Dedupe dropped | ${result.traffic.dedupeDropped} |
| Ordered | ${result.traffic.ordered} |
| Received rate | ${result.traffic.receivedPerSecond} events/s |
| Duplicate rate | ${result.traffic.duplicateRatePercent}% |

## Checks

| ID | Check | Status | Actual | Expected |
| --- | --- | --- | --- | --- |
${rows}

## Nodes

| Node | Generated | Sent | Received | Duplicates | Max queue |
| --- | ---: | ---: | ---: | ---: | ---: |
${nodes}

## Monitor and ordering

| Metric | Value |
| --- | ---: |
| Routing modes | ${JSON.stringify(result.monitor.routingModes)} |
| Buffered | ${result.monitor.bufferedEvents} |
| Pending rows | ${result.monitor.finalPendingRows} |
| Replay state | ${result.monitor.replayState} |
| Peak operations | ${result.monitor.maxPendingOperations} |
| Anomalies | ${result.ordering.anomalies} |
| Corrections | ${result.ordering.correctionBatches} |
| Peak RSS | ${result.resources.peakRssMb} MB |
| Peak heap used | ${result.resources.peakHeapUsedMb} MB |

## Shutdown

| Metric | Value |
| --- | --- |
| Final phase | ${result.shutdown.phase} |
| Callback boundary | ${result.shutdown.transportCallbackBoundary} |
| Ordering settled | ${result.shutdown.orderingSettled} |
| Resources closed | ${result.shutdown.resourcesClosed} |
| Pending scheduled sends | ${result.shutdown.pendingScheduledSends} |
| Pending monitor operations | ${result.shutdown.pendingMonitorOperations} |

Generated from \`${result.identity.summaryPath}\` at ${result.identity.standardizedAt}.
`;
}

export async function standardizeResult(inputPath, testIdOverride, startedAfterMs) {
  const summaryPath = await resolveSummaryPath(inputPath, startedAfterMs);
  const runDir = path.dirname(summaryPath);
  const existingResultPath = path.join(runDir, "standard-result.json");
  const existingResult = (await exists(existingResultPath))
    ? JSON.parse(await readFile(existingResultPath, "utf8"))
    : null;
  const summary = JSON.parse(await readFile(summaryPath, "utf8"));
  const heartbeats = await readNdjson(path.join(runDir, "heartbeats.ndjson"));
  const monitorHeartbeats = await readNdjson(
    path.join(runDir, "monitor-heartbeats.ndjson"),
  );

  const generated = number(summary.simulation?.generated);
  const duplicatesInjected = number(summary.simulation?.duplicatesInjected);
  const sent = number(summary.simulation?.sent);
  const received = number(summary.transport?.receivedEvents);
  const dedupeAccepted = number(summary.dedupe?.acceptedEvents);
  const dedupeDropped = number(summary.dedupe?.droppedDuplicates);
  const ordered = number(summary.stream?.orderedEvents);
  const wallElapsedMs = number(summary.timing?.wallElapsedMs);
  const peakRssBytes = Math.max(0, ...heartbeats.map((entry) => number(entry.rssBytes)));
  const peakHeapUsedBytes = Math.max(
    0,
    ...heartbeats.map((entry) => number(entry.heapUsedBytes)),
  );
  const peakDedupeCacheSize = Math.max(
    number(summary.dedupe?.currentCacheSize),
    ...heartbeats.map((entry) => number(entry.dedupe?.currentCacheSize)),
  );
  const runtimeMonitorSnapshot =
    monitorHeartbeats.findLast((entry) => entry.kind === "progress")?.monitor ??
    null;
  const shutdown = summary.shutdown ?? {};
  const finalPendingRows = number(
    summary.monitor?.pendingRows ??
      summary.monitor?.lastSnapshot?.reservoir?.totalPendingRows,
  );
  const pendingMonitorOperations = number(
    shutdown.operationTracker?.pendingOperations,
  );
  const nodeStats = summary.transport?.nodeStats ?? {};
  const receivedByNode = summary.transport?.receivedByNode ?? {};

  const result = {
    schema: SCHEMA,
    schemaVersion: SCHEMA_VERSION,
    identity: {
      testId: deriveTestId(summary.config?.runName, testIdOverride),
      runName: summary.config?.runName ?? path.basename(runDir),
      runDir,
      summaryPath,
      standardizedAt:
        existingResult?.identity?.standardizedAt ?? new Date().toISOString(),
      gitCommit:
        existingResult?.identity &&
        Object.hasOwn(existingResult.identity, "gitCommit")
          ? existingResult.identity.gitCommit
          : await readGitCommit(),
      packageVersions: await readPackageVersions(),
    },
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      architecture: process.arch,
    },
    configuration: {
      durationMs: number(summary.config?.durationMs),
      steadyForMs: number(summary.config?.steadyForMs),
      timeScale: number(summary.config?.timeScale),
      profileName: summary.config?.profileName ?? null,
      adapterModule: summary.config?.adapterModule ?? null,
      monitorEnabled: Boolean(summary.config?.monitorConfig?.enabled),
      monitorScenario: summary.config?.monitorConfig?.scenarioId ?? null,
      nodeIds: summary.config?.nodeIds ?? [],
      eventsPerSecond: number(summary.config?.eventsPerSecond),
      dedupeWindowSeconds: number(summary.dedupe?.activeWindowSeconds),
    },
    timing: {
      startedAt: summary.timing?.startedAtIso ?? null,
      finishedAt: summary.timing?.finishedAtIso ?? null,
      wallElapsedMs,
      simulatedElapsedMs: number(summary.timing?.simulatedElapsedMs),
      clockDriftMs:
        number(summary.timing?.simulatedElapsedMs) - wallElapsedMs,
      interrupted: Boolean(summary.timing?.interrupted),
    },
    traffic: {
      generated,
      duplicatesInjected,
      sent,
      received,
      dedupeAccepted,
      dedupeDropped,
      ordered,
      receivedPerSecond: round(received / Math.max(wallElapsedMs / 1_000, 1)),
      duplicateRatePercent: round(percent(dedupeDropped, received)),
      generatedToSentDelta: sent - generated - duplicatesInjected,
      sentToReceivedDelta: received - sent,
      receivedToDedupeDelta: received - dedupeAccepted - dedupeDropped,
      acceptedToOrderedDelta: dedupeAccepted - ordered,
    },
    nodes: (summary.config?.nodeIds ?? []).map((nodeId) => ({
      nodeId,
      generated: number(nodeStats[nodeId]?.generated),
      sent: number(nodeStats[nodeId]?.sent),
      received: number(receivedByNode[nodeId]),
      duplicatesInjected: number(nodeStats[nodeId]?.duplicatesInjected),
      sameNodeDependencies: number(nodeStats[nodeId]?.sameNodeDependencies),
      crossNodeDependencies: number(nodeStats[nodeId]?.crossNodeDependencies),
      maxPendingQueueDepth: number(nodeStats[nodeId]?.maxPendingQueueDepth),
      darkWindowsEntered: number(nodeStats[nodeId]?.darkWindowsEntered),
      reconnects: number(nodeStats[nodeId]?.reconnects),
      jitterExtraDelaysApplied: number(
        nodeStats[nodeId]?.jitterExtraDelaysApplied,
      ),
      jitterSpikeDelaysApplied: number(
        nodeStats[nodeId]?.jitterSpikeDelaysApplied,
      ),
    })),
    transport: {
      errors: number(summary.transport?.errors),
      persistedLateArrivals: number(summary.transport?.persistedLateArrivals),
      peerStatesByStatus: summary.transport?.peerStatesByStatus ?? {},
      faultEventsByType: summary.transport?.faultEventsByType ?? {},
      callbackBoundary: shutdown.transportCallbackBoundary ?? null,
    },
    monitor: {
      enabled: Boolean(summary.monitor?.enabled),
      scenarioId: summary.monitor?.scenarioId ?? null,
      routingModes: summary.monitor?.routingModes ?? {},
      deliveryModes: summary.monitor?.deliveryModes ?? {},
      bufferedEvents: number(summary.monitor?.bufferedEvents),
      forwardedToDedupe: number(summary.monitor?.forwardedToDedupe),
      replayDeliveriesToDedupe: number(
        summary.monitor?.replayDeliveriesToDedupe,
      ),
      forwardedToOrder: number(summary.monitor?.forwardedToOrder),
      finalPendingRows,
      oldestPendingAgeMs: number(summary.monitor?.oldestPendingAgeMs),
      replayState: summary.monitor?.replayState ?? null,
      maxPendingOperations: number(
        summary.monitor?.operationTracker?.maxPendingOperations ??
          shutdown.operationTracker?.maxPendingOperations,
      ),
      runtimeFinalComponentStates:
        runtimeMonitorSnapshot?.components ?? null,
      shutdownFinalComponentStates:
        summary.monitor?.lastSnapshot?.components ?? null,
      endedDrained: Boolean(summary.monitor?.analysis?.endedDrained),
      lifecycleDroppedTotal: number(
        summary.monitor?.lifecycleSnapshot?.droppedTotal,
      ),
      admissionRefusedTotal: number(
        summary.monitor?.capacitySnapshot?.counters?.refusedTotal,
      ),
    },
    dedupe: {
      acceptedEvents: dedupeAccepted,
      droppedDuplicates: dedupeDropped,
      currentCacheSize: number(summary.dedupe?.currentCacheSize),
      peakCacheSize: peakDedupeCacheSize,
      activeWindowSeconds: number(summary.dedupe?.activeWindowSeconds),
      decisionsByReason: summary.dedupeDecisions?.byReason ?? {},
      identitySources: summary.dedupeDecisions?.byIdentitySource ?? {},
    },
    ordering: {
      orderedEvents: ordered,
      anomalies: number(summary.stream?.anomalies),
      anomaliesByType: summary.stream?.byAnomalyType ?? {},
      anomaliesBySeverity: summary.stream?.byAnomalySeverity ?? {},
      orderBasis: summary.stream?.byOrderBasis ?? {},
      confidence: summary.stream?.byConfidence ?? {},
      correctionBatches: number(summary.stream?.correctionBatches),
      batches: number(summary.stream?.batches),
      finalBatches: number(summary.stream?.finalBatches),
      lastWatermarkMs: summary.stream?.lastWatermarkMs ?? null,
    },
    resources: {
      peakRssBytes,
      peakRssMb: mb(peakRssBytes),
      peakHeapUsedBytes,
      peakHeapUsedMb: mb(peakHeapUsedBytes),
    },
    performance: {
      receivedPerSecond: round(received / Math.max(wallElapsedMs / 1_000, 1)),
      transportAcknowledgmentLatencyMs: null,
      endToEndLatencyMs: null,
      orderingLagMs: null,
      cpuUtilizationPercent: null,
      eventLoopLagMs: null,
      unavailableMetrics: [
        "transportAcknowledgmentLatencyMs",
        "endToEndLatencyMs",
        "orderingLagMs",
        "cpuUtilizationPercent",
        "eventLoopLagMs",
      ],
    },
    shutdown: {
      phase: shutdown.phase ?? null,
      completedPhases: shutdown.completedPhases ?? [],
      milestones: shutdown.milestones ?? [],
      transportCallbackBoundary: shutdown.transportCallbackBoundary ?? null,
      orderingSettled: shutdown.milestones?.includes("ordering_settled") ?? false,
      resourcesClosed: Boolean(shutdown.resourcesClosed),
      pendingScheduledSends: number(shutdown.pendingScheduledSends),
      pendingMonitorOperations,
      errors: shutdown.errors ?? [],
    },
    result: {
      status: summary.outcome?.status ?? null,
      verdict: summary.outcome?.verdict ?? null,
      verdictReasons: summary.outcome?.verdictReasons ?? [],
      failure: summary.outcome?.failure ?? null,
    },
  };

  result.checks = [
    check(
      "ACC-01",
      "generated + duplicates = sent",
      result.traffic.generatedToSentDelta,
      0,
      result.traffic.generatedToSentDelta === 0,
    ),
    check(
      "ACC-02",
      "sent = transport received",
      result.traffic.sentToReceivedDelta,
      0,
      result.traffic.sentToReceivedDelta === 0,
    ),
    check(
      "ACC-03",
      "received = accepted + dropped",
      result.traffic.receivedToDedupeDelta,
      0,
      result.traffic.receivedToDedupeDelta === 0,
    ),
    check(
      "ACC-04",
      "dedupe accepted = ordered",
      result.traffic.acceptedToOrderedDelta,
      0,
      result.traffic.acceptedToOrderedDelta === 0,
    ),
    check(
      "FIN-01",
      "monitor pending rows",
      finalPendingRows,
      0,
      finalPendingRows === 0,
    ),
    check(
      "FIN-02",
      "monitor pending operations",
      pendingMonitorOperations,
      0,
      pendingMonitorOperations === 0,
    ),
    check(
      "FIN-03",
      "transport callback boundary",
      shutdown.transportCallbackBoundary ?? null,
      "closed",
      shutdown.transportCallbackBoundary === "closed",
    ),
    check(
      "FIN-04",
      "resources closed",
      Boolean(shutdown.resourcesClosed),
      true,
      Boolean(shutdown.resourcesClosed),
    ),
    check(
      "OUT-01",
      "harness verdict",
      result.result.verdict,
      "pass or pass_with_expected_degradation",
      ["pass", "pass_with_expected_degradation"].includes(
        result.result.verdict,
      ),
    ),
  ];

  const jsonPath = existingResultPath;
  const markdownPath = path.join(runDir, "standard-result.md");
  await writeFile(jsonPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  await writeFile(markdownPath, renderMarkdown(result), "utf8");

  return { result, jsonPath, markdownPath };
}

async function main() {
  const args = process.argv.slice(2);
  const testIdIndex = args.indexOf("--test-id");
  const testId =
    testIdIndex >= 0 && args[testIdIndex + 1] ? args[testIdIndex + 1] : undefined;
  const inputPath = args.find((value, index) => {
    if (value === "--test-id" || index === testIdIndex + 1) {
      return false;
    }
    return !value.startsWith("--");
  });
  const output = await standardizeResult(inputPath, testId);
  console.log(`standard JSON: ${output.jsonPath}`);
  console.log(`standard report: ${output.markdownPath}`);
  console.log(
    `verdict=${output.result.result.verdict} checks=${output.result.checks
      .map((entry) => `${entry.id}:${entry.status}`)
      .join(",")}`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack : error);
    process.exitCode = 1;
  });
}
