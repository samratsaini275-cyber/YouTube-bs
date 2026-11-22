// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: pianos do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the piano with a face.

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

function piano(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const wood = mat('#2A1B14', { rough: .3 });
  box(6, 4.6, 2, wood, [0, 3.1, -.6], p.body);
  box(6, .5, 1.4, wood, [0, 2.4, .9], p.body);
  for (const x of [-2.8, 2.8]) box(.3, 2.2, .3, wood, [x, 1.1, .9], p.body);
  p.keys = []; for (let i = 0; i < 14; i++) { const kk = box(.38, .16, 1, mat('#FFFFFF', { rough: .4 }), [-2.6 + i * .4, 2.72, 1], p.body); p.keys.push(kk); }
  for (let i = 0; i < 13; i++) if (i % 7 !== 2 && i % 7 !== 6) box(.22, .16, .6, mat('#111111'), [-2.4 + i * .4, 2.84, .8], p.body);
  p.face = group([0, 4.2, .42], p.body);
  for (const x of [-.8, .8]) { ball(.4, mat('#FFFFFF'), [x, .2, 0], p.face); ball(.2, mat('#111111'), [x, .2, .27], p.face); }
  p.brows = [-.8, .8].map(x => box(.6, .09, .05, mat('#C9A06A'), [x, .78, .05], p.face));
  p.mouth = box(.9, .14, .05, mat('#8A2A2A'), [0, -.45, .02], p.face);
  return p;
}
function talk(p, t, on = true) { p.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(p, a) { p.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#B98A5E', 0);
  w.wall = box(60, 30, .5, mat('#E8D9C3'), [0, 15, -4]); w.wall.castShadow = false;
  w.p = piano(k, k.scene); w.pn = w.p.root;
  w.fists = group(); for (const x of [-1.2, 1.2]) { const f = ball(.5, mat('#F2C9A0'), [x, 0, 0], w.fists); f.scale.set(1, .7, 1); }
  w.notes = group(); for (let i = 0; i < 5; i++) { const n = group([0, 0, 0], w.notes); const m = mat('#FFD21F', { glow: .5 }); ball(.2, m, [0, 0, 0], n); box(.06, .7, .06, m, [.18, .35, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.wobble = group(); for (let i = 0; i < 4; i++) { const n = group([0, 0, 0], w.wobble); const m = mat('#7A4BC2'); ball(.2, m, [0, 0, 0], n); box(.06, .7, .06, m, [.18, .35, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.c = cat(k, k.scene, '#888888'); w.ct = w.c.root; w.c.crown.visible = false;
  w.stage = box(16, .6, 8, mat('#8A2A2A'), [0, .3, 0]);
  w.curtain = group(); for (const x of [-7, 7]) { box(3, 14, .4, mat('#B3262E'), [x, 7, -3.5], w.curtain); }
  w.spot = cyl(3, 3, .05, mat('#FFF4C2', { glow: .6 }), [0, .65, .4], k.scene, 24); w.spot.castShadow = false;
  w.crowd = group(); for (let i = 0; i < 7; i++) { const h = ball(.6, mat('#2A2A3A'), [-6 + i * 2, 1, 7.5], w.crowd); }
  return w;
}

const place = (w, x, y, z, ry, t, on = true) => { w.pn.position.set(x, y, z); w.pn.rotation.set(0, ry, 0); w.p.body.position.set(0, 0, 0); w.p.body.rotation.set(0, 0, 0); w.p.keys.forEach(kk => kk.position.y = 2.72); talk(w.p, t, on); };

export default {
  id: '218',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PIANO',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS PIANO', 'HAS A COMPLAINT'],
  title: 'This piano has a complaint',
  description: 'Bashed every afternoon. Out of tune and nobody fixes it. And the cat walks on him at night. So the piano booked his own concert. (A made-up comedy sketch.)',
  tags: ['funny', 'piano', 'music', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: a standard modern piano has 88 keys, 52 white and 36 black (Encyclopaedia Britannica, "piano").',
  ],
  setup,
  scenes: [
    {
      say: 'This piano has a complaint.',
      show: ['floor', 'wall', 'pn'], sky: '#E8D9C3', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1.6, 4.8, 15], look: [0, 5, 0], fov: 46, to: { pos: [1.5, 4.8, 14.2], look: [0, 5, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t); grump(w.p, .35); },
    },
    {
      say: 'Every afternoon, he gets bashed.',
      show: ['floor', 'wall', 'pn', 'fists', 'notes'], sky: '#E8D9C3', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1.6, 5, 16], look: [0, 4.4, 0], fov: 48, to: { pos: [1.5, 5, 15.2], look: [0, 4.4, 0], fov: 46 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, 0, t); grump(w.p, .6); w.p.mouth.scale.y = 2.6; const q = Math.abs(Math.sin(t * 9)); w.fists.position.set(0, 3.1 + q * 1.2, 1.1); w.p.keys.forEach((kk, i) => kk.position.y = 2.72 - (q < .2 && (i % 4 === 1) ? .1 : 0)); w.pn.position.y = q < .15 ? -.03 : 0;
        w.notes.children.forEach(n => { const i = n.userData.i, a = (t * .9 + i / 5) % 1; n.position.set(-2.4 + i * 1.2 + Math.sin(a * 6) * .3, 5.6 + a * 3, 1); n.rotation.z = Math.sin(t * 8 + i) * .6; n.scale.setScalar(Math.sin(a * Math.PI)); });
      },
    },
    {
      say: 'He\'s out of tune. Nobody fixes it.',
      show: ['floor', 'wall', 'pn', 'wobble'], sky: '#E8D9C3', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1.6, 4.6, 15], look: [0, 4.4, 0], fov: 46, to: { pos: [1.5, 4.6, 14.2], look: [0, 4.4, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, 0, t); grump(w.p, -.35); w.p.body.rotation.z = .03 * Math.sin(t * 7);
        w.wobble.children.forEach(n => { const i = n.userData.i, a = (t * .6 + i / 4) % 1; n.position.set(-2 + i * 1.3, 6.2 + Math.sin(a * 12 + i) * .5, 1); n.rotation.z = Math.sin(t * 12 + i) * 1.2; n.scale.setScalar(Math.sin(a * Math.PI) * 1.2); });
      },
    },
    {
      say: 'And at night? The cat walks on him.',
      show: ['floor', 'wall', 'pn', 'ct', 'notes'], sky: '#1E2A4A', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1.6, 5, 14], look: [0, 4, 0], fov: 46, to: { pos: [1.5, 5, 13.2], look: [0, 4, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, 0, t); grump(w.p, .6); const x = -2.4 + (t * 1.6 % 4.8); w.ct.position.set(x, 2.8, 1); w.ct.scale.setScalar(1.1); w.ct.rotation.y = 0; w.c.tail.rotation.z = .6 + .3 * Math.sin(t * 4);
        w.p.keys.forEach((kk, i) => kk.position.y = 2.72 - (Math.abs(-2.6 + i * .4 - x) < .3 ? .1 : 0));
        w.notes.children.forEach(n => { const i = n.userData.i, a = (t * .9 + i / 5) % 1; n.position.set(x - .5 + i * .3, 4.2 + a * 2.5, 1); n.rotation.z = 0; n.scale.setScalar(Math.sin(a * Math.PI) * .8); });
      },
    },
    {
      say: 'So today, he played himself. Sold out.',
      show: ['pn', 'stage', 'curtain', 'spot', 'crowd', 'notes'], sky: '#140F24', lightAt: [0, 9, 4], lightDist: 22,
      cam: { pos: [1.4, 5, 13], look: [0, 4.4, 0], fov: 50, to: { pos: [1.3, 5, 12.2], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => {
        place(w, 0, .6, 0, 0, t, false); w.p.mouth.scale.y = 1.8; grump(w.p, -.35); w.p.keys.forEach((kk, i) => kk.position.y = 2.72 - (Math.sin(t * 10 + i * 1.3) > .7 ? .1 : 0)); w.p.body.rotation.z = .04 * Math.sin(t * 3);
        w.notes.children.forEach(n => { const i = n.userData.i, a = (t * .7 + i / 5) % 1; n.position.set(-2.6 + i * 1.3, 6.2 + a * 3, 1); n.rotation.z = Math.sin(t * 4 + i) * .4; n.scale.setScalar(Math.sin(a * Math.PI) * 1.2); });
        w.crowd.children.forEach((h, i) => h.position.y = 1 + .25 * Math.abs(Math.sin(t * 6 + i)));
      },
    },
    {
      say: 'Grumpy piano: play it, tune it, or let it rest? Comment below.',
      quiz: { q: 'What do you do with the grumpy piano?', options: ['Play it', 'Tune it', 'Let it rest'], answer: 'Fun fact: a standard piano has 88 keys: 52 white and 36 black.' },
      show: ['floor', 'wall', 'pn'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [7, 5, 10], look: [0, 3.8, 0], fov: 46, to: { pos: [-7, 5, 10], look: [0, 3.8, 0] } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t, false); grump(w.p, -.2); },
    },
  ],
};
