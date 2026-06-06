# Contributing

Thanks for helping improve AgentFence.

## Development

Requirements:

- Node.js 18 or newer
- npm

Run tests:

```bash
npm test
```

Run a fixture scan:

```bash
npm run scan:fixtures
```

Run the CLI locally:

```bash
node ./bin/agentfence.js scan --path .
```

## Good First Contributions

- Add MCP config examples from real tools.
- Reduce false positives with focused test fixtures.
- Add scanner rules with clear recommendations.
- Improve SARIF output.
- Improve documentation for Cursor, Claude Code, Codex, Windsurf, and MCP clients.

## Rule Changes

Every new rule should include:

- A vulnerable fixture.
- A safe fixture or policy fixture when relevant.
- A test assertion.
- A recommendation that tells users what to do.

## Pull Request Checklist

- Tests pass.
- New behavior is covered by fixtures or tests.
- README or docs are updated if user-facing behavior changes.
- No secrets, private configs, or generated reports are committed.
