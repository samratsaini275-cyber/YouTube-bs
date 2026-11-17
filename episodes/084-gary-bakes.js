// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his baking are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary on a kitchen counter next to a giant mixing bowl.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B79C', 0);
  w.kitchen = group();
  box(60, .6, 16, mat('#E8E8E8', { rough: .3 }), [0, -.3, 0], w.kitchen);
  box(60, 30, .5, mat('#BFE3EA'), [0, 14, -8], w.kitchen);
  for (let i = 0; i < 12; i++) for (let j = 0; j < 6; j++) box(4.8, 4.8, .1, mat((i + j) % 2 ? '#BFE3EA' : '#F4FAFC'), [-27 + i * 5, 2.5 + j * 5, -7.7], w.kitchen).castShadow = false;
  // giant mixing bowl, flour bag and egg
  w.bowl = group([6, 0, -2]);
  const bw = cyl(6, 3.6, 5, mat('#E2453C', { rough: .3 }), [0, 2.5, 0], w.bowl, 40); bw.material.side = k.THREE.DoubleSide;
  cyl(5.6, 5.6, .2, mat('#F7E7C6'), [0, 4.2, 0], w.bowl, 40);
  w.flour = group([-9, 0, -4]);
  box(5, 8, 3.4, mat('#F4F1E8'), [0, 4, 0], w.flour); box(3, 2, .1, mat('#2F6FD6'), [0, 4.5, 1.75], w.flour);
  w.egg = ball(2, mat('#FFF6E0', { rough: .4 }), [0, 0, 0]); w.egg.scale.y = 1.3;
  w.g = gary(k, k.scene, 2.2);
  // the tiny cake
  w.cake = group([0, 0, 0]);
  cyl(.5, .5, .4, mat('#8B5A2B'), [0, .2, 0], w.cake, 20); cyl(.52, .52, .12, mat('#FF9EC4'), [0, .45, 0], w.cake, 20);
  cyl(.04, .04, .4, mat('#FFFFFF'), [0, .7, 0], w.cake, 6);
  w.flame = cone(.06, .15, mat('#FF9A1F', { glow: 3 }), [0, .97, 0], w.cake, 8); w.flame.castShadow = false;
  // the colony
  w.colony = group([0, 0, 0]);
  w.ants = [];
  for (let i = 0; i < 60; i++) { const a = gary(k, w.colony, 1.6, i % 7 === 0 ? '#E2453C' : null); a.userData.home = [-12 - (i % 12) * 1.7, 0, -4 + Math.floor(i / 12) * 1.7]; w.ants.push(a); }
  w.confetti = group();
  for (let i = 0; i < 24; i++) { const c = box(.25, .04, .15, mat(['#FFD21F', '#E2453C', '#22C55E', '#2F6FD6'][i % 4], { glow: .5 }), [0, 0, 0], w.confetti); c.userData = { a: i * 2.4, r: .5 + (i % 5) * .5, ph: (i * .13) % 1 }; c.castShadow = false; }
  return w;
}

const BASE = ['ground', 'kitchen', 'g'];

export default {
  id: '084',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY BAKES A CAKE',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BAKED A CAKE.'],
  title: 'Gary the ant baked a cake',
  description: 'The bowl is a swimming pool. The egg is a boulder. The guest list is a problem. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'baking', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032), his cake and his party are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant baked a cake.',
      show: [...BASE, 'bowl', 'flour'], sky: '#BFE3EA', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [-1, 3, 16], look: [1, 5.5, -1], fov: 50, to: { pos: [-1, 3, 14.5], look: [1, 5.5, -1], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-1.5, 0, 2); w.g.rotation.y = .2; scurry(w.g, t, 12); },
    },
    {
      say: 'Step one: crack an egg.',
      show: [...BASE, 'egg'], sky: '#BFE3EA', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [2, 3, 12], look: [1, 2.5, 0], fov: 48, to: { pos: [2, 3, 11], look: [1, 2.5, 0], fov: 46 } },
      update: (w, p, t) => {
        const roll = Math.max(0, t - .5); w.egg.position.set(4 - roll * 3, 2.6, 0); w.egg.rotation.z = roll * 1.4;
        w.g.position.set(0 - roll * 3.6, 0, 0); w.g.rotation.y = roll > 0 ? Math.PI : 0; scurry(w.g, t, roll > 0 ? 50 : 10);
      },
    },
    {
      say: 'Two hours later: a cake the size of a crumb.',
      show: [...BASE, 'cake'], sky: '#FFE3C2', lightAt: [0, 2, 0], lightDist: 10,
      cam: { pos: [2.5, 2.4, 8.5], look: [.4, .9, 0], fov: 42, to: { pos: [2.3, 2.3, 7.5], look: [.4, .9, 0], fov: 40 } },
      update: (w, p, t) => { w.cake.position.set(1.4, 0, 0); w.flame.scale.y = 1 + .3 * Math.sin(t * 17); w.g.position.set(-.6, 0, .4); w.g.rotation.y = -.2; scurry(w.g, t, 6); },
    },
    {
      say: 'Then the whole colony shows up.',
      show: [...BASE, 'cake', 'colony'], sky: '#FFE3C2', lightAt: [-8, 3, 0], lightDist: 22,
      cam: { pos: [5, 6, 15], look: [-6, 1, 0], fov: 52, to: { pos: [4.5, 6, 13.5], look: [-5, 1, 0], fov: 50 } },
      update: (w, p, t) => {
        w.cake.position.set(1.4, 0, 0); w.g.position.set(-.6, 0, .4); w.g.rotation.y = Math.PI; scurry(w.g, t, 6);
        w.ants.forEach((a, i) => { const [x, y, z] = a.userData.home; a.position.set(x + t * 3, 0, z); a.rotation.y = 0; scurry(a, t + i, 40); });
      },
    },
    {
      say: 'Gary gets one slice. A very, very thin one.',
      show: [...BASE, 'cake', 'confetti'], sky: '#FFD9A8', lightAt: [0, 2, 0], lightDist: 10,
      cam: { pos: [2.5, 2.4, 8.5], look: [.4, .9, 0], fov: 42, to: { pos: [2.3, 2.3, 7.5], look: [.4, .9, 0], fov: 40 } },
      update: (w, p, t) => {
        w.cake.position.set(1.4, 0, 0); w.cake.scale.set(.06, 1, 1); w.flame.visible = false;
        w.g.position.set(-.6, 0, .4); w.g.rotation.y = -.3; scurry(w.g, t, 6);
        w.confetti.children.forEach(c => { const u = c.userData, f = (t * .5 + u.ph) % 1; c.position.set(Math.cos(u.a) * u.r, 4 - f * 4, Math.sin(u.a) * u.r * .5); c.rotation.set(f * 9, u.a, 0); });
      },
    },
    {
      say: 'Gary\'s next cake: sugar, honey, or leaf? Comment below.',
      quiz: { q: 'What cake should Gary bake next?', options: ['Sugar', 'Honey', 'Leaf'], answer: 'Gary is made up, so any of them. The colony votes for all three.' },
      show: [...BASE, 'bowl', 'flour'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [4, 2, 15], look: [0, 7, -1], fov: 48, to: { pos: [-4, 2, 15], look: [0, 7, -1] } },
      update: (w, p, t) => { w.cake.scale.set(1, 1, 1); w.flame.visible = true; w.g.position.set(-1.5, 0, 2); w.g.rotation.y = .2; scurry(w.g, t, 12); },
    },
  ],
};
