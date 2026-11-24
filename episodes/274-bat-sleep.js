// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855).
// A made-up comedy sketch: people do not sleep hanging upside down. Hook: the premise as a question under 2 s; first frame shows a person hanging from the ceiling, asleep.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.lids = [-.28, .28].map(x => box(.32, .06, .05, mat('#3A2A1A'), [x, .2, .74], p.head));
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  p.hair = box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.feet = [-1, 1].map(s => box(.35, .2, .6, mat('#3A2A1A'), [s * .35, -.05, .15], p.root));
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const sleep = (p, on) => { p.eyes.forEach(e => e.visible = !on); p.lids.forEach(l => l.visible = on); };
// hang: feet at ceiling height y, body pointing down
const hang = (q, x, y, z, ry = 0, sway = 0) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, Math.PI + sway); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#DCE3F0'), [0, 10, -5], w.wall);
  w.ceiling = box(40, .4, 12, mat('#C9CFDA'), [0, 8.2, 0], k.scene);
  w.bar = cyl(.08, .08, 10, mat('#888888'), [0, 8, 0], k.scene, 8); w.bar.rotation.z = Math.PI / 2;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.crowd = group(); w.cr = []; for (let i = 0; i < 4; i++) { const q = person(k, w.crowd, ['#E2453C', '#FFC21F', '#8E44AD', '#FF7F2A'][i]); w.cr.push(q); }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .8 }); box(.4, .07, .06, m, [0, .18, 0], z); box(.4, .07, .06, m, [0, -.18, 0], z); const d = box(.5, .07, .06, m, [0, 0, 0], z); d.rotation.z = .72; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.alarm = group(); cyl(.5, .5, .3, mat('#E2453C'), [0, 0, 0], w.alarm, 20).rotation.x = Math.PI / 2; for (const x of [-.35, .35]) ball(.15, mat('#FFC21F'), [x, .5, 0], w.alarm);
  w.cereal = group(); cyl(.6, .4, .5, mat('#FFFFFF'), [0, 0, 0], w.cereal, 16); w.flakes = group(); for (let i = 0; i < 10; i++) { const f = box(.15, .04, .15, mat('#E8B04A'), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  w.tree = group(); cyl(.5, .7, 9, mat('#7A4A22'), [0, 4.5, 0], w.tree, 10); const br = cyl(.25, .25, 8, mat('#7A4A22'), [0, 8.2, 0], w.tree, 8); br.rotation.z = Math.PI / 2; ball(3, mat('#3FA34D'), [0, 10, 0], w.tree);
  w.bats = group(); w.batList = []; for (let i = 0; i < 3; i++) { const b = group([0, 0, 0], w.bats); const bm = mat('#3A2A3A'); ball(.35, bm, [0, 0, 0], b).scale.set(.8, 1.2, .8); for (const s of [-1, 1]) { const wg = box(.6, .5, .04, bm, [s * .45, .1, 0], b); wg.rotation.z = s * .4; cone(.08, .2, bm, [s * .15, -.45, 0], b, 4).rotation.z = Math.PI; } for (const s of [-1, 1]) ball(.06, mat('#FFFFFF'), [s * .12, -.15, .26], b); w.batList.push(b); }
  return w;
}

export default {
  id: '274',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BAT SLEEPERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'SLEPT LIKE BATS?'],
  title: 'What would happen if humans slept upside down like bats?',
  description: 'Beds? Replaced by ceilings. Breakfast gets very messy. Sleepovers look terrifying. And bats finally invite you round. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'bat', 'sleep', 'comedy', 'shorts'],
  sources: ['Comedy sketch: people do not do this. Quiz fact: bats can hang upside down without effort because a tendon locks their toes shut (Smithsonian National Zoo).'],
  setup,
  scenes: [
    { say: 'What if humans slept like bats?', show: ['floor', 'wall', 'ceiling', 'bar', 'pp', 'zz'], sky: '#DCE3F0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4.4, 10], look: [0, 5.5, 0], fov: 52, to: { pos: [0, 4.4, 9.3], look: [0, 5.5, 0], fov: 50 } },
      update: (w, p, t) => { hang(w.p, 0, 8, 0, 0, .05 * Math.sin(t * 1.5)); sleep(w.p, true); pose(w.p, .1); w.zz.children.forEach(c => { const q = (t * .5 + c.userData.i / 3) % 1; c.position.set(.9 + q * .8, 4.2 - q * 1.6, .6); c.scale.setScalar(.6 + q * .6); }); } },
    { say: 'Beds? Nope. On the ceiling.', show: ['floor', 'wall', 'ceiling', 'bar', 'pp', 'alarm'], sky: '#DCE3F0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2, 3.6, 10], look: [.4, 4.4, 0], fov: 52, to: { pos: [1.8, 3.6, 9.3], look: [.4, 4.4, 0], fov: 50 } },
      update: (w, p, t) => { hang(w.p, 0, 8, 0, 0, 0); const awake = p > .45; sleep(w.p, !awake); pose(w.p, awake ? .6 : .1); w.p.mouth.scale.set(1, awake ? 2.4 : 1, 1); w.alarm.position.set(2.2, 1 + (awake ? .05 * Math.abs(Math.sin(t * 40)) : 0), .4); w.alarm.rotation.z = awake ? .15 * Math.sin(t * 40) : 0; } },
    { say: 'Breakfast? Very messy.', show: ['floor', 'wall', 'ceiling', 'bar', 'pp', 'cereal', 'flakes'], sky: '#DCE3F0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 3.4, 9], look: [.4, 4, 0], fov: 52, to: { pos: [1.3, 3.4, 8.4], look: [.4, 4, 0], fov: 50 } },
      update: (w, p, t) => { hang(w.p, 0, 8, 0, 0, 0); sleep(w.p, false); w.p.arms[0].rotation.set(0, 0, -.2); w.p.arms[1].rotation.set(-1.3, 0, .2); w.cereal.position.set(.6, 3.6, 1.4); w.cereal.rotation.x = Math.PI; w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .9 + i / 10) % 1; f.position.set(.6 + Math.sin(i * 2) * .3, 3.4 - q * 3.4, 1.4 + Math.cos(i * 2) * .3); f.rotation.set(t * 3 + i, t, 0); }); w.p.eyes.forEach(e => e.scale.setScalar(1.3)); } },
    { say: 'Sleepovers? Absolutely terrifying.', show: ['floor', 'wall', 'ceiling', 'bar', 'pp', 'crowd'], sky: '#232B45', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4.4, 13], look: [0, 5.2, 0], fov: 58, to: { pos: [0, 4.4, 12.3], look: [0, 5.2, 0], fov: 56 } },
      update: (w, p, t) => { hang(w.p, 0, 8, 0, 0, .04 * Math.sin(t * 1.4)); sleep(w.p, p < .6); w.cr.forEach((q, i) => { hang(q, [-4.4, -2.2, 2.2, 4.4][i], 8, -.3, 0, .04 * Math.sin(t * 1.4 + i)); sleep(q, p < .6); }); const open = p >= .6; [w.p, ...w.cr].forEach(q => q.eyes.forEach(e => e.scale.setScalar(open ? 1.4 : 1))); } },
    { say: 'And bats? Finally, you can hang out.', show: ['ground', 'tree', 'pp', 'bats'], sky: '#FF9F6B', lightAt: [4, 10, 8], lightDist: 24,
      cam: { pos: [0, 5, 13], look: [0, 5.2, 0], fov: 52, to: { pos: [0, 5, 12.2], look: [0, 5.2, 0], fov: 50 } },
      update: (w, p, t) => { w.tree.position.set(-3.8, 0, -1.2); hang(w.p, -1.4, 8.1, -1.2, 0, .05 * Math.sin(t * 1.2)); sleep(w.p, false); pose(w.p, .1); w.batList.forEach((b, i) => { b.position.set(.2 + i * 1.3, 7.55, -1.2); b.rotation.z = .08 * Math.sin(t * 1.2 + i); }); } },
    { say: 'Sleeping upside down: cozy, cool, or a total headache? Comment below.',
      quiz: { q: 'Would you sleep upside down?', options: ['Cozy', 'Cool', 'Total headache'], answer: 'People cannot. Bats lock their toes with a tendon.' },
      show: ['floor', 'ceiling', 'bar', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 2.6, 8], look: [0, 6.2, 0], fov: 50, to: { pos: [-1, 2.6, 8], look: [0, 6.2, 0] } },
      update: (w, p, t) => { hang(w.p, 0, 8, 0, 0, .05 * Math.sin(t * 1.5)); sleep(w.p, Math.sin(t * 2.5) > .3); pose(w.p, .1); } },
  ],
};
