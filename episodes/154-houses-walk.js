// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; premise in the family of 075 (trees could walk, ~1K views).
// A made-up comedy sketch: houses do not walk. Hook: the premise as a question under 2 s; first frame shows a house walking on legs.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function house(k, parent, wall = '#F2D9B8', roofc = '#B3262E') {
  const { mat, box, cyl, ball, cone, group } = k;
  const h = { root: group([0, 0, 0], parent) };
  h.body = group([0, 2.2, 0], h.root);
  box(4, 3.4, 3.4, mat(wall), [0, 1.7, 0], h.body);
  const r = cone(3.2, 2.2, mat(roofc), [0, 4.5, 0], h.body, 4); r.rotation.y = Math.PI / 4;
  box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], h.body);
  h.eyes = [-1.1, 1.1].map(x => { const g = group([x, 2.4, 1.72], h.body); box(.9, .9, .08, mat('#FFFFFF'), [0, 0, 0], g); ball(.2, mat('#111111'), [0, 0, .08], g); return g; });
  h.legs = [-1, 1].map(x => { const l = group([x, 2.2, 0], h.root); cyl(.28, .28, 2.2, mat('#6B4B2E'), [0, -1.1, 0], l, 10); box(.8, .3, 1.1, mat('#3A2A1A'), [0, -2.2, .25], l); return l; });
  return h;
}
function walk(h, t, sp = 6, on = true) { h.legs.forEach((l, i) => { l.rotation.x = on ? .5 * Math.sin(t * sp + i * Math.PI) : 0; }); h.body.position.y = 2.2 + (on ? .15 * Math.abs(Math.sin(t * sp)) : 0); h.body.rotation.z = on ? .04 * Math.sin(t * sp) : 0; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.street = group(); box(60, .02, 3, mat('#C9C2B4'), [0, .02, 4], w.street).castShadow = false;
  for (let i = 0; i < 5; i++) { cyl(.3, .4, 2.6, mat('#6B4B2E'), [-14 + i * 7, 1.3, -6], w.street, 8); ball(1.4, mat('#2E8B4A'), [-14 + i * 7, 3.4, -6], w.street); }
  w.h = house(k, k.scene); w.hs = w.h.root;
  w.h2 = house(k, k.scene, '#BFD8E8', '#3B5BA8'); w.hs2 = w.h2.root;
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.box1 = group([0, 0, 0]); box(1, .8, .8, mat('#C79A5B'), [0, .4, 0], w.box1); box(.8, .6, .7, mat('#C79A5B'), [0, 1.1, 0], w.box1);
  w.beach = group(); box(60, .05, 30, mat('#F2DFA0'), [0, .03, 0], w.beach).castShadow = false; box(60, .1, 30, mat('#3E8FC4', { rough: .2 }), [0, .02, -20], w.beach);
  w.umb = group([3, 0, 1]); cyl(.06, .06, 3, mat('#FFFFFF'), [0, 1.5, 0], w.umb, 6); cone(1.6, .7, mat('#E2453C'), [0, 3.1, 0], w.umb, 12);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.45, .45, .08, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  w.stars = group(); for (let i = 0; i < 12; i++) { const s = ball(.08, mat('#FFFFFF', { glow: 2 }), [-10 + (i * 1.7) % 20, 8 + (i % 4), -10], w.stars); }
  return w;
}

const place = (h, x, z, ry) => { h.root.position.set(x, 0, z); h.root.rotation.set(0, ry, 0); h.eyes.forEach(e => e.scale.set(1, 1, 1)); };

