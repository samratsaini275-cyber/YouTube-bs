// Narrative 22: "In This Town… (short format, cats first)". Gary slot (389/394/399/404); Gary shorts are the channel's recurring character.
// Hook: the rule under 2 s; first frame shows tiny Gary with a whistle in front of a giant football and players.

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


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#4FAF4A', 0);
  w.lines = group(); box(.15, .03, 20, mat('#FFFFFF'), [0, .03, 0], w.lines); const cc = k.torus(3, .08, mat('#FFFFFF'), [0, .03, 0], w.lines); cc.rotation.x = Math.PI / 2;
  w.goal = group(); for (const x of [-2.5, 2.5]) cyl(.12, .12, 2.6, mat('#FFFFFF'), [x, 1.3, 0], w.goal, 8); const bar = cyl(.12, .12, 5.1, mat('#FFFFFF'), [0, 2.6, 0], w.goal, 8); bar.rotation.z = Math.PI / 2;
  w.ballG = group(); ball(.7, mat('#FFFFFF'), [0, 0, 0], w.ballG); for (const v of [[0, .62, .3], [.6, .1, .3], [-.55, .15, .35], [0, -.3, .6], [.3, .3, -.6]]) ball(.2, mat('#111111'), v, w.ballG);
  w.players = []; w.pg = group(); for (let i = 0; i < 3; i++) w.players.push(person(k, w.pg, ['#E2453C', '#3B6FD6', '#E2453C'][i]));
  w.g = gary(k, k.scene, 1.3, null);
  w.whistle = group([.75, .5, .1], w.g); cyl(.06, .06, .22, mat('#F2C94C', { metal: .6 }), [0, 0, 0], w.whistle, 8).rotation.z = Math.PI / 2;
  w.bino = group([.62, .52, 0], w.g); for (const z of [-.1, .1]) { const b = cyl(.07, .07, .26, mat('#222222'), [.1, 0, z], w.bino, 8); b.rotation.z = Math.PI / 2; }
  w.card = box(.2, .28, .01, mat('#FF2A2A', { glow: .6 }), [0, 0, 0]);
  w.cone = cone(.6, 1.6, mat('#FF8A2A'), [0, .8, 0]);
  w.tw = group(); for (let i = 0; i < 3; i++) { const n = ball(.07, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.tw); n.userData.i = i; }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false, s = 1.3) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(s); w.g.visible = true; w.whistle.visible = false; w.bino.visible = false; if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.root.visible = true; };
const run = (q, t, i) => q.arms.forEach((a, j) => a.rotation.set(.8 * Math.sin(t * 10 + i + j * Math.PI), 0, a.userData.s * .2));
const tweet = (w, t, on, at) => w.tw.children.forEach(n => { const i = n.userData.i, q = (t * 1.5 + i / 3) % 1; n.position.set(at[0] + .2 + q * .5, at[1] + q * .4, at[2] + (i - 1) * .12); n.scale.setScalar(1 - q * .5); n.visible = on; });

export default {
  id: '399',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY THE REFEREE',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'THE REFEREE IS GARY'],
  title: 'In this town, Gary the ant is the referee',
  description: 'His whistle? Nobody hears it. Offside? He needs binoculars. And his red card is the size of a crumb. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'funny', 'football', 'ant', 'shorts'],
  sources: ['Comedy sketch: Gary the referee is made up. Quiz fact: in honeypot ants, some workers called repletes store liquid food in their hugely swollen abdomens and hang from the nest ceiling as living food stores (Encyclopaedia Britannica, "honey ant").'],
  setup,
  scenes: [
    { say: 'In this town, the referee is Gary.', show: ['ground', 'lines', 'goal', 'ballG', 'pg', 'tw'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.6, 3.2, 7.4], look: [0, 1.1, 0], fov: 50, to: { pos: [.5, 3, 6.8], look: [0, 1.1, 0], fov: 48 } },
      update: (w, p, t) => { w.card.visible = false; w.cone.visible = false; w.goal.position.set(0, 0, -9); gy(w, .2, 0, .2, -.3, t, false, 1.5); w.whistle.visible = true; tweet(w, t, true, [1.3, .75, .3]); w.ballG.position.set(-1.8, .7, -1.4); w.players.forEach((q, i) => { pAt(q, -3.4 + i * 3.4, 0, -6, .2 - i * .2, .9); pose(q, .2, 0); q.head.rotation.x = .25; }); } },
    { say: 'His whistle? Nobody hears it.', label: 'TWEET', show: ['ground', 'lines', 'goal', 'ballG', 'pg', 'tw'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 3.4, 12], look: [0, 2.4, 0], fov: 54, to: { pos: [0, 3.4, 11.4], look: [0, 2.4, 0], fov: 52 } },
      update: (w, p, t) => { gy(w, 0, 0, 3, 0, t); w.whistle.visible = true; w.g.rotation.y = -.3; tweet(w, t, true, [.95 * 1.3 * .95, .65 * 1.3, 3.1]); const x = -8 + p * 16; w.ballG.position.set(x + 1.2, .7, .6); w.ballG.rotation.z = -t * 8; w.players.forEach((q, i) => { pAt(q, x - i * 1.6, 0, -.6 - i * .9, Math.PI / 2, 1); run(q, t, i); }); } },
    { say: 'Offside? He needs binoculars.', label: 'ZOOM', show: ['ground', 'lines', 'goal', 'pg', 'cone'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.4, 2.6, 5], look: [0, 2.1, 0], fov: 50, to: { pos: [1.2, 2.6, 4.5], look: [0, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.ballG.visible = false; w.tw.visible = false; w.cone.position.set(0, .8, 0); w.cone.visible = true; gy(w, 0, 1.55, 0, -.4, t); w.bino.visible = true; w.g.rotation.z = .15; w.players.forEach((q, i) => { pAt(q, -6 + i * 4, 0, -12, .3, 1); pose(q, .2, 0); }); } },
    { say: 'Red card? Size of a crumb.', label: 'HUH?', show: ['ground', 'lines', 'pg', 'card'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.4, 2.6, 7], look: [0, 1.9, 0], fov: 52, to: { pos: [1.2, 2.5, 6.4], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { w.cone.visible = false; gy(w, .4, 0, 1.4, -.4, t); w.g.rotation.z = .3; w.card.visible = true; w.card.position.set(.4 + .7 * 1.3 * .92, .9 + .1 * Math.sin(t * 6), 1.4 + .25); w.card.rotation.set(0, -.4, 0); w.players.forEach((q, i) => q.root.visible = i === 0); pAt(w.players[0], -.9, 0, -.3, .4, 1); pose(w.players[0], .3, .4); w.players[0].root.rotation.x = .5 * Math.min(1, p * 2); w.players[0].head.rotation.x = .3; w.players[0].mouth.scale.set(.6, 1.6, 1); } },
    { say: 'Is Gary a good referee? Comment below.',
      quiz: { q: 'Is Gary a good referee?', options: ['Yes', 'No', 'Too tiny to tell'], answer: 'Made up. But real honeypot ants hang from the ceiling as living food jars.' },
      show: ['ground', 'tw'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.6, 1.8, 6], look: [0, .9, 0], fov: 50, to: { pos: [-1.6, 1.8, 6], look: [0, .9, 0] } },
      update: (w, p, t) => { w.card.visible = false; w.lines.visible = false; w.pg.visible = false; w.tw.visible = true; gy(w, 0, 0, 0, -.2, t, false, 1.6); w.whistle.visible = true; tweet(w, t, true, [.95 * 1.6 * .98, .5 * 1.6, .1]); } },
  ],
};
