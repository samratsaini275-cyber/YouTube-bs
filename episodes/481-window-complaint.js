// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the window complains about the cat.
// Hook: "This window has a complaint." under 2 s; first frame shows a window with a grumpy face and a cat on the sill holding a score card.

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
  const { mat, box, ball, cone, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#B08D6E', 0);
  w.wall = group(); box(40, 1.4, .3, mat('#EDE3D3'), [0, .7, -.6], w.wall); box(40, 12, .3, mat('#EDE3D3'), [0, 10, -.6], w.wall); box(15, 3, .3, mat('#EDE3D3'), [-9.3, 2.9, -.6], w.wall); box(15, 3, .3, mat('#EDE3D3'), [9.3, 2.9, -.6], w.wall);
  w.out = group(); box(30, 14, .1, mat('#8FD0F5', { glow: .5 }), [0, 6, -6], w.out); box(30, .1, 6, mat('#7DCEA0'), [0, 0, -4], w.out);
  w.bird = group(); const bb = ball(.25, mat('#E74C3C'), [0, 0, 0], w.bird); bb.scale.set(1.3, 1, 1); ball(.15, mat('#E74C3C'), [.28, .15, 0], w.bird); const bk = cone(.06, .15, mat('#F4D03F'), [.45, .15, 0], w.bird, 6); bk.rotation.z = -Math.PI / 2;
  const fr = mat('#FFFFFF');
  w.win = group(); w.sash = group([0, 0, 0], w.win);
  box(1.8, 1.4, .04, mat('#CFEFFF', { glow: .15, rough: .1 }), [0, .7, 0], w.sash); box(1.9, .1, .12, fr, [0, 0, 0], w.sash); box(1.9, .1, .12, fr, [0, 1.4, 0], w.sash); for (const x of [-.9, .9]) box(.1, 1.5, .12, fr, [x, .7, 0], w.sash);
  w.top = group(); box(1.8, 1.4, .04, mat('#CFEFFF', { glow: .15, rough: .1 }), [0, 2.1, -.08], w.top); box(1.9, .1, .12, fr, [0, 2.8, -.08], w.top); for (const x of [-.9, .9]) box(.1, 1.5, .12, fr, [x, 2.1, -.08], w.top);
  w.sill = box(2.4, .12, .7, fr, [0, -.06, .2], w.win);
  w.f = face(k, w.sash, [0, .62, .05], .42);
  w.prints = group(); for (let i = 0; i < 5; i++) { const pp = ball(.07, mat('#B7C9D3'), [-.6 + i * .3, .4 + (i % 2) * .5, .04], w.prints); pp.scale.z = .2; }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const wiAt = (w, up = 0) => { w.win.position.set(0, 1.45, -.55); w.sash.position.y = up * 1.3; w.prints.visible = false; w.bird.visible = false; };
const ALL = ['floor', 'wall', 'out', 'win'];
const cam0 = { pos: [.3, 2.4, 5.2], look: [.3, 2.3, 0], fov: 50, to: { pos: [.3, 2.4, 4.9], look: [.3, 2.3, 0], fov: 48 } };
const env = { sky: '#8FD0F5', lightAt: [2, 9, 8], lightDist: 26 };

export default {
  id: '481',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WINDOW',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS WINDOW', 'HAS A COMPLAINT'],
  title: 'This window has a complaint',
  description: 'Nose prints? All over the glass. Birds outside? The cat chatters at them all day. And the cat? Five stars. So the window opened wide. The cat stayed inside. (A made-up comedy sketch.)',
  tags: ['funny', 'window', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining windows are made up. Quiz fact: the Sphynx breed began in 1966, when a black-and-white cat in Ontario, Canada, gave birth to a hairless kitten named Prune (TICA breed profile, "Sphynx", tica.org/breed/sphynx; The Cat Fanciers\' Association, "The Sphynx").'],
  setup,
  scenes: [
    { say: 'This window has a complaint.', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { wiAt(w); talk(w.f, t); brow(w.f, .45); ctAt(w, 1.1, 1.45, .1, -1.4, .24); holdCard(w, null); } },
    { say: 'Nose prints? All over the glass.', label: 'SMUDGE', show: [...ALL, 'prints'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; wiAt(w); w.prints.visible = true; w.prints.position.set(0, 1.45, -.5); w.prints.children.forEach((c, i) => c.visible = p > i * .18); talk(w.f, t); brow(w.f, .6); ctAt(w, .95 + Math.sin(t * 2) * .1, 1.45, -.15, Math.PI / 2 + Math.PI, .22); } },
    { say: 'Birds outside? The cat chatters at them all day.', label: 'CHATTER', show: [...ALL, 'bird'], ...env,
      cam: cam0,
      update: (w, p, t) => { w.card.visible = false; wiAt(w); w.bird.visible = true; w.bird.position.set(-.4 + Math.sin(t * 1.5) * .5, 2.4 + Math.abs(Math.sin(t * 6)) * .15, -1.2); talk(w.f, t); brow(w.f, .55); ctAt(w, 1.0, 1.45, .05, -2.6, .24); w.c.head.rotation.z = .25 + Math.sin(t * 20) * .04; } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: [...ALL, 'card'], ...env,
      cam: cam0,
      update: (w, p, t) => { wiAt(w); talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, 1.1, 1.45, .1, -1.4, .24); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the window opened wide. The cat stayed inside.', label: 'NOPE', show: [...ALL], ...env,
      cam: { pos: [.3, 2.3, 6.6], look: [.3, 1.75, 0], fov: 50, to: { pos: [.3, 2.3, 6.2], look: [.3, 1.75, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; wiAt(w, Math.min(1, p * 2.2)); talk(w.f, t, p < .4 || p > .75); brow(w.f, p > .55 ? .6 : -.3); ctAt(w, .7, 0, .9, -.9, .3); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = p > .55 ? .15 : 1); } },
    { say: 'Grumpy window: clean it, open it, or give the cat a better view? Comment below.',
      quiz: { q: 'What do you do with the grumpy window?', options: ['Clean it', 'Open it', 'Give the cat a better view'], answer: 'Fun fact: the hairless Sphynx breed began with a kitten named Prune, born in Canada in 1966.' },
      show: [...ALL, 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.2, 6], look: [0, 1.9, 0], fov: 54, to: { pos: [-2, 2.2, 6], look: [0, 1.9, 0] } },
      update: (w, p, t) => { wiAt(w); talk(w.f, t, false); ctAt(w, 1.1, 1.45, .1, -1.4, .26); holdCard(w, true); } },
  ],
};
