// Narrative 7: "Animals at Work". A made-up comedy sketch: owls are not teachers.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the owl in glasses at a blackboard.

function owl(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#8B6B4A', { rough: .8 }), light = mat('#E8D2B0', { rough: .8 });
  const o = { root: group([0, 0, 0], parent) };
  o.body = group([0, 0, 0], o.root);
  const b = ball(1.2, fur, [0, 1.6, 0], o.body); b.scale.set(1, 1.3, .9);
  ball(.85, light, [0, 1.4, .45], o.body).scale.set(1, 1.3, .6);
  o.head = group([0, 3.3, 0], o.body);
  ball(1, fur, [0, 0, 0], o.head).scale.set(1.1, .9, 1);
  for (const x of [-.4, .4]) {
    ball(.42, light, [x, .05, .72], o.head).scale.set(1, 1, .4);
    ball(.28, mat('#FF9A1F'), [x, .05, .85], o.head).scale.set(1, 1, .3);
    ball(.15, mat('#111111'), [x, .05, .92], o.head);
    const g = k.torus(.36, .04, mat('#2A2A2A'), [x, .05, .98], o.head); g.rotation.x = 0;
    const tuft = cone(.18, .6, fur, [x * 1.3, .85, 0], o.head, 5); tuft.rotation.z = -x * .8;
  }
  box(.25, .04, .04, mat('#2A2A2A'), [0, .1, .98], o.head);
  cone(.13, .35, mat('#E8B03A'), [0, -.3, .95], o.head, 6).rotation.x = Math.PI / 2 + .4;
  o.wings = [-1, 1].map(s => { const g = group([s * 1.05, 2.1, 0], o.body); const w = ball(.55, fur, [0, -.5, 0], g); w.scale.set(.35, 1.2, .8); return g; });
  for (const x of [-.4, .4]) cone(.15, .3, mat('#E8B03A'), [x, .1, .4], o.root, 6);
  o.chalk = box(.1, .4, .1, mat('#FFFFFF'), [.3, -1.1, .1], o.wings[1]);
  return o;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9A27A', 0);
  w.room = group();
  box(50, 26, .5, mat('#E8E2C8'), [0, 13, -8], w.room);
  w.board = box(14, 6, .2, mat('#2E4A3A'), [0, 6.5, -7.7], w.room);
  box(14.6, .4, .5, mat('#8B5A2B'), [0, 3.3, -7.5], w.room);
  w.writing = group([0, 0, -7.55], w.room);
  for (let i = 0; i < 4; i++) box(3 + (i % 2) * 2, .12, .02, mat('#F4F4F0'), [-3 + (i % 2), 8.3 - i * 1, 0], w.writing);
  const clock = cyl(.9, .9, .2, mat('#FFFFFF'), [9, 10, -7.6], w.room, 24); clock.rotation.x = Math.PI / 2;
  w.desks = group([0, 0, 0]);
  w.kids = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) {
    const d = group([-4.5 + c * 4.5, 0, 4 + r * 4], w.desks); box(2.6, .2, 1.8, mat('#C08A48'), [0, 2.4, 0], d); for (const x of [-1.1, 1.1]) box(.15, 2.4, .15, mat('#8B5A2B'), [x, 1.2, 0], d);
    const kid = group([0, 0, 1.4], d); cyl(.6, .7, 2, mat(['#2F6FD6', '#E2453C', '#22C55E', '#FFD21F', '#8B5CF6', '#FF8A1F'][r * 3 + c]), [0, 1.8, 0], kid, 12); ball(.6, mat('#F2C9A0'), [0, 3.3, 0], kid);
    kid.userData.eyes = [-.2, .2].map(x => ball(.09, mat('#111111'), [x, 3.4, -.55], kid)); w.kids.push(kid);
  }
  w.o = owl(k, k.scene); w.ow = w.o.root;
  w.hoots = group();
  for (let i = 0; i < 2; i++) { const h = group([0, 0, 0], w.hoots); const q = k.mesh(new k.THREE.TorusGeometry(.35, .1, 8, 20, Math.PI * 1.4), mat('#FFD21F', { glow: 1 }), [0, .4, 0], h); q.rotation.z = -Math.PI * .45; cyl(.1, .1, .3, mat('#FFD21F', { glow: 1 }), [0, -.05, 0], h, 8); ball(.12, mat('#FFD21F', { glow: 1 }), [0, -.45, 0], h); h.userData.i = i; }
  w.moon = ball(1.2, mat('#FFF6C2', { glow: 2 }), [-9, 11, -7.4], k.scene); w.moon.castShadow = false;
  w.zs = group();
  for (let i = 0; i < 6; i++) { const z = group([0, 0, 0], w.zs); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, .2, 0], z); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, -.2, 0], z); const d = box(.55, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  return w;
}

