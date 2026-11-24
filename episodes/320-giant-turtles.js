// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized turtle next to a house.

function turtle(k, parent) {
  const { mat, ball, cyl, group } = k;
  const shellM = mat('#5A8A3A', { rough: .6 }), plate = mat('#7AAA4A', { rough: .6 }), skin = mat('#A8C878', { rough: .7 });
  const g = { root: group([0, 0, 0], parent) };
  const sh = k.mesh(new k.THREE.SphereGeometry(1.6, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2), shellM, [0, .55, 0], g.root); sh.scale.set(1.2, .9, 1);
  cyl(1.95, 1.95, .2, mat('#C8B060'), [0, .55, 0], g.root, 28).scale.set(1, 1, .84);
  for (let i = 0; i < 7; i++) { const a = i / 7 * Math.PI * 2; const p = ball(.38, plate, [Math.cos(a) * 1.05, 1.45 - (i === 0 ? 0 : 0), Math.sin(a) * .85], g.root); p.scale.set(1, .25, 1); p.position.y = .55 + Math.sqrt(Math.max(0, 1 - ((Math.cos(a) * 1.05) / 1.92) ** 2 - ((Math.sin(a) * .85) / 1.6) ** 2)) * 1.44; } const top = ball(.45, plate, [0, 1.98, 0], g.root); top.scale.set(1, .25, 1);
  g.neck = group([1.9, .7, 0], g.root); const nk = cyl(.3, .35, .8, skin, [.35, 0, 0], g.neck, 10); nk.rotation.z = Math.PI / 2;
  g.head = group([.9, .15, 0], g.neck); ball(.5, skin, [0, 0, 0], g.head); for (const z of [-1, 1]) { ball(.13, mat('#FFFFFF'), [.3, .18, z * .25], g.head); ball(.07, mat('#111111'), [.4, .19, z * .27], g.head); } g.mouth = cyl(.01, .01, .5, mat('#3A4A2A'), [.45, -.12, 0], g.head, 4); g.mouth.rotation.x = Math.PI / 2;
  g.legs = []; for (const x of [-1.2, 1.2]) for (const z of [-1, 1]) { const l = group([x, .4, z * 1.2], g.root); const lg = ball(.4, skin, [0, -.15, 0], l); lg.scale.set(1, 1.1, 1); g.legs.push(l); }
  ball(.25, skin, [-2, .55, 0], g.root).scale.set(1.6, .6, .8);
  return g;
}
const plod = (g, t, sp = 3) => g.legs.forEach((l, i) => { l.position.y = .4 + .15 * Math.max(0, Math.sin(t * sp + (i === 0 || i === 3 ? 0 : Math.PI))); l.rotation.z = .15 * Math.sin(t * sp + i); });
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
  w.tt = turtle(k, k.scene); w.tr = w.tt.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.road = box(60, .04, 6, mat('#555B66'), [0, .02, 0]); w.lines = group(); for (let i = 0; i < 12; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-26 + i * 4.8, .05, 0], w.lines);
  w.cars = group(); for (let i = 0; i < 4; i++) { const c = group([2 + i * 4, 0, 0], w.cars); box(2.6, .9, 1.3, mat(['#E2453C', '#3B6FD6', '#F2B21F', '#9B59B6'][i]), [0, .65, 0], c); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], c); }
  w.pool = group(); box(8, .3, 5.5, mat('#FFFFFF'), [0, .15, 0], w.pool); w.water = box(7.6, .1, 5.1, mat('#4FB3E8', { glow: .15 }), [0, .32, 0], w.pool);
  w.bubbles = group(); for (let i = 0; i < 10; i++) { const d = ball(.25, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.bubbles); d.userData.i = i; d.castShadow = false; }
  w.flag = group(); cyl(.06, .06, 3, mat('#555555'), [0, 1.5, 0], w.flag, 6); for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) box(.4, .4, .02, mat((i + j) % 2 ? '#111111' : '#FFFFFF'), [.25 + i * .4, 2.6 - j * .4, 0], w.flag);
  w.cal = group(); w.pages = []; for (let i = 0; i < 8; i++) { const pg = group([0, 0, 0], w.cal); box(1.2, 1.4, .02, mat('#FFFFFF'), [0, 0, 0], pg); box(1.2, .3, .025, mat('#E2453C'), [0, .55, 0], pg); pg.userData.i = i; w.pages.push(pg); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const ttAt = (w, x, y, z, ry, s) => { w.tr.position.set(x, y, z); w.tr.rotation.set(0, ry, 0); w.tr.scale.setScalar(s); w.tt.neck.rotation.set(0, 0, 0); };

export default {
  id: '320',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT TURTLES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF TURTLES', 'WERE GIANT?'],
  title: 'What would happen if turtles were giant?',
  description: 'Traffic? Stuck behind a turtle. Your pool becomes their bath. And a race against one? It ends next week. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'turtle', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant turtles are made up. Quiz fact: female sea turtles often return to the same beach where they hatched to lay their own eggs (NOAA Fisheries, sea turtles).'],
  setup,
  scenes: [
    { say: 'What if turtles were giant?', show: ['ground', 'tr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.2, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.2, 0], fov: 52 } },
      update: (w, p, t) => { ttAt(w, -3.6, 0, -5, -1.1, 2.4); w.tt.neck.rotation.z = .2 + .1 * Math.sin(t * 2); w.house.position.set(4, 0, -1); stand(w, 2.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Traffic? Stuck behind a turtle.', label: 'HONK!', show: ['ground', 'tr', 'road', 'lines', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 17], look: [1.2, 2, 0], fov: 54, to: { pos: [2, 6, 16.2], look: [1.2, 2, 0], fov: 52 } },
      update: (w, p, t) => { ttAt(w, -2.4 + p * .5, 0, 0, Math.PI, 1.3); w.tr.rotation.y = 0; plod(w.tt, t, 2); w.cars.children.forEach((c, i) => { c.position.set(2.1 + p * .5 + i * 3.1, .04 * Math.abs(Math.sin(t * 20 + i)), 0); c.rotation.y = Math.PI; }); } },
    { say: 'Your pool? Their bath.', label: 'AHHH', show: ['ground', 'tr', 'pool', 'bubbles', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 9, 21], look: [.6, 2, 0], fov: 54, to: { pos: [2, 9, 20.2], look: [.6, 2, 0], fov: 52 } },
      update: (w, p, t) => { const q = Math.min(1, p * 1.8); ttAt(w, 0, .3 - q * .3, 0, -.5, 1.5); w.tt.neck.rotation.z = .3; w.tt.legs.forEach(l => l.position.y = .4); w.bubbles.children.forEach(d => { const i = d.userData.i, b = (t * .6 + i / 10) % 1; d.position.set(-3 + (i * .67) % 6, .4 + b * 1.2, -2 + (i % 4) * 1.2); d.scale.setScalar(.6 + b); d.visible = q >= 1; }); stand(w, 5.2, 5, -.7); pose(w.p, .3); w.p.mouth.scale.set(1.2, 2.2, 1); } },
    { say: 'And a race against one? It ends next week.', label: 'SO SLOW', show: ['ground', 'tr', 'flag', 'cal'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 4, 0], fov: 54, to: { pos: [2, 5, 17.2], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { ttAt(w, -2.6 + p * .5, 0, 0, 0, 1.4); plod(w.tt, t, 1.5); w.tt.neck.rotation.z = .1; w.flag.position.set(4.5, 0, 0); w.cal.position.set(-1, 7, -1); w.pages.forEach(pg => { const i = pg.userData.i, q = Math.max(0, (t * 1.2 - i * .3)) % 2; pg.position.set(q * 1.5, -q * 2, q * .5); pg.rotation.set(q * 1.5, 0, q * 2); }); } },
    { say: 'Giant turtles: cute, cool, or way too slow? Comment below.',
      quiz: { q: 'Giant turtles are…', options: ['Cute', 'Cool', 'Way too slow'], answer: 'Made up. Real female sea turtles often lay eggs on the beach where they hatched.' },
      show: ['ground', 'tr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 2.4, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 2.4, 0] } },
      update: (w, p, t) => { ttAt(w, 0, 0, 0, -1, 1.2); plod(w.tt, t, 2); w.tt.neck.rotation.z = .2; } },
  ],
};
