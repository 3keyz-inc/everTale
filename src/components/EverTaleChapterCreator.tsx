import React, { useState, useRef } from 'react';
import { Sparkles, Wand2, Shield, Play, Palette, BookOpen, Send, Lock, Star, Trophy, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Archetype, EverTaleChapter } from '../types';

interface EverTaleChapterCreatorProps {
  onSaveChapter: (chapter: EverTaleChapter) => void;
  onAddStardust: (amount: number) => void;
  onPlayChime: () => void;
}

export const EverTaleChapterCreator: React.FC<EverTaleChapterCreatorProps> = ({
  onSaveChapter,
  onAddStardust,
  onPlayChime,
}) => {
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState<number>(7);
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype>('Brave Hero');
  const [specialMemory, setSpecialMemory] = useState('');
  const [favoriteThing, setFavoriteThing] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdChapter, setCreatedChapter] = useState<EverTaleChapter | null>(null);
  
  // Interactive Cartoon Preview State
  const [activeCartoonScene, setActiveCartoonScene] = useState<number>(0);

  // Coloring Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#00E5FF');

  const archetypesList: { id: Archetype; title: string; desc: string; icon: string; color: string }[] = [
    {
      id: 'Brave Hero',
      title: 'Brave Hero',
      desc: 'Embarks on courageous quests with a shield of light and boundless determination.',
      icon: '🛡️',
      color: 'from-amber-500 to-red-600',
    },
    {
      id: 'Royal Princess/Prince',
      title: 'Royal Royalty',
      desc: 'Rules the Stardust Kingdom with kindness, diplomacy, and a glowing crown of wisdom.',
      icon: '👑',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'Cosmic Explorer',
      title: 'Cosmic Explorer',
      desc: 'Charts unknown galaxies, floating sky islands, and constellation secrets.',
      icon: '🚀',
      color: 'from-cyan-400 to-blue-600',
    },
    {
      id: 'Animal Guardian',
      title: 'Animal Guardian',
      desc: 'Brings peace and friendship to enchanted mythical creatures and glowing forests.',
      icon: '🌿',
      color: 'from-emerald-400 to-teal-700',
    },
    {
      id: 'Master Inventor',
      title: 'Master Inventor',
      desc: 'Creates wondrous contraptions, flying clockwork engines, and magic gadgets.',
      icon: '⚙️',
      color: 'from-amber-400 to-orange-600',
    },
  ];

  const handleGenerateChapter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;

    setIsGenerating(true);
    onPlayChime();

    try {
      const response = await fetch('/api/evertale-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName,
          age,
          archetype: selectedArchetype,
          specialMemory,
          favoriteThing,
        }),
      });

      const data = await response.json();
      if (data.success && data.chapter) {
        const fullChapter: EverTaleChapter = {
          id: Date.now().toString(),
          childName,
          age,
          archetype: selectedArchetype,
          specialMemory,
          favoriteThing,
          chapterTitle: data.chapter.chapterTitle,
          storyTagline: data.chapter.storyTagline,
          inductionCartoonScript: data.chapter.inductionCartoonScript || [],
          miniGameTitle: data.chapter.miniGameTitle,
          miniGameDescription: data.chapter.miniGameDescription,
          miniGameObjective: data.chapter.miniGameObjective,
          coloringBookPrompt: data.chapter.coloringBookPrompt,
          parentCommandCenterNote: data.chapter.parentCommandCenterNote,
          heirloomQuote: data.chapter.heirloomQuote,
          createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };

        setCreatedChapter(fullChapter);
        onSaveChapter(fullChapter);
        onAddStardust(50);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Drawing Canvas Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="space-y-12">
      {/* BRAND HERO HEADER */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-cyan-950/60 to-slate-950 border border-cyan-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '5s' }} />
            EverTale Annual Birthday Heirloom
          </div>
          <h1 className="font-serif text-3xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-200 via-amber-200 to-cyan-400 bg-clip-text text-transparent">
            The Story That Grows With Them
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Guided by <strong className="text-cyan-300">Zephyr, the Wish Weaver</strong>, spin an annual digital birthday chapter starring your child. Includes a personalized 3-minute induction cartoon, custom mini-game, digital coloring book, and private parent vault.
          </p>

          {/* PRIVACY GUARANTEE BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/90 border border-cyan-500/30 rounded-2xl text-xs text-cyan-200 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span><strong>The Gordian Privacy Shield:</strong> Photos shredded immediately after rendering. Zero ads, zero data harvesting.</span>
          </div>
        </div>
      </section>

      {/* STEP 1: CREATE CHAPTER FORM */}
      <section className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-cyan-200">
                Create Your Child&apos;s Birthday Chapter
              </h2>
              <p className="text-xs text-slate-400">Step 1: Details for Zephyr, the Wish Weaver</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold rounded-full">
            Annual Chapter: $79 Value
          </span>
        </div>

        <form onSubmit={handleGenerateChapter} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="child-name-input" className="block text-xs font-semibold text-cyan-200 mb-2">
                Child&apos;s Name *
              </label>
              <input
                id="child-name-input"
                type="text"
                required
                placeholder="e.g. Mia, Alexander, Sophia"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-cyan-100 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label htmlFor="child-age-input" className="block text-xs font-semibold text-cyan-200 mb-2">
                Turning Age (Birthday Chapter #) *
              </label>
              <input
                id="child-age-input"
                type="number"
                min={1}
                max={18}
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-cyan-100 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* ARCHETYPE SELECTOR */}
          <div>
            <label className="block text-xs font-semibold text-cyan-200 mb-2">
              Select Child&apos;s Hero Archetype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {archetypesList.map((a) => {
                const isSelected = selectedArchetype === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setSelectedArchetype(a.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{a.icon}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <h3 className="font-serif font-bold text-sm text-cyan-200 mt-2">{a.title}</h3>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">{a.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="special-memory-input" className="block text-xs font-semibold text-cyan-200 mb-2">
                Special Memory / Personal Milestone
              </label>
              <input
                id="special-memory-input"
                type="text"
                placeholder="e.g. Built a blanket fort, learned to ride a bike"
                value={specialMemory}
                onChange={(e) => setSpecialMemory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-cyan-100 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label htmlFor="favorite-thing-input" className="block text-xs font-semibold text-cyan-200 mb-2">
                Favorite Toys, Passions, or Dreams
              </label>
              <input
                id="favorite-thing-input"
                type="text"
                placeholder="e.g. Dinosaurs, stargazing, soccer, painting"
                value={favoriteThing}
                onChange={(e) => setFavoriteThing(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-cyan-100 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            id="weave-chapter-button"
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 via-amber-300 to-amber-500 hover:from-cyan-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-base rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                <span>Zephyr is Weaving Chapter {age}...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 text-slate-950" />
                <span>Weave EverTale Birthday Chapter (+50 Stardust)</span>
              </>
            )}
          </button>
        </form>
      </section>

      {/* STEP 2: CREATED CHAPTER DISPLAY */}
      {createdChapter && (
        <div className="space-y-12 animate-fade-in max-w-5xl mx-auto">
          {/* CHAPTER COVER HEADER */}
          <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-950 to-cyan-950 border-2 border-amber-400/50 p-6 sm:p-10 shadow-2xl overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-400/20 pb-4">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  Official Annual Birthday Heirloom
                </span>
                <h2 className="font-serif text-3xl font-bold text-amber-100 mt-1">
                  {createdChapter.chapterTitle}
                </h2>
                <p className="text-sm text-cyan-200 mt-0.5">{createdChapter.storyTagline}</p>
              </div>

              <div className="px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-2xl text-center">
                <span className="text-[10px] text-amber-300 uppercase block font-semibold">Child Archetype</span>
                <span className="font-serif font-bold text-sm text-amber-200">{createdChapter.archetype}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 italic font-serif">
              {createdChapter.heirloomQuote}
            </p>
          </div>

          {/* 1. INDUCTION CARTOON PLAYER SIMULATOR */}
          <section className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                  <Play className="w-5 h-5 fill-cyan-300" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cyan-200">
                    3-Minute Induction Cartoon Scene Player
                  </h3>
                  <p className="text-xs text-slate-400">Starring {createdChapter.childName} &amp; Zephyr the Wish Weaver</p>
                </div>
              </div>
              <span className="text-xs text-cyan-300 bg-cyan-950 px-3 py-1 rounded-full border border-cyan-500/30">
                Scene {activeCartoonScene + 1} of {createdChapter.inductionCartoonScript.length}
              </span>
            </div>

            {/* CARTOON STAGE */}
            {createdChapter.inductionCartoonScript[activeCartoonScene] && (
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 border border-cyan-500/30 p-8 min-h-[260px] flex flex-col justify-between overflow-hidden shadow-inner">
                <div className="absolute top-2 right-4 flex items-center gap-1.5 text-xs text-amber-300/80">
                  <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                  <span>Setting: {createdChapter.inductionCartoonScript[activeCartoonScene].setting}</span>
                </div>

                <div className="space-y-4 my-auto">
                  <p className="font-serif text-lg sm:text-xl text-amber-100 leading-relaxed italic">
                    &ldquo;{createdChapter.inductionCartoonScript[activeCartoonScene].narration}&rdquo;
                  </p>

                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-400/30 text-xs text-cyan-200 flex items-center gap-2">
                    <span className="font-bold text-amber-300">Zephyr&apos;s Action:</span>
                    <span>{createdChapter.inductionCartoonScript[activeCartoonScene].zephyrAction}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                  <button
                    onClick={() => setActiveCartoonScene((prev) => Math.max(0, prev - 1))}
                    disabled={activeCartoonScene === 0}
                    className="px-4 py-2 bg-slate-900 text-xs font-semibold rounded-xl text-slate-300 hover:text-white disabled:opacity-40"
                  >
                    ← Previous Scene
                  </button>

                  <div className="flex gap-1">
                    {createdChapter.inductionCartoonScript.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-3 h-3 rounded-full ${
                          idx === activeCartoonScene ? 'bg-cyan-400' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setActiveCartoonScene((prev) =>
                        Math.min(createdChapter.inductionCartoonScript.length - 1, prev + 1)
                      )
                    }
                    disabled={activeCartoonScene === createdChapter.inductionCartoonScript.length - 1}
                    className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-serif font-bold rounded-xl hover:bg-cyan-400 disabled:opacity-40"
                  >
                    Next Scene →
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* 2. CUSTOM MINI-GAME CHALLENGE */}
          <section className="bg-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-200">
                  {createdChapter.miniGameTitle}
                </h3>
                <p className="text-xs text-slate-400">Interactive Birthday Challenge</p>
              </div>
            </div>

            <p className="text-sm text-slate-300">{createdChapter.miniGameDescription}</p>

            <div className="p-4 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-200">
              <span><strong>Objective:</strong> {createdChapter.miniGameObjective}</span>
              <button
                onClick={onPlayChime}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-serif font-bold rounded-xl shadow-md"
              >
                Launch Challenge
              </button>
            </div>
          </section>

          {/* 3. INFINITE DIGITAL COLORING BOOK CANVAS */}
          <section className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cyan-200">
                    Infinite Digital Coloring Canvas
                  </h3>
                  <p className="text-xs text-slate-400">{createdChapter.coloringBookPrompt}</p>
                </div>
              </div>

              {/* COLOR PALETTE */}
              <div className="flex items-center gap-2">
                {['#00E5FF', '#F5A623', '#A855F7', '#10B981', '#EC4899'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrushColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      brushColor === c ? 'scale-125 border-white' : 'border-transparent'
                    }`}
                  />
                ))}
                <button
                  onClick={clearCanvas}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-lg hover:text-white"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* CANVAS WORKSPACE */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-2 flex justify-center">
              <canvas
                ref={canvasRef}
                width={700}
                height={300}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full max-w-full h-[300px] bg-slate-950 rounded-xl cursor-crosshair border border-cyan-500/20"
              />
            </div>
          </section>

          {/* 4. PARENT COMMAND CENTER & GORDIAN PRIVACY NOTE */}
          <div className="p-6 bg-slate-900/90 border border-emerald-500/40 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-emerald-200">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="font-bold block text-sm text-emerald-300">Gordian Privacy Shield Secured</span>
                <p>{createdChapter.parentCommandCenterNote}</p>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-emerald-950 border border-emerald-500/30 text-emerald-300 rounded-xl font-semibold whitespace-nowrap">
              Saved to Vault
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
