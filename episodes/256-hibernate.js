// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people cannot hibernate. Hook: the premise as a question under 2 s; first frame shows a person asleep under snow.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.lids = [-.28, .28].map(x => k.box(.32, .06, .05, mat('#3A2A1A'), [x, .2, .74], p.head));
  return p;
}
const sleep = (p, on) => { p.eyes.forEach(e => e.visible = !on); p.lids.forEach(l => l.visible = on); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9CCB7A', 0);
  w.snow = k.ground('#F4F8FC', .02); 
  w.room = group(); box(40, 20, .5, mat('#DCE8F2'), [0, 10, -4], w.room); box(4, 2, .1, mat('#BFE3F7'), [3, 5, -3.7], w.room);
  w.bed = group(); box(6, .8, 3, mat('#8B5A2B'), [0, .4, 0], w.bed); box(5.8, .4, 2.8, mat('#FFFFFF'), [0, 1, 0], w.bed); w.blanket = box(4.4, .5, 2.9, mat('#3B6FD6'), [.6, 1.4, 0], w.bed); box(1.4, .4, 2, mat('#FFFFFF'), [-2.2, 1.4, 0], w.bed);
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.flakes = group(); for (let i = 0; i < 40; i++) { const f = ball(.07, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .8 }); box(.5, .09, .07, m, [0, .22, 0], z); box(.5, .09, .07, m, [0, -.22, 0], z); const d = box(.6, .09, .07, m, [0, 0, 0], z); d.rotation.z = .72; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  w.alarm = group(); cyl(.5, .5, .3, mat('#E2453C'), [0, .5, 0], w.alarm, 20).rotation.x = Math.PI / 2; for (const x of [-.35, .35]) ball(.15, mat('#FFC21F'), [x, 1, 0], w.alarm); box(.1, .3, .02, mat('#111111'), [0, .55, .17], w.alarm);
  w.table = group(); box(1.2, .1, 1.2, mat('#8B5A2B'), [0, 1.4, 0], w.table); cyl(.08, .08, 1.4, mat('#6B4B2E'), [0, .7, 0], w.table, 6);
  w.phone = group(); box(.5, .9, .06, mat('#222222'), [0, 0, 0], w.phone); w.screen = box(.44, .8, .02, mat('#BFE3F7', { glow: .6 }), [0, 0, .04], w.phone);
  w.badge = group(); for (let i = 0; i < 1; i++) { cyl(.25, .25, .04, mat('#E2453C', { glow: .6 }), [0, 0, 0], w.badge, 16).rotation.x = Math.PI / 2; }
  w.bear = group(); const br = mat('#7A4A22', { rough: .8 }); const bb = ball(1.6, br, [0, 1.6, 0], w.bear); bb.scale.set(1.3, 1, 1); ball(.9, br, [1.8, 2.2, 0], w.bear); for (const z of [-.5, .5]) ball(.3, br, [1.6, 3, z], w.bear); ball(.3, mat('#C8935A'), [2.5, 2, 0], w.bear); w.bearLids = [-.3, .3].map(z => box(.05, .06, .25, mat('#111111'), [2.62, 2.35, z], w.bear));
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const lie = w => { w.pp.position.set(1.1, 1.75, 0); w.pp.rotation.set(0, 0, Math.PI / 2); w.pp.rotation.order = 'XYZ'; w.p.head.rotation.set(0, 0, 0); };
const fall = (w, t) => w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .4 + i / 40) % 1; f.position.set(-5 + (i * 2.3) % 10, 8 - q * 8, -2 + (i % 5)); });
const zz = (w, x, y, z, t) => w.zz.children.forEach(c => { const q = (t * .5 + c.userData.i / 3) % 1; c.position.set(x + q * 1.2, y + q * 2.4, z); c.scale.setScalar(.5 + q * .8); });

export default {
  id: '256',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HUMAN HIBERNATION',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'COULD HIBERNATE?'],
  title: 'What would happen if humans could hibernate?',
  description: 'Winter? Sleep straight through it. Alarm clocks give up. You wake up to four months of messages. And bears finally get a roommate. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'sleep', 'bear', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human hibernation is made up.'],
  setup,
  scenes: [
    { say: 'What if humans could hibernate?', show: ['ground', 'room', 'bed', 'pp', 'zz'], sky: '#DCE8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [-.6, 4.2, 9.5], look: [-1, 2.2, 0], fov: 50, to: { pos: [-.6, 4, 8.8], look: [-1, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { lie(w); sleep(w.p, true); zz(w, -2.6, 2.6, 0, t); } },
    { say: 'Winter? Just sleep through it.', label: 'DECEMBER → MARCH', show: ['snow', 'room', 'bed', 'pp', 'zz', 'flakes'], sky: '#BFD0E0', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 4.8, 11], look: [-.8, 2, 0], fov: 52, to: { pos: [0, 4.8, 10.3], look: [-.8, 2, 0], fov: 50 } },
      update: (w, p, t) => { lie(w); sleep(w.p, true); zz(w, -2.6, 2.6, 0, t); fall(w, t); } },
    { say: 'Alarm clocks? They just give up.', show: ['ground', 'room', 'bed', 'pp', 'alarm', 'table', 'zz'], sky: '#DCE8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [-1.6, 3.4, 7], look: [-2.6, 2.2, 0], fov: 48, to: { pos: [-1.6, 3.4, 6.4], look: [-2.6, 2.2, 0], fov: 46 } },
      update: (w, p, t) => { lie(w); sleep(w.p, true); zz(w, -2.6, 2.6, 0, t); w.table.position.set(-3.8, 0, 1.2); w.alarm.position.set(-3.8, 1.45 + (p < .6 ? .05 * Math.abs(Math.sin(t * 40)) : 0), 1.2); w.alarm.rotation.z = p < .6 ? .1 * Math.sin(t * 40) : 1.4; } },
    { say: 'Waking up? Four months of messages.', label: '*9,999+*', show: ['ground', 'room', 'pp', 'phone', 'badge'], sky: '#DCE8F2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1.4, 3.6, 7], look: [0, 3.2, 0], fov: 46, to: { pos: [1.3, 3.6, 6.4], look: [0, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, .2); sleep(w.p, false); w.p.head.rotation.x = .3; w.phone.position.set(.3, 2.5, .9); w.phone.rotation.x = -.6; w.badge.position.set(.62, 2.85, 1.0); w.badge.scale.setScalar(.5 + p * .5); w.p.eyes.forEach(e => e.scale.setScalar(1 + p * .6)); } },
    { say: 'And bears? Finally, a roommate.', show: ['snow', 'room', 'pp', 'bear', 'zz'], sky: '#BFD0E0', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [0, 4.4, 13], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 4.4, 12], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.pp.position.set(4.4, .85, 1); w.pp.rotation.set(0, 0, Math.PI / 2); sleep(w.p, true); w.bear.position.set(-2.2, 0, 0); w.bear.rotation.y = .2; zz(w, .6, 1.8, 1, t); } },
    { say: 'Hibernating: useful, awesome, or too much sleep? Comment below.',
      quiz: { q: 'Would you want to hibernate?', options: ['Useful', 'Awesome', 'Too much sleep'], answer: 'Human hibernation is made up. Bears do the real thing.' },
      show: ['ground', 'room', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); sleep(w.p, Math.sin(t * 2.5) > .3); } },
  ],
};
