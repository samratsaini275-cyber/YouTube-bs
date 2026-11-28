// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows Gary and the cat in a night bedroom, sock sleeping bag, calendar full of crossed-off days.

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
  w.floor = k.ground('#5B3A29', 0);
  w.rug = cyl(2.6, 2.6, .02, mat('#8E44AD'), [0, .01, .5], k.scene, 32); w.rug.castShadow = false;
  w.wallM = mat('#1B2A4A'); w.wall = box(40, 16, .3, w.wallM, [0, 8, -3]); w.wall.castShadow = false;
  w.win = group(); box(1.8, 1.6, .05, mat('#0B1D3A', { glow: .2 }), [0, 0, 0], w.win); ball(.3, mat('#FDFEFE', { glow: 1.2 }), [.4, .3, .05], w.win); box(1.9, .08, .06, mat('#F5F5F5'), [0, 0, .05], w.win); box(.08, 1.7, .06, mat('#F5F5F5'), [0, 0, .05], w.win); w.win.position.set(-1.6, 3, -2.8);
  w.door = group(); box(1.1, 2.2, .1, mat('#A0522D'), [0, 1.1, 0], w.door); ball(.07, mat('#F4D03F'), [.4, 1.1, .08], w.door); w.door.position.set(2.6, 0, -2.75);
  w.pillow = box(.9, .35, .6, mat('#FDFEFE'), [0, 0, 0], k.scene);
  w.torch = group(); cyl(.08, .1, .45, mat('#566573'), [0, 0, 0], w.torch, 12); w.beam = cone(.5, 1.3, mat('#FFF59D', { glow: 1 }), [0, .85, 0], w.torch, 16); w.beam.rotation.x = Math.PI; w.beam.material.transparent = true; w.beam.material.opacity = .35; w.beam.castShadow = false;
  w.bag = group(); const sock = mat('#E74C3C', { rough: .9 }); const b = cyl(.35, .35, 1.4, sock, [0, 0, 0], w.bag, 16); b.rotation.z = Math.PI / 2; for (let i = 0; i < 3; i++) { const st = cyl(.36, .36, .1, mat('#FDFEFE'), [-.4 + i * .4, 0, 0], w.bag, 16); st.rotation.z = Math.PI / 2; }
  w.cal = group(); box(.7, .8, .04, mat('#FDFEFE'), [0, 0, 0], w.cal); box(.7, .2, .05, mat('#C0392B'), [0, .32, 0], w.cal); w.calMarks = []; for (let i = 0; i < 6; i++) { const m = box(.18, .03, .06, mat('#111111'), [-.2 + (i % 3) * .2, .05 - Math.floor(i / 3) * .25, .01], w.cal); m.rotation.z = .7; w.calMarks.push(m); } w.cal.position.set(.4, 3.2, -2.8);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const marks = (w, n) => w.calMarks.forEach((m, i) => m.visible = i < n);
