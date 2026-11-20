// Narrative 8: "Objects With Opinions". A made-up comedy sketch: chairs do not talk; nobody falls hard (the tip-back is gentle).
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the chair with a face in a kitchen.

function chair(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const wood = mat('#B07A4A', { rough: .6 });
  box(2.4, .25, 2.4, wood, [0, 2.4, 0], c.body);
  c.legs = [];
  for (const x of [-1, 1]) for (const z of [-1, 1]) c.legs.push(box(.22, 2.4, .22, mat('#8B5A2B'), [x, 1.2, z], c.body));
  c.back = group([0, 2.5, -1.1], c.body);
  box(2.4, 3, .22, wood, [0, 1.5, 0], c.back);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, 2.1, .14], c.back); ball(.12, mat('#111111'), [x, 2.1, .3], c.back); }
  c.mouth = box(.5, .08, .05, mat('#5A1E1E'), [0, 1.4, .14], c.back);
  return c;
}
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8D2B0', 0);
  w.room = group();
  box(40, 20, .5, mat('#BFE3EA'), [0, 10, -6], w.room);
  w.table = group([2.6, 0, -2], w.room); box(4, .3, 4, mat('#C08A48'), [0, 3.6, 0], w.table); for (const x of [-1.7, 1.7]) for (const z of [-1.7, 1.7]) box(.25, 3.6, .25, mat('#8B5A2B'), [x, 1.8, z], w.table);
  w.c = chair(k, k.scene); w.ch = w.c.root;
  w.person = group([0, 0, 0]);
  w.pbody = group([0, 0, 0], w.person);
  cyl(.85, .9, 2.6, mat('#2F6FD6'), [0, 1.3, 0], w.pbody, 14); ball(.85, mat('#F2C9A0'), [0, 3.4, 0], w.pbody);
  w.coats = group([0, 0, 0]);
  for (let i = 0; i < 4; i++) { const ct = box(2.6 - i * .1, 2.4, .3 + i * .05, mat(['#E2453C', '#22C55E', '#8B5CF6', '#FFD21F'][i]), [0, 0, i * .15], w.coats); ct.rotation.x = .08 * i; }
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  w.cat = group([0, 0, 0]);
  const cb = ball(.7, mat('#F2994A'), [0, .5, 0], w.cat); cb.scale.set(1.4, .6, 1); ball(.45, mat('#F2994A'), [.9, .7, 0], w.cat);
  for (const z of [-.2, .2]) cone(.14, .3, mat('#F2994A'), [.9, 1.15, z], w.cat, 4);
  return w;
}

export default {
  id: '136',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CHAIR WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS CHAIR', 'HAS A COMPLAINT.'],
  title: 'This chair has a complaint',
  description: 'Leaned back on two legs. Buried under coats. The only one who treats him right is the cat. (A made-up talking chair.)',
  tags: ['objectswithopinions', 'funny', 'chair', 'home', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking chairs are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This chair has a complaint.',
      show: ['ground', 'room', 'ch'], sky: '#BFE3EA', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 2.8, 12], look: [0, 6.2, 0], fov: 46, to: { pos: [1.8, 2.8, 11], look: [0, 6.1, 0], fov: 44 } },
      update: (w, p, t) => { w.ch.position.set(0, 0, 0); w.ch.rotation.set(0, .3, 0); w.c.body.rotation.x = 0; talk(w.c, t, t > .2); },
    },
    {
      say: 'People lean back on two legs. All day.',
      show: ['ground', 'room', 'ch', 'person'], sky: '#BFE3EA', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [7, 4, 9], look: [0, 3.6, 0], fov: 48, to: { pos: [6.6, 4, 8.2], look: [0, 3.6, 0], fov: 46 } },
      update: (w, p, t) => {
        const tip = -.35 - .08 * Math.sin(t * 3); w.ch.position.set(0, 0, 0); w.ch.rotation.set(0, .3, 0); w.c.body.rotation.x = tip; talk(w.c, t);
        w.person.position.set(0, 2.6, .2); w.person.rotation.set(tip, .3, 0); w.pbody.rotation.z = 0;
      },
    },
    {
      say: 'And at night, he becomes a coat rack.',
      show: ['ground', 'room', 'ch', 'coats'], sky: '#3A4A6A', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 4, 10], look: [0, 4.6, 0], fov: 46, to: { pos: [1.8, 4, 9.2], look: [0, 4.6, 0], fov: 44 } },
      update: (w, p, t) => { w.c.body.rotation.x = 0; w.ch.rotation.set(0, .3, 0); talk(w.c, t); w.coats.position.set(0, 4.4, -1.4); w.coats.rotation.y = .3; w.coats.children.forEach((c, i) => { c.visible = i < 1 + t * 2.5; }); },
    },
    {
      say: 'His one true friend? The cat. Naps only. No leaning.',
      show: ['ground', 'room', 'ch', 'cat', 'hearts'], sky: '#FFE3C2', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 4.4, 9], look: [0, 4.4, 0], fov: 46, to: { pos: [1.8, 4.4, 8.2], look: [0, 4.4, 0], fov: 44 } },
      update: (w, p, t) => {
        w.c.body.rotation.x = 0; w.ch.rotation.set(0, .3, 0); talk(w.c, t, t < 1.8); w.cat.position.set(-.2, 2.55, .3); w.cat.rotation.y = .3; w.cat.children[0].scale.y = .6 + .03 * Math.sin(t * 3);
        w.hearts.children.forEach(h => { const q = (t * .8 + h.userData.i / 4) % 1; h.position.set((h.userData.i - 1.5) * .4, 6 + q * 1.6, -.8); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'Chairs: sit, lean back, or a coat rack? Comment below.',
      quiz: { q: 'What do you use a chair for?', options: ['Sitting', 'Leaning back', 'A coat rack'], answer: 'This chair is made up. Please just sit.' },
      show: ['ground', 'room', 'ch'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2, 1.6, 11], look: [0, 6.4, 0], fov: 46, to: { pos: [-2, 1.6, 11], look: [0, 6.4, 0] } },
      update: (w, p, t) => { w.ch.position.set(0, 0, 0); w.ch.rotation.set(0, .3, 0); w.c.body.rotation.x = 0; talk(w.c, t, false); },
    },
  ],
};
