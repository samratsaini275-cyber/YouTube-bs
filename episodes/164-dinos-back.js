// Narrative 10: "What Would Happen If… (season 2)" finale. Builds on the top video 081 (dinosaurs were pets, ~1.6K views) with the same T-rex.
// A made-up comedy sketch: dinosaurs are extinct. Hook: the premise as a question under 2 s; first frame shows the T-rex in a city street.

function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}

function car(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(4.4, 1.1, 2.2, mat('#E2453C', { rough: .3 }), [0, 1.0, 0], c.body);
  box(2.4, 1.0, 2.0, mat('#E2453C', { rough: .3 }), [-.3, 2.0, 0], c.body);
  box(2.2, .8, 2.05, mat('#9FD3EE', { rough: .1 }), [-.3, 2.0, 0], c.body);
  c.wheels = [];
  for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], c.body, 16); wh.rotation.x = Math.PI / 2; c.wheels.push(wh); }
  c.eyes = [-.6, .6].map(z => { const g = group([2.2, 1.25, z], c.body); ball(.33, mat('#FFFDE8', { glow: .6 }), [0, 0, 0], g); ball(.16, mat('#111111'), [.25, 0, 0], g); return g; });
  c.mouth = box(.1, .14, 1.0, mat('#3A3A3A'), [2.22, .75, 0], c.body);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.city = group(); box(80, .03, 12, mat('#3A3E44'), [0, .02, 3], w.city).castShadow = false;
  for (let i = 0; i < 8; i++) { const h = 14 + (i % 3) * 6; box(7, h, 6, mat(['#9AA3AE', '#B9C0C8', '#7D8B99'][i % 3]), [-28 + i * 8, h / 2, -10], w.city); }
  w.r = rex(k, k.scene); w.dino = w.r.root;
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = car(k, w.cars); c.root.position.set(-9 + i * 6, 0, 6); c.root.scale.setScalar(1.3); c.mouth.scale.y = 2; c.eyes.forEach(e => e.scale.set(1.3, 1.3, 1.3)); }
  w.cup = group([0, 0, 0]); cyl(1.6, 1.2, 3.2, mat('#FFFFFF'), [0, 1.6, 0], w.cup, 18); cyl(1.65, 1.65, .5, mat('#8B5A2B'), [0, 2.4, 0], w.cup, 18); cyl(1.62, 1.62, .1, mat('#5A3A1A'), [0, 3.15, 0], w.cup, 18);
  w.steam = group(); for (let i = 0; i < 4; i++) { const s = ball(.5, mat('#EEEEEE'), [0, 0, 0], w.steam); s.userData.i = i; s.castShadow = false; }
  w.crowd = group(); for (let i = 0; i < 5; i++) { const g = group([-6 + i * 3, 0, 8], w.crowd); cyl(.7, .75, 2.4, mat(['#2F6FD6', '#E2453C', '#22A06B', '#8B5CF6', '#F97316'][i]), [0, 1.2, 0], g, 12); ball(.65, mat('#F2C9A0'), [0, 3, 0], g); const ph = box(.4, .7, .08, mat('#1E2227'), [.4, 3.4, -.5], g); g.userData.flash = ball(.15, mat('#FFFFFF', { glow: 3 }), [.4, 3.5, -.6], g); g.userData.i = i; }
  w.pigeons = group(); for (let i = 0; i < 6; i++) { const p = group([0, 0, 0], w.pigeons); const b = ball(.45, mat('#8A93A0'), [0, .45, 0], p); b.scale.set(1.3, 1, 1); ball(.28, mat('#6A7380'), [.5, .8, 0], p); const bk = cone(.08, .25, mat('#FFB020'), [.8, .78, 0], p, 6); bk.rotation.z = -Math.PI / 2; p.userData.i = i; }
  return w;
}

const still = (w, x, z, ry) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); w.r.body.rotation.set(0, 0, 0); w.r.neck.rotation.set(0, 0, 0); };

