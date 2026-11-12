import React from 'react';
import { UserRole } from '../types';
import { Search, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onPostChoreClick: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentRole,
  onRoleChange,
  onPostChoreClick,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  const quickCategories = [
    'All Chores',
    'Handyman & Assembly',
    'Pets & Plants',
    'Errands & Delivery',
    'Home & Cleaning',
    'Queue & Events',
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Dual Persona Switcher Bar */}
        <div className="flex items-center justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-full max-w-sm sm:w-auto">
            <button
              onClick={() => onRoleChange('buyer')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all text-center ${
                currentRole === 'buyer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="sm:hidden">Buyer Mode</span>
              <span className="hidden sm:inline">Buyer Mode (I Need Chores Done)</span>
            </button>
            <button
              onClick={() => onRoleChange('seller')}
              className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs font-semibold rounded-lg transition-all text-center ${
                currentRole === 'seller'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="sm:hidden">Seller Mode</span>
              <span className="hidden sm:inline">Seller Mode (I Want to Earn)</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Headlines & Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {currentRole === 'buyer' ? (
              <>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-2 sm:mb-3">
                  <span>For Busy Professionals &amp; Families</span>
                  <span aria-hidden="true">·</span>
                  <span>People who got no time</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-tight mb-3 sm:mb-4">
                  Make your to-do lists disappear. Hire someone reliable in minutes.
                </h1>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6 max-w-xl">
                  Delegate furniture assembly, queue standing, pet care, plant watering, or marketplace pickups to vetted local helpers. Save your weekend for what truly matters.
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-2 sm:mb-3">
                  <span>For Helpers &amp; Skilled Freelancers</span>
                  <span aria-hidden="true">·</span>
                  <span>People who got time &amp; want to earn</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-tight mb-3 sm:mb-4">
                  Turn your free hours into cash. Help neighbors, get paid instantly.
                </h1>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5 sm:mb-6 max-w-xl">
                  Pick up flexible local gigs—from assembling IKEA beds to walking pets or queuing. 0% platform commission during our launch trial: you keep 100% of your earnings.
                </p>
              </>
            )}

            {/* Functional Search / Filter Input */}
            <div className="bg-white dark:bg-slate-900 p-1.5 sm:p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-xl mb-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0 px-2 py-1">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder={
                      currentRole === 'buyer'
                        ? 'Search chores (e.g. "IKEA", "pet care", "Novena")...'
                        : 'Find gigs (e.g. "furniture", "errands", "Tampines")...'
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1 shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {currentRole === 'buyer' ? (
                  <button
                    onClick={onPostChoreClick}
                    className="px-4 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors text-center"
                  >
                    Post Chore
                  </button>
                ) : (
                  <button
                    onClick={() => {}}
                    className="px-4 py-2 sm:py-2.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors text-center"
                  >
                    Search Gigs
                  </button>
                )}
              </div>
            </div>

            {/* Quick Segment Filter Buttons (Horizontal touch scroll on mobile) */}
            <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap">
              {quickCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer shrink-0 sm:shrink ${
                      isActive
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Hero Visual Photography Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-100 dark:bg-slate-900">
              <img
                src="/src/assets/images/hero_chore_marketplace_1794491733585.jpg"
                alt="Rent Somebody helper delivering groceries and assisting customer"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Escrow Protected &amp; Verified</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-snug">
                  "Found Sarah in 4 minutes to assemble our new dining set. Saved us our entire Saturday."
                </p>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300 mt-2">
                  <span>Marcus &amp; Lin · Tampines</span>
                  <span className="font-mono tabular-nums text-emerald-400">Matched in 4.2m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Metrics Row */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">0%</div>
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">Trial Commission Fee</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">4.8 min</div>
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">Average Helper Match</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">1,240+</div>
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">Vetted SG Service Providers</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">24 / 7</div>
            <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">Live Agent &amp; AI Advisor</div>
          </div>
        </div>
      </div>
    </section>
  );
};
