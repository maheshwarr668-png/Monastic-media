-- AgencyOS Complete Supabase Database Migration
-- Version: 1.0.0

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Custom Enums
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'account_manager', 'media_buyer', 'client_viewer');
CREATE TYPE integration_platform AS ENUM ('meta_ads', 'google_ads', 'ga4', 'shopify', 'woocommerce', 'linkedin_ads', 'tiktok_ads');
CREATE TYPE integration_status AS ENUM ('connected', 'disconnected', 'expired', 'syncing', 'error');
CREATE TYPE campaign_status AS ENUM ('ACTIVE', 'PAUSED', 'ARCHIVED', 'COMPLETED');
CREATE TYPE channel_type AS ENUM ('meta', 'google', 'tiktok', 'linkedin');

-- 1. Agencies Table (Multi-tenancy root)
CREATE TABLE IF NOT EXISTS agencies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    primary_color VARCHAR(32) DEFAULT '#0F172A',
    currency VARCHAR(3) DEFAULT 'USD',
    timezone VARCHAR(64) DEFAULT 'UTC',
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 2. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role user_role DEFAULT 'media_buyer' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 3. Clients Table (Isolated Client Workspaces)
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    logo_url TEXT,
    website TEXT,
    industry VARCHAR(100),
    currency VARCHAR(3) DEFAULT 'USD',
    target_roas NUMERIC(5,2) DEFAULT 3.00,
    monthly_budget NUMERIC(12,2) DEFAULT 10000.00,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    UNIQUE(agency_id, slug)
);

-- 4. Client Integration Credentials & Status
CREATE TABLE IF NOT EXISTS client_integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    platform integration_platform NOT NULL,
    account_id VARCHAR(255) NOT NULL,
    account_name VARCHAR(255),
    status integration_status DEFAULT 'disconnected' NOT NULL,
    access_token_encrypted TEXT,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,
    last_sync_at TIMESTAMPTZ,
    error_message TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    UNIQUE(client_id, platform, account_id)
);

-- 5. Campaigns Table
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    integration_id UUID REFERENCES client_integrations(id) ON DELETE SET NULL,
    external_campaign_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    channel channel_type NOT NULL,
    status campaign_status DEFAULT 'ACTIVE' NOT NULL,
    objective VARCHAR(100),
    daily_budget NUMERIC(12,2) DEFAULT 0.00,
    lifetime_budget NUMERIC(12,2) DEFAULT 0.00,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ,
    UNIQUE(client_id, channel, external_campaign_id)
);

-- 6. Daily Campaign Metrics Table
CREATE TABLE IF NOT EXISTS campaign_daily_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    impressions BIGINT DEFAULT 0 NOT NULL,
    clicks BIGINT DEFAULT 0 NOT NULL,
    spend NUMERIC(12,2) DEFAULT 0.00 NOT NULL,
    conversions INT DEFAULT 0 NOT NULL,
    conversion_value NUMERIC(12,2) DEFAULT 0.00 NOT NULL,
    ctr NUMERIC(6,4) GENERATED ALWAYS AS (CASE WHEN impressions > 0 THEN (clicks::numeric / impressions::numeric) * 100 ELSE 0 END) STORED,
    cpc NUMERIC(10,2) GENERATED ALWAYS AS (CASE WHEN clicks > 0 THEN (spend / clicks) ELSE 0 END) STORED,
    roas NUMERIC(10,2) GENERATED ALWAYS AS (CASE WHEN spend > 0 THEN (conversion_value / spend) ELSE 0 END) STORED,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    UNIQUE(campaign_id, date)
);

-- 7. Client Reports Table
CREATE TABLE IF NOT EXISTS client_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    summary_notes TEXT,
    metrics_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    share_token VARCHAR(64) UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    deleted_at TIMESTAMPTZ
);

-- 8. Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    payload JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Row Level Security Policies
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION current_user_agency_id()
RETURNS UUID AS $$
  SELECT agency_id FROM profiles WHERE id = auth.uid() AND deleted_at IS NULL LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

CREATE POLICY profiles_isolation ON profiles FOR ALL USING (agency_id = current_user_agency_id());
CREATE POLICY clients_isolation ON clients FOR ALL USING (agency_id = current_user_agency_id());
CREATE POLICY client_integrations_isolation ON client_integrations FOR ALL USING (agency_id = current_user_agency_id());
CREATE POLICY campaigns_isolation ON campaigns FOR ALL USING (agency_id = current_user_agency_id());
CREATE POLICY campaign_daily_metrics_isolation ON campaign_daily_metrics FOR ALL USING (agency_id = current_user_agency_id());
CREATE POLICY client_reports_isolation ON client_reports FOR ALL USING (agency_id = current_user_agency_id());
CREATE POLICY audit_logs_isolation ON audit_logs FOR ALL USING (agency_id = current_user_agency_id());
