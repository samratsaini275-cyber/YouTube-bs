// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate rain out loud.
// Hook: the rule under 2 s; first frame shows a cat on a windowsill with rain outside, holding up a score card.

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
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#E8DCC8'), [0, 8, -2], w.wall);
  w.win = group(); box(3, 2.4, .05, mat('#5B7FA6', { glow: .3 }), [0, 0, 0], w.win); for (const [x, y, ww, hh] of [[0, 1.25, 3.3, .2], [0, -1.25, 3.3, .2], [-1.6, 0, .2, 2.7], [1.6, 0, .2, 2.7], [0, 0, .1, 2.4]]) box(ww, hh, .15, mat('#FFFFFF'), [x, y, .05], w.win);
  w.door = group(); box(1.8, 3.2, .05, mat('#5B7FA6', { glow: .3 }), [0, 1.6, 0], w.door); for (const [x, y, ww, hh] of [[0, 3.25, 2.1, .2], [-1, 1.6, .2, 3.3], [1, 1.6, .2, 3.3]]) box(ww, hh, .15, mat('#8A5A2B'), [x, y, .05], w.door);
  w.sill = box(4, .25, 1.4, mat('#FFFFFF'), [0, 0, 0]);
  w.drops = []; for (let i = 0; i < 24; i++) { const d = cyl(.02, .02, .3, mat('#AED6F1', { glow: .6 }), [0, 0, 0], k.scene, 4); d.userData.o = [Math.random(), Math.random(), Math.random()]; w.drops.push(d); }
  w.puddle = cyl(.7, .7, .02, mat('#5DADE2', { glow: .2 }), [0, .01, 0], k.scene, 20);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const rain = (w, t, cx, cy, ww, hh, z) => w.drops.forEach(d => { const [a, b, c] = d.userData.o; d.visible = true; d.position.set(cx + (a - .5) * ww, cy + hh / 2 - ((t * 1.6 + b) % 1) * hh, z); });

export default {
  id: '440',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE RAIN',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE RAIN'],
  title: 'In this town, cats rate the rain',
  description: 'Rain outside? Five stars to watch. A rainy walk? Nope. A wet paw? Shake, shake, shake. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'rain', 'shorts'],
  sources: ['Comedy sketch: cat rain reviews are made up. Quiz fact: the Turkish Van cat breed is well known for its affinity to water (Cat Fanciers\' Association, "Turkish Van" breed profile).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate rain.', show: ['floor', 'wall', 'win', 'sill', 'card'], sky: '#E8DCC8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 8], look: [0, 3.45, 0], fov: 50, to: { pos: [0, 3.2, 7.5], look: [0, 3.45, 0], fov: 48 } },
      update: (w, p, t) => { w.win.position.set(0, 3.2, -1.85); w.sill.position.set(0, 1.8, -1.2); rain(w, t, 0, 3.2, 2.8, 2.2, -1.8); ctAt(w, .5, 1.92, -.9, -.4, .4); holdCard(w, null); } },
    { say: 'Rain outside? Five stars to watch.', label: '5 STARS', show: ['floor', 'wall', 'win', 'sill', 'card'], sky: '#E8DCC8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3.2, 8], look: [0, 3.45, 0], fov: 50, to: { pos: [0, 3.2, 7.5], look: [0, 3.45, 0], fov: 48 } },
      update: (w, p, t) => { w.win.position.set(0, 3.2, -1.85); w.sill.position.set(0, 1.8, -1.2); rain(w, t, 0, 3.2, 2.8, 2.2, -1.8); const look = p < .5; ctAt(w, .4, 1.92, -.9, look ? Math.PI * .6 : -.4, .4); w.c.head.rotation.z = look ? .3 * Math.sin(t * 5) : 0; if (look) w.card.visible = false; else holdCard(w, true); } },
    { say: 'A rainy walk? Nope.', label: 'NOPE', show: ['floor', 'wall', 'door', 'card'], sky: '#E8DCC8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.3, 8], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 2.3, 7.5], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.sill.visible = false; w.win.visible = false; w.door.position.set(-.8, 0, -1.85); rain(w, t, -.8, 1.6, 1.6, 3, -1.8); const back = p > .4; ctAt(w, back ? .2 : -.4, 0, -.2, back ? -.4 : Math.PI * .55, .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * (back ? .4 : 1.3)); if (back) holdCard(w, false); else w.card.visible = false; } },
    { say: 'A wet paw? Shake, shake, shake.', label: 'SHAKE', show: ['floor', 'wall', 'puddle'], sky: '#E8DCC8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2, 6.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 2, 6], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.drops.forEach(d => d.visible = false); w.puddle.position.set(.9, .01, .9); ctAt(w, 0, 0, 0, -.4, .4); w.c.paw.position.set(1.3, 1.3 + .25 * Math.sin(t * 22), 1); w.c.paw.rotation.z = .5 * Math.sin(t * 22); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .5); } },
    { say: 'Do cats hate water? Comment below.',
      quiz: { q: 'Do cats hate water?', options: ['Yes', 'No', 'Only rain'], answer: 'Made up. But one real breed, the Turkish Van, is known for liking water.' },
      show: ['floor', 'win', 'sill', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.9, 8], look: [0, 2.6, 0], fov: 54, to: { pos: [-2, 2.9, 8], look: [0, 2.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.door.visible = false; w.puddle.visible = false; w.c.paw.rotation.z = 0; w.win.position.set(0, 3.2, -1.85); w.sill.position.set(0, 1.8, -1.2); rain(w, t, 0, 3.2, 2.8, 2.2, -1.8); ctAt(w, .4, 1.92, -.9, -.6, .45); holdCard(w, true); } },
  ],
};
