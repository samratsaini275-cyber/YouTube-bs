// Narrative 24: "In This Town… (season 3: cats say it out loud)". Gary slot (434): Gary copies the cat; the cat scores him.
// Hook: the rule under 2 s; first frame shows Gary next to a cat holding up a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#F5E0C8'), [0, 8, -4], w.wall);
  w.sun = box(3.2, .02, 2.4, mat('#FFE27A', { glow: .5 }), [0, .02, 0]); w.sun.material.transparent = true; w.sun.material.opacity = .7;
  w.table = group(); box(4, .2, 2, mat('#8A5A2B'), [0, 2, 0], w.table); for (const x of [-1.8, 1.8]) for (const z of [-.8, .8]) box(.15, 2, .15, mat('#6B4420'), [x, 1, z], w.table);
  w.cup = group(); cyl(.25, .2, .5, mat('#4FA3E0'), [0, .25, 0], w.cup, 14);
  w.books = group(); box(1.2, .3, .9, mat('#3F6FD1'), [0, .15, 0], w.books); box(1.1, .3, .85, mat('#D13F3F'), [0, .45, 0], w.books); box(1.15, .3, .9, mat('#3FA34D'), [0, .75, 0], w.books);
  w.crumb = ball(.08, mat('#E8C07A'), [0, 0, 0]);
  w.g = gary(k, k.scene, 1.3, null);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '434',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY COPIES CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'GARY COPIES CATS'],
  title: 'In this town, Gary the ant copies cats',
  description: 'A paw lick? Gary licks a leg. A sunny nap? Gary naps too. Knocking stuff off tables? Gary pushes a crumb. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: Gary copying a cat is made up. Quiz fact: queens of the black garden ant (Lasius niger) have the longest lifespan recorded for a social insect; one lived about 28 and three-quarter years in a laboratory, while workers usually live only a year or two (Kutter & Stumper, 1969, as reported in the AnAge database of animal ageing and longevity, and in Kramer et al., "Worker lifespan is an adaptive trait during colony establishment in the long-lived ant Lasius niger", Experimental Gerontology, 2017).'],
  setup,
  scenes: [
    { say: 'In this town, Gary copies cats.', show: ['floor', 'wall', 'books', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.35, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.35, 0], fov: 48 } },
      update: (w, p, t) => { w.books.position.set(.9, 0, .9); ctAt(w, -.6, 0, 0, -.3, .4); gy(w, .9, .9, .9, -2.6, t, false, .75); holdCard(w, null); } },
    { say: 'A paw lick? Gary licks a leg.', label: '5 STARS', show: ['floor', 'wall', 'books', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.1, 7.5], look: [0, 1.35, 0], fov: 50, to: { pos: [0, 2.1, 7], look: [0, 1.35, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, -.6, 0, 0, -.3, .4); const lick = p < .5; if (lick) { w.card.visible = false; w.c.paw.position.set(1.3, 1.9 + .1 * Math.sin(t * 12), .6); w.c.head.rotation.z = -.25; w.c.eyes.forEach(e => e.scale.y = .2); } else holdCard(w, true); w.books.position.set(.9, 0, .9); gy(w, .9, .9, .9, -2.6, t, false, .75); w.g.rotation.z = .5; w.g.userData.legs[1].rotation.x = -.9 + .25 * Math.sin(t * 14); w.g.userData.legs[0].rotation.x = -.9 + .25 * Math.sin(t * 14 + 1); } },
    { say: 'A sunny nap? Gary naps too.', label: 'NAP TIME', show: ['floor', 'wall', 'sun'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.4, 7.5], look: [0, 1.1, 0], fov: 50, to: { pos: [0, 2.4, 7], look: [0, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.sun.position.set(0, .02, .3); ctAt(w, -.1, 0, 0, -.2, .4); w.c.body.scale.set(1.5, .8 + .04 * Math.sin(t * 2), 1); w.c.head.position.y = 2.1; w.c.eyes.forEach(e => e.scale.y = .1); gy(w, -.75, .9 + .03 * Math.sin(t * 2), 0, 0, t, false, .7); w.g.rotation.x = Math.PI / 2 * .9; } },
    { say: 'Knocking stuff off tables? Gary pushes a crumb.', label: 'TRIES', show: ['floor', 'wall', 'table', 'cup', 'crumb', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-.2, 3.4, 8.5], look: [.15, 2.5, 0], fov: 52, to: { pos: [-.2, 3.4, 8], look: [.15, 2.5, 0], fov: 50 } },
      update: (w, p, t) => { w.c.head.position.y = 2.4; ctAt(w, -1.2, 2.1, 0, -.1, .42); const k1 = Math.min(1, Math.max(0, (p - .1) * 4)); w.cup.position.set(.2 + k1 * .6, 2.1 - (k1 > .5 ? (k1 - .5) * 4.2 : 0), .4); w.cup.rotation.z = -k1 * 1.6; if (p < .35) { w.card.visible = false; w.c.paw.position.set(1.4 + k1, 1, .9); } else holdCard(w, p > .7 ? true : null); const k2 = Math.min(1, Math.max(0, (p - .4) * 2.2)); gy(w, 1.2 + k2 * .5, 2.1, .6, 0, t, k2 > 0 && k2 < 1, .9); w.crumb.position.set(1.55 + k2 * .5, 2.18 - (k2 > .9 ? (k2 - .9) * 14 : 0), .6); } },
    { say: 'Is Gary a good cat? Comment below.',
      quiz: { q: 'Is Gary a good cat?', options: ['Yes', 'No', 'Almost'], answer: 'Made up. But one real ant queen lived almost 29 years in a lab.' },
      show: ['floor', 'books', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 7.5], look: [0, 1.1, 0], fov: 54, to: { pos: [-2, 2, 7.5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.table.visible = false; w.c.head.position.y = 2.4; ctAt(w, -.3, 0, 0, -.4, .4); holdCard(w, true); w.books.position.set(1.2, 0, .9); gy(w, 1.2, .9, .9, -2.6 + .3 * Math.sin(t * 3), t, true, .75); } },
  ],
};
