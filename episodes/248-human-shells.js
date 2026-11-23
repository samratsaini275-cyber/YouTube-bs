// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people do not have shells. Hook: the premise as a question under 2 s; first frame shows a person with a shell.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, .2, .64], p.head); ball(.07, mat('#111111'), [x, .2, .76], p.head); }
  p.shell = group([0, 1.8, -.95], p.root); const sh = ball(1.5, mat('#4E8A3A', { rough: .6 }), [0, 0, 0], p.shell); sh.scale.set(1, 1.25, .55); for (let i = 0; i < 6; i++) { const pl = ball(.42, mat('#6FAE4E'), [Math.cos(i) * .6, Math.sin(i * 1.7) * .9, -.7], p.shell); pl.scale.z = .3; }
  return p;
}
const duck = (p, f) => { p.head.position.y = 3.3 - 1.4 * f; p.head.position.z = -.4 * f; };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.room = group(); box(40, 20, .5, mat('#FFE6B8'), [0, 10, -4], w.room);
  w.street = group(); box(40, .05, 8, mat('#9AA3AE'), [0, .03, 0], w.street); box(40, 20, .5, mat('#C9D6E3'), [0, 10, -5], w.street);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root; w.p2 = person(k, k.scene, '#E2453C'); w.pp2 = w.p2.root;
  w.rain = group(); for (let i = 0; i < 40; i++) { const d = box(.04, .4, .04, mat('#7FB8FF', { glow: .3 }), [0, 0, 0], w.rain); d.userData.i = i; d.castShadow = false; }
  w.hill = group(); const hl = box(40, 1, 12, mat('#7FB069'), [0, 0, 0], w.hill); hl.rotation.z = .35; w.hill.position.set(0, 3, -2);
  w.turtle = group(); const ts = ball(1.2, mat('#4E8A3A'), [0, .9, 0], w.turtle); ts.scale.set(1.3, .7, 1.1); ball(.45, mat('#9CC46A'), [1.6, .7, 0], w.turtle); for (const z of [-.2, .2]) ball(.08, mat('#111111'), [1.95, .85, z], w.turtle);
  return w;
}

const stand = (w, P, pp, x, z, ry, y = 0) => { pp.position.set(x, y, z); pp.rotation.set(0, ry, 0); P.head.rotation.set(0, 0, 0); duck(P, 0); };

export default {
  id: '248',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN SHELL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD SHELLS?'],
  title: 'What would happen if humans had shells?',
  description: 'Rain is no problem. Bumping into people is fine. The commute is downhill. But falling over is forever. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'turtle', 'shell', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human shells are made up.'],
  setup,
  scenes: [
    { say: 'What if humans had shells?', show: ['ground', 'room', 'pp'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2.6, 2.6, 9], look: [0, 3.95, 0], fov: 48, to: { pos: [2.4, 2.6, 8.3], look: [0, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .6); } },
    { say: 'Rain? Just pull your head in.', show: ['ground', 'street', 'pp', 'rain'], sky: '#8FA3B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.6, 3, 9], look: [0, 3, 0], fov: 48, to: { pos: [1.5, 3, 8.4], look: [0, 3, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .4); duck(w.p, Math.min(1, Math.max(0, t - .6) * 2)); w.rain.children.forEach(d => { const i = d.userData.i, q = (t * 1.4 + i / 40) % 1; d.position.set(-4 + (i * 1.9) % 8, 7 - q * 7, -2 + (i % 5)); }); } },
    { say: 'Bump into someone? Bonk. No harm done.', label: '*BONK*', show: ['ground', 'street', 'pp', 'pp2'], sky: '#C9D6E3', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 3.4, 11], look: [0, 2.6, 0], fov: 48, to: { pos: [0, 3.4, 10.2], look: [0, 2.6, 0], fov: 46 } },
      update: (w, p, t) => { const q = Math.min(1, t / 1); const back = Math.max(0, t - 1) * 2; stand(w, w.p, w.pp, -3 + q * 1.8 - Math.min(1, back) * .8, 0, Math.PI); stand(w, w.p2, w.pp2, 3 - q * 1.8 + Math.min(1, back) * .8, 0, 0); } },
    { say: 'The commute? Roll down the hill. Fastest way to work.', show: ['ground', 'hill', 'pp'], sky: '#9ED2F3', lightAt: [0, 8, 4], lightDist: 20,
      cam: { pos: [2, 6, 18], look: [0, 3, 0], fov: 52, to: { pos: [2, 6, 17], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { const cx = -4.5 + p * 9, cy = 3.53 - cx * .365 + 1.4, a = -t * 5; stand(w, w.p, w.pp, 0, 1.6, 0); duck(w.p, 1); w.pp.rotation.set(0, 0, a); w.pp.position.set(cx + 1.8 * Math.sin(a), cy - 1.8 * Math.cos(a), 1.6); } },
    { say: 'But fall on your back? You are stuck there. Forever.', label: 'DAY 3', show: ['ground', 'room', 'pp', 'turtle'], sky: '#FFE6B8', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 6, 8], look: [0, .8, 0], fov: 48, to: { pos: [1, 5.6, 7.4], look: [0, .8, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, 0, 1.3); w.pp.rotation.set(-Math.PI / 2 + .1 * Math.sin(t * 6), 0, .1 * Math.sin(t * 4)); w.pp.position.z = 1.4; w.turtle.position.set(-2.6, 0, 1); w.turtle.rotation.y = -.5; } },
    { say: 'A shell: useful, awesome, or too heavy? Comment below.',
      quiz: { q: 'Would you want a shell?', options: ['Useful', 'Awesome', 'Too heavy'], answer: 'Human shells are made up. Turtles keep theirs.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [2, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, w.p, w.pp, 0, 0, .6); duck(w.p, Math.max(0, Math.sin(t * 2)) * .8); } },
  ],
};
