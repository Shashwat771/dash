# 🚀 Quick Reference Guide

## Files You Need to Know About

```
PROJECT ROOT/
├── 📄 README_AI_FEATURES.md ................. START HERE! Complete guide
├── 📄 AI_FEATURES_INTEGRATION.md ........... How to integrate each feature
├── 📄 INTEGRATION_EXAMPLE.jsx .............. Copy this code into your Dashboard
├── 📄 AI_FEATURES_SUMMARY.md ............... What was built & stats
├── 📄 RESPONSIVE_DESIGN.md ................. Mobile optimization details
├── 📄 QUICK_REFERENCE.md ................... This file!
│
├── frontend/src/
│   ├── components/
│   │   ├── AIInsightsPanel.jsx ............ 🤖 AI Insights (213 lines)
│   │   ├── NLQueryBox.jsx ................. 🔍 Natural Language Query (272 lines)
│   │   └── ChartExporter.jsx .............. 📥 Export Charts (200 lines)
│   │
│   ├── utils/
│   │   └── chartExport.js ................. Export utilities (271 lines)
│   │
│   └── styles/
│       └── AIFeatures.css ................. Complete styling (1,194 lines)
│
├── backend/src/
│   ├── services/
│   │   └── aiQuery.js ..................... AI service (357 lines) ⚡
│   │
│   ├── controllers/
│   │   └── dashboard.controller.js ........ Updated with AI handlers
│   │
│   └── routes/
│       └── dashboard.route.js ............. Updated with 3 new routes
│
└── frontend/
    └── package.json ....................... Updated with 2 new deps
```

---

## 3-Step Integration

### Step 1: Copy-Paste into Dashboard.jsx
```jsx
import AIInsightsPanel from './components/AIInsightsPanel';
import NLQueryBox from './components/NLQueryBox';
import ChartExporter from './components/ChartExporter';
import '../styles/AIFeatures.css';
```

### Step 2: Add to JSX
```jsx
{/* AI Insights Button in Header */}
<button onClick={() => setShowInsights(!showInsights)}>
  🤖 AI Insights
</button>

{/* Natural Language Query */}
<NLQueryBox
  charts={charts}
  columns={columns}
  data={data}
  onQueryResult={handleQuery}
  onGenerateChart={handleNewChart}
/>

{/* Charts with Export */}
<ChartExporter chartElement={ref} chartTitle="Chart" />

{/* Insights Panel (Overlay) */}
{showInsights && (
  <AIInsightsPanel
    data={data}
    columns={columns}
    analysis={analysis}
    charts={charts}
    onClose={() => setShowInsights(false)}
  />
)}
```

### Step 3: Add Event Handlers
```jsx
const [showInsights, setShowInsights] = useState(false);

const handleQuery = (result) => {
  console.log('Query result:', result);
  // Highlight matching charts
};

const handleNewChart = (config) => {
  setCharts([...charts, config]);
};
```

---

## Features at a Glance

### 🤖 AI Insights
| What | Details |
|------|---------|
| **How to trigger** | Click "AI Insights" button |
| **What it does** | Analyzes data, generates insights |
| **Output** | Trends, Predictions, Summary |
| **API** | POST /api/dashboard/insights |
| **Component** | `<AIInsightsPanel />` |
| **Time** | 2-5 seconds (API dependent) |

### 🔍 Natural Language Query
| What | Details |
|------|---------|
| **How to trigger** | Type in query box |
| **Example** | "Show sales in 2023" |
| **What it does** | Finds matching charts |
| **Output** | Matching charts + suggested chart |
| **API** | POST /api/dashboard/nl-query |
| **Component** | `<NLQueryBox />` |
| **Time** | 1-3 seconds |

### 📥 Chart Export
| What | Details |
|------|---------|
| **How to trigger** | Click "Export" on chart |
| **Formats** | PNG, PDF, Batch PDF |
| **Resolution** | 2x scale for quality |
| **Filename** | Auto-generated with timestamp |
| **API** | None (local operation) |
| **Component** | `<ChartExporter />` |
| **Time** | <1 second |

---

## API Endpoints

