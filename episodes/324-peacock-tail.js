// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864). Season finale.
// A made-up comedy sketch: people do not have peacock tails. Hook: the premise as a question under 2 s; first frame shows a person with a huge open peacock fan.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#B9D98A', 0);
  w.wall = group(); box(40, 20, .5, mat('#E3EEF8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#2E8F8A'); w.pp = w.p.root;
  w.fan = group([0, 1.2, -.8], w.pp); w.feathers = [];
  for (let i = 0; i < 15; i++) { const a = -1.35 + i / 14 * 2.7; const f = group([0, 0, 0], w.fan); const st = cyl(.03, .03, 3.6, mat('#7A9A3A'), [0, 1.8, 0], f, 4); const vane = ball(.5, mat('#2E8F6A'), [0, 3.3, 0], f); vane.scale.set(.75, 1.2, .1); const ring = ball(.3, mat('#F2C94C', { glow: .2 }), [0, 3.35, .05], f); ring.scale.set(.8, 1, .1); const eye = ball(.18, mat('#1E4FA0', { glow: .3 }), [0, 3.35, .09], f); eye.scale.set(.8, 1, .1); f.userData.a = a; f.rotation.z = a; w.feathers.push(f); }
  w.bus = group(); box(9, 3.6, 3, mat('#F2B21F'), [0, 1.8, 0], w.bus); for (let i = 0; i < 4; i++) box(1.4, 1.1, .1, mat('#9FD3EE'), [-3.2 + i * 2.1, 2.5, 1.52], w.bus); w.seats = group(); for (let i = 0; i < 3; i++) box(1, .2, 1, mat('#3B6FD6'), [-1.2 + i * 1.2, 1, 0], w.seats);
  w.wind = group(); for (let i = 0; i < 6; i++) { const l = box(1.4, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.wind); l.userData.i = i; l.castShadow = false; }
  w.crowd = group(); for (let i = 0; i < 3; i++) { const c = person(k, w.crowd, ['#E2453C', '#9B59B6', '#3B6FD6'][i]); c.root.position.set([-3.6, 3.6, 5.6][i], 0, 3.5); c.root.rotation.y = Math.PI + [-.4, .4, .6][i]; c.root.scale.setScalar(.9); }
  w.sparkle = group(); for (let i = 0; i < 10; i++) { const s = ball(.1, mat('#FFE45C', { glow: .9 }), [0, 0, 0], w.sparkle); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, y, z, ry) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); w.pp.rotation.z = 0; };
const open = (w, q) => w.feathers.forEach(f => { f.rotation.z = f.userData.a * q; f.scale.setScalar(.35 + .65 * q); });

export default {
  id: '324',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PEACOCK TAIL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD PEACOCK TAILS?'],
  title: 'What would happen if humans had peacock tails? (season finale)',
  description: 'Feeling proud? The fan pops open. A bus seat? You need three. And a windy day? You turn into a kite. (A made-up body upgrade. Season finale.)',
  tags: ['whatif', 'funny', 'peacock', 'tail', 'comedy', 'shorts'],
  sources: ['Comedy sketch: peacock tails on people are made up. Quiz fact: only male peafowl, called peacocks, grow the long colourful train; peahens do not (Encyclopaedia Britannica, "peafowl").'],
  setup,
  scenes: [
    { say: 'What if humans had peacock tails?', show: ['floor', 'wall', 'pp', 'fan'], sky: '#E3EEF8', lightAt: [0, 7, 6], lightDist: 16,
      cam: { pos: [0, 3.6, 13], look: [0, 5, 0], fov: 50, to: { pos: [0, 3.6, 12.3], look: [0, 5, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0); pose(w.p, .4); open(w, 1); w.fan.rotation.z = .05 * Math.sin(t * 3); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); w.p.mouth.scale.set(1.3, 1.6, 1); } },
    { say: 'Feeling proud? It pops open.', label: '*FWOOSH*', show: ['floor', 'wall', 'pp', 'fan', 'crowd', 'sparkle'], sky: '#E3EEF8', lightAt: [0, 7, 6], lightDist: 18,
      cam: { pos: [0, 4.5, 16], look: [0, 4, 0], fov: 52, to: { pos: [0, 4.5, 15.2], look: [0, 4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0); const q = Math.min(1, Math.max(0, (p - .3) * 5)); open(w, q); pose(w.p, .4 + q * 1.8); w.p.head.rotation.x = -.15 * q; w.sparkle.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2 + t; s.position.set(Math.cos(a) * 3.5, 4.5 + Math.sin(a) * 2.5, -.4); s.visible = q >= 1; }); } },
    { say: 'A bus seat? You need three.', show: ['floor', 'pp', 'fan', 'bus', 'seats'], sky: '#E3EEF8', lightAt: [0, 7, 6], lightDist: 18,
      cam: { pos: [0, 3.4, 9], look: [0, 3, 0], fov: 54, to: { pos: [0, 3.4, 8.4], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.bus.position.set(0, 0, -3); w.seats.position.set(0, 0, -.6); stand(w, 0, .4, 0, 0); pose(w.p, .4); open(w, .9); w.fan.rotation.x = -.3; w.p.mouth.scale.set(1.3, .6, 1); w.p.eyes.forEach(e => e.scale.set(1, .6, 1)); } },
    { say: 'And a windy day? You become a kite.', label: 'WHEEE!', show: ['floor', 'wall', 'pp', 'fan', 'wind'], sky: '#BCD3E8', lightAt: [0, 7, 6], lightDist: 18,
      cam: { pos: [0, 5, 16], look: [0, 6, 0], fov: 54, to: { pos: [0, 5, 15.2], look: [0, 6, 0], fov: 52 } },
      update: (w, p, t) => { w.fan.rotation.x = 0; const lift = Math.max(0, p - .25) * 9; stand(w, Math.sin(t * 2) * 1.2, lift, 0, 0); w.pp.rotation.z = .3 * Math.sin(t * 3); open(w, 1); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.6)); w.p.mouth.scale.set(1.3, 3, 1); w.p.eyes.forEach(e => e.scale.setScalar(1.4)); w.wind.children.forEach(l => { const i = l.userData.i, q = (t * 1.5 + i / 6) % 1; l.position.set(-6 + q * 12, 2 + (i % 3) * 2.5 + lift * .6, 1); }); } },
    { say: 'Peacock tails: fancy, cool, or way too much? Comment below.',
      quiz: { q: 'Would you want a peacock tail?', options: ['Fancy', 'Cool', 'Way too much'], answer: 'Made up for people. Only male peafowl, the peacocks, grow the long train.' },
      show: ['floor', 'pp', 'fan'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [1, 1.5, 16], look: [0, 5.4, 0], fov: 56, to: { pos: [-1, 1.5, 16], look: [0, 5.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, .2); pose(w.p, .4); open(w, 1); w.fan.rotation.z = .05 * Math.sin(t * 3); } },
  ],
};
