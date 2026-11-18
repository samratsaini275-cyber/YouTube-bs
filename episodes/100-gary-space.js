// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his space trip are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary in a bubble helmet on top of a soda-bottle rocket.


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
  w.ground = k.ground('#D9DEE6', 0);
  w.room = group();
  box(80, 40, .5, mat('#CFE3D4'), [0, 20, -14], w.room);
  box(80, .6, 40, mat('#F4F4F0'), [0, 34, 0], w.room);
  for (let i = 0; i < 10; i++) box(4.8, .1, 4.8, mat(i % 2 ? '#E8E8E8' : '#FFFFFF'), [-22 + i * 5, .05, 2], w.room).castShadow = false;
  // the lamp hanging from the ceiling
  w.lamp = group([-7, 0, 0], w.room);
  cyl(.08, .08, 4, mat('#333333'), [0, 32, 0], w.lamp, 6);
  cone(3, 2.4, mat('#E2453C', { double: true }), [0, 28.8, 0], w.lamp, 24);
  ball(.8, mat('#FFF6C2', { glow: 2 }), [0, 27.6, 0], w.lamp).castShadow = false;
  // the rocket
  w.rocket = group([0, 0, 0]);
  cyl(1.5, 1.5, 7, mat('#4CC38A', { opacity: .75, rough: .1 }), [0, 4.2, 0], w.rocket, 24);
  cone(1.5, 2.2, mat('#4CC38A', { opacity: .75, rough: .1 }), [0, 8.8, 0], w.rocket, 24);
  cyl(.5, .5, .5, mat('#E2453C'), [0, 10.1, 0], w.rocket, 16);
  cyl(1.45, 1.45, 3, mat('#5BC0EB', { opacity: .5 }), [0, 2.2, 0], w.rocket, 24);
  box(3.6, .12, 3, mat('#FFFFFF'), [0, 5, 1.52], w.rocket).castShadow = false;
  for (let i = 0; i < 4; i++) { const f = box(.15, 2.4, 1.6, mat('#E2453C'), [Math.cos(i * Math.PI / 2) * 1.8, 1.3, Math.sin(i * Math.PI / 2) * 1.8], w.rocket); f.rotation.y = -i * Math.PI / 2; }
  w.g = gary(k, k.scene, 1.6);
  w.helm = ball(.55, mat('#BFE8FF', { opacity: .35, rough: .05 }), [.38, .45, 0], w.g); w.helm.castShadow = false;
  w.spray = group();
  for (let i = 0; i < 16; i++) { const d = ball(.3, mat('#BFE8FF', { glow: .6, opacity: .8 }), [0, 0, 0], w.spray); d.userData = { a: i * .39, ph: (i * .17) % 1 }; d.castShadow = false; }
  w.flag = group([0, 0, 0]);
  cyl(.04, .04, 2, mat('#C0C0C8'), [0, 1, 0], w.flag, 6);
  box(1.1, .7, .03, mat('#FFD21F'), [.55, 1.6, 0], w.flag).castShadow = false;
  return w;
}

const BASE = ['ground', 'room', 'rocket', 'g'];
function ride(w, y, t, sp) { w.rocket.position.set(0, y, 0); w.g.position.set(-.5, y + 10.35, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, sp); }

export default {
  id: '100',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO SPACE',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO SPACE.'],
  title: 'Gary the ant went to space',
  description: 'The rocket is a soda bottle. Space is the kitchen ceiling. The flag goes on the lamp. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'space', 'rocket', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his space trip are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to space.',
      show: BASE, sky: '#CFE3D4', lightAt: [0, 12, 2], lightDist: 16,
      cam: { pos: [3.8, 11, 12], look: [0, 13.9, 0], fov: 50, to: { pos: [3.6, 11, 11.2], look: [0, 13.8, 0], fov: 48 } },
      update: (w, p, t) => { ride(w, 0, t, 8); },
    },
    {
      say: 'His rocket: one soda bottle.',
      show: BASE, sky: '#CFE3D4', lightAt: [0, 8, 2], lightDist: 20,
      cam: { pos: [6, 5, 20], look: [0, 6.5, 0], fov: 48, to: { pos: [5.5, 5, 18], look: [0, 6.5, 0], fov: 46 } },
      update: (w, p, t) => { ride(w, 0, t, 8); },
    },
    {
      say: 'Liftoff! All the way to the ceiling.',
      show: [...BASE, 'spray'], sky: '#CFE3D4', lightAt: [0, 16, 2], lightDist: 30,
      cam: { pos: [6, 6, 32], look: [-2.5, 17, 0], fov: 56, to: { pos: [6, 8, 32], look: [-2.5, 19, 0], fov: 56 } },
      shake: (t) => t < 1.4 ? .06 : 0,
      update: (w, p, t) => {
        const y = Math.min(21.4, 2 * t * t * 5); ride(w, y, t, 50);
        if (y >= 21.4) w.rocket.rotation.z = .08 * Math.sin(t * 25) * Math.max(0, 1 - (t - 1.5)); else w.rocket.rotation.z = 0;
        w.spray.children.forEach(d => { const u = d.userData, f = (t * 2 + u.ph) % 1; d.position.set(Math.cos(u.a) * f * 2.5, y - f * 6, Math.sin(u.a) * f * 2.5); d.scale.setScalar(1 - f * .6); d.visible = y < 21.4; });
      },
    },
    {
      say: 'Close enough. He plants a flag on the lamp.',
      show: ['ground', 'room', 'g', 'flag'], sky: '#CFE3D4', lightAt: [0, 29, 4], lightDist: 12,
      cam: { pos: [-2, 28.5, 10], look: [-7, 30.4, 0], fov: 44, to: { pos: [-2.4, 28.6, 9], look: [-7, 30.4, 0], fov: 42 } },
      update: (w, p, t) => {
        w.g.position.set(-7.8, 30.05, 1.6); w.g.rotation.set(0, .5, 0); scurry(w.g, t, 6);
        w.flag.position.set(-6.4, 30.05, 1.6); const f = Math.min(1, t / .6); w.flag.scale.set(1, f, 1); w.flag.rotation.z = .1 * Math.sin(t * 3);
      },
    },
    {
      say: 'Gary\'s next trip: the moon, Mars, or a fridge? Comment below.',
      quiz: { q: 'Where should Gary fly next?', options: ['The moon', 'Mars', 'The fridge'], answer: 'Gary is made up, so any of them. The fridge has snacks.' },
      show: BASE, sky: '#274B73', lightAt: [0, 12, 2], lightDist: 16,
      cam: { pos: [3, 9.5, 11], look: [0, 13.5, 0], fov: 46, to: { pos: [-3, 9.5, 11], look: [0, 13.5, 0] } },
      update: (w, p, t) => { w.rocket.rotation.z = 0; ride(w, 0, t, 8); },
    },
  ],
};
