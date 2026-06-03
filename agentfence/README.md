# AgentFence

Developer-first security scanner for AI agents, MCP servers, and tool-connected LLM workflows.

AgentFence helps teams find risky agent permissions before AI tools touch real files, shell commands, APIs, secrets, databases, or cloud resources.

## Why

AI coding agents and MCP servers move quickly from experiments to real workflows. They often gain access to local files, shell commands, environment variables, network calls, and internal APIs before anyone reviews the blast radius.

AgentFence starts with a simple local scan:

- Find MCP and agent config files.
- Detect broad filesystem access.
- Detect destructive command patterns.
- Detect credential-looking keys.
- Detect broad agent scopes.
- Generate JSON and HTML reports.

## Quick Start

From this directory:

```powershell
node ./bin/agentfence.js scan --path ./fixtures/vulnerable --out ./agentfence-report.html --json ./agentfence-report.json
```

With the Codex bundled Node runtime in this workspace:

```powershell
& "C:\Users\dipak\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" .\bin\agentfence.js scan --path .\fixtures\vulnerable --out .\agentfence-report.html --json .\agentfence-report.json
```

## CLI

```text
agentfence scan [options]

Options:
  -p, --path <dir>       Workspace to scan. Defaults to current directory.
      --json <file>      Write machine-readable JSON report.
  -o, --out <file>       Write local HTML report.
      --fail-on <score>  Exit with code 2 when risk score is at or above score.
  -h, --help             Show help.
```

## Current Rules

- Potential secret or credential exposure.
- Destructive command reachable by agent.
- Broad filesystem access.
- Broad agent permission scope.
- Prompt-injection related text found.
- Unsafe runtime or network setting.

## Product Roadmap

### v0.1

- Local CLI.
- MCP/agent config discovery.
- JSON and HTML reports.
- Risk score.

### v0.2

- GitHub Action.
- Policy file: `agentfence.yml`.
- Approved tool registry.
- CI fail thresholds.

### v0.3

- VS Code/Cursor extension.
- Team dashboard.
- Trend tracking.
- Pull request comments.

## Positioning

AgentFence is not a replacement for a security team. It is a lightweight guardrail for developers, agencies, and small teams adopting AI agents faster than their review process can keep up.
