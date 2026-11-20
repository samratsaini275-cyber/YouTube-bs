// Narrative 8: "Objects With Opinions". A made-up comedy sketch: traffic cones do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the cone with a face on a road.

function tcone(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(2.6, .25, 2.6, mat('#FF7A1A'), [0, .12, 0], c.body);
  cone(1.1, 3.6, mat('#FF7A1A', { rough: .5 }), [0, 2.05, 0], c.body, 24);
  for (const y of [1.6, 2.6]) { const band = cyl(1.1 - (y - .25) * .3, 1.1 - (y + .25 - .25) * .3, .4, mat('#FFFFFF', { rough: .3 }), [0, y, 0], c.body, 24); }
  for (const x of [-.22, .22]) { ball(.13, mat('#FFFFFF'), [x, 2.1, .6], c.body); ball(.07, mat('#111111'), [x, 2.1, .7], c.body); }
  c.mouth = box(.3, .06, .05, mat('#5A1E1E'), [0, 1.85, .66], c.body);
  return c;
}
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group();
  box(200, .1, 10, mat('#4A4F5A'), [0, .05, 0], w.road).castShadow = false;
  for (let i = 0; i < 25; i++) box(3, .02, .3, mat('#FFFFFF'), [-60 + i * 5, .11, 0], w.road).castShadow = false;
  w.c = tcone(k, k.scene); w.cn = w.c.root;
  w.car = group([0, 0, 0]);
  box(6, 1.6, 3, mat('#2F6FD6', { metal: .3, rough: .35 }), [0, 1.3, 0], w.car); box(3.2, 1.2, 2.6, mat('#BFE6FF', { opacity: .55 }), [-.3, 2.6, 0], w.car);
  for (const x of [-2, 2]) for (const z of [-1.5, 1.5]) { const wh = cyl(.7, .7, .4, mat('#1E2430'), [x, .7, z], w.car, 16); wh.rotation.x = Math.PI / 2; }
  w.student = group([0, 0, 60]);
  w.sbody = group([0, 0, 0], w.student);
  cyl(.8, .9, 3, mat('#22C55E'), [0, 1.5, 0], w.sbody, 14); ball(.85, mat('#F2C9A0'), [0, 3.7, 0], w.sbody);
  w.street2 = group([0, 0, 60]); box(30, .05, 20, mat('#9AA3AE'), [0, .03, 0], w.street2).castShadow = false; box(30, 10, .5, mat('#8B3A2E'), [0, 5, -6], w.street2);
  w.party = group([0, 0, 120]);
  box(30, .05, 20, mat('#E8C9A0'), [0, .03, 0], w.party).castShadow = false; box(30, 14, .5, mat('#BFE3F5'), [0, 7, -6], w.party);
  for (let i = 0; i < 9; i++) { const fl = cone(.6, 1, mat(['#E2453C', '#FFD21F', '#22C55E', '#2F6FD6'][i % 4], { double: true }), [-8 + i * 2, 10, -5.6], w.party, 3); fl.rotation.z = Math.PI; }
  w.cake = group([2.5, 0, 121]); cyl(1.2, 1.2, 1, mat('#FFB3C7'), [0, 2.6, 0], w.cake, 20); cyl(1.6, 1.6, .2, mat('#FFFFFF'), [0, 2, 0], w.cake, 20); cyl(.2, .2, 2, mat('#9AA3AE'), [0, 1, 0], w.cake, 8);
  w.confetti = group();
  for (let i = 0; i < 24; i++) { const c = box(.25, .04, .15, mat(['#FFD21F', '#E2453C', '#22C55E', '#2F6FD6'][i % 4], { glow: .5 }), [0, 0, 0], w.confetti); c.userData = { a: i * 2.4, r: .5 + (i % 5) * .6, ph: (i * .13) % 1 }; c.castShadow = false; }
  return w;
}

