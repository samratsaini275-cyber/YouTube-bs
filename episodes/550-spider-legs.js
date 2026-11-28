// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears.
// Hook: the premise as a question under 2 s; first frame shows a person standing on eight spider legs.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

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

// Eight thin jointed spider legs replace the person's lower body.
function spiderLegs(k, p) { const blk = k.mat('#2C2C2C'); p.legs = []; for (let i = 0; i < 8; i++) { const side = i < 4 ? -1 : 1, n = i % 4; const L = k.group([side * .5, .4, -.45 + n * .3], p.root); const up = k.cyl(.07, .06, 1.4, blk, [side * .55, .5, 0], L, 6); up.rotation.z = -side * 1.0; const lo = k.cyl(.06, .04, 1.5, blk, [side * 1.3, -.1, 0], L, 6); lo.rotation.z = side * .35; L.userData = { side, n }; p.legs.push(L); } }
const scuttle = (p, t, sp = 20) => p.legs.forEach(L => { L.rotation.y = .35 * Math.sin(t * sp + L.userData.n * 1.6 + (L.userData.side > 0 ? Math.PI : 0)); L.rotation.x = .15 * Math.abs(Math.sin(t * sp + L.userData.n)); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wallM = mat('#EBDEF0'); w.wall = group(); box(40, 20, .5, w.wallM, [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#7D3C98'); w.pp = w.p.root; spiderLegs(k, w.p);
  w.p.root.children[0].scale.set(1, .6, 1); w.p.root.children[0].position.y = 2.1;
  w.shoes = group(); const cols = ['#E74C3C', '#3498DB', '#F1C40F', '#2ECC71']; for (let i = 0; i < 8; i++) { const sh = group([((i % 4) - 1.5) * .9, Math.floor(i / 4) * .45, 0], w.shoes); box(.7, .35, .35, mat(cols[i % 4]), [0, .18, 0], sh); box(.72, .08, .37, mat('#FDFEFE'), [0, .04, 0], sh); }
  w.clock = group(); cyl(.5, .5, .08, mat('#FDFEFE'), [0, 0, 0], w.clock, 24).rotation.x = Math.PI / 2; w.hand = box(.04, .4, .02, mat('#111111'), [0, .15, .06], w.clock); w.clock.position.set(2.4, 4.4, -4.6);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  return w;
}

const stand = (w, x, y, z, ry) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const gy = (w, x, y, z, ry, t, move = false) => { w.g.visible = true; w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const env = { sky: '#EBDEF0', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '550',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SPIDER LEGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'SPIDER LEGS?'],
  title: 'What would happen if we had spider legs?',
  description: 'Running late? Eight legs, no problem. New shoes? Buy eight. Climbing walls? Easy. And Gary the ant is jealous. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'spider', 'legs', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human spider legs are made up. Quiz fact: spiders are arachnids that differ from insects in having eight legs rather than six and a body divided into two parts rather than three; there are more than 51,500 species (Encyclopaedia Britannica, "Spider").'],
  setup,
  scenes: [
    { say: 'What if we had spider legs?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 4, 9], look: [0, 2.6, 0], fov: 52, to: { pos: [0, 4, 8.4], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'shoes', 'clock'); w.g.visible = false; w.wallM.color.set('#EBDEF0'); stand(w, 0, .6, 0, -.3); pose(w.p, .4); scuttle(w.p, t, 6); w.p.mouth.scale.set(1.2, 1.6, 1); } },
    { say: 'Running late? Eight legs, no problem.', show: ['floor', 'wall', 'pp', 'clock'], ...env,
      cam: { pos: [0, 3, 10], look: [0, 2.4, 0], fov: 52, to: { pos: [0, 3, 9.4], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'shoes'); w.g.visible = false; stand(w, -3 + p * 6, .6, 0, -Math.PI / 2); pose(w.p, .6, -.4); scuttle(w.p, t, 30); w.hand.rotation.z = -t * 3; } },
    { say: 'New shoes? Buy eight.', show: ['floor', 'wall', 'shoes'], ...env,
      cam: { pos: [0, 2.2, 7], look: [0, .5, 0], fov: 48, to: { pos: [0, 2.2, 6.5], look: [0, .5, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'pp', 'clock'); w.g.visible = false; w.shoes.position.set(0, 0, 0); w.shoes.children.forEach((s, i) => s.visible = p > i / 10); } },
    { say: 'Climbing walls? Easy.', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 3.6, 7], look: [0, 3.4, -3], fov: 54, to: { pos: [0, 4, 6.6], look: [0, 4, -3], fov: 52 } },
      update: (w, p, t) => { hide(w, 'shoes', 'clock'); w.g.visible = false; w.pp.position.set(0, .8 + p * 2.6, -3.9); w.pp.rotation.set(0, 0, 0); pose(w.p, .5); scuttle(w.p, t, 18); } },
    { say: 'And Gary? Finally, someone with more legs.', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 3, 9.5], look: [0, 2.2, 0], fov: 52, to: { pos: [0, 3, 9], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'shoes', 'clock'); stand(w, -1.2, .6, 0, .4); pose(w.p, .4); scuttle(w.p, t, 8); gy(w, 1.5, 0, 1.2, -2.6, t, true); w.g.rotation.z = .15 * Math.sin(t * 4); w.g.scale.setScalar(1.5); } },
    { say: 'Spider legs: handy, creepy, or way too many? Comment below.',
      quiz: { q: 'Would you want spider legs?', options: ['Handy', 'Creepy', 'Way too many'], answer: 'Fun fact: spiders have eight legs, but insects like ants have six.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.5, 9], look: [0, 2.8, 0], fov: 50, to: { pos: [-1, 1.5, 9], look: [0, 2.8, 0] } },
      update: (w, p, t) => { hide(w, 'shoes', 'clock', 'wall'); w.g.visible = false; stand(w, 0, .6, 0, .2 + Math.sin(t * 2) * .3); pose(w.p, .4); scuttle(w.p, t, 6); } },
  ],
};
