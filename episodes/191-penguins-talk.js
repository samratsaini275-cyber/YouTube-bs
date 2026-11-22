// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Talking animals (cats could text, now 392) + penguins.
// Hook: the premise as a question under 2 s; first frame shows a penguin on an ice floe mid-sentence, speech bubbles rising.

function penguin(k, parent) {
  const { mat, box, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(1, mat('#1C1C24', { rough: .5 }), [0, 1.3, 0], p.body); b.scale.set(.85, 1.25, .8);
  const bl = ball(.8, mat('#FFFFFF'), [0, 1.15, .32], p.body); bl.scale.set(.75, 1.1, .6);
  p.head = group([0, 2.55, 0], p.body); ball(.62, mat('#1C1C24', { rough: .5 }), [0, 0, 0], p.head);
  for (const x of [-.24, .24]) { ball(.15, mat('#FFFFFF'), [x, .1, .5], p.head); ball(.08, mat('#111111'), [x, .1, .62], p.head); }
  const bk = cone(.16, .45, mat('#FF9F1C'), [0, -.12, .7], p.head, 10); bk.rotation.x = Math.PI / 2;
  p.flips = [-1, 1].map(s => { const g = group([s * .8, 1.9, 0], p.body); const f = box(.18, 1.3, .55, mat('#1C1C24'), [s * .1, -.6, 0], g); return g; });
  for (const x of [-.35, .35]) box(.4, .12, .6, mat('#FF9F1C'), [x, .06, .2], p.body);
  p.glasses = group([0, .12, .63], p.head); for (const x of [-.24, .24]) box(.32, .2, .05, mat('#111111', { rough: .2 }), [x, 0, 0], p.glasses); box(.2, .05, .05, mat('#111111'), [0, .04, 0], p.glasses);
  return p;
}
const flap = (p, t, sp = 14, a = 1.1) => p.flips.forEach((g, i) => g.rotation.z = (i ? -1 : 1) * (a * (.5 + .5 * Math.sin(t * sp))));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.sea = k.ground('#2A6FB0', 0);
  w.ice = group(); for (let i = 0; i < 6; i++) { const c = cone(3 + (i % 3), 3 + (i % 2) * 2, mat('#EAF6FF', { rough: .6 }), [-20 + i * 8, 1.2, -12 - (i % 2) * 6], w.ice, 6); c.rotation.y = i; }
  w.floe = group(); box(30, .8, 14, mat('#F2FAFF', { rough: .7 }), [0, .2, 0], w.floe);
  w.p = penguin(k, k.scene); w.pg = w.p.root; w.p.glasses.visible = false;
  w.bub = group(); for (let i = 0; i < 3; i++) { const b = ball(.25, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.bub); b.userData.i = i; b.castShadow = false; }
  w.fish = group(); const fb = ball(.35, mat('#9AD1FF', { glow: .3 }), [0, 0, 0], w.fish); fb.scale.set(1.4, .7, .5); const ft = cone(.25, .4, mat('#9AD1FF'), [-.55, 0, 0], w.fish, 4); ft.rotation.z = Math.PI / 2;
  w.pizza = group(); const pz = cyl(.9, .9, .12, mat('#F2B85B'), [0, 0, 0], w.pizza, 3); pz.rotation.y = .3; for (let i = 0; i < 4; i++) ball(.14, mat('#C0392B'), [Math.cos(i * 1.6) * .35, .08, Math.sin(i * 1.6) * .35], w.pizza);
  w.esc = group(); for (let i = 0; i < 8; i++) box(2.4, .3, 1, mat('#9AA5B1'), [0, .3 + i * .5, -i * .6], w.esc); for (const x of [-1.3, 1.3]) { const r = box(.15, .15, 6, mat('#333333'), [x, 2.6, -2.1], w.esc); r.rotation.x = .7; }
  w.bow = group(); box(.5, .3, .15, mat('#E2453C'), [-.28, 0, 0], w.bow); box(.5, .3, .15, mat('#E2453C'), [.28, 0, 0], w.bow); box(.2, .2, .2, mat('#B3262E'), [0, 0, 0], w.bow);
  return w;
}

