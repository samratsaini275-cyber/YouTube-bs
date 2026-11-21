// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; body-change premise like 076 (humans had tails, ~1.1K views).
// A made-up comedy sketch: snakes do not have legs (some have tiny hip-bone remnants; not used here). Hook: premise as a question under 2 s.

function snake(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5DBB4A', { rough: .6 }), belly = mat('#D9F0A0');
  const s = { root: group([0, 0, 0], parent), segs: [], legs: [] };
  for (let i = 0; i < 10; i++) {
    const seg = group([-i * .55, .45, 0], s.root); ball(.32 - i * .012, g, [0, 0, 0], seg);
    if (i % 2 === 1 && i < 9) for (const z of [-.25, .25]) { const l = group([0, -.15, z], seg); cyl(.05, .05, .35, mat('#3E8A30'), [0, -.17, 0], l, 6); ball(.07, mat('#E2453C'), [.04, -.35, 0], l); s.legs.push(l); }
    s.segs.push(seg);
  }
  s.head = group([.5, .55, 0], s.root); const hd = ball(.38, g, [0, 0, 0], s.head); hd.scale.set(1.4, .8, 1);
  for (const z of [-.18, .18]) { ball(.12, mat('#FFFFFF'), [.25, .2, z], s.head); ball(.06, mat('#111111'), [.33, .2, z * 1.1], s.head); }
  s.tongue = box(.35, .03, .06, mat('#E2453C'), [.65, -.08, 0], s.head);
  return s;
}
function crawl(s, t, sp = 10, slither = .25) {
  s.segs.forEach((seg, i) => { seg.position.z = slither * Math.sin(t * 4 - i * .7); seg.position.y = .45; });
  s.legs.forEach((l, i) => { l.rotation.z = .6 * Math.sin(t * sp + i * 1.3); });
  s.head.position.z = slither * Math.sin(t * 4 + .7); s.tongue.scale.x = .5 + .5 * Math.abs(Math.sin(t * 6));
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B08A', 0);
  w.room = group(); box(40, 20, .5, mat('#D8EAD2'), [0, 10, -3], w.room);
  w.s = snake(k, k.scene); w.sn = w.s.root;
  w.taps = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.25 + i * .2, .03, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.taps); r.userData.i = i; r.castShadow = false; }
  w.person = group([0, 0, 0]); cyl(.8, .85, 2.6, mat('#2F6FD6'), [0, 1.3, 0], w.person, 14); ball(.75, mat('#F2C9A0'), [0, 3.3, 0], w.person);
  for (const x of [-.28, .28]) ball(.14, mat('#111111'), [x, 3.45, .68], w.person);
  w.shoes = group(); const cols = ['#E2453C', '#3B82F6', '#FFD21F', '#22C55E', '#8B5CF6', '#F97316'];
  for (let i = 0; i < 24; i++) { const sh = group([0, 0, 0], w.shoes); box(.45, .2, .22, mat(cols[i % 6]), [0, 0, 0], sh); box(.2, .2, .22, mat(cols[i % 6]), [-.12, .15, 0], sh); sh.userData.i = i; }
  w.disco = group(); box(40, .05, 30, mat('#1E1B3A'), [0, .02, 0], w.disco).castShadow = false;
  w.ballD = ball(.6, mat('#DDDDDD', { metal: .8 }), [0, 5.5, 0], w.disco);
  w.lights = group(); for (let i = 0; i < 6; i++) { const l = ball(.25, mat(cols[i], { glow: 2 }), [0, 0, 0], w.lights); l.userData.i = i; l.castShadow = false; }
  w.trophy = group([0, 0, 0]); cyl(.3, .15, .5, mat('#FFD21F', { metal: .7, glow: .3 }), [0, .25, 0], w.trophy, 12); box(.4, .15, .4, mat('#8B5A2B'), [0, -.05, 0], w.trophy);
  return w;
}

const place = (w, x, z, ry) => { w.sn.position.set(x, 0, z); w.sn.rotation.set(0, ry, 0); w.s.head.rotation.set(0, 0, 0); };

