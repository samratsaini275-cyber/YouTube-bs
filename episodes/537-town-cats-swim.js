// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat swimming in a pond with Gary standing on its head.

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
  w.pond = cyl(3.2, 3.2, .04, mat('#3498DB', { rough: .1, glow: .1 }), [0, .03, 0], k.scene, 40); w.pond.castShadow = false;
  w.rim = group(); for (let i = 0; i < 22; i++) { const a = i / 22 * Math.PI * 2; const r = ball(.28 + (i % 3) * .06, mat('#95A5A6', { rough: .9 }), [Math.cos(a) * 3.3, .12, Math.sin(a) * 3.3], w.rim); r.scale.y = .6; }
  w.pads = group(); for (let i = 0; i < 4; i++) { const p = cyl(.35, .35, .03, mat('#27AE60'), [-2 + i * 1.3, .07, -1.6 + (i % 2) * .6], w.pads, 16); p.castShadow = false; }
  w.trees = group(); for (let i = 0; i < 5; i++) { const t = group([-6 + i * 3, 0, -4.5], w.trees); cyl(.15, .2, 1.4, mat('#6E4B2A'), [0, .7, 0], t, 8); ball(.9, mat('#1E8449'), [0, 1.9, 0], t); }
  w.ripple = group(); for (let i = 0; i < 2; i++) { const r = cyl(.6 + i * .4, .6 + i * .4, .01, mat('#AED6F1', { glow: .5 }), [0, .06, 0], w.ripple, 32); r.material.transparent = true; r.material.opacity = .5; r.castShadow = false; }
  w.drops = group(); for (let i = 0; i < 12; i++) { const d = ball(.06, mat('#AED6F1', { glow: .4 }), [0, 0, 0], w.drops); d.userData.a = i / 12 * Math.PI * 2; }
  w.frog = group(); const fg = mat('#58D68D'); const fb = ball(.3, fg, [0, .2, 0], w.frog); fb.scale.set(1.2, .8, 1); for (const z of [-.13, .13]) { ball(.1, fg, [.18, .42, z], w.frog); ball(.05, mat('#111111'), [.25, .45, z], w.frog); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
// The cat swims: body sunk in the pond so only the head and back show; Gary stands on its head.
const swim = (w, x, z, t, withGary = true) => { ctAt(w, x, -.75 + Math.sin(t * 3) * .05, z, 0, .45); w.c.paw.position.set(.8 + Math.sin(t * 6) * .3, .9, .9); w.ripple.position.set(x + .3, 0, z); w.ripple.children.forEach((r, i) => r.scale.setScalar(1 + ((t * .8 + i * .5) % 1) * .6)); if (withGary) { w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(w.cr.position.clone()); gy(w, hp.x - .15, hp.y + .55, hp.z, 0, t); } };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '537',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SWIMMING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CAN SWIM'],
  title: 'In this town, cats can swim (Gary the ant and the cat)',
  description: 'The cat did laps in the pond. Gary stood on its head like a captain. Then the cat climbed out. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'swimming', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: the swimming cat is made up. Quiz fact: tigers are good swimmers and readily cross rivers in search of prey (Britannica, "Tiger", Britannica Students and Britannica Kids).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats can swim.',
      show: ['floor', 'pond', 'rim', 'pads', 'trees', 'ripple', 'g'], ...env,
      cam: { pos: [0, 4.4, 8], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 4.4, 7.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'drops', 'frog'); swim(w, -.6 + Math.sin(t * .8) * .3, .6, t); },
    },
    {
      say: 'The cat did laps in the pond.',
      show: ['floor', 'pond', 'rim', 'pads', 'trees', 'ripple'], ...env,
      cam: { pos: [0, 3.6, 8.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 3.6, 8], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'drops', 'frog'); w.g.visible = false; swim(w, -2 + p * 3.2, .3, t, false); },
    },
    {
      say: 'Gary stood on its head like a captain.',
      show: ['floor', 'pond', 'rim', 'pads', 'trees', 'ripple', 'g'], ...env,
      cam: { pos: [0, 2.2, 5.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 2.2, 5], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'drops', 'frog'); w.g.visible = true; swim(w, -.6, .6, t); w.g.rotation.y = -.6 + .2 * Math.sin(t * 2); },
    },
    {
      say: 'Then the cat climbed out.',
      show: ['floor', 'pond', 'rim', 'pads', 'trees', 'g'], ...env,
      cam: { pos: [.9, 2.8, 8], look: [.9, 1.2, 0], fov: 50, to: { pos: [.9, 2.8, 7.5], look: [.9, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'drops', 'frog', 'ripple'); const f = Math.min(1, p * 1.5); ctAt(w, .6 + f * 1.6, -.75 + f * .75, .6, 0, .45); w.cr.rotation.z = Math.sin(f * Math.PI) * .3; w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(w.cr.position.clone()); gy(w, hp.x - .15, hp.y + .55, hp.z, 0, t); },
    },
    {
      say: 'And shook itself dry. Gary went flying.',
      show: ['floor', 'pond', 'rim', 'pads', 'trees', 'g', 'drops', 'frog'], ...env,
      cam: { pos: [.9, 3.2, 8.5], look: [.9, 1.4, 0], fov: 50, to: { pos: [.9, 3.2, 8], look: [.9, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'ripple'); ctAt(w, 2.2, 0, .6, -.3, .45); w.cr.rotation.x = Math.sin(t * 25) * .15 * (p < .6 ? 1 : 0); const sp = (t * 1.5) % 1; w.drops.position.set(2.2, 1, .6); w.drops.children.forEach(d => d.position.set(Math.cos(d.userData.a) * sp * 1.5, Math.sin(d.userData.a * 2) * .4, Math.sin(d.userData.a) * sp * 1.5)); w.drops.visible = p < .6; const f = Math.min(1, Math.max(0, (p - .3) / .5)); gy(w, 2.1 - f * 2.2, 1.7 + Math.sin(f * Math.PI) * 1.5 - f * 1.55, .6, 0, t); w.g.rotation.z = f * 9; w.frog.position.set(-.1, .05, .7); w.frog.rotation.y = -1.2; },
    },
    {
      say: 'Best pool toy: a ring, a noodle, or a duck? Comment below.',
      quiz: { q: 'What is the best pool toy?', options: ['A ring', 'A noodle', 'A duck'], answer: 'Made up. But tigers really are good swimmers, and cross rivers to hunt.' },
      show: ['floor', 'pond', 'rim', 'pads', 'trees', 'ripple', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.4, 3, 8], look: [0, 1.2, 0], fov: 48, to: { pos: [-2.4, 3, 8], look: [0, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'drops', 'frog'); swim(w, -.4, .6, t); },
    },
  ],
};
