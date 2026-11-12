import React, { useState } from 'react';
import { Tag, Clock, ChevronRight, X, Sparkles } from 'lucide-react';

interface TrialBannerProps {
  onLearnMore: () => void;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({ onLearnMore }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full max-w-full overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-3 sm:px-4 py-2 text-xs font-medium shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 shrink-0">
            <Sparkles className="w-3 h-3 text-emerald-200" />
          </span>
          <p className="truncate text-[11px] sm:text-xs min-w-0">
            <strong className="font-semibold text-emerald-100">0% Commission Free Trial:</strong>{' '}
            Keep 100% of earnings on all chores for the next 14 days!
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onLearnMore}
            className="hidden md:inline-flex items-center gap-1 text-emerald-100 hover:text-white underline decoration-emerald-300 underline-offset-2 transition-colors cursor-pointer text-xs whitespace-nowrap"
          >
            <span>Fee Breakdown</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            title="Dismiss notice"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
