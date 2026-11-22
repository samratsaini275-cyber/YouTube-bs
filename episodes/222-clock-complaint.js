// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: clocks do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the clock with a face.

function clock(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const rim = cyl(2.4, 2.4, .6, mat('#E2453C', { rough: .4 }), [0, 0, 0], c.body, 40); rim.rotation.x = Math.PI / 2;
  const dial = cyl(2.15, 2.15, .62, mat('#FFFDF5', { rough: .6 }), [0, 0, .01], c.body, 40); dial.rotation.x = Math.PI / 2;
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const m = box(.12, i % 3 ? .25 : .45, .05, mat('#222222'), [Math.sin(a) * 1.85, Math.cos(a) * 1.85, .33], c.body); m.rotation.z = -a; }
  c.hour = group([0, 0, .36], c.body); box(.14, 1.1, .04, mat('#222222'), [0, .5, 0], c.hour);
  c.min = group([0, 0, .38], c.body); box(.09, 1.6, .04, mat('#222222'), [0, .75, 0], c.min);
  ball(.12, mat('#222222'), [0, 0, .4], c.body);
  c.face = group([0, 0, .36], c.body);
  for (const x of [-.75, .75]) { ball(.3, mat('#FFFFFF'), [x, .75, 0], c.face); ball(.15, mat('#111111'), [x, .75, .2], c.face); }
  c.brows = [-.75, .75].map(x => box(.45, .07, .05, mat('#111111'), [x, 1.18, .04], c.face));
  c.mouth = box(.6, .1, .05, mat('#5A1E1E'), [0, -.9, .02], c.face);
  for (const s of [-1, 1]) { const b = ball(.5, mat('#C0C8D0', { metal: .7, rough: .3 }), [s * 1.5, 2.4, -.1], c.body); b.scale.y = .6; }
  for (const s of [-1, 1]) { const l = box(.15, .9, .15, mat('#222222'), [s * 1.2, -2.6, 0], c.body); l.rotation.z = s * .4; }
  return c;
}
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(c, a) { c.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.shelf = k.ground('#B98A5E', 0);
  w.wall = box(60, 30, .5, mat('#DCE8D0'), [0, 15, -4]); w.wall.castShadow = false;
  w.c = clock(k, k.scene); w.ck = w.c.root;
  w.eyes = group(); for (let i = 0; i < 5; i++) { const g = group([-4 + i * 2, 0, 0], w.eyes); ball(.35, mat('#FFFFFF'), [-.2, 0, 0], g); ball(.35, mat('#FFFFFF'), [.2, 0, 0], g); ball(.17, mat('#111111'), [-.2, 0, .25], g); ball(.17, mat('#111111'), [.2, 0, .25], g); }
  w.key = group(); const kb = k.torus(.4, .12, mat('#FFC21F', { metal: .7 }), [0, 0, 0], w.key); cyl(.08, .08, 1, mat('#FFC21F', { metal: .7 }), [0, -.6, 0], w.key, 8);
  w.dizzy = group(); for (let i = 0; i < 5; i++) { const s = ball(.15, mat('#FFD21F', { glow: 1 }), [0, 0, 0], w.dizzy); s.userData.i = i; s.castShadow = false; }
  w.sandwich = group(); box(1.4, .25, 1, mat('#E9C98F'), [0, 0, 0], w.sandwich); box(1.5, .12, 1.05, mat('#5DBB4A'), [0, .18, 0], w.sandwich); box(1.4, .25, 1, mat('#E9C98F'), [0, .36, 0], w.sandwich);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#334066'); box(.6, .1, .08, m, [0, .26, 0], z); box(.6, .1, .08, m, [0, -.26, 0], z); const d = box(.72, .1, .08, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  return w;
}

const hang = (w, x, y, z, t, on = true) => { w.ck.position.set(x, y, z); w.ck.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.min.rotation.z = -t * .5; w.c.hour.rotation.z = -t * .04 - 1; talk(w.c, t, on); };

