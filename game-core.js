// ═══════════════════════════════════════════════════════════════════════
//  GAME DATA & SHARED HELPERS
//  Edit VILLAINS and ROUNDS below to customize the game.
// ═══════════════════════════════════════════════════════════════════════

export const VILLAINS = {
  hannibal: {
    name: "Hannibal Lecter",
    tagline: "A census taker once tried to test me…",
    everyday: "Critiques your lunch choices with unsettling specificity.",
    bg: "#2a0a12", accent: "#c9a961", flesh: "#7a1c2d",
  },
  joker: {
    name: "The Joker",
    tagline: "Why so serious?",
    everyday: "Orchestrates chaos via reply-all memes.",
    bg: "#14082a", accent: "#8fbc3a", flesh: "#5a1884",
  },
  loki: {
    name: "Loki",
    tagline: "I am burdened with glorious purpose.",
    everyday: "Takes credit for your work with a measured smirk.",
    bg: "#0a1f14", accent: "#d4af37", flesh: "#1a4a2e",
  },
  vader: {
    name: "Darth Vader",
    tagline: "I find your lack of faith disturbing.",
    everyday: "Heavy-breathes on every Zoom call. Camera always off.",
    bg: "#0a0a0a", accent: "#c41e3a", flesh: "#1e1e1e",
  },
  smith: {
    name: "Agent Smith",
    tagline: "Never send a human to do a machine's job.",
    everyday: "Master of the phrase 'per my last email.'",
    bg: "#061206", accent: "#39ff14", flesh: "#0f2a0f",
  },
  thanos: {
    name: "Thanos",
    tagline: "Perfectly balanced, as all things should be.",
    everyday: "Sincerely believes layoffs are necessary and inevitable.",
    bg: "#160826", accent: "#d4af37", flesh: "#3d1f5c",
  },
  cersei: {
    name: "Cersei Lannister",
    tagline: "When you play the game of thrones…",
    everyday: "Queen of passive-aggressive Slack messages.",
    bg: "#210410", accent: "#d4af37", flesh: "#5c0e1a",
  },
};

export const ROUNDS = [
  {
    title: "Round I", name: "Cold, Hard Logic",
    subtitle: "Philosophy, power, and the fate of civilization.",
    matchups: [
      { q: "Whose philosophy sounds more logical?", a: "thanos", b: "smith" },
      { q: "Who would destabilize society faster?", a: "joker", b: "loki" },
    ],
  },
  {
    title: "Round II", name: "Everyday Menace",
    subtitle: "Ordinary life. Extraordinary awfulness.",
    matchups: [
      { q: "Who would be the worst Uber driver?", a: "vader", b: "joker" },
      { q: "Who would be the worst dinner-party host?", a: "hannibal", b: "cersei" },
      { q: "Worst seatmate on a 12-hour flight?", a: "smith", b: "vader" },
    ],
  },
  {
    title: "Round III", name: "Office Hellscape",
    subtitle: "Villains in business casual.",
    matchups: [
      { q: "Who would survive Corporate America?", a: "cersei", b: "thanos" },
      { q: "Who would you rather report to?", a: "hannibal", b: "thanos" },
      { q: "Who would destroy the group project?", a: "loki", b: "joker" },
      { q: "Who would survive a team-building retreat?", a: "hannibal", b: "thanos" },
    ],
  },
  {
    title: "Round IV", name: "Matters of the Heart",
    subtitle: "Feelings. Apparently, even villains have them.",
    matchups: [
      { q: "Who would be most dramatic in a breakup?", a: "loki", b: "cersei" },
      { q: "Who would secretly cry alone?", a: "vader", b: "cersei" },
      { q: "Who would win a psychological battle?", a: "hannibal", b: "cersei" },
    ],
  },
];

export function matchupKey(roundIdx, matchupIdx) {
  return `r${roundIdx}m${matchupIdx}`;
}

