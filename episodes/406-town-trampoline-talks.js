// Narrative 23: "In This Town… (season 2: things that talk back)". Object rule (213 bed: 756 views in the 23:30–02:30 UTC slot).
// Hook: the rule under 2 s; first frame shows a trampoline with a face while a kid bounces on it.

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

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);


function setup(k) {
  const { mat, box, cyl, ball, torus, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.fence = group(); for (let i = 0; i < 12; i++) box(.3, 1.6, .15, mat('#E8DCC8'), [-8 + i * 1.45, .8, -4], w.fence); box(17, .2, .12, mat('#E8DCC8'), [0, 1.2, -4], w.fence);
  w.tramp = group(); const ring = torus(2.4, .12, mat('#3B6FD6'), [0, 1.2, 0], w.tramp); ring.rotation.x = Math.PI / 2; w.mat = cyl(2.3, 2.3, .05, mat('#222222'), [0, 1.2, 0], w.tramp, 28); const skirt = cyl(2.45, 2.45, .5, mat('#3B6FD6'), [0, .95, 0], w.tramp, 28); skirt.material.side = 2; for (let i = 0; i < 4; i++) { const a = i / 4 * Math.PI * 2 + .4; cyl(.08, .08, 1, mat('#888888'), [Math.cos(a) * 2.3, .5, Math.sin(a) * 2.3], w.tramp, 6); }
  w.tf = face(k, w.tramp, [0, .95, 2.5], .9);
  w.kid = person(k, k.scene, '#E2453C');
  w.dad = person(k, k.scene, '#3FA34D');
  w.moon = ball(1, mat('#FFF4C0', { glow: .9 }), [3.5, 8, -6]);
  w.stars = group(); for (let i = 0; i < 12; i++) ball(.07, mat('#FFFFFF', { glow: .9 }), [-6 + (i * 37 % 12), 6 + (i * 13 % 5), -6], w.stars);
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const bounce = (t, h, sp = 5) => h * Math.abs(Math.sin(t * sp));
const dip = (w, y0) => { w.mat.scale.set(1, 1, 1); w.mat.position.y = 1.2 - Math.max(0, .35 - y0) ; };

export default {
  id: '406',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TRAMPOLINE TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'TRAMPOLINES TALK'],
  title: 'In this town, trampolines can talk',
  description: 'Every jump? It groans. Too heavy? It flings you. And at night it bounces all by itself. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'trampoline', 'objectswithopinions', 'comedy', 'shorts'],
  sources: ['Comedy sketch: talking trampolines are made up. Quiz fact: the modern trampoline was developed in the 1930s by American gymnast George Nissen (Encyclopaedia Britannica, "trampoline").'],
  setup,
  scenes: [
    { say: 'In this town, trampolines talk.', show: ['ground', 'fence', 'tramp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 3.8, 13], look: [0, 3.5, 0], fov: 52, to: { pos: [0, 3.8, 12.4], look: [0, 3.5, 0], fov: 50 } },
      update: (w, p, t) => { w.dad.root.visible = false; w.moon.visible = false; w.stars.visible = false; const y = bounce(t, .9); pAt(w.kid, 0, 1.25 + y, 0, 0, .7); pose(w.kid, 2.4, 0); w.kid.mouth.scale.set(1.2, 2.2, 1); dip(w, y); talk(w.tf, t, y < .5); brow(w.tf, .3); } },
    { say: 'Every jump? It groans.', label: 'OOF', show: ['ground', 'fence', 'tramp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 3.2, 11], look: [0, 2.6, 0], fov: 50, to: { pos: [1, 3.2, 10.5], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { const y = bounce(t, .8, 6); pAt(w.kid, 0, 1.25 + y, -.2, 0, .7); pose(w.kid, 1.2, 0); dip(w, y); talk(w.tf, t, y < .6); brow(w.tf, .45); w.tf.scale.setScalar(.9 * (y < .3 ? 1.15 : 1)); } },
    { say: 'Too heavy? It flings you.', label: 'WHEE', show: ['ground', 'fence', 'tramp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 5, 14], look: [0, 5, 0], fov: 56, to: { pos: [0, 7, 14], look: [0, 7, 0], fov: 56 } },
      update: (w, p, t) => { w.kid.root.visible = false; w.tf.scale.setScalar(.9); const q = Math.min(1, Math.max(0, (p - .25) / .75)); const y = q > 0 ? q * 9 : 0; pAt(w.dad, 0, 1.25 + y, 0, 0, 1); pose(w.dad, q > 0 ? 2.6 : .2, 0); w.dad.mouth.scale.set(1.2, q > 0 ? 2.6 : 1, 1); w.dad.root.rotation.z = q * 2; w.mat.position.y = q > 0 ? 1.2 : .8; talk(w.tf, t, q > 0); brow(w.tf, -.3); } },
    { say: 'And at night? It bounces alone.', label: 'BOING', show: ['ground', 'fence', 'tramp', 'moon', 'stars'], sky: '#1B2140', lightAt: [3, 10, 6], lightDist: 30,
      cam: { pos: [0, 3.4, 11], look: [0, 2.3, 0], fov: 52, to: { pos: [0, 3.4, 10.4], look: [0, 2.3, 0], fov: 50 } },
      update: (w, p, t) => { w.dad.root.visible = false; w.tramp.position.y = bounce(t, 1.6, 4); w.tramp.rotation.z = .08 * Math.sin(t * 4); talk(w.tf, t, false); w.tf.mouth.scale.set(1.4, 2.2, 1); brow(w.tf, -.2); } },
    { say: 'Talking trampoline: cool, funny, or way too loud? Comment below.',
      quiz: { q: 'A talking trampoline is…', options: ['Cool', 'Funny', 'Way too loud'], answer: 'Made up. The modern trampoline was invented in the 1930s.' },
      show: ['ground', 'tramp'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3.4, 8.5], look: [0, 1.4, 0], fov: 54, to: { pos: [-2, 3.4, 8.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { w.moon.visible = false; w.stars.visible = false; w.fence.visible = false; w.tramp.position.y = 0; w.tramp.rotation.z = 0; talk(w.tf, t, Math.sin(t * 2) > 0); brow(w.tf, .2); } },
  ],
};
