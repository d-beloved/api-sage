import { JSONTabProps, Tab } from "@/types";
import { useState } from "react";

const JSONTab: React.FC<JSONTabProps> = ({ Tabs }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tabs[0]);

  const TabHeader = Tabs.map((tab) => tab.name);
  const TabContent = Tabs.find((tab) => tab.name === activeTab.name)?.content;

  return (
    <>
      <div className="border-b border-gray-600">
        <nav className="flex">
          {TabHeader.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(Tabs.find((t) => t.name === tab)!)}
              className={`px-6 py-3 ${
                activeTab.name.toLowerCase() === tab.toLowerCase()
                  ? "border-b-2 border-blue-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {TabContent && (
          <pre className="bg-gray-800 p-4 rounded-lg text-white font-mono text-sm overflow-auto">
            {TabContent}
          </pre>
        )}
      </div>
    </>
  );
};

export default JSONTab;
