// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat at a start line.

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
  w.floor = k.ground('#58D68D', 0);
  w.wall = group(); box(80, 30, .5, mat('#AED6F1'), [0, 15, -10], w.wall);
  w.track = group(); box(40, .02, 4, mat('#E59866'), [8, .01, 0], w.track); for (const z of [-1.2, 1.2]) box(40, .03, .08, mat('#FFFFFF'), [8, .015, z], w.track);
  w.start = box(.25, .04, 4, mat('#FFFFFF'), [-1, .02, 0], k.scene);
  w.finish = group(); for (let i = 0; i < 8; i++) box(.5, .05, .5, mat(i % 2 ? '#111111' : '#FFFFFF'), [14, .025, -1.75 + i * .5], w.finish); for (const z of [-2.2, 2.2]) cyl(.08, .08, 3, mat('#ECF0F1'), [14, 1.5, z], w.finish, 8); box(.1, .5, 4.4, mat('#E74C3C'), [14, 3, 0], w.finish);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.dust = group(); for (let i = 0; i < 6; i++) { const d = ball(.25, mat('#D5D8DC'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 18); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#AED6F1', lightAt: [4, 10, 6], lightDist: 34 };

export default {
  id: '506',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'RACER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'RACED THE CAT.'],
  title: 'Gary the ant raced the cat',
  description: 'On your marks? The cat fell asleep. Gary got a head start of one whole day. And the cat? It napped right on the finish line. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'race', 'funny', 'shorts'],
  sources: [
    'Quiz fact: cheetahs have been measured sprinting at up to 114 km (71 miles) per hour, but their chases are usually limited to sprints of less than 200 to 300 metres because running builds up heat faster than they can shed it (Encyclopaedia Britannica, "cheetah").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary raced the cat.',
      show: ['floor', 'wall', 'track', 'start', 'g'], ...env,
      cam: { pos: [-3.6, 1.8, 6], look: [-.8, 1, 0], fov: 48, to: { pos: [-3.4, 1.8, 5.4], look: [-.8, 1, 0], fov: 46 } },
      update: (w, p, t) => { w.finish.visible = false; w.dust.visible = false; ctAt(w, -2.2, 0, -.8, 0, .65); gy(w, -1.4, 0, .9, 0, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'On your marks? The cat fell asleep.',
      show: ['floor', 'wall', 'track', 'start', 'g'], ...env,
      cam: { pos: [1.5, 2.2, 5], look: [-1.6, 1.4, 0], fov: 48, to: { pos: [1.3, 2.2, 4.6], look: [-1.6, 1.4, 0], fov: 46 } },
      update: (w, p, t) => { w.finish.visible = false; w.dust.visible = false; ctAt(w, -2.6, 0, -.6, .5, .7); w.c.head.rotation.z = .3 * Math.sin(Math.min(1, p * 2) * Math.PI); w.c.eyes.forEach(e => e.scale.y = p > .3 && p < .8 ? .1 : 1); gy(w, -1.4, 0, .9, 0, t); w.g.rotation.z = .3; },
    },
    {
      say: 'Gary\'s head start? One whole day.',
      show: ['floor', 'wall', 'track', 'g', 'finish'], ...env, sky: '#F5B041',
      cam: { pos: [5, 2.2, 7], look: [5.4, 1, 0], fov: 50, to: { pos: [6.6, 2.2, 7], look: [7, 1, 0], fov: 50 } },
      update: (w, p, t) => { w.dust.visible = false; w.cr.visible = false; gy(w, 5 + p * 2, 0, .3, 0, t, true); w.g.rotation.z = 0; },
    },
    {
      say: 'The cat? It napped on the finish line.',
      show: ['floor', 'wall', 'track', 'g', 'finish', 'dust'], ...env,
      cam: { pos: [12, 2.8, 8], look: [13.4, 1.2, 0], fov: 50, to: { pos: [12.4, 2.8, 7.4], look: [13.4, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { const zoom = Math.min(1, p * 4); ctAt(w, 6 + zoom * 8.2, 0, -.2, 0, .8); if (zoom >= 1) { w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); } w.dust.visible = zoom < 1; w.dust.children.forEach(d => { const i = d.userData.i; d.position.set(6 + zoom * 8 - 2 - i * .5, .3 + (i % 2) * .3, -.2 + (i % 3 - 1) * .3); }); gy(w, 11.6 + p * .6, 0, .9, 0, t, true); w.g.rotation.z = 0; },
    },
    {
      say: 'Best prize for Gary: a crumb, a medal, or a nap? Comment below.',
      quiz: { q: 'What is the best prize for Gary?', options: ['A crumb', 'A medal', 'A nap'], answer: 'Fun fact: cheetahs can sprint at up to 114 km/h, but only for a few hundred metres.' },
      show: ['floor', 'wall', 'track', 'g', 'finish'], sky: '#274B73', lightAt: [4, 10, 6], lightDist: 34,
      cam: { pos: [14, 2.8, 8], look: [13.4, 1.2, 0], fov: 48, to: { pos: [11, 2.8, 8], look: [13.4, 1.2, 0] } },
      update: (w, p, t) => { w.dust.visible = false; ctAt(w, 14.2, 0, -.2, 0, .8); w.c.body.scale.set(1.6, .8, 1.25); w.c.eyes.forEach(e => e.scale.y = .1); gy(w, 12.4, 0, .9, .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
