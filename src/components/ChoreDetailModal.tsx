import React, { useState } from 'react';
import { Chore } from '../types';
import { X, MapPin, Clock, DollarSign, ShieldCheck, CheckCircle2, User, Send, Star } from 'lucide-react';

interface ChoreDetailModalProps {
  chore: Chore | null;
  onClose: () => void;
  onAcceptBid: (choreId: string, helperName: string) => void;
}

export const ChoreDetailModal: React.FC<ChoreDetailModalProps> = ({
  chore,
  onClose,
  onAcceptBid,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'bids'>('bids');
  const [assignedSuccess, setAssignedSuccess] = useState<string | null>(null);

  if (!chore) return null;

  const mockBids = [
    {
      id: 'bid-1',
      helperName: 'Sarah Chen',
      rating: 4.98,
      tasks: 189,
      amountSgd: chore.budgetSgd,
      eta: 'Can start in 25 mins',
      proposal: 'Hi! I have extensive experience with this. I bring all required tools and clean up completely.',
    },
    {
      id: 'bid-2',
      helperName: 'Kenji Takahashi',
      rating: 4.96,
      tasks: 164,
      amountSgd: chore.budgetSgd - 5,
      eta: 'Available at 4:30 PM',
      proposal: 'Equipped with commercial screwdrivers and heavy equipment. Ready to complete within 1.5 hours.',
    },
  ];

  const handleHire = (helperName: string) => {
    setAssignedSuccess(helperName);
    onAcceptBid(chore.id, helperName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <span>{chore.category}</span>
              <span aria-hidden="true">·</span>
              <span>Posted {chore.postedAt}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
              {chore.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {assignedSuccess ? (
            <div className="p-6 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Task Assigned to {assignedSuccess}!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                S${chore.budgetSgd} has been placed safely in Rent Somebody Escrow (0% trial commission applied). The helper has been dispatched with your instructions.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Task summary */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {chore.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{chore.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Est. {chore.timeEstimate}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white font-mono tabular-nums text-sm">
                    Budget: S${chore.budgetSgd}
                  </div>
                </div>
              </div>

              {/* Bids received */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Offers from Nearby Helpers ({mockBids.length})
                  </h4>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    0% Commission Active
                  </span>
                </div>

                <div className="space-y-3">
                  {mockBids.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2 hover:border-emerald-500 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-xs font-bold text-slate-900 dark:text-white">
                              {b.helperName}
                            </strong>
                            <span className="text-[11px] text-amber-500 font-semibold font-mono tabular-nums">
                              ★ {b.rating}
                            </span>
                            <span className="text-[11px] text-slate-400">({b.tasks} tasks)</span>
                          </div>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {b.eta}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums block">
                            S${b.amountSgd}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300">
                        "{b.proposal}"
                      </p>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleHire(b.helperName)}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg transition-all cursor-pointer"
                        >
                          Accept &amp; Escrow S${b.amountSgd}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
