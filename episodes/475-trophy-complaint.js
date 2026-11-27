// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the cat-show trophy complains about the cat.
// Hook: "This trophy has a complaint." under 2 s; first frame shows a gold trophy with a grumpy face and a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#F5EEF8'), [0, 8, -4], w.wall);
  const gold = mat('#F4D03F', { rough: .25, glow: .15 });
  w.tr = group(); box(1, .3, 1, mat('#5D4037'), [0, .15, 0], w.tr); cyl(.12, .16, .6, gold, [0, .6, 0], w.tr, 12); cyl(.75, .3, .9, gold, [0, 1.35, 0], w.tr, 24); for (const x of [-1, 1]) { const hdl = k.torus(.22, .05, gold, [x * .82, 1.4, 0], w.tr); hdl.rotation.y = Math.PI / 2; }
  w.f = face(k, w.tr, [0, 1.3, .62], .38);
  w.ribbon = group(); box(.5, .7, .03, mat('#2E86C1'), [0, 0, 0], w.ribbon); k.ball(.25, mat('#2E86C1'), [0, .4, 0], w.ribbon);
  w.shelf = group(); box(2.4, .12, 1, mat('#8D6E63'), [0, 0, 0], w.shelf);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const trAt = (w, x, y, z, s = 1) => { w.tr.position.set(x, y, z); w.tr.scale.setScalar(s); w.tr.rotation.set(0, .2, 0); };

export default {
  id: '475',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TROPHY',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS TROPHY', 'HAS A COMPLAINT'],
  title: 'This trophy has a complaint',
  description: 'Won best cat at the show? The cat yawns. Used as a bed? Every night. And the cat? Five stars. So the trophy moved to a high shelf. The cat jumped up. (A made-up comedy sketch.)',
  tags: ['funny', 'trophy', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining trophies are made up. Quiz fact: the first cat show in England was organised by the artist Harrison Weir and held at the Crystal Palace, London, in July 1871 (Wikipedia, "Harrison Weir"; Atlas Obscura, "How England\'s First Feline Show Countered Victorian Snobbery About Cats").'],
  setup,
  scenes: [
    { say: 'This trophy has a complaint.', show: ['floor', 'wall', 'tr', 'card'], sky: '#F5EEF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 6.3], look: [0, 1.7, 0], fov: 50, to: { pos: [0, 1.7, 5.9], look: [0, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { trAt(w, -.6, 0, 0); w.ribbon.visible = false; w.shelf.visible = false; talk(w.f, t); brow(w.f, .45); ctAt(w, .7, 0, .5, -.9, .3); holdCard(w, null); } },
    { say: 'Won best cat at the show? The cat yawns.', label: 'YAWN', show: ['floor', 'wall', 'tr', 'ribbon'], sky: '#F5EEF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 6.3], look: [0, 1.7, 0], fov: 50, to: { pos: [0, 1.7, 5.9], look: [0, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.shelf.visible = false; trAt(w, -.6, 0, 0); w.ribbon.position.set(.9, 1.1, .7); talk(w.f, t); brow(w.f, -.3); ctAt(w, .7, 0, .5, -.9, .3); w.c.head.rotation.z = p > .4 ? .35 : 0; w.c.eyes.forEach(e => e.scale.y = p > .4 ? .1 : 1); } },
    { say: 'Used as a bed? Every night.', label: 'CUP NAP', show: ['floor', 'wall', 'tr'], sky: '#F5EEF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.3, 5.5], look: [0, 1.5, 0], fov: 50, to: { pos: [0, 2.3, 5.1], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.ribbon.visible = false; w.shelf.visible = false; trAt(w, -.2, 0, 0); talk(w.f, t); brow(w.f, .55); ctAt(w, -.15, 1.55, 0, -.4, .26); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .1); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'tr', 'card'], sky: '#F5EEF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.7, 6.3], look: [0, 1.7, 0], fov: 50, to: { pos: [0, 1.7, 5.9], look: [0, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { trAt(w, -.6, 0, 0); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .7, 0, .5, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the trophy moved to a high shelf. The cat jumped up.', label: 'FOUND IT', show: ['floor', 'wall', 'tr', 'shelf'], sky: '#F5EEF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 6.5], look: [0, 2.4, 0], fov: 52, to: { pos: [0, 2.6, 6.1], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.card.visible = false; w.shelf.position.set(-.2, 2.2, -.6); trAt(w, -.6, 2.26, -.6, .7); talk(w.f, t, p < .5); brow(w.f, p < .5 ? -.3 : -.5); const up = Math.max(0, Math.min(1, (p - .45) * 2.5)); ctAt(w, .5, up < 1 ? Math.sin(up * Math.PI) * 3 + up * 2.26 : 2.26, -.55, -.6, .26); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'What award should cats win? Comment below.',
      quiz: { q: 'Best cat award?', options: ['Best nap', 'Best stare', 'Best at ignoring you'], answer: 'Fun fact: England\'s first cat show was held at the Crystal Palace in London in 1871.' },
      show: ['floor', 'tr', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.6, 6], look: [0, 1.2, 0], fov: 54, to: { pos: [-2, 1.6, 6], look: [0, 1.2, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.shelf.visible = false; w.ribbon.visible = false; trAt(w, -.6, 0, 0); talk(w.f, t, false); ctAt(w, .7, 0, .5, -.9, .32); holdCard(w, true); } },
  ],
};
