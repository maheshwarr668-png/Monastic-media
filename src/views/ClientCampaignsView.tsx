import React, { useState } from 'react';
import { 
  Megaphone, 
  Search, 
  Filter, 
  Edit3, 
  Play, 
  Pause, 
  TrendingUp, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { Client, Campaign, ChannelType, CampaignStatus } from '../types/agency';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

interface ClientCampaignsViewProps {
  client: Client;
  campaigns: Campaign[];
  onToggleStatus: (campaignId: string) => void;
  onUpdateBudget: (campaignId: string, newBudget: number) => void;
}

export const ClientCampaignsView: React.FC<ClientCampaignsViewProps> = ({
  client,
  campaigns,
  onToggleStatus,
  onUpdateBudget
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingBudgetCampaignId, setEditingBudgetCampaignId] = useState<string | null>(null);
  const [tempBudgetInput, setTempBudgetInput] = useState<string>('');

  const clientCampaigns = campaigns.filter(c => c.client_id === client.id);

  const filteredCampaigns = clientCampaigns.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.external_campaign_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === 'all' || c.channel === channelFilter;
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesChannel && matchesStatus;
  });

  const handleStartEditingBudget = (c: Campaign) => {
    setEditingBudgetCampaignId(c.id);
    setTempBudgetInput(c.daily_budget.toString());
  };

  const handleSaveBudget = (campaignId: string) => {
    const parsed = parseFloat(tempBudgetInput);
    if (!isNaN(parsed) && parsed >= 0) {
      onUpdateBudget(campaignId, parsed);
    }
    setEditingBudgetCampaignId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls & Filter Bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaign name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-md pl-9 pr-4 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 font-normal"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono-num">
            <Filter className="w-3.5 h-3.5" />
            <span>Channel:</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200 focus:outline-none"
            >
              <option value="all">All Channels</option>
              <option value="meta">Meta Ads</option>
              <option value="google">Google Ads</option>
              <option value="tiktok">TikTok Ads</option>
              <option value="linkedin">LinkedIn Ads</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono-num">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
            </select>
          </div>
        </div>
      </div>

      {/* Campaign Virtualized Data Grid */}
      <div className="glass-card overflow-hidden">
        <div className="px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-300">
            Multi-Channel Campaigns ({filteredCampaigns.length})
          </span>
          <span className="text-[11px] text-zinc-500 font-mono-num">
            Target ROAS: <strong className="text-emerald-400">{client.target_roas}x</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] font-semibold tracking-wider border-b border-zinc-800">
              <tr>
                <th className="px-4 py-3">Control</th>
                <th className="px-4 py-3">Campaign Name</th>
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Daily Budget</th>
                <th className="px-4 py-3 text-right">30d Spend</th>
                <th className="px-4 py-3 text-right">CTR</th>
                <th className="px-4 py-3 text-right">CPC</th>
                <th className="px-4 py-3 text-right">Conversions</th>
                <th className="px-4 py-3 text-right">ROAS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono-num">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-zinc-850/60 transition-colors">
                  {/* Status Toggle Control Button */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onToggleStatus(campaign.id)}
                      title={campaign.status === 'ACTIVE' ? 'Pause Campaign' : 'Activate Campaign'}
                      className={`p-1 rounded transition-colors ${
                        campaign.status === 'ACTIVE' 
                          ? 'text-emerald-400 hover:bg-emerald-950/60' 
                          : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800'
                      }`}
                    >
                      {campaign.status === 'ACTIVE' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </td>

                  {/* Campaign Name */}
                  <td className="px-4 py-3 font-medium text-white max-w-sm">
                    <div className="truncate" title={campaign.name}>{campaign.name}</div>
                    <span className="text-[10px] text-zinc-500">{campaign.external_campaign_id}</span>
                  </td>

                  {/* Channel Tag */}
                  <td className="px-4 py-3">
                    <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      {campaign.channel}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3">
                    <Badge status={campaign.status} />
                  </td>

                  {/* Editable Daily Budget */}
                  <td className="px-4 py-3 text-right">
                    {editingBudgetCampaignId === campaign.id ? (
                      <div className="flex items-center justify-end gap-1">
                        <span className="text-zinc-500">$</span>
                        <input
                          type="number"
                          value={tempBudgetInput}
                          onChange={(e) => setTempBudgetInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveBudget(campaign.id)}
                          className="w-20 bg-zinc-900 border border-zinc-600 rounded px-1.5 py-0.5 text-xs text-white text-right focus:outline-none"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveBudget(campaign.id)}
                          className="text-[10px] px-1.5 py-0.5 bg-emerald-600 text-white rounded font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => handleStartEditingBudget(campaign)}
                        className="inline-flex items-center gap-1 hover:text-indigo-400 cursor-pointer group"
                      >
                        <span className="text-zinc-200 font-semibold">${campaign.daily_budget.toLocaleString()}/d</span>
                        <Edit3 className="w-3 h-3 text-zinc-600 group-hover:text-indigo-400" />
                      </div>
                    )}
                  </td>

                  {/* Metrics */}
                  <td className="px-4 py-3 text-right font-bold text-zinc-100">
                    ${campaign.spend_30d?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-300">
                    {campaign.ctr_30d}%
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-300">
                    ${campaign.cpc_30d}
                  </td>
                  <td className="px-4 py-3 text-right text-zinc-200">
                    {campaign.conversions_30d}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-bold ${
                      (campaign.roas_30d || 0) >= client.target_roas ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {campaign.roas_30d}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
