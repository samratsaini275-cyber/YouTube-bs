// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows an octopus taller than a house, waving arms.

function octo(k, parent) {
  const { mat, ball, cyl, group } = k;
  const pk = mat('#E86A8A', { rough: .7 }), sk = mat('#F6B8C8');
  const g = { root: group([0, 0, 0], parent) };
  g.head = group([0, 3.6, 0], g.root); const hd = ball(1.6, pk, [0, .6, 0], g.head); hd.scale.set(1, 1.25, 1);
  g.eyes = []; for (const x of [-1, 1]) { ball(.38, mat('#FFFFFF'), [x * .55, -.1, 1.25], g.head); const pu = ball(.18, mat('#111111'), [x * .55, -.1, 1.58], g.head); g.eyes.push(pu); }
  g.mouth = ball(.15, mat('#8A2A4A'), [0, -.65, 1.35], g.head); g.mouth.scale.set(1.6, .6, .5);
  g.arms = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const arm = group([Math.cos(a) * 1, 2.8, Math.sin(a) * 1], g.root); arm.rotation.y = -a; const segs = []; let par = arm; for (let j = 0; j < 5; j++) { const s = group(j ? [.55, 0, 0] : [0, 0, 0], par); const c = cyl(.32 - j * .05, .32 - j * .05, .6, pk, [.28, 0, 0], s, 8); c.rotation.z = Math.PI / 2; ball(.08, sk, [.28, -.25 + j * .03, 0], s); segs.push(s); par = s; } arm.userData.segs = segs; arm.userData.a = a; g.arms.push(arm); }
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
  w.oc = octo(k, k.scene); w.or = w.oc.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#3E6FD6'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.cars = group(); const cols = ['#E2453C', '#3E6FD6', '#F2C94C', '#3FA34D', '#FF5FA2', '#FFFFFF', '#7C5CC4', '#F28C28']; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const cr = group([Math.cos(a) * 6, 0, Math.sin(a) * 6], w.cars); cr.rotation.y = -a + Math.PI / 2; box(2.6, .9, 1.3, mat(cols[i]), [0, .65, 0], cr); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], cr); }
  w.bubbles = group(); for (let i = 0; i < 24; i++) { const b = ball(.3, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.bubbles); b.userData.i = i; b.castShadow = false; }
  w.beach = k.ground('#F2DFA8', 0); w.sea = box(60, .1, 30, mat('#3E8FCF', { glow: .1 }), [0, .06, -20]);
  w.ink = ball(1, mat('#1A1A22'), [0, 0, 0]); w.ink.scale.set(1, .15, 1);
  w.fake = group(); box(4, 3.4, 3.4, mat('#E86A8A'), [0, 1.7, 0], w.fake); const fr = cone(3.2, 2.2, mat('#E86A8A'), [0, 4.5, 0], w.fake, 4); fr.rotation.y = Math.PI / 4; for (const x of [-1, 1]) { ball(.45, mat('#FFFFFF'), [x * .8, 2.4, 1.72], w.fake); ball(.22, mat('#111111'), [x * .8, 2.4, 2.1], w.fake); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const ocAt = (w, x, y, z, ry, s) => { w.or.position.set(x, y, z); w.or.rotation.set(0, ry, 0); w.or.scale.setScalar(s); w.oc.head.rotation.set(0, 0, 0); w.oc.head.position.set(0, 3.6, 0); w.oc.mouth.scale.set(1.6, .6, .5); };
const wiggle = (w, t, amp = .25, lift = .35) => w.oc.arms.forEach((a, i) => a.userData.segs.forEach((s, j) => s.rotation.set(0, 0, (j === 0 ? -lift : 0) - amp * Math.sin(t * 3 + i + j * .7))));

export default {
  id: '366',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT OCTOPUSES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF OCTOPUSES', 'WERE GIANT?'],
  title: 'What would happen if octopuses were giant?',
  description: 'Eight arms: it washes eight cars at once. One spray of ink turns the beach black. And hide and seek? It pretends to be a house. Badly. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'octopus', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant octopuses are made up. Quiz fact: an octopus has three hearts and blue blood (Encyclopaedia Britannica, "octopus").'],
  setup,
  scenes: [
    { say: 'What if octopuses were giant?', show: ['ground', 'or', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 6.4, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 6.4, 0], fov: 54 } },
      update: (w, p, t) => { ocAt(w, -2.6, 0, -4, 0, 1.9); wiggle(w, t, .3); w.house.position.set(4.6, 0, -3); stand(w, 2.4, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Eight arms? It washes eight cars at once.', label: 'SCRUB SCRUB', show: ['ground', 'or', 'cars', 'bubbles'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 12, 20], look: [0, 3, 0], fov: 56, to: { pos: [0, 12, 19], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { ocAt(w, 0, 0, 0, 0, 1.5); w.oc.arms.forEach((a, i) => a.userData.segs.forEach((s, j) => s.rotation.set(0, .3 * Math.sin(t * 8 + i) * (j === 4 ? 1 : 0), j === 0 ? .25 : j === 1 ? .15 : .05))); w.bubbles.children.forEach(b => { const i = b.userData.i, a = (i % 8) / 8 * Math.PI * 2, q = (t * .8 + i / 24) % 1; b.position.set(Math.cos(a) * 6 + Math.sin(i) * .6, 1.6 + q * 2.4, Math.sin(a) * 6 + Math.cos(i) * .6); b.scale.setScalar(.5 + q); }); } },
    { say: 'One spray of ink? The beach turns black.', label: 'SPLURT', show: ['beach', 'sea', 'or', 'ink', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 22], look: [0, 3.6, 0], fov: 56, to: { pos: [3, 7, 21], look: [0, 3.6, 0], fov: 54 } },
      update: (w, p, t) => { ocAt(w, -2, 0, -6, 0, 1.3); wiggle(w, t, .2); const sq = Math.min(1, Math.max(0, (p - .3) * 2)); w.oc.mouth.scale.set(1.6, sq > 0 ? 1.8 : .6, .5); w.ink.position.set(0, .12, -1); w.ink.scale.set(.5 + sq * 12, .15, .5 + sq * 8); w.ink.visible = sq > 0; stand(w, 4, 4, -.4); pose(w.p, sq > .6 ? 2.4 : .4); w.p.mouth.scale.set(1.2, sq > .6 ? 3 : 1, 1); w.p.head.children[0].material.color.set(sq > .8 ? '#3A3A44' : '#F2C9A0'); } },
    { say: 'And hide and seek? It pretends to be a house. Badly.', label: 'HMM…', show: ['ground', 'house', 'fake', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 20], look: [0, 3, 0], fov: 56, to: { pos: [2, 5, 19], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.p.head.children[0].material.color.set('#F2C9A0'); w.house.position.set(-3.4, 0, -2); w.fake.position.set(2.6, 0, -2); w.fake.rotation.z = .02 * Math.sin(t * 3); w.fake.children.forEach((c, i) => { if (i >= 2 && i % 2 === 1) c.position.x = (i < 4 ? -.8 : .8) + .1 * Math.sin(t * 2); }); stand(w, 0, 4, 0); pose(w.p, .3); w.p.head.rotation.y = .6 * Math.sin(t * 1.5); } },
    { say: 'Giant octopuses: cool, cute, or way too wiggly? Comment below.',
      quiz: { q: 'Giant octopuses are…', options: ['Cool', 'Cute', 'Way too wiggly'], answer: 'Made up. But real octopuses have three hearts and blue blood.' },
      show: ['ground', 'or'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 4, 11], look: [0, 4, 0], fov: 54, to: { pos: [-3, 4, 11], look: [0, 4, 0] } },
      update: (w, p, t) => { ocAt(w, 0, 0, 0, 0, 1); wiggle(w, t, .3); } },
  ],
};