### 1. Generate Insights
```
POST /api/dashboard/insights

✅ Required:
  - data: array of objects
  - columns: array of strings
  - analysis: object

📤 Returns:
  - trends: array with confidence scores
  - predictions: array with risk levels
  - summary: string
  - recommendations: array
  - keyMetrics: object
```

### 2. Process Query
```
POST /api/dashboard/nl-query

✅ Required:
  - query: user's question string

📤 Returns:
  - interpretation: what user asked
  - matchingCharts: existing matches
  - suggestedChart: new chart config
  - filters: recommended filters
  - followUpQuestion: clarification
```

### 3. Generate Chart
```
POST /api/dashboard/chart-from-query

✅ Required:
  - query: user's question
  - columns: available columns
  - data: raw data

📤 Returns:
  - title: chart title
  - type: bar|line|pie|scatter|table
  - xAxis: column name
  - yAxis: column name(s)
  - description: why this chart
```

---

## Component Props Reference

### `<AIInsightsPanel />`
```jsx
<AIInsightsPanel
  data={[]}                    // ✅ Required
  columns={[]}                 // ✅ Required
  analysis={{}}                // ✅ Required
  charts={[]}                  // ⭕ Optional
  onClose={() => {}}           // ✅ Required
/>
```

### `<NLQueryBox />`
```jsx
<NLQueryBox
  charts={[]}                  // ⭕ Optional
  columns={[]}                 // ⭕ Optional
  data={[]}                    // ⭕ Optional
  onQueryResult={(r) => {}}    // ⭕ Optional
  onGenerateChart={(c) => {}}  // ⭕ Optional
/>
```

### `<ChartExporter />`
```jsx
<ChartExporter
  chartElement={ref}           // ✅ Required (DOM element)
  chartTitle="Title"           // ⭕ Optional
/>
```

### `<BatchExporter />`
```jsx
import { BatchExporter } from './components/ChartExporter';

<BatchExporter
  charts={[                    // ✅ Required
    { element: ref, title: "Chart 1" }
  ]}
  reportTitle="Report"         // ⭕ Optional
/>
```

---

## Export Utilities

### Use These Functions
```jsx
import {
  exportChartAsPNG,
  exportChartAsPDF,
  exportChartsAsPDFReport,
  getTimestampFileName
} from '../utils/chartExport';

// Single PNG
await exportChartAsPNG(element, 'my-chart.png');

// Single PDF
await exportChartAsPDF(element, {
  fileName: 'report.pdf',
  title: 'My Chart',
  subtitle: 'Generated on ...'
});

// Multiple charts as PDF report
await exportChartsAsPDFReport(
  [
    { element: ref1, title: 'Chart 1' },
    { element: ref2, title: 'Chart 2' }
  ],
  {
    reportTitle: 'Monthly Report',
    fileName: 'report.pdf'
  }
);

// Get filename with timestamp
const name = getTimestampFileName('my-chart'); 
// Result: my-chart-2026-03-30-143052
```

---

## CSS Customization

### Change Colors
Edit `/frontend/src/styles/AIFeatures.css`:
```css
:root {
  --ai-primary: #6366f1;      /* Change primary color */
  --ai-secondary: #8b5cf6;    /* Change secondary */
  --ai-success: #10b981;      /* Change success color */
  /* ... other colors ... */
}
```

### Responsive Breakpoints
```css
@media (max-width: 320px) { }  /* Ultra small phones */
@media (max-width: 480px) { }  /* Small phones */
@media (max-width: 768px) { }  /* Tablets */
@media (max-width: 1024px) { } /* Large tablets */
@media (min-width: 2560px) { } /* Ultra-wide screens */
```

---

## Common Tasks

### Add AI Button to Header
```jsx
<button 
  className="ai-insights-btn"
  onClick={() => setShowInsights(true)}
>
  🤖 AI Insights
</button>
```

### Handle New Chart from Query
```jsx
<NLQueryBox
  onGenerateChart={(config) => {
    // Add to dashboard
    setCharts([...charts, config]);
    // Or do something else with config
  }}
/>
```

### Highlight Matching Charts
```jsx
const handleQueryResult = (result) => {
  result.matchingCharts.forEach(match => {
    // Find element and highlight
    const el = document.getElementById(match.chartId);
    el?.classList.add('highlighted');
  });
};
```

