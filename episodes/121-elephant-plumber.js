// Narrative 7: "Animals at Work". A made-up comedy sketch: elephants are not plumbers; the customer just gets wet.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the elephant in a cap holding a wrench in a kitchen.

function elephant(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const skin = mat('#9AA3AE', { rough: .8 });
  const e = { root: group([0, 0, 0], parent) };
  e.body = group([0, 0, 0], e.root);
  const b = ball(2, skin, [0, 3.4, 0], e.body); b.scale.set(1.4, 1, 1);
  box(3.2, 1.6, 3.4, mat('#2F6FD6'), [0, 3.3, 0], e.body);
  for (const x of [-1.6, 1.6]) for (const z of [-.9, .9]) cyl(.6, .6, 2.2, skin, [x, 1.1, z], e.body, 12);
  e.head = group([2.6, 4.6, 0], e.body);
  ball(1.3, skin, [0, 0, 0], e.head);
  for (const z of [-1, 1]) { const ear = ball(1, mat('#B8C0CA'), [-.4, .1, z * 1.3], e.head); ear.scale.set(.3, 1.1, .9); ball(.15, mat('#111111'), [.95, .35, z * .5], e.head); cone(.12, .7, mat('#FFFFFF'), [.9, -.6, z * .45], e.head, 6).rotation.z = -1.9; }
  e.trunk = [];
  let prev = group([1.1, -.3, 0], e.head); e.trunkBase = prev;
  for (let i = 0; i < 5; i++) { const sg = group(i ? [0, -.45, 0] : [0, 0, 0], prev); cyl(.35 - i * .04, .32 - i * .04, .5, skin, [0, -.22, 0], sg, 10); e.trunk.push(sg); prev = sg; }
  e.tip = prev;
  e.cap = group([0, 1.15, 0], e.head);
  cyl(.8, .8, .4, mat('#E2453C'), [0, 0, 0], e.cap, 16); box(.8, .07, 1.1, mat('#E2453C'), [.7, -.15, 0], e.cap);
  e.wrench = group([0, -.4, 0], e.tip); box(.15, .9, .15, mat('#C0C0C8', { metal: .8 }), [0, -.45, 0], e.wrench); box(.4, .25, .15, mat('#C0C0C8', { metal: .8 }), [0, -.95, 0], e.wrench);
  return e;
}
function curl(e, a) { e.trunk.forEach((s, i) => { s.rotation.z = a * (i + 1) / 5; }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8E2D6', 0);
  w.kitchen = group();
  box(60, 26, .5, mat('#F2E6C8'), [0, 13, -8], w.kitchen);
  for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) box(1.9, 1.9, .05, mat((i + j) % 2 ? '#FFFFFF' : '#BFE3EA'), [-9 + i * 2, 5 + j * 2, -7.7], w.kitchen).castShadow = false;
  w.cab = group([-4, 0, -5.5]);
  box(5, 3.6, 2.4, mat('#C08A48'), [0, 1.8, 0], w.cab); box(5.2, .3, 2.6, mat('#E8E8E8'), [0, 3.75, 0], w.cab);
  w.doorL = box(2.4, 3.2, .1, mat('#A0703A'), [-1.25, 1.8, 1.25], w.cab); w.doorR = box(2.4, 3.2, .1, mat('#A0703A'), [1.25, 1.8, 1.25], w.cab);
  cyl(.12, .12, 1.4, mat('#C0C0C8', { metal: .8 }), [0, 4.5, -.6], w.cab, 8);
  w.e = elephant(k, k.scene); w.el = w.e.root;
  w.flood = box(40, 1, 20, mat('#5BA8D9', { opacity: .65, rough: .05 }), [0, 0, 0], k.scene); w.flood.castShadow = false;
  w.spout = group();
  for (let i = 0; i < 16; i++) { const d = ball(.25, mat('#BFE8FF', { glow: .5 }), [0, 0, 0], w.spout); d.userData = { ph: (i * .13) % 1, a: i * .4 }; d.castShadow = false; }
  w.cust = group([0, 0, 0]);
  cyl(.8, .9, 3.2, mat('#22C55E'), [0, 1.6, 0], w.cust, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.cust);
  w.ceyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 4.05, .78], w.cust));
  return w;
}

