// Narrative 23: "In This Town… (season 2: things that talk back)". Cat slot: a fishbowl that talks back to the cat.
// Hook: the rule under 2 s; first frame shows a fishbowl with a face, a goldfish inside, a cat staring at it.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#BFE0D8'), [0, 8, -4], w.wall);
  w.table = group(); box(4, .25, 2.4, mat('#8B5A2B'), [0, 2, 0], w.table); for (const x of [-1.8, 1.8]) for (const z of [-1, 1]) cyl(.1, .1, 2, mat('#6A4422'), [x, 1, z], w.table, 6);
  w.bowl = group(); const gl = ball(1.1, mat('#CFEFFF', { glow: .05 }), [0, 1, 0], w.bowl); gl.material.transparent = true; gl.material.opacity = .35; const wt = ball(1.0, mat('#7FC8F0'), [0, .92, 0], w.bowl); wt.material.transparent = true; wt.material.opacity = .45; wt.scale.set(1, .8, 1);
  w.fish = group(); const fb = ball(.28, mat('#FF8A2A'), [0, 0, 0], w.fish); fb.scale.set(1.4, 1, .7); const ft = cone(.2, .3, mat('#FF8A2A'), [-.45, 0, 0], w.fish, 4); ft.rotation.z = Math.PI / 2; ball(.05, mat('#111111'), [.25, .07, .18], w.fish); w.fish.position.set(0, 1, 0); w.bowl.add(w.fish);
  w.bf = face(k, w.bowl, [0, 1.25, 1.12], .75);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.drops = group(); for (let i = 0; i < 6; i++) { const d = ball(.09, mat('#7FD3FF', { glow: .4 }), [0, 0, 0], w.drops); d.userData.i = i; }
  w.moon = ball(.7, mat('#FFF4C0', { glow: .9 }), [3, 6.5, -3.7]);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const swim = (w, t) => { w.fish.position.set(.35 * Math.sin(t * 1.5), 1 + .1 * Math.sin(t * 3), .2 * Math.cos(t * 1.5)); w.fish.rotation.y = -t * 1.5 + Math.PI / 2; };

export default {
  id: '407',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FISHBOWL TALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'FISHBOWLS TALK'],
  title: 'In this town, fishbowls can talk',
  description: 'The cat walks by? It yells for help. A paw sneaks in? Splash. And at night it sleeps with one eye open. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'goldfish', 'shorts'],
  sources: ['Comedy sketch: talking fishbowls are made up. Quiz fact: the goldfish is a member of the carp family, originally from East Asia (Encyclopaedia Britannica, "goldfish").'],
  setup,
  scenes: [
    { say: 'In this town, fishbowls talk.', show: ['floor', 'wall', 'table', 'bowl', 'cr'], sky: '#BFE0D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 4, 11], look: [.9, 3.75, 0], fov: 50, to: { pos: [1, 4, 10.5], look: [.9, 3.75, 0], fov: 48 } },
      update: (w, p, t) => { w.drops.visible = false; w.moon.visible = false; w.bowl.position.set(-.6, 2.12, 0); swim(w, t); talk(w.bf, t); brow(w.bf, .35); ctAt(w, 2.6, 2.12, -.4, Math.PI, .4); w.c.head.rotation.z = -.1; } },
    { say: 'The cat walks by? It yells for help.', label: 'HELP!', show: ['floor', 'wall', 'table', 'bowl', 'cr'], sky: '#BFE0D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 3.6, 10.5], look: [.2, 2.7, 0], fov: 50, to: { pos: [.4, 3.6, 10], look: [.2, 2.7, 0], fov: 48 } },
      update: (w, p, t) => { w.bowl.position.set(0, 2.12, 0); swim(w, t); talk(w.bf, t); brow(w.bf, .45); w.bf.scale.setScalar(.75 * (1 + .08 * Math.sin(t * 20))); ctAt(w, 4 - p * 5.5, 0, 1.6, Math.PI, .5); w.c.head.rotation.y = -.6; } },
    { say: 'A paw sneaks in? Splash.', label: 'SPLASH', show: ['floor', 'wall', 'table', 'bowl', 'cr', 'drops'], sky: '#BFE0D8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.8, 3.6, 8.5], look: [.7, 3, 0], fov: 50, to: { pos: [.8, 3.6, 8], look: [.7, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.bf.scale.setScalar(.75); w.bowl.position.set(-.5, 2.12, 0); swim(w, t); ctAt(w, 1.9, 2.12, -.3, Math.PI, .4); const reach = Math.min(1, p * 2.2); w.c.paw.position.set(.8 + reach * 1.6, .5 + reach * 1.4, .9); const sp = p > .45; talk(w.bf, t, sp); brow(w.bf, -.3); if (sp) w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .2); w.drops.visible = sp; w.drops.children.forEach(d => { const i = d.userData.i, q = ((p - .45) * 2.5 + i * .07) % 1; d.position.set(-.5 + (i - 2.5) * .25 + q * 1.4, 4.2 + Math.sin(q * Math.PI) * 1.2 - q * .8, .4); }); } },
    { say: 'And at night? One eye open.', label: '…', show: ['floor', 'wall', 'table', 'bowl', 'moon'], sky: '#1B2140', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 3.6, 7.5], look: [.2, 3, 0], fov: 50, to: { pos: [.3, 3.6, 7], look: [.2, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.visible = false; w.drops.visible = false; w.bowl.position.set(0, 2.12, 0); w.fish.position.set(0, .95, 0); w.fish.rotation.y = 0; talk(w.bf, t, false); const eyes = w.bf.children.filter(o => o.geometry && o.geometry.type === 'SphereGeometry'); eyes.forEach((e, i) => e.scale.y = (i < 2) ? .15 : 1); brow(w.bf, .2); } },
    { say: 'Talking fishbowl: brave, funny, or way too loud? Comment below.',
      quiz: { q: 'The talking fishbowl is…', options: ['Brave', 'Funny', 'Way too loud'], answer: 'Made up. Fun fact: goldfish are a kind of carp.' },
      show: ['floor', 'bowl'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.6, 2.4, 5.5], look: [0, 1.2, 0], fov: 52, to: { pos: [-1.6, 2.4, 5.5], look: [0, 1.2, 0] } },
      update: (w, p, t) => { w.moon.visible = false; w.table.visible = false; w.wall.visible = false; w.bowl.position.set(0, 0, 0); w.bf.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); swim(w, t); talk(w.bf, t, Math.sin(t * 2) > 0); brow(w.bf, .2); } },
  ],
};
