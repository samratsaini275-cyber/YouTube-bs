// Narrative 16: "What Would Happen If… (season 6)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a red firefighter helmet.

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
  w.fhat = group([.36, .52, 0], w.g); const fh = k.mesh(new k.THREE.SphereGeometry(.22, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#E2453C'), [0, 0, 0], w.fhat); cyl(.3, .3, .03, mat('#E2453C'), [0, 0, 0], w.fhat, 16); box(.08, .1, .02, mat('#FFC21F', { glow: .4 }), [.2, .08, 0], w.fhat).rotation.y = Math.PI / 2;
  w.truck = group(); box(1.8, .6, .8, mat('#E2453C'), [0, .45, 0], w.truck); box(.6, .5, .78, mat('#E2453C'), [.7, .95, 0], w.truck); box(.5, .3, .8, mat('#9FD3EE'), [.72, 1, 0], w.truck); for (const x of [-.6, .6]) for (const z of [-.4, .4]) { const wh = cyl(.18, .18, .1, mat('#222222'), [x, .18, z], w.truck, 12); wh.rotation.x = Math.PI / 2; } const lad = box(1.4, .06, .2, mat('#DDDDDD'), [-.2, .8, 0], w.truck); w.siren = ball(.08, mat('#3B6FD6', { glow: 1 }), [.7, 1.25, 0], w.truck);
  w.match = group(); cyl(.04, .04, 1.4, mat('#E8C49A'), [0, .7, 0], w.match, 6); ball(.08, mat('#C0392B'), [0, 1.42, 0], w.match); w.flame = cone(.12, .35, mat('#FF8A1F', { glow: 1 }), [0, 1.62, 0], w.match, 8);
  w.drop = ball(.06, mat('#4AA3DF', { glow: .4 }), [0, 0, 0], k.scene); w.drop.scale.y = 1.4;
  w.hose = group(); for (let i = 0; i < 8; i++) { const s = ball(.04, mat('#E8C070'), [0, 0, 0], w.hose); s.userData.i = i; }
  w.crumb = box(.3, .2, .25, mat('#D9A35B'), [0, .1, 0], k.scene);
  w.medal = group(); cyl(.15, .15, .03, mat('#FFD23F', { glow: .6 }), [0, 0, 0], w.medal, 16).rotation.x = Math.PI / 2; box(.08, .2, .01, mat('#3B6FD6'), [0, .17, 0], w.medal);
  w.ants = group(); w.antList = []; for (let i = 0; i < 4; i++) { const a = gary(k, w.ants, .9, ['#5FBF5F', null, '#8E44AD', null][i]); a.position.set(-2 + i * 1.3, 0, -1.2); a.rotation.y = -1.4; w.antList.push(a); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '283',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FIREFIGHTER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A FIREFIGHTER?'],
  title: 'What would happen if Gary the ant was a firefighter?',
  description: 'His fire truck is a toy. The fire is one match. His hose holds one drop of water. And the medal? Bigger than he is. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'firefighter', 'funny', 'shorts'],
  sources: ['Quiz fact: some ant colonies have soldier ants with extra-big heads whose job is to defend the nest (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a firefighter?', show: ['desk', 'wall', 'g', 'fhat'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .08 * Math.sin(t * 6); } },
    { say: 'His fire truck? A toy.', label: '*NEE-NAW*', show: ['desk', 'wall', 'g', 'fhat', 'truck'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 2, 6.5], look: [0, .8, 0], fov: 50, to: { pos: [0, 2, 6], look: [0, .8, 0], fov: 48 } },
      update: (w, p, t) => { const x = 1.6 - p * 3.2; w.truck.position.set(x, 0, .2); w.truck.rotation.y = Math.PI; gy(w, x + .1, .55, .2, Math.PI, t); w.siren.material.color.set(Math.sin(t * 16) > 0 ? '#3B6FD6' : '#E2453C'); } },
    { say: 'The fire? One match.', show: ['desk', 'wall', 'g', 'fhat', 'match'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.5, 5], look: [.2, .9, 0], fov: 46, to: { pos: [.7, 1.5, 4.5], look: [.2, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.match.position.set(.8, 0, 0); w.flame.scale.set(1 + .2 * Math.sin(t * 20), 1 + .3 * Math.sin(t * 17), 1); gy(w, -.6, 0, .4, -.9, t); w.g.rotation.z = .1 * Math.sin(t * 10); } },
    { say: 'His hose? Exactly one drop.', show: ['desk', 'wall', 'g', 'fhat', 'match', 'drop', 'hose'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.5, 5], look: [.2, .9, 0], fov: 46, to: { pos: [.7, 1.5, 4.5], look: [.2, .9, 0], fov: 44 } },
      update: (w, p, t) => { w.match.position.set(.8, 0, 0); gy(w, -.6, 0, .4, -.9, t); w.hose.children.forEach(s => { const i = s.userData.i; s.position.set(-.1 + i * .06, .4 + Math.sin(i) * .02, .55 - i * .03); }); const q = Math.min(1, Math.max(0, (p - .2) * 2)); w.drop.position.set(.35 + q * .45, .45 + Math.sin(q * Math.PI) * .9 + q * 1.2, .3 - q * .3); w.drop.visible = q < .98; w.flame.visible = q < .98; } },
    { say: 'And the medal? Bigger than he is.', label: 'HERO', show: ['desk', 'wall', 'g', 'fhat', 'medal', 'ants'], sky: '#E9DDC8', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 1.8, 5.8], look: [0, .8, -.4], fov: 50, to: { pos: [0, 1.8, 5.3], look: [0, .8, -.4], fov: 48 } },
      update: (w, p, t) => { gy(w, -.5, 0, .6, -1.2, t); w.medal.scale.setScalar(4.5); w.medal.position.set(.8, .75, .5); w.medal.rotation.z = .1 * Math.sin(t * 3); w.antList.forEach((a, i) => a.position.y = .08 * Math.max(0, Math.sin(t * 9 + i))); } },
    { say: 'Firefighter Gary: hero, tiny, or both? Comment below.',
      quiz: { q: 'Firefighter Gary is…', options: ['Hero', 'Tiny', 'Both'], answer: 'Some real ant colonies have big-headed soldier ants that defend the nest.' },
      show: ['desk', 'g', 'fhat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
