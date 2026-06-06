# AgentFence Launch Copy

## Short Pitch

AgentFence scans AI agent and MCP configs for risky permissions before agents touch files, shell commands, secrets, APIs, or CI.

```bash
npx agentfence scan --path .
```

## Launch Post

I built AgentFence, a local security scanner for AI-agent and MCP configs.

AI coding agents are moving fast into real workflows. They often get access to local files, shell commands, env vars, APIs, and internal tools before anyone reviews the blast radius.

AgentFence scans configs and flags:

- broad filesystem access
- destructive command patterns
- secret-looking keys
- broad permission scopes
- unsafe runtime/network settings
- prompt-injection related text

It generates terminal, JSON, HTML, and SARIF reports, so it can run locally or in GitHub Actions.

Try it:

```bash
npx agentfence scan --path .
```

Links:

- https://agentfence.pages.dev
- https://www.npmjs.com/package/agentfence
- https://github.com/Dev-Atmos/AgentFence

I am looking for feedback from people using MCP, Cursor, Claude Code, Codex, Windsurf, Copilot, or custom AI-agent workflows.

## Show HN Draft

Title:

Show HN: AgentFence, a scanner for risky MCP and AI-agent configs

Body:

I built AgentFence to scan AI-agent and MCP configuration files for risky permissions before agents touch real projects.

It currently detects broad filesystem access, destructive command patterns, secret-looking keys, broad permission scopes, prompt-injection related config text, and unsafe runtime/network settings.

It outputs terminal summaries, JSON, HTML, and SARIF for GitHub Code Scanning.

Run:

```bash
npx agentfence scan --path .
```

This is an early release, and the rules are heuristic. I am especially looking for real-world MCP/agent config examples and false-positive reports.

## X / Twitter

I shipped AgentFence v0.2.0.

It scans MCP and AI-agent configs for risky permissions:

- broad filesystem access
- destructive commands
- secret-looking keys
- broad scopes
- unsafe runtime settings

Run:

```bash
npx agentfence scan --path .
```

https://agentfence.pages.dev

## LinkedIn

AI coding agents are increasingly connected to files, shells, APIs, and internal tools.

That creates a practical security question: before an agent runs, who reviewed its permissions?

I released AgentFence v0.2.0, a local scanner for AI-agent and MCP configuration files. It detects risky patterns and produces terminal, JSON, HTML, and SARIF reports.

Install:

```bash
npx agentfence scan --path .
```

Feedback from developers, platform engineers, and AppSec teams is welcome.
