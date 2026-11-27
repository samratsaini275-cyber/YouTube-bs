// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Season finale; the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary lighting a tiny rocket next to the cat at night.

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
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  w.floor = k.ground('#145A32', 0);
  w.wall = box(90, 40, .5, mat('#0B1D3A'), [0, 18, -14]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 40; i++) { const s = ball(.06 + (i % 3) * .03, mat('#FFF4C2', { glow: 1.2 }), [-12 + (i * 5.3) % 24, 3 + (i * 3.7) % 12, -13.6], w.stars); s.castShadow = false; }
  w.moon = ball(1.2, mat('#FDFEFE', { glow: 1 }), [5, 10, -13], k.scene);
  w.rocket = group(); cyl(.12, .12, .7, mat('#E74C3C'), [0, .35, 0], w.rocket, 12); cone(.14, .3, mat('#F4D03F'), [0, .85, 0], w.rocket, 12); cyl(.01, .01, .3, mat('#FFFFFF', { glow: .5 }), [0, -.1, 0], w.rocket, 4);
  w.spark = ball(.08, mat('#FFD54F', { glow: 2 }), [0, 0, 0], k.scene); w.spark.castShadow = false;
  w.pop = group(); for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; const b = ball(.07, mat(['#E74C3C', '#F4D03F', '#5DADE2'][i % 3], { glow: 1.6 }), [0, 0, 0], w.pop); b.userData.d = [Math.cos(a), Math.sin(a)]; b.castShadow = false; }
  w.glit = group(); for (let i = 0; i < 40; i++) { const b = box(.08, .08, .02, mat(['#F4D03F', '#F5B7B1', '#AED6F1', '#FDFEFE'][i % 4], { glow: 1 }), [0, 0, 0], w.glit); b.userData.i = i; b.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const burst = (w, x, y, r) => { w.pop.position.set(x, y, -1); w.pop.children.forEach(b => b.position.set(b.userData.d[0] * r, b.userData.d[1] * r, 0)); };
const glitter = (w, x, y, t) => { w.glit.position.set(x, y, -.5); w.glit.children.forEach(b => { const i = b.userData.i, q = (t * .35 + i * .137) % 1; b.position.set(((i * 1.9) % 4) - 2, 2.5 - q * 3, (i % 5) * .2); b.rotation.set(t * 3 + i, t * 2 + i, 0); }); };
const env = { sky: '#0B1D3A', lightAt: [2, 8, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '524',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FIREWORKS GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'SET OFF FIREWORKS.'],
  title: 'Gary the ant set off fireworks for the cat (season finale)',
  description: 'One tiny pop and the cat leapt sky high. So Gary switched to silent fireworks: glitter. Season finale of Gary and the cat. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'fireworks', 'funny', 'shorts'],
  sources: [
    'Quiz fact: the hearing range of the domestic cat for sounds of 70 dB SPL extends from about 48 Hz to 85 kHz, one of the broadest hearing ranges among mammals (Heffner & Heffner, "Hearing range of the domestic cat", Hearing Research, 1985).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary set off fireworks.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'rocket', 'spark'], ...env,
      cam: { pos: [1, 1.8, 7.5], look: [.5, 2.1, 0], fov: 50, to: { pos: [.9, 1.8, 6.9], look: [.5, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pop', 'glit'); ctAt(w, 1.4, 0, -1.6, -.4, .55); w.rocket.position.set(.5, 0, 1); gy(w, -.2, 0, 1.2, -1.2, t); w.spark.position.set(.5, -.05 + Math.sin(t * 20) * .02, 1); w.spark.scale.setScalar(1 + Math.sin(t * 30) * .4); },
    },
    {
      say: 'One tiny pop. The cat leapt sky high.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'pop'], ...env,
      cam: { pos: [0, 2.8, 9], look: [0, 2.8, 0], fov: 54, to: { pos: [0, 2.8, 8.4], look: [0, 2.8, 0], fov: 52 } },
      update: (w, p, t) => { hide(w, 'rocket', 'spark', 'glit'); const q = Math.min(1, p * 1.6); burst(w, -1.2, 4.6, .3 + q * .9); const j = Math.sin(Math.min(1, p * 1.3) * Math.PI); ctAt(w, .8, j * 3, -1.4, -.3, .55); w.c.body.scale.set(1.4, 1.3, 1.3); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); gy(w, -1, 0, 1.4, -1.2, t); w.g.rotation.z = .3; },
    },
    {
      say: 'So Gary switched to silent fireworks. Glitter.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'glit'], ...env,
      cam: { pos: [.4, 2, 7], look: [.4, 2.1, 0], fov: 50, to: { pos: [.4, 2, 6.4], look: [.4, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'rocket', 'spark', 'pop'); ctAt(w, 1.3, 0, -1.4, -.5, .55); w.c.head.rotation.z = .35; gy(w, -.3, 0, 1.2, -1.2, t); glitter(w, .3, 1.5, t); },
    },
    {
      say: 'The cat loved it. Best friends forever.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'glit'], ...env,
      cam: { pos: [.6, 2.4, 7.5], look: [.5, 2.2, 0], fov: 50, to: { pos: [.6, 2.4, 6.9], look: [.5, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'rocket', 'spark', 'pop'); ctAt(w, 0, 0, -.6, -.3, .8); w.c.head.rotation.z = .2 + Math.sin(t * 2) * .08; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .6 : .4); gy(w, .4, 3.2, -.6, -1.2, t); glitter(w, .4, 2.6, t); },
    },
    {
      say: 'Best firework colour: red, gold, or blue? Comment below.',
      quiz: { q: 'What is the best firework colour?', options: ['Red', 'Gold', 'Blue'], answer: 'Fun fact: cats can hear far higher sounds than people, up to about 85 kHz. No wonder the pop was so loud.' },
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'pop'], sky: '#274B73', lightAt: [2, 8, 6], lightDist: 26,
      cam: { pos: [2.2, 2.4, 7.5], look: [.3, 1.4, 0], fov: 48, to: { pos: [-1, 2.4, 7.5], look: [.3, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'rocket', 'spark', 'glit'); burst(w, -2.5, 4.5, .6 + (t % 1.5) * .5); ctAt(w, 1.4, 0, -.8, -2.4, .8); gy(w, -.8, 0, 1, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
