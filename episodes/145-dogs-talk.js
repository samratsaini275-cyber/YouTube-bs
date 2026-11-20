// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082 (the best performers; see SERIES.md "Numbers, 20 Nov").
// A made-up comedy sketch: dogs cannot talk. Hook: the premise as a question under 2 s; first frame shows the dog talking.

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
  w.ground = k.ground('#C9B08A', 0);
  w.room = group();
  box(40, 20, .5, mat('#BFD8E8'), [0, 10, -4], w.room);
  w.sofa = group([0, 0, -2]); box(5, 1, 2, mat('#E2853C'), [0, .9, 0], w.sofa); box(5, 1.8, .6, mat('#C96E2A'), [0, 2, -.8], w.sofa);
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.bubbles = group();
  for (let i = 0; i < 3; i++) { const s = ball(.4, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.bubbles); s.scale.set(1.5, 1, .3); s.userData.i = i; s.castShadow = false; }
  w.door = group([3.5, 0, -1]); box(2, 4, .3, mat('#8B5A2B'), [0, 2, 0], w.door); ball(.12, mat('#FFD21F'), [-.7, 2, .2], w.door);
  w.mail = group([0, 0, 0]); cyl(.7, .75, 2.6, mat('#2F5FA0'), [0, 1.3, 0], w.mail, 14); ball(.7, mat('#F2C9A0'), [0, 3.2, 0], w.mail); cyl(.75, .75, .25, mat('#1E3A6A'), [0, 3.75, 0], w.mail, 14);
  box(.9, .6, .2, mat('#FFFFFF'), [-.6, 2.0, .6], w.mail);
  w.tub = group([0, 0, 0]); const white = mat('#F4F7FA');
  box(3.6, 1.4, .2, white, [0, .7, 1.1], w.tub); box(3.6, 1.4, .2, white, [0, .7, -1.1], w.tub); for (const x of [-1.7, 1.7]) box(.2, 1.4, 2.4, white, [x, .7, 0], w.tub);
  box(3.4, .9, 2.0, mat('#9FD3EE', { rough: .1 }), [0, .5, 0], w.tub);
  for (let i = 0; i < 8; i++) ball(.25 + (i % 3) * .08, white, [-1.4 + i * .4, 1.35, Math.sin(i * 2) * .6], w.tub);
  w.phone = box(.12, .5, .28, mat('#1E2227'), [0, 0, 0], k.scene);
  w.tree = group([-1.8, 0, -1]); cyl(.35, .45, 3.5, mat('#6B4B2E'), [0, 1.75, 0], w.tree, 10); ball(1.6, mat('#2E8B4A'), [0, 4.2, 0], w.tree);
  w.stars = group();
  for (let i = 0; i < 5; i++) { const s = ball(.16, mat('#FFD21F', { glow: 1.8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  w.shoe = group([0, 0, 0]); box(.8, .3, .35, mat('#E2453C'), [0, 0, 0], w.shoe); box(.35, .3, .35, mat('#E2453C'), [.25, .25, 0], w.shoe);
  w.qm = group(); for (let i = 0; i < 3; i++) { const q = ball(.18, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], w.qm); q.userData.i = i; q.castShadow = false; }
  return w;
}

const pose = (w, x, y, z, ry) => { w.dg.position.set(x, y, z); w.dg.rotation.set(0, ry, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0); };
const bubbles = (w, x, y, z, t, on = true) => { w.bubbles.visible = on; w.bubbles.children.forEach(b => { const i = b.userData.i; b.position.set(x + i * .5, y + i * .55 + .08 * Math.sin(t * 6 + i), z); b.scale.set(1.5 * (1 - i * .25), 1 - i * .25, .3); }); };

export default {
  id: '145',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TALKING DOG',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'COULD TALK?'],
  title: 'What would happen if dogs could talk?',
  description: 'The mailman gets a daily argument. Bath time gets a lawyer. And the shoe stays a mystery. (A made-up talking dog.)',
  tags: ['whatif', 'funny', 'dog', 'talkingdog', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: talking dogs are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if dogs could talk?',
      show: ['ground', 'room', 'sofa', 'dg', 'bubbles'], sky: '#BFD8E8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.6, 10], look: [-.3, 3.3, 0], fov: 46, to: { pos: [0, 2.6, 9.2], look: [-.3, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, .4, .95, -1.6, 1.0); talk(w.d, t, t > .2); bubbles(w, -.6, 3.7, -1.0, t, t > .3); },
    },
    {
      say: 'The mailman? A daily argument.',
      show: ['ground', 'room', 'dg', 'door', 'mail', 'bubbles'], sky: '#BFD8E8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 3.4, 10], look: [1.2, 2.2, 0], fov: 48, to: { pos: [0, 3.3, 9.2], look: [1.2, 2.2, 0], fov: 46 } },
      update: (w, p, t) => {
        pose(w, -.6, 0, .5, Math.PI); w.d.body.position.y = .15 * Math.abs(Math.sin(t * 10)); talk(w.d, t);
        w.mail.position.set(3.4, 0, .4); w.mail.rotation.y = -Math.PI / 2 + .3 * Math.sin(t * 2); bubbles(w, .6, 2.6, .8, t);
      },
    },
    {
      say: 'Bath time? He calls his lawyer.',
      show: ['ground', 'room', 'tub', 'dg', 'phone'], sky: '#D8EEF0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, 3.6, 8.5], look: [0, 1.9, 0], fov: 46, to: { pos: [.3, 3.5, 7.8], look: [0, 1.9, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, .3, .2, 0, 1.0); w.bubbles.visible = false; talk(w.d, t); w.d.head.rotation.z = .15;
        const hp = new w.dg.position.constructor(-.1, .05, .62); w.d.head.localToWorld(hp); w.phone.position.copy(hp); w.phone.rotation.set(0, 1.0, .2);
      },
    },
    {
      say: 'Walks? A full review of every single tree.',
      show: ['ground', 'tree', 'dg', 'stars'], sky: '#9ED2F3', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [1.5, 2.8, 8], look: [-.6, 2.2, 0], fov: 48, to: { pos: [1.4, 2.7, 7.2], look: [-.6, 2.1, 0], fov: 46 } },
      update: (w, p, t) => {
        pose(w, .3, 0, 0, .45); talk(w.d, t, t > 1); w.d.head.rotation.z = t < 1 ? -.35 + .05 * Math.sin(t * 20) : 0;
        w.stars.visible = t > 1; w.stars.children.forEach(s => { const i = s.userData.i; s.visible = i < (t - 1) * 4; s.position.set(-1.6 + i * .45, 5.6 + .1 * Math.sin(t * 5 + i), .4); });
      },
    },
    {
      say: 'But he still will not explain the shoe.',
      show: ['ground', 'room', 'sofa', 'dg', 'shoe', 'qm'], sky: '#BFD8E8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.4, 8.5], look: [-.3, 2.15, 0], fov: 44, to: { pos: [0, 2.4, 7.8], look: [-.3, 2.1, 0], fov: 42 } },
      update: (w, p, t) => {
        pose(w, .3, 0, 0, 1.0); talk(w.d, t, false); w.d.head.rotation.x = .3 * Math.sin(t * 2);
        const hp = new w.dg.position.constructor(); w.d.mouth.getWorldPosition(hp); w.shoe.position.set(hp.x, hp.y - .05, hp.z); w.shoe.rotation.set(0, 1.0, 0);
        w.qm.children.forEach(q => { const s = (t * .7 + q.userData.i / 3) % 1; q.position.set(-1 + (q.userData.i - 1) * .5, 2.8 + s * 1.2, .2); q.scale.setScalar(1 - s * .5); });
      },
    },
    {
      say: 'A talking dog: fun, too loud, or awesome? Comment below.',
      quiz: { q: 'Would you want a talking dog?', options: ['Fun', 'Too loud', 'Awesome'], answer: 'Talking dogs are made up. Yours is still thinking it, though.' },
      show: ['ground', 'room', 'sofa', 'dg'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.4, .8, 6.5], look: [-.3, 3.4, 0], fov: 46, to: { pos: [-1, .8, 6.5], look: [-.3, 3.4, 0] } },
      update: (w, p, t) => { pose(w, .4, .95, -1.6, 1.0); talk(w.d, t, false); },
    },
  ],
};
