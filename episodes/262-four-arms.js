// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people have two arms. Hook: the premise as a question under 2 s; first frame shows a person waving four arms.

function person(k, parent, shirt, n = 4) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = []; for (let r = 0; r < n / 2; r++) for (const s of [-1, 1]) { const a = group([s * .92, 2.4 - r * .75, 0], p.root); cyl(.17, .17, 1.5, mat(shirt), [0, -.75, 0], a, 8); ball(.21, mat('#F2C9A0'), [0, -1.55, 0], a); a.userData.s = s; a.userData.r = r; p.arms.push(a); }
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#C0392B'), [0, .7, -.1], p.head);
  return p;
}
// per-arm angles: f(arm) -> [out, fwd]
const pose = (p, f) => p.arms.forEach((a, i) => { const [o, fw] = f(a, i); a.rotation.set(-fw, 0, a.userData.s * o); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FBF5A', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#E3EEF5'), [0, 10, -4], w.wall);
  w.p = person(k, k.scene, '#FFC21F'); w.pp = w.p.root;
  w.friend = person(k, k.scene, '#3B6FD6', 2); w.fr = w.friend.root;
  w.props = group(); w.phone = box(.4, .7, .06, mat('#222222'), [0, 0, 0], w.props); w.mug = cyl(.2, .18, .4, mat('#FFFFFF'), [0, 0, 0], w.props, 12); w.book = box(.6, .8, .12, mat('#E2453C'), [0, 0, 0], w.props); w.brush = cyl(.04, .04, .7, mat('#8E44AD'), [0, 0, 0], w.props, 6);
  w.sweater = group(); box(2.8, 2.4, .2, mat('#2FA36B'), [0, 0, 0], w.sweater); for (const s of [-1, 1]) { const sl = box(1.4, .4, .2, mat('#2FA36B'), [s * 2, .9, 0], w.sweater); sl.rotation.z = s * -.3; }
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const hm = mat('#FF4F7B', { glow: .8 }); ball(.14, hm, [-.08, 0, 0], h); ball(.14, hm, [.08, 0, 0], h); const c = cone(.19, .25, hm, [0, -.14, 0], h, 10); c.rotation.z = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  w.drums = group(); for (const [x, r] of [[-1.3, .6], [0, .7], [1.3, .6], [-.6, .45], [.7, .45]]) { cyl(r, r, .5, mat('#E2453C'), [x, 2.2 - (r < .5 ? -.4 : 0), .9], w.drums, 20); cyl(r * .98, r * .98, .02, mat('#F5F5F5'), [x, 2.46 - (r < .5 ? -.4 : 0), .9], w.drums, 20); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const handPos = (k, p, i) => { const v = new k.THREE.Vector3(0, -1.55, 0); p.arms[i].updateWorldMatrix(true, false); return v.applyMatrix4(p.arms[i].matrixWorld); };

export default {
  id: '262',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FOUR ARMS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD FOUR ARMS?'],
  title: 'What would happen if humans had four arms?',
  description: 'Mornings get done in one go. Every hug is a double hug. Sweaters need a redesign. And every drummer becomes a legend. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'arms', 'superpower', 'comedy', 'shorts'],
  sources: ['Comedy sketch: four-armed humans are made up.'],
  setup,
  scenes: [
    { say: 'What if humans had four arms?', show: ['floor', 'wall', 'pp'], sky: '#E3EEF5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 9.5], look: [0, 3.95, 0], fov: 52, to: { pos: [0, 3.4, 8.7], look: [0, 3.95, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, (a, i) => [a.userData.r ? 1.1 + .3 * Math.sin(t * 8 + i) : 2.3 + .3 * Math.sin(t * 8 + i), 0]); w.p.mouth.scale.set(1.3, 2.2, 1); } },
    { say: 'Mornings? Done in ten seconds.', label: 'MULTITASKING', show: ['floor', 'wall', 'pp', 'props'], sky: '#E3EEF5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 10], look: [0, 3.1, 0], fov: 54, to: { pos: [0, 3.6, 9.4], look: [0, 3.1, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, (a, i) => [a.userData.r ? .7 : 1.0, .9 + .15 * Math.sin(t * 7 + i * 1.3)]); const H = [0, 1, 2, 3].map(i => handPos(w.k, w.p, i)); w.phone.position.set(H[0].x, H[0].y + .3, H[0].z); w.mug.position.set(H[1].x, H[1].y + .25, H[1].z); w.book.position.set(H[2].x, H[2].y + .3, H[2].z); w.brush.position.set(H[3].x, H[3].y + .3, H[3].z); w.brush.rotation.z = .4 * Math.sin(t * 12); } },
    { say: 'Hugs? Every hug is a double hug.', show: ['floor', 'wall', 'pp', 'fr', 'hearts'], sky: '#E3EEF5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [.4, 3.8, 8.4], look: [0, 3, 0], fov: 50, to: { pos: [.4, 3.8, 7.8], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.85, 0, Math.PI / 2); w.friend.root.position.set(.85, 0, 0); w.friend.root.rotation.set(0, -Math.PI / 2, 0); pose(w.p, (a, i) => [.5, 1.35]); pose(w.friend, () => [.6, 1.2]); w.friend.mouth.scale.set(1, 2.4, 1); w.friend.eyes.forEach(e => e.scale.setScalar(1.4)); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(-.6 + i * .3, 4.2 + q * 2, .3); h.scale.setScalar(1 - q * .5); }); } },
    { say: 'Sweaters? They need a redesign.', show: ['floor', 'wall', 'pp', 'sweater'], sky: '#E3EEF5', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 9.4], look: [0, 3.1, 0], fov: 52, to: { pos: [0, 3.4, 8.8], look: [0, 3.1, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -1.4, 0, .3); pose(w.p, (a, i) => [a.userData.r ? .4 : .2, 0]); w.p.head.rotation.y = .5; w.p.mouth.scale.set(1, .6, 1); w.sweater.position.set(1.8, 3.6 + .08 * Math.sin(t * 2), -1); w.sweater.rotation.y = -.2; } },
    { say: 'And drummers? Total legends.', label: '*BA DUM TSS*', show: ['floor', 'wall', 'pp', 'drums'], sky: '#2B1B4F', lightAt: [0, 6, 5], lightDist: 14, shake: () => .06,
      cam: { pos: [0, 4.6, 9], look: [0, 3, 0], fov: 52, to: { pos: [0, 4.6, 8.4], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, -.6, 0); pose(w.p, (a, i) => [a.userData.r ? .7 : .9, 1.1 + .35 * Math.sin(t * 22 + i * 1.7)]); w.p.head.rotation.x = .15 * Math.sin(t * 11); } },
    { say: 'Four arms: useful, awesome, or way too many? Comment below.',
      quiz: { q: 'Would you want four arms?', options: ['Useful', 'Awesome', 'Way too many'], answer: 'Four-armed humans are made up.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, (a, i) => [Math.sin(t * 2.5 + a.userData.r * 1.5) > 0 ? 2.4 : .3, 0]); } },
  ],
};
