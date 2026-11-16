// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the snail speed camera and Steve are fictional.

function snail(k, parent, pos) {
  const g = k.group(pos, parent);
  const body = k.box(3.4, .6, 1, k.mat('#B9C27A', { rough: .8 }), [0, .3, 0], g);
  k.ball(.55, k.mat('#B9C27A'), [1.7, .75, 0], g);
  for (const z of [-.25, .25]) { const s = k.cyl(.05, .05, .9, k.mat('#8C9A55'), [1.85, 1.45, z], g, 6); s.rotation.z = -.3; k.ball(.12, k.mat('#111111'), [2, 1.9, z], g); }
  const shell = k.mesh(new k.THREE.TorusGeometry(.75, .45, 12, 24), k.mat('#C9773E', { rough: .5 }), [-.2, 1.25, 0], g);
  k.ball(.6, k.mat('#A85E2C'), [-.2, 1.25, 0], g);
  g.userData.shell = shell;
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#5DAF4E', 0);
  w.path = box(6, .1, 120, mat('#B9A37E', { rough: 1 }), [0, .05, 0], k.scene); w.path.castShadow = false;
  for (let i = -10; i <= 10; i++) box(.2, .12, 1.4, mat('#FFFFFF', { glow: .2 }), [0, .1, i * 5], k.scene).castShadow = false;
  // flowers to sell the scale
  w.flowers = group();
  for (let i = 0; i < 16; i++) { const x = (i % 2 ? 1 : -1) * (5 + (i * 7) % 6), z = -40 + i * 5; if (z > -16 && z < 24) continue; cyl(.15, .15, 4, mat('#3E8E3E'), [x, 2, z], w.flowers, 6); ball(1, mat(['#FF6B9A', '#FFD93D', '#9B7BFF'][i % 3]), [x, 4.3, z], w.flowers); }
  // the speed camera on a pole, and a sign
  w.cam = group([4.5, 0, -6]);
  cyl(.15, .15, 6, mat('#5A6070', { metal: .6 }), [0, 3, 0], w.cam, 8);
  box(1.6, 1, 1.4, mat('#FFD21F'), [0, 6.3, 0], w.cam);
  w.lens = cyl(.35, .35, .3, mat('#111111'), [-.85, 6.3, 0], w.cam, 16); w.lens.rotation.z = Math.PI / 2;
  w.flash = ball(.5, mat('#FFFFFF', { glow: 4 }), [-1.1, 6.3, 0], w.cam); w.flash.castShadow = false;
  w.sign = group([-4.5, 0, -2]);
  cyl(.12, .12, 5, mat('#5A6070'), [0, 2.5, 0], w.sign, 8);
  const disc = cyl(1.4, 1.4, .15, mat('#FFFFFF'), [0, 5.6, 0], w.sign, 32); disc.rotation.x = Math.PI / 2;
  const ring = k.torus(1.25, .18, mat('#E0161E'), [0, 5.6, .1], w.sign); ring.rotation.x = 0;
  k.mesh(new k.THREE.PlaneGeometry(.9, .5), mat('#111111'), [0, 5.6, .1], w.sign);   // a tiny "1"
  // Steve
  w.steve = snail(k, k.scene, [0, 0, 10]); w.steve.rotation.y = Math.PI / 2;
  w.trail = box(.8, .02, 1, mat('#DDE8F0', { metal: .6, rough: .1, opacity: .7 }), [0, .12, 14], k.scene); w.trail.castShadow = false;
  // the ticket
  w.ticket = group([0, 2, 0]);
  box(3, 4, .1, mat('#FFFFFF'), [0, 0, 0], w.ticket); for (let i = 0; i < 5; i++) box(2.2, .15, .05, mat('#9AA3AE'), [0, 1.2 - i * .6, .08], w.ticket);
  box(.9, .9, .06, mat('#E0161E'), [.8, -1.4, .08], w.ticket);
  return w;
}

