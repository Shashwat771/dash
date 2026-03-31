import { useState, useRef } from 'react';
import { exportDashboardToPDF, prepareDashboardForPDF } from '../utils/exportPDF';
import '../styles/ExportButton.css';

/**
 * ExportButton - Download dashboard as PDF
 * Provides visual feedback and handles the export process
 */
export default function ExportButton({ dashboardTitle, disabled = false }) {
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const contentRef = useRef(null);

  const handleExport = async () => {
    if (exporting || disabled) return;

    setExporting(true);
    setError('');

    try {
      // Get the dashboard content container
      const dashboardContent = document.querySelector('.db-content');
      if (!dashboardContent) {
        throw new Error('Dashboard content not found');
      }

      // Prepare the content for PDF
      const printContent = prepareDashboardForPDF(dashboardContent);

      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-10000px';
      tempContainer.appendChild(printContent);
      document.body.appendChild(tempContainer);

      // Export to PDF
      const fileName = `${dashboardTitle || 'Dashboard'}_${new Date().toISOString().split('T')[0]}`;
      await exportDashboardToPDF(dashboardTitle, printContent, fileName);

      // Cleanup
      document.body.removeChild(tempContainer);
    } catch (err) {
      console.error('Export failed:', err);
      setError(err.message || 'Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="export-button-wrapper">
      <button
        className={`icon-action-btn export-btn ${exporting ? 'exporting' : ''}`}
        onClick={handleExport}
        disabled={disabled || exporting}
        title={exporting ? 'Exporting...' : 'Export dashboard as PDF'}
        aria-label={exporting ? 'Exporting dashboard' : 'Export dashboard as PDF'}
        aria-busy={exporting}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span className="hide-xs">{exporting ? 'Exporting...' : 'Export PDF'}</span>
        {exporting && (
          <span className="export-spinner" aria-hidden="true">
            <span className="spinner-dot"></span>
          </span>
        )}
      </button>
      {error && (
        <div className="export-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
