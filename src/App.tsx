import { useEffect, useRef, useState } from 'react';
import { MapPin, Instagram, Menu, X, Navigation, ChevronDown, Phone, Clock, MessageCircle } from 'lucide-react';

const MAPS_DIR = 'https://www.google.com/maps/dir/?api=1&destination=Via+Garibaldi+76+09125+Cagliari';
const MAPS_EMBED = 'https://maps.google.com/maps?q=Via+Garibaldi+76+09125+Cagliari&output=embed';
const INSTAGRAM = 'https://instagram.com/otto_cagliari';
const PHONE_TEL = '+393208319987';
const PHONE_DISPLAY = '320 831 9987';
const WHATSAPP = 'https://wa.me/393208319987';

const HOURS: [string, string][] = [
  ['Lunedì', '17-22'],
  ['Martedì', 'Chiuso'],
  ['Mercoledì', 'Chiuso'],
  ['Giovedì', '11-14 · 17-22'],
  ['Venerdì', '11-14 · 17-22'],
  ['Sabato', '11-14 · 17-22'],
  ['Domenica', '17-22'],
];

// ─── Reveal hook ────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

// ─── Logo ───────────────────────────────────────────────────────────────────
// Logo OttO ufficiale (wordmark "otto" bianco). Usato bianco su sfondi scuri/colorati.

function OttoLogo({ height = 36, className = '', badge = false }: { height?: number; className?: string; badge?: boolean }) {
  const img = (
    <img
      src="/otto-logo.png"
      alt="OttO"
      style={{ height }}
      className={`w-auto ${className}`}
      draggable={false}
    />
  );
  if (!badge) return img;
  return (
    <div
      className="rounded-full bg-otto-purple flex items-center justify-center shadow-lg shrink-0"
      style={{ width: height * 2, height: height * 2 }}
    >
      {img}
    </div>
  );
}

// ─── Stripe bar separator ────────────────────────────────────────────────────

function StripeSeparator() {
  return <div className="stripe-bar w-full" aria-hidden="true" />;
}

// ─── Header ─────────────────────────────────────────────────────────────────

const HEADER_ACCENT = '#7B4FA0'; // purple for sticky header

function Header({ onNav }: { onNav: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'I Drink', id: 'drink' },
    { label: 'Antonio', id: 'antonio' },
    { label: 'Recensioni', id: 'recensioni' },
    { label: 'Dove Siamo', id: 'dove-siamo' },
  ];

  const handleNav = (id: string) => {
    setMenuOpen(false);
    onNav(id);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ backgroundColor: HEADER_ACCENT }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          onClick={() => handleNav('hero')}
          className="hover:opacity-80 transition-opacity flex items-center"
          aria-label="OttO home"
        >
          <OttoLogo height={22} badge className="px-1.5" />
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Navigazione principale">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="font-sans font-700 text-sm text-white/90 hover:text-white transition-colors tracking-wide uppercase"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('dove-siamo')}
            className="font-sans font-800 text-sm bg-otto-yellow text-otto-charcoal px-5 py-2.5 rounded-full hover:brightness-105 transition-all"
          >
            Vieni a Trovarci
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}
        style={{ backgroundColor: HEADER_ACCENT }}
      >
        <nav className="flex flex-col px-6 pb-4 gap-1" aria-label="Menu mobile">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="font-sans font-700 text-base text-white py-3 text-left border-b border-white/20 uppercase tracking-wide min-h-[44px]"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('dove-siamo')}
            className="font-sans font-800 text-sm bg-otto-yellow text-otto-charcoal px-5 py-3 rounded-full mt-3 min-h-[44px]"
          >
            Vieni a Trovarci
          </button>
        </nav>
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col" aria-label="Hero">
      {/* Background: storefront photo with colored stripe overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/vetrina.png"
          alt="Esterno del locale OttO in Via Garibaldi, Cagliari"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Semi-opaque stripe overlay so text pops */}
        <div className="absolute inset-0 hero-stripes opacity-80" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-6 pt-32 pb-24">
        <Reveal>
          <p className="font-sans font-800 text-sm sm:text-base tracking-widest uppercase text-white/90 mb-6">
            Via Garibaldi 76 · Cagliari
          </p>
          <div className="flex justify-center mb-6">
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-otto-purple flex items-center justify-center shadow-2xl">
              <OttoLogo height={88} className="px-2" />
            </div>
          </div>
          <p className="font-sans font-800 text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-widest mb-4">
            Il drink che ti segue
          </p>
          <p className="font-sans text-base sm:text-lg text-white/90 max-w-lg mx-auto mb-10 font-600 leading-relaxed">
            Mocktails &amp; Cocktails artigianali con frutta fresca.<br />
            Da passeggio, nel cuore di Cagliari.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNav('dove-siamo')}
              className="font-sans font-800 text-sm bg-white text-otto-charcoal px-8 py-4 rounded-full hover:brightness-95 transition-all flex items-center justify-center gap-2 min-h-[52px]"
            >
              <MapPin size={18} />
              Trovaci in Via Garibaldi
            </button>
            <button
              onClick={() => onNav('drink')}
              className="font-sans font-800 text-sm bg-otto-yellow text-otto-charcoal px-8 py-4 rounded-full hover:brightness-105 transition-all min-h-[52px]"
            >
              Scopri i Drink
            </button>
          </div>
        </Reveal>
      </div>

      <button
        onClick={() => onNav('concept')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors animate-bounce"
        aria-label="Scorri in basso"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
}

