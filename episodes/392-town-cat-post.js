// Narrative 22: "In This Town… (short format, cats first)". The top short is 906 "In this town, cats say what you're thinking" (968 views at 23:07).
// Hook: the rule under 2 s; first frame shows a cat in a postman's cap with a satchel.

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
  w.street = box(40, .05, 5, mat('#555B66'), [0, .03, 3]);
  w.house = group(); box(5, 4, 4, mat('#F2D9B8'), [0, 2, 0], w.house); const roof = cone(4, 2.6, mat('#3E6FD6'), [0, 5.3, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1.2, 2, .1, mat('#8B5A2B'), [0, 1, 2.02], w.house); w.slot = box(.6, .1, .12, mat('#F2C94C', { metal: .5 }), [0, 1.4, 2.06], w.house);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.cap = group(); cyl(.55, .5, .3, mat('#C0392B'), [0, .15, 0], w.cap, 14); cyl(.6, .6, .05, mat('#222222'), [.2, 0, 0], w.cap, 14);
  w.bag = group(); box(.9, .7, .3, mat('#8B5A2B'), [0, 0, 0], w.bag); box(.92, .25, .32, mat('#6E4520'), [0, .25, 0], w.bag);
  w.parcel = group(); box(2.4, 1.6, 2, mat('#C9965A'), [0, .8, 0], w.parcel); box(2.45, .2, .3, mat('#E8D8A8'), [0, 1.6, 0], w.parcel);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.clock = group(); const cf = cyl(.7, .7, .1, mat('#FFFFFF'), [0, 0, 0], w.clock, 20); cf.rotation.x = Math.PI / 2; w.hand = group([0, 0, .08], w.clock); box(.06, .55, .03, mat('#E2453C'), [0, .25, 0], w.hand);
  w.dog = group(); const db = ball(.8, mat('#C98B3E'), [0, 1, 0], w.dog); db.scale.set(1.4, .8, .8); const dh = ball(.5, mat('#C98B3E'), [1.1, 1.6, 0], w.dog); for (const z of [-1, 1]) { const ear = ball(.22, mat('#8B5A2B'), [1, 2, z * .35], w.dog); ear.scale.y = 1.6; ball(.07, mat('#111111'), [1.5, 1.7, z * .2], w.dog); } ball(.1, mat('#111111'), [1.6, 1.55, 0], w.dog); for (const x of [-.6, .6]) for (const z of [-.3, .3]) cyl(.12, .12, .8, mat('#C98B3E'), [x, .4, z], w.dog, 6);
  w.letters = group(); for (let i = 0; i < 5; i++) { const l = box(.6, .02, .4, mat('#FFFFFF'), [0, 0, 0], w.letters); l.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const gear = (w) => { w.cr.updateWorldMatrix(true, true); const top = w.c.head.localToWorld(new w.k.THREE.Vector3(-.05, 1.12, 0)); w.cap.position.copy(top); w.cap.rotation.set(0, w.cr.rotation.y, 0); w.cap.scale.setScalar(w.cr.scale.x * 1.05); const side = w.c.body.localToWorld(new w.k.THREE.Vector3(0, .2, 1.05)); w.bag.position.copy(side); w.bag.rotation.set(0, w.cr.rotation.y, 0); w.bag.scale.setScalar(w.cr.scale.x * 1.3); };
const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(.85); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.pp.visible = true; };

export default {
  id: '392',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT POST',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS BRING MAIL'],
  title: 'In this town, cats deliver the post',
  description: 'Your parcel? The cat is sitting in it. Delivery time? Whenever it wakes up. And the dog next door? Gets no post at all. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'post', 'shorts'],
  sources: ['Comedy sketch: cat postmen are made up. Quiz fact: in a study of newly arrived shelter cats, cats given a hiding box adapted faster and showed lower stress scores than cats without one (Vinke, Godijn and van der Leij, "Will a hiding box provide stress reduction for shelter cats?", Applied Animal Behaviour Science, 2014).'],
  setup,
  scenes: [
    { say: 'In this town, cats bring mail.', show: ['ground', 'street', 'house', 'cr', 'cap', 'bag'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.5, 3.4, 12], look: [0, 3.1, 0], fov: 52, to: { pos: [1.4, 3.4, 11.3], look: [0, 3.1, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.visible = false; w.house.position.set(1.5, 0, -3); ctAt(w, -.6, 0, 2.4, -1.1, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); gear(w); } },
    { say: 'Your parcel? The cat is sitting in it.', label: 'MINE NOW', show: ['ground', 'street', 'house', 'parcel', 'cr', 'cap', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 12], look: [0, 2, 0], fov: 52, to: { pos: [2, 3.6, 11.5], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.bag.visible = false; w.house.position.set(0, 0, -4); w.parcel.position.set(-1, 0, 1); ctAt(w, -1, .55, 1, -1.2, .55); w.c.eyes.forEach(e => e.scale.y = .2); gear(w); stand(w, 2.4, 1.6, -.6); pose(w.p, .8, 1.3); w.p.mouth.scale.set(1.2, p > .4 ? 2.6 : 1, 1); } },
    { say: 'Delivery time? Whenever it wakes up.', label: 'TICK TOCK', show: ['ground', 'street', 'house', 'cr', 'cap', 'bag', 'clock'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.4, 11], look: [0, 2.6, 0], fov: 52, to: { pos: [2, 3.4, 10.5], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.visible = false; w.parcel.visible = false; w.bag.visible = true; w.house.position.set(0, 0, -3); w.clock.position.set(-2.4, 4.6, -.8); w.hand.rotation.z = -t * 6; ctAt(w, 0, 0, 1.6, -1.3, .7); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.4; w.c.body.scale.set(1.4, 1 + .04 * Math.sin(t * 2), 1); gear(w); } },
    { say: 'And the dog next door? Gets no post at all.', label: 'WOOF?', show: ['ground', 'street', 'house', 'cr', 'cap', 'bag', 'dog', 'letters'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4, 13], look: [0, 2, 0], fov: 54, to: { pos: [0, 4, 12.5], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.house.position.set(-3.4, 0, -3); ctAt(w, -1.2, 0, 1.6, Math.PI, .6); gear(w); w.dog.position.set(3, 0, 1.2); w.dog.rotation.y = Math.PI; w.dog.children[1].rotation.z = .2 * Math.sin(t * 3); w.letters.children.forEach(l => { const i = l.userData.i, q = (t * .7 + i / 5) % 1; l.position.set(-1.4 - q * 2, 1.6 + q * .5, 2.4); l.visible = p > .2; }); } },
    { say: 'Cat postmen: cool, cute, or way too slow? Comment below.',
      quiz: { q: 'Cat postmen are…', options: ['Cool', 'Cute', 'Way too slow'], answer: 'Made up. But a box really can help a nervous cat feel calm.' },
      show: ['ground', 'cr', 'cap', 'bag'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { ctAt(w, -.6, 0, 0, -.6, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); gear(w); } },
  ],
};
