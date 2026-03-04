export function LoadingState() {
  return (
    <div className="space-y-2.5">
      {[80, 60, 90].map((width, i) => (
        <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="h-8 bg-gray-50 dark:bg-gray-800/60 animate-pulse border-b border-gray-100 dark:border-gray-800" />
          <div className="p-3 space-y-2">
            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" style={{ width: width + '%' }} />
            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" style={{ width: (width - 20) + '%' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
