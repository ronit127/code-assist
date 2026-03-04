export function safeJSONParse(raw) {
  try {
    let cleaned = raw.trim();

    // Strip markdown code fences if present
    const fenceMatch = cleaned.match(/^```(?:json)?\s*([\s\S]*?)```\s*$/);
    if (fenceMatch) {
      cleaned = fenceMatch[1].trim();
    }

    // Extract JSON object substring (handles leading/trailing prose)
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    }

    return JSON.parse(cleaned);
  } catch (e) {
    // Surface the raw text as explanation so nothing is lost
    return {
      explanation: raw,
      lineByLine: null,
      complexity: null,
      detectedPatterns: null,
      errors: [],
      relatedLinks: []
    };
  }
}
