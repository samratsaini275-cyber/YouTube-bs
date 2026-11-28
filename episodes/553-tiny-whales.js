// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs.
// Hook: the premise as a question under 2 s; first frame shows a tiny blue whale held in a hand.

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

function whale(k, parent) {
  const { mat, ball, box, group, cone } = k; const blue = mat('#2E86C1', { rough: .5 }), belly = mat('#D6EAF8');
  const wh = { root: group([0, 0, 0], parent) };
  const b = ball(1, blue, [0, 0, 0], wh.root); b.scale.set(2, .8, .8); const be = ball(.95, belly, [.1, -.15, 0], wh.root); be.scale.set(1.8, .6, .7);
  for (const z of [-.45, .45]) ball(.09, mat('#111111'), [-1.4, .15, z * 1.25], wh.root);
  wh.tail = group([1.9, 0, 0], wh.root); for (const z of [-1, 1]) { const f = box(.7, .08, .5, blue, [.4, .1, z * .3], wh.tail); f.rotation.y = z * .5; }
  for (const z of [-1, 1]) { const fl = box(.6, .06, .3, blue, [-.4, -.4, z * .75], wh.root); fl.rotation.x = z * .5; }
  return wh;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#EBF5FB'), [0, 10, -5], w.wall);
  w.wh = whale(k, k.scene); w.ww = w.wh.root;
  w.p = person(k, k.scene, '#16A085'); w.pp = w.p.root;
  w.tub = group(); const tm = mat('#FDFEFE', { rough: .3 }); box(3, .78, 1.6, tm, [0, .39, 0], w.tub); box(2.8, .05, 1.4, mat('#3498DB', { glow: .3, rough: .1 }), [0, .8, 0], w.tub); for (const z of [-.75, .75]) box(3, .2, .1, tm, [0, .88, z], w.tub); for (const x of [-1.45, 1.45]) box(.1, .2, 1.6, tm, [x, .88, 0], w.tub); for (const x of [-1.3, 1.3]) cyl(.08, .08, .3, mat('#AAB7B8'), [x, .15, .6], w.tub, 6);
  w.lens = group(); const rim = cyl(.5, .5, .08, mat('#7F8C8D'), [0, 0, 0], w.lens, 24); rim.rotation.x = Math.PI / 2; const gm = mat('#D6EAF8', { glow: .2 }); gm.transparent = true; gm.opacity = .35; const gl = cyl(.45, .45, .1, gm, [0, 0, 0], w.lens, 24); gl.rotation.x = Math.PI / 2; gl.castShadow = false; cyl(.07, .07, .9, mat('#5D4037'), [0, -.9, 0], w.lens, 8);
  w.spout = group(); for (let i = 0; i < 6; i++) { const d = ball(.06, mat('#AED6F1', { glow: .5 }), [0, 0, 0], w.spout); d.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const wput = (w, x, y, z, ry, s, t) => { w.ww.visible = true; w.ww.position.set(x, y, z); w.ww.rotation.set(0, ry, Math.sin(t * 2) * .05); w.ww.scale.setScalar(s); w.wh.tail.rotation.z = .3 * Math.sin(t * 4); };
const env = { sky: '#EBF5FB', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '553',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY WHALES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WHALES', 'WERE TINY?'],
  title: 'What would happen if whales were tiny?',
  description: 'The ocean becomes a bathtub. Whale watching needs a magnifying glass. And the giant spout is a tiny sneeze. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'whale', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: whales this small are made up. Quiz fact: the largest cetacean brain ever recorded belonged to a sperm whale and weighed 9.2 kilograms (Encyclopaedia Britannica, "Cetacean: Intelligence").'],
  setup,
  scenes: [
    { say: 'What if whales were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'tub', 'lens', 'spout'); stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); wput(w, .95, 2.75, 1.6, Math.PI / 2 + .3, .12, t); } },
    { say: 'The ocean? Now a bathtub.', show: ['floor', 'wall', 'tub'], ...env,
      cam: { pos: [0, 3.2, 6.5], look: [0, .8, 0], fov: 46, to: { pos: [0, 3.2, 6], look: [0, .8, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'pp', 'lens', 'spout'); w.tub.position.set(0, 0, 0); wput(w, -.8 + Math.sin(t * .8) * .6, .88, Math.sin(t * .6) * .2, Math.cos(t * .8) > 0 ? Math.PI : 0, .2, t); } },
    { say: 'Whale watching? Bring a magnifying glass.', show: ['floor', 'wall', 'pp', 'tub', 'lens'], ...env,
      cam: { pos: [1.5, 3, 6.5], look: [.3, 1.8, 0], fov: 50, to: { pos: [1.5, 3, 6], look: [.3, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'spout'); stand(w, -1.2, -.8, .6); w.p.arms[1].rotation.set(-1.2, 0, -.2); w.p.head.rotation.x = .4; w.p.eyes.forEach(e => e.scale.setScalar(1.3)); w.tub.position.set(.6, 0, .4); w.lens.position.set(.1, 1.7, .4); w.lens.rotation.set(-.8, 0, 0); wput(w, .3, .88, .4, Math.PI, .15, t); } },
    { say: 'The giant spout? A tiny sneeze.', show: ['floor', 'wall', 'tub', 'spout'], ...env,
      cam: { pos: [0, 1.6, 2.6], look: [0, 1.1, 0], fov: 42, to: { pos: [0, 1.6, 2.3], look: [0, 1.1, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'pp', 'lens'); w.tub.position.set(0, 0, 0); wput(w, 0, .9, 0, Math.PI / 2 + .3, .25, t); const q = (t * 1.2) % 1; w.spout.position.set(-.05, 1.05, -.1); w.spout.children.forEach(d => { const a = d.userData.i / 6 * Math.PI * 2; d.position.set(Math.cos(a) * q * .15, q * .35 - q * q * .2, Math.sin(a) * q * .15); d.visible = q < .9; }); } },
    { say: 'Tiny whales: cute, splashy, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny whale?', options: ['Cute', 'Splashy', 'Best pet ever'], answer: 'Fun fact: the biggest whale brain ever recorded was a sperm whale\'s. It weighed 9.2 kilograms.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, 1.2, 4.4], look: [0, 1, 0], fov: 44, to: { pos: [-.5, 1.2, 4.4], look: [0, 1, 0] } },
      update: (w, p, t) => { hide(w, 'pp', 'lens', 'spout', 'tub', 'wall'); wput(w, 0, 1, 0, Math.PI / 2 + .5, .55, t); } },
  ],
};
