// 3D episode (style: '3d'). Models are simplified and not to scale.
const JOINT_Y = 9, SRB_X = 6.1;      // the joint that failed: low on the right-hand booster
const SEC = [300, 0, 0];             // where the cut-away joint model lives
const THERMO = [600, 0, 0];          // where the thermometer lives

function setup(k) {
  const { mat, box, cyl, cone, ball, torus, group } = k;
  const white = mat('#F2F2EE'), orange = mat('#D9702B'), dark = mat('#22252B'), steel = mat('#AEB4BD', { metal: .6, rough: .35 });
  const w = {};

  // --- launch site ---
  w.ground = k.ground('#7DB65B');
  w.pad = group();
  box(40, 1.2, 40, mat('#9A9FA6'), [0, .6, 0], w.pad);
  box(5, 46, 5, mat('#C2443A'), [-16, 23, -4], w.pad);
  for (let i = 0; i < 9; i++) box(6.4, .5, 6.4, dark, [-16, 4 + i * 5, -4], w.pad);

  // --- the shuttle stack ---
  w.stack = group([0, 1.2, 0]);
  cyl(4.2, 4.2, 38, orange, [0, 23, 0], w.stack);
  const nose = cone(4.2, 9, orange, [0, 46.5, 0], w.stack); nose.scale.x = nose.scale.z = 1;
  w.srb = [];
  for (const sx of [-1, 1]) {
    const g = group([sx * SRB_X, 0, 0], w.stack);
    cyl(1.85, 1.85, 40, white, [0, 22, 0], g); cone(1.85, 5, white, [0, 44.5, 0], g); cyl(1.2, 2.3, 3, dark, [0, .5, 0], g);
    for (const y of [JOINT_Y, 19, 29]) cyl(1.9, 1.9, .5, mat('#7C828C'), [0, y, 0], g);
    w.srb.push(g);
  }
  // orbiter (very simplified)
  w.orbiter = group([0, 0, 5.3], w.stack);
  box(4.6, 26, 4.4, white, [0, 20, 0], w.orbiter); cone(2.6, 6, dark, [0, 36, 0], w.orbiter);
  box(15, 12, .8, white, [0, 12, .6], w.orbiter); box(.8, 9, 6, white, [0, 11, 3.4], w.orbiter);
  box(4.7, 26, .4, dark, [0, 20, 2.3], w.orbiter);

  // exhaust, the smoke puffs, and the flame at the joint
  w.exhaust = group([0, 0, 0], w.stack);
  for (const sx of [-1, 1]) cone(2.4, 26, mat('#FF9A1F', { glow: 1.8, opacity: .95 }), [sx * SRB_X, -13.5, 0], w.exhaust).rotation.x = Math.PI;
  w.puffs = group([SRB_X + 1.6, JOINT_Y, 1.2], w.stack);
  for (let i = 0; i < 6; i++) ball(1, mat('#3A3D44', { rough: 1, opacity: .9 }), [0, 0, 0], w.puffs);
  w.flame = group([SRB_X - 0.9, JOINT_Y, 1.75], w.stack);
  const fl = cone(.9, 3, mat('#FF5A1F', { glow: 2.4, opacity: .95 }), [-1.4, 0, 0], w.flame); fl.rotation.z = Math.PI / 2;
  ball(.7, mat('#FFD21F', { glow: 2.4 }), [0, 0, 0], w.flame);
  w.ring = torus(1.98, .2, mat('#FF3B30', { glow: 1.5 }), [SRB_X, JOINT_Y, 0], w.stack);

  // break-up cloud and fragments (kept abstract)
  w.cloud = group([0, 30, 0]);
  for (let i = 0; i < 26; i++) ball(1, mat('#F4F1EA', { rough: 1 }), [0, 0, 0], w.cloud);
  w.trails = group([0, 30, 0]);
  for (const sx of [-1, 1]) cyl(.7, .7, 1, mat('#F4F1EA', { rough: 1 }), [0, 0, 0], w.trails);

  // clouds that rush past during ascent
  w.sky = group();
  for (let i = 0; i < 14; i++) { const c = ball(1, mat('#FFFFFF', { rough: 1 }), [0, 0, 0], w.sky); c.scale.set(9 + (i % 4) * 4, 3, 6); c.castShadow = false; }

  // --- cut-away of the joint: two steel shells, a gap, two rubber O-rings ---
  w.section = group(SEC);
  box(7, 16, 6, steel, [-4.6, 8, 0], w.section);                    // inner shell (upper segment)
  box(7, 16, 6, steel, [4.6, 8, 0], w.section);                     // outer shell (lower segment)
  w.gas = box(2.2, 1, 5.6, mat('#FF7A1A', { glow: 1.8 }), [0, 16, 0], w.section);
  w.orings = [];
  for (const y of [9.5, 5.5]) { const o = cyl(1.1, 1.1, 6.2, mat('#1B1D22', { rough: .9 }), [0, y, 0], w.section); o.rotation.x = Math.PI / 2; w.orings.push(o); }
  w.leak = box(.9, 1, 5.6, mat('#FF7A1A', { glow: 1.8 }), [.8, 8, 0], w.section);
  w.frost = box(16.6, 16.2, 6.2, mat('#8FD3FF', { opacity: .0 }), [0, 8, 0], w.section);

  // --- thermometer ---
  w.thermo = group(THERMO);
  cyl(1.3, 1.3, 22, mat('#FFFFFF', { opacity: .55 }), [0, 14, 0], w.thermo); ball(2.4, mat('#FF3B30', { glow: .5 }), [0, 2.4, 0], w.thermo);
  w.mercury = cyl(.75, .75, 1, mat('#FF3B30', { glow: .5 }), [0, 4, 0], w.thermo);
  w.mark62 = box(5, .35, .6, mat('#FFD21F', { glow: 1 }), [2.6, 0, 0], w.thermo);
  w.mark36 = box(5, .35, .6, mat('#39C6FF', { glow: 1 }), [2.6, 0, 0], w.thermo);
  return w;
}

