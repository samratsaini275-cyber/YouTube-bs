// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
const SHAFT_H = 120;

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  // the shaft, cut open on the camera side
  w.shaft = group();
  const conc = mat('#5C6270', { rough: 1 });
  box(1, SHAFT_H, 20, conc, [-10.5, SHAFT_H / 2, 0], w.shaft); box(1, SHAFT_H, 20, conc, [10.5, SHAFT_H / 2, 0], w.shaft); box(22, SHAFT_H, 1, conc, [0, SHAFT_H / 2, -10.5], w.shaft);
  for (let i = 0; i < 12; i++) box(22, .4, 1.2, mat('#454B57'), [0, i * 10 + 5, -9.8], w.shaft);
  // guide rails
  w.rails = group([0, 0, 0], w.shaft);
  for (const x of [-9.4, 9.4]) box(.8, SHAFT_H, 1.6, mat('#B8BEC8', { metal: .7, rough: .3 }), [x, SHAFT_H / 2, 0], w.rails);
  // the car
  w.car = group([0, 60, 0]);
  box(16, 14, 14, mat('#C9A227', { metal: .5, rough: .35 }), [0, 7, 0], w.car);
  box(12, 11, .3, mat('#2A2F38'), [0, 6.5, 7.05], w.car);
  w.brakes = group([0, 14, 0], w.car);
  w.shoeL = box(1.4, 2.4, 2.4, mat('#C46A2A', { metal: .6 }), [-8.4, 0, 0], w.brakes); w.shoeR = box(1.4, 2.4, 2.4, mat('#C46A2A', { metal: .6 }), [8.4, 0, 0], w.brakes);
  // cables: several, each strong enough alone
  w.cables = group([0, 0, 0], w.car);
  for (let i = 0; i < 6; i++) cyl(.18, .18, 60, mat('#D7DBE2', { metal: .8 }), [-2.5 + i, 44, 0], w.cables, 8);
  // governor wheel at the top
  w.gov = group([6, SHAFT_H - 4, -6]);
  w.govWheel = cyl(3, 3, .8, mat('#7A8292', { metal: .6 }), [0, 0, 0], w.gov, 24); w.govWheel.rotation.x = Math.PI / 2;
  w.sparkL = ball(.6, mat('#FFB020', { glow: 3 }), [-9, 0, 1.4], w.brakes); w.sparkR = ball(.6, mat('#FFB020', { glow: 3 }), [9, 0, 1.4], w.brakes);
  // 1850s demo platform
  w.demo = group([300, 0, 0]);
  box(60, 1, 40, mat('#8C6B4A', { rough: 1 }), [0, -.5, 0], w.demo);
  for (const x of [-8, 8]) box(1.2, 40, 1.2, mat('#6E4F33', { rough: .9 }), [x, 20, 0], w.demo);
  box(17.2, 1.2, 1.2, mat('#6E4F33'), [0, 40, 0], w.demo);
  w.plat = group([0, 18, 0], w.demo);
  box(14, .8, 8, mat('#A88458'), [0, 0, 0], w.plat);
  w.figure = group([0, .4, 0], w.plat); cyl(.9, 1.1, 4, mat('#1F2A3A'), [0, 2, 0], w.figure, 12); ball(.9, mat('#E6C3A0'), [0, 4.8, 0], w.figure); cyl(1.1, 1.1, 1.2, mat('#111111'), [0, 6, 0], w.figure, 12);
  w.rope = cyl(.2, .2, 22, mat('#C8B07A'), [0, 29, 0], w.demo, 8);
  return w;
}
function car(w, y, o = {}) {
  w.car.position.y = y;
  w.cables.visible = !o.snapped;
  const c = o.clamp || 0; w.shoeL.position.x = -8.4 - c * .4; w.shoeR.position.x = 8.4 + c * .4;
  w.sparkL.visible = w.sparkR.visible = !!o.sparks;
}
const ALL = ['shaft', 'car', 'gov'];

