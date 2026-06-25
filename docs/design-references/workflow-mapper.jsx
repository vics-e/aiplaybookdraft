import { useState, useRef, useEffect, useCallback } from "react";

const QUADRANTS = {
  topRight: { label: "Strong Agent Candidate", sub: "Automate first", color: "#00D639" },
  topLeft: { label: "Human-Led + Assistant", sub: "AI supports your judgement", color: "#FFB800" },
  bottomRight: { label: "Assistant Task", sub: "Delegate to AI tools", color: "#6B8AFF" },
  bottomLeft: { label: "Fully Human-Led", sub: "Keep human for now", color: "#FF6B6B" },
};

function getQuadrant(rep, jud) {
  if (rep >= 3 && jud < 3) return "topRight";
  if (rep >= 3 && jud >= 3) return "topLeft";
  if (rep < 3 && jud < 3) return "bottomRight";
  return "bottomLeft";
}

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const Steps = ({ current }) => (
  <div style={{ display: "flex", gap: 0, marginBottom: 40, width: "100%" }}>
    {["List workflows", "Score each", "See the map", "Prioritise"].map((s, i) => (
      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: i <= current ? "#00D639" : "#1A1A1A",
          color: i <= current ? "#000" : "#555",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, fontWeight: 700,
          transition: "all 0.3s ease",
          border: i === current ? "2px solid #00D639" : "2px solid transparent",
          boxShadow: i === current ? "0 0 12px rgba(0,214,57,0.3)" : "none"
        }}>{i + 1}</div>
        <span style={{
          fontSize: 11, color: i <= current ? "#ccc" : "#444",
          textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500,
          transition: "color 0.3s ease"
        }}>{s}</span>
      </div>
    ))}
  </div>
);

const ScoreSlider = ({ label, value, onChange, hint }) => (
  <div style={{ marginBottom: 12 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, color: "#00D639", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{value}/5</span>
    </div>
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => onChange(n)} style={{
          flex: 1, height: 36, border: "none", borderRadius: 6, cursor: "pointer",
          background: n <= value ? (label.includes("Repeat") ? "#00D639" : "#FFB800") : "#1A1A1A",
          color: n <= value ? "#000" : "#555",
          fontWeight: 700, fontSize: 14,
          transition: "all 0.15s ease",
          opacity: n <= value ? 1 : 0.6
        }}>{n}</button>
      ))}
    </div>
    <div style={{ fontSize: 10, color: "#555", marginTop: 4 }}>{hint}</div>
  </div>
);

function generateExportText(workflows, selected) {
  const grouped = {};
  Object.keys(QUADRANTS).forEach(k => { grouped[k] = []; });
  workflows.forEach((w, i) => {
    const q = getQuadrant(w.repeatability, w.judgement);
    grouped[q].push({ ...w, idx: i });
  });

  const line = String.fromCharCode(9472).repeat(48);
  let text = "WORKFLOW MAPPING RESULTS\n";
  text += "Generated from AI Playbook \u2014 Workflow Mapper\n";
  text += line + "\n\n";

  Object.entries(QUADRANTS).forEach(([key, q]) => {
    if (grouped[key].length === 0) return;
    text += q.label.toUpperCase() + "\n";
    text += q.sub + "\n";
    grouped[key].forEach(w => {
      const marker = selected.has(w.idx) ? "  \u2190 PRIORITY" : "";
      text += "  \u2022 " + w.name + " (Rep: " + w.repeatability + "/5, Jud: " + w.judgement + "/5)" + marker + "\n";
    });
    text += "\n";
  });

  if (selected.size > 0) {
    text += line + "\n";
    text += "SELECTED PRIORITIES\n";
    [...selected].forEach(i => {
      text += "  \u2192 " + workflows[i]?.name + "\n";
    });
    text += "\nNext steps: Map end-to-end steps, identify data inputs, run a small test with one team member before scaling.\n";
  }

  return text;
}

