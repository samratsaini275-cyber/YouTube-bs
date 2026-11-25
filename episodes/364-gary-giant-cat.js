// Narrative 20: "What Would Happen If… (season 10)" finale. Gary premise + giant cat (167 giant cats is the channel's top short, 592 views).
// Hook: the premise as a question under 2 s; first frame shows tiny Gary in front of a huge cat face.

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



function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#E6D2B0', 0);
  w.wall = group(); box(60, 30, .3, mat('#CFE3EE'), [0, 15, -8], w.wall);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.hearts = group(); for (let i = 0; i < 6; i++) { const h = group([0, 0, 0], w.hearts); ball(.18, mat('#FF5F8A', { glow: .6 }), [-.1, 0, 0], h); ball(.18, mat('#FF5F8A', { glow: .6 }), [.1, 0, 0], h); const tip = cone(.24, .3, mat('#FF5F8A', { glow: .6 }), [0, -.18, 0], h, 4); tip.rotation.z = Math.PI; h.userData.i = i; }
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = ball(.12, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.notes); n.userData.i = i; }
  w.puff = group(); for (let i = 0; i < 12; i++) { const s = ball(.25, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.puff); s.userData.i = i; s.castShadow = false; s.material.transparent = true; s.material.opacity = .8; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, z, ry, s) => { w.cr.position.set(x, 0, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); };

export default {
  id: '364',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY MEETS A GIANT CAT',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY MET', 'A GIANT CAT?'],
  title: 'What would happen if Gary the ant met a giant cat? (season finale)',
  description: 'Gary says hi. The cat thinks he is a toy. One sneeze later... they are best friends. Season finale. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'cat', 'giant', 'funny', 'shorts'],
  sources: ['Quiz fact: ants have a "social stomach" (the crop) that stores food to share with nestmates mouth to mouth, a behaviour called trophallaxis (LeBoeuf et al., "Oral transfer of chemical cues, growth proteins and hormones in social insects", eLife, 2016).'],
  setup,
  scenes: [
    { say: 'What if Gary met a giant cat?', show: ['floor', 'wall', 'g', 'cr'], sky: '#CFE3EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3.5, 2, 11], look: [0, 3.0, 0], fov: 56, to: { pos: [3.5, 2, 10.5], look: [0, 3.0, 0], fov: 54 } },
      update: (w, p, t) => { ctAt(w, -2.2, -2.5, -.9, 1.3); w.c.head.rotation.z = -.15 + .05 * Math.sin(t * 2); gy(w, 1.4, 0, 2.2, -1.9, t); w.g.scale.setScalar(1.6); w.g.rotation.z = .05 * Math.sin(t * 6); } },
    { say: 'Gary says hi. The cat thinks he is a toy.', label: 'BOP!', show: ['floor', 'wall', 'g', 'cr'], sky: '#CFE3EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [4, 2, 8], look: [0, 2.6, 0], fov: 56, to: { pos: [4, 2, 7.5], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { ctAt(w, -2.6, -1.5, -.5, 1.6); w.c.head.rotation.z = -.3; const bop = p > .45; const ph = Math.max(0, p - .45) * 6; w.c.paw.position.set(.8 + (bop ? Math.min(1, ph) * 1.6 : 0), .5 + (bop ? Math.sin(Math.min(1, ph) * Math.PI) * 1.2 : 0), .9); const fly = bop ? Math.max(0, ph - .6) : 0; gy(w, 1.6 + fly * 2.5, Math.sin(Math.min(1, fly) * Math.PI) * 1.6, 1.8, -1.9, t); w.g.rotation.z = bop ? fly * 6 : 0; if (!bop) { w.g.userData.legs[0].rotation.x = -.8 * Math.abs(Math.sin(t * 6)); } } },
    { say: 'So he climbs on its nose.', label: 'ACHOO!', show: ['floor', 'wall', 'g', 'cr', 'puff'], sky: '#CFE3EE', lightAt: [2, 10, 8], lightDist: 30, shake: (t) => t > 1 && t < 1.3 ? .15 : 0,
      cam: { pos: [3.6, 3.6, 6], look: [0, 3.6, 0], fov: 54, to: { pos: [3.6, 3.6, 5.5], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { ctAt(w, -2.2, -1, -.4, 1.6); w.cr.updateWorldMatrix(true, true); const nose = w.c.head.localToWorld(new w.k.THREE.Vector3(1.35, -.05, 0)); const sn = t > 1; w.c.head.rotation.z = sn ? -.25 : .1 * Math.min(1, t); if (!sn) gy(w, nose.x, nose.y + .05, nose.z, -1.6, t, true); else { const d = t - 1; gy(w, nose.x + d * 5, nose.y + d * 2 - d * d * 3, nose.z + d, -1.6, t); w.g.rotation.z = d * 8; } w.puff.children.forEach(s => { const i = s.userData.i, d = Math.max(0, t - 1); s.position.set(nose.x + .3 + d * (3 + i * .3), nose.y + Math.sin(i * 2) * d * 1.5, nose.z + Math.cos(i * 3) * d * 1.5); s.scale.setScalar(.5 + d * 2); s.visible = sn && d < 1.2; }); } },
    { say: 'And now? Best friends.', label: 'PURRRR', show: ['floor', 'wall', 'g', 'cr', 'hearts'], sky: '#CFE3EE', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [3, 3, 9], look: [0, 4.4, 0], fov: 56, to: { pos: [3, 3, 8.5], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { ctAt(w, -1.6, -1.5, -.6, 1.6); w.c.head.rotation.z = .1 * Math.sin(t * 2); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .3); w.cr.updateWorldMatrix(true, true); const top = w.c.head.localToWorld(new w.k.THREE.Vector3(0, 1.25, 0)); gy(w, top.x, top.y, top.z, -1.2, t); w.g.position.y += .05 * Math.abs(Math.sin(t * 4)); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .6 + i / 6) % 1; h.position.set(top.x - 1 + (i % 3) * 1, top.y + .6 + q * 2.4, top.z + .8); h.scale.setScalar(.6 + q * .6); }); } },
    { say: 'Gary and the giant cat: cute, chaotic, or totally lost? Comment below.',
      quiz: { q: 'Gary and the giant cat are…', options: ['Cute', 'Chaotic', 'Totally lost'], answer: 'Real ants have a "social stomach" just for sharing food with friends.' },
      show: ['floor', 'g'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.c.eyes.forEach(e => e.scale.y = 1); gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
