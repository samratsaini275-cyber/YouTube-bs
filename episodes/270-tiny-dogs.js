// Narrative 16: "What Would Happen If… (season 6)". Animal-scale premise (167 giant cats 284; pets are the strongest topic).
// Hook: the premise as a question under 2 s; first frame shows a tiny dog sitting in a hand.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#EADFF2'), [0, 10, -5], w.wall);
  w.d = dog(k, k.scene); w.dd = w.d.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.shoe = group(); box(1.2, .5, 2.8, mat('#E2453C'), [0, .25, 0], w.shoe); box(1.25, .15, 2.85, mat('#FFFFFF'), [0, .05, 0], w.shoe);
  w.cup = group(); cyl(.5, .4, .7, mat('#FFFFFF'), [0, .35, 0], w.cup, 18); w.cup.children[0].material.side = k.THREE.DoubleSide; const h = k.torus(.2, .05, mat('#FFFFFF'), [.55, .4, 0], w.cup); h.rotation.set(0, 0, 0); cyl(.47, .47, .02, mat('#9FD3EE'), [0, .6, 0], w.cup, 18);
  w.bubbles = group(); for (let i = 0; i < 8; i++) { const b = ball(.08 + (i % 3) * .03, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.bubbles); b.userData.i = i; b.castShadow = false; }
  w.ball = ball(.6, mat('#C6E02F'), [0, 0, 0], k.scene);
  w.box = group(); box(1.6, 1.2, 1.2, mat('#C8955A'), [0, .6, 0], w.box);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '270',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY DOGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'WERE TINY?'],
  title: 'What would happen if dogs were tiny?',
  description: 'A walk to the corner is a marathon. Bath time happens in a teacup. Guard dogs go squeak. And in a game of fetch, the ball wins. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'dog', 'tiny', 'pets', 'shorts'],
  sources: ['Comedy sketch: dogs this small are made up. Quiz fact: the Chihuahua is usually listed as the smallest dog breed (American Kennel Club).'],
  setup,
  scenes: [
    { say: 'What if dogs were tiny?', show: ['floor', 'wall', 'pp', 'dd'], sky: '#EADFF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); w.dd.scale.setScalar(.22); w.dd.position.set(.95, 2.62, 1.6); w.dd.rotation.set(0, Math.PI / 2 + .5, 0); w.d.tail.rotation.z = -.8 + .5 * Math.sin(t * 20); w.d.head.rotation.z = .1 * Math.sin(t * 4); } },
    { say: 'A walk? Ten steps is a marathon.', show: ['floor', 'wall', 'dd', 'shoe'], sky: '#EADFF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.4, 1.2, 4.6], look: [0, .9, 0], fov: 44, to: { pos: [.3, 1.2, 4.1], look: [0, .9, 0], fov: 42 } },
      update: (w, p, t) => { w.shoe.position.set(1.4, 0, -.6); w.shoe.rotation.y = .2; w.dd.scale.setScalar(.35); w.dd.position.set(.6 - p * .8, 0, .4); w.dd.rotation.set(0, 0, 0); trot(w.d, t); w.d.mouth.scale.set(1, 1 + 2 * Math.abs(Math.sin(t * 9)), 1); } },
    { say: 'Bath time? One teacup.', show: ['floor', 'wall', 'dd', 'cup', 'bubbles'], sky: '#EADFF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.3, 1.6, 3.6], look: [0, .9, 0], fov: 42, to: { pos: [.3, 1.6, 3.2], look: [0, .9, 0], fov: 40 } },
      update: (w, p, t) => { w.cup.position.set(0, 0, 0); w.dd.scale.setScalar(.3); w.dd.position.set(.05, .25, 0); w.dd.rotation.set(0, Math.PI / 2 + .3, 0); w.d.legs.forEach(l => l.rotation.z = 0); w.d.head.rotation.z = .15 * Math.sin(t * 3); w.bubbles.children.forEach(b => { const i = b.userData.i, q = (t * .6 + i / 8) % 1; b.position.set((i % 2 ? 1 : -1) * (.35 + q * .3), .75 + q * .9, -.1); }); } },
    { say: 'Guard dogs? Squeak, squeak.', label: '*squeak*', show: ['floor', 'wall', 'pp', 'dd', 'box'], sky: '#EADFF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 2.4, 8], look: [.2, 2.2, 0], fov: 50, to: { pos: [1.3, 2.4, 7.4], look: [.2, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -1.4, -.6, .5); pose(w.p, .2); w.box.position.set(-.9, 0, .4); w.p.arms.forEach(a => a.rotation.set(-1, 0, a.userData.s * .4)); w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); w.dd.scale.setScalar(.35); w.dd.position.set(1.4, .03 * Math.abs(Math.sin(t * 16)), .8); w.dd.rotation.set(0, -.3, 0); w.d.legs.forEach(l => l.rotation.z = 0); w.d.mouth.scale.set(1, 1 + 3 * Math.abs(Math.sin(t * 12)), 1); w.d.head.rotation.z = .2 * Math.abs(Math.sin(t * 12)); } },
    { say: 'And fetch? The ball wins.', show: ['ground', 'dd', 'ball'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 1.6, 6], look: [0, .9, 0], fov: 48, to: { pos: [0, 1.6, 5.5], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => { const bx = 2 - p * 3.4; w.ball.position.set(bx, .6, .3); w.ball.rotation.z = p * 8; w.dd.scale.setScalar(.35); const hit = p > .6, dx = hit ? -.05 : -2.2 + p * 3.6; w.dd.position.set(dx, 0, .3); w.dd.rotation.set(0, Math.PI, 0); w.dd.scale.set(.35, hit ? .06 : .35, hit ? .5 : .35); trot(w.d, hit ? 0 : t); } },
    { say: 'Tiny dogs: adorable, useless, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny dog?', options: ['Adorable', 'Useless', 'Best pet ever'], answer: 'Made up. The Chihuahua is the smallest real breed.' },
      show: ['floor', 'dd'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .3, 4.4], look: [0, 1.5, 0], fov: 44, to: { pos: [-.5, .3, 4.4], look: [0, 1.5, 0] } },
      update: (w, p, t) => { w.dd.scale.setScalar(.6); w.dd.position.set(0, 0, 0); w.dd.rotation.set(0, Math.PI / 2 + .4, 0); w.d.legs.forEach(l => l.rotation.z = 0); w.d.tail.rotation.z = -.8 + .5 * Math.sin(t * 20); } },
  ],
};
