// Narrative 25: "In This Town… (season 4: things complain to the cat)". Object slot: the phone complains about the cat.
// Hook: the rule under 2 s; first frame shows a phone with a face on its screen next to a cat holding a score card.

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
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#D1F2EB'), [0, 8, -4], w.wall);
  w.table = group(); box(3.4, .15, 1.8, mat('#935116'), [0, 1.6, 0], w.table); for (const x of [-1.5, 1.5]) for (const z of [-.75, .75]) box(.12, 1.6, .12, mat('#6E2C00'), [x, .8, z], w.table);
  w.phone = group(); box(.7, 1.3, .1, mat('#1B2631'), [0, .65, 0], w.phone); box(.62, 1.15, .02, mat('#5DADE2', { glow: .6 }), [0, .67, .06], w.phone);
  w.f = face(k, w.phone, [0, .75, .07], .33);
  w.waves = group(); for (let i = 0; i < 3; i++) { const r = box(.06, .3 + i * .15, .02, mat('#FFFFFF', { glow: .6 }), [i * .18, 0, 0], w.waves); }
  w.card = group(); box(.9, .7, .05, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.4, .4, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .04], w.card); w.nr = box(.4, .4, .02, mat('#E2453C', { glow: .4 }), [0, 0, .04], w.card);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); w.c.ears.forEach((e, i) => e.rotation.set((i ? 1 : -1) * .3, 0, 0)); };
const holdCard = (w, good) => { w.c.paw.position.set(1.2, 1.9, .9); w.cr.updateWorldMatrix(true, true); const at = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.card.position.set(at.x + .5, at.y + 1, at.z + .25); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };

const tableOn = (w) => { w.table.position.set(0, 0, -.5); };

export default {
  id: '456',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PHONES COMPLAIN TO CATS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'PHONES COMPLAIN'],
  title: 'In this town, phones complain to cats',
  description: 'Knocked off the table? Daily. Your voice on a call? The ears turn. Five stars. So the phone calls the vet. The cat is gone. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'phone', 'shorts'],
  sources: ['Comedy sketch: complaining phones are made up. Quiz fact: in a study of 20 pet cats, cats that had got used to strangers\' voices calling their name reacted again when they heard their owner\'s voice, mostly by moving their ears and head, showing they can tell people apart by voice alone (Saito & Shinozuka, "Vocal recognition of owners by domestic cats (Felis catus)", Animal Cognition, 2013).'],
  setup,
  scenes: [
    { say: 'In this town, phones complain.', show: ['floor', 'wall', 'table', 'phone', 'card'], sky: '#D1F2EB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3, 7], look: [0, 2.85, 0], fov: 50, to: { pos: [0, 3, 6.5], look: [0, 2.85, 0], fov: 48 } },
      update: (w, p, t) => { tableOn(w); w.waves.visible = false; w.phone.position.set(-.6, 1.68, -.3); w.phone.rotation.set(0, .2, 0); talk(w.f, t); brow(w.f, .4); ctAt(w, .7, 1.68, -.2, -.8, .32); holdCard(w, null); } },
    { say: 'Knocked off the table? Daily.', label: 'OOPS', show: ['floor', 'wall', 'table', 'phone'], sky: '#D1F2EB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.6, 7.5], look: [0, 2.2, 0], fov: 50, to: { pos: [0, 2.6, 7], look: [0, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; tableOn(w); w.waves.visible = false; const k1 = Math.min(1, Math.max(0, (p - .2) * 3)); const fall = Math.max(0, k1 - .5) * 2; w.phone.position.set(-1.1 - k1 * .6, 1.68 - fall * fall * 1.68, -.3); w.phone.rotation.set(0, .2, fall * 1.5); talk(w.f, t); brow(w.f, -.4); ctAt(w, .2, 1.68, -.3, Math.PI * .95, .32); w.c.paw.position.set(1.3 + k1 * .5, .6, .3); } },
    { say: 'Your voice on a call? The ears turn.', label: '5 STARS', show: ['floor', 'wall', 'table', 'phone', 'card'], sky: '#D1F2EB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3, 7], look: [0, 2.85, 0], fov: 50, to: { pos: [0, 3, 6.5], look: [0, 2.85, 0], fov: 48 } },
      update: (w, p, t) => { tableOn(w); w.phone.position.set(-.6, 1.68, -.3); w.phone.rotation.set(0, .2, 0); w.waves.visible = true; w.waves.position.set(-.1, 2.5 + .05 * Math.sin(t * 6), -.2); talk(w.f, t); brow(w.f, -.3); ctAt(w, .7, 1.68, -.2, -.8, .32); const tw = p > .2 && p < .6 ? .7 : 0; w.c.ears.forEach((e, i) => e.rotation.set((i ? 1 : -1) * .3, tw * (i ? 1 : -1), 0)); w.c.head.rotation.y = tw ? .4 : 0; if (p > .55) holdCard(w, true); else w.card.visible = false; } },
    { say: 'So the phone? Calls the vet.', label: 'GONE', show: ['floor', 'wall', 'table', 'phone'], sky: '#D1F2EB', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 3, 7.5], look: [0, 2.7, 0], fov: 50, to: { pos: [0, 3, 7], look: [0, 2.7, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.waves.visible = false; tableOn(w); w.phone.position.set(-.6, 1.68, -.3); w.phone.rotation.set(0, .2, 0); talk(w.f, t, p < .5); brow(w.f, -.4); const run = Math.max(0, (p - .45) * 2.5); ctAt(w, .7 + run * 3, 1.68 + (run > 0 ? .1 * Math.abs(Math.sin(t * 16)) : 0), -.2, run > 0 ? 0 : -.8, .32); w.c.eyes.forEach((e, i) => e.scale.y = (i % 2 ? 1.6 : 1) * (p > .35 ? 1.5 : 1)); } },
    { say: 'Should the cat get a phone? Comment below.',
      quiz: { q: 'Should the cat get a phone?', options: ['Yes', 'No', 'Only for bird videos'], answer: 'Made up. But real cats can tell their owner\'s voice from a stranger\'s.' },
      show: ['floor', 'table', 'phone', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2.5, 3, 7.5], look: [0, 2.6, 0], fov: 54, to: { pos: [-2, 3, 7.5], look: [0, 2.6, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.waves.visible = false; tableOn(w); w.phone.position.set(-.6, 1.68, -.3); w.phone.rotation.set(0, .2, 0); talk(w.f, t, false); ctAt(w, .7, 1.68, -.2, -.8, .34); holdCard(w, true); } },
  ],
};
