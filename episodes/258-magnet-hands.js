// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people do not have magnet hands. Hook: the premise as a question under 2 s; first frame shows forks and spoons flying to a person's hands.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.26, mat('#AEB8C2', { metal: .3, rough: .3 }), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
// arms: angle per side (rad, outward positive), forward tilt
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const handPos = (k, p, s) => { const v = new k.THREE.Vector3(0, -1.65, 0); p.arms[s].updateWorldMatrix(true, false); return v.applyMatrix4(p.arms[s].matrixWorld); };

function setup(k) {
  const { mat, box, cyl, ball, torus, group } = k;
  const w = { k };
  w.ground = k.ground('#7FBF5A', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#F3E6CF'), [0, 10, -4], w.wall);
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  const steel = mat('#D5DCE3', { metal: .3, rough: .25 });
  w.cutlery = group(); for (let i = 0; i < 10; i++) { const c = group([0, 0, 0], w.cutlery); box(.08, .9, .03, steel, [0, 0, 0], c); if (i % 2) ball(.14, steel, [0, .5, 0], c).scale.set(1, 1.3, .3); else for (const x of [-.06, 0, .06]) box(.025, .3, .03, steel, [x, .55, 0], c); c.userData.i = i; }
  w.keys = group(); torus(.25, .06, steel, [0, .3, 0], w.keys).rotation.x = 0; box(.1, .7, .04, steel, [0, -.15, 0], w.keys); box(.18, .08, .04, steel, [.1, -.4, 0], w.keys); w.keys.children[0].rotation.set(0, 0, 0);
  w.sofa = group(); box(4, 1, 1.8, mat('#6C4BB4'), [0, .5, 0], w.sofa); box(4, 1.4, .4, mat('#5A3C9C'), [0, 1.4, -.7], w.sofa);
  w.fridge = group(); box(2.2, 4.6, 1.6, mat('#E8EEF2', { metal: .4, rough: .3 }), [0, 2.3, 0], w.fridge); box(.1, 1.2, .1, mat('#888888'), [-.8, 3, .85], w.fridge); box(2.1, .04, .02, mat('#9AA4AE'), [0, 3.4, .81], w.fridge);
  w.carts = group(); for (let i = 0; i < 3; i++) { const c = group([0, 0, 0], w.carts); const m = mat('#C2CBD4', { metal: .1, rough: .4 }); box(1.4, .9, 1, m, [0, 1.1, 0], c).material.transparent = false; box(.08, .9, .08, m, [-.7, 1.6, .5], c); for (const [x, z] of [[-.55, -.4], [.55, -.4], [-.55, .4], [.55, .4]]) ball(.15, mat('#222222'), [x, .15, z], c); c.userData.i = i; }
  w.detector = group(); const dm = mat('#5B6670'); box(.4, 4.6, .6, dm, [-1.6, 2.3, 0], w.detector); box(.4, 4.6, .6, dm, [1.6, 2.3, 0], w.detector); box(3.6, .4, .6, dm, [0, 4.8, 0], w.detector); w.lamp = ball(.3, mat('#FF2A2A', { glow: 1 }), [0, 5.2, 0], w.detector);
  w.guard = person(k, k.scene, '#20324F'); w.gg = w.guard.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.rotation.order = 'XYZ'; w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const lerp = (a, b, q) => a + (b - a) * q;

export default {
  id: '258',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE MAGNET HANDS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD MAGNET HANDS?'],
  title: 'What would happen if humans had magnet hands?',
  description: 'Lost keys come flying back. The fridge will not let you go. Shopping carts follow you home. And airports are a nightmare. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'magnet', 'superpower', 'comedy', 'shorts'],
  sources: ['Comedy sketch: magnet hands are made up.'],
  setup,
  scenes: [
    { say: 'What if humans had magnet hands?', show: ['floor', 'wall', 'pp', 'cutlery'], sky: '#F3E6CF', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 10], look: [0, 3.6, 0], fov: 56, to: { pos: [0, 3.4, 9.2], look: [0, 3.6, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .6, 1.1); w.p.mouth.scale.set(1.3, 2.2, 1); const L = handPos(w.k, w.p, 0), R = handPos(w.k, w.p, 1);
        w.cutlery.children.forEach(c => { const i = c.userData.i, h = i % 2 ? R : L, q = Math.min(1, ((t * .9 + i * .13) % 1.4)); const sx = (i % 2 ? 1 : -1) * (2.6 + (i % 3) * .5), sy = 1 + (i % 4) * 1.4; c.position.set(lerp(sx, h.x + (i % 2 ? .25 : -.25), q), lerp(sy, h.y + ((i >> 1) % 3 - 1) * .25, q), lerp(1, h.z + .2, q)); c.rotation.z = (1 - q) * (3 + i) + (i % 2 ? -1.2 : 1.2); }); } },
    { say: 'Lost your keys? They find you.', show: ['floor', 'wall', 'pp', 'sofa', 'keys'], sky: '#F3E6CF', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.4, 3.8, 10.5], look: [0, 3, 0], fov: 52, to: { pos: [.4, 3.8, 9.8], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -1.4, .5, .3); pose(w.p, 1.3, .4); w.sofa.position.set(2.6, 0, -1.4); const R = handPos(w.k, w.p, 1); const q = Math.min(1, Math.max(0, (p - .2) * 2.2)); w.keys.position.set(lerp(3.4, R.x + .2, q), lerp(1.2, R.y, q) + Math.sin(q * Math.PI) * 1.2, lerp(-1, R.z + .2, q)); w.keys.rotation.z = q * 9; w.p.eyes.forEach(e => e.scale.setScalar(1 + q * .5)); } },
    { say: 'The fridge? It will not let go.', show: ['floor', 'wall', 'pp', 'fridge'], sky: '#F3E6CF', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.2, 4, 10.4], look: [.2, 3, 0], fov: 50, to: { pos: [.2, 4, 9.8], look: [.2, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.fridge.position.set(-1.25, 0, 0); w.fridge.rotation.y = Math.PI / 2; w.pp.position.set(.7, 0, 0); w.pp.rotation.order = 'YXZ'; w.pp.rotation.set(-.3 - .06 * Math.sin(t * 9), -Math.PI / 2, 0); pose(w.p, .15, 1.75); w.p.head.rotation.set(0, 1.3, 0); w.p.mouth.scale.set(1.2, 2.4, 1); } },
    { say: 'Shopping carts? They follow you home.', show: ['ground', 'pp', 'carts'], sky: '#7EC8F2', lightAt: [2, 8, 6], lightDist: 20,
      cam: { pos: [2.5, 4.4, 12], look: [1.6, 2.4, 0], fov: 52, to: { pos: [1.5, 4.4, 11.4], look: [.6, 2.4, 0], fov: 50 } },
      update: (w, p, t) => { const x = 2 - p * 3; stand(w, x, 0, -Math.PI / 2); pose(w.p, .25); w.p.head.rotation.y = 1.2; w.carts.children.forEach(c => { const i = c.userData.i; c.position.set(x + 2.2 + i * 1.8, .02 * Math.abs(Math.sin(t * 16 + i)), (i - 1) * .7); c.rotation.y = Math.PI / 2 + .1 * Math.sin(t * 4 + i); }); } },
    { say: 'And airports? Beep. Beep. Beep.', label: 'BEEP BEEP BEEP', show: ['floor', 'wall', 'pp', 'detector', 'gg'], sky: '#DDE3EA', lightAt: [0, 6, 5], lightDist: 14, shake: () => .1,
      cam: { pos: [3.4, 3.8, 9.5], look: [0, 3.4, 0], fov: 50, to: { pos: [3, 3.8, 8.8], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { w.detector.position.set(0, 0, -.2); stand(w, 0, -.2, 0); pose(w.p, 2.6); w.p.mouth.scale.set(.6, 1, 1); w.lamp.visible = Math.sin(t * 18) > 0; w.gg.position.set(3, 0, -1.6); w.gg.rotation.y = -.7; pose(w.guard, .4, 1.4); } },
    { say: 'Magnet hands: useful, awesome, or a total mess? Comment below.',
      quiz: { q: 'Would you want magnet hands?', options: ['Useful', 'Awesome', 'Total mess'], answer: 'Magnet hands are made up.' },
      show: ['floor', 'pp', 'cutlery'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, Math.sin(t * 2.5) > 0 ? 2.6 : .2); w.cutlery.children.forEach(c => c.position.set(0, -10, 0)); } },
  ],
};
