// Narrative 5: "What Would Happen If…". A made-up comedy sketch: babies are not in charge (officially).
// Hook rule: the premise as a question under 2 s, first frame already showing a baby in a tie at a podium, waving a rattle.

function baby(k, parent, x, z, yaw = 0, tie = '#E2453C') {
  const { mat, box, cyl, ball, cone, group } = k;
  const b = { root: group([x, 0, z], parent) };
  b.root.rotation.y = yaw;
  const body = ball(1.3, mat('#F4F6F8'), [0, 1.4, 0], b.root); body.scale.y = 1.1;
  box(.3, .9, .1, mat(tie), [0, 1.7, 1.25], b.root);
  b.head = group([0, 3.3, 0], b.root);
  ball(1.15, mat('#F7D2B0'), [0, 0, 0], b.head);
  b.eyes = [-.4, .4].map(x2 => ball(.16, mat('#111111'), [x2, .15, 1.05], b.head));
  b.lids = [-.4, .4].map(x2 => { const l = box(.4, .06, .05, mat('#111111'), [x2, .15, 1.12], b.head); l.visible = false; return l; });
  b.mouth = ball(.18, mat('#E46F7A'), [0, -.4, 1.05], b.head);
  const curl = k.torus(.2, .06, mat('#C98B4E'), [0, 1.15, .2], b.head); curl.rotation.x = 0;
  b.arm = group([1.1, 2, 0], b.root); ball(.4, mat('#F7D2B0'), [.3, .5, .3], b.arm);
  b.rattle = group([.4, 1, .4], b.arm); cyl(.06, .06, .8, mat('#FFD21F'), [0, 0, 0], b.rattle, 8); ball(.3, mat('#E46FD6'), [0, .5, 0], b.rattle);
  return b;
}
function asleep(b, on) { b.eyes.forEach(e => e.visible = !on); b.lids.forEach(l => l.visible = on); b.head.rotation.x = on ? .5 : 0; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9CED6', 0);
  // the podium
  w.stage = group();
  box(40, 18, .5, mat('#2F4F7F'), [0, 9, -6], w.stage);
  for (let i = 0; i < 7; i++) box(.5, 18, .1, mat('#FFFFFF'), [-12 + i * 4, 9, -5.7], w.stage).castShadow = false;
  box(4, 3.4, 2.4, mat('#6B4B2E'), [0, 1.7, 0], w.stage);
  cyl(1.2, 1.2, .1, mat('#E8C547', { metal: .8 }), [0, 2.4, 1.25], w.stage, 24).rotation.x = Math.PI / 2;
  for (const x of [-.6, .6]) { const m = cyl(.06, .06, 1.2, mat('#2A2A2A'), [x, 4, .9], w.stage, 8); m.rotation.x = -.4; }
  w.boss = baby(k, k.scene, 0, .6);
  // boardroom
  w.board = group([0, 0, 60]);
  box(40, 18, .5, mat('#E6E9EE'), [0, 9, -8], w.board);
  box(14, .4, 6, mat('#5A3A1E'), [0, 3, 0], w.board);
  for (const x of [-6, 6]) for (const z of [-2.4, 2.4]) box(.4, 3, .4, mat('#3A2A1E'), [x, 1.5, z], w.board);
  w.sleepers = [];
  for (let i = 0; i < 6; i++) { const b = baby(k, w.board, -5 + (i % 3) * 5, (i < 3 ? -4.2 : 4.2), i < 3 ? 0 : Math.PI, ['#E2453C', '#2F6FD6', '#22C55E'][i % 3]); b.root.position.y = 1.2; w.sleepers.push(b); }
  w.zz = group([0, 9, 60]);
  for (let i = 0; i < 4; i++) { const z = box(.8, .2, .1, mat('#FFFFFF', { glow: 1.5 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  // the vault of snacks
  w.vault = group([0, 0, 120]);
  box(30, 16, .5, mat('#9AA3AE', { metal: .5 }), [0, 8, -8], w.vault);
  const door = cyl(5, 5, .8, mat('#C9CED6', { metal: .9, rough: .2 }), [-9, 6, -7.4], w.vault, 40); door.rotation.x = Math.PI / 2;
  w.snacks = group([0, 0, 0], w.vault);
  for (let i = 0; i < 70; i++) {
    const kind = i % 3, col = ['#FFD21F', '#E2453C', '#FFFFFF'][kind];
    const x = ((i * 37) % 120) / 10 - 6, z = ((i * 23) % 70) / 10 - 4, y = .4 + ((i * 7) % 6) * .5;
    if (kind === 2) { cyl(.35, .35, 1, mat(col), [x, y + .2, z], w.snacks, 12); cyl(.2, .1, .4, mat('#E46F7A'), [x, y + .9, z], w.snacks, 10); }
    else { const s = box(1, .4, .7, mat(col), [x, y, z], w.snacks); s.rotation.y = i; }
  }
  w.sign = box(5, 1.4, .2, mat('#22C55E', { glow: .4 }), [4, 10, -7.5], w.vault);
  // law signing
  w.desk = group([0, 0, 180]);
  box(30, 16, .5, mat('#F2D9B8'), [0, 8, -8], w.desk);
  box(8, .4, 4, mat('#6B4B2E'), [0, 3, -1], w.desk);
  for (const x of [-3.6, 3.6]) box(.4, 3, 3.6, mat('#5A3A1E'), [x, 1.5, -1], w.desk);
  w.paper = box(2.2, .05, 2.8, mat('#FFFFFF'), [0, 3.25, -.5], w.desk);
  w.brocc = group([-1.2, 3.6, -.3], w.desk);
  cyl(.15, .2, .8, mat('#8BC34A'), [0, 0, 0], w.brocc, 8);
  for (const [x, y, z] of [[0, .6, 0], [.3, .5, .1], [-.3, .5, -.1], [0, .5, .3]]) ball(.35, mat('#2E8B4A'), [x, y, z], w.brocc);
  w.ban = k.torus(.9, .12, mat('#E0161E'), [-1.2, 3.9, -.3], w.desk); w.ban.rotation.x = Math.PI / 2;
  const slash = box(1.7, .2, .1, mat('#E0161E'), [-1.2, 3.9, -.25], w.desk); slash.rotation.z = Math.PI / 4;
  w.judge = baby(k, w.desk, 0, -3.2, 0, '#8B5CF6'); w.judge.root.position.y = 1.4;
  w.stamp = group([1.5, 4.5, -.3], w.desk); box(.8, .5, .8, mat('#E0161E'), [0, 0, 0], w.stamp); cyl(.15, .15, .8, mat('#5A3A1E'), [0, .6, 0], w.stamp, 8);
  // time-out corner
  w.corner = group([0, 0, 240]);
  box(14, 16, .5, mat('#D7E3F0'), [0, 8, -6], w.corner); box(.5, 16, 14, mat('#C3D3E6'), [-7, 8, 1], w.corner);
  const chair = group([-4.5, 0, -3.5], w.corner);
  box(1.4, .2, 1.4, mat('#FF8A1F'), [0, 1.2, 0], chair); for (const [x, z] of [[-.6, -.6], [.6, -.6], [-.6, .6], [.6, .6]]) box(.15, 1.2, .15, mat('#FF8A1F'), [x, .6, z], chair);
  w.adult = group([-4.5, 1.3, -3.6], w.corner); w.adult.rotation.y = Math.PI + .78;
  cyl(1, 1.1, 3.2, mat('#2A2A2A'), [0, 1.6, 0], w.adult, 16); ball(1, mat('#F2C9A0'), [0, 3.8, 0], w.adult); box(.3, 1.2, .1, mat('#2F6FD6'), [0, 2.4, 1.02], w.adult);
  w.watcher = baby(k, w.corner, 2, 2, -.9, '#E2453C');
  return w;
}

export default {
  id: '078',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BABY GOVERNMENT',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BABIES', 'RAN THE WORLD?'],
  title: 'What would happen if babies ran the world?',
  description: 'Shorter meetings. Bigger snack budget. Strict new rules for adults. (A made-up baby government.)',
  tags: ['whatif', 'funny', 'babies', 'babyboss', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the baby government is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if babies ran the world?',
      show: ['ground', 'stage', 'boss'], sky: '#2F4F7F', lightAt: [0, 4, 1], lightDist: 16,
      cam: { pos: [3, 3, 19], look: [0, 9, 0], fov: 46, to: { pos: [2.5, 3, 17], look: [0, 9, 0], fov: 44 } },
      update: (w, p, t) => { w.boss.root.position.set(0, 3.4, .6); w.boss.arm.rotation.z = .6 * Math.sin(t * 9); w.boss.mouth.scale.setScalar(1 + .6 * Math.abs(Math.sin(t * 7))); asleep(w.boss, false); },
    },
    {
      say: 'Every meeting ends in nap time.',
      show: ['ground', 'board', 'zz'], sky: '#E6E9EE', lightAt: [0, 4, 60], lightDist: 18,
      cam: { pos: [10, 11, 74], look: [0, 3.5, 60], fov: 50, to: { pos: [9, 10.5, 71], look: [0, 3.5, 60], fov: 48 } },
      update: (w, p, t) => { w.sleepers.forEach((b, i) => { asleep(b, t > .3 + i * .15); b.arm.rotation.z = 0; }); w.zz.children.forEach(z => { const f = (t * .6 + z.userData.i / 4) % 1; z.position.set(-3 + z.userData.i * 2, f * 3, 0); z.scale.setScalar(.6 + f); }); },
    },
    {
      say: 'The national budget? All snacks.',
      show: ['ground', 'vault'], sky: '#9AA3AE', lightAt: [0, 4, 120], lightDist: 18,
      cam: { pos: [6, 9, 134], look: [0, 2, 120], fov: 50, to: { pos: [5.5, 8.5, 131], look: [0, 2, 120], fov: 48 } },
      update: (w, p, t) => { w.sign.material.emissiveIntensity = .4 + .4 * Math.sin(t * 5); },
    },
    {
      say: 'New law: broccoli is banned.',
      show: ['ground', 'desk'], sky: '#F2D9B8', lightAt: [0, 4, 179], lightDist: 14,
      cam: { pos: [3, 9, 188], look: [0, 4, 179], fov: 46, to: { pos: [2.5, 8.5, 186], look: [0, 4, 179], fov: 44 } },
      shake: (t) => (t % .6) < .1 ? .2 : 0,
      update: (w, p, t) => { w.stamp.position.y = 4.5 - .9 * Math.max(0, Math.sin(t * Math.PI / .6)); w.judge.arm.rotation.z = .4 * Math.sin(t * 6); asleep(w.judge, false); },
    },
    {
      say: 'And grown-ups? Straight to time-out.',
      show: ['ground', 'corner'], sky: '#D7E3F0', lightAt: [-2, 4, 240], lightDist: 16,
      cam: { pos: [7, 7, 254], look: [-1.5, 3.5, 238.5], fov: 50, to: { pos: [6, 7, 251], look: [-1.5, 3.5, 238.5], fov: 48 } },
      update: (w, p, t) => { w.watcher.arm.rotation.z = .3 * Math.sin(t * 4); w.watcher.root.rotation.y = -.9 + .1 * Math.sin(t * 2); asleep(w.watcher, false); w.adult.rotation.z = .03 * Math.sin(t * 2); },
    },
    {
      say: 'Baby boss: genius, disaster, or nap? Comment below.',
      quiz: { q: 'A world run by babies would be...', options: ['Genius', 'A disaster', 'One long nap'], answer: 'It is a made-up baby government, so you are still in charge. For now.' },
      show: ['ground', 'stage', 'boss'], sky: '#274B73', lightAt: [0, 4, 1], lightDist: 16,
      cam: { pos: [8, 2, 15], look: [0, 9, 0], fov: 46, to: { pos: [-8, 2, 15], look: [0, 9, 0] } },
      update: (w, p, t) => { w.boss.root.position.set(0, 3.4, .6); w.boss.arm.rotation.z = .6 * Math.sin(t * 9); asleep(w.boss, false); },
    },
  ],
};