export default {
  id: '118',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE OWL TEACHER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS OWL', 'BECAME A TEACHER.'],
  title: 'This owl became a teacher',
  description: 'He sees the whole class without turning round. Every question is "who?". Class starts at midnight. (A made-up owl.)',
  tags: ['animalsatwork', 'funny', 'owl', 'teacher', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the owl teacher and his class are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This owl became a teacher.',
      show: ['ground', 'room', 'ow'], sky: '#E8E2C8', lightAt: [0, 5, 0], lightDist: 14,
      cam: { pos: [2.5, 2.8, 12], look: [.3, 6.7, -3], fov: 48, to: { pos: [2.3, 2.8, 11], look: [.3, 6.6, -3], fov: 46 } },
      update: (w, p, t) => { w.ow.position.set(1, 0, -4); w.ow.rotation.y = -.2; w.o.head.rotation.y = .2 * Math.sin(t * 2); w.o.wings[1].rotation.z = -.4; },
    },
    {
      say: 'He writes on the board, and still watches the whole class.',
      show: ['ground', 'room', 'ow', 'desks'], sky: '#E8E2C8', lightAt: [0, 5, 2], lightDist: 20,
      cam: { pos: [2.2, 10, 17], look: [0, 3.6, -4], fov: 50, to: { pos: [2.2, 10, 16], look: [0, 3.6, -4], fov: 48 } },
      update: (w, p, t) => {
        w.ow.position.set(0, 0, -6.2); w.ow.rotation.y = Math.PI; const turn = Math.min(1, Math.max(0, (t - .8) * 2)); w.o.head.rotation.y = Math.PI * turn;
        w.o.wings[1].rotation.z = -1.2 - .3 * Math.sin(t * 8); w.kids.forEach(kd => kd.userData.eyes.forEach(e => e.scale.setScalar(turn > .9 ? 1.6 : 1)));
      },
    },
    {
      say: 'Every question he asks: who? Who?',
      show: ['ground', 'room', 'ow', 'hoots'], sky: '#E8E2C8', lightAt: [0, 5, 0], lightDist: 12,
      cam: { pos: [1.8, 4.6, 6], look: [.2, 4.4, -4], fov: 44, to: { pos: [1.6, 4.6, 5.2], look: [.2, 4.4, -4], fov: 42 } },
      update: (w, p, t) => {
        w.ow.position.set(0, 0, -4); w.ow.rotation.y = 0; w.o.head.rotation.set(.15 * Math.sin(t * 6), 0, .12 * Math.sin(t * 3)); w.o.wings[1].rotation.z = -.2;
        w.hoots.children.forEach(h => { const f = (t * .7 + h.userData.i * .5) % 1; h.position.set(-1.4 + h.userData.i * 2.8, 5.4 + f * 1.2, -3.4); h.scale.setScalar(.6 + f * .5); });
      },
    },
    {
      say: 'And class starts at midnight.',
      show: ['ground', 'room', 'ow', 'desks', 'moon', 'zs'], sky: '#1E2440', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [6, 7, 18], look: [0, 4.2, 1], fov: 52, to: { pos: [5.6, 7, 17], look: [0, 4.2, 1], fov: 50 } },
      update: (w, p, t) => {
        w.ow.position.set(0, 0, -5); w.ow.rotation.y = 0; w.o.head.rotation.set(0, .3 * Math.sin(t * 2), 0); w.o.wings[1].rotation.z = -.9 - .3 * Math.sin(t * 5);
        w.kids.forEach(kd => { kd.rotation.x = -.35; kd.userData.eyes.forEach(e => e.scale.set(1, .2, 1)); });
        w.zs.children.forEach((z, i) => { const f = (t * .5 + i / 6) % 1, kd = w.kids[i]; const p0 = new kd.position.constructor(); kd.getWorldPosition(p0); z.position.set(p0.x + .6 + f * .8, 4.2 + f * 1.6, p0.z); z.scale.setScalar(.5 + f * .5); });
      },
    },
    {
      say: 'Owl teacher: yes, no, or only for night school? Comment below.',
      quiz: { q: 'Would you want the owl as your teacher?', options: ['Yes', 'No', 'Only for night school'], answer: 'He is a made-up teacher. Bring a pillow.' },
      show: ['ground', 'room', 'ow'], sky: '#274B73', lightAt: [0, 5, 0], lightDist: 14,
      cam: { pos: [2.5, 1.5, 12], look: [.3, 7.4, -3], fov: 48, to: { pos: [-2.5, 1.5, 12], look: [.3, 7.4, -3] } },
      update: (w, p, t) => { w.kids.forEach(kd => { kd.rotation.x = 0; kd.userData.eyes.forEach(e => e.scale.setScalar(1)); }); w.ow.position.set(1, 0, -4); w.ow.rotation.y = -.2; w.o.head.rotation.set(0, .2 * Math.sin(t * 2), 0); w.o.wings[1].rotation.z = -.4; },
    },
  ],
};
