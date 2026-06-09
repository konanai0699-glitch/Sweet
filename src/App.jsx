import { useState, useEffect, useRef } from "react";

// ── Palette ───────────────────────────────────────────────────────
const C = {
  cream: "#FFF8FA",
  blush: "#FDE8EF",
  pink: "#F4B8CB",
  rosePink: "#E8809A",
  deepRose: "#C45C78",
  gold: "#C9A84C",
  lightGold: "#E8D08A",
  warmGold: "#B8960A",
  darkText: "#3A2030",
  muted: "#9B7080",
  white: "#FFFFFF",
  shadow: "rgba(196,92,120,0.15)",
  shadowGold: "rgba(201,168,76,0.2)",
};

// ── Styles ────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { direction: rtl; font-family: 'Tajawal', sans-serif; background: ${C.cream}; color: ${C.darkText}; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${C.blush}; }
  ::-webkit-scrollbar-thumb { background: ${C.rosePink}; border-radius: 4px; }

  @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
  @keyframes fadeOut   { from { opacity:1; } to { opacity:0; } }
  @keyframes float     { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-10px) rotate(2deg);} }
  @keyframes shimmerGold { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.9);} to{opacity:1;transform:scale(1);} }
  @keyframes pageEnter { from{opacity:0;transform:translateY(18px);} to{opacity:1;transform:translateY(0);} }
  @keyframes pulseRose { 0%,100%{box-shadow:0 0 0 0 rgba(228,128,154,0.5);} 50%{box-shadow:0 0 0 10px rgba(228,128,154,0);} }
  @keyframes waBounce  { 0%,100%{transform:scale(1) rotate(0deg);} 25%{transform:scale(1.08) rotate(-3deg);} 75%{transform:scale(1.08) rotate(3deg);} }
  @keyframes orbFloat1 { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(18px,-14px) scale(1.05);} 66%{transform:translate(-12px,18px) scale(0.97);} }
  @keyframes orbFloat2 { 0%,100%{transform:translate(0,0) scale(1);} 33%{transform:translate(-18px,10px) scale(1.03);} 66%{transform:translate(14px,-18px) scale(0.96);} }
  @keyframes goldPulse { 0%,100%{opacity:0.6;transform:scale(1);} 50%{opacity:1;transform:scale(1.03);} }
  @keyframes thumbReveal { from{opacity:0;transform:scale(0.8) translateX(20px);} to{opacity:1;transform:scale(1) translateX(0);} }
  @keyframes lightboxIn { from{opacity:0;transform:scale(0.92);} to{opacity:1;transform:scale(1);} }

  /* ── Splash animations ── */
  @keyframes splashBg { 0%{opacity:0;} 15%{opacity:1;} 80%{opacity:1;} 100%{opacity:0;} }
  @keyframes splashCard { from{opacity:0;transform:scale(0.82) translateY(30px);} to{opacity:1;transform:scale(1) translateY(0);} }
  @keyframes splashCardOut { from{opacity:1;transform:scale(1) translateY(0);} to{opacity:0;transform:scale(1.06) translateY(-20px);} }
  @keyframes splashImgIn { from{opacity:0;transform:scale(1.15);} to{opacity:1;transform:scale(1);} }
  @keyframes splashImgOut { from{opacity:1;transform:scale(1);} to{opacity:0;transform:scale(0.9);} }
  @keyframes splashProgress { from{width:0%;} to{width:100%;} }
  @keyframes splashLogo { from{opacity:0;transform:scale(0.7) rotate(-8deg);} to{opacity:1;transform:scale(1) rotate(0deg);} }
  @keyframes splashTitle { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
  @keyframes splashDot { 0%,60%,100%{transform:scale(1);opacity:0.5;} 30%{transform:scale(1.4);opacity:1;} }
  @keyframes splashParticle { 0%{opacity:0;transform:translate(0,0) scale(0);} 20%{opacity:1;} 100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0.5) rotate(var(--rot));} }
  @keyframes ripple { 0%{transform:scale(0);opacity:0.6;} 100%{transform:scale(4);opacity:0;} }
  @keyframes glowPulse { 0%,100%{box-shadow:0 0 30px rgba(201,168,76,0.4), 0 0 60px rgba(196,92,120,0.2);} 50%{box-shadow:0 0 60px rgba(201,168,76,0.7), 0 0 100px rgba(196,92,120,0.4);} }
  @keyframes textReveal { from{clip-path:inset(0 100% 0 0);} to{clip-path:inset(0 0% 0 0);} }
  @keyframes counterUp { from{opacity:0;transform:translateY(8px);} to{opacity:1;transform:translateY(0);} }

  .animate-fadeUp    { animation: fadeUp    0.7s cubic-bezier(.22,1,.36,1) both; }
  .animate-fadeIn    { animation: fadeIn    0.6s ease both; }
  .animate-scaleIn   { animation: scaleIn   0.5s cubic-bezier(.22,1,.36,1) both; }
  .animate-pageEnter { animation: pageEnter 0.5s cubic-bezier(.22,1,.36,1) both; }

  .d1{animation-delay:0.08s} .d2{animation-delay:0.18s} .d3{animation-delay:0.28s}
  .d4{animation-delay:0.38s} .d5{animation-delay:0.48s} .d6{animation-delay:0.58s}

  .card-hover { transition:transform 0.3s cubic-bezier(.22,1,.36,1),box-shadow 0.3s ease; cursor:pointer; }
  .card-hover:hover { transform:translateY(-5px) scale(1.015); box-shadow:0 18px 44px ${C.shadow}; }
  .btn-press  { transition:transform 0.15s ease,opacity 0.15s ease; cursor:pointer; }
  .btn-press:active { transform:scale(0.95); opacity:0.9; }

  .size-available   { background:linear-gradient(135deg,${C.rosePink},${C.deepRose}); color:white; box-shadow:0 4px 14px rgba(196,92,120,0.4); }
  .size-unavailable { background:${C.blush}; color:${C.muted}; opacity:0.45; text-decoration:line-through; }
  .size-tag { transition:all 0.2s ease; }

  .gold-shimmer {
    background:linear-gradient(90deg,${C.darkText} 0%,${C.gold} 35%,${C.deepRose} 55%,${C.darkText} 100%);
    background-size:200% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent;
    background-clip:text;
    animation:shimmerGold 4s linear infinite;
  }

  .wa-btn { animation:waBounce 3.5s ease-in-out infinite,pulseRose 2.5s ease-in-out infinite; }
  .wa-btn:hover { animation:none; transform:scale(1.06); }

  .orb1 { animation:orbFloat1 9s ease-in-out infinite; }
  .orb2 { animation:orbFloat2 12s ease-in-out infinite; }

  .nav-link { transition:color 0.2s ease; cursor:pointer; position:relative; }
  .nav-link::after { content:''; position:absolute; bottom:-3px; left:0; right:0; height:2px; background:linear-gradient(90deg,${C.rosePink},${C.gold}); transform:scaleX(0); transition:transform 0.25s ease; transform-origin:right; border-radius:2px; }
  .nav-link:hover::after,.nav-link.active::after { transform:scaleX(1); transform-origin:left; }

  .scroll-reveal { opacity:0; transform:translateY(22px); transition:opacity 0.7s cubic-bezier(.22,1,.36,1),transform 0.7s cubic-bezier(.22,1,.36,1); }
  .scroll-reveal.revealed { opacity:1; transform:translateY(0); }

  .note-box { background:linear-gradient(135deg,#FFF0F5,#FFF8FA); border-right:4px solid ${C.rosePink}; border-radius:16px; border:1px solid ${C.pink}60; border-right:4px solid ${C.rosePink}; }

  .thumb-animate { animation: thumbReveal 0.4s cubic-bezier(.22,1,.36,1) both; }

  .thumb-strip {
    display:flex; gap:8px; padding:12px 20px;
    background:rgba(255,255,255,0.9); backdrop-filter:blur(8px);
    border-bottom:1px solid ${C.pink}30;
  }
  .thumb-btn {
    width:56px; height:56px; border-radius:12px; overflow:hidden;
    border:2px solid transparent; cursor:pointer;
    transition:border-color 0.2s ease, transform 0.2s ease;
    flex-shrink:0;
  }
  .thumb-btn.active { border-color:${C.gold}; transform:scale(1.05); }
  .thumb-btn img { width:100%; height:100%; object-fit:cover; }

  /* ── Lightbox ── */
  .lightbox-overlay {
    position:fixed; inset:0; z-index:9999;
    background:rgba(10,4,8,0.92); backdrop-filter:blur(6px);
    display:flex; align-items:center; justify-content:center;
    padding:20px;
    animation: fadeIn 0.25s ease both;
  }
  .lightbox-img {
    max-width:100%; max-height:88vh;
    border-radius:18px; object-fit:contain;
    box-shadow:0 24px 80px rgba(0,0,0,0.6);
    animation: lightboxIn 0.3s cubic-bezier(.22,1,.36,1) both;
    cursor:zoom-out;
  }
  .lightbox-close {
    position:absolute; top:18px; left:18px;
    width:44px; height:44px; border-radius:50%;
    background:rgba(255,255,255,0.15); backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,0.25);
    color:white; font-size:22px; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:background 0.2s ease;
  }
  .lightbox-close:hover { background:rgba(255,255,255,0.28); }
  .lightbox-nav {
    position:absolute; top:50%; transform:translateY(-50%);
    width:44px; height:44px; border-radius:50%;
    background:rgba(255,255,255,0.15); backdrop-filter:blur(8px);
    border:1px solid rgba(255,255,255,0.25);
    color:white; font-size:20px; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
    transition:background 0.2s ease;
  }
  .lightbox-nav:hover { background:rgba(255,255,255,0.28); }
  .lightbox-nav.prev { right:18px; }
  .lightbox-nav.next { left:18px; }
  .lightbox-dots {
    position:absolute; bottom:22px; left:50%; transform:translateX(-50%);
    display:flex; gap:8px;
  }
  .lightbox-dot {
    width:8px; height:8px; border-radius:50%;
    background:rgba(255,255,255,0.35); cursor:pointer;
    transition:background 0.2s ease, transform 0.2s ease;
  }
  .lightbox-dot.active { background:white; transform:scale(1.3); }

  /* Clickable image hint */
  .img-clickable { cursor:zoom-in; }
  .img-clickable:hover { opacity:0.92; }

  /* ── Splash Screen ── */
  .splash-overlay {
    position:fixed; inset:0; z-index:99999;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    overflow:hidden;
  }
  .splash-bg {
    position:absolute; inset:0;
    background: linear-gradient(160deg, #1A0810 0%, #2D1020 30%, #1A0A18 60%, #0D0508 100%);
  }
  .splash-grid {
    position:absolute; inset:0;
    background-image: linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .splash-img-grid {
    position:absolute; inset:0;
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap:0; opacity:0.18;
    filter:blur(2px) saturate(1.4);
  }
  .splash-img-grid img {
    width:100%; height:100%; object-fit:cover;
  }
  .splash-img-grid-overlay {
    position:absolute; inset:0;
    background: linear-gradient(160deg, rgba(26,8,16,0.85) 0%, rgba(45,16,32,0.75) 40%, rgba(13,5,8,0.9) 100%);
  }
  .splash-content {
    position:relative; z-index:2;
    display:flex; flex-direction:column;
    align-items:center; text-align:center;
    padding:0 32px;
    animation: splashCard 0.9s cubic-bezier(.22,1,.36,1) 0.3s both;
    max-height:100vh; overflow:hidden; justify-content:center;
  }
  .splash-logo-ring {
    width:80px; height:80px; border-radius:50%;
    border:3px solid rgba(201,168,76,0.8);
    box-shadow:0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(196,92,120,0.3), inset 0 0 20px rgba(201,168,76,0.1);
    animation:glowPulse 2s ease-in-out infinite;
    display:flex; align-items:center; justify-content:center;
    position:relative; overflow:hidden;
    margin-bottom:28px;
  }
  .splash-logo-ring img {
    width:100%; height:100%; object-fit:cover; border-radius:50%;
  }
  .splash-ripple {
    position:absolute; inset:0;
    border-radius:50%;
    border:2px solid rgba(201,168,76,0.6);
    animation:ripple 2s ease-out infinite;
  }
  .splash-ripple2 {
    position:absolute; inset:0;
    border-radius:50%;
    border:2px solid rgba(196,92,120,0.4);
    animation:ripple 2s ease-out infinite 0.7s;
  }
  .splash-brand {
    font-family:'Playfair Display',serif;
    font-size:21px; font-weight:700;
    color:white; letter-spacing:1px;
    animation:splashTitle 0.8s cubic-bezier(.22,1,.36,1) 0.7s both;
    margin-bottom:6px;
  }
  .splash-tagline {
    font-size:11px; font-weight:500;
    color:rgba(201,168,76,0.9);
    letter-spacing:3px; text-transform:uppercase;
    animation:splashTitle 0.8s cubic-bezier(.22,1,.36,1) 0.9s both;
    margin-bottom:32px;
  }
  .splash-showcase {
    position:relative; z-index:2;
    width:100%; max-width:340px;
    margin-top:28px;
  }
  .splash-cards-track {
    display:flex; gap:12px;
    padding:4px 2px;
    justify-content:center;
  }
  .splash-mini-card {
    width:68px; height:68px; border-radius:16px;
    overflow:hidden; border:2px solid rgba(201,168,76,0.3);
    box-shadow:0 8px 24px rgba(0,0,0,0.4);
    flex-shrink:0;
    transition:transform 0.4s cubic-bezier(.22,1,.36,1), border-color 0.4s ease;
  }
  .splash-mini-card.active {
    transform:scale(1.08) translateY(-4px);
    border-color:rgba(201,168,76,0.9);
    box-shadow:0 16px 40px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.3);
  }
  .splash-mini-card img { width:100%; height:100%; object-fit:cover; }
  .splash-progress-wrap {
    width:200px; height:3px; border-radius:3px;
    background:rgba(255,255,255,0.1);
    margin:16px auto 0; overflow:hidden;
  }
  .splash-progress-bar {
    height:100%;
    background:linear-gradient(90deg,${C.rosePink},${C.gold});
    border-radius:3px;
    animation:splashProgress 3.5s linear 0.5s both;
  }
  .splash-dots {
    display:flex; gap:8px; margin-top:20px; justify-content:center;
  }
  .splash-dot {
    width:6px; height:6px; border-radius:50%;
    background:rgba(255,255,255,0.2);
    transition:background 0.3s ease, transform 0.3s ease;
  }
  .splash-dot.active {
    background:${C.gold};
    transform:scale(1.4);
  }
  .splash-skip {
    position:absolute; bottom:32px; left:50%; transform:translateX(-50%);
    font-size:12px; color:rgba(255,255,255,0.4);
    letter-spacing:2px; cursor:pointer;
    transition:color 0.2s ease;
    border:none; background:none;
    animation:fadeIn 1s ease 2s both;
  }
  .splash-skip:hover { color:rgba(255,255,255,0.7); }
  .splash-particles {
    position:absolute; inset:0; pointer-events:none; overflow:hidden;
  }
  .splash-particle {
    position:absolute; border-radius:50%;
    background:radial-gradient(circle, rgba(201,168,76,0.8), transparent);
    animation:splashParticle var(--dur) ease-out var(--delay) infinite;
  }
  .splash-exit {
    animation:fadeOut 0.6s ease forwards;
  }

  /* ── Smart image — hide broken ── */
  .smart-img {
    display:block;
  }
  .smart-img[data-failed="true"] {
    display:none !important;
  }
`;

// ── Data ──────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "daily",
    icon: "🧁",
    name: "كعك يومي",
    desc: "لذيذ كل يوم",
    bg: "#FFF0F5",
    accent: C.deepRose,
  },
  {
    id: "occasion",
    icon: "🎂",
    name: "كعك مناسبات",
    desc: "للأفراح والأعياد",
    bg: "#FFF8ED",
    accent: C.gold,
  },
  {
    id: "mamoul",
    icon: "🌸",
    name: "كعك موسمي",
    desc: "نكهات الموسم",
    bg: "#FDF0FF",
    accent: "#A87BC0",
  },
  {
    id: "custom",
    icon: "✨",
    name: "طلبات خاصة",
    desc: "حسب رغبتك تماماً",
    bg: "#F0FFF8",
    accent: "#5BAF8A",
  },
];

// ── SmartImage — completely hides if broken ───────────────────────
function SmartImage({ src, alt, style, onClick, className }) {
  const [failed, setFailed] = useState(false);
  const url = `${src}.jpg`;

  if (failed) return null;

  return (
    <img
      src={url}
      alt={alt}
      style={style}
      onClick={onClick}
      className={`smart-img ${className || ""}`}
      onError={() => setFailed(true)}
    />
  );
}

// ── Image placeholder for when SmartImage returns null ────────────
function ImageWithFallback({
  src,
  alt,
  style,
  onClick,
  className,
  fallbackStyle,
}) {
  const [failed, setFailed] = useState(false);
  const url = `${src}.jpg`;

  if (failed) {
    return (
      <div
        style={{
          background: `linear-gradient(135deg,${C.blush},${C.pink}30)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 8,
          ...fallbackStyle,
          ...style,
        }}
      >
        <span style={{ fontSize: 32, opacity: 0.4 }}>🎂</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      style={style}
      onClick={onClick}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

