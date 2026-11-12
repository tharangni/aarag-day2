import React, { useState } from 'react';
import { Tag, Clock, ChevronRight, X, Sparkles } from 'lucide-react';

interface TrialBannerProps {
  onLearnMore: () => void;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({ onLearnMore }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-2.5 text-xs font-medium shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 shrink-0">
            <Sparkles className="w-3 h-3 text-emerald-200" />
          </span>
          <p className="truncate">
            <strong className="font-semibold text-emerald-100">Official Launch Free Trial:</strong>{' '}
            Enjoy 0% platform commission on all chores for the next 14 days! Helpers keep 100% of earnings; buyers pay zero booking surcharges.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onLearnMore}
            className="hidden sm:inline-flex items-center gap-1 text-emerald-100 hover:text-white underline decoration-emerald-300 underline-offset-2 transition-colors cursor-pointer"
          >
            <span>See Fee Breakdown</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
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