export default {
  id: '030',
  style: '3d',
  voice: 'v3',
  case: 'ELEVATOR BRAKES',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['WHAT IF THE', 'CABLE SNAPS?'],
  title: 'Why elevators don\'t fall when a cable breaks',
  description: 'Elevator cables can snap. Here is why the car still will not drop, and the man who showed it off to a crowd in 1854.',
  tags: ['engineering', 'elevator', 'whyisitbuiltlikethat', 'safety', 'otis', 'shorts'],
  sources: [
    'Wikipedia, "Elevator" — https://en.wikipedia.org/wiki/Elevator (retrieved November 2026): 2 to 6 (up to 12 or more in high rises) redundant hoist cables, each able to carry the rated load plus 25%; the governor detects overspeed and makes copper (or silicon nitride ceramic in high rises) brake shoes clamp the rails, stopping the car quickly but not so abruptly as to cause injury; Otis demonstrated his safety elevator at the New York Crystal Palace in 1854; first passenger safety elevator at 488 Broadway, New York, on 23 March 1857.',
    'Wikipedia, "Elisha Otis" — https://en.wikipedia.org/wiki/Elisha_Otis (retrieved November 2026).',
  ],
  setup,
  scenes: [
    {
      say: 'You step into an elevator. Forty floors up. Then you wonder: what if the cable snaps?',
      show: ALL, sky: '#11151C', lightAt: [0, 70, 0], lightDist: 50,
      cam: { pos: [10, 66, 40], look: [0, 67, 0], fov: 44, to: { pos: [4, 68, 26], look: [0, 67, 0], fov: 40 } },
      update: (w, p, t) => car(w, 60 + t * .6),
    },
    {
      say: 'First: there is not one cable. There are usually two to six. And each one, alone, can hold the full load, plus {25|twenty-five} percent.',
      show: ALL, sky: '#1A202B', lightAt: [0, 90, 0], lightDist: 50,
      cam: { pos: [-16, 84, 30], look: [0, 92, 0], fov: 42, to: { pos: [-10, 90, 24], look: [0, 96, 0], fov: 40 } },
      update: (w, p, t) => car(w, 64),
    },
    {
      say: 'And if the car ever drops faster than it should, a device called a governor trips.',
      show: ALL, sky: '#0F131A', lightAt: [6, 116, -6], lightDist: 30,
      cam: { pos: [16, 112, 14], look: [6, 116, -6], fov: 40, to: { pos: [12, 114, 8], look: [6, 116, -6], fov: 36 } },
      update: (w, p, t, k) => { car(w, 64 - k.h.win(t, .5, 3) * 10, { snapped: t > .5 }); w.govWheel.rotation.y = t * (2 + t * 4); },
    },
    {
      say: 'Brake shoes clamp onto the rails, and stop the car. Quickly, but not hard enough to hurt you.',
      show: ALL, sky: '#1D1410', lightAt: [0, 50, 0], lightDist: 40,
      cam: { pos: [22, 54, 18], look: [0, 50, 0], fov: 42, to: { pos: [16, 52, 14], look: [0, 49, 0], fov: 40 } },
      shake: (t) => t > .8 && t < 2 ? .4 : 0,
      update: (w, p, t, k) => { const fall = Math.min(t, 1.2); car(w, 50 - fall * 6 + fall * fall * 2, { snapped: true, clamp: k.h.win(t, .6, 1), sparks: t > .6 && t < 2 }); },
    },
    {
      say: 'The idea goes back to Elisha Otis. In {1854,|eighteen fifty-four,} he showed off his safety elevator at New York\'s Crystal Palace, in a dramatic public demo.',
      show: ['demo'], sky: '#E9DFC9', lightAt: [300, 20, 0], lightDist: 50,
      cam: { pos: [330, 16, 50], look: [300, 20, 0], fov: 44, to: { pos: [316, 20, 36], look: [300, 21, 0], fov: 42 } },
      update: (w, p, t, k) => { w.plat.position.y = 18 + k.h.win(t, 1, 3) * 6 - (t > 5 ? Math.min(t - 5, .3) * 2 : 0); w.rope.visible = t < 5; },
    },
    {
      say: 'Three years later, the first passenger safety elevator opened, in a store in New York City.',
      show: ALL, sky: '#2A3142', lightAt: [0, 30, 0], lightDist: 50,
      cam: { pos: [0, 20, 60], look: [0, 30, 0], fov: 46, to: { pos: [0, 40, 50], look: [0, 50, 0], fov: 46 } },
      update: (w, p, t) => car(w, 10 + t * 8),
    },
    {
      say: 'Quick question. In very tall buildings, what are the brake shoes often made of? A, rubber. B, ceramic. Or C, wood. Comment your answer.',
      quiz: { q: 'In very tall buildings, what are elevator brake shoes often made of?', options: ['Rubber', 'Ceramic', 'Wood'], answer: 'B — silicon nitride ceramic in high-rise installations (copper in others).' },
      show: ALL, sky: '#274B73', lightAt: [0, 60, 0], lightDist: 60,
      cam: { pos: [30, 110, 60], look: [0, 30, 0], fov: 46, to: { pos: [-30, 110, 60], look: [0, 30, 0] } },
      update: (w) => car(w, 60),
    },
  ],
};
