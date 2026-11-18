// Narrative 7: "Animals at Work". A made-up comedy sketch: octopuses do not work in offices.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the octopus at a desk with a computer.

function octopus(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const skin = mat('#C8508A', { rough: .5 });
  const o = { root: group([0, 0, 0], parent) };
  o.head = group([0, 3.2, 0], o.root);
  const h = ball(1.3, skin, [0, .4, 0], o.head); h.scale.set(1, 1.25, 1);
  for (const x of [-.45, .45]) { ball(.3, mat('#FFFFFF'), [x, 0, 1.05], o.head); ball(.15, mat('#111111'), [x, 0, 1.3], o.head); }
  box(.4, .06, .05, mat('#5A1E3A'), [0, -.45, 1.2], o.head);
  o.tie = box(.25, .9, .05, mat('#2F6FD6'), [0, -1.1, 1.05], o.head);
  o.arms = [];
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2, arm = group([Math.cos(a) * .8, 2.4, Math.sin(a) * .8], o.root);
    arm.rotation.y = -a; const segs = []; let prev = arm;
    for (let j = 0; j < 4; j++) { const sg = group(j ? [.55, 0, 0] : [0, 0, 0], prev); cyl(.22 - j * .04, .2 - j * .04, .6, skin, [.28, 0, 0], sg, 8).rotation.z = Math.PI / 2; segs.push(sg); prev = sg; }
    o.arms.push({ arm, segs, a });
  }
  return o;
}
function wiggle(o, t, amp = .25, sp = 3) { o.arms.forEach((A, i) => A.segs.forEach((s, j) => { s.rotation.z = -.35 + amp * Math.sin(t * sp + i + j * .8); })); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B8BFC9', 0);
  w.office = group();
  box(60, 30, .5, mat('#DCE3EA'), [0, 15, -8], w.office);
  for (let i = 0; i < 4; i++) box(5, 6, .1, mat('#BFE3F5', { glow: .2 }), [-12 + i * 8, 10, -7.7], w.office).castShadow = false;
  const plant = group([-8, 0, -5], w.office); cyl(.8, .6, 1.6, mat('#E8E8E8'), [0, .8, 0], plant, 12); ball(1.4, mat('#2E8B4A'), [0, 2.6, 0], plant);
  w.desk = group([0, 0, 2]);
  box(9, .4, 4, mat('#C9A27A'), [0, 3.4, 0], w.desk);
  for (const x of [-4, 4]) for (const z of [-1.6, 1.6]) box(.3, 3.4, .3, mat('#8B6B4A'), [x, 1.7, z], w.desk);
  w.screen = box(3.4, 2.2, .2, mat('#1E2430'), [-3.4, 5, -.4], w.desk); w.screen.rotation.y = .7;
  w.glow = box(3.1, 1.9, .05, mat('#5BC0EB', { glow: .8 }), [-3.32, 5, -.31], w.desk); w.glow.rotation.y = .7; w.glow.castShadow = false;
  cyl(.15, .15, .7, mat('#555555'), [-3.4, 3.9, -.4], w.desk, 8);
  w.keys = [];
  for (let i = 0; i < 4; i++) { const kb = box(1.6, .12, .6, mat('#2A2A2A'), [-3 + i * 2, 3.66, .9 + (i % 2) * .3], w.desk); w.keys.push(kb); }
  w.phones = [];
  for (let i = 0; i < 4; i++) { const ph = group([-3.6 + i * 2.4, 3.6, -.4], w.desk); box(1, .3, .7, mat('#E8E8E8'), [0, .15, 0], ph); const hs = box(1.1, .2, .3, mat('#E2453C'), [0, .4, 0], ph); hs.userData.home = [0, .4, 0]; w.phones.push({ g: ph, hs }); }
  w.o = octopus(k, k.scene); w.oct = w.o.root;
  w.printer = group([0, 0, 40]);
  box(4, 2.4, 3, mat('#E8E8E8'), [0, 4.6, 0], w.printer); box(4.4, .4, 3.4, mat('#C9A27A'), [0, 3.2, 0], w.printer);
  for (const x of [-1.8, 1.8]) box(.3, 3, .3, mat('#8B6B4A'), [x, 1.5, 0], w.printer);
  w.paper = box(2.4, .05, 2, mat('#FFFFFF'), [0, 5.9, 1.2], w.printer); w.paper.rotation.x = -.6;
  w.ink = group([0, 0, 40]);
  for (let i = 0; i < 12; i++) { const b = ball(.8 + (i % 3) * .3, mat('#1A0E2A', { opacity: .9 }), [0, 0, 0], w.ink); b.userData = { a: i * .52, ph: (i * .11) % 1 }; b.castShadow = false; }
  w.ring = group();
  for (let i = 0; i < 4; i++) { const r = k.torus(.5, .05, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], w.ring); r.userData.i = i; r.castShadow = false; }
  return w;
}

