// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082 (big, silly, relatable chaos like 080 everyone flies).
// A made-up comedy sketch: gravity does not flip. Hook: the premise as a question under 2 s; first frame shows a person stuck to the ceiling.

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

function cat(k, parent, color = '#F2994A') {
  const { mat, box, ball, cone, cyl, group } = k;
  const fur = mat(color, { rough: .8 });
  const c = { root: group([0, 0, 0], parent) };
  const b = ball(.7, fur, [0, .55, 0], c.root); b.scale.set(1.4, .75, .9);
  c.head = group([.95, 1.05, 0], c.root);
  ball(.5, fur, [0, 0, 0], c.head);
  for (const z of [-.25, .25]) { cone(.15, .32, fur, [0, .48, z], c.head, 4); ball(.1, mat('#B8F27A', { glow: .6 }), [.4, .08, z * .8], c.head); ball(.05, mat('#111111'), [.48, .08, z * .8], c.head); }
  ball(.06, mat('#FF8FA3'), [.5, -.06, 0], c.head);
  c.tail = cyl(.08, .06, 1.1, fur, [-1.0, 1.0, 0], c.root, 6); c.tail.rotation.z = .6;
  c.crown = group([0, .55, 0], c.head); cyl(.32, .28, .25, mat('#FFD21F', { glow: .6 }), [0, 0, 0], c.crown, 8);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.07, .2, mat('#FFD21F', { glow: .6 }), [Math.cos(a) * .27, .2, Math.sin(a) * .27], c.crown, 4); }
  return c;
}


function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}
const CEIL = 7;

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B08A', 0);
  w.room = group(); box(40, 20, .5, mat('#F6E3C2'), [0, 10, -4], w.room);
  box(40, .4, 10, mat('#EDEDED'), [0, CEIL + .2, 0], w.room).castShadow = false;
  w.lamp = group([2.5, 0, -2], w.room); box(.15, 2, .15, mat('#333333'), [0, CEIL - 1, 0], w.lamp); cone(.6, .6, mat('#FFD21F', { glow: .8 }), [0, CEIL - 2.2, 0], w.lamp, 12);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.bowl = group([0, 0, 0]); cyl(.45, .3, .35, mat('#E2453C'), [0, 0, 0], w.bowl, 16);
  w.cereal = group(); for (let i = 0; i < 14; i++) { const c = k.torus(.09, .035, mat(['#FFD21F', '#F97316', '#E2453C'][i % 3]), [0, 0, 0], w.cereal); c.userData.i = i; }
  w.milk = group(); for (let i = 0; i < 6; i++) { const m = ball(.12, mat('#FFFFFF'), [0, 0, 0], w.milk); m.userData.i = i; }
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.park = group(); for (let i = 0; i < 4; i++) { cyl(.35, .45, 3, mat('#6B4B2E'), [-6 + i * 4, 1.5, -3], w.park, 8); ball(1.5, mat('#2E8B4A'), [-6 + i * 4, 3.8, -3], w.park); }
  w.rain = group(); for (let i = 0; i < 30; i++) { const r = cyl(.04, .04, .35, mat('#5DB8F5', { glow: .6 }), [0, 0, 0], w.rain, 6); r.userData.i = i; r.castShadow = false; }
  w.umb = group([0, 0, 0]); cyl(.04, .04, 1.4, mat('#333333'), [0, -.7, 0], w.umb, 6); const can = cone(1.1, .6, mat('#E2453C'), [0, 0, 0], w.umb, 12);
  w.c = cat(k, k.scene); w.ct = w.c.root; w.c.crown.visible = false;
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.25, .25, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  return w;
}

const flip = (o, x, y, z, ry = 0) => { o.position.set(x, y, z); o.rotation.set(0, ry, Math.PI); };

