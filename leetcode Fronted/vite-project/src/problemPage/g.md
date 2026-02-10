import { useState, useEffect } from "react";
import ProblemDescription from "./ProblemDescription";
import Editorial from "./Editorial";
import Solutions from "./Solutions";
import Submissions from "./Submissions";
import ChatAi from "../components/ChatAi";

function LeftPanel({ activeTab, onTabChange, problem }) {
  const [isMobile, setIsMobile] = useState(false);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "editorial", label: "Editorial" },
    { id: "solutions", label: "Solutions" },
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
    { id: "testcase", label: "Test Cases" },
    { id: "result", label: "Result" },
  ];

  // Responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="w-full lg:w-1/2 h-full flex flex-col bg-white border-t lg:border-t-0 lg:border-l border-gray-200">

      {/* ================= Tabs Header ================= */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        {isMobile ? (
          /* Mobile Dropdown */
          <div className="p-3">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          /* Desktop Tabs */
          <div className="flex gap-1 px-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
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

      {/* ================= Content Area ================= */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="h-full p-4 sm:p-5 md:p-6">

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
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Test Results
              </h3>

              {runResult ? (
                <TestResults runResult={runResult} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
                  <p className="text-sm">Running test cases...</p>
                </div>
              )}
            </>
          )}

          {activeTab === "result" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Submission Result
              </h3>

              {submitResult ? (
                <SubmissionResult submitResult={submitResult} />
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <span className="text-4xl mb-3">📝</span>
                  <p className="text-sm">No submission yet</p>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </aside>
  );
}

export default RightPanel;






















import { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel';
import { useProblem } from './useProblem';
import { useSubmission } from './useSubmission';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};


const ProblemPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  
  const { problem, loading: problemLoading } = useProblem();
  const { loading, runResult, submitResult, handleRun, handleSubmit } = useSubmission(problem?._id);

  // console.log("The problem is",problem);
// console.log("the pr",useProblem);
  // Update code when language changes or problem loads
  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleCodeChange = (value) => {
    setCode(value || '');
  };

  const handleRunCode = () => {
    handleRun(code, selectedLanguage);
    setActiveRightTab('testcase');
  };

  const handleSubmitCode = () => {
    handleSubmit(code, selectedLanguage);
    setActiveRightTab('result');
  };

  if (problemLoading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-base-100">

      <LeftPanel
        activeTab={activeLeftTab}
        onTabChange={setActiveLeftTab}
        problem={problem}
      />

      <RightPanel
        activeTab={activeRightTab}
        onTabChange={setActiveRightTab}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        code={code}
        onCodeChange={handleCodeChange}
        onRun={handleRunCode}
        onSubmit={handleSubmitCode}
        loading={loading}
        runResult={runResult}
        submitResult={submitResult}
        problem={problem}
      />

    </div>
   
  );
};

export default ProblemPage;

















import { useState, useEffect } from "react";
import ProblemDescription from "./ProblemDescription";
import Editorial from "./Editorial";
import Solutions from "./Solutions";
import Submissions from "./Submissions";
import ChatAi from "../components/ChatAi";

function LeftPanel({ activeTab, onTabChange, problem }) {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: "description", label: "Description" },
    { id: "editorial", label: "Editorial" },
    { id: "solutions", label: "Solutions" },
    { id: "submissions", label: "Submissions" },
    { id: "chatAi", label: "AI Assistant" },
  ];

  // Detect mobile only
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className="w-full lg:w-1/2 flex flex-col bg-white border-r border-gray-200">

      {/* ===== Header / Tabs ===== */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">

        {isMobile ? (
          /* ===== Mobile Hamburger ===== */
          <div className="relative p-3 flex items-center justify-between">
            <span className="text-sm font-medium">
              {tabs.find(t => t.id === activeTab)?.label}
            </span>

            {/* Hamburger Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col justify-between w-6 h-4"
            >
              <span className="h-[2px] w-full bg-gray-800 rounded"></span>
              <span className="h-[2px] w-full bg-gray-800 rounded"></span>
              <span className="h-[2px] w-full bg-gray-800 rounded"></span>
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-3 top-12 w-52 bg-white border rounded-lg shadow-lg z-50">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      onTabChange(tab.id);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm transition ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* ===== Desktop / Tablet Tabs (UNCHANGED) ===== */
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