// ─── REDESIGNED SVG ICONS ─────────────────────────────────────────────────

export function iconSvg(id, color, size) {
  const s = size || 120;
  const c = color || VILLAINS[id].accent;
  switch (id) {
    case "hannibal": return `
      <svg width="${s}" height="${Math.round(s * 1.1)}" viewBox="0 0 100 110" fill="${c}">
        <path d="M20 25 Q20 12 50 12 Q80 12 80 25 L80 75 Q80 95 50 105 Q20 95 20 75 Z"/>
        <rect x="15" y="23" width="70" height="5" fill="#0a0a0a" opacity="0.75"/>
        <ellipse cx="35" cy="42" rx="6" ry="5" fill="#0a0a0a" opacity="0.9"/>
        <ellipse cx="65" cy="42" rx="6" ry="5" fill="#0a0a0a" opacity="0.9"/>
        <circle cx="37" cy="42" r="1.2" fill="${c}" opacity="0.4"/>
        <circle cx="67" cy="42" r="1.2" fill="${c}" opacity="0.4"/>
        <rect x="22" y="60" width="56" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="22" y="66" width="56" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="22" y="72" width="56" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="22" y="78" width="56" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="28" y="58" width="1.8" height="25" fill="#0a0a0a" opacity="0.7"/>
        <rect x="38" y="58" width="1.8" height="25" fill="#0a0a0a" opacity="0.7"/>
        <rect x="48" y="58" width="1.8" height="25" fill="#0a0a0a" opacity="0.7"/>
        <rect x="58" y="58" width="1.8" height="25" fill="#0a0a0a" opacity="0.7"/>
        <rect x="68" y="58" width="1.8" height="25" fill="#0a0a0a" opacity="0.7"/>
        <rect x="10" y="50" width="12" height="3" fill="#0a0a0a" opacity="0.6"/>
        <rect x="78" y="50" width="12" height="3" fill="#0a0a0a" opacity="0.6"/>
        <path d="M35 92 L50 100 L65 92" stroke="#0a0a0a" stroke-width="2" fill="none" opacity="0.5"/>
      </svg>`;
    case "joker": return `
      <svg width="${s}" height="${Math.round(s * 1.1)}" viewBox="0 0 100 110" fill="${c}">
        <path d="M15 35 Q15 18 25 15 L30 28 Z" fill="#6a9c3a"/>
        <path d="M85 35 Q85 18 75 15 L70 28 Z" fill="#6a9c3a"/>
        <path d="M28 25 Q25 5 40 10 L35 30 Z" fill="#7fb33f"/>
        <path d="M72 25 Q75 5 60 10 L65 30 Z" fill="#7fb33f"/>
        <path d="M22 38 Q22 15 50 13 Q78 15 78 38 L78 75 Q75 95 50 100 Q25 95 22 75 Z" fill="#e8dcc8"/>
        <path d="M30 45 Q32 38 42 42 L45 52 L32 58 Z" fill="#1a1a1a"/>
        <path d="M70 45 Q68 38 58 42 L55 52 L68 58 Z" fill="#1a1a1a"/>
        <circle cx="40" cy="48" r="2" fill="#1a1a1a"/>
        <circle cx="60" cy="48" r="2" fill="#1a1a1a"/>
        <path d="M22 70 Q28 63 35 68 L42 73 Q50 82 58 73 L65 68 Q72 63 78 70 Q74 90 50 93 Q26 90 22 70 Z" fill="#b30000"/>
        <path d="M35 77 L38 82 L41 77 L44 82 L47 77 L50 82 L53 77 L56 82 L59 77 L62 82 L65 77" stroke="#e8dcc8" stroke-width="1.2" fill="none" opacity="0.8"/>
        <path d="M22 70 L15 68" stroke="#7a0000" stroke-width="1.5" opacity="0.7"/>
        <path d="M78 70 L85 68" stroke="#7a0000" stroke-width="1.5" opacity="0.7"/>
      </svg>`;
    case "loki": return `
      <svg width="${Math.round(s * 1.2)}" height="${Math.round(s * 1.1)}" viewBox="0 0 120 110" fill="${c}">
        <path d="M35 35 Q25 15 18 2 Q28 12 38 25 Q42 32 40 38 Z" fill="#d4af37"/>
        <path d="M85 35 Q95 15 102 2 Q92 12 82 25 Q78 32 80 38 Z" fill="#d4af37"/>
        <path d="M30 38 Q30 28 60 28 Q90 28 90 38 L90 80 Q85 98 60 105 Q35 98 30 80 Z"/>
        <path d="M58 30 L58 85 L62 85 L62 30 Z" fill="#d4af37" opacity="0.5"/>
        <path d="M38 52 L50 55 L50 62 L36 58 Z" fill="#0a0a0a" opacity="0.9"/>
        <path d="M82 52 L70 55 L70 62 L84 58 Z" fill="#0a0a0a" opacity="0.9"/>
        <rect x="50" y="78" width="20" height="2" fill="#0a0a0a" opacity="0.6"/>
        <circle cx="43" cy="57" r="1.5" fill="#39ff14"/>
        <circle cx="77" cy="57" r="1.5" fill="#39ff14"/>
      </svg>`;
    case "vader": return `
      <svg width="${s}" height="${Math.round(s * 1.2)}" viewBox="0 0 100 120" fill="${c}">
        <path d="M25 12 Q25 2 50 2 Q75 2 75 12 L77 35 L23 35 Z"/>
        <path d="M15 25 L25 30 L25 55 L17 60 Z"/>
        <path d="M85 25 L75 30 L75 55 L83 60 Z"/>
        <path d="M22 32 L78 32 L75 75 Q73 100 50 105 Q27 100 25 75 Z"/>
        <path d="M23 33 L77 33" stroke="${c}" stroke-width="0.8" opacity="0.4"/>
        <path d="M28 50 L45 46 L48 58 L30 62 Z" fill="#0a0a0a"/>
        <path d="M72 50 L55 46 L52 58 L70 62 Z" fill="#0a0a0a"/>
        <path d="M44 62 L56 62 L54 75 L46 75 Z" fill="#0a0a0a"/>
        <rect x="40" y="78" width="20" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="42" y="83" width="16" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="44" y="88" width="12" height="2" fill="#0a0a0a" opacity="0.85"/>
        <rect x="35" y="100" width="4" height="2" fill="${c}"/>
        <rect x="42" y="100" width="4" height="2" fill="#39ff14"/>
        <rect x="49" y="100" width="4" height="2" fill="${c}"/>
      </svg>`;
    case "smith": return `
      <svg width="${s}" height="${Math.round(s * 1.2)}" viewBox="0 0 100 120" fill="${c}">
        <g font-family="monospace" font-size="7" font-weight="700">
          <text x="5" y="12" fill="#39ff14" opacity="0.5">1</text>
          <text x="15" y="20" fill="#39ff14" opacity="0.3">0</text>
          <text x="5" y="30" fill="#39ff14" opacity="0.4">0</text>
          <text x="15" y="45" fill="#39ff14" opacity="0.6">1</text>
          <text x="5" y="55" fill="#39ff14" opacity="0.3">1</text>
          <text x="15" y="68" fill="#39ff14" opacity="0.5">0</text>
          <text x="5" y="80" fill="#39ff14" opacity="0.4">1</text>
          <text x="80" y="12" fill="#39ff14" opacity="0.4">0</text>
          <text x="88" y="25" fill="#39ff14" opacity="0.6">1</text>
          <text x="80" y="38" fill="#39ff14" opacity="0.3">1</text>
          <text x="88" y="50" fill="#39ff14" opacity="0.5">0</text>
          <text x="80" y="65" fill="#39ff14" opacity="0.4">1</text>
          <text x="88" y="80" fill="#39ff14" opacity="0.3">0</text>
          <text x="12" y="95" fill="#39ff14" opacity="0.4" font-size="9">ｦ</text>
          <text x="82" y="95" fill="#39ff14" opacity="0.5" font-size="9">ﾘ</text>
          <text x="7" y="105" fill="#39ff14" opacity="0.3">1</text>
          <text x="90" y="105" fill="#39ff14" opacity="0.4">0</text>
        </g>
        <ellipse cx="50" cy="45" rx="16" ry="19" fill="#c4a98a"/>
        <path d="M35 35 Q35 24 50 22 Q65 24 65 35 L65 40 Q62 30 50 30 Q38 30 35 40 Z" fill="#1a1a1a"/>
        <path d="M66 45 Q70 50 70 60" stroke="#1a1a1a" stroke-width="0.8" fill="none"/>
        <circle cx="67" cy="45" r="1.5" fill="#1a1a1a"/>
        <rect x="36" y="42" width="12" height="8" fill="#0a0a0a" stroke="#1a1a1a" stroke-width="0.5"/>
        <rect x="52" y="42" width="12" height="8" fill="#0a0a0a" stroke="#1a1a1a" stroke-width="0.5"/>
        <rect x="48" y="45" width="4" height="1.5" fill="#1a1a1a"/>
        <path d="M38 43 L42 43" stroke="#39ff14" stroke-width="0.5" opacity="0.7"/>
        <path d="M54 43 L58 43" stroke="#39ff14" stroke-width="0.5" opacity="0.7"/>
        <path d="M20 85 Q22 72 40 68 L45 65 L55 65 L60 68 Q78 72 80 85 L80 115 L20 115 Z" fill="#0a0a0a"/>
        <path d="M42 70 L50 80 L58 70 Z" fill="#e8e8e8"/>
        <path d="M47 78 L53 78 L52 95 L48 95 Z" fill="#1a1a1a"/>
        <path d="M48 80 L52 80 L51 90 L49 90 Z" fill="#c41e3a" opacity="0.8"/>
      </svg>`;
    case "thanos": return `
      <svg width="${Math.round(s * 1.2)}" height="${Math.round(s * 1.2)}" viewBox="0 0 120 120" fill="${c}">
        <circle cx="60" cy="60" r="55" fill="#ffd700" opacity="0.06"/>
        <circle cx="60" cy="60" r="45" fill="#ffd700" opacity="0.1"/>
        <circle cx="60" cy="60" r="35" fill="#ffd700" opacity="0.14"/>
        <path d="M35 35 L50 25 L70 25 L80 35 L85 50 L82 75 L78 95 L65 108 L55 108 L42 95 L38 75 L35 50 Z"/>
        <path d="M40 40 L80 40" stroke="#8b7328" stroke-width="1" opacity="0.5"/>
        <path d="M42 95 L78 95" stroke="#8b7328" stroke-width="1" opacity="0.5"/>
        <path d="M42 48 Q45 42 50 45 Q55 42 60 45 Q65 42 70 45 Q75 42 78 48" fill="none" stroke="#8b7328" stroke-width="1.2" opacity="0.6"/>
        <circle cx="60" cy="38" r="6" fill="#ff6a1a">
          <animate attributeName="opacity" values="1;0.6;1" dur="2.4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="38" r="4" fill="#ffaa4a"/>
        <circle cx="59" cy="37" r="1.3" fill="#ffffff" opacity="0.9"/>
        <circle cx="48" cy="55" r="5" fill="#ffd700">
          <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="48" cy="55" r="3" fill="#ffed4e"/>
        <circle cx="47" cy="54" r="1" fill="#ffffff" opacity="0.9"/>
        <circle cx="72" cy="55" r="5" fill="#ff1a1a">
          <animate attributeName="opacity" values="1;0.6;1" dur="2.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="72" cy="55" r="3" fill="#ff6060"/>
        <circle cx="71" cy="54" r="1" fill="#ffffff" opacity="0.9"/>
        <circle cx="60" cy="68" r="5" fill="#b84bff">
          <animate attributeName="opacity" values="1;0.7;1" dur="2.1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="60" cy="68" r="3" fill="#d080ff"/>
        <circle cx="59" cy="67" r="1" fill="#ffffff" opacity="0.9"/>
        <circle cx="48" cy="82" r="5" fill="#39ff14">
          <animate attributeName="opacity" values="1;0.7;1" dur="1.8s" repeatCount="indefinite"/>
        </circle>
        <circle cx="48" cy="82" r="3" fill="#6fff4a"/>
        <circle cx="47" cy="81" r="1" fill="#ffffff" opacity="0.9"/>
        <circle cx="72" cy="82" r="5" fill="#3a8fff">
          <animate attributeName="opacity" values="1;0.6;1" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="72" cy="82" r="3" fill="#6aafff"/>
        <circle cx="71" cy="81" r="1" fill="#ffffff" opacity="0.9"/>
      </svg>`;
    case "cersei": return `
      <svg width="${s}" height="${Math.round(s * 1.2)}" viewBox="0 0 100 120" fill="${c}">
        <rect x="25" y="20" width="50" height="4" fill="#8b7328"/>
        <path d="M25 20 L28 8 L32 20 Z" fill="#c9a961"/>
        <path d="M32 20 L37 2 L42 20 Z" fill="#c9a961"/>
        <path d="M42 20 L46 10 L50 20 Z" fill="#c9a961"/>
        <path d="M50 20 L54 5 L58 20 Z" fill="#c9a961"/>
        <path d="M58 20 L63 10 L68 20 Z" fill="#c9a961"/>
        <path d="M68 20 L72 2 L75 20 Z" fill="#c9a961"/>
        <circle cx="28" cy="12" r="1.5" fill="#c41e3a"/>
        <circle cx="37" cy="8" r="2" fill="#c41e3a"/>
        <circle cx="46" cy="13" r="1.5" fill="#c41e3a"/>
        <circle cx="54" cy="10" r="2" fill="#c41e3a"/>
        <circle cx="63" cy="13" r="1.5" fill="#c41e3a"/>
        <circle cx="72" cy="8" r="2" fill="#c41e3a"/>
        <circle cx="37" cy="7" r="0.5" fill="#ffffff" opacity="0.8"/>
        <circle cx="54" cy="9" r="0.5" fill="#ffffff" opacity="0.8"/>
        <circle cx="72" cy="7" r="0.5" fill="#ffffff" opacity="0.8"/>
        <path d="M28 38 Q28 25 50 22 Q72 25 72 38 L72 45 Q65 32 50 32 Q35 32 28 45 Z" fill="#c9a35a"/>
        <ellipse cx="50" cy="60" rx="18" ry="22" fill="#e8c9a0"/>
        <path d="M28 40 Q25 55 30 75 L35 68 L35 45 Z" fill="#b8924a"/>
        <path d="M72 40 Q75 55 70 75 L65 68 L65 45 Z" fill="#b8924a"/>
        <ellipse cx="42" cy="58" rx="2" ry="1.3" fill="#2a5a7a"/>
        <ellipse cx="58" cy="58" rx="2" ry="1.3" fill="#2a5a7a"/>
        <path d="M39 53 L45 52" stroke="#8b7328" stroke-width="1.2"/>
        <path d="M55 52 L61 53" stroke="#8b7328" stroke-width="1.2"/>
        <path d="M44 74 Q50 77 56 74 Q50 78 44 74 Z" fill="#8b0000"/>
        <rect x="44" y="82" width="12" height="12" fill="#e8c9a0"/>
        <path d="M30 95 L70 95 L75 120 L25 120 Z" fill="#5c0e1a"/>
        <path d="M40 95 L42 115 L58 115 L60 95" fill="#2a050a"/>
      </svg>`;
    default: return "";
  }
}

