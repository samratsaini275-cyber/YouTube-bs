// Narrative 20: "What Would Happen If… (season 10)". Body-upgrade premise (147 trunks 868).
// A made-up comedy sketch: people cannot roll into a ball. Hook: the premise as a question under 2 s; first frame shows a person wearing banded armadillo armour.

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
  w.floor = k.ground('#C9D9A0', 0);
  w.wall = group(); box(40, 20, .5, mat('#E8E8D8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#9A8A7A'); w.pp = w.p.root;
  w.bands = group([0, 0, 0], w.pp); for (let i = 0; i < 6; i++) { const b = k.torus(.84, .1, mat('#8A7A6A', { rough: .5 }), [0, .6 + i * .42, 0], w.bands); b.rotation.set(Math.PI / 2, 0, 0); }
  w.helm = k.mesh(new k.THREE.SphereGeometry(.82, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2.2), mat('#8A7A6A', { rough: .5 }), [0, .1, -.05], w.p.head);
  w.armball = group(); const ab = ball(1.6, mat('#8A7A6A', { rough: .5 }), [0, 0, 0], w.armball); for (let i = 0; i < 7; i++) { const r = k.torus(1.6, .07, mat('#6A5A4A'), [0, 0, 0], w.armball); r.rotation.set(0, i / 7 * Math.PI, 0); }
  w.balls = group(); for (let i = 0; i < 6; i++) { const b = ball(.4, mat(['#E2453C', '#3B6FD6', '#F2B21F'][i % 3]), [0, 0, 0], w.balls); b.userData.i = i; }
  w.kids = group(); for (let i = 0; i < 3; i++) { const c = person(k, w.kids, ['#E2453C', '#3FA34D', '#F2B21F'][i]); c.root.position.set(4 + i * 1.6, 0, -1 + i); c.root.rotation.y = -Math.PI / 2; c.root.scale.setScalar(.7); c.root.userData.p = c; }
  w.hill = ball(14, mat('#9FBF6A'), [-10, -11, -2]);
  w.rain = group(); for (let i = 0; i < 30; i++) { const d = box(.04, .4, .04, mat('#9AD8F5', { glow: .4 }), [0, 0, 0], w.rain); d.userData.i = i; d.castShadow = false; }
  w.home = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.home); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.home, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.home);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.visible = true; w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); w.armball.visible = false; };
const curl = (w, x, y, z, roll) => { w.pp.visible = false; w.armball.visible = true; w.armball.position.set(x, y, z); w.armball.rotation.set(0, 0, roll); };

export default {
  id: '348',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ARMADILLO ARMOUR',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD ARMOUR?'],
  title: 'What would happen if humans had armadillo armour?',
  description: 'Dodgeball? Just roll up. Late for school? Roll down the hill. And a rainy day? Roll all the way home. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'armadillo', 'armour', 'comedy', 'shorts'],
  sources: ['Comedy sketch: armour on people is made up. Quiz fact: the three-banded armadillo can roll itself into a tight armoured ball to protect itself (Encyclopaedia Britannica, "armadillo").'],
  setup,
  scenes: [
    { say: 'What if humans had armour?', show: ['floor', 'wall', 'pp'], sky: '#E8E8D8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 10.5], look: [0, 4.4, 0], fov: 50, to: { pos: [0, 3.4, 9.8], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); w.p.arms.forEach(a => a.rotation.z = a.userData.s * (.3 + .1 * Math.sin(t * 4))); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); w.p.mouth.scale.set(1.3, 1.6, 1); } },
    { say: 'Dodgeball? Just roll up.', label: 'BOING BOING', show: ['floor', 'wall', 'pp', 'armball', 'balls', 'kids'], sky: '#E8E8D8', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [0, 4, 13], look: [1.5, 2.4, 0], fov: 54, to: { pos: [0, 4, 12.3], look: [1.5, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { if (p < .3) { stand(w, -.4, 0, 0); pose(w.p, 1.2); } else curl(w, -.4, 1.6, 0, 0); w.balls.children.forEach(b => { const i = b.userData.i, q = (t * 1.3 + i / 6) % 1; const bounce = q > .7; b.position.set(4 - q * 5 + (bounce ? (q - .7) * 10 : 0), 1.5 + Math.sin(q * Math.PI) * 1.5, -.6 + (i % 3) * .6); }); w.kids.children.forEach((c, i) => c.userData.p.arms[1].rotation.set(0, 0, -.5 - .8 * Math.max(0, Math.sin(t * 6 + i)))); } },
    { say: 'Late for school? Roll down the hill.', label: 'WHEEE', show: ['floor', 'pp', 'armball', 'hill'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [2, 6, 18], look: [0, 3, 0], fov: 56, to: { pos: [2, 6, 17], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { const x = -6 + p * 9; const y = 1.6 + Math.max(0, 3 - (x + 6) * .5); curl(w, x, y, 1, -x * 1.6); } },
    { say: 'And a rainy day? Roll all the way home.', show: ['floor', 'pp', 'armball', 'rain', 'home'], sky: '#7A8A9A', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 4, 16], look: [0, 2.6, 0], fov: 54, to: { pos: [0, 4, 15.2], look: [0, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { w.home.position.set(5, 0, -2); curl(w, -5 + p * 8, 1.6, 0, -(-5 + p * 8) * 1.6); w.rain.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 30) % 1; d.position.set(-7 + (i * .47) % 14, 9 - q * 9, -1 + (i % 4)); }); } },
    { say: 'Human armour: useful, cool, or way too rolly? Comment below.',
      quiz: { q: 'Would you want armour?', options: ['Useful', 'Cool', 'Way too rolly'], answer: 'Made up for people. Real three-banded armadillos roll into a ball.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); } },
  ],
};
