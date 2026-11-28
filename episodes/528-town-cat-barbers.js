// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat barber beside the chair with Gary sitting in it.

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
  w.floor = k.ground('#E8DCC8', 0);
  w.wall = box(40, 16, .3, mat('#7FB3D5'), [0, 8, -3]); w.wall.castShadow = false;
  w.tiles = group(); for (let i = -8; i <= 8; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) { const t = box(1, .01, 1, mat('#2C3E50'), [i, .005, j - 1.5], w.tiles); t.castShadow = false; }
  w.mirror = group(); box(2.4, 1.8, .06, mat('#D6EAF8', { glow: .5 }), [0, 2.6, -2.8], w.mirror); box(2.6, 2, .04, mat('#B9770E'), [0, 2.6, -2.84], w.mirror);
  w.pole = group(); cyl(.15, .15, 1.8, mat('#FDFEFE'), [0, 0, 0], w.pole, 16); for (let i = 0; i < 5; i++) { const b = cyl(.155, .155, .14, mat('#E74C3C'), [0, -.7 + i * .35, 0], w.pole, 16); b.rotation.z = .35; } ball(.2, mat('#2E86C1'), [0, 1, 0], w.pole); w.pole.position.set(-2.6, 2.4, -2.7);
  w.chair = group(); const red = mat('#C0392B'); box(1, .25, 1, red, [0, .9, 0], w.chair); box(1, 1, .2, red, [0, 1.5, -.45], w.chair); cyl(.12, .12, .8, mat('#AAB7B8'), [0, .4, 0], w.chair, 12); cyl(.5, .5, .08, mat('#AAB7B8'), [0, .04, 0], w.chair, 20);
  w.cape = cone(.55, .7, mat('#FDFEFE'), [0, 0, 0], k.scene, 16);
  w.tongue = ball(.25, mat('#F1948A'), [0, 0, 0], k.scene); w.tongue.scale.set(.5, .2, 1);
  w.shine = group(); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const r = box(.04, .35, .02, mat('#FFFFFF', { glow: 1.5 }), [Math.cos(a) * .9, Math.sin(a) * .9, 0], w.shine); r.rotation.z = a - Math.PI / 2; r.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, null);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#7FB3D5', lightAt: [2, 8, 6], lightDist: 24 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);
const shiny = (w, on) => w.g.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === '141414') { o.material.emissive && o.material.emissive.set(on ? '#3A3A3A' : '#000000'); o.material.roughness = on ? .05 : .4; o.material.metalness = on ? .6 : 0; } });

export default {
  id: '528',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAT BARBER',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS ARE BARBERS'],
  title: 'In this town, cats are barbers (Gary the ant gets a trim)',
  description: 'Gary went in for a trim. Small problem: Gary has no hair. The cat had a plan anyway. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'funny', 'barber', 'shorts'],
  sources: [
    'Comedy sketch: cat barbers are made up. Quiz fact: a cat\'s tongue is covered in hollow, claw-shaped papillae that wick saliva and carry it down into the fur when the cat grooms (Noel & Hu, "Cats use hollow papillae to wick saliva into fur", PNAS, 2018).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats are barbers.',
      show: ['floor', 'wall', 'tiles', 'mirror', 'pole', 'chair', 'g'], ...env,
      cam: { pos: [0, 3.6, 8], look: [0, 2.4, 0], fov: 50, to: { pos: [0, 3.6, 7.5], look: [0, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'cape', 'tongue', 'shine'); shiny(w, false); w.chair.position.set(-.4, 0, 0); ctAt(w, 1.4, 0, -.4, -2.6, .55); w.c.paw.position.set(1.2, 1.6 + Math.sin(t * 6) * .1, .9); gy(w, -.6, 1.02, .1, -.3, t); },
    },
    {
      say: 'In came Gary, for a trim.',
      show: ['floor', 'wall', 'tiles', 'mirror', 'pole', 'chair', 'g', 'cape'], ...env,
      cam: { pos: [0, 2.2, 5.5], look: [-.2, 1.6, 0], fov: 50, to: { pos: [0, 2.2, 5], look: [-.2, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'tongue', 'shine'); shiny(w, false); w.chair.position.set(-.4, 0, 0); w.cr.visible = false; gy(w, -.6, 1.02, .1, -.3, t); w.cape.position.set(-.55, 1.35, .15); },
    },
    {
      say: 'Small problem. Gary has no hair.',
      show: ['floor', 'wall', 'tiles', 'mirror', 'pole', 'chair', 'g', 'cape'], ...env,
      cam: { pos: [.4, 2.2, 6.5], look: [.2, 1.7, 0], fov: 50, to: { pos: [.4, 2.2, 6], look: [.2, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'tongue', 'shine'); shiny(w, false); w.chair.position.set(-.4, 0, 0); ctAt(w, 1.2, 0, -.2, -2.6, .55); w.c.head.rotation.z = .35; w.c.head.rotation.x = Math.sin(t * 2) * .2; gy(w, -.6, 1.02, .1, -.3, t); w.cape.position.set(-.55, 1.35, .15); },
    },
    {
      say: 'So the cat licked him shiny instead.',
      show: ['floor', 'wall', 'tiles', 'mirror', 'pole', 'chair', 'g', 'tongue'], ...env,
      cam: { pos: [.2, 2.2, 6], look: [.2, 1.7, 0], fov: 50, to: { pos: [.2, 2.2, 5.5], look: [.2, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'cape', 'shine'); shiny(w, p > .5); w.chair.position.set(-.4, 0, 0); ctAt(w, 1.4, 0, -.4, -2.8, .55); const l = Math.sin(t * 6); w.c.head.rotation.z = -.15 + l * .1; gy(w, -.6, 1.02, .1, -.3, t); w.tongue.position.set(.15 + l * .05, 1.55 + l * .12, .35); },
    },
    {
      say: 'Now Gary is the shiniest ant in town.',
      show: ['floor', 'wall', 'tiles', 'mirror', 'pole', 'chair', 'g', 'shine'], ...env,
      cam: { pos: [0, 2.4, 6.5], look: [-.2, 1.7, 0], fov: 50, to: { pos: [0, 2.4, 6], look: [-.2, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'cape', 'tongue'); shiny(w, true); w.chair.position.set(-.4, 0, 0); ctAt(w, 1.3, 0, -.4, -2.4, .55); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); gy(w, -.6, 1.02, .1, -.4 + .3 * Math.sin(t * 3), t); w.shine.position.set(-.4, 1.5, .3); w.shine.rotation.z = t; w.shine.scale.setScalar(1 + .1 * Math.sin(t * 8)); },
    },
    {
      say: 'Best haircut for these two: spiky, curly, or bald? Comment below.',
      quiz: { q: 'What is the best haircut?', options: ['Spiky', 'Curly', 'Bald'], answer: 'Fun fact: a cat\'s tongue has tiny hollow spines that soak up spit and spread it into the fur.' },
      show: ['floor', 'wall', 'tiles', 'mirror', 'pole', 'chair', 'g'], sky: '#5DADE2', lightAt: [2, 8, 6], lightDist: 24,
      cam: { pos: [2.2, 2.4, 7], look: [0, 1.5, 0], fov: 48, to: { pos: [-2.2, 2.4, 7], look: [0, 1.5, 0] } },
      update: (w, p, t) => { hide(w, 'cape', 'tongue', 'shine'); shiny(w, true); w.chair.position.set(-3.4, 0, -1); ctAt(w, 1.2, 0, -.2, -2.4, .55); gy(w, -.5, 0, .9, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