export default {
  id: '121',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ELEPHANT PLUMBER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS ELEPHANT', 'IS A PLUMBER.'],
  title: 'This elephant is a plumber',
  description: 'He cannot fit under the sink. He drinks the whole flood. Then he sneezes. (A made-up elephant.)',
  tags: ['animalsatwork', 'funny', 'elephant', 'plumber', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the elephant plumber is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This elephant is a plumber.',
      show: ['ground', 'kitchen', 'cab', 'el'], sky: '#F2E6C8', lightAt: [0, 5, 2], lightDist: 16,
      cam: { pos: [3, 4, 21], look: [.8, 8.6, 0], fov: 48, to: { pos: [2.8, 4, 20], look: [.8, 8.5, 0], fov: 46 } },
      update: (w, p, t) => { w.el.position.set(0, 0, 0); w.el.rotation.set(0, -1.1, 0); curl(w.e, -.3 + .2 * Math.sin(t * 2)); w.e.wrench.visible = true; },
    },
    {
      say: 'First problem: he does not fit under the sink.',
      show: ['ground', 'kitchen', 'cab', 'el'], sky: '#F2E6C8', lightAt: [-3, 4, 0], lightDist: 16,
      cam: { pos: [6, 5, 14], look: [-2.5, 3, -3], fov: 50, to: { pos: [5.6, 5, 13], look: [-2.5, 3, -3], fov: 48 } },
      shake: (t) => t > 1 ? .05 : 0,
      update: (w, p, t) => {
        w.el.position.set(-1.2 + .2 * Math.sin(t * 6), 0, -.4); w.el.rotation.set(0, Math.PI * .75, 0); curl(w.e, .2); w.e.body.rotation.z = .05 * Math.sin(t * 9);
        w.doorL.rotation.y = -1.2; w.doorR.rotation.y = 1.2; w.doorL.position.x = -2.4; w.doorR.position.x = 2.4;
      },
    },
    {
      say: 'Then a pipe bursts. So he drinks the whole flood.',
      show: ['ground', 'kitchen', 'cab', 'el', 'flood'], sky: '#BFD8EE', lightAt: [0, 5, 0], lightDist: 18,
      cam: { pos: [3, 6, 20], look: [.6, 4, 0], fov: 52, to: { pos: [2.8, 6, 19], look: [.6, 4, 0], fov: 50 } },
      update: (w, p, t) => {
        w.e.body.rotation.z = 0; w.el.position.set(-.5, 0, 1); w.el.rotation.set(0, -1, 0); curl(w.e, .9); w.e.wrench.visible = false;
        w.flood.position.y = -.5 + Math.max(.05, 2.2 - t * 1.2); w.e.body.scale.setScalar(1 + Math.min(.2, t * .1));
      },
    },
    {
      say: 'And then he sneezes it all back out.',
      show: ['ground', 'kitchen', 'el', 'spout', 'cust'], sky: '#BFD8EE', lightAt: [2, 5, 0], lightDist: 18,
      cam: { pos: [4, 5, 18], look: [3, 4, 0], fov: 52, to: { pos: [4.4, 5, 17], look: [3.4, 4, 0], fov: 50 } },
      shake: (t) => t > .8 && t < 1.1 ? .12 : 0,
      update: (w, p, t) => {
        w.e.body.scale.setScalar(1); w.el.position.set(-1.5, 0, 0); w.el.rotation.set(0, 0, 0); curl(w.e, -.9 + (t > .8 ? 0 : .3 * Math.sin(t * 8)));
        w.cust.position.set(7, 0, 0); w.cust.rotation.y = -Math.PI / 2; w.ceyes.forEach(e => e.scale.setScalar(t > 1 ? 1.7 : 1));
        const tp = new w.el.position.constructor(); w.e.tip.getWorldPosition(tp);
        w.spout.children.forEach(d => { const f = (t * 2.5 + d.userData.ph) % 1; d.visible = t > .8; d.position.set(tp.x + f * (7 - tp.x), tp.y + Math.sin(d.userData.a) * .4 * f + (4 - tp.y) * f, Math.cos(d.userData.a) * .4 * f); });
      },
    },
    {
      say: 'Call the elephant: yes, no, or only for floods? Comment below.',
      quiz: { q: 'Would you call the elephant plumber?', options: ['Yes', 'No', 'Only for floods'], answer: 'He is a made-up plumber. Bring a towel.' },
      show: ['ground', 'kitchen', 'cab', 'el'], sky: '#274B73', lightAt: [0, 5, 2], lightDist: 16,
      cam: { pos: [3, 2, 21], look: [.8, 9.6, 0], fov: 48, to: { pos: [-3, 2, 21], look: [.8, 9.6, 0] } },
      update: (w, p, t) => { w.doorL.rotation.y = 0; w.doorR.rotation.y = 0; w.doorL.position.x = -1.25; w.doorR.position.x = 1.25; w.el.position.set(0, 0, 0); w.el.rotation.set(0, -1.1, 0); curl(w.e, -.3 + .2 * Math.sin(t * 2)); w.e.wrench.visible = true; },
    },
  ],
};
