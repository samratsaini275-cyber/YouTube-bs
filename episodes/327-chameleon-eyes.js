// Narrative 19: "What Would Happen If… (season 9)". Body-upgrade premise (147 trunks 868).
// A made-up comedy sketch: people cannot swivel each eye separately. Hook: the premise as a question under 2 s; first frame shows a person with two big cone-shaped chameleon eyes pointing different ways.

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
  w.wall = group(); box(40, 20, .5, mat('#E8F2D8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3FA34D'); w.pp = w.p.root;
  w.p.eyes.forEach(e => e.visible = false);
  w.ceyes = [-1, 1].map(s => { const g = group([s * .42, .22, .5], w.p.head); const c = ball(.28, mat('#7AC943'), [0, 0, 0], g); c.scale.set(1, 1, 1.3); ball(.12, mat('#FFFFFF'), [0, 0, .3], g); ball(.07, mat('#111111'), [0, 0, .38], g); g.userData.s = s; return g; });
  w.bookL = group(); box(.9, 1.1, .1, mat('#E2453C'), [0, 0, 0], w.bookL); box(.8, 1, .12, mat('#FFFFFF'), [0, 0, .02], w.bookL);
  w.bookR = group(); box(.9, 1.1, .1, mat('#3B6FD6'), [0, 0, 0], w.bookR); box(.8, 1, .12, mat('#FFFFFF'), [0, 0, .02], w.bookR);
  w.tv = group(); box(2.4, 1.5, .2, mat('#222222'), [0, 0, 0], w.tv); w.screen = box(2.2, 1.3, .05, mat('#4FB3E8', { glow: .9 }), [0, 0, .12], w.tv); box(.2, 1, .2, mat('#333333'), [0, -1.2, 0], w.tv);
  w.desk = group(); box(2.4, .15, 1.2, mat('#C0703F'), [0, 2.2, 0], w.desk); for (const x of [-1, 1]) box(.15, 2.2, .15, mat('#C0703F'), [x, 1.1, 0], w.desk); box(.8, .05, 1, mat('#FFFFFF'), [0, 2.3, 0], w.desk);
  w.road = box(40, .04, 4, mat('#555B66'), [0, .02, 2]); w.zebra = group(); for (let i = 0; i < 6; i++) box(.5, .05, 3.8, mat('#FFFFFF'), [-1.5 + i * .6, .04, 2], w.zebra);
  w.cars = group(); for (const s of [-1, 1]) { const c = group([s * 9, 0, 2 + s * .9], w.cars); box(2.6, .9, 1.3, mat(s < 0 ? '#E2453C' : '#F2B21F'), [0, .65, 0], c); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], c); c.userData.s = s; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const look = (w, l, r) => { w.ceyes[0].rotation.set(l[0], l[1], 0); w.ceyes[1].rotation.set(r[0], r[1], 0); };

export default {
  id: '327',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CHAMELEON EYES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF YOU', 'HAD CHAMELEON EYES?'],
  title: 'What would happen if you had chameleon eyes?',
  description: 'Two books at once? Easy. Homework and TV at the same time. And crossing the road? Look both ways at once. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'chameleon', 'eyes', 'comedy', 'shorts'],
  sources: ['Comedy sketch: chameleon eyes on people are made up. Quiz fact: a chameleon can move each eye on its own, so it can look in two different directions at the same time (Encyclopaedia Britannica, "chameleon").'],
  setup,
  scenes: [
    { say: 'What if you had chameleon eyes?', show: ['floor', 'wall', 'pp'], sky: '#E8F2D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 10], look: [0, 4.3, 0], fov: 50, to: { pos: [0, 3.4, 9.3], look: [0, 4.3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); look(w, [.4 * Math.sin(t * 3), -.6 + .4 * Math.sin(t * 2)], [-.4 * Math.sin(t * 2.6), .6 + .4 * Math.cos(t * 3)]); } },
    { say: 'Two books at once? Easy.', show: ['floor', 'wall', 'pp', 'bookL', 'bookR'], sky: '#E8F2D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 9], look: [0, 3.6, 0], fov: 50, to: { pos: [0, 3.6, 8.4], look: [0, 3.6, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); w.p.arms.forEach(a => a.rotation.set(-.9, 0, a.userData.s * 1.1)); w.bookL.position.set(-1.6, 3, 1); w.bookL.rotation.set(-.3, .6, 0); w.bookR.position.set(1.6, 3, 1); w.bookR.rotation.set(-.3, -.6, 0); look(w, [.3, -.9 + .1 * Math.sin(t * 6)], [.3, .9 + .1 * Math.sin(t * 6 + 1)]); w.p.mouth.scale.set(1.3, 1.5, 1); } },
    { say: 'Homework and TV? At the same time.', show: ['floor', 'wall', 'pp', 'tv', 'desk'], sky: '#E8F2D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.5, 4, 10], look: [0, 3.2, 0], fov: 52, to: { pos: [2.3, 4, 9.3], look: [0, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3, .7); w.desk.position.set(0, 0, 1.2); w.tv.position.set(-3, 4.5, 0); w.tv.rotation.y = .6; w.screen.material.color.setHSL((t * .3) % 1, .7, .55); look(w, [-.3, -1.1], [.8, 0]); } },
    { say: 'And crossing the road? Look both ways at once.', show: ['floor', 'pp', 'road', 'zebra', 'cars'], sky: '#BFE3F7', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 5.5, 16], look: [0, 2.6, 0], fov: 56, to: { pos: [0, 5.5, 15.2], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, -.5 + Math.max(0, p - .5) * 5, 0); pose(w.p, .3); look(w, [0, -1.4], [0, 1.4]); w.cars.children.forEach(c => { const s = c.userData.s; c.position.x = s * (5 - Math.min(p, .5) * 4); c.rotation.y = s > 0 ? Math.PI : 0; }); w.p.mouth.scale.set(1.4, 1.2, 1); } },
    { say: 'Chameleon eyes: useful, cool, or way too creepy? Comment below.',
      quiz: { q: 'Would you want chameleon eyes?', options: ['Useful', 'Cool', 'Way too creepy'], answer: 'Made up for people. Real chameleons can move each eye on its own.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); look(w, [.3 * Math.sin(t * 2), -.5 * Math.cos(t)], [-.3 * Math.sin(t * 2.5), .5 * Math.sin(t)]); } },
  ],
};
