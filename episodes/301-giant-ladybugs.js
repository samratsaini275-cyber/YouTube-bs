// Narrative 17: "What Would Happen If… (season 7)". Big-animal premise (167 giant cats 322, 290 giant mice, 298 giant crabs).
// Hook: the premise as a question under 2 s; first frame shows a car-sized ladybug sitting next to a house.

function bug(k, parent) {
  const { mat, ball, cyl, box, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  const black = mat('#141414', { rough: .4 });
  b.body = ball(1, black, [0, 1, 0], b.root); b.body.scale.set(1.2, .45, .95);
  b.wings = [-1, 1].map(z => { const g = group([-.1, 1.15, z * .02], b.root); const sh = k.mesh(new k.THREE.SphereGeometry(1.05, 24, 14, 0, Math.PI, 0, Math.PI / 2), mat('#E0281E', { rough: .3 }), [0, 0, 0], g); sh.rotation.x = z > 0 ? 0 : Math.PI; sh.scale.set(1.2, .7, 1); sh.rotation.order = 'XYZ'; sh.rotation.set(-Math.PI / 2 * (z > 0 ? 0 : 0), 0, 0); for (let i = 0; i < 3; i++) { const sp = ball(.2, black, [-.6 + i * .5, .55 - (i % 2) * .12, z * .45], g); sp.scale.set(1, .4, 1); } g.userData.z = z; return g; });
  // keep shells as two halves of a dome split along x
  b.wings.forEach(g => { const sh = g.children[0]; sh.geometry = new k.THREE.SphereGeometry(1.05, 24, 14, g.userData.z > 0 ? 0 : Math.PI, Math.PI, 0, Math.PI / 2); sh.rotation.set(0, 0, 0); });
  b.head = group([1.25, .95, 0], b.root); ball(.45, black, [0, 0, 0], b.head);
  for (const z of [-1, 1]) { ball(.13, mat('#FFFFFF'), [.3, .12, z * .2], b.head); ball(.065, mat('#111111'), [.4, .13, z * .2], b.head); const an = cyl(.025, .025, .7, black, [.15, .45, z * .15], b.head, 6); an.rotation.set(z * .4, 0, -.5); }
  b.legs = []; for (const z of [-1, 1]) for (let i = 0; i < 3; i++) { const l = cyl(.05, .04, .9, black, [-.5 + i * .5, .45, z * .7], b.root, 6); l.rotation.x = z * .6; l.userData.z = z; b.legs.push(l); }
  b.flaps = [-1, 1].map(z => { const fw = box(1.6, .02, .8, mat('#CFE8F5', { opacity: .6 }), [-.3, 1.5, z * .9], b.root); fw.visible = false; return fw; });
  return b;
}
const walk = (b, t) => b.legs.forEach((l, i) => l.rotation.z = .3 * Math.sin(t * 12 + i));
const fly = (b, t, on) => { b.wings.forEach(g => g.rotation.x = on ? g.userData.z * -.9 : 0); b.flaps.forEach((f, i) => { f.visible = on; f.rotation.x = on ? (i ? 1 : -1) * (.3 + .5 * Math.sin(t * 40)) : 0; }); };
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
  w.ground = k.ground('#7FB069', 0);
  w.lb = bug(k, k.scene); w.lr = w.lb.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); w.roof = cone(3.2, 2.2, mat('#3B6FD6'), [0, 4.5, 0], w.house, 4); w.roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.clouds = group(); for (let i = 0; i < 5; i++) { const c = group([-14 + i * 7, 8 + (i % 2) * 3, -10], w.clouds); for (let j = 0; j < 3; j++) ball(1.4, mat('#FFFFFF'), [j * 1.3 - 1.3, (j % 2) * .5, 0], c); }
  w.garden = group(); for (let i = 0; i < 6; i++) { const r = group([-5 + i * 2, 0, 1 + (i % 2)], w.garden); cyl(.08, .08, 1.6, mat('#2F7A3A'), [0, .8, 0], r, 6); ball(.4, mat(['#E2453C', '#FF8FB1', '#FFC21F'][i % 3]), [0, 1.7, 0], r); }
  w.aphids = group(); for (let i = 0; i < 14; i++) { const a = ball(.12, mat('#9CE05A'), [0, 0, 0], w.aphids); a.userData.i = i; }
  w.tree = group(); cyl(.5, .7, 4, mat('#7A4E2A'), [0, 2, 0], w.tree, 10); ball(2.6, mat('#3E8E41'), [0, 5.4, 0], w.tree);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); };
const bugAt = (w, x, y, z, ry, s) => { w.lr.position.set(x, y, z); w.lr.rotation.set(0, ry, 0); w.lr.scale.setScalar(s); };

