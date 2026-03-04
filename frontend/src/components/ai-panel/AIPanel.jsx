import { LoadingState } from '../ui/LoadingState.jsx';
import { ExplanationSection } from './ExplanationSection.jsx';
import { LineByLineSection } from './LineByLineSection.jsx';
import { ComplexitySection } from './ComplexitySection.jsx';
import { PatternsSection } from './PatternsSection.jsx';
import { ErrorsSection } from './ErrorsSection.jsx';
import { LinksSection } from './LinksSection.jsx';

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
          <path d="M12 3L9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3z"/>
        </svg>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">No analysis yet</p>
      <p className="text-xs text-gray-400 dark:text-gray-600 max-w-44 leading-relaxed">
        Highlight code in the editor and click Ask AI
      </p>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="m-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 p-3">
      <p className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">Error</p>
      <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">{error}</p>
    </div>
  );
}

export function AIPanel({ isOpen, analysisResult, isLoading, error, onClose }) {
  if (!isOpen) return null;

  return (
    <aside className="w-[380px] h-full flex-shrink-0 flex flex-col border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Analysis</span>
          {isLoading && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="w-1 h-1 rounded-full bg-gray-400 animate-pulse" />
              thinking
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading && <div className="p-3"><LoadingState /></div>}
        {!isLoading && error && <ErrorState error={error} />}
        {!isLoading && !error && !analysisResult && <EmptyState />}
        {!isLoading && !error && analysisResult && (
          <div className="p-3 space-y-2">
            <ExplanationSection explanation={analysisResult.explanation} />
            <LineByLineSection lines={analysisResult.lineByLine} />
            <ComplexitySection complexity={analysisResult.complexity} />
            <PatternsSection patterns={analysisResult.detectedPatterns} />
            <ErrorsSection errors={analysisResult.errors} />
            <LinksSection links={analysisResult.relatedLinks} />
          </div>
        )}
      </div>
    </aside>
  );
}
