import React, { useState } from 'react';
import { Chore } from '../types';
import { X, Sparkles, MapPin, DollarSign, Clock, ShieldCheck, Check } from 'lucide-react';

interface PostChoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChore: (chore: Chore) => void;
}

export const PostChoreModal: React.FC<PostChoreModalProps> = ({
  isOpen,
  onClose,
  onAddChore,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Chore['category']>('Handyman & Assembly');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Orchard / Somerset');
  const [budgetSgd, setBudgetSgd] = useState<number>(65);
  const [timeEstimate, setTimeEstimate] = useState('2.0 hrs');
  const [isUrgent, setIsUrgent] = useState(false);
  const [partnerBadge, setPartnerBadge] = useState<Chore['partnerBadge']>(undefined);

  if (!isOpen) return null;

  const handleAiPriceSuggest = () => {
    if (category === 'Handyman & Assembly') {
      setBudgetSgd(75);
      setTimeEstimate('2.0 hrs');
    } else if (category === 'Pets & Plants') {
      setBudgetSgd(50);
      setTimeEstimate('1.5 hrs');
      setPartnerBadge('Grab Care');
    } else if (category === 'Errands & Delivery') {
      setBudgetSgd(45);
      setTimeEstimate('1.0 hr');
      setPartnerBadge('Carousell Verified');
    } else if (category === 'Queue & Events') {
      setBudgetSgd(40);
      setTimeEstimate('2.0 hrs');
    } else {
      setBudgetSgd(60);
      setTimeEstimate('2.0 hrs');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newChore: Chore = {
      id: `chore-${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim(),
      location: location.trim(),
      budgetSgd: Number(budgetSgd),
      timeEstimate,
      postedBy: 'You (Current User)',
      postedAt: 'Just now',
      status: 'open',
      bidsCount: 0,
      isUrgent,
      partnerBadge,
      requiredSkills: [category.split(' ')[0], 'ID Verified', 'Punctual'],
    };

    onAddChore(newChore);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Post a Chore to Rent Somebody
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Make your to-do list disappear. Broadcast to verified local helpers.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Zero Fee Notice */}
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Launch Free Trial: S$0 posting &amp; platform fees!</span>
            </span>
            <span className="font-mono font-bold">100% Escrow Safe</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Chore Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Assemble IKEA Kallax shelving unit and desk"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Handyman & Assembly">Handyman &amp; Assembly</option>
                <option value="Pets & Plants">Pets &amp; Plants (Grab Care)</option>
                <option value="Errands & Delivery">Errands &amp; Delivery (Carousell)</option>
                <option value="Home & Cleaning">Home &amp; Cleaning</option>
                <option value="Queue & Events">Queue &amp; Events</option>
                <option value="Tech & Digital">Tech &amp; Digital</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Location (Singapore)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tampines, Orchard, Bishan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Detailed Instructions
              </label>
              <button
                type="button"
                onClick={() =>
                  setDescription(
                    'Tools needed: cordless drill and screwdriver. Please bring own equipment. Lift access available directly to unit.'
                  )
                }
                className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Insert sample instructions
              </button>
            </div>
            <textarea
              required
              rows={3}
              placeholder="Explain what needs to be done, specific equipment required, and any parking or lift notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Budget (SGD)
                </label>
                <button
                  type="button"
                  onClick={handleAiPriceSuggest}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 hover:underline"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Estimate</span>
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400">S$</span>
                <input
                  type="number"
                  min="20"
                  max="1000"
                  required
                  value={budgetSgd}
                  onChange={(e) => setBudgetSgd(Number(e.target.value))}
                  className="w-full text-xs pl-8 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Time Estimate
              </label>
              <input
                type="text"
                placeholder="e.g. 1.5 hrs"
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Mark as Urgent (Need help within 2 hours)
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              Broadcast Chore Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
