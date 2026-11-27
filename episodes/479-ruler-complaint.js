// Narrative 26: "This X Has a Complaint (cat edition)". Gary slot (479): a ruler complains about Gary's ant line and the cat.
// Hook: "This ruler has a complaint." under 2 s; first frame shows a standing ruler with a grumpy face, Gary in front, a cat behind holding a score card.

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
  w.floor = k.ground('#C8B6A6', 0);
  w.wall = group(); box(40, 16, .3, mat('#DDE8F0'), [0, 8, -5], w.wall);
  w.ru = group(); w.rb = group([0, 0, 0], w.ru); box(.7, 3, .06, mat('#F4D03F', { rough: .5 }), [0, 1.5, 0], w.rb);
  for (let i = 0; i < 15; i++) box(i % 5 ? .14 : .26, .025, .02, mat('#222222'), [-.35 + (i % 5 ? .07 : .13), .15 + i * .19, .04], w.rb);
  w.f = face(k, w.rb, [.08, 1.75, .05], .42);
  w.books = group(); const bc = ['#2E86C1', '#C0392B', '#27AE60']; for (const x of [-1.5, 1.5]) for (let i = 0; i < 3; i++) box(1, .3, .7, mat(bc[i]), [x, .15 + i * .3, 0], w.books);
  w.minis = []; for (let i = 0; i < 4; i++) w.minis.push(gary(k, k.scene, .3, null));
  w.g = gary(k, k.scene, .5, null);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = .5) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const ruUp = (w, x, wob = 0) => { w.f.rotation.z = 0; w.f.position.x = .08; w.ru.position.set(x, 0, -.3); w.ru.rotation.set(0, .15, wob); w.minis.forEach(m => m.visible = false); };
const ruFlat = (w, y) => { w.f.rotation.z = -Math.PI / 2; w.f.position.x = -.1; w.ru.position.set(1.5, y, 0); w.ru.rotation.set(-.6, 0, Math.PI / 2); w.minis.forEach(m => m.visible = false); };
const cam0 = { pos: [0, 2.1, 6.2], look: [0, 1.85, 0], fov: 50, to: { pos: [0, 2.1, 5.8], look: [0, 1.85, 0], fov: 48 } };
const env = { sky: '#DDE8F0', lightAt: [2, 9, 8], lightDist: 26 };

export default {
  id: '479',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE RULER',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS RULER', 'HAS A COMPLAINT'],
  title: 'This ruler has a complaint',
  description: 'Used as a bridge? Gary\'s whole ant line. Used as a back scratcher? By the cat. And the cat? Five stars. So the ruler measured the cat. Too long. (A made-up comedy sketch.)',
  tags: ['funny', 'garytheant', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining rulers are made up. Quiz fact: army ants (Eciton hamatum) build living bridges out of their own bodies to span gaps on their trails, and adjust the bridges as they go (Reid et al., "Army ants dynamically adjust living bridges in response to a cost-benefit trade-off", PNAS, 2015).'],
  setup,
  scenes: [
    { say: 'This ruler has a complaint.', show: ['floor', 'wall', 'ru', 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { ruUp(w, -.6); talk(w.f, t); brow(w.f, .45); gy(w, .1, 0, 1, -2.6, t); ctAt(w, .9, 0, -.4, -1, .3); holdCard(w, null); } },
    { say: 'Used as a bridge? Gary\'s whole ant line.', label: 'BRIDGE', show: ['floor', 'wall', 'ru', 'books'], ...env,
      cam: { pos: [-.3, 2.2, 3.8], look: [-.3, 1.2, 0], fov: 50, to: { pos: [-.3, 2.2, 3.5], look: [-.3, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.cr.visible = false; ruFlat(w, .92); talk(w.f, t); brow(w.f, .6); const top = 1.05; w.minis.forEach((m, i) => { m.visible = true; m.position.set(-1.9 + ((p * 3 + i * .3) % 1) * 3.8, top + .12, -.1); m.rotation.set(0, 0, 0); scurry(m, t + i, 18); }); gy(w, -1.6 + p * 3.2, top + .12, -.1, 0, t, true); } },
    { say: 'Used as a back scratcher? By the cat.', label: 'SCRITCH', show: ['floor', 'wall', 'ru'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; w.g.visible = false; const r = Math.sin(t * 6); ruUp(w, -.5, r * .06); talk(w.f, t); brow(w.f, .55); ctAt(w, .9 + r * .15, 0, -.1, .6, .3); w.c.eyes.forEach(e => e.scale.y = .15); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'ru', 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { ruUp(w, -.6); talk(w.f, t, p < .3); brow(w.f, -.3); gy(w, .1, 0, 1, -2.6, t); ctAt(w, .9, 0, -.4, -1, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the ruler measured the cat. Too long.', label: 'TOO LONG', show: ['floor', 'wall', 'ru'], ...env,
      cam: { pos: [0, 5, 5.4], look: [0, .3, .4], fov: 52, to: { pos: [0, 5, 5], look: [0, .3, .4], fov: 50 } },
      update: (w, p, t) => { w.card.visible = false; w.ru.position.set(1.5, .04, .9); w.ru.rotation.set(-1.25, 0, Math.PI / 2); w.f.rotation.z = -Math.PI / 2; w.f.position.x = .08; talk(w.f, t); brow(w.f, p > .5 ? .6 : -.3); const st = 1.4 + Math.min(1, p * 1.5) * 1; ctAt(w, 1.3, 0, -.3, 0, .32); w.c.body.scale.set(st, .8, 1); w.c.body.position.x = -1.6 - (st - 1.4) * 1.4; w.c.tail.position.x = -3.4 - (st - 1.4) * 2.8; w.c.eyes.forEach(e => e.scale.y = .2); gy(w, 1.9, .06, 1.2, -2.6, t, false); } },
    { say: 'Is Gary a good bridge builder? Comment below.',
      quiz: { q: 'Is Gary a good bridge builder?', options: ['Yes', 'No', 'Only with friends'], answer: 'Fun fact: army ants build living bridges out of their own bodies.' },
      show: ['floor', 'ru', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 6], look: [0, 1.6, 0], fov: 54, to: { pos: [-2, 2, 6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; ruUp(w, -.6); talk(w.f, t, false); gy(w, .1, 0, 1, -2.6 + .3 * Math.sin(t * 3), t, true); ctAt(w, .9, 0, -.4, -1, .32); holdCard(w, true); } },
  ],
};
