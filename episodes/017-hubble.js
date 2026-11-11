// 3D episode. Models are simplified and not to scale; the mirror error is hugely exaggerated.
const RAY = [300, 0, 0];     // side-on mirror and light rays
const DEV = [600, 0, 0];     // the test device
const XS = [-11, -7, -3, 3, 7, 11];

function setBeam(k, m, a, b) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b);
  m.position.copy(A).add(B).multiplyScalar(0.5); m.scale.z = Math.max(.01, A.distanceTo(B));
  m.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 0, 1), B.sub(A).normalize());
  return m;
}
function dish(k, r, parent, m) {
  const R = r / 0.3, g = new k.THREE.SphereGeometry(R, 64, 16, 0, Math.PI * 2, 0, Math.asin(0.3));
  const d = k.mesh(g, m, [0, R, 0], parent); d.rotation.x = Math.PI; return d;
}
const sag = x => 40 - Math.sqrt(1600 - x * x);    // height of the mirror surface at x

function setup(k) {
  const { mat, box, cyl, ball, torus, group } = k;
  const silver = mat('#C9CED6', { metal: .7, rough: .3 }), panel = mat('#2456A6', { metal: .3 }), gold = mat('#D9A441', { metal: .6, rough: .4 });
  const w = {};
  // --- orbit ---
  w.earth = ball(600, mat('#2B6CB0', { rough: .9 }), [0, -640, -60]);
  w.earth.receiveShadow = false;
  w.land = group([0, -640, -60]);
  for (let i = 0; i < 9; i++) { const b = ball(60 + (i % 3) * 30, mat('#4C9A5B', { rough: 1 }), [0, 0, 0], w.land); const a = i * 0.7, c = 0.28 + (i % 4) * 0.05; b.position.set(Math.sin(a) * Math.sin(c) * 566, Math.cos(c) * 566, Math.cos(a) * Math.sin(c) * 566); b.scale.y = .25; b.lookAt(0, -640, -60); b.receiveShadow = b.castShadow = false; }
  w.stars = group();
  for (let i = 0; i < 70; i++) ball(.9, mat('#FFFFFF', { glow: 2 }), [-260 + (i * 97) % 520, -40 + (i * 53) % 330, -330 - (i * 31) % 80], w.stars).castShadow = false;
  w.hubble = group([0, 0, 0]);
  const body = cyl(5, 5, 22, silver, [0, 0, 0], w.hubble); body.rotation.z = Math.PI / 2;
  const front = cyl(4.2, 4.2, 18, silver, [19, 0, 0], w.hubble); front.rotation.z = Math.PI / 2;
  const mouth = cyl(3.6, 3.6, .6, mat('#10131A'), [28.1, 0, 0], w.hubble); mouth.rotation.z = Math.PI / 2;
  box(.8, 10, 9, gold, [28.4, 7.6, 0], w.hubble).rotation.z = -.5;
  for (const z of [-1, 1]) { box(9, .5, 26, panel, [2, 0, z * 20], w.hubble); box(.7, .7, 8, silver, [2, 0, z * 8], w.hubble); }
  // astronaut and the corrective optics box
  w.fix = group([0, 0, 0], w.hubble);
  w.costar = box(4, 3, 3, mat('#39D98A', { glow: .7 }), [-2, 9, 0], w.fix);
  w.astro = group([4, 12, 3], w.fix);
  ball(1.3, mat('#FFFFFF'), [0, 2.6, 0], w.astro); box(2.2, 3, 1.4, mat('#FFFFFF'), [0, .4, 0], w.astro); box(2.6, 2.4, 1, mat('#B8BEC8'), [0, .6, -1.1], w.astro);

  // --- the mirror, seen from above ---
  w.mirror = group([0, -200, 0]);
  dish(k, 12, w.mirror, mat('#9FD8F5', { metal: .8, rough: .15, double: true }));
  cyl(12.4, 12.4, 2, mat('#5E6B7A'), [0, -1.05, 0], w.mirror, 64);
  w.rim = torus(11.2, .55, mat('#FF3B30', { glow: 1.6 }), [0, 1.9, 0], w.mirror);
  cyl(1.6, 1.6, .5, mat('#10131A'), [0, .2, 0], w.mirror, 24);

  // --- side-on: light rays hitting the mirror ---
  w.rays = group(RAY);
  dish(k, 12, w.rays, mat('#9FD8F5', { metal: .8, rough: .15, double: true }));
  w.beamsIn = XS.map(x => setBeam(k, box(.35, .35, 1, mat('#FFE27A', { glow: 2 }), [0, 0, 0], w.rays), [x, 46, 0], [x, sag(x), 0]));
  w.beamsOut = XS.map(() => box(.35, .35, 1, mat('#FFE27A', { glow: 2 }), [0, 0, 0], w.rays));
  w.focus = ball(1, mat('#FFFFFF', { glow: 3 }), [0, 26, 0], w.rays);

  // --- the test device: a tube with lenses, one of them out of position ---
  w.device = group(DEV);
  const tube = cyl(6, 6, 30, mat('#8FA3B8', { opacity: .28 }), [0, 15, 0], w.device, 40); tube.castShadow = false;
  for (const y of [6, 24]) cyl(5.2, 5.2, .9, mat('#9FD8F5', { metal: .5, opacity: .9 }), [0, y, 0], w.device, 40);
  w.lens = cyl(5.2, 5.2, .9, mat('#FF3B30', { glow: 1 }), [0, 15, 0], w.device, 40);
  w.ghost = cyl(5.2, 5.2, .3, mat('#39D98A', { glow: .8, opacity: .7 }), [0, 15, 0], w.device, 40);
  box(18, 1.2, 18, mat('#3B4658'), [0, -.6, 0], w.device);
  // two other testers that disagreed
  w.others = group([DEV[0], 0, 0]);
  for (const x of [-22, 22]) { box(8, 14, 8, mat('#59677A'), [x, 7, 0], w.others); ball(1.6, mat('#FFD21F', { glow: 2.5 }), [x, 16.5, 0], w.others); }
  return w;
}

