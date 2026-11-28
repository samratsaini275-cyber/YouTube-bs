// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows Gary floating inside a giant bubble, the cat staring up at it.

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
  w.houses = group(); const cols = ['#F5B041', '#5DADE2', '#EC7063', '#F7DC6F', '#AF7AC5', '#58D68D'];
  for (let i = 0; i < 6; i++) { const h = group([-7.5 + i * 3, 0, -3.5], w.houses); box(1.8, 1.6, 1.6, mat(cols[i]), [0, .8, 0], h); const r = cone(1.5, 1, mat('#922B21'), [0, 2.1, 0], h, 4); r.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#6E2C00'), [0, .35, .82], h); box(.4, .4, .05, mat('#D6EAF8', { glow: .3 }), [.5, 1.1, .82], h); }
  w.fence = group(); const wood = mat('#FDFEFE'); for (let i = 0; i < 12; i++) box(.25, 1, .1, wood, [-4.4 + i * .8, .5, -1.5], w.fence); box(9.6, .12, .08, wood, [0, .75, -1.45], w.fence);
  const bm = () => { const m = mat('#D6EAF8', { glow: .3, rough: .05 }); m.transparent = true; m.opacity = .35; return m; };
  w.bubbles = group(); for (let i = 0; i < 6; i++) { const b = ball(.35 + (i % 3) * .15, bm(), [0, 0, 0], w.bubbles); b.castShadow = false; b.userData.i = i; }
  w.big = ball(.9, bm(), [0, 0, 0], k.scene); w.big.castShadow = false;
  w.pop = group(); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const d = ball(.05, mat('#AED6F1', { glow: 1 }), [0, 0, 0], w.pop); d.userData.d = [Math.cos(a), Math.sin(a)]; d.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const drift = (w, t) => w.bubbles.children.forEach(b => { const i = b.userData.i, q = (t * .15 + i * .19) % 1; b.position.set(-3 + i * 1.2 + Math.sin(t + i) * .3, .8 + q * 4, -.5 - (i % 2)); });
const inBubble = (w, x, y, z, t) => { w.big.position.set(x, y, z); w.big.scale.setScalar(1 + .03 * Math.sin(t * 5)); gy(w, x - .25, y - .45, z, -.4 + .3 * Math.sin(t * 2), t, true); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '533',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT BUBBLES',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'BUBBLES ARE HUGE'],
  title: 'In this town, bubbles are huge (Gary the ant and the cat)',
  description: 'Gary floated off inside a bubble. Over the fence, over the roof. Then the cat jumped. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'bubbles', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: giant bubbles are made up. Quiz fact: when white light shines on a soap film, bright bands of colour appear because different wavelengths of light interfere as they reflect from the two surfaces of the thin film (Encyclopaedia Britannica, "Light: Thin-film interference").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, bubbles are huge.',
      show: ['floor', 'houses', 'fence', 'bubbles', 'g', 'big'], ...env,
      cam: { pos: [0, 2.8, 8.5], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.8, 8], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pop'); drift(w, t); ctAt(w, 1.3, 0, .6, -.6, .45); w.c.head.rotation.z = .4; inBubble(w, -.1, 1 + Math.sin(t * 2) * .1, 1.6, t); },
    },
    {
      say: 'Gary floated off inside one.',
      show: ['floor', 'houses', 'fence', 'bubbles', 'g', 'big'], ...env,
      cam: { pos: [0, 2.2, 6], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.3, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'pop'); drift(w, t); w.cr.visible = false; inBubble(w, 0, 1.2 + p * 1.4, 1.2, t); },
    },
    {
      say: 'Over the fence. Over the roof.',
      show: ['floor', 'houses', 'fence', 'bubbles', 'g', 'big'], ...env,
      cam: { pos: [0, 3.6, 9], look: [0, 3, 0], fov: 50, to: { pos: [0, 3.6, 8.5], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pop'); drift(w, t); w.cr.visible = false; inBubble(w, -1.6 + p * 3, 2.4 + p * 1.2, -1.8, t); },
    },
    {
      say: 'The cat jumped after him.',
      show: ['floor', 'houses', 'fence', 'bubbles', 'g', 'big'], ...env,
      cam: { pos: [0, 3, 8.5], look: [0, 2.4, 0], fov: 50, to: { pos: [0, 3, 8], look: [0, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pop'); drift(w, t); const j = Math.sin(Math.min(1, p * 1.2) * Math.PI); ctAt(w, -.2, j * 2.2, .6, 0, .45); w.c.paw.position.set(1.3, 1.9, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.4); inBubble(w, .8, 3, .6, t); },
    },
    {
      say: 'Pop! The cat caught Gary.',
      show: ['floor', 'houses', 'fence', 'g', 'pop'], ...env,
      cam: { pos: [0, 2.6, 7.5], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.6, 7], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'big', 'bubbles'); const q = Math.min(1, p * 2.5); w.pop.visible = q < 1; w.pop.position.set(.2, 2.6, .6); w.pop.children.forEach(d => d.position.set(d.userData.d[0] * q * 1.4, d.userData.d[1] * q * 1.4, 0)); ctAt(w, .3, 0, .2, -.9, .5); w.c.paw.position.set(1.2, 1.4, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.cr.updateWorldMatrix(true, true); const pp = w.c.head.getWorldPosition(new w.c.root.position.constructor()); const top = pp.y + .6; const y = q < 1 ? 2.9 - q * (2.9 - top) : top; gy(w, pp.x - .2, y, pp.z, -.4, t); },
    },
    {
      say: 'Best bubble colour: purple, green, or silver? Comment below.',
      quiz: { q: 'What is the best bubble colour?', options: ['Purple', 'Green', 'Silver'], answer: 'Fun fact: bubbles look rainbow-coloured because light bounces off both sides of the thin soap film and the waves mix.' },
      show: ['floor', 'houses', 'fence', 'bubbles', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.4, 2.4, 7.5], look: [0, 1.4, 0], fov: 48, to: { pos: [-2.4, 2.4, 7.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'big', 'pop'); drift(w, t); ctAt(w, 1.2, 0, .4, -2.4, .45); gy(w, -.9, 0, 1.6, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