// ─── RENDERING HELPERS ────────────────────────────────────────────────────

export function villainCardHtml(id, options) {
  const opts = options || {};
  const v = VILLAINS[id];
  const size = opts.size || "md";
  const iconSize = size === "lg" ? 140 : size === "md" ? 80 : 60;
  const clickable = opts.onClick ? ' clickable' : '';
  const dim = opts.dim ? ' dim' : '';
  const selected = opts.selected ? ' selected' : '';
  const cardStyle = `background: linear-gradient(160deg, ${v.flesh} 0%, ${v.bg} 100%); border-color: ${v.accent}60;`;
  const clickAttr = opts.onClick ? `onclick="${opts.onClick}('${id}')"` : '';
  const showDetails = size === "lg";

  return `
    <div class="villain-card size-${size}${clickable}${dim}${selected}" style="${cardStyle}" ${clickAttr}>
      <div class="villain-corner tl" style="border-color: ${v.accent}"></div>
      <div class="villain-corner tr" style="border-color: ${v.accent}"></div>
      <div class="villain-corner bl" style="border-color: ${v.accent}"></div>
      <div class="villain-corner br" style="border-color: ${v.accent}"></div>
      <div class="villain-inner">
        <div class="villain-icon-wrap" style="filter: drop-shadow(0 4px 12px ${v.accent}30);">
          ${iconSvg(id, v.accent, iconSize)}
        </div>
        <div class="villain-name" style="color: ${v.accent};">${v.name}</div>
        ${showDetails ? `
          <div class="villain-tagline">"${v.tagline}"</div>
          <div class="villain-everyday">${v.everyday}</div>
        ` : ''}
      </div>
      ${opts.voteCount !== undefined ? `
        <div class="vote-counter" style="background: ${v.bg}; border-color: ${v.accent}; color: ${v.accent}; box-shadow: 0 4px 20px ${v.accent}60;">
          ${opts.voteCount}
        </div>
      ` : ''}
      ${opts.selected ? `
        <div class="selected-badge" style="background: ${v.accent}; color: ${v.bg};">✓ Your vote</div>
      ` : ''}
    </div>
  `;
}

