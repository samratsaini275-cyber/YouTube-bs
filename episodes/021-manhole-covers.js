// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
const SQ = [300, 0, 0];     // the square-cover comparison
const TUBE = [600, 0, 0];   // the shaft, cut away

function street(k, parent, round) {
  const { mat, box, cyl } = k, road = mat('#4A4F57', { rough: 1 });
  for (const [x, z, sx, sz] of [[0, -22, 70, 30], [0, 22, 70, 30], [-21, 0, 28, 14], [21, 0, 28, 14]]) box(sx, 4, sz, road, [x, -2, z], parent);
  box(14, 1, 14, mat('#0B0D12'), [0, -3.6, 0], parent);
  if (round) {
    // a square slab with a round opening is faked with an iron ring sitting in the gap
    for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2; const b = box(2.2, 4, 2.6, road, [Math.cos(a) * 7.9, -2, Math.sin(a) * 7.9], parent); b.rotation.y = -a; }
    const ring = k.torus(5.6, .7, mat('#2B2F36', { metal: .5 }), [0, -.5, 0], parent); ring.scale.set(1, 1, .6);
  } else {
    for (const [x, z, sx, sz] of [[0, -5.9, 13, 1.4], [0, 5.9, 13, 1.4], [-5.9, 0, 1.4, 13], [5.9, 0, 1.4, 13]]) box(sx, .6, sz, mat('#2B2F36', { metal: .5 }), [x, -.6, z], parent);
  }
  for (const z of [-30, 30]) for (let i = 0; i < 5; i++) box(7, .1, .8, mat('#E8E2D6'), [-28 + i * 14, .06, z], parent).castShadow = false;
}

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const iron = mat('#9AA4B2', { metal: .5, rough: .45 }), hot = mat('#FFB020', { glow: .5, metal: .4 });
  const w = {};
  // --- round cover on a street ---
  w.round = group();
  street(k, w.round, true);
  w.cover = group([0, 0, 0], w.round);
  cyl(5.6, 5.6, .7, iron, [0, 0, 0], w.cover, 48);
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI; const r = box(9.6, .12, .5, mat('#3B4048'), [0, .4, 0], w.cover); r.rotation.y = a; }
  w.mark = cone(.9, 1.8, mat('#FF3B30', { glow: 1 }), [3.6, .5, 0], w.cover, 4); w.mark.rotation.z = -Math.PI / 2;
  // worker
  w.worker = group([14, 0, 8], w.round);
  ball(1.5, mat('#F2C9A0'), [0, 9.2, 0], w.worker); box(3.2, 5, 2, mat('#F28C28'), [0, 5.4, 0], w.worker); box(1.2, 3, 1.4, mat('#2E4A7D'), [-.8, 1.5, 0], w.worker); box(1.2, 3, 1.4, mat('#2E4A7D'), [.8, 1.5, 0], w.worker);
  ball(1.7, mat('#FFD21F'), [0, 9.9, 0], w.worker).scale.y = .55;
  // --- square cover on a street ---
  w.square = group(SQ);
  street(k, w.square, false);
  w.sqCover = box(11.2, .7, 11.2, hot, [0, 0, 0], w.square);
  // --- the shaft below, cut away, with the ground pressing in ---
  w.tube = group(TUBE);
  box(60, 40, 2, mat('#8A6B4A', { rough: 1 }), [0, -20, -12], w.tube);
  const pipe = cyl(6, 6, 40, mat('#9AA3AE', { metal: .3, double: true, opacity: .95 }), [0, -20, 0], w.tube, 40); pipe.castShadow = false;
  cyl(6.6, 6.6, .8, iron, [0, .4, 0], w.tube, 40); box(60, 1, 26, mat('#4A4F57', { rough: 1 }), [0, -.5, 0], w.tube);
  w.arrows = group([0, -20, 0], w.tube);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const g = group([0, 0, 0], w.arrows); g.rotation.y = a; const c = cone(1.8, 4, mat('#FF3B30', { glow: 1 }), [13, 0, 0], g, 12); c.rotation.z = Math.PI / 2; cyl(.7, .7, 6, mat('#FF3B30', { glow: 1 }), [18, 0, 0], g, 10).rotation.z = Math.PI / 2; }
  return w;
}

// place the round cover: lift, tilt (0 flat .. 1 on edge), spin, x offset
function cover(w, o = {}) {
  w.cover.position.set(o.x || 0, .05 + (o.lift || 0), o.z || 0);
  w.cover.rotation.set(0, o.spin || 0, (o.tilt || 0) * Math.PI / 2);
  w.mark.visible = !!o.mark; w.worker.visible = !!o.worker;
}

