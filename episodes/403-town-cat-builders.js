// Narrative 22: "In This Town… (short format, cats first)". Cat rules lead the channel (906: 975 views at 07:43).
// Hook: the rule under 2 s; first frame shows a cat in a hard hat sitting on a half-built brick wall.

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


function hardhat(k, parent, pos, r = 1.2) {
  const g = k.group(pos, parent);
  k.mesh(new k.THREE.SphereGeometry(r, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), k.mat('#F2C94C', { metal: .2 }), [0, 0, 0], g);
  k.cyl(r * 1.2, r * 1.2, .08, k.mat('#E0B43A'), [0, 0, 0], g, 20);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.ground = k.ground('#C9B48A', 0);
  w.wallB = group(); for (let r = 0; r < 4; r++) for (let i = 0; i < 6 - (r > 2 ? 2 : 0); i++) box(1.1, .5, .8, mat(r % 2 ? '#B5523B' : '#C25E44'), [-2.8 + i * 1.14 + (r % 2) * .57, .25 + r * .52, 0], w.wallB);
  w.brick = box(1.1, .5, .8, mat('#C25E44'), [0, 0, 0]);
  w.c = cat(k, k.scene); w.cr = w.c.root; w.hat = hardhat(k, w.c.head, [-.15, .8, 0]);
  w.c2 = cat(k, k.scene); w.c2r = w.c2.root;
  w.bed = hardhat(k, k.scene, [0, 0, 0], 1.4); w.bed.children[0].rotation.x = Math.PI;
  w.house = group(); box(5, 4, 4, mat('#C9965A'), [0, 2, 0], w.house); box(1.4, 2.2, .05, mat('#5A3A1A'), [-1, 1.1, 2.01], w.house); w.win = box(1.2, 1, .05, mat('#3A2A1A'), [1.2, 2.6, 2.01], w.house); for (const s of [-1, 1]) { const f = box(2.6, .06, 4, mat('#B8854A'), [s * 3.1, 4.4, 0], w.house); f.rotation.z = s * -.6; }
  w.peek = group(); ball(.45, mat('#F2A04A'), [0, 0, 0], w.peek); for (const s of [-1, 1]) { k.cone(.16, .32, mat('#F2A04A'), [s * .25, .42, 0], w.peek, 4); ball(.08, mat('#7BC96F', { glow: .3 }), [s * .16, .08, .4], w.peek); }
  w.p = person(k, k.scene, '#3B6FD6');
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.14, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.root.visible = true; };
const zz = (w, t, on, at) => w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(at[0] + q * .6, at[1] + q * 1.3, at[2]); z.scale.setScalar(.6 + q * 1.2); z.visible = on; });

export default {
  id: '403',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CAT BUILDERS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS BUILD HOUSES'],
  title: 'In this town, cats are the builders',
  description: 'Bricks? Pushed off the wall. Hard hats? Used as beds. And the new house? A giant box. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'builder', 'shorts'],
  sources: ['Comedy sketch: cat builders are made up. Quiz fact: house cats and lions belong to the same family of mammals, the cat family Felidae (Encyclopaedia Britannica, "cat" and "Felidae").'],
  setup,
  scenes: [
    { say: 'In this town, cats build houses.', show: ['ground', 'wallB', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.6, 4, 11.5], look: [.4, 3.95, 0], fov: 52, to: { pos: [.6, 4, 10.9], look: [.4, 3.95, 0], fov: 50 } },
      update: (w, p, t) => { w.c2r.visible = false; w.house.visible = false; w.peek.visible = false; w.p.root.visible = false; w.bed.visible = false; w.brick.visible = false; ctAt(w.c, .6, 2.08, 0, -.4, .6); w.c.head.rotation.z = .1 + .05 * Math.sin(t * 3); } },
    { say: 'Bricks? Pushed off the wall.', label: 'OOPS', show: ['ground', 'wallB', 'cr', 'brick'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.5, 3.4, 10], look: [.3, 2.6, 0], fov: 52, to: { pos: [.5, 3.4, 9.5], look: [.3, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { ctAt(w.c, -.4, 2.08, -.1, 0, .55); w.c.head.rotation.y = -.3; const push = Math.min(1, p * 2.5), fall = Math.min(1, Math.max(0, (p - .4) / .35)); w.c.paw.position.set(.8 + push * 1.4, .9, .6); w.brick.position.set(1.4 + push * .5 + fall * .6, Math.max(.25, 2.33 - fall * fall * 2.1), .2); w.brick.rotation.set(0, 0, -fall * 1.6); } },
    { say: 'Hard hats? Used as beds.', label: 'ZZZ', show: ['ground', 'bed', 'c2r', 'zzz'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.4, 3, 7], look: [.2, 1.3, 0], fov: 50, to: { pos: [.4, 3, 6.5], look: [.2, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.wallB.visible = false; w.brick.visible = false; w.cr.visible = false; w.bed.position.set(0, 1.4, 0); ctAt(w.c2, .45, .75, 0, -.3, .42); w.c2.body.scale.set(1.1, .9, 1.1); w.c2.eyes.forEach(e => e.scale.y = .12); zz(w, t, true, [.6, 2.4, .4]); } },
    { say: 'And the new house? A giant box.', label: 'HOME', show: ['ground', 'house', 'peek'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.8, 4.2, 13.5], look: [1.3, 3.2, 0], fov: 52, to: { pos: [1.8, 4.2, 12.9], look: [1.3, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { w.bed.visible = false; w.c2r.visible = false; w.zzz.visible = false; w.house.position.set(0, 0, -1.6); w.peek.position.set(1.2, 2.55 + .12 * Math.max(0, Math.sin(t * 3)), .5); pAt(w.p, 3.4, 0, 1.4, -.6, .95); pose(w.p, .2, 0); w.p.head.rotation.x = -.2; w.p.mouth.scale.set(.6, 2.2, 1); } },
    { say: 'Cat builders: cool, cute, or way too lazy? Comment below.',
      quiz: { q: 'Cat builders are…', options: ['Cool', 'Cute', 'Way too lazy'], answer: 'Made up. Fun fact: house cats and lions are in the same family.' },
      show: ['ground', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.6, 8.5], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 8.5], look: [0, 2, 0] } },
      update: (w, p, t) => { w.house.visible = false; w.peek.visible = false; w.p.root.visible = false; ctAt(w.c, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
