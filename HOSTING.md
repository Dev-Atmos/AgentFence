# AgentFence Hosting

## Current Decision

Use Cloudflare Pages for the public docs/landing site.

Reason:

- GitHub Pages requires a paid plan for private repositories.
- Cloudflare Pages can host this static `docs/` site on a free plan.
- The product can remain private until launch while the site is deployed separately.

## Cloudflare Pages Settings

- Project name: `agentfence`
- Production branch: `main`
- Build command: leave empty
- Build output directory: `docs`
- Framework preset: none / static HTML

If Cloudflare is currently using the repository root as the output directory,
the root `index.html` fallback will still serve the landing page correctly.

Expected URL:

```text
https://agentfence.pages.dev
```

If that project name is unavailable, use:

```text
https://agentfence-devatmos.pages.dev
```

## Cloudflare Workers Subdomain

If Cloudflare gives a URL like:

```text
https://agentfence.dpsmysticsaga.workers.dev
```

then the project was deployed as a Worker, or Cloudflare is showing the Workers route. In that URL:

- `agentfence` is the Worker name.
- `dpsmysticsaga` is the Cloudflare account `workers.dev` subdomain.

Preferred account subdomain:

```text
devatmos
```

Fallback if unavailable:

```text
dev-atmos
```

Expected Worker URL after changing the account subdomain:

```text
https://agentfence.devatmos.workers.dev
```

or:

```text
https://agentfence.dev-atmos.workers.dev
```

This is separate from Pages. A proper Pages deployment should use:

```text
https://agentfence.pages.dev
```

## Deployment Options

### Option 1: Connect GitHub Repository

1. Cloudflare Dashboard -> Workers & Pages -> Create -> Pages.
2. Connect GitHub.
3. Select `Dev-Atmos/AgentFence`.
4. Use settings above.
5. Deploy.

### Option 2: Direct Upload

Upload the `docs/` folder manually through Cloudflare Pages Direct Upload.

This is useful if GitHub connection is not ready.

## Later

When AgentFence becomes a SaaS:

- Keep docs on Cloudflare Pages.
- Add app frontend under `/app`.
- Add API using Cloudflare Workers or a Node backend.
- Add PostgreSQL using Neon or Supabase.
