// Narrative 22: "In This Town… (short format, cats first)". The top short is 906 "In this town, cats say what you're thinking" (959 views at 20:06).
// Hook: the rule under 2 s; first frame shows a cat in a police hat beside a little police car.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.street = box(60, .05, 6, mat('#555B66'), [0, .03, 2]); w.lines = group(); for (let i = 0; i < 16; i++) box(1.5, .06, .15, mat('#FFFFFF'), [-30 + i * 4, .05, 2], w.lines);
  w.houses = group(); for (let i = 0; i < 4; i++) { const h = group([-6 + i * 4, 0, -3], w.houses); box(3, 2.6, 2.6, mat(['#F2D9B8', '#F7D6E0', '#D8E8F0', '#F2E2A8'][i]), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.hat = group(); cyl(.55, .5, .35, mat('#1E2A5A'), [0, .17, 0], w.hat, 14); cyl(.62, .62, .06, mat('#111111'), [.15, 0, 0], w.hat, 14); const badge = box(.18, .18, .05, mat('#F2C94C', { glow: .3 }), [.5, .2, 0], w.hat); badge.rotation.y = Math.PI / 2;
  w.pcar = group(); box(2.8, .9, 1.4, mat('#FFFFFF'), [0, .7, 0], w.pcar); box(2.82, .3, 1.42, mat('#1E2A5A'), [0, .7, 0], w.pcar); box(1.4, .6, 1.3, mat('#9FD3EE'), [-.2, 1.45, 0], w.pcar); w.siren = [ball(.15, mat('#3E6FD6', { glow: 1 }), [-.2, 1.85, -.25], w.pcar), ball(.15, mat('#E2453C', { glow: 1 }), [-.2, 1.85, .25], w.pcar)]; for (const x of [-.9, .9]) for (const z of [-.7, .7]) { const wh = cyl(.32, .32, .2, mat('#222222'), [x, .32, z], w.pcar, 12); wh.rotation.x = Math.PI / 2; }
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.fish = group(); const fb = ball(.3, mat('#9FB8C8'), [0, 0, 0], w.fish); fb.scale.set(2, .7, .5); const ft = cone(.25, .35, mat('#9FB8C8'), [-.7, 0, 0], w.fish, 3); ft.rotation.z = Math.PI / 2;
  w.box = group(); box(2.4, 1.6, 2, mat('#C9965A'), [0, .8, 0], w.box); const fl = box(2.4, .05, 1, mat('#B88548'), [0, 1.6, 1.4], w.box); fl.rotation.x = .6;
  w.robber = person(k, k.scene, '#222222'); w.rb = w.robber.root; w.mask = box(1.2, .3, .1, mat('#111111'), [0, .2, .7], w.robber.head); w.bag = group(); const bg = ball(.6, mat('#C9B48A'), [0, 0, 0], w.bag); box(.6, .2, .05, mat('#333333'), [0, .1, .58], w.bag);
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.15, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const stand = (P, x, z, ry) => { P.root.position.set(x, 0, z); P.root.rotation.set(0, ry, 0); P.root.scale.setScalar(1); P.head.rotation.set(0, 0, 0); P.mouth.scale.set(1, 1, 1); P.root.visible = true; };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const hatOn = (w) => { w.cr.updateWorldMatrix(true, true); const top = w.c.head.localToWorld(new w.k.THREE.Vector3(-.05, 1.12, 0)); w.hat.position.copy(top); w.hat.rotation.set(0, w.cr.rotation.y, 0); w.hat.scale.setScalar(w.cr.scale.x * 1.1); };
const sirens = (w, t) => { w.siren[0].visible = Math.sin(t * 12) > 0; w.siren[1].visible = !w.siren[0].visible; };

export default {
  id: '386',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT POLICE',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS ARE THE POLICE'],
  title: 'In this town, cats are the police',
  description: 'Speeding? They chase your car, because it moves. The fine? One fish. And robbers? Sorry, the officer is asleep in a box. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'police', 'shorts'],
  sources: ['Comedy sketch: cat police are made up. Quiz fact: cats have a reflective layer behind the retina, the tapetum lucidum, which helps them see in dim light and makes their eyes shine at night (Encyclopaedia Britannica, "tapetum lucidum").'],
  setup,
  scenes: [
    { say: 'In this town, cats are the police.', show: ['ground', 'street', 'lines', 'houses', 'cr', 'hat', 'pcar'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.5, 3.4, 12], look: [0, 3, 0], fov: 52, to: { pos: [1.4, 3.4, 11.3], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.robber.root.visible = false; w.bag.visible = false; w.p.root.visible = false; w.pcar.position.set(2.2, 0, 1.2); w.pcar.rotation.y = -.4; sirens(w, t); ctAt(w, -1, 0, 2.6, -1.1, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); hatOn(w); } },
    { say: 'Speeding? They chase your car. Because it moves.', label: 'WEE-OO', show: ['ground', 'street', 'lines', 'houses', 'cr', 'hat', 'car'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 16], look: [0, 1.8, 0], fov: 54, to: { pos: [2, 5, 15.5], look: [0, 1.8, 0], fov: 52 } },
      update: (w, p, t) => { const x = -6 + p * 10; w.car.position.set(x + 2.6, .03 * Math.abs(Math.sin(t * 20)), 2); ctAt(w, x - .6, .25 * Math.abs(Math.sin(t * 12)), 2, 0, .6); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : 1.5); hatOn(w); } },
    { say: 'The fine? One fish.', label: 'PAY UP', show: ['ground', 'street', 'houses', 'cr', 'hat', 'pcar', 'fish', 'p'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 11], look: [0, 2.2, 0], fov: 52, to: { pos: [2, 3.6, 10.5], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { w.pcar.position.set(-3.6, 0, -.6); w.pcar.rotation.y = 0; sirens(w, t); ctAt(w, -1.2, 0, 1.4, -.6, .7); hatOn(w); stand(w.p, 1.8, 1.6, -.9); w.pp.scale.setScalar(.85); pose(w.p, .3, p > .4 ? 1.3 : 0); const give = Math.min(1, Math.max(0, (p - .4) * 3)); w.fish.position.set(1.4 - give * 1.4, 2 - give * .4, 1.8); w.fish.rotation.y = Math.PI; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? (give > .8 ? .3 : 1.6) : 1); } },
    { say: 'And robbers? Sorry. The officer is asleep in a box.', label: 'ZZZ…', show: ['ground', 'street', 'houses', 'cr', 'hat', 'box', 'zzz'], sky: '#2A3150', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4, 13], look: [0, 2, 0], fov: 54, to: { pos: [2, 4, 12.5], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.p.root.visible = false; w.fish.visible = false; w.box.position.set(-1.6, 0, 1.4); ctAt(w, -1.6, .5, 1.4, -1.2, .55); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.35; hatOn(w); stand(w.robber, 3 - p * 5, -.4, -Math.PI / 2); w.robber.root.scale.setScalar(.8); w.robber.root.position.y = .1 * Math.abs(Math.sin(t * 10)); pose(w.robber, .4, 1); w.bag.visible = true; w.bag.position.set(w.robber.root.position.x + .3, 2.2, 0); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(-1 + q * .6, 2.6 + q * 1.4, 1.6); z.scale.setScalar(.6 + q * 1.2); }); } },
    { say: 'Cat police: cool, cute, or way too sleepy? Comment below.',
      quiz: { q: 'Cat police are…', options: ['Cool', 'Cute', 'Way too sleepy'], answer: 'Made up. But real cats\' eyes have a mirror layer for seeing in the dark.' },
      show: ['ground', 'cr', 'hat'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { w.robber.root.visible = false; w.bag.visible = false; ctAt(w, -.6, 0, 0, -.6, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); hatOn(w); } },
  ],
};
