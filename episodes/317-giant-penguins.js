// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized penguin next to a house.

function penguin(k, parent) {
  const { mat, ball, cone, group } = k;
  const black = mat('#1C2230', { rough: .5 }), white = mat('#F7F7F2'), orange = mat('#F29A1F');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, black, [0, 1.4, 0], g.body); b.scale.set(.9, 1.4, .85);
  const belly = ball(.85, white, [.42, 1.3, 0], g.body); belly.scale.set(.7, 1.3, .82);
  g.head = group([0, 2.9, 0], g.body); ball(.6, black, [0, 0, 0], g.head); const face = ball(.45, white, [.36, -.05, 0], g.head); face.scale.set(.6, .9, 1);
  for (const z of [-1, 1]) { ball(.1, mat('#FFFFFF'), [.45, .12, z * .2], g.head); ball(.055, mat('#111111'), [.53, .13, z * .2], g.head); }
  g.beak = cone(.14, .45, orange, [.72, -.05, 0], g.head, 8); g.beak.rotation.z = -Math.PI / 2;
  g.wings = [-1, 1].map(z => { const w = group([0, 2, z * .75], g.body); const m = ball(.3, black, [0, -.6, 0], w); m.scale.set(.6, 1.6, .3); w.userData.z = z; return w; });
  g.feet = [-1, 1].map(z => { const f = ball(.25, orange, [.3, .08, z * .35], g.root); f.scale.set(1.6, .3, 1); return f; });
  return g;
}
const flap = (g, t, a = .4) => g.wings.forEach(w => w.rotation.x = -w.userData.z * (.15 + a * Math.abs(Math.sin(t * 8))));
const waddle = (g, t) => { g.body.rotation.x = .12 * Math.sin(t * 6); g.feet.forEach((f, i) => f.position.y = .08 + .12 * Math.max(0, Math.sin(t * 6 + i * Math.PI))); };
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
  w.pg = penguin(k, k.scene); w.pr = w.pg.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.road = box(60, .04, 6, mat('#555B66'), [0, .02, 0]); w.lines = group(); for (let i = 0; i < 12; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-26 + i * 4.8, .05, 0], w.lines);
  w.shop = group(); box(5, 3.6, 3, mat('#9FD3EE'), [0, 1.8, 0], w.shop); box(5.4, .5, 3.4, mat('#2E7FB0'), [0, 3.8, 0], w.shop); box(3, .7, .1, mat('#FFFFFF'), [0, 3.1, 1.52], w.shop); w.sign = box(.9, .35, .12, mat('#F29A1F'), [0, 3.1, 1.6], w.shop);
  w.fish = group(); for (let i = 0; i < 6; i++) { const f = group([0, 0, 0], w.fish); const fb = ball(.3, mat('#9AB0C8', { metal: .4 }), [0, 0, 0], f); fb.scale.set(1.8, .7, .5); const tl = cone(.22, .35, mat('#7A90A8'), [-.6, 0, 0], f, 4); tl.rotation.z = Math.PI / 2; f.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const pgAt = (w, x, y, z, ry, s) => { w.pr.position.set(x, y, z); w.pr.rotation.set(0, ry, 0); w.pr.scale.setScalar(s); w.pg.body.rotation.set(0, 0, 0); w.pg.body.position.set(0, 0, 0); w.pg.head.rotation.set(0, 0, 0); };

export default {
  id: '317',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT PENGUINS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PENGUINS', 'WERE GIANT?'],
  title: 'What would happen if penguins were giant?',
  description: 'Your street becomes a belly slide. The fish shop? Empty. And every waddle shakes the town. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'penguin', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant penguins are made up. Quiz fact: in the Antarctic winter, emperor penguins huddle together in large groups to keep warm (Encyclopaedia Britannica, "emperor penguin").'],
  setup,
  scenes: [
    { say: 'What if penguins were giant?', show: ['ground', 'pr', 'house', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 7.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 7.6, 0], fov: 52 } },
      update: (w, p, t) => { pgAt(w, -3, 0, -5, -1.1, 2.6); flap(w.pg, t, .25); w.pg.head.rotation.z = .1 * Math.sin(t * 3); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your street? A belly slide.', label: 'WHEEE', show: ['ground', 'pr', 'road', 'lines', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4.5, 15], look: [0, 2.6, 0], fov: 56, to: { pos: [0, 4.5, 14.2], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { pgAt(w, -5 + p * 8, 1.6, 0, 0, 2); w.pg.body.rotation.z = -Math.PI / 2 + .1; w.pg.body.position.y = -1; w.pg.head.rotation.z = Math.PI / 2 - .3; w.pg.wings.forEach(wg => wg.rotation.x = -wg.userData.z * 1.3); w.pg.feet.forEach(f => f.position.y = -10); stand(w, 1.2, -3.2, 0); const near = Math.abs(w.pr.position.x - 1.2) < 2.5; pose(w.p, near ? 2.6 : .3); w.p.mouth.scale.set(1.2, near ? 3 : 1, 1); w.pp.position.y = near ? .4 : 0; } },
    { say: 'The fish shop? Empty.', label: 'GULP', show: ['ground', 'pr', 'shop', 'fish'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 5, 18], look: [0, 4.6, 0], fov: 54, to: { pos: [5.6, 5, 17], look: [0, 4.6, 0], fov: 52 } },
      update: (w, p, t) => { w.pg.feet.forEach(f => f.position.y = .08); pgAt(w, -3.5, 0, 0, -.5, 2.2); w.shop.position.set(3.5, 0, -1); w.shop.rotation.y = -Math.PI / 2; const head = new w.k.THREE.Vector3(-3.5 + .72 * 2.2 * .88, 2.9 * 2.2, .72 * 2.2 * .48); w.pg.head.rotation.z = .3 + .1 * Math.sin(t * 10); w.fish.children.forEach(f => { const i = f.userData.i, q = (t * 1.3 + i / 6) % 1; f.position.set(3 - q * (3 - head.x), 2 + Math.sin(q * Math.PI) * 3 + q * (head.y - 2), (i % 3 - 1) * .5); f.rotation.z = q * 4; f.visible = q < .95; }); flap(w.pg, t, .3); } },
    { say: 'And every waddle? Shakes the town.', label: '*STOMP*', show: ['ground', 'pr', 'house', 'pp', 'road', 'lines'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => Math.abs(Math.sin(t * 6)) > .9 ? .25 : .03,
      cam: { pos: [2, 5, 22], look: [0, 6, 0], fov: 56, to: { pos: [2, 5, 21], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { pgAt(w, -6 + p * 4, 0, -2, -1, 2.6); waddle(w.pg, t); flap(w.pg, t, .2); w.house.position.set(5, 0, -3); w.house.rotation.z = .03 * Math.sin(t * 12); stand(w, 3, 4, -.4); pose(w.p, 1.2); w.pp.position.y = .3 * Math.abs(Math.sin(t * 6)); w.p.mouth.scale.set(1.2, 2.5, 1); } },
    { say: 'Giant penguins: cute, cool, or way too waddly? Comment below.',
      quiz: { q: 'Giant penguins are…', options: ['Cute', 'Cool', 'Way too waddly'], answer: 'Made up. Real emperor penguins huddle in big groups to stay warm in winter.' },
      show: ['ground', 'pr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.6, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.6, 0] } },
      update: (w, p, t) => { w.house.rotation.z = 0; pgAt(w, 0, 0, 0, -1.2, 1.6); waddle(w.pg, t * .5); flap(w.pg, t, .2); } },
  ],
};
