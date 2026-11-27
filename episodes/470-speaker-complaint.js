// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the smart speaker complains about the cat.
// Hook: "This speaker has a complaint." under 2 s; first frame shows a smart speaker with a grumpy face and a cat holding a score card.

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
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#E8F6F3'), [0, 8, -4], w.wall);
  w.table = group(); box(3, .15, 1.6, mat('#6E2C00'), [0, 1.2, 0], w.table); for (const x of [-1.3, 1.3]) for (const z of [-.65, .65]) box(.12, 1.2, .12, mat('#4A235A'), [x, .6, z], w.table);
  w.spk = group(); cyl(.35, .38, .9, mat('#34495E'), [0, .45, 0], w.spk, 24); cyl(.34, .34, .04, mat('#5DADE2', { glow: .8 }), [0, .91, 0], w.spk, 24);
  w.f = face(k, w.spk, [0, .5, .36], .32);
  w.notes = group(); for (let i = 0; i < 3; i++) { const n = group([i * .3 - .3, i * .15, 0], w.notes); k.ball(.07, mat('#F4D03F', { glow: .6 }), [0, 0, 0], n); box(.02, .25, .02, mat('#F4D03F', { glow: .6 }), [.06, .12, 0], n); }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const spkOn = (w, fall = 0) => { w.table.position.set(0, 0, -.5); w.spk.position.set(-.5 - fall * .7, 1.28 - fall * fall * 1.28, -.4); w.spk.rotation.set(0, .3, fall * 1.4); };

export default {
  id: '470',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SPEAKER',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SPEAKER', 'HAS A COMPLAINT'],
  title: 'This speaker has a complaint',
  description: 'It plays a song? Knocked off the table. Your voice comes out of it? The cat looks behind it for you. And the cat? Five stars. So the speaker went quiet. The cat napped on it. (A made-up comedy sketch.)',
  tags: ['funny', 'speaker', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining speakers are made up. Quiz fact: in experiments where a cat heard its owner calling its name from one speaker and then suddenly from a speaker in another place, cats showed the most surprise, suggesting they keep a mental map of where their unseen owner is (Takagi et al., "Socio-spatial cognition in cats: Mentally mapping owner\'s location from voice", PLOS ONE, 2021).'],
  setup,
  scenes: [
    { say: 'This speaker has a complaint.', show: ['floor', 'wall', 'table', 'spk', 'card'], sky: '#E8F6F3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6], look: [0, 2.05, 0], fov: 50, to: { pos: [0, 2.2, 5.6], look: [0, 2.05, 0], fov: 48 } },
      update: (w, p, t) => { spkOn(w); w.notes.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .7, 1.28, -.3, -.9, .3); holdCard(w, null); } },
    { say: 'It plays a song? Knocked off.', label: 'OOPS', show: ['floor', 'wall', 'table', 'spk', 'notes'], sky: '#E8F6F3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 6.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2, 6], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; const k1 = Math.min(1, Math.max(0, (p - .35) * 2.5)); spkOn(w, k1); w.notes.visible = p < .4; w.notes.position.set(-.5, 2.5 + .1 * Math.sin(t * 4), -.4); talk(w.f, t); brow(w.f, k1 > 0 ? -.4 : .2); ctAt(w, .3, 1.28, -.4, Math.PI * .95, .3); w.c.paw.position.set(1.3 + k1 * .5, .6, .4); } },
    { say: 'Your voice comes out? The cat looks behind it.', label: 'WHERE?', show: ['floor', 'wall', 'table', 'spk'], sky: '#E8F6F3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6], look: [0, 2.05, 0], fov: 50, to: { pos: [0, 2.2, 5.6], look: [0, 2.05, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; spkOn(w); talk(w.f, t); brow(w.f, -.2); const peek = Math.min(1, p * 2); ctAt(w, .7 - peek * 1.4, 1.28, -.3 - peek * .6, -.9 + peek * 2.5, .3); w.c.head.rotation.z = .3; w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'table', 'spk', 'card'], sky: '#E8F6F3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6], look: [0, 2.05, 0], fov: 50, to: { pos: [0, 2.2, 5.6], look: [0, 2.05, 0], fov: 48 } },
      update: (w, p, t) => { spkOn(w); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .7, 1.28, -.3, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the speaker went quiet. The cat napped on it.', label: 'NAP', show: ['floor', 'wall', 'table', 'spk'], sky: '#E8F6F3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.4, 6], look: [0, 2.1, 0], fov: 50, to: { pos: [0, 2.4, 5.6], look: [0, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; spkOn(w); talk(w.f, t, p < .3); brow(w.f, p < .5 ? -.2 : .5); const hop = Math.max(0, Math.min(1, (p - .35) * 3)); ctAt(w, .7 - hop * 1.15, hop < 1 ? 1.28 + Math.sin(hop * Math.PI) * .8 + hop * .9 : 2.18, -.3 - hop * .15, -.4, .26); if (hop >= 1) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } } },
    { say: 'What should the speaker play for cats? Comment below.',
      quiz: { q: 'What should it play for cats?', options: ['Bird songs', 'Your voice', 'Nothing, ever'], answer: 'Fun fact: cats seem surprised when their owner\'s voice suddenly comes from a new spot.' },
      show: ['floor', 'table', 'spk', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.2, 6], look: [0, 1.9, 0], fov: 54, to: { pos: [-2, 2.2, 6], look: [0, 1.9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.notes.visible = false; spkOn(w); talk(w.f, t, false); ctAt(w, .7, 1.28, -.3, -.9, .32); holdCard(w, true); } },
  ],
};
