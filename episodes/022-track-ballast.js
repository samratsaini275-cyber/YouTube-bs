// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
const CLOSE = [0, -300, 0];   // sharp stones vs round pebbles
const BARS = [400, 0, 0];     // ballast depth bars
const rnd = i => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
const surf = z => (Math.abs(z) < 7 ? 1.8 : 1.8 - (Math.abs(z) - 7) * 0.63);   // top of the ballast mound across the track

function setup(k) {
  const { mat, box, cyl, cone, ball, group, THREE } = k;
  const w = {};
  w.ground = k.ground('#7DB65B', -2);
  // --- the track ---
  w.track = group();
  // solid core so you cannot see through the stones, then a skin of individual stones
  for (const [zw, y, hgt] of [[14, .8, 2], [18, -.3, 1.4], [22, -1.1, 1.2], [26, -1.7, .6]]) box(220, hgt, zw, mat('#6F7278', { rough: 1 }), [0, y, 0], w.track);
  const N = 2600, geo = new THREE.DodecahedronGeometry(.55, 0), stones = new THREE.InstancedMesh(geo, mat('#9A9DA3', { rough: 1, flat: true }), N), d = new THREE.Object3D();
  for (let i = 0; i < N; i++) {
    const z = -13 + rnd(i + .5) * 26; d.position.set(-110 + rnd(i) * 220, surf(z) + .15 + rnd(i + 2) * .25, z);
    d.rotation.set(rnd(i + 3) * 6, rnd(i + 4) * 6, rnd(i + 5) * 6); d.scale.setScalar(.7 + rnd(i + 6) * .8); d.updateMatrix(); stones.setMatrixAt(i, d.matrix);
  }
  stones.castShadow = stones.receiveShadow = true; w.track.add(stones);
  for (let i = -21; i <= 21; i++) box(1.7, .9, 11.5, mat('#5B4634', { rough: .9 }), [i * 5, 2.2, 0], w.track);
  for (const z of [-3.6, 3.6]) { box(220, 1, .5, mat('#B9C0CA', { metal: .7, rough: .3 }), [0, 3.1, z], w.track); box(220, .3, .9, mat('#D9DEE5', { metal: .8, rough: .2 }), [0, 3.7, z], w.track); }
  // --- a train ---
  w.train = group();
  for (let i = 0; i < 3; i++) { box(26, 7, 7.6, mat(i ? '#E8ECF1' : '#F2F2EE'), [-i * 27.5, 8, 0], w.train); box(26.2, 1.6, 7.7, mat('#1F6FA8'), [-i * 27.5, 7.6, 0], w.train); box(24, 2.2, 7.7, mat('#22252B'), [-i * 27.5, 9.8, 0], w.train); }
  const nose = cone(3.6, 9, mat('#F2F2EE'), [17, 7.4, 0], w.train, 4); nose.rotation.z = -Math.PI / 2; nose.scale.set(1, 1, 1.5);
  // --- helpers on the track: load arrows, side arrows, rain ---
  const red = mat('#FF3B30', { glow: 1 });
  w.load = group();
  for (const x of [-8, 0, 8]) { const g = group([x, 0, 0], w.load); cyl(.6, .6, 5, red, [0, 20, 0], g, 10); cone(1.6, 3.2, red, [0, 16, 0], g, 12).rotation.x = Math.PI; }
  w.side = group();
  for (const s of [-1, 1]) { const g = group([30, 2.6, s * 16], w.side); cyl(.6, .6, 6, red, [0, 0, 0], g, 10).rotation.x = Math.PI / 2; cone(1.6, 3.2, red, [0, 0, -s * 4.4], g, 12).rotation.x = -s * Math.PI / 2; }
  w.rain = group();
  for (let i = 0; i < 60; i++) box(.12, 2.4, .12, mat('#7FD0FF', { glow: .8, opacity: .85 }), [0, 0, 0], w.rain).castShadow = false;

  // --- close-up: why the stones are sharp ---
  w.close = group(CLOSE);
  box(70, 1, 30, mat('#3B4658'), [0, -.5, 0], w.close);
  w.sharp = []; w.pebbles = [];
  for (let i = 0; i < 44; i++) {
    const row = Math.floor(i / 11), col = i % 11, x = (col - 5) * 2.1 + (row % 2) * 1.05, y = 1 + row * 1.7, z = (rnd(i) - .5) * 3;
    const s = k.mesh(new THREE.DodecahedronGeometry(1.25, 0), mat('#9A9DA3', { rough: 1, flat: true }), [-11 + x * .9, y, z], w.close); s.rotation.set(rnd(i + 1) * 6, rnd(i + 2) * 6, 0); w.sharp.push(s);
    const p = ball(1.1, mat('#C9B79A', { rough: .6 }), [11 + x * .9, y, z], w.close); p.userData = { x: x * .9, y, row }; w.pebbles.push(p);
  }
  w.tieA = box(14, 2, 6, mat('#5B4634'), [-11, 9, 0], w.close); w.tieB = box(14, 2, 6, mat('#5B4634'), [11, 9, 0], w.close);

  // --- depth bars, to scale ---
  w.bars = group(BARS);
  box(40, 1, 16, mat('#3B4658'), [0, -.5, 0], w.bars);
  w.b150 = box(8, 1, 8, mat('#FFD21F', { glow: .5 }), [-8, 0, 0], w.bars); w.b500 = box(8, 1, 8, mat('#39C6FF', { glow: .5 }), [8, 0, 0], w.bars);
  return w;
}
const bar = (m, hgt) => { m.scale.y = Math.max(.01, hgt); m.position.y = hgt / 2; };
function scene(w, t, o = {}) {
  w.train.visible = o.trainX !== undefined; if (w.train.visible) w.train.position.set(o.trainX, 0, 0);
  w.load.visible = !!o.load; if (o.load) w.load.children.forEach((g, i) => { g.position.y = -4 + Math.abs(Math.sin(t * 4 + i)) * 2; });
  w.side.visible = !!o.side; if (o.side) w.side.children.forEach((g, i) => { g.position.z = (i ? 1 : -1) * (17 - 4 * Math.abs(Math.sin(t * 3))); });
  w.rain.visible = !!o.rain;
  if (o.rain) w.rain.children.forEach((r, i) => { const c = (t * 1.4 + rnd(i)) % 1; r.position.set(-14 + rnd(i + 7) * 28, 26 - c * 26, -12 + rnd(i + 9) * 24); r.visible = r.position.y > surf(r.position.z) - 1; });
}
const TRACK = ['ground', 'track', 'train', 'load', 'side', 'rain'];

