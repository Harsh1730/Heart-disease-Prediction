import React from 'react';
import { ShieldAlert, ShieldCheck, Printer, AlertCircle, CheckCircle2, Users, FileText, Activity, RotateCcw, AlertTriangle } from 'lucide-react';

export default function ResultDashboard({ result, loading, errorMsg, onRetry, backendOnline }) {
  if (loading) {
    return (
      <div className="result-panel">
        <div className="result-panel-header">
          <div className="result-panel-title">Diagnostic Review</div>
        </div>
        <div className="result-standby">
          <div className="result-standby-icon">
            <Activity size={22} className="spin" style={{ color: 'var(--red)' }} />
          </div>
          <div className="result-standby-heading">Running ML Inference</div>
          <p className="result-standby-note">Querying nearest neighbor space across 734 clinical training cases…</p>
        </div>
      </div>
    );
  }

  if (backendOnline === false) {
    return (
      <div className="result-panel error-state fade-in" id="results-dashboard-panel">
        <div className="result-panel-header">
          <div className="result-panel-title">Diagnostic Review</div>
          <div className="result-panel-sub" style={{ color: 'var(--risk-high)', fontWeight: 600 }}>Inference Engine Offline</div>
        </div>
        <div className="result-standby result-standby-error">
          <div className="result-standby-icon" style={{ background: 'var(--risk-high-bg)', color: 'var(--risk-high)', border: '1px solid var(--risk-high)' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="result-standby-heading" style={{ color: 'var(--risk-high)' }}>
            Backend Disconnected (Port 8080)
          </div>
          <p className="result-standby-note" style={{ color: 'var(--ink)' }}>
            The frontend contains no local ML engine or mock calculations. All cardiac risk evaluations require the active Spring Boot K-Nearest Neighbors service.
          </p>
          <div className="error-troubleshoot-box">
            <div className="error-troubleshoot-title">To start the inference backend:</div>
            <ul>
              <li>Open terminal in <code>backend/</code> directory</li>
              <li>Execute: <code>mvn spring-boot:run</code></li>
              <li>Or run pre-built JAR: <code>java -jar backend/target/heartguard-backend-1.0.0.jar</code></li>
            </ul>
          </div>
          {onRetry && (
            <button type="button" className="btn-primary" onClick={onRetry} style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}>
              <RotateCcw size={14} /> Re-check Connection →
            </button>
          )}
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="result-panel error-state fade-in" id="results-dashboard-panel">
        <div className="result-panel-header">
          <div className="result-panel-title">Diagnostic Review</div>
          <div className="result-panel-sub" style={{ color: 'var(--risk-high)', fontWeight: 600 }}>Engine Disconnected</div>
        </div>
        <div className="result-standby result-standby-error">
          <div className="result-standby-icon" style={{ background: 'var(--risk-high-bg)', color: 'var(--risk-high)', border: '1px solid var(--risk-high)' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="result-standby-heading" style={{ color: 'var(--risk-high)' }}>
            Inference Engine Unavailable
          </div>
          <p className="result-standby-note" style={{ color: 'var(--ink)' }}>
            {errorMsg}
          </p>
          <div className="error-troubleshoot-box">
            <div className="error-troubleshoot-title">Troubleshooting:</div>
            <ul>
              <li>Check that Spring Boot is running on <strong>port 8080</strong>.</li>
              <li>Terminal command: <code>java -jar backend/target/heartguard-backend-1.0.0.jar</code></li>
            </ul>
          </div>
          {onRetry && (
            <button type="button" className="btn-primary" onClick={onRetry} style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}>
              <RotateCcw size={14} /> Retry Assessment →
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-panel">
        <div className="result-panel-header">
          <div className="result-panel-title">Diagnostic Review</div>
          <div className="result-panel-sub">Engine connected. Submit intake to evaluate.</div>
        </div>
        <div className="result-standby">
          <div className="result-standby-icon"><FileText size={22} /></div>
          <div className="result-standby-heading">Awaiting Clinical Data</div>
          <p className="result-standby-note">
            Select a pre-calibrated profile or complete the intake form to query the Spring Boot KNN backend across 734 training cases.
          </p>
          <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.75rem', color: 'var(--risk-low)', fontFamily: 'var(--font-sans)', fontWeight: 600, background: 'var(--risk-low-bg)', padding: '0.35rem 0.75rem', border: '1px solid var(--border)' }}>
            <CheckCircle2 size={13} /> Spring Boot 3 Engine Connected (Port 8080)
          </div>
        </div>
      </div>
    );
  }

  const isPos = result.prediction === 1;
  const score = result.riskScorePercentage || 0;
  const tier = score <= 25 ? 'low' : score <= 50 ? 'mod' : 'high';

  return (
    <aside className="result-panel fade-in" id="results-dashboard-panel">
      {/* Header */}
      <div className="result-panel-header">
        <div>
          <div className="result-panel-title">Diagnostic Review</div>
          <div className="result-panel-sub">
            {result.patientName || 'Anonymous'} · {result.patientId}
          </div>
          <div style={{ marginTop: '0.35rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.67rem', color: 'var(--risk-low)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
            <CheckCircle2 size={11} /> Spring Boot 3 Engine · Live Backend Inference
          </div>
        </div>
        <button type="button" id="print-report-btn" className="btn-ghost" onClick={() => window.print()}>
          <Printer size={13} /> Print
        </button>
      </div>

      {/* Verdict */}
      <div className={`verdict-box ${isPos ? 'high' : 'low'}`}>
        <div>
          {isPos
            ? <ShieldAlert size={28} style={{ color: 'var(--risk-high)' }} />
            : <ShieldCheck size={28} style={{ color: 'var(--risk-low)' }} />
          }
        </div>
        <div>
          <div className="verdict-heading">
            {isPos ? 'Elevated Cardiac Risk' : 'Low Cardiac Risk'}
          </div>
          <div className="verdict-confidence">Consensus: {result.confidence}</div>
        </div>
      </div>

      {/* Risk Score */}
      <div className="risk-score-block">
        <div className="risk-score-row">
          <span className="risk-score-label">Estimated Risk Score</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: isPos ? 'var(--risk-high)' : 'var(--risk-low)' }}>
            {result.riskLevel}
          </span>
        </div>
        <div className={`risk-score-number ${isPos ? 'high' : 'low'}`}>{score.toFixed(1)}%</div>
        <div className="risk-progress-track" style={{ marginTop: '0.6rem' }}>
          <div className={`risk-progress-fill ${tier}`} style={{ width: `${Math.min(100, Math.max(4, score))}%` }} />
        </div>
        <div className="risk-progress-labels">
          <span>0%</span><span>25% Mild</span><span>50% Mod</span><span>75% High</span><span>100%</span>
        </div>
      </div>

      {/* Risk Factors */}
      {result.riskFactors && result.riskFactors.length > 0 && (
        <div className="result-section">
          <div className="result-section-label">
            <AlertCircle size={12} style={{ color: 'var(--risk-mod)' }} />
            Identified Risk Contributors
          </div>
          {result.riskFactors.map((rf, i) => (
            <div key={i} className="risk-factor-item">
              <span className="risk-factor-bullet">▪</span>
              <span>{rf}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div className="result-section">
          <div className="result-section-label">
            <CheckCircle2 size={12} style={{ color: 'var(--risk-low)' }} />
            Suggested Clinical Next Steps
          </div>
          {result.recommendations.map((rec, i) => (
            <div key={i} className="rec-item">
              <span className="rec-arrow">›</span>
              <span>{rec}</span>
            </div>
          ))}
        </div>
      )}

      {/* Nearest Neighbors */}
      {result.nearestNeighbors && result.nearestNeighbors.length > 0 && (
        <div className="result-section" style={{ marginBottom: 0 }}>
          <div className="result-section-label">
            <Users size={12} />
            Nearest Training Cases (k=5)
          </div>
          <table className="neighbors-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Distance</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {result.nearestNeighbors.map(n => (
                <tr key={n.neighborRank}>
                  <td>Case #{n.neighborRank}</td>
                  <td>d = {n.distance.toFixed(2)}</td>
                  <td>
                    <span style={{ color: n.label === 1 ? 'var(--risk-high)' : 'var(--risk-low)', fontWeight: 700 }}>
                      {n.label === 1 ? 'Disease (+)' : 'Normal (−)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </aside>
  );
}
