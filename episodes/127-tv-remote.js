// Narrative 8: "Objects With Opinions". A made-up comedy sketch: TV remotes do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the remote with a face on a sofa cushion.

function remote(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  box(1.1, 3.4, .45, mat('#2A2A30', { rough: .4 }), [0, 1.7, 0], r.body);
  cyl(.15, .15, .06, mat('#E2453C'), [0, 3.05, .24], r.body, 12).rotation.x = Math.PI / 2;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const b = cyl(.11, .11, .05, mat('#9AA3AE'), [-.3 + j * .3, .5 + i * .3, .24], r.body, 10); b.rotation.x = Math.PI / 2; }
  for (const x of [-.22, .22]) { ball(.14, mat('#FFFFFF'), [x, 2.45, .25], r.body); ball(.07, mat('#111111'), [x, 2.45, .36], r.body); }
  r.mouth = box(.32, .06, .05, mat('#E2453C'), [0, 2.05, .25], r.body);
  r.door = box(.9, 1.2, .05, mat('#3A3A40'), [0, 1, -.25], r.body);
  return r;
}
function talk(r, t, on = true) { r.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9A27A', 0);
  w.room = group();
  box(40, 20, .5, mat('#E8D7B0'), [0, 10, -8], w.room);
  w.tv = group([0, 0, -6.5], w.room); box(7, 4, .4, mat('#111111'), [0, 6, 0], w.tv); box(6.6, 3.6, .05, mat('#3A6EA5', { glow: .4 }), [0, 6, .22], w.tv);
  w.sofa = group([0, 0, 0]);
  box(9, 2, 4, mat('#8B5CF6'), [0, 1, 0], w.sofa); box(9, 3, 1, mat('#8B5CF6'), [0, 2.5, -1.6], w.sofa);
  w.cush = [-2.2, 2.2].map(x => box(4.2, .8, 3, mat('#9F78F8'), [x, 2.4, .3], w.sofa));
  w.r = remote(k, k.scene); w.rm = w.r.root;
  w.hand = group([0, 0, 0]); cyl(.35, .35, 3, mat('#F2C9A0'), [0, 1.5, 0], w.hand, 10); ball(.5, mat('#F2C9A0'), [0, 3.1, 0], w.hand);
  w.batts = group([0, 0, 0]);
  for (const x of [-.25, .25]) { cyl(.18, .18, .9, mat('#FFD21F'), [x, 0, 0], w.batts, 12); cyl(.18, .18, .25, mat('#111111'), [x, -.55, 0], w.batts, 12); }
  w.crumbs = group([0, 0, 0]);
  for (let i = 0; i < 10; i++) { const c = ball(.15, mat(['#D9A35E', '#FFD21F', '#E2453C'][i % 3], { rough: 1 }), [((i * 37) % 30) / 10 - 1.5, 0, ((i * 17) % 20) / 10 - 1], w.crumbs); c.castShadow = false; }
  w.coin = cyl(.3, .3, .06, mat('#D4AF37', { metal: .8 }), [0, 0, 0], k.scene, 16);
  return w;
}

