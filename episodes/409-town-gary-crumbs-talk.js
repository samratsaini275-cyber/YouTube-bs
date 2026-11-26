// Narrative 23: "In This Town… (season 2: things that talk back)". Gary slot (409/414/419/424): Gary's food talks back.
// Hook: the rule under 2 s; first frame shows Gary facing a crumb with a face.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

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
  w.ground = k.ground('#E9DCC4', 0);
  w.cloth = group(); for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) box(1.2, .02, 1.2, mat('#E2453C'), [-3 + i * 1.2, .01, -2 + j * 1.2], w.cloth);
  w.crumb = group(); const cb = ball(.6, mat('#D4A050', { rough: .95 }), [0, .45, 0], w.crumb); cb.scale.set(1.2, .8, 1);
  w.cf = face(k, w.crumb, [0, .55, .58], .45);
  w.big = group(); const bb = ball(1.3, mat('#C98B3E', { rough: .95 }), [0, 1, 0], w.big); bb.scale.set(1.3, .8, 1.1);
  w.bigf = face(k, w.big, [0, 1.1, 1.38], .8);
  w.legs = []; for (const x of [-.6, .6]) { const l = group([x, .35, 0], w.big); cyl(.07, .07, .7, mat('#8B5A2B'), [0, -.35, 0], l, 6); w.legs.push(l); }
  w.leaf = group(); const lf = ball(.9, mat('#4FAF4A'), [0, .1, 0], w.leaf); lf.scale.set(1.4, .12, .8); cyl(.04, .04, .8, mat('#3E8F3A'), [-1.3, .1, 0], w.leaf, 6).rotation.z = Math.PI / 2;
  w.g = gary(k, k.scene, 1.3, null);
  w.nap = group([.36, .54, 0], w.g); const nk = cyl(.2, .2, .03, mat('#FFFFFF'), [0, -.15, .18], w.nap, 12); nk.rotation.x = Math.PI / 2 - .3;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '409',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY\'S FOOD TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CRUMBS TALK'],
  title: 'In this town, crumbs can talk (Gary the ant)',
  description: 'Gary wants lunch. The crumb begs for mercy. A big crumb runs away. So Gary has a leaf salad. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'ant', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking crumbs are made up. Quiz fact: ants occur worldwide but are most numerous, both in numbers and in species, in tropical and subtropical regions (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'In this town, crumbs talk.', show: ['ground', 'cloth', 'crumb'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 1.9, 6.4], look: [.1, .78, 0], fov: 50, to: { pos: [.3, 1.9, 5.9], look: [.1, .78, 0], fov: 48 } },
      update: (w, p, t) => { w.big.visible = false; w.leaf.visible = false; w.nap.visible = false; w.crumb.position.set(.9, 0, 0); talk(w.cf, t); brow(w.cf, .4); gy(w, -.8, 0, .2, 0, t); w.g.rotation.y = .1; } },
    { say: 'Lunch time? It begs for mercy.', label: 'PLEASE!', show: ['ground', 'cloth', 'crumb'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 1.8, 5.2], look: [.1, .5, 0], fov: 50, to: { pos: [.3, 1.8, 4.8], look: [.1, .5, 0], fov: 48 } },
      update: (w, p, t) => { w.nap.visible = false; w.crumb.position.set(.8, 0, 0); w.crumb.rotation.z = .08 * Math.sin(t * 12); talk(w.cf, t); brow(w.cf, .55); gy(w, -.7 + p * .4, 0, .2, 0, t, p < .8); } },
    { say: 'A big crumb? It runs away.', label: 'BYE!', show: ['ground', 'cloth', 'big'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.6, 2.6, 8], look: [.6, .8, 0], fov: 52, to: { pos: [.6, 2.6, 7.6], look: [.6, .8, 0], fov: 50 } },
      update: (w, p, t) => { w.crumb.visible = false; w.nap.visible = false; const q = Math.min(1, p * 1.3); w.big.position.set(.4 + q * 1.8, .1 + .1 * Math.abs(Math.sin(t * 12)), -.6); w.legs.forEach((l, i) => l.rotation.z = .6 * Math.sin(t * 12 + i * Math.PI)); talk(w.bigf, t); brow(w.bigf, .5); gy(w, -1.6 + q * 1.5, 0, .6, 0, t, true); } },
    { say: 'So Gary? Salad for lunch.', label: 'CRUNCH', show: ['ground', 'cloth', 'leaf'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 1.9, 5.6], look: [.1, .5, 0], fov: 50, to: { pos: [.3, 1.9, 5.2], look: [.1, .5, 0], fov: 48 } },
      update: (w, p, t) => { w.big.visible = false; w.nap.visible = false; w.leaf.position.set(.9, 0, 0); w.leaf.scale.set(1 - p * .4, 1, 1); gy(w, -.8, 0, .1, 0, t); w.g.rotation.z = .08 * Math.sin(t * 10); } },
    { say: 'Is Gary a good listener? Comment below.',
      quiz: { q: 'Is Gary a good listener?', options: ['Yes', 'No', 'Too hungry to care'], answer: 'Made up. Real ants live almost everywhere, but most live in warm, tropical places.' },
      show: ['ground', 'cloth', 'crumb'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 1.8, 5], look: [0, 1, 0], fov: 50, to: { pos: [-1.2, 1.8, 5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.leaf.visible = false; w.nap.visible = false; w.crumb.position.set(.9, 0, 0); talk(w.cf, t, Math.sin(t * 2) > 0); brow(w.cf, .3); gy(w, -.8, 0, .2, 0, t); } },
  ],
};
