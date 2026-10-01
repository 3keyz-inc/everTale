import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { EverTalePortal } from './components/EverTalePortal';
import { EverTaleChapterCreator } from './components/EverTaleChapterCreator';
import { ParentCommandCenter } from './components/ParentCommandCenter';
import { GenieChamber } from './components/GenieChamber';
import { LotusGarden } from './components/LotusGarden';
import { CosmicObservatory } from './components/CosmicObservatory';
import { CelestialGrimoire } from './components/CelestialGrimoire';
import { SanctuaryGallery } from './components/SanctuaryGallery';
import { StarCursorTrail } from './components/StarCursorTrail';
import { AuthModal, UserProfile } from './components/AuthModal';
import { ActiveTab, WishRecord, EverTaleChapter } from './types';
import { audioSynth } from './utils/audio';
import { Sparkles, Lock, Info } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('portal');
  const [stardustCount, setStardustCount] = useState<number>(150);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [savedWishes, setSavedWishes] = useState<WishRecord[]>([]);
  const [savedChapters, setSavedChapters] = useState<EverTaleChapter[]>([]);

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('evertale_current_user');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not read user from storage:', e);
    }
    return null;
  });
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Load saved wishes and chapters from localStorage on mount
  useEffect(() => {
    try {
      const storedWishes = localStorage.getItem('stardust_saved_wishes');
      if (storedWishes) {
        setSavedWishes(JSON.parse(storedWishes));
      }
      const storedChapters = localStorage.getItem('evertale_saved_chapters');
      if (storedChapters) {
        setSavedChapters(JSON.parse(storedChapters));
      }
    } catch (e) {
      console.warn('Could not read saved data:', e);
    }
  }, []);

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('evertale_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Could not persist user session:', e);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('evertale_current_user');
    } catch (e) {
      console.warn('Could not remove user session:', e);
    }
  };

  const handleToggleAudio = () => {
    const playing = audioSynth.toggle();
    setIsAudioPlaying(playing);
  };

  const handlePlayChime = () => {
    if (isAudioPlaying) {
      audioSynth.playChimeNote(880);
    }
  };

  const handleAddStardust = (amount: number) => {
    setStardustCount((prev) => prev + amount);
  };

  const handleSaveWish = (wish: WishRecord) => {
    const updated = [wish, ...savedWishes];
    setSavedWishes(updated);
    try {
      localStorage.setItem('stardust_saved_wishes', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save wish to storage:', e);
    }
  };

  const handleSaveChapter = (chapter: EverTaleChapter) => {
    const updated = [chapter, ...savedChapters];
    setSavedChapters(updated);
    try {
      localStorage.setItem('evertale_saved_chapters', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save chapter to storage:', e);
    }
  };

  const handleDeleteWish = (id: string) => {
    const updated = savedWishes.filter((w) => w.id !== id);
    setSavedWishes(updated);
    try {
      localStorage.setItem('stardust_saved_wishes', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not update saved wishes:', e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* MAGICAL STAR CURSOR TRAIL */}
      <StarCursorTrail />

      {/* NAVBAR */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stardustCount={stardustCount}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <div className="border-b border-cyan-500/20 bg-cyan-950/30 px-4 py-2 text-center text-xs text-cyan-100" role="status">
        <span className="inline-flex items-center gap-2">
          <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Prototype preview: profiles and saved stories stay in this browser. Story prompts may be sent to the configured AI provider.
        </span>
      </div>

      {/* MAIN VIEWPORT */}
      <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'portal' && (
          <EverTalePortal
            onPlayChime={handlePlayChime}
            onNavigateToCreator={() => setActiveTab('evertale')}
          />
        )}

        {activeTab === 'evertale' && (
          <EverTaleChapterCreator
            onSaveChapter={handleSaveChapter}
            onAddStardust={handleAddStardust}
            onPlayChime={handlePlayChime}
          />
        )}

        {activeTab === 'parent' && (
          <ParentCommandCenter
            chapters={savedChapters}
            onPlayChime={handlePlayChime}
          />
        )}

        {activeTab === 'genie' && (
          <GenieChamber
            onSaveWish={handleSaveWish}
            onAddStardust={handleAddStardust}
            onPlayChime={handlePlayChime}
          />
        )}

        {activeTab === 'garden' && (
          <LotusGarden
            onAddStardust={handleAddStardust}
            onPlayChime={handlePlayChime}
          />
        )}

        {activeTab === 'observatory' && (
          <CosmicObservatory
            onAddStardust={handleAddStardust}
            onPlayChime={handlePlayChime}
          />
        )}

        {activeTab === 'grimoire' && (
          <CelestialGrimoire
            savedWishes={savedWishes}
            onDeleteWish={handleDeleteWish}
            onPlayChime={handlePlayChime}
          />
        )}

        {activeTab === 'gallery' && (
          <SanctuaryGallery onPlayChime={handlePlayChime} />
        )}
      </main>

      {/* FOOTER */}
      <footer id="main-footer" className="bg-slate-950 border-t border-cyan-500/20 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-amber-400 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-cyan-300" />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-cyan-200">
                  EverTale
                </span>
                <p className="text-xs text-slate-500">The story that grows with them. Guided by Zephyr the Wish Weaver.</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <button onClick={() => setActiveTab('portal')} className="hover:text-cyan-300 transition-colors">
                Portal Home
              </button>
              <button onClick={() => setActiveTab('evertale')} className="hover:text-cyan-300 transition-colors">
                EverTale Creator
              </button>
              <button onClick={() => setActiveTab('parent')} className="hover:text-emerald-300 transition-colors">
                Parent Vault
              </button>
              <button onClick={() => setActiveTab('genie')} className="hover:text-amber-300 transition-colors">
                Genie Chamber
              </button>
              <button onClick={() => setActiveTab('garden')} className="hover:text-teal-300 transition-colors">
                Lotus Garden
              </button>
              <button onClick={() => setActiveTab('observatory')} className="hover:text-indigo-300 transition-colors">
                Observatory
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} EverTale. Prototype experience.</p>
            <div className="flex items-center gap-1 text-cyan-400/80">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Local browser storage • Clear it from your browser settings</span>
            </div>
          </div>
        </div>
      </footer>

      {/* AUTHENTICATION & LOGIN MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        savedChaptersCount={savedChapters.length}
        savedWishesCount={savedWishes.length}
      />
    </div>
  );
}
