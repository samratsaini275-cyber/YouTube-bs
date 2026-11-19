// Narrative 7: "Animals at Work". A made-up comedy sketch: chickens are not crossing guards; the cars stop gently.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the chicken in a yellow vest holding a stop sign.

function chicken(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const b = ball(1, mat('#FFFFFF', { rough: .7 }), [0, 1.9, 0], c.body); b.scale.set(1.2, 1, 1);
  const vest = cyl(1.03, 1.03, .9, mat('#D7FF3A', { glow: .25 }), [0, 1.9, 0], c.body, 20); vest.scale.set(1.2, 1, 1);
  box(.12, .9, 2.1, mat('#C0C0C8', { metal: .6 }), [.6, 1.9, 0], c.body);
  c.head = group([.85, 3.1, 0], c.body);
  ball(.5, mat('#FFFFFF', { rough: .7 }), [0, 0, 0], c.head);
  for (let i = 0; i < 3; i++) ball(.15, mat('#E2453C'), [-.15 + i * .15, .5, 0], c.head);
  cone(.13, .35, mat('#FFB020'), [.55, -.02, 0], c.head, 6).rotation.z = -Math.PI / 2;
  ball(.12, mat('#E2453C'), [.42, -.25, 0], c.head).scale.set(.7, 1.3, .7);
  for (const z of [-.3, .3]) ball(.08, mat('#111111'), [.32, .12, z], c.head);
  c.legs = [-1, 1].map(s => { const g = group([0, .95, s * .35], c.root); cyl(.06, .06, .9, mat('#FFB020'), [0, -.45, 0], g, 6); box(.5, .06, .3, mat('#FFB020'), [.15, -.9, 0], g); return g; });
  c.wing = group([0, 2.1, .95], c.body); const wg = ball(.55, mat('#F4F1E8'), [0, 0, 0], c.wing); wg.scale.set(1.3, .7, .25);
  c.sign = group([.4, 0, .4], c.wing); c.sign.rotation.y = Math.PI / 2;
  cyl(.05, .05, 2.2, mat('#9AA3AE'), [0, 1.1, 0], c.sign, 6);
  const oct = cyl(.75, .75, .08, mat('#E0161E'), [0, 2.4, 0], c.sign, 8); oct.rotation.x = Math.PI / 2;
  box(.9, .2, .1, mat('#FFFFFF'), [0, 2.4, .06], c.sign);
  return c;
}
function strut(c, t, sp = 10) { c.legs.forEach((g, i) => { g.rotation.z = .5 * Math.sin(t * sp + i * Math.PI); }); c.head.position.x = .85 + .12 * Math.sin(t * sp * 2); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group();
  box(200, .1, 12, mat('#4A4F5A'), [0, .05, 0], w.road).castShadow = false;
  for (let i = 0; i < 8; i++) box(1, .02, 10, mat('#FFFFFF'), [-3.5 + i * 1, .11, 0], w.road).castShadow = false;
  for (let i = 0; i < 6; i++) { const h = 6 + (i % 3) * 2; box(8, h, 6, mat(['#E8C9A0', '#C9D6E8', '#E8B4A0'][i % 3]), [-30 + i * 12, h / 2, -14], w.road); }
  w.c = chicken(k, k.scene); w.hen = w.c.root;
  w.cars = [];
  for (let i = 0; i < 3; i++) { const cg = group([0, 0, 0]); box(6, 1.6, 3, mat(['#2F6FD6', '#E2453C', '#22C55E'][i], { metal: .3, rough: .35 }), [0, 1.3, 0], cg); box(3.2, 1.2, 2.6, mat('#BFE6FF', { opacity: .55 }), [-.3, 2.6, 0], cg); for (const x of [-2, 2]) for (const z of [-1.5, 1.5]) { const wh = cyl(.7, .7, .4, mat('#1E2430'), [x, .7, z], cg, 16); wh.rotation.x = Math.PI / 2; } w.cars.push(cg); }
  w.carsG = group(); w.cars.forEach(c => w.carsG.add(c));
  w.q = group();
  const qm = group([0, 0, 0], w.q);
  const arc = k.mesh(new k.THREE.TorusGeometry(.45, .13, 10, 24, Math.PI * 1.4), mat('#FFD21F', { glow: 1 }), [0, .55, 0], qm); arc.rotation.z = -Math.PI * .45; arc.castShadow = false;
  cyl(.13, .13, .4, mat('#FFD21F', { glow: 1 }), [0, -.05, 0], qm, 10);
  ball(.15, mat('#FFD21F', { glow: 1 }), [0, -.55, 0], qm);
  return w;
}

