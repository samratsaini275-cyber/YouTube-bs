// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows balls of yarn falling on the street, the cat staring up, Gary beside it.

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
  w.road = box(40, .02, 2.4, mat('#4D5656'), [0, .01, 2]); w.road.receiveShadow = true;
  w.houses = group(); const cols = ['#F5B041', '#5DADE2', '#EC7063', '#F7DC6F', '#AF7AC5', '#58D68D'];
  for (let i = 0; i < 6; i++) { const h = group([-7.5 + i * 3, 0, -2.5], w.houses); box(1.8, 1.6, 1.6, mat(cols[i]), [0, .8, 0], h); const r = cone(1.5, 1, mat('#922B21'), [0, 2.1, 0], h, 4); r.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#6E2C00'), [0, .35, .82], h); box(.4, .4, .05, mat('#D6EAF8', { glow: .3 }), [.5, 1.1, .82], h); }
  w.yarn = group(); const yc = ['#E74C3C', '#27AE60', '#8E44AD', '#F39C12', '#3498DB'];
  for (let i = 0; i < 26; i++) { const y = group([0, 0, 0], w.yarn); const m = mat(yc[i % 5], { rough: .9 }); ball(.18, m, [0, 0, 0], y); for (let j = 0; j < 3; j++) { const r = cyl(.185, .185, .03, mat(yc[(i + 2) % 5]), [0, 0, 0], y, 16); r.rotation.set(j * 1.1, j * .7, 0); r.castShadow = false; } y.userData.i = i; }
  w.leaf = group(); const lf = ball(.5, mat('#2ECC71'), [0, 0, 0], w.leaf); lf.scale.set(1, .08, .6); cyl(.02, .02, .7, mat('#1E8449'), [0, -.35, 0], w.leaf, 6);
  w.heart = group(); const hm = mat('#FF4F7B', { glow: .6 }); ball(.14, hm, [-.1, 0, 0], w.heart); ball(.14, hm, [.1, 0, 0], w.heart); const hc = k.cone(.19, .3, hm, [0, -.17, 0], w.heart, 12); hc.rotation.z = Math.PI;
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const rain = (w, t, cx = 0, sp = .45) => w.yarn.children.forEach(y => { const i = y.userData.i, q = (t * sp + i * .173) % 1; y.position.set(cx + ((i * 1.37) % 6) - 3, 5.5 - q * 5.4, ((i * .71) % 3) - .5); y.rotation.set(t * 2 + i, t + i, 0); });
const env = { sky: '#9BC4E2', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '527',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'YARN RAIN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'IT RAINS YARN'],
  title: 'In this town, it rains yarn (Gary the ant and the cat)',
  description: 'The cat thought it was the best day ever. Gary\'s umbrella was a leaf. Then the cat had to choose. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'funny', 'yarn', 'shorts'],
  sources: [
    'Comedy sketch: yarn rain is made up. Quiz fact: offered human social interaction, food, toys and scents, most pet and shelter cats in a 2017 study spent the most time with human social interaction, followed by food (Vitale Shreve, Mehrkam & Udell, "Social interaction, food, scent or toys? A formal assessment of domestic pet and shelter cat preferences", Behavioural Processes, 2017).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, it rains yarn.',
      show: ['floor', 'road', 'houses', 'yarn', 'g'], ...env,
      cam: { pos: [0, 2.4, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.4, 7.9], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'leaf', 'heart'); rain(w, t); ctAt(w, .9, 0, 1.2, -.4, .45); w.c.head.rotation.z = .4; gy(w, -.6, 0, 2, -.9, t); w.g.rotation.z = .25; },
    },
    {
      say: 'The cat thought it was the best day ever.',
      show: ['floor', 'road', 'houses', 'yarn', 'g'], ...env,
      cam: { pos: [0, 2.4, 9], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.4, 8.4], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'leaf', 'heart'); rain(w, t); const j = Math.abs(Math.sin(t * 4)); ctAt(w, .4 + Math.sin(t * 2) * .8, j * 1.2, 1, -.3 + Math.sin(t * 2) * .5, .45); w.c.paw.position.set(1.3, 1 + j * .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.3); gy(w, -1.6, 0, 2.2, -.9, t); },
    },
    {
      say: 'Gary\'s umbrella? A leaf.',
      show: ['floor', 'road', 'houses', 'yarn', 'g', 'leaf'], ...env,
      cam: { pos: [0, 1.4, 4.8], look: [0, 1.1, 0], fov: 50, to: { pos: [0, 1.4, 4.3], look: [0, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'heart'); w.cr.visible = false; rain(w, t, 0, .3); gy(w, -.3, 0, 1.4, -1.2, t); w.leaf.position.set(-.1, 1.5, 1.4); w.leaf.rotation.set(0, 0, .15 * Math.sin(t * 3)); },
    },
    {
      say: 'Then the cat had to choose: all that yarn, or Gary.',
      show: ['floor', 'road', 'houses', 'yarn', 'g', 'leaf'], ...env,
      cam: { pos: [0, 2.2, 7.5], look: [0, 1.5, 0], fov: 50, to: { pos: [0, 2.2, 7], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'heart'); rain(w, t, 0, .3); ctAt(w, .2, 0, 0, -1.2 + Math.sin(t * 3) * .5, .45); w.c.head.rotation.y = Math.sin(t * 4) * .4; gy(w, -1.1, 0, 1.1, -.6, t); w.leaf.position.set(-.9, 1.5, 1.1); w.leaf.rotation.set(0, 0, 0); },
    },
    {
      say: 'The cat picked Gary.',
      show: ['floor', 'road', 'houses', 'g', 'heart'], ...env,
      cam: { pos: [0, 1.8, 6], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 1.8, 5.5], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'yarn', 'leaf'); ctAt(w, .7, 0, 0, -2.2, .5); w.c.head.rotation.z = -.25; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); gy(w, -.8, 0, .2, -.4, t); w.heart.position.set(0, 2.4 + Math.sin(t * 3) * .1, .5); w.heart.scale.setScalar(1 + .1 * Math.sin(t * 6)); },
    },
    {
      say: 'Best yarn colour: red, green, or purple? Comment below.',
      quiz: { q: 'What is the best yarn colour?', options: ['Red', 'Green', 'Purple'], answer: 'Fun fact: in one study, most cats picked time with people over food, toys, or smells.' },
      show: ['floor', 'road', 'houses', 'yarn', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.5, 2.2, 8], look: [0, 1.4, 0], fov: 48, to: { pos: [-2.5, 2.2, 8], look: [0, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'leaf', 'heart'); rain(w, t, 0, .3); ctAt(w, .8, 0, .5, -2.4, .45); gy(w, -.8, 0, 1.4, -.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
