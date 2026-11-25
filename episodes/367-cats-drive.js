// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a cat at the wheel of a little red car.

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


function car(k, parent, col, open = false) {
  const { mat, box, cyl, group } = k;
  const g = group([0, 0, 0], parent);
  box(4, 1, 2, mat(col), [0, .8, 0], g); if (!open) box(2, .8, 1.8, mat('#9FD3EE'), [-.3, 1.7, 0], g);
  for (const x of [-1.3, 1.3]) for (const z of [-1, 1]) { const wh = cyl(.42, .42, .3, mat('#222222'), [x, .42, z], g, 14); wh.rotation.x = Math.PI / 2; }
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.road = box(80, .05, 7, mat('#555B66'), [0, .03, 0]); w.lines = group(); for (let i = 0; i < 20; i++) box(1.5, .06, .15, mat('#FFFFFF'), [-38 + i * 4, .05, 0], w.lines);
  w.my = car(k, k.scene, '#E2453C', true);
  w.wheel = torus(.35, .06, mat('#222222'), [.5, 1.9, 0], w.my); w.wheel.rotation.set(0, Math.PI / 2, 0);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.zzz = group(); for (let i = 0; i < 3; i++) { const z = ball(.15, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.zzz); z.userData.i = i; }
  w.light = group(); cyl(.12, .12, 4, mat('#333333'), [0, 2, 0], w.light, 8); box(.7, 1.8, .5, mat('#222222'), [0, 4.6, 0], w.light); w.green = ball(.22, mat('#3FD36A', { glow: 1 }), [0, 4.1, .26], w.light); ball(.22, mat('#552222'), [0, 5.1, .26], w.light);
  w.queue = group(); for (let i = 0; i < 3; i++) { const q = car(k, w.queue, ['#3E6FD6', '#F2C94C', '#3FA34D'][i]); q.position.set(-5.5 - i * 5, 0, 0); }
  w.bird = group(); const bb = ball(.3, mat('#4FB3E8'), [0, 0, 0], w.bird); bb.scale.set(1.3, 1, 1); w.wings = []; for (const z of [-1, 1]) { const wg = box(.5, .05, .4, mat('#3A8FC8'), [0, .1, z * .3], w.bird); w.wings.push(wg); } const bk = cone(.08, .2, mat('#F2A93B'), [.42, 0, 0], w.bird, 6); bk.rotation.z = -Math.PI / 2;
  w.parked = car(k, k.scene, '#7C5CC4');
  return w;
}

const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); w.c.tail.rotation.set(0, 0, 0); };
const drive = (w, x, z, t) => { w.my.position.set(x, 0, z); w.my.rotation.set(0, 0, 0); ctAt(w, x - .5, 1.1, z, 0, .42); w.c.paw.position.set(2.1, 2, .9); w.c.paw.rotation.z = .6; w.wheel.rotation.x = .3 * Math.sin(t * 3); };

