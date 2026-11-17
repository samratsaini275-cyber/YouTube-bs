// Narrative 5: "What Would Happen If…". A made-up comedy sketch: people cannot fly.
// Hook rule: the premise as a question under 2 s, first frame already showing a person flying over a town, arms out.

function flyer(k, parent, color) {
  const { mat, box, cyl, ball, cone, group } = k;
  const f = { root: group([0, 0, 0], parent) };
  f.body = group([0, 0, 0], f.root); f.body.rotation.z = -Math.PI / 2 + .15;
  cyl(.8, .9, 3.2, mat(color), [0, 0, 0], f.body, 14);
  ball(.85, mat('#F2C9A0'), [0, 2.3, 0], f.body);
  for (const x of [-.3, .3]) ball(.12, mat('#111111'), [x, 2.45, .78], f.body);
  f.arms = [-1, 1].map(s => { const g = group([0, 1.2, s * .8], f.body); const a = cyl(.22, .22, 2, mat(color), [0, 1, 0], g, 8); g.rotation.x = s * -.25; return g; });
  f.cape = box(1.6, 2.6, .08, mat('#E2453C', { double: true }), [0, -.6, -.9], f.body); f.cape.castShadow = false;
  return f;
}
function flap(f, t, ph = 0) { f.root.position.y += .3 * Math.sin(t * 3 + ph); f.cape.rotation.x = .3 + .2 * Math.sin(t * 10 + ph); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  const cols = ['#E8C9A0', '#C9D6E8', '#E8B4A0', '#D6E8C4', '#E6C6E6'];
  for (let i = 0; i < 14; i++) { const h = 8 + (i % 4) * 4; const x = -40 + (i % 7) * 13, z = -10 - Math.floor(i / 7) * 14; box(9, h, 8, mat(cols[i % 5]), [x, h / 2, z], w.town); for (let r = 0; r < Math.floor(h / 4); r++) box(6, 1.2, .2, mat('#7FB2D9'), [x, 2 + r * 3.6, z + 4.05], w.town).castShadow = false; }
  w.f1 = flyer(k, k.scene, '#2F6FD6'); w.hero = w.f1.root;
  // the lonely stairs
  w.stairs = group([0, 0, 60]);
  for (let i = 0; i < 10; i++) box(6, .6, 1.2, mat('#C9CED6'), [0, .3 + i * .6, -i * 1.2], w.stairs);
  w.sface = group([0, 3.5, 1], w.stairs);
  for (const x of [-.8, .8]) ball(.25, mat('#111111'), [x, 0, 0], w.sface);
  const frown = k.torus(.6, .08, mat('#111111'), [0, -1, 0], w.sface); frown.rotation.x = 0; frown.rotation.z = Math.PI; frown.scale.y = .6;
  w.cob = group([0, 0, 0], w.stairs);
  for (let i = 0; i < 4; i++) { const c = box(.05, 1.5, .05, mat('#FFFFFF', { opacity: .6 }), [-2.6 + i * 1.7, 5, -6], w.cob); c.rotation.z = .5 * (i - 1.5); c.castShadow = false; }
  // angry birds (well, annoyed pigeons)
  w.birds = group([0, 0, 0]);
  w.birdList = [];
  for (let i = 0; i < 5; i++) { const b = group([0, 0, 0], w.birds); const bd = ball(.8, mat('#8A93A6'), [0, 0, 0], b); bd.scale.set(1.4, .9, .9); ball(.5, mat('#8A93A6'), [1, .4, 0], b); cone(.18, .5, mat('#FFB020'), [1.55, .35, 0], b, 8).rotation.z = -Math.PI / 2; for (const z of [-.2, .2]) ball(.08, mat('#111111'), [1.3, .55, z], b); const brow = box(.4, .06, .5, mat('#111111'), [1.25, .75, 0], b); brow.rotation.z = -.4; b.wings = [-1, 1].map(s => { const g = group([0, .3, s * .6], b); box(1.2, .08, 1.2, mat('#5B6478'), [0, 0, s * .6], g); return g; }); w.birdList.push(b); }
  // sky traffic jam
  w.jam = group([0, 0, 120]);
  w.jammers = [];
  for (let i = 0; i < 12; i++) { const f = flyer(k, w.jam, ['#E2453C', '#2F6FD6', '#22C55E', '#FF8A1F', '#8B5CF6', '#FFD21F'][i % 6]); f.root.position.set(-12 + (i % 4) * 7, 12 + Math.floor(i / 4) * 4, -2 + (i % 3) * 2); f.home = f.root.position.clone(); w.jammers.push(f); }
  w.light = group([12, 18, 0], w.jam);
  box(1.4, 4, 1.2, mat('#2A2A2A'), [0, 0, 0], w.light);
  w.red = ball(.45, mat('#E0161E', { glow: 3 }), [0, 1.2, .62], w.light); ball(.45, mat('#3A2A00'), [0, 0, .62], w.light); ball(.45, mat('#0A2A10'), [0, -1.2, .62], w.light);
  cyl(.15, .15, 18, mat('#5A6070'), [12, 8, 0], w.jam, 8);
  return w;
}

