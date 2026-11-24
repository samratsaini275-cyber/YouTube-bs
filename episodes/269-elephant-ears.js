// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise, a follow-up to the best performer (147 humans with trunks, 855).
// A made-up comedy sketch: people do not have elephant ears. Hook: the premise as a question under 2 s; first frame shows a person flapping huge ears.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.ears = [-1, 1].map(s => { const e = group([s * .7, 0, 0], p.head); const o = ball(1.2, mat('#E8B48A'), [s * 1.1, 0, 0], e); o.scale.set(1, 1.3, .12); const i = ball(1, mat('#D9917A'), [s * 1.1, 0, .2], e); i.scale.set(1, 1.25, .06); e.userData.s = s; return e; });
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const flap = (p, a) => p.ears.forEach(e => e.rotation.y = e.userData.s * a);

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#F4E9D8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.sun = group(); ball(1.4, mat('#FFD23F', { glow: 1 }), [0, 0, 0], w.sun); w.sun.traverse(o => o.castShadow = false);
  w.friends = group(); w.fr = []; for (let i = 0; i < 2; i++) { const q = person(k, w.friends, ['#E2453C', '#FFC21F'][i]); q.ears.forEach(e => e.visible = false); q.root.position.set(i ? 2.8 : -2.8, 0, -.4); q.root.rotation.y = i ? -.5 : .5; w.fr.push(q); }
  w.sweat = group(); for (let i = 0; i < 6; i++) { const d = ball(.1, mat('#9FD3EE', { glow: .4 }), [0, 0, 0], w.sweat); d.scale.y = 1.6; d.userData.i = i; d.castShadow = false; }
  w.lines = group(); for (let i = 0; i < 6; i++) { const l = box(1.2, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.phone = group(); box(.8, 1.4, .1, mat('#222222'), [0, 0, 0], w.phone); box(.7, 1.2, .02, mat('#BFE3F7', { glow: .6 }), [0, 0, .06], w.phone);
  w.waves = group(); for (let i = 0; i < 3; i++) { const t = k.torus(.4 + i * .35, .04, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.waves); t.rotation.set(0, Math.PI / 2, 0); t.userData.i = i; t.castShadow = false; }
  w.ele = group(); const em = mat('#9AA3AD'); const eb = ball(1.6, em, [0, 2.4, 0], w.ele); eb.scale.set(1.3, 1, 1); ball(1, em, [1.9, 3, 0], w.ele); for (const z of [-1, 1]) { const ea = ball(.9, em, [1.6, 3.1, z * .9], w.ele); ea.scale.set(.15, 1.1, 1); ball(.1, mat('#111111'), [2.7, 3.3, z * .4], w.ele); } const tr = k.cyl(.25, .15, 2, em, [2.8, 2, 0], w.ele, 8); tr.rotation.z = .3; for (const [x, z] of [[-1, -.6], [-1, .6], [1, -.6], [1, .6]]) cyl(.35, .35, 1.6, em, [x, .8, z], w.ele, 10);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '269',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ELEPHANT EARS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD ELEPHANT EARS?'],
  title: 'What would happen if humans had elephant ears?',
  description: 'Hot day? Just flap. Your friends get a free breeze. You hear every secret in the building. And elephants finally have someone to talk to. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'elephant', 'ears', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human elephant ears are made up. Quiz fact: African elephants flap their big ears to help cool down (San Diego Zoo Wildlife Alliance).'],
  setup,
  scenes: [
    { say: 'What if humans had elephant ears?', show: ['floor', 'wall', 'pp'], sky: '#F4E9D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 10], look: [0, 3.95, 0], fov: 52, to: { pos: [0, 3.4, 9.2], look: [0, 3.95, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); flap(w.p, .5 * Math.sin(t * 7)); } },
    { say: 'Hot day? Just flap.', show: ['ground', 'pp', 'sun', 'sweat'], sky: '#FFC27A', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.8, 10], look: [0, 4.2, 0], fov: 54, to: { pos: [0, 3.8, 9.3], look: [0, 4.2, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); w.sun.position.set(2.6, 8.4, -3); const f = p > .45; flap(w.p, f ? .7 * Math.sin(t * 14) : 0); w.p.mouth.scale.set(1, f ? .6 : 2, 1); w.sweat.children.forEach(d => { const i = d.userData.i, q = (t + i / 6) % 1; d.position.set((i % 2 ? 1 : -1) * (.4 + (i % 3) * .2), 4 - q * 1.2, .7); d.visible = !f; }); } },
    { say: 'Your friends? Free air conditioning.', show: ['floor', 'wall', 'pp', 'friends', 'lines'], sky: '#F4E9D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4, 11.5], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 4, 10.8], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); flap(w.p, .7 * Math.sin(t * 12)); w.fr.forEach((q, i) => { pose(q, 1.4); q.head.rotation.x = -.3; q.mouth.scale.set(1.3, .6, 1); q.eyes.forEach(e => e.scale.set(1, .3, 1)); }); w.lines.children.forEach(l => { const i = l.userData.i, s = i % 2 ? 1 : -1, q = (t * 1.5 + i / 6) % 1; l.position.set(s * (1.6 + q * 1.2), 3 + (i % 3) * .4, 0); }); } },
    { say: 'Secrets? You hear every single one.', label: '*PSST*', show: ['floor', 'wall', 'pp', 'waves'], sky: '#F4E9D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 4, 8], look: [.6, 3.4, 0], fov: 50, to: { pos: [1.3, 4, 7.4], look: [.6, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.6, 0, .2); pose(w.p, .2); flap(w.p, -.3); w.p.head.rotation.z = -.2; w.p.eyes.forEach(e => e.scale.setScalar(1.4)); w.waves.position.set(3.4, 3.4, 0); w.waves.children.forEach(r => { const i = r.userData.i, q = (t * .8 + i / 3) % 1; r.scale.setScalar(.6 + q * 1.6); r.position.x = -q * 1.2; }); } },
    { say: 'And elephants? Finally, someone gets them.', show: ['ground', 'pp', 'ele'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 4.4, 13], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 4.4, 12.2], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -2.2, 0, .5); pose(w.p, .2); flap(w.p, .4 * Math.sin(t * 4)); w.ele.position.set(2.2, 0, -.6); w.ele.rotation.y = Math.PI + .6; w.ele.children[2].rotation.y = .3 * Math.sin(t * 4); w.ele.children[4].rotation.y = -.3 * Math.sin(t * 4); } },
    { say: 'Elephant ears: useful, awesome, or way too big? Comment below.',
      quiz: { q: 'Would you want elephant ears?', options: ['Useful', 'Awesome', 'Way too big'], answer: 'Made up for people. Real elephants flap their ears to cool down.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 9], look: [0, 4.6, 0], fov: 50, to: { pos: [-1, 1, 9], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); flap(w.p, .5 * Math.sin(t * 6)); } },
  ],
};
