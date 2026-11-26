// Narrative 22: "In This Town… (short format, cats first)". The top short is 906 "In this town, cats say what you're thinking" (968 views at 23:07).
// Hook: the rule under 2 s; first frame shows a cat holding a lead attached to a big dog.

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


function dog(k, parent) {
  const { mat, ball, cyl, group } = k;
  const g = { root: group([0, 0, 0], parent) };
  const db = ball(.8, mat('#C98B3E'), [0, 1, 0], g.root); db.scale.set(1.4, .8, .8);
  g.head = group([1.1, 1.6, 0], g.root); ball(.5, mat('#C98B3E'), [0, 0, 0], g.head); for (const z of [-1, 1]) { const ear = ball(.22, mat('#8B5A2B'), [-.1, .4, z * .35], g.head); ear.scale.y = 1.6; ball(.07, mat('#111111'), [.4, .1, z * .2], g.head); } ball(.1, mat('#111111'), [.5, -.05, 0], g.head);
  g.tongue = ball(.1, mat('#E87A8A'), [.42, -.25, 0], g.head); g.tongue.scale.set(.6, 1.4, .8);
  g.legs = []; for (const x of [-.6, .6]) for (const z of [-.3, .3]) { const l = group([x, .8, z], g.root); cyl(.12, .12, .8, mat('#C98B3E'), [0, -.4, 0], l, 6); g.legs.push(l); }
  g.tail = group([-1.1, 1.2, 0], g.root); const tl = cyl(.08, .05, .7, mat('#C98B3E'), [0, .35, 0], g.tail, 6);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.path = box(40, .04, 3, mat('#D8C8A0'), [0, .03, 1.5]);
  w.trees = group(); for (let i = 0; i < 4; i++) { const t = group([-6 + i * 4, 0, -3], w.trees); cyl(.25, .3, 2.4, mat('#7A5A3A'), [0, 1.2, 0], t, 8); ball(1.3, mat('#3E8F3A'), [0, 3.1, 0], t); }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.d = dog(k, k.scene); w.dr = w.d.root;
  w.lead = cyl(.03, .03, 1, mat('#E2453C'), [0, 0, 0], undefined, 6);
  w.box = group(); box(2, 1.4, 1.8, mat('#C9965A'), [0, .7, 0], w.box);
  w.ball = ball(.3, mat('#E2453C'), [0, 0, 0]);
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.15, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const dgAt = (w, x, z, ry, s) => { w.dr.position.set(x, 0, z); w.dr.rotation.set(0, ry, 0); w.dr.scale.setScalar(s); w.dr.visible = true; w.d.head.rotation.set(0, 0, 0); w.d.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const leadOn = (w) => { w.cr.updateWorldMatrix(true, true); w.dr.updateWorldMatrix(true, true); const a = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); const b = w.d.head.localToWorld(new w.k.THREE.Vector3(-.3, -.35, 0)); w.lead.position.copy(a.clone().add(b).multiplyScalar(.5)); w.lead.scale.y = a.distanceTo(b); w.lead.quaternion.setFromUnitVectors(new w.k.THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); };
const trot = (w, t) => w.d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * 12 + (i % 3 ? 0 : Math.PI)));
const wag = (w, t) => w.d.tail.rotation.x = .5 * Math.sin(t * 14);

export default {
  id: '395',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS WALK THE DOGS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS WALK DOGS'],
  title: 'In this town, cats walk the dogs',
  description: 'The walk lasts ten seconds, then a nap. The dog wants the park; the cat wants a box. And fetch? The cat just watches the ball. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'dog', 'shorts'],
  sources: ['Comedy sketch: cats walking dogs is made up. Quiz fact: a border collie named Chaser learned the names of 1,022 different toys and could fetch each one by name (Pilley and Reid, "Border collie comprehends object names as verbal referents", Behavioural Processes, 2011).'],
  setup,
  scenes: [
    { say: 'In this town, cats walk dogs.', show: ['ground', 'path', 'trees', 'cr', 'dr', 'lead'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.5, 3, 11], look: [0, 2.6, 0], fov: 52, to: { pos: [1.4, 3, 10.3], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.box.visible = false; w.ball.visible = false; ctAt(w, -1.5, 0, 1.6, -.9, .7); w.c.paw.position.set(1.6, .9, 1.1); w.c.paw.rotation.z = .4; dgAt(w, 1.1, 1.4, -1.1, .9); trot(w, t); wag(w, t); w.dr.position.x = 1.1 + .15 * Math.sin(t * 3); leadOn(w); } },
    { say: 'The walk? Ten seconds. Then a nap.', label: 'ZZZ…', show: ['ground', 'path', 'trees', 'cr', 'dr', 'lead', 'zzz'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.4, 12], look: [0, 1.8, 0], fov: 52, to: { pos: [2, 3.4, 11.5], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { const nap = p > .35; ctAt(w, nap ? -1 : -3 + p * 6, 0, 1.6, nap ? -1.3 : 0, .6); w.c.eyes.forEach(e => e.scale.y = nap ? .15 : 1); w.c.paw.position.set(1.4, 1.2, .9); dgAt(w, 2, 1.4, nap ? -1.2 : 0, 1); if (!nap) trot(w, t); w.d.head.rotation.z = nap ? -.2 : 0; leadOn(w); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(-.6 + q * .6, 2 + q * 1.4, 1.8); z.scale.setScalar(.6 + q * 1.2); z.visible = nap; }); } },
    { say: 'The dog wants the park. The cat wants a box.', label: 'NOPE', show: ['ground', 'path', 'trees', 'cr', 'dr', 'lead', 'box'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.4, 12], look: [0, 1.8, 0], fov: 52, to: { pos: [2, 3.4, 11.5], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { w.zzz.children.forEach(z => z.visible = false); w.box.visible = true; w.box.position.set(-2.4, 0, 1.4); ctAt(w, -2.4, .4, 1.4, -1, .5); w.c.paw.position.set(1.4, 1.4, .9); dgAt(w, 1.2, 1.4, -.5, .9); trot(w, t); w.dr.rotation.z = -.15; w.d.head.rotation.z = .2; wag(w, t); leadOn(w); } },
    { say: 'And fetch? The cat just watches the ball.', label: '…', show: ['ground', 'path', 'trees', 'cr', 'dr', 'ball'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 12], look: [0, 2, 0], fov: 52, to: { pos: [2, 3.6, 11.5], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.box.visible = false; w.lead.visible = false; ctAt(w, -1.6, 0, 1.6, -.3, .6); dgAt(w, 1.4, 1.2, -2.4, 1); wag(w, t); w.d.tongue.scale.set(.6, 2, .8); const q = Math.min(1, p * 1.3); w.ball.visible = true; w.ball.position.set(-1 + q * 5, .3 + Math.sin(q * Math.PI) * 3, 1.6); w.c.head.rotation.y = -q * .8; } },
    { say: 'Cats walking dogs: cool, cute, or way too lazy? Comment below.',
      quiz: { q: 'Cats walking dogs are…', options: ['Cool', 'Cute', 'Way too lazy'], answer: 'Made up. But one real dog learned the names of over 1,000 toys.' },
      show: ['ground', 'cr', 'dr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 8], look: [0, 1.8, 0], fov: 54, to: { pos: [-2, 2.5, 8], look: [0, 1.8, 0] } },
      update: (w, p, t) => { w.ball.visible = false; ctAt(w, -1, 0, .4, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); dgAt(w, 1.6, 0, -1.8, .8); wag(w, t); } },
  ],
};
