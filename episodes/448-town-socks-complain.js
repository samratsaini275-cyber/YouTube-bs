// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: a sock complains about the cat.
// Hook: the rule under 2 s; first frame shows a sock with a face next to a cat holding a score card.

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

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);

function shoe(k, col, parent) {
  const { mat, box, group } = k; const s = group([0, 0, 0], parent);
  box(1.2, .25, .5, mat('#FFFFFF'), [0, .12, 0], s); const top = box(.8, .35, .48, mat(col), [-.15, .4, 0], s); box(.5, .2, .46, mat(col), [.35, .3, 0], s);
  return s;
}

function sock(k, col, parent) {
  const { mat, box, group } = k; const s = group([0, 0, 0], parent);
  box(.5, 1.2, .25, mat(col), [0, .6, 0], s); box(.75, .45, .25, mat(col), [.12, .02, 0], s); box(.52, .18, .27, mat('#FFFFFF'), [0, 1.2, 0], s);
  return s;
}

function setup(k) {
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#D6EAF8'), [0, 8, -4], w.wall);
  w.sock = sock(k, '#E74C3C', k.scene); w.f = face(k, w.sock, [0, .75, .14], .35);
  w.pile = group(); const cols = ['#F4D03F', '#5DADE2', '#AF7AC5', '#58D68D', '#F5B041']; for (let i = 0; i < 9; i++) { const s = sock(k, cols[i % 5], w.pile); s.position.set((i % 3 - 1) * .5, .1 * Math.floor(i / 3), (Math.floor(i / 3) - 1) * .4); s.rotation.set(Math.PI / 2, 0, i * .7); s.scale.setScalar(.7); }
  w.steam = group(); for (let i = 0; i < 3; i++) cyl(.04, .04, .5, mat('#FFFFFF', { glow: .5 }), [i * .3 - .3, 1, 0], w.steam, 6);
  w.shoe = group(); shoe(k, '#34495E', w.shoe).scale.setScalar(1.6);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const sockAt = (w, x, y, z, rz = 0, s = .8) => { w.sock.position.set(x, y, z); w.sock.rotation.set(0, 0, rz); w.sock.scale.setScalar(s); w.sock.visible = true; };

export default {
  id: '448',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SOCKS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'SOCKS COMPLAIN'],
  title: 'In this town, socks complain to cats',
  description: 'Stolen? Every night. Fresh from the dryer? Five stars, says the cat. So the sock hides in a shoe. Found it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'socks', 'shorts'],
  sources: ['Comedy sketch: complaining socks are made up. Quiz fact: the aroma of food is vital to a cat\'s enjoyment, so cats prefer their food warm, because heat releases odours (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, socks complain.', show: ['floor', 'wall', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 7.5], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.5, 7], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { sockAt(w, -.8, 0, .4); talk(w.f, t); brow(w.f, .4); ctAt(w, .8, 0, 0, -.7, .36); holdCard(w, null); } },
    { say: 'Stolen? Every night.', label: 'YOINK', show: ['floor', 'wall'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 8.5], look: [0, .9, 0], fov: 50, to: { pos: [0, 1.5, 8], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; const x = 1.6 - p * 2; ctAt(w, x, .06 * Math.abs(Math.sin(t * 12)), 0, Math.PI * .85, .36); w.c.head.updateWorldMatrix(true, false); const m = w.c.head.localToWorld(new w.k.THREE.Vector3(1.1, -.9, 0)); sockAt(w, m.x, m.y - .35, m.z + .2, .3, .55); talk(w.f, t); brow(w.f, -.4); } },
    { say: 'Fresh from the dryer? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'pile', 'steam', 'card'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.6, 6.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 1.6, 6], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { w.pile.position.set(.1, 0, 0); w.steam.position.set(.1, .1 * Math.sin(t * 3), 0); sockAt(w, -1.2, 0, .5); talk(w.f, t, p < .4); brow(w.f, .5); ctAt(w, .4, .3, 0, -.4, .36); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = p < .45 ? .15 : 1); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the sock? Hides in a shoe.', label: 'FOUND IT', show: ['floor', 'wall', 'shoe'], sky: '#D6EAF8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.5, 8], look: [0, .9, 0], fov: 50, to: { pos: [0, 1.5, 7.5], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.shoe.position.set(-.9, 0, .4); const found = p > .6; sockAt(w, -1.05, found ? .9 + (p - .6) * 1.5 : .45, .4, 0, .6); talk(w.f, t, !found); brow(w.f, found ? -.4 : .2); ctAt(w, .2, 0, 0, Math.PI * .9, .36); w.c.paw.position.set(found ? 1.6 : 1.3, found ? 1.4 : .9, .6); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'Where do lost socks go? Comment below.',
      quiz: { q: 'Where do lost socks go?', options: ['The cat', 'The dryer', 'Another world'], answer: 'Made up. But real cats like food warm, because heat brings out the smell.' },
      show: ['floor', 'pile', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 1.6, 7], look: [0, .9, 0], fov: 54, to: { pos: [-2, 1.6, 7], look: [0, .9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.steam.visible = false; w.shoe.visible = false; w.pile.position.set(.1, 0, 0); sockAt(w, -1.2, 0, .5); talk(w.f, t, false); ctAt(w, .4, .3, 0, -.5, .38); holdCard(w, true); } },
  ],
};
