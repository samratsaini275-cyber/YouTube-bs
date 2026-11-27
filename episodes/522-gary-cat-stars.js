// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat on a lawn at night under stars.

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
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.straw = group(); const st = cyl(.12, .12, 2, mat('#E74C3C'), [0, 0, 0], w.straw, 12); for (let i = 0; i < 4; i++) cyl(.125, .125, .2, mat('#FDFEFE'), [0, -.7 + i * .45, 0], w.straw, 12);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.35, .06, .05, m, [0, .15, 0], z); box(.35, .06, .05, m, [0, -.15, 0], z); const d = box(.42, .06, .05, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const zzz = (w, x, y, t) => w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(x + q * 1.2, y + q * 1.6, 0); z.scale.setScalar(.6 + q); });
const env = { sky: '#0B1D3A', lightAt: [2, 8, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '522',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'STARGAZER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WATCHED THE STARS.'],
  title: 'Gary the ant watched the stars with the cat',
  description: 'The telescope is a drinking straw. The moon? The cat tried to catch it. And then Gary fell asleep, so the cat counted the stars. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'stars', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the Australian bull ant Myrmecia pyriformis forages at night and navigates visually using the panorama of landmarks around it, such as trees; small changes to that landmark panorama disrupt its navigation (Narendra & Ramirez-Esquivel, "Subtle changes in the landmark panorama disrupt visual navigation in a nocturnal bull ant", Philosophical Transactions of the Royal Society B, 2017).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary watched the stars.',
      show: ['floor', 'wall', 'stars', 'moon', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.4, 0], fov: 50, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'straw', 'zz'); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .25; },
    },
    {
      say: 'The telescope? A drinking straw.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'straw'], ...env,
      cam: { pos: [.6, 1.6, 5], look: [.2, 1.4, 0], fov: 50, to: { pos: [.6, 1.6, 4.6], look: [.2, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'zz'); w.cr.visible = false; gy(w, -.3, 0, .5, -1.4, t); w.g.rotation.z = .3; w.straw.position.set(.35, 1.1, .5); w.straw.rotation.set(0, 0, -.7); },
    },
    {
      say: 'The moon? The cat tried to catch it.',
      show: ['floor', 'wall', 'stars', 'moon', 'g'], ...env,
      cam: { pos: [.6, 2.4, 8], look: [.6, 2.2, 0], fov: 52, to: { pos: [.6, 2.4, 7.4], look: [.6, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'straw', 'zz'); const j = Math.max(0, Math.sin(t * 3)); ctAt(w, 1, j * 1.2, -.8, -.2, .8); w.c.paw.position.set(1.2, 1.5 + j * .5, .9); w.c.head.rotation.z = .4; gy(w, -.5, 0, 1.6, -1.4, t); w.g.rotation.z = .25; },
    },
    {
      say: 'Gary fell asleep. The cat counted the stars.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'zz'], ...env,
      cam: { pos: [.6, 2.4, 7.5], look: [.3, 1.4, 0], fov: 50, to: { pos: [.6, 2.4, 6.9], look: [.3, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'straw'); ctAt(w, 1.4, 0, -.8, -2.4, .8); w.c.head.rotation.z = .45; w.c.head.rotation.y = Math.sin(t * 2) * .3; gy(w, -.8, 0, 1, -1.4, t); w.g.rotation.z = 0; w.g.scale.set(1.3, 1.1, 1.3); zzz(w, -.6, 1, t); },
    },
    {
      say: 'Best thing to wish on: a star, the moon, or a crumb? Comment below.',
      quiz: { q: 'What is the best thing to wish on?', options: ['A star', 'The moon', 'A crumb'], answer: 'Fun fact: some bull ants hunt at night and find their way home by remembering the shapes of the trees around them.' },
      show: ['floor', 'wall', 'stars', 'moon', 'g'], sky: '#274B73', lightAt: [2, 8, 6], lightDist: 26,
      cam: { pos: [2.2, 2.4, 7.5], look: [.3, 1.4, 0], fov: 48, to: { pos: [-1, 2.4, 7.5], look: [.3, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'straw', 'zz'); ctAt(w, 1.4, 0, -.8, -2.4, .8); w.c.head.rotation.z = .45; gy(w, -.8, 0, 1, -1.4 + .3 * Math.sin(t * 3), t, true); w.g.scale.setScalar(1.3); },
    },
  ],
};
