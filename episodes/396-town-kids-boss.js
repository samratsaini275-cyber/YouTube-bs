// Narrative 22: "In This Town… (short format, cats first)". In This Town titles are the channel's top format (906: 968 views at 23:07).
// Hook: the rule under 2 s; first frame shows a kid in a crown on a big chair, grown-ups waiting.

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
  w.wall = group(); box(40, 16, .3, mat('#F7E2C8'), [0, 8, -4], w.wall);
  w.kid = person(k, k.scene, '#E2453C'); w.kr = w.kid.root;
  w.crown = group(); cyl(.5, .5, .3, mat('#F2C94C', { metal: .6, glow: .2 }), [0, 0, 0], w.crown, 10); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.1, .3, mat('#F2C94C', { metal: .6 }), [Math.cos(a) * .45, .3, Math.sin(a) * .45], w.crown, 4); }
  w.throne = group(); box(2, 1.4, 1.6, mat('#7C5CC4'), [0, .7, 0], w.throne); box(2, 3, .4, mat('#6A4AB2'), [0, 2.2, -.7], w.throne);
  w.adults = []; w.ad = group(); for (let i = 0; i < 2; i++) { const a = person(k, w.ad, ['#3B6FD6', '#3FA34D'][i]); w.adults.push(a); }
  w.table = group(); box(5, .2, 2.4, mat('#FFFFFF'), [0, 2, 0], w.table); for (const x of [-2.2, 2.2]) for (const z of [-1, 1]) cyl(.08, .08, 2, mat('#7A4E2E'), [x, 1, z], w.table, 6);
  w.ice = group(); for (let i = 0; i < 4; i++) { const c = group([-1.6 + i * 1.05, 2.1, 0], w.ice); const cn = cone(.3, .8, mat('#D8A050'), [0, .4, 0], c, 10); cn.rotation.x = Math.PI; ball(.35, mat(['#F7C6D4', '#FFF4E0', '#7A4E2E', '#9AD8C4'][i]), [0, .9, 0], c); ball(.3, mat(['#9AD8C4', '#F7C6D4', '#FFF4E0', '#7A4E2E'][i]), [0, 1.35, 0], c); }
  w.clock = group(); const cf = cyl(.8, .8, .1, mat('#FFFFFF'), [0, 0, 0], w.clock, 20); cf.rotation.x = Math.PI / 2; w.hand = group([0, 0, .08], w.clock); box(.06, .6, .03, mat('#E2453C'), [0, .28, 0], w.hand); w.xmark = group([0, 0, .12], w.clock); for (const r of [.8, -.8]) { const b = box(1.6, .2, .05, mat('#E2453C', { glow: .4 }), [0, 0, 0], w.xmark); b.rotation.z = r; }
  w.door = group(); box(2, 4, .2, mat('#8B5A2B'), [0, 2, 0], w.door); box(3, .4, .3, mat('#5A3A1A'), [0, 4.2, 0], w.door); w.sign = box(1.4, .5, .05, mat('#FFFFFF'), [0, 3, .12], w.door);
  return w;
}

const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.root.visible = true; };
const crownOn = (w) => { w.kr.updateWorldMatrix(true, true); const top = w.kid.head.localToWorld(new w.k.THREE.Vector3(0, .85, 0)); w.crown.position.copy(top); w.crown.scale.setScalar(w.kr.scale.x); };

export default {
  id: '396',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE KIDS IN CHARGE',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'KIDS ARE THE BOSS'],
  title: 'In this town, kids are the boss',
  description: 'Dinner? Ice cream. Bedtime? Cancelled. And grown-ups? Sent to their rooms. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'kids', 'whatif', 'comedy', 'shorts'],
  sources: ['Comedy sketch: kids in charge is made up. Quiz fact: babies are born with roughly 300 bones; many fuse together as they grow, leaving about 206 in an adult (Encyclopaedia Britannica, "bone").'],
  setup,
  scenes: [
    { say: 'In this town, kids are the boss.', show: ['floor', 'wall', 'throne', 'crown', 'ad'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.2, 10], look: [0, 3.9, 0], fov: 52, to: { pos: [1, 3.2, 9.3], look: [0, 3.9, 0], fov: 50 } },
      update: (w, p, t) => { w.throne.position.set(0, 0, -1); pAt(w.kid, 0, 1.4, -.6, 0, .6); pose(w.kid, 1.2, 0); w.kid.mouth.scale.set(1.2, 2, 1); crownOn(w); w.adults.forEach((a, i) => { pAt(a, (i ? 1 : -1) * 3, 0, 1.4, (i ? -1 : 1) * .6, 1); pose(a, .2); a.head.rotation.x = .2; }); } },
    { say: 'Dinner? Ice cream.', label: 'YUM', show: ['floor', 'wall', 'table', 'ice', 'crown'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 4, 10], look: [0, 2.8, 0], fov: 52, to: { pos: [1, 4, 9.5], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { w.ad.visible = false; w.table.position.set(0, 0, 0); pAt(w.kid, 0, 0, 1.6, Math.PI, .6); w.kid.root.rotation.y = 0; pose(w.kid, 2.4, 0); w.kid.mouth.scale.set(1.2, 3, 1); w.kr.position.y = .15 * Math.abs(Math.sin(t * 8)); crownOn(w); } },
    { say: 'Bedtime? Cancelled.', label: 'NO BEDTIME', show: ['floor', 'wall', 'clock', 'crown'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.4, 10], look: [0, 3.4, 0], fov: 52, to: { pos: [1, 3.4, 9.5], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { w.clock.position.set(0, 5.2, -3.7); w.hand.rotation.z = -t * 5; w.xmark.visible = p > .4; pAt(w.kid, 0, 0, 1, 0, .7); pose(w.kid, 2.4, 0); w.kr.position.y = .25 * Math.abs(Math.sin(t * 9)); w.kid.mouth.scale.set(1.2, 2.6, 1); crownOn(w); } },
    { say: 'And grown-ups? Sent to their rooms.', label: 'HMPH', show: ['floor', 'wall', 'door', 'ad', 'crown'], sky: '#F7E2C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 3.6, 12], look: [0, 2.8, 0], fov: 52, to: { pos: [1, 3.6, 11.5], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { w.ad.visible = true; w.door.position.set(-2.4, 0, -3.6); pAt(w.kid, 2.4, 0, 1.6, -.4, .6); pose(w.kid, .3, 1.2); w.kid.arms[0].rotation.set(-1.4, 0, -.9); crownOn(w); w.adults.forEach((a, i) => { const q = Math.min(1, Math.max(0, p * 1.5 - i * .2)); pAt(a, -1 + i * 1.4 - q * 1.6, 0, 1.2 - q * 4, Math.PI - .6, .95); pose(a, .1); a.head.rotation.x = .35; a.root.visible = q < .98; }); } },
    { say: 'Kids in charge: cool, fun, or way too sticky? Comment below.',
      quiz: { q: 'Kids in charge are…', options: ['Cool', 'Fun', 'Way too sticky'], answer: 'Made up. Fun fact: babies have about 300 bones; adults have 206.' },
      show: ['floor', 'crown'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.6, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.6, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { w.ad.visible = false; pAt(w.kid, 0, 0, 0, 0, .7); pose(w.kid, 2.2, 0); w.kid.mouth.scale.set(1.2, 2, 1); crownOn(w); } },
  ],
};
