import React from 'react';
import { FileText, Share2, Download, ExternalLink, Calendar, Plus } from 'lucide-react';
import { Client, ClientReport } from '../types/agency';
import { Button } from '../components/ui/Button';

interface ClientReportsViewProps {
  client: Client;
  reports: ClientReport[];
  onOpenNewReportModal: () => void;
}

export const ClientReportsView: React.FC<ClientReportsViewProps> = ({
  client,
  reports,
  onOpenNewReportModal
}) => {
  const clientReports = reports.filter(r => r.client_id === client.id);

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Client Generated Reports ({clientReports.length})</h2>
            <p className="text-xs text-zinc-400">Shareable executive summaries and PDF report deliverables for {client.name}</p>
          </div>
          <Button variant="primary" size="sm" onClick={onOpenNewReportModal} icon={<Plus className="w-3.5 h-3.5" />}>
            Generate Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clientReports.map((report) => (
            <div key={report.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <h3 className="text-xs font-semibold text-white">{report.title}</h3>
                    <span className="text-[11px] text-zinc-400 font-mono-num">
                      Period: {report.period_start} to {report.period_end}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                  {report.is_public ? 'Public Link Active' : 'Internal Only'}
                </span>
              </div>

              {report.summary_notes && (
                <p className="text-xs text-zinc-300 line-clamp-2 italic bg-zinc-950/60 p-2 rounded border border-zinc-800/80">
                  "{report.summary_notes}"
                </p>
              )}

              {/* Metrics Snapshot Grid */}
              <div className="grid grid-cols-3 gap-2 text-center p-2 bg-zinc-950 rounded border border-zinc-800/60 font-mono-num text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block">Spend</span>
                  <span className="font-bold text-white">${report.metrics_snapshot.spend.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">ROAS</span>
                  <span className="font-bold text-emerald-400">{report.metrics_snapshot.roas}x</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 block">Conversions</span>
                  <span className="font-bold text-white">{report.metrics_snapshot.conversions}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[10px] text-zinc-500 font-mono-num">
                  Token: {report.share_token.slice(0, 12)}...
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={<Share2 className="w-3 h-3" />}>
                    Copy Share Link
                  </Button>
                  <Button variant="outline" size="sm" icon={<Download className="w-3 h-3" />}>
                    PDF Export
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
