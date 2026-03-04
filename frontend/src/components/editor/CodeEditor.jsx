import Editor from '@monaco-editor/react';
import { useTheme } from '../../hooks/useTheme.js';

const DEFAULT_CODE = `// Paste your code here or start typing...
// Highlight any code, then click "Ask AI" to analyze it.

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const result = binarySearch(sortedArray, 7);
console.log(\`Found at index: \${result}\`);
`;

export function CodeEditor({ onMount, language }) {
  const { theme } = useTheme();
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme={monacoTheme}
        onMount={onMount}
        defaultValue={DEFAULT_CODE}
        options={{
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: 'on',
          formatOnPaste: true,
          automaticLayout: true,
          tabSize: 2,
          renderWhitespace: 'none',
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            vertical: 'auto',
            horizontal: 'auto',
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6
          }
        }}
      />
    </div>
  );
}
