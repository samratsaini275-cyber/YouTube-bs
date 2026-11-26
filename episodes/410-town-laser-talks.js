// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: a laser pointer that teases the cat.
// Hook: the rule under 2 s; first frame shows a laser pointer with a face, a red dot, and a crouching cat.

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
  w.wall = group(); box(40, 16, .3, mat('#E8D8F0'), [0, 8, -4], w.wall);
  w.stool = group(); cyl(1, 1, .3, mat('#7A4E2E'), [0, 2, 0], w.stool, 20); for (const a of [0, 2.1, 4.2]) cyl(.08, .08, 2, mat('#5A3A1A'), [Math.cos(a) * .7, 1, Math.sin(a) * .7], w.stool, 6);
  w.laser = group(); const body = cyl(.32, .32, 1.8, mat('#3B6FD6', { metal: .3 }), [0, 0, 0], w.laser, 16); body.rotation.z = Math.PI / 2; cyl(.2, .32, .3, mat('#AAAAAA', { metal: .6 }), [1.05, 0, 0], w.laser, 16).rotation.z = Math.PI / 2;
  w.lf = face(k, w.laser, [-.1, 0, .33], .45);
  w.dot = cyl(.18, .18, .02, mat('#FF1A1A', { glow: 1 }), [0, .02, 0], undefined, 16);
  w.beam = cyl(.02, .02, 1, mat('#FF3A3A', { glow: 1 }), [0, 0, 0], undefined, 6); w.beam.material.transparent = true; w.beam.material.opacity = .5;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.body.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const aim = (w, at) => { w.laser.updateWorldMatrix(true, true); const tip = w.laser.localToWorld(new w.k.THREE.Vector3(1.2, 0, 0)); const T = new w.k.THREE.Vector3(...at); w.dot.position.copy(T); w.beam.position.copy(tip.clone().add(T).multiplyScalar(.5)); w.beam.scale.y = tip.distanceTo(T); w.beam.quaternion.setFromUnitVectors(new w.k.THREE.Vector3(0, 1, 0), T.clone().sub(tip).normalize()); w.laser.rotation.z = Math.atan2(T.y - tip.y, Math.hypot(T.x - tip.x, T.z - tip.z)) * .3; };

export default {
  id: '410',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LASER TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'LASERS TALK'],
  title: 'In this town, laser pointers can talk',
  description: 'The cat chases the dot? It giggles. Dot on the wall? Splat. Battery dies? The cat wins. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'laser', 'shorts'],
  sources: ['Comedy sketch: talking laser pointers are made up. Quiz fact: whiskers (vibrissae) are specialized touch hairs; cats have them on the face and also on the backs of the front legs (Encyclopaedia Britannica, "Why Do Cats Have Whiskers?").'],
  setup,
  scenes: [
    { say: 'In this town, lasers talk.', show: ['floor', 'wall', 'stool', 'laser', 'dot', 'beam', 'cr'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 12], look: [0, 2.7, 0], fov: 52, to: { pos: [.2, 3.6, 11.5], look: [0, 2.7, 0], fov: 50 } },
      update: (w, p, t) => { w.stool.position.set(-1.4, 0, -.8); w.laser.position.set(-1.4, 2.5, -.6); w.laser.rotation.set(0, -.5, 0); talk(w.lf, t); brow(w.lf, -.3); aim(w, [.9 + .3 * Math.sin(t * 3), .02, 1.6]); ctAt(w, 2, 0, 1, Math.PI + .3, .45); w.c.body.scale.set(1.5, .8, 1); w.c.head.rotation.z = -.15; } },
    { say: 'The cat chases it? It giggles.', label: 'HEE HEE', show: ['floor', 'wall', 'stool', 'laser', 'dot', 'beam', 'cr'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 4.6, 13], look: [0, 1.8, 0], fov: 52, to: { pos: [0, 4.6, 12.5], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { w.stool.position.set(-2.6, 0, -1.6); w.laser.position.set(-2.6, 2.5, -1.4); w.laser.rotation.set(0, -.3, 0); talk(w.lf, t); brow(w.lf, -.35); const dx = 1.3 * Math.sin(t * 2.4), dz = 1.2 + .6 * Math.cos(t * 3.1); aim(w, [dx + .3, .02, dz]); const lag = t - .35; ctAt(w, 1.3 * Math.sin(lag * 2.4) + .3 + .9, 0, 1.2 + .6 * Math.cos(lag * 3.1), Math.PI + Math.cos(t * 2.4) * .6, .42); } },
    { say: 'Dot on the wall? Splat.', label: 'SPLAT', show: ['floor', 'wall', 'stool', 'laser', 'dot', 'beam', 'cr'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.4, 3.4, 9], look: [.8, 2.6, 0], fov: 52, to: { pos: [1.4, 3.4, 8.5], look: [.8, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.stool.position.set(-2.4, 0, .6); w.laser.position.set(-2.4, 2.5, .8); w.laser.rotation.set(0, .6, 0); talk(w.lf, t, p > .55); brow(w.lf, -.3); aim(w, [1, 3.4 + .2 * Math.sin(t * 4), -3.83]); w.dot.rotation.x = Math.PI / 2; const q = Math.min(1, p * 1.8); const hit = q >= 1; ctAt(w, 1.6 - q * .2, hit ? 2.4 : Math.sin(q * Math.PI / 2) * 2.6, 1 - q * 4.1 + (hit ? .1 : 0), Math.PI / 2, .42); if (hit) { w.c.body.scale.set(1.4, 1, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .2); w.cr.position.y = 2.4 - Math.min(2.4, (p - .55) * 4); } } },
    { say: 'Battery dies? The cat wins.', label: 'WIN', show: ['floor', 'wall', 'laser', 'cr'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 2.4, 7], look: [.3, .75, 0], fov: 50, to: { pos: [.4, 2.4, 6.5], look: [.3, .75, 0], fov: 48 } },
      update: (w, p, t) => { w.dot.rotation.x = 0; w.dot.visible = false; w.beam.visible = false; w.stool.visible = false; w.laser.position.set(.4, .35, .8); w.laser.rotation.set(0, 0, 0); talk(w.lf, t, false); w.lf.mouth.scale.set(1, 1, 1); w.lf.mouth.rotation.z = .3; brow(w.lf, .5); w.lf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .5; }); ctAt(w, .2, .55, .2, -.4, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); w.c.head.rotation.z = .1; } },
    { say: 'Talking laser: funny, mean, or way too fast? Comment below.',
      quiz: { q: 'The talking laser is…', options: ['Funny', 'Mean', 'Way too fast'], answer: 'Made up. Fun fact: cats have whiskers on the backs of their front legs too.' },
      show: ['floor', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.laser.visible = false; ctAt(w, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
