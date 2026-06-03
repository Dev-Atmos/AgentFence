import fs from "node:fs/promises";

export async function writeJsonReport(result, file) {
  await fs.writeFile(file, `${JSON.stringify(result, null, 2)}\n`, "utf8");
}

export async function writeHtmlReport(result, file) {
  await fs.writeFile(file, renderHtml(result), "utf8");
}

export async function writeSarifReport(result, file) {
  await fs.writeFile(file, `${JSON.stringify(renderSarif(result), null, 2)}\n`, "utf8");
}

function renderSarif(result) {
  const rules = new Map();

  for (const finding of result.findings) {
    rules.set(finding.title, {
      id: finding.title,
      name: finding.title,
      shortDescription: { text: finding.title },
      fullDescription: { text: finding.recommendation },
      defaultConfiguration: {
        level: sarifLevel(finding.severity)
      }
    });
  }

  return {
    version: "2.1.0",
    $schema: "https://json.schemastore.org/sarif-2.1.0.json",
    runs: [
      {
        tool: {
          driver: {
            name: "AgentFence",
            informationUri: "https://github.com/Dev-Atmos/AgentFence",
            rules: [...rules.values()]
          }
        },
        results: result.findings.map((finding) => ({
          ruleId: finding.title,
          level: sarifLevel(finding.severity),
          message: {
            text: `${finding.detail} Recommendation: ${finding.recommendation}`
          },
          locations: [
            {
              physicalLocation: {
                artifactLocation: {
                  uri: finding.file.replaceAll("\\", "/")
                }
              }
            }
          ],
          properties: {
            agentfenceId: finding.id,
            severity: finding.severity
          }
        }))
      }
    ]
  };
}

function sarifLevel(severity) {
  if (severity === "critical" || severity === "high") return "error";
  if (severity === "medium") return "warning";
  return "note";
}

function renderHtml(result) {
  const findingRows = result.findings
    .map(
      (finding) => `<tr>
        <td><span class="sev ${escapeHtml(finding.severity)}">${escapeHtml(finding.severity)}</span></td>
        <td>${escapeHtml(finding.title)}</td>
        <td>${escapeHtml(finding.file)}</td>
        <td>${escapeHtml(finding.detail)}</td>
        <td>${escapeHtml(finding.recommendation)}</td>
      </tr>`
    )
    .join("");

  const scannedFiles = result.scannedFiles
    .map((file) => `<li>${escapeHtml(file.relativeFile)} <span>${escapeHtml(file.parser)}</span></li>`)
    .join("");

  const policyText = result.policy.loaded
    ? `Policy loaded from ${result.policy.file}. ${result.policy.ignoredIds} ignored IDs, ${result.policy.allowedPaths} allowed paths.`
    : "No policy file loaded.";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AgentFence Report</title>
  <style>
    :root { --ink:#121a17; --muted:#63706a; --line:#dce5df; --paper:#f7faf8; --surface:#fff; --critical:#991b1b; --high:#b45309; --medium:#1d4ed8; --low:#047857; }
    * { box-sizing:border-box; }
    body { margin:0; background:var(--paper); color:var(--ink); font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; line-height:1.5; }
    header { padding:32px clamp(18px,5vw,64px); background:var(--ink); color:white; }
    h1 { margin:0; font-size:clamp(34px,6vw,60px); letter-spacing:0; }
    h2 { margin:0 0 16px; letter-spacing:0; }
    main { padding:28px clamp(18px,5vw,64px) 56px; }
    .summary { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; margin-top:24px; }
    .card { padding:18px; border:1px solid var(--line); border-radius:8px; background:var(--surface); }
    .card strong { display:block; font-size:32px; }
    .card span, p, li span { color:var(--muted); }
    section { margin-top:28px; }
    table { width:100%; border-collapse:collapse; overflow:hidden; border-radius:8px; background:var(--surface); }
    th,td { padding:12px; border-bottom:1px solid var(--line); text-align:left; vertical-align:top; font-size:14px; }
    th { color:var(--muted); font-size:12px; text-transform:uppercase; }
    .sev { display:inline-block; min-width:72px; border-radius:999px; padding:4px 8px; color:white; text-align:center; font-size:12px; font-weight:800; }
    .critical { background:var(--critical); }
    .high { background:var(--high); }
    .medium { background:var(--medium); }
    .low { background:var(--low); }
    ul { padding-left:20px; }
    @media (max-width: 760px) { .summary { grid-template-columns:1fr 1fr; } table { display:block; overflow-x:auto; } }
  </style>
</head>
<body>
  <header>
    <p>AgentFence Security Scan</p>
    <h1>${escapeHtml(result.riskLevel)} risk</h1>
  </header>
  <main>
    <div class="summary">
      <div class="card"><span>Risk score</span><strong>${result.riskScore}/100</strong></div>
      <div class="card"><span>Findings</span><strong>${result.findings.length}</strong></div>
      <div class="card"><span>Scanned files</span><strong>${result.scannedFiles.length}</strong></div>
      <div class="card"><span>Completed</span><strong>${new Date(result.completedAt).toLocaleTimeString()}</strong></div>
    </div>
    <section>
      <h2>Policy</h2>
      <p>${escapeHtml(policyText)}</p>
    </section>
    <section>
      <h2>Findings</h2>
      <table>
        <thead>
          <tr><th>Severity</th><th>Finding</th><th>File</th><th>Detail</th><th>Recommendation</th></tr>
        </thead>
        <tbody>${findingRows || `<tr><td colspan="5">No findings.</td></tr>`}</tbody>
      </table>
    </section>
    <section>
      <h2>Scanned Files</h2>
      <ul>${scannedFiles || "<li>No agent or MCP config files found.</li>"}</ul>
    </section>
  </main>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
