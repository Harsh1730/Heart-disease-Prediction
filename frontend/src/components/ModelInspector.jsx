import React, { useEffect, useState } from 'react';
import { getModelInfo } from '../services/api';

export default function ModelInspector() {
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getModelInfo()
      .then(data => { setModelInfo(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '3rem 0', textAlign: 'center', fontFamily: 'var(--font-sans)', color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
        Querying model registry metadata…
      </div>
    );
  }

  if (!modelInfo) {
    return (
      <div style={{ background: 'var(--risk-high-bg)', border: 'var(--border)', borderLeft: '4px solid var(--risk-high)', padding: '1.25rem 1.75rem', fontFamily: 'var(--font-ui)', fontSize: '0.85rem', color: 'var(--risk-high)' }}>
        Unable to connect to inference service. Ensure the Spring Boot backend is running on port 8080.
      </div>
    );
  }

  return (
    <div>
      {/* Dark editorial header */}
      <div className="batch-header-bar">
        <div className="batch-header-overline">§ 03 — Model Registry</div>
        <div className="batch-header-title">Algorithm Architecture &amp; Training Cohort</div>
        <p className="batch-header-sub">
          Technical specification of the KNN inference engine deployed via Spring Boot 3 with scikit-learn mathematical parity.
        </p>
      </div>

      <div className="specs-editorial-grid">
        {/* Panel 1: Hyperparameters */}
        <div className="specs-panel">
          <div className="specs-panel-title">Model Architecture &amp; Hyperparameters</div>
          <div className="specs-row">
            <span className="specs-row-label">Classification Algorithm</span>
            <span className="specs-row-value">{modelInfo.algorithm}</span>
          </div>
          <div className="specs-row">
            <span className="specs-row-label">Neighbors (k)</span>
            <span className="specs-row-value accent">{modelInfo.nNeighbors} Nearest Neighbors</span>
          </div>
          <div className="specs-row">
            <span className="specs-row-label">Distance Metric</span>
            <span className="specs-row-value">{modelInfo.metric} (p = {modelInfo.p}, Euclidean)</span>
          </div>
          <div className="specs-row">
            <span className="specs-row-label">Preprocessing</span>
            <span className="specs-row-value">StandardScaler (Z-Score)</span>
          </div>
          <div className="specs-row">
            <span className="specs-row-label">Production Runtime</span>
            <span className="specs-row-value">Spring Boot 3 · Java 17</span>
          </div>
          <div className="specs-row">
            <span className="specs-row-label">Inference Mode</span>
            <span className="specs-row-value">Real-time + Batch</span>
          </div>

          <div className="parity-block">
            <div className="parity-block-title">Deterministic Mathematical Parity</div>
            The Java engine replicates the exact Minkowski–Euclidean distance calculation across all {modelInfo.totalTrainingSamples || 734} training vectors in-memory, guaranteeing 100% prediction agreement with scikit-learn — without external process overhead.
          </div>
        </div>

        {/* Panel 2: Training Cohort */}
        <div className="specs-panel">
          <div className="specs-panel-title">Training Cohort &amp; Feature Space</div>

          <div className="cohort-mini-grid">
            <div className="cohort-mini-cell">
              <div className="cohort-mini-label">Total Cohort</div>
              <div className="cohort-mini-value">{modelInfo.totalTrainingSamples}</div>
            </div>
            <div className="cohort-mini-cell">
              <div className="cohort-mini-label" style={{ color: 'var(--risk-high)' }}>Disease (+)</div>
              <div className="cohort-mini-value" style={{ color: 'var(--risk-high)' }}>
                {modelInfo.classDistribution ? modelInfo.classDistribution['1'] : 401}
              </div>
            </div>
            <div className="cohort-mini-cell">
              <div className="cohort-mini-label" style={{ color: 'var(--risk-low)' }}>Normal (−)</div>
              <div className="cohort-mini-value" style={{ color: 'var(--risk-low)' }}>
                {modelInfo.classDistribution ? modelInfo.classDistribution['0'] : 333}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: '0.5rem' }}>
              Encoded Feature Vector — {modelInfo.encodedColumns ? modelInfo.encodedColumns.length : 15} inputs
            </div>
            <div className="feature-badge-grid">
              {modelInfo.encodedColumns && modelInfo.encodedColumns.map((col, i) => (
                <div key={i} className="feature-badge">
                  <strong>#{i + 1}</strong>{col}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
