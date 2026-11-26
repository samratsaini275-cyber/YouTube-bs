// Narrative 24: "In This Town… (season 3: cats say it out loud)". Gary slot (439): Gary tries the cat's toys; the cat scores him.
// Hook: the rule under 2 s; first frame shows Gary on a stack of books beside a cat holding a score card, toys on the floor.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#D5E8D4'), [0, 8, -4], w.wall);
  w.books = group(); box(1.2, .3, .9, mat('#3F6FD1'), [0, .15, 0], w.books); box(1.1, .3, .85, mat('#D13F3F'), [0, .45, 0], w.books); box(1.15, .3, .9, mat('#3FA34D'), [0, .75, 0], w.books);
  w.wand = group(); const st = cyl(.03, .03, 2.4, mat('#8E44AD'), [0, 1.2, 0], w.wand, 6); w.feather = group([0, 2.4, 0], w.wand); for (let i = 0; i < 5; i++) { const f = k.cone(.1, .6, mat(['#E74C3C', '#F1C40F', '#3498DB', '#2ECC71', '#E67E22'][i]), [0, .25, 0], w.feather, 6); f.rotation.z = (i - 2) * .35; }
  w.yarn = group(); ball(.55, mat('#E84393', { rough: .9 }), [0, .55, 0], w.yarn); for (let i = 0; i < 4; i++) { const r = cyl(.57, .57, .04, mat('#C2185B'), [0, .55, 0], w.yarn, 20); r.rotation.set(i * .8, i * .5, 0); }
  w.dot = cyl(.12, .12, .02, mat('#FF2020', { glow: 1 }), [0, .02, 0], k.scene, 16);
  w.g = gary(k, k.scene, 1.3, null);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '439',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY TRIES CAT TOYS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'GARY TRIES CAT TOYS'],
  title: 'In this town, Gary the ant tries cat toys',
  description: 'A feather wand? Gary rides it. A ball of yarn? Total tangle. The laser dot? Gary catches it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: Gary playing with cat toys is made up. Quiz fact: workers of the canopy ant Cephalotes atratus that fall from a tree glide abdomen-first and steer back to their home tree trunk more than 80% of the time, using sight to find the trunk (Yanoviak, Dudley & Kaspari, "Directed aerial descent in canopy ants", Nature, 2005).'],
  setup,
  scenes: [
    { say: 'In this town, Gary tries cat toys.', show: ['floor', 'wall', 'books', 'yarn', 'card'], sky: '#D5E8D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.35, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.35, 0], fov: 48 } },
      update: (w, p, t) => { w.dot.visible = false; w.yarn.position.set(1.6, 0, -.6); w.books.position.set(.9, 0, .9); ctAt(w, -.6, 0, 0, -.3, .4); gy(w, .9, .9, .9, -2.6, t, false, .75); holdCard(w, null); } },
    { say: 'A feather wand? Gary rides it.', label: 'WHEE', show: ['floor', 'wall', 'wand', 'card'], sky: '#D5E8D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.3, 7.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.3, 7], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.dot.visible = false; const sw = .25 * Math.sin(t * 3); w.wand.position.set(1.2, 0, .6); w.wand.rotation.z = .15 + sw; w.feather.updateWorldMatrix(true, false); const at = w.feather.getWorldPosition(new w.k.THREE.Vector3()); gy(w, at.x, at.y + .05, at.z, -2.6, t, false, .6); w.g.rotation.z = sw * .5; ctAt(w, -.9, 0, 0, -.3, .4); w.c.head.rotation.z = .25; w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); if (p > .5) holdCard(w, true); else w.card.visible = false; } },
    { say: 'A ball of yarn? Total tangle.', label: 'TANGLED', show: ['floor', 'wall', 'yarn', 'card'], sky: '#D5E8D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.35, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.35, 0], fov: 48 } },
      update: (w, p, t) => { w.dot.visible = false; const r = p * 2.2; w.yarn.position.set(1.8 - r * .8, 0, .8); w.yarn.rotation.y = r * 3; gy(w, 1.8 - r * .8, 1.1, .8, -2.6 + r * 6, t, true, .6); w.g.rotation.z = .4 * Math.sin(t * 9); ctAt(w, -1.2, 0, 0, -.3, .4); w.c.paw.position.set(1.2, 1.2, .9); if (p > .55) holdCard(w, false); else w.card.visible = false; } },
    { say: 'The laser dot? Gary catches it.', label: 'CAUGHT IT', show: ['floor', 'wall'], sky: '#D5E8D4', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 7], look: [0, .75, 0], fov: 50, to: { pos: [0, 2.2, 6.5], look: [0, .75, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.dot.visible = true; const caught = p > .55; const dx = caught ? .6 : .6 + Math.sin(t * 6) * .7, dz = caught ? .6 : .6 + Math.cos(t * 4.3) * .4; w.dot.position.set(dx, .02, dz); gy(w, caught ? dx : .9 - (p / .55) * .3, 0, caught ? dz : .9, caught ? -1.6 : -2.6, t, !caught, .7); ctAt(w, -.9, 0, 0, -.3, .4); w.c.head.rotation.y = -.3 * Math.sin(t * 6); if (caught) { w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); w.g.rotation.z = .3; } } },
    { say: 'Best toy for Gary? Comment below.',
      quiz: { q: 'Best toy for Gary?', options: ['Feather wand', 'Yarn ball', 'Laser dot'], answer: 'Made up. But some real ants can steer back to their tree when they fall.' },
      show: ['floor', 'books', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 7.5], look: [0, 1.1, 0], fov: 54, to: { pos: [-2, 2, 7.5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.dot.visible = false; w.wand.visible = false; w.yarn.visible = false; ctAt(w, -.3, 0, 0, -.4, .4); holdCard(w, true); w.books.position.set(1.2, 0, .9); gy(w, 1.2, .9, .9, -2.6 + .3 * Math.sin(t * 3), t, true, .75); } },
  ],
};
