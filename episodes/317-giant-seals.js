// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized seal next to a house.

function seal(k, parent) {
  const { mat, ball, cyl, group } = k;
  const grey = mat('#8A929C', { rough: .5 }), light = mat('#B8C0C8'), dark = mat('#5A626C');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, grey, [0, 1, 0], g.body); b.scale.set(2.1, .95, 1);
  const bl = ball(.9, light, [.2, .75, 0], g.body); bl.scale.set(2, .55, .95);
  for (let i = 0; i < 6; i++) { const s = ball(.12, dark, [-1.2 + i * .5, 1.75 + (i % 2) * .1, (i % 3 - 1) * .4], g.body); s.scale.set(1, .4, 1); }
  g.head = group([1.9, 1.75, 0], g.body); ball(.75, grey, [0, 0, 0], g.head); const mz = ball(.4, light, [.55, -.15, 0], g.head); mz.scale.set(.8, .7, 1.1);
  for (const z of [-1, 1]) { ball(.17, mat('#111111', { rough: .15 }), [.45, .25, z * .32], g.head); ball(.05, mat('#FFFFFF', { glow: .6 }), [.58, .3, z * .3], g.head); for (let j = 0; j < 3; j++) { const wk = cyl(.012, .012, .7, mat('#EEEEEE'), [.8, -.12 - j * .06, z * .35], g.head, 4); wk.rotation.x = z * (Math.PI / 2 - .2 + j * .15); } }
  g.nose = ball(.1, mat('#222222'), [.88, 0, 0], g.head); g.mouth = ball(.15, mat('#3A1E1E'), [.8, -.3, 0], g.head); g.mouth.scale.set(.6, .2, 1.4);
  g.wings = [-1, 1].map(z => { const w = group([.9, .5, z * .85], g.body); const f = ball(.3, dark, [0, -.2, 0], w); f.scale.set(1.6, .4, .8); w.userData.z = z; return w; });
  g.feet = [-1, 1].map(z => { const f = ball(.3, dark, [-2.3, .5, z * .3], g.root); f.scale.set(1.4, .3, 1); return f; });
  return g;
}
const flap = (g, t, a = .4) => g.wings.forEach(w => w.rotation.x = -w.userData.z * (a * Math.abs(Math.sin(t * 8))));
const bark = (g, t, a = 1) => g.mouth.scale.set(.6, .2 + a * .8 * Math.max(0, Math.sin(t * 9)), 1.4);
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
  w.pg = seal(k, k.scene); w.pr = w.pg.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.road = box(60, .04, 6, mat('#555B66'), [0, .02, 0]); w.lines = group(); for (let i = 0; i < 12; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-26 + i * 4.8, .05, 0], w.lines);
  w.shop = group(); box(5, 3.6, 3, mat('#9FD3EE'), [0, 1.8, 0], w.shop); box(5.4, .5, 3.4, mat('#2E7FB0'), [0, 3.8, 0], w.shop); box(3, .7, .1, mat('#FFFFFF'), [0, 3.1, 1.52], w.shop); w.sign = box(.9, .35, .12, mat('#F29A1F'), [0, 3.1, 1.6], w.shop);
  w.fish = group(); for (let i = 0; i < 6; i++) { const f = group([0, 0, 0], w.fish); const fb = ball(.3, mat('#9AB0C8', { metal: .4 }), [0, 0, 0], f); fb.scale.set(1.8, .7, .5); const tl = cone(.22, .35, mat('#7A90A8'), [-.6, 0, 0], f, 4); tl.rotation.z = Math.PI / 2; f.userData.i = i; }
  w.cars = group(); for (let i = 0; i < 3; i++) { const c = group([-6 + i * 6, 0, 3], w.cars); box(2.6, .9, 1.3, mat(['#E2453C', '#3B6FD6', '#F2B21F'][i]), [0, .65, 0], c); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], c); c.userData.light = box(.3, .2, .2, mat('#FF8A1F', { glow: 1.2 }), [1.3, .8, .45], c); }
  w.barks = group(); for (let i = 0; i < 3; i++) { const r = k.torus(.8, .1, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.barks); r.userData.i = i; r.castShadow = false; r.material.transparent = true; }
  return w;
}


const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const pgAt = (w, x, y, z, ry, s) => { w.pr.position.set(x, y, z); w.pr.rotation.set(0, ry, 0); w.pr.scale.setScalar(s); w.pg.body.rotation.set(0, 0, 0); w.pg.body.position.set(0, 0, 0); w.pg.head.rotation.set(0, 0, 0); };

