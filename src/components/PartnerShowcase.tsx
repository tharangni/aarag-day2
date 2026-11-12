import React from 'react';
import { ShieldCheck, Truck, HeartHandshake, CheckCircle2, ExternalLink, ArrowRight, Sparkles } from 'lucide-react';

interface PartnerShowcaseProps {
  onBookGrabCare: () => void;
  onBookCarousellCourier: () => void;
}

export const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({
  onBookGrabCare,
  onBookCarousellCourier,
}) => {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
          <HeartHandshake className="w-4 h-4" />
          <span>Strategic Ecosystem Alliances</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Key Partners: Grab "Care" &amp; Carousell
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
          We integrate directly with Singapore's leading platforms to give our users competitive advantages, certified animal/horticultural care, and safe marketplace pickups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Grab Care Partner Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between">
          <div>
            <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src="/src/assets/images/partner_grab_care_1794491734972.jpg"
                alt="Grab Care certified pet and houseplant caretaker"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                Grab "Care" Alliance
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  Certified Pet &amp; Plant Caretaker
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  From S$28 / visit
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Order a Dedicated Caretaker for Pets &amp; Plants
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Traveling or working long hours? Book verified Grab Care partners trained in veterinary first aid, dog walking, and indoor plant hydration. Includes GPS live tracking &amp; photo check-in.
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>S$50,000 complimentary veterinary &amp; property insurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Certified plant nutrition &amp; pest inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Live photo updates via WhatsApp &amp; in-app feed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={onBookGrabCare}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Order Grab "Care" Specialist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Carousell Courier & Errand Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500 transition-all flex flex-col justify-between">
          <div>
            <div className="h-60 w-full bg-gradient-to-br from-red-500/10 via-rose-500/5 to-slate-100 dark:to-slate-800 flex flex-col items-center justify-center p-8 text-center border-b border-slate-100 dark:border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg mb-3">
                <Truck className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Carousell P2P Logistics Partner
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                Zero-Hassle Marketplace Pickups
              </h4>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
                  Carousell Verified Runners
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  From S$22 / delivery
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Never Deal with Carousell No-Shows Again
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Found a great sofa, bicycle, or secondhand deal on Carousell? Our helpers meet the seller, inspect condition on live video, pay safely, and transport bulky goods straight to your home.
              </p>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>On-site item condition inspection prior to handover</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>Van &amp; MPV options for heavy furniture and appliances</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>PayNow buyer escrow protection guarantee</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <button
              onClick={onBookCarousellCourier}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white text-xs font-semibold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Carousell Pickup Helper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Non-intrusive Ad Revenue Banner (Directly from user's model "Ads for revenue") */}
      <div className="bg-slate-100 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-300">
            Sponsored Partner
          </span>
          <span>Dyson Singapore: Complimentary cordless filter sanitization for all Rent Somebody home cleaners.</span>
        </div>
        <span className="hidden sm:inline-block text-[11px] text-slate-400">Partner Revenue Stream</span>
      </div>
    </div>
  );
};
