import React from 'react';
import { IntegrationStatus, CampaignStatus } from '../../types/agency';

interface BadgeProps {
  status: IntegrationStatus | CampaignStatus | 'active' | 'warning' | 'info';
  label?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ status, label, size = 'sm' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'connected':
      case 'ACTIVE':
      case 'active':
        return {
          bg: 'bg-emerald-950/60',
          text: 'text-emerald-300',
          border: 'border-emerald-800/60',
          dot: 'bg-emerald-400 animate-pulse',
          displayText: label || (status === 'connected' ? 'Connected' : 'Active')
        };
      case 'syncing':
        return {
          bg: 'bg-indigo-950/60',
          text: 'text-indigo-300',
          border: 'border-indigo-800/60',
          dot: 'bg-indigo-400 animate-spin',
          displayText: label || 'Syncing'
        };
      case 'expired':
      case 'warning':
        return {
          bg: 'bg-amber-950/60',
          text: 'text-amber-300',
          border: 'border-amber-800/60',
          dot: 'bg-amber-400',
          displayText: label || 'Expired'
        };
      case 'error':
        return {
          bg: 'bg-rose-950/60',
          text: 'text-rose-300',
          border: 'border-rose-800/60',
          dot: 'bg-rose-500',
          displayText: label || 'Error'
        };
      case 'PAUSED':
      case 'disconnected':
      default:
        return {
          bg: 'bg-zinc-900',
          text: 'text-zinc-400',
          border: 'border-zinc-800',
          dot: 'bg-zinc-500',
          displayText: label || (status === 'PAUSED' ? 'Paused' : 'Disconnected')
        };
    }
  };

  const config = getBadgeConfig();
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.displayText}</span>
    </span>
  );
};
