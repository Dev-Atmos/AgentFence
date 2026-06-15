import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const cliPath = path.resolve("bin", "agentfence.js");

test("root help prints usage", () => {
  const result = spawnSync(process.execPath, [cliPath, "--help"], { encoding: "utf8" });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /agentfence scan/);
  assert.match(result.stdout, /agentfence init/);
});

test("init command creates policy from CLI", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "agentfence-cli-"));
  try {
    const result = spawnSync(process.execPath, [cliPath, "init", "--path", dir], { encoding: "utf8" });
    const policy = await fs.readFile(path.join(dir, "agentfence.yml"), "utf8");

    assert.equal(result.status, 0);
    assert.match(result.stdout, /Created/);
    assert.match(policy, /AgentFence policy/);
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});