// temperature (°F) to height on the thermometer
const tempY = f => 4 + (f - 20) * 0.34;
const setMercury = (w, f) => { const top = tempY(f); w.mercury.scale.y = top - 3; w.mercury.position.y = 3 + (top - 3) / 2; };
const flicker = (w, t, on = 1) => w.exhaust.children.forEach((c, i) => { c.scale.set(on, on * (1 + .12 * Math.sin(t * 38 + i)), on); c.visible = on > 0; });
// cut-away state: cold 0..1 stiffens the rings, press 0..1 is gas pressure arriving
function joint(w, k, cold, press) {
  const seal = 1 - cold;                                   // how well the rings fill the gap
  w.orings.forEach(o => { o.scale.x = 1 - 0.3 * cold; o.position.x = -0.32 * cold; o.material.color.set(cold > .5 ? '#3B6E9C' : '#1B1D22'); });
  w.frost.material.opacity = 0.16 * cold; w.frost.visible = cold > 0.02;
  const stop = seal > 0.5 ? 10.8 : -1;                     // sealed: gas stops at the first ring; cold: it gets past both
  const depth = press * (16.5 - stop);
  w.gas.scale.y = Math.max(.01, Math.min(depth, 5.2)); w.gas.position.y = 16.5 - w.gas.scale.y / 2;
  const past = Math.max(0, depth - 5.2);
  w.leak.visible = seal <= 0.5 && past > 0; w.leak.scale.y = Math.max(.01, past); w.leak.position.y = 11.3 - past / 2;
}
const STACK = ['ground', 'pad', 'stack'];

