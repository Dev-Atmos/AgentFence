# Global Product Selection

Date: 2026-06-03

## Decision

Recommended global product:

**AgentFence**

A developer-first security scanner and runtime guardrail for AI coding agents, MCP servers, and tool-connected LLM workflows.

## One-Line Pitch

AgentFence helps developers and small teams find unsafe AI agent permissions, risky MCP tools, secret exposure paths, prompt-injection surfaces, and destructive tool access before agents touch real code, files, APIs, or cloud resources.

## Why This Product

Generic AI tools are crowded. Generic SaaS dashboards are crowded. Generic automation agencies are crowded.

AI agent security is newer, urgent, global, and technical enough that a strong solo/small team can compete with a narrow developer-focused wedge.

Market signals:

- Agentic AI adoption is growing, but governance and security controls are lagging.
- MCP and tool-connected agents create a new attack surface.
- Developers are using Cursor, Claude Code, Codex, Windsurf, Copilot, and MCP tools quickly, often before security teams approve workflows.
- Enterprise platforms exist, but many indie devs, agencies, and small teams need lightweight tooling.

## Product Format

Start as a standalone CLI + VS Code/Cursor-compatible tool.
Then add SaaS dashboard after usage appears.

### Free CLI

Command:

`agentfence scan`

Checks:

- MCP server config discovery.
- Dangerous tool permissions.
- Access to filesystem, shell, network, database, cloud, or secrets.
- Environment variable exposure.
- Prompt injection risk in tool descriptions.
- Missing tool descriptions and unsafe broad scopes.
- Risky commands such as unrestricted shell, recursive deletion, credential access, and production write access.

Output:

- Local HTML report.
- JSON report for CI.
- Risk score.
- Fix suggestions.

### Paid Pro

Price hypothesis:

- Solo: USD 9-19/month
- Team: USD 49-199/month
- Agency: USD 299+/month

Features:

- GitHub PR comments.
- CI/CD policy gates.
- Team dashboard.
- Historical risk trend.
- Approved tool registry.
- Agent session audit logs.
- Policy templates.
- Slack/email alerts.

## Target Buyers

Primary:

- Indie hackers building with AI agents.
- Dev agencies using AI coding tools.
- Small SaaS teams.
- Security-conscious engineering managers.
- Internal platform teams experimenting with MCP.

Secondary:

- Managed service providers.
- AI automation consultants.
- Enterprise AppSec teams after proof of traction.

## Why It Can Sell Globally

- Developer tools distribute globally without local sales dependence.
- Free CLI creates trust and top-of-funnel.
- Security risk is easy to demonstrate with a scan report.
- AI coding and MCP adoption are global.
- Pricing in USD can create stronger income leverage than local INR services.

## Competition

There are already competitors in agent security, MCP scanning, AI firewalls, and governance.

The entry wedge should be:

> The simplest agent security scanner for solo builders and small teams using Cursor, Claude Code, Codex, Windsurf, and MCP.

Do not initially compete with enterprise GRC platforms.
Compete on speed, clarity, developer experience, and affordable pricing.

## MVP Scope

Version 0.1:

- Detect MCP config files.
- Parse JSON/YAML configs.
- Inventory tools and servers.
- Flag dangerous permissions and command patterns.
- Flag secrets/environment exposure.
- Score risk.
- Generate local HTML report.
- Generate JSON report.

Version 0.2:

- GitHub Action.
- VS Code extension shell.
- Policy file: `agentfence.yml`.
- Ignore/approve list.

Version 0.3:

- SaaS dashboard.
- Team projects.
- Pull request comments.
- Trend tracking.

## First 14-Day Build Plan

Day 1-2:

- Create CLI skeleton.
- Define risk rules.
- Scan local config files.

Day 3-5:

- Add JSON/YAML parsing.
- Add risk report.
- Add sample vulnerable fixtures.

Day 6-8:

- Add HTML report.
- Add GitHub README and landing page.
- Publish demo screenshots.

Day 9-11:

- Add GitHub Action.
- Add policy file.
- Add CI exit codes.

Day 12-14:

- Publish npm package.
- Post to GitHub, Reddit, Hacker News, X, LinkedIn, MCP communities.

## Validation Gate

Continue only if within 30 days:

- 100 GitHub stars or
- 500 npm downloads or
- 20 email waitlist signups or
- 3 paid users/preorders or
- 2 agencies ask for team usage.

## Revenue Target Path

Month 1:

- Free CLI traction.
- Goal: 500 downloads.

Month 2:

- Paid Pro waitlist.
- Goal: 10 paid beta users at USD 19-49/month.

Month 3:

- Team plan.
- Goal: USD 1,000 MRR.

Month 6:

- Agency and team distribution.
- Goal: USD 5,000 MRR.

INR 1,00,000/month is roughly USD 1,200/month depending on exchange rates. A global developer tool can reach that faster than an India-only SMB compliance offer if distribution works.

## What Not To Do

- Do not build a huge dashboard first.
- Do not start with enterprise sales.
- Do not claim perfect security.
- Do not make it a generic LLM observability tool.
- Do not build another chatbot/CRM/dashboard.

## Trading Decision

Do not use stock trading as the predictable income engine.

Reasons:

- No strategy can reliably guarantee INR 1,00,000/month profit without capital, risk, drawdowns, and execution constraints.
- Trading on behalf of the founder requires legal, brokerage, and regulatory boundaries.
- The better use of technical skill is building income-producing software assets.

Codex can support:

- Watchlists.
- Backtests.
- Risk dashboards.
- Position sizing models.
- Investment research summaries.
- Decision briefs for founder approval.

Codex cannot:

- Take custody of funds.
- Place trades.
- Promise fixed monthly profits.
