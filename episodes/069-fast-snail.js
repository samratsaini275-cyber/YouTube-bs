// Narrative 5: "What Would Happen If…". A made-up comedy sketch starring Steve the snail (recurring character).
// Real snails are slow; nobody gets hurt here (the car only spins gently on the slime).
// Hook rule: the premise as a question under 2 s, first frame already showing Steve zooming down a road with speed lines.

function snail(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  const foot = ball(1.4, mat('#9ACD6A', { rough: .6 }), [0, .7, 0], s.root); foot.scale.set(2.4, .55, 1);
  s.shell = group([-.6, 2.2, 0], s.root);
  const sh = k.torus(1.05, .75, mat('#C0703A', { rough: .5 }), [0, 0, 0], s.shell); sh.rotation.x = 0;
  ball(.7, mat('#E09A5A'), [0, 0, 0], s.shell);
  const sh2 = k.torus(.45, .3, mat('#8B4A22'), [0, 0, .5], s.shell); sh2.rotation.x = 0;
  s.head = group([2.6, 1.4, 0], s.root);
  ball(.75, mat('#9ACD6A', { rough: .6 }), [0, 0, 0], s.head);
  s.stalks = [-.3, .3].map(z => { const g = group([.1, .5, z], s.head); cyl(.09, .09, 1.4, mat('#9ACD6A'), [0, .7, 0], g, 8); ball(.22, mat('#FFFFFF'), [0, 1.45, 0], g); ball(.11, mat('#111111'), [.15, 1.5, 0], g); return g; });
  box(.5, .1, .1, mat('#2A2A2A'), [.68, -.2, 0], s.head).rotation.y = Math.PI / 2;
  s.goggles = box(.1, .3, 1.1, mat('#FFB020', { glow: .4 }), [.55, .35, 0], s.head);
  s.lines = group([0, 0, 0], s.root);
  for (let i = 0; i < 7; i++) { const l = box(3 + (i % 3), .08, .08, mat('#FFFFFF', { glow: 1.5 }), [-5 - (i % 3) * 1.5, .6 + (i % 4) * .7, -1.4 + (i % 5) * .7], s.lines); l.castShadow = false; }
  return s;
}

function car(k, parent, color) {
  const g = k.group([0, 0, 0], parent);
  k.box(7, 1.6, 3.4, k.mat(color, { metal: .3, rough: .35 }), [0, 1.4, 0], g);
  k.box(3.6, 1.3, 3, k.mat('#BFE6FF', { opacity: .5, rough: .05 }), [-.4, 2.8, 0], g);
  for (const x of [-2.3, 2.3]) for (const z of [-1.7, 1.7]) k.cyl(.8, .8, .5, k.mat('#1E2430'), [x, .8, z], g, 18).rotation.x = Math.PI / 2;
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group();
  box(600, .1, 16, mat('#4A4F5A'), [0, .05, 0], w.road).castShadow = false;
  w.dashes = group([0, 0, 0], w.road);
  for (let i = 0; i < 50; i++) box(3, .02, .35, mat('#FFFFFF'), [-100 + i * 6, .12, 0], w.dashes).castShadow = false;
  w.posts = group([0, 0, 0], w.road);
  for (let i = 0; i < 30; i++) { box(.3, 2, .3, mat('#E8E8E8'), [-100 + i * 10, 1, -9], w.posts); box(.32, .4, .32, mat('#E2453C', { glow: .3 }), [-100 + i * 10, 1.8, -9], w.posts); }
  w.s = snail(k, k.scene); w.steve = w.s.root;
  w.car1 = car(k, k.scene, '#2F6FD6');
  w.slime = group();
  for (let i = 0; i < 18; i++) { const sl = cyl(1.4, 1.4, .04, mat('#B6F27A', { glow: .3, metal: .3, rough: .05, opacity: .85 }), [-20 + i * 2.2, .14, 3.5], w.slime, 20); sl.scale.z = .7; sl.castShadow = false; }
  // the finish line
  w.finish = group([200, 0, 0]);
  for (let i = 0; i < 16; i++) box(1, .03, 1, mat(i % 2 ? '#111111' : '#FFFFFF'), [0, .13, -7.5 + i], w.finish).castShadow = false;
  for (const z of [-8, 8]) cyl(.25, .25, 7, mat('#C9CED6', { metal: .7 }), [0, 3.5, z], w.finish, 10);
  w.ribbon = box(.1, .3, 16, mat('#E2453C'), [0, 2, 0], w.finish);
  w.crowd = group([200, 0, -14]);
  for (let i = 0; i < 12; i++) { const c = group([-12 + i * 2.2, 0, (i % 2) * 1.5], w.crowd); cyl(.5, .6, 2, mat(['#E2453C', '#2F6FD6', '#22C55E', '#FFD21F'][i % 4]), [0, 1, 0], c, 10); ball(.5, mat('#F2C9A0'), [0, 2.5, 0], c); c.userData.ph = i * .7; }
  // morning: Steve at home under a tree, still in his shell
  w.garden = group([-200, 0, 0]);
  cyl(.8, 1, 6, mat('#6B4B2E'), [-6, 3, -6], w.garden, 10); ball(4.5, mat('#2E8B4A'), [-6, 8, -6], w.garden);
  w.sun = ball(2.5, mat('#FFB45C', { glow: 2 }), [-190, 6, -40]); w.sun.castShadow = false;
  w.clock = group([-200 + 6, 0, -4]);
  cyl(.15, .15, 5, mat('#5A6070'), [0, 2.5, 0], w.clock, 8);
  const cf = cyl(1.4, 1.4, .3, mat('#FFFFFF'), [0, 5.6, 0], w.clock, 28); cf.rotation.x = Math.PI / 2;
  w.hand = group([0, 5.6, .2], w.clock); box(.12, 1.1, .05, mat('#111111'), [0, .5, 0], w.hand);
  box(.12, .7, .05, mat('#111111'), [0, 5.9, .2], w.clock);
  return w;
}