export default {
  id: '164',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DINOSAURS ARE BACK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'CAME BACK?'],
  title: 'What would happen if dinosaurs came back?',
  description: 'Traffic jams? It steps over them. Coffee comes in a bucket. Everyone wants a selfie. And the pigeons finally have a boss. (A made-up dinosaur comeback.)',
  tags: ['whatif', 'funny', 'dinosaur', 'trex', 'city', 'shorts'],
  sources: [
    'Comedy sketch: dinosaurs are extinct; this comeback is made up.',
    'Non-bird dinosaurs died out about 66 million years ago (Smithsonian National Museum of Natural History).',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinosaurs came back?',
      show: ['ground', 'city', 'dino'], sky: '#9ED2F3', lightAt: [0, 12, 8], lightDist: 34,
      cam: { pos: [3, 5, 36], look: [1.5, 12, 0], fov: 50, to: { pos: [3, 5, 33], look: [1.5, 12, 0], fov: 48 } },
      update: (w, p, t) => { still(w, -2 + t * 1.2, 0, -.6); stomp(w.r, t, 4); },
    },
    {
      say: 'Traffic jams? It just steps over them.',
      show: ['ground', 'city', 'dino', 'cars'], sky: '#9ED2F3', lightAt: [0, 12, 8], lightDist: 34,
      cam: { pos: [8, 8, 34], look: [0, 7, 3], fov: 52, to: { pos: [7.5, 8, 32], look: [0, 7, 3], fov: 50 } },
      update: (w, p, t) => { still(w, -10 + t * 5, 3, 0); stomp(w.r, t, 6); w.r.legs.forEach((l, i) => { l.rotation.z = .5 * Math.sin(t * 6 + i * Math.PI); }); w.r.body.position.y = 1.2 + .4 * Math.abs(Math.sin(t * 6)); },
    },
    {
      say: 'Morning coffee? It comes in a bucket.',
      show: ['ground', 'city', 'dino', 'cup', 'steam'], sky: '#9ED2F3', lightAt: [0, 12, 8], lightDist: 30,
      cam: { pos: [14, 9, 20], look: [3, 8, 0], fov: 48, to: { pos: [13, 9, 18.5], look: [3, 8, 0], fov: 46 } },
      update: (w, p, t) => {
        still(w, 0, 0, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.z = -.3;
        const hp = new w.dino.position.constructor(); w.r.arms[1].getWorldPosition(hp); w.cup.position.set(hp.x + 1.2, hp.y - 1.6, hp.z + .4);
        w.steam.children.forEach(s => { const q = (t * .6 + s.userData.i / 4) % 1; s.position.set(w.cup.position.x + Math.sin(q * 6) * .4, w.cup.position.y + 3.4 + q * 2.5, w.cup.position.z); s.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'Selfies? Everyone wants one.',
      show: ['ground', 'city', 'dino', 'crowd'], sky: '#9ED2F3', lightAt: [0, 12, 8], lightDist: 34,
      cam: { pos: [0, 6, 34], look: [0, 8, 2], fov: 52, to: { pos: [0, 6, 32], look: [0, 8, 2], fov: 50 } },
      update: (w, p, t) => {
        w.r.body.position.y = 0; still(w, -1, -1, -.5); stomp(w.r, t, 4, true); w.r.jaw.rotation.z = -.5;
        w.crowd.children.forEach(g => { g.rotation.set(0, Math.PI, 0); g.userData.flash.visible = Math.floor(t * 6 + g.userData.i * 2) % 5 === 0; });
      },
    },
    {
      say: 'And the pigeons? They finally have a boss.',
      show: ['ground', 'city', 'dino', 'pigeons'], sky: '#9ED2F3', lightAt: [0, 12, 8], lightDist: 34,
      cam: { pos: [6, 6, 34], look: [0, 7, 2], fov: 52, to: { pos: [5.5, 6, 32], look: [0, 7, 2], fov: 50 } },
      update: (w, p, t) => {
        const x = -6 + t * 2.4; still(w, x, 0, 0); stomp(w.r, t, 4);
        w.pigeons.children.forEach(pg => { const i = pg.userData.i; pg.position.set(x - 5 - i * 1.6, .1 * Math.abs(Math.sin(t * 10 + i)), 4 + (i % 2) * 1.5); pg.rotation.set(0, 0, 0); pg.scale.setScalar(1.6); });
      },
    },
    {
      say: 'Dinosaurs back: cool, great, or a disaster? Comment below.',
      quiz: { q: 'Should dinosaurs come back?', options: ['Cool', 'Great', 'A disaster'], answer: 'This comeback is made up. Dinosaurs died out about 66 million years ago.' },
      show: ['ground', 'city', 'dino'], sky: '#274B73', lightAt: [0, 12, 8], lightDist: 34,
      cam: { pos: [14, 3, 32], look: [0, 16, 0], fov: 46, to: { pos: [-14, 3, 32], look: [0, 16, 0] } },
      update: (w, p, t) => { still(w, -3, 0, -.4); stomp(w.r, t, 4, true); },
    },
  ],
};
