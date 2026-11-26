// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate your hugs out loud.
// Hook: the rule under 2 s; first frame shows a person with open arms and a cat holding up a score card.

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
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#F5E0C8'), [0, 8, -4], w.wall);
  w.sofa = group(); box(5, 1, 2, mat('#3FA34D'), [0, .5, 0], w.sofa); box(5, 1.6, .5, mat('#2F8A3D'), [0, 1.5, -.75], w.sofa);
  w.p = person(k, k.scene, '#7C5CC4');
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '432',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE HUGS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE HUGS'],
  title: 'In this town, cats rate your hugs',
  description: 'A big squeeze? Escape. A chin scratch? Five stars. A slow blink? It blinks back. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'hug', 'shorts'],
  sources: ['Comedy sketch: cat hug reviews are made up. Quiz fact: in experiments, cats were more likely to slow-blink back at people who slow-blinked at them, and more likely to approach those people (Humphrey et al., "The role of cat eye narrowing movements in cat-human communication", Scientific Reports, 2020).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate hugs.', show: ['floor', 'wall', 'sofa', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.4, 11], look: [.2, 3.3, 0], fov: 50, to: { pos: [.3, 3.4, 10.5], look: [.2, 3.3, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.position.set(1.3, 0, -1.4); pAt(w.p, -1.2, 0, .3, .4, .9); pose(w.p, 1.4, .3); w.p.mouth.scale.set(1.2, 2, 1); ctAt(w, 1.3, 1, -1.1, Math.PI + .6, .42); holdCard(w, null); } },
    { say: 'A big squeeze? Escape.', label: 'NOPE', show: ['floor', 'wall', 'sofa'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.2, 10], look: [.2, 2.8, 0], fov: 50, to: { pos: [.3, 3.2, 9.5], look: [.2, 2.8, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.sofa.position.set(1.3, 0, -1.4); const grab = p < .45; pAt(w.p, -.4, 0, .4, .2, .9); pose(w.p, grab ? .3 : 1.6, grab ? 1.3 : .2); w.p.mouth.scale.set(1.2, grab ? 2 : .5, 1); const f = grab ? 0 : (p - .45) * 2.4; ctAt(w, -.1 + f * 3, grab ? 2.2 : Math.max(0, 2.2 - f * 3), .9, grab ? -.3 : -.2, .36); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.6); w.c.body.scale.set(grab ? 1.2 : 1.6, grab ? 1.2 : .8, 1); } },
    { say: 'A chin scratch? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'sofa', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 2.8, 8.5], look: [.4, 2.2, 0], fov: 50, to: { pos: [.4, 2.8, 8], look: [.4, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.position.set(1, 0, -1); ctAt(w, 1, 1, -.7, -.5, .42); w.c.head.rotation.z = .2 + .05 * Math.sin(t * 6); w.c.eyes.forEach(e => e.scale.y = .15); pAt(w.p, -.7, 0, .4, .5, .9); pose(w.p, .3, 1.2); w.p.arms[1].rotation.x = -1.2 + .15 * Math.sin(t * 10); holdCard(w, p > .45 ? true : null); } },
    { say: 'A slow blink? It blinks back.', label: 'BLINK', show: ['floor', 'wall', 'sofa'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 2.8, 8.5], look: [.4, 2.4, 0], fov: 50, to: { pos: [.4, 2.8, 8], look: [.4, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.sofa.position.set(1, 0, -1); ctAt(w, 1, 1, -.7, Math.PI + .6, .42); pAt(w.p, -1, 0, .4, .5, .9); pose(w.p, .2, 0); const b1 = Math.max(0, Math.sin(t * 2.4)), b2 = Math.max(0, Math.sin(t * 2.4 - 1)); w.p.eyes.forEach(e => e.scale.y = 1 - .85 * b1); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * (1 - .85 * b2)); } },
    { say: 'Cat hug critics: fair, funny, or way too picky? Comment below.',
      quiz: { q: 'Cat hug critics are…', options: ['Fair', 'Funny', 'Way too picky'], answer: 'Made up. But real cats often slow-blink back if you slow-blink at them.' },
      show: ['floor', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.sofa.visible = false; w.p.root.visible = false; w.wall.visible = false; ctAt(w, .4, 0, 0, -.6, .7); holdCard(w, true); } },
  ],
};
