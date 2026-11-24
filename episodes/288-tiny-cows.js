// Narrative 17: "What Would Happen If… (season 7)". Animal-scale premise (270 tiny dogs, 276 tiny giraffes, 285 tiny lions).
// Hook: the premise as a question under 2 s; first frame shows a cow the size of a teacup standing on a kitchen table.

function cow(k, parent) {
  const { mat, ball, cyl, box, cone, group } = k;
  const wht = mat('#F5F5F5', { rough: .7 }), blk = mat('#1E1E1E'), pink = mat('#FFB6C8');
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(1, wht, [0, 1.3, 0], c.root); b.scale.set(1.15, .62, .55);
  for (const [x, y, z, r] of [[-.4, 1.5, .48, .28], [.45, 1.15, .45, .22], [-.15, 1.2, -.48, .25], [.55, 1.55, -.42, .2]]) { const sp = ball(r, blk, [x, y, z], c.root); sp.scale.z = .25; }
  for (const [x, z] of [[-.7, -.3], [-.7, .3], [.7, -.3], [.7, .3]]) cyl(.11, .09, .85, wht, [x, .42, z], c.root, 10);
  c.head = group([1.25, 1.7, 0], c.root); const hd = ball(.42, wht, [0, 0, 0], c.head); hd.scale.set(1.15, 1, .9); const sn = ball(.24, pink, [.42, -.12, 0], c.head); sn.scale.set(.8, .75, 1.1); for (const z of [-1, 1]) { ball(.07, mat('#111111'), [.25, .14, z * .27], c.head); cone(.05, .22, mat('#E8D8A0'), [0, .42, z * .2], c.head, 8); const ear = ball(.12, wht, [-.05, .18, z * .4], c.head); ear.scale.set(1, .5, 1.4); }
  c.udder = ball(.22, pink, [-.1, .72, 0], c.root);
  c.tail = cyl(.035, .035, .9, wht, [-1.1, 1.2, 0], c.root, 6); c.tail.rotation.z = -.3;
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.table = k.ground('#C8955A', 0);
  w.wall = group(); box(30, 14, .3, mat('#F4EEDC'), [0, 7, -3], w.wall);
  w.co = cow(k, k.scene); w.cr = w.co.root;
  w.cup = group(); cyl(.9, .7, 1.4, mat('#FFFFFF'), [0, .7, 0], w.cup, 18); const h = k.torus(.35, .1, mat('#FFFFFF'), [.95, .7, 0], w.cup); h.rotation.set(0, 0, 0);
  w.thimble = group(); cyl(.3, .25, .5, mat('#C9D1D9', { metal: .4 }), [0, .25, 0], w.thimble, 14); cyl(.27, .27, .02, mat('#FFFFFF'), [0, .48, 0], w.thimble, 14);
  w.drops = group(); for (let i = 0; i < 4; i++) { const d = ball(.05, mat('#FFFFFF'), [0, 0, 0], w.drops); d.userData.i = i; }
  w.grass = group(); for (let i = 0; i < 12; i++) { const g = cone(.08, .5, mat('#3FA34D'), [-.5 + (i % 4) * .3, .25, -.4 + Math.floor(i / 4) * .3], w.grass, 4); g.userData.i = i; } const pot = cyl(.8, .6, .6, mat('#B5651D'), [0, -.1, 0], w.grass, 16);
  w.sandwich = group(); box(3, .3, 2, mat('#E8C070'), [0, .15, 0], w.sandwich); box(3.1, .12, 2.1, mat('#5FBF5F'), [0, .36, 0], w.sandwich); box(3, .3, 2, mat('#E8C070'), [0, .6, 0], w.sandwich);
  w.hand = group(); const hm = mat('#F2C9A0'); ball(1.4, hm, [0, 0, 0], w.hand).scale.set(1.3, .5, 1); for (let i = 0; i < 4; i++) { const f = cyl(.25, .25, 1.6, hm, [-.75 + i * .5, .1, -1.6], w.hand, 8); f.rotation.x = Math.PI / 2; }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#333366'); box(.3, .05, .05, m, [0, .13, 0], z); box(.3, .05, .05, m, [0, -.13, 0], z); const d = box(.36, .05, .05, m, [0, 0, 0], z); d.rotation.z = .72; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  return w;
}

