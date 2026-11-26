// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate the nicknames you call them.
// Hook: the rule under 2 s; first frame shows a person calling a cat that holds up a score card.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; (c.ears = c.ears || []).push(ear); cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

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
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#CFE3F2'), [0, 8, -4], w.wall);
  w.rug = cyl(2.2, 2.2, .04, mat('#E07A5F'), [0, .02, 0], k.scene, 32);
  w.pouf = group(); k.cyl(.9, .9, .9, mat('#7C5CC4'), [0, .45, 0], w.pouf, 24);
  w.p = person(k, k.scene, '#2E86C1');
  w.bowl = group(); cyl(.35, .25, .25, mat('#E2453C'), [0, 0, 0], w.bowl, 16); k.ball(.22, mat('#8A5A2B'), [0, .1, 0], w.bowl);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); w.c.ears.forEach((e, i) => e.rotation.set((i ? 1 : -1) * .3, 0, 0)); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '435',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE NICKNAMES',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE NAMES'],
  title: 'In this town, cats rate their nicknames',
  description: 'Mister Fluffy Pants? One star. Snack time? Five stars. Its real name? An ear twitch. That\'s it. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'catnames', 'shorts'],
  sources: ['Comedy sketch: cat nickname reviews are made up. Quiz fact: in experiments with pet cats, cats that had got used to hearing a list of ordinary words reacted again when they heard their own name, even when a stranger said it, showing they can tell their name apart from other words (Saito et al., "Domestic cats (Felis catus) discriminate their names from other words", Scientific Reports, 2019).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate names.', show: ['floor', 'wall', 'rug', 'pouf', 'card'], sky: '#CFE3F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 11], look: [0, 2.75, 0], fov: 50, to: { pos: [0, 2.6, 10.5], look: [0, 2.75, 0], fov: 48 } },
      update: (w, p, t) => { w.bowl.visible = false; pAt(w.p, -1.8, 0, 0, .5, .8); pose(w.p, .4, 1.1); w.p.mouth.scale.set(1, 2.5, 1); w.pouf.position.set(1.1, 0, .4); ctAt(w, 1.2, .9, .5, -2.4, .4); holdCard(w, null); } },
    { say: 'Mister Fluffy Pants? One star.', label: '1 STAR', show: ['floor', 'wall', 'rug', 'pouf', 'card'], sky: '#CFE3F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 11], look: [0, 2.75, 0], fov: 50, to: { pos: [0, 2.6, 10.5], look: [0, 2.75, 0], fov: 48 } },
      update: (w, p, t) => { w.bowl.visible = false; pAt(w.p, -1.8, 0, 0, .5, .8); pose(w.p, .4, 1.1); w.p.mouth.scale.set(1, 1 + 1.5 * Math.abs(Math.sin(t * 9)), 1); w.pouf.position.set(1.1, 0, .4); ctAt(w, 1.2, .9, .5, -2.4, .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .4); holdCard(w, p > .45 ? false : null); } },
    { say: 'Snack time? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'rug', 'pouf', 'card'], sky: '#CFE3F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 11], look: [0, 2.75, 0], fov: 50, to: { pos: [0, 2.6, 10.5], look: [0, 2.75, 0], fov: 48 } },
      update: (w, p, t) => { pAt(w.p, -1.8, 0, 0, .5, .8); pose(w.p, .2, .9); w.p.mouth.scale.set(1.3, 1.5, 1); w.pouf.position.set(1.1, 0, .4); w.bowl.visible = true; w.bowl.position.set(.6, 1.05, .9); const run = Math.min(1, p * 2.5); ctAt(w, 3.2 - run * 2, run < .6 ? 0 : .9, .5, -2.4, .4); if (run < 1) { w.card.visible = false; w.cr.position.y += run < .6 ? .15 * Math.abs(Math.sin(t * 14)) : Math.sin((run - .6) / .4 * Math.PI) * .5; } else holdCard(w, true); } },
    { say: 'Its real name? An ear twitch. That\'s it.', label: 'EAR TWITCH', show: ['floor', 'wall', 'rug', 'pouf'], sky: '#CFE3F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.9, 2.4, 6.5], look: [.9, 1.95, 0], fov: 50, to: { pos: [.9, 2.4, 6], look: [.9, 1.95, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.bowl.visible = false; pAt(w.p, -1.8, 0, 0, .5, .8); pose(w.p, .4, 1.1); w.p.mouth.scale.set(1, 2.2, 1); w.pouf.position.set(1.1, 0, .4); ctAt(w, 1.2, .9, .5, -2.4, .4); w.c.body.scale.set(1.5, .85, 1); w.c.eyes.forEach(e => e.scale.y = .1); const tw = p > .3 && p < .55 ? Math.sin((p - .3) * 50) * .6 : 0; w.c.ears[1].rotation.set(.3 + tw, 0, tw); } },
    { say: 'Best cat nickname? Comment below.',
      quiz: { q: 'Best cat nickname?', options: ['Mister Fluffy Pants', 'Snack Time', 'Your Majesty'], answer: 'Made up. But real cats can tell their own name apart from other words.' },
      show: ['floor', 'rug', 'pouf', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.6, 8], look: [0, 1.9, 0], fov: 54, to: { pos: [-2, 2.6, 8], look: [0, 1.9, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.p.root.visible = false; w.bowl.visible = false; w.pouf.position.set(.2, 0, 0); ctAt(w, .4, .9, 0, -.6, .45); holdCard(w, true); } },
  ],
};