export default {
  id: '014',
  style: '3d',
  voice: 'v2',
  case: 'SPACE SHUTTLE CHALLENGER',
  year: 'FLORIDA · 1986',
  hook: ['A RUBBER RING.', 'ONE COLD MORNING.'],
  title: 'A cold rubber ring destroyed Challenger',
  description: 'Space Shuttle Challenger broke apart 73 seconds into its flight on January 28, 1986, killing all seven crew members. The cause was the failure of the primary and secondary O-ring seals in a joint of the right solid rocket booster, on a record-cold launch morning.',
  tags: ['space', 'nasa', 'challenger', 'engineeringfailure', 'spaceshuttle', 'shorts'],
  sources: [
    'Wikipedia, "Space Shuttle Challenger disaster" — https://en.wikipedia.org/wiki/Space_Shuttle_Challenger_disaster (retrieved November 2026)',
    'Report of the Presidential Commission on the Space Shuttle Challenger Accident (Rogers Commission), 1986 — the investigation cited there',
  ],
  setup,
  scenes: [
    { // hook: slow push in on the stack, the fatal joint glowing
      say: 'This rocket was sealed with rings of rubber. One cold morning in {1986,|nineteen eighty-six,} they failed, and seven astronauts died.',
      show: STACK, sky: '#BFE3F5', lightAt: [0, 20, 0],
      cam: { pos: [48, 20, 74], look: [0, 25, 0], fov: 42, to: { pos: [22, 12, 28], look: [5, 11, 0], fov: 34 } },
      label: (t) => t > 4.6 ? '*7* ASTRONAUTS' : '',
      update: (w, p, t) => { w.stack.position.y = 1.2; flicker(w, t, 0); w.puffs.visible = w.flame.visible = false; w.ring.material.emissiveIntensity = 1.2 + Math.sin(t * 8); },
    },
    { // close orbit around the joint
      say: 'The Space Shuttle\'s solid rocket boosters were built in segments. At each joint, two rubber O-rings sealed in the burning gas.',
      show: STACK, sky: '#E8E2D6', lightAt: [SRB_X, 15, 0], lightDist: 40,
      cam: { pos: [34, 36, 34], look: [5, 22, 0], fov: 40, to: { pos: [17, 12, 14], look: [SRB_X, JOINT_Y, 0], fov: 30 } },
      label: (t) => t < 3.4 ? 'BUILT IN *SEGMENTS*' : '*2* O-RINGS PER JOINT',
      note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t) => { flicker(w, t, 0); w.puffs.visible = w.flame.visible = false; w.ring.material.emissiveIntensity = 1.6; },
    },
    { // cut-away: warm ring seals, then the same joint cold
      say: 'Rubber stiffens in the cold. And a stiff O-ring is less able to seal the joint.',
      show: ['section'], sky: '#2B3442', lightAt: [300, 8, 0], lightDist: 30,
      cam: { pos: [300, 8, 58], look: [300, 8, 0], fov: 38, to: { pos: [294, 10, 48], look: [300, 8, 0] } },
      label: (t) => t < 2.3 ? 'WARM: *SEALED*' : 'COLD: *LEAKS*',
      note: 'CUT-AWAY · GAP EXAGGERATED',
      update: (w, p, t, k) => { const cold = k.h.win(t, 2.1, 2.7); joint(w, k, cold, t < 2.3 ? k.h.win(t, .3, 1.6) : k.h.win(t, 2.9, 5)); },
    },
    { // thermometer, low angle
      say: 'The coldest shuttle launch until then was at {62|sixty-two} degrees Fahrenheit. The night before this one, engineers at the booster maker recommended against launching.',
      show: ['thermo'], sky: '#1F4E79', lightAt: [600, 12, 0], lightDist: 30,
      cam: { pos: [616, 5, 62], look: [601.5, 13, 0], fov: 40, to: { pos: [590, 15, 54], look: [601.5, 13, 0] } },
      label: (t) => t < 5.2 ? 'COLDEST BEFORE: *62°F*' : 'ENGINEERS: *DO NOT LAUNCH*',
      update: (w, p, t, k) => { w.mark62.position.y = tempY(62); w.mark36.position.y = tempY(36); w.mark36.visible = false; setMercury(w, k.h.lerp(70, 62, k.h.win(t, .4, 2.4))); },
    },
    { // ignition on the pad, seen from low down; smoke at the joint
      say: 'The launch went ahead, at {36|thirty-six} degrees. Less than a second after ignition, puffs of dark smoke came from a joint on the right booster.',
      show: STACK, sky: '#CFE8F5', lightAt: [0, 20, 0],
      cam: { pos: [42, 3, 62], look: [2, 24, 0], fov: 46, to: { pos: [28, 9, 32], look: [SRB_X, JOINT_Y + 4, 0], fov: 36 } },
      label: (t) => t < 3 ? 'LAUNCH: *36°F*' : '*SMOKE* AT THE JOINT',
      shake: (t) => t > 3 ? .12 : 0,
      update: (w, p, t, k) => {
        const lift = k.h.win(t, 3.6, 12) * 5; w.stack.position.y = 1.2 + lift; flicker(w, t, t > 3 ? 1 : 0); w.flame.visible = false;
        w.puffs.visible = t > 3.4;
        w.puffs.children.forEach((b, i) => { const a = k.h.clamp((t - 3.4 - i * .28) / 1.6); b.scale.setScalar(.3 + a * 2.2); b.position.set(a * (2 + i * .5), a * (1.5 + (i % 3)), a * (i % 2 ? 1.6 : -.6)); b.material.opacity = .9 * (1 - a * .75); b.visible = a > 0; });
        w.ring.material.emissiveIntensity = 1.4;
      },
    },
    { // in flight, looking up along the stack; flame at the joint
      say: 'About {59|fifty-nine} seconds into the flight, a flame appeared at that joint. It burned through to the external fuel tank.',
      show: ['stack', 'sky'], sky: '#5FA9E6', lightAt: [0, 520, 0],
      cam: { pos: [36, 478, 48], look: [0, 524, 0], fov: 46, to: { pos: [22, 506, 24], look: [4, 510, 0], fov: 32 } },
      label: (t) => t < 4 ? 'T+ *59* SECONDS' : 'FLAME REACHES THE *TANK*',
      shake: () => .1,
      update: (w, p, t, k) => {
        w.stack.position.y = 500; flicker(w, t, 1); w.puffs.visible = false; w.flame.visible = t > 1.6;
        const f = k.h.win(t, 1.6, 4.5); w.flame.scale.set(.3 + f * (1 + .15 * Math.sin(t * 30)), .5 + f * .6, .5 + f * .6);
        w.sky.children.forEach((c, i) => { c.position.set(-60 + (i * 37) % 120, 560 - ((t * 60 + i * 23) % 150), -40 - (i % 5) * 14); });
      },
    },
    { // wide shot: the vehicle breaks apart
      say: '{73|Seventy-three} seconds into the flight, Challenger broke apart, {46,000|forty-six thousand} feet above the Atlantic. All seven crew members were killed.',
      show: ['stack', 'cloud', 'trails'], sky: '#3F86CF', lightAt: [0, 1020, 0], lightDist: 90,
      cam: { pos: [30, 985, 120], look: [0, 1012, 0], fov: 40, to: { pos: [10, 990, 170], look: [0, 1030, 0], fov: 44 } },
      label: (t) => t < 5.4 ? 'T+ *73* SECONDS' : '*7* CREW LOST',
      update: (w, p, t, k) => {
        const b = k.h.win(t, 2.2, 3.2), g = k.h.win(t, 2.2, 9);
        w.stack.position.y = 1000 + t * 3; flicker(w, t, 1 - b); w.puffs.visible = w.flame.visible = false; w.stack.visible = b < .6;
        w.cloud.position.set(0, 1024 + t * 3, 0); w.cloud.visible = b > 0;
        w.cloud.children.forEach((c, i) => { const a = i * 2.399, r = b * (6 + (i % 5) * 4) + g * 6; c.position.set(Math.cos(a) * r, Math.sin(i * 1.3) * r * .7, Math.sin(a) * r * .5); c.scale.setScalar(b * (6 + (i % 4) * 3) + g * 3); });
        w.trails.position.copy(w.cloud.position); w.trails.visible = b > .5;
        w.trails.children.forEach((c, i) => { const sx = i ? 1 : -1, len = g * 46; c.scale.y = Math.max(.01, len); c.position.set(sx * (8 + len * .32), len * .42, 0); c.rotation.z = -sx * .65; });
      },
    },
    { // back on the cut-away: both rings failed
      say: 'The cause was the failure of both O-ring seals in that one joint. Shuttle flights stopped for {32|thirty-two} months.',
      show: ['section'], sky: '#2B3442', lightAt: [300, 8, 0], lightDist: 30,
      cam: { pos: [318, 22, 46], look: [300, 8, 0], fov: 38, to: { pos: [300, 8, 60], look: [300, 8, 0], fov: 38 } },
      label: (t) => t < 4.4 ? 'BOTH SEALS *FAILED*' : 'GROUNDED *32* MONTHS',
      update: (w, p, t, k) => joint(w, k, 1, 1),
    },
    { // closing question for the comments; the answer is deliberately not shown
      say: 'Quick question. Which scientist showed the problem at a televised hearing, using a glass of cold water? A, Richard Feynman. B, Carl Sagan. Or C, Stephen Hawking. Comment your answer.',
      quiz: { q: 'Which scientist showed the O-ring problem with a glass of cold water?', options: ['Richard Feynman', 'Carl Sagan', 'Stephen Hawking'], answer: 'A — Richard Feynman, at a televised Rogers Commission hearing on February 11, 1986.' },
      show: STACK, sky: '#274B73', lightAt: [0, 20, 0],
      cam: { pos: [60, 30, 90], look: [0, 6, 0], fov: 44, to: { pos: [-40, 34, 100], look: [0, 6, 0] } },
      update: (w, p, t) => { w.stack.position.y = 1.2; flicker(w, t, 0); w.puffs.visible = w.flame.visible = false; },
    },
  ],
};
