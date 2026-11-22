// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: kites do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the kite with a face.

function kite(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const e = { root: group([0, 0, 0], parent) };
  e.body = group([0, 0, 0], e.root);
  const sail = box(2.4, 2.4, .08, mat('#E2453C', { rough: .6 }), [0, 0, 0], e.body); sail.rotation.z = Math.PI / 4; sail.scale.set(1, 1.35, 1);
  const s2 = box(1.2, 1.2, .1, mat('#FFC21F', { rough: .6 }), [0, 0, .01], e.body); s2.rotation.z = Math.PI / 4; s2.scale.set(1, 1.35, 1); s2.position.set(.6, .8, .01); s2.visible = false;
  box(.06, 4.4, .06, mat('#8A5A2B'), [0, 0, .06], e.body); box(3.3, .06, .06, mat('#8A5A2B'), [0, .5, .06], e.body);
  e.tail = group([0, -2.3, 0], e.body); for (let i = 0; i < 5; i++) { const b = group([0, -i * .7, 0], e.tail); const m = mat(['#3B82F6', '#FFC21F', '#22C55E'][i % 3]); const l = box(.4, .22, .06, m, [-.18, 0, 0], b); l.rotation.z = .5; const r = box(.4, .22, .06, m, [.18, 0, 0], b); r.rotation.z = -.5; b.userData.i = i; }
  e.face = group([0, .35, .1], e.body);
  for (const x of [-.4, .4]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], e.face); ball(.12, mat('#111111'), [x, .2, .16], e.face); }
  e.brows = [-.4, .4].map(x => box(.34, .06, .05, mat('#111111'), [x, .52, .04], e.face));
  e.mouth = box(.45, .1, .05, mat('#5A1E1E'), [0, -.32, .02], e.face);
  return e;
}
function talk(e, t, on = true) { e.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(e, a) { e.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }
function flutter(e, t, a = 1) { e.tail.children.forEach(b => { const i = b.userData.i; b.position.x = Math.sin(t * 5 - i * .8) * .35 * a * (i / 4 + .2); }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#7FB069', 0);
  w.hills = group(); for (let i = 0; i < 4; i++) { const h = ball(6, mat(i % 2 ? '#6FA35B' : '#5E9450'), [-12 + i * 8, -3.5, -14], w.hills); h.scale.y = .5; }
  w.clouds = group(); for (let i = 0; i < 4; i++) { const c = group([-8 + i * 5.5, 12 + (i % 2) * 2, -10], w.clouds); for (let j = 0; j < 3; j++) ball(1 + (j % 2) * .4, mat('#FFFFFF'), [j * 1.1, 0, 0], c); }
  w.e = kite(k, k.scene); w.kt = w.e.root;
  w.string = cyl(.03, .03, 1, mat('#FFFFFF'), [0, 0, 0], k.scene, 4); w.string.castShadow = false;
  w.tree = group(); cyl(.6, .8, 6, mat('#7A5230'), [0, 3, 0], w.tree, 10); for (let i = 0; i < 5; i++) ball(2.2 - (i % 2) * .4, mat('#2E8B4A'), [Math.cos(i * 1.3) * 1.6, 7 + Math.sin(i * 2) * .9, Math.sin(i * 1.3) * 1.2], w.tree);
  w.knot = group(); for (let i = 0; i < 7; i++) { const l = k.torus(.4 + (i % 3) * .15, .04, mat('#FFFFFF'), [Math.cos(i) * .3, Math.sin(i * 2) * .3, 0], w.knot); l.rotation.set(i, i * 2, 0); l.castShadow = false; }
  w.sky2 = group(); for (let i = 0; i < 3; i++) { const b = group([0, 0, 0], w.sky2); ball(.15, mat('#222222'), [0, 0, 0], b); for (const s of [-1, 1]) { const wg = box(.4, .03, .12, mat('#222222'), [s * .22, 0, 0], b); wg.rotation.z = s * .3; } b.userData.i = i; }
  return w;
}

const fly = (w, x, y, z, rz, t, on = true) => { w.kt.position.set(x, y, z); w.kt.rotation.set(0, 0, rz); w.e.body.rotation.set(0, 0, 0); talk(w.e, t, on); };
const tie = (w, ax, ay, az) => { const A = new w.kt.position.constructor(ax, ay, az), B = w.kt.position.clone(); B.y -= .9; w.string.position.copy(A).add(B).multiplyScalar(.5); w.string.scale.y = A.distanceTo(B); w.string.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '221',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE KITE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS KITE', 'HAS A COMPLAINT'],
  title: 'This kite has a complaint',
  description: 'Stuck in a tree every single time. String in knots. And when there is no wind, dragged along the grass. So the kite cut the string. (A made-up comedy sketch.)',
  tags: ['funny', 'kite', 'outdoors', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: kites are thought to have been invented in China more than 2,000 years ago (Encyclopaedia Britannica, "kite").',
  ],
  setup,
  scenes: [
    {
      say: 'This kite has a complaint.',
      show: ['grass', 'hills', 'clouds', 'kt'], sky: '#9ED2F3', lightAt: [0, 9, 4], lightDist: 24,
      cam: { pos: [0, 6, 12], look: [0, 6.9, 0], fov: 46, to: { pos: [0, 6, 11.2], look: [0, 6.9, 0], fov: 44 } },
      update: (w, p, t) => { fly(w, 0, 6 + .2 * Math.sin(t * 2), 0, .1 * Math.sin(t * 1.5), t); flutter(w.e, t); grump(w.e, .35); },
    },
    {
      say: 'Every single time? Stuck in a tree.',
      show: ['grass', 'hills', 'clouds', 'kt', 'tree'], sky: '#9ED2F3', lightAt: [0, 9, 4], lightDist: 24,
      cam: { pos: [1, 6.6, 18], look: [.4, 7.3, 0], fov: 48, to: { pos: [1, 6.6, 17.2], look: [.4, 7.3, 0], fov: 46 } },
      update: (w, p, t) => { fly(w, .3, 8.2, 4, .5 + .06 * Math.sin(t * 9), t); flutter(w.e, t, .3); grump(w.e, .6); },
    },
    {
      say: 'His string? Always in knots.',
      show: ['grass', 'hills', 'clouds', 'kt', 'knot'], sky: '#9ED2F3', lightAt: [0, 9, 4], lightDist: 24,
      cam: { pos: [0, 5, 9], look: [0, 4.8, 0], fov: 46, to: { pos: [0, 5, 8.2], look: [0, 4.8, 0], fov: 44 } },
      update: (w, p, t) => { fly(w, 0, 6, 0, .15 * Math.sin(t * 3), t); flutter(w.e, t); grump(w.e, -.35); w.e.mouth.scale.y = 2.4; w.knot.position.set(0, 3, .3); w.knot.rotation.set(t * 2, t * 3, 0); w.knot.scale.setScalar(1 + p * .6); },
    },
    {
      say: 'No wind? Dragged through the grass.',
      show: ['grass', 'hills', 'clouds', 'kt', 'string'], sky: '#B8C4CE', lightAt: [0, 9, 4], lightDist: 24,
      cam: { pos: [1.5, 6, 10], look: [0, .4, 0], fov: 46, to: { pos: [1.4, 5.8, 9.2], look: [0, .4, 0], fov: 44 } },
      update: (w, p, t) => { const x = 1.8 - p * 3.6; fly(w, x, .5 + .12 * Math.abs(Math.sin(t * 8)), 0, .08 * Math.sin(t * 8), t); w.kt.rotation.x = -1.15; flutter(w.e, t, .2); grump(w.e, .6); tie(w, x - 8, 1, 0); },
    },
    {
      say: 'So today, he cut the string. Free.',
      show: ['grass', 'hills', 'clouds', 'kt', 'sky2'], sky: '#7EC8F0', lightAt: [0, 9, 4], lightDist: 30,
      cam: { pos: [0, 8, 13], look: [0, 9, 0], fov: 50, to: { pos: [0, 8.6, 12.4], look: [0, 10, 0], fov: 48 } },
      update: (w, p, t) => {
        fly(w, -1 + p * 2, 7.5 + p * 3, 0, .2 * Math.sin(t * 2), t, false); flutter(w.e, t, 1.4); w.e.mouth.scale.y = 1.8; grump(w.e, -.35);
        w.sky2.children.forEach(b => { const i = b.userData.i; b.position.set(-3 + i * 2.6 + p * 2, 12 + i * .6 + .3 * Math.sin(t * 3 + i), -1); b.children.forEach(c => { if (c.geometry && c.geometry.type === 'BoxGeometry') c.rotation.z = Math.sign(c.position.x) * (.3 + .5 * Math.sin(t * 14)); }); });
      },
    },
    {
      say: 'Grumpy kite: fly it, fix it, or let it go? Comment below.',
      quiz: { q: 'What do you do with the grumpy kite?', options: ['Fly it', 'Fix it', 'Let it go'], answer: 'Fun fact: kites were invented in China over 2,000 years ago.' },
      show: ['grass', 'hills', 'clouds', 'kt'], sky: '#274B73', lightAt: [0, 9, 4], lightDist: 24,
      cam: { pos: [5, 5.4, 9], look: [0, 5.6, 0], fov: 46, to: { pos: [-5, 5.4, 9], look: [0, 5.6, 0] } },
      update: (w, p, t) => { fly(w, 0, 6, 0, .1 * Math.sin(t * 1.5), t, false); flutter(w.e, t); grump(w.e, -.2); },
    },
  ],
};
