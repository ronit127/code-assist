import { SectionCard } from '../ui/SectionCard.jsx';

export function ExplanationSection({ explanation }) {
  if (!explanation) return null;
  return (
    <SectionCard title="Explanation">
      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{explanation}</p>
    </SectionCard>
  );
}
