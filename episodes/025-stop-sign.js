// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
const ROW = [300, 0, 0];   // five signs in a row, to compare shapes from behind

// a road sign: plate with `sides` edges facing +z, grey back, optional lettering
function sign(k, parent, pos, o) {
  const T = k.THREE, g = k.group(pos, parent), r = o.r || 6, spin = o.spin ?? Math.PI / o.sides;
  k.cyl(.45, .45, 22, k.mat('#8D96A3', { metal: .5 }), [0, 11, -.5], g, 12);
  const plate = k.cyl(r, r, .5, k.mat(o.color), [0, 22, 0], g, o.sides); plate.rotation.set(Math.PI / 2, spin, 0);
  const rim = k.cyl(r * .9, r * .9, .52, k.mat(o.color), [0, 22, .02], g, o.sides); rim.rotation.set(Math.PI / 2, spin, 0);
  if (o.border) { plate.material = k.mat(o.border); }
  const back = k.cyl(r * .995, r * .995, .3, k.mat('#A9B1BC', { metal: .4 }), [0, 22, -.3], g, o.sides); back.rotation.set(Math.PI / 2, spin, 0);
  if (o.text) {
    const c = document.createElement('canvas'); c.width = 512; c.height = 256; const x = c.getContext('2d');
    x.fillStyle = o.textColor || '#fff'; x.font = '900 150px Inter, Arial, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(o.text, 256, 136);
    const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace;
    const face = new T.Mesh(new T.PlaneGeometry(r * 1.5, r * .75), new T.MeshBasicMaterial({ map: tex, transparent: true }));
    face.position.set(0, 22, .3); g.add(face);
  }
  return g;
}

function setup(k) {
  const { mat, box, cyl, group } = k;
  const w = {};
  w.ground = k.ground('#7DB65B', 0);
  w.road = group();
  box(400, .3, 26, mat('#4A4F57', { rough: 1 }), [0, .15, 26], w.road); box(26, .3, 400, mat('#4A4F57', { rough: 1 }), [-30, .16, 0], w.road);
  for (let i = -8; i <= 8; i++) box(8, .1, .7, mat('#E8E2D6'), [i * 22, .34, 26], w.road).castShadow = false;
  // the sign through history, all on the same spot
  w.s1954 = sign(k, k.scene, [0, 0, 0], { sides: 8, color: '#C8102E', border: '#FFFFFF', text: 'STOP' });
  w.s1922 = sign(k, k.scene, [0, 0, 0], { sides: 8, color: '#F2C200', border: '#1B1D22', text: 'STOP', textColor: '#1B1D22' });
  w.s1914 = sign(k, k.scene, [0, 0, 0], { sides: 4, color: '#F4F4F0', border: '#1B1D22', text: 'STOP', textColor: '#1B1D22', r: 6.4 });
  // a car
  w.car = group([0, 0, 0]);
  box(11, 3, 5.4, mat('#2E6FD9'), [0, 2.6, 0], w.car); box(6, 2.4, 5, mat('#DCE9F5'), [-.6, 5.2, 0], w.car);
  for (const [x, z] of [[-3.4, 2.7], [3.4, 2.7], [-3.4, -2.7], [3.4, -2.7]]) cyl(1.3, 1.3, .9, mat('#1B1D22'), [x, 1.3, z], w.car, 16).rotation.x = Math.PI / 2;
  // five signs in a row
  w.row = group(ROW);
  box(120, .3, 30, mat('#4A4F57', { rough: 1 }), [0, .15, 0], w.row);
  sign(k, w.row, [-34, 0, 0], { sides: 3, color: '#F4F4F0', border: '#C8102E', spin: Math.PI });
  sign(k, w.row, [-17, 0, 0], { sides: 40, color: '#F2C200', border: '#1B1D22' });
  w.rowStop = sign(k, w.row, [0, 0, 0], { sides: 8, color: '#C8102E', border: '#FFFFFF', text: 'STOP' });
  sign(k, w.row, [17, 0, 0], { sides: 4, color: '#F2C200', border: '#1B1D22', spin: 0 });
  sign(k, w.row, [34, 0, 0], { sides: 4, color: '#2E7D4A', border: '#FFFFFF' });
  return w;
}
const car = (w, x) => { w.car.position.set(x, 0, 26); };

