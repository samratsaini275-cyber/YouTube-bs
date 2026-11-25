// Narrative 20: "What Would Happen If… (season 10)". Big-animal premise (167 giant cats 592 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized owl perched on a house at night.

function owl(k, parent) {
  const { mat, ball, cone, group } = k;
  const brown = mat('#8A6A4A', { rough: .8 }), light = mat('#E8D8B8'), dark = mat('#5A4030');
  const o = { root: group([0, 0, 0], parent) };
  o.body = group([0, 0, 0], o.root);
  const b = ball(1.1, brown, [0, 1.4, 0], o.body); b.scale.set(1, 1.2, .95); const bl = ball(.9, light, [0, 1.2, .4], o.body); bl.scale.set(.9, 1.1, .7);
  o.head = group([0, 3, 0], o.body); ball(.85, brown, [0, 0, 0], o.head); const disc = ball(.75, light, [0, -.05, .35], o.head); disc.scale.set(1.1, .85, .5);
  o.eyes = []; for (const x of [-1, 1]) { const e = group([x * .32, .05, .7], o.head); ball(.26, mat('#F2B21F', { glow: .6 }), [0, 0, 0], e); ball(.13, mat('#111111'), [0, 0, .18], e); o.eyes.push(e); const tuft = cone(.15, .5, brown, [x * .5, .8, 0], o.head, 6); tuft.rotation.z = -x * .3; }
  const bk = cone(.1, .3, mat('#3A2A1A'), [0, -.25, .78], o.head, 6); bk.rotation.x = Math.PI / 2 + .3;
  o.wings = [-1, 1].map(x => { const w = group([x * .95, 1.8, 0], o.body); const m = ball(.55, dark, [0, -.5, 0], w); m.scale.set(.4, 1.4, .8); w.userData.x = x; return w; });
  for (const x of [-1, 1]) { const f = ball(.2, mat('#E8B85A'), [x * .35, .1, .3], o.root); f.scale.set(1.2, .4, 1.4); }
  return o;
}
const blink = (o, t) => o.eyes.forEach(e => e.scale.set(1, Math.sin(t * 2) > .95 ? .1 : 1, 1));
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
  w.ground = k.ground('#5A7A50', 0);
  w.ow = owl(k, k.scene); w.or = w.ow.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house); w.win = box(.9, .9, .1, mat('#FFE9A8', { glow: .9 }), [1.2, 2.3, 1.72], w.house);
  w.moon = ball(1.2, mat('#FFF3C4', { glow: .9 }), [6, 14, -12]);
  w.street = group(); for (let i = 0; i < 4; i++) { const h = group([-9 + i * 6, 0, -6 - (i % 2) * 2], w.street); box(3, 2.6, 2.6, mat('#D8C8B0'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#9A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; h.userData.win = box(.7, .7, .1, mat('#FFE9A8', { glow: .9 }), [.6, 1.6, 1.32], h); }
  w.waves = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.8, .1, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.waves); r.userData.i = i; r.castShadow = false; r.material.transparent = true; }
  w.vane = group(); cyl(.06, .06, 2, mat('#333333'), [0, 1, 0], w.vane, 6); w.arrow = group([0, 2, 0], w.vane); const a = cone(.2, .6, mat('#333333'), [.5, 0, 0], w.arrow, 6); a.rotation.z = -Math.PI / 2; cyl(.04, .04, 1, mat('#333333'), [0, 0, 0], w.arrow, 4).rotation.z = Math.PI / 2;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const owAt = (w, x, y, z, ry, s) => { w.or.position.set(x, y, z); w.or.rotation.set(0, ry, 0); w.or.scale.setScalar(s); w.ow.head.rotation.set(0, 0, 0); w.ow.wings.forEach(wg => wg.rotation.z = 0); };

export default {
  id: '350',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT OWLS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF OWLS', 'WERE GIANT?'],
  title: 'What would happen if owls were giant?',
  description: 'Night lights? Not needed, their eyes glow. One hoot rattles every window. And the weather vane gets competition. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'owl', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant owls are made up. Quiz fact: many owls fly almost silently because the soft, fringed edges of their feathers break up the sound of air rushing over the wing (Encyclopaedia Britannica, "owl").'],
  setup,
  scenes: [
    { say: 'What if owls were giant?', show: ['ground', 'or', 'house', 'pp', 'moon'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 26], look: [0, 14, 0], fov: 56, to: { pos: [1, 4, 24.5], look: [0, 14, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(0, 0, -2); owAt(w, 0, 5.2, -2, 0, 2.6); blink(w.ow, t); w.ow.head.rotation.y = .3 * Math.sin(t * 1.5); stand(w, 2.4, 4, -.3); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.4; w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Night lights? Not needed. Their eyes glow.', show: ['ground', 'or', 'pp'], sky: '#0E1428', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4, 14], look: [0, 4.4, 0], fov: 54, to: { pos: [0, 4, 13.2], look: [0, 4.4, 0], fov: 52 } },
      update: (w, p, t) => { owAt(w, 0, 0, -3, 0, 1.8); w.ow.eyes.forEach(e => { e.scale.setScalar(1 + .15 * Math.sin(t * 3)); }); stand(w, 2.4, 2, -2.4); pose(w.p, .3); w.p.head.rotation.x = -.3; } },
    { say: 'One hoot? Every window rattles.', label: 'HOO HOO!', show: ['ground', 'or', 'street', 'waves', 'moon'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 ? .12 : 0,
      cam: { pos: [0, 6, 24], look: [0, 5, 0], fov: 56, to: { pos: [0, 6, 23], look: [0, 5, 0], fov: 54 } },
      update: (w, p, t) => { owAt(w, 0, 0, 0, 0, 2); const on = t > .5; w.or.updateWorldMatrix(true, true); const h = w.ow.head.getWorldPosition(new w.k.THREE.Vector3()); w.waves.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 4) % 1; r.position.set(h.x, h.y - .4, h.z + 1); r.rotation.set(0, 0, 0); r.scale.setScalar(.6 + q * 6); r.material.opacity = 1 - q; r.visible = on; }); w.street.children.forEach((hs, i) => { hs.rotation.z = on ? .04 * Math.sin(t * 25 + i) : 0; hs.userData.win.visible = !on || Math.sin(t * 15 + i) > 0; }); } },
    { say: 'And turning their head? The weather vane gets jealous.', show: ['ground', 'or', 'house', 'vane'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 6, 20], look: [0, 6.4, 0], fov: 56, to: { pos: [2, 6, 19], look: [0, 6.4, 0], fov: 54 } },
      update: (w, p, t) => { w.street.children.forEach(hs => hs.rotation.z = 0); w.house.position.set(4, 0, -1); w.vane.position.set(4, 6.5, -1); w.arrow.rotation.y = .3 * Math.sin(t); owAt(w, -2.6, 0, 0, 0, 1.8); w.ow.head.rotation.y = Math.min(1, p * 1.5) * 4.2 * Math.sin(t * 1.2); blink(w.ow, t); } },
    { say: 'Giant owls: cute, wise, or way too loud? Comment below.',
      quiz: { q: 'Giant owls are…', options: ['Cute', 'Wise', 'Way too loud'], answer: 'Made up. Real owls fly almost silently thanks to soft feather edges.' },
      show: ['ground', 'or'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [8, 3, 10], look: [0, 3, 0], fov: 52, to: { pos: [10, 3, 4], look: [0, 3, 0] } },
      update: (w, p, t) => { owAt(w, 0, 0, 0, .5, 1.3); blink(w.ow, t); w.ow.head.rotation.y = .3 * Math.sin(t); } },
  ],
};
