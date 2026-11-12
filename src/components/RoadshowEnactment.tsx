import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, User, Clock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const RoadshowEnactment: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const steps = [
    {
      step: 1,
      title: 'The Real-World Problem',
      role: 'Buyer: Marcus (Busy Project Manager)',
      description: 'Marcus arrives home at 6:00 PM with flat-packed furniture boxes and a housewarming party tomorrow. He has zero tools and zero free hours.',
      visualText: 'Marcus opens Rent Somebody and types: "Need IKEA wardrobe assembled before 9 PM tonight in Tampines."',
      badge: 'Time Deficit',
    },
    {
      step: 2,
      title: 'AI Scoping & Instant Broadcast',
      role: 'Platform: Rent Somebody AI Guidance',
      description: 'The built-in Shopify-like AI assistant analyzes the IKEA model, checks tool requirements (cordless drill + hex bits), and recommends a fair market rate of S$85.',
      visualText: 'Job broadcasted to 14 verified nearby handymen in Tampines & Bedok within a 3km radius.',
      badge: 'AI Optimization',
    },
    {
      step: 3,
      title: 'Helper Match in 3.8 Minutes',
      role: 'Seller: Sarah Chen (Rated 4.98 ★)',
      description: 'Sarah, a skilled local assembler with 189 completed tasks, accepts the task and confirms arrival in 25 minutes with her own toolkit.',
      visualText: 'Escrow deposit of S$85 locked securely. Marcus receives live GPS tracking of Sarah approaching.',
      badge: 'Vetted Dispatch',
    },
    {
      step: 4,
      title: 'Live Enactment & Photo Proof',
      role: 'Task Completion',
      description: 'Sarah finishes the 3-door wardrobe with smooth hinges in 1 hour 45 minutes, cleans up sawdust, and submits high-res completion photos.',
      visualText: 'Marcus inspects the wardrobe, taps "Approve Task", and rates Sarah 5 stars.',
      badge: 'Escrow Release',
    },
    {
      step: 5,
      title: 'Instant Payout (0% Commission)',
      role: 'Settlement & Retention',
      description: 'Thanks to the 14-day Launch Free Trial, 100% of the S$85 is deposited into Sarah’s bank wallet instantly with zero fee deducted. Marcus reclaimed his evening.',
      visualText: 'Total time from post to finish: 2 hrs 10 mins. Both parties win.',
      badge: 'Trial Win-Win',
    },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1;
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Key Activity: Roadshow Interactive Enactment</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Live Roadshow Demonstration
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Simulate the exact customer journey demonstrated during our live community pop-ups and roadshows across Singapore.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
            <span>{isPlaying ? 'Pause Simulation' : 'Run Auto Roadshow'}</span>
          </button>
          <button
            onClick={() => {
              setIsPlaying(false);
              setActiveStep(1);
            }}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Reset simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Indicators (Horizontal scroll on mobile, 5-col on desktop) */}
      <div className="flex md:grid md:grid-cols-5 gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {steps.map((s) => (
          <button
            key={s.step}
            onClick={() => {
              setIsPlaying(false);
              setActiveStep(s.step);
            }}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer shrink-0 w-32 sm:w-36 md:w-auto ${
              activeStep === s.step
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-300 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5 font-mono">
              Step 0{s.step}
            </div>
            <div className="text-xs font-semibold truncate">
              {s.title}
            </div>
          </button>
        ))}
      </div>

      {/* Active Step Enactment Stage */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 shadow-sm">
        {(() => {
          const current = steps[activeStep - 1];
          return (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {current.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Stage {activeStep} of {steps.length}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  {current.role}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {current.title}
                </h3>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {current.description}
              </p>

              {/* Live Mock Screen Preview */}
              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 font-mono leading-relaxed">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] mb-2 uppercase tracking-wider font-sans font-semibold">
                  <span>Enactment Screen Prompt</span>
                </div>
                "{current.visualText}"
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  disabled={activeStep === 1}
                  onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 disabled:opacity-30 disabled:cursor-not-allowed hover:text-slate-900 dark:hover:text-white"
                >
                  Previous Step
                </button>
                <button
                  disabled={activeStep === steps.length}
                  onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length))}
                  className="px-4 py-2 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next Step
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
