// Narrative 27: "Gary's Big World (season 3: home and bedtime, with the cat)". Same format as 237 (the 1K sleepover).
// Hook rule: the premise as a statement under 2 s; first frame shows Gary next to a giant book.

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
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#8D6E63', 0);
  w.wall = group(); box(60, 30, .5, mat('#D5F5E3'), [0, 15, -6], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.book = group(); box(7, .7, 4.6, mat('#1F618D'), [0, .35, 0], w.book); w.left = box(3.4, .12, 4.4, mat('#FDFEFE'), [-1.75, .76, 0], w.book); box(3.4, .12, 4.4, mat('#FDFEFE'), [1.75, .76, 0], w.book);
  w.letA = group([-1.75, .84, 0], w.book); const lm = mat('#111111'); box(.25, .05, 2.4, lm, [-.5, 0, 0], w.letA).rotation.y = .35; box(.25, .05, 2.4, lm, [.5, 0, 0], w.letA).rotation.y = -.35; box(1, .05, .22, lm, [0, 0, .3], w.letA); w.letA.rotation.y = Math.PI;
  w.page = group([0, .84, 0], w.book); box(3.4, .06, 4.4, mat('#FBFCFC'), [1.7, 0, 0], w.page);
  w.mark = group(); box(.5, .04, 3, mat('#E74C3C'), [0, 0, 0], w.mark);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#D5F5E3', lightAt: [0, 7, 4], lightDist: 22 };

export default {
  id: '491',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BOOKWORM GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'OPENED A BOOK.'],
  title: 'Gary the ant opened a book',
  description: 'One letter fills a whole page. Turning a page is a full workout. And then the book closes with Gary inside: the best bookmark ever. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'book', 'funny', 'animation', 'shorts'],
  sources: [
    'Quiz fact: in experiments, rock ants (Temnothorax albipennis) exploring unknown nest cavities and branching mazes showed a leftward turning bias (Hunt et al., "Ants show a leftward turning bias when exploring unknown nest sites", Biology Letters, 2014).',
  ],
  setup,
  scenes: [
    {
      say: 'Gary opened a book.',
      show: ['floor', 'wall', 'g', 'book'], ...env,
      cam: { pos: [1.6, 1.6, 6.5], look: [0, .9, 0], fov: 46, to: { pos: [1.5, 1.6, 5.9], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.g.scale.setScalar(1.3); w.mark.visible = false; w.book.position.set(-2, 0, -3.2); w.page.rotation.z = 0; gy(w, .4, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'One letter? A whole page.',
      show: ['floor', 'wall', 'g', 'book'], ...env,
      cam: { pos: [-1.2, 8, 6.5], look: [-1.4, .8, .4], fov: 50, to: { pos: [-1.2, 7.6, 6.1], look: [-1.4, .8, .4], fov: 48 } },
      update: (w, p, t) => { w.mark.visible = false; w.book.position.set(0, 0, 0); w.page.rotation.z = 0; gy(w, -.15, .82, 1.6, -2.2, t); w.g.rotation.z = 0; },
    },
    {
      say: 'Turning a page? A full workout.',
      show: ['floor', 'wall', 'g', 'book'], ...env,
      cam: { pos: [.4, 3.6, 9.5], look: [0, 1.7, 0], fov: 48, to: { pos: [.4, 3.6, 8.9], look: [0, 1.7, 0], fov: 46 } },
      update: (w, p, t) => { w.mark.visible = false; w.book.position.set(0, 0, 0); const a = Math.min(Math.PI * .55, p * 2.2); w.page.rotation.z = a; w.page.updateWorldMatrix(true, true); gy(w, Math.cos(a) * 1.6, .9 + Math.sin(a) * 1.6, .9, Math.PI, t, true); w.g.rotation.z = a - .3; },
    },
    {
      say: 'Then the book closed. Best bookmark ever.',
      show: ['floor', 'wall', 'g', 'book'], ...env,
      cam: { pos: [-.4, 3.4, 8.5], look: [-.8, 1, 0], fov: 48, to: { pos: [-.4, 3.4, 7.9], look: [-.8, 1, 0], fov: 46 } },
      update: (w, p, t) => { w.book.position.set(0, 0, 0); const c = Math.min(1, p * 2.4); w.page.rotation.z = Math.PI * c; w.left.visible = true; gy(w, -1.2, .84 + c * .08, 2.1, -1.6, t); w.g.scale.set(1.3, 1.3 * (1 - c * .7), 1.3); w.mark.visible = false; },
    },
    {
      say: 'Best book for Gary: Crumb Recipes, Ant Island, or Cat Facts? Comment below.',
      quiz: { q: 'What is the best book for Gary?', options: ['Crumb Recipes', 'Ant Island', 'Cat Facts'], answer: 'Fun fact: rock ants exploring a new nest tend to turn left.' },
      show: ['floor', 'wall', 'g', 'book'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 22,
      cam: { pos: [1, 3.4, 8.5], look: [-.6, 1, 0], fov: 46, to: { pos: [-2, 3.4, 8.5], look: [-.6, 1, 0] } },
      update: (w, p, t) => { w.g.scale.setScalar(1.3); w.mark.visible = false; w.book.position.set(0, 0, 0); w.page.rotation.z = Math.PI; gy(w, -1.2, .92, 2.1, -1.6 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
