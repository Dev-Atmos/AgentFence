# AgentFence Growth Plan

## Objective

Turn AgentFence from a published CLI into a revenue-producing developer security product.

Primary revenue target:

- First milestone: USD 100 MRR
- Second milestone: USD 1,000 MRR
- Third milestone: USD 5,000 MRR

## Positioning

AgentFence is the lightweight security scanner for AI-agent and MCP configs.

It is not trying to be a full enterprise AI security platform today. The wedge is:

> Before your AI coding agent touches files, shell commands, secrets, APIs, or CI, scan its config.

## Market Signal

AI-agent security is now an active market, not a theoretical category.

Signals:

- Enterprise vendors are launching agentic security platforms for LLMs, MCP servers, APIs, and coding assistants.
- MCP-specific scanners and security tools already exist, which validates demand.
- The enterprise tools are broad, heavy, and sales-led, leaving room for a simple developer-first scanner.
- OWASP continues to maintain LLM and GenAI application security guidance, which gives us a credible security vocabulary.

## Initial Customer Segments

### Segment 1: AI-heavy indie developers

Pain:

- Using Cursor, Claude Code, Codex, Windsurf, Copilot, and MCP servers quickly.
- Little formal security review.
- Wants simple tools, not enterprise dashboards.

Free product:

- CLI scanner.
- HTML report.
- GitHub Action.

Paid trigger:

- Wants private CI history, saved scan reports, and policy management.

### Segment 2: Dev agencies

Pain:

- Multiple client repos.
- AI-assisted coding introduces risk across client environments.
- Needs something to show clients.

Paid trigger:

- Agency dashboard.
- Branded reports.
- Multi-repo monitoring.
- Monthly client security report.

### Segment 3: Small SaaS teams

Pain:

- Developers experiment with agents and MCP tools.
- Security person or CTO wants visibility without buying enterprise software.

Paid trigger:

- GitHub App.
- PR comments.
- SARIF/security tab.
- Policy drift detection.

## Monetization Path

### Free

- CLI
- GitHub Action
- HTML/JSON/SARIF reports
- Basic policy file

Purpose:

- Build trust.
- Generate GitHub stars.
- Drive npm downloads.
- Collect real-world configs and false positives.

### Pro Solo

Price: USD 9-19/month.

Features:

- Saved scan history.
- Private dashboard.
- Better report UI.
- Priority rule updates.
- Exportable audit reports.

### Team

Price: USD 49-199/month.

Features:

- GitHub App.
- Multi-repo dashboard.
- PR comments.
- Team policies.
- Approved MCP/tool registry.
- Slack/email alerts.

### Agency

Price: USD 299+/month.

Features:

- Multi-client workspace.
- Branded reports.
- Scheduled scans.
- Client-ready PDF exports.

## Four-Week Execution Plan

### Week 1: Distribution Foundation

Goals:

- GitHub release published.
- npm install verified.
- Landing page live.
- First launch posts published.
- 10 real users asked for feedback.

Actions:

- Post Show HN.
- Post on LinkedIn.
- Post on Reddit communities carefully, not spam.
- Share in MCP/AI-agent communities.
- Ask direct feedback from developers using Cursor, Claude Code, Codex, Windsurf, and MCP.

Metrics:

- GitHub stars.
- npm downloads.
- Site visits.
- Issues opened.
- Direct replies.

### Week 2: Product Proof

Goals:

- Add screenshots.
- Add real MCP config examples.
- Improve false positive handling.
- Add `agentfence init`.

Actions:

- Create docs/assets screenshots.
- Add examples for Cursor, Claude Desktop, Codex, Windsurf.
- Build `agentfence init` to create `agentfence.yml`.
- Add README section: "Works with".

Metrics:

- npm downloads.
- First external issue.
- First external star from non-founder network.

### Week 3: CI And Team Wedge

Goals:

- Make GitHub Action frictionless.
- Improve SARIF docs.
- Add PR comment design.

Actions:

- Add sample workflow files.
- Add `--format markdown` or `--markdown` output.
- Create mock paid dashboard page.
- Interview 5 agency/CTO prospects.

Metrics:

- GitHub Action installs/usages if visible.
- Replies from agencies.
- Waitlist signups.

### Week 4: Revenue Test

Goals:

- Validate paid interest before building SaaS backend.

Actions:

- Add "Join Pro beta" CTA.
- Offer agency beta: USD 49/month founding plan.
- Offer manual monthly report for 3 repos.
- Direct outreach to 30 AI-heavy agencies/dev shops.

Success criteria:

- 3 beta users or
- 2 agency calls or
- 1 paid founding customer.

## Launch Channels

Priority:

1. Hacker News Show HN
2. LinkedIn technical post
3. Reddit: MCP, cybersecurity, LocalLLaMA, selfhosted, SaaS, SideProject
4. X/Twitter developer/security thread
5. GitHub topics and README SEO
6. Product Hunt after screenshots and v0.3

## Direct Outreach Targets

Message developers and teams who:

- Publish MCP servers.
- Build AI-agent tools.
- Run dev agencies using AI coding tools.
- Write about Cursor, Claude Code, Codex, Windsurf, or MCP.
- Maintain security tooling around LLM apps.

## SEO Targets

Pages/posts to create:

- "How to scan MCP configs for risky permissions"
- "MCP security checklist for developers"
- "Cursor MCP security risks"
- "Claude Desktop MCP server security checklist"
- "GitHub Action for AI agent security scanning"

## Revenue Decision Rule

Do not build a full SaaS dashboard until at least one of these happens:

- 500 npm downloads.
- 100 GitHub stars.
- 20 waitlist signups.
- 3 people ask for team features.
- 1 person pays for a manual/agency plan.

## Next Product Build

v0.3 should focus on adoption:

- `agentfence init`
- examples for popular agent tools
- screenshots in README
- markdown report output
- better CI examples
- real-world fixture library
