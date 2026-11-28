// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears (940 views after one night).
// Hook: the premise as a question under 2 s; first frame shows a person snapping two red lobster claws.

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
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

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

// Lobster claws replace the hands: a big crusher and a slimmer cutter, each with a moving lower pincer.
function claws(k, p) {
  const { mat, box, ball, group } = k; const red = mat('#D2382B', { rough: .5 });
  p.claws = p.arms.map((a, i) => { const big = i === 0 ? 1.25 : .95; const c = group([0, -1.75, 0], a); c.scale.setScalar(1.7); const top = box(.32 * big, .7 * big, .24 * big, red, [0, -.35 * big, .02], c); top.rotation.z = .15; c.userData.jaw = group([0, 0, 0], c); const j = box(.22 * big, .6 * big, .2 * big, red, [.14 * big, -.3 * big, 0], c.userData.jaw); j.rotation.z = -.25; ball(.22 * big, red, [0, 0, 0], c); a.children.forEach(ch => { if (ch.geometry && ch.geometry.type === 'SphereGeometry') ch.visible = false; }); return c; });
}
const snap = (p, t, sp = 10) => p.claws.forEach((c, i) => c.userData.jaw.rotation.z = -.35 * Math.abs(Math.sin(t * sp + i)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#FDEBD0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#2E86C1'); w.pp = w.p.root; claws(k, w.p);
  w.f = person(k, k.scene, '#28B463'); w.ff = w.f.root;
  w.jar = group(); cyl(.35, .35, .8, mat('#AED6F1', { glow: .2 }), [0, .4, 0], w.jar, 16); w.lid = cyl(.38, .38, .15, mat('#C0392B'), [0, .88, 0], w.jar, 16);
  w.table = group(); box(3, .2, 1.6, mat('#A0522D'), [0, 2, 0], w.table); for (const x of [-1.3, 1.3]) cyl(.08, .08, 2, mat('#6E3B1F'), [x, 1, 0], w.table, 8);
  w.phone = group(); box(.5, .05, .9, mat('#17202A'), [0, 0, 0], w.phone); w.screen = box(.44, .06, .8, mat('#5DADE2', { glow: .8 }), [0, .01, 0], w.phone);
  w.cracks = group(); for (let i = 0; i < 4; i++) { const c = box(.02, .07, .5, mat('#FDFEFE', { glow: .5 }), [0, .02, 0], w.cracks); c.rotation.y = i * .8; }
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#FDEBD0', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '546',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LOBSTER CLAWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'LOBSTER CLAWS?'],
  title: 'What would happen if humans had lobster claws?',
  description: 'Opening jars? Easy. High fives? Very risky. Texting? Forget it. And the cat finally has something to fear. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'lobster', 'claws', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human lobster claws are made up. Quiz fact: an American lobster\'s two claws are different: one is a big-toothed crusher claw for pulverizing shells, and the other is a finer-edged ripper claw for tearing soft flesh (NOAA Fisheries, "American Lobster").'],
  setup,
  scenes: [
    { say: 'What if we had lobster claws?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 3, 9], look: [0, 3.2, 0], fov: 52, to: { pos: [0, 3, 8.4], look: [0, 3.2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'ff', 'jar', 'table', 'phone', 'cracks'); w.cr.visible = false; stand(w, 0, 0, 0); pose(w.p, .3, 1.1); snap(w.p, t); w.p.mouth.scale.set(1.2, 1.6, 1); } },
    { say: 'Opening jars? Easy.', show: ['floor', 'wall', 'pp', 'jar'], ...env,
      cam: { pos: [.6, 2.6, 6.5], look: [.4, 2.2, 0], fov: 50, to: { pos: [.6, 2.6, 6], look: [.4, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'ff', 'table', 'phone', 'cracks'); w.cr.visible = false; stand(w, -.6, 0, .3); pose(w.p, .2, 1.2); snap(w.p, t, p > .4 ? 0 : 8); w.jar.position.set(.9, .9, 1.4); w.lid.position.set(0, .88 + Math.max(0, p - .45) * 6, 0); w.lid.rotation.z = Math.max(0, p - .45) * 12; w.jar.children[0].position.y = .4; } },
    { say: 'High fives? Very risky.', show: ['floor', 'wall', 'pp', 'ff'], ...env,
      cam: { pos: [0, 3.2, 10], look: [0, 3, 0], fov: 52, to: { pos: [0, 3.2, 9.4], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'jar', 'table', 'phone', 'cracks'); w.cr.visible = false; stand(w, -1.4, 0, .5); pose(w.p, .3); w.p.arms[1].rotation.set(0, 0, 2.6); snap(w.p, t, 12); w.ff.position.set(1.4 + p * 1.2, 0, 0); w.ff.rotation.set(0, -.5, 0); w.f.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .3)); w.f.eyes.forEach(e => e.scale.setScalar(1.5)); w.f.mouth.scale.set(1, 3, 1); } },
    { say: 'Texting? Forget it.', show: ['floor', 'wall', 'pp', 'table', 'phone', 'cracks'], ...env,
      cam: { pos: [0, 3.8, 5.5], look: [0, 2.3, 0], fov: 48, to: { pos: [0, 3.8, 5], look: [0, 2.3, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'ff', 'jar'); w.cr.visible = false; stand(w, 0, -1.1, 0); pose(w.p, .1, 1.2); w.table.position.set(0, 0, .4); w.phone.position.set(0, 2.13, .6); const hit = p > .5; w.p.claws.forEach(c => c.userData.jaw.rotation.z = 0); w.p.arms[0].rotation.x = hit ? -1.05 : -1.2 + .2 * Math.sin(t * 6); w.cracks.visible = hit; w.cracks.position.set(0, 2.14, .6); w.screen.material.color.set(hit ? '#17202A' : '#5DADE2'); } },
    { say: 'And the cat? Finally scared of something.', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 2.8, 9], look: [0, 2.4, 0], fov: 52, to: { pos: [0, 2.8, 8.4], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'ff', 'jar', 'table', 'phone', 'cracks'); w.screen.material.color.set('#5DADE2'); stand(w, -1.4, 0, .4); pose(w.p, .4, .5); snap(w.p, t, 10); const j = Math.sin(Math.min(1, p * 1.5) * Math.PI); ctAt(w, 1.6, j * 2.4, .6, -2.4, .55); w.c.body.scale.set(1.4, 1.2, 1.2); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); } },
    { say: 'Lobster claws: handy, scary, or totally useless? Comment below.',
      quiz: { q: 'Would you want lobster claws?', options: ['Handy', 'Scary', 'Totally useless'], answer: 'Made up for people. Real lobsters have two different claws: a crusher and a ripper.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.5, 9], look: [0, 3.4, 0], fov: 50, to: { pos: [-1, 1.5, 9], look: [0, 3.4, 0] } },
      update: (w, p, t) => { hide(w, 'ff', 'jar', 'table', 'phone', 'cracks', 'wall'); w.cr.visible = false; stand(w, 0, 0, .2); pose(w.p, .3, 1.1); snap(w.p, t, 6); } },
  ],
};
