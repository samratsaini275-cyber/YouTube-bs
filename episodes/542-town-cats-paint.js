// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat painting at an easel with a brush, Gary watching.

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
  w.floor = k.ground('#C8A27A', 0);
  w.wall = box(40, 16, .3, mat('#FBEEE6'), [0, 8, -3]); w.wall.castShadow = false;
  const easel = (s) => { const e = group(); const wd = mat('#8E5B2B'); for (const x of [-.4, .4]) { const l = cyl(.03, .03, 2, wd, [x * s, 1 * s, 0], e, 6); l.rotation.z = -x * .2; } const c = box(1.1 * s, .9 * s, .04, mat('#FDFEFE'), [0, 1.35 * s, .06], e); e.userData.canvas = c; return e; };
  w.easelC = easel(1); w.dot = ball(.09, mat('#111111'), [0, 1.35, .1], w.easelC);
  w.easelG = easel(.55); w.blob = ball(.2, mat('#F2A04A'), [0, .74, .07], w.easelG); w.blob.scale.set(1.2, .9, .1);
  w.brush = group(); cyl(.015, .015, .5, mat('#8E5B2B'), [0, 0, 0], w.brush, 6); cone(.03, .08, mat('#C0392B'), [0, .29, 0], w.brush, 6);
  w.museum = group(); for (let i = 0; i < 2; i++) { const f = group([-1 + i * 2, 2.8, -2.8], w.museum); box(1.3, 1.1, .06, mat('#B9770E'), [0, 0, 0], f); box(1.1, .9, .07, mat('#FDFEFE'), [0, 0, .01], f); if (i) { const b = ball(.25, mat('#F2A04A'), [0, 0, .05], f); b.scale.set(1.2, .9, .1); } else ball(.06, mat('#111111'), [0, 0, .05], f); const sp = cone(.5, 1.6, mat('#FFF4B0', { glow: .5 }), [0, .6, .4], f, 16); sp.material.transparent = true; sp.material.opacity = .2; sp.castShadow = false; }
  w.rope = group(); for (const x of [-2.2, 0, 2.2]) { cyl(.04, .04, .8, mat('#B9770E'), [x, .4, -1.2], w.rope, 8); } const r = cyl(.03, .03, 4.4, mat('#C0392B'), [0, .75, -1.2], w.rope, 6); r.rotation.z = Math.PI / 2;
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.beret = cyl(.2, .2, .06, mat('#1F2E5A'), [.36, .58, 0], w.g, 14);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.crowd = []; for (let i = 0; i < 2; i++) { const c = cat(k, k.scene); const col = ['#8A8A8A', '#5D4037'][i]; c.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = mat(col, { rough: .85 }); }); w.crowd.push(c); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const put = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const brushAt = (w, x, y, z, t) => { w.brush.position.set(x, y + Math.sin(t * 8) * .08, z); w.brush.rotation.set(0, 0, .6 + Math.sin(t * 8) * .3); };
const noCrowd = (w) => w.crowd.forEach(c => c.root.visible = false);
const env = { sky: '#FBEEE6', lightAt: [2, 7, 6], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '542',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'PAINTING CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS ARE PAINTERS'],
  title: 'In this town, cats are painters (Gary the ant and the cat)',
  description: 'The cat painted Gary: a tiny black dot. Gary painted the cat: a big orange blob. Then the cat had an idea. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'painting', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: painting cats are made up. Quiz fact: the paintings in the Lascaux cave in France are about 17,000 years old, and the cave holds about 600 painted and drawn animals and symbols, such as aurochs, deer, horses and bison (Encyclopaedia Britannica, "Lascaux").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats are painters.',
      show: ['floor', 'wall', 'easelC', 'brush', 'g'], ...env,
      cam: { pos: [0, 4.4, 8.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 4.4, 8], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'easelG', 'museum', 'rope', 'dot'); noCrowd(w); w.easelC.position.set(-.4, 0, -.4); put(w.c, 1, 0, .2, -2.6, .5); w.c.paw.position.set(1.2, 1.4, .9); brushAt(w, .2, 1.3, .1, t); gy(w, -1.4, 0, 1.6, -.4, t); w.beret.visible = false; },
    },
    {
      say: 'The cat painted Gary. A tiny black dot.',
      show: ['floor', 'wall', 'easelC', 'dot', 'g'], ...env,
      cam: { pos: [-.6, 2.2, 6.2], look: [-.6, 1.3, 0], fov: 50, to: { pos: [-.6, 2.2, 5.8], look: [-.6, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'easelG', 'museum', 'rope', 'brush'); noCrowd(w); w.easelC.position.set(-.4, 0, -.4); w.cr.visible = false; w.beret.visible = false; w.dot.visible = true; gy(w, -1.5, 0, 1.2, -.6, t); w.g.rotation.z = -.1; },
    },
    {
      say: 'Gary painted the cat. A big orange blob.',
      show: ['floor', 'wall', 'easelG', 'g'], ...env,
      cam: { pos: [.2, 1.4, 4.4], look: [.2, .9, 0], fov: 50, to: { pos: [.2, 1.4, 4], look: [.2, .9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'easelC', 'museum', 'rope', 'brush'); noCrowd(w); w.easelG.position.set(.5, 0, -.2); w.cr.visible = false; w.beret.visible = true; gy(w, -.5, 0, .6, -.2, t); w.g.rotation.z = .1 * Math.sin(t * 6); },
    },
    {
      say: 'Then the cat hung them in a museum.',
      show: ['floor', 'wall', 'museum', 'rope', 'g'], ...env,
      cam: { pos: [0, 2.8, 8], look: [0, 2, 0], fov: 52, to: { pos: [0, 2.8, 7.5], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'easelC', 'easelG', 'brush'); noCrowd(w); w.beret.visible = true; put(w.c, 1.4, 0, 0, -2.6, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); gy(w, -.8, 0, .8, -.4, t); w.g.rotation.z = .2; },
    },
    {
      say: 'Now the whole town lines up to see them.',
      show: ['floor', 'wall', 'museum', 'rope', 'g'], ...env,
      cam: { pos: [0, 3, 8.5], look: [0, 1.8, 0], fov: 52, to: { pos: [0, 3, 8], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'easelC', 'easelG', 'brush'); w.beret.visible = true; put(w.c, 1.6, 0, 0, -2.6, .45); w.crowd.forEach((c, i) => { put(c, -1.8 + i * 1.6, 0, .4, -1.6, .35); c.head.rotation.z = .35; }); gy(w, .2, 0, 1.2, -.4, t); },
    },
    {
      say: 'Best thing to paint: a sunset, a portrait, or a cat? Comment below.',
      quiz: { q: 'What is the best thing to paint?', options: ['A sunset', 'A portrait', 'A cat'], answer: 'Fun fact: the paintings in the Lascaux cave in France are about 17,000 years old.' },
      show: ['floor', 'wall', 'museum', 'g'], sky: '#5DADE2', lightAt: [2, 7, 6], lightDist: 22,
      cam: { pos: [2.2, 2.6, 7.5], look: [0, 1.6, 0], fov: 48, to: { pos: [-2.2, 2.6, 7.5], look: [0, 1.6, 0] } },
      update: (w, p, t) => { hide(w, 'easelC', 'easelG', 'brush', 'rope'); noCrowd(w); w.beret.visible = true; put(w.c, 1, 0, .2, -2.4, .45); gy(w, -.8, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
