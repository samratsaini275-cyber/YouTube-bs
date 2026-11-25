// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a cat at a school desk with a tiny backpack.

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
  w.floor = k.ground('#D9C7A8', 0);
  w.wall = group(); box(40, 16, .3, mat('#F2E8D0'), [0, 8, -4], w.wall); w.board = box(7, 3, .1, mat('#2F5D3A'), [0, 4.6, -3.8], w.wall); box(7.4, 3.4, .08, mat('#8B5A2B'), [0, 4.6, -3.84], w.wall);
  w.chalk = group(); for (let i = 0; i < 4; i++) box(1 + (i % 2) * .6, .08, .02, mat('#FFFFFF'), [-2 + i * 1.3, 5 - (i % 2) * .6, -3.72], w.chalk);
  w.cats = []; for (let i = 0; i < 3; i++) { const c = cat(k, k.scene); w.cats.push(c); }
  w.desks = group(); for (let i = 0; i < 3; i++) { const d = group([-3.4 + i * 3.4, 0, 0], w.desks); box(2.4, .15, 1.6, mat('#C9965A'), [0, 1.6, 0], d); for (const x of [-1, 1]) for (const z of [-.6, .6]) cyl(.06, .06, 1.6, mat('#7A5A3A'), [x, .8, z], d, 6); }
  w.bag = group(); box(.8, 1, .4, mat('#E2453C'), [0, 0, 0], w.bag); box(.6, .3, .1, mat('#C0392B'), [0, -.2, .22], w.bag);
  w.zzz = group(); for (let i = 0; i < 6; i++) { const z = ball(.14, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  w.tank = group(); const gl = box(2, 1.4, 1.2, mat('#BFE3F7', { glow: .2 }), [0, .7, 0], w.tank); gl.material.transparent = true; gl.material.opacity = .45; box(2.1, .15, 1.3, mat('#555555'), [0, 0, 0], w.tank); w.fish = group([0, .7, 0], w.tank); const fb = ball(.22, mat('#F28C28', { glow: .2 }), [0, 0, 0], w.fish); fb.scale.set(1.5, 1, .6); const ft = cone(.15, .25, mat('#F28C28'), [-.38, 0, 0], w.fish, 3); ft.rotation.z = Math.PI / 2;
  w.table = group(); box(2.6, .15, 1.6, mat('#C9965A'), [0, 2.2, 0], w.table); for (const x of [-1.1, 1.1]) for (const z of [-.6, .6]) cyl(.06, .06, 2.2, mat('#7A5A3A'), [x, 1.1, z], w.table, 6);
  w.paper = group(); box(.9, .02, 1.2, mat('#FFFFFF'), [0, 0, 0], w.paper); for (let i = 0; i < 4; i++) box(.7, .025, .03, mat('#3B6FD6'), [0, .01, -.4 + i * .25], w.paper);
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.rotation.set(0, 0, 0); c.paw.position.set(.8, .5, .9); c.paw.rotation.set(0, 0, 0); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const hide = (w, from) => w.cats.forEach((c, i) => { if (i >= from) c.root.visible = false; });

export default {
  id: '370',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS AT SCHOOL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WENT TO SCHOOL?'],
  title: 'What would happen if cats went to school?',
  description: 'Nap time lasts all day. The class goldfish? Gone. And homework gets knocked off the desk. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'school', 'shorts'],
  sources: ['Comedy sketch: cats at school are made up. Quiz fact: a group of cats is called a clowder (Merriam-Webster, "clowder").'],
  setup,
  scenes: [
    { say: 'What if cats went to school?', show: ['floor', 'wall', 'desks', 'bag'], sky: '#F2E8D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.5, 3, 11], look: [0, 2.9, 0], fov: 50, to: { pos: [1.5, 3, 10.4], look: [0, 2.9, 0], fov: 48 } },
      update: (w, p, t) => { w.desks.visible = true; ctAt(w.cats[0], -.6, 0, -.6, -.9, .75); hide(w, 1); w.desks.children.forEach((d, i) => d.visible = i === 1); w.cats[0].head.rotation.z = .08 * Math.sin(t * 2); w.bag.position.set(-1.6, 1.8, -.8); w.bag.rotation.z = .1; } },
    { say: 'Nap time? All day.', label: 'ZZZ…', show: ['floor', 'wall', 'desks', 'zzz'], sky: '#F2E8D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 5, 12], look: [0, 2.2, 0], fov: 54, to: { pos: [2, 5, 11.5], look: [0, 2.2, 0], fov: 52 } },
      update: (w, p, t) => { w.desks.children.forEach(d => d.visible = true); w.cats.forEach((c, i) => { ctAt(c, -3.4 + i * 3.4 - .6, 1.7, 0, -1.2, .45); c.head.rotation.z = -.4; c.eyes.forEach(e => e.scale.y = .15); }); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 6) % 1, cx = -3.4 + (i % 3) * 3.4; z.position.set(cx + q * .6, 3.4 + q * 1.6, .3); z.scale.setScalar(.6 + q * 1.2); }); } },
    { say: 'The class goldfish? Gone.', label: 'GULP', show: ['floor', 'wall', 'table', 'tank'], sky: '#F2E8D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 4, 10], look: [0, 3, 0], fov: 52, to: { pos: [2, 4, 9.5], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.cats.forEach(c => c.root.visible = false); w.table.position.set(0, 0, 0); w.tank.position.set(.4, 2.3, 0); const c = w.cats[0]; ctAt(c, -2.4, 2.3, 0, -.2, .6); const grab = p > .45; c.paw.position.set(1.2 + (grab ? .9 : 0), 1.6 + (grab ? .8 : 0), .9); c.paw.rotation.z = grab ? 1.2 : 0; w.fish.position.set(.4 * Math.sin(t * 2), .7, 0); w.fish.rotation.y = Math.cos(t * 2) > 0 ? 0 : Math.PI; w.fish.visible = p < .55; c.eyes.forEach((e, i) => e.scale.y = i % 2 ? (grab ? .3 : 1.6) : 1); } },
    { say: 'And homework? Knocked off the desk.', label: 'BOOP', show: ['floor', 'wall', 'desks', 'paper'], sky: '#F2E8D0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 3.6, 8], look: [0, 2, 0], fov: 52, to: { pos: [2, 3.6, 7.5], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.desks.children.forEach((d, i) => d.visible = i === 1); hide(w, 1); const c = w.cats[0]; ctAt(c, -.9, 1.7, -.3, -.3, .5); const push = Math.min(1, Math.max(0, (p - .35) * 3)); c.paw.position.set(1 + push * .8, .5, .9); const fall = Math.max(0, p - .55) * 2; w.paper.position.set(.5 + push * .6 + fall * .8, 1.72 - fall * fall * 4 > 0 ? 1.72 - fall * fall * 4 : 0.02, .2); w.paper.rotation.z = -fall * 2; c.head.rotation.z = push > .5 ? .2 : 0; } },
    { say: 'Cats at school: cool, cute, or way too sleepy? Comment below.',
      quiz: { q: 'Cats at school are…', options: ['Cool', 'Cute', 'Way too sleepy'], answer: 'Made up. Fun fact: a group of cats is called a clowder.' },
      show: ['floor', 'bag'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { hide(w, 1); ctAt(w.cats[0], -.6, 0, 0, -.6, .8); w.cats[0].head.rotation.z = .08 * Math.sin(t * 2); w.bag.position.set(-1.2, 1.4, -.9); } },
  ],
};
