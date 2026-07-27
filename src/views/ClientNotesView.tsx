import React, { useState } from 'react';
import { StickyNote, Plus, Clock, User } from 'lucide-react';
import { Client, ClientNote } from '../types/agency';
import { Button } from '../components/ui/Button';

interface ClientNotesViewProps {
  client: Client;
  notes: ClientNote[];
  onAddNote: (newNote: Omit<ClientNote, 'id' | 'created_at'>) => void;
}

export const ClientNotesView: React.FC<ClientNotesViewProps> = ({ client, notes, onAddNote }) => {
  const clientNotes = notes.filter(n => n.client_id === client.id);
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'strategy' | 'meeting' | 'urgent' | 'general'>('strategy');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddNote({
      client_id: client.id,
      author_name: 'Alexander Wright',
      title,
      content,
      category
    });
    setTitle('');
    setContent('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100">Strategy & Client Notes ({clientNotes.length})</h2>
            <p className="text-xs text-zinc-400">Tactical media buyer meeting notes, strategy changes, and action items for {client.name}</p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setIsAdding(!isAdding)} icon={<Plus className="w-3.5 h-3.5" />}>
            {isAdding ? 'Cancel' : 'New Note'}
          </Button>
        </div>

        {isAdding && (
          <form onSubmit={handleSubmit} className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg space-y-3">
            <h3 className="text-xs font-semibold text-white">Add New Tactical Note</h3>
            <input
              type="text"
              placeholder="Note Title (e.g. Q3 Budget Scaling Decision)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none"
              required
            />
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 focus:outline-none"
              >
                <option value="strategy">Strategy</option>
                <option value="meeting">Meeting Log</option>
                <option value="urgent">Urgent Action</option>
                <option value="general">General</option>
              </select>
            </div>
            <textarea
              placeholder="Detailed note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none h-24"
              required
            />
            <Button variant="primary" size="sm" type="submit">
              Save Note
            </Button>
          </form>
        )}

        <div className="space-y-3">
          {clientNotes.map((note) => (
            <div key={note.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                    note.category === 'urgent' ? 'bg-rose-950/60 text-rose-300 border-rose-800' :
                    note.category === 'strategy' ? 'bg-indigo-950/60 text-indigo-300 border-indigo-800' :
                    'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}>
                    {note.category}
                  </span>
                  <h3 className="text-xs font-semibold text-white">{note.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono-num">
                  <User className="w-3 h-3" />
                  <span>{note.author_name}</span>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{new Date(note.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-normal">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