// ─── Il Concept ─────────────────────────────────────────────────────────────

function Concept() {
  return (
    <section id="concept" className="bg-white py-20 sm:py-28 px-6" aria-labelledby="concept-heading">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="font-sans font-800 text-xs tracking-widest uppercase text-otto-purple mb-4">
            Chi Siamo
          </p>
          <h2 id="concept-heading" className="font-sans font-900 text-4xl sm:text-5xl text-otto-charcoal leading-tight mb-8">
            Non un bar. Un'idea.
          </h2>
          <p className="font-sans text-lg sm:text-xl text-otto-charcoal/80 leading-relaxed font-500">
            OttO non è un bar. È un'idea: drink artigianali fatti con{' '}
            <strong className="text-otto-purple font-800">frutta fresca di giornata</strong>, da portare
            con te mentre passeggi per Cagliari. Cocktail per chi ama l'alcol. Mocktail per chi non
            lo ama, non lo vuole, o non lo può bere, ma vuole bere qualcosa di incredibile lo stesso.
            Zero succhi industriali. Zero compromessi. Solo frutta vera, mani esperte, e un sorriso.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── I Nostri Drink ─────────────────────────────────────────────────────────

const drinkCategories = [
  {
    id: 'mocktails',
    label: 'Mocktails',
    emoji: '🌿',
    bg: '#6BC5A0',
    description:
      'Drink analcolici che non hanno nulla da invidiare ai cocktail. Frutta fresca, gusto pieno, zero alcol. Finalmente.',
  },
  {
    id: 'cocktails',
    label: 'Cocktails',
    emoji: '🍹',
    bg: '#E8836B',
    description:
      'I classici e le nostre creazioni, sempre con frutta fresca di giornata. Mai un succo da bottiglia.',
  },
  {
    id: 'signature',
    label: 'Signature',
    emoji: '✨',
    bg: '#7B4FA0',
    description:
      'I drink firmati Antonio. Combinazioni uniche, sapori che non trovi altrove.',
  },
];

function Drink() {
  return (
    <section id="drink" aria-labelledby="drink-heading">
      <StripeSeparator />
      <div className="py-20 sm:py-28 px-6" style={{ backgroundColor: '#F5C842' }}>
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-sans font-800 text-xs tracking-widest uppercase text-otto-charcoal/70 mb-4">
                Cosa Beviamo
              </p>
              <h2 id="drink-heading" className="font-sans font-900 text-4xl sm:text-5xl text-otto-charcoal leading-tight">
                I Nostri Drink
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {drinkCategories.map((cat) => (
              <Reveal key={cat.id}>
                <div
                  className="drink-card rounded-3xl p-8 flex flex-col h-full"
                  style={{ backgroundColor: cat.bg }}
                >
                  <span className="text-5xl mb-4" aria-hidden="true">{cat.emoji}</span>
                  <h3 className="font-sans font-900 text-3xl text-white mb-4">{cat.label}</h3>
                  <p className="font-sans text-white/90 text-base leading-relaxed font-500 flex-grow">
                    {cat.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="text-center font-sans text-otto-charcoal/80 font-600 mt-10 text-base">
              Il menu cambia con la frutta di stagione.{' '}
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="font-800 text-otto-charcoal underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Seguici su @otto_cagliari
              </a>{' '}
              per i drink del giorno.
            </p>
          </Reveal>
        </div>
      </div>
      <StripeSeparator />
    </section>
  );
}

// ─── Mocktail Manifesto ──────────────────────────────────────────────────────

function MocktailManifesto() {
  return (
    <section
      id="manifesto"
      aria-labelledby="manifesto-heading"
      className="py-20 sm:py-28 px-6"
      style={{ backgroundColor: '#6BC5A0' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="font-sans font-800 text-xs tracking-widest uppercase text-white/80 mb-4">
            Chi Non Beve, Beve Meglio
          </p>
          <h2
            id="manifesto-heading"
            className="font-sans font-900 text-4xl sm:text-5xl text-white leading-tight mb-8"
          >
            Il Mocktail<br />non è il piano B.
          </h2>
          <p className="font-sans text-lg sm:text-xl text-white/95 leading-relaxed font-500">
            Per troppo tempo, chi non beve alcol ha avuto due opzioni: acqua o un succo triste. Da OttO,
            i mocktail non sono il piano B. Sono il piano A. Stessa cura, stessa{' '}
            <strong className="font-800">frutta fresca</strong>, stessa qualità. Il bicchiere più bello
            del tuo aperitivo potrebbe essere quello senza alcol.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Antonio ────────────────────────────────────────────────────────────────

function Antonio() {
  return (
    <section id="antonio" className="bg-white py-20 sm:py-28 px-6" aria-labelledby="antonio-heading">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-otto-blue">
            <img
              src="/antonio.png"
              alt="Antonio, il barman di OttO, con un drink alla frutta fresca"
              className="w-full h-72 sm:h-[28rem] object-cover object-center"
              loading="lazy"
            />
          </div>
        </Reveal>
        <Reveal>
          <div>
            <p className="font-sans font-800 text-xs tracking-widest uppercase text-otto-blue mb-4">
              Il Maestro
            </p>
            <h2 id="antonio-heading" className="font-sans font-900 text-4xl sm:text-5xl text-otto-charcoal leading-tight mb-6">
              Dietro ogni drink<br />c'è Antonio.
            </h2>
            <p className="font-sans text-lg text-otto-charcoal/80 leading-relaxed font-500">
              Le sue mani, la sua esperienza, il suo sorriso. Ha un talento: farti sentire che
              quel drink lo ha fatto apposta per te. Perché probabilmente è vero.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Recensioni ─────────────────────────────────────────────────────────────

const REVIEWS = [
  {
    author: 'Riccardo Cocco',
    text: "Otto concretizza un'idea che va a risolvere un grosso problema: creare una realtà in cui chi non vuole o non può bere alcol può finalmente godersi un drink dissetante, gustoso e di qualità alta.",
    bg: '#6BC5A0',
  },
  {
    author: 'Daniela Cadoni',
    text: "OttO il drink che ti segue. Mocktails e Cocktails artigianali e freschi in pieno centro a Cagliari. Assolutamente da provare. Ottimi! Complimenti ad Antonio.",
    bg: '#7B4FA0',
  },
  {
    author: 'Barbara Poddi',
    text: "Non pensate al solito cocktail alla frutta, quelli fatti con i succhi industriali. Da Antonio potrete bere dei cocktail realizzati con frutta fresca di giornata.",
    bg: '#5BB8D4',
  },
  {
    author: 'Silvia Raia',
    text: "Ho conosciuto il nuovo locale mentre passeggiavo col mio compagno in via Garibaldi, mi hanno colpito l'insegna colorata e la simpatia del titolare che ci ha proposto di assaggiare un cocktail da passeggio, come rifiutare…",
    bg: '#E8836B',
  },
  {
    author: 'John Longbottom',
    text: "I migliori cocktail di Cagliari in un piccolo bar nascosto. Consiglio vivamente di prendere un drink qui e poi passeggiare per le strade la sera. Il cocktail all'anguria e tabacco era incredibile.",
    bg: '#E8812A',
  },
  {
    author: 'Giulio Scalas',
    text: "Al Bar Otto ho gustato un ottimo drink preparato dalle mani esperte di Antonio. Consiglio vivamente tanti gusti e sapori diversi uno più buono dell'altro.",
    bg: '#F5C842',
  },
];

function Recensioni() {
  return (
    <section
      id="recensioni"
      aria-labelledby="recensioni-heading"
      className="py-20 sm:py-28 px-6"
      style={{ backgroundColor: '#2A2A2A' }}
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <p className="font-sans font-800 text-xs tracking-widest uppercase text-white/60 mb-4">
              Cosa Dicono
            </p>
            <h2 id="recensioni-heading" className="font-sans font-900 text-4xl sm:text-5xl text-white leading-tight">
              Chi è venuto, ha parlato.
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <Reveal key={r.author}>
              <div
                className="drink-card rounded-3xl p-7 h-full flex flex-col"
                style={{
                  backgroundColor: r.bg,
                  color: r.bg === '#F5C842' ? '#2A2A2A' : '#FFFFFF',
                }}
              >
                <p className="font-sans text-base leading-relaxed font-500 flex-grow">
                  "{r.text}"
                </p>
                <p
                  className="font-sans font-800 text-sm mt-5 tracking-wide uppercase"
                  style={{ opacity: r.bg === '#F5C842' ? 0.7 : 0.85 }}
                >
                  — {r.author}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Dove Siamo ─────────────────────────────────────────────────────────────

function DoveSiamo() {
  return (
    <section id="dove-siamo" aria-labelledby="dove-heading">
      <StripeSeparator />
      <div className="py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-sans font-800 text-xs tracking-widest uppercase text-otto-coral mb-4">
                Dove Siamo
              </p>
              <h2 id="dove-heading" className="font-sans font-900 text-4xl sm:text-5xl text-otto-charcoal leading-tight mb-4">
                Via Garibaldi 76, Cagliari
              </h2>
              <p className="font-sans text-lg text-otto-charcoal/70 font-500">
                Nel cuore della zona pedonale. Prendilo e passeggia.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <Reveal>
              <div className="space-y-5">
                {/* Address */}
                <div className="rounded-3xl p-7" style={{ backgroundColor: '#E8836B' }}>
                  <div className="flex items-start gap-4">
                    <MapPin size={26} className="text-white mt-1 shrink-0" />
                    <div>
                      <h3 className="font-sans font-800 text-lg text-white mb-1">Indirizzo</h3>
                      <p className="font-sans text-white/90 font-500">
                        Via Garibaldi 76, 09125 Cagliari (CA)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contacts */}
                <div className="rounded-3xl p-7 space-y-5" style={{ backgroundColor: '#5BB8D4' }}>
                  <div className="flex items-start gap-4">
                    <Phone size={26} className="text-white mt-1 shrink-0" />
                    <div>
                      <h3 className="font-sans font-800 text-lg text-white mb-1">Telefono</h3>
                      <a
                        href={`tel:${PHONE_TEL}`}
                        className="font-sans text-white/90 font-500 hover:text-white transition-colors underline underline-offset-2"
                      >
                        {PHONE_DISPLAY}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MessageCircle size={26} className="text-white mt-1 shrink-0" />
                    <div>
                      <h3 className="font-sans font-800 text-lg text-white mb-1">WhatsApp</h3>
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-white/90 font-500 hover:text-white transition-colors underline underline-offset-2"
                      >
                        Scrivici su WhatsApp
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Instagram size={26} className="text-white mt-1 shrink-0" />
                    <div>
                      <h3 className="font-sans font-800 text-lg text-white mb-1">Instagram</h3>
                      <a
                        href={INSTAGRAM}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-white/90 font-500 hover:text-white transition-colors underline underline-offset-2"
                      >
                        @otto_cagliari
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-3xl p-7" style={{ backgroundColor: '#7B4FA0' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={24} className="text-white shrink-0" />
                    <h3 className="font-sans font-800 text-lg text-white">Orari</h3>
                  </div>
                  <ul className="space-y-2">
                    {HOURS.map(([day, time]) => {
                      const closed = time === 'Chiuso';
                      return (
                        <li
                          key={day}
                          className="flex items-center justify-between font-sans text-sm border-b border-white/15 pb-2 last:border-0"
                        >
                          <span className={`font-700 ${closed ? 'text-white/50' : 'text-white'}`}>{day}</span>
                          <span className={`font-600 ${closed ? 'text-white/50' : 'text-otto-yellow'}`}>{time}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Route CTA */}
                <a
                  href={MAPS_DIR}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 font-sans font-800 text-base bg-otto-yellow text-otto-charcoal px-8 py-5 rounded-full hover:brightness-105 transition-all w-full min-h-[56px]"
                >
                  <Navigation size={22} />
                  Portami lì — Via Garibaldi 76
                </a>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-3xl overflow-hidden border-4 border-otto-yellow">
                <iframe
                  src={MAPS_EMBED}
                  width="100%"
                  height="400"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mappa OttO Via Garibaldi 76 Cagliari"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <StripeSeparator />
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ backgroundColor: '#2A2A2A' }}>
      <div className="flex justify-center mb-3">
        <OttoLogo height={30} badge className="px-1.5" />
      </div>
      <p className="font-sans font-600 text-sm text-white/60 uppercase tracking-widest mb-4">
        Il drink che ti segue · Cagliari
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6">
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-sans font-700 text-sm text-otto-yellow hover:text-white transition-colors"
        >
          <Instagram size={16} />
          @otto_cagliari
        </a>
        <a
          href={`tel:${PHONE_TEL}`}
          className="inline-flex items-center gap-2 font-sans font-700 text-sm text-otto-yellow hover:text-white transition-colors"
        >
          <Phone size={16} />
          {PHONE_DISPLAY}
        </a>
      </div>
      <p className="font-sans text-xs text-white/30 mt-2">
        © {new Date().getFullYear()} OttO — Via Garibaldi 76, Cagliari
      </p>
    </footer>
  );
}

// ─── Mobile Action Bar ───────────────────────────────────────────────────────

function MobileActionBar() {
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3"
      style={{ backgroundColor: '#2A2A2A', borderTop: '3px solid #F5C842' }}
      role="navigation"
      aria-label="Azioni rapide"
    >
      <a
        href={`tel:${PHONE_TEL}`}
        className="flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#6BC5A0' }}
        aria-label="Chiama OttO"
      >
        <Phone size={22} className="text-white" />
        <span className="font-sans font-800 text-[11px] text-white uppercase tracking-wide">Chiama</span>
      </a>
      <a
        href={MAPS_DIR}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#E8836B' }}
        aria-label="Indicazioni per OttO"
      >
        <Navigation size={22} className="text-white" />
        <span className="font-sans font-800 text-[11px] text-white uppercase tracking-wide">Indicazioni</span>
      </a>
      <a
        href={INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center py-3 gap-1 min-h-[56px] hover:opacity-90 transition-opacity"
        style={{ backgroundColor: '#7B4FA0' }}
        aria-label="Instagram @otto_cagliari"
      >
        <Instagram size={22} className="text-white" />
        <span className="font-sans font-800 text-[11px] text-white uppercase tracking-wide">Instagram</span>
      </a>
    </div>
  );
}

// ─── Floating WhatsApp ───────────────────────────────────────────────────────

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
      style={{ backgroundColor: '#6BC5A0' }}
      aria-label="Scrivici su WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNav={scrollTo} />
      <main>
        <Hero onNav={scrollTo} />
        <Concept />
        <Drink />
        <MocktailManifesto />
        <Antonio />
        <Recensioni />
        <DoveSiamo />
      </main>
      <Footer />
      <MobileActionBar />
      <FloatingWhatsApp />
      {/* Spacer for mobile action bar */}
      <div className="md:hidden h-14" aria-hidden="true" />
    </div>
  );
}