const pose = (w, x, y, z, ry, t) => { w.pg.position.set(x, y, z); w.pg.rotation.set(0, ry, 0); w.p.body.rotation.set(0, 0, 0); w.p.head.rotation.set(0, 0, 0); };
const talk = (w, t, on = true) => { w.bub.visible = on; if (!on) return; w.pg.updateMatrixWorld(true); const v = new w.pg.position.constructor(); w.p.head.localToWorld(v.set(.3, .3, .7));
  w.bub.children.forEach(b => { const i = b.userData.i, q = (t * 1.2 + i / 3) % 1; b.position.set(v.x + q * .8, v.y + q * 1.5, v.z); b.scale.setScalar(.4 + q * 1.1); }); w.p.head.rotation.z = .1 * Math.sin(t * 9); };

export default {
  id: '191',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TALKING PENGUINS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PENGUINS', 'COULD TALK?'],
  title: 'What would happen if penguins could talk?',
  description: 'Fish for dinner again? They want pizza. Waddling everywhere? They want escalators. And they are always dressed for a party. (A comedy what-if.)',
  tags: ['whatif', 'penguins', 'funny', 'animals', 'talking', 'shorts'],
  sources: [
    'Quiz fact: penguins live almost entirely in the Southern Hemisphere (general zoology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if penguins could talk?',
      show: ['sea', 'ice', 'floe', 'pg', 'bub'], sky: '#BFE3FF', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [2, 3, 9.5], look: [0, 3.9, 0], fov: 44, to: { pos: [1.8, 3, 8.7], look: [0, 3.9, 0], fov: 42 } },
      update: (w, p, t) => { pose(w, 0, .6, 0, -.25, t); talk(w, t); flap(w.p, t, 6, .5); },
    },
    {
      say: 'Fish again? They want pizza.',
      show: ['sea', 'ice', 'floe', 'pg', 'fish', 'pizza', 'bub'], sky: '#BFE3FF', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [2, 3.2, 9.5], look: [0, 3.4, 0], fov: 46, to: { pos: [1.8, 3.2, 8.7], look: [0, 3.4, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -.6, .6, 0, .2, t); talk(w, t, t < 1); flap(w.p, t, 8, .7);
        w.fish.position.set(.8, 1, 1.2); w.fish.rotation.set(0, 0, .2 * Math.sin(t * 6)); w.fish.visible = t < 1;
        w.pizza.visible = t >= 1; w.pizza.position.set(.9, 1.2 + .1 * Math.sin(t * 3), 1.2); w.pizza.rotation.set(.3, t, 0);
      },
    },
    {
      say: 'Waddling everywhere? They want escalators.',
      show: ['sea', 'ice', 'floe', 'pg', 'esc'], sky: '#BFE3FF', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [6, 4, 10], look: [0, 3.2, -1.5], fov: 48, to: { pos: [5.5, 4, 9.2], look: [0, 3.2, -1.5], fov: 46 } },
      update: (w, p, t) => { w.esc.position.set(0, .6, 0); const q = (t * .4) % 1; pose(w, 0, .9 + q * 3.5, -q * 4.2 + .3, Math.PI, t); w.p.head.rotation.y = Math.PI * .85; flap(w.p, t, 2, .2); },
    },
    {
      say: 'But parties? Already wearing a tuxedo.',
      show: ['sea', 'ice', 'floe', 'pg', 'bow'], sky: '#3A2A5A', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [1.5, 3, 8], look: [0, 3.6, 0], fov: 44, to: { pos: [1.3, 3, 7.2], look: [0, 3.6, 0], fov: 42 } },
      update: (w, p, t) => { pose(w, 0, .6, 0, -.2, t); w.pg.position.y = .6 + .15 * Math.abs(Math.sin(t * 6)); w.pg.rotation.z = .12 * Math.sin(t * 6); flap(w.p, t, 6, .9); w.pg.updateMatrixWorld(true); const v = new w.pg.position.constructor(); w.p.body.localToWorld(v.set(0, 2.05, .62)); w.bow.position.copy(v); w.bow.rotation.set(0, -.2, w.pg.rotation.z); },
    },
    {
      say: 'Talking penguins: cute, hilarious, or a bit much? Comment below.',
      quiz: { q: 'Would you chat with a penguin?', options: ['Cute', 'Hilarious', 'A bit much'], answer: 'Fun fact: almost all penguins live in the Southern Hemisphere.' },
      show: ['sea', 'ice', 'floe', 'pg', 'bub'], sky: '#274B73', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [4, 3, 8], look: [0, 3.2, 0], fov: 44, to: { pos: [-4, 3, 8], look: [0, 3.2, 0] } },
      update: (w, p, t) => { pose(w, 0, .6, 0, 0, t); talk(w, t); flap(w.p, t, 6, .5); },
    },
  ],
};
