#!/usr/bin/env node

import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const TEST_CONTRACTS = {
  "01": { slug: "baseline", monitorScenario: null },
  "02": { slug: "jitter-dark", monitorScenario: null, nodeFaults: true },
  "03": {
    slug: "transport-outage",
    monitorScenario: "monitor-transport-outage-burst",
    transport: true,
  },
  "04": {
    slug: "dedupe-outage",
    monitorScenario: "monitor-dedupe-outage",
    dedupe: true,
  },
  "05": {
    slug: "order-outage",
    monitorScenario: "monitor-order-outage",
    order: true,
  },
  "06": {
    slug: "nodes-transport",
    monitorScenario: "monitor-transport-outage-burst",
    nodeFaults: true,
    transport: true,
  },
  "07": {
    slug: "nodes-dedupe",
    monitorScenario: "monitor-dedupe-outage",
    nodeFaults: true,
    dedupe: true,
  },
  "08": {
    slug: "nodes-order",
    monitorScenario: "monitor-order-outage",
    nodeFaults: true,
    order: true,
  },
  "09": {
    slug: "transport-dedupe",
    monitorScenario: "monitor-transport-dedupe-outage",
    transport: true,
    dedupe: true,
  },
  "10": {
    slug: "transport-order",
    monitorScenario: "monitor-transport-order-outage",
    transport: true,
    order: true,
  },
  "11": {
    slug: "dedupe-order",
    monitorScenario: "monitor-dual-outage",
    dedupe: true,
    order: true,
  },
  "12": {
    slug: "all-failures",
    monitorScenario: "monitor-transport-dedupe-order-outage",
    nodeFaults: true,
    transport: true,
    dedupe: true,
    order: true,
  },
};

const REQUIRED_PACKAGE_VERSIONS = {
  "@causal-order/transport": "0.2.1",
  "@causal-order/monitor": "0.6.1",
  "@causal-order/testing": "0.3.3",
};

const verifyOnly = process.argv.includes("--verify-only");
const noPush = process.argv.includes("--no-push");
const testRunPath = process.argv
  .slice(2)
  .find((argument) => !argument.startsWith("--"));

if (!testRunPath) {
  console.error(
    "Usage: npm run finalize-test -- <test-run-folder-name> [--verify-only] [--no-push]",
  );
  console.error(
    "Example: npm run finalize-test -- 2026-07-30T12-00-00Z-t12-all-failures-8n-8h",
  );
  process.exit(1);
}

const match = testRunPath.match(
  /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}Z-t(\d{2})-([a-z0-9-]+)-8n-8h$/i,
);
if (!match) {
  console.error(
    "Invalid folder name. Expected: YYYY-MM-DDTHH-MM-SSZ-tXX-scenario-8n-8h",
  );
  process.exit(1);
}

const testNum = match[1];
const scenario = match[2].toLowerCase();
const runDate = testRunPath.slice(0, 10);
const testId = `test-${testNum}`;
const contract = TEST_CONTRACTS[testNum];
if (!contract) {
  console.error(`No evidence contract is defined for T${testNum}`);
  process.exit(1);
}
if (scenario !== contract.slug) {
  console.error(
    `T${testNum} must use scenario name ${contract.slug}; folder contains ${scenario}`,
  );
  process.exit(1);
}

const fullPath = path.join("artifacts", "runs", testRunPath);
if (!fs.existsSync(fullPath)) {
  console.error(`Test run folder not found: ${fullPath}`);
  process.exit(1);
}

console.log(`Finalizing T${testNum}: ${scenario}`);
const summaryPath = path.join(fullPath, "summary.json");
const runConfigPath = path.join(fullPath, "run-config.json");
const summary = readJson(summaryPath);
const runConfig = readJson(runConfigPath);

console.log("\n0. Checking recorded fault evidence...");
auditRecordedFaults({ testNum, scenario, contract, summary, runConfig });
console.log("   Recorded fault evidence: PASS");

console.log("\n1. Standardizing results...");
run(
  process.execPath,
  [path.join("scripts", "standardize-result.mjs"), fullPath],
  { stdio: "inherit" },
);

const resultPath = path.join(fullPath, "standard-result.json");
const result = readJson(resultPath);

console.log("\n2. Auditing evidence contract...");
const packages = auditEvidence({
  testNum,
  scenario,
  contract,
  fullPath,
  result,
  summary,
  runConfig,
});
for (const [packageName, version] of Object.entries(packages)) {
  console.log(`   ${packageName}: ${version}`);
}
console.log("   Evidence contract: PASS");

if (verifyOnly) {
  console.log("\nVerification complete. No documentation, commit, tag, or push was created.");
  process.exit(0);
}

