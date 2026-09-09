import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PresetBar from './components/PresetBar';
import AssessmentForm from './components/AssessmentForm';
import ResultDashboard from './components/ResultDashboard';
import BatchScreening from './components/BatchScreening';
import ModelInspector from './components/ModelInspector';

const initialFormData = {
  patientId: 'PT-' + Math.floor(1000 + Math.random() * 9000),
  patientName: 'Ravi Sharma',
  age: 52,
  sex: 'M',
  chestPainType: 'ASY',
  restingBP: 135,
  cholesterol: 230,
  fastingBS: 0,
  restingECG: 'Normal',
  maxHR: 142,
  exerciseAngina: 'N',
  oldpeak: 1.2,
  stSlope: 'Flat',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('single');
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [backendOnline, setBackendOnline] = useState(null);

  // Poll backend health every 3 seconds
  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        const r = await fetch('/api/model/info');
        if (isMounted) {
          if (r.ok) {
            setBackendOnline(true);
          } else {
            setBackendOnline(false);
            setResult(null); // Never display results if backend is offline
          }
        }
      } catch {
        if (isMounted) {
          setBackendOnline(false);
          setResult(null); // Never display results if backend is offline
        }
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch or re-fetch presets whenever backend is verified online
  useEffect(() => {
    if (backendOnline) {
      fetch('/api/presets')
        .then(r => { if (!r.ok) throw new Error(); return r.json(); })
        .then(d => setPresets(d))
        .catch(() => {});
    } else {
      setPresets([]);
    }
  }, [backendOnline]);

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    const updated = { ...preset.data, patientName: preset.data.patientName || preset.title };
    setFormData(updated);
    setResult(null);
    predictWithData(updated);
  };

  const handleReset = () => {
    setSelectedPresetId(null);
    setFormData({ ...initialFormData, patientId: 'PT-' + Math.floor(1000 + Math.random() * 9000) });
    setResult(null);
    setErrorMsg(null);
  };

  const predictWithData = async (data) => {
    if (backendOnline === false) {
      setResult(null);
      setErrorMsg('Inference service is offline. Start the Spring Boot backend on port 8080 to evaluate results.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Inference service unavailable (HTTP ${res.status}). Ensure the Spring Boot backend is running on port 8080.`);
      }
      const json = await res.json();
      setResult(json);
      setErrorMsg(null);
    } catch (err) {
      setResult(null);
      setErrorMsg(err.message || 'Inference engine unavailable. Ensure the Spring Boot service is running on port 8080.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="app-shell">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} backendOnline={backendOnline} />

      <main>
        {/* === HERO — only on single assessment tab === */}
        {activeTab === 'single' && (
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--side-pad)' }}>
            <section className="hero-section">
              <div className="hero-inner">
                {/* Left: editorial headline */}
                <div className="hero-text">
                  <div>
                    <div className="hero-overline">Cardio<span style={{ color: 'var(--ink)' }}>Guard</span> · Clinical Decision Support</div>
                    <h1 className="hero-headline">
                      Know Your<br />
                      Heart's <em>Truth.</em>
                    </h1>
                    <p className="hero-deck">
                      Evidence-based cardiac risk assessment powered by a K-Nearest Neighbors inference engine
                      trained on a 734-patient clinical cohort. Not guesswork — mathematics.
                    </p>
                  </div>
                  <div className="hero-actions">
                    <button className="btn-primary" onClick={() => document.getElementById('patient-assessment-form')?.scrollIntoView({ behavior: 'smooth' })}>
                      Begin Assessment →
                    </button>
                    <button className="btn-secondary" onClick={() => setActiveTab('specs')}>
                      Model Registry
                    </button>
                  </div>
                </div>

                {/* Right: key statistics */}
                <div className="hero-meta-block">
                  <div className="hero-stat">
                    <div className="hero-stat-num">734<span>+</span></div>
                    <div className="hero-stat-label">Training Patients</div>
                    <div className="hero-stat-note">UCI Heart Disease Dataset · Standardized cohort</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-num">91<span>%</span></div>
                    <div className="hero-stat-label">Model Accuracy</div>
                    <div className="hero-stat-note">KNN k=5 · Euclidean distance metric</div>
                  </div>
                  <div className="hero-stat">
                    <div className="hero-stat-num">15</div>
                    <div className="hero-stat-label">Clinical Biomarkers</div>
                    <div className="hero-stat-note">Encoded feature vector · Z-score normalized</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* === ASSESSMENT SECTION === */}
        {activeTab === 'single' && (
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--side-pad)' }}>
            {/* Section header */}
            <div className="section-header">
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <span className="section-number">§ 01</span>
                <h2 className="section-label">Patient Assessment</h2>
              </div>
              <span className="section-meta">Filed {today}</span>
            </div>

            {/* Preset profiles bar */}
            {presets.length > 0 && (
              <PresetBar
                presets={presets}
                onSelectPreset={handleSelectPreset}
                selectedPresetId={selectedPresetId}
              />
            )}

            {/* Offline Engine banner */}
            {backendOnline === false && (
              <div className="error-banner" style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontWeight: 700 }}>⚠</span>
                <div>
                  <strong>Inference Engine Offline:</strong> Spring Boot backend on port 8080 is disconnected.
                  Live cardiac evaluations are disabled until the service connects.
                </div>
              </div>
            )}

            {/* Error banner */}
            {errorMsg && backendOnline !== false && (
              <div className="error-banner">
                <span style={{ fontWeight: 700 }}>⚠</span> {errorMsg}
              </div>
            )}

            {/* 2-col editorial grid */}
            <div className="assessment-editorial-grid">
              <AssessmentForm
                formData={formData}
                setFormData={(val) => { setSelectedPresetId(null); setFormData(val); }}
                onSubmit={() => predictWithData(formData)}
                loading={loading}
                onReset={handleReset}
                backendOnline={backendOnline}
              />
              <ResultDashboard
                result={result}
                loading={loading}
                errorMsg={errorMsg}
                backendOnline={backendOnline}
                onRetry={() => predictWithData(formData)}
              />
            </div>
          </div>
        )}

        {/* === BATCH SCREENING === */}
        {activeTab === 'batch' && (
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--side-pad)' }}>
            <BatchScreening backendOnline={backendOnline} />
          </div>
        )}

        {/* === MODEL REGISTRY === */}
        {activeTab === 'specs' && (
          <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--side-pad)' }}>
            <ModelInspector />
          </div>
        )}
      </main>

      <footer className="editorial-footer">
        <div className="editorial-footer-inner">
          <div>
            <div className="footer-brand">Cardio<span>Guard</span></div>
            <p className="footer-tagline">
              An open clinical decision support system for cardiac risk stratification.
              Powered by a K-Nearest Neighbors model trained on the UCI Heart Disease Dataset,
              served via a Spring Boot 3 high-speed Java inference engine.
            </p>
          </div>
          <div className="footer-disclaimer">
            For clinical evaluation and research purposes only. Not a substitute for professional medical diagnosis.
          </div>
        </div>
      </footer>
    </div>
  );
}