export default {
  id: '154',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WALKING HOUSE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HOUSES', 'COULD WALK?'],
  title: 'What would happen if houses could walk?',
  description: 'Moving day takes five minutes. Bad neighbours just leave. Holidays come with the house. And at night, it snores. (A made-up walking house.)',
  tags: ['whatif', 'funny', 'house', 'walkinghouse', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: houses do not walk; this is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if houses could walk?',
      show: ['ground', 'street', 'hs'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 3.4, 16], look: [0, 5.6, 0], fov: 46, to: { pos: [1, 3.4, 14.5], look: [0, 5.5, 0], fov: 44 } },
      update: (w, p, t) => { place(w.h, -1 + t * .6, 0, .3); walk(w.h, t); },
    },
    {
      say: 'Moving day? The house just walks there.',
      show: ['ground', 'street', 'hs', 'pp', 'box1'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 4.6, 19], look: [0, 3.8, 0], fov: 50, to: { pos: [0, 4.6, 18], look: [1, 3.8, 0], fov: 48 } },
      update: (w, p, t) => {
        place(w.h, -2 + t * 2.2, 0, Math.PI / 2 - .3); walk(w.h, t, 8);
        w.pp.position.set(-2.5, 0, 3); w.pp.rotation.set(0, .5, 0); w.p.mouth.scale.y = 2; w.box1.position.set(-1.4, 0, 3.4);
      },
    },
    {
      say: 'Annoying neighbours? Your house moves away.',
      show: ['ground', 'street', 'hs', 'hs2'], sky: '#9ED2F3', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 5, 20], look: [0, 4.4, 0], fov: 50, to: { pos: [0, 5, 19], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => {
        place(w.h2, 3.4, -.5, -.3); walk(w.h2, t, 6, false); w.h2.eyes.forEach(e => e.scale.set(1, .4, 1)); w.h2.body.rotation.z = .05 * Math.sin(t * 9);
        const go = t > .8; place(w.h, -3 - (go ? (t - .8) * 2.4 : 0), 0, go ? -Math.PI / 2 + .3 : .3); walk(w.h, t, 8, go);
      },
    },
    {
      say: 'Holidays? The house comes too.',
      show: ['ground', 'beach', 'umb', 'hs'], sky: '#8FD3F5', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 3.4, 15], look: [.4, 4.4, 0], fov: 48, to: { pos: [1, 3.4, 14], look: [.4, 4.4, 0], fov: 46 } },
      update: (w, p, t) => { place(w.h, -1.2, 0, .3); walk(w.h, t, 6, false); w.h.body.rotation.z = .04 * Math.sin(t * 2); w.h.legs.forEach((l, i) => l.rotation.z = (i ? -1 : 1) * .25); },
    },
    {
      say: 'And at night? It snores. Loudly.',
      show: ['ground', 'street', 'hs', 'zz', 'stars'], sky: '#16203F', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1, 3.4, 15], look: [0, 5.2, 0], fov: 46, to: { pos: [1, 3.4, 14], look: [0, 5.2, 0], fov: 44 } },
      shake: (t) => .01 + .02 * Math.abs(Math.sin(t * 2)),
      update: (w, p, t) => {
        w.h.legs.forEach(l => l.rotation.z = 0); place(w.h, 0, 0, .2); walk(w.h, t, 6, false); w.h.eyes.forEach(e => e.scale.set(1, .12, 1));
        w.h.body.scale.set(1, 1 + .04 * Math.sin(t * 2), 1);
        w.zz.children.forEach(z => { const q = (t * .5 + z.userData.i / 3) % 1; z.position.set(1.8 + q * 1.4, 8 + q * 2.4, .5); z.scale.setScalar(.6 + q); z.rotation.z = .5; });
      },
    },
    {
      say: 'A walking house: cool, great, or a nightmare? Comment below.',
      quiz: { q: 'Would you want a house that walks?', options: ['Cool', 'Great', 'A nightmare'], answer: 'Walking houses are made up. Yours is staying put.' },
      show: ['ground', 'street', 'hs'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 1.4, 14], look: [0, 7, 0], fov: 46, to: { pos: [-1.5, 1.4, 14], look: [0, 7, 0] } },
      update: (w, p, t) => { w.h.body.scale.set(1, 1, 1); place(w.h, 0, 0, .2); walk(w.h, t, 4); },
    },
  ],
};
