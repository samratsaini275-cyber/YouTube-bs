// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears.
// Hook: the premise as a question under 2 s; first frame shows a person covered in black-and-white zebra stripes.

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
// Zebra stripes on a person: thin black bands wrapped round the body and arms.
function stripe(k, p) { const blk = k.mat('#111111'); p.stripes = []; for (let i = 0; i < 6; i++) { const s = k.cyl(.83 + i * .004, .83 + i * .004, .14, blk, [0, .3 + i * .42, 0], p.root, 16); p.stripes.push(s); } p.arms.forEach(a => { for (let i = 0; i < 3; i++) k.cyl(.2, .2, .1, blk, [0, -.3 - i * .45, 0], a, 8); }); }
function zebra(k, parent) { const h = horse(k, parent); const wht = k.mat('#FDFEFE'), blk = k.mat('#111111'); h.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === '8b5a2b') o.material = wht; }); for (let i = 0; i < 6; i++) { const s = k.box(.12, 1.25, 1.15, blk, [-1.1 + i * .42, 1.9, 0], h.root); s.castShadow = false; } return h; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#FDF2E9'), [0, 10, -5], w.wall);
  w.road = box(40, .02, 5, mat('#4D5656'), [0, .015, 0], k.scene); w.road.receiveShadow = true;
  w.p = person(k, k.scene, '#FDFEFE'); w.pp = w.p.root; stripe(k, w.p);
  w.fly = group(); ball(.12, mat('#222222'), [0, 0, 0], w.fly); for (const z of [-1, 1]) { const wg = box(.02, .02, .18, mat('#D6EAF8', { glow: .4 }), [0, .08, z * .1], w.fly); wg.rotation.x = z * .4; }
  w.car = group(); box(2.2, .9, 1.4, mat('#E74C3C'), [0, .7, 0], w.car); box(1.2, .6, 1.3, mat('#D6EAF8'), [-.1, 1.4, 0], w.car); for (const x of [-.7, .7]) for (const z of [-.7, .7]) { const wh = cyl(.3, .3, .2, mat('#111111'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.z = zebra(k, k.scene); w.zz = w.z.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const env = { sky: '#FDF2E9', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '548',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ZEBRA STRIPES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'ZEBRA STRIPES?'],
  title: 'What would happen if humans had zebra stripes?',
  description: 'Flies cannot land on you. Lie down in the road and you are a zebra crossing. And zebras think you are family. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'zebra', 'stripes', 'comedy', 'shorts'],
  sources: ['Comedy sketch: striped humans are made up. Quiz fact: in an experiment where horses wore cloth coats of different colours, horses in striped coats had far fewer horse flies touching and landing on them than when wearing black or white coats; close up, the stripes stopped flies from making a controlled landing (Caro et al., "Benefits of zebra stripes: Behaviour of tabanid flies around zebras and horses", PLoS One, 2019).'],
  setup,
  scenes: [
    { say: 'What if we had zebra stripes?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 3, 9], look: [0, 3.2, 0], fov: 52, to: { pos: [0, 3, 8.4], look: [0, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'fly', 'car', 'zz', 'road'); stand(w, 0, 0, Math.sin(t * 1.5) * .4); pose(w.p, .4); w.p.mouth.scale.set(1.2, 1.6, 1); } },
    { say: 'Flies? They cannot land on you.', show: ['floor', 'wall', 'pp', 'fly'], ...env,
      cam: { pos: [.4, 3.6, 5.5], look: [.2, 3.2, 0], fov: 48, to: { pos: [.4, 3.6, 5], look: [.2, 3.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'car', 'zz', 'road'); stand(w, -.4, 0, .3); pose(w.p, .2); const q = (t * 1.2) % 1; const b = Math.abs(Math.sin(q * Math.PI * 2)); w.fly.position.set(.6 + q * .4, 2.2 + b * 1.4, 1); w.fly.rotation.z = t * 6; w.p.mouth.scale.set(1.4, .6, 1); } },
    { say: 'Lie down in the road? Free zebra crossing.', show: ['ground', 'road', 'pp', 'car'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [5, 9, 8], look: [0, 0, 0], fov: 50, to: { pos: [4.6, 9, 7.4], look: [0, 0, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'fly', 'zz', 'floor', 'wall'); w.ground.visible = true; w.pp.position.set(0, .8, -2); w.pp.rotation.set(Math.PI / 2, 0, 0); pose(w.p, .1); const f = Math.min(1, p * 1.6); w.car.position.set(-6 + f * 3.8, 0, .4); w.car.rotation.y = 0; } },
    { say: 'And zebras? They think you are family.', show: ['ground', 'pp', 'zz'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.6, 11], look: [0, 2.6, 0], fov: 52, to: { pos: [0, 3.6, 10.4], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'fly', 'car', 'road', 'floor', 'wall'); w.ground.visible = true; stand(w, -1.4, 0, .5); pose(w.p, .5); w.p.mouth.scale.set(1.4, 1.4, 1); w.zz.position.set(1.6, 0, -.4); w.zz.rotation.set(0, Math.PI - .4, 0); w.zz.scale.setScalar(1); w.z.legs.forEach(l => l.rotation.z = 0); w.z.head.rotation.z = -.2 + .15 * Math.sin(t * 3); } },
    { say: 'Zebra stripes: cool, silly, or totally useful? Comment below.',
      quiz: { q: 'Would you want zebra stripes?', options: ['Cool', 'Silly', 'Totally useful'], answer: 'Fun fact: in tests, horses wearing striped coats had far fewer flies land on them.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.5, 9], look: [0, 3.4, 0], fov: 50, to: { pos: [-1, 1.5, 9], look: [0, 3.4, 0] } },
      update: (w, p, t) => { hide(w, 'fly', 'car', 'zz', 'road', 'wall'); stand(w, 0, 0, .2 + Math.sin(t * 2) * .3); pose(w.p, .4); } },
  ],
};
