import React from 'react';

export default function PresetBar({ presets, onSelectPreset, selectedPresetId }) {
  if (!presets || presets.length === 0) return null;
  return (
    <div className="preset-editorial-bar">
      <div className="preset-editorial-bar-inner">
        <span className="preset-bar-label">Clinical Profiles</span>
        {presets.map(preset => (
          <button
            key={preset.id}
            id={`preset-btn-${preset.id}`}
            className={`preset-pill${selectedPresetId === preset.id ? ' active' : ''}`}
            onClick={() => onSelectPreset(preset)}
            title={preset.description || preset.title}
          >
            {preset.title}
          </button>
        ))}
      </div>
    </div>
  );
}
