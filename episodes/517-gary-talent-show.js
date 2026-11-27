// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a small stage, the cat watching.

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

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#5B2C6F', 0);
  w.wall = group(); box(60, 30, .5, mat('#4A235A'), [0, 15, -6], w.wall); for (const x of [-4.5, 4.5]) box(2, 12, .3, mat('#C0392B', { rough: .9 }), [x, 6, -5.6], w.wall);
  w.stage = group(); cyl(2.6, 2.6, .5, mat('#A0522D'), [0, .25, 0], w.stage, 32);
  w.spot = cyl(1.2, 1.2, .01, mat('#FFF9C4', { glow: .9 }), [0, .52, 0], w.stage, 24);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.crumb = group(); const cb = box(.7, .45, .55, mat('#D4A056', { rough: 1 }), [0, 0, 0], w.crumb); cb.rotation.set(.2, .4, .1);
  w.trophy = group(); const gold = mat('#F4D03F', { metal: .7, rough: .25, glow: .2 }); cyl(.2, .3, .25, gold, [0, .12, 0], w.trophy, 12); cyl(.06, .06, .4, gold, [0, .45, 0], w.trophy, 8); cyl(.4, .15, .5, gold, [0, .9, 0], w.trophy, 16);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#4A235A', lightAt: [0, 7, 4], lightDist: 20 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '517',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SHOWTIME GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'HELD A TALENT SHOW.'],
  title: 'Gary the ant held a talent show for the cat',
  description: 'Gary\'s talent? Lifting a crumb. The cat\'s talent? Sleeping. And the winner? The cat, fast asleep. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'talent', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the claw-sheathing mechanism that lets claws retract when not in use is present in all species of the cat family except the cheetah (Encyclopaedia Britannica, "cat").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary held a talent show.',
      show: ['floor', 'wall', 'stage', 'g'], ...env,
      cam: { pos: [1.6, 2, 7.5], look: [.4, 1.3, 0], fov: 48, to: { pos: [1.5, 2, 6.9], look: [.4, 1.3, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'crumb', 'trophy'); w.spot.visible = true; ctAt(w, 2.4, 0, -2.4, -2.2, .7); gy(w, -.2, .5, .4, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Gary\'s talent? Lifting a crumb.',
      show: ['floor', 'wall', 'stage', 'g', 'crumb'], ...env,
      cam: { pos: [.4, 1.7, 5], look: [0, 1.2, 0], fov: 46, to: { pos: [.4, 1.7, 4.6], look: [0, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'trophy'); w.cr.visible = false; const lift = Math.abs(Math.sin(t * 3)); gy(w, 0, .5, .3, -1.4, t); w.g.rotation.z = 0; w.crumb.position.set(.2, 1.35 + lift * .35, .3); },
    },
    {
      say: 'The cat\'s talent? Sleeping.',
      show: ['floor', 'wall', 'stage'], ...env,
      cam: { pos: [.2, 2.6, 8.5], look: [0, 1.3, 0], fov: 48, to: { pos: [.2, 2.6, 8], look: [0, 1.3, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'crumb', 'trophy'); w.g.visible = false; ctAt(w, .6, .5, -.2, -.2, .75); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); },
    },
    {
      say: 'And the winner? The cat. Fast asleep.',
      show: ['floor', 'wall', 'stage', 'g', 'trophy'], ...env,
      cam: { pos: [0, 2.6, 8.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2.6, 7.9], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.crumb.visible = false; ctAt(w, .6, .5, -.2, -.2, .75); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); w.trophy.visible = p > .4; w.trophy.position.set(.2, 1.35, .5); gy(w, -1.1, .5, 1.3, -1.2, t); w.g.rotation.z = p > .5 ? -.25 : 0; },
    },
    {
      say: 'Best talent for Gary: lifting, juggling, or dancing? Comment below.',
      quiz: { q: 'What is the best talent for Gary?', options: ['Lifting', 'Juggling', 'Dancing'], answer: 'Fun fact: every member of the cat family can pull its claws in, except the cheetah.' },
      show: ['floor', 'wall', 'stage', 'g', 'trophy'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [2.2, 2.6, 8], look: [.2, 1.4, 0], fov: 48, to: { pos: [-1.2, 2.6, 8], look: [.2, 1.4, 0] } },
      update: (w, p, t) => { w.crumb.visible = false; ctAt(w, .6, .5, -.2, -.2, .75); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); w.trophy.position.set(.2, 1.35, .5); gy(w, -1.1, .5, 1.3, -1.2 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
