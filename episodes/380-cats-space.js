// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a cat in a bubble helmet beside a rocket.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.rocket = group(); cyl(1.2, 1.2, 6, mat('#F4F4F4'), [0, 3.5, 0], w.rocket, 20); const nose = cone(1.2, 2, mat('#E2453C'), [0, 7.5, 0], w.rocket, 20); for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; const f = box(.2, 2, 1.4, mat('#E2453C'), [Math.cos(a) * 1.3, 1.2, Math.sin(a) * 1.3], w.rocket); f.rotation.y = -a; } const win = cyl(.5, .5, .1, mat('#9FD3EE', { glow: .4 }), [0, 5, 1.2], w.rocket, 16); win.rotation.x = Math.PI / 2;
  w.flame = group(); for (let i = 0; i < 6; i++) { const f = cone(.6 - i * .05, 1.6, mat(i % 2 ? '#F2C94C' : '#F28C28', { glow: 1 }), [0, -.3 - i * .1, 0], w.flame, 10); f.rotation.x = Math.PI; f.userData.i = i; }
  w.box = group(); box(3, 2, 2.4, mat('#C9965A'), [0, 1, 0], w.box); const fl1 = box(3, .05, 1.2, mat('#B88548'), [0, 2, -1.6], w.box); fl1.rotation.x = -.6; const fl2 = box(3, .05, 1.2, mat('#B88548'), [0, 2, 1.6], w.box); fl2.rotation.x = .6;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.helmet = ball(1, mat('#CFEFFF', { glow: .2 }), [0, 0, 0]); w.helmet.material.transparent = true; w.helmet.material.opacity = .3; w.helmet.castShadow = false;
  w.stars = group(); for (let i = 0; i < 40; i++) { const s = ball(.06, mat('#FFFFFF', { glow: 1 }), [Math.cos(i * 2.4) * (6 + i % 7), Math.sin(i * 1.7) * 9 + 4, -10 - (i % 5)], w.stars); s.castShadow = false; }
  w.moon = ball(3, mat('#D8D8D0'), [0, 0, 0]); for (let i = 0; i < 6; i++) { const cr = ball(.5, mat('#B8B8B0'), [Math.cos(i * 1.1) * 2.2, Math.sin(i * 1.7) * 1.8, 2.3], w.moon); cr.scale.z = .3; }
  w.earth = ball(1.4, mat('#3E8FCF', { glow: .2 }), [0, 0, 0]); for (let i = 0; i < 4; i++) { const l = ball(.5, mat('#3FA34D'), [Math.cos(i * 1.6) * .9, Math.sin(i * 2.1) * .8, 1], w.earth); l.scale.z = .4; }
  w.table = box(8, .4, 4, mat('#5A4A6A'), [0, 0, 0]);
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const helmetOn = (w) => { w.cr.updateWorldMatrix(true, true); const h = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); w.helmet.position.copy(h); w.helmet.scale.setScalar(w.cr.scale.x * 1.7); };

export default {
  id: '380',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS IN SPACE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'WENT TO SPACE?'],
  title: 'What would happen if cats went to space?',
  description: 'The rocket? They nap in the box it came in. Zero gravity? Still landing on their feet, somewhere. And the moon? They knock it off the table. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'space', 'shorts'],
  sources: ['Comedy sketch: cats in space are made up. Quiz fact: in October 1963 France launched a cat called Félicette on a short suborbital rocket flight, and she was recovered alive (Encyclopaedia Britannica, "Félicette"; Centre national d\'études spatiales history).'],
  setup,
  scenes: [
    { say: 'What if cats went to space?', show: ['ground', 'rocket', 'cr', 'helmet'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3, 13], look: [0, 3.1, 0], fov: 52, to: { pos: [2, 3, 12.3], look: [0, 3.1, 0], fov: 50 } },
      update: (w, p, t) => { w.rocket.position.set(2.2, 0, -2); w.rocket.visible = true; ctAt(w, -1.4, 0, 1, -1.1, .9); w.c.head.rotation.z = .1 * Math.sin(t * 2); helmetOn(w); } },
    { say: 'The rocket? They nap in the box it came in.', label: 'ZZZ…', show: ['ground', 'rocket', 'box', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4.6, 13], look: [0, 3, 0], fov: 54, to: { pos: [3, 4.6, 12.5], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.rocket.position.set(4, 0, -4); w.box.position.set(-1, 0, 0); ctAt(w, -1.2, 1.4, 0, -1.2, .75); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.35; w.c.body.scale.set(1.4, 1 + .04 * Math.sin(t * 2), 1); } },
    { say: 'Zero gravity? Still landing on its feet. Somewhere.', label: 'WHEEE', show: ['stars', 'cr', 'helmet', 'earth'], sky: '#0A0E24', lightAt: [4, 8, 10], lightDist: 30,
      cam: { pos: [0, 3, 12], look: [0, 3, 0], fov: 52, to: { pos: [0, 3, 11.5], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.earth.position.set(3.4, 7, -6); ctAt(w, Math.sin(t) * 1.2, 3 + Math.sin(t * 1.3) * .8, 0, -1.2, .8); w.cr.rotation.set(t * 1.6, -1.2, t * 1.1); helmetOn(w); } },
    { say: 'And the moon? They knock it off the table.', label: 'BOOP', show: ['stars', 'table', 'cr', 'helmet', 'moon'], sky: '#0A0E24', lightAt: [4, 8, 10], lightDist: 30,
      cam: { pos: [2, 5, 14], look: [0, 3, 0], fov: 54, to: { pos: [2, 5, 13.5], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.table.position.set(0, 1.5, 0); ctAt(w, -2.2, 1.7, 0, -.2, .8); helmetOn(w); const push = Math.min(1, Math.max(0, (p - .3) * 3)); w.c.paw.position.set(1 + push * 1, .5, .9); const fall = Math.max(0, p - .5) * 3; w.moon.position.set(1.6 + push * .8 + fall * 2, 1.7 + 3 * .6 - fall * fall * 2, 0); w.moon.scale.setScalar(.6); w.moon.rotation.z = -fall * 2; w.c.head.rotation.z = push > .5 ? .2 : 0; } },
    { say: 'Space cats: cool, cute, or way too floaty? Comment below.',
      quiz: { q: 'Space cats are…', options: ['Cool', 'Cute', 'Way too floaty'], answer: 'Made up. But a real French cat, Félicette, flew to space in 1963.' },
      show: ['stars', 'cr', 'helmet'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { ctAt(w, -.6, .2 * Math.sin(t * 2), 0, -.6, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); helmetOn(w); } },
  ],
};
