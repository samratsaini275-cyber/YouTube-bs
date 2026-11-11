// 3D episode. Models are simplified and not to scale.
const FH = 8, W = 60, D = 36;          // floor height, building width and depth
const CMP = [400, 0, 0];               // where the column comparison lives
const CRACK = [16, 6];                 // crack centre on the roof (x, z)

function setup(k) {
  const { mat, box, cyl, group } = k;
  const slabM = mat('#D9D4C8', { rough: .9 }), colM = mat('#B9B2A3'), wallM = mat('#E7A6A0', { rough: .8 }), glass = mat('#7FB6D9', { opacity: .55 });
  const w = { floors: [] };
  w.ground = k.ground('#8C9199');
  w.building = group();
  for (let i = 0; i < 5; i++) {
    const g = group([0, 0, 0], w.building);
    g.userData.cols = [];
    box(W, 1.2, D, slabM, [0, (i + 1) * FH, 0], g);
    for (let a = 0; a < 5; a++) for (let b = 0; b < 3; b++) g.userData.cols.push(cyl(1, 1, FH - 1.2, colM, [-24 + a * 12, i * FH + (FH - 1.2) / 2 + .1, -12 + b * 12], g, 16));
    g.userData.walls = [box(W, FH - 1.2, .6, wallM, [0, i * FH + FH / 2, -D / 2], g), box(.6, FH - 1.2, D, wallM, [-W / 2, i * FH + FH / 2, 0], g),
      box(.6, FH - 1.2, D, wallM, [W / 2, i * FH + FH / 2, 0], g), box(W, FH - 3, .3, glass, [0, i * FH + FH / 2, D / 2], g)];
    w.floors.push(g);
  }
  // rooftop air-conditioning units (on the top floor's group so they fall with it)
  w.ac = group([0, 5 * FH + .6, 0], w.floors[4]);
  for (let i = 0; i < 3; i++) { box(7, 4, 5, mat('#6F7C8A', { metal: .4 }), [i * 9, 2, 0], w.ac); cyl(1.6, 1.6, .6, mat('#22252B'), [i * 9, 4.3, 0], w.ac, 20); }
  // cracks radiating over one column
  w.cracks = group([CRACK[0], 5 * FH + .65, CRACK[1]], w.floors[4]);
  for (let i = 0; i < 9; i++) { const c = box(1, .12, .5, mat('#FF3B30', { glow: 1.4 }), [0, 0, 0], w.cracks); c.rotation.y = i * 0.7 + (i % 2) * .3; c.userData.len = 6 + (i * 5) % 9; }

  // column comparison: what the plans required vs what was built
  w.compare = group(CMP);
  box(34, 1.4, 16, slabM, [0, 15, 0], w.compare); box(34, 1.4, 16, slabM, [0, 0, 0], w.compare);
  w.req = cyl(2.67, 2.67, 13.6, mat('#8FA3B8', { opacity: .9 }), [-5, 7.5, 0], w.compare, 32);
  w.built = cyl(2, 2, 13.6, mat('#FF3B30', { glow: .5 }), [5, 7.5, 0], w.compare, 32);
  return w;
}

// pose the building: floors visible, collapse amount f (0..1), cracks 0..1
function pose(w, k, o = {}) {
  const f = o.fall || 0, n = o.floors ?? 5;
  w.floors.forEach((g, i) => {
    g.visible = i < n;
    const fi = k.h.clamp((f - (4 - i) * 0.13) / 0.48), e = fi * fi;
    g.position.y = (i === 4 ? (o.lift || 0) : 0) - e * ((i + 1) * FH - (i * 1.5 + 1.2));
    g.rotation.z = e * (i % 2 ? .03 : -.04);
    g.userData.cols.forEach(c => { c.visible = fi < 0.12; });
    g.userData.walls.forEach(x => { x.visible = fi < 0.3; });
  });
  const c = o.cracks || 0;
  w.cracks.visible = c > 0;
  w.cracks.children.forEach(x => { x.scale.x = Math.max(.01, c * x.userData.len); });
  w.ac.position.x = o.acX ?? 6; w.ac.position.z = o.acZ ?? 6;
}
const SITE = ['ground', 'building'];

