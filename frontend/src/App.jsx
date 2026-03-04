import { useState } from 'react';
import { Layout } from './components/layout/Layout.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { Header } from './components/layout/Header.jsx';
import { CodeEditor } from './components/editor/CodeEditor.jsx';
import { EditorToolbar } from './components/editor/EditorToolbar.jsx';
import { AIPanel } from './components/ai-panel/AIPanel.jsx';
import { useEditorSelection } from './hooks/useEditorSelection.js';
import { useAnalysis } from './hooks/useAnalysis.js';

export default function App() {
  const [language, setLanguage] = useState('javascript');
  const { handleEditorMount, getSelectedCode, getFullCode, getLanguage } = useEditorSelection();
  const { analysisResult, isLoading, error, isPanelOpen, triggerAnalysis, closePanel } = useAnalysis();

  const handleAskAI = () => {
    const selectedCode = getSelectedCode();
    const fullCode = getFullCode();
    const lang = getLanguage();
    // Send selected code for analysis, full code as context
    triggerAnalysis(selectedCode, lang, fullCode, null);
  };

  return (
    <Layout>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Header />
        <EditorToolbar
          language={language}
          onLanguageChange={setLanguage}
          onAskAI={handleAskAI}
          isLoading={isLoading}
        />
        <div className="flex flex-1 overflow-hidden">
          <CodeEditor onMount={handleEditorMount} language={language} />
          <AIPanel
            isOpen={isPanelOpen}
            analysisResult={analysisResult}
            isLoading={isLoading}
            error={error}
            onClose={closePanel}
          />
        </div>
      </div>
    </Layout>
  );
}
