// Narrative 25: "In This Town… (season 4: things complain to the cat)". Gary slot (459): Gary's tiny hat complains; the cat scores it.
// Hook: the rule under 2 s; first frame shows Gary in a tiny top hat with a face, next to a cat holding a score card.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#E8DAEF'), [0, 8, -4], w.wall);
  w.books = group(); box(1.2, .3, .9, mat('#3F6FD1'), [0, .15, 0], w.books); box(1.1, .3, .85, mat('#D13F3F'), [0, .45, 0], w.books); box(1.15, .3, .9, mat('#3FA34D'), [0, .75, 0], w.books);
  w.hat = group(); cyl(.45, .45, .05, mat('#111111'), [0, 0, 0], w.hat, 20); cyl(.3, .3, .6, mat('#111111'), [0, .3, 0], w.hat, 20); cyl(.31, .31, .1, mat('#C0392B'), [0, .1, 0], w.hat, 20);
  w.f = face(k, w.hat, [0, .38, .3], .3);
  w.g = gary(k, k.scene, 1.3, null);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const hatOn = (w, obj, local, s) => { obj.updateWorldMatrix(true, false); const at = obj.localToWorld(new w.k.THREE.Vector3(...local)); w.hat.position.copy(at); w.hat.scale.setScalar(s); w.hat.rotation.set(0, .3, 0); };

export default {
  id: '459',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'HATS COMPLAIN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'HATS COMPLAIN'],
  title: 'In this town, Gary the ant\'s hat complains',
  description: 'On Gary? A perfect fit. On the cat? Way too small. So the hat gets bigger. Now Gary wears a tent. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: complaining hats are made up. Quiz fact: ants range in size from about 2 to 25 millimetres (about 0.08 to 1 inch) long (Encyclopaedia Britannica, "Ant").'],
  setup,
  scenes: [
    { say: 'In this town, hats complain.', show: ['floor', 'hat', 'wall', 'books', 'card'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.6, 4.4], look: [.2, 1.6, .6], fov: 50, to: { pos: [.2, 1.6, 4.1], look: [.2, 1.6, .6], fov: 48 } },
      update: (w, p, t) => { w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); gy(w, .6, .9, .9, -2.6, t, false, .75); hatOn(w, w.g, [.36, .45, 0], .55); talk(w.f, t); brow(w.f, .4); holdCard(w, null); } },
    { say: 'On Gary? A perfect fit.', label: 'FITS', show: ['floor', 'hat', 'wall', 'books', 'card'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.5, 4.2], look: [.2, 1.25, .6], fov: 50, to: { pos: [.2, 1.5, 3.9], look: [.2, 1.25, .6], fov: 48 } },
      update: (w, p, t) => { w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); gy(w, .6, .9, .9, -2.6 + .4 * Math.sin(t * 3), t, false, .75); hatOn(w, w.g, [.36, .45, 0], .55); talk(w.f, t, p < .4); brow(w.f, -.3); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'On the cat? Way too small.', label: 'TOO SMALL', show: ['floor', 'hat', 'wall', 'card'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 6.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.8, 6], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.books.visible = false; ctAt(w, -.2, 0, 0, -.4, .42); hatOn(w, w.c.head, [0, 1.25, 0], .45); w.hat.rotation.z = .3; talk(w.f, t); brow(w.f, .55); gy(w, 1.2, 0, 1, -2.6, t, false, .7); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .5); if (p > .5) holdCard(w, false); else w.card.visible = false; } },
    { say: 'So the hat? Gets bigger. Now Gary wears a tent.', label: 'OOPS', show: ['floor', 'hat', 'wall', 'books'], sky: '#E8DAEF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); gy(w, .6, .9, .9, -2.6, t, false, .75); const gr = Math.min(1, p * 1.8); hatOn(w, w.g, [.36, .45 - gr * .4, 0], .55 + gr * 1.3); talk(w.f, t, p < .6); brow(w.f, gr >= 1 ? -.4 : .3); w.c.head.rotation.z = gr >= 1 ? .3 : 0; } },
    { say: 'Is Gary a good hat model? Comment below.',
      quiz: { q: 'Is Gary a good hat model?', options: ['Yes', 'No', 'Only tiny hats'], answer: 'Made up. But real ants range from about 2 to 25 millimetres long.' },
      show: ['floor', 'hat', 'books', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 7.5], look: [0, 1.15, 0], fov: 54, to: { pos: [-2, 2, 7.5], look: [0, 1.15, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.books.position.set(1.2, 0, .9); ctAt(w, -.3, 0, 0, -.4, .4); gy(w, 1.2, .9, .9, -2.6 + .3 * Math.sin(t * 3), t, true, .75); hatOn(w, w.g, [.36, .45, 0], .55); talk(w.f, t, false); holdCard(w, true); } },
  ],
};
