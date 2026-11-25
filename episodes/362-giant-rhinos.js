// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a rhino bigger than a house, facing the camera.

function rhino(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const gry = mat('#8E9097', { rough: .85 }), dk = mat('#6E7077'), horn = mat('#D8CFC0');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.4, gry, [0, 2, 0], g.body); b.scale.set(1.6, 1, 1);
  g.head = group([2, 1.9, 0], g.body); const hd = ball(.8, gry, [0, 0, 0], g.head); hd.scale.set(1.4, .85, .85);
  g.horn = cone(.3, 1.1, horn, [.9, .55, 0], g.head, 10); g.horn.rotation.z = -.35; const h2 = cone(.18, .5, horn, [.4, .65, 0], g.head, 8); h2.rotation.z = -.2;
  for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.25, .25, z * .55], g.head); const e = cone(.15, .4, gry, [-.45, .7, z * .35], g.head, 8); }
  g.legs = []; for (const x of [-1.3, 1.3]) for (const z of [-1, 1]) { const l = group([x, 1.3, z * .65], g.body); cyl(.35, .32, 1.3, dk, [0, -.65, 0], l, 10); g.legs.push(l); }
  const tl = cyl(.05, .05, .7, dk, [-2.3, 2, 0], g.body, 6); tl.rotation.z = -.5;
  return g;
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
  w.rh = rhino(k, k.scene); w.rr = w.rh.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.balloons = group(); const cols = ['#E2453C', '#3E6FD6', '#F2C94C', '#FF5FA2', '#3FA34D']; for (let i = 0; i < 10; i++) { const bl = group([-3 + (i % 5) * 1.5, 4 + Math.floor(i / 5) * 1.6, -1 + (i % 2)], w.balloons); const bb = ball(.55, mat(cols[i % 5], { glow: .2 }), [0, 0, 0], bl); bb.scale.y = 1.2; cyl(.01, .01, 2, mat('#FFFFFF'), [0, -1.6, 0], bl, 4); bl.userData.i = i; }
  w.pops = group(); for (let i = 0; i < 20; i++) { const s = box(.12, .12, .02, mat(cols[i % 5], { glow: .4 }), [0, 0, 0], w.pops); s.userData.i = i; s.castShadow = false; }
  w.pool = group(); w.water = box(9, .3, 5, mat('#3E8FCF', { glow: .15 }), [0, .15, 0], w.pool); for (const [x, z, sx, sz] of [[0, 2.6, 9.4, .3], [0, -2.6, 9.4, .3], [4.6, 0, .3, 5], [-4.6, 0, .3, 5]]) box(sx, .5, sz, mat('#FFFFFF'), [x, .25, z], w.pool);
  w.shop = group(); w.wallS = box(6, 4, 3, mat('#F2C94C'), [0, 2, 0], w.shop); box(6.2, .4, 3.2, mat('#E2453C'), [0, 4.2, 0], w.shop); w.hole = box(2.6, 2.4, .1, mat('#222222'), [-1, 1.4, 1.52], w.shop);
  w.rubble = group(); for (let i = 0; i < 12; i++) { const r = box(.4, .3, .3, mat('#F2C94C'), [0, 0, 0], w.rubble); r.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const rhAt = (w, x, y, z, ry, s) => { w.rr.position.set(x, y, z); w.rr.rotation.set(0, ry, 0); w.rr.scale.setScalar(s); w.rh.body.rotation.set(0, 0, 0); w.rh.head.rotation.set(0, 0, 0); w.rh.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const trot = (w, t) => w.rh.legs.forEach((l, i) => l.rotation.z = .4 * Math.sin(t * 12 + (i % 3 ? 0 : Math.PI)));

export default {
  id: '362',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT RHINOS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF RHINOS', 'WERE GIANT?'],
  title: 'What would happen if rhinos were giant?',
  description: 'Its horn pops every balloon at the party. Its mud bath is your swimming pool. And the shop gets a brand new door. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'rhino', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant rhinos are made up. Quiz fact: a rhino\'s horn is made of keratin, the same protein as human hair and fingernails (Encyclopaedia Britannica, "rhinoceros").'],
  setup,
  scenes: [
    { say: 'What if rhinos were giant?', show: ['ground', 'rr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [0, 5.6, 0], fov: 56, to: { pos: [1, 4, 20.5], look: [0, 5.6, 0], fov: 54 } },
      update: (w, p, t) => { rhAt(w, -3, 0, -4, -1.1, 2); w.rh.head.rotation.z = .06 * Math.sin(t * 3); w.house.position.set(4.6, 0, -3); stand(w, 3.6, 5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Its horn? Every balloon at the party: pop.', label: 'POP POP POP', show: ['ground', 'rr', 'balloons', 'pops'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 20], look: [0, 4, 0], fov: 56, to: { pos: [2, 5, 19], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { rhAt(w, -6 + p * 6, 0, 0, 0, 1.3); trot(w, t); w.rh.head.rotation.z = .25 + .2 * Math.sin(t * 6); const hx = -6 + p * 6 + 3.6; w.balloons.children.forEach(b => { b.visible = b.position.x > hx; }); w.pops.children.forEach(s => { const i = s.userData.i, q = (t * 2 + i / 20) % 1; s.position.set(hx + Math.cos(i) * q * 2, 4.5 + Math.sin(i * 2) * q * 2, Math.sin(i) * q); s.rotation.set(t * 6 + i, t * 4, 0); s.visible = p > .1 && p < .95; }); } },
    { say: 'Mud bath? Your swimming pool.', label: 'SPLOSH', show: ['ground', 'rr', 'pool', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 20], look: [0, 2.4, 0], fov: 56, to: { pos: [3, 7, 19], look: [0, 2.4, 0], fov: 54 } },
      update: (w, p, t) => { w.pool.position.set(0, 0, 0); const m = Math.min(1, p * 1.6); w.water.material.color.set(m > .5 ? '#6B4A2E' : '#3E8FCF'); rhAt(w, -1, -.6, 0, Math.PI / 2 * 0, 1.3); w.rh.body.rotation.z = .9 * Math.sin(t * 2) * .3; w.rh.legs.forEach(l => l.rotation.z = 1.2); stand(w, 4.6, 3.6, -.6); pose(w.p, m > .5 ? 2.4 : .4); w.p.mouth.scale.set(1.2, m > .5 ? 3 : 1, 1); } },
    { say: 'And the shop? Gets a brand new door.', label: 'CRASH!', show: ['ground', 'rr', 'shop', 'rubble'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1 && t < 1.4 ? .3 : 0,
      cam: { pos: [6, 5, 18], look: [0, 3, 0], fov: 56, to: { pos: [6, 5, 17], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.water.material.color.set('#3E8FCF'); w.shop.position.set(0, 0, -2); w.shop.rotation.y = 0; const q = Math.min(1, t / 1); rhAt(w, -1, 0, 8 - q * 6.5, -Math.PI / 2, 1.1); trot(w, t < 1 ? t : 0); w.hole.visible = t > 1; w.rubble.children.forEach(r => { const i = r.userData.i, d = Math.max(0, t - 1); r.position.set(-1 + Math.cos(i) * d * 3, 1.5 + d * 3 - d * d * 5 + (i % 3) * .3, -.4 + Math.sin(i) * d * 2); r.rotation.set(t * 4 + i, t * 3, 0); r.visible = t > 1 && r.position.y > 0; }); } },
    { say: 'Giant rhinos: cool, cute, or way too pointy? Comment below.',
      quiz: { q: 'Giant rhinos are…', options: ['Cool', 'Cute', 'Way too pointy'], answer: 'Made up. A real rhino horn is made of the same stuff as your fingernails.' },
      show: ['ground', 'rr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [8, 3.5, 8], look: [0, 2.2, 0], fov: 54, to: { pos: [10, 3.5, 2], look: [0, 2.2, 0] } },
      update: (w, p, t) => { rhAt(w, 0, 0, 0, -.6, 1); w.rh.head.rotation.z = .06 * Math.sin(t * 3); } },
  ],
};
