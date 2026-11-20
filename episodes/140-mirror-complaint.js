// Narrative 8: "Objects With Opinions". A made-up comedy sketch: mirrors do not talk; the cat only taps the glass.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the mirror with a face.

function mirror(k, parent) {
  const { mat, box, ball, group } = k;
  const m = { root: group([0, 0, 0], parent) };
  m.body = group([0, 0, 0], m.root);
  const wood = mat('#A0703C', { rough: .6 });
  box(3.4, .3, .3, wood, [0, 6.3, 0], m.body); box(3.4, .3, .3, wood, [0, 1.2, 0], m.body);
  for (const x of [-1.6, 1.6]) box(.3, 5.4, .3, wood, [x, 3.75, 0], m.body);
  m.glass = box(2.9, 4.8, .08, mat('#BFE6F5', { rough: .05, glow: .25 }), [0, 3.75, .02], m.body);
  box(.25, .1, .1, mat('#FFFFFF', { glow: 1 }), [-.9, 5.6, .08], m.body).rotation.z = -.6;
  for (const x of [-1, 1]) { const l = box(.2, 1.3, .2, wood, [x * .9, .55, -.3], m.root); l.rotation.x = .3; }
  for (const x of [-.55, .55]) { ball(.3, mat('#FFFFFF'), [x, 4.7, .12], m.body); ball(.15, mat('#111111'), [x, 4.7, .36], m.body); }
  m.mouth = box(.7, .1, .05, mat('#5A1E1E'), [0, 3.6, .1], m.body);
  return m;
}
function talk(m, t, on = true) { m.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B9A6C9', 0);
  w.room = group();
  box(40, 20, .5, mat('#F3E1C7'), [0, 10, -3], w.room);
  w.m = mirror(k, k.scene); w.mi = w.m.root;
  w.person = group([0, 0, 0]);
  cyl(.85, .9, 2.6, mat('#2F6FD6'), [0, 1.3, 0], w.person, 14);
  w.head = group([0, 3.4, 0], w.person); ball(.85, mat('#F2C9A0'), [0, 0, 0], w.head);
  for (const x of [-.3, .3]) ball(.12, mat('#111111'), [x, .15, .78], w.head);
  w.pm = box(.4, .15, .1, mat('#5A1E1E'), [0, -.3, .8], w.head);
  w.angry = group();
  for (let i = 0; i < 4; i++) { const a = ball(.18, mat('#E2453C', { glow: 1.2 }), [0, 0, 0], w.angry); a.userData.i = i; a.castShadow = false; }
  w.cat = group([0, 0, 0]);
  const cb = ball(.7, mat('#F2994A'), [0, .5, 0], w.cat); cb.scale.set(1.4, .6, 1); ball(.45, mat('#F2994A'), [.9, .8, 0], w.cat);
  for (const z of [-.2, .2]) cone(.14, .3, mat('#F2994A'), [.9, 1.25, z], w.cat, 4);
  w.paw = ball(.16, mat('#F2994A'), [1.2, .6, 0], w.cat);
  w.catR = group([0, 0, 0]);
  const rb = ball(.7, mat('#F2994A', { glow: .1 }), [0, .5, 0], w.catR); rb.scale.set(1.4, .6, 1); ball(.45, mat('#F2994A'), [.9, .8, 0], w.catR);
  for (const z of [-.2, .2]) cone(.14, .3, mat('#F2994A'), [.9, 1.25, z], w.catR, 4);
  return w;
}

const still = (w) => { w.mi.position.set(0, 0, 0); w.mi.rotation.set(0, .2, 0); w.m.body.rotation.z = 0; };

