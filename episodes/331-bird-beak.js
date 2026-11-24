// Narrative 19: "What Would Happen If… (season 9)". Body-upgrade premise (147 trunks 868).
// A made-up comedy sketch: people do not have beaks. Hook: the premise as a question under 2 s; first frame shows a person with a big orange bird beak.

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
  w.wall = group(); box(40, 20, .5, mat('#F2E8D0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#9B59B6'); w.pp = w.p.root;
  w.p.mouth.visible = false; w.p.head.children[3].visible = false;
  w.beak = group([0, -.12, .6], w.p.head); w.upper = cone(.32, 1, mat('#F29A1F'), [0, .08, .45], w.beak, 12); w.upper.rotation.x = Math.PI / 2; w.upper.scale.y = 1; w.lower = group([0, -.02, 0], w.beak); const lo = cone(.25, .8, mat('#E07A10'), [0, -.08, .38], w.lower, 12); lo.rotation.x = Math.PI / 2;
  w.bowl = group(); cyl(.8, .55, .5, mat('#FFFFFF'), [0, .25, 0], w.bowl, 20); cyl(.75, .75, .05, mat('#E8A33A'), [0, .48, 0], w.bowl, 20);
  w.table = group(); box(4, .2, 2, mat('#C0703F'), [0, 2.2, 0], w.table); for (const x of [-1.8, 1.8]) box(.2, 2.2, .2, mat('#C0703F'), [x, 1.1, 0], w.table);
  w.drops = group(); for (let i = 0; i < 8; i++) { const d = ball(.07, mat('#E8A33A'), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  w.laptop = group(); box(1.8, .08, 1.2, mat('#333333'), [0, 0, 0], w.laptop); const scr = box(1.8, 1.2, .06, mat('#222222'), [0, .6, -.6], w.laptop); box(1.7, 1.1, .02, mat('#4FB3E8', { glow: .8 }), [0, .6, -.56], w.laptop);
  w.letters = group(); for (let i = 0; i < 6; i++) { const l = box(.18, .25, .02, mat('#111111'), [0, 0, 0], w.letters); l.userData.i = i; l.castShadow = false; }
  w.corn = group(); cyl(.25, .25, 1.6, mat('#F2C94C'), [0, 0, 0], w.corn, 12).rotation.z = Math.PI / 2; for (let i = 0; i < 14; i++) { const kk = ball(.07, mat('#F2B21F'), [-.7 + (i % 7) * .23, .22, (i < 7 ? 1 : -1) * .1], w.corn); kk.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.eyes.forEach(e => e.scale.setScalar(1)); w.lower.rotation.x = 0; };
const peck = (w, t, sp = 14) => { const a = Math.max(0, Math.sin(t * sp)); w.p.head.rotation.x = a * .45; return a; };

export default {
  id: '331',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BIRD BEAK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD BEAKS?'],
  title: 'What would happen if humans had bird beaks?',
  description: 'Soup? Good luck. Typing turns into peck, peck, peck. And corn on the cob? One kernel at a time. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'bird', 'beak', 'comedy', 'shorts'],
  sources: ['Comedy sketch: beaks on people are made up. Quiz fact: birds have no teeth; many swallow small stones that sit in the gizzard and help grind up food (Encyclopaedia Britannica, "gizzard").'],
  setup,
  scenes: [
    { say: 'What if humans had beaks?', show: ['floor', 'wall', 'pp'], sky: '#F2E8D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [4.2, 3.4, 9.4], look: [0, 4.3, 0], fov: 50, to: { pos: [4, 3.4, 8.7], look: [0, 4.3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, .9); pose(w.p, .3); w.lower.rotation.x = .25 * Math.max(0, Math.sin(t * 6)); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Soup? Good luck.', label: 'SPLASH', show: ['floor', 'wall', 'pp', 'table', 'bowl', 'drops'], sky: '#F2E8D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [3.5, 4.2, 8], look: [0, 3, 0], fov: 50, to: { pos: [3.2, 4.2, 7.4], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, -1.4, 0); pose(w.p, .3, .4); w.bowl.position.set(0, 2.3, .2); const a = peck(w, t, 9); w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 2 + i / 8) % 1; d.position.set(Math.cos(i * 1.3) * q * 1.2, 2.8 + Math.sin(q * Math.PI) * .9, .2 + Math.sin(i) * q); d.visible = a > .2 || q < .6; }); w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); } },
    { say: 'Typing? Peck, peck, peck.', label: 'PECK PECK', show: ['floor', 'wall', 'pp', 'table', 'laptop', 'letters'], sky: '#F2E8D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [7, 4.4, 2.2], look: [0, 3.2, -.4], fov: 50, to: { pos: [6.5, 4.4, 2], look: [0, 3.2, -.4], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, -1.4, 0); pose(w.p, .3, .5); w.laptop.position.set(0, 2.35, .3); w.laptop.rotation.y = Math.PI; peck(w, t, 12); w.letters.children.forEach(l => { const i = l.userData.i; l.position.set(.7 - i * .28, 3.05, .88); l.rotation.y = Math.PI; l.visible = i < Math.floor(p * 8); }); } },
    { say: 'And corn on the cob? One kernel at a time.', show: ['floor', 'wall', 'pp', 'corn'], sky: '#F2E8D0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.6, 4, 7], look: [0, 3.6, 0], fov: 48, to: { pos: [2.4, 4, 6.4], look: [0, 3.6, 0], fov: 46 } },
      update: (w, p, t) => { w.p.head.rotation.x = 0; stand(w, 0, 0, 0); w.p.arms.forEach(a => a.rotation.set(-1.5, 0, a.userData.s * -.55)); w.corn.position.set(0, 2.9, 1.3); const a = Math.max(0, Math.sin(t * 6)); w.p.head.rotation.x = a * .35; const gone = Math.floor(p * 16); w.corn.children.forEach(c => { if (c.userData.i !== undefined) c.visible = c.userData.i >= gone; }); w.p.eyes.forEach(e => e.scale.set(1, .6, 1)); } },
    { say: 'Human beaks: useful, cool, or way too pointy? Comment below.',
      quiz: { q: 'Would you want a beak?', options: ['Useful', 'Cool', 'Way too pointy'], answer: 'Made up for people. Birds have no teeth; many grind food with swallowed stones.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .3); pose(w.p, .3); w.lower.rotation.x = .2 * Math.max(0, Math.sin(t * 5)); } },
  ],
};
