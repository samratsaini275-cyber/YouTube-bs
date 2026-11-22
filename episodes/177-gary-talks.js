// Narrative 11: "What Would Happen If… (season 3, with Gary)". Gary-led (every third). Talking-animal premise (cats could text, 363).
// Hook: the premise as a question under 2 s; first frame shows Gary on a picnic table chatting up at a startled person's face, speech bubbles rising.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.table = group(); box(14, .4, 7, mat('#C79A5B'), [0, 3, 0], w.table); for (const x of [-6, 6]) for (const z of [-3, 3]) cyl(.25, .25, 3, mat('#8B6B43'), [x, 1.5, z], w.table, 8);
  w.g = gary(k, k.scene, 1.6, '#FFC21F');
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root; w.pp.scale.setScalar(1.6);
  w.bub = group(); for (let i = 0; i < 3; i++) { const b = ball(.18, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.bub); b.userData.i = i; b.castShadow = false; }
  w.cube = box(1.8, 1.8, 1.8, mat('#FFFFFF', { rough: .9 }), [0, 0, 0]);
  w.crumb = box(.35, .25, .35, mat('#D9A95B'), [0, 0, 0]);
  w.shoe = group(); box(3.6, 1.2, 1.6, mat('#3A3A3A'), [0, 0, 0], w.shoe); box(3.8, .3, 1.7, mat('#F2F2F2'), [0, -.7, 0], w.shoe); box(1.4, 2.6, 1.4, mat('#2F6FD6'), [-.9, 1.8, 0], w.shoe);
  w.can = group(); cyl(.6, .6, 2.4, mat('#E2453C'), [0, 1.2, 0], w.can, 18); cyl(.25, .25, .5, mat('#DDDDDD'), [0, 2.65, 0], w.can, 10); box(1.2, .9, .05, mat('#FFFFFF'), [0, 1.2, .61], w.can);
  w.paper = box(.7, .9, .03, mat('#FFFFFF', { glow: .2 }), [0, 0, 0]);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.6, .12, .1, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  return w;
}

const g = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const talk = (w, t, on = true) => { w.bub.visible = on; if (!on) return; w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(); w.g.localToWorld(v.set(.5, .6, 0));
  w.bub.children.forEach(b => { const i = b.userData.i, q = (t * 1.2 + i / 3) % 1; b.position.set(v.x + q * .8, v.y + .2 + q * 1.4, v.z); b.scale.setScalar(.3 + q * .9); }); w.g.rotation.z = .06 * Math.sin(t * 14); };
const human = (w, x, z, ry, mouth = 1) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.mouth.scale.y = mouth; w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '177',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY CAN TALK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY COULD', 'TALK TO HUMANS?'],
  title: 'What would happen if Gary the ant could talk to humans?',
  description: 'He asks nicely for picnic crumbs. He shouts a warning before every shoe. He files complaints about ant spray. And his jokes are tiny. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'talking', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: ants communicate mainly with chemical signals called pheromones (general entomology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary could talk to us?',
      show: ['ground', 'table', 'cube', 'g', 'pp', 'bub'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [1.2, 5.6, 12], look: [1, 6.15, 0], fov: 50, to: { pos: [1.1, 5.6, 11.2], look: [1, 6.15, 0], fov: 48 } },
      update: (w, p, t) => { w.cube.position.set(-.4, 4.1, 1.5); g(w, -.4, 5, 1.5, -.7, t); talk(w, t); human(w, 2.6, -4.6, -.5, 2.6); },
    },
    {
      say: 'Picnics? He asks nicely for one crumb.',
      show: ['ground', 'table', 'cube', 'g', 'pp', 'crumb'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [1.2, 5.6, 12], look: [1, 6.15, 0], fov: 50, to: { pos: [1.1, 5.6, 11.2], look: [1, 6.15, 0], fov: 48 } },
      update: (w, p, t) => {
        w.bub.visible = false; w.cube.position.set(-.6, 4.1, 1.5); g(w, -.6, 5, 1.5, -.5, t); w.g.rotation.z = -.25 * Math.max(0, Math.sin(t * 3)); human(w, 2.4, -4.6, -.5, 1);
        const q = Math.min(1, Math.max(0, t - .6)); w.crumb.position.set(1.6 - q * 1.8, 6.4 - q * 1.2, -3.6 + q * 5.1);
      },
    },
    {
      say: 'Shoes? He shouts a warning first.',
      show: ['ground', 'g', 'shoe', 'bub'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [2, 2, 9], look: [0, 3, 0], fov: 50, to: { pos: [2, 2, 8.4], look: [0, 3, 0], fov: 48 } },
      shake: (t) => .03,
      update: (w, p, t) => { g(w, -.8, .05, 1.4, -.5, t); talk(w, t * 2); w.g.position.y = .15 * Math.abs(Math.sin(t * 10)); const y = t < .7 ? 8 - t * 7 : 3.1 + .1 * Math.sin(t * 20); w.shoe.position.set(1.4, y, 0); },
    },
    {
      say: 'Ant spray? He files a complaint.',
      show: ['ground', 'table', 'g', 'can', 'paper'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [1.5, 4.4, 7], look: [.5, 4.6, 0], fov: 46, to: { pos: [1.3, 4.4, 6.4], look: [.5, 4.6, 0], fov: 44 } },
      update: (w, p, t) => {
        w.bub.visible = false; g(w, -.7, 3.2, 1.2, -.3, t); w.can.position.set(1.6, 3.2, -.2);
        w.paper.position.set(.3, 4.2 + .05 * Math.sin(t * 6), 1.4); w.paper.rotation.set(0, -.3, .1 * Math.sin(t * 4));
      },
    },
    {
      say: 'But his jokes? Tiny. And terrible.',
      show: ['ground', 'table', 'cube', 'g', 'pp', 'bub', 'zz'], sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [1.2, 5.6, 12], look: [1, 6.15, 0], fov: 50, to: { pos: [1.1, 5.6, 11.2], look: [1, 6.15, 0], fov: 48 } },
      update: (w, p, t) => {
        w.cube.position.set(-.4, 4.1, 1.5); g(w, -.4, 5, 1.5, -.7, t); talk(w, t); human(w, 2.6, -4.6, -.5, 1.6); w.p.head.rotation.z = .25;
        const v = new w.pp.position.constructor(); w.p.head.getWorldPosition(v);
        w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .6 + i / 3) % 1; z.position.set(v.x + .9 + q * .8, v.y + 1 + q * 1.6, v.z); z.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'Talking Gary: cute, annoying, or a genius? Comment below.',
      quiz: { q: 'Would you chat with Gary?', options: ['Cute', 'Annoying', 'Genius'], answer: 'Real ants mostly talk with smells called pheromones. No jokes. Probably.' },
      show: ['ground', 'table', 'g', 'bub'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [3, 4.2, 5], look: [0, 4, 0], fov: 44, to: { pos: [-3, 4.2, 5], look: [0, 4, 0] } },
      update: (w, p, t) => { w.zz.visible = false; g(w, 0, 3.2, 0, -Math.PI / 2 + .9, t); talk(w, t); },
    },
  ],
};
