// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the suitcase complains about the cat.
// Hook: "This suitcase has a complaint." under 2 s; first frame shows an open suitcase with a grumpy face and a cat holding a score card.

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
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#F4ECF7'), [0, 8, -4], w.wall);
  const shell = mat('#1F618D');
  w.sc = group(); box(1.8, .35, 1.2, shell, [0, .18, 0], w.sc); box(1.7, .05, 1.1, mat('#5DADE2'), [0, .36, 0], w.sc);
  w.lid = group([0, .35, -.6], w.sc); box(1.8, .35, 1.2, shell, [0, .6, -.0], w.lid); w.lid.children[0].position.set(0, .6, 0); w.lid.children[0].rotation.x = Math.PI / 2;
  w.f = face(k, w.sc, [0, .2, .61], .4);
  w.clothes = group([0, 0, 0], w.sc); const cols = ['#F5B7B1', '#FFFFFF', '#82E0AA']; for (let i = 0; i < 3; i++) box(1.4 - i * .2, .08, .8, mat(cols[i]), [0, .42 + i * .08, 0], w.clothes);
  w.fur = group([0, 0, 0], w.sc); for (let i = 0; i < 10; i++) { const t = ball(.06, mat('#F2A04A'), [(Math.random() - .5) * 1.2, .66, (Math.random() - .5) * .7], w.fur); t.scale.y = .4; }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const scOn = (w, closed = 0) => { w.sc.position.set(-.5, 0, .2); w.sc.rotation.set(0, .2, 0); w.lid.rotation.x = -closed * Math.PI / 2; w.lid.position.set(0, .35, -.6 + closed * .6); };

export default {
  id: '467',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SUITCASE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SUITCASE', 'HAS A COMPLAINT'],
  title: 'This suitcase has a complaint',
  description: 'Packing? The cat climbs in. Clothes? Covered in fur. And the cat? Five stars. So the suitcase zipped itself shut. The cat sleeps on top. (A made-up comedy sketch.)',
  tags: ['funny', 'suitcase', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining suitcases are made up. Quiz fact: because domestic cats are crepuscular hunters, they need only about one-sixth of the illumination levels humans require to see well (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'This suitcase has a complaint.', show: ['floor', 'wall', 'sc', 'card'], sky: '#F4ECF7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 6], look: [.2, .4, 0], fov: 50, to: { pos: [.2, 1.4, 5.6], look: [.2, .4, 0], fov: 48 } },
      update: (w, p, t) => { scOn(w); w.fur.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .65, 0, .5, -.9, .3); holdCard(w, null); } },
    { say: 'Packing? The cat climbs in.', label: 'MINE', show: ['floor', 'wall', 'sc'], sky: '#F4ECF7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.6, 6], look: [.2, .45, 0], fov: 50, to: { pos: [.2, 1.6, 5.6], look: [.2, .45, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; scOn(w); w.fur.visible = false; talk(w.f, t); brow(w.f, .55); const hop = Math.min(1, p * 2.5); ctAt(w, 1 - hop * 1.5, hop < 1 ? Math.sin(hop * Math.PI) * .8 + hop * .5 : .5, .5 - hop * .3, -.4, .28); if (hop >= 1) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .15); } } },
    { say: 'Clothes? Covered in fur.', label: 'FURRY', show: ['floor', 'wall', 'sc'], sky: '#F4ECF7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.8, 5.5], look: [.2, .3, 0], fov: 50, to: { pos: [.2, 1.8, 5.1], look: [.2, .3, 0], fov: 48 } },
      update: (w, p, t) => { scOn(w); w.fur.visible = true; w.fur.children.forEach((c, i) => c.visible = i < 2 + p * 12); talk(w.f, t); brow(w.f, .55); ctAt(w, 1, 0, .5, -2.4, .3); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'sc', 'card'], sky: '#F4ECF7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 6], look: [.2, .4, 0], fov: 50, to: { pos: [.2, 1.4, 5.6], look: [.2, .4, 0], fov: 48 } },
      update: (w, p, t) => { scOn(w); w.fur.visible = true; talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .65, 0, .5, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the suitcase zipped itself shut. The cat sleeps on top.', label: 'NICE TRY', show: ['floor', 'wall', 'sc'], sky: '#F4ECF7', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.6, 6], look: [.2, .45, 0], fov: 50, to: { pos: [.2, 1.6, 5.6], look: [.2, .45, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.fur.visible = false; scOn(w, Math.min(1, p * 2.5)); talk(w.f, t, p < .5); brow(w.f, p < .5 ? -.2 : .5); const hop = Math.max(0, Math.min(1, (p - .5) * 3)); ctAt(w, 1 - hop * 1.5, hop < 1 ? Math.sin(hop * Math.PI) * .8 + hop * .72 : .72, .5 - hop * .3, -.4, .28); if (hop >= 1) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } } },
    { say: 'Grumpy suitcase: pack it, unpack it, or stay home? Comment below.',
      quiz: { q: 'What do you do with the grumpy suitcase?', options: ['Pack it', 'Unpack it', 'Stay home'], answer: 'Fun fact: cats need only about one-sixth of the light people need to see well.' },
      show: ['floor', 'sc', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.4, 6], look: [.2, .8, 0], fov: 54, to: { pos: [-2, 1.4, 6], look: [.2, .8, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.fur.visible = false; scOn(w); talk(w.f, t, false); ctAt(w, .65, 0, .5, -.9, .32); holdCard(w, true); } },
  ],
};
