// Narrative 7: "Animals at Work". A made-up comedy sketch: hamsters are not personal trainers; the client tumbles gently onto a mat.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the hamster in a sweatband with a whistle in a gym.

function hamster(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#E8A85A', { rough: .8 }), light = mat('#FFF1DC', { rough: .8 });
  const h = { root: group([0, 0, 0], parent) };
  h.body = group([0, 0, 0], h.root);
  const b = ball(1.1, fur, [0, 1.1, 0], h.body); b.scale.set(1, 1, 1.1);
  ball(.75, light, [0, .95, .55], h.body).scale.set(1, 1, .6);
  h.head = group([0, 2.2, .3], h.body);
  ball(.75, fur, [0, 0, 0], h.head);
  h.cheeks = [-1, 1].map(s => { const c = ball(.32, light, [s * .62, -.28, .2], h.head); return c; });
  for (const x of [-.27, .27]) ball(.1, mat('#111111'), [x, .15, .68], h.head);
  ball(.07, mat('#FF9EC4'), [0, -.02, .75], h.head);
  for (const x of [-.5, .5]) { const e = ball(.22, mat('#E8A85A'), [x, .6, 0], h.head); e.scale.set(1, 1, .4); }
  cyl(.78, .78, .18, mat('#E2453C'), [0, .35, 0], h.head, 20);
  h.whistle = cyl(.08, .08, .25, mat('#FFD21F'), [0, 1.55, .9], h.body, 8); h.whistle.rotation.x = Math.PI / 2;
  h.feet = [];
  for (const x of [-.5, .5]) for (const z of [-.5, .5]) { const f = group([x, .25, z], h.root); ball(.2, mat('#FF9EC4'), [0, 0, 0], f); h.feet.push(f); }
  return h;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#3A3F4A', 0);
  w.gym = group();
  box(60, 30, .5, mat('#5A6070'), [0, 15, -10], w.gym);
  box(40, 3, .2, mat('#E2453C'), [0, 12, -9.7], w.gym);
  for (let i = 0; i < 4; i++) { const db = group([-12 + i * 3, .4, -7], w.gym); cyl(.15, .15, 2, mat('#9AA3AE', { metal: .7 }), [0, 0, 0], db, 8).rotation.z = Math.PI / 2; for (const x of [-.9, .9]) { const p = cyl(.45, .45, .3, mat('#1A1A1A'), [x, 0, 0], db, 16); p.rotation.z = Math.PI / 2; } }
  box(8, .3, 5, mat('#2F6FD6'), [6, .15, 2], w.gym).castShadow = false;
  w.h = hamster(k, k.scene); w.ham = w.h.root;
  // the wheel
  w.wheel = group([0, 0, 0]);
  w.rim = group([0, 3.2, 0], w.wheel);
  k.torus(3, .12, mat('#C0C0C8', { metal: .7 }), [0, 0, -1.2], w.rim).rotation.x = 0;
  k.torus(3, .12, mat('#C0C0C8', { metal: .7 }), [0, 0, 1.2], w.rim).rotation.x = 0;
  for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2; const r = cyl(.06, .06, 2.4, mat('#C0C0C8', { metal: .7 }), [Math.cos(a) * 3, Math.sin(a) * 3, 0], w.rim, 6); r.rotation.x = Math.PI / 2; }
  box(.3, 3.2, .3, mat('#9AA3AE'), [0, 1.6, -1.5], w.wheel);
  // the client
  w.client = group([0, 0, 0]);
  w.cbody = group([0, 0, 0], w.client);
  cyl(.8, .9, 3.2, mat('#22C55E'), [0, 1.6, 0], w.cbody, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.cbody);
  w.ceyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 4.05, .78], w.cbody));
  w.bars = group([0, 0, 0]);
  for (let i = 0; i < 5; i++) { const b = box(1.2, .25, .5, mat(['#8B5A2B', '#FFD21F'][i % 2]), [0, .13 + i * .26, 0], w.bars); b.rotation.y = i * .4; }
  return w;
}