export default {
  id: '288',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY COWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF COWS', 'WERE TINY?'],
  title: 'What would happen if cows were tiny?',
  description: 'Milk comes by the thimble. A potted plant is a whole field. They hide in your sandwich. And they nap in the palm of your hand. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cow', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: cows this small are made up. Quiz fact: a dairy cow can drink about 100 litres of water a day (UK Agriculture and Horticulture Development Board).'],
  setup,
  scenes: [
    { say: 'What if cows were tiny?', show: ['table', 'wall', 'cr', 'cup'], sky: '#F4EEDC', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 2.6, 10], look: [-.2, 2.6, 0], fov: 48, to: { pos: [0, 2.6, 9.3], look: [-.2, 2.6, 0], fov: 46 } },
      update: (w, p, t) => { w.cr.position.set(-1.1, 0, .6); w.cr.rotation.y = -.8; w.co.tail.rotation.z = -.3 + .3 * Math.sin(t * 5); w.co.head.rotation.z = .1 * Math.sin(t * 3); w.cup.position.set(1.8, 0, -.6); w.cup.scale.setScalar(2); } },
    { say: 'Milk? One thimble at a time.', show: ['table', 'wall', 'cr', 'thimble', 'drops'], sky: '#F4EEDC', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1.6, 1.8, 7], look: [.2, 1.1, 0], fov: 48, to: { pos: [1.5, 1.8, 6.5], look: [.2, 1.1, 0], fov: 46 } },
      update: (w, p, t) => { w.cup.scale.setScalar(1); w.cr.position.set(0, 0, 0); w.cr.rotation.y = -.5; w.thimble.position.set(-.05, 0, .1); w.cr.scale.setScalar(1); w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 1.6 + i / 4) % 1; d.position.set(-.05, .55 - q * .1 + (1 - q) * .1, .1); d.visible = q < .9; }); w.co.head.rotation.z = .05 * Math.sin(t * 2); } },
    { say: 'Fields? Just a potted plant.', show: ['table', 'wall', 'cr', 'grass'], sky: '#F4EEDC', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.8, 2.6, 6.4], look: [0, 1, 0], fov: 46, to: { pos: [.7, 2.6, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.grass.position.set(0, .3, 0); w.grass.scale.setScalar(2.2); w.cr.position.set(0, .4, 0); w.cr.scale.setScalar(.35); w.cr.rotation.y = -.6 + t * .3; w.co.head.rotation.z = -.4 - .15 * Math.abs(Math.sin(t * 6)); } },
    { say: 'Lunch? Check your sandwich first.', label: '*MOO*', show: ['table', 'wall', 'cr', 'sandwich'], sky: '#F4EEDC', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.6, 2.4, 6.4], look: [0, 1, 0], fov: 46, to: { pos: [.5, 2.4, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.scale.setScalar(.4); w.sandwich.position.set(0, 0, 0); w.sandwich.children[2].position.y = .6 + (p > .4 ? .9 * Math.min(1, (p - .4) * 4) : 0); w.cr.position.set(.2, .45, .2); w.cr.rotation.set(0, -.6, 0); w.co.head.rotation.z = p > .4 ? .3 : 0; } },
    { say: 'And nap time? Right in your hand.', show: ['table', 'wall', 'cr', 'hand', 'zz'], sky: '#2B3A6B', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.6, 3.4, 6.4], look: [0, 1.4, 0], fov: 46, to: { pos: [.5, 3.4, 5.9], look: [0, 1.4, 0], fov: 44 } },
      update: (w, p, t) => { w.hand.position.set(0, .8, .4); w.cr.scale.setScalar(.5); w.cr.position.set(0, 1.2 - .5 * .4 + .02 * Math.sin(t * 2), .4); w.cr.rotation.set(0, -.4, 0); w.co.head.rotation.z = -.3; w.zz.children.forEach(c => { const q = (t * .5 + c.userData.i / 3) % 1; c.position.set(.7 + q * .5, 2.4 + q * 1, .6); c.scale.setScalar(.6 + q * .6); }); } },
    { say: 'Tiny cows: adorable, useful, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny cow?', options: ['Adorable', 'Useful', 'Best pet ever'], answer: 'Made up. A real dairy cow drinks about 100 litres of water a day.' },
      show: ['table', 'cr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.2, .6, 6.4], look: [.5, 2.4, 0], fov: 46, to: { pos: [0, .6, 6.4], look: [.5, 2.4, 0] } },
      update: (w, p, t) => { w.cr.scale.setScalar(1); w.cr.position.set(0, 0, 0); w.cr.rotation.set(0, -.8, 0); w.co.tail.rotation.z = -.3 + .3 * Math.sin(t * 5); } },
  ],
};
