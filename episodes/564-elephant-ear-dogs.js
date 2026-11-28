// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)" finale. Combines 270 tiny dogs and 269 elephant ears, the two best performers.
// Hook: the premise as a question under 2 s; first frame shows a tiny dog with giant flapping elephant ears in a hand.

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

// A tiny dog with giant grey elephant ears that flap.
function eardog(k, parent) { const d = dog(k, parent); const gr = k.mat('#9AA3AD', { rough: .8 }), pk = k.mat('#E8A9B8', { rough: .8 }); d.ears.forEach(e => e.visible = false); d.big = [-1, 1].map(s => { const g = k.group([.25, .15, s * .45], d.head); const a = k.cyl(1, 1, .06, gr, [0, -.25, s * .75], g, 20); a.rotation.x = Math.PI / 2; a.scale.set(1, 1, 1.25); const b = k.cyl(.75, .75, .02, pk, [0, -.25, s * .75 + s * .04], g, 20); b.rotation.x = Math.PI / 2; b.scale.set(1, 1, 1.25); g.userData.s = s; return g; }); return d; }
const ears = (d, a) => d.big.forEach(g => { g.rotation.set(g.userData.s * a, 0, 0); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#5D8A3A', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#FAD7A0'), [0, 10, -5], w.wall);
  w.dogs = [eardog(k, k.scene)];
  w.p = person(k, k.scene, '#8E44AD'); w.pp = w.p.root;
  w.wind = group(); for (let i = 0; i < 6; i++) { const l = box(.9, .04, .04, mat('#FDFEFE', { glow: .6 }), [0, 0, 0], w.wind); l.userData.i = i; l.castShadow = false; }
  w.tree = group(); cyl(.35, .45, 3, mat('#7E5109'), [0, 1.5, 0], w.tree, 10); ball(1.6, mat('#27AE60', { rough: .9 }), [0, 3.8, 0], w.tree);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const dput = (d, x, y, z, ry, s) => { d.root.visible = true; d.root.position.set(x, y, z); d.root.rotation.set(0, ry, 0); d.root.scale.setScalar(s); d.legs.forEach(l => l.rotation.z = 0); d.head.rotation.set(0, 0, 0); d.mouth.scale.set(1, 1, 1); ears(d, 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FAD7A0', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '564',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ELEPHANT-EAR DOG',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS HAD', 'ELEPHANT EARS?'],
  title: 'What would happen if dogs had elephant ears?',
  description: 'Season finale: the tiny dog gets giant elephant ears. A windy day sends it flying, hide and seek gets easy, and the cat is jealous. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'dog', 'elephant', 'ears', 'shorts'],
  sources: ['Comedy sketch: dogs with elephant ears are made up. Quiz fact: African elephants have much larger ears than Asian elephants, whose ears are smaller and rounder (Encyclopaedia Britannica, "What\'s the Difference Between Asian and African Elephants?").'],
  setup,
  scenes: [
    { say: 'What if dogs had elephant ears?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.6], look: [.8, 3.2, 1.4], fov: 48, to: { pos: [.9, 3.1, 4.3], look: [.8, 3.2, 1.4], fov: 46 } },
      update: (w, p, t) => { hide(w, 'wind', 'tree'); w.cr.visible = false; stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); dput(w.dogs[0], .95, 2.62, 1.6, Math.PI / 2 + .5, .2); ears(w.dogs[0], .4 + .4 * Math.sin(t * 9)); w.dogs[0].mouth.scale.set(1, 2, 1); } },
    { say: 'A windy day? Off it flies.', show: ['floor', 'wall', 'wind', 'tree'], ...env,
      cam: { pos: [0, 2.2, 6], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'pp'); w.cr.visible = false; w.tree.position.set(2.2, 0, -2); const y = Math.max(0, p - .25) * 4.5; dput(w.dogs[0], -.4 + p * .6, y, .5, Math.PI / 2 + .4, .3); ears(w.dogs[0], 1.1 + .5 * Math.sin(t * 14)); w.dogs[0].mouth.scale.set(1, 2.5, 1); w.dogs[0].legs.forEach((l, i) => l.rotation.z = y > 0 ? .4 * Math.sin(t * 20 + i) : 0); w.wind.children.forEach(l => { const f = (t * .9 + l.userData.i / 6) % 1; l.position.set(-3 + f * 6, .8 + (l.userData.i % 3) * 1.1 + y * .5, 1); }); } },
    { say: 'Hide and seek? It just hides behind its ears.', show: ['floor', 'wall'], ...env,
      cam: { pos: [0, 1, 3.2], look: [0, .6, 0], fov: 44, to: { pos: [0, 1, 2.9], look: [0, .6, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'pp', 'wind', 'tree'); w.cr.visible = false; dput(w.dogs[0], .3, 0, 0, Math.PI / 2, .3); const c = Math.min(1, Math.max(0, (p - .3) * 3)); w.dogs[0].big.forEach(g => g.rotation.set(0, g.userData.s * c * -1.2, 0)); } },
    { say: 'And the cat? Totally jealous.', show: ['floor', 'wall'], ...env,
      cam: { pos: [-.4, 2.4, 7.2], look: [-.3, .9, 0], fov: 48, to: { pos: [-.3, 2.4, 6.7], look: [-.2, .9, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pp', 'wind', 'tree'); ctAt(w, -1.1, 0, -.8, .2, .4); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .4); w.c.head.rotation.z = -.15; dput(w.dogs[0], .5, 0, .7, Math.PI / 2 + .9, .3); ears(w.dogs[0], .4 + .4 * Math.sin(t * 6)); w.dogs[0].mouth.scale.set(1, 2, 1); } },
    { say: 'Elephant-ear dogs: cute, silly, or totally amazing? Comment below.',
      quiz: { q: 'Would you want an elephant-ear dog?', options: ['Cute', 'Silly', 'Totally amazing'], answer: 'Fun fact: African elephants have much bigger ears than Asian elephants.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .6, 5], look: [0, 1.1, 0], fov: 44, to: { pos: [-.5, .6, 5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { hide(w, 'pp', 'wind', 'tree', 'wall'); w.cr.visible = false; dput(w.dogs[0], 0, 0, 0, Math.PI / 2 + .4, .55); ears(w.dogs[0], .3 + .3 * Math.sin(t * 5)); } },
  ],
};
