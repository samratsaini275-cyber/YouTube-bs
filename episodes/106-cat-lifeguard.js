// Narrative 7: "Animals at Work". A made-up comedy sketch: cats are not lifeguards; the swimmer is fine (just waving for a snack).
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the cat in sunglasses on a lifeguard chair.

function cat(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#F2994A', { rough: .8 }), light = mat('#FFE3C2', { rough: .8 });
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const b = ball(1, fur, [0, 1, 0], c.body); b.scale.set(1, 1.15, .9);
  ball(.6, light, [0, .9, .5], c.body).scale.set(1, 1.2, .6);
  c.head = group([0, 2.3, .1], c.body);
  ball(.75, fur, [0, 0, 0], c.head);
  for (const x of [-.45, .45]) { cone(.25, .5, fur, [x, .65, 0], c.head, 4); cone(.13, .3, mat('#FF9EC4'), [x, .62, .08], c.head, 4); }
  ball(.3, light, [0, -.2, .6], c.head).scale.set(1.3, .8, .7);
  ball(.08, mat('#FF6B8B'), [0, -.08, .78], c.head);
  c.shades = group([0, .12, .65], c.head);
  for (const x of [-.25, .25]) box(.38, .22, .06, mat('#111111', { rough: .1, metal: .4 }), [x, 0, 0], c.shades);
  box(.2, .05, .05, mat('#111111'), [0, .05, 0], c.shades);
  for (const s of [-1, 1]) for (const y of [-.22, -.3]) { const wh = box(.6, .015, .015, mat('#FFFFFF'), [s * .55, y, .6], c.head); wh.rotation.z = s * (y + .26) * 2; }
  c.whistle = group([0, 1.6, .75], c.body); cyl(.12, .12, .3, mat('#FFD21F'), [0, 0, 0], c.whistle, 10).rotation.x = Math.PI / 2;
  c.tail = group([0, .5, -.8], c.body); cyl(.12, .08, 2, fur, [0, 1, -.3], c.tail, 8).rotation.x = -.3;
  c.paws = [-1, 1].map(s => { const g = group([s * .55, 1.3, .5], c.body); cyl(.18, .16, .9, fur, [0, -.4, 0], g, 8); return g; });
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#F2D7A0', 0);
  w.sea = box(200, .3, 80, mat('#3FA7D6', { rough: .1, metal: .2 }), [0, .1, -48]); w.sea.castShadow = false;
  w.chair = group([0, 0, 0]);
  for (const x of [-1.3, 1.3]) for (const z of [-1, 1]) { const l = cyl(.15, .15, 6, mat('#FFFFFF'), [x, 3, z], w.chair, 8); l.rotation.z = -x * .05; }
  box(3, .3, 2.4, mat('#E2453C'), [0, 6, 0], w.chair); box(3, 2, .3, mat('#E2453C'), [0, 7, -1.1], w.chair);
  const um = cone(3, 1.2, mat('#FFD21F', { double: true }), [0, 10.5, 0], w.chair, 12); cyl(.07, .07, 3.4, mat('#FFFFFF'), [0, 8.6, 0], w.chair, 6);
  w.c = cat(k, k.scene); w.kitty = w.c.root;
  // the swimmer
  w.swim = group([0, 0, 0]);
  ball(.9, mat('#F2C9A0'), [0, 1.4, 0], w.swim); for (const x of [-.3, .3]) ball(.1, mat('#111111'), [x, 1.55, .82], w.swim);
  w.wave = group([.9, .9, 0], w.swim); cyl(.18, .18, 1.6, mat('#F2C9A0'), [0, .8, 0], w.wave, 8);
  k.torus(1.1, .35, mat('#FF8A1F'), [0, .55, 0], w.swim).rotation.x = Math.PI / 2;
  // fishing rod
  w.rod = group([0, 0, 0]);
  const pole = cyl(.06, .04, 6, mat('#5A3A1E'), [0, 3, 0], w.rod, 6); w.rod.rotation.x = -.9;
  w.line = cyl(.015, .015, 1, mat('#FFFFFF'), [0, 0, 0], k.scene, 4); w.line.geometry.translate(0, .5, 0); w.line.castShadow = false;
  // the cafe table
  w.table = group([0, 0, 60]);
  cyl(2.6, 2.6, .2, mat('#FFFFFF'), [0, 4, 0], w.table, 24); cyl(.2, .2, 4, mat('#9AA3AE'), [0, 2, 0], w.table, 8);
  w.cups = [];
  for (let i = 0; i < 3; i++) { const cp = group([-1.2 + i * 1.2, 4.1, .4], w.table); cyl(.35, .28, .9, mat(['#E2453C', '#2F6FD6', '#22C55E'][i]), [0, .45, 0], cp, 12); w.cups.push(cp); }
  return w;
}

function aimLine(w, from, to) { const d = to.clone().sub(from); w.line.position.copy(from); w.line.scale.set(1, d.length(), 1); w.line.quaternion.setFromUnitVectors(new from.constructor(0, 1, 0), d.normalize()); }

