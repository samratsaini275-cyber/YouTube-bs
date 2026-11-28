// Narrative 31: "In This Town… (season 6: tiny and giant animals)". Town rules built on the best-performing premise (tiny/giant animals), with Gary and the orange cat.
// Hook: the rule under 2 s; first frame shows a giant grey mouse looming over a shivering cat and Gary.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

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

// A big grey cartoon mouse: round body, big round ears, pink nose, long tail. Faces +x.
function mouse(k, parent) {
  const { mat, ball, cyl, group, box } = k;
  const gr = mat('#A6ACAF', { rough: .85 }), pk = mat('#F5B7C5'), wh = mat('#FFFFFF'), bk = mat('#111111');
  const m = { root: group([0, 0, 0], parent) };
  const b = ball(1, gr, [0, 1, 0], m.root); b.scale.set(1.4, 1, 1);
  m.head = group([1.3, 1.5, 0], m.root); ball(.7, gr, [0, 0, 0], m.head); const sn = ball(.35, gr, [.55, -.12, 0], m.head); sn.scale.set(1.2, .8, .8);
  ball(.12, pk, [.95, -.08, 0], m.head);
  m.eyes = []; for (const z of [-.3, .3]) { const e = group([.45, .22, z], m.head); ball(.16, wh, [0, 0, 0], e); ball(.08, bk, [.1, 0, 0], e); m.eyes.push(e); }
  m.ears = [-1, 1].map(s => { const g = group([-.1, .55, s * .5], m.head); const a = cyl(.45, .45, .06, gr, [0, .2, 0], g, 20); a.rotation.x = Math.PI / 2; const c = cyl(.3, .3, .02, pk, [.04, .2, 0], g, 20); c.rotation.set(Math.PI / 2, 0, 0); c.position.x = .05; g.rotation.z = .2; return g; });
  for (let i = 0; i < 4; i++) { const z = i < 2 ? -1 : 1; const wk = cyl(.012, .012, .9, mat('#FDFEFE'), [.85, -.12 + (i % 2) * .08, z * .4], m.head, 4); wk.rotation.set(Math.PI / 2, 0, 0); }
  m.legs = []; for (const x of [-.7, .7]) for (const z of [-.5, .5]) m.legs.push(ball(.25, pk, [x, .15, z], m.root));
  m.tail = group([-1.35, .9, 0], m.root); for (let i = 0; i < 4; i++) { const c = cyl(.07, .05, .6, pk, [-.25 - i * .55, .1 + i * .12, 0], m.tail, 6); c.rotation.z = Math.PI / 2 - .2; }
  return m;
}

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#7DBE5A', 0);
  w.path = box(30, .02, 1.6, mat('#D8C9A8'), [0, .01, .6], k.scene); w.path.castShadow = false;
  w.trees = group(); for (let i = 0; i < 5; i++) { const t = group([-6 + i * 3, 0, -4.5], w.trees); cyl(.15, .2, 1.4, mat('#6E4B2A'), [0, .7, 0], t, 8); ball(.9, mat('#1E8449'), [0, 1.9, 0], t); }
  w.fence = group(); for (let i = 0; i < 14; i++) box(.12, .8, .12, mat('#FDFEFE'), [-6.5 + i, .4, -2.5], w.fence); box(14, .1, .08, mat('#FDFEFE'), [0, .6, -2.5], w.fence);
  w.m = mouse(k, k.scene);
  w.cheese = group(); const ch = cyl(.35, .35, .3, mat('#F4D03F', { rough: .6 }), [0, .15, 0], w.cheese, 3); for (let i = 0; i < 3; i++) { const h = ball(.06, mat('#D4AC0D'), [-.05 + i * .08, .2 + (i % 2) * .05, .17], w.cheese); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.visible = true; w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const ms = (w, x, z, ry, s, t, run = false) => { const m = w.m; m.root.visible = true; m.root.position.set(x, run ? Math.abs(Math.sin(t * 10)) * .2 * s : 0, z); m.root.rotation.set(0, ry, 0); m.root.scale.setScalar(s); m.head.rotation.set(0, 0, 0); m.eyes.forEach(e => e.scale.set(1, 1, 1)); m.legs.forEach((l, i) => l.position.y = .15 + (run ? Math.max(0, Math.sin(t * 20 + i * 1.6)) * .3 : 0)); m.tail.rotation.y = .3 * Math.sin(t * 3); };
const shiver = (w, t) => { w.cr.position.x += .03 * Math.sin(t * 40); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.2 : 1.5); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '566',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT MICE',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'MICE ARE GIANT'],
  title: 'In this town, mice are giant (Gary the ant and the cat)',
  description: 'The cat hid behind Gary. Gary offered the giant mouse some cheese. Then the mouse got a good look at Gary. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'mouse', 'giant', 'cat', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: giant mice are made up. Quiz fact: house mice are agile climbers and jumpers and are also good swimmers (Encyclopaedia Britannica, "House mouse").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, mice are giant.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [0, 3.6, 10], look: [.1, 2.6, 0], fov: 50, to: { pos: [0, 3.6, 9.6], look: [.1, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'cheese'); ms(w, 1, -1.2, -Math.PI / 2 - .6, 1.5, t); w.m.head.rotation.z = -.2; ctAt(w, -.9, 0, 1.2, .5, .26); shiver(w, t); gy(w, .5, 0, 1.9, .5, t); },
    },
    {
      say: 'The cat hid behind Gary.',
      show: ['floor', 'path', 'trees', 'fence', 'g'], ...env,
      cam: { pos: [.4, 1.5, 4.4], look: [-.2, .7, .3], fov: 46, to: { pos: [.4, 1.5, 4], look: [-.2, .7, .3], fov: 44 } },
      update: (w, p, t) => { hide(w, 'cheese'); w.m.root.visible = false; ctAt(w, -.6, 0, -.3, 0, .28); w.c.body.scale.set(1.4, .8, 1); w.c.head.position.y = 2.2; shiver(w, t); gy(w, .6, 0, .8, .4, t); },
    },
    {
      say: 'Gary offered the mouse some cheese.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'cheese'], ...env,
      cam: { pos: [-1, 2.2, 6.4], look: [.6, 1.2, 0], fov: 48, to: { pos: [-1, 2.2, 6], look: [.6, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { w.cr.visible = false; w.c.head.position.y = 2.4; ms(w, 2, -.3, Math.PI, 1.1, t); w.m.head.rotation.z = -.3; const x = -1 + Math.min(1, p * 1.5) * .9; gy(w, x - .6, 0, .7, 0, t, p < .66); w.cheese.position.set(x, 0, .7); },
    },
    {
      say: 'The mouse leaned down for a closer look.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'cheese'], ...env,
      cam: { pos: [-1.2, 1.6, 4.6], look: [.4, 1, 0], fov: 46, to: { pos: [-1.2, 1.6, 4.2], look: [.4, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; ms(w, 2, -.3, Math.PI, 1.1, t); w.m.head.rotation.z = -.3 - Math.min(1, p * 2) * .5; w.cheese.position.set(-.1, 0, .7); gy(w, -.7, 0, .7, 0, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Then it ran away. Scared of an ant.',
      show: ['floor', 'path', 'trees', 'fence', 'g', 'cheese'], ...env,
      cam: { pos: [0, 2.8, 8.4], look: [.6, 1.4, 0], fov: 50, to: { pos: [.4, 2.8, 8.8], look: [1.4, 1.4, 0], fov: 50 } },
      update: (w, p, t) => { const f = Math.max(0, p - .1); ms(w, 1 + f * 3.5, -.6, 0, 1.1, t, true); w.m.eyes.forEach(e => e.scale.set(1.4, 1.4, 1.4)); w.cheese.position.set(-.1, 0, .7); gy(w, -.7, 0, .7, 0, t); ctAt(w, -1.9, 0, .2, 0, .28); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.2 : 1); w.c.head.rotation.z = .2; },
    },
    {
      say: 'Scariest thing: a mouse, a vacuum, or a cucumber? Comment below.',
      quiz: { q: 'What is the scariest thing?', options: ['A mouse', 'A vacuum', 'A cucumber'], answer: 'Fun fact: house mice are good swimmers, and great climbers too.' },
      show: ['floor', 'path', 'trees', 'fence', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [1.6, 3.6, 10], look: [.1, 2.5, 0], fov: 50, to: { pos: [-1.6, 3.6, 10], look: [.1, 2.5, 0] } },
      update: (w, p, t) => { hide(w, 'cheese'); ms(w, 1, -1.2, -Math.PI / 2 - .6, 1.5, t); ctAt(w, -.9, 0, 1.2, .5, .26); shiver(w, t); gy(w, .5, 0, 1.9, .5, t); },
    },
  ],
};
