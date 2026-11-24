// Narrative 18: "What Would Happen If… (season 8)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a blue mail cap with a satchel.

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


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#B9D98A', 0);
  w.wall = group(); box(30, 14, .3, mat('#F0E3CF'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.cap = group([.36, .52, 0], w.g); const cp = ball(.2, mat('#2E5FB0'), [0, 0, 0], w.cap); cp.scale.y = .6; box(.16, .03, .26, mat('#1E3F80'), [.18, -.02, 0], w.cap);
  w.bag = group([0, .3, .24], w.g); box(.3, .22, .08, mat('#8B5A2B'), [0, 0, 0], w.bag); box(.3, .06, .085, mat('#6E4420'), [0, .09, 0], w.bag);
  w.env = group(); box(1.4, .9, .04, mat('#FFFFFF'), [0, 0, 0], w.env); const fl = box(1.42, .04, .045, mat('#DDDDDD'), [0, .2, .01], w.env); fl.rotation.z = .55; const fl2 = box(1.42, .04, .045, mat('#DDDDDD'), [0, .2, .01], w.env); fl2.rotation.z = -.55; box(.2, .24, .05, mat('#E2453C'), [.5, .28, .01], w.env);
  w.mbox = group(); cyl(.08, .08, 3.6, mat('#555555'), [0, 1.8, 0], w.mbox, 8); box(.9, .7, 1.4, mat('#2E5FB0'), [0, 3.9, 0], w.mbox); w.flag = box(.05, .5, .2, mat('#E2453C'), [.48, 4.1, .4], w.mbox);
  w.cal = group(); w.pages = []; for (let i = 0; i < 8; i++) { const pg = group([0, 0, 0], w.cal); box(.9, 1.1, .02, mat('#FFFFFF'), [0, 0, 0], pg); box(.9, .25, .025, mat('#E2453C'), [0, .43, 0], pg); pg.userData.i = i; w.pages.push(pg); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '323',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'POSTMAN GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'DELIVERED MAIL?'],
  title: 'What would happen if Gary the ant delivered the mail?',
  description: 'One letter is bigger than he is. The mailbox? Way too high. And your delivery date? Next year. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'mail', 'funny', 'shorts'],
  sources: ['Quiz fact: ants send messages to each other with chemical signals called pheromones, for example laying scent trails that lead nestmates to food (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary delivered mail?', show: ['floor', 'wall', 'g', 'cap', 'bag'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); } },
    { say: 'One letter? Bigger than him.', show: ['floor', 'wall', 'g', 'cap', 'bag', 'env'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6.5], look: [0, 1, 0], fov: 48, to: { pos: [0, 1.8, 6], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { const x = -1.2 + p * 1.6; gy(w, x, 0, .3, -1.4 + Math.PI / 2 - 1.4, t, true); w.g.rotation.y = 0; w.g.rotation.z = .15 * Math.sin(t * 4); w.env.position.set(x + .2, 1.15 + .05 * Math.sin(t * 8), .3); w.env.rotation.z = .25 * Math.sin(t * 4); } },
    { say: 'The mailbox? Way too high.', show: ['floor', 'wall', 'g', 'cap', 'bag', 'env', 'mbox'], sky: '#F0E3CF', lightAt: [0, 6, 4], lightDist: 18,
      cam: { pos: [0, 2.6, 8.5], look: [0, 2.2, 0], fov: 52, to: { pos: [0, 2.6, 8], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { w.g.rotation.z = 0; w.mbox.position.set(.6, 0, -.5); const hop = p > .3 ? .5 * Math.abs(Math.sin(t * 7)) : 0; gy(w, -.2, hop, .3, -1.4, t); w.g.rotation.x = 0; w.env.position.set(-.1, 1.1 + hop + (p > .75 ? -(p - .75) * 4 : 0), .4); w.env.rotation.set(0, 0, p > .75 ? (p - .75) * 6 : .2); w.env.visible = w.env.position.y > .1; } },
    { say: 'And your delivery? Next year.', label: 'SO LATE!', show: ['floor', 'wall', 'g', 'cap', 'bag', 'cal'], sky: '#F0E3CF', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.8, 6.5], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.8, 6], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -.6 + p * .3, 0, .4, 0, t, true); w.cal.position.set(1, 2, -.5); w.pages.forEach(pg => { const i = pg.userData.i, q = Math.max(0, (t * 1.2 - i * .3)) % 2; pg.position.set(q * 1.2, -q * 1.5, q * .5); pg.rotation.set(q * 1.5, 0, q * 2); pg.visible = true; }); } },
    { say: 'Postman Gary: fast, tiny, or totally lost? Comment below.',
      quiz: { q: 'Postman Gary is…', options: ['Fast', 'Tiny', 'Totally lost'], answer: 'Real ants send messages with scent trails called pheromones.' },
      show: ['floor', 'g', 'cap', 'bag'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
