// Narrative 11: "What Would Happen If… (season 3, with Gary)". Animal + flying premise (080 everyone could fly 1.1K; animals are the top topic).
// Hook: the premise as a question under 2 s; first frame shows a penguin flapping its flippers high over icebergs.

function penguin(k, parent) {
  const { mat, box, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(1, mat('#1C1C24', { rough: .5 }), [0, 1.3, 0], p.body); b.scale.set(.85, 1.25, .8);
  const bl = ball(.8, mat('#FFFFFF'), [0, 1.15, .32], p.body); bl.scale.set(.75, 1.1, .6);
  p.head = group([0, 2.55, 0], p.body); ball(.62, mat('#1C1C24', { rough: .5 }), [0, 0, 0], p.head);
  for (const x of [-.24, .24]) { ball(.15, mat('#FFFFFF'), [x, .1, .5], p.head); ball(.08, mat('#111111'), [x, .1, .62], p.head); }
  const bk = cone(.16, .45, mat('#FF9F1C'), [0, -.12, .7], p.head, 10); bk.rotation.x = Math.PI / 2;
  p.flips = [-1, 1].map(s => { const g = group([s * .8, 1.9, 0], p.body); const f = box(.18, 1.3, .55, mat('#1C1C24'), [s * .1, -.6, 0], g); return g; });
  for (const x of [-.35, .35]) box(.4, .12, .6, mat('#FF9F1C'), [x, .06, .2], p.body);
  p.glasses = group([0, .12, .63], p.head); for (const x of [-.24, .24]) box(.32, .2, .05, mat('#111111', { rough: .2 }), [x, 0, 0], p.glasses); box(.2, .05, .05, mat('#111111'), [0, .04, 0], p.glasses);
  return p;
}
const flap = (p, t, sp = 14, a = 1.1) => p.flips.forEach((g, i) => g.rotation.z = (i ? -1 : 1) * (a * (.5 + .5 * Math.sin(t * sp))));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.sea = k.ground('#2A6FB0', 0);
  w.ice = group(); for (let i = 0; i < 6; i++) { const c = cone(3 + (i % 3), 3 + (i % 2) * 2, mat('#EAF6FF', { rough: .6 }), [-20 + i * 8, 1.2, -10 - (i % 2) * 6], w.ice, 6); c.rotation.y = i; }
  w.floe = group(); box(30, .8, 14, mat('#F2FAFF', { rough: .7 }), [0, .2, 0], w.floe);
  w.p = penguin(k, k.scene); w.pg = w.p.root; w.p.glasses.visible = false;
  w.beach = group(); box(40, .6, 20, mat('#F2D49B', { rough: 1 }), [0, .1, 0], w.beach);
  for (const x of [-5, 6]) { cyl(.3, .4, 6, mat('#8B6B43'), [x, 3, -4], w.beach, 8); for (let j = 0; j < 5; j++) { const l = box(3, .1, .9, mat('#2E9E4A'), [x + Math.cos(j * 1.26) * 1.3, 6, -4 + Math.sin(j * 1.26) * 1.3], w.beach); l.rotation.y = -j * 1.26; l.rotation.z = -.3; } }
  w.towel = box(2, .05, 3.2, mat('#E2453C'), [1.5, .45, 1], w.beach);
  w.fish = group(); const fb = ball(.35, mat('#9AD1FF', { glow: .3 }), [0, 0, 0], w.fish); fb.scale.set(1.4, .7, .5); const ft = cone(.25, .4, mat('#9AD1FF'), [-.55, 0, 0], w.fish, 4); ft.rotation.z = Math.PI / 2;
  w.splash = group(); for (let i = 0; i < 12; i++) { const s = ball(.3, mat('#CFE9FF', { glow: .4 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.plane = group(); const fu = cyl(1.2, 1.2, 14, mat('#FFFFFF'), [0, 0, 0], w.plane, 18); fu.rotation.z = Math.PI / 2;
  const nose = cone(1.2, 2.5, mat('#FFFFFF'), [8.2, 0, 0], w.plane, 18); nose.rotation.z = -Math.PI / 2;
  box(3, .2, 16, mat('#DDE3EA'), [0, -.3, 0], w.plane); box(2, 3, .2, mat('#3B82F6'), [-6.4, 1.8, 0], w.plane);
  for (let i = 0; i < 8; i++) for (const z of [-1.18, 1.18]) box(.5, .45, .05, mat('#1E3A5F'), [-4 + i * 1.3, .45, z], w.plane);
  w.snow = group(); for (let i = 0; i < 10; i++) { const s = ball(.35, mat('#FFFFFF'), [0, 0, 0], w.snow); s.userData.i = i; s.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.pg.position.set(x, y, z); w.pg.rotation.set(0, ry, 0); w.p.body.rotation.set(0, 0, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '173',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLYING PENGUINS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PENGUINS', 'COULD FLY?'],
  title: 'What would happen if penguins could fly?',
  description: 'Winter holidays somewhere warm. Fishing becomes a dive-bomb. Planes get company. And landing is still face first. (A comedy what-if. Real penguins "fly" underwater.)',
  tags: ['whatif', 'penguins', 'funny', 'animals', 'flying', 'shorts'],
  sources: [
    'Quiz fact: penguins cannot fly in air; their wings are stiff flippers used to swim (general zoology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if penguins could fly?',
      show: ['sea', 'ice', 'pg'], sky: '#BFE3FF', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [2, 6, 10], look: [0, 8.4, 0], fov: 46, to: { pos: [1.8, 6, 9.2], look: [0, 8.4, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -.5 + t * .4, 5 + .3 * Math.sin(t * 3), 0, .3, t); w.p.body.rotation.z = .1 * Math.sin(t * 2); flap(w.p, t); },
    },
    {
      say: 'Winter? They fly somewhere warm.',
      show: ['sea', 'beach', 'pg'], sky: '#7FD3FF', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [3, 3, 9], look: [.5, 3.3, 0], fov: 46, to: { pos: [2.7, 3, 8.2], look: [.5, 3.3, 0], fov: 44 } },
      update: (w, p, t) => { w.p.glasses.visible = true; pose(w, 1.5, .45, 1, -.2, t); w.p.body.rotation.x = -.15; flap(w.p, t, 2, .4); w.p.head.rotation.y = .3 * Math.sin(t * 1.5); },
    },
    {
      say: 'Fishing? Now it is a dive-bomb.',
      show: ['sea', 'ice', 'pg', 'splash', 'fish'], sky: '#BFE3FF', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [3, 4, 14], look: [0, 5, 0], fov: 50, to: { pos: [3, 4, 13], look: [0, 4.6, 0], fov: 48 } },
      shake: (t) => (t > 1 && t < 1.4) ? .12 : 0,
      update: (w, p, t) => {
        w.p.glasses.visible = false; const q = Math.min(1, t); pose(w, -3 + q * 3, 9 - q * 9, 0, 0, t); w.p.body.rotation.x = Math.PI * .5 * q; flap(w.p, t, 3, .2);
        w.pg.visible = t < 1.05 || t > 1.5; if (t > 1.5) { pose(w, .5, -.5 + Math.min(1.5, (t - 1.5) * 4), 0, .2, t); w.p.body.rotation.x = 0; }
        w.fish.visible = t > 1.5; w.fish.position.set(.5, 2.5 + Math.min(1.5, (t - 1.5) * 4) - 1, .75); w.fish.rotation.set(0, 0, .3 * Math.sin(t * 20));
        w.splash.visible = t > 1; w.splash.children.forEach(s => { const i = s.userData.i, a = i / 12 * Math.PI * 2, r = Math.min(1, (t - 1) * 1.5); s.position.set(Math.cos(a) * r * 2.5, Math.sin(r * Math.PI) * 3 * (.6 + (i % 3) * .2), Math.sin(a) * r * 2); });
      },
    },
    {
      say: 'Airports? Pilots are very confused.',
      show: ['sea', 'pg', 'plane'], sky: '#9ED2F3', lightAt: [0, 20, 0], lightDist: 22,
      cam: { pos: [4, 22, 17], look: [0, 22.8, 0], fov: 50, to: { pos: [4, 22, 16], look: [0, 22.8, 0], fov: 48 } },
      update: (w, p, t) => {
        w.pg.visible = true; w.plane.position.set(-6 + t * 2, 20, -5); w.plane.rotation.set(0, 0, 0);
        pose(w, -2 + t * 2.1, 22 + .3 * Math.sin(t * 4), 3, Math.PI / 2 - .6, t); flap(w.p, t, 18); w.p.head.rotation.y = -.6;
      },
    },
    {
      say: 'But landing? Still face first.',
      show: ['sea', 'ice', 'floe', 'pg', 'snow'], sky: '#BFE3FF', lightAt: [0, 2, 0], lightDist: 18,
      cam: { pos: [3, 3.5, 12], look: [0, 3, 0], fov: 50, to: { pos: [3, 3.5, 11], look: [0, 3, 0], fov: 48 } },
      shake: (t) => (t > .8 && t < 1.1) ? .1 : 0,
      update: (w, p, t) => {
        const q = Math.min(1, t / .8), land = t > .8; const x = land ? -1 + Math.min(1.5, (t - .8) * 3) : -6 + q * 5;
        pose(w, x, land ? .9 : 6 - q * 5, 0, Math.PI / 2, t); w.p.body.rotation.x = 0; w.p.body.rotation.z = land ? -1.4 : -.6; flap(w.p, t, land ? 0 : 16, land ? .1 : 1);
        w.snow.visible = land; w.snow.children.forEach(s => { const i = s.userData.i, r = Math.min(1, (t - .8) * 1.5); s.position.set(x + 1.3 + (i % 5) * .4 * r, .7 + Math.sin(r * Math.PI) * (1 + (i % 3) * .5), (i - 5) * .25 * r); });
      },
    },
    {
      say: 'Flying penguins: cool, chaotic, or adorable? Comment below.',
      quiz: { q: 'Should penguins be able to fly?', options: ['Cool', 'Chaotic', 'Adorable'], answer: 'Real penguins cannot fly in the air. They "fly" underwater with their flippers.' },
      show: ['sea', 'ice', 'floe', 'pg'], sky: '#274B73', lightAt: [0, 2, 0], lightDist: 18,
      cam: { pos: [4, 3, 8], look: [0, 3.2, 0], fov: 44, to: { pos: [-4, 3, 8], look: [0, 3.2, 0] } },
      update: (w, p, t) => { pose(w, 0, .6, 0, 0, t); flap(w.p, t, 6, .5); },
    },
  ],
};
