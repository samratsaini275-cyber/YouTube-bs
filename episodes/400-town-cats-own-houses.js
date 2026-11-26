// Narrative 22: "In This Town… (short format, cats first)". Cat rules lead the channel (906: 975 views at 07:43).
// Hook: the rule under 2 s; first frame shows a cat on the sofa while a person waits with rent (a fish).

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


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#9AC6B8'), [0, 8, -4], w.wall); w.frame = box(2.2, 1.6, .1, mat('#7A4E2E'), [-3.4, 5.4, -3.8], w.wall); w.pic = box(1.8, 1.2, .05, mat('#F2A04A'), [-3.4, 5.4, -3.72], w.wall);
  w.sofa = group(); box(5, 1.2, 2.2, mat('#7C5CC4'), [0, .6, 0], w.sofa); box(5, 1.8, .5, mat('#6A4AB2'), [0, 1.8, -.85], w.sofa); for (const x of [-2.6, 2.6]) box(.5, 1.6, 2.2, mat('#6A4AB2'), [x, .8, 0], w.sofa);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.p = person(k, k.scene, '#3FA34D'); w.pr = w.p.root;
  w.fish = group(); const fb = ball(.35, mat('#8FB8D8', { metal: .3 }), [0, 0, 0], w.fish); fb.scale.set(1.6, .8, .6); const ft = cone(.25, .4, mat('#8FB8D8'), [-.65, 0, 0], w.fish, 4); ft.rotation.z = Math.PI / 2;
  w.cbox = group(); box(2.2, 1.6, 2, mat('#C9965A'), [0, .8, 0], w.cbox); for (const s of [-1, 1]) { const f = box(1.1, .05, 2, mat('#B8854A'), [s * 1.5, 1.7, 0], w.cbox); f.rotation.z = s * -.5; }
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.14, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const zz = (w, t, on, at) => w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(at[0] + q * .6, at[1] + q * 1.3, at[2]); z.scale.setScalar(.6 + q * 1.2); z.visible = on; });

export default {
  id: '400',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS OWN THE HOUSES',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS OWN HOUSES'],
  title: 'In this town, cats own the houses',
  description: 'Rent? Paid in fish. The best seat? Always taken. Break a rule and you sleep in the box. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'home', 'shorts'],
  sources: ['Comedy sketch: cats owning houses is made up. Quiz fact: archaeologists found a cat buried next to a person in a roughly 9,500-year-old grave on Cyprus, early evidence of cats living with people (Vigne et al., "Early taming of the cat in Cyprus", Science 304, 2004).'],
  setup,
  scenes: [
    { say: 'In this town, cats own houses.', show: ['floor', 'wall', 'frame', 'pic', 'sofa', 'cr', 'pr', 'fish'], sky: '#9AC6B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.3, 3.9, 13], look: [1.1, 3.75, 0], fov: 52, to: { pos: [1.3, 3.9, 12.4], look: [1.1, 3.75, 0], fov: 50 } },
      update: (w, p, t) => { w.cbox.visible = false; w.zzz.visible = false; w.sofa.position.set(-1, 0, -1.6); ctAt(w, -.6, 1.2, -1.4, .3, .55); w.c.head.rotation.z = .12; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .5); pAt(w.p, 2.8, 0, .8, -.6); pose(w.p, .2, 1.1); w.p.head.rotation.x = .3; w.p.arms[0].updateWorldMatrix(true, true); w.fish.position.copy(w.p.arms[0].localToWorld(new w.k.THREE.Vector3(0, -1.9, 0))); w.fish.rotation.set(0, -.6, 0); } },
    { say: 'Rent? Paid in fish.', label: 'MEOW', show: ['floor', 'wall', 'frame', 'pic', 'sofa', 'cr', 'pr', 'fish'], sky: '#9AC6B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.6, 11], look: [.8, 3.1, 0], fov: 50, to: { pos: [1, 3.6, 10.5], look: [.8, 3.1, 0], fov: 48 } },
      update: (w, p, t) => { w.sofa.position.set(-1, 0, -1.6); ctAt(w, -.6, 1.2, -1.4, .3, .55); const q = Math.min(1, p * 1.8); w.c.head.rotation.z = q > .9 ? -.15 + .1 * Math.sin(t * 16) : .1; pAt(w.p, 2.6 - q * .6, 0, .6, -.9); pose(w.p, .2, 1.4); w.p.head.rotation.x = .3; w.p.arms[0].updateWorldMatrix(true, true); const hand = w.p.arms[0].localToWorld(new w.k.THREE.Vector3(0, -1.9, 0)); w.cr.updateWorldMatrix(true, true); const mouth = w.c.head.localToWorld(new w.k.THREE.Vector3(1.4, -.4, 0)); w.fish.position.copy(hand.lerp(mouth, Math.max(0, (p - .5) / .3) > 1 ? 1 : Math.max(0, (p - .5) / .3))); w.fish.visible = p < .9; w.fish.rotation.set(0, -.6, 0); } },
    { say: 'The best seat? Always taken.', label: 'MINE', show: ['floor', 'wall', 'frame', 'pic', 'sofa', 'cr', 'pr'], sky: '#9AC6B8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.6, 10], look: [0, 2.4, 0], fov: 52, to: { pos: [0, 3.6, 9.5], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { w.fish.visible = false; w.sofa.position.set(0, 0, -1.6); ctAt(w, .8, 1.2, -1.4, 0, .6); w.c.body.scale.set(1.9, .8, 1); w.c.head.rotation.z = -.1; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .3); pAt(w.p, -.6, -1.2, 1.4, .1, .9); pose(w.p, .4, .8); w.p.mouth.scale.set(1.2, .5, 1); w.p.head.rotation.x = -.15; } },
    { say: 'Break a rule? You sleep in the box.', label: 'OUT', show: ['floor', 'wall', 'frame', 'pic', 'sofa', 'cr', 'pr', 'cbox', 'zzz'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.5, 3.8, 14.5], look: [.5, 2.7, 0], fov: 52, to: { pos: [.5, 3.8, 14], look: [.5, 2.7, 0], fov: 50 } },
      update: (w, p, t) => { w.sofa.position.set(-1.6, 0, -1.6); ctAt(w, -1.6, 1.2, -1.4, 0, .55); w.c.eyes.forEach(e => e.scale.y = .12); zz(w, t, true, [-1.2, 3.2, -1]); w.cbox.position.set(2.6, 0, .6); pAt(w.p, 2.6, -1.15 + .08 * Math.sin(t * 2), .6, -.3, .85); pose(w.p, .05, 0); w.p.mouth.scale.set(1.2, .5, 1); w.p.eyes.forEach(e => e.scale.y = .6); w.p.head.rotation.z = .15; } },
    { say: 'Cat landlords: cool, cute, or way too bossy? Comment below.',
      quiz: { q: 'Cat landlords are…', options: ['Cool', 'Cute', 'Way too bossy'], answer: 'Made up. But cats have lived with people for about 9,500 years.' },
      show: ['floor', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 8], look: [0, 1.8, 0], fov: 54, to: { pos: [-2, 2.5, 8], look: [0, 1.8, 0] } },
      update: (w, p, t) => { w.zzz.visible = false; w.cbox.visible = false; w.pr.visible = false; ctAt(w, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
