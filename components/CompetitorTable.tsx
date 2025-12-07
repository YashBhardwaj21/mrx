import React from 'react';
import { Competitor } from '../types';
import { ExternalLink, ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface Props {
  competitors: Competitor[];
}

const CompetitorTable: React.FC<Props> = ({ competitors }) => {
  const getChangeIcon = (comp: Competitor) => {
    // Simplified logic for demo visuals
    if (comp.name.includes('SoundWave')) return <ArrowDown className="w-4 h-4 text-green-500" />;
    if (comp.name.includes('TechFlow')) return <ArrowUp className="w-4 h-4 text-red-500" />; // Price went up is bad/notable
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-sm text-left text-slate-600">
        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 font-semibold">Competitor</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Sentiment</th>
            <th className="px-6 py-4 font-semibold">Latest Update</th>
            <th className="px-6 py-4 font-semibold">Changes Detected</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp) => (
            <tr key={comp.id} className="hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-100">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {comp.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{comp.name}</div>
                    <a href={comp.url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                      Visit Site <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">{comp.currency}{comp.price}</span>
                  {getChangeIcon(comp)}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-200 rounded-full h-2 max-w-[60px]">
                    <div 
                      className={`h-2 rounded-full ${comp.sentimentScore > 0.6 ? 'bg-green-500' : comp.sentimentScore > 0.4 ? 'bg-yellow-400' : 'bg-red-500'}`} 
                      style={{ width: `${comp.sentimentScore * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium">{(comp.sentimentScore * 100).toFixed(0)}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-500">
                {comp.lastUpdated}
              </td>
              <td className="px-6 py-4">
                 {comp.recentChanges && comp.recentChanges.length > 0 ? (
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                     {comp.recentChanges.length} New Updates
                   </span>
                 ) : (
                   <span className="text-xs text-slate-400">No changes</span>
                 )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitorTable;
