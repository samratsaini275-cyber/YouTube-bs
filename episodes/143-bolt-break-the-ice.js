// Narrative 9: "Bolt Takes It Literally". Angle B (recurring character). A made-up comedy sketch: Bolt the robot is not real;
// nobody is hurt. Hook rule: the first line is the instruction, done within 2.0 s; Bolt and the ice are in the first frame.

function bolt(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  const metal = mat('#8FA6BF', { rough: .35 }), dark = mat('#3A4250');
  for (const x of [-.35, .35]) box(.35, .8, .4, dark, [x, .4, 0], b.root);
  box(1.5, 1.4, 1, metal, [0, 1.5, 0], b.root);
  box(.6, .3, .05, mat('#FFD21F', { glow: 1 }), [0, 1.6, .52], b.root);
  b.head = group([0, 2.2, 0], b.root);
  box(1.2, .9, .9, metal, [0, .45, 0], b.head);
  for (const x of [-.28, .28]) { cyl(.2, .2, .08, mat('#5CF2FF', { glow: 2 }), [x, .5, .46], b.head, 16).rotation.x = Math.PI / 2; }
  b.mouth = box(.4, .06, .05, dark, [0, .2, .46], b.head);
  cyl(.04, .04, .4, dark, [0, 1.1, 0], b.head, 6); b.tip = ball(.1, mat('#E2453C', { glow: 1.5 }), [0, 1.35, 0], b.head);
  b.armL = group([-.85, 2.0, 0], b.root); box(.25, .9, .25, metal, [0, -.45, 0], b.armL);
  b.armR = group([.85, 2.0, 0], b.root); box(.25, .9, .25, metal, [0, -.45, 0], b.armR);
  return b;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#B79CD6', 0);
  w.room = group();
  box(40, 20, .5, mat('#2E2A4A'), [0, 10, -5], w.room);
  for (let i = 0; i < 7; i++) ball(.18, mat(['#FF4D6D', '#FFD21F', '#5CF2FF'][i % 3], { glow: 2 }), [-6 + i * 2, 6.5 + (i % 2) * .4, -4.6], w.room);
  w.table = group([1.6, 0, 0]);
  box(3, .2, 2, mat('#E8E2D6'), [0, 1.8, 0], w.table); for (const x of [-1.3, 1.3]) box(.15, 1.8, .15, mat('#8B5A2B'), [x, .9, 0], w.table);
  w.snacks = group([0, 0, 0], w.table);
  for (let i = 0; i < 6; i++) { const s = ball(.16, mat(['#F97316', '#FFD21F', '#E2453C'][i % 3]), [-1.1 + i * .44, 2.0, .7], w.snacks); s.userData.i = i; }
  w.ice = group([1.6, 1.9, 0]);
  w.iceA = box(1.1, 2.2, 1.6, mat('#BFEFFF', { rough: .05, glow: .35 }), [-.56, 1.1, 0], w.ice);
  w.iceB = box(1.1, 2.2, 1.6, mat('#BFEFFF', { rough: .05, glow: .35 }), [.56, 1.1, 0], w.ice);
  w.b = bolt(k, k.scene); w.bo = w.b.root;
  w.guests = group();
  [['#2F6FD6', -3.4, -3.4], ['#D6452F', 0, -4], ['#22A06B', 3.8, -3.4]].forEach(([c, x, z]) => { const g = group([x, 0, z], w.guests); cyl(.75, .8, 2.4, mat(c), [0, 1.2, 0], g, 14); ball(.75, mat('#F2C9A0'), [0, 3.1, 0], g); });
  w.bubbles = group();
  for (let i = 0; i < 3; i++) { const bb = group([0, 0, 0], w.bubbles); const s = ball(.45, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], bb); s.scale.set(1.4, 1, .3); bb.userData.i = i; }
  return w;
}

const reset = (w) => {
  w.bo.position.set(-1.6, 0, .4); w.bo.rotation.set(0, .5, 0); w.b.armR.rotation.set(0, 0, 0); w.b.armL.rotation.set(0, 0, 0); w.b.head.rotation.set(0, 0, 0);
  w.ice.position.set(1.6, 1.9, 0); w.ice.rotation.set(0, 0, 0); w.iceA.position.x = -.56; w.iceB.position.x = .56; w.iceA.rotation.z = 0; w.iceB.rotation.z = 0;
  w.snacks.children.forEach(s => s.position.y = 2.0); w.guests.children.forEach(g => g.rotation.y = 0);
};

