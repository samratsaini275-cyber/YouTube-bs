// Narrative 23: "In This Town… (season 2: things that talk back)". Object rule: a lunchbox that tells on you.
// Hook: the rule under 2 s; first frame shows a lunchbox with a face on a school desk, a kid beside it.

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

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);


function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C8A8', 0);
  w.wall = group(); box(40, 16, .3, mat('#BFD8F0'), [0, 8, -4], w.wall); box(4, 2.4, .1, mat('#2F5F3A'), [-2.5, 5, -3.8], w.wall);
  w.desk = group(); box(3.4, .2, 2, mat('#C8A070'), [0, 2, 0], w.desk); for (const x of [-1.5, 1.5]) for (const z of [-.8, .8]) cyl(.07, .07, 2, mat('#666666'), [x, 1, z], w.desk, 6);
  w.lb = group(); box(1.6, 1, .9, mat('#E2453C'), [0, .5, 0], w.lb); w.lid = group([0, 1, -.45], w.lb); box(1.6, .15, .9, mat('#C9302A'), [0, .07, .45], w.lid); const hd = k.torus(.3, .05, mat('#333333'), [0, 1.25, 0], w.lb); hd.rotation.y = 0;
  w.lf = face(k, w.lb, [0, .5, .46], .4);
  w.legs = []; for (const x of [-.4, .4]) { const l = group([x, 0, 0], w.lb); cyl(.06, .06, .5, mat('#333333'), [0, -.25, 0], l, 6); ball(.1, mat('#333333'), [.05, -.5, 0], l); w.legs.push(l); }
  w.banana = group(); const bn = cyl(.12, .1, .9, mat('#F2D84C'), [0, 0, 0], w.banana, 8); bn.rotation.z = Math.PI / 2 + .3;
  w.broc = group(); cyl(.08, .1, .3, mat('#9CCB6A'), [0, .15, 0], w.broc, 6); for (const v of [[0, .4, 0], [-.15, .35, 0], [.15, .35, 0]]) ball(.15, mat('#3E8F3A'), v, w.broc);
  w.kid = person(k, k.scene, '#3B6FD6');
  w.street = group(); box(30, .04, 3, mat('#666C77'), [0, .03, 1], w.street);
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const lbAt = (w, x, y, z, ry = 0, s = 1) => { w.lb.position.set(x, y, z); w.lb.rotation.set(0, ry, 0); w.lb.scale.setScalar(s); w.lb.visible = true; w.lid.rotation.x = 0; w.legs.forEach(l => { l.visible = false; l.rotation.x = 0; }); };

export default {
  id: '423',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LUNCHBOX TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'LUNCHBOXES TALK'],
  title: 'In this town, lunchboxes can talk',
  description: 'Swap your snack? It tells. Left at home? It walks to school. Broccoli inside? It hides it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'school', 'objectswithopinions', 'comedy', 'shorts'],
  sources: ['Comedy sketch: talking lunchboxes are made up. Quiz fact: in botany a berry is a simple fleshy fruit, usually with many seeds, and bananas, grapes and tomatoes all count as berries (Encyclopaedia Britannica, "berry").'],
  setup,
  scenes: [
    { say: 'In this town, lunchboxes talk.', show: ['floor', 'wall', 'desk'], sky: '#BFD8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.5, 3.4, 8.5], look: [.4, 3, 0], fov: 50, to: { pos: [.5, 3.4, 8], look: [.4, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.street.visible = false; w.banana.visible = false; w.broc.visible = false; lbAt(w, -.4, 2.1, .2, .2, 1); talk(w.lf, t); brow(w.lf, -.2); pAt(w.kid, 1.7, 0, -.4, -.5, .8); pose(w.kid, .2, .3); w.kid.head.rotation.x = .25; } },
    { say: 'Swap your snack? It tells.', label: 'TEACHER!', show: ['floor', 'wall', 'desk', 'banana'], sky: '#BFD8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.5, 3.4, 8.5], look: [.4, 2.9, 0], fov: 50, to: { pos: [.5, 3.4, 8], look: [.4, 2.9, 0], fov: 48 } },
      update: (w, p, t) => { lbAt(w, -.4, 2.1, .2, .2, 1); w.lid.rotation.x = -.9; pAt(w.kid, 1.5, 0, -.2, -.6, .8); pose(w.kid, .3, 1.4); w.kid.arms[0].updateWorldMatrix(true, true); w.banana.position.copy(w.kid.arms[0].localToWorld(new w.k.THREE.Vector3(0, -1.9, 0))); talk(w.lf, t, p > .35); brow(w.lf, .5); w.lf.scale.setScalar(.4 * (p > .35 ? 1.15 : 1)); } },
    { say: 'Left at home? It walks to school.', label: 'WAIT!', show: ['floor', 'street'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 2, 7], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 2, 6.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.wall.visible = false; w.desk.visible = false; w.banana.visible = false; w.kid.root.visible = false; w.lf.scale.setScalar(.4); w.floor.material = w.k.mat('#8CC56A'); lbAt(w, -1.6 + p * 2.6, .5 + .08 * Math.abs(Math.sin(t * 10)), 1, Math.PI / 2 - .9, 1); w.legs.forEach((l, i) => { l.visible = true; l.rotation.x = .6 * Math.sin(t * 10 + i * Math.PI); }); talk(w.lf, t); brow(w.lf, .4); } },
    { say: 'Broccoli inside? It hides it.', label: 'SHH', show: ['floor', 'wall', 'desk', 'broc'], sky: '#BFD8F0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.2, 6.5], look: [0, 2.6, 0], fov: 50, to: { pos: [.2, 3.2, 6], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.street.visible = false; w.floor.material = w.k.mat('#D8C8A8'); lbAt(w, 0, 2.1, .2, .1, 1); const q = Math.min(1, p * 2); w.lid.rotation.x = -1.2 * (1 - q); w.broc.position.set(.1, 2.4 + .6 * (1 - q), .2); w.broc.scale.setScalar(1); talk(w.lf, t, false); w.lf.mouth.scale.set(.6, .6, 1); brow(w.lf, -.3); w.lf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = q > .9 ? .3 : 1; }); } },
    { say: 'Talking lunchbox: helpful, sneaky, or way too nosy? Comment below.',
      quiz: { q: 'The talking lunchbox is…', options: ['Helpful', 'Sneaky', 'Way too nosy'], answer: 'Made up. Fun fact: bananas and tomatoes count as berries.' },
      show: ['floor', 'desk'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 3.4, 6.5], look: [0, 2.6, 0], fov: 50, to: { pos: [-1.2, 3.4, 6.5], look: [0, 2.6, 0] } },
      update: (w, p, t) => { w.broc.visible = false; w.wall.visible = false; lbAt(w, 0, 2.1, .2, 0, 1); w.lf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); talk(w.lf, t, Math.sin(t * 2) > 0); brow(w.lf, .2); } },
  ],
};
