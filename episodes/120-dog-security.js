// Narrative 7: "Animals at Work". A made-up comedy sketch: dogs are not security guards (well, not like this). The "burglar" is just a visitor; nobody is harmed.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the dog in a guard cap outside a bank.

function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#D9A35E', { rough: .8 }), light = mat('#F4E3C8', { rough: .8 });
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(1.1, fur, [0, 2, 0], d.body); b.scale.set(1.5, .9, .9);
  d.legs = [];
  for (const x of [-1, 1]) for (const z of [-.5, .5]) { const l = group([x, 1.5, z], d.body); cyl(.18, .16, 1.5, fur, [0, -.75, 0], l, 8); ball(.2, light, [.05, -1.5, 0], l); d.legs.push(l); }
  d.head = group([1.6, 2.9, 0], d.body);
  ball(.7, fur, [0, 0, 0], d.head);
  ball(.38, light, [.55, -.15, 0], d.head).scale.set(1.3, .8, .9);
  ball(.13, mat('#111111'), [.98, -.05, 0], d.head);
  for (const z of [-.28, .28]) { ball(.1, mat('#111111'), [.45, .2, z], d.head); const e = ball(.3, mat('#8B5A2B'), [-.15, -.05, z * 2.6], d.head); e.scale.set(.5, 1.3, .3); }
  d.tongue = box(.2, .05, .25, mat('#FF6B8B'), [.85, -.4, 0], d.head); d.tongue.visible = false;
  d.cap = group([0, .55, 0], d.head);
  cyl(.6, .62, .35, mat('#1E2A4A'), [0, 0, 0], d.cap, 16); box(.6, .06, .9, mat('#111111'), [.45, -.15, 0], d.cap); ball(.12, mat('#FFD21F', { glow: .5 }), [.55, .05, 0], d.cap);
  d.tail = group([-1.6, 2.3, 0], d.body); cyl(.1, .06, 1.1, fur, [-.2, .45, 0], d.tail, 6).rotation.z = .5;
  return d;
}
function wag(d, t, sp = 16) { d.tail.rotation.x = .6 * Math.sin(t * sp); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9AA3AE', 0);
  w.bank = group();
  box(24, 14, 6, mat('#E8E2D6'), [0, 7, -9], w.bank);
  for (let i = 0; i < 5; i++) cyl(.5, .5, 9, mat('#F4F1E8'), [-8 + i * 4, 4.5, -5.6], w.bank, 14);
  box(24, 2, 1.5, mat('#F4F1E8'), [0, 10, -5.6], w.bank);
  box(6, 1.2, .2, mat('#1E3A8A'), [0, 12.2, -5.9], w.bank);
  w.door = box(3, 5, .2, mat('#5A3A1E'), [0, 2.5, -5.9], w.bank);
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.post = group([0, 0, 0]);
  cyl(1.6, 1.6, .3, mat('#5A3A1E'), [0, 2, 0], w.post, 14);
  box(1.2, 1.4, .1, mat('#FFFFFF'), [0, 0, 0], w.post);
  w.mail = group([0, 0, 0]);
  cyl(.8, .9, 3, mat('#2F6FD6'), [0, 1.5, 0], w.mail, 14); ball(.85, mat('#F2C9A0'), [0, 3.7, 0], w.mail);
  cyl(.9, .9, .3, mat('#2F6FD6'), [0, 4.5, 0], w.mail, 14); box(1.2, 1, .5, mat('#8B5A2B'), [1, 1.8, .4], w.mail);
  w.meyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 3.85, .78], w.mail));
  w.bark = group();
  for (let i = 0; i < 3; i++) { const r = k.torus(.4, .06, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], w.bark); r.rotation.y = Math.PI / 2; r.userData.i = i; r.castShadow = false; }
  w.visitor = group([0, 0, 0]);
  cyl(.8, .9, 3, mat('#2A2A2A'), [0, 1.5, 0], w.visitor, 14); ball(.85, mat('#F2C9A0'), [0, 3.7, 0], w.visitor);
  box(1.8, .3, .1, mat('#111111'), [0, 3.85, .8], w.visitor);
  w.vbag = box(1, 1.2, .6, mat('#4A4A4A'), [1.1, 1.5, 0], w.visitor);
  w.hand = group([0, 0, 0], w.visitor); cyl(.18, .18, 1.6, mat('#2A2A2A'), [0, -.8, 0], w.hand, 8); w.hand.position.set(.9, 2.8, .3);
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.2, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

