// Narrative 7: "Animals at Work". A made-up comedy sketch: sloths are not firefighters, and no one is in danger (the "fire" is a burnt-toast smoke cloud).
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the sloth in a red helmet hanging from the fire truck ladder.

function sloth(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#8B6B4A', { rough: .9 }), face = mat('#E8D2B0', { rough: .8 });
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  const b = ball(1.2, fur, [0, 0, 0], s.body); b.scale.set(.9, 1.3, .8);
  s.head = group([0, 1.9, .1], s.body);
  ball(.8, fur, [0, 0, 0], s.head);
  const f = ball(.62, face, [0, -.05, .35], s.head); f.scale.set(1.1, .9, .6);
  for (const x of [-.28, .28]) { const p = ball(.2, mat('#3A2A1E'), [x, .05, .68], s.head); p.scale.set(1.4, .8, .4); ball(.07, mat('#111111'), [x, .07, .76], s.head); }
  box(.25, .05, .05, mat('#3A2A1E'), [0, -.25, .72], s.head);
  s.helmet = group([0, .55, 0], s.head);
  const hm = k.mesh(new k.THREE.SphereGeometry(.85, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#E2453C', { rough: .3 }), [0, 0, 0], s.helmet);
  cyl(1.05, 1.05, .08, mat('#E2453C'), [0, .02, .1], s.helmet, 20); box(.4, .35, .06, mat('#FFD21F'), [0, .35, .75], s.helmet);
  s.arms = [-1, 1].map(sd => { const g = group([sd * .8, .9, 0], s.body); cyl(.22, .2, 2, fur, [0, 1, 0], g, 8); for (let c = 0; c < 3; c++) cone(.05, .35, mat('#2A1E14'), [(c - 1) * .1, 2.1, .1], g, 6).rotation.x = .6; return g; });
  s.legs = [-1, 1].map(sd => { const g = group([sd * .55, -1.3, 0], s.body); cyl(.24, .2, 1.3, fur, [0, -.6, 0], g, 8); return g; });
  return s;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9AA3AE', 0);
  w.station = group();
  box(24, 16, 10, mat('#C0392B'), [0, 8, -12], w.station);
  box(9, 9, .2, mat('#2A2A2A'), [-5, 4.5, -6.9], w.station); box(9, 9, .2, mat('#2A2A2A'), [6, 4.5, -6.9], w.station);
  box(14, 2, .3, mat('#FFFFFF'), [0, 13, -6.8], w.station);
  w.truck = group([0, 0, 0]);
  box(14, 4, 5, mat('#E2453C', { rough: .3 }), [0, 3, 0], w.truck); box(4, 3, 5, mat('#E2453C'), [8, 2.5, 0], w.truck);
  box(3.6, 1.6, 5.1, mat('#BFE6FF', { opacity: .6 }), [8.2, 3.4, 0], w.truck);
  for (const x of [-4.5, 4.5, 8.5]) for (const z of [-2.6, 2.6]) { const wh = cyl(1.1, 1.1, .6, mat('#1E2430'), [x, 1.1, z], w.truck, 18); wh.rotation.x = Math.PI / 2; }
  w.ladder = group([-6, 5.2, 0], w.truck);
  for (const z of [-1, 1]) box(16, .3, .3, mat('#C0C0C8', { metal: .7 }), [8, 0, z], w.ladder);
  for (let i = 0; i < 12; i++) box(.2, .2, 2, mat('#C0C0C8', { metal: .7 }), [1 + i * 1.3, 0, 0], w.ladder);
  w.ladder.rotation.z = .35;
  w.s = sloth(k, k.scene); w.sl = w.s.root;
  w.pole = group([0, 0, 40]);
  cyl(.2, .2, 20, mat('#D9D9D9', { metal: .8, rough: .2 }), [0, 10, 0], w.pole, 12);
  box(10, .6, 10, mat('#8B5A2B'), [0, 19.8, 0], w.pole);
  w.house = group([0, 0, 80]);
  box(12, 10, 10, mat('#F4F1E8'), [0, 5, 0], w.house);
  const r = cone(9.5, 5, mat('#8B3A2E'), [0, 12.5, 0], w.house, 4); r.rotation.y = Math.PI / 4;
  w.toast = group([0, 6, 5.2], w.house);
  box(1.6, 1.6, .2, mat('#3A2A1E'), [0, 0, 0], w.toast);
  w.smoke = group([0, 0, 80]);
  for (let i = 0; i < 6; i++) { const p = ball(1 + (i % 2) * .4, mat('#9AA3AE', { opacity: .5 }), [0, 0, 0], w.smoke); p.userData.i = i; p.castShadow = false; }
  w.zs = group();
  for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zs); box(.6, .1, .06, mat('#FFFFFF', { glow: .8 }), [0, .3, 0], z); box(.6, .1, .06, mat('#FFFFFF', { glow: .8 }), [0, -.3, 0], z); const d = box(.8, .1, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  return w;
}

function hang(s) { s.arms.forEach(a => { a.rotation.set(0, 0, 0); }); s.legs.forEach(l => { l.rotation.x = 0; }); }

export default {
  id: '105',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SLOTH FIREFIGHTER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS SLOTH', 'BECAME A FIREFIGHTER.'],
  title: 'This sloth became a firefighter',
  description: 'The alarm rings. He slides down the pole. Eventually. (A made-up sloth and a made-up fire station; the only fire is burnt toast.)',
  tags: ['animalsatwork', 'funny', 'sloth', 'firefighter', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the sloth firefighter and his fire station are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This sloth became a firefighter.',
      show: ['ground', 'station', 'truck', 'sl'], sky: '#9ED2F3', lightAt: [2, 8, 2], lightDist: 20,
      cam: { pos: [12, 4, 17], look: [7.5, 9.6, 0], fov: 48, to: { pos: [11.6, 4, 16], look: [7.5, 9.5, 0], fov: 46 } },
      update: (w, p, t) => { hang(w.s); w.sl.position.set(8.6, 6.9, 0); w.sl.rotation.set(0, 0, .1 * Math.sin(t * 1.2)); w.s.head.rotation.y = .2 * Math.sin(t); },
    },
    {
      say: 'The alarm rings. He slides down the pole. Slowly.',
      show: ['ground', 'pole', 'sl'], sky: '#BFD8EE', lightAt: [0, 14, 40], lightDist: 22,
      cam: { pos: [5, 13, 52], look: [0, 14, 40], fov: 50, to: { pos: [4.6, 12.6, 51], look: [0, 13.6, 40], fov: 48 } },
      update: (w, p, t) => { hang(w.s); w.sl.position.set(0, 15.5 - t * .25, 40.9); w.sl.rotation.set(0, 0, 0); w.s.head.rotation.y = 0; w.s.legs.forEach((l, i) => { l.rotation.x = (i ? -1 : 1) * .3; }); },
    },
    {
      say: 'He gets there next Tuesday. The toast is fine.',
      show: ['ground', 'house', 'smoke', 'sl'], sky: '#FFD9A8', lightAt: [0, 6, 84], lightDist: 22,
      cam: { pos: [8, 7, 100], look: [1, 6.5, 84], fov: 50, to: { pos: [7.5, 7, 98.5], look: [1, 6.5, 84], fov: 48 } },
      update: (w, p, t) => {
        w.sl.position.set(4, 2.6, 88); w.sl.rotation.set(0, -.4, 0); w.s.arms.forEach((a, i) => { a.rotation.set(0, 0, (i ? -1 : 1) * .3 + (i ? 0 : .6 * Math.sin(t * 3))); }); w.s.legs.forEach(l => { l.rotation.x = 0; });
        w.smoke.children.forEach(s => { const f = (t * .3 + s.userData.i / 6) % 1; s.position.set(Math.sin(s.userData.i) * .6, 7 + f * 4, 5.6); s.scale.setScalar(.4 + f * .5); });
      },
    },
    {
      say: 'So he takes a well-earned nap on the ladder.',
      show: ['ground', 'station', 'truck', 'sl', 'zs'], sky: '#C9B8E0', lightAt: [2, 8, 2], lightDist: 20,
      cam: { pos: [12, 5, 15], look: [8.4, 9, 0], fov: 46, to: { pos: [11.6, 5, 14], look: [8.4, 8.9, 0], fov: 44 } },
      update: (w, p, t) => {
        hang(w.s); w.sl.position.set(8.6, 6.9, 0); w.sl.rotation.set(0, 0, .06 * Math.sin(t * .8)); w.s.head.rotation.set(.3, 0, .3);
        w.zs.children.forEach(z => { const f = (t * .5 + z.userData.i / 3) % 1; z.position.set(9.6 + f * 1.4, 9.2 + f * 2.2, 1.2); z.scale.setScalar(.6 + f * .6); });
      },
    },
    {
      say: 'Sloth firefighter: hero, zero, or asleep? Comment below.',
      quiz: { q: 'What is the sloth firefighter?', options: ['Hero', 'Zero', 'Asleep'], answer: 'He is made up, so asleep. The toast was fine.' },
      show: ['ground', 'station', 'truck', 'sl'], sky: '#274B73', lightAt: [2, 8, 2], lightDist: 20,
      cam: { pos: [12, 3, 17], look: [8, 11.5, 0], fov: 48, to: { pos: [5, 3, 17], look: [8, 11.5, 0] } },
      update: (w, p, t) => { hang(w.s); w.sl.position.set(8.6, 6.9, 0); w.sl.rotation.set(0, 0, .1 * Math.sin(t * 1.2)); w.s.head.rotation.set(0, .2 * Math.sin(t), 0); },
    },
  ],
};
