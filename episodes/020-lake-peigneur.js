// 3D episode. A diorama: models are simplified and not to scale.
const FALL = [400, 0, 0];   // where the waterfall model lives
const HOLE = [10, 6];       // where the drill went in (x, z)

function setBeam(k, m, a, b) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b);
  m.position.copy(A).add(B).multiplyScalar(0.5); m.scale.z = Math.max(.01, A.distanceTo(B));
  m.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 0, 1), B.sub(A).normalize());
  return m;
}
const beam = (k, a, b, t, mat, parent) => setBeam(k, k.box(t, t, 1, mat, [0, 0, 0], parent), a, b);

function setup(k) {
  const { mat, box, cyl, cone, ball, torus, group } = k;
  const soil = mat('#8A6B4A', { rough: 1 }), grass = mat('#6FA35A', { rough: 1 }), salt = mat('#E9E4DA', { rough: .9 }), steel = mat('#D9702B', { metal: .3 });
  const w = {};
  // --- the block of land: grass rim, shallow lake, soil, then a salt layer with a mine in it ---
  w.land = group();
  box(140, 14, 90, soil, [0, -10, 0], w.land); box(140, 26, 90, salt, [0, -30, 0], w.land);
  for (const [x, z, sx, sz] of [[0, -40, 140, 10], [0, 40, 140, 10], [-62, 0, 16, 70], [62, 0, 16, 70]]) box(sx, 3, sz, grass, [x, -1.5, z], w.land);
  for (let i = 0; i < 9; i++) { const x = -60 + (i * 53) % 120, z = i % 2 ? -40 : 40; cyl(.5, .6, 3, mat('#6B4A2E'), [x, 1.5, z], w.land, 8); ball(2.4, mat('#3E7D4A', { rough: 1 }), [x, 4.6, z], w.land); }
  // mine caverns, visible on the cut front face
  w.mine = group([0, 0, 45.2], w.land);
  for (const [x, y, sx] of [[-30, -28, 50], [24, -28, 40], [-4, -37, 70]]) box(sx, 6, .4, mat('#2A2F3A'), [x, y, 0], w.mine);
  w.flood = box(1, 6, .5, mat('#2C7FB8', { glow: .3 }), [0, -37, .1], w.mine);
  w.flood2 = box(1, 6, .5, mat('#2C7FB8', { glow: .3 }), [24, -28, .1], w.mine);
  w.lake = box(108, 3, 70, mat('#3F9AD6', { rough: .3 }), [0, -1.6, 0], w.land); w.lake.castShadow = false;
  w.bed = box(108, .4, 70, mat('#6E5A40', { rough: 1 }), [0, -3, 0], w.land);
  // drilling rig
  w.rig = group([HOLE[0], 0, HOLE[1]]);
  box(12, 1.2, 12, mat('#5E6B7A'), [0, .6, 0], w.rig);
  for (const [x, z] of [[-4, -4], [4, -4], [-4, 4], [4, 4]]) beam(k, [x, 1.2, z], [x * .2, 26, z * .2], .7, steel, w.rig);
  for (const y of [8, 15, 22]) { const s = 4 * (1 - (y - 1.2) / 31) + .8; for (const [a, b] of [[[-s, y, -s], [s, y, -s]], [[s, y, -s], [s, y, s]], [[s, y, s], [-s, y, s]], [[-s, y, s], [-s, y, -s]]]) beam(k, a, b, .4, steel, w.rig); }
  w.drill = cyl(.6, .6, 1, mat('#FFD21F', { glow: 1.2 }), [HOLE[0], 0, 45.6], w.land, 10);
  // barges and a tug
  w.boats = group();
  for (let i = 0; i < 6; i++) box(9, 1.6, 4, mat(i === 5 ? '#C2443A' : '#59677A'), [0, 0, 0], w.boats);
  // whirlpool
  w.swirl = group([HOLE[0], .1, HOLE[1]]);
  for (let i = 0; i < 4; i++) { const r = torus(5 + i * 5, .5, mat('#EAF6FF', { glow: .8, opacity: .85 }), [0, 0, 0], w.swirl); r.scale.set(1, 1, .25); r.castShadow = false; }
  cyl(3, 3, .3, mat('#0B2233'), [0, -.1, 0], w.swirl, 24);

  // --- waterfall model: the canal running backwards into the emptied lake ---
  w.fall = group(FALL);
  box(60, 50, 40, mat('#8A6B4A', { rough: 1 }), [-30, 25, 0], w.fall); box(60, 3, 40, grass, [-30, 51.5, 0], w.fall);
  box(60, 2, 12, mat('#3F9AD6', { rough: .3 }), [-30, 52.2, 0], w.fall);
  w.sheet = box(1.2, 1, 12, mat('#BFE6FF', { glow: .5, opacity: .9 }), [.8, 26, 0], w.fall); w.sheet.castShadow = false;
  box(90, 2, 60, mat('#6E5A40', { rough: 1 }), [40, 1, 0], w.fall);
  w.pool = box(80, 1, 56, mat('#2C7FB8', { rough: .3 }), [42, 2.4, 0], w.fall);
  w.spray = group([6, 3, 0], w.fall);
  for (let i = 0; i < 8; i++) ball(1.6, mat('#FFFFFF', { rough: 1, opacity: .8 }), [0, 0, 0], w.spray).castShadow = false;
  return w;
}

