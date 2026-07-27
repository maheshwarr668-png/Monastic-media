import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { Client, Campaign, CampaignDailyMetric } from '../types/agency';
import { generateTimeseriesMetrics } from '../services/mockData';

interface ClientAnalyticsViewProps {
  client: Client;
  campaigns: Campaign[];
}

export const ClientAnalyticsView: React.FC<ClientAnalyticsViewProps> = ({ client }) => {
  const [metricType, setMetricType] = useState<'roas' | 'spend' | 'conversions' | 'ctr'>('roas');
  const metricsData = generateTimeseriesMetrics(client.id, 30);

  // Group metrics by Date across all campaigns
  const dateMap: Record<string, { date: string; spend: number; conversions: number; conversionValue: number; roas: number; ctr: number }> = {};

  metricsData.forEach((m) => {
    if (!dateMap[m.date]) {
      dateMap[m.date] = { date: m.date.slice(5), spend: 0, conversions: 0, conversionValue: 0, roas: 0, ctr: 0 };
    }
    dateMap[m.date].spend += m.spend;
    dateMap[m.date].conversions += m.conversions;
    dateMap[m.date].conversionValue += m.conversion_value;
  });

  const chartData = Object.values(dateMap).map((d) => ({
    ...d,
    spend: Number(d.spend.toFixed(2)),
    roas: d.spend > 0 ? Number((d.conversionValue / d.spend).toFixed(2)) : 0
  }));

  return (
    <div className="space-y-6">
      {/* Chart Selector Controls */}
      <div className="glass-card p-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-300">
          30-Day Multi-Channel Performance Analytics ({client.name})
        </span>

        <div className="flex items-center gap-1 bg-zinc-900 p-1 border border-zinc-800 rounded-md text-xs font-mono-num">
          <button
            onClick={() => setMetricType('roas')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              metricType === 'roas' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            ROAS
          </button>
          <button
            onClick={() => setMetricType('spend')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              metricType === 'spend' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Spend ($)
          </button>
          <button
            onClick={() => setMetricType('conversions')}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              metricType === 'conversions' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Conversions
          </button>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white capitalize">
              Daily {metricType.toUpperCase()} Timeseries
            </h3>
            <p className="text-xs text-zinc-400">Aggregated real-time metrics across connected channels</p>
          </div>
          {metricType === 'roas' && (
            <span className="text-xs text-emerald-400 font-mono-num font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
              Target: {client.target_roas}x
            </span>
          )}
        </div>

        <div className="w-full h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
              <YAxis stroke="#71717a" fontSize={11} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '6px', fontSize: '12px' }}
                itemStyle={{ color: '#fafafa' }}
              />
              <Area 
                type="monotone" 
                dataKey={metricType} 
                stroke="#6366f1" 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorMetric)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
