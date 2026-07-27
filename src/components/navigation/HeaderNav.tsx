import React from 'react';
import { Search, Calendar, RefreshCw, Plus, ChevronRight, Bell } from 'lucide-react';
import { Client, ActiveView } from '../../types/agency';
import { Button } from '../ui/Button';

interface HeaderNavProps {
  activeView: ActiveView;
  selectedClient: Client | null;
  onOpenCommandPalette: () => void;
  onOpenNewClientModal: () => void;
  onOpenNewReportModal: () => void;
  onTriggerSync: () => void;
  isSyncing: boolean;
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeView,
  selectedClient,
  onOpenCommandPalette,
  onOpenNewClientModal,
  onOpenNewReportModal,
  onTriggerSync,
  isSyncing,
  dateRange,
  setDateRange
}) => {
  const getBreadcrumbTitle = () => {
    switch (activeView) {
      case 'agency_dashboard': return 'Agency Command Center';
      case 'agency_clients': return 'Clients Directory';
      case 'agency_reports': return 'Executive Cross-Client Reports';
      case 'agency_team': return 'Team Management & Roles';
      case 'agency_settings': return 'Agency Settings & Audit Logs';
      case 'client_overview': return 'Overview & Key Metrics';
      case 'client_campaigns': return 'Multi-Channel Campaign Performance';
      case 'client_integrations': return 'Connected Integrations';
      case 'client_analytics': return 'Deep Analytics & Metrics';
      case 'client_reports': return 'Client Generated Reports';
      case 'client_assets': return 'Creative Assets Bank';
      case 'client_notes': return 'Strategy & Activity Notes';
      case 'client_settings': return 'Client Workspace Configuration';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-14 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-zinc-500 font-medium">Nexus Digital</span>
        <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
        
        {selectedClient && (
          <>
            <span className="text-zinc-300 font-medium">{selectedClient.name}</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          </>
        )}

        <span className="text-zinc-100 font-semibold">{getBreadcrumbTitle()}</span>
      </div>

      {/* Right Actions & Utilities */}
      <div className="flex items-center gap-3">
        {/* Date Range Selector */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded-md text-xs font-mono-num text-zinc-300">
          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer text-zinc-200"
          >
            <option value="7d" className="bg-zinc-900">Last 7 Days</option>
            <option value="30d" className="bg-zinc-900">Last 30 Days</option>
            <option value="90d" className="bg-zinc-900">Last 90 Days</option>
            <option value="year" className="bg-zinc-900">Year to Date</option>
          </select>
        </div>

        {/* Global Search / Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-md text-xs text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer font-mono-num"
        >
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <span>Search or command...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-zinc-800 text-zinc-300 rounded border border-zinc-700 font-semibold">
            ⌘K
          </kbd>
        </button>

        {/* Sync Integrations Trigger */}
        <Button
          variant="outline"
          size="sm"
          onClick={onTriggerSync}
          disabled={isSyncing}
          icon={<RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : 'text-zinc-400'}`} />}
        >
          {isSyncing ? 'Syncing...' : 'Sync'}
        </Button>

        {/* Primary Action Context Dependent */}
        {!selectedClient ? (
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewClientModal}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            New Client
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewReportModal}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Generate Report
          </Button>
        )}
      </div>
    </header>
  );
};
