// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his cinema trip are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary on a cinema seat next to a giant popcorn bucket.

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
  w.ground = k.ground('#2A1E2A', 0);
  w.hall = group();
  w.screen = box(60, 26, .4, mat('#9ED2F3', { glow: .9 }), [0, 22, -40], w.hall);
  w.film = group([0, 22, -39.7], w.hall);
  w.filmSun = ball(4, mat('#FFD21F', { glow: 2 }), [-10, 4, 0], w.film); w.filmSun.scale.z = .05;
  w.filmCar = box(10, 4, .1, mat('#E2453C', { glow: 1 }), [0, -6, 0], w.film);
  // the seat Gary is on (huge to him)
  w.seat = group([0, 0, 0], w.hall);
  box(8, 1.6, 7, mat('#B8352E', { rough: .8 }), [0, 4, 0], w.seat);
  box(8, 8, 1.4, mat('#B8352E', { rough: .8 }), [0, 8, 3.2], w.seat);
  for (const x of [-4.6, 4.6]) box(1.2, 2, 7, mat('#5A1E1E'), [x, 5, 0], w.seat);
  box(8.4, 4, 7, mat('#3A1E1E'), [0, 1.6, 0], w.seat);
  // popcorn bucket in the armrest
  w.bucket = group([5.2, 6, -1], w.hall);
  cyl(2.2, 1.6, 5, mat('#FFFFFF'), [0, 0, 0], w.bucket, 16);
  for (let i = 0; i < 8; i++) { const st = box(.5, 5.02, .1, mat('#E2453C'), [0, 0, 0], w.bucket); const a = i / 8 * Math.PI * 2; st.position.set(Math.cos(a) * 1.92, 0, Math.sin(a) * 1.92); st.rotation.y = -a; }
  for (let i = 0; i < 16; i++) { const p = ball(.7, mat('#FFF1C2', { rough: 1 }), [((i * 37) % 30) / 10 - 1.5, 2.7 + (i % 3) * .4, ((i * 13) % 30) / 10 - 1.5], w.bucket); p.scale.set(1, .8, 1.1); }
  w.kernel = ball(.9, mat('#FFF1C2', { rough: 1 }), [0, 0, 0]); w.kernel.scale.set(1.1, .8, 1);
  w.g = gary(k, k.scene, 1.6);
  // the tall person in front (a giant head and shoulders)
  w.tall = group([0, 0, -14], w.hall);
  cyl(9, 10, 16, mat('#2A2A3A'), [0, 8, 0], w.tall, 24);
  w.head = ball(6, mat('#3A2A1E'), [0, 21, 0], w.tall);
  for (let i = 0; i < 9; i++) { const h = cone(1.2, 3, mat('#3A2A1E'), [-4 + i, 26, -.5], w.tall, 8); h.rotation.z = (i - 4) * .12; }
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.3, mat('#FFD21F', { glow: 2 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const HALL = ['ground', 'hall', 'g'];

export default {
  id: '087',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO THE CINEMA',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE CINEMA.'],
  title: 'Gary the ant went to the cinema',
  description: 'One piece of popcorn is a week of food. The person in front is a mountain. Gary finds the best seat anyway. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'cinema', 'movies', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his trip to the cinema are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to the cinema.',
      show: HALL, sky: '#1A121A', lightAt: [2, 6, 0], lightDist: 16,
      cam: { pos: [-11, 13, -4], look: [1.5, 7.2, 0], fov: 48, to: { pos: [-10, 12.5, -4], look: [1.5, 7.2, 0], fov: 46 } },
      update: (w, p, t) => { w.g.position.set(.5, 4.8, 0); w.g.rotation.y = Math.PI / 2; scurry(w.g, t, 8); w.filmCar.position.x = -15 + t * 8; w.tall.visible = false; },
    },
    {
      say: 'One piece of popcorn? A week of food.',
      show: [...HALL, 'kernel'], sky: '#1A121A', lightAt: [1, 6, 0], lightDist: 10,
      cam: { pos: [-6, 6.5, 1.5], look: [1, 5.4, 0], fov: 44, to: { pos: [-5.2, 6.4, 1.3], look: [1, 5.4, 0], fov: 42 } },
      update: (w, p, t) => { w.kernel.position.set(1.8, 5.5, 0); w.kernel.rotation.y = t; w.g.position.set(.2, 4.8, 0); w.g.rotation.y = 0; scurry(w.g, t, 6); w.tall.visible = false; },
    },
    {
      say: 'Then someone very tall sits in front.',
      show: HALL, sky: '#1A121A', lightAt: [0, 12, -10], lightDist: 30,
      cam: { pos: [1.5, 7.5, 2], look: [0, 13, -30], fov: 54, to: { pos: [1.5, 7.5, 1.8], look: [0, 13, -30], fov: 52 } },
      shake: (t) => t < .5 ? .15 : 0,
      update: (w, p, t, k) => { w.tall.visible = true; w.tall.position.y = -20 + 20 * k.h.ease(Math.min(1, t / .6)); w.g.position.set(.5, 4.8, 0); w.g.rotation.y = Math.PI / 2; scurry(w.g, t, 6); },
    },
    {
      say: 'So Gary climbs onto their head.',
      show: HALL, sky: '#1A121A', lightAt: [0, 22, -14], lightDist: 25,
      cam: { pos: [10, 26, 4], look: [0, 25, -14], fov: 50, to: { pos: [9, 26, 2], look: [0, 25, -14], fov: 48 } },
      update: (w, p, t, k) => { w.tall.visible = true; w.tall.position.y = 0; const c = k.h.ease(Math.min(1, t / 1.8)); w.g.position.set(0, 18 + c * 9.2, -8.5 - c * 5.5); w.g.rotation.set(0, Math.PI / 2, c < 1 ? 1.2 * (1 - c) : 0); scurry(w.g, t, 30); },
    },
    {
      say: 'Best seat in the house.',
      show: [...HALL, 'hearts'], sky: '#1A121A', lightAt: [0, 26, -14], lightDist: 20,
      cam: { pos: [5, 30, -5], look: [0, 26, -16], fov: 50, to: { pos: [4.5, 30, -6], look: [0, 26, -16], fov: 48 } },
      update: (w, p, t) => {
        w.tall.visible = true; w.g.position.set(0, 27.2, -14); w.g.rotation.set(0, Math.PI / 2, 0); scurry(w.g, t, 3); w.filmCar.position.x = -15 + t * 6;
        w.hearts.children.forEach(h => { const f = (t * .6 + h.userData.i / 4) % 1; h.position.set(-1 + h.userData.i * .6, 28.5 + f * 2, -14); h.scale.setScalar(.5 + f); });
      },
    },
    {
      say: 'Gary\'s movie: action, comedy, or horror? Comment below.',
      quiz: { q: 'What movie should Gary watch?', options: ['Action', 'Comedy', 'Horror'], answer: 'Gary is made up, so any of them. He would pick anything with a picnic in it.' },
      show: HALL, sky: '#274B73', lightAt: [2, 6, 0], lightDist: 16,
      cam: { pos: [-11, 12, 1], look: [1, 9, 0], fov: 48, to: { pos: [-11, 12, -6], look: [1, 9, 0] } },
      update: (w, p, t) => { w.tall.visible = false; w.g.position.set(.5, 4.8, 0); w.g.rotation.set(0, Math.PI / 2, 0); scurry(w.g, t, 8); },
    },
  ],
};
