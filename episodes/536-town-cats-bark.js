// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the orange cat barking (sound rings) on a street with Gary beside it.

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
  const w = { k };
  w.floor = k.ground('#7DBE5A', 0);
  w.road = box(40, .02, 2.4, mat('#4D5656'), [0, .01, 2]); w.road.receiveShadow = true;
  w.houses = group(); const cols = ['#F5B041', '#5DADE2', '#EC7063', '#F7DC6F', '#AF7AC5', '#58D68D'];
  for (let i = 0; i < 6; i++) { const h = group([-7.5 + i * 3, 0, -2.5], w.houses); box(1.8, 1.6, 1.6, mat(cols[i]), [0, .8, 0], h); const r = cone(1.5, 1, mat('#922B21'), [0, 2.1, 0], h, 4); r.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#6E2C00'), [0, .35, .82], h); box(.4, .4, .05, mat('#D6EAF8', { glow: .3 }), [.5, 1.1, .82], h); }
  w.rings = group(); for (let i = 0; i < 3; i++) { const r = k.torus ? k.torus(.3 + i * .25, .04, mat('#FDFEFE', { glow: 1 }), [0, 0, 0], w.rings) : ball(.1, mat('#FDFEFE', { glow: 1 }), [0, 0, 0], w.rings); r.userData.i = i; r.castShadow = false; }
  w.leaf = ball(.25, mat('#E67E22'), [0, 0, 0], k.scene); w.leaf.scale.set(1, .1, .6);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.d = cat(k, k.scene); w.d.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = mat('#8D6E63', { rough: .85 }); }); const snout = ball(.55, mat('#6D4C41'), [1.2, -.4, 0], w.d.head); snout.scale.set(1.4, .8, .9); ball(.2, mat('#111111'), [1.9, -.25, 0], w.d.head); const tg = box(.3, .05, .25, mat('#F1948A'), [1.6, -.85, 0], w.d.head); tg.rotation.z = -.5; for (const z of [-.75, .75]) { const ear = ball(.4, mat('#4E342E'), [-.1, .3, z], w.d.head); ear.scale.set(.6, 1.4, .3); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const put = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
// Sound rings coming out of a mouth (c = cat or dog), pulsing outward.
const bark = (w, c, t, on = true) => { w.rings.visible = on; if (!on) return; c.root.updateWorldMatrix(true, true); const m = c.head.localToWorld(new w.k.THREE.Vector3(1.4, -.3, 0)); w.rings.position.copy(m); w.rings.rotation.set(0, c.root.rotation.y + Math.PI / 2, 0); w.rings.children.forEach(r => { const q = (t * 2 + r.userData.i / 3) % 1; r.scale.setScalar(.5 + q * 1.2); r.position.set(0, 0, 0); }); c.head.rotation.z = .15 * Math.abs(Math.sin(t * 8)); };
const env = { sky: '#87CEEB', lightAt: [3, 10, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '536',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BARKING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS GO WOOF'],
  title: 'In this town, cats bark (Gary the ant and the cat)',
  description: 'The cat barked at a leaf. Gary tried to teach it to purr. Then a dog walked by. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'dog', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: barking cats are made up. Quiz fact: domestic dogs bark far more often and in many more situations than wolves, and spectrographic analysis shows that the structure of a dog\'s bark varies predictably with the context (Yin, "A new perspective on barking in dogs (Canis familiaris)", Journal of Comparative Psychology, 2002).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats go woof.',
      show: ['floor', 'road', 'houses', 'g', 'rings'], ...env,
      cam: { pos: [0, 3.6, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 3.6, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'leaf'); w.d.root.visible = false; put(w.c, -.4, 0, .6, -.3, .5); bark(w, w.c, t); gy(w, 1.2, 0, 1.6, -2.4, t); w.g.rotation.z = .2; },
    },
    {
      say: 'The cat barked at a leaf.',
      show: ['floor', 'road', 'houses', 'g', 'rings', 'leaf'], ...env,
      cam: { pos: [.4, 2.4, 7], look: [.4, 1.4, 0], fov: 50, to: { pos: [.4, 2.4, 6.5], look: [.4, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.d.root.visible = false; put(w.c, -.6, 0, .6, -.1, .5); bark(w, w.c, t); w.leaf.position.set(1.5, .05, 1); w.leaf.rotation.y = t; w.g.visible = false; },
    },
    {
      say: 'Gary tried to teach it to purr.',
      show: ['floor', 'road', 'houses', 'g'], ...env,
      cam: { pos: [.2, 2, 6.5], look: [.2, 1.3, 0], fov: 50, to: { pos: [.2, 2, 6], look: [.2, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'leaf', 'rings'); w.d.root.visible = false; w.g.visible = true; put(w.c, -.8, 0, .2, -.2, .5); w.c.head.rotation.z = .3; gy(w, .9, 0, 1.2, -2.6 + .3 * Math.sin(t * 3), t); w.g.rotation.z = .15 * Math.sin(t * 6); },
    },
    {
      say: 'The cat said: woof.',
      show: ['floor', 'road', 'houses', 'g', 'rings'], ...env,
      cam: { pos: [.2, 2, 6.5], look: [.2, 1.3, 0], fov: 50, to: { pos: [.2, 2, 6], look: [.2, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'leaf'); w.d.root.visible = false; w.g.visible = true; put(w.c, -.8, 0, .2, -.2, .5); bark(w, w.c, t, p > .3); gy(w, .9, 0, 1.2, -2.6, t); if (p > .4) { w.g.rotation.z = Math.PI; w.g.position.y = .55; } },
    },
    {
      say: 'Then a dog walked by. It said: meow.',
      show: ['floor', 'road', 'houses', 'g'], ...env,
      cam: { pos: [.4, 2.6, 8], look: [.4, 1.6, 0], fov: 50, to: { pos: [.4, 2.6, 7.5], look: [.4, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'leaf', 'rings'); w.g.visible = true; put(w.c, -1.2, 0, .2, -.2, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); const x = 3.4 - Math.min(1, p * 1.6) * 2.4; put(w.d, x, 0, 1, Math.PI, .55); w.d.paw.position.set(.8, .5 + Math.abs(Math.sin(t * 6)) * .2, .9); if (p > .7) w.d.head.rotation.z = .2; gy(w, -.1, 0, 1.6, -.5, t); },
    },
    {
      say: 'Best pet sound: a purr, a woof, or a chirp? Comment below.',
      quiz: { q: 'What is the best pet sound?', options: ['A purr', 'A woof', 'A chirp'], answer: 'Fun fact: dogs bark far more often than wolves, and a bark sounds different depending on the situation.' },
      show: ['floor', 'road', 'houses', 'g'], sky: '#5DADE2', lightAt: [3, 10, 8], lightDist: 30,
      cam: { pos: [2.4, 2.4, 7.5], look: [0, 1.4, 0], fov: 48, to: { pos: [-2.4, 2.4, 7.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'leaf', 'rings'); w.g.visible = true; put(w.c, 1, 0, .4, -2.4, .45); put(w.d, -1.8, 0, -.2, -.5, .45); gy(w, -.3, 0, 1.6, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
