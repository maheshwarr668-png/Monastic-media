import React, { useState } from 'react';
import { Settings, Save, Trash2 } from 'lucide-react';
import { Client } from '../types/agency';
import { Button } from '../components/ui/Button';

interface ClientSettingsViewProps {
  client: Client;
  onUpdateClient: (updatedClient: Partial<Client>) => void;
}

export const ClientSettingsView: React.FC<ClientSettingsViewProps> = ({ client, onUpdateClient }) => {
  const [name, setName] = useState(client.name);
  const [industry, setIndustry] = useState(client.industry);
  const [targetRoas, setTargetRoas] = useState(client.target_roas.toString());
  const [monthlyBudget, setMonthlyBudget] = useState(client.monthly_budget.toString());
  const [currency, setCurrency] = useState(client.currency);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateClient({
      name,
      industry,
      target_roas: parseFloat(targetRoas),
      monthly_budget: parseFloat(monthlyBudget),
      currency
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="glass-card p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Client Workspace Settings</h2>
            <p className="text-xs text-zinc-400">Configure target metrics, monthly budget, and workspace details for {client.name}</p>
          </div>
          {saved && <span className="text-xs text-emerald-400 font-mono-num">✓ Settings Saved</span>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Client Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Industry Sector</label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Target ROAS (x multiplier)</label>
              <input
                type="number"
                step="0.1"
                value={targetRoas}
                onChange={(e) => setTargetRoas(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Monthly Managed Budget ($)</label>
              <input
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white font-mono-num focus:outline-none focus:border-zinc-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-zinc-600"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD ($)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex justify-end">
            <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
              Save Workspace Changes
            </Button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 space-y-3 border-rose-900/40 bg-rose-950/10">
        <h3 className="text-xs font-semibold text-rose-200 uppercase tracking-wider">Danger Zone</h3>
        <p className="text-xs text-zinc-400">Soft delete this client workspace and archive all associated campaign history</p>
        <Button variant="danger" size="sm" icon={<Trash2 className="w-3.5 h-3.5" />}>
          Archive Client Workspace
        </Button>
      </div>
    </div>
  );
};
