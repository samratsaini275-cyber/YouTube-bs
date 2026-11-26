// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats judge your outfit out loud.
// Hook: the rule under 2 s; first frame shows a person in a new jumper and a cat holding up a score card.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));


function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#E8D8F0'), [0, 8, -4], w.wall); w.mirror = box(1.6, 3, .1, mat('#CFEFFF', { glow: .2 }), [-2.6, 2.6, -3.8], w.wall);
  w.p = person(k, k.scene, '#3FA34D');
  w.stripes = group(); for (let i = 0; i < 3; i++) cyl(.88, .88, .18, mat('#F2C94C'), [0, .7 + i * .7, 0], w.stripes, 14);
  w.pants = group(); cyl(.92, .92, 1.1, mat('#1A1A1A'), [0, .55, 0], w.pants, 14);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.n10 = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.n2 = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.sock = group(); const sk = cyl(.15, .15, .6, mat('#F49AAE'), [0, 0, 0], w.sock, 10); ball(.18, mat('#F49AAE'), [.12, -.3, 0], w.sock).scale.set(1.4, .8, 1);
  w.fur = group(); for (let i = 0; i < 16; i++) { const f = ball(.11, mat('#F2A04A'), [0, 0, 0], w.fur); f.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.stool = group(); cyl(.9, .9, .2, mat('#C0504D'), [0, 1.3, 0], w.stool, 16); for (const a of [0, 2.1, 4.2]) cyl(.07, .07, 1.3, mat('#5A3A1A'), [Math.cos(a) * .6, .65, Math.sin(a) * .6], w.stool, 6);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.n10.visible = good === true; w.n2.visible = good === false; };
const dress = (w) => { w.p.root.updateWorldMatrix(true, true); for (const g of [w.stripes, w.pants]) { g.position.copy(w.p.root.position); g.rotation.copy(w.p.root.rotation); g.scale.copy(w.p.root.scale); } };

export default {
  id: '426',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS JUDGE OUTFITS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS JUDGE OUTFITS'],
  title: 'In this town, cats judge your outfit',
  description: 'New jumper? Two out of ten. Fluffy socks? It steals one. Black trousers? Not enough fur yet. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'fashion', 'shorts'],
  sources: ['Comedy sketch: cat fashion judges are made up. Quiz fact: Siamese cats have darker ears, paws and tails because the enzyme that makes their fur pigment only works in the cooler parts of the body (UC Davis Veterinary Genetics Laboratory; "acromelanism").'],
  setup,
  scenes: [
    { say: 'In this town, cats judge outfits.', show: ['floor', 'wall', 'mirror', 'stripes', 'card', 'stool'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3.4, 12.5], look: [.3, 3.3, 0], fov: 50, to: { pos: [.4, 3.4, 12], look: [.3, 3.3, 0], fov: 48 } },
      update: (w, p, t) => { w.pants.visible = false; w.sock.visible = false; w.fur.visible = false; pAt(w.p, -.9, 0, .2, .4, .9); pose(w.p, .9, 0); w.p.mouth.scale.set(1.2, 2, 1); dress(w); w.stool.position.set(1.4, 0, .6); ctAt(w, 1.4, 1.4, .6, Math.PI + .7, .42); holdCard(w, null); } },
    { say: 'New jumper? Two out of ten.', label: '2 / 10', show: ['floor', 'wall', 'mirror', 'stripes', 'card', 'stool'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3.2, 11], look: [.3, 3, 0], fov: 50, to: { pos: [.4, 3.2, 10.5], look: [.3, 3, 0], fov: 48 } },
      update: (w, p, t) => { pAt(w.p, -.9, 0, .2, .4, .9); pose(w.p, .4, 0); w.p.mouth.scale.set(1.2, p > .5 ? .5 : 2, 1); dress(w); w.stool.position.set(1.4, 0, .6); ctAt(w, 1.4, 1.4, .6, Math.PI + .7, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); holdCard(w, p > .4 ? false : null); } },
    { say: 'Fluffy socks? It steals one.', label: 'MINE', show: ['floor', 'wall', 'mirror', 'sock'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.8, 2.2, 9], look: [.7, 1.4, 0], fov: 50, to: { pos: [.8, 2.2, 8.5], look: [.7, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.stripes.visible = false; w.card.visible = false; pAt(w.p, -1.2, 0, -.2, .3, .9); pose(w.p, .5, .4); w.p.mouth.scale.set(.6, 1.8, 1); ctAt(w, .4 + p * 1.2, 0, .8, -.2, .45); w.cr.updateWorldMatrix(true, true); const m = w.c.head.localToWorld(new w.k.THREE.Vector3(1.4, -.6, 0)); w.sock.position.copy(m); w.sock.rotation.set(0, 0, Math.PI / 2); } },
    { say: 'Black trousers? Not enough fur.', label: 'MORE FUR', show: ['floor', 'wall', 'mirror', 'pants', 'fur'], sky: '#E8D8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 2, 8], look: [.2, 1.4, 0], fov: 50, to: { pos: [.3, 2, 7.5], look: [.2, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.sock.visible = false; pAt(w.p, -.2, 0, -.4, .1, .9); pose(w.p, .4, 0); w.p.mouth.scale.set(.6, 1.8, 1); dress(w); ctAt(w, .2 + .5 * Math.sin(t * 3), 0, .5, Math.cos(t * 3) > 0 ? Math.PI : 0, .4); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .3); w.fur.children.forEach(f => { const i = f.userData.i; f.visible = i < 16 * Math.min(1, p * 1.5); f.position.set(-.2 + Math.cos(i * 2.4) * .7, .2 + (i % 8) * .12, -.4 + Math.sin(i * 2.4) * .7); }); } },
    { say: 'Cat fashion judges: honest, funny, or way too harsh? Comment below.',
      quiz: { q: 'Cat fashion judges are…', options: ['Honest', 'Funny', 'Way too harsh'], answer: 'Made up. Fun fact: Siamese cats\' dark ears and paws come from cooler skin.' },
      show: ['floor', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.pants.visible = false; w.fur.visible = false; w.p.root.visible = false; w.wall.visible = false; ctAt(w, .4, 0, 0, -.6, .7); holdCard(w, true); } },
  ],
};
