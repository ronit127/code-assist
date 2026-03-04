const variants = {
  primary: 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 border-transparent',
  secondary: 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700',
  ghost: 'bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent'
};

export function Button({ children, variant = 'primary', disabled = false, onClick, className = '', title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
                  border transition-colors duration-150
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${variants[variant]}
                  ${className}`}
    >
      {children}
    </button>
  );
}
