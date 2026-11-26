// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: the cat's food bowl panics.
// Hook: the rule under 2 s; first frame shows a food bowl with a face and a cat staring into it.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);


function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#E2D3B8', 0);
  w.wall = group(); box(40, 16, .3, mat('#F2C9D8'), [0, 8, -4], w.wall);
  w.bowl = group(); cyl(1.1, .8, .7, mat('#3B6FD6'), [0, .35, 0], w.bowl, 24); w.food = group([0, .55, 0], w.bowl); for (let i = 0; i < 14; i++) { const a = i * 2.4, r = .25 + (i % 4) * .17; ball(.14, mat('#A0673A'), [Math.cos(a) * r, (i % 3) * .05, Math.sin(a) * r], w.food); }
  w.bf = face(k, w.bowl, [0, .35, 1.0], .42);
  w.fish = group(); const fb = ball(.18, mat('#E2453C'), [0, 0, 0], w.fish); fb.scale.set(1.6, .8, .6); w.fish2 = group(); const fb2 = ball(.18, mat('#3FA34D'), [0, 0, 0], w.fish2); fb2.scale.set(1.6, .8, .6);
  w.clock = group(); const cf = cyl(.6, .6, .1, mat('#FFFFFF'), [0, 0, 0], w.clock, 20); cf.rotation.x = Math.PI / 2; w.hand = group([0, 0, .07], w.clock); box(.05, .45, .03, mat('#E2453C'), [0, .2, 0], w.hand);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '420',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FOOD BOWL TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'FOOD BOWLS TALK'],
  title: 'In this town, cat food bowls can talk',
  description: 'Half full? It shouts empty. Wrong flavour? It says sorry. Dinner time? It counts down. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking food bowls are made up. Quiz fact: cats are obligate carnivores and need taurine, an amino acid found almost only in animal tissue that cats cannot readily make themselves (Cat Care Society, "Why Cats Need to Eat Meat").'],
  setup,
  scenes: [
    { say: 'In this town, food bowls talk.', show: ['floor', 'wall', 'bowl', 'cr'], sky: '#F2C9D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.6, .9, 6.5], look: [.6, .62, 0], fov: 50, to: { pos: [.6, .9, 6], look: [.6, .62, 0], fov: 48 } },
      update: (w, p, t) => { w.fish.visible = false; w.fish2.visible = false; w.clock.visible = false; w.bowl.position.set(.05, 0, .6); talk(w.bf, t); brow(w.bf, -.2); ctAt(w, 1.75, 0, -.3, Math.PI + .5, .42); w.c.head.rotation.z = -.15; } },
    { say: 'Half full? It shouts empty.', label: 'EMPTY!', show: ['floor', 'wall', 'bowl', 'cr'], sky: '#F2C9D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.5, 2.2, 5.6], look: [.4, .12, 0], fov: 50, to: { pos: [.5, 2.2, 5.2], look: [.4, .12, 0], fov: 48 } },
      update: (w, p, t) => { w.bowl.position.set(0, 0, .4); w.food.children.forEach((b, i) => b.visible = i % 2 === 0 || i > 9); talk(w.bf, t); brow(w.bf, .5); w.bf.scale.setScalar(.42 * (1 + .1 * Math.sin(t * 20))); ctAt(w, 1.5, 0, -.4, Math.PI + .6, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.6); } },
    { say: 'Wrong flavour? It says sorry.', label: 'SORRY', show: ['floor', 'wall', 'bowl', 'cr', 'fish', 'fish2'], sky: '#F2C9D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.6, .9, 6.5], look: [.6, .62, 0], fov: 50, to: { pos: [.6, .9, 6], look: [.6, .62, 0], fov: 48 } },
      update: (w, p, t) => { w.bf.scale.setScalar(.42); w.bowl.position.set(.05, 0, .6); w.food.visible = false; const swap = p > .5; w.fish.position.set(.05, swap ? .55 + (p - .5) * 3 : .65, .6); w.fish.rotation.z = swap ? (p - .5) * 6 : 0; w.fish2.position.set(.05, swap ? Math.max(.65, 2 - (p - .5) * 5) : 3, .6); talk(w.bf, t); brow(w.bf, .3); w.bf.mouth.rotation.z = -.2; ctAt(w, 1.75, 0, -.3, Math.PI + .5, .42); w.c.head.rotation.y = swap ? 0 : .5; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : (swap ? 1 : .4)); } },
    { say: 'Dinner time? It counts down.', label: '3, 2, 1', show: ['floor', 'wall', 'bowl', 'cr', 'clock'], sky: '#F2C9D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.6, .9, 6.5], look: [.6, .62, 0], fov: 50, to: { pos: [.6, .9, 6], look: [.6, .62, 0], fov: 48 } },
      update: (w, p, t) => { w.fish.visible = false; w.fish2.visible = false; w.bf.mouth.rotation.z = 0; w.food.visible = true; w.food.children.forEach(b => b.visible = true); w.bowl.position.set(.05, 0, .6); w.clock.position.set(-.6, 1.9, -1); w.hand.rotation.z = -t * 3; talk(w.bf, t); brow(w.bf, -.2); ctAt(w, 1.75, .1 * Math.abs(Math.sin(t * 8)), -.3, Math.PI + .5, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.2 : 1.6); } },
    { say: 'Talking food bowl: helpful, funny, or way too dramatic? Comment below.',
      quiz: { q: 'The talking food bowl is…', options: ['Helpful', 'Funny', 'Way too dramatic'], answer: 'Made up. Fun fact: cats must eat meat to get a nutrient called taurine.' },
      show: ['floor', 'bowl'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 2, 4.6], look: [0, .6, 0], fov: 50, to: { pos: [-1.2, 2, 4.6], look: [0, .6, 0] } },
      update: (w, p, t) => { w.clock.visible = false; w.cr.visible = false; w.wall.visible = false; w.bowl.position.set(0, 0, 0); talk(w.bf, t, Math.sin(t * 2) > 0); brow(w.bf, .2); } },
  ],
};
