// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; premise in the family of 080 (everyone could fly, ~830 views).
// A made-up comedy sketch: people cannot breathe underwater. Hook: the premise as a question under 2 s; first frame shows a person underwater with fish.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function fish(k, parent, col, s = 1) {
  const f = k.group([0, 0, 0], parent);
  const b = k.ball(.5 * s, k.mat(col), [0, 0, 0], f); b.scale.set(1.6, 1, .6);
  const t = k.cone(.35 * s, .5 * s, k.mat(col), [-.95 * s, 0, 0], f, 4); t.rotation.z = Math.PI / 2;
  for (const z of [-.22, .22]) { k.ball(.12 * s, k.mat('#FFFFFF'), [.45 * s, .12 * s, z * s], f); k.ball(.06 * s, k.mat('#111111'), [.52 * s, .12 * s, z * 1.15 * s], f); }
  f.userData.tail = t; return f;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8D7A8', 0);
  w.sea = group();
  for (let i = 0; i < 9; i++) { const h = 1.5 + (i % 3); const sw = cyl(.12, .16, h, mat('#2E9E5A'), [-8 + i * 2, h / 2, -3 - (i % 2) * 2], w.sea, 6); sw.userData.i = i; }
  for (let i = 0; i < 6; i++) ball(.5 + (i % 3) * .3, mat('#9A8F7A'), [-7 + i * 2.8, .2, -2.5 + (i % 2)], w.sea);
  w.bubbles = group(); for (let i = 0; i < 20; i++) { const b = ball(.08 + (i % 3) * .04, mat('#DDF6FF', { glow: .5 }), [0, 0, 0], w.bubbles); b.userData.i = i; b.castShadow = false; }
  w.p = person(k, k.scene, '#F97316'); w.pp = w.p.root;
  w.school = group(); for (let i = 0; i < 6; i++) { const f = fish(k, w.school, ['#FFB020', '#3B82F6', '#EC4899'][i % 3], .7); f.userData.i = i; }
  w.desk = group([0, 0, 0]); box(2.4, .15, 1.4, mat('#D9A55B'), [0, 1.5, 0], w.desk); for (const x of [-1, 1]) box(.12, 1.5, .12, mat('#8B5A2B'), [x, .75, 0], w.desk);
  w.board = group([0, 0, -2.5]); box(4, 2.4, .1, mat('#2E4A3A'), [0, 3.6, 0], w.board);
  w.gold = fish(k, k.scene, '#FF8A1F', 2.2);
  w.leash = cyl(.04, .04, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.leash.geometry.translate(0, .5, 0);
  w.tub = group([0, 0, 0]); const white = mat('#F4F7FA');
  box(3.6, 1.4, .2, white, [0, .7, 1.1], w.tub); box(3.6, 1.4, .2, white, [0, .7, -1.1], w.tub); for (const x of [-1.7, 1.7]) box(.2, 1.4, 2.4, white, [x, .7, 0], w.tub);
  box(3.4, 1.0, 2.0, mat('#5DB8F5', { rough: .1 }), [0, .55, 0], w.tub);
  w.cal = group([2.8, 0, -1]); box(1.4, 1.6, .1, mat('#FFFFFF'), [0, 3, 0], w.cal); box(1.4, .35, .12, mat('#E2453C'), [0, 3.65, 0], w.cal);
  w.marks = group([0, 0, 0], w.cal); for (let i = 0; i < 3; i++) { const m = box(.08, .5, .13, mat('#111111'), [-.4 + i * .3, 2.8, .02], w.marks); m.rotation.z = .2; }
  w.shark = group([0, 0, 0]); const grey = mat('#7D8B99');
  const sb = ball(1, grey, [0, 0, 0], w.shark); sb.scale.set(2.6, 1, 1);
  ball(.9, mat('#E8EDF2'), [.6, -.3, 0], w.shark).scale.set(2.2, .6, .8);
  const fin = cone(.6, 1.2, grey, [0, 1.1, 0], w.shark, 4); fin.rotation.z = -.3;
  const st = cone(.7, 1.2, grey, [-2.8, 0, 0], w.shark, 4); st.rotation.z = Math.PI / 2;
  for (const z of [-.5, .5]) { ball(.16, mat('#FFFFFF'), [1.9, .35, z * .9], w.shark); ball(.08, mat('#111111'), [2.0, .35, z], w.shark); }
  w.smile = box(.8, .1, .5, mat('#5A1E1E'), [2.1, -.25, 0], w.shark);
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = ball(.2, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const SEA = '#3E8FC4';
const bub = (w, t, x0 = 0, y0 = 3.6, z0 = .6) => w.bubbles.children.forEach(b => { const i = b.userData.i; const q = (t * .5 + i / 20) % 1; b.position.set(x0 + Math.sin(i * 1.7 + t * 2) * .5, y0 + q * 4, z0 + Math.cos(i) * .3); });
const sway = (w, t) => w.sea.children.forEach(c => { if (c.userData.i !== undefined) c.rotation.z = .15 * Math.sin(t * 1.5 + c.userData.i); });
const swim = (f, t) => { f.userData.tail.rotation.y = .5 * Math.sin(t * 10); };

export default {
  id: '150',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BREATHING UNDERWATER',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD GILLS?'],
  title: 'What would happen if humans had gills?',
  description: 'School moves to the seabed. Your goldfish walks you. Bath time lasts three days. And the sharks just want a hug. (A made-up underwater life.)',
  tags: ['whatif', 'funny', 'underwater', 'shark', 'ocean', 'shorts'],
  sources: [
    'Comedy sketch: people cannot breathe underwater; this is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if humans had gills?',
      show: ['ground', 'sea', 'bubbles', 'pp', 'school'], sky: SEA, lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [.4, 2.6, 9.5], look: [0, 4.3, 0], fov: 48, to: { pos: [.3, 2.6, 8.7], look: [0, 4.25, 0], fov: 46 } },
      update: (w, p, t) => {
        sway(w, t); w.pp.position.set(0, .3 + .15 * Math.sin(t * 2), 0); w.pp.rotation.set(0, .2, .05 * Math.sin(t * 1.5)); w.p.mouth.scale.y = 1.4; bub(w, t, 0, 3.2, .7);
        w.school.children.forEach(f => { const i = f.userData.i; const a = t * .8 + i; f.position.set(Math.cos(a) * 2.4, 1.8 + Math.sin(i) * .6, Math.sin(a) * 1.6); f.rotation.y = -a - Math.PI / 2; swim(f, t + i); });
      },
    },
    {
      say: 'School? Moved to the bottom of the sea.',
      show: ['ground', 'sea', 'bubbles', 'pp', 'desk', 'board', 'school'], sky: SEA, lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [.6, 3.2, 9], look: [0, 2.8, 0], fov: 48, to: { pos: [.5, 3.2, 8.2], look: [0, 2.8, 0], fov: 46 } },
      update: (w, p, t) => {
        sway(w, t); w.pp.position.set(0, 0, -.8); w.pp.rotation.set(0, 0, 0); w.desk.position.set(0, 0, .2); w.p.mouth.scale.y = 1; bub(w, t, .2, 3.2, -.2);
        w.school.children.forEach(f => { const i = f.userData.i; f.position.set(-2 + (i % 3) * 2, 4.4 + Math.floor(i / 3) * .9 + .1 * Math.sin(t * 2 + i), -2); f.rotation.y = Math.PI / 2 * (i % 2 ? 1 : -1); swim(f, t + i); });
      },
    },
    {
      say: 'Pets? Your goldfish takes you for a walk.',
      show: ['ground', 'sea', 'pp', 'gold', 'leash'], sky: SEA, lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [1, 3.8, 15], look: [.4, 3.0, 0], fov: 50, to: { pos: [.9, 3.8, 14.2], look: [.8, 3.0, 0], fov: 48 } },
      update: (w, p, t) => {
        sway(w, t); const x = -3 + t * 1.6; w.gold.position.set(x + 2.6, 3.2 + .2 * Math.sin(t * 3), 0); w.gold.rotation.set(0, 0, .05 * Math.sin(t * 3)); swim(w.gold, t);
        w.pp.position.set(x - 1, .6 + .3 * Math.abs(Math.sin(t * 5)), .3); w.pp.rotation.set(0, Math.PI / 2, -.5); w.p.mouth.scale.y = 2;
        const a = new w.pp.position.constructor(), b = new w.pp.position.constructor(); w.gold.localToWorld(a.set(.6, -.4, 0)); w.pp.localToWorld(b.set(0, 2.4, .7));
        const d = a.clone().sub(b); w.leash.position.copy(b); w.leash.scale.set(1, d.length(), 1); w.leash.quaternion.setFromUnitVectors(new a.constructor(0, 1, 0), d.normalize());
      },
    },
    {
      say: 'Bath time? It now lasts three days.',
      show: ['ground', 'sea', 'tub', 'pp', 'cal', 'bubbles'], sky: SEA, lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [.8, 3.6, 8.5], look: [.6, 2.4, 0], fov: 48, to: { pos: [.7, 3.5, 7.7], look: [.6, 2.4, 0], fov: 46 } },
      update: (w, p, t) => {
        sway(w, t); w.pp.position.set(-.4, -.6, 0); w.pp.rotation.set(-.9, .3, 0); w.p.mouth.scale.y = 1; bub(w, t, -.2, 2.2, .6);
        w.marks.children.forEach((m, i) => { m.visible = i < 1 + t * 1.4; });
      },
    },
    {
      say: 'And the sharks? They just want a hug.',
      show: ['ground', 'sea', 'pp', 'shark', 'hearts'], sky: SEA, lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [.5, 3.6, 13.5], look: [.3, 3.4, 0], fov: 50, to: { pos: [.4, 3.6, 12.5], look: [.3, 3.4, 0], fov: 48 } },
      update: (w, p, t) => {
        sway(w, t); w.shark.position.set(-1.6 + Math.min(1, t / 1.5) * .8, 3.4 + .2 * Math.sin(t * 2), -.6); w.shark.rotation.set(0, -.25, .05 * Math.sin(t * 2));
        w.pp.position.set(2.1, .3, .8); w.pp.rotation.set(0, -.7, 0); w.p.mouth.scale.y = 2.5;
        w.hearts.visible = t > 1; w.hearts.children.forEach(h => { const q = (t * .7 + h.userData.i / 4) % 1; h.position.set(.6 + (h.userData.i - 1.5) * .6, 5.2 + q * 1.6, -.4); h.scale.setScalar(1 - q * .5); });
      },
    },
    {
      say: 'Underwater life: amazing, wet, or a bit fishy? Comment below.',
      quiz: { q: 'Would you live underwater?', options: ['Amazing', 'Too wet', 'A bit fishy'], answer: 'Breathing underwater is made up. Please keep using snorkels.' },
      show: ['ground', 'sea', 'bubbles', 'pp'], sky: '#274B73', lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [.4, 1.2, 8], look: [0, 4.6, 0], fov: 46, to: { pos: [-1.2, 1.2, 8], look: [0, 4.6, 0] } },
      update: (w, p, t) => { sway(w, t); w.pp.position.set(0, .3, 0); w.pp.rotation.set(0, .2, 0); w.p.mouth.scale.y = 1.4; bub(w, t, 0, 3.2, .7); },
    },
  ],
};
