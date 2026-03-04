export function SectionCard({ title, children }) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
      <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/60">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {title}
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
