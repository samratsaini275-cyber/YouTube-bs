// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears.
// Hook: the premise as a question under 2 s; first frame shows a person covered in shiny teal fish scales.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

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

// Fish scales: rows of overlapping shiny discs over the body and arms.
function scales(k, p) { const cols = ['#48C9B0', '#5DADE2', '#76D7C4']; p.scales = []; for (let r = 0; r < 7; r++) for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + (r % 2) * .22; const sc = k.ball(.2, k.mat(cols[(r + i) % 3], { rough: .15, glow: .15 }), [Math.sin(a) * .85, .3 + r * .35, Math.cos(a) * .85], p.root); sc.scale.set(1, .8, .25); sc.lookAt(sc.position.x * 3, sc.position.y, sc.position.z * 3); sc.castShadow = false; p.scales.push(sc); } }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#E8F8F5'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#1ABC9C'); w.pp = w.p.root; scales(k, w.p);
  w.rain = group(); for (let i = 0; i < 40; i++) { const d = box(.03, .3, .03, mat('#85C1E9', { glow: .4 }), [0, 0, 0], w.rain); d.userData.i = i; d.castShadow = false; }
  w.cloud = group(); for (let j = 0; j < 4; j++) ball(.8, mat('#AAB7B8'), [j * .9 - 1.35, 0, 0], w.cloud); w.cloud.position.set(0, 7, -1);
  w.sun = ball(1, mat('#F7DC6F', { glow: 1.5 }), [2.8, 7.4, -3], k.scene);
  w.glints = group(); for (let i = 0; i < 10; i++) { const g = box(.05, .4, .02, mat('#FFFFFF', { glow: 2 }), [0, 0, 0], w.glints); g.userData.i = i; g.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#E8F8F5', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '552',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FISH SCALES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'FISH SCALES?'],
  title: 'What would happen if we had fish scales?',
  description: 'Rainy days become your favourite. Sunny days turn you into a disco ball. And the cat is very, very interested. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'fish', 'scales', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human fish scales are made up. Quiz fact: scientists estimate the age of a fish by counting yearly growth rings, called annuli, in its ear stones (otoliths), almost like counting the rings in a tree (NOAA Fisheries, "Age and Growth").'],
  setup,
  scenes: [
    { say: 'What if we had fish scales?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 3.4, 9], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3.4, 8.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'rain', 'cloud', 'sun', 'glints'); w.cr.visible = false; stand(w, 0, 0, Math.sin(t * 1.5) * .5); pose(w.p, .4); w.p.mouth.scale.set(1.2, 1.6, 1); } },
    { say: 'Rainy days? Your favourite.', show: ['ground', 'pp', 'rain', 'cloud'], sky: '#85929E', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.6, 10], look: [0, 3.2, 0], fov: 54, to: { pos: [0, 3.6, 9.4], look: [0, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { hide(w, 'sun', 'glints', 'floor', 'wall'); w.ground.visible = true; w.cr.visible = false; stand(w, 0, 0, Math.sin(t * 3) * .6); pose(w.p, 1.6); w.p.mouth.scale.set(1.6, 2, 1); w.rain.children.forEach(d => { const i = d.userData.i, q = (t * .9 + i * .137) % 1; d.position.set(((i * 1.37) % 7) - 3.5, 6.5 - q * 6.5, ((i * .71) % 3) - 1); }); } },
    { say: 'Sunny days? You turn into a disco ball.', show: ['ground', 'pp', 'sun', 'glints'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.6, 10], look: [0, 3.2, 0], fov: 54, to: { pos: [0, 3.6, 9.4], look: [0, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { hide(w, 'rain', 'cloud', 'floor', 'wall'); w.ground.visible = true; w.cr.visible = false; stand(w, 0, 0, t * 2); pose(w.p, .5); w.glints.children.forEach(g => { const i = g.userData.i, a = i / 10 * Math.PI * 2 + t; g.position.set(Math.cos(a) * 1.8, 1.5 + (i % 4) * .6, Math.sin(a) * 1.8); g.rotation.z = a; g.visible = Math.sin(t * 8 + i) > 0; }); } },
    { say: 'And the cat? Very, very interested.', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 2.8, 9], look: [0, 2.4, 0], fov: 52, to: { pos: [0, 2.8, 8.4], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'rain', 'cloud', 'sun', 'glints'); stand(w, -1.3, 0, .4); pose(w.p, .3); w.p.eyes.forEach(e => e.scale.setScalar(1.4)); ctAt(w, 1.6, 0, .6, -2.6, .6); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); w.c.head.rotation.z = .25; w.c.paw.position.set(1.2, .5 + Math.abs(Math.sin(t * 4)) * .4, .9); } },
    { say: 'Fish scales: shiny, weird, or totally cool? Comment below.',
      quiz: { q: 'Would you want fish scales?', options: ['Shiny', 'Weird', 'Totally cool'], answer: 'Fun fact: scientists can tell a fish\'s age by counting growth rings in its ear stones, like tree rings.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.5, 9], look: [0, 3.2, 0], fov: 50, to: { pos: [-1, 1.5, 9], look: [0, 3.2, 0] } },
      update: (w, p, t) => { hide(w, 'rain', 'cloud', 'sun', 'glints', 'wall'); w.cr.visible = false; stand(w, 0, 0, .2 + Math.sin(t * 2) * .3); pose(w.p, .4); } },
  ],
};
