import path from "node:path";
import { scanWorkspace } from "./scanner.js";
import { writeJsonReport, writeHtmlReport } from "./report.js";

export async function runCli(argv) {
  const args = parseArgs(argv.slice(2));

  if (args.help || !args.command) {
    printHelp();
    return;
  }

  if (args.command !== "scan") {
    throw new Error(`Unknown command "${args.command}"`);
  }

  const targetPath = path.resolve(args.path || process.cwd());
  const result = await scanWorkspace(targetPath);

  printSummary(result);

  if (args.json) {
    await writeJsonReport(result, path.resolve(args.json));
    console.log(`JSON report written to ${args.json}`);
  }

  if (args.out) {
    await writeHtmlReport(result, path.resolve(args.out));
    console.log(`HTML report written to ${args.out}`);
  }

  if (args.failOn && result.riskScore >= Number(args.failOn)) {
    process.exitCode = 2;
  }
}

function parseArgs(rawArgs) {
  const parsed = {};
  const args = [...rawArgs];
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
    } else if (arg === "--fail-on") {
      parsed.failOn = args[++index];
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

Options:
  -p, --path <dir>       Workspace to scan. Defaults to current directory.
      --json <file>      Write machine-readable JSON report.
  -o, --out <file>       Write local HTML report.
      --fail-on <score>  Exit with code 2 when risk score is at or above score.
  -h, --help             Show help.
`);
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
