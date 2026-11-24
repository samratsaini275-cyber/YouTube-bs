// Narrative 15: "What Would Happen If… (season 5)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a tie at a laptop.

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
  const w = { k };
  w.desk = k.ground('#B07A45', 0);
  w.wall = group(); box(30, 14, .3, mat('#E9DDC8'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, '#3B6FD6');
  w.tie = group([.48, .2, 0], w.g); box(.03, .22, .08, mat('#E2453C'), [0, 0, 0], w.tie); w.tie.rotation.z = -.3;
  w.laptop = group(); box(1.4, .06, 1, mat('#9AA4AE'), [0, .03, 0], w.laptop); const sc = box(1.4, .9, .05, mat('#9AA4AE'), [0, .5, -.5], w.laptop); sc.rotation.x = -.2; box(1.25, .75, .02, mat('#BFE3F7', { glow: .6 }), [0, .5, -.46], w.laptop).rotation.x = -.2;
  w.cup = group(); cyl(.11, .08, .22, mat('#FFFFFF'), [0, .11, 0], w.cup, 12); cyl(.1, .1, .02, mat('#7A4A22'), [0, .22, 0], w.cup, 12);
  w.bigcup = group(); cyl(.9, .7, 2.2, mat('#FFFFFF'), [0, 1.1, 0], w.bigcup, 20); cyl(.95, .95, .2, mat('#3A2A1A'), [0, 2.25, 0], w.bigcup, 20);
  w.pizza = group(); cyl(1.2, 1.2, .12, mat('#E8B04A'), [0, 0, 0], w.pizza, 24); for (let i = 0; i < 6; i++) cyl(.18, .18, .03, mat('#C0392B'), [Math.cos(i) * .7, .07, Math.sin(i * 1.7) * .6], w.pizza, 12);
  w.colony = group(); w.ants = []; for (let i = 0; i < 18; i++) { const a = gary(k, w.colony, .55, i % 3 ? null : '#FFC21F'); a.position.set(-2.6 + (i % 6) * 1.05, 0, -1.6 + Math.floor(i / 6) * .9); a.rotation.y = -1.4 + (i % 3 - 1) * .2; w.ants.push(a); }
  w.table = group(); box(7.5, .1, 3.4, mat('#6B4B2E'), [0, -.05, -.8], w.table);
  w.sugar = box(.5, .5, .5, mat('#FFFFFF', { glow: .3 }), [0, 0, 0], k.scene);
  w.sparkles = group(); for (let i = 0; i < 8; i++) { const s = ball(.05, mat('#FFE07A', { glow: 1 }), [0, 0, 0], w.sparkles); s.userData.i = i; s.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '259',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GETS A JOB',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'GOT A JOB?'],
  title: 'What would happen if Gary the ant got a job?',
  description: 'His coffees are one drop each. The pizza delivers him. He brings the whole colony to the meeting. And his pay? One sugar cube. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'job', 'funny', 'shorts'],
  sources: ['Quiz fact: many ant colonies split work into roles such as foragers, nurses and diggers, and some ants switch jobs as they age (division of labour in social insects; see Hölldobler and Wilson, "The Ants", 1990).'],
  setup,
  scenes: [
    { say: 'What if Gary got a job?', show: ['desk', 'wall', 'g', 'laptop'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .72, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .72, 0], fov: 44 } },
      update: (w, p, t) => { w.laptop.position.set(-.2, 0, -.9); gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .08 * Math.sin(t * 14); } },
    { say: 'Coffee shop? Every coffee is one drop.', label: 'ONE DROP LATTE', show: ['desk', 'wall', 'g', 'cup', 'bigcup'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.6, 1.6, 6.2], look: [-.6, .8, 0], fov: 48, to: { pos: [.5, 1.6, 5.6], look: [-.6, .8, 0], fov: 46 } },
      update: (w, p, t) => { w.bigcup.position.set(-1.8, 0, -1); gy(w, -.1, 0, 0, -.9, t); w.cup.position.set(-.6 - p * .3, 0, .8); w.cup.scale.setScalar(1.6); } },
    { say: 'Delivery? The pizza is carrying him.', show: ['desk', 'wall', 'g', 'pizza'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2, 7.5], look: [0, .45, 0], fov: 50, to: { pos: [0, 2, 7], look: [0, .45, 0], fov: 48 } },
      update: (w, p, t) => { const x = 1.3 - p * 2.6; gy(w, x, 0, .4, Math.PI, t, true); w.pizza.position.set(x + .1, .75 + .05 * Math.sin(t * 20), .4); w.pizza.rotation.z = .1 * Math.sin(t * 7); w.g.rotation.z = -.15; } },
    { say: 'Team meeting? He brought the whole colony.', show: ['desk', 'wall', 'g', 'colony', 'table'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 3.8, 6.8], look: [0, .1, -.2], fov: 52, to: { pos: [0, 3.6, 6.2], look: [0, .1, -.2], fov: 50 } },
      update: (w, p, t) => { gy(w, 0, 0, 1.2, -1.57, t); w.ants.forEach((a, i) => { a.position.y = .08 * Math.max(0, Math.sin(t * 9 + i)); }); } },
    { say: 'And payday? One sugar cube.', label: '*RICH*', show: ['desk', 'wall', 'g', 'sugar', 'sparkles'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.2, 1.2, 5.4], look: [.2, .45, 0], fov: 46, to: { pos: [1.1, 1.2, 4.8], look: [.2, .45, 0], fov: 44 } },
      update: (w, p, t) => { w.sugar.position.set(.9, .25, 0); w.sugar.rotation.y = .4; gy(w, -.4, .35 * Math.abs(Math.sin(t * 6)), .3, -1.2, t); w.sparkles.children.forEach(s => { const a = s.userData.i / 8 * Math.PI * 2 + t; s.position.set(.9 + Math.cos(a) * .55, .45 + Math.sin(a * 2) * .2, Math.sin(a) * .55); }); } },
    { say: 'Best job for Gary: barista, delivery, or the boss? Comment below.',
      quiz: { q: 'Best job for Gary?', options: ['Barista', 'Delivery', 'The boss'], answer: 'Real ant colonies split jobs: foragers, nurses and diggers.' },
      show: ['desk', 'g'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
