import { useState, useCallback } from 'react';
import GridLayout from 'react-grid-layout';
import '../styles/GridDashboard.css';

/**
 * GridDashboard - Wraps charts in a draggable, resizable grid layout
 * Allows users to customize dashboard widget positions and sizes
 */
export default function GridDashboard({
  charts,
  filteredData,
  columns,
  renderChartCard,
  onFullscreen,
  editMode = false,
  onEditModeChange,
  layout = [],
  onLayoutChange,
}) {
  const [tempEditMode, setTempEditMode] = useState(editMode);

  // Toggle between edit and view mode
  const handleToggleEditMode = useCallback(() => {
    const newMode = !tempEditMode;
    setTempEditMode(newMode);
    if (onEditModeChange) onEditModeChange(newMode);
  }, [tempEditMode, onEditModeChange]);

  // Reset to default layout
  const handleResetLayout = useCallback(() => {
    const defaultLayout = (charts || []).map((chart, i) => {
      const col = (i % 2) * 6;
      const row = Math.floor(i / 2) * 6;
      return {
        i: chart.id,
        x: col,
        y: row,
        w: 6,
        h: 6,
        static: false,
      };
    });
    if (onLayoutChange) onLayoutChange(defaultLayout);
  }, [charts, onLayoutChange]);

  const nonTableCharts = (charts || []).filter((c) => c.type !== 'table');

  if (!nonTableCharts || nonTableCharts.length === 0) {
    return (
      <div className="grid-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" aria-hidden="true">
          <path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
        <p>No charts to display</p>
      </div>
    );
  }

  return (
    <div className={`grid-dashboard-wrapper ${tempEditMode ? 'edit-mode' : 'view-mode'}`}>
      {/* Edit mode toolbar */}
      <div className="grid-toolbar">
        <button
          className={`grid-edit-btn ${tempEditMode ? 'active' : ''}`}
          onClick={handleToggleEditMode}
          title={tempEditMode ? 'Done editing' : 'Edit layout'}
          aria-pressed={tempEditMode}
          aria-label={tempEditMode ? 'Exit edit mode' : 'Enter edit mode'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
          <span>{tempEditMode ? 'Done' : 'Edit Layout'}</span>
        </button>

        {tempEditMode && (
          <button
            className="grid-reset-btn"
            onClick={handleResetLayout}
            title="Reset to default layout"
            aria-label="Reset layout"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2-8.83" />
            </svg>
            <span>Reset</span>
          </button>
        )}

        {tempEditMode && (
          <p className="grid-help-text">Drag widgets to reorder, resize with the corner handle</p>
        )}
      </div>

      {/* Grid layout */}
      <GridLayout
        className="grid-layout-container"
        layout={layout && layout.length > 0 ? layout : undefined}
        onLayoutChange={(newLayout) => onLayoutChange && onLayoutChange(newLayout)}
        cols={12}
        rowHeight={60}
        width={1200}
        isDraggable={tempEditMode}
        isResizable={tempEditMode}
        compactType="vertical"
        preventCollision={false}
        useCSSTransforms={true}
        containerPadding={[0, 0]}
        margin={[16, 16]}
        draggableHandle=".chart-card"
      >
        {nonTableCharts.map((chart) => (
          <div key={chart.id} className="grid-item-wrapper">
            {renderChartCard({
              chart,
              rows: filteredData,
              columns,
              onFullscreen,
              loading: false,
            })}
          </div>
        ))}
      </GridLayout>
    </div>
  );
}