export default {
  id: '301',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT LADYBUGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF LADYBUGS', 'WERE GIANT?'],
  title: 'What would happen if ladybugs were giant?',
  description: 'The school bus? Just fly. Gardeners are thrilled. It naps on your roof. And hide and seek? Those red spots give it away. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'ladybug', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant ladybugs are made up. Quiz fact: a single ladybug can eat up to about 5,000 aphids in its lifetime (National Wildlife Federation, "Ladybugs").'],
  setup,
  scenes: [
    { say: 'What if ladybugs were giant?', show: ['ground', 'lr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-1, 6.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-1, 6.4, 0], fov: 52 } },
      update: (w, p, t) => { bugAt(w, -4, 0, -5, -.7, 3.4); walk(w.lb, t * .3); fly(w.lb, t, false); w.lb.head.rotation.y = .2 * Math.sin(t * 2); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'The school bus? Just fly.', show: ['lr', 'pp', 'clouds'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 10, 20], look: [0, 11, 0], fov: 54, to: { pos: [0, 10, 18.6], look: [0, 11, 0], fov: 52 } },
      update: (w, p, t) => { const x = -4 + p * 8, y = 6 + .5 * Math.sin(t * 3); bugAt(w, x, y, 0, 0, 3); fly(w.lb, t, true); w.lb.legs.forEach(l => l.rotation.z = .4); w.pp.position.set(x - .6, y + 4.4, 0); w.pp.rotation.set(0, .5, 0); w.pp.scale.setScalar(.75); w.p.head.rotation.set(0, 0, 0); pose(w.p, 2.4 + .3 * Math.sin(t * 6)); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Gardeners? Thrilled.', label: 'MUNCH', show: ['ground', 'lr', 'pp', 'garden', 'aphids'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 30,
      cam: { pos: [1, 4.5, 15], look: [0, 3, 0], fov: 54, to: { pos: [1, 4.5, 14], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 1, 1); w.garden.position.set(0, 0, -2); bugAt(w, -3 + p * 4, 0, -3.5, 0, 1.8); walk(w.lb, t); fly(w.lb, t, false); w.aphids.children.forEach(a => { const i = a.userData.i, x = -5 + (i % 7) * 1.4, eaten = x < w.lr.position.x + 2.2; a.position.set(x, 1.2 + Math.floor(i / 7) * .5, -1 + (i % 2) * .3); a.visible = !eaten; }); stand(w, 3, 2.5, -.4); pose(w.p, 2.6); w.p.mouth.scale.set(1.3, 1.5, 1); w.p.arms.forEach(a => a.rotation.z = a.userData.s * (2.5 + .2 * Math.sin(t * 8))); } },
    { say: 'Nap time? It lands on your roof.', label: '*CREAK*', show: ['ground', 'lr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t < .8 ? .12 : 0,
      cam: { pos: [3, 5, 19], look: [0, 5.2, 0], fov: 54, to: { pos: [3, 5, 18], look: [0, 5.2, 0], fov: 52 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 2, 1); w.house.position.set(0, 0, 0); const q = Math.min(1, p * 2.2); bugAt(w, 0, 3.9 + (1 - q) * 5, 0, .4, 2.4); fly(w.lb, t, q < 1); w.lb.legs.forEach(l => l.rotation.z = 0); w.roof.scale.y = q < 1 ? 1 : .85 + .05 * Math.sin(t * 3); w.house.scale.set(1 + (q >= 1 ? .04 : 0), 1, 1); stand(w, 4.5, 3, -.4); pose(w.p, .3); w.p.head.rotation.x = -.5; } },
    { say: 'Hide and seek? Those red spots give it away.', show: ['ground', 'lr', 'tree', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 30,
      cam: { pos: [2, 3.8, 15], look: [0, 3.4, 0], fov: 54, to: { pos: [2, 3.8, 14], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { w.house.scale.set(1, 1, 1); w.roof.scale.y = 1; w.tree.position.set(-1.5, 0, -1); bugAt(w, -1.5, 0, -3.2, Math.PI / 2 - .2, 2.4); fly(w.lb, t, false); w.lb.root.position.x = -1.5 + .3 * Math.sin(t * 1.5); stand(w, 2.5, 2, -.6); pose(w.p, .6, .4); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.mouth.scale.set(1.4, 1, 1); w.p.head.rotation.y = -.3; } },
    { say: 'Giant ladybugs: cute, cool, or way too big? Comment below.',
      quiz: { q: 'Giant ladybugs are…', options: ['Cute', 'Cool', 'Way too big'], answer: 'Made up. Real ladybugs can eat about 5,000 aphids in a lifetime.' },
      show: ['ground', 'lr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [9, 2.4, 4], look: [0, 2.2, 0], fov: 52, to: { pos: [8.4, 2.4, -2.5], look: [0, 2.4, 0] } },
      update: (w, p, t) => { bugAt(w, 0, 0, 0, 0, 1.6); fly(w.lb, t, false); walk(w.lb, t * .3); w.lb.head.rotation.y = .3 * Math.sin(t * 2); } },
  ],
};
