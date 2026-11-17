// Narrative 5: "What Would Happen If…" (last episode). A made-up comedy sketch: pizza does not walk.
// Hook rule: the premise as a question under 2 s, first frame already showing a pizza slice strolling on little legs.

function slice(k, parent, top = 'pep') {
  const { mat, box, cyl, ball, cone, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 2.2, 0], s.root);
  const sh = new k.THREE.Shape(); sh.moveTo(0, -2.4); sh.lineTo(1.7, 1.6); sh.quadraticCurveTo(0, 2.3, -1.7, 1.6); sh.closePath();
  const geo = new k.THREE.ExtrudeGeometry(sh, { depth: .35, bevelEnabled: false }); geo.translate(0, 0, -.175);
  k.mesh(geo, mat('#F2C14E', { rough: .6 }), [0, 0, 0], s.body);
  const crust = cyl(.35, .35, 3.6, mat('#C9853E'), [0, 1.9, 0], s.body, 12); crust.rotation.z = Math.PI / 2;
  const tops = top === 'pine' ? [['#FFE45C', .3], ['#FF8FA3', .25]] : [['#C0392B', .32]];
  for (let i = 0; i < 5; i++) { const [c, r] = tops[i % tops.length]; const t = cyl(r, r, .06, mat(c), [((i * 7) % 5) * .4 - .8, -1 + (i % 3) * .9, .2], s.body, top === 'pine' && i % 2 === 0 ? 4 : 14); t.rotation.x = Math.PI / 2; }
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .5, .25], s.body); ball(.12, mat('#111111'), [x, .5, .45], s.body); }
  s.mouth = box(.5, .1, .05, mat('#5A1E1E'), [0, -.1, .25], s.body);
  s.legs = [-.4, .4].map(x => { const g = group([x, -2.3, 0], s.body); cyl(.1, .1, 1.2, mat('#2A2A2A'), [0, -.6, 0], g, 6); box(.4, .15, .55, mat('#E2453C'), [0, -1.25, .12], g); return g; });
  return s;
}
function walk(s, t, sp = 9) { s.legs.forEach((g, i) => { g.rotation.x = .7 * Math.sin(t * sp + i * Math.PI); }); s.body.position.y = 2.2 + .15 * Math.abs(Math.sin(t * sp)); s.body.rotation.z = .06 * Math.sin(t * sp); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.street = group();
  box(120, .05, 5, mat('#D9D2C4'), [0, .03, 3], w.street).castShadow = false;
  w.house = group([6, 0, -6], w.street);
  box(10, 8, 6, mat('#F4F1E8'), [0, 4, 0], w.house);
  const r = cone(8, 4, mat('#8B3A2E'), [0, 10, 0], w.house, 4); r.rotation.y = Math.PI / 4;
  w.door = group([-1.2, 0, 3.05], w.house); box(2.4, 4.4, .2, mat('#2F6FD6'), [1.2, 2.2, 0], w.door);
  box(5, .05, 1.6, mat('#C9B79C'), [6, .05, -1.5], w.street).castShadow = false;
  w.p1 = slice(k, k.scene); w.pizza = w.p1.root;
  w.pine = slice(k, k.scene, 'pine'); w.pineR = w.pine.root;
  w.box = group([0, 0, 0]);
  box(5, .5, 5, mat('#E8D7B0'), [0, .25, 0], w.box);
  w.lid = group([0, .5, -2.5], w.box); box(5, .1, 5, mat('#E8D7B0'), [0, 0, 2.5], w.lid);
  // the last slice and a reaching hand
  w.table = group([0, 0, 60]);
  box(12, .4, 7, mat('#B07A4A'), [0, 3.4, 0], w.table);
  for (const x of [-5.5, 5.5]) for (const z of [-3, 3]) box(.4, 3.4, .4, mat('#8B5A2B'), [x, 1.7, z], w.table);
  cyl(3, 3, .1, mat('#FFFFFF'), [-2, 3.65, 0], w.table, 32);
  w.hand = group([0, 0, 0]);
  const palm = ball(.9, mat('#F2C9A0'), [0, 0, 0], w.hand); palm.scale.set(1.3, .5, 1);
  for (let i = 0; i < 4; i++) cyl(.17, .17, 1, mat('#F2C9A0'), [.9, 0, -.6 + i * .4], w.hand, 8).rotation.z = Math.PI / 2;
  cyl(1, .9, 6, mat('#2F6FD6'), [-3.5, 0, 0], w.hand, 12).rotation.z = Math.PI / 2;
  return w;
}

