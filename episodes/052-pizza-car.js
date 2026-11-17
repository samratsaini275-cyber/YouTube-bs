// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: no car runs on pizza.
// Hook rule: the first line lands in under 2 s and the first frame is already mid-joke.

function slice(k, parent, pos) {
  const g = k.group(pos, parent);
  const tri = new k.THREE.Shape(); tri.moveTo(0, 0); tri.lineTo(1.6, .7); tri.lineTo(1.6, -.7); tri.lineTo(0, 0);
  const crust = k.mesh(new k.THREE.ExtrudeGeometry(tri, { depth: .25, bevelEnabled: false }), k.mat('#F2C46B', { rough: .8 }), [0, 0, 0], g);
  crust.rotation.x = -Math.PI / 2;
  for (const [x, z] of [[.8, .15], [1.2, -.3], [1.3, .35]]) k.cyl(.16, .16, .08, k.mat('#C0392B'), [x, .3, z], g, 12);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.road = k.ground('#5C636E', 0);
  w.street = group();
  box(10, .3, 400, mat('#C9CED6'), [-12, .15, 0], w.street); box(10, .3, 400, mat('#C9CED6'), [12, .15, 0], w.street);
  for (let i = -20; i <= 20; i++) box(.4, .05, 3, mat('#F4F1EA', { glow: .2 }), [0, .03, i * 8], w.street).castShadow = false;
  for (let i = 0; i < 12; i++) { const h = 8 + (i * 5) % 8; box(9, h, 9, mat(['#F2B5A0', '#A8D5BA', '#F7E3A1', '#B9C6F0'][i % 4]), [i % 2 ? 22 : -22, h / 2, -80 + i * 14], w.street); }
  w.wall = box(30, 10, 2, mat('#E2453C'), [0, 5, -90], w.street);   // the end of the street
  // the car, with a hood that opens like a mouth
  w.car = group([0, 0, 0]);
  box(5, 2, 9, mat('#2F6FD6', { metal: .3, rough: .35 }), [0, 1.8, 0], w.car);
  box(4.4, 1.8, 4.4, mat('#9FD3F5', { opacity: .7 }), [0, 3.7, .4], w.car);
  for (const [x, z] of [[-2.5, 3], [2.5, 3], [-2.5, -3], [2.5, -3]]) { const t = cyl(1, 1, .7, mat('#1B1D22'), [x, 1, z], w.car, 16); t.rotation.z = Math.PI / 2; }
  w.hood = group([0, 2.8, -2.2], w.car); box(4.8, .3, 2.4, mat('#2F6FD6', { metal: .3 }), [0, 0, -1.2], w.hood);
  box(3.6, .6, .2, mat('#111111'), [0, 1.9, -4.55], w.car);
  for (const x of [-1.6, 1.6]) ball(.45, mat('#FFF6C9', { glow: 1.5 }), [x, 2.2, -4.5], w.car);
  w.smoke = group([0, 1.4, 4.8], w.car);
  for (let i = 0; i < 5; i++) { const s = ball(.5, mat('#E9E9E9', { opacity: .7 }), [0, 0, 0], w.smoke); s.castShadow = false; s.userData.i = i; }
  // flying slices
  w.flying = slice(k, k.scene, [0, 6, -10]); w.flying.scale.setScalar(2.6);
  // the engineer and an empty pizza box
  w.guy = group([7, 0, 0]);
  cyl(1.1, 1.3, 5, mat('#F2F2F2'), [0, 2.5, 0], w.guy, 18); ball(1.1, mat('#F2C9A0'), [0, 6.1, 0], w.guy);
  for (const x of [-.4, .4]) ball(.13, mat('#111111'), [x, 6.3, 1], w.guy);
  w.mouth = box(.6, .2, .1, mat('#111111'), [0, 5.7, 1.05], w.guy);
  w.handSlice = slice(k, w.guy, [.6, 5, 1.4]); w.handSlice.rotation.set(.3, -Math.PI / 2, 0);
  w.box = group([4, .3, 3]); box(5, .3, 5, mat('#E8D9B0'), [0, 0, 0], w.box); box(5, 2.5, .2, mat('#E8D9B0'), [0, 1.3, -2.5], w.box);
  return w;
}

