import React from 'react';
import { FileText, Share2, Download, ExternalLink } from 'lucide-react';
import { Client, ClientReport } from '../types/agency';

interface AgencyReportsViewProps {
  reports: ClientReport[];
  clients: Client[];
}

export const AgencyReportsView: React.FC<AgencyReportsViewProps> = ({ reports, clients }) => {
  return (
    <div className="space-y-6">
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Cross-Client Executive Reports Directory ({reports.length})</h2>
            <p className="text-xs text-zinc-400">All generated performance summaries and client deliverable documents</p>
          </div>
        </div>

        <div className="space-y-3">
          {reports.map((report) => {
            const client = clients.find(c => c.id === report.client_id);
            return (
              <div key={report.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <h3 className="text-xs font-semibold text-white">{report.title}</h3>
                    <span className="text-[11px] text-zinc-400 font-mono-num">
                      Client: {client?.name || 'Client Workspace'} • Period: {report.period_start} to {report.period_end}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right font-mono-num text-xs">
                  <div>
                    <span className="text-emerald-400 font-bold">{report.metrics_snapshot.roas}x ROAS</span>
                    <span className="text-[10px] text-zinc-500 block">${report.metrics_snapshot.spend.toLocaleString()} Spend</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
