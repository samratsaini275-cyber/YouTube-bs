// Narrative 8: "Objects With Opinions". A made-up comedy sketch: toasters do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the toaster with a face on a kitchen counter.

function toaster(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const t = { root: group([0, 0, 0], parent) };
  t.body = group([0, 0, 0], t.root);
  box(2.6, 2, 1.6, mat('#C0C8D0', { metal: .8, rough: .2 }), [0, 1, 0], t.body);
  for (const z of [-.35, .35]) box(1.8, .05, .28, mat('#1A1A1A'), [0, 2.02, z], t.body);
  t.lever = box(.2, .2, .4, mat('#2A2A2A'), [1.4, 1.5, 0], t.body);
  for (const x of [-.45, .45]) { ball(.2, mat('#FFFFFF'), [x, 1.25, .8], t.body); ball(.1, mat('#111111'), [x, 1.25, .92], t.body); }
  t.mouth = box(.5, .08, .05, mat('#5A1E1E'), [0, .7, .82], t.body);
  t.brows = [-1, 1].map(s => { const b = box(.35, .06, .05, mat('#2A2A2A'), [s * .45, 1.55, .82], t.body); return b; });
  for (const x of [-1, 1]) for (const z of [-.6, .6]) cyl(.1, .1, .15, mat('#2A2A2A'), [x, .05, z], t.root, 8);
  return t;
}
function talk(t, time, on = true) { t.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(time * 14)) : 1; }
function slice(k, parent, color) { const g = k.group([0, 0, 0], parent); k.box(1.4, 1.3, .2, k.mat(color, { rough: .9 }), [0, 0, 0], g); k.ball(.7, k.mat(color, { rough: .9 }), [0, .65, 0], g).scale.set(1, .5, .14); return g; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9A27A', 0);
  w.kitchen = group();
  box(40, 20, .5, mat('#F2E6C8'), [0, 10, -6], w.kitchen);
  box(30, 3, 4, mat('#8B5A2B'), [0, 1.5, -3.5], w.kitchen); box(30, .3, 4.2, mat('#E8E8E8'), [0, 3.15, -3.5], w.kitchen);
  w.t = toaster(k, k.scene); w.ts = w.t.root;
  w.s1 = slice(k, k.scene, '#C08A48'); w.s2 = slice(k, k.scene, '#C08A48');
  w.smoke = group();
  for (let i = 0; i < 6; i++) { const s = ball(.4, mat('#6E6E6E', { opacity: .5 }), [0, 0, 0], w.smoke); s.userData.i = i; s.castShadow = false; }
  w.person = group([0, 0, 0]);
  cyl(.8, .9, 3.2, mat('#2F6FD6'), [0, 1.6, 0], w.person, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.person);
  w.pointer = group([0, 2.8, 0], w.person); cyl(.15, .15, 1.8, mat('#2F6FD6'), [0, -.9, 0], w.pointer, 8);
  w.bagel = k.torus(.55, .28, mat('#D9A35E'), [0, 0, 0], k.scene); w.bagel.rotation.y = Math.PI / 2;
  w.room = group([0, 0, 0]); box(1, 1, 1, mat('#000000', { opacity: 0 }), [0, -10, 0], w.room);
  w.target = group([0, 0, 0]);
  for (let i = 0; i < 3; i++) { const r = cyl(1.8 - i * .55, 1.8 - i * .55, .1 + i * .02, mat(i % 2 ? '#FFFFFF' : '#E2453C'), [0, 0, i * .03], w.target, 28); r.rotation.x = Math.PI / 2; }
  w.trophy = group([0, 0, 0]);
  cyl(.5, .3, .8, mat('#D4AF37', { metal: .9, rough: .2 }), [0, .4, 0], w.trophy, 16); cyl(.6, .6, .15, mat('#3A2A1E'), [0, 0, 0], w.trophy, 16);
  return w;
}

