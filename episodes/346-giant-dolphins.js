// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a dolphin bigger than a house leaping past it.

function dolphin(k, parent) {
  const { mat, ball, cone, box, group } = k;
  const grey = mat('#7A94B0', { rough: .4 }), belly = mat('#DDE6EE');
  const d = { root: group([0, 0, 0], parent) };
  d.body = group([0, 0, 0], d.root);
  const b = ball(1, grey, [0, 0, 0], d.body); b.scale.set(2.4, .8, .75); const bl = ball(.9, belly, [.2, -.25, 0], d.body); bl.scale.set(2.2, .55, .7);
  const beak = cone(.25, .9, grey, [2.75, -.15, 0], d.body, 10); beak.rotation.z = -Math.PI / 2;
  const fin = cone(.4, .9, grey, [-.2, .85, 0], d.body, 6); fin.rotation.z = .5; fin.scale.z = .25;
  d.tail = group([-2.3, 0, 0], d.body); const st = ball(.35, grey, [-.4, 0, 0], d.tail); st.scale.set(1.6, .6, .6); for (const z of [-1, 1]) { const fl = ball(.4, grey, [-.9, 0, z * .4], d.tail); fl.scale.set(.7, .12, 1); fl.rotation.y = z * .4; }
  for (const z of [-1, 1]) { ball(.09, mat('#111111'), [1.9, .1, z * .55], d.body); const fp = ball(.3, grey, [.8, -.5, z * .65], d.body); fp.scale.set(1.2, .12, .7); }
  d.smile = box(.5, .03, .9, mat('#3A4A5A'), [2.3, -.28, 0], d.body);
  return d;
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
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));



