import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, Shield, Sparkles, LogOut, CheckCircle, Key, UserCheck, X, ChevronRight, Star } from 'lucide-react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'child' | 'guest';
  childName?: string;
  avatarIcon?: string;
  createdAt: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  savedChaptersCount: number;
  savedWishesCount: number;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  savedChaptersCount,
  savedWishesCount,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'parent' | 'child'>('parent');
  const [childName, setChildName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, [activeTab, isOpen]);

  if (!isOpen) return null;

  // Demo accounts for instant 1-click access
  const demoAccounts: UserProfile[] = [
    {
      id: 'demo-parent-dawn',
      name: 'Dawn Guardian',
      email: 'dawn@evertale.com',
      role: 'parent',
      childName: 'Zephyr',
      avatarIcon: '✨',
      createdAt: '2026-07-28',
    },
    {
      id: 'demo-child-zephyr',
      name: 'Young Zephyr',
      email: 'zephyr@evertale.com',
      role: 'child',
      avatarIcon: '🌙',
      createdAt: '2026-07-28',
    },
  ];

  const handleDemoLogin = (profile: UserProfile) => {
    onLogin(profile);
    setSuccessMessage(`Welcome back, ${profile.name}!`);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (activeTab === 'login') {
      if (!email.trim() || !password.trim()) {
        setErrorMessage('Please enter both email and password.');
        return;
      }
      // Simple authentication lookup
      const user: UserProfile = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0] || 'EverTale Traveler',
        email,
        role: role,
        childName: role === 'parent' ? childName || 'Little Explorer' : undefined,
        avatarIcon: role === 'parent' ? '🛡️' : '✨',
        createdAt: new Date().toISOString(),
      };
      onLogin(user);
      setSuccessMessage('Successfully logged in!');
      setTimeout(() => onClose(), 600);
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setErrorMessage('Please complete all required fields.');
        return;
      }
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        childName: role === 'parent' ? childName : undefined,
        avatarIcon: role === 'parent' ? '🛡️' : '🌙',
        createdAt: new Date().toISOString(),
      };
      onLogin(newUser);
      setSuccessMessage('Account created! Welcome to EverTale.');
      setTimeout(() => onClose(), 600);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-950/50 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-amber-200 hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LOGGED IN VIEW */}
        {currentUser ? (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-indigo-600 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-3xl">
                {currentUser.avatarIcon || '✨'}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest mb-2">
                <Shield className="w-3.5 h-3.5" />
                {currentUser.role === 'parent' ? 'Parent Guardian' : 'Young Explorer'}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">{currentUser.name}</h2>
              <p className="text-xs text-slate-400 mt-1">{currentUser.email}</p>
            </div>

            {/* Saved Content Stats */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20">
              <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="block font-serif text-2xl font-bold text-cyan-300">{savedChaptersCount}</span>
                <span className="text-xs text-slate-400">EverTale Stories</span>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="block font-serif text-2xl font-bold text-amber-400">{savedWishesCount}</span>
                <span className="text-xs text-slate-400">Genie Wishes Saved</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4" />
                View My Vault
              </button>
              <button
                onClick={() => {
                  onLogout();
                }}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-200 border border-slate-700 hover:border-rose-500/40 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        ) : (
          /* LOG IN / SIGN UP FORM VIEW */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                EverTale Account Vault
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200">
                Sign In to View Your Stuff
              </h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Access your personalized EverTale chapters, genie wishes, parent command center, and sanctuary entries.
              </p>
            </div>

            {/* Quick Demo Login Option */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs font-serif font-semibold text-cyan-300">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-cyan-300 text-cyan-300" />
                  Quick Demo Accounts (Instant Access)
                </span>
                <span className="text-[10px] text-slate-400">Click to enter</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => handleDemoLogin(acc)}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-400/50 text-left transition-all group flex items-center justify-between"
                  >
                    <div>
                      <span className="block text-xs font-serif font-bold text-amber-200 group-hover:text-cyan-200">
                        {acc.name}
                      </span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{acc.role}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transform group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs selector */}
            <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2 rounded-xl text-xs font-serif font-bold transition-all ${
                  activeTab === 'login'
                    ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-serif font-bold transition-all ${
                  activeTab === 'signup'
                    ? 'bg-amber-400/20 text-amber-200 border border-amber-400/30 shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs text-center">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs text-center flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                {successMessage}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-serif text-slate-300">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Dawn Guardian"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-sm text-slate-100 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-serif text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@evertale.com"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-sm text-slate-100 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-serif text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-sm text-slate-100 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-serif text-slate-300">Role / Profile Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('parent')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                      role === 'parent'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Parent / Guardian
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('child')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 ${
                      role === 'child'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Young Explorer
                  </button>
                </div>
              </div>

              {role === 'parent' && activeTab === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-serif text-slate-300">Child's Name (Optional)</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Zephyr"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-sm text-slate-100 outline-none"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-indigo-600 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 mt-4"
              >
                <UserCheck className="w-4 h-4" />
                {activeTab === 'login' ? 'Sign In & Access My Vault' : 'Create My Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
