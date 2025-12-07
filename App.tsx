import React, { useState, useEffect } from 'react';
import { 
  Search, BarChart3, TrendingUp, Zap, FileText, Download, 
  Loader2, Globe, AlertTriangle, CheckCircle2, Bot 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { Competitor, MarketTrend, ReviewSample } from './types';
import { MOCK_COMPETITORS, MOCK_TRENDS, MOCK_REVIEWS } from './mockData';
import { generateWeeklyReport, analyzeSentimentInsights } from './services/geminiService';
import CompetitorTable from './components/CompetitorTable';
import { PricingTrendChart, MarketVolumeChart } from './components/Charts';

function App() {
  // State
  const [keyword, setKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [viewState, setViewState] = useState<'initial' | 'dashboard'>('initial');
  const [activeTab, setActiveTab] = useState<'overview' | 'report'>('overview');
  
  // Data State
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [trends, setTrends] = useState<MarketTrend[]>([]);
  const [reviews, setReviews] = useState<ReviewSample[]>([]);
  
  // Intelligence State
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState<string | null>(null);
  const [insights, setInsights] = useState<{ strengths: string[], weaknesses: string[] } | null>(null);

  // FR-001: Competitor Discovery (Simulated)
  const handleSearch = () => {
    if (!keyword.trim()) return;
    
    setIsSearching(true);
    
    // Simulate "Scraping" delay for effect (SRS 15.2 "WOW moments")
    setTimeout(() => {
      setCompetitors(MOCK_COMPETITORS);
      setTrends(MOCK_TRENDS);
      setReviews(MOCK_REVIEWS);
      setIsSearching(false);
      setViewState('dashboard');
    }, 2000);
  };

  // FR-007: Generate Report Handler
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setActiveTab('report');
    
    try {
      // Parallel execution for speed
      const [reportText, sentimentInsights] = await Promise.all([
        generateWeeklyReport(competitors, trends, reviews),
        analyzeSentimentInsights(reviews)
      ]);
      
      setWeeklyReport(reportText);
      setInsights(sentimentInsights);
    } catch (e) {
      console.error(e);
      setWeeklyReport("Failed to generate report. Please check API settings.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Bot size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">MRX</h1>
              <p className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Market Research Expert</p>
            </div>
          </div>
          
          {viewState === 'dashboard' && (
            <div className="flex items-center gap-4">
               <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                 <CheckCircle2 size={12} /> System Online
               </span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW: Initial Search / Discovery */}
        {viewState === 'initial' && (
          <div className="max-w-2xl mx-auto text-center mt-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-6">
              Automate your <span className="text-indigo-600">Competitor Intelligence</span>.
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Enter a product category or keyword. MRX will scrape competitor data, track pricing, 
              analyze sentiment, and generate actionable insights in seconds.
            </p>
            
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-300 rounded-xl text-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="e.g. 'Wireless Earbuds' or 'Solar Inverters'"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={isSearching || !keyword}
                className="absolute right-2 top-2 bottom-2 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                {isSearching ? <Loader2 className="animate-spin h-5 w-5" /> : 'Start Analysis'}
              </button>
            </div>
            
            <div className="mt-8 flex justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2"><Globe size={16} /> Web Scraping</div>
              <div className="flex items-center gap-2"><Zap size={16} /> Real-time Pricing</div>
              <div className="flex items-center gap-2"><Bot size={16} /> Gemini AI Insights</div>
            </div>
          </div>
        )}

        {/* VIEW: Dashboard */}
        {viewState === 'dashboard' && (
          <div className="space-y-6">
            
            {/* Header / Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Market Overview: "{keyword}"</h2>
                <p className="text-sm text-slate-500">Live data tracking • 3 Competitors Detected • Last updated just now</p>
              </div>
              
              <div className="flex gap-2">
                 <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setActiveTab('overview')}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'overview' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => activeTab === 'report' ? null : handleGenerateReport()}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${activeTab === 'report' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      <FileText size={16} /> Weekly Report
                    </button>
                 </div>
              </div>
            </div>

            {/* TAB: Overview Dashboard */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                
                {/* 1. Competitor Table (Full Width) */}
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Globe className="text-indigo-500" size={20} /> Competitor Landscape
                  </h3>
                  <CompetitorTable competitors={competitors} />
                </div>

                {/* 2. Charts Row */}
                <div className="lg:col-span-2">
                   <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="text-indigo-500" size={20} /> Pricing Analysis
                  </h3>
                  <PricingTrendChart competitors={competitors} />
                </div>
                
                <div className="lg:col-span-1">
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <BarChart3 className="text-indigo-500" size={20} /> Market Trends
                  </h3>
                  <MarketVolumeChart trends={trends} />
                </div>

                {/* 3. Alerts & Quick Insights */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recent Changes Alert */}
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="text-amber-900 font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle size={20} /> Detected Changes (Last 24h)
                    </h3>
                    <ul className="space-y-2">
                      {competitors.flatMap(c => c.recentChanges || []).map((change, idx) => (
                        <li key={idx} className="text-sm text-amber-800 flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                   {/* AI Snippet Preview */}
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <Bot size={100} />
                    </div>
                    <h3 className="text-indigo-900 font-semibold mb-2 flex items-center gap-2">
                      <Zap size={20} /> AI Insight Preview
                    </h3>
                    <p className="text-sm text-indigo-800 mb-4">
                      Gemini has analyzed {reviews.length} recent reviews. 
                      Click "Weekly Report" to see full strategic recommendations.
                    </p>
                    <button 
                      onClick={handleGenerateReport}
                      className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Generate Full Analysis
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: Weekly Report (Gemini Powered) */}
            {activeTab === 'report' && (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 min-h-[600px] animate-in slide-in-from-bottom-4 duration-500">
                {isGeneratingReport ? (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
                    <h3 className="text-xl font-medium text-slate-800">MRX AI is compiling your report...</h3>
                    <p className="text-slate-500 mt-2">Analyzing pricing, feature sets, and customer sentiment.</p>
                  </div>
                ) : (
                  <div className="p-8 max-w-4xl mx-auto">
                    <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                       <div>
                         <h1 className="text-3xl font-bold text-slate-900">Weekly Intelligence Report</h1>
                         <p className="text-slate-500 mt-1">Generated by Gemini Pro • {new Date().toLocaleDateString()}</p>
                       </div>
                       <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm">
                         <Download size={16} /> Export PDF
                       </button>
                    </div>

                    {/* AI Insights (Structured JSON output) */}
                    {insights && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <h4 className="font-bold text-green-800 mb-2 text-sm uppercase">Market Strengths</h4>
                          <ul className="list-disc list-inside text-sm text-green-700 space-y-1">
                            {insights.strengths.map((s, i) => <li key={i}>{s}</li>)}
                          </ul>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                          <h4 className="font-bold text-red-800 mb-2 text-sm uppercase">Market Pain Points</h4>
                          <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                            {insights.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Main Markdown Report */}
                    <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-indigo-900 prose-a:text-indigo-600">
                      <ReactMarkdown>{weeklyReport || ''}</ReactMarkdown>
                    </div>

                  </div>
                )}
              </div>
            )}
            
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
