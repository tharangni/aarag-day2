import React, { useState } from 'react';
import { BUSINESS_MODEL_CANVAS } from '../data/mockData';
import { X, CheckCircle2, TrendingUp, DollarSign, Users, Award, ShieldCheck, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface BusinessPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessPlanModal: React.FC<BusinessPlanModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showOriginalImage, setShowOriginalImage] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors max-h-[92dvh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 dark:bg-slate-950 shrink-0">
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span>Business Model Blueprint</span>
              <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                Whiteboard Plan
              </span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Direct implementation mapping from your business model plan diagram.
            </p>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <button
              onClick={() => setShowOriginalImage(!showOriginalImage)}
              className="text-xs px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">{showOriginalImage ? 'Show Interactive Canvas' : 'View Uploaded Diagram'}</span>
              <span className="sm:hidden">{showOriginalImage ? 'Canvas' : 'Original Diagram'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {showOriginalImage ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Original diagram provided in prompt:
              </div>
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-950 p-2">
                <img
                  src="/public/assets/aistudio/Rent-Somebody-img_fd60213d.png"
                  alt="Original Rent Somebody Business Model Plan Canvas"
                  className="w-full h-auto object-contain max-h-[70vh] rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Dual Customer Segments */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                    Buyer Segment
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    People Who Got No Time &amp; Want to Spend Money
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Make to-do lists disappear quicker by delegating household chores, furniture assembly, line queuing, and deliveries. Reclaim personal freedom.
                  </p>
                </div>

                <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-900/50">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 block mb-1">
                    Seller Segment
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    People Who Got Time &amp; Want to Earn Money
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Flexible income helping neighbors with chores. 0% commission during launch trial. Shopify-style AI guidance to optimize bid success.
                  </p>
                </div>
              </div>

              {/* Core 9 Blocks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Key Propositions */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-2 font-bold">
                    Key Value Propositions
                  </strong>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
                    {BUSINESS_MODEL_CANVAS.keyPropositions.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Activities & Resources */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-2 font-bold">
                    Key Activities &amp; Resources
                  </strong>
                  <div className="space-y-2 text-slate-600 dark:text-slate-300">
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200 block">Free Trial:</strong>{' '}
                      Explore with 0% platform commission during promotional window.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200 block">Roadshows:</strong>{' '}
                      Live enactment demonstrations at Singapore community hubs.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200 block">Resources:</strong>{' '}
                      Actual human helpers, 24/7 AI chatbot, and cloud server hosting.
                    </p>
                  </div>
                </div>

                {/* Key Partners */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-2 font-bold">
                    Key Strategic Partners
                  </strong>
                  <div className="space-y-2 text-slate-600 dark:text-slate-300">
                    <p>
                      <strong className="text-emerald-600 dark:text-emerald-400 block">Grab Care:</strong>{' '}
                      Certified caretakers for pets &amp; plants with insurance.
                    </p>
                    <p>
                      <strong className="text-red-600 dark:text-red-400 block">Carousell:</strong>{' '}
                      P2P inspection &amp; bulky furniture logistics courier.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200 block">Sponsored Ads:</strong>{' '}
                      Contextual non-intrusive brand placements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Architecture: Costs vs Revenues */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-xs font-bold text-slate-900 dark:text-white">
                      Cost Structure
                    </strong>
                    <span className="text-[11px] text-slate-400">Monthly Run Rate</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {BUSINESS_MODEL_CANVAS.costStructure.map((cost, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800"
                      >
                        <span className="text-slate-700 dark:text-slate-300">{cost.item}</span>
                        <span className="font-mono tabular-nums font-semibold text-rose-600 dark:text-rose-400">
                          {cost.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-xs font-bold text-slate-900 dark:text-white">
                      Revenue Streams
                    </strong>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Monetization Engines
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {BUSINESS_MODEL_CANVAS.revenueStreams.map((rev, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800"
                      >
                        <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-white">
                          <span>{rev.source}</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono">Active</span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {rev.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
