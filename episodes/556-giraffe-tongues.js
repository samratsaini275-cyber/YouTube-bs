// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears.
// Hook: the premise as a question under 2 s; first frame shows a person waggling a very long purple giraffe tongue.

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
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

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

// A long dark-purple giraffe tongue made of segments that can reach out.
function tongue(k, p) { const m = k.mat('#5B2C6F', { rough: .5 }); p.tongue = k.group([0, -.3, .72], p.head); p.tseg = []; for (let i = 0; i < 12; i++) { const s = k.ball(.11, m, [0, 0, i * .18], p.tongue); s.scale.set(1.3, .5, 1.2); p.tseg.push(s); } }
const lick = (p, len, curl = 0, side = 0) => p.tseg.forEach((s, i) => { const on = i < len; s.visible = on; const f = i / 12; s.position.set(Math.sin(f * 3) * side, Math.sin(f * Math.PI) * curl, i * .18); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#FDEDEC'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#F1C40F'); w.pp = w.p.root; tongue(k, w.p);
  w.ice = group(); cone(.25, .7, mat('#D4A373'), [0, -.35, 0], w.ice, 12).rotation.x = Math.PI; ball(.28, mat('#F5B7B1'), [0, .1, 0], w.ice);
  w.table = group(); box(1.6, .1, 1, mat('#A0522D'), [0, 2, 0], w.table); cyl(.1, .1, 2, mat('#6E3B1F'), [0, 1, 0], w.table, 8);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.shine = group(); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; const r = box(.03, .25, .02, mat('#FFFFFF', { glow: 1.5 }), [Math.cos(a) * .6, Math.sin(a) * .6, 0], w.shine); r.rotation.z = a - Math.PI / 2; r.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FDEDEC', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '556',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIRAFFE TONGUES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'GIRAFFE TONGUES?'],
  title: 'What would happen if we had giraffe tongues?',
  description: 'Ice cream from across the room. An itchy nose? Sorted. And the cat gets a free bath. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'giraffe', 'tongue', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human giraffe tongues are made up. Quiz fact: giraffes use prehensile tongues almost half a metre (1.6 feet) long to browse foliage up to about six metres above the ground (Encyclopaedia Britannica, "Giraffe").'],
  setup,
  scenes: [
    { say: 'What if we had giraffe tongues?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [4.2, 3.8, 5], look: [.4, 3.1, .8], fov: 46, to: { pos: [4, 3.8, 4.6], look: [.4, 3.1, .8], fov: 44 } },
      update: (w, p, t) => { hide(w, 'ice', 'table', 'shine'); w.cr.visible = false; stand(w, 0, 0, .3); pose(w.p, .3); lick(w.p, 12, .3 * Math.sin(t * 4), .4 * Math.sin(t * 3)); w.p.mouth.visible = false; } },
    { say: 'Ice cream? From across the room.', show: ['floor', 'wall', 'pp', 'ice', 'table'], ...env,
      cam: { pos: [3.4, 3.6, 7], look: [1.2, 2.6, 0], fov: 50, to: { pos: [3.2, 3.6, 6.5], look: [1.2, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'shine'); w.cr.visible = false; stand(w, -.6, 0, Math.PI / 2); pose(w.p, .2); w.table.position.set(1.6, 0, 0); w.ice.position.set(1.6, 2.5, 0); const n = Math.floor(Math.min(1, p * 1.8) * 12); lick(w.p, n, .1, 0); w.p.head.rotation.x = .3; } },
    { say: 'An itchy nose? Sorted.', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 3.4, 4.5], look: [0, 3.3, 0], fov: 44, to: { pos: [0, 3.4, 4.1], look: [0, 3.3, 0], fov: 42 } },
      update: (w, p, t) => { hide(w, 'ice', 'table', 'shine'); w.cr.visible = false; stand(w, 0, 0, 0); pose(w.p, .3); w.p.tongue.rotation.x = -1.6 + .2 * Math.sin(t * 8); lick(w.p, 4, 0, 0); w.p.eyes.forEach(e => e.scale.set(1, .4, 1)); } },
    { say: 'And the cat? Free bath. Not happy.', show: ['floor', 'wall', 'pp', 'shine'], ...env,
      cam: { pos: [0, 2.6, 8.5], look: [0, 2.2, 0], fov: 52, to: { pos: [0, 2.6, 8], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -1.4, 0, Math.PI / 2 - .2); pose(w.p, .2); w.p.tongue.rotation.set(.9, 0, 0); lick(w.p, 12, .4 * Math.sin(t * 6), 0); ctAt(w, 1.4, 0, .4, -2.6, .55); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .2); w.c.body.scale.set(1.4, 1.1, 1.1); w.shine.position.set(1.2, 1.4, .8); w.shine.rotation.z = t; } },
    { say: 'A super long tongue: handy, silly, or way too long? Comment below.',
      quiz: { q: 'Would you want a giraffe tongue?', options: ['Handy', 'Silly', 'Way too long'], answer: 'Fun fact: real giraffe tongues are almost half a metre long.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.5, 2.4, 7], look: [0, 3.2, 0], fov: 50, to: { pos: [-1, 2.4, 7], look: [0, 3.2, 0] } },
      update: (w, p, t) => { hide(w, 'ice', 'table', 'shine', 'wall'); w.cr.visible = false; w.p.tongue.rotation.set(0, 0, 0); stand(w, 0, 0, .2); pose(w.p, .3); lick(w.p, 12, .3 * Math.sin(t * 4), .4 * Math.sin(t * 3)); } },
  ],
};
