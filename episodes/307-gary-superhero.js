// Narrative 18: "What Would Happen If… (season 8)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a red mask and a tissue cape.

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
  w.wall = group(); box(30, 14, .3, mat('#CFE0F5'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.mask = box(.08, .14, .38, mat('#E2453C'), [.5, .43, 0], w.g);
  w.cape = group([-.1, .62, 0], w.g); const cp = box(.9, .02, .7, mat('#FFF4F4', { opacity: .95 }), [-.45, 0, 0], w.cape); cp.castShadow = false;
  w.books = group(); box(2.6, .5, 1.8, mat('#3B6FD6'), [0, .25, 0], w.books); box(2.4, .5, 1.7, mat('#E2453C'), [.1, .75, 0], w.books); box(2.5, .5, 1.75, mat('#5FBF5F'), [-.05, 1.25, 0], w.books);
  w.mz = group(); const gm = mat('#555555'); const mb = ball(.18, gm, [0, 0, 0], w.mz); mb.scale.set(2, .7, .7); ball(.12, gm, [.35, .05, 0], w.mz); seg(k, [.45, .05, 0], [.9, -.05, 0], mat('#333333'), w.mz, .015); for (const z of [-1, 1]) { ball(.05, mat('#E2453C'), [.42, .12, z * .07], w.mz); } w.mzw = [-1, 1].map(z => { const wg = box(.4, .01, .2, mat('#DDEEFF', { opacity: .6 }), [0, .12, z * .2], w.mz); return wg; }); for (let i = 0; i < 6; i++) seg(k, [-.1 + (i % 3) * .1, -.05, 0], [-.2 + (i % 3) * .15, -.45, (i < 3 ? -1 : 1) * .25], gm, w.mz, .01);
  w.lines = group(); for (let i = 0; i < 5; i++) { const l = box(.02, .5, .02, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const flap = (w, t, a = .3) => { w.cape.rotation.z = .25 - a * (1 + Math.sin(t * 10)) * .4; w.cape.rotation.x = .15 * Math.sin(t * 7); };

export default {
  id: '307',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SUPER GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A SUPERHERO?'],
  title: 'What would happen if Gary the ant was a superhero?',
  description: 'His cape is a tissue. Flying is more like falling. His worst enemy? One mosquito. And his secret identity? Still just Gary. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'superhero', 'funny', 'shorts'],
  sources: ['Quiz fact: an Ohio State University study (Nguyen et al., Journal of Biomechanics, 2014) found the neck joint of the Allegheny mound ant can withstand loads of up to about 5,000 times the ant\'s body weight.'],
  setup,
  scenes: [
    { say: 'What if Gary was a superhero?', show: ['desk', 'wall', 'g', 'mask', 'cape'], sky: '#CFE0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); flap(w, t); } },
    { say: 'His cape? A tissue.', show: ['desk', 'wall', 'g', 'mask', 'cape'], sky: '#CFE0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [-2.6, 1.3, 4.6], look: [0, .7, 0], fov: 44, to: { pos: [-2.4, 1.3, 4.2], look: [0, .7, 0], fov: 42 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, 1.25 + .15 * Math.sin(t * 2), t); flap(w, t, .6); w.cape.scale.y = 1 + .05 * Math.sin(t * 7); } },
    { say: 'Flying? More like falling.', label: '*THUD*', show: ['desk', 'wall', 'g', 'mask', 'cape', 'books', 'lines'], sky: '#CFE0F5', lightAt: [0, 6, 3], lightDist: 18, shake: (t) => t > 1.1 && t < 1.4 ? .2 : 0,
      cam: { pos: [1, 2.2, 7], look: [.6, 1.1, 0], fov: 50, to: { pos: [1, 2.2, 6.4], look: [.6, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.cape.scale.y = 1; w.books.position.set(-1, 0, 0); const jump = t > .5, f = Math.max(0, t - .5); const x = jump ? -.4 + f * 2 : -.4, y = jump ? Math.max(0, 1.5 + 1.2 * f - 5 * f * f) : 1.5; gy(w, x, y, 0, 0, t, !jump); w.g.rotation.z = jump ? -Math.min(1.2, f * 2) : 0; flap(w, t * 2, .8); w.lines.children.forEach(l => { const i = l.userData.i; l.position.set(x - .3 + i * .15, y + .9 + ((t * 4 + i / 5) % 1) * .4, 0); l.visible = jump && y > .1; }); } },
    { say: 'His worst enemy? One mosquito.', label: 'BZZZ', show: ['desk', 'wall', 'g', 'mask', 'cape', 'mz'], sky: '#CFE0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.2, 5], look: [0, .9, 0], fov: 46, to: { pos: [0, 1.2, 4.5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, -.9, 0, 0, -.2, t); w.g.rotation.z = 0; flap(w, t); w.mz.position.set(.9 + .25 * Math.sin(t * 3), 1.3 + .2 * Math.sin(t * 5), .3 * Math.cos(t * 3)); w.mz.rotation.set(0, Math.PI + .2, 0); w.mzw.forEach((x, i) => x.rotation.x = (i ? 1 : -1) * .6 * Math.sin(t * 60)); w.g.position.x = -.9 - (p > .5 ? (p - .5) * 1.4 : 0); w.g.rotation.y = p > .5 ? Math.PI : -.2; if (p > .5) scurry(w.g, t, 20); } },
    { say: 'And his secret identity? Still just Gary.', label: 'TA-DA', show: ['desk', 'wall', 'g', 'mask', 'cape'], sky: '#CFE0F5', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.2], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 4.7], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .3, -1.4, t); flap(w, t); const off = p > .5; w.mask.position.set(.5, .43 + (off ? (p - .5) * 1.6 : 0), off ? .3 : 0); w.mask.rotation.z = off ? (p - .5) * 6 : 0; w.g.rotation.z = off ? .08 * Math.sin(t * 6) : 0; } },
    { say: 'Super Gary: brave, tiny, or totally super? Comment below.',
      quiz: { q: 'Super Gary is…', options: ['Brave', 'Tiny', 'Totally super'], answer: 'One study found an ant\'s neck can take about 5,000 times its body weight.' },
      show: ['desk', 'g', 'cape'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.mask.position.set(.5, .43, 0); w.mask.rotation.z = 0; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); flap(w, t); } },
  ],
};
