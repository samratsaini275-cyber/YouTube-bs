// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs.
// Hook: the premise as a question under 2 s; first frame shows a tiny brown owl turning its head in a hand at night.

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

function owl(k, parent) {
  const { mat, ball, box, group, cone } = k; const br = mat('#8D6E63', { rough: .8 }), lt = mat('#D7CCC8');
  const o = { root: group([0, 0, 0], parent) };
  const b = ball(.8, br, [0, .9, 0], o.root); b.scale.set(.9, 1.1, .85); const be = ball(.6, lt, [0, .85, .35], o.root); be.scale.set(.9, 1.1, .5);
  o.head = group([0, 1.95, 0], o.root); ball(.6, br, [0, 0, 0], o.head); o.eyes = []; for (const x of [-.24, .24]) { ball(.22, mat('#FDFEFE'), [x, .05, .45], o.head); const pu = ball(.12, mat('#111111'), [x, .05, .62], o.head); o.eyes.push(pu); ball(.06, mat('#F39C12'), [x, .2, .6], o.head); }
  cone(.08, .2, mat('#F39C12'), [0, -.15, .58], o.head, 6).rotation.x = Math.PI / 2 + .3; for (const x of [-.35, .35]) cone(.12, .3, br, [x, .55, 0], o.head, 4);
  o.wings = [-1, 1].map(s => { const w = box(.15, .9, .6, br, [s * .75, .9, 0], o.root); w.rotation.z = s * .1; return w; });
  for (const x of [-.2, .2]) cone(.08, .15, mat('#F39C12'), [x, .05, .2], o.root, 4);
  return o;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#C8A27A', .01);
  w.wall = group(); box(40, 20, .5, mat('#1B2A4A'), [0, 10, -5], w.wall);
  w.o = owl(k, k.scene); w.oo = w.o.root;
  w.p = person(k, k.scene, '#7D3C98'); w.pp = w.p.root;
  w.pencil = group(); const pc = cyl(.06, .06, 2, mat('#F4D03F'), [0, 1, 0], w.pencil, 6); cone(.06, .2, mat('#F5CBA7'), [0, 2.1, 0], w.pencil, 6); cyl(.065, .065, .15, mat('#F1948A'), [0, 0, 0], w.pencil, 6);
  w.moon = ball(.6, mat('#FDFEFE', { glow: 1 }), [2.2, 5, -4.5], k.scene);
  w.hoots = group(); for (let i = 0; i < 3; i++) { const h = ball(.04, mat('#FDFEFE', { glow: 1 }), [0, 0, 0], w.hoots); h.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const oput = (w, x, y, z, ry, s) => { w.oo.visible = true; w.oo.position.set(x, y, z); w.oo.rotation.set(0, ry, 0); w.oo.scale.setScalar(s); w.o.head.rotation.set(0, 0, 0); w.o.wings.forEach((g, i) => g.rotation.z = (i ? 1 : -1) * .1); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#1B2A4A', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '559',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY OWLS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF OWLS', 'WERE TINY?'],
  title: 'What would happen if owls were tiny?',
  description: 'The spooky hoot becomes a hiccup. Night watch happens from the top of a pencil. And the cat makes a new friend. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'owl', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: owls this small are made up. Quiz fact: owls\' eyes are tube-shaped, which gives them excellent vision but makes it impossible for the eyes to move in their sockets (Encyclopaedia Britannica, "Owl Quiz"; see also Britannica, "Eye: birds").'],
  setup,
  scenes: [
    { say: 'What if owls were tiny?', show: ['floor', 'wall', 'pp', 'moon'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'pencil', 'hoots'); w.cr.visible = false; stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); oput(w, .95, 2.62, 1.6, -.4, .15); w.o.head.rotation.y = .6 * Math.sin(t * 1.5); } },
    { say: 'The spooky hoot? More like a hiccup.', show: ['floor', 'wall', 'hoots', 'moon'], ...env,
      cam: { pos: [0, 1.2, 3.2], look: [0, .9, 0], fov: 42, to: { pos: [0, 1.2, 2.8], look: [0, .9, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'pp', 'pencil'); w.cr.visible = false; oput(w, 0, 0, 0, 0, .45); const hic = Math.sin(t * 5) > .7; w.oo.position.y = hic ? .1 : 0; w.o.head.rotation.x = hic ? -.2 : 0; w.hoots.children.forEach(h => { const q = (t * .8 + h.userData.i / 3) % 1; h.position.set(.2 + q * .4, 1.1 + q * .5, .3); }); } },
    { say: 'Night watch? From the top of a pencil.', show: ['floor', 'wall', 'pencil', 'moon'], ...env,
      cam: { pos: [0, 2, 3.6], look: [0, 1.8, 0], fov: 44, to: { pos: [0, 2, 3.2], look: [0, 1.8, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'pp', 'hoots'); w.cr.visible = false; w.pencil.position.set(0, 0, 0); oput(w, 0, 2.18, 0, 0, .25); w.o.head.rotation.y = 1.2 * Math.sin(t * 1.2); } },
    { say: 'And the cat? Made a new friend.', show: ['floor', 'wall', 'moon'], ...env,
      cam: { pos: [0, 1.8, 5.5], look: [0, 1.1, 0], fov: 48, to: { pos: [0, 1.8, 5], look: [0, 1.1, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pp', 'pencil', 'hoots'); ctAt(w, .4, 0, -.3, -2.2, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); oput(w, hp.x - .1, hp.y + .55, hp.z, .3, .22); w.o.wings.forEach((g, i) => g.rotation.z = (i ? 1 : -1) * (.1 + .4 * Math.abs(Math.sin(t * 6)))); } },
    { say: 'Tiny owls: cute, wise, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny owl?', options: ['Cute', 'Wise', 'Best pet ever'], answer: 'Fun fact: owl eyes are tube-shaped, so they cannot move in their sockets. Owls turn their heads instead.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .8, 4.4], look: [0, 1.2, 0], fov: 44, to: { pos: [-.5, .8, 4.4], look: [0, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'pp', 'pencil', 'hoots', 'wall', 'moon'); w.cr.visible = false; oput(w, 0, 0, 0, 0, .55); w.o.head.rotation.y = .6 * Math.sin(t * 1.5); } },
  ],
};
