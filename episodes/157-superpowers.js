// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; premise in the family of 080 (everyone could fly, ~890 views).
// A made-up comedy sketch: nobody has superpowers. Hook: the premise as a question under 2 s; first frame shows a caped person flying.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
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

function hero(k, parent, shirt, cape) {
  const p = person(k, parent, shirt);
  p.cape = k.box(1.4, 2.4, .08, k.mat(cape), [0, 1.6, -.85], p.root); p.cape.rotation.x = .25;
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.city = group();
  for (let i = 0; i < 6; i++) { const h = 6 + (i % 3) * 3; box(3, h, 3, mat(['#9AA3AE', '#B9C0C8', '#7D8B99'][i % 3]), [-10 + i * 4, h / 2, -10], w.city); }
  w.road = group(); box(60, .02, 5, mat('#3A3E44'), [0, .02, 1], w.road).castShadow = false;
  w.p = hero(k, k.scene, '#2F6FD6', '#E2453C'); w.pp = w.p.root;
  w.fliers = group(); for (let i = 0; i < 4; i++) { const h = hero(k, w.fliers, ['#22A06B', '#8B5CF6', '#F97316', '#EC4899'][i], ['#FFD21F', '#3B82F6', '#E2453C', '#22C55E'][i]); h.root.userData.i = i; }
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = car(k, w.cars); c.root.position.set(-7 + i * 4.8, 0, 1); c.root.rotation.y = 0; c.root.scale.setScalar(.8); }
  w.glasses = group([0, 0, 0]); for (const x of [-.25, .25]) { const g = k.torus(.15, .03, mat('#111111'), [x, 0, 0], w.glasses); g.rotation.x = Math.PI / 2; } box(.2, .03, .03, mat('#111111'), [0, 0, 0], w.glasses);
  w.bush = group([0, 0, 0]); for (let i = 0; i < 4; i++) ball(.9, mat('#2E8B4A'), [-1.2 + i * .8, .7, 0], w.bush);
  w.kid = person(k, k.scene, '#22A06B'); w.kd = w.kid.root;
  w.gran = person(k, k.scene, '#B05FA8'); w.gr = w.gran.root; ball(.55, mat('#DDDDDD'), [0, .45, -.2], w.gran.head);
  w.bigcar = car(k, k.scene); w.bc = w.bigcar.root;
  w.kitchen = group(); box(40, 20, .5, mat('#F6E3C2'), [0, 10, -3], w.kitchen); box(4, 2, 1.5, mat('#E8E2D6'), [0, 1, -1.6], w.kitchen);
  w.toaster = group([0, 2, -1.4]); box(1.2, .8, .7, mat('#C0C6CC', { metal: .5 }), [0, .4, 0], w.toaster);
  w.toast = [-.2, .2].map(x => box(.3, .5, .5, mat('#D9A55B'), [x, .6, 0], w.toaster));
  w.sparks = group(); for (let i = 0; i < 6; i++) { const s = ball(.06, mat('#FFD21F', { glow: 2 }), [0, 0, 0], w.sparks); s.userData.i = i; s.castShadow = false; }
  return w;
}

const flyPose = (h, x, y, z, t, i = 0) => { h.root.position.set(x, y + .2 * Math.sin(t * 3 + i), z); h.root.rotation.set(-1.2, Math.PI / 2, 0); h.cape.rotation.x = .25 + .2 * Math.sin(t * 12 + i); };

