'use client'

import React, { ReactNode, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type NestedTab = {
  label: string;
  content: ReactNode;
};

type NestedTabsProps = {
  tabs: NestedTab[];
  initialTabIndex?: number;
  tabClassName?: string;
  tabActiveClassName?: string;
  tabPanelClassName?: string;
  tabParam?: string;
};

const idFromLabel = (label: string) =>
  label.toLowerCase().replace(/\s+/g, '-');

const NestedTabs: React.FC<NestedTabsProps> = ({
  tabs,
  initialTabIndex = 0,
  tabClassName = "",
  tabActiveClassName = "",
  tabPanelClassName = "",
  tabParam = "tab",
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tabIds = useMemo(() => tabs.map(tab => idFromLabel(tab.label)), [tabs]);
  const selectedTabIdFromUrl = searchParams?.get(tabParam);

  let activeTabIdx = initialTabIndex;
  if (selectedTabIdFromUrl) {
    const idx = tabIds.indexOf(selectedTabIdFromUrl);
    if (idx !== -1) activeTabIdx = idx;
  }

  useEffect(() => {
    if (!searchParams || !tabs[initialTabIndex]) return;
    const found = searchParams.get(tabParam);
    if (!found) {
      const params = new URLSearchParams(searchParams.toString());
      params.set(tabParam, tabIds[initialTabIndex]);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line
  }, [initialTabIndex, pathname, router, searchParams, tabIds, tabs, tabParam]);

  return (
    <div>
      <div className={`d-flex gap-4 ${tabClassName}`} role="tablist" aria-label="Nested Tabs">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeTabIdx;
          const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
          params.set(tabParam, tabIds[idx]);
          const href = `${pathname}?${params.toString()}`;

          return (
            <Link
              href={href}
              key={tab.label}
              scroll={false}
              aria-current={isActive ? "page" : undefined}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`letter-spacing fs-13 fw-medium bg-transparent border-0 p-0 cursor-pointer ${isActive ? tabActiveClassName : ""}`}
              style={{
                padding: "5px 0",
                borderBottom: isActive ? "1px solid #222" : "none",
                color: isActive ? "#000" : "#8c8c8c",
                cursor: isActive ? "default" : "pointer",
                transition: "color 0.2s, border-bottom 0.2s",
                outline: "none",
                background: "none",
                pointerEvents: isActive ? "none" : undefined,
                textDecoration: "none"
              }}
              data-testid={`nestedtab-${idFromLabel(tab.label)}`}
              passHref
              prefetch={false}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      <div
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
