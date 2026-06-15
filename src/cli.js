import path from "node:path";
import { scanWorkspace } from "./scanner.js";
import { writeJsonReport, writeHtmlReport, writeSarifReport } from "./report.js";
import { initPolicy } from "./policy.js";

export async function runCli(argv) {
  const args = parseArgs(argv.slice(2));

  if (args.help || !args.command) {
    printHelp();
    return;
  }

  if (args.command === "init") {
    const targetPath = path.resolve(args.path || process.cwd());
    const result = await initPolicy(targetPath, { force: args.force });

    if (result.created) {
      console.log(`Created ${path.relative(process.cwd(), result.path) || result.path}`);
    } else {
      console.log(`Skipped ${path.relative(process.cwd(), result.path) || result.path}: already exists. Use --force to overwrite.`);
    }
    return;
  }

  if (args.command !== "scan") {
    throw new Error(`Unknown command "${args.command}"`);
  }

  const targetPath = path.resolve(args.path || process.cwd());
  const result = await scanWorkspace(targetPath, {
    policyPath: args.policy ? path.resolve(args.policy) : null
  });

  printSummary(result);

  if (args.json) {
    await writeJsonReport(result, path.resolve(args.json));
    console.log(`JSON report written to ${args.json}`);
  }

  if (args.out) {
    await writeHtmlReport(result, path.resolve(args.out));
    console.log(`HTML report written to ${args.out}`);
  }

  if (args.sarif) {
    await writeSarifReport(result, path.resolve(args.sarif));
    console.log(`SARIF report written to ${args.sarif}`);
  }

  if (shouldFail(result, args.failOn)) {
    process.exitCode = 2;
  }
}

function parseArgs(rawArgs) {
  const parsed = {};
  const args = [...rawArgs];

  if (args[0] === "--help" || args[0] === "-h") {
    parsed.help = true;
    return parsed;
  }

  parsed.command = args.shift();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
    } else if (arg === "--path" || arg === "-p") {
      parsed.path = args[++index];
    } else if (arg === "--json") {
      parsed.json = args[++index];
    } else if (arg === "--out" || arg === "-o") {
      parsed.out = args[++index];
    } else if (arg === "--sarif") {
      parsed.sarif = args[++index];
    } else if (arg === "--policy") {
      parsed.policy = args[++index];
    } else if (arg === "--fail-on") {
      parsed.failOn = args[++index];
    } else if (arg === "--force" || arg === "-f") {
      parsed.force = true;
    } else {
      throw new Error(`Unknown option "${arg}"`);
    }
  }

  return parsed;
}

function printHelp() {
  console.log(`AgentFence

Usage:
  agentfence scan [options]
  agentfence init [options]

Options:
  -p, --path <dir>       Workspace to scan. Defaults to current directory.
      --json <file>      Write machine-readable JSON report.
  -o, --out <file>       Write local HTML report.
      --sarif <file>     Write SARIF report for code scanning.
      --policy <file>    Use an AgentFence policy file.
      --fail-on <gate>   Exit with code 2 on score or severity: low, medium, high, critical.
  -f, --force            Overwrite existing policy file when using init.
  -h, --help             Show help.
`);
}

function shouldFail(result, failOn) {
  if (!failOn) {
    return false;
  }

  if (/^\d+$/.test(String(failOn))) {
    return result.riskScore >= Number(failOn);
  }

  const severityRank = { low: 1, medium: 2, high: 3, critical: 4 };
  const threshold = severityRank[String(failOn).toLowerCase()];

  if (!threshold) {
    throw new Error(`Invalid --fail-on value "${failOn}"`);
  }

  return result.findings.some((finding) => severityRank[finding.severity] >= threshold);
}

function printSummary(result) {
  const counts = result.findings.reduce(
    (acc, finding) => {
      acc[finding.severity] = (acc[finding.severity] || 0) + 1;
      return acc;
    },
    { critical: 0, high: 0, medium: 0, low: 0 }
  );

  console.log(`AgentFence scan complete`);
  console.log(`Target: ${result.targetPath}`);
  console.log(`Risk score: ${result.riskScore}/100 (${result.riskLevel})`);
  console.log(
    `Findings: ${counts.critical} critical, ${counts.high} high, ${counts.medium} medium, ${counts.low} low`
  );

  for (const finding of result.findings.slice(0, 12)) {
    console.log(`- [${finding.severity}] ${finding.title} (${finding.file})`);
  }

  if (result.findings.length > 12) {
    console.log(`...and ${result.findings.length - 12} more findings`);
  }
}
