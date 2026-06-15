import fs from "node:fs/promises";
import path from "node:path";

export const DEFAULT_POLICY = `# AgentFence policy.
#
# Keep exceptions narrow and reviewed. Prefer fixing broad permissions over
# ignoring findings.

ignore:
  # - ".mcp.json:Broad agent permission scope"

allowedPaths:
  # - "./docs"

allowedSecrets:
  # Example: allow non-secret configuration keys that include token-like names.
  # - "publicTokenName"
`;

export async function initPolicy(targetPath, options = {}) {
  const policyPath = path.join(targetPath, "agentfence.yml");

  try {
    await fs.writeFile(policyPath, DEFAULT_POLICY, {
      encoding: "utf8",
      flag: options.force ? "w" : "wx"
    });
  } catch (error) {
    if (error.code === "EEXIST") {
      return {
        created: false,
        path: policyPath,
        reason: "exists"
      };
    }

    throw error;
  }

  return {
    created: true,
    path: policyPath
  };
}
