// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: a cat flap that decides who gets in.
// Hook: the rule under 2 s; first frame shows a door with a talking cat flap and a cat in front of it.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

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
  const { mat, box, ball, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.house = group(); box(12, 7, .4, mat('#E8C9A0'), [0, 3.5, -1], w.house); w.door = box(2.4, 4.4, .2, mat('#7A4E2E'), [0, 2.2, -.7], w.house); ball(.12, mat('#F2C94C', { metal: .6 }), [.9, 2.2, -.55], w.house);
  w.flap = group([0, .95, -.55], w.house); box(1.3, 1.2, .08, mat('#5A3A1A'), [0, 0, 0], w.flap); w.ff = face(k, w.flap, [0, .05, .06], .55);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.c2 = cat(k, k.scene); w.c2r = w.c2.root; w.c2r.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = k.mat('#8A8A8A', { rough: .85 }); });
  w.rain = group(); for (let i = 0; i < 16; i++) { const r = ball(.08, mat('#8FD3F2'), [0, 0, 0], w.rain); r.userData.i = i; }
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const drizzle = (w, t, on) => w.rain.children.forEach(r => { const i = r.userData.i, q = (t * 1.4 + i / 16) % 1; r.position.set(-3 + (i * 37 % 16) / 2.6, 6 - q * 6, 1 + (i * 13 % 5) * .4); r.visible = on; });

export default {
  id: '415',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT FLAP TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CAT FLAPS TALK'],
  title: 'In this town, cat flaps can talk',
  description: 'Wrong cat? No entry. Your own cat? Stuck halfway. Raining outside? It locks itself. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'objectswithopinions', 'shorts'],
  sources: ['Comedy sketch: talking cat flaps are made up. Quiz fact: cats have 32 muscles in each ear, which lets them rotate their ears about 180 degrees (PetMD, "7 Cat Ear Facts").'],
  setup,
  scenes: [
    { say: 'In this town, cat flaps talk.', show: ['ground', 'house', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.8, 1.6, 7.5], look: [.7, 1.45, 0], fov: 50, to: { pos: [.8, 1.6, 7], look: [.7, 1.45, 0], fov: 48 } },
      update: (w, p, t) => { w.c2r.visible = false; w.rain.visible = false; talk(w.ff, t); brow(w.ff, -.2); ctAt(w.c, 1.7, 0, 1, Math.PI + .7, .42); } },
    { say: 'Wrong cat? No entry.', label: 'NOPE', show: ['ground', 'house', 'c2r'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 1.6, 7.5], look: [.9, 1.4, 0], fov: 50, to: { pos: [1, 1.6, 7], look: [.9, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; const q = Math.min(1, p * 2); const bonk = q >= 1; ctAt(w.c2, 2.6 - q * 1.2 + (bonk ? .3 * Math.max(0, 1 - (p - .5) * 4) : 0), 0, 0, Math.PI + .5, .42); talk(w.ff, t, p > .4); brow(w.ff, .5); if (bonk) w.c2.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .2); } },
    { say: 'Your own cat? Stuck halfway.', label: 'STUCK', show: ['ground', 'house', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.4, 2.2, 6], look: [.2, 1.2, 0], fov: 50, to: { pos: [1.4, 2.2, 5.5], look: [.2, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.c2r.visible = false; ctAt(w.c, -.15, .45, -.4, Math.PI / 2, .42); w.c.head.visible = false; w.c.body.scale.set(1.6, 1.15, 1.15); w.cr.position.x = -.15 + .05 * Math.sin(t * 9); w.c.tail.rotation.z = .4 * Math.sin(t * 6); talk(w.ff, t); brow(w.ff, .45); w.ff.scale.setScalar(.55); w.ff.position.set(0, .75, .06); } },
    { say: 'Raining outside? It locks itself.', label: 'LOCKED', show: ['ground', 'house', 'cr', 'rain'], sky: '#8A9AAA', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.8, 1.5, 7.5], look: [.7, 1.1, 0], fov: 50, to: { pos: [.8, 1.5, 7], look: [.7, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.c.head.visible = true; w.ff.position.set(0, .05, .06); drizzle(w, t, true); ctAt(w.c, 1.7, 0, 1, Math.PI + .7, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); w.c.head.rotation.z = -.15; talk(w.ff, t, false); w.ff.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .15; }); brow(w.ff, -.2); } },
    { say: 'Talking cat flap: helpful, funny, or way too bossy? Comment below.',
      quiz: { q: 'The talking cat flap is…', options: ['Helpful', 'Funny', 'Way too bossy'], answer: 'Made up. Fun fact: cats have 32 muscles in each ear.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.house.visible = false; w.rain.visible = false; ctAt(w.c, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
