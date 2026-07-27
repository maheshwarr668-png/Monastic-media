// AgencyOS Core Domain Types & Interfaces

export type UserRole = 'owner' | 'admin' | 'account_manager' | 'media_buyer' | 'client_viewer';

export type IntegrationPlatform = 
  | 'meta_ads' 
  | 'google_ads' 
  | 'ga4' 
  | 'shopify' 
  | 'woocommerce' 
  | 'linkedin_ads' 
  | 'tiktok_ads';

export type IntegrationStatus = 'connected' | 'disconnected' | 'expired' | 'syncing' | 'error';

export type CampaignStatus = 'ACTIVE' | 'PAUSED' | 'ARCHIVED' | 'COMPLETED';

export type ChannelType = 'meta' | 'google' | 'tiktok' | 'linkedin';

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  primary_color: string;
  currency: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  agency_id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
}

export interface Client {
  id: string;
  agency_id: string;
  name: string;
  slug: string;
  logo_url?: string;
  website?: string;
  industry: string;
  currency: string;
  target_roas: number;
  monthly_budget: number;
  created_at: string;
  updated_at: string;
  // Computed aggregations for dashboard summary
  total_spend_30d?: number;
  total_conversions_30d?: number;
  avg_roas_30d?: number;
  active_campaigns_count?: number;
  connected_platforms_count?: number;
}

export interface ClientIntegration {
  id: string;
  client_id: string;
  agency_id: string;
  platform: IntegrationPlatform;
  account_id: string;
  account_name: string;
  status: IntegrationStatus;
  token_expires_at?: string;
  last_sync_at?: string;
  error_message?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  client_id: string;
  agency_id: string;
  integration_id?: string;
  external_campaign_id: string;
  name: string;
  channel: ChannelType;
  status: CampaignStatus;
  objective?: string;
  daily_budget: number;
  lifetime_budget: number;
  start_date?: string;
  end_date?: string;
  // Dynamic aggregations
  spend_30d?: number;
  impressions_30d?: number;
  clicks_30d?: number;
  conversions_30d?: number;
  conversion_value_30d?: number;
  roas_30d?: number;
  ctr_30d?: number;
  cpc_30d?: number;
}

export interface CampaignDailyMetric {
  id: string;
  campaign_id: string;
  client_id: string;
  agency_id: string;
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  conversion_value: number;
  ctr: number;
  cpc: number;
  roas: number;
}

export interface ClientReport {
  id: string;
  client_id: string;
  agency_id: string;
  created_by?: string;
  title: string;
  period_start: string;
  period_end: string;
  summary_notes?: string;
  metrics_snapshot: {
    spend: number;
    roas: number;
    conversions: number;
    ctr: number;
    cpc: number;
  };
  share_token: string;
  is_public: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  agency_id: string;
  actor_name: string;
  actor_email: string;
  action: string;
  resource_type: string;
  resource_name: string;
  ip_address: string;
  timestamp: string;
}

export interface ClientAsset {
  id: string;
  client_id: string;
  name: string;
  type: 'image' | 'video' | 'copy' | 'doc';
  size?: string;
  url: string;
  channel?: ChannelType;
  updated_at: string;
}

export interface ClientNote {
  id: string;
  client_id: string;
  author_name: string;
  title: string;
  content: string;
  category: 'strategy' | 'meeting' | 'urgent' | 'general';
  created_at: string;
}

export type ActiveView = 
  | 'agency_dashboard'
  | 'agency_clients'
  | 'agency_reports'
  | 'agency_team'
  | 'agency_settings'
  | 'client_overview'
  | 'client_campaigns'
  | 'client_integrations'
  | 'client_analytics'
  | 'client_reports'
  | 'client_assets'
  | 'client_notes'
  | 'client_settings';
