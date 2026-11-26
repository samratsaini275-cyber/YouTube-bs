// Narrative 22: "In This Town… (short format, cats first)". Cat rules lead the channel (906: 975 views at 07:43).
// Hook: the rule under 2 s; first frame shows a cat on a bed beside a sleeping person, clock at 5:00.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#B9A58A', 0);
  w.wall = group(); box(40, 16, .3, mat('#5B6C9A'), [0, 8, -4], w.wall); w.win = box(3, 2.4, .1, mat('#FFD9A0', { glow: .5 }), [3.6, 5.4, -3.8], w.wall);
  w.bed = group(); box(7, 1, 3.4, mat('#7A5236'), [0, .5, 0], w.bed); box(6.8, .5, 3.2, mat('#FFFFFF'), [0, 1.25, 0], w.bed); box(.4, 2.6, 3.4, mat('#7A5236'), [-3.5, 1.3, 0], w.bed); w.pillow = box(1.8, .5, 1.6, mat('#EAF2FF'), [-1.6, 1.75, -.7], w.bed);
  w.p = person(k, k.scene, '#4FA0D8'); w.pr = w.p.root;
  w.duvet = box(4.4, .9, 3.3, mat('#F2C94C'), [1.6, 2.05, 0], w.bed);
  w.stand = group(); box(1.6, 2, 1.6, mat('#8B5A2B'), [0, 1, 0], w.stand);
  w.clock = group(); box(1, .7, .4, mat('#222222'), [0, 0, 0], w.clock); w.digits = box(.75, .35, .05, mat('#FF4A3A', { glow: .9 }), [0, 0, .22], w.clock);
  w.phone = group(); box(.5, .08, .9, mat('#111111'), [0, 0, 0], w.phone); box(.42, .02, .8, mat('#7FD3FF', { glow: .7 }), [0, .05, 0], w.phone);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFE38A', { glow: .9 }), [0, 0, 0], w.stars); s.userData.i = i; }
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const sleeper = (w, awake) => { const q = w.p; w.pr.position.set(1.4, 2.2, 0); w.pr.rotation.set(0, 0, Math.PI / 2); w.pr.scale.setScalar(.8); q.head.rotation.set(0, 0, 0); q.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .1)); q.eyes.forEach(e => e.scale.y = awake ? 1 : .12); q.mouth.scale.set(1, awake ? 3 : 1, 1); };
const room = (w) => { w.bed.position.set(0, 0, 0); w.stand.position.set(-4.6, 0, 0); w.clock.position.set(-4.6, 2.35, .2); };
const twinkle = (w, t, on, at) => w.stars.children.forEach(s => { const a = s.userData.i / 5 * Math.PI * 2 + t * 4; s.position.set(at[0] + Math.cos(a) * .9, at[1] + .9 + Math.sin(t * 6 + s.userData.i) * .1, at[2] + Math.sin(a) * .9); s.visible = on; });

export default {
  id: '397',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS ARE THE ALARM',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS ARE ALARMS'],
  title: 'In this town, cats are the alarm clock',
  description: 'Five a.m.? A boop on the nose. Snooze? Your phone goes off the table. Still asleep? The cat sits on your head. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'morning', 'shorts'],
  sources: ['Comedy sketch: cat alarm clocks are made up. Quiz fact: cats are crepuscular, meaning they are naturally most active around dawn and dusk (PetMD, "Are Cats Nocturnal?"; Animal Humane Society, "Cat keeping you awake? How to manage night activity").'],
  setup,
  scenes: [
    { say: 'In this town, cats are alarms.', show: ['floor', 'wall', 'bed', 'pr', 'duvet', 'stand', 'clock', 'cr'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-1.9, 3.4, 10], look: [-2.1, 3.05, 0], fov: 52, to: { pos: [-1.9, 3.4, 9.4], look: [-2.1, 3.05, 0], fov: 50 } },
      update: (w, p, t) => { room(w); w.phone.visible = false; sleeper(w, false); ctAt(w, -2.75, 2, 0, 0, .4); w.c.head.rotation.z = .1 * Math.sin(t * 3); twinkle(w, t, false, [0, 0, 0]); } },
    { say: 'Five a.m.? Boop on the nose.', label: 'BOOP', show: ['floor', 'wall', 'bed', 'pr', 'duvet', 'stand', 'clock', 'cr'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-1.6, 3, 6.4], look: [-1.8, 2.6, 0], fov: 50, to: { pos: [-1.6, 3, 6], look: [-1.8, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { room(w); sleeper(w, p > .55); ctAt(w, -2.75, 2, 0, 0, .4); const b = Math.max(0, Math.sin(t * 7)); w.c.paw.position.set(.8 + b * 1.4, .6, .9 + b * .4); w.c.head.rotation.z = .15; } },
    { say: 'Snooze? Your phone hits the floor.', label: 'CRASH', show: ['floor', 'wall', 'stand', 'clock', 'phone', 'cr'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-3.8, 3.8, 7], look: [-4.3, 1.8, 0], fov: 50, to: { pos: [-3.8, 3.8, 6.5], look: [-4.3, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { room(w); w.clock.position.set(-4.2, 2.35, -.5); ctAt(w, -4.1, 2, .1, Math.PI, .36); w.c.head.rotation.z = -.1; const push = Math.min(1, p * 2.2), fall = Math.min(1, Math.max(0, (p - .45) / .35)); w.c.paw.position.set(.8 + push * 2.2, .5, .9); const x = -4.9 - push * .7 - fall * .5, y = Math.max(.05, 2.04 - fall * fall * 2); w.phone.position.set(x, y, .3); w.phone.rotation.set(fall * 2, 0, fall * 1.5); } },
    { say: 'Still asleep? It sits on your head.', label: 'OOF', show: ['floor', 'wall', 'bed', 'pr', 'duvet', 'stand', 'clock', 'cr', 'stars'], sky: '#3A4A7A', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [-1, 4.4, 8.4], look: [-1.1, 2.7, 0], fov: 52, to: { pos: [-1, 4.4, 7.8], look: [-1.1, 2.7, 0], fov: 50 } },
      update: (w, p, t) => { room(w); sleeper(w, true); w.p.eyes.forEach(e => e.scale.y = .5); const d = Math.min(1, p * 2); ctAt(w, -1.9 - .5 * (1 - d), 2.6 + 1.2 * Math.sin(d * Math.PI) + .15 * d, -.1, Math.PI, .42); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); twinkle(w, t, d >= 1, [-1.24, 2.9, .4]); } },
    { say: 'Cat alarms: cool, cute, or way too early? Comment below.',
      quiz: { q: 'Cat alarm clocks are…', options: ['Cool', 'Cute', 'Way too early'], answer: 'Made up. But real cats are most active at dawn and dusk.' },
      show: ['floor', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 8], look: [0, 1.8, 0], fov: 54, to: { pos: [-2, 2.5, 8], look: [0, 1.8, 0] } },
      update: (w, p, t) => { twinkle(w, t, false, [0, 0, 0]); ctAt(w, .4, 0, 0, -.6, .7); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