export default {
  id: '080',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'EVERYONE CAN FLY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF EVERYONE', 'COULD FLY?'],
  title: 'What would happen if everyone could fly?',
  description: 'No more stairs. Very annoyed birds. And somehow, still stuck in traffic. (A made-up world where everybody flies.)',
  tags: ['whatif', 'funny', 'flying', 'superpower', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: people flying is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if everyone could fly?',
      show: ['ground', 'town', 'hero'], sky: '#9ED2F3', lightAt: [0, 10, 0], lightDist: 30,
      cam: { pos: [6, 10, 28], look: [0, 19, 0], fov: 50, to: { pos: [5, 10, 25], look: [0, 19, 0], fov: 48 } },
      update: (w, p, t) => { w.hero.position.set(-2.5 + t * 2, 13, 2); w.hero.rotation.y = 0; flap(w.f1, t); },
    },
    {
      say: 'Stairs? Nobody uses them.',
      show: ['ground', 'stairs'], sky: '#BFD8EE', lightAt: [0, 3, 57], lightDist: 16,
      cam: { pos: [2.5, 5.5, 72], look: [0, 3.5, 59], fov: 48, to: { pos: [2, 5.5, 70], look: [0, 3.5, 59], fov: 46 } },
      update: (w, p, t) => { w.cob.rotation.z = .05 * Math.sin(t * 2); },
    },
    {
      say: 'Birds are not happy about it.',
      show: ['ground', 'town', 'hero', 'birds'], sky: '#9ED2F3', lightAt: [0, 14, 0], lightDist: 25,
      cam: { pos: [4, 16, 18], look: [0, 15, 0], fov: 48, to: { pos: [3.5, 16, 16], look: [0, 15, 0], fov: 46 } },
      update: (w, p, t) => {
        w.hero.position.set(-1, 14, 0); w.hero.rotation.y = 0; flap(w.f1, t);
        w.birdList.forEach((b, i) => { const a = t * 1.5 + i * 1.26; b.position.set(Math.cos(a) * 5, 15 + Math.sin(a * 2) * 1.5, Math.sin(a) * 3); b.rotation.y = -a - Math.PI / 2; b.wings.forEach((g, s) => { g.rotation.x = (s ? -1 : 1) * .6 * Math.sin(t * 20 + i); }); });
      },
    },
    {
      say: 'And rush hour? Still a traffic jam. In the sky.',
      show: ['ground', 'town', 'jam'], sky: '#FFD9A8', lightAt: [0, 14, 120], lightDist: 30,
      cam: { pos: [4, 14, 152], look: [2.5, 16, 120], fov: 54, to: { pos: [4, 14, 148], look: [2.5, 16, 120], fov: 52 } },
      update: (w, p, t) => { w.jammers.forEach((f, i) => { f.root.position.copy(f.home); f.root.position.x += .3 * Math.sin(t * 2 + i); flap(f, t, i); }); w.red.material.emissiveIntensity = (t % 1) < .6 ? 3 : 1; },
    },
    {
      say: 'Flying to work: yes, no, or only with snacks? Comment below.',
      quiz: { q: 'Would you fly to work?', options: ['Yes', 'No', 'Only with snacks'], answer: 'It is made up, so the bus it is. Bring snacks anyway.' },
      show: ['ground', 'town', 'hero'], sky: '#274B73', lightAt: [0, 10, 0], lightDist: 30,
      cam: { pos: [12, 6, 24], look: [0, 20, 0], fov: 46, to: { pos: [-12, 6, 24], look: [0, 20, 0] } },
      update: (w, p, t) => { w.hero.position.set(0, 14, 2); w.hero.rotation.y = .4; flap(w.f1, t); },
    },
  ],
};
