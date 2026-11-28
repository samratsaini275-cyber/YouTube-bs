// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows a night street with glowing jack-o'-lanterns, Gary in cat ears and the cat in Gary's hat.

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
  w.floor = k.ground('#2E4A2E', 0);
  w.road = box(40, .02, 2.4, mat('#2C2C34'), [0, .01, 2]); w.road.receiveShadow = true;
  w.houses = group(); const cols = ['#6C3483', '#1F618D', '#7B241C', '#B9770E', '#4A235A', '#196F3D'];
  for (let i = 0; i < 6; i++) { const h = group([-7.5 + i * 3, 0, -2.5], w.houses); box(1.8, 1.6, 1.6, mat(cols[i]), [0, .8, 0], h); const r = cone(1.5, 1, mat('#1C1C1C'), [0, 2.1, 0], h, 4); r.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#3E2723'), [0, .35, .82], h); box(.4, .4, .05, mat('#FFB74D', { glow: 1 }), [.5, 1.1, .82], h); }
  w.moon = ball(1, mat('#FDFEFE', { glow: 1 }), [3.5, 7, -6], k.scene);
  w.pumpkins = group(); for (let i = 0; i < 3; i++) { const p = group([-2.2 + i * 2.2, 0, .3], w.pumpkins); const b = ball(.4, mat('#E67E22'), [0, .32, 0], p); b.scale.y = .8; cyl(.04, .05, .15, mat('#1E8449'), [0, .7, 0], p, 6); for (const x of [-.13, .13]) cone(.07, .1, mat('#FFE082', { glow: 1.5 }), [x, .4, .37], p, 3).rotation.x = Math.PI / 2; box(.22, .05, .02, mat('#FFE082', { glow: 1.5 }), [0, .22, .39], p); }
  w.g = gary(k, k.scene, 1.3, null);
  w.gEars = group([.36, .58, 0], w.g); for (const z of [-.12, .12]) cone(.09, .2, mat('#F2A04A'), [0, .08, z], w.gEars, 4);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.cHat = group([-.1, 1.2, 0], w.c.head); const hat = k.mesh(new k.THREE.SphereGeometry(.8, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#FFC21F'), [0, 0, 0], w.cHat); hat.castShadow = false; for (const z of [-.3, .3]) seg(k, [.2, .4, z], [1, 1.6, z * 2.2], mat('#141414'), w.cHat, .06);
  w.bag = group(); box(.5, .6, .3, mat('#8E44AD'), [0, 0, 0], w.bag); w.candy = group([0, .45, 0], w.bag); for (let i = 0; i < 6; i++) ball(.09, mat(['#E74C3C', '#F1C40F', '#2ECC71'][i % 3], { glow: .4 }), [((i % 3) - 1) * .13, Math.floor(i / 3) * .1, 0], w.candy);
  w.crumb = ball(.07, mat('#D4A373'), [0, 0, 0], k.scene);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#141B33', lightAt: [2, 8, 6], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '531',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'ALWAYS HALLOWEEN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'IT\'S ALWAYS HALLOWEEN'],
  title: 'In this town, it\'s always Halloween (Gary the ant and the cat)',
  description: 'Gary dressed up as a cat. The cat dressed up as Gary. Trick or treat got Gary one crumb. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'halloween', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: endless Halloween is made up. Quiz fact: the jack-o\'-lantern custom began in the British Isles, where people carved large turnips or other vegetables; pumpkins were used later in America (Encyclopaedia Britannica, "Jack-o\'-lantern" and "Halloween").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, it\'s always Halloween.',
      show: ['floor', 'road', 'houses', 'moon', 'pumpkins', 'g'], ...env,
      cam: { pos: [0, 3, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [0, 3, 8], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bag', 'crumb'); w.gEars.visible = true; w.cHat.visible = true; ctAt(w, 1.1, 0, .6, -.5, .45); gy(w, -.6, 0, 2.2, -.6, t); },
    },
    {
      say: 'Gary dressed up as a cat.',
      show: ['floor', 'road', 'houses', 'moon', 'pumpkins', 'g'], ...env,
      cam: { pos: [-.3, 1.6, 6.2], look: [-.3, 1.1, 0], fov: 50, to: { pos: [-.3, 1.6, 5.8], look: [-.3, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bag', 'crumb'); w.gEars.visible = true; w.cr.visible = false; gy(w, -.5, 0, 1.6, -.6 + .4 * Math.sin(t * 3), t); },
    },
    {
      say: 'The cat dressed up as Gary.',
      show: ['floor', 'road', 'houses', 'moon', 'pumpkins', 'g'], ...env,
      cam: { pos: [.4, 2.8, 8], look: [.4, 1.6, 0], fov: 50, to: { pos: [.4, 2.8, 7.5], look: [.4, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bag', 'crumb'); w.cHat.visible = true; w.g.visible = false; ctAt(w, .6, 0, .8, -1.2 + .3 * Math.sin(t * 2), .5); w.c.head.rotation.z = .2; },
    },
    {
      say: 'Trick or treat? Gary got one crumb.',
      show: ['floor', 'road', 'houses', 'moon', 'pumpkins', 'g', 'crumb'], ...env,
      cam: { pos: [-.3, 1.6, 6], look: [-.3, 1, 0], fov: 50, to: { pos: [-.3, 1.6, 5.6], look: [-.3, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bag'); w.g.visible = true; w.gEars.visible = true; w.cr.visible = false; gy(w, -.6, 0, 1.6, -.4, t); w.crumb.position.set(.15, .12, 1.7); },
    },
    {
      say: 'So the cat shared the whole bag.',
      show: ['floor', 'road', 'houses', 'moon', 'pumpkins', 'g', 'bag'], ...env,
      cam: { pos: [.2, 2.6, 8], look: [.2, 1.3, 0], fov: 50, to: { pos: [.2, 2.6, 7.5], look: [.2, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'crumb'); w.g.visible = true; w.gEars.visible = true; w.cHat.visible = true; ctAt(w, 1, 0, .6, -2.2, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.bag.position.set(-.1, .3, 1.3); gy(w, -.8, 0, 1.4, -.3, t); w.candy.position.y = .45 + Math.abs(Math.sin(t * 4)) * .1; },
    },
    {
      say: 'Best costume: a ghost, a pirate, or a robot? Comment below.',
      quiz: { q: 'What is the best costume?', options: ['A ghost', 'A pirate', 'A robot'], answer: 'Fun fact: the first jack-o\'-lanterns were carved from turnips, not pumpkins.' },
      show: ['floor', 'road', 'houses', 'moon', 'pumpkins', 'g'], sky: '#274B73', lightAt: [2, 8, 6], lightDist: 22,
      cam: { pos: [2.2, 2.4, 7.5], look: [0, 1.5, 0], fov: 48, to: { pos: [-2.2, 2.4, 7.5], look: [0, 1.5, 0] } },
      update: (w, p, t) => { hide(w, 'bag', 'crumb'); w.g.visible = true; w.gEars.visible = true; w.cHat.visible = true; ctAt(w, 1, 0, .9, -2.4, .45); gy(w, -.8, 0, 1.6, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
