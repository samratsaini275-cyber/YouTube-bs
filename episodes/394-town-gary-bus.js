// Narrative 22: "In This Town… (short format, cats first)". Gary episode (every fifth: 389, 394, 399, 404).
// Hook: the rule under 2 s; first frame shows Gary in a driver's cap at a bus steering wheel.

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
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.street = box(60, .05, 6, mat('#555B66'), [0, .03, 0]); w.lines = group(); for (let i = 0; i < 16; i++) box(1.5, .06, .15, mat('#FFFFFF'), [-30 + i * 4, .05, 0], w.lines);
  w.bus = group(); box(6, 2.4, 2.4, mat('#F2C94C'), [0, 1.6, 0], w.bus); for (let i = 0; i < 4; i++) box(.9, .8, .05, mat('#9FD3EE'), [-2 + i * 1.3, 2.2, 1.22], w.bus); box(.05, 1, 1.8, mat('#9FD3EE'), [3.02, 2.1, 0], w.bus); for (const x of [-2, 2]) for (const z of [-1.2, 1.2]) { const wh = cyl(.45, .45, .25, mat('#222222'), [x, .45, z], w.bus, 12); wh.rotation.x = Math.PI / 2; }
  w.cab = group(); box(.6, 1.2, 2.4, mat('#F2C94C'), [3.1, 1, 0], w.cab); box(.8, .3, 2.4, mat('#333333'), [2.9, 1.7, 0], w.cab); const ws = box(.05, 1.4, 2.2, mat('#9FD3EE', { glow: .2 }), [3.35, 2.6, 0], w.cab); ws.material.transparent = true; ws.material.opacity = .35; box(.1, .1, 2.4, mat('#F2C94C'), [3.35, 3.35, 0], w.cab); box(6, .2, 2.4, mat('#555555'), [0, .3, 0], w.cab);
  w.wheel = torus(.5, .06, mat('#222222'), [0, 0, 0]); w.wheel.rotation.set(0, Math.PI / 2, .4); w.seat = box(.8, .8, .8, mat('#3E6FD6'), [0, 0, 0]);
  w.g = gary(k, k.scene, 1.3, null);
  w.cap = group([.36, .52, 0], w.g); cyl(.2, .2, .1, mat('#1E2A5A'), [0, .05, 0], w.cap, 12); cyl(.22, .22, .02, mat('#111111'), [.08, 0, 0], w.cap, 12);
  w.crumbs = group(); for (let i = 0; i < 5; i++) { const cb = ball(.25, mat('#C98B3E'), [-12 + i * 5, .2, .5], w.crumbs); cb.scale.set(1.3, .7, 1); }
  w.ants = group(); for (let i = 0; i < 12; i++) { const a = gary(k, w.ants, .5, null); a.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '394',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BUS DRIVER GARY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'GARY DRIVES THE BUS'],
  title: 'In this town, Gary the ant drives the bus',
  description: 'He cannot see over the wheel. The bus stops at every crumb on the road. And the passengers? All ants. (A made-up comedy sketch.)',
  tags: ['inthistown', 'gary', 'ant', 'bus', 'funny', 'shorts'],
  sources: ['Quiz fact: Saharan desert ants keep track of how far they have walked by counting steps; ants given longer "stilt" legs overshot their nest, and ants with shortened legs stopped short (Wittlinger, Wehner and Wolf, "The ant odometer: stepping on stilts and stumps", Science, 2006).'],
  setup,
  scenes: [
    { say: 'In this town, Gary drives the bus.', show: ['ground', 'street', 'cab', 'wheel', 'seat', 'g', 'cap'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6.4, 2.6, 4.4], look: [2.4, 2.3, .4], fov: 46, to: { pos: [6.1, 2.6, 4.1], look: [2.4, 2.3, .4], fov: 44 } },
      update: (w, p, t) => { w.ants.visible = false; w.bus.position.set(0, 0, 0); w.seat.position.set(2.1, 1.2, .4); w.wheel.position.set(2.7, 2.2, .4); w.wheel.rotation.x = .3 * Math.sin(t * 2); gy(w, 2.15, 1.65, .4, 0, t, false, 1.2); w.g.rotation.z = .05 * Math.sin(t * 4); } },
    { say: 'He cannot see over the wheel.', label: 'BEEP?', show: ['ground', 'street', 'lines', 'cab', 'wheel', 'seat', 'g', 'cap'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [8, 3, 6], look: [1.5, 1.8, 0], fov: 50, to: { pos: [7.5, 3, 5.5], look: [1.5, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.lines.position.x = -(t * 6) % 4; w.cab.position.z = 0; w.seat.position.set(2.1, 1.2, .4); w.wheel.position.set(2.7, 2.2, .4); w.wheel.rotation.x = t * 2; gy(w, 2.15, 1.65 + .3 * Math.abs(Math.sin(t * 4)), .4, 0, t); w.wheel.position.y = 2.2; } },
    { say: 'The stops? Every crumb on the road.', label: 'SCREECH', show: ['ground', 'street', 'bus', 'crumbs', 'g', 'cap'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 15], look: [0, 1.6, 0], fov: 54, to: { pos: [2, 5, 14.5], look: [0, 1.6, 0], fov: 52 } },
      update: (w, p, t) => { w.bus.rotation.y = 0; w.bus.position.z = 0; const step = Math.floor(t / .9); const sub = (t % .9) / .9; const x = -10 + step * 5 + Math.min(1, sub * 1.6) * 5 - 5; w.bus.position.set(x, 0, -1.4); w.bus.rotation.z = sub > .6 && sub < .7 ? -.05 : 0; w.crumbs.position.z = 0; gy(w, x + 2.1, 1.65, -1, 0, t, false, 1.2); } },
    { say: 'And the passengers? All ants.', label: 'ALL ABOARD', show: ['ground', 'street', 'bus', 'ants', 'g', 'cap'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3, 9], look: [0, 1, 0], fov: 52, to: { pos: [2, 3, 8.5], look: [0, 1, 0], fov: 50 } },
      update: (w, p, t) => { w.ants.visible = true; w.bus.position.set(-1, 0, -1.4); gy(w, 1.1, 1.65, -1, 0, t, false, 1.2); w.ants.children.forEach(a => { const i = a.userData.i, q = Math.min(1, Math.max(0, p * 1.4 - i * .06)); a.position.set(3 - q * 2.6 + (i % 4) * .3, q > .9 ? 1 : 0, .4 + Math.floor(i / 4) * .35 - q * .6); a.rotation.y = Math.PI; scurry(a, t + i, 18); }); } },
    { say: 'Is Gary a good bus driver? Comment below.',
      quiz: { q: 'Bus driver Gary is…', options: ['Brilliant', 'Tiny', 'Too slow'], answer: 'Real desert ants count their steps to find their way home.' },
      show: ['ground', 'g', 'cap'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.ants.visible = false; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
