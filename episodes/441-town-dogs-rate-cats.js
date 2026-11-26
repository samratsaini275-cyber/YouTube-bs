// Narrative 24: "In This Town… (season 3: cats say it out loud)". Dog slot: the dogs rate the cats out loud.
// Hook: the rule under 2 s; first frame shows a dog holding up a score card next to a cat.

function dog(k, parent) {
  const { mat, ball, cyl, group } = k;
  const g = { root: group([0, 0, 0], parent) };
  const db = ball(.8, mat('#C98B3E'), [0, 1, 0], g.root); db.scale.set(1.4, .8, .8);
  g.head = group([1.1, 1.6, 0], g.root); ball(.5, mat('#C98B3E'), [0, 0, 0], g.head); for (const z of [-1, 1]) { const ear = ball(.22, mat('#8B5A2B'), [-.1, .4, z * .35], g.head); ear.scale.y = 1.6; ball(.07, mat('#111111'), [.4, .1, z * .2], g.head); } ball(.1, mat('#111111'), [.5, -.05, 0], g.head);
  g.tongue = ball(.1, mat('#E87A8A'), [.42, -.25, 0], g.head); g.tongue.scale.set(.6, 1.4, .8);
  g.legs = []; for (const x of [-.6, .6]) for (const z of [-.3, .3]) { const l = group([x, .8, z], g.root); cyl(.12, .12, .8, mat('#C98B3E'), [0, -.4, 0], l, 6); g.legs.push(l); }
  g.tail = group([-1.1, 1.2, 0], g.root); const tl = cyl(.08, .05, .7, mat('#C98B3E'), [0, .35, 0], g.tail, 6);
  return g;
}

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

function setup(k) {
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FCE5CD'), [0, 8, -4], w.wall);
  w.bed = group(); cyl(1.3, 1.3, .35, mat('#2E86C1'), [0, .18, 0], w.bed, 24); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; k.ball(.32, mat('#5DADE2'), [Math.cos(a) * 1.2, .45, Math.sin(a) * 1.2], w.bed); }
  w.d = dog(k, k.scene); w.dr = w.d.root;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.card = group(); box(.7, .55, .04, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.3, .3, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .03], w.card); w.nr = box(.3, .3, .02, mat('#E2453C', { glow: .4 }), [0, 0, .03], w.card);
  return w;
}

const dgAt = (w, x, z, ry, s) => { w.dr.position.set(x, 0, z); w.dr.rotation.set(0, ry, 0); w.dr.scale.setScalar(s); w.dr.visible = true; w.d.head.rotation.set(0, 0, 0); w.d.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const card = (w, good) => { w.dr.updateWorldMatrix(true, true); const at = w.d.head.localToWorld(new w.k.THREE.Vector3(.1, .95, 0)); w.card.position.copy(at); w.card.rotation.set(0, 0, 0); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '441',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DOGS RATE CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'DOGS RATE CATS'],
  title: 'In this town, dogs rate cats',
  description: 'A cat nap? Five stars. A cat hiss? Zero stars. A cat in the dog bed? The dog just waits. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'dog', 'cat', 'dogsandcats', 'shorts'],
  sources: ['Comedy sketch: dogs reviewing cats is made up. Quiz fact: in an experiment filming dogs\' tails, dogs wagged with bigger swings to the left or to the right depending on what they were looking at, such as their owner, an unfamiliar person, a cat or an unfamiliar dog (Quaranta, Siniscalchi & Vallortigara, "Asymmetric tail-wagging responses by dogs to different emotive stimuli", Current Biology, 2007).'],
  setup,
  scenes: [
    { say: 'In this town, dogs rate cats.', show: ['floor', 'wall', 'card'], sky: '#FCE5CD', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.3, 10.5], look: [0, 1.55, 0], fov: 50, to: { pos: [0, 2.3, 10], look: [0, 1.55, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.visible = false; dgAt(w, -.9, .3, -.4, 1); w.d.tail.rotation.x = .5 * Math.sin(t * 14); card(w, null); ctAt(w, 1.6, 0, -.3, -2.6, .38); } },
    { say: 'A cat nap? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'card'], sky: '#FCE5CD', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.3, 10.5], look: [0, 1.55, 0], fov: 50, to: { pos: [0, 2.3, 10], look: [0, 1.55, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.visible = false; dgAt(w, -.9, .3, -.2, 1); w.d.tail.rotation.x = .5 * Math.sin(t * 10); w.d.head.rotation.z = -.2; if (p > .45) card(w, true); else w.card.visible = false; ctAt(w, 1.5, 0, -.2, -2.6, .38); w.c.body.scale.set(1.5, .8 + .04 * Math.sin(t * 2), 1); w.c.head.position.y = 2.1; w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'A cat hiss? Zero stars.', label: 'NOPE', show: ['floor', 'wall', 'card'], sky: '#FCE5CD', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.3, 10.5], look: [0, 1.55, 0], fov: 50, to: { pos: [0, 2.3, 10], look: [0, 1.55, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.visible = false; w.c.head.position.y = 2.4; const back = Math.min(1, p * 2); dgAt(w, -.6 - back * .9, .3, -.2, 1); w.d.tail.rotation.x = .1; w.d.legs.forEach((l, i) => l.rotation.z = back < 1 ? .4 * Math.sin(t * 16 + i * 2) : 0); if (p > .5) card(w, false); else w.card.visible = false; ctAt(w, 1.4, 0, -.2, -2.6, .38); w.c.body.scale.set(1.2, 1.35, 1); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); w.c.tail.scale.y = 1.3; } },
    { say: 'A cat in the dog bed? The dog just waits.', label: 'WAITING', show: ['floor', 'wall', 'bed'], sky: '#FCE5CD', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.4, 10.5], look: [0, 1.5, 0], fov: 50, to: { pos: [0, 2.4, 10], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.c.tail.scale.y = 1; w.bed.position.set(.8, 0, -.4); ctAt(w, 1.1, .3, -.4, -.4, .38); w.c.body.scale.set(1.5, .8, 1); w.c.head.position.y = 2.1; w.c.eyes.forEach(e => e.scale.y = .1); dgAt(w, -1.5, .5, .2, 1); w.dr.position.y = 0; w.d.legs.forEach((l, i) => l.rotation.z = i < 2 ? -1 : 0); w.dr.rotation.z = .25; w.d.head.rotation.z = -.35; w.d.tail.rotation.x = 0; } },
    { say: 'Who gets the dog bed? Comment below.',
      quiz: { q: 'Who gets the dog bed?', options: ['The dog', 'The cat', 'They share'], answer: 'Made up. But real dogs wag more to one side depending on what they see.' },
      show: ['floor', 'bed', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.4, 10.5], look: [0, 1.5, 0], fov: 54, to: { pos: [-2, 2.4, 10.5], look: [0, 1.5, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.dr.rotation.z = 0; w.bed.position.set(.9, 0, -.4); ctAt(w, 1.2, .3, -.4, -.4, .38); w.c.head.position.y = 2.4; dgAt(w, -1.2, .5, -.3, 1); w.d.tail.rotation.x = .5 * Math.sin(t * 14); card(w, true); } },
  ],
};
