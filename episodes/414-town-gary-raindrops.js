// Narrative 23: "In This Town… (season 2: things that talk back)". Gary slot: raindrops and puddles talk to Gary.
// Hook: the rule under 2 s; first frame shows a raindrop with a face hovering over Gary.

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
  w.ground = k.ground('#6FA34A', 0);
  w.grass = group(); for (let i = 0; i < 14; i++) { const b = box(.08, .6 + (i % 3) * .3, .02, mat('#4F8F3A'), [-3.5 + i * .55, .35, -1.2 - (i % 2) * .4], w.grass); b.rotation.z = (i % 2 ? .2 : -.2); }
  w.drop = group(); const d = ball(.7, mat('#8FD3F2', { glow: .15 }), [0, 0, 0], w.drop); d.material.transparent = true; d.material.opacity = .85; w.df = face(k, w.drop, [0, .05, .66], .45);
  w.rain = group(); for (let i = 0; i < 12; i++) { const r = ball(.12, mat('#8FD3F2'), [0, 0, 0], w.rain); r.userData.i = i; }
  w.puddle = group(); const pd = cyl(2.2, 2.2, .04, mat('#5FB0E0'), [0, .03, 0], w.puddle, 28); pd.scale.z = .6; w.pf = face(k, w.puddle, [.9, .06, .2], .55); w.pf.rotation.x = -Math.PI / 2;
  w.boat = group(); const lf = ball(.6, mat('#4FAF4A'), [0, .08, 0], w.boat); lf.scale.set(1.5, .15, .7);
  w.g = gary(k, k.scene, 1.3, null);
  w.sun = ball(1, mat('#FFD23F', { glow: .9 }), [3, 6.5, -4]);
  w.ups = group(); for (let i = 0; i < 5; i++) { const u = group([0, 0, 0], w.ups); ball(.28, mat('#8FD3F2'), [0, 0, 0], u); for (const x of [-.09, .09]) ball(.05, mat('#111111'), [x, .05, .26], u); const arm = cyl(.02, .02, .3, mat('#5FB0E0'), [.25, .15, 0], u, 6); arm.rotation.z = -.6; u.userData.i = i; u.userData.arm = arm; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.set(s, s, s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const drizzle = (w, t, on) => w.rain.children.forEach(r => { const i = r.userData.i, q = (t * 1.3 + i / 12) % 1; r.position.set(-3 + (i * 37 % 12) / 2, 6 - q * 6, -1 + (i * 13 % 5) * .4); r.visible = on; });

export default {
  id: '414',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE RAINDROPS TALK',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'RAINDROPS TALK'],
  title: 'In this town, raindrops can talk (Gary the ant)',
  description: 'Rain? Every drop says sorry. A puddle? It thinks it is a lake. Sunshine? They all wave goodbye. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'ant', 'rain', 'shorts'],
  sources: ['Comedy sketch: talking raindrops are made up. Quiz fact: raindrops can weigh more than 50 times as much as a mosquito, yet mosquitoes survive being hit because of their low mass and strong exoskeleton (Dickerson et al., "Mosquitoes survive raindrop collisions by virtue of their low mass", PNAS, 2012).'],
  setup,
  scenes: [
    { say: 'In this town, raindrops talk.', show: ['ground', 'grass', 'drop', 'rain'], sky: '#9AAAB8', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [.5, 1.9, 7], look: [.4, 1.05, 0], fov: 50, to: { pos: [.5, 1.9, 6.5], look: [.4, 1.05, 0], fov: 48 } },
      update: (w, p, t) => { w.puddle.visible = false; w.boat.visible = false; w.sun.visible = false; w.ups.visible = false; drizzle(w, t, true); gy(w, -.35, 0, .4, -.2, t); w.drop.position.set(1.05, 1 + .1 * Math.sin(t * 3), .4); talk(w.df, t); brow(w.df, .3); } },
    { say: 'Rain? Every drop says sorry.', label: 'SPLASH', show: ['ground', 'grass', 'drop', 'rain'], sky: '#9AAAB8', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [.3, 2, 6], look: [.1, 1.3, 0], fov: 50, to: { pos: [.3, 2, 5.5], look: [.1, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { drizzle(w, t, true); const q = Math.min(1, p * 2); const hit = q >= 1; w.drop.position.set(.1, hit ? .9 : 3 - q * 2.1, .4); talk(w.df, t, p > .35); brow(w.df, .5); const sq = hit ? Math.max(.35, 1 - (p - .5) * 3) : 1; gy(w, .1, 0, .4, -.2, t); w.g.scale.set(1.3 * (2 - sq), 1.3 * sq, 1.3); if (p > .8) w.g.scale.set(1.3, 1.3, 1.3); } },
    { say: 'A puddle? It thinks it\'s a lake.', label: 'LAKE', show: ['ground', 'grass', 'puddle', 'boat'], sky: '#9AAAB8', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [.3, 4.6, 5.4], look: [.2, .1, -.3], fov: 50, to: { pos: [.3, 4.4, 5], look: [.2, .1, -.3], fov: 48 } },
      update: (w, p, t) => { w.drop.visible = false; w.rain.visible = false; w.puddle.position.set(0, 0, 0); talk(w.pf, t); brow(w.pf, -.3); w.boat.position.set(-1.2 + p * .8, .05 + .04 * Math.sin(t * 3), -.4); w.boat.rotation.z = .06 * Math.sin(t * 3); gy(w, -1.2 + p * .8, .12, -.4, 0, t, false, 1); } },
    { say: 'Sunshine? They all wave goodbye.', label: 'BYE!', show: ['ground', 'grass', 'sun', 'ups'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.3, 2.6, 7], look: [.2, 2, 0], fov: 52, to: { pos: [.3, 2.6, 6.5], look: [.2, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.puddle.visible = false; w.boat.visible = false; gy(w, 0, 0, .8, 0, t); w.g.rotation.y = -.3; w.ups.children.forEach(u => { const i = u.userData.i; u.position.set(-2 + i, .5 + p * 3 + (i % 2) * .4, -.5); u.userData.arm.rotation.z = -.6 + .5 * Math.sin(t * 10 + i); u.scale.setScalar(1 - p * .4); }); } },
    { say: 'Is Gary a good sailor? Comment below.',
      quiz: { q: 'Is Gary a good sailor?', options: ['Yes', 'No', 'Too tiny to tell'], answer: 'Made up. But real mosquitoes survive being hit by raindrops.' },
      show: ['ground', 'puddle', 'boat'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1, 4.4, 6], look: [0, .4, 0], fov: 50, to: { pos: [-1, 4.4, 6], look: [0, .4, 0] } },
      update: (w, p, t) => { w.ups.visible = false; w.sun.visible = false; w.grass.visible = false; w.puddle.visible = true; w.puddle.position.set(0, 0, 0); talk(w.pf, t, Math.sin(t * 2) > 0); brow(w.pf, .2); w.boat.visible = true; w.boat.position.set(-.9, .05 + .04 * Math.sin(t * 3), -.4); gy(w, -.9, .12, -.4, -.2, t, false, 1); } },
  ],
};
