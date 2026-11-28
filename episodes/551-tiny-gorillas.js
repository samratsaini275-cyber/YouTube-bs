// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 270 tiny dogs.
// Hook: the premise as a question under 2 s; first frame shows a tiny gorilla beating its chest in a hand.

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
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

function gorilla(k, parent) {
  const { mat, ball, group, cyl } = k; const fur = mat('#2E2E2E', { rough: .9 }), skin = mat('#555555');
  const g = { root: group([0, 0, 0], parent) };
  const bd = ball(1, fur, [0, 1.6, 0], g.root); bd.scale.set(1, 1.2, .8); const ch = ball(.6, skin, [0, 1.7, .55], g.root); ch.scale.set(1.1, 1.2, .4);
  g.head = group([0, 2.9, .1], g.root); ball(.6, fur, [0, 0, 0], g.head); const face = ball(.42, skin, [0, -.05, .35], g.head); face.scale.set(1, .9, .6); for (const x of [-.15, .15]) ball(.06, mat('#111111'), [x, .08, .62], g.head);
  g.arms = [-1, 1].map(s => { const a = group([s * .95, 2.2, 0], g.root); cyl(.25, .22, 1.8, fur, [0, -.9, 0], a, 8); ball(.28, skin, [0, -1.85, 0], a); a.userData.s = s; return a; });
  for (const x of [-.4, .4]) cyl(.28, .25, .8, fur, [x, .4, 0], g.root, 8);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#E9F7EF'), [0, 10, -5], w.wall);
  w.g = gorilla(k, k.scene); w.gg = w.g.root;
  w.p = person(k, k.scene, '#F39C12'); w.pp = w.p.root;
  w.plant = group(); cyl(.5, .4, .7, mat('#C0392B'), [0, .35, 0], w.plant, 16); cyl(.05, .06, 2.2, mat('#1E8449'), [0, 1.7, 0], w.plant, 6); for (let i = 0; i < 6; i++) { const l = ball(.4, mat('#27AE60'), [Math.cos(i) * .5, 1.4 + i * .3, Math.sin(i) * .3], w.plant); l.scale.set(1.2, .2, .6); l.rotation.y = i; } w.vine = cyl(.02, .02, 1.2, mat('#1E8449'), [0, 0, 0], k.scene, 4);
  w.banana = group(); const ym = mat('#F4D03F', { rough: .5 }); for (let i = 0; i <= 14; i++) { const a = -0.9 + i / 14 * 1.8; const r = .28 * Math.sin((i / 14) * Math.PI) + .06; const sg = cyl(r, r, .3, ym, [Math.sin(a) * 1.6, -Math.cos(a) * 1.6 + 1.6, 0], w.banana, 12); sg.rotation.z = a + Math.PI / 2; } ball(.07, mat('#5D4037'), [Math.sin(.9) * 1.6, -Math.cos(.9) * 1.6 + 1.6, 0], w.banana);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const gput = (w, x, y, z, ry, s) => { w.gg.visible = true; w.gg.position.set(x, y, z); w.gg.rotation.set(0, ry, 0); w.gg.scale.setScalar(s); w.g.head.rotation.set(0, 0, 0); w.g.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .15)); };
const beat = (w, t) => w.g.arms.forEach((a, i) => { const on = Math.sin(t * 14 + i * Math.PI) > 0; a.rotation.set(-1.3, 0, -a.userData.s * (on ? .9 : .5)); });
const env = { sky: '#E9F7EF', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '551',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY GORILLAS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GORILLAS', 'WERE TINY?'],
  title: 'What would happen if gorillas were tiny?',
  description: 'Chest beating sounds like a ticking watch. Swinging through the jungle means one houseplant. And one banana lasts all year. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'gorilla', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: gorillas this small are made up. Quiz fact: chest-beating is used by both male and female gorillas to communicate, but more prominently by the larger silverback males (Encyclopaedia Britannica, "Gorilla").'],
  setup,
  scenes: [
    { say: 'What if gorillas were tiny?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [.9, 3.1, 4.4], look: [.8, 3.25, 1.4], fov: 46, to: { pos: [.9, 3.1, 4.1], look: [.8, 3.25, 1.4], fov: 44 } },
      update: (w, p, t) => { hide(w, 'plant', 'vine', 'banana'); stand(w, 0, 0, 0); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); w.p.head.rotation.x = .25; w.p.mouth.scale.set(1.3, 2, 1); gput(w, .95, 2.62, 1.6, -.3, .14); beat(w, t); } },
    { say: 'Chest beating? Sounds like a ticking watch.', show: ['floor', 'wall'], ...env,
      cam: { pos: [0, 1.2, 3.2], look: [0, .8, 0], fov: 42, to: { pos: [0, 1.2, 2.8], look: [0, .8, 0], fov: 40 } },
      update: (w, p, t) => { hide(w, 'plant', 'vine', 'banana', 'pp'); gput(w, 0, 0, 0, 0, .35); beat(w, t); w.g.head.rotation.x = -.2; } },
    { say: 'Swinging through the jungle? One houseplant.', show: ['floor', 'wall', 'plant', 'vine'], ...env,
      cam: { pos: [0, 2.2, 4.6], look: [0, 1.8, 0], fov: 46, to: { pos: [0, 2.2, 4.2], look: [0, 1.8, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'banana', 'pp'); w.plant.position.set(0, 0, 0); const a = Math.sin(t * 3) * .7; w.vine.position.set(Math.sin(a) * .6, 2.6 - Math.cos(a) * .6, .3); w.vine.rotation.z = a; gput(w, Math.sin(a) * 1.2, 2.6 - Math.cos(a) * 1.2 - .7, .3, 0, .15); w.g.arms.forEach(ar => ar.rotation.set(0, 0, ar.userData.s * 2.8)); } },
    { say: 'One banana? Lunch for a whole year.', show: ['floor', 'wall', 'banana'], ...env,
      cam: { pos: [0, 1.4, 4.6], look: [0, .9, 0], fov: 46, to: { pos: [0, 1.4, 4.2], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'plant', 'vine', 'pp'); w.banana.position.set(.2, .3, -.6); gput(w, -.6, 0, .6, .4, .3); w.g.arms[0].rotation.set(-1.5, 0, .3); w.g.head.rotation.x = -.3; } },
    { say: 'Tiny gorillas: adorable, cheeky, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny gorilla?', options: ['Adorable', 'Cheeky', 'Best pet ever'], answer: 'Fun fact: both male and female gorillas beat their chests, but big silverback males do it most.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.5, .8, 4.4], look: [0, 1.2, 0], fov: 44, to: { pos: [-.5, .8, 4.4], look: [0, 1.2, 0] } },
      update: (w, p, t) => { hide(w, 'plant', 'vine', 'banana', 'pp', 'wall'); gput(w, 0, 0, 0, .3, .55); beat(w, t * .6); } },
  ],
};
