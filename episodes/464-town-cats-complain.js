// Narrative 25: "In This Town… (season 4: things complain to the cat)". Gary slot, season finale (464): the cat complains, and Gary holds the score card.
// Hook: the rule under 2 s; first frame shows a cat complaining with its mouth open and Gary on a stack of books holding a tiny score card.

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
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#D6EAF8'), [0, 8, -4], w.wall);
  w.books = group(); box(1.2, .3, .9, mat('#3F6FD1'), [0, .15, 0], w.books); box(1.1, .3, .85, mat('#D13F3F'), [0, .45, 0], w.books); box(1.15, .3, .9, mat('#3FA34D'), [0, .75, 0], w.books);
  w.bowl = group(); k.cyl(.4, .3, .25, mat('#E74C3C'), [0, .12, 0], w.bowl, 16);
  w.bed = group(); k.cyl(.9, .9, .25, mat('#AF7AC5'), [0, .12, 0], w.bed, 20);
  w.pad = group(); box(.5, .65, .03, mat('#FDFEFE'), [0, 0, 0], w.pad); for (let i = 0; i < 4; i++) box(.36, .03, .035, mat('#5D6D7E'), [0, .2 - i * .12, .01], w.pad);
  w.conf = []; for (let i = 0; i < 26; i++) { const c = box(.08, .08, .02, mat(['#E74C3C', '#F1C40F', '#3498DB', '#2ECC71', '#9B59B6'][i % 5], { glow: .4 }), [0, 0, 0]); c.userData.o = [Math.random(), Math.random(), Math.random()]; w.conf.push(c); }
  w.g = gary(k, k.scene, 1.3, null);
  w.card = group(); box(.6, .45, .04, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.28, .28, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .03], w.card); w.nr = box(.28, .28, .02, mat('#E2453C', { glow: .4 }), [0, 0, .03], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.mouth = box(.35, .3, .55, mat('#5B2C2C'), [1.05, -.8, 0], w.c.head);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCardCat = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const garyCard = (w, good) => { w.g.updateWorldMatrix(true, false); const at = w.g.localToWorld(new w.k.THREE.Vector3(.4, 1.1, 0)); w.card.position.copy(at); w.card.rotation.set(0, 0, 0); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };
const moan = (w, t, on = true) => { w.mouth.visible = on && Math.sin(t * 12) > -.2; w.c.head.rotation.z = on ? .08 * Math.sin(t * 6) : 0; };
const confetti = (w, t, on) => w.conf.forEach(c => { const [a, b, d] = c.userData.o; c.visible = on; c.position.set((a - .5) * 4, 3.5 - ((t * .5 + b) % 1) * 3.5, (d - .5) * 2 + .5); c.rotation.set(t * 3 + a * 6, t * 2 + b * 6, 0); });

export default {
  id: '464',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS COMPLAIN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS COMPLAIN'],
  title: 'In this town, cats complain to Gary the ant (season finale)',
  description: 'Breakfast one minute late? One star, says Gary. Gary napping on the cat bed? Five stars. So Gary writes every complaint down. The end. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: complaining cats are made up. Quiz fact: the ant life cycle has four stages (egg, larva, pupa and adult) and typically spans 8 to 10 weeks for worker ants (Encyclopaedia Britannica, "Ant").'],
  setup,
  scenes: [
    { say: 'In this town, cats complain.', show: ['floor', 'wall', 'books', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 7.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2, 7], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); w.bowl.visible = false; w.bed.visible = false; w.pad.visible = false; w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); moan(w, t); gy(w, .6, .9, .9, -2.6, t, false, .75); garyCard(w, null); } },
    { say: 'Breakfast one minute late? One star.', label: '1 STAR', show: ['floor', 'wall', 'books', 'bowl', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 7.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2, 7], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); w.bed.visible = false; w.pad.visible = false; w.bowl.position.set(-.3, 0, 1); w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); moan(w, t, p < .5); gy(w, .6, .9, .9, -2.6, t, false, .75); if (p > .45) garyCard(w, false); else w.card.visible = false; } },
    { say: 'Gary napping on the cat bed? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'bed', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 6.5], look: [0, 1.1, 0], fov: 50, to: { pos: [0, 1.8, 6], look: [0, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); w.books.visible = false; w.bowl.visible = false; w.pad.visible = false; w.bed.position.set(.1, 0, 0); ctAt(w, .2, .25, 0, -.3, .4); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .15); moan(w, t, false); gy(w, .75, .25, .55, -2.2, t, false, .6); w.g.rotation.x = .2; if (p > .4) garyCard(w, true); else w.card.visible = false; } },
    { say: 'So Gary? Writes every complaint down. The end.', label: 'THE END', show: ['floor', 'wall', 'books', 'pad'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 7], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2, 6.5], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.books.position.set(.6, 0, .9); ctAt(w, -.9, 0, 0, -.3, .4); moan(w, t, p < .4); gy(w, .5, .9, .9, -2.4, t, false, .75); w.pad.position.set(.95, 1.45, 1.05); w.pad.rotation.set(-.2, -.3, .1 * Math.sin(t * 8)); confetti(w, t, p > .55); } },
    { say: 'Is Gary a good listener? Comment below.',
      quiz: { q: 'Is Gary a good listener?', options: ['Yes', 'No', 'Too tiny to tell'], answer: 'Made up. But a real worker ant grows from egg to adult in about 8 to 10 weeks.' },
      show: ['floor', 'books', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 7.5], look: [0, 1.15, 0], fov: 54, to: { pos: [-2, 2, 7.5], look: [0, 1.15, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.pad.visible = false; confetti(w, t, true); w.books.position.set(1, 0, .9); ctAt(w, -.4, 0, 0, -.4, .4); moan(w, t, false); gy(w, 1, .9, .9, -2.6 + .3 * Math.sin(t * 3), t, true, .75); garyCard(w, true); } },
  ],
};
