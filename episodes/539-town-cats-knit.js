// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat knitting by a fireplace with Gary and a ball of yarn beside it.

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
  w.floor = k.ground('#8E5B3A', 0);
  w.rug = cyl(2.4, 2.4, .02, mat('#1E8449'), [0, .01, .6], k.scene, 32); w.rug.castShadow = false;
  w.wall = box(40, 16, .3, mat('#F5CBA7'), [0, 8, -3]); w.wall.castShadow = false;
  w.fire = group(); box(2, 1.6, .5, mat('#7B7D7D'), [0, .8, 0], w.fire); box(1.2, .9, .1, mat('#1C1C1C'), [0, .55, .22], w.fire); for (let i = 0; i < 3; i++) cone(.18, .5, mat(['#F39C12', '#E74C3C', '#F7DC6F'][i], { glow: 2 }), [-.25 + i * .25, .35, .25], w.fire, 8); w.fire.position.set(-2.2, 0, -2.6);
  w.chair = group(); const cm = mat('#2874A6'); box(1.4, .5, 1.2, cm, [0, .45, 0], w.chair); box(1.4, 1, .25, cm, [0, 1, -.5], w.chair); w.chair.position.set(1.6, 0, -1.2);
  w.ball = ball(.25, mat('#E74C3C', { rough: .9 }), [0, 0, 0], k.scene);
  w.needles = group(); for (const z of [-.08, .08]) { const n = cyl(.02, .02, .8, mat('#D5DBDB'), [0, 0, z], w.needles, 6); n.rotation.z = (z > 0 ? 1 : -1) * .5; }
  w.scarf = group(); const sm = mat('#E74C3C', { rough: .9 }), st = mat('#FDFEFE', { rough: .9 }); for (let i = 0; i < 24; i++) { const b = box(.3, .06, .22, i % 3 ? sm : st, [0, 0, 0], w.scarf); b.userData.i = i; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.socks = []; w.g.userData.legs.forEach((l, i) => { const s = k.box(.07, .1, .07, mat(['#F1C40F', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22', '#E91E63'][i]), [0, 0, 0], w.g); w.socks.push(s); });
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const socksOn = (w, on) => { const xs = [-.18, -.18, 0, 0, .18, .18]; w.socks.forEach((s, i) => { s.visible = on; s.position.set(xs[i] + .05, .04, (i % 2 ? 1 : -1) * .38); }); };
// The scarf: first piece wraps Gary's neck, the rest trails along the floor behind him.
const scarf = (w, len, t) => { w.g.updateWorldMatrix(true, true); const n = w.g.localToWorld(w.g.position.clone().set(.25, .45, 0)); w.scarf.children.forEach(b => { const i = b.userData.i; b.visible = i < len; if (i === 0) { b.position.copy(n); b.scale.set(1.2, 1.5, 2.2); } else { b.position.set(n.x - .1 - i * .28, .04, n.z + Math.sin(i * .7 + t) * .08); b.scale.set(1, 1, 1); } }); };
const knit = (w, t) => { w.cr.updateWorldMatrix(true, true); const pp = w.c.paw.getWorldPosition(w.cr.position.clone()); w.needles.position.set(pp.x + .1, pp.y + .25, pp.z); w.needles.rotation.y = Math.sin(t * 10) * .3; };
const env = { sky: '#F5CBA7', lightAt: [2, 7, 6], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '539',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'KNITTING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CAN KNIT'],
  title: 'In this town, cats can knit (Gary the ant and the cat)',
  description: 'The cat made Gary a scarf. It was very long. Then the cat made six tiny socks. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'knitting', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: knitting cats are made up. Quiz fact: knitted socks dating from between the 3rd and 6th centuries AD have been discovered in Egyptian tombs (Encyclopaedia Britannica, "Stocking").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats can knit.',
      show: ['floor', 'rug', 'wall', 'fire', 'chair', 'g', 'ball', 'needles'], ...env,
      cam: { pos: [0, 3, 7.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 3, 7], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'scarf'); socksOn(w, false); ctAt(w, .6, 0, .2, -2.4, .5); w.c.paw.position.set(1.2, 1.2, .9); knit(w, t); w.ball.position.set(-.1, .25, 1.1); gy(w, -1.2, 0, 1.4, -.4, t); },
    },
    {
      say: 'The cat made Gary a scarf.',
      show: ['floor', 'rug', 'wall', 'fire', 'chair', 'g', 'scarf'], ...env,
      cam: { pos: [-.3, 2, 6.2], look: [-.3, 1, 0], fov: 50, to: { pos: [-.3, 2, 5.8], look: [-.3, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'ball', 'needles'); socksOn(w, false); w.cr.visible = false; gy(w, -.2, 0, 1.4, -.4, t); scarf(w, 2, t); },
    },
    {
      say: 'It was ten metres long.',
      show: ['floor', 'rug', 'wall', 'fire', 'chair', 'g', 'scarf'], ...env,
      cam: { pos: [-.4, 3.4, 8.5], look: [-.4, 1, 0], fov: 50, to: { pos: [-1, 3.4, 8.5], look: [-1, 1, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'ball', 'needles'); socksOn(w, false); ctAt(w, 1.2, 0, .2, -2.4, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); gy(w, .2, 0, 1.4, 0, t); scarf(w, 24, t); },
    },
    {
      say: 'Then the cat made six tiny socks.',
      show: ['floor', 'rug', 'wall', 'fire', 'chair', 'g', 'ball', 'needles'], ...env,
      cam: { pos: [0, 2.6, 6.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'scarf'); socksOn(w, p > .5); ctAt(w, .6, 0, .2, -2.4, .5); w.c.paw.position.set(1.2, 1.2, .9); knit(w, t); w.ball.position.set(-.1, .25, 1.1); w.ball.scale.setScalar(1 - p * .5); gy(w, -1.1, 0, 1.4, -.4, t); },
    },
    {
      say: 'One for each leg. So cozy.',
      show: ['floor', 'rug', 'wall', 'fire', 'chair', 'g', 'scarf'], ...env,
      cam: { pos: [-.3, 1.8, 6], look: [-.3, .9, 0], fov: 50, to: { pos: [-.3, 1.8, 5.6], look: [-.3, .9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'ball', 'needles'); socksOn(w, true); w.cr.visible = false; gy(w, -.2, 0, 1.4, -.4 + .3 * Math.sin(t * 2), t, true); scarf(w, 2, t); },
    },
    {
      say: 'Best thing to knit: a hat, mittens, or a blanket? Comment below.',
      quiz: { q: 'What is the best thing to knit?', options: ['A hat', 'Mittens', 'A blanket'], answer: 'Fun fact: knitted socks around 1,500 years old have been found in tombs in Egypt.' },
      show: ['floor', 'rug', 'wall', 'fire', 'chair', 'g', 'scarf'], sky: '#5DADE2', lightAt: [2, 7, 6], lightDist: 22,
      cam: { pos: [2.2, 2.6, 7.5], look: [0, 1.3, 0], fov: 48, to: { pos: [-2.2, 2.6, 7.5], look: [0, 1.3, 0] } },
      update: (w, p, t) => { hide(w, 'ball', 'needles'); socksOn(w, true); ctAt(w, 1, 0, .2, -2.4, .45); gy(w, -.8, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); scarf(w, 2, t); },
    },
  ],
};
