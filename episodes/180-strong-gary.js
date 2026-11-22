// Narrative 11: "What Would Happen If… (season 3, with Gary)". Gary-led (every third). Superpower premise like Gary superhero (846, best Gary video).
// Hook: the premise as a question under 2 s; first frame shows tiny Gary holding a red car over his head.

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
function car(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(4.4, 1.1, 2.2, mat('#E2453C', { rough: .3 }), [0, 1.0, 0], c.body);
  box(2.4, 1.0, 2.0, mat('#E2453C', { rough: .3 }), [-.3, 2.0, 0], c.body);
  box(2.2, .8, 2.05, mat('#9FD3EE', { rough: .1 }), [-.3, 2.0, 0], c.body);
  c.wheels = [];
  for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], c.body, 16); wh.rotation.x = Math.PI / 2; c.wheels.push(wh); }
  c.eyes = [-.6, .6].map(z => { const g = group([2.2, 1.25, z], c.body); ball(.33, mat('#FFFDE8', { glow: .6 }), [0, 0, 0], g); ball(.16, mat('#111111'), [.25, 0, 0], g); return g; });
  c.mouth = box(.1, .14, 1.0, mat('#3A3A3A'), [2.22, .75, 0], c.body);
  return c;
}
function house(k, parent, wall = '#F2D9B8', roofc = '#B3262E') {
  const { mat, box, cyl, ball, cone, group } = k;
  const h = { root: group([0, 0, 0], parent) };
  h.body = group([0, 2.2, 0], h.root);
  box(4, 3.4, 3.4, mat(wall), [0, 1.7, 0], h.body);
  const r = cone(3.2, 2.2, mat(roofc), [0, 4.5, 0], h.body, 4); r.rotation.y = Math.PI / 4;
  box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], h.body);
  h.eyes = [-1.1, 1.1].map(x => { const g = group([x, 2.4, 1.72], h.body); box(.9, .9, .08, mat('#FFFFFF'), [0, 0, 0], g); ball(.2, mat('#111111'), [0, 0, .08], g); return g; });
  h.legs = [-1, 1].map(x => { const l = group([x, 2.2, 0], h.root); cyl(.28, .28, 2.2, mat('#6B4B2E'), [0, -1.1, 0], l, 10); box(.8, .3, 1.1, mat('#3A2A1A'), [0, -2.2, .25], l); return l; });
  return h;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 8, mat('#555555', { rough: 1 }), [0, .02, 0], w.road);
  w.g = gary(k, k.scene, 2.2, '#FFC21F');
  w.cape = box(.6, .04, .5, mat('#D62828'), [-.55, .5, 0], w.g); w.cape.castShadow = false;
  w.c = car(k, k.scene); w.cr = w.c.root; w.cr.scale.setScalar(.42);
  w.h = house(k, k.scene); w.hs = w.h.root; w.h.legs.forEach(l => l.visible = false); w.h.eyes.forEach(e => e.visible = false); w.h.body.position.y = 0; w.hs.scale.setScalar(.6);
  w.gym = group(); box(30, .1, 14, mat('#3A3A44'), [0, .05, 0], w.gym); box(30, 10, .4, mat('#D9DDE3'), [0, 5, -6], w.gym);
  w.bar = group(); cyl(.08, .08, 6, mat('#BFC5CC', { rough: .2 }), [0, 0, 0], w.bar, 10).rotation.x = Math.PI / 2;
  for (const z of [-2.6, 2.6]) { const pl = cyl(.85, .85, .35, mat('#222222'), [0, 0, z], w.bar, 24); pl.rotation.x = Math.PI / 2; }
  w.jar = group(); const jg = cyl(.9, .9, 2, mat('#CFE9FF', { rough: .1 }), [0, 1, 0], w.jar, 24); jg.material.transparent = true; jg.material.opacity = .55;
  w.lid = cyl(.95, .95, .3, mat('#E2453C'), [0, 2.15, 0], w.jar, 24); ball(.5, mat('#F2A93B'), [0, .6, 0], w.jar);
  w.sweat = group(); for (let i = 0; i < 4; i++) { const d = ball(.08, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFD21F', { glow: 1 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const g = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); w.cape.rotation.z = .2 + .1 * Math.sin(t * 8); };
const sweat = (w, t, on = true) => { w.sweat.visible = on; if (!on) return; w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(); w.g.localToWorld(v.set(.4, .6, 0));
  w.sweat.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 4) % 1; d.position.set(v.x + (i - 1.5) * .25, v.y - q * .9, v.z + .2); }); };

