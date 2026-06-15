# Release Process

## v0.2.0 Checklist

Status: published to npm as `agentfence@0.2.0`.

## v0.3.0 Checklist

1. Run tests.

```bash
npm test
```

2. Run init smoke test.

```bash
npx agentfence init
```

3. Confirm package contents.

```bash
npm pack --dry-run
```

4. Publish.

```bash
npm publish
```

1. Run tests.

```bash
npm test
```

2. Run fixture scan.

```bash
npm run scan:fixtures
```

3. Confirm package contents.

```bash
npm pack --dry-run
```

4. Tag release.

```bash
git tag v0.2.0
git push origin v0.2.0
```

5. Publish to npm.

```bash
npm publish
```

Published:

```bash
npm view agentfence version
# 0.2.0
```

6. Create GitHub release using the notes below.

7. Deploy docs through Cloudflare Pages.

Use:

- Build command: empty
- Build output directory: `docs`

## v0.2.0 Notes

AgentFence v0.2.0 prepares the scanner for real CI usage:

- Root-level npm package layout.
- Composite GitHub Action.
- SARIF output for GitHub Code Scanning.
- `agentfence.yml` policy file.
- Ignore, allowed path, and allowed secret-like key support.
- Severity and score based `--fail-on` gates.
- Safe, vulnerable, and policy fixtures.
