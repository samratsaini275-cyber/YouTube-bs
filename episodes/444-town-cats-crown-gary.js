// Narrative 24: "In This Town… (season 3: cats say it out loud)". Gary slot, season finale (444): the cats crown Gary.
// Hook: the rule under 2 s; first frame shows Gary on the stage between two cats holding score cards.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

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
  const { mat, box, cyl, group } = k;
  const w = { k };
  w.floor = k.ground('#C9A27A', 0);
  w.wall = group(); box(40, 16, .3, mat('#3A2A4A'), [0, 8, -4], w.wall);
  w.stage = group(); box(2.4, .4, 1.6, mat('#B3262E'), [0, .2, 0], w.stage); w.spot = cyl(.4, 1.4, 5, mat('#FFF4B0', { glow: .5 }), [0, 2.7, 0], w.stage, 16); w.spot.material.transparent = true; w.spot.material.opacity = .2;
  w.g = gary(k, k.scene, 1.3, null);
  w.hat = group([.36, .58, 0], w.g); cyl(.2, .2, .02, mat('#111111'), [0, 0, 0], w.hat, 14); cyl(.12, .12, .3, mat('#111111'), [0, .15, 0], w.hat, 14);
  w.cats = []; for (let i = 0; i < 2; i++) { const c = cat(k, k.scene); if (i) c.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = k.mat('#8A8A8A', { rough: .85 }); }); w.cats.push(c); }
  w.cards = []; for (let i = 0; i < 2; i++) { const g = group(); box(.7, .55, .04, mat('#FFFFFF'), [0, 0, 0], g); g.ok = box(.3, .3, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .03], g); g.no = box(.3, .3, .02, mat('#E2453C', { glow: .4 }), [0, 0, .03], g); w.cards.push(g); k.scene.add(g); }
  w.crown = group([.36, .62, 0], w.g); const gold = mat('#F4D03F', { glow: .4 }); cyl(.32, .32, .12, gold, [0, 0, 0], w.crown, 16); for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; k.cone(.06, .18, gold, [Math.cos(a) * .3, .14, Math.sin(a) * .3], w.crown, 4); }
  w.conf = []; for (let i = 0; i < 30; i++) { const c = box(.08, .08, .02, mat(['#E74C3C', '#F1C40F', '#3498DB', '#2ECC71', '#9B59B6'][i % 5], { glow: .4 }), [0, 0, 0]); c.userData.o = [Math.random(), Math.random(), Math.random()]; w.conf.push(c); }
  w.mirror = group(); box(.8, 1.1, .05, mat('#D6EAF8', { glow: .5 }), [0, .9, 0], w.mirror); box(.9, 1.2, .04, mat('#8A5A2B'), [0, .9, -.03], w.mirror);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const judges = (w, verdict, run = 0) => w.cats.forEach((c, i) => { const x = (i ? 1.45 : -1.45) + (i ? 1 : -1) * run * 4; ctAt(c, x, 0, .9, i ? -2.5 : -.6, .36); if (run > 0) { c.root.rotation.y = i ? 0 : Math.PI; } c.paw.position.set(1.2, 1.9, .9); c.root.updateWorldMatrix(true, true); const at = c.paw.getWorldPosition(new w.k.THREE.Vector3()); const cd = w.cards[i]; cd.position.set(at.x, at.y + .7, at.z + .2); cd.visible = run === 0; cd.ok.visible = verdict === true; cd.no.visible = verdict === false; });

const confetti = (w, t, on) => w.conf.forEach(c => { const [a, b, d] = c.userData.o; c.visible = on; c.position.set((a - .5) * 5, 4 - ((t * .5 + b) % 1) * 4, (d - .5) * 2 + .5); c.rotation.set(t * 3 + a * 6, t * 2 + b * 6, 0); });

export default {
  id: '444',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS CROWN GARY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CROWN GARY'],
  title: 'In this town, cats crown Gary the ant (season finale)',
  description: 'Best tiny hat? Gary. Best copycat? Gary. The crown? Way too big. He wears it anyway. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: the cat awards are made up. Quiz fact: funnel ants (Aphaenogaster) use bits of debris such as leaf pieces and soil as tools, soaking up liquid food with them and carrying them back to the nest (Maák et al., "Tool selection during foraging in two species of funnel ants", Animal Behaviour, 2017).'],
  setup,
  scenes: [
    { say: 'In this town, cats crown Gary.', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.3, 9.5], look: [0, 1.25, 0], fov: 50, to: { pos: [0, 2.3, 9], look: [0, 1.25, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); w.hat.visible = false; w.crown.visible = false; gy(w, 0, .4, 0, -.4, t); judges(w, null); } },
    { say: 'Best tiny hat? Gary.', label: '5 STARS', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.2, 8.5], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 2.2, 8], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); w.crown.visible = false; w.hat.visible = true; gy(w, 0, .4, 0, -.4, t); w.hat.rotation.z = .2 * Math.sin(t * 4); judges(w, p > .4 ? true : null); } },
    { say: 'Best copycat? Gary.', label: '5 STARS', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.2, 8.5], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 2.2, 8], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); w.hat.visible = false; w.crown.visible = false; gy(w, 0, .4, 0, -.4, t); w.g.rotation.z = .5; w.g.userData.legs[1].rotation.x = -.9 + .25 * Math.sin(t * 14); judges(w, p > .4 ? true : null); w.cats.forEach(c => { c.head.rotation.z = -.25; }); } },
    { say: 'The crown? Way too big. He wears it anyway.', label: 'KING GARY', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.2, 8.5], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 2.2, 7.5], look: [0, 1.15, 0], fov: 46 } },
      update: (w, p, t) => { w.g.rotation.z = 0; w.hat.visible = false; w.crown.visible = true; const drop = Math.min(1, p * 2.5); w.crown.position.set(.36, .62 + (1 - drop) * 2, 0); w.crown.scale.setScalar(1.6); w.crown.rotation.z = drop >= 1 ? .3 : 0; gy(w, 0, .4, 0, -.4, t); confetti(w, t, drop >= 1); judges(w, drop >= 1 ? true : null); } },
    { say: 'What should cats rate next? Comment below.',
      quiz: { q: 'What should cats rate next?', options: ['Your cooking', 'Your dancing', 'Your homework'], answer: 'Made up. But real funnel ants use bits of leaf as sponges to carry food.' },
      show: ['floor', 'stage'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 1.8, 5], look: [0, 1, 0], fov: 50, to: { pos: [-1.2, 1.8, 5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.cats.forEach(c => c.root.visible = false); w.cards.forEach(c => c.visible = false); w.crown.visible = true; w.crown.position.set(.36, .62, 0); w.crown.scale.setScalar(1.6); confetti(w, t, true); gy(w, 0, .4 + .1 * Math.abs(Math.sin(t * 6)), 0, -.4 + .4 * Math.sin(t * 4), t, true); } },
  ],
};
