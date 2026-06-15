import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { initPolicy } from "../src/policy.js";

async function withTempDir(callback) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "agentfence-policy-"));
  try {
    await callback(dir);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
}

test("initPolicy creates agentfence.yml", async () => {
  await withTempDir(async (dir) => {
    const result = await initPolicy(dir);
    const policy = await fs.readFile(path.join(dir, "agentfence.yml"), "utf8");

    assert.equal(result.created, true);
    assert.match(policy, /ignore:/);
    assert.match(policy, /allowedPaths:/);
    assert.match(policy, /allowedSecrets:/);
  });
});

test("initPolicy does not overwrite existing policy by default", async () => {
  await withTempDir(async (dir) => {
    const file = path.join(dir, "agentfence.yml");
    await fs.writeFile(file, "custom: true\n", "utf8");

    const result = await initPolicy(dir);
    const policy = await fs.readFile(file, "utf8");

    assert.equal(result.created, false);
    assert.equal(result.reason, "exists");
    assert.equal(policy, "custom: true\n");
  });
});

test("initPolicy overwrites existing policy with force", async () => {
  await withTempDir(async (dir) => {
    const file = path.join(dir, "agentfence.yml");
    await fs.writeFile(file, "custom: true\n", "utf8");

    const result = await initPolicy(dir, { force: true });
    const policy = await fs.readFile(file, "utf8");

    assert.equal(result.created, true);
    assert.match(policy, /AgentFence policy/);
  });
});
