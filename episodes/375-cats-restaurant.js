// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a cat chef behind a counter under a fish sign.

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
  w.floor = k.ground('#E2CFA8', 0);
  w.wall = group(); box(40, 16, .3, mat('#F6E2C8'), [0, 8, -4], w.wall);
  w.sign = group(); box(5, 1.4, .2, mat('#2E5E8A'), [0, 0, 0], w.sign); const sf = ball(.5, mat('#F2C94C'), [0, 0, .15], w.sign); sf.scale.set(2.2, .8, .3); const st = cone(.45, .6, mat('#F2C94C'), [-1.4, 0, .15], w.sign, 3); st.rotation.z = Math.PI / 2;
  w.counter = box(6, 2.2, 1.4, mat('#B87A4A'), [0, 1.1, 0]);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.hat = group(); cyl(.5, .45, .9, mat('#FFFFFF'), [0, .45, 0], w.hat, 14); const puff = ball(.6, mat('#FFFFFF'), [0, 1, 0], w.hat); puff.scale.y = .6;
  w.menu = group(); box(2.4, 3.2, .1, mat('#FFF8E8'), [0, 0, 0], w.menu); for (let i = 0; i < 4; i++) { const f = ball(.22, mat('#7FA8C8'), [-.2, 1 - i * .7, .08], w.menu); f.scale.set(2, .7, .3); }
  w.table = group(); box(3, .2, 2, mat('#FFFFFF'), [0, 2, 0], w.table); cyl(.15, .15, 2, mat('#7A5A3A'), [0, 1, 0], w.table, 8); cyl(.8, .8, .1, mat('#7A5A3A'), [0, .05, 0], w.table, 12);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.mice = group(); for (let i = 0; i < 3; i++) { const m = group([i * .8 - .8, 0, 0], w.mice); const mb = ball(.3, mat('#9A9AA2'), [0, .25, 0], m); mb.scale.set(1.4, 1, 1); ball(.12, mat('#F4A6B8'), [.3, .45, .12], m); ball(.12, mat('#F4A6B8'), [.3, .45, -.12], m); }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.15, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const hatOn = (w) => { w.cr.updateWorldMatrix(true, true); const top = w.c.head.localToWorld(new w.k.THREE.Vector3(0, 1.15, 0)); w.hat.position.copy(top); w.hat.scale.setScalar(w.cr.scale.x * .9); };

export default {
  id: '375',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT CAFE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'RAN A RESTAURANT?'],
  title: 'What would happen if cats ran a restaurant?',
  description: 'The menu? Fish. Only fish. The waiter? Asleep on your table. And the bill? Paid in mice. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'restaurant', 'shorts'],
  sources: ['Comedy sketch: a cat-run restaurant is made up. Quiz fact: cats have a third eyelid, the nictitating membrane, which can sweep across the eye to protect it (MSD Veterinary Manual, "Eye Structure and Function in Cats").'],
  setup,
  scenes: [
    { say: 'What if cats ran a restaurant?', show: ['floor', 'wall', 'sign', 'counter', 'cr', 'hat'], sky: '#F6E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.5, 3.6, 11], look: [0, 3.4, 0], fov: 50, to: { pos: [1.5, 3.6, 10.3], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { w.sign.position.set(0, 6.6, -3.7); ctAt(w, -.2, 1.2, -1.2, -1.45, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); hatOn(w); } },
    { say: 'The menu? Fish. Only fish.', label: 'FISH, FISH, FISH', show: ['floor', 'wall', 'menu', 'pp'], sky: '#F6E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.6, 8], look: [0, 3.2, 0], fov: 50, to: { pos: [1, 3.6, 7.5], look: [0, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { w.menu.position.set(-.8, 3.4, 1); w.menu.rotation.y = .3; stand(w, 2, -.2, -.3); pose(w.p, 1, 1.2); w.p.head.rotation.x = .2; w.p.mouth.scale.set(1.2, p > .5 ? 2.4 : 1, 1); } },
    { say: 'The waiter? Asleep on your table.', label: 'ZZZ…', show: ['floor', 'wall', 'table', 'cr', 'hat', 'pp', 'zzz'], sky: '#F6E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 4.6, 10], look: [0, 2.6, 0], fov: 52, to: { pos: [3, 4.6, 9.5], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.table.position.set(0, 0, 0); ctAt(w, .3, 2.1, -.1, -1.4, .5); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.35; hatOn(w); stand(w, 2.6, -.8, -.7); pose(w.p, 1.4); w.p.mouth.scale.set(1.2, 2, 1); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(.8 + q * .6, 3.2 + q * 1.4, .3); z.scale.setScalar(.6 + q * 1.2); }); } },
    { say: 'And the bill? Paid in mice.', label: 'SQUEAK', show: ['floor', 'wall', 'counter', 'cr', 'hat', 'mice', 'pp'], sky: '#F6E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 4, 11], look: [0, 2.6, 0], fov: 50, to: { pos: [2, 4, 10.5], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, -.4, 1.2, -1.2, -1.45, .8); hatOn(w); w.c.head.rotation.z = p > .5 ? .2 : 0; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? (p > .5 ? .5 : 1.6) : 1); w.mice.position.set(.6, 2.2, .4); w.mice.children.forEach((m, i) => m.position.y = .15 * Math.abs(Math.sin(t * 8 + i))); stand(w, 2.8, 1.2, -.8); pose(w.p, p > .5 ? 2.4 : .4); w.p.mouth.scale.set(1.2, p > .5 ? 3 : 1, 1); } },
    { say: 'A cat restaurant: cool, cute, or way too fishy? Comment below.',
      quiz: { q: 'A cat restaurant is…', options: ['Cool', 'Cute', 'Way too fishy'], answer: 'Made up. Fun fact: real cats have a third eyelid.' },
      show: ['floor', 'cr', 'hat'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { ctAt(w, -.6, 0, 0, -.6, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); hatOn(w); } },
  ],
};