const env = { sky: '#1B2A4A', lightAt: [2, 7, 6], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '529',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SLEEPOVER TOWN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'NO ONE GOES HOME'],
  title: 'In this town, sleepovers never end (Gary the ant and the cat)',
  description: 'Night one: pillow fight. Night two: scary stories. Night three: Gary missed home. So the cat had an idea. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'sleepover', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: never-ending sleepovers are made up. Quiz fact: excised domestic cat larynges vibrated at purring frequencies of about 25 to 30 Hz without any nerve input; the cats\' vocal folds contain pads of connective tissue up to 4 mm across, which appear to allow such low sounds (Herbst et al., "Domestic cat larynges can produce purring frequencies without neural input", Current Biology, 2023).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, no one goes home.',
      show: ['floor', 'rug', 'wall', 'win', 'door', 'cal', 'g', 'bag'], ...env,
      cam: { pos: [0, 2.6, 7.5], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.6, 7], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pillow', 'torch'); marks(w, 6); ctAt(w, 1, 0, -.4, -2.4, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.bag.position.set(-.8, .35, .9); gy(w, -.15, .2, .9, -.4, t); },
    },
    {
      say: 'Night one: pillow fight. Winner: the pillow.',
      show: ['floor', 'rug', 'wall', 'win', 'door', 'cal', 'g', 'pillow'], ...env,
      cam: { pos: [0, 2.2, 6.5], look: [0, 1.5, 0], fov: 50, to: { pos: [0, 2.2, 6], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'torch', 'bag'); marks(w, 1); ctAt(w, 1.3, 0, -.3, -2.6, .5); const sw = Math.sin(t * 5); w.c.paw.position.set(1.2, 1.4 + sw * .4, .9); w.pillow.position.set(.4 + sw * .3, 1 + sw * .3, .2); w.pillow.rotation.set(0, 0, sw * .5); gy(w, -.6, 0, .8, -.4, t); if (p > .55) { w.g.rotation.z = Math.PI; w.g.position.set(-.3, 1.0, .8); } },
    },
    {
      say: 'Night two: scary stories. The cat told them.',
      show: ['floor', 'rug', 'wall', 'win', 'door', 'cal', 'g', 'torch'], sky: '#05080F', lightAt: [2, 7, 6], lightDist: 10,
      cam: { pos: [0, 1.8, 5.5], look: [.3, 1.4, 0], fov: 50, to: { pos: [0, 1.8, 5], look: [.3, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pillow', 'bag'); marks(w, 2); w.wallM.color.set('#0B111F'); ctAt(w, .9, 0, -.2, -2.3, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.4); w.torch.position.set(.95, .6, .7); w.torch.rotation.set(0, 0, .1); gy(w, -.7, 0, 1, -.4, t); w.g.position.x += Math.sin(t * 40) * .02; },
    },
    {
      say: 'Night three: Gary missed home.',
      show: ['floor', 'rug', 'wall', 'win', 'door', 'cal', 'g', 'bag'], ...env,
      cam: { pos: [-.2, 1.6, 5], look: [-.3, 1.2, 0], fov: 50, to: { pos: [-.2, 1.6, 4.6], look: [-.3, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pillow', 'torch'); marks(w, 3); w.wallM.color.set('#1B2A4A'); w.cr.visible = false; w.bag.position.set(-.4, .35, .6); gy(w, -.4, .65, .6, -.3, t); w.g.rotation.z = -.2; },
    },
    {
      say: 'So the cat carried Gary home. Then it stayed the night.',
      show: ['floor', 'rug', 'wall', 'win', 'door', 'cal', 'g'], ...env,
      cam: { pos: [.6, 2.4, 7.5], look: [.6, 1.8, 0], fov: 50, to: { pos: [.6, 2.4, 7], look: [.6, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pillow', 'torch', 'bag'); marks(w, 4); w.wallM.color.set('#1B2A4A'); const x = -1.4 + Math.min(1, p * 1.6) * 2; ctAt(w, x, 0, 0, 0, .5); w.c.paw.position.set(1.1, .6 + Math.abs(Math.sin(t * 6)) * .3, .9); w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); gy(w, hp.x - .15, hp.y + .55, hp.z, 0, t); },
    },
    {
      say: 'Best sleepover snack: popcorn, nachos, or cookies? Comment below.',
      quiz: { q: 'What is the best sleepover snack?', options: ['Popcorn', 'Nachos', 'Cookies'], answer: 'Fun fact: cats can purr so low partly thanks to tiny pads of tissue inside their vocal folds.' },
      show: ['floor', 'rug', 'wall', 'win', 'door', 'cal', 'g', 'bag'], sky: '#274B73', lightAt: [2, 7, 6], lightDist: 22,
      cam: { pos: [2.2, 2.4, 7], look: [0, 1.5, 0], fov: 48, to: { pos: [-2.2, 2.4, 7], look: [0, 1.5, 0] } },
      update: (w, p, t) => { hide(w, 'pillow', 'torch'); marks(w, 6); w.wallM.color.set('#1B2A4A'); ctAt(w, 1, 0, -.4, -2.4, .5); w.bag.position.set(-.9, .35, .9); gy(w, -.2, 0, 1, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
