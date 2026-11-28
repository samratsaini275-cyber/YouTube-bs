// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the orange cat singing on a stage with notes floating up, Gary below.

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
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  w.floor = k.ground('#2C2C34', 0);
  w.wall = box(40, 16, .3, mat('#3A2A4A'), [0, 8, -4]); w.wall.castShadow = false;
  w.stage = group(); box(4, .4, 2, mat('#B3262E'), [0, .2, 0], w.stage); w.spot = cyl(.6, 1.6, 5, mat('#FFF4B0', { glow: .5 }), [0, 2.9, 0], w.stage, 16); w.spot.material.transparent = true; w.spot.material.opacity = .18; w.spot.castShadow = false;
  w.mic = group(); cyl(.02, .02, 1.1, mat('#555555'), [0, .55, 0], w.mic, 6); ball(.08, mat('#222222'), [0, 1.15, 0], w.mic); cyl(.2, .2, .03, mat('#555555'), [0, .02, 0], w.mic, 12);
  w.notes = group(); for (let i = 0; i < 5; i++) { const n = group([0, 0, 0], w.notes); ball(.07, mat('#F7DC6F', { glow: 1 }), [0, 0, 0], n); box(.02, .2, .02, mat('#F7DC6F', { glow: 1 }), [.06, .1, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.glass = group(); const gm = mat('#D6EAF8', { glow: .3 }); gm.transparent = true; gm.opacity = .6; cyl(.12, .08, .25, gm, [0, .4, 0], w.glass, 12); cyl(.02, .02, .25, gm, [0, .15, 0], w.glass, 6); cyl(.08, .08, .02, gm, [0, .02, 0], w.glass, 12);
  w.shards = group(); for (let i = 0; i < 8; i++) { const sh = box(.06, .06, .01, gm, [0, 0, 0], w.shards); sh.userData.a = i / 8 * Math.PI * 2; }
  w.table = box(.6, .5, .6, mat('#6E4B2A'), [0, .25, 0], k.scene);
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.muffs = group([.36, .55, 0], w.g); const pm = mat('#FF6FA8'); for (const z of [-.2, .2]) ball(.1, pm, [0, 0, z], w.muffs); const band = cyl(.015, .015, .45, pm, [0, .12, 0], w.muffs, 6); band.rotation.x = Math.PI / 2;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.crowd = []; for (let i = 0; i < 3; i++) { const c = cat(k, k.scene); const col = ['#8A8A8A', '#5D4037', '#FDFEFE'][i]; c.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = mat(col, { rough: .85 }); }); w.crowd.push(c); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const put = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const sing = (c, t) => { c.head.rotation.z = .35 + .1 * Math.sin(t * 6); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); };
const notes = (w, x, y, t, on = true) => { w.notes.visible = on; w.notes.children.forEach(n => { const q = (t * .5 + n.userData.i / 5) % 1; n.position.set(x + q * 1.2 + Math.sin(q * 6 + n.userData.i) * .2, y + q * 1.6, .3); n.scale.setScalar(.8 + q * .6); }); };
const noCrowd = (w) => w.crowd.forEach(c => c.root.visible = false);
const env = { sky: '#3A2A4A', lightAt: [0, 8, 6], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '540',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SINGING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS CAN SING'],
  title: 'In this town, cats can sing (Gary the ant and the cat)',
  description: 'The cat hit a really high note. Gary wore earmuffs. Then the whole street joined in. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'singing', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: singing cats are made up. Quiz fact: all the male humpback whales in a population sing the current version of the same song, and new song types have spread repeatedly from population to population eastward across the South Pacific (Garland et al., "Dynamic horizontal cultural transmission of humpback whale song at the ocean basin scale", Current Biology, 2011).',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats can sing.',
      show: ['floor', 'wall', 'stage', 'mic', 'notes', 'g'], ...env,
      cam: { pos: [0, 4.4, 8.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 4.4, 8], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'glass', 'shards', 'table'); w.muffs.visible = false; noCrowd(w); put(w.c, .2, .4, -.2, -1.8, .5); sing(w.c, t); w.mic.position.set(.9, .4, .3); notes(w, .7, 1.8, t); gy(w, -1.3, 0, 1.6, -.4, t); },
    },
    {
      say: 'The cat hit a really high note.',
      show: ['floor', 'wall', 'stage', 'mic', 'notes', 'glass', 'shards', 'table'], ...env,
      cam: { pos: [.6, 2.6, 7], look: [.6, 1.4, 0], fov: 50, to: { pos: [.6, 2.6, 6.5], look: [.6, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { w.g.visible = false; noCrowd(w); put(w.c, .2, .4, -.2, -1.8, .5); sing(w.c, t); w.c.head.rotation.z = .55; w.mic.position.set(.9, .4, .3); notes(w, .7, 1.8, t * 2); w.table.position.set(1.6, .25, .9); const br = p > .55; w.glass.visible = !br; w.glass.position.set(1.6, .5, .9); w.shards.visible = br; const f = br ? (p - .55) * 3 : 0; w.shards.position.set(1.6, .9, .9); w.shards.children.forEach(s => s.position.set(Math.cos(s.userData.a) * f, Math.sin(s.userData.a * 3) * .3 - f * f * .4, Math.sin(s.userData.a) * f * .5)); },
    },
    {
      say: 'Gary wore earmuffs.',
      show: ['floor', 'wall', 'stage', 'g'], ...env,
      cam: { pos: [-.6, 1.8, 6.5], look: [-.6, 1, 0], fov: 50, to: { pos: [-.6, 1.8, 6.1], look: [-.6, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'mic', 'notes', 'glass', 'shards', 'table'); w.cr.visible = false; noCrowd(w); w.g.visible = true; w.muffs.visible = true; gy(w, -.6, 0, 1.6, -.4, t); w.g.rotation.z = .1 * Math.sin(t * 8); },
    },
    {
      say: 'Then the whole street joined in.',
      show: ['floor', 'wall', 'stage', 'mic', 'notes', 'g'], ...env,
      cam: { pos: [0, 3.2, 9], look: [0, 1.4, 0], fov: 52, to: { pos: [0, 3.2, 8.5], look: [0, 1.4, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'glass', 'shards', 'table'); w.muffs.visible = true; put(w.c, .2, .4, -.2, -1.8, .5); sing(w.c, t); w.mic.position.set(.9, .4, .3); notes(w, .7, 1.8, t); w.crowd.forEach((c, i) => { const on = p > .15 + i * .2; c.root.visible = on; if (on) { put(c, -1.7 + i * 1.7, 0, 1.6, -1.6 + (i - 1) * .3, .3); sing(c, t + i); } }); gy(w, -1.2, 0, 2.4, -.4, t); },
    },
    {
      say: 'So Gary sang too. Very badly.',
      show: ['floor', 'wall', 'stage', 'mic', 'notes', 'g'], ...env,
      cam: { pos: [0, 2.4, 6.5], look: [0, 1.3, 0], fov: 50, to: { pos: [0, 2.4, 6], look: [0, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'glass', 'shards', 'table'); w.muffs.visible = false; noCrowd(w); put(w.c, 1.4, .4, -.4, -2.2, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 2.6 : 1.5); w.c.paw.position.set(1.1, 1.6, .9); w.mic.position.set(.1, .4, .6); gy(w, -.4, .4, .6, -.3, t); w.g.rotation.z = .25 + .1 * Math.sin(t * 9); notes(w, -.1, 1, t * 1.5); },
    },
    {
      say: 'Best song style: rock, country, or jazz? Comment below.',
      quiz: { q: 'What is the best song style?', options: ['Rock', 'Country', 'Jazz'], answer: 'Fun fact: male humpback whales in a group all sing the same song, and new songs spread across the ocean.' },
      show: ['floor', 'wall', 'stage', 'mic', 'notes', 'g'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 22,
      cam: { pos: [2.2, 2.6, 7.5], look: [0, 1.3, 0], fov: 48, to: { pos: [-2.2, 2.6, 7.5], look: [0, 1.3, 0] } },
      update: (w, p, t) => { hide(w, 'glass', 'shards', 'table'); w.muffs.visible = false; noCrowd(w); put(w.c, 1, .4, -.3, -2.4, .45); sing(w.c, t); w.mic.position.set(1.8, .4, .3); notes(w, 1.4, 1.6, t); gy(w, -.8, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
