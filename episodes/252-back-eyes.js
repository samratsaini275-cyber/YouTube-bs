// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people do not have eyes in the back of their heads. Hook: the premise as a question under 2 s; first frame shows the back of a head with eyes.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const z of [1, -1]) for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64 * z], p.head); ball(.07, mat('#111111'), [x, .2, .76 * z], p.head); }
  p.mouth = k.box(.3, .06, .05, mat('#5A1E1E'), [0, -.25, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.class = group(); box(40, 20, .5, mat('#E8F0E0'), [0, 10, -6], w.class); box(8, 3.4, .1, mat('#2F5D3A'), [0, 4.4, -5.7], w.class); for (let i = 0; i < 3; i++) box(1.8, .1, .02, mat('#FFFFFF'), [-2 + i * 2, 4.6 - (i % 2) * .6, -5.64], w.class);
  w.desk = group(); box(2.4, .2, 1.4, mat('#8B5A2B'), [0, 1.8, 0], w.desk); for (const x of [-1, 1]) box(.15, 1.8, .15, mat('#6B4B2E'), [x, .9, 0], w.desk);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root; w.p2 = person(k, k.scene, '#E2453C'); w.pp2 = w.p2.root; w.p3 = person(k, k.scene, '#22A06B'); w.pp3 = w.p3.root;
  w.cookie = group(); cyl(.5, .5, .15, mat('#C8935A'), [0, 0, 0], w.cookie, 20); for (let i = 0; i < 5; i++) ball(.08, mat('#3A2A1A'), [Math.cos(i * 1.3) * .3, .08, Math.sin(i * 1.3) * .3], w.cookie);
  w.jar = group(); cyl(.7, .7, 1.4, mat('#CFEFFF', { opacity: .5 }), [0, .7, 0], w.jar, 20);
  w.mirror = group(); box(3, 4, .15, mat('#BFE3F7', { metal: .5, rough: .05 }), [0, 3, -3.6], w.mirror);
  w.car = group(); box(3.6, 1.2, 2, mat('#E2453C'), [0, .8, 0], w.car); box(2, 1, 1.8, mat('#BFE3F7'), [-.2, 1.8, 0], w.car); for (const x of [-1.2, 1.2]) for (const z of [-1, 1]) { const wh = cyl(.4, .4, .3, mat('#222222'), [x, .4, z], w.car, 14); wh.rotation.x = Math.PI / 2; }
  return w;
}

const stand = (w, P, pp, x, z, ry) => { pp.position.set(x, 0, z); pp.rotation.set(0, ry, 0); P.head.rotation.set(0, 0, 0); P.mouth.scale.set(1, 1, 1); };
const walk = (pp, t) => { pp.position.y = .1 * Math.abs(Math.sin(t * 8)); };

export default {
  id: '252',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BACK EYES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS HAD', 'EYES IN THE BACK?'],
  title: 'What would happen if humans had eyes in the back of their heads?',
  description: 'Teachers always know. Sneaking a cookie is over. And reversing the car? Finally easy. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'eyes', 'comedy', 'animation', 'shorts'],
  sources: ['Comedy sketch: eyes in the back of your head are made up.'],
  setup,
  scenes: [
    { say: 'What if we had eyes in the back?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [-1.2, 2.6, 9.5], look: [0, 3.95, 0], fov: 48, to: { pos: [-1.1, 2.6, 8.8], look: [0, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, Math.PI + .2 * Math.sin(t * 1.5)); } },
    { say: 'Teachers? They really do see everything.', show: ['ground', 'class', 'pp', 'pp2', 'desk'], sky: '#E8F0E0', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [2, 3.8, 11], look: [0, 3.4, -2], fov: 50, to: { pos: [1.8, 3.8, 10.2], look: [0, 3.4, -2], fov: 48 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, -4.4, Math.PI); stand(w, w.p2, w.pp2, 1.6, 1.4, Math.PI); w.desk.position.set(1.6, 0, .4); w.p2.head.rotation.z = p > .5 ? 0 : .3 * Math.sin(t * 4); w.p.mouth.scale.y = p > .55 ? 2.5 : 1; } },
    { say: 'Sneaking a cookie? Never again.', show: ['ground', 'room', 'pp', 'pp3', 'cookie', 'jar'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 3.4, 10], look: [0, 3, 0], fov: 48, to: { pos: [.9, 3.4, 9.3], look: [0, 3, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, -1.4, -1.2, Math.PI / 2 + Math.PI); stand(w, w.p3, w.pp3, 1.6, .4, -Math.PI / 2); w.jar.position.set(-1.4 + 1.2, 1.6, -1.2); w.cookie.position.set(1.6 - .9 * Math.min(1, t / 1), 2.3, .4); w.p3.mouth.scale.y = p > .6 ? 2.5 : 1; } },
    { say: 'Mirrors? Now very confusing.', show: ['ground', 'room', 'pp', 'mirror'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2.6, 3.6, 7], look: [0, 3.3, -1.4], fov: 48, to: { pos: [2.4, 3.6, 6.4], look: [0, 3.3, -1.4], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, -1.2, 0); w.pp.rotation.y = t * 2.2; } },
    { say: 'But reversing the car? Finally easy.', label: '*NO MORE BUMPS*', show: ['ground', 'room', 'car', 'pp'], sky: '#9ED2F3', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [4, 4, 12], look: [0, 1.8, 0], fov: 50, to: { pos: [3.6, 4, 11], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.car.position.set(-.4 + p * 1.4, 0, 0); w.car.rotation.y = 0; stand(w, w.p, w.pp, -.4 + p * 1.4 - .3, 0, -Math.PI / 2); w.pp.position.y = .3; w.pp.scale.setScalar(.7); } },
    { say: 'Back eyes: useful, awesome, or creepy? Comment below.',
      quiz: { q: 'Would you want eyes in the back of your head?', options: ['Useful', 'Awesome', 'Creepy'], answer: 'Back-of-head eyes are made up. Teachers just pay attention.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.pp.scale.setScalar(1); stand(w, w.p, w.pp, 0, 0, t * 1.6); } },
  ],
};