// rays: err 0 = every ray meets at one point; 1 = outer rays miss it
function rays(w, k, err) {
  XS.forEach((x, i) => {
    const edge = Math.abs(x) / 11, fy = 26 + err * 8 * edge * edge;
    setBeam(k, w.beamsOut[i], [x, sag(x), 0], [x * -0.18 * err * edge, fy + 3 * err * edge, 0]);
    w.beamsOut[i].material.color.set(err > .5 && edge > .5 ? '#FF6A4D' : '#FFE27A'); w.beamsOut[i].material.emissive.set(err > .5 && edge > .5 ? '#FF6A4D' : '#FFE27A');
  });
  w.focus.scale.set(1 + err * 2.2, 1 + err * 4.5, 1 + err * 2.2); w.focus.position.y = 26 + err * 4;
  w.focus.material.emissive.set(err > .5 ? '#FF6A4D' : '#FFFFFF'); w.focus.material.color.set(err > .5 ? '#FF6A4D' : '#FFFFFF');
}
const ORBIT = ['earth', 'land', 'stars', 'hubble'];
const drift = (w, t) => { w.hubble.rotation.set(.25, t * .12, .1); };

export default {
  id: '017',
  style: '3d',
  voice: 'v2',
  case: 'HUBBLE SPACE TELESCOPE',
  year: 'LOW EARTH ORBIT · 1990',
  hook: ['IN ORBIT AT LAST.', 'AND IT WAS BLURRY.'],
  title: 'Hubble launched with a mirror ground to the wrong shape',
  description: 'The Hubble Space Telescope was launched on April 24, 1990 with a 2.4 m mirror whose outer edge was too flat by about 2,200 nanometres. A testing device had been assembled with one lens 1.3 mm out of position. Corrective optics were installed in December 1993.',
  tags: ['space', 'hubble', 'nasa', 'engineeringfailure', 'telescope', 'shorts'],
  sources: [
    'Wikipedia, "Hubble Space Telescope" — https://en.wikipedia.org/wiki/Hubble_Space_Telescope (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'The Hubble Space Telescope reached orbit in {1990.|nineteen ninety.} Then its first images came back blurred.',
      show: ORBIT, sky: '#05070D', lightAt: [0, 0, 0], lightDist: 70,
      cam: { pos: [70, 30, 90], look: [8, 0, 0], fov: 42, to: { pos: [40, 16, 70], look: [10, 0, 0], fov: 36 } },
      label: (t) => t > 4 ? 'FIRST IMAGES: *BLURRED*' : '',
      update: (w, p, t) => { drift(w, t); w.fix.visible = false; },
    },
    {
      say: 'Its main mirror is {2.4|two point four} meters wide. And its outer edge had been polished too flat, by about {2,200|twenty-two hundred} nanometers.',
      show: ['mirror'], sky: '#16243A', lightAt: [0, -200, 0], lightDist: 40,
      cam: { pos: [0, -140, 52], look: [0, -200, 0], fov: 40, to: { pos: [22, -156, 46], look: [0, -199, 0], fov: 38 } },
      label: (t) => t < 3.4 ? '*2.4 M* MIRROR' : 'EDGE TOO FLAT: *2,200 NM*', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t) => { w.rim.visible = t > 3.2; w.rim.material.emissiveIntensity = 1.4 + Math.sin(t * 7); },
    },
    {
      say: 'That is about one four hundred and fiftieth of a millimeter. Enough to stop the light from meeting at a single point.',
      show: ['rays'], sky: '#0B1020', lightAt: [300, 14, 0], lightDist: 50,
      cam: { pos: [300, 22, 86], look: [300, 21, 0], fov: 40, to: { pos: [306, 24, 70], look: [300, 24, 0], fov: 36 } },
      label: (t) => t < 3.6 ? 'PERFECT: *ONE POINT*' : 'FLAWED: *NO SHARP FOCUS*', note: 'ERROR EXAGGERATED',
      update: (w, p, t, k) => rays(w, k, k.h.win(t, 3.4, 4.6)),
    },
    {
      say: 'The cause was a testing device used to check the mirror\'s shape. One lens inside it sat {1.3|one point three} millimeters out of position.',
      show: ['device'], sky: '#2B2140', lightAt: [600, 14, 0], lightDist: 50,
      cam: { pos: [640, 34, 66], look: [600, 15, 0], fov: 38, to: { pos: [626, 20, 50], look: [600, 16, 0], fov: 34 } },
      label: (t) => t < 4.4 ? 'THE *TEST DEVICE*' : 'ONE LENS: *1.3 MM* OFF', note: 'OFFSET EXAGGERATED',
      update: (w, p, t, k) => { w.lens.position.y = 15 + k.h.win(t, 4.2, 5.4) * 2.6; w.ghost.visible = t > 4.2; },
    },
    {
      say: 'Other tests did report the error. They were dismissed, because the faulty device was considered more accurate.',
      show: ['device', 'others'], sky: '#3A2E5C', lightAt: [600, 10, 0], lightDist: 60,
      cam: { pos: [600, 30, 110], look: [600, 12, 0], fov: 42, to: { pos: [590, 24, 96], look: [600, 12, 0] } },
      label: (t) => t < 2.8 ? 'OTHER TESTS: *ERROR*' : 'RESULT: *DISMISSED*',
      update: (w, p, t) => { w.lens.position.y = 17.6; w.ghost.visible = true; w.others.children.forEach((c, i) => { if (i % 2) c.scale.setScalar(t < 2.8 ? 1 + .35 * Math.sin(t * 10) : .4); }); },
    },
    {
      say: 'In December {1993,|nineteen ninety-three,} astronauts flew up on the shuttle Endeavour and installed corrective optics. The telescope could finally see clearly.',
      show: ORBIT, sky: '#05070D', lightAt: [0, 0, 0], lightDist: 70,
      cam: { pos: [-50, 40, 80], look: [4, 4, 0], fov: 42, to: { pos: [-20, 26, 60], look: [2, 6, 0], fov: 36 } },
      label: (t) => t < 5 ? 'DECEMBER *1993*' : '*FIXED* IN ORBIT',
      update: (w, p, t, k) => { w.hubble.rotation.set(.1, .5, 0); w.fix.visible = true; const a = k.h.win(t, 2, 6); w.costar.position.y = 9 - a * 5.5; w.astro.position.y = 12 - a * 3 + Math.sin(t * 1.5) * .3; },
    },
    {
      say: 'Quick question. Which space shuttle launched Hubble in {1990?|nineteen ninety?} A, Atlantis. B, Discovery. Or C, Columbia. Comment your answer.',
      quiz: { q: 'Which space shuttle launched Hubble in 1990?', options: ['Atlantis', 'Discovery', 'Columbia'], answer: 'B — Discovery, on mission STS-31, April 24, 1990.' },
      show: ORBIT, sky: '#05070D', lightAt: [0, 0, 0], lightDist: 70,
      cam: { pos: [60, 130, 150], look: [0, -70, 0], fov: 46, to: { pos: [-40, 130, 150], look: [0, -70, 0] } },
      update: (w, p, t) => { drift(w, t); w.fix.visible = false; },
    },
  ],
};