export default {
  id: '159',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SNAKE WITH LEGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SNAKES', 'HAD LEGS?'],
  title: 'What would happen if snakes had legs?',
  description: 'Sneaking up on you is impossible. It needs a lot of shoes. It wins every dance contest. And it still slithers, out of habit. (A made-up snake.)',
  tags: ['whatif', 'funny', 'snake', 'animals', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: snakes with legs are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if snakes had legs?',
      show: ['ground', 'room', 'sn'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.9, 1.5, 5], look: [.1, 1.05, 0], fov: 46, to: { pos: [.8, 1.45, 4.5], look: [.1, 1.0, 0], fov: 44 } },
      update: (w, p, t) => { place(w, -.2, -.6 + t * .2, -1.15); crawl(w.s, t); },
    },
    {
      say: 'Sneaking up on you? Impossible. Tap, tap, tap.',
      show: ['ground', 'room', 'sn', 'taps', 'person'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2, 3, 9], look: [0, 1.8, 0], fov: 48, to: { pos: [1.8, 3, 8.2], look: [0, 1.8, 0], fov: 46 } },
      update: (w, p, t) => {
        place(w, -1 + t * .7, .6, 0); crawl(w.s, t, 16, .15);
        w.taps.children.forEach(r => { const q = (t * 1.5 + r.userData.i / 4) % 1; r.position.set(-2.2 + t * .7, .1, .6); r.rotation.x = Math.PI / 2; r.scale.setScalar(.5 + q * 1.5); });
        w.person.position.set(2.6, 0, -.4); w.person.rotation.set(0, -1.1, 0);
      },
    },
    {
      say: 'Shoes? It needs twelve pairs.',
      show: ['ground', 'room', 'sn', 'shoes'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.4, 2.6, 7.5], look: [-.6, 1, 0], fov: 46, to: { pos: [.3, 2.5, 6.8], look: [-.6, 1, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, .4, .6, -1.0); crawl(w.s, t, 4, .1);
        w.shoes.children.forEach(sh => { const i = sh.userData.i; const q = Math.min(1, Math.max(0, t * 3 - i * .1)); sh.visible = q > 0; sh.position.set(-2.4 + (i % 6) * .5, .1 + Math.floor(i / 6) * .22 + (1 - q) * 3, -.8 + (i % 2) * .3); sh.rotation.y = i; });
      },
    },
    {
      say: 'Dance contests? It wins every single one.',
      show: ['disco', 'sn', 'lights', 'trophy'], sky: '#1E1B3A', lightAt: [0, 5, 3], lightDist: 10,
      cam: { pos: [.8, 2.4, 7], look: [-1, 1.4, 0], fov: 46, to: { pos: [.7, 2.3, 6.3], look: [-1, 1.4, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, .2, 0, -.5 + .4 * Math.sin(t * 3)); crawl(w.s, t, 20, .4); w.sn.position.y = .15 * Math.abs(Math.sin(t * 8)); w.ballD.rotation.y = t;
        w.lights.children.forEach(l => { const a = t * 2 + l.userData.i; l.position.set(Math.cos(a) * 3 - 1, 3 + Math.sin(a * 1.3), Math.sin(a) * 1.5 - 1); });
        w.trophy.position.set(1.6, .2, .6); w.trophy.scale.setScalar(Math.min(1.3, t * .8));
      },
    },
    {
      say: 'And it still slithers anyway. Out of habit.',
      show: ['ground', 'room', 'sn'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.9, 1.8, 5.5], look: [0, .7, 0], fov: 46, to: { pos: [.8, 1.7, 5], look: [0, .7, 0], fov: 44 } },
      update: (w, p, t) => {
        w.sn.position.y = 0; place(w, -.2, -.6 + t * .2, -1.05); crawl(w.s, t, 0, .45); w.s.legs.forEach(l => { l.rotation.z = 1.4; });
        w.s.segs.forEach(seg => seg.position.y = .35);
      },
    },
    {
      say: 'A snake with legs: cute, great, or a nightmare? Comment below.',
      quiz: { q: 'A snake with legs would be…', options: ['Cute', 'Great', 'A nightmare'], answer: 'Snakes with legs are made up. Please do not buy them shoes.' },
      show: ['ground', 'room', 'sn'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 10,
      cam: { pos: [.6, .7, 5.5], look: [0, 2.2, 0], fov: 46, to: { pos: [-.8, .7, 5.5], look: [0, 2.2, 0] } },
      update: (w, p, t) => { place(w, -.2, -.4, -1.15); crawl(w.s, t, 6, .15); },
    },
  ],
};
