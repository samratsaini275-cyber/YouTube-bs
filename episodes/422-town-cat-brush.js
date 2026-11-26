// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot (10th of 20): the cat brush has opinions.
// Hook: the rule under 2 s; first frame shows a cat brush with a face next to a cat.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);


function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#F5E0B8'), [0, 8, -4], w.wall);
  w.brush = group(); box(1.6, .3, .9, mat('#7C5CC4'), [0, 0, 0], w.brush); const hd = cyl(.15, .15, 1.4, mat('#7C5CC4'), [-1.4, 0, 0], w.brush, 10); hd.rotation.z = Math.PI / 2; for (let i = 0; i < 7; i++) for (let j = 0; j < 3; j++) cyl(.03, .03, .3, mat('#EEEEEE'), [-.6 + i * .2, -.3, -.3 + j * .3], w.brush, 4);
  w.bfc = face(k, w.brush, [.1, .05, .46], .38);
  w.fur = group(); for (let i = 0; i < 14; i++) { const f = ball(.1, mat('#F2A04A'), [0, 0, 0], w.fur); f.userData.i = i; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const bAt = (w, x, y, z, rz = 0, s = 1) => { w.brush.position.set(x, y, z); w.brush.rotation.set(0, 0, rz); w.brush.scale.setScalar(s); w.brush.visible = true; };

export default {
  id: '422',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT BRUSH TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'BRUSHES TALK'],
  title: 'In this town, cat brushes can talk',
  description: 'Brushing time? It purrs too. Too much fur? It sneezes. The cat runs off? It gives chase. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking cat brushes are made up. Quiz fact: cats can spend about 30 to 50 percent of their waking hours grooming themselves (Animal Humane Society, "Why do cats groom themselves?").'],
  setup,
  scenes: [
    { say: 'In this town, brushes talk.', show: ['floor', 'wall', 'cr'], sky: '#F5E0B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 1.4, 7.2], look: [.3, 1.1, 0], fov: 50, to: { pos: [.3, 1.4, 6.7], look: [.3, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.fur.visible = false; bAt(w, -.35, .8 + .08 * Math.sin(t * 3), .8, .15, .85); talk(w.bfc, t); brow(w.bfc, -.2); ctAt(w, 1.3, 0, -.4, Math.PI + .5, .42); } },
    { say: 'Brushing time? It purrs too.', label: 'PURR', show: ['floor', 'wall', 'cr'], sky: '#F5E0B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 1.8, 6.5], look: [.2, 1.1, 0], fov: 50, to: { pos: [.3, 1.8, 6], look: [.2, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, .6, 0, 0, -.3, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .2); w.c.head.rotation.z = .1; bAt(w, -.3 + .5 * Math.sin(t * 5), 1.55, .2, 0, .8); talk(w.bfc, t, false); w.bfc.mouth.scale.set(1.3, 1.4 + .3 * Math.sin(t * 20), 1); w.bfc.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .2; }); brow(w.bfc, -.3); } },
    { say: 'Too much fur? It sneezes.', label: 'ACHOO', show: ['floor', 'wall', 'cr', 'fur'], sky: '#F5E0B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.6, 5.5], look: [0, 1.2, 0], fov: 50, to: { pos: [.2, 1.6, 5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { ctAt(w, 1.2, 0, -.6, Math.PI + .5, .45); w.bfc.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = p > .5 ? .2 : 1; }); bAt(w, -.4, 1.1, .6, p > .5 ? -.25 : .1, .9); w.brush.children.slice(2).forEach(c => c.material = w.k.mat('#F2A04A')); talk(w.bfc, t, false); w.bfc.mouth.scale.set(1.4, p > .5 ? 3 : 1, 1); brow(w.bfc, .3); w.fur.children.forEach(f => { const i = f.userData.i, q = Math.max(0, (p - .5) * 2.5); f.visible = p > .5; f.position.set(-.4 + Math.cos(i) * q * 1.6, 1.1 + Math.sin(i * 1.7) * q * 1.2 + q * .3, .7 + q * .5); }); } },
    { say: 'The cat runs off? It gives chase.', label: 'COME BACK', show: ['floor', 'wall', 'cr'], sky: '#F5E0B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 9], look: [0, 1.1, 0], fov: 52, to: { pos: [0, 2.2, 8.5], look: [0, 1.1, 0], fov: 50 } },
      update: (w, p, t) => { w.fur.visible = false; w.bfc.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); const x = -2.6 + p * 4; ctAt(w, x + 1.6, .1 * Math.abs(Math.sin(t * 10)), .2, 0, .42); bAt(w, x, .5 + .3 * Math.abs(Math.sin(t * 9)), .4, .2 * Math.sin(t * 9), .8); talk(w.bfc, t); brow(w.bfc, .4); } },
    { say: 'Talking cat brush: helpful, funny, or way too fluffy? Comment below.',
      quiz: { q: 'The talking cat brush is…', options: ['Helpful', 'Funny', 'Way too fluffy'], answer: 'Made up. Fun fact: cats can spend up to half their waking hours grooming.' },
      show: ['floor', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 1.7, 5.5], look: [0, 1.1, 0], fov: 50, to: { pos: [-1.2, 1.7, 5.5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; ctAt(w, .9, 0, -.6, -.6, .45); bAt(w, -.5, .9 + .08 * Math.sin(t * 3), .6, .15, .9); talk(w.bfc, t, Math.sin(t * 2) > 0); brow(w.bfc, .2); } },
  ],
};