export default {
  id: '157',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SUPERPOWERS FOR EVERYONE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF EVERYONE', 'HAD POWERS?'],
  title: 'What would happen if everyone had superpowers?',
  description: 'Traffic? Fly over it. Hide and seek never ends. Grandma lifts the car to park. And your power is slightly faster toast. (Made-up superpowers.)',
  tags: ['whatif', 'funny', 'superpowers', 'superhero', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: superpowers are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if everyone had powers?',
      show: ['ground', 'city', 'pp'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 18,
      cam: { pos: [.6, 3.4, 11], look: [0, 6.9, 0], fov: 46, to: { pos: [.5, 3.4, 10.2], look: [0, 6.9, 0], fov: 44 } },
      update: (w, p, t) => { w.pp.position.set(-.4 + t * .4, 3 + .2 * Math.sin(t * 3), 0); w.pp.rotation.set(.35, .3, .1); w.p.cape.rotation.x = .5 + .25 * Math.sin(t * 12); w.p.mouth.scale.y = 1.4; },
    },
    {
      say: 'Traffic? Everyone just flies over it.',
      show: ['ground', 'city', 'road', 'cars', 'fliers'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 22,
      cam: { pos: [2, 5, 18], look: [0, 4, 0], fov: 50, to: { pos: [2, 5, 17], look: [0, 4, 0], fov: 48 } },
      update: (w, p, t) => { w.fliers.children.forEach(r => { const i = r.userData.i; r.position.set(-8 + ((t * 3 + i * 4) % 16), 5 + i * .8, -1 + i * .5); r.rotation.set(0, Math.PI / 2, -1.2); }); },
    },
    {
      say: 'Hide and seek? Someone went invisible. Forever.',
      show: ['ground', 'bush', 'kd', 'glasses'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [.6, 3, 10], look: [0, 2.4, 0], fov: 46, to: { pos: [.5, 3, 9.2], look: [0, 2.4, 0], fov: 44 } },
      update: (w, p, t) => {
        w.bush.position.set(1.4, 0, -1); w.kd.position.set(-2, 0, 0); w.kd.rotation.set(0, .8 + .5 * Math.sin(t * 2), 0); w.kid.mouth.scale.y = 1.6;
        w.glasses.position.set(1 + .3 * Math.sin(t * 1.5), 3.4 + .1 * Math.sin(t * 3), .8); w.glasses.rotation.y = -.4;
      },
    },
    {
      say: 'Parking? Grandma just lifts the car.',
      show: ['ground', 'city', 'road', 'gr', 'bc'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 18,
      cam: { pos: [1, 3.6, 12], look: [0, 3.6, 0], fov: 48, to: { pos: [.9, 3.6, 11.2], look: [0, 3.8, 0], fov: 46 } },
      update: (w, p, t) => {
        w.gr.position.set(0, 0, 1); w.gr.rotation.set(0, .2, 0); w.gran.mouth.scale.y = 1;
        const q = Math.min(1, t / 1.2); w.bc.position.set(-.2, 3.6 * q, .8); w.bc.rotation.set(0, -.3, .05 * Math.sin(t * 3)); w.bigcar.mouth.scale.y = 2;
      },
    },
    {
      say: 'And your power? Slightly faster toast.',
      show: ['kitchen', 'ground', 'pp', 'toaster', 'sparks'], sky: '#F6E3C2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 3, 8], look: [0, 2.8, 0], fov: 46, to: { pos: [.3, 3, 7.2], look: [0, 2.8, 0], fov: 44 } },
      update: (w, p, t) => {
        w.pp.position.set(-1.0, 0, .6); w.pp.rotation.set(0, .5, 0); w.p.cape.rotation.x = .25; w.p.mouth.scale.y = 1;
        const pop = t > 1.3; w.toast.forEach((tt, i) => { tt.position.y = pop ? .6 + Math.min(.9, (t - 1.3) * 4) : .6; });
        w.sparks.children.forEach(s => { const q = (t * 1.5 + s.userData.i / 6) % 1; s.visible = pop; s.position.set(Math.cos(s.userData.i) * .6 * q, 3.2 + q, -1.4 + Math.sin(s.userData.i) * .3); });
      },
    },
    {
      say: 'Superpowers for all: cool, great, or a disaster? Comment below.',
      quiz: { q: 'Superpowers for everyone would be…', options: ['Cool', 'Great', 'A disaster'], answer: 'Superpowers are made up. Toast speed stays normal.' },
      show: ['ground', 'city', 'pp'], sky: '#274B73', lightAt: [0, 8, 5], lightDist: 18,
      cam: { pos: [.6, 1.4, 9.5], look: [0, 5.6, 0], fov: 46, to: { pos: [-1, 1.4, 9.5], look: [0, 5.6, 0] } },
      update: (w, p, t) => { w.pp.position.set(0, 2.6 + .2 * Math.sin(t * 3), 0); w.pp.rotation.set(0, .2, 0); w.p.cape.rotation.x = .5 + .25 * Math.sin(t * 12); },
    },
  ],
};