const img = (folder, n) => ({
  main: `/images/${folder}/${n}`,
  thumb: `/images/${folder}/${n}.1`,
});

const ALL_SIZES = ["كبير", "وسط", "صغير"];
const WA = "https://wa.me/972508812768";
const FB = "https://www.facebook.com/share/18EHAQPKf4/?mibextid=wwXIfr";
const IG = "https://www.instagram.com/neven_dabbah_sweet";

const PRODUCTS = {
  daily: [
    {
      id: "d1",
      ...img("daily", 1),
      name: "كرمبو",
      desc: "قاعدة بسكويت مع حشوة أجبان خفيفة مغطاة بطبقة شوكولاتة غنية",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُحضّر طازج يومياً", "قابل للتخصيص"],
    },
    {
      id: "d2",
      ...img("daily", 2),
      name: "تاراليتشي التركية",
      desc: "كعكة خفيفة ومقرمشة بطبقات بسيطة، بتعطي قرشة لذيذة مع طعم غني وخفيف بنفس الوقت",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُحضّر طازج يومياً", "يُطلب قبل 24 ساعة"],
    },
    {
      id: "d3",
      ...img("daily", 3),
      name: "بسبوسة",
      desc: "كعكة سميد طرية ومشبعة بالقطر، بطعم حلو غني ولمسة جوز هند أو قشطة",
      sizes: ["كبير", "وسط"],
      notes: ["يُحضّر طازج يومياً", "موسمي حسب الفاكهة"],
    },
    {
      id: "d4",
      ...img("daily", 4),
      name: "تيراميسو",
      desc: "طبقات بسكويت مغمّس بالقهوة مع كريمة ماسكربوني ناعمة ورشة كاكاو فاخرة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل 24 ساعة"],
    },
    {
      id: "d5",
      ...img("daily", 5),
      name: "كساتا",
      desc: "طبقات آيس كريم ناعمة مع كيك خفيف وكريمة غنية بطعم بارد ومنعش",
      sizes: ["كبير"],
      notes: ["يُحضّر طازج يومياً"],
    },
    {
      id: "c7",
      ...img("custom", 7),
      name: "ليزي كيك",
      desc: "كيك أسطواني بتغطية شوكولاتة داكنة وحلوى مبعثرة على السطح",
      sizes: ["وسط"],
      notes: ["يُطلب قبل 48 ساعة"],
    },
    {
      id: "d6",
      ...img("daily", 6),
      name: "كعكة جوز وميبل",
      desc: "كعكة طرية غنية بالجوز مع لمسة شراب ميبل حلوة ودافئة",
      sizes: ["كبير", "وسط"],
      notes: ["يُحضّر طازج يومياً", "يُطلب قبل 24 ساعة"],
    },
    {
      id: "d8",
      ...img("daily", 8),
      name: "كعكة البرتقال",
      desc: "كعكة إسفنجية طرية بنكهة البرتقال المنعشة ولمسة حلاوة خفيفة",
      sizes: ["كبير", "وسط"],
      notes: ["يُحضّر طازج يومياً"],
    },
    {
      id: "d9",
      ...img("daily", 9),
      name: "جبنة مخبوزة",
      desc: "كعكة جبنة كريمية ناعمة مع طبقة كريما غنية ولمسة توت بري حامضة حلوة",
      sizes: ["كبير", "وسط"],
      notes: ["يُطلب قبل 24 ساعة", "موسمي"],
    },
    {
      id: "d10",
      ...img("daily", 10),
      name: "كيك العسل والمكسرات",
      desc: "كيك ذهبي بالعسل الطبيعي مزيّن بالمكسرات المتنوعة",
      sizes: ["كبير", "وسط"],
      notes: ["يُحضّر طازج يومياً", "يُطلب قبل 24 ساعة"],
    },
  ],
  occasion: [
    {
      id: "o12",
      ...img("occasion", 12),
      name: "ريد ڤيلڤت",
      desc: "كعكة ريد ڤيلڤت ناعمة وفاخرة بطبقاتها الحمراء المميزة، مع كريمة جبن غنية تمنحها توازنًا مثاليًا بين الحلاوة والخف",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "o9",
      ...img("occasion", 9),
      name: "كعكة كاكاو",
      desc: "كعكة كاكاو هشة وغنية بنكهة الشوكلاطة اللذيذة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "o10",
      ...img("occasion", 10),
      name: "بادج شوكلاطة ومكسرات",
      desc: "طبقات غنية من الشوكلاطة الفاخرة مع مزيج مقرمش من المكسرات المحمصة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "o11",
      ...img("occasion", 11),
      name: "بيتفور كراميل بالفستق",
      desc: "قطع بيتفور ناعمة بحشوة الكراميل الغنيّة ومزيّنة بالفستق الحلبي الفاخر",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "o1",
      ...img("occasion", 1),
      name: "كاسات بطعمات",
      desc: "كاسات سفرة فاخر بشكل طولي مميز مع تغطية احترافية",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل 48 ساعة", "قابل للتخصيص"],
    },
    {
      id: "o2",
      ...img("occasion", 2),
      name: "كونتيسا بيتيفور",
      desc: "قطع كعك صغيرة ناعمة ومزيّنة، بطبقات خفيفة وحشوات كريمية بطعم فاخر",
      sizes: ["صغير"],
      notes: ["يُطلب قبل 48 ساعة", "مناسب للمناسبات"],
    },
    {
      id: "o3",
      ...img("occasion", 3),
      name: "بخزنيوت",
      desc: "كعكة شوكولاتة غنية بطبقات كريمية ناعمة وطعم فاخر ومكثّف بالتوت البري",
      sizes: ["صغير"],
      notes: ["يُطلب قبل 48 ساعة"],
    },
    {
      id: "o4",
      ...img("occasion", 4),
      name: "مكعبات جبنة مخبوزة",
      desc: "كعكة جبنة كريمية ناعمة تعلوها طبقة كريما مزخرفة بلمسة أنيقة وفاخرة",
      sizes: ["صغير"],
      notes: ["يُطلب قبل 48 ساعة", "تصميم حسب الطلب"],
    },
    {
      id: "o5",
      ...img("occasion", 5),
      name: "ماجنوم شوكلاطة",
      desc: "طبقات آيس كريم ناعمة مغطاة بشوكولاتة بيضاء وبنية بطعم غني وفاخر",
      sizes: ["صغير"],
      notes: ["يُطلب قبل 48 ساعة"],
    },
    {
      id: "o6",
      ...img("occasion", 6),
      name: "كريم بروليه",
      desc: "كريمة ناعمة مخبوزة بسطح كراميل مقرمش ولمسة فانيلا راقية",
      sizes: ["صغير"],
      notes: ["يُطلب قبل 48 ساعة", "موسمي"],
    },
    {
      id: "o7",
      ...img("occasion", 7),
      name: "براونيز",
      desc: "كعكة شوكولاتة كثيفة ورطبة بطعم غني يذوب في الفم",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع"],
    },
    {
      id: "o8",
      ...img("occasion", 8),
      name: "كونتيسا",
      desc: "قطع كعك صغيرة ناعمة ومزيّنة بحشوات خفيفة بطعم أنيق",
      sizes: ["صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
  ],
  mamoul: [
    {
      id: "m1",
      ...img("mamoul", 1),
      name: "كعك أصفر",
      desc: "كعك طري بلون ذهبي ونكهة خفيفة بطعم بيتي لذيذ",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُحضّر طازج يومياً", "موسم رمضان والأعياد"],
    },
    {
      id: "m2",
      ...img("mamoul", 2),
      name: "مقروطة محشية راحة",
      desc: "عجينة سميد طرية محشوة بالراحة بطعم حلو وقوام ناعم",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل 24 ساعة", "يُحضّر طازج يومياً"],
    },
    {
      id: "m3",
      ...img("mamoul", 3),
      name: "كوكيز بالشوكولاطة",
      desc: "كوكيز طازجة بعجينة غنية وقطع شوكولاتة بطعم لذيذ ومقرمش",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُحضّر طازج يومياً"],
    },
    {
      id: "m4",
      ...img("mamoul", 4),
      name: "مقروطة نوتيلا وكاكاو",
      desc: "مقروطة غنية محشوة بنوتيلا وكاكاو بطعم شوكولاتة كثيف",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل 24 ساعة", "هدية مميزة"],
    },
    {
      id: "m6",
      ...img("mamoul", 6),
      name: "الفاخوروس ريبات حلاڤ",
      desc: "حلوى مميزة بطبقات ناعمة مع ريبات حلاڤ غني ولمسة فاخرة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل 24 ساعة"],
    },
    {
      id: "m7",
      ...img("mamoul", 7),
      name: "زرد",
      desc: "معمول هشّ بطعم مميز وحشوة لذيذة تعطيه نكهة فريدة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل 24 ساعة", "موسم الأعياد"],
    },
  ],
  custom: [
    {
      id: "c16",
      ...img("custom", 16),
      name: "كعك خاص",
      desc: "كيك مخصص بالكامل ليناسب مناسبتك بلمسة فريدة وأنيقة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تواصل مباشرة عبر واتساب"],
    },
    {
      id: "c12",
      ...img("custom", 12),
      name: "كعك خاص",
      desc: "تصميم فاخر حسب ذوقك مع تفاصيل وزينة مخصصة لكل مناسبة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c13",
      ...img("custom", 13),
      name: "كعك خاص",
      desc: "كيك مميز بلمسات أنيقة وألوان مختارة بعناية تناسب احتفالك",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تواصل عبر واتساب"],
    },
    {
      id: "c14",
      ...img("custom", 14),
      name: "كعك خاص",
      desc: "تفاصيل راقية وتزيين فاخر مع إمكانية تخصيص الشكل والنكهات",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c15",
      ...img("custom", 15),
      name: "كعك خاص",
      desc: "كيك مخصص بالكامل ليناسب مناسبتك بلمسة فريدة وأنيقة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تواصل مباشرة عبر واتساب"],
    },

    {
      id: "c1",
      ...img("custom", 1),
      name: "كيك الورود الوردي",
      desc: "كيك أنيق مُغطّى بورود الكريمة الوردية بتصميم زهري راقٍ",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب", "تواصل عبر واتساب"],
    },
    {
      id: "c2",
      ...img("custom", 2),
      name: "كيك الفراشات والذهب",
      desc: "كيك مميز بالكريمة الوردية وزينة الفراشات الذهبية الفاخرة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c3",
      ...img("custom", 3),
      name: "ليالي بيروت هلالية",
      desc: "كيك أنيق بالكريمة البيضاء الناعمة وزينة الفستق الأخضر",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c4",
      ...img("custom", 4),
      name: "كعكة جلي مميزة",
      desc: "ريد فيلفيت فاخر بإطار الكريمة البيضاء وزينة التوت الأحمر",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع"],
    },
    {
      id: "c5",
      ...img("custom", 5),
      name: "كيك أرقام مميّز",
      desc: "كيك بشكل الأرقام مع طبقات الكريمة والزينة الفاخرة",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c6",
      ...img("custom", 6),
      name: "كيك الباقة الزفافية",
      desc: "كيك فاخر مزيّن بباقة الورد الطبيعي للمناسبات الكبرى",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تواصل مباشرة عبر واتساب"],
    },
    {
      id: "c8",
      ...img("custom", 8),
      name: "كيك Hello Kitty",
      desc: "كيك مخصص بشخصية Hello Kitty الوردية لأصغر الأميرات",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c9",
      ...img("custom", 9),
      name: "كيك الدبدوب الأبيض",
      desc: "كيك أبيض أنيق مع دبدوب زينة وبالونات ذهبية لعيد الميلاد",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c10",
      ...img("custom", 10),
      name: "كيك الزهور والورود",
      desc: "كيك مزيّن بالورود الوردية الطبيعية والحمراء لمناسبات رومانسية",
      sizes: ["كبير", "وسط", "صغير"],
      notes: ["يُطلب قبل أسبوع", "تصميم حسب الطلب"],
    },
    {
      id: "c11",
      ...img("custom", 11),
      name: "طلب مخصص كامل",
      desc: "اختر المكونات والحجم والتصميم الذي يناسبك تماماً",
      sizes: ["كبير", "وسط", "صغير"],
      notes: [
        "تواصل مباشرة عبر واتساب",
        "يُطلب قبل 48 ساعة",
        "قابل للتخصيص حسب الطلب",
      ],
    },
  ],
};

