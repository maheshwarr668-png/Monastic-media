import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SparklinePoint {
  date: string;
  value: number;
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number; // e.g. +14.2%
  changeLabel?: string;
  targetValue?: string | number;
  sparklineData?: SparklinePoint[];
  accentColor?: 'emerald' | 'indigo' | 'amber' | 'rose';
  isAlert?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  changeLabel = 'vs last 30d',
  targetValue,
  sparklineData,
  accentColor = 'emerald',
  isAlert = false
}) => {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  const colorMap = {
    emerald: '#10b981',
    indigo: '#6366f1',
    amber: '#f59e0b',
    rose: '#f43f5e'
  };

  const strokeColor = colorMap[accentColor];

  return (
    <div className={`glass-card p-4 flex flex-col justify-between relative overflow-hidden ${isAlert ? 'border-amber-500/40 bg-amber-950/10' : ''}`}>
      {/* Top Title & Subtitle */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">{title}</span>
          {targetValue && (
            <span className="text-[11px] text-zinc-500 font-mono-num">
              Target: <span className="text-zinc-300 font-semibold">{targetValue}</span>
            </span>
          )}
        </div>

        {/* Main Metric Value */}
        <div className="mt-2 flex items-baseline justify-between">
          <div className="text-2xl font-bold tracking-tight text-white font-mono-num">
            {value}
          </div>
          {change !== undefined && (
            <div className={`inline-flex items-center text-xs font-semibold font-mono-num ${
              isPositive ? 'text-emerald-400' : isNegative ? 'text-rose-400' : 'text-zinc-400'
            }`}>
              {isPositive && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
              {isNegative && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {!isPositive && !isNegative && <Minus className="w-3.5 h-3.5 mr-0.5" />}
              <span>{change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`}</span>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle / Context + Sparkline */}
      <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs text-zinc-500">{subtitle || changeLabel}</span>
        
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-24 h-7 shrink-0 opacity-80 hover:opacity-100 transition-opacity">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
                <defs>
                  <linearGradient id={`sparkGrad-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={strokeColor} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={strokeColor} 
                  strokeWidth={1.5} 
                  fill={`url(#sparkGrad-${title.replace(/\s+/g, '')})`} 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