export default {
  id: '140',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE MIRROR WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS MIRROR', 'HAS A COMPLAINT.'],
  title: 'This mirror has a complaint',
  description: 'Weird faces every morning. Practice arguments. And a cat who thinks he is another cat. (A made-up talking mirror.)',
  tags: ['objectswithopinions', 'funny', 'mirror', 'cat', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking mirrors are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This mirror has a complaint.',
      show: ['ground', 'room', 'mi'], sky: '#F3E1C7', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.4, 2.4, 13], look: [0, 5.0, 0], fov: 46, to: { pos: [1.2, 2.4, 12], look: [0, 4.9, 0], fov: 44 } },
      update: (w, p, t) => { still(w); talk(w.m, t, t > .2); },
    },
    {
      say: 'People make weird faces at him. Every morning.',
      show: ['ground', 'room', 'mi', 'person'], sky: '#FFE9B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2.6, 4.2, -.6], look: [-.6, 3.0, 3.2], fov: 50, to: { pos: [2.4, 4.1, -.2], look: [-.6, 3.0, 3.2], fov: 46 } },
      update: (w, p, t) => {
        still(w); talk(w.m, t);
        w.person.position.set(-.6, 0, 3.2); w.person.rotation.y = Math.PI - .5;
        const s = Math.sin(t * 5); w.head.scale.set(1 - .15 * s, 1 + .2 * s, 1); w.pm.scale.set(1 + .8 * Math.max(0, s), 1 + 3 * Math.max(0, -s), 1);
      },
    },
    {
      say: 'Then they practice arguments they will never have.',
      show: ['ground', 'room', 'mi', 'person', 'angry'], sky: '#F3E1C7', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [-6, 4.2, 9], look: [.2, 4, 0], fov: 50, to: { pos: [-5.5, 4.2, 8.2], look: [.2, 4, 0], fov: 48 } },
      update: (w, p, t) => {
        still(w); talk(w.m, t);
        w.person.position.set(-.4, 0, 3.2); w.person.rotation.y = Math.PI + .2; w.head.scale.set(1, 1, 1);
        w.head.rotation.z = .12 * Math.sin(t * 9); w.pm.scale.set(1, 1 + 2.5 * Math.abs(Math.sin(t * 12)), 1);
        w.angry.children.forEach(a => { const q = (t * .9 + a.userData.i / 4) % 1; a.position.set(-.4 + (a.userData.i - 1.5) * .5, 4.4 + q * 1.4, 3.2); a.scale.setScalar(1 - q * .6); });
      },
    },
    {
      say: 'And the cat thinks he is another cat. They fight daily.',
      show: ['ground', 'room', 'mi', 'cat', 'catR'], sky: '#3A3550', lightAt: [0, 4, 4], lightDist: 11,
      cam: { pos: [5, 3.2, 10], look: [0, 3.2, .5], fov: 46, to: { pos: [4.6, 3, 9.2], look: [0, 3, .5], fov: 44 } },
      shake: (t) => t > 1.6 ? .02 : 0,
      update: (w, p, t) => {
        still(w); talk(w.m, t, t < 1.6); w.m.body.rotation.z = t > 1.6 ? .03 * Math.sin(t * 20) : 0;
        w.cat.position.set(.2, 0, 2.2); w.cat.rotation.y = Math.PI / 2;
        w.catR.position.set(.2, 0, -1.8); w.catR.rotation.y = -Math.PI / 2; w.catR.scale.setScalar(.85); w.catR.visible = false;
        const sw = t > 1.6 ? Math.abs(Math.sin(t * 10)) : 0; w.paw.position.set(1.2 + sw * .7, .6 + sw * .7, 0);
      },
    },
    {
      say: 'Mirrors: check your hair, make faces, or argue? Comment below.',
      quiz: { q: 'What do you do in the mirror?', options: ['Check my hair', 'Make faces', 'Practice arguments'], answer: 'This mirror is made up. The cat is still fighting.' },
      show: ['ground', 'room', 'mi'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.4, 1.4, 12], look: [0, 6.2, 0], fov: 46, to: { pos: [-1.4, 1.4, 12], look: [0, 6.2, 0] } },
      update: (w, p, t) => { still(w); talk(w.m, t, false); },
    },
  ],
};