// Splash showcase images — pick randomly from all products
const SPLASH_IMAGES = [
  "/images/custom/12.jpg",
  "/images/occasion/9.jpg",
  "/images/daily/4.jpg",
  "/images/mamoul/3.jpg",
  "/images/custom/1.jpg",
  "/images/occasion/10.jpg",
  "/images/daily/1.jpg",
  "/images/custom/6.jpg",
  "/images/occasion/7.jpg",
  "/images/mamoul/4.jpg",
  "/images/daily/9.jpg",
  "/images/custom/2.jpg",
];

const ALL_PRODUCT_IMAGES = Object.values(PRODUCTS)
  .flat()
  .map((p) => `${p.main}.jpg`);

// ── Splash Screen ─────────────────────────────────────────────────
function SplashScreen({ onDone }) {
  const [activeCard, setActiveCard] = useState(0);
  const [exiting, setExiting] = useState(false);
  const DURATION = 3800;
  const [showcase] = useState(() => {
    const shuffled = [...ALL_PRODUCT_IMAGES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });
  useEffect(() => {
    // Cycle active card
    const interval = setInterval(() => {
      setActiveCard((i) => (i + 1) % showcase.length);
    }, 600);

    // Exit after duration
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 600);
    }, DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(exitTimer);
    };
  }, []);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: 4 + Math.random() * 8,
    left: 10 + Math.random() * 80,
    top: 10 + Math.random() * 80,
    tx: (Math.random() - 0.5) * 200,
    ty: (Math.random() - 0.5) * 200,
    rot: Math.random() * 360,
    dur: 3 + Math.random() * 4,
    delay: Math.random() * 3,
  }));

  return (
    <div className={`splash-overlay ${exiting ? "splash-exit" : ""}`}>
      {/* Background */}
      <div className="splash-bg" />
      <div className="splash-grid" />

      {/* Background image collage */}
      <div className="splash-img-grid">
        {SPLASH_IMAGES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <div className="splash-img-grid-overlay" />

      {/* Floating particles */}
      <div className="splash-particles">
        {particles.map((p) => (
          <div
            key={p.id}
            className="splash-particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              top: `${p.top}%`,
              "--tx": `${p.tx}px`,
              "--ty": `${p.ty}px`,
              "--rot": `${p.rot}deg`,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="splash-content">
        {/* Logo */}
        <div
          className="splash-logo-ring"
          style={{
            animation:
              "glowPulse 2s ease-in-out infinite, splashLogo 0.8s cubic-bezier(.22,1,.36,1) 0.2s both",
          }}
        >
          <div className="splash-ripple" />
          <div className="splash-ripple2" />
          <img src="/images/logo/logo.jpg" alt="logo" />
        </div>

        {/* Brand */}
        <div className="splash-brand">Neven Dabbah</div>
        <div className="splash-tagline">✦ Sweets ✦</div>

        {/* Arabic tagline */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            marginBottom: 8,
            letterSpacing: 0.5,
            animation: "splashTitle 0.8s cubic-bezier(.22,1,.36,1) 1.1s both",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          حلويات منزلية طازجة بأعلى جودة
        </div>
        <div
          style={{
            fontSize: 13,
            color: "rgba(201,168,76,0.7)",
            fontWeight: 500,
            animation: "splashTitle 0.8s cubic-bezier(.22,1,.36,1) 1.3s both",
            opacity: 0,
            animationFillMode: "forwards",
            marginBottom: 0,
          }}
        >
          نحضّر طلباتكم بكل حب ✿
        </div>

        {/* Showcase mini-cards */}
        <div className="splash-showcase">
          <div className="splash-cards-track">
            {showcase.map((src, i) => (
              <div
                key={i}
                className={`splash-mini-card ${i === activeCard ? "active" : ""}`}
                style={{
                  animationDelay: `${0.4 + i * 0.1}s`,
                  animation: "splashCard 0.7s cubic-bezier(.22,1,.36,1) both",
                  animationDelay: `${0.5 + i * 0.12}s`,
                }}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="splash-dots">
            {showcase.map((_, i) => (
              <div
                key={i}
                className={`splash-dot ${i === activeCard ? "active" : ""}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="splash-progress-wrap">
            <div className="splash-progress-bar" />
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        className="splash-skip"
        onClick={() => {
          setExiting(true);
          setTimeout(onDone, 600);
        }}
      >
        اضغط للتخطي
      </button>
    </div>
  );
}

// ── Scroll reveal hook ────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ── Lightbox ──────────────────────────────────────────────────────
function Lightbox({ images, startIndex = 0, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const prev = (e) => {
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>
        ✕
      </button>
      {images.length > 1 && (
        <>
          <button className="lightbox-nav prev" onClick={prev}>
            ‹
          </button>
          <button className="lightbox-nav next" onClick={next}>
            ›
          </button>
        </>
      )}
      <img
        key={idx}
        src={`${images[idx]}.jpg`}
        alt="صورة مكبّرة"
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
      {images.length > 1 && (
        <div className="lightbox-dots">
          {images.map((_, i) => (
            <div
              key={i}
              className={`lightbox-dot ${i === idx ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Logo ──────────────────────────────────────────────────────────
function LogoMark({ size = 38 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg,${C.blush},${C.pink})`,
        border: `2px solid ${C.gold}`,
        boxShadow: `0 2px 10px ${C.shadowGold}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.45,
        flexShrink: 0,
      }}
    >
      🎂
    </div>
  );
}

// ── Social Buttons ────────────────────────────────────────────────
function SocialButtons() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: 20,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <a
        href={WA}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-btn btn-press"
        style={btnStyle("#25D366", "#1aaa55")}
      >
        💬 واتساب
      </a>
      <a
        href={FB}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-press"
        style={btnStyle("#1877F2", "#0d5bd3")}
      >
        📘 فيسبوك
      </a>
      <a
        href={IG}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-press"
        style={btnStyle("#E1306C", "#C13584")}
      >
        📸 إنستغرام
      </a>
    </div>
  );
}
const btnStyle = (c1, c2) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg,${c1},${c2})`,
  color: "white",
  borderRadius: 50,
  padding: "10px 14px",
  fontSize: 13,
  fontWeight: 700,
  textDecoration: "none",
  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
});

// ── Gold Divider ──────────────────────────────────────────────────
function GoldDivider({ text = "" }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        margin: "8px 0",
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg,transparent,${C.gold}60)`,
        }}
      />
      <span
        style={{
          fontSize: 13,
          color: C.gold,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        {text || "✿"}
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg,${C.gold}60,transparent)`,
        }}
      />
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────
function Navbar({ page, setPage, catId }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255,248,250,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.pink}60` : "none",
        transition: "all 0.35s ease",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 62,
        }}
      >
        <button
          onClick={() => setPage("home")}
          className="btn-press"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <LogoMark size={36} />
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: 14,
                fontWeight: 700,
                color: C.darkText,
                letterSpacing: 0.5,
                lineHeight: 1.1,
              }}
            >
              Neven Dabbah
            </div>
            <div
              style={{
                fontSize: 10,
                color: C.gold,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Sweets
            </div>
          </div>
        </button>
        <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
          <span
            className={`nav-link ${page === "home" ? "active" : ""}`}
            onClick={() => setPage("home")}
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: page === "home" ? C.deepRose : C.muted,
            }}
          >
            الرئيسية
          </span>
          {catId && (
            <span
              className={`nav-link ${page === "category" ? "active" : ""}`}
              onClick={() => setPage("category")}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: page === "category" ? C.deepRose : C.muted,
              }}
            >
              المنتجات
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

// ── Home Page ─────────────────────────────────────────────────────
function HomePage({ setPage, setCat }) {
  useScrollReveal();
  return (
    <div className="animate-pageEnter">
      <section
        style={{
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 24px 48px",
        }}
      >
        <div
          className="orb1"
          style={{
            position: "absolute",
            top: "-8%",
            right: "-18%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.pink}60,transparent)`,
            zIndex: 0,
          }}
        />
        <div
          className="orb2"
          style={{
            position: "absolute",
            bottom: "0%",
            left: "-20%",
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.lightGold}40,transparent)`,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "5%",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `radial-gradient(circle,${C.gold}20,transparent)`,
            animation: "goldPulse 4s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "8%",
            fontSize: 28,
            opacity: 0.18,
            animation: "float 5s ease-in-out infinite",
          }}
        >
          🌸
        </div>
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "6%",
            fontSize: 22,
            opacity: 0.14,
            animation: "float 7s ease-in-out infinite 1s",
          }}
        >
          🌺
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            right: "12%",
            fontSize: 18,
            opacity: 0.12,
            animation: "float 6s ease-in-out infinite 2s",
          }}
        >
          ✿
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 480,
            margin: "0 auto",
            width: "100%",
            paddingTop: 20,
          }}
        >
          <div
            className="animate-fadeIn"
            style={{
              marginBottom: 28,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                background: `linear-gradient(135deg,${C.blush},${C.pink}80)`,
                border: `3px solid ${C.gold}`,
                boxShadow: `0 8px 32px ${C.shadowGold},0 0 0 6px ${C.gold}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                animation: "float 5s ease-in-out infinite",
              }}
            >
              <img
                src="/images/logo/logo.jpg"
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          <div
            className="animate-fadeIn d1"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: `linear-gradient(135deg,${C.blush},white)`,
                border: `1px solid ${C.gold}50`,
                borderRadius: 50,
                padding: "7px 18px",
                boxShadow: `0 2px 12px ${C.shadowGold}`,
              }}
            >
              <span style={{ fontSize: 14 }}>🎀</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.gold }}>
                Neven Dabbah Sweets
              </span>
              <span style={{ fontSize: 14 }}>🎀</span>
            </div>
          </div>

          <h1
            className="animate-fadeUp d2 gold-shimmer"
            style={{
              fontSize: 36,
              fontWeight: 900,
              lineHeight: 1.3,
              marginBottom: 16,
              letterSpacing: -0.3,
              textAlign: "center",
            }}
          >
            حلويات منزلية طازجة بأعلى جودة
          </h1>
          <p
            className="animate-fadeUp d3"
            style={{
              fontSize: 13,
              color: C.muted,
              lineHeight: 1.9,
              fontWeight: 400,
              marginBottom: 32,
              textAlign: "center",
            }}
          >
            نحضّر طلباتكم بكل حب، حسب ذوقكم ولكل مناسبة
          </p>
          <div className="animate-fadeIn d3">
            <GoldDivider text="✦  ✦  ✦" />
          </div>

          <div
            className="animate-fadeUp d4"
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => {
                setCat("daily");
                setPage("category");
              }}
              className="btn-press"
              style={{
                flex: 1,
                background: `linear-gradient(135deg,${C.rosePink},${C.deepRose})`,
                color: "white",
                border: "none",
                borderRadius: 50,
                padding: "15px 20px",
                fontSize: 15,
                fontWeight: 800,
                boxShadow: `0 8px 24px ${C.shadow}`,
                cursor: "pointer",
              }}
            >
              تصفّح الحلويات 🧁
            </button>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press"
              style={{
                flex: 1,
                background: `linear-gradient(135deg,${C.gold},${C.warmGold})`,
                color: "white",
                borderRadius: 50,
                padding: "15px 20px",
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
                textAlign: "center",
                boxShadow: `0 8px 24px ${C.shadowGold}`,
              }}
            >
              اطلب الآن ✨
            </a>
          </div>

          <div
            className="animate-fadeUp d5"
            style={{
              display: "flex",
              marginTop: 32,
              borderRadius: 20,
              background: "white",
              boxShadow: `0 4px 20px ${C.shadow}`,
              overflow: "hidden",
              border: `1px solid ${C.pink}30`,
            }}
          >
            {[
              ["🌸", "طازج يومياً"],
              ["💝", "بكل حب"],
              ["✨", "جودة عالية"],
            ].map(([icon, label], i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  textAlign: "center",
                  padding: "15px 8px",
                  borderRight: i < 2 ? `1px solid ${C.blush}` : "none",
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.muted }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ padding: "0 24px 32px", maxWidth: 480, margin: "0 auto" }}>
        <div className="scroll-reveal">
          <GoldDivider text="أصنافنا" />
        </div>
        <p
          className="scroll-reveal"
          style={{
            textAlign: "center",
            color: C.muted,
            fontSize: 13,
            marginTop: 10,
          }}
        >
          اختاري من تشكيلتنا المتنوعة 🎀
        </p>
      </div>

      <section
        style={{ padding: "0 16px 60px", maxWidth: 480, margin: "0 auto" }}
      >
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="card-hover scroll-reveal"
              onClick={() => {
                setCat(cat.id);
                setPage("category");
              }}
            >
              <div
                style={{
                  background: `linear-gradient(155deg,${cat.bg},white)`,
                  borderRadius: 22,
                  padding: "22px 16px 20px",
                  textAlign: "center",
                  boxShadow: `0 4px 18px ${C.shadow}`,
                  border: `1px solid ${cat.accent}22`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 40,
                    height: 40,
                    borderRadius: "0 0 40px 0",
                    background: `${cat.accent}10`,
                  }}
                />
                <div
                  style={{
                    fontSize: 38,
                    marginBottom: 10,
                    display: "inline-block",
                    animation: "float 4s ease-in-out infinite",
                  }}
                >
                  {cat.icon}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 15,
                    color: C.darkText,
                    marginBottom: 4,
                  }}
                >
                  {cat.name}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>
                  {cat.desc}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    background: `${cat.accent}15`,
                    borderRadius: 50,
                    padding: "6px 14px",
                    border: `1px solid ${cat.accent}30`,
                  }}
                >
                  <span
                    style={{ fontSize: 12, fontWeight: 700, color: cat.accent }}
                  >
                    تصفّح
                  </span>
                  <span style={{ fontSize: 11, color: cat.accent }}>←</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="scroll-reveal"
        style={{
          margin: "0 16px 64px",
          borderRadius: 24,
          padding: "32px 24px",
          maxWidth: 448,
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg,${C.deepRose},#8B3050)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -20,
            left: -20,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(201,168,76,0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -10,
            right: -10,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 3,
                height: 24,
                borderRadius: 3,
                background: C.gold,
              }}
            />
            <h3 style={{ fontSize: 19, fontWeight: 800, color: "white" }}>
              لماذا Neven Dabbah Sweets؟
            </h3>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.9,
            }}
          >
            نستخدم أجود المكونات الطبيعية، ونحضّر كل قطعة بشغف وإتقان. لأن كل
            لحظة تستحق أحلى الحلويات.
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 18,
              flexWrap: "wrap",
            }}
          >
            {["🥚 طازج", "🧈 طبيعي", "🌸 بحب", "✨ مميز"].map((t, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  color: "white",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 50,
                  padding: "6px 14px",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-press"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 20,
              background: `linear-gradient(135deg,${C.gold},${C.warmGold})`,
              color: "white",
              borderRadius: 50,
              padding: "12px 22px",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 800,
              boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            }}
          >
            📞 050-8812768
          </a>
        </div>
      </section>
    </div>
  );
}

