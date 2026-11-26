// Narrative 22: "In This Town… (short format, cats first)". Gary episode (every fifth: 389, 394, 399, 404); Gary shorts are the third-best format (168 Gary could fly: 121).
// Hook: the rule under 2 s; first frame shows Gary in a mayor's sash on a tiny podium.

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





function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.hall = group(); box(10, 6, 4, mat('#E8DCC8'), [0, 3, -4], w.hall); for (let i = 0; i < 4; i++) cyl(.3, .3, 5, mat('#FFFFFF'), [-3.6 + i * 2.4, 2.5, -1.8], w.hall, 12); const pd = cone(5.6, 1.6, mat('#B3262E'), [0, 6.8, -4], w.hall, 4); pd.rotation.y = Math.PI / 4;
  w.g = gary(k, k.scene, 1.3, null);
  w.sash = cyl(.25, .25, .06, mat('#E2453C'), [0, .32, 0], w.g, 16); w.sash.rotation.z = .6;
  w.podium = group(); box(1, .9, .7, mat('#7A4E2E'), [0, .45, 0], w.podium); w.mic = group(); cyl(.02, .02, .5, mat('#333333'), [0, .25, 0], w.mic, 6); ball(.06, mat('#222222'), [0, .52, 0], w.mic);
  w.crowd = group(); w.ppl = []; for (let i = 0; i < 4; i++) { const q = person(k, w.crowd, ['#3B6FD6', '#E2453C', '#3FA34D', '#7C5CC4'][i]); const px = [-4.2, -2.6, 2.6, 4.2][i], pz = [1.6, 2.6, 2.6, 1.6][i]; q.root.position.set(px, 0, pz); q.root.rotation.y = Math.atan2(-px, -pz); q.root.scale.setScalar(.8); w.ppl.push(q); }
  w.sign = group(); box(2.8, 1.4, .1, mat('#FFF8E8'), [0, 0, 0], w.sign); for (let i = 0; i < 3; i++) box(2 - i * .4, .12, .12, mat('#333333'), [0, .35 - i * .3, .06], w.sign); cyl(.06, .06, 2, mat('#7A5A3A'), [0, -1.4, 0], w.sign, 6);
  w.crumbs = group(); for (let i = 0; i < 10; i++) { const cb = ball(.15, mat('#C98B3E'), [0, 0, 0], w.crumbs); cb.userData.i = i; }
  w.plinth = group(); box(2.4, 2, 2.4, mat('#BBBBBB'), [0, 1, 0], w.plinth); w.statue = gary(k, w.plinth, .25, null); w.statue.position.set(0, 2, 0); w.statue.traverse(o => { if (o.material) o.material = mat('#9A9AA2', { metal: .4 }); });
  w.glassP = group(); const rim = k.torus(.45, .05, mat('#333333'), [0, 0, 0], w.glassP); rim.rotation.set(0, 0, 0); cyl(.05, .05, .8, mat('#7A5A3A'), [0, -.85, 0], w.glassP, 6);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '389',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'MAYOR GARY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'THE MAYOR IS GARY'],
  title: 'In this town, Gary the ant is the mayor',
  description: 'His big speech? Nobody can hear it. His first new law: crumbs belong to everyone. And his statue? Life size. (A made-up comedy sketch.)',
  tags: ['inthistown', 'gary', 'ant', 'mayor', 'funny', 'shorts'],
  sources: ['Quiz fact: an ant colony has a queen, but she does not give orders; the colony\'s work is organised by simple interactions between workers (Deborah M. Gordon, "Ant Encounters: Interaction Networks and Colony Behavior", Princeton University Press, 2010).'],
  setup,
  scenes: [
    { say: 'In this town, the mayor is Gary.', show: ['ground', 'hall', 'g', 'sash', 'podium', 'mic'], sky: '#9ED2F3', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1.2, 1.8, 5.6], look: [0, 1.55, 0], fov: 46, to: { pos: [1.1, 1.8, 5], look: [0, 1.55, 0], fov: 44 } },
      update: (w, p, t) => { w.crowd.visible = false; w.podium.position.set(0, 0, 0); w.mic.position.set(.2, .9, .2); gy(w, -.1, .9, 0, -1.4, t); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'His big speech? Nobody can hear it.', label: 'WHAT?', show: ['ground', 'hall', 'g', 'sash', 'podium', 'mic', 'crowd'], sky: '#9ED2F3', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [0, 3, 10], look: [0, 1.4, 0], fov: 54, to: { pos: [0, 3, 9.5], look: [0, 1.4, 0], fov: 52 } },
      update: (w, p, t) => { w.crowd.visible = true; gy(w, -.1, .9, 0, -1.4, t); w.g.position.y = .9 + .05 * Math.abs(Math.sin(t * 8)); w.ppl.forEach((q, i) => { pose(q, .3, 0); q.arms[i % 2].rotation.set(-1.8, 0, q.arms[i % 2].userData.s * .3); q.head.rotation.z = .2 * Math.sin(t * 2 + i); }); } },
    { say: 'His first new law? Crumbs belong to everyone.', label: 'YUM', show: ['ground', 'hall', 'g', 'sash', 'sign', 'crumbs'], sky: '#9ED2F3', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [1, 2.2, 6], look: [0, 1.2, 0], fov: 50, to: { pos: [1, 2.2, 5.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.crowd.visible = false; w.sign.position.set(-1, 2.2, -.5); gy(w, .6, 0, .8, -1.2, t, true); w.crumbs.children.forEach(cb => { const i = cb.userData.i, q = (t * .6 + i / 10) % 1; cb.position.set(-2 + (i * .47) % 4, 3 - q * 3, 1 + (i % 3) * .3); }); } },
    { say: 'His statue? Life size.', label: 'WHERE?', show: ['ground', 'hall', 'plinth', 'crowd', 'glassP'], sky: '#9ED2F3', lightAt: [2, 10, 8], lightDist: 30,
      cam: { pos: [0, 3.4, 10], look: [0, 2, 0], fov: 54, to: { pos: [0, 3.4, 9.5], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.g.visible = false; w.crowd.visible = true; w.plinth.position.set(0, 0, 0); w.ppl.forEach((q, i) => { pose(q, .3, 1); q.head.rotation.x = .3; }); w.glassP.position.set(.4 + .2 * Math.sin(t * 2), 2.5, 1.4); w.glassP.visible = p > .4; } },
    { say: 'Is Gary a good mayor? Comment below.',
      quiz: { q: 'Mayor Gary is…', options: ['The best', 'Tiny', 'Too quiet'], answer: 'Real ant colonies have a queen, but she doesn\'t give orders.' },
      show: ['ground', 'g', 'sash'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.crowd.visible = false; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
