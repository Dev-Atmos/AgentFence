const SECRET_PATTERNS = [
  /api[_-]?key/i,
  /secret/i,
  /token/i,
  /password/i,
  /private[_-]?key/i,
  /aws[_-]?access/i,
  /github[_-]?token/i,
  /openai[_-]?api/i
];

const DESTRUCTIVE_PATTERNS = [
  /rm\s+-rf/i,
  /remove-item\s+.*-recurse/i,
  /del\s+\/s/i,
  /drop\s+database/i,
  /terraform\s+destroy/i,
  /kubectl\s+delete/i
];

const BROAD_ACCESS_PATTERNS = [
  /\/$/,
  /^\*$/,
  /\.\.\//,
  /c:\\\\?users/i,
  /\/users\//i,
  /\/home\//i,
  /\/var\//i,
  /\/etc\//i,
  /d:\\\\/i
];

export function evaluateConfig({ relativeFile, raw, parsed, policy = { data: {} } }) {
  const findings = [];

  if (!parsed.valid) {
    findings.push(finding("medium", "Config file could not be parsed", relativeFile, parsed.error));
    return findings;
  }

  const flattened = flatten(parsed.data);
  const rawLines = raw.split(/\r?\n/);

  for (const item of flattened) {
    const key = item.path.join(".");
    const value = String(item.value ?? "");
    const combined = `${key}=${value}`;

    if (SECRET_PATTERNS.some((pattern) => pattern.test(combined)) && !isAllowedSecret(key, policy)) {
      findings.push(
        finding(
          "high",
          "Potential secret or credential exposure",
          relativeFile,
          `Key or value looks credential-related: ${key}`
        )
      );
    }

    if (/command|cmd|args|script|shell|execute|exec/i.test(key) && DESTRUCTIVE_PATTERNS.some((pattern) => pattern.test(value))) {
      findings.push(
        finding(
          "critical",
          "Destructive command reachable by agent",
          relativeFile,
          `Command-like field contains a destructive pattern: ${key}`
        )
      );
    }

    if (
      /filesystem|file|path|root|directory|cwd|allowed/i.test(key) &&
      BROAD_ACCESS_PATTERNS.some((pattern) => pattern.test(value)) &&
      !isAllowedPath(value, policy)
    ) {
      findings.push(
        finding(
          "high",
          "Broad filesystem access",
          relativeFile,
          `Path-like field appears overly broad: ${key}`
        )
      );
    }

    if (/permission|scope|access|capabilit/i.test(key) && /\*|all|admin|write|delete|shell|network:\*|filesystem:write/i.test(value)) {
      findings.push(
        finding(
          "medium",
          "Broad agent permission scope",
          relativeFile,
          `Permission-like field should be reviewed: ${key}`
        )
      );
    }
  }

  findings.push(...scanRawLines(relativeFile, rawLines));
  return dedupeFindings(findings);
}

function isAllowedPath(value, policy) {
  const allowedPaths = arrayValue(policy.data.allowedPaths);
  return allowedPaths.some((allowedPath) => String(value).startsWith(String(allowedPath)));
}

function isAllowedSecret(key, policy) {
  const allowedSecrets = arrayValue(policy.data.allowedSecrets);
  return allowedSecrets.some((allowedSecret) => key.toLowerCase().includes(String(allowedSecret).toLowerCase()));
}

function arrayValue(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function scanRawLines(relativeFile, lines) {
  const findings = [];

  lines.forEach((line, index) => {
    if (/prompt.?injection|ignore previous|system prompt|jailbreak/i.test(line)) {
      findings.push(
        finding(
          "medium",
          "Prompt-injection related text found",
          relativeFile,
          `Line ${index + 1} contains text that should be reviewed.`
        )
      );
    }

    if (/http:\/\/|--no-sandbox|disable.?security|allow.?all/i.test(line)) {
      findings.push(
        finding(
          "medium",
          "Unsafe runtime or network setting",
          relativeFile,
          `Line ${index + 1} contains an unsafe-looking setting.`
        )
      );
    }
  });

  return findings;
}

function flatten(value, path = []) {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flatten(item, [...path, String(index)]));
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => flatten(child, [...path, key]));
  }

  return [{ path, value }];
}

function finding(severity, title, file, detail) {
  return {
    id: slug(`${severity}-${title}-${file}-${detail}`),
    severity,
    title,
    file,
    detail,
    recommendation: recommendationFor(title)
  };
}

function recommendationFor(title) {
  if (title.includes("secret")) {
    return "Move credentials to a secret manager or environment configured outside the agent-readable config.";
  }

  if (title.includes("Destructive")) {
    return "Remove destructive commands from agent-accessible tools or require explicit human approval and scoped execution.";
  }

  if (title.includes("filesystem")) {
    return "Limit filesystem access to the smallest project directory needed and avoid home, root, system, or drive-level scopes.";
  }

  if (title.includes("permission")) {
    return "Replace broad permissions with explicit, least-privilege tool scopes.";
  }

  if (title.includes("Prompt")) {
    return "Treat untrusted tool descriptions, retrieved text, and external content as hostile input.";
  }

  return "Review this setting and document why the agent needs it.";
}

function dedupeFindings(findings) {
  const seen = new Set();
  return findings.filter((item) => {
    const key = `${item.severity}:${item.title}:${item.file}:${item.detail}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 96);
}
