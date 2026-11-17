// Narrative 5: "What Would Happen If…". A made-up comedy sketch: dogs cannot drive, and nobody crashes.
// Hook rule: the premise as a question under 2 s, first frame already showing a dog at the wheel, ears flapping, tongue out.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group();
  box(400, .1, 12, mat('#4A4F5A'), [0, .05, 0], w.road).castShadow = false;
  w.dashes = group([0, 0, 0], w.road);
  for (let i = 0; i < 40; i++) box(3, .02, .35, mat('#FFFFFF'), [-80 + i * 6, .12, 0], w.dashes).castShadow = false;
  w.trees = group([0, 0, 0], w.road);
  for (let i = 0; i < 24; i++) { const x = -80 + i * 9, z = i % 2 ? -11 : -19; cyl(.5, .7, 3, mat('#6B4B2E'), [x, 1.5, z], w.trees, 8); ball(2.6, mat('#2E8B4A'), [x, 4.6, z], w.trees); }
  // the car: an open-top convertible so you can see the driver
  w.car = group([0, 0, 0]);
  box(9, 1.8, 4.4, mat('#E2453C', { metal: .3, rough: .35 }), [0, 1.6, 0], w.car);
  box(2.8, 1.2, 4.2, mat('#E2453C', { metal: .3, rough: .35 }), [3.2, 2.9, 0], w.car);
  const ws = box(.15, 1.6, 4, mat('#BFE6FF', { opacity: .35, rough: .05 }), [1.7, 3.3, 0], w.car); ws.rotation.z = .35; ws.castShadow = false;
  box(1.2, 1.4, 3.6, mat('#3A2A1E'), [-1.6, 2.9, 0], w.car);
  for (const z of [-1.4, 1.4]) box(.3, .4, .2, mat('#FFF6C9', { glow: 1.5 }), [4.55, 1.8, z * 1.1], w.car);
  w.wheels = [];
  for (const x of [-3, 3]) for (const z of [-2.3, 2.3]) { const wh = cyl(1, 1, .7, mat('#1E2430'), [x, 1, z], w.car, 20); wh.rotation.x = Math.PI / 2; w.wheels.push(wh); }
  w.wheel = group([.9, 3.4, .9], w.car); w.wheel.rotation.z = .5;
  const sw = k.torus(.6, .1, mat('#2A2A2A'), [0, 0, 0], w.wheel); sw.rotation.x = 0; sw.rotation.y = Math.PI / 2;
  // the driver
  w.dog = group([-.6, 2.6, .9], w.car);
  const fur = mat('#C98B4E', { rough: .9 }), ear = mat('#7A4E2A', { rough: .9 });
  const torso = ball(1.2, fur, [0, .9, 0], w.dog); torso.scale.set(.9, 1.2, .9);
  w.dhead = group([.3, 2.6, 0], w.dog);
  ball(1, fur, [0, 0, 0], w.dhead);
  const snout = ball(.55, mat('#E0B07A'), [.85, -.25, 0], w.dhead); snout.scale.set(1.2, .8, .9);
  ball(.2, mat('#111111'), [1.45, -.1, 0], w.dhead);
  for (const z of [-.38, .38]) ball(.13, mat('#111111'), [.75, .3, z], w.dhead);
  w.tongue = box(.15, .7, .35, mat('#FF7A99'), [1.1, -.8, .15], w.dhead);
  w.ears = [-1, 1].map(s => { const g = group([-.1, .6, s * .75], w.dhead); box(.25, 1.3, .6, ear, [0, -.6, s * .15], g); return g; });
  w.paws = [-.35, .35].map(z => ball(.32, mat('#E0B07A'), [1.3, .9, z], w.dog));
  w.tailg = group([-1, .6, 0], w.dog); const tl = cyl(.15, .2, 1.4, fur, [0, .7, 0], w.tailg, 8); tl.castShadow = false;
  // the squirrel
  w.squirrel = group([0, 0, 0]);
  const sb = ball(.6, mat('#9C5A2E'), [0, .6, 0], w.squirrel); sb.scale.set(1, 1.2, .9);
  ball(.38, mat('#9C5A2E'), [.5, 1.3, 0], w.squirrel);
  for (const z of [-.15, .15]) ball(.07, mat('#111111'), [.82, 1.4, z], w.squirrel);
  const st = ball(.7, mat('#B5733E'), [-.7, 1.4, 0], w.squirrel); st.scale.set(.6, 1.4, .6);
  // the park
  w.park = group([0, 0, 40]);
  for (let i = 0; i < 14; i++) { box(.3, 2.4, .3, mat('#FFFFFF'), [-26 + i * 4, 1.2, -9], w.park); }
  box(54, .25, .2, mat('#FFFFFF'), [0, 2.2, -9], w.park); box(54, .25, .2, mat('#FFFFFF'), [0, 1.2, -9], w.park);
  w.hydrant = group([-6, 0, -5], w.park);
  cyl(.6, .7, 2, mat('#E2453C'), [0, 1, 0], w.hydrant, 14); ball(.6, mat('#E2453C'), [0, 2, 0], w.hydrant);
  w.balls = group([0, 0, 0], w.park);
  for (let i = 0; i < 9; i++) { const b = ball(.45, mat('#C8E63C', { rough: .7 }), [0, 0, 0], w.balls); b.userData = { x: -10 + i * 3, z: -3 - (i % 3) * 1.5, ph: i * .37 }; }
  for (let i = 0; i < 5; i++) { cyl(.5, .7, 3, mat('#6B4B2E'), [-20 + i * 10, 1.5, -14], w.park, 8); ball(2.8, mat('#2E8B4A'), [-20 + i * 10, 4.8, -14], w.park); }
  return w;
}