export default {
  id: '109',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE OCTOPUS OFFICE WORKER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS OCTOPUS', 'GOT AN OFFICE JOB.'],
  title: 'This octopus got an office job',
  description: 'Four keyboards. Four phones. One printer that should never have jammed. (A made-up octopus and a made-up office.)',
  tags: ['animalsatwork', 'funny', 'octopus', 'office', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the octopus office worker and his printer are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This octopus got an office job.',
      show: ['ground', 'office', 'desk', 'oct'], sky: '#DCE3EA', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [2.5, 5, 15], look: [0, 7.4, 0], fov: 48, to: { pos: [2.3, 5, 14], look: [0, 7.3, 0], fov: 46 } },
      update: (w, p, t) => { w.oct.position.set(.6, 1.2, -.6); w.oct.rotation.y = 0; wiggle(w.o, t, .15, 2); w.phones.forEach(P => P.hs.position.set(...P.hs.userData.home)); },
    },
    {
      say: 'He types on four keyboards at once.',
      show: ['ground', 'office', 'desk', 'oct'], sky: '#DCE3EA', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [1.5, 8.5, 11], look: [.3, 4.6, 1.5], fov: 50, to: { pos: [1.4, 8.3, 10.2], look: [.3, 4.6, 1.5], fov: 48 } },
      update: (w, p, t) => { w.oct.position.set(.6, 1.2, -.6); w.oct.rotation.y = 0; wiggle(w.o, t, .5, 18); w.keys.forEach((kb, i) => { kb.position.y = 3.66 - .05 * Math.max(0, Math.sin(t * 18 + i)); }); w.glow.material.emissiveIntensity = .8 + .4 * Math.sin(t * 9); },
    },
    {
      say: 'He answers every phone. Same time.',
      show: ['ground', 'office', 'desk', 'oct', 'ring'], sky: '#DCE3EA', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [3, 6.5, 14], look: [0, 5.8, 1], fov: 52, to: { pos: [2.8, 6.4, 13], look: [0, 5.8, 1], fov: 50 } },
      update: (w, p, t) => {
        w.oct.position.set(.6, 1.2, -.6); w.oct.rotation.y = 0; wiggle(w.o, t, .3, 6);
        w.phones.forEach((P, i) => { const up = Math.min(1, Math.max(0, (t - .3 - i * .2) * 3)); P.hs.position.set(0, .4 + up * 2.6, up * 2.5); P.hs.rotation.x = up * .8; });
        w.ring.children.forEach(r => { const f = (t * 1.5 + r.userData.i / 4) % 1; r.position.set(-3.6 + r.userData.i * 2.4, 4.6 + f, 1.6); r.scale.setScalar(.5 + f); r.visible = t < .9; });
      },
    },
    {
      say: 'Then the printer jams. So he inks it.',
      show: ['ground', 'office', 'printer', 'oct', 'ink'], sky: '#DCE3EA', lightAt: [0, 5, 42], lightDist: 16,
      cam: { pos: [-1, 6, 55], look: [-1.5, 5.4, 41], fov: 50, to: { pos: [-1, 6, 53.5], look: [-1.5, 5.4, 41], fov: 48 } },
      shake: (t) => t > 1.1 && t < 1.5 ? .1 : 0,
      update: (w, p, t) => {
        w.oct.position.set(-4, 1.2, 41); w.oct.rotation.y = Math.PI / 2; wiggle(w.o, t, t > 1.1 ? .6 : .2, t > 1.1 ? 10 : 3); w.o.head.scale.setScalar(t > .8 && t < 1.1 ? 1.15 : 1);
        w.ink.children.forEach(b => { const u = b.userData, f = Math.max(0, t - 1.1); b.visible = f > 0; b.position.set(-2.5 + f * 3 + Math.cos(u.a) * f * 2 * (1 + u.ph), 4.8 + Math.sin(u.a) * f * 2, 1.2 + f * 1.5); b.scale.setScalar(Math.min(1.5, .3 + f * 2)); });
      },
    },
    {
      say: 'Octopus coworker: yes, no, or only on Mondays? Comment below.',
      quiz: { q: 'Would you want an octopus coworker?', options: ['Yes', 'No', 'Only on Mondays'], answer: 'He is a made-up coworker. Keep him away from the printer.' },
      show: ['ground', 'office', 'desk', 'oct'], sky: '#274B73', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [3, 3, 15], look: [0, 9.4, 0], fov: 48, to: { pos: [-3, 3, 15], look: [0, 9.4, 0] } },
      update: (w, p, t) => { w.o.head.scale.setScalar(1); w.oct.position.set(.6, 1.2, -.6); w.oct.rotation.y = 0; wiggle(w.o, t, .15, 2); w.phones.forEach(P => { P.hs.position.set(...P.hs.userData.home); P.hs.rotation.x = 0; }); },
    },
  ],
};
