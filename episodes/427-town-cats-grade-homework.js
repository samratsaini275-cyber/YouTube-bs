// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats grade your homework out loud.
// Hook: the rule under 2 s; first frame shows a cat on a desk beside homework, holding a score card, a kid waiting.

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
  w.wall = group(); box(40, 16, .3, mat('#D8ECD0'), [0, 8, -4], w.wall);
  w.desk = group(); box(4.4, .2, 2.2, mat('#C8A070'), [0, 2, 0], w.desk); for (const x of [-2, 2]) for (const z of [-.9, .9]) cyl(.07, .07, 2, mat('#666666'), [x, 1, z], w.desk, 6);
  w.paper = group(); box(1.2, .02, .9, mat('#FFFFFF'), [0, 0, 0], w.paper); for (let i = 0; i < 4; i++) box(.9, .01, .04, mat('#3B6FD6'), [0, .02, -.3 + i * .2], w.paper); w.doodle = cyl(.18, .18, .01, mat('#E2453C'), [.25, .03, .1], w.paper, 12);
  w.laptop = group(); box(1.6, .08, 1.1, mat('#888888', { metal: .5 }), [0, 0, 0], w.laptop); const scr = group([0, .04, -.55], w.laptop); box(1.6, 1, .06, mat('#888888', { metal: .5 }), [0, .5, 0], scr); w.screen = box(1.4, .8, .02, mat('#7FD3FF', { glow: .6 }), [0, .5, .04], scr); scr.rotation.x = -.25;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.kid = person(k, k.scene, '#F2C94C');
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '427',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS GRADE TESTS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS GRADE TESTS'],
  title: 'In this town, cats grade your homework',
  description: 'Your drawing? The cat sits on it. Maths homework? Zero out of ten. On the laptop? It types the answer. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'school', 'shorts'],
  sources: ['Comedy sketch: cat teachers are made up. Quiz fact: a cat\'s normal body temperature is about 38.1 to 39.2 °C (100.5 to 102.5 °F), warmer than a typical person\'s (Merck Veterinary Manual, "Normal Rectal Temperature Ranges").'],
  setup,
  scenes: [
    { say: 'In this town, cats grade tests.', show: ['floor', 'wall', 'desk', 'paper', 'card'], sky: '#D8ECD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3.5, 11.5], look: [.4, 3.3, 0], fov: 50, to: { pos: [.4, 3.5, 11], look: [.4, 3.3, 0], fov: 48 } },
      update: (w, p, t) => { w.laptop.visible = false; w.desk.position.set(0, 0, -.6); w.paper.position.set(.3, 2.11, -.4); ctAt(w, -1.2, 2.1, -.7, -.4, .4); holdCard(w, null); pAt(w.kid, 2.2, 0, .6, -.6, .8); pose(w.kid, .2, .3); w.kid.head.rotation.x = .2; } },
    { say: 'Your drawing? They sit on it.', label: 'COMFY', show: ['floor', 'wall', 'desk', 'paper'], sky: '#D8ECD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 7.5], look: [0, 2.6, 0], fov: 50, to: { pos: [.2, 3.6, 7], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.kid.root.visible = false; w.paper.position.set(.2, 2.11, -.4); const q = Math.min(1, p * 1.8); ctAt(w, -1.4 + q * 2.4, 2.1, -.4, 0, .4); if (q >= 1) { w.c.body.scale.set(1.6, .7, 1.1); w.c.eyes.forEach(e => e.scale.y = .12); } } },
    { say: 'Maths homework? Zero out of ten.', label: '0 / 10', show: ['floor', 'wall', 'desk', 'paper', 'card'], sky: '#D8ECD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-.3, 3.4, 8], look: [-.3, 3, 0], fov: 50, to: { pos: [-.3, 3.4, 7.5], look: [-.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.paper.position.set(.6, 2.11, -.2); w.doodle.visible = false; ctAt(w, -1, 2.1, -.5, -.35, .4); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); holdCard(w, p > .4 ? false : null); } },
    { say: 'On the laptop? It types the answer.', label: 'ASDFGH', show: ['floor', 'wall', 'desk', 'laptop'], sky: '#D8ECD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.6, 7], look: [0, 2.7, 0], fov: 50, to: { pos: [.2, 3.6, 6.5], look: [0, 2.7, 0], fov: 48 } },
      update: (w, p, t) => { w.paper.visible = false; w.card.visible = false; w.laptop.position.set(.3, 2.15, 0); ctAt(w, -.3, 2.2, .1, 0, .38); w.c.paw.position.set(1.5, .3 + .2 * Math.abs(Math.sin(t * 14)), .5); w.c.body.scale.set(1.5, .8, 1); w.screen.material.color.setHSL((t * .5) % 1, .7, .7); } },
    { say: 'Cat teachers: helpful, funny, or way too strict? Comment below.',
      quiz: { q: 'Cat teachers are…', options: ['Helpful', 'Funny', 'Way too strict'], answer: 'Made up. Fun fact: cats run warmer than people, about 38 to 39 °C.' },
      show: ['floor', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.laptop.visible = false; w.desk.visible = false; w.wall.visible = false; ctAt(w, .4, 0, 0, -.6, .7); holdCard(w, true); } },
  ],
};
