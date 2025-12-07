// Data Models based on SRS Section 7 & 10

export interface Competitor {
  id: string;
  name: string;
  url: string;
  price: number;
  currency: string;
  lastUpdated: string;
  features: string[];
  rating: number; // 0-5
  reviewCount: number;
  sentimentScore: number; // -1 to 1
  priceHistory: { date: string; price: number }[];
  recentChanges?: string[]; // For Feature Change Detection (FR-005)
}

export interface MarketTrend {
  keyword: string;
  volume: number;
  growth: number; // percentage
  status: 'rising' | 'declining' | 'stable';
}

export interface ReviewSample {
  source: string;
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface WeeklyReportData {
  marketOverview: string;
  competitorChanges: string;
  pricingStrategy: string;
  sentimentSummary: string;
  recommendations: string;
}
