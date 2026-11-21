// Narrative 11: "What Would Happen If… (season 3, with Gary)". Premise from the top performers (pets, 081 dinosaurs as pets 1.7K).
// Hook: the premise as a question under 2 s; first frame shows a dog driving a red convertible, ears flapping.

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
function car(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  box(4.4, 1.1, 2.2, mat('#E2453C', { rough: .3 }), [0, 1.0, 0], c.body);
  box(2.4, 1.0, 2.0, mat('#E2453C', { rough: .3 }), [-.3, 2.0, 0], c.body);
  box(2.2, .8, 2.05, mat('#9FD3EE', { rough: .1 }), [-.3, 2.0, 0], c.body);
  c.wheels = [];
  for (const x of [-1.4, 1.4]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .35, mat('#222222'), [x, .5, z], c.body, 16); wh.rotation.x = Math.PI / 2; c.wheels.push(wh); }
  c.eyes = [-.6, .6].map(z => { const g = group([2.2, 1.25, z], c.body); ball(.33, mat('#FFFDE8', { glow: .6 }), [0, 0, 0], g); ball(.16, mat('#111111'), [.25, 0, 0], g); return g; });
  c.mouth = box(.1, .14, 1.0, mat('#3A3A3A'), [2.22, .75, 0], c.body);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 7, mat('#4A4A4A', { rough: 1 }), [0, .02, 0], w.road);
  for (let i = 0; i < 60; i++) box(2, .05, .25, mat('#F5F0D0'), [-200 + i * 7, .05, 0], w.road);
  w.trees = group(); for (let i = 0; i < 30; i++) { const x = -100 + i * 7; cyl(.35, .45, 2.6, mat('#6B4B2E'), [x, 1.3, -8], w.trees, 8); ball(1.6, mat('#2E8B4A'), [x, 3.5, -8], w.trees); }
  w.c = car(k, k.scene); w.cr = w.c.root;
  w.c.body.children[1].visible = false; w.c.body.children[2].visible = false;   // convertible: no roof, no glass
  w.d = dog(k, w.c.body); w.d.root.scale.setScalar(.75); w.d.root.position.set(-.3, .95, 0); w.d.root.rotation.y = Math.PI;
  w.d.legs.forEach(l => l.visible = false);
  w.wheel = cyl(.35, .35, .08, mat('#222222'), [.45, 1.8, 0], w.c.body, 20); w.wheel.rotation.z = Math.PI / 2 - .5;
  w.sq = group(); const brn = mat('#8B5A2B'); const sb = ball(.35, brn, [0, .4, 0], w.sq); sb.scale.set(1, 1.2, .9); ball(.25, brn, [.25, .85, 0], w.sq);
  const st = ball(.35, brn, [-.4, .8, 0], w.sq); st.scale.set(.6, 1.6, .6); for (const z of [-.1, .1]) ball(.05, mat('#111111'), [.45, .9, z], w.sq);
  w.sz = group(); for (let i = 0; i < 12; i++) { const s = cyl(.12, .12, .8, mat('#D9776A'), [0, 0, 0], w.sz, 10); s.rotation.z = Math.PI / 2; s.userData.i = i; s.castShadow = false; }
  w.shop = group(); box(5, 3.5, 4, mat('#F2D9B8'), [0, 1.75, 0], w.shop); box(5.4, .5, 4.4, mat('#E2453C'), [0, 3.75, 0], w.shop);
  box(1.8, 1.2, .1, mat('#333333'), [0, 1.8, 2.02], w.shop); box(2.6, .9, .1, mat('#FFD21F', { glow: .3 }), [0, 4.6, 2], w.shop);
  w.vet = group(); box(6, 4, 4, mat('#FFFFFF'), [0, 2, 0], w.vet); box(6.4, .4, 4.4, mat('#7FB3E0'), [0, 4.2, 0], w.vet);
  box(1.6, .45, .1, mat('#E2453C', { glow: .3 }), [0, 3, 2.02], w.vet); box(.45, 1.6, .1, mat('#E2453C', { glow: .3 }), [0, 3, 2.03], w.vet);
  box(1.2, 2, .1, mat('#8B5A2B'), [0, 1, 2.02], w.vet);
  w.dust = group(); for (let i = 0; i < 8; i++) { const d = ball(.4, mat('#D8CFC0'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  return w;
}

const drive = (w, x, z, ry, t, ears = true) => {
  w.cr.position.set(x, 0, z); w.cr.rotation.set(0, ry, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.position.y = .04 * Math.sin(t * 20);
  w.d.ears.forEach((e, i) => { e.rotation.x = (i ? 1 : -1) * (ears ? .3 + .9 * Math.abs(Math.sin(t * 12 + i)) : .3); });
  w.d.mouth.scale.y = 1 + 2 * Math.abs(Math.sin(t * 5)); w.d.tail.rotation.x = .7 * Math.sin(t * 15);
};
const dust = (w, x, z, t) => w.dust.children.forEach(d => { const q = (t * 1.2 + d.userData.i / 8) % 1; d.position.set(x - 2.6 - q * 3, .4 + q * .8, z + (d.userData.i % 3 - 1) * .6); d.scale.setScalar(.5 + q); });

export default {
  id: '166',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DOGS DRIVING',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOGS', 'COULD DRIVE?'],
  title: 'What would happen if dogs could drive?',
  description: 'Every squirrel is a sharp turn. The drive-through order is all sausages. Parking takes three circles. And the vet? Never. (A comedy what-if.)',
  tags: ['whatif', 'dogs', 'funny', 'driving', 'pets', 'shorts'],
  sources: [
    'Comedy what-if. Dogs circling before lying down is a widely described dog behaviour (e.g. American Kennel Club, "Why Do Dogs Circle Before They Lie Down?").',
  ],
  setup,
  scenes: [
    {
      say: 'What if dogs could drive?',
      show: ['ground', 'road', 'trees', 'cr'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [8, 3, 7], look: [.5, 2.9, 0], fov: 46, to: { pos: [7.5, 3, 6.5], look: [1, 2.9, 0], fov: 44 } },
      update: (w, p, t) => { drive(w, t * .8, 0, 0, t); dust(w, w.cr.position.x, 0, t); },
    },
    {
      say: 'Every squirrel? A sudden left turn.',
      show: ['ground', 'road', 'trees', 'cr', 'sq', 'dust'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [1, 11, 13], look: [1, 2.5, -2], fov: 54, to: { pos: [1, 11, 12], look: [1.5, 2.5, -2], fov: 52 } },
      update: (w, p, t) => {
        const turn = Math.min(1, Math.max(0, (t - .7) * 1.5));
        drive(w, -4 + t * 2.5, -turn * 2.5, turn * .9, t); dust(w, w.cr.position.x, w.cr.position.z, t);
        w.sq.position.set(2.5, 0, -5); w.sq.scale.setScalar(2); w.sq.rotation.set(0, Math.PI / 2 + .3, 0); w.sq.position.y = .3 * Math.abs(Math.sin(t * 8));
      },
    },
    {
      say: 'The drive-through? Forty sausages, please.',
      show: ['ground', 'road', 'cr', 'shop', 'sz'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [6, 3.2, 9], look: [0, 2.6, 0], fov: 48, to: { pos: [5.5, 3.2, 8], look: [0, 2.6, 0], fov: 46 } },
      update: (w, p, t) => {
        w.shop.position.set(0, 0, -4.6); drive(w, 0, 0, 0, t, false);
        w.sz.children.forEach(s => { const i = s.userData.i, q = (t * .9 + i / 12) % 1; s.position.set(-.3 + .2 * Math.sin(i * 3), 3.8 - q * 1.8 + 1.2 * Math.sin(q * Math.PI), -2.6 + q * 2.4); s.rotation.y = i + t * 3; });
      },
    },
    {
      say: 'Parking? Three full circles first. Every time.',
      show: ['ground', 'road', 'trees', 'cr'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [0, 16, 11], look: [0, 1.5, 0], fov: 46, to: { pos: [0, 15, 10], look: [0, 1.5, 0], fov: 44 } },
      update: (w, p, t) => { const a = t * 3.2; drive(w, 3 * Math.sin(a), 3 * Math.cos(a) - 1, a + Math.PI, t); w.dust.children.forEach(d => { const q = (t + d.userData.i / 8) % 1, b = a - 1 - q; d.position.set(3 * Math.sin(b), .3 + q * .5, 3 * Math.cos(b) - 1); d.scale.setScalar(.5 + q); }); },
    },
    {
      say: 'But the vet? He drives right past it. Every time.',
      show: ['ground', 'road', 'trees', 'cr', 'vet', 'dust'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 22,
      cam: { pos: [2, 3.5, 14], look: [0, 2.8, 0], fov: 50, to: { pos: [2, 3.5, 13], look: [0, 2.8, 0], fov: 48 } },
      shake: (t) => .05,
      update: (w, p, t) => { w.vet.position.set(0, 0, -6); drive(w, -10 + t * 6, 0, 0, t); dust(w, w.cr.position.x, 0, t); },
    },
    {
      say: 'A driving dog: fun, a menace, or a very good boy? Comment below.',
      quiz: { q: 'Would you ride with a driving dog?', options: ['Fun', 'A menace', 'Very good boy'], answer: 'Dogs cannot drive. Yet. Keep your keys hidden.' },
      show: ['ground', 'road', 'trees', 'cr'], sky: '#F2A65A', lightAt: [0, 2, 0], lightDist: 20,
      cam: { pos: [7, 2.4, 6], look: [0, 2.6, 0], fov: 44, to: { pos: [-7, 2.4, 6], look: [0, 2.6, 0] } },
      update: (w, p, t) => { drive(w, 0, 0, 0, t, false); },
    },
  ],
};
