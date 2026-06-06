# AgentFence

Developer-first security scanner for AI agents, MCP servers, and tool-connected LLM workflows.

AgentFence helps teams find risky agent permissions before AI tools touch real files, shell commands, APIs, secrets, databases, or cloud resources.

[![CI](https://github.com/Dev-Atmos/AgentFence/actions/workflows/ci.yml/badge.svg)](https://github.com/Dev-Atmos/AgentFence/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Docs site target: `https://agentfence.pages.dev`

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

After npm publishing:

```bash
npx agentfence scan --path .
```

Run locally from a cloned repo:

```powershell
node ./bin/agentfence.js scan --path ./fixtures/vulnerable --out ./agentfence-report.html --json ./agentfence-report.json
```

## CLI

```text
agentfence scan [options]

Options:
  -p, --path <dir>       Workspace to scan. Defaults to current directory.
      --json <file>      Write machine-readable JSON report.
  -o, --out <file>       Write local HTML report.
      --sarif <file>     Write SARIF report for code scanning.
      --policy <file>    Use an AgentFence policy file.
      --fail-on <gate>   Exit with code 2 on score or severity: low, medium, high, critical.
  -h, --help             Show help.
```

## GitHub Action

```yaml
name: AgentFence

on:
  pull_request:
  push:
    branches: [main]

jobs:
  agentfence:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: Dev-Atmos/AgentFence@main
        with:
          path: .
          fail-on: high
          sarif: agentfence-report.sarif
          json: agentfence-report.json
```

## GitHub Code Scanning

Upload SARIF to GitHub's Security tab:

```yaml
name: AgentFence Code Scanning

on:
  pull_request:
  push:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: Dev-Atmos/AgentFence@main
        with:
          path: .
          fail-on: critical
          sarif: agentfence-report.sarif

      - uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: agentfence-report.sarif
```

## Policy File

Create `agentfence.yml` in the repository root to document narrow exceptions.

```yaml
ignore:
  - ".mcp.json:Broad agent permission scope"

allowedPaths:
  - "./docs"

allowedSecrets:
  - "publicTokenName"
```

Prefer fixing broad permissions over ignoring findings. Policy files should be reviewed like code.

## Project Links

- Site: https://agentfence.pages.dev
- npm: https://www.npmjs.com/package/agentfence
- Release notes: [RELEASE_NOTES_v0.2.0.md](RELEASE_NOTES_v0.2.0.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- Security policy: [SECURITY.md](SECURITY.md)

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
- CI fail thresholds.
- SARIF output.
- Ignore/allow policy support.

### v0.3

- Approved tool registry.
- VS Code/Cursor extension.
- Team dashboard.
- Trend tracking.
- Pull request comments.

## Positioning

AgentFence is not a replacement for a security team. It is a lightweight guardrail for developers, agencies, and small teams adopting AI agents faster than their review process can keep up.
