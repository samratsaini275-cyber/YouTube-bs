// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the bookshelf complains about the cat.
// Hook: "This shelf has a complaint." under 2 s; first frame shows a bookshelf with a grumpy face and a cat holding a score card.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#B08D6E', 0);
  w.wall = group(); box(40, 16, .3, mat('#F3E9DC'), [0, 8, -1.2], w.wall);
  const wd = mat('#8D5A3B', { rough: .8 });
  w.sh = group(); box(1.8, .12, .7, wd, [0, 0, 0], w.sh); box(1.8, .12, .7, wd, [0, 1.1, 0], w.sh); box(1.8, .12, .7, wd, [0, 2.2, 0], w.sh); for (const x of [-.9, .9]) box(.1, 2.3, .7, wd, [x, 1.1, 0], w.sh); box(1.8, 2.3, .05, mat('#6D4C41'), [0, 1.1, -.33], w.sh);
  w.hdr = box(1.8, .55, .08, wd, [0, 1.85, .36], w.sh);
  const bc = ['#2E86C1', '#C0392B', '#27AE60', '#F1C40F', '#8E44AD', '#E67E22'];
  for (let i = 0; i < 6; i++) box(.2, .7 + (i % 3) * .08, .5, mat(bc[i]), [-.6 + i * .24, .45 + (i % 3) * .04, 0], w.sh);
  w.f = face(k, w.sh, [0, 1.85, .42], .42);
  w.book = group(); box(.2, .75, .5, mat('#C0392B'), [0, 0, 0], w.book);
  w.sign = group(); box(1, 1, .05, mat('#FFFFFF'), [0, 0, 0], w.sign); const sc = ball(.22, mat('#333333'), [0, -.05, .04], w.sign); sc.scale.set(1.1, .9, .3); for (const x of [-.12, .12]) k.cone(.08, .16, mat('#333333'), [x, .17, .04], w.sign, 4); k.torus(.38, .05, mat('#E2453C'), [0, 0, .07], w.sign); const sl = box(.76, .08, .03, mat('#E2453C'), [0, 0, .08], w.sign); sl.rotation.z = -.78;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const shAt = (w, x) => { w.sh.position.set(x, 0, -.6); w.sh.rotation.set(0, .12, 0); w.book.visible = false; w.sign.visible = false; };
const cam0 = { pos: [0, 2.2, 6.4], look: [0, 1.85, 0], fov: 50, to: { pos: [0, 2.2, 6], look: [0, 1.85, 0], fov: 48 } };
const env = { sky: '#F3E9DC', lightAt: [2, 9, 8], lightDist: 26 };
const ALL = ['floor', 'wall', 'sh'];

export default {
  id: '478',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SHELF',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SHELF', 'HAS A COMPLAINT'],
  title: 'This shelf has a complaint',
  description: 'Books knocked off? One by one. The top spot? Taken by the cat. And the cat? Five stars. So the shelf put up a no-cats sign. The cat sat on the sign. (A made-up comedy sketch.)',
  tags: ['funny', 'bookshelf', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining shelves are made up. Quiz fact: most cats have 26 deciduous (baby) teeth and 30 permanent teeth (Merck Veterinary Manual, "Dental Development of Cats"; VCA Animal Hospitals, "Persistent Deciduous Teeth (Baby Teeth) in Cats").'],
  setup,
  scenes: [
    { say: 'This shelf has a complaint.', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { shAt(w, -.6); talk(w.f, t); brow(w.f, .45); ctAt(w, .9, 0, .6, -.9, .3); holdCard(w, null); } },
    { say: 'Books knocked off? One by one.', label: 'BONK', show: [...ALL, 'book'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; shAt(w, -.3); talk(w.f, t); brow(w.f, .6); ctAt(w, -.2, 2.26, -.55, -.3, .26); const q = (p * 2.5) % 1; w.book.visible = true; w.book.position.set(.85 + q * .5, 2.65 - 2.3 * q * q, -.3); w.book.rotation.set(0, 0, -q * 3); w.c.paw.position.set(1.4, .6 + (q < .2 ? .3 : 0), .9); } },
    { say: 'The top spot? Taken by the cat.', label: 'MINE', show: [...ALL], ...env,
      cam: { pos: [0, 2.7, 5.6], look: [0, 2.0, 0], fov: 50, to: { pos: [0, 2.7, 5.2], look: [0, 2.0, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; shAt(w, 0); talk(w.f, t); brow(w.f, -.4); ctAt(w, .25, 2.26, -.6, -.15, .27); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { shAt(w, -.6); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .9, 0, .6, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the shelf put up a no-cats sign. The cat sat on the sign.', label: 'NO CATS?', show: [...ALL, 'sign'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; shAt(w, -.4); w.sign.visible = true; const on = p > .5; w.sign.position.set(-.3, on ? 2.32 : 2.85, -.4); w.sign.rotation.set(on ? -Math.PI / 2 : 0, .12, 0); talk(w.f, t, !on || p > .8); brow(w.f, on ? .6 : -.3); if (on) { ctAt(w, -.6, 2.33, -.35, -.3, .26); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } else ctAt(w, 1, 0, .6, -1.2, .3); } },
    { say: 'Grumpy shelf: tidy it, move it, or give the top to the cat? Comment below.',
      quiz: { q: 'What do you do with the grumpy shelf?', options: ['Tidy it', 'Move it', 'Give the top to the cat'], answer: 'Fun fact: kittens have 26 baby teeth, and adult cats have 30 teeth.' },
      show: [...ALL, 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2, 6], look: [0, 1.8, 0], fov: 54, to: { pos: [-2, 2, 6], look: [0, 1.8, 0] } },
      update: (w, p, t) => { w.wall.visible = false; shAt(w, -.6); talk(w.f, t, false); ctAt(w, .9, 0, .6, -.9, .32); holdCard(w, true); } },
  ],
};
