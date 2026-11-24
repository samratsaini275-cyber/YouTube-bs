// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people cannot turn their heads all the way round. Hook: the premise as a question under 2 s; first frame shows a person mid head-turn.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#B9D98A', 0);
  w.wall = group(); box(40, 20, .5, mat('#DCEFF7'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#7A4FC4'); w.pp = w.p.root;
  w.p.eyes.forEach(e => { const r = k.ball(.18, mat('#F2B21F'), [0, 0, -.12], e); r.castShadow = false; });
  w.f = person(k, k.scene, '#E2453C'); w.fr = w.f.root;
  w.net = group(); box(8, 1.2, .1, mat('#FFFFFF'), [0, .6, 0], w.net); for (const x of [-4, 4]) cyl(.08, .08, 1.4, mat('#555555'), [x, .7, 0], w.net, 8);
  w.ball = ball(.25, mat('#D7F02A', { glow: .3 }), [0, 0, 0]);
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFE45C', { glow: .8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.eyes.forEach(e => e.scale.setScalar(1.25)); };

export default {
  id: '313',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE OWL NECK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD OWL NECKS?'],
  title: 'What would happen if humans could turn their heads like owls?',
  description: 'Sneaky friends? Spotted. Tennis? Your head follows every shot. And spinning round? A little dizzy. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'owl', 'neck', 'comedy', 'shorts'],
  sources: ['Comedy sketch: owl necks on people are made up. Quiz fact: owls can turn their heads about 270 degrees, helped by special blood-vessel adaptations in the neck (de Kok-Mercado et al., Science 2013; Johns Hopkins Medicine).'],
  setup,
  scenes: [
    { say: 'What if humans had owl necks?', show: ['floor', 'wall', 'pp'], sky: '#DCEFF7', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 8.5], look: [0, 4.3, 0], fov: 50, to: { pos: [0, 3.4, 7.8], look: [0, 4.3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); w.p.head.rotation.y = 1.2 * Math.sin(t * 2.4); } },
    { say: 'Someone behind you? Already spotted.', label: 'BOO?', show: ['floor', 'wall', 'pp', 'fr'], sky: '#DCEFF7', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 11], look: [.3, 3.4, 0], fov: 50, to: { pos: [0, 3.6, 10.3], look: [.3, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -1.1, 0, Math.PI); pose(w.p, .3); const turn = Math.min(1, Math.max(0, (p - .35) * 4)); w.p.head.rotation.y = turn * Math.PI; w.fr.position.set(3 - Math.min(p, .4) * 3, 0, -.4); w.fr.rotation.set(0, -1.2, 0); w.f.arms.forEach(a => a.rotation.set(-1.4 + turn * .3, 0, a.userData.s * .2)); w.f.eyes.forEach(e => e.scale.setScalar(1 + turn * .6)); w.f.mouth.scale.set(1, 1 + turn * 3, 1); w.fr.position.y = turn > .9 ? .3 * Math.abs(Math.sin(t * 10)) : 0; } },
    { say: 'Tennis? Your head follows the ball.', show: ['floor', 'wall', 'pp', 'net', 'ball'], sky: '#DCEFF7', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [0, 3.8, 10], look: [0, 3.2, 0], fov: 54, to: { pos: [0, 3.8, 9.3], look: [0, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { w.f.mouth.scale.set(1, 1, 1); w.f.eyes.forEach(e => e.scale.setScalar(1)); stand(w, 0, 1.5, 0); pose(w.p, .3); w.net.position.set(0, 0, -1.5); const q = t * 1.6, s = Math.sin(q * Math.PI); w.ball.position.set(-4 + ((q % 2) < 1 ? (q % 1) : 1 - (q % 1)) * 8, 1.5 + 1.6 * Math.abs(s), -1.5); const ang = Math.atan2(w.ball.position.x, 3); w.p.head.rotation.y = -ang * (1 + p * 1.6); } },
    { say: 'And spinning round? A little dizzy.', label: 'WHEEE', show: ['floor', 'wall', 'pp', 'stars'], sky: '#DCEFF7', lightAt: [0, 6, 5], lightDist: 14, shake: (t) => t > .8 ? .05 : 0,
      cam: { pos: [0, 3.6, 8.5], look: [0, 3.9, 0], fov: 50, to: { pos: [0, 3.6, 7.9], look: [0, 3.9, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .6); w.p.head.rotation.y = t * t * 3; w.pp.rotation.z = .12 * Math.sin(t * 5) * Math.min(1, p * 2); w.p.eyes.forEach((e, i) => e.scale.set(1.25, p > .5 ? .4 : 1.25, 1)); w.stars.children.forEach(s => { const a = s.userData.i / 5 * Math.PI * 2 + t * 4; s.position.set(Math.cos(a) * 1.1, 4.7, Math.sin(a) * 1.1); s.visible = p > .4; }); } },
    { say: 'A neck like an owl: useful, creepy, or way too dizzy? Comment below.',
      quiz: { q: 'Would you want an owl neck?', options: ['Useful', 'Creepy', 'Way too dizzy'], answer: 'Made up for people. Real owls can turn their heads about 270 degrees.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.pp.rotation.z = 0; stand(w, 0, 0, .2); pose(w.p, .3); w.p.head.rotation.y = .9 * Math.sin(t * 1.5); } },
  ],
};
