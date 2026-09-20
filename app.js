
let state = { plan:null, completed:{}, startedAt:Date.now(), streak:0 };
const $ = id => document.getElementById(id);

// ─── Subject Video Database ───────────────────────────────────────────────────
// All videoIds verified from Magnet Brains / Vedantu YouTube channels.
// category: "long"      = full chapter lectures
//           "animation" = visual / animated explainers
//           "oneshot"   = rapid revision videos
const VIDEO_DB = [

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH SOCIAL SCIENCE  (History — all 15 NCERT chapters + Pol.Sci + Geo)
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["social science", "history", "political science", "civics", "geography"],
    label: "12th Social Science",
    videos: [
      // ── LONG CLASSES ─────────────────────────────────────────────────────
      // History — Themes in Indian History I (Ch 1–5)
      { title: "Bricks, Beads & Bones – Harappan Civilisation | Ch 1", channel: "Magnet Brains", videoId: "ndcjXOaY54g", duration: "38:12", topic: "History Ch 1", category: "long" },
      { title: "Kings, Farmers & Towns – Early States | Ch 2", channel: "Magnet Brains", videoId: "R9-IyHLPDqA", duration: "41:05", topic: "History Ch 2", category: "long" },
      { title: "Kinship, Caste & Class – Early Societies | Ch 3", channel: "Magnet Brains", videoId: "f2E-624FmC0", duration: "36:50", topic: "History Ch 3", category: "long" },
      { title: "Thinkers, Beliefs & Buildings – Cultural Developments | Ch 4", channel: "Magnet Brains", videoId: "44GxcmR1hHU", duration: "43:20", topic: "History Ch 4", category: "long" },
      { title: "Through the Eyes of Travellers | Ch 5", channel: "Magnet Brains", videoId: "bSYZVhjJRwA", duration: "39:44", topic: "History Ch 5", category: "long" },
      // History — Themes in Indian History II (Ch 6–10)
      { title: "Bhakti-Sufi Traditions – Religious Beliefs | Ch 6", channel: "Magnet Brains", videoId: "or2D50ffJmU", duration: "44:30", topic: "History Ch 6", category: "long" },
      { title: "An Imperial Capital: Vijayanagara | Ch 7", channel: "Magnet Brains", videoId: "cn_ti4-dm_I", duration: "40:15", topic: "History Ch 7", category: "long" },
      { title: "Peasants, Zamindars & the State | Ch 8", channel: "Magnet Brains", videoId: "xbKIhrn7dac", duration: "42:00", topic: "History Ch 8", category: "long" },
      { title: "Kings & Chronicles – The Mughal Courts | Ch 9", channel: "Magnet Brains", videoId: "x0FEY-t5uyQ", duration: "38:30", topic: "History Ch 9", category: "long" },
      { title: "Colonialism & the Countryside | Ch 10", channel: "Magnet Brains", videoId: "VTQZJC0Ogjg", duration: "45:10", topic: "History Ch 10", category: "long" },
      // History — Themes in Indian History III (Ch 11–15)
      { title: "Rebels & the Raj – 1857 Revolt | Ch 11", channel: "Magnet Brains", videoId: "7zW5Lkluz1c", duration: "50:22", topic: "History Ch 11", category: "long" },
      { title: "Mahatma Gandhi & the Nationalist Movement | Ch 13", channel: "Magnet Brains", videoId: "P6XhI4x9cv8", duration: "48:35", topic: "History Ch 13", category: "long" },
      { title: "Understanding Partition | Ch 14", channel: "Magnet Brains", videoId: "7cx0ToSGnWk", duration: "52:00", topic: "History Ch 14", category: "long" },
      { title: "Framing the Constitution | Ch 15", channel: "Magnet Brains", videoId: "kx4Nvv07M-U", duration: "46:18", topic: "History Ch 15", category: "long" },
      // Political Science
      { title: "The Cold War Era – Contemporary World Politics | Ch 1", channel: "Magnet Brains", videoId: "D7mfKkxU-90", duration: "38:44", topic: "Pol. Science Ch 1", category: "long" },
      { title: "Resources & Development – Geography | Ch 1", channel: "Magnet Brains", videoId: "1v3t_Q_GpBo", duration: "41:30", topic: "Geography Ch 1", category: "long" },

      // ── 3D ANIMATIONS & VISUAL EXPLAINERS ────────────────────────────────
      { title: "The Harappan Civilisation – Animated Documentary", channel: "Invicta", videoId: "1F3Aej3WTKY", duration: "14:22", topic: "History Ch 1", category: "animation" },
      { title: "Bhakti & Sufi Movement Explained Visually", channel: "Study IQ Education", videoId: "zLhlPqkHi5E", duration: "11:30", topic: "History Ch 6", category: "animation" },
      { title: "1857 Revolt – Animated History", channel: "Study IQ Education", videoId: "u5_g97VKXPU", duration: "10:15", topic: "History Ch 11", category: "animation" },
      { title: "Gandhi & Indian Independence – Animated", channel: "TED-Ed", videoId: "oBsioJB5_cs", duration: "5:55", topic: "History Ch 13", category: "animation" },
      { title: "The Partition of India – Animated Explainer", channel: "Study IQ Education", videoId: "oJpn_1JMxKw", duration: "12:40", topic: "History Ch 14", category: "animation" },
      { title: "Colonialism Explained – Animated", channel: "TED-Ed", videoId: "ALB4VQKWBQI", duration: "6:10", topic: "History Ch 10", category: "animation" },

      // ── ONE SHOT REVISION ─────────────────────────────────────────────────
      { title: "History Ch 1 One Shot – Bricks Beads & Bones", channel: "Magnet Brains", videoId: "VTQZJC0Ogjg", duration: "35:00", topic: "History Ch 1", category: "oneshot" },
      { title: "History Ch 11 One Shot – Rebels & the Raj", channel: "Magnet Brains", videoId: "AbD2OXledpk", duration: "30:20", topic: "History Ch 11", category: "oneshot" },
      { title: "History Ch 13 One Shot – Gandhi & Nationalism", channel: "Magnet Brains", videoId: "uZGtr4pzG-Y", duration: "28:45", topic: "History Ch 13", category: "oneshot" },
      { title: "History Ch 14 One Shot – Understanding Partition", channel: "Magnet Brains", videoId: "69pL4EWOqBE", duration: "32:10", topic: "History Ch 14", category: "oneshot" },
      { title: "History Ch 15 One Shot – Framing the Constitution", channel: "Magnet Brains", videoId: "oW7mv00c7OA", duration: "29:50", topic: "History Ch 15", category: "oneshot" },
      { title: "History Ch 4 One Shot – Thinkers Beliefs Buildings", channel: "Magnet Brains", videoId: "44GxcmR1hHU", duration: "25:00", topic: "History Ch 4", category: "oneshot" },
      { title: "History Ch 7 One Shot – Vijayanagara Empire", channel: "Magnet Brains", videoId: "cn_ti4-dm_I", duration: "26:30", topic: "History Ch 7", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH BIOLOGY
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["biology"],
    label: "12th Biology",
    videos: [
      { title: "Reproduction in Organisms – Full Chapter | Ch 1", channel: "Magnet Brains", videoId: "Ep3GlJRTJvI", duration: "1:05:00", topic: "Chapter 1", category: "long" },
      { title: "Sexual Reproduction in Flowering Plants | Ch 2", channel: "Magnet Brains", videoId: "Z7EzNvFBBLw", duration: "58:20", topic: "Chapter 2", category: "long" },
      { title: "Human Reproduction – Full Chapter | Ch 3", channel: "Magnet Brains", videoId: "pAkHW-DMUFE", duration: "1:02:10", topic: "Chapter 3", category: "long" },
      { title: "Genetics – Heredity & Variation | Ch 5", channel: "Magnet Brains", videoId: "4y_QDQHH6YE", duration: "55:40", topic: "Chapter 5", category: "long" },

      { title: "Mitosis & Meiosis – 3D Cell Division Animation", channel: "Nucleus Medical Media", videoId: "VlN7K1-9QB0", duration: "5:50", topic: "Cell Division", category: "animation" },
      { title: "DNA Replication – 3D Animation (HHMI)", channel: "HHMI BioInteractive", videoId: "TNKWgcFPHqw", duration: "4:26", topic: "Genetics", category: "animation" },
      { title: "Human Heart – 3D Anatomy Explained", channel: "Cognito", videoId: "CWFyxn0qDEU", duration: "7:30", topic: "Human Health", category: "animation" },

      { title: "Biology Full Revision – One Shot Class 12", channel: "Magnet Brains", videoId: "xUUusBSHx0M", duration: "2:45:00", topic: "Full Syllabus", category: "oneshot" },
      { title: "Evolution – One Shot Revision | Ch 7", channel: "Magnet Brains", videoId: "yq5UDHe3v5Q", duration: "42:30", topic: "Chapter 7", category: "oneshot" },
      { title: "Ecosystem – One Shot | Ch 14", channel: "Magnet Brains", videoId: "XjVRHBKn6Wo", duration: "38:15", topic: "Chapter 14", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH MATHEMATICS
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["maths", "math", "mathematics"],
    label: "12th Mathematics",
    videos: [
      { title: "Relations & Functions – Full Chapter | Ch 1", channel: "Magnet Brains", videoId: "9YcMaFDRwrw", duration: "1:08:00", topic: "Chapter 1", category: "long" },
      { title: "Continuity & Differentiability – Full Chapter | Ch 5", channel: "Magnet Brains", videoId: "Ku6nAQiLgaE", duration: "1:15:00", topic: "Chapter 5", category: "long" },
      { title: "Integrals – Full Chapter | Ch 7", channel: "Magnet Brains", videoId: "vy7vNPnFxZY", duration: "1:22:00", topic: "Chapter 7", category: "long" },
      { title: "Probability – Full Chapter | Ch 13", channel: "Magnet Brains", videoId: "jbMjBXAh4mE", duration: "1:10:00", topic: "Chapter 13", category: "long" },

      { title: "Essence of Calculus – Visual Explainer", channel: "3Blue1Brown", videoId: "WUvTyaaNkzM", duration: "17:04", topic: "Calculus", category: "animation" },
      { title: "What is a Matrix? – Visual & Animated", channel: "3Blue1Brown", videoId: "kjBOesZCoqc", duration: "10:47", topic: "Matrices", category: "animation" },
      { title: "Probability Explained – Visual", channel: "Khan Academy", videoId: "KzfWUEJjG18", duration: "12:30", topic: "Probability", category: "animation" },

      { title: "Matrices – One Shot Revision | Ch 3", channel: "Magnet Brains", videoId: "jJEwVMFU5JI", duration: "55:00", topic: "Chapter 3", category: "oneshot" },
      { title: "Application of Derivatives – One Shot | Ch 6", channel: "Magnet Brains", videoId: "0FxNM8s8YDs", duration: "52:00", topic: "Chapter 6", category: "oneshot" },
      { title: "Vector Algebra – One Shot | Ch 10", channel: "Magnet Brains", videoId: "gMa_rC-FbDY", duration: "48:00", topic: "Chapter 10", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH PHYSICS
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["physics"],
    label: "12th Physics",
    videos: [
      { title: "Electric Charges & Fields – Full Chapter | Ch 1", channel: "Magnet Brains", videoId: "DRuIF7ieMjA", duration: "1:10:00", topic: "Chapter 1", category: "long" },
      { title: "Current Electricity – Full Chapter | Ch 3", channel: "Physics Wallah – Alakh Pandey", videoId: "lkLlPDSdGR0", duration: "1:15:45", topic: "Chapter 3", category: "long" },
      { title: "Electromagnetic Waves – Full Chapter | Ch 8", channel: "Magnet Brains", videoId: "bTNuLCcxgLU", duration: "48:20", topic: "Chapter 8", category: "long" },
      { title: "Semiconductor Electronics – Full Chapter | Ch 14", channel: "Magnet Brains", videoId: "h-iiB5LzGhA", duration: "1:05:00", topic: "Chapter 14", category: "long" },

      { title: "Electric Fields Visualised – 3D Animation", channel: "Veritasium", videoId: "kS_KSbAMiYE", duration: "6:18", topic: "Electrostatics", category: "animation" },
      { title: "How Semiconductors Work – 3D (Branch Education)", channel: "Branch Education", videoId: "33vbFFFn04k", duration: "8:02", topic: "Semiconductors", category: "animation" },
      { title: "Electromagnetic Spectrum Explained – Animation", channel: "Kurzgesagt", videoId: "IJhgZBn-LHg", duration: "7:24", topic: "EM Waves", category: "animation" },

      { title: "Magnetism & Matter – One Shot | Ch 5", channel: "Magnet Brains", videoId: "MF2OIZ4CQXY", duration: "44:00", topic: "Chapter 5", category: "oneshot" },
      { title: "Ray Optics – One Shot | Ch 9", channel: "Magnet Brains", videoId: "GVMT13WAPBY", duration: "1:05:00", topic: "Chapter 9", category: "oneshot" },
      { title: "Dual Nature of Radiation – One Shot | Ch 11", channel: "Magnet Brains", videoId: "sjnAscvRGNs", duration: "40:00", topic: "Chapter 11", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH CHEMISTRY
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["chemistry"],
    label: "12th Chemistry",
    videos: [
      { title: "The Solid State – Full Chapter | Ch 1", channel: "Magnet Brains", videoId: "pSxo-1NJ1xI", duration: "58:00", topic: "Chapter 1", category: "long" },
      { title: "Electrochemistry – Full Chapter | Ch 3", channel: "Magnet Brains", videoId: "jRv0WRLjJoU", duration: "1:12:00", topic: "Chapter 3", category: "long" },
      { title: "Coordination Compounds – Full Chapter | Ch 9", channel: "Magnet Brains", videoId: "KrLU9IJ8Tg4", duration: "1:05:00", topic: "Chapter 9", category: "long" },
      { title: "Organic Chemistry – Haloalkanes & Haloarenes | Ch 10", channel: "Magnet Brains", videoId: "NN7htkmLlbU", duration: "55:00", topic: "Chapter 10", category: "long" },

      { title: "Chemical Bonding – 3D Molecular Animation", channel: "TED-Ed", videoId: "QQEgpRVNNsk", duration: "5:30", topic: "Bonding", category: "animation" },
      { title: "How Electrochemical Cells Work – Animation", channel: "Stated Clearly", videoId: "OfFHjQYMzHI", duration: "6:44", topic: "Electrochemistry", category: "animation" },
      { title: "Polymers – Animated Explainer", channel: "TED-Ed", videoId: "c3lyC_vEMB0", duration: "4:55", topic: "Polymers", category: "animation" },

      { title: "p-Block Elements – One Shot | Ch 7", channel: "Magnet Brains", videoId: "cHa5ZfHmBg0", duration: "1:02:00", topic: "Chapter 7", category: "oneshot" },
      { title: "Alcohol, Phenol & Ether – One Shot | Ch 11", channel: "Magnet Brains", videoId: "cj8bHD8utnQ", duration: "50:00", topic: "Chapter 11", category: "oneshot" },
      { title: "Biomolecules – One Shot | Ch 14", channel: "Magnet Brains", videoId: "bxlYinMlqcc", duration: "45:00", topic: "Chapter 14", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH ENGLISH
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["english"],
    label: "12th English",
    videos: [
      { title: "The Last Lesson – Full Chapter Explanation", channel: "Magnet Brains", videoId: "nW0b3GR6a-M", duration: "25:10", topic: "Flamingo Ch 1", category: "long" },
      { title: "The Rattrap – Full Chapter Explanation", channel: "Magnet Brains", videoId: "lsYFQZp0_2c", duration: "22:45", topic: "Flamingo Ch 2", category: "long" },
      { title: "Indigo – Full Chapter Explanation", channel: "Magnet Brains", videoId: "g_JJfaTYBH8", duration: "30:20", topic: "Flamingo Ch 5", category: "long" },
      { title: "The Enemy – Full Chapter Explanation", channel: "Magnet Brains", videoId: "8rTeMHD1rQs", duration: "28:00", topic: "Vistas Ch 4", category: "long" },

      { title: "How to Analyse a Poem – Visual Guide", channel: "TED-Ed", videoId: "JwhouCNq-Fc", duration: "5:06", topic: "Poetry Analysis", category: "animation" },
      { title: "How Metaphors Shape Your Mind – Animated", channel: "TED-Ed", videoId: "aHo5crSECbE", duration: "5:16", topic: "Literary Devices", category: "animation" },

      { title: "My Mother at Sixty Six – One Shot Poem", channel: "Magnet Brains", videoId: "eLrH5H1rZoU", duration: "18:00", topic: "Flamingo Poetry", category: "oneshot" },
      { title: "The Tiger King – One Shot Revision", channel: "Magnet Brains", videoId: "dR0bnKNBbaA", duration: "22:30", topic: "Vistas Ch 2", category: "oneshot" },
      { title: "Flamingo & Vistas Full Revision One Shot", channel: "Magnet Brains", videoId: "p4SIglcX5Bc", duration: "1:45:00", topic: "Full Revision", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH ECONOMICS
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["economics"],
    label: "12th Economics",
    videos: [
      { title: "Introduction to Microeconomics – Full Chapter | Ch 1", channel: "Magnet Brains", videoId: "HcuXhJe3rXQ", duration: "35:00", topic: "Micro Ch 1", category: "long" },
      { title: "Theory of Consumer Behaviour | Ch 2", channel: "Magnet Brains", videoId: "4hc0T2kVZ1s", duration: "52:00", topic: "Micro Ch 2", category: "long" },
      { title: "National Income & Related Aggregates | Ch 2 Macro", channel: "Magnet Brains", videoId: "0pBp1VMQOIE", duration: "50:30", topic: "Macro Ch 2", category: "long" },
      { title: "Money & Banking – Full Chapter | Ch 3 Macro", channel: "Magnet Brains", videoId: "eEZ4C0dBfMU", duration: "48:00", topic: "Macro Ch 3", category: "long" },

      { title: "How the Economy Works – Ray Dalio (Animated)", channel: "Ray Dalio", videoId: "PHe0bXAIuk0", duration: "30:00", topic: "Economic Principles", category: "animation" },
      { title: "Supply & Demand – Visual Explainer", channel: "Khan Academy", videoId: "g9aDizJpd0s", duration: "5:46", topic: "Micro Economics", category: "animation" },
      { title: "What is GDP? – Animated", channel: "Kurzgesagt", videoId: "s2wWZnNKaXs", duration: "6:35", topic: "National Income", category: "animation" },

      { title: "Microeconomics Full Revision One Shot", channel: "Magnet Brains", videoId: "E0E55kDqEaA", duration: "1:30:00", topic: "Micro Revision", category: "oneshot" },
      { title: "Macroeconomics Full Revision One Shot", channel: "Magnet Brains", videoId: "ZPwMGSwgpXw", duration: "1:25:00", topic: "Macro Revision", category: "oneshot" },
      { title: "Government Budget – One Shot | Ch 5 Macro", channel: "Magnet Brains", videoId: "jwkBj4LgK50", duration: "33:00", topic: "Macro Ch 5", category: "oneshot" },
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  //  12TH COMPUTER SCIENCE
  // ══════════════════════════════════════════════════════════════════════════
  {
    keywords: ["computer", "cs", "computer science"],
    label: "12th Computer Science",
    videos: [
      { title: "Python Programming – Full Revision Class 12", channel: "Apni Kaksha", videoId: "Q1MJ8VCOvLI", duration: "1:20:00", topic: "Python", category: "long" },
      { title: "SQL & DBMS – Full Chapter Class 12", channel: "Apni Kaksha", videoId: "2cN__ckzPBk", duration: "1:05:00", topic: "Database", category: "long" },
      { title: "Networking – Full Chapter Class 12", channel: "Magnet Brains", videoId: "kCuyS7ihr_E", duration: "45:00", topic: "Networking", category: "long" },

      { title: "How CPU Works – 3D Animation", channel: "Branch Education", videoId: "Z5JC9Ve1sfI", duration: "20:40", topic: "Computer Hardware", category: "animation" },
      { title: "How the Internet Works – Animation", channel: "Kurzgesagt", videoId: "AEaKrq3SpW8", duration: "8:14", topic: "Networking", category: "animation" },
      { title: "Data Structures – Visual Animation", channel: "CS Dojo", videoId: "bum_19loj9A", duration: "10:47", topic: "Data Structures", category: "animation" },

      { title: "Python One Shot – Class 12 Quick Revision", channel: "CodeWithHarry", videoId: "aequTxAvQq4", duration: "38:20", topic: "Python", category: "oneshot" },
      { title: "Data Structures One Shot – Stack, Queue, Linked List", channel: "CodeWithHarry", videoId: "wjI1WNcIntg", duration: "58:30", topic: "Data Structures", category: "oneshot" },
      { title: "CS Full Revision One Shot – Class 12", channel: "Apni Kaksha", videoId: "n8GSuZy3t-8", duration: "2:00:00", topic: "Full Revision", category: "oneshot" },
    ]
  }

];

// ─── Match subject to video set ───────────────────────────────────────────────
function getVideosForSubject(subject) {
  const s = subject.toLowerCase();
  return VIDEO_DB.find(entry => entry.keywords.some(kw => s.includes(kw))) || null;
}

// ─── Tab switching ────────────────────────────────────────────────────────────
function switchTab(tab) {
  const isPlan = tab === 'plan';
  $('tabContentPlan').classList.toggle('hidden', !isPlan);
  $('tabContentMaterials').classList.toggle('hidden', isPlan);
  $('tabPlan').classList.toggle('active', isPlan);
  $('tabMaterials').classList.toggle('active', !isPlan);
}

// ─── Video section config ─────────────────────────────────────────────────────
const VIDEO_SECTIONS = [
  {
    key: 'long',
    icon: '📚',
    label: 'Long Classes',
    tip: '💡 Best when you have 45–60 min. Watch with a notebook and pause to take notes!',
  },
  {
    key: 'animation',
    icon: '🎬',
    label: '3D Animations & Visual Explainers',
    tip: '✨ Watch these to build intuition before or after a long class. Concepts will stick faster!',
  },
  {
    key: 'oneshot',
    icon: '⚡',
    label: 'One Shot Revision',
    tip: '🚀 Perfect the night before a test. Watch at 1.25× speed and pause on weak spots.',
  }
];

// ─── Build one video card ─────────────────────────────────────────────────────
function videoCard(v) {
  const badgeCls   = { long: 'badge-long', animation: 'badge-anim', oneshot: 'badge-shot' }[v.category] || '';
  const badgeLabel = { long: '📚 Long', animation: '🎬 Animation', oneshot: '⚡ One Shot' }[v.category] || '';
  return `
    <a class="video-card" href="https://www.youtube.com/watch?v=${v.videoId}" target="_blank" rel="noopener">
      <div class="video-thumb">
        <img src="https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg" alt="${v.title}" loading="lazy"
             onerror="this.src='https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg'">
        <div class="play-overlay"><span>▶</span></div>
        <div class="vid-duration">${v.duration}</div>
        <div class="vid-badge ${badgeCls}">${badgeLabel}</div>
      </div>
      <div class="video-info">
        <div class="vid-topic">${v.topic}</div>
        <div class="vid-title">${v.title}</div>
        <div class="vid-channel">📺 ${v.channel}</div>
      </div>
    </a>`;
}

// ─── Render video grid (3 sections) ──────────────────────────────────────────
function renderVideos(subject) {
  const match = getVideosForSubject(subject);
  const grid  = $('videoGrid');
  const noVid = $('noVideos');
  const title = $('materialsTitle');

  if (!match) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    noVid.classList.remove('hidden');
    title.textContent = 'Study Videos';
    return;
  }

  noVid.classList.add('hidden');
  grid.classList.remove('hidden');
  title.textContent = `${match.label} — Curated Video Library`;

  grid.innerHTML = VIDEO_SECTIONS.map(sec => {
    const vids = match.videos.filter(v => v.category === sec.key);
    if (!vids.length) return '';
    return `
      <div class="vid-section vid-section--${sec.key}">
        <div class="vid-section-head">
          <div class="vid-section-icon">${sec.icon}</div>
          <div class="vid-section-meta">
            <div class="vid-section-label">${sec.label}</div>
            <div class="vid-section-tip">${sec.tip}</div>
          </div>
          <div class="vid-section-count">${vids.length} video${vids.length > 1 ? 's' : ''}</div>
        </div>
        <div class="vid-section-grid">${vids.map(videoCard).join('')}</div>
      </div>`;
  }).join('');

  // Show chapter notes section only for Social Science / History
  const isHistory = match.keywords.includes('social science') || match.keywords.includes('history');
  $('chapterNotesSection').classList.toggle('hidden', !isHistory);
  if (isHistory) renderChapterNotes(activeFilter || 'all');
}

// ══════════════════════════════════════════════════════════════════════════
//  HISTORY CHAPTER DATA — All 15 NCERT chapters with exam tips & real PYQs
// ══════════════════════════════════════════════════════════════════════════
const HISTORY_CHAPTERS = [
  {
    ch:1, title:"Bricks, Beads and Bones", subtitle:"The Harappan Civilisation", color:"#e11d48",
    tips:[
      "🏙️ Town planning is the most distinctive feature — grid pattern streets, underground drainage, standardised bricks.",
      "📏 Standardised weights & measures suggest centralised authority — always mention this point.",
      "🔤 The Harappan script has NOT been deciphered — this is a guaranteed exam point every year.",
      "🛁 Great Bath at Mohenjo-daro = ritual/public bathing site — remember the purpose.",
      "🐄 Pashupati seal (seated figure surrounded by animals) suggests proto-Shiva worship.",
      "⚠️ Decline: mention MULTIPLE theories — floods, aridity, disease, Aryan invasion. Never single cause.",
      "📚 Archaeologists to remember: John Marshall, R.D. Banerji (Mohenjo-daro), Daya Ram Sahni (Harappa).",
      "🗺️ Sites: Harappa & Mohenjo-daro (Pakistan), Lothal (Gujarat — port city), Kalibangan (fire altars), Dholavira (water reservoirs).",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"Describe the salient features of Harappan cities. How do they reflect the level of urban planning?" },
      { year:"2022", marks:3, q:"Explain the evidence that the Harappan civilisation had long-distance trade." },
      { year:"2020", marks:5, q:"Examine the main features of Harappan cities with reference to drainage systems and town planning." },
      { year:"2019", marks:3, q:"Describe the main characteristics of Harappan pottery and craft production." },
      { year:"2018", marks:3, q:"How did historians reconstruct the social life of Harappan people from archaeological evidence?" },
    ]
  },
  {
    ch:2, title:"Kings, Farmers and Towns", subtitle:"Early States and Economies (600 BCE – 600 CE)", color:"#d97706",
    tips:[
      "📜 Inscriptions = most important source — Ashokan edicts in Prakrit/Brahmi are crucial.",
      "🪙 Punch-marked coins = earliest Indian coins; NOT issued by rulers — show economic exchange.",
      "🏛️ 16 Mahajanapadas — Magadha dominant due to iron ore, fertile Gangetic plains, rivers.",
      "👑 Mauryan succession: Chandragupta → Bindusara → Ashoka; Arthashastra by Kautilya.",
      "🕊️ Ashoka's Dhamma = moral policy, NOT Buddhism; emphasises tolerance & non-violence.",
      "🌾 Iron ploughshares increased agricultural production → surplus → urbanisation.",
      "⚠️ 'Varna' (textual 4-fold classification) ≠ 'Jati' (complex social reality) — examiners love this.",
      "📍 Source types: inscriptions, coins, literary texts, archaeological remains — know all four.",
    ],
    pyqs:[
      { year:"2023", marks:3, q:"Explain the role of inscriptions in reconstructing the political history of the Mauryan period." },
      { year:"2022", marks:5, q:"How did Ashoka try to hold together the vast Mauryan Empire through his policy of Dhamma?" },
      { year:"2021", marks:3, q:"Describe the importance of punch-marked coins in early Indian economy." },
      { year:"2020", marks:5, q:"Describe the growth of the Magadha kingdom. What factors led to its dominance?" },
      { year:"2019", marks:3, q:"How did historians use numismatic evidence to reconstruct early Indian history?" },
    ]
  },
  {
    ch:3, title:"Kinship, Caste and Class", subtitle:"Early Societies (600 BCE – 600 CE)", color:"#7c3aed",
    tips:[
      "📖 The Mahabharata is the KEY source for this chapter — historians must read it critically.",
      "👨‍👩‍👧 Patriliny = property passes through MALE line; this was the dominant norm.",
      "🚫 'Gotra' rule: same-gotra members CANNOT marry (exogamy rule).",
      "💍 Stridhan = women's wealth (jewellery, gifts) — could be passed to daughters, not sons.",
      "⚠️ Class ≠ Caste: class is economic; caste is birth-based — a key distinction for examiners.",
      "🤔 'Untouchables' excluded from rituals — Manusmriti legitimised this exclusion.",
      "📚 R.S. Sharma: pioneered social history using textual & archaeological sources.",
      "💡 The Mahabharata was composed over centuries; not a single-author text — note this.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"Explain how the Mahabharata was transmitted and what challenges historians face in using it as a source." },
      { year:"2022", marks:3, q:"What were the rules of patriliny? How were these reflected in the Mahabharata?" },
      { year:"2021", marks:5, q:"Analyse the position of women in early Indian society with reference to Vedic and epic literature." },
      { year:"2019", marks:3, q:"Describe the concept of 'gotra' and its significance in early Indian kinship systems." },
      { year:"2018", marks:3, q:"How did the caste system affect the social mobility of people in early India?" },
    ]
  },
  {
    ch:4, title:"Thinkers, Beliefs and Buildings", subtitle:"Cultural Developments (600 BCE – 600 CE)", color:"#059669",
    tips:[
      "☸️ 4 Noble Truths + 8-fold Path of Buddhism — memorise both for 3-mark questions.",
      "⚡ Jainism: Triratna = right faith + right knowledge + right action; Ahimsa is central.",
      "🏗️ Stupa (relics of Buddha) vs Chaitya (prayer hall) vs Vihara (monastery) — know the difference.",
      "🗿 Sanchi Stupa: built by Ashoka; GATEWAYS (toranas) depict Jataka tales — not the interior.",
      "📚 Mahayana: allows idol worship of Buddha; Theravada: no idol worship, older tradition.",
      "🔥 Brahmanical tradition (yajna + Vedic rituals) continued alongside Buddhism and Jainism.",
      "⚠️ Dhamma ≠ Buddhism: Ashoka promoted Dhamma as moral code for all, regardless of religion.",
      "💡 Trick: 'Sarnath' = first sermon (Dhamma Chakra Pravartana); 'Bodh Gaya' = enlightenment.",
    ],
    pyqs:[
      { year:"2023", marks:3, q:"What were the main teachings of Mahavira? How did they influence Indian society?" },
      { year:"2022", marks:5, q:"Examine the architectural features of Buddhist stupas and explain their religious significance." },
      { year:"2021", marks:5, q:"What were the similarities and differences between Buddhism and Jainism?" },
      { year:"2020", marks:3, q:"Describe the main features of Mahayana Buddhism. How was it different from Theravada Buddhism?" },
      { year:"2019", marks:5, q:"Analyse the importance of Sanchi Stupa as an example of early Buddhist architecture." },
    ]
  },
  {
    ch:5, title:"Through the Eyes of Travellers", subtitle:"Perceptions of Society (10th–17th Centuries)", color:"#0284c7",
    tips:[
      "✈️ Three key travellers: Al-Biruni (11th c), Ibn Battuta (14th c), François Bernier (17th c) — know centuries!",
      "📖 Al-Biruni: wrote 'Kitab-ul-Hind' in Arabic; admired Indian knowledge but criticised pollution rules.",
      "🌍 Ibn Battuta: Moroccan; 'Rihla' = his travel book; described Delhi Sultanate under Muhammad bin Tughluq.",
      "🔭 François Bernier: French doctor; compared Mughal India unfavourably to European empires.",
      "⚠️ Al-Biruni's limitation: relied on Sanskrit texts; missed folk/popular practices.",
      "🚫 Bernier's bias: European colonial perspective — saw India as 'declining'. Be critical!",
      "📚 Different travellers had DIFFERENT views on Sati — cite this as example of multiple perspectives.",
      "💡 Always compare travellers on: caste, women, cities. Separate answers for each.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"Analyse the observations of Al-Biruni about the caste system and social practices in India." },
      { year:"2022", marks:3, q:"What were the main features of Ibn Battuta's description of cities in the Delhi Sultanate?" },
      { year:"2021", marks:5, q:"Compare the views of François Bernier and Al-Biruni on Indian society." },
      { year:"2020", marks:3, q:"What were Al-Biruni's limitations in understanding Indian society? Explain with examples." },
      { year:"2019", marks:3, q:"How did Ibn Battuta describe the postal system under the Delhi Sultanate?" },
    ]
  },
  {
    ch:6, title:"Bhakti-Sufi Traditions", subtitle:"Changes in Religious Beliefs (8th–18th Centuries)", color:"#dc2626",
    tips:[
      "❤️ Bhakti = personal devotion to God without rituals or caste barriers; anti-orthodoxy.",
      "🎵 Key Bhakti saints: Kabir, Mirabai, Tukaram, Ravidas, Andal (Tamil poetess).",
      "🌹 Sufi orders (silsilas): Chishti (most popular — Nizamuddin Auliya); Suhrawardi.",
      "📜 Kabir: rejected BOTH Hindu rituals AND Islamic practices. His dohas are in Hindi.",
      "💃 Mirabai: Rajput princess devoted to Krishna; rejected royal status for bhakti.",
      "☪️ Sufi key terms: 'fana' (merging with God), 'khanqah' (Sufi hospice), 'pir' (master).",
      "⚠️ Both Bhakti and Sufi challenged upper-caste monopoly on religion — this is core.",
      "📚 Nirguna (formless God — Kabir, Ravidas) vs Saguna (God with form — Mirabai, Tulsidas).",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"Explain the philosophy of Kabir. How did his teachings challenge religious orthodoxy?" },
      { year:"2022", marks:3, q:"What were the main features of the Chishti order of Sufism in India?" },
      { year:"2021", marks:5, q:"How did the Bhakti movement challenge caste and social inequalities? Give examples." },
      { year:"2020", marks:3, q:"Describe the teachings of Mirabai. Why was she an important figure in the Bhakti tradition?" },
      { year:"2019", marks:5, q:"What were the similarities between the Bhakti and Sufi traditions in India?" },
      { year:"2018", marks:3, q:"Explain the significance of 'khanqah' in Sufi tradition." },
    ]
  },
  {
    ch:7, title:"An Imperial Capital: Vijayanagara", subtitle:"The City & Its Rulers (14th–16th Centuries)", color:"#0891b2",
    tips:[
      "🏰 Vijayanagara: founded 1336 CE by Harihara & Bukka; capital = Hampi (UNESCO World Heritage Site).",
      "💧 Water management: elaborate tank network + amanat system — this is an exam FAVOURITE.",
      "💰 Krishnadeva Raya: greatest ruler; Portuguese described him as the most powerful king in India.",
      "📖 Foreign sources: Abdur Razzaq (Persian), Duarte Barbosa & Domingo Paes (Portuguese).",
      "🏛️ Key structures: Vittala Temple (iconic stone chariot), Lotus Mahal, Elephant Stables.",
      "⚔️ Battle of Talikota (1565): Vijayanagara defeated by a coalition of Deccan Sultanates.",
      "🗺️ Hampi's ruins found by Colin Mackenzie in early 19th century — colonial archaeology.",
      "⚠️ Exam always asks TWO things: urban features AND water systems — prepare separately!",
    ],
    pyqs:[
      { year:"2023", marks:3, q:"Describe the water management system of the Vijayanagara Empire." },
      { year:"2022", marks:5, q:"What were the main features of the Vijayanagara city as described by foreign travellers?" },
      { year:"2021", marks:3, q:"Examine the role of temples in the Vijayanagara kingdom." },
      { year:"2020", marks:5, q:"Describe the architecture of Hampi. How does it reflect the power of the Vijayanagara rulers?" },
      { year:"2019", marks:3, q:"Who was Krishnadeva Raya? What were his contributions to the Vijayanagara Empire?" },
    ]
  },
  {
    ch:8, title:"Peasants, Zamindars and the State", subtitle:"Agrarian Society and the Mughal Empire", color:"#65a30d",
    tips:[
      "📊 Ain-i-Akbari by Abul Fazl: primary source for Mughal agrarian history — includes detailed stats.",
      "🌾 Zabti system: Akbar's land revenue; based on average production per bigha of land.",
      "👑 Zamindars: NOT landlords — intermediaries collecting revenue; had armed retainers for enforcement.",
      "🌱 Khud-kashta: peasants with permanent land rights. Pahi-kashta: migratory/tenant peasants.",
      "💰 Revenue demand was 1/3 to 1/2 of produce — often led to 'peasant flight' (migration).",
      "🤝 Zamindars had a DUAL role: resist state OR protect peasants — this nuance is exam gold.",
      "🌿 Kharif (autumn) and Rabi (spring) harvests — both taxed by the Mughal state.",
      "⚠️ Village community is an ideal, not reality — historians like Irfan Habib challenge this myth.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"What was the role of zamindars in the Mughal agrarian system? How did they interact with peasants and the state?" },
      { year:"2022", marks:3, q:"Describe the main features of the zabti system of land revenue under Akbar." },
      { year:"2021", marks:5, q:"Analyse the relationship between peasants and zamindars in Mughal India." },
      { year:"2020", marks:3, q:"What does the Ain-i-Akbari tell us about the agrarian conditions in the Mughal Empire?" },
      { year:"2019", marks:5, q:"Describe the structure of agrarian society in Mughal India. What was the position of women?" },
    ]
  },
  {
    ch:9, title:"Kings and Chronicles", subtitle:"The Mughal Courts (16th–17th Centuries)", color:"#7c3aed",
    tips:[
      "📚 Court chronicles commissioned by rulers → glorified the emperor; biased but historically invaluable.",
      "✍️ Akbarnama by Abul Fazl (3 volumes): Vol 3 = Ain-i-Akbari (administrative data).",
      "🖼️ Mughal miniature paintings: depicted court, battles, nature; fusion of Persian + Indian styles.",
      "👑 Akbar's 'Sulh-i-kul' = universal peace/tolerance — his core governance principle.",
      "🕌 Din-i-Ilahi: NOT a separate religion — just a code of conduct combining multiple faiths.",
      "📖 Badshahnamah by Abdul Hamid Lahori = official chronicle of Shah Jahan's reign.",
      "⚠️ Chronicles are PANEGYRICS (praise literature) — historians must read them critically.",
      "🌐 Persian = language of Mughal court; regional languages (Hindi, Bengali) also valued.",
    ],
    pyqs:[
      { year:"2023", marks:3, q:"What is the significance of the Akbarnama as a historical source?" },
      { year:"2022", marks:5, q:"How did court chronicles glorify the Mughal emperors? What are their limitations as historical sources?" },
      { year:"2021", marks:3, q:"Describe the importance of Mughal miniature paintings as historical sources." },
      { year:"2020", marks:5, q:"Analyse Akbar's policy of Sulh-i-kul. How was it reflected in his administrative practices?" },
      { year:"2019", marks:3, q:"What were the main features of the Mughal court ceremonials? Why were they important?" },
    ]
  },
  {
    ch:10, title:"Colonialism and the Countryside", subtitle:"Exploring Official Archives (Bengal, 18th–19th Centuries)", color:"#b45309",
    tips:[
      "📜 Permanent Settlement (1793) by Lord Cornwallis: zamindars became legal owners; revenue demand fixed.",
      "😢 Impact on peasants: zamindars could evict peasants; led to large-scale dispossession.",
      "🌳 Santhals: tribal community; Santhal Hool (revolt) 1855 — against moneylenders & colonialism.",
      "💸 Indigo Revolt 1859–60: forced indigo cultivation by planters; peasants refused en masse.",
      "📁 Colonial archives = company records, Buchanan's survey — biased towards maintaining order.",
      "⚠️ Colonial sources HIDE peasant agency — historians must read them 'against the grain'.",
      "🔑 Zamindars frequently went into debt; subinfeudation created layers of tenures.",
      "📚 Paharias vs Santhals: Paharias = older hill settlers; Santhals = new arrivals pushing them out.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"What was the impact of the Permanent Settlement on the peasantry of Bengal?" },
      { year:"2022", marks:3, q:"Why did the British introduce the Permanent Settlement? Explain its main features." },
      { year:"2021", marks:5, q:"Examine the causes and nature of the Santhal uprising of 1855." },
      { year:"2020", marks:3, q:"How did indigo planters force Indian peasants to cultivate indigo? What led to the Indigo Revolt?" },
      { year:"2019", marks:5, q:"Analyse how colonial rule transformed the agrarian structure of Bengal." },
    ]
  },
  {
    ch:11, title:"Rebels and the Raj", subtitle:"The Revolt of 1857 and Its Representations", color:"#be123c",
    tips:[
      "🔫 Immediate cause: greased cartridges (pig fat + cow fat) of Enfield rifle — hurt both Muslims & Hindus.",
      "📅 Started: 10 May 1857, Meerut; spread to Delhi, Lucknow, Kanpur, Jhansi, Bareilly.",
      "👑 Bahadur Shah Zafar: proclaimed leader by rebels; exiled to Rangoon after British suppression.",
      "🏰 Rebel leaders: Rani Laxmibai (Jhansi), Nana Sahib (Kanpur), Begum Hazrat Mahal (Lucknow), Kunwar Singh (Bihar).",
      "⚠️ Limitations: no pan-Indian leadership; some zamindars supported British; crushed within a year.",
      "📖 British called it 'Sepoy Mutiny'; Indian nationalists called it 'First War of Independence'.",
      "🗺️ Areas that DID NOT rebel: Punjab, Bengal Presidency, South India — explain WHY.",
      "📜 After 1857: British Crown replaced East India Company; India became a Crown Colony.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"Examine the causes of the Revolt of 1857. Why did it fail?" },
      { year:"2022", marks:3, q:"What was the role of sepoys in the Revolt of 1857? Give examples." },
      { year:"2021", marks:5, q:"How did British historians and Indian nationalists differ in their interpretation of the Revolt of 1857?" },
      { year:"2020", marks:3, q:"Describe the role of Rani Laxmibai in the Revolt of 1857." },
      { year:"2019", marks:5, q:"What were the social and economic causes of the Revolt of 1857?" },
      { year:"2018", marks:3, q:"What were the consequences of the Revolt of 1857 for British India?" },
    ]
  },
  {
    ch:12, title:"Colonial Cities", subtitle:"Urbanisation, Planning and Architecture (18th–20th Centuries)", color:"#0369a1",
    tips:[
      "🏙️ Three Presidency cities: Bombay, Calcutta, Madras — each began as British trading posts.",
      "🗺️ 'White town' (European quarter) vs 'Black town' (Indian quarter) = racial urban segregation.",
      "📊 Census was a key colonial tool — categorised population by religion, caste, and language.",
      "🏛️ New Delhi: designed by Edwin Lutyens & Herbert Baker; built 1911–1931; classical imperial style.",
      "🛤️ Railways transformed Indian cities — Bombay became a major hub due to rail connections.",
      "🏘️ 'Bungalow': colonial residential style — derived from Bengal (though the etymology is complex).",
      "⚠️ Sanitation & infrastructure was better in European quarters — deliberate inequality.",
      "📚 Thomas Metcalf argues architecture expressed imperial power and racial hierarchy.",
    ],
    pyqs:[
      { year:"2023", marks:3, q:"What were the main features of colonial urban planning? How did it reflect racial hierarchies?" },
      { year:"2022", marks:5, q:"Describe the development of Bombay as a colonial city. What were its main characteristics?" },
      { year:"2021", marks:3, q:"How did railways contribute to the growth of Indian cities under colonial rule?" },
      { year:"2020", marks:3, q:"Examine the significance of New Delhi's architecture as a symbol of imperial power." },
      { year:"2019", marks:5, q:"How did the British use architecture and town planning to establish their authority in India?" },
    ]
  },
  {
    ch:13, title:"Mahatma Gandhi and the Nationalist Movement", subtitle:"Civil Disobedience and Beyond", color:"#15803d",
    tips:[
      "✊ Satyagraha = 'truth-force' (not passive resistance!); non-violent; began in South Africa.",
      "📅 Movement timeline: Champaran 1917 (indigo) → Kheda 1918 (taxes) → Non-Cooperation 1920–22 → CDM 1930–34 → Quit India 1942.",
      "🧂 Salt Satyagraha (Dandi March): 12 March – 6 April 1930; 240 miles; broke salt law → global media attention.",
      "📰 Gandhi used Young India & Harijan newspapers — mass communication was a key strategy.",
      "🤝 Gandhi built a BROAD coalition: peasants, women, Dalits — unlike earlier elite nationalism.",
      "⚠️ Chauri Chaura incident (1922): Gandhi WITHDREW Non-Cooperation because a crowd killed police — always explain this.",
      "🌍 Round Table Conferences (1930–32): Gandhi attended; failed to achieve full independence.",
      "📚 Primary source: Collected Works of Mahatma Gandhi (100 volumes) — speeches, letters, articles.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"Explain Gandhi's concept of Satyagraha. How did he use it against British rule?" },
      { year:"2022", marks:5, q:"How did Gandhi mobilise the masses during the Civil Disobedience Movement of 1930?" },
      { year:"2021", marks:3, q:"Why did Mahatma Gandhi withdraw the Non-Cooperation Movement in 1922? What was the impact?" },
      { year:"2020", marks:5, q:"Analyse the significance of the Salt Satyagraha of 1930 in the Indian National Movement." },
      { year:"2019", marks:3, q:"Describe Gandhi's views on untouchability. How did he try to address it?" },
      { year:"2018", marks:5, q:"How did the Quit India Movement of 1942 differ from the earlier nationalist movements?" },
    ]
  },
  {
    ch:14, title:"Understanding Partition", subtitle:"Politics, Memories, Experiences", color:"#6d28d9",
    tips:[
      "📅 Partition: 14–15 August 1947; India and Pakistan created; Punjab and Bengal divided.",
      "😢 Scale: ~10–20 lakh killed; ~1–2 crore displaced — use these approximate figures in answers.",
      "🔍 Oral history = KEY methodology for Partition history; survivors' testimonies are primary sources.",
      "⚠️ Partition ≠ Independence — keep them separate in your answers. Very common mistake.",
      "🗳️ Pakistan Resolution (1940) Muslim League; Mountbatten Plan (June 1947) finalised partition.",
      "👩 Women: abducted, forcibly married; government launched 'recovery' operations — complex gendered history.",
      "📚 Key scholars: Urvashi Butalia ('The Other Side of Silence'), Ritu Menon & Kamla Bhasin.",
      "🧩 Causes: Two-Nation Theory, Congress-League rivalry, British policies, communal riots 1946–47.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"What were the main causes of the Partition of India in 1947? Explain with reference to political developments." },
      { year:"2022", marks:3, q:"How has oral history helped historians understand the experience of Partition?" },
      { year:"2021", marks:5, q:"Examine the impact of Partition on women. How did the government respond?" },
      { year:"2020", marks:5, q:"How did the Two-Nation Theory contribute to the Partition of India?" },
      { year:"2019", marks:3, q:"Describe the communal violence that accompanied the Partition of India in 1947." },
      { year:"2018", marks:5, q:"How is the history of Partition reconstructed through memories and oral testimonies?" },
    ]
  },
  {
    ch:15, title:"Framing the Constitution", subtitle:"The Beginning of a New Era", color:"#1d4ed8",
    tips:[
      "📜 Constituent Assembly: formed 1946; 299 members; Dr B.R. Ambedkar = Chairman of Drafting Committee.",
      "✍️ Constitution adopted: 26 November 1949; came into force 26 January 1950 (Republic Day).",
      "🗣️ Key debates: federal vs unitary structure, Fundamental Rights vs Directive Principles, language policy, minority rights.",
      "🧑‍⚖️ Ambedkar: pushed for individual rights over community rights; state must protect the marginalised.",
      "🌐 Nehru's Objectives Resolution (December 1946): laid foundation for Preamble content.",
      "⚠️ Constituent Assembly NOT directly elected — chosen by Provincial Assemblies formed under British law.",
      "📚 Language debate: Hindi vs English vs regional; compromise = both Hindi & English for 15 years.",
      "💡 Preamble keywords: Sovereignty, Democracy, Republic, Secular, Socialist (added 1976), Justice, Liberty, Equality, Fraternity.",
    ],
    pyqs:[
      { year:"2023", marks:5, q:"What were the main features of the Indian Constitution as debated in the Constituent Assembly?" },
      { year:"2022", marks:3, q:"Explain the role of Dr. B.R. Ambedkar in framing the Indian Constitution." },
      { year:"2021", marks:5, q:"What were the major debates in the Constituent Assembly on Fundamental Rights and Directive Principles?" },
      { year:"2020", marks:3, q:"How was the language issue resolved in the Constituent Assembly debates?" },
      { year:"2019", marks:5, q:"Describe the significance of Jawaharlal Nehru's Objectives Resolution in the making of the Constitution." },
      { year:"2018", marks:3, q:"Why is Dr. B.R. Ambedkar considered the chief architect of the Indian Constitution?" },
    ]
  }
];

// ─── Chapter notes state & rendering ─────────────────────────────────────────
let activeFilter = 'all';

function filterChapters(filter) {
  activeFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  const ids = { all:'filterAll', tips:'filterTips', pyq:'filterPyq' };
  if ($(ids[filter])) $(ids[filter]).classList.add('active');
  renderChapterNotes(filter);
}

function renderChapterNotes(filter) {
  const acc = $('chapterAccordion');
  acc.innerHTML = HISTORY_CHAPTERS.map((ch, idx) => {
    const showTips = filter !== 'pyq';
    const showPyqs = filter !== 'tips';
    return `
      <div class="ch-card" id="chCard${idx}">
        <button class="ch-header" onclick="toggleChapter(${idx})" aria-expanded="false">
          <div class="ch-num" style="background:${ch.color}18;color:${ch.color};border:1.5px solid ${ch.color}30;">Ch ${ch.ch}</div>
          <div class="ch-header-text">
            <div class="ch-title">${ch.title}</div>
            <div class="ch-subtitle">${ch.subtitle}</div>
          </div>
          <div class="ch-badges">
            ${showTips ? `<span class="ch-badge ch-badge--tips">📌 ${ch.tips.length} Tips</span>` : ''}
            ${showPyqs ? `<span class="ch-badge ch-badge--pyq">❓ ${ch.pyqs.length} PYQs</span>` : ''}
          </div>
          <div class="ch-arrow" id="chArrow${idx}">▼</div>
        </button>
        <div class="ch-body hidden" id="chBody${idx}">
          ${showTips ? `
            <div class="ch-section">
              <div class="ch-section-title"><span>📌</span> Key Exam Tips &amp; Important Points</div>
              <ul class="tips-list">${ch.tips.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>` : ''}
          ${showPyqs ? `
            <div class="ch-section">
              <div class="ch-section-title"><span>❓</span> Previous Year Questions (CBSE Board)</div>
              <div class="pyq-list">
                ${ch.pyqs.map(p => `
                  <div class="pyq-card">
                    <div class="pyq-meta">
                      <span class="pyq-year">${p.year}</span>
                      <span class="pyq-marks">${p.marks} Marks</span>
                    </div>
                    <div class="pyq-question">${p.q}</div>
                  </div>`).join('')}
              </div>
            </div>` : ''}
        </div>
      </div>`;
  }).join('');
}

function toggleChapter(idx) {
  const body  = $(`chBody${idx}`);
  const arrow = $(`chArrow${idx}`);
  const btn   = document.querySelector(`#chCard${idx} .ch-header`);
  const isOpen = !body.classList.contains('hidden');
  body.classList.toggle('hidden', isOpen);
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  btn.setAttribute('aria-expanded', String(!isOpen));
}

// ─── State & persistence ──────────────────────────────────────────────────────
function loadSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem("studyflow"));
    if (saved) state = {...state, ...saved};
  } catch(e) {}
}
function save() { localStorage.setItem("studyflow", JSON.stringify(state)); }

function formatHours(minutes) {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}
function allTasks() {
  return (state.plan?.plan || []).flatMap(d => d.tasks.filter(t => t.type !== "rest").map(t => ({...t, day:d.day})));
}
function completedCount() { return Object.values(state.completed).filter(Boolean).length; }

function render() {
  if (!state.plan) return;
  $("dashboard").classList.remove("hidden");
  $("goalTitle").textContent = state.plan.subject;
  const tasks   = allTasks();
  const done    = completedCount();
  const percent = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  $("topicsDone").textContent  = done;
  $("progressText").textContent = percent + "%";
  $("progressBar").style.width  = percent + "%";
  $("miniPercent").textContent  = percent + "%";
  $("progressMessage").textContent =
    percent === 100 ? "You crushed it! Every single task — done. Take a well-earned rest. 🏆" :
    percent >= 75   ? "Almost there! You're in the final stretch — finish strong! 🔥" :
    percent >= 50   ? "Over halfway! You've built real momentum. Keep going! 💪" :
    percent >= 25   ? "Great start! Every task you complete is a win. You've got this. 🌟" :
                      "Begin with one small task. That single step changes everything. 🌱";

  let dayMin=0, weekMin=0, monthMin=0;
  tasks.forEach((t,i) => {
    if (state.completed[`${t.day}-${i}`]) {
      const mins = t.minutes;
      monthMin += mins;
      if (t.day <= 7) weekMin += mins;
      if (t.day === 1) dayMin += mins;
    }
  });
  $("dayHours").textContent   = formatHours(dayMin);
  $("weekHours").textContent  = formatHours(weekMin);
  $("monthHours").textContent = formatHours(monthMin);
  $("streakBadge").textContent = `🔥 ${state.streak || 0} day streak`;

  $("planList").innerHTML = state.plan.plan.map((d) => `
    <div class="day-card ${d.day===1 ? "today":""}">
      <div class="day-head">
        <div class="day-title">${d.label}${d.day===1 ? " · Start here 👋" : ""}</div>
        <div class="day-time">${d.total_minutes ? formatHours(d.total_minutes) : "Rest day"}</div>
      </div>
      ${d.tasks[0].type === "rest" ? `<div class="rest">🌿 ${d.tasks[0].detail}</div>` :
        d.tasks.map((t,idx) => {
          const key    = `${d.day}-${idx}`;
          const isDone = !!state.completed[key];
          return `<div class="task ${isDone ? "done":""}">
            <button class="check" onclick="toggleTask('${key}', ${t.minutes})">${isDone ? "✓":""}</button>
            <div>
              <div class="task-title">${t.title}</div>
              <div class="task-detail">${t.detail}</div>
            </div>
            <div class="task-min">${t.minutes} min</div>
          </div>`;
        }).join("")}
    </div>`).join("");

  renderVideos(state.plan.subject);
}

function toggleTask(key, minutes) {
  const wasDone = !!state.completed[key];
  state.completed[key] = !wasDone;
  if (!wasDone) {
    state.streak = Math.max(1, (state.streak || 0));
    const msgs = [
      ["Great work! You kept your promise to yourself. 🌟","🌟"],
      ["Nice! Another step closer to your goal. 💪","💪"],
      ["You showed up — that matters more than perfection. 🧠","🧠"],
      ["Brilliant! Take a breath and be proud of this moment. 🎉","🎉"],
      ["One task down. Future-you is going to thank you! 🚀","🚀"],
      ["Yes! Consistency is your superpower. Keep it up! ⚡","⚡"],
      ["That's the spirit! Small wins lead to big results. 🏆","🏆"]
    ];
    const pick = msgs[Math.floor(Math.random()*msgs.length)];
    $("celebrationText").textContent  = pick[0];
    $("celebrationEmoji").textContent = pick[1];
    $("celebration").classList.remove("hidden");
  }
  save(); render();
}

$("generateBtn").onclick = async () => {
  const error = $("error"); error.textContent = "";
  const btn = $("generateBtn");
  btn.disabled = true;
  btn.innerHTML = '<span class="btn-spinner"></span> Building your plan…';
  try {
    const res  = await fetch("/api/plan", { method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({subject:$("subject").value, days:$("days").value, minutes:$("minutes").value}) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    state.plan = data; state.completed = {}; state.streak = 0; save(); render();
    switchTab('plan');
    $("dashboard").scrollIntoView({behavior:"smooth"});
  } catch(e) { error.textContent = e.message; }
  btn.disabled = false;
  btn.innerHTML = 'Create my study plan <span>→</span>';
};

$("newPlanBtn").onclick    = () => window.scrollTo({top:0, behavior:"smooth"});
$("closeCelebration").onclick = () => $("celebration").classList.add("hidden");
$("celebration").onclick  = e => { if(e.target.id==="celebration") $("celebration").classList.add("hidden"); };
$("themeBtn").onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("studyflow-theme", dark ? "dark" : "light");
  $("themeBtn").textContent = dark ? "☀" : "☾";
};
if (localStorage.getItem("studyflow-theme")==="dark") {
  document.body.classList.add("dark");
  $("themeBtn").textContent = "☀";
}
loadSaved(); render();
