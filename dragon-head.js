(function (root) {
  'use strict';

  const WOOD_TONES = {
    walnut: { label: 'Walnut', dark: '#2b130d', mid: '#6f321d', light: '#c47a3e', accent: '#f0b164' },
    cedar: { label: 'Cedar', dark: '#3b1710', mid: '#914225', light: '#dc8950', accent: '#ffd08d' },
    ebony: { label: 'Ebony', dark: '#0f1115', mid: '#34333a', light: '#8d7b68', accent: '#d4b78e' }
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const escapeXml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;'
  }[char]));

  function sanitizeDragonText(value, fallback = 'DRAGON') {
    const text = String(value ?? '').trim().replace(/[^a-z0-9 .'-]/gi, '').slice(0, 22);
    return text || fallback;
  }

  function normalizeDragonHeadOptions(options = {}) {
    const tone = WOOD_TONES[options.tone] ? options.tone : 'walnut';
    return {
      tone,
      detail: clamp(Math.round(Number(options.detail) || 3), 1, 5),
      inscription: sanitizeDragonText(options.inscription),
      transparent: options.transparent === true
    };
  }

  function buildDragonHeadSvg(options = {}) {
    const config = normalizeDragonHeadOptions(options);
    const wood = WOOD_TONES[config.tone];
    const title = `Carved wooden dragon head in ${wood.label.toLowerCase()}`;
    const grain = Array.from({ length: config.detail + 2 }, (_, index) => {
      const y = 105 + index * 43;
      const bend = index % 2 ? 18 : -18;
      return `<path d="M84 ${y} C220 ${y + bend}, 300 ${y - bend}, 400 ${y} S580 ${y + bend}, 716 ${y - bend}" />`;
    }).join('');
    const scales = config.detail < 2 ? '' : Array.from({ length: config.detail * 2 }, (_, index) => {
      const x = 286 + (index % 4) * 38;
      const y = 422 + Math.floor(index / 4) * 30;
      return `<path d="M${x} ${y} q14 18 28 0" />`;
    }).join('');
    const extraCuts = config.detail < 4 ? '' : `
      <path d="M328 278 Q400 306 472 278" />
      <path d="M290 512 Q400 560 510 512" />
      <path d="M338 598 Q400 622 462 598" />`;
    const plaque = config.transparent ? '' : `
      <rect width="800" height="800" rx="44" fill="url(#background)" />
      <path class="grain background-grain" d="M36 126 C218 80 310 165 472 110 S670 96 770 132 M28 690 C220 650 330 748 500 688 S680 668 780 710" />`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" role="img" aria-labelledby="dragon-title dragon-description" data-wood-tone="${config.tone}" data-detail="${config.detail}">
      <title id="dragon-title">${escapeXml(title)}</title>
      <desc id="dragon-description">A symmetrical dragon head relief with carved wood grain, horns, eyes, scales, and the inscription ${escapeXml(config.inscription)}.</desc>
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${wood.dark}" /><stop offset=".5" stop-color="${wood.mid}" /><stop offset="1" stop-color="${wood.dark}" /></linearGradient>
        <linearGradient id="relief" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${wood.light}" /><stop offset=".55" stop-color="${wood.mid}" /><stop offset="1" stop-color="${wood.dark}" /></linearGradient>
        <linearGradient id="horn" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${wood.accent}" /><stop offset="1" stop-color="${wood.mid}" /></linearGradient>
        <filter id="shadow" x="-.2" y="-.2" width="1.4" height="1.4"><feGaussianBlur stdDeviation="10" /></filter>
        <filter id="soft" x="-.2" y="-.2" width="1.4" height="1.4"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      ${plaque}
      <ellipse cx="400" cy="438" rx="252" ry="294" fill="#170b08" opacity=".55" filter="url(#shadow)" />
      <path d="M174 272 Q120 192 176 100 Q246 146 268 222 Q306 168 340 146 L400 202 L460 146 Q494 168 532 222 Q554 146 624 100 Q680 192 626 272 L590 316 Q626 420 574 552 Q530 674 400 704 Q270 674 226 552 Q174 420 210 316 Z" fill="url(#relief)" stroke="${wood.accent}" stroke-width="7" stroke-linejoin="round" />
      <path d="M176 102 Q206 190 266 222 M624 102 Q594 190 534 222" fill="none" stroke="${wood.accent}" stroke-width="13" opacity=".7" />
      <path d="M214 328 Q270 242 330 230 Q400 204 470 230 Q530 242 586 328" fill="none" stroke="${wood.dark}" stroke-width="18" opacity=".65" />
      <path d="M225 350 Q278 282 342 274 Q400 260 458 274 Q522 282 575 350" fill="none" stroke="${wood.light}" stroke-width="8" opacity=".65" />
      <path d="M400 218 C362 276 344 354 354 432 L400 482 L446 432 C456 354 438 276 400 218 Z" fill="${wood.mid}" opacity=".95" stroke="${wood.accent}" stroke-width="5" />
      <path d="M352 308 Q310 270 252 300 Q276 346 342 350 M448 308 Q490 270 548 300 Q524 346 458 350" fill="${wood.dark}" stroke="${wood.accent}" stroke-width="6" />
      <path d="M268 310 Q308 292 340 318 Q306 350 270 330 Z M532 310 Q492 292 460 318 Q494 350 530 330 Z" fill="${wood.light}" opacity=".85" />
      <ellipse cx="305" cy="321" rx="13" ry="19" fill="${wood.accent}" /><ellipse cx="495" cy="321" rx="13" ry="19" fill="${wood.accent}" />
      <circle cx="305" cy="326" r="5" fill="${wood.dark}" /><circle cx="495" cy="326" r="5" fill="${wood.dark}" />
      <path d="M350 460 Q400 494 450 460 L432 530 Q400 558 368 530 Z" fill="${wood.dark}" stroke="${wood.accent}" stroke-width="6" />
      <path d="M368 526 Q400 544 432 526" fill="none" stroke="${wood.light}" stroke-width="8" />
      <path d="M302 548 Q400 610 498 548 Q486 650 400 680 Q314 650 302 548 Z" fill="${wood.dark}" stroke="${wood.accent}" stroke-width="6" />
      <path d="M326 572 L344 628 M366 588 L378 650 M434 588 L422 650 M474 572 L456 628" stroke="${wood.light}" stroke-width="7" />
      <path d="M244 400 Q208 420 218 484 M556 400 Q592 420 582 484" fill="none" stroke="${wood.accent}" stroke-width="10" />
      <g class="carving-lines" fill="none" stroke="${wood.accent}" stroke-width="4" opacity=".7">${grain}${scales}${extraCuts}</g>
      <path d="M244 178 Q400 104 556 178" fill="none" stroke="${wood.light}" stroke-width="5" opacity=".7" />
      <text x="400" y="752" text-anchor="middle" fill="${wood.accent}" font-family="Georgia, serif" font-size="21" letter-spacing="5">${escapeXml(config.inscription.toUpperCase())}</text>
    </svg>`;
  }

  const api = { WOOD_TONES, sanitizeDragonText, normalizeDragonHeadOptions, buildDragonHeadSvg };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.TooloraDragonHead = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
