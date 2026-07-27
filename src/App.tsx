import React, { useState } from 'react';
import { ActiveView, Client, Campaign, ClientIntegration, Profile, ClientReport, ClientAsset, ClientNote, AuditLog, IntegrationPlatform } from './types/agency';
import { 
  INITIAL_AGENCY, 
  INITIAL_PROFILES, 
  INITIAL_CLIENTS, 
  INITIAL_INTEGRATIONS, 
  INITIAL_CAMPAIGNS, 
  INITIAL_REPORTS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_ASSETS, 
  INITIAL_NOTES 
} from './services/mockData';

// Layout Navigation Components
import { SidebarNav } from './components/navigation/SidebarNav';
import { HeaderNav } from './components/navigation/HeaderNav';
import { CommandPalette } from './components/ui/CommandPalette';

// Modals
import { NewClientModal } from './components/modals/NewClientModal';
import { NewReportModal } from './components/modals/NewReportModal';

// Views
import { AgencyDashboardView } from './views/AgencyDashboardView';
import { AgencyClientsView } from './views/AgencyClientsView';
import { AgencyReportsView } from './views/AgencyReportsView';
import { AgencyTeamView } from './views/AgencyTeamView';
import { AgencySettingsView } from './views/AgencySettingsView';

import { ClientOverviewView } from './views/ClientOverviewView';
import { ClientCampaignsView } from './views/ClientCampaignsView';
import { ClientIntegrationsView } from './views/ClientIntegrationsView';
import { ClientAnalyticsView } from './views/ClientAnalyticsView';
import { ClientReportsView } from './views/ClientReportsView';
import { ClientAssetsView } from './views/ClientAssetsView';
import { ClientNotesView } from './views/ClientNotesView';
import { ClientSettingsView } from './views/ClientSettingsView';

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('agency_dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Application Domain State
  const [agency, setAgency] = useState(INITIAL_AGENCY);
  const [profiles, setProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [integrations, setIntegrations] = useState<ClientIntegration[]>(INITIAL_INTEGRATIONS);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [reports, setReports] = useState<ClientReport[]>(INITIAL_REPORTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [assets, setAssets] = useState<ClientAsset[]>(INITIAL_ASSETS);
  const [notes, setNotes] = useState<ClientNote[]>(INITIAL_NOTES);

  // Utility state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [dateRange, setDateRange] = useState('30d');

  const selectedClient = clients.find(c => c.id === selectedClientId) || null;

  // Navigation Handlers
  const handleSelectClient = (clientId: string, view: ActiveView = 'client_overview') => {
    setSelectedClientId(clientId);
    setActiveView(view);
  };

  const handleNavigateAgency = (view: ActiveView) => {
    setSelectedClientId(null);
    setActiveView(view);
  };

  const handleBackToAgency = () => {
    setSelectedClientId(null);
    setActiveView('agency_dashboard');
  };

  // Campaign Controls
  const handleToggleCampaignStatus = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const nextStatus = c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  const handleUpdateCampaignBudget = (campaignId: string, newBudget: number) => {
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, daily_budget: newBudget } : c));
  };

  // Integrations Handlers
  const handleConnectPlatform = (platform: IntegrationPlatform) => {
    if (!selectedClient) return;
    
    // Check if exists
    const existing = integrations.find(i => i.client_id === selectedClient.id && i.platform === platform);
    
    if (existing) {
      // Re-authorize
      setIntegrations(prev => prev.map(i => i.id === existing.id ? { 
        ...i, 
        status: 'connected', 
        error_message: undefined,
        last_sync_at: new Date().toISOString() 
      } : i));
    } else {
      // Add new integration
      const newInt: ClientIntegration = {
        id: `int-${Date.now()}`,
        client_id: selectedClient.id,
        agency_id: agency.id,
        platform,
        account_id: `act_${Math.floor(100000000 + Math.random() * 900000000)}`,
        account_name: `${selectedClient.name} ${platform.replace('_', ' ').toUpperCase()}`,
        status: 'connected',
        last_sync_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setIntegrations(prev => [newInt, ...prev]);
    }
  };

  const handleSyncPlatform = (integrationId: string) => {
    setIntegrations(prev => prev.map(i => i.id === integrationId ? {
      ...i,
      status: 'syncing',
      last_sync_at: new Date().toISOString()
    } : i));

    setTimeout(() => {
      setIntegrations(prev => prev.map(i => i.id === integrationId ? {
        ...i,
        status: 'connected',
        error_message: undefined
      } : i));
    }, 1000);
  };

  const handleGlobalSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIntegrations(prev => prev.map(i => ({ ...i, last_sync_at: new Date().toISOString() })));
      setIsSyncing(false);
    }, 1200);
  };

  // Onboarding & Creation Handlers
  const handleCreateClient = (newClientData: Partial<Client>) => {
    const newClient: Client = {
      id: `client-${Date.now()}`,
      agency_id: agency.id,
      name: newClientData.name!,
      slug: newClientData.slug!,
      industry: newClientData.industry!,
      website: newClientData.website,
      currency: 'USD',
      target_roas: newClientData.target_roas || 3.5,
      monthly_budget: newClientData.monthly_budget || 25000,
      logo_url: newClientData.logo_url,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_spend_30d: 0,
      total_conversions_30d: 0,
      avg_roas_30d: newClientData.target_roas || 3.5,
      active_campaigns_count: 0,
      connected_platforms_count: 0
    };
    setClients(prev => [newClient, ...prev]);
    handleSelectClient(newClient.id, 'client_overview');
  };

  const handleCreateReport = (reportData: Partial<ClientReport>) => {
    const newReport: ClientReport = reportData as ClientReport;
    setReports(prev => [newReport, ...prev]);
  };

  const handleInviteMember = (memberData: Omit<Profile, 'id' | 'agency_id' | 'created_at'>) => {
    const newProf: Profile = {
      id: `user-${Date.now()}`,
      agency_id: agency.id,
      full_name: memberData.full_name,
      email: memberData.email,
      role: memberData.role,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      created_at: new Date().toISOString()
    };
    setProfiles(prev => [...prev, newProf]);
  };

  const handleAddNote = (newNoteData: Omit<ClientNote, 'id' | 'created_at'>) => {
    const note: ClientNote = {
      id: `note-${Date.now()}`,
      ...newNoteData,
      created_at: new Date().toISOString()
    };
    setNotes(prev => [note, ...prev]);
  };

  const handleUpdateClientSettings = (updated: Partial<Client>) => {
    if (!selectedClientId) return;
    setClients(prev => prev.map(c => c.id === selectedClientId ? { ...c, ...updated } : c));
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <SidebarNav
        activeView={activeView}
        selectedClient={selectedClient}
        onNavigateAgency={handleNavigateAgency}
        onNavigateClient={handleSelectClient}
        onBackToAgency={handleBackToAgency}
        clients={clients}
      />

      {/* Main Content View Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Nav */}
        <HeaderNav
          activeView={activeView}
          selectedClient={selectedClient}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenNewClientModal={() => setIsNewClientModalOpen(true)}
          onOpenNewReportModal={() => setIsNewReportModalOpen(true)}
          onTriggerSync={handleGlobalSync}
          isSyncing={isSyncing}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        {/* View Router Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Scope 1: Agency Views */}
            {activeView === 'agency_dashboard' && (
              <AgencyDashboardView
                clients={clients}
                campaigns={campaigns}
                integrations={integrations}
                onSelectClient={handleSelectClient}
                onOpenNewClientModal={() => setIsNewClientModalOpen(true)}
              />
            )}

            {activeView === 'agency_clients' && (
              <AgencyClientsView
                clients={clients}
                campaigns={campaigns}
                integrations={integrations}
                onSelectClient={handleSelectClient}
                onOpenNewClientModal={() => setIsNewClientModalOpen(true)}
              />
            )}

            {activeView === 'agency_reports' && (
              <AgencyReportsView
                reports={reports}
                clients={clients}
              />
            )}

            {activeView === 'agency_team' && (
              <AgencyTeamView
                profiles={profiles}
                onInviteMember={handleInviteMember}
              />
            )}

            {activeView === 'agency_settings' && (
              <AgencySettingsView
                agency={agency}
                auditLogs={auditLogs}
              />
            )}

            {/* Scope 2: Client Isolated Workspace Views */}
            {selectedClient && (
              <>
                {activeView === 'client_overview' && (
                  <ClientOverviewView
                    client={selectedClient}
                    campaigns={campaigns}
                    integrations={integrations}
                    onNavigateView={(v) => setActiveView(v)}
                  />
                )}

                {activeView === 'client_campaigns' && (
                  <ClientCampaignsView
                    client={selectedClient}
                    campaigns={campaigns}
                    onToggleStatus={handleToggleCampaignStatus}
                    onUpdateBudget={handleUpdateCampaignBudget}
                  />
                )}

                {activeView === 'client_integrations' && (
                  <ClientIntegrationsView
                    client={selectedClient}
                    integrations={integrations}
                    onConnectPlatform={handleConnectPlatform}
                    onSyncPlatform={handleSyncPlatform}
                  />
                )}

                {activeView === 'client_analytics' && (
                  <ClientAnalyticsView
                    client={selectedClient}
                    campaigns={campaigns}
                  />
                )}

                {activeView === 'client_reports' && (
                  <ClientReportsView
                    client={selectedClient}
                    reports={reports}
                    onOpenNewReportModal={() => setIsNewReportModalOpen(true)}
                  />
                )}

                {activeView === 'client_assets' && (
                  <ClientAssetsView
                    client={selectedClient}
                    assets={assets}
                  />
                )}

                {activeView === 'client_notes' && (
                  <ClientNotesView
                    client={selectedClient}
                    notes={notes}
                    onAddNote={handleAddNote}
                  />
                )}

                {activeView === 'client_settings' && (
                  <ClientSettingsView
                    client={selectedClient}
                    onUpdateClient={handleUpdateClientSettings}
                  />
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Global Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        clients={clients}
        campaigns={campaigns}
        onSelectClient={handleSelectClient}
        onSelectAgencyView={handleNavigateAgency}
      />

      {/* Onboard New Client Drawer / Modal */}
      <NewClientModal
        isOpen={isNewClientModalOpen}
        onClose={() => setIsNewClientModalOpen(false)}
        onCreateClient={handleCreateClient}
      />

      {/* Generate Executive Report Modal */}
      <NewReportModal
        isOpen={isNewReportModalOpen}
        onClose={() => setIsNewReportModalOpen(false)}
        client={selectedClient || clients[0]}
        onCreateReport={handleCreateReport}
      />
    </div>
  );
}

export default App;
