import { useState } from 'react';
import { SectionCard } from '../ui/SectionCard.jsx';

export function LineByLineSection({ lines }) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!lines || lines.length === 0) return null;

  return (
    <SectionCard title="Line by line">
      <button
        onClick={() => setIsExpanded(p => !p)}
        className="w-full flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors py-0.5"
      >
        <span>{isExpanded ? 'Collapse' : 'Show breakdown (' + lines.length + ' lines)'}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={'transition-transform duration-200 ' + (isExpanded ? 'rotate-90' : '')}>
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2.5 space-y-2.5 animate-fade-in">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="flex-shrink-0 w-5 text-right font-mono text-gray-300 dark:text-gray-600 pt-0.5 select-none">
                {line.lineNumber}
              </span>
              <div className="flex-1 min-w-0">
                <code className="block font-mono text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded px-1.5 py-0.5 truncate mb-0.5">
                  {line.code}
                </code>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{line.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
