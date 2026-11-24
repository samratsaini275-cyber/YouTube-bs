// Narrative 16: "What Would Happen If… (season 6)". Animal-scale premise (270 tiny dogs, 167 giant cats).
// Hook: the premise as a question under 2 s; first frame shows a giraffe the size of a mug on a desk.

function giraffe(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const y = mat('#F2B84B', { rough: .8 }), sp = mat('#8B5A2B');
  const g = { root: group([0, 0, 0], parent) };
  const body = ball(.8, y, [0, 2, 0], g.root); body.scale.set(1.4, .8, .7);
  for (const [x, yy, z] of [[.4, 2.3, .5], [-.5, 2.1, .52], [0, 1.8, .54], [.6, 1.9, -.5], [-.3, 2.3, -.52]]) { const s = ball(.16, sp, [x, yy, z], g.root); s.scale.z = .3; }
  for (const [x, z] of [[-.8, -.3], [-.8, .3], [.8, -.3], [.8, .3]]) cyl(.12, .1, 1.7, y, [x, .85, z], g.root, 8);
  g.neck = group([.9, 2.3, 0], g.root); const n = cyl(.18, .24, 2.2, y, [0, 1.1, 0], g.neck, 10); for (let i = 0; i < 3; i++) { const s = ball(.12, sp, [0, .5 + i * .6, .2], g.neck); s.scale.z = .3; }
  g.neck.rotation.z = -.35;
  g.head = group([0, 2.3, 0], g.neck); const hd = ball(.35, y, [.25, 0, 0], g.head); hd.scale.set(1.5, .9, .9); for (const z of [-.12, .12]) { cyl(.04, .04, .3, y, [0, .35, z], g.head, 6); ball(.07, sp, [0, .5, z], g.head); }
  for (const z of [-1, 1]) { ball(.07, mat('#FFFFFF'), [.4, .1, z * .26], g.head); ball(.04, mat('#111111'), [.44, .1, z * .3], g.head); }
  g.head.rotation.z = .35;
  return g;
}
function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.desk = k.ground('#C8955A', 0);
  w.wall = group(); box(30, 14, .3, mat('#E6EEF5'), [0, 7, -3], w.wall);
  w.gf = giraffe(k, k.scene); w.gr = w.gf.root;
  w.mug = group(); cyl(.9, .8, 1.8, mat('#3B6FD6'), [0, .9, 0], w.mug, 18); const h = k.torus(.4, .12, mat('#3B6FD6'), [1, .9, 0], w.mug); h.rotation.set(0, 0, 0);
  w.plant = group(); cyl(1, .8, 1.4, mat('#B5651D'), [0, .7, 0], w.plant, 16); for (let i = 0; i < 6; i++) { const l = ball(.6, mat('#3FA34D'), [Math.cos(i) * .6, 2 + (i % 3) * .5, Math.sin(i) * .6], w.plant); l.scale.set(1, .4, .6); l.userData.i = i; }
  w.shelf = group(); box(4, .2, 1.5, mat('#8B5A2B'), [0, 6.5, 0], w.shelf); w.jar = group(); cyl(.7, .7, 1.4, mat('#CFE8F7', { opacity: .6 }), [0, .7, 0], w.jar, 16); for (let i = 0; i < 4; i++) cyl(.25, .25, .08, mat('#C8955A'), [Math.sin(i) * .3, .2 + i * .25, Math.cos(i) * .3], w.jar, 12);
  w.pencil = group(); const pc = cyl(.3, .3, 7, mat('#FFC21F'), [0, 3.5, 0], w.pencil, 6); cone(.3, .8, mat('#E8C49A'), [0, 7.4, 0], w.pencil, 6); cyl(.3, .3, .4, mat('#FF7FA0'), [0, .2, 0], w.pencil, 6);
  w.scarf = group(); const sc = k.torus(.28, .1, mat('#E2453C'), [0, 0, 0], w.scarf); const tail = box(.2, .7, .08, mat('#E2453C'), [.15, -.35, .25], w.scarf); tail.rotation.z = .2;
  w.qs = group(); for (let i = 0; i < 1; i++) { const q = group([0, 0, 0], w.qs); const qm = mat('#FFC21F', { glow: .8 }); k.torus(.35, .1, qm, [0, .4, 0], q).rotation.x = 0; ball(.12, qm, [0, -.25, 0], q); q.traverse(o => o.castShadow = false); }
  return w;
}

