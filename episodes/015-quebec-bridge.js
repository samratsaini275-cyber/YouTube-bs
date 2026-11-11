// 3D episode. Models are simplified and not to scale.
const WATER_Y = -40;
const LINE = [500, 0, 0];   // where the telegraph-line model lives

// place a box-shaped beam between two points (local coordinates of its parent)
function setBeam(k, m, a, b) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b);
  m.position.copy(A).add(B).multiplyScalar(0.5);
  m.scale.z = A.distanceTo(B);
  m.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 0, 1), B.sub(A).normalize());
  return m;
}
const beam = (k, a, b, t, mat, parent) => setBeam(k, k.box(t, t, 1, mat, [0, 0, 0], parent), a, b);

// one cantilever arm: deep at the pier (x = 0), tapering to the tip. dir = +1 (over the river) or -1 (anchor arm)
function arm(k, parent, len, dir, steel) {
  const n = Math.round(len / 10), top = x => 30 - 18 * (x / len), bot = x => 6 * (x / len);
  for (const z of [-5, 5]) for (let i = 0; i < n; i++) {
    const x0 = i * 10, x1 = x0 + 10, X0 = dir * x0, X1 = dir * x1;
    beam(k, [X0, top(x0), z], [X1, top(x1), z], 1.1, steel, parent);
    if (!(dir === 1 && i === 0 && z === 5)) beam(k, [X0, bot(x0), z], [X1, bot(x1), z], 1.3, steel, parent);
    beam(k, [X1, bot(x1), z], [X1, top(x1), z], .8, steel, parent);
    beam(k, i % 2 ? [X0, top(x0), z] : [X0, bot(x0), z], i % 2 ? [X1, bot(x1), z] : [X1, top(x1), z], .7, steel, parent);
  }
  for (let i = 0; i <= n; i++) { const x = i * 10; beam(k, [dir * x, bot(x), -5], [dir * x, bot(x), 5], .7, steel, parent); beam(k, [dir * x, top(x), -5], [dir * x, top(x), 5], .6, steel, parent); }
}

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const steel = mat('#5E6B7A', { metal: .5, rough: .45 }), stone = mat('#B9B2A3', { rough: 1 });
  const w = {};
  w.water = k.ground('#2F7FB8', WATER_Y);
  w.bank = group();
  box(400, 44, 400, mat('#7DB65B', { rough: 1 }), [-242, WATER_Y + 18, 0], w.bank);
  w.pier = box(9, 44, 16, stone, [0, WATER_Y + 22, 0]);

  // the south arm as it stood in August 1907
  w.bridge = group([0, 4, 0]);
  beam(k, [0, 0, -5], [0, 30, -5], 1.6, steel, w.bridge); beam(k, [0, 0, 5], [0, 30, 5], 1.6, steel, w.bridge);
  arm(k, w.bridge, 60, 1, steel); arm(k, w.bridge, 40, -1, steel);
  // the lower chord that buckled: two halves that kink in the middle
  const hot = mat('#FF3B30', { glow: .9 });
  w.chordA = beam(k, [0, 0, 5], [5, .3, 5], 1.4, hot, w.bridge); w.chordB = beam(k, [5, .3, 5], [10, 1, 5], 1.4, hot, w.bridge);
  // load arrow
  w.load = group([30, 62, 0]);
  cyl(2.2, 2.2, 18, mat('#FF3B30', { glow: 1 }), [0, 9, 0], w.load); cone(5, 10, mat('#FF3B30', { glow: 1 }), [0, -5, 0], w.load).rotation.x = Math.PI;

  // the finished bridge, for the closing question
  w.rebuilt = group([0, 4, 0]);
  const green = mat('#3E7D5A', { metal: .3 });
  for (const [px, d] of [[0, 1], [150, -1]]) { const g = group([px, 0, 0], w.rebuilt); beam(k, [0, 0, -5], [0, 30, -5], 1.6, green, g); beam(k, [0, 0, 5], [0, 30, 5], 1.6, green, g); arm(k, g, 50, d, green); arm(k, g, 40, -d, green); }
  for (const z of [-5, 5]) { beam(k, [50, 5, z], [100, 5, z], 1.2, green, w.rebuilt); beam(k, [50, 14, z], [100, 14, z], 1.1, green, w.rebuilt); for (let i = 0; i < 5; i++) beam(k, [50 + i * 10, 5, z], [60 + i * 10, 14, z], .7, green, w.rebuilt); }
  w.pier2 = box(9, 44, 16, stone, [150, WATER_Y + 22, 0]);

  // telegraph line: poles, a wire, an office in the middle, the bridge site at the far end
  w.line = group(LINE);
  box(160, 1, 30, mat('#C9C2B2', { rough: 1 }), [0, -.5, 0], w.line);
  for (let i = 0; i < 9; i++) { cyl(.35, .45, 14, mat('#6B4A2E'), [-64 + i * 16, 7, 0], w.line); box(.4, .4, 5, mat('#6B4A2E'), [-64 + i * 16, 13, 0], w.line); }
  beam(k, [-64, 13.4, 0], [64, 13.4, 0], .18, mat('#22252B'), w.line);
  box(12, 9, 10, mat('#E0A84E'), [0, 4.5, -9], w.line); cone(9, 5, mat('#B5542F'), [0, 11.5, -9], w.line, 4).rotation.y = Math.PI / 4;
  box(8, 7, 8, mat('#8FA3B8'), [-72, 3.5, 0], w.line); box(8, 7, 8, mat('#5E6B7A'), [72, 3.5, 0], w.line);
  w.pulse = ball(1.5, mat('#FFD21F', { glow: 2.5 }), [-64, 13.4, 0], w.line);
  return w;
}

