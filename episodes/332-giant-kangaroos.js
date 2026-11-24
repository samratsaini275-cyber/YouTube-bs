// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized kangaroo next to a house.

function roo(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const fur = mat('#C8804A', { rough: .8 }), light = mat('#F0D8B8');
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const b = ball(1, fur, [0, 2.2, 0], r.body); b.scale.set(.9, 1.4, .8);
  const belly = ball(.75, light, [.35, 2, 0], r.body); belly.scale.set(.6, 1.2, .8);
  r.pouch = ball(.45, light, [.55, 1.5, 0], r.body); r.pouch.scale.set(.6, .5, .8);
  r.head = group([.4, 3.9, 0], r.body); const hd = ball(.5, fur, [0, 0, 0], r.head); hd.scale.set(1.2, .9, .8); const sn = ball(.25, fur, [.55, -.1, 0], r.head);
  for (const z of [-1, 1]) { const e = cone(.15, .6, fur, [-.15, .6, z * .22], r.head, 8); e.rotation.x = z * .25; ball(.08, mat('#111111'), [.35, .15, z * .25], r.head); }
  ball(.07, mat('#222222'), [.8, -.05, 0], r.head);
  r.arms = [-1, 1].map(z => { const a = group([.55, 2.9, z * .45], r.body); const m = cyl(.1, .09, .8, fur, [0, -.4, 0], a, 6); a.rotation.z = .6; a.userData.z = z; return a; });
  r.feet = [-1, 1].map(z => { const f = ball(.35, fur, [.3, .15, z * .4], r.root); f.scale.set(2.4, .4, .7); return f; });
  for (const z of [-1, 1]) { const th = ball(.55, fur, [-.2, 1.1, z * .4], r.body); th.scale.set(1, 1.2, .7); }
  r.tail = cyl(.25, .08, 2.6, fur, [-1.3, .8, 0], r.body, 8); r.tail.rotation.z = 1.1;
  return r;
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
  w.ground = k.ground('#C9B070', 0);
  w.kr = roo(k, k.scene); w.rr = w.kr.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.school = group(); box(6, 4, 3, mat('#E8C8A0'), [0, 2, 0], w.school); box(6.4, .5, 3.4, mat('#8B3A2A'), [0, 4.2, 0], w.school); box(1.6, .6, .1, mat('#FFFFFF'), [0, 3.3, 1.52], w.school);
  w.kid = person(k, k.scene, '#F2B21F'); w.kd = w.kid.root;
  w.sofa = group(); const sm = mat('#6A4FC4'); box(3, .7, 1.2, sm, [0, .7, 0], w.sofa); box(3, 1, .3, sm, [0, 1.4, -.45], w.sofa);
  w.mailbox = group(); cyl(.08, .08, 2.4, mat('#555555'), [0, 1.2, 0], w.mailbox, 8); box(.7, .5, 1, mat('#2E5FB0'), [0, 2.6, 0], w.mailbox);
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.1, mat('#FFE45C', { glow: .8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const krAt = (w, x, y, z, ry, s) => { w.rr.position.set(x, y, z); w.rr.rotation.set(0, ry, 0); w.rr.scale.setScalar(s); w.kr.body.rotation.set(0, 0, 0); w.kr.arms.forEach(a => a.rotation.set(0, 0, .6)); };

export default {
  id: '332',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT KANGAROOS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF KANGAROOS', 'WERE GIANT?'],
  title: 'What would happen if kangaroos were giant?',
  description: 'The school run? One hop. Their pouch fits your whole sofa. And a friendly boxing match? Your mailbox loses. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'kangaroo', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant kangaroos are made up. Quiz fact: a newborn kangaroo is under 2.5 centimetres (about an inch) long; it crawls into its mother\'s pouch and keeps growing there for months (Encyclopaedia Britannica, "kangaroo").'],
  setup,
  scenes: [
    { say: 'What if kangaroos were giant?', show: ['ground', 'rr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 24], look: [-.6, 9.8, 0], fov: 54, to: { pos: [1, 4, 22.5], look: [-.6, 9.8, 0], fov: 52 } },
      update: (w, p, t) => { krAt(w, -3, 0, -5, -.8, 2.3); w.kr.head.rotation.z = .1 * Math.sin(t * 3); w.house.position.set(4, 0, -1); stand(w, 1.6, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'The school run? One hop.', label: 'BOING!', show: ['ground', 'rr', 'house', 'school', 'kd'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 25], look: [0, 6, 0], fov: 56, to: { pos: [0, 6, 24], look: [0, 6, 0], fov: 54 } },
      update: (w, p, t) => { w.house.position.set(-6, 0, -3); w.school.position.set(6, 0, -3); const q = Math.min(1, Math.max(0, (p - .15) * 1.4)); krAt(w, -6 + q * 12, Math.sin(q * Math.PI) * 5, 0, 0, 1.9); w.kr.body.rotation.z = -.4 * Math.cos(q * Math.PI); w.kd.position.set(w.rr.position.x + .9, w.rr.position.y + 1.8, 0); w.kd.scale.setScalar(.45); w.kd.rotation.set(0, Math.PI / 2, 0); w.kid.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.6)); } },
    { say: 'Their pouch? Fits your whole sofa.', show: ['ground', 'rr', 'sofa', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 6, 18], look: [0, 4.5, 0], fov: 54, to: { pos: [5.6, 6, 17], look: [0, 4.5, 0], fov: 52 } },
      update: (w, p, t) => { krAt(w, -1.5, 0, 0, -.5, 2.2); const q = Math.min(1, Math.max(0, (p - .25) * 2.5)); w.rr.updateWorldMatrix(true, true); const pp = w.kr.pouch.getWorldPosition(new w.k.THREE.Vector3()); w.sofa.position.set(4 - q * (4 - pp.x), q * (pp.y - .6), q * pp.z); w.sofa.scale.setScalar(1 - q * .45); w.sofa.rotation.z = q * .4; w.kr.pouch.scale.set(.6 + q * .5, .5 + q * .4, .8 + q * .3); stand(w, 4.8, 4, -.6); pose(w.p, q >= 1 ? 2.4 : .3); w.p.mouth.scale.set(1.2, q >= 1 ? 3 : 1, 1); } },
    { say: 'And a boxing match? Your mailbox loses.', label: '*BOP*', show: ['ground', 'rr', 'mailbox', 'stars'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .9 && t < 1.2 ? .25 : 0,
      cam: { pos: [3, 5, 16], look: [0, 4, 0], fov: 54, to: { pos: [2.8, 5, 15.2], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { w.kr.pouch.scale.set(.6, .5, .8); krAt(w, -2.5, 0, 0, 0, 1.5); const punch = t > .7 && t < 1.1; w.kr.arms.forEach((a, i) => a.rotation.set(0, 0, i === 1 && punch ? 1.6 : .6 + .2 * Math.sin(t * 8 + i))); w.rr.position.y = .2 * Math.abs(Math.sin(t * 7)); const hit = t > .9; w.mailbox.position.set(.6 + (hit ? Math.min(3, (t - .9) * 8) : 0), hit ? Math.max(0, Math.sin(Math.min(1, (t - .9) * 2) * Math.PI) * 2.5) : 0, 0); w.mailbox.rotation.z = hit ? -(t - .9) * 6 : 0; w.stars.children.forEach(s => { const a = s.userData.i / 5 * Math.PI * 2 + t * 4; s.position.set(1.4 + Math.cos(a) * .8, 3.4, Math.sin(a) * .8); s.visible = hit; }); } },
    { say: 'Giant kangaroos: cute, cool, or way too bouncy? Comment below.',
      quiz: { q: 'Giant kangaroos are…', options: ['Cute', 'Cool', 'Way too bouncy'], answer: 'Made up. A real newborn kangaroo is about an inch long.' },
      show: ['ground', 'rr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 4, 8], look: [0, 4.2, 0], fov: 52, to: { pos: [12, 4, 1], look: [0, 4.2, 0] } },
      update: (w, p, t) => { krAt(w, 0, 0, 0, -.8, 1.3); w.rr.position.y = .15 * Math.abs(Math.sin(t * 4)); } },
  ],
};
