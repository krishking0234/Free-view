'use strict';

const assert = require('node:assert/strict');
const dragonHead = require('./dragon-head.js');

assert.equal(dragonHead.normalizeDragonHeadOptions({ tone: 'pine' }).tone, 'walnut');
assert.equal(dragonHead.normalizeDragonHeadOptions({ detail: 99 }).detail, 5);
assert.equal(dragonHead.sanitizeDragonText('<fire>'), 'fire');
const svg = dragonHead.buildDragonHeadSvg({ tone: 'ebony', detail: 5, inscription: 'MORI' });
assert.match(svg, /data-wood-tone="ebony"/);
assert.match(svg, /Carved wooden dragon head in ebony/);
assert.match(svg, /MORI/);
assert.equal(dragonHead.buildDragonHeadSvg({ transparent: true }).includes('<rect width="800"'), false);
console.log('Carved wooden dragon head tests passed (7 assertions).');
