import React, { useState } from 'react';
import { X, FileText } from 'lucide-react';
import { Client, ClientReport } from '../../types/agency';
import { Button } from '../ui/Button';

interface NewReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client | null;
  onCreateReport: (reportData: Partial<ClientReport>) => void;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({
  isOpen,
  onClose,
  client,
  onCreateReport
}) => {
  const [title, setTitle] = useState('');
  const [summaryNotes, setSummaryNotes] = useState('');
  const [periodStart, setPeriodStart] = useState('2026-06-01');
  const [periodEnd, setPeriodEnd] = useState('2026-06-30');

  if (!isOpen || !client) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateReport({
      client_id: client.id,
      agency_id: client.agency_id,
      title: title || `${client.name} Executive Monthly Performance Report`,
      period_start: periodStart,
      period_end: periodEnd,
      summary_notes: summaryNotes,
      metrics_snapshot: {
        spend: client.total_spend_30d || 15000,
        roas: client.avg_roas_30d || 3.5,
        conversions: client.total_conversions_30d || 420,
        ctr: 2.65,
        cpc: 0.55
      },
      share_token: `rpt_${Math.random().toString(36).substr(2, 9)}`,
      is_public: true
    });

    setTitle('');
    setSummaryNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg glass-panel bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl overflow-hidden p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-400" />
            <h2 className="text-sm font-semibold text-white">Generate Executive Client Report</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded text-zinc-400 hover:text-zinc-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Report Title</label>
            <input
              type="text"
              placeholder={`${client.name} Q2 Executive Performance Overview`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Period Start</label>
              <input
                type="date"
                value={periodStart}
                onChange={(e) => setPeriodStart(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">Period End</label>
              <input
                type="date"
                value={periodEnd}
                onChange={(e) => setPeriodEnd(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1">Executive Summary Notes</label>
            <textarea
              placeholder="Highlight key campaign wins, ROAS achievements, and Q3 scaling recommendations..."
              value={summaryNotes}
              onChange={(e) => setSummaryNotes(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none h-24"
            />
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <Button variant="ghost" size="sm" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Generate & Publish Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
