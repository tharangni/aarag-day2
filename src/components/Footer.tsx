import React from 'react';
import { UserRole } from '../types';
import { ShieldCheck, HeartHandshake, FileText, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenBusinessModel: () => void;
  onOpenAdvisor: () => void;
  onSwitchRole: () => void;
  currentRole: UserRole;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBusinessModel,
  onOpenAdvisor,
  onSwitchRole,
  currentRole,
}) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors py-12 text-slate-500 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
                RS
              </span>
              <span>Rent Somebody</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              On-demand chore and task marketplace connecting people who need time with people who want to earn money across Singapore.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>0% Commission Trial Active</span>
              <span aria-hidden="true">·</span>
              <span>100% Escrow Secured</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onSwitchRole}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Switch to {currentRole === 'buyer' ? 'Seller Mode (Earn Money)' : 'Buyer Mode (Get Help)'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdvisor}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  24/7 AI Guidance Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBusinessModel}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Business Model Canvas
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Key Partners
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-slate-700 dark:hover:text-slate-200">
                  Grab "Care" — Pet &amp; Plant Sitting
                </span>
              </li>
              <li>
                <span className="hover:text-slate-700 dark:hover:text-slate-200">
                  Carousell — Bulky Item Pickup &amp; Delivery
                </span>
              </li>
              <li>
                <span className="hover:text-slate-700 dark:hover:text-slate-200">
                  Dyson SG — Certified Tool Cleaning
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Launch Free Trial
            </h4>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mb-3">
              Enjoy 0% platform commission on all completed chores during our 14-day community rollout.
            </p>
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Singapore · Islandwide Coverage
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Rent Somebody Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Community Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
