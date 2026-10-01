import React, { useState } from 'react';
import { BookOpen, Bookmark, Sparkles, Plus, Trash2, Calendar, FileText } from 'lucide-react';
import { WishRecord } from '../types';

interface CelestialGrimoireProps {
  savedWishes: WishRecord[];
  onDeleteWish: (id: string) => void;
  onPlayChime: () => void;
}

export const CelestialGrimoire: React.FC<CelestialGrimoireProps> = ({
  savedWishes,
  onDeleteWish,
  onPlayChime,
}) => {
  const [activeTab, setActiveTab] = useState<'lore' | 'wishes' | 'journal'>('lore');
  const [journalEntries, setJournalEntries] = useState<
    { id: string; title: string; body: string; date: string }[]
  >([
    {
      id: '1',
      title: 'Eve of the Twin Genies',
      body: 'I stood before the glowing fountain in the sanctuary courtyard. As I rubbed the June 17 lamp, Celestia appeared in a swirl of azure stardust...',
      date: 'June 17, 2026',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBody.trim()) return;

    onPlayChime();
    setJournalEntries([
      {
        id: Date.now().toString(),
        title: newTitle || 'Stargazing Entry',
        body: newBody,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
      ...journalEntries,
    ]);
    setNewTitle('');
    setNewBody('');
  };

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-amber-950/60 to-slate-950 border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            Sacred Tome of Stardust Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
            Celestial Tales &amp; Grimoire
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The leather-bound grimoire lies open upon a plush blue pillow beside the courtyard fountain. Explore the ancient lore, view your recorded wishes, and pen your stargazing thoughts.
          </p>
        </div>
      </section>

      {/* GRIMOIRE TABS */}
      <div className="flex items-center justify-center space-x-2 border-b border-amber-500/20 pb-4">
        {[
          { id: 'lore', label: 'Ancient Lore & Legends', icon: BookOpen },
          { id: 'wishes', label: `Saved Wish Ledger (${savedWishes.length})`, icon: Bookmark },
          { id: 'journal', label: 'Sanctuary Stargazing Journal', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                onPlayChime();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: ANCIENT LORE */}
      {activeTab === 'lore' && (
        <section className="bg-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Chapter I</span>
              <h2 className="font-serif text-2xl font-bold text-amber-200 mt-1">
                The Origins of June 17 &amp; June 18
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-serif">
              Long ago, under the alignment of the Solstice Constellation, two celestial spirits descended upon the desert courtyard. On June 17, Celestia emerged wrapped in sapphire moonlight, bearing the gift of intuitive clarity and peaceful union. On June 18, Aetherion awakened wrapped in golden flame, bearing the gift of creative passion and bold breakthroughs. Together, they forged two magical golden lamps to guard the Stardust Sanctuary for all eternity.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-900">
            <div className="border-b border-amber-500/20 pb-4">
              <span className="text-xs text-amber-400 font-bold uppercase tracking-widest">Chapter II</span>
              <h2 className="font-serif text-2xl font-bold text-amber-200 mt-1">
                The Golden Lamps &amp; Stardust Fountains
              </h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-serif">
              Whenever a traveler gently rubs the brass lamp sitting upon the carved marble pedestals, stardust particles ignite in the night air. The fountain waters reflect glowing lotus lanterns, sealing every pure intention into the cosmic ledger.
            </p>
          </div>
        </section>
      )}

      {/* TAB CONTENT: SAVED WISH LEDGER */}
      {activeTab === 'wishes' && (
        <section className="max-w-4xl mx-auto space-y-6">
          {savedWishes.length === 0 ? (
            <div className="bg-slate-950 border border-amber-500/20 rounded-3xl p-12 text-center text-slate-400 space-y-2">
              <Bookmark className="w-8 h-8 text-amber-400/60 mx-auto" />
              <p className="font-serif text-lg font-bold text-amber-200">No Wishes Saved Yet</p>
              <p className="text-xs text-slate-400">
                Visit the Genie Chamber to submit a wish and click &ldquo;Record in Grimoire&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedWishes.map((w) => (
                <div
                  key={w.id}
                  className="bg-slate-950 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4 relative"
                >
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <div className="flex items-center gap-2 text-xs text-amber-300 font-serif font-bold">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Wish for {w.category} by {w.seekerName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {w.date}
                      </span>
                      <button
                        onClick={() => onDeleteWish(w.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors"
                        title="Delete Wish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-slate-200 italic font-serif bg-slate-900 p-3 rounded-xl border border-slate-800">
                    &ldquo;{w.wishText}&rdquo;
                  </p>

                  <div className="bg-amber-950/40 p-4 rounded-xl border border-amber-500/20 space-y-2 text-xs">
                    <span className="font-serif font-bold text-amber-300 block">
                      Genie Prophecy ({w.genie}):
                    </span>
                    <p className="text-amber-100/90">{w.response.stardustGuidance}</p>
                    <span className="text-amber-400 font-semibold block pt-1">
                      Catalyst: {w.response.cosmicCatalyst}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* TAB CONTENT: STARGAZING JOURNAL */}
      {activeTab === 'journal' && (
        <section className="max-w-4xl mx-auto space-y-8">
          <form onSubmit={handleAddJournal} className="bg-slate-950 border border-amber-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" /> Write a New Sanctuary Entry
            </h3>

            <input
              type="text"
              placeholder="Entry Title (e.g. Midnight Reflection under June 18 Solstice)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-400"
            />

            <textarea
              rows={3}
              required
              placeholder="Record your thoughts, visions, and dreams..."
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-400 resize-none"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-serif font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Add Journal Entry
            </button>
          </form>

          <div className="space-y-4">
            {journalEntries.map((j) => (
              <div key={j.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-serif font-bold">
                  <span>{j.title}</span>
                  <span className="text-slate-500">{j.date}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-serif">{j.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
