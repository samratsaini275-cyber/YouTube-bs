// Narrative 11: "What Would Happen If… (season 3, with Gary)". Everyday-thing-comes-alive premise like "trees could walk" and "homework did itself" (1.1K each).
// Hook: the premise as a question under 2 s; first frame shows a bed with eyes on the headboard striding down a street, a sleeper still in it.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function bed(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 2.2, 0], b.root);
  box(6.4, .6, 3.6, mat('#8B5A2B'), [0, 0, 0], b.body);
  box(6, .6, 3.3, mat('#FFFFFF'), [0, .55, 0], b.body);
  b.blanket = box(4.2, .3, 3.5, mat('#3B82F6'), [-.9, .95, 0], b.body);
  box(1.2, .4, 2.6, mat('#F3F3F3'), [2.4, 1.05, 0], b.body);
  b.head = group([3.2, 1.4, 0], b.body); box(.4, 3, 3.6, mat('#8B5A2B'), [0, 0, 0], b.head);
  b.eyes = [-.8, .8].map(z => { const g = group([.22, .5, z], b.head); ball(.42, mat('#FFFFFF'), [0, 0, 0], g); ball(.2, mat('#111111'), [.3, 0, 0], g); return g; });
  b.mouth = box(.1, .2, 1.2, mat('#3A2414'), [.22, -.5, 0], b.head);
  b.legs = []; for (const x of [-2.8, 2.8]) for (const z of [-1.5, 1.5]) { const l = group([x, 0, z], b.body); cyl(.22, .18, 2.2, mat('#6B4423'), [0, -1.1, 0], l, 8); ball(.3, mat('#6B4423'), [0, -2.2, 0], l); b.legs.push(l); }
  return b;
}
function walk(b, t, sp = 8, on = true) { b.legs.forEach((l, i) => { l.rotation.z = on ? .45 * Math.sin(t * sp + (i === 0 || i === 3 ? 0 : Math.PI)) : 0; }); b.body.position.y = 2.2 + (on ? .15 * Math.abs(Math.sin(t * sp)) : 0); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 8, mat('#555555', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 50; i++) box(2, .05, .25, mat('#F5F0D0'), [-150 + i * 6, .05, 0], w.road);
  w.houses = group(); for (let i = 0; i < 8; i++) { const x = -30 + i * 9; box(6, 5, 5, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9'][i % 4]), [x, 2.5, -10], w.houses); const r = cone(4.6, 2.6, mat('#B3262E'), [x, 6.3, -10], w.houses, 4); r.rotation.y = Math.PI / 4; }
  w.b = bed(k, k.scene); w.bd = w.b.root;
  w.p = person(k, w.b.body, '#F97316'); w.p.root.position.set(-.6, 1.45, 0); w.p.root.rotation.set(0, 0, -Math.PI / 2); w.p.root.scale.setScalar(.85);
  w.room = group(); box(30, 14, .5, mat('#E8D7F0'), [0, 7, -6], w.room); w.door = box(3, 6, .3, mat('#8B5A2B'), [9, 3, -5.7], w.room);
  w.floor = k.ground('#C9A27A', 0);
  w.school = group(); box(14, 7, 6, mat('#E2B07A'), [0, 3.5, 0], w.school); box(3, 4, .3, mat('#5A3A1A'), [0, 2, 3.05], w.school); box(4, 1, .3, mat('#FFFFFF'), [0, 6, 3.05], w.school);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.6, .12, .1, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  w.sock = box(.5, .2, .9, mat('#E2453C'), [0, 0, 0]);
  return w;
}

const place = (w, x, z, ry) => { w.bd.position.set(x, 0, z); w.bd.rotation.set(0, ry, 0); w.b.body.rotation.set(0, 0, 0); w.b.eyes.forEach(e => e.scale.set(1, 1, 1)); };
const snore = (w, t, on = true) => { w.zz.visible = on; if (!on) return; w.p.root.updateMatrixWorld(true); const v = new w.bd.position.constructor(); w.p.head.getWorldPosition(v);
  w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .6 + i / 3) % 1; z.position.set(v.x + .4 + q * .8, v.y + .6 + q * 2, v.z); z.scale.setScalar(.6 + q); }); };

