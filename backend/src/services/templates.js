/**
 * Dashboard Templates - Pre-defined configurations for different domains
 * Each template specifies which columns to use for charts and metrics
 */

const TEMPLATES = {
  sales: {
    id: 'sales',
    name: 'Sales Dashboard',
    icon: 'chart-bar',
    description: 'Track revenue, growth, products, and customer metrics',
    requiredColumns: ['revenue', 'date', 'product'],
    suggestions: {
      metrics: [
        { label: 'Total Revenue', aggregation: 'sum', columnPattern: /revenue|sales|amount/i },
        { label: 'Avg Order Value', aggregation: 'avg', columnPattern: /revenue|sales|amount|value/i },
        { label: 'Total Orders', aggregation: 'count', columnPattern: /order|transaction/i },
        { label: 'Growth Rate', aggregation: 'avg', columnPattern: /growth|percent|rate/i },
      ],
      charts: [
        { type: 'line', xPattern: /date|month|quarter|year/i, yPattern: /revenue|sales|amount/i, title: 'Revenue Trend' },
        { type: 'bar', xPattern: /product|category|region/i, yPattern: /revenue|sales|amount/i, title: 'Sales by Product' },
        { type: 'pie', xPattern: /product|category|region/i, yPattern: /revenue|sales|amount/i, title: 'Revenue Distribution' },
        { type: 'bar', xPattern: /date|month/i, yPattern: /orders|transactions|count/i, title: 'Order Volume' },
      ],
    },
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing Dashboard',
    icon: 'trending-up',
    description: 'Campaign performance, conversion rates, and engagement metrics',
    requiredColumns: ['date', 'campaign'],
    suggestions: {
      metrics: [
        { label: 'Total Impressions', aggregation: 'sum', columnPattern: /impression|views|reach/i },
        { label: 'Conversion Rate', aggregation: 'avg', columnPattern: /conversion|rate|percent/i },
        { label: 'Click-Through Rate', aggregation: 'avg', columnPattern: /ctr|click|rate/i },
        { label: 'Cost per Acquisition', aggregation: 'avg', columnPattern: /cpa|cost|cac/i },
      ],
      charts: [
        { type: 'line', xPattern: /date|month|week/i, yPattern: /impression|reach|clicks/i, title: 'Campaign Performance' },
        { type: 'bar', xPattern: /campaign|channel|source/i, yPattern: /conversion|click|impression/i, title: 'Performance by Campaign' },
        { type: 'doughnut', xPattern: /channel|source|campaign/i, yPattern: /impression|click|engagement/i, title: 'Traffic Source' },
        { type: 'scatter', xPattern: /spend|budget|investment/i, yPattern: /revenue|conversion|return/i, title: 'ROI Analysis' },
      ],
    },
  },
  finance: {
    id: 'finance',
    name: 'Finance Dashboard',
    icon: 'dollar-sign',
    description: 'Revenue trends, expenses, profit margins, and cash flow',
    requiredColumns: ['date', 'amount'],
    suggestions: {
      metrics: [
        { label: 'Total Revenue', aggregation: 'sum', columnPattern: /revenue|income|sales/i },
        { label: 'Total Expenses', aggregation: 'sum', columnPattern: /expense|cost|spending/i },
        { label: 'Net Profit', aggregation: 'sum', columnPattern: /profit|net/i },
        { label: 'Profit Margin', aggregation: 'avg', columnPattern: /margin|percentage|percent/i },
      ],
      charts: [
        { type: 'line', xPattern: /date|month|quarter|year/i, yPattern: /revenue|income/i, title: 'Revenue Trend' },
        { type: 'line', xPattern: /date|month|quarter/i, yPattern: /expense|cost/i, title: 'Expense Tracking' },
        { type: 'bar', xPattern: /category|department|type/i, yPattern: /expense|cost|amount/i, title: 'Expense Breakdown' },
        { type: 'doughnut', xPattern: /category|department|type/i, yPattern: /expense|cost/i, title: 'Cost Distribution' },
      ],
    },
  },
  hr: {
    id: 'hr',
    name: 'HR Dashboard',
    icon: 'users',
    description: 'Headcount, turnover, compensation, and performance metrics',
    requiredColumns: ['employee', 'department'],
    suggestions: {
      metrics: [
        { label: 'Total Headcount', aggregation: 'count', columnPattern: /employee|staff|person/i },
        { label: 'Avg Salary', aggregation: 'avg', columnPattern: /salary|compensation|pay/i },
        { label: 'Turnover Rate', aggregation: 'avg', columnPattern: /turnover|attrition|rate/i },
        { label: 'Avg Performance', aggregation: 'avg', columnPattern: /performance|rating|score/i },
      ],
      charts: [
        { type: 'bar', xPattern: /department|team|location/i, yPattern: /count|headcount|number/i, title: 'Headcount by Department' },
        { type: 'doughnut', xPattern: /department|location|role/i, yPattern: /count|number/i, title: 'Employee Distribution' },
        { type: 'scatter', xPattern: /salary|compensation/i, yPattern: /performance|rating|experience/i, title: 'Salary vs Performance' },
        { type: 'bar', xPattern: /department|team/i, yPattern: /turnover|attrition/i, title: 'Turnover by Department' },
      ],
    },
  },
  operations: {
    id: 'operations',
    name: 'Operations Dashboard',
    icon: 'activity',
    description: 'Process efficiency, cost metrics, and resource utilization',
    requiredColumns: ['date', 'metric'],
    suggestions: {
      metrics: [
        { label: 'Process Efficiency', aggregation: 'avg', columnPattern: /efficiency|percent|rate|utilization/i },
        { label: 'Cost per Unit', aggregation: 'avg', columnPattern: /cost|expense|price/i },
        { label: 'Resource Utilization', aggregation: 'avg', columnPattern: /utilization|usage|percent/i },
        { label: 'Downtime', aggregation: 'sum', columnPattern: /downtime|outage|stop/i },
      ],
      charts: [
        { type: 'line', xPattern: /date|time|month/i, yPattern: /efficiency|utilization|percent/i, title: 'Efficiency Trend' },
        { type: 'bar', xPattern: /process|department|location/i, yPattern: /efficiency|cost|utilization/i, title: 'Process Metrics' },
        { type: 'line', xPattern: /date|month/i, yPattern: /cost|expense/i, title: 'Cost Tracking' },
        { type: 'bar', xPattern: /resource|machine|equipment/i, yPattern: /utilization|usage|time/i, title: 'Resource Utilization' },
      ],
    },
  },
};

