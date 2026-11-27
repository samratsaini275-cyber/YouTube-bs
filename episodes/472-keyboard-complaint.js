// Narrative 26: "This X Has a Complaint (cat edition)". Object slot: the keyboard complains about the cat.
// Hook: "This keyboard has a complaint." under 2 s; first frame shows a keyboard with a grumpy face and a cat holding a score card.

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
  const { mat, box, group } = k;
  const w = { k };
  w.floor = k.ground('#B9A58C', 0);
  w.wall = group(); box(40, 16, .3, mat('#EAF2F8'), [0, 8, -4], w.wall);
  w.desk = group(); box(3.6, .15, 1.8, mat('#784212'), [0, 1.6, 0], w.desk); for (const x of [-1.6, 1.6]) for (const z of [-.75, .75]) box(.12, 1.6, .12, mat('#4E342E'), [x, .8, z], w.desk);
  w.mon = group(); box(1.6, 1, .08, mat('#17202A'), [0, .65, 0], w.mon); w.scr = box(1.5, .9, .02, mat('#AED6F1', { glow: .5 }), [0, .65, .05], w.mon); box(.1, .3, .1, mat('#17202A'), [0, .15, 0], w.mon);
  w.lines = group([0, .65, .07], w.mon); for (let i = 0; i < 5; i++) box(1.2 * (.4 + ((i * 37) % 6) / 10), .06, .01, mat('#1B4F72'), [-.1, .3 - i * .14, 0], w.lines);
  w.kb = group(); box(1.6, .1, .55, mat('#D5D8DC'), [0, .05, 0], w.kb); for (let r = 0; r < 4; r++) for (let q = 0; q < 12; q++) box(.1, .04, .1, mat('#2C3E50'), [-.66 + q * .12, .12, -.18 + r * .12], w.kb); w.kb.rotation.x = .25;
  w.f = face(k, w.kb, [0, .12, .3], .32); w.f.rotation.x = -.25;
  w.drawer = box(1.4, .5, .1, mat('#A04000'), [0, 0, 0], k.scene);
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const deskOn = (w, kb = true) => { w.desk.position.set(0, 0, -.4); w.mon.position.set(-.3, 1.68, -1); w.kb.position.set(-.3, 1.7, -.1); w.kb.visible = kb; w.drawer.visible = false; };

export default {
  id: '472',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE KEYBOARD',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS KEYBOARD', 'HAS A COMPLAINT'],
  title: 'This keyboard has a complaint',
  description: 'Walked across? Gibberish everywhere. Your video call? A cat fills the camera. And the cat? Five stars. So the keyboard hid in a drawer. The cat napped on the desk. (A made-up comedy sketch.)',
  tags: ['funny', 'keyboard', 'cat', 'talkingobjects', 'comedy', 'shorts'],
  sources: ['Comedy sketch: complaining keyboards are made up. Quiz fact: the resting heart rate of a cat is about 120 to 140 beats per minute (Merck Veterinary Manual, "Resting Heart Rates" table).'],
  setup,
  scenes: [
    { say: 'This keyboard has a complaint.', show: ['floor', 'wall', 'desk', 'mon', 'kb', 'card'], sky: '#EAF2F8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.9, 5], look: [0, 1.85, -.3], fov: 50, to: { pos: [0, 2.9, 4.6], look: [0, 1.85, -.3], fov: 48 } },
      update: (w, p, t) => { deskOn(w); w.lines.visible = true; talk(w.f, t); brow(w.f, .45); ctAt(w, .65, 1.68, -.2, -1, .28); holdCard(w, null); } },
    { say: 'Walked across? Gibberish everywhere.', label: 'TYPO', show: ['floor', 'wall', 'desk', 'mon', 'kb'], sky: '#EAF2F8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.9, 5], look: [0, 1.85, -.3], fov: 50, to: { pos: [0, 2.9, 4.6], look: [0, 1.85, -.3], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; deskOn(w); w.lines.visible = true; w.lines.children.forEach((l, i) => l.scale.x = 1 + p * (i + 1) * .3); talk(w.f, t); brow(w.f, .55); ctAt(w, 1 - p * 2.4, 1.7 + .03 * Math.abs(Math.sin(t * 12)), -.1, Math.PI, .26); } },
    { say: 'Your video call? A cat fills the camera.', label: 'HELLO', show: ['floor', 'wall', 'desk', 'mon', 'kb'], sky: '#EAF2F8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.9, 5], look: [0, 1.85, -.3], fov: 50, to: { pos: [0, 2.9, 4.6], look: [0, 1.85, -.3], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; deskOn(w); w.lines.visible = false; w.scr.material.color.set(p > .3 ? '#F5B041' : '#AED6F1'); talk(w.f, t); brow(w.f, -.3); ctAt(w, -.3, 1.7, -.45, Math.PI * 1.5, .3); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * 1.3); } },
    { say: 'And the cat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'desk', 'mon', 'kb', 'card'], sky: '#EAF2F8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.9, 5], look: [0, 1.85, -.3], fov: 50, to: { pos: [0, 2.9, 4.6], look: [0, 1.85, -.3], fov: 48 } },
      update: (w, p, t) => { deskOn(w); w.scr.material.color.set('#AED6F1'); w.lines.visible = true; talk(w.f, t, p < .3); brow(w.f, -.3); ctAt(w, .65, 1.68, -.2, -1, .28); if (p > .3) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the keyboard hid in a drawer. The cat napped on the desk.', label: 'NAP', show: ['floor', 'wall', 'desk', 'mon', 'kb'], sky: '#EAF2F8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.9, 5], look: [0, 1.8, -.3], fov: 50, to: { pos: [0, 2.9, 4.6], look: [0, 1.8, -.3], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; deskOn(w); const s = Math.min(1, p * 2.5); w.kb.position.set(-.3, 1.7 - s * .45, -.1 + s * .4); w.kb.visible = s < 1; talk(w.f, t, s < 1); brow(w.f, -.3); ctAt(w, -.2, 1.68, -.15, -.4, .28); w.c.body.scale.set(1.5, .85, 1.1); w.c.eyes.forEach(e => e.scale.y = p > .5 ? .1 : 1); } },
    { say: 'Grumpy keyboard: hide it, cover it, or type with the cat? Comment below.',
      quiz: { q: 'What do you do with the grumpy keyboard?', options: ['Hide it', 'Cover it', 'Type with the cat'], answer: 'Fun fact: a resting cat\'s heart beats about 120 to 140 times a minute.' },
      show: ['floor', 'desk', 'mon', 'kb', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.9, 5], look: [0, 1.8, -.3], fov: 54, to: { pos: [-2, 2.9, 5], look: [0, 1.8, -.3] } },
      update: (w, p, t) => { w.wall.visible = false; deskOn(w); talk(w.f, t, false); ctAt(w, .65, 1.68, -.2, -1, .3); holdCard(w, true); } },
  ],
};