function zoom(w, t, sp = 30, o = {}) {
  w.dashes.position.x = -((t * sp) % 6); w.posts.position.x = -((t * sp) % 10);
  w.steve.position.set(o.x ?? 0, .02 * Math.sin(t * 40), o.z ?? 0); w.steve.rotation.set(0, 0, 0);
  w.s.lines.visible = sp > 0; w.s.lines.children.forEach((l, i) => { l.position.x = -5 - ((t * 25 + i * 1.3) % 4); });
  w.s.stalks.forEach((g, i) => { g.rotation.z = sp > 0 ? .9 + .1 * Math.sin(t * 30 + i) : .05 * Math.sin(t * 2 + i); });
  w.s.head.position.set(2.6, 1.4, 0); w.s.head.scale.setScalar(1); w.s.goggles.visible = sp > 0;
}
const ROAD = ['ground', 'road', 'steve'];

export default {
  id: '069',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'STEVE, BUT FAST',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SNAILS', 'WERE SUPER FAST?'],
  title: 'What would happen if snails were super fast?',
  description: 'Steve the snail is back, and he finally has places to be. Leaving the house is still the hard part. (A made-up fast snail.)',
  tags: ['whatif', 'funny', 'snail', 'steve', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Steve and his top speed are made up; real snails are slow.',
  ],
  setup,
  scenes: [
    {
      say: 'What if snails were super fast?',
      show: ROAD, sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [8, 2.5, 16], look: [1, 4.6, 0], fov: 48, to: { pos: [7, 2.5, 14], look: [1, 4.6, 0], fov: 46 } },
      shake: () => .08,
      update: (w, p, t) => zoom(w, t),
    },
    {
      say: 'It overtakes cars on the highway.',
      show: [...ROAD, 'car1'], sky: '#A7D8F5', lightAt: [0, 2, -2], lightDist: 22,
      cam: { pos: [4, 9, 22], look: [0, 4, -2], fov: 48, to: { pos: [4, 9, 19], look: [0, 4, -2], fov: 46 } },
      update: (w, p, t) => { zoom(w, t, 30, { x: -8 + t * 7, z: 3 }); w.car1.position.set(2, 0, -3.5); w.car1.rotation.y = 0; },
    },
    {
      say: 'The slime trail? Every car just spins.',
      show: [...ROAD, 'car1', 'slime'], sky: '#9ED2F3', lightAt: [0, 2, 3], lightDist: 25,
      cam: { pos: [2, 18, 26], look: [0, 1, 2], fov: 48, to: { pos: [2, 17, 23], look: [0, 1, 2], fov: 46 } },
      update: (w, p, t) => { zoom(w, t, 0, { x: 24, z: 3.5 }); w.dashes.position.x = 0; w.posts.position.x = 0; w.car1.position.set(-6 + t * 4, 0, 3.5); w.car1.rotation.y = t * 5; },
    },
    {
      say: 'Every race? Steve, by a mile.',
      show: ['ground', 'road', 'steve', 'finish', 'crowd'], sky: '#FFE3C2', lightAt: [200, 2, 0], lightDist: 25,
      cam: { pos: [214, 6, 18], look: [200, 4, 0], fov: 50, to: { pos: [212, 6, 16], look: [200, 4, 0], fov: 48 } },
      update: (w, p, t) => {
        zoom(w, t, 30, { x: 190 + Math.min(t, 1.2) * 14, z: 0 });
        w.ribbon.visible = t < .7; w.crowd.children.forEach(c => { c.position.y = .6 * Math.abs(Math.sin(t * 9 + c.userData.ph)); });
      },
    },
    {
      say: 'But leaving his shell still takes all morning.',
      show: ['ground', 'garden', 'steve', 'sun', 'clock'], sky: '#FFD9A8', lightAt: [-200, 2, 0], lightDist: 16,
      cam: { pos: [-193, 5, 16], look: [-197.5, 4, -2], fov: 50, to: { pos: [-193.5, 5, 14], look: [-197.5, 4, -2], fov: 48 } },
      update: (w, p, t, k) => {
        zoom(w, t, 0, { x: -200, z: 0 }); w.dashes.position.x = 0; w.posts.position.x = 0;
        const out = k.h.ease(p);
        w.s.head.position.set(.2 + out * 2.4, 1.6 - out * .2, 0); w.s.head.scale.setScalar(.2 + out * .8);
        w.hand.rotation.z = -t * 3; w.sun.position.y = 6 + t * 4;
      },
    },
    {
      say: 'Fast snail: pet, racer, or menace? Comment below.',
      quiz: { q: 'What would a super-fast snail be?', options: ['A pet', 'A racer', 'A menace'], answer: 'It is a made-up snail, but Steve would like you to vote racer.' },
      show: ROAD, sky: '#274B73', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [10, 2, 14], look: [0, 8, 0], fov: 46, to: { pos: [-8, 2, 14], look: [0, 8, 0] } },
      update: (w, p, t) => zoom(w, t),
    },
  ],
};
