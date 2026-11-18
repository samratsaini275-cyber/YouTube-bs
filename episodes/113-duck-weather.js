// Narrative 7: "Animals at Work". A made-up comedy sketch: ducks do not present the weather.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the duck in a tie in front of a weather map.

function duck(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(1.1, mat('#FFE45C', { rough: .6 }), [0, 1.4, 0], d.body); b.scale.set(1.15, .95, 1);
  d.head = group([.2, 2.8, 0], d.body);
  ball(.7, mat('#FFE45C', { rough: .6 }), [0, 0, 0], d.head);
  const bill = ball(.4, mat('#FF8A1F'), [.15, -.15, .65], d.head); bill.scale.set(1, .35, 1);
  for (const x of [-.28, .28]) { ball(.13, mat('#FFFFFF'), [x, .18, .55], d.head); ball(.07, mat('#111111'), [x, .18, .65], d.head); }
  box(.25, .8, .05, mat('#2F6FD6'), [0, 1.8, 1.02], d.body);
  box(.4, .25, .06, mat('#2F6FD6'), [0, 2.2, 1], d.body);
  d.wings = [-1, 1].map(s => { const g = group([s * 1.05, 1.6, 0], d.body); const w = ball(.5, mat('#F2D24A'), [0, -.2, 0], g); w.scale.set(.3, .9, .8); return g; });
  for (const x of [-.4, .4]) box(.5, .1, .7, mat('#FF8A1F'), [x, .05, .3], d.root);
  d.umb = group([-1.3, 2.2, 0], d.body);
  cyl(.04, .04, 2.4, mat('#5A3A1E'), [0, 1.2, 0], d.umb, 6);
  cone(1.4, .6, mat('#E2453C', { double: true }), [0, 2.6, 0], d.umb, 10);
  return d;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#2A2F3A', 0);
  w.studio = group();
  box(40, 30, .5, mat('#1E2430'), [0, 15, -8], w.studio);
  w.map = group([0, 6, -7.6], w.studio);
  box(14, 8, .1, mat('#3FA7D6'), [0, 0, 0], w.map);
  const land = box(8, 5, .12, mat('#7FB069'), [-1, -.3, .02], w.map); land.rotation.z = .2;
  box(4, 3, .12, mat('#7FB069'), [4.5, 1.5, .02], w.map);
  w.icons = [];
  for (let i = 0; i < 6; i++) { const ic = group([-5 + (i % 3) * 4.5, 2 - Math.floor(i / 3) * 4, .2], w.map); const c1 = ball(.7, mat('#9AA3AE'), [0, 0, 0], ic); c1.scale.set(1.4, .8, .3); ball(.5, mat('#9AA3AE'), [.6, .2, 0], ic).scale.set(1.2, .8, .3); for (let j = 0; j < 3; j++) box(.08, .5, .05, mat('#5BC0EB', { glow: .8 }), [-.4 + j * .4, -.8, 0], ic); w.icons.push(ic); }
  w.d = duck(k, k.scene); w.dk = w.d.root;
  // outside
  w.outside = group([0, 0, 60]);
  box(60, .05, 60, mat('#7FB069'), [0, .03, 0], w.outside).castShadow = false;
  w.sun = ball(1.6, mat('#FFD21F', { glow: 2.5 }), [-2.5, 9.5, -12], w.outside); w.sun.castShadow = false;
  w.puddle = cyl(2.4, 2.4, .06, mat('#5BA8D9', { rough: .05, metal: .3 }), [2.5, .06, 60], k.scene, 32); w.puddle.castShadow = false;
  w.splash = group();
  for (let i = 0; i < 14; i++) { const s = ball(.18, mat('#BFE8FF', { glow: .6 }), [0, 0, 0], w.splash); s.userData = { a: i * .45, ph: (i * .17) % 1 }; s.castShadow = false; }
  return w;
}

