import React, { useState } from 'react';
import { Chore, HelperProfile } from '../types';
import { MapPin, Clock, DollarSign, Plus, CheckCircle, AlertCircle, Shield, Sparkles, UserCheck } from 'lucide-react';

interface BuyerWorkspaceProps {
  chores: Chore[];
  helpers: HelperProfile[];
  onPostChoreClick: () => void;
  onSelectHelper: (helper: HelperProfile) => void;
  onViewChoreDetails: (chore: Chore) => void;
  onQuickHirePartner: (partnerName: string) => void;
  searchQuery: string;
  selectedCategory: string;
}

export const BuyerWorkspace: React.FC<BuyerWorkspaceProps> = ({
  chores,
  helpers,
  onPostChoreClick,
  onSelectHelper,
  onViewChoreDetails,
  onQuickHirePartner,
  searchQuery,
  selectedCategory,
}) => {
  const filteredChores = chores.filter((chore) => {
    const matchesCat = selectedCategory === 'All Chores' || chore.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      chore.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chore.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chore.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-12">
      {/* Active Tasks & Chores Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Chore Board</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>{filteredChores.length} open tasks near you</span>
              <span aria-hidden="true">·</span>
              <span>Average response under 5 minutes</span>
              <span aria-hidden="true">·</span>
              <span>Escrow protected</span>
            </div>
          </div>
          <button
            onClick={onPostChoreClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Post a New Chore</span>
          </button>
        </div>

        {filteredChores.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">No chores match your current filter.</p>
            <button
              onClick={onPostChoreClick}
              className="mt-3 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg"
            >
              Post this Chore Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChores.map((chore) => (
              <div
                key={chore.id}
                onClick={() => onViewChoreDetails(chore)}
                className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      {chore.category}
                    </span>
                    {chore.isUrgent && (
                      <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                        Urgent
                      </span>
                    )}
                    {chore.partnerBadge && (
                      <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-200 dark:border-teal-900">
                        {chore.partnerBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2 line-clamp-2">
                    {chore.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {chore.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[140px]">{chore.location}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{chore.timeEstimate}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Budget</span>
                      <div className="text-base font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                        S${chore.budgetSgd}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        {chore.bidsCount} offers
                      </span>
                      <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-slate-800 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 text-xs font-semibold rounded-lg transition-colors">
                        View Bids
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Direct Featured Helpers Directory */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Featured Trusted Helpers</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>Verified Identity &amp; Background Checked</span>
              <span aria-hidden="true">·</span>
              <span>Available for Direct Booking</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {helpers.slice(0, 3).map((helper) => (
            <div
              key={helper.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={helper.avatarUrl}
                    alt={helper.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {helper.name}
                      </h4>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium truncate">
                      {helper.roleTitle}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span className="font-semibold text-amber-500 font-mono tabular-nums">★ {helper.rating}</span>
                      <span>({helper.reviewsCount} tasks)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mb-3">
                  {helper.bio}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {helper.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400">Rate</span>
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                    S${helper.hourlyRateSgd} / hr
                  </div>
                </div>
                <button
                  onClick={() => onSelectHelper(helper)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Book Helper
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
