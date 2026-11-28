// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat flying over the street with Gary on its back.

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
  w.clouds = group(); for (let i = 0; i < 4; i++) { const c = group([-6 + i * 4, 5 + (i % 2), -4], w.clouds); for (let j = 0; j < 3; j++) ball(.6 + (j % 2) * .2, mat('#FFFFFF', { glow: .2 }), [j * .7 - .7, 0, 0], c); }
  w.bird = group(); const blue = mat('#2E86C1'); ball(.18, blue, [0, 0, 0], w.bird); ball(.11, blue, [.18, .08, 0], w.bird); k.cone(.04, .12, mat('#F4D03F'), [.32, .08, 0], w.bird, 6).rotation.z = -Math.PI / 2;
  w.bird.wings = [box(.06, .02, .3, blue, [0, .05, .2], w.bird), box(.06, .02, .3, blue, [0, .05, -.2], w.bird)];
  w.puddle = cyl(1.4, 1.4, .03, mat('#5DADE2', { rough: .1 }), [0, .02, 2], k.scene, 24);
  w.drops = group(); for (let i = 0; i < 10; i++) { const d = ball(.08, mat('#AED6F1'), [0, 0, 0], w.drops); d.userData.a = i / 10 * Math.PI * 2; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
// Gary rides on the cat's back (cat faces +x, ry = 0).
const ride = (w, t, tilt = 0) => { const s = w.cr.scale.x, P = w.cr.position; w.g.position.set(P.x - 1.1 * s, P.y + 2.8 * s, P.z); w.g.rotation.set(0, 0, tilt); w.g.scale.setScalar(.75); w.g.userData.legs.forEach((l, i) => l.rotation.x = .2 * Math.sin(t * 20 + i)); };
const flap = (w, t) => { w.bird.wings.forEach((b, i) => b.rotation.x = (i ? -1 : 1) * .7 * Math.sin(t * 30)); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '526',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLYING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CAN FLY'],
  title: 'In this town, cats can fly (Gary the ant gets a ride)',
  description: 'Gary got a ride over the rooftops. Then the cat saw a bird. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'funny', 'flying', 'shorts'],
  sources: [
    'Comedy sketch: flying cats are made up. Quiz fact: the structure of a hummingbird\'s wing lets it fly forward, straight up and down, sideways and backward, and hover in front of flowers (Encyclopaedia Britannica, "Hummingbird").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats can fly.',
      show: ['floor', 'road', 'houses', 'clouds', 'g'], ...env,
      cam: { pos: [0, 3.3, 9], look: [0, 2.4, 0], fov: 50, to: { pos: [0, 3.3, 8.4], look: [0, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bird', 'puddle', 'drops'); ctAt(w, .4, .8 + Math.sin(t * 3) * .12, 1.5, 0, .42); w.c.paw.position.set(1.3, .9, .9); ride(w, t); },
    },
    {
      say: 'Gary got a ride over the rooftops.',
      show: ['floor', 'road', 'houses', 'clouds', 'g'], ...env,
      cam: { pos: [0, 4.4, 10], look: [0, 3.2, 0], fov: 50, to: { pos: [0, 4.4, 9.4], look: [0, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bird', 'puddle', 'drops'); ctAt(w, -2.5 + p * 4.5, 2.6 + Math.sin(t * 3) * .2, -1, 0, .45); w.c.paw.position.set(1.3, .9, .9); ride(w, t, -.1); },
    },
    {
      say: 'Then the cat saw a bird.',
      show: ['floor', 'road', 'houses', 'clouds', 'g', 'bird'], ...env,
      cam: { pos: [.2, 3, 7.4], look: [.2, 2.8, 0], fov: 50, to: { pos: [.2, 3, 6.8], look: [.2, 2.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'puddle', 'drops'); ctAt(w, -.4, 1.8 + Math.sin(t * 3) * .1, 0, 0, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.8 : 1.5); ride(w, t); w.bird.position.set(1.5 + Math.sin(t * 2) * .15, 3.1 + Math.sin(t * 5) * .15, 0); w.bird.rotation.y = Math.PI; flap(w, t); },
    },
    {
      say: 'Gary held on tight.',
      show: ['floor', 'road', 'houses', 'clouds', 'g', 'bird'], ...env,
      cam: { pos: [0, 3, 9], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3, 8.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'puddle', 'drops'); const a = t * 3; ctAt(w, Math.cos(a) * 1.1 + .2, 2.3 + Math.sin(a) * .7, 0, 0, .45); w.cr.rotation.z = Math.sin(a) * .4; w.c.paw.position.set(1.4, 1.3, .9); ride(w, t, Math.sin(a) * .4); w.g.position.y += .05; w.bird.position.set(2, 3.8 + Math.sin(t * 5) * .15, 0); w.bird.rotation.y = 0; flap(w, t); },
    },
    {
      say: 'The bird flew backwards. The cat landed in a puddle.',
      show: ['floor', 'road', 'houses', 'clouds', 'g', 'bird', 'puddle', 'drops'], ...env,
      cam: { pos: [0, 2.2, 8], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.2, 7.4], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { const q = Math.min(1, p / .5); w.bird.position.set(1.8 - q * 1.5, 3 + Math.sin(t * 5) * .1, 0); w.bird.rotation.y = 0; flap(w, t); ctAt(w, -.3, 1.6 * (1 - q), 1.6, 0, .45); w.cr.rotation.z = -.3 * (1 - q); w.puddle.position.set(-.6, .02, 1.6); if (q >= 1) { w.c.body.scale.set(1.5, .8, 1.1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); } ride(w, t); const sp = q >= 1 ? Math.min(1, (p - .5) * 4) : 0; w.drops.visible = sp > 0 && sp < 1; w.drops.children.forEach(d => d.position.set(-.6 + Math.cos(d.userData.a) * sp * 1.5, sp * (1 - sp) * 2.4, 1.6 + Math.sin(d.userData.a) * sp * .6)); },
    },
    {
      say: 'Best place to fly to: the moon, the beach, or the zoo? Comment below.',
      quiz: { q: 'Where is the best place to fly to?', options: ['The moon', 'The beach', 'The zoo'], answer: 'Made up. But real hummingbirds can fly backwards, sideways, and hover in one spot.' },
      show: ['floor', 'road', 'houses', 'clouds', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.5, 2.6, 9], look: [0, 2, 0], fov: 48, to: { pos: [-2.5, 2.6, 9], look: [0, 2, 0] } },
      update: (w, p, t) => { hide(w, 'bird', 'puddle', 'drops'); ctAt(w, .5, .7 + Math.sin(t * 3) * .2, 1, 0, .45); w.c.paw.position.set(1.3, .9, .9); ride(w, t); },
    },
  ],
};
