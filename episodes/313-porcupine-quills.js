// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have quills. Hook: the premise as a question under 2 s; first frame shows a person covered in porcupine quills.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#F2E6D0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3FA34D'); w.pp = w.p.root;
  const qm = mat('#F5F0E6'), qt = mat('#3A2A1A');
  w.quills = group([0, 0, 0], w.pp); w.ql = [];
  const add = (parent, x, y, z, rx, rz) => { const q = group([x, y, z], parent); cyl(.025, .045, .9, qm, [0, .45, 0], q, 5); cone(.04, .18, qt, [0, .98, 0], q, 5); q.rotation.set(rx, 0, rz); q.userData.base = [rx, rz]; w.ql.push(q); return q; };
  for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2 + (i % 2) * .12, y = 1.1 + (i % 4) * .45; add(w.quills, Math.sin(a) * .8, y, Math.cos(a) * .8 - .05, Math.cos(a) * 1.1 - .2, -Math.sin(a) * 1.1); }
  for (let i = 0; i < 12; i++) { const a = -1.3 + i / 11 * 2.6; add(w.p.head, Math.sin(a) * .55, .45, -Math.cos(a) * .4 - .1, -1 + Math.cos(a) * .2, -Math.sin(a) * .9); }
  w.f = person(k, k.scene, '#E2453C'); w.fr = w.f.root;
  w.balloons = group(); w.bl = []; const cols = ['#E2453C', '#3B6FD6', '#F2B21F', '#FF5FA2']; for (let i = 0; i < 4; i++) { const b = group([0, 0, 0], w.balloons); const bb = ball(.45, mat(cols[i], { rough: .3 }), [0, 0, 0], b); bb.scale.y = 1.2; cyl(.01, .01, 1.4, mat('#FFFFFF'), [0, -1.2, 0], b, 4); b.userData.i = i; w.bl.push(b); }
  w.bits = group(); for (let i = 0; i < 12; i++) { const c = box(.12, .12, .02, mat(cols[i % 4]), [0, 0, 0], w.bits); c.userData.i = i; c.castShadow = false; }
  w.sofa = group(); const sm = mat('#6A4FC4'); box(4, .9, 1.6, sm, [0, .9, 0], w.sofa); box(4, 1.4, .4, sm, [0, 1.8, -.6], w.sofa); for (const x of [-2, 2]) box(.4, 1.3, 1.6, sm, [x, 1.1, 0], w.sofa);
  w.fluff = group(); for (let i = 0; i < 10; i++) { const f = ball(.12, mat('#FFFFFF'), [0, 0, 0], w.fluff); f.userData.i = i; f.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); };
const bristle = (w, a) => w.ql.forEach(q => { const [rx, rz] = q.userData.base; q.rotation.set(rx * a, 0, rz * a); });

export default {
  id: '313',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PORCUPINE QUILLS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD QUILLS?'],
  title: 'What would happen if humans had porcupine quills?',
  description: 'Hugs? Ouch. Birthday balloons? Pop, pop, pop. And your sofa? Full of holes. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'porcupine', 'quills', 'comedy', 'shorts'],
  sources: ['Comedy sketch: quills on people are made up. Quiz fact: porcupines cannot shoot their quills; the quills come loose easily and stick into anything that touches them (Encyclopaedia Britannica, "porcupine").'],
  setup,
  scenes: [
    { say: 'What if humans had quills?', show: ['floor', 'wall', 'pp', 'quills'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.2, 10.5], look: [0, 4.4, 0], fov: 50, to: { pos: [0, 3.2, 9.8], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .5); bristle(w, 1 + .15 * Math.sin(t * 6)); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Hugs? Ouch.', label: 'OUCH!', show: ['floor', 'wall', 'pp', 'quills', 'fr'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14, shake: (t) => t > .7 && t < 1 ? .15 : 0,
      cam: { pos: [0, 3.6, 10], look: [0, 3.4, 0], fov: 50, to: { pos: [0, 3.6, 9.3], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { bristle(w, 1); const hit = t > .7; stand(w, -1, 0, .9); pose(w.p, .5); const fx = hit ? 2.6 + Math.min(1, (t - .7) * 3) * 1.2 : 2.6 - Math.min(t, .7) / .7 * 1.4; w.fr.position.set(fx, hit ? .4 * Math.abs(Math.sin((t - .7) * 10)) : 0, 0); w.fr.rotation.set(0, -.9, 0); w.f.arms.forEach(a => a.rotation.set(hit ? -2.6 : -1.3, 0, a.userData.s * (hit ? .3 : -.3))); w.f.mouth.scale.set(1.3, hit ? 3 : 1, 1); w.f.eyes.forEach(e => e.scale.setScalar(hit ? 1.6 : 1)); w.p.mouth.scale.set(1.2, hit ? 2 : 1, 1); } },
    { say: 'Birthday balloons? Pop, pop, pop.', label: 'POP!', show: ['floor', 'wall', 'pp', 'quills', 'balloons', 'bits'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 10], look: [0, 3.8, 0], fov: 50, to: { pos: [0, 3.6, 9.3], look: [0, 3.8, 0], fov: 48 } },
      update: (w, p, t) => { w.f.mouth.scale.set(1, 1, 1); w.f.eyes.forEach(e => e.scale.setScalar(1)); stand(w, 0, 0, 0); pose(w.p, .5); bristle(w, 1); w.bl.forEach(b => { const i = b.userData.i, popAt = .25 + i * .18; b.position.set(-1.6 + i * 1.05, 5.2 + .15 * Math.sin(t * 2 + i), .6); b.visible = p < popAt; }); w.bits.children.forEach(c => { const i = c.userData.i, b = i % 4, popAt = .25 + b * .18, q = Math.max(0, p - popAt) * 6; c.position.set(-1.6 + b * 1.05 + Math.cos(i) * q, 5.2 + Math.sin(i * 2) * q, .6); c.rotation.set(t * 5 + i, t * 3, 0); c.visible = q > 0 && q < 2; }); w.p.eyes.forEach(e => e.scale.set(1, p > .5 ? .4 : 1, 1)); } },
    { say: 'And your sofa? Full of holes.', show: ['floor', 'wall', 'pp', 'quills', 'sofa', 'fluff'], sky: '#F2E6D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2, 3.6, 10], look: [0, 2.6, 0], fov: 50, to: { pos: [1.8, 3.6, 9.3], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.position.set(0, 0, -.6); const sit = Math.min(1, p * 2.5); stand(w, 0, -.2, 0); w.pp.position.y = 1 - sit * .1; w.pp.scale.y = 1; pose(w.p, .5); bristle(w, 1); w.fluff.children.forEach(f => { const i = f.userData.i, q = (t * .8 + i / 10) % 1; f.position.set(-1.6 + (i * .41) % 3.2, 1.8 + q * 2.5, -.2 + (i % 3) * .3); f.visible = sit >= 1; }); w.p.mouth.scale.set(1.2, sit >= 1 ? 2 : 1, 1); } },
    { say: 'Human quills: useful, spiky, or way too pointy? Comment below.',
      quiz: { q: 'Would you want quills?', options: ['Useful', 'Spiky', 'Way too pointy'], answer: 'Made up for people. Real porcupines cannot shoot quills; they just come loose.' },
      show: ['floor', 'pp', 'quills'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 13], look: [0, 4.6, 0], fov: 56, to: { pos: [-1, 1.2, 13], look: [0, 4.6, 0] } },
      update: (w, p, t) => { w.pp.position.y = 0; stand(w, 0, 0, .2); pose(w.p, .5); bristle(w, 1); } },
  ],
};
