import React, { useState } from 'react';
import { Building2, Search, Plus, ExternalLink, Megaphone, Plug, ArrowUpRight } from 'lucide-react';
import { Client, Campaign, ClientIntegration, ActiveView } from '../types/agency';
import { Button } from '../components/ui/Button';

interface AgencyClientsViewProps {
  clients: Client[];
  campaigns: Campaign[];
  integrations: ClientIntegration[];
  onSelectClient: (clientId: string, view: ActiveView) => void;
  onOpenNewClientModal: () => void;
}

export const AgencyClientsView: React.FC<AgencyClientsViewProps> = ({
  clients,
  campaigns,
  integrations,
  onSelectClient,
  onOpenNewClientModal
}) => {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Search & Actions */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search managed client workspaces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-normal"
          />
        </div>

        <Button variant="primary" size="sm" onClick={onOpenNewClientModal} icon={<Plus className="w-3.5 h-3.5" />}>
          + Onboard New Client
        </Button>
      </div>

      {/* Clients Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredClients.map((client) => {
          const clientCampaigns = campaigns.filter(c => c.client_id === client.id);
          const clientIntegrations = integrations.filter(i => i.client_id === client.id);
          const activeCampaigns = clientCampaigns.filter(c => c.status === 'ACTIVE').length;
          const connectedIntegrations = clientIntegrations.filter(i => i.status === 'connected').length;

          return (
            <div
              key={client.id}
              onClick={() => onSelectClient(client.id, 'client_overview')}
              className="glass-card p-5 space-y-4 hover:border-zinc-700 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={client.logo_url} alt="" className="w-10 h-10 rounded-lg object-cover ring-1 ring-zinc-700" />
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {client.name}
                      </h3>
                      <span className="text-xs text-zinc-400 font-mono-num">{client.industry}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-zinc-800/80 font-mono-num text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-500 block">30d Spend</span>
                    <span className="font-bold text-white">${client.total_spend_30d?.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">30d Avg ROAS</span>
                    <span className="font-bold text-emerald-400">{client.avg_roas_30d}x</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Monthly Budget</span>
                    <span className="text-zinc-300">${client.monthly_budget.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 block">Target ROAS</span>
                    <span className="text-zinc-300">{client.target_roas}x</span>
                  </div>
                </div>
              </div>

              {/* Footer Stats */}
              <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-400 font-mono-num">
                <span className="flex items-center gap-1">
                  <Megaphone className="w-3 h-3 text-indigo-400" /> {activeCampaigns} Active Campaigns
                </span>
                <span className="flex items-center gap-1">
                  <Plug className="w-3 h-3 text-emerald-400" /> {connectedIntegrations} Connected APIs
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
