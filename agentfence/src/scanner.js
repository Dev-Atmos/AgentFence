import fs from "node:fs/promises";
import path from "node:path";
import { evaluateConfig } from "./rules.js";

const CONFIG_FILE_PATTERNS = [
  ".mcp.json",
  "mcp.json",
  "mcp.config.json",
  "claude_desktop_config.json",
  "agent.json",
  "agents.json",
  "agentfence.yml",
  "agentfence.yaml"
];

const SCAN_DIR_NAMES = [".cursor", ".claude", ".codex", ".windsurf", ".vscode", "mcp", "agents"];
const MAX_FILE_BYTES = 512 * 1024;

export async function scanWorkspace(targetPath) {
  const startedAt = new Date().toISOString();
  const files = await discoverConfigFiles(targetPath);
  const findings = [];
  const configs = [];

  for (const file of files) {
    const raw = await fs.readFile(file, "utf8");
    const parsed = parseConfig(file, raw);
    configs.push({
      file,
      relativeFile: path.relative(targetPath, file) || path.basename(file),
      parser: parsed.parser,
      valid: parsed.valid
    });

    findings.push(
      ...evaluateConfig({
        file,
        relativeFile: path.relative(targetPath, file) || path.basename(file),
        raw,
        parsed
      })
    );
  }

  const riskScore = calculateRiskScore(findings);

  return {
    tool: "AgentFence",
    version: "0.1.0",
    targetPath,
    startedAt,
    completedAt: new Date().toISOString(),
    scannedFiles: configs,
    riskScore,
    riskLevel: riskLevel(riskScore),
    findings
  };
}

async function discoverConfigFiles(root) {
  const found = [];
  await walk(root, found, root);
  return found.sort();
}

async function walk(currentPath, found, root) {
  let entries;
  try {
    entries = await fs.readdir(currentPath, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(currentPath, entry.name);

    if (entry.isDirectory()) {
      if (shouldSkipDirectory(entry.name)) {
        continue;
      }

      const relativeParts = path.relative(root, fullPath).split(path.sep);
      if (relativeParts.length <= 3 || SCAN_DIR_NAMES.includes(entry.name)) {
        await walk(fullPath, found, root);
      }
      continue;
    }

    if (!entry.isFile() || !isConfigCandidate(entry.name, fullPath)) {
      continue;
    }

    const stats = await fs.stat(fullPath);
    if (stats.size <= MAX_FILE_BYTES) {
      found.push(fullPath);
    }
  }
}

function shouldSkipDirectory(name) {
  return ["node_modules", ".git", "dist", "build", "coverage", ".next", ".turbo"].includes(name);
}

function isConfigCandidate(name, fullPath) {
  if (CONFIG_FILE_PATTERNS.includes(name)) {
    return true;
  }

  const normalized = fullPath.toLowerCase();
  return (
    normalized.includes(`${path.sep}.cursor${path.sep}`) ||
    normalized.includes(`${path.sep}.claude${path.sep}`) ||
    normalized.includes(`${path.sep}.codex${path.sep}`) ||
    normalized.includes(`${path.sep}mcp${path.sep}`) ||
    normalized.includes(`${path.sep}agents${path.sep}`)
  ) && /\.(json|ya?ml)$/i.test(name);
}

function parseConfig(file, raw) {
  if (/\.json$/i.test(file)) {
    try {
      return { parser: "json", valid: true, data: JSON.parse(raw) };
    } catch (error) {
      return { parser: "json", valid: false, error: error.message, data: null };
    }
  }

  if (/\.ya?ml$/i.test(file)) {
    return { parser: "yaml-lite", valid: true, data: parseYamlLite(raw) };
  }

  return { parser: "text", valid: true, data: raw };
}

function parseYamlLite(raw) {
  const result = {};
  let currentKey = null;

  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const keyValue = trimmed.match(/^([A-Za-z0-9_.-]+):\s*(.*)$/);
    if (keyValue) {
      currentKey = keyValue[1];
      result[currentKey] = parseScalar(keyValue[2]);
      continue;
    }

    const listItem = trimmed.match(/^-\s+(.*)$/);
    if (listItem && currentKey) {
      if (!Array.isArray(result[currentKey])) {
        result[currentKey] = [];
      }
      result[currentKey].push(parseScalar(listItem[1]));
    }
  }

  return result;
}

function parseScalar(value) {
  if (value === "true") return true;
  if (value === "false") return false;
  if (value === "") return [];
  if (/^\d+$/.test(value)) return Number(value);
  return value.replace(/^["']|["']$/g, "");
}

function calculateRiskScore(findings) {
  const weights = { critical: 30, high: 18, medium: 9, low: 3 };
  return Math.min(
    100,
    findings.reduce((score, finding) => score + weights[finding.severity], 0)
  );
}

function riskLevel(score) {
  if (score >= 75) return "critical";
  if (score >= 50) return "high";
  if (score >= 25) return "medium";
  return "low";
}
