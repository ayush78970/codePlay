const TestResults = ({ runResult }) => {

  // Show message if runResult is an empty array
  if (Array.isArray(runResult) && runResult.length === 0) {
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4">Test Results</h3>
        <div className="text-gray-500">
          Click "Run" to test your code with the example test cases.
        </div>
      </div>
    );
  }

  // Transform raw array into expected format
  const transformedResult = {
    success: runResult.every((t) => t.status && t.status.id === 3),
    testCases: runResult.map((t) => ({
      stdin: t.stdin || '',
      expected_output: t.expected_output || '',
      stdout: t.stdout || '',
      status_id: t.status?.id || 0,
      status_description: t.status?.description || '',
      time: t.time,
      memory: t.memory,
    })),
  };

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">Test Results</h3>
      
      {transformedResult.success ? (
        <div className="alert alert-success mb-4">
          <div className="flex items-center">
            <h4 className="font-bold text-lg">All Test Cases Passed!</h4>
          </div>
          {transformedResult.testCases.map((testCase, idx) => (
            <div key={idx} className="bg-green-50 border border-green-200 p-3 rounded-lg my-2">
              <div><strong>Input:</strong> {testCase.stdin}</div>
              <div><strong>Expected:</strong> {testCase.expected_output}</div>
              <div><strong>Output:</strong> {testCase.stdout}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-error mb-4">
          <div className="flex items-center">
            <h4 className="font-bold text-lg">Some Test Cases Failed</h4>
          </div>
          {transformedResult.testCases.map((testCase, idx) => (
            <div key={idx} className={`border p-3 rounded-lg my-2 ${testCase.status_id === 3 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div><strong>Input:</strong> {testCase.stdin}</div>
              <div><strong>Expected:</strong> {testCase.expected_output}</div>
              <div><strong>Output:</strong> {testCase.stdout || 'No output'}</div>
              <div className={testCase.status_id === 3 ? 'text-green-600' : 'text-red-600'}>
                {testCase.status_description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResults;
