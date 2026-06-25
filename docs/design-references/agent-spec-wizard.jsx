import { useState, useRef, useEffect, useCallback } from "react";

const FIELDS = [
  {
    key: "workflow",
    label: "Workflow name",
    question: "What workflow is this agent handling?",
    placeholder: "e.g., Quarterly update preparation",
    hint: "Pick the workflow you identified as a strong agent candidate from the mapping exercise.",
  },
  {
    key: "goal",
    label: "Goal or outcome",
    question: "What result should this agent achieve?",
    placeholder: "e.g., Produce a draft quarterly client update letter with key financial movements highlighted",
    hint: "Be specific. A vague goal leads to a vague agent. What does 'done' look like?",
  },
  {
    key: "trigger",
    label: "Trigger",
    question: "What starts this process?",
    placeholder: "e.g., Month-end close is completed and trial balance is available",
    hint: "Triggers can be time-based (every Monday), event-based (new client signed), or manual (team member initiates).",
  },
  {
    key: "inputs",
    label: "Inputs required",
    question: "What information or data does the agent need?",
    placeholder: "e.g., Trial balance export, prior quarter letter, client contact details",
    hint: "List every data source. If the agent can't access the data, it can't do the work.",
  },
  {
    key: "behaviour",
    label: "Agent behaviour",
    question: "What actions should the agent perform?",
    placeholder: "e.g., Compare current vs prior period, flag variances over 10%, draft narrative for each material movement",
    hint: "Describe the steps as if briefing a new hire. What does the agent actually do with the inputs?",
  },
  {
    key: "review",
    label: "Human review point",
    question: "Where does the accountant step in?",
    placeholder: "e.g., Review draft letter for accuracy before sending to client, verify variance explanations",
    hint: "This is your guardrail. What must a human check before anything goes out?",
  },
  {
    key: "output",
    label: "Final output",
    question: "What does the agent produce?",
    placeholder: "e.g., Draft update letter (Word), variance summary table, flagged items list",
    hint: "Name the deliverable and its format. The clearer this is, the easier it is to evaluate the agent.",
  },
  {
    key: "escalation",
    label: "Escalation rules",
    question: "When must the agent stop and alert a human?",
    placeholder: "e.g., Missing data fields, variances exceeding 25%, new client with no prior period data",
    hint: "Think about edge cases. When should the agent not try to handle things itself?",
  },
];

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

const ArrowIcon = ({ direction }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}>
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

function generateText(data) {
  const line = String.fromCharCode(9472).repeat(48);
  let t = "AGENT SPECIFICATION\n";
  t += "Generated from AI Playbook\n";
  t += line + "\n\n";
  FIELDS.forEach(f => {
    t += f.label.toUpperCase() + "\n";
    t += (data[f.key] || "(not completed)") + "\n\n";
  });
  return t;
}

