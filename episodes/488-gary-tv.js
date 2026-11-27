// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a living room lit by a TV.

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
  w.floor = k.ground('#8E6E53', 0);
  w.wall = box(60, 30, .5, mat('#34495E'), [0, 15, -6]); w.wall.castShadow = false;
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.tv = group(); box(9, 5.4, .5, mat('#1C1C1C'), [0, 3.4, -4.5], w.tv); box(1, .7, .6, mat('#1C1C1C'), [0, .35, -4.5], w.tv);
  w.px = group([0, 3.4, -4.2], w.tv); const cols = ['#E74C3C', '#3498DB', '#2ECC71', '#F1C40F']; for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) box(2, 1.6, .05, mat(cols[(i + j) % 4], { glow: .9 }), [-3 + i * 2, -1.6 + j * 1.6, 0], w.px);
  w.catv = group([0, 3.4, -4.2], w.tv); box(8.4, 4.8, .04, mat('#AED6F1', { glow: .8 }), [0, 0, 0], w.catv); const hd = ball(1.6, mat('#F2A04A', { glow: .5 }), [0, -.3, .1], w.catv); hd.scale.z = .2; for (const x of [-1, 1]) { cone(.6, 1.1, mat('#F2A04A', { glow: .5 }), [x * 1, 1.3, .1], w.catv, 4); ball(.25, mat('#7BC96F', { glow: .6 }), [x * .6, -.1, .45], w.catv).scale.z = .3; }
  w.remote = group(); box(1.6, .5, 5, mat('#2C2C2C'), [0, .25, 0], w.remote); for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) cyl(.18, .18, .12, mat(i === 1 && j === 0 ? '#E74C3C' : '#7F8C8D'), [-.45 + i * .45, .55, -1.6 + j * .9], w.remote, 12);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#34495E', lightAt: [0, 6, 4], lightDist: 22 };
const ch = (w, cat) => { w.px.visible = !cat; w.catv.visible = cat; };

export default {
  id: '488',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TV GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WATCHED TV.'],
  title: 'Gary the ant watched TV',
  description: 'The remote is too heavy to press. Up close, the screen is one giant pixel. And then the cat sits on the remote: cat channel only. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'cat', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: ants belong to the insect order Hymenoptera, the same order as bees and wasps (Encyclopaedia Britannica, "ant" and "hymenopteran").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary watched TV.',
      show: ['floor', 'wall', 'g', 'tv'], ...env,
      cam: { pos: [1.6, 1.5, 6.5], look: [0, .9, 0], fov: 46, to: { pos: [1.5, 1.5, 5.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; w.remote.visible = false; ch(w, false); gy(w, .3, 0, 0, -2.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His remote? Too heavy to press.',
      show: ['floor', 'wall', 'g', 'tv', 'remote'], ...env,
      cam: { pos: [.6, 3.4, 7], look: [0, .6, 0], fov: 46, to: { pos: [.6, 3.4, 6.4], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { w.cr.visible = false; ch(w, false); w.remote.position.set(0, 0, 0); w.remote.rotation.y = .3; gy(w, .1, .6, -.6, -1.2, t, true); w.g.rotation.z = -.25 + Math.sin(t * 10) * .06; },
    },
    {
      say: 'Too close to the screen? One pixel.',
      show: ['floor', 'wall', 'g', 'tv'], ...env,
      cam: { pos: [.3, 1.2, -.5], look: [0, 1.6, -4.2], fov: 50, to: { pos: [.3, 1.2, -1], look: [0, 1.6, -4.2], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; w.remote.visible = false; ch(w, false); gy(w, 0, 0, -3.2, -Math.PI / 2, t); w.g.rotation.z = 0; },
    },
    {
      say: 'Then the cat sat on the remote. Cat channel only.',
      show: ['floor', 'wall', 'g', 'tv', 'remote'], ...env,
      cam: { pos: [1, 4, 11], look: [0, 2.6, -1], fov: 52, to: { pos: [1, 4, 10.4], look: [0, 2.6, -1], fov: 50 } },
      update: (w, p, t) => { ch(w, p > .45); w.remote.position.set(-2.3, 0, 1.5); w.remote.rotation.y = .3; ctAt(w, -2, .5, 1.5, -Math.PI / 2 + .5, .7); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, 2.4, 0, 2.6, -2.4, t); w.g.rotation.z = 0; },
    },
    {
      say: 'Best TV show for Gary: Crumb Kitchen, Ant Island, or Cat TV? Comment below.',
      quiz: { q: 'What is the best TV show for Gary?', options: ['Crumb Kitchen', 'Ant Island', 'Cat TV'], answer: 'Fun fact: ants belong to the same insect group as bees and wasps.' },
      show: ['floor', 'wall', 'g', 'tv', 'remote'], sky: '#274B73', lightAt: [0, 6, 4], lightDist: 22,
      cam: { pos: [2.4, 4, 11], look: [0, 2.6, -1], fov: 50, to: { pos: [-1.2, 4, 11], look: [0, 2.6, -1] } },
      update: (w, p, t) => { ch(w, true); w.remote.position.set(-2.3, 0, 1.5); w.remote.rotation.y = .3; ctAt(w, -2, .5, 1.5, -Math.PI / 2 + .5, .7); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = .2); gy(w, 2.4, 0, 2.6, -2.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
