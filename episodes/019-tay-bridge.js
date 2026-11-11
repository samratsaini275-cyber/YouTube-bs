// 3D episode. Models are simplified and not to scale.
const DECK = 30, LUG = [500, 0, 0];

function setBeam(k, m, a, b) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b);
  m.position.copy(A).add(B).multiplyScalar(0.5); m.scale.z = Math.max(.01, A.distanceTo(B));
  m.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 0, 1), B.sub(A).normalize());
  return m;
}
const beam = (k, a, b, t, mat, parent) => setBeam(k, k.box(t, t, 1, mat, [0, 0, 0], parent), a, b);

function pier(k, x, parent, iron) {
  for (const z of [-2.5, 2.5]) k.cyl(.9, 1.1, DECK, iron, [x, DECK / 2, z], parent, 12);
  for (let i = 0; i < 3; i++) { const y = i * 10; beam(k, [x, y, -2.5], [x, y + 10, 2.5], .35, iron, parent); beam(k, [x, y, 2.5], [x, y + 10, -2.5], .35, iron, parent); }
  k.box(5, 3, 9, k.mat('#8C8377', { rough: 1 }), [x, 1.5, 0], parent);
}
function train(k, parent) {
  const g = k.group([0, 0, 0], parent), green = k.mat('#2E6B4A'), red = k.mat('#8E2F2A'), dark = k.mat('#22252B');
  const boiler = k.cyl(1.5, 1.5, 7, green, [3, 2.3, 0], g, 16); boiler.rotation.z = Math.PI / 2;
  k.box(3.4, 4, 3.2, green, [-2, 2.8, 0], g); k.cyl(.5, .6, 2.2, dark, [5.4, 4.6, 0], g, 10); k.box(11, .8, 3, dark, [1.5, .5, 0], g);
  for (let i = 0; i < 4; i++) { k.box(8, 3.4, 3, red, [-10 - i * 9, 2.4, 0], g); k.box(8.4, .6, 3.2, dark, [-10 - i * 9, .4, 0], g); }
  return g;
}

function setup(k) {
  const { mat, box, cyl, group } = k;
  const iron = mat('#5B6470', { metal: .4, rough: .5 });
  const w = {};
  w.water = k.ground('#2C6E9C', 0);
  w.shore = group(); box(120, 26, 300, mat('#6FA35A', { rough: 1 }), [-235, 12, 0], w.shore); box(120, 26, 300, mat('#6FA35A', { rough: 1 }), [235, 12, 0], w.shore);
  // low spans and their piers: these stay standing
  w.low = group();
  for (const x of [-165, -135, -105, -75, -45, 45, 75, 105, 135, 165]) pier(k, x, w.low, iron);
  for (const [a, b] of [[-180, -45], [45, 180]]) { box(b - a, 2.6, 5, iron, [(a + b) / 2, DECK - 1.3, 0], w.low); box(b - a, .5, 6.4, mat('#3D434C'), [(a + b) / 2, DECK + .25, 0], w.low); }
  // the high girders: trains ran inside these
  w.high = group();
  pier(k, -15, w.high, iron); pier(k, 15, w.high, iron);
  box(90, .5, 6.4, mat('#3D434C'), [0, DECK + .25, 0], w.high);
  for (const z of [-3.4, 3.4]) {
    beam(k, [-45, DECK, z], [45, DECK, z], .9, iron, w.high); beam(k, [-45, DECK + 11, z], [45, DECK + 11, z], .9, iron, w.high);
    for (let i = 0; i <= 12; i++) { const x = -45 + i * 7.5; beam(k, [x, DECK, z], [x, DECK + 11, z], .5, iron, w.high); if (i < 12) beam(k, [x, i % 2 ? DECK + 11 : DECK, z], [x + 7.5, i % 2 ? DECK : DECK + 11, z], .4, iron, w.high); }
  }
  for (let i = 0; i <= 12; i += 2) beam(k, [-45 + i * 7.5, DECK + 11, -3.4], [-45 + i * 7.5, DECK + 11, 3.4], .5, iron, w.high);
  w.train = train(k);                       // free-running train
  w.trainOn = train(k, w.high);             // the same train, riding the high girders as they fall
  w.trainOn.position.set(10, DECK + .5, 0);
  // wind streaks
  w.wind = group();
  for (let i = 0; i < 26; i++) box(.25, .25, 16, mat('#DCE9F5', { glow: .6, opacity: .7 }), [0, 0, 0], w.wind).castShadow = false;
  // close-up: a cast-iron column with the lug that held the bracing
  w.lug = group(LUG);
  cyl(5, 5, 34, iron, [0, 17, 0], w.lug, 32);
  w.lugPiece = box(3, 5, 2.4, mat('#7B8794', { metal: .4 }), [6.2, 18, 0], w.lug);
  cyl(.7, .7, 3.6, mat('#22252B'), [6.6, 18, 0], w.lug, 12).rotation.x = Math.PI / 2;
  w.brace = beam(k, [6.8, 18, 0], [30, 2, 0], 1.1, iron, w.lug);
  w.crack = beam(k, [5.1, 21, 1.3], [5.1, 15, 1.3], .5, mat('#FF3B30', { glow: 1.6 }), w.lug);
  return w;
}

const BRIDGE = ['water', 'shore', 'low', 'high'];
function pose(w, k, t, o = {}) {
  const f = o.fall || 0, e = f * f;
  w.high.rotation.x = e * 1.35; w.high.position.set(0, -e * 7, e * 10);
  w.train.visible = !o.onHigh && !o.noTrain; w.trainOn.visible = !!o.onHigh;
  w.train.position.set(o.trainX ?? -120, DECK + .5, 0);
  w.wind.visible = !!o.wind;
  if (o.wind) w.wind.children.forEach((s, i) => s.position.set(-150 + (i * 53) % 300, 8 + (i * 17) % 44, -90 + ((t * 120 + i * 37) % 180)));
}