export default {
  id: '317',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT SEALS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SEALS', 'WERE GIANT?'],
  title: 'What would happen if seals were giant?',
  description: 'Your street becomes a belly slide. The fish shop? Empty. And one bark sets off every car alarm. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'seal', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant seals are made up. Quiz fact: harbor seals can follow the invisible water trail left by a swimming fish using only their whiskers (Dehnhardt et al., Science, 2001).'],
  setup,
  scenes: [
    { say: 'What if seals were giant?', show: ['ground', 'pr', 'house', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.4, 0], fov: 52 } },
      update: (w, p, t) => { pgAt(w, -4, 0, -5, -.7, 2.6); flap(w.pg, t, .25); w.pg.head.rotation.z = .15 + .1 * Math.sin(t * 3); bark(w.pg, t, .5); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your street? A belly slide.', label: 'WHEEE', show: ['ground', 'pr', 'road', 'lines', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4.5, 15], look: [0, 2.6, 0], fov: 56, to: { pos: [0, 4.5, 14.2], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { pgAt(w, -6 + p * 9, 0, 0, 0, 1.4); w.pg.head.rotation.z = .2; w.pg.wings.forEach(wg => wg.rotation.x = -wg.userData.z * .8); stand(w, 1.2, -3.2, 0); const near = Math.abs(w.pr.position.x - 1.2) < 3; pose(w.p, near ? 2.6 : .3); w.p.mouth.scale.set(1.2, near ? 3 : 1, 1); w.pp.position.y = near ? .4 : 0; } },
    { say: 'The fish shop? Empty.', label: 'GULP', show: ['ground', 'pr', 'shop', 'fish'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 5, 18], look: [0, 4, 0], fov: 54, to: { pos: [5.6, 5, 17], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { pgAt(w, -5, 0, 0, -.3, 1.8); w.shop.position.set(4, 0, -1); w.shop.rotation.y = -Math.PI / 2; w.pg.head.rotation.z = .35 + .1 * Math.sin(t * 10); w.pr.updateWorldMatrix(true, true); const head = w.pg.mouth.getWorldPosition(new w.k.THREE.Vector3()); bark(w.pg, t, .8); w.fish.children.forEach(f => { const i = f.userData.i, q = (t * 1.3 + i / 6) % 1; f.position.set(3.4 - q * (3.4 - head.x), 2 + Math.sin(q * Math.PI) * 3 + q * (head.y - 2), (1 - q) * ((i % 3 - 1) * .5) + q * head.z); f.rotation.z = q * 4; f.visible = q < .95; }); flap(w.pg, t, .3); } },
    { say: 'And one bark? Every car alarm goes off.', label: 'ARF! ARF!', show: ['ground', 'pr', 'house', 'cars', 'barks', 'road', 'lines'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 ? .06 : 0,
      cam: { pos: [2, 6, 24], look: [0, 4.5, 0], fov: 56, to: { pos: [2, 6, 23], look: [0, 4.5, 0], fov: 54 } },
      update: (w, p, t) => { pgAt(w, -4, 0, -3, -.5, 2.4); w.pg.head.rotation.z = .5; bark(w.pg, t, 1.2); flap(w.pg, t, .3); w.house.position.set(6, 0, -4); const on = t > .5; w.cars.children.forEach((c, i) => { c.userData.light.visible = on && Math.sin(t * 16 + i) > 0; c.position.y = on ? .08 * Math.abs(Math.sin(t * 20 + i)) : 0; }); w.pr.updateWorldMatrix(true, true); const m = w.pg.mouth.getWorldPosition(new w.k.THREE.Vector3()); w.barks.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 3) % 1; r.position.set(m.x + 1 + q * 2, m.y, m.z); r.rotation.set(0, Math.PI / 2, 0); r.scale.setScalar(.6 + q * 2.5); r.material.opacity = 1 - q; r.visible = on; }); } },
    { say: 'Giant seals: cute, cool, or way too loud? Comment below.',
      quiz: { q: 'Giant seals are…', options: ['Cute', 'Cool', 'Way too loud'], answer: 'Made up. Real harbor seals can follow a fish trail with just their whiskers.' },
      show: ['ground', 'pr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 2.8, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 2.8, 0] } },
      update: (w, p, t) => { pgAt(w, 0, 0, 0, -1.1, 1.3); w.pg.head.rotation.z = .3; bark(w.pg, t, .4); flap(w.pg, t, .2); } },
  ],
};
