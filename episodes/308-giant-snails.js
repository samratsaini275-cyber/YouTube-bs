// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized snail next to a house.

function snail(k, parent) {
  const { mat, ball, cyl, box, torus, group } = k;
  const skin = mat('#C9B48A', { rough: .4 });
  const s = { root: group([0, 0, 0], parent) };
  const foot = ball(1, skin, [0, .35, 0], s.root); foot.scale.set(2.2, .38, .8);
  s.neck = group([1.6, .5, 0], s.root); const nk = cyl(.38, .45, 1.4, skin, [0, .6, 0], s.neck, 12); nk.rotation.z = -.35;
  s.stalks = [-1, 1].map(z => { const g = group([.25, 1.2, z * .18], s.neck); const st = cyl(.06, .06, .7, skin, [0, .35, 0], g, 6); ball(.13, mat('#FFFFFF'), [0, .75, 0], g); ball(.07, mat('#111111'), [.08, .78, 0], g); g.rotation.z = -.3; g.userData.z = z; return g; });
  s.mouth = box(.04, .08, .3, mat('#6B4A2A'), [.62, .55, 0], s.neck);
  s.shell = group([-.3, 1.5, 0], s.root); const sh = mat('#B5652E'); const r1 = torus(.9, .45, sh, [0, 0, 0], s.shell); r1.rotation.x = 0; const r2 = torus(.45, .3, mat('#C9803F'), [0, 0, .25], s.shell); r2.rotation.x = 0; ball(.3, mat('#9A4E22'), [0, 0, .4], s.shell);
  s.door = box(.4, .6, .05, mat('#8B5A2B'), [0, -.3, .62], s.shell); s.win = box(.35, .3, .05, mat('#9FD3EE', { glow: .3 }), [.55, .45, .6], s.shell); s.door.visible = false; s.win.visible = false;
  return s;
}
const look = (s, t) => s.stalks.forEach((g, i) => { g.rotation.z = -.3 + .2 * Math.sin(t * 2 + i); g.rotation.x = g.userData.z * .15 * Math.sin(t * 3); });
const glide = (s, t) => { s.root.children[0].scale.x = 2.2 + .08 * Math.sin(t * 4); };
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
  w.road = group(); box(400, .04, 7, mat('#4A4A4A', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 40; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-80 + i * 4, .03, 0], w.road);
  w.sn = snail(k, k.scene); w.sr = w.sn.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = group([0, 0, 0], w.cars); box(2.4, .8, 1.2, mat(['#3B6FD6', '#FFC21F', '#5FBF5F', '#E2453C'][i]), [0, .6, 0], c); box(1.2, .6, 1.1, mat('#9FD3EE'), [-.2, 1.2, 0], c); c.userData.i = i; }
  w.slime = box(14, .03, 1.6, mat('#D8F0FF', { glow: .3, metal: .6, rough: .05, opacity: .8 }), [0, .03, 0]);
  w.lettuce = group(); for (let i = 0; i < 5; i++) { const l = group([-4 + i * 2, 0, 1], w.lettuce); for (let j = 0; j < 4; j++) { const lf = ball(.5, mat(j % 2 ? '#7CCB4A' : '#5FAE3A'), [Math.cos(j * 1.6) * .2, .45 + j * .05, Math.sin(j * 1.6) * .2], l); lf.scale.y = .8; } l.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); };
const snAt = (w, x, y, z, ry, s) => { w.sr.position.set(x, y, z); w.sr.rotation.set(0, ry, 0); w.sr.scale.setScalar(s); };

export default {
  id: '308',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT SNAILS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SNAILS', 'WERE GIANT?'],
  title: 'What would happen if snails were giant?',
  description: 'Traffic becomes a very slow jam. Your lawn gets a slime trail. The lettuce? One bite. And moving day? It brings its own house. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'snail', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant snails are made up. Quiz fact: snails glide on a layer of mucus they make, which helps them move over rough and even sharp surfaces (Encyclopaedia Britannica, "snail").'],
  setup,
  scenes: [
    { say: 'What if snails were giant?', show: ['ground', 'sr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.4, 0], fov: 52 } },
      update: (w, p, t) => { snAt(w, -3.4, 0, -5, -.4, 2.4); look(w.sn, t); glide(w.sn, t); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Traffic? A very slow jam.', label: 'HONK', show: ['ground', 'road', 'sr', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 17], look: [-2.6, 2.4, 0], fov: 54, to: { pos: [2.6, 6, 16], look: [-2.6, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { snAt(w, 1.5 + p * .3, 0, 0, 0, 1.6); look(w.sn, t); glide(w.sn, t); w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-3.5 - i * 3, .05 * Math.abs(Math.sin(t * 9 + i)), 0); }); } },
    { say: 'Your lawn? Slime everywhere.', label: 'WHOA', show: ['ground', 'sr', 'slime', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 15], look: [-1, 2.6, 0], fov: 54, to: { pos: [1, 4, 14.2], look: [-1, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { snAt(w, -7, 0, -2, 0, 1.6); look(w.sn, t); w.slime.position.set(0, .03, 1.5); stand(w, -2 + p * 4, 1.5, Math.PI / 2); w.pp.rotation.z = .4 * Math.sin(t * 6); w.p.arms.forEach((a, i) => a.rotation.set(0, 0, a.userData.s * (1.8 + .6 * Math.sin(t * 8 + i)))); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'The lettuce? One bite each.', label: 'MUNCH', show: ['ground', 'sr', 'lettuce'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4.4, 14], look: [0, 2.2, 0], fov: 54, to: { pos: [2, 4.4, 13], look: [0, 2.2, 0], fov: 52 } },
      update: (w, p, t) => { w.pp.rotation.z = 0; w.p.mouth.scale.set(1, 1, 1); snAt(w, -7 + p * 6.5, 0, -.4, 0, 1.6); look(w.sn, t); glide(w.sn, t); w.sn.mouth.scale.y = 1 + .8 * Math.abs(Math.sin(t * 12)); const head = w.sr.position.x + 3; w.lettuce.children.forEach(l => { l.visible = l.position.x > head; }); } },
    { say: 'And moving day? It brings its own house.', show: ['ground', 'sr', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4.6, 16], look: [0, 3.4, 0], fov: 54, to: { pos: [3, 4.6, 15], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { snAt(w, -1.5 + p * 2, 0, -1, .3, 2.2); look(w.sn, t); glide(w.sn, t); w.sn.door.visible = true; w.sn.win.visible = true; stand(w, 3.3, 2.8, -.7); pose(w.p, .3); w.p.mouth.scale.set(1.2, 1.8, 1); w.p.head.rotation.y = -.3; } },
    { say: 'Giant snails: cute, slimy, or way too slow? Comment below.',
      quiz: { q: 'Giant snails are…', options: ['Cute', 'Slimy', 'Way too slow'], answer: 'Made up. Real snails glide on their own slime, even over sharp surfaces.' },
      show: ['ground', 'sr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [8, 3, 11], look: [0, 2.2, 0], fov: 52, to: { pos: [11, 3, 4.5], look: [0, 2.2, 0] } },
      update: (w, p, t) => { w.sn.door.visible = false; w.sn.win.visible = false; snAt(w, 0, 0, 0, .3, 1.4); look(w.sn, t); glide(w.sn, t); } },
  ],
};
