// Narrative 24: "In This Town… (season 3: cats say it out loud)". Cat slot: cats rate your shoes out loud.
// Hook: the rule under 2 s; first frame shows a cat next to a pair of shoes holding up a score card.

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

function shoe(k, col, parent) {
  const { mat, box, group } = k; const s = group([0, 0, 0], parent);
  box(1.2, .25, .5, mat('#FFFFFF'), [0, .12, 0], s); const top = box(.8, .35, .48, mat(col), [-.15, .4, 0], s); box(.5, .2, .46, mat(col), [.35, .3, 0], s);
  return s;
}

function setup(k) {
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#B08A68', 0);
  w.wall = group(); box(40, 16, .3, mat('#FDEBD0'), [0, 8, -4], w.wall);
  w.mat = box(3.4, .03, 1.6, mat('#7D6608'), [0, .015, 0]);
  w.newp = group(); shoe(k, '#5DADE2', w.newp).position.set(0, 0, -.35); shoe(k, '#5DADE2', w.newp).position.set(0, 0, .35); w.shine = k.ball(.08, mat('#FFFFFF', { glow: 1 }), [.2, .65, .4], w.newp);
  w.gym = group(); shoe(k, '#7E8C5A', w.gym).position.set(0, 0, -.35); shoe(k, '#7E8C5A', w.gym).position.set(0, 0, .35);
  w.stink = group(); for (let i = 0; i < 3; i++) { const s = cyl(.04, .04, .5, mat('#9ACD32', { glow: .6 }), [i * .25 - .25, 1, 0], w.stink, 6); s.rotation.z = .3 * (i - 1); }
  w.lace = group(); w.laceL = cyl(.03, .03, 1.2, mat('#F4D03F'), [0, -.6, 0], w.lace, 6);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.mouth = box(.35, .3, .55, mat('#5B2C2C'), [1.05, -.8, 0], w.c.head);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); w.mouth.visible = false; };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

export default {
  id: '443',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE SHOES',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE SHOES'],
  title: 'In this town, cats rate your shoes',
  description: 'New shoes? One star. Stinky gym shoes? Five stars. Shoelaces? Attack. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'shoes', 'shorts'],
  sources: ['Comedy sketch: cat shoe reviews are made up. Quiz fact: the flehmen response, seen in cats, horses and other mammals, is when an animal curls back its upper lip and opens its mouth after sniffing; it directs scents to the vomeronasal (Jacobson\'s) organ in the roof of the mouth (Encyclopaedia Britannica, "Flehmen" and "Why Do Cats Open Their Mouths After Smelling Something?").'],
  setup,
  scenes: [
    { say: 'In this town, cats rate shoes.', show: ['floor', 'wall', 'mat', 'newp', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.9, 8.5], look: [.2, 1.15, 0], fov: 50, to: { pos: [.2, 1.9, 8], look: [.2, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.mat.position.set(.4, .015, .5); w.newp.position.set(1, 0, .6); ctAt(w, -.5, 0, 0, -.3, .4); holdCard(w, null); } },
    { say: 'New shoes? One star.', label: '1 STAR', show: ['floor', 'wall', 'mat', 'newp', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.9, 8.5], look: [.2, 1.15, 0], fov: 50, to: { pos: [.2, 1.9, 8], look: [.2, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.mat.position.set(.4, .015, .5); w.newp.position.set(1, 0, .6); w.shine.scale.setScalar(1 + .5 * Math.sin(t * 8)); ctAt(w, -.5, 0, 0, -.3, .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * .4); w.c.head.rotation.y = .5; if (p > .4) holdCard(w, false); else w.card.visible = false; } },
    { say: 'Stinky gym shoes? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'mat', 'gym', 'stink', 'card'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.9, 8.5], look: [.2, 1.15, 0], fov: 50, to: { pos: [.2, 1.9, 8], look: [.2, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.mat.position.set(.4, .015, .5); w.gym.position.set(1, 0, .6); w.stink.position.set(1, .1 * Math.sin(t * 3), .6); ctAt(w, -.5, 0, 0, -.3, .4); const sniff = p < .5; if (sniff) { w.card.visible = false; w.c.head.rotation.z = .35; w.mouth.visible = true; w.c.eyes.forEach(e => e.scale.y = .3); } else holdCard(w, true); } },
    { say: 'Shoelaces? Attack.', label: 'ATTACK', show: ['floor', 'wall', 'lace'], sky: '#FDEBD0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 1.9, 8.5], look: [.2, 1.15, 0], fov: 50, to: { pos: [.2, 1.9, 8], look: [.2, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.lace.position.set(.9, 2.2, .6); w.lace.rotation.z = .5 * Math.sin(t * 5); ctAt(w, -.4, 0, 0, -.3, .4); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); w.c.paw.position.set(1.5, 1.6 + .5 * Math.max(0, Math.sin(t * 12)), 1); } },
    { say: 'What do cats love most? Comment below.',
      quiz: { q: 'What do cats love most?', options: ['Shoes', 'Shoelaces', 'The shoe box'], answer: 'Made up. But real cats open their mouths to sample strong smells.' },
      show: ['floor', 'mat', 'gym', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2.2, 7.5], look: [0, 1.6, 0], fov: 54, to: { pos: [-2, 2.2, 7.5], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.lace.visible = false; w.stink.visible = false; w.mat.position.set(.4, .015, .5); w.gym.position.set(1, 0, .6); ctAt(w, -.4, 0, 0, -.5, .45); holdCard(w, true); } },
  ],
};
