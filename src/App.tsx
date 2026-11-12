import React, { useState, useEffect } from 'react';
import { UserRole, Chore, HelperProfile } from './types';
import { INITIAL_CHORES, TOP_HELPERS } from './data/mockData';
import { Header } from './components/Header';
import { TrialBanner } from './components/TrialBanner';
import { HeroSection } from './components/HeroSection';
import { BuyerWorkspace } from './components/BuyerWorkspace';
import { SellerWorkspace } from './components/SellerWorkspace';
import { LeaderboardSection } from './components/LeaderboardSection';
import { PartnerShowcase } from './components/PartnerShowcase';
import { RoadshowEnactment } from './components/RoadshowEnactment';
import { LiveAgentDrawer } from './components/LiveAgentDrawer';
import { PostChoreModal } from './components/PostChoreModal';
import { BusinessPlanModal } from './components/BusinessPlanModal';
import { ChoreDetailModal } from './components/ChoreDetailModal';
import { HelperBookingModal } from './components/HelperBookingModal';
import { ApplyGigModal } from './components/ApplyGigModal';
import { Footer } from './components/Footer';
import { Bot, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');
  const [activeNavTab, setActiveNavTab] = useState<string>('feed');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isProSubscriber, setIsProSubscriber] = useState<boolean>(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Chores');

  // Chores and Helpers Data
  const [chores, setChores] = useState<Chore[]>(INITIAL_CHORES);
  const [helpers] = useState<HelperProfile[]>(TOP_HELPERS);

  // Modals & Drawers
  const [isPostChoreOpen, setIsPostChoreOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isBusinessModelOpen, setIsBusinessModelOpen] = useState(false);
  const [selectedChoreForDetail, setSelectedChoreForDetail] = useState<Chore | null>(null);
  const [selectedHelperForBooking, setSelectedHelperForBooking] = useState<HelperProfile | null>(null);
  const [selectedChoreForApply, setSelectedChoreForApply] = useState<Chore | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync dark mode class on HTML element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleRoleToggle = () => {
    const next = currentRole === 'buyer' ? 'seller' : 'buyer';
    setCurrentRole(next);
    showToast(`Switched to ${next === 'buyer' ? 'Buyer Mode (Delegate Chores)' : 'Seller Mode (Earn Money)'}`);
  };

  const handleAddChore = (newChore: Chore) => {
    setChores((prev) => [newChore, ...prev]);
    showToast(`"${newChore.title}" posted successfully! Helpers will offer bids shortly.`);
  };

  const handleAcceptBid = (choreId: string, helperName: string) => {
    setChores((prev) =>
      prev.map((c) => (c.id === choreId ? { ...c, status: 'assigned' } : c))
    );
    showToast(`Chore assigned to ${helperName}. Escrow hold active at 0% fee.`);
  };

  const handleSubmitBid = (choreId: string, amount: number) => {
    setChores((prev) =>
      prev.map((c) =>
        c.id === choreId ? { ...c, bidsCount: c.bidsCount + 1 } : c
      )
    );
    showToast(`Your offer of S$${amount} was submitted to the client!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors w-full max-w-full overflow-x-hidden">
      {/* Toast Bar */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-xl border border-slate-700 dark:border-slate-300 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 0% Commission Launch Trial Banner */}
      <TrialBanner onLearnMore={() => setIsBusinessModelOpen(true)} />

      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleToggle={handleRoleToggle}
        onPostChoreClick={() => setIsPostChoreOpen(true)}
        onOpenAdvisorClick={() => setIsAdvisorOpen(true)}
        onOpenBusinessModelClick={() => setIsBusinessModelOpen(true)}
        activeNavTab={activeNavTab}
        setActiveNavTab={setActiveNavTab}
        isDark={isDark}
        setIsDark={setIsDark}
        isProSubscriber={isProSubscriber}
      />

      {/* Hero Section */}
      <HeroSection
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onPostChoreClick={() => setIsPostChoreOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Content Area Based on Active Nav Tab */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 pb-24 md:pb-10">
        {activeNavTab === 'feed' && (
          currentRole === 'buyer' ? (
            <BuyerWorkspace
              chores={chores}
              helpers={helpers}
              onPostChoreClick={() => setIsPostChoreOpen(true)}
              onSelectHelper={(helper) => setSelectedHelperForBooking(helper)}
              onViewChoreDetails={(chore) => setSelectedChoreForDetail(chore)}
              onQuickHirePartner={(partner) => {
                if (partner === 'Grab Care') setSelectedCategory('Pets & Plants');
                else setSelectedCategory('Errands & Delivery');
              }}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          ) : (
            <SellerWorkspace
              chores={chores}
              onApplyChore={(chore) => setSelectedChoreForApply(chore)}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          )
        )}

        {activeNavTab === 'leaderboard' && (
          <LeaderboardSection
            helpers={helpers}
            isProSubscriber={isProSubscriber}
            setIsProSubscriber={(val) => {
              setIsProSubscriber(val);
              showToast(val ? 'Rent Somebody Pro unlocked!' : 'Reverted to Free Tier preview');
            }}
            onBookHelper={(helper) => setSelectedHelperForBooking(helper)}
          />
        )}

        {activeNavTab === 'partners' && (
          <PartnerShowcase
            onBookGrabCare={() => {
              setSelectedCategory('Pets & Plants');
              setActiveNavTab('feed');
              showToast('Showing Grab Care pet & plant chores in Singapore');
            }}
            onBookCarousellCourier={() => {
              setSelectedCategory('Errands & Delivery');
              setActiveNavTab('feed');
              showToast('Showing Carousell pickup & errand tasks in Singapore');
            }}
          />
        )}

        {activeNavTab === 'roadshow' && <RoadshowEnactment />}
      </main>

      {/* Floating 24/7 AI Guidance Agent Button */}
      <button
        onClick={() => setIsAdvisorOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-3 sm:p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
        title="24/7 AI Guidance Agent & Support"
        aria-label="24/7 AI Guidance Agent & Support"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline-block text-xs font-semibold pr-1">
          24/7 AI Advisor
        </span>
      </button>

      {/* Mobile Bottom Navigation Bar (Phone Screen Convenience) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-2 flex items-center justify-around text-[10px] font-medium transition-colors">
        <button
          onClick={() => setActiveNavTab('feed')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
            activeNavTab === 'feed'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span className="w-4 h-4 flex items-center justify-center font-bold">●</span>
          <span>{currentRole === 'buyer' ? 'Chores' : 'Gigs'}</span>
        </button>

        <button
          onClick={() => setActiveNavTab('leaderboard')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
            activeNavTab === 'leaderboard'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span className="w-4 h-4 flex items-center justify-center font-bold">★</span>
          <span>VIP Ranks</span>
        </button>

        <button
          onClick={() => setActiveNavTab('partners')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
            activeNavTab === 'partners'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span className="w-4 h-4 flex items-center justify-center font-bold">✦</span>
          <span>Partners</span>
        </button>

        <button
          onClick={() => setActiveNavTab('roadshow')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
            activeNavTab === 'roadshow'
              ? 'text-emerald-600 dark:text-emerald-400 font-bold'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span className="w-4 h-4 flex items-center justify-center font-bold">▶</span>
          <span>Roadshow</span>
        </button>

        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="flex flex-col items-center gap-1 p-1.5 rounded-lg text-emerald-600 dark:text-emerald-400 font-semibold"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Assist</span>
        </button>
      </nav>

      {/* Footer */}
      <Footer
        onOpenBusinessModel={() => setIsBusinessModelOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onSwitchRole={handleRoleToggle}
        currentRole={currentRole}
      />

      {/* Modals & Drawers */}
      <PostChoreModal
        isOpen={isPostChoreOpen}
        onClose={() => setIsPostChoreOpen(false)}
        onAddChore={handleAddChore}
      />

      <LiveAgentDrawer
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      <BusinessPlanModal
        isOpen={isBusinessModelOpen}
        onClose={() => setIsBusinessModelOpen(false)}
      />

      <ChoreDetailModal
        chore={selectedChoreForDetail}
        onClose={() => setSelectedChoreForDetail(null)}
        onAcceptBid={handleAcceptBid}
      />

      <HelperBookingModal
        helper={selectedHelperForBooking}
        onClose={() => setSelectedHelperForBooking(null)}
      />

      <ApplyGigModal
        chore={selectedChoreForApply}
        onClose={() => setSelectedChoreForApply(null)}
        onSubmitBid={handleSubmitBid}
      />
    </div>
  );
}
