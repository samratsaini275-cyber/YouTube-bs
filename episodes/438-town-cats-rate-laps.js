// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate the laps they sit on.
// Hook: the rule under 2 s; first frame shows a cat on a seated person's lap holding up a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#F2D7E0'), [0, 8, -4], w.wall);
  w.sofa = group(); box(5, 1, 2, mat('#5D6D7E'), [0, .5, 0], w.sofa); box(5, 1.8, .5, mat('#4A5866'), [0, 1.6, -.75], w.sofa);
  w.p = person(k, k.scene, '#E67E22');
  w.lap = box(1.6, .35, 1.2, mat('#2C3E50'), [0, 0, 0]);
  w.laptop = group(); box(1.2, .08, .8, mat('#AAB7B8'), [0, .04, 0], w.laptop); w.lscr = box(1.2, .8, .05, mat('#5DADE2', { glow: .6 }), [0, .45, -.4], w.laptop); w.lscr.rotation.x = -.25;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const sit = (w, x, bob = 0) => { pAt(w.p, x, .6 + bob, -.35, 0, .85); pose(w.p, .25, .6); w.lap.position.set(x, 1.15 + bob, .35); };

export default {
  id: '438',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE LAPS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE LAPS'],
  title: 'In this town, cats rate your lap',
  description: 'A cozy lap? Five stars. A wiggly lap? One star. Your laptop? It sits right on it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'lap', 'shorts'],
  sources: ['Comedy sketch: cat lap reviews are made up. Quiz fact: when cats purr to ask for food, the purr contains a high-pitched, cry-like sound; people listening to recordings rated these purrs as more urgent and less pleasant than ordinary purrs (McComb et al., "The cry embedded within the purr", Current Biology, 2009).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate laps.', show: ['floor', 'wall', 'sofa', 'lap', 'card'], sky: '#F2D7E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.6, 12], look: [.3, 3, 0], fov: 50, to: { pos: [.3, 3.6, 11.4], look: [.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.laptop.visible = false; sit(w, -.3); w.p.mouth.scale.set(1.3, 1.2, 1); ctAt(w, .1, 1.33, .6, -.3, .45); holdCard(w, null); } },
    { say: 'A cozy lap? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'sofa', 'lap', 'card'], sky: '#F2D7E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.6, 12], look: [.3, 3, 0], fov: 50, to: { pos: [.3, 3.6, 11.4], look: [.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.laptop.visible = false; sit(w, -.3); w.p.mouth.scale.set(1.3, 1.2, 1); ctAt(w, .1, 1.33, .6, -.3, .45); w.c.body.scale.set(1.4, 1 + .04 * Math.sin(t * 9), 1); w.c.eyes.forEach(e => e.scale.y = p > .45 ? 1 : .15); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'A wiggly lap? One star.', label: '1 STAR', show: ['floor', 'wall', 'sofa', 'lap', 'card'], sky: '#F2D7E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.6, 12], look: [.3, 3, 0], fov: 50, to: { pos: [.3, 3.6, 11.4], look: [.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.laptop.visible = false; const bob = p < .5 ? .12 * Math.abs(Math.sin(t * 14)) : 0; sit(w, -.3, bob); ctAt(w, p < .5 ? .1 : 1.7, p < .5 ? 1.33 + bob : 1, .6, -.3, .45); if (p < .5) { w.card.visible = false; w.cr.rotation.z = .2 * Math.sin(t * 14); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } else { w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .4); holdCard(w, false); } } },
    { say: 'Your laptop? It sits right on it.', label: 'TAKEN', show: ['floor', 'wall', 'sofa', 'laptop'], sky: '#F2D7E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.6, 12], look: [.3, 3, 0], fov: 50, to: { pos: [.3, 3.6, 11.4], look: [.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.lap.visible = false; sit(w, -.6); pose(w.p, .25, 1.1); w.p.mouth.scale.set(1.2, 2, 1); w.laptop.position.set(.9, 1, .3); const s = Math.min(1, p * 2.4); ctAt(w, 2.6 - s * 1.5, 1 + (s < 1 ? Math.sin(s * Math.PI) * .5 : .12), .35, -.3, .45); w.lscr.material.emissiveIntensity = s >= 1 ? .1 : .6; if (s >= 1) w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'Best cat seat? Comment below.',
      quiz: { q: 'Best cat seat?', options: ['Your lap', 'Your laptop', 'Your warm chair'], answer: 'Made up. But real cats hide a cry inside purrs that ask for food.' },
      show: ['floor', 'sofa', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 3, 8.5], look: [0, 2.4, 0], fov: 54, to: { pos: [-2, 3, 8.5], look: [0, 2.4, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.p.root.visible = false; w.lap.visible = false; w.laptop.visible = false; ctAt(w, .4, 1, .3, -.6, .45); holdCard(w, true); } },
  ],
};
