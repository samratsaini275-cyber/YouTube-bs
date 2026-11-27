// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a living room, the cat behind him.

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
  const w = {};
  w.floor = k.ground('#BFA58A', 0);
  w.wall = group(); box(60, 30, .5, mat('#F5EEF8'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.post = group(); box(.6, .1, .6, mat('#8D6E63'), [0, .05, 0], w.post); cyl(.06, .06, 1.6, mat('#E6B87A'), [0, .85, 0], w.post, 8);
  w.sofa = group(); box(6, 1.4, 2.4, mat('#2E86C1', { rough: .9 }), [0, .7, 0], w.sofa); box(6, 2, .6, mat('#2874A6', { rough: .9 }), [0, 1.9, -.9], w.sofa); for (const x of [-3.1, 3.1]) box(.5, 1.9, 2.4, mat('#2874A6', { rough: .9 }), [x, .95, 0], w.sofa);
  w.marks = group(); for (let i = 0; i < 4; i++) box(.06, 1, .02, mat('#F5EEF8'), [-.3 + i * .2, 1.9, -.58], w.marks);
  w.chips = group(); for (let i = 0; i < 8; i++) { const c = box(.08, .03, .05, mat('#E6B87A'), [0, 0, 0], w.chips); c.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#F5EEF8', lightAt: [2, 9, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '511',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BUILDER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BUILT A SCRATCHING POST.'],
  title: 'Gary the ant built the cat a scratching post',
  description: 'The post is one toothpick. One scratch, and it is gone. So the cat scratched the sofa, and Gary got the blame. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: carpenter ants do not eat wood the way termites do; they tunnel into it with their strong mandibles to make nests and push the debris outside (Encyclopaedia Britannica, "carpenter ant").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary built a scratching post.',
      show: ['floor', 'wall', 'g', 'post'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'sofa', 'marks', 'chips'); w.post.position.set(.6, 0, .7); w.post.visible = true; w.post.rotation.z = 0; ctAt(w, 1.6, 0, -1.8, -2.2, .7); gy(w, -.3, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'The post? One toothpick.',
      show: ['floor', 'wall', 'g', 'post'], ...env,
      cam: { pos: [.4, 1.4, 4.5], look: [0, .9, 0], fov: 46, to: { pos: [.4, 1.4, 4.1], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'sofa', 'marks', 'chips'); w.cr.visible = false; w.post.position.set(.4, 0, .2); w.post.rotation.z = 0; gy(w, -.5, 0, .4, -1.4, t); w.g.rotation.z = -.1; },
    },
    {
      say: 'One scratch? Gone.',
      show: ['floor', 'wall', 'g', 'post', 'chips'], ...env,
      cam: { pos: [.6, 2.2, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [.6, 2.2, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'sofa', 'marks'); ctAt(w, 2.2, 0, -.4, -2.8, .8); const sw = Math.min(1, Math.max(0, (p - .25) * 3)); w.c.paw.position.set(.9 + sw * .6, .5 + Math.sin(sw * Math.PI) * .8, .9); w.post.position.set(.4, 0, .4); w.post.visible = sw < .5; w.chips.visible = sw >= .5; w.chips.children.forEach(c => { const i = c.userData.i, q = sw; c.position.set(.4 + Math.cos(i) * q, .3 + Math.sin(i * 2) * .3 + .3, .4 + Math.sin(i) * q); c.rotation.set(i, i * 2, 0); }); gy(w, -.3, 0, 1.4, -1.4, t); w.g.rotation.z = sw >= .5 ? Math.sin(t * 25) * .06 : 0; },
    },
    {
      say: 'So the cat scratched the sofa. Gary got the blame.',
      show: ['floor', 'wall', 'g', 'sofa', 'marks'], ...env,
      cam: { pos: [.6, 2.6, 9], look: [0, 1.6, -1], fov: 50, to: { pos: [.6, 2.6, 8.4], look: [0, 1.6, -1], fov: 48 } },
      update: (w, p, t) => { hide(w, 'post', 'chips'); w.sofa.position.set(0, 0, -2.6); w.marks.position.set(0, 0, -2); w.marks.visible = p > .3; ctAt(w, 2.2, 0, -.2, -2.6, .75); w.c.eyes.forEach(e => e.scale.y = p > .5 ? .2 : 1); gy(w, -.3, 0, 1.2, -1.4, t); w.g.rotation.z = p > .55 ? -.2 : 0; },
    },
    {
      say: 'Best scratching post for the cat: a box, a rug, or the sofa? Comment below.',
      quiz: { q: 'What is the best scratching post for the cat?', options: ['A box', 'A rug', 'The sofa'], answer: 'Fun fact: carpenter ants don\'t eat wood. They tunnel into it to make nests.' },
      show: ['floor', 'wall', 'g', 'sofa', 'marks'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 26,
      cam: { pos: [2.2, 2.6, 9], look: [0, 1.6, -1], fov: 48, to: { pos: [-1.4, 2.6, 9], look: [0, 1.6, -1] } },
      update: (w, p, t) => { hide(w, 'post', 'chips'); w.sofa.position.set(0, 0, -2.6); w.marks.position.set(0, 0, -2); ctAt(w, 2.2, 0, -.2, -2.6, .75); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, -.3, 0, 1.2, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
