import { spawn } from "node:child_process";
import process from "node:process";
import { standardizeResult } from "./standardize-result.mjs";

const startedAt = Date.now();
const npmCli = process.env.npm_execpath;
if (!npmCli) {
  throw new Error("run the smoke test through npm so the published harness executable can be resolved");
}

const args = [
  npmCli,
  "exec",
  "--",
  "causal-order-testing-adapter-runtime",
  "--adapter",
  "@causal-order/transport/testing",
  "--monitor",
  "--duration",
  "10m",
  "--steady-for",
  "10m",
  "--time-scale",
  "1",
  "--node-ids",
  "edge-a,edge-b,edge-c,edge-d,edge-e,edge-f,edge-g,edge-h",
  "--profile",
  "typical-real-world-mesh",
  "--run-name",
  "smoke-clean-8n-10m",
];

const exitCode = await new Promise((resolve, reject) => {
  const child = spawn(process.execPath, args, { stdio: "inherit" });
  child.once("error", reject);
  child.once("exit", (code, signal) => {
    if (signal) {
      console.error(`smoke harness exited on signal ${signal}`);
      resolve(1);
      return;
    }
    resolve(code ?? 1);
  });
});

try {
  const output = await standardizeResult(undefined, "SMOKE-01", startedAt);
  console.log(`standard JSON: ${output.jsonPath}`);
  console.log(`standard report: ${output.markdownPath}`);
} catch (error) {
  console.error(
    `could not standardize smoke result: ${
      error instanceof Error ? error.message : error
    }`,
  );
  if (exitCode === 0) {
    process.exitCode = 1;
  }
}

if (process.exitCode !== 1) {
  process.exitCode = exitCode;
}
