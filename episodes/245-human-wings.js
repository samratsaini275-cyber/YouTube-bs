// Narrative 15: "What Would Happen If… (season 5)". Same format as 063–082; body-upgrade premise like 147 (trunks, 803 views) and 076 (tails).
// A made-up comedy sketch: people do not have wings. Hook: the premise as a question under 2 s; first frame shows a person with wings.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.wings = [-1, 1].map(s => { const g = group([s * .5, 2.2, -.6], p.root); const f = ball(1, mat('#FFFFFF', { rough: .9 }), [s * 1.5, .3, 0], g); f.scale.set(1.7, .9, .12); const f2 = ball(1, mat('#EEF2F6', { rough: .9 }), [s * 1.2, -.3, .05], g); f2.scale.set(1.3, .6, .1); g.userData.s = s; return g; });
  return p;
}
const flap = (p, t, sp = 9, amp = .6) => p.wings.forEach(g => { g.rotation.set(0, g.userData.s * .3, g.userData.s * amp * Math.sin(t * sp)); });
const fold = p => p.wings.forEach(g => g.rotation.set(0, g.userData.s * 1.1, -g.userData.s * .5));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.road = group(); box(80, .05, 8, mat('#555B63'), [0, .03, 0], w.road); for (let i = 0; i < 12; i++) box(1.6, .06, .2, mat('#FFFFFF'), [-20 + i * 4, .05, 0], w.road);
  w.cars = group(); for (let i = 0; i < 6; i++) { const c = group([-12 + i * 5, 0, (i % 2 ? 2 : -2)], w.cars); box(3, 1, 1.6, mat(['#E2453C', '#3B82F6', '#FFC21F'][i % 3]), [0, .8, 0], c); box(1.6, .8, 1.4, mat('#BFE3F7'), [-.2, 1.6, 0], c); }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.p2 = person(k, k.scene, '#E2453C'); w.pp2 = w.p2.root; w.p3 = person(k, k.scene, '#22A06B'); w.pp3 = w.p3.root;
  w.shop = group(); box(40, 20, .5, mat('#F3F0E8'), [0, 10, -4], w.shop); for (const z of [-2.6]) { box(8, .15, 1.2, mat('#C8CED6'), [0, 1.4, z], w.shop); box(8, .15, 1.2, mat('#C8CED6'), [0, 2.8, z], w.shop); }
  w.cans = group(); for (let i = 0; i < 14; i++) { const c = cyl(.22, .22, .5, mat(['#E2453C', '#3B82F6', '#FFC21F', '#22C55E'][i % 4]), [0, 0, 0], w.cans, 12); c.userData.i = i; }
  w.pigeon = group(); const pg = ball(.9, mat('#8A94A6'), [0, 1, 0], w.pigeon); pg.scale.set(1.3, 1, 1); ball(.55, mat('#6B7585'), [1, 1.8, 0], w.pigeon); cone(.15, .4, mat('#FFC21F'), [1.55, 1.75, 0], w.pigeon, 8).rotation.z = -Math.PI / 2; for (const z of [-.25, .25]) { ball(.12, mat('#FF8A1F'), [1.4, 1.95, z], w.pigeon); const br = box(.35, .06, .1, mat('#111111'), [1.35, 2.15, z], w.pigeon); br.rotation.z = z > 0 ? .4 : -.4; }
  w.wire = group(); cyl(.04, .04, 40, mat('#222222'), [0, 7, 0], w.wire, 6).rotation.z = Math.PI / 2; for (const x of [-12, 12]) cyl(.25, .25, 8, mat('#6B4B2E'), [x, 4, 0], w.wire, 8);
  return w;
}

