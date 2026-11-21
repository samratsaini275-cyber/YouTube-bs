// Narrative 10: "What Would Happen If… (season 2)". Follow-up to the channel's top video, 081 (dinosaurs were pets, ~1.5K views): same T. rex model.
// A made-up comedy sketch: T. rexes are extinct. Hook: the premise as a question under 2 s; first frame shows the T. rex over the garden fence.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.house = group([-9, 0, -6]); box(10, 7, 7, mat('#F2D9B8'), [0, 3.5, 0], w.house);
  const roof = cone(7.5, 4, mat('#B3262E'), [0, 9, 0], w.house, 4); roof.rotation.y = Math.PI / 4;
  box(1.8, 3.4, .2, mat('#8B5A2B'), [3, 1.7, 3.55], w.house); w.bell = ball(.22, mat('#FFD21F', { glow: 1.2 }), [4.4, 2.6, 3.6], w.house);
  w.fence = group(); for (let i = 0; i < 14; i++) { const f = box(.8, 2.4, .2, mat('#FFFFFF'), [-12 + i * 1.8, 1.2, 4], w.fence); f.userData.i = i; }
  w.grass = group(); for (let i = 0; i < 40; i++) { const g = cone(.15, .8, mat('#3E9B4F'), [-6 + (i % 10) * 1.4, .4, 7 + Math.floor(i / 10) * 1.2], w.grass, 4); g.userData.i = i; }
  w.grill = group([4, 0, 8]); cyl(.9, .7, .8, mat('#222222'), [0, 2.2, 0], w.grill, 16); for (const x of [-.5, .5]) cyl(.07, .07, 2, mat('#444444'), [x, 1, 0], w.grill, 6);
  for (let i = 0; i < 3; i++) box(.6, .2, .3, mat('#8B3A2B'), [-.4 + i * .4, 2.7, 0], w.grill);
  w.smoke = group(); for (let i = 0; i < 5; i++) { const s = ball(.4, mat('#DDDDDD'), [0, 0, 0], w.smoke); s.userData.i = i; s.castShadow = false; }
  w.r = rex(k, k.scene); w.dino = w.r.root;
  w.person = group([0, 0, 0]); cyl(.8, .9, 3.2, mat('#2F6FD6'), [0, 1.6, 0], w.person, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.person);
  for (const x of [-.3, .3]) ball(.15, mat('#111111'), [x, 4.05, .78], w.person);
  return w;
}

const still = (w, x, z, ry, sp = 4) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); w.r.body.rotation.set(0, 0, 0); w.r.neck.rotation.set(0, 0, 0); };

