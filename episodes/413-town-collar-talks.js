// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: a collar bell that tells on the cat.
// Hook: the rule under 2 s; first frame shows a cat facing camera with a big talking bell on its collar.

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
  const { mat, box, cyl, ball, torus, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#CFE3F5'), [0, 8, -4], w.wall);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.collar = torus(.95, .12, mat('#E2453C'), [-.15, -.95, 0], w.c.head); w.collar.rotation.set(Math.PI / 2, 0, .35);
  w.bell = group([.85, -1.35, 0], w.c.head); ball(.55, mat('#F2C94C', { metal: .7 }), [0, 0, 0], w.bell); w.bf = face(k, w.bell, [.5, 0, 0], .42); w.bf.rotation.y = Math.PI / 2;
  w.counter = group(); box(4, 2.2, 1.6, mat('#FFFFFF'), [0, 1.1, 0], w.counter); w.plate = cyl(.6, .5, .08, mat('#EEEEEE'), [0, 2.25, 0], w.counter, 16); const fish = ball(.3, mat('#8FB8D8', { metal: .3 }), [0, 2.45, 0], w.counter); fish.scale.set(1.8, .7, .7);
  w.bird = group(); const bb = ball(.35, mat('#3B6FD6'), [0, 0, 0], w.bird); bb.scale.set(1.2, 1, 1); ball(.22, mat('#3B6FD6'), [.35, .25, 0], w.bird); cone(.07, .2, mat('#F2C94C'), [.6, .22, 0], w.bird, 6).rotation.z = -Math.PI / 2; w.wings = [-1, 1].map(s => { const g = group([0, .1, s * .3], w.bird); const wg = ball(.25, mat('#2F5FC0'), [0, 0, s * .2], g); wg.scale.set(1, .2, 1.4); return g; });
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = ball(.12, mat('#FFE38A', { glow: .8 }), [0, 0, 0], w.notes); n.userData.i = i; }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.14, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const ring = (w, t, on) => { w.bell.rotation.x = on ? .4 * Math.sin(t * 18) : 0; w.cr.updateWorldMatrix(true, true); const at = w.bell.getWorldPosition(new w.k.THREE.Vector3()); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * 1.2 + i / 4) % 1; n.position.set(at.x + (i % 2 ? 1 : -1) * (.3 + q * .6), at.y + q * 1.2, at.z + .3); n.visible = on; }); };
const zz = (w, t, on) => { w.cr.updateWorldMatrix(true, true); const at = w.bell.getWorldPosition(new w.k.THREE.Vector3()); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(at.x + 1 + q * .6, at.y + .4 + q * 1.1, at.z + .3); z.scale.setScalar(.6 + q); z.visible = on; }); };

export default {
  id: '413',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE COLLAR BELL TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'COLLARS TALK'],
  title: 'In this town, cat collars can talk',
  description: 'Sneaking to the fish? It tells on you. A bird nearby? It warns the bird. Nap time? It snores. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking collars are made up. Quiz fact: in a study of pet cats, cats wearing a bell brought home fewer prey animals than cats without one (Ruxton, Thomas and Wright, "Bells reduce predation of wildlife by domestic cats (Felis catus)", Journal of Zoology 256, 2002).'],
  setup,
  scenes: [
    { say: 'In this town, collars talk.', show: ['floor', 'wall', 'cr'], sky: '#CFE3F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6.5], look: [0, 1.9, 0], fov: 50, to: { pos: [0, 2.2, 6], look: [0, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { w.counter.visible = false; w.bird.visible = false; w.zzz.visible = false; ctAt(w, -.35, 0, 0, -Math.PI / 2 + .2, .65); talk(w.bf, t); brow(w.bf, -.3); ring(w, t, true); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); } },
    { say: 'Sneaking to the fish? It tells on you.', label: 'RING RING', show: ['floor', 'wall', 'counter', 'cr'], sky: '#CFE3F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.4, 10], look: [.6, 2.2, 0], fov: 52, to: { pos: [1, 3.4, 9.5], look: [.6, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { w.counter.position.set(-1.6, 0, -1.4); const q = Math.min(1, p * 1.6); ctAt(w, 2.4 - q * 2.2, 0, .6, -2.1, .5); w.c.body.scale.set(1.5, .75, 1); talk(w.bf, t, p > .3); brow(w.bf, .3); ring(w, t, p > .3); if (p > .55) w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.2 : 1.6); } },
    { say: 'A bird nearby? It warns the bird.', label: 'FLY!', show: ['floor', 'wall', 'bird', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.4, 3, 9], look: [.4, 2, 0], fov: 52, to: { pos: [.4, 3, 8.5], look: [.4, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.counter.visible = false; w.notes.visible = false; ctAt(w, -.7, 0, .6, -.7, .5); w.c.body.scale.set(1.5, .75, 1); talk(w.bf, t); brow(w.bf, .4); w.bell.rotation.x = .3 * Math.sin(t * 18); const f = Math.max(0, (p - .35) / .65); w.bird.position.set(1.8 + f * 2, .35 + f * f * 5, 0); w.wings.forEach((g, i) => g.rotation.x = (i ? -1 : 1) * (f > 0 ? .8 * Math.sin(t * 30) : .2)); } },
    { say: 'Nap time? It snores.', label: 'SNORE', show: ['floor', 'wall', 'cr', 'zzz'], sky: '#CFE3F5', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.2, 6], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.bird.visible = false; ctAt(w, -.35, 0, 0, -Math.PI / 2 + .2, .6); w.bell.rotation.x = 0; w.bf.mouth.scale.set(1.2, 1.5 + Math.sin(t * 3), 1); w.bf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .15; }); zz(w, t, true); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .6); w.c.head.rotation.z = .12; } },
    { say: 'Tattle-tale collar: helpful, funny, or way too noisy? Comment below.',
      quiz: { q: 'The talking collar is…', options: ['Helpful', 'Funny', 'Way too noisy'], answer: 'Made up. But in a study, cats wearing bells caught fewer animals.' },
      show: ['floor', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.6, 2.2, 7], look: [0, 1.6, 0], fov: 52, to: { pos: [-1.6, 2.2, 7], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.zzz.visible = false; w.bf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); ctAt(w, -.35, 0, 0, -Math.PI / 2 + .2, .6); talk(w.bf, t, Math.sin(t * 2) > 0); brow(w.bf, .2); w.bell.rotation.x = .2 * Math.sin(t * 6); } },
  ],
};
