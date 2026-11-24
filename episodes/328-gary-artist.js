// Narrative 19: "What Would Happen If… (season 9)". Gary premise (every fifth episode: 328, 333, 338, 343).
// Hook: the premise as a question under 2 s; first frame shows Gary in a red beret.

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
  w.floor = k.ground('#C9B48A', 0);
  w.wall = group(); box(30, 14, .3, mat('#F5EFE0'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.beret = group([.32, .52, 0], w.g); const bb = ball(.2, mat('#E2453C'), [0, 0, 0], w.beret); bb.scale.set(1.2, .4, 1.2); cyl(.015, .015, .06, mat('#E2453C'), [0, .08, 0], w.beret, 4);
  w.brush = group([.55, .3, .2], w.g); cyl(.02, .02, .6, mat('#8B5A2B'), [0, .3, 0], w.brush, 4); w.brush.rotation.z = -.9;
  w.easel = group(); const em = mat('#8B5A2B'); for (const x of [-.6, .6]) { const l = box(.08, 2.2, .08, em, [x, 1.1, 0], w.easel); l.rotation.z = -x * .15; } w.canvas = box(1.6, 1.2, .05, mat('#FFFFFF'), [0, 1.5, .1], w.easel); w.dot = ball(.04, mat('#3B6FD6'), [0, 1.5, .14], w.easel);
  w.frame = group(); box(2.4, 1.8, .08, mat('#C9A040', { metal: .5 }), [0, 0, 0], w.frame); box(2.1, 1.5, .1, mat('#FFFFFF'), [0, 0, .02], w.frame); w.fdot = ball(.04, mat('#3B6FD6'), [0, 0, .08], w.frame);
  w.crowd = group(); for (let i = 0; i < 3; i++) { const a = gary(k, w.crowd, 1.1, null); a.position.set([-1.9, -.6, .5][i], 0, [1.2, 1.5, 1.1][i]); a.rotation.y = Math.PI / 2 + (i - 1) * .3; }
  w.glass = group(); k.torus(.35, .05, mat('#333333'), [0, 0, 0], w.glass).rotation.set(0, 0, 0); cyl(.03, .03, .5, mat('#333333'), [0, -.55, 0], w.glass, 4); const lens = cyl(.33, .33, .02, mat('#BFE3F7', { glow: .3 }), [0, 0, 0], w.glass, 16); lens.rotation.x = Math.PI / 2;
  w.gust = group(); for (let i = 0; i < 6; i++) { const l = box(1, .05, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.gust); l.userData.i = i; l.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '328',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'ARTIST GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS AN ARTIST?'],
  title: 'What would happen if Gary the ant was an artist?',
  description: 'His paintbrush is one hair. His masterpiece? One tiny dot. And the art show needs a magnifying glass. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'artist', 'funny', 'shorts'],
  sources: ['Quiz fact: ants carry liquid food in a "social stomach" (the crop) and pass it mouth to mouth to nestmates, a behaviour called trophallaxis (Encyclopaedia Britannica, "trophallaxis").'],
  setup,
  scenes: [
    { say: 'What if Gary was an artist?', show: ['floor', 'wall', 'g', 'beret', 'brush'], sky: '#F5EFE0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.brush.rotation.z = -.9 + .3 * Math.sin(t * 5); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'His paintbrush? One single hair.', show: ['floor', 'wall', 'g', 'beret', 'brush'], sky: '#F5EFE0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.6, 1.2, 4.4], look: [.3, .9, 0], fov: 44, to: { pos: [1.5, 1.2, 4], look: [.3, .9, 0], fov: 42 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.2, t); w.brush.rotation.z = -.4 + .5 * Math.sin(t * 8); } },
    { say: 'His masterpiece? One tiny dot.', label: 'TA-DA!', show: ['floor', 'wall', 'g', 'beret', 'brush', 'easel'], sky: '#F5EFE0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.8, 5.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.easel.position.set(.6, 0, -.6); gy(w, -.9, 0, .3, -.6, t); w.brush.rotation.z = p > .5 ? -2.4 : -.9 + .4 * Math.sin(t * 9); w.dot.visible = p > .3; w.g.position.y = p > .5 ? .15 * Math.abs(Math.sin(t * 8)) : 0; } },
    { say: 'And the art show? Bring a magnifying glass.', show: ['floor', 'wall', 'g', 'beret', 'frame', 'crowd', 'glass'], sky: '#F5EFE0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2.2, 6.5], look: [0, 1.5, 0], fov: 50, to: { pos: [0, 2.2, 6], look: [0, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { w.frame.position.set(0, 2, -2.4); gy(w, 1.1, 0, .6, -2.2, t); w.glass.position.set(.2 * Math.sin(t * 1.5), 2, -1.6); w.glass.rotation.set(0, 0, .2 * Math.sin(t)); w.crowd.children.forEach((a, i) => a.position.y = .08 * Math.abs(Math.sin(t * 3 + i))); } },
    { say: 'Artist Gary: talented, tiny, or totally lost? Comment below.',
      quiz: { q: 'Artist Gary is…', options: ['Talented', 'Tiny', 'Totally lost'], answer: 'Real ants share liquid food from a "social stomach", mouth to mouth.' },
      show: ['floor', 'g', 'beret', 'brush'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