function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.sea = box(80, .2, 30, mat('#3E8FCF', { glow: .1 }), [0, .1, -14]);
  w.dp = dolphin(k, k.scene); w.dr = w.dp.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.pool = group(); box(6, .3, 4, mat('#FFFFFF'), [0, .15, 0], w.pool); box(5.6, .1, 3.6, mat('#4FB3E8', { glow: .15 }), [0, .32, 0], w.pool);
  w.bridge = group(); box(20, .5, 2, mat('#B0B8C0'), [0, 6, 0], w.bridge); for (const x of [-6, 6]) box(.6, 6, .6, mat('#8A929A'), [x, 3, 0], w.bridge); w.cars = []; for (let i = 0; i < 3; i++) { const c = group([-6 + i * 5, 6.25, 0], w.bridge); box(2, .7, 1, mat(['#E2453C', '#F2B21F', '#3FA34D'][i]), [0, .4, 0], c); w.cars.push(c); }
  w.splash = group(); for (let i = 0; i < 14; i++) { const s = ball(.35, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.clicks = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.8, .08, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.clicks); r.userData.i = i; r.castShadow = false; r.material.transparent = true; }
  w.phones = group(); for (let i = 0; i < 4; i++) { const ph = group([-4 + i * 2.6, 0, 3], w.phones); box(.5, .9, .1, mat('#222222'), [0, 1.2, 0], ph); ph.userData.scr = box(.42, .8, .02, mat('#4FB3E8', { glow: .9 }), [0, 1.2, .06], ph); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const dpAt = (w, x, y, z, ry, s, tilt = 0) => { w.dr.position.set(x, y, z); w.dr.rotation.set(0, ry, tilt); w.dr.scale.setScalar(s); w.dp.tail.rotation.set(0, 0, 0); };

export default {
  id: '346',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT DOLPHINS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DOLPHINS', 'WERE GIANT?'],
  title: 'What would happen if dolphins were giant?',
  description: 'Your pool? Far too small. One jump clears the bridge. And their clicks? Every phone in town rings. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'dolphin', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant dolphins are made up. Quiz fact: dolphins rest one half of the brain at a time, so they can keep surfacing to breathe while they sleep (Encyclopaedia Britannica, "sleep: unihemispheric sleep").'],
  setup,
  scenes: [
    { say: 'What if dolphins were giant?', show: ['ground', 'sea', 'dr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [0, 8.6, 0], fov: 56, to: { pos: [1, 4, 22.5], look: [0, 8.6, 0], fov: 54 } },
      update: (w, p, t) => { const q = Math.min(1, t / 2.2); dpAt(w, -7 + q * 12, 2 + Math.sin(q * Math.PI) * 8, -8, 0, 2.2, .7 - q * 1.4); w.dp.tail.rotation.z = .3 * Math.sin(t * 8); w.house.position.set(3.4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.6; w.p.head.rotation.y = -.5; } },
    { say: 'Your pool? Far too small.', label: 'SQUEAK', show: ['ground', 'dr', 'pool', 'splash', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 8, 16], look: [0, 2, 0], fov: 54, to: { pos: [2, 8, 15.2], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { dpAt(w, 0, 1.4, 0, -.15, 1.6, .05 * Math.sin(t * 3)); w.dp.tail.rotation.z = .4 * Math.sin(t * 6); w.splash.children.forEach(s => { const i = s.userData.i, a = i / 14 * Math.PI * 2, q = (t * 1.2 + i / 14) % 1; s.position.set(Math.cos(a) * (3 + q * 2), .5 + Math.sin(q * Math.PI) * 1.5, Math.sin(a) * (2 + q)); }); stand(w, 5, 3.6, -.6); pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 2.6, 1); } },
    { say: 'One jump? Right over the bridge.', label: 'SPLASH!', show: ['sea', 'dr', 'bridge'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 26], look: [0, 7, 0], fov: 58, to: { pos: [0, 6, 25], look: [0, 7, 0], fov: 56 } },
      update: (w, p, t) => { w.sea.position.set(0, .1, 0); const q = Math.min(1, Math.max(0, (p - .1) * 1.3)); dpAt(w, -10 + q * 20, Math.sin(q * Math.PI) * 13 - 1, -1, 0, 1.8, .9 - q * 1.8); w.dp.tail.rotation.z = .3 * Math.sin(t * 8); w.cars.forEach((c, i) => c.position.x = -6 + i * 5 + Math.sin(t * .5) * .5); } },
    { say: 'And their clicks? Every phone in town rings.', label: 'RING RING!', show: ['sea', 'dr', 'clicks', 'phones', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .6 ? .08 : 0,
      cam: { pos: [0, 5, 18], look: [0, 3.4, 0], fov: 56, to: { pos: [0, 5, 17.2], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { w.sea.position.set(0, .1, -6); w.house.position.set(6, 0, 0); dpAt(w, -2, 3.5, -7, 0, 1.6, .5); const on = t > .6; w.dr.updateWorldMatrix(true, true); const h = w.dp.smile.getWorldPosition(new w.k.THREE.Vector3()); w.clicks.children.forEach(r => { const i = r.userData.i, q = (t * 1.4 + i / 4) % 1; r.position.copy(h); r.rotation.set(0, 0, 0); r.scale.setScalar(.6 + q * 5); r.material.opacity = 1 - q; r.visible = on; }); w.phones.children.forEach((ph, i) => { ph.rotation.z = on ? .25 * Math.sin(t * 40 + i) : 0; ph.userData.scr.visible = !on || Math.sin(t * 12 + i) > 0; }); } },
    { say: 'Giant dolphins: cute, cool, or way too splashy? Comment below.',
      quiz: { q: 'Giant dolphins are…', options: ['Cute', 'Cool', 'Way too splashy'], answer: 'Made up. Real dolphins rest half their brain at a time.' },
      show: ['sea', 'dr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [8, 3, 9], look: [0, 1.6, -2], fov: 52, to: { pos: [10, 3, 2], look: [0, 1.6, -2] } },
      update: (w, p, t) => { w.sea.position.set(0, .1, -6); dpAt(w, 0, 1.4 + .3 * Math.sin(t * 2), -2, -.6, 1.2, .1 * Math.sin(t * 2)); w.dp.tail.rotation.z = .3 * Math.sin(t * 4); } },
  ],
};
