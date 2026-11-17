// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: the sideways elevator is fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (an elevator car sliding sideways out of a tower).

function person(k, parent, pos, color) {
  const g = k.group(pos, parent);
  k.cyl(.6, .7, 2.6, k.mat(color), [0, 1.3, 0], g, 14); k.ball(.6, k.mat('#F2C9A0'), [0, 3.1, 0], g);
  for (const x of [-.2, .2]) k.ball(.08, k.mat('#111111'), [x, 3.2, .55], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#7C8796', 0);
  w.city = group();
  const towers = [[-30, 50, '#8FB3D9'], [0, 50, '#E2B07A'], [30, 50, '#B9A2D9'], [60, 40, '#A8D5BA'], [90, 30, '#F2B5A0']];
  towers.forEach(([x, h, c]) => { box(16, h, 16, mat(c), [x, h / 2, -6], w.city); for (let y = 4; y < h; y += 5) box(16.2, .3, 16.2, mat('#FFFFFF', { opacity: .5 }), [x, y, -6], w.city).castShadow = false; });
  // the horizontal track, with "floors" marked as buildings
  w.track = group();
  box(130, .6, 1, mat('#5A6070', { metal: .6 }), [30, 20, 3], w.track); box(130, .6, 1, mat('#5A6070', { metal: .6 }), [30, 26.5, 3], w.track);
  // the elevator car
  w.car = group([0, 20.3, 3]);
  box(5, .4, 4, mat('#C9CED6', { metal: .7 }), [0, 0, 0], w.car); box(5, .4, 4, mat('#C9CED6', { metal: .7 }), [0, 6, 0], w.car);
  for (const [x, z] of [[-2.4, -1.9], [2.4, -1.9], [-2.4, 1.9], [2.4, 1.9]]) box(.25, 6, .25, mat('#C9CED6', { metal: .7 }), [x, 3, z], w.car);
  box(4.8, 5.6, 3.8, mat('#BFE6FF', { opacity: .25, rough: .05 }), [0, 3.1, 0], w.car).castShadow = false;
  w.rider = person(k, w.car, [0, .2, 0], '#E2453C');
  w.panel = group([2.2, 3.4, 1.95], w.car);
  box(.9, 1.6, .1, mat('#2A2F38'), [0, 0, 0], w.panel);
  w.btns = [];
  for (let i = 0; i < 3; i++) { const b = ball(.13, mat('#FFD21F', { glow: .5 }), [0, .5 - i * .5, .08], w.panel); w.btns.push(b); }
  // the stairs at the end
  w.stairs = group([-14, 0, 8]);
  for (let i = 0; i < 12; i++) box(5, .8, 1.4, mat('#B8BEC8'), [0, .4 + i * .8, -i * 1.4], w.stairs);
  w.crowd = group([-14, 0, 8]);
  for (let i = 0; i < 4; i++) { const p = person(k, w.crowd, [((i % 2) - .5) * 2, .8 + i * 2.4, -i * 4.2], ['#2F6FD6', '#22C55E', '#F59E0B', '#14B8A6'][i]); p.rotation.y = Math.PI; }
  return w;
}

function ride(w, x, t) { w.car.position.x = x; w.rider.rotation.z = .05 * Math.sin(t * 4); }
function press(w, t, i) { w.btns.forEach((b, j) => { b.material.emissiveIntensity = j === i && (t % .6) < .3 ? 3 : .5; }); }
const ALL = ['ground', 'city', 'track', 'car'];

export default {
  id: '054',
  style: '3d',
  voice: 'v3',
  case: 'THE SIDEWAYS ELEVATOR',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS ELEVATOR', 'GOES SIDEWAYS.'],
  title: 'Engineers built an elevator that only goes sideways',
  description: 'Press floor ten. Arrive somewhere you did not expect. (A made-up elevator. Real ones go up.)',
  tags: ['engineering', 'funny', 'badideas', 'elevator', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the sideways elevator and its destinations are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This elevator goes sideways.',
      show: ALL, sky: '#9ED2F3', lightAt: [6, 22, 3], lightDist: 30,
      cam: { pos: [14, 17, 30], look: [8, 31, 3], fov: 50, to: { pos: [18, 17, 28], look: [12, 31, 3], fov: 48 } },
      update: (w, p, t) => { ride(w, 4 + t * 6, t); press(w, t, -1); },
    },
    {
      say: 'Press floor ten. You arrive next door.',
      show: ALL, sky: '#A7D8F5', lightAt: [15, 22, 3], lightDist: 40,
      cam: { pos: [15, 30, 54], look: [15, 22, 0], fov: 48, to: { pos: [20, 28, 50], look: [20, 22, 0], fov: 48 } },
      update: (w, p, t, k) => { ride(w, k.h.ease(Math.min(1, t / 2.2)) * 30, t); press(w, t, 0); },
    },
    {
      say: 'Press floor twenty. You arrive in the next town.',
      show: ALL, sky: '#FFE3C2', lightAt: [60, 22, 3], lightDist: 50,
      cam: { pos: [40, 34, 70], look: [60, 20, 0], fov: 50, to: { pos: [60, 34, 70], look: [80, 20, 0], fov: 50 } },
      update: (w, p, t) => { ride(w, 30 + Math.min(t * 22, 62), t); press(w, t, 1); },
    },
    {
      say: 'The stairs are still more popular.',
      show: [...ALL, 'stairs', 'crowd'], sky: '#9ED2F3', lightAt: [-14, 6, 0], lightDist: 25,
      cam: { pos: [2, 14, 30], look: [-12, 7, 0], fov: 46, to: { pos: [0, 13, 26], look: [-13, 7, 0], fov: 44 } },
      update: (w, p, t) => { ride(w, 30, t); w.crowd.position.y = .15 * Math.abs(Math.sin(t * 5)); },
    },
    {
      say: 'Quick question. Which button would you press? Up? Down? Or France? Comment your answer.',
      quiz: { q: 'Which button would you press?', options: ['Up', 'Down', 'France'], answer: 'It is a made-up elevator, so France is allowed.' },
      show: ALL, sky: '#274B73', lightAt: [6, 22, 3], lightDist: 30,
      cam: { pos: [18, 14, 32], look: [6, 30, 3], fov: 46, to: { pos: [-6, 14, 32], look: [6, 30, 3] } },
      update: (w, p, t) => { ride(w, 6 + Math.sin(t) * 4, t); press(w, t, 2); },
    },
  ],
};
