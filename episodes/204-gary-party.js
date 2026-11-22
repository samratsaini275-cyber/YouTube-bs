// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Season finale, Gary slot: Gary throws a party for the season's animals.
// Hook: the premise as a question under 2 s; first frame shows Gary in a party hat on top of a giant cake.

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
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}
function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}
function penguin(k, parent) {
  const { mat, box, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(1, mat('#1C1C24', { rough: .5 }), [0, 1.3, 0], p.body); b.scale.set(.85, 1.25, .8);
  const bl = ball(.8, mat('#FFFFFF'), [0, 1.15, .32], p.body); bl.scale.set(.75, 1.1, .6);
  p.head = group([0, 2.55, 0], p.body); ball(.62, mat('#1C1C24', { rough: .5 }), [0, 0, 0], p.head);
  for (const x of [-.24, .24]) { ball(.15, mat('#FFFFFF'), [x, .1, .5], p.head); ball(.08, mat('#111111'), [x, .1, .62], p.head); }
  const bk = cone(.16, .45, mat('#FF9F1C'), [0, -.12, .7], p.head, 10); bk.rotation.x = Math.PI / 2;
  p.flips = [-1, 1].map(s => { const g = group([s * .8, 1.9, 0], p.body); const f = box(.18, 1.3, .55, mat('#1C1C24'), [s * .1, -.6, 0], g); return g; });
  for (const x of [-.35, .35]) box(.4, .12, .6, mat('#FF9F1C'), [x, .06, .2], p.body);
  p.glasses = group([0, .12, .63], p.head); for (const x of [-.24, .24]) box(.32, .2, .05, mat('#111111', { rough: .2 }), [x, 0, 0], p.glasses); box(.2, .05, .05, mat('#111111'), [0, .04, 0], p.glasses);
  return p;
}
function pig(k, parent) {
  const { mat, cyl, ball, cone, group } = k;
  const pk = mat('#F4A6B8', { rough: .6 });
  const p = { root: group([0, 0, 0], parent) };
  const b = ball(1, pk, [0, 1.3, 0], p.root); b.scale.set(1.4, 1, 1);
  p.head = group([1.3, 1.6, 0], p.root); ball(.7, pk, [0, 0, 0], p.head);
  const sn = cyl(.32, .32, .3, mat('#E88BA2'), [.65, -.1, 0], p.head, 16); sn.rotation.z = Math.PI / 2;
  for (const z of [-.1, .1]) ball(.06, mat('#8A3A50'), [.81, -.1, z], p.head);
  for (const z of [-.28, .28]) { ball(.12, mat('#FFFFFF'), [.45, .25, z], p.head); ball(.06, mat('#111111'), [.55, .25, z], p.head); }
  for (const z of [-.35, .35]) { const e = cone(.2, .35, pk, [0, .65, z], p.head, 4); e.rotation.x = z > 0 ? .4 : -.4; }
  p.legs = []; for (const x of [-.7, .7]) for (const z of [-.45, .45]) p.legs.push(cyl(.16, .16, .7, pk, [x, .35, z], p.root, 8));
  p.wings = [-1, 1].map(s => { const g = group([0, 2.1, s * .55], p.root); const wm = mat('#FFFFFF', { rough: .6 }); for (let i = 0; i < 3; i++) { const f = ball(.35, wm, [0, .05, s * (.3 + i * .3)], g); f.scale.set(.9, .18, 1.1 - i * .15); } return g; });
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#F2D7A6', 0);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.g = gary(k, k.scene, 2.4, null);
  w.hat = cone(.35, .9, mat('#FF4D6D'), [0, 0, 0], k.scene, 12);
  w.cake = group(); cyl(2.2, 2.2, 1.6, mat('#F6E3C8'), [0, .8, 0], w.cake, 24); cyl(1.6, 1.6, 1.3, mat('#FFB3C7'), [0, 2.25, 0], w.cake, 24);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; ball(.22, mat(['#FF4D6D', '#3B82F6', '#FFC21F'][i % 3]), [Math.cos(a) * 2.2, 1.6, Math.sin(a) * 2.2], w.cake); }
  w.pig = pig(k, k.scene); w.pp = w.pig.root; w.pig.wings.forEach(x => x.visible = false);
  w.pen = penguin(k, k.scene); w.pg = w.pen.root; w.pen.glasses.visible = false;
  w.balloons = group(); ['#FF4D6D', '#3B82F6', '#FFC21F', '#5DBB4A', '#A855F7'].forEach((c, i) => { const b = group([-8 + i * 4, 7 + (i % 2), -6], w.balloons); const s = ball(1, mat(c, { rough: .3 }), [0, 0, 0], b); s.scale.y = 1.2; const st = cyl(.03, .03, 5, mat('#FFFFFF'), [0, -3.6, 0], b, 4); st.castShadow = false; b.userData.i = i; });
  w.crumbs = group(); for (let i = 0; i < 8; i++) { const c = box(.25, .2, .25, mat('#F6E3C8'), [0, 0, 0], w.crumbs); c.userData.i = i; c.castShadow = false; }
  w.notes = group(); for (let i = 0; i < 4; i++) { const n = group([0, 0, 0], w.notes); const m = mat('#111111'); ball(.18, m, [0, 0, 0], n); box(.05, .6, .05, m, [.16, .3, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); w.g.updateMatrixWorld(true); const v = new w.g.position.constructor(.36, .62, 0); w.g.localToWorld(v); w.hat.position.copy(v).add(new v.constructor(0, .45, 0)); };
const rx = (w, x, z, ry, t) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); };
const party = (w, t) => { w.balloons.children.forEach(b => { b.position.y = 7 + (b.userData.i % 2) + .3 * Math.sin(t * 2 + b.userData.i); }); };

