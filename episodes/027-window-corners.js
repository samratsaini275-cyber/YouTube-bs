// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified; stress lines are a sketch, not a simulation.
const TANK = [0, 0, -300];   // fuselage in a water tank
const PLATE = [300, 0, 0];   // stress around a sharp vs rounded opening

function jet(k, parent) {
  const { mat, box, cyl, cone, group } = k, g = group([0, 0, 0], parent), skin = mat('#E9ECEF', { metal: .3, rough: .4 });
  const body = cyl(4, 4, 60, skin, [0, 0, 0], g, 32); body.rotation.z = Math.PI / 2;
  const nose = cone(4, 9, skin, [34.5, 0, 0], g, 32); nose.rotation.z = -Math.PI / 2;
  const tail = cone(4, 12, skin, [-36, .6, 0], g, 32); tail.rotation.z = Math.PI / 2;
  box(14, .6, 52, skin, [2, -1.4, 0], g); box(6, 9, .6, skin, [-36, 5, 0], g);
  box(56, .5, .2, mat('#1F5FA8'), [0, .4, 4.02], g); box(56, .5, .2, mat('#1F5FA8'), [0, .4, -4.02], g);
  for (let i = 0; i < 14; i++) box(1.4, 1.1, .2, mat('#2A3442'), [-22 + i * 3.4, 1.4, 4.02], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  // over the sea
  w.sea = k.ground('#1E5D8C', -40);
  w.jet = jet(k, k.scene);
  w.halfA = group(); w.halfB = group();
  // tank test
  w.tank = group(TANK);
  box(90, 22, 30, mat('#4FA3D9', { opacity: .35 }), [0, 0, 0], w.tank).castShadow = false;
  w.tankJet = jet(k, w.tank);
  w.crack = box(.4, 2.6, .3, mat('#FF3B30', { glow: 2 }), [8, 2, 4.1], w.tank);
  // stress plates
  w.plate = group(PLATE);
  const skinM = mat('#C9CED6', { metal: .5, rough: .4 });
  w.sq = group([0, 15, 0], w.plate); w.rd = group([0, -15, 0], w.plate);
  for (const [g, round] of [[w.sq, false], [w.rd, true]]) {
    box(20, 26, 1, skinM, [0, 0, -.6], g);
    if (round) { const o = cyl(4.6, 4.6, 1.2, mat('#0B0D12'), [0, 0, -.5], g, 48); o.rotation.x = Math.PI / 2; o.scale.set(.8, 1, 1.3); }
    else box(7.4, 11.4, 1.2, mat('#0B0D12'), [0, 0, -.5], g);
  }
  // flow lines: dots streaming down each plate, bending around the opening
  w.dots = [];
  for (const [g, round] of [[w.sq, false], [w.rd, true]]) for (let lane = -4; lane <= 4; lane++) for (let j = 0; j < 7; j++) {
    const d = ball(.32, mat('#7FD0FF', { glow: 1.6 }), [0, 0, .2], g); d.castShadow = false; d.userData = { lane, ph: j / 7, round }; w.dots.push(d);
  }
  w.hotSq = ball(1.2, mat('#FF3B30', { glow: 2, opacity: .85 }), [3.7, 5.7, .4], w.sq); w.hotSq.castShadow = false;
  w.hotRd = ball(.9, mat('#FFB020', { glow: 1, opacity: .6 }), [3.6, 3, .4], w.rd); w.hotRd.castShadow = false;
  return w;
}
function stream(w, t, crowd) {
  w.dots.forEach(d => {
    const { lane, ph, round } = d.userData, y = 12 - ((t * .3 + ph) % 1) * 24, x0 = lane * 1.1, half = round ? 3.7 : 3.7;
    let x = x0;
    if (Math.abs(y) < (round ? 6.5 : 6.2) && Math.abs(x0) < half + .6) {
      const edge = round ? (half + .4) * Math.sqrt(Math.max(0, 1 - (y / 6.6) ** 2)) + .4 : half + .4;
      x = Math.sign(x0 || 1) * Math.max(edge, Math.abs(x0)) + Math.sign(x0 || 1) * (round ? 0 : crowd * (Math.abs(y) > 4.8 ? .1 : .5));
    }
    d.position.set(x, y, .2);
  });
}

export default {
  id: '027',
  style: '3d',
  voice: 'v3',
  case: 'ROUNDED WINDOW CORNERS',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['IT BROKE APART', 'IN MID-AIR.'],
  title: 'Why airplane windows have rounded corners',
  description: 'Thirty-five people were on board when this jet came apart in the sky. The crack started at one tiny hole. Every airliner since was built differently.',
  tags: ['engineering', 'aviation', 'whyisitbuiltlikethat', 'decomet', 'metalfatigue', 'shorts'],
  sources: [
    'Wikipedia, "de Havilland Comet" — https://en.wikipedia.org/wiki/De_Havilland_Comet (retrieved November 2026): BOAC Flight 781, 10 January 1954, all 35 on board lost; fatigue crack from a countersunk rivet hole near the corner of the rear ADF window cut-out; water-tank test, failures expected at 1,000 to 9,000 cycles; the "square passenger window" story is a misreading; later jetliners used larger corner radii to reduce stress concentration.',
  ],
  setup,
  scenes: [
    {
      say: 'In {1954,|nineteen fifty-four,} a jet airliner broke apart in mid-air over the Mediterranean. All {35|thirty-five} people on board were killed.',
      show: ['sea', 'jet'], sky: '#9CC3E6', lightAt: [0, 0, 0], lightDist: 70,
      cam: { pos: [80, 24, 110], look: [0, 0, 0], fov: 42, to: { pos: [60, 16, 90], look: [0, 0, 0], fov: 40 } },
      shake: (t) => t > 3 ? .5 : 0,
      update: (w, p, t) => { w.jet.position.set(-10 + t * 3, 0, 0); w.jet.rotation.z = t > 3 ? -.05 * (t - 3) : 0; },
    },
    {
      say: 'It was the de Havilland Comet. The world\'s first jet airliner.',
      show: ['sea', 'jet'], sky: '#C9DDEE', lightAt: [0, 0, 0], lightDist: 70,
      cam: { pos: [-40, -6, 40], look: [6, 0, 0], fov: 40, to: { pos: [-20, -2, 30], look: [8, 0, 0], fov: 38 } },
      update: (w, p, t) => { w.jet.position.set(0, 0, 0); w.jet.rotation.z = 0; },
    },
    {
      say: 'Investigators pieced it back together. A crack had grown from one tiny rivet hole, at the corner of a window-shaped opening in the roof.',
      show: ['tank'], sky: '#1A2433', lightAt: [0, 0, -300], lightDist: 60,
      cam: { pos: [30, 20, -250], look: [8, 2, -300], fov: 40, to: { pos: [14, 6, -288], look: [8, 2, -296], fov: 34 } },
      update: (w, p, t, k) => { const g = k.h.win(t, 2.5, 6); w.crack.scale.y = .5 + g * 1.1; w.crack.position.y = 1.8; },
    },
    {
      say: 'Here is the problem with corners. Stress flows around an opening, like water around a rock. At a sharp corner, it piles up.',
      show: ['plate'], sky: '#12202F', lightAt: [300, 0, 0], lightDist: 50,
      cam: { pos: [300, 15, 50], look: [300, 15, 0], fov: 42, to: { pos: [300, 15, 42], look: [300, 15, 0], fov: 42 } },
      update: (w, p, t, k) => { stream(w, t, 1); const a = k.h.win(t, 4.5, 6); w.hotSq.visible = a > 0; w.hotSq.scale.setScalar(.4 + a * .8 + .1 * Math.sin(t * 8)); w.hotRd.visible = false; },
    },
    {
      say: 'Every flight, the cabin is pumped up with air and then let down again. Each time, a crack can creep a little further.',
      show: ['tank'], sky: '#22303F', lightAt: [0, 0, -300], lightDist: 60,
      cam: { pos: [-40, 16, -240], look: [0, 0, -300], fov: 42, to: { pos: [-30, 10, -256], look: [4, 0, -300], fov: 40 } },
      update: (w, p, t) => { const s = 1 + .02 * Math.sin(t * 5); w.tankJet.scale.set(1, s, s); w.crack.scale.y = Math.min(1.8, 1.2 + t * .08); w.crack.position.y = 1.8; },
    },
    {
      say: 'That is why jet windows have big, rounded corners. The stress spreads out, instead of piling up. Fun fact: it was not the passenger windows that failed on the Comet. But the lesson stuck.',
      show: ['plate'], sky: '#12301F', lightAt: [300, 0, 0], lightDist: 50,
      cam: { pos: [300, -15, 44], look: [300, -15, 0], fov: 42, to: { pos: [300, 0, 84], look: [300, 0, 0], fov: 44 } },
      update: (w, p, t) => { stream(w, t, 1); w.hotSq.visible = true; w.hotSq.scale.setScalar(1.1); w.hotRd.visible = true; },
    },
    {
      say: 'Quick question. In tank tests, how many pressure cycles could crack a Comet 1? A, {100|one hundred} to {500.|five hundred.} B, {1,000|one thousand} to {9,000.|nine thousand.} Or C, over {50,000.|fifty thousand.} Comment your answer.',
      quiz: { q: 'In tank tests, how many pressure cycles could crack a Comet 1?', options: ['100 to 500', '1,000 to 9,000', 'Over 50,000'], answer: 'B — failures could be expected anywhere from 1,000 to 9,000 cycles.' },
      show: ['sea', 'jet'], sky: '#274B73', lightAt: [0, 0, 0], lightDist: 70,
      cam: { pos: [30, 50, 80], look: [0, -30, 0], fov: 46, to: { pos: [-30, 50, 80], look: [0, -30, 0] } },
      update: (w) => { w.jet.position.set(0, 0, 0); w.jet.rotation.z = 0; },
    },
  ],
};
