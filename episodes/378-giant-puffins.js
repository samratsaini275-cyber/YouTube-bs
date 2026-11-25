// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows a puffin taller than a house.

function puffin(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const blk = mat('#1E1E24', { rough: .7 }), wht = mat('#F6F4EE'), org = mat('#F28C28');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1.2, blk, [0, 2.2, 0], g.body); b.scale.set(.9, 1.3, .9); const bl = ball(.9, wht, [.62, 2, 0], g.body); bl.scale.set(.55, 1.15, .78);
  g.wings = []; for (const z of [-1, 1]) { const wg = group([0, 2.6, z * .9], g.body); const m = ball(.7, blk, [0, -.4, 0], wg); m.scale.set(.6, 1.1, .25); g.wings.push(wg); }
  g.head = group([.2, 3.9, 0], g.body); ball(.75, blk, [0, 0, 0], g.head); const face = ball(.6, wht, [.36, -.05, 0], g.head); face.scale.set(.75, .95, 1.15);
  for (const z of [-1, 1]) { ball(.1, mat('#111111'), [.55, .15, z * .4], g.head); const ln = box(.25, .04, .04, mat('#E2453C'), [.6, .1, z * .42], g.head); ln.rotation.z = -.4; }
  g.beak = group([.72, -.1, 0], g.head); const bk = cone(.4, .8, org, [.3, 0, 0], g.beak, 4); bk.rotation.z = -Math.PI / 2; bk.scale.set(1, 1, .55); const stripe = cone(.42, .25, mat('#E8D24A'), [.05, 0, 0], g.beak, 4); stripe.rotation.z = -Math.PI / 2; stripe.scale.set(1, 1, .56); const tip = cone(.25, .35, mat('#D8322E'), [.62, 0, 0], g.beak, 4); tip.rotation.z = -Math.PI / 2; tip.scale.set(1, 1, .5);
  g.feet = []; for (const z of [-1, 1]) { const f = box(.6, .1, .45, org, [.2, .05, z * .4], g.body); g.feet.push(f); cyl(.08, .08, .6, org, [0, .35, z * .4], g.body, 6); }
  return g;
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
  w.sea = box(80, .1, 40, mat('#3E8FCF', { glow: .1 }), [0, .05, -28]);
  w.pf = puffin(k, k.scene); w.pr = w.pf.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); w.roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); w.roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.whale = group(); const wb = ball(1.2, mat('#5A7A9A'), [0, 0, 0], w.whale); wb.scale.set(2.2, .9, .9); const wt = cone(.7, 1, mat('#5A7A9A'), [-2.8, .2, 0], w.whale, 3); wt.rotation.z = Math.PI / 2; ball(.1, mat('#111111'), [2, .25, .75], w.whale);
  w.splash = group(); for (let i = 0; i < 12; i++) { const s = ball(.3, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; }
  w.road = box(40, .05, 6, mat('#555B66'), [0, .03, 3]);
  w.cars = group(); for (let i = 0; i < 3; i++) { const cr = group([-3 - i * 3.6, 0, 3], w.cars); box(2.6, .9, 1.3, mat(['#E2453C', '#3E6FD6', '#F2C94C'][i]), [0, .65, 0], cr); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], cr); }
  w.dust = group(); for (let i = 0; i < 10; i++) { const d = ball(.3, mat('#D8C8A0'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const pfAt = (w, x, y, z, ry, s) => { w.pr.position.set(x, y, z); w.pr.rotation.set(0, ry, 0); w.pr.scale.setScalar(s); w.pf.body.rotation.set(0, 0, 0); w.pf.head.rotation.set(0, 0, 0); w.pf.wings.forEach(g => g.rotation.set(0, 0, 0)); };
const flap = (w, t, f = 16) => w.pf.wings.forEach((g, i) => g.rotation.x = (i ? -1 : 1) * 1.1 * Math.sin(t * f));

export default {
  id: '378',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT PUFFINS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PUFFINS', 'WERE GIANT?'],
  title: 'What would happen if puffins were giant?',
  description: 'Fishing? It catches a whole whale. Landing? Not its best skill. And that beak? Brighter than a traffic light. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'puffin', 'bird', 'giant', 'shorts'],
  sources: ['Comedy sketch: giant puffins are made up. Quiz fact: an Atlantic puffin\'s bright beak is only that colourful in the breeding season; afterwards it sheds the colourful outer plates and the beak looks smaller and duller in winter (Audubon Project Puffin, "Atlantic Puffin").'],
  setup,
  scenes: [
    { say: 'What if puffins were giant?', show: ['ground', 'sea', 'pr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 9.3, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 9.3, 0], fov: 54 } },
      update: (w, p, t) => { pfAt(w, -2.8, 0, -4, -1.1, 2.3); w.pf.head.rotation.z = .08 * Math.sin(t * 3); w.house.position.set(4.6, 0, -3); w.house.rotation.set(0, 0, 0); w.roof.scale.set(1, 1, 1); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'Fishing? It catches a whole whale.', label: 'SPLOOSH', show: ['ground', 'sea', 'pr', 'whale', 'splash'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 20], look: [0, 4, -8], fov: 56, to: { pos: [3, 7, 19], look: [0, 4, -8], fov: 54 } },
      update: (w, p, t) => { const up = Math.max(0, p - .4) * 2.5; pfAt(w, -1, -3 + Math.min(1, up) * 6, -10, 0, 1.4); if (up > 0) flap(w, t); w.pr.updateWorldMatrix(true, true); const bk = w.pf.beak.getWorldPosition(new w.k.THREE.Vector3()); w.whale.position.set(bk.x + 1.6, bk.y - .6, bk.z); w.whale.rotation.z = -.3 + .1 * Math.sin(t * 8); w.whale.visible = up > 0; w.pr.visible = up > 0 || p > .35; w.splash.children.forEach(s => { const i = s.userData.i, q = Math.max(0, up), a = i / 12 * Math.PI * 2; s.position.set(-1 + Math.cos(a) * q * 4, .2 + q * 3 - q * q * 2.5, -10 + Math.sin(a) * q * 2); s.visible = up > 0 && s.position.y > 0; }); } },
    { say: 'Landing? Not its best skill.', label: 'CRASH!', show: ['ground', 'pr', 'house', 'dust'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1 && t < 1.4 ? .3 : 0,
      cam: { pos: [2, 6, 22], look: [0, 4, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { w.whale.visible = false; w.pr.visible = true; w.house.position.set(1, 0, -1); const q = Math.min(1, t / 1); pfAt(w, -8 + q * 8.6, 9 - q * 5.4, -1, 0, 1.2); if (t < 1) flap(w, t); else { w.pf.body.rotation.z = -.7; w.pf.wings.forEach((g, i) => g.rotation.x = (i ? -1 : 1) * 1.4); } w.house.rotation.z = t > 1 ? .08 : 0; w.roof.scale.set(1, t > 1 ? .5 : 1, 1); w.dust.children.forEach(d => { const i = d.userData.i, s = Math.max(0, t - 1), a = i / 10 * Math.PI * 2; d.position.set(1 + Math.cos(a) * s * 4, 3.5 + s * 2, -1 + Math.sin(a) * s * 2); d.scale.setScalar(.5 + s * 2); d.visible = t > 1 && s < 1.2; }); } },
    { say: 'And that beak? Brighter than a traffic light.', label: 'STOP', show: ['ground', 'road', 'pr', 'cars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 20], look: [0, 4, 0], fov: 56, to: { pos: [2, 5, 19], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { w.house.rotation.z = 0; w.roof.scale.set(1, 1, 1); pfAt(w, 4, 0, -1, -1.4, 1.3); w.pf.head.rotation.z = .1 * Math.sin(t * 2); w.cars.children.forEach((c, i) => { c.position.x = Math.min(-1.5 - i * 3.6, -8 - i * 3.6 + p * 12); }); } },
    { say: 'Giant puffins: cool, cute, or way too clumsy? Comment below.',
      quiz: { q: 'Giant puffins are…', options: ['Cool', 'Cute', 'Way too clumsy'], answer: 'Made up. Real puffins shed their colourful beak plates every winter.' },
      show: ['ground', 'pr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [6, 3.5, 8], look: [0, 3, 0], fov: 54, to: { pos: [8, 3.5, 2], look: [0, 3, 0] } },
      update: (w, p, t) => { pfAt(w, 0, 0, 0, -.6, 1); w.pf.head.rotation.z = .08 * Math.sin(t * 3); } },
  ],
};
