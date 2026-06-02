// hos-claude.jsx — Hall Concierge engine
//   Primary: live Claude (window.claude.complete) with full menu context → structured JSON
//   Fallback: deterministic scripted pairing logic (conciergeRespond) when the API is absent
// Depends on: hos-data

// ── Live AI path ──────────────────────────────────────────────────────────────

// Build the full menu/vendor context once — handed to Claude as grounding.
const CONCIERGE_MENU_CONTEXT = (function buildMenuContext() {
  return VENDORS.map(v => {
    const head = v.bar
      ? `${v.name} — ${v.cuisine} (the bar) · ~${v.prep} min · ${v.rating}★`
      : `${v.name} — ${v.cuisine} · Stall ${v.stall} · ~${v.prep} min · ${v.rating}★`;
    const items = v.menu.map(m =>
      `    [${m.id}] ${m.name} — $${m.price.toFixed(2)}${m.tags.length ? ` {${m.tags.join(', ')}}` : ''} — ${m.desc}`
    ).join('\n');
    return head + '\n' + items;
  }).join('\n\n');
})();

const CONCIERGE_SYSTEM =
`You are the Hall Concierge for Cider & Spice, a food hall in Las Cruces, New Mexico. \
Six independent kitchens plus a craft-cider bar share one ordering app — guests build a single cart across every stall. \
You know the menu intimately and you are the hall's resident pairing expert. House rule you believe in: a dry, slightly sweet \
New Mexico cider tames Hatch-chile and Korean heat far better than beer.

THE MENU (use these exact item ids):
${CONCIERGE_MENU_CONTEXT}

How to respond:
- Warm, concise, knowledgeable host voice. 2–4 sentences, no bullet lists, no markdown.
- Recommend specific dishes by their id. Only ever use ids that appear in THE MENU above.
- When it fits, pair food with a cider from The Cider Bar and say why in a few words.
- Offer 2 short follow-up questions the guest might tap next (≤ 6 words each).

Reply with MINIFIED JSON ONLY — no prose, no code fences — in exactly this shape:
{"text":"...","itemIds":["id","id"],"followups":["...","..."]}`;

// Ask live Claude. Resolves to { text, items:[{item,vendor}], followups } or throws on any failure.
async function conciergeAsk(query, history) {
  if (!window.claude || typeof window.claude.complete !== 'function') throw new Error('concierge: no live API');

  const convo = (history || [])
    .filter(h => h.text)
    .map(h => `${h.role === 'user' ? 'Guest' : 'Concierge'}: ${h.text}`)
    .join('\n');

  const prompt =
    CONCIERGE_SYSTEM +
    (convo ? `\n\nConversation so far:\n${convo}` : '') +
    `\n\nGuest: ${query}\n\nJSON:`;

  const raw = await window.claude.complete(prompt);
  const match = raw && raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('concierge: no JSON in response');
  const data = JSON.parse(match[0]);

  const items = (Array.isArray(data.itemIds) ? data.itemIds : [])
    .map(id => itemById(id))
    .filter(Boolean)
    .slice(0, 4);

  return {
    text: ((data.text && String(data.text).trim()) || "Here's what I'd start with.")
      .replace(/\s*\[[a-z]\d+\]/gi, ''),   // strip any leaked [id] tokens from prose
    items,
    followups: Array.isArray(data.followups) ? data.followups.filter(Boolean).slice(0, 3) : [],
    live: true,
  };
}

// ── Scripted fallback ─────────────────────────────────────────────────────────
// Deterministic pairing logic — used for the instant greeting and whenever the
// live API is unavailable or errors. Identical response shape to conciergeAsk.

