import { useState, useEffect } from "react";
import ProblemDescription from "./ProblemDescription";
import Editorial from "./Editorial";
import Solutions from "./Solutions";
import Submissions from "./Submissions";
import ChatAi from "../Ai/ChatAi";

function LeftPanel({ activeTab, onTabChange, problem }) {
  const [isMobile, setIsMobile] = useState(false);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "editorial", label: "Editorial" },
    // { id: "solutions", label: "Solutions" },
    { id: "submissions", label: "Submissions" },
    { id: "chatAi", label: "AI Assistant" },
  ];

  // Detect mobile only (tablet stays desktop-tabs)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="w-full lg:w-1/2 flex flex-col bg-white border-r border-gray-200">

      {/* ===== Tabs Header ===== */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        {isMobile ? (
          /* Mobile: Dropdown */
          <div className="p-3">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="w-full rounded-lg border-gray-300 text-sm px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          /* Tablet + Desktop: Horizontal Tabs */
          <div className="flex gap-2 px-4 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== Content Area ===== */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-4 sm:p-5 md:p-6 max-w-3xl mx-auto lg:max-w-none">

          {activeTab === "description" && <ProblemDescription problem={problem} />}
          {activeTab === "editorial" && <Editorial problem={problem} />}
          {activeTab === "solutions" && <Solutions problem={problem} />}
          {activeTab === "submissions" && <Submissions problem={problem} />}
          {activeTab === "chatAi" && <ChatAi problem={problem} />}

        </div>
      </div>
    </aside>
  );
}

export default LeftPanel;
