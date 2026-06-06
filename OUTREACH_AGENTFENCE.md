# AgentFence Outreach

## Developer Feedback Message

Hi [Name],

I built AgentFence, a small CLI that scans AI-agent and MCP configs for risky permissions before agents touch files, shell commands, secrets, APIs, or CI.

Run:

```bash
npx agentfence scan --path .
```

I am looking for feedback from people using MCP, Cursor, Claude Code, Codex, Windsurf, or custom agent workflows.

If you have 2 minutes, I would value a quick reaction: useful, noisy, missing something, or not relevant?

Links:

- https://agentfence.pages.dev
- https://github.com/Dev-Atmos/AgentFence
- https://www.npmjs.com/package/agentfence

## Agency Message

Hi [Name],

I am building AgentFence for teams and agencies using AI coding agents and MCP servers across client projects.

The free CLI scans configs for broad filesystem access, destructive commands, secret-looking keys, and unsafe permissions.

For agencies, I am testing a founding offer: monthly AI-agent/MCP config reports for client repos, with recommendations and policy cleanup.

Would this be useful for your team or clients?

## CTO / Security Lead Message

Hi [Name],

I released AgentFence, a lightweight scanner for AI-agent and MCP configuration risk.

It is meant for the gap before enterprise AI security platforms: developers are already using agents, MCP servers, file access, shell tools, and API integrations, but most teams do not have a review step for those configs.

It runs locally or in GitHub Actions:

```bash
npx agentfence scan --path .
```

I am looking for feedback from small SaaS teams on what would make this useful in CI.

## Qualification Questions

1. Which AI coding tools are you using?
2. Are you using MCP servers?
3. Do agents have shell or filesystem access?
4. Would you run a config scanner in CI?
5. Would PR comments or saved scan history matter?
6. What would make this worth paying for?
