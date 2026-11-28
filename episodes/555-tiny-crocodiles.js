// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs.
// Hook: the premise as a question under 2 s; first frame shows a tiny green crocodile snapping in a hand.

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

function croc(k, parent) {
  const { mat, ball, box, group, cone } = k; const grn = mat('#3D7A3A', { rough: .7 }), wht = mat('#FDFEFE');
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(1, grn, [0, .45, 0], c.root); b.scale.set(1.8, .45, .7);
  for (let i = 0; i < 6; i++) cone(.1, .2, grn, [-1 + i * .4, .9, 0], c.root, 4);
  c.tail = group([1.6, .4, 0], c.root); const tl = cone(.35, 1.8, grn, [.9, 0, 0], c.tail, 8); tl.rotation.z = -Math.PI / 2;
  c.head = group([-1.7, .5, 0], c.root); box(.9, .25, .55, grn, [-.4, .05, 0], c.head); for (const z of [-.2, .2]) { ball(.12, grn, [.1, .25, z], c.head); ball(.06, mat('#F4D03F'), [.05, .3, z * 1.15], c.head); }
  c.jaw = group([0, -.08, 0], c.head); box(.9, .12, .5, grn, [-.4, -.06, 0], c.jaw); for (let i = 0; i < 5; i++) for (const z of [-.22, .22]) cone(.03, .1, wht, [-.8 + i * .17, .05, z], c.jaw, 4);
  for (let i = 0; i < 5; i++) for (const z of [-.24, .24]) { const tth = cone(.03, .1, wht, [-.8 + i * .17, -.12, z], c.head, 4); tth.rotation.x = Math.PI; }
  for (const x of [-.9, .9]) for (const z of [-.6, .6]) ball(.18, grn, [x, .15, z], c.root);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#EAF2E3'), [0, 10, -5], w.wall);
  w.cr2 = croc(k, k.scene); w.cc = w.cr2.root;
  w.p = person(k, k.scene, '#2874A6'); w.pp = w.p.root;
  w.puddle = cyl(1, 1, .02, mat('#5DADE2', { rough: .1, glow: .2 }), [0, .02, 0], k.scene, 32); w.puddle.castShadow = false;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const kput = (w, x, y, z, ry, s, t) => { w.cc.visible = true; w.cc.position.set(x, y, z); w.cc.rotation.set(0, ry, 0); w.cc.scale.setScalar(s); w.cr2.tail.rotation.y = .3 * Math.sin(t * 3); w.cr2.jaw.rotation.z = 0; };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#EAF2E3', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '555',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY CROCODILES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CROCODILES', 'WERE TINY?'],
  title: 'What would happen if crocodiles were tiny?',
  description: 'The scariest smile becomes a tiny grin. The swamp is one puddle. And the cat is finally the bigger one. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'crocodile', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: crocodiles this small are made up. Quiz fact: crocodiles are the largest present-day reptiles, and a Nile or estuarine (saltwater) crocodile about 6 metres long may live as long as 80 years (Encyclopaedia Britannica, "Crocodile").'],
  setup,
  scenes: [
    { say: 'What if crocodiles were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'puddle'); w.cr.visible = false; stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); kput(w, .95, 2.6, 1.6, Math.PI / 2 + .5, .14, t); w.cr2.jaw.rotation.z = -.3 * Math.abs(Math.sin(t * 3)); } },
    { say: 'The scariest smile? Now a tiny grin.', show: ['floor', 'wall'], ...env,
      cam: { pos: [.3, .9, 2.8], look: [0, .4, 0], fov: 42, to: { pos: [.3, .9, 2.5], look: [0, .4, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'puddle', 'pp'); w.cr.visible = false; kput(w, 0, 0, -.2, Math.PI / 2 - .35, .3, t); w.cr2.jaw.rotation.z = -.5 * Math.abs(Math.sin(t * 2)); } },
    { say: 'The swamp? One puddle.', show: ['floor', 'wall', 'puddle'], ...env,
      cam: { pos: [0, 1.6, 3.4], look: [0, .4, 0], fov: 44, to: { pos: [0, 1.6, 3], look: [0, .4, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'pp'); w.cr.visible = false; w.puddle.position.set(0, .02, 0); kput(w, Math.sin(t * .8) * .4, -.05, Math.cos(t * .8) * .2, t * .8 + Math.PI / 2, .25, t); } },
    { say: 'And the cat? Finally the bigger one.', show: ['floor', 'wall'], ...env,
      cam: { pos: [0, 1.8, 5.5], look: [0, 1, 0], fov: 48, to: { pos: [0, 1.8, 5], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'puddle', 'pp'); ctAt(w, .9, 0, -.3, -2.4, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.c.head.rotation.z = -.2; kput(w, -.4 - p * .4, 0, .9, -.3, .2, t); w.cr2.jaw.rotation.z = -.2; } },
    { say: 'Tiny crocodiles: cute, toothy, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny crocodile?', options: ['Cute', 'Toothy', 'Best pet ever'], answer: 'Made up. Real big crocodiles can live as long as 80 years.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .9, 4], look: [0, .6, 0], fov: 44, to: { pos: [-.5, .9, 4], look: [0, .6, 0] } },
      update: (w, p, t) => { hide(w, 'puddle', 'pp', 'wall'); w.cr.visible = false; kput(w, .3, 0, 0, -.6, .45, t); w.cr2.jaw.rotation.z = -.3 * Math.abs(Math.sin(t * 2)); } },
  ],
};
