import { FC, useState } from "react";
import { JSONTabProps, Tab } from "@/types";

const JSONTab: FC<JSONTabProps> = ({ Tabs }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tabs[0]);

  const TabHeader = Tabs.map((tab) => tab.name);
  const TabContent = Tabs.find((tab) => tab.name === activeTab.name)?.content;

  return (
    <>
      <div className="border-b border-gray-600 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <nav className="flex min-w-max">
          {TabHeader.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(Tabs.find((t) => t.name === tab)!)}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm whitespace-nowrap transition-colors ${
                activeTab.name.toLowerCase() === tab.toLowerCase()
                  ? "border-b-2 border-violet-500 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        {TabContent && (
          <pre className="bg-gray-800 p-2 sm:p-4 rounded-lg text-white font-mono text-xs sm:text-sm overflow-x-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {TabContent}
          </pre>
        )}
      </div>
    </>
  );
};

export default JSONTab;
