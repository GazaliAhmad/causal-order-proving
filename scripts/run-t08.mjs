#!/usr/bin/env node

import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const baseConfigPath = path.join(
  projectRoot,
  "configs",
  "order-outage-dedupe.json",
);
const baseConfig = JSON.parse(await readFile(baseConfigPath, "utf8"));
const runToken = `${new Date().toISOString().replace(/[:.]/g, "-")}-${crypto.randomUUID()}`;
const stateDir = path.join(projectRoot, ".local", "t08-state", runToken);
const dedupeDatabasePath = path.join(stateDir, "dedupe-identities.sqlite");
const monitorDatabasePath = path.join(stateDir, "monitor-reservoir.sqlite");
const runDedupeConfigPath = path.join(stateDir, "dedupe-config.json");
const maxDurableIdentities = 2_000_000;

if (
  Number(baseConfig.slidingWindowSeconds) < 900 ||
  Number(baseConfig.maxSlidingWindowSeconds) <
    Number(baseConfig.slidingWindowSeconds)
) {
  throw new Error(
    "T08 requires a valid in-memory dedupe window of at least 900 seconds",
  );
}

await mkdir(stateDir, { recursive: true });
await writeFile(
  runDedupeConfigPath,
  `${JSON.stringify(
    {
      ...baseConfig,
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
  throw new Error("Run T08 through npm so the local testing RC can be resolved");
}

const args = [
  npmCli,
  "exec",
  "--",
  "causal-order-testing-adapter-runtime",
  "--adapter",
  "@causal-order/transport/testing",
  "--monitor",
  "--monitor-db",
  monitorDatabasePath,
  "--monitor-scenario",
  "monitor-order-outage",
  "--dedupe-config",
  runDedupeConfigPath,
  "--jitter-nodes",
  "edge-a",
  "--dark-nodes",
  "edge-b",
  "--dark-start-after",
  "10m",
  "--duration",
  "8h",
  "--time-scale",
  "1",
  "--node-ids",
  "edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h",
  "--profile",
  "typical-real-world-mesh",
  "--run-name",
  "T08-nodes-order-8n-8h",
];

console.log(`T08 durable state: ${stateDir}`);
console.log(`T08 durable identity capacity: ${maxDurableIdentities}`);

if (dryRun) {
  console.log(`T08 monitor database: ${monitorDatabasePath}`);
  console.log(`T08 dedupe config: ${runDedupeConfigPath}`);
  console.log(`T08 command: ${process.execPath} ${args.join(" ")}`);
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
      console.error(`T08 runtime exited on signal ${signal}`);
      resolve(1);
      return;
    }
    resolve(code ?? 1);
  });
});

process.exitCode = exitCode;
