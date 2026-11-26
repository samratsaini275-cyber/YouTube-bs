// Narrative 22: "In This Town… (short format, cats first)". In This Town titles are the channel's top format (906: 968 views at 23:07).
// Hook: the rule under 2 s; first frame shows yellow lemonade rain falling on a street.

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
  w.houses = group(); for (let i = 0; i < 4; i++) { const h = group([-6 + i * 4, 0, -3], w.houses); box(3, 2.6, 2.6, mat(['#F2D9B8', '#F7D6E0', '#D8E8F0', '#F2E2A8'][i]), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.rain = group(); for (let i = 0; i < 40; i++) { const d = ball(.08, mat('#F7E05A', { glow: .5 }), [0, 0, 0], w.rain); d.scale.y = 1.8; d.userData.i = i; d.castShadow = false; }
  w.lemons = group(); for (let i = 0; i < 4; i++) { const l = ball(.25, mat('#F2D33C'), [0, 0, 0], w.lemons); l.scale.set(1.3, 1, 1); l.userData.i = i; }
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.puddle = cyl(1.4, 1.4, .04, mat('#F2D33C', { glow: .3 }), [0, .05, 0], undefined, 24);
  w.shoe = group(); w.umb = group(); const ub = cone(1.3, .7, mat('#E2453C'), [0, 0, 0], w.umb, 10); cyl(.04, .04, 1.6, mat('#333333'), [0, .8, 0], w.umb, 6);
  w.glassC = group(); const gl = cyl(.3, .25, .7, mat('#BFE3F7', { glow: .2 }), [0, .35, 0], w.glassC, 14); gl.material.transparent = true; gl.material.opacity = .5; w.fill = cyl(.27, .23, .1, mat('#F7E05A', { glow: .4 }), [0, .1, 0], w.glassC, 14);
  w.bees = group(); for (let i = 0; i < 6; i++) { const b = group([0, 0, 0], w.bees); const bb = ball(.18, mat('#F2C94C'), [0, 0, 0], b); bb.scale.x = 1.4; box(.08, .36, .38, mat('#222222'), [0, 0, 0], b); for (const z of [-1, 1]) { const wg = ball(.12, mat('#FFFFFF', { glow: .4 }), [0, .15, z * .12], b); wg.scale.set(1, .4, 1.4); } b.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry, s = 1) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(s); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.pp.visible = true; };
const rainOn = (w, t, on = true) => w.rain.children.forEach(d => { const i = d.userData.i, q = (t * 1.3 + i / 40) % 1; d.position.set(-6 + (i * 1.37) % 12, 9 - q * 9, -1 + (i % 5) * 1.3); d.visible = on; });

export default {
  id: '393',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LEMONADE RAIN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'IT RAINS LEMONADE'],
  title: 'In this town, it rains lemonade',
  description: 'Puddles? Very sticky. Umbrellas? Turned upside down to catch a drink. And the bees? Thrilled. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'rain', 'lemonade', 'whatif', 'shorts'],
  sources: ['Comedy sketch: lemonade rain is made up. Quiz fact: raindrops are not teardrop-shaped; small drops are nearly round, and larger ones flatten on the bottom as they fall, more like a hamburger bun (NASA Global Precipitation Measurement mission, "Anatomy of a Raindrop").'],
  setup,
  scenes: [
    { say: 'In this town, it rains lemonade.', show: ['ground', 'street', 'houses', 'rain', 'pp', 'lemons'], sky: '#F2E6A0', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.5, 3.4, 13], look: [0, 3.6, 0], fov: 52, to: { pos: [1.4, 3.4, 12.3], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { rainOn(w, t); stand(w, 0, 2.4, 0); pose(w.p, 2.4, 0); w.p.mouth.scale.set(1.2, 3, 1); w.p.head.rotation.x = -.4; w.lemons.children.forEach(l => { const i = l.userData.i, q = (t * .9 + i / 4) % 1; l.position.set(-3 + i * 2, 8 - q * 8, 1); l.rotation.z = t * 3 + i; }); } },
    { say: 'Puddles? Very sticky.', label: 'SQUELCH', show: ['ground', 'street', 'houses', 'rain', 'pp', 'puddle'], sky: '#F2E6A0', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 12.5], look: [0, 2.2, 0], fov: 52, to: { pos: [2, 3.6, 12], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { w.lemons.visible = false; rainOn(w, t); w.puddle.position.set(0, .05, 2); stand(w, 0, 2, -.3); const stuck = p > .3; w.pp.rotation.x = stuck ? .15 * Math.sin(t * 6) : 0; pose(w.p, stuck ? 1.4 : .3, stuck ? .8 : 0); w.p.mouth.scale.set(1.2, stuck ? 2.6 : 1, 1); } },
    { say: 'Umbrellas? Upside down, to catch a drink.', label: 'SLURP', show: ['ground', 'street', 'houses', 'rain', 'pp', 'umb', 'glassC'], sky: '#F2E6A0', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 12], look: [0, 2.4, 0], fov: 52, to: { pos: [2, 3.6, 11.5], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.rotation.x = 0; rainOn(w, t); stand(w, -.6, 1.6, .4); pose(w.p, .6, 1.4); w.umb.position.set(1.3, 2.2, 2.2); w.umb.rotation.set(Math.PI, 0, 0); w.glassC.position.set(1.6, 0, 2); w.fill.scale.y = 1 + Math.min(1, p) * 5; w.fill.position.y = .05 + Math.min(1, p) * .25; } },
    { say: 'And the bees? Thrilled.', label: 'BZZZ!', show: ['ground', 'street', 'houses', 'rain', 'bees'], sky: '#F2E6A0', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 12], look: [0, 3.6, 0], fov: 52, to: { pos: [1, 4, 11.5], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.visible = false; rainOn(w, t); w.bees.children.forEach(b => { const i = b.userData.i, a = t * 2.5 + i; b.position.set(Math.cos(a) * (1.5 + i * .3), 3.6 + Math.sin(a * 1.7) * 1.2, 1 + Math.sin(a) * 1.2); b.rotation.y = -a; b.scale.setScalar(1.6); b.children.slice(2).forEach(wg => wg.rotation.x = .6 * Math.sin(t * 40 + i)); }); } },
    { say: 'Lemonade rain: cool, sweet, or way too sticky? Comment below.',
      quiz: { q: 'Lemonade rain is…', options: ['Cool', 'Sweet', 'Way too sticky'], answer: 'Made up. Real raindrops are shaped more like burger buns than teardrops.' },
      show: ['ground', 'rain', 'pp'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3, 8], look: [0, 2.6, 0], fov: 54, to: { pos: [-2, 3, 8], look: [0, 2.6, 0] } },
      update: (w, p, t) => { rainOn(w, t); stand(w, 0, 0, 0, .8); pose(w.p, 2.2, 0); w.p.head.rotation.x = -.4; w.p.mouth.scale.set(1.2, 2.4, 1); } },
  ],
};
