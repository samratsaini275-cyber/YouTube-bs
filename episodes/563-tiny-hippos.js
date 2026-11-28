// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 561 tiny pigs.
// Hook: the premise as a question under 2 s; first frame shows a tiny grey hippo opening its huge mouth in a hand.

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

// A hippo is the dog model in purple-grey, with a big wide snout, tiny ears and a stubby tail.
function hippo(k, parent) { const d = dog(k, parent); const gr = k.mat('#8E7F99', { rough: .8 }), pk = k.mat('#D7A1B5'); d.root.traverse(o => { if (o.material && o.material.color && ['c98a4b', '7a4a22'].includes(o.material.color.getHexString())) o.material = gr; }); d.ears.forEach(e => e.scale.set(.8, .4, .8)); const sn = k.box(.75, .5, .85, gr, [-.6, -.2, 0], d.head); for (const z of [-.18, .18]) k.ball(.06, k.mat('#3A2A3A'), [-.95, .05, z], d.head); d.mouth.scale.set(1, 1, 1); d.mouth.material = pk; d.mouth.position.set(-.62, -.46, 0); d.mouth.geometry.scale(1.8, 1, 2.4); for (const z of [-.22, .22]) k.box(.08, .16, .08, k.mat('#FDFEFE'), [-.95, -.36, z], d.head); d.tail.scale.set(1, .35, 1); d.legs.forEach(l => l.scale.set(1.3, .8, 1.3)); d.body.children[0].scale.set(1.5, .95, 1.05); return d; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#5D8A3A', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#D5F5E3'), [0, 10, -5], w.wall);
  w.pigs = []; for (let i = 0; i < 2; i++) w.pigs.push(hippo(k, k.scene));
  w.p = person(k, k.scene, '#E67E22'); w.pp = w.p.root;
  w.cup = group(); cyl(.6, .38, .45, mat('#F7DC6F', { rough: .4 }), [0, .225, 0], w.cup, 24); cyl(.56, .56, .02, mat('#5DADE2', { rough: .2 }), [0, .46, 0], w.cup, 24); cyl(.85, .85, .04, mat('#FDFEFE'), [0, .02, 0], w.cup, 24);
  w.bank = group(); ball(.09, mat('#58D68D', { rough: .5 }), [0, 0, 0], w.bank);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const gput = (d, x, y, z, ry, s) => { d.root.visible = true; d.root.position.set(x, y, z); d.root.rotation.set(0, ry, 0); d.root.scale.setScalar(s); d.legs.forEach(l => l.rotation.z = 0); d.head.rotation.set(0, 0, 0); d.mouth.scale.set(1, 1, 1); };
const gape = (d, t) => { d.head.rotation.z = -.35; d.mouth.scale.set(1, 3 + Math.sin(t * 5), 1); };
const noPigs = (w, from = 0) => w.pigs.forEach((d, i) => { if (i >= from) d.root.visible = false; });
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#D5F5E3', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '563',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY HIPPOS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HIPPOS', 'WERE TINY?'],
  title: 'What would happen if hippos were tiny?',
  description: 'The river becomes a soup bowl. That huge mouth is just right for one pea. And the cat still runs away. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'hippo', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: hippos this small are made up. Quiz fact: hippo skin glands release an oily reddish or pinkish "lotion" that acts as a sunblock, filtering out ultraviolet radiation (Encyclopaedia Britannica, "Hippopotamus").'],
  setup,
  scenes: [
    { say: 'What if hippos were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'cup', 'bank'); w.cr.visible = false; noPigs(w, 1); stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); gput(w.pigs[0], .95, 2.62, 1.6, Math.PI / 2 + .5, .2); gape(w.pigs[0], t); } },
    { say: 'The river? Now it\'s a soup bowl.', show: ['floor', 'wall', 'cup'], ...env,
      cam: { pos: [.4, 1.3, 2.6], look: [0, .5, 0], fov: 42, to: { pos: [.4, 1.3, 2.3], look: [0, .5, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'pp', 'bank'); w.cr.visible = false; noPigs(w, 1); w.cup.position.set(0, 0, 0); gput(w.pigs[0], .1, .02 + .02 * Math.sin(t * 3), 0, Math.PI / 2 + .6, .25); w.pigs[0].head.rotation.z = -.15; } },
    { say: 'That huge mouth? Perfect for one pea.', show: ['floor', 'wall', 'bank'], ...env,
      cam: { pos: [-.2, 1, 2.8], look: [-.1, .45, 0], fov: 44, to: { pos: [-.2, 1, 2.5], look: [-.1, .45, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'pp', 'cup'); w.cr.visible = false; noPigs(w, 1); gput(w.pigs[0], .5, 0, 0, .5, .3); const f = Math.min(1, p * 1.6); w.pigs[0].head.rotation.z = -.4; w.pigs[0].mouth.scale.set(1, f < 1 ? 4 : 1, 1); w.bank.visible = f < 1; w.bank.position.set(-1.5 + f * 1.5, .5 + Math.sin(f * Math.PI) * .6, .3); } },
    { say: 'And the cat? Still runs away.', show: ['floor', 'wall'], ...env,
      cam: { pos: [-.4, 2.4, 7.2], look: [-.4, .9, 0], fov: 48, to: { pos: [-.2, 2.4, 6.7], look: [-.2, .9, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pp', 'cup', 'bank'); noPigs(w, 1); const x = -.2 + p * 1.8; ctAt(w, x, Math.abs(Math.sin(t * 8)) * .15, -.6, 0, .4); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.4); w.c.head.rotation.y = .5; gput(w.pigs[0], x - 1.9, 0, .8, 0, .26); trot(w.pigs[0], t, 22); w.pigs[0].mouth.scale.set(1, 3, 1); } },
    { say: 'Tiny hippos: cute, grumpy, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny hippo?', options: ['Cute', 'Grumpy', 'Best pet ever'], answer: 'Fun fact: hippo skin makes a reddish lotion that works like sunscreen.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .6, 4.4], look: [0, 1.2, 0], fov: 44, to: { pos: [-.5, .6, 4.4], look: [0, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'pp', 'cup', 'bank', 'wall'); w.cr.visible = false; noPigs(w, 1); gput(w.pigs[0], 0, 0, 0, Math.PI / 2 + .4, .6); gape(w.pigs[0], t); } },
  ],
};
