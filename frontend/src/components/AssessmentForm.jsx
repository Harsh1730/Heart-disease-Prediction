import React from 'react';
import { RotateCcw, Activity, AlertTriangle } from 'lucide-react';

const CHEST_PAIN = [
  { id: 'ASY', label: 'Asymptomatic', desc: 'Silent ischemia — no chest discomfort' },
  { id: 'NAP', label: 'Non-Anginal', desc: 'Discomfort non-ischemic in origin' },
  { id: 'ATA', label: 'Atypical Angina', desc: 'Atypical exertional symptoms' },
  { id: 'TA',  label: 'Typical Angina', desc: 'Classic retrosternal pressure' },
];

export default function AssessmentForm({ formData, setFormData, onSubmit, loading, onReset, backendOnline }) {
  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  return (
    <form id="patient-assessment-form" className="intake-panel" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      {/* Header */}
      <div className="intake-panel-header">
        <div>
          <div className="intake-panel-title">Patient Clinical Evaluation</div>
          <div className="intake-panel-sub">
            Enter hemodynamics, symptoms, and ECG biomarkers for ML-powered cardiac risk assessment.
          </div>
        </div>
      </div>

      {/* Section 1: Demographics */}
      <div className="intake-section">
        <div className="intake-section-label">01 — Demographics &amp; Hemodynamics</div>
        <div className="field-grid-2" style={{ marginBottom: '1rem' }}>
          <div className="field-row">
            <label htmlFor="patient-name-input" className="field-label">Patient Name / ID</label>
            <input
              id="patient-name-input"
              type="text"
              className="editorial-input"
              placeholder="e.g. Ravi Sharma / PT-4091"
              value={formData.patientName || ''}
              onChange={e => set('patientName', e.target.value)}
            />
          </div>
          <div className="field-row">
            <label className="field-label">Biological Sex</label>
            <div className="seg-control">
              <button type="button" id="sex-m-btn" className={`seg-btn${formData.sex === 'M' ? ' active' : ''}`} onClick={() => set('sex', 'M')}>Male</button>
              <button type="button" id="sex-f-btn" className={`seg-btn${formData.sex === 'F' ? ' active' : ''}`} onClick={() => set('sex', 'F')}>Female</button>
            </div>
          </div>
        </div>
        <div className="field-grid-2">
          <div className="field-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="age-slider" className="field-label" style={{ margin: 0 }}>Age</label>
              <span className="field-value-badge">{formData.age} yrs</span>
            </div>
            <input id="age-slider" type="range" className="editorial-slider" min="20" max="85"
              value={formData.age} onChange={e => set('age', Number(e.target.value))} />
          </div>
          <div className="field-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="bp-slider" className="field-label" style={{ margin: 0 }}>Resting BP</label>
              <span className="field-value-badge">{formData.restingBP} mmHg</span>
            </div>
            <input id="bp-slider" type="range" className="editorial-slider" min="80" max="200"
              value={formData.restingBP} onChange={e => set('restingBP', Number(e.target.value))} />
          </div>
        </div>
        <div className="field-row">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="maxhr-slider" className="field-label" style={{ margin: 0 }}>Max Heart Rate Achieved</label>
            <span className="field-value-badge">{formData.maxHR} bpm</span>
          </div>
          <input id="maxhr-slider" type="range" className="editorial-slider" min="60" max="205"
            value={formData.maxHR} onChange={e => set('maxHR', Number(e.target.value))} />
        </div>
      </div>

      {/* Section 2: Symptoms */}
      <div className="intake-section">
        <div className="intake-section-label">02 — Symptom Profile &amp; Exertion Response</div>
        <div className="field-row">
          <label className="field-label">Chest Pain Type</label>
          <div className="radio-card-grid">
            {CHEST_PAIN.map(opt => (
              <button
                key={opt.id}
                type="button"
                id={`cpt-btn-${opt.id}`}
                className={`radio-card${formData.chestPainType === opt.id ? ' active' : ''}`}
                onClick={() => set('chestPainType', opt.id)}
              >
                <div className="radio-card-title">{opt.label}</div>
                <div className="radio-card-desc">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="field-row" style={{ marginTop: '1rem' }}>
          <label className="field-label">
            Exercise-Induced Angina
            <span style={{ fontWeight: 400, color: 'var(--ink-faint)', marginLeft: '0.4rem' }}>
              — {formData.exerciseAngina === 'Y' ? 'Present' : 'Absent'}
            </span>
          </label>
          <div className="seg-control">
            <button type="button" id="angina-n-btn" className={`seg-btn${formData.exerciseAngina === 'N' ? ' active' : ''}`} onClick={() => set('exerciseAngina', 'N')}>Absent (No)</button>
            <button type="button" id="angina-y-btn" className={`seg-btn${formData.exerciseAngina === 'Y' ? ' active' : ''}`} onClick={() => set('exerciseAngina', 'Y')}>Present (Yes)</button>
          </div>
        </div>
      </div>

      {/* Section 3: Labs & ECG */}
      <div className="intake-section">
        <div className="intake-section-label">03 — Diagnostic Labs &amp; Electrocardiography</div>
        <div className="field-grid-2">
          <div className="field-row">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="chol-slider" className="field-label" style={{ margin: 0 }}>Serum Cholesterol</label>
              <span className="field-value-badge">{formData.cholesterol} mg/dL</span>
            </div>
            <input id="chol-slider" type="range" className="editorial-slider" min="0" max="450" step="5"
              value={formData.cholesterol} onChange={e => set('cholesterol', Number(e.target.value))} />
          </div>
          <div className="field-row">
            <label className="field-label">Fasting Blood Sugar</label>
            <div className="seg-control">
              <button type="button" id="fbs-0-btn" className={`seg-btn${formData.fastingBS === 0 ? ' active' : ''}`} onClick={() => set('fastingBS', 0)}>≤ 120 mg/dL</button>
              <button type="button" id="fbs-1-btn" className={`seg-btn${formData.fastingBS === 1 ? ' active' : ''}`} onClick={() => set('fastingBS', 1)}>&gt; 120 mg/dL</button>
            </div>
          </div>
        </div>
        <div className="field-grid-2" style={{ marginTop: '0.85rem' }}>
          <div className="field-row">
            <label className="field-label">Resting ECG</label>
            <div className="seg-control">
              <button type="button" id="ecg-norm-btn" className={`seg-btn${formData.restingECG === 'Normal' ? ' active' : ''}`} onClick={() => set('restingECG', 'Normal')}>Normal</button>
              <button type="button" id="ecg-st-btn" className={`seg-btn${formData.restingECG === 'ST' ? ' active' : ''}`} onClick={() => set('restingECG', 'ST')}>ST-T Wave</button>
              <button type="button" id="ecg-lvh-btn" className={`seg-btn${formData.restingECG === 'LVH' ? ' active' : ''}`} onClick={() => set('restingECG', 'LVH')}>LVH</button>
            </div>
          </div>
          <div className="field-row">
            <label className="field-label">Peak ST Slope</label>
            <div className="seg-control">
              <button type="button" id="st-up-btn" className={`seg-btn${formData.stSlope === 'Up' ? ' active' : ''}`} onClick={() => set('stSlope', 'Up')}>Up</button>
              <button type="button" id="st-flat-btn" className={`seg-btn${formData.stSlope === 'Flat' ? ' active' : ''}`} onClick={() => set('stSlope', 'Flat')}>Flat</button>
              <button type="button" id="st-down-btn" className={`seg-btn${formData.stSlope === 'Down' ? ' active' : ''}`} onClick={() => set('stSlope', 'Down')}>Down</button>
            </div>
          </div>
        </div>
        <div className="field-row" style={{ marginTop: '0.85rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label htmlFor="oldpeak-slider" className="field-label" style={{ margin: 0 }}>ST Depression (Oldpeak)</label>
            <span className="field-value-badge">{formData.oldpeak.toFixed(1)} mm</span>
          </div>
          <input id="oldpeak-slider" type="range" className="editorial-slider" min="0" max="5" step="0.1"
            value={formData.oldpeak} onChange={e => set('oldpeak', parseFloat(e.target.value))} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.67rem', color: 'var(--ink-faint)', marginTop: '0.2rem', fontFamily: 'var(--font-sans)' }}>
            <span>0.0 mm (Baseline)</span>
            <span>Normal &lt; 1.0 mm</span>
            <span>≥ 1.5 mm (Ischemia)</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="intake-actions">
        <button type="button" id="form-reset-btn" className="btn-secondary" onClick={onReset}>
          <RotateCcw size={13} /> Reset
        </button>
        <button
          type="submit"
          id="submit-prediction-btn"
          className="btn-primary"
          disabled={loading || backendOnline === false}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {loading ? (
            <><span className="loading-ring" /> Evaluating…</>
          ) : backendOnline === false ? (
            <><AlertTriangle size={14} /> ⊘ Backend Offline — Service Required</>
          ) : (
            <><Activity size={14} /> Run Risk Assessment →</>
          )}
        </button>
      </div>
      {backendOnline === false && (
        <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--risk-high)', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
          Spring Boot backend on port 8080 must be active to run risk assessment.
        </div>
      )}
    </form>
  );
}
