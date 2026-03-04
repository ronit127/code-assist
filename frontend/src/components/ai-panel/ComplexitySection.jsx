import { SectionCard } from '../ui/SectionCard.jsx';
import { Badge } from '../ui/Badge.jsx';

export function ComplexitySection({ complexity }) {
  if (!complexity) return null;
  const [timeLabel, timeNote] = complexity.time.split(' - ');
  const [spaceLabel, spaceNote] = complexity.space.split(' - ');
  return (
    <SectionCard title="Complexity">
      <div className="space-y-2.5">
        <div className="flex items-start gap-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Time</p>
            <Badge variant="blue">{timeLabel?.trim()}</Badge>
            {timeNote && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{timeNote.trim()}</p>}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Space</p>
            <Badge>{spaceLabel?.trim()}</Badge>
            {spaceNote && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{spaceNote.trim()}</p>}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
