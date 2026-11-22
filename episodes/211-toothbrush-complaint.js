// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: toothbrushes do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the toothbrush with a face.

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

function brush(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  cyl(.38, .32, 6, mat('#22C55E', { rough: .3 }), [0, 3, 0], b.body, 14);
  cyl(.22, .22, 1.2, mat('#22C55E', { rough: .3 }), [0, 6.6, 0], b.body, 10);
  b.head = group([0, 7.4, 0], b.body); box(.5, 1.3, .35, mat('#22C55E', { rough: .3 }), [0, 0, 0], b.head);
  b.bristles = group([0, 0, .3], b.head); for (let i = 0; i < 4; i++) for (const x of [-.12, .12]) cyl(.07, .07, .45, mat('#E7F6FF'), [x, -.45 + i * .3, 0], b.bristles, 6).rotation.x = Math.PI / 2;
  b.paste = group([0, 0, .62], b.head); for (let i = 0; i < 4; i++) { const p = ball(.16, mat(i % 2 ? '#FFFFFF' : '#7FD3F0'), [0, -.4 + i * .26, 0], b.paste); p.scale.set(1.2, 1, 1); }
  b.face = group([0, 3.6, .38], b.body);
  for (const x of [-.2, .2]) { ball(.17, mat('#FFFFFF'), [x, .2, 0], b.face); ball(.085, mat('#111111'), [x, .2, .12], b.face); }
  b.brows = [-.2, .2].map(x => box(.24, .05, .05, mat('#111111'), [x, .44, .05], b.face));
  b.mouth = box(.3, .08, .05, mat('#5A1E1E'), [0, -.15, .03], b.face);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(b, a) { b.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.sink = k.ground('#F4F7FA', 0);
  w.wall = box(60, 30, .5, mat('#CDE9F2'), [0, 15, -5]); w.wall.castShadow = false;
  w.mirror = box(8, 7, .1, mat('#E7F6FF', { metal: .6, rough: .1 }), [0, 9, -4.7]); w.mirror.castShadow = false;
  w.b = brush(k, k.scene); w.tb = w.b.root;
  w.cup = group(); const cu = cyl(1.3, 1.1, 3, mat('#FFC21F'), [0, 1.5, 0], w.cup, 20); cu.material.transparent = true; cu.material.opacity = .85;
  w.others = group(); ['#E2453C', '#3B82F6', '#A855F7'].forEach((c, i) => { const g = group([(i - 1) * .55, 0, -.3 + (i % 2) * .4], w.others); cyl(.3, .26, 6, mat(c), [0, 3, 0], g, 10); box(.45, 1.2, .3, mat(c), [0, 6.8, 0], g); g.rotation.z = (i - 1) * .2; });
  w.foam = group(); for (let i = 0; i < 12; i++) { const f = ball(.25, mat('#FFFFFF'), [0, 0, 0], w.foam); f.userData.i = i; f.castShadow = false; }
  w.tooth = group(); for (let i = 0; i < 4; i++) { const t = box(.8, 1, .6, mat('#FFFFFF'), [-1.3 + i * .85, 0, 0], w.tooth); t.userData.i = i; }
  w.c = cat(k, k.scene, '#F2994A'); w.ct = w.c.root; w.c.crown.visible = false;
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.18, m, [-.11, 0, 0], h); ball(.18, m, [.11, 0, 0], h); const c = k.cone(.24, .35, m, [0, -.2, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const stand = (w, x, y, z, rz, t, on = true) => { w.tb.position.set(x, y, z); w.tb.rotation.set(0, 0, rz); w.b.body.position.set(0, 0, 0); talk(w.b, t, on); };

export default {
  id: '211',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TOOTHBRUSH',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS TOOTHBRUSH', 'HAS A COMPLAINT'],
  title: 'This toothbrush has a complaint',
  description: 'Shoved in a mouth twice a day. Minty foam everywhere. And he shares a cup with three other brushes. So the toothbrush found a new job. (A made-up comedy sketch.)',
  tags: ['funny', 'toothbrush', 'bathroom', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: dentists recommend replacing a toothbrush about every three to four months, or sooner if the bristles are frayed (American Dental Association, MouthHealthy, "Toothbrushes").',
  ],
  setup,
  scenes: [
    {
      say: 'This toothbrush has a complaint.',
      show: ['sink', 'wall', 'mirror', 'tb'], sky: '#CDE9F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 4.4, 8], look: [0, 4.4, 0], fov: 46, to: { pos: [1.3, 4.4, 7.2], look: [0, 4.4, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, t); grump(w.b, .35); w.b.paste.visible = false; },
    },
    {
      say: 'Twice a day, into a mouth.',
      show: ['sink', 'wall', 'tb', 'tooth', 'foam'], sky: '#CDE9F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 5.6, 10], look: [0, 4.3, 0], fov: 52, to: { pos: [1.3, 5.6, 9.2], look: [0, 4.3, 0], fov: 50 } },
      update: (w, p, t) => {
        stand(w, .4 * Math.sin(t * 14), 0, 0, 0, t); grump(w.b, .55); w.b.paste.visible = true; w.tooth.position.set(0, 8.6, .4); w.tooth.children.forEach(c => c.position.y = .15 * Math.sin(t * 6 + c.userData.i));
        w.foam.children.forEach(f => { const i = f.userData.i, q = (t * 1.4 + i / 12) % 1; f.position.set(Math.cos(i * 2) * (.6 + q * 1.8), 7.6 + Math.sin(i * 3) * .6 - q * 1.2, .5 + Math.sin(i) * .3); f.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'Minty foam, right in the face.',
      show: ['sink', 'wall', 'mirror', 'tb', 'foam'], sky: '#CDE9F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 4, 8], look: [0, 3.5, 0], fov: 46, to: { pos: [1.3, 4, 7.2], look: [0, 3.5, 0], fov: 44 } },
      update: (w, p, t) => {
        stand(w, 0, 0, 0, 0, t); grump(w.b, -.3); w.b.paste.visible = false; w.b.mouth.scale.y = 2.6;
        w.foam.children.forEach(f => { const i = f.userData.i, a = i / 12 * Math.PI * 2; f.position.set(Math.cos(a) * .55, 3.7 + Math.sin(a) * .7 + Math.min(1, t) * 0, .55); f.scale.setScalar(Math.min(1, t * 2) * (.8 + .3 * Math.sin(i))); });
      },
    },
    {
      say: 'And he shares a cup. With three others.',
      show: ['sink', 'wall', 'mirror', 'tb', 'cup', 'others'], sky: '#CDE9F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.6, 5.6, 11], look: [0, 3.6, 0], fov: 46, to: { pos: [1.5, 5.6, 10.2], look: [0, 3.6, 0], fov: 44 } },
      update: (w, p, t) => { w.cup.position.set(0, 0, 0); w.others.position.set(0, .3, 0); stand(w, 0, .3, .55, .05 * Math.sin(t * 8), t); grump(w.b, .6); w.b.paste.visible = false; },
    },
    {
      say: 'So now, he only brushes the cat.',
      show: ['sink', 'wall', 'tb', 'ct', 'hearts'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 2.6, 10], look: [-.6, 1.5, 0], fov: 46, to: { pos: [1.9, 2.6, 9.2], look: [-.6, 1.5, 0], fov: 44 } },
      update: (w, p, t) => {
        w.ct.position.set(-1.2, 0, 0); w.ct.scale.setScalar(2.2); w.ct.rotation.y = -.9; w.c.tail.rotation.z = .6 + .3 * Math.sin(t * 4);
        stand(w, -2.5 + .15 * Math.sin(t * 8), 0, 2.4, -.45 + .1 * Math.sin(t * 8), t, false); w.tb.scale.setScalar(.42); w.b.mouth.scale.y = 1.5; grump(w.b, -.35); w.b.paste.visible = false;
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .6 + i / 4) % 1; h.position.set(-.4 + (i % 2) * 1, 3.4 + q * 2, .2); h.scale.setScalar(Math.sin(q * Math.PI) * 1.4); });
      },
    },
    {
      say: 'Grumpy toothbrush: use it, rinse it, or retire it? Comment below.',
      quiz: { q: 'What do you do with the grumpy toothbrush?', options: ['Use it', 'Rinse it', 'Retire it'], answer: 'Fun fact: dentists say to replace a toothbrush every three to four months.' },
      show: ['sink', 'wall', 'mirror', 'tb'], sky: '#274B73', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [5, 4, 7], look: [0, 3.3, 0], fov: 46, to: { pos: [-5, 4, 7], look: [0, 3.3, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, t, false); w.tb.scale.setScalar(1); grump(w.b, -.2); w.b.paste.visible = false; },
    },
  ],
};
