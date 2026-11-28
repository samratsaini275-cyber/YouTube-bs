// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears.
// Hook: the premise as a question under 2 s; first frame shows a person with a huge fluffy black-and-white skunk tail.

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

// A big fluffy black-and-white skunk tail on the person's back.
function skunkTail(k, p) { const blk = k.mat('#1C1C1C', { rough: .95 }), wht = k.mat('#FDFEFE', { rough: .95 }); p.tail = k.group([0, .9, -.8], p.root); p.tail.scale.setScalar(1.3); for (let i = 0; i < 6; i++) { const a = i / 5 * 1.6; const b = k.ball(.45 + Math.sin(a) * .15, blk, [0, Math.sin(a) * 1.6, -Math.cos(a) * .9 + .05], p.tail); b.scale.set(1, 1, 1.1); const st = k.ball(.2, wht, [0, Math.sin(a) * 1.6 + .1, -Math.cos(a) * .9 + .05 - .3], p.tail); st.scale.set(.6, 1.2, 1); } }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#EAF2F8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#AF7AC5'); w.pp = w.p.root; skunkTail(k, w.p);
  w.q = []; const sh = ['#E74C3C', '#3498DB', '#2ECC71']; for (let i = 0; i < 3; i++) w.q.push(person(k, k.scene, sh[i]));
  w.stink = group(); for (let i = 0; i < 6; i++) { const s = box(.06, .5, .06, mat('#82E0AA', { glow: .7 }), [0, 0, 0], w.stink); s.userData.i = i; s.castShadow = false; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.case = group(); box(.6, .45, .2, mat('#8E5B2B'), [0, 0, 0], w.case); box(.25, .08, .05, mat('#5D4037'), [0, .28, 0], w.case);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const qput = (q, x, z, ry) => { q.root.visible = true; q.root.position.set(x, 0, z); q.root.rotation.set(0, ry, 0); q.head.rotation.set(0, 0, 0); q.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .15)); q.eyes.forEach(e => e.scale.set(1, 1, 1)); q.mouth.scale.set(1, 1, 1); };
const noQ = (w) => w.q.forEach(q => q.root.visible = false);
const stinky = (w, x, y, z, t) => w.stink.children.forEach(s => { const f = (t * .7 + s.userData.i / 6) % 1; s.position.set(x + (s.userData.i - 2.5) * .3 + Math.sin(f * 8) * .15, y + f * 1.6, z); s.rotation.z = Math.sin(f * 8) * .5; });
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#EAF2F8', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '560',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SKUNK TAILS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'SKUNK TAILS?'],
  title: 'What would happen if we had skunk tails?',
  description: 'The queue steps back. Every argument is over in one second. And the cat packs a suitcase. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'skunk', 'tail', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human skunk tails are made up. Quiz fact: a skunk\'s spray is accurate to about two metres (more than six feet), and its total range is considerably farther (Encyclopaedia Britannica, "Skunk").'],
  setup,
  scenes: [
    { say: 'What if we had skunk tails?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [3.4, 4.4, 8.6], look: [0, 2.9, 0], fov: 52, to: { pos: [3.2, 4.4, 8], look: [0, 2.9, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'stink', 'case'); noQ(w); w.cr.visible = false; stand(w, 0, 0, 2); pose(w.p, .3); w.p.tail.rotation.y = .2 * Math.sin(t * 3); w.p.mouth.scale.set(1.2, 1.6, 1); } },
    { say: 'Waiting in line? Everyone steps back.', show: ['floor', 'wall', 'pp', 'stink'], ...env,
      cam: { pos: [4, 3.6, 10], look: [0, 2.4, 0], fov: 54, to: { pos: [3.8, 3.6, 9.4], look: [0, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { hide(w, 'case'); w.cr.visible = false; stand(w, 0, 0, Math.PI / 2); pose(w.p, .2); const f = Math.min(1, p * 1.5); w.q.forEach((q, i) => { qput(q, -2.2 - i * 1.6 - f * 2.5, 0, Math.PI / 2); q.eyes.forEach(e => e.scale.set(1, .3, 1)); q.arms[0].rotation.set(-2.2, 0, .3); }); stinky(w, -.6, 2.4, -.8, t); } },
    { say: 'Arguments? Over in one second.', show: ['floor', 'wall', 'pp', 'stink'], ...env,
      cam: { pos: [0, 3.4, 10], look: [0, 2.4, 0], fov: 54, to: { pos: [0, 3.4, 9.4], look: [0, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { hide(w, 'case'); w.cr.visible = false; noQ(w); stand(w, -1.2, 0, .6); pose(w.p, .4); qput(w.q[0], 1.4, 0, -.6); const won = p > .4; w.q[0].arms.forEach(a => a.rotation.set(won ? -2.6 : -.6, 0, a.userData.s * .4)); w.q[0].mouth.scale.set(1, won ? 2.5 : 1.5, 1); w.q[0].root.position.x = 1.4 + (won ? (p - .4) * 4 : 0); w.stink.visible = won; stinky(w, -1.2, 2.2, -.8, t); } },
    { say: 'And the cat? Packed a suitcase.', show: ['floor', 'wall', 'pp', 'case'], ...env,
      cam: { pos: [0, 2.8, 9], look: [0, 2, 0], fov: 52, to: { pos: [0, 2.8, 8.4], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'stink'); noQ(w); stand(w, -1.6, -.4, .5); pose(w.p, .3); const x = .6 + p * 2.6; ctAt(w, x, 0, .6, 0, .5); w.c.paw.position.set(1.1, .5 + Math.abs(Math.sin(t * 6)) * .3, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .4 : .3); w.case.position.set(x + .4, .45, 1.1); } },
    { say: 'A fluffy tail: cute, smelly, or way too much? Comment below.',
      quiz: { q: 'Would you want a skunk tail?', options: ['Cute', 'Smelly', 'Way too much'], answer: 'Fun fact: a real skunk can aim its spray accurately at about two metres away.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [3, 2, 8], look: [0, 2.8, 0], fov: 50, to: { pos: [1, 2, 8.5], look: [0, 2.8, 0] } },
      update: (w, p, t) => { hide(w, 'stink', 'case', 'wall'); noQ(w); w.cr.visible = false; stand(w, 0, 0, 2); pose(w.p, .3); w.p.tail.rotation.y = .2 * Math.sin(t * 3); } },
  ],
};