export default {
  id: '110',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CHICKEN CROSSING GUARD',
  year: 'ANIMALS AT WORK',
  hook: ['THIS CHICKEN', 'GUARDS CROSSINGS.'],
  title: 'This chicken guards crossings',
  description: 'Every car stops for him. Then he crosses the road. Again. And again. Nobody knows why. (A made-up chicken.)',
  tags: ['animalsatwork', 'funny', 'chicken', 'crossingguard', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the chicken crossing guard is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This chicken guards crossings.',
      show: ['ground', 'road', 'hen'], sky: '#9ED2F3', lightAt: [0, 4, 4], lightDist: 14,
      cam: { pos: [3, 2.8, 17], look: [0, 5.8, 4], fov: 46, to: { pos: [2.8, 2.8, 16], look: [0, 5.7, 4], fov: 44 } },
      update: (w, p, t) => { w.hen.position.set(0, 0, 4); w.hen.rotation.y = -Math.PI / 2 + .4; strut(w.c, 0); w.c.wing.rotation.x = -.2 * Math.sin(t * 3); },
    },
    {
      say: 'Every car stops for him.',
      show: ['ground', 'road', 'hen', 'carsG'], sky: '#9ED2F3', lightAt: [-4, 4, 0], lightDist: 22,
      cam: { pos: [2.5, 7, 19], look: [-2.8, 2.4, 0], fov: 54, to: { pos: [2, 7, 18], look: [-2.8, 2.4, 0], fov: 52 } },
      update: (w, p, t) => {
        w.hen.position.set(0, 0, -1); w.hen.rotation.y = 0; strut(w.c, 0); w.c.wing.rotation.x = -.6;
        w.cars.forEach((cg, i) => { const stop = -8 - i * 7.5, x = Math.min(stop, -30 - i * 7.5 + t * 22); cg.position.set(x, 0, -3); cg.rotation.z = x === stop && t < 1.6 ? -.04 : 0; });
      },
    },
    {
      say: 'Then he crosses the road. And back. And again.',
      show: ['ground', 'road', 'hen', 'carsG'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [6, 8, 16], look: [-2, 2, 0], fov: 52, to: { pos: [5.5, 8, 15], look: [-2, 2, 0], fov: 50 } },
      update: (w, p, t) => {
        w.cars.forEach((cg, i) => { cg.position.set(-8 - i * 7.5, 0, -3); cg.rotation.z = 0; });
        const ph = (t * .7) % 2, z = ph < 1 ? -5 + ph * 10 : 5 - (ph - 1) * 10; w.hen.position.set(0, 0, z); w.hen.rotation.y = ph < 1 ? -Math.PI / 2 : Math.PI / 2; strut(w.c, t, 14); w.c.wing.rotation.x = 0;
      },
    },
    {
      say: 'Why? Nobody knows. Not even him.',
      show: ['ground', 'road', 'hen', 'q'], sky: '#FFD9A8', lightAt: [0, 4, 3], lightDist: 12,
      cam: { pos: [3, 3.5, 11], look: [0, 4.2, 3], fov: 44, to: { pos: [2.8, 3.5, 10], look: [0, 4.2, 3], fov: 42 } },
      update: (w, p, t) => { w.hen.position.set(0, 0, 3); w.hen.rotation.y = -Math.PI / 2 + .3; strut(w.c, 0); w.c.head.rotation.set(0, .5 * Math.sin(t * 2), .3 * Math.sin(t * 5)); w.q.position.set(.4, 4.8 + .1 * Math.sin(t * 3), 3.4); w.q.rotation.y = .3 * Math.sin(t * 2); },
    },
    {
      say: 'Why did he cross: work, snacks, or attention? Comment below.',
      quiz: { q: 'Why did the chicken cross the road?', options: ['Work', 'Snacks', 'Attention'], answer: 'He is a made-up chicken. Probably all three.' },
      show: ['ground', 'road', 'hen'], sky: '#274B73', lightAt: [0, 4, 4], lightDist: 14,
      cam: { pos: [3, 1.5, 13], look: [0, 6.4, 4], fov: 46, to: { pos: [-3, 1.5, 13], look: [0, 6.4, 4] } },
      update: (w, p, t) => { w.c.head.rotation.set(0, 0, 0); w.hen.position.set(0, 0, 4); w.hen.rotation.y = -Math.PI / 2 + .4; strut(w.c, 0); w.c.wing.rotation.x = -.2 * Math.sin(t * 3); },
    },
  ],
};
