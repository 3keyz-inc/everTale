import React, { useState } from 'react';
import { Sparkles, Shield, Lock, Gift, Play, Star, ChevronRight, Heart, HeartHandshake, CheckCircle2, Sliders, Mail, Eye } from 'lucide-react';
import twinGeniesImg from '../assets/images/twin_genies_hero_1785302525173.jpg';

interface EverTalePortalProps {
  onPlayChime: () => void;
  onNavigateToCreator: () => void;
}

export const EverTalePortal: React.FC<EverTalePortalProps> = ({ onPlayChime, onNavigateToCreator }) => {
  const [selectedAge, setSelectedAge] = useState<number>(7);
  const [activeEcosystemCard, setActiveEcosystemCard] = useState<number | null>(null);
  const [showLetterModal, setShowLetterModal] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);

  const ecosystemItems = [
    {
      icon: '🎬',
      title: 'Induction Cartoon',
      tagline: 'A 3-minute cinematic short starring them',
      testimonial: '"Leo watched his cartoon 14 times before breakfast. He genuinely believes Zephyr chose him to guard the Lotus Tree!" — Sarah M., Beta Mom',
    },
    {
      icon: '🎮',
      title: 'Interactive Game',
      tagline: 'A custom-built adventure that evolves all year',
      testimonial: '"The game adapts to her real interests. When she learned swimming, her avatar gained water-breathing powers!" — David K., Beta Dad',
    },
    {
      icon: '🎨',
      title: 'Infinite Coloring Book',
      tagline: 'Endless art starring them. Print or play.',
      testimonial: '"We print a new chapter coloring sheet every Sunday. It is our quiet family ritual now." — Elena R., Beta Mom',
    },
    {
      icon: '💬',
      title: 'Parent Command Center',
      tagline: 'Your private channel to guide the story securely',
      testimonial: '"The Gordian privacy shield gave us total peace of mind. Zero photos stored, total magic delivered." — Marcus T., Beta Dad',
    },
  ];

  const handleAgeChange = (age: number) => {
    onPlayChime();
    setSelectedAge(age);
  };

  return (
    <div className="space-y-20 font-sans text-slate-100">
      {/* SECTION 1: HERO LANDING (THE PORTAL) */}
      <section className="relative min-h-[85vh] rounded-3xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 p-8 sm:p-16 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl">
        {/* Animated Background Starfield & Glowing Nebulae */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,229,255,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(245,166,35,0.1),transparent_50%)] pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          {/* EverTale Top Header */}
          <div className="space-y-2 mb-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
              EverTale Universe
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-cyan-300 uppercase drop-shadow-lg">
              EverTale
            </h2>
          </div>

          {/* Twin Genies Hero Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-cyan-400/40 shadow-2xl shadow-cyan-500/20 group">
            <img
              src={twinGeniesImg}
              alt="Zephyr & The Wish Weavers"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-72 object-cover rounded-2xl transform group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-serif font-bold text-cyan-200 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-cyan-500/30">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Guided by Zephyr, the Wish Weaver
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
                EverTale Universe
              </span>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase">
            <Star className="w-3.5 h-3.5 text-amber-300" />
            The Annual Living Story Engine
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-200 via-amber-200 to-amber-400 bg-clip-text text-transparent leading-tight">
            The birthday gift that becomes their legend.
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Every birthday, Zephyr the Wish Weaver spins a cinematic cartoon starring your child, a custom mini-game, and an heirloom legacy story that grows with them forever.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                onPlayChime();
                onNavigateToCreator();
              }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-base rounded-2xl shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Create Your Child&apos;s Chapter</span>
              <ChevronRight className="w-5 h-5 text-slate-950" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4 text-cyan-300" />
              <span>Explore How It Works</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS (THE INDUCTION) */}
      <section id="how-it-works" className="space-y-10 max-w-5xl mx-auto">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">3 Simple Steps to Magic</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cyan-100">
            How The Annual Induction Works
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            From a 5-minute parent whisper to an unforgettable birthday morning revelation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'You Whisper Their Story',
              desc: 'Share 3 simple details about your child’s passions, fears, and hero traits during a quiet 5-minute Story Seed session.',
              icon: '✨',
              color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/40',
            },
            {
              step: '02',
              title: 'Zephyr Weaves the Magic',
              desc: 'Our engine generates a personalized 3-minute cartoon short, an adaptive game level, and a printable custom coloring chapter.',
              icon: '🌌',
              color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40',
            },
            {
              step: '03',
              title: 'They Awaken as a Hero',
              desc: 'On birthday morning, hand them the screen or unlock the physical heirloom. Watch their eyes light up as Zephyr calls them by name.',
              icon: '👑',
              color: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/40',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`relative bg-slate-950 border rounded-3xl p-8 space-y-4 hover:border-cyan-400 transition-all cursor-pointer shadow-xl ${
                activeStep === idx ? 'border-cyan-400 ring-2 ring-cyan-400/20' : 'border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-mono text-cyan-400/80">{item.step}</span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-100">{item.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE INDUCTION CARTOON PREVIEW (THE AWE ENGINE) */}
      <section className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 sm:p-12 shadow-2xl max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-cyan-500/20 pb-6">
          <div className="space-y-2">
            <span className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold rounded-full uppercase">
              Interactive Story Evolution Engine
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cyan-100">
              Watch Their Hero Power Evolve Each Year
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Slide between ages to see how the art style, tone, and story complexity automatically scale with your child.
            </p>
          </div>

          {/* Age Selector Slider Buttons */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            {[5, 7, 9, 12].map((age) => (
              <button
                key={age}
                onClick={() => handleAgeChange(age)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                  selectedAge === age
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Age {age}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Chapter Art Preview Card */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-amber-400 text-xs font-bold font-mono uppercase">
                Chapter Age {selectedAge} • {selectedAge <= 6 ? 'Chibi / Fairytale Style' : selectedAge <= 9 ? 'Comic Book Adventure' : 'Cinematic Mythos'}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cyan-200">
                {selectedAge <= 6 && '“Leo and the Whispering Dragon of the Stardust Forest”'}
                {selectedAge === 7 && '“Leo and the Guardian of the Lotus Shrine”'}
                {selectedAge === 9 && '“Leo, Commander of the Stardust Nebula”'}
                {selectedAge === 12 && '“The Eclipse Legacy: Leo’s Final Awakening”'}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Play className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>3:12 Muted Preview</span>
            </div>
          </div>

          {/* Simulated Video Frame */}
          <div className="relative aspect-video rounded-xl bg-slate-950 border border-cyan-500/30 overflow-hidden flex items-center justify-center p-6 text-center shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-transparent to-amber-950/30 pointer-events-none" />
            <div className="space-y-4 max-w-md relative z-10">
              <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-300 flex items-center justify-center mx-auto text-amber-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <p className="font-serif text-sm sm:text-base italic text-cyan-100">
                &ldquo;Greetings, Leo! On your {selectedAge}th birthday, the ancient Stardust Lotus blazes anew. You possess the {selectedAge <= 7 ? 'Shield of Courage' : 'Emblem of Starfire'}. Come, your kingdom awaits!&rdquo;
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950 border border-cyan-400/40 text-cyan-300 text-xs rounded-full">
                <Shield className="w-3.5 h-3.5" /> Gordian Effect Verified • Personalized Audio Render
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ECOSYSTEM (WHAT THEY GET) */}
      <section className="space-y-8 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Complete Annual Bundle</span>
          <h2 className="font-serif text-3xl font-bold text-cyan-100">Everything Included in Every Chapter</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ecosystemItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                onPlayChime();
                setActiveEcosystemCard(activeEcosystemCard === idx ? null : idx);
              }}
              className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 hover:border-amber-400/60 transition-all cursor-pointer shadow-xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-1 rounded-full border border-cyan-800">
                  Click for Parent Feedback
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-200">{item.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{item.tagline}</p>

              {activeEcosystemCard === idx && (
                <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-2xl text-xs text-amber-100 italic animate-fade-in font-serif">
                  {item.testimonial}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: THE EMOTIONAL ANCHOR (LEGACY LETTER TEASE) */}
      <section className="bg-gradient-to-r from-amber-950/60 via-slate-950 to-amber-950/60 border border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-4xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 mx-auto">
          <Mail className="w-6 h-6" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">The Age 18 Milestone Transfer</span>
          <h2 className="font-serif text-3xl font-bold text-amber-100">The Legacy Letter Bridge</h2>
          <p className="text-slate-300 text-sm leading-relaxed font-light">
            And at the end of each annual chapter, a letter is archived into their private vault. On their 18th birthday, the entire physical and digital heirloom transfers to them.
          </p>
        </div>

        <button
          onClick={() => {
            onPlayChime();
            setShowLetterModal(true);
          }}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-serif font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Mail className="w-4 h-4" />
          <span>Read Sample Legacy Letter</span>
        </button>
      </section>

      {/* LEGACY LETTER MODAL */}
      {showLetterModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <span className="font-serif text-sm font-bold text-amber-300 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Sample Legacy Letter • Chapter Age 7
              </span>
              <button
                onClick={() => setShowLetterModal(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="font-serif text-xs text-amber-100/90 leading-relaxed space-y-3 bg-slate-950 p-6 rounded-2xl border border-amber-500/20">
              <p className="italic text-amber-300">&ldquo;Dear 7-year-old Leo,</p>
              <p>
                This year, you learned to swim in the deep end of the blue lake without your floaties. You held your breath and told your mom, &lsquo;Look, I’m flying under water!&rsquo;
              </p>
              <p>
                When Zephyr summoned you to defend the Lotus Garden, you didn’t hesitate. Keep that fearless heart as you grow. The world needs heroes who care as deeply as you do.&rdquo;
              </p>
              <p className="text-right text-amber-400 font-bold">— Encrypted in your EverTale Vault for Age 18</p>
            </div>

            <button
              onClick={() => setShowLetterModal(false)}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-serif font-bold text-xs rounded-xl"
            >
              Close Sample Letter
            </button>
          </div>
        </div>
      )}

      {/* SECTION 6: TRUST & SAFETY (THE GORDIAN WALL) */}
      <section className="bg-slate-950 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4 border-b border-emerald-500/20 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-200">
              The Gordian Effect Privacy Guarantee
            </h2>
            <p className="text-xs text-slate-400">Zero data harvesting. Zero ads. Absolute peace of mind.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-emerald-300 font-bold text-sm block">Instant Photo Shredding</span>
            <p className="text-slate-300 leading-relaxed">
              Raw parent photos uploaded for character styling are processed immediately in memory and destroyed within milliseconds.
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-cyan-300 font-bold text-sm block">COPPA &amp; GDPR-K Compliant</span>
            <p className="text-slate-300 leading-relaxed">
              We never train public AI models on your child&apos;s image, voice, or story inputs. Your vault is strictly isolated.
            </p>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <span className="text-amber-300 font-bold text-sm block">AES-256 Vault Encryption</span>
            <p className="text-slate-300 leading-relaxed">
              All digital chapters and legacy letters are stored under Cloudflare R2 encrypted buckets accessible only by parent login.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: PRICING (SIMPLE & PREMIUM) */}
      <section className="bg-slate-950 border border-amber-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-2">
          <span className="px-3 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold rounded-full uppercase">
            Simple Annual Subscription
          </span>
          <h2 className="font-serif text-3xl font-bold text-amber-100">$79 / Year Per Child</h2>
          <p className="text-slate-400 text-xs">Pause or cancel anytime. Past chapters stay in your vault forever.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left space-y-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>3-Minute Custom Induction Cartoon starring your child</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Custom Interactive Mini-Game Level</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Printable Infinite Coloring Chapter</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Private Parent Command Center &amp; Legacy Vault</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Grandparent &amp; Sibling Add-On Options Available</span>
          </div>
        </div>

        <button
          onClick={() => {
            onPlayChime();
            onNavigateToCreator();
          }}
          className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-serif font-bold text-sm sm:text-base rounded-2xl shadow-xl transition-all cursor-pointer"
        >
          Begin Your Child&apos;s First Chapter ($79/yr)
        </button>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="bg-gradient-to-b from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-500/30 rounded-3xl p-10 sm:p-16 text-center space-y-6 shadow-2xl">
        <h2 className="font-serif text-3xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-200 via-amber-200 to-amber-400 bg-clip-text text-transparent">
          Their legend is waiting. Will you begin?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
          Give your child the gift of knowing they are the hero of their own childhood story.
        </p>

        <button
          onClick={() => {
            onPlayChime();
            onNavigateToCreator();
          }}
          className="px-10 py-4 bg-gradient-to-r from-cyan-400 via-amber-300 to-amber-400 text-slate-950 font-serif font-bold text-base rounded-2xl shadow-2xl shadow-cyan-500/30 hover:scale-105 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>Weave First Chapter Now</span>
        </button>
      </section>
    </div>
  );
};
