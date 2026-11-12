import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Sparkles, Send, X, Bot, User, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface LiveAgentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyChoreTemplate?: (title: string, category: any, budget: number) => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    text: "Hello! I'm your 24/7 Rent Somebody AI Guidance Agent. Similar to Shopify's smart advisor, I can help you scope a chore, estimate fair Singapore market rates, or guide you on earning money as a verified helper. How can I assist you today?",
    timestamp: 'Just now',
    suggestions: [
      'How does the 0% free trial work?',
      'Estimate pricing for IKEA bed assembly',
      'Tell me about Grab Care for pets',
      'How to qualify for the VIP Leaderboard?',
    ],
  },
];

export const LiveAgentDrawer: React.FC<LiveAgentDrawerProps> = ({
  isOpen,
  onClose,
  onApplyChoreTemplate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      let suggestions: string[] = [];

      const lower = text.toLowerCase();
      if (lower.includes('trial') || lower.includes('commission') || lower.includes('free')) {
        reply =
          'Our Launch Free Trial gives every buyer and seller 14 days of 0% platform commission! Normally, platform commission is 8-12%, but right now 100% of the funds go straight to the seller, and buyers pay zero booking surcharges.';
        suggestions = ['How do payments work in escrow?', 'Post a chore with 0% fee'];
      } else if (lower.includes('ikea') || lower.includes('assembly') || lower.includes('handyman')) {
        reply =
          'For IKEA furniture assembly in Singapore, standard market rates are:\n• Bed frame or dining table: S$65 - S$85\n• 3-door wardrobe: S$85 - S$120\n• Small study desk / chair: S$35 - S$50\nWould you like me to pre-fill a chore listing for you?';
        suggestions = ['Yes, prefill IKEA assembly chore', 'How to find top rated handymen?'];
      } else if (lower.includes('grab care') || lower.includes('pet') || lower.includes('plant')) {
        reply =
          'Grab Care is our official strategic partner! Through Grab Care, you can hire certified caretakers trained in pet first aid and houseplant hydration. Every booking comes with complimentary S$50,000 veterinary & property protection!';
        suggestions = ['Order a Grab Care caretaker', 'How to become Grab Care certified?'];
      } else if (lower.includes('leaderboard') || lower.includes('vip') || lower.includes('pro')) {
        reply =
          'The VIP Leaderboard is our paywalled tier (S$14.90/month). It curates the top 5% verified service providers in Singapore with 100% on-time records and police background checks. Subscribers enjoy instant 1-click VIP dispatch without waiting for open bidding!';
        suggestions = ['Unlock Pro Leaderboard', 'How do sellers rank on the Leaderboard?'];
      } else if (lower.includes('earn') || lower.includes('seller') || lower.includes('work')) {
        reply =
          'As a Rent Somebody seller, you can earn S$400 - S$1,800/month doing chores in your spare time. You set your own schedule and retain 100% of your earnings during our free trial. We recommend getting ID-verified and replying in under 5 minutes to win more gigs!';
        suggestions = ['View available gigs in Singapore', 'What chores pay the most?'];
      } else {
        reply =
          "Thanks for reaching out! Rent Somebody connects busy people who need to get chores done with reliable neighbors who want to earn money. You can post a task in 30 seconds or browse active gigs across Singapore.";
        suggestions = [
          'How does the 0% free trial work?',
          'Estimate pricing for IKEA bed assembly',
          'Tell me about Grab Care for pets',
        ];
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: reply,
        timestamp: 'Just now',
        suggestions,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 transition-colors">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>24/7 AI Guidance Agent</span>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                  Online
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Shopify-style guidance &amp; 24hr customer support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>

              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="text-[11px] bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full transition-colors cursor-pointer text-left"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-500" />
              <span>Agent is typing guidance...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (fees, IKEA rates, Grab Care)..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
            <span>Powered by Rent Somebody 24hr Guidance Engine</span>
            <span>Avg response &lt; 1s</span>
          </div>
        </div>
      </div>
    </div>
  );
};
