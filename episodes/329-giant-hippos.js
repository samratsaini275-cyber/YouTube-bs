// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized hippo next to a house.

function hippo(k, parent) {
  const { mat, ball, box, group } = k;
  const skin = mat('#8A7A9A', { rough: .6 }), pink = mat('#E8A0B0');
  const h = { root: group([0, 0, 0], parent) };
  const b = ball(1.3, skin, [0, 1.4, 0], h.root); b.scale.set(1.6, 1, 1.05);
  h.head = group([2, 1.7, 0], h.root); const hd = ball(.8, skin, [0, 0, 0], h.head); hd.scale.set(1.1, .9, 1);
  h.jaw = group([.3, -.25, 0], h.head); const top = ball(.75, skin, [.6, .1, 0], h.head); top.scale.set(1, .6, 1.1); const low = ball(.7, skin, [.55, -.15, 0], h.jaw); low.scale.set(1, .5, 1.05); const mouth = ball(.6, pink, [.55, .05, 0], h.jaw); mouth.scale.set(.95, .2, .95);
  for (const z of [-1, 1]) { box(.12, .3, .12, mat('#FFFFFF'), [1, .05, z * .45], h.jaw); ball(.11, mat('#FFFFFF'), [-.05, .55, z * .35], h.head); ball(.06, mat('#111111'), [.03, .57, z * .37], h.head); ball(.12, skin, [-.35, .7, z * .45], h.head); ball(.07, mat('#3A2A3A'), [1.1, .3, z * .25], h.head); }
  h.legs = []; for (const x of [-1.2, 1.2]) for (const z of [-1, 1]) { const l = ball(.45, skin, [x, .4, z * .85], h.root); l.scale.set(1, 1.2, 1); h.legs.push(l); }
  return h;
}
const yawn = (h, a) => { h.jaw.rotation.z = -a * .7; h.head.rotation.z = a * .45; };
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
  w.hp = hippo(k, k.scene); w.hr = w.hp.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.pool = group(); box(8, .3, 5.5, mat('#FFFFFF'), [0, .15, 0], w.pool); w.water = box(7.6, .1, 5.1, mat('#4FB3E8', { glow: .15 }), [0, .32, 0], w.pool);
  w.wave = group(); for (let i = 0; i < 16; i++) { const d = ball(.35, mat('#9AD8F5', { glow: .3 }), [0, 0, 0], w.wave); d.userData.i = i; d.castShadow = false; }
  w.car = group(); box(2.6, .9, 1.3, mat('#E2453C'), [0, .65, 0], w.car); box(1.3, .6, 1.2, mat('#9FD3EE'), [-.2, 1.35, 0], w.car); for (const x of [-.8, .8]) for (const z of [-.65, .65]) { const wh = cyl(.3, .3, .2, mat('#222222'), [x, .3, z], w.car, 12); wh.rotation.x = Math.PI / 2; }
  w.lake = box(30, 14, 8, mat('#3E8FCF', { glow: .1 }), [0, 7, -2]); w.lake.material.transparent = true; w.lake.material.opacity = .55;
  w.bed = box(30, .3, 8, mat('#6B5A3A'), [0, .15, -2]);
  w.bubbles = group(); for (let i = 0; i < 8; i++) { const d = ball(.2, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.bubbles); d.userData.i = i; d.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const hpAt = (w, x, y, z, ry, s) => { w.hr.position.set(x, y, z); w.hr.rotation.set(0, ry, 0); w.hr.scale.setScalar(s); yawn(w.hp, 0); };

export default {
  id: '329',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT HIPPOS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HIPPOS', 'WERE GIANT?'],
  title: 'What would happen if hippos were giant?',
  description: 'Your pool? Empty in one splash. One yawn is bigger than your car. And swimming? They just bounce along the bottom. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'hippo', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant hippos are made up. Quiz fact: hippos cannot really swim or float; in deep water they walk or push off and bounce along the bottom (San Diego Zoo Wildlife Alliance, "Hippopotamus").'],
  setup,
  scenes: [
    { say: 'What if hippos were giant?', show: ['ground', 'hr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.4, 0], fov: 52 } },
      update: (w, p, t) => { hpAt(w, -3.6, 0, -5, -.7, 2.2); yawn(w.hp, .15 + .1 * Math.sin(t * 2)); w.house.position.set(4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your pool? Empty in one splash.', label: '*SPLOOSH*', show: ['ground', 'hr', 'pool', 'wave', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .8 && t < 1.3 ? .25 : 0,
      cam: { pos: [2, 9, 20], look: [0, 2.4, 0], fov: 54, to: { pos: [2, 9, 19.2], look: [0, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { const q = Math.min(1, t / .8); hpAt(w, -7 + q * 7, Math.sin(q * Math.PI) * 3, 0, -.2, 1.4); const hit = q >= 1; w.water.visible = !hit; w.wave.children.forEach(d => { const i = d.userData.i, a = i / 16 * Math.PI * 2, r = hit ? (t - .8) * 7 : 0; d.position.set(Math.cos(a) * r, .5 + Math.sin(Math.min(1, r / 6) * Math.PI) * 3, Math.sin(a) * r * .7); d.visible = hit && r < 7; }); stand(w, 5.6, 5, -.7); pose(w.p, hit ? 2.4 : .3); w.p.mouth.scale.set(1.2, hit ? 3 : 1, 1); w.pp.position.y = 0; } },
    { say: 'One yawn? Bigger than your car.', label: 'YAWN', show: ['ground', 'hr', 'car'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [10, 4.5, 11], look: [2, 3.6, 0], fov: 54, to: { pos: [9.5, 4.5, 10.4], look: [2, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { w.water.visible = true; hpAt(w, -2, 0, 0, 0, 2); const a = Math.min(1, Math.max(0, (p - .2) * 3)); yawn(w.hp, a * 1.1); w.car.position.set(4.6, 0, 1.2); w.car.rotation.y = -.4; } },
    { say: 'And swimming? They just bounce along the bottom.', label: 'BOING', show: ['ground', 'hr', 'lake', 'bed', 'bubbles'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 22], look: [0, 6, 0], fov: 56, to: { pos: [0, 6, 21], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { const ph = (t * 1.1) % 1; hpAt(w, -4 + p * 6, .3 + Math.sin(ph * Math.PI) * 5, -2, 0, 1.5); w.hp.legs.forEach(l => l.position.y = .4 + (ph > .1 && ph < .9 ? -.15 : 0)); w.bubbles.children.forEach(d => { const i = d.userData.i, q = (t * .6 + i / 8) % 1; d.position.set(w.hr.position.x + 3 + (i % 3) * .3, w.hr.position.y + 3 + q * 6, -2); }); } },
    { say: 'Giant hippos: cute, cool, or way too heavy? Comment below.',
      quiz: { q: 'Giant hippos are…', options: ['Cute', 'Cool', 'Way too heavy'], answer: 'Made up. Real hippos cannot really swim; they bounce along the bottom.' },
      show: ['ground', 'hr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 2.8, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 2.8, 0] } },
      update: (w, p, t) => { w.hp.legs.forEach(l => l.position.y = .4); hpAt(w, 0, 0, 0, -.8, 1.2); yawn(w.hp, .3 + .2 * Math.sin(t * 2)); } },
  ],
};