export default {
  id: '106',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT LIFEGUARD',
  year: 'ANIMALS AT WORK',
  hook: ['THIS CAT', 'BECAME A LIFEGUARD.'],
  title: 'This cat became a lifeguard',
  description: 'Great whistle. Great sunglasses. Will not touch the water under any circumstances. (A made-up cat and a made-up beach.)',
  tags: ['animalsatwork', 'funny', 'cat', 'lifeguard', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the cat lifeguard and his beach are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This cat became a lifeguard.',
      show: ['ground', 'sea', 'chair', 'kitty'], sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 14,
      cam: { pos: [4, 4, 14], look: [0, 11.8, 0], fov: 46, to: { pos: [3.7, 4, 13], look: [0, 11.7, 0], fov: 44 } },
      update: (w, p, t) => { w.kitty.position.set(0, 6.15, 0); w.kitty.rotation.set(0, .2, 0); w.c.head.rotation.set(0, .3 * Math.sin(t * 1.5), 0); w.c.tail.rotation.z = .3 * Math.sin(t * 3); },
    },
    {
      say: 'Someone waves for help. He will not touch the water.',
      show: ['ground', 'sea', 'chair', 'kitty', 'swim'], sky: '#9ED2F3', lightAt: [0, 7, -4], lightDist: 22,
      cam: { pos: [6, 9, 14], look: [-1, 5, -6], fov: 52, to: { pos: [5.6, 9, 13], look: [-1, 5, -6], fov: 50 } },
      update: (w, p, t) => {
        w.kitty.position.set(0, 6.15, 0); w.kitty.rotation.set(0, -.3, 0); w.c.head.rotation.set(0, .5 * Math.sin(t * 6), 0); w.c.paws[1].rotation.x = -1.2;
        w.swim.position.set(-3, -.2 + .15 * Math.sin(t * 3), -12); w.wave.rotation.z = .5 * Math.sin(t * 8);
      },
    },
    {
      say: 'So he rescues them with a fishing rod.',
      show: ['ground', 'sea', 'chair', 'kitty', 'swim', 'rod', 'line'], sky: '#9ED2F3', lightAt: [0, 7, -4], lightDist: 22,
      cam: { pos: [8, 8, 12], look: [-1, 4.5, -4], fov: 54, to: { pos: [7.6, 8, 11], look: [-1, 4.5, -4], fov: 52 } },
      update: (w, p, t) => {
        w.kitty.position.set(0, 6.15, 0); w.kitty.rotation.set(0, -.3, 0); w.c.head.rotation.set(0, 0, 0); w.c.paws[1].rotation.x = -.8;
        w.rod.position.set(.5, 7.2, .8); w.rod.rotation.set(-.9 - .2 * Math.sin(t * 2), -.3, 0);
        const f = Math.min(1, t / 2.2); w.swim.position.set(-3 + f * 2.4, -.2, -12 + f * 9); w.wave.rotation.z = 0;
        const tip = new w.rod.position.constructor(0, 6, 0); w.rod.localToWorld(tip); aimLine(w, tip, w.swim.position.clone().add(new tip.constructor(0, 1.2, 0)));
      },
    },
    {
      say: 'Then on his lunch break, he knocks every drink off the table.',
      show: ['ground', 'sea', 'table', 'kitty'], sky: '#FFD9A8', lightAt: [0, 5, 60], lightDist: 14,
      cam: { pos: [1.5, 6, 71], look: [.4, 5.6, 60], fov: 48, to: { pos: [1.3, 6, 70], look: [.4, 5.5, 60], fov: 46 } },
      update: (w, p, t) => {
        w.kitty.position.set(1.6, 4.1, 59.6); w.kitty.rotation.set(0, -.4, 0); w.c.head.rotation.set(0, 0, 0); w.c.paws[1].rotation.x = 0;
        const sw = Math.max(0, Math.sin(t * 4)); w.c.paws[0].rotation.set(-1.1, 0, -.8 * sw);
        w.cups.forEach((cp, i) => { const at = 1.4 + (2 - i) * .45, f = Math.max(0, t - at); cp.position.set(-1.2 + i * 1.2 - f * 3, 4.1 + Math.max(-4.1, 2 * f - 9 * f * f), .4); cp.rotation.z = f * 6; });
      },
    },
    {
      say: 'Swim at his beach: yes, no, or only in a boat? Comment below.',
      quiz: { q: 'Would you swim at the cat lifeguard\'s beach?', options: ['Yes', 'No', 'Only in a boat'], answer: 'It is a made-up beach. Bring a boat and some treats.' },
      show: ['ground', 'sea', 'chair', 'kitty'], sky: '#274B73', lightAt: [0, 7, 2], lightDist: 14,
      cam: { pos: [4, 3, 13], look: [0, 10.5, 0], fov: 46, to: { pos: [-4, 3, 13], look: [0, 10.5, 0] } },
      update: (w, p, t) => { w.c.paws.forEach(pw => pw.rotation.set(0, 0, 0)); w.kitty.position.set(0, 6.15, 0); w.kitty.rotation.set(0, .2, 0); w.c.head.rotation.set(0, .3 * Math.sin(t * 1.5), 0); w.c.tail.rotation.z = .3 * Math.sin(t * 3); },
    },
  ],
};
