import React, { useState } from 'react';
import { Compass, Sparkles, Eye, RefreshCw, Star, Zap } from 'lucide-react';
import { CosmicOrb } from '../types';

interface CosmicObservatoryProps {
  onAddStardust: (amount: number) => void;
  onPlayChime: () => void;
}

export const CosmicObservatory: React.FC<CosmicObservatoryProps> = ({ onAddStardust, onPlayChime }) => {
  const [orbs] = useState<CosmicOrb[]>([
    {
      id: 'orb-june17',
      name: 'Sphere of June 17 (Celestia)',
      constellation: 'Lyra the Celestial Harp',
      color: 'text-cyan-300',
      gradient: 'from-cyan-400 via-indigo-600 to-blue-900',
    },
    {
      id: 'orb-june18',
      name: 'Sphere of June 18 (Aetherion)',
      constellation: 'Aethelgard the Golden Phoenix',
      color: 'text-amber-300',
      gradient: 'from-amber-400 via-indigo-600 to-amber-950',
    },
    {
      id: 'orb-stardust',
      name: 'Orb of Cosmic Stardust',
      constellation: 'Cassiopeia & Galaxy Core',
      color: 'text-purple-300',
      gradient: 'from-purple-400 via-indigo-800 to-slate-950',
    },
    {
      id: 'orb-solstice',
      name: 'Orb of Solstices & Miracles',
      constellation: 'Orion Celestial Belt',
      color: 'text-emerald-300',
      gradient: 'from-emerald-400 via-teal-700 to-slate-950',
    },
  ]);

  const [selectedOrb, setSelectedOrb] = useState<CosmicOrb>(orbs[0]);
  const [isReading, setIsReading] = useState(false);
  const [readingResult, setReadingResult] = useState<any>(null);

  const handleConsultOrb = async (orb: CosmicOrb) => {
    setSelectedOrb(orb);
    setIsReading(true);
    setReadingResult(null);
    onPlayChime();

    try {
      const res = await fetch('/api/cosmic-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orbName: orb.name, constellation: orb.constellation }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        setReadingResult(data.result);
        onAddStardust(20);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* SECTION HEADER */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wider uppercase">
            <Compass className="w-3.5 h-3.5 text-indigo-300" />
            Galactic Dome &amp; Crystal Sphere Chamber
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-200 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
            The Cosmic Observatory
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Beneath the stargazing dome of the Sanctuary, crystal globes rest upon golden pillars. Select a sphere to peer into the galaxy and receive planetary horoscopes.
          </p>
        </div>
      </section>

      {/* ORBS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {orbs.map((orb) => {
          const isSelected = selectedOrb.id === orb.id;
          return (
            <button
              key={orb.id}
              id={orb.id}
              onClick={() => handleConsultOrb(orb)}
              className={`relative bg-slate-900 border rounded-2xl p-6 flex flex-col items-center text-center space-y-4 transition-all duration-300 group cursor-pointer ${
                isSelected
                  ? 'border-indigo-400 shadow-2xl shadow-indigo-500/20 bg-slate-900/90 scale-105'
                  : 'border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/60'
              }`}
            >
              {/* Sphere Graphic */}
              <div className="relative w-28 h-28 rounded-full bg-slate-950 p-1 flex items-center justify-center shadow-inner overflow-hidden">
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-tr ${orb.gradient} shadow-lg flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent)] pointer-events-none" />
                  <Eye className="w-8 h-8 text-white/80 animate-pulse" />
                </div>
              </div>

              <div>
                <h3 className={`font-serif text-base font-bold ${orb.color}`}>{orb.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{orb.constellation}</p>
              </div>

              <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Peer Into Orb
              </span>
            </button>
          );
        })}
      </section>

      {/* PROPHECY DISPLAY CARD */}
      <section className="bg-slate-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Active Crystal Reading
            </span>
            <h2 className="font-serif text-2xl font-bold text-indigo-200 mt-1">
              {selectedOrb.name}
            </h2>
          </div>
          <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs rounded-full">
            {selectedOrb.constellation}
          </span>
        </div>

        {isReading ? (
          <div className="py-12 flex flex-col items-center justify-center text-indigo-300 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
            <p className="font-serif text-sm">Aligning planetary orbits &amp; gazing into the stardust...</p>
          </div>
        ) : readingResult ? (
          <div className="space-y-6 animate-fade-in">
            <div className="p-4 bg-indigo-950/60 border border-indigo-500/30 rounded-2xl">
              <h3 className="font-serif text-lg font-bold text-amber-300">
                {readingResult.title}
              </h3>
              <p className="text-slate-200 text-sm leading-relaxed mt-2">
                {readingResult.prophecy}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block font-medium">Aura Resonance</span>
                <span className="text-amber-300 font-bold text-sm">{readingResult.auraColor}</span>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block font-medium">Celestial Sign</span>
                <span className="text-cyan-300 font-bold text-sm">{readingResult.celestialSign}</span>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-slate-400 block font-medium">Lucky Stardust Numbers</span>
                <span className="text-indigo-300 font-bold text-sm">
                  {readingResult.luckyNumbers?.join(', ')}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400 text-sm">
            Select any crystal orb above to begin your cosmic reading.
          </div>
        )}
      </section>
    </div>
  );
};
