import React, { useState } from 'react';
import { UserRole } from '../types';
import { Sun, Moon, Sparkles, FileText, PlusCircle, ArrowLeftRight, Menu, X, Crown, HeartHandshake, Play, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleToggle: () => void;
  onPostChoreClick: () => void;
  onOpenAdvisorClick: () => void;
  onOpenBusinessModelClick: () => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  isProSubscriber: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleToggle,
  onPostChoreClick,
  onOpenAdvisorClick,
  onOpenBusinessModelClick,
  activeNavTab,
  setActiveNavTab,
  isDark,
  setIsDark,
  isProSubscriber,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveNavTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 h-16">
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('feed')}
              className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
                RS
              </span>
              <span className="whitespace-nowrap">Rent Somebody</span>
            </button>
            <span className="hidden xl:inline-flex text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              0% Fee Launch Trial
            </span>
          </div>

          {/* Zone 2: 4-5 Clean Single-Line Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => handleNavClick('feed')}
              className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'feed' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
              }`}
            >
              {currentRole === 'buyer' ? 'Browse Chores' : 'Available Jobs'}
            </button>
            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeNavTab === 'leaderboard' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
              }`}
            >
              <span>VIP Leaderboard</span>
              {!isProSubscriber && (
                <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                  Pro
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('partners')}
              className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'partners' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
              }`}
            >
              Grab Care &amp; Carousell
            </button>
            <button
              onClick={() => handleNavClick('roadshow')}
              className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 ${
                activeNavTab === 'roadshow' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : ''
              }`}
            >
              Roadshow Enactment
            </button>
            <button
              onClick={onOpenBusinessModelClick}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-slate-500 dark:text-slate-400"
              title="View Original Business Model Canvas"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Blueprint</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Persona Switcher (Desktop) */}
            <button
              onClick={onRoleToggle}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0"
              title={`Switch to ${currentRole === 'buyer' ? 'Seller (Earn Money)' : 'Buyer (Get Help)'}`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Viewing as:</span>
              <strong className="capitalize text-slate-900 dark:text-white">{currentRole}</strong>
            </button>

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisorClick}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open 24/7 AI Guidance Agent"
              aria-label="Open 24/7 AI Guidance Agent"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            {currentRole === 'buyer' ? (
              <button
                onClick={onPostChoreClick}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden xs:inline">Post a Chore</span>
                <span className="xs:hidden">Post</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('feed')}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <span className="hidden xs:inline">Find Paid Tasks</span>
                <span className="xs:hidden">Tasks</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-3 shadow-xl">
          {/* Mobile Persona Switcher */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-xs">
              <span className="text-slate-500 dark:text-slate-400 block">Current Persona:</span>
              <strong className="text-slate-900 dark:text-white capitalize">
                {currentRole === 'buyer' ? 'Buyer (I Need Chores Done)' : 'Seller (I Want to Earn)'}
              </strong>
            </div>
            <button
              onClick={() => {
                onRoleToggle();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg shrink-0"
            >
              Switch Mode
            </button>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => handleNavClick('feed')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNavTab === 'feed'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {currentRole === 'buyer' ? 'Browse Chores' : 'Available Jobs'}
            </button>
            <button
              onClick={() => handleNavClick('leaderboard')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                activeNavTab === 'leaderboard'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>VIP Leaderboard</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-semibold">
                {isProSubscriber ? 'Pro Unlocked' : 'Pro Tier'}
              </span>
            </button>
            <button
              onClick={() => handleNavClick('partners')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNavTab === 'partners'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Grab Care &amp; Carousell
            </button>
            <button
              onClick={() => handleNavClick('roadshow')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeNavTab === 'roadshow'
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Roadshow Enactment
            </button>
            <button
              onClick={() => {
                onOpenBusinessModelClick();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Business Model Blueprint</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

