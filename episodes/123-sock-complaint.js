// Narrative 8: "Objects With Opinions". A made-up comedy sketch: socks do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the sock with a face.

function sock(k, parent, color = '#E2453C', stripe = '#FFFFFF') {
  const { mat, box, cyl, ball, cone, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  cyl(.7, .7, 3, mat(color, { rough: .9 }), [0, 2.2, 0], s.body, 16);
  for (const y of [3, 3.4]) cyl(.72, .72, .18, mat(stripe, { rough: .9 }), [0, y, 0], s.body, 16);
  const foot = cyl(.7, .7, 2, mat(color, { rough: .9 }), [.7, .7, 0], s.body, 16); foot.rotation.z = Math.PI / 2;
  ball(.7, mat(color, { rough: .9 }), [1.7, .7, 0], s.body);
  ball(.7, mat(color, { rough: .9 }), [0, .7, 0], s.body);
  for (const x of [-.25, .25]) { ball(.16, mat('#FFFFFF'), [x, 2.6, .64], s.body); ball(.08, mat('#111111'), [x, 2.6, .76], s.body); }
  s.mouth = box(.35, .07, .05, mat('#5A1E1E'), [0, 2.15, .7], s.body);
  return s;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9D6E8', 0);
  w.laundry = group();
  box(50, 26, .5, mat('#E8F0F6'), [0, 13, -8], w.laundry);
  w.dryer = group([4, 0, -4]);
  box(5, 5.5, 4, mat('#F4F4F0'), [0, 2.75, 0], w.dryer);
  const door = cyl(1.7, 1.7, .2, mat('#9AA3AE', { metal: .5 }), [0, 2.8, 2.05], w.dryer, 28); door.rotation.x = Math.PI / 2;
  w.glass = cyl(1.4, 1.4, .22, mat('#1E2430', { opacity: .7 }), [0, 2.8, 2.07], w.dryer, 28); w.glass.rotation.x = Math.PI / 2;
  box(3, .4, .1, mat('#5A6070'), [0, 5, 2.02], w.dryer);
  w.s = sock(k, k.scene); w.sk = w.s.root;
  w.twin = sock(k, k.scene); w.tw = w.twin.root;
  w.hand = group([0, 0, 0]);
  cyl(.6, .65, 3, mat('#F2C9A0'), [0, -1.5, 0], w.hand, 12);
  cyl(.9, .9, 3, mat('#2F6FD6'), [0, -4, 0], w.hand, 12);
  w.stage = group([0, 0, 60]);
  box(8, 3, .4, mat('#8B3A2E'), [0, 1.5, .5], w.stage);
  box(9, .6, .6, mat('#FFD21F'), [0, 6.6, .3], w.stage);
  for (const x of [-4.2, 4.2]) box(.6, 7, .6, mat('#8B3A2E'), [x, 3.5, .3], w.stage);
  w.beach = group([0, 0, 120]);
  box(30, .05, 20, mat('#F2D7A0'), [0, .03, 0], w.beach).castShadow = false;
  const um = cone(3, 1, mat('#E2453C', { double: true }), [-2, 5.5, -1], w.beach, 10); cyl(.07, .07, 5, mat('#FFFFFF'), [-2, 2.5, -1], w.beach, 6);
  box(2.4, .2, 3, mat('#22C55E'), [.5, .8, 0], w.beach); box(2.4, 2, .2, mat('#22C55E'), [.5, 1.8, -1.4], w.beach);
  w.shades = group([0, 0, 0]);
  for (const x of [-.25, .25]) box(.36, .2, .05, mat('#111111', { metal: .4 }), [x, 0, 0], w.shades);
  w.drink = group([0, 0, 0]); cyl(.25, .2, .6, mat('#FF8A1F', { opacity: .8 }), [0, .3, 0], w.drink, 10); cyl(.03, .03, .6, mat('#FFFFFF'), [.1, .7, 0], w.drink, 4);
  return w;
}

function talk(s, t, on = true) { s.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

export default {
  id: '123',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SOCK WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SOCK', 'HAS A COMPLAINT.'],
  title: 'This sock has a complaint',
  description: 'The dryer keeps eating his twin. Now he is a puppet. The twin, meanwhile, is doing great. (A made-up talking sock.)',
  tags: ['objectswithopinions', 'funny', 'sock', 'laundry', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking socks are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This sock has a complaint.',
      show: ['ground', 'laundry', 'dryer', 'sk'], sky: '#E8F0F6', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [1.5, 2.8, 12], look: [.5, 5.6, 0], fov: 46, to: { pos: [1.4, 2.8, 11], look: [.5, 5.5, 0], fov: 44 } },
      update: (w, p, t) => { w.sk.position.set(-.5, 0, 1); w.sk.rotation.set(0, -.3, 0); w.s.body.rotation.z = .05 * Math.sin(t * 3); talk(w.s, t, t > .2); },
    },
    {
      say: 'Every single week, the dryer eats his twin.',
      show: ['ground', 'laundry', 'dryer', 'sk', 'tw'], sky: '#E8F0F6', lightAt: [2, 4, 0], lightDist: 14,
      cam: { pos: [1, 4.5, 16], look: [.9, 3.4, -1], fov: 54, to: { pos: [1.2, 4.5, 15], look: [1.3, 3.4, -1], fov: 52 } },
      shake: (t) => t > .8 ? .04 : 0,
      update: (w, p, t) => {
        w.sk.position.set(-1.6, 0, 1.5); w.sk.rotation.set(0, .3, 0); talk(w.s, t); w.s.body.rotation.z = 0;
        const suck = Math.min(1, Math.max(0, (t - .6) * 1.2)); w.tw.position.set(2.6 + suck * 1.4, suck * 2.2, 1.6 - suck * 3.2); w.tw.rotation.set(0, 0, suck * 8); w.tw.scale.setScalar(Math.max(.01, 1 - suck));
      },
    },
    {
      say: 'So now he works as a puppet.',
      show: ['ground', 'laundry', 'stage', 'sk', 'hand'], sky: '#4A3A5A', lightAt: [0, 5, 62], lightDist: 12,
      cam: { pos: [0, 4.6, 70], look: [0, 4.4, 60], fov: 46, to: { pos: [0, 4.6, 69], look: [0, 4.4, 60], fov: 44 } },
      update: (w, p, t) => {
        w.tw.scale.setScalar(1); w.sk.position.set(-.7, 3.1 + .3 * Math.sin(t * 5), 60); w.sk.rotation.set(0, 0, .15 * Math.sin(t * 4)); talk(w.s, t);
        w.hand.position.set(0, 3.1 + .3 * Math.sin(t * 5), 59.6); w.s.body.rotation.z = 0;
      },
    },
    {
      say: 'His twin? Behind the dryer. Living his best life.',
      show: ['ground', 'beach', 'tw', 'shades', 'drink'], sky: '#9ED2F3', lightAt: [0, 4, 120], lightDist: 14,
      cam: { pos: [2.5, 3.5, 129], look: [.5, 2.4, 120], fov: 46, to: { pos: [2.3, 3.5, 128], look: [.5, 2.4, 120], fov: 44 } },
      update: (w, p, t) => {
        w.tw.position.set(.3, .9, 120.2); w.tw.rotation.set(0, .2, -.35); w.tw.scale.setScalar(.8); talk(w.twin, t, false);
        const hp = new w.tw.position.constructor(0, 2.6, .78); w.twin.body.localToWorld(hp); w.shades.position.copy(hp); w.shades.rotation.set(0, .2, -.35);
        w.drink.position.set(1.7, 1, 121);
      },
    },
    {
      say: 'Lost socks go to: the dryer, a portal, or a holiday? Comment below.',
      quiz: { q: 'Where do lost socks really go?', options: ['The dryer', 'A portal', 'A holiday'], answer: 'This sock is made up. Ours voted holiday.' },
      show: ['ground', 'laundry', 'dryer', 'sk'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [1.5, 1.5, 11], look: [.5, 6, 0], fov: 46, to: { pos: [-1.5, 1.5, 11], look: [.5, 6, 0] } },
      update: (w, p, t) => { w.sk.position.set(-.5, 0, 1); w.sk.rotation.set(0, -.3, 0); w.s.body.rotation.z = .05 * Math.sin(t * 3); talk(w.s, t, false); },
    },
  ],
};
