// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855).
// A made-up comedy sketch: people do not have cheek pouches. Hook: the premise as a question under 2 s; first frame shows a person with cheeks puffing up huge.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.3, .08, .05, mat('#5A2A1A'), [0, -.32, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.cheeks = [-1, 1].map(s => ball(.45, mat('#F5B9A0'), [s * .5, -.2, .35], p.head));
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const puff = (p, a) => p.cheeks.forEach((c, i) => { c.scale.setScalar(.3 + a * 1.2); c.position.x = (i ? 1 : -1) * (.45 + a * .35); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#F5E8DC'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#8E44AD'); w.pp = w.p.root;
  w.table = group(); box(4, .2, 2, mat('#8B5A2B'), [0, 2, 0], w.table); for (const [x, z] of [[-1.8, -.8], [1.8, -.8], [-1.8, .8], [1.8, .8]]) box(.15, 2, .15, mat('#6B4B2E'), [x, 1, z], w.table);
  w.food = group(); const cols = ['#E2453C', '#FFC21F', '#5FBF5F', '#E8B04A', '#FF7F2A', '#C0392B']; for (let i = 0; i < 6; i++) { const f = i % 2 ? ball(.22, mat(cols[i]), [0, 0, 0], w.food) : box(.35, .25, .35, mat(cols[i]), [0, 0, 0], w.food); f.userData.i = i; }
  w.cal = group(); box(1.8, 2.2, .1, mat('#FFFFFF'), [0, 0, 0], w.cal); box(1.8, .5, .12, mat('#E2453C'), [0, .85, 0], w.cal); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) box(.3, .3, .12, mat('#DDDDDD'), [-.6 + c * .4, .3 - r * .45, 0], w.cal);
  w.friend = person(k, k.scene, '#3B6FD6'); w.ff = w.friend.root; w.friend.cheeks.forEach(c => c.visible = false);
  w.bubble = group(); const bm = mat('#FFFFFF'); const bb = ball(.8, bm, [0, 0, 0], w.bubble); bb.scale.set(1.5, .9, .3); w.marks = group([0, 0, .3], w.bubble); for (let i = 0; i < 3; i++) box(.18, .18, .05, mat('#333333'), [-.45 + i * .45, 0, 0], w.marks);
  w.hamster = group(); const hm = mat('#E8A85A'); const hb = ball(1, hm, [0, 1, 0], w.hamster); hb.scale.set(1.2, 1, 1); ball(.6, mat('#FFF0DC'), [0, .9, .55], w.hamster).scale.set(1, 1, .5); for (const s of [-1, 1]) { ball(.12, mat('#111111'), [s * .35, 1.4, .85], w.hamster); ball(.25, hm, [s * .55, 1.95, .2], w.hamster); const ch = ball(.42, mat('#F2B880'), [s * .65, 1.05, .55], w.hamster); } ball(.08, mat('#FF8FA3'), [0, 1.2, 1], w.hamster);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '277',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HAMSTER CHEEKS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD HAMSTER CHEEKS?'],
  title: 'What would happen if humans had hamster cheeks?',
  description: 'A whole buffet in one go. Lunch for the entire week. Nobody can understand a word you say. And hamsters finally respect you. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'hamster', 'cheeks', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human cheek pouches are made up. Quiz fact: hamsters carry food in stretchy cheek pouches that reach back to their shoulders (Encyclopaedia Britannica, "hamster").'],
  setup,
  scenes: [
    { say: 'What if humans had hamster cheeks?', show: ['floor', 'wall', 'pp'], sky: '#F5E8DC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 8.4], look: [0, 3.95, 0], fov: 48, to: { pos: [0, 3.4, 7.6], look: [0, 3.95, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); puff(w.p, Math.min(1, p * 1.8)); w.p.eyes.forEach(e => e.scale.setScalar(1 + p * .3)); } },
    { say: 'Buffets? One trip. Everything.', show: ['floor', 'wall', 'pp', 'table', 'food'], sky: '#F5E8DC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1, 4.4, 10], look: [-.6, 3.2, 0], fov: 54, to: { pos: [.8, 4.4, 9.4], look: [-.6, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { w.table.position.set(.6, 0, .4); stand(w, -2.2, .2, .9); pose(w.p, .5, .6); const eaten = []; w.food.children.forEach(f => { const i = f.userData.i, q = Math.min(1, Math.max(0, p * 2.6 - i * .3)); f.position.set(-.6 + i * .5 + q * (-2.2 + .5 - (-.6 + i * .5)), 2.3 + q * .7, .4 + q * .2); f.visible = q < .97; if (q >= .97) eaten.push(i); }); puff(w.p, .2 + eaten.length / 6 * .8); } },
    { say: 'Lunch? Packed for the whole week.', label: 'MON → FRI', show: ['floor', 'wall', 'pp', 'cal'], sky: '#F5E8DC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.6, 3.6, 9], look: [.2, 3.6, 0], fov: 50, to: { pos: [.5, 3.6, 8.4], look: [.2, 3.6, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.6, 0, .2); pose(w.p, .3); puff(w.p, 1); w.p.head.rotation.z = .1 * Math.sin(t * 2); w.cal.position.set(2.2, 4.4, -2); } },
    { say: 'Talking? Nobody understands you.', show: ['floor', 'wall', 'pp', 'ff', 'bubble'], sky: '#F5E8DC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4, 11], look: [0, 3.8, 0], fov: 52, to: { pos: [0, 4, 10.3], look: [0, 3.8, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -1.6, 0, .5); pose(w.p, 1 + .4 * Math.sin(t * 6), .4); puff(w.p, 1); w.ff.position.set(1.8, 0, 0); w.ff.rotation.set(0, -.5, 0); pose(w.friend, .2); w.friend.head.rotation.z = .3; w.friend.eyes.forEach(e => e.scale.set(1, .5, 1)); w.bubble.position.set(-1.2, 6.2, 0); w.bubble.scale.setScalar(1 + .05 * Math.sin(t * 8)); } },
    { say: 'And hamsters? Finally, they respect you.', show: ['floor', 'wall', 'pp', 'hamster'], sky: '#F5E8DC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 11], look: [0, 3.2, 0], fov: 52, to: { pos: [0, 3.6, 10.3], look: [0, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -1.6, 0, .5); pose(w.p, .2); puff(w.p, .9); w.hamster.scale.setScalar(1.25); w.hamster.position.set(1.5, 0, 0); w.hamster.rotation.set(0, -.6, p > .5 ? -.3 * Math.abs(Math.sin(t * 4)) : 0); w.p.head.rotation.x = p > .5 ? .2 * Math.abs(Math.sin(t * 4)) : 0; } },
    { say: 'Hamster cheeks: useful, awesome, or way too weird? Comment below.',
      quiz: { q: 'Would you want hamster cheeks?', options: ['Useful', 'Awesome', 'Way too weird'], answer: 'Made up for people. Real hamster pouches reach their shoulders.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); puff(w.p, .5 + .5 * Math.sin(t * 2)); } },
  ],
};
