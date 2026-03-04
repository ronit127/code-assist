export const SUPPORTED_LANGUAGES = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Python', value: 'python' },
  { label: 'Java', value: 'java' },
  { label: 'C++', value: 'cpp' },
  { label: 'Rust', value: 'rust' },
  { label: 'Go', value: 'go' }
];

export function detectLanguageFromCode(code) {
  if (code.includes('def ') && code.includes(':')) return 'python';
  if (code.includes('fn ') && code.includes('->')) return 'rust';
  if (code.includes('func ') && code.includes('package ')) return 'go';
  if (code.includes('public class ') || code.includes('System.out')) return 'java';
  if (code.includes(': string') || code.includes(': number') || code.includes('interface ')) return 'typescript';
  return 'javascript';
}
