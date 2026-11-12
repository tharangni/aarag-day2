import React from 'react';
import { HelperProfile } from '../types';
import { Crown, Lock, CheckCircle, ShieldCheck, Zap, Star, Sparkles, PhoneCall, ArrowRight } from 'lucide-react';

interface LeaderboardSectionProps {
  helpers: HelperProfile[];
  isProSubscriber: boolean;
  setIsProSubscriber: (pro: boolean) => void;
  onBookHelper: (helper: HelperProfile) => void;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  helpers,
  isProSubscriber,
  setIsProSubscriber,
  onBookHelper,
}) => {
  return (
    <div className="space-y-8">
      {/* Header and Paywall Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
            <Crown className="w-4 h-4 text-amber-500" />
            <span>Paywalled Feature · Rent Somebody Pro Exclusive</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            VIP Service Provider Leaderboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Vetted algorithms rank Singapore’s top 5% highest performing helpers based on 100% verified on-time rates, zero-cancellation records, and police background clearance.
          </p>
        </div>

        {/* Subscription Controller */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block">Status:</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {isProSubscriber ? 'Pro Subscriber (Unlocked)' : 'Free Tier (Locked Preview)'}
            </span>
          </div>
          <button
            onClick={() => setIsProSubscriber(!isProSubscriber)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 ${
              isProSubscriber
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white'
            }`}
          >
            {isProSubscriber ? (
              <>
                <span>Simulate Free Tier View</span>
              </>
            ) : (
              <>
                <Crown className="w-4 h-4" />
                <span>Unlock Pro Leaderboard (S$14.90/mo)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Paywall Upsell Strip if not subscribed */}
      {!isProSubscriber && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-lg shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                You are viewing the Free Preview
              </h4>
              <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-0.5">
                Full performance scores, police verification certificates, and instant 1-click VIP dispatch are reserved for Rent Somebody Pro subscribers.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProSubscriber(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white text-xs font-semibold rounded-lg shrink-0 transition-all cursor-pointer"
          >
            Activate 7-Day Free Pass
          </button>
        </div>
      )}

      {/* Leaderboard Table / Cards */}
      <div className="space-y-4">
        {helpers.map((helper, index) => {
          const isRankLocked = !isProSubscriber && helper.isProOnly;

          return (
            <div
              key={helper.id}
              className={`bg-white dark:bg-slate-900 rounded-xl border p-5 transition-all relative ${
                isRankLocked
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-sm'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Left: Rank & Helper Info */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 font-mono tabular-nums ${
                      index === 0
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'
                        : index === 1
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                        : index === 2
                        ? 'bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-700'
                        : 'bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    #{index + 1}
                  </div>

                  <div className="relative">
                    <img
                      src={helper.avatarUrl}
                      alt={helper.name}
                      className={`w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 ${
                        isRankLocked ? 'filter blur-[1px]' : ''
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {!isRankLocked && (
                      <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isRankLocked ? `${helper.name.split(' ')[0]} [Pro Member Access]` : helper.name}
                      </h3>
                      {helper.partnerAffiliation && !isRankLocked && (
                        <span className="text-[10px] bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded font-medium">
                          {helper.partnerAffiliation}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {helper.roleTitle} · {helper.location}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <span className="font-semibold text-amber-500 font-mono tabular-nums">
                        ★ {helper.rating}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">{helper.completedTasks} completed</span>
                      <span aria-hidden="true">·</span>
                      <span>Resp: ~{helper.responseMinutes}m</span>
                    </div>
                  </div>
                </div>

                {/* Middle & Right: Pro Metrics and Booking CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 md:pl-6">
                  {isRankLocked ? (
                    <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                      <Lock className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>On-Time Score &amp; Background Record Locked</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">On-Time</span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                          {helper.onTimeRate}%
                        </span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Vetted</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-500" />
                          <span>100%</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Right: Booking CTA */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-400 block">Rate</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                        S${helper.hourlyRateSgd}/hr
                      </span>
                    </div>

                    {isRankLocked ? (
                      <button
                        onClick={() => setIsProSubscriber(true)}
                        className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onBookHelper(helper)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Instant Hire</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pro Subscription Value Comparison */}
      <div className="mt-8 bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          Why subscribe to Rent Somebody Pro? (S$14.90 / month)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block mb-1">Top 5% Helper Access</strong>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Skip open public bidding and instantly assign Singapore's highest-rated verified chore specialists.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block mb-1">Priority Dispatch Under 3 Mins</strong>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Urgent tasks bypass the queue and alert nearby ranked specialists immediately with SMS &amp; push ping.
            </p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <strong className="text-slate-900 dark:text-white block mb-1">Background Clearance Proof</strong>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              View full certified government ID, criminal background records, and insurance coverage documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