export default {
  id: '153',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE T. REX NEXT DOOR',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T. REX', 'LIVED NEXT DOOR?'],
  title: 'What would happen if a T. rex lived next door?',
  description: 'The lawn gets mowed in one stomp. The barbecue disappears, grill and all. Fences are optional. And the doorbell stays out of reach. (A made-up neighbour.)',
  tags: ['whatif', 'funny', 'dinosaur', 'trex', 'neighbour', 'shorts'],
  sources: [
    'Comedy sketch: T. rexes are extinct; this neighbour is made up.',
    'Non-bird dinosaurs, T. rex included, died out about 66 million years ago (Smithsonian National Museum of Natural History, "Tyrannosaurus rex" and K-Pg extinction pages).',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T. rex lived next door?',
      show: ['ground', 'house', 'fence', 'dino'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [3, 5, 36], look: [1.5, 12, 0], fov: 50, to: { pos: [3, 5, 33], look: [1.5, 12, 0], fov: 48 } },
      update: (w, p, t) => { still(w, -1, -2, -.7); stomp(w.r, t, 4, true); w.r.neck.rotation.z = -.15 + .08 * Math.sin(t * 2); w.r.jaw.rotation.z = -.15 - .15 * Math.abs(Math.sin(t * 3)); },
    },
    {
      say: 'Mowing the lawn? One stomp. Done.',
      show: ['ground', 'fence', 'grass', 'dino'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [7, 8, 32], look: [2.5, 7, 6], fov: 52, to: { pos: [6.5, 8, 30], look: [2.5, 7, 6], fov: 50 } },
      shake: (t) => t > 1.1 && t < 1.5 ? .25 : 0,
      update: (w, p, t) => {
        still(w, -1, 2, .3); stomp(w.r, t, 4, true); const up = t < 1.1; w.r.legs[1].rotation.z = up ? -.6 * Math.min(1, t / .8) : 0; w.r.body.position.y = up ? .6 * Math.min(1, t / .8) : 0;
        w.grass.children.forEach(g => { g.scale.y = up ? 1 : .08; });
      },
    },
    {
      say: 'Barbecue? It eats the grill too.',
      show: ['ground', 'fence', 'grill', 'smoke', 'dino'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [10, 7, 26], look: [3, 6, 4], fov: 52, to: { pos: [9.5, 7, 24], look: [3, 6, 4], fov: 50 } },
      update: (w, p, t) => {
        still(w, -3, 3, .1); stomp(w.r, t, 4, true); const bite = t > 1.2; w.r.neck.rotation.z = bite ? -.9 : -.3 * Math.min(1, t); w.r.jaw.rotation.z = bite ? -.05 : -.45;
        w.grill.visible = t < 1.35; w.smoke.children.forEach(s => { const q = (t * .6 + s.userData.i / 5) % 1; s.position.set(4 + Math.sin(s.userData.i) * .4, 3 + q * 3, 8); s.scale.setScalar(.5 + q); });
        w.smoke.visible = t < 1.35;
      },
    },
    {
      say: 'Fences? What fences.',
      show: ['ground', 'house', 'fence', 'dino'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [0, 7, 38], look: [0, 6, 2], fov: 52, to: { pos: [0, 7, 35], look: [0, 6, 2], fov: 50 } },
      shake: (t) => t > .8 ? .1 : 0,
      update: (w, p, t) => {
        const x = -10 + t * 7; still(w, x, 4, 0); stomp(w.r, t, 8);
        w.fence.children.forEach(f => { const fx = -12 + f.userData.i * 1.8; const hit = fx < x + 4; const q = hit ? Math.min(1.5, (x + 4 - fx) * .25) : 0; f.position.set(fx + q * 3, 1.2 + q * 4 - q * q * 2, 4 + q * 4); f.rotation.set(q * 3, q * 2, q * f.userData.i); });
      },
    },
    {
      say: 'But it still cannot reach the doorbell.',
      show: ['ground', 'house', 'dino'], sky: '#9ED2F3', lightAt: [-9, 10, 6], lightDist: 30,
      cam: { pos: [12, 9, 32], look: [-6, 8, 0], fov: 50, to: { pos: [11.5, 9, 30], look: [-6, 8, 0], fov: 48 } },
      update: (w, p, t) => {
        w.fence.children.forEach(f => { const fx = -12 + f.userData.i * 1.8; f.position.set(fx, 1.2, 4); f.rotation.set(0, 0, 0); });
        still(w, -10.2, 1.6, -.6); stomp(w.r, t, 4, true); w.r.neck.rotation.z = -.5; w.r.body.rotation.z = -.15;
        w.r.arms.forEach((a, i) => { a.rotation.z = .35 * Math.sin(t * 14 + i * Math.PI) - .3; });
      },
    },
    {
      say: 'A T. rex neighbour: cool, loud, or a bit scary? Comment below.',
      quiz: { q: 'Would you want a T. rex next door?', options: ['Cool', 'Too loud', 'A bit scary'], answer: 'This neighbour is made up. T. rexes died out about 66 million years ago.' },
      show: ['ground', 'house', 'fence', 'dino'], sky: '#274B73', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [14, 3, 32], look: [0, 16, 0], fov: 46, to: { pos: [-14, 3, 32], look: [0, 16, 0] } },
      update: (w, p, t) => { still(w, -3, 0, -.4); stomp(w.r, t, 4, true); },
    },
  ],
};
