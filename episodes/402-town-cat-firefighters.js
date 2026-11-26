// Narrative 22: "In This Town… (short format, cats first)". Cat rules lead the channel (906: 975 views at 07:43).
// Hook: the rule under 2 s; first frame shows a cat in a fire helmet in front of a fire truck.

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


function helmet(k, c) {
  const h = k.mesh(new k.THREE.SphereGeometry(1.2, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), k.mat('#E2453C', { metal: .2 }), [-.15, .8, 0], c.head);
  const b = k.cyl(1.45, 1.45, .08, k.mat('#C9302A'), [-.15, .8, 0], c.head, 20); b.scale.set(1, 1, .9);
  k.box(.5, .5, .05, k.mat('#F2C94C', { metal: .6 }), [.98, 1.25, 0], c.head).rotation.y = Math.PI / 2;
  return h;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.road = box(40, .04, 5, mat('#666C77'), [0, .03, 1]);
  w.truck = group(); box(7, 2.6, 2.6, mat('#D8302A'), [0, 1.8, 0], w.truck); box(2, 2, 2.6, mat('#D8302A'), [4.4, 1.5, 0], w.truck); box(.05, 1, 2.2, mat('#9FD3EE'), [5.42, 2, 0], w.truck); for (const x of [-2.4, 2.4, 4.4]) for (const z of [-1.3, 1.3]) { const wh = cyl(.6, .6, .3, mat('#222222'), [x, .6, z], w.truck, 14); wh.rotation.x = Math.PI / 2; } w.ladder = group([0, 3.3, 0], w.truck); for (const z of [-.4, .4]) { const r = cyl(.06, .06, 6, mat('#DDDDDD', { metal: .5 }), [0, 0, z], w.ladder, 6); r.rotation.z = Math.PI / 2; } for (let i = 0; i < 9; i++) cyl(.04, .04, .8, mat('#DDDDDD'), [-2.8 + i * .7, 0, 0], w.ladder, 6).rotation.x = Math.PI / 2; box(.05, .5, 1.2, mat('#F2C94C'), [0, 1.8, 1.32], w.truck).rotation.y = Math.PI / 2;
  w.boxes = group(); for (let i = 0; i < 3; i++) box(1.6, 1.2, 1.6, mat(['#C9965A', '#B8854A', '#D4A56A'][i]), [-2.2 + i * 2.2, 3.7, 0], w.boxes);
  w.c = cat(k, k.scene); w.cr = w.c.root; helmet(k, w.c);
  w.c2 = cat(k, k.scene); w.c2r = w.c2.root; helmet(k, w.c2);
  w.peeks = group(); for (let i = 0; i < 3; i++) { const h = group([-2.2 + i * 2.2, 4.4, .2], w.peeks); ball(.45, mat(['#F2A04A', '#7A7A7A', '#222222'][i]), [0, 0, 0], h); for (const s of [-1, 1]) { cone(.16, .32, mat(['#F2A04A', '#7A7A7A', '#222222'][i]), [s * .25, .42, 0], h, 4); ball(.08, mat('#7BC96F', { glow: .3 }), [s * .16, .08, .4], h); } }
  w.grill = group(); cyl(.6, .45, .5, mat('#333333'), [0, 1.4, 0], w.grill, 14); for (const a of [0, 2.1, 4.2]) { const l = cyl(.05, .05, 1.3, mat('#333333'), [Math.cos(a) * .35, .6, Math.sin(a) * .35], w.grill, 6); l.rotation.set(Math.sin(a) * .25, 0, -Math.cos(a) * .25); } w.flames = []; for (let i = 0; i < 4; i++) { const f = cone(.2, .6, mat(i % 2 ? '#FF8A2A' : '#FFD23F', { glow: .9 }), [(i - 1.5) * .22, 1.95, 0], w.grill, 8); w.flames.push(f); }
  w.hose = group(); const hs = cyl(.12, .12, 3, mat('#F2C94C'), [0, .12, 0], w.hose, 8); hs.rotation.z = Math.PI / 2; cyl(.16, .1, .4, mat('#AAAAAA', { metal: .6 }), [1.7, .12, 0], w.hose, 8).rotation.z = Math.PI / 2;
  w.drops = group(); for (let i = 0; i < 4; i++) { const d = ball(.08, mat('#7FD3FF', { glow: .4 }), [0, 0, 0], w.drops); d.userData.i = i; }
  w.tree = group(); cyl(.4, .5, 5, mat('#7A5A3A'), [0, 2.5, 0], w.tree, 10); const br = cyl(.18, .18, 3, mat('#7A5A3A'), [1.2, 4.2, 0], w.tree, 8); br.rotation.z = Math.PI / 2 - .2; ball(2.2, mat('#3E8F3A'), [0, 6.4, -.6], w.tree);
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.body.rotation.set(0, 0, 0); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const flick = (w, t) => w.flames.forEach((f, i) => f.scale.set(1, .8 + .4 * Math.abs(Math.sin(t * 9 + i * 1.7)), 1));

export default {
  id: '402',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAT FIREFIGHTERS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS FIGHT FIRES'],
  title: 'In this town, cats are the firefighters',
  description: 'A fire? They will not touch the hose. A cat stuck in a tree? Now two are stuck. And the fire truck is full of boxes. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'firefighter', 'shorts'],
  sources: ['Comedy sketch: cat firefighters are made up. Quiz fact: cats are digitigrade, meaning they walk on their toes rather than on the soles of their feet (Encyclopaedia Britannica, "digitigrade").'],
  setup,
  scenes: [
    { say: 'In this town, cats fight fires.', show: ['ground', 'road', 'truck', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.4, 3.2, 13], look: [.2, 2.7, 0], fov: 52, to: { pos: [.4, 3.2, 12.4], look: [.2, 2.7, 0], fov: 50 } },
      update: (w, p, t) => { w.c2r.visible = false; w.boxes.visible = false; w.peeks.visible = false; w.truck.position.set(1, 0, -3); ctAt(w.c, .4, 0, 1.4, -.5, .8); w.c.head.rotation.z = .1 + .05 * Math.sin(t * 3); } },
    { say: 'A fire? They won\'t touch the hose.', label: 'NOPE', show: ['ground', 'road', 'grill', 'hose', 'drops', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.4, 3, 11.5], look: [.2, 2, 0], fov: 52, to: { pos: [.4, 3, 11], look: [.2, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.truck.visible = false; w.grill.position.set(2.6, 0, -.6); flick(w, t); w.hose.position.set(-.2, 0, 1.6); ctAt(w.c, -.6 - p * .9, 0, 1.2, .3, .7); w.c.body.rotation.z = .15; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.5); w.c.head.rotation.y = -.4; w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 1.6 + i / 4) % 1; d.position.set(1.95 + q * .4, .2 - q * .15, 1.6 + (i - 1.5) * .06); d.visible = true; }); } },
    { say: 'Cat stuck in a tree? Now two are stuck.', label: 'HELP', show: ['ground', 'tree', 'cr', 'c2r'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4.2, 9.4], look: [1, 4, 0], fov: 52, to: { pos: [1, 4.2, 8.9], look: [1, 4, 0], fov: 50 } },
      update: (w, p, t) => { w.grill.visible = false; w.hose.visible = false; w.drops.visible = false; w.road.visible = false; w.tree.position.set(-.6, 0, -1); ctAt(w.c2, 2.4, 4.5, -1, Math.PI + .5, .3); w.c2.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.5); w.c2.helmetOff = true; const q = Math.min(1, p * 1.6); ctAt(w.c, q > .95 ? 1.1 : -.2, Math.min(4.05, .1 + q * 4.2), q > .95 ? -1 : -.4, q > .95 ? -.6 : -.3, q > .95 ? .3 : .36); if (q < .95) { w.cr.rotation.z = Math.PI / 2 - .2; } w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.5); w.c.head.rotation.z = .2 * Math.sin(t * 6) * (q >= .95 ? 1 : 0); } },
    { say: 'And the fire truck? Full of boxes.', label: 'MINE', show: ['ground', 'road', 'truck', 'boxes', 'peeks'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.8, 4.4, 13], look: [.6, 3.6, 0], fov: 52, to: { pos: [.8, 4.4, 12.4], look: [.6, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { w.tree.visible = false; w.c.root.visible = false; w.c2.root.visible = false; w.road.visible = true; w.truck.position.set(0, 0, -1); w.boxes.position.set(0, 0, -1); w.peeks.position.set(0, 0, -1); w.peeks.children.forEach((h, i) => { h.position.y = 4.4 + .15 * Math.max(0, Math.sin(t * 3 + i * 2)); }); } },
    { say: 'Cat firefighters: brave, cute, or way too scared of water? Comment below.',
      quiz: { q: 'Cat firefighters are…', options: ['Brave', 'Cute', 'Scared of water'], answer: 'Made up. Fun fact: cats walk on their toes.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.truck.visible = false; w.boxes.visible = false; w.peeks.visible = false; w.road.visible = false; ctAt(w.c, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
