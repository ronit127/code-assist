import { useRef, useCallback } from 'react';

export function useEditorSelection() {
  const editorRef = useRef(null);

  const handleEditorMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  const getSelectedCode = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return '';
    const selection = editor.getSelection();
    const model = editor.getModel();
    if (!selection || selection.isEmpty()) {
      return model.getValue();
    }
    return model.getValueInRange(selection);
  }, []);

  const getFullCode = useCallback(() => {
    const model = editorRef.current?.getModel();
    return model?.getValue() || '';
  }, []);

  const getLanguage = useCallback(() => {
    const model = editorRef.current?.getModel();
    return model?.getLanguageId() || 'javascript';
  }, []);

  return { handleEditorMount, getSelectedCode, getFullCode, getLanguage };
}
