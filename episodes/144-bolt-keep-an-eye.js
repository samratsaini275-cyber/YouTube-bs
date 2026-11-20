// Narrative 9: "Bolt Takes It Literally". Angle B (recurring character). A made-up comedy sketch: Bolt the robot is not real;
// the dog is fine (the eye is a cartoon robot part). Hook: the instruction, within 2.0 s; Bolt and the cake in the first frame.

function bolt(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  const metal = mat('#8FA6BF', { rough: .35 }), dark = mat('#3A4250');
  for (const x of [-.35, .35]) box(.35, .8, .4, dark, [x, .4, 0], b.root);
  box(1.5, 1.4, 1, metal, [0, 1.5, 0], b.root);
  box(.6, .3, .05, mat('#FFD21F', { glow: 1 }), [0, 1.6, .52], b.root);
  b.head = group([0, 2.2, 0], b.root);
  box(1.2, .9, .9, metal, [0, .45, 0], b.head);
  b.eyes = [-.28, .28].map(x => { const e = cyl(.2, .2, .08, mat('#5CF2FF', { glow: 2 }), [x, .5, .46], b.head, 16); e.rotation.x = Math.PI / 2; return e; });
  b.sockets = [-.28, .28].map(x => { const s = cyl(.17, .17, .05, dark, [x, .5, .44], b.head, 16); s.rotation.x = Math.PI / 2; return s; });
  b.mouth = box(.4, .06, .05, dark, [0, .2, .46], b.head);
  cyl(.04, .04, .4, dark, [0, 1.1, 0], b.head, 6); b.tip = ball(.1, mat('#E2453C', { glow: 1.5 }), [0, 1.35, 0], b.head);
  b.armL = group([-.85, 2.0, 0], b.root); box(.25, .9, .25, metal, [0, -.45, 0], b.armL);
  b.armR = group([.85, 2.0, 0], b.root); box(.25, .9, .25, metal, [0, -.45, 0], b.armR);
  return b;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#D9C7A8', 0);
  w.room = group();
  box(40, 20, .5, mat('#F7D6E0'), [0, 10, -4], w.room);
  w.table = group([1.4, 0, 0]);
  box(2.4, .2, 1.8, mat('#FFFFFF'), [0, 1.8, 0], w.table); for (const x of [-1, 1]) box(.15, 1.8, .15, mat('#8B5A2B'), [x, .9, 0], w.table);
  w.cake = group([1.4, 1.9, 0]);
  cyl(.8, .8, .5, mat('#F9A8C9'), [0, .25, 0], w.cake, 24); cyl(.6, .6, .4, mat('#FFFFFF'), [0, .7, 0], w.cake, 24);
  cyl(.05, .05, .35, mat('#5CF2FF'), [0, 1.08, 0], w.cake, 6); ball(.07, mat('#FFB020', { glow: 2 }), [0, 1.3, 0], w.cake);
  w.b = bolt(k, k.scene); w.bo = w.b.root;
  w.eye = cyl(.2, .2, .08, mat('#5CF2FF', { glow: 2 }), [0, 0, 0], k.scene, 16);
  w.dog = group([0, 0, 0]);
  const brown = mat('#B9783F');
  const db = ball(.8, brown, [0, 1.1, 0], w.dog); db.scale.set(1.6, .8, .9);
  ball(.55, brown, [-1.3, 1.6, 0], w.dog); ball(.25, mat('#3A2A1A'), [-1.8, 1.5, 0], w.dog);
  for (const z of [-.3, .3]) { cone(.18, .4, mat('#7A4A22'), [-1.2, 2.1, z], w.dog, 6); ball(.08, mat('#111111'), [-1.65, 1.75, z * .6], w.dog); }
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) cyl(.15, .15, .7, brown, [x, .35, z], w.dog, 8);
  w.tail = cyl(.08, .08, .7, brown, [1.4, 1.5, 0], w.dog, 6); w.tail.rotation.z = -.8;
  w.belly = ball(.22, mat('#5CF2FF', { glow: 2.5 }), [0, 1.0, .72], w.dog);
  return w;
}

const reset = (w) => {
  w.bo.position.set(-1.4, 0, .3); w.bo.rotation.set(0, .35, 0); w.b.armR.rotation.set(0, 0, 0); w.b.armL.rotation.set(0, 0, 0); w.b.head.rotation.set(0, 0, 0);
  w.b.eyes[1].visible = true; w.eye.visible = false; w.cake.visible = true; w.cake.scale.setScalar(1); w.dog.visible = false; w.belly.visible = false;
};
const lerp = (a, b, q) => a + (b - a) * q;

