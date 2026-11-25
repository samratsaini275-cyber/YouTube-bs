// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a goose taller than a house, honking.

function goose(k, parent) {
  const { mat, ball, cyl, cone, box, group } = k;
  const wht = mat('#F6F4EE', { rough: .8 }), org = mat('#F28C28'), gry = mat('#C9C4BA');
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  const b = ball(1, wht, [0, 2.2, 0], g.body); b.scale.set(1.5, .95, 1);
  for (const z of [-1, 1]) { g['wing' + z] = group([0, 2.5, z * .9], g.body); const wg = ball(.8, gry, [-.2, 0, 0], g['wing' + z]); wg.scale.set(1.3, .5, .25); }
  const tl = cone(.4, .7, wht, [-1.6, 2.5, 0], g.body, 8); tl.rotation.z = Math.PI / 2 + .5;
  g.neck = group([1.2, 2.6, 0], g.body); const nk = cyl(.28, .35, 2, wht, [0, 1, 0], g.neck, 10);
  g.head = group([1.45, 4.7, 0], g.body); ball(.45, wht, [0, 0, 0], g.head);
  for (const z of [-1, 1]) { ball(.09, mat('#111111'), [.2, .12, z * .35], g.head); }
  g.beakTop = group([.35, -.05, 0], g.head); const bt = cone(.18, .6, org, [.3, 0, 0], g.beakTop, 10); bt.rotation.z = -Math.PI / 2;
  g.beakBot = group([.35, -.12, 0], g.head); const bb = cone(.13, .5, org, [.25, 0, 0], g.beakBot, 10); bb.rotation.z = -Math.PI / 2;
  g.legs = []; for (const z of [-1, 1]) { const l = group([.1, 1.5, z * .45], g.body); cyl(.08, .08, 1.4, org, [0, -.7, 0], l, 8); const f = box(.6, .06, .5, org, [.2, -1.42, 0], l); g.legs.push(l); }
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
  w.road = box(40, .05, 5, mat('#555B66'), [0, .03, 3]);
  w.gs = goose(k, k.scene); w.gr = w.gs.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.p2 = person(k, k.scene, '#E2453C'); w.pp2 = w.p2.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.bus = group(); box(6, 2.2, 2.2, mat('#F2C94C'), [0, 1.5, 0], w.bus); for (let i = 0; i < 4; i++) box(.9, .7, .05, mat('#9FD3EE'), [-2 + i * 1.3, 2, 1.12], w.bus); for (const x of [-2, 2]) for (const z of [-1.1, 1.1]) { const wh = cyl(.45, .45, .25, mat('#222222'), [x, .45, z], w.bus, 12); wh.rotation.x = Math.PI / 2; }
  w.bakery = group(); w.bkBody = box(5, 3.6, 3.4, mat('#F7D6E0'), [0, 1.8, 0], w.bakery); const aw = box(5.2, .3, 1.2, mat('#E2453C'), [0, 3, 2], w.bakery); aw.rotation.x = .3; w.loaves = []; for (let i = 0; i < 3; i++) { const lf = ball(.45, mat('#C98B3E'), [-1.3 + i * 1.3, 4.1, 0], w.bakery); lf.scale.set(1.6, .7, .8); w.loaves.push(lf); }
  w.crumbs = group(); for (let i = 0; i < 10; i++) { const c = ball(.18, mat('#C98B3E'), [0, 0, 0], w.crumbs); c.userData.i = i; c.castShadow = false; }
  return w;
}

const stand = (pp, P, x, z, ry) => { pp.position.set(x, 0, z); pp.rotation.set(0, ry, 0); pp.scale.setScalar(1); P.head.rotation.set(0, 0, 0); P.mouth.scale.set(1, 1, 1); };
const gsAt = (w, x, y, z, ry, s) => { w.gr.position.set(x, y, z); w.gr.rotation.set(0, ry, 0); w.gr.scale.setScalar(s); w.gs.body.rotation.set(0, 0, 0); w.gs.neck.rotation.set(0, 0, 0); w.gs.head.position.set(1.45, 4.7, 0); w.gs.head.rotation.set(0, 0, 0); w.gs.beakBot.rotation.set(0, 0, 0); w.gs.legs.forEach(l => l.rotation.z = 0); w.gs['wing-1'].rotation.set(0, 0, 0); w.gs.wing1.rotation.set(0, 0, 0); };
const honk = (w, on) => { w.gs.beakBot.rotation.z = on ? -.5 : 0; };
const waddle = (w, t) => { w.gs.legs.forEach((l, i) => l.rotation.z = .4 * Math.sin(t * 10 + i * Math.PI)); w.gs.body.rotation.x = .06 * Math.sin(t * 10); };

