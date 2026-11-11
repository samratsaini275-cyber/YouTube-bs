// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified; movement is exaggerated.
const SOLID = [0, 0, -300];   // the same bridge built with no gap
const FJ = [0, -300, 0];      // finger joint, seen from above
const BARS = [400, 0, 0];     // how much movement a joint takes
const WALK = [800, 0, 0];     // sidewalk slabs, for the closing question
const HALF = 58, DECK_Y = 20;

function bridgeBase(k, parent) {
  const { mat, box } = k, stone = mat('#B9B2A3', { rough: 1 });
  box(400, 2, 160, mat('#2C7FB8', { rough: .4 }), [0, -1, 0], parent).castShadow = false;
  for (const x of [-70, 70]) { box(26, 26, 30, stone, [x, 9, 0], parent); box(60, 26, 60, mat('#6FA35A', { rough: 1 }), [x * 1.6, 9, 0], parent); }
  box(8, DECK_Y - 2, 16, stone, [0, (DECK_Y - 2) / 2, 0], parent);
}
function deckSlab(k, parent, len) {
  const g = k.group([0, 0, 0], parent);
  k.box(len, 3, 18, k.mat('#5E6570', { rough: .9 }), [0, 0, 0], g); k.box(len, .2, .8, k.mat('#F2E9C9'), [0, 1.6, 0], g).castShadow = false;
  for (const z of [-8.6, 8.6]) k.box(len, 2.4, .8, k.mat('#C9CED6', { metal: .4 }), [0, 2.4, z], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  // --- bridge with a joint in the middle ---
  w.bridge = group(); bridgeBase(k, w.bridge);
  w.left = deckSlab(k, w.bridge, HALF); w.right = deckSlab(k, w.bridge, HALF);
  w.car = group([0, 0, 0], w.bridge);
  box(9, 2.6, 4.6, mat('#E0483A'), [0, 2.1, 0], w.car); box(5, 2, 4.2, mat('#F2F2EE'), [-.4, 4.2, 0], w.car);
  for (const [x, z] of [[-2.8, 2.3], [2.8, 2.3], [-2.8, -2.3], [2.8, -2.3]]) cyl(1.1, 1.1, .8, mat('#1B1D22'), [x, 1.1, z], w.car, 16).rotation.x = Math.PI / 2;
  w.sun = ball(9, mat('#FFD21F', { glow: 2 }), [-40, 78, -60]); w.sun.castShadow = false;
  // --- the same bridge with one solid deck: it has nowhere to go ---
  w.solid = group(SOLID); bridgeBase(k, w.solid);
  w.sL = deckSlab(k, w.solid, HALF + 1.5); w.sR = deckSlab(k, w.solid, HALF + 1.5);
  w.crack = box(.7, 3.6, 18.2, mat('#FF3B30', { glow: 1.6 }), [0, DECK_Y, 0], w.solid);
  // --- finger joint from above ---
  w.finger = group(FJ);
  box(60, 2, 40, mat('#5E6570', { rough: .9 }), [0, -1.2, 0], w.finger);
  box(9, 2.3, 40.4, mat('#0B0D12'), [0, -1.1, 0], w.finger);
  w.combL = group([0, 0, 0], w.finger); w.combR = group([0, 0, 0], w.finger);
  const steelA = mat('#C9CED6', { metal: .7, rough: .3 }), steelB = mat('#9AA4B2', { metal: .7, rough: .3 });
  box(6, .8, 40, steelA, [-9, 0, 0], w.combL); box(6, .8, 40, steelB, [9, 0, 0], w.combR);
  for (let i = 0; i < 10; i++) { box(11, .8, 1.5, steelA, [-.5, 0, -18 + i * 4], w.combL); box(11, .8, 1.5, steelB, [.5, 0, -16 + i * 4], w.combR); }
  // --- movement bars, to scale ---
  w.bars = group(BARS);
  box(44, 1, 16, mat('#3B4658'), [0, -.5, 0], w.bars);
  w.b30 = box(8, 1, 8, mat('#FFD21F', { glow: .6 }), [-9, 0, 0], w.bars); w.b3000 = box(8, 1, 8, mat('#39C6FF', { glow: .5 }), [9, 0, 0], w.bars);
  // --- sidewalk ---
  w.walk = group(WALK);
  box(120, 2, 60, mat('#6FA35A', { rough: 1 }), [0, -1, 0], w.walk);
  for (let i = -2; i <= 2; i++) { box(15, 1.2, 14, mat('#D9D4C8', { rough: .9 }), [i * 16, .6, 0], w.walk); if (i < 2) box(1, 1.3, 14, mat('#8A5A2B'), [i * 16 + 8, .65, 0], w.walk); }
  return w;
}

// grow: how much each half of the deck has lengthened (model units; hugely exaggerated)
function span(w, grow, o = {}) {
  const gap = 4 - grow * 2;                              // gap at 4 when cold, closing as it warms
  w.left.scale.x = (HALF - gap / 2 + 0) / HALF; w.right.scale.x = w.left.scale.x;
  w.left.position.set(-HALF - 0 + (HALF * w.left.scale.x) / 2 - 0, DECK_Y, 0); w.right.position.set(HALF - (HALF * w.right.scale.x) / 2, DECK_Y, 0);
  w.car.visible = o.carX !== undefined;
  if (w.car.visible) { const x = o.carX; w.car.position.set(x, DECK_Y + 1.5 + (Math.abs(x) < 3 ? .7 * Math.cos(x / 3 * Math.PI / 2) : 0), 4); }
  w.sun.visible = !!o.sun; if (o.sun) w.sun.scale.setScalar(.6 + o.sun * .9);
}
const bar = (m, hgt) => { m.scale.y = Math.max(.01, hgt); m.position.y = Math.max(.005, hgt / 2); };
const BR = ['bridge', 'sun'];

export default {
  id: '024',
  style: '3d',
  voice: 'v3',
  case: 'BRIDGE EXPANSION JOINTS',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['WHY THE GAPS', 'IN EVERY BRIDGE?'],
  title: 'Why bridges are built with gaps',
  description: 'The gaps in a bridge deck are expansion joints: assemblies that hold the parts together while safely absorbing the expansion and contraction caused by temperature. Finger joints let traffic cross while the deck still moves.',
  tags: ['engineering', 'design', 'whyisitbuiltlikethat', 'bridges', 'civilengineering', 'shorts'],
  sources: [
    'Wikipedia, "Expansion joint" — https://en.wikipedia.org/wiki/Expansion_joint (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'Ever felt that thump when you drive onto a bridge? That is a gap in the road. And it is there on purpose.',
      show: BR, sky: '#BFE3F5', lightAt: [0, 16, 0], lightDist: 90,
      cam: { pos: [50, 40, 70], look: [0, 18, 0], fov: 44, to: { pos: [26, 30, 42], look: [0, 20, 0], fov: 38 } },
      label: (t) => t > 4.4 ? 'A GAP. *ON PURPOSE.*' : '',
      update: (w, p, t) => span(w, 0, { carX: -46 + t * 12 }),
    },
    {
      say: 'It is called an expansion joint. Because a bridge is not a fixed length.',
      show: BR, sky: '#F1D9B5', lightAt: [0, 20, 0], lightDist: 50,
      cam: { pos: [14, 44, 26], look: [0, 21, 0], fov: 40, to: { pos: [8, 36, 20], look: [0, 21, 0], fov: 34 } },
      label: (t) => t < 2.6 ? 'AN *EXPANSION JOINT*' : 'THE LENGTH *CHANGES*', note: 'MODEL SIMPLIFIED · NOT TO SCALE',
      update: (w, p, t) => span(w, .5 + .5 * Math.sin(t * 1.6)),
    },
    {
      say: 'When it warms up, the materials expand. When it cools down, they shrink back.',
      show: BR, sky: '#F3C08A', lightAt: [0, 16, 0], lightDist: 90,
      cam: { pos: [0, 30, 96], look: [0, 22, 0], fov: 42, to: { pos: [0, 28, 60], look: [0, 21, 0], fov: 38 } },
      label: (t) => t < 2.8 ? 'WARM: IT *GROWS*' : 'COLD: IT *SHRINKS*', note: 'MOVEMENT EXAGGERATED',
      update: (w, p, t, k) => { const g = k.h.win(t, .4, 2.6) - k.h.win(t, 3, 5.2); span(w, 1.7 * g, { sun: g }); },
    },
    {
      say: 'With no gap, that movement has nowhere to go. Before joints were used, structures cracked under the stress.',
      show: ['solid'], sky: '#3A1C1C', lightAt: [0, 16, -300], lightDist: 90,
      cam: { pos: [40, 34, -236], look: [0, 22, -300], fov: 42, to: { pos: [22, 30, -256], look: [0, 23, -300], fov: 38 } },
      label: (t) => t < 3 ? 'NO GAP? *NOWHERE TO GO*' : 'IT *CRACKS*', note: 'MOVEMENT EXAGGERATED',
      update: (w, p, t, k) => {
        const b = k.h.win(t, 1.2, 4), a = b * .15, L = HALF + 1.5;
        w.sL.rotation.z = a; w.sR.rotation.z = -a;
        w.sL.position.set(-L / 2 * Math.cos(a) - (HALF + 1.5 - L) , DECK_Y + L / 2 * Math.sin(a), 0); w.sR.position.set(L / 2 * Math.cos(a), DECK_Y + L / 2 * Math.sin(a), 0);
        w.crack.visible = b > .5; w.crack.position.y = DECK_Y + L * Math.sin(a) + .4; w.crack.scale.x = 1 + b;
      },
    },
    {
      say: 'So the deck is built in pieces, joined by steel fingers that slide past each other. Cars cross. The bridge still moves.',
      show: ['finger'], sky: '#22303F', lightAt: [0, -300, 0], lightDist: 50,
      cam: { pos: [10, -250, 30], look: [0, -300, 0], fov: 42, to: { pos: [20, -262, 34], look: [0, -300, 0], fov: 38 } },
      label: (t) => t < 4 ? 'STEEL *FINGERS*' : 'CARS CROSS · IT STILL *MOVES*', note: 'FINGER JOINT · SEEN FROM ABOVE',
      update: (w, p, t) => { const s = 1.6 * Math.sin(t * 1.5); w.combL.position.x = -1.2 + s; w.combR.position.x = 1.2 - s; },
    },
    {
      say: 'Small joints take about {30|thirty} millimeters of movement. The biggest are built for more than {3,000.|three thousand.}',
      show: ['bars'], sky: '#1D2B45', lightAt: [400, 12, 0], lightDist: 50,
      cam: { pos: [400, 18, 92], look: [400, 13, 0], fov: 42, to: { pos: [410, 20, 84], look: [400, 13, 0] } },
      label: (t) => t < 3.2 ? 'SMALL: *30 MM*' : 'LARGEST: OVER *3,000 MM*', note: 'BAR HEIGHTS TO SCALE',
      update: (w, p, t, k) => { bar(w.b30, .28 * k.h.win(t, .5, 1.4)); bar(w.b3000, 28 * k.h.win(t, 3.2, 4.8)); },
    },
    {
      say: 'Quick question. Sidewalks have these joints too. What are the spacers between the slabs often made of? A, wood. B, glass. Or C, lead. Comment your answer.',
      quiz: { q: 'Sidewalks have joints too. What are the spacers between slabs often made of?', options: ['Wood', 'Glass', 'Lead'], answer: 'A — wood. A wooden spacer, typically cedar, compresses as the concrete expands.' },
      show: ['walk'], sky: '#274B73', lightAt: [800, 0, 0], lightDist: 60,
      cam: { pos: [820, 60, 80], look: [800, -44, 0], fov: 46, to: { pos: [780, 60, 80], look: [800, -44, 0] } },
    },
  ],
};