// drain 0..1 empties the lake into the mine; swirl shows the whirlpool; refill 0..1 brings salt water back
function pose(w, k, t, o = {}) {
  const d = o.drain || 0, rf = o.refill || 0, level = (1 - d) + rf;
  w.lake.scale.y = Math.max(.02, Math.min(1, level)); w.lake.position.y = -3 + 1.5 * w.lake.scale.y; w.lake.visible = level > .03;
  w.lake.material.color.set(rf > 0 ? '#1F6FA8' : '#3F9AD6');
  w.flood.scale.x = Math.max(.01, 70 * Math.min(1, d * 1.6)); w.flood.visible = d > 0;
  w.flood2.scale.x = Math.max(.01, 40 * k.h.clamp((d - .4) * 2.5)); w.flood2.visible = d > .4;
  const dr = o.drill ?? 1; w.drill.scale.y = Math.max(.01, 34 * dr); w.drill.position.y = -17 * dr; w.drill.visible = dr > 0 && !o.noDrill;
  const sw = o.swirl || 0; w.swirl.visible = sw > 0;
  w.swirl.children.forEach((r, i) => { if (i < 4) { r.rotation.z = t * (3 - i * .5); r.scale.set(sw, sw, .25); } });
  w.swirl.position.y = -3 + 3 * Math.max(0.02, level) + .1;
  const sink = o.sink || 0;
  w.rig.position.y = -sink * 34; w.rig.rotation.z = sink * .6; w.rig.visible = sink < .98;
  w.boats.visible = !o.noBoats;
  w.boats.children.forEach((b, i) => {
    const a0 = i * 1.05, r0 = 26 + (i % 3) * 8, s = k.h.clamp(sink * 1.4 - i * .06), r = r0 * (1 - s), a = a0 + s * 7;
    b.position.set(HOLE[0] + Math.cos(a) * r, w.swirl.position.y + .7 - s * s * 20, HOLE[1] + Math.sin(a) * r * .7); b.rotation.y = -a; b.visible = s < .97;
  });
}
const LAND = ['land', 'rig', 'boats', 'swirl'];

