// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized parrot next to a house.

function parrot(k, parent) {
  const { mat, ball, cone, cyl, group } = k;
  const grey = mat('#3FBF4A', { rough: .5 }), neck = mat('#F2C94C', { rough: .5 }), dark = mat('#2E6FD0');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, grey, [0, 1.4, 0], g.body); b.scale.set(1.4, 1, .9);
  const nk = ball(.6, neck, [.9, 2.1, 0], g.body); nk.scale.set(.9, 1.1, .8);
  g.head = group([1.25, 2.75, 0], g.body); ball(.45, grey, [0, 0, 0], g.head); const bk = cone(.2, .5, mat('#2A2A2A'), [.45, -.2, 0], g.head, 8); bk.rotation.z = -Math.PI / 2 - .7; const fc = ball(.25, mat('#FFFFFF'), [.25, .05, 0], g.head); fc.scale.set(.6, 1, 1.5);
  for (const z of [-1, 1]) { ball(.11, mat('#F29A1F'), [.22, .12, z * .32], g.head); ball(.05, mat('#111111'), [.27, .13, z * .37], g.head); }
  g.wings = [-1, 1].map(z => { const w = group([0, 1.7, z * .8], g.body); const m = ball(.6, dark, [-.3, 0, 0], w); m.scale.set(1.5, .5, .25); w.userData.z = z; return w; });
  const tail = ball(.5, mat('#E2453C'), [-1.9, 1, 0], g.body); tail.scale.set(2, .22, .5); tail.rotation.z = .4;
  g.legs = [-1, 1].map(z => { const l = group([.2, .5, z * .35], g.root); cyl(.06, .06, .6, mat('#D86A6A'), [0, 0, 0], l, 6); for (let c = -1; c <= 1; c++) { const tt = cyl(.04, .04, .35, mat('#D86A6A'), [.15, -.3, c * .1], l, 5); tt.rotation.z = Math.PI / 2; } return l; });
  return g;
}
const bob = (g, t) => { g.head.position.x = 1.25 + .15 * Math.sin(t * 8); g.body.rotation.z = .03 * Math.sin(t * 8); };
const flap = (g, t, a = 1) => g.wings.forEach(w => w.rotation.x = -w.userData.z * a * (.3 + .9 * Math.abs(Math.sin(t * 10))));
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
  w.pg = parrot(k, k.scene); w.pr = w.pg.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); w.roofC = box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.bakery = group(); box(5, 3.6, 3, mat('#F5E0C0'), [0, 1.8, 0], w.bakery); const aw = box(5.4, .3, 1, mat('#E2453C'), [0, 3, 1.8], w.bakery); aw.rotation.x = -.3; w.loaves = []; for (let i = 0; i < 6; i++) { const l = ball(.35, mat('#C98B3E'), [-1.8 + i * .7, .3, 2.1], w.bakery); l.scale.set(1.6, .7, .8); w.loaves.push(l); }
  w.city = group(); for (let i = 0; i < 6; i++) { const h = 4 + (i % 3) * 2.5; const b = group([-12 + i * 4.8, 0, -8 - (i % 2) * 3], w.city); box(3.2, h, 3, mat(['#B8C0D0', '#C8B8A8', '#A8B8C8'][i % 3]), [0, h / 2, 0], b); b.userData.win = []; for (let r = 0; r < 3; r++) { const wn = box(.6, .6, .05, mat('#FFE9A8', { glow: .9 }), [(r - 1) * .9, h - 1, 1.53], b); b.userData.win.push(wn); } }
  w.notes = group(); for (let i = 0; i < 5; i++) { const n = k.torus(.6, .08, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.notes); n.userData.i = i; n.castShadow = false; n.material.transparent = true; }
  w.moon = ball(1.2, mat('#FFF3C4', { glow: .9 }), [8, 15, -14]);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const pgAt = (w, x, y, z, ry, s) => { w.pr.position.set(x, y, z); w.pr.rotation.set(0, ry, 0); w.pr.scale.setScalar(s); w.pg.body.rotation.set(0, 0, 0); w.pg.wings.forEach(wg => wg.rotation.x = 0); };

