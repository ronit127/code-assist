import { SectionCard } from '../ui/SectionCard.jsx';

function ExternalIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 flex-shrink-0">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

function LinkTypeLabel({ type }) {
  if (type === 'stackoverflow') {
    return (
      <span className="text-xs text-orange-500 dark:text-orange-400 font-medium flex-shrink-0">
        Stack Overflow
      </span>
    );
  }
  if (type === 'youtube') {
    return (
      <span className="text-xs text-red-500 dark:text-red-400 font-medium flex-shrink-0">
        YouTube
      </span>
    );
  }
  return (
    <span className="text-xs text-blue-500 dark:text-blue-400 font-medium flex-shrink-0">
      Docs
    </span>
  );
}

export function LinksSection({ links }) {
  if (!links || links.length === 0) return null;

  const soLinks = links.filter(l => l.type === 'stackoverflow');
  const ytLinks = links.filter(l => l.type === 'youtube');
  const docLinks = links.filter(l => l.type === 'documentation');

  return (
    <SectionCard title="Related resources">
      <div className="space-y-3">
        {soLinks.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs text-gray-400 dark:text-gray-600">Stack Overflow</p>
            {soLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-md border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center rounded bg-orange-100 dark:bg-orange-950/40">
                  <span className="text-[9px] font-bold text-orange-600 dark:text-orange-400">S</span>
                </div>
                <span className="flex-1 text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 line-clamp-2 leading-snug">{link.title}</span>
                <ExternalIcon />
              </a>
            ))}
          </div>
        )}

        {ytLinks.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs text-gray-400 dark:text-gray-600">YouTube</p>
            {ytLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex gap-2.5 p-2 rounded-md border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                {link.thumbnail && (
                  <div className="flex-shrink-0 w-20 h-[45px] rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img
                      src={link.thumbnail}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <span className="text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 line-clamp-2 leading-snug">{link.title}</span>
                </div>
                <ExternalIcon />
              </a>
            ))}
          </div>
        )}

        {docLinks.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs text-gray-400 dark:text-gray-600">Documentation</p>
            {docLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-md border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center rounded bg-blue-50 dark:bg-blue-950/40">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                </div>
                <span className="flex-1 text-xs text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 line-clamp-2 leading-snug">{link.title}</span>
                <ExternalIcon />
              </a>
            ))}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
