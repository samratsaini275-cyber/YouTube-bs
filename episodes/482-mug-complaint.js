// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the mug complains about the cat.
// Hook: "This mug has a complaint." under 2 s; first frame shows a mug with a grumpy face on a table and a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#FCE9D9'), [0, 8, -4], w.wall);
  w.table = group(); box(3.4, .15, 1.6, mat('#8D6E63'), [0, 1.2, 0], w.table); for (const x of [-1.5, 1.5]) for (const z of [-.6, .6]) box(.12, 1.2, .12, mat('#6D4C41'), [x, .6, z], w.table);
  const mm = mat('#2ECC71', { rough: .35 });
  w.mg = group(); cyl(.5, .45, 1, mm, [0, .5, 0], w.mg, 24); w.drink = cyl(.44, .44, .02, mat('#8B5A2B'), [0, .9, 0], w.mg, 24); box(.3, .1, .12, mm, [.6, .75, 0], w.mg); box(.3, .1, .12, mm, [.6, .25, 0], w.mg); box(.1, .6, .12, mm, [.72, .5, 0], w.mg);
  w.f = face(k, w.mg, [-.05, .5, .47], .36);
  w.steam = group(); for (let i = 0; i < 3; i++) { const s = ball(.08, mat('#FFFFFF', { glow: .3 }), [(i - 1) * .15, 0, 0], w.steam); }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const mgAt = (w, x, y, z, s = 1, r = 0) => { w.mg.position.set(x, y, z); w.mg.scale.setScalar(s); w.mg.rotation.set(0, -.25, r); w.steam.visible = false; w.drink.material.color && w.drink.material.color.set('#8B5A2B'); };
const cam0 = { pos: [0, 2.2, 6.4], look: [0, 2.1, 0], fov: 50, to: { pos: [0, 2.2, 6], look: [0, 2.1, 0], fov: 48 } };
const env = { sky: '#FCE9D9', lightAt: [2, 9, 8], lightDist: 26 };

export default {
  id: '482',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE MUG',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS MUG', 'HAS A COMPLAINT'],
  title: 'This mug has a complaint',
  description: 'Used as a hat? By the cat. Tea time? The cat sniffs it, then leaves. And the cat? Five stars. So the mug filled itself with cold water. The cat lost interest. (A made-up comedy sketch.)',
  tags: ['funny', 'mug', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining mugs are made up. Quiz fact: the Ragdoll breed was developed in the early 1960s by Ann Baker of Riverside, California, and many Ragdolls go limp in your arms when cuddled, like a child\'s rag doll (TICA breed profile, "Ragdoll", tica.org/breed/ragdoll).'],
  setup,
  scenes: [
    { say: 'This mug has a complaint.', show: ['floor', 'wall', 'table', 'mg', 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { mgAt(w, -.6, 1.27, .2); talk(w.f, t); brow(w.f, .45); ctAt(w, .7, 1.27, .1, -.9, .3); holdCard(w, null); } },
    { say: 'Used as a hat? By the cat.', label: 'HAT', show: ['floor', 'wall', 'table', 'mg'], ...env,
      cam: { pos: [.3, 2.5, 4], look: [.3, 2.3, 0], fov: 50, to: { pos: [.3, 2.5, 3.7], look: [.3, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; ctAt(w, .2, 1.27, 0, -1.2, .3); w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); mgAt(w, hp.x, hp.y + .78, hp.z, .6, Math.PI + Math.sin(t * 3) * .1); w.mg.rotation.y = .3; w.f.rotation.z = Math.PI; talk(w.f, t); brow(w.f, .6); w.c.eyes.forEach(e => e.scale.y = .5); } },
    { say: 'Tea time? The cat sniffs it, then leaves.', label: 'SNIFF', show: ['floor', 'wall', 'table', 'mg', 'steam'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; w.f.rotation.z = 0; mgAt(w, -.6, 1.27, .2); w.steam.visible = true; w.steam.position.set(-.6, 2.4 + (t % 1) * .4, .2); talk(w.f, t); brow(w.f, -.4); const lv = p > .6; ctAt(w, lv ? .6 + (p - .6) * 4 : .25, 1.27, .1, lv ? 0 : -2.8, .3); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'table', 'mg', 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.f.rotation.z = 0; mgAt(w, -.6, 1.27, .2); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .7, 1.27, .1, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the mug filled itself with cold water. The cat lost interest.', label: 'BYE', show: ['floor', 'wall', 'table', 'mg'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; w.f.rotation.z = 0; mgAt(w, -.6, 1.27, .2); w.drink.material.color.set(p > .3 ? '#9FD3F0' : '#8B5A2B'); talk(w.f, t, p < .4 || p > .8); brow(w.f, p > .6 ? .6 : -.3); const gone = p > .55; ctAt(w, gone ? .7 + (p - .55) * 5 : .7, 1.27, .1, gone ? 0 : -.9, .3); w.c.head.rotation.z = gone ? .3 : 0; } },
    { say: 'Grumpy mug: wash it, fill it, or let the cat wear it? Comment below.',
      quiz: { q: 'What do you do with the grumpy mug?', options: ['Wash it', 'Fill it', 'Let the cat wear it'], answer: 'Fun fact: many Ragdoll cats go limp like a rag doll when you cuddle them.' },
      show: ['floor', 'table', 'mg', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.1, 6], look: [0, 1.9, 0], fov: 54, to: { pos: [-2, 2.1, 6], look: [0, 1.9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.f.rotation.z = 0; mgAt(w, -.6, 1.27, .2); talk(w.f, t, false); ctAt(w, .7, 1.27, .1, -.9, .32); holdCard(w, true); } },
  ],
};