export default {
  id: '335',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT PARROTS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PARROTS', 'WERE GIANT?'],
  title: 'What would happen if parrots were giant?',
  description: 'Your car? Their perch. Crackers? They eat the whole bakery. And your secrets? Repeated to the whole city. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'parrot', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant parrots are made up. Quiz fact: a budgerigar named Puck holds the Guinness World Record for the largest vocabulary of any bird, 1,728 words (Guinness World Records, recorded 1995).'],
  setup,
  scenes: [
    { say: 'What if parrots were giant?', show: ['ground', 'pr', 'house', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.6, 0], fov: 52 } },
      update: (w, p, t) => { pgAt(w, -3.4, 0, -5, -.9, 2.5); bob(w.pg, t); w.house.position.set(4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your car? Their perch.', label: 'CRUNCH', show: ['ground', 'pr', 'car', 'pp'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 16], look: [0, 3.6, 0], fov: 54, to: { pos: [2, 5, 15.2], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { const q = Math.min(1, t / .9); pgAt(w, -5 + q * 5, 1.7 + (1 - q) * 6, 0, -.4, 1.4); if (q < 1) flap(w.pg, t); else bob(w.pg, t); const land = q >= 1; w.car.scale.set(1, land ? .7 : 1, 1); w.roofC.scale.y = land ? .3 : 1; stand(w, 4.2, 3.6, -.6); pose(w.p, land ? 2.4 : .3); w.p.mouth.scale.set(1.2, land ? 3 : 1, 1); } },
    { say: 'Crackers? They eat the whole bakery.', label: 'CRUNCH', show: ['ground', 'pr', 'bakery'], sky: '#BFE3F7', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 6, 18], look: [0, 3.8, 0], fov: 54, to: { pos: [3.8, 6, 17.2], look: [0, 3.8, 0], fov: 52 } },
      update: (w, p, t) => { w.car.scale.set(1, 1, 1); w.roofC.scale.y = 1; w.bakery.position.set(2, 0, -1.5); w.bakery.rotation.y = -.3; pgAt(w, -3.2, 0, 1.2, -.2, 1.8); const pk = Math.max(0, Math.sin(t * 9)); w.pg.head.rotation.z = -pk * .9; w.pg.body.rotation.z = -pk * .15; const gone = Math.floor(p * 8); w.loaves.forEach((l, i) => l.visible = i >= gone); } },
    { say: 'And your secrets? Repeated to the whole city.', label: 'SQUAWK!', show: ['ground', 'pr', 'city', 'notes', 'moon'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .6 ? .08 : 0,
      cam: { pos: [0, 6, 24], look: [0, 5, 0], fov: 56, to: { pos: [0, 6, 23], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { w.loaves.forEach(l => l.visible = true); pgAt(w, 0, 0, 0, -1.2, 2.2); w.pg.head.rotation.z = .3; const on = t > .6; w.pr.updateWorldMatrix(true, true); const h = w.pg.head.getWorldPosition(new w.k.THREE.Vector3()); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * 1.2 + i / 5) % 1; n.position.copy(h); n.rotation.set(0, 0, 0); n.scale.setScalar(.6 + q * 5); n.material.opacity = 1 - q; n.visible = on; }); w.city.children.forEach((b, i) => b.userData.win.forEach((wn, r) => wn.visible = on && t > .8 + (i + r) * .1)); } },
    { say: 'Giant parrots: cute, cool, or way too chatty? Comment below.',
      quiz: { q: 'Giant parrots are…', options: ['Cute', 'Cool', 'Way too chatty'], answer: 'Made up. A real budgie named Puck knew 1,728 words, a world record.' },
      show: ['ground', 'pr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.2, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.2, 0] } },
      update: (w, p, t) => { pgAt(w, 0, 0, 0, -.9, 1.3); bob(w.pg, t); } },
  ],
};
