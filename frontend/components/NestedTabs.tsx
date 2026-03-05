'use client';

import React, { ReactNode, useMemo } from 'react';

type NestedTab = {
  label: string;
  content: ReactNode;
};

type NestedTabsProps = {
  tabs: NestedTab[];
  activeTabIdx: number;
  onTabChange?: (idx: number) => void;
  tabClassName?: string;
  tabActiveClassName?: string;
  tabPanelClassName?: string;
};

const idFromLabel = (label: string) => label.toLowerCase().replace(/\s+/g, '-');

const NestedTabs: React.FC<NestedTabsProps> = ({
  tabs,
  activeTabIdx,
  onTabChange,
  tabClassName = '',
  tabActiveClassName = '',
  tabPanelClassName = '',
}) => {
  const tabIds = useMemo(() => tabs.map((tab) => idFromLabel(tab.label)), [tabs]);

  return (
    <div>
      <div className={`d-flex gap-4 ${tabClassName}`} role="tablist" aria-label="Nested Tabs">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeTabIdx;
          const tabId = `nestedtab-${tabIds[idx]}`;
          return (
            <button
              key={tab.label}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tabIds[idx]}`}
              tabIndex={isActive ? 0 : -1}
              className={`letter-spacing fs-13 fw-medium bg-transparent border-0 p-0 cursor-pointer ${
                isActive ? `${tabActiveClassName}` : ''
              }`}
              style={{
                padding: '5px 0',
                borderBottom: isActive ? '2px solid #222' : 'none',
                color: isActive ? '#222' : '#8c8c8c',
                cursor: isActive ? 'default' : 'pointer',
                transition: 'color 0.18s, border-bottom 0.18s',
                outline: 'none',
                background: 'none',
                pointerEvents: isActive ? 'none' : undefined,
                textDecoration: 'none',
              }}
              data-testid={tabId}
              onClick={() => {
                if (!isActive && onTabChange) onTabChange(idx);
              }}
              type="button"
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        id={`tabpanel-${tabIds[activeTabIdx]}`}
        className={`mt-3 ${tabPanelClassName}`}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`nestedtab-${tabIds[activeTabIdx]}`}
      >
        {tabs[activeTabIdx]?.content}
      </div>
    </div>
  );
};

export default NestedTabs;
