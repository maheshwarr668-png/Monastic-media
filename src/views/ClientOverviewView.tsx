import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Zap, 
  AlertCircle, 
  ArrowUpRight, 
  Megaphone, 
  CheckCircle2, 
  AlertTriangle,
  Plug
} from 'lucide-react';
import { Client, Campaign, ClientIntegration, ActiveView } from '../types/agency';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface ClientOverviewViewProps {
  client: Client;
  campaigns: Campaign[];
  integrations: ClientIntegration[];
  onNavigateView: (view: ActiveView) => void;
}

export const ClientOverviewView: React.FC<ClientOverviewViewProps> = ({
  client,
  campaigns,
  integrations,
  onNavigateView
}) => {
  const clientCampaigns = campaigns.filter(c => c.client_id === client.id);
  const clientIntegrations = integrations.filter(i => i.client_id === client.id);

  // Compute Client Spend, Conversions, ROAS, CTR, CPC
  const totalSpend = clientCampaigns.reduce((acc, c) => acc + (c.spend_30d || 0), 0);
  const totalConversions = clientCampaigns.reduce((acc, c) => acc + (c.conversions_30d || 0), 0);
  const totalConversionValue = clientCampaigns.reduce((acc, c) => acc + (c.conversion_value_30d || 0), 0);
  const avgRoas = totalSpend > 0 ? Number((totalConversionValue / totalSpend).toFixed(2)) : 0;

  // Split Campaigns into Top Performing vs Needing Attention
  const performingWell = clientCampaigns.filter(c => (c.roas_30d || 0) >= client.target_roas);
  const needsAttention = clientCampaigns.filter(c => (c.roas_30d || 0) < client.target_roas || c.status === 'PAUSED');

  // Integrations Health Check
  const expiredIntegrations = clientIntegrations.filter(i => i.status === 'expired' || i.status === 'error');

  const sparklineData = Array.from({ length: 14 }, (_, i) => ({
    date: `Day ${i+1}`,
    value: (totalSpend / 14) * (0.8 + Math.sin(i) * 0.3)
  }));

  return (
    <div className="space-y-6">
      {/* Integration Warning Alert Banner */}
      {expiredIntegrations.length > 0 && (
        <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-xs text-amber-200">
              <span className="font-semibold">{expiredIntegrations.length} Integration Connection Issue: </span>
              {expiredIntegrations.map(i => `${i.platform.replace('_', ' ')} (${i.error_message || i.status})`).join('; ')}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigateView('client_integrations')}
            className="border-amber-800/60 text-amber-200 text-xs"
          >
            Fix Integrations →
          </Button>
        </div>
      )}

      {/* Immediate Clear Answer KPI Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="How Much Did We Spend?"
          value={`$${totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          subtitle={`Monthly Budget: $${client.monthly_budget.toLocaleString()}`}
          change={14.8}
          sparklineData={sparklineData}
          accentColor="indigo"
        />
        <MetricCard
          title="How Many Conversions?"
          value={totalConversions.toLocaleString()}
          subtitle={`Rev Value: $${totalConversionValue.toLocaleString()}`}
          change={9.4}
          accentColor="emerald"
        />
        <MetricCard
          title="What is ROAS?"
          value={`${avgRoas}x`}
          targetValue={`${client.target_roas}x`}
          change={avgRoas >= client.target_roas ? 6.2 : -3.5}
          accentColor={avgRoas >= client.target_roas ? 'emerald' : 'amber'}
        />
        <MetricCard
          title="Active Integrations"
          value={`${clientIntegrations.filter(i => i.status === 'connected').length} / ${clientIntegrations.length}`}
          subtitle="Real-time Client Owned APIs"
          accentColor="emerald"
        />
      </div>

      {/* Campaigns Split: Performing Well vs Needing Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Which Campaigns are Performing Well? */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-zinc-100">Which Campaigns are Performing Well?</h2>
            </div>
            <span className="text-xs font-mono-num px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
              {performingWell.length} Campaigns Exceeding Target
            </span>
          </div>

          <div className="space-y-3">
            {performingWell.length > 0 ? (
              performingWell.map((c) => (
                <div key={c.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="uppercase text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                        {c.channel}
                      </span>
                      <h3 className="text-xs font-semibold text-white truncate">{c.name}</h3>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 font-mono-num">
                      30d Spend: ${c.spend_30d?.toLocaleString()} • {c.conversions_30d} Conversions
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-emerald-400 font-mono-num">{c.roas_30d}x ROAS</div>
                    <div className="text-[10px] text-zinc-500 font-mono-num">+{(c.roas_30d! - client.target_roas).toFixed(2)} vs target</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-zinc-500">
                No campaigns currently exceeding target ROAS.
              </div>
            )}
          </div>
        </div>

        {/* Which Campaigns Need Attention? */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-semibold text-zinc-100">Which Campaigns Need Attention?</h2>
            </div>
            <span className="text-xs font-mono-num px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60">
              {needsAttention.length} Campaigns Below Target / Paused
            </span>
          </div>

          <div className="space-y-3">
            {needsAttention.length > 0 ? (
              needsAttention.map((c) => (
                <div key={c.id} className="p-3 bg-amber-950/10 border border-amber-900/40 rounded-lg flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="uppercase text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                        {c.channel}
                      </span>
                      <Badge status={c.status} />
                      <h3 className="text-xs font-semibold text-amber-200 truncate">{c.name}</h3>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-1 font-mono-num">
                      30d Spend: ${c.spend_30d?.toLocaleString()} • {c.conversions_30d} Conversions
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-bold text-amber-400 font-mono-num">{c.roas_30d}x ROAS</div>
                    <div className="text-[10px] text-rose-400 font-mono-num">Target: {client.target_roas}x</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-zinc-500">
                All client campaigns are operating optimally!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Connected Integrations Quick Connection Grid */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Client-Owned Integration Statuses</h2>
            <p className="text-xs text-zinc-400">Independent OAuth connections managed directly by {client.name}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigateView('client_integrations')}>
            Manage All ({clientIntegrations.length}) →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {clientIntegrations.map((integration) => (
            <div 
              key={integration.id}
              className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Plug className="w-4 h-4 text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white capitalize truncate">
                    {integration.platform.replace('_', ' ')}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono-num truncate">
                    {integration.account_name}
                  </div>
                </div>
              </div>
              <Badge status={integration.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
