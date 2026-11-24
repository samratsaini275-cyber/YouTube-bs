// Narrative 16: "What Would Happen If… (season 6)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a chef hat.

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
  w.desk = k.ground('#E8E0D0', 0);
  w.wall = group(); box(30, 14, .3, mat('#F4F0E8'), [0, 7, -3], w.wall); for (let i = 0; i < 12; i++) box(1, 1, .02, mat(i % 2 ? '#FFFFFF' : '#DDE8F0'), [-6 + i, 1.5, -2.84], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.toque = group([.36, .55, 0], w.g); cyl(.13, .13, .1, mat('#FFFFFF'), [0, 0, 0], w.toque, 14); const pf = ball(.17, mat('#FFFFFF'), [0, .15, 0], w.toque); pf.scale.y = .8;
  w.pan = group(); cyl(.5, .45, .08, mat('#333333'), [0, .04, 0], w.pan, 20); const hd = box(.7, .05, .1, mat('#333333'), [.85, .06, 0], w.pan); w.cake = cyl(.3, .3, .05, mat('#E8B04A'), [0, .1, 0], w.pan, 16);
  w.spoon = group(); cyl(.06, .06, 4, mat('#C9D1D9', { metal: .3 }), [0, 2, 0], w.spoon, 8); const bowl = ball(.5, mat('#C9D1D9', { metal: .3 }), [0, 0, 0], w.spoon); bowl.scale.set(1, .4, 1.4);
  w.pot = group(); cyl(.6, .55, .7, mat('#B0B8C0', { metal: .3 }), [0, .35, 0], w.pot, 20); cyl(.56, .56, .02, mat('#E8C070'), [0, .62, 0], w.pot, 20); w.grain = box(.05, .05, .05, mat('#FFFFFF', { glow: .5 }), [0, .65, 0], w.pot);
  w.steam = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFFFFF', { opacity: .6 }), [0, 0, 0], w.steam); s.userData.i = i; s.castShadow = false; }
  w.colony = group(); w.ants = []; for (let i = 0; i < 8; i++) { const a = gary(k, w.colony, .8, ['#E2453C', null, '#5FBF5F', null, '#8E44AD', null, '#FF7F2A', null][i]); a.position.set(-2.6 + (i % 4) * 1.4, 0, -1 - Math.floor(i / 4) * .9); a.rotation.y = -1.4; w.ants.push(a); }
  w.plates = group(); for (let i = 0; i < 4; i++) { const pl = group([-2.6 + i * 1.4, 0, -.2], w.plates); cyl(.3, .25, .04, mat('#FFFFFF'), [0, .02, 0], pl, 16); box(.04, .04, .04, mat('#E8B04A'), [0, .06, 0], pl); }
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = cone(.18, .3, mat('#FFD23F', { glow: .8 }), [0, 0, 0], w.stars, 5); s.rotation.x = Math.PI / 2; s.userData.i = i; s.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '275',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CHEF GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A CHEF?'],
  title: 'What would happen if Gary the ant was a chef?',
  description: 'Pancakes the size of a crumb. A spoon he cannot lift. Soup made from one grain of sugar. And the reviews? Five stars from the whole colony. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'chef', 'funny', 'shorts'],
  sources: ['Quiz fact: leafcutter ants are farmers: they grow a fungus on chewed-up leaves and eat the fungus, not the leaves (Smithsonian Tropical Research Institute).'],
  setup,
  scenes: [
    { say: 'What if Gary was a chef?', show: ['desk', 'wall', 'g', 'toque'], sky: '#F4F0E8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
    { say: 'Pancakes? The size of a crumb.', show: ['desk', 'wall', 'g', 'toque', 'pan'], sky: '#F4F0E8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.6, 5], look: [.2, .7, 0], fov: 46, to: { pos: [.7, 1.6, 4.5], look: [.2, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.pan.position.set(.6, 0, .4); const c = t % 1.2; w.cake.position.y = .1 + (c < .6 ? Math.sin(c / .6 * Math.PI) * .9 : 0); w.cake.rotation.x = c < .6 ? c / .6 * Math.PI * 2 : 0; w.cake.scale.setScalar(.3); gy(w, -.5, 0, .4, -.9, t); w.g.rotation.z = .1 * Math.sin(t * 8); } },
    { say: 'The spoon? He cannot even lift it.', show: ['desk', 'wall', 'g', 'toque', 'spoon'], sky: '#F4F0E8', lightAt: [0, 6, 3], lightDist: 16, shake: (t) => (t % 1.4) > 1.1 ? .12 : 0,
      cam: { pos: [1.2, 1.8, 6.4], look: [0, 1, 0], fov: 50, to: { pos: [1.1, 1.8, 5.8], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { const c = t % 1.4, up = c < 1.1 ? Math.sin(c / 1.1 * Math.PI) * .6 : 0; w.spoon.position.set(.8, .2, .3); w.spoon.rotation.set(0, 0, 1.4 - up); gy(w, -.6, 0, .6, -.6, t); w.g.rotation.z = -.2 - up * .3; } },
    { say: 'Soup? One grain of sugar.', show: ['desk', 'wall', 'g', 'toque', 'pot', 'steam'], sky: '#F4F0E8', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.6, 2, 4.8], look: [.2, .7, 0], fov: 46, to: { pos: [.5, 2, 4.3], look: [.2, .7, 0], fov: 44 } },
      update: (w, p, t) => { w.pot.position.set(.7, 0, 0); w.grain.position.set(.05 * Math.sin(t * 2), .66, .05 * Math.cos(t * 2)); gy(w, -.5, 0, .5, -.9, t); w.steam.children.forEach(s => { const i = s.userData.i, q = (t * .5 + i / 5) % 1; s.position.set(.7 + Math.sin(i * 2) * .2, .8 + q * 1.4, Math.cos(i * 2) * .2); s.scale.setScalar(1 + q); }); } },
    { say: 'And the reviews? Five stars from the colony.', label: '★★★★★', show: ['desk', 'wall', 'g', 'toque', 'colony', 'plates', 'stars'], sky: '#F4F0E8', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2.6, 6.6], look: [0, .7, -.5], fov: 52, to: { pos: [0, 2.6, 6], look: [0, .7, -.5], fov: 50 } },
      update: (w, p, t) => { gy(w, 0, .25 * Math.abs(Math.sin(t * 6)), 1, -1.57, t); w.ants.forEach((a, i) => { a.position.y = .08 * Math.max(0, Math.sin(t * 9 + i)); }); w.stars.children.forEach(s => { const i = s.userData.i; s.position.set(-1.6 + i * .8, 2.2 + .15 * Math.sin(t * 4 + i), -.5); s.visible = p > i * .12; }); } },
    { say: 'Chef Gary: delicious, tiny, or a kitchen disaster? Comment below.',
      quiz: { q: 'Chef Gary is…', options: ['Delicious', 'Tiny', 'Kitchen disaster'], answer: 'Real leafcutter ants farm fungus for food.' },
      show: ['desk', 'g', 'toque'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
