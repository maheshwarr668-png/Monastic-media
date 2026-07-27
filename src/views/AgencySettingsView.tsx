import React from 'react';
import { ShieldCheck, Lock, History, Settings } from 'lucide-react';
import { Agency, AuditLog } from '../types/agency';

interface AgencySettingsViewProps {
  agency: Agency;
  auditLogs: AuditLog[];
}

export const AgencySettingsView: React.FC<AgencySettingsViewProps> = ({ agency, auditLogs }) => {
  return (
    <div className="space-y-6">
      {/* Global Agency Config */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Agency Organization Profile</h2>
            <p className="text-xs text-zinc-400">Global configuration for {agency.name}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-num">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
            <span className="text-zinc-500 block text-[10px]">Organization Slug</span>
            <span className="text-white font-bold">{agency.slug}</span>
          </div>
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
            <span className="text-zinc-500 block text-[10px]">Base Currency</span>
            <span className="text-white font-bold">{agency.currency}</span>
          </div>
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded">
            <span className="text-zinc-500 block text-[10px]">Timezone</span>
            <span className="text-white font-bold">{agency.timezone}</span>
          </div>
        </div>
      </div>

      {/* Enterprise Audit Log Table */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-semibold text-zinc-100">Enterprise Security Audit Logs</h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono-num">Encrypted Immutable Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900/80 text-zinc-400 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="px-3 py-2.5">Timestamp</th>
                <th className="px-3 py-2.5">Actor</th>
                <th className="px-3 py-2.5">Action</th>
                <th className="px-3 py-2.5">Resource</th>
                <th className="px-3 py-2.5">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 font-mono-num">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-850/60 transition-colors">
                  <td className="px-3 py-2.5 text-zinc-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-3 py-2.5 font-medium text-white">
                    {log.actor_name}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-zinc-300">
                    {log.resource_name}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-500">
                    {log.ip_address}
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
