// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people do not have spring legs. Hook: the premise as a question under 2 s; first frame shows a person bouncing on a spring.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.body, 14);
  p.head = group([0, 3.3, 0], p.body); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.spring = group([0, 0, 0], p.root); for (let i = 0; i < 7; i++) { const r = k.torus(.45, .07, mat('#B8C2CC', { metal: .7, rough: .3 }), [0, i * .2, 0], p.spring); r.rotation.set(Math.PI / 2, 0, 0); }
  return p;
}
// bounce: h = height of the body above the ground; the spring stretches to fill it
const bounce = (p, h) => { const s = 1 + Math.max(0, h) / 1.25; p.spring.scale.set(1, s, 1); p.body.position.y = 1.25 * s; };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.road = group(); box(80, .05, 8, mat('#555B63'), [0, .03, 0], w.road); for (let i = 0; i < 12; i++) box(1.6, .06, .2, mat('#FFFFFF'), [-20 + i * 4, .05, 0], w.road);
  w.cars = group(); for (let i = 0; i < 6; i++) { const c = group([-14 + i * 5, 0, 0], w.cars); box(3, 1, 1.6, mat(['#E2453C', '#3B82F6', '#FFC21F'][i % 3]), [0, .8, 0], c); box(1.6, .8, 1.4, mat('#BFE3F7'), [-.2, 1.6, 0], c); }
  w.office = group(); box(30, .3, 14, mat('#DDE3EA'), [0, 7, 0], w.office); box(30, 7, .4, mat('#EEF1F5'), [0, 3.5, -4], w.office); box(3, .15, 1.6, mat('#C8CED6'), [2, 1.5, -1], w.office);
  w.holes = group(); for (let i = 0; i < 3; i++) { const h = cyl(.9, .9, .32, mat('#3A2A1A'), [-2 + i * 2.2, 7, 0], w.holes, 16); }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.kanga = group(); const kb = ball(1.3, mat('#C8935A'), [0, 2.4, 0], w.kanga); kb.scale.set(.9, 1.3, .9); const kh = ball(.6, mat('#C8935A'), [0, 4.3, .3], w.kanga); for (const x of [-.3, .3]) { const e = k.cone(.18, .7, mat('#C8935A'), [x, 5, .1], w.kanga, 8); ball(.1, mat('#111111'), [x * .8, 4.45, .85], w.kanga); } box(.8, .2, 2, mat('#B07D4C'), [0, .2, .6], w.kanga); const kt = cyl(.25, .1, 2.6, mat('#C8935A'), [0, 1, -1.4], w.kanga, 8); kt.rotation.x = -1;
  w.mouth = box(.4, .08, .05, mat('#5A1E1E'), [0, 4.1, .88], w.kanga);
  return w;
}

const place = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); };

export default {
  id: '250',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SPRING LEGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD SPRING LEGS?'],
  title: 'What would happen if humans had spring legs?',
  description: 'Traffic jams are easy. Offices need much higher ceilings. And kangaroos are not impressed. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'springs', 'kangaroo', 'comedy', 'shorts'],
  sources: ['Comedy sketch: spring legs are made up.'],
  setup,
  scenes: [
    { say: 'What if humans had spring legs?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1.4, 3, 17], look: [0, 6, 0], fov: 50, to: { pos: [1.3, 3, 16.2], look: [0, 6, 0], fov: 48 } },
      update: (w, p, t) => { place(w, 0, 0, .3); bounce(w.p, 1.6 * Math.abs(Math.sin(t * 3))); } },
    { say: 'Traffic jam? Just bounce over it.', show: ['ground', 'road', 'cars', 'pp'], sky: '#9ED2F3', lightAt: [0, 6, 4], lightDist: 22,
      cam: { pos: [3, 5, 20], look: [0, 4.6, 0], fov: 52, to: { pos: [2.6, 5, 19], look: [0, 4.6, 0], fov: 50 } },
      update: (w, p, t) => { place(w, -8 + t * 4.5, 1.2, Math.PI / 2); bounce(w.p, 5 * Math.abs(Math.sin(t * 2.6))); } },
    { say: 'Offices? Need much higher ceilings.', label: '*OUCH*', show: ['ground', 'office', 'holes', 'pp'], sky: '#EEF1F5', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [2, 4.8, 13], look: [0, 5, 0], fov: 50, to: { pos: [1.8, 4.8, 12.2], look: [0, 5, 0], fov: 48 } },
      update: (w, p, t) => { w.holes.children.forEach((h, i) => h.visible = t > .55 + i * .6); place(w, -2 + Math.min(2, Math.floor(t / .6)) * 2.2, 0, 0); const ph = (t % .6) / .6; bounce(w.p, Math.min(2.9, 3.4 * Math.sin(ph * Math.PI))); } },
    { say: 'Waiting in line? Impossible to stand still.', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [-1.4, 3.6, 13], look: [0, 4.4, 0], fov: 48, to: { pos: [-1.3, 3.6, 12.3], look: [0, 4.4, 0], fov: 46 } },
      update: (w, p, t) => { place(w, .4 * Math.sin(t * 7), 0, -.3); bounce(w.p, .9 * Math.abs(Math.sin(t * 9))); } },
    { say: 'And kangaroos? Not impressed.', show: ['ground', 'room', 'pp', 'kanga'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 16,
      cam: { pos: [0, 4.4, 16], look: [0, 4.2, 0], fov: 50, to: { pos: [0, 4.4, 15], look: [0, 4.2, 0], fov: 48 } },
      update: (w, p, t) => { place(w, 2.6, 0, -.5); bounce(w.p, 1.2 * Math.abs(Math.sin(t * 3))); w.kanga.position.set(-2.6, 0, 0); w.kanga.rotation.y = .5; w.mouth.scale.set(1, .5, 1); } },
    { say: 'Spring legs: useful, awesome, or exhausting? Comment below.',
      quiz: { q: 'Would you want spring legs?', options: ['Useful', 'Awesome', 'Exhausting'], answer: 'Spring legs are made up. Kangaroos keep the bounce.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1.4, 2, 12], look: [0, 6, 0], fov: 48, to: { pos: [-1.4, 2, 12], look: [0, 6, 0] } },
      update: (w, p, t) => { place(w, 0, 0, .3); bounce(w.p, 1.4 * Math.abs(Math.sin(t * 3))); } },
  ],
};
