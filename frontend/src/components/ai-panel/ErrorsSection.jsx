import { SectionCard } from '../ui/SectionCard.jsx';

export function ErrorsSection({ errors }) {
  if (!errors || errors.length === 0) return null;
  return (
    <SectionCard title="Issues">
      <div className="space-y-2">
        {errors.map((error, i) => (
          <div key={i} className="rounded-md border border-red-100 dark:border-red-900/40 bg-red-50 dark:bg-red-950/20 p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs font-mono text-red-500 dark:text-red-400">line {error.lineNumber}</span>
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-1">{error.description}</p>
            {error.suggestion && (
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                <span className="font-medium">Fix:</span> {error.suggestion}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
