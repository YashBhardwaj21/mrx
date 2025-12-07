import { Competitor, MarketTrend, ReviewSample } from './types';

// Synthetic data as per SRS "Risk Mitigation" - "Preloaded dataset for stable demo"

export const MOCK_COMPETITORS: Competitor[] = [
  {
    id: 'c1',
    name: 'TechFlow Pro',
    url: 'https://techflow.example.com',
    price: 1299,
    currency: '$',
    lastUpdated: '2025-12-05',
    features: ['AI Noise Cancel', '30h Battery', 'Multi-point Connect'],
    rating: 4.5,
    reviewCount: 1240,
    sentimentScore: 0.8,
    priceHistory: [
      { date: '2025-10-01', price: 1299 },
      { date: '2025-11-01', price: 1249 },
      { date: '2025-12-01', price: 1299 },
    ],
    recentChanges: ['Added Bluetooth 5.4 support', 'New Midnight Blue color'],
  },
  {
    id: 'c2',
    name: 'SoundWave X',
    url: 'https://soundwave.example.com',
    price: 999,
    currency: '$',
    lastUpdated: '2025-12-06',
    features: ['Bass Boost', '24h Battery', 'Water Resistant'],
    rating: 4.2,
    reviewCount: 850,
    sentimentScore: 0.4,
    priceHistory: [
      { date: '2025-10-01', price: 1100 },
      { date: '2025-11-01', price: 999 },
      { date: '2025-12-01', price: 999 },
    ],
    recentChanges: ['Price drop detected'],
  },
  {
    id: 'c3',
    name: 'AudioPure Z1',
    url: 'https://audiopure.example.com',
    price: 1450,
    currency: '$',
    lastUpdated: '2025-12-06',
    features: ['Lossless Audio', '40h Battery', 'Titanium Build'],
    rating: 4.8,
    reviewCount: 320,
    sentimentScore: 0.9,
    priceHistory: [
      { date: '2025-10-01', price: 1450 },
      { date: '2025-11-01', price: 1450 },
      { date: '2025-12-01', price: 1450 },
    ],
  },
];

export const MOCK_TRENDS: MarketTrend[] = [
  { keyword: 'spatial audio', volume: 45000, growth: 22, status: 'rising' },
  { keyword: 'wired headphones', volume: 12000, growth: -5, status: 'declining' },
  { keyword: 'multipoint connection', volume: 28000, growth: 15, status: 'rising' },
];

export const MOCK_REVIEWS: ReviewSample[] = [
  { source: 'Amazon', text: "The battery life is amazing, but the case feels cheap.", sentiment: 'neutral' },
  { source: 'Twitter', text: "TechFlow's new update completely fixed the connectivity issues!", sentiment: 'positive' },
  { source: 'TechRadar', text: "SoundWave X is good value, but lacks the clarity of high-end models.", sentiment: 'neutral' },
  { source: 'Reddit', text: "Avoid the Z1 if you have small ears, they are huge.", sentiment: 'negative' },
];
