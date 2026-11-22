// Narrative 11: "What Would Happen If… (season 3, with Gary)". Flying premise (080 everyone could fly, 1.1K).
// Hook: the premise as a question under 2 s; first frame shows a red car with eyes flying over rooftops, wheels spinning in the air.

function car(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(4.4, 1.1, 2.2, mat('#E2453C', { rough: .3 }), [0, 1.0, 0], c.body);
  box(2.4, 1.0, 2.0, mat('#E2453C', { rough: .3 }), [-.3, 2.0, 0], c.body);
  box(2.2, .8, 2.05, mat('#9FD3EE', { rough: .1 }), [-.3, 2.0, 0], c.body);
  c.wheels = [];
  for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], c.body, 16); wh.rotation.x = Math.PI / 2; c.wheels.push(wh); }
  c.eyes = [-.6, .6].map(z => { const g = group([2.2, 1.25, z], c.body); ball(.33, mat('#FFFDE8', { glow: .6 }), [0, 0, 0], g); ball(.16, mat('#111111'), [.25, 0, 0], g); return g; });
  c.mouth = box(.1, .14, 1.0, mat('#3A3A3A'), [2.22, .75, 0], c.body);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group(); for (let i = 0; i < 12; i++) { const x = -40 + (i % 6) * 14, z = -8 - Math.floor(i / 6) * 14, h = 5 + (i * 7) % 9; box(8, h, 8, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9'][i % 4]), [x, h / 2, z], w.town); }
  w.c = car(k, k.scene); w.cr = w.c.root;
  w.cars = group(); const cols = ['#3B82F6', '#22C55E', '#F97316', '#8B5CF6', '#EC4899', '#14B8A6'];
  for (let i = 0; i < 6; i++) { const c = car(k, w.cars); c.body.children[0].material = mat(cols[i], { rough: .3 }); c.body.children[1].material = c.body.children[0].material; c.root.userData.i = i; c.root.userData.c = c; }
  w.roof = group(); box(16, 10, 12, mat('#CFE3F2'), [0, 5, 0], w.roof); box(16.4, .3, 12.4, mat('#9AA5B1'), [0, 10.1, 0], w.roof); for (let i = 0; i < 3; i++) box(.2, .05, 5, mat('#FFFFFF'), [-4 + i * 4, 10.3, 0], w.roof);
  w.cloud = group(); for (let i = 0; i < 6; i++) ball(1.6, mat('#B8C4D0'), [-3 + i * 1.2, 0, (i % 2) * .8], w.cloud);
  w.rain = group(); for (let i = 0; i < 30; i++) { const d = box(.06, .5, .06, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.rain); d.userData.i = i; d.castShadow = false; }
  w.bird = group(); const bb = ball(.7, mat('#4A6FA5'), [0, 0, 0], w.bird); bb.scale.set(1.5, 1, 1); ball(.5, mat('#4A6FA5'), [.9, .4, 0], w.bird);
  cone(.18, .5, mat('#FFB020'), [1.45, .38, 0], w.bird, 8).rotation.z = -Math.PI / 2;
  for (const z of [-.2, .2]) { ball(.11, mat('#FFFFFF'), [1.2, .55, z], w.bird); ball(.06, mat('#111111'), [1.28, .55, z], w.bird); }
  box(.4, .06, .5, mat('#111111'), [1.1, .72, 0], w.bird).rotation.z = -.4;
  w.bw = [-1, 1].map(s => { const p = group([0, .2, s * .4], w.bird); box(.9, .08, 1.2, mat('#36507A'), [0, 0, s * .6], p); return p; });
  return w;
}

const fly = (w, x, y, z, ry, t) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.c.body.rotation.set(.04 * Math.sin(t * 3), 0, .05 * Math.sin(t * 2)); w.c.body.position.y = 0; w.c.wheels.forEach(wh => wh.rotation.y = t * 12); w.c.eyes.forEach(e => e.scale.set(1, 1, 1)); };

