// Narrative 23: "In This Town… (season 2: things that talk back)". Object rule: a bathtub with opinions.
// Hook: the rule under 2 s; first frame shows a bathtub with a face, bubbles and a kid in the bath.

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
  w.floor = k.ground('#DDE8EE', 0);
  w.wall = group(); for (let i = 0; i < 14; i++) for (let j = 0; j < 8; j++) box(.95, .95, .1, mat((i + j) % 2 ? '#BFE3F2' : '#D8F0FA'), [-6.5 + i, .5 + j, -3], w.wall);
  w.tub = group(); const shell = box(4.6, 1.6, 2.2, mat('#FFFFFF'), [0, 1.2, 0], w.tub); for (const x of [-1.9, 1.9]) ball(.25, mat('#E2B83A', { metal: .6 }), [x, .25, .9], w.tub);
  w.water = box(4.3, .1, 1.9, mat('#8FD3F2'), [0, 1.95, 0], w.tub); w.water.material.transparent = true; w.water.material.opacity = .8;
  w.tf = face(k, w.tub, [0, 1.42, 1.12], .75);
  w.tap = group([-2.1, 2.3, 0], w.tub); cyl(.1, .1, .8, mat('#CCCCCC', { metal: .7 }), [0, .4, 0], w.tap, 8); const sp = cyl(.08, .08, .5, mat('#CCCCCC', { metal: .7 }), [.25, .8, 0], w.tap, 8); sp.rotation.z = Math.PI / 2;
  w.bubbles = group(); for (let i = 0; i < 18; i++) { const b = ball(.18 + (i % 4) * .06, mat('#FFFFFF', { glow: .2 }), [0, 0, 0], w.bubbles); b.material.transparent = true; b.material.opacity = .8; b.userData.i = i; }
  w.kid = person(k, k.scene, '#F2C9A0');
  w.duck = group(); ball(.35, mat('#F2C94C'), [0, 0, 0], w.duck); ball(.22, mat('#F2C94C'), [.25, .3, 0], w.duck); const bk = k.cone(.08, .2, mat('#FF8A2A'), [.48, .28, 0], w.duck, 6); bk.rotation.z = -Math.PI / 2;
  w.drain = group(); for (let i = 0; i < 8; i++) { const d = ball(.12, mat('#8FD3F2'), [0, 0, 0], w.drain); d.userData.i = i; }
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const foam = (w, t, n, rise = 0) => w.bubbles.children.forEach(b => { const i = b.userData.i; b.visible = i < n; b.position.set(-1.8 + (i * 37 % 19) / 19 * 3.6, 2.05 + (i % 3) * .15 + rise * ((t * .4 + i / 18) % 1) * 2.5, -.6 + (i * 13 % 7) / 7 * 1.2); });

export default {
  id: '411',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BATHTUB TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'BATHTUBS TALK'],
  title: 'In this town, bathtubs can talk',
  description: 'Bath time? It sings. Too many bubbles? It giggles. Pull the plug? It burps. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'bath', 'objectswithopinions', 'comedy', 'shorts'],
  sources: ['Comedy sketch: talking bathtubs are made up. Quiz fact: a soap bubble is round because a sphere has the smallest surface area for the air it holds, and surface tension pulls the film toward the smallest area (Encyclopaedia Britannica, "surface tension" and "Plateau problem").'],
  setup,
  scenes: [
    { say: 'In this town, bathtubs talk.', show: ['floor', 'wall', 'tub', 'bubbles'], sky: '#DDE8EE', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3, 11], look: [.2, 2.35, 0], fov: 52, to: { pos: [.3, 3, 10.5], look: [.2, 2.35, 0], fov: 50 } },
      update: (w, p, t) => { w.duck.visible = false; w.drain.visible = false; foam(w, t, 10); pAt(w.kid, .6, .15, -.1, 0, .62); pose(w.kid, 2.2, 0); w.kid.mouth.scale.set(1.2, 2, 1); talk(w.tf, t); brow(w.tf, -.2); } },
    { say: 'Bath time? It sings.', label: 'LA LA LA', show: ['floor', 'wall', 'tub', 'bubbles', 'duck'], sky: '#DDE8EE', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3, 9.5], look: [.1, 2.3, 0], fov: 50, to: { pos: [.2, 3, 9], look: [.1, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { foam(w, t, 6); pAt(w.kid, .6, .15, -.1, 0, .62); pose(w.kid, .4, 0); w.kid.head.rotation.z = .15 * Math.sin(t * 4); talk(w.tf, t); brow(w.tf, -.4); w.tub.rotation.z = .03 * Math.sin(t * 4); w.duck.position.set(-1, 2.15 + .05 * Math.sin(t * 3), .4); } },
    { say: 'Too many bubbles? It giggles.', label: 'HEE HEE', show: ['floor', 'wall', 'tub', 'bubbles'], sky: '#DDE8EE', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.2, 11], look: [.2, 2.1, 0], fov: 52, to: { pos: [.3, 3.2, 10.5], look: [.2, 2.1, 0], fov: 50 } },
      update: (w, p, t) => { w.duck.visible = false; w.tub.rotation.z = .05 * Math.sin(t * 14); foam(w, t, 18, 1); w.kid.root.visible = false; talk(w.tf, t); brow(w.tf, -.3); w.tf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .35; }); } },
    { say: 'Pull the plug? It burps.', label: 'BURP', show: ['floor', 'wall', 'tub', 'drain'], sky: '#DDE8EE', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3, 9.5], look: [.2, 1.85, 0], fov: 50, to: { pos: [.3, 3, 9], look: [.2, 1.85, 0], fov: 48 } },
      update: (w, p, t) => { w.bubbles.visible = false; w.tub.rotation.z = 0; w.tf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); w.water.position.y = 1.95 - p * 1.1; const b = p > .6; w.tf.mouth.scale.set(b ? 1.6 : 1, b ? 4 : 1, 1); brow(w.tf, b ? .4 : 0); w.tub.scale.setScalar(b ? 1 + .04 * Math.sin(t * 30) : 1); w.drain.children.forEach(d => { const i = d.userData.i, q = ((p - .6) * 3 + i * .1) % 1; d.visible = b; d.position.set((i - 4) * .3, 1 + q * 1.4, 1.4 + q * .6); }); } },
    { say: 'Talking bathtub: funny, gross, or way too loud? Comment below.',
      quiz: { q: 'A talking bathtub is…', options: ['Funny', 'Gross', 'Way too loud'], answer: 'Made up. Fun fact: bubbles are round because a sphere has the smallest surface.' },
      show: ['floor', 'tub', 'bubbles'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3.4, 8], look: [0, 1.6, 0], fov: 54, to: { pos: [-2, 3.4, 8], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.drain.visible = false; w.wall.visible = false; w.tub.scale.setScalar(1); w.water.position.y = 1.95; w.tf.mouth.scale.set(1, 1, 1); foam(w, t, 12, .4); talk(w.tf, t, Math.sin(t * 2) > 0); brow(w.tf, .1); } },
  ],
};
