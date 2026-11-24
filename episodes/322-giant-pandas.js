// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized panda next to a house.

function panda(k, parent) {
  const { mat, ball, group } = k;
  const white = mat('#F7F7F2', { rough: .8 }), black = mat('#1E1E22', { rough: .8 });
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  const bd = ball(1.2, white, [0, 1.3, 0], b.body); bd.scale.set(1, 1.1, 1);
  const band = ball(1.22, black, [0, 1.85, 0], b.body); band.scale.set(1.01, .35, 1.01);
  b.head = group([0, 2.9, 0], b.body); ball(.85, white, [0, 0, 0], b.head);
  for (const x of [-1, 1]) { const e = ball(.28, black, [x * .6, .62, -.05], b.head); e.scale.z = .6; const pt = ball(.2, black, [x * .28, .12, .7], b.head); pt.scale.set(1, 1.3, .5); pt.rotation.z = x * .5; ball(.08, mat('#FFFFFF'), [x * .28, .16, .79], b.head); ball(.04, mat('#111111'), [x * .28, .16, .85], b.head); }
  b.nose = ball(.12, black, [0, -.15, .82], b.head); b.mouth = ball(.1, mat('#5A2A2A'), [0, -.38, .76], b.head); b.mouth.scale.set(1.2, .4, .6);
  b.arms = [-1, 1].map(x => { const a = group([x * .95, 1.9, .2], b.body); const m = ball(.38, black, [0, -.5, 0], a); m.scale.set(.9, 1.6, .9); a.userData.x = x; return a; });
  b.legs = [-1, 1].map(x => { const l = ball(.45, black, [x * .6, .35, .35], b.root); l.scale.set(1, .8, 1.3); return l; });
  return b;
}
const munch = (b, t) => b.mouth.scale.set(1.2, .4 + .5 * Math.abs(Math.sin(t * 12)), .6);
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
  w.ground = k.ground('#7FB069', 0);
  w.pd = panda(k, k.scene); w.pr = w.pd.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); w.roof = group([0, 3.4, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 1.1, 0], w.roof, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.bamboo = group(); w.stalks = []; for (let i = 0; i < 14; i++) { const s = group([-6 + (i % 7) * 2, 0, -2 - Math.floor(i / 7) * 2], w.bamboo); for (let j = 0; j < 4; j++) cyl(.18, .18, 1.6, mat('#7AC943'), [0, .8 + j * 1.65, 0], s, 8); for (let j = 0; j < 3; j++) { const lf = ball(.3, mat('#3FA34D'), [.3 * (j - 1), 6.6 + j * .2, 0], s); lf.scale.set(1.6, .3, .6); } w.stalks.push(s); }
  w.hill = ball(18, mat('#6FA05A'), [0, -15, -6]);
  w.gust = group(); for (let i = 0; i < 8; i++) { const l = box(1.6, .1, .1, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.gust); l.userData.i = i; l.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const pdAt = (w, x, y, z, ry, s) => { w.pr.position.set(x, y, z); w.pr.rotation.set(0, ry, 0); w.pr.scale.setScalar(s); w.pd.body.rotation.set(0, 0, 0); w.pd.head.rotation.set(0, 0, 0); w.pd.arms.forEach(a => a.rotation.set(0, 0, 0)); w.pd.body.position.set(0, 0, 0); w.pd.legs.forEach(l => l.visible = true); };

export default {
  id: '322',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT PANDAS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PANDAS', 'WERE GIANT?'],
  title: 'What would happen if pandas were giant?',
  description: 'A whole bamboo forest? Gone by lunch. Rolling down a hill? Watch out. And one sneeze blows your roof off. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'panda', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant-sized pandas are made up. Quiz fact: wild giant pandas spend about 10 to 16 hours a day eating, mostly bamboo (WWF, "Giant panda").'],
  setup,
  scenes: [
    { say: 'What if pandas were giant?', show: ['ground', 'pr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 7.6, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 7.6, 0], fov: 52 } },
      update: (w, p, t) => { pdAt(w, -3.4, 0, -5, .4, 2.4); w.pd.head.rotation.z = .1 * Math.sin(t * 2); w.house.position.set(4, 0, -1); w.roof.position.set(0, 3.4, 0); w.roof.rotation.set(0, 0, 0); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'A bamboo forest? Gone by lunch.', label: 'CRUNCH', show: ['ground', 'pr', 'bamboo'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 22], look: [0, 5, 0], fov: 56, to: { pos: [0, 6, 21], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { pdAt(w, 0, 0, 2, 0, 2); munch(w.pd, t); w.pd.arms.forEach(a => a.rotation.x = -1.4 - .3 * Math.sin(t * 8 + a.userData.x)); const gone = Math.floor(p * 18); w.stalks.forEach((s, i) => s.visible = i >= gone); } },
    { say: 'Rolling down a hill? Watch out.', label: 'WHOA!', show: ['ground', 'pr', 'hill', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 20], look: [0, 3.6, 0], fov: 56, to: { pos: [0, 5, 19], look: [0, 3.6, 0], fov: 54 } },
      update: (w, p, t) => { w.stalks.forEach(s => s.visible = true); const x = -4.5 + p * 7.5; pdAt(w, x, 0, 3, 0, 1.8); w.pd.legs.forEach(l => l.visible = false); w.pd.body.position.y = -1.6; w.pr.position.y = 1.6 * 1.8; w.pd.body.rotation.z = -p * 12; stand(w, 2.6, -.5, -.3); const near = Math.abs(x - 2.6) < 3.5; pose(w.p, near ? 2.6 : .3); w.p.mouth.scale.set(1.2, near ? 3 : 1, 1); w.pp.position.y = near ? .5 * Math.abs(Math.sin(t * 10)) : 0; } },
    { say: 'And one sneeze? Your roof blows off.', label: '*ACHOO*', show: ['ground', 'pr', 'house', 'gust'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1 && t < 1.5 ? .3 : 0,
      cam: { pos: [2, 6, 24], look: [1, 5.5, 0], fov: 56, to: { pos: [2, 6, 23], look: [1, 5.5, 0], fov: 54 } },
      update: (w, p, t) => { pdAt(w, -4, 0, -1, .7, 2.2); const hit = t > 1; w.pd.head.rotation.x = hit ? .3 : -.3 * Math.min(1, t); w.pd.mouth.scale.set(1.2, hit ? 1.2 : .4, .6); w.house.position.set(4, 0, -1); const q = hit ? Math.min(1, (t - 1) * 1.2) : 0; w.roof.position.set(q * 6, 3.4 + q * 6, 0); w.roof.rotation.set(0, q * 4, -q * 1.2); w.gust.children.forEach(l => { const i = l.userData.i, r = ((t - 1) * 2 + i / 8) % 1; l.position.set(-1 + r * 8, 4 + (i % 4) * .9, -1); l.visible = hit; }); } },
    { say: 'Giant pandas: cute, cuddly, or way too hungry? Comment below.',
      quiz: { q: 'Giant pandas are…', options: ['Cute', 'Cuddly', 'Way too hungry'], answer: 'Made up size. Real pandas spend 10 to 16 hours a day eating, mostly bamboo.' },
      show: ['ground', 'pr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.6, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.6, 0] } },
      update: (w, p, t) => { w.roof.position.set(0, 3.4, 0); w.roof.rotation.set(0, 0, 0); pdAt(w, 0, 0, 0, .7, 1.4); munch(w.pd, t); } },
  ],
};