export default {
  id: '367',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS THAT DRIVE',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'COULD DRIVE?'],
  title: 'What would happen if cats could drive?',
  description: 'Green light? Nap time. A bird? Emergency stop. And parking? Right on top of your car. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'animals', 'shorts'],
  sources: ['Comedy sketch: cats that drive are made up. Quiz fact: cats cannot taste sweetness, because the gene for the sweet taste receptor (Tas1r2) does not work in cats (Li et al., "Pseudogenization of a sweet-receptor gene accounts for cats\' indifference toward sugar", PLoS Genetics, 2005).'],
  setup,
  scenes: [
    { say: 'What if cats could drive?', label: 'VROOM', show: ['ground', 'road', 'lines', 'my', 'cr'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 3, 11], look: [0, 2.7, 0], fov: 52, to: { pos: [3.6, 3, 10.2], look: [0, 2.7, 0], fov: 50 } },
      update: (w, p, t) => { drive(w, 0, 0, t); w.my.position.y = .04 * Math.abs(Math.sin(t * 12)); w.lines.position.x = -(t * 8) % 4; w.c.head.rotation.z = .05 * Math.sin(t * 3); } },
    { say: 'Green light? Nap time.', label: 'HONK HONK', show: ['ground', 'road', 'lines', 'my', 'cr', 'zzz', 'light', 'queue'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [4, 5, 14], look: [-3, 2, 0], fov: 54, to: { pos: [4, 5, 13], look: [-3, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.lines.position.x = 0; drive(w, 0, 0, t); w.c.head.rotation.z = -.35; w.c.eyes.forEach((e, i) => e.scale.y = .15); w.c.paw.position.set(1.4, 1.3, .9); w.light.position.set(3, 0, -4.4); w.green.scale.setScalar(1 + .1 * Math.sin(t * 8)); w.queue.children.forEach((q, i) => q.position.y = .05 * Math.abs(Math.sin(t * 15 + i))); w.zzz.children.forEach(z => { const i = z.userData.i, q = (t * .5 + i / 3) % 1; z.position.set(.6 + q * .8, 2.6 + q * 1.6, .4); z.scale.setScalar(.6 + q * 1.2); }); } },
    { say: 'A bird? Emergency stop.', label: 'SCREEECH', show: ['ground', 'road', 'lines', 'my', 'cr', 'bird'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 && t < .8 ? .15 : 0,
      cam: { pos: [3, 3.4, 10], look: [1, 2.2, 0], fov: 54, to: { pos: [3, 3.4, 9.5], look: [1, 2.2, 0], fov: 52 } },
      update: (w, p, t) => { const jump = t > .8; drive(w, 0, 0, t); w.my.rotation.z = t > .5 && t < .8 ? .08 : 0; w.bird.position.set(3.2 + Math.max(0, t - .8) * 2, 3.4 + .2 * Math.sin(t * 6), 0); w.wings.forEach((g, i) => g.rotation.x = (i ? -1 : 1) * .6 * Math.sin(t * 20)); if (jump) { const q = Math.min(1, (t - .8) * 1.4); ctAt(w, -.5 + q * 3.2, 1.1 + Math.sin(q * Math.PI) * 2.2, 0, 0, .42); w.c.paw.position.set(2.1, 2.4, .9); w.c.paw.rotation.z = 1.4; } else { w.c.head.rotation.z = .25; w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .4 : 1.4); } } },
    { say: 'And parking? Right on top of your car.', label: 'CRUNCH', show: ['ground', 'road', 'my', 'cr', 'parked'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [5, 4.6, 11], look: [0, 2.2, 0], fov: 54, to: { pos: [5, 4.6, 10.5], look: [0, 2.2, 0], fov: 52 } },
      update: (w, p, t) => { w.parked.position.set(0, 0, 0); w.parked.scale.set(1, Math.max(.65, 1 - Math.max(0, p - .5) * .8), 1); const q = Math.min(1, p * 2); drive(w, -6 + q * 6, 0, t); w.my.position.y = q < 1 ? Math.sin(q * Math.PI) * 3 + q * 2.6 * q : 2.6 * w.parked.scale.y / 1; w.cr.position.y = w.my.position.y + 1.1; w.c.head.rotation.z = q >= 1 ? .15 : 0; } },
    { say: 'Cats that drive: cool, cute, or way too dangerous? Comment below.',
      quiz: { q: 'Cats that drive are…', options: ['Cool', 'Cute', 'Way too dangerous'], answer: 'Made up. Fun fact: real cats cannot taste sweet things at all.' },
      show: ['ground', 'my', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.4, 7], look: [0, 1.7, 0], fov: 52, to: { pos: [-2, 2.4, 7], look: [0, 1.7, 0] } },
      update: (w, p, t) => { drive(w, 0, 0, t); w.c.head.rotation.z = .05 * Math.sin(t * 3); } },
  ],
};
