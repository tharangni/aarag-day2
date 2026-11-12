import React, { useState } from 'react';
import { Chore } from '../types';
import { X, Send, CheckCircle2, DollarSign, Clock, ShieldCheck } from 'lucide-react';

interface ApplyGigModalProps {
  chore: Chore | null;
  onClose: () => void;
  onSubmitBid: (choreId: string, amount: number, proposal: string) => void;
}

export const ApplyGigModal: React.FC<ApplyGigModalProps> = ({
  chore,
  onClose,
  onSubmitBid,
}) => {
  const [offerPrice, setOfferPrice] = useState<number>(chore ? chore.budgetSgd : 60);
  const [proposal, setProposal] = useState(
    'Hi! I am available to help with this immediately. I have all the necessary equipment and will ensure the task is done cleanly.'
  );
  const [submitted, setSubmitted] = useState(false);

  if (!chore) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitBid(chore.id, offerPrice, proposal);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Submit Gig Proposal
            </span>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
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
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Proposal Sent to Buyer!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs mx-auto">
                Your offer of S${offerPrice} has been sent to {chore.postedBy}. With 0% trial commission, you will keep 100% of this amount upon completion.
              </p>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
              >
                Back to Available Gigs
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Buyer's Posted Budget:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    S${chore.budgetSgd}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Location:</span>
                  <span className="font-medium text-slate-900 dark:text-white">
                    {chore.location}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Offer Amount (SGD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400">S$</span>
                  <input
                    type="number"
                    min="15"
                    max="500"
                    required
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 block">
                  0% Commission: You receive full S${offerPrice} into your account.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Introduction / Proposal Message
                </label>
                <textarea
                  required
                  rows={3}
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  Send Proposal
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
