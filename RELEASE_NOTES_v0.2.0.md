# AgentFence v0.2.0

AgentFence is a developer-first security scanner for AI agents, MCP servers, and tool-connected LLM workflows.

This first public release focuses on local and CI-ready scanning.

## Install

```bash
npx agentfence scan --path .
```

## What It Detects

- Broad filesystem access.
- Destructive command patterns.
- Secret or credential-looking config keys.
- Broad agent permission scopes.
- Prompt-injection related text in config.
- Unsafe runtime or network settings.

## Outputs

- Terminal summary.
- JSON report.
- HTML report.
- SARIF report for GitHub Code Scanning.

## GitHub Action

```yaml
- uses: Dev-Atmos/AgentFence@v0.2.0
  with:
    path: .
    fail-on: high
    sarif: agentfence-report.sarif
```

## Policy File

AgentFence supports `agentfence.yml` for narrow documented exceptions:

```yaml
ignore:
  - ".mcp.json:Broad agent permission scope"

allowedPaths:
  - "./docs"

allowedSecrets:
  - "publicTokenName"
```

## Known Limitations

- YAML support is intentionally lightweight.
- Rules are heuristic and may produce false positives.
- AgentFence does not execute MCP servers or inspect runtime sessions yet.
- The first release focuses on config scanning, not full agent observability.

## Feedback Wanted

Please open issues for:

- Real MCP/agent config examples.
- False positives.
- Missing config locations.
- Rules that would matter in CI.
- Output formats needed by security teams.

## Links

- npm: https://www.npmjs.com/package/agentfence
- Site: https://agentfence.pages.dev
- Repo: https://github.com/Dev-Atmos/AgentFence
