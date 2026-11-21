// Narrative 10: "What Would Happen If… (season 2)". Follow-up to 075 (trees could walk, ~1K views); talking-thing premise like 068 (fridge could talk, ~1K).
// A made-up comedy sketch: trees do not talk. Hook: the premise as a question under 2 s; first frame shows a tree with a face.

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
function dogTalk(d, t, on = true) { d.mouth.scale.y = on ? 1 + 4 * Math.abs(Math.sin(t * 14)) : 1; d.tail.rotation.x = .7 * Math.sin(t * 15); }

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function tree(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const t = { root: group([0, 0, 0], parent) };
  cyl(1.1, 1.4, 6, mat('#7A5230', { rough: .9 }), [0, 3, 0], t.root, 14);
  t.canopy = group([0, 7.2, 0], t.root); for (const [x, y, z, r] of [[0, 0, 0, 3], [-2, -.6, .4, 2.2], [2, -.5, .3, 2.3], [0, 1.4, -.4, 2.2]]) ball(r, mat('#2E8B4A'), [x, y, z], t.canopy);
  t.branch = group([1.1, 2.0, .2], t.root); cyl(.25, .3, 3, mat('#7A5230'), [1.4, 0, 0], t.branch, 8).rotation.z = Math.PI / 2;
  for (const x of [-.4, .4]) { ball(.3, mat('#FFFFFF'), [x, 3.6, 1.15], t.root); ball(.15, mat('#111111'), [x, 3.6, 1.42], t.root); }
  t.brows = [-.4, .4].map(x => { const b = box(.45, .08, .05, mat('#3A2A1A'), [x, 4.05, 1.3], t.root); return b; });
  t.mouth = box(.8, .12, .05, mat('#3A1A10'), [0, 2.7, 1.35], t.root);
  return t;
}
const say = (tr, t, on = true) => { tr.mouth.scale.y = on ? 1 + 3 * Math.abs(Math.sin(t * 12)) : 1; };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.park = group(); for (let i = 0; i < 4; i++) { cyl(.35, .45, 3, mat('#6B4B2E'), [-12 + i * 8, 1.5, -10], w.park, 8); ball(1.8, mat('#3E9B4F'), [-12 + i * 8, 4, -10], w.park); }
  w.t = tree(k, k.scene); w.tr = w.t.root;
  w.kid = person(k, k.scene, '#E2453C'); w.kd = w.kid.root;
  w.leaves = group(); for (let i = 0; i < 20; i++) { const l = box(.3, .03, .2, mat(['#E2853C', '#E2453C', '#FFD21F'][i % 3]), [0, 0, 0], w.leaves); l.userData.i = i; l.castShadow = false; }
  w.d = dog(k, k.scene); w.dg = w.d.root;
  w.bird = group([0, 0, 0]); const bb = ball(.3, mat('#E2453C'), [0, 0, 0], w.bird); bb.scale.set(1.3, 1, 1); ball(.2, mat('#222222'), [.3, .2, 0], w.bird); const bk = k.cone(.07, .35, mat('#FFD21F'), [.55, .2, 0], w.bird, 6); bk.rotation.z = -Math.PI / 2;
  w.bubble = group(); for (let i = 0; i < 3; i++) { const s = ball(.5, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.bubble); s.scale.set(1.5, 1, .3); s.userData.i = i; s.castShadow = false; }
  return w;
}

const base = (w) => { w.tr.position.set(0, 0, 0); w.tr.rotation.set(0, 0, 0); w.t.brows.forEach((b, i) => b.rotation.z = 0); w.t.canopy.rotation.z = 0; };
const bub = (w, x, y, on = true) => { w.bubble.visible = on; w.bubble.children.forEach(b => { const i = b.userData.i; b.position.set(x + i * .6, y + i * .6, 1); b.scale.set(1.5 * (1 - i * .25), 1 - i * .25, .3); }); };

