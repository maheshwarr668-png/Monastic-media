import React from 'react';
import { FolderOpen, FileVideo, Image as ImageIcon, FileText, Download, Plus } from 'lucide-react';
import { Client, ClientAsset } from '../types/agency';
import { Button } from '../components/ui/Button';

interface ClientAssetsViewProps {
  client: Client;
  assets: ClientAsset[];
}

export const ClientAssetsView: React.FC<ClientAssetsViewProps> = ({ client, assets }) => {
  const clientAssets = assets.filter(a => a.client_id === client.id);

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Creative Asset Vault ({clientAssets.length})</h2>
            <p className="text-xs text-zinc-400">Ad creative videos, banners, copy scripts, and brand guidelines for {client.name}</p>
          </div>
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
            Upload Asset
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {clientAssets.map((asset) => (
            <div key={asset.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-3 hover:border-zinc-700 transition-all">
              <div className="aspect-video w-full rounded bg-zinc-950 overflow-hidden relative border border-zinc-800">
                <img src={asset.url} alt={asset.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 uppercase text-[10px] font-bold px-1.5 py-0.5 rounded bg-zinc-900/90 text-zinc-300 backdrop-blur-xs">
                  {asset.channel || asset.type}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div className="min-w-0 pr-2">
                  <h3 className="text-xs font-semibold text-white truncate" title={asset.name}>{asset.name}</h3>
                  <span className="text-[10px] text-zinc-500 font-mono-num">{asset.size} • Updated {asset.updated_at.slice(0, 10)}</span>
                </div>
                <Button variant="ghost" size="sm" icon={<Download className="w-3.5 h-3.5" />} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
