import React, { useState } from 'react';
import { Flame, Sparkles, Send, RefreshCw, BookmarkPlus, Check, Star, Heart, Lightbulb, Compass, Award } from 'lucide-react';
import { GenieWishResponse, WishRecord } from '../types';

interface GenieChamberProps {
  onSaveWish: (wish: WishRecord) => void;
  onAddStardust: (amount: number) => void;
  onPlayChime: () => void;
}

export const GenieChamber: React.FC<GenieChamberProps> = ({
  onSaveWish,
  onAddStardust,
  onPlayChime,
}) => {
  // Lamp Rubbing Progress
  const [rubProgressJune17, setRubProgressJune17] = useState(30);
  const [rubProgressJune18, setRubProgressJune18] = useState(30);
  const [genieAwakened17, setGenieAwakened17] = useState(false);
  const [genieAwakened18, setGenieAwakened18] = useState(false);

  // Form State
  const [seekerName, setSeekerName] = useState('');
  const [wishCategory, setWishCategory] = useState('Creative Destiny');
  const [wishText, setWishText] = useState('');
  const [selectedGenie, setSelectedGenie] = useState<'Celestia (June 17)' | 'Aetherion (June 18)' | 'Both Twin Genies'>('Both Twin Genies');

  // Response & Loading
  const [isLoading, setIsLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState<GenieWishResponse | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categories = [
    { name: 'Creative Destiny', icon: Lightbulb },
    { name: 'Love & Soulmate', icon: Heart },
    { name: 'Abundance & Gold', icon: Star },
    { name: 'Inner Wisdom', icon: Compass },
    { name: 'Strength & Courage', icon: Award },
  ];

  const handleRubLamp = (genie: '17' | '18') => {
    onPlayChime();
    if (genie === '17') {
      const next = Math.min(100, rubProgressJune17 + 25);
      setRubProgressJune17(next);
      if (next >= 100 && !genieAwakened17) {
        setGenieAwakened17(true);
        onAddStardust(50);
      }
    } else {
      const next = Math.min(100, rubProgressJune18 + 25);
      setRubProgressJune18(next);
      if (next >= 100 && !genieAwakened18) {
        setGenieAwakened18(true);
        onAddStardust(50);
      }
    }
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    setIsLoading(true);
    setCurrentResponse(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/genie-wish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          genie: selectedGenie,
          wishCategory,
          wishText,
          seekerName: seekerName || 'Honored Traveler',
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setCurrentResponse(data.result);
        onAddStardust(25);
        onPlayChime();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToGrimoire = () => {
    if (!currentResponse) return;
    const record: WishRecord = {
      id: Date.now().toString(),
      seekerName: seekerName || 'Honored Traveler',
      genie: selectedGenie,
      category: wishCategory,
      wishText,
      response: currentResponse,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    onSaveWish(record);
    setSavedSuccess(true);
  };

  return (
    <div className="space-y-12">
      {/* SECTION 1: TWIN GENIES DISPLAY & LAMP RUBBING (Inspired by Image 1) */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950/80 to-slate-950 border border-amber-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Background Atmosphere glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Celestial Guardians of June 17 &amp; June 18
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-200 via-cyan-200 to-amber-300 bg-clip-text text-transparent">
            Awaken The Twin Genies
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Rub the golden lamps resting on the ancient stone pedestals to summon Celestia and Aetherion. Speak your heartfelt wish to receive cosmic blessings.
          </p>
        </div>

        {/* Twin Genie Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* GENIE 1: CELESTIA (JUNE 17) */}
          <div className="relative bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 flex flex-col items-center text-center space-y-6 shadow-xl hover:border-cyan-400/50 transition-all group">
            {/* Shimmer badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-serif font-semibold">
              June 17
            </div>

            {/* Genie Avatar Illustration Visual */}
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-slate-900 p-1 shadow-2xl shadow-cyan-500/20 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center relative">
                {/* Aura aura animation */}
                <div className={`absolute inset-0 bg-cyan-500/20 transition-opacity duration-1000 ${genieAwakened17 ? 'opacity-100 animate-pulse' : 'opacity-30'}`} />
                <span className="text-5xl relative z-10">🧞‍♀️</span>
                <span className="text-xs font-serif font-bold text-cyan-200 mt-2 z-10">CELESTIA</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-cyan-200">Celestia</h3>
              <p className="text-xs text-cyan-400/80 font-medium tracking-wide uppercase mt-0.5">Genie of Sapphire Wisdom &amp; Love</p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed px-2">
                Guardian of moonlit reflection, intuitive clarity, and peaceful harmony. Her aura sparkles with sapphire stardust.
              </p>
            </div>

            {/* Lamp Rubbing Action (June 17) */}
            <div className="w-full pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-cyan-300 font-medium">
                <span>Magic Lamp Energy</span>
                <span>{rubProgressJune17}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-cyan-500/20">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-amber-400 transition-all duration-300"
                  style={{ width: `${rubProgressJune17}%` }}
                />
              </div>

              <button
                id="rub-lamp-june17"
                onClick={() => handleRubLamp('17')}
                className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-700 hover:from-cyan-500 hover:to-indigo-600 text-white font-serif font-semibold text-sm rounded-xl shadow-lg shadow-cyan-900/30 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
              >
                <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
                <span>{genieAwakened17 ? 'Rub Lamp Again for Sparks ✨' : 'Rub June 17 Lamp 🪔'}</span>
              </button>
              {genieAwakened17 && (
                <span className="text-[11px] text-emerald-400 font-medium block animate-fade-in">
                  ✓ Celestia Awakened (+50 Stardust Granted!)
                </span>
              )}
            </div>
          </div>

          {/* GENIE 2: AETHERION (JUNE 18) */}
          <div className="relative bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 flex flex-col items-center text-center space-y-6 shadow-xl hover:border-amber-400/50 transition-all group">
            {/* Shimmer badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded-full text-xs font-serif font-semibold">
              June 18
            </div>

            {/* Genie Avatar Illustration Visual */}
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-amber-500 via-indigo-600 to-slate-900 p-1 shadow-2xl shadow-amber-500/20 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center relative">
                {/* Aura animation */}
                <div className={`absolute inset-0 bg-amber-500/20 transition-opacity duration-1000 ${genieAwakened18 ? 'opacity-100 animate-pulse' : 'opacity-30'}`} />
                <span className="text-5xl relative z-10">🧞‍♂️</span>
                <span className="text-xs font-serif font-bold text-amber-200 mt-2 z-10">AETHERION</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-amber-200">Aetherion</h3>
              <p className="text-xs text-amber-400/80 font-medium tracking-wide uppercase mt-0.5">Genie of Golden Destiny &amp; Courage</p>
              <p className="text-xs text-slate-300 mt-3 leading-relaxed px-2">
                Master of creative fire, golden abundance, and cosmic breakthroughs. Wearing a golden vest that glows under the midnight sky.
              </p>
            </div>

            {/* Lamp Rubbing Action (June 18) */}
            <div className="w-full pt-2 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-amber-300 font-medium">
                <span>Magic Lamp Energy</span>
                <span>{rubProgressJune18}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-amber-500/20">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${rubProgressJune18}%` }}
                />
              </div>

              <button
                id="rub-lamp-june18"
                onClick={() => handleRubLamp('18')}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-indigo-700 hover:from-amber-500 hover:to-indigo-600 text-white font-serif font-semibold text-sm rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] active:scale-95"
              >
                <Flame className="w-4 h-4 text-cyan-300 animate-bounce" />
                <span>{genieAwakened18 ? 'Rub Lamp Again for Sparks ✨' : 'Rub June 18 Lamp 🪔'}</span>
              </button>
              {genieAwakened18 && (
                <span className="text-[11px] text-emerald-400 font-medium block animate-fade-in">
                  ✓ Aetherion Awakened (+50 Stardust Granted!)
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WISH CONSOLE & PARCHMENT SCROLL RESPONSE */}
      <section className="bg-slate-950 border border-amber-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
            Submit Your Wish to the Sanctuary
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Speak your intention clearly. The Genies consult the stars of June 17 &amp; 18 to return your personalized prophecy.
          </p>
        </div>

        <form onSubmit={handleSubmitWish} className="max-w-3xl mx-auto space-y-6">
          {/* Seeker Name & Genie Target */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="seeker-name" className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Your Name / Seeker Identity
              </label>
              <input
                id="seeker-name"
                type="text"
                placeholder="e.g. Zephyr of the Stardust Coast"
                value={seekerName}
                onChange={(e) => setSeekerName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-amber-100 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              />
            </div>

            <div>
              <label htmlFor="select-genie-target" className="block text-xs font-medium text-amber-200/80 mb-1.5">
                Target Genie Guardian
              </label>
              <select
                id="select-genie-target"
                value={selectedGenie}
                onChange={(e: any) => setSelectedGenie(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-amber-100 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50"
              >
                <option value="Both Twin Genies">Both Twin Genies (Celestia &amp; Aetherion)</option>
                <option value="Celestia (June 17)">Celestia (June 17 - Sapphire Wisdom)</option>
                <option value="Aetherion (June 18)">Aetherion (June 18 - Golden Fire)</option>
              </select>
            </div>
          </div>

          {/* Wish Category Selector */}
          <div>
            <label className="block text-xs font-medium text-amber-200/80 mb-2">
              Select Wish Realm
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = wishCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setWishCategory(cat.name)}
                    className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wish Input Text Area */}
          <div>
            <label htmlFor="wish-input-textarea" className="block text-xs font-medium text-amber-200/80 mb-1.5">
              Your Heart&apos;s Wish
            </label>
            <textarea
              id="wish-input-textarea"
              rows={3}
              required
              placeholder="e.g., I wish to create a vibrant artistic sanctuary that inspires people across the globe with warmth and wonder..."
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 focus:border-amber-400 rounded-xl text-amber-100 placeholder:text-slate-600 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400/50 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            id="summon-wish-button"
            type="submit"
            disabled={isLoading || !wishText.trim()}
            className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 disabled:opacity-50 text-slate-950 font-serif font-bold text-base rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                <span>Consulting the Stardust Constellations...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 text-slate-950" />
                <span>Summon Genies &amp; Grant Wish (+25 Stardust)</span>
              </>
            )}
          </button>
        </form>

        {/* PARCHMENT SCROLL RESPONSE DISPLAY */}
        {currentResponse && (
          <div className="mt-8 pt-8 border-t border-amber-500/20 max-w-3xl mx-auto animate-fade-in">
            <div className="relative bg-gradient-to-b from-amber-950/40 via-slate-900 to-amber-950/30 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-amber-100">
              <div className="absolute top-3 right-4 flex items-center gap-1 text-xs text-amber-400/80 font-serif">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Granted by {selectedGenie}</span>
              </div>

              {/* Greeting */}
              <div className="border-b border-amber-500/20 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200">
                  {currentResponse.greeting}
                </h3>
                <p className="italic text-cyan-200/90 text-sm mt-2">
                  &ldquo;{currentResponse.poeticBlessing}&rdquo;
                </p>
              </div>

              {/* Stardust Guidance */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Stardust Wisdom
                </h4>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {currentResponse.stardustGuidance}
                </p>
              </div>

              {/* Cosmic Catalyst */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                    Your Waking World Cosmic Catalyst
                  </h5>
                  <p className="text-xs text-slate-200 mt-1">
                    {currentResponse.cosmicCatalyst}
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-cyan-300 font-medium">
                  Magic Element: {currentResponse.magicElement}
                </span>

                <button
                  id="save-to-grimoire-button"
                  onClick={handleSaveToGrimoire}
                  disabled={savedSuccess}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    savedSuccess
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-amber-400 text-slate-950 hover:bg-amber-300 font-bold'
                  }`}
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Saved to Grimoire</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-4 h-4" />
                      <span>Record in Grimoire</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
