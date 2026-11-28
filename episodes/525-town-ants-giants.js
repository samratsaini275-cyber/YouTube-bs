// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows giant Gary walking down a street of tiny houses with the cat.

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
  w.car = group(); box(1, .4, .55, mat('#E74C3C'), [0, .35, 0], w.car); box(.55, .3, .5, mat('#D6EAF8'), [-.05, 1.9, 0], w.car); for (const x of [-.32, .32]) for (const z of [-.28, .28]) { const wh = cyl(.14, .14, .08, mat('#111111'), [x, .14, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.cake = group(); cyl(1.2, 1.2, .8, mat('#F5B7B1'), [0, .4, 0], w.cake, 24); cyl(.8, .8, .6, mat('#FDFEFE'), [0, 1.1, 0], w.cake, 24); ball(.2, mat('#C0392B'), [0, 1.55, 0], w.cake);
  w.g = gary(k, k.scene, 5, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 4) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); if (move) scurry(w.g, t, 10); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '525',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT GARY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'ANTS ARE GIANTS'],
  title: 'In this town, ants are giants',
  description: 'Gary\'s nap blocks the whole street. Snack time is a whole cake. And the cat uses Gary as a slide. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'funny', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: giant Gary is made up. Quiz fact: the South American giant ants of the genera Dinoponera and Paraponera are among the largest ants in the world (Haddad Junior et al., "Description of an injury in a human caused by a false tocandira (Dinoponera gigantea)...", Revista do Instituto de Medicina Tropical de São Paulo, 2005).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, ants are giants.',
      show: ['floor', 'road', 'houses', 'g'], ...env,
      cam: { pos: [0, 2.5, 15.5], look: [0, 1.9, 0], fov: 50, to: { pos: [0, 2.5, 15], look: [0, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'car', 'cake'); ctAt(w, 2.1, 0, 3, -.5, .4); gy(w, -.9, 0, 1, -.5, t, true); },
    },
    {
      say: 'Nap time? Gary blocks the whole street.',
      show: ['floor', 'road', 'houses', 'g', 'car'], ...env,
      cam: { pos: [1.5, 2.1, 15.5], look: [.8, 1.9, 0], fov: 50, to: { pos: [1.3, 2.1, 15], look: [.8, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'cake'); w.cr.visible = false; gy(w, -1, 0, 2, 0, t); w.g.scale.set(4, 3.5 + Math.sin(t * 2) * .15, 4); w.car.position.set(3.3, 0, 2.4); w.car.rotation.y = 0; },
    },
    {
      say: 'Snack time? A whole cake. One bite.',
      show: ['floor', 'road', 'houses', 'g', 'cake'], ...env,
      cam: { pos: [.4, 2.1, 15], look: [.4, 1.9, 0], fov: 50, to: { pos: [.4, 2.1, 14.5], look: [.4, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; hide(w, 'car'); gy(w, -1.6, 0, 1.5, 0, t); w.cake.position.set(2.6, 0, 1.5); w.cake.visible = p < .6; },
    },
    {
      say: 'The cat used Gary as a slide.',
      show: ['floor', 'road', 'houses', 'g'], ...env,
      cam: { pos: [0, 2.1, 15], look: [0, 1.9, 0], fov: 50, to: { pos: [0, 2.1, 14.5], look: [0, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'car', 'cake'); gy(w, 0, 0, 1.5, 0, t); const q = (p * 1.6) % 1; ctAt(w, 2 - q * 4.4, 2.8 - q * 2.8, 3.2, Math.PI, .3); w.cr.rotation.z = -.55; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.4); },
    },
    {
      say: 'Then the cat sneezed. Gary shrank back.',
      show: ['floor', 'road', 'houses', 'g'], ...env,
      cam: { pos: [0, 2.1, 14.5], look: [0, 1.9, 0], fov: 50, to: { pos: [0, 2.1, 14.5], look: [0, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'car', 'cake'); ctAt(w, 1.2, 0, 2, -2.2, .45); const sc = p < .4 ? 4 : Math.max(.5, 4 - (p - .4) * 16); gy(w, -1.4, 0, 2, -.4, t, false, sc); if (p > .3 && p < .45) w.c.head.rotation.z = .4; },
    },
    {
      say: 'Best giant snack: a cake, a melon, or a pie? Comment below.',
      quiz: { q: 'What is the best giant snack?', options: ['A cake', 'A melon', 'A pie'], answer: 'Made up. But real giant ants live in South America: Dinoponera ants are among the largest ants in the world.' },
      show: ['floor', 'road', 'houses', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [3, 3, 18], look: [0, 2.2, 0], fov: 48, to: { pos: [-3, 3, 18], look: [0, 2.2, 0] } },
      update: (w, p, t) => { hide(w, 'car', 'cake'); ctAt(w, 2.6, 0, 3, -2.4, .45); gy(w, -1.4, 0, 1, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