### Export with Custom Filename
```jsx
import { getTimestampFileName } from '../utils/chartExport';

const fileName = getTimestampFileName('sales-report');
// Use in export: fileName = "sales-report-2026-03-30-143052"
```

---

## Troubleshooting Quick Answers

| Problem | Solution |
|---------|----------|
| "Module not found" | Verify file paths are correct |
| "API fails" | Check GEMINI_API_KEY is set |
| "Export not working" | Verify chartElement ref is connected |
| "Mobile layout broken" | Check AIFeatures.css is imported |
| "No insights generated" | Check data format is correct |
| "Query finds nothing" | Verify column names match data |
| "Slow performance" | Clear cache: right-click → Clear Site Data |

---

## Performance Tips

✅ **Good practices:**
- Cache insights for same data
- Use lazy loading for components
- Clear cache when data updates
- Test on real mobile devices
- Monitor API usage

⚠️ **Avoid:**
- Regenerating insights constantly
- Exporting very large charts repeatedly
- Loading all components at once
- Missing error handlers
- Not testing mobile responsiveness

---

## Mobile Optimization Checklist

- [ ] Components work on 320px screen
- [ ] Buttons are 44px+ height
- [ ] Touch targets have 8px spacing
- [ ] No horizontal overflow
- [ ] Modals fit on screen
- [ ] Forms are usable on mobile
- [ ] Images scale properly
- [ ] Animations are smooth

---

## Testing Checklist

- [ ] AI Insights generates correctly
- [ ] Query finds relevant charts
- [ ] New charts are created from queries
- [ ] PNG export downloads
- [ ] PDF export is readable
- [ ] Mobile layouts are responsive
- [ ] Touch interactions work
- [ ] No console errors
- [ ] Caching prevents duplicate calls
- [ ] Error messages are helpful

---

## File Summary

| File | Size | Purpose |
|------|------|---------|
| AIInsightsPanel.jsx | 213 lines | Insights UI |
| NLQueryBox.jsx | 272 lines | Query input |
| ChartExporter.jsx | 200 lines | Export menu |
| chartExport.js | 271 lines | Export functions |
| AIFeatures.css | 1,194 lines | Styling |
| aiQuery.js | 357 lines | AI service |
| dashboard.controller.js | +68 lines | API handlers |
| dashboard.route.js | +3 routes | API endpoints |

**Total: 2,550+ lines of code + 1,818+ lines of documentation**

---

## Quick Integration Template

```jsx
import React, { useState, useRef } from 'react';
import AIInsightsPanel from './components/AIInsightsPanel';
import NLQueryBox from './components/NLQueryBox';
import ChartExporter from './components/ChartExporter';
import '../styles/AIFeatures.css';

export default function Dashboard({ data, columns, analysis, charts, setCharts }) {
  const [showInsights, setShowInsights] = useState(false);
  const [chartRefs, setChartRefs] = useState({});

  return (
    <div>
      {/* Header with AI button */}
      <header>
        <button onClick={() => setShowInsights(!showInsights)}>
          🤖 AI Insights
        </button>
      </header>

      {/* Query box */}
      <NLQueryBox
        data={data}
        columns={columns}
        charts={charts}
        onGenerateChart={(c) => setCharts([...charts, c])}
      />

      {/* Charts with export */}
      {charts.map((chart) => (
        <div key={chart.id} ref={(el) => setChartRefs(p => ({...p, [chart.id]: el}))}>
          <ChartExporter 
            chartElement={chartRefs[chart.id]}
            chartTitle={chart.title}
          />
          {/* Your chart JSX here */}
        </div>
      ))}

      {/* Insights panel */}
      {showInsights && (
        <AIInsightsPanel
          data={data}
          columns={columns}
          analysis={analysis}
          charts={charts}
          onClose={() => setShowInsights(false)}
        />
      )}
    </div>
  );
}
```

---

## Need More Help?

1. **README_AI_FEATURES.md** - Complete overview
2. **INTEGRATION_EXAMPLE.jsx** - Full working example
3. **AI_FEATURES_INTEGRATION.md** - Detailed guide
4. **Browser console** - Check for error messages

---

**You're all set! 🚀 Start integrating!**