export default {
  id: '163',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TALKING TREE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF TREES', 'COULD TALK?'],
  title: 'What would happen if trees could talk?',
  description: 'Climbing comes with complaints. Autumn gets very dramatic. Dogs get a firm no. And the woodpecker finally gets told off. (A made-up talking tree.)',
  tags: ['whatif', 'funny', 'tree', 'talkingtree', 'nature', 'shorts'],
  sources: [
    'Comedy sketch: talking trees are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if trees could talk?',
      show: ['ground', 'park', 'tr', 'bubble'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.4, 3, 12], look: [0, 3.8, 0], fov: 46, to: { pos: [.3, 3, 11], look: [0, 3.75, 0], fov: 44 } },
      update: (w, p, t) => { base(w); say(w.t, t, t > .2); bub(w, 1.6, 6.4, t > .3); },
    },
    {
      say: 'Climbing? It complains the whole time.',
      show: ['ground', 'park', 'tr', 'kd'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [2.4, 3.4, 12], look: [1.2, 3.4, 0], fov: 48, to: { pos: [2.2, 3.4, 11], look: [1.2, 3.4, 0], fov: 46 } },
      update: (w, p, t) => {
        base(w); say(w.t, t); w.t.brows[0].rotation.z = -.3; w.t.brows[1].rotation.z = .3; w.bubble.visible = false;
        w.kd.position.set(2.7, 2.15, .3); w.kd.rotation.set(0, -.4, .1 * Math.sin(t * 4)); w.kd.scale.setScalar(.7); w.kid.mouth.scale.y = 1.5;
      },
    },
    {
      say: 'Autumn? It gets very dramatic about it.',
      show: ['ground', 'park', 'tr', 'leaves'], sky: '#F2C48A', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.4, 3.6, 13], look: [0, 4.6, 0], fov: 48, to: { pos: [.3, 3.6, 12], look: [0, 4.6, 0], fov: 46 } },
      update: (w, p, t) => {
        base(w); say(w.t, t); w.t.brows[0].rotation.z = .35; w.t.brows[1].rotation.z = -.35; w.t.canopy.rotation.z = .05 * Math.sin(t * 3); w.tr.rotation.z = .03 * Math.sin(t * 3);
        w.leaves.children.forEach(l => { const i = l.userData.i; const q = (t * .35 + i / 20) % 1; l.position.set(-3 + (i * 1.3) % 6 + Math.sin(q * 8 + i) * .5, 8 - q * 8, .5 + (i % 3) * .6); l.rotation.set(q * 6, i, q * 4); });
      },
    },
    {
      say: 'Dogs? It says no. Very firmly.',
      show: ['ground', 'park', 'tr', 'dg', 'bubble'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [2, 3.2, 12], look: [.8, 3.4, 0], fov: 48, to: { pos: [1.8, 3.2, 11], look: [.8, 3.4, 0], fov: 46 } },
      shake: (t) => t > .8 && t < 1.4 ? .05 : 0,
      update: (w, p, t) => {
        base(w); say(w.t, t, t > .7); w.t.brows[0].rotation.z = -.4; w.t.brows[1].rotation.z = .4; w.tr.scale.setScalar(1);
        const back = t > 1.2 ? Math.min(2, (t - 1.2) * 4) : 0; w.dg.position.set(2.4 + back, 0, 1.6); w.dg.rotation.set(0, Math.PI, 0); w.d.head.rotation.set(0, 0, 0); w.d.body.rotation.set(0, 0, 0);
        w.d.tail.rotation.x = .2; bub(w, -2.8, 6, t > .7);
      },
    },
    {
      say: 'And the woodpecker? It finally gets told off.',
      show: ['ground', 'park', 'tr', 'bird'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [2.4, 3.4, 9.5], look: [.8, 3.4, 0], fov: 46, to: { pos: [2.2, 3.4, 8.7], look: [.8, 3.4, 0], fov: 44 } },
      update: (w, p, t) => {
        base(w); w.bubble.visible = false; const told = t > 1.1; say(w.t, t, told); w.t.brows[0].rotation.z = -.4; w.t.brows[1].rotation.z = .4;
        w.bird.position.set(1.45 + (told ? Math.min(1.5, (t - 1.1) * 2) : .1 * Math.abs(Math.sin(t * 20))), 3.0, .8); w.bird.rotation.set(0, Math.PI, told ? .5 : 0);
      },
    },
    {
      say: 'A talking tree: cool, great, or a nightmare? Comment below.',
      quiz: { q: 'Would you want a talking tree?', options: ['Cool', 'Great', 'A nightmare'], answer: 'Talking trees are made up. They are just listening.' },
      show: ['ground', 'park', 'tr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [.4, 1.6, 11], look: [0, 6.2, 0], fov: 46, to: { pos: [-1.4, 1.6, 11], look: [0, 6.2, 0] } },
      update: (w, p, t) => { base(w); say(w.t, t, false); },
    },
  ],
};
