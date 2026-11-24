// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858).
// A made-up comedy sketch: people do not have humps. Hook: the premise as a question under 2 s; first frame shows a person with two big humps on their back.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.humps = [-1, 1].map(s => { const h = ball(.7, mat(shirt), [s * .45, 2.4, -.75], p.root); h.scale.set(.8, 1, .9); return h; });
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const hump = (p, a) => p.humps.forEach(h => { h.scale.set(.8 * a, a, .9 * a); h.position.y = 2.2 + a * .4; });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.sand = k.ground('#E8C27A', 0);
  w.floor = k.ground('#D8C9A8', .005);
  w.wall = group(); box(40, 20, .5, mat('#F2E6D0'), [0, 10, -5], w.wall);
  w.dunes = group(); for (let i = 0; i < 4; i++) { const d = ball(6, mat('#E0B468'), [-12 + i * 8, -3.5, -12 - (i % 2) * 4], w.dunes); d.scale.set(1.4, .6, 1); }
  w.sun = ball(1.4, mat('#FFE07A', { glow: 1 }), [3, 10, -14], k.scene);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.kid = person(k, k.scene, '#E2453C'); w.kk = w.kid.root; w.kid.humps.forEach(h => h.visible = false); w.kk.scale.setScalar(.55);
  w.chair = group(); box(2, .3, 2, mat('#8B5A2B'), [0, 1.6, 0], w.chair); box(2, 2.4, .3, mat('#8B5A2B'), [0, 2.9, -.85], w.chair); for (const [x, z] of [[-.85, -.85], [.85, -.85], [-.85, .85], [.85, .85]]) box(.15, 1.6, .15, mat('#6B4B2E'), [x, .8, z], w.chair);
  w.bottle = group(); cyl(.25, .25, .9, mat('#9FD3EE', { opacity: .8 }), [0, .45, 0], w.bottle, 12); cyl(.12, .12, .2, mat('#3B6FD6'), [0, 1, 0], w.bottle, 10);
  w.camel = group(); const cm = mat('#C8955A'); const cb = ball(1.4, cm, [0, 3, 0], w.camel); cb.scale.set(1.6, .8, .8); for (const x of [-.7, .7]) ball(.8, cm, [x, 3.9, 0], w.camel); for (const [x, z] of [[-1.4, -.4], [-1.4, .4], [1.4, -.4], [1.4, .4]]) cyl(.18, .15, 2.6, cm, [x, 1.3, z], w.camel, 8); const nk = cyl(.3, .25, 1.8, cm, [2.4, 3.6, 0], w.camel, 8); nk.rotation.z = -.6; ball(.5, cm, [3, 4.4, 0], w.camel).scale.set(1.4, .8, .8); for (const z of [-1, 1]) ball(.08, mat('#111111'), [3.4, 4.6, z * .3], w.camel);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '286',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAMEL HUMPS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD CAMEL HUMPS?'],
  title: 'What would happen if humans had camel humps?',
  description: 'Deserts become easy. Chairs stop fitting. Your little brother finally has a seat. And camels think you are family. (A made-up body upgrade. Real camel humps store fat, not water.)',
  tags: ['whatif', 'funny', 'camel', 'desert', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human humps are made up. Quiz fact: a camel\'s hump stores fat, not water (San Diego Zoo Wildlife Alliance).'],
  setup,
  scenes: [
    { say: 'What if humans had camel humps?', show: ['floor', 'wall', 'pp'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.4, 3.6, 9], look: [0, 3.95, 0], fov: 50, to: { pos: [2.2, 3.6, 8.3], look: [0, 3.95, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 1.3); pose(w.p, .2); hump(w.p, Math.min(1, .2 + t * .8)); w.p.head.rotation.y = -.7; } },
    { say: 'The desert? No problem.', show: ['sand', 'dunes', 'sun', 'pp'], sky: '#FFD08A', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [6, 4, 10], look: [0, 3, 0], fov: 52, to: { pos: [5.6, 4, 9.4], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 1.4 - p * 2, 0, -Math.PI / 2); pose(w.p, .4 * Math.sin(t * 6), 0); hump(w.p, 1); w.pp.position.y = .08 * Math.abs(Math.sin(t * 6)); w.p.head.rotation.y = 1; w.p.mouth.scale.set(1.3, 1.2, 1); } },
    { say: 'Chairs? They do not fit anymore.', show: ['floor', 'wall', 'pp', 'chair'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [4, 3.6, 8], look: [0, 2.6, 0], fov: 50, to: { pos: [3.7, 3.6, 7.4], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.chair.position.set(0, 0, -.4); stand(w, 0, .5 + Math.max(0, Math.sin(t * 3)) * .4, 0); w.pp.position.y = .6 + .15 * Math.abs(Math.sin(t * 6)); hump(w.p, 1); pose(w.p, .5); w.p.mouth.scale.set(1, .6, 1); w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); } },
    { say: 'Your little brother? Finally, a seat.', show: ['floor', 'wall', 'pp', 'kk'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [5, 4, 7], look: [0, 3, -.4], fov: 50, to: { pos: [4.6, 4, 6.4], look: [0, 3, -.4], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, .3); pose(w.p, .2); hump(w.p, 1); w.kk.position.set(.12, 2.85 + .1 * Math.abs(Math.sin(t * 5)), -.75); w.kk.rotation.set(0, .3, 0); w.kid.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.6)); w.kid.mouth.scale.set(1.3, 2.2, 1); } },
    { say: 'And camels? They think you are family.', show: ['sand', 'dunes', 'sun', 'pp', 'camel'], sky: '#FFD08A', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 4.4, 14], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 4.4, 13.2], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 2, .6, -1.2); pose(w.p, .2); hump(w.p, 1); w.camel.position.set(-2, 0, -.6); w.camel.rotation.y = .3; w.camel.children[w.camel.children.length - 3].rotation.z = .1 * Math.sin(t * 3); } },
    { say: 'Camel humps: useful, awesome, or way too bumpy? Comment below.',
      quiz: { q: 'Would you want camel humps?', options: ['Useful', 'Awesome', 'Way too bumpy'], answer: 'Made up for people. Real camel humps store fat, not water.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 1.6, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [1.6, 1.6, 8.4], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 1.3); pose(w.p, .2); hump(w.p, .8 + .2 * Math.sin(t * 2)); w.p.head.rotation.y = -.7; } },
  ],
};