const kink = (w, k, a) => { setBeam(k, w.chordA, [0, 0, 5], [5, .3 - a * .8, 5 + a * 2.6]); setBeam(k, w.chordB, [5, .3 - a * .8, 5 + a * 2.6], [10, 1, 5]); };
const stand = (w, k) => { w.bridge.rotation.set(0, 0, 0); w.bridge.position.set(0, 4, 0); w.load.visible = false; kink(w, k, 0); };
const SITE = ['water', 'bank', 'pier', 'bridge'];

export default {
  id: '015',
  style: '3d',
  voice: 'v2',
  case: 'QUEBEC BRIDGE',
  year: 'CANADA · 1907',
  hook: ['A WARNING WAS SENT.', 'IT CAME TOO LATE.'],
  title: 'The warning telegram that came too late',
  description: 'On August 29, 1907, the south arm of the unfinished Quebec Bridge collapsed into the St. Lawrence River in 15 seconds, killing 75 of the 86 workers on it. A telegram ordering no more load was not passed on in time.',
  tags: ['engineering', 'engineeringfailure', 'bridges', 'quebec', 'history', 'shorts'],
  sources: [
    'Wikipedia, "Quebec Bridge" — https://en.wikipedia.org/wiki/Quebec_Bridge (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'A telegram was sent to stop work on this bridge. It was not passed on in time. That afternoon, {75|seventy-five} men died.',
      show: SITE, sky: '#BFE3F5', lightAt: [20, 0, 0], lightDist: 110,
      cam: { pos: [150, 30, 190], look: [14, 6, 0], fov: 44, to: { pos: [90, 16, 130], look: [20, 10, 0], fov: 38 } },
      label: (t) => t > 4.6 ? '*75* MEN' : '',
      update: (w, p, t, k) => stand(w, k),
    },
    {
      say: 'Quebec, {1907.|nineteen oh seven.} A giant steel bridge is growing out over the {St.|Saint} Lawrence River.',
      show: SITE, sky: '#F1D9B5', lightAt: [20, 0, 0], lightDist: 110,
      cam: { pos: [120, -34, 60], look: [20, 14, 0], fov: 50, to: { pos: [150, -30, 20], look: [26, 16, 0], fov: 46 } },
      label: 'QUEBEC · *1907*', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t, k) => stand(w, k),
    },
    {
      say: 'The early calculations were never properly checked. The bridge\'s own weight was far more than it could carry.',
      show: [...SITE, 'load'], sky: '#DDE3EA', lightAt: [20, 0, 0], lightDist: 110,
      cam: { pos: [40, 150, 120], look: [22, 10, 0], fov: 42, to: { pos: [70, 110, 150], look: [22, 10, 0] } },
      label: (t) => t < 3 ? 'NEVER *CHECKED*' : '*TOO HEAVY* FOR ITSELF',
      update: (w, p, t, k) => { stand(w, k); w.load.visible = t > 2.8; w.load.position.y = 62 - k.h.win(t, 2.8, 3.6) * 18 + Math.sin(t * 6) * 1.2; },
    },
    {
      say: 'That summer, the site engineer saw steel members bending. At first, he was told the problem was minor.',
      show: SITE, sky: '#2B3442', lightAt: [5, 4, 5], lightDist: 40,
      cam: { pos: [40, 14, 50], look: [5, 6, 5], fov: 38, to: { pos: [22, 9, 36], look: [5, 5, 6], fov: 34 } },
      label: (t) => t < 3.6 ? 'STEEL *BENDING*' : '"A MINOR PROBLEM"',
      update: (w, p, t, k) => { stand(w, k); kink(w, k, k.h.win(t, .6, 5)); },
    },
    {
      say: 'On {August 29th,|August twenty-ninth,} the consulting engineer telegraphed: add no more load. The message was not passed on to Quebec in time.',
      show: ['line'], sky: '#3A2E5C', lightAt: [500, 6, 0], lightDist: 90,
      cam: { pos: [440, 22, 70], look: [470, 9, 0], fov: 44, to: { pos: [520, 26, 80], look: [510, 9, 0], fov: 48 } },
      label: (t) => t < 5.4 ? '"ADD NO MORE *LOAD*"' : '*NOT PASSED ON*',
      update: (w, p, t, k) => { const a = k.h.win(t, 1.8, 5); w.pulse.position.x = -64 + a * 64; w.pulse.position.z = a >= 1 ? -4 : 0; w.pulse.scale.setScalar(a >= 1 ? 1 + .3 * Math.sin(t * 9) : 1); },
    },
    {
      say: 'Near quitting time, the south arm fell into the river in {15|fifteen} seconds. Of {86|eighty-six} workers on the bridge, {75|seventy-five} were killed.',
      show: SITE, sky: '#C9584A', lightAt: [20, 0, 0], lightDist: 110,
      cam: { pos: [170, 10, 150], look: [20, 0, 0], fov: 44, to: { pos: [190, 30, 170], look: [20, -14, 0] } },
      label: (t) => t < 4.4 ? '*15* SECONDS' : '*75* OF 86 KILLED',
      shake: (t) => t > 1.4 && t < 4 ? .6 : 0,
      update: (w, p, t, k) => { stand(w, k); kink(w, k, 1); const f = k.h.clamp((t - 1.4) / 2.2); w.bridge.rotation.z = -f * f * 0.62; w.bridge.position.y = 4 - f * f * 26; },
    },
    {
      say: 'Quick question. The bridge was rebuilt, and finished in {1917.|nineteen seventeen.} It is still the world\'s longest bridge of which type? A, suspension. B, cantilever. Or C, arch. Comment your answer.',
      quiz: { q: 'Finished in 1917, it is still the world\'s longest bridge of which type?', options: ['Suspension', 'Cantilever', 'Arch'], answer: 'B — cantilever. Its 549-metre span is still the longest cantilever bridge span in the world.' },
      show: ['water', 'bank', 'pier', 'pier2', 'rebuilt'], sky: '#274B73', lightAt: [75, 0, 0], lightDist: 160,
      cam: { pos: [75, 150, 330], look: [75, -90, 0], fov: 46, to: { pos: [150, 160, 310], look: [75, -90, 0] } },
    },
  ],
};
