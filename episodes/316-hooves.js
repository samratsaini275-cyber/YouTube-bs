// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have hooves. Hook: the premise as a question under 2 s; first frame shows a person standing on two big hooves.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#C9B48A', 0);
  w.wall = group(); box(40, 20, .5, mat('#E8F0E0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.p.root.children[0].position.y = 1.9;
  w.legs = group([0, 0, 0], w.pp); w.hooves = [-1, 1].map(s => { const l = group([s * .4, .7, 0], w.legs); cyl(.22, .2, .7, mat('#2E4FA0'), [0, 0, 0], l, 10); const h = cyl(.3, .36, .45, mat('#2A1E16', { rough: .4 }), [0, -.55, .05], l, 12); box(.06, .46, .1, mat('#120C08'), [0, -.55, .38], l); l.userData.s = s; return l; });
  w.p.arms.forEach(a => a.position.y = 3); w.p.head.position.y = 3.9;
  w.stairs = group(); for (let i = 0; i < 6; i++) box(4, .5, 1.2, mat('#C0703F'), [0, .25 + i * .5, -i * 1.2], w.stairs);
  w.shoes = group(); for (let i = 0; i < 4; i++) { const sh = group([0, 0, 0], w.shoes); box(.8, .35, .4, mat(['#3B6FD6', '#FFFFFF', '#F2B21F', '#E2453C'][i]), [0, 0, 0], sh); box(.3, .1, .4, mat('#111111'), [-.25, -.2, 0], sh); sh.userData.i = i; }
  w.bin = group(); cyl(.7, .55, 1.4, mat('#666666'), [0, .7, 0], w.bin, 16);
  w.notes = group(); for (let i = 0; i < 6; i++) { const n = group([0, 0, 0], w.notes); ball(.12, mat('#111111'), [0, 0, 0], n); cyl(.025, .025, .45, mat('#111111'), [.11, .22, 0], n, 4); n.userData.i = i; }
  return w;
}

const stand = (w, x, y, z, ry) => { w.pp.position.set(x, y, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); w.hooves.forEach(l => { l.position.y = .7; l.rotation.x = 0; }); };
const step = (w, t, sp = 8, a = .35) => w.hooves.forEach(l => { const ph = Math.sin(t * sp + (l.userData.s > 0 ? Math.PI : 0)); l.position.y = .7 + Math.max(0, ph) * a; });

export default {
  id: '316',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE HOOVES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD HOOVES?'],
  title: 'What would happen if humans had hooves?',
  description: 'Stairs? Clip, clop, clip, clop. Shoes? Never again. And dancing? Very, very loud. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'horse', 'hooves', 'comedy', 'shorts'],
  sources: ['Comedy sketch: hooves on people are made up. Quiz fact: hooves are made of keratin, the same tough protein as human fingernails (Encyclopaedia Britannica, "hoof").'],
  setup,
  scenes: [
    { say: 'What if humans had hooves?', show: ['floor', 'wall', 'pp', 'legs'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 2.6, 13], look: [0, 4.4, 0], fov: 50, to: { pos: [0, 2.6, 12.3], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0); pose(w.p, .3); step(w, t, 6, .25); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Stairs? Clip, clop, clip, clop.', label: 'CLIP CLOP', show: ['floor', 'wall', 'pp', 'legs', 'stairs'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [9, 4.5, 4], look: [0, 3.2, -2.4], fov: 54, to: { pos: [8.4, 4.5, 3.6], look: [0, 3.2, -2.4], fov: 52 } },
      update: (w, p, t) => { const q = Math.min(1, p * 1.1), n = q * 5; stand(w, 0, .5 + Math.floor(n) * .5, 1.2 - n * 1.2, Math.PI); pose(w.p, .3); step(w, t, 10, .3); } },
    { say: 'Shoes? Never again.', show: ['floor', 'wall', 'pp', 'legs', 'shoes', 'bin'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.5, 3, 10], look: [0, 2.6, 0], fov: 50, to: { pos: [1.4, 3, 9.3], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -1, 0, 0, .4); pose(w.p, .3, .6); w.bin.position.set(1.6, 0, .3); w.shoes.children.forEach(sh => { const i = sh.userData.i, q = Math.min(1, Math.max(0, p * 2.4 - i * .4)); sh.position.set(-.4 + q * 2, 2.6 + Math.sin(q * Math.PI) * 1.4 - q * 1.2, .8 - q * .5); sh.rotation.set(q * 3, 0, q * 4); sh.visible = q < .98; }); w.p.mouth.scale.set(1.4, 1, 1); } },
    { say: 'And dancing? Very, very loud.', label: '*CLOMP*', show: ['floor', 'wall', 'pp', 'legs', 'notes'], sky: '#2A1E3E', lightAt: [0, 6, 5], lightDist: 14, shake: (t) => Math.sin(t * 12) > .7 ? .14 : 0,
      cam: { pos: [0, 3, 10.5], look: [0, 3.4, 0], fov: 50, to: { pos: [0, 3, 9.8], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, .6 * Math.sin(t * 3), 0, 0, .3 * Math.sin(t * 6)); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * (1.8 + .6 * Math.sin(t * 12 + a.userData.s)))); step(w, t, 12, .5); w.p.mouth.scale.set(1.3, 2, 1); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .7 + i / 6) % 1; n.position.set(-2.2 + (i % 3) * 2.2 + Math.sin(q * 6) * .3, 1 + q * 5, .5); n.visible = true; }); } },
    { say: 'Human hooves: useful, cool, or way too noisy? Comment below.',
      quiz: { q: 'Would you want hooves?', options: ['Useful', 'Cool', 'Way too noisy'], answer: 'Made up for people. Real hooves are keratin, like your fingernails.' },
      show: ['floor', 'pp', 'legs'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 13], look: [0, 4.6, 0], fov: 56, to: { pos: [-1, 1.2, 13], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, .2); pose(w.p, .3); step(w, t, 5, .15); } },
  ],
};
