// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs.
// Hook: the premise as a question under 2 s; first frame shows a tiny striped tiger standing in a hand.

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

// A tiger is the cat model recoloured deep orange with black stripes.
function tiger(k, parent) {
  const c = cat(k, parent); const org = k.mat('#C0500C', { rough: .8 }), blk = k.mat('#111111');
  c.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = org; });
  for (let i = 0; i < 5; i++) { const s = k.box(.16, 2.3, 3.15, blk, [-2.9 + i * .5, 1.4, 0], c.root); s.castShadow = false; }
  for (const z of [-1, 1]) { const s = k.box(.7, .12, .12, blk, [.1, .55, z * 1.3], c.head); k.box(.12, .5, .12, blk, [-.4, .9, z * 1.1], c.head); s.castShadow = false; }
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#E8F6EF'), [0, 10, -5], w.wall);
  w.t = tiger(k, k.scene); w.tt = w.t.root;
  w.p = person(k, k.scene, '#8E44AD'); w.pp = w.p.root;
  w.crumb = ball(.09, mat('#D4A373'), [0, 0, 0], k.scene);
  w.bowl = group(); const gm = mat('#AED6F1', { glow: .2 }); gm.transparent = true; gm.opacity = .45; const b = ball(.9, gm, [0, .8, 0], w.bowl); b.castShadow = false; cyl(.85, .85, .05, mat('#3498DB', { glow: .2 }), [0, .5, 0], w.bowl, 24); cyl(.55, .6, .1, mat('#7F8C8D'), [0, .05, 0], w.bowl, 20);
  w.rings = group(); for (let i = 0; i < 3; i++) { const r = ball(.05, mat('#FDFEFE', { glow: 1 }), [0, 0, 0], w.rings); r.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const tput = (w, x, y, z, ry, s) => { w.tt.visible = true; w.tt.position.set(x, y, z); w.tt.rotation.set(0, ry, 0); w.tt.scale.setScalar(s); w.t.head.rotation.set(0, 0, 0); w.t.paw.position.set(.8, .5, .9); w.t.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#E8F6EF', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '547',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY TIGERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF TIGERS', 'WERE TINY?'],
  title: 'What would happen if tigers were tiny?',
  description: 'The mighty roar becomes a squeak. The hunt is for one crumb. The zoo is a fish bowl. And the house cat is finally in charge. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'tiger', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: tigers this small are made up. Quiz fact: the tiger is the largest member of the cat family, Felidae (Encyclopaedia Britannica, "Tiger").'],
  setup,
  scenes: [
    { say: 'What if tigers were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'crumb', 'bowl', 'rings'); w.cr.visible = false; stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); tput(w, .85, 2.62, 1.6, -.6, .12); w.t.head.rotation.z = .1 * Math.sin(t * 4); } },
    { say: 'The mighty roar? A tiny squeak.', label: '*squeak*', show: ['floor', 'wall', 'rings'], ...env,
      cam: { pos: [.2, .8, 2.6], look: [0, .5, 0], fov: 42, to: { pos: [.2, .8, 2.3], look: [0, .5, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'crumb', 'bowl', 'pp'); w.cr.visible = false; tput(w, -.3, 0, 0, -.4, .25); w.t.head.rotation.z = .3 + .15 * Math.abs(Math.sin(t * 10)); w.t.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.rings.position.set(.3, .75, .2); w.rings.children.forEach(r => { const q = (t * 1.5 + r.userData.i / 3) % 1; r.position.set(q * .6, q * .3, 0); r.scale.setScalar(.5 + q); }); } },
    { say: 'The big hunt? One crumb.', show: ['floor', 'wall', 'crumb'], ...env,
      cam: { pos: [0, .8, 3], look: [0, .3, 0], fov: 44, to: { pos: [0, .8, 2.6], look: [0, .3, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'bowl', 'pp', 'rings'); w.cr.visible = false; const f = Math.min(1, p * 1.3); tput(w, -1 + f * 1.1, Math.sin(f * Math.PI) * .3, 0, 0, .22); w.t.paw.position.set(1.2, .9, .9); w.crumb.position.set(.55, .09, 0); } },
    { say: 'The zoo? One fish bowl.', show: ['floor', 'wall', 'bowl'], ...env,
      cam: { pos: [0, 1.4, 3.6], look: [0, .8, 0], fov: 44, to: { pos: [0, 1.4, 3.2], look: [0, .8, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'crumb', 'pp', 'rings'); w.cr.visible = false; w.bowl.position.set(0, 0, 0); tput(w, -.05, .55, 0, -.5 + Math.sin(t) * .5, .18); } },
    { say: 'And the house cat? Finally the boss.', show: ['floor', 'wall'], ...env,
      cam: { pos: [0, 1.8, 6], look: [0, 1.2, 0], fov: 48, to: { pos: [0, 1.8, 5.5], look: [0, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'crumb', 'bowl', 'pp', 'rings'); ctAt(w, .6, 0, -.4, -2.4, .55); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.c.head.rotation.z = -.2; tput(w, -.9, 0, .9, -.6, .15); w.t.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.4 : 1.4); } },
    { say: 'Tiny tigers: cute, fierce, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny tiger?', options: ['Cute', 'Fierce', 'Best pet ever'], answer: 'Made up. Real tigers are the biggest cats in the world.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .8, 4.4], look: [0, 1, 0], fov: 44, to: { pos: [-.5, .8, 4.4], look: [0, 1, 0] } },
      update: (w, p, t) => { hide(w, 'crumb', 'bowl', 'pp', 'rings', 'wall'); w.cr.visible = false; tput(w, .3, 0, 0, -2.4, .45); w.t.head.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};
