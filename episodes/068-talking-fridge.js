// Narrative 5: "What Would Happen If…". A made-up comedy sketch: fridges cannot talk (or text your mom).
// Hook rule: the premise as a question under 2 s, first frame already showing a fridge with a face, mouth moving, eyebrows raised.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = group();
  for (let i = 0; i < 10; i++) for (let j = 0; j < 8; j++) box(3.9, .05, 3.9, mat((i + j) % 2 ? '#F4F1E8' : '#3A3F4A'), [-18 + i * 4, .03, -10 + j * 4], w.floor).castShadow = false;
  w.ground = k.ground('#C9B79C', 0);
  w.kitchen = group();
  box(60, 18, .5, mat('#F2D9B8'), [0, 9, -8], w.kitchen);
  box(14, 4, 4, mat('#6B8F71'), [-12, 2, -6], w.kitchen); box(14.4, .4, 4.4, mat('#E8E8E8'), [-12, 4.2, -6], w.kitchen);
  box(10, 4, 4, mat('#6B8F71'), [12, 2, -6], w.kitchen); box(10.4, .4, 4.4, mat('#E8E8E8'), [12, 4.2, -6], w.kitchen);
  for (let i = 0; i < 3; i++) box(3.6, 3, .2, mat('#7A9E7E'), [-16 + i * 4, 10, -7.6], w.kitchen);
  // the fridge, with a face on the freezer door
  w.fridge = group([0, 0, -5]);
  box(6, 13, 5, mat('#E8EEF2', { metal: .3, rough: .25 }), [0, 6.5, 0], w.fridge);
  w.inside = group([0, 0, 2.52], w.fridge);
  box(5.6, 8.4, .05, mat('#FFF6C9', { glow: 1.2 }), [0, 4.5, 0], w.inside);
  for (const y of [2.6, 5.2]) box(5.4, .15, 2.2, mat('#DDE7EE', { opacity: .7 }), [0, y, 1.1], w.inside);
  w.cake = group([-1, 5.3, 1.1], w.inside);
  cyl(1.1, 1.1, .9, mat('#8B5A2B'), [0, .45, 0], w.cake, 24); cyl(1.15, 1.15, .3, mat('#FF9EC4'), [0, 1, 0], w.cake, 24); ball(.22, mat('#E0161E'), [0, 1.3, 0], w.cake);
  w.pizza = group([1.2, 2.7, 1.1], w.inside);
  const sl = cone(1.2, .2, mat('#F2C14E'), [0, .1, 0], w.pizza, 3); sl.scale.set(1, 1, 1.6);
  for (const [x, z] of [[.2, .2], [-.3, -.2], [.1, -.5]]) cyl(.18, .18, .06, mat('#C0392B'), [x, .22, z], w.pizza, 10);
  w.door = group([3, 0, 2.5], w.fridge);
  box(6, 8.6, .4, mat('#F4F7F9', { metal: .3, rough: .25 }), [-3, 4.5, .2], w.door);
  box(.3, 3, .4, mat('#9AA3AE', { metal: .7 }), [-5.4, 5.5, .6], w.door);
  w.screen = box(2.6, 1.8, .1, mat('#0B1A2A', { glow: .2 }), [-2.6, 6.2, .45], w.door);
  w.bubbles = group([-2.6, 6.2, .52], w.door);
  for (let i = 0; i < 3; i++) box(1.6 - (i % 2) * .5, .35, .02, mat(i % 2 ? '#22C55E' : '#5BC0EB', { glow: 1 }), [(i % 2 ? .3 : -.2), .5 - i * .5, 0], w.bubbles);
  w.lock = group([-5.4, 4.2, .9], w.door);
  const shackle = k.torus(.45, .1, mat('#E8C547', { metal: .9, rough: .2 }), [0, .5, 0], w.lock); shackle.rotation.x = 0;
  box(1, .9, .4, mat('#E8C547', { metal: .9, rough: .2 }), [0, 0, 0], w.lock);
  w.chain = group([-3.3, 4.5, .55], w.door);
  for (let i = 0; i < 8; i++) { const l = k.torus(.3, .07, mat('#9AA3AE', { metal: .9 }), [-2.6 + i * .7, 0, 0], w.chain); l.rotation.x = 0; l.rotation.y = i % 2 ? Math.PI / 2 : 0; }
  // the face: on the freezer door above
  w.face = group([0, 11, 2.6], w.fridge);
  w.eyes = [-1.2, 1.2].map(x => { const g = group([x, .4, 0], w.face); ball(.65, mat('#FFFFFF'), [0, 0, 0], g); ball(.3, mat('#111111'), [0, 0, .45], g); return g; });
  w.brows = [-1.2, 1.2].map(x => box(1.2, .2, .15, mat('#2A2F3A'), [x, 1.3, .3], w.face));
  w.mouth = box(2, .3, .15, mat('#2A2F3A'), [0, -.9, .3], w.face);
  w.crumbs = group([0, -1.2, .6], w.face);
  for (let i = 0; i < 10; i++) { const c = box(.2, .2, .2, mat(i % 2 ? '#F2C14E' : '#8B5A2B'), [0, 0, 0], w.crumbs); c.userData = { a: i * .63, ph: i * .1 }; c.castShadow = false; }
  // you, in pyjamas
  w.you = group([4.5, 0, 5]);
  cyl(1, 1.15, 3.6, mat('#7FB2E5'), [0, 3.6, 0], w.you, 18);
  for (let i = 0; i < 4; i++) cyl(1.02, 1.05, .25, mat('#FFFFFF'), [0, 2.2 + i * .9, 0], w.you, 18).castShadow = false;
  ball(1.05, mat('#F2C9A0'), [0, 6.3, 0], w.you);
  w.yeyes = [-.38, .38].map(x => ball(.16, mat('#111111'), [x, 6.5, .95], w.you));
  for (const x of [-.45, .45]) cyl(.3, .3, 1.8, mat('#7FB2E5'), [x, .9, 0], w.you, 10);
  w.dark = box(60, 30, .2, mat('#0A0F1E', { opacity: .5 }), [0, 10, 6.5]); w.dark.castShadow = false;
  return w;
}

