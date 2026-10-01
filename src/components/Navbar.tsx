import React, { useState } from 'react';
import { Sparkles, Moon, Sun, Volume2, VolumeX, Menu, X, BookOpen, Compass, Flame, Flower2, Image as ImageIcon, Shield, Globe, Music, ChevronDown, Check, User as UserIcon } from 'lucide-react';
import { ActiveTab } from '../types';
import { SOUNDSCAPE_OPTIONS, SoundscapeMode, audioSynth } from '../utils/audio';
import { UserProfile } from './AuthModal';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  stardustCount: number;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stardustCount,
  isAudioPlaying,
  onToggleAudio,
  currentUser,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioMenuOpen, setAudioMenuOpen] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<SoundscapeMode>(audioSynth.getCurrentMode());

  const handleSelectSoundscape = (mode: SoundscapeMode) => {
    setActiveSoundscape(mode);
    audioSynth.setSoundscape(mode);
    if (!isAudioPlaying) {
      onToggleAudio();
    }
    setAudioMenuOpen(false);
  };

  const navItems = [
    { id: 'portal' as ActiveTab, label: 'Portal Home', icon: Globe, badge: 'Website' },
    { id: 'evertale' as ActiveTab, label: 'EverTale Creator', icon: Sparkles, badge: 'Zephyr' },
    { id: 'parent' as ActiveTab, label: 'Parent Vault', icon: Shield },
    { id: 'genie' as ActiveTab, label: 'Genie Chamber', icon: Flame },
    { id: 'garden' as ActiveTab, label: 'Lotus Garden', icon: Flower2 },
    { id: 'observatory' as ActiveTab, label: 'Observatory', icon: Compass },
    { id: 'grimoire' as ActiveTab, label: 'Grimoire', icon: BookOpen },
    { id: 'gallery' as ActiveTab, label: 'Art Gallery', icon: ImageIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-amber-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('portal')}>
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-indigo-900 p-0.5 shadow-md shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Moon className="w-6 h-6 text-amber-400 fill-amber-400/20 animate-pulse" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-300 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide bg-gradient-to-r from-cyan-200 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                  EverTale
                </span>
              </div>
              <p className="text-[11px] text-cyan-200/80 font-sans tracking-widest uppercase font-semibold">
                The story that grows with them
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500/20 to-indigo-600/30 text-amber-200 border border-amber-500/40 shadow-inner shadow-amber-500/10'
                      : 'text-slate-300 hover:text-amber-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[10px] font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-amber-400 via-cyan-400 to-indigo-500 rounded-full shadow-sm shadow-cyan-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            {/* User Account / Log In Button */}
            <button
              id="user-account-button"
              onClick={onOpenAuth}
              className={`px-3 py-1.5 rounded-full border text-xs font-serif font-bold transition-all flex items-center gap-2 shadow-md ${
                currentUser
                  ? 'bg-amber-400/15 border-amber-400/50 text-amber-200 hover:bg-amber-400/25'
                  : 'bg-gradient-to-r from-amber-500/20 to-indigo-600/30 border-amber-500/40 text-amber-300 hover:brightness-110'
              }`}
              title={currentUser ? `Logged in as ${currentUser.name}` : 'Log in to view your stuff'}
            >
              <span className="text-sm">{currentUser?.avatarIcon || <UserIcon className="w-3.5 h-3.5 text-amber-400" />}</span>
              <span className="hidden sm:inline truncate max-w-[110px]">
                {currentUser ? currentUser.name : 'Log In'}
              </span>
              {currentUser && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              )}
            </button>

            {/* Stardust Dust Counter */}
            <div
              id="stardust-counter"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-amber-300 text-xs font-semibold shadow-inner"
              title="Stardust Essence accumulated from wishes & visits"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>{stardustCount} Stardust</span>
            </div>

            {/* Audio Soundscape Control & Selector */}
            <div className="relative">
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-full p-1 shadow-md">
                <button
                  id="audio-toggle-button"
                  onClick={onToggleAudio}
                  className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
                    isAudioPlaying
                      ? 'bg-amber-500/20 text-amber-300 shadow-sm shadow-amber-500/20 animate-pulse'
                      : 'text-slate-400 hover:text-amber-200'
                  }`}
                  title={isAudioPlaying ? 'Mute Background Audio' : 'Play Background Audio'}
                  aria-label="Toggle ambient background audio"
                >
                  {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  id="soundscape-menu-button"
                  onClick={() => setAudioMenuOpen(!audioMenuOpen)}
                  className="px-2 py-1 flex items-center gap-1 text-xs font-serif text-slate-300 hover:text-amber-300 transition-colors border-l border-slate-800"
                  title="Change Background Soundscape"
                >
                  <Music className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="hidden sm:inline font-medium">
                    {SOUNDSCAPE_OPTIONS.find((s) => s.id === activeSoundscape)?.name.split(' ')[0] || 'Sound'}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${audioMenuOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Soundscape Dropdown Menu */}
              {audioMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-950 border border-amber-500/40 rounded-2xl p-3 shadow-2xl z-50 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 px-1">
                    <span className="text-xs font-serif font-bold text-amber-200 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-cyan-300" />
                      Select Background Sound
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">
                      {isAudioPlaying ? 'Playing' : 'Muted'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    {SOUNDSCAPE_OPTIONS.map((option) => {
                      const isSelected = activeSoundscape === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSelectSoundscape(option.id)}
                          className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                            isSelected
                              ? 'bg-amber-400/10 border-amber-400/50 text-amber-200'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-lg">{option.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-serif font-bold truncate">{option.name}</span>
                              {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                            </div>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{option.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-amber-300 hover:bg-slate-900 rounded-xl border border-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-indigo-600/30 text-amber-200 border border-amber-500/40'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-900 flex items-center justify-between px-2 text-xs text-amber-300/80">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Stardust: {stardustCount}
            </span>
            <span>June 17 & 18 Celebration</span>
          </div>
        </div>
      )}
    </header>
  );
};
