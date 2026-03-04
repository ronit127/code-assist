import { ThemeProvider } from '../../context/ThemeContext.jsx';

export function Layout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
        {children}
      </div>
    </ThemeProvider>
  );
}
