// Narrative 28: "Gary's Big World (season 4: Gary and the cat, every episode)". Same format as 237 (the 1K sleepover); the cat co-stars in every episode.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary on a small stage with a wand, the cat watching.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#4A235A', 0);
  w.wall = group(); box(60, 30, .5, mat('#1B2631'), [0, 15, -6], w.wall); for (let i = 0; i < 12; i++) ball(.06, mat('#F9E79F', { glow: 1 }), [-5 + i * .9, 4 + (i % 3) * 1.4, -5.7], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.wand = group(); cyl(.04, .04, 1.2, mat('#111111'), [0, .6, 0], w.wand, 8); cyl(.045, .045, .2, mat('#FDFEFE'), [0, 1.15, 0], w.wand, 8);
  w.hat = group(); cyl(.6, .6, .05, mat('#111111'), [0, 0, 0], w.hat, 20); cyl(.4, .4, .8, mat('#111111'), [0, .4, 0], w.hat, 20);
  w.crumb = box(.3, .2, .25, mat('#D4A056'), [0, 0, 0], k.scene);
  w.sparks = group(); for (let i = 0; i < 10; i++) { const s = ball(.07, mat('#F9E79F', { glow: 1.4 }), [0, 0, 0], w.sparks); s.userData.i = i; s.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const spark = (w, x, y, z, t) => w.sparks.children.forEach(s => { const i = s.userData.i, q = (t * 1.2 + i / 10) % 1; s.position.set(x + Math.cos(i * 1.9) * q * .9, y + Math.sin(i * 1.9) * q * .9, z); s.scale.setScalar(1 - q * .6); });
const env = { sky: '#1B2631', lightAt: [0, 7, 4], lightDist: 20 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '520',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'MAGIC GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'DID MAGIC FOR THE CAT.'],
  title: 'Gary the ant did magic for the cat',
  description: 'The wand is a matchstick. The big trick? Making a crumb disappear, by eating it. And then the cat made Gary disappear. Under one paw. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'magic', 'funny', 'shorts'],
  sources: [
    'Quiz fact: desert ants of the genus Cataglyphis have a magnetic compass that is sensitive to the polarity of Earth\'s magnetic field (Grob, Wegmann, Rössler & Fleischmann, "Cataglyphis ants have a polarity-sensitive magnetic compass", Current Biology, 2024).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary did magic for the cat.',
      show: ['floor', 'wall', 'g', 'wand'], ...env,
      cam: { pos: [1.6, 1.8, 7.5], look: [.4, 1.2, 0], fov: 48, to: { pos: [1.5, 1.8, 6.9], look: [.4, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'hat', 'crumb', 'sparks'); ctAt(w, 1.6, 0, -1.8, -2.2, .7); gy(w, -.3, 0, .9, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); w.wand.position.set(.1, .4, 1); w.wand.rotation.z = -.6 + Math.sin(t * 4) * .2; },
    },
    {
      say: 'The wand? A matchstick.',
      show: ['floor', 'wall', 'g', 'wand', 'sparks'], ...env,
      cam: { pos: [.4, 1.5, 4.8], look: [.1, 1, 0], fov: 46, to: { pos: [.4, 1.5, 4.4], look: [.1, 1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'hat', 'crumb'); w.cr.visible = false; gy(w, -.4, 0, .4, -1.4, t); w.g.rotation.z = 0; w.wand.position.set(.1, .45, .5); w.wand.rotation.z = -.7 + Math.sin(t * 5) * .3; spark(w, .7, 1.4, .5, t); },
    },
    {
      say: 'The big trick? A crumb vanished. He ate it.',
      show: ['floor', 'wall', 'g', 'wand', 'crumb'], ...env,
      cam: { pos: [.4, 1.5, 4.8], look: [.1, 1, 0], fov: 46, to: { pos: [.4, 1.5, 4.4], look: [.1, 1, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'hat', 'sparks'); w.cr.visible = false; gy(w, -.4, 0, .4, -1.4, t); w.wand.position.set(.1, .45, .5); w.wand.rotation.z = -.7; w.crumb.visible = p < .55; w.crumb.position.set(.5, .15, .5); w.g.rotation.z = p > .55 ? Math.sin(t * 12) * .05 : 0; w.g.scale.set(1.3, 1.3, p > .55 ? 1.45 : 1.3); },
    },
    {
      say: 'Then the cat made Gary disappear. Under one paw.',
      show: ['floor', 'wall', 'g', 'wand', 'sparks'], ...env,
      cam: { pos: [.6, 2.4, 7.5], look: [.3, 1.2, 0], fov: 48, to: { pos: [.6, 2.4, 6.9], look: [.3, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'hat', 'crumb'); w.g.scale.setScalar(1.3); ctAt(w, 1.6, 0, -.2, Math.PI - .3, .8); const down = p > .45; w.c.paw.position.set(down ? 1.9 : 1, down ? .3 : .5 + Math.sin(Math.min(1, p * 2.2) * Math.PI) * .8, .9); w.cr.updateWorldMatrix(true, true); w.g.visible = !down; gy(w, -.1, 0, .6, -1.4, t); w.wand.position.set(.35, .02, .9); w.wand.rotation.set(0, 0, Math.PI / 2); w.sparks.visible = down && p < .7; spark(w, -.1, .6, .8, t); },
    },
    {
      say: 'Best magic trick for Gary: vanish, levitate, or nap? Comment below.',
      quiz: { q: 'What is the best magic trick for Gary?', options: ['Vanish', 'Levitate', 'Nap'], answer: 'Fun fact: desert ants have a built-in magnetic compass.' },
      show: ['floor', 'wall', 'g', 'wand'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [2.2, 2.4, 7.5], look: [.3, 1.2, 0], fov: 48, to: { pos: [-1, 2.4, 7.5], look: [.3, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'hat', 'crumb', 'sparks'); w.g.visible = true; ctAt(w, 1.6, 0, -.2, Math.PI - .3, .8); w.c.paw.position.set(1, .5, .9); gy(w, -.3, 0, .9, -1.4 + .3 * Math.sin(t * 3), t, true); w.wand.position.set(0, .4, 1.1); w.wand.rotation.set(0, 0, -.6); },
    },
  ],
};
