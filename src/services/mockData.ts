import { Agency, Client, ClientIntegration, Campaign, CampaignDailyMetric, Profile, AuditLog, ClientAsset, ClientNote, ClientReport } from '../types/agency';

export const INITIAL_AGENCY: Agency = {
  id: 'agency-100',
  name: 'Nexus Digital Media',
  slug: 'nexus-digital',
  logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
  primary_color: '#0F172A',
  currency: 'USD',
  timezone: 'America/New_York',
  created_at: '2025-01-15T08:00:00Z',
  updated_at: '2026-07-27T12:00:00Z'
};

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'user-1',
    agency_id: 'agency-100',
    full_name: 'Alexander Wright',
    email: 'alexander@nexusdigital.com',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    role: 'owner',
    created_at: '2025-01-15T08:00:00Z'
  },
  {
    id: 'user-2',
    agency_id: 'agency-100',
    full_name: 'Elena Rostova',
    email: 'elena@nexusdigital.com',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    role: 'account_manager',
    created_at: '2025-02-01T10:00:00Z'
  },
  {
    id: 'user-3',
    agency_id: 'agency-100',
    full_name: 'Marcus Vance',
    email: 'marcus@nexusdigital.com',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    role: 'media_buyer',
    created_at: '2025-03-10T14:30:00Z'
  },
  {
    id: 'user-4',
    agency_id: 'agency-100',
    full_name: 'Sarah Chen',
    email: 'sarah@nexusdigital.com',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    role: 'admin',
    created_at: '2025-04-12T09:15:00Z'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'client-acme',
    agency_id: 'agency-100',
    name: 'Acme Apparel & Co.',
    slug: 'acme-apparel',
    logo_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&auto=format&fit=crop&q=80',
    website: 'https://acmeapparel.com',
    industry: 'E-Commerce & Apparel',
    currency: 'USD',
    target_roas: 3.50,
    monthly_budget: 65000.00,
    created_at: '2025-02-10T11:00:00Z',
    updated_at: '2026-07-27T10:00:00Z',
    total_spend_30d: 48920.50,
    total_conversions_30d: 1420,
    avg_roas_30d: 3.84,
    active_campaigns_count: 6,
    connected_platforms_count: 4
  },
  {
    id: 'client-apex',
    agency_id: 'agency-100',
    name: 'Apex Cloud Solutions',
    slug: 'apex-cloud',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    website: 'https://apexcloud.io',
    industry: 'B2B SaaS Technology',
    currency: 'USD',
    target_roas: 4.00,
    monthly_budget: 35000.00,
    created_at: '2025-03-01T09:30:00Z',
    updated_at: '2026-07-27T09:15:00Z',
    total_spend_30d: 28450.00,
    total_conversions_30d: 412,
    avg_roas_30d: 4.18,
    active_campaigns_count: 4,
    connected_platforms_count: 3
  },
  {
    id: 'client-veloce',
    agency_id: 'agency-100',
    name: 'Veloce Performance Fitness',
    slug: 'veloce-fitness',
    logo_url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80',
    website: 'https://velocefit.com',
    industry: 'Health & Consumer App',
    currency: 'USD',
    target_roas: 2.80,
    monthly_budget: 25000.00,
    created_at: '2025-04-15T15:00:00Z',
    updated_at: '2026-07-27T11:20:00Z',
    total_spend_30d: 19800.75,
    total_conversions_30d: 890,
    avg_roas_30d: 2.62,
    active_campaigns_count: 5,
    connected_platforms_count: 3
  }
];