// ── Category Page ─────────────────────────────────────────────────
function CategoryPage({ catId, setPage, setProduct }) {
  useScrollReveal();
  const cat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];
  const products = PRODUCTS[catId] || PRODUCTS.daily;

  return (
    <div className="animate-pageEnter">
      <div
        style={{
          background: `linear-gradient(160deg,${cat.bg},${C.cream})`,
          padding: "28px 20px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -30,
            left: -30,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `${cat.accent}15`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `${C.gold}10`,
          }}
        />
        <div style={{ maxWidth: 480, margin: "0 auto", position: "relative" }}>
          <button
            onClick={() => setPage("home")}
            className="btn-press"
            style={{
              background: "white",
              border: `1px solid ${C.pink}`,
              borderRadius: 50,
              padding: "8px 18px",
              fontSize: 13,
              fontWeight: 700,
              color: C.deepRose,
              cursor: "pointer",
              marginBottom: 20,
              boxShadow: `0 2px 10px ${C.shadow}`,
            }}
          >
            → رجوع للرئيسية
          </button>
          <div style={{ fontSize: 44, marginBottom: 8 }}>{cat.icon}</div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: C.darkText,
              marginBottom: 4,
            }}
          >
            {cat.name}
          </h1>
          <p style={{ fontSize: 14, color: C.muted }}>
            {products.length} منتجات متوفرة
          </p>
        </div>
      </div>

      <div style={{ padding: "16px 20px 0", maxWidth: 480, margin: "0 auto" }}>
        <GoldDivider />
      </div>

      <div
        style={{ padding: "16px 16px 90px", maxWidth: 480, margin: "0 auto" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {products.map((p) => (
            <div
              key={p.id}
              className="card-hover scroll-reveal"
              onClick={() => {
                setProduct(p);
                setPage("product");
              }}
              style={{
                background: "white",
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: `0 4px 20px ${C.shadow}`,
                border: `1px solid ${C.pink}20`,
              }}
            >
              <div style={{ overflow: "hidden", height: 185 }}>
                <ImageWithFallback
                  src={p.main}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: 185,
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  fallbackStyle={{ width: "100%", height: 185 }}
                />
              </div>
              <div style={{ padding: "16px 18px 18px" }}>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: C.darkText,
                    marginBottom: 5,
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: C.muted,
                    marginBottom: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", gap: 6 }}>
                    {ALL_SIZES.map((s) => (
                      <span
                        key={s}
                        className={`size-tag ${p.sizes.includes(s) ? "size-available" : "size-unavailable"}`}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          borderRadius: 50,
                          padding: "4px 11px",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: C.deepRose,
                      background: C.blush,
                      borderRadius: 50,
                      padding: "7px 16px",
                      border: `1px solid ${C.pink}40`,
                    }}
                  >
                    عرض ←
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Product Page ──────────────────────────────────────────────────
function ProductPage({ product, catId, setPage }) {
  useScrollReveal();
  const [activeImg, setActiveImg] = useState("main");
  const [thumbExists, setThumbExists] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setActiveImg("main");
    setThumbExists(true);
    // Pre-check if thumb image exists
    const testImg = new Image();
    testImg.src = `${product.thumb}.jpg`;
    testImg.onerror = () => setThumbExists(false);
  }, [product?.id]);

  if (!product) return null;
  const cat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];

  // Only include thumb in images array if it exists
  const images = thumbExists ? [product.main, product.thumb] : [product.main];
  const currentSrc =
    activeImg === "main" || !thumbExists ? product.main : product.thumb;
  const currentIdx = activeImg === "main" || !thumbExists ? 0 : 1;

  return (
    <>
      {lightbox !== null && (
        <Lightbox
          images={images}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="animate-pageEnter">
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: 280,
              overflow: "hidden",
              background: "#1A0F15",
              position: "relative",
            }}
          >
            <ImageWithFallback
              key={currentSrc}
              src={currentSrc}
              alt={product.name}
              className="img-clickable"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              fallbackStyle={{ width: "100%", height: "100%" }}
              onClick={() => setLightbox(currentIdx)}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom,transparent 40%,rgba(58,32,48,0.55))",
                pointerEvents: "none",
              }}
            />
            <button
              onClick={() => setPage("category")}
              className="btn-press"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "rgba(255,255,255,0.92)",
                border: "none",
                borderRadius: 50,
                width: 42,
                height: 42,
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              }}
            >
              →
            </button>
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(6px)",
                borderRadius: 50,
                padding: "5px 12px",
                border: "1px solid rgba(255,255,255,0.2)",
                pointerEvents: "none",
              }}
            >
              <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>
                🔍 اضغط لتكبير
              </span>
            </div>
            <div
              style={{ position: "absolute", bottom: 20, right: 20, left: 20 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 50,
                  padding: "5px 14px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 13 }}>{cat.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>
                  {cat.name}
                </span>
              </div>
            </div>
          </div>

          {/* Thumb strip — only shown if thumb exists */}
          {thumbExists && (
            <div className="thumb-strip">
              {[
                {
                  key: "main",
                  src: product.main,
                  label: "الصورة الرئيسية",
                  idx: 0,
                },
                {
                  key: "thumb",
                  src: product.thumb,
                  label: "صورة إضافية",
                  idx: 1,
                },
              ].map(({ key, src, label, idx }) => (
                <button
                  key={key}
                  className={`thumb-btn ${activeImg === key ? "active" : ""}`}
                  onClick={() => setActiveImg(key)}
                  title={label}
                  style={{
                    background: "none",
                    border:
                      activeImg === key
                        ? `2px solid ${C.gold}`
                        : "2px solid transparent",
                  }}
                >
                  <SmartImage
                    src={src}
                    alt={label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightbox(idx);
                    }}
                  />
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <span
                style={{
                  fontSize: 11,
                  color: C.deepRose,
                  alignSelf: "center",
                  fontWeight: 700,
                  cursor: "pointer",
                  background: C.blush,
                  borderRadius: 50,
                  padding: "5px 12px",
                  border: `1px solid ${C.pink}40`,
                }}
                onClick={() => setLightbox(currentIdx)}
              >
                🔍 كبّر الصورة
              </span>
            </div>
          )}

          {/* No-thumb: still show the zoom button in a minimal strip */}
          {!thumbExists && (
            <div className="thumb-strip" style={{ justifyContent: "flex-end" }}>
              <span
                style={{
                  fontSize: 11,
                  color: C.deepRose,
                  fontWeight: 700,
                  cursor: "pointer",
                  background: C.blush,
                  borderRadius: 50,
                  padding: "5px 12px",
                  border: `1px solid ${C.pink}40`,
                }}
                onClick={() => setLightbox(0)}
              >
                🔍 كبّر الصورة
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            padding: "24px 20px 100px",
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          <h1
            className="animate-fadeUp d1"
            style={{
              fontSize: 25,
              fontWeight: 900,
              color: C.darkText,
              marginBottom: 10,
              lineHeight: 1.35,
            }}
          >
            {product.name}
          </h1>
          <GoldDivider />
          <p
            className="animate-fadeUp d2"
            style={{
              fontSize: 15,
              color: C.muted,
              lineHeight: 1.9,
              marginTop: 16,
              marginBottom: 26,
            }}
          >
            {product.desc}. مصنوع بأجود المكونات الطبيعية وبكل عناية ليصل إليكِ
            في أحسن حالة وأحلى مظهر.
          </p>

          <div className="animate-fadeUp d3" style={{ marginBottom: 26 }}>
            <h3
              style={{
                fontSize: 13,
                fontWeight: 800,
                color: C.darkText,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  background: C.blush,
                  borderRadius: 50,
                  width: 30,
                  height: 30,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                📐
              </span>
              الأحجام المتاحة
            </h3>
            <div style={{ display: "flex", gap: 12 }}>
              {ALL_SIZES.map((size) => {
                const avail = product.sizes.includes(size);
                return (
                  <div
                    key={size}
                    className="size-tag"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      borderRadius: 18,
                      padding: "16px 8px",
                      background: avail
                        ? `linear-gradient(135deg,${C.rosePink},${C.deepRose})`
                        : C.blush,
                      boxShadow: avail ? `0 6px 18px ${C.shadow}` : "none",
                      opacity: avail ? 1 : 0.45,
                      border: avail ? "none" : `1px dashed ${C.pink}`,
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>
                      {size === "كبير" ? "🎂" : size === "وسط" ? "🧁" : "🍮"}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: avail ? "white" : C.muted,
                      }}
                    >
                      {size}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        marginTop: 3,
                        color: avail ? "rgba(255,255,255,0.8)" : C.muted,
                      }}
                    >
                      {avail ? "✓ متاح" : "غير متاح"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="animate-fadeUp d4 note-box"
            style={{ padding: "18px 20px", marginBottom: 30 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 16 }}>📝</span>
              <span
                style={{ fontSize: 15, fontWeight: 800, color: C.darkText }}
              >
                ملاحظات مهمة
              </span>
            </div>
            {product.notes.map((note, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: i < product.notes.length - 1 ? 10 : 0,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg,${C.rosePink},${C.deepRose})`,
                    flexShrink: 0,
                    marginTop: 5,
                    display: "block",
                  }}
                />
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.deepRose,
                    lineHeight: 1.6,
                  }}
                >
                  {note}
                </span>
              </div>
            ))}
          </div>

          <div
            className="animate-fadeUp d5"
            style={{ display: "flex", gap: 12 }}
          >
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press"
              style={{
                flex: 1,
                background: "linear-gradient(135deg,#25D366,#1aaa55)",
                color: "white",
                borderRadius: 18,
                padding: "17px",
                textAlign: "center",
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(37,211,102,0.4)",
                display: "block",
              }}
            >
              💬 اطلب عبر واتساب
            </a>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: C.muted,
              marginTop: 12,
            }}
          >
            سنتواصل معك لتأكيد الطلب وتفاصيل التوصيل 🌸
          </p>
        </div>
      </div>
    </>
  );
}

// ── App ───────────────────────────────────────────────────────────
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [page, setPage] = useState("home");
  const [catId, setCat] = useState(null);
  const [product, setProduct] = useState(null);
  const mainRef = useRef(null);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
    if (mainRef.current) mainRef.current.scrollTo(0, 0);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Splash Screen */}
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      <div
        ref={mainRef}
        style={{
          minHeight: "100vh",
          background: C.cream,
          direction: "rtl",
          fontFamily: "'Tajawal',sans-serif",
          maxWidth: 520,
          margin: "0 auto",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <Navbar page={page} setPage={navigate} catId={catId} />
        <main style={{ paddingBottom: 120 }}>
          {page === "home" && (
            <HomePage setPage={navigate} setCat={(id) => setCat(id)} />
          )}
          {page === "category" && (
            <CategoryPage
              catId={catId}
              setPage={navigate}
              setProduct={(p) => setProduct(p)}
            />
          )}
          {page === "product" && (
            <ProductPage product={product} catId={catId} setPage={navigate} />
          )}
        </main>
        <SocialButtons />
      </div>
    </>
  );
}