export default {
  id: '022',
  style: '3d',
  voice: 'v3',
  case: 'RAILWAY TRACK STONES',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['LOOSE STONES.', 'ON PURPOSE.'],
  title: 'Why railway tracks sit on loose stones',
  description: 'The crushed stone under a railway is called ballast. It bears the load of the ties, rails and trains, restrains sideways movement, drains water and keeps down vegetation. The stones are sharp-edged so that they interlock.',
  tags: ['engineering', 'design', 'whyisitbuiltlikethat', 'railway', 'trains', 'shorts'],
  sources: [
    'Wikipedia, "Track ballast" — https://en.wikipedia.org/wiki/Track_ballast (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'Why do railway tracks sit on a pile of loose stones? It looks like a shortcut. It is not.',
      show: TRACK, sky: '#BFE3F5', lightAt: [0, 2, 0], lightDist: 70,
      cam: { pos: [44, 16, 34], look: [0, 3, 0], fov: 44, to: { pos: [30, 9, 22], look: [0, 3, 0], fov: 38 } },
      update: (w, p, t) => scene(w, t, { trainX: -150 + t * 22 }),
    },
    {
      say: 'The stones are called ballast. They are packed below, between and around the ties, to carry the weight of the train.',
      show: TRACK, sky: '#F1D9B5', lightAt: [0, 2, 0], lightDist: 70,
      cam: { pos: [-30, 7, 26], look: [0, 4, 0], fov: 42, to: { pos: [-18, 6, 20], look: [4, 4, 0], fov: 38 } },
      label: (t) => t < 2.4 ? 'IT\'S CALLED *BALLAST*' : 'IT CARRIES THE *WEIGHT*', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t) => scene(w, t, { trainX: -60 + t * 9, load: t > 3.4 }),
    },
    {
      say: 'They are not smooth pebbles. They are crushed, with sharp edges. So they lock together, and grip the ties.',
      show: ['close'], sky: '#22303F', lightAt: [0, -294, 0], lightDist: 50,
      cam: { pos: [0, -282, 96], look: [0, -294, 0], fov: 44, to: { pos: [0, -286, 86], look: [0, -295, 0], fov: 44 } },
      label: (t) => t < 3.6 ? '*SHARP*, NOT SMOOTH' : 'THEY *LOCK TOGETHER*', note: 'LEFT: CRUSHED STONE · RIGHT: ROUND PEBBLES',
      update: (w, p, t, k) => {
        const press = k.h.win(t, 2.6, 5.6);
        w.tieA.position.y = 9 - press * 1.0; w.tieB.position.y = 9 - press * 5.2;
        w.pebbles.forEach(pb => { const u = pb.userData; pb.position.x = 11 + u.x * (1 + press * (.25 + u.row * .14)); pb.position.y = u.y * (1 - press * .55); });
      },
    },
    {
      say: 'A raised shoulder of stone on each side stops the track from sliding sideways.',
      show: TRACK, sky: '#DDE3EA', lightAt: [0, 2, 0], lightDist: 70,
      cam: { pos: [60, 8, 0.1], look: [0, 3, 0], fov: 40, to: { pos: [50, 12, 8], look: [0, 3, 0], fov: 38 } },
      label: 'THE *SHOULDER*',
      update: (w, p, t) => scene(w, t, { side: true }),
    },
    {
      say: 'Rain? It drains straight through the gaps. And the stones keep weeds down.',
      show: TRACK, sky: '#3A4658', lightAt: [0, 2, 0], lightDist: 70,
      cam: { pos: [34, 14, 30], look: [0, 3, 0], fov: 42, to: { pos: [26, 8, 22], look: [0, 2, 0], fov: 38 } },
      label: (t) => t < 2.6 ? 'RAIN *DRAINS* THROUGH' : 'WEEDS *KEPT DOWN*',
      update: (w, p, t) => scene(w, t, { rain: true }),
    },
    {
      say: 'The layer is never less than {150|a hundred and fifty} millimeters thick. On high speed lines, it can be half a meter.',
      show: ['bars'], sky: '#1D2B45', lightAt: [400, 6, 0], lightDist: 40,
      cam: { pos: [400, 14, 84], look: [400, 8, 0], fov: 40, to: { pos: [408, 16, 76], look: [400, 8, 0] } },
      label: (t) => t < 3.4 ? 'AT LEAST *150 MM*' : 'HIGH SPEED: UP TO *500 MM*', note: 'BAR HEIGHTS TO SCALE',
      update: (w, p, t, k) => { bar(w.b150, 4.5 * k.h.win(t, .6, 1.8)); bar(w.b500, 15 * k.h.win(t, 3.4, 4.8)); },
    },
    {
      say: 'Quick question. Americans call the beams under the rails ties. What are they called in Britain? A, sleepers. B, joists. Or C, planks. Comment your answer.',
      quiz: { q: 'Americans call them ties. What are the beams under the rails called in Britain?', options: ['Sleepers', 'Joists', 'Planks'], answer: 'A — sleepers.' },
      show: TRACK, sky: '#274B73', lightAt: [0, 2, 0], lightDist: 70,
      cam: { pos: [30, 60, 80], look: [0, -40, 0], fov: 46, to: { pos: [-20, 60, 80], look: [0, -40, 0] } },
      update: (w, p, t) => scene(w, t, { trainX: -120 + t * 14 }),
    },
  ],
};
