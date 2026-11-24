// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858).
// A made-up comedy sketch: people cannot open their mouths like snakes. Hook: the premise as a question under 2 s; first frame shows a person opening a huge mouth.

function person(k, parent, shirt, big = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (big) {
    p.jaw = group([0, -.15, 0], p.head);
    const jb = ball(.74, mat('#F2C9A0'), [0, 0, 0], p.jaw); jb.scale.set(1, .55, 1); jb.position.y = -.2;
    p.hole = ball(.62, mat('#7A1E2A'), [0, -.15, .2], p.head); p.hole.scale.set(.9, .1, .5);
    p.tongue = ball(.3, mat('#E86A8A'), [0, -.3, .35], p.jaw); p.tongue.scale.set(1, .3, 1);
    p.teeth = []; for (const x of [-.25, 0, .25]) p.teeth.push(box(.12, .14, .06, mat('#FFFFFF'), [x, -.2, .62], p.head));
  }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
// o: 0 closed .. 1 wide open (mouth hole stretches, jaw drops)
const gape = (p, o) => { p.head.position.y = 3.5 + o * 1.2; p.mouth.visible = o < .05; p.jaw.position.y = -.15 - o * 1.3; p.hole.scale.set(.9 + o * .25, .1 + o * 1.6, .5 + o * .3); p.hole.position.y = -.15 - o * .75; p.hole.position.z = .2 + o * .3; p.tongue.position.y = -.3 + o * .2; p.teeth.forEach(t => t.visible = o > .05); };

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#F3E6D6'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6', true); w.pp = w.p.root;
  w.f = person(k, k.scene, '#E2453C'); w.fr = w.f.root;
  w.d = person(k, k.scene, '#FFFFFF'); w.dr = w.d.root; box(.9, .5, .1, mat('#9FD3EE'), [0, -.35, .74], w.d.head);
  w.pizza = group(); cyl(1.2, 1.2, .12, mat('#E8B04A'), [0, 0, 0], w.pizza, 24); cyl(1.05, 1.05, .14, mat('#D9442E'), [0, .02, 0], w.pizza, 24); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; cyl(.16, .16, .16, mat('#8E1B1B'), [Math.cos(a) * .6, .05, Math.sin(a) * .6], w.pizza, 10); }
  w.burger = group(); const bun = mat('#D9A35C'); const tb = ball(.7, bun, [0, .55, 0], w.burger); tb.scale.y = .55; cyl(.72, .72, .2, mat('#6B3A1E'), [0, .25, 0], w.burger, 20); cyl(.78, .78, .06, mat('#5FBF5F'), [0, .4, 0], w.burger, 20); cyl(.7, .7, .2, bun, [0, .05, 0], w.burger, 20);
  w.ladder = group(); const lm = mat('#C08A4A'); box(.12, 5, .12, lm, [-.5, 2.5, 0], w.ladder); box(.12, 5, .12, lm, [.5, 2.5, 0], w.ladder); for (let i = 0; i < 9; i++) box(1, .08, .08, lm, [0, .4 + i * .55, 0], w.ladder);
  w.gulp = group(); for (let i = 0; i < 4; i++) { const s = box(.5, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.gulp); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '302',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SNAKE JAWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'SNAKE JAWS?'],
  title: 'What would happen if humans had snake jaws?',
  description: 'Pizza? One bite. Burgers go down whole. Yawning becomes terrifying. And the dentist needs a ladder. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'snake', 'jaws', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human snake jaws are made up. Quiz fact: snakes do not actually unhinge their jaws; the two halves of the lower jaw are joined by a stretchy ligament, so the mouth can open very wide (Natural History Museum, London).'],
  setup,
  scenes: [
    { say: 'What if we had snake jaws?', show: ['floor', 'wall', 'pp'], sky: '#F3E6D6', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 10.5], look: [0, 5.1, 0], fov: 50, to: { pos: [0, 3.6, 9.8], look: [0, 5.1, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); gape(w.p, Math.min(1, t * 1.4) * (.85 + .15 * Math.sin(t * 6))); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Pizza? One bite.', label: '*CHOMP*', show: ['floor', 'wall', 'pp', 'pizza'], sky: '#F3E6D6', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.6, 3.6, 8], look: [.6, 3.2, 0], fov: 50, to: { pos: [2.4, 3.6, 7.4], look: [.6, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, .5); pose(w.p, .3, .6); const q = Math.min(1, p * 1.5); gape(w.p, q < 1 ? Math.min(1, q * 2) : Math.max(0, 1 - (p - .67) * 6)); w.pizza.position.set(2.4 - q * 2.1, 3 - q * .3, 1.4 - q * .7); w.pizza.rotation.set(Math.PI / 2 * q, 0, 0); w.pizza.visible = q < 1; } },
    { say: 'A burger? Whole.', label: 'GULP', show: ['floor', 'wall', 'pp', 'burger', 'gulp'], sky: '#F3E6D6', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [-2.4, 3.4, 8], look: [-.4, 3.2, 0], fov: 50, to: { pos: [-2.2, 3.4, 7.4], look: [-.4, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, -.5); pose(w.p, .3, .6); const q = Math.min(1, p * 1.5); gape(w.p, q < 1 ? Math.min(1, q * 2) : Math.max(0, 1 - (p - .67) * 6)); w.burger.position.set(-2 + q * 1.8, 2.8 - q * .3, 1.2 - q * .5); w.burger.visible = q < 1; const done = q >= 1; w.gulp.children.forEach(s => { const i = s.userData.i; s.position.set(-1.1, 3.6 + (i - 1.5) * .3, .4); s.visible = done && Math.sin(t * 12 + i) > 0; }); w.pp.scale.set(done ? 1.08 : 1, 1, done ? 1.08 : 1); } },
    { say: 'Yawning? Terrifying.', label: 'AAAH', show: ['floor', 'wall', 'pp', 'fr'], sky: '#F3E6D6', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 12], look: [0, 3.4, 0], fov: 52, to: { pos: [0, 3.4, 11.3], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.scale.set(1, 1, 1); stand(w, -1.6, 0, .3); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.6)); gape(w.p, Math.min(1, p * 2.5)); const run = p > .35; w.fr.position.set(1.8 + (run ? (p - .35) * 9 : 0), 0, 0); w.fr.rotation.set(0, run ? Math.PI / 2 : -.4, 0); w.f.arms.forEach((a, i) => a.rotation.set(run ? Math.sin(t * 18 + i * Math.PI) : 0, 0, a.userData.s * (run ? 2.6 : .3))); w.f.mouth.scale.set(1.2, run ? 3 : 1, 1); w.f.eyes.forEach(e => e.scale.setScalar(1.4)); } },
    { say: 'And the dentist? Needs a ladder.', show: ['floor', 'wall', 'pp', 'dr', 'ladder'], sky: '#F3E6D6', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [3.2, 3.6, 11], look: [.8, 3.8, 0], fov: 54, to: { pos: [3, 3.6, 10.3], look: [.8, 3.8, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -1.2, 0, .5); pose(w.p, .2); gape(w.p, .95); w.ladder.position.set(1.5, 0, .9); w.ladder.rotation.set(0, .4, .18); const up = Math.min(1, p * 1.4); w.dr.position.set(2 - up * .4, .2 + up * 1.8, 1.4); w.dr.scale.setScalar(.6); w.dr.rotation.set(0, -1, 0); w.d.arms[0].rotation.set(-1.4 + .2 * Math.sin(t * 6), 0, -.1); w.d.arms[1].rotation.set(0, 0, .3); } },
    { say: 'Snake jaws: cool, gross, or way too wide? Comment below.',
      quiz: { q: 'Would you want snake jaws?', options: ['Cool', 'Gross', 'Way too wide'], answer: 'Made up for people. Snakes do not unhinge their jaws; stretchy ligaments let them open wide.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); gape(w.p, .5 + .5 * Math.abs(Math.sin(t * 2))); } },
  ],
};
