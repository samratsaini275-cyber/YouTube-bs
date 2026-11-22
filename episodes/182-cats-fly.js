// Narrative 11: "What Would Happen If… (season 3, with Gary)". Animals + flying (080 everyone could fly 1.1K; cats could text 363).
// Hook: the premise as a question under 2 s; first frame shows an orange cat with small white wings flying over rooftops.

function cat(k, parent, color = '#F2994A') {
  const { mat, box, ball, cone, cyl, group } = k;
  const fur = mat(color, { rough: .8 });
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(.7, fur, [0, .55, 0], c.root); b.scale.set(1.4, .75, .9);
  c.head = group([.95, 1.05, 0], c.root);
  ball(.5, fur, [0, 0, 0], c.head);
  for (const z of [-.25, .25]) { cone(.15, .32, fur, [0, .48, z], c.head, 4); ball(.1, mat('#B8F27A', { glow: .6 }), [.4, .08, z * .8], c.head); ball(.05, mat('#111111'), [.48, .08, z * .8], c.head); }
  ball(.06, mat('#FF8FA3'), [.5, -.06, 0], c.head);
  c.tail = cyl(.08, .06, 1.1, fur, [-1.0, 1.0, 0], c.root, 6); c.tail.rotation.z = .6;
  c.crown = group([0, .55, 0], c.head); cyl(.32, .28, .25, mat('#FFD21F', { glow: .6 }), [0, 0, 0], c.crown, 8);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.07, .2, mat('#FFD21F', { glow: .6 }), [Math.cos(a) * .27, .2, Math.sin(a) * .27], c.crown, 4); }
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.houses = group(); for (let i = 0; i < 6; i++) { const x = -20 + i * 8; box(6, 5, 5, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9', '#FFE3A3', '#E8D7F0'][i]), [x, 2.5, -8], w.houses); const r = cone(4.6, 2.6, mat('#B3262E'), [x, 6.3, -8], w.houses, 4); r.rotation.y = Math.PI / 4; }
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false; w.ct.scale.setScalar(1.6);
  w.wings = [-1, 1].map(s => { const g = group([0, 1.0, s * .55], w.ct); const wm = mat('#FFFFFF', { rough: .6 }); for (let i = 0; i < 3; i++) { const b = ball(.35, wm, [0, .1, s * (.35 + i * .32)], g); b.scale.set(.9, .18, 1.1 - i * .15); } return g; });
  w.bird = group(); const bb = ball(.5, mat('#4A6FA5'), [0, 0, 0], w.bird); bb.scale.set(1.5, 1, 1); ball(.36, mat('#4A6FA5'), [.65, .3, 0], w.bird);
  cone(.12, .35, mat('#FFB020'), [1.05, .28, 0], w.bird, 8).rotation.z = -Math.PI / 2;
  for (const z of [-.15, .15]) { ball(.1, mat('#FFFFFF'), [.85, .42, z], w.bird); ball(.05, mat('#111111'), [.93, .42, z], w.bird); }
  w.bw = [-1, 1].map(s => { const p = group([0, .15, s * .3], w.bird); box(.7, .06, .9, mat('#36507A'), [0, 0, s * .45], p); return p; });
  w.cup = group(); cyl(.35, .3, .7, mat('#3B82F6'), [0, 0, 0], w.cup, 16);
  w.shelf = group(); box(6, .2, 1.4, mat('#8B5A2B'), [0, 0, 0], w.shelf);
  w.room = group(); box(30, 14, .5, mat('#F3E6CF'), [0, 7, -4], w.room); w.floor = k.ground('#C9A27A', 0);
  w.tub = group(); const tb = cyl(1.8, 1.5, 1.4, mat('#FFFFFF', { rough: .3 }), [0, .7, 0], w.tub, 24); tb.scale.z = .6; const wt = cyl(1.65, 1.65, .1, mat('#9FD3EE', { glow: .3 }), [0, 1.3, 0], w.tub, 24); wt.scale.z = .55;
  for (let i = 0; i < 5; i++) ball(.3, mat('#FFFFFF', { glow: .4 }), [-1 + i * .5, 1.45, (i % 2) * .3 - .15], w.tub);
  w.splash = group(); for (let i = 0; i < 8; i++) { const s = ball(.12, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  return w;
}

const fly = (w, x, y, z, ry, t, sp = 16) => { w.ct.position.set(x, y, z); w.ct.rotation.set(0, ry, 0); w.c.head.rotation.set(0, 0, 0); w.c.tail.rotation.set(0, 0, .6 + .3 * Math.sin(t * 4)); w.wings.forEach((g, i) => g.rotation.x = (i ? 1 : -1) * (.2 + .6 * Math.sin(t * sp))); };

export default {
  id: '182',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLYING CATS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'COULD FLY?'],
  title: 'What would happen if cats could fly?',
  description: 'Birds get very nervous. Cups get knocked over from the sky. And bath time? The cat is gone before the water is warm. (A comedy what-if.)',
  tags: ['whatif', 'cats', 'funny', 'flying', 'pets', 'shorts'],
  sources: [
    'Comedy what-if; quiz answer makes no factual claim beyond "cats cannot fly".',
  ],
  setup,
  scenes: [
    {
      say: 'What if cats could fly?',
      show: ['ground', 'houses', 'ct'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 16,
      cam: { pos: [2, 6, 11], look: [0, 8.9, 0], fov: 46, to: { pos: [1.8, 6, 10.2], look: [0, 8.9, 0], fov: 44 } },
      update: (w, p, t) => { fly(w, -.8 + t * .3, 6.2 + .25 * Math.sin(t * 3), 0, -1.0, t); },
    },
    {
      say: 'Birds? Suddenly very nervous.',
      show: ['ground', 'houses', 'ct', 'bird'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 18,
      cam: { pos: [1, 7, 13], look: [1, 8.2, 0], fov: 50, to: { pos: [1.5, 7, 12], look: [1.5, 8.2, 0], fov: 48 } },
      update: (w, p, t) => { fly(w, -4 + t * 1.6, 6.5 + .3 * Math.sin(t * 3), 0, -.2, t); w.bird.position.set(-.5 + t * 1.8, 7.8 + .4 * Math.sin(t * 6), .5); w.bird.rotation.set(0, 0, .15); w.bw.forEach((p, i) => p.rotation.x = (i ? 1 : -1) * .8 * Math.sin(t * 16)); },
    },
    {
      say: 'Knocking cups over? Now from the sky.',
      show: ['floor', 'room', 'ct', 'cup', 'shelf'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [2, 5, 10], look: [0, 5.6, 0], fov: 50, to: { pos: [1.8, 5, 9.2], look: [0, 5.6, 0], fov: 48 } },
      update: (w, p, t) => {
        w.shelf.position.set(0, 4, -2); fly(w, -1.4, 7.2 + .2 * Math.sin(t * 3), -1.6, -1.1, t); w.c.head.rotation.z = -.3;
        const q = Math.max(0, t - .8); w.cup.position.set(.4 + q * .8, 4.45 + q * 1.2 - 4.9 * q * q, -2 + q * .6); w.cup.rotation.z = -q * 4;
      },
    },
    {
      say: 'Bath time? It flies away. Fast.',
      show: ['floor', 'room', 'ct', 'tub', 'splash'], sky: '#F3E6CF', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [2, 4, 11], look: [0, 4.4, 0], fov: 50, to: { pos: [1.8, 4, 10.2], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => {
        w.tub.position.set(0, 0, 0); const up = Math.max(0, t - .5); fly(w, -.2 + up * 2, 1.6 + up * up * 6, 0, -1.1, t, 30); w.c.head.rotation.z = .2;
        w.splash.children.forEach(s => { const i = s.userData.i, a = i / 8 * Math.PI * 2, q = Math.min(1, up * 1.5); s.visible = t > .5; s.position.set(Math.cos(a) * q * 2, 1.5 + Math.sin(q * Math.PI) * 1.5, Math.sin(a) * q); });
      },
    },
    {
      say: 'Flying cats: cute, chaotic, or a nightmare? Comment below.',
      quiz: { q: 'Should cats be able to fly?', options: ['Cute', 'Chaotic', 'Nightmare'], answer: 'Cats cannot fly. But they can still reach the top shelf. Somehow.' },
      show: ['ground', 'houses', 'ct'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 16,
      cam: { pos: [4, 6, 8], look: [0, 7.6, 0], fov: 44, to: { pos: [-4, 6, 8], look: [0, 7.6, 0] } },
      update: (w, p, t) => { fly(w, 0, 6 + .2 * Math.sin(t * 3), 0, -1.25, t, 10); },
    },
  ],
};
