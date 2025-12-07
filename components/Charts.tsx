import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend
} from 'recharts';
import { Competitor, MarketTrend } from '../types';

interface PriceHistoryProps {
  competitors: Competitor[];
}

export const PricingTrendChart: React.FC<PriceHistoryProps> = ({ competitors }) => {
  // Transform data for Recharts: array of objects with date and keys for each competitor
  // Assuming all have same date points for this demo
  const data = competitors[0].priceHistory.map((point, index) => {
    const entry: any = { date: point.date };
    competitors.forEach(comp => {
      entry[comp.name] = comp.priceHistory[index].price;
    });
    return entry;
  });

  const colors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
      <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Pricing History (90 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{fontSize: 12}} stroke="#94a3b8" />
          <YAxis tick={{fontSize: 12}} stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {competitors.map((comp, idx) => (
            <Line 
              key={comp.id}
              type="monotone" 
              dataKey={comp.name} 
              stroke={colors[idx % colors.length]} 
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface TrendChartProps {
  trends: MarketTrend[];
}

export const MarketVolumeChart: React.FC<TrendChartProps> = ({ trends }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
      <h3 className="text-sm font-semibold text-slate-500 uppercase mb-4">Keyword Search Volume & Growth</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={trends} layout="vertical">
           <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
           <XAxis type="number" hide />
           <YAxis dataKey="keyword" type="category" width={120} tick={{fontSize: 12}} stroke="#64748b" />
           <Tooltip cursor={{fill: 'transparent'}} />
           <Bar dataKey="volume" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} name="Search Volume" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