function puff(w, t, on) { w.smoke.visible = on; w.smoke.children.forEach(s => { const p = (t * 1.5 + s.userData.i / 5) % 1; s.position.set(Math.sin(s.userData.i) * .5, p * 2, p * 3); s.scale.setScalar(.5 + p); }); }
const ALL = ['road', 'street', 'car'];

export default {
  id: '052',
  style: '3d',
  voice: 'v3',
  case: 'THE PIZZA CAR',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS CAR', 'RUNS ON PIZZA.'],
  title: 'Engineers built a car that runs on pizza',
  description: 'Clean energy. Delicious energy. One problem: the engineer keeps getting hungry. (A made-up car.)',
  tags: ['engineering', 'funny', 'badideas', 'pizza', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the pizza-powered car and its range are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This car runs on pizza.',
      show: [...ALL, 'flying'], sky: '#9ED2F3', lightAt: [0, 3, -3], lightDist: 20,
      cam: { pos: [10, 8, -22], look: [0, 7.5, -5], fov: 48, to: { pos: [9, 7.5, -19], look: [0, 7.5, -5], fov: 46 } },
      update: (w, p, t) => { w.car.position.z = 0; w.hood.rotation.x = .9; const f = Math.min(1, t / 1.3); w.flying.visible = f < 1; w.flying.position.set(4 - f * 4, 7 - f * 3.8, -11 + f * 7); w.flying.rotation.y = t * 5; puff(w, t, t > 1.2); },
    },
    {
      say: 'One slice gets you ten metres.',
      show: ALL, sky: '#A7D8F5', lightAt: [0, 3, -6], lightDist: 30,
      cam: { pos: [18, 9, 8], look: [0, 2, -6], fov: 46, to: { pos: [17, 8, 2], look: [0, 2, -10], fov: 46 } },
      shake: (t) => t > 1.6 ? .15 : 0,
      update: (w, p, t, k) => { w.hood.rotation.x = 0; w.car.position.z = -k.h.ease(Math.min(1, t / 1.6)) * 10; puff(w, t, t < 1.6); w.car.rotation.x = t > 1.6 ? .02 * Math.sin(t * 30) : 0; },
    },
    {
      say: 'A whole pizza? The end of the street.',
      show: ALL, sky: '#FFE3C2', lightAt: [0, 3, -60], lightDist: 50,
      cam: { pos: [12, 12, -30], look: [0, 3, -70], fov: 46, to: { pos: [10, 10, -50], look: [0, 3, -82], fov: 46 } },
      update: (w, p, t) => { w.car.position.z = -40 - Math.min(t * 18, 44); puff(w, t, true); },
    },
    {
      say: 'Sadly, the engineer keeps eating the fuel.',
      show: [...ALL, 'guy', 'box'], sky: '#9ED2F3', lightAt: [6, 3, 1], lightDist: 20,
      cam: { pos: [12, 8, 16], look: [5, 4, 1], fov: 42, to: { pos: [10, 7.5, 12], look: [6, 4.5, 1], fov: 40 } },
      update: (w, p, t) => { w.car.position.z = 0; w.hood.rotation.x = .9; puff(w, t, false); w.mouth.scale.y = 1 + 2 * Math.abs(Math.sin(t * 7)); w.handSlice.scale.setScalar(Math.max(.05, 2 - t * .6)); },
    },
    {
      say: 'Quick question. What should it run on next? Tacos? Doughnuts? Or broccoli? Comment your answer.',
      quiz: { q: 'What should the car run on next?', options: ['Tacos', 'Doughnuts', 'Broccoli'], answer: 'It is a made-up car, so pick any. (Broccoli is safe: nobody will eat the fuel.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 30,
      cam: { pos: [12, 5, 18], look: [0, 9, 0], fov: 46, to: { pos: [-12, 5, 18], look: [0, 9, 0] } },
      update: (w, p, t) => { w.car.position.z = 0; w.hood.rotation.x = .5 + .4 * Math.sin(t * 3); puff(w, t, true); },
    },
  ],
};
