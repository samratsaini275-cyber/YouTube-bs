// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 560 skunk tails.
// Hook: the premise as a question under 2 s; first frame shows a person with huge orange webbed duck feet.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

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

// Big orange webbed duck feet sticking out from under the person.
function duckFeet(k, p) { const org = k.mat('#F39C12', { rough: .6 }), dk = k.mat('#D35400'); p.feet = [-1, 1].map(s => { const f = k.group([s * .45, .05, .4], p.root); const pl = k.box(.8, .1, 1.3, org, [0, 0, .5], f); for (const x of [-.32, 0, .32]) { const t = k.box(.1, .12, 1.25, dk, [x, .02, .5], f); t.rotation.y = x * .4; } f.userData.s = s; return f; }); }
const flap = (p, t, sp = 8) => p.feet.forEach((f, i) => f.rotation.x = -.25 * Math.max(0, Math.sin(t * sp + i * Math.PI)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#FDEBD0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3498DB'); w.pp = w.p.root; duckFeet(k, w.p);
  w.shoe = group(); box(.45, .3, .9, mat('#E74C3C'), [0, .15, 0], w.shoe); box(.47, .08, .95, mat('#FDFEFE'), [0, .04, 0], w.shoe); box(.3, .02, .4, mat('#FDFEFE'), [0, .31, -.1], w.shoe);
  w.pool = group(); box(30, .1, 14, mat('#3FA9F5', { rough: .2 }), [0, .05, 0], w.pool);
  w.splash = group(); for (let i = 0; i < 8; i++) { const d = ball(.12, mat('#D6EAF8', { glow: .3 }), [0, 0, 0], w.splash); d.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry, y = 0) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.feet.forEach(f => f.rotation.set(0, 0, 0)); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FDEBD0', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '562',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DUCK FEET',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'DUCK FEET?'],
  title: 'What would happen if we had duck feet?',
  description: 'Shoe shopping gets impossible. Swimming gets amazing. And the cat finds a new bed. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'duck', 'feet', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human duck feet are made up. Quiz fact: waterfowl paddle their feet alternately when swimming slowly and use the whole leg when moving fast (Encyclopaedia Britannica, "Anseriform: Locomotion").'],
  setup,
  scenes: [
    { say: 'What if we had duck feet?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [2.6, 4.8, 8], look: [0, 3.3, 0], fov: 50, to: { pos: [2.4, 4.8, 7.4], look: [0, 3.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'shoe', 'pool', 'splash'); w.cr.visible = false; stand(w, 0, 0, .25); pose(w.p, .5); flap(w.p, t); w.p.mouth.scale.set(1.2, 1.8, 1); w.p.eyes.forEach(e => e.scale.set(1.2, 1.2, 1)); } },
    { say: 'Shoe shopping? Nothing fits.', show: ['floor', 'wall', 'pp', 'shoe'], ...env,
      cam: { pos: [2.4, 4, 7.4], look: [.2, 2, 0], fov: 50, to: { pos: [2.2, 3.8, 6.8], look: [.2, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pool', 'splash'); w.cr.visible = false; stand(w, -.3, 0, .2); w.p.eyes.forEach(e => e.scale.set(1, .6, 1)); w.p.arms[0].rotation.set(0, 0, -.2); w.p.arms[1].rotation.set(-.6, 0, .4); w.p.mouth.scale.set(.8, 1, 1); w.p.head.rotation.x = .3; w.shoe.position.set(1.4, 0, 1.2); w.shoe.rotation.y = -.3; } },
    { say: 'The pool? Fastest swimmer in town.', show: ['floor', 'wall', 'pp', 'pool', 'splash'], sky: '#AED6F1', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4, 7.4], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 4, 7], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'shoe'); w.cr.visible = false; const x = 2.4 - p * 4.8; stand(w, x, 0, -Math.PI / 2, -1.5); w.p.mouth.scale.set(1.4, 2, 1); w.p.arms.forEach((a, i) => a.rotation.set(t * 7 + i * Math.PI, 0, a.userData.s * .2)); w.splash.children.forEach(d => { const f = (t * 2 + d.userData.i / 8) % 1; d.position.set(x + 1 + f * 1.2, .15 + Math.sin(f * Math.PI) * .7, (d.userData.i % 3 - 1) * .4); }); } },
    { say: 'And the cat? Uses them as a bed.', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [2.8, 4.2, 7.4], look: [.3, 1.9, .6], fov: 50, to: { pos: [2.6, 4, 6.8], look: [.3, 1.8, .6], fov: 48 } },
      update: (w, p, t) => { hide(w, 'shoe', 'pool', 'splash'); stand(w, 0, 0, 0); pose(w.p, .3); w.p.head.rotation.x = .35; w.p.mouth.scale.set(1.2, .8, 1); ctAt(w, .7, .12, 1.3, .3, .28); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .2); w.c.body.scale.set(1.4, .85 + .05 * Math.sin(t * 2), 1); } },
    { say: 'Duck feet: cute, silly, or super useful? Comment below.',
      quiz: { q: 'Would you want duck feet?', options: ['Cute', 'Silly', 'Super useful'], answer: 'Fun fact: ducks paddle one foot at a time when they swim slowly.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.2, 4.4, 8.4], look: [0, 3.2, 0], fov: 50, to: { pos: [-1.2, 4.4, 8.4], look: [0, 3.2, 0] } },
      update: (w, p, t) => { hide(w, 'shoe', 'pool', 'splash', 'wall'); w.cr.visible = false; stand(w, 0, 0, 0); pose(w.p, .4); flap(w.p, t, 6); } },
  ],
};
