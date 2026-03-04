const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export async function analyzeCode(code, language, context = null, question = null) {
  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language, context, question })
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || `Server error: ${response.status}`);
  }

  return response.json();
}
