import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Building2, 
  AlertTriangle, 
  ArrowUpRight, 
  Megaphone, 
  Plug,
  ExternalLink
} from 'lucide-react';
import { Client, Campaign, ClientIntegration, ActiveView } from '../types/agency';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface AgencyDashboardViewProps {
  clients: Client[];
  campaigns: Campaign[];
  integrations: ClientIntegration[];
  onSelectClient: (clientId: string, view: ActiveView) => void;
  onOpenNewClientModal: () => void;
}

export const AgencyDashboardView: React.FC<AgencyDashboardViewProps> = ({
  clients,
  campaigns,
  integrations,
  onSelectClient,
  onOpenNewClientModal
}) => {
  // Agency Aggregate Metrics
  const totalSpend = clients.reduce((acc, c) => acc + (c.total_spend_30d || 0), 0);
  const totalConversions = clients.reduce((acc, c) => acc + (c.total_conversions_30d || 0), 0);
  const avgRoas = clients.length > 0
    ? Number((clients.reduce((acc, c) => acc + (c.avg_roas_30d || 0), 0) / clients.length).toFixed(2))
    : 0;

  const expiredOrErrorIntegrations = integrations.filter(
    i => i.status === 'expired' || i.status === 'error'
  );

  const topPerformingClients = [...clients].sort((a, b) => (b.avg_roas_30d || 0) - (a.avg_roas_30d || 0));
  const clientsNeedingAttention = clients.filter(c => (c.avg_roas_30d || 0) < c.target_roas || integrations.some(i => i.client_id === c.id && (i.status === 'expired' || i.status === 'error')));

  // Mock sparkline trend data
  const spendSparkline = Array.from({ length: 15 }, (_, i) => ({ date: `Day ${i + 1}`, value: 1200 + Math.sin(i) * 300 }));
  const roasSparkline = Array.from({ length: 15 }, (_, i) => ({ date: `Day ${i + 1}`, value: 3.2 + Math.cos(i) * 0.4 }));

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if any integrations need attention */}
      {expiredOrErrorIntegrations.length > 0 && (
        <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-xs text-amber-200">
              <span className="font-semibold text-amber-100">{expiredOrErrorIntegrations.length} Client Integration(s) require action: </span>
              {expiredOrErrorIntegrations.map(i => `${i.account_name} (${i.platform.replace('_', ' ')})`).join(', ')}
            </div>
          </div>
          <span className="text-xs text-amber-400 hover:underline font-mono-num cursor-pointer">
            View Integrations →
          </span>
        </div>
      )}

      {/* Agency Core KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Agency Spend (30d)"
          value={`$${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={12.4}
          changeLabel="vs previous 30 days"
          sparklineData={spendSparkline}
          accentColor="indigo"
        />
        <MetricCard
          title="Aggregate Conversions"
          value={totalConversions.toLocaleString()}
          change={8.2}
          changeLabel="vs previous 30 days"
          accentColor="emerald"
        />
        <MetricCard
          title="Average Portfolio ROAS"
          value={`${avgRoas}x`}
          change={4.1}
          targetValue="3.20x"
          sparklineData={roasSparkline}
          accentColor="emerald"
        />
        <MetricCard
          title="Active Managed Clients"
          value={clients.length}
          subtitle={`${campaigns.filter(c => c.status === 'ACTIVE').length} Active Campaigns`}
          accentColor="amber"
        />
      </div>

      {/* Two Column Grid: Top Performing vs Needs Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Managed Workspaces */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">Top Performing Clients</h2>
              <p className="text-xs text-zinc-400">Ranked by 30-day ROAS target achievement</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onOpenNewClientModal}>
              + Add Client
            </Button>
          </div>

          <div className="space-y-3">
            {topPerformingClients.map((client) => {
              const clientCampaignsCount = campaigns.filter(c => c.client_id === client.id && c.status === 'ACTIVE').length;
              return (
                <div
                  key={client.id}
                  onClick={() => onSelectClient(client.id, 'client_overview')}
                  className="p-3 bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800/80 hover:border-zinc-700 rounded-lg flex items-center justify-between transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img src={client.logo_url} alt="" className="w-8 h-8 rounded-md object-cover" />
                    <div>
                      <h3 className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {client.name}
                      </h3>
                      <span className="text-[11px] text-zinc-400 font-mono-num">
                        {client.industry} • {clientCampaignsCount} Active Campaigns
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-xs font-bold text-emerald-400 font-mono-num">
                        {client.avg_roas_30d}x ROAS
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono-num">
                        ${client.total_spend_30d?.toLocaleString()} Spend
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspaces Needing Attention */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">Workspaces Needing Attention</h2>
              <p className="text-xs text-zinc-400">Integration failures or below-target ROAS</p>
            </div>
            <span className="text-xs font-mono-num text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
              {clientsNeedingAttention.length} Issues Detected
            </span>
          </div>

          <div className="space-y-3">
            {clientsNeedingAttention.length > 0 ? (
              clientsNeedingAttention.map((client) => {
                const clientErrorIntegrations = integrations.filter(i => i.client_id === client.id && (i.status === 'expired' || i.status === 'error'));
                return (
                  <div
                    key={client.id}
                    onClick={() => onSelectClient(client.id, 'client_integrations')}
                    className="p-3 bg-amber-950/10 hover:bg-amber-950/20 border border-amber-900/40 hover:border-amber-800/60 rounded-lg flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={client.logo_url} alt="" className="w-8 h-8 rounded-md object-cover" />
                      <div>
                        <h3 className="text-xs font-semibold text-amber-200 group-hover:underline">
                          {client.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          {clientErrorIntegrations.map((int) => (
                            <span key={int.id} className="text-[10px] text-rose-300 font-mono-num">
                              ⚠️ {int.platform.replace('_', ' ')}: {int.status}
                            </span>
                          ))}
                          {(client.avg_roas_30d || 0) < client.target_roas && (
                            <span className="text-[10px] text-amber-300 font-mono-num">
                              ROAS ({client.avg_roas_30d}x) &lt; Target ({client.target_roas}x)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="border-amber-800/60 text-amber-200">
                      Fix Issues
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-zinc-500">
                All client workspaces are healthy with connected integrations!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Multi-Channel Managed Campaign Grid Overview */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Live Multi-Channel Campaigns Summary</h2>
            <p className="text-xs text-zinc-400">All campaigns actively running across managed client portfolios</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="px-3 py-2.5">Campaign Name</th>
                <th className="px-3 py-2.5">Client</th>
                <th className="px-3 py-2.5">Channel</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-right">Daily Budget</th>
                <th className="px-3 py-2.5 text-right">30d Spend</th>
                <th className="px-3 py-2.5 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono-num">
              {campaigns.slice(0, 6).map((campaign) => {
                const client = clients.find(c => c.id === campaign.client_id);
                return (
                  <tr 
                    key={campaign.id}
                    onClick={() => onSelectClient(campaign.client_id, 'client_campaigns')}
                    className="hover:bg-zinc-850/60 transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-3 font-medium text-white max-w-xs truncate">
                      {campaign.name}
                    </td>
                    <td className="px-3 py-3 text-zinc-400">
                      {client?.name || 'Client'}
                    </td>
                    <td className="px-3 py-3">
                      <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {campaign.channel}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <Badge status={campaign.status} />
                    </td>
                    <td className="px-3 py-3 text-right text-zinc-200">
                      ${campaign.daily_budget.toLocaleString()}/day
                    </td>
                    <td className="px-3 py-3 text-right text-zinc-100 font-bold">
                      ${campaign.spend_30d?.toLocaleString()}
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={`font-bold ${
                        (campaign.roas_30d || 0) >= 3.5 ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {campaign.roas_30d}x
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
