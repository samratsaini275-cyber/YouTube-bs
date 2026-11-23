// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#5F9E4A', 0);
  w.hill = group(); const h = cone(9, 7, mat('#B4824E', { rough: 1 }), [0, 3.5, -8], w.hill, 32);
  w.banner = group([0, 5.4, -1]); box(10, 1.2, .1, mat('#FFFFFF'), [0, 0, 0], w.banner); for (let i = 0; i < 9; i++) { const f = cone(.35, .6, mat(['#E2453C', '#FFC21F', '#3B82F6'][i % 3]), [-4 + i, -.9, 0], w.banner, 3); f.rotation.z = Math.PI; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.cake = group(); cyl(.9, .9, .6, mat('#F7C6D9'), [0, .3, 0], w.cake, 24); ball(.12, mat('#FFC21F', { glow: 1 }), [0, .8, 0], w.cake); cyl(.03, .03, .3, mat('#3B82F6'), [0, .7, 0], w.cake, 6);
  w.crumb = box(.4, .3, .3, mat('#D9A35B'), [0, 0, 0]);
  w.bear = group(); box(5, 4, 3, mat('#5A3A22'), [0, 2.4, 0], w.bear); box(2.6, 2.2, 2.2, mat('#5A3A22'), [3.2, 4.2, 0], w.bear); for (const z of [-.8, .8]) ball(.5, mat('#5A3A22'), [3, 5.5, z], w.bear); box(.8, .6, .8, mat('#C8935A'), [4.6, 3.9, 0], w.bear); for (const z of [-.5, .5]) box(.05, .3, .2, mat('#111111'), [4.32, 4.6, z], w.bear);
  const hat = cone(.7, 1.6, mat('#3B82F6'), [3, 6.2, 0], w.bear, 16);
  w.gull = group(); box(1.4, .6, .6, mat('#FFFFFF'), [0, 0, 0], w.gull); box(.4, .2, .2, mat('#FFC21F'), [.85, 0, 0], w.gull); for (const z of [-1, 1]) { const wg = box(.6, .08, 1.6, mat('#DDDDDD'), [0, .1, z * .9], w.gull); wg.userData.z = z; } ball(.12, mat('#111111'), [.55, .15, .25], w.gull);
  w.confetti = group(); for (let i = 0; i < 30; i++) { const c = box(.18, .02, .1, mat(['#E2453C', '#FFC21F', '#3B82F6', '#22C55E', '#FF5FB8'][i % 5]), [0, 0, 0], w.confetti); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const PARTY = ['grass', 'hill', 'banner'];
const flap = (w, t) => w.gull.children.forEach(c => { if (c.userData.z) c.rotation.x = c.userData.z * .5 * Math.sin(t * 10); });
const conf = (w, t, cx = 0, cy = 6) => w.confetti.children.forEach(c => { const i = c.userData.i, q = (t * .35 + i / 30) % 1; c.position.set(cx + Math.sin(i * 2.3) * 4, cy - q * 6, Math.cos(i * 1.7) * 2); c.rotation.set(i + t * 3, i, t * 2); });

export default {
  id: '244',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PARTY GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'THREW A PARTY.'],
  title: 'Gary the ant threw a party (season finale)',
  description: 'Season finale. Gary invites every friend he made this season. The bear brings cake. The seagull brings an appetite. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'party', 'finale', 'funny', 'animation', 'shorts'],
  sources: ['Quiz fact: some ant colonies contain millions of workers; supercolonies of Argentine ants stretch for thousands of kilometres (Giraud et al., PNAS, 2002).'],
  setup,
  scenes: [
    { say: 'Gary threw a party.', show: [...PARTY, 'g'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, 1, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'He invited every friend he made this season.', label: '*GUEST LIST*', show: [...PARTY, 'g', 'bear', 'gull'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [3, 2.4, 15], look: [0, 1.2, 0], fov: 52, to: { pos: [2.6, 2.4, 14], look: [0, 1.2, 0], fov: 50 } },
      update: (w, p, t) => { flap(w, t); w.bear.position.set(-7 + p * 2, 0, -1); w.bear.rotation.y = 0; w.gull.position.set(5 - p * 2, 4 + .3 * Math.sin(t * 3), 0); w.gull.rotation.set(0, Math.PI, 0); gy(w, 0, 0, 3, -1.4, t); } },
    { say: 'The bear brought cake.', show: [...PARTY, 'g', 'bear', 'cake'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [2, 1.9, 9], look: [-1, .95, 0], fov: 50, to: { pos: [1.8, 1.9, 8.4], look: [-1, .95, 0], fov: 48 } },
      update: (w, p, t) => { w.bear.position.set(-6, 0, -1.5); w.cake.position.set(-1.6, 0, .6); gy(w, .4, 0, 1, -1.8, t); } },
    { say: 'The seagull ate it. In one bite.', show: [...PARTY, 'g', 'bear', 'cake', 'gull'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [2, 1.9, 9], look: [-1, .95, 0], fov: 50, to: { pos: [1.8, 1.9, 8.4], look: [-1, .95, 0], fov: 48 } },
      update: (w, p, t) => { flap(w, t); w.bear.position.set(-6, 0, -1.5); const q = Math.min(1, p * 1.6); w.gull.position.set(4 - q * 5.6, 3 - q * 2.2 + Math.max(0, p - .65) * 8, .6); w.gull.rotation.set(0, Math.PI, 0); w.cake.visible = p < .6; w.cake.position.set(-1.6, 0, .6); gy(w, .4, 0, 1, -1.8, t); w.g.rotation.z = p > .6 ? .4 * Math.sin(t * 10) : 0; } },
    { say: 'So Gary shared his crumb. With everyone.', show: [...PARTY, 'g', 'bear', 'gull', 'crumb', 'confetti'], sky: '#F7B98A', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [3, 2.6, 12], look: [-1, 1.3, 0], fov: 52, to: { pos: [2.6, 2.6, 11], look: [-1, 1.3, 0], fov: 50 } },
      update: (w, p, t) => { flap(w, t * .5); conf(w, t, -1); w.bear.position.set(-6, 0, -1.5); w.gull.position.set(2, .3, -.4); w.gull.rotation.set(0, Math.PI, 0); w.crumb.position.set(-.4, .15, .8); gy(w, .4, 0, 1, -1.8, t); } },
    { say: 'Best party ever. See you next season.', label: '*SEASON FINALE*', show: [...PARTY, 'g', 'bear', 'gull', 'confetti'], sky: '#F7B98A', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [2, 1.7, 7], look: [0, .9, 0], fov: 50, to: { pos: [1.6, 1.7, 6], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { flap(w, t * .5); conf(w, t, 0, 5); w.bear.position.set(-6, 0, -1.5); w.gull.position.set(2.4, .3, -.6); w.gull.rotation.set(0, Math.PI, 0); gy(w, 0, .3 * Math.abs(Math.sin(t * 5)), .4, -1.4, t); } },
    { say: 'How many ants can live in one colony: a hundred, a thousand, or millions? Comment below.',
      quiz: { q: 'How many ants can live in one colony?', options: ['A hundred', 'A thousand', 'Millions'], answer: 'Answer: millions. Some supercolonies stretch for thousands of kilometres.' },
      show: [...PARTY, 'g', 'bear', 'gull', 'confetti'], sky: '#F7B98A', lightAt: [0, 6, 3], lightDist: 26,
      cam: { pos: [3, 2.4, 11], look: [-1, 1.8, 0], fov: 52, to: { pos: [-3, 2.4, 11], look: [-1, 1.8, 0] } },
      update: (w, p, t) => { flap(w, t * .5); conf(w, t, -1); w.bear.position.set(-6, 0, -1.5); w.gull.position.set(2, .3, -.4); w.gull.rotation.set(0, Math.PI, 0); gy(w, -.4, 0, 1.6, -1.4, t); w.g.position.y = .3 * Math.abs(Math.sin(t * 5)); } },
  ],
};
