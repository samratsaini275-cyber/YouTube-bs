// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have antennae. Hook: the premise as a question under 2 s; first frame shows a person with two long bug antennae.

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
  w.wall = group(); box(40, 20, .5, mat('#DDF0E8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#F2B21F'); w.pp = w.p.root;
  const am = mat('#2A1E16');
  w.ant = [-1, 1].map(s => { const a = group([s * .3, .6, 0], w.p.head); const seg1 = cyl(.04, .05, 1.1, am, [0, .55, 0], a, 6); const b = group([0, 1.1, 0], a); cyl(.035, .04, 1, am, [0, .5, 0], b, 6); b.rotation.z = -s * .6; a.userData.tip = ball(.14, mat('#E2453C', { glow: .3 }), [0, 1.02, 0], b); a.rotation.z = -s * .35; a.userData.s = s; a.userData.b = b; return a; });
  w.bars = group(); for (let i = 0; i < 4; i++) { const b = box(.2, .3 + i * .25, .1, mat('#3FA34D', { glow: .8 }), [i * .3, (.3 + i * .25) / 2, 0], w.bars); b.userData.i = i; b.castShadow = false; }
  w.pizza = group(); const pz = cyl(.7, .7, .08, mat('#F2B85A'), [0, 0, 0], w.pizza, 3); for (let i = 0; i < 4; i++) ball(.1, mat('#C0392B'), [-.2 + (i % 2) * .3, .06, -.15 + Math.floor(i / 2) * .3], w.pizza);
  w.smell = group(); for (let i = 0; i < 5; i++) { const s = k.torus(.25, .04, mat('#B0E0A0', { glow: .6 }), [0, 0, 0], w.smell); s.userData.i = i; s.castShadow = false; }
  w.wallMid = box(.4, 8, 8, mat('#F5EFE0'), [0, 4, 0]);
  w.hat = group(); cyl(.8, .8, .06, mat('#3B6FD6'), [0, 0, 0], w.hat, 20); cyl(.5, .55, .6, mat('#3B6FD6'), [0, .3, 0], w.hat, 20);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); };
const wave = (w, t, a = .15, sp = 4) => w.ant.forEach(an => { const s = an.userData.s; an.rotation.z = -s * .35 + a * Math.sin(t * sp + s); an.rotation.x = a * .6 * Math.cos(t * sp * .7 + s); });

export default {
  id: '318',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BUG ANTENNAE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD ANTENNAE?'],
  title: 'What would happen if humans had bug antennae?',
  description: 'Wi-fi? Full bars. Pizza next door? Smelled through the wall. And hats? They just do not fit. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'bug', 'antennae', 'comedy', 'shorts'],
  sources: ['Comedy sketch: antennae on people are made up. Quiz fact: insects use their antennae to smell and touch; many find food and mates by scent picked up on their antennae (Encyclopaedia Britannica, "antenna").'],
  setup,
  scenes: [
    { say: 'What if humans had antennae?', show: ['floor', 'wall', 'pp'], sky: '#DDF0E8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 12.5], look: [0, 5.9, 0], fov: 50, to: { pos: [0, 3.6, 11.8], look: [0, 5.9, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); wave(w, t, .2, 5); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Wi-fi? Full bars.', label: 'BEEP!', show: ['floor', 'wall', 'pp', 'bars'], sky: '#DDF0E8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 11], look: [0, 4.4, 0], fov: 50, to: { pos: [0, 3.6, 10.3], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); w.ant.forEach(an => { an.rotation.set(0, 0, -an.userData.s * .1); }); w.bars.position.set(1.6, 6.2, 0); w.bars.children.forEach(b => b.visible = b.userData.i < Math.floor(p * 6)); w.ant.forEach(an => an.userData.tip.material.emissiveIntensity = 1 + Math.sin(t * 10)); w.p.mouth.scale.set(1.4, 1.5, 1); } },
    { say: 'Pizza next door? Smelled through the wall.', show: ['floor', 'wall', 'pp', 'pizza', 'smell', 'wallMid'], sky: '#DDF0E8', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [0, 4, 13], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 4, 12.3], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -2.2, 0, Math.PI / 2); pose(w.p, .3); wave(w, t, .3, 9); w.pizza.position.set(2.6, 2.4, 0); w.pizza.rotation.set(.3, t, 0); w.smell.children.forEach(s => { const i = s.userData.i, q = (t * .7 + i / 5) % 1; s.position.set(2.4 - q * 3.4, 2.8 + q * 2.4 + Math.sin(q * 8) * .2, 0); s.rotation.set(0, Math.PI / 2, 0); s.scale.setScalar(.7 + q); }); w.p.eyes.forEach(e => e.scale.set(1, p > .5 ? .3 : 1, 1)); w.p.mouth.scale.set(1.2, p > .5 ? 2.2 : 1, 1); } },
    { say: 'And hats? They just do not fit.', label: 'BOING', show: ['floor', 'wall', 'pp', 'hat'], sky: '#DDF0E8', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.8, 11], look: [0, 4.8, 0], fov: 50, to: { pos: [0, 3.8, 10.3], look: [0, 4.8, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); w.ant.forEach(an => { an.rotation.set(0, 0, -an.userData.s * .15); }); const drop = Math.min(1, t / .6), bounce = t > .6 ? Math.abs(Math.sin((t - .6) * 6)) * Math.max(0, 1.5 - (t - .6)) : 0; w.hat.position.set(0, 8.6 - drop * 2.85 + bounce * .8, 0); w.hat.rotation.z = .3 * Math.sin(t * 5) * (t > .6 ? 1 : 0); w.p.eyes.forEach(e => e.scale.setScalar(1)); w.p.head.rotation.x = -.25; w.p.mouth.scale.set(.8, .6, 1); } },
    { say: 'Bug antennae: useful, cool, or way too weird? Comment below.',
      quiz: { q: 'Would you want antennae?', options: ['Useful', 'Cool', 'Way too weird'], answer: 'Made up for people. Real insects smell and touch with their antennae.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 14], look: [0, 5, 0], fov: 56, to: { pos: [-1, 1.2, 14], look: [0, 5, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); wave(w, t, .2, 4); } },
  ],
};
