// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs (965 views after one night).
// Hook: the premise as a question under 2 s; first frame shows a tiny horse standing in a hand.

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

function horse(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#8B5A2B', { rough: .8 }), dark = mat('#3E2723');
  const h = { root: group([0, 0, 0], parent) };
  const b = ball(.8, brown, [0, 1.9, 0], h.root); b.scale.set(1.6, .75, .7);
  h.neck = group([-1, 2.3, 0], h.root); const n = cyl(.25, .32, 1.1, brown, [0, .4, 0], h.neck, 10); n.rotation.z = .5;
  h.head = group([-1.4, 3.05, 0], h.root); const hd = box(.8, .4, .4, brown, [-.2, 0, 0], h.head); hd.rotation.z = -.4;
  ball(.06, mat('#111111'), [-.1, .12, .2], h.head); ball(.06, mat('#111111'), [-.1, .12, -.2], h.head);
  for (const z of [-.12, .12]) cone(.08, .25, brown, [.1, .3, z], h.head, 4);
  h.mane = group([0, 0, 0], h.root); for (let i = 0; i < 5; i++) { const m = box(.12, .3, .12, dark, [-.6 - i * .14, 2.55 + i * .12, 0], h.mane); m.rotation.z = .5; }
  h.legs = []; for (const x of [-.85, .85]) for (const z of [-.25, .25]) h.legs.push(cyl(.11, .1, 1.5, brown, [x, .75, z], h.root, 8));
  h.tail = cyl(.08, .04, 1, dark, [1.3, 1.7, 0], h.root, 6); h.tail.rotation.z = -.4;
  return h;
}
const gallop = (h, t, sp = 16) => h.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + (i % 2 ? Math.PI : 0) + (i > 1 ? .6 : 0)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#EADFF2'), [0, 10, -5], w.wall);
  w.horses = []; for (let i = 0; i < 3; i++) { const h = horse(k, k.scene); if (i) h.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === '8b5a2b') o.material = mat(['#FDFEFE', '#212121'][i - 1], { rough: .8 }); }); w.horses.push(h); }
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.table = group(); box(5, .25, 2.2, mat('#A0522D'), [0, 1.6, 0], w.table); for (const x of [-2.3, 2.3]) for (const z of [-1, 1]) cyl(.1, .1, 1.6, mat('#6E3B1F'), [x, .8, z], w.table, 8);
  w.lanes = group(); for (let i = 0; i < 4; i++) { const l = box(4.6, .01, .03, mat('#FDFEFE'), [0, 1.74, -.75 + i * .5], w.lanes); l.castShadow = false; } box(.05, .02, 1.6, mat('#111111'), [-2.1, 1.74, 0], w.lanes);
  w.shoebox = group(); box(1.6, .6, .9, mat('#E2453C'), [0, .3, 0], w.shoebox); box(1.5, .02, .8, mat('#F5CBA7'), [0, .58, 0], w.shoebox); for (let i = 0; i < 6; i++) box(.3, .05, .05, mat('#F4D03F'), [((i * .37) % 1.2) - .6, .62, ((i * .53) % .6) - .3], w.shoebox);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const hput = (h, x, y, z, ry, s) => { h.root.visible = true; h.root.position.set(x, y, z); h.root.rotation.set(0, ry, 0); h.root.scale.setScalar(s); h.legs.forEach(l => l.rotation.z = 0); };
const noHorses = (w, from = 0) => w.horses.forEach((h, i) => { if (i >= from) h.root.visible = false; });
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#EADFF2', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '545',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY HORSES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HORSES', 'WERE TINY?'],
  title: 'What would happen if horses were tiny?',
  description: 'Horse races happen on the kitchen table. The stable is a shoebox. And the only one who can ride is the cat. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'horse', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: horses this small are made up. Quiz fact: the hand, an old unit of length now standardized at 4 inches (10.16 cm), is used to measure the height of horses from the ground to the top of the shoulders; a statute of King Henry VIII of England fixed the hand at four inches (Encyclopaedia Britannica, "Hand").'],
  setup,
  scenes: [
    { say: 'What if horses were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'table', 'lanes', 'shoebox'); w.cr.visible = false; noHorses(w, 1); stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); hput(w.horses[0], .95, 2.62, 1.6, Math.PI / 2 + .5, .15); w.horses[0].head.rotation.z = .1 * Math.sin(t * 4); w.horses[0].tail.rotation.z = -.4 + .3 * Math.sin(t * 8); } },
    { say: 'Horse races? On the kitchen table.', show: ['floor', 'wall', 'table', 'lanes'], ...env,
      cam: { pos: [0, 2.6, 5], look: [0, 2.3, 0], fov: 46, to: { pos: [0, 2.6, 4.6], look: [0, 2.3, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'shoebox', 'pp'); w.cr.visible = false; w.horses.forEach((h, i) => { hput(h, 1.6 - p * (2.2 + i * .3) - i * .2, 1.73 + Math.abs(Math.sin(t * 16 + i)) * .05, -.5 + i * .5, 0, .2); gallop(h, t + i); }); } },
    { say: 'The stable? One shoebox.', show: ['floor', 'wall', 'shoebox'], ...env,
      cam: { pos: [.2, 1.8, 3.6], look: [0, .6, 0], fov: 42, to: { pos: [.2, 1.8, 3.2], look: [0, .6, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'table', 'lanes', 'pp'); w.cr.visible = false; noHorses(w, 1); w.shoebox.position.set(0, 0, 0); hput(w.horses[0], .1, .6, 0, .4, .18); w.horses[0].head.rotation.z = -.3 + .1 * Math.sin(t * 3); } },
    { say: 'Riding one? Only the cat can.', show: ['ground'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 2.4, 7], look: [0, 1.2, 0], fov: 48, to: { pos: [0, 2.4, 6.5], look: [0, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'table', 'lanes', 'shoebox', 'pp', 'floor', 'wall'); w.ground.visible = true; noHorses(w, 1); const x = 2 - p * 3.2; hput(w.horses[0], x, 0, .4, 0, .8); gallop(w.horses[0], t, 12); w.horses[0].root.position.y = Math.abs(Math.sin(t * 6)) * .08; ctAt(w, x + .45, 2.05 + w.horses[0].root.position.y, .4, 0, .2); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); } },
    { say: 'Tiny horses: cute, silly, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny horse?', options: ['Cute', 'Silly', 'Best pet ever'], answer: 'Made up. But real horses are measured in hands, and one hand is 4 inches.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .6, 4.4], look: [0, 1.4, 0], fov: 44, to: { pos: [-.5, .6, 4.4], look: [0, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'table', 'lanes', 'shoebox', 'pp', 'ground'); w.cr.visible = false; noHorses(w, 1); hput(w.horses[0], 0, 0, 0, Math.PI / 2 + .4, .4); w.horses[0].tail.rotation.z = -.4 + .3 * Math.sin(t * 8); w.horses[0].head.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};
