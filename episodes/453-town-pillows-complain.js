// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the pillow complains about the cat.
// Hook: the rule under 2 s; first frame shows a pillow with a face on a bed next to a cat holding a score card.

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

function pillow(k, parent, col) { const p = k.ball(.9, k.mat(col), [0, 0, 0], parent); p.scale.set(1.3, .35, .8); return p; }

function setup(k) {
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#B08A68', 0);
  w.wall = group(); box(40, 16, .3, mat('#EBDEF0'), [0, 8, -4], w.wall);
  w.bed = group(); box(4.4, .8, 3.6, mat('#FFFFFF'), [0, .7, 0], w.bed); box(4.6, .4, 3.8, mat('#6C3483'), [0, .2, 0], w.bed); box(4.6, 2.2, .3, mat('#6C3483'), [0, 1.1, -1.9], w.bed); box(4.3, .1, 2.2, mat('#AF7AC5'), [0, 1.12, .7], w.bed);
  w.pg = group([-.6, 1.35, -1.1], w.bed); pillow(k, w.pg, '#F8F9F9'); w.f = face(k, w.pg, [0, .05, .72], .45);
  w.p2 = group([1.4, 1.35, -1.1], w.bed); pillow(k, w.p2, '#FDEBD0');
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const bedOn = (w, two = false) => { w.bed.position.set(0, 0, -1); w.p2.visible = two; w.pg.scale.set(1, 1, 1); };

export default {
  id: '453',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PILLOWS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'PILLOWS COMPLAIN'],
  title: 'In this town, pillows complain to cats',
  description: 'Making biscuits? All night. Your spot? Stolen. So the pillow gets a second pillow. The cat takes both. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'pillow', 'shorts'],
  sources: ['Comedy sketch: complaining pillows are made up. Quiz fact: in a 2019 attachment study, most cats (around 60%) were classed as securely attached to their caregiver, spending time with them but also exploring (Vitale, Behnke & Udell, "Attachment bonds between domestic cats and humans", Current Biology, 2019; summary from the American Veterinary Society of Animal Behavior).'],
  setup,
  scenes: [
    { say: 'In this town, pillows complain.', show: ['floor', 'wall', 'bed', 'card'], sky: '#EBDEF0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 5.8], look: [0, 1.95, -1], fov: 50, to: { pos: [0, 2.6, 5.4], look: [0, 1.95, -1], fov: 48 } },
      update: (w, p, t) => { bedOn(w); talk(w.f, t); brow(w.f, .4); ctAt(w, .75, 1.17, -.9, -.8, .34); holdCard(w, null); } },
    { say: 'Making biscuits? All night.', label: 'BISCUITS', show: ['floor', 'wall', 'bed'], sky: '#EBDEF0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 5.8], look: [0, 1.95, -1], fov: 50, to: { pos: [0, 2.6, 5.4], look: [0, 1.95, -1], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; bedOn(w); talk(w.f, t); brow(w.f, .55); w.pg.scale.y = 1 - .12 * Math.abs(Math.sin(t * 8)); ctAt(w, .5, 1.17, -1.4, Math.PI * .9, .34); w.c.paw.position.set(1.2, .6 + .3 * Math.abs(Math.sin(t * 8)), .5); w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'Your spot? Stolen.', label: '5 STARS', show: ['floor', 'wall', 'bed', 'card'], sky: '#EBDEF0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 5.8], look: [0, 1.95, -1], fov: 50, to: { pos: [0, 2.6, 5.4], look: [0, 1.95, -1], fov: 48 } },
      update: (w, p, t) => { bedOn(w); talk(w.f, t, p < .5); brow(w.f, .5); ctAt(w, -.4, 1.55, -1.6, -.3, .34); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = p > .45 ? 1 : .15); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the pillow? Gets a second pillow.', label: 'BOTH', show: ['floor', 'wall', 'bed'], sky: '#EBDEF0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 5.8], look: [0, 1.95, -1], fov: 50, to: { pos: [0, 2.6, 5.4], look: [0, 1.95, -1], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; bedOn(w, true); talk(w.f, t, p < .45); brow(w.f, p < .5 ? -.2 : .5); const s = p > .5; ctAt(w, s ? .4 : -.4, 1.55, -1.6, -.3, .34); w.c.body.scale.set(s ? 2.6 : 1.5, .8, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'Who owns the pillow? Comment below.',
      quiz: { q: 'Who owns the pillow?', options: ['You', 'The cat', 'The cat, obviously'], answer: 'Made up. But in one study, most cats were securely attached to their owner.' },
      show: ['floor', 'bed', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.6, 8], look: [0, 1.9, 0], fov: 54, to: { pos: [-2, 2.6, 8], look: [0, 1.9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; bedOn(w); talk(w.f, t, false); brow(w.f, .2); ctAt(w, 1.1, 1.17, -.9, -.8, .36); holdCard(w, true); } },
  ],
};