// Returns { text, items:[{itemId}], followups:[] } for a free-text query.
function conciergeRespond(query) {
  const q = query.toLowerCase();
  const pick = (ids) => ids.map(id => itemById(id)).filter(Boolean);

  // Spicy / heat
  if (/spic|heat|hot|fire|wing|chile/.test(q)) {
    return {
      text: "For heat, Seoul Fire's Heat Ladder Wings are the move — and the single best cider pairing in the hall. A dry, slightly sweet cider tames capsaicin far better than beer. I'd pour the Hatch Chile Cider alongside.",
      items: pick(['s1', 'c2', 's4']),
      followups: ['Make it a combo under $25', 'Something milder instead'],
    };
  }
  // Group / feeding multiple
  if (/group|people|feed|4 |four|family|share|crowd/.test(q)) {
    return {
      text: "Feeding a mixed table is exactly what the hall is built for — one cart, every kitchen. I'd anchor with the Sticky Stack Trio and Yazzie's Katsu Bowl, add Seoul Fire wings to share, and a Cider Flight so everyone tastes four NM ciders.",
      items: pick(['k1', 'y1', 's1', 'c1']),
      followups: ['Add a vegetarian option', 'Keep it under $50'],
    };
  }
  // Vegetarian / vegan
  if (/veg|vegan|plant|meatless|vegetarian/.test(q)) {
    return {
      text: "Plenty here. Levant Table's Mezze Plate is the standout — hummus, baba ganoush, falafel, tabbouleh. Yazzie does a proper Veggie Katsu Bowl too. Pair with the off-dry Pear Perry.",
      items: pick(['l2', 'y3', 'c5']),
      followups: ['Make it vegan only', 'Add a cider flight'],
    };
  }
  // Quick / fast / lunch / cheap
  if (/quick|fast|lunch|cheap|under|\$|budget|hurry/.test(q)) {
    return {
      text: "Fastest tickets in the hall: Sticky Stack (7 min) and Yazzie (8 min). The Bacon Jam Smashburger plus a Hatch Chile Cider lands you under $19 and out the door quick.",
      items: pick(['k2', 'c2', 'y4']),
      followups: ['Just food, no cider', 'Vegetarian and quick'],
    };
  }
  // Cider / drink focused
  if (/cider|drink|pair|flight|bar|beer|wine|tap/.test(q)) {
    return {
      text: "Start with the Cider Flight — four 4oz pours off the tap wall, the best way in. The Prickly Pear Rosé is our crowd favorite; the Hatch Chile Cider is the one to drink with anything spicy.",
      items: pick(['c1', 'c3', 'c2']),
      followups: ['What pairs with the wings?', 'Zero-proof options'],
    };
  }
  // Zero proof
  if (/zero|non.?alc|sober|kid|driving/.test(q)) {
    return {
      text: "We always keep zero-proof on tap. The house-pressed Sparkling Apple is crisp and not too sweet — pairs with everything from katsu to sliders.",
      items: pick(['c6', 'k1']),
      followups: ['Something spicy to go with it', 'A quick lunch'],
    };
  }
  // Korean / japanese / lebanese / mexican direct
  if (/korean|seoul/.test(q))   return { text: "Seoul Fire Chicken — Korean double-fried, five-step heat ladder. The Fire Chicken Sandwich is the gateway; the wings are the destination.", items: pick(['s2', 's1', 'c2']), followups: ['How spicy is the Volcano?', 'Pair it with cider'] };
  if (/japan|katsu|curry|yazzie/.test(q)) return { text: "Yazzie does panko katsu and Japanese curry with a NM Hatch twist. The Hatch Katsu Bowl is the signature.", items: pick(['y1', 'y4', 'y5']), followups: ['Vegetarian version?', 'Add a cider'] };
  if (/leban|shawarma|mezze|levant/.test(q)) return { text: "Levant Table brings Lebanese mezze and spit-roasted shawarma — a cuisine Las Cruces hasn't had. The Mezze Plate shares beautifully.", items: pick(['l2', 'l1', 'l4']), followups: ['Vegan options here?', 'Something to drink'] };
  if (/burrito|mexican|hatch|chile|rio|green|red/.test(q)) return { text: "Río Grande Burritos — New Mexico Christmas-style, red and green. The Carne Adovada Burrito is the one regulars come back for.", items: pick(['r2', 'r1', 'r5']), followups: ['Breakfast options?', 'Vegetarian burrito'] };

  // Default / discovery
  return {
    text: "Happy to help you build an order. Tell me what you're in the mood for — something spicy, a quick lunch, feeding a group, vegetarian — and I'll pull the best dishes and a cider to match. Or here's where most people start:",
    items: pick(['s1', 'y1', 'c1']),
    followups: CONCIERGE_PROMPTS.slice(0, 3),
  };
}

Object.assign(window, { conciergeRespond, conciergeAsk, CONCIERGE_MENU_CONTEXT });
