import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Maximize2, ExternalLink, Calendar } from 'lucide-react';

interface SanctuaryGalleryProps {
  onPlayChime: () => void;
}

export const SanctuaryGallery: React.FC<SanctuaryGalleryProps> = ({ onPlayChime }) => {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  const scenes = [
    {
      id: 'scene-1',
      title: 'The Twin Genies (June 17 & June 18)',
      subtitle: 'Celestia & Aetherion Emerging From Golden Lamps',
      date: 'June 17 & 18',
      description: 'Glowing in luminous blue and cyan stardust mist, the twin genies Celestia and Aetherion rise above their golden brass lamps resting on stone pedestals in the palace courtyard.',
      tags: ['Twin Genies', 'June 17', 'June 18', 'Magic Lamp'],
    },
    {
      id: 'scene-2',
      title: 'The Enchanted Night Garden',
      subtitle: 'Path of Glowing Lotus Flowers & Golden Lanterns',
      date: 'Solstice Eve',
      description: 'A cobblestone garden path winding through glowing cyan lotus blooms, golden brass lamps, and hanging lanterns beside palace archways under a crescent moon.',
      tags: ['Lotus Garden', 'Golden Lanterns', 'Palace Courtyard', 'Fireflies'],
    },
    {
      id: 'scene-3',
      title: 'The Cosmic Observatory',
      subtitle: 'Celestial Glass Globes & Galaxy Star Dome',
      date: 'Stardust Alignment',
      description: 'A magnificent arched cosmic dome showcasing crystal spheres containing rotating galaxies and nebulae resting on golden carved pillars.',
      tags: ['Observatory', 'Crystal Globes', 'Starry Dome', 'Prophecy'],
    },
    {
      id: 'scene-4',
      title: 'Stardust Sanctuary & Celestial Tales Grimoire',
      subtitle: 'The Open Magical Tome beside the Glowing Fountain',
      date: 'Ancient Tome',
      description: 'An ornate leather-bound grimoire resting open on a plush blue cushion, revealing celestial tales beside a sparkling blue fountain.',
      tags: ['Grimoire', 'Celestial Tales', 'Courtyard Fountain', 'Stardust'],
    },
  ];

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
            Original Sanctuary Visions &amp; Art Gallery
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
            Sanctuary Art Gallery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Examine the original high-resolution visual art pieces that define the Stardust Sanctuary, the June 17 &amp; 18 Twin Genies, and the Celestial Grimoire.
          </p>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {scenes.map((scene) => (
          <div
            key={scene.id}
            onClick={() => {
              setSelectedImage(scene);
              onPlayChime();
            }}
            className="group bg-slate-950 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl hover:border-amber-400/50 transition-all duration-300 space-y-4 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative h-64 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-950 to-amber-950/60 p-4 border border-indigo-500/20 overflow-hidden flex flex-col items-center justify-center text-center space-y-2">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent)] pointer-events-none" />
                <Sparkles className="w-10 h-10 text-amber-300 animate-pulse group-hover:scale-125 transition-transform" />
                <span className="font-serif font-bold text-lg text-cyan-200 z-10">{scene.title}</span>
                <span className="text-xs text-amber-300/80 z-10">{scene.subtitle}</span>
                <div className="pt-2 z-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-900/90 border border-amber-400/30 rounded-full text-[11px] text-amber-300 font-semibold">
                    <Maximize2 className="w-3 h-3" /> View Sanctuary Scene Details
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                  <span>{scene.title}</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3 h-3" /> {scene.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{scene.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-900">
              {scene.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-[10px] font-medium rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 flex items-center justify-center animate-fade-in">
          <div className="bg-slate-900 border-2 border-amber-400/60 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-amber-100 relative shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white px-3 py-1 bg-slate-800 rounded-xl text-xs font-bold"
            >
              ✕ Close
            </button>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {selectedImage.date}
              </span>
              <h2 className="font-serif text-2xl font-bold text-amber-200">
                {selectedImage.title}
              </h2>
              <p className="text-xs text-cyan-300">{selectedImage.subtitle}</p>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-serif bg-slate-950 p-4 rounded-xl border border-indigo-500/20">
              {selectedImage.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {selectedImage.tags.map((t: string) => (
                <span key={t} className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs rounded-lg">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