function drive(w, t, o = {}) {
  const sp = o.speed ?? 16;
  w.dashes.position.x = -((t * sp) % 6); w.trees.position.x = -((t * sp) % 18);
  w.wheels.forEach(wh => { wh.rotation.y = -t * sp; });
  w.car.position.set(0, .05 * Math.sin(t * 13), 0); w.car.rotation.set(0, o.yaw ?? 0, 0);
  w.ears.forEach((e, i) => { e.rotation.z = (o.flap ?? 1) * (1.2 + .5 * Math.sin(t * 22 + i)); });
  w.tongue.rotation.z = .4 * Math.sin(t * 18);
  w.tailg.rotation.x = .9 * Math.sin(t * 16);
  w.dog.position.set(-.6, 2.6, .9); w.dog.rotation.set(0, 0, 0); w.dhead.position.set(.3, 2.6, 0); w.dhead.rotation.set(0, 0, 0);
  w.paws.forEach((p, i) => { p.position.set(1.3, .9, i ? .35 : -.35); p.visible = true; });
  w.wheel.children[0].rotation.x = o.spin ? t * 9 : .3 * Math.sin(t * 2);
  w.squirrel.visible = false;
}
const ROAD = ['ground', 'road', 'car'];

export default {
  id: '067',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DOG WHO DRIVES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'COULD DRIVE?'],
  title: 'What would happen if dogs could drive?',
  description: 'Great reflexes. Excellent mood. Terrible sense of direction (every road leads to the park). (A made-up dog driver.)',
  tags: ['whatif', 'funny', 'dog', 'driving', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the driving dog is made up. Nobody crashes.',
  ],
  setup,
  scenes: [
    {
      say: 'What if dogs could drive?',
      show: ROAD, sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [16, 4, 20], look: [0, 7.5, 0], fov: 48, to: { pos: [14, 4, 17], look: [0, 7.5, 0], fov: 46 } },
      update: (w, p, t) => drive(w, t),
    },
    {
      say: 'One squirrel? Instant U-turn.',
      show: [...ROAD, 'squirrel'], sky: '#A7D8F5', lightAt: [0, 3, 0], lightDist: 24,
      cam: { pos: [2, 22, 24], look: [0, 2, 0], fov: 50, to: { pos: [2, 20, 21], look: [0, 2, 0], fov: 48 } },
      update: (w, p, t, k) => {
        drive(w, t, { speed: Math.max(0, 16 - t * 8), spin: true });
        const turn = k.h.ease(Math.min(1, Math.max(0, (t - .5) / .9)));
        w.car.rotation.y = turn * Math.PI; w.car.position.set(-2 * Math.sin(turn * Math.PI), 0, 3 * Math.sin(turn * Math.PI));
        w.dhead.rotation.y = t < .5 ? .8 : 0;
        w.squirrel.visible = true; w.squirrel.position.set(6 - t * 3, 0, 8); w.squirrel.rotation.y = Math.PI;
      },
    },
    {
      say: 'Every trip ends at the park.',
      show: ['ground', 'park', 'car'], sky: '#BFE6FF', lightAt: [0, 3, 38], lightDist: 25,
      cam: { pos: [10, 6, 58], look: [0, 4, 36], fov: 50, to: { pos: [9, 6, 54], look: [0, 4, 36], fov: 48 } },
      update: (w, p, t) => {
        drive(w, t, { speed: 0, flap: .4 }); w.car.position.set(0, 0, 38); w.car.rotation.y = .3;
        w.dog.position.y = 2.6 + .5 * Math.abs(Math.sin(t * 8)); w.tailg.rotation.x = 1.2 * Math.sin(t * 24);
        w.balls.children.forEach(b => { const u = b.userData, f = (t * .8 + u.ph) % 1; b.position.set(u.x, .45 + 3 * Math.sin(f * Math.PI), u.z); });
      },
    },
    {
      say: 'And the head still hangs out the side.',
      show: ROAD, sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [8, 4, 13], look: [-.4, 3.8, 3], fov: 46, to: { pos: [7, 4, 11.5], look: [-.4, 3.8, 3], fov: 44 } },
      update: (w, p, t) => {
        drive(w, t, { flap: 1.6, spin: true });
        w.dog.position.set(-.6, 2.4, 1.2); w.dog.rotation.x = 1;
        w.dhead.position.set(.2, 2.6, .3); w.dhead.rotation.set(-.6, -.2, 0);
        w.paws.forEach((pw, i) => { pw.position.set(.4, 1.4, 1.2 + i * .5); });
      },
    },
    {
      say: 'Ride with him: yes, no, or only to the park? Comment below.',
      quiz: { q: 'Would you ride with a dog driver?', options: ['Yes', 'No', 'Only to the park'], answer: 'It is a made-up dog driver, so every ride ends at the park anyway.' },
      show: ROAD, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [16, 3, 18], look: [0, 11, 0], fov: 48, to: { pos: [-14, 3, 18], look: [0, 11, 0] } },
      update: (w, p, t) => drive(w, t),
    },
  ],
};
