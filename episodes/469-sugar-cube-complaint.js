// Narrative 26: "This X Has a Complaint (cat edition)". Gary slot (469): a sugar cube complains about Gary and the cat.
// Hook: "This sugar cube has a complaint." under 2 s; first frame shows a sugar cube with a grumpy face next to Gary, a cat behind holding a score card.

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
  w.floor = k.ground('#A0522D', 0);
  w.wall = group(); box(40, 16, .3, mat('#FDEBD0'), [0, 8, -4], w.wall);
  w.cube = group(); box(.6, .6, .6, mat('#FDFEFE', { rough: .95 }), [0, .3, 0], w.cube);
  w.f = face(k, w.cube, [0, .32, .31], .28);
  w.cup = group(); cyl(.55, .45, .8, mat('#FFFFFF'), [0, .4, 0], w.cup, 20); cyl(.5, .5, .02, mat('#784212'), [0, .72, 0], w.cup, 20);
  w.g = gary(k, k.scene, 1.3, null);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const cubeAt = (w, x, y, z, s = 1, rz = 0) => { w.cube.position.set(x, y, z); w.cube.scale.setScalar(s); w.cube.rotation.set(0, .3, rz); w.cube.visible = true; };

export default {
  id: '469',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SUGAR CUBE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SUGAR CUBE', 'HAS A COMPLAINT'],
  title: 'This sugar cube has a complaint',
  description: 'Carried by an ant? All day long. Batted by a cat? Twice. And the cat? Five stars. So the cube jumped into the tea. Gone. (A made-up comedy sketch.)',
  tags: ['funny', 'garytheant', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining sugar cubes are made up. Quiz fact: the sting of the bullet ant is rated the maximum, 4+, on the Schmidt sting pain index developed by entomologist Justin O. Schmidt (Encyclopaedia Britannica, "Bullet ant").'],
  setup,
  scenes: [
    { say: 'This sugar cube has a complaint.', show: ['floor', 'wall', 'cube', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.2, 5], look: [0, .85, 0], fov: 50, to: { pos: [0, 1.2, 4.6], look: [0, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.cup.visible = false; cubeAt(w, -.4, 0, .6, 1.3); talk(w.f, t); brow(w.f, .45); gy(w, .5, 0, 1, -2.6, t, false, .7); ctAt(w, .7, 0, -1.2, -1, .34); holdCard(w, null); } },
    { say: 'Carried by an ant? All day long.', label: 'HEAVY', show: ['floor', 'wall', 'cube'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.1, 5], look: [0, .6, 0], fov: 50, to: { pos: [0, 1.1, 4.6], look: [0, .6, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.cup.visible = false; w.cr.visible = false; const x = 1 - p * 2; gy(w, x, 0, .8, Math.PI, t, true, .7); cubeAt(w, x + .05, .5 + .03 * Math.sin(t * 14), .8, .8); talk(w.f, t); brow(w.f, .55); } },
    { say: 'Batted by a cat? Twice.', label: 'BAT', show: ['floor', 'wall', 'cube'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.4, 5.5], look: [0, .8, 0], fov: 50, to: { pos: [0, 1.4, 5.1], look: [0, .8, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.cup.visible = false; const b = p < .5 ? p * 2 : (p - .5) * 2; const dir = p < .5 ? 1 : -1; cubeAt(w, (p < .5 ? -.6 : .6) + dir * b * 1.2 - dir * .0, Math.sin(b * Math.PI) * .5, .7, 1, b * 3); talk(w.f, t); brow(w.f, -.4); ctAt(w, -.3, 0, -.6, -.6, .34); w.c.paw.position.set(1.3, .6 + .4 * Math.abs(Math.sin(t * 8)), .9); gy(w, .2 - dir * b * .8, 0, 1.2, dir > 0 ? 0 : Math.PI, t, true, .6); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'cube', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.2, 5], look: [0, .85, 0], fov: 50, to: { pos: [0, 1.2, 4.6], look: [0, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.cup.visible = false; cubeAt(w, -.4, 0, .6, 1.3); talk(w.f, t, p < .3); brow(w.f, -.3); gy(w, .5, 0, 1, -2.6, t, false, .7); ctAt(w, .7, 0, -1.2, -1, .34); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the cube jumped into the tea. Gone.', label: 'GONE', show: ['floor', 'wall', 'cube', 'cup'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 5], look: [0, .8, 0], fov: 50, to: { pos: [0, 1.6, 4.6], look: [0, .8, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.cr.visible = false; w.cup.position.set(-.4, 0, .3); const j = Math.min(1, p * 2); cubeAt(w, .5 - j * .9, j < 1 ? Math.sin(j * Math.PI) * 1 + j * .55 : .55 - Math.min(.5, (p - .5) * 1.5), .3, .6); w.cube.visible = p < .85; talk(w.f, t, p < .5); brow(w.f, -.3); gy(w, .6, 0, 1, -2.6, t, false, .7); w.g.rotation.z = p > .6 ? -.3 : 0; } },
    { say: 'Is Gary a good sugar carrier? Comment below.',
      quiz: { q: 'Is Gary a good sugar carrier?', options: ['Yes', 'No', 'Too sweet to tell'], answer: 'Fun fact: the bullet ant\'s sting gets the top rating, 4+, on the Schmidt pain index.' },
      show: ['floor', 'cube', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.2, 5], look: [0, .8, 0], fov: 54, to: { pos: [-2, 1.2, 5], look: [0, .8, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.cup.visible = false; w.g.rotation.z = 0; cubeAt(w, -.4, 0, .6, 1.3); talk(w.f, t, false); gy(w, .5, 0, 1, -2.6 + .3 * Math.sin(t * 3), t, true, .7); ctAt(w, .7, 0, -1.2, -1, .36); holdCard(w, true); } },
  ],
};