export default {
  id: '204',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY THROWS A PARTY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'THREW A PARTY?'],
  title: 'What would happen if Gary threw a party?',
  description: 'Season finale. Everyone came, even the T-rex. The pig ate the cake, the penguin danced, and Gary had the best night of his life. (A comedy what-if.)',
  tags: ['whatif', 'gary', 'ant', 'party', 'animals', 'trex', 'funny', 'shorts'],
  sources: [
    'Quiz fact: leafcutter ant colonies can contain several million workers (general entomology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary threw a party?',
      show: ['floor', 'g', 'hat', 'cake', 'balloons'], sky: '#FFE3F0', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [1, 5.4, 10.5], look: [0, 4.5, 0], fov: 46, to: { pos: [1, 5.4, 9.7], look: [0, 4.5, 0], fov: 44 } },
      update: (w, p, t) => { party(w, t); gy(w, -.6, 2.9, 0, -1.2, t); w.g.rotation.z = .12 * Math.sin(t * 6); },
    },
    {
      say: 'Everyone came. Even the T-rex.',
      show: ['floor', 'g', 'hat', 'cake', 'dino', 'pp', 'pg'], sky: '#FFE3F0', lightAt: [0, 8, -4], lightDist: 32,
      cam: { pos: [3, 6, 30], look: [0, 9.5, -6], fov: 46, to: { pos: [3, 6, 28], look: [0, 9.5, -6], fov: 44 } },
      update: (w, p, t) => { party(w, t); gy(w, -.6, 2.9, 0, -1.2, t); rx(w, -4, -10, .1, t); w.r.jaw.rotation.z = -.3; w.pp.position.set(-5, 0, 1); w.pp.rotation.y = 0; w.pg.position.set(4.5, 0, 1); w.pg.rotation.y = -.3; },
    },
    {
      say: 'The pig ate all the cake.',
      show: ['floor', 'cake', 'pp', 'crumbs'], sky: '#FFE3F0', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [1, 4, 11], look: [-1.2, 3.6, 0], fov: 46, to: { pos: [1, 4, 10], look: [-1.2, 3.6, 0], fov: 44 } },
      update: (w, p, t) => {
        const s = Math.max(.15, 1 - p * .9); w.cake.scale.set(s, s, s); gy(w, -.6, .3, 2.6, -1.4, t); w.pp.position.set(-4.4 + p * .8, 0, .3); w.pp.rotation.y = 0; w.pig.head.rotation.z = -.15 + .15 * Math.sin(t * 14);
        w.crumbs.children.forEach(c => { const i = c.userData.i, q = (t * 1.6 + i / 8) % 1; c.position.set(-2.4 + Math.cos(i) * q * 1.5, 1.6 + Math.sin(q * Math.PI) * 1.2, .3 + Math.sin(i * 3) * .8); });
      },
    },
    {
      say: 'The penguin did all the dancing.',
      show: ['floor', 'pg', 'balloons', 'notes'], sky: '#C9B6FF', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [1, 3.4, 9], look: [0, 3.3, 0], fov: 46, to: { pos: [1, 3.4, 8.2], look: [0, 3.3, 0], fov: 44 } },
      update: (w, p, t) => {
        party(w, t); w.pg.position.set(0, Math.abs(Math.sin(t * 6)) * .4, 0); w.pg.rotation.set(0, .5 * Math.sin(t * 3), 0); w.pen.body.rotation.z = .2 * Math.sin(t * 6); w.pen.flips.forEach((f, i) => f.rotation.z = (i ? 1 : -1) * (.6 + .5 * Math.sin(t * 12)));
        w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .7 + i / 4) % 1; n.position.set(-2 + i * 1.4, 4.4 + q * 2, -.5); n.scale.setScalar(Math.sin(q * Math.PI)); });
      },
    },
    {
      say: 'And Gary? Best party ever.',
      show: ['floor', 'g', 'hat', 'balloons'], sky: '#FFE3F0', lightAt: [0, 4, 0], lightDist: 18,
      cam: { pos: [3.5, 1.9, 6.8], look: [0, -.1, 0], fov: 46, to: { pos: [3.3, 1.9, 6.2], look: [0, -.1, 0], fov: 44 } },
      update: (w, p, t) => { party(w, t); gy(w, -.6, Math.abs(Math.sin(t * 5)) * .5, 0, -1.1, t); w.g.rotation.z = .15 * Math.sin(t * 10); },
    },
    {
      say: 'Gary\'s party: fun, wild, or a bit loud? Comment below.',
      quiz: { q: 'Would you go to Gary\'s party?', options: ['Fun', 'Wild', 'A bit loud'], answer: 'Fun fact: a single leafcutter ant colony can have millions of ants.' },
      show: ['floor', 'g', 'hat', 'cake', 'balloons', 'pp', 'pg'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 24,
      cam: { pos: [8, 5, 14], look: [0, 3.6, 0], fov: 46, to: { pos: [-8, 5, 14], look: [0, 3.6, 0] } },
      update: (w, p, t) => { party(w, t); w.cake.scale.setScalar(1); gy(w, -.6, 2.9, 0, -1.2, t); w.pp.position.set(-5, 0, 1); w.pp.rotation.y = 0; w.pg.position.set(4.5, 0, 1); w.pg.rotation.y = -.3; },
    },
  ],
};
