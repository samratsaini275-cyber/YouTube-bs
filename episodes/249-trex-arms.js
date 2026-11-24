// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise, with a dinosaur twist (081 dinosaurs as pets is the channel best).
// A made-up comedy sketch: people do not have T-rex arms. Hook: the premise as a question under 2 s; first frame shows a person with tiny arms.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.mouth = k.box(.3, .06, .05, mat('#5A1E1E'), [0, -.25, .72], p.head);
  p.arms = [-1, 1].map(s => { const g = group([s * .55, 2.2, .7], p.root); cyl(.1, .1, .45, mat('#F2C9A0'), [0, 0, .2], g, 8).rotation.x = Math.PI / 2; ball(.12, mat('#F2C9A0'), [0, 0, .45], g); g.userData.s = s; return g; });
  return p;
}
const flail = (p, t, a = .6) => p.arms.forEach(g => g.rotation.set(a * Math.sin(t * 14 + g.userData.s), 0, 0));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.shelf = group(); box(4, .2, 1.2, mat('#8B5A2B'), [0, 5.2, -3], w.shelf); for (let i = 0; i < 4; i++) cyl(.3, .3, .8, mat(['#E2453C', '#FFC21F', '#3B82F6', '#22C55E'][i]), [-1.3 + i * .85, 5.7, -3], w.shelf, 12);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root; w.p2 = person(k, k.scene, '#E2453C'); w.pp2 = w.p2.root;
  w.stage = group(); box(40, 20, .5, mat('#3A2A4A'), [0, 10, -6], w.stage);
  w.rex = group(); const g = mat('#3FA34D', { rough: .7 }); const rb = ball(2, g, [0, 4, 0], w.rex); rb.scale.set(1.3, 1.1, 1); const hd = group([2.4, 6.4, 0], w.rex); box(2.6, 1.6, 1.6, g, [.6, 0, 0], hd); for (const z of [-.5, .5]) { ball(.3, mat('#FFFFFF'), [.9, .85, z], hd); ball(.15, mat('#111111'), [1.1, .95, z], hd); } box(1.6, .15, 1.62, mat('#E8F0E8'), [1.3, -.4, 0], hd); for (const z of [-.8, .8]) { const a = cyl(.15, .15, .7, g, [2, 4.2, z], w.rex, 8); a.rotation.z = 1.2; } for (const z of [-.9, .9]) cyl(.5, .5, 2.2, g, [-.2, 1.1, z], w.rex, 10); const tl = cone(.9, 4, g, [-3.4, 3.4, 0], w.rex, 10); tl.rotation.z = Math.PI / 2;
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = ball(.22, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const stand = (w, P, pp, x, z, ry) => { pp.position.set(x, 0, z); pp.rotation.set(0, ry, 0); P.head.rotation.set(0, 0, 0); P.arms.forEach(g => g.rotation.set(0, 0, 0)); };

export default {
  id: '249',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE T-REX ARMS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD T-REX ARMS?'],
  title: 'What would happen if humans had T-rex arms?',
  description: 'The top shelf is gone forever. Clapping is impossible. Hugs are just bumping into each other. And the T-rex finally feels understood. (A made-up body swap.)',
  tags: ['whatif', 'funny', 'trex', 'dinosaur', 'comedy', 'shorts'],
  sources: ['Comedy sketch: humans with T-rex arms are made up.'],
  setup,
  scenes: [
    { say: 'What if humans had T-rex arms?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.6, 2.6, 9.5], look: [0, 3.95, 0], fov: 48, to: { pos: [1.5, 2.6, 8.8], look: [0, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .35); flail(w.p, t, .4); } },
    { say: 'The top shelf? Gone forever.', show: ['ground', 'room', 'pp', 'shelf'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2, 3.6, 10], look: [0, 4, -1.5], fov: 50, to: { pos: [1.8, 3.6, 9.4], look: [0, 4, -1.5], fov: 48 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, -1.8, Math.PI); w.pp.position.y = Math.abs(Math.sin(t * 5)) * .6; flail(w.p, t, .3); w.p.arms.forEach(g => g.rotation.x = -1.2); } },
    { say: 'Clapping? Impossible.', show: ['ground', 'stage', 'pp'], sky: '#3A2A4A', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 3.2, 6], look: [0, 3, 0], fov: 46, to: { pos: [0, 3.2, 5.4], look: [0, 3, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, 0); w.p.arms.forEach(g => g.rotation.set(0, -g.userData.s * (.3 + .25 * Math.sin(t * 12)), 0)); w.p.mouth.scale.set(1, 2.5, 1); } },
    { say: 'Hugs? Just two people bumping bellies.', label: '*BONK*', show: ['ground', 'room', 'pp', 'pp2'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 3.4, 10], look: [0, 2.8, 0], fov: 48, to: { pos: [0, 3.4, 9.4], look: [0, 2.8, 0], fov: 46 } },
      update: (w, p, t) => { const q = Math.min(1, t / 1); const bounce = Math.max(0, t - 1); stand(w, w.p, w.pp, -2.4 + q * .7 - Math.min(.5, bounce * 1.5), 0, Math.PI / 2); stand(w, w.p2, w.pp2, 2.4 - q * .7 + Math.min(.5, bounce * 1.5), 0, -Math.PI / 2); flail(w.p, t, .5); flail(w.p2, t, .5); } },
    { say: 'And the T-rex? Finally feels understood.', show: ['ground', 'room', 'pp', 'rex', 'hearts'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 16,
      cam: { pos: [1, 4.6, 21], look: [0, 4.2, 0], fov: 50, to: { pos: [1, 4.6, 20], look: [0, 4.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 3.6, 2, -.9); flail(w.p, t, .4); w.rex.position.set(-2.8, 0, -1); w.rex.rotation.y = -1.1; w.hearts.children.forEach(h => { const q = (t * .7 + h.userData.i / 4) % 1; h.position.set((h.userData.i - 1.5) * .8 + .6, 8.4 + q * 1.8, 1); h.scale.setScalar(1 - q * .5); }); } },
    { say: 'T-rex arms: useful, awesome, or a bit useless? Comment below.',
      quiz: { q: 'Would you want T-rex arms?', options: ['Useful', 'Awesome', 'A bit useless'], answer: 'Tiny human arms are made up. The T-rex keeps its own.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.6, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1.6, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .35); flail(w.p, t, .6); } },
  ],
};
