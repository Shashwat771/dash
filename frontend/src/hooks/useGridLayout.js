import { useState, useEffect } from 'react';

const STORAGE_KEY = 'dataviz_grid_layout';

export const useGridLayout = (charts) => {
  const [layout, setLayout] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Initialize layout from charts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLayout(JSON.parse(saved));
      } catch {
        initializeLayout(charts);
      }
    } else {
      initializeLayout(charts);
    }
  }, []);

  const initializeLayout = (chartsToLayout) => {
    if (!chartsToLayout || chartsToLayout.length === 0) {
      setLayout([]);
      return;
    }

    const newLayout = chartsToLayout.map((chart, i) => {
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

    setLayout(newLayout);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
  };

  const updateLayout = (newLayout) => {
    setLayout(newLayout);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
  };

  const resetLayout = () => {
    initializeLayout(charts);
  };

  return {
    layout,
    setLayout: updateLayout,
    editMode,
    setEditMode,
    resetLayout,
  };
};
