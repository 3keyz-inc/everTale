import React, { useState } from 'react';
import { Shield, Lock, Gift, Download, Award, Sparkles, Check, Trash2, Heart, Copy, CheckCircle2 } from 'lucide-react';
import { EverTaleChapter } from '../types';

interface ParentCommandCenterProps {
  chapters: EverTaleChapter[];
  onPlayChime: () => void;
}

export const ParentCommandCenter: React.FC<ParentCommandCenterProps> = ({ chapters, onPlayChime }) => {
  const [recipientName, setRecipientName] = useState('');
  const [giftCardCode, setGiftCardCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    onPlayChime();
    const code = `EVERTALE-GIFT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setGiftCardCode(code);
  };

  const handleCopyCode = () => {
    if (giftCardCode) {
      navigator.clipboard.writeText(giftCardCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <section className="relative rounded-3xl bg-gradient-to-b from-slate-950 via-emerald-950/60 to-slate-950 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl overflow-hidden text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <Lock className="w-3.5 h-3.5 text-emerald-300" />
            Local Story Library
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-200 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
            Parent Command Center
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Review the birthday story chapters saved in this browser and explore prototype keepsake tools.
          </p>
        </div>
      </section>

      {/* GORDIAN PRIVACY SHIELD STATUS BOARD */}
      <section className="bg-slate-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-emerald-200">
                Prototype Storage Status
              </h2>
              <p className="text-xs text-slate-400">No photo uploads. Story records are stored locally in this browser.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold rounded-full flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Local mode
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
            <span className="text-slate-400 block font-medium">Photo Processing</span>
            <span className="text-emerald-300 font-bold text-sm flex items-center gap-1">
              <Trash2 className="w-4 h-4 text-emerald-400" /> Not implemented
            </span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
            <span className="text-slate-400 block font-medium">Storage Location</span>
            <span className="text-cyan-300 font-bold text-sm">Browser local storage</span>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-1">
            <span className="text-slate-400 block font-medium">Legacy Unlock Age</span>
            <span className="text-amber-300 font-bold text-sm">Age 18 Milestone Transfer</span>
          </div>
        </div>
      </section>

      {/* SAVED CHAPTERS ARCHIVE */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-cyan-200">
          Saved Annual Birthday Chapters ({chapters.length})
        </h2>

        {chapters.length === 0 ? (
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-10 text-center text-slate-400 space-y-2">
            <Award className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="font-serif text-lg font-bold text-cyan-200">No Chapters Created Yet</p>
            <p className="text-xs text-slate-400">
              Visit the &ldquo;EverTale Chapter Creator&rdquo; tab to weave your child&apos;s first birthday story.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chapters.map((ch) => (
              <div
                key={ch.id}
                className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 shadow-xl space-y-4 hover:border-cyan-400/50 transition-all"
              >
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 uppercase">
                      Chapter {ch.age} • {ch.archetype}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-cyan-100">{ch.childName}&apos;s Chapter</h3>
                  </div>
                  <span className="text-xs text-slate-400">{ch.createdAt}</span>
                </div>

                <p className="text-xs text-slate-300 italic font-serif bg-slate-900 p-3 rounded-xl border border-slate-800">
                  &ldquo;{ch.chapterTitle}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-emerald-300 flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" /> Saved on this device
                  </span>
                  <button
                    onClick={onPlayChime}
                    className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-serif font-bold rounded-xl flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" /> Export Heirloom PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* GRANDPARENTS / RELATIVES GIFT CARD GENERATOR */}
      <section className="bg-slate-950 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3 border-b border-amber-500/20 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-amber-200">
              Grandparent &amp; Relative Gift Card Voucher ($79)
            </h2>
            <p className="text-xs text-slate-400">Gift an annual EverTale chapter to a loved child</p>
          </div>
        </div>

        <form onSubmit={handleGenerateGiftCard} className="space-y-4">
          <div>
            <label htmlFor="recipient-name-input" className="block text-xs font-semibold text-amber-200 mb-1">
              Recipient Child Name
            </label>
            <input
              id="recipient-name-input"
              type="text"
              required
              placeholder="e.g. Grandchild Emma"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-amber-100 text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-serif font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Preview Gift Voucher Code</span>
          </button>
        </form>

        {giftCardCode && (
          <div className="p-4 bg-amber-950/60 border border-amber-400/40 rounded-2xl space-y-3 animate-fade-in text-center">
            <span className="text-xs text-amber-300 font-semibold block uppercase tracking-wider">
              Demo Voucher Preview for {recipientName}
            </span>
            <div className="flex items-center justify-center gap-2 bg-slate-950 p-3 rounded-xl border border-amber-500/30">
              <span className="font-mono text-lg font-bold text-amber-200">{giftCardCode}</span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 bg-amber-400 text-slate-950 rounded-lg hover:bg-amber-300"
                title="Copy Voucher Code"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Prototype only. This code has no monetary value and cannot be redeemed.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
