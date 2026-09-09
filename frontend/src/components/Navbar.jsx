import React, { useState, useEffect } from 'react';

const TICKER_TEXT = [
  'CARDIAC RISK ASSESSMENT', '·', 'KNN INFERENCE ENGINE', '·',
  '734 TRAINING VECTORS', '·', 'EVIDENCE-BASED MEDICINE', '·',
  'OPEN CLINICAL DATA', '·', '15 BIOMARKERS', '·',
  'BATCH SCREENING', '·', 'SCIKIT-LEARN PARITY', '·',
  'SPRING BOOT v3', '·', 'REAL-TIME INFERENCE', '·',
].join(' ');

export default function Navbar({ activeTab, setActiveTab, backendOnline }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  const dateStr = now.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).toUpperCase();

  const navItems = [
    { id: 'single', label: 'Assessment' },
    { id: 'batch',  label: 'Cohort Screen' },
    { id: 'specs',  label: 'Model Registry' },
  ];

  return (
    <nav className="editorial-nav" role="navigation" aria-label="Main navigation">
      <div className="ticker-bar" aria-hidden="true">
        <span className="ticker-label">LIVE</span>
        <div className="ticker-track">
          <span className="ticker-content">{TICKER_TEXT} {TICKER_TEXT}</span>
        </div>
      </div>
      <div className="nav-masthead">
        <div className="nav-brand">
          <span className="nav-brand-name">Cardio<span>Guard</span></span>
          <span className="nav-brand-edition">CDS · v1.0</span>
        </div>
        <div className="nav-links" role="tablist">
          {navItems.map(item => (
            <button
              key={item.id}
              id={`nav-tab-${item.id}`}
              role="tab"
              aria-selected={activeTab === item.id}
              className={`nav-link-btn${activeTab === item.id ? ' active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => setActiveTab('single')} id="nav-cta-btn">
          Evaluate Risk →
        </button>
      </div>
      <div className="nav-subbar">
        <div className="nav-subbar-inner">
          <span>{dateStr}</span>
          <span style={{ color: '#C8C2B2' }}>·</span>
          <span>CLINICAL DECISION SUPPORT</span>
          <span style={{ color: '#C8C2B2' }}>·</span>
          <span>KNN · k=5 · EUCLIDEAN</span>
          <div className="nav-subbar-status">
            <span className={`status-dot${backendOnline === false ? ' offline' : ''}`} />
            <span>
              {backendOnline === null ? 'Connecting to backend…' : backendOnline ? 'Inference Engine: Online (Port 8080)' : 'Inference Engine: Offline (Port 8080)'}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
