// Narrative 23: "In This Town… (season 2: things that talk back)". Finale (Gary slot 424): everything in town talks at Gary's birthday.
// Hook: the rule under 2 s; first frame shows Gary surrounded by talking objects from the season (crumb, raindrop, ice cube, shoe, toy mouse).

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#F7D6E0'), [0, 8, -4], w.wall); for (let i = 0; i < 9; i++) { const f = cone(.3, .5, mat(['#E2453C', '#F2C94C', '#3B6FD6'][i % 3]), [-4 + i, 5.2, -3.8], w.wall, 3); f.rotation.x = Math.PI; }
  w.objs = []; w.og = group(); w.og.scale.setScalar(1.25);
  const mk = (build, fy, fs) => { const g = group([0, 0, 0], w.og); build(g); g.f = face(k, g, [0, fy, 0], fs); w.objs.push(g); return g; };
  mk(g => { const c = ball(.5, mat('#D4A050', { rough: .95 }), [0, .4, 0], g); c.scale.set(1.2, .8, 1); }, .45, .3).f.position.z = .5;
  mk(g => { const d = ball(.5, mat('#8FD3F2'), [0, .55, 0], g); d.material.transparent = true; d.material.opacity = .85; }, .58, .3).f.position.z = .48;
  mk(g => { const b = box(.8, .8, .8, mat('#DDF4FF'), [0, .4, 0], g); b.material.transparent = true; b.material.opacity = .85; }, .42, .3).f.position.z = .42;
  mk(g => { box(1.4, .2, .7, mat('#FFFFFF'), [0, .1, 0], g); const u = ball(.45, mat('#E2453C'), [-.15, .4, 0], g); u.scale.set(1.6, .8, .75); }, .35, .25).f.position.set(.55, .32, .36);
  mk(g => { const m = ball(.4, mat('#9A9AA6'), [0, .3, 0], g); m.scale.set(1.5, .8, .9); for (const z of [-1, 1]) ball(.14, mat('#F49AAE'), [.35, .6, z * .2], g); }, .35, .22).f.position.set(.25, .35, .34);
  w.cake = group(); cyl(1, 1, .7, mat('#F7C6D4'), [0, .35, 0], w.cake, 24); cyl(1.02, 1.02, .15, mat('#FFFFFF'), [0, .72, 0], w.cake, 24); cyl(.05, .05, .4, mat('#3B6FD6'), [0, 1, 0], w.cake, 6); w.flame = cone(.07, .18, mat('#FFB020', { glow: 1 }), [0, 1.3, 0], w.cake, 8);
  w.cf = face(k, w.cake, [0, .35, 1.02], .5);
  w.g = gary(k, k.scene, 1.3, null);
  w.hat = k.cone(.12, .35, mat('#3FA34D'), [.36, .68, 0], w.g, 10);
  w.notes = group(); for (let i = 0; i < 6; i++) { const n = ball(.08, mat('#FFE38A', { glow: .8 }), [0, 0, 0], w.notes); n.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ring = (w, r = 1.6) => w.objs.forEach((o, i) => { const a = Math.PI * (.15 + i * .175); o.position.set(Math.cos(a) * r * 1.3, 0, -Math.sin(a) * r * .6 - .2); o.rotation.y = -Math.cos(a) * .4; o.visible = true; });
const sing = (w, t, on) => w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .8 + i / 6) % 1; n.position.set(-2 + i * .8 + Math.sin(t * 3 + i) * .2, 1 + q * 1.8, -.4); n.visible = on; });

export default {
  id: '424',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'EVERYTHING TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'EVERYTHING TALKS'],
  title: 'In this town, everything talks (Gary the ant finale)',
  description: 'It is Gary\'s birthday. Everything sings. Gary asks for quiet. Then the cake talks. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'ant', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: a talking birthday party is made up. Quiz fact: a 2022 study estimated there are about 20 quadrillion ants on Earth (Schultheiss et al., "The abundance, biomass, and distribution of ants on Earth", PNAS, 2022).'],
  setup,
  scenes: [
    { say: 'In this town, everything talks.', show: ['ground', 'wall', 'og'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 6], look: [0, .85, 0], fov: 52, to: { pos: [0, 1.5, 5.5], look: [0, .85, 0], fov: 50 } },
      update: (w, p, t) => { w.cake.visible = false; w.notes.visible = false; w.hat.visible = false; ring(w); w.objs.forEach((o, i) => { talk(o.f, t + i * .6); brow(o.f, -.2); }); gy(w, -.9, 0, .9, -.5, t); w.g.rotation.y = -.5 + .25 * Math.sin(t * 3); } },
    { say: 'Gary\'s birthday? They all sing.', label: 'HAPPY BIRTHDAY', show: ['ground', 'wall', 'og', 'notes'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 6], look: [0, .85, 0], fov: 52, to: { pos: [0, 1.5, 5.5], look: [0, .85, 0], fov: 50 } },
      update: (w, p, t) => { w.hat.visible = true; ring(w); w.objs.forEach((o, i) => { talk(o.f, t + i * .2); brow(o.f, -.4); o.position.y = .1 * Math.abs(Math.sin(t * 5 + i)); }); sing(w, t, true); gy(w, -.9, 0, .9, -.5, t); } },
    { say: 'Too loud? Gary asks for quiet.', label: 'SHHH', show: ['ground', 'wall', 'og'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 6], look: [0, .85, 0], fov: 52, to: { pos: [0, 1.5, 5.5], look: [0, .85, 0], fov: 50 } },
      update: (w, p, t) => { w.notes.visible = false; ring(w); const quiet = p > .4; w.objs.forEach((o, i) => { talk(o.f, t + i, !quiet); if (quiet) o.f.mouth.scale.set(.5, .6, 1); brow(o.f, quiet ? .2 : -.4); o.position.y = 0; }); gy(w, -.9, quiet ? .15 : 0, .9, -.5, t); w.g.rotation.z = quiet ? .2 : 0; } },
    { say: 'Then the cake talks.', label: 'EAT ME?', show: ['ground', 'wall', 'og', 'cake'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 5.6], look: [0, .85, 0], fov: 52, to: { pos: [0, 1.5, 5.2], look: [0, .85, 0], fov: 50 } },
      update: (w, p, t) => { w.g.rotation.z = 0; ring(w, 1.9); w.objs.forEach(o => { talk(o.f, 0, false); o.f.mouth.scale.set(1.2, 2.4, 1); brow(o.f, .3); }); w.cake.position.set(.6, 0, .3); w.cake.scale.setScalar(.8); talk(w.cf, t, p > .3); brow(w.cf, -.3); w.flame.scale.set(1, .8 + .3 * Math.sin(t * 20), 1); gy(w, -1.3, 0, 1.2, -.2, t); } },
    { say: 'Is Gary a good party host? Comment below.',
      quiz: { q: 'Is Gary a good party host?', options: ['Yes', 'No', 'Too many guests'], answer: 'Made up. Fun fact: scientists estimate there are about 20 quadrillion ants on Earth.' },
      show: ['ground', 'og', 'cake'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.4, 2.2, 6.5], look: [0, 1, 0], fov: 52, to: { pos: [-1.4, 2.2, 6.5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; ring(w, 1.9); w.objs.forEach((o, i) => { talk(o.f, t + i, Math.sin(t * 2 + i) > 0); brow(o.f, .1); }); w.cake.position.set(.6, 0, .3); talk(w.cf, t, false); gy(w, -1.3, 0, 1.2, -.2, t); } },
  ],
};
