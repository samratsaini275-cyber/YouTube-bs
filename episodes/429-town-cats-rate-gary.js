// Narrative 24: "In This Town… (season 3: cats say it out loud)". Gary slot (429/434/439/444): the cats review Gary.
// Hook: the rule under 2 s; first frame shows Gary on a tiny stage in front of two cats holding score cards.

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
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const judges = (w, verdict, run = 0) => w.cats.forEach((c, i) => { const x = (i ? 1.45 : -1.45) + (i ? 1 : -1) * run * 4; ctAt(c, x, 0, .9, i ? -2.5 : -.6, .36); if (run > 0) { c.root.rotation.y = i ? 0 : Math.PI; } c.paw.position.set(1.2, 1.9, .9); c.root.updateWorldMatrix(true, true); const at = c.paw.getWorldPosition(new w.k.THREE.Vector3()); const cd = w.cards[i]; cd.position.set(at.x, at.y + .7, at.z + .2); cd.visible = run === 0; cd.ok.visible = verdict === true; cd.no.visible = verdict === false; });

export default {
  id: '429',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS RATE GARY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS RATE GARY'],
  title: 'In this town, cats rate Gary the ant',
  description: 'His dance? Two stars. His tiny hat? Five stars. A hug? The cats run. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'ant', 'shorts'],
  sources: ['Comedy sketch: cat judges are made up. Quiz fact: leafcutter ants can make sounds by rubbing body parts together (stridulation), and they use the vibrations to communicate (Hager et al., "Directional vibration sensing in the leafcutter ant Atta sexdens", Biology Open, 2017).'],
  setup,
  scenes: [
    { say: 'In this town, cats rate Gary.', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.3, 9.5], look: [0, 1.25, 0], fov: 50, to: { pos: [0, 2.3, 9], look: [0, 1.25, 0], fov: 48 } },
      update: (w, p, t) => { w.hat.visible = false; gy(w, 0, .4, 0, -.4, t); judges(w, null); } },
    { say: 'His dance? Two stars.', label: '2 STARS', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.3, 9.5], look: [0, 1.25, 0], fov: 50, to: { pos: [0, 2.3, 9], look: [0, 1.25, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, 0, .4 + .15 * Math.abs(Math.sin(t * 8)), 0, -.4 + .6 * Math.sin(t * 5), t, true); w.g.rotation.z = .2 * Math.sin(t * 8); judges(w, p > .45 ? false : null); w.cats.forEach(c => c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : .4)); } },
    { say: 'His tiny hat? Five stars.', label: '5 STARS', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.2, 8.5], look: [0, 1.15, 0], fov: 50, to: { pos: [0, 2.2, 8], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { w.g.rotation.z = 0; w.hat.visible = true; gy(w, 0, .4, 0, -.4, t); w.hat.rotation.z = .2 * Math.sin(t * 4); judges(w, p > .45 ? true : null); } },
    { say: 'A hug? The cats run.', label: 'NOPE', show: ['floor', 'wall', 'stage'], sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [0, 2.4, 8.5], look: [0, 1.3, 0], fov: 52, to: { pos: [0, 2.4, 8], look: [0, 1.3, 0], fov: 50 } },
      update: (w, p, t) => { gy(w, 0, .4, .3 + p * .6, -Math.PI / 2, t, true); w.g.rotation.y = -Math.PI / 2; const run = Math.max(0, (p - .35) / .65); judges(w, null, run); } },
    { say: 'Is Gary a good dancer? Comment below.',
      quiz: { q: 'Is Gary a good dancer?', options: ['Yes', 'No', 'Too tiny to tell'], answer: 'Made up. But real leafcutter ants squeak by rubbing body parts together.' },
      show: ['floor', 'stage'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 1.8, 5], look: [0, 1, 0], fov: 50, to: { pos: [-1.2, 1.8, 5], look: [0, 1, 0] } },
      update: (w, p, t) => { w.wall.visible = false; w.cats.forEach(c => c.root.visible = false); w.cards.forEach(c => c.visible = false); gy(w, 0, .4 + .1 * Math.abs(Math.sin(t * 6)), 0, -.4 + .4 * Math.sin(t * 4), t, true); } },
  ],
};
