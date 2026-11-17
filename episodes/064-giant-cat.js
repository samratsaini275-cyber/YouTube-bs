// Narrative 5: "What Would Happen If…". A made-up comedy sketch: there are no giant cats (and nobody is in the bus).
// Hook rule: the premise as a question under 2 s, first frame already showing a building-sized cat looming over a town.

function cat(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#F28C28', { rough: .9 }), fur2 = mat('#D9731A', { rough: .9 }), white = mat('#FFF4E6', { rough: .9 });
  const c = { root: group([0, 0, 0], parent) };
  const body = ball(6, fur, [0, 6.5, 0], c.root); body.scale.set(1, 1.25, 1.1);
  const belly = ball(4.2, white, [0, 6.5, 3.4], c.root); belly.scale.set(1, 1.3, .7);
  for (let i = 0; i < 3; i++) { const s = box(9, .8, 3, fur2, [0, 9 - i * 2.4, -4.6], c.root); s.castShadow = false; }
  c.head = group([0, 15.5, 2], c.root);
  ball(4.2, fur, [0, 0, 0], c.head);
  ball(2, white, [0, -1.4, 3.1], c.head).scale.set(1.3, .8, .8);
  for (const x of [-2.6, 2.6]) { const e = cone(1.6, 3, fur, [x, 3.8, -.4], c.head, 4); e.rotation.z = x > 0 ? -.3 : .3; cone(.9, 2, mat('#FF9EB0'), [x * .98, 3.6, .2], c.head, 4).rotation.z = x > 0 ? -.3 : .3; }
  c.eyes = [];
  for (const x of [-1.5, 1.5]) { const eg = group([x, .6, 3.5], c.head); ball(.9, mat('#7CD957', { glow: .3 }), [0, 0, 0], eg); box(.22, 1.3, .2, mat('#111111'), [0, 0, .8], eg); c.eyes.push(eg); }
  ball(.45, mat('#FF7A99'), [0, -.6, 4.3], c.head);
  for (const s of [-1, 1]) for (const y of [-1, -1.6]) { const wsk = box(3.5, .07, .07, mat('#FFFFFF'), [s * 2.6, y, 3.6], c.head); wsk.rotation.z = s * (y + 1.3) * .3; wsk.castShadow = false; }
  for (const x of [-2.6, 2.6]) cyl(1.3, 1.5, 5, fur, [x, 2.5, 4.5], c.root, 16);
  c.paws = [-2.6, 2.6].map(x => ball(1.6, white, [x, .8, 5.6], c.root));
  c.tail = [];
  let prev = c.root;
  for (let i = 0; i < 8; i++) { const g = group(i ? [0, 1.7, 0] : [0, 2, -6], prev); cyl(.9 - i * .05, .95 - i * .05, 1.9, i === 7 ? white : fur, [0, .85, 0], g, 12); c.tail.push(g); prev = g; }
  return c;
}
function tail(c, t) { c.tail.forEach((g, i) => { g.rotation.x = i === 0 ? -1.2 : .18; g.rotation.z = .35 * Math.sin(t * 2.2 - i * .6); }); }