export default {
  id: '149',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE UPSIDE-DOWN DAY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF', 'GRAVITY FLIPPED?'],
  title: 'What would happen if gravity flipped?',
  description: 'Breakfast on the ceiling. Dogs become balloons. Rain falls up. And the cat does not care at all. (A made-up upside-down day.)',
  tags: ['whatif', 'funny', 'gravity', 'upsidedown', 'cat', 'shorts'],
  sources: [
    'Comedy sketch: gravity does not flip; this is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if gravity flipped?',
      show: ['ground', 'room', 'pp'], sky: '#F6E3C2', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [.6, 2.6, 11], look: [0, 3.9, 0], fov: 50, to: { pos: [.5, 2.6, 10.2], look: [0, 3.9, 0], fov: 48 } },
      update: (w, p, t) => { const q = Math.min(1, t / .5); flip(w.pp, 0, CEIL * q + (1 - q) * 0, 0, .2); w.pp.rotation.z = Math.PI * q; w.p.mouth.scale.y = 1 + 2 * q; w.pp.position.y = q < 1 ? 3 * q : CEIL; },
    },
    {
      say: 'Breakfast? It is on the ceiling now.',
      show: ['ground', 'room', 'pp', 'bowl', 'cereal', 'milk'], sky: '#F6E3C2', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [0, 3.4, 9.5], look: [-.4, 4.8, 0], fov: 50, to: { pos: [0, 3.4, 8.7], look: [-.4, 4.8, 0], fov: 48 } },
      update: (w, p, t) => {
        flip(w.pp, -1.6, CEIL, 0, .4); flip(w.bowl, .8, CEIL - .2, .4);
        w.cereal.children.forEach(c => { const i = c.userData.i; const q = Math.min(1, ((t * .8) + i * .05) % 1.2); c.position.set(.8 + Math.sin(i * 2.4) * .5, 3 + q * (CEIL - 3.3), .4 + Math.cos(i * 2.4) * .4); c.rotation.set(t * 3 + i, i, 0); });
        w.milk.children.forEach(m => { const i = m.userData.i; const q = ((t * .6) + i / 6) % 1; m.position.set(.6 + i * .1, 2.6 + q * (CEIL - 2.9), .3); m.scale.setScalar(1 + q * .6); });
      },
    },
    {
      say: 'Dogs? Basically balloons with legs.',
      show: ['ground', 'park', 'dg'], sky: '#9ED2F3', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [.6, 3.2, 9], look: [0, 4.4, 0], fov: 48, to: { pos: [.5, 3.3, 8.2], look: [0, 4.6, 0], fov: 46 } },
      update: (w, p, t) => {
        w.dg.position.set(.3, 2.8 + t * .6 + .2 * Math.sin(t * 2), 0); w.dg.rotation.set(.2 * Math.sin(t * 1.5), 1.0, .25 * Math.sin(t * 1.2));
        w.d.legs.forEach((l, i) => { l.rotation.x = .7 * Math.sin(t * 16 + i * 1.6); }); talk(w.d, t, false); w.d.mouth.scale.y = 3;
      },
    },
    {
      say: 'Rain? It falls up. Umbrellas are useless.',
      show: ['ground', 'park', 'pp', 'umb', 'rain'], sky: '#7C93A8', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [.6, 3, 9], look: [0, 3.2, 0], fov: 48, to: { pos: [.5, 3, 8.2], look: [0, 3.2, 0], fov: 46 } },
      update: (w, p, t) => {
        w.pp.position.set(0, 0, 0); w.pp.rotation.set(0, .3, 0); w.p.mouth.scale.y = 1.6;
        w.umb.position.set(.5, 5.2, .4); w.umb.rotation.set(0, 0, .15);
        w.rain.children.forEach(r => { const i = r.userData.i; const q = ((t * .9) + i / 30) % 1; r.position.set(-3 + (i * 1.37) % 6, q * 9, -1 + (i * .73) % 3); });
      },
    },
    {
      say: 'And the cat? Still asleep. On the ceiling. Unbothered.',
      show: ['ground', 'room', 'ct', 'zz'], sky: '#F6E3C2', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [.4, 3.6, 7.5], look: [0, 5.2, 0], fov: 46, to: { pos: [.3, 3.6, 6.8], look: [0, 5.3, 0], fov: 44 } },
      update: (w, p, t) => {
        flip(w.ct, -.3, CEIL, 0, 1.25); w.c.tail.rotation.x = .2 * Math.sin(t * 1.5); w.c.head.rotation.z = .05 * Math.sin(t);
        w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(.6 + q * .6, CEIL - .9 - q * 1.4, .2); z.scale.setScalar(.6 + q); z.rotation.z = .5; });
      },
    },
    {
      say: 'Flipped gravity: fun, great, or a nightmare? Comment below.',
      quiz: { q: 'One day of flipped gravity would be…', options: ['Fun', 'Great', 'A nightmare'], answer: 'Gravity is not flipping. This day is made up.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [.6, 1.4, 9.5], look: [0, 5.6, 0], fov: 48, to: { pos: [-1, 1.4, 9.5], look: [0, 5.6, 0] } },
      update: (w, p, t) => { flip(w.pp, 0, CEIL, 0, .2); w.p.mouth.scale.y = 1.5; },
    },
  ],
};
