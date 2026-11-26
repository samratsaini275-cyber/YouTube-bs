// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate TV shows out loud.
// Hook: the rule under 2 s; first frame shows a cat on a sofa facing a glowing TV, holding up a score card.

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
  w.floor = k.ground('#B08A68', 0);
  w.wall = group(); box(40, 16, .3, mat('#3B3F6B'), [0, 8, -6], w.wall);
  w.sofa = group(); box(4, .9, 2, mat('#C0392B'), [0, .45, 0], w.sofa); box(4, 1.5, .5, mat('#962D22'), [0, 1.4, -.8], w.sofa);
  w.tv = group(); box(2.6, 1.6, .2, mat('#111111'), [0, 0, 0], w.tv); box(.2, 1.2, .2, mat('#222222'), [0, -1.4, 0], w.tv);
  w.scr = { bird: group([0, 0, .12], w.tv), news: group([0, 0, .12], w.tv), off: group([0, 0, .12], w.tv) };
  box(2.4, 1.4, .02, mat('#7EC8E3', { glow: .6 }), [0, 0, 0], w.scr.bird); w.bird = group([0, 0, .03], w.scr.bird); ball(.18, mat('#F4D03F', { glow: .4 }), [0, 0, 0], w.bird); ball(.1, mat('#F4D03F', { glow: .4 }), [.18, .1, 0], w.bird); k.cone(.05, .12, mat('#E67E22'), [.3, .1, 0], w.bird, 4).rotation.z = -Math.PI / 2;
  box(2.4, 1.4, .02, mat('#D6DCE4', { glow: .5 }), [0, 0, 0], w.scr.news); box(1.6, .25, .03, mat('#C0392B', { glow: .4 }), [0, -.45, .01], w.scr.news); box(.5, .7, .03, mat('#34495E', { glow: .2 }), [0, .15, .01], w.scr.news);
  box(2.4, 1.4, .02, mat('#050505'), [0, 0, 0], w.scr.off);
  w.remote = group(); box(.25, .08, .7, mat('#222222'), [0, 0, 0], w.remote); box(.08, .03, .08, mat('#E2453C', { glow: .5 }), [0, .05, -.22], w.remote);
  w.zzz = group(); for (let i = 0; i < 3; i++) box(.25 - i * .05, .25 - i * .05, .03, mat('#FFFFFF', { glow: .5 }), [i * .3, i * .35, 0], w.zzz);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const screen = (w, which) => { for (const n in w.scr) w.scr[n].visible = n === which; };

export default {
  id: '436',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE TV',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE TV'],
  title: 'In this town, cats rate TV shows',
  description: 'Bird videos? Five stars. The news? Asleep. The remote? Sat on. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'tv', 'shorts'],
  sources: ['Comedy sketch: cat TV reviews are made up. Quiz fact: in experiments showing cats happy or angry faces and voices, cats were only modestly sensitive to human emotion cues, mostly when the cues came from their owner rather than a stranger (Galvan & Vonk, "Man\'s other best friend: domestic cats (F. silvestris catus) and their discrimination of human emotion cues", Animal Cognition, 2016).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate TV.', show: ['floor', 'wall', 'sofa', 'tv', 'card'], sky: '#3B3F6B', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.2, 2.7, 9.5], look: [0, 2.35, 0], fov: 50, to: { pos: [1.2, 2.7, 9], look: [0, 2.35, 0], fov: 48 } },
      update: (w, p, t) => { screen(w, 'bird'); w.bird.position.x = -.6 + .3 * Math.sin(t * 2); w.sofa.position.set(1.2, 0, .6); w.sofa.rotation.y = 0; w.tv.position.set(-1.6, 2.4, -2.2); w.tv.rotation.y = .35; ctAt(w, .7, .9, .6, Math.PI * .85, .4); holdCard(w, null); } },
    { say: 'Bird videos? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'sofa', 'tv', 'card'], sky: '#3B3F6B', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 8], look: [0, 2.2, 0], fov: 52, to: { pos: [0, 2.6, 7.5], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { screen(w, 'bird'); w.bird.position.set(-.6 + .9 * Math.sin(t * 2), .2 * Math.sin(t * 5), .03); w.tv.position.set(-1.6, 3, -2.2); w.tv.rotation.y = .3; w.sofa.position.set(1, 0, .5); w.sofa.rotation.y = 0; ctAt(w, .4, .9, .5, Math.PI * .8, .4); w.c.head.rotation.y = .4 * Math.sin(t * 2); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); if (p > .45) holdCard(w, true); else w.card.visible = false; } },
    { say: 'The news? Asleep.', label: 'ZZZ', show: ['floor', 'wall', 'sofa', 'tv', 'zzz'], sky: '#3B3F6B', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2.2, 2.8, 9], look: [.4, 2.1, 0], fov: 50, to: { pos: [2, 2.8, 8.5], look: [.4, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; screen(w, 'news'); w.tv.position.set(-1.6, 2.2, -2.2); w.tv.rotation.y = .35; w.sofa.position.set(1.4, 0, .6); w.sofa.rotation.y = 0; ctAt(w, 1.4, .9, .6, .3, .42); w.c.body.scale.set(1.5, .8 + .04 * Math.sin(t * 2), 1); w.c.head.position.y = 2.1; w.c.eyes.forEach(e => e.scale.y = .1); w.zzz.position.set(2, 2.2 + .1 * Math.sin(t * 2), 1); } },
    { say: 'The remote? Sat on.', label: 'SAT ON', show: ['floor', 'wall', 'sofa', 'tv', 'remote'], sky: '#3B3F6B', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2.2, 2.8, 9], look: [.4, 2.1, 0], fov: 50, to: { pos: [2, 2.8, 8.5], look: [.4, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.zzz.visible = false; w.c.head.position.y = 2.4; const sit = Math.min(1, p * 2.2); screen(w, sit < 1 ? 'news' : 'off'); w.tv.position.set(-1.6, 2.2, -2.2); w.tv.rotation.y = .35; w.sofa.position.set(1.4, 0, .6); w.remote.position.set(1, .95, .9); w.remote.rotation.y = .5; ctAt(w, 2.4 - sit * 1.2, .9 + (sit < 1 ? Math.sin(sit * Math.PI) * .6 : 0), .7, -.2, .42); if (sit >= 1) w.c.eyes.forEach(e => e.scale.y = .2); } },
    { say: 'Best show for cats? Comment below.',
      quiz: { q: 'Best show for cats?', options: ['Bird videos', 'Fish tank cam', 'The news'], answer: 'Made up. But real cats notice your mood a little, mostly if you are their owner.' },
      show: ['floor', 'tv', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.4, 7.5], look: [0, 1.7, 0], fov: 54, to: { pos: [-2, 2.4, 7.5], look: [0, 1.7, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.sofa.visible = false; w.remote.visible = false; screen(w, 'bird'); w.bird.position.x = -.6 + .9 * Math.sin(t * 2); w.tv.position.set(-1.5, 2.6, -2); w.tv.rotation.y = .3; ctAt(w, .6, 0, 0, -.6, .5); holdCard(w, true); } },
  ],
};
