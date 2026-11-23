// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a bedroom at night.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#7A5A9A', 0);
  w.wall = box(60, 30, .5, mat('#2C3E6B'), [0, 15, -6]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 14; i++) { const s = ball(.08, mat('#FFF4C2', { glow: 1 }), [-6 + (i * 4.3) % 12, 3 + (i * 2.7) % 6, -5.7], w.stars); s.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.sock = group(); const s1 = cyl(.9, .9, 3, mat('#3B82F6', { rough: .9 }), [0, .9, 0], w.sock, 18); s1.rotation.z = Math.PI / 2; s1.scale.set(1, 1, .55); const toe = ball(.9, mat('#3B82F6', { rough: .9 }), [1.5, .9, 0], w.sock); toe.scale.set(1, 1, .55); for (let i = 0; i < 4; i++) { const st = cyl(.92, .92, .2, mat('#FFFFFF'), [-1.3 + i * .25, .9, 0], w.sock, 18); st.rotation.z = Math.PI / 2; st.scale.set(1, 1, .56); }
  w.pillow = group(); const p = box(3, 1.2, 2, mat('#FFFFFF', { rough: .9 }), [0, 0, 0], w.pillow);
  w.feathers = group(); for (let i = 0; i < 12; i++) { const f = box(.25, .02, .1, mat('#FFFFFF'), [0, 0, 0], w.feathers); f.userData.i = i; f.castShadow = false; }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.35, .06, .05, m, [0, .15, 0], z); box(.35, .06, .05, m, [0, -.15, 0], z); const d = box(.42, .06, .05, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.washer = group(); box(8, 8, .3, mat('#EEF3F7'), [0, 4, -4], w.washer); const back = cyl(3.4, 3.4, .2, mat('#5B6B7A', { metal: .4, rough: .4 }), [0, 3.6, -3.6], w.washer, 32); back.rotation.x = Math.PI / 2; const ring = k.torus(3.5, .35, mat('#C0C8D0', { metal: .6, rough: .3 }), [0, 3.6, .4], w.washer); ring.rotation.set(0, 0, 0); for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; box(.3, .3, 4, mat('#9AA6B2', { metal: .5 }), [Math.cos(a) * 3.3, 3.6 + Math.sin(a) * 3.3, -1.6], w.washer); } w.bubbles = group(); for (let i = 0; i < 12; i++) { const b = ball(.25, mat('#FFFFFF', { glow: .2 }), [0, 0, 0], w.bubbles); b.material.transparent = true; b.material.opacity = .7; b.userData.i = i; b.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '237',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SLEEPOVER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO A SLEEPOVER.'],
  title: 'Gary the ant went to a sleepover',
  description: 'His sleeping bag is a sock. The pillow fight lasts one second. And in the morning, he wakes up somewhere very wet. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'sleepover', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: worker fire ants sleep in hundreds of short naps a day, each about a minute long (Cassill et al., "Sleep cycles and the fire ant", Journal of Insect Behavior, 2009).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary went to a sleepover.',
      show: ['floor', 'wall', 'stars', 'g'], sky: '#2C3E6B', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 6.5], look: [0, .6, 0], fov: 46, to: { pos: [1.5, 1.4, 5.9], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'His sleeping bag? A sock.',
      show: ['floor', 'wall', 'stars', 'g', 'sock'], sky: '#2C3E6B', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [.8, 2.4, 11], look: [.5, 1.6, 0], fov: 46, to: { pos: [.8, 2.4, 10.2], look: [.5, 1.6, 0], fov: 44 } },
      update: (w, p, t) => { w.sock.position.set(-.4, 0, 0); gy(w, 1.9, 1.3, 0, -1.3, t); w.g.rotation.z = -.2; },
    },
    {
      say: 'Pillow fight? He lost. Instantly.',
      show: ['floor', 'wall', 'stars', 'g', 'pillow', 'feathers'], sky: '#2C3E6B', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.5, 2.6, 9.5], look: [1.2, 1.3, 0], fov: 50, to: { pos: [1.5, 2.6, 9], look: [1.2, 1.3, 0], fov: 48 } },
      update: (w, p, t) => {
        const hit = Math.min(1, t / .5); w.pillow.position.set(-4 + hit * 2.4, 1.2, 0); w.pillow.rotation.z = hit * .4; const fly = Math.max(0, t - .5);
        gy(w, Math.min(3, .4 + fly * 1.6), Math.max(0, Math.sin(Math.min(1, fly * 1.2) * Math.PI) * 2), 0, -1.4, t); w.g.rotation.z = -fly * 6;
        w.feathers.children.forEach(f => { const i = f.userData.i, q = Math.max(0, t - .5) * .8; f.visible = t > .5; f.position.set(-.4 + Math.cos(i) * q * 2, 1.6 + Math.sin(i * 2) * q - q * q * .4, Math.sin(i) * q); f.rotation.set(i + t * 3, i, t * 2); });
      },
    },
    {
      say: 'He woke up in the washing machine.',
      show: ['washer', 'g', 'sock'], sky: '#BFE3F7', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [0, 3.6, 10], look: [0, 3.4, -1.6], fov: 50, to: { pos: [0, 3.6, 9.3], look: [0, 3.4, -1.6], fov: 48 } },
      update: (w, p, t) => {
        const a = t * 2; w.sock.position.set(Math.cos(a + 2) * 1.6, 3.4 + Math.sin(a + 2) * 1.6, -1.6); w.sock.rotation.z = a; w.sock.scale.setScalar(.6);
        gy(w, Math.cos(a) * 1.8, 3.2 + Math.sin(a) * 1.8, -1.2, -1.4, t); w.g.rotation.z = a;
        w.bubbles.children.forEach(b => { const i = b.userData.i, q = (t * .4 + i / 12) % 1; b.position.set(Math.cos(i * 2) * 2.4, 1.4 + q * 4, -1.2 + Math.sin(i) * .4); });
      },
    },
    {
      say: 'Best sleepover snack: a crumb, a sprinkle, or a pea? Comment below.',
      quiz: { q: 'What is the best sleepover snack for Gary?', options: ['A crumb', 'A sprinkle', 'A pea'], answer: 'Fun fact: fire ants take hundreds of tiny naps every day.' },
      show: ['floor', 'wall', 'stars', 'g', 'sock'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 2.6, 11], look: [.8, 2.8, 0], fov: 46, to: { pos: [-1, 2.6, 11], look: [.8, 2.8, 0] } },
      update: (w, p, t) => { w.sock.scale.setScalar(1); w.sock.rotation.z = 0; w.sock.position.set(-.4, 0, 0); gy(w, 1.9, 1.3, 0, -1.3, t); },
    },
  ],
};