function crawl(w, z) { w.steve.position.z = z; w.trail.scale.z = Math.max(.1, 14 - z); w.trail.position.z = (14 + z) / 2; }
const ALL = ['grass', 'path', 'flowers', 'cam', 'sign', 'steve', 'trail'];

export default {
  id: '045',
  style: '3d',
  voice: 'v3',
  case: 'THE SNAIL SPEED CAMERA',
  year: 'ENGINEERING NONSENSE',
  hook: ['A SPEED CAMERA', 'FOR SNAILS.'],
  title: 'Engineers put a speed camera on a garden path for snails',
  description: 'One garden path. One speed camera. One snail who was in a hurry. (Steve and his ticket are made up.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'snail', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the snail speed camera, its speed limit and Steve are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Engineers installed a speed camera. For snails.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 25,
      cam: { pos: [-5, 6, 24], look: [2, 3, 0], fov: 46, to: { pos: [-4, 5, 19], look: [2, 3.2, -1], fov: 44 } },
      update: (w, p, t) => { crawl(w, 10 - t * .1); w.flash.visible = false; w.ticket.visible = false; },
    },
    {
      say: 'The limit is one centimetre per minute.',
      show: ALL, sky: '#A7D8F5', lightAt: [-4, 5, -2], lightDist: 15,
      cam: { pos: [-2, 6, 6], look: [-4.5, 5.4, -2], fov: 40, to: { pos: [-3, 6, 4.5], look: [-4.5, 5.6, -2], fov: 36 } },
      update: (w, p, t) => { crawl(w, 9.6); w.flash.visible = false; w.ticket.visible = false; },
    },
    {
      say: 'Steve was doing two.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 1, 6], lightDist: 15,
      cam: { pos: [6, 2.5, 12], look: [0, 1, 7], fov: 40, to: { pos: [5, 2.2, 9], look: [0, 1, 5], fov: 38 } },
      update: (w, p, t) => { crawl(w, 9.4 - t * .9); w.steve.children[0].scale.x = 1 + .05 * Math.sin(t * 8); w.flash.visible = false; w.ticket.visible = false; },
    },
    {
      say: 'Flash.',
      show: ALL, sky: '#FFFFFF', lightAt: [2, 4, -2], lightDist: 20,
      cam: { pos: [-5, 5, 16], look: [2.5, 3.5, -1], fov: 46, to: { pos: [-4.5, 4.8, 14], look: [2.5, 3.6, -1], fov: 44 } },
      update: (w, p, t) => { crawl(w, 6); w.flash.visible = (t % .4) < .2; w.flash.scale.setScalar(1 + (t % .4) * 6); w.ticket.visible = false; },
    },
    {
      say: 'He got a ticket. He is appealing. He should reach the courthouse in nine years.',
      show: [...ALL, 'ticket'], sky: '#9ED2F3', lightAt: [0, 2, 4], lightDist: 15,
      cam: { pos: [3, 4, 14], look: [0, 2, 5], fov: 42, to: { pos: [2, 3.6, 11], look: [0, 2, 5], fov: 40 } },
      update: (w, p, t) => { crawl(w, 5.5 - t * .05); w.flash.visible = false; w.ticket.visible = true; w.ticket.position.set(0, 2.2 + .15 * Math.sin(t * 2), 3); w.ticket.rotation.y = .3 * Math.sin(t); },
    },
    {
      say: 'Quick question. What is a fair fine for a speeding snail? Option A, one lettuce leaf. Option B, the slow lane for a week. Or option C, no fine. That is impressive. Comment your answer.',
      quiz: { q: 'What is a fair fine for a speeding snail?', options: ['One lettuce leaf', 'The slow lane for a week', 'No fine. That is impressive.'], answer: 'Steve is made up, so any fine works. (Team C.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 2, 2], lightDist: 25,
      cam: { pos: [10, 3, 22], look: [0, 9, 0], fov: 46, to: { pos: [-10, 3, 22], look: [0, 9, 0] } },
      update: (w, p, t) => { crawl(w, 5.2); w.flash.visible = false; w.ticket.visible = false; },
    },
  ],
};