export default {
  id: '143',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BOLT TAKES IT LITERALLY',
  year: 'BREAK THE ICE',
  hook: ['BOLT,', 'BREAK THE ICE.'],
  title: 'Bolt, break the ice',
  description: 'A quiet party. One instruction. Bolt the robot takes it word for word. (A made-up robot comedy sketch.)',
  tags: ['bolttakesitliterally', 'funny', 'robot', 'idioms', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Bolt the robot is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Bolt, break the ice.',
      show: ['ground', 'room', 'table', 'ice', 'bo', 'guests'], sky: '#2E2A4A', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [0, 2.8, 12.5], look: [0, 3.7, 0], fov: 48, to: { pos: [0, 2.8, 11.7], look: [0, 3.6, 0], fov: 46 } },
      update: (w, p, t) => { reset(w); w.b.head.rotation.y = .3 * Math.sin(t * 3); w.b.tip.scale.setScalar(1 + .3 * Math.sin(t * 10)); },
    },
    {
      say: 'The party was silent. So Bolt found the biggest ice cube in town.',
      show: ['ground', 'room', 'table', 'ice', 'bo', 'guests'], sky: '#2E2A4A', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [3, 4.5, 11], look: [.4, 2.6, 0], fov: 50, to: { pos: [2.6, 4.4, 10], look: [.4, 2.6, 0], fov: 48 } },
      update: (w, p, t) => {
        reset(w); const q = Math.min(1, t / 2); w.ice.position.set(1.6 + (1 - q) * 6, 1.9 + Math.abs(Math.sin(q * 9)) * .2 * (1 - q), 0); w.ice.rotation.z = (1 - q) * 1.2;
        w.b.armL.rotation.z = -1.2 * Math.min(1, t); w.guests.children.forEach(g => g.rotation.y = Math.sin(t * 2) * .2);
      },
    },
    {
      say: 'Then he karate chopped it. Right on the snack table.',
      show: ['ground', 'room', 'table', 'ice', 'bo', 'guests'], sky: '#2E2A4A', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [2.4, 3.8, 12.5], look: [2.2, 3.0, 0], fov: 48, to: { pos: [2.3, 3.7, 11.8], look: [2.2, 2.9, 0], fov: 46 } },
      shake: (t) => t > 1.1 && t < 1.6 ? .1 : 0,
      update: (w, p, t) => {
        reset(w); w.bo.position.set(3.6, 0, .8); w.bo.rotation.y = -Math.PI / 2 + .45;
        const up = Math.min(1, t / .9); const down = t > .9 ? Math.min(1, (t - .9) / .2) : 0; w.b.armR.rotation.x = -2.6 * up + 2.6 * down;
        const s = t > 1.1 ? Math.min(1, (t - 1.1) * 2) : 0; w.iceA.position.x = -.56 - s * .6; w.iceB.position.x = .56 + s * .3; w.iceA.rotation.z = s * .35; w.iceB.rotation.z = -s * .2;
        w.snacks.children.forEach(sn => { const i = sn.userData.i; sn.position.y = 2.0 + (s > 0 ? Math.max(0, Math.sin(Math.min(Math.PI, s * Math.PI * 1.2 + i * .2))) * (1.4 + (i % 3) * .5) : 0); });
      },
    },
    {
      say: 'And it worked. Everyone is talking now. About Bolt.',
      show: ['ground', 'room', 'table', 'ice', 'bo', 'guests', 'bubbles'], sky: '#3A2E5A', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [0, 4.6, 11], look: [0, 3.2, -1], fov: 50, to: { pos: [0, 4.4, 10], look: [0, 3.2, -1], fov: 48 } },
      update: (w, p, t) => {
        reset(w); w.iceA.position.x = -1.76; w.iceB.position.x = 1.76; w.iceA.rotation.z = .5; w.iceB.rotation.z = -.5;
        w.bo.position.set(-.4, 0, .9); w.bo.rotation.y = 0; w.b.head.rotation.z = .1 * Math.sin(t * 4);
        w.guests.children.forEach((g, i) => { g.rotation.y = Math.atan2(-.4 - g.position.x, .9 - g.position.z); });
        w.bubbles.visible = t > .9; w.bubbles.children.forEach((bb, i) => { const g = w.guests.children[i]; bb.position.set(g.position.x, 4.5 + .15 * Math.sin(t * 5 + i), g.position.z); bb.scale.setScalar(Math.min(1, (t - .9 - i * .2) * 3)); });
      },
    },
    {
      say: 'Break the ice: tell a joke, say hi, or a karate chop? Comment below.',
      quiz: { q: 'How do you break the ice?', options: ['Tell a joke', 'Say hi', 'Karate chop'], answer: 'Bolt is made up. Please do not chop the snacks.' },
      show: ['ground', 'room', 'bo'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 1.2, 7], look: [0, 4.2, 0], fov: 46, to: { pos: [-1.2, 1.2, 7], look: [0, 4.2, 0] } },
      update: (w, p, t) => { reset(w); w.bo.position.set(0, 0, 0); w.bo.rotation.y = 0; w.b.armR.rotation.x = -2.6; },
    },
  ],
};