function house(k, parent, x, z, color, s = 1) {
  const g = k.group([x, 0, z], parent); g.scale.setScalar(s);
  k.box(3, 2.4, 3, k.mat(color), [0, 1.2, 0], g);
  const r = k.cone(2.5, 1.6, k.mat('#8B3A2E'), [0, 3.2, 0], g, 4); r.rotation.y = Math.PI / 4;
  k.box(.7, 1.2, .1, k.mat('#5A3A1E'), [0, .6, 1.52], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  const cols = ['#F4F1E8', '#BFE3EA', '#F7D9A8', '#E6C6E6', '#D6E8C4'];
  for (let i = 0; i < 26; i++) { const a = i * 2.4, r = 12 + (i % 5) * 3.5; house(k, w.town, Math.cos(a) * r, Math.sin(a) * r + 4, cols[i % 5], .9); }
  w.c = cat(k, k.scene);
  w.cat = w.c.root;
  // the "table": a flat-roofed building with an (empty) bus parked on top
  w.tower = group([9, 0, 10]);
  box(7, 10, 6, mat('#C9CED6'), [0, 5, 0], w.tower);
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) box(1.2, 1.2, .1, mat('#7FB2D9', { glow: .2 }), [-2.2 + c * 2.2, 2 + r * 2.2, 3.05], w.tower).castShadow = false;
  w.bus = group([0, 10.8, 0], w.tower);
  box(4.6, 1.6, 1.8, mat('#FFC21F'), [0, 0, 0], w.bus);
  for (let i = 0; i < 4; i++) box(.8, .6, .05, mat('#9FD6F5'), [-1.6 + i * 1.05, .3, .92], w.bus);
  for (const x of [-1.5, 1.5]) for (const z of [-.9, .9]) cyl(.4, .4, .3, mat('#1E2430'), [x, -.8, z], w.bus, 14).rotation.x = Math.PI / 2;
  w.paw = ball(1.7, mat('#FFF4E6', { rough: .9 }), [0, 0, 0]);
  w.arm = cyl(1.3, 1.3, 1, mat('#F28C28', { rough: .9 }), [0, 0, 0], k.scene, 16); w.arm.geometry.translate(0, .5, 0);
  // the box
  w.box = group([0, 0, -60]);
  const card = mat('#C89B5E', { rough: 1 }), card2 = mat('#B5874C', { rough: 1 });
  box(20, .4, 16, card, [0, .2, 0], w.box);
  box(20, 9, .4, card, [0, 4.5, 8], w.box); box(20, 9, .4, card2, [0, 4.5, -8], w.box);
  box(.4, 9, 16, card2, [-10, 4.5, 0], w.box); box(.4, 9, 16, card2, [10, 4.5, 0], w.box);
  for (const x of [-6, 6]) { const f = box(8, .3, 16, card, [x * 1.65, 9, 0], w.box); f.rotation.z = x > 0 ? -.5 : .5; }
  box(20.2, 1.2, .1, mat('#E8D7B0'), [0, 7.5, 8.25], w.box).castShadow = false;
  w.small = group([0, 0, -60]);
  for (let i = 0; i < 8; i++) house(k, w.small, -26 + (i % 4) * 17, (i < 4 ? -14 : 16), cols[i % 5], .9);
  // 5 a.m.: inside a bedroom, looking out at a window filled by one giant eye
  w.room = group([0, 0, 60]);
  const wall = mat('#E8DCC8');
  box(14, 4, .5, wall, [0, 2, 0], w.room); box(14, 4, .5, wall, [0, 10, 0], w.room);
  box(4, 4, .5, wall, [-5, 6, 0], w.room); box(4, 4, .5, wall, [5, 6, 0], w.room);
  box(6.2, .3, .8, mat('#FFFFFF'), [0, 4.1, 0], w.room); box(.3, 4, .6, mat('#FFFFFF'), [0, 6, 0], w.room);
  w.bed = box(5, 1.2, 7, mat('#3B5BA9'), [-3, .6, -6], w.room);
  w.clock = group([3.5, 1.6, -3], w.room);
  box(2.4, 1.2, 1, mat('#1E2430'), [0, 0, 0], w.clock);
  w.digits = box(1.9, .6, .05, mat('#FF3B30', { glow: 2 }), [0, 0, .52], w.clock);
  w.face = group([0, 6, 60 + 9]);
  ball(8, mat('#F28C28', { rough: .9 }), [0, 0, 0], w.face);
  w.bigeye = group([0, 0, -6.6], w.face);
  ball(2.6, mat('#7CD957', { glow: .4 }), [0, 0, 0], w.bigeye);
  box(.6, 3.6, .3, mat('#111111'), [0, 0, -2.4], w.bigeye);
  w.dark = box(14, 12, 10, mat('#141A2A', { opacity: .3 }), [0, 6, 60 - 5.3]); w.dark.castShadow = false;
  // the owner: tiny, waving
  w.you = group([1.5, 0, 10]);
  cyl(.35, .4, 1.4, mat('#2F6FD6'), [0, .7, 0], w.you, 12); ball(.38, mat('#F2C9A0'), [0, 1.75, 0], w.you);
  w.wave = group([.4, 1.2, 0], w.you); cyl(.12, .12, 1, mat('#2F6FD6'), [0, .5, 0], w.wave, 8);
  return w;
}

function reach(w, pawPos) {
  const sh = new w.c.root.position.constructor(2.6, 9, 4).add(w.c.root.position);
  const p = new sh.constructor(...pawPos), d = p.clone().sub(sh);
  w.arm.position.copy(sh); w.arm.scale.set(1, d.length(), 1);
  w.arm.quaternion.setFromUnitVectors(new sh.constructor(0, 1, 0), d.normalize());
  w.paw.position.copy(p);
}
function town(w, t, o = {}) {
  w.cat.position.set(0, 0, 0); w.cat.rotation.y = 0; tail(w.c, t);
  w.c.head.rotation.set(0, o.turn || 0, .06 * Math.sin(t * 1.3));
  w.c.eyes.forEach(e => { e.scale.y = (t % 3.1) < .12 ? .1 : 1; });
}
const TOWN = ['ground', 'town', 'cat'];

