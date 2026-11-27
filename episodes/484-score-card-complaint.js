// Narrative 26: "This X Has a Complaint (cat edition)". Gary finale (484): the cat's score card itself complains, and Gary finally gets to hold it.
// Hook: "This card has a complaint." under 2 s; first frame shows the big score card with a grumpy face, Gary in front and the cat beside it.

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
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#C8B6A6', 0);
  w.wall = group(); box(40, 16, .3, mat('#F4ECF7'), [0, 8, -5], w.wall);
  w.bc = group(); box(1.4, 1.5, .06, mat('#FFFFFF', { rough: .5 }), [0, 0, 0], w.bc); box(1.46, .06, .07, mat('#BBBBBB'), [0, .75, 0], w.bc); box(1.46, .06, .07, mat('#BBBBBB'), [0, -.75, 0], w.bc);
  w.gs = box(.55, .45, .03, mat('#3FA34D', { glow: .4 }), [0, -.38, .04], w.bc);
  w.f = face(k, w.bc, [0, .3, .05], .4);
  w.g = gary(k, k.scene, .5, null);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = .5) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const bcAt = (w, x, y, z, s = 1, r = 0) => { w.bc.position.set(x, y, z); w.bc.scale.setScalar(s); w.bc.rotation.set(0, -.15, r); w.gs.visible = true; };
const cam0 = { pos: [0, 2, 6], look: [0, 2.1, 0], fov: 50, to: { pos: [0, 2, 5.6], look: [0, 2.1, 0], fov: 48 } };
const env = { sky: '#F4ECF7', lightAt: [2, 9, 8], lightDist: 26 };
const ALL = ['floor', 'wall', 'bc'];

export default {
  id: '484',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SCORE CARD',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS CARD', 'HAS A COMPLAINT'],
  title: 'This score card has a complaint',
  description: 'Held up all season? By the cat. Every score? Always green. And Gary? He wants a turn. So Gary held up the card: five stars for the cat. Season finale. (A made-up comedy sketch.)',
  tags: ['funny', 'garytheant', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining score cards are made up. Quiz fact: acacia ants (Pseudomyrmex ferruginea) live in the swollen thorns of the bullhorn acacia; the tree gives them food and shelter, and the ants defend it against browsing animals (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'This card has a complaint.', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { bcAt(w, -.5, 1.3, 0); talk(w.f, t); brow(w.f, .45); gy(w, -.2, 0, 1, -2.6, t); ctAt(w, 1, 0, .2, -1.2, .3); } },
    { say: 'Held up all season? By the cat.', label: 'UP DOWN', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.g.visible = false; ctAt(w, -.2, 0, .3, -1.2, .3); const b = Math.abs(Math.sin(t * 4)); w.c.paw.position.set(1.2, 1.4 + b * .7, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); bcAt(w, at.x + .55, at.y + 1.05, at.z + .3, .8); talk(w.f, t); brow(w.f, .6); } },
    { say: 'Every score? Always green.', label: 'ALWAYS', show: [...ALL], ...env,
      cam: cam0,
      update: (w, p, t) => { w.g.visible = false; bcAt(w, -.5, 1.3, 0); w.gs.visible = Math.sin(t * 10) > -.3; talk(w.f, t); brow(w.f, -.4); ctAt(w, .9, 0, .2, -1.2, .3); w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'And Gary? He wants a turn.', label: 'MY TURN', show: [...ALL], ...env,
      cam: { pos: [0, 1.6, 4.8], look: [0, 1.25, 0], fov: 50, to: { pos: [0, 1.6, 4.4], look: [0, 1.25, 0], fov: 48 } },
      update: (w, p, t) => { bcAt(w, -.5, 1.3, 0); talk(w.f, t, p < .5); brow(w.f, p > .5 ? -.2 : .4); gy(w, .25, Math.abs(Math.sin(t * 7)) * .35, .9, -2.4, t, true, .6); ctAt(w, 1.2, 0, -.2, -1.4, .28); w.c.head.rotation.z = .2; } },
    { say: 'So Gary held up the card. Five stars for the cat.', label: 'FINALE', show: [...ALL], ...env,
      cam: { pos: [.5, 1.5, 4.8], look: [.5, 1.15, 0], fov: 50, to: { pos: [.5, 1.5, 4.5], look: [.5, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { const up = Math.min(1, p * 2); gy(w, .1, 0, .9, -1.57, t, false, .6); bcAt(w, .1, .35 + up * .58, .9, .55); talk(w.f, t, p > .5); brow(w.f, p > .5 ? -.5 : .3); ctAt(w, 1, 0, .1, -1.3, .3); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * (p > .5 ? 1.3 : 1)); w.c.tail.rotation.z = p > .5 ? Math.sin(t * 6) * .3 : 0; } },
    { say: 'Is Gary a good judge? Comment below.',
      quiz: { q: 'Is Gary a good judge?', options: ['Yes', 'No', 'Only for cats'], answer: 'Fun fact: acacia ants live inside the thorns of the bullhorn acacia tree and guard it from hungry animals.' },
      show: [...ALL], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.6, 1.6, 4.8], look: [.3, 1.1, 0], fov: 54, to: { pos: [-1.2, 1.6, 4.8], look: [.3, 1.1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; gy(w, .1, 0, .9, -1.57 + .3 * Math.sin(t * 3), t, true, .6); bcAt(w, .1, .93, .9, .55); talk(w.f, t, false); brow(w.f, -.5); ctAt(w, 1, 0, .1, -1.3, .32); } },
  ],
};
