// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". The cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary bouncing next to the cat at night.

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
  w.floor = k.ground('#145A32', 0);
  w.wall = box(90, 40, .5, mat('#0B1D3A'), [0, 18, -14]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 40; i++) { const s = ball(.06 + (i % 3) * .03, mat('#FFF4C2', { glow: 1.2 }), [-12 + (i * 5.3) % 24, 3 + (i * 3.7) % 12, -13.6], w.stars); s.castShadow = false; }
  w.moon = ball(1.2, mat('#FDFEFE', { glow: 1 }), [5, 10, -13], k.scene);
  w.fence = group(); const wood = mat('#B9773E', { rough: .9 });
  for (let i = 0; i < 7; i++) box(.5, 3, .2, wood, [-3 + i * .7, 1.5, 0], w.fence);
  box(5, .25, .25, wood, [-.9, 2.2, .15], w.fence); box(5, .25, .25, wood, [-.9, .8, .15], w.fence);
  w.pebble = ball(.45, mat('#95A5A6', { rough: .9 }), [0, .3, 0], k.scene); w.pebble.scale.set(1.3, .7, 1);
  w.spoon = group(); const steel = mat('#D5DBDB', { rough: .25 });
  box(2.2, .08, .25, steel, [1.1, 0, 0], w.spoon); const bowl = ball(.4, steel, [0, 0, 0], w.spoon); bowl.scale.set(1.2, .35, .9);
  w.prop = box(.3, .3, .5, mat('#7F8C8D'), [0, .15, 0], k.scene);
  w.medal = group(); cyl(.3, .3, .06, mat('#F4D03F', { glow: .4 }), [0, 0, 0], w.medal, 20).rotation.x = Math.PI / 2; box(.12, .5, .02, mat('#C0392B'), [0, .4, 0], w.medal);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#0B1D3A', lightAt: [2, 8, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '523',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'JUMPING GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'HAD A JUMPING CONTEST.'],
  title: 'Gary the ant had a jumping contest with the cat',
  description: 'The cat jumped onto the fence. Gary jumped onto a pebble. Nearly. So Gary built a spoon catapult. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'jumping', 'funny', 'shorts'],
  sources: [
    'Quiz fact: trap-jaw ants (Odontomachus bauri) can strike their mandibles against the ground with enough force to launch themselves into the air, which they use to escape danger (Patek et al., "Multifunctionality and mechanical origins: ballistic jaw propulsion in trap-jaw ants", PNAS, 2006).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary had a jumping contest.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'fence'], ...env,
      cam: { pos: [1.2, 1.8, 7.5], look: [.6, 2.1, 0], fov: 50, to: { pos: [1.1, 1.8, 6.9], look: [.6, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pebble', 'spoon', 'prop', 'medal'); w.fence.position.set(0, 0, -3); ctAt(w, 1.3, 0, -1.6, -.4, .55); gy(w, -.1, Math.abs(Math.sin(t * 5)) * .4, 1.2, -1.2, t); },
    },
    {
      say: 'The cat jumped onto the fence.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'fence'], ...env,
      cam: { pos: [0, 2.6, 9], look: [0, 2.6, 0], fov: 52, to: { pos: [0, 2.6, 8.4], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'pebble', 'spoon', 'prop', 'medal'); w.fence.position.set(0, 0, -1.5); const q = Math.min(1, p * 2); ctAt(w, .6, 3 * Math.sin(q * Math.PI / 2) + (q < 1 ? Math.sin(q * Math.PI) * 1 : 0), -1.4, -.3, .55); gy(w, -1, 0, 1.4, -1.2, t); w.g.rotation.z = .3; },
    },
    {
      say: 'Gary jumped onto a pebble. Nearly.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'pebble'], ...env,
      cam: { pos: [.1, 1.4, 4.8], look: [.1, 1.2, 0], fov: 50, to: { pos: [.1, 1.4, 4.4], look: [.1, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'fence', 'spoon', 'prop', 'medal'); w.cr.visible = false; w.pebble.position.set(.6, .3, 0); const h = Math.max(0, Math.sin(t * 4)) * .5; gy(w, -.4, h, .2, 0, t, h > .05); if (p > .6) { w.g.rotation.z = Math.PI; w.g.position.y = 1.0; w.g.position.x = .1; } },
    },
    {
      say: 'So Gary built a spoon catapult.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'spoon', 'prop'], ...env,
      cam: { pos: [.6, 2.2, 6], look: [.4, 1.6, 0], fov: 50, to: { pos: [.6, 2.4, 6], look: [.4, 2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'fence', 'pebble', 'medal'); w.cr.visible = false; w.prop.position.set(.5, .15, 0); const fire = p > .5; w.spoon.position.set(-.6, .35, 0); w.spoon.rotation.set(0, 0, fire ? .35 : -.3); if (!fire) gy(w, -.65, .7, 0, 0, t); else { const f = (p - .5) * 2; gy(w, -.65 + f * 2, .7 + f * 2.5 - f * f * 1, 0, 0, t, true); w.g.rotation.z = f * 6; } },
    },
    {
      say: 'Gary landed on the cat\'s head. Winner.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'medal'], ...env,
      cam: { pos: [.6, 2.6, 7.5], look: [.6, 2.2, 0], fov: 50, to: { pos: [.6, 2.6, 6.9], look: [.6, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'fence', 'pebble', 'spoon', 'prop'); ctAt(w, 0, 0, -.6, -.3, .8); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.4); gy(w, .4, 3.2, -.6, -1.2, t); w.medal.position.set(1.5, 3 + Math.sin(t * 3) * .05, -.2); },
    },
    {
      say: 'Best jump for these two: a hop, a leap, or a bounce? Comment below.',
      quiz: { q: 'What is the best jump?', options: ['A hop', 'A leap', 'A bounce'], answer: 'Fun fact: trap-jaw ants can snap their jaws against the ground and launch themselves into the air.' },
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'fence'], sky: '#274B73', lightAt: [2, 8, 6], lightDist: 26,
      cam: { pos: [2.2, 2.4, 7.5], look: [.3, 1.4, 0], fov: 48, to: { pos: [-1, 2.4, 7.5], look: [.3, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'pebble', 'spoon', 'prop', 'medal'); w.fence.position.set(0, 0, -3); ctAt(w, 1.4, 0, -.8, -2.4, .8); gy(w, -.8, Math.abs(Math.sin(t * 5)) * .3, 1, -1.4, t, true); },
    },
  ],
};
