import React, { useCallback, useMemo } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, tabIndex, setTab }) {
  const currentTab = useMemo(() => tabs[tabIndex], [tabs, tabIndex]);

  const isCurrent = useCallback(
    (tabItem) => currentTab === tabItem,
    [currentTab]
  );

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          defaultValue={currentTab}
        >
          {tabs.map((tab) => (
            <option key={tab}>{tab}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => (
              <span
                key={tab}
                onClick={() => setTab(index)}
                className={classNames(
                  isCurrent(tab)
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap cursor-pointer py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={isCurrent(tab) ? "page" : undefined}
              >
                {tab}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
