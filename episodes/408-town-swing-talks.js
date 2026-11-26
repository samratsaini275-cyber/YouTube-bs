// Narrative 23: "In This Town… (season 2: things that talk back)". Object rule: a swing set with opinions.
// Hook: the rule under 2 s; first frame shows a swing set with a face on its top bar while a kid swings.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.sand = cyl(3.4, 3.4, .06, mat('#E8D7A8'), [0, .03, .6], undefined, 24);
  w.set = group(); const bar = cyl(.14, .14, 5, mat('#E2453C'), [0, 4.2, 0], w.set, 10); bar.rotation.z = Math.PI / 2; for (const x of [-2.4, 2.4]) for (const z of [-1, 1]) { const l = cyl(.12, .12, 4.5, mat('#E2453C'), [x, 2.1, z * .7], w.set, 8); l.rotation.x = z * -.16; }
  box(2.2, 1.3, .2, mat('#FFF4E0'), [0, 4.95, 0], w.set); w.sf = face(k, w.set, [0, 4.95, .12], .85);
  w.swing = group([0, 4.1, 0], w.set); for (const x of [-.45, .45]) cyl(.025, .025, 2.6, mat('#888888'), [x, -1.3, 0], w.swing, 6); box(1.1, .1, .45, mat('#3B6FD6'), [0, -2.6, 0], w.swing);
  w.kid = person(k, w.swing, '#F2C94C'); w.kid.root.scale.setScalar(.55); w.kid.root.position.set(0, -2.6 - .55 * 1.2, .05);
  w.k2 = person(k, k.scene, '#F2C94C');
  w.spin = group(); for (let i = 0; i < 3; i++) { const s = ball(.1, mat('#FFE38A', { glow: .8 }), [0, 0, 0], w.spin); s.userData.i = i; }
  w.moon = ball(.8, mat('#FFF4C0', { glow: .9 }), [3, 7, -5]);
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.14, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const sitKid = (w) => { const q = w.kid; q.root.visible = true; q.root.rotation.set(0, 0, 0); q.arms.forEach(a => a.rotation.set(-2.9, 0, a.userData.s * .1)); q.mouth.scale.set(1.2, 2, 1); };
const orbit = (w, t, on, at) => w.spin.children.forEach(s => { const a = s.userData.i / 3 * Math.PI * 2 + t * 6; s.position.set(at[0] + Math.cos(a) * .8, at[1] + .2 * Math.sin(a), at[2] + Math.sin(a) * .4); s.visible = on; });
const zz = (w, t, on, at) => w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(at[0] + q * .6, at[1] + q * 1.3, at[2]); z.scale.setScalar(.6 + q * 1.2); z.visible = on; });

export default {
  id: '408',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SWING TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'SWINGS TALK'],
  title: 'In this town, swings can talk',
  description: 'Push too high? It gets dizzy. Jump off? It begs you to come back. At night it rocks itself to sleep. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'playground', 'objectswithopinions', 'comedy', 'shorts'],
  sources: ['Comedy sketch: talking swings are made up. Quiz fact: a swing works like a pendulum, and the time for one swing depends on the length of the chains, not on how heavy the rider is (Encyclopaedia Britannica, "pendulum").'],
  setup,
  scenes: [
    { say: 'In this town, swings talk.', show: ['ground', 'sand', 'set'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.4, 4.6, 12], look: [0, 5.1, 0], fov: 52, to: { pos: [.4, 4.6, 11.5], look: [0, 5.1, 0], fov: 50 } },
      update: (w, p, t) => { w.k2.root.visible = false; w.moon.visible = false; w.zzz.visible = false; w.spin.visible = false; w.swing.rotation.x = .5 * Math.sin(t * 2.6); sitKid(w); talk(w.sf, t); brow(w.sf, -.2); } },
    { say: 'Push too high? It gets dizzy.', label: 'WOOZY', show: ['ground', 'sand', 'set', 'spin'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 4.2, 11], look: [0, 3.6, 0], fov: 52, to: { pos: [2, 4.2, 10.5], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { w.swing.rotation.x = (.5 + p * .9) * Math.sin(t * 3); sitKid(w); talk(w.sf, t, p > .4); brow(w.sf, .4); w.sf.rotation.z = p > .4 ? .15 * Math.sin(t * 5) : 0; orbit(w, t, p > .4, [0, 5.5, .3]); } },
    { say: 'Jump off? It begs you to come back.', label: 'COME BACK!', show: ['ground', 'sand', 'set'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 3.8, 12], look: [.6, 3, 0], fov: 52, to: { pos: [1, 3.8, 11.5], look: [.6, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.spin.visible = false; w.sf.rotation.z = 0; w.kid.root.visible = false; w.swing.rotation.x = .3 * Math.sin(t * 2) * (1 - p * .5); pAt(w.k2, 1 + p * 1.5, 0, 1.6, Math.PI / 2, .55); pose(w.k2, .3, 0); w.k2.arms.forEach(a => a.rotation.x = .7 * Math.sin(t * 10 + a.userData.s)); talk(w.sf, t); brow(w.sf, .5); } },
    { say: 'At night? It rocks itself to sleep.', label: 'ZZZ', show: ['ground', 'sand', 'set', 'moon', 'zzz'], sky: '#2A3160', lightAt: [1, 8, 8], lightDist: 40,
      cam: { pos: [.4, 3.8, 11], look: [0, 3.4, 0], fov: 52, to: { pos: [.4, 3.8, 10.4], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { w.k2.root.visible = false; w.swing.rotation.x = .2 * Math.sin(t * 1.4); talk(w.sf, t, false); w.sf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .15; }); brow(w.sf, -.1); zz(w, t, true, [.8, 5.2, .3]); } },
    { say: 'Talking swing: cute, funny, or way too clingy? Comment below.',
      quiz: { q: 'A talking swing is…', options: ['Cute', 'Funny', 'Way too clingy'], answer: 'Made up. Fun fact: a swing works like a pendulum.' },
      show: ['ground', 'sand', 'set'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 4, 10], look: [0, 3, 0], fov: 54, to: { pos: [-2, 4, 10], look: [0, 3, 0] } },
      update: (w, p, t) => { w.moon.visible = false; w.zzz.visible = false; w.sf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); w.swing.rotation.x = .3 * Math.sin(t * 2); talk(w.sf, t, Math.sin(t * 2) > 0); brow(w.sf, .2); } },
  ],
};