function generateCSV(workflows) {
  let csv = "Workflow,Repeatability,Judgement,Category,Recommendation\n";
  workflows.forEach(w => {
    const q = getQuadrant(w.repeatability, w.judgement);
    const qData = QUADRANTS[q];
    csv += '"' + w.name.replace(/"/g, '""') + '",' + w.repeatability + "," + w.judgement + ',"' + qData.label + '","' + qData.sub + '"\n';
  });
  return csv;
}

export default function WorkflowMapper() {
  const [step, setStep] = useState(0);
  const [workflows, setWorkflows] = useState([]);
  const [input, setInput] = useState("");
  const [currentScoring, setCurrentScoring] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [hoveredDot, setHoveredDot] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (step === 0 && inputRef.current) inputRef.current.focus();
  }, [step]);

  const addWorkflow = () => {
    const name = input.trim();
    if (!name || workflows.length >= 15) return;
    setWorkflows([...workflows, { name, repeatability: 3, judgement: 3 }]);
    setInput("");
    inputRef.current?.focus();
  };

  const removeWorkflow = (i) => {
    setWorkflows(workflows.filter((_, idx) => idx !== i));
  };

  const updateScore = (idx, field, val) => {
    const updated = [...workflows];
    updated[idx] = { ...updated[idx], [field]: val };
    setWorkflows(updated);
  };

  const toggleSelect = (i) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else if (next.size < 2) next.add(i);
    setSelected(next);
  };

  const handleCopy = useCallback(() => {
    const text = generateExportText(workflows, selected);
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback("copied");
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  }, [workflows, selected]);

  const handleExportCSV = useCallback(() => {
    const csv = generateCSV(workflows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workflow-mapping.csv";
    a.click();
    URL.revokeObjectURL(url);
    setCopyFeedback("exported");
    setTimeout(() => setCopyFeedback(null), 2000);
  }, [workflows]);

  const agentCandidates = workflows
    .map((w, i) => ({ ...w, idx: i }))
    .filter(w => getQuadrant(w.repeatability, w.judgement) === "topRight");

  const btnSecondary = {
    background: "#111", color: "#999", border: "1px solid #222",
    borderRadius: 8, padding: "10px 20px", fontSize: 13, cursor: "pointer", fontWeight: 600
  };

  const btnPrimary = {
    background: "#00D639", color: "#000", border: "none",
    borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer"
  };

  return (
    <div style={{
      background: "#000", color: "#fff", minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "32px 24px", maxWidth: 640, margin: "0 auto"
    }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#00D639", fontWeight: 600 }}>
          AI Playbook
        </span>
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.02em" }}>
        Workflow Mapper
      </h1>
      <p style={{ fontSize: 13, color: "#666", margin: "0 0 32px", lineHeight: 1.5 }}>
        Find which workflows in your firm are ready for AI agents.
      </p>

      <Steps current={step} />

      {/* STEP 1 */}
      {step === 0 && (
        <div>
          <p style={{ fontSize: 14, color: "#999", marginBottom: 16, lineHeight: 1.6 }}>
            List 5–15 common workflows in your firm. Think about what your team does repeatedly — monthly reporting, client onboarding, VAT returns, payroll runs.
          </p>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addWorkflow()}
              placeholder="e.g. Monthly management accounts"
              style={{
                flex: 1, background: "#111", border: "1px solid #222", borderRadius: 8,
                padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none",
              }}
            />
            <button onClick={addWorkflow} disabled={!input.trim() || workflows.length >= 15} style={{
              background: input.trim() ? "#00D639" : "#1A1A1A",
              color: input.trim() ? "#000" : "#444",
              border: "none", borderRadius: 8, padding: "0 20px",
              fontWeight: 700, fontSize: 14, cursor: input.trim() ? "pointer" : "default",
              transition: "all 0.2s ease"
            }}>Add</button>
          </div>
          {workflows.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {workflows.map((w, i) => (
                <div key={i} style={{
                  background: "#111", border: "1px solid #222", borderRadius: 20,
                  padding: "8px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8
                }}>
                  <span>{w.name}</span>
                  <button onClick={() => removeWorkflow(i)} style={{
                    background: "none", border: "none", color: "#555", cursor: "pointer",
                    fontSize: 16, padding: 0, lineHeight: 1
                  }}>×</button>
                </div>
              ))}
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#444" }}>{workflows.length}/15 workflows</span>
            <button onClick={() => { setStep(1); setCurrentScoring(0); }} disabled={workflows.length < 3} style={{
              ...btnPrimary,
              background: workflows.length >= 3 ? "#00D639" : "#1A1A1A",
              color: workflows.length >= 3 ? "#000" : "#444",
              cursor: workflows.length >= 3 ? "pointer" : "default",
            }}>Score these →</button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 1 && (
        <div>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 20
          }}>
            <span style={{ fontSize: 12, color: "#555" }}>
              {currentScoring + 1} of {workflows.length}
            </span>
            <div style={{
              height: 3, flex: 1, margin: "0 16px", background: "#1A1A1A", borderRadius: 2, overflow: "hidden"
            }}>
              <div style={{
                height: "100%", width: `${((currentScoring + 1) / workflows.length) * 100}%`,
                background: "#00D639", borderRadius: 2, transition: "width 0.3s ease"
              }} />
            </div>
          </div>

          <div style={{
            background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 12,
            padding: 24, marginBottom: 20
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.01em" }}>
              {workflows[currentScoring]?.name}
            </h3>
            <ScoreSlider
              label="Repeatability"
              value={workflows[currentScoring]?.repeatability || 3}
              onChange={v => updateScore(currentScoring, "repeatability", v)}
              hint="1 = rare/ad-hoc → 5 = daily, identical steps every time"
            />
            <ScoreSlider
              label="Judgement Required"
              value={workflows[currentScoring]?.judgement || 3}
              onChange={v => updateScore(currentScoring, "judgement", v)}
              hint="1 = pure data entry → 5 = deep professional interpretation"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => currentScoring > 0 ? setCurrentScoring(currentScoring - 1) : setStep(0)} style={btnSecondary}>← Back</button>
            <button onClick={() => {
              if (currentScoring < workflows.length - 1) setCurrentScoring(currentScoring + 1);
              else setStep(2);
            }} style={btnPrimary}>
              {currentScoring < workflows.length - 1 ? "Next →" : "See results →"}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 2 && (
        <div>
          <p style={{ fontSize: 13, color: "#777", marginBottom: 20, lineHeight: 1.5 }}>
            Your workflows plotted by repeatability vs judgement. The green zone is where AI agents can take over.
          </p>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1", marginBottom: 24 }}>
            <div style={{ position: "absolute", inset: 0, background: "#0A0A0A", borderRadius: 12, border: "1px solid #1A1A1A", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "60%", height: "60%", background: "rgba(0,214,57,0.06)", borderBottom: "1px dashed #1A1A1A", borderLeft: "1px dashed #1A1A1A" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "60%", background: "rgba(255,184,0,0.04)", borderBottom: "1px dashed #1A1A1A" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "60%", height: "40%", background: "rgba(107,138,255,0.04)", borderLeft: "1px dashed #1A1A1A" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: "40%", background: "rgba(255,107,107,0.04)" }} />

              {[
                { q: "topLeft", top: 8, left: 8 },
                { q: "topRight", top: 8, right: 8 },
                { q: "bottomLeft", bottom: 8, left: 8 },
                { q: "bottomRight", bottom: 8, right: 8 },
              ].map(({ q, ...pos }) => (
                <div key={q} style={{
                  position: "absolute", ...pos, fontSize: 10, color: QUADRANTS[q].color,
                  opacity: 0.6, fontWeight: 600, maxWidth: "45%",
                  textAlign: pos.right !== undefined ? "right" : "left"
                }}>
                  {QUADRANTS[q].label}
                </div>
              ))}

              {workflows.map((w, i) => {
                const x = ((w.repeatability - 0.5) / 5) * 100;
                const y = (1 - (w.judgement - 0.5) / 5) * 100;
                const q = getQuadrant(w.repeatability, w.judgement);
                const isHovered = hoveredDot === i;
                return (
                  <div key={i}>
                    <div
                      onMouseEnter={() => setHoveredDot(i)}
                      onMouseLeave={() => setHoveredDot(null)}
                      style={{
                        position: "absolute",
                        left: `${x}%`, top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                        width: isHovered ? 16 : 12, height: isHovered ? 16 : 12,
                        borderRadius: "50%",
                        background: QUADRANTS[q].color,
                        border: `2px solid ${QUADRANTS[q].color}`,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        zIndex: isHovered ? 10 : 1,
                        boxShadow: isHovered ? `0 0 16px ${QUADRANTS[q].color}44` : "none"
                      }}
                    />
                    {isHovered && (
                      <div style={{
                        position: "absolute",
                        left: `${x}%`, top: `${y}%`,
                        transform: `translate(-50%, ${y < 30 ? '12px' : '-100%'})`,
                        marginTop: y < 30 ? 0 : -8,
                        background: "#000", border: `1px solid ${QUADRANTS[q].color}44`,
                        borderRadius: 8, padding: "8px 12px",
                        zIndex: 20, whiteSpace: "nowrap",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.8)"
                      }}>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>{w.name}</div>
                        <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>
                          Rep: {w.repeatability} · Jud: {w.judgement}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ position: "absolute", bottom: -22, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "#444", fontWeight: 500 }}>
                Repeatability →
              </div>
              <div style={{ position: "absolute", left: -28, top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontSize: 11, color: "#444", fontWeight: 500 }}>
                Judgement →
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20, marginTop: 32 }}>
            {Object.entries(QUADRANTS).map(([key, q]) => {
              const count = workflows.filter(w => getQuadrant(w.repeatability, w.judgement) === key).length;
              return (
                <div key={key} style={{
                  background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 10,
                  padding: "12px 14px", display: "flex", alignItems: "center", gap: 10
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: `${q.color}18`, color: q.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, flexShrink: 0
                  }}>{count}</div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: q.color }}>{q.label}</div>
                    <div style={{ fontSize: 10, color: "#555" }}>{q.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => { setStep(1); setCurrentScoring(workflows.length - 1); }} style={btnSecondary}>← Adjust scores</button>
            <button onClick={() => { setStep(3); setSelected(new Set()); }} style={btnPrimary}>Prioritise →</button>
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 3 && (
        <div>
          {agentCandidates.length > 0 ? (
            <>
              <p style={{ fontSize: 14, color: "#999", marginBottom: 6, lineHeight: 1.6 }}>
                These workflows scored high on repeatability and low on judgement — your strongest candidates for AI agents.
              </p>
              <p style={{ fontSize: 13, color: "#555", marginBottom: 20 }}>
                Pick 1–2 to start with based on impact, data availability, and team readiness.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                {agentCandidates.map((w) => {
                  const isSel = selected.has(w.idx);
                  return (
                    <button key={w.idx} onClick={() => toggleSelect(w.idx)} style={{
                      background: isSel ? "rgba(0,214,57,0.1)" : "#0A0A0A",
                      border: isSel ? "1px solid #00D639" : "1px solid #1A1A1A",
                      borderRadius: 10, padding: "16px 18px", cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      transition: "all 0.2s ease", textAlign: "left"
                    }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{w.name}</div>
                        <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>
                          Repeatability {w.repeatability}/5 · Judgement {w.judgement}/5
                        </div>
                      </div>
                      <div style={{
                        width: 24, height: 24, borderRadius: 6,
                        border: isSel ? "2px solid #00D639" : "2px solid #333",
                        background: isSel ? "#00D639" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s ease", flexShrink: 0
                      }}>
                        {isSel && <span style={{ color: "#000", fontSize: 14, fontWeight: 800 }}>✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div style={{
              background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 12,
              padding: 28, textAlign: "center", marginBottom: 24
            }}>
              <p style={{ fontSize: 14, color: "#999", margin: 0, lineHeight: 1.6 }}>
                None of your workflows fell into the strong agent candidate zone. Go back and review your scores, or look at the assistant task quadrant for quick wins with AI tools.
              </p>
            </div>
          )}

          {Object.entries(QUADRANTS).filter(([k]) => k !== "topRight").map(([key, q]) => {
            const items = workflows.filter(w => getQuadrant(w.repeatability, w.judgement) === key);
            if (items.length === 0) return null;
            return (
              <div key={key} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: q.color, marginBottom: 8 }}>
                  {q.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {items.map((w, i) => (
                    <span key={i} style={{
                      background: `${q.color}10`, border: `1px solid ${q.color}22`,
                      borderRadius: 16, padding: "5px 12px", fontSize: 12, color: "#aaa"
                    }}>{w.name}</span>
                  ))}
                </div>
              </div>
            );
          })}

          {selected.size > 0 && (
            <div style={{
              background: "rgba(0,214,57,0.05)", border: "1px solid rgba(0,214,57,0.2)",
              borderRadius: 12, padding: 20, marginTop: 24
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#00D639", marginBottom: 8 }}>
                Your starting point
              </div>
              <p style={{ fontSize: 13, color: "#999", margin: 0, lineHeight: 1.6 }}>
                Start with{" "}
                {[...selected].map(i => (
                  <strong key={i} style={{ color: "#fff" }}>{workflows[i]?.name}</strong>
                )).reduce((a, b) => [a, " and ", b])}.{" "}
                Map the end-to-end steps, identify the data inputs, and run a small test with one team member before scaling.
              </p>
            </div>
          )}

          {/* Export bar */}
          <div style={{
            marginTop: 28, padding: "16px 0", borderTop: "1px solid #1A1A1A",
            display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center"
          }}>
            {copyFeedback && (
              <span style={{ fontSize: 12, color: "#00D639", fontWeight: 500, marginRight: 8, display: "flex", alignItems: "center", gap: 4 }}>
                <CheckIcon /> {copyFeedback === "copied" ? "Copied to clipboard" : "CSV downloaded"}
              </span>
            )}
            <button onClick={handleCopy} style={{
              ...btnSecondary, display: "flex", alignItems: "center", gap: 6, padding: "8px 16px"
            }}>
              <CopyIcon /> Copy summary
            </button>
            <button onClick={handleExportCSV} style={{
              ...btnSecondary, display: "flex", alignItems: "center", gap: 6, padding: "8px 16px"
            }}>
              <DownloadIcon /> Export CSV
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
            <button onClick={() => setStep(2)} style={btnSecondary}>← Back to map</button>
            <button onClick={() => { setStep(0); setWorkflows([]); setSelected(new Set()); }} style={btnSecondary}>Start over</button>
          </div>
        </div>
      )}
    </div>
  );
}
