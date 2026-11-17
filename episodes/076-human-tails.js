// Narrative 5: "What Would Happen If…". A made-up comedy sketch: people do not have tails.
// Hook rule: the premise as a question under 2 s, first frame already showing a person walking with a big wagging tail.

function person(k, parent, color, x, z, yaw = 0) {
  const { mat, box, cyl, ball, cone, group } = k;
  const p = { root: group([x, 0, z], parent) };
  p.root.rotation.y = yaw;
  cyl(1, 1.15, 4, mat(color), [0, 2, 0], p.root, 18);
  p.head = group([0, 4.9, 0], p.root);
  ball(1.05, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = [-.38, .38].map(x2 => ball(.15, mat('#111111'), [x2, .2, .95], p.head));
  p.mouth = box(.6, .14, .1, mat('#111111'), [0, -.35, 1], p.head);
  p.tail = [];
  let prev = p.root;
  for (let i = 0; i < 7; i++) { const g = group(i ? [0, .55, 0] : [0, 1.2, -1.05], prev); cyl(.28 - i * .025, .3 - i * .025, .6, mat(i === 6 ? '#FFFFFF' : '#C98B4E'), [0, .27, 0], g, 10); p.tail.push(g); prev = g; }
  return p;
}
function wag(p, t, speed = 10, amp = .35) { p.tail.forEach((g, i) => { g.rotation.x = i === 0 ? -1.9 : .22; g.rotation.z = amp * Math.sin(t * speed - i * .5); }); }
function walkp(p, t) { p.root.position.y = .15 * Math.abs(Math.sin(t * 7)); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B9C2CC', 0);
  w.street = group();
  box(200, .05, 8, mat('#D9D2C4'), [0, .03, 2], w.street).castShadow = false;
  for (let i = 0; i < 8; i++) { const h = 12 + (i % 3) * 3; box(9, h, 6, mat(['#E8C9A0', '#C9D6E8', '#E8B4A0', '#D6E8C4'][i % 4]), [-35 + i * 10, h / 2, -8], w.street); }
  w.p1 = person(k, k.scene, '#2F6FD6', 0, 2, Math.PI / 2); w.walker = w.p1.root;
  // poker night
  w.poker = group([0, 0, 60]);
  cyl(5, 5, .4, mat('#1E7A44'), [0, 3.4, 0], w.poker, 32); cyl(.6, 1, 3.2, mat('#5A3A1E'), [0, 1.6, 0], w.poker, 12);
  for (let i = 0; i < 4; i++) { const c = box(.8, .03, 1.1, mat('#FFFFFF'), [-1.5 + i * 1, 3.62, 1.5], w.poker); c.rotation.y = (i - 1.5) * .2; c.castShadow = false; }
  for (let i = 0; i < 6; i++) cyl(.35, .35, .1 + (i % 3) * .1, mat(['#E2453C', '#2F6FD6', '#FFD21F'][i % 3]), [-2 + (i % 3) * .5, 3.65, -1.5 + Math.floor(i / 3)], w.poker, 14);
  w.pk = [person(k, w.poker, '#E2453C', 0, 5.8, Math.PI), person(k, w.poker, '#22C55E', -5.8, 0, Math.PI / 2), person(k, w.poker, '#8B5CF6', 5.8, 0, -Math.PI / 2)];
  // interview
  w.office = group([0, 0, 120]);
  box(30, 14, .5, mat('#E6E9EE'), [0, 7, -6], w.office);
  box(8, .4, 4, mat('#6B4B2E'), [0, 3.6, -1], w.office);
  for (const x of [-3.6, 3.6]) box(.4, 3.6, 3.6, mat('#5A3A1E'), [x, 1.8, -1], w.office);
  w.boss = person(k, w.office, '#2A2A2A', 0, -4, 0);
  w.cand = person(k, w.office, '#F28C28', 0, 3.5, Math.PI);
  // the bus
  w.bus = group([0, 0, 180]);
  box(16, .3, 8, mat('#5A6070'), [0, .15, 0], w.bus);
  box(16, 9, .3, mat('#FFC21F'), [0, 4.5, -4], w.bus);
  for (let i = 0; i < 4; i++) box(2.6, 2, .1, mat('#9FD6F5'), [-5.5 + i * 3.7, 6, -3.8], w.bus).castShadow = false;
  cyl(.12, .12, 16, mat('#C9CED6', { metal: .8 }), [0, 8.5, 0], w.bus, 8).rotation.z = Math.PI / 2;
  w.riders = [];
  for (let i = 0; i < 5; i++) w.riders.push(person(k, w.bus, ['#E2453C', '#2F6FD6', '#22C55E', '#8B5CF6', '#FF8A1F'][i], -6 + i * 3, i % 2 ? -.5 : 1, Math.PI / 2 * (i % 2 ? 1 : -1)));
  // you and the dog
  w.home = group([0, 0, 240]);
  box(30, 14, .5, mat('#F2D9B8'), [0, 7, -6], w.home);
  w.you = person(k, w.home, '#2F6FD6', -2.5, 0, Math.PI / 2);
  w.dog = group([2.5, 0, 0], w.home); w.dog.rotation.y = -.5;
  const fur = mat('#C98B4E', { rough: .9 });
  box(2.6, 1.3, 1.2, fur, [0, 1.6, 0], w.dog);
  const dh = group([1.6, 2.5, 0], w.dog); ball(.75, fur, [0, 0, 0], dh); ball(.4, mat('#E0B07A'), [.6, -.2, 0], dh); ball(.14, mat('#111111'), [1, -.1, 0], dh);
  for (const z of [-.3, .3]) ball(.1, mat('#111111'), [.55, .25, z], dh);
  for (const [x, z] of [[-1, -.4], [1, -.4], [-1, .4], [1, .4]]) cyl(.18, .18, 1, fur, [x, .5, z], w.dog, 8);
  w.dtail = group([-1.3, 2, 0], w.dog); cyl(.15, .18, 1.4, fur, [0, .7, 0], w.dtail, 8);
  w.hearts = group([0, 8, 240]);
  for (let i = 0; i < 5; i++) { const h = ball(.35, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData = { x: -2 + i, ph: i * .2 }; h.castShadow = false; }
  return w;
}

export default {
  id: '076',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'HUMAN TAILS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD TAILS?'],
  title: 'What would happen if humans had tails?',
  description: 'No more poker face. No more playing it cool. Your dog finally gets you. (A made-up world where everyone has a tail.)',
  tags: ['whatif', 'funny', 'tails', 'dog', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: people with tails are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if humans had tails?',
      show: ['ground', 'street', 'walker'], sky: '#BFD8EE', lightAt: [0, 4, 2], lightDist: 20,
      cam: { pos: [7, 4, 18], look: [0, 6, 2], fov: 48, to: { pos: [6, 4, 15.5], look: [0, 6, 2], fov: 46 } },
      update: (w, p, t) => { w.walker.position.x = -2 + t * 1.5; walkp(w.p1, t); wag(w.p1, t, 12, .5); },
    },
    {
      say: 'Poker? Your tail gives you away.',
      show: ['ground', 'poker'], sky: '#3A2F2A', lightAt: [0, 5, 60], lightDist: 18,
      cam: { pos: [5, 8, 77], look: [0, 3.8, 63], fov: 50, to: { pos: [4.5, 8, 75.5], look: [0, 3.8, 63], fov: 48 } },
      update: (w, p, t) => { wag(w.pk[0], t, 22, .9); wag(w.pk[1], t, 2, .05); wag(w.pk[2], t, 2, .05); w.pk[0].mouth.scale.x = 1.6; },
    },
    {
      say: 'Job interview? It wags like crazy.',
      show: ['ground', 'office'], sky: '#E6E9EE', lightAt: [0, 4, 120], lightDist: 16,
      cam: { pos: [12, 5, 135], look: [0, 3.5, 122], fov: 48, to: { pos: [11, 5, 133], look: [0, 3.5, 122], fov: 46 } },
      update: (w, p, t) => { wag(w.cand, t, 24, 1); wag(w.boss, t, 1, .02); w.cand.eyes.forEach(e => e.scale.setScalar(1.4)); },
    },
    {
      say: 'Crowded bus? Total tail traffic.',
      show: ['ground', 'bus'], sky: '#BFD8EE', lightAt: [0, 5, 180], lightDist: 18,
      cam: { pos: [2, 10, 194], look: [0, 3.5, 180], fov: 50, to: { pos: [2, 9.5, 191], look: [0, 3.5, 180], fov: 48 } },
      shake: (t) => .05,
      update: (w, p, t) => { w.riders.forEach((r, i) => { wag(r, t + i, 6 + i * 2, .8); r.root.rotation.z = .03 * Math.sin(t * 3 + i); }); },
    },
    {
      say: 'But your dog? Finally, someone gets it.',
      show: ['ground', 'home', 'hearts'], sky: '#FFE3C2', lightAt: [0, 4, 240], lightDist: 16,
      cam: { pos: [3, 6, 258], look: [0, 3.5, 240], fov: 50, to: { pos: [3, 6, 255], look: [0, 3.5, 240], fov: 48 } },
      update: (w, p, t) => {
        wag(w.you, t, 14, .7); w.dtail.rotation.x = .9 * Math.sin(t * 14); w.you.mouth.scale.x = 1.6;
        w.hearts.children.forEach(h => { const f = (t * .5 + h.userData.ph) % 1; h.position.set(h.userData.x, f * 3, 0); h.scale.setScalar(.6 + f * .6); });
      },
    },
    {
      say: 'Human tails: cool, weird, or useful? Comment below.',
      quiz: { q: 'Human tails would be...', options: ['Cool', 'Weird', 'Useful'], answer: 'They are made up, but the poker problem would be very real.' },
      show: ['ground', 'street', 'walker'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 20,
      cam: { pos: [12, 2, 18], look: [0, 10, 2], fov: 46, to: { pos: [-10, 2, 18], look: [0, 10, 2] } },
      update: (w, p, t) => { w.walker.position.x = 0; walkp(w.p1, t); wag(w.p1, t, 12, .5); },
    },
  ],
};