export default {
  id: '019',
  style: '3d',
  voice: 'v3',
  case: 'THE TAY BRIDGE',
  year: 'SCOTLAND · 1879',
  hook: ['A BRIDGE. A STORM.', 'NOBODY PLANNED FOR WIND.'],
  title: 'The bridge designed without the wind',
  description: 'On December 28, 1879, during a violent storm, the high girders of the first Tay Rail Bridge fell into the Firth of Tay as a passenger train crossed. There were no survivors; as many as 75 people died. The design made no explicit allowance for wind loading.',
  tags: ['engineering', 'engineeringfailure', 'bridges', 'scotland', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Tay Bridge disaster" — https://en.wikipedia.org/wiki/Tay_Bridge_disaster (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'What happens when you design a bridge, and leave out the wind? Scotland found out, in {1879.|eighteen seventy-nine.}',
      show: [...BRIDGE, 'train'], sky: '#F1D9B5', lightAt: [0, 20, 0], lightDist: 150,
      cam: { pos: [150, 60, 210], look: [0, 26, 0], fov: 46, to: { pos: [90, 44, 130], look: [0, 30, 0], fov: 40 } },
      label: (t) => t > 3.6 ? 'SCOTLAND · *1879*' : '',
      update: (w, p, t, k) => pose(w, k, t, { trainX: -130 + t * 14 }),
    },
    {
      say: 'The Tay Bridge opened in {1878.|eighteen seventy-eight.} In the middle, trains ran inside tall iron girders, high above the water.',
      show: [...BRIDGE, 'train'], sky: '#BFE3F5', lightAt: [0, 30, 0], lightDist: 90,
      cam: { pos: [-70, 44, 60], look: [-10, 34, 0], fov: 42, to: { pos: [-30, 40, 44], look: [10, 34, 0], fov: 38 } },
      label: (t) => t < 2.6 ? 'OPENED *1878*' : 'THE *HIGH GIRDERS*', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t, k) => pose(w, k, t, { trainX: -70 + t * 12 }),
    },
    {
      say: 'Its designer made no explicit allowance for wind. And the iron castings that held the bracing were flawed.',
      show: ['lug'], sky: '#2B2140', lightAt: [506, 16, 0], lightDist: 50,
      cam: { pos: [540, 30, 60], look: [508, 16, 0], fov: 40, to: { pos: [526, 22, 40], look: [506, 17, 0], fov: 34 } },
      label: (t) => t < 3.2 ? 'WIND: *NOT ALLOWED FOR*' : 'CASTINGS: *FLAWED*', note: 'ONE BRACING LUG · SIMPLIFIED',
      update: (w, p, t, k) => { const c = k.h.win(t, 3.2, 5.4); w.crack.visible = c > 0; w.crack.scale.z = Math.max(.01, 6 * c); },
    },
    {
      say: '{December 28th.|December twenty-eighth.} A violent storm hits the bridge side-on. A passenger train starts across.',
      show: [...BRIDGE, 'train', 'wind'], sky: '#1E2A3F', lightAt: [0, 20, 0], lightDist: 150,
      cam: { pos: [-150, 12, 120], look: [-20, 30, 0], fov: 48, to: { pos: [-110, 16, 100], look: [0, 32, 0], fov: 44 } },
      label: (t) => t < 2 ? 'DECEMBER *28*' : 'STORM: *SIDE-ON*',
      update: (w, p, t, k) => pose(w, k, t, { wind: true, trainX: -175 + t * 16 }),
    },
    {
      say: 'At {7:16|seven sixteen} that evening, the high girders fell into the river. The train went with them.',
      show: [...BRIDGE, 'wind'], sky: '#3A1C2A', lightAt: [0, 20, 0], lightDist: 150,
      cam: { pos: [110, 34, 150], look: [0, 22, 10], fov: 44, to: { pos: [130, 44, 160], look: [0, 8, 20] } },
      label: (t) => t < 3.4 ? '*7:16* PM' : 'THE TRAIN *FELL TOO*',
      shake: (t) => t > 1.4 && t < 3.8 ? .7 : 0,
      update: (w, p, t, k) => pose(w, k, t, { wind: true, onHigh: true, fall: k.h.clamp((t - 1.4) / 2.4) }),
    },
    {
      say: 'There were no survivors. As many as {75|seventy-five} people died.',
      show: ['water', 'shore', 'low'], sky: '#14202F', lightAt: [0, 20, 0], lightDist: 150,
      cam: { pos: [-60, 100, 320], look: [0, 10, 0], fov: 46, to: { pos: [-20, 90, 290], look: [0, 10, 0] } },
      label: (t) => t < 2 ? '*NO* SURVIVORS' : 'UP TO *75* DEAD',
      update: (w, p, t, k) => pose(w, k, t, { noTrain: true }),
    },
    {
      say: 'Quick question. What happened to the locomotive? A, it was never found. B, it went to a museum. Or C, it was repaired, and ran until {1919.|nineteen nineteen.} Comment your answer.',
      quiz: { q: 'What happened to the locomotive?', options: ['Never found', 'Sent to a museum', 'Repaired, ran until 1919'], answer: 'C — it was salvaged and repaired, and stayed in service until 1919.' },
      show: ['water', 'shore', 'low', 'train'], sky: '#274B73', lightAt: [0, 20, 0], lightDist: 150,
      cam: { pos: [-90, 150, 260], look: [-110, -70, 0], fov: 46, to: { pos: [-150, 150, 250], look: [-110, -70, 0] } },
      update: (w, p, t, k) => pose(w, k, t, { trainX: -150 + t * 4 }),
    },
  ],
};
