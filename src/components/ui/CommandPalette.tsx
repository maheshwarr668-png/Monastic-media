import React, { useState, useEffect } from 'react';
import { Search, Building2, Megaphone, Zap, FileText, ArrowRight, X } from 'lucide-react';
import { Client, Campaign, ActiveView } from '../../types/agency';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  clients: Client[];
  campaigns: Campaign[];
  onSelectClient: (clientId: string, view?: ActiveView) => void;
  onSelectAgencyView: (view: ActiveView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  clients,
  campaigns,
  onSelectClient,
  onSelectAgencyView
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.industry.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCampaigns = campaigns.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.channel.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl glass-panel bg-zinc-900/95 border border-zinc-700/80 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Bar Input */}
        <div className="flex items-center px-4 py-3 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-base font-normal"
            placeholder="Type a command or search clients, campaigns, integrations..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3">
          {/* Agency Navigation Actions */}
          <div>
            <span className="px-3 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
              Quick Views
            </span>
            <div className="mt-1 space-y-0.5">
              <button
                onClick={() => { onSelectAgencyView('agency_dashboard'); onClose(); }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-md group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
                  <span>Agency Command Center</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300" />
              </button>
              <button
                onClick={() => { onSelectAgencyView('agency_clients'); onClose(); }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-md group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
                  <span>All Clients Directory</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300" />
              </button>
              <button
                onClick={() => { onSelectAgencyView('agency_reports'); onClose(); }}
                className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-md group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200" />
                  <span>Executive Cross-Client Reports</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300" />
              </button>
            </div>
          </div>

          {/* Client Workspaces */}
          {filteredClients.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Clients ({filteredClients.length})
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => { onSelectClient(client.id, 'client_overview'); onClose(); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-md group text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <img src={client.logo_url} alt="" className="w-5 h-5 rounded object-cover" />
                      <div>
                        <span className="font-medium">{client.name}</span>
                        <span className="ml-2 text-xs text-zinc-500 font-mono-num">{client.industry}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono-num text-zinc-400">
                      <span>ROAS: <strong className="text-emerald-400">{client.avg_roas_30d}x</strong></span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Campaigns */}
          {filteredCampaigns.length > 0 && (
            <div>
              <span className="px-3 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                Campaigns ({filteredCampaigns.length})
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredCampaigns.slice(0, 5).map((campaign) => (
                  <button
                    key={campaign.id}
                    onClick={() => { onSelectClient(campaign.client_id, 'client_campaigns'); onClose(); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60 rounded-md group text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Megaphone className="w-4 h-4 text-indigo-400 shrink-0" />
                      <span className="truncate">{campaign.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 shrink-0 font-mono-num">
                      <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">{campaign.channel}</span>
                      <span>${campaign.spend_30d?.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/60 flex items-center justify-between text-xs text-zinc-500 font-mono-num">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-300">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-300">ESC</kbd> Close</span>
          </div>
          <span>AgencyOS Command Engine v1.0</span>
        </div>
      </div>
    </div>
  );
};
