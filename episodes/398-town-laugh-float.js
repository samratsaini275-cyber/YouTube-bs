// Narrative 22: "In This Town… (short format, cats first)". Body-rule shorts worked in 900–909 (906: 975 views at 07:43).
// Hook: the rule under 2 s; first frame shows a person laughing while floating above the pavement.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.path = box(40, .04, 4, mat('#C9C2B4'), [0, .03, 1]);
  w.trees = group(); for (let i = 0; i < 4; i++) { const t = group([-7 + i * 4.6, 0, -4], w.trees); cyl(.25, .3, 2.4, mat('#7A5A3A'), [0, 1.2, 0], t, 8); ball(1.4, mat('#3E8F3A'), [0, 3.2, 0], t); }
  w.a = person(k, k.scene, '#E2453C');
  w.b = person(k, k.scene, '#3B6FD6');
  w.hall = group(); box(30, .3, 12, mat('#3A2A4A'), [0, 9, 0], w.hall); box(30, 12, .3, mat('#5A3A6A'), [0, 4.5, -5], w.hall); w.stage = box(6, .8, 3, mat('#7A4E2E'), [0, .4, -2.5], w.hall); w.spot = cyl(.6, 2.2, 8, mat('#FFF4B0', { glow: .5 }), [0, 4.8, -2.5], w.hall, 16); w.spot.material.transparent = true; w.spot.material.opacity = .25;
  w.crowd = []; w.cg = group(); for (let i = 0; i < 4; i++) w.crowd.push(person(k, w.cg, ['#3FA34D', '#F2C94C', '#3B6FD6', '#E87A8A'][i]));
  w.book = group(); box(1.4, .3, 1, mat('#E2453C'), [0, 0, 0], w.book); box(1.3, .25, .95, mat('#FFFFFF'), [.05, 0, 0], w.book); w.hw = box(1, .02, .6, mat('#333333'), [0, .16, 0], w.book);
  w.ha = group(); for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FFE38A', { glow: .8 }), [0, 0, 0], w.ha); h.userData.i = i; }
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const laugh = (q, t) => { q.mouth.scale.set(1.3, 2.4 + 1.2 * Math.abs(Math.sin(t * 14)), 1); q.eyes.forEach(e => e.scale.y = .25); q.head.rotation.x = -.25 + .08 * Math.sin(t * 14); q.arms.forEach(a => a.rotation.set(-.3, 0, a.userData.s * (.5 + .15 * Math.sin(t * 14)))); };
const has = (w, t, on, at) => w.ha.children.forEach(h => { const i = h.userData.i, q = (t * .7 + i / 4) % 1; h.position.set(at[0] + (i % 2 ? 1 : -1) * (.6 + q), at[1] + q * 1.6, at[2] + .5); h.scale.setScalar(1 - q * .6); h.visible = on; });