export default {
  id: '016',
  style: '3d',
  voice: 'v2',
  case: 'SAMPOONG DEPARTMENT STORE',
  year: 'SEOUL · 1995',
  hook: ['CRACKS IN THE CEILING.', 'THE STORE STAYED OPEN.'],
  title: 'The store that stayed open while it cracked',
  description: 'The Sampoong Department Store in Seoul collapsed at 5:52 p.m. on June 29, 1995, killing 502 people. Columns were thinner than the plans required, a fifth floor had been added, and cracks seen that day did not lead to an evacuation.',
  tags: ['engineering', 'engineeringfailure', 'seoul', 'sampoong', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Sampoong Department Store collapse" — https://en.wikipedia.org/wiki/Sampoong_Department_Store_collapse (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'Cracks were spreading across the top floor of this store. Management kept it open. That evening, it collapsed in under {20|twenty} seconds.',
      show: SITE, sky: '#F3C9A8', lightAt: [0, 20, 0], lightDist: 90,
      cam: { pos: [95, 70, 120], look: [0, 22, 0], fov: 44, to: { pos: [60, 62, 80], look: [10, 34, 4], fov: 38 } },
      label: (t) => t > 5.2 ? 'UNDER *20* SECONDS' : '',
      update: (w, p, t, k) => pose(w, k, { cracks: .5 + .5 * k.h.win(t, 0, 6) }),
    },
    {
      say: 'Seoul, {1995.|nineteen ninety-five.} The Sampoong Department Store was first planned as a four floor apartment building.',
      show: SITE, sky: '#BFE3F5', lightAt: [0, 20, 0], lightDist: 90,
      cam: { pos: [70, 6, 110], look: [0, 18, 0], fov: 46, to: { pos: [100, 10, 80], look: [0, 18, 0] } },
      label: 'PLANNED: *4 FLOORS*', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t, k) => pose(w, k, { floors: 4 }),
    },
    {
      say: 'Then a fifth floor was added.',
      show: SITE, sky: '#E8E2D6', lightAt: [0, 20, 0], lightDist: 90,
      cam: { pos: [-90, 50, 100], look: [0, 22, 0], fov: 44, to: { pos: [-70, 44, 90], look: [0, 26, 0] } },
      label: '*+1* FLOOR',
      update: (w, p, t, k) => pose(w, k, { lift: (1 - k.h.win(t, .2, 1.3)) * 40 }),
    },
    {
      say: 'And the columns were built {60|sixty} centimeters wide, not the {80|eighty} the plans required.',
      show: ['compare'], sky: '#22303F', lightAt: [400, 8, 0], lightDist: 40,
      cam: { pos: [400, 9, 66], look: [400, 8, 0], fov: 40, to: { pos: [408, 11, 58], look: [400, 8, 0] } },
      label: (t) => t < 3 ? 'BUILT: *60 CM*' : 'REQUIRED: *80 CM*',
      note: 'LEFT: REQUIRED · RIGHT: AS BUILT',
      update: (w, p, t, k) => { w.req.visible = t > 2.8; w.built.material.emissiveIntensity = .5 + .3 * Math.sin(t * 6); },
    },
    {
      say: 'On the roof sat three air conditioning units, {15|fifteen} tonnes each. In {1993,|nineteen ninety-three,} they were dragged across it, cracking the slab.',
      show: SITE, sky: '#274B73', lightAt: [0, 40, 0], lightDist: 70,
      cam: { pos: [10, 120, 44], look: [8, 40, 2], fov: 40, to: { pos: [24, 100, 50], look: [12, 40, 4] } },
      label: (t) => t < 4.6 ? '3 UNITS · *15 TONNES* EACH' : 'DRAGGED ACROSS THE *ROOF*',
      update: (w, p, t, k) => { const d = k.h.win(t, 4.8, 8); pose(w, k, { acX: -22 + d * 28, acZ: -8 + d * 14, cracks: d * .7 }); },
    },
    {
      say: 'On {June 29th,|June twenty-ninth,} the cracks multiplied. Directors urged an evacuation. The chairman refused.',
      show: SITE, sky: '#3A2E5C', lightAt: [16, 40, 6], lightDist: 50,
      cam: { pos: [44, 58, 40], look: [16, 40, 6], fov: 36, to: { pos: [30, 52, 30], look: [16, 40, 6], fov: 32 } },
      label: (t) => t < 4.4 ? 'CRACKS *MULTIPLY*' : 'EVACUATE? *REFUSED*',
      update: (w, p, t, k) => pose(w, k, { cracks: .7 + .5 * k.h.win(t, .3, 5) }),
    },
    {
      say: 'At {5:52|five fifty-two} that evening, the floor around one column gave way. {502|Five hundred and two} people died.',
      show: SITE, sky: '#C9584A', lightAt: [0, 20, 0], lightDist: 90,
      cam: { pos: [100, 40, 120], look: [0, 18, 0], fov: 44, to: { pos: [120, 50, 130], look: [0, 6, 0] } },
      label: (t) => t < 4.6 ? '*5:52* PM' : '*502* PEOPLE KILLED',
      shake: (t) => t > 1.6 && t < 4.2 ? .7 : 0,
      update: (w, p, t, k) => pose(w, k, { cracks: 1.2, fall: k.h.clamp((t - 1.6) / 2.6) }),
    },
    {
      say: 'Quick question. How long after the collapse was the last survivor rescued? A, {3|three} days. B, {9|nine} days. Or C, {17|seventeen} days. Comment your answer.',
      quiz: { q: 'How long after the collapse was the last survivor rescued?', options: ['3 days', '9 days', '17 days'], answer: 'C — 17 days. The last survivor, a 19-year-old store clerk, was pulled from the wreckage 17 days after the collapse.' },
      show: SITE, sky: '#1E2A3F', lightAt: [0, 6, 0], lightDist: 90,
      cam: { pos: [60, 110, 170], look: [0, -50, 0], fov: 46, to: { pos: [-40, 120, 170], look: [0, -50, 0] } },
      update: (w, p, t, k) => pose(w, k, { cracks: 0, fall: 1 }),
    },
  ],
};
