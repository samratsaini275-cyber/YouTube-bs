// Narrative 26: "This X Has a Complaint (cat edition)". Opener: the rug complains about the cat (format copied from 212/213).
// Hook: "This rug has a complaint." under 2 s; first frame shows a rug with a grumpy face and a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#FDF2E9'), [0, 8, -4], w.wall);
  w.rug = group(); box(3.4, .06, 2.2, mat('#C0392B'), [0, .03, 0], w.rug); box(2.8, .065, 1.6, mat('#F5B041'), [0, .035, 0], w.rug); box(2.2, .07, 1.0, mat('#1F618D'), [0, .04, 0], w.rug);
  w.f = face(k, w.rug, [0, .08, .3], .55); w.f.rotation.x = -Math.PI / 2;
  w.fur = group([0, 0, 0], w.rug); for (let i = 0; i < 16; i++) { const t = ball(.09, mat('#F2A04A'), [(Math.random() - .5) * 2.8, .1, (Math.random() - .5) * 1.8], w.fur); t.scale.y = .35; }
  w.pulls = group([0, 0, 0], w.rug); for (let i = 0; i < 5; i++) { const s = cyl(.02, .02, .35, mat('#F5B041'), [1.2 + (i % 2) * .1, .2, -.6 + i * .3], w.pulls, 4); s.rotation.z = .5 * (i % 2 ? 1 : -1); }
  w.roll = group(); cyl(.35, .35, 3.4, mat('#C0392B'), [0, 0, 0], w.roll, 18).rotation.z = Math.PI / 2;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const rugOn = (w) => { w.rug.position.set(0, 0, 0); w.rug.rotation.set(.0, 0, 0); };

export default {
  id: '465',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE RUG',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS RUG', 'HAS A COMPLAINT'],
  title: 'This rug has a complaint',
  description: 'Fur, every single day. Claws pulling at the threads. And the cat calls it five stars. So the rug rolled itself up. The cat sleeps on the roll. (A made-up comedy sketch.)',
  tags: ['funny', 'rug', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining rugs are made up. Quiz fact: a cat\'s coat has guard hairs plus down and awn hairs; the down and awn hairs (the undercoat) are more numerous than the guard hairs (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'This rug has a complaint.', show: ['floor', 'wall', 'rug', 'card'], sky: '#FDF2E9', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.6, 5.2], look: [0, .3, .25], fov: 50, to: { pos: [0, 3.4, 4.9], look: [0, .3, .25], fov: 48 } },
      update: (w, p, t) => { rugOn(w); w.fur.visible = false; w.pulls.visible = false; w.roll.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .9, 0, -.6, -1.2, .34); holdCard(w, null); } },
    { say: 'Fur. Every single day.', label: 'FUR', show: ['floor', 'wall', 'rug'], sky: '#FDF2E9', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.6, 5.2], look: [0, .3, .25], fov: 50, to: { pos: [0, 3.4, 4.9], look: [0, .3, .25], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; rugOn(w); w.fur.visible = true; w.fur.children.forEach((c, i) => c.visible = i < p * 22); w.pulls.visible = false; w.roll.visible = false; talk(w.f, t); brow(w.f, .55); ctAt(w, -.6 + p * 1.2, 0, -.4, -.3, .34); w.cr.rotation.z = .2 * Math.sin(t * 6); w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'Claws pulling every thread.', label: 'PULL', show: ['floor', 'wall', 'rug'], sky: '#FDF2E9', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.6, 5.2], look: [0, .3, .25], fov: 50, to: { pos: [0, 3.4, 4.9], look: [0, .3, .25], fov: 48 } },
      update: (w, p, t) => { rugOn(w); w.fur.visible = true; w.pulls.visible = p > .3; w.roll.visible = false; talk(w.f, t); brow(w.f, .55); ctAt(w, .4, 0, -.9, -2.6, .34); w.c.paw.position.set(1.3, .5 + .3 * Math.abs(Math.sin(t * 12)), .9); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'rug', 'card'], sky: '#FDF2E9', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.6, 5.2], look: [0, .3, .25], fov: 50, to: { pos: [0, 3.4, 4.9], look: [0, .3, .25], fov: 48 } },
      update: (w, p, t) => { rugOn(w); w.fur.visible = true; w.pulls.visible = true; w.roll.visible = false; talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .9, 0, -.6, -1.2, .34); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the rug rolled itself up.', label: 'NICE TRY', show: ['floor', 'wall', 'roll'], sky: '#FDF2E9', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 6], look: [0, .6, 0], fov: 50, to: { pos: [0, 2.2, 5.6], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.rug.visible = false; w.roll.position.set(0, .35, 0); const hop = Math.max(0, Math.min(1, (p - .4) * 3)); ctAt(w, 1.8 - hop * 1.8, hop < 1 ? Math.sin(hop * Math.PI) * .9 + hop * .62 : .62, .1, -.4, .34); if (hop >= 1) { w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } } },
    { say: 'Grumpy rug: roll it, wash it, or give up? Comment below.',
      quiz: { q: 'What do you do with the grumpy rug?', options: ['Roll it', 'Wash it', 'Give it to the cat'], answer: 'Fun fact: a cat\'s soft undercoat hairs outnumber its long outer guard hairs.' },
      show: ['floor', 'rug', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3.4, 5.4], look: [0, .3, .25], fov: 54, to: { pos: [-2, 3.4, 5.4], look: [0, .3, .25] } },
      update: (w, p, t) => { w.wall.visible = false; w.roll.visible = false; rugOn(w); w.fur.visible = true; w.pulls.visible = false; talk(w.f, t, false); brow(w.f, .3); ctAt(w, .9, 0, -.6, -1.2, .36); w.c.body.scale.set(1.4, 1, 1); holdCard(w, true); } },
  ],
};
