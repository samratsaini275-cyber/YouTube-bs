// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Animal ability for humans, copying 269's 'humans + animal trait' premise.
// Hook: the premise as a question under 2 s; first frame shows a person asleep on their feet with Zs floating up.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#C8A27A', .01);
  w.wallM = mat('#1B2A4A'); w.wall = group(); box(40, 20, .5, w.wallM, [0, 10, -3], w.wall);
  w.people = []; const shirts = ['#5DADE2', '#E74C3C', '#F1C40F', '#2ECC71']; for (let i = 0; i < 4; i++) { const p = person(k, k.scene, shirts[i]); w.people.push(p); }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .6 }); box(.35, .06, .05, m, [0, .15, 0], z); box(.35, .06, .05, m, [0, -.15, 0], z); const d = box(.42, .06, .05, m, [0, 0, 0], z); d.rotation.z = .7; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.bed = group(); box(3, .5, 2, mat('#8E5B2B'), [0, .25, 0], w.bed); box(2.9, .3, 1.9, mat('#FDFEFE'), [0, .65, 0], w.bed); box(1, .25, .6, mat('#AED6F1'), [-1, .9, 0], w.bed); box(.2, 1.2, 2, mat('#8E5B2B'), [-1.5, .6, 0], w.bed);
  w.sign = group(); cyl(.06, .06, 2.6, mat('#7F8C8D'), [0, 1.3, 0], w.sign, 8); box(.8, .5, .05, mat('#2E86C1'), [0, 2.6, 0], w.sign);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const pput = (p, x, z, ry) => { p.root.visible = true; p.root.position.set(x, 0, z); p.root.rotation.set(0, ry, 0); p.head.rotation.set(0, 0, 0); p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .1)); p.eyes.forEach(e => e.scale.set(1, 1, 1)); p.mouth.scale.set(1, 1, 1); };
const doze = (p, t, i = 0) => { p.eyes.forEach(e => e.scale.set(1, .15, 1)); p.head.rotation.z = .2 + .05 * Math.sin(t * 1.5 + i); p.head.rotation.x = .15; };
const noPeople = (w, from = 0) => w.people.forEach((p, i) => { if (i >= from) p.root.visible = false; });
const zzz = (w, x, y, z, t) => w.zz.children.forEach(q => { const f = (t * .5 + q.userData.i / 3) % 1; q.position.set(x + f * 1.2, y + f * 1.6, z); q.scale.setScalar(.6 + f); });
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#1B2A4A', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '558',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SLEEPING STANDING UP',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE SLEPT', 'STANDING UP?'],
  title: 'What would happen if we slept standing up, like horses?',
  description: 'Bedtime? Just stand there. A nap at the bus stop. Sleepovers are everyone in a row. And the cat takes the whole bed. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'sleep', 'horse', 'comedy', 'shorts'],
  sources: ['Comedy sketch: people sleeping standing up is made up. Quiz fact: horses can sleep standing up because of the stay apparatus, a system of tendons, ligaments and muscles that stabilizes and essentially locks the leg joints (Encyclopaedia Britannica, "How Do Horses Sleep?").'],
  setup,
  scenes: [
    { say: 'What if we slept standing up?', show: ['floor', 'wall', 'zz'], ...env,
      cam: { pos: [0, 3.4, 9], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3.4, 8.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'bed', 'sign'); w.cr.visible = false; noPeople(w, 1); pput(w.people[0], 0, 0, 0); doze(w.people[0], t); zzz(w, .5, 4, .5, t); } },
    { say: 'No bed needed. Just stand there.', show: ['floor', 'wall', 'zz'], ...env,
      cam: { pos: [0, 3.4, 9], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3.4, 8.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'bed', 'sign'); w.cr.visible = false; noPeople(w, 1); pput(w.people[0], -.6, -1.2, .2); w.people[0].root.rotation.x = -.12; doze(w.people[0], t); zzz(w, -.1, 4, -1, t); } },
    { say: 'A nap at the bus stop? Easy.', show: ['ground', 'sign', 'zz'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.4, 9.5], look: [0, 2.6, 0], fov: 52, to: { pos: [0, 3.4, 9], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'bed', 'floor', 'wall'); w.ground.visible = true; w.cr.visible = false; noPeople(w, 2); w.sign.position.set(1.6, 0, -.5); pput(w.people[0], -1.2, 0, .2); doze(w.people[0], t); pput(w.people[1], .9, -.3, -.2); doze(w.people[1], t, 1); zzz(w, -.4, 4, .3, t); } },
    { say: 'Sleepovers? Everyone in a row.', show: ['floor', 'wall', 'zz'], ...env,
      cam: { pos: [0, 3.6, 11], look: [0, 2.6, 0], fov: 54, to: { pos: [0, 3.6, 10.4], look: [0, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { hide(w, 'bed', 'sign'); w.cr.visible = false; w.people.forEach((q, i) => { pput(q, -3 + i * 2, -.4, 0); doze(q, t, i); }); zzz(w, -.5, 4.2, 0, t); } },
    { say: 'And the bed? The cat got all of it.', show: ['floor', 'wall', 'bed', 'zz'], ...env,
      cam: { pos: [-.4, 3.4, 10], look: [-.4, 1.8, 0], fov: 50, to: { pos: [-.4, 3.4, 9.5], look: [-.4, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'sign'); noPeople(w, 1); pput(w.people[0], -2.4, -1, .4); doze(w.people[0], t); w.bed.position.set(.6, 0, 0); ctAt(w, 1.2, .8, .1, -.4, .45); w.c.body.scale.set(1.6, .8, 1.3); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .3 : .2); zzz(w, 1.4, 2.2, .2, t); } },
    { say: 'Sleeping standing up: comfy, wobbly, or totally weird? Comment below.',
      quiz: { q: 'Would you sleep standing up?', options: ['Comfy', 'Wobbly', 'Totally weird'], answer: 'Fun fact: horses can sleep standing up. Special tendons lock their legs in place.' },
      show: ['floor', 'zz'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 2, 8], look: [0, 3, 0], fov: 50, to: { pos: [-1, 2, 8], look: [0, 3, 0] } },
      update: (w, p, t) => { hide(w, 'bed', 'sign', 'wall'); w.cr.visible = false; noPeople(w, 1); pput(w.people[0], 0, 0, .2); doze(w.people[0], t); zzz(w, .5, 4, .5, t); } },
  ],
};
