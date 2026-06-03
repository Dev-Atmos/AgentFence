# AgentFence Launch Plan

## Pre-Launch Checklist

- Create GitHub repo.
- Push first commit.
- Add product screenshots from HTML report.
- Publish npm package.
- Create short demo GIF.
- Prepare launch copy.

## Launch Channels

- GitHub topic tags: `mcp`, `ai-agent-security`, `llm-security`, `developer-tools`.
- Hacker News: Show HN.
- Reddit: r/mcp, r/cybersecurity, r/netsec, r/selfhosted, r/LocalLLaMA, r/microsaas.
- LinkedIn: developer/security angle.
- X: short demo thread.
- Product Hunt only after v0.2 is stronger.

## Launch Headline Options

- AgentFence: a local scanner for risky MCP and AI-agent configs.
- I built a scanner for unsafe AI-agent permissions.
- Before your AI agent touches shell/files/secrets, scan its config.

## Initial CTA

Run:

```bash
npx agentfence scan --path .
```

Then share the generated report or open an issue with false positives.

## Feedback Questions

1. Which agent tools do you use?
2. Which MCP clients should AgentFence support first?
3. Which findings are noisy?
4. Would you use this in CI?
5. What output format matters most: HTML, JSON, SARIF, PR comments, or VS Code?