export default {
  id: '355',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT GEESE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GEESE', 'WERE GIANT?'],
  title: 'What would happen if geese were giant?',
  description: 'One honk and the whole town runs. It chases the school bus. And if you feed it bread, it eats the whole bakery. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'goose', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant geese are made up. Quiz fact: modern birds have no teeth; geese grip and tear grass with the jagged, tooth-like edges of their bill (Encyclopaedia Britannica, "bird"; "goose").'],
  setup,
  scenes: [
    { say: 'What if geese were giant?', label: 'HONK!', show: ['ground', 'gr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 11, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 11, 0], fov: 54 } },
      update: (w, p, t) => { gsAt(w, -3.4, 0, -5, -1.0, 2.3); honk(w, Math.sin(t * 9) > 0); w.gs.wing1.rotation.x = -.4; w.gs['wing-1'].rotation.x = .4; w.house.position.set(4.6, 0, -3); stand(w.pp, w.p, 2.2, 4.5, -.3); w.pp.scale.setScalar(.8); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'One honk? The whole town runs.', label: 'HOOONK', show: ['ground', 'road', 'gr', 'pp', 'pp2'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .3 && t < .9 ? .2 : 0,
      cam: { pos: [2, 6, 22], look: [0, 4.4, 0], fov: 56, to: { pos: [2, 6, 21], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { gsAt(w, -5, 0, -1, 0, 1.6); honk(w, t > .3); w.gs.neck.rotation.z = -.3; w.gs.head.position.set(2.2, 4.5, 0); const run = Math.max(0, t - .5); stand(w.pp, w.p, 1 + run * 5, 3.5, Math.PI / 2); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.pp.position.y = .3 * Math.abs(Math.sin(t * 12)); stand(w.pp2, w.p2, 2.6 + run * 5.5, 5, Math.PI / 2); pose(w.p2, 2.4); w.p2.mouth.scale.set(1.2, 3, 1); w.pp2.position.y = .3 * Math.abs(Math.sin(t * 12 + 1)); } },
    { say: 'The school bus? It gets chased.', label: 'HONK HONK', show: ['ground', 'road', 'gr', 'bus'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 24], look: [0, 4, 0], fov: 56, to: { pos: [2, 6, 23], look: [0, 4, 0], fov: 54 } },
      update: (w, p, t) => { const x = -6 + p * 8; w.bus.position.set(x + 7, 0, 3); w.bus.position.y = .1 * Math.abs(Math.sin(t * 15)); gsAt(w, x - 2, 0, 0, 0, 1.6); waddle(w, t); honk(w, Math.sin(t * 8) > 0); w.gs.neck.rotation.z = -.5; w.gs.head.position.set(2.6, 4.2, 0); w.gs.wing1.rotation.x = -.6 * Math.abs(Math.sin(t * 8)); w.gs['wing-1'].rotation.x = .6 * Math.abs(Math.sin(t * 8)); } },
    { say: 'And if you feed it bread? It eats the whole bakery.', label: 'GULP', show: ['ground', 'gr', 'bakery', 'crumbs', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 22], look: [0, 4.4, 0], fov: 56, to: { pos: [3, 6, 21], look: [0, 4.4, 0], fov: 54 } },
      update: (w, p, t) => { gsAt(w, -5, 0, -1, 0, 1.6); const eat = Math.min(1, Math.max(0, (p - .45) * 2.5)); w.gs.neck.rotation.z = -.5 * eat; w.gs.head.position.set(1.45 + eat * 1.3, 4.7 - eat * .6, 0); honk(w, eat > 0 && Math.sin(t * 14) > 0); w.bakery.position.set(2.4, 0, -2); w.bakery.scale.set(1, Math.max(.05, 1 - eat), 1); w.loaves.forEach(l => l.visible = eat < .3); w.crumbs.children.forEach(c => { const i = c.userData.i, q = (t * 1.5 + i / 10) % 1; c.position.set(2.4 + Math.sin(i * 2) * 2, q * 3, -1 + Math.cos(i) * 1.5); c.visible = eat > .1 && eat < 1; }); stand(w.pp, w.p, 4.2, 4.2, -.6); pose(w.p, eat > .5 ? 2.4 : 1.2); w.p.mouth.scale.set(1.2, eat > .5 ? 3 : 1, 1); } },
    { say: 'Giant geese: cool, cute, or way too loud? Comment below.',
      quiz: { q: 'Giant geese are…', options: ['Cool', 'Cute', 'Way too loud'], answer: 'Made up. And real geese have no teeth, just a jagged bill.' },
      show: ['ground', 'gr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [9, 4, 9], look: [0, 3.8, 0], fov: 54, to: { pos: [11, 4, 2], look: [0, 3.8, 0] } },
      update: (w, p, t) => { gsAt(w, 0, 0, 0, -.6, 1.1); honk(w, Math.sin(t * 4) > .6); } },
  ],
};
