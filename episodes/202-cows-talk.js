// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Talking animals (cats could text 392, dogs talk) + farm.
// Hook: the premise as a question under 2 s; first frame shows a spotted cow in a field mid-sentence, speech bubbles rising.

function cow(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const wh = mat('#F4F4F0', { rough: .7 }), bl = mat('#1E1E1E', { rough: .7 });
  const c = { root: group([0, 0, 0], parent) };
  const b = box(2.6, 1.4, 1.3, wh, [0, 1.7, 0], c.root);
  for (const [x, y, z] of [[-.6, 2.1, .66], [.5, 1.5, .66], [-.2, 1.9, -.66], [.8, 2.2, -.66]]) { const s = ball(.35, bl, [x, y, z], c.root); s.scale.set(1.3, .9, .1); }
  c.head = group([1.5, 2.3, 0], c.root); box(.9, .8, .8, wh, [.2, 0, 0], c.head);
  c.snout = box(.35, .5, .78, mat('#F2A7B5'), [.68, -.15, 0], c.head); for (const z of [-.15, .15]) ball(.05, mat('#8A3A50'), [.86, -.1, z], c.head);
  c.mouth = box(.05, .06, .4, mat('#7A2A3A'), [.86, -.32, 0], c.head);
  for (const z of [-.22, .22]) { ball(.11, mat('#FFFFFF'), [.55, .2, z], c.head); ball(.055, mat('#111111'), [.63, .2, z], c.head); }
  for (const z of [-.5, .5]) { cone(.08, .3, mat('#E8DCC0'), [.05, .5, z * .7], c.head, 8); const e = ball(.18, wh, [0, .25, z], c.head); e.scale.set(.5, .6, 1.2); }
  c.legs = []; for (const x of [-1, 1]) for (const z of [-.45, .45]) c.legs.push(cyl(.17, .15, 1, wh, [x, .5, z], c.root, 8));
  const tail = cyl(.04, .04, .9, wh, [-1.35, 1.8, 0], c.root, 6); tail.rotation.z = .4; c.tail = tail;
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#8DBA5A', 0);
  w.barn = group(); box(8, 6, 7, mat('#B3262E'), [0, 3, 0], w.barn); const r = cone(6.2, 3, mat('#5A2A1A'), [0, 7.5, 0], w.barn, 4); r.rotation.y = Math.PI / 4;
  w.fence = group(); for (let i = 0; i < 12; i++) box(.2, 1.4, .2, mat('#C79A5B'), [-12 + i * 2.2, .7, 5], w.fence); box(26, .15, .1, mat('#C79A5B'), [0, 1.1, 5], w.fence);
  w.c = cow(k, k.scene); w.cw = w.c.root;
  w.bub = group(); for (let i = 0; i < 3; i++) { const b = ball(.25, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.bub); b.userData.i = i; b.castShadow = false; }
  w.bucket = group(); cyl(.5, .4, .7, mat('#C9CED6', { rough: .3 }), [0, .35, 0], w.bucket, 14); cyl(.45, .45, .05, mat('#FFFFFF'), [0, .66, 0], w.bucket, 14);
  w.note = box(.6, .8, .03, mat('#FFF3B0', { glow: .2 }), [0, 0, 0]);
  w.bowl = group(); cyl(.9, .6, .4, mat('#FFFFFF'), [0, .2, 0], w.bowl, 18); for (let i = 0; i < 6; i++) ball(.2, mat(['#3FA35B', '#E2453C', '#FFD21F'][i % 3]), [Math.cos(i) * .45, .45, Math.sin(i) * .45], w.bowl);
  w.p = group(); { const pm = mat('#3A5BA0'); cyl(.6, .65, 2, pm, [0, 1, 0], w.p, 12); ball(.55, mat('#F2C9A0'), [0, 2.5, 0], w.p); for (const x of [-.2, .2]) { ball(.11, mat('#FFFFFF'), [x, 2.6, .48], w.p); ball(.055, mat('#111111'), [x, 2.6, .57], w.p); } box(1.4, .15, 1.4, mat('#C79A5B'), [0, 3, 0], w.p); cyl(.45, .5, .4, mat('#C79A5B'), [0, 3.2, 0], w.p, 12); }
  return w;
}

