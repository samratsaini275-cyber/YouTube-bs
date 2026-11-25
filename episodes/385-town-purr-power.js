// Narrative 22: "In This Town… (short format, cats first)". The top short is 906 "In this town, cats say what you're thinking" (959 views at 20:06).
// Hook: the rule as a question-free statement under 2 s; first frame shows a purring cat lighting up a street lamp.

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
  w.street = box(40, .05, 5, mat('#555B66'), [0, .03, 2]);
  w.houses = group(); w.wins = []; for (let i = 0; i < 4; i++) { const h = group([-6 + i * 4, 0, -3], w.houses); box(3, 2.6, 2.6, mat(['#F2D9B8', '#F7D6E0', '#D8E8F0', '#F2E2A8'][i]), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; const wn = box(.8, .8, .05, mat('#FFE9A0', { glow: .9 }), [0, 1.5, 1.32], h); w.wins.push(wn); }
  w.lamps = []; w.poles = group(); for (let i = 0; i < 3; i++) { const p = group([-6 + i * 6, 0, -.8], w.poles); cyl(.1, .1, 4.6, mat('#333333'), [0, 2.3, 0], p, 6); const l = ball(.35, mat('#FFE9A0', { glow: 1 }), [0, 4.7, 0], p); w.lamps.push(l); }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.waves = group(); for (let i = 0; i < 3; i++) { const r = k.torus(.6, .04, mat('#FFE97A', { glow: .9 }), [0, 0, 0], w.waves); r.userData.i = i; }
  w.cloud = group(); for (let i = 0; i < 4; i++) ball(.5, mat('#555566'), [i * .6 - .9, 0, 0], w.cloud);
  w.people = group(); w.ppl = []; for (let i = 0; i < 3; i++) { const q = person(k, w.people, ['#E2453C', '#3FA34D', '#7C5CC4'][i]); q.root.position.set(-2.4 + i * 2.4, 0, 1.2); q.root.scale.setScalar(.6); w.ppl.push(q); }
  w.cats3 = []; for (let i = 0; i < 3; i++) { const cc = cat(k, w.people); cc.root.position.set(-1.7 + i * 2.4, 0, 1.7); cc.root.scale.setScalar(.35); cc.root.rotation.y = -1.2; w.cats3.push(cc); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const lights = (w, on) => { w.lamps.forEach(l => l.visible = on); w.wins.forEach(x => x.visible = on); };
const purr = (w, t, on) => { w.cr.updateWorldMatrix(true, true); const h = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); w.waves.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 3) % 1; r.rotation.set(0, 0, 0); r.position.set(h.x, h.y, h.z + .5); r.scale.setScalar((.5 + q * 2) * w.cr.scale.x); r.visible = on; }); };

export default {
  id: '385',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PURRING TOWN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'PURRING MAKES POWER'],
  title: 'In this town, purring powers the lights',
  description: 'A happy cat turns the street lights on. A grumpy cat? Power cut. So everyone\'s job is petting cats. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'whatif', 'shorts'],
  sources: ['Comedy sketch: purr-powered towns are made up. Quiz fact: cats can purr while breathing both in and out, which is why a purr sounds almost continuous (Remmers and Gautier, "Neural and mechanical mechanisms of feline purring", Respiration Physiology, 1972).'],
  setup,
  scenes: [
    { say: 'In this town, purring makes power.', show: ['ground', 'street', 'houses', 'poles', 'cr', 'waves'], sky: '#2A3150', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.5, 3.4, 12], look: [0, 3.2, 0], fov: 52, to: { pos: [1.4, 3.4, 11.3], look: [0, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { w.people.visible = false; ctAt(w, -.2, 0, 2.6, -1.2, .8); w.c.eyes.forEach(e => e.scale.y = .2); w.c.head.rotation.z = .1 * Math.sin(t * 2); lights(w, true); purr(w, t, true); } },
    { say: 'Happy cat? The street lights come on.', label: 'PRRRR', show: ['ground', 'street', 'houses', 'poles', 'cr', 'waves', 'pp'], sky: '#2A3150', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4.6, 15], look: [0, 3, 0], fov: 54, to: { pos: [2, 4.6, 14.5], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { ctAt(w, -1, 0, 2.6, -1.2, .7); const on = p > .3; lights(w, on); w.c.eyes.forEach(e => e.scale.y = on ? .2 : 1.4); purr(w, t, on); stand(w, 1.2, 2.6, -.6); w.pp.scale.setScalar(.8); pose(w.p, .8, 1.3); w.p.mouth.scale.set(1.2, on ? 2 : 1, 1); } },
    { say: 'Grumpy cat? Power cut.', label: 'HISSS', show: ['ground', 'street', 'houses', 'poles', 'cr', 'cloud', 'pp'], sky: '#0E1222', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4.6, 15], look: [0, 3, 0], fov: 54, to: { pos: [2, 4.6, 14.5], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.waves.children.forEach(r => r.visible = false); ctAt(w, -1, 0, 2.6, -1.2, .7); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .6 : .5); w.c.head.rotation.z = -.15; const off = p > .3; lights(w, !off); w.cr.updateWorldMatrix(true, true); const h = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); w.cloud.position.set(h.x, h.y + 1.3, h.z); w.cloud.scale.setScalar(.6); w.cloud.visible = off; stand(w, 1.2, 2.6, -.6); w.pp.scale.setScalar(.8); pose(w.p, off ? 2.4 : .4); w.p.mouth.scale.set(1.2, off ? 3 : 1, 1); } },
    { say: 'So everyone\'s job? Petting cats.', label: 'PET PET PET', show: ['ground', 'street', 'houses', 'poles', 'people'], sky: '#2A3150', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4, 14], look: [0, 1.8, 0], fov: 54, to: { pos: [0, 4, 13.5], look: [0, 1.8, 0], fov: 52 } },
      update: (w, p, t) => { w.cr.visible = false; w.cloud.visible = false; w.people.visible = true; lights(w, true); w.ppl.forEach((q, i) => { pose(q, .3, 1 + .3 * Math.sin(t * 6 + i)); q.mouth.scale.set(1.2, 1.6, 1); }); w.cats3.forEach((cc, i) => { cc.eyes.forEach(e => e.scale.y = .2); cc.head.rotation.z = .1 * Math.sin(t * 3 + i); }); } },
    { say: 'A purr-powered town: cool, cute, or way too fluffy? Comment below.',
      quiz: { q: 'A purr-powered town is…', options: ['Cool', 'Cute', 'Way too fluffy'], answer: 'Made up. Real cats can purr breathing in and out.' },
      show: ['ground', 'cr', 'waves'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { w.people.visible = false; ctAt(w, -.6, 0, 0, -.6, .8); w.c.eyes.forEach(e => e.scale.y = .2); purr(w, t, true); } },
  ],
};
