// Narrative 25: "In This Town… (season 4: things complain to the cat)". Gary slot (449): Gary complains to the cat.
// Hook: the rule under 2 s; first frame shows Gary on a stack of books facing a cat holding a score card.

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


function setup(k) {
  const { mat, box, cyl, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FCF3CF'), [0, 8, -4], w.wall);
  w.books = group(); box(1.2, .3, .9, mat('#3F6FD1'), [0, .15, 0], w.books); box(1.1, .3, .85, mat('#D13F3F'), [0, .45, 0], w.books); box(1.15, .3, .9, mat('#3FA34D'), [0, .75, 0], w.books);
  w.hill = cone(1.1, .7, mat('#A0522D'), [0, .35, 0], k.scene, 16);
  w.g = gary(k, k.scene, 1.3, null);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const rant = (w, t) => { w.g.position.y += .08 * Math.abs(Math.sin(t * 10)); w.g.rotation.z = .15 * Math.sin(t * 10); };

export default {
  id: '449',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY COMPLAINS TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'GARY COMPLAINS'],
  title: 'In this town, Gary the ant complains to cats',
  description: 'Your paw? Way too big. Your nap? On my anthill. So Gary moves in with the cat. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: Gary complaining is made up. Quiz fact: the celestial compass of desert ants (Cataglyphis) relies mainly on the pattern of polarized light in the sky, not only on the sun itself (Wehner & Müller, "The significance of direct sunlight and polarized skylight in the ant\'s celestial system of navigation", PNAS, 2006).'],
  setup,
  scenes: [
    { say: 'In this town, Gary complains.', show: ['floor', 'wall', 'books', 'card'], sky: '#FCF3CF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.35, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.35, 0], fov: 48 } },
      update: (w, p, t) => { w.hill.visible = false; w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); gy(w, .6, .9, .9, -2.6, t, false, .75); rant(w, t); holdCard(w, null); } },
    { say: 'Your paw? Way too big.', label: 'TOO BIG', show: ['floor', 'wall', 'books'], sky: '#FCF3CF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.35, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.35, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.hill.visible = false; w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); const reach = Math.min(1, p * 2); w.c.paw.position.set(1.3 + reach * 1.6, .5 + reach * 1.8, 1.6); gy(w, .6, .9 + (reach >= 1 ? .3 * Math.abs(Math.sin(t * 9)) : 0), .9, -2.6, t, reach >= 1, .75); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'Your nap? On my anthill.', label: 'MOVE', show: ['floor', 'wall', 'card'], sky: '#FCF3CF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 7.5], look: [.2, .85, 0], fov: 50, to: { pos: [0, 1.8, 7], look: [.2, .85, 0], fov: 48 } },
      update: (w, p, t) => { w.books.visible = false; w.hill.visible = true; w.hill.position.set(0, .35, -.1); ctAt(w, .3, .45, -.1, -.3, .4); w.c.body.scale.set(1.5, .85, 1.1); w.c.head.position.y = 2.2; w.c.eyes.forEach(e => e.scale.y = .1); gy(w, 1.1, 0, .9, -2.6, t, false, .75); rant(w, t); if (p > .55) { w.c.eyes.forEach(e => e.scale.y = .5); holdCard(w, false); } else w.card.visible = false; } },
    { say: 'So Gary? Moves in with the cat.', label: 'ROOMMATES', show: ['floor', 'wall', 'card'], sky: '#FCF3CF', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 6.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 2, 6], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.hill.visible = false; w.c.head.position.y = 2.4; ctAt(w, 0, 0, 0, -.3, .4); w.c.head.updateWorldMatrix(true, false); const top = w.c.head.localToWorld(new w.k.THREE.Vector3(0, 1.3, 0)); gy(w, top.x, top.y - .1, top.z, -1.2, t, false, .55); w.g.rotation.x = .3; if (p > .5) holdCard(w, true); else w.card.visible = false; } },
    { say: 'Should Gary and the cat share? Comment below.',
      quiz: { q: 'Should Gary and the cat share?', options: ['Yes', 'No', 'Only on weekends'], answer: 'Made up. But real desert ants find their way using patterns of light in the sky.' },
      show: ['floor', 'books', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 7.5], look: [0, 1.1, 0], fov: 54, to: { pos: [-2, 2, 7.5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.hill.visible = false; w.g.rotation.x = 0; ctAt(w, -.3, 0, 0, -.4, .4); holdCard(w, true); w.books.position.set(1.2, 0, .9); gy(w, 1.2, .9, .9, -2.6 + .3 * Math.sin(t * 3), t, true, .75); } },
  ],
};
