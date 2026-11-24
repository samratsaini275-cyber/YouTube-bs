// Narrative 15: "What Would Happen If… (season 5)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary next to a giant dog.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

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
function talk(d, t, on = true) { d.mouth.scale.y = on ? 1 + 4 * Math.abs(Math.sin(t * 14)) : 1; d.tail.rotation.x = .7 * Math.sin(t * 15); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#7FB069', 0);
  w.fence = group(); for (let i = 0; i < 12; i++) box(.4, 4, .3, mat('#F2E6D0'), [-22 + i * 4, 2, -10], w.fence); box(48, .4, .3, mat('#F2E6D0'), [0, 3.2, -10], w.fence);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.d = dog(k, k.scene); w.dd = w.d.root;
  w.leash = cyl(.03, .03, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.leash.castShadow = false;
  w.stick = cyl(.35, .35, 6, mat('#7A5230'), [0, 0, 0], k.scene, 10); w.stick.rotation.z = Math.PI / 2;
  w.drool = group(); for (let i = 0; i < 8; i++) { const d = ball(.25, mat('#BFE3F7', { opacity: .7 }), [0, 0, 0], w.drool); d.userData.i = i; d.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const pup = (w, x, z, ry, t, s = 2.2, run = false) => { w.dd.position.set(x, 0, z); w.dd.rotation.set(0, ry, 0); w.dd.scale.setScalar(s); w.d.tail.rotation.x = .7 * Math.sin(t * 15); w.d.mouth.scale.y = 1; w.d.legs.forEach((l, i) => l.rotation.z = run ? .5 * Math.sin(t * 14 + i * 1.6) : 0); };
const leash = (w, a, b) => { const v = b.clone().sub(a); w.leash.visible = true; w.leash.position.copy(a).add(b).multiplyScalar(.5); w.leash.scale.set(1, v.length(), 1); w.leash.quaternion.setFromUnitVectors(new a.constructor(0, 1, 0), v.normalize()); };

export default {
  id: '251',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY\'S DOG',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'HAD A DOG?'],
  title: 'What would happen if Gary the ant had a dog?',
  description: 'Walkies go badly. Fetch goes worse. And bath time is a flood. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'dog', 'funny', 'shorts'],
  sources: ['Quiz fact: a dog\'s nose has up to about 300 million scent receptors, compared with about 6 million in humans (PBS NOVA, "Dogs\' Dazzling Sense of Smell", 2012).'],
  setup,
  scenes: [
    { say: 'What if Gary had a dog?', show: ['grass', 'fence', 'g', 'dd'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [2, 2.2, 13], look: [0, 3.9, 0], fov: 50, to: { pos: [1.8, 2.2, 12.3], look: [0, 3.9, 0], fov: 48 } },
      update: (w, p, t) => { w.leash.visible = false; w.stick.visible = false; w.drool.visible = false; pup(w, -.6, -2.6, Math.PI / 2, t); gy(w, 1.5, 0, 2.2, -1.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'Walkies? The dog walked Gary.', show: ['grass', 'fence', 'g', 'dd'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 30,
      cam: { pos: [3, 4, 16], look: [0, 2.6, 0], fov: 52, to: { pos: [2.6, 4, 15], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.stick.visible = false; w.drool.visible = false; const x = 6 - p * 12; pup(w, x, 0, 0, t, 2.2, true); const neck = new w.dd.position.constructor(x - 2.6, 3.3, 0); const gx = x + 1.4; gy(w, gx, .9 + .9 * Math.abs(Math.sin(t * 8)), 1.6, Math.PI, t); w.g.rotation.z = .6; leash(w, neck, new w.dd.position.constructor(gx, 1.6, 1.6)); } },
    { say: 'Fetch? He threw a twig. The dog brought back a tree.', show: ['grass', 'fence', 'g', 'dd', 'stick'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 30,
      cam: { pos: [3, 3.4, 16], look: [-.5, 2.4, 0], fov: 52, to: { pos: [2.6, 3.4, 15], look: [-.5, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.leash.visible = false; w.drool.visible = false; pup(w, 1 + Math.max(0, .5 - p) * 8, -.5, 0, t, 2.2, p < .5); w.stick.visible = p > .5; w.stick.position.set(-1.9, 3, -.5); gy(w, 3, 0, 2, Math.PI, t); } },
    { say: 'Bath time? Just a lick. A very big lick.', label: '*SLURP*', show: ['grass', 'fence', 'g', 'dd', 'drool'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [2.6, 2.6, 11], look: [0, 2.2, 0], fov: 50, to: { pos: [2.4, 2.6, 10.3], look: [0, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { w.leash.visible = false; w.stick.visible = false; pup(w, 3, -.2, 0, t); w.dd.position.x = 3.2 - Math.sin(Math.min(1, p * 2) * Math.PI) * .7; w.d.mouth.scale.y = p > .25 && p < .6 ? 5 : 1; gy(w, -.4, 0, 0, -1.4, t); w.drool.visible = p > .45; w.drool.children.forEach(d => { const i = d.userData.i; d.position.set(-.4 + Math.cos(i) * .6, .9 + Math.sin(i * 2) * .3, Math.sin(i) * .5); }); } },
    { say: 'Gary loves him anyway. Best friends.', label: '*BEST FRIENDS*', show: ['grass', 'fence', 'g', 'dd'], sky: '#F7B98A', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [2, 3.4, 12], look: [.4, 3.4, 0], fov: 50, to: { pos: [1.8, 3.4, 11], look: [.4, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { w.leash.visible = false; w.stick.visible = false; w.drool.visible = false; pup(w, 2.64, -.5, 0, t); gy(w, 0, 4.9, -.5, -1.4, t); } },
    { say: 'How many scent receptors in a dog\'s nose: thousands, millions, or hundreds of millions? Comment below.',
      quiz: { q: 'How many scent receptors does a dog\'s nose have?', options: ['Thousands', 'Millions', 'Hundreds of millions'], answer: 'Answer: up to about 300 million. Gary never stood a chance.' },
      show: ['grass', 'fence', 'g', 'dd'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 24,
      cam: { pos: [3, 3, 12], look: [.4, 4, 0], fov: 50, to: { pos: [-3, 3, 12], look: [.4, 4, 0] } },
      update: (w, p, t) => { w.leash.visible = false; w.stick.visible = false; w.drool.visible = false; pup(w, 2.64, -.5, 0, t); gy(w, 0, 4.9, -.5, -1.4, t); } },
  ],
};