export default {
  id: '276',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY GIRAFFES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GIRAFFES', 'WERE TINY?'],
  title: 'What would happen if giraffes were tiny?',
  description: 'Tall trees become houseplants. The top shelf is still out of reach. Hide and seek happens behind a pencil. And the neck is perfect for a tiny scarf. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'giraffe', 'tiny', 'animals', 'shorts'],
  sources: ['Comedy sketch: tiny giraffes are made up. Quiz fact: giraffes are the tallest land animals and have seven neck bones, the same number as people (Smithsonian National Zoo).'],
  setup,
  scenes: [
    { say: 'What if giraffes were tiny?', show: ['desk', 'wall', 'gr', 'mug', 'pencil'], sky: '#E6EEF5', lightAt: [0, 8, 6], lightDist: 24,
      cam: { pos: [1, 4, 14], look: [.4, 4.6, 0], fov: 52, to: { pos: [1, 4, 13], look: [.4, 4.6, 0], fov: 50 } },
      update: (w, p, t) => { w.gr.position.set(-.8, 0, .8); w.gr.rotation.y = -.5; w.gr.scale.setScalar(1); w.gf.head.rotation.z = .35 + .1 * Math.sin(t * 2); w.mug.position.set(2.6, 0, -1); w.mug.scale.setScalar(3.2); w.pencil.position.set(-2.6, 0, -1.4); w.pencil.rotation.set(0, 0, 0); } },
    { say: 'Tall trees? Now a houseplant.', show: ['desk', 'wall', 'gr', 'plant'], sky: '#E6EEF5', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1, 3.4, 10], look: [.4, 3, 0], fov: 50, to: { pos: [1, 3.4, 9.3], look: [.4, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.plant.position.set(2.2, 0, 0); w.gr.position.set(-.8, 0, 0); w.gr.rotation.y = 0; w.gf.neck.rotation.z = -.55; w.gf.head.rotation.z = .4 + .25 * Math.abs(Math.sin(t * 5)); w.plant.children.forEach(l => { if (l.userData.i !== undefined) l.visible = !(l.userData.i < 3 && p > .3 + l.userData.i * .2); }); } },
    { say: 'The top shelf? Still out of reach.', show: ['desk', 'wall', 'gr', 'shelf', 'jar'], sky: '#E6EEF5', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 4, 11.5], look: [0, 4, 0], fov: 54, to: { pos: [0, 4, 10.8], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { w.shelf.position.set(.8, 0, -.8); w.jar.position.set(1.2, 6.6, -.8); w.gr.position.set(-1.2, 0, 0); w.gr.rotation.y = 0; const st = .5 + .5 * Math.sin(t * 3); w.gf.neck.rotation.z = -.1 + st * .1; w.gf.neck.scale.y = 1 + st * .25; w.gf.head.rotation.z = -.2; w.gr.position.y = st * .3; } },
    { say: 'Hide and seek? Behind a pencil.', show: ['desk', 'wall', 'gr', 'pencil', 'qs'], sky: '#E6EEF5', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [0, 4, 11], look: [0, 4, 0], fov: 52, to: { pos: [0, 4, 10.3], look: [0, 4, 0], fov: 50 } },
      update: (w, p, t) => { w.gf.neck.scale.y = 1; w.mug.scale.setScalar(1); w.pencil.position.set(0, 0, .8); w.gr.position.set(.1, 0, -.4); w.gr.rotation.y = Math.PI / 2; w.gf.neck.rotation.z = 0; w.gf.head.rotation.z = 0; w.qs.position.set(2.4, 6 + .2 * Math.sin(t * 4), 0); } },
    { say: 'And their necks? Perfect for a tiny scarf.', show: ['desk', 'wall', 'gr', 'scarf'], sky: '#FFE0C2', lightAt: [0, 8, 6], lightDist: 20,
      cam: { pos: [1.4, 4, 9], look: [.6, 3.8, 0], fov: 48, to: { pos: [1.3, 4, 8.4], look: [.6, 3.8, 0], fov: 46 } },
      update: (w, p, t) => { w.gr.position.set(-.4, 0, 0); w.gr.rotation.y = -.4; w.gf.neck.rotation.z = -.3; w.gf.neck.scale.y = 1; w.gf.head.rotation.z = .3 + .08 * Math.sin(t * 3); const v = new w.k.THREE.Vector3(0, 1.4, 0); w.gf.neck.updateWorldMatrix(true, false); v.applyMatrix4(w.gf.neck.matrixWorld); w.scarf.position.copy(v); w.scarf.rotation.set(Math.PI / 2, 0, -.3 - .4); } },
    { say: 'Tiny giraffes: adorable, silly, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny giraffe?', options: ['Adorable', 'Silly', 'Best pet ever'], answer: 'Made up. Real giraffes have seven neck bones, like us.' },
      show: ['desk', 'gr'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.5, 10], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1.5, 10], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.gr.position.set(0, 0, 0); w.gr.rotation.y = -.6; w.gf.neck.rotation.z = -.35; w.gf.head.rotation.z = .35 + .1 * Math.sin(t * 2); } },
  ],
};
