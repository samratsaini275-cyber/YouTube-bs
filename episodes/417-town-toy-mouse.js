// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: the cat's toy mouse talks back.
// Hook: the rule under 2 s; first frame shows a toy mouse with a face and a cat staring at it.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#D8E8C8'), [0, 8, -4], w.wall);
  w.mouse = group(); const mb = ball(.6, mat('#9A9AA6', { rough: .9 }), [0, .45, 0], w.mouse); mb.scale.set(1.5, .8, .9); for (const z of [-1, 1]) ball(.22, mat('#F49AAE'), [.55, .9, z * .3], w.mouse); const tl = cyl(.04, .03, 1.2, mat('#F49AAE'), [-1.3, .35, 0], w.mouse, 6); tl.rotation.z = Math.PI / 2 + .3; ball(.08, mat('#F49AAE'), [.95, .45, 0], w.mouse);
  w.mf = face(k, w.mouse, [.35, .55, .5], .35);
  w.shades = group([.35, .75, .62], w.mouse); for (const x of [-.16, .16]) { const s = cyl(.12, .12, .03, mat('#111111'), [x, 0, 0], w.shades, 12); s.rotation.x = Math.PI / 2; } box(.3, .03, .03, mat('#111111'), [0, 0, 0], w.shades);
  w.sofa = group(); box(5, .8, 2.2, mat('#C0504D'), [0, 1.2, 0], w.sofa); box(5, 1.8, .5, mat('#A8403D'), [0, 2.2, -.85], w.sofa); for (const x of [-2.2, 2.2]) for (const z of [-.9, .9]) cyl(.1, .1, .8, mat('#5A3A1A'), [x, .4, z], w.sofa, 6);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.moon = ball(.6, mat('#FFF4C0', { glow: .9 }), [3, 6.5, -3.7]);
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = ball(.1, mat('#FFE38A', { glow: .8 }), [0, 0, 0], w.notes); n.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const mAt = (w, x, y, z, ry, s = 1) => { w.mouse.position.set(x, y, z); w.mouse.rotation.set(0, ry, 0); w.mouse.scale.setScalar(s); w.mouse.visible = true; w.shades.visible = false; w.mf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); };
const squeak = (w, t, on) => { w.mouse.updateWorldMatrix(true, true); const at = w.mf.getWorldPosition(new w.k.THREE.Vector3()); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * 1.3 + i / 4) % 1; n.position.set(at.x + (i % 2 ? 1 : -1) * (.2 + q * .5), at.y + .3 + q, at.z + .2); n.visible = on; }); };

export default {
  id: '417',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TOY MOUSE TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'TOY MICE TALK'],
  title: 'In this town, toy mice can talk',
  description: 'The cat pounces? It plays dead. Under the sofa? It is on holiday. Three a.m.? It squeaks. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking toy mice are made up. Quiz fact: most kittens open their eyes within seven to fourteen days of birth (VCA Animal Hospitals, "Raising Kittens").'],
  setup,
  scenes: [
    { say: 'In this town, toy mice talk.', show: ['floor', 'wall', 'mouse', 'cr'], sky: '#D8E8C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.7, .95, 6], look: [.7, .95, 0], fov: 50, to: { pos: [.7, .95, 5.6], look: [.7, .95, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.visible = false; w.moon.visible = false; w.notes.visible = false; mAt(w, -.05, 0, .8, -.5, .85); talk(w.mf, t); brow(w.mf, -.2); ctAt(w, 2, 0, -.2, Math.PI + .3, .5); w.c.body.scale.set(1.5, .8, 1); } },
    { say: 'The cat pounces? It plays dead.', label: 'X_X', show: ['floor', 'wall', 'mouse', 'cr'], sky: '#D8E8C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.6, 2.4, 7.5], look: [.4, 1.3, 0], fov: 50, to: { pos: [.6, 2.4, 7], look: [.4, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { const q = Math.min(1, p * 2.2); const landed = q >= 1; ctAt(w, 2.2 - q * 1.6, Math.sin(q * Math.PI) * 1.2, -.2, Math.PI + .3, .5); mAt(w, -.6, 0, .8, -.4, .9); if (p > .5) { w.mouse.rotation.z = Math.PI * .9; w.mouse.position.y = .9; w.mf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .12; }); talk(w.mf, t, false); w.mf.mouth.scale.set(1, .5, 1); } else { talk(w.mf, t); brow(w.mf, .5); } if (landed) w.c.head.rotation.z = -.2; } },
    { say: 'Under the sofa? Holiday.', label: 'AHHH', show: ['floor', 'wall', 'sofa', 'mouse'], sky: '#D8E8C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.3, 6], look: [.1, .85, 0], fov: 50, to: { pos: [.2, 1.3, 5.5], look: [.1, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; w.sofa.position.set(0, 0, -.4); mAt(w, 0, 0, .2, -.2, .75); w.mouse.rotation.z = .25; w.shades.visible = true; talk(w.mf, t, p < .5); brow(w.mf, -.3); } },
    { say: 'Three a.m.? Squeak, squeak, squeak.', label: 'SQUEAK', show: ['floor', 'wall', 'mouse', 'cr', 'moon', 'notes'], sky: '#1B2140', lightAt: [1, 8, 8], lightDist: 30,
      cam: { pos: [.7, .95, 6], look: [.7, .95, 0], fov: 50, to: { pos: [.7, .95, 5.6], look: [.7, .95, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.visible = false; w.wall.visible = false; mAt(w, -.05, 0, .8, -.5, .85); talk(w.mf, t); brow(w.mf, -.4); squeak(w, t, true); ctAt(w, 2, 0, -.2, Math.PI + .3, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.8); w.c.eyes.forEach(e => e.material = w.k.mat('#9BE36F', { glow: .8 })); } },
    { say: 'Talking toy mouse: brave, funny, or way too loud? Comment below.',
      quiz: { q: 'The talking toy mouse is…', options: ['Brave', 'Funny', 'Way too loud'], answer: 'Made up. Fun fact: kittens open their eyes at one to two weeks old.' },
      show: ['floor', 'mouse'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 1.8, 5], look: [0, .8, 0], fov: 50, to: { pos: [-1.2, 1.8, 5], look: [0, .8, 0] } },
      update: (w, p, t) => { w.moon.visible = false; w.notes.visible = false; w.cr.visible = false; w.wall.visible = false; mAt(w, 0, 0, 0, -.4, 1); talk(w.mf, t, Math.sin(t * 2) > 0); brow(w.mf, .2); } },
  ],
};
