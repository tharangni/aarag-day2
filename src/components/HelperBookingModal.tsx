import React, { useState } from 'react';
import { HelperProfile } from '../types';
import { X, CheckCircle2, ShieldCheck, Zap, Calendar, Clock, DollarSign, Star } from 'lucide-react';

interface HelperBookingModalProps {
  helper: HelperProfile | null;
  onClose: () => void;
}

export const HelperBookingModal: React.FC<HelperBookingModalProps> = ({
  helper,
  onClose,
}) => {
  const [taskNote, setTaskNote] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(2);
  const [isBooked, setIsBooked] = useState(false);

  if (!helper) return null;

  const totalSgd = helper.hourlyRateSgd * estimatedHours;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Direct Booking: {helper.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {helper.roleTitle}
            </p>
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
          {isBooked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                Booking Request Dispatched!
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs mx-auto">
                {helper.name} has received your direct booking request. With an average response time of {helper.responseMinutes} minutes, you will receive a confirmation alert shortly.
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                Escrow Hold: S${totalSgd} (0% trial commission)
              </div>
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg"
              >
                Return to Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <img
                  src={helper.avatarUrl}
                  alt={helper.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-bold text-slate-900 dark:text-white">
                      {helper.name}
                    </strong>
                    <span className="text-[11px] text-amber-500 font-semibold font-mono tabular-nums">
                      ★ {helper.rating}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    S${helper.hourlyRateSgd} / hr · {helper.onTimeRate}% On-Time Record
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Duration: {estimatedHours} hours
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={estimatedHours}
                  onChange={(e) => setEstimatedHours(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Task Details &amp; Preferred Time
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe where and when you need this done..."
                  value={taskNote}
                  onChange={(e) => setTaskNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Total & Escrow calculation */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Helper rate ({estimatedHours} hrs)</span>
                  <span className="font-mono tabular-nums">S${totalSgd}</span>
                </div>
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Launch Trial Platform Fee</span>
                  <span className="font-mono tabular-nums">S$0.00 (Free)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>Total Escrow Deposit</span>
                  <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                    S${totalSgd}
                  </span>
                </div>
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
                  Confirm Direct Hire
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
