// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate boxes vs. fancy beds out loud.
// Hook: the rule under 2 s; first frame shows a cat sitting in a cardboard box holding up a score card.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#F5E0C8'), [0, 8, -4], w.wall);
  const brn = mat('#B98A4E', { rough: .9 }), dk = mat('#8A6234');
  w.bigbox = group(); box(2.4, .12, 2, dk, [0, .06, 0], w.bigbox); box(2.4, .7, .12, brn, [0, .35, 1], w.bigbox); box(2.4, .7, .12, brn, [0, .35, -1], w.bigbox); box(.12, .7, 2, brn, [1.2, .35, 0], w.bigbox); box(.12, .7, 2, brn, [-1.2, .35, 0], w.bigbox);
  const fl = box(2.4, .08, .5, brn, [0, .55, 1.25], w.bigbox); fl.rotation.x = 1.1;
  w.tiny = group(); box(1, .08, 1, dk, [0, .04, 0], w.tiny); box(1, .5, .08, brn, [0, .25, .5], w.tiny); box(1, .5, .08, brn, [0, .25, -.5], w.tiny); box(.08, .5, 1, brn, [.5, .25, 0], w.tiny); box(.08, .5, 1, brn, [-.5, .25, 0], w.tiny);
  w.bed = group(); const cush = cyl(1.5, 1.5, .5, mat('#C24BB0'), [0, .25, 0], w.bed, 24);   for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; k.ball(.4, mat('#E07AD0'), [Math.cos(a) * 1.4, .6, Math.sin(a) * 1.4], w.bed); }
  k.ball(.25, mat('#FFD54A', { glow: .5 }), [0, 1.2, -1.4], w.bed);
  w.tag = group(); box(1, .5, .05, mat('#FFFFFF'), [0, 0, 0], w.tag); box(.8, .1, .06, mat('#E2453C'), [0, .1, .01], w.tag); box(.5, .1, .06, mat('#E2453C'), [0, -.1, .01], w.tag);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '433',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE BOXES',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE BOXES'],
  title: 'In this town, cats rate boxes',
  description: 'A fancy bed? One star. A plain box? Five stars. A box way too small? Still sits. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'box', 'shorts'],
  sources: ['Comedy sketch: cat box reviews are made up. Quiz fact: in a citizen-science study, owners taped shapes on the floor at home; cats sat in an illusory square (the Kanizsa illusion, drawn only by its corners) just as often as in a real square, and more often than in a control shape (Smith et al., "If I fits I sits: A citizen science investigation into illusory contour susceptibility in domestic cats", Applied Animal Behaviour Science, 2021).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate boxes.', show: ['floor', 'wall', 'bigbox', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.2, 7], look: [.2, 1.2, 0], fov: 50, to: { pos: [0, 2.2, 6.5], look: [.2, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { w.bigbox.position.set(0, 0, 0); ctAt(w, .4, .12, 0, -.5, .42); holdCard(w, null); } },
    { say: 'A fancy bed? One star.', label: '1 STAR', show: ['floor', 'wall', 'bed', 'tag', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.4, 9], look: [0, 1.1, 0], fov: 50, to: { pos: [0, 2.4, 8.5], look: [0, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.position.set(-1.6, 0, -1.4); w.tag.position.set(-2.1, 1.3, -.4); w.tag.rotation.z = .2 + .1 * Math.sin(t * 3); ctAt(w, .3, 0, .6, -.4, .36); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .45); holdCard(w, p > .45 ? false : null); } },
    { say: 'A plain box? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'bigbox', 'bed', 'card'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.4, 8.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 2.4, 8], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { w.bed.position.set(-3.2, 0, -2); w.bigbox.position.set(.6, 0, 0); const hop = Math.min(1, p * 2.2); const y = hop < 1 ? Math.sin(hop * Math.PI) * 1.6 + hop * .12 : .12; ctAt(w, -1.4 + hop * 1.9, y, 0, -.5, .42); w.c.eyes.forEach(e => e.scale.y = hop >= 1 ? .2 : 1); holdCard(w, p > .55 ? true : null); } },
    { say: 'Way too small? Still sits.', label: 'STILL SITS', show: ['floor', 'wall', 'tiny'], sky: '#F5E0C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 1.8, 6.5], look: [0, .9, 0], fov: 50, to: { pos: [0, 1.8, 6], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.tiny.position.set(.1, 0, .55); ctAt(w, .3, .3 + .05 * Math.sin(t * 5), 0, -.5, .42); w.c.body.scale.set(1.6, 1.15, 1.25); w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'Cat box critics: fair, funny, or way too picky? Comment below.',
      quiz: { q: 'Cat box critics are…', options: ['Fair', 'Funny', 'Way too picky'], answer: 'Made up. But real cats will even sit in a square that is only an optical illusion.' },
      show: ['floor', 'bigbox', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.2, 8], look: [0, 1.4, 0], fov: 54, to: { pos: [-2, 2.2, 8], look: [0, 1.4, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.bigbox.position.set(0, 0, 0); ctAt(w, .4, .12, 0, -.6, .55); holdCard(w, true); } },
  ],
};
