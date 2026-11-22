// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Gary-led (every fourth). Gary + a pet dog (pets are the top topic).
// Hook: the premise as a question under 2 s; first frame shows tiny Gary in front of a normal dog that looks enormous next to him.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.grass = group(); for (let i = 0; i < 40; i++) { const g = cone(.12, 1.6 + (i % 4) * .4, mat(i % 2 ? '#5E9E4A' : '#6FB357'), [-12 + (i * 1.37) % 24, .9, -6 - (i * .71) % 5], w.grass, 5); g.rotation.z = .1 * Math.sin(i); }
  w.g = gary(k, k.scene, 1.4, '#FFC21F');
  w.d = dog(k, k.scene); w.dg = w.d.root; w.dg.scale.setScalar(2.6);
  w.mush = group(); cyl(.45, .55, 2.2, mat('#F2E6D0'), [0, 1.1, 0], w.mush, 14); const cap = k.mesh(new k.THREE.SphereGeometry(1.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#E2453C'), [0, 2.1, 0], w.mush); for (let i = 0; i < 5; i++) ball(.15, mat('#FFFFFF'), [Math.cos(i * 1.3) * .7, 2.75, Math.sin(i * 1.3) * .7], w.mush);
  w.lead = cyl(.02, .02, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.lead.castShadow = false;
  w.crumb = box(.2, .15, .2, mat('#D9A95B', { glow: .2 }), [0, 0, 0]);
  w.log = group(); cyl(.4, .45, 5, mat('#6B4B2E'), [0, 0, 0], w.log, 10).rotation.z = Math.PI / 2;
  w.bub = group(); for (let i = 0; i < 10; i++) { const b = ball(.3, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.bub); b.userData.i = i; b.castShadow = false; }
  w.tub = group(); const tb = cyl(4, 3.4, 2.4, mat('#FFFFFF', { rough: .3 }), [0, 1.2, 0], w.tub, 24); tb.scale.z = .6;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 16); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const dp = (w, x, z, ry, t) => { w.dg.position.set(x, 0, z); w.dg.rotation.set(0, ry, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0); w.d.tail.rotation.x = .8 * Math.sin(t * 12); w.d.mouth.scale.y = 1; w.d.legs.forEach(l => l.rotation.z = 0); };
const lead = (w) => { w.dg.updateMatrixWorld(true); w.g.updateMatrixWorld(true); const A = new w.dg.position.constructor(), B = A.clone(); w.d.head.localToWorld(A.set(0, -.4, 0)); w.g.localToWorld(B.set(.5, .45, 0));
  w.lead.position.copy(A).add(B).multiplyScalar(.5); w.lead.scale.y = A.distanceTo(B); w.lead.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '188',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GETS A DOG',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'HAD A DOG?'],
  title: 'What would happen if Gary the ant had a dog?',
  description: 'Walks mean Gary flies like a kite. He throws a crumb, the dog brings back a log. And bath time? Gary hides in the bubbles. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'dogs', 'funny', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up. Quiz answer makes no factual claim.',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary had a dog?',
      show: ['ground', 'grass', 'g', 'dg', 'mush'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [1.5, 3, 16], look: [1, 5, 0], fov: 46, to: { pos: [1.3, 3, 15], look: [1, 5, 0], fov: 44 } },
      update: (w, p, t) => { dp(w, 4.2, -.5, 0, t); w.d.head.rotation.z = -.2; w.mush.position.set(-.8, 0, -.3); gy(w, -.8, 2.75, -.3, -.2, t); w.g.rotation.z = .08 * Math.sin(t * 3); },
    },
    {
      say: 'Walks? Gary flies like a kite.',
      show: ['ground', 'grass', 'g', 'dg', 'lead'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [-1, 3.5, 18], look: [-3, 3.4, 0], fov: 50, to: { pos: [2, 3.5, 17], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => {
        dp(w, -4 + t * 3, 0, Math.PI, t); w.d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * 10 + (i % 2) * Math.PI)); w.dg.position.y = .2 * Math.abs(Math.sin(t * 10));
        gy(w, w.dg.position.x - 5, 2.6 + .6 * Math.sin(t * 5), 1, Math.PI / 2, t, true); w.g.rotation.z = .3 * Math.sin(t * 5); lead(w);
      },
    },
    {
      say: 'Fetch? He throws a crumb. It brings back a log.',
      show: ['ground', 'grass', 'g', 'dg', 'crumb', 'log'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [2, 3, 15], look: [0, 4.2, 0], fov: 48, to: { pos: [1.8, 3, 14], look: [0, 4.2, 0], fov: 46 } },
      update: (w, p, t) => {
        gy(w, -1.5, .05, 3, -.5, t); const q = Math.min(1, t / .8); w.crumb.visible = t < 1; w.crumb.position.set(-1 + q * 1.5, .3 + Math.sin(q * Math.PI) * 1.2, 3 - q * .5);
        const back = Math.max(0, t - 1.2); dp(w, 5 - Math.min(3, back * 3), 0, .3, t); w.d.legs.forEach((l, i) => l.rotation.z = back > 0 && back < 1.3 ? .5 * Math.sin(t * 10 + (i % 2) * Math.PI) : 0);
        w.dg.updateMatrixWorld(true); const v = new w.dg.position.constructor(); w.d.head.localToWorld(v.set(-.7, -.3, 0)); w.log.position.copy(v); w.log.rotation.set(0, .3 + Math.PI / 2, 0);
      },
    },
    {
      say: 'Bath time? Gary hides in the bubbles.',
      show: ['ground', 'grass', 'g', 'dg', 'tub', 'bub'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [3, 7, 15], look: [0, 3.8, 0], fov: 48, to: { pos: [2.6, 7, 14], look: [0, 3.8, 0], fov: 46 } },
      update: (w, p, t) => {
        w.tub.position.set(0, 0, 0); dp(w, 0, 0, 1.1, t); w.dg.position.y = 1.2; w.dg.scale.setScalar(2.6); w.d.mouth.scale.y = 1.5;
        w.bub.children.forEach(b => { const i = b.userData.i; b.position.set(-2.4 + (i % 5) * 1.2, 2.6 + .1 * Math.sin(t * 4 + i), (i < 5 ? .9 : -.4)); b.scale.setScalar(2 + .3 * Math.sin(t * 3 + i)); });
        gy(w, .6, 3.3 + .1 * Math.sin(t * 6), 1.8, -.6, t); w.g.scale.setScalar(1.2);
      },
    },
    {
      say: 'Gary\'s dog: cute, a disaster, or perfect? Comment below.',
      quiz: { q: 'Should Gary keep the dog?', options: ['Cute', 'A disaster', 'Perfect'], answer: 'Gary is made up. The dog is very real in his heart.' },
      show: ['ground', 'grass', 'g', 'dg', 'mush'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [5, 3, 13], look: [.5, 4, 0], fov: 46, to: { pos: [-4, 3, 13], look: [.5, 4, 0] } },
      update: (w, p, t) => { w.dg.scale.setScalar(2.6); w.g.scale.setScalar(1.4); dp(w, 4.2, -.5, 0, t); w.mush.position.set(-.8, 0, -.3); gy(w, -.8, 2.75, -.3, -.2, t); },
    },
  ],
};