export default {
  id: '176',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLYING CARS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CARS', 'COULD FLY?'],
  title: 'What would happen if cars could fly?',
  description: 'Traffic jams move to the sky. Parking is on the roof. The car wash is a rain cloud. And the birds are not happy about it. (A comedy what-if.)',
  tags: ['whatif', 'cars', 'funny', 'flying', 'future', 'shorts'],
  sources: [
    'Comedy what-if; no factual claims.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cars could fly?',
      show: ['ground', 'town', 'cr'], sky: '#9ED2F3', lightAt: [0, 14, 0], lightDist: 22,
      cam: { pos: [6, 13, 13], look: [0, 15.3, 0], fov: 46, to: { pos: [5.6, 13, 12.2], look: [.5, 15.3, 0], fov: 44 } },
      update: (w, p, t) => { fly(w, -1 + t * .8, 13 + .3 * Math.sin(t * 2), 0, -.6, t); },
    },
    {
      say: 'Traffic jams? Now they are in the sky.',
      show: ['ground', 'town', 'cr', 'cars'], sky: '#9ED2F3', lightAt: [0, 14, 0], lightDist: 26,
      cam: { pos: [10, 15, 18], look: [0, 14, 0], fov: 52, to: { pos: [9, 15, 17], look: [0, 14, 0], fov: 50 } },
      update: (w, p, t) => {
        fly(w, 0, 13, 0, 0, t); w.c.eyes.forEach(e => e.scale.set(1, .5, 1));
        w.cars.children.forEach(c => { const i = c.userData.i; c.position.set(-10 + (i % 3) * 6 + (i > 2 ? 3 : 0), 12 + (i > 2 ? 3.5 : -3) + .2 * Math.sin(t * 2 + i), -2 + (i % 2) * 3); c.rotation.set(0, 0, .03 * Math.sin(t * 3 + i)); });
      },
    },
    {
      say: 'Parking? Right on the roof.',
      show: ['ground', 'town', 'cr', 'roof'], sky: '#9ED2F3', lightAt: [0, 10, 0], lightDist: 22,
      cam: { pos: [9, 15, 15], look: [0, 11.6, 0], fov: 48, to: { pos: [8.5, 15, 14], look: [0, 11.6, 0], fov: 46 } },
      update: (w, p, t) => { const q = Math.min(1, t / 1.6); fly(w, -6 + q * 6, 10.25 + (1 - q) * 4, 0, -.5 + q * .5, t); },
    },
    {
      say: 'The car wash? Just one rain cloud.',
      show: ['ground', 'town', 'cr', 'cloud', 'rain'], sky: '#9AB0C4', lightAt: [0, 14, 0], lightDist: 22,
      cam: { pos: [6, 13, 12], look: [0, 14.4, 0], fov: 50, to: { pos: [5.5, 13, 11], look: [0, 14.4, 0], fov: 48 } },
      update: (w, p, t) => {
        fly(w, 0, 12.5, 0, -.5, t); w.c.eyes.forEach(e => e.scale.set(1, .3, 1)); w.c.body.rotation.z = .08 * Math.sin(t * 8);
        w.cloud.position.set(-.5, 19, 0); w.rain.children.forEach(d => { const i = d.userData.i, q = (t * 1.6 + i / 30) % 1; d.position.set(-3 + (i * 1.7) % 6, 18 - q * 6, -1 + (i * .7) % 2); });
      },
    },
    {
      say: 'But the birds? They are not happy.',
      show: ['ground', 'town', 'cr', 'bird'], sky: '#9ED2F3', lightAt: [0, 14, 0], lightDist: 22,
      cam: { pos: [4, 14, 13], look: [0, 14.6, 0], fov: 50, to: { pos: [3.6, 14, 12], look: [0, 14.6, 0], fov: 48 } },
      update: (w, p, t) => {
        fly(w, 2.5, 13, -1, Math.PI + .3, t); w.c.eyes.forEach(e => e.scale.set(1.3, 1.3, 1));
        w.bird.position.set(-2.5, 15 + .4 * Math.sin(t * 5), 1); w.bird.rotation.set(0, -.2, .1 * Math.sin(t * 7)); w.bird.scale.setScalar(1.3);
        w.bw.forEach((p, i) => p.rotation.x = (i ? 1 : -1) * .7 * Math.sin(t * 12));
      },
    },
    {
      say: 'Flying cars: amazing, terrifying, or both? Comment below.',
      quiz: { q: 'Would you ride in a flying car?', options: ['Amazing', 'Terrifying', 'Both'], answer: 'Flying car prototypes exist, but your family car stays on the road.' },
      show: ['ground', 'town', 'cr'], sky: '#274B73', lightAt: [0, 14, 0], lightDist: 22,
      cam: { pos: [7, 13, 8], look: [0, 14.2, 0], fov: 44, to: { pos: [-7, 13, 8], look: [0, 14.2, 0] } },
      update: (w, p, t) => { fly(w, 0, 13, 0, -.6, t); },
    },
  ],
};