export const INITIAL_INTEGRATIONS: ClientIntegration[] = [
  // Acme Ecommerce Integrations
  {
    id: 'int-1',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    platform: 'meta_ads',
    account_id: 'act_4098129381',
    account_name: 'Acme Meta Ads Business Pro',
    status: 'connected',
    token_expires_at: '2026-11-15T00:00:00Z',
    last_sync_at: '2026-07-27T16:45:00Z',
    created_at: '2025-02-11T10:00:00Z',
    updated_at: '2026-07-27T16:45:00Z'
  },
  {
    id: 'int-2',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    platform: 'google_ads',
    account_id: '891-204-9182',
    account_name: 'Acme Google Ads Search & Shopping',
    status: 'connected',
    token_expires_at: '2026-10-20T00:00:00Z',
    last_sync_at: '2026-07-27T16:40:00Z',
    created_at: '2025-02-11T10:30:00Z',
    updated_at: '2026-07-27T16:40:00Z'
  },
  {
    id: 'int-3',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    platform: 'shopify',
    account_id: 'acme-store.myshopify.com',
    account_name: 'Acme Main Storefront',
    status: 'connected',
    last_sync_at: '2026-07-27T16:50:00Z',
    created_at: '2025-02-12T11:00:00Z',
    updated_at: '2026-07-27T16:50:00Z'
  },
  {
    id: 'int-4',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    platform: 'ga4',
    account_id: 'properties/398102931',
    account_name: 'GA4 Production View',
    status: 'connected',
    last_sync_at: '2026-07-27T16:30:00Z',
    created_at: '2025-02-12T11:30:00Z',
    updated_at: '2026-07-27T16:30:00Z'
  },
  {
    id: 'int-5',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    platform: 'tiktok_ads',
    account_id: 'tt_71902839182',
    account_name: 'Acme TikTok Commerce',
    status: 'expired',
    error_message: 'OAuth refresh token expired on July 20, 2026. Please re-authenticate.',
    last_sync_at: '2026-07-20T10:15:00Z',
    created_at: '2025-03-01T12:00:00Z',
    updated_at: '2026-07-20T10:15:00Z'
  },
  // Apex SaaS Integrations
  {
    id: 'int-6',
    client_id: 'client-apex',
    agency_id: 'agency-100',
    platform: 'google_ads',
    account_id: '312-908-1102',
    account_name: 'Apex LeadGen Search & PMax',
    status: 'connected',
    last_sync_at: '2026-07-27T16:48:00Z',
    created_at: '2025-03-02T14:00:00Z',
    updated_at: '2026-07-27T16:48:00Z'
  },
  {
    id: 'int-7',
    client_id: 'client-apex',
    agency_id: 'agency-100',
    platform: 'linkedin_ads',
    account_id: '509812931',
    account_name: 'Apex B2B Decision Maker Ads',
    status: 'connected',
    last_sync_at: '2026-07-27T16:15:00Z',
    created_at: '2025-03-02T14:30:00Z',
    updated_at: '2026-07-27T16:15:00Z'
  },
  {
    id: 'int-8',
    client_id: 'client-apex',
    agency_id: 'agency-100',
    platform: 'ga4',
    account_id: 'properties/891209381',
    account_name: 'Apex Web & Product Analytics',
    status: 'connected',
    last_sync_at: '2026-07-27T16:50:00Z',
    created_at: '2025-03-03T09:00:00Z',
    updated_at: '2026-07-27T16:50:00Z'
  },
  // Veloce Fitness Integrations
  {
    id: 'int-9',
    client_id: 'client-veloce',
    agency_id: 'agency-100',
    platform: 'meta_ads',
    account_id: 'act_9018239102',
    account_name: 'Veloce Direct Response Meta',
    status: 'connected',
    last_sync_at: '2026-07-27T16:55:00Z',
    created_at: '2025-04-16T10:00:00Z',
    updated_at: '2026-07-27T16:55:00Z'
  },
  {
    id: 'int-10',
    client_id: 'client-veloce',
    agency_id: 'agency-100',
    platform: 'tiktok_ads',
    account_id: 'tt_409182391',
    account_name: 'Veloce Viral UGC Spark Ads',
    status: 'connected',
    last_sync_at: '2026-07-27T16:42:00Z',
    created_at: '2025-04-16T10:30:00Z',
    updated_at: '2026-07-27T16:42:00Z'
  },
  {
    id: 'int-11',
    client_id: 'client-veloce',
    agency_id: 'agency-100',
    platform: 'ga4',
    account_id: 'properties/9018231',
    account_name: 'Veloce App Install GA4',
    status: 'error',
    error_message: 'API quota exceeded for GA4 Data API v1. Retrying in 1 hour.',
    last_sync_at: '2026-07-27T14:10:00Z',
    created_at: '2025-04-17T11:00:00Z',
    updated_at: '2026-07-27T14:10:00Z'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  // Acme Campaigns
  {
    id: 'camp-1',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    integration_id: 'int-1',
    external_campaign_id: 'meta_c_102931',
    name: 'Meta - Summer Apparel Collection Advantage+ Shopping',
    channel: 'meta',
    status: 'ACTIVE',
    objective: 'CONVERSIONS',
    daily_budget: 450.00,
    lifetime_budget: 25000.00,
    spend_30d: 13450.00,
    impressions_30d: 890400,
    clicks_30d: 21450,
    conversions_30d: 482,
    conversion_value_30d: 58920.00,
    roas_30d: 4.38,
    ctr_30d: 2.41,
    cpc_30d: 0.63
  },
  {
    id: 'camp-2',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    integration_id: 'int-1',
    external_campaign_id: 'meta_c_102932',
    name: 'Meta - Retargeting Cart Abandoners (Dynamic Catalog)',
    channel: 'meta',
    status: 'ACTIVE',
    objective: 'RETARGETING',
    daily_budget: 200.00,
    lifetime_budget: 12000.00,
    spend_30d: 5980.00,
    impressions_30d: 312000,
    clicks_30d: 11200,
    conversions_30d: 310,
    conversion_value_30d: 31200.00,
    roas_30d: 5.22,
    ctr_30d: 3.59,
    cpc_30d: 0.53
  },
  {
    id: 'camp-3',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    integration_id: 'int-2',
    external_campaign_id: 'g_c_891201',
    name: 'Google - Brand Keywords Search Campaign',
    channel: 'google',
    status: 'ACTIVE',
    objective: 'SEARCH_BRAND',
    daily_budget: 150.00,
    lifetime_budget: 10000.00,
    spend_30d: 4450.50,
    impressions_30d: 95400,
    clicks_30d: 14200,
    conversions_30d: 380,
    conversion_value_30d: 49500.00,
    roas_30d: 11.12,
    ctr_30d: 14.88,
    cpc_30d: 0.31
  },
  {
    id: 'camp-4',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    integration_id: 'int-2',
    external_campaign_id: 'g_c_891202',
    name: 'Google - Performance Max (High Margin Products)',
    channel: 'google',
    status: 'ACTIVE',
    objective: 'PMAX',
    daily_budget: 600.00,
    lifetime_budget: 40000.00,
    spend_30d: 17900.00,
    impressions_30d: 1450000,
    clicks_30d: 38200,
    conversions_30d: 395,
    conversion_value_30d: 51200.00,
    roas_30d: 2.86,
    ctr_30d: 2.63,
    cpc_30d: 0.47
  },
  {
    id: 'camp-5',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    integration_id: 'int-1',
    external_campaign_id: 'meta_c_102933',
    name: 'Meta - Prospecting Lookalike 1% Buyers Video Reels',
    channel: 'meta',
    status: 'PAUSED',
    objective: 'PROSPECTING',
    daily_budget: 300.00,
    lifetime_budget: 15000.00,
    spend_30d: 4800.00,
    impressions_30d: 420000,
    clicks_30d: 8400,
    conversions_30d: 92,
    conversion_value_30d: 9400.00,
    roas_30d: 1.96,
    ctr_30d: 2.00,
    cpc_30d: 0.57
  },
  // Apex SaaS Campaigns
  {
    id: 'camp-6',
    client_id: 'client-apex',
    agency_id: 'agency-100',
    integration_id: 'int-6',
    external_campaign_id: 'g_c_30192',
    name: 'Google - Intent Search: Cloud Migration Software',
    channel: 'google',
    status: 'ACTIVE',
    objective: 'LEAD_GEN',
    daily_budget: 400.00,
    lifetime_budget: 30000.00,
    spend_30d: 11800.00,
    impressions_30d: 142000,
    clicks_30d: 4900,
    conversions_30d: 184,
    conversion_value_30d: 54000.00,
    roas_30d: 4.58,
    ctr_30d: 3.45,
    cpc_30d: 2.41
  },
  {
    id: 'camp-7',
    client_id: 'client-apex',
    agency_id: 'agency-100',
    integration_id: 'int-7',
    external_campaign_id: 'li_c_90182',
    name: 'LinkedIn - CTO & VP Engineering Sponsored Content',
    channel: 'linkedin',
    status: 'ACTIVE',
    objective: 'B2B_LEADGEN',
    daily_budget: 350.00,
    lifetime_budget: 20000.00,
    spend_30d: 10450.00,
    impressions_30d: 88000,
    clicks_30d: 1950,
    conversions_30d: 142,
    conversion_value_30d: 42600.00,
    roas_30d: 4.08,
    ctr_30d: 2.22,
    cpc_30d: 5.36
  },
  {
    id: 'camp-8',
    client_id: 'client-apex',
    agency_id: 'agency-100',
    integration_id: 'int-6',
    external_campaign_id: 'g_c_30193',
    name: 'Google - Competitor Conquesting Campaign',
    channel: 'google',
    status: 'ACTIVE',
    objective: 'CONQUESTING',
    daily_budget: 200.00,
    lifetime_budget: 10000.00,
    spend_30d: 6200.00,
    impressions_30d: 91000,
    clicks_30d: 3100,
    conversions_30d: 86,
    conversion_value_30d: 22400.00,
    roas_30d: 3.61,
    ctr_30d: 3.41,
    cpc_30d: 2.00
  },
  // Veloce Fitness Campaigns
  {
    id: 'camp-9',
    client_id: 'client-veloce',
    agency_id: 'agency-100',
    integration_id: 'int-10',
    external_campaign_id: 'tt_c_70912',
    name: 'TikTok - 14-Day Fitness Challenge UGC Spark Ads',
    channel: 'tiktok',
    status: 'ACTIVE',
    objective: 'APP_INSTALL',
    daily_budget: 300.00,
    lifetime_budget: 18000.00,
    spend_30d: 8900.00,
    impressions_30d: 1980000,
    clicks_30d: 42100,
    conversions_30d: 512,
    conversion_value_30d: 22500.00,
    roas_30d: 2.53,
    ctr_30d: 2.13,
    cpc_30d: 0.21
  },
  {
    id: 'camp-10',
    client_id: 'client-veloce',
    agency_id: 'agency-100',
    integration_id: 'int-9',
    external_campaign_id: 'meta_c_50192',
    name: 'Meta - App Installs Broad Interest Targeting',
    channel: 'meta',
    status: 'ACTIVE',
    objective: 'APP_INSTALL',
    daily_budget: 250.00,
    lifetime_budget: 15000.00,
    spend_30d: 7400.75,
    impressions_30d: 740000,
    clicks_30d: 18900,
    conversions_30d: 298,
    conversion_value_30d: 20100.00,
    roas_30d: 2.72,
    ctr_30d: 2.55,
    cpc_30d: 0.39
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'audit-1',
    agency_id: 'agency-100',
    actor_name: 'Marcus Vance',
    actor_email: 'marcus@nexusdigital.com',
    action: 'CAMPAIGN_BUDGET_UPDATE',
    resource_type: 'Campaign',
    resource_name: 'Meta - Summer Apparel Collection Advantage+',
    ip_address: '192.168.1.42',
    timestamp: '2026-07-27T16:20:00Z'
  },
  {
    id: 'audit-2',
    agency_id: 'agency-100',
    actor_name: 'Elena Rostova',
    actor_email: 'elena@nexusdigital.com',
    action: 'INTEGRATION_RECONNECT',
    resource_type: 'ClientIntegration',
    resource_name: 'Acme Meta Ads Business Pro',
    ip_address: '192.168.1.88',
    timestamp: '2026-07-27T15:45:00Z'
  },
  {
    id: 'audit-3',
    agency_id: 'agency-100',
    actor_name: 'Alexander Wright',
    actor_email: 'alexander@nexusdigital.com',
    action: 'CLIENT_CREATE',
    resource_type: 'Client',
    resource_name: 'Veloce Performance Fitness',
    ip_address: '192.168.1.10',
    timestamp: '2026-07-25T11:30:00Z'
  }
];

export const INITIAL_ASSETS: ClientAsset[] = [
  {
    id: 'asset-1',
    client_id: 'client-acme',
    name: 'Summer_Collection_Hero_Reel_1080x1920.mp4',
    type: 'video',
    size: '42.5 MB',
    url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80',
    channel: 'meta',
    updated_at: '2026-07-22T14:00:00Z'
  },
  {
    id: 'asset-2',
    client_id: 'client-acme',
    name: 'Dynamic_Catalog_Carousel_Banner.jpg',
    type: 'image',
    size: '4.2 MB',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop&q=80',
    channel: 'meta',
    updated_at: '2026-07-20T10:15:00Z'
  },
  {
    id: 'asset-3',
    client_id: 'client-apex',
    name: 'Cloud_Migration_Whitepaper_2026.pdf',
    type: 'doc',
    size: '8.1 MB',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80',
    channel: 'linkedin',
    updated_at: '2026-07-18T09:30:00Z'
  }
];

export const INITIAL_NOTES: ClientNote[] = [
  {
    id: 'note-1',
    client_id: 'client-acme',
    author_name: 'Elena Rostova',
    title: 'Q3 Budget Scaling & Meta Advantage+ Strategy',
    content: 'Client agreed to scale Meta daily budget from $450 to $650 starting August 1st based on strong 4.38x ROAS over the past 30 days. Recommend expanding Advantage+ catalog audience targets.',
    category: 'strategy',
    created_at: '2026-07-26T16:00:00Z'
  },
  {
    id: 'note-2',
    client_id: 'client-acme',
    author_name: 'Marcus Vance',
    title: 'TikTok OAuth Re-authentication Required',
    content: 'TikTok Ads integration expired on July 20. Sent re-auth link to client CMO (David). Waiting for approval.',
    category: 'urgent',
    created_at: '2026-07-24T11:20:00Z'
  }
];

export const INITIAL_REPORTS: ClientReport[] = [
  {
    id: 'report-1',
    client_id: 'client-acme',
    agency_id: 'agency-100',
    created_by: 'user-2',
    title: 'Acme Apparel Q2 Executive Performance Report',
    period_start: '2026-04-01',
    period_end: '2026-06-30',
    summary_notes: 'Q2 delivered exceptional performance with aggregate ROAS of 3.84x against a target of 3.50x. Meta Advantage+ Shopping and Google Brand Search generated over 72% of total revenue.',
    metrics_snapshot: {
      spend: 142500.00,
      roas: 3.84,
      conversions: 4180,
      ctr: 2.85,
      cpc: 0.58
    },
    share_token: 'acme_q2_perf_89123019238',
    is_public: true,
    created_at: '2026-07-01T10:00:00Z'
  }
];

// Helper Generator for 30-Day Timeseries Metrics
export function generateTimeseriesMetrics(clientId: string, days: number = 30): CampaignDailyMetric[] {
  const result: CampaignDailyMetric[] = [];
  const today = new Date('2026-07-27');
  
  const clientCampaigns = INITIAL_CAMPAIGNS.filter(c => c.client_id === clientId);

  clientCampaigns.forEach((campaign) => {
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      // Variance for realistic charts
      const factor = 0.85 + Math.sin(i * 0.5) * 0.2 + (Math.random() * 0.1);
      const dailySpend = Math.round((campaign.spend_30d! / days) * factor * 100) / 100;
      const dailyImpressions = Math.round((campaign.impressions_30d! / days) * factor);
      const dailyClicks = Math.round((campaign.clicks_30d! / days) * factor);
      const dailyConversions = Math.round((campaign.conversions_30d! / days) * factor);
      const dailyValue = Math.round((campaign.conversion_value_30d! / days) * factor * 100) / 100;

      result.push({
        id: `metric-${campaign.id}-${dateStr}`,
        campaign_id: campaign.id,
        client_id: clientId,
        agency_id: 'agency-100',
        date: dateStr,
        spend: dailySpend,
        impressions: dailyImpressions,
        clicks: dailyClicks,
        conversions: dailyConversions,
        conversion_value: dailyValue,
        ctr: dailyImpressions > 0 ? Number(((dailyClicks / dailyImpressions) * 100).toFixed(2)) : 0,
        cpc: dailyClicks > 0 ? Number((dailySpend / dailyClicks).toFixed(2)) : 0,
        roas: dailySpend > 0 ? Number((dailyValue / dailySpend).toFixed(2)) : 0
      });
    }
  });

  return result;
}
