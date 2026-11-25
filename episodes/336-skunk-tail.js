// Narrative 19: "What Would Happen If… (season 9)". Body-upgrade premise (147 trunks 868).
// A made-up comedy sketch: people do not have skunk tails. Hook: the premise as a question under 2 s; first frame shows a person with a huge black-and-white skunk tail.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#E8E0F2'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.tail = group([0, 1, -.7], w.pp); w.tsegs = []; for (let i = 0; i < 7; i++) { const s = group([0, 0, 0], w.tail); const b = ball(.55 + i * .06, mat('#1E1E22', { rough: .9 }), [0, 0, 0], s); b.scale.set(1, 1, .9); for (const sx of [-1, 1]) { const st = ball(.3 + i * .03, mat('#F7F7F2', { rough: .9 }), [sx * (.42 + i * .05), .05, -.1], s); st.scale.set(.35, 1.4, .5); } s.userData.i = i; w.tsegs.push(s); }
  w.cloud = group(); for (let i = 0; i < 10; i++) { const c = ball(.9, mat('#9ACD5A', { glow: .2 }), [0, 0, 0], w.cloud); c.userData.i = i; c.castShadow = false; c.material.transparent = true; c.material.opacity = .7; }
  w.crowd = group(); w.others = []; for (let i = 0; i < 4; i++) { const c = person(k, w.crowd, ['#3B6FD6', '#3FA34D', '#F2B21F', '#9B59B6'][i]); c.root.position.set([-3.6, -1.8, 1.8, 3.6][i], 0, [-.8, .4, .4, -.8][i]); w.others.push(c); }
  w.cake = group(); cyl(.9, .9, .8, mat('#F5D0E0'), [0, 2.6, 0], w.cake, 20); cyl(.95, .95, .1, mat('#FFFFFF'), [0, 3.05, 0], w.cake, 20); for (let i = 0; i < 3; i++) { cyl(.04, .04, .4, mat('#3B6FD6'), [-.4 + i * .4, 3.3, 0], w.cake, 6); ball(.06, mat('#FFB020', { glow: 1 }), [-.4 + i * .4, 3.55, 0], w.cake); } box(2.4, .15, 1.4, mat('#C0703F'), [0, 2.15, 0], w.cake); for (const x of [-1, 1]) box(.12, 2.1, .12, mat('#C0703F'), [x, 1.05, 0], w.cake);
  w.banner = group(); box(5, .8, .05, mat('#FF5FA2'), [0, 6.2, -4.7], w.banner);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); };
const curl = (w, t, up = 1) => w.tsegs.forEach(s => { const i = s.userData.i; s.position.set(Math.sin(t * 3 + i * .5) * .04 * i, i * .55 * up, -.3 - Math.sin(i / 6 * Math.PI * .9) * 1.1); });
const puff = (w, x, y, z, q, on) => w.cloud.children.forEach(c => { const i = c.userData.i, a = i / 10 * Math.PI * 2; c.position.set(x + Math.cos(a) * q * 3.5, y + Math.sin(a * 2) * q * 1.2, z + Math.sin(a) * q * 2); c.scale.setScalar(.4 + q * 1.4); c.visible = on; });

export default {
  id: '336',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SKUNK TAIL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD SKUNK TAILS?'],
  title: 'What would happen if humans had skunk tails?',
  description: 'Feeling grumpy? The room empties. Lost in a crowd? Easy to spot. And a surprise party? Oops. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'skunk', 'tail', 'comedy', 'shorts'],
  sources: ['Comedy sketch: skunk tails on people are made up. Quiz fact: before spraying, a skunk usually gives warnings such as stamping its feet and raising its tail (Encyclopaedia Britannica, "skunk").'],
  setup,
  scenes: [
    { say: 'What if humans had skunk tails?', show: ['floor', 'wall', 'pp', 'tail'], sky: '#E8E0F2', lightAt: [0, 7, 6], lightDist: 16,
      cam: { pos: [3, 3.6, 13], look: [0, 4.6, 0], fov: 50, to: { pos: [2.8, 3.6, 12.3], look: [0, 4.6, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.6, 0, 1.25); pose(w.p, .3); curl(w, t); w.tail.rotation.y = .1 * Math.sin(t * 2); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Feeling grumpy? The room empties.', label: 'PEE-YEW!', show: ['floor', 'wall', 'pp', 'tail', 'crowd', 'cloud'], sky: '#E8E0F2', lightAt: [0, 7, 6], lightDist: 18,
      cam: { pos: [0, 5, 15], look: [0, 3.2, 0], fov: 54, to: { pos: [0, 5, 14.2], look: [0, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, Math.PI); pose(w.p, .5); w.p.mouth.scale.set(1.3, .5, 1); curl(w, t, 1); const q = Math.min(1, Math.max(0, (p - .3) * 2)); puff(w, 0, 2.4, -1, q, q > 0); w.others.forEach((o, i) => { const d = [-1, -1, 1, 1][i]; o.root.position.x = [-3.6, -1.8, 1.8, 3.6][i] + d * q * 5; o.root.rotation.y = q > 0 ? d * Math.PI / 2 : 0; o.arms.forEach(a => a.rotation.set(q > 0 ? -2 : 0, 0, a.userData.s * .3)); }); } },
    { say: 'Lost in a crowd? Easy to spot.', show: ['floor', 'wall', 'pp', 'tail', 'crowd'], sky: '#E8E0F2', lightAt: [0, 7, 6], lightDist: 18,
      cam: { pos: [0, 5, 15], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 5, 14.2], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, -1.4, 0); pose(w.p, .3); curl(w, t, 1.05); w.tail.rotation.z = .15 * Math.sin(t * 4); w.others.forEach((o, i) => { o.root.position.set([-2.4, -1, 1, 2.4][i], 0, [.4, 1.2, 1.2, .4][i]); o.root.rotation.y = 0; o.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .3)); }); } },
    { say: 'And a surprise party? Oops.', label: 'SURPRISE!', show: ['floor', 'wall', 'pp', 'tail', 'crowd', 'cloud', 'cake', 'banner'], sky: '#E8E0F2', lightAt: [0, 7, 6], lightDist: 18,
      cam: { pos: [0, 5, 15], look: [0, 3.4, 0], fov: 54, to: { pos: [0, 5, 14.2], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, -1, Math.PI); w.cake.position.set(3.4, 0, -1.6); const jump = t > .6; w.others.forEach((o, i) => { o.root.position.set([-3.6, -2, 2, 3.6][i] * (jump ? 1 : 1.6), jump ? .3 * Math.abs(Math.sin(t * 10 + i)) : 0, -2.4); o.root.rotation.y = 0; o.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * (jump ? 2.6 : .3))); }); w.p.eyes.forEach(e => e.scale.setScalar(jump ? 1.6 : 1)); pose(w.p, jump ? 1.6 : .3); curl(w, t, jump ? 1.15 : 1); const q = Math.min(1, Math.max(0, (p - .55) * 2.5)); puff(w, 0, 2.4, -1.5, q, q > 0); } },
    { say: 'Skunk tails: cute, cool, or way too stinky? Comment below.',
      quiz: { q: 'Would you want a skunk tail?', options: ['Cute', 'Cool', 'Way too stinky'], answer: 'Made up for people. Real skunks stamp and lift their tail as a warning first.' },
      show: ['floor', 'pp', 'tail'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [3, 1.5, 14], look: [0, 4.6, 0], fov: 56, to: { pos: [-1, 1.5, 14], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 1.1); pose(w.p, .3); curl(w, t); } },
  ],
};
