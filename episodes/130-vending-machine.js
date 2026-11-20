// Narrative 8: "Objects With Opinions". A made-up comedy sketch: vending machines do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the vending machine with a face.

function vend(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const v = { root: group([0, 0, 0], parent) };
  v.body = group([0, 0, 0], v.root);
  box(4, 7, 3, mat('#E2453C', { rough: .4 }), [0, 3.5, 0], v.body);
  box(2.6, 5, .1, mat('#BFE6FF', { opacity: .3, rough: .05 }), [-.5, 4.2, 2.1], v.body);
  v.snacks = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) { const s = box(.6, .8, .3, mat(['#FFD21F', '#2F6FD6', '#22C55E', '#FF8A1F', '#8B5CF6'][(r * 3 + c) % 5]), [-1.3 + c * .8, 2.4 + r * 1.2, 1.7], v.body); v.snacks.push(s); }
  v.stuck = v.snacks[4];
  box(.8, 2, .12, mat('#2A2A2A'), [1.4, 4.4, 1.52], v.body);
  box(2.6, .6, .3, mat('#1A1A1A'), [-.5, 1.1, 1.45], v.body);
  v.eyes = [-.35, .35].map(x => { ball(.24, mat('#FFFFFF'), [-.5 + x * 1.6, 6.5, 1.55], v.body); return ball(.12, mat('#111111'), [-.5 + x * 1.6, 6.5, 1.75], v.body); });
  v.mouth = box(.9, .1, .06, mat('#5A1E1E'), [-.5, 6, 1.55], v.body);
  return v;
}
function talk(v, t, on = true) { v.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B8BFC9', 0);
  w.hall = group();
  box(40, 20, .5, mat('#DCE3EA'), [0, 10, -4], w.hall);
  w.v = vend(k, k.scene); w.vm = w.v.root;
  w.person = group([0, 0, 0]);
  w.pbody = group([0, 0, 0], w.person);
  cyl(.8, .9, 3.2, mat('#22C55E'), [0, 1.6, 0], w.pbody, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.pbody);
  w.peyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 4.05, .78], w.pbody));
  w.coins = group();
  for (let i = 0; i < 4; i++) { const c = cyl(.22, .22, .05, mat('#D4AF37', { metal: .9, rough: .2 }), [0, 0, 0], w.coins, 16); c.rotation.x = Math.PI / 2; c.userData.i = i; c.castShadow = false; }
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

export default {
  id: '130',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE VENDING MACHINE WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SNACK MACHINE', 'IS FED UP.'],
  title: 'This snack machine is fed up',
  description: 'People shake him. People kick him. The snack still gets stuck. Turns out he was saving it for himself. (A made-up talking vending machine.)',
  tags: ['objectswithopinions', 'funny', 'vendingmachine', 'snacks', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking vending machines are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This snack machine is fed up.',
      show: ['ground', 'hall', 'vm'], sky: '#DCE3EA', lightAt: [0, 5, 3], lightDist: 14,
      cam: { pos: [2, 3, 17], look: [0, 7.8, 0], fov: 46, to: { pos: [1.8, 3, 16], look: [0, 7.7, 0], fov: 44 } },
      update: (w, p, t) => { w.vm.position.set(0, 0, 0); w.vm.rotation.set(0, -.15, 0); w.v.body.rotation.z = 0; w.v.stuck.position.set(-.5, 3.6, 1.7); w.v.stuck.rotation.set(0, 0, 0); talk(w.v, t, t > .2); },
    },
    {
      say: 'Every snack gets stuck. So people shake him.',
      show: ['ground', 'hall', 'vm', 'person'], sky: '#DCE3EA', lightAt: [0, 5, 3], lightDist: 16,
      cam: { pos: [5, 5, 15], look: [.5, 4, 0], fov: 50, to: { pos: [4.6, 5, 14], look: [.5, 4, 0], fov: 48 } },
      shake: (t) => t > .9 ? .06 : 0,
      update: (w, p, t) => {
        w.vm.position.set(0, 0, 0); w.vm.rotation.set(0, -.15, 0); talk(w.v, t); w.v.stuck.position.set(-.5, 3.45, 1.8); w.v.stuck.rotation.set(.5, 0, 0);
        w.v.body.rotation.z = t > .9 ? .08 * Math.sin(t * 25) : 0; w.person.position.set(2.6, 0, 2.6); w.person.rotation.y = -2.2; w.pbody.rotation.z = t > .9 ? .1 * Math.sin(t * 25) : 0;
      },
    },
    {
      say: 'Then they kick him. Every Monday.',
      show: ['ground', 'hall', 'vm', 'person'], sky: '#DCE3EA', lightAt: [0, 5, 3], lightDist: 16,
      cam: { pos: [6, 4, 13], look: [.5, 3.6, 0], fov: 50, to: { pos: [5.6, 4, 12], look: [.5, 3.6, 0], fov: 48 } },
      shake: (t) => Math.sin(t * 6) > .9 ? .1 : 0,
      update: (w, p, t) => {
        w.v.body.rotation.z = 0; talk(w.v, t); const k2 = Math.max(0, Math.sin(t * 6)); w.person.position.set(2.2 + k2 * .3, 0, 2.6); w.person.rotation.y = -2.2; w.pbody.rotation.set(0, 0, -k2 * .4);
        w.v.eyes.forEach(e => e.scale.setScalar(1 + (k2 > .9 ? .6 : 0)));
      },
    },
    {
      say: 'Twist: he keeps the best snack for himself.',
      show: ['ground', 'hall', 'vm', 'hearts'], sky: '#FFE3C2', lightAt: [0, 5, 3], lightDist: 14,
      cam: { pos: [2, 5.5, 10], look: [-.4, 4.6, 0], fov: 44, to: { pos: [1.8, 5.5, 9.3], look: [-.4, 4.6, 0], fov: 42 } },
      update: (w, p, t) => {
        w.v.eyes.forEach(e => e.scale.setScalar(1)); w.vm.rotation.set(0, -.15, 0); talk(w.v, t, t < 1.6);
        const f = Math.min(1, t * .8); w.v.stuck.position.set(-.5 + f * .1, 3.45 + f * 2.2, 1.8); w.v.stuck.rotation.set(0, f * 6, 0);
        w.hearts.children.forEach(h => { const q = (t * .8 + h.userData.i / 4) % 1; h.position.set(-.5 + (h.userData.i - 1.5) * .4, 7 + q * 1.6, 1.6); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'Stuck snack: shake it, kick it, or accept it? Comment below.',
      quiz: { q: 'What do you do when your snack gets stuck?', options: ['Shake it', 'Kick it', 'Accept it'], answer: 'This machine is made up. He votes for accept it.' },
      show: ['ground', 'hall', 'vm'], sky: '#274B73', lightAt: [0, 5, 3], lightDist: 14,
      cam: { pos: [2, 2, 15], look: [0, 8.4, 0], fov: 46, to: { pos: [-2, 2, 15], look: [0, 8.4, 0] } },
      update: (w, p, t) => { w.vm.position.set(0, 0, 0); w.vm.rotation.set(0, -.15, 0); w.v.body.rotation.z = 0; w.v.stuck.position.set(-.5, 3.6, 1.7); w.v.stuck.rotation.set(0, 0, 0); talk(w.v, t, false); },
    },
  ],
};
