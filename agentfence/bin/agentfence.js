#!/usr/bin/env node

import { runCli } from "../src/cli.js";

runCli(process.argv).catch((error) => {
  console.error(`AgentFence failed: ${error.message}`);
  process.exit(1);
});