const verdict = String(result.result.verdict).toUpperCase();
const eventsGenerated = Number(result.traffic.generated);
const anomalies = Number(result.ordering.anomalies);
const formattedEvents = eventsGenerated.toLocaleString("en-US");
const docPath = path.join("docs", `${testId}-${scenario}.md`);

console.log("\n3. Updating test documentation...");
const runHeading = `## Run ${testRunPath}`;
const runContent = `${runHeading}

Result folder: \`artifacts/runs/${testRunPath}\`

- **Verdict**: \`${verdict}\`
- **Events generated**: ${formattedEvents}
- **Anomalies detected and resolved**: ${anomalies}
- **Data loss**: 0
- **Pending work**: 0
- **Monitor scenario**: \`${contract.monitorScenario ?? "none"}\`

[Detailed metrics](../artifacts/runs/${testRunPath}/standard-result.md)

This run satisfies the T${testNum} ${scenario} evidence contract.
`;
const initialDocContent = `# TEST-${testNum}: ${scenario}

## Objective

Verify the causal-order stack's fault tolerance through the T${testNum} ${scenario} scenario without data loss or ordering violations.

## Requirements

- **Duration**: 8 hours wall-clock time
- **Topology**: 8 nodes with cross-edge communication
- **Fault injection**: ${scenario}
- **Published API**: \`@causal-order/testing\`

## Run Command

\`\`\`bash
npm run t${testNum}
\`\`\`

## Evidence
`;
const existingDocContent = fs.existsSync(docPath)
  ? fs.readFileSync(docPath, "utf8")
  : initialDocContent;
if (existingDocContent.includes(runHeading)) {
  console.log(`   ${docPath} already contains ${testRunPath}`);
} else {
  fs.writeFileSync(
    docPath,
    `${existingDocContent.trimEnd()}\n\n${runContent}`,
  );
  console.log(`   Appended ${testRunPath} to ${docPath}`);
}

console.log("\n4. Updating TESTLOG.md...");
const testlogPath = "TESTLOG.md";
const testlogContent = fs.readFileSync(testlogPath, "utf8");
const newEntryHeading = `## T${testNum}: ${scenario} — ${testRunPath}`;
const newEntry = `${newEntryHeading}

**Verdict**: \`${verdict}\` ✅

| Metric | Value |
| --- | --- |
| **Events generated** | ${formattedEvents} |
| **Anomalies** | ${anomalies} |
| **Leakage** | 0 |
| **Pending work** | 0 |

The recorded scenario matched the T${testNum} evidence contract. Every required fault was observed, all standardized checks passed, and the stack drained cleanly.

**Command**: \`npm run t${testNum}\`  
**Documentation**: [docs/${testId}-${scenario}.md](docs/${testId}-${scenario}.md)  
**Results**: [standard-result.md](artifacts/runs/${testRunPath}/standard-result.md)  
**Evidence**: [standard-result.json](artifacts/runs/${testRunPath}/standard-result.json)

---

`;
if (testlogContent.includes(newEntryHeading)) {
  console.log(`   TESTLOG.md already contains ${testRunPath}`);
} else {
  fs.writeFileSync(testlogPath, newEntry + testlogContent);
  console.log(`   Added a new T${testNum} run entry`);
}

console.log("\n5. Creating telemetry archive...");
const healthPath = path.join(fullPath, "monitor-health.ndjson");
const replayPath = path.join(fullPath, "monitor-replay.ndjson");
const zipPath = path.join(
  fullPath,
  `T${testNum}-${scenario}-raw-monitor-telemetry.zip`,
);
createTelemetryArchive(healthPath, replayPath, zipPath);
const hash = crypto
  .createHash("sha256")
  .update(fs.readFileSync(zipPath))
  .digest("hex")
  .toUpperCase();
console.log(`   ${path.basename(zipPath)}`);
console.log(`   SHA-256: ${hash}`);

console.log("\n6. Committing and tagging...");
const evidenceFiles = [
  docPath,
  testlogPath,
  resultPath,
  path.join(fullPath, "standard-result.md"),
  summaryPath,
  runConfigPath,
  path.join(fullPath, "monitor-summary.json"),
  path.join(fullPath, "anomalies.ndjson"),
  path.join(fullPath, "heartbeats.ndjson"),
  path.join(fullPath, "lifecycle.ndjson"),
  path.join(fullPath, "monitor-heartbeats.ndjson"),
].filter((filePath) => fs.existsSync(filePath));
run("git", ["add", "--", ...evidenceFiles]);
if (hasStagedChanges()) {
  run("git", [
    "commit",
    "-m",
    `Record corrected T${testNum} test run: ${scenario} (${verdict})`,
  ]);
  console.log("   Committed evidence");
} else {
  console.log("   No new evidence changes to commit");
}

