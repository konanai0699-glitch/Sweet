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

  .product-img-main {
    width:100%; height:280px; object-fit:cover; display:block;
    transition: transform 0.4s ease;
  }
  .product-img-main:hover { transform: scale(1.03); }

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

  .category-img {
    width:100%; height:185px; object-fit:cover; display:block;
    transition: transform 0.4s ease;
  }
  .card-hover:hover .category-img { transform:scale(1.05); }

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
    name: "معمول وموسمي",
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

function SmartImage({ src, alt, style, onClick, className }) {
  return (
    <img
      src={`${src}.jpg`}
      alt={alt}
      style={style}
      onClick={onClick}
      className={className}
    />
  );
}

// Image helper — returns { main, thumb }
const img = (folder, n) => ({
  main: `/images/${folder}/${n}`,
  thumb: `/images/${folder}/${n}.1`,
});

const ALL_SIZES = ["كبير", "وسط", "صغير"];
const WA = "https://wa.me/972508812768";

const PRODUCTS = {
  // ── كعك يومي (10) ────────────────────────────────────────────
  daily: [
    {
      id: "d1",
      ...img("daily", 1),
      name: "كرمبو",
      desc: "اعدة بسكويت مع كريمة مارشميلو خفيفة مغطاة بطبقة شوكولاتة غنية",
      sizes: ["كبير", "وسط"],
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
      desc: "عكة طرية غنية بالجوز مع لمسة شراب ميبل حلوة ودافئة",
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
      id: "o1",
      ...img("occasion", 1),
      name: "كاسات بطعمات",
      desc: "كاسات سفرة فاخر بشكل طولي مميز مع تغطية احترافية",
      sizes: ["صغير"],
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
      name: "كوكيز بالشوكولاطة والمكسرات",
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
      name: "الفاخوروس بالكاراميل",
      desc: "حلوى مميزة بطبقات ناعمة مع صوص كراميل غني ولمسة فاخرة",
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

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
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
      {/* Close button */}
      <button className="lightbox-close" onClick={onClose}>
        ✕
      </button>

      {/* Prev / Next (only when more than one image) */}
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

      {/* Main image — stop propagation so clicking the image itself doesn't close */}
      <img
        key={idx}
        src={`${images[idx]}.jpg`}
        alt="صورة مكبّرة"
        className="lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Dots */}
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

// ── WhatsApp button ───────────────────────────────────────────────
function WhatsAppBtn() {
  return (
    <a
      href={WA}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-btn btn-press"
      style={{
        position: "fixed",
        bottom: 24,
        left: 20,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "linear-gradient(135deg,#25D366,#1aaa55)",
        color: "white",
        borderRadius: 50,
        padding: "13px 20px 13px 16px",
        boxShadow: "0 8px 28px rgba(37,211,102,0.4)",
        textDecoration: "none",
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "'Tajawal',sans-serif",
      }}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      اطلب عبر واتساب
    </a>
  );
}

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
              fontSize: 16,
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
                <SmartImage
                  src={p.main}
                  alt={p.name}
                  style={{ width: "100%", height: 185, objectFit: "cover" }}
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
  const [lightbox, setLightbox] = useState(null); // null | index (0=main,1=thumb)

  // Reset active image when product changes
  useEffect(() => {
    setActiveImg("main");
  }, [product?.id]);

  if (!product) return null;
  const cat = CATEGORIES.find((c) => c.id === catId) || CATEGORIES[0];

  const images = [product.main, product.thumb];
  const currentSrc = activeImg === "main" ? product.main : product.thumb;
  const currentIdx = activeImg === "main" ? 0 : 1;

  return (
    <>
      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <Lightbox
          images={images}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="animate-pageEnter">
        {/* Image section */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: 280,
              overflow: "hidden",
              background: "#1A0F15",
              position: "relative",
            }}
          >
            <SmartImage
              key={currentSrc}
              src={currentSrc}
              alt={product.name}
              className="img-clickable"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onClick={() => setLightbox(currentIdx)}
            />
            {/* Dark overlay gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom,transparent 40%,rgba(58,32,48,0.55))",
                pointerEvents: "none",
              }}
            />
            {/* Back button */}
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
            {/* Zoom hint badge */}
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
            {/* Category badge */}
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

          {/* Thumbnail strip — main + secondary */}
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
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
        </div>

        {/* Content */}
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

          {/* Sizes */}
          <div className="animate-fadeUp d3" style={{ marginBottom: 26 }}>
            <h3
              style={{
                fontSize: 16,
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

          {/* Notes */}
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

          {/* CTA */}
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
  const [page, setPage] = useState("home");
  const [catId, setCat] = useState(null);
  const [product, setProduct] = useState(null);
  const mainRef = useRef(null);

  const navigate = (p) => {
    setPage(p);
    // Use instant scroll (no smooth) so page starts at top reliably on mobile
    window.scrollTo(0, 0);
    // Fallback: also scroll the main container if window scroll doesn't work
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
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
        <main>
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
        <WhatsAppBtn />
      </div>
    </>
  );
}
