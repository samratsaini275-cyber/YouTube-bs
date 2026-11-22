// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Giant pet (167 cats, 186 dogs, 195 frogs).
// Hook: the premise as a question under 2 s; first frame shows a house-sized golden hamster on a street, cheeks puffed.

function hamster(k, parent) {
  const { mat, cyl, ball, box, group } = k;
  const fur = mat('#E8A85A', { rough: .8 }), cream = mat('#FFF1D6', { rough: .8 });
  const h = { root: group([0, 0, 0], parent) };
  const b = ball(1.3, fur, [0, 1.2, 0], h.root); b.scale.set(1.25, 1, 1.05);
  ball(1, cream, [.5, 1, 0], h.root).scale.set(.9, .8, .9);
  h.head = group([1.1, 1.7, 0], h.root); ball(.85, fur, [0, 0, 0], h.head);
  h.cheeks = [-1, 1].map(s => { const c = ball(.45, cream, [.35, -.25, s * .55], h.head); return c; });
  for (const z of [-.3, .3]) { ball(.13, mat('#111111', { rough: .2 }), [.7, .2, z], h.head); ball(.04, mat('#FFFFFF', { glow: .6 }), [.8, .25, z], h.head); }
  ball(.1, mat('#E88BA2'), [.85, 0, 0], h.head);
  for (const z of [-.5, .5]) { const e = ball(.25, mat('#E89A9A'), [-.15, .7, z], h.head); e.scale.set(.6, 1, 1); }
  h.paws = [-1, 1].map(s => ball(.2, mat('#F2C9A0'), [1.4, .9, s * .4], h.root));
  for (const x of [-.6, .6]) for (const z of [-.6, .6]) ball(.25, mat('#F2C9A0'), [x, .2, z], h.root);
  return h;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 12, mat('#555555', { rough: 1 }), [0, .02, 3], w.road);
  w.houses = group(); for (let i = 0; i < 6; i++) { const x = -26 + i * 10; box(7, 6, 6, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9', '#FFE3A3', '#E8D7F0'][i]), [x, 3, -10], w.houses); const r = cone(5.4, 3, mat('#B3262E'), [x, 7.5, -10], w.houses, 4); r.rotation.y = Math.PI / 4; }
  w.h = hamster(k, k.scene); w.hm = w.h.root; w.hm.scale.setScalar(3.6);
  w.wheel = group(); const wr = k.torus(9, .5, mat('#9AA5B1', { rough: .3 }), [0, 0, 0], w.wheel); wr.rotation.x = 0; for (let i = 0; i < 12; i++) { const sp = cyl(.15, .15, 18, mat('#9AA5B1'), [0, 0, 0], w.wheel, 6); sp.rotation.z = i * Math.PI / 12; }
  w.stand = group(); for (const x of [-4, 4]) { const l = cyl(.4, .4, 12, mat('#666666'), [x, 5, 0], w.stand, 8); l.rotation.z = x > 0 ? -.35 : .35; }
  w.trolley = group(); box(3, 2, 2, mat('#C9CED6', { rough: .2 }), [0, 2, 0], w.trolley); for (const x of [-1.2, 1.2]) for (const z of [-.8, .8]) ball(.3, mat('#222222'), [x, .3, z], w.trolley);
  w.hball = ball(6, mat('#CFE9FF', { rough: .05 }), [0, 0, 0]); w.hball.material.transparent = true; w.hball.material.opacity = .35;
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(1.2, .25, .2, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.hm.position.set(x, y, z); w.hm.rotation.set(0, ry, 0); w.h.head.rotation.set(0, 0, 0); w.h.cheeks.forEach(c => c.scale.setScalar(1)); w.h.paws.forEach(p => p.position.y = .9); };

export default {
  id: '198',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT HAMSTERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HAMSTERS', 'WERE GIANT?'],
  title: 'What would happen if hamsters were giant?',
  description: 'The hamster wheel is the size of a Ferris wheel. Cheek pouches fit a shopping trolley. The hamster ball rolls down the street. And naps still last all day. (A comedy what-if.)',
  tags: ['whatif', 'hamsters', 'funny', 'giant', 'pets', 'shorts'],
  sources: [
    'Quiz fact: hamsters carry food in stretchy cheek pouches (general zoology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if hamsters were giant?',
      show: ['ground', 'road', 'houses', 'hm'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 24,
      cam: { pos: [4, 4, 32], look: [0, 9.4, 0], fov: 46, to: { pos: [3.6, 4, 30], look: [0, 9.4, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -1, 0, 1, -1.2, t); w.h.head.rotation.z = .08 * Math.sin(t * 3); w.h.paws.forEach((p, i) => p.position.y = .9 + .1 * Math.sin(t * 8 + i)); },
    },
    {
      say: 'The wheel? Size of a Ferris wheel.',
      show: ['ground', 'houses', 'hm', 'wheel', 'stand'], sky: '#9ED2F3', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [6, 9, 36], look: [0, 10, 0], fov: 50, to: { pos: [5.5, 9, 34], look: [0, 10, 0], fov: 48 } },
      update: (w, p, t) => { w.wheel.position.set(0, 10, 0); w.wheel.rotation.z = -t * 1.2; w.stand.position.set(0, 0, -1.5); pose(w, 0, 1.6 + .3 * Math.abs(Math.sin(t * 10)), .5, 0, t); w.hm.scale.setScalar(2.6); },
    },
    {
      say: 'Cheek pouches? A whole shopping trolley.',
      show: ['ground', 'road', 'houses', 'hm', 'trolley'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 24,
      cam: { pos: [6, 5, 30], look: [1, 8.4, 0], fov: 48, to: { pos: [5.5, 5, 28], look: [1, 8.4, 0], fov: 44 } },
      update: (w, p, t) => {
        w.hm.scale.setScalar(3.6); pose(w, -2, 0, 1, -1.0, t); const q = Math.min(1, Math.max(0, (t - .5) * 1.5));
        w.trolley.position.set(6 - q * 4, q * 5, 4 - q * 1); w.trolley.scale.setScalar(1 - q * .9); w.trolley.visible = q < .98;
        w.h.cheeks.forEach(c => c.scale.setScalar(1 + q * .5));
      },
    },
    {
      say: 'The hamster ball? Rolls right down the street.',
      show: ['ground', 'road', 'houses', 'hm', 'hball'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 26,
      cam: { pos: [-4, 6, 34], look: [0, 6, 0], fov: 50, to: { pos: [2, 6, 34], look: [6, 6, 0], fov: 50 } },
      update: (w, p, t) => { const x = -8 + t * 6; w.hball.position.set(x, 6, 3); w.hball.rotation.z = -t * 2; w.hm.scale.setScalar(2.4); pose(w, x, 1.2 + .3 * Math.abs(Math.sin(t * 10)), 3, 0, t); w.hm.rotation.z = .1 * Math.sin(t * 10); },
    },
    {
      say: 'But nap time? Still all day long.',
      show: ['ground', 'road', 'houses', 'hm', 'zz'], sky: '#26355C', lightAt: [0, 4, 0], lightDist: 24,
      cam: { pos: [4, 6, 30], look: [0, 5.4, 0], fov: 48, to: { pos: [3.6, 6, 28], look: [0, 5.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.hm.scale.setScalar(3.6); pose(w, 0, 0, 1, -1.0, t); w.hm.rotation.z = -.2; w.h.head.rotation.z = -.4; const br = 1 + .03 * Math.sin(t * 2); w.hm.scale.set(3.6 * br, 3.6 / br, 3.6 * br);
        w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(3 + q * 2, 7 + q * 4, 2); z.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'A giant hamster: cute, terrifying, or perfect? Comment below.',
      quiz: { q: 'Would you want a giant hamster?', options: ['Cute', 'Terrifying', 'Perfect'], answer: 'Fun fact: hamsters carry food in stretchy cheek pouches.' },
      show: ['ground', 'road', 'houses', 'hm'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 24,
      cam: { pos: [10, 4, 26], look: [0, 8.6, 0], fov: 46, to: { pos: [-8, 4, 28], look: [0, 8.6, 0] } },
      update: (w, p, t) => { w.hm.scale.setScalar(3.6); pose(w, 0, 0, 0, -1.2, t); },
    },
  ],
};