function generateCSV(data) {
  let csv = "Field,Value\n";
  FIELDS.forEach(f => {
    const val = (data[f.key] || "").replace(/"/g, '""');
    csv += '"' + f.label + '","' + val + '"\n';
  });
  return csv;
}

export default function AgentSpecWizard() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState({});
  const [phase, setPhase] = useState("build"); // build | review
  const [feedback, setFeedback] = useState(null);
  const textRef = useRef(null);

  const field = FIELDS[current];
  const filled = FIELDS.filter(f => data[f.key]?.trim()).length;
  const allDone = filled === FIELDS.length;

  useEffect(() => {
    if (phase === "build" && textRef.current) {
      textRef.current.focus();
    }
  }, [current, phase]);

  const handleNext = () => {
    if (current < FIELDS.length - 1) setCurrent(current + 1);
    else setPhase("review");
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generateText(data)).then(() => {
      setFeedback("copied");
      setTimeout(() => setFeedback(null), 2000);
    });
  }, [data]);

  const handleCSV = useCallback(() => {
    const blob = new Blob([generateCSV(data)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agent-spec.csv";
    a.click();
    URL.revokeObjectURL(url);
    setFeedback("exported");
    setTimeout(() => setFeedback(null), 2000);
  }, [data]);

  const btn = (primary) => ({
    background: primary ? "#00D639" : "#111",
    color: primary ? "#000" : "#999",
    border: primary ? "none" : "1px solid #222",
    borderRadius: 8,
    padding: primary ? "12px 24px" : "10px 20px",
    fontSize: primary ? 14 : 13,
    fontWeight: primary ? 700 : 600,
    cursor: "pointer",
    display: "flex", alignItems: "center", gap: 6,
  });

  return (
    <div style={{
      background: "#000", color: "#fff", minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      padding: "32px 24px", maxWidth: 640, margin: "0 auto",
    }}>
      <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "#00D639", fontWeight: 600 }}>
        AI Playbook
      </span>
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 6px", letterSpacing: "-0.02em" }}>
        Agent Spec Builder
      </h1>
      <p style={{ fontSize: 13, color: "#666", margin: "0 0 32px", lineHeight: 1.5 }}>
        Define your first agent step by step. Every field matters.
      </p>

      {phase === "build" && (
        <>
          {/* Progress dots */}
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            {FIELDS.map((f, i) => (
              <button key={i} onClick={() => setCurrent(i)} style={{
                flex: 1, height: 4, borderRadius: 2, border: "none", cursor: "pointer", padding: 0,
                background: i === current ? "#00D639" : data[f.key]?.trim() ? "#00D63966" : "#1A1A1A",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          {/* Field counter */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#555", fontVariantNumeric: "tabular-nums" }}>
              {current + 1} / {FIELDS.length}
            </span>
            <span style={{ fontSize: 12, color: "#555" }}>
              {filled} of {FIELDS.length} completed
            </span>
          </div>

          {/* Main card */}
          <div style={{
            background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 12,
            padding: 28, marginBottom: 24,
          }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#00D639", fontWeight: 600, marginBottom: 6 }}>
              {field.label}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              {field.question}
            </h2>
            <p style={{ fontSize: 12, color: "#666", margin: "0 0 20px", lineHeight: 1.5 }}>
              {field.hint}
            </p>
            <textarea
              ref={textRef}
              value={data[field.key] || ""}
              onChange={e => setData({ ...data, [field.key]: e.target.value })}
              placeholder={field.placeholder}
              rows={4}
              style={{
                width: "100%", background: "#111", border: "1px solid #222", borderRadius: 8,
                padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none",
                resize: "vertical", lineHeight: 1.6, boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => current > 0 && setCurrent(current - 1)} disabled={current === 0} style={{
              ...btn(false), opacity: current === 0 ? 0.3 : 1,
              cursor: current === 0 ? "default" : "pointer",
            }}>
              <ArrowIcon direction="left" /> Back
            </button>
            <button onClick={handleNext} style={btn(true)}>
              {current < FIELDS.length - 1 ? <>Next <ArrowIcon direction="right" /></> : "Review spec"}
            </button>
          </div>
        </>
      )}

      {phase === "review" && (
        <>
          <div style={{
            background: allDone ? "rgba(0,214,57,0.05)" : "rgba(255,184,0,0.05)",
            border: `1px solid ${allDone ? "rgba(0,214,57,0.2)" : "rgba(255,184,0,0.2)"}`,
            borderRadius: 10, padding: "12px 16px", marginBottom: 28, fontSize: 13,
            color: allDone ? "#00D639" : "#FFB800",
          }}>
            {allDone
              ? `All ${FIELDS.length} fields completed. Your agent spec is ready.`
              : `${filled} of ${FIELDS.length} fields completed. Tap any field to edit.`
            }
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {FIELDS.map((f, i) => {
              const val = data[f.key]?.trim();
              return (
                <button key={i} onClick={() => { setCurrent(i); setPhase("build"); }} style={{
                  background: "#0A0A0A", border: "1px solid #1A1A1A", borderRadius: 10,
                  padding: "16px 18px", cursor: "pointer", textAlign: "left",
                  transition: "border-color 0.2s ease",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: val ? "#00D639" : "#555", fontWeight: 600, marginBottom: 4 }}>
                        {f.label}
                      </div>
                      <div style={{ fontSize: 13, color: val ? "#ccc" : "#444", lineHeight: 1.5 }}>
                        {val || "Not completed"}
                      </div>
                    </div>
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0, marginTop: 2,
                      background: val ? "#00D639" : "transparent",
                      border: val ? "none" : "2px solid #333",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {val && <CheckIcon />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Export bar */}
          <div style={{
            padding: "16px 0", borderTop: "1px solid #1A1A1A",
            display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center", flexWrap: "wrap",
          }}>
            {feedback && (
              <span style={{ fontSize: 12, color: "#00D639", fontWeight: 500, marginRight: 8, display: "flex", alignItems: "center", gap: 4 }}>
                <CheckIcon /> {feedback === "copied" ? "Copied to clipboard" : "CSV downloaded"}
              </span>
            )}
            <button onClick={handleCopy} style={{ ...btn(false), padding: "8px 16px" }}>
              <CopyIcon /> Copy spec
            </button>
            <button onClick={handleCSV} style={{ ...btn(false), padding: "8px 16px" }}>
              <DownloadIcon /> Export CSV
            </button>
          </div>

          <div style={{ marginTop: 16 }}>
            <button onClick={() => { setPhase("build"); setCurrent(0); }} style={btn(false)}>
              Edit from start
            </button>
          </div>
        </>
      )}
    </div>
  );
}
