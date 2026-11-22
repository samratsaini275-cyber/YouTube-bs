// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: footballs do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the football with a face.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function football(k, parent) {
  const { mat, ball, box, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  ball(1, mat('#F7F7F7', { rough: .5 }), [0, 0, 0], b.body);
  const pts = [[0, 1, 0], [0, -1, 0], [-.7, .3, -.6], [-.7, -.3, .6], [-.2, .6, -.78], [-.4, -.7, -.6], [-.95, .1, 0]];
  for (const [x, y, z] of pts) { const l = Math.hypot(x, y, z); const p = ball(.3, mat('#1A1A1A'), [x / l * .9, y / l * .9, z / l * .9], b.body); p.scale.setScalar(1); }
  b.face = group([0, 0, 0], b.body);
  for (const z of [-.32, .32]) { ball(.2, mat('#FFFFFF'), [.86, .25, z], b.face); ball(.1, mat('#111111'), [1.02, .25, z], b.face); }
  b.brows = [-.32, .32].map(z => box(.05, .06, .3, mat('#111111'), [.98, .5, z], b.face));
  b.mouth = box(.05, .1, .4, mat('#5A1E1E'), [1, -.3, 0], b.face);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(b, a) { b.brows.forEach((br, i) => br.rotation.x = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#4FA34A', 0);
  w.lines = group(); for (let i = -3; i <= 3; i++) { const l = box(40, .02, .25, mat('#FFFFFF'), [0, .02, i * 8], w.lines); l.castShadow = false; }
  w.goal = group(); const wh = mat('#FFFFFF'); cyl(.18, .18, 6, wh, [0, 3, -6], w.goal, 10); cyl(.18, .18, 6, wh, [0, 3, 6], w.goal, 10); const cb = cyl(.18, .18, 12.4, wh, [0, 6, 0], w.goal, 10); cb.rotation.x = Math.PI / 2;
  const net = box(.05, 6, 12, mat('#FFFFFF', { glow: .1 }), [-2, 3, 0], w.goal); net.material.transparent = true; net.material.opacity = .35;
  w.b = football(k, k.scene); w.ball = w.b.root;
  w.kid = person(k, k.scene, '#E2453C'); w.kp = w.kid.root;
  w.kid2 = person(k, k.scene, '#2F6FD6'); w.kp2 = w.kid2.root;
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.15, mat('#FFD21F', { glow: 1 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  w.ducks = group(); for (let i = 0; i < 2; i++) { const d = group([0, 0, 0], w.ducks); ball(.6, mat('#FFD21F'), [0, .6, 0], d); ball(.4, mat('#FFD21F'), [.5, 1.2, 0], d); const bk = box(.35, .12, .25, mat('#FF8A1F'), [.95, 1.15, 0], d); d.userData.i = i; }
  return w;
}

const ballAt = (w, x, y, z, ry, t, on = true) => { w.ball.position.set(x, y + 1, z); w.ball.rotation.set(0, ry, 0); w.b.body.rotation.set(0, 0, 0); talk(w.b, t, on); };

export default {
  id: '205',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FOOTBALL',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS FOOTBALL', 'HAS A COMPLAINT'],
  title: 'This football has a complaint',
  description: 'Kicked all day. Headbutted. And when he finally scores, nobody says thank you. So today, the football has a plan. (A made-up comedy sketch.)',
  tags: ['funny', 'football', 'soccer', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: a regulation size 5 football weighs 410 to 450 grams at the start of a match (IFAB Laws of the Game, Law 2).',
  ],
  setup,
  scenes: [
    {
      say: 'This football has a complaint.',
      show: ['ground', 'lines', 'ball', 'goal'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [6, 1.6, 2.2], look: [0, 1.25, 0], fov: 46, to: { pos: [5.4, 1.6, 2], look: [0, 1.25, 0], fov: 44 } },
      update: (w, p, t) => { w.goal.position.set(-14, 0, 0); ballAt(w, 0, 0, 0, -.35, t); grump(w.b, .35); },
    },
    {
      say: 'Everyone kicks him. Every single day.',
      show: ['ground', 'lines', 'ball', 'kp', 'goal'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 22,
      cam: { pos: [3, 3.6, 14], look: [.4, 3.4, 0], fov: 50, to: { pos: [3, 3.6, 13], look: [.4, 3.4, 0], fov: 48 } },
      update: (w, p, t) => {
        w.goal.position.set(-20, 0, 0); const q = (t * .9) % 1; w.kp.position.set(3.4 - Math.min(q, .25) * 2, 0, 0); w.kp.rotation.set(0, -Math.PI / 2, q < .25 ? -.3 * Math.sin(q / .25 * Math.PI) : 0);
        const f = Math.max(0, q - .22) / .78; ballAt(w, 1.6 - f * 7, Math.sin(f * Math.PI) * 4, 0, .3, t); w.b.body.rotation.z = f * 12; grump(w.b, .4);
      },
    },
    {
      say: 'He gets headbutted. So rude.',
      show: ['ground', 'lines', 'ball', 'kp2', 'stars'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 22,
      cam: { pos: [3, 4, 12], look: [0, 4.4, 0], fov: 46, to: { pos: [3, 4, 11], look: [0, 4.4, 0], fov: 44 } },
      update: (w, p, t) => {
        const q = (t * 1.1) % 1; w.kp2.position.set(1.8, 0, 0); w.kp2.rotation.set(0, -Math.PI / 2, 0); w.kid2.head.position.y = 3.3 + (q < .2 ? .4 * Math.sin(q / .2 * Math.PI) : 0);
        const by = q < .2 ? 8 - q * 18 : 4.4 + (q - .2) * 6; ballAt(w, 1.5 - (q > .2 ? (q - .2) * 4 : 0), by - 1, 0, -1.1, t); grump(w.b, .5);
        w.stars.children.forEach(s => { const i = s.userData.i, a = t * 5 + i * 1.256; s.position.set(w.ball.position.x + Math.cos(a) * 1.4, w.ball.position.y + 1.2, Math.sin(a) * 1.4); });
      },
    },
    {
      say: 'And when he scores? Nobody says thanks.',
      show: ['ground', 'lines', 'ball', 'goal', 'kp'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 22,
      cam: { pos: [2.5, 3.2, 11], look: [-3.2, 1.8, 0], fov: 46, to: { pos: [2.3, 3.2, 10.2], look: [-3.2, 1.8, 0], fov: 44 } },
      update: (w, p, t) => { w.goal.position.set(-3, 0, 0); ballAt(w, -4.2, 0, .5, -1.0, t); grump(w.b, .55); w.kp.position.set(3, 0, -4); w.kp.rotation.set(0, Math.PI / 2, 0); w.kid.head.rotation.z = .3 * Math.sin(t * 8); },
    },
    {
      say: 'So today, he dodged the goal.',
      show: ['ground', 'lines', 'ball', 'goal'], sky: '#F7C99A', lightAt: [0, 5, 0], lightDist: 22,
      cam: { pos: [3, 3.4, 13], look: [-2, 2.6, 2], fov: 50, to: { pos: [2.8, 3.4, 12.2], look: [-2, 2.6, 2], fov: 48 } },
      update: (w, p, t) => {
        w.goal.position.set(-6, 0, 0); const x = 2 - p * 8, z = p > .5 ? (p - .5) * 2 * 9 : 0; ballAt(w, x, Math.abs(Math.sin(p * 8)) * .8, z, -1.0, t, false);
        w.b.mouth.scale.y = 2.5; grump(w.b, -.2);
      },
    },
    {
      say: 'Grumpy football: kick it, keep it, or say sorry? Comment below.',
      quiz: { q: 'What do you do with the grumpy football?', options: ['Kick it', 'Keep it', 'Say sorry'], answer: 'Fun fact: a full-size football weighs about 410 to 450 grams.' },
      show: ['ground', 'lines', 'ball'], sky: '#274B73', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [6, 2.4, 4], look: [0, 1.6, 0], fov: 46, to: { pos: [-6, 2.4, 4], look: [0, 1.6, 0] } },
      update: (w, p, t) => { ballAt(w, 0, 0, 0, -.4, t, false); grump(w.b, -.2); w.ducks.children.forEach(d => { const i = d.userData.i; d.position.set(-2.2 + i * 4.2, 0, -1.2); d.rotation.y = i ? Math.PI : 0; }); },
    },
  ],
};
