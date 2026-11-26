// Narrative 22: "In This Town… (short format, cats first)". In This Town titles are the channel's top format (906: 968 views at 23:07).
// Hook: the rule under 2 s; first frame shows townspeople floating above the street.

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
  w.ground = k.ground('#8CC56A', 0);
  w.street = box(40, .05, 5, mat('#555B66'), [0, .03, 2]);
  w.houses = group(); for (let i = 0; i < 4; i++) { const h = group([-6 + i * 4, 0, -3], w.houses); box(3, 2.6, 2.6, mat(['#F2D9B8', '#F7D6E0', '#D8E8F0', '#F2E2A8'][i]), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.ppl = []; w.crowd = group(); for (let i = 0; i < 3; i++) { const q = person(k, w.crowd, ['#3B6FD6', '#E2453C', '#3FA34D'][i]); w.ppl.push(q); }
  w.table = group(); box(2.4, .15, 1.4, mat('#A06A3E'), [0, 2, 0], w.table); for (const x of [-1, 1]) for (const z of [-.5, .5]) cyl(.06, .06, 2, mat('#7A4E2E'), [x, 1, z], w.table, 6);
  w.food = group(); const plate = cyl(.4, .4, .05, mat('#FFFFFF'), [0, 0, 0], w.food, 16); const egg = cyl(.25, .25, .06, mat('#FFFFFF'), [0, .05, 0], w.food, 12); ball(.1, mat('#F2B233'), [0, .1, 0], w.food); w.toast = box(.4, .08, .4, mat('#D8A050'), [0, 0, 0]); w.cup = cyl(.15, .12, .3, mat('#E2453C'), [0, 0, 0], undefined, 10);
  w.bus = group(); box(6, 2.2, 2.2, mat('#F2C94C'), [0, 1.5, 0], w.bus); for (let i = 0; i < 4; i++) box(.9, .7, .05, mat('#9FD3EE'), [-2 + i * 1.3, 2, 1.12], w.bus); for (const x of [-2, 2]) for (const z of [-1.1, 1.1]) { const wh = cyl(.45, .45, .25, mat('#222222'), [x, .45, z], w.bus, 12); wh.rotation.x = Math.PI / 2; }
  w.cal = group(); box(1.6, 2, .1, mat('#FFFFFF'), [0, 0, 0], w.cal); box(1.6, .5, .12, mat('#E2453C'), [0, .75, 0], w.cal);
  w.bumps = group(); for (let i = 0; i < 3; i++) { const s = ball(.25, mat('#FFE14A', { glow: .8 }), [0, 0, 0], w.bumps); s.userData.i = i; }
  return w;
}

const pAt = (q, x, y, z, ry, s = 1, rx = 0, rz = 0) => { q.root.position.set(x, y, z); q.root.rotation.set(rx, ry, rz); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.root.visible = true; };

export default {
  id: '391',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE NO-GRAVITY SUNDAY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'NO GRAVITY ON SUNDAYS'],
  title: 'In this town, gravity takes Sundays off',
  description: 'Breakfast? It floats away. The bus? Upside down. And Monday morning? Everyone falls back down at once. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'gravity', 'whatif', 'comedy', 'shorts'],
  sources: ['Comedy sketch: gravity-free Sundays are made up. Quiz fact: astronauts on the International Space Station float because the station and everyone in it are constantly falling around the Earth, not because there is no gravity up there (NASA, "What Is Microgravity?").'],
  setup,
  scenes: [
    { say: 'In this town, no gravity on Sundays.', show: ['ground', 'street', 'houses', 'crowd', 'cal'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 15], look: [0, 5.8, 0], fov: 54, to: { pos: [1, 4, 14.3], look: [0, 5.8, 0], fov: 52 } },
      update: (w, p, t) => { w.ppl.forEach((q, i) => { pAt(q, -3 + i * 3, 2.6 + i * .8 + .4 * Math.sin(t * 1.5 + i), 1.6, -.3 + i * .3, .7, .3 * Math.sin(t + i), .5 * Math.sin(t * .8 + i)); pose(q, 2.2, 0); q.mouth.scale.set(1.2, 2.4, 1); }); w.cal.position.set(4.6, 2.4, -1.6); w.cal.rotation.z = .2 * Math.sin(t); } },
    { say: 'Breakfast? It floats away.', label: 'COME BACK!', show: ['ground', 'houses', 'table', 'food', 'toast', 'cup', 'crowd'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 9], look: [0, 3, 0], fov: 52, to: { pos: [2, 3, 8.5], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.ppl.forEach((q, i) => q.root.visible = i === 0); w.table.position.set(0, 0, 0); const up = Math.max(0, p - .2) * 3; w.food.position.set(-.4, 2.1 + up, 0); w.food.rotation.z = up * .5; w.toast.position.set(.5, 2.15 + up * 1.3, .2); w.toast.rotation.set(up, up * .6, 0); w.cup.position.set(.1, 2.25 + up * .8, -.3); w.cup.rotation.x = up * .8; const q = w.ppl[0]; pAt(q, 2, 0, .8, -.6, .8); pose(q, 1.2, 1.4); q.mouth.scale.set(1.2, up > .5 ? 3 : 1, 1); } },
    { say: 'The bus? Upside down.', label: 'WHOOPS', show: ['ground', 'street', 'houses', 'bus'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 5, 18], look: [0, 4, 0], fov: 54, to: { pos: [2, 5, 17.5], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { w.ppl.forEach(q => q.root.visible = false); const r = Math.min(1, p * 1.4); w.bus.position.set(-1 + p * 2, 2 + r * 3, 2); w.bus.rotation.set(0, 0, r * Math.PI + .1 * Math.sin(t * 2)); } },
    { say: 'And Monday morning? Everyone falls back down. At once.', label: 'BUMP!', show: ['ground', 'street', 'houses', 'crowd', 'bumps'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1 && t < 1.4 ? .3 : 0,
      cam: { pos: [1, 4, 15], look: [0, 3, 0], fov: 54, to: { pos: [1, 4, 14.5], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.bus.rotation.set(0, 0, 0); const f = Math.min(1, t / 1); w.ppl.forEach((q, i) => { const h = (3 + i * .8) * (1 - f * f); pAt(q, -3 + i * 3, h, 1.6, -.3 + i * .3, .7, t > 1 ? 0 : .3, t > 1 ? (i - 1) * .3 : .4); pose(q, t > 1 ? .4 : 2.2, 0); q.mouth.scale.set(1.2, 3, 1); }); w.bumps.children.forEach(s => { const i = s.userData.i, q = Math.max(0, t - 1); s.position.set(-3 + i * 3, 3.4 + q * 2, 1.6); s.scale.setScalar(.5 + q * 1.4); s.visible = t > 1 && q < 1; }); } },
    { say: 'No-gravity Sundays: cool, fun, or way too floaty? Comment below.',
      quiz: { q: 'No-gravity Sundays are…', options: ['Cool', 'Fun', 'Way too floaty'], answer: 'Made up. Astronauts float because they are always falling around the Earth.' },
      show: ['ground', 'crowd'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 3, 8], look: [0, 3, 0], fov: 54, to: { pos: [-2, 3, 8], look: [0, 3, 0] } },
      update: (w, p, t) => { w.ppl.forEach((q, i) => q.root.visible = i === 0); pAt(w.ppl[0], 0, 1 + .3 * Math.sin(t * 1.5), 0, 0, .8, .2 * Math.sin(t), .3 * Math.sin(t * .8)); pose(w.ppl[0], 2.2, 0); } },
  ],
};
