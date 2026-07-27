import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import { Client } from '../../types/agency';
import { Button } from '../ui/Button';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateClient: (clientData: Partial<Client>) => void;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onCreateClient
}) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetRoas, setTargetRoas] = useState('3.5');
  const [monthlyBudget, setMonthlyBudget] = useState('25000');
  const [website, setWebsite] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !industry) return;

    onCreateClient({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      industry,
      website,
      target_roas: parseFloat(targetRoas),
      monthly_budget: parseFloat(monthlyBudget),
      currency: 'USD',
      logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
      total_spend_30d: 0,
      total_conversions_30d: 0,
      avg_roas_30d: parseFloat(targetRoas),
      active_campaigns_count: 0,
      connected_platforms_count: 0
    });

    setName('');
    setIndustry('');
    setWebsite('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg glass-panel bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-semibold text-white">Onboard New Client Workspace</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Client Business Name</label>
            <input
              type="text"
              placeholder="e.g. Zenith Apparel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Industry Sector</label>
              <input
                type="text"
                placeholder="e.g. E-Commerce & Retail"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Website URL</label>
              <input
                type="text"
                placeholder="https://client.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Target ROAS (Multiplier)</label>
              <input
                type="number"
                step="0.1"
                value={targetRoas}
                onChange={(e) => setTargetRoas(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Monthly Budget ($)</label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Create Client Workspace
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
