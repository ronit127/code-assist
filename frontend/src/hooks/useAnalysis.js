import { useState, useCallback } from 'react';
import { analyzeCode } from '../services/api.js';

export function useAnalysis() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const triggerAnalysis = useCallback(async (code, language, context, question) => {
    if (!code?.trim()) return;

    setIsLoading(true);
    setError(null);
    setIsPanelOpen(true);
    setAnalysisResult(null);

    try {
      const result = await analyzeCode(code, language, context, question);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  return { analysisResult, isLoading, error, isPanelOpen, triggerAnalysis, closePanel };
}
