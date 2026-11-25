// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Giant-animal premise.
// Hook: the premise as a question under 2 s; first frame shows a glowing jellyfish bigger than a house floating over the sea.

function jelly(k, parent) {
  const { mat, ball, cyl, group } = k;
  const pk = mat('#F49AD8', { glow: .5 }), dk = mat('#C86AB8', { glow: .4 });
  const g = { root: group([0, 0, 0], parent) };
  g.bell = ball(2, pk, [0, 4, 0], g.root); g.bell.scale.set(1, .65, 1); g.bell.material.transparent = true; g.bell.material.opacity = .75;
  const rim = cyl(2, 2, .2, dk, [0, 3.6, 0], g.root, 24);
  for (const x of [-.6, .6]) { ball(.22, mat('#FFFFFF'), [x, 4.3, 1.75], g.root); ball(.11, mat('#111111'), [x, 4.3, 1.95], g.root); }
  g.mouth = ball(.15, mat('#8A2A6A'), [0, 3.85, 1.9], g.root); g.mouth.scale.set(2, .6, .5);
  g.tents = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const t = group([Math.cos(a) * 1.4, 3.5, Math.sin(a) * 1.4], g.root); const segs = []; let par = t; for (let j = 0; j < 5; j++) { const s = group(j ? [0, -.6, 0] : [0, 0, 0], par); const c = cyl(.12 - j * .015, .12 - j * .015, .65, dk, [0, -.3, 0], s, 6); segs.push(s); par = s; } t.userData.segs = segs; g.tents.push(t); }
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
  w.ground = k.ground('#F2DFA8', 0);
  w.sea = box(80, .1, 40, mat('#3E8FCF', { glow: .1 }), [0, .05, -22]);
  w.jf = jelly(k, k.scene); w.jr = w.jf.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.sign = group(); cyl(.1, .1, 3, mat('#7A5A3A'), [0, 1.5, 0], w.sign, 6); box(2.4, 1, .1, mat('#E2453C'), [0, 3, 0], w.sign); box(1.8, .2, .12, mat('#FFFFFF'), [0, 3, 0], w.sign);
  w.street = box(40, .05, 6, mat('#555B66'), [0, .03, 2]); w.houses = group(); for (let i = 0; i < 4; i++) { const h = group([-6 + i * 4, 0, -3], w.houses); box(3, 2.6, 2.6, mat('#E8D2B0'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.poles = group(); for (let i = 0; i < 3; i++) { const p = group([-4 + i * 4, 0, 0], w.poles); cyl(.1, .1, 5, mat('#444444'), [0, 2.5, 0], p, 6); const off = ball(.3, mat('#555555'), [0, 5.1, 0], p); }
  w.plate = cyl(5, 4.6, .3, mat('#FFFFFF'), [0, .15, 0], undefined, 32); w.spoon = group(); box(.5, .1, 3, mat('#C9D1D9', { metal: .8 }), [0, 0, 0], w.spoon); const sb = ball(.6, mat('#C9D1D9', { metal: .8 }), [0, 0, 1.8], w.spoon); sb.scale.y = .3;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const jfAt = (w, x, y, z, s) => { w.jr.position.set(x, y, z); w.jr.rotation.set(0, 0, 0); w.jr.scale.set(s, s, s); };
const sway = (w, t, a = .25) => { w.jf.tents.forEach((tt, i) => tt.userData.segs.forEach((s, j) => s.rotation.set(a * Math.sin(t * 2 + i + j * .6), 0, a * Math.cos(t * 2.3 + i + j * .5)))); w.jf.bell.scale.set(1 + .05 * Math.sin(t * 3), .65 - .05 * Math.sin(t * 3), 1 + .05 * Math.sin(t * 3)); };

export default {
  id: '381',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT JELLYFISH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF JELLYFISH', 'WERE GIANT?'],
  title: 'What would happen if jellyfish were giant?',
  description: 'The beach? Closed, it is sunbathing. At night? Free street lights. And the wobble? The world\'s biggest jelly. Please do not eat it. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'jellyfish', 'sea', 'giant', 'shorts'],
  sources: ['Comedy sketch: giant jellyfish are made up. Quiz fact: the jellyfish Turritopsis dohrnii can turn back into its young polyp stage when injured or stressed, which is why it is nicknamed the "immortal jellyfish" (Encyclopaedia Britannica, "immortal jellyfish").'],
  setup,
  scenes: [
    { say: 'What if jellyfish were giant?', show: ['ground', 'sea', 'jr', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [0, 8.6, 0], fov: 56, to: { pos: [1, 4, 20.5], look: [0, 8.6, 0], fov: 54 } },
      update: (w, p, t) => { jfAt(w, -1.5, 2 + .3 * Math.sin(t * 2), -6, 1.6); sway(w, t); stand(w, 2.6, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.4; } },
    { say: 'The beach? Closed. It is sunbathing.', label: 'BEACH CLOSED', show: ['ground', 'sea', 'jr', 'sign', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 22], look: [0, 2.6, 0], fov: 56, to: { pos: [3, 6, 21], look: [0, 2.6, 0], fov: 54 } },
      update: (w, p, t) => { jfAt(w, -1, -2.6, -2, 1.5); sway(w, t, .1); w.jr.scale.y = .9; w.sign.position.set(4, 0, 3); stand(w, 5.6, 4.6, -.6); pose(w.p, .6); w.p.head.rotation.y = -.5; } },
    { say: 'At night? Free street lights.', label: 'GLOW', show: ['ground', 'street', 'houses', 'poles', 'jr'], sky: '#141A33', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 22], look: [0, 5, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { jfAt(w, .5, 4 + .3 * Math.sin(t * 2), 0, 1.2); sway(w, t); w.jf.bell.material.emissiveIntensity = 1; } },
    { say: 'And the wobble? The world\'s biggest jelly. Please do not eat it.', label: 'WOBBLE', show: ['ground', 'plate', 'spoon', 'jr', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 7, 20], look: [0, 3, 0], fov: 56, to: { pos: [3, 7, 19], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.plate.position.set(0, 0, 0); jfAt(w, 0, -2.8, 0, 1.4); w.jr.scale.set(1.4 + .1 * Math.sin(t * 12), 1.4 - .12 * Math.sin(t * 12), 1.4 + .1 * Math.sin(t * 12)); sway(w, t, .05); w.spoon.position.set(4.6, 3.6 + .3 * Math.sin(t * 3), 2); w.spoon.rotation.set(.4, -.8, .3); stand(w, 6, 3, -.8); pose(w.p, 1.2, 1); w.p.mouth.scale.set(1.2, 2.2, 1); } },
    { say: 'Giant jellyfish: cool, cute, or way too wobbly? Comment below.',
      quiz: { q: 'Giant jellyfish are…', options: ['Cool', 'Cute', 'Way too wobbly'], answer: 'Made up. One real jellyfish can turn itself young again.' },
      show: ['ground', 'jr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 4, 10], look: [0, 3.6, 0], fov: 54, to: { pos: [-3, 4, 10], look: [0, 3.6, 0] } },
      update: (w, p, t) => { jfAt(w, 0, .4 * Math.sin(t * 2), 0, .9); sway(w, t); } },
  ],
};