export default {
  id: '172',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'WALKING BEDS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF YOUR BED', 'COULD WALK?'],
  title: 'What would happen if your bed could walk?',
  description: 'It carries you to school asleep. On Mondays it blocks the door. It goes to sleepovers by itself. And it still will not make itself. (A comedy what-if.)',
  tags: ['whatif', 'funny', 'bed', 'sleep', 'school', 'shorts'],
  sources: [
    'Comedy what-if; no factual claims.',
  ],
  setup,
  scenes: [
    {
      say: 'What if your bed could walk?',
      show: ['ground', 'road', 'houses', 'bd', 'zz'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [6, 5.5, 15], look: [1, 5.2, 0], fov: 48, to: { pos: [5.5, 5.5, 14], look: [1.5, 5.2, 0], fov: 46 } },
      update: (w, p, t) => { place(w, t * 1.2, 0, -.35); walk(w.b, t); snore(w, t); },
    },
    {
      say: 'School? It carries you there. Still asleep.',
      show: ['ground', 'road', 'bd', 'school', 'zz'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [10, 4, 14], look: [0, 4.4, 0], fov: 50, to: { pos: [9, 4, 13], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { w.school.position.set(0, 0, -9); place(w, -6 + t * 2.4, 0, 0); walk(w.b, t, 10); snore(w, t); },
    },
    {
      say: 'Mondays? It blocks the door.',
      show: ['floor', 'room', 'bd'], sky: '#E8D7F0', lightAt: [6, 3, 0], lightDist: 18,
      cam: { pos: [5, 5, 15], look: [8, 4.6, -3], fov: 50, to: { pos: [5.5, 5, 14], look: [8, 4.6, -3], fov: 48 } },
      update: (w, p, t) => {
        place(w, 9, -3.4, -Math.PI / 2); walk(w.b, t, 0, false); w.b.body.rotation.x = .04 * Math.sin(t * 10);
        w.b.eyes.forEach(e => e.scale.set(1, .45, 1)); w.zz.visible = false; w.b.mouth.scale.z = .6;
        w.p.root.visible = false;
      },
    },
    {
      say: 'Sleepovers? It just goes by itself.',
      show: ['ground', 'road', 'houses', 'bd'], sky: '#26355C', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [-6, 3.5, 12], look: [0, 4.4, 0], fov: 50, to: { pos: [-5.5, 3.5, 11], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { w.p.root.visible = false; place(w, 4 - t * 1.6, 0, Math.PI); walk(w.b, t, 9); w.b.mouth.scale.z = 1; },
    },
    {
      say: 'But making itself? Absolutely not.',
      show: ['floor', 'room', 'bd', 'sock'], sky: '#E8D7F0', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [6, 5, 14], look: [.5, 4.4, 0], fov: 48, to: { pos: [5.5, 5, 13], look: [.5, 4.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.p.root.visible = false; place(w, 0, 0, -.5); walk(w.b, t, 0, false); w.b.blanket.rotation.set(.3, .2, .25); w.b.blanket.position.set(-.6, 1.2, .9);
        w.b.head.rotation.x = .12 * Math.sin(t * 6); w.sock.position.set(2.5, .1, 3); w.sock.rotation.y = .7;
      },
    },
    {
      say: 'A walking bed: fun, perfect, or a little bit creepy? Comment below.',
      quiz: { q: 'Would you want a walking bed?', options: ['Fun', 'Perfect', 'A bit creepy'], answer: 'Beds cannot walk. You still have to get up. Sorry.' },
      show: ['ground', 'road', 'houses', 'bd'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 20,
      cam: { pos: [8, 3, 9], look: [0, 4.4, 0], fov: 46, to: { pos: [-8, 3, 9], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.b.blanket.rotation.set(0, 0, 0); w.b.blanket.position.set(-.9, .95, 0); w.b.head.rotation.x = 0; place(w, 0, 0, -.4); walk(w.b, t, 3); },
    },
  ],
};
