import { useState } from "react";

const Editorial = ({ problem }) => {
  const referenceSolution = problem?.referenceSolution || []; // ✅ Extract from problem safely
  const [activeTab, setActiveTab] = useState(0);

  if (referenceSolution.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No reference solutions available.
      </div>
    );
  }

  return (
    <div className="mt-6 border rounded-lg shadow-sm bg-white">
      <div className="p-3 border-b font-semibold text-lg">🎯 Reference Solutions</div>

      {/* Tabs */}
      <div className="flex border-b">
        {referenceSolution.map((sol, index) => (
          <button
            key={sol._id}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {sol.language}
          </button>
        ))}
      </div>

      {/* Code Display */}
      <div className="p-4 bg-gray-50 font-mono text-sm relative">
        {/* Copy Button */}
        <button
          onClick={() =>
            navigator.clipboard.writeText(referenceSolution[activeTab].completeCode)
          }
          className="absolute right-4 top-4 bg-gray-200 px-2 py-1 text-xs rounded hover:bg-gray-300"
        >
          Copy
        </button>

        <pre className="whitespace-pre-wrap">
          <code>{referenceSolution[activeTab].completeCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default Editorial;
