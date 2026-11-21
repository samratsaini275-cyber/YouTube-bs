// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; combines two winners (067 dogs drive, 074 homework).
// A made-up comedy sketch: dogs do not go to school. Hook: the premise as a question under 2 s; first frame shows the dog at a desk.

function dog(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const brown = mat('#C98A4B', { rough: .8 }), dark = mat('#7A4A22');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(.8, brown, [0, 1.1, 0], d.body); b.scale.set(1.5, .8, .9);
  d.head = group([-1.2, 1.7, 0], d.body);
  ball(.6, brown, [0, 0, 0], d.head); box(.55, .35, .45, brown, [-.55, -.15, 0], d.head);
  ball(.12, mat('#222222'), [-.85, -.05, 0], d.head);
  d.mouth = box(.35, .06, .3, mat('#7A2A2A'), [-.6, -.36, 0], d.head);
  for (const z of [-.25, .25]) { ball(.12, mat('#FFFFFF'), [-.4, .2, z * 1.3], d.head); ball(.06, mat('#111111'), [-.48, .2, z * 1.45], d.head); }
  d.ears = [-1, 1].map(s => { const e = box(.18, .5, .3, dark, [.1, .1, s * .55], d.head); e.rotation.x = s * .3; return e; });
  d.legs = [];
  for (const x of [-.8, .8]) for (const z of [-.35, .35]) d.legs.push(cyl(.14, .14, .7, brown, [x, .35, z], d.body, 8));
  d.tail = cyl(.07, .07, .7, brown, [1.3, 1.5, 0], d.body, 6); d.tail.rotation.z = -.8;
  return d;
}
function talk(d, t, on = true) { d.mouth.scale.y = on ? 1 + 4 * Math.abs(Math.sin(t * 14)) : 1; d.tail.rotation.x = .7 * Math.sin(t * 15); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B9A27E', 0);
  w.room = group(); box(40, 20, .5, mat('#CFE6D2'), [0, 10, -4], w.room);
  box(5, 2.6, .1, mat('#2E4A3A'), [0, 4.2, -3.7], w.room); box(5.3, .2, .3, mat('#8B5A2B'), [0, 2.85, -3.6], w.room);
  w.desk = group([0, 0, 0]); box(2.6, .15, 1.6, mat('#D9A55B'), [0, 1.6, 0], w.desk); for (const x of [-1.1, 1.1]) for (const z of [-.6, .6]) box(.1, 1.6, .1, mat('#8B5A2B'), [x, .8, z], w.desk);
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.bag = box(.6, .7, .3, mat('#E2453C'), [.2, 1.6, 0], w.d.body); w.bag.rotation.y = Math.PI / 2;
  w.paper = box(.55, .03, .7, mat('#FFFFFF'), [0, 0, 0], k.scene);
  w.lunch = group(); const cols = ['#3B82F6', '#22C55E', '#F97316', '#8B5CF6'];
  for (let i = 0; i < 4; i++) { const g = group([-1.5 + i * 1, 1.68, .2], w.lunch); box(.7, .3, .5, mat(cols[i]), [0, 0, 0], g); const lid = box(.7, .05, .5, mat(cols[i]), [0, .2, -.25], g); lid.rotation.x = -1.2; }
  w.crumbs = group(); for (let i = 0; i < 10; i++) { const c = box(.08, .05, .08, mat('#F5D08A'), [-1.6 + i * .35, 1.71, .45 + (i % 2) * .1], w.crumbs); }
  w.teacher = group([0, 0, 0]); cyl(.8, .9, 2.8, mat('#8B5CF6'), [0, 1.4, 0], w.teacher, 14); ball(.75, mat('#F2C9A0'), [0, 3.5, 0], w.teacher);
  for (const x of [-.28, .28]) ball(.1, mat('#111111'), [x, 3.6, .68], w.teacher);
  w.ball = ball(.22, mat('#C8F02E'), [0, 0, 0], k.scene);
  w.star = group(); ball(.35, mat('#FFD21F', { glow: 1.8 }), [0, 0, 0], w.star);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const c = cone(.18, .45, mat('#FFD21F', { glow: 1.8 }), [Math.sin(a) * .45, Math.cos(a) * .45, 0], w.star, 4); c.rotation.z = -a; }
  return w;
}

const pose = (w, x, y, z, ry) => { w.dg.position.set(x, y, z); w.dg.rotation.set(0, ry, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0); w.d.body.position.y = 0; };