export default {
  id: '128',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TOASTER WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS TOASTER', 'HAS A COMPLAINT.'],
  title: 'This toaster has a complaint',
  description: 'You burn the toast. He gets the blame. You jam a bagel in. So he took up a new sport. (A made-up talking toaster.)',
  tags: ['objectswithopinions', 'funny', 'toaster', 'kitchen', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking toasters are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This toaster has a complaint.',
      show: ['ground', 'kitchen', 'ts'], sky: '#F2E6C8', lightAt: [0, 5, 0], lightDist: 10,
      cam: { pos: [1.5, 3.8, 8.5], look: [0, 6.5, -3], fov: 44, to: { pos: [1.4, 3.8, 7.8], look: [0, 6.4, -3], fov: 42 } },
      update: (w, p, t) => { w.ts.position.set(0, 3.3, -3.2); w.ts.rotation.set(0, -.2, 0); talk(w.t, t, t > .2); w.t.brows.forEach(b => { b.rotation.z = 0; }); },
    },
    {
      say: 'You burn the toast. Somehow, it is his fault.',
      show: ['ground', 'kitchen', 'ts', 'person', 'smoke'], sky: '#F2E6C8', lightAt: [0, 5, 0], lightDist: 14,
      cam: { pos: [2.5, 5, 9], look: [0, 4, -2.5], fov: 48, to: { pos: [2.3, 5, 8.2], look: [0, 4, -2.5], fov: 46 } },
      update: (w, p, t) => {
        w.ts.position.set(-.8, 3.3, -3.2); w.ts.rotation.set(0, .2, 0); talk(w.t, t); w.t.brows.forEach((b, i) => { b.rotation.z = (i ? 1 : -1) * .35; });
        w.smoke.children.forEach(s => { const f = (t * .5 + s.userData.i / 6) % 1; s.position.set(-.8 + Math.sin(s.userData.i) * .3, 5.4 + f * 3, -3.2); s.scale.setScalar(.5 + f); });
        w.person.position.set(2.4, 0, -.8); w.person.rotation.y = -1.2; w.pointer.rotation.x = -1.2 + .1 * Math.sin(t * 10);
      },
    },
    {
      say: 'Then someone jams a bagel in. Sideways.',
      show: ['ground', 'kitchen', 'ts', 'bagel'], sky: '#F2E6C8', lightAt: [0, 5, 0], lightDist: 10,
      cam: { pos: [1.5, 8.5, 5], look: [0, 5, -3], fov: 44, to: { pos: [1.4, 8.3, 4.4], look: [0, 5, -3], fov: 42 } },
      shake: (t) => t > .9 ? .05 : 0,
      update: (w, p, t) => {
        w.ts.position.set(0, 3.3, -3.2); w.ts.rotation.set(0, -.2, 0); talk(w.t, t); w.t.brows.forEach((b, i) => { b.rotation.z = (i ? 1 : -1) * .35; });
        const push = Math.min(1, t * 1.4); w.bagel.position.set(0, 7.2 - push * 1.1, -3.05); w.bagel.rotation.set(0, Math.PI / 2, .2 * Math.sin(t * 20) * (push >= 1 ? 1 : 0));
        w.t.body.scale.set(1 + (push >= 1 ? .05 * Math.sin(t * 30) : 0), 1, 1);
      },
    },
    {
      say: 'So now he launches toast. National champion.',
      show: ['ground', 'kitchen', 'ts', 'target', 'trophy', 's1', 's2'], sky: '#FFE3C2', lightAt: [3, 5, 0], lightDist: 18,
      cam: { pos: [2, 6.5, 13.5], look: [1.6, 6, -3], fov: 56, to: { pos: [2, 6.5, 12.5], look: [1.8, 6.2, -3], fov: 54 } },
      update: (w, p, t) => {
        w.t.body.scale.set(1, 1, 1); w.ts.position.set(-1.5, 3.3, -3.2); w.ts.rotation.set(0, .3, 0); talk(w.t, t, t > 1.4); w.t.brows.forEach(b => { b.rotation.z = 0; });
        w.target.position.set(7, 6, -5.6); w.trophy.position.set(-.2, 3.3, -2);
        [w.s1, w.s2].forEach((s, i) => { const f = Math.min(1, Math.max(0, (t - .3 - i * .35) * 1.6)); s.position.set(-1.5 + f * 8.5, 5.4 + 4 * Math.sin(f * Math.PI) + f * .6, -3.2 - f * 2.3); s.rotation.set(0, 0, -f * 6); });
      },
    },
    {
      say: 'Burnt toast: his fault, your fault, or a feature? Comment below.',
      quiz: { q: 'Whose fault is burnt toast?', options: ['The toaster\'s', 'Yours', 'It is a feature'], answer: 'This toaster is made up. He says yours.' },
      show: ['ground', 'kitchen', 'ts'], sky: '#274B73', lightAt: [0, 5, 0], lightDist: 10,
      cam: { pos: [1.5, 3.4, 6], look: [0, 5.6, -3], fov: 44, to: { pos: [-1.5, 3.4, 6], look: [0, 5.6, -3] } },
      update: (w, p, t) => { w.ts.position.set(0, 3.3, -3.2); w.ts.rotation.set(0, -.2, 0); talk(w.t, t, false); w.t.brows.forEach(b => { b.rotation.z = 0; }); },
    },
  ],
};
