import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, Mail, Check } from 'lucide-react';
import { Profile, UserRole } from '../types/agency';
import { Button } from '../components/ui/Button';

interface AgencyTeamViewProps {
  profiles: Profile[];
  onInviteMember: (member: Omit<Profile, 'id' | 'agency_id' | 'created_at'>) => void;
}

export const AgencyTeamView: React.FC<AgencyTeamViewProps> = ({ profiles, onInviteMember }) => {
  const [isInviting, setIsInviting] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('media_buyer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    onInviteMember({
      full_name: fullName,
      email,
      role
    });
    setFullName('');
    setEmail('');
    setIsInviting(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Agency Team & Access Provisioning ({profiles.length})</h2>
            <p className="text-xs text-zinc-400">Manage media buyers, account managers, and role permissions across client accounts</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsInviting(!isInviting)} icon={<UserPlus className="w-3.5 h-3.5" />}>
            {isInviting ? 'Cancel' : 'Invite Team Member'}
          </Button>
        </div>

        {isInviting && (
          <form onSubmit={handleSubmit} className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg space-y-3">
            <h3 className="text-xs font-semibold text-white">Invite New Team Member</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Full Name (e.g. David Miller)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white focus:outline-none"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-xs text-zinc-300 focus:outline-none"
              >
                <option value="media_buyer">Media Buyer</option>
                <option value="account_manager">Account Manager</option>
                <option value="admin">Agency Admin</option>
                <option value="owner">Agency Owner</option>
              </select>
            </div>
            <Button variant="primary" size="sm" type="submit">
              Send Invite Link
            </Button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={profile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-700"
                />
                <div>
                  <h3 className="text-xs font-semibold text-white">{profile.full_name}</h3>
                  <span className="text-[11px] text-zinc-400 font-mono-num">{profile.email}</span>
                </div>
              </div>

              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                {profile.role.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