const pose = (w, x, z, ry, t) => { w.cw.position.set(x, 0, z); w.cw.rotation.set(0, ry, 0); w.c.head.rotation.set(0, 0, 0); w.c.tail.rotation.x = .4 * Math.sin(t * 3); w.c.mouth.scale.y = 1; };
const talk = (w, t, on = true) => { w.bub.visible = on; if (!on) return; w.c.mouth.scale.y = 1 + 4 * Math.abs(Math.sin(t * 10)); w.cw.updateMatrixWorld(true); const v = new w.cw.position.constructor(); w.c.head.localToWorld(v.set(.9, .3, 0));
  w.bub.children.forEach(b => { const i = b.userData.i, q = (t * 1.2 + i / 3) % 1; b.position.set(v.x + q * .8, v.y + q * 1.4, v.z); b.scale.setScalar(.4 + q * 1.1); }); w.c.head.rotation.z = .08 * Math.sin(t * 8); };

export default {
  id: '202',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TALKING COWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF COWS', 'COULD TALK?'],
  title: 'What would happen if cows could talk?',
  description: 'Milk comes with a request for a thank-you note. Grass again? They want salad dressing. And the farmer gets told off every morning. (A comedy what-if.)',
  tags: ['whatif', 'cows', 'funny', 'farm', 'talking', 'shorts'],
  sources: [
    'Quiz fact: cows have four stomach compartments and chew the cud (general zoology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if cows could talk?',
      show: ['ground', 'barn', 'fence', 'cw', 'bub'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [2.5, 2.8, 10], look: [.5, 3.3, 0], fov: 44, to: { pos: [2.3, 2.8, 9.2], look: [.5, 3.3, 0], fov: 42 } },
      update: (w, p, t) => { w.barn.position.set(-6, 0, -10); pose(w, -.6, 0, -.7, t); talk(w, t); },
    },
    {
      say: 'Milk? They want a thank-you note.',
      show: ['ground', 'barn', 'fence', 'cw', 'bucket', 'note', 'bub'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [3, 3, 11], look: [.5, 2.8, 0], fov: 46, to: { pos: [2.8, 3, 10.2], look: [.5, 2.8, 0], fov: 44 } },
      update: (w, p, t) => { w.barn.position.set(-6, 0, -10); pose(w, -1, 0, -.5, t); talk(w, t, t < 1.2); w.bucket.position.set(1.5, 0, 1.4); w.note.position.set(2.4, 1.4 + .05 * Math.sin(t * 5), 1.6); w.note.rotation.set(0, -.4, .1 * Math.sin(t * 3)); },
    },
    {
      say: 'Grass again? They want salad dressing.',
      show: ['ground', 'barn', 'fence', 'cw', 'bowl', 'bub'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [3, 3, 10.5], look: [.6, 2.7, 0], fov: 46, to: { pos: [2.8, 3, 9.7], look: [.6, 2.7, 0], fov: 44 } },
      update: (w, p, t) => { w.barn.position.set(-6, 0, -10); pose(w, -1.2, 0, -.4, t); w.c.head.rotation.z = -.3; talk(w, t, t > .6); w.bowl.position.set(1.4, 0, 1.2); },
    },
    {
      say: 'But the farmer? Gets told off every morning.',
      show: ['ground', 'barn', 'fence', 'cw', 'p', 'bub'], sky: '#F7C99A', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [1, 3, 12], look: [.6, 3, 0], fov: 46, to: { pos: [1, 3, 11.2], look: [.6, 3, 0], fov: 44 } },
      update: (w, p, t) => { w.barn.position.set(-6, 0, -10); pose(w, -1.8, 0, -.2, t); talk(w, t); w.p.position.set(2.6, 0, .8); w.p.rotation.set(0, -.6, 0); w.p.scale.setScalar(.9); w.p.rotation.z = -.08 * Math.abs(Math.sin(t * 5)); },
    },
    {
      say: 'Talking cows: cool, rude, or a bit much? Comment below.',
      quiz: { q: 'Would you chat with a cow?', options: ['Cool', 'Rude', 'A bit much'], answer: 'Fun fact: a cow has one stomach with four separate parts.' },
      show: ['ground', 'barn', 'fence', 'cw', 'bub'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [4, 2.8, 8.5], look: [0, 3, 0], fov: 44, to: { pos: [-4, 2.8, 8.5], look: [0, 3, 0] } },
      update: (w, p, t) => { w.barn.position.set(-6, 0, -10); pose(w, -.4, 0, -Math.PI / 2 + .8, t); talk(w, t); },
    },
  ],
};
