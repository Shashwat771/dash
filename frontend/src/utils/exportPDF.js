import html2pdf from 'html2pdf.js';

/**
 * Export dashboard to PDF
 * Captures current dashboard view and generates a downloadable PDF
 */
export const exportDashboardToPDF = async (dashboardTitle, dashboardElement, fileName) => {
  try {
    if (!dashboardElement) {
      console.error('Dashboard element not found');
      return;
    }

    const pdf = new html2pdf.HTML2PDF({
      margin: 10,
      filename: fileName || `${dashboardTitle}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    });

    // Add title page
    const titleElement = document.createElement('div');
    titleElement.style.cssText = `
      padding: 40px;
      text-align: center;
      page-break-after: always;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    titleElement.innerHTML = `
      <h1 style="font-size: 32px; margin: 20px 0; color: #0f0f23;">
        ${dashboardTitle || 'Dashboard Report'}
      </h1>
      <p style="font-size: 16px; color: #8b95a5; margin: 10px 0;">
        Generated on ${new Date().toLocaleString()}
      </p>
      <hr style="border: none; border-top: 2px solid #6366f1; margin: 30px 0;">
    `;

    pdf.from(titleElement).toPage();

    // Add dashboard content
    pdf.from(dashboardElement).save();
  } catch (error) {
    console.error('Failed to export PDF:', error);
    throw error;
  }
};

/**
 * Prepare dashboard for PDF export by creating a print-friendly version
 */
export const prepareDashboardForPDF = (dashboardElement) => {
  const clone = dashboardElement.cloneNode(true);

  // Hide elements that shouldn't be in PDF
  const hiddenSelectors = ['.icon-action-btn', '.back-btn', '.search-box', '.filter-chips-bar'];
  hiddenSelectors.forEach((selector) => {
    clone.querySelectorAll(selector).forEach((el) => {
      el.style.display = 'none';
    });
  });

  // Adjust chart heights for PDF
  clone.querySelectorAll('.chart-card').forEach((card) => {
    card.style.pageBreakInside = 'avoid';
    card.style.marginBottom = '20px';
  });

  return clone;
};