export default {
  id: '222',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CLOCK',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS CLOCK', 'HAS A COMPLAINT'],
  title: 'This clock has a complaint',
  description: 'Everyone stares at him. Wound up every morning. Twice a year, someone spins his hands an hour. So today, the clock took a lunch break. (A made-up comedy sketch.)',
  tags: ['funny', 'clock', 'time', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: daylight saving time was first adopted nationally by Germany in 1916, during World War I (Encyclopaedia Britannica, "daylight saving time").',
  ],
  setup,
  scenes: [
    {
      say: 'This clock has a complaint.',
      show: ['shelf', 'wall', 'ck'], sky: '#DCE8D0', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [.8, 4.6, 14], look: [0, 5.3, 0], fov: 46, to: { pos: [.8, 4.6, 13.2], look: [0, 5.3, 0], fov: 44 } },
      update: (w, p, t) => { hang(w, 0, 4, 0, t); grump(w.c, .35); },
    },
    {
      say: 'All day, everyone stares at him.',
      show: ['shelf', 'wall', 'ck', 'eyes'], sky: '#DCE8D0', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [.8, 4.4, 12], look: [0, 4.4, 0], fov: 50, to: { pos: [.8, 4.4, 11.2], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { hang(w, 0, 5.2, 0, t); grump(w.c, .6); w.eyes.position.set(0, 1.6, 4); w.eyes.children.forEach((g, i) => { g.rotation.x = -.35; g.position.y = .1 * Math.sin(t * 3 + i); }); },
    },
    {
      say: 'Every morning, he gets wound up.',
      show: ['shelf', 'wall', 'ck', 'key'], sky: '#DCE8D0', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [.8, 4.6, 14], look: [0, 5.3, 0], fov: 46, to: { pos: [.8, 4.6, 13.2], look: [0, 5.3, 0], fov: 44 } },
      update: (w, p, t) => { hang(w, 0, 4, 0, t); grump(w.c, .6); w.key.position.set(2.9, 4.4, .4); w.key.rotation.set(0, Math.PI / 2, t * 6); w.c.body.rotation.z = .04 * Math.sin(t * 12); w.c.mouth.scale.y = 2.4; },
    },
    {
      say: 'Twice a year, his hands get spun. Rude.',
      show: ['shelf', 'wall', 'ck', 'dizzy'], sky: '#DCE8D0', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [.8, 4.6, 14], look: [0, 5.3, 0], fov: 46, to: { pos: [.8, 4.6, 13.2], look: [0, 5.3, 0], fov: 44 } },
      update: (w, p, t) => { hang(w, 0, 4, 0, t); w.c.min.rotation.z = -t * 14; w.c.hour.rotation.z = -t * 1.2; grump(w.c, -.35); w.c.mouth.scale.y = 2.8; w.dizzy.children.forEach(s => { const i = s.userData.i, a = t * 5 + i * 1.256; s.position.set(Math.cos(a) * 2, 7 + Math.sin(a) * .3, Math.sin(a) * .6 + .5); }); },
    },
    {
      say: 'So today, he stopped. Lunch break.',
      show: ['shelf', 'wall', 'ck', 'sandwich', 'zz'], sky: '#F7C99A', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [.8, 4.4, 14], look: [0, 4.6, 0], fov: 46, to: { pos: [.8, 4.4, 13.2], look: [0, 4.6, 0], fov: 44 } },
      update: (w, p, t) => { hang(w, 0, 4, 0, 0, false); w.c.min.rotation.z = 0; w.c.hour.rotation.z = 0; w.c.mouth.scale.y = 1.8; grump(w.c, -.35); w.sandwich.position.set(0, 1.2, 1); w.sandwich.rotation.y = .3; w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(2.2 + q * 1.4, 6.6 + q * 2, .4); z.scale.setScalar(.6 + q); }); },
    },
    {
      say: 'Grumpy clock: wind it, fix it, or let it rest? Comment below.',
      quiz: { q: 'What do you do with the grumpy clock?', options: ['Wind it', 'Fix it', 'Let it rest'], answer: 'Fun fact: Germany was the first country to use daylight saving time, in 1916.' },
      show: ['shelf', 'wall', 'ck'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [6, 4.6, 12], look: [0, 4.6, 0], fov: 46, to: { pos: [-6, 4.6, 12], look: [0, 4.6, 0] } },
      update: (w, p, t) => { hang(w, 0, 4, 0, t, false); grump(w.c, -.2); },
    },
  ],
};
