// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the flower vase complains about the cat.
// Hook: "This vase has a complaint." under 2 s; first frame shows a blue vase with a grumpy face and a cat holding a score card.

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
  w.wall = group(); box(40, 16, .3, mat('#EAF2E3'), [0, 8, -4], w.wall);
  w.table = group(); box(3.4, .15, 1.6, mat('#8D6E63'), [0, 1.2, 0], w.table); for (const x of [-1.5, 1.5]) for (const z of [-.6, .6]) box(.12, 1.2, .12, mat('#6D4C41'), [x, .6, z], w.table);
  const blu = mat('#3E7CC9', { rough: .3 });
  w.vs = group(); w.vb = group([0, 0, 0], w.vs); cyl(.55, .4, 1.1, blu, [0, .55, 0], w.vb, 24); cyl(.3, .5, .3, blu, [0, 1.25, 0], w.vb, 24); cyl(.38, .3, .15, blu, [0, 1.45, 0], w.vb, 24);
  w.fl = group([0, 1.4, 0], w.vb); const cols = ['#E74C3C', '#F4D03F', '#F39C9C']; for (let i = 0; i < 3; i++) { const a = (i - 1) * .35; const st = group([0, 0, 0], w.fl); st.rotation.z = a; cyl(.03, .03, 1, mat('#3FA34D'), [0, .5, 0], st, 6); ball(.2, mat(cols[i]), [0, 1.05, 0], st); }
  w.f = face(k, w.vb, [0, .65, .5], .4);
  w.water = group(); const pd = cyl(.7, .7, .02, mat('#9FD3F0', { rough: .1 }), [0, .01, 0], w.water, 24);
  w.cup = group(); box(1.6, 1.4, .1, mat('#A1887F'), [0, .7, -.6], w.cup); w.door = group([.8, 0, .4], w.cup); box(1.6, 1.4, .08, mat('#BCAAA4'), [-.8, .7, 0], w.door); box(1.6, .1, 1, mat('#A1887F'), [0, 1.4, -.1], w.cup); box(1.6, .1, 1, mat('#A1887F'), [0, 0, -.1], w.cup); for (const x of [-.8, .8]) box(.1, 1.4, 1, mat('#A1887F'), [x, .7, -.1], w.cup);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const vsAt = (w, x, y, z, s = 1, tilt = 0) => { w.vs.position.set(x, y, z); w.vs.scale.setScalar(s); w.vs.rotation.set(0, .15, 0); w.vb.rotation.set(0, 0, tilt); };
const cam0 = { pos: [0, 2.2, 6.6], look: [0, 2.35, 0], fov: 50, to: { pos: [0, 2.2, 6.2], look: [0, 2.35, 0], fov: 48 } };
const env = { sky: '#EAF2E3', lightAt: [2, 9, 8], lightDist: 26 };

export default {
  id: '476',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE VASE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS VASE', 'HAS A COMPLAINT'],
  title: 'This vase has a complaint',
  description: 'Pushed to the edge of the table? Every morning. Flower water? The cat drinks it. And the cat? Five stars. So the vase hid in a cupboard. The cat opened it. (A made-up comedy sketch.)',
  tags: ['funny', 'vase', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining vases are made up. Quiz fact: the Maine Coon was made the official state cat of Maine in 1985 (TICA breed profile, "Maine Coon", tica.org/breed/maine-coon).'],
  setup,
  scenes: [
    { say: 'This vase has a complaint.', show: ['floor', 'wall', 'table', 'vs', 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { vsAt(w, -.7, 1.27, 0); talk(w.f, t); brow(w.f, .45); ctAt(w, .7, 1.27, .3, -.9, .3); holdCard(w, null); } },
    { say: 'Pushed to the edge of the table? Every morning.', label: 'PUSH', show: ['floor', 'wall', 'table', 'vs'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; const e = Math.min(1, p * 1.6); vsAt(w, -.2 + e * .8, 1.27, 0, 1, Math.sin(t * 9) * .08 * e); talk(w.f, t); brow(w.f, .6); ctAt(w, -1.4 + e * .8, 1.27, .1, 0, .3); w.c.paw.position.set(1.5, .7, .9); } },
    { say: 'Flower water? The cat drinks it.', label: 'SLURP', show: ['floor', 'wall', 'table', 'vs'], ...env,
      cam: { pos: [0, 2.6, 5.6], look: [0, 2.15, 0], fov: 50, to: { pos: [0, 2.6, 5.2], look: [0, 2.15, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; vsAt(w, -.5, 1.27, 0); talk(w.f, t); brow(w.f, -.4); ctAt(w, .2, 1.27, .2, -.7, .3); w.c.head.rotation.z = -.35 - Math.abs(Math.sin(t * 8)) * .1; } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'table', 'vs', 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { vsAt(w, -.7, 1.27, 0); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .7, 1.27, .3, -.9, .3); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the vase hid in a cupboard. The cat opened it.', label: 'FOUND YOU', show: ['floor', 'wall', 'vs', 'cup'], ...env,
      cam: { pos: [.3, 1.6, 5.2], look: [.3, 1.5, 0], fov: 50, to: { pos: [.3, 1.6, 4.9], look: [.3, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.cup.position.set(-.4, 0, 0); vsAt(w, -.4, .05, -.2, .6); const o = Math.max(0, Math.min(1, (p - .5) * 3)); w.door.rotation.y = -o * 1.9; talk(w.f, t, p < .5 || o >= 1); brow(w.f, o >= 1 ? .6 : -.3); ctAt(w, .95, 0, .9, -1.9, .28); w.c.paw.position.set(.8 + o * .6, .5 + o * .4, .9); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'Grumpy vase: push it, drink it, or nap next to it? Comment below.',
      quiz: { q: 'Grumpy vase?', options: ['Push it', 'Drink it', 'Nap next to it'], answer: 'Fun fact: the Maine Coon became the official state cat of Maine in 1985.' },
      show: ['floor', 'table', 'vs', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 1.9, 6], look: [0, 1.6, 0], fov: 54, to: { pos: [-2, 1.9, 6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; vsAt(w, -.7, 1.27, 0); talk(w.f, t, false); ctAt(w, .7, 1.27, .3, -.9, .32); holdCard(w, true); } },
  ],
};
