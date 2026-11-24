// Narrative 16: "What Would Happen If… (season 6)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary fading out until only his hat is left.

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
  w.desk = k.ground('#C8955A', 0);
  w.grass = k.ground('#7FB069', .005);
  w.wall = group(); box(30, 14, .3, mat('#F0E2D0'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.ghost = []; w.g.traverse(o => { if (o.isMesh) { o.material = o.material.clone(); o.material.transparent = true; w.ghost.push(o); } });
  w.hat = w.ghost[w.ghost.length - 1];
  w.cookie = group(); cyl(.5, .5, .12, mat('#C8955A'), [0, 0, 0], w.cookie, 20); for (let i = 0; i < 5; i++) ball(.07, mat('#3A2A1A'), [Math.cos(i * 1.3) * .3, .06, Math.sin(i * 1.7) * .3], w.cookie);
  w.ants = group(); w.antList = []; for (let i = 0; i < 4; i++) { const a = gary(k, w.ants, 1.1, ['#E2453C', '#5FBF5F', null, '#8E44AD'][i]); a.position.set(-2.4 + i * 1.6, 0, -1.2 + (i % 2) * .5); a.rotation.y = -1.4 + (i - 1.5) * .3; w.antList.push(a); }
  w.qs = group(); for (let i = 0; i < 3; i++) { const q = group([0, 0, 0], w.qs); const qm = mat('#FFC21F', { glow: .8 }); k.torus(.15, .04, qm, [0, .2, 0], q).rotation.x = 0; ball(.05, qm, [0, -.12, 0], q); q.userData.i = i; q.traverse(o => o.castShadow = false); }
  w.cup = group(); cyl(.35, .3, .7, mat('#FFFFFF'), [0, .35, 0], w.cup, 16); cyl(.33, .33, .02, mat('#7A4A22'), [0, .69, 0], w.cup, 16);
  w.foot = group(); box(1.2, .5, 3, mat('#3A3A3A'), [0, .25, 0], w.foot); box(1.25, .2, 3.05, mat('#FFFFFF'), [0, .05, 0], w.foot);
  w.paint = box(3, .02, 2, mat('#3B6FD6'), [0, .01, 0], k.scene);
  w.prints = group(); for (let i = 0; i < 12; i++) { const d = ball(.05, mat('#3B6FD6'), [0, .01, 0], w.prints); d.scale.y = .2; d.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const fade = (w, a, hatToo = false) => w.ghost.forEach(o => { o.material.opacity = (o === w.hat && !hatToo) ? 1 : a; o.visible = o.material.opacity > .02; });

export default {
  id: '267',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'INVISIBLE GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS INVISIBLE?'],
  title: 'What would happen if Gary the ant was invisible?',
  description: 'Cookies float away on their own. Nobody can find him at dinner. He wins every game of hide and seek. And then he walks through blue paint. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'invisible', 'funny', 'shorts'],
  sources: ['Quiz fact: many ants find their way home by following scent trails laid down by other ants (pheromone trails).'],
  setup,
  scenes: [
    { say: 'What if Gary was invisible?', show: ['desk', 'wall', 'g'], sky: '#F0E2D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); fade(w, Math.max(0, 1 - p * 1.6)); w.hat.position.y = .5 + .05 * Math.sin(t * 6); } },
    { say: 'Cookies? They float away by themselves.', show: ['desk', 'wall', 'g', 'cookie'], sky: '#F0E2D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6.4], look: [0, .8, 0], fov: 48, to: { pos: [0, 1.8, 5.9], look: [0, .8, 0], fov: 46 } },
      update: (w, p, t) => { fade(w, 0, true); const x = 1.2 - p * 2.4; gy(w, x, 0, .3, Math.PI, t, true); w.cookie.position.set(x - .2, .75 + .04 * Math.sin(t * 14), .3); w.cookie.rotation.z = .1 * Math.sin(t * 7); } },
    { say: 'Dinner time? Nobody can find him.', show: ['desk', 'wall', 'g', 'ants', 'qs'], sky: '#F0E2D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.2, 6.6], look: [0, .7, -.4], fov: 50, to: { pos: [0, 2.2, 6], look: [0, .7, -.4], fov: 48 } },
      update: (w, p, t) => { fade(w, 0, true); gy(w, 0, 0, .9, -1.4, t); w.antList.forEach((a, i) => { a.rotation.y = -1.4 + Math.sin(t * 2 + i) * .8; }); w.qs.children.forEach(q => { const i = q.userData.i; q.position.set(-1.6 + i * 1.6, 1.4 + .1 * Math.sin(t * 4 + i), -1); }); } },
    { say: 'Hide and seek? Champion. Every time.', label: 'WINNER', show: ['desk', 'wall', 'g', 'cup', 'ants'], sky: '#F0E2D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.4, 1.6, 5.8], look: [0, .7, 0], fov: 48, to: { pos: [.4, 1.6, 5.3], look: [0, .7, 0], fov: 46 } },
      update: (w, p, t) => { fade(w, 0, false); w.hat.visible = true; w.hat.material.opacity = 1; gy(w, 0, 0, .8, -1.4, t); w.hat.position.y = .5 + (p > .5 ? .15 * Math.abs(Math.sin(t * 8)) : 0); w.cup.position.set(1.4, 0, -.4); w.antList.forEach((a, i) => { a.position.y = 0; a.rotation.y = -1.4 + Math.sin(t * 3 + i) * 1.2; }); } },
    { say: 'And then he walked through paint.', show: ['desk', 'wall', 'g', 'paint', 'prints'], sky: '#F0E2D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 3.6, 5.6], look: [0, .3, -.2], fov: 50, to: { pos: [0, 3.4, 5.1], look: [0, .3, -.2], fov: 48 } },
      update: (w, p, t) => { fade(w, 0, true); w.paint.position.set(-1.8, .01, 0); const x = -1.8 + p * 4; gy(w, x, 0, .2, 0, t, true); w.prints.children.forEach(d => { const i = d.userData.i, px = -.6 + i * .3; d.visible = px < x - .2; d.position.set(px, .02, .2 + (i % 2 ? .25 : -.25)); }); w.hat.material.color.set('#FFC21F'); } },
    { say: 'Invisible Gary: genius, sneaky, or total chaos? Comment below.',
      quiz: { q: 'Invisible Gary is…', options: ['Genius', 'Sneaky', 'Total chaos'], answer: 'Real ants follow scent trails to find their way.' },
      show: ['desk', 'g'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); fade(w, .5 + .5 * Math.sin(t * 3)); } },
  ],
};
