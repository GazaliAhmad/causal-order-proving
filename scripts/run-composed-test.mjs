#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import process from "process";

const testNum = process.argv[2];

if (!testNum) {
  console.error("Usage: node run-composed-test.mjs <testNum>");
  process.exit(1);
}

const artifactsDir = "artifacts";
const flagFile = path.join(artifactsDir, ".composition-supported");

// Check if flag file exists
if (!fs.existsSync(flagFile)) {
  console.log(`ℹ️  T${testNum}: Composition support not yet checked.`);
  console.log(`   Run 'npm run check-composition' first to detect harness capabilities.`);
  console.log(`   Then try 'npm run t${testNum}' again.`);
  process.exit(0);
}

// Read composition support flag
const supported = fs.readFileSync(flagFile, "utf8").trim() === "true";

if (!supported) {
  console.log(`ℹ️  T${testNum} is NOT_RUNNABLE`);
  console.log(`   The installed @causal-order/testing harness does not support composed fault scenarios.`);
  console.log(`   (Cannot combine --jitter-nodes and --monitor-scenario in the same run.)`);
  console.log(``);
  console.log(`   Options:`);
  console.log(`   • Upgrade @causal-order/testing to a version that supports composition`);
  console.log(`   • Run single-fault tests instead (T01-T05, T11)`);
  console.log(`   • Check harness release notes for composition support`);
  console.log(``);
  process.exit(0);
}

// Composition is supported; run the actual test via internal npm script
console.log(`✅ Composition supported. Running T${testNum}...`);

try {
  const internalScript = `_t${String(testNum).padStart(2, '0')}-cmd`;
  const npmCmd = `npm run ${internalScript}`;
  execSync(npmCmd, { stdio: "inherit" });
} catch (error) {
  process.exit(1);
}
