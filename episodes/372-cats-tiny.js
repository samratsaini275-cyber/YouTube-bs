// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a tiny cat sitting inside a teacup.

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


function setup(k) {
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#F6E7C8'), [0, 8, -4], w.wall);
  w.table = group(); box(8, .3, 5, mat('#A06A3E'), [0, 2.2, 0], w.table); for (const x of [-3.6, 3.6]) for (const z of [-2.2, 2.2]) cyl(.15, .15, 2.2, mat('#7A4E2E'), [x, 1.1, z], w.table, 8);
  w.cup = group(); cyl(.9, .6, 1, mat('#FFFFFF'), [0, .5, 0], w.cup, 20); const inner = cyl(.82, .82, .05, mat('#C9A27A'), [0, .95, 0], w.cup, 20); const hd = torus(.32, .08, mat('#FFFFFF'), [1, .55, 0], w.cup); hd.rotation.set(0, 0, 0); cyl(1.3, 1.3, .08, mat('#FFFFFF'), [0, .04, 0], w.cup, 24);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.mouse = group(); const mb = ball(.5, mat('#9A9AA2'), [0, .45, 0], w.mouse); mb.scale.set(1.4, 1, 1); ball(.35, mat('#9A9AA2'), [.7, .55, 0], w.mouse); for (const z of [-1, 1]) { ball(.18, mat('#F4A6B8'), [.6, .9, z * .25], w.mouse); ball(.05, mat('#111111'), [.98, .62, z * .15], w.mouse); } ball(.06, mat('#F4A6B8'), [1.05, .52, 0], w.mouse); const tl = cyl(.03, .03, 1.2, mat('#F4A6B8'), [-1, .5, 0], w.mouse, 6); tl.rotation.z = Math.PI / 2 - .3;
  w.crumbs = group(); for (let i = 0; i < 5; i++) { const cb = ball(.08, mat('#C98B3E'), [0, 0, 0], w.crumbs); cb.userData.i = i; }
  w.plate = cyl(1.2, 1.1, .1, mat('#FFFFFF'), [0, 0, 0], undefined, 24); w.cake = cyl(.6, .6, .5, mat('#F7C6D4'), [0, 0, 0], undefined, 16);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };

export default {
  id: '372',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TINY CATS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WERE TINY?'],
  title: 'What would happen if cats were tiny?',
  description: 'Your cat lives in a teacup. A mouse chases the cat. And it still knocks things off the table, one crumb at a time. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'tiny', 'shorts'],
  sources: ['Comedy sketch: tiny cats are made up. Quiz fact: the Singapura is often described as the smallest cat breed; adult females can weigh around 2 kilograms (Cat Fanciers\' Association, "Singapura" breed profile).'],
  setup,
  scenes: [
    { say: 'What if cats were tiny?', show: ['floor', 'wall', 'table', 'cup', 'cr'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.5, 4.6, 7.5], look: [0, 4.25, 0], fov: 46, to: { pos: [1.4, 4.4, 6.8], look: [0, 4.25, 0], fov: 44 } },
      update: (w, p, t) => { w.cup.position.set(0, 2.35, 0); ctAt(w, -.15, 3.05, 0, -1.3, .32); w.c.head.rotation.z = .1 * Math.sin(t * 2); } },
    { say: 'It lives in a teacup.', label: 'SIP?', show: ['floor', 'wall', 'table', 'cup', 'cr'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 5, 7], look: [0, 3, 0], fov: 48, to: { pos: [2.8, 5, 6.5], look: [0, 3, 0], fov: 46 } },
      update: (w, p, t) => { w.cup.position.set(0, 2.35, 0); ctAt(w, -.1, 2.85, 0, -1.1, .32); w.c.eyes.forEach(e => e.scale.y = .2); w.c.head.rotation.z = -.3; w.c.body.scale.set(1.4, 1 + .03 * Math.sin(t * 2), 1); } },
    { say: 'A mouse? It chases the cat.', label: 'SQUEAK!', show: ['floor', 'wall', 'table', 'cr', 'mouse'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 6, 9], look: [0, 2.6, 0], fov: 50, to: { pos: [1, 6, 8.5], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.c.body.scale.set(1.4, 1, 1); const x = -3 + p * 6; ctAt(w, x + 1.6, 2.35, 0, 0, .3); w.cr.position.y = 2.35 + .15 * Math.abs(Math.sin(t * 14)); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .4 : 1.5); w.mouse.position.set(x - .4, 2.35, 0); w.mouse.scale.setScalar(.8); w.mouse.position.y = 2.35 + .1 * Math.abs(Math.sin(t * 14 + 1)); } },
    { say: 'And it still knocks things off the table. One crumb at a time.', label: 'BOOP', show: ['floor', 'wall', 'table', 'cr', 'crumbs', 'plate', 'cake'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 4, 7], look: [2.4, 2.4, 0], fov: 50, to: { pos: [2, 4, 6.5], look: [2.4, 2.4, 0], fov: 48 } },
      update: (w, p, t) => { w.plate.position.set(1.4, 2.4, .6); w.cake.position.set(1.4, 2.7, .6); ctAt(w, 2.6, 2.35, 1.4, 0, .3); w.c.paw.position.set(1.4, .5 + .3 * Math.abs(Math.sin(t * 3)), .9); w.cr.updateWorldMatrix(true, true); const pw = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.crumbs.children.forEach(cb => { const i = cb.userData.i, q = ((t * .7 - i * .45) % 3 + 3) % 3; const fall = Math.max(0, q - .5); cb.scale.setScalar(2); cb.position.set(pw.x + .2 + Math.min(q, .5) * .8, 2.45 - fall * fall * 2, pw.z); cb.visible = cb.position.y > .05; }); } },
    { say: 'Tiny cats: cool, cute, or way too small? Comment below.',
      quiz: { q: 'Tiny cats are…', options: ['Cool', 'Cute', 'Way too small'], answer: 'Made up. But the Singapura, one of the smallest cat breeds, can weigh about 2 kilos.' },
      show: ['floor', 'table', 'cup', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.5, 4.2, 5], look: [0, 3, 0], fov: 46, to: { pos: [-1.5, 4.2, 5], look: [0, 3, 0] } },
      update: (w, p, t) => { w.cup.position.set(0, 2.35, 0); ctAt(w, -.15, 2.9, 0, -1.3, .32); w.c.head.rotation.z = .1 * Math.sin(t * 2); } },
  ],
};
