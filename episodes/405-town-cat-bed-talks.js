// Narrative 23: "In This Town… (season 2: things that talk back)". Merges the top two formats: In This Town cat rules (906: 975) and Objects With Opinions (213 bed: 756 in the window).
// Hook: the rule under 2 s; first frame shows a round cat bed with a face, a cat sitting beside it.

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
  const { mat, box, cyl, torus, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#F2D7E3'), [0, 8, -4], w.wall);
  w.bed = group(); cyl(1.7, 1.6, .4, mat('#7C5CC4'), [0, .2, 0], w.bed, 24); const rim = torus(1.5, .4, mat('#9C7CE4', { rough: .9 }), [0, .55, 0], w.bed); rim.rotation.x = Math.PI / 2; cyl(1.3, 1.3, .2, mat('#F7E7FF'), [0, .45, 0], w.bed, 24);
  w.bf = face(k, w.bed, [0, .6, 1.85], .9);
  w.box = group(); box(2.4, 1.6, 2, mat('#C9965A'), [0, .8, 0], w.box); for (const s of [-1, 1]) { const f = box(1.2, .05, 2, mat('#B8854A'), [s * 1.6, 1.75, 0], w.box); f.rotation.z = s * -.5; }
  w.xf = face(k, w.box, [0, .85, 1.03], .8);
  w.big = group(); box(4.6, 2.6, 3.6, mat('#B8854A'), [0, 1.3, 0], w.big);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '405',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT BED TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CAT BEDS TALK'],
  title: 'In this town, cat beds can talk',
  description: 'Brand new bed? The cat ignores it. The cardboard box? Very smug. So the bed moves into a box. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking cat beds are made up. Quiz fact: most adult cats sleep about 12 to 16 hours a day (PetMD, "Why Do Cats Sleep So Much?").'],
  setup,
  scenes: [
    { say: 'In this town, cat beds talk.', show: ['floor', 'wall', 'bed', 'cr'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.7, 3.6, 11], look: [.6, 2.15, 0], fov: 50, to: { pos: [.7, 3.6, 10.5], look: [.6, 2.15, 0], fov: 48 } },
      update: (w, p, t) => { w.box.visible = false; w.big.visible = false; w.bed.position.set(-.6, 0, .4); talk(w.bf, t); brow(w.bf, -.2); ctAt(w, 2.2, 0, -.8, -2.2, .5); w.c.head.rotation.z = .1; } },
    { say: 'Brand new? The cat ignores it.', label: 'SNUB', show: ['floor', 'wall', 'bed', 'box', 'cr'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.8, 14], look: [0, 2.2, 0], fov: 50, to: { pos: [0, 3.8, 13.5], look: [0, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.position.set(-1.8, 0, .6); talk(w.bf, t, p > .5); brow(w.bf, .35); w.xf.visible = false; w.box.position.set(2.6, 0, -.6); const q = Math.min(1, p * 1.6); ctAt(w, -1.4 + q * 3.8, q > .95 ? 1.6 : 0, .6 - q * 1.2, 0, .5); } },
    { say: 'The cardboard box? Smug.', label: 'HEH', show: ['floor', 'wall', 'box', 'cr'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 2.8, 7.8], look: [.2, 1.45, 0], fov: 50, to: { pos: [.3, 2.8, 7.3], look: [.2, 1.45, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.visible = false; w.box.position.set(0, 0, 0); w.xf.visible = true; talk(w.xf, t, p < .7); brow(w.xf, -.3); w.xf.mouth.rotation.z = .15; ctAt(w, -.1, 1.3, -.2, -.5, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); } },
    { say: 'So the bed? Moves into a box.', label: 'FINE', show: ['floor', 'wall', 'bed', 'big'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 4.4, 10], look: [.2, 2.3, 0], fov: 50, to: { pos: [.3, 4.4, 9.5], look: [.2, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { w.box.visible = false; w.cr.visible = false; w.big.position.set(0, 0, -.6); const q = Math.min(1, p * 1.5); w.bed.position.set(-3 + q * 3, 2.7 * Math.sin(q * Math.PI) * .8 + (q >= 1 ? 2.2 : 0) * 0 + (q > .6 ? 2.0 * (q - .6) / .4 : 0) * 0 + (q >= 1 ? 2.1 : 0), .4); if (q < 1) w.bed.position.y = Math.sin(q * Math.PI) * 2 + q * 2.1; talk(w.bf, t); brow(w.bf, -.25); } },
    { say: 'Talking cat bed: sad, funny, or just sit in it? Comment below.',
      quiz: { q: 'The talking cat bed is…', options: ['Sad', 'Funny', 'Just sit in it!'], answer: 'Made up. But most cats really do sleep 12 to 16 hours a day.' },
      show: ['floor', 'bed'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3, 6.5], look: [0, .8, 0], fov: 52, to: { pos: [-2, 3, 6.5], look: [0, .8, 0] } },
      update: (w, p, t) => { w.big.visible = false; w.bed.position.set(0, 0, 0); talk(w.bf, t, Math.sin(t * 2) > 0); brow(w.bf, .3); } },
  ],
};