export default {
  id: '126',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CONE WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS TRAFFIC CONE', 'HAS A COMPLAINT.'],
  title: 'This traffic cone has a complaint',
  description: 'Cars knock him over. Students wear him as a hat. So he quit, and became a party hat for real. (A made-up talking cone.)',
  tags: ['objectswithopinions', 'funny', 'trafficcone', 'road', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking traffic cones are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This traffic cone has a complaint.',
      show: ['ground', 'road', 'cn'], sky: '#9ED2F3', lightAt: [0, 3, 2], lightDist: 10,
      cam: { pos: [1.5, 2.2, 10.5], look: [0, 4.4, 0], fov: 44, to: { pos: [1.4, 2.2, 9.8], look: [0, 4.3, 0], fov: 42 } },
      update: (w, p, t) => { w.cn.position.set(0, 0, 0); w.cn.rotation.set(0, -.2, 0); w.cn.scale.setScalar(1); talk(w.c, t, t > .2); },
    },
    {
      say: 'Every car that passes knocks him over.',
      show: ['ground', 'road', 'cn', 'car'], sky: '#9ED2F3', lightAt: [0, 3, 2], lightDist: 16,
      cam: { pos: [4, 4, 13], look: [0, 2, 0], fov: 50, to: { pos: [3.6, 4, 12], look: [0, 2, 0], fov: 48 } },
      update: (w, p, t) => {
        const x = -12 + t * 12; w.car.position.set(x, 0, 0); const hit = x > -3; const tip = hit ? Math.min(Math.PI / 2, (x + 3) * 1.2) : 0;
        w.cn.position.set(hit ? Math.min(1.2, (x + 3) * .5) : 0, 0, 2); w.cn.rotation.set(0, 0, -tip); talk(w.c, t, !hit);
      },
    },
    {
      say: 'And every student wants him as a hat.',
      show: ['street2', 'student', 'cn'], sky: '#1E2440', lightAt: [0, 4, 62], lightDist: 12,
      cam: { pos: [2, 4, 70], look: [0, 4.4, 60], fov: 46, to: { pos: [1.8, 4, 69], look: [0, 4.4, 60], fov: 44 } },
      update: (w, p, t) => { w.cn.position.set(0, 4.45, 60); w.cn.rotation.set(0, 0, .15 * Math.sin(t * 6)); w.cn.scale.setScalar(.55); talk(w.c, t); w.sbody.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'So he quit, and became a real party hat.',
      show: ['party', 'cake', 'cn', 'confetti'], sky: '#BFE3F5', lightAt: [0, 4, 122], lightDist: 14,
      cam: { pos: [3.5, 4.4, 128], look: [2.5, 4, 121], fov: 44, to: { pos: [3.3, 4.4, 127.3], look: [2.5, 4, 121], fov: 42 } },
      update: (w, p, t) => {
        w.cn.position.set(2.5, 3.1, 121); w.cn.rotation.set(0, -.2, .1 * Math.sin(t * 3)); w.cn.scale.setScalar(.5); talk(w.c, t, t < 1.2);
        w.confetti.children.forEach(c => { const u = c.userData, f = (t * .6 + u.ph) % 1; c.position.set(2.5 + Math.cos(u.a) * u.r, 7 - f * 7, 121 + Math.sin(u.a) * u.r * .5); c.rotation.set(f * 9, u.a, 0); });
      },
    },
    {
      say: 'Traffic cone: hat, road, or a party? Comment below.',
      quiz: { q: 'What is a traffic cone really for?', options: ['A hat', 'The road', 'A party'], answer: 'This cone is made up. It voted party.' },
      show: ['ground', 'road', 'cn'], sky: '#274B73', lightAt: [0, 3, 2], lightDist: 10,
      cam: { pos: [1.5, 1.2, 9.5], look: [0, 4.8, 0], fov: 44, to: { pos: [-1.5, 1.2, 9.5], look: [0, 4.8, 0] } },
      update: (w, p, t) => { w.cn.position.set(0, 0, 0); w.cn.rotation.set(0, -.2, 0); w.cn.scale.setScalar(1); talk(w.c, t, false); },
    },
  ],
};
