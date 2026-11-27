// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a giant chessboard, the cat across from him.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#A1887F', 0);
  w.wall = group(); box(60, 30, .5, mat('#D6EAF8'), [0, 15, -8], w.wall);
  w.board = group(); for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) box(1, .1, 1, mat((i + j) % 2 ? '#4E342E' : '#F5E6CA'), [-3.5 + i, .05, -3.5 + j], w.board);
  w.pieces = group(); for (let i = 0; i < 6; i++) { const pc = group([-2.5 + i, .1, -2.5 + (i % 2)], w.pieces); const m = mat(i % 2 ? '#1C1C1C' : '#FDFEFE'); cyl(.35, .45, .25, m, [0, .12, 0], pc, 16); cyl(.2, .3, 1, m, [0, .75, 0], pc, 16); i === 3 ? cone(.3, .6, m, [0, 1.55, 0], pc, 12) : ball(.28, m, [0, 1.4, 0], pc); pc.userData.i = i; pc.userData.home = pc.position.clone(); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const reset = (w) => w.pieces.children.forEach(pc => { pc.position.copy(pc.userData.home); pc.rotation.set(0, 0, 0); pc.visible = true; });
const env = { sky: '#D6EAF8', lightAt: [2, 9, 6], lightDist: 28 };

export default {
  id: '507',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CHESS GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'PLAYED CHESS WITH THE CAT.'],
  title: 'Gary the ant played chess with the cat',
  description: 'The chessboard is a whole field. Moving one piece takes all day. And the cat\'s move? Every piece off the board. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'chess', 'funny', 'shorts'],
  sources: [
    'Quiz fact: a cat\'s tail is part of its spine and generally contains about 20 extra (caudal) vertebrae (Encyclopaedia Britannica, "cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary played chess with the cat.',
      show: ['floor', 'wall', 'board', 'pieces', 'g'], ...env,
      cam: { pos: [1.6, 2.6, 8], look: [0, 1.2, 0], fov: 50, to: { pos: [1.5, 2.6, 7.4], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { reset(w); ctAt(w, 1.4, 0, -5.2, -1.9, .9); gy(w, -.4, .1, 2.6, -1.6, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The board? A whole field.',
      show: ['floor', 'wall', 'board', 'pieces', 'g'], ...env,
      cam: { pos: [0, .9, 5.6], look: [0, .9, -2], fov: 52, to: { pos: [0, .9, 5.2], look: [0, .9, -2], fov: 50 } },
      update: (w, p, t) => { reset(w); w.cr.visible = false; gy(w, .4, .1, 1.6, Math.PI / 2 + .5, t, true); w.g.rotation.z = 0; },
    },
    {
      say: 'One move? It took all day.',
      show: ['floor', 'wall', 'board', 'pieces', 'g'], ...env, sky: '#F5B041',
      cam: { pos: [1.4, 2.4, 3.8], look: [.5, .9, -1.5], fov: 48, to: { pos: [1.3, 2.4, 3.4], look: [.5, .9, -1.5], fov: 46 } },
      update: (w, p, t) => { reset(w); w.cr.visible = false; const pc = w.pieces.children[3]; pc.position.set(.5, .1, -1.5 + p * .5); pc.rotation.z = .08; gy(w, .5, .1, -.8 + p * .5, Math.PI / 2, t, true); w.g.rotation.z = -.35; },
    },
    {
      say: 'The cat\'s move? Every piece. Off the board.',
      show: ['floor', 'wall', 'board', 'pieces', 'g'], ...env,
      cam: { pos: [1.4, 3.6, 9.5], look: [0, 1.4, -1], fov: 52, to: { pos: [1.4, 3.6, 8.9], look: [0, 1.4, -1], fov: 50 } },
      update: (w, p, t) => { reset(w); ctAt(w, -.6, 0, -5.2, -1.6, .9); const sw = Math.min(1, Math.max(0, (p - .3) * 2.5)); w.c.paw.position.set(1 + sw * .8, .6 + Math.sin(sw * Math.PI) * .6, .9); w.pieces.children.forEach(pc => { const i = pc.userData.i, f = Math.max(0, sw - i * .08); pc.position.set(pc.userData.home.x + f * (3 + i), pc.userData.home.y + Math.sin(Math.min(1, f) * Math.PI) * 2 - Math.max(0, f - 1) * 2, pc.userData.home.z + f * 2); pc.rotation.set(f * 4, 0, f * 6); }); gy(w, -.6, .1, 2.6, -1.6, t); w.g.rotation.z = sw > .5 ? Math.sin(t * 25) * .06 : 0; },
    },
    {
      say: 'Best game for Gary and the cat: chess, tag, or naps? Comment below.',
      quiz: { q: 'What is the best game for Gary and the cat?', options: ['Chess', 'Tag', 'Naps'], answer: 'Fun fact: a cat\'s tail holds about 20 extra bones of its spine.' },
      show: ['floor', 'wall', 'board', 'g'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 28,
      cam: { pos: [2.4, 3.2, 9], look: [0, 1.4, -1], fov: 50, to: { pos: [-1.4, 3.2, 9], look: [0, 1.4, -1] } },
      update: (w, p, t) => { ctAt(w, -.6, 0, -5.2, -1.6, .9); w.c.eyes.forEach(e => e.scale.y = .3); gy(w, -.6, .1, 2.6, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
