import { spawn } from "node:child_process";
import process from "node:process";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { standardizeResult } from "./standardize-result.mjs";

// Check if harness supports composed fault scenarios (--jitter-nodes + --monitor-scenario)
export async function checkCompositionSupport() {
  try {
    console.log("🔍 Checking harness composition support...");
    
    // Query harness help to see if both flags are documented
    const helpOutput = execSync(
      "npx --no-install causal-order-testing-adapter-runtime --help",
      { encoding: "utf8", stdio: "pipe" }
    );
    
    const hasJitterNodes = helpOutput.includes("--jitter-nodes");
    const hasMonitorScenario = helpOutput.includes("--monitor-scenario");
    const supportsComposition = hasJitterNodes && hasMonitorScenario;
    
    // Ensure artifacts directory exists
    const artifactsDir = "artifacts";
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }
    
    const flagFile = path.join(artifactsDir, ".composition-supported");
    fs.writeFileSync(flagFile, String(supportsComposition));
    
    console.log(`   ${supportsComposition ? "✅" : "⚠️"} Composition support: ${supportsComposition ? "YES" : "NO"}`);
    console.log(`   Flag file: ${flagFile}`);
    
    return supportsComposition;
  } catch (error) {
    console.error(`⚠️  Could not determine composition support: ${error instanceof Error ? error.message : error}`);
    console.log(`   Assuming composition is NOT supported (conservative)`);
    
    const artifactsDir = "artifacts";
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true });
    }
    
    const flagFile = path.join(artifactsDir, ".composition-supported");
    fs.writeFileSync(flagFile, "false");
    
    return false;
  }
}

// Check if this script was run to check composition support
if (process.argv.includes("--check-composition")) {
  await checkCompositionSupport();
  process.exit(0);
}

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