export default {
  id: '398',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LAUGHING MAKES YOU FLOAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'LAUGHS MAKE YOU FLOAT'],
  title: 'In this town, laughing makes you float',
  description: 'A good joke? Up you go. Comedy night happens on the ceiling. And to come back down? Think about homework. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'laugh', 'whatif', 'comedy', 'shorts'],
  sources: ['Comedy sketch: floating laughter is made up. Quiz fact: in laugh diaries kept for a study, people laughed about 30 times more often when with others than when alone (Provine and Fischer, "Laughing, smiling, and talking: relation to sleeping and social context in humans", Ethology 83, 1989).'],
  setup,
  scenes: [
    { say: 'In this town, laughs make you float.', show: ['ground', 'path', 'trees', 'ha'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4.4, 14], look: [0, 4.3, 0], fov: 52, to: { pos: [0, 4.6, 13.4], look: [0, 4.6, 0], fov: 50 } },
      update: (w, p, t) => { w.hall.visible = false; w.cg.visible = false; w.book.visible = false; pAt(w.a, -.9, .6 + p * .6 + .1 * Math.sin(t * 3), 1, .3); laugh(w.a, t); pAt(w.b, 2.4, 0, .6, -.5); pose(w.b, .3, .6); w.b.mouth.scale.set(1, 1.6, 1); has(w, t, true, [-.9, 4.6 + p * .6, 1]); } },
    { say: 'A good joke? Up you go.', label: 'HA HA', show: ['ground', 'path', 'trees', 'ha'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4.5, 13], look: [0, 4.4, 0], fov: 54, to: { pos: [0, 5.6, 13], look: [0, 5.6, 0], fov: 54 } },
      update: (w, p, t) => { const y = .3 + p * 3.2; pAt(w.a, -1, y, 1, .3); if (p > .25) laugh(w.a, t); else w.a.mouth.scale.set(1, 1.4, 1); w.a.arms.forEach(a => a.rotation.z += p > .6 ? a.userData.s * .6 : 0); pAt(w.b, 2.2, 0, .6, -.6); pose(w.b, .9, .4); w.b.mouth.scale.set(1.2, 2, 1); has(w, t, p > .25, [-1, y + 4, 1]); } },
    { say: 'Comedy night? On the ceiling.', label: 'LOL', show: ['hall', 'cg', 'ha'], sky: '#2A1F35', lightAt: [0, 7, 8], lightDist: 30,
      cam: { pos: [0, 4.4, 15.5], look: [0, 4.4, 0], fov: 58, to: { pos: [0, 4.4, 15], look: [0, 4.4, 0], fov: 56 } },
      update: (w, p, t) => { w.ground.visible = false; w.path.visible = false; w.trees.visible = false; w.hall.visible = true; w.cg.visible = true; pAt(w.b, 0, .8, -2.5, 0, .9); pose(w.b, .2, 1.3); w.b.mouth.scale.set(1.2, 2.2 + Math.sin(t * 8), 1); w.a.root.visible = false; w.crowd.forEach((c, i) => { pAt(c, -4.2 + i * 2.8, 4.6 + (i % 2) * .5 + .15 * Math.sin(t * 3 + i), 1.6, 0, .9); laugh(c, t + i); c.root.rotation.z = (i % 2 ? .25 : -.25); }); has(w, t, true, [0, 6.6, 1.6]); } },
    { say: 'Coming down? Think about homework.', label: 'THUD', show: ['ground', 'path', 'trees', 'book'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: 0,
      cam: { pos: [0, 5, 15], look: [0, 4.6, 0], fov: 54, to: { pos: [0, 4.6, 14.4], look: [0, 4.2, 0], fov: 52 } },
      update: (w, p, t) => { w.hall.visible = false; w.cg.visible = false; w.ground.visible = true; w.path.visible = true; w.trees.visible = true; has(w, t, false, [0, 0, 0]); w.b.root.visible = false; const d = Math.min(1, Math.max(0, (p - .3) / .4)); pAt(w.a, 0, 3.2 * (1 - d * d), 1, 0); pose(w.a, .25, 1); w.a.mouth.scale.set(1.2, .5, 1); w.a.head.rotation.x = .3; w.a.eyes.forEach(e => e.scale.y = .6); if (d >= 1) { w.a.root.scale.set(1.1, .92, 1.1); } w.book.position.set(1.2, 3.2 * (1 - d * d) + 5.2, .6); w.book.rotation.set(-.9, 0, .2); } },
    { say: 'Laugh floating: cool, fun, or way too high? Comment below.',
      quiz: { q: 'Laughing to float is…', options: ['Cool', 'Fun', 'Way too high'], answer: 'Made up. But people laugh about 30 times more with friends than alone.' },
      show: ['ground', 'ha'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3.4, 9], look: [0, 3.2, 0], fov: 54, to: { pos: [-2, 3.4, 9], look: [0, 3.2, 0] } },
      update: (w, p, t) => { w.book.visible = false; w.path.visible = false; w.trees.visible = false; pAt(w.a, 0, .6 + .2 * Math.sin(t * 2), 0, 0); laugh(w.a, t); has(w, t, true, [0, 4.4, 0]); } },
  ],
};