export default {
  id: '064',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT CAT',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WERE GIANT?'],
  title: 'What would happen if cats were giant?',
  description: 'Same cat. Same habits. Much, much bigger table. (A made-up giant cat. The bus was empty.)',
  tags: ['whatif', 'funny', 'cat', 'giantcat', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the giant cat is made up; no people are in the bus.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cats were giant?',
      show: TOWN, sky: '#9ED2F3', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [-12, 1.5, 44], look: [0, 4, 0], fov: 50, to: { pos: [-10, 1.5, 40], look: [0, 4.5, 0], fov: 50 } },
      update: (w, p, t) => town(w, t),
    },
    {
      say: 'It still knocks stuff off tables.',
      show: [...TOWN, 'tower', 'paw', 'arm'], sky: '#A7D8F5', lightAt: [8, 8, 8], lightDist: 25,
      cam: { pos: [26, 9, 30], look: [8, 10, 8], fov: 48, to: { pos: [24, 9, 27], look: [8, 9, 8], fov: 46 } },
      update: (w, p, t, k) => {
        town(w, t); w.c.head.rotation.y = .5;
        const push = k.h.ease(Math.min(1, Math.max(0, (t - .4) / .8)));
        reach(w, [4 + push * 5, 11, 10]);
        const off = Math.max(0, t - 1.1);
        w.bus.position.set(Math.max(0, push * 5 - 3.2) + off * 3, 10.8 - 9.8 * Math.min(1, off * off * 3), 0);
        w.bus.rotation.z = -Math.min(1.4, off * 3);
      },
    },
    {
      say: 'It fits in any box. Any box.',
      show: ['ground', 'box', 'small', 'cat'], sky: '#9ED2F3', lightAt: [0, 6, -60], lightDist: 35,
      cam: { pos: [14, 14, -24], look: [0, 10, -60], fov: 50, to: { pos: [12, 13, -28], look: [0, 10, -60], fov: 48 } },
      update: (w, p, t) => { w.cat.position.set(0, -5.5 + Math.min(1, t) * .5, -60); w.cat.rotation.y = 0; tail(w.c, t); w.c.head.rotation.set(0, 0, .1 * Math.sin(t * 1.5)); },
    },
    {
      say: 'Five in the morning? It wants breakfast.',
      show: ['ground', 'room', 'face', 'dark'], sky: '#1A2340', lightAt: [0, 6, 60], lightDist: 14,
      cam: { pos: [2, 4, 60 - 11], look: [0, 6, 60 + 2], fov: 50, to: { pos: [1.5, 4.5, 60 - 9], look: [0, 6, 60 + 2], fov: 46 } },
      update: (w, p, t) => { w.bigeye.position.x = .6 * Math.sin(t * 1.4); w.bigeye.scale.y = (t % 1.7) < .12 ? .1 : 1; w.digits.material.emissiveIntensity = (t % 1) < .5 ? 2 : .4; },
    },
    {
      say: 'And it still ignores you.',
      show: ['ground', 'cat', 'you'], sky: '#FFE3C2', lightAt: [1, 2, 8], lightDist: 25,
      cam: { pos: [8, 2, 30], look: [0, 9, 3], fov: 50, to: { pos: [7, 2, 27], look: [0, 9.5, 3], fov: 48 } },
      update: (w, p, t, k) => { town(w, t, { turn: 1.4 * k.h.ease(Math.min(1, t / .7)) }); w.wave.rotation.z = .6 * Math.sin(t * 9); },
    },
    {
      say: 'Giant cat, or giant dog? Comment below.',
      quiz: { q: 'Which giant pet would you pick?', options: ['Giant cat', 'Giant dog', 'Normal size, thanks'], answer: 'It is a made-up giant cat, so pick whichever one fits your house.' },
      show: TOWN, sky: '#274B73', lightAt: [0, 8, 4], lightDist: 40,
      cam: { pos: [16, 2, 40], look: [0, 22, 0], fov: 50, to: { pos: [-14, 2, 40], look: [0, 22, 0] } },
      update: (w, p, t) => town(w, t),
    },
  ],
};