export function scoreboardHtml(scores, compact) {
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const max = Math.max(1, ...Object.values(scores));
  const rowsHtml = sorted.map(([id, score], i) => {
    const v = VILLAINS[id];
    const pct = (score / max) * 100;
    return `
      <div class="score-row">
        <div class="score-rank">${i + 1}</div>
        ${iconSvg(id, v.accent, 24)}
        <div class="score-mid">
          <div class="score-name">${v.name}</div>
          <div class="score-bar"><div class="score-bar-fill" style="width: ${pct}%; background: linear-gradient(90deg, ${v.flesh}, ${v.accent});"></div></div>
        </div>
        <div class="score-value" style="color: ${v.accent};">${score}</div>
      </div>
    `;
  }).join('');
  return `
    <div class="scoreboard">
      <div class="scoreboard-header">
        <div class="line"></div>
        <div class="label">Running Tally</div>
        <div class="line"></div>
      </div>
      <div class="scoreboard-grid ${compact ? '' : 'cols-2'}">${rowsHtml}</div>
    </div>
  `;
}

// Compute totals across all matchups given the full votes tree from Firebase
export function computeTotals(allVotes) {
  const totals = Object.fromEntries(Object.keys(VILLAINS).map(k => [k, 0]));
  Object.values(allVotes || {}).forEach(matchup => {
    Object.values(matchup || {}).forEach(villainId => {
      if (totals[villainId] !== undefined) totals[villainId]++;
    });
  });
  return totals;
}

export function countVotes(votesObj) {
  const counts = Object.fromEntries(Object.keys(VILLAINS).map(k => [k, 0]));
  Object.values(votesObj || {}).forEach(villainId => {
    if (counts[villainId] !== undefined) counts[villainId]++;
  });
  return counts;
}
