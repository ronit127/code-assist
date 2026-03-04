import { SUPPORTED_LANGUAGES } from '../../utils/detectLanguage.js';

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3z"/>
    </svg>
  );
}

export function EditorToolbar({ language, onLanguageChange, onAskAI, isLoading }) {
  return (
    <div className="h-9 flex-shrink-0 flex items-center gap-2 px-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="h-6 px-2 rounded text-xs font-mono
                   bg-gray-100 dark:bg-gray-800
                   text-gray-600 dark:text-gray-400
                   border-0 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600
                   cursor-pointer"
      >
        {SUPPORTED_LANGUAGES.map(lang => (
          <option key={lang.value} value={lang.value}>{lang.label}</option>
        ))}
      </select>

      <div className="flex-1" />

      <span className="text-xs text-gray-400 dark:text-gray-600 hidden sm:block">
        Highlight code, then click Ask AI
      </span>

      <button
        onClick={onAskAI}
        disabled={isLoading}
        className="h-6 inline-flex items-center gap-1.5 px-2.5 rounded text-xs font-medium
                   bg-gray-900 dark:bg-gray-100
                   text-white dark:text-gray-900
                   hover:bg-gray-700 dark:hover:bg-gray-300
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors duration-150"
      >
        {isLoading ? <SpinnerIcon /> : <SparkleIcon />}
        {isLoading ? 'Analyzing' : 'Ask AI'}
      </button>
    </div>
  );
}
