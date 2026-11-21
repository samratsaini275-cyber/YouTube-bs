// Narrative 11: "What Would Happen If… (season 3, with Gary)". Gary the ant (made up, recurring since 032) inside the best format.
// Hook: the premise as a question under 2 s; first frame shows a giant Gary towering over a tiny person in a park.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.park = group(); for (let i = 0; i < 5; i++) { cyl(.4, .5, 3, mat('#6B4B2E'), [-16 + i * 8, 1.5, -12], w.park, 8); ball(1.8, mat('#2E8B4A'), [-16 + i * 8, 4, -12], w.park); }
  w.g = gary(k, k.scene, 9); w.g.position.set(0, 0, 0);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.table = group([0, 0, 0]); box(4, .25, 2.2, mat('#C79A5B'), [0, 0, 0], w.table); box(4.2, .05, 2.4, mat('#E2453C'), [0, .15, 0], w.table);
  for (let i = 0; i < 4; i++) ball(.25, mat(['#FFD21F', '#22C55E', '#F97316', '#8B5CF6'][i]), [-1.2 + i * .8, .4, 0], w.table);
  w.h = house(k, k.scene); w.hs = w.h.root; w.h.legs.forEach(l => l.visible = false); w.h.eyes.forEach(e => e.visible = false); w.h.body.position.y = 0;
  w.riders = group(); for (let i = 0; i < 5; i++) { const r = gary(k, w.riders, 1.6, ['#E2453C', '#3B82F6', '#22C55E', '#FFD21F', '#8B5CF6'][i]); r.userData.i = i; }
  w.spider = group([0, 0, 0]); ball(.5, mat('#141414'), [0, .6, 0], w.spider); ball(.3, mat('#141414'), [.6, .55, 0], w.spider);
  for (const x of [.7, .7]) for (const z of [-.12, .12]) ball(.07, mat('#FFFFFF', { glow: .6 }), [.82, .65, z], w.spider);
  for (let i = 0; i < 4; i++) for (const z of [-1, 1]) seg(k, [-.2 + i * .2, .6, 0], [-.6 + i * .4, 0, z * 1], mat('#141414'), w.spider, .05);
  w.sweat = group(); for (let i = 0; i < 4; i++) { const d = ball(.35, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  return w;
}

const giant = (w, x, z, ry, t, move = false) => { w.g.position.set(x, 0, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 10); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '165',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GIANT GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY THE ANT', 'WERE GIANT?'],
  title: 'What would happen if Gary the ant were giant?',
  description: 'Picnics end fast. Hide and seek is hopeless. His friends ride him like a bus. And spiders are still terrifying. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'giant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary the ant were giant?',
      show: ['ground', 'park', 'g', 'pp'], sky: '#9ED2F3', lightAt: [0, 14, 8], lightDist: 34,
      cam: { pos: [6, 4, 30], look: [1.5, 5.4, 0], fov: 50, to: { pos: [5.5, 4, 27.5], look: [1.5, 5.4, 0], fov: 48 } },
      update: (w, p, t) => { giant(w, -1, 0, -.6, t, true); w.g.position.x = -1 + t * .6; w.pp.position.set(6, 0, 6); w.pp.rotation.set(0, -.4, 0); w.p.mouth.scale.y = 2.4; },
    },
    {
      say: 'Picnics? He takes the whole table.',
      show: ['ground', 'park', 'g', 'table'], sky: '#9ED2F3', lightAt: [0, 14, 8], lightDist: 34,
      cam: { pos: [8, 6, 30], look: [0, 9, 0], fov: 50, to: { pos: [7.5, 6, 28], look: [0, 9, 0], fov: 48 } },
      update: (w, p, t) => { giant(w, -6 + t * 3, 0, 0, t, true); w.table.position.set(w.g.position.x + 3, 6.3 + .3 * Math.sin(t * 6), 0); w.table.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Hide and seek? He hides behind a house. Still visible.',
      show: ['ground', 'park', 'g', 'hs', 'pp'], sky: '#9ED2F3', lightAt: [0, 14, 8], lightDist: 34,
      cam: { pos: [2, 5, 30], look: [0, 7, 0], fov: 50, to: { pos: [2, 5, 28], look: [0, 7, 0], fov: 48 } },
      update: (w, p, t) => {
        w.hs.position.set(0, 0, 2); w.hs.rotation.set(0, 0, 0); w.hs.scale.setScalar(1.4);
        giant(w, -1, -3, -.3, t); w.g.position.y = .2 * Math.sin(t * 2);
        w.pp.position.set(6, 0, 7); w.pp.rotation.set(0, -.8 + .4 * Math.sin(t * 2), 0); w.p.mouth.scale.y = 1.4;
      },
    },
    {
      say: 'His friends? They ride him like a bus.',
      show: ['ground', 'park', 'g', 'riders'], sky: '#9ED2F3', lightAt: [0, 14, 8], lightDist: 34,
      cam: { pos: [8, 9, 24], look: [0, 6, 0], fov: 48, to: { pos: [7.5, 9, 22], look: [0, 6, 0], fov: 46 } },
      update: (w, p, t) => {
        w.hs.scale.setScalar(1); giant(w, -3 + t * 2, 0, 0, t, true);
        w.riders.children.forEach(r => { const i = r.userData.i; r.position.set(w.g.position.x - 3.4 + i * 1.1, 4.4 + .15 * Math.sin(t * 8 + i), (i % 2 - .5) * .8); r.rotation.set(0, 0, 0); });
      },
    },
    {
      say: 'But spiders? Still absolutely terrifying.',
      show: ['ground', 'park', 'g', 'spider', 'sweat'], sky: '#9ED2F3', lightAt: [0, 14, 8], lightDist: 34,
      cam: { pos: [3, 4, 30], look: [-2, 5, 0], fov: 50, to: { pos: [2.5, 4, 28], look: [-2, 5, 0], fov: 48 } },
      shake: (t) => t > .8 ? .08 : 0,
      update: (w, p, t) => {
        const run = t > .8; giant(w, -2 - (run ? (t - .8) * 6 : 0), 0, run ? Math.PI : -.3, t, run); w.g.position.y = run ? .5 * Math.abs(Math.sin(t * 10)) : 0;
        w.spider.position.set(6, 0, 4); w.spider.rotation.set(0, Math.PI, 0); w.spider.scale.setScalar(1.6);
        w.sweat.children.forEach(d => { const q = (t * 1.5 + d.userData.i / 4) % 1; d.position.set(w.g.position.x + 3 + (d.userData.i - 1.5) * .7, 6.2 - q * 2.4, 1.2); });
      },
    },
    {
      say: 'Giant Gary: cool, great, or a disaster? Comment below.',
      quiz: { q: 'Would you want a giant Gary?', options: ['Cool', 'Great', 'A disaster'], answer: 'Gary is made up. He is still regular size. Probably.' },
      show: ['ground', 'park', 'g'], sky: '#274B73', lightAt: [0, 14, 8], lightDist: 34,
      cam: { pos: [10, 2, 26], look: [0, 9, 0], fov: 46, to: { pos: [-10, 2, 26], look: [0, 9, 0] } },
      update: (w, p, t) => { giant(w, -2, 0, -.6, t); },
    },
  ],
};