export default {
  id: '020',
  style: '3d',
  voice: 'v3',
  case: 'LAKE PEIGNEUR',
  year: 'LOUISIANA · 1980',
  hook: ['ONE DRILL HOLE.', 'A WHOLE LAKE, GONE.'],
  title: 'The oil rig that drained a whole lake',
  description: 'On November 20, 1980, a drilling rig working for Texaco pierced a salt mine under Lake Peigneur, Louisiana. The lake drained into the mine, swallowing the rig, 11 barges, a tugboat and 65 acres of land. All 55 miners escaped and nobody was killed.',
  tags: ['engineering', 'engineeringfailure', 'louisiana', 'lakepeigneur', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Lake Peigneur" — https://en.wikipedia.org/wiki/Lake_Peigneur (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'How do you drain an entire lake by accident? You drill a hole in the bottom.',
      show: LAND, sky: '#BFE3F5', lightAt: [0, 0, 0], lightDist: 110,
      cam: { pos: [110, 90, 150], look: [0, -8, 0], fov: 44, to: { pos: [70, 60, 110], look: [8, -4, 6], fov: 38 } },
      update: (w, p, t, k) => pose(w, k, t, { drill: k.h.win(t, 2.4, 4.4) * .5, swirl: k.h.win(t, 3.6, 5) * .6 }),
    },
    {
      say: 'Louisiana, {1980.|nineteen eighty.} Lake Peigneur is just ten feet deep. And an oil rig is drilling there.',
      show: LAND, sky: '#F1D9B5', lightAt: [0, 0, 0], lightDist: 110,
      cam: { pos: [-90, 22, 110], look: [6, 6, 4], fov: 44, to: { pos: [-50, 16, 80], look: [10, 10, 6], fov: 38 } },
      label: (t) => t < 2.2 ? 'LOUISIANA · *1980*' : 'JUST *10 FT* DEEP', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t, k) => pose(w, k, t, { drill: 0 }),
    },
    {
      say: 'But under the lake, there is a salt mine. The {14|fourteen} inch drill goes straight into it.',
      show: LAND, sky: '#22303F', lightAt: [0, -16, 40], lightDist: 110,
      cam: { pos: [0, -4, 170], look: [0, -16, 45], fov: 44, to: { pos: [14, -14, 130], look: [8, -22, 45], fov: 38 } },
      label: (t) => t < 3 ? 'A *SALT MINE* BELOW' : 'THE DRILL *BREAKS IN*', note: 'CUT-AWAY VIEW',
      update: (w, p, t, k) => pose(w, k, t, { drill: k.h.win(t, 1.2, 4.6) }),
    },
    {
      say: 'The lake pours into the mine. A whirlpool forms. It swallows the rig, eleven barges, a tugboat, and {65|sixty-five} acres of land.',
      show: LAND, sky: '#3A2E5C', lightAt: [0, 0, 0], lightDist: 110,
      cam: { pos: [30, 130, 90], look: [8, -4, 6], fov: 42, to: { pos: [50, 100, 100], look: [10, -6, 6], fov: 40 } },
      label: (t) => t < 3.4 ? 'A *WHIRLPOOL*' : '*11* BARGES · *65* ACRES',
      shake: () => .25,
      update: (w, p, t, k) => pose(w, k, t, { swirl: 1, sink: k.h.clamp((t - 2.4) / 6), drain: k.h.clamp((t - 1) / 9) * .85, noDrill: true }),
    },
    {
      say: 'The canal that drained the lake ran backwards, pulling in the sea. For a few days, it made a waterfall {164|a hundred and sixty-four} feet tall.',
      show: ['fall'], sky: '#274B73', lightAt: [410, 26, 0], lightDist: 80,
      cam: { pos: [470, 30, 110], look: [404, 28, 0], fov: 44, to: { pos: [450, 44, 96], look: [404, 26, 0], fov: 40 } },
      label: (t) => t < 4.2 ? 'CANAL RUNS *BACKWARDS*' : 'A *164 FT* WATERFALL',
      update: (w, p, t, k) => {
        const f = k.h.win(t, .6, 2.6); w.sheet.scale.y = Math.max(.01, 50 * f); w.sheet.position.y = 52 - 25 * f; w.pool.scale.y = 1 + k.h.win(t, 2.6, 9) * 8; w.pool.position.y = 2 + w.pool.scale.y / 2;
        w.spray.visible = f >= 1; w.spray.position.y = w.pool.position.y + w.pool.scale.y / 2;
        w.spray.children.forEach((b, i) => { const a = (t * 1.6 + i * .37) % 1; b.position.set(a * (3 + i % 4), a * (4 + i % 3) * (1 - a) * 3, -5 + (i * 1.4) % 10); b.scale.setScalar(.6 + a); });
      },
    },
    {
      say: 'All {55|fifty-five} miners got out. Nobody died. And investigators never settled which was wrong: the drilling, or the mine\'s maps.',
      show: ['land'], sky: '#BFE3F5', lightAt: [0, 0, 0], lightDist: 110,
      cam: { pos: [-100, 80, 140], look: [0, -10, 0], fov: 44, to: { pos: [-70, 70, 120], look: [0, -10, 0] } },
      label: (t) => t < 2.6 ? 'ALL *55* MINERS OUT' : t < 4.6 ? '*NOBODY* DIED' : 'DRILL OR MAPS? *UNSETTLED*',
      update: (w, p, t, k) => pose(w, k, t, { drain: 1, refill: .95, noDrill: true, sink: 1, noBoats: true }),
    },
    {
      say: 'Quick question. The lake was ten feet deep. How deep is it now? A, {20|twenty} feet. B, {80|eighty} feet. Or C, {200|two hundred} feet. Comment your answer.',
      quiz: { q: 'The lake was 10 feet deep. How deep is it now?', options: ['20 feet', '80 feet', '200 feet'], answer: 'C — it now has a maximum depth of 200 feet, the deepest lake in Louisiana.' },
      show: ['land'], sky: '#274B73', lightAt: [0, 0, 0], lightDist: 110,
      cam: { pos: [60, 170, 250], look: [0, -110, 0], fov: 46, to: { pos: [-40, 170, 250], look: [0, -110, 0] } },
      update: (w, p, t, k) => pose(w, k, t, { drain: 1, refill: .95, noDrill: true, sink: 1, noBoats: true }),
    },
  ],
};
