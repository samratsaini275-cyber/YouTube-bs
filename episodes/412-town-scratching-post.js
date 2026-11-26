// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: a scratching post that wants to be used.
// Hook: the rule under 2 s; first frame shows a scratching post with a face next to a cat.

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
  const { mat, box, cyl, torus, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#F5E6C8'), [0, 8, -4], w.wall);
  w.post = group(); box(1.8, .3, 1.8, mat('#9C7CE4'), [0, .15, 0], w.post); w.rope = cyl(.5, .5, 3.4, mat('#D8C08A', { rough: 1 }), [0, 2, 0], w.post, 16); for (let i = 0; i < 14; i++) { const r = torus(.5, .04, mat('#C4A86E'), [0, .45 + i * .23, 0], w.post); r.rotation.x = Math.PI / 2; } box(1.4, .25, 1.4, mat('#9C7CE4'), [0, 3.8, 0], w.post);
  w.pf = face(k, w.post, [0, 2.5, .52], .6);
  w.sofa = group(); box(5, 1.2, 2.2, mat('#3B82F6'), [0, .6, 0], w.sofa); box(5, 1.8, .5, mat('#2F6FD6'), [0, 1.8, -.85], w.sofa); for (const x of [-2.6, 2.6]) box(.5, 1.6, 2.2, mat('#2F6FD6'), [x, .8, 0], w.sofa);
  w.rips = group(); for (let i = 0; i < 4; i++) box(.06, .9, .02, mat('#F5F0E0'), [-1.6 + i * .18, 1.5, -.58], w.rips);
  w.fluff = group(); for (let i = 0; i < 10; i++) { const f = ball(.1, mat('#D8C08A'), [0, 0, 0], w.fluff); f.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '412',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SCRATCHING POST TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'SCRATCH POSTS TALK'],
  title: 'In this town, scratching posts can talk',
  description: 'The cat picks the sofa? The post gets jealous. Finally used? It giggles. Too many claws? It goes bald. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking scratching posts are made up. Quiz fact: scratching is a normal cat behaviour used to mark territory; scent glands in the paws leave a smell other cats can detect (UC Davis School of Veterinary Medicine, "Inappropriate Scratching in Cats"; VIN Veterinary Partner, "Understanding Scratching Behavior in Cats").'],
  setup,
  scenes: [
    { say: 'In this town, scratch posts talk.', show: ['floor', 'wall', 'post', 'cr'], sky: '#F5E6C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.7, 3.4, 11], look: [.7, 2.9, 0], fov: 52, to: { pos: [.7, 3.4, 10.5], look: [.7, 2.9, 0], fov: 50 } },
      update: (w, p, t) => { w.sofa.visible = false; w.rips.visible = false; w.fluff.visible = false; w.post.position.set(-.8, 0, 0); talk(w.pf, t); brow(w.pf, -.2); ctAt(w, 2, 0, .8, Math.PI + .4, .5); } },
    { say: 'The cat picks the sofa? It gets jealous.', label: 'HMPH', show: ['floor', 'wall', 'post', 'sofa', 'rips', 'cr'], sky: '#F5E6C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.5, 3.8, 14.5], look: [.5, 2.4, 0], fov: 52, to: { pos: [.5, 3.8, 14], look: [.5, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.post.position.set(3.4, 0, .4); talk(w.pf, t, p > .5); brow(w.pf, .5); w.pf.mouth.rotation.z = .3; w.sofa.position.set(-1, 0, -1.4); w.rips.position.set(0, 0, -1.4 + 2.2 * 0); ctAt(w, -1.8, 0, -.2, Math.PI / 2 + .5, .45); w.cr.rotation.x = -.5; w.c.paw.position.set(.8, 1.2 + .4 * Math.sin(t * 12), .9); } },
    { say: 'Finally used? It giggles.', label: 'HEE HEE', show: ['floor', 'wall', 'post', 'cr', 'fluff'], sky: '#F5E6C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3, 9.5], look: [.6, 2.1, 0], fov: 50, to: { pos: [1, 3, 9], look: [.6, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.visible = false; w.rips.visible = false; w.cr.rotation.x = 0; w.pf.mouth.rotation.z = 0; w.post.position.set(0, 0, 0); w.post.rotation.z = .04 * Math.sin(t * 14); talk(w.pf, t); brow(w.pf, -.4); w.pf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .35; }); ctAt(w, 1.7, 0, .7, Math.PI - .5, .45); w.cr.rotation.z = -.4; w.c.paw.position.set(1.4, 2 + .5 * Math.sin(t * 12), .2); w.fluff.children.forEach(f => { const i = f.userData.i, q = (t * .8 + i / 10) % 1; f.position.set(.5 + q * 1.2, 2.4 - q * 2.2, .5 + (i % 3) * .1); }); } },
    { say: 'Too many claws? It goes bald.', label: 'OH NO', show: ['floor', 'wall', 'post'], sky: '#F5E6C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3, 8], look: [.1, 2.4, 0], fov: 50, to: { pos: [.3, 3, 7.5], look: [.1, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; w.fluff.visible = false; w.post.rotation.z = 0; w.post.children.forEach(o => { if (o.geometry && o.geometry.type === 'TorusGeometry') o.visible = false; }); w.rope.material = w.k.mat('#E9D8B0'); w.rope.scale.set(.75, 1, .75); w.pf.position.z = .4; w.pf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); talk(w.pf, t, p > .4); brow(w.pf, .5); } },
    { say: 'Talking scratching post: brave, funny, or way too ticklish? Comment below.',
      quiz: { q: 'The talking scratching post is…', options: ['Brave', 'Funny', 'Way too ticklish'], answer: 'Made up. But real cats leave scent from their paws when they scratch.' },
      show: ['floor', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.post.visible = false; ctAt(w, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
