// Narrative 6: "Gary's Big World" (last episode). A made-up comedy sketch: Gary the ant (recurring since 032) and his superhero career are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary in a red cape on a picnic blanket.


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
  w.park = group();
  for (let i = 0; i < 8; i++) for (let j = 0; j < 6; j++) box(3, .04, 3, mat((i + j) % 2 ? '#E2453C' : '#FFFFFF'), [-12 + i * 3, .02, -9 + j * 3], w.park).castShadow = false;
  for (let i = 0; i < 5; i++) { cyl(.8, 1, 8, mat('#6B4B2E'), [-24 + i * 12, 4, -26], w.park, 8); ball(5, mat('#2E8B4A'), [-24 + i * 12, 10, -26], w.park); }
  w.g = gary(k, k.scene, 2);
  w.cape = box(1.3, .04, .9, mat('#E2453C', { double: true }), [-.75, .6, 0], w.g); w.cape.castShadow = false;
  w.grape = ball(1.1, mat('#7B3FA0', { rough: .3 }), [0, 0, 0]);
  w.sandwich = group([0, 0, 0]);
  box(5, .7, 5, mat('#E8C48A'), [0, .35, 0], w.sandwich); box(5.2, .25, 5.2, mat('#5FA04A'), [0, .82, 0], w.sandwich);
  box(5, .35, 5, mat('#E8846A'), [0, 1.12, 0], w.sandwich); box(5, .7, 5, mat('#E8C48A'), [0, 1.65, 0], w.sandwich);
  w.speed = group();
  for (let i = 0; i < 6; i++) { const l = box(1.4, .04, .04, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], w.speed); l.userData.i = i; l.castShadow = false; }
  w.crumbs = group();
  for (let i = 0; i < 6; i++) { const c = ball(.15, mat('#7B3FA0'), [0, 0, 0], w.crumbs); c.userData.i = i; c.castShadow = false; }
  return w;
}

const BASE = ['ground', 'park', 'g'];
function capeFlap(w, t, sp = 8) { w.cape.rotation.z = .25 + .2 * Math.sin(t * sp); }

export default {
  id: '102',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SUPER GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BECAME A SUPERHERO.'],
  title: 'Gary the ant became a superhero',
  description: 'He saves the grape. Then he eats the grape. The picnic is his now. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'superhero', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his superhero career are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant became a superhero.',
      show: BASE, sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.5, 2.6, 9], look: [0, 3.4, 0], fov: 46, to: { pos: [2.3, 2.6, 8.2], look: [0, 3.3, 0], fov: 44 } },
      update: (w, p, t) => { w.g.position.set(-.3, .04, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 0); capeFlap(w, t); },
    },
    {
      say: 'A grape is rolling away. He races to save it.',
      show: [...BASE, 'grape', 'speed'], sky: '#9ED2F3', lightAt: [2, 3, 0], lightDist: 14,
      cam: { pos: [3, 4, 14], look: [2, 2.6, 0], fov: 52, to: { pos: [6, 4, 13], look: [5, 2.6, 0], fov: 50 } },
      update: (w, p, t) => {
        const gx = 3 + t * 1.2; w.grape.position.set(gx, 1.1, 0); w.grape.rotation.z = -gx / 1.1;
        const ax = -2 + t * 2.6; w.g.position.set(Math.min(ax, gx - 2.2), .04, 0); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 60); capeFlap(w, t, 20);
        w.speed.children.forEach(l => { const f = (t * 3 + l.userData.i / 6) % 1; l.position.set(w.g.position.x - 1.5 - f * 2, .4 + (l.userData.i % 3) * .3, (l.userData.i % 2 - .5) * .6); });
      },
    },
    {
      say: 'He catches it! Then he eats it.',
      show: [...BASE, 'grape', 'crumbs'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.5, 2.8, 9.5], look: [0, 3.4, 0], fov: 48, to: { pos: [2.3, 2.8, 8.8], look: [0, 3.3, 0], fov: 46 } },
      update: (w, p, t) => {
        w.g.position.set(-.3, .04, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 6); capeFlap(w, t);
        const eat = Math.max(0, t - 1.1), s = Math.max(.001, 1 - eat * .9);
        w.grape.scale.setScalar(s); w.grape.position.set(.3, 1.1 + 1.2 * s, 0); w.grape.rotation.set(0, 0, 0);
        w.crumbs.children.forEach(c => { const f = (eat * 1.5 + c.userData.i / 6) % 1; c.visible = eat > 0 && s > .05; c.position.set(.8 + Math.cos(c.userData.i) * f, 1.6 - f * 1.5, Math.sin(c.userData.i) * f * .5); });
      },
    },
    {
      say: 'Now the whole picnic is his secret base.',
      show: [...BASE, 'sandwich'], sky: '#FFD9A8', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [4, 4, 12], look: [0, 3.6, 0], fov: 48, to: { pos: [3.6, 4, 11], look: [0, 3.5, 0], fov: 46 } },
      update: (w, p, t) => { w.grape.scale.setScalar(1); w.sandwich.position.set(0, 0, 0); w.g.position.set(-.2, 2.04, .3); w.g.rotation.set(0, .5, 0); scurry(w.g, t, 0); capeFlap(w, t, 4); },
    },
    {
      say: 'Gary\'s hero name: Captain Crumb, Leg Day, or Antenna Man? Comment below.',
      quiz: { q: 'What should Gary\'s superhero name be?', options: ['Captain Crumb', 'Leg Day', 'Antenna Man'], answer: 'Gary is made up, so any of them. He signs his letters Captain Crumb.' },
      show: BASE, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2, 1.2, 9.5], look: [0, 3.4, 0], fov: 46, to: { pos: [-2, 1.2, 9.5], look: [0, 3.4, 0] } },
      update: (w, p, t) => { w.g.position.set(0, .04, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 8); capeFlap(w, t); },
    },
  ],
};
