// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats review your singing.
// Hook: the rule under 2 s; first frame shows a person singing into a microphone and a cat holding a score card.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));


function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#C8D8F0'), [0, 8, -4], w.wall);
  w.p = person(k, k.scene, '#E2453C');
  w.mic = group(); cyl(.05, .05, .5, mat('#333333'), [0, -.25, 0], w.mic, 8); ball(.12, mat('#888888', { metal: .6 }), [0, .05, 0], w.mic);
  w.notes = group(); for (let i = 0; i < 5; i++) { const n = group([0, 0, 0], w.notes); ball(.1, mat('#111111'), [0, 0, 0], n).scale.set(1.3, 1, 1); cyl(.02, .02, .35, mat('#111111'), [.1, .18, 0], n, 4); n.userData.i = i; }
  w.door = group(); box(1.8, 3.8, .2, mat('#8B5A2B'), [0, 1.9, 0], w.door);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.12, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.stool = group(); cyl(.9, .9, .2, mat('#7C5CC4'), [0, 1.3, 0], w.stool, 16); for (const a of [0, 2.1, 4.2]) cyl(.07, .07, 1.3, mat('#5A3A1A'), [Math.cos(a) * .6, .65, Math.sin(a) * .6], w.stool, 6);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };
const singer = (w, t, loud = 1) => { pAt(w.p, -1.1, 0, .2, .4, .9); pose(w.p, .35, .3); w.p.mouth.scale.set(1.3, 1.5 + loud * 1.5 * Math.abs(Math.sin(t * 9)), 1); w.p.eyes.forEach(e => e.scale.y = .3); w.p.root.updateWorldMatrix(true, true); const m = w.p.mouth.getWorldPosition(new w.k.THREE.Vector3()); w.mic.position.set(m.x + .1, m.y - .1, m.z + .35); w.mic.rotation.set(.5, 0, 0); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .8 + i / 5) % 1; n.position.set(m.x + .3 + q * 2, m.y + q * 1.4 + .2 * Math.sin(t * 5 + i), m.z + .2); n.visible = true; }); };
const zz = (w, t, on, at) => w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(at[0] + q * .6, at[1] + q * 1.3, at[2]); z.scale.setScalar(.6 + q * 1.2); z.visible = on; });

export default {
  id: '430',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE SINGING',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE SINGING'],
  title: 'In this town, cats rate your singing',
  description: 'Shower song? Two stars. Karaoke? The cat leaves the room. A lullaby? Fast asleep. Five stars. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'music', 'shorts'],
  sources: ['Comedy sketch: cat music critics are made up. Quiz fact: cats can hear sounds up to about 64,000 Hz, far higher than the roughly 23,000 Hz limit for people (Louisiana State University School of Veterinary Medicine, "How Well Do Dogs and Other Animals Hear?").'],
  setup,
  scenes: [
    { say: 'In this town, cats rate singing.', show: ['floor', 'wall', 'mic', 'notes', 'card', 'stool'], sky: '#C8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.6, 12.5], look: [.2, 3.6, 0], fov: 50, to: { pos: [.3, 3.6, 12], look: [.2, 3.6, 0], fov: 48 } },
      update: (w, p, t) => { w.door.visible = false; w.zzz.visible = false; singer(w, t); w.stool.position.set(1.4, 0, .6); ctAt(w, 1.4, 1.4, .6, Math.PI + .7, .42); holdCard(w, null); } },
    { say: 'Shower song? Two stars.', label: '2 STARS', show: ['floor', 'wall', 'mic', 'notes', 'card', 'stool'], sky: '#C8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.4, 11.5], look: [.2, 3.3, 0], fov: 50, to: { pos: [.3, 3.4, 11], look: [.2, 3.3, 0], fov: 48 } },
      update: (w, p, t) => { singer(w, t); w.stool.position.set(1.4, 0, .6); ctAt(w, 1.4, 1.4, .6, Math.PI + .7, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .3); holdCard(w, p > .45 ? false : null); } },
    { say: 'Karaoke? It leaves the room.', label: 'BYE', show: ['floor', 'wall', 'mic', 'notes', 'door'], sky: '#C8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.6, 3.2, 12], look: [.6, 2.6, 0], fov: 52, to: { pos: [.6, 3.2, 11.5], look: [.6, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.card.visible = false; singer(w, t, 2); w.door.position.set(2.8, 0, -2.6); w.door.rotation.y = -1.2; ctAt(w, 1 + p * 1.6, 0, .4 - p * 2.6, Math.PI / 2 + .8, .45); } },
    { say: 'A lullaby? Asleep. Five stars.', label: '5 STARS', show: ['floor', 'wall', 'mic', 'card', 'zzz', 'stool'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3, 10], look: [.2, 2.5, 0], fov: 50, to: { pos: [.3, 3, 9.5], look: [.2, 2.5, 0], fov: 48 } },
      update: (w, p, t) => { w.door.visible = false; w.notes.visible = false; pAt(w.p, -1.1, 0, .2, .4, .9); pose(w.p, .35, .3); w.p.mouth.scale.set(1, 1.2, 1); w.p.eyes.forEach(e => e.scale.y = .3); w.p.root.updateWorldMatrix(true, true); const m2 = w.p.mouth.getWorldPosition(new w.k.THREE.Vector3()); w.mic.position.set(m2.x + .1, m2.y - .1, m2.z + .35); w.mic.rotation.set(.5, 0, 0); w.stool.position.set(1.4, 0, .6); ctAt(w, 1.4, 1.4, .6, Math.PI + .7, .42); w.c.eyes.forEach(e => e.scale.y = .12); w.c.body.scale.set(1.5, .85, 1.1); holdCard(w, true); w.card.position.y -= 1.2 * Math.min(1, p * 2); w.card.rotation.z = .5 * Math.min(1, p * 2); zz(w, t, true, [1.6, 3.2, .8]); } },
    { say: 'Cat music critics: honest, funny, or way too rude? Comment below.',
      quiz: { q: 'Cat music critics are…', options: ['Honest', 'Funny', 'Way too rude'], answer: 'Made up. Fun fact: cats hear sounds far higher than people can.' },
      show: ['floor', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.card.rotation.z = 0; w.zzz.visible = false; w.mic.visible = false; w.p.root.visible = false; w.wall.visible = false; ctAt(w, .4, 0, 0, -.6, .7); holdCard(w, true); } },
  ],
};