export default {
  id: '180',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SUPER STRONG GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY WAS', 'SUPER STRONG?'],
  title: 'What would happen if Gary the ant was super strong?',
  description: 'He lifts cars. Moving day takes one trip. At the gym he lifts the heaviest bar. But a jar of honey? Still impossible. (Gary is made up. Real ants are very strong for their size.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'strong', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: ants can carry loads several times their own body weight (general entomology; cited from general knowledge, no specific multiple claimed).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary was super strong?',
      show: ['ground', 'road', 'g', 'cr'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [1.5, 1.7, 17], look: [-.2, 2.0, 1], fov: 34, to: { pos: [1.4, 1.7, 16.2], look: [-.2, 2.0, 1], fov: 33 } },
      update: (w, p, t) => { g(w, -.6, .05, 1, -.5, t); w.g.rotation.z = .04 * Math.sin(t * 6); w.cr.position.set(-.2, 1.6 + .06 * Math.sin(t * 6), 1); w.cr.rotation.set(0, .2, .05 * Math.sin(t * 3)); },
    },
    {
      say: 'Moving day? One trip. The whole house.',
      show: ['ground', 'road', 'g', 'hs'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [3, 3, 12], look: [0, 3.6, 0], fov: 50, to: { pos: [2.6, 3, 11], look: [.5, 3.6, 0], fov: 48 } },
      update: (w, p, t) => { g(w, -2 + t * .8, .05, 1.2, 0, t, true); w.hs.position.set(w.g.position.x + .6, 1.3, 1.2); w.hs.rotation.set(0, 0, .04 * Math.sin(t * 8)); },
    },
    {
      say: 'The gym? He lifts the biggest bar.',
      show: ['gym', 'g', 'bar'], sky: '#D9DDE3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [3, 2.4, 10], look: [0, 1.9, 0], fov: 50, to: { pos: [2.8, 2.4, 9.2], look: [0, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { g(w, 0, .1, 0, -.4, t); const y = 1.2 + Math.min(1, t * .9) * 1.6; w.bar.position.set(.5, y, 0); w.bar.rotation.set(0, -.4, .05 * Math.sin(t * 9)); },
    },
    {
      say: 'But a jar of honey? Still impossible.',
      show: ['ground', 'g', 'jar', 'sweat'], sky: '#F7E1A8', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [1.5, 2, 8.5], look: [0, .9, 0], fov: 48, to: { pos: [1.3, 2, 7.8], look: [0, .9, 0], fov: 46 } },
      shake: (t) => .02,
      update: (w, p, t) => { w.jar.position.set(1, 0, 0); g(w, -1.2, .05, .4, -.2, t); w.g.rotation.z = .1 * Math.sin(t * 14); w.lid.rotation.y = .05 * Math.sin(t * 14); sweat(w, t); },
    },
    {
      say: 'Super strong Gary: hero, menace, or show-off? Comment below.',
      quiz: { q: 'Should Gary be super strong?', options: ['Hero', 'Menace', 'Show-off'], answer: 'Real ants really can carry several times their own body weight.' },
      show: ['ground', 'road', 'g', 'cr'], sky: '#274B73', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [4, 2.2, 7], look: [0, 2.8, 0], fov: 44, to: { pos: [-4, 2.2, 7], look: [0, 2.8, 0] } },
      update: (w, p, t) => { w.sweat.visible = false; g(w, 0, .05, 0, -Math.PI / 2 + .9, t); w.cr.position.set(.2, 1.6, -.1); w.cr.rotation.set(0, .2, 0); },
    },
  ],
};