export default {
  id: '021',
  style: '3d',
  voice: 'v3',
  case: 'MANHOLE COVERS',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['WHY ARE THEY', 'ALWAYS ROUND?'],
  title: 'Why manhole covers are round',
  description: 'A round manhole cover cannot fall through its own opening; a square one can, if it is turned diagonally. Round covers also need no lining up, can be rolled, and sit on a round shaft, the strongest shape against the earth around it.',
  tags: ['engineering', 'design', 'whyisitbuiltlikethat', 'manholecover', 'everydayengineering', 'shorts'],
  sources: [
    'Wikipedia, "Manhole cover" — https://en.wikipedia.org/wiki/Manhole_cover (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'Why are manhole covers round? It is not for looks. A round cover can never fall down its own hole.',
      show: ['round'], sky: '#BFE3F5', lightAt: [0, 0, 0], lightDist: 60,
      cam: { pos: [34, 34, 46], look: [0, 0, 0], fov: 42, to: { pos: [20, 22, 28], look: [0, 1, 0], fov: 36 } },
      label: (t) => t > 3.6 ? 'IT *CAN\'T* FALL IN' : '',
      update: (w, p, t, k) => cover(w, { lift: 6 * k.h.win(t, 2.4, 3.4) * (1 - k.h.win(t, 5.4, 6.2)), spin: t * .6 }),
    },
    {
      say: 'Try it with a square one. Turn it on its edge, line it up with the diagonal, and it drops straight through.',
      show: ['square'], sky: '#F1D9B5', lightAt: [300, 0, 0], lightDist: 60,
      cam: { pos: [330, 30, 44], look: [300, 2, 0], fov: 42, to: { pos: [322, 22, 32], look: [300, 0, 0], fov: 38 } },
      label: (t) => t < 4.4 ? 'A *SQUARE* COVER' : 'STRAIGHT *THROUGH*', note: 'MODEL SIMPLIFIED',
      update: (w, p, t, k) => {
        const up = k.h.win(t, .6, 1.6), tilt = k.h.win(t, 1.4, 2.6), turn = k.h.win(t, 2.6, 3.8), drop = k.h.clamp((t - 4.4) / 1.2);
        w.sqCover.position.set(0, .05 + up * 9 - drop * drop * 30, 0); w.sqCover.rotation.set(0, turn * Math.PI / 4, tilt * Math.PI / 2);
      },
    },
    {
      say: 'A circle is the same width in every direction. So however you turn it, it cannot fit through.',
      show: ['round'], sky: '#22303F', lightAt: [0, 0, 0], lightDist: 60,
      cam: { pos: [0, 16, 44], look: [0, 4, 0], fov: 40, to: { pos: [10, 12, 36], look: [0, 4, 0], fov: 36 } },
      label: (t) => t < 3.2 ? 'SAME WIDTH, *EVERY WAY*' : 'IT *CAN\'T* FIT',
      update: (w, p, t, k) => { const tilt = k.h.win(t, .4, 1.4), down = k.h.win(t, 3, 3.8); cover(w, { lift: 8 - down * 2.3 + (t > 3.8 ? Math.abs(Math.sin(t * 9)) * .5 * Math.exp(-(t - 3.8) * 2) : 0), tilt, spin: t * 1.4 }); },
    },
    {
      say: 'There is more. A round cover never needs lining up. Drop it in at any angle, and it fits.',
      show: ['round'], sky: '#DDE3EA', lightAt: [0, 0, 0], lightDist: 60,
      cam: { pos: [6, 50, 20], look: [0, 0, 0], fov: 40, to: { pos: [10, 40, 22], look: [0, 0, 0], fov: 36 } },
      label: (t) => t < 2.6 ? '*NO* LINING UP' : 'ANY ANGLE *FITS*',
      update: (w, p, t, k) => { const c = (t % 2.2) / 2.2; cover(w, { lift: 7 * (1 - k.h.ease(k.h.clamp(c * 1.6))), spin: Math.floor(t / 2.2) * 1.3 + 0.4, mark: true }); },
    },
    {
      say: 'And these things are heavy. A cast iron cover can weigh up to {300|three hundred} pounds. A round one can be rolled.',
      show: ['round'], sky: '#F3C9A8', lightAt: [0, 4, 8], lightDist: 60,
      cam: { pos: [-6, 24, 96], look: [-6, 5, 8], fov: 42, to: { pos: [0, 20, 86], look: [-4, 5, 8], fov: 42 } },
      label: (t) => t < 4.6 ? 'UP TO *300 LB*' : 'SO: *ROLL IT*',
      update: (w, p, t, k) => { const x = -10 + k.h.win(t, 3.4, 7.5) * 18; cover(w, { lift: 5.6, tilt: 1, x, z: 8, worker: true }); w.cover.rotation.set(Math.PI / 2, 0, -x / 5.6); w.worker.position.set(x - 8, 0, 8); },
    },
    {
      say: 'One more reason. The shaft below is a round tube: the strongest shape against the earth pressing in around it.',
      show: ['tube'], sky: '#2B2140', lightAt: [600, -14, 0], lightDist: 70,
      cam: { pos: [640, 20, 70], look: [600, -16, 0], fov: 44, to: { pos: [626, 40, 54], look: [600, -18, 0], fov: 40 } },
      label: (t) => t < 2.6 ? 'BELOW: A *ROUND TUBE*' : '*STRONGEST* SHAPE', note: 'CUT-AWAY VIEW',
      update: (w, p, t, k) => { const a = k.h.win(t, 2.4, 3.6); w.arrows.visible = a > 0; w.arrows.children.forEach(g => g.children.forEach((c, i) => { c.position.x = (i ? 18 : 13) + 5 * (1 - a) + Math.sin(t * 5) * .6; })); },
    },
    {
      say: 'Quick question. One city in New Hampshire uses a different shape for its covers. Which one? A, triangles. B, hexagons. Or C, stars. Comment your answer.',
      quiz: { q: 'One city in New Hampshire uses a different shape for its covers. Which?', options: ['Triangles', 'Hexagons', 'Stars'], answer: 'A — triangles. Nashua, New Hampshire has triangular covers that point in the direction of the flow underneath.' },
      show: ['round'], sky: '#274B73', lightAt: [0, 0, 0], lightDist: 60,
      cam: { pos: [30, 70, 90], look: [0, -40, 0], fov: 46, to: { pos: [-20, 70, 90], look: [0, -40, 0] } },
      update: (w, p, t) => cover(w, { spin: t * .3 }),
    },
  ],
};
