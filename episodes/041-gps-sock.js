// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the GPS sock is fictional.
const BED = [300, 0, 0];

function sock(k, parent, pos, color) {
  const g = k.group(pos, parent), m = k.mat(color, { rough: .9 });
  k.cyl(1, 1, 4, m, [0, 2, 0], g, 20);
  k.box(2, 1.8, 3.4, m, [0, .9, 1.2], g);
  k.box(2.05, .5, 1, k.mat('#FFFFFF'), [0, 3.7, 0], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#C9D6E3', 0);
  w.wall = box(80, 40, 1, mat('#EAF1F8'), [0, 20, -12], k.scene);
  // the GPS sock
  w.sock = sock(k, k.scene, [0, 0, 0], '#E2453C');
  w.antenna = group([0, 4, 0], w.sock);
  cyl(.06, .06, 3, mat('#222222'), [0, 1.5, 0], w.antenna, 6); w.blink = ball(.3, mat('#22E06B', { glow: 2 }), [0, 3.1, 0], w.antenna);
  box(1.2, .8, .3, mat('#1E2430'), [0, 2.4, 1.05], w.sock);
  // the washing machine
  w.washer = group([0, 0, -2]);
  box(12, 13, 10, mat('#5B8DEF', { rough: .3 }), [0, 6.5, 0], w.washer);
  box(12.1, 2, 10.1, mat('#F4F6F8'), [0, 12, 0], w.washer);
  const door = k.torus(3.4, .5, mat('#B8BEC8', { metal: .7 }), [0, 6, 5.1], w.washer); door.rotation.set(0, 0, 0);
  k.mesh(new k.THREE.CircleGeometry(3.2, 40), mat('#CFE8FA', { opacity: .18 }), [0, 6, 5.12], w.washer).castShadow = false;
  w.drum = group([0, 6, 4.6], w.washer);
  k.mesh(new k.THREE.CircleGeometry(3.2, 40), mat('#2A2F38'), [0, 6, 4.2], w.washer);
  ['#E2453C', '#2F6FD6', '#FFD21F', '#14B8A6', '#7A4FD6'].forEach((c, i) => { const s = sock(k, w.drum, [Math.cos(i * 1.26) * 1.1, Math.sin(i * 1.26) * 1.1 - .9, 0], c); s.scale.setScalar(.45); s.rotation.z = i; });
  ball(.25, mat('#22E06B', { glow: 2 }), [4.5, 12.1, 4.6], w.washer);
  // the map: a dot spinning in circles
  w.map = group([0, 0, 0]);
  box(16, .3, 16, mat('#DDEFD6'), [0, .15, 0], w.map);
  for (let i = -3; i <= 3; i++) { box(16, .05, .3, mat('#FFFFFF'), [0, .32, i * 2.4], w.map); box(.3, .05, 16, mat('#FFFFFF'), [i * 2.4, .32, 0], w.map); }
  box(2.4, .6, 2.4, mat('#9AA3AE'), [0, .5, 0], w.map);
  w.dot = ball(.5, mat('#E2453C', { glow: 1.5 }), [0, 1.2, 0], w.map);
  w.ring = k.torus(1.4, .08, mat('#E2453C', { glow: 1 }), [0, .9, 0], w.map);
  // the lonely partner sock on a bed
  w.bed = group(BED);
  box(20, 3, 14, mat('#7A4FD6'), [0, 1.5, 0], w.bed); box(20, 1, 14, mat('#F4F1EA'), [0, 3.5, 0], w.bed);
  box(6, 1.6, 4, mat('#FFFFFF'), [-6, 4.6, -3], w.bed);
  w.partner = sock(k, w.bed, [2, 4, 1], '#E2453C'); w.partner.rotation.set(0, -.6, 0);
  return w;
}

function blink(w, t) { w.blink.material.emissiveIntensity = (t * 2 % 1) < .5 ? 2.5 : .2; }
const ROOM = ['floor', 'wall'];

export default {
  id: '041',
  style: '3d',
  voice: 'v3',
  case: 'THE GPS SOCK',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS SOCK', 'HAS GPS.'],
  title: 'Engineers put GPS in a sock so you never lose one',
  description: 'Satellite tracking. A battery. A tiny antenna. One wash cycle. (A made-up sock, sadly.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'socks', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the GPS sock, its tracking and the washing machine are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Engineers put GPS in a sock. So you never lose one again.',
      show: [...ROOM, 'sock'], sky: '#EAF1F8', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [8, 7, 16], look: [0, 3.5, 0], fov: 42, to: { pos: [5, 6, 11], look: [0, 4, 0], fov: 40 } },
      update: (w, p, t) => { w.sock.rotation.y = t * .5; blink(w, t); },
    },
    {
      say: 'Satellite link. Battery. A tiny antenna.',
      show: [...ROOM, 'sock'], sky: '#DCE9F5', lightAt: [0, 5, 0], lightDist: 15,
      cam: { pos: [3, 9, 6], look: [0, 6, 0], fov: 40, to: { pos: [2, 8.5, 4.5], look: [0, 6.5, .5], fov: 38 } },
      update: (w, p, t) => { w.sock.rotation.y = .4; blink(w, t); },
    },
    {
      say: 'First wash.',
      show: [...ROOM, 'washer'], sky: '#EAF1F8', lightAt: [0, 6, 2], lightDist: 25,
      cam: { pos: [8, 11, 34], look: [0, 6.5, 0], fov: 44, to: { pos: [5, 9, 26], look: [0, 6.5, 2], fov: 42 } },
      shake: (t) => .2,
      update: (w, p, t) => { w.drum.rotation.z = -t * 6; },
    },
    {
      say: 'The signal goes round. And round. And round.',
      show: [...ROOM, 'map'], sky: '#EAF1F8', lightAt: [0, 1, 0], lightDist: 15,
      cam: { pos: [0, 14, 9], look: [0, 0, 0], fov: 44, to: { pos: [0, 11, 6], look: [0, 0, 0], fov: 42 } },
      update: (w, p, t) => { const a = t * 6; w.dot.position.set(Math.cos(a) * 1.4, 1.2, Math.sin(a) * 1.4); },
    },
    {
      say: 'It was never seen again. Its partner is still waiting.',
      show: ['bed'], sky: '#3A3550', lightAt: [300, 4, 0], lightDist: 15,
      cam: { pos: [310, 11, 18], look: [301, 5.5, 0], fov: 42, to: { pos: [307, 9.5, 14], look: [301.5, 6, .5], fov: 40 } },
      update: (w, p, t) => { w.partner.rotation.y = -.6 + .03 * Math.sin(t); },
    },
    {
      say: 'Quick question. Where do lost socks really go? Option A, the washing machine. Option B, another dimension. Or option C, they move out. Comment your answer.',
      quiz: { q: 'Where do lost socks really go?', options: ['The washing machine', 'Another dimension', 'They move out'], answer: 'Nobody knows. The GPS sock is made up, so it cannot tell us either.' },
      show: [...ROOM, 'washer'], sky: '#274B73', lightAt: [0, 6, 2], lightDist: 25,
      cam: { pos: [12, 2, 28], look: [0, 12, 0], fov: 46, to: { pos: [-12, 2, 28], look: [0, 12, 0] } },
      update: (w, p, t) => { w.drum.rotation.z = -t * 6; },
    },
  ],
};