export default {
  id: '144',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BOLT TAKES IT LITERALLY',
  year: 'KEEP AN EYE ON IT',
  hook: ['BOLT, KEEP AN EYE', 'ON THE CAKE.'],
  title: 'Bolt, keep an eye on the cake',
  description: 'One job: keep an eye on the cake. Bolt the robot does exactly that. Then the dog arrives. (A made-up robot comedy sketch.)',
  tags: ['bolttakesitliterally', 'funny', 'robot', 'idioms', 'dog', 'shorts'],
  sources: [
    'Comedy sketch: Bolt the robot is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Bolt, keep an eye on the cake.',
      show: ['ground', 'room', 'table', 'cake', 'bo'], sky: '#F7D6E0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.6, 11], look: [0, 3.5, 0], fov: 46, to: { pos: [0, 2.6, 10.3], look: [0, 3.4, 0], fov: 44 } },
      update: (w, p, t) => { reset(w); w.b.head.rotation.y = .25 * Math.sin(t * 3); w.b.tip.scale.setScalar(1 + .3 * Math.sin(t * 10)); },
    },
    {
      say: 'So Bolt took out one eye. And put it on the cake.',
      show: ['ground', 'room', 'table', 'cake', 'bo', 'eye'], sky: '#F7D6E0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 3.6, 9.5], look: [0, 3.0, 0], fov: 46, to: { pos: [0, 3.5, 8.8], look: [0, 3.0, 0], fov: 44 } },
      update: (w, p, t) => {
        reset(w); const q = Math.min(1, Math.max(0, (t - .6) / 1.6)); const out = t > .6;
        w.b.eyes[1].visible = !out; w.eye.visible = out; w.b.armR.rotation.x = out ? -1.4 * Math.sin(Math.min(1, q) * Math.PI / 2) : -1.6 * Math.min(1, t / .6);
        w.eye.position.set(lerp(-1.05, 1.4, q), lerp(2.75, 3.25, q) + Math.sin(q * Math.PI) * .8, lerp(.75, .1, q)); w.eye.rotation.set(Math.PI / 2 * (1 - q), 0, 0);
        w.b.head.rotation.y = .4 * q;
      },
    },
    {
      say: 'Then the dog ate the cake. And the eye.',
      show: ['ground', 'room', 'table', 'cake', 'bo', 'eye', 'dog'], sky: '#F7D6E0', lightAt: [0, 5, 4], lightDist: 13,
      cam: { pos: [1.5, 3.4, 10], look: [1, 2.4, 0], fov: 48, to: { pos: [1.4, 3.3, 9.2], look: [1, 2.4, 0], fov: 46 } },
      update: (w, p, t) => {
        reset(w); w.b.eyes[1].visible = false; w.dog.visible = true; w.b.head.rotation.y = .4;
        const d = Math.min(1, t / 1.0); w.dog.position.set(lerp(6, 3.2, d), t > 1 && t < 2 ? .7 * Math.sin((t - 1) * Math.PI) : 0, 0); w.dog.rotation.z = t > 1 && t < 2 ? .25 * Math.sin((t - 1) * Math.PI) : 0;
        w.tail.rotation.x = .6 * Math.sin(t * 16);
        const eat = Math.min(1, Math.max(0, (t - 1.2) * 2.5)); w.cake.scale.setScalar(Math.max(.01, 1 - eat)); w.cake.visible = eat < 1;
        w.eye.visible = eat < .6; w.eye.position.set(1.4, 3.25, .1); w.eye.rotation.set(0, 0, 0);
      },
    },
    {
      say: 'Good news: Bolt can still see the cake. From inside the dog.',
      show: ['ground', 'room', 'table', 'bo', 'dog'], sky: '#FFE3C2', lightAt: [0, 5, 4], lightDist: 13,
      cam: { pos: [1.2, 3, 9.5], look: [.6, 2.3, 0], fov: 48, to: { pos: [1.1, 2.9, 8.8], look: [.6, 2.2, 0], fov: 46 } },
      update: (w, p, t) => {
        reset(w); w.cake.visible = false; w.b.eyes[1].visible = false; w.dog.visible = true; w.belly.visible = t > 1.4;
        w.dog.position.set(1.6, 0, 1.3); w.dog.rotation.set(0, 0, 0); w.tail.rotation.x = .6 * Math.sin(t * 12);
        w.belly.scale.setScalar(1 + .25 * Math.sin(t * 6)); w.b.head.rotation.y = .5; w.b.head.rotation.z = .08 * Math.sin(t * 3);
      },
    },
    {
      say: 'Keep an eye on it: watch it, guard it, or an actual eye? Comment below.',
      quiz: { q: 'What does "keep an eye on it" mean?', options: ['Watch it', 'Guard it', 'Leave an actual eye'], answer: 'Bolt is made up. The dog is fine. The eye is still watching.' },
      show: ['ground', 'room', 'bo'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 1.2, 7], look: [0, 4.2, 0], fov: 46, to: { pos: [-1.2, 1.2, 7], look: [0, 4.2, 0] } },
      update: (w, p, t) => { reset(w); w.cake.visible = false; w.bo.position.set(0, 0, 0); w.bo.rotation.y = 0; w.b.eyes[1].visible = false; w.b.head.rotation.z = .1 * Math.sin(t * 2); },
    },
  ],
};
