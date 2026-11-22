// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: pizzas do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the pizza with a face.

function pizza(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  cyl(3, 3, .5, mat('#D9A35B', { rough: .8 }), [0, .25, 0], p.body, 32);
  cyl(2.7, 2.7, .1, mat('#D9402E', { rough: .6 }), [0, .52, 0], p.body, 32);
  cyl(2.6, 2.6, .08, mat('#F7D774', { rough: .5 }), [0, .58, 0], p.body, 32);
  p.toppings = group([0, 0, 0], p.body); for (let i = 0; i < 9; i++) { const a = i * 2.4, r = .8 + (i % 3) * .55; cyl(.32, .32, .08, mat('#B3262E'), [Math.cos(a) * r, .65, Math.sin(a) * r], p.toppings, 14); }
  p.pine = group([0, 0, 0], p.body); for (let i = 0; i < 7; i++) { const a = i * 1.9 + .5, r = .6 + (i % 3) * .6; const c = box(.35, .2, .35, mat('#FFE45C'), [Math.cos(a) * r, .7, Math.sin(a) * r], p.pine); c.rotation.y = i; } p.pine.visible = false;
  p.cuts = group([0, 0, 0], p.body); for (let i = 0; i < 4; i++) { const c = box(6.1, .7, .06, mat('#8A5A2B'), [0, .35, 0], p.cuts); c.rotation.y = i * Math.PI / 4; } p.cuts.visible = false;
  p.face = group([0, .55, 3.02], p.body);
  for (const x of [-.6, .6]) { ball(.3, mat('#FFFFFF'), [x, .55, 0], p.face); ball(.15, mat('#111111'), [x, .55, .2], p.face); }
  p.brows = [-.6, .6].map(x => box(.45, .07, .05, mat('#111111'), [x, .98, .04], p.face));
  p.mouth = box(.6, .1, .05, mat('#5A1E1E'), [0, -.05, .02], p.face);
  return p;
}
function talk(p, t, on = true) { p.mouth.scale.y = on ? 1 + 2.2 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(p, a) { p.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.table = k.ground('#C79A6B', 0);
  w.wall = box(60, 30, .5, mat('#F3E0C7'), [0, 15, -6]); w.wall.castShadow = false;
  w.p = pizza(k, k.scene); w.pz = w.p.root;
  w.cutter = group(); const wheel = cyl(.7, .7, .1, mat('#C0C8D0', { metal: .8, rough: .2 }), [0, 0, 0], w.cutter, 24); wheel.rotation.x = Math.PI / 2; const hd = cyl(.15, .15, 2.4, mat('#E2453C'), [1.2, 1, 0], w.cutter, 8); hd.rotation.z = -.9;
  w.dropper = group(); for (let i = 0; i < 6; i++) { const c = box(.35, .2, .35, mat('#FFE45C'), [0, 0, 0], w.dropper); c.userData.i = i; }
  w.sun = ball(1, mat('#FFD21F', { glow: 1 }), [-5, 9, -5.5]); w.sun.castShadow = false;
  w.fridge = group(); box(7, .1, 7, mat('#CFE3F0', { glow: .2 }), [0, 0, 0], w.fridge);
  w.frost = group(); for (let i = 0; i < 12; i++) { const f = ball(.08, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.frost); f.userData.i = i; f.castShadow = false; }
  w.oven = group(); box(10, 7, .4, mat('#2A2A2A'), [0, 3.5, -3], w.oven); box(10, .4, 6, mat('#2A2A2A'), [0, 7, 0], w.oven); for (const x of [-5, 5]) box(.4, 7, 6, mat('#2A2A2A'), [x, 3.5, 0], w.oven); box(10, .2, 6, mat('#555555'), [0, -.1, 0], w.oven);
  w.coals = group(); for (let i = 0; i < 8; i++) { const c = ball(.35, mat('#FF7A1A', { glow: 1 }), [-4 + i * 1.1, .3, -2.4], w.coals); c.castShadow = false; }
  return w;
}

const place = (w, x, y, z, t, on = true) => { w.pz.position.set(x, y, z); w.pz.rotation.set(0, 0, 0); w.p.body.position.set(0, 0, 0); w.p.cuts.visible = false; w.p.pine.visible = false; talk(w.p, t, on); };

export default {
  id: '220',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PIZZA',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS PIZZA', 'HAS A COMPLAINT'],
  title: 'This pizza has a complaint',
  description: 'Cut into eight pieces without asking. Pineapple dumped on top. Then eaten cold for breakfast. So the pizza found somewhere warm. (A made-up comedy sketch.)',
  tags: ['funny', 'pizza', 'food', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: the "Hawaiian" pizza with pineapple was created in Canada, credited to restaurateur Sam Panopoulos in 1962 (BBC News, "Hawaiian pizza inventor Sam Panopoulos dies", 2017).',
  ],
  setup,
  scenes: [
    {
      say: 'This pizza has a complaint.',
      show: ['table', 'wall', 'pz'], sky: '#F3E0C7', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 2.4, 13], look: [0, .95, 0], fov: 46, to: { pos: [1, 2.4, 12.2], look: [0, .95, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); grump(w.p, .35); },
    },
    {
      say: 'First, he gets cut. Eight times.',
      show: ['table', 'wall', 'pz', 'cutter'], sky: '#F3E0C7', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 7, 8], look: [0, .6, 0], fov: 46, to: { pos: [1, 6.6, 7.4], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); grump(w.p, .6); w.p.mouth.scale.y = 2.6; w.p.cuts.visible = true; w.p.cuts.children.forEach((c, i) => c.visible = i < 1 + t * 2.4); const a = Math.floor(t * 2.4) * Math.PI / 4; const s = (t * 2.4 % 1) * 6 - 3; w.cutter.position.set(Math.cos(a) * s, 1.3, -Math.sin(a) * s); w.cutter.rotation.y = a; },
    },
    {
      say: 'Then someone adds pineapple.',
      show: ['table', 'wall', 'pz', 'dropper'], sky: '#F3E0C7', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 3, 13.5], look: [0, .9, 0], fov: 48, to: { pos: [1, 3, 12.7], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); w.p.cuts.visible = true; w.p.pine.visible = p > .5; grump(w.p, -.35); w.p.mouth.scale.y = 3; w.dropper.children.forEach(c => { const i = c.userData.i, q = (t * 1.2 + i / 6) % 1; c.position.set(-1.6 + i * .65, 5 - q * 4.3, -.5 + (i % 2)); c.rotation.set(t * 3 + i, i, 0); }); },
    },
    {
      say: 'And the next morning? Eaten cold.',
      show: ['table', 'wall', 'pz', 'sun', 'frost'], sky: '#CFE7F7', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 2.4, 13], look: [0, .5, 0], fov: 46, to: { pos: [1, 2.4, 12.2], look: [0, .5, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); w.p.cuts.visible = true; w.p.pine.visible = true; grump(w.p, .6); w.pz.position.x = .04 * Math.sin(t * 40); w.frost.children.forEach(f => { const i = f.userData.i, q = (t * .4 + i / 12) % 1; f.position.set(-3 + (i % 6) * 1.2, 4 - q * 3.4, -.5 + (i % 3) * .5); }); },
    },
    {
      say: 'So now he lives in the oven. Toasty.',
      show: ['pz', 'oven', 'coals'], sky: '#3A2A20', lightAt: [0, 6, 4], lightDist: 20,
      cam: { pos: [1, 2.6, 13], look: [0, .9, 0], fov: 48, to: { pos: [1, 2.6, 12.2], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t, false); w.p.cuts.visible = false; w.p.mouth.scale.y = 1.6; grump(w.p, -.35); w.pz.rotation.z = .03 * Math.sin(t * 2); w.coals.children.forEach((c, i) => c.scale.setScalar(1 + .2 * Math.sin(t * 6 + i))); },
    },
    {
      say: 'Grumpy pizza: eat it, warm it, or let it go? Comment below.',
      quiz: { q: 'What do you do with the grumpy pizza?', options: ['Eat it', 'Warm it', 'Let it go'], answer: 'Fun fact: pineapple pizza was invented in Canada, not Hawaii, in 1962.' },
      show: ['table', 'wall', 'pz'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [8, 3.4, 10], look: [0, .8, 0], fov: 46, to: { pos: [-8, 3.4, 10], look: [0, .8, 0] } },
      update: (w, p, t) => { place(w, 0, 0, 0, t, false); grump(w.p, -.2); },
    },
  ],
};
