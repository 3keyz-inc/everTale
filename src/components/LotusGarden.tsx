import React, { useState } from 'react';
import { Flower2, Sparkles, Send, Heart, Droplets, Moon } from 'lucide-react';
import { FloatingLotus } from '../types';

interface LotusGardenProps {
  onAddStardust: (amount: number) => void;
  onPlayChime: () => void;
}

export const LotusGarden: React.FC<LotusGardenProps> = ({ onAddStardust, onPlayChime }) => {
  const [lotuses, setLotuses] = useState<FloatingLotus[]>([
    { id: '1', seeker: 'Celestia Fan', intention: 'May peace and joy blossom in every heart.', color: 'from-cyan-400 to-blue-600', x: 20, y: 35, speed: 1 },
    { id: '2', seeker: 'June 18 Traveler', intention: 'Sending love across the stars to my soulmate.', color: 'from-amber-300 to-amber-600', x: 55, y: 60, speed: 1.2 },
    { id: '3', seeker: 'Stardust Seeker', intention: 'Grant us clarity and creative light for our sanctuary.', color: 'from-teal-300 to-indigo-600', x: 75, y: 25, speed: 0.8 },
    { id: '4', seeker: 'June 17 Guardian', intention: 'Eternal gratitude for wisdom and protection.', color: 'from-purple-400 to-indigo-600', x: 35, y: 70, speed: 1.1 },
  ]);

  const [seekerName, setSeekerName] = useState('');
  const [intentionText, setIntentionText] = useState('');
  const [selectedLotusColor, setSelectedLotusColor] = useState('from-cyan-400 to-indigo-600');
  const [activeLotus, setActiveLotus] = useState<FloatingLotus | null>(null);

  const colors = [
    { label: 'Azure Cyan', value: 'from-cyan-400 to-indigo-600' },
    { label: 'Golden Ember', value: 'from-amber-300 to-amber-600' },
    { label: 'Emerald Dew', value: 'from-emerald-300 to-teal-600' },
    { label: 'Stardust Violet', value: 'from-purple-400 to-indigo-700' },
  ];

  const handleReleaseLotus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentionText.trim()) return;

    onPlayChime();
    const newLotus: FloatingLotus = {
      id: Date.now().toString(),
      seeker: seekerName || 'Anonymous Traveler',
      intention: intentionText,
      color: selectedLotusColor,
      x: Math.floor(Math.random() * 60) + 20,
      y: Math.floor(Math.random() * 50) + 25,
      speed: 0.9,
    };

    setLotuses([newLotus, ...lotuses]);
    setIntentionText('');
    onAddStardust(15);
  };

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-teal-950/60 to-slate-950 border border-teal-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-wider uppercase">
            <Flower2 className="w-3.5 h-3.5 text-teal-300" />
            Reflection Pond &amp; Firefly Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-teal-200 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
            The Enchanted Lotus Garden
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            In this serene nocturnal sanctuary under the crescent moon, release your glowing lotus lantern into the fountain waters. Each petal carries an intention into the universe.
          </p>
        </div>
      </section>

      {/* INTERACTIVE FOUNTAIN POOL & FLOATING LOTUS LANTERNS */}
      <section className="relative h-96 sm:h-[480px] rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 border-2 border-teal-500/40 p-6 shadow-2xl overflow-hidden">
        {/* Moon & Palace Silhouette Background Art */}
        <div className="absolute top-4 right-8 flex items-center gap-2 text-amber-200/40 font-serif text-xs">
          <Moon className="w-8 h-8 text-amber-300/60" />
          <span>June 17 &amp; 18 Starlight</span>
        </div>

        {/* Water Ripple Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950/90 to-slate-950 pointer-events-none" />

        {/* Floating Lotuses */}
        <div className="relative w-full h-full">
          {lotuses.map((lotus) => (
            <button
              key={lotus.id}
              onClick={() => {
                setActiveLotus(lotus);
                onPlayChime();
              }}
              style={{ top: `${lotus.y}%`, left: `${lotus.x}%` }}
              className="absolute group transition-transform duration-500 hover:scale-125 focus:outline-none"
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing Aura Ring */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${lotus.color} opacity-40 blur-md group-hover:opacity-80 transition-opacity animate-pulse`} />
                {/* Lotus Icon */}
                <div className={`absolute inset-0 flex items-center justify-center text-white drop-shadow-[0_0_10px_rgba(56,189,248,0.8)]`}>
                  <Flower2 className="w-8 h-8 text-cyan-200 animate-bounce" style={{ animationDuration: '4s' }} />
                </div>
                {/* Seeker Label */}
                <span className="mt-1 px-2 py-0.5 rounded-full bg-slate-900/90 text-[10px] text-teal-200 border border-teal-500/30 whitespace-nowrap font-serif">
                  {lotus.seeker}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Instruction Footer */}
        <div className="absolute bottom-4 left-6 right-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs rounded-full backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Click any floating lotus lantern to read its message
          </span>
        </div>
      </section>

      {/* MODAL / CARD FOR SELECTED LOTUS */}
      {activeLotus && (
        <div className="bg-slate-900 border border-teal-400/40 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto relative animate-fade-in">
          <button
            onClick={() => setActiveLotus(null)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg"
          >
            ✕ Close
          </button>
          <div className="flex items-center gap-2 text-teal-300 font-serif text-sm font-semibold mb-2">
            <Flower2 className="w-4 h-4" />
            <span>Lotus Lantern by {activeLotus.seeker}</span>
          </div>
          <p className="text-amber-100 text-base italic font-serif leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-teal-500/20">
            &ldquo;{activeLotus.intention}&rdquo;
          </p>
        </div>
      )}

      {/* RELEASE A LOTUS FORM */}
      <section className="bg-slate-950 border border-teal-500/20 rounded-3xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-teal-300 font-serif text-lg font-bold">
          <Droplets className="w-5 h-5" />
          <h2>Release Your Personal Lotus Intention</h2>
        </div>

        <form onSubmit={handleReleaseLotus} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lotus-seeker-name" className="block text-xs font-medium text-teal-200/80 mb-1">
                Your Name
              </label>
              <input
                id="lotus-seeker-name"
                type="text"
                placeholder="e.g. Celestial Traveler"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-teal-100 text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-teal-200/80 mb-1">
                Lantern Aura Color
              </label>
              <select
                value={selectedLotusColor}
                onChange={(e) => setSelectedLotusColor(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-teal-100 text-sm focus:outline-none focus:border-teal-400"
              >
                {colors.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="lotus-intention-text" className="block text-xs font-medium text-teal-200/80 mb-1">
              Your Blessing / Intention
            </label>
            <textarea
              id="lotus-intention-text"
              rows={2}
              required
              placeholder="e.g. May joy and good health shine upon my family and friends this year..."
              value={intentionText}
              onChange={(e) => setIntentionText(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-teal-100 text-sm focus:outline-none focus:border-teal-400 resize-none"
            />
          </div>

          <button
            id="release-lotus-button"
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-slate-950 font-serif font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4 text-slate-950" />
            <span>Cast Lotus Lantern into Garden Pool (+15 Stardust)</span>
          </button>
        </form>
      </section>
    </div>
  );
};