export default {
  id: '120',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DOG SECURITY GUARD',
  year: 'ANIMALS AT WORK',
  hook: ['THIS DOG', 'GUARDS A BANK.'],
  title: 'This dog guards a bank',
  description: 'Barks at the mail carrier. Barks at a leaf. Lets the suspicious visitor in for one belly rub. (A made-up dog and a made-up bank.)',
  tags: ['animalsatwork', 'funny', 'dog', 'security', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the dog security guard and his bank are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This dog guards a bank.',
      show: ['ground', 'bank', 'dg'], sky: '#9ED2F3', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [3, 2.6, 14], look: [.5, 6.3, 0], fov: 48, to: { pos: [2.8, 2.6, 13], look: [.5, 6.2, 0], fov: 46 } },
      update: (w, p, t) => { w.dg.position.set(-.6, 0, 0); w.dg.rotation.set(0, -.6, 0); w.d.body.rotation.set(0, 0, 0); w.d.tongue.visible = false; wag(w.d, t, 4); w.d.head.rotation.set(0, .2 * Math.sin(t * 1.5), 0); },
    },
    {
      say: 'He barks at the mail carrier. Every single day.',
      show: ['ground', 'bank', 'dg', 'mail', 'bark'], sky: '#9ED2F3', lightAt: [1, 4, 2], lightDist: 16,
      cam: { pos: [2, 4.5, 15], look: [1.2, 3.4, 0], fov: 50, to: { pos: [1.8, 4.5, 14], look: [1.2, 3.4, 0], fov: 48 } },
      shake: () => .02,
      update: (w, p, t) => {
        w.dg.position.set(-1.6, 0, 0); w.dg.rotation.set(0, 0, 0); w.d.head.rotation.set(0, 0, .2 * Math.max(0, Math.sin(t * 12))); wag(w.d, t, 6);
        const run = Math.max(0, t - 1.2); w.mail.position.set(2.6 + run * 3, .2 * Math.abs(Math.sin(t * 12)) * (run > 0 ? 1 : 0), 0); w.mail.rotation.y = run > 0 ? Math.PI / 2 : -Math.PI / 2; w.meyes.forEach(e => e.scale.setScalar(1.6));
        w.bark.children.forEach(r => { const f = (t * 2 + r.userData.i / 3) % 1; r.position.set(.7 + f * 1.6, 2.8, 0); r.scale.setScalar(.5 + f); });
      },
    },
    {
      say: 'Then a suspicious visitor shows up.',
      show: ['ground', 'bank', 'dg', 'visitor'], sky: '#6E7F95', lightAt: [1, 4, 2], lightDist: 16,
      cam: { pos: [2.5, 4, 14], look: [1, 3.6, 0], fov: 50, to: { pos: [2.3, 4, 13], look: [1, 3.6, 0], fov: 48 } },
      update: (w, p, t) => {
        w.dg.position.set(-1.6, 0, 0); w.dg.rotation.set(0, 0, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0); w.d.legs.forEach(l => { l.rotation.z = 0; }); wag(w.d, 0);
        w.visitor.position.set(4.5 - Math.min(1.5, t * 1), 0, .2); w.visitor.rotation.y = -Math.PI / 2; w.hand.rotation.z = 0;
      },
    },
    {
      say: 'One belly rub later, he holds the door open.',
      show: ['ground', 'bank', 'dg', 'visitor', 'hearts'], sky: '#6E7F95', lightAt: [1, 4, 2], lightDist: 16,
      cam: { pos: [3, 4, 13], look: [1, 3, 0], fov: 50, to: { pos: [2.8, 4, 12], look: [1, 3, 0], fov: 48 } },
      update: (w, p, t) => {
        const rub = t < 1.4; w.dg.position.set(-.5, rub ? 2.3 : 0, 0); w.d.body.rotation.set(rub ? Math.PI : 0, 0, 0); w.d.tongue.visible = true; wag(w.d, t, 20);
        w.d.legs.forEach((l, i) => { l.rotation.z = rub ? .3 * Math.sin(t * 15 + i) : 0; });
        w.visitor.position.set(rub ? 2.2 : 2.2 - (t - 1.4) * 2, 0, rub ? .4 : -1.5); w.visitor.rotation.y = rub ? -Math.PI / 2 : Math.PI; w.hand.rotation.z = rub ? -.9 + .3 * Math.sin(t * 10) : 0;
        w.door.rotation.y = rub ? 0 : -1.2; w.door.position.x = rub ? 0 : -1.2;
        w.hearts.children.forEach(h => { const f = (t * .8 + h.userData.i / 4) % 1; h.position.set(.3 + (h.userData.i - 1.5) * .4, 3.6 + f * 1.8, .4); h.scale.setScalar(1 - f * .5); });
      },
    },
    {
      say: 'Hire this guard: yes, no, or only with treats? Comment below.',
      quiz: { q: 'Would you hire the dog as a security guard?', options: ['Yes', 'No', 'Only with treats'], answer: 'He is a made-up guard. Bring treats, not belly rubs.' },
      show: ['ground', 'bank', 'dg'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [3, 1.5, 13], look: [.5, 6.4, 0], fov: 48, to: { pos: [-2, 1.5, 13], look: [.5, 6.4, 0] } },
      update: (w, p, t) => { w.door.rotation.y = 0; w.door.position.x = 0; w.d.legs.forEach(l => { l.rotation.z = 0; }); w.dg.position.set(-.6, 0, 0); w.dg.rotation.set(0, -.6, 0); w.d.body.rotation.set(0, 0, 0); w.d.tongue.visible = true; wag(w.d, t, 8); },
    },
  ],
};
