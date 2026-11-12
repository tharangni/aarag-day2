export type UserRole = 'buyer' | 'seller';

export interface Chore {
  id: string;
  title: string;
  category: 'Home & Cleaning' | 'Handyman & Assembly' | 'Pets & Plants' | 'Errands & Delivery' | 'Queue & Events' | 'Tech & Digital';
  description: string;
  location: string;
  budgetSgd: number;
  timeEstimate: string;
  postedBy: string;
  postedAt: string;
  status: 'open' | 'assigned' | 'completed';
  bidsCount: number;
  partnerBadge?: 'Grab Care' | 'Carousell Verified';
  isUrgent?: boolean;
  requiredSkills: string[];
}

export interface HelperProfile {
  id: string;
  name: string;
  roleTitle: string;
  rating: number;
  reviewsCount: number;
  completedTasks: number;
  hourlyRateSgd: number;
  avatarUrl: string;
  bio: string;
  badges: string[];
  skills: string[];
  responseMinutes: number;
  onTimeRate: number; // percentage
  isProOnly?: boolean; // For paywalled leaderboard
  rank?: number;
  location: string;
  partnerAffiliation?: string;
}

export interface Bid {
  id: string;
  choreId: string;
  helperId: string;
  helperName: string;
  helperAvatar: string;
  amountSgd: number;
  proposal: string;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionType?: 'estimate_task' | 'open_leaderboard' | 'view_partner';
}

export interface BusinessMetric {
  title: string;
  value: string;
  subtext: string;
  category: 'Key Proposition' | 'Customer Relationship' | 'Cost Structure' | 'Revenue Stream';
}
