// Narrative 8: "Objects With Opinions". A made-up comedy sketch: umbrellas do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the umbrella with a face in the rain.

function umbrella(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const u = { root: group([0, 0, 0], parent) };
  cyl(.06, .06, 4, mat('#2A2A2A'), [0, 2, 0], u.root, 8);
  const hook = k.mesh(new k.THREE.TorusGeometry(.3, .06, 8, 16, Math.PI), mat('#2A2A2A'), [.3, 0, 0], u.root); hook.rotation.z = Math.PI;
  u.canopy = group([0, 4, 0], u.root);
  u.cone = cone(2.4, 1.2, mat('#8B5CF6', { double: true, rough: .5 }), [0, .3, 0], u.canopy, 8);
  ball(.12, mat('#2A2A2A'), [0, .95, 0], u.canopy);
  u.face = group([0, .25, 1.35], u.canopy);
  for (const x of [-.4, .4]) { ball(.2, mat('#FFFFFF'), [x, .15, 0], u.face); ball(.1, mat('#111111'), [x, .15, .13], u.face); }
  u.mouth = box(.45, .08, .05, mat('#3A1E5A'), [0, -.2, .02], u.face);
  return u;
}
function talk(u, t, on = true) { u.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function flip(u, f) { u.cone.scale.y = 1 - 2 * f; u.cone.position.y = .3 + f * .9; u.face.position.y = .25 + f * 1.1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#5A6070', 0);
  w.street = group();
  for (let i = 0; i < 5; i++) { const h = 8 + (i % 3) * 3; box(6, h, 5, mat(['#8A93A6', '#A0A8B8', '#7A8396'][i % 3]), [-12 + i * 6, h / 2, -8], w.street); }
  w.rain = group();
  for (let i = 0; i < 50; i++) { const r = box(.04, .8, .04, mat('#BFE8FF', { glow: .5 }), [0, 0, 0], w.rain); r.userData = { x: ((i * 37) % 24) - 12, z: ((i * 17) % 10) - 4, ph: (i * .13) % 1 }; r.castShadow = false; }
  w.u = umbrella(k, k.scene); w.um = w.u.root;
  w.train = group([0, 0, 60]);
  box(20, 10, .5, mat('#DCE3EA'), [0, 5, -3], w.train);
  for (let i = 0; i < 3; i++) box(3, 2, .1, mat('#5BC0EB', { glow: .3 }), [-6 + i * 6, 6, -2.7], w.train);
  box(16, 1.2, 2, mat('#2F6FD6'), [0, 1.8, -1.5], w.train); box(16, 2.4, .5, mat('#2F6FD6'), [0, 3, -2.4], w.train);
  w.home = group([0, 0, 120]);
  box(20, 12, .5, mat('#F2D9B8'), [0, 6, -3], w.home);
  w.lamp = ball(.6, mat('#FFE9A8', { glow: 2 }), [-3, 7, -2.5], w.home);
  w.cat = group([3, 0, 120.5]);
  const cb = ball(.8, mat('#2A2A2A'), [0, .7, 0], w.cat); cb.scale.set(1.3, .9, .9); ball(.55, mat('#2A2A2A'), [1, 1.3, 0], w.cat);
  for (const z of [-.25, .25]) { cone(.18, .35, mat('#2A2A2A'), [1, 1.85, z], w.cat, 4); ball(.09, mat('#FFD21F', { glow: 1 }), [1.45, 1.35, z * .9], w.cat); }
  return w;
}

export default {
  id: '133',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE UMBRELLA WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS UMBRELLA', 'HAS A COMPLAINT.'],
  title: 'This umbrella has a complaint',
  description: 'Flipped inside out by every gust. Forgotten on every train. So now he opens indoors on purpose. (A made-up talking umbrella.)',
  tags: ['objectswithopinions', 'funny', 'umbrella', 'rain', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking umbrellas are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This umbrella has a complaint.',
      show: ['ground', 'street', 'rain', 'um'], sky: '#6E7F95', lightAt: [0, 5, 3], lightDist: 14,
      cam: { pos: [1.5, 2.8, 12], look: [0, 6.6, 0], fov: 46, to: { pos: [1.4, 2.8, 11], look: [0, 6.5, 0], fov: 44 } },
      update: (w, p, t) => { w.um.position.set(0, 0, 0); w.um.rotation.set(0, 0, 0); flip(w.u, 0); talk(w.u, t, t > .2); w.rain.children.forEach(r => { const u = r.userData, f = (t * 1.4 + u.ph) % 1; r.position.set(u.x, 12 - f * 12, u.z); }); },
    },
    {
      say: 'Every gust of wind flips him inside out.',
      show: ['ground', 'street', 'rain', 'um'], sky: '#6E7F95', lightAt: [0, 5, 3], lightDist: 14,
      cam: { pos: [2, 4, 11], look: [0, 4.8, 0], fov: 46, to: { pos: [1.8, 4, 10], look: [0, 4.8, 0], fov: 44 } },
      shake: (t) => t > .7 ? .05 : 0,
      update: (w, p, t) => {
        const f = Math.min(1, Math.max(0, (t - .7) * 3)); flip(w.u, f); w.um.rotation.set(0, 0, -.2 * f + .1 * Math.sin(t * 9) * f); talk(w.u, t);
        w.rain.children.forEach(r => { const u = r.userData, q = (t * 1.4 + u.ph) % 1; r.position.set(u.x + q * 3, 12 - q * 12, u.z); r.rotation.z = -.4; });
      },
    },
    {
      say: 'And everyone forgets him on the train.',
      show: ['train', 'um'], sky: '#DCE3EA', lightAt: [0, 5, 62], lightDist: 14,
      cam: { pos: [2, 4.5, 70], look: [0, 3.4, 59], fov: 48, to: { pos: [1.8, 4.5, 69], look: [0, 3.4, 59], fov: 46 } },
      update: (w, p, t) => { flip(w.u, 0); w.um.position.set(-2.6, 2.3, 59); w.um.rotation.set(0, 0, -1.35); talk(w.u, t); w.u.canopy.scale.set(.6, .6, .6); },
    },
    {
      say: 'So now, he opens indoors. On purpose.',
      show: ['home', 'um', 'cat'], sky: '#F2D9B8', lightAt: [0, 5, 122], lightDist: 14,
      cam: { pos: [2, 4.5, 131], look: [.5, 4.4, 120], fov: 48, to: { pos: [1.8, 4.5, 130], look: [.5, 4.4, 120], fov: 46 } },
      update: (w, p, t) => {
        w.u.canopy.scale.setScalar(Math.min(1, .2 + t * 1.2)); flip(w.u, 0); w.um.position.set(-.5, 0, 120.5); w.um.rotation.set(0, 0, 0); talk(w.u, t, t < 1.6);
        w.cat.children.forEach(() => {}); w.cat.position.y = t > .8 ? .8 * Math.abs(Math.sin((t - .8) * 6)) : 0;
      },
    },
    {
      say: 'Umbrella: carry it, lose it, or a raincoat? Comment below.',
      quiz: { q: 'What do you do on a rainy day?', options: ['Carry an umbrella', 'Lose it', 'A raincoat'], answer: 'This umbrella is made up. He hopes you pick him.' },
      show: ['ground', 'street', 'rain', 'um'], sky: '#274B73', lightAt: [0, 5, 3], lightDist: 14,
      cam: { pos: [1.5, 1.6, 11], look: [0, 7, 0], fov: 46, to: { pos: [-1.5, 1.6, 11], look: [0, 7, 0] } },
      update: (w, p, t) => { w.u.canopy.scale.setScalar(1); w.um.position.set(0, 0, 0); w.um.rotation.set(0, 0, 0); flip(w.u, 0); talk(w.u, t, false); w.rain.children.forEach(r => { const u = r.userData, f = (t * 1.4 + u.ph) % 1; r.position.set(u.x, 12 - f * 12, u.z); r.rotation.z = 0; }); },
    },
  ],
};
