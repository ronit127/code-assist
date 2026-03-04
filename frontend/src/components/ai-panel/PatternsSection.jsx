import { SectionCard } from '../ui/SectionCard.jsx';
import { Badge } from '../ui/Badge.jsx';

export function PatternsSection({ patterns }) {
  if (!patterns || patterns.length === 0) return null;
  return (
    <SectionCard title="Patterns">
      <div className="flex flex-wrap gap-1.5">
        {patterns.map((p, i) => <Badge key={i}>{p}</Badge>)}
      </div>
    </SectionCard>
  );
}
