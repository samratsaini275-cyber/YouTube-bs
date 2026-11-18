// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his gym session are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary next to a giant dumbbell.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#3A3F4A', 0);
  w.gym = group();
  box(60, 24, .5, mat('#2F4F7F'), [0, 12, -10], w.gym);
  for (let i = 0; i < 8; i++) box(.4, 24, .1, mat('#FFD21F'), [-21 + i * 6, 12, -9.7], w.gym).castShadow = false;
  box(30, .1, 14, mat('#1E2430'), [0, .05, -2], w.gym).castShadow = false;
  // dumbbell (huge to Gary)
  w.bell = group([4, 0, -2], w.gym);
  const bar = cyl(.4, .4, 9, mat('#C9CED6', { metal: .9, rough: .2 }), [0, 2.2, 0], w.bell, 14); bar.rotation.x = Math.PI / 2;
  for (const z of [-3.6, 3.6]) { const p = cyl(2.2, 2.2, 1.4, mat('#2A2A2A'), [0, 2.2, z], w.bell, 24); p.rotation.x = Math.PI / 2; }
  w.g = gary(k, k.scene, 2);
  w.crumb = ball(.35, mat('#D9A35E', { rough: 1 }), [0, 0, 0]); w.crumb.scale.set(1.2, .8, 1);
  w.sweat = group();
  for (let i = 0; i < 3; i++) { const d = ball(.12, mat('#5BC0EB', { glow: .8 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  // treadmill
  w.tread = group([0, 0, 60]);
  box(6, 1, 14, mat('#2A2A2A'), [0, .5, 0], w.tread);
  w.beltStripes = group([0, 1.02, 0], w.tread);
  for (let i = 0; i < 12; i++) box(5.4, .02, .2, mat('#4A4A4A'), [0, 0, -6.6 + i * 1.2], w.beltStripes).castShadow = false;
  for (const x of [-3, 3]) box(.4, 7, .4, mat('#9AA3AE'), [x, 4, -6.5], w.tread);
  box(6.4, 1.6, 1.2, mat('#1E2430'), [0, 7.5, -6.6], w.tread);
  w.speed = box(2, .6, .05, mat('#E0161E', { glow: 2 }), [0, 7.6, -5.95], w.tread);
  w.clock = group([-5, 12, 52]);
  const cf = cyl(1.6, 1.6, .3, mat('#FFFFFF'), [0, 0, 0], w.clock, 28); cf.rotation.x = Math.PI / 2;
  w.hand = group([0, 0, .2], w.clock); box(.15, 1.3, .05, mat('#111111'), [0, .6, 0], w.hand);
  // the selfie
  w.phone = group([0, 0, 120]);
  box(5, 9, .4, mat('#1E2430'), [0, 4.5, 0], w.phone);
  w.pscreen = box(4.4, 8, .05, mat('#BFD8EE', { glow: .4 }), [0, 4.5, .23], w.phone);
  box(4.4, 1.6, .06, mat('#2F4F7F', { glow: .3 }), [0, 2, .24], w.phone);
  box(1.6, 3, .06, mat('#9AA3AE'), [0, 4.6, .25], w.phone);
  w.dot = ball(.05, mat('#141414'), [1.4, 3.1, .3], w.phone);
  w.flash = box(30, 30, .1, mat('#FFFFFF', { opacity: 0 }), [0, 6, 125]); w.flash.castShadow = false;
  return w;
}

const GYM = ['ground', 'gym', 'g'];

export default {
  id: '089',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO THE GYM',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE GYM.'],
  title: 'Gary the ant went to the gym',
  description: 'The dumbbell wins. The treadmill wins. The gym selfie... also wins. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'gym', 'workout', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his gym session are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to the gym.',
      show: GYM, sky: '#2F4F7F', lightAt: [2, 4, 0], lightDist: 16,
      cam: { pos: [-1, 3, 14], look: [2.5, 4.4, -2], fov: 50, to: { pos: [-1, 3, 12.5], look: [2.5, 4.4, -2], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-.5, .1, 1); w.g.rotation.y = .1; scurry(w.g, t, 10); },
    },
    {
      say: 'The dumbbell does not move.',
      show: [...GYM, 'sweat'], sky: '#2F4F7F', lightAt: [3, 3, -2], lightDist: 12,
      cam: { pos: [-1.5, 3, 7], look: [2.5, 2, -2], fov: 46, to: { pos: [-1.2, 3, 6], look: [2.5, 2, -2], fov: 44 } },
      shake: () => .03,
      update: (w, p, t) => {
        w.g.position.set(2.2, .1, -2); w.g.rotation.set(0, 0, -.5 + .1 * Math.sin(t * 20)); scurry(w.g, t, 45);
        w.sweat.children.forEach(d => { const f = (t * 1.5 + d.userData.i / 3) % 1; d.position.set(1.6 - f * .6, 1.8 + f * .6 - f * f * 1.6, -2 + (d.userData.i - 1) * .3); });
      },
    },
    {
      say: 'So he lifts a crumb. Fifty reps.',
      show: [...GYM, 'crumb'], sky: '#2F4F7F', lightAt: [0, 3, 1], lightDist: 10,
      cam: { pos: [2.5, 2, 6], look: [0, 1.4, 1], fov: 44, to: { pos: [2.2, 2, 5.2], look: [0, 1.4, 1], fov: 42 } },
      update: (w, p, t) => { w.g.position.set(0, .1, 1); w.g.rotation.set(0, .4, 0); scurry(w.g, t, 4); w.crumb.position.set(.7, 1.3 + .5 * Math.abs(Math.sin(t * 6)), 1); },
    },
    {
      say: 'The treadmill? He has been running since Tuesday.',
      show: ['ground', 'tread', 'g', 'clock'], sky: '#2F4F7F', lightAt: [0, 4, 60], lightDist: 16,
      cam: { pos: [8, 5, 66], look: [0, 2.5, 60], fov: 48, to: { pos: [7, 5, 64.5], look: [0, 2.5, 60], fov: 46 } },
      update: (w, p, t) => { w.beltStripes.position.z = -((t * 6) % 1.2); w.g.position.set(0, 1.04, 60); w.g.rotation.set(0, -Math.PI / 2, 0); scurry(w.g, t, 60); w.hand.rotation.z = -t * 8; w.speed.material.emissiveIntensity = (t % .4) < .2 ? 3 : 1; },
    },
    {
      say: 'Gym selfie? You cannot even see him.',
      show: ['ground', 'phone', 'flash'], sky: '#2F4F7F', lightAt: [0, 5, 121], lightDist: 12,
      cam: { pos: [0, 4.6, 136], look: [0, 4.5, 120], fov: 46, to: { pos: [0, 4.6, 133], look: [0, 4.5, 120], fov: 44 } },
      update: (w, p, t) => { w.flash.material.opacity = t > .6 && t < .9 ? .8 * (1 - (t - .6) / .3) : 0; },
    },
    {
      say: 'Gary\'s next workout: legs, arms, or a nap? Comment below.',
      quiz: { q: 'What should Gary train next?', options: ['Legs (all six)', 'Arms', 'A nap'], answer: 'Gary is made up, so any of them. He has already chosen the nap.' },
      show: GYM, sky: '#274B73', lightAt: [2, 4, 0], lightDist: 16,
      cam: { pos: [3, 2, 14], look: [2, 7, -2], fov: 48, to: { pos: [-4, 2, 14], look: [2, 7, -2] } },
      update: (w, p, t) => { w.g.position.set(-.5, .1, 1); w.g.rotation.set(0, .1, 0); scurry(w.g, t, 10); },
    },
  ],
};
