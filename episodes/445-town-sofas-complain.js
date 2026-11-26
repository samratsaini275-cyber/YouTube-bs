// Narrative 25: "In This Town… (season 4: things complain to the cat)". Opener: the sofa complains about the cat.
// Hook: the rule under 2 s; first frame shows a sofa with a grumpy face next to a cat holding a score card.

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
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#E8F1D4'), [0, 8, -4], w.wall);
  w.sofa = group(); const blue = mat('#2E6DB4'), dk = mat('#235796');
  box(4, 1, 1.8, blue, [0, .7, 0], w.sofa); box(4, 1.6, .5, dk, [0, 1.6, -.65], w.sofa); for (const x of [-2.15, 2.15]) box(.5, 1.5, 1.8, dk, [x, .95, 0], w.sofa);
  for (const x of [-1.8, -.6, .6, 1.8]) box(.12, .2, .12, mat('#3A2A1A'), [x, .1, .7], w.sofa);
  w.f = face(k, w.sofa, [0, .72, .93], .7);
  w.fur = group([0, 0, 0], w.sofa); for (let i = 0; i < 14; i++) { const t = k.ball(.12, mat('#F2A04A'), [-1.8 + Math.random() * 3.6, 1.25 + Math.random() * .1, -.6 + Math.random() * 1.2], w.fur); t.scale.y = .4; }
  w.scr = group([2.15, 1.2, .91], w.sofa); for (let i = 0; i < 3; i++) box(.04, .6, .02, mat('#F5E6C8'), [-.12 + i * .12, 0, 0], w.scr);
  w.sweater = group([0, 0, 0], w.sofa); for (let i = 0; i < 5; i++) box(4.7, .34, 2.0, mat(i % 2 ? '#E74C3C' : '#F4F6F7'), [0, .45 + i * .34, .02], w.sweater); box(4.7, 1.7, .6, mat('#E74C3C'), [0, 1.65, -.68], w.sweater);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const sofaOn = (w, sweater = false) => { w.sofa.position.set(-.8, 0, -1); w.sofa.scale.setScalar(.75); w.sweater.visible = sweater; w.f.position.set(0, .72, sweater ? 1.06 : .93); w.f.visible = true; };

export default {
  id: '445',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SOFAS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'SOFAS COMPLAIN'],
  title: 'In this town, sofas complain to cats',
  description: 'Claws? Every single day. Fur? Everywhere. So the sofa wears a sweater. The cat sits on it anyway. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'sofa', 'shorts'],
  sources: ['Comedy sketch: complaining sofas are made up. Quiz fact: domestic cats have retractable claws; the claws retract when not in use (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, sofas complain.', show: ['floor', 'wall', 'sofa', 'card'], sky: '#E8F1D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 7.5], look: [.2, .95, 0], fov: 50, to: { pos: [.2, 1.4, 7], look: [.2, .95, 0], fov: 48 } },
      update: (w, p, t) => { sofaOn(w); w.fur.visible = false; w.scr.visible = false; talk(w.f, t); brow(w.f, .35); ctAt(w, 1.3, 0, .1, -1.2, .34); holdCard(w, null); } },
    { say: 'Claws? Every single day.', label: 'SCRATCH', show: ['floor', 'wall', 'sofa'], sky: '#E8F1D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 1.4, 7.5], look: [.3, .95, 0], fov: 50, to: { pos: [.3, 1.4, 7], look: [.3, .95, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; sofaOn(w); w.fur.visible = false; w.scr.visible = p > .3; talk(w.f, t); brow(w.f, .5); ctAt(w, 1.25, 0, -.6, Math.PI * .85, .34); w.c.paw.position.set(1.3, 1.9 + .35 * Math.sin(t * 16), .9); w.c.eyes.forEach(e => e.scale.y = .25); } },
    { say: 'Fur? Everywhere.', label: '5 STARS', show: ['floor', 'wall', 'sofa', 'card'], sky: '#E8F1D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 7.5], look: [.2, .95, 0], fov: 50, to: { pos: [.2, 1.4, 7], look: [.2, .95, 0], fov: 48 } },
      update: (w, p, t) => { sofaOn(w); w.fur.visible = true; w.scr.visible = true; talk(w.f, t, p < .5); brow(w.f, .5); ctAt(w, 1.3, 0, .1, -1.2, .34); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the sofa? Wears a sweater.', label: 'NICE TRY', show: ['floor', 'wall', 'sofa'], sky: '#E8F1D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.4, 7.5], look: [.2, .95, 0], fov: 50, to: { pos: [.2, 1.4, 7], look: [.2, .95, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; sofaOn(w, true); w.fur.visible = false; w.scr.visible = false; talk(w.f, t, p < .4); brow(w.f, p < .5 ? -.2 : .5); const hop = Math.min(1, Math.max(0, (p - .45) * 3)); ctAt(w, 1.3 - hop * 1.4, hop < 1 ? Math.sin(hop * Math.PI) * 1 + hop * .95 : .95, .1 - hop * .9, -.4, .34); if (hop >= 1) w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'Who wins: the sofa or the cat? Comment below.',
      quiz: { q: 'Who wins?', options: ['The sofa', 'The cat', 'The sweater'], answer: 'Made up. But real cats keep their claws pulled in when not using them.' },
      show: ['floor', 'sofa', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.4, 8.5], look: [0, 1.6, 0], fov: 54, to: { pos: [-2, 2.4, 8.5], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; sofaOn(w, true); w.fur.visible = false; w.scr.visible = false; talk(w.f, t, false); brow(w.f, .3); ctAt(w, -.6, .95, -.8, -.5, .36); holdCard(w, true); } },
  ],
};
