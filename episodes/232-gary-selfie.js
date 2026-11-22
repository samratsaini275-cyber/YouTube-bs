// Narrative 14: "Gary's Big World (season 2)". Gary the ant tries one human-sized thing; it goes wrong at ant scale.
// Hook rule: the premise as a statement under 2 s; first frame shows Gary posing in front of a giant phone.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E9E2D3', 0);
  w.wall = box(60, 30, .5, mat('#CFE3F0'), [0, 15, -6]); w.wall.castShadow = false;
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.phone = group(); box(3.2, 6.4, .35, mat('#1A1A1A', { rough: .3 }), [0, 3.2, 0], w.phone); w.screen = box(2.9, 5.8, .05, mat('#3B82F6', { glow: .5 }), [0, 3.2, .2], w.phone); cyl(.18, .18, .1, mat('#333333'), [0, 6.05, .2], w.phone, 16).rotation.x = Math.PI / 2;
  w.shot = group([0, 3.2, .23], w.phone); w.bigEye = ball(1.2, mat('#FFFFFF'), [0, 0, 0], w.shot); w.bigEye.scale.z = .2; w.pupil = ball(.6, mat('#111111'), [.2, 0, .15], w.shot); w.pupil.scale.z = .2; w.shot.visible = false;
  w.house = group(); box(1.2, 1, 1.2, mat('#C79A5B'), [0, .5, 0], w.house); const r = cone(1, .8, mat('#B3262E'), [0, 1.4, 0], w.house, 4); r.rotation.y = Math.PI / 4;
  w.flash = ball(.6, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], k.scene); w.flash.castShadow = false;
  w.thumb = group(); const th = box(2.4, 3, 2.4, mat('#F2C9A0'), [0, 0, 0], w.thumb); box(1.6, .1, 1.4, mat('#F7E1D0'), [0, 1.55, .3], w.thumb);
  w.prof = group([0, 4.6, .24], w.phone); cyl(1.2, 1.2, .05, mat('#F2C9A0'), [0, 0, 0], w.prof, 32).rotation.x = Math.PI / 2; const nail = cyl(.5, .5, .06, mat('#FBE3E3'), [0, .55, .03], w.prof, 24); nail.rotation.x = Math.PI / 2; nail.scale.set(1, 1, 1.3); w.prof.visible = false;
  w.likes = group(); for (let i = 0; i < 4; i++) { const h = group([0, 0, 0], w.likes); const m = mat('#FF4D6D', { glow: .7 }); ball(.14, m, [-.09, 0, 0], h); ball(.14, m, [.09, 0, 0], h); const c = cone(.19, .27, m, [0, -.15, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ph = (w, x, z, ry, rx = 0) => { w.phone.position.set(x, 0, z); w.phone.rotation.set(rx, ry, 0); w.shot.visible = false; w.prof.visible = false; w.screen.material.color.set('#3B82F6'); };

export default {
  id: '232',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SELFIE GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TOOK A SELFIE.'],
  title: 'Gary the ant took a selfie',
  description: 'The phone is bigger than his house. Every photo is just his eyeball. His new profile picture? A thumb. (A made-up comedy sketch.)',
  tags: ['gary', 'ant', 'selfie', 'phone', 'funny', 'shorts'],
  sources: [
    'Quiz fact: like other insects, ants have compound eyes made of many small lenses called ommatidia (Encyclopaedia Britannica, "compound eye").',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant took a selfie.',
      show: ['ground', 'wall', 'g', 'phone'], sky: '#CFE3F0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 1.8, 7], look: [.6, 1.15, 0], fov: 48, to: { pos: [2.8, 1.8, 6.4], look: [.6, 1.15, 0], fov: 46 } },
      update: (w, p, t) => { ph(w, -1, -1.2, .35); gy(w, 1, 0, .4, -1.2, t); w.g.rotation.z = .1 * Math.sin(t * 5); },
    },
    {
      say: 'The phone is bigger than his house.',
      show: ['ground', 'wall', 'g', 'phone', 'house'], sky: '#CFE3F0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2.4, 10], look: [.4, 1.9, 0], fov: 50, to: { pos: [2.8, 2.4, 9.2], look: [.4, 1.9, 0], fov: 48 } },
      update: (w, p, t) => { ph(w, -1, -1.2, .35); gy(w, .8, 0, .6, -1.2, t); w.house.position.set(2.2, 0, -.6); w.house.scale.setScalar(.7); },
    },
    {
      say: 'Every photo? Just his eyeball.',
      show: ['ground', 'wall', 'phone', 'flash'], sky: '#CFE3F0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [0, 3.2, 8], look: [0, 3.2, 0], fov: 46, to: { pos: [0, 3.2, 7.3], look: [0, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { ph(w, 0, 0, 0); w.shot.visible = true; w.screen.material.color.set('#111111'); w.pupil.position.x = .2 * Math.sin(t * 2); const f = (t * 1.3) % 1; w.flash.visible = f < .12; w.flash.position.set(0, 6.05, .5); },
    },
    {
      say: 'His new profile picture? A thumb.',
      show: ['ground', 'wall', 'phone', 'likes'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [0, 3.6, 8], look: [0, 3.6, 0], fov: 46, to: { pos: [0, 3.6, 7.3], look: [0, 3.6, 0], fov: 44 } },
      update: (w, p, t) => { ph(w, 0, 0, 0); w.prof.visible = true; w.screen.material.color.set('#FFFFFF'); w.likes.children.forEach(h => { const i = h.userData.i, q = (t * .6 + i / 4) % 1; h.position.set(.8 + (i % 2) * .5, 2 + q * 2.6, .4); h.scale.setScalar(Math.sin(q * Math.PI) * 1.6); }); },
    },
    {
      say: 'Gary\'s selfie pose: peace sign, duck face, or six legs up? Comment below.',
      quiz: { q: 'What should Gary\'s selfie pose be?', options: ['Peace sign', 'Duck face', 'Six legs up'], answer: 'Fun fact: an ant\'s eye is made of many tiny lenses, like a mosaic.' },
      show: ['ground', 'wall', 'g', 'phone'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3.4, 2, 6], look: [.6, 1.4, 0], fov: 48, to: { pos: [-1.4, 2, 6.4], look: [.6, 1.4, 0] } },
      update: (w, p, t) => { ph(w, -1, -1.2, .35); gy(w, 1, 0, .4, -1.3, t); },
    },
  ],
};
