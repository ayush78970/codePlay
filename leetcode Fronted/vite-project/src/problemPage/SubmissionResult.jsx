const SubmissionResult = ({ submitResult }) => {
  if (!submitResult) {
    return (
      <div className="flex-1 p-4 overflow-y-auto">
        <h3 className="font-semibold mb-4">Submission Result</h3>
        <div className="text-gray-500">
          Click "Submit" to submit your solution for evaluation.
        </div>
      </div>
    );
  }

  const isAccepted = submitResult.status === "accepted"; // ✅ Cleaner condition

  console.log(submitResult);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <h3 className="font-semibold mb-4">Submission Result</h3>

      {isAccepted ? (
        // ✅ Accepted State
        <div className="alert alert-success mb-4">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-xl">🎉 Accepted!</h4>
              <p className="text-sm mt-1">Your solution passed all test cases.</p>
            </div>
          </div>

          <div className="mt-4 space-y-3 bg-green-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Test Cases Passed:</strong>
                <div className="text-lg font-bold text-green-700">
                  {submitResult.passedTestCases}/{submitResult.totalTestCases}
                </div>
              </div>

              {submitResult.runtime && (
                <div>
                  <strong>Runtime:</strong>
                  <div className="text-lg font-bold text-green-700">{submitResult.runtime} sec</div>
                </div>
              )}

              {submitResult.memory && (
                <div>
                  <strong>Memory:</strong>
                  <div className="text-lg font-bold text-green-700">{submitResult.memory} KB</div>
                </div>
              )}

              <div>
                <strong>Status:</strong>
                <div className="text-lg font-bold text-green-700">Accepted</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Test Cases Progress</span>
                <span>{submitResult.passedTestCases}/{submitResult.totalTestCases}</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-green-600"
                  style={{
                    width: `${(submitResult.passedTestCases / submitResult.totalTestCases) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* ✅ Show Warning/Error even if accepted */}
          {submitResult.error && (
            <div className="mt-3 p-3 bg-yellow-100 rounded-lg border border-yellow-300">
              <h5 className="font-semibold mb-2">⚠ Note:</h5>
              <p className="text-yellow-800 font-mono text-sm">{submitResult.error}</p>
            </div>
          )}
        </div>
      ) : (
        // ❌ Rejected State
        <div className="alert alert-error mb-4">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-bold text-xl">❌ Submission Failed</h4>
              <p className="text-sm mt-1">{submitResult.error || 'Some test cases failed.'}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3 bg-red-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Test Cases Passed:</strong>
                <div className="text-lg font-bold text-red-700">
                  {submitResult.passedTestCases}/{submitResult.totalTestCases}
                </div>
              </div>

              {submitResult.runtime && (
                <div>
                  <strong>Runtime:</strong>
                  <div className="text-lg font-bold text-red-700">{submitResult.runtime} sec</div>
                </div>
              )}

              {submitResult.memory && (
                <div>
                  <strong>Memory:</strong>
                  <div className="text-lg font-bold text-red-700">{submitResult.memory} KB</div>
                </div>
              )}

              <div>
                <strong>Status:</strong>
                <div className="text-lg font-bold text-red-700">Rejected</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Test Cases Progress</span>
                <span>{submitResult.passedTestCases}/{submitResult.totalTestCases}</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 bg-red-600"
                  style={{
                    width: `${(submitResult.passedTestCases / submitResult.totalTestCases) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Error Details */}
            {submitResult.error && (
              <div className="mt-3 p-3 bg-red-100 rounded-lg">
                <h5 className="font-semibold mb-2">Error Details:</h5>
                <p className="text-red-800 font-mono text-sm">{submitResult.error}</p>
              </div>
            )}

            {/* Tips */}
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-semibold mb-2">💡 Tips:</h5>
              <ul className="text-sm space-y-1">
                <li>• Check for edge cases</li>
                <li>• Verify your logic handles all constraints</li>
                <li>• Test with custom inputs</li>
                <li>• Review time and space complexity</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionResult;
