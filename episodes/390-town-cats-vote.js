// Narrative 22: "In This Town… (short format, cats first)". The top short is 906 "In this town, cats say what you're thinking" (968 views at 23:07).
// Hook: the rule under 2 s; first frame shows a cat dropping a vote into a ballot box.

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
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#EAF0F6'), [0, 8, -4], w.wall); w.banner = box(8, 1.2, .1, mat('#3E6FD6'), [0, 6.4, -3.8], w.wall); for (let i = 0; i < 6; i++) box(.6, .3, .12, mat('#FFFFFF'), [-2.6 + i * 1.05, 6.4, -3.7], w.wall);
  w.ballot = group(); box(2, 1.8, 1.6, mat('#FFFFFF'), [0, .9, 0], w.ballot); box(.9, .08, .2, mat('#222222'), [0, 1.81, 0], w.ballot); box(1.2, .5, .05, mat('#3E6FD6'), [0, 1, .81], w.ballot);
  w.paper = box(.6, .02, .4, mat('#FFFFFF'), [0, 0, 0]);
  w.cats = []; for (let i = 0; i < 4; i++) w.cats.push(cat(k, k.scene));
  w.box = group(); box(2.4, 1.6, 2, mat('#C9965A'), [0, .8, 0], w.box); w.rib = box(.3, 1.65, 2.05, mat('#F2C94C'), [0, .8, 0], w.box); w.medal = cyl(.4, .4, .06, mat('#F2C94C', { metal: .6, glow: .2 }), [0, 1.3, 1.05], w.box, 16); w.medal.rotation.x = Math.PI / 2;
  w.conf = group(); for (let i = 0; i < 14; i++) { const c = box(.12, .12, .02, mat(['#FF5FA2', '#FFC21F', '#4FB3E8'][i % 3], { glow: .3 }), [0, 0, 0], w.conf); c.userData.i = i; c.castShadow = false; }
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.bed = group(); box(3, .6, 4.4, mat('#8B5A2B'), [0, .5, 0], w.bed); box(2.9, .4, 4.2, mat('#FFFFFF'), [0, 1, 0], w.bed); box(2.9, .3, 2.6, mat('#7C5CC4'), [0, 1.3, .8], w.bed);
  w.clock = group(); const cf = cyl(.6, .6, .1, mat('#FFFFFF'), [0, 0, 0], w.clock, 20); cf.rotation.x = Math.PI / 2; box(.05, .45, .03, mat('#222222'), [0, .2, .07], w.clock); const h2 = box(.05, .3, .03, mat('#E2453C'), [.1, -.05, .07], w.clock); h2.rotation.z = 2.4;
  w.bedroom = box(40, 16, .3, mat('#2A3150'), [0, 8, -4.2]);
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.paw.rotation.set(0, 0, 0); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const show = (w, n) => w.cats.forEach((c, i) => c.root.visible = i < n);
const stand = (w, x, y, z, ry, s = 1) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(s); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.pp.visible = true; };

export default {
  id: '390',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT ELECTION',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS GET TO VOTE'],
  title: 'In this town, cats get to vote',
  description: 'Election day? Every cat votes for the nap party. The winner? A cardboard box. And the first new law? Breakfast at five in the morning. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'election', 'shorts'],
  sources: ['Comedy sketch: cats voting is made up. Quiz fact: a real cat named Stubbs was the honorary mayor of Talkeetna, Alaska, from 1997 until he died in 2017 (NPR, "Stubbs, The Cat Who Served As Honorary Mayor Of Alaskan Town, Dies At 20", 2017).'],
  setup,
  scenes: [
    { say: 'In this town, cats get to vote.', show: ['floor', 'wall', 'ballot', 'paper'], sky: '#EAF0F6', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.5, 3.4, 11], look: [0, 3.2, 0], fov: 50, to: { pos: [1.4, 3.4, 10.3], look: [0, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { w.pp.visible = false; show(w, 1); w.ballot.position.set(1.2, 0, 0); const c = w.cats[0]; ctAt(c, -1.2, 0, .6, -.85, .75); c.paw.position.set(1.6, 2.2, .9); c.paw.rotation.z = 1; c.root.updateWorldMatrix(true, true); const pw = c.paw.getWorldPosition(new w.k.THREE.Vector3()); const drop = Math.max(0, p - .55) * 3; w.paper.position.set(pw.x + .3, pw.y + .1 - drop * 1.2, pw.z); w.paper.visible = drop < 1; } },
    { say: 'Election day? Every cat votes for the nap party.', label: 'ZZZ PARTY', show: ['floor', 'wall', 'ballot'], sky: '#EAF0F6', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 4, 13], look: [0, 2, 0], fov: 54, to: { pos: [0, 4, 12.5], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.paper.visible = false; show(w, 4); w.ballot.position.set(0, 0, -1); w.cats.forEach((c, i) => { ctAt(c, -3.6 + i * 2.4, 0, 1.4, -1.57, .55); c.eyes.forEach(e => e.scale.y = .15); c.head.rotation.z = -.3 + .05 * Math.sin(t * 2 + i); }); } },
    { say: 'The winner? A cardboard box.', label: 'WINNER!', show: ['floor', 'wall', 'box', 'conf'], sky: '#EAF0F6', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.2, 9], look: [0, 1.6, 0], fov: 50, to: { pos: [1, 3.2, 8.5], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { show(w, 2); w.box.position.set(0, 0, 0); ctAt(w.cats[0], -2.8, 0, 1.2, -.8, .5); ctAt(w.cats[1], 2.8, 0, 1.2, -2.3, .5); w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .7 + i / 14) % 1; c.position.set(-3 + (i * .43) % 6, 5 - q * 5, .6 + (i % 3) * .3); c.rotation.set(t * 4 + i, t * 3, 0); }); } },
    { say: 'And the first new law? Breakfast at five in the morning.', label: 'MEOOOW!', show: ['bedroom', 'bed', 'clock', 'pp'], sky: '#141A33', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 5, 9], look: [0, 1.6, 0], fov: 52, to: { pos: [3, 5, 8.5], look: [0, 1.6, 0], fov: 50 } },
      update: (w, p, t) => { show(w, 1); w.bed.position.set(0, 0, 0); w.clock.position.set(-2.4, 4, -4); stand(w, 0, 1.2, -.4, 0, .55); w.pp.rotation.x = -1.4; const wake = p > .4; w.p.eyes.forEach(e => e.scale.setScalar(wake ? 1.4 : .3)); w.p.mouth.scale.set(1.2, wake ? 3 : 1, 1); const c = w.cats[0]; ctAt(c, .2, 1.4, .8, -1.4, .45); c.head.rotation.z = .3; c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2 : 1.2); c.paw.position.set(1, .6 + .3 * Math.abs(Math.sin(t * 8)), .9); } },
    { say: 'Cats that vote: cool, cute, or way too bossy? Comment below.',
      quiz: { q: 'Cats that vote are…', options: ['Cool', 'Cute', 'Way too bossy'], answer: 'Made up. But a real cat was honorary mayor of a town in Alaska for 20 years.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { w.pp.visible = false; show(w, 1); ctAt(w.cats[0], -.6, 0, 0, -.6, .8); w.cats[0].head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