export default {
  id: '113',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DUCK WEATHER REPORTER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS DUCK', 'DOES THE WEATHER.'],
  title: 'This duck does the weather',
  description: 'Every forecast is rain. It is sunny. He says rain anyway. Then he finds a puddle. (A made-up duck.)',
  tags: ['animalsatwork', 'funny', 'duck', 'weather', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the duck weather reporter is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This duck does the weather.',
      show: ['ground', 'studio', 'dk'], sky: '#1E2430', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [2.5, 3, 13], look: [.8, 5.8, 0], fov: 48, to: { pos: [2.3, 3, 12], look: [.8, 5.7, 0], fov: 46 } },
      update: (w, p, t) => { w.d.umb.visible = false; w.dk.position.set(1.4, 0, 0); w.dk.rotation.y = -.3; w.d.wings[0].rotation.z = .8 + .3 * Math.sin(t * 3); w.d.head.rotation.y = .2 * Math.sin(t * 2); },
    },
    {
      say: 'Every forecast? Rain.',
      show: ['ground', 'studio', 'dk'], sky: '#1E2430', lightAt: [0, 6, 0], lightDist: 16,
      cam: { pos: [1.8, 5.5, 15], look: [1.8, 5.2, -6], fov: 52, to: { pos: [1.8, 5.5, 14], look: [1.8, 5.2, -6], fov: 50 } },
      update: (w, p, t) => { w.d.umb.visible = false; w.dk.position.set(4.6, 0, -3); w.dk.rotation.y = -.6; w.d.wings[0].rotation.z = 1.4; w.icons.forEach((ic, i) => { ic.visible = t > i * .2; ic.scale.setScalar(Math.min(1, Math.max(0, (t - i * .2) * 4))); }); },
    },
    {
      say: 'It is sunny outside. He says rain anyway.',
      show: ['outside', 'dk'], sky: '#9ED2F3', lightAt: [0, 5, 60], lightDist: 16,
      cam: { pos: [3, 3.2, 70], look: [0, 4.6, 60], fov: 48, to: { pos: [2.8, 3.2, 69], look: [0, 4.5, 60], fov: 46 } },
      update: (w, p, t) => { w.d.umb.visible = true; w.dk.position.set(0, 0, 60); w.dk.rotation.y = .2; w.d.wings[0].rotation.z = 0; w.d.head.rotation.y = .3 * Math.sin(t * 4); },
    },
    {
      say: 'Then he finds one puddle. Best day ever.',
      show: ['outside', 'dk', 'puddle', 'splash'], sky: '#9ED2F3', lightAt: [2, 5, 60], lightDist: 16,
      cam: { pos: [5, 4, 70], look: [2, 2.6, 60], fov: 48, to: { pos: [4.6, 4, 69], look: [2, 2.6, 60], fov: 46 } },
      update: (w, p, t) => {
        w.d.umb.visible = false; const j = Math.max(0, t - .5), f = Math.min(1, j * 1.6); w.dk.position.set(-1 + f * 3.5, Math.max(0, 3 * Math.sin(f * Math.PI)), 60); w.dk.rotation.y = .6;
        w.d.wings.forEach((g, i) => { g.rotation.z = (i ? -1 : 1) * (1 + .5 * Math.sin(t * 14)); });
        w.splash.children.forEach(s => { const u = s.userData, q = Math.max(0, j - .6) * 1.5; s.visible = q > 0 && q < 1.4; s.position.set(2.5 + Math.cos(u.a) * q * 2.5, .2 + q * 3 * (1 + u.ph) - q * q * 3.5, 60 + Math.sin(u.a) * q * 2.5); });
      },
    },
    {
      say: 'Trust the duck: yes, no, or only on Tuesdays? Comment below.',
      quiz: { q: 'Would you trust the duck\'s forecast?', options: ['Yes', 'No', 'Only on Tuesdays'], answer: 'He is a made-up forecaster. Bring an umbrella just in case.' },
      show: ['ground', 'studio', 'dk'], sky: '#274B73', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [2.5, 1.6, 12], look: [1, 7.4, 0], fov: 48, to: { pos: [-2, 1.6, 12], look: [1, 7.4, 0] } },
      update: (w, p, t) => { w.d.wings.forEach(g => { g.rotation.z = 0; }); w.d.umb.visible = false; w.icons.forEach(ic => { ic.visible = true; ic.scale.setScalar(1); }); w.dk.position.set(1.4, 0, 0); w.dk.rotation.y = -.3; w.d.head.rotation.y = .2 * Math.sin(t * 2); },
    },
  ],
};