export default {
  id: '148',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DOG AT SCHOOL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'WENT TO SCHOOL?'],
  title: 'What would happen if dogs went to school?',
  description: 'The homework really gets eaten. Every lunch disappears. Recess is fetch with the teacher. And somehow, top marks. (A made-up school dog.)',
  tags: ['whatif', 'funny', 'dog', 'school', 'homework', 'shorts'],
  sources: [
    'Comedy sketch: dogs at school are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if dogs went to school?',
      show: ['ground', 'room', 'desk', 'dg'], sky: '#CFE6D2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.8, 9.5], look: [0, 3.85, 0], fov: 46, to: { pos: [0, 2.8, 8.7], look: [0, 3.8, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, .3, 1.68, 0, 1.0); talk(w.d, t, false); w.d.tail.rotation.x = .7 * Math.sin(t * 15); w.d.head.rotation.z = .1 * Math.sin(t * 3); },
    },
    {
      say: 'Homework? He actually ate it.',
      show: ['ground', 'room', 'desk', 'dg', 'paper'], sky: '#CFE6D2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 3.4, 8.5], look: [0, 3.0, 0], fov: 44, to: { pos: [.3, 3.3, 7.8], look: [0, 3.0, 0], fov: 42 } },
      update: (w, p, t) => {
        pose(w, .3, 1.68, 0, 1.0); w.d.mouth.scale.y = 1 + 3 * Math.abs(Math.sin(t * 8)); w.d.tail.rotation.x = .7 * Math.sin(t * 15);
        const hp = new w.dg.position.constructor(-.62, -.3, 0); w.d.head.localToWorld(hp); w.paper.position.copy(hp); w.paper.rotation.set(.3, 1.0, .2 * Math.sin(t * 8)); w.paper.scale.setScalar(Math.max(.2, 1 - t * .35));
      },
    },
    {
      say: 'Lunch? Everyone’s lunch. Gone.',
      show: ['ground', 'room', 'desk', 'dg', 'lunch', 'crumbs'], sky: '#CFE6D2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 3.6, 10.5], look: [0, 2.9, 0], fov: 46, to: { pos: [.3, 3.5, 9.7], look: [0, 2.9, 0], fov: 44 } },
      update: (w, p, t) => {
        w.desk.scale.set(1.6, 1, 1); pose(w, .2, 1.68, -.3, 1.0); w.d.body.scale.set(1 + .25 * Math.min(1, t / 1.5), 1 + .3 * Math.min(1, t / 1.5), 1 + .3 * Math.min(1, t / 1.5)); talk(w.d, t, false);
        w.d.head.rotation.z = -.2 + .1 * Math.sin(t * 6);
      },
    },
    {
      say: 'Recess? Fetch with the teacher. All day.',
      show: ['ground', 'teacher', 'dg', 'ball'], sky: '#9ED2F3', lightAt: [0, 5, 4], lightDist: 16,
      cam: { pos: [0, 3.6, 13], look: [0, 2.4, 0], fov: 50, to: { pos: [0, 3.6, 12], look: [0, 2.4, 0], fov: 48 } },
      update: (w, p, t) => {
        w.desk.scale.set(1, 1, 1); w.d.body.scale.set(1, 1, 1);
        w.teacher.position.set(-3, 0, 0); w.teacher.rotation.y = Math.PI / 2;
        const c = (t % 1.6) / 1.6; const out = c < .5 ? c * 2 : 2 - c * 2;
        w.ball.position.set(-2.4 + out * 5.5, 3.2 + Math.sin(out * Math.PI) * 2.5 - (c > .5 ? 1.6 : 0) * (1 - out), .2);
        pose(w, -1.8 + out * 5.2, 0, .3, c < .5 ? Math.PI : 0); w.d.body.position.y = .2 * Math.abs(Math.sin(t * 14)); talk(w.d, t, false);
      },
    },
    {
      say: 'And somehow, he still got top marks.',
      show: ['ground', 'room', 'desk', 'dg', 'star'], sky: '#CFE6D2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.6, 8.5], look: [0, 3.1, 0], fov: 46, to: { pos: [0, 2.6, 7.7], look: [0, 3.05, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, .3, 1.68, 0, 1.0); w.d.tail.rotation.x = .9 * Math.sin(t * 18); talk(w.d, t, false); w.d.head.rotation.x = .15 * Math.sin(t * 5);
        w.star.position.set(-.4, 4.6 + .15 * Math.sin(t * 3), .3); w.star.rotation.z = t * .8; w.star.scale.setScalar(Math.min(1, t * 1.5));
      },
    },
    {
      say: 'Dogs at school: genius, chaos, or a good boy? Comment below.',
      quiz: { q: 'A dog in your class would be…', options: ['A genius', 'Total chaos', 'A good boy'], answer: 'Dogs at school are made up. The homework excuse is not.' },
      show: ['ground', 'room', 'desk', 'dg'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 1.2, 7.5], look: [0, 4.4, 0], fov: 46, to: { pos: [-1.4, 1.2, 7.5], look: [0, 4.4, 0] } },
      update: (w, p, t) => { pose(w, .3, 1.68, 0, 1.0); talk(w.d, t, false); w.d.tail.rotation.x = .7 * Math.sin(t * 15); },
    },
  ],
};
