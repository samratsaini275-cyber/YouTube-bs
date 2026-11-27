// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary and the cat in a kitchen.

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
  w.floor = k.ground('#E5D3B3', 0);
  w.wall = group(); box(60, 30, .5, mat('#FDEDEC'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.cookie = group(); cyl(2.2, 2.2, .35, mat('#D68910', { rough: .9 }), [0, .18, 0], w.cookie, 28); for (let i = 0; i < 9; i++) { const a = i * 2.4; ball(.22, mat('#4E342E'), [Math.cos(a) * (.5 + (i % 3) * .55), .36, Math.sin(a) * (.5 + (i % 3) * .55)], w.cookie).scale.y = .5; }
  w.chip = ball(.3, mat('#4E342E'), [0, 0, 0], k.scene);
  w.crumb = box(.25, .18, .2, mat('#D68910'), [0, 0, 0], k.scene);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FDEDEC', lightAt: [2, 9, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '519',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BAKER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BAKED COOKIES WITH THE CAT.'],
  title: 'Gary the ant baked cookies with the cat',
  description: 'One cookie is the size of a trampoline. One chocolate chip is a boulder. And the cat ate the whole cookie. Gary got the crumb. Same size, really. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'cookies', 'funny', 'shorts'],
  sources: [
    'Quiz fact: in Jerdon\'s jumping ant (Harpegnathos saltator), workers that become egg-laying "gamergates" have brains about 19% smaller than foragers, and the brain grows back 6 to 8 weeks after they return to normal work (Penick et al., "Reversible plasticity in brain size, behaviour and physiology characterizes caste transitions in a socially flexible ant (Harpegnathos saltator)", Proceedings of the Royal Society B, 2021).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary baked cookies with the cat.',
      show: ['floor', 'wall', 'g'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'cookie', 'chip', 'crumb'); ctAt(w, 1.4, 0, -1.8, -2.2, .7); gy(w, -.2, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'One cookie? A trampoline.',
      show: ['floor', 'wall', 'g', 'cookie'], ...env,
      cam: { pos: [.4, 2.4, 6.5], look: [0, .8, 0], fov: 48, to: { pos: [.4, 2.4, 6], look: [0, .8, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'chip', 'crumb'); w.cr.visible = false; w.cookie.position.set(0, 0, 0); gy(w, .2, .36 + Math.abs(Math.sin(t * 5)) * .8, .5, -1.6, t); w.g.rotation.z = 0; },
    },
    {
      say: 'One chocolate chip? A boulder.',
      show: ['floor', 'wall', 'g', 'chip'], ...env,
      cam: { pos: [.4, 1.3, 4.5], look: [0, .6, 0], fov: 46, to: { pos: [.4, 1.3, 4.1], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'cookie', 'crumb'); w.cr.visible = false; const x = .2 - p * .8; w.chip.position.set(x, .3, .3); w.chip.rotation.z = p * 3; gy(w, x + .75, 0, .3, Math.PI, t, true); w.g.rotation.z = .3; },
    },
    {
      say: 'The cat ate the cookie. Gary got the crumb. Same size.',
      show: ['floor', 'wall', 'g', 'cookie', 'crumb'], ...env,
      cam: { pos: [.6, 2.6, 8.5], look: [.3, 1.3, 0], fov: 50, to: { pos: [.6, 2.6, 7.9], look: [.3, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'chip'); ctAt(w, 1.6, 0, -.8, Math.PI - .4, .8); w.c.head.rotation.z = -.3 - Math.abs(Math.sin(t * 8)) * .1 * (p < .5 ? 1 : 0); w.cookie.visible = p < .45; w.cookie.position.set(.2, 0, .2); w.cookie.scale.setScalar(Math.max(.05, 1 - p * 2)); w.crumb.visible = p > .5; w.crumb.position.set(-.85, 1, 1.2); gy(w, -.9, 0, 1.2, -1.2, t); w.g.rotation.z = p > .5 ? .15 : 0; },
    },
    {
      say: 'Best cookie for these two: chocolate, oatmeal, or a crumb? Comment below.',
      quiz: { q: 'What is the best cookie for Gary and the cat?', options: ['Chocolate', 'Oatmeal', 'A crumb'], answer: 'Fun fact: in one ant species, workers that start laying eggs shrink their brains by about a fifth, and can grow them back.' },
      show: ['floor', 'wall', 'g', 'crumb'], sky: '#274B73', lightAt: [2, 9, 6], lightDist: 26,
      cam: { pos: [2.2, 2.6, 8.5], look: [.3, 1.3, 0], fov: 48, to: { pos: [-1.2, 2.6, 8.5], look: [.3, 1.3, 0] } },
      update: (w, p, t) => { hide(w, 'chip', 'cookie'); ctAt(w, 1.6, 0, -.8, Math.PI - .4, .8); w.crumb.position.set(-.85, 1, 1.2); gy(w, -.9, 0, 1.2, -1.2 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
