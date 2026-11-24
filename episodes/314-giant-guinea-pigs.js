// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized guinea pig next to a house.

function cavy(k, parent) {
  const { mat, ball, group } = k;
  const brown = mat('#B5652E', { rough: .8 }), white = mat('#FFF6EA', { rough: .8 }), black = mat('#2A1E16', { rough: .8 });
  const h = { root: group([0, 0, 0], parent) };
  h.body = group([0, 0, 0], h.root);
  const b = ball(1.2, brown, [0, 1.1, 0], h.body); b.scale.set(1.5, .9, 1);
  const p1 = ball(.95, white, [.4, 1.2, 0], h.body); p1.scale.set(.9, 1.02, 1.2);
  const p2 = ball(.75, black, [-1, 1.3, .1], h.body); p2.scale.set(.8, 1.05, 1.5);
  h.head = group([1.55, 1.35, 0], h.body); const hd = ball(.75, brown, [0, 0, 0], h.head); hd.scale.set(1.1, .95, 1); const blaze = ball(.4, white, [.62, .05, 0], h.head); blaze.scale.set(.8, 1.2, 1.05);
  for (const z of [-1, 1]) { const e = ball(.22, mat('#E8A0A0'), [-.25, .6, z * .5], h.head); e.scale.set(.8, .5, 1); ball(.13, mat('#111111', { rough: .2 }), [.45, .25, z * .4], h.head); ball(.04, mat('#FFFFFF', { glow: .6 }), [.55, .3, z * .38], h.head); }
  h.nose = ball(.09, mat('#E86A8A'), [.85, -.05, 0], h.head); h.mouth = ball(.12, mat('#5A2A1A'), [.8, -.3, 0], h.head); h.mouth.scale.set(.5, .3, 1);
  h.feet = [-1, 1].map(z => { const f = ball(.25, mat('#F2B8A8'), [.9, .15, z * .55], h.root); f.scale.set(1.4, .5, 1); return f; });
  return h;
}
const sniff = (h, t) => { h.head.rotation.z = .05 * Math.sin(t * 14); h.nose.scale.setScalar(1 + .3 * Math.max(0, Math.sin(t * 16))); };
const chew = (h, t) => h.mouth.scale.set(.5, .3 + .3 * Math.abs(Math.sin(t * 14)), 1);
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
  w.cv = cavy(k, k.scene); w.cr = w.cv.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.lawn = group(); w.tufts = []; for (let i = 0; i < 24; i++) { const g = cone(.25, .9, mat('#3E8E33'), [-5 + (i % 8) * 1.4, .45, -1.5 + Math.floor(i / 8) * 1.4], w.lawn, 5); w.tufts.push(g); }
  w.pop = group(); for (let i = 0; i < 6; i++) { const s = ball(.15, mat('#FFE45C', { glow: .8 }), [0, 0, 0], w.pop); s.userData.i = i; s.castShadow = false; }
  w.waves = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.8, .08, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.waves); r.userData.i = i; r.castShadow = false; }
  w.moon = ball(1.2, mat('#FFF3C4', { glow: .9 }), [6, 14, -10]);
  w.town = group(); for (let i = 0; i < 4; i++) { const h = group([-8 + i * 5.5, 0, -6 - (i % 2) * 2], w.town); box(3, 2.6, 2.6, mat('#F2D9B8'), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#B3262E'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; h.userData.win = box(.7, .7, .1, mat('#FFE9A8', { glow: .9 }), [.6, 1.6, 1.32], h); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const cvAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cv.body.rotation.set(0, 0, 0); };

export default {
  id: '314',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT GUINEA PIGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GUINEA PIGS', 'WERE GIANT?'],
  title: 'What would happen if guinea pigs were giant?',
  description: 'Your lawn gets mowed in one minute. When they are happy, they jump like popcorn. And one squeak? It wakes the whole town. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'guineapig', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant guinea pigs are made up. Quiz fact: guinea pigs are rodents that come from the Andes of South America; despite the name they are not pigs and are not from Guinea (Encyclopaedia Britannica, "guinea pig").'],
  setup,
  scenes: [
    { say: 'What if guinea pigs were giant?', show: ['ground', 'cr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 6.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 6.4, 0], fov: 52 } },
      update: (w, p, t) => { cvAt(w, -3.6, 0, -5, -.6, 2.6); sniff(w.cv, t); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your lawn? Mowed in one minute.', label: 'MUNCH', show: ['ground', 'cr', 'lawn', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 7, 18], look: [0, 3, 0], fov: 54, to: { pos: [2, 7, 17], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { const x = -7 + p * 9; cvAt(w, x, 0, 0, 0, 1.8); w.cv.body.rotation.z = -.15; chew(w.cv, t); sniff(w.cv, t); w.tufts.forEach(g => g.visible = g.position.x > x + 2.4); stand(w, 4.6, 3.5, -.6); pose(w.p, p > .5 ? 2.4 : .3); w.p.mouth.scale.set(1.2, p > .5 ? 3 : 1, 1); } },
    { say: 'Happy? They jump like popcorn.', label: 'POP!', show: ['ground', 'cr', 'pop'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 20], look: [0, 5.5, 0], fov: 54, to: { pos: [0, 6, 19], look: [0, 5.5, 0], fov: 52 } },
      update: (w, p, t) => { w.tufts.forEach(g => g.visible = true); const ph = (t * 1.6) % 1, up = Math.sin(ph * Math.PI); cvAt(w, 0, up * 6, 0, -.8 + Math.floor(t * 1.6) * 1.2, 2); w.cv.body.rotation.z = .5 * Math.sin(ph * Math.PI * 2); sniff(w.cv, t); w.pop.children.forEach(s => { const a = s.userData.i / 6 * Math.PI * 2; s.position.set(Math.cos(a) * (2 + ph * 3), 1 + up * 6 + 2, Math.sin(a) * 2); s.visible = ph > .3 && ph < .7; }); } },
    { say: 'And one squeak? The whole town wakes up.', label: 'WHEEEK!', show: ['ground', 'cr', 'town', 'waves', 'moon'], sky: '#1A2238', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .6 ? .12 : 0,
      cam: { pos: [0, 6, 24], look: [0, 4.5, 0], fov: 56, to: { pos: [0, 6, 23], look: [0, 4.5, 0], fov: 54 } },
      update: (w, p, t) => { cvAt(w, 0, 0, 0, -1.1, 2.2); w.cv.head.rotation.z = .35; w.cv.mouth.scale.set(.9, 1.4, 1); const on = t > .6; w.waves.children.forEach(r => { const i = r.userData.i, q = (t * 1.2 + i / 4) % 1; r.position.set(2.4, 5, 1); r.rotation.set(0, 0, 0); r.scale.setScalar(.6 + q * 3); r.material.opacity = 1 - q; r.material.transparent = true; r.visible = on; }); w.town.children.forEach((h, i) => { h.userData.win.visible = on && t > .8 + i * .15; h.rotation.z = on ? .02 * Math.sin(t * 20 + i) : 0; }); } },
    { say: 'Giant guinea pigs: cute, cuddly, or way too squeaky? Comment below.',
      quiz: { q: 'Giant guinea pigs are…', options: ['Cute', 'Cuddly', 'Way too squeaky'], answer: 'Made up. Real guinea pigs are rodents from South America, not pigs.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3, 0] } },
      update: (w, p, t) => { w.cv.head.rotation.z = 0; w.cv.mouth.scale.set(.5, .3, 1); cvAt(w, 0, 0, 0, -.5, 1.5); sniff(w.cv, t); chew(w.cv, t); } },
  ],
};
