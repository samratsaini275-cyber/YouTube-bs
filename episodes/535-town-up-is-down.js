// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows Gary walking on the ceiling and the cat clinging to it beside him.

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
  w.floor = k.ground('#C8A27A', 0);
  w.wall = box(40, 16, .3, mat('#A9CCE3'), [0, 8, -3]); w.wall.castShadow = false;
  w.ceil = box(40, .3, 10, mat('#F4F6F7'), [0, 3.35, 0]); w.ceil.castShadow = false;
  w.lamp = group(); cyl(.02, .02, .5, mat('#333333'), [0, -.25, 0], w.lamp, 6); w.shade = cone(.35, .3, mat('#F7DC6F', { glow: .6 }), [0, -.6, 0], w.lamp, 16); w.lamp.position.set(-1.5, 3.2, 0);
  w.pic = group(); box(1, .7, .05, mat('#5DADE2'), [0, 0, 0], w.pic); box(1.1, .8, .03, mat('#8E5B2B'), [0, 0, -.03], w.pic); ball(.12, mat('#F4D03F', { glow: .5 }), [.2, .15, .03], w.pic); w.pic.position.set(1.4, 2.3, -2.8);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const CEIL = 3.2;
const gyUp = (w, x, z, ry, t, move = false) => { w.g.position.set(x, CEIL, z); w.g.rotation.set(Math.PI, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const ctUp = (w, x, z, ry, s, sway) => { ctAt(w, x, CEIL, z, ry, s); w.cr.rotation.set(Math.PI + sway, ry, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); };
const env = { sky: '#A9CCE3', lightAt: [2, 3.5, 6], lightDist: 20 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '535',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'UPSIDE DOWN TOWN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'UP IS DOWN'],
  title: 'In this town, up is down (Gary the ant and the cat)',
  description: 'Gary walked on the ceiling. Easy. The cat? Not so easy. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'upsidedown', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: an upside-down town is made up. Quiz fact: Asian weaver ants (Oecophylla smaragdina) walking upside down on a smooth surface used only about 14% of the maximum contact area of their sticky foot pads; carrying weights of about 6 times their body weight, they used about 60% (Federle & Endlein, "Locomotion and adhesion: dynamic control of adhesive surface contact in ants", Arthropod Structure & Development, 2004).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, up is down.',
      show: ['floor', 'wall', 'ceil', 'lamp', 'pic', 'g'], ...env,
      cam: { pos: [0, 3.1, 8.5], look: [0, 2.9, 0], fov: 52, to: { pos: [0, 3.1, 8], look: [0, 2.9, 0], fov: 50 } },
      update: (w, p, t) => { w.lamp.rotation.set(0, 0, 0); w.lamp.position.set(-1.5, 3.2, 0); ctUp(w, 1.2, -.2, -.4, .45, Math.sin(t * 3) * .1); gyUp(w, -.4, 1, -.4, t, true); },
    },
    {
      say: 'Gary walked on the ceiling. Easy.',
      show: ['floor', 'wall', 'ceil', 'lamp', 'pic', 'g'], ...env,
      cam: { pos: [0, 2, 7], look: [0, 2.2, 0], fov: 50, to: { pos: [0, 2, 6.5], look: [0, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; gyUp(w, -1 + p * 1.6, 1.2, 0, t, true); },
    },
    {
      say: 'The cat? Not so easy.',
      show: ['floor', 'wall', 'ceil', 'lamp', 'pic', 'g'], ...env,
      cam: { pos: [.4, 2, 8.5], look: [.4, 2, 0], fov: 50, to: { pos: [.4, 2, 8], look: [.4, 2, 0], fov: 48 } },
      update: (w, p, t) => { ctUp(w, .6, .2, -.6, .5, Math.sin(t * 4) * .25); w.c.paw.position.set(.9, -.1 + Math.sin(t * 8) * .1, .9); gyUp(w, -1.2, 1.3, -.3, t); },
    },
    {
      say: 'Then the cat let go.',
      show: ['floor', 'wall', 'ceil', 'lamp', 'pic', 'g'], ...env,
      cam: { pos: [.4, 2.2, 7], look: [.4, 2.2, 0], fov: 52, to: { pos: [.4, 2.2, 6.6], look: [.4, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { const f = Math.min(1, Math.max(0, (p - .2) / .6)); if (f <= 0) ctUp(w, .6, .2, -.6, .5, .2); else { const y = CEIL - f * f * CEIL; ctAt(w, .6, Math.max(0, y), .2, -.6, .5); w.cr.rotation.set(Math.PI * (1 - f), -.6, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); } gyUp(w, -1.2, 1.3, -.3, t); },
    },
    {
      say: 'It landed on its feet. On the floor.',
      show: ['floor', 'wall', 'ceil', 'lamp', 'pic', 'g'], ...env,
      cam: { pos: [.4, 2.2, 7], look: [.4, 2.1, 0], fov: 52, to: { pos: [.4, 2.2, 6.6], look: [.4, 2.1, 0], fov: 50 } },
      update: (w, p, t) => { ctAt(w, .6, 0, .2, -.6, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.c.head.rotation.z = .2; gyUp(w, -.6, 1, -.3 + .3 * Math.sin(t * 3), t); },
    },
    {
      say: 'Best way to walk: upside down, sideways, or backwards? Comment below.',
      quiz: { q: 'What is the best way to walk?', options: ['Upside down', 'Sideways', 'Backwards'], answer: 'Fun fact: weaver ants walking upside down use only about 14 percent of their sticky foot pads.' },
      show: ['floor', 'wall', 'ceil', 'lamp', 'pic', 'g'], sky: '#5DADE2', lightAt: [2, 3.5, 6], lightDist: 20,
      cam: { pos: [2, 2.2, 7.5], look: [0, 2.2, 0], fov: 50, to: { pos: [-2, 2.2, 7.5], look: [0, 2.2, 0] } },
      update: (w, p, t) => { ctAt(w, .8, 0, .2, -2.4, .5); gyUp(w, -.6, 1, -.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
