import React, { useState } from 'react';
import { 
  Plug, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  Lock,
  Plus
} from 'lucide-react';
import { Client, ClientIntegration, IntegrationPlatform } from '../types/agency';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface ClientIntegrationsViewProps {
  client: Client;
  integrations: ClientIntegration[];
  onConnectPlatform: (platform: IntegrationPlatform) => void;
  onSyncPlatform: (integrationId: string) => void;
}

const SUPPORTED_PLATFORMS: { platform: IntegrationPlatform; name: string; icon: string; desc: string }[] = [
  { platform: 'meta_ads', name: 'Meta Ads Manager', icon: '⚡', desc: 'Facebook & Instagram Advantage+ Ads' },
  { platform: 'google_ads', name: 'Google Ads', icon: '🔍', desc: 'Search, Shopping & Performance Max' },
  { platform: 'ga4', name: 'Google Analytics 4', icon: '📊', desc: 'Web & App Event Attribution' },
  { platform: 'shopify', name: 'Shopify Storefront', icon: '🛍️', desc: 'Real-time Sales & Order Values' },
  { platform: 'woocommerce', name: 'WooCommerce', icon: '🛒', desc: 'WordPress Store Checkout Sync' },
  { platform: 'linkedin_ads', name: 'LinkedIn Ads', icon: '💼', desc: 'B2B Professional Lead Generation' },
  { platform: 'tiktok_ads', name: 'TikTok Ads Manager', icon: '🎵', desc: 'UGC Spark & App Install Ads' }
];

export const ClientIntegrationsView: React.FC<ClientIntegrationsViewProps> = ({
  client,
  integrations,
  onConnectPlatform,
  onSyncPlatform
}) => {
  const clientIntegrations = integrations.filter(i => i.client_id === client.id);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSyncClick = (id: string) => {
    setSyncingId(id);
    onSyncPlatform(id);
    setTimeout(() => setSyncingId(null), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Scope Isolation Banner */}
      <div className="glass-card p-4 flex items-center justify-between border-l-4 border-l-indigo-500">
        <div className="flex items-center gap-3">
          <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
          <div className="text-xs text-zinc-300">
            <span className="font-semibold text-white">Client Data Isolation Notice: </span>
            All OAuth tokens for {client.name} are stored in isolated encrypted storage. Credentials are never shared across client workspaces.
          </div>
        </div>
      </div>

      {/* Connected Integrations Grid */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Connected Accounts ({clientIntegrations.length})</h2>
            <p className="text-xs text-zinc-400">Live API credentials owned and authorized by {client.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientIntegrations.map((integration) => {
            const platformInfo = SUPPORTED_PLATFORMS.find(p => p.platform === integration.platform);
            const isSyncing = syncingId === integration.id;

            return (
              <div 
                key={integration.id}
                className={`p-4 bg-zinc-900/60 border rounded-lg flex flex-col justify-between space-y-3 ${
                  integration.status === 'expired' || integration.status === 'error'
                    ? 'border-amber-800/80 bg-amber-950/10'
                    : 'border-zinc-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-zinc-800 flex items-center justify-center text-lg">
                      {platformInfo?.icon || '🔌'}
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-white">
                        {platformInfo?.name || integration.platform}
                      </h3>
                      <span className="text-[11px] text-zinc-400 font-mono-num">
                        Account ID: {integration.account_id}
                      </span>
                    </div>
                  </div>
                  <Badge status={integration.status} />
                </div>

                {integration.error_message && (
                  <div className="p-2 bg-rose-950/40 border border-rose-900/60 rounded text-[11px] text-rose-300 font-mono-num">
                    ⚠️ {integration.error_message}
                  </div>
                )}

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono-num">
                  <span>
                    Last Sync: {integration.last_sync_at ? new Date(integration.last_sync_at).toLocaleTimeString() : 'Never'}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSyncClick(integration.id)}
                      icon={<RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />}
                    >
                      {isSyncing ? 'Syncing' : 'Sync'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onConnectPlatform(integration.platform)}
                    >
                      {integration.status === 'expired' ? 'Re-authorize' : 'Manage'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Platform Integrations to Connect */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Add New Platform Integration</h2>
            <p className="text-xs text-zinc-400">Connect additional marketing channels to automatically pull ad spend & conversions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUPPORTED_PLATFORMS.map((plat) => {
            const isAlreadyConnected = clientIntegrations.some(i => i.platform === plat.platform && i.status === 'connected');

            return (
              <div 
                key={plat.platform}
                className="p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-lg flex flex-col justify-between space-y-3 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-base shrink-0">
                    {plat.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">{plat.name}</h3>
                    <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{plat.desc}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                    {isAlreadyConnected ? 'Active' : 'OAuth 2.0'}
                  </span>
                  <Button
                    variant={isAlreadyConnected ? 'secondary' : 'primary'}
                    size="sm"
                    onClick={() => onConnectPlatform(plat.platform)}
                    icon={isAlreadyConnected ? <CheckCircle className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                  >
                    {isAlreadyConnected ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