/**
 * Find best template match based on column names
 */
const suggestTemplate = (columns = []) => {
  if (!columns || columns.length === 0) return null;

  const colsLower = columns.map((c) => c.toLowerCase());

  // Score each template based on matching columns
  const scores = Object.entries(TEMPLATES).map(([id, template]) => {
    const matching = template.requiredColumns.filter((req) =>
      colsLower.some((col) => col.includes(req.toLowerCase()))
    );
    return { id, template, score: matching.length };
  });

  // Return template with highest score if score > 0
  const best = scores.sort((a, b) => b.score - a.score)[0];
  return best.score > 0 ? best.template : null;
};

/**
 * Get all available templates
 */
const getAvailableTemplates = () => {
  return Object.values(TEMPLATES).map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    description: t.description,
  }));
};

/**
 * Apply template to columns and suggest metrics/charts
 */
const applyTemplate = (templateId, columns = []) => {
  const template = TEMPLATES[templateId];
  if (!template) return null;

  const colsLower = columns.map((c) => c.toLowerCase());
  const colsOriginal = columns; // Keep original casing

  // Suggest metrics
  const suggestedMetrics = template.suggestions.metrics
    .map((metricTemplate) => {
      const matchCol = colsOriginal.find((col) =>
        metricTemplate.columnPattern.test(col)
      );
      if (matchCol) {
        return {
          id: `metric_${Math.random().toString(36).slice(2, 9)}`,
          label: metricTemplate.label,
          aggregation: metricTemplate.aggregation,
          column: matchCol,
          description: `${metricTemplate.aggregation} of ${matchCol}`,
        };
      }
      return null;
    })
    .filter(Boolean);

  // Suggest charts
  const suggestedCharts = template.suggestions.charts
    .map((chartTemplate) => {
      const xCol = colsOriginal.find((col) => chartTemplate.xPattern.test(col));
      const yCol = colsOriginal.find((col) => chartTemplate.yPattern.test(col));

      if (xCol && yCol) {
        return {
          id: `chart_${Math.random().toString(36).slice(2, 9)}`,
          title: chartTemplate.title,
          type: chartTemplate.type,
          xAxis: xCol,
          yAxis: yCol,
          description: `${chartTemplate.type} chart`,
        };
      }
      return null;
    })
    .filter(Boolean);

  return {
    templateId,
    templateName: template.name,
    metrics: suggestedMetrics,
    charts: suggestedCharts,
  };
};

module.exports = {
  TEMPLATES,
  suggestTemplate,
  getAvailableTemplates,
  applyTemplate,
};
