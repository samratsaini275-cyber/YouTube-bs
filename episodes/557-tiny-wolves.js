// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs.
// Hook: the premise as a question under 2 s; first frame shows a tiny grey wolf howling in a hand.

function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#C98A4B', { rough: .8 }), dark = mat('#7A4A22');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(.8, brown, [0, 1.1, 0], d.body); b.scale.set(1.5, .8, .9);
  d.head = group([-1.2, 1.7, 0], d.body);
  ball(.6, brown, [0, 0, 0], d.head); box(.55, .35, .45, brown, [-.55, -.15, 0], d.head);
  ball(.12, mat('#222222'), [-.85, -.05, 0], d.head);
  d.mouth = box(.35, .06, .3, mat('#7A2A2A'), [-.6, -.36, 0], d.head);
  for (const z of [-.25, .25]) { ball(.12, mat('#FFFFFF'), [-.4, .2, z * 1.3], d.head); ball(.06, mat('#111111'), [-.48, .2, z * 1.45], d.head); }
  d.ears = [-1, 1].map(s => { const e = box(.18, .5, .3, dark, [.1, .1, s * .55], d.head); e.rotation.x = s * .3; return e; });
  d.legs = [];
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) d.legs.push(cyl(.14, .14, .7, brown, [x, .35, z], d.body, 8));
  d.tail = cyl(.07, .07, .7, brown, [1.3, 1.5, 0], d.body, 6); d.tail.rotation.z = -.8;
  return d;
}
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

// A wolf is the dog model in grey, with tall pointed ears and a bushy tail.
function wolf(k, parent) { const d = dog(k, parent); const grey = k.mat('#8E9AA6', { rough: .85 }); d.root.traverse(o => { if (o.material && o.material.color && ['c98a4b', '7a4a22'].includes(o.material.color.getHexString())) o.material = grey; }); d.ears.forEach((e, i) => { e.visible = false; const c = k.cone(.18, .5, grey, [.05, .55, (i ? 1 : -1) * .28], d.head, 4); }); d.tail.scale.set(2.2, 1.1, 2.2); return d; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#2E4A2E', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#1B2A4A'), [0, 10, -5], w.wall);
  w.wolves = []; for (let i = 0; i < 4; i++) w.wolves.push(wolf(k, k.scene));
  w.p = person(k, k.scene, '#34495E'); w.pp = w.p.root;
  w.lamp = group(); cyl(.3, .4, .5, mat('#F7DC6F', { glow: 1.4 }), [0, .25, 0], w.lamp, 16); cyl(.08, .1, .1, mat('#7F8C8D'), [0, 0, 0], w.lamp, 8);
  w.box = group(); box(1.4, .6, .9, mat('#E74C3C'), [0, .3, 0], w.box); box(1.4, .05, .9, mat('#C0392B'), [0, .62, -.45], w.box).rotation.x = -1.1; box(.4, .08, .08, mat('#7F8C8D'), [0, .7, 0], w.box);
  w.notes = group(); for (let i = 0; i < 3; i++) { const n = ball(.04, mat('#FDFEFE', { glow: 1 }), [0, 0, 0], w.notes); n.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const wput = (d, x, y, z, ry, s) => { d.root.visible = true; d.root.position.set(x, y, z); d.root.rotation.set(0, ry, 0); d.root.scale.setScalar(s); d.legs.forEach(l => l.rotation.z = 0); d.head.rotation.set(0, 0, 0); d.mouth.scale.set(1, 1, 1); };
const howl = (d, t) => { d.head.rotation.z = -.7; d.mouth.scale.set(1, 3 + Math.sin(t * 6), 1); };
const noWolves = (w, from = 0) => w.wolves.forEach((d, i) => { if (i >= from) d.root.visible = false; });
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#1B2A4A', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '557',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY WOLVES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WOLVES', 'WERE TINY?'],
  title: 'What would happen if wolves were tiny?',
  description: 'Howling at the moon becomes howling at a night light. The whole pack fits in a lunchbox. And the big bad wolf is scared of the cat. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'wolf', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: wolves this small are made up. Quiz fact: the gray wolf (Canis lupus) is the largest wild member of the dog family, Canidae (Encyclopaedia Britannica, "Gray wolf").'],
  setup,
  scenes: [
    { say: 'What if wolves were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'lamp', 'box', 'notes'); w.cr.visible = false; noWolves(w, 1); stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); wput(w.wolves[0], .95, 2.62, 1.6, Math.PI / 2 + .5, .2); howl(w.wolves[0], t); } },
    { say: 'Howling at the moon? More like a night light.', show: ['floor', 'wall', 'lamp', 'notes'], sky: '#0B111F', lightAt: [0, 4, 4], lightDist: 10,
      cam: { pos: [.3, 1, 3.8], look: [.2, .6, 0], fov: 42, to: { pos: [.3, 1, 3.5], look: [.2, .6, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'pp', 'box'); w.cr.visible = false; noWolves(w, 1); w.lamp.position.set(.6, 0, -.3); wput(w.wolves[0], -.3, 0, .2, Math.PI - .5, .3); howl(w.wolves[0], t); w.notes.children.forEach(n => { const q = (t * .8 + n.userData.i / 3) % 1; n.position.set(-.5 + q * .4, .75 + q * .5, .3); }); } },
    { say: 'The whole wolf pack? Fits in a lunchbox.', show: ['floor', 'wall', 'box'], ...env,
      cam: { pos: [0, 1.6, 3.4], look: [0, .6, 0], fov: 44, to: { pos: [0, 1.6, 3], look: [0, .6, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'pp', 'lamp', 'notes'); w.cr.visible = false; w.box.position.set(0, 0, 0); w.wolves.forEach((d, i) => { wput(d, -.45 + i * .3, .58, .05 * (i % 2), Math.PI / 2 + (i - 1.5) * .3, .16); d.head.rotation.z = .2 * Math.sin(t * 3 + i); }); } },
    { say: 'And the big bad wolf? Scared of the cat.', show: ['floor', 'wall'], ...env,
      cam: { pos: [0, 1.8, 5.5], look: [0, 1, 0], fov: 48, to: { pos: [0, 1.8, 5], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pp', 'lamp', 'box', 'notes'); noWolves(w, 1); ctAt(w, .9, 0, -.3, -2.4, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); w.c.head.rotation.z = -.2; wput(w.wolves[0], -.6 - p * .8, 0, .8, Math.PI, .22); trot(w.wolves[0], t, 24); } },
    { say: 'Tiny wolves: cute, wild, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny wolf?', options: ['Cute', 'Wild', 'Best pet ever'], answer: 'Made up. Real gray wolves are the biggest wild members of the dog family.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .6, 4.4], look: [0, 1.2, 0], fov: 44, to: { pos: [-.5, .6, 4.4], look: [0, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'pp', 'lamp', 'box', 'notes', 'wall'); w.cr.visible = false; noWolves(w, 1); wput(w.wolves[0], 0, 0, 0, Math.PI / 2 + .4, .6); howl(w.wolves[0], t); } },
  ],
};
