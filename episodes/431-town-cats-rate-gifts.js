// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate the presents you give them.
// Hook: the rule under 2 s; first frame shows a cat next to a wrapped present, holding up a score card.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#F2D7E3'), [0, 8, -4], w.wall);
  w.gift = group(); w.gbox = box(1.6, 1.2, 1.6, mat('#3B6FD6'), [0, .6, 0], w.gift); box(1.62, 1.22, .2, mat('#F2C94C'), [0, .6, 0], w.gift); box(.2, 1.22, 1.62, mat('#F2C94C'), [0, .6, 0], w.gift); w.bow = group([0, 1.3, 0], w.gift); for (const s of [-1, 1]) { const b = ball(.22, mat('#F2C94C'), [s * .2, 0, 0], w.bow); b.scale.set(1.3, .7, .7); }
  w.toy = group(); const tb = cyl(.25, .25, .8, mat('#E2453C'), [0, 0, 0], w.toy, 12); tb.rotation.z = Math.PI / 2; for (let i = 0; i < 5; i++) ball(.12, mat('#F2C94C', { glow: .4 }), [-.3 + i * .15, .2, 0], w.toy);
  w.box = group(); box(2, 1.3, 1.8, mat('#C9965A'), [0, .65, 0], w.box);
  w.bits = group(); for (let i = 0; i < 18; i++) { const b = box(.2, .02, .15, mat(i % 2 ? '#3B6FD6' : '#F2C94C'), [0, 0, 0], w.bits); b.userData.i = i; }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '431',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE GIFTS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE GIFTS'],
  title: 'In this town, cats rate their presents',
  description: 'A fancy toy? Two stars. The box it came in? Five stars. Wrapping paper? Shredded. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'gift', 'shorts'],
  sources: ['Comedy sketch: cat gift reviews are made up. Quiz fact: kittens are born with blue eyes, and their adult eye colour starts to show at around four to eight weeks old (Daily Paws, "When Do Kittens\' Eyes Change Color?").'],
  setup,
  scenes: [
    { say: 'In this town, cats rate gifts.', show: ['floor', 'wall', 'gift', 'card'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 2.1, 9.5], look: [.3, 1.85, 0], fov: 50, to: { pos: [.4, 2.1, 9], look: [.3, 1.85, 0], fov: 48 } },
      update: (w, p, t) => { w.toy.visible = false; w.box.visible = false; w.bits.visible = false; w.gift.position.set(-1, 0, 0); ctAt(w, 1.1, 0, .4, Math.PI + .6, .45); holdCard(w, null); } },
    { say: 'A fancy toy? Two stars.', label: '2 STARS', show: ['floor', 'wall', 'toy', 'card'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.4, 2.1, 9.5], look: [.3, 1.85, 0], fov: 50, to: { pos: [.4, 2.1, 9], look: [.3, 1.85, 0], fov: 48 } },
      update: (w, p, t) => { w.gift.visible = false; w.toy.position.set(-.9, .3, .4); w.toy.rotation.y = t; ctAt(w, 1.1, 0, .4, Math.PI + .6, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .3); holdCard(w, p > .45 ? false : null); } },
    { say: 'The box it came in? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'box', 'card'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 2.2, 8], look: [.1, 1.6, 0], fov: 50, to: { pos: [.2, 2.2, 7.5], look: [.1, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { w.toy.visible = false; w.box.position.set(0, 0, 0); const q = Math.min(1, p * 1.8); ctAt(w, 1.6 - q * 1.3, q >= 1 ? .55 : Math.sin(q * Math.PI) * 1.4, .1, Math.PI + .3, .42); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4); holdCard(w, p > .55 ? true : null); w.card.visible = p > .55; } },
    { say: 'Wrapping paper? Shredded.', label: 'RIP', show: ['floor', 'wall', 'bits'], sky: '#F2D7E3', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 2, 7.5], look: [.1, 1.3, 0], fov: 50, to: { pos: [.2, 2, 7], look: [.1, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.box.visible = false; w.card.visible = false; ctAt(w, 0, .1 * Math.abs(Math.sin(t * 10)), .2, -.3, .45); w.c.paw.position.set(1.2, .6 + .4 * Math.abs(Math.sin(t * 12)), .9); w.bits.children.forEach(b => { const i = b.userData.i, q = (t * .9 + i / 18) % 1; b.position.set(Math.cos(i * 2.4) * (.6 + q * 1.4), .2 + Math.sin(q * Math.PI) * 1.8, .6 + Math.sin(i * 2.4) * (.3 + q * .6)); b.rotation.set(t * 4 + i, t * 3, 0); }); } },
    { say: 'Cat gift critics: fair, funny, or way too fussy? Comment below.',
      quiz: { q: 'Cat gift critics are…', options: ['Fair', 'Funny', 'Way too fussy'], answer: 'Made up. Fun fact: kittens are born with blue eyes.' },
      show: ['floor', 'box', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.4, 7.5], look: [0, 1.4, 0], fov: 52, to: { pos: [-2, 2.4, 7.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { w.bits.visible = false; w.wall.visible = false; w.box.position.set(0, 0, 0); ctAt(w, .3, .55, .1, -.5, .42); holdCard(w, true); } },
  ],
};
