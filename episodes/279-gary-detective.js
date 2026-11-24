// Narrative 16: "What Would Happen If… (season 6)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a detective hat with a magnifying glass.

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
  w.wall = group(); box(30, 14, .3, mat('#E9DDC8'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.dhat = group([.36, .52, 0], w.g); cyl(.26, .26, .03, mat('#8B6B3A'), [0, 0, 0], w.dhat, 16); const dt = ball(.2, mat('#8B6B3A'), [0, .06, 0], w.dhat); dt.scale.set(1, .7, .9);
  w.glass = group(); const rim = k.torus(.25, .04, mat('#444444'), [0, 0, 0], w.glass); rim.rotation.set(0, 0, 0); const lens = cyl(.23, .23, .01, mat('#CFE8F7', { opacity: .5 }), [0, 0, 0], w.glass, 20); lens.rotation.x = Math.PI / 2; const hd = cyl(.04, .04, .4, mat('#6B4B2E'), [0, -.42, 0], w.glass, 6);
  w.plate = group(); cyl(.9, .8, .06, mat('#FFFFFF'), [0, .03, 0], w.plate, 24); w.cookie = cyl(.5, .5, .1, mat('#C8955A'), [0, .1, 0], w.plate, 20); w.bite = ball(.28, mat('#FFFFFF'), [.45, .1, 0], w.plate); w.bite.scale.y = .4;
  w.crumbs = group(); for (let i = 0; i < 7; i++) { const c = box(.14, .07, .14, mat('#C8955A'), [0, .04, 0], w.crumbs); c.userData.i = i; }
  w.board = group(); box(2.4, 1.6, .05, mat('#C8A57A'), [0, 0, 0], w.board); for (const [x, y, c] of [[-.7, .3, '#FFFFFF'], [.6, .4, '#FFE07A'], [0, -.4, '#FFFFFF']]) box(.5, .4, .02, mat(c), [x, y, .04], w.board); const yarn = box(1.3, .02, .02, mat('#E2453C'), [-.05, .35, .06], w.board); const y2 = box(.9, .02, .02, mat('#E2453C'), [.3, 0, .06], w.board); y2.rotation.z = 1.1;
  w.piece = group(); const pc = cyl(.28, .28, .1, mat('#C8955A'), [0, 0, 0], w.piece, 16, ); pc.rotation.x = Math.PI / 2; for (let i = 0; i < 3; i++) ball(.05, mat('#3A2A1A'), [Math.cos(i * 2) * .14, Math.sin(i * 2) * .14, .06], w.piece);
  w.mirror = group(); box(1.6, 2.2, .08, mat('#8B5A2B'), [0, 1.1, 0], w.mirror); box(1.4, 2, .02, mat('#DDEEFF', { metal: .6, rough: .05 }), [0, 1.1, .05], w.mirror);
  w.twin = gary(k, k.scene, 1.3, null); w.tht = group([.36, .52, 0], w.twin); cyl(.26, .26, .03, mat('#8B6B3A'), [0, 0, 0], w.tht, 16); const tt = ball(.2, mat('#8B6B3A'), [0, .06, 0], w.tht); tt.scale.set(1, .7, .9);
  w.qs = group(); const qm = mat('#FFC21F', { glow: .8 }); k.torus(.2, .05, qm, [0, .25, 0], w.qs).rotation.x = 0; ball(.06, qm, [0, -.15, 0], w.qs); w.qs.traverse(o => o.castShadow = false);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '279',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DETECTIVE GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A DETECTIVE?'],
  title: 'What would happen if Gary the ant was a detective?',
  description: 'The case: someone bit the cookie. The clue: a trail of crumbs. The evidence board gets serious. And the culprit? Gary. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'detective', 'funny', 'shorts'],
  sources: ['Quiz fact: ants smell with their antennae and use them to follow scent trails and recognise nestmates (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a detective?', show: ['desk', 'wall', 'g', 'dhat', 'glass'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.glass.position.set(.25, .65, 1.2); w.glass.rotation.set(0, -.2, .3); w.g.rotation.z = .06 * Math.sin(t * 4); } },
    { say: 'The case? Someone bit the cookie.', label: 'CASE #1', show: ['desk', 'wall', 'g', 'dhat', 'plate'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.6, 1.8, 5], look: [.2, .5, 0], fov: 46, to: { pos: [.5, 1.8, 4.5], look: [.2, .5, 0], fov: 44 } },
      update: (w, p, t) => { w.plate.position.set(.7, 0, 0); gy(w, -.7, 0, .6, -.9, t); w.g.rotation.z = .1 * Math.sin(t * 3); } },
    { say: 'The clue? A trail of crumbs.', show: ['desk', 'wall', 'g', 'dhat', 'glass', 'crumbs'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.2, 5.6], look: [0, .4, 0], fov: 48, to: { pos: [0, 2.2, 5.1], look: [0, .4, 0], fov: 46 } },
      update: (w, p, t) => { w.crumbs.children.forEach(c => { const i = c.userData.i; c.position.set(-1.8 + i * .55, .03, .3 + Math.sin(i) * .2); }); const x = -1.4 + p * 1.8; gy(w, x, 0, .3, 0, t, true); w.glass.position.set(x + .7, .45, .4); w.glass.rotation.set(-1.2, 0, 0); } },
    { say: 'The evidence board? Very serious.', show: ['desk', 'wall', 'g', 'dhat', 'board'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1, 1.6, 5.4], look: [0, 1.1, -.6], fov: 48, to: { pos: [.9, 1.6, 4.9], look: [0, 1.1, -.6], fov: 46 } },
      update: (w, p, t) => { w.board.position.set(0, 1.6, -2.6); gy(w, -.2, 0, .6, -1.4, t); w.g.rotation.z = .12 * Math.sin(t * 2); } },
    { say: 'And the culprit? It was Gary.', label: '*GASP*', show: ['desk', 'wall', 'g', 'dhat', 'plate', 'piece', 'qs'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.5, 5.2], look: [.2, .7, 0], fov: 46, to: { pos: [.7, 1.5, 4.7], look: [.2, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.plate.position.set(1, 0, -.3); gy(w, -.4, 0, .3, -1.1, t); const v = new w.k.THREE.Vector3(.72, .3, 0); w.g.updateWorldMatrix(true, false); v.applyMatrix4(w.g.matrixWorld); w.piece.position.copy(v); w.piece.rotation.y = -1.1 + Math.PI / 2; w.g.rotation.z = p > .5 ? .2 * Math.sin(t * 20) : 0; w.qs.position.set(-.3, 1.4 + .1 * Math.sin(t * 5), .3); w.qs.visible = p > .5; } },
    { say: 'Detective Gary: smart, sneaky, or both? Comment below.',
      quiz: { q: 'Detective Gary is…', options: ['Smart', 'Sneaky', 'Both'], answer: 'Real ants smell with their antennae to follow trails.' },
      show: ['desk', 'g', 'dhat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
