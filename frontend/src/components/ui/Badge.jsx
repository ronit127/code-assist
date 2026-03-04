const variants = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  blue: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
  red: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300'
};

export function Badge({ children, variant = 'default' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono ${variants[variant]}`}>
      {children}
    </span>
  );
}
