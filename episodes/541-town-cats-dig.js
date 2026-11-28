// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat digging in a garden with dirt flying and Gary watching.

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
  w.floor = k.ground('#7DBE5A', 0);
  w.fence = group(); const wood = mat('#B9773E'); for (let i = 0; i < 14; i++) box(.25, 1.1, .1, wood, [-5.2 + i * .8, .55, -2.5], w.fence); box(11, .12, .08, wood, [0, .8, -2.45], w.fence);
  w.hole = cyl(1, 1, .02, mat('#1B120C'), [0, .015, 0], k.scene, 32); w.hole.castShadow = false;
  w.mound = ball(.9, mat('#7B5534', { rough: 1 }), [0, 0, 0], k.scene); w.mound.scale.set(1.3, .5, 1);
  w.dirt = group(); for (let i = 0; i < 10; i++) { const d = ball(.08, mat('#7B5534'), [0, 0, 0], w.dirt); d.userData.i = i; }
  w.crumb = ball(.22, mat('#D4A373', { glow: .3 }), [0, 0, 0], k.scene);
  w.sparkle = group(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; const r = box(.03, .18, .02, mat('#FFF59D', { glow: 1.5 }), [Math.cos(a) * .3, Math.sin(a) * .3, 0], w.sparkle); r.rotation.z = a - Math.PI / 2; r.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
// Dirt flies backwards from the cat's front paws.
const dig = (w, x, z, t) => { w.c.paw.position.set(1, .4 + Math.abs(Math.sin(t * 12)) * .3, .9); w.dirt.visible = true; w.dirt.children.forEach(d => { const q = (t * 1.5 + d.userData.i * .1) % 1; d.position.set(x - .2 - q * 1.6, .2 + Math.sin(q * Math.PI) * 1.2, z + (d.userData.i % 3 - 1) * .25); }); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '541',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DIGGING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CAN DIG'],
  title: 'In this town, cats can dig (Gary the ant and the cat)',
  description: 'The cat dug a hole. A big one. Gary looked down. Then the cat found treasure. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'digging', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: the digging cat is made up. Quiz fact: nests of the Florida harvester ant (Pogonomyrmex badius) start about 40 to 50 cm deep in young colonies, while mature colonies are commonly 2.5 to 3 metres deep (Tschinkel, "The nest architecture of the Florida harvester ant, Pogonomyrmex badius", Journal of Insect Science, 2004).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats can dig.',
      show: ['floor', 'fence', 'mound', 'g'], ...env,
      cam: { pos: [0, 3.8, 8], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 3.8, 7.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'hole', 'crumb', 'sparkle'); ctAt(w, .6, 0, .3, 0, .45); dig(w, .6, .3, t); w.mound.position.set(-1, 0, .3); w.mound.scale.set(1.3, .5, 1); gy(w, -.4, 0, 2, -.6, t); },
    },
    {
      say: 'The cat dug a hole. A big one.',
      show: ['floor', 'fence', 'mound', 'hole'], ...env,
      cam: { pos: [0, 4, 7.5], look: [0, .8, 0], fov: 50, to: { pos: [0, 4, 7], look: [0, .8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'crumb', 'sparkle'); w.g.visible = false; ctAt(w, .5, -.1 - p * .5, .3, 0, .45); dig(w, .5, .3, t); w.hole.position.set(.6, .015, .3); w.hole.scale.setScalar(.5 + p * .7); w.mound.position.set(-1.4, 0, .3); w.mound.scale.set(1.3 + p * .6, .5 + p * .3, 1 + p * .4); },
    },
    {
      say: 'Gary looked down. Way down.',
      show: ['floor', 'fence', 'mound', 'hole', 'g'], ...env,
      cam: { pos: [.4, 2.6, 6.2], look: [.4, .6, 0], fov: 50, to: { pos: [.4, 2.8, 5.8], look: [.4, .4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'crumb', 'sparkle', 'dirt'); w.cr.visible = false; w.g.visible = true; w.hole.position.set(.6, .015, .3); w.hole.scale.setScalar(1.2); w.mound.position.set(-1.6, 0, .3); w.mound.scale.set(1.9, .8, 1.4); gy(w, -.3, 0, 1.4, -.5, t); w.g.rotation.z = -.3; },
    },
    {
      say: 'Then the cat found treasure.',
      show: ['floor', 'fence', 'mound', 'hole', 'crumb', 'sparkle', 'g'], ...env,
      cam: { pos: [.4, 2.8, 6.5], look: [.4, 1.2, 0], fov: 50, to: { pos: [.4, 2.8, 6], look: [.4, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'dirt'); const f = Math.min(1, p * 1.5); ctAt(w, .6, -.6 + f * .6, .3, -1.2, .45); w.c.paw.position.set(1.1, 1.2 + f * .3, .9); w.cr.updateWorldMatrix(true, true); const pp = w.c.paw.getWorldPosition(w.cr.position.clone()); w.crumb.position.set(.2, .8 + f * .6, 1.1); w.sparkle.position.copy(w.crumb.position); w.sparkle.rotation.z = t * 2; w.hole.position.set(.6, .015, .3); w.hole.scale.setScalar(1.2); w.mound.position.set(-1.6, 0, .3); w.mound.scale.set(1.9, .8, 1.4); gy(w, -.6, 0, 1.6, -.5, t); },
    },
    {
      say: 'One crumb. For Gary.',
      show: ['floor', 'fence', 'mound', 'hole', 'crumb', 'g'], ...env,
      cam: { pos: [0, 2.4, 7], look: [0, 1, 0], fov: 50, to: { pos: [0, 2.4, 6.5], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'dirt', 'sparkle'); ctAt(w, 1, 0, .2, -2.2, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.hole.position.set(1.2, .015, -.2); w.hole.scale.setScalar(1); w.mound.position.set(-2, 0, -.3); gy(w, -.5, 0, 1.2, -.4, t); w.crumb.position.set(.35, .25 + Math.abs(Math.sin(t * 4)) * .1, 1.3); },
    },
    {
      say: 'Best thing to dig up: treasure, a bone, or a fossil? Comment below.',
      quiz: { q: 'What is the best thing to dig up?', options: ['Treasure', 'A bone', 'A fossil'], answer: 'Fun fact: some harvester ant nests go about 3 metres down into the ground.' },
      show: ['floor', 'fence', 'mound', 'hole', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.4, 3, 8], look: [0, 1.2, 0], fov: 48, to: { pos: [-2.4, 3, 8], look: [0, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'dirt', 'sparkle', 'crumb'); ctAt(w, .9, 0, .2, -2.4, .45); w.hole.position.set(1.4, .015, -.4); w.mound.position.set(-2, 0, -.3); gy(w, -.6, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
