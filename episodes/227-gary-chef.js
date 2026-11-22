// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary in a chef's hat next to a giant pan.

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
  w.counter = k.ground('#E9E2D3', 0);
  w.wall = box(60, 30, .5, mat('#F2C2A0'), [0, 15, -5]); w.wall.castShadow = false;
  w.tiles = group(); for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) { const t = box(1.9, 1.9, .05, mat((i + j) % 2 ? '#FFFFFF' : '#E7EEF3'), [-9 + i * 2, 1 + j * 2, -4.7], w.tiles); t.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, null);
  w.hat = group(); cyl(.22, .22, .3, mat('#FFFFFF'), [0, 0, 0], w.hat, 14); ball(.3, mat('#FFFFFF'), [0, .3, 0], w.hat).scale.set(1, .8, 1);
  w.pan = group(); cyl(1.8, 1.6, .35, mat('#2A2A2A', { metal: .4 }), [0, .2, 0], w.pan, 28); box(2.6, .15, .35, mat('#2A2A2A'), [3.1, .32, 0], w.pan);
  w.rice = ball(.1, mat('#FFFDF5'), [0, 0, 0], k.scene); w.rice.scale.set(1.8, 1, 1);
  w.pepper = group(); cyl(.6, .6, 2.2, mat('#2A2A2A'), [0, 1.1, 0], w.pepper, 14); ball(.6, mat('#C0C8D0', { metal: .7 }), [0, 2.2, 0], w.pepper).scale.y = .6;
  w.dots = group(); for (let i = 0; i < 14; i++) { const d = ball(.05, mat('#333333'), [0, 0, 0], w.dots); d.userData.i = i; d.castShadow = false; }
  w.puff = group(); for (let i = 0; i < 8; i++) { const p = ball(.2, mat('#FFFFFF', { glow: .3 }), [0, 0, 0], w.puff); p.userData.i = i; p.castShadow = false; }
  w.mum = gary(k, k.scene, 1.3, null); const bow = group([.12, .66, 0], w.mum); ball(.13, mat('#FF5DA2'), [0, 0, -.12], bow); ball(.13, mat('#FF5DA2'), [0, 0, .12], bow);
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = cone(.25, .1, mat('#FFD21F', { glow: 1 }), [-1 + i * .5, 0, 0], w.stars, 5); s.rotation.x = Math.PI / 2; s.userData.i = i; s.castShadow = false; }
  w.plate = cyl(.8, .7, .08, mat('#FFFFFF'), [0, .04, 0], k.scene, 24);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(.36, .6, 0); w.g.localToWorld(v); w.hat.position.copy(v); w.hat.rotation.copy(w.g.rotation); };

export default {
  id: '227',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CHEF GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BECAME A CHEF.'],
  title: 'Gary the ant became a chef',
  description: 'Today\'s special: one grain of rice. A little pepper. A big sneeze. And a five-star review from a very proud customer. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'chef', 'cooking', 'funny', 'shorts'],
  sources: [
    'Quiz fact: leafcutter ants grow fungus gardens on the leaves they collect and eat the fungus (Smithsonian National Museum of Natural History, "Leafcutter Ants").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant became a chef.',
      show: ['counter', 'wall', 'tiles', 'g', 'hat', 'pan'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.8, 2.2, 6.5], look: [.3, .8, 0], fov: 46, to: { pos: [2.6, 2.2, 5.8], look: [.3, .8, 0], fov: 44 } },
      update: (w, p, t) => { w.pan.position.set(-1.2, 0, -.6); gy(w, 1, 0, .4, -1.2, t); w.g.rotation.z = .08 * Math.sin(t * 5); w.hat.rotation.z = w.g.rotation.z; },
    },
    {
      say: 'Today\'s special? One grain of rice.',
      show: ['counter', 'wall', 'tiles', 'g', 'hat', 'pan', 'rice'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 3.4, 5.5], look: [-.6, .7, 0], fov: 46, to: { pos: [1.5, 3.2, 4.9], look: [-.6, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.pan.position.set(-1.2, 0, -.6); gy(w, 1, 0, .4, -1.2, t); w.rice.position.set(-1.2, .45 + .2 * Math.abs(Math.sin(t * 6)), -.6); w.rice.rotation.z = t * 4; },
    },
    {
      say: 'He adds pepper. Achoo!',
      show: ['counter', 'wall', 'tiles', 'g', 'hat', 'pepper', 'dots', 'puff'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2.6, 2.4, 7], look: [.4, .9, 0], fov: 48, to: { pos: [2.4, 2.4, 6.3], look: [.4, .9, 0], fov: 46 } },
      update: (w, p, t) => {
        w.pepper.position.set(-1, 0, -.4); w.pepper.rotation.z = .2 * Math.sin(t * 8); const sneeze = t > 1; gy(w, 1, 0, .4, -1.2, t); if (sneeze) { w.g.position.x = 1 + Math.min(.3, (t - 1) * 2); w.g.rotation.z = -.3; w.hat.position.y += .4 * Math.min(1, (t - 1) * 3); }
        w.dots.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 14) % 1; d.position.set(-1 + Math.sin(i) * .4 + q * 1.4, 2.3 - q * 1.6, -.4 + Math.cos(i) * .4); });
        w.puff.children.forEach(pf => { const i = pf.userData.i, f = Math.max(0, t - 1) * 2; pf.visible = sneeze && f < 1.5; pf.position.set(1.4 - f * 1.4 + Math.sin(i) * .2, .5 + Math.cos(i * 2) * .3 * f, .4 + Math.sin(i * 3) * .3 * f); pf.scale.setScalar(.5 + f * .6); });
      },
    },
    {
      say: 'His review? Five stars. From his mum.',
      show: ['counter', 'wall', 'tiles', 'g', 'hat', 'mum', 'stars', 'plate', 'rice'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.4, 2.6, 7.4], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 2.6, 6.7], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => {
        gy(w, 1.1, 0, .2, -2.2, t); w.mum.position.set(-1.1, 0, .2); w.mum.rotation.set(0, -.9, 0); w.mum.userData.legs.forEach(l => l.rotation.x = 0); w.plate.position.set(0, 0, .8); w.rice.position.set(0, .14, .8);
        w.stars.children.forEach(s => { const i = s.userData.i; s.visible = t > i * .2; s.position.set(-1 + i * .5, 2.6 + .1 * Math.sin(t * 4 + i), .5); s.rotation.z = t * 2; });
      },
    },
    {
      say: 'Gary\'s restaurant: Crumbs, Tiny Table, or Ant Bistro? Comment below.',
      quiz: { q: 'What should Gary call his restaurant?', options: ['Crumbs', 'Tiny Table', 'Ant Bistro'], answer: 'Fun fact: leafcutter ants grow their own fungus gardens to eat.' },
      show: ['counter', 'wall', 'tiles', 'g', 'hat', 'pan'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [4.4, 2.4, 5.6], look: [.6, 1, 0], fov: 46, to: { pos: [-2.4, 2.4, 6], look: [.6, 1, 0] } },
      update: (w, p, t) => { w.pan.position.set(-1.2, 0, -.6); gy(w, 1, 0, .4, -1.2, t); },
    },
  ],
};