export default {
  id: '025',
  style: '3d',
  voice: 'v3',
  case: 'THE STOP SIGN',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['EIGHT SIDES.', 'NOT AN ACCIDENT.'],
  title: 'Why stop signs have eight sides',
  description: 'The stop sign\'s unique eight-sided shape lets drivers facing the back of it tell that oncoming drivers have a stop sign, and it could be identified at night before signs were reflective. The octagon was chosen in 1922; the sign was yellow until 1954.',
  tags: ['engineering', 'design', 'whyisitbuiltlikethat', 'roadsigns', 'stopsign', 'shorts'],
  sources: [
    'Wikipedia, "Stop sign" — https://en.wikipedia.org/wiki/Stop_sign (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'A stop sign has eight sides. No other road sign looks like it. And that is the whole point.',
      show: ['ground', 'road', 's1954', 'car'], sky: '#BFE3F5', lightAt: [0, 14, 0], lightDist: 60,
      cam: { pos: [26, 20, 52], look: [0, 18, 0], fov: 42, to: { pos: [12, 22, 34], look: [0, 21, 0], fov: 36 } },
      update: (w, p, t) => car(w, -90 + t * 9),
    },
    {
      say: 'See it from behind, and you can still tell what it is. So you know the other driver has to stop.',
      show: ['row'], sky: '#F1D9B5', lightAt: [300, 14, 0], lightDist: 70,
      cam: { pos: [300, 24, -96], look: [300, 19, 0], fov: 44, to: { pos: [300, 22, -54], look: [300, 21, 0], fov: 36 } },
      label: (t) => t < 3.4 ? 'FROM *BEHIND*' : 'STILL AN *OCTAGON*', note: 'SIGN SHAPES SIMPLIFIED',
    },
    {
      say: 'The shape worked at night, too. Early signs were not reflective. But an octagon could still be picked out in the dark.',
      show: ['row'], sky: '#0B1020', lightAt: [300, 14, 0], lightDist: 70,
      cam: { pos: [270, 12, 74], look: [300, 20, 0], fov: 42, to: { pos: [288, 16, 50], look: [300, 21, 0], fov: 36 } },
      label: (t) => t < 3 ? 'NOT *REFLECTIVE*' : 'THE SHAPE *STILL READS*',
    },
    {
      say: 'The first stop sign went up in Detroit, in {1914.|nineteen fourteen.} It was a white square, with black letters.',
      show: ['ground', 'road', 's1914'], sky: '#E8E2D6', lightAt: [0, 14, 0], lightDist: 60,
      cam: { pos: [-22, 18, 44], look: [0, 19, 0], fov: 40, to: { pos: [-10, 20, 32], look: [0, 21, 0], fov: 36 } },
      label: (t) => t < 3.4 ? 'DETROIT · *1914*' : 'A WHITE *SQUARE*',
    },
    {
      say: 'In {1922,|nineteen twenty-two,} a committee chose the octagon. But the sign was not red. It was yellow.',
      show: ['ground', 'road', 's1922'], sky: '#BFE3F5', lightAt: [0, 14, 0], lightDist: 60,
      cam: { pos: [20, 16, 42], look: [0, 19, 0], fov: 40, to: { pos: [8, 20, 30], look: [0, 21, 0], fov: 36 } },
      label: (t) => t < 3.2 ? '*1922*: THE OCTAGON' : 'BUT IT WAS *YELLOW*',
    },
    {
      say: 'Why yellow? Red that would not fade did not exist yet. Red only became the rule in {1954.|nineteen fifty-four.}',
      show: ['ground', 'road', 's1922', 's1954'], sky: '#F3C9A8', lightAt: [0, 14, 0], lightDist: 60,
      cam: { pos: [0, 20, 44], look: [0, 20, 0], fov: 40, to: { pos: [6, 21, 32], look: [0, 21, 0], fov: 36 } },
      label: (t) => t < 4.4 ? 'NO FADE-PROOF *RED* YET' : 'RED SINCE *1954*',
      update: (w, p, t) => { w.s1922.visible = t < 4.4; w.s1954.visible = t >= 4.4; },
    },
    {
      say: 'Quick question. How big was that very first stop sign? A, {12|twelve} inches square. B, {24|twenty-four} inches square. Or C, {48|forty-eight} inches square. Comment your answer.',
      quiz: { q: 'How big was the very first stop sign?', options: ['12 inches square', '24 inches square', '48 inches square'], answer: 'B — 24 by 24 inches (61 cm), somewhat smaller than the current sign.' },
      show: ['ground', 'road', 's1914'], sky: '#274B73', lightAt: [0, 14, 0], lightDist: 60,
      cam: { pos: [14, 34, 60], look: [0, -2, 0], fov: 46, to: { pos: [-14, 34, 60], look: [0, -2, 0] } },
    },
  ],
};
