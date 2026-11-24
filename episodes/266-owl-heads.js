// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855).
// A made-up comedy sketch: people cannot turn their heads all the way round. Hook: the premise as a question under 2 s; first frame shows a person's head spinning.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.16, mat('#FFFFFF'), [0, 0, 0], e); ball(.08, mat('#111111'), [0, 0, .12], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head); box(1.4, .5, .3, mat('#3A2A1A'), [0, .3, -.6], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#E8E0F0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#2FA36B'); w.pp = w.p.root;
  w.desks = group(); for (let i = 0; i < 3; i++) { const d = group([-3 + i * 3, 0, -2.6], w.desks); box(2, .15, 1.2, mat('#C8955A'), [0, 1.6, 0], d); for (const x of [-.85, .85]) box(.1, 1.6, .1, mat('#8B5A2B'), [x, .8, 0], d); }
  w.teacher = person(k, k.scene, '#8E44AD'); w.tt = w.teacher.root;
  w.board = group(); box(5, 2.4, .1, mat('#2E4A3A'), [0, 4.4, -4.6], w.board);
  w.car = group(); box(4.4, 1.1, 2.2, mat('#3B6FD6'), [0, 1, 0], w.car); box(.1, .8, 2, mat('#9FD3EE'), [.9, 1.95, 0], w.car).rotation.z = -.3; for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], w.car, 16); wh.rotation.x = Math.PI / 2; }
  w.ball = ball(.4, mat('#FF7F2A'), [0, 0, 0], k.scene);
  w.owl = group(); const om = mat('#9A6A3A'); const ob = ball(.9, om, [0, 1, 0], w.owl); ob.scale.set(1, 1.2, .9); w.owlHead = group([0, 2.2, 0], w.owl); ball(.7, om, [0, 0, 0], w.owlHead); for (const x of [-.3, .3]) { ball(.25, mat('#FFFFFF'), [x, .05, .55], w.owlHead); ball(.12, mat('#111111'), [x, .05, .74], w.owlHead); cone(.12, .35, om, [x * 1.4, .65, 0], w.owlHead, 4); } const bk = cone(.08, .2, mat('#E8A33A'), [0, -.18, .7], w.owlHead, 6); bk.rotation.x = Math.PI; w.branch = cyl(.15, .15, 6, mat('#6B4B2E'), [0, 0, 0], k.scene, 8); w.branch.rotation.z = Math.PI / 2;
  w.qs = group(); for (let i = 0; i < 3; i++) { const q = group([0, 0, 0], w.qs); const qm = mat('#FFC21F', { glow: .8 }); const t = k.torus(.25, .07, qm, [0, .3, 0], q); t.rotation.x = 0; ball(.08, qm, [0, -.2, 0], q); q.userData.i = i; q.traverse(o => o.castShadow = false); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '266',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE OWL HEADS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD OWL HEADS?'],
  title: 'What would happen if humans could turn their heads like owls?',
  description: 'Teachers can see you from the board. Parking gets easy. Nobody can sneak up on you. And owls finally have competition. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'owl', 'superpower', 'comedy', 'shorts'],
  sources: ['Comedy sketch: people cannot do this. Quiz fact: owls can turn their heads about 270 degrees (Johns Hopkins Medicine, 2013 study of owl neck blood vessels).'],
  setup,
  scenes: [
    { say: 'What if humans had owl heads?', show: ['floor', 'wall', 'pp'], sky: '#E8E0F0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 9], look: [0, 3.95, 0], fov: 50, to: { pos: [0, 3.4, 8.2], look: [0, 3.95, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); w.p.head.rotation.y = t < .7 ? 0 : (t - .7) * 5; } },
    { say: 'Teachers? They see you without turning round.', show: ['floor', 'wall', 'board', 'desks', 'tt', 'pp'], sky: '#E8E0F0', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [3, 4.4, 10], look: [0, 3.2, -2], fov: 52, to: { pos: [2.8, 4.4, 9.3], look: [0, 3.2, -2], fov: 50 } },
      update: (w, p, t) => { w.pp.scale.setScalar(1); w.tt.position.set(.6, 0, -3.8); w.tt.rotation.set(0, Math.PI, 0); w.teacher.head.rotation.y = p > .35 ? Math.PI : 0; pose(w.teacher, .3, p > .35 ? 0 : 1.6); w.teacher.eyes.forEach(e => e.scale.setScalar(p > .35 ? 1.4 : 1)); stand(w, -1.6, 1.4, Math.PI); w.p.arms[1].rotation.set(-2.6 + .4 * Math.sin(t * 6), 0, .2); w.p.arms[0].rotation.set(0, 0, -.2); } },
    { say: 'Parking? Easy.', show: ['ground', 'car', 'pp'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 24,
      cam: { pos: [6, 5, 10], look: [0, 1.8, 0], fov: 50, to: { pos: [5.6, 5, 9.4], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.car.position.set(1.4 - p * 2.4, 0, 0); w.car.rotation.y = 0; w.pp.position.set(w.car.position.x - .5, .9, 0); w.pp.rotation.set(0, Math.PI / 2, 0); w.pp.scale.setScalar(.55); w.p.head.rotation.y = p > .3 ? Math.PI : 0; pose(w.p, .2, 1.2); } },
    { say: 'Sneaking up on you? Impossible.', show: ['ground', 'pp', 'tt', 'qs'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.6, 10], look: [0, 3.2, 0], fov: 52, to: { pos: [0, 3.6, 9.3], look: [0, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.scale.setScalar(1); stand(w, -.4, 0, 0); pose(w.p, .2); w.p.head.rotation.y = p > .5 ? Math.PI * .85 : 0; const fz = -5 + Math.min(p, .5) * 6; w.tt.position.set(1.4, p > .5 ? .4 * Math.abs(Math.sin(t * 10)) : 0, fz); w.tt.rotation.set(p > .5 ? -.15 : .25, 0, 0); pose(w.teacher, p > .5 ? 2.6 : 1, p > .5 ? 0 : .8); w.teacher.mouth.scale.set(1, p > .5 ? 3 : 1, 1); w.qs.children.forEach(c => { const i = c.userData.i; c.position.set(.4 + i * 1, 5.6 + .2 * Math.sin(t * 4 + i), fz); c.visible = p > .55; }); } },
    { say: 'And owls? Finally, some competition.', show: ['ground', 'pp', 'owl', 'branch'], sky: '#2B3A6B', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [.4, 4, 11.5], look: [.4, 3.6, 0], fov: 54, to: { pos: [.4, 4, 10.8], look: [.4, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -1.2, 0, .2); pose(w.p, .2); w.branch.position.set(1.6, 4.2, -.5); w.owl.position.set(1.6, 4.3, -.5); w.owl.scale.setScalar(.9); const a = Math.sin(t * 2.4) * 2.2; w.owlHead.rotation.y = a; w.p.head.rotation.y = -a * 1.4; } },
    { say: 'Owl heads: useful, awesome, or way too creepy? Comment below.',
      quiz: { q: 'Would you want an owl head?', options: ['Useful', 'Awesome', 'Way too creepy'], answer: 'Made up for people. Real owls turn about 270 degrees.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); w.p.head.rotation.y = Math.sin(t * 1.5) * 1.5; } },
  ],
};
