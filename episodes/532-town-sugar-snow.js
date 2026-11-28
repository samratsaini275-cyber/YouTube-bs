// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows white sugar falling on a white street, Gary looking up, the cat beside him.

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
  w.floor = k.ground('#F8F9F9', 0);
  w.road = box(40, .02, 2.4, mat('#D5D8DC'), [0, .01, 2]); w.road.receiveShadow = true;
  w.houses = group(); const cols = ['#F5B041', '#5DADE2', '#EC7063', '#F7DC6F', '#AF7AC5', '#58D68D'];
  for (let i = 0; i < 6; i++) { const h = group([-7.5 + i * 3, 0, -2.5], w.houses); box(1.8, 1.6, 1.6, mat(cols[i]), [0, .8, 0], h); const r = cone(1.5, 1, mat('#FDFEFE'), [0, 2.1, 0], h, 4); r.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#6E2C00'), [0, .35, .82], h); box(.4, .4, .05, mat('#D6EAF8', { glow: .3 }), [.5, 1.1, .82], h); }
  w.flakes = group(); for (let i = 0; i < 40; i++) { const f = box(.07, .07, .07, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  w.man = group(); const sug = mat('#D6EAF8', { rough: .6 }); box(.56, .1, .56, mat('#E74C3C'), [0, 1.18, 0], w.man); box(.7, .7, .7, sug, [0, .35, 0], w.man); box(.5, .5, .5, sug, [0, .95, 0], w.man); box(.34, .34, .34, sug, [0, 1.37, 0], w.man); for (const z of [-.08, .08]) ball(.03, mat('#111111'), [.17, 1.42, z], w.man); cone(.04, .15, mat('#E67E22'), [.24, 1.36, 0], w.man, 6).rotation.z = -Math.PI / 2;
  w.pile = group(); for (let i = 0; i < 14; i++) box(.3, .3, .3, mat('#D6EAF8', { rough: .6 }), [((i * .37) % 1.2) - .6, .15 + Math.floor(i / 5) * .28, ((i * .53) % .6) - .3], w.pile);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const snow = (w, t) => w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .25 + i * .137) % 1; f.position.set(((i * 1.37) % 7) - 3.5, 5 - q * 5, ((i * .71) % 3) - .5); f.rotation.set(t + i, t * 2 + i, 0); });
const env = { sky: '#AED6F1', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '532',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SUGAR SNOW',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'IT SNOWS SUGAR'],
  title: 'In this town, it snows sugar (Gary the ant and the cat)',
  description: 'Gary built a sugar snowman. Then Gary ate the snowman. The cat was not impressed. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'sugar', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: sugar snow is made up. Quiz fact: white table sugar (sucrose) comes from either sugarcane or sugar beets (Encyclopaedia Britannica, "What\'s the Difference Between Cane Sugar and Beet Sugar?" and "Sucrose").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, it snows sugar.',
      show: ['floor', 'road', 'houses', 'flakes', 'g'], ...env,
      cam: { pos: [0, 2.8, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 2.8, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'man', 'pile'); snow(w, t); ctAt(w, 1.1, 0, .6, -.5, .45); w.c.head.rotation.z = .4; gy(w, -.6, 0, 2, -.6, t); w.g.rotation.z = .3; },
    },
    {
      say: 'Gary built a sugar snowman.',
      show: ['floor', 'road', 'houses', 'flakes', 'g', 'man'], ...env,
      cam: { pos: [0, 1.8, 6], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.8, 5.6], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pile'); snow(w, t); w.cr.visible = false; w.man.position.set(.4, 0, 1.2); w.man.scale.setScalar(1); gy(w, -.7, 0, 1.6, -.3, t, Math.sin(t * 2) > 0); },
    },
    {
      say: 'Then Gary ate the snowman.',
      show: ['floor', 'road', 'houses', 'flakes', 'g', 'man'], ...env,
      cam: { pos: [0, 1.8, 6], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.8, 5.6], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pile'); snow(w, t); w.cr.visible = false; const sc = Math.max(.02, 1 - p * 1.2); w.man.position.set(.4, 0, 1.2); w.man.scale.setScalar(sc); w.man.visible = sc > .03; gy(w, -.9, 0, 1.4, 0, t); w.g.scale.set(1.3, 1.3 + p * .4, 1.3 + p * .6); },
    },
    {
      say: 'The cat tried some. Nothing.',
      show: ['floor', 'road', 'houses', 'flakes', 'g'], ...env,
      cam: { pos: [.4, 3, 7.5], look: [.4, 1.5, 0], fov: 50, to: { pos: [.4, 3, 7], look: [.4, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'man', 'pile'); snow(w, t); ctAt(w, .9, 0, .4, -1.6, .5); w.c.head.rotation.x = .25; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .6 : .5); gy(w, -1, 0, 1.4, -.4, t); w.g.scale.set(1.3, 1.6, 1.8); },
    },
    {
      say: 'So the cat gave Gary its pile too.',
      show: ['floor', 'road', 'houses', 'flakes', 'g', 'pile'], ...env,
      cam: { pos: [.2, 2.4, 7], look: [.2, 1.5, 0], fov: 50, to: { pos: [.2, 2.4, 6.5], look: [.2, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'man'); snow(w, t); ctAt(w, 1.3, 0, .2, -2.2, .5); w.c.paw.position.set(1.3, .5, .9); w.pile.position.set(.4, 0, 1.4); gy(w, -1.1, 0, 1.6, -.2, t); w.g.scale.set(1.3, 1.6, 1.8); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Best sweet treat: candy floss, fudge, or lollipops? Comment below.',
      quiz: { q: 'What is the best sweet treat?', options: ['Candy floss', 'Fudge', 'Lollipops'], answer: 'Fun fact: white table sugar comes from two plants: sugarcane or sugar beets.' },
      show: ['floor', 'road', 'houses', 'flakes', 'g', 'pile'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.4, 2.4, 7.5], look: [0, 1.4, 0], fov: 48, to: { pos: [-2.4, 2.4, 7.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'man'); snow(w, t); ctAt(w, 1.2, 0, .4, -2.4, .45); w.pile.position.set(.1, 0, 1); gy(w, -.9, 0, 1.6, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
