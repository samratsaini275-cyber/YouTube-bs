// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized white duck next to a house.

function duck(k, parent, col = '#F7F7F2') {
  const { mat, ball, cyl, box, group } = k;
  const wht = mat(col, { rough: .6 }), org = mat('#FF9F1C');
  const d = { root: group([0, 0, 0], parent) };
  const b = ball(1, wht, [0, 1.3, 0], d.root); b.scale.set(1.4, .9, 1);
  const tail = ball(.4, wht, [-1.3, 1.6, 0], d.root); tail.scale.set(1, .6, .8);
  d.neck = group([.9, 1.7, 0], d.root); cyl(.32, .4, 1, wht, [0, .45, 0], d.neck, 12);
  d.head = group([.1, 1.15, 0], d.neck); ball(.55, wht, [0, 0, 0], d.head);
  for (const z of [-1, 1]) { ball(.12, mat('#FFFFFF'), [.32, .15, z * .3], d.head); ball(.07, mat('#111111'), [.4, .16, z * .32], d.head); }
  d.beakTop = box(.6, .12, .4, org, [.65, -.02, 0], d.head); d.beakBot = box(.5, .08, .34, mat('#E8890A'), [.6, -.14, 0], d.head);
  d.wings = [-1, 1].map(z => { const wg = ball(.7, wht, [-.1, 1.4, z * .75], d.root); wg.scale.set(1.2, .5, .25); return wg; });
  d.feet = [-1, 1].map(z => { const g = group([.1, 0, z * .4], d.root); cyl(.06, .06, .5, org, [0, .25, 0], g, 6); box(.5, .05, .4, org, [.15, .02, 0], g); return g; });
  return d;
}
const quack = (d, t, on = true) => { d.beakBot.position.y = -.14 - (on ? .12 * Math.abs(Math.sin(t * 10)) : 0); };
const waddle = (d, t) => { d.feet.forEach((f, i) => f.position.y = .15 * Math.max(0, Math.sin(t * 8 + i * Math.PI))); d.root.rotation.z = .06 * Math.sin(t * 8); };
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
  w.ground = k.ground('#7FB069', 0);
  w.dk = duck(k, k.scene); w.dr = w.dk.root;
  w.babies = group(); w.bl = []; for (let i = 0; i < 4; i++) { const b = duck(k, w.babies, '#FFE066'); b.root.scale.setScalar(.9); w.bl.push(b); }
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house); w.wins = []; for (const x of [-1.2, 1.2]) w.wins.push(box(.8, .8, .08, mat('#9FD3EE', { glow: .2 }), [x, 2.2, 1.72], w.house));
  w.pool = group(); box(6, .4, .3, mat('#FFFFFF'), [0, .2, 2], w.pool); box(6, .4, .3, mat('#FFFFFF'), [0, .2, -2], w.pool); box(.3, .4, 4, mat('#FFFFFF'), [-3, .2, 0], w.pool); box(.3, .4, 4, mat('#FFFFFF'), [3, .2, 0], w.pool); w.water = box(5.7, .1, 3.7, mat('#4AA3DF', { opacity: .9 }), [0, .3, 0], w.pool);
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.15, mat('#7CC8EE'), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.loaf = group(); const lf = ball(.5, mat('#D9A35C'), [0, 0, 0], w.loaf); lf.scale.set(1.6, .8, .9);
  w.school = group(); box(8, 4, 3, mat('#E8B04A'), [0, 2, 0], w.school); box(8.4, .4, 3.4, mat('#B3262E'), [0, 4.2, 0], w.school); box(1.2, 2, .1, mat('#8B5A2B'), [0, 1, 1.52], w.school);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); };
const dkAt = (w, x, y, z, ry, s) => { w.dr.position.set(x, y, z); w.dr.rotation.set(0, ry, 0); w.dr.scale.setScalar(s); };

