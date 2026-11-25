// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a zebra taller than a house.

function zebra(k, parent) {
  const { mat, ball, cyl, box, group } = k;
  const wht = mat('#F4F4F0', { rough: .8 }), blk = mat('#1A1A1A', { rough: .8 });
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, wht, [0, 2.8, 0], g.body); b.scale.set(1.6, .85, .8);
  for (let i = 0; i < 6; i++) { const s = cyl(.83, .83, .16, blk, [-1.15 + i * .46, 2.8, 0], g.body, 20); s.rotation.z = Math.PI / 2 + .25; s.scale.set(1, 1, 1); s.scale.set(1.04, 1, .98); }
  g.neck = group([1.3, 3.2, 0], g.body); const nk = cyl(.3, .4, 1.8, wht, [.4, .7, 0], g.neck, 10); nk.rotation.z = -.55;
  for (let i = 0; i < 3; i++) { const s = cyl(.4, .4, .14, blk, [.17 + i * .25, .3 + i * .45, 0], g.neck, 12); s.rotation.z = -.55; }
  const mane = box(.15, 1.6, .12, blk, [.2, .9, 0], g.neck); mane.rotation.z = -.55;
  g.head = group([2.2, 4.4, 0], g.body); const hd = ball(.45, wht, [0, 0, 0], g.head); hd.scale.set(1.6, .8, .7); ball(.25, blk, [.65, -.08, 0], g.head);
  for (const z of [-1, 1]) { ball(.08, mat('#111111'), [.1, .18, z * .3], g.head); const e = ball(.13, wht, [-.25, .42, z * .18], g.head); e.scale.y = 1.8; }
  g.legs = []; for (const x of [-1, 1]) for (const z of [-1, 1]) { const l = group([x * 1, 2.3, z * .35], g.body); cyl(.13, .11, 2.3, wht, [0, -1.15, 0], l, 8); for (let j = 0; j < 3; j++) cyl(.135, .135, .12, blk, [0, -.4 - j * .5, 0], l, 8); cyl(.14, .14, .2, blk, [0, -2.25, 0], l, 8); g.legs.push(l); }
  const tl = cyl(.05, .05, 1.2, wht, [-1.7, 2.6, 0], g.body, 6); tl.rotation.z = -.3;
  return g;
}
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
  w.ground = k.ground('#8CC56A', 0);
  w.road = box(60, .05, 6, mat('#555B66'), [0, .03, 3]);
  w.zb = zebra(k, k.scene); w.zr = w.zb.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cars = group(); for (const [x, c] of [[-9, '#E2453C'], [9, '#3E6FD6']]) { const cr = group([x, 0, 3], w.cars); box(2.6, .9, 1.3, mat(c), [0, .65, 0], cr); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], cr); }
  w.ballG = group(); const fb = ball(.5, mat('#FFFFFF'), [0, 0, 0], w.ballG); for (let i = 0; i < 5; i++) ball(.14, mat('#111111'), [Math.cos(i * 1.26) * .42, Math.sin(i * 1.26) * .42, .2], w.ballG);
  w.stars = group(); for (let i = 0; i < 8; i++) { const s = ball(.12, mat('#FFE14A', { glow: 1 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const zbAt = (w, x, y, z, ry, s) => { w.zr.position.set(x, y, z); w.zr.rotation.set(0, ry, 0); w.zr.scale.setScalar(s); w.zb.body.rotation.set(0, 0, 0); w.zb.body.position.set(0, 0, 0); w.zb.neck.rotation.set(0, 0, 0); w.zb.head.position.set(2.2, 4.4, 0); w.zb.head.rotation.set(0, 0, 0); w.zb.legs.forEach(l => l.rotation.set(0, 0, 0)); };

export default {
  id: '358',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT ZEBRAS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF ZEBRAS', 'WERE GIANT?'],
  title: 'What would happen if zebras were giant?',
  description: 'It lies down on the road: a real zebra crossing. Its stripes make the traffic dizzy. And one kick sends your football into space. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'zebra', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant zebras are made up. Quiz fact: no two zebras have exactly the same stripe pattern (Smithsonian\'s National Zoo, "Grevy\'s zebra"; Encyclopaedia Britannica, "zebra").'],
  setup,
  scenes: [
    { say: 'What if zebras were giant?', show: ['ground', 'zr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 26], look: [0, 10, 0], fov: 56, to: { pos: [1, 4, 24.5], look: [0, 10, 0], fov: 54 } },
      update: (w, p, t) => { zbAt(w, -3.4, 0, -5, -.7, 2.2); w.zb.head.rotation.z = .08 * Math.sin(t * 2); w.house.position.set(3.6, 0, -1); stand(w, 1.6, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'It lies on the road. Now that is a zebra crossing.', label: 'BEEP BEEP', show: ['ground', 'road', 'zr', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [17, 9, 8], look: [0, 1.2, 3], fov: 56, to: { pos: [16, 9, 7.5], look: [0, 1.2, 3], fov: 54 } },
      update: (w, p, t) => { zbAt(w, 0, 0, 1, -Math.PI / 2, 1.5); w.zb.body.position.y = -1.9; w.zb.legs.forEach((l, i) => l.rotation.z = (i < 2 ? 1 : -1) * 1.3); w.zb.head.rotation.z = .2; const c = w.cars.children; c[0].position.set(-14 + Math.min(1, p * 2) * 9, 0, 2); c[1].position.set(14 - Math.min(1, p * 2) * 9, 0, 4); c[1].rotation.y = Math.PI; } },
    { say: 'Its stripes? The traffic gets dizzy.', label: 'WOOZY', show: ['ground', 'road', 'zr', 'cars', 'stars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 24], look: [0, 4, 0], fov: 56, to: { pos: [2, 6, 23], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { zbAt(w, -1.5, 0, -2, 0, 1.6); const c = w.cars.children; c[0].position.set(-3, 0, 4); c[0].rotation.y = t * 3; c[1].position.set(4, 0, 4); c[1].rotation.y = -t * 3.4; w.stars.children.forEach(s => { const i = s.userData.i, a = t * 4 + i / 8 * Math.PI * 2, cx = i < 4 ? -3 : 4; s.position.set(cx + Math.cos(a) * 1.2, 2.4 + Math.sin(a * 2) * .2, 4 + Math.sin(a) * 1.2); }); } },
    { say: 'And one kick? Your football is in space.', label: 'BOING!', show: ['ground', 'zr', 'ballG', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 5, 20], look: [0, 4.6, 0], fov: 56, to: { pos: [3, 5, 19], look: [0, 4.6, 0], fov: 54 } },
      update: (w, p, t) => { w.cars.children.forEach(c => c.rotation.y = 0); zbAt(w, 1.5, 0, -1, Math.PI, 1.4); const k = p > .4; w.zb.legs[0].rotation.z = k ? -.9 : 0; w.zb.legs[1].rotation.z = k ? -.9 : 0; const q = Math.max(0, p - .4); w.ballG.position.set(-1.2 - q * 6, .5 + q * q * 60, 1); w.ballG.rotation.z = t * 6; stand(w, -2.8, 3.6, .5); pose(w.p, k ? 2.4 : .6); w.p.mouth.scale.set(1.2, k ? 3 : 1, 1); w.p.head.rotation.x = k ? -.5 : 0; } },
    { say: 'Giant zebras: cool, cute, or way too stripy? Comment below.',
      quiz: { q: 'Giant zebras are…', options: ['Cool', 'Cute', 'Way too stripy'], answer: 'Made up. But no two real zebras have the same stripes.' },
      show: ['ground', 'zr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [12, 5, 10], look: [0, 4.4, 0], fov: 54, to: { pos: [14, 5, 2], look: [0, 4.4, 0] } },
      update: (w, p, t) => { zbAt(w, 0, 0, 0, -.7, 1.3); w.zb.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
