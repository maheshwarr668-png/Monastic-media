import React from 'react';
import { 
  Building2, 
  Users, 
  FileText, 
  Settings, 
  LayoutDashboard, 
  Megaphone, 
  Plug, 
  BarChart3, 
  FolderOpen, 
  StickyNote, 
  ChevronLeft,
  Briefcase
} from 'lucide-react';
import { Client, ActiveView } from '../../types/agency';

interface SidebarNavProps {
  activeView: ActiveView;
  selectedClient: Client | null;
  onNavigateAgency: (view: ActiveView) => void;
  onNavigateClient: (clientId: string, view: ActiveView) => void;
  onBackToAgency: () => void;
  clients: Client[];
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeView,
  selectedClient,
  onNavigateAgency,
  onNavigateClient,
  onBackToAgency,
  clients
}) => {
  const isClientScope = Boolean(selectedClient);

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 select-none">
      {/* Brand & Scope Header */}
      <div>
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-zinc-100 to-zinc-400 flex items-center justify-center font-bold text-zinc-950 text-sm tracking-tighter">
              OS
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-zinc-100 tracking-tight leading-none">AgencyOS</span>
              <span className="text-[10px] text-zinc-500 font-mono-num leading-tight mt-0.5">Enterprise v1.0</span>
            </div>
          </div>
        </div>

        {/* Workspace Context Switcher Banner */}
        {isClientScope && selectedClient ? (
          <div className="p-3 bg-zinc-900/60 border-b border-zinc-800/80">
            <button
              onClick={onBackToAgency}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-2 transition-colors group cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Agency OS</span>
            </button>
            <div className="flex items-center gap-2.5 p-2 bg-zinc-900 border border-zinc-700/60 rounded-md">
              <img src={selectedClient.logo_url} alt="" className="w-6 h-6 rounded object-cover" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">{selectedClient.name}</span>
                <span className="text-[10px] text-zinc-400 truncate font-mono-num">{selectedClient.industry}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-4 py-3 border-b border-zinc-800/80">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              Agency Workspace
            </span>
            <div className="mt-1 text-xs font-medium text-zinc-200">
              Nexus Digital Media
            </div>
          </div>
        )}

        {/* Navigation Item Lists */}
        <nav className="p-3 space-y-6">
          {/* Scope 1: Agency Level Menu */}
          {!isClientScope && (
            <div>
              <span className="px-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                Agency
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => onNavigateAgency('agency_dashboard')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'agency_dashboard' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => onNavigateAgency('agency_clients')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'agency_clients' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Briefcase className="w-4 h-4" />
                    <span>Clients</span>
                  </div>
                  <span className="text-[10px] font-mono-num px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">{clients.length}</span>
                </button>

                <button
                  onClick={() => onNavigateAgency('agency_reports')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'agency_reports' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Reports</span>
                </button>

                <button
                  onClick={() => onNavigateAgency('agency_team')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'agency_team' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Team</span>
                </button>

                <button
                  onClick={() => onNavigateAgency('agency_settings')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'agency_settings' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* Scope 2: Client Isolated Workspace Menu */}
          {isClientScope && selectedClient && (
            <div>
              <span className="px-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                Client Workspace
              </span>
              <div className="space-y-1">
                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_overview')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_overview' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_campaigns')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_campaigns' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Megaphone className="w-4 h-4 text-indigo-400" />
                    <span>Campaigns</span>
                  </div>
                  <span className="text-[10px] font-mono-num px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                    {selectedClient.active_campaigns_count}
                  </span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_integrations')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_integrations' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Plug className="w-4 h-4 text-emerald-400" />
                    <span>Integrations</span>
                  </div>
                  <span className="text-[10px] font-mono-num px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                    {selectedClient.connected_platforms_count}
                  </span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_analytics')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_analytics' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-amber-400" />
                  <span>Analytics</span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_reports')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_reports' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <FileText className="w-4 h-4 text-rose-400" />
                  <span>Reports</span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_assets')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_assets' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 text-cyan-400" />
                  <span>Assets</span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_notes')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_notes' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <StickyNote className="w-4 h-4 text-purple-400" />
                  <span>Notes</span>
                </button>

                <button
                  onClick={() => onNavigateClient(selectedClient.id, 'client_settings')}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeView === 'client_settings' 
                      ? 'bg-zinc-800 text-white font-semibold shadow-xs' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <Settings className="w-4 h-4 text-zinc-400" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Client Switcher List (If in Agency View) */}
          {!isClientScope && clients.length > 0 && (
            <div>
              <span className="px-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                Clients List
              </span>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {clients.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onNavigateClient(c.id, 'client_overview')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={c.logo_url} alt="" className="w-4 h-4 rounded object-cover shrink-0" />
                      <span className="truncate">{c.name}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono-num font-semibold">{c.avg_roas_30d}x</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-zinc-800/80 bg-zinc-950">
        <div className="flex items-center justify-between p-2 rounded-md hover:bg-zinc-900 transition-colors">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alexander Wright"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-700"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-zinc-200 truncate">Alexander Wright</span>
              <span className="text-[10px] text-zinc-500 truncate font-mono-num uppercase">Agency Owner</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
