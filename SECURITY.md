# Security Policy

## Supported Versions

AgentFence is early-stage software. Security fixes are currently applied to the latest published version.

| Version | Supported |
| --- | --- |
| 0.2.x | Yes |

## Reporting a Vulnerability

Please do not open a public issue for exploitable vulnerabilities.

Report privately by emailing:

```text
security@dev-atmos.com
```

If this address is not yet configured, open a GitHub issue with a minimal description and request a private disclosure channel. Do not include exploit details in the public issue.

## Scope

In scope:

- Incorrect handling of scanner inputs that could execute code.
- Vulnerabilities in report generation.
- Vulnerabilities in GitHub Action usage.
- Exposure of secrets by AgentFence itself.

Out of scope:

- Findings produced by AgentFence in third-party repositories.
- False positives or false negatives unless they create a security issue in AgentFence itself.
- Vulnerabilities in external AI tools, MCP servers, or package managers.

## Security Posture

AgentFence is designed to scan local configuration files. It should not execute discovered agent tools or MCP servers during scanning.

If you find behavior that executes untrusted project code during a scan, report it immediately.
