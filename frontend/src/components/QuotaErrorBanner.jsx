import { useEffect, useState } from 'react';
import '../styles/QuotaErrorBanner.css';

export default function QuotaErrorBanner() {
  const [isVisible, setIsVisible] = useState(false);

  // Check if quota error occurred (you can check localStorage or app state)
  useEffect(() => {
    const checkQuotaError = () => {
      const hasQuotaError = sessionStorage.getItem('gemini_quota_error');
      setIsVisible(!!hasQuotaError);
    };

    checkQuotaError();
    // Re-check every 30 seconds
    const interval = setInterval(checkQuotaError, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="quota-error-banner">
      <div className="quota-error-content">
        <div className="quota-error-icon">⚠️</div>
        <div className="quota-error-text">
          <h3>Gemini API Quota Exceeded</h3>
          <p>Your free tier quota has been reached. The dashboard is now using fallback features.</p>
        </div>
        <div className="quota-error-actions">
          <a 
            href="https://ai.google.dev/pricing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="quota-btn quota-btn-primary"
          >
            Upgrade Plan
          </a>
          <button 
            className="quota-btn quota-btn-secondary"
            onClick={() => {
              sessionStorage.removeItem('gemini_quota_error');
              setIsVisible(false);
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
