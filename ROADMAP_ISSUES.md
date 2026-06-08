# AgentFence Roadmap Issues

These should become GitHub issues when repo write access is available.

## v0.3 Adoption Features

### Add `agentfence init`

Goal:

Generate a starter `agentfence.yml` policy file.

Acceptance criteria:

- `agentfence init` creates `agentfence.yml`.
- Existing file is not overwritten without `--force`.
- README documents usage.

### Add Markdown Report Output

Goal:

Make scan results easy to paste into PRs, issues, and client reports.

Acceptance criteria:

- `--markdown agentfence-report.md`
- Includes summary, findings, recommendations.
- Covered by tests.

### Add Real MCP Client Examples

Goal:

Show scanner support for common AI-agent tools.

Examples:

- Cursor
- Claude Desktop
- Claude Code
- Codex
- Windsurf

Acceptance criteria:

- Fixtures added.
- README "Works with" section added.
- Tests cover examples.

### Add README Screenshots

Goal:

Improve trust and conversion.

Screenshots:

- Landing page.
- Terminal scan.
- HTML report.

Acceptance criteria:

- Images stored under `docs/assets`.
- README embeds them.

## v0.4 Revenue Features

### Add Agency Report Template

Goal:

Support the first paid manual service.

Acceptance criteria:

- Report template for client-facing findings.
- Executive summary.
- Remediation checklist.

### Add Waitlist CTA

Goal:

Capture interest before building hosted SaaS.

Acceptance criteria:

- Landing page has "Join Pro beta" CTA.
- Form destination configured.
- README mentions team/agency beta.

### Add GitHub App Research Spike

Goal:

Define hosted/team product architecture.

Acceptance criteria:

- Architecture note.
- Required permissions.
- Data model sketch.
- Pricing implications.
