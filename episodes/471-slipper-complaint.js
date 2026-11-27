// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: a fluffy slipper complains about the cat.
// Hook: "This slipper has a complaint." under 2 s; first frame shows a slipper with a grumpy face and a cat holding a score card.

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
  const { mat, box, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FDEDEC'), [0, 8, -4], w.wall);
  w.sl = group(); const pink = mat('#F1948A', { rough: .95 }); box(1.4, .2, .7, mat('#FADBD8'), [0, .1, 0], w.sl); const toe = ball(.42, pink, [.35, .3, 0], w.sl); toe.scale.set(1.3, .7, 1); box(.8, .3, .1, pink, [-.25, .35, .32], w.sl); box(.8, .3, .1, pink, [-.25, .35, -.32], w.sl);
  w.f = face(k, w.sl, [.55, .35, .3], .28);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const slAt = (w, x, z, ry = -.4, hop = 0) => { w.sl.position.set(x, hop, z); w.sl.rotation.set(0, ry, 0); w.sl.scale.setScalar(.9); };

export default {
  id: '471',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SLIPPER',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SLIPPER', 'HAS A COMPLAINT'],
  title: 'This slipper has a complaint',
  description: 'Slept in? Every night. Dragged off? Twice a day. And the cat? Five stars. So the slipper walked away. The cat followed, tail up. (A made-up comedy sketch.)',
  tags: ['funny', 'slipper', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining slippers are made up. Quiz fact: in a study of a free-ranging cat colony, the tail-up display worked as a friendly signal and was often followed by rubbing (Cafazzo & Natoli, "The social function of tail up in the domestic cat (Felis silvestris catus)", Behavioural Processes, 2009; summarised in Deputte et al., "Heads and Tails: An Analysis of Visual Signals in Cats", Animals, 2021).'],
  setup,
  scenes: [
    { say: 'This slipper has a complaint.', show: ['floor', 'wall', 'sl', 'card'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.2, 5.5], look: [0, .35, 0], fov: 50, to: { pos: [0, 1.2, 5.1], look: [0, .35, 0], fov: 48 } },
      update: (w, p, t) => { slAt(w, -.5, .4); talk(w.f, t); brow(w.f, .45); ctAt(w, .7, 0, -.4, -.9, .3); holdCard(w, null); } },
    { say: 'Slept in? Every night.', label: 'SNUG', show: ['floor', 'wall', 'sl'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 5], look: [0, .35, 0], fov: 50, to: { pos: [0, 1.3, 4.6], look: [0, .35, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; slAt(w, -.1, .3); talk(w.f, t); brow(w.f, .55); ctAt(w, .05, .2, .1, -.4, .28); w.c.body.scale.set(1.4, .8 + .03 * Math.sin(t * 2), 1); w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'Dragged off? Twice a day.', label: 'STOLEN', show: ['floor', 'wall', 'sl'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.4, 6], look: [0, .35, 0], fov: 50, to: { pos: [0, 1.4, 5.6], look: [0, .35, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; const x = 1.4 - p * 2.6; ctAt(w, x, .06 * Math.abs(Math.sin(t * 12)), 0, Math.PI, .3); w.c.head.updateWorldMatrix(true, false); const m = w.c.head.localToWorld(new w.k.THREE.Vector3(1.2, -1, 0)); slAt(w, m.x - .2, m.z + .1, Math.PI); w.sl.scale.setScalar(.9); talk(w.f, t); brow(w.f, -.4); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'sl', 'card'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.2, 5.5], look: [0, .35, 0], fov: 50, to: { pos: [0, 1.2, 5.1], look: [0, .35, 0], fov: 48 } },
      update: (w, p, t) => { slAt(w, -.5, .4); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .7, 0, -.4, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the slipper walked away. The cat followed, tail up.', label: 'FRIENDS', show: ['floor', 'wall', 'sl'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.3, 6], look: [0, .35, 0], fov: 50, to: { pos: [0, 1.3, 5.6], look: [0, .35, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; const x = .9 - p * 2; slAt(w, x, .4, Math.PI, .1 * Math.abs(Math.sin(t * 9))); talk(w.f, t, p < .5); brow(w.f, p < .5 ? -.3 : .2); ctAt(w, x + 1.1, .05 * Math.abs(Math.sin(t * 9)), .2, Math.PI, .3); w.c.tail.rotation.z = -.15; } },
    { say: 'Whose slipper is it now? Comment below.',
      quiz: { q: 'Whose slipper is it now?', options: ['Yours', 'The cat\'s', 'Nobody\'s'], answer: 'Fun fact: a cat walking up to you with its tail held high is a friendly hello.' },
      show: ['floor', 'sl', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.1, 5], look: [0, .65, 0], fov: 54, to: { pos: [-2, 1.1, 5], look: [0, .65, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.c.tail.rotation.z = 0; slAt(w, -.5, .4); talk(w.f, t, false); ctAt(w, .7, 0, -.4, -.9, .32); holdCard(w, true); } },
  ],
};
