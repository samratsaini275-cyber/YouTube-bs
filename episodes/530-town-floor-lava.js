// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows a glowing lava floor, Gary on a cushion, the cat on the sofa.

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
  w.floor = k.ground('#E8590C', 0);
  w.lava = group(); for (let i = 0; i < 18; i++) { const b = ball(.3 + (i % 3) * .12, mat(i % 2 ? '#FF922B' : '#FFD43B', { glow: 1.2 }), [((i * 1.7) % 9) - 4.5, .02, ((i * 1.3) % 4) - 1.5], w.lava); b.scale.y = .08; b.castShadow = false; b.userData.i = i; }
  w.wall = box(40, 16, .3, mat('#F3E5AB'), [0, 8, -3]); w.wall.castShadow = false;
  w.sofa = group(); const blue = mat('#2E86C1'); box(3, .6, 1.1, blue, [0, .7, 0], w.sofa); box(3, 1, .3, blue, [0, 1.4, -.45], w.sofa); box(.3, .9, 1.1, blue, [-1.5, 1, 0], w.sofa); box(.3, .9, 1.1, blue, [1.5, 1, 0], w.sofa); for (const x of [-1.3, 1.3]) cyl(.08, .08, .4, mat('#5D4037'), [x, .2, 0], w.sofa, 8); w.sofa.position.set(1.8, 0, -1.8);
  w.cush = []; const cc = ['#F06595', '#51CF66', '#FCC419', '#845EF7']; for (let i = 0; i < 4; i++) { const c = box(.8, .3, .8, mat(cc[i]), [0, .15, 0], k.scene); w.cush.push(c); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const CX = [-2.4, -1.2, 0, 2.2];
const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const cushions = (w) => w.cush.forEach((c, i) => c.position.set(CX[i], .15, 1));
const bubble = (w, t) => w.lava.children.forEach(b => { const q = (t * .6 + b.userData.i * .23) % 1; b.scale.set(1 + q * .5, .08 + Math.sin(q * Math.PI) * .25, 1 + q * .5); });
const env = { sky: '#F3E5AB', lightAt: [2, 8, 6], lightDist: 24 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '530',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLOOR IS LAVA',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'THE FLOOR IS LAVA'],
  title: 'In this town, the floor is lava (Gary the ant and the cat)',
  description: 'Gary hopped from cushion to cushion. The cat used the sofa. Then the last cushion was too far. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'floorislava', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: lava floors are made up. Quiz fact: the eruption temperature of lava at Kīlauea volcano in Hawaii is about 1,170 degrees Celsius (U.S. Geological Survey, "How hot is a Hawaiian volcano?").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, the floor is lava.',
      show: ['floor', 'lava', 'wall', 'sofa', 'g'], ...env,
      cam: { pos: [.5, 2.8, 9.5], look: [.5, 1.6, 0], fov: 50, to: { pos: [.5, 2.8, 9], look: [.5, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { bubble(w, t); cushions(w); ctAt(w, 2.2, .95, -1.6, -.4, .45); gy(w, -1.2, .3, 1, -.3, t); w.g.position.y += Math.abs(Math.sin(t * 8)) * .05; },
    },
    {
      say: 'Gary hopped from cushion to cushion.',
      show: ['floor', 'lava', 'wall', 'sofa', 'g'], ...env,
      cam: { pos: [-1, 2.4, 6.5], look: [-1, 1.4, 0], fov: 50, to: { pos: [-.6, 2.4, 6.2], look: [-.6, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { bubble(w, t); cushions(w); w.cr.visible = false; const s = Math.min(2, p * 2.4), i = Math.floor(s), f = s - i, x0 = CX[Math.min(i, 2)], x1 = CX[Math.min(i + 1, 2)]; gy(w, x0 + (x1 - x0) * f, .3 + Math.sin(f * Math.PI) * 1, 1, 0, t, f > .05 && f < .95); },
    },
    {
      say: 'The cat just used the sofa.',
      show: ['floor', 'lava', 'wall', 'sofa', 'g'], ...env,
      cam: { pos: [1.4, 2.4, 6], look: [1.4, 1.5, 0], fov: 50, to: { pos: [1.4, 2.4, 5.5], look: [1.4, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { bubble(w, t); cushions(w); ctAt(w, 2.4, 1, -1.6, -.6, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .6 : .4); gy(w, 0, .3, 1, -.3, t); },
    },
    {
      say: 'Then the last cushion was too far.',
      show: ['floor', 'lava', 'wall', 'sofa', 'g'], ...env,
      cam: { pos: [1.1, 1.8, 5.5], look: [1.1, 1, 0], fov: 50, to: { pos: [1.1, 1.8, 5], look: [1.1, 1, 0], fov: 48 } },
      update: (w, p, t) => { bubble(w, t); cushions(w); w.cr.visible = false; gy(w, .1, .3, 1, 0, t); w.g.rotation.z = .15 * Math.sin(t * 10); },
    },
    {
      say: 'So the cat became a bridge.',
      show: ['floor', 'lava', 'wall', 'sofa', 'g'], ...env,
      cam: { pos: [1.1, 2.4, 6.5], look: [1.1, 1.3, 0], fov: 50, to: { pos: [1.1, 2.4, 6], look: [1.1, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { bubble(w, t); cushions(w); ctAt(w, 1.95, .1, 1, Math.PI, .42); w.c.body.scale.set(2.1, .8, 1); const f = Math.min(1, Math.max(0, (p - .2) / .7)); gy(w, f * 2.2, .3 + Math.sin(f * Math.PI) * .9, 1, 0, t, f > 0 && f < 1); },
    },
    {
      say: 'Best thing to stand on: a pillow, a stool, or the cat? Comment below.',
      quiz: { q: 'What is the best thing to stand on?', options: ['A pillow', 'A stool', 'The cat'], answer: 'Made up. But real lava from Kilauea in Hawaii comes out at about 1,170 degrees Celsius.' },
      show: ['floor', 'lava', 'wall', 'sofa', 'g'], sky: '#F3E5AB', lightAt: [2, 8, 6], lightDist: 24,
      cam: { pos: [2.6, 2.6, 7], look: [.8, 1.4, 0], fov: 48, to: { pos: [-1.4, 2.6, 7], look: [.8, 1.4, 0] } },
      update: (w, p, t) => { bubble(w, t); cushions(w); ctAt(w, 2.2, .95, -1.6, -.6, .45); gy(w, 0, .3, 1, -.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
