// Narrative 20: "What Would Happen If… (season 10)". Gary premise (every fifth episode: 349, 354, 359, 364).
// Hook: the premise as a question under 2 s; first frame shows Gary in tiny lab goggles.

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
  w.floor = k.ground('#E0E8F0', 0);
  w.wall = group(); box(30, 14, .3, mat('#F2F5F8'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.goggles = group([.55, .44, 0], w.g); for (const z of [-1, 1]) { const r = k.torus(.08, .02, mat('#3B6FD6'), [0, 0, z * .11], w.goggles); r.rotation.set(0, Math.PI / 2, 0); const l = cyl(.07, .07, .01, mat('#BFE3F7', { glow: .4 }), [.01, 0, z * .11], w.goggles, 12); l.rotation.z = Math.PI / 2; }
  w.coat = group([0, .3, 0], w.g); const cb = ball(.24, mat('#FFFFFF'), [0, 0, 0], w.coat); cb.scale.set(1.05, 1.05, 1.05);
  w.drop = ball(.7, mat('#9AD8F5', { glow: .25 }), [0, 0, 0]); w.drop.scale.y = .6; w.drop.material.transparent = true; w.drop.material.opacity = .7;
  w.bug = group(); for (let i = 0; i < 5; i++) ball(.1, mat('#3FA34D'), [Math.cos(i) * .15, Math.sin(i * 2) * .1, Math.sin(i) * .15], w.bug);
  w.flask = group(); cyl(.15, .5, .9, mat('#DDEEFF', { glow: .1 }), [0, .45, 0], w.flask, 16); cyl(.1, .1, .4, mat('#DDEEFF'), [0, 1.1, 0], w.flask, 12); w.liquid = cyl(.14, .45, .5, mat('#FF5FA2', { glow: .5 }), [0, .25, 0], w.flask, 16); w.flask.children[0].material.transparent = true; w.flask.children[0].material.opacity = .4;
  w.bubbles = group(); for (let i = 0; i < 8; i++) { const b = ball(.1, mat('#FF9AC8', { glow: .6 }), [0, 0, 0], w.bubbles); b.userData.i = i; b.castShadow = false; }
  w.crumb = group(); const cm = ball(.6, mat('#C98B3E'), [0, .5, 0], w.crumb); cm.scale.set(1.3, .8, 1); w.trophy = group(); cyl(.25, .15, .4, mat('#F2C94C', { metal: .6 }), [0, .2, 0], w.trophy, 12);
  w.conf = group(); for (let i = 0; i < 12; i++) { const c = box(.06, .06, .01, mat(['#FF5FA2', '#FFC21F', '#4FB3E8'][i % 3], { glow: .3 }), [0, 0, 0], w.conf); c.userData.i = i; c.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '349',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SCIENTIST GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A SCIENTIST?'],
  title: 'What would happen if Gary the ant was a scientist?',
  description: 'His microscope is one drop of water. His experiment goes bubbly. And his big discovery? A bigger crumb. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'scientist', 'funny', 'shorts'],
  sources: ['Quiz fact: leafcutter ants carry bacteria on their bodies that make antibiotics, which protect their fungus gardens from a harmful mould (Currie et al., Nature, 1999).'],
  setup,
  scenes: [
    { say: 'What if Gary was a scientist?', show: ['floor', 'wall', 'g', 'goggles'], sky: '#F2F5F8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'His microscope? One drop of water.', show: ['floor', 'wall', 'g', 'goggles', 'drop', 'bug'], sky: '#F2F5F8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.6, 5], look: [.3, .8, 0], fov: 46, to: { pos: [0, 1.6, 4.5], look: [.3, .8, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, -.9, 0, .3, -.3, t); w.drop.position.set(.5, .45, .3); const zoom = 1 + Math.min(1, p * 2) * 1.5; w.bug.position.set(.5, .45, .35); w.bug.scale.setScalar(zoom); w.bug.rotation.y = t; } },
    { say: 'His experiment? Very bubbly.', label: 'BLOOP', show: ['floor', 'wall', 'g', 'goggles', 'flask', 'bubbles'], sky: '#F2F5F8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 5.5], look: [0, 1, 0], fov: 48, to: { pos: [0, 1.8, 5], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { gy(w, -.9, 0, .4, -.6, t); w.flask.position.set(.6, 0, 0); w.liquid.scale.y = 1 + .2 * Math.sin(t * 8); w.bubbles.children.forEach(b => { const i = b.userData.i, q = (t * 1.2 + i / 8) % 1; b.position.set(.6 + Math.sin(i * 2) * .3 * q, 1.2 + q * 2, Math.cos(i) * .2); b.scale.setScalar(.5 + q * 1.5); b.visible = p > .2; }); w.g.position.y = p > .5 ? .15 * Math.abs(Math.sin(t * 9)) : 0; } },
    { say: 'And his big discovery? A bigger crumb.', label: 'EUREKA!', show: ['floor', 'wall', 'g', 'goggles', 'crumb', 'conf'], sky: '#F2F5F8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6], look: [0, 1, 0], fov: 50, to: { pos: [0, 1.8, 5.5], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -1.1, .15 * Math.abs(Math.sin(t * 8)), .4, -.5, t); w.crumb.position.set(.7, 0, 0); w.crumb.scale.setScalar(1 + .05 * Math.sin(t * 4)); w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .7 + i / 12) % 1; c.position.set(-2 + (i * .37) % 4, 2.8 - q * 3, -.4 + (i % 3) * .3); c.rotation.set(t * 4 + i, t * 3, 0); }); } },
    { say: 'Scientist Gary: smart, tiny, or totally lost? Comment below.',
      quiz: { q: 'Scientist Gary is…', options: ['Smart', 'Tiny', 'Totally lost'], answer: 'Real leafcutter ants carry bacteria that make antibiotics.' },
      show: ['floor', 'g', 'goggles'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
