import { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel';
import { useProblem } from './useProblem';
import { useSubmission } from './useSubmission';
import Footer from '../footerr/footer';

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
    <div className=' h-screen flex flex-col'>
    {/* <div className="h-screen flex flex-col lg:flex-row bg-base-100"> */}
    <div className=" flex flex-col lg:flex-row bg-base-100">

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
        onRun={handleSubmitCode}         // handleRunCode
        onSubmit={handleSubmitCode}
        loading={loading}
        runResult={runResult}
        submitResult={submitResult}
        problem={problem}
      />

    </div>
  <Footer></Footer>
    </div>
   
  );
};

export default ProblemPage;