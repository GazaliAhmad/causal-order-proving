#!/usr/bin/env node

import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const TESTS = {
  "09": {
    scenario: "monitor-transport-dedupe-outage",
    runName: "T09-transport-dedupe-8n-8h",
    orderReplay: false,
    nodeFaults: false,
  },
  "10": {
    scenario: "monitor-transport-order-outage",
    runName: "T10-transport-order-8n-8h",
    orderReplay: true,
    nodeFaults: false,
  },
  "12": {
    scenario: "monitor-transport-dedupe-order-outage",
    runName: "T12-all-failures-8n-8h",
    orderReplay: true,
    nodeFaults: true,
  },
};

const testNumber = process.argv[2];
const dryRun = process.argv.includes("--dry-run");
const test = TESTS[testNumber];
if (!test) {
  throw new Error("Usage: node scripts/run-durable-test.mjs <09|10|12> [--dry-run]");
}

const projectRoot = process.cwd();
const baseDedupeConfig = test.orderReplay
  ? JSON.parse(
      await readFile(
        path.join(projectRoot, "configs", "order-outage-dedupe.json"),
        "utf8",
      ),
    )
  : { preset: "standard" };
if (
  test.orderReplay &&
  (Number(baseDedupeConfig.slidingWindowSeconds) < 900 ||
    Number(baseDedupeConfig.maxSlidingWindowSeconds) <
      Number(baseDedupeConfig.slidingWindowSeconds))
) {
  throw new Error(
    `T${testNumber} requires a valid in-memory dedupe window of at least 900 seconds`,
  );
}

const runToken = `${new Date().toISOString().replace(/[:.]/g, "-")}-${crypto.randomUUID()}`;
const stateDir = path.join(
  projectRoot,
  ".local",
  `t${testNumber}-state`,
  runToken,
);
const dedupeDatabasePath = path.join(stateDir, "dedupe-identities.sqlite");
const monitorDatabasePath = path.join(stateDir, "monitor-reservoir.sqlite");
const runDedupeConfigPath = path.join(stateDir, "dedupe-config.json");
const maxDurableIdentities = 2_000_000;

await mkdir(stateDir, { recursive: true });
await writeFile(
  runDedupeConfigPath,
  `${JSON.stringify(
    {
      ...baseDedupeConfig,
      durableIdentityLedgerPath: dedupeDatabasePath,
      maxDurableIdentities,
    },
    null,
    2,
  )}\n`,
  "utf8",
);

const npmCli = process.env.npm_execpath;
if (!npmCli) {
  throw new Error(
    `Run T${testNumber} through npm so the local testing RC can be resolved`,
  );
}

const harnessArgs = [
  "--adapter",
  "@causal-order/transport/testing",
  "--adapter-max-in-flight-sends-per-peer",
  "4096",
  "--monitor",
  "--monitor-db",
  monitorDatabasePath,
  "--monitor-scenario",
  test.scenario,
  "--dedupe-config",
  runDedupeConfigPath,
];
if (test.nodeFaults) {
  harnessArgs.push(
    "--jitter-nodes",
    "edge-a",
    "--dark-nodes",
    "edge-b",
    "--dark-start-after",
    "10m",
  );
}
harnessArgs.push(
  "--duration",
  "8h",
  "--time-scale",
  "1",
  "--node-ids",
  "edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h",
  "--profile",
  "typical-real-world-mesh",
  "--run-name",
  test.runName,
);

const args = [
  npmCli,
  "exec",
  "--",
  "causal-order-testing-adapter-runtime",
  ...harnessArgs,
];

console.log(`T${testNumber} durable state: ${stateDir}`);
console.log(
  `T${testNumber} durable identity capacity: ${maxDurableIdentities}`,
);
if (testNumber === "09") {
  console.log(
    "T09 dedupe bypass remains expected degradation; durable identity storage protects only routes that pass through dedupe.",
  );
}

if (dryRun) {
  console.log(`T${testNumber} monitor database: ${monitorDatabasePath}`);
  console.log(`T${testNumber} dedupe config: ${runDedupeConfigPath}`);
  console.log(`T${testNumber} command: ${process.execPath} ${args.join(" ")}`);
  process.exit(0);
}

const child = spawn(process.execPath, args, {
  cwd: projectRoot,
  stdio: "inherit",
});
const exitCode = await new Promise((resolve, reject) => {
  child.once("error", reject);
  child.once("exit", (code, signal) => {
    if (signal) {
      console.error(`T${testNumber} runtime exited on signal ${signal}`);
      resolve(1);
      return;
    }
    resolve(code ?? 1);
  });
});
process.exitCode = exitCode;