function face(w, t, o = {}) {
  const talk = o.talk ?? true;
  w.mouth.scale.set(o.wide ? 1.4 : 1, talk ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1, 1);
  w.brows.forEach((b, i) => { b.rotation.z = (i ? -1 : 1) * (o.brow ?? 0); b.position.y = 1.3 + (o.raise ?? 0); });
  w.eyes.forEach(e => { e.children[1].position.x = o.look ?? 0; e.scale.y = (t % 2.7) < .1 ? .15 : 1; });
}
function door(w, a) { w.door.rotation.y = a; w.inside.visible = a > .05; }
function base(w) { w.lock.visible = false; w.chain.visible = false; w.bubbles.visible = false; w.screen.material.emissiveIntensity = .2; w.crumbs.visible = false; w.pizza.visible = true; w.cake.visible = true; w.pizza.scale.setScalar(1); }
const ALL = ['ground', 'floor', 'kitchen', 'fridge'];

export default {
  id: '068',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TALKING FRIDGE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF FRIDGES', 'COULD TALK?'],
  title: 'What would happen if your fridge could talk?',
  description: 'It sees every midnight snack. It remembers every one. And it has your mom\'s number. (A made-up talking fridge.)',
  tags: ['whatif', 'funny', 'fridge', 'midnightsnack', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the talking fridge is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if fridges could talk?',
      show: ALL, sky: '#F2D9B8', lightAt: [0, 6, -3], lightDist: 20,
      cam: { pos: [7, 6, 25], look: [0, 15, -3], fov: 48, to: { pos: [6, 6, 22], look: [0, 15, -3], fov: 46 } },
      update: (w, p, t) => { base(w); door(w, 0); face(w, t, { raise: .2 * Math.sin(t * 5) }); },
    },
    {
      say: 'Midnight snack? It judges you.',
      show: [...ALL, 'you', 'dark'], sky: '#0A0F1E', lightAt: [2, 5, 0], lightDist: 16,
      cam: { pos: [-11, 10, 16], look: [0, 7, -2], fov: 50, to: { pos: [-10, 10, 14.5], look: [0, 7, -2], fov: 48 } },
      update: (w, p, t, k) => { base(w); w.you.position.set(-1.2, 0, 6); w.you.rotation.y = Math.PI; door(w, 1.6 * k.h.ease(Math.min(1, t / .6))); face(w, t, { talk: t > .8, raise: .5, look: .15 }); },
    },
    {
      say: 'It locks up the cake.',
      show: [...ALL, 'you', 'dark'], sky: '#0A0F1E', lightAt: [0, 5, 0], lightDist: 14,
      cam: { pos: [6, 8.5, 16], look: [0, 7.5, -2], fov: 46, to: { pos: [5.5, 8.3, 14.5], look: [0, 7.5, -2], fov: 44 } },
      shake: (t) => t < .3 ? .25 : 0,
      update: (w, p, t) => { base(w); w.you.position.set(6, 0, 4); w.you.rotation.y = -.9; door(w, 0); w.lock.visible = true; w.chain.visible = true; face(w, t, { brow: .5, talk: false }); },
    },
    {
      say: 'Then it texts your mom.',
      show: [...ALL, 'you', 'dark'], sky: '#0A0F1E', lightAt: [0, 6, 0], lightDist: 14,
      cam: { pos: [2, 7.5, 8], look: [0, 6.6, -2], fov: 42, to: { pos: [1.8, 7.3, 6.8], look: [0, 6.5, -2], fov: 40 } },
      update: (w, p, t) => {
        base(w); w.you.position.set(6, 0, 4); door(w, 0); w.lock.visible = true; w.chain.visible = true;
        w.screen.material.emissiveIntensity = 1; w.bubbles.visible = true; w.bubbles.children.forEach((b, i) => { b.visible = t > .3 + i * .45; });
        face(w, t, { talk: false, brow: -.3, look: .3 });
      },
    },
    {
      say: 'And at three a.m., it eats the leftovers itself.',
      show: [...ALL, 'dark'], sky: '#0A0F1E', lightAt: [0, 9, 0], lightDist: 14,
      cam: { pos: [5, 10, 14], look: [0, 10, -2], fov: 46, to: { pos: [4.5, 10, 12], look: [0, 10.2, -2], fov: 44 } },
      update: (w, p, t) => {
        base(w); door(w, 0); w.crumbs.visible = true;
        w.crumbs.children.forEach(c => { const u = c.userData, f = (t * 1.5 + u.ph) % 1; c.position.set(Math.cos(u.a) * f * 3, -f * f * 6 + f * 1.5, .5 + f); c.rotation.set(t * 8, u.a, 0); });
        face(w, t, { wide: true, raise: .3 });
        w.mouth.scale.y = 1 + 3 * Math.abs(Math.sin(t * 9));
      },
    },
    {
      say: 'Talking fridge: helpful, mean, or a snitch? Comment below.',
      quiz: { q: 'What would a talking fridge be?', options: ['Helpful', 'Mean', 'A snitch'], answer: 'It is a made-up fridge, but it would definitely be a snitch.' },
      show: ALL, sky: '#274B73', lightAt: [0, 6, -3], lightDist: 20,
      cam: { pos: [12, 3, 20], look: [0, 15, -3], fov: 46, to: { pos: [-10, 3, 20], look: [0, 15, -3] } },
      update: (w, p, t) => { base(w); door(w, 0); face(w, t, { raise: .2 * Math.sin(t * 5) }); },
    },
  ],
};