export default {
  id: '127',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE REMOTE WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS REMOTE', 'HAS A COMPLAINT.'],
  title: 'This TV remote has a complaint',
  description: 'Lost in the sofa. Batteries stolen for the toy car. Turns out he has been hiding on purpose. (A made-up talking remote.)',
  tags: ['objectswithopinions', 'funny', 'remote', 'tv', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking TV remotes are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This remote has a complaint.',
      show: ['ground', 'room', 'sofa', 'rm'], sky: '#E8D7B0', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [1.5, 2.8, 11.5], look: [0, 6, 0], fov: 44, to: { pos: [1.4, 2.8, 10.8], look: [0, 5.9, 0], fov: 42 } },
      update: (w, p, t) => { w.rm.position.set(0, 2.8, 1); w.rm.rotation.set(-.2, -.2, 0); w.cush.forEach(c => { c.visible = true; c.position.y = 2.4; c.rotation.set(0, 0, 0); }); talk(w.r, t, t > .2); },
    },
    {
      say: 'Every night, he gets lost in the sofa.',
      show: ['ground', 'room', 'sofa', 'rm', 'crumbs', 'coin'], sky: '#E8D7B0', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [3, 6.5, 8], look: [2.2, 2.6, 1.2], fov: 46, to: { pos: [2.9, 6.3, 7.3], look: [2.2, 2.6, 1.2], fov: 44 } },
      update: (w, p, t) => {
        w.cush[1].visible = t < .4; w.cush[1].position.y = 2.4 + t * 2; w.cush[0].position.y = 2.4;
        w.rm.position.set(2.4, 2.25, -.6); w.rm.rotation.set(-Math.PI / 2, 0, Math.PI + .3); talk(w.r, t);
        w.crumbs.position.set(2.2, 2.05, .9); w.coin.position.set(1.4, 2.06, .9);
      },
    },
    {
      say: 'And his batteries get stolen. For the toy car.',
      show: ['ground', 'room', 'sofa', 'rm', 'hand', 'batts'], sky: '#E8D7B0', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [1.2, 4.2, 8], look: [0, 3.6, 1], fov: 44, to: { pos: [1.1, 4.2, 7.3], look: [0, 3.6, 1], fov: 42 } },
      update: (w, p, t) => {
        w.cush.forEach(c => { c.visible = true; c.position.y = 2.4; c.rotation.set(0, 0, 0); }); w.rm.position.set(0, 2.8, 1); w.rm.rotation.set(0, Math.PI, 0); talk(w.r, t);
        const pull = Math.min(1, Math.max(0, (t - .6) * 1.2)); w.r.door.position.z = -.25 - pull * .8; w.batts.position.set(0, 3.8 + pull * 1.5, .4 - pull * 1.5);
        w.hand.position.set(1.8 - pull * .4, 2.2 + pull * 1.5, -.4 - pull * 1.2); w.hand.rotation.set(0, 0, .8);
      },
    },
    {
      say: 'Twist: he hides in the sofa on purpose. Free crumbs.',
      show: ['ground', 'room', 'sofa', 'rm', 'crumbs'], sky: '#FFE3C2', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.8, 6.4, 7.5], look: [2.2, 2.6, 1.2], fov: 44, to: { pos: [2.7, 6.2, 6.8], look: [2.2, 2.6, 1.2], fov: 42 } },
      update: (w, p, t) => {
        w.r.door.position.z = -.25; w.cush[1].visible = false; w.cush[0].position.y = 2.4;
        w.rm.position.set(2.4, 2.25, -.6); w.rm.rotation.set(-Math.PI / 2, 0, Math.PI + .3 + .1 * Math.sin(t * 3)); talk(w.r, t, t < 1.8); w.crumbs.position.set(2.2, 2.05, .9);
        w.crumbs.children.forEach((c, i) => { c.visible = i >= Math.floor(t * 3); });
      },
    },
    {
      say: 'Lost remote: sofa, fridge, or a pocket? Comment below.',
      quiz: { q: 'Where is your remote right now?', options: ['The sofa', 'The fridge', 'A pocket'], answer: 'This remote is made up. Check the sofa anyway.' },
      show: ['ground', 'room', 'sofa', 'rm'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [1.5, 2.4, 9], look: [0, 6, 0], fov: 44, to: { pos: [-1.5, 2.4, 9], look: [0, 6, 0] } },
      update: (w, p, t) => { w.cush.forEach(c => { c.visible = true; c.position.y = 2.4; c.rotation.set(0, 0, 0); }); w.rm.position.set(0, 2.8, 1); w.rm.rotation.set(-.2, -.2, 0); talk(w.r, t, false); },
    },
  ],
};