const stand = (w, x, z, ry, y = 0) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '245',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN WING',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD WINGS?'],
  title: 'What would happen if humans had wings?',
  description: 'Traffic is gone. Shopping is a disaster. And the pigeons are not happy about it. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'wings', 'comedy', 'animation', 'shorts'],
  sources: ['Comedy sketch: human wings are made up.'],
  setup,
  scenes: [
    { say: 'What if humans had wings?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 2.6, 9.5], look: [0, 3.95, 0], fov: 48, to: { pos: [.7, 2.6, 8.8], look: [0, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, .25); flap(w.p, t, 6, .4); } },
    { say: 'Traffic? Gone. Everyone flies to work.', show: ['ground', 'road', 'cars', 'pp', 'pp2', 'pp3'], sky: '#9ED2F3', lightAt: [0, 6, 4], lightDist: 20,
      cam: { pos: [4, 5, 18], look: [0, 6.4, 0], fov: 52, to: { pos: [3.6, 5, 17], look: [0, 6.6, 0], fov: 50 } },
      update: (w, p, t) => { for (const [pp, P, x0, y, z, ph] of [[w.pp, w.p, -8, 6, 0, 0], [w.pp2, w.p2, -12, 8, -2, 1], [w.pp3, w.p3, -4, 9.5, 1, 2]]) { pp.position.set(x0 + t * 4, y + .3 * Math.sin(t * 3 + ph), z); pp.rotation.set(.6, Math.PI / 2, 0); flap(P, t + ph, 10, .7); } } },
    { say: 'Shopping? Your wings knock everything over.', show: ['ground', 'shop', 'pp', 'cans'], sky: '#F3F0E8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 3, 9], look: [0, 2.4, -1], fov: 50, to: { pos: [2.7, 3, 8.4], look: [0, 2.4, -1], fov: 48 } },
      update: (w, p, t) => { stand(w, -2 + Math.min(1, t / 1.5) * 3, -.6, Math.PI / 2); const hit = t > 1.1; if (hit) flap(w.p, t, 12, .5); else fold(w.p); w.cans.children.forEach(c => { const i = c.userData.i; const q = hit ? Math.min(1.4, (t - 1.1 - (i % 7) * .05) * 1.5) : 0; const sx = -3 + (i % 7), sy = i < 7 ? 1.75 : 3.15; c.position.set(sx + q * .6, Math.max(.22, sy + q * 1.2 - q * q * 3), -2.6 + q * 2.4); c.rotation.set(q * 3, 0, q * (i % 3)); }); } },
    { say: 'And the pigeons? Very, very annoyed.', show: ['ground', 'wire', 'pigeon', 'pp'], sky: '#9ED2F3', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [2, 6.6, 8], look: [0, 7.4, 0], fov: 48, to: { pos: [1.8, 6.6, 7.2], look: [0, 7.4, 0], fov: 46 } },
      update: (w, p, t) => { w.pigeon.position.set(-1.6, 7, 0); w.pigeon.rotation.y = -.3; w.pigeon.position.y += .05 * Math.abs(Math.sin(t * 6)); stand(w, 1.6, 0, -.6, 3.5); flap(w.p, t, 2, .2); w.pp.position.y = 7 - 2.2; } },
    { say: 'They had the sky first.', label: '*NO HUMANS*', show: ['ground', 'wire', 'pigeon'], sky: '#9ED2F3', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [2.6, 7.6, 4.5], look: [-1, 8.2, 0], fov: 44, to: { pos: [2.4, 7.6, 4], look: [-1, 8.2, 0], fov: 43 } },
      update: (w, p, t) => { w.pigeon.position.set(-1.6, 7, 0); w.pigeon.rotation.y = -.5; w.pigeon.rotation.z = .1 * Math.sin(t * 8); } },
    { say: 'Wings: useful, awesome, or too many feathers? Comment below.',
      quiz: { q: 'Would you want wings?', options: ['Useful', 'Awesome', 'Too many feathers'], answer: 'Human wings are made up. Pigeons keep theirs.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-.8, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .25); flap(w.p, t, 6, .5); } },
  ],
};
