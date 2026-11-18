// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his swimming lessons are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary in goggles next to a raindrop bigger than him.


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
  w.ground = k.ground('#6FA85A', 0);
  w.leaves = group();
  for (let i = 0; i < 8; i++) { const l = ball(3, mat(['#4E8F3A', '#5FA04A'][i % 2]), [-24 + i * 7, .1, -10 - (i % 3) * 3], w.leaves); l.scale.set(1.4, .08, .7); l.rotation.y = i; }
  for (let i = 0; i < 10; i++) { const b = cyl(.15, .3, 9 + (i % 3) * 3, mat('#3E7F2E'), [-26 + i * 6, 4.5, -16], w.leaves, 6); b.rotation.z = .1 * (i % 3 - 1); }
  // the raindrop "pool"
  w.drop = ball(3.2, mat('#A8E6FF', { opacity: .45, rough: .02, metal: .1 }), [3.6, 0, 0]); w.drop.scale.y = .7; w.drop.castShadow = false;
  const shine = ball(.5, mat('#FFFFFF', { glow: 1.5, opacity: .8 }), [-1.2, 2, 1.6], w.drop); shine.scale.set(1, .6, .4); shine.castShadow = false;
  w.g = gary(k, k.scene, 2);
  w.goggles = group([0, 0, 0], w.g);
  for (const z of [-1, 1]) { const gg = k.torus(.07, .02, mat('#E2453C'), [.52, .43, z * .11], w.goggles); gg.rotation.y = Math.PI / 2; }
  // puddle + cornflake
  w.puddle = cyl(14, 14, .1, mat('#5BA8D9', { rough: .05, metal: .2 }), [0, .06, 60], k.scene, 40); w.puddle.castShadow = false;
  w.flake = group([0, 0, 0]);
  const fl = cyl(1.8, 1.6, .2, mat('#E8A33C', { rough: .9 }), [0, 0, 0], w.flake, 7); fl.scale.set(1.2, 1, .9);
  w.paddle = group([0, .9, 1.2], w.flake);
  cyl(.04, .04, 2, mat('#8B5A2B'), [0, 0, 0], w.paddle, 6).rotation.x = Math.PI / 2;
  box(.3, .05, .6, mat('#8B5A2B'), [0, 0, 1.1], w.paddle);
  w.splash = group();
  for (let i = 0; i < 10; i++) { const d = ball(.15, mat('#BFE8FF', { glow: .5 }), [0, 0, 0], w.splash); d.userData.a = i * .63; d.castShadow = false; }
  return w;
}

const BASE = ['ground', 'leaves', 'g'];

export default {
  id: '097',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY LEARNS TO SWIM',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'LEARNED TO SWIM.'],
  title: 'Gary the ant learned to swim',
  description: 'The pool is one raindrop. The raindrop does not want him. The cornflake does. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'swimming', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his swimming lessons are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant learned to swim.',
      show: [...BASE, 'drop'], sky: '#9ED2F3', lightAt: [1, 3, 0], lightDist: 14,
      cam: { pos: [-2.5, 4, 13], look: [.3, 2.6, 0], fov: 50, to: { pos: [-2.5, 3.8, 11.5], look: [.3, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-1, 0, .8); w.g.rotation.set(0, -.2, 0); scurry(w.g, t, 10); },
    },
    {
      say: 'His pool? One raindrop.',
      show: [...BASE, 'drop'], sky: '#9ED2F3', lightAt: [1, 3, 0], lightDist: 14,
      cam: { pos: [6, 9, 15], look: [2, 1, 0], fov: 50, to: { pos: [5.5, 8.5, 13.5], look: [2, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-1, 0, .8); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 6); w.drop.scale.set(1, .7 + .02 * Math.sin(t * 6), 1); },
    },
    {
      say: 'He jumps in, and bounces right off.',
      show: [...BASE, 'drop'], sky: '#9ED2F3', lightAt: [1, 3, 0], lightDist: 14,
      cam: { pos: [-1.5, 4.5, 15], look: [-.3, 2.8, 0], fov: 52, to: { pos: [-1.5, 4.5, 14], look: [-.3, 2.8, 0], fov: 50 } },
      update: (w, p, t) => {
        // run, leap onto the drop, get flung back
        let x, y, rz = 0;
        if (t < .5) { x = -1 + t * 2; y = 0; }
        else if (t < 1) { const f = (t - .5) / .5; x = 0 + f * 1.6; y = 2.6 * Math.sin(f * Math.PI / 2); }
        else { const f = Math.min(1, (t - 1) / 1); x = 1.6 - f * 3.4; y = 2.6 + 3 * f - 5.6 * f * f; rz = f * 6; if (y < 0) y = 0; }
        w.g.position.set(x, y, .8); w.g.rotation.set(0, 0, rz); scurry(w.g, t, 40);
        const sq = t > .95 && t < 1.3 ? .12 * Math.sin((t - .95) * 18) : 0; w.drop.scale.set(1 + sq, .7 - sq, 1 + sq);
      },
    },
    {
      say: 'So now he floats on a cornflake.',
      show: ['ground', 'leaves', 'puddle', 'flake', 'g', 'splash'], sky: '#BFE3F5', lightAt: [0, 4, 60], lightDist: 18,
      cam: { pos: [3, 5, 72], look: [0, 1.4, 60], fov: 46, to: { pos: [2.6, 4.6, 70], look: [0, 1.4, 60], fov: 44 } },
      update: (w, p, t) => {
        const bob = .12 * Math.sin(t * 2.5); w.flake.position.set(-1 + t * .5, .25 + bob, 60); w.flake.rotation.set(.05 * Math.sin(t * 2), .3, .05 * Math.cos(t * 2));
        w.g.position.set(w.flake.position.x - .3, .36 + bob, 60); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 0);
        w.paddle.rotation.y = .6 * Math.sin(t * 4);
        w.splash.children.forEach(d => { const f = (t * 1.2 + d.userData.a / 6.3) % 1; d.position.set(w.flake.position.x + Math.cos(d.userData.a) * (1 + f * 2), .2 + 1.2 * f - 1.5 * f * f, 61.4 + Math.sin(d.userData.a) * .5); });
      },
    },
    {
      say: 'Gary\'s next stroke: backstroke, doggy paddle, or anchor? Comment below.',
      quiz: { q: 'Which stroke should Gary learn next?', options: ['Backstroke', 'Doggy paddle', 'Anchor'], answer: 'Gary is made up, so any of them. His coach recommends the cornflake.' },
      show: [...BASE, 'drop'], sky: '#274B73', lightAt: [1, 3, 0], lightDist: 14,
      cam: { pos: [1, 1.5, 15], look: [.3, 5.5, 0], fov: 48, to: { pos: [-5, 1.5, 15], look: [.3, 5.5, 0] } },
      update: (w, p, t) => { w.drop.scale.set(1, .7, 1); w.g.position.set(-1, 0, .8); w.g.rotation.set(0, -.2, 0); scurry(w.g, t, 10); },
    },
  ],
};
