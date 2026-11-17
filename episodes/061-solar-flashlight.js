// Angle D (fake advert). Narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: this product does not exist.
// Hook rule: first line under 2 s, first frame already mid-joke (a flashlight with a solar panel spinning like a product shot in full sun).

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#6FAF5A', 0);
  w.sun = ball(5, mat('#FFE45C', { glow: 3 }), [18, 46, -40]); w.sun.castShadow = false;
  w.rays = group([18, 46, -40]);
  for (let i = 0; i < 10; i++) { const r = box(.5, 9, .5, mat('#FFE45C', { glow: 2 }), [0, 0, 0], w.rays); r.castShadow = false; r.rotation.z = i * Math.PI / 5; r.translateY(9); }
  // the product on a little podium
  w.podium = cyl(3.4, 3.8, 2, mat('#F4F6F8'), [0, 1, 0], k.scene, 32);
  w.torch = group([0, 5, 0]);
  const body = cyl(.9, .9, 6, mat('#2F6FD6', { metal: .4, rough: .3 }), [0, 0, 0], w.torch, 20); body.rotation.z = Math.PI / 2;
  const headc = cyl(1.5, .9, 1.6, mat('#C9CED6', { metal: .8 }), [3.6, 0, 0], w.torch, 20); headc.rotation.z = -Math.PI / 2;
  w.lens = cyl(1.4, 1.4, .1, mat('#FFF6C9', { glow: 1 }), [4.45, 0, 0], w.torch, 20); w.lens.rotation.z = Math.PI / 2;
  w.panel = group([0, 1.5, 0], w.torch);
  box(4.4, .15, 2.6, mat('#12233F', { metal: .6, rough: .2 }), [0, 0, 0], w.panel);
  for (let i = 0; i < 3; i++) box(.06, .17, 2.6, mat('#9FB8D9'), [-1.1 + i * 1.1, 0, 0], w.panel);
  box(.2, .9, .2, mat('#C9CED6'), [0, -.6, 0], w.panel);
  w.beam = cone(4, 16, mat('#FFF4B0', { glow: 1.4, opacity: .28, double: true }), [12.4, 0, 0], w.torch, 24); w.beam.rotation.z = Math.PI / 2; w.beam.castShadow = false;
  // the "night mode" upgrade: a candle taped on top
  w.candle = group([-1.6, 1.9, 0], w.torch);
  cyl(.35, .35, 2, mat('#FBF8EF'), [0, 1, 0], w.candle, 14);
  w.flame = cone(.3, .9, mat('#FF9A1F', { glow: 3 }), [0, 2.5, 0], w.candle, 10); w.flame.castShadow = false;
  box(1.1, .35, 2, mat('#C9CED6', { rough: 1 }), [0, .3, 0], w.candle);
  // stars for the night scenes
  w.stars = group();
  for (let i = 0; i < 40; i++) { const s = ball(.25, mat('#FFFFFF', { glow: 3 }), [((i * 37) % 80) - 40, 20 + (i * 13) % 30, -50 + (i % 5)], w.stars); s.castShadow = false; }
  w.dark = k.mesh(new k.THREE.PlaneGeometry(300, 300), mat('#03050C', { opacity: .8 }), [0, 10, 9]); w.dark.castShadow = w.dark.receiveShadow = false;
  w.price = group([3.6, 10.2, 2]);
  const star = cyl(2.2, 2.2, .2, mat('#E0161E', { glow: .5 }), [0, 0, 0], w.price, 10); star.rotation.x = Math.PI / 2;
  cyl(1.5, 1.5, .25, mat('#FFD21F', { glow: .4 }), [0, 0, .05], w.price, 24).rotation.x = Math.PI / 2;
  return w;
}

function show(w, t, o = {}) {
  w.torch.rotation.y = o.spin ? t * 1.2 : (o.yaw ?? .4);
  w.torch.position.y = 5 + .25 * Math.sin(t * 2);
  w.beam.visible = !!o.beam; w.candle.visible = !!o.candle; w.flame.scale.y = 1 + .25 * Math.sin(t * 17);
  w.rays.rotation.z = t * .4;
}
const DAY = ['ground', 'sun', 'rays', 'podium', 'torch'];
const NIGHT = ['ground', 'podium', 'torch', 'stars', 'dark'];

export default {
  id: '061',
  style: '3d',
  voice: 'v3',
  case: 'THE SOLAR FLASHLIGHT',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['INTRODUCING THE', 'SOLAR FLASHLIGHT.'],
  title: 'Introducing the solar flashlight',
  description: 'No batteries. No charging. One very small catch. (A made-up product. It is not for sale.)',
  tags: ['funny', 'badideas', 'fakead', 'flashlight', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: a spoof advert. The solar flashlight and its night mode are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Introducing the solar flashlight.',
      show: DAY, sky: '#8EC9F0', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [8, 5, 18], look: [0, 9.5, 0], fov: 48, to: { pos: [6, 5, 14], look: [0, 9, 0], fov: 46 } },
      update: (w, p, t) => show(w, t, { spin: true, beam: true }),
    },
    {
      say: 'No batteries. Ever.',
      show: DAY, sky: '#A7D8F5', lightAt: [0, 6, 0], lightDist: 15,
      cam: { pos: [-5, 10, 9], look: [0, 6.2, 0], fov: 42, to: { pos: [-4, 9.5, 7], look: [0, 6.4, 0], fov: 40 } },
      update: (w, p, t) => show(w, t, { yaw: .6, beam: true }),
    },
    {
      say: 'It works anywhere the sun is shining.',
      show: DAY, sky: '#8EC9F0', lightAt: [4, 6, 0], lightDist: 40,
      cam: { pos: [-14, 9, 26], look: [6, 9, -4], fov: 50, to: { pos: [-12, 9, 22], look: [8, 11, -6], fov: 50 } },
      update: (w, p, t) => show(w, t, { yaw: .2, beam: true }),
    },
    {
      say: 'Please do not use it at night.',
      show: NIGHT, sky: '#060A18', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [7, 7, 16], look: [0, 6, 0], fov: 44, to: { pos: [6, 6.5, 13], look: [0, 6, 0], fov: 42 } },
      update: (w, p, t) => show(w, t, { yaw: .4 }),
    },
    {
      say: 'New night mode: a candle, taped on top.',
      show: ['ground', 'podium', 'torch', 'stars'], sky: '#0B1020', lightAt: [0, 6, 0], lightDist: 14,
      cam: { pos: [-6, 9, 10], look: [-1, 7, 0], fov: 42, to: { pos: [-4.5, 8.6, 7.5], look: [-1.4, 7.4, 0], fov: 38 } },
      update: (w, p, t) => show(w, t, { yaw: .3, candle: true }),
    },
    {
      say: 'Would you buy one: yes, no, or only at noon? Comment below.',
      quiz: { q: 'Would you buy a solar flashlight?', options: ['Yes', 'No', 'Only at noon'], answer: 'It is a made-up product, so it is not for sale at any hour.' },
      show: DAY, sky: '#274B73', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [10, 3, 18], look: [0, 12, 0], fov: 46, to: { pos: [-10, 3, 18], look: [0, 12, 0] } },
      update: (w, p, t) => show(w, t, { spin: true, beam: true, candle: true }),
    },
  ],
};