export default {
  id: '082',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WALKING PIZZA',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PIZZA', 'COULD WALK?'],
  title: 'What would happen if pizza could walk?',
  description: 'Free delivery. Very polite. Absolutely refuses to be the last slice. (A made-up walking pizza.)',
  tags: ['whatif', 'funny', 'pizza', 'food', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: walking pizza is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if pizza could walk?',
      show: ['ground', 'street', 'pizza'], sky: '#9ED2F3', lightAt: [0, 3, 3], lightDist: 16,
      cam: { pos: [5, 3, 17], look: [0, 6.2, 3], fov: 46, to: { pos: [4.5, 3, 15.5], look: [0, 6.2, 3], fov: 44 } },
      update: (w, p, t) => { w.pizza.position.set(-2 + t * 1.5, 0, 3); w.pizza.rotation.y = Math.PI / 2 - .5; walk(w.p1, t); },
    },
    {
      say: 'Delivery? It walks itself to your door.',
      show: ['ground', 'street', 'pizza'], sky: '#A7D8F5', lightAt: [4, 3, -2], lightDist: 20,
      cam: { pos: [14, 6, 14], look: [4, 3.5, -2], fov: 50, to: { pos: [12.5, 6, 12], look: [4, 3.5, -2], fov: 48 } },
      update: (w, p, t, k) => {
        const f = Math.min(1, t / 1.8); w.pizza.position.set(-2 + f * 5.5, 0, 3 - f * 5.5); w.pizza.rotation.y = f < 1 ? Math.PI * .75 : Math.PI; walk(w.p1, f < 1 ? t : 0);
        w.door.rotation.y = t > 1.8 ? -Math.min(1.4, (t - 1.8) * 3) : 0;
      },
    },
    {
      say: 'Pineapple ones? Nobody opens the door.',
      show: ['ground', 'street', 'pineR'], sky: '#9ED2F3', lightAt: [4, 3, -2], lightDist: 20,
      cam: { pos: [12, 5, 12], look: [4, 3.5, -2.5], fov: 48, to: { pos: [11, 5, 10.5], look: [4, 3.5, -2.5], fov: 46 } },
      update: (w, p, t) => { w.door.rotation.y = 0; w.pineR.position.set(3.6, 0, -2); w.pineR.rotation.y = .7; walk(w.pine, 0); w.pine.body.rotation.z = .1 * Math.sin(t * 4); w.pine.legs[0].rotation.x = .8 * Math.max(0, Math.sin(t * 6)); },
    },
    {
      say: 'And the last slice? It makes a run for it.',
      show: ['ground', 'table', 'pizza', 'hand'], sky: '#FFE3C2', lightAt: [0, 4, 60], lightDist: 16,
      cam: { pos: [3, 9, 72], look: [0, 4.5, 60], fov: 48, to: { pos: [2.5, 8.5, 70], look: [0, 4.5, 60], fov: 46 } },
      update: (w, p, t, k) => {
        const run = Math.max(0, t - .7);
        w.pizza.position.set(-2 + run * 2.5, 3.6, 60); w.pizza.rotation.y = Math.PI / 2; walk(w.p1, t, run > 0 ? 16 : 0); w.p1.body.rotation.x = 0;
        w.hand.position.set(-7 + Math.min(t, .7) * 6, 4.4, 60);
      },
    },
    {
      say: 'Walking pizza: catch it, adopt it, or eat it? Comment below.',
      quiz: { q: 'What would you do with a walking pizza?', options: ['Catch it', 'Adopt it', 'Eat it'], answer: 'It is a made-up pizza, so eating it is fine. It cannot outrun you.' },
      show: ['ground', 'street', 'pizza'], sky: '#274B73', lightAt: [0, 3, 3], lightDist: 16,
      cam: { pos: [8, 2, 12], look: [0, 7, 3], fov: 46, to: { pos: [-8, 2, 12], look: [0, 7, 3] } },
      update: (w, p, t) => { w.pizza.position.set(0, 0, 3); w.pizza.rotation.y = .3; walk(w.p1, t); },
    },
  ],
};
