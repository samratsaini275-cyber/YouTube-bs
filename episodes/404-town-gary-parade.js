// Narrative 22: "In This Town… (short format, cats first)". Finale (Gary slot 404): Gary's parade, watched by the town's cats.
// Hook: the rule under 2 s; first frame shows Gary riding a crumb float with a flag, confetti falling.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.road = box(60, .04, 4, mat('#666C77'), [0, .03, 0]);
  w.float = group(); box(1.6, .3, 1, mat('#7C5CC4'), [0, .35, 0], w.float); for (const x of [-.6, .6]) for (const z of [-.5, .5]) { const wh = cyl(.18, .18, .1, mat('#222222'), [x, .18, z], w.float, 12); wh.rotation.x = Math.PI / 2; } const cr = ball(.6, mat('#C98B3E', { rough: .9 }), [0, .85, 0], w.float); cr.scale.set(1.2, .7, 1);
  w.g = gary(k, k.scene, 1, null);
  w.crown = group([.36, .55, 0], w.g); cyl(.14, .14, .1, mat('#F2C94C', { metal: .6, glow: .2 }), [0, 0, 0], w.crown, 10); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.03, .1, mat('#F2C94C', { metal: .6 }), [Math.cos(a) * .12, .09, Math.sin(a) * .12], w.crown, 4); }
  w.flag = group([-.3, .5, 0], w.g); cyl(.015, .015, .9, mat('#DDDDDD'), [0, .45, 0], w.flag, 6); box(.4, .25, .02, mat('#E2453C', { glow: .2 }), [.2, .78, 0], w.flag);
  w.ants = group(); for (let i = 0; i < 12; i++) { const a = gary(k, w.ants, .45, null); a.userData.i = i; }
  w.drum = group(); const dr = cyl(.3, .3, .3, mat('#E2453C'), [0, 0, 0], w.drum, 14); dr.rotation.x = Math.PI / 2; cyl(.31, .31, .05, mat('#FFFFFF'), [0, 0, .16], w.drum, 14).rotation.x = Math.PI / 2;
  w.cats = []; w.cg = group(); for (let i = 0; i < 3; i++) { const c = cat(k, w.cg); c.root.children.forEach(m => { if (m.material && i) m.material = m.material.clone(); }); w.cats.push(c); }
  w.conf = group(); for (let i = 0; i < 24; i++) { const c = box(.08, .08, .02, mat(['#E2453C', '#F2C94C', '#3B6FD6', '#3FA34D', '#F49AAE'][i % 5], { glow: .4 }), [0, 0, 0], w.conf); c.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const confetti = (w, t, at, spread = 3) => w.conf.children.forEach(c => { const i = c.userData.i, q = (t * .35 + i / 24) % 1; c.position.set(at[0] + ((i * 37) % 13 / 13 - .5) * spread, at[1] + 3 - q * 3.4, at[2] + ((i * 17) % 7 / 7 - .5) * 1.4); c.rotation.set(t * 3 + i, t * 2 + i, 0); });

export default {
  id: '404',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY\'S PARADE',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'GARY\'S PARADE'],
  title: 'In this town, Gary the ant leads the parade (finale)',
  description: 'The float? One crumb. The band? Twelve ants and one drum. And the crowd? Every cat in town. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'cats', 'parade', 'shorts'],
  sources: ['Comedy sketch: Gary\'s parade is made up. Quiz fact: a DNA study of ant family trees estimated that ants first appeared roughly 140 to 168 million years ago (Moreau et al., "Phylogeny of the ants: diversification in the age of angiosperms", Science 312, 2006).'],
  setup,
  scenes: [
    { say: 'In this town, Gary\'s parade.', show: ['ground', 'road', 'float', 'conf'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.6, 2.1, 5.6], look: [0, 1.75, 0], fov: 50, to: { pos: [.5, 2.1, 5.1], look: [0, 1.75, 0], fov: 48 } },
      update: (w, p, t) => { w.ants.visible = false; w.cg.visible = false; w.drum.visible = false; w.float.position.set(0, 0, 0); gy(w, .05, 1.25, 0, -.4, t); w.flag.rotation.z = .1 * Math.sin(t * 4); w.g.rotation.z = .05 * Math.sin(t * 6); confetti(w, t, [0, 0, .4]); } },
    { say: 'The float? One crumb.', label: 'WOW', show: ['ground', 'road', 'float', 'conf'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2.6, 2.2, 6], look: [0, .9, 0], fov: 50, to: { pos: [2.2, 2.2, 5.5], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { const x = -1.2 + p * 2; w.float.position.set(x, 0, 0); w.float.children.forEach((c, i) => { if (i > 0 && i < 5) c.rotation.y = -t * 6; }); gy(w, x + .05, 1.25, 0, 0, t); confetti(w, t, [x, 0, .3]); } },
    { say: 'The band? Twelve ants and one drum.', label: 'BOOM', show: ['ground', 'road', 'ants', 'drum'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.2, 1.3, 4.2], look: [.4, .5, 0], fov: 50, to: { pos: [1, 1.3, 3.8], look: [.4, .5, 0], fov: 48 } },
      update: (w, p, t) => { w.float.visible = false; w.g.visible = false; w.conf.visible = false; const x0 = -1.8 + p * .9; w.ants.children.forEach(a => { const i = a.userData.i; a.position.set(x0 - (i % 6) * .7 + 1.6, .02 + .05 * Math.abs(Math.sin(t * 10 + i)), (Math.floor(i / 6) - .5) * .7); a.rotation.y = 0; scurry(a, t + i, 16); }); w.drum.position.set(x0 + 1.75, .55 + .04 * Math.sin(t * 10), -.35); w.drum.scale.setScalar(.45 * (1 + .1 * Math.max(0, Math.sin(t * 10)))); } },
    { say: 'And the crowd? Every cat in town.', label: 'MEOW', show: ['ground', 'road', 'float', 'cg', 'conf'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 2.8, 10], look: [0, 1.5, 0], fov: 52, to: { pos: [0, 2.8, 9.5], look: [0, 1.5, 0], fov: 50 } },
      update: (w, p, t) => { w.ants.visible = false; w.drum.visible = false; const x = -2 + p * 3; w.float.position.set(x, 0, .6); gy(w, x + .05, 1.25, .6, 0, t); confetti(w, t, [x, 0, .6], 6); w.cats.forEach((c, i) => { ctAt(c, -3 + i * 3, 0, -2.6, -Math.PI / 2 + .3, .5); c.head.rotation.y = Math.max(-.7, Math.min(.7, (x - (-3.4 + i * 3.4)) * -.3)); c.head.rotation.z = .05 * Math.sin(t * 3 + i); }); } },
    { say: 'Is Gary a good parade leader? Comment below.',
      quiz: { q: 'Is Gary a good parade leader?', options: ['Yes', 'No', 'Too tiny to see'], answer: 'Made up. But ants have been around for over 100 million years.' },
      show: ['ground', 'float', 'conf'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.4, 1.9, 5], look: [0, 1.1, 0], fov: 50, to: { pos: [-1.4, 1.9, 5], look: [0, 1.1, 0] } },
      update: (w, p, t) => { w.cg.visible = false; w.road.visible = false; w.float.position.set(0, 0, 0); gy(w, .05, 1.25, 0, -.2, t); confetti(w, t, [0, 0, .3]); } },
  ],
};
