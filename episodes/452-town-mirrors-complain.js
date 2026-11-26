// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the mirror complains about the cat.
// Hook: the rule under 2 s; first frame shows a standing mirror with a face on its frame next to a cat holding a score card.

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

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#FDEDEC'), [0, 8, -4], w.wall);
  w.mirror = group(); for (const [x, y, ww, hh] of [[-1.03, 1.7, .16, 3.2], [1.03, 1.7, .16, 3.2], [0, 3.22, 2.2, .16], [0, .18, 2.2, .16]]) box(ww, hh, .12, mat('#A04000'), [x, y, -.02], w.mirror); const gl = box(1.9, 2.9, .02, mat('#D6EAF8', { glow: .25 }), [0, 1.7, 0], w.mirror); gl.material.transparent = true; gl.material.opacity = .35;
  w.f = face(k, w.mirror, [0, 3.15, .02], .4);
  w.smudge = group([0, 0, .03], w.mirror); for (let i = 0; i < 6; i++) { const s = ball(.12, mat('#AEB6BF'), [-.5 + Math.random(), .6 + Math.random() * .9, 0], w.smudge); s.scale.z = .1; }
  w.fish = group([0, 1.5, .04], w.mirror); const fb = ball(.35, mat('#F39C12', { glow: .5 }), [0, 0, 0], w.fish); fb.scale.set(1.4, .8, .2); k.cone(.25, .4, mat('#F39C12', { glow: .5 }), [-.6, 0, 0], w.fish, 4).rotation.z = Math.PI / 2;
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.c2 = cat(k, k.scene);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const mirrorOn = (w) => { w.mirror.position.set(-.3, 0, -1.4); w.mirror.scale.setScalar(1); };
const reflect = (w, on, arch = false) => { const c2 = w.c2; c2.root.visible = on; if (!on) return; w.cr.updateWorldMatrix(true, true); const p = w.cr.position, zM = -1.4; c2.root.position.set(p.x, p.y, zM - (p.z - zM)); c2.root.rotation.set(0, Math.PI - w.cr.rotation.y, 0); c2.root.scale.copy(w.cr.scale); c2.root.scale.z *= -1; c2.body.scale.copy(w.c.body.scale); c2.eyes.forEach((e, i) => e.scale.y = w.c.eyes[i].scale.y); c2.paw.position.copy(w.c.paw.position); };

export default {
  id: '452',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'MIRRORS COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'MIRRORS COMPLAIN'],
  title: 'In this town, mirrors complain to cats',
  description: 'The reflection? A hiss fight. Paw prints? Everywhere. So the mirror shows a fish instead. Five stars. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'mirror', 'shorts'],
  sources: ['Comedy sketch: complaining mirrors are made up. Quiz fact: the earliest record of cats in Britain dates to about 936 CE, when Hywel Dda, prince of south-central Wales, enacted laws for their protection (Encyclopaedia Britannica, "Cat").'],
  setup,
  scenes: [
    { say: 'In this town, mirrors complain.', show: ['floor', 'wall', 'mirror', 'card'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 2, 8], look: [.3, 1.6, 0], fov: 50, to: { pos: [.3, 2, 7.5], look: [.3, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { mirrorOn(w); w.smudge.visible = false; w.fish.visible = false; talk(w.f, t); brow(w.f, .4); ctAt(w, 1, 0, .2, -.9, .36); holdCard(w, null); reflect(w, false); } },
    { say: 'The reflection? A hiss fight.', label: 'WHO IS THAT', show: ['floor', 'wall', 'mirror'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [7, 1.8, 1.6], look: [-.5, .75, -1.2], fov: 50, to: { pos: [6.6, 1.8, 1.45], look: [-.5, .75, -1.2], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; mirrorOn(w); w.smudge.visible = false; w.fish.visible = false; talk(w.f, t); brow(w.f, -.3); ctAt(w, -.3, 0, -.6, Math.PI / 2 + .1, .36); w.c.body.scale.set(1.2, 1.35, 1); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.5); reflect(w, true); } },
    { say: 'Paw prints? Everywhere.', label: 'SMUDGE', show: ['floor', 'wall', 'mirror'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [7, 1.8, 1.6], look: [-.5, .75, -1.2], fov: 50, to: { pos: [6.6, 1.8, 1.45], look: [-.5, .75, -1.2], fov: 48 } },
      update: (w, p, t) => { mirrorOn(w); w.fish.visible = false; w.smudge.visible = p > .3; talk(w.f, t); brow(w.f, .55); ctAt(w, -.3, 0, -.6, Math.PI / 2 + .1, .36); w.c.paw.position.set(1.4, 1.5 + .3 * Math.sin(t * 12), .3); reflect(w, true); } },
    { say: 'So the mirror? Shows a fish.', label: '5 STARS', show: ['floor', 'wall', 'mirror', 'card'], sky: '#FDEDEC', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.3, 2, 8], look: [.3, 1.6, 0], fov: 50, to: { pos: [.3, 2, 7.5], look: [.3, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { mirrorOn(w); w.smudge.visible = false; w.fish.visible = true; w.fish.position.x = .4 * Math.sin(t * 2); reflect(w, false); talk(w.f, t, p < .4); brow(w.f, -.3); ctAt(w, 1, 0, .2, -2.2, .36); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.4); if (p > .45) { w.cr.rotation.y = -.9; holdCard(w, true); } else w.card.visible = false; } },
    { say: 'Mirror or cat: who is right? Comment below.',
      quiz: { q: 'Who is right?', options: ['The mirror', 'The cat', 'The fish'], answer: 'Made up. But in Wales around 936 CE, a prince made laws to protect cats.' },
      show: ['floor', 'mirror', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 2, 8], look: [0, 1.5, 0], fov: 54, to: { pos: [-2, 2, 8], look: [0, 1.5, 0] } },
      update: (w, p, t) => { w.wall.visible = false; mirrorOn(w); w.smudge.visible = false; w.fish.visible = true; reflect(w, false); talk(w.f, t, false); ctAt(w, 1, 0, .2, -.9, .38); holdCard(w, true); } },
  ],
};
