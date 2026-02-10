import { useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({
  selectedLanguage,
  onLanguageChange,
  code,
  onCodeChange,
  onRun,
  onSubmit,
  loading,
  onConsoleClick,
  myProblem
}) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const getLanguageForMonaco = (lang) => {  
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">

      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b bg-white">
        <select
          value={selectedLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="text-sm border rounded px-3 py-1.5"
        >
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        
        <button 
          className="sm:hidden"
          onClick={onConsoleClick}
        >
          📋
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0 rounded-xl overflow-hidden">
        <Editor
          height="100%"
          language={getLanguageForMonaco(selectedLanguage)}
          value={code}
          onChange={onCodeChange}
          onMount={handleEditorDidMount}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <button
            onClick={onRun}
            disabled={loading}
            className="flex-1 border rounded px-3 py-2"
          >
            {loading ? '...' : 'Run'}
          </button>
          
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white rounded px-3 py-2"
          >
            {loading ? '...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
