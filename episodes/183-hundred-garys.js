// Narrative 11: "What Would Happen If… (season 3, with Gary)". Gary-led (every third). Big-number Gary premise.
// Hook: the premise as a question under 2 s; first frame shows a field packed with identical Garys in yellow hats.

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
  w.ground = k.ground('#7FB069', 0);
  w.hero = gary(k, k.scene, 2, '#FFC21F');
  w.crowd = group(); for (let i = 0; i < 60; i++) { const g = gary(k, w.crowd, 1.4, '#FFC21F'); g.userData.i = i; g.position.set(((i % 10) - 4.5) * 1.5 + (Math.floor(i / 10) % 2) * .7, 0, -Math.floor(i / 10) * 1.4 - 1); g.rotation.y = -Math.PI / 2 + .3 * Math.sin(i * 7); }
  w.blanket = group(); box(9, .05, 6, mat('#E2453C'), [0, .03, 0], w.blanket); for (let i = 0; i < 4; i++) box(9, .06, .5, mat('#FFFFFF'), [0, .04, -2.25 + i * 1.5], w.blanket);
  w.food = group(); ball(.8, mat('#E8C07A'), [-2, .5, 0], w.food).scale.set(1.4, .5, 1); ball(.6, mat('#E35D5D'), [2, .6, -1], w.food); cyl(.5, .5, 1.2, mat('#F2F2F2'), [1, .6, 1.4], w.food, 14);
  w.flash = ball(.8, mat('#FFFFFF', { glow: 1 }), [0, 0, 0]); w.flash.castShadow = false;
  w.crumb = box(.4, .3, .4, mat('#D9A95B', { glow: .2 }), [0, 0, 0]);
  return w;
}

const hero = (w, x, z, ry, t, move = false) => { w.hero.position.set(x, 0, z); w.hero.rotation.set(0, ry, 0); if (move) scurry(w.hero, t, 14); else w.hero.userData.legs.forEach(l => l.rotation.x = 0); };
const swarm = (w, t, fn) => w.crowd.children.forEach(g => fn(g, g.userData.i));

export default {
  id: '183',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'A HUNDRED GARYS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF THERE WERE', 'A HUNDRED GARYS?'],
  title: 'What would happen if there were a hundred Garys?',
  description: 'Picnics vanish in one second. Group photos are a nightmare. Hide and seek is pointless. And they all want the same crumb. (Gary is made up. Real ant colonies can be huge.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'clones', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: many ant colonies contain thousands of workers or more (general entomology; cited from general knowledge, no specific number claimed).',
  ],
  setup,
  scenes: [
    {
      say: 'What about a hundred Garys?',
      show: ['ground', 'crowd'], sky: '#9ED2F3', lightAt: [0, 2, -4], lightDist: 16,
      cam: { pos: [2, 2.6, 7], look: [0, 2.3, -3], fov: 50, to: { pos: [1.8, 2.8, 6.2], look: [0, 2.3, -3], fov: 48 } },
      update: (w, p, t) => { hero(w, -.2, 2.2, -.9, t); swarm(w, t, (g, i) => { g.position.y = .12 * Math.abs(Math.sin(t * 6 + i)); }); },
    },
    {
      say: 'Picnics? Gone in one second.',
      show: ['ground', 'blanket', 'food', 'crowd'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [3, 6, 11], look: [0, 1.5, 0], fov: 52, to: { pos: [2.6, 6, 10], look: [0, 1.5, 0], fov: 50 } },
      update: (w, p, t) => {
        const q = Math.min(1, t / 1.2); w.food.visible = t < 1.3; w.food.scale.setScalar(1 - q * .6);
        swarm(w, t, (g, i) => { const a = i / 60 * Math.PI * 2, r0 = 7 + (i % 5), r = r0 * (1 - q) + .8 + (i % 4) * .5; g.position.set(Math.cos(a) * r, 0, Math.sin(a) * r * .7); g.rotation.y = -a + Math.PI; scurry(g, t, 22); });
      },
    },
    {
      say: 'Group photos? Which one is Gary?',
      show: ['ground', 'crowd', 'flash'], sky: '#9ED2F3', lightAt: [0, 2, -4], lightDist: 16,
      cam: { pos: [0, 2.6, 7], look: [0, 1.8, -4], fov: 52, to: { pos: [0, 2.6, 6.4], look: [0, 1.8, -4], fov: 50 } },
      update: (w, p, t) => { w.flash.visible = (t % 1.2) < .12; w.flash.position.set(0, 2.4, 5); swarm(w, t, (g, i) => { g.position.set(((i % 10) - 4.5) * 1.5 + (Math.floor(i / 10) % 2) * .7, 0, -Math.floor(i / 10) * 1.4 - 1); g.rotation.set(0, -Math.PI / 2, 0); g.userData.legs.forEach(l => l.rotation.x = 0); }); },
    },
    {
      say: 'But one crumb? Total chaos.',
      show: ['ground', 'crowd', 'crumb'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [2, 5, 9], look: [0, 1.2, 0], fov: 52, to: { pos: [1.8, 5, 8.2], look: [0, 1.2, 0], fov: 50 } },
      shake: (t) => .05,
      update: (w, p, t) => {
        w.crumb.position.set(.3 * Math.sin(t * 9), .9 + .3 * Math.abs(Math.sin(t * 7)), .3 * Math.cos(t * 8));
        swarm(w, t, (g, i) => { const a = i / 60 * Math.PI * 2 + t * (i % 2 ? 1 : -1), r = 1 + (i % 6) * .55; g.position.set(Math.cos(a) * r, (i % 3) * .3 * Math.abs(Math.sin(t * 8 + i)), Math.sin(a) * r); g.rotation.set(0, -a + Math.PI, 0); scurry(g, t, 26); });
      },
    },
    {
      say: 'A hundred Garys: amazing, chaos, or a bit much? Comment below.',
      quiz: { q: 'How many Garys is too many?', options: ['Amazing', 'Chaos', 'A bit much'], answer: 'Gary is made up. But real ant colonies can have thousands of ants!' },
      show: ['ground', 'crowd'], sky: '#274B73', lightAt: [0, 2, -4], lightDist: 16,
      cam: { pos: [4, 2.8, 6], look: [0, 2, -3], fov: 48, to: { pos: [-4, 2.8, 6], look: [0, 2, -3] } },
      update: (w, p, t) => { hero(w, 0, 2, -Math.PI / 2 + .9, t); swarm(w, t, (g, i) => { g.position.set(((i % 10) - 4.5) * 1.5 + (Math.floor(i / 10) % 2) * .7, .1 * Math.abs(Math.sin(t * 5 + i)), -Math.floor(i / 10) * 1.4 - 1); g.rotation.set(0, -Math.PI / 2 + .3 * Math.sin(i * 7), 0); }); },
    },
  ],
};
