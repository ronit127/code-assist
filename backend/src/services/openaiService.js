import OpenAI from 'openai';
import { safeJSONParse } from '../utils/safeJSONParse.js';

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

function buildSystemPrompt() {
  return `You are CodeAssistor, an expert code analysis engine.
Your ONLY output must be a single valid JSON object.
Do NOT include markdown, code fences, explanations outside JSON, or any other text.
Do NOT wrap the JSON in \`\`\`json blocks.

Return exactly this JSON structure:
{
  "explanation": "A clear, concise 2-4 sentence plain English explanation of what the SELECTED code does. If full file context was provided, use it to understand surrounding variables, imports, and intent — but only explain the selected portion.",
  "lineByLine": [
    { "lineNumber": 1, "code": "exact line content", "explanation": "what this line does" }
  ],
  "complexity": {
    "time": "O(n) - brief justification",
    "space": "O(1) - brief justification"
  },
  "detectedPatterns": ["Pattern 1", "Pattern 2"],
  "errors": [
    { "lineNumber": 3, "description": "description of issue", "suggestion": "how to fix it" }
  ],
  "searchTopics": ["concise search query 1", "concise search query 2"]
}

Rules:
- "explanation" must only describe the SELECTED code, not the full file. Use the full context to understand references like variables, imports, and types that are defined outside the selection.
- "lineByLine" must contain one entry per line of the SELECTED code only. Do not skip lines.
- "complexity" should reflect the DOMINANT operation in the selected code. Set to null if the snippet is too short to determine.
- "detectedPatterns" should name design patterns, data structures, or algorithms (e.g. "Binary Search", "Singleton", "Memoization"). Use [] if none.
- "errors" should be [] if there are no errors or code smells in the selected code.
- "searchTopics" must be exactly 2 concise search queries (5-8 words each) that a developer would type into Google or Stack Overflow to learn more about the core concept in the selected code. Make them specific and technically accurate. Example: ["binary search iterative implementation javascript", "time complexity divide and conquer algorithms"]`;
}

function buildUserMessage(selectedCode, language, context, question) {
  const questionLine = question ? `\n\nUser question: ${question}` : '';
  const contextSection = context && context.trim() !== selectedCode.trim()
    ? `\n\nFull file context (for reference only — do NOT analyze this separately, only use it to understand references in the selected code):\n\`\`\`${language}\n${context}\n\`\`\``
    : '';

  return `Analyze this selected ${language} code:\n\`\`\`${language}\n${selectedCode}\n\`\`\`${contextSection}${questionLine}`;
}

export async function analyzeCode(selectedCode, language, context, question) {
  const response = await openai.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    max_tokens: 2000,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserMessage(selectedCode, language, context, question) }
    ]
  });

  const raw = response.choices[0].message.content;
  return safeJSONParse(raw);
}
