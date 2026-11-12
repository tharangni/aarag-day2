import React, { useState } from 'react';
import { Chore } from '../types';
import { DollarSign, Clock, MapPin, Send, Sparkles, TrendingUp, Award, CheckCircle2 } from 'lucide-react';

interface SellerWorkspaceProps {
  chores: Chore[];
  onApplyChore: (chore: Chore) => void;
  searchQuery: string;
  selectedCategory: string;
}

export const SellerWorkspace: React.FC<SellerWorkspaceProps> = ({
  chores,
  onApplyChore,
  searchQuery,
  selectedCategory,
}) => {
  const [tasksPerWeek, setTasksPerWeek] = useState<number>(4);
  const [avgTaskPrice, setAvgTaskPrice] = useState<number>(65);

  const weeklyEarnings = tasksPerWeek * avgTaskPrice;
  const monthlyEarnings = weeklyEarnings * 4.2;
  const trialSavingsMonthly = Math.round(monthlyEarnings * 0.10); // 10% commission saved during trial

  const availableGigs = chores.filter((c) => {
    const matchesCat = selectedCategory === 'All Chores' || c.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-12">
      {/* Earnings & Trial Perks Bar */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 sm:p-8 border border-slate-700 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Seller Earnings Simulator (0% Commission Active)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
              Earn estimated <span className="text-emerald-400 font-mono tabular-nums">S${monthlyEarnings.toLocaleString()}</span> / month
            </h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              Based on completing {tasksPerWeek} chores per week at an average of S${avgTaskPrice} each. During our 14-day free trial, you save <strong className="text-emerald-300 font-mono tabular-nums">~S${trialSavingsMonthly}</strong> in platform fees!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 pt-4 border-t border-slate-700/80 max-w-md">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Chores per week: {tasksPerWeek}</label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={tasksPerWeek}
                  onChange={(e) => setTasksPerWeek(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Average chore payout: S${avgTaskPrice}</label>
                <input
                  type="range"
                  min="25"
                  max="150"
                  step="5"
                  value={avgTaskPrice}
                  onChange={(e) => setAvgTaskPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-5 border border-white/10 shrink-0 lg:w-72">
            <div className="text-xs text-slate-300 font-medium mb-1">Your Payout Guarantee</div>
            <div className="text-xl font-bold font-mono tabular-nums text-white mb-2">100% Retained</div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero commission fee during launch</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Instant PayNow / Bank release upon completion</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Complimentary job escrow protection</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Available Gigs Feed */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Available Gigs in Singapore</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>{availableGigs.length} buyers actively requesting helpers</span>
              <span aria-hidden="true">·</span>
              <span>Submit proposal with your custom price</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGigs.map((chore) => (
            <div
              key={chore.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {chore.category}
                  </span>
                  <span className="text-xs text-slate-400">{chore.postedAt}</span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {chore.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                  {chore.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {chore.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[130px]">{chore.location}</span>
                  </span>
                  <span className="flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{chore.timeEstimate}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400">Estimated Payout</span>
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                      S${chore.budgetSgd}
                    </div>
                  </div>
                  <button
                    onClick={() => onApplyChore(chore)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Gig</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Guidance Box (Shopify style guidance for Sellers) */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-amber-800 dark:text-amber-300 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200 mb-1">
              AI Seller Coaching: How to Earn S$1,500+ This Month
            </h4>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80 leading-relaxed mb-3">
              Similar to Shopify's store optimizer, Rent Somebody uses algorithmic guidance to help you win more bids:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                <strong className="text-slate-900 dark:text-white block mb-0.5">1. Get Grab Care Certified</strong>
                <span className="text-slate-600 dark:text-slate-400">Pet &amp; plant gigs pay 35% higher hourly rates.</span>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                <strong className="text-slate-900 dark:text-white block mb-0.5">2. Reply in &lt; 5 mins</strong>
                <span className="text-slate-600 dark:text-slate-400">First 3 responders win 78% of all task allocations.</span>
              </div>
              <div className="p-2.5 bg-white/70 dark:bg-slate-900/70 rounded-lg border border-amber-200/60 dark:border-amber-900/40">
                <strong className="text-slate-900 dark:text-white block mb-0.5">3. Complete 5 Tasks for Leaderboard</strong>
                <span className="text-slate-600 dark:text-slate-400">Unlock VIP subscriber auto-dispatch opportunities.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
