import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";
import TestResults from "./TestResults";
import SubmissionResult from "./SubmissionResult";

function RightPanel({
  activeTab,
  onTabChange,
  selectedLanguage,
  onLanguageChange,
  code,
  onCodeChange,
  onRun,
  onSubmit,
  loading,
  runResult,
  submitResult,
  problem,
}) {
  const [isMobile, setIsMobile] = useState(false);

  const tabs = [
    { id: "code", label: "Code" },
    // { id: "testcase", label: "Test Cases" },
    { id: "result", label: "Result" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="w-full lg:w-1/2 h-full flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-gray-200">

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        {isMobile ? (
          <div className="p-3">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="w-full rounded-lg border-gray-300 text-sm px-3 py-2"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex gap-1 px-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-50 min-h-0">
        <div className="h-full overflow-y-auto p-4 sm:p-5 md:p-6">

          {activeTab === "code" && (
            <CodeEditor
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              code={code}
              onCodeChange={onCodeChange}
              onRun={onRun}
              onSubmit={onSubmit}
              loading={loading}
              myProblem={problem}
              onConsoleClick={() => onTabChange("testcase")}
            />
          )}

          {activeTab === "testcase" && (
            <TestResults runResult={runResult} />
          )}

          {activeTab === "result" && (
            <SubmissionResult submitResult={submitResult} />
          )}

        </div>
      </div>
    </aside>
  );
}

export default RightPanel;
