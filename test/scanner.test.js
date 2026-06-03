import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { scanWorkspace } from "../src/scanner.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

test("vulnerable fixture reports critical risk", async () => {
  const result = await scanWorkspace(path.join(root, "fixtures", "vulnerable"));

  assert.equal(result.riskLevel, "critical");
  assert.equal(result.riskScore, 100);
  assert.ok(result.findings.some((finding) => finding.title === "Destructive command reachable by agent"));
  assert.ok(result.findings.some((finding) => finding.title === "Potential secret or credential exposure"));
  assert.ok(result.findings.some((finding) => finding.title === "Broad filesystem access"));
});

test("safe fixture reports no findings", async () => {
  const result = await scanWorkspace(path.join(root, "fixtures", "safe"));

  assert.equal(result.riskLevel, "low");
  assert.equal(result.riskScore, 0);
  assert.equal(result.findings.length, 0);
});

test("policy allows documented paths and secret-like keys", async () => {
  const result = await scanWorkspace(path.join(root, "fixtures", "policy"));

  assert.equal(result.policy.loaded, true);
  assert.equal(result.riskScore, 0);
  assert.equal(result.findings.length, 0);
});