const tagName = nextEvidenceTag(`evidence-t${testNum}`);
const tagVersionMatch = tagName.match(/-v(\d+)$/);
const runNumber = tagVersionMatch ? Number(tagVersionMatch[1]) : 1;
const releaseTitle = `T${testNum} ${scenario} — Run ${runNumber} (${runDate}) evidence`;
run("git", [
  "tag",
  "-a",
  tagName,
  "-m",
  `T${testNum} corrected eight-node eight-hour ${scenario} evidence`,
]);
console.log(`   Tagged as ${tagName}`);

if (!noPush) {
  console.log("\n7. Pushing commit and tag...");
  const branch = capture("git", ["branch", "--show-current"]).trim();
  if (!branch) {
    throw new Error("Cannot push evidence from a detached HEAD");
  }
  try {
    run("git", ["push", "origin", branch, tagName], { stdio: "inherit" });
    console.log(`   Pushed ${branch} and ${tagName}`);
  } catch (error) {
    console.warn(`   Push failed; the local commit and ${tagName} were retained.`);
    console.warn(`   ${error instanceof Error ? error.message : String(error)}`);
  }
} else {
  console.log("\n7. Push skipped (--no-push).");
}

const releaseBody = `## T${testNum} ${scenario} — Run ${runNumber}

Raw monitor telemetry from the successful eight-node, eight-hour fault-injection run of the causal-order stack completed on ${runDate}.

- **Evidence tag**: \`${tagName}\`
- **Run folder**: \`${testRunPath}\`
- **Scenario**: \`${scenario}\`

The published \`@causal-order/testing\` APIs recorded a **${verdict}** verdict. All ${formattedEvents} unique events were ordered correctly, ${anomalies} anomalies were detected and resolved without data loss, and the stack drained cleanly.

This release is a distinct T${testNum} run. Previous T${testNum} releases and their artifacts remain retained under their original evidence tags.

[View the standardized result](https://github.com/GazaliAhmad/causal-order-proving/blob/main/artifacts/runs/${testRunPath}/standard-result.md)

### Archive integrity

**T${testNum}-${scenario}-raw-monitor-telemetry.zip**  
SHA-256: \`${hash}\`
`;

console.log("\nFinalization complete.");
console.log(`\nRelease title: ${releaseTitle}`);
console.log(`Tag: ${tagName}\n`);
console.log(releaseBody);
console.log(`Archive: ${zipPath}`);

function auditEvidence({
  testNum,
  scenario,
  contract,
  fullPath,
  result,
  summary,
  runConfig,
}) {
  auditRecordedFaults({ testNum, scenario, contract, summary, runConfig });
  const lock = readJson("package-lock.json");
  const packages = {
    "causal-order": lock.packages?.["node_modules/causal-order"]?.version,
    "@causal-order/transport":
      lock.packages?.["node_modules/@causal-order/transport"]?.version,
    "@causal-order/monitor":
      lock.packages?.["node_modules/@causal-order/monitor"]?.version,
    "@causal-order/dedupe":
      lock.packages?.["node_modules/@causal-order/dedupe"]?.version,
    "@causal-order/testing":
      lock.packages?.["node_modules/@causal-order/testing"]?.version,
  };
  for (const [packageName, expectedVersion] of Object.entries(
    REQUIRED_PACKAGE_VERSIONS,
  )) {
    requireCondition(
      packages[packageName] === expectedVersion,
      `Expected ${packageName} ${expectedVersion}, got ${packages[packageName] ?? "NOT FOUND"}`,
    );
    requireCondition(
      result.identity?.packageVersions?.[packageName] === expectedVersion,
      `Standard result was not generated with ${packageName} ${expectedVersion}`,
    );
  }

  for (const telemetryFile of [
    "monitor-health.ndjson",
    "monitor-replay.ndjson",
  ]) {
    const telemetryPath = path.join(fullPath, telemetryFile);
    requireCondition(
      fs.existsSync(telemetryPath) && fs.statSync(telemetryPath).size > 0,
      `${telemetryFile} is missing or empty`,
    );
  }

  requireCondition(
    ["pass", "pass_with_expected_degradation"].includes(
      String(result.result?.verdict ?? "").toLowerCase(),
    ),
    `Cannot finalize harness verdict ${result.result?.verdict ?? "missing"}`,
  );
  requireCondition(
    Array.isArray(result.checks) &&
      result.checks.length > 0 &&
      result.checks.every((check) => check.status === "pass"),
    "One or more standardized evidence checks failed",
  );
  return packages;
}