export default {
  id: '112',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HAMSTER PERSONAL TRAINER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS HAMSTER', 'BECAME A PERSONAL TRAINER.'],
  title: 'This hamster became a personal trainer',
  description: 'One exercise: the wheel. Clients last about four seconds. Snacks go in the cheeks. (A made-up hamster and a made-up gym.)',
  tags: ['animalsatwork', 'funny', 'hamster', 'gym', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the hamster trainer and his gym are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This hamster became a personal trainer.',
      show: ['ground', 'gym', 'ham'], sky: '#5A6070', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [2, 1.8, 10], look: [0, 4.3, 0], fov: 46, to: { pos: [1.8, 1.8, 9.2], look: [0, 4.2, 0], fov: 44 } },
      update: (w, p, t) => { w.h.cheeks.forEach(c => c.scale.setScalar(1)); w.ham.position.set(0, 0, 0); w.ham.rotation.y = .2; w.h.body.position.y = .1 * Math.abs(Math.sin(t * 6)); w.h.head.rotation.z = .1 * Math.sin(t * 3); },
    },
    {
      say: 'His one exercise: the wheel. Forever.',
      show: ['ground', 'gym', 'ham', 'wheel'], sky: '#5A6070', lightAt: [0, 4, 3], lightDist: 14,
      cam: { pos: [3, 4, 13], look: [0, 3.4, 0], fov: 48, to: { pos: [2.7, 4, 12], look: [0, 3.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.rim.rotation.z = t * 6; w.ham.position.set(0, .36, 0); w.ham.rotation.y = Math.PI / 2; w.h.body.position.y = .1 * Math.abs(Math.sin(t * 20));
        w.h.feet.forEach((f, i) => { f.position.y = .25 + .2 * Math.max(0, Math.sin(t * 20 + i * 1.6)); });
      },
    },
    {
      say: 'His clients last about four seconds.',
      show: ['ground', 'gym', 'wheel', 'client'], sky: '#5A6070', lightAt: [0, 4, 3], lightDist: 16,
      cam: { pos: [5, 5, 15], look: [1.5, 3.4, 0], fov: 50, to: { pos: [4.6, 5, 14], look: [1.5, 3.4, 0], fov: 48 } },
      update: (w, p, t) => {
        w.rim.rotation.z = t * (3 + t * 4); w.wheel.scale.setScalar(1.5); w.wheel.position.set(0, 0, 0);
        const fly = Math.max(0, t - 1.3);
        if (!fly) { w.client.position.set(0, .3, 0); w.cbody.rotation.set(0, Math.PI / 2, .3 * Math.sin(t * 14)); }
        else { w.client.position.set(fly * 5, Math.max(.3, .3 + 4 * fly - 8 * fly * fly), 2); w.cbody.rotation.set(0, Math.PI / 2, -Math.min(1.5, fly * 4)); }
        w.ceyes.forEach(e => e.scale.setScalar(1.6));
      },
    },
    {
      say: 'Then he stuffs every protein bar into his cheeks.',
      show: ['ground', 'gym', 'ham', 'bars'], sky: '#5A6070', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [2, 1.8, 10], look: [.3, 4.1, 0], fov: 46, to: { pos: [1.8, 1.8, 9.2], look: [.3, 4, 0], fov: 44 } },
      update: (w, p, t) => {
        w.wheel.scale.setScalar(1); w.ham.position.set(-.3, 0, 0); w.ham.rotation.y = .3; w.h.body.position.y = 0;
        const eat = Math.min(1, t / 2); w.h.cheeks.forEach(c => c.scale.setScalar(1 + eat * .9)); w.bars.position.set(1.8, 0, .4); w.bars.children.forEach((b, i) => { b.visible = i < 5 - Math.floor(eat * 5); });
      },
    },
    {
      say: 'Train with him: yes, no, or only for snacks? Comment below.',
      quiz: { q: 'Would you train with the hamster?', options: ['Yes', 'No', 'Only for snacks'], answer: 'He is a made-up trainer. Bring your own protein bars.' },
      show: ['ground', 'gym', 'ham'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [2, 1.2, 9], look: [0, 4.4, 0], fov: 46, to: { pos: [-2, 1.2, 9], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.h.cheeks.forEach(c => c.scale.setScalar(1.9)); w.ham.position.set(0, 0, 0); w.ham.rotation.y = .2; w.h.body.position.y = .1 * Math.abs(Math.sin(t * 6)); },
    },
  ],
};
