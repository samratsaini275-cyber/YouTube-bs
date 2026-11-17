// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his beach day are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary on the sand next to a towel and a giant beach ball.

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
  w.ground = k.ground('#F2D9A0', 0);
  w.sea = box(400, .4, 200, mat('#3E8FD1', { metal: .3, rough: .1 }), [0, -.1, -112]); w.sea.castShadow = false;
  w.beach = group();
  const towel = box(10, .08, 5, mat('#E2453C'), [7, .04, -2], w.beach); towel.castShadow = false;
  for (let i = 0; i < 5; i++) box(10, .09, .4, mat('#FFFFFF'), [7, .045, -4 + i], w.beach).castShadow = false;
  w.bball = group([10, 4, -6], w.beach);
  for (let i = 0; i < 6; i++) { const s = k.mesh(new k.THREE.SphereGeometry(4, 24, 16, i * Math.PI / 3, Math.PI / 3), mat(['#E2453C', '#FFFFFF', '#2F6FD6', '#FFFFFF', '#FFD21F', '#FFFFFF'][i]), [0, 0, 0], w.bball); }
  w.g = gary(k, k.scene, 2.2);
  w.grain = ball(1.2, mat('#E8C98A', { rough: 1 }), [0, 0, 0]); w.grain.scale.set(1, .85, 1.1);
  w.sweat = group();
  for (let i = 0; i < 3; i++) { const d = ball(.12, mat('#5BC0EB', { glow: .8 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  // the sandcastle (huge for Gary, a pebble for everyone else)
  w.castle = group([0, 0, 0]);
  cyl(2.2, 2.6, 2, mat('#E8C98A', { rough: 1 }), [0, 1, 0], w.castle, 8);
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + Math.PI / 4; cyl(.7, .8, 3, mat('#E8C98A', { rough: 1 }), [Math.cos(a) * 2, 1.5, Math.sin(a) * 2], w.castle, 8); cone(.8, 1, mat('#E8C98A', { rough: 1 }), [Math.cos(a) * 2, 3.5, Math.sin(a) * 2], w.castle, 8); }
  const flag = box(.6, .4, .02, mat('#E2453C'), [.3, 4.3, 0], w.castle); cyl(.03, .03, 1.2, mat('#5A3A1E'), [0, 3.8, 0], w.castle, 6);
  w.foot = group([0, 0, 0]);
  const sole = ball(7, mat('#F2C9A0'), [0, 0, 0], w.foot); sole.scale.set(1.6, .45, .8);
  for (let i = 0; i < 5; i++) ball(1.3 - i * .15, mat('#F2C9A0'), [9 - i * .2, 1, -3 + i * 1.5], w.foot);
  // the wave and the leaf surfboard
  w.wave = group([0, 0, -30]);
  const wv = cyl(3, 3, 60, mat('#5BC0EB', { opacity: .85, rough: .1 }), [0, 1, 0], w.wave, 24, ); wv.rotation.z = Math.PI / 2; wv.scale.set(1, 1, 1.6);
  const foam = cyl(.8, .8, 60, mat('#FFFFFF'), [0, 3.6, 1.6], w.wave, 12); foam.rotation.z = Math.PI / 2;
  w.leaf = group([0, 0, 0]);
  const lf = ball(1.6, mat('#3FA34D', { rough: .6 }), [0, 0, 0], w.leaf); lf.scale.set(1.8, .12, .8);
  box(3, .06, .05, mat('#2E7D32'), [0, .12, 0], w.leaf);
  w.shades = group([0, 0, 0]);
  for (const z of [-.12, .12]) { const l = cyl(.09, .09, .03, mat('#111111'), [0, 0, z], w.shades, 14); l.rotation.z = Math.PI / 2; }
  return w;
}

const BEACH = ['ground', 'sea', 'beach', 'g'];

export default {
  id: '085',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO THE BEACH',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO THE BEACH.'],
  title: 'Gary the ant went to the beach',
  description: 'Every grain of sand is a boulder. His sandcastle took all day. The ocean had other plans. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'beach', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his beach day are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to the beach.',
      show: BEACH, sky: '#9ED2F3', lightAt: [2, 2, 0], lightDist: 18,
      cam: { pos: [-1, 3, 15], look: [2.5, 4, -2], fov: 50, to: { pos: [-1, 3, 13.5], look: [2.5, 4, -2], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(0, 0, 1); w.g.rotation.y = .3; scurry(w.g, t, 10); },
    },
    {
      say: 'Every grain of sand? A boulder.',
      show: [...BEACH, 'grain', 'sweat'], sky: '#A7D8F5', lightAt: [0, 2, 0], lightDist: 10,
      cam: { pos: [-1.5, 2, 7], look: [.6, 1.2, 0], fov: 44, to: { pos: [-1.3, 2, 6.2], look: [.6, 1.2, 0], fov: 42 } },
      shake: () => .02,
      update: (w, p, t) => {
        w.grain.position.set(1.8 + Math.max(0, t - .5) * .2, 1, 0); w.g.position.set(-.3 + Math.max(0, t - .5) * .2, 0, 0); w.g.rotation.y = 0; scurry(w.g, t, 45);
        w.sweat.children.forEach(d => { const f = (t * 1.5 + d.userData.i / 3) % 1; d.position.set(w.g.position.x - .2 - f * .6, 1.6 + f * .6 - f * f * 1.6, (d.userData.i - 1) * .3); });
      },
    },
    {
      say: 'His sandcastle took all day.',
      show: [...BEACH, 'castle'], sky: '#FFD9A8', lightAt: [0, 2, 0], lightDist: 12,
      cam: { pos: [3, 3, 9], look: [0, 2.2, 0], fov: 46, to: { pos: [2.7, 3, 8], look: [0, 2.2, 0], fov: 44 } },
      update: (w, p, t, k) => { const b = k.h.ease(Math.min(1, t / 1.6)); w.castle.position.set(0, 0, 0); w.castle.scale.set(1, Math.max(.05, b), 1); w.g.position.set(3, 0, 1.5); w.g.rotation.y = Math.PI * .8; scurry(w.g, t, 20); },
    },
    {
      say: 'Then a wave showed up.',
      show: [...BEACH, 'castle', 'wave'], sky: '#9ED2F3', lightAt: [0, 2, -4], lightDist: 25,
      cam: { pos: [6, 4, 16], look: [0, 2.5, -6], fov: 50, to: { pos: [5, 4, 14], look: [0, 2.5, -6], fov: 48 } },
      shake: (t) => t > 1 ? .1 : 0,
      update: (w, p, t) => { w.castle.scale.set(1, 1, 1); w.wave.position.z = -30 + t * 14; w.g.position.set(3, 0, 1.5); w.g.rotation.y = Math.PI * .8; scurry(w.g, t, 30); },
    },
    {
      say: 'Gary surfed it. On a leaf.',
      show: ['ground', 'sea', 'g', 'leaf', 'wave', 'shades'], sky: '#8EC9F0', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [5, 3.2, 10], look: [0, 3, -1], fov: 46, to: { pos: [4.5, 3.2, 8.5], look: [0, 3, -1], fov: 44 } },
      update: (w, p, t) => {
        const y = 2.2 + .4 * Math.sin(t * 3), x = -2 + t * 1.5; w.wave.position.set(0, -.5, -5); w.wave.scale.set(1, 1.2, 1);
        w.leaf.position.set(x, y + .3, 0); w.leaf.rotation.set(.15 * Math.sin(t * 3), 0, .1);
        w.g.position.set(x, y + .45, 0); w.g.rotation.set(0, 0, .1); scurry(w.g, t, 3);
        w.shades.position.set(x + 1.1, y + 1.4, 0); w.shades.rotation.set(0, 0, 0);
      },
    },
    {
      say: 'Gary\'s next trip: snow, desert, or space? Comment below.',
      quiz: { q: 'Where should Gary go next?', options: ['The snow', 'The desert', 'Space'], answer: 'Gary is made up, so anywhere. He has already packed for space.' },
      show: BEACH, sky: '#274B73', lightAt: [2, 2, 0], lightDist: 18,
      cam: { pos: [4, 2, 15], look: [2, 7, -2], fov: 48, to: { pos: [-4, 2, 15], look: [2, 7, -2] } },
      update: (w, p, t) => { w.wave.scale.set(1, 1, 1); w.g.position.set(0, 0, 1); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 10); },
    },
  ],
};
