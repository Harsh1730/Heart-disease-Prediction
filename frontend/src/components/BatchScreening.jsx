import React, { useState } from 'react';
import { Play, AlertTriangle } from 'lucide-react';
import { predictBatch } from '../services/api';

const SAMPLE_PATIENTS = [
  { patientId: 'COHORT-101', patientName: 'Sarah Jenkins',  age: 48, sex: 'F', chestPainType: 'ATA', restingBP: 120, cholesterol: 195, fastingBS: 0, restingECG: 'Normal', maxHR: 165, exerciseAngina: 'N', oldpeak: 0.0, stSlope: 'Up' },
  { patientId: 'COHORT-102', patientName: 'Marcus Vance',   age: 63, sex: 'M', chestPainType: 'ASY', restingBP: 155, cholesterol: 275, fastingBS: 1, restingECG: 'ST',     maxHR: 110, exerciseAngina: 'Y', oldpeak: 2.6, stSlope: 'Flat' },
  { patientId: 'COHORT-103', patientName: 'Priya Patel',    age: 56, sex: 'F', chestPainType: 'NAP', restingBP: 135, cholesterol: 230, fastingBS: 0, restingECG: 'Normal', maxHR: 145, exerciseAngina: 'N', oldpeak: 0.8, stSlope: 'Up' },
  { patientId: 'COHORT-104', patientName: 'William Howard', age: 71, sex: 'M', chestPainType: 'TA',  restingBP: 165, cholesterol: 290, fastingBS: 1, restingECG: 'LVH',    maxHR: 115, exerciseAngina: 'Y', oldpeak: 3.0, stSlope: 'Down' },
  { patientId: 'COHORT-105', patientName: 'Lucas Morales',  age: 38, sex: 'M', chestPainType: 'ATA', restingBP: 118, cholesterol: 185, fastingBS: 0, restingECG: 'Normal', maxHR: 172, exerciseAngina: 'N', oldpeak: 0.1, stSlope: 'Up' },
];

export default function BatchScreening({ backendOnline }) {
  const [loading, setLoading] = useState(false);
  const [batchResponse, setBatchResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Clear stale batch response if backend goes offline
  React.useEffect(() => {
    if (backendOnline === false) {
      setBatchResponse(null);
    }
  }, [backendOnline]);

  const handleRunBatch = async () => {
    if (backendOnline === false) {
      setErrorMsg('Inference service is offline. Start Spring Boot on port 8080 to score patient cohorts.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const data = await predictBatch(SAMPLE_PATIENTS);
      setBatchResponse(data);
    } catch (err) {
      setBatchResponse(null);
      const statusText = err.response ? `HTTP ${err.response.status}` : 'offline';
      setErrorMsg(
        err.response?.data?.message ||
        `Inference service unavailable (${statusText}). Ensure the Spring Boot backend is active on port 8080.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Dark editorial header bar */}
      <div className="batch-header-bar">
        <div className="batch-header-overline">§ 02 — Cohort Batch Screening</div>
        <div className="batch-header-title">Multi-Patient Triage Engine</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          <p className="batch-header-sub">
            Simultaneously score multiple cardiac profiles through the Spring Boot high-throughput inference engine.
            {' '}{SAMPLE_PATIENTS.length} sample cases loaded.
          </p>
          <button
            type="button"
            id="run-batch-screen-btn"
            className="btn-primary"
            onClick={handleRunBatch}
            disabled={loading || backendOnline === false}
          >
            {loading ? (
              <><span className="loading-ring" /> Running Triage…</>
            ) : backendOnline === false ? (
              <><AlertTriangle size={14} /> ⊘ Backend Offline</>
            ) : (
              <><Play size={14} /> Evaluate {SAMPLE_PATIENTS.length} Patients →</>
            )}
          </button>
        </div>
      </div>

      {/* Offline notice */}
      {backendOnline === false && (
        <div className="error-banner" style={{ margin: '1.5rem 0' }}>
          <AlertTriangle size={16} />
          <div>
            <strong>Inference Engine Disconnected:</strong> Batch cohort scoring is processed exclusively by the
            Spring Boot KNN engine on port 8080. Start the backend service to triage cohorts.
          </div>
        </div>
      )}

      {/* Error state */}
      {errorMsg && backendOnline !== false && (
        <div className="error-banner" style={{ margin: '1.5rem 0' }}>
          <AlertTriangle size={16} /> {errorMsg}
        </div>
      )}

      {/* Results */}
      {batchResponse && (
        <div className="fade-in">
          <div className="cohort-stats-row">
            <div className="cohort-stat">
              <div className="cohort-stat-label">Total Screened</div>
              <div className="cohort-stat-value">{batchResponse.totalPatients}</div>
            </div>
            <div className="cohort-stat">
              <div className="cohort-stat-label">Elevated Risk</div>
              <div className="cohort-stat-value high">{batchResponse.highRiskCount}</div>
            </div>
            <div className="cohort-stat">
              <div className="cohort-stat-label">Low Risk / Normal</div>
              <div className="cohort-stat-value low">{batchResponse.lowRiskCount}</div>
            </div>
            <div className="cohort-stat">
              <div className="cohort-stat-label">Cohort Mean Risk</div>
              <div className="cohort-stat-value">{batchResponse.averageRiskPercentage}%</div>
            </div>
          </div>
          <div className="editorial-table-wrap">
            <table className="editorial-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Vitals &amp; Demographics</th>
                  <th>Chest Pain</th>
                  <th>ST Depression</th>
                  <th>Risk Score</th>
                  <th>Verdict</th>
                  <th>Consensus</th>
                </tr>
              </thead>
              <tbody>
                {batchResponse.results.map((r, i) => {
                  const isPos = r.prediction === 1;
                  const p = SAMPLE_PATIENTS[i];
                  return (
                    <tr key={i}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.85rem' }}>{r.patientName}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--ink-faint)', marginTop: '2px' }}>{r.patientId}</div>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{p.age}y · {p.sex} · {p.restingBP} mmHg</td>
                      <td>
                        <span className="badge badge-mod">{p.chestPainType}</span>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{p.oldpeak.toFixed(1)} mm · {p.stSlope}</td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900, color: isPos ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                          {r.riskScorePercentage.toFixed(1)}%
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${isPos ? 'badge-high' : 'badge-low'}`}>
                          {isPos ? 'Elevated Risk' : 'Low Risk'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>{r.confidence}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