export default {
  id: '310',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT DUCKS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DUCKS', 'WERE GIANT?'],
  title: 'What would happen if ducks were giant?',
  description: 'Your pool? Full of duck. One quack shakes the windows. Bread? They want the whole loaf. And the ducklings follow you to school. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'duck', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant ducks are made up. Quiz fact: ducks keep their feathers waterproof by spreading oil from a preen gland near the base of the tail (Encyclopaedia Britannica, "uropygial gland").'],
  setup,
  scenes: [
    { say: 'What if ducks were giant?', show: ['ground', 'dr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 8.2, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 8.2, 0], fov: 52 } },
      update: (w, p, t) => { dkAt(w, -3, 0, -5, -.5, 2.6); quack(w.dk, t, false); w.dk.head.rotation.z = .1 * Math.sin(t * 2); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your pool? Full of duck.', label: '*SPLASH*', show: ['ground', 'dr', 'pool', 'splash'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 15], look: [0, 3, 0], fov: 54, to: { pos: [3, 6, 14], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { const q = Math.min(1, p * 2); dkAt(w, 0, 6 * (1 - q) * (1 - q) - .5 * q, 0, -.3, 2.5); quack(w.dk, t, q >= 1); w.splash.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2, r = q >= 1 ? (p - .5) * 8 : 0; s.position.set(Math.cos(a) * (2.5 + r), .5 + Math.sin(Math.min(1, r / 3) * Math.PI) * 2, Math.sin(a) * (1.8 + r * .6)); s.visible = q >= 1 && r < 3; }); } },
    { say: 'One quack? The windows shake.', label: 'QUACK', show: ['ground', 'dr', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > .5 ? .15 : 0,
      cam: { pos: [4, 4, 18], look: [0, 4, 0], fov: 54, to: { pos: [4, 4, 17], look: [0, 4, 0], fov: 52 } },
      update: (w, p, t) => { dkAt(w, -4.5, 0, -1, .1, 2.4); quack(w.dk, t, t > .5); w.dk.neck.rotation.z = t > .5 ? -.25 : 0; w.house.position.set(3, 0, 0); w.wins.forEach((x, i) => { x.position.z = 1.72 + (t > .5 ? .08 * Math.sin(t * 40 + i) : 0); x.rotation.z = t > .5 ? .1 * Math.sin(t * 35 + i) : 0; }); } },
    { say: 'Bread? They want the whole loaf.', show: ['ground', 'dr', 'pp', 'loaf'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4.4, 15], look: [0, 3.6, 0], fov: 54, to: { pos: [3, 4.4, 14], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { w.dk.neck.rotation.z = 0; dkAt(w, -3, 0, -1, 0, 2.2); stand(w, 2, 1.5, -.9); w.p.arms[1].rotation.set(0, 0, .3); const grab = p > .5; w.p.arms[0].rotation.set(-1.3, 0, -.4); const hand = new w.k.THREE.Vector3(.95, 2.4 - 1.65, 0); w.p.arms[0].updateWorldMatrix(true, false); const hp = new w.k.THREE.Vector3(0, -1.75, 0).applyMatrix4(w.p.arms[0].matrixWorld); if (!grab) w.loaf.position.copy(hp); else { w.dk.head.updateWorldMatrix(true, false); const bp = new w.k.THREE.Vector3(.8, -.1, 0).applyMatrix4(w.dk.head.matrixWorld); w.loaf.position.copy(bp); } w.dk.neck.rotation.z = grab ? .1 : -.35; quack(w.dk, t, !grab); w.p.mouth.scale.set(1.2, grab ? 2 : 1, 1); } },
    { say: 'And the ducklings? They follow you to school.', show: ['ground', 'pp', 'babies', 'school'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 4.4, 17], look: [0, 3, 0], fov: 56, to: { pos: [2.6, 4.4, 16], look: [0, 3, 0], fov: 54 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 1, 1); w.school.position.set(-6, 0, -4); stand(w, 2.4 - p * 3, 1, -Math.PI / 2); pose(w.p, .3); w.pp.rotation.z = .05 * Math.sin(t * 8); w.p.head.rotation.y = .9; w.bl.forEach((b, i) => { b.root.position.set(w.pp.position.x + 2.4 + i * 2.8, 0, 1); b.root.rotation.y = Math.PI; waddle(b, t + i); quack(b, t + i, i % 2 === 0); }); } },
    { say: 'Giant ducks: cute, cool, or way too loud? Comment below.',
      quiz: { q: 'Giant ducks are…', options: ['Cute', 'Cool', 'Way too loud'], answer: 'Made up. Real ducks waterproof their feathers with oil from a gland near the tail.' },
      show: ['ground', 'dr'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [8, 3, 10], look: [0, 3, 0], fov: 52, to: { pos: [10.5, 3, 4], look: [0, 3, 0] } },
      update: (w, p, t) => { dkAt(w, 0, 0, 0, .3, 1.6); quack(w.dk, t, true); w.dk.neck.rotation.z = 0; } },
  ],
};