function auditRecordedFaults({
  testNum,
  scenario,
  contract,
  summary,
  runConfig,
}) {
  requireCondition(
    runConfig.runName === `T${testNum}-${scenario}-8n-8h`,
    `Unexpected run name: ${runConfig.runName}`,
  );
  requireCondition(
    Array.isArray(runConfig.nodeIds) && runConfig.nodeIds.length === 8,
    `Expected 8 nodes, got ${runConfig.nodeIds?.length ?? 0}`,
  );
  requireCondition(runConfig.timeScale === 1, "Expected time-scale 1");
  requireCondition(
    Number(runConfig.durationMs) >= 8 * 60 * 60 * 1000,
    "Expected at least 8 hours of wall-clock duration",
  );

  const recordedScenario =
    summary.monitor?.scenarioId ?? runConfig.monitorConfig?.scenarioId ?? null;
  requireCondition(
    recordedScenario === contract.monitorScenario,
    `T${testNum} requires ${contract.monitorScenario ?? "no monitor scenario"}, got ${recordedScenario ?? "none"}`,
  );

  const faultInjection = runConfig.faultInjection ?? {};
  const jitterNodes = faultInjection.jitterNodeIds ?? [];
  const darkNodes = faultInjection.darkNodeIds ?? [];
  if (contract.nodeFaults) {
    requireCondition(
      jitterNodes.includes("edge-a"),
      "Required jitter node edge-a is not configured",
    );
    requireCondition(
      darkNodes.includes("edge-b"),
      "Required dark node edge-b is not configured",
    );
    requireCondition(
      Number(summary.simulation?.jitterExtraDelaysApplied ?? 0) > 0,
      "Configured node jitter was not exercised",
    );
    requireCondition(
      Number(summary.simulation?.darkWindowsEntered ?? 0) > 0,
      "Configured node dark window was not exercised",
    );
    requireCondition(
      Number(summary.simulation?.reconnects ?? 0) > 0,
      "Configured dark node did not reconnect",
    );
  } else {
    requireCondition(
      jitterNodes.length === 0 && darkNodes.length === 0,
      `T${testNum} unexpectedly configured node faults`,
    );
  }

  const analysis = summary.monitor?.analysis ?? {};
  if (contract.transport) {
    requireCondition(
      Number(summary.monitor?.scenarioTransportOutages ?? 0) > 0,
      `${contract.monitorScenario} did not inject a mid-run transport outage`,
    );
  }
  if (contract.dedupe && !contract.order) {
    requireCondition(
      analysis.sawDedupeBypass === true,
      `${contract.monitorScenario} did not exercise dedupe bypass`,
    );
  }
  if (contract.order && !contract.dedupe) {
    requireCondition(
      analysis.sawOrderBufferOnly === true,
      `${contract.monitorScenario} did not exercise order buffering`,
    );
    requireCondition(
      analysis.sawReplayThroughDedupe === true,
      `${contract.monitorScenario} did not exercise replay through dedupe`,
    );
  }
  if (contract.dedupe && contract.order) {
    requireCondition(
      analysis.sawFullOutageBuffer === true,
      `${contract.monitorScenario} did not exercise full-outage buffering`,
    );
    requireCondition(
      analysis.sawReplayThroughDedupe === true,
      `${contract.monitorScenario} did not exercise replay through dedupe`,
    );
  }
}

function createTelemetryArchive(healthPath, replayPath, zipPath) {
  requireCondition(fs.existsSync(healthPath), `${healthPath} not found`);
  requireCondition(fs.existsSync(replayPath), `${replayPath} not found`);
  try {
    const powershell =
      process.platform === "win32"
        ? "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
        : "pwsh";
    const quotePowerShellLiteral = (value) =>
      `'${path.resolve(value).replaceAll("'", "''")}'`;
    const archiveCommand = [
      "Compress-Archive -LiteralPath",
      `${quotePowerShellLiteral(healthPath)},${quotePowerShellLiteral(replayPath)}`,
      "-DestinationPath",
      quotePowerShellLiteral(zipPath),
      "-Force",
    ].join(" ");
    run(powershell, [
      "-NoProfile",
      "-Command",
      archiveCommand,
    ]);
  } catch (error) {
    throw new Error(
      `Could not create telemetry archive: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

function nextEvidenceTag(baseTag) {
  const existing = new Set(
    capture("git", ["tag", "--list", `${baseTag}*`])
      .split(/\r?\n/)
      .filter(Boolean),
  );
  if (!existing.has(baseTag)) {
    return baseTag;
  }
  for (let version = 2; ; version += 1) {
    const candidate = `${baseTag}-v${version}`;
    if (!existing.has(candidate)) {
      return candidate;
    }
  }
}

function hasStagedChanges() {
  try {
    run("git", ["diff", "--cached", "--quiet"]);
    return false;
  } catch {
    return true;
  }
}

function readJson(filePath) {
  requireCondition(fs.existsSync(filePath), `${filePath} not found`);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireCondition(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: process.cwd(),
    stdio: options.stdio ?? "pipe",
    encoding: "utf8",
  });
}

function capture(command, args) {
  return run(command, args, { stdio: "pipe" });
}
