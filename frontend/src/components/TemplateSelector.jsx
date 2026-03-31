import { useState, useEffect } from 'react';
import '../styles/TemplateSelector.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * TemplateSelector Modal - Choose pre-built dashboard templates
 * Appears during file upload to help users customize their dashboard
 */
export default function TemplateSelector({ isOpen, templates = [], onSelect, onSkip, loading = false }) {
  const [selected, setSelected] = useState(null);

  const templateIcons = {
    'chart-bar': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="7" height="18" /><rect x="17" y="8" width="7" height="13" />
        <rect x="10" y="5" width="7" height="16" />
      </svg>
    ),
    'trending-up': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 17" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    'dollar-sign': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    users: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    activity: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  };

  if (!isOpen) return null;

  const handleSelect = () => {
    if (selected && onSelect) {
      onSelect(selected);
    }
  };

  return (
    <div className="ts-overlay" role="presentation" aria-hidden={!isOpen}>
      <div className="ts-modal" role="dialog" aria-modal="true" aria-labelledby="ts-title">
        <div className="ts-header">
          <h2 id="ts-title" className="ts-title">Choose a Dashboard Template</h2>
          <p className="ts-subtitle">Select a template to auto-generate relevant charts and metrics</p>
        </div>

        <div className="ts-grid">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`ts-template-card ${selected === template.id ? 'selected' : ''}`}
              onClick={() => setSelected(template.id)}
              aria-pressed={selected === template.id}
              role="radio"
              aria-checked={selected === template.id}
            >
              <div className="ts-icon">
                {templateIcons[template.icon] || (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                )}
              </div>
              <h3 className="ts-name">{template.name}</h3>
              <p className="ts-desc">{template.description}</p>
              <div className="ts-checkmark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <div className="ts-footer">
          <button
            className="ts-skip-btn"
            onClick={onSkip}
            disabled={loading}
            aria-label="Skip template selection"
          >
            Skip
          </button>
          <button
            className="ts-apply-btn"
            onClick={handleSelect}
            disabled={!selected || loading}
            aria-label="Apply selected template"
          >
            {loading ? 'Applying...' : 'Apply Template'}
          </button>
        </div>
      </div>
    </div>
  );
}
