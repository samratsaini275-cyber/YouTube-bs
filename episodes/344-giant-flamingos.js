// Narrative 19: "What Would Happen If… (season 9)". Big-animal premise (167 giant cats 524 and still growing). Season finale.
// Hook: the premise as a question under 2 s; first frame shows a flamingo standing on one leg, taller than a house.

function flamingo(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const pink = mat('#F28AB0', { rough: .6 }), leg = mat('#E86A90');
  const f = { root: group([0, 0, 0], parent) };
  f.body = group([0, 5, 0], f.root);
  const b = ball(1, pink, [0, 0, 0], f.body); b.scale.set(1.4, .9, .9); const tail = ball(.5, mat('#E06A90'), [-1.3, .2, 0], f.body); tail.scale.set(1.2, .5, .6);
  f.neck = []; for (let i = 0; i < 6; i++) { const n = ball(.22, pink, [0, 0, 0], f.body); f.neck.push(n); }
  f.head = group([0, 0, 0], f.body); ball(.35, pink, [0, 0, 0], f.head); const bk = cone(.16, .6, mat('#1E1E22'), [.45, -.15, 0], f.head, 8); bk.rotation.z = -Math.PI / 2 - .6; const bkw = cone(.17, .25, mat('#FFFFFF'), [.25, -.05, 0], f.head, 8); bkw.rotation.z = -Math.PI / 2 - .6;
  for (const z of [-1, 1]) { ball(.07, mat('#F2C94C'), [.15, .12, z * .25], f.head); ball(.035, mat('#111111'), [.18, .12, z * .3], f.head); }
  f.wings = [-1, 1].map(z => { const w = group([0, .2, z * .8], f.body); const m = ball(.6, mat('#E86A90'), [-.2, 0, 0], w); m.scale.set(1.3, .5, .25); w.userData.z = z; return w; });
  f.legA = group([0, 4.2, .2], f.root); cyl(.07, .07, 4.2, leg, [0, -2.1, 0], f.legA, 6); const fa = ball(.3, leg, [.25, -4.2, 0], f.legA); fa.scale.set(1.6, .3, 1);
  f.legB = group([0, 4.2, -.2], f.root); const thigh = cyl(.07, .07, 2, leg, [0, -1, 0], f.legB, 6); const shin = cyl(.07, .07, 2, leg, [-.8, -1.4, 0], f.legB, 6); shin.rotation.z = 1.2;
  return f;
}
const neckPose = (f, bend = 0) => { const pts = []; for (let i = 0; i < 6; i++) { const q = i / 5; pts.push([.9 + Math.sin(q * Math.PI) * .6 * (1 - bend) + q * .6, .4 + q * 2.4 * (1 - bend * .9) - bend * q * 1.5, 0]); } f.neck.forEach((n, i) => n.position.set(...pts[i])); const e = pts[5]; f.head.position.set(e[0] + .2, e[1] + .25, 0); };
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
  w.fl = flamingo(k, k.scene); w.fr = w.fl.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.lake = box(30, .2, 14, mat('#3E8FCF', { glow: .1 }), [0, .1, -2]);
  w.crowd = group(); for (let i = 0; i < 4; i++) { const c = person(k, w.crowd, ['#E2453C', '#3FA34D', '#F2B21F', '#9B59B6'][i]); c.root.position.set(-4.5 + i * 3, 0, 4); c.root.rotation.y = Math.PI + (i - 1.5) * .2; c.root.scale.setScalar(.8); c.root.userData.p = c; }
  w.shrimp = group(); for (let i = 0; i < 6; i++) { const s = ball(.25, mat('#F28A5A'), [0, 0, 0], w.shrimp); s.scale.set(1.6, .6, .6); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const flAt = (w, x, y, z, ry, s) => { w.fr.position.set(x, y, z); w.fr.rotation.set(0, ry, 0); w.fr.scale.setScalar(s); w.fl.body.rotation.set(0, 0, 0); w.fl.wings.forEach(wg => wg.rotation.x = 0); neckPose(w.fl, 0); w.fl.legB.rotation.set(0, 0, 0); };

export default {
  id: '344',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT FLAMINGOS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF FLAMINGOS', 'WERE GIANT?'],
  title: 'What would happen if flamingos were giant? (season finale)',
  description: 'Standing on one leg? Taller than your house. Snack time empties the lake. And their dance? The whole town joins in. (A made-up comedy sketch. Season finale.)',
  tags: ['whatif', 'funny', 'flamingo', 'giant', 'animals', 'shorts'],
  sources: ['Comedy sketch: giant flamingos are made up. Quiz fact: flamingos are pink because of pigments called carotenoids in the shrimp and algae they eat (Encyclopaedia Britannica, "flamingo").'],
  setup,
  scenes: [
    { say: 'What if flamingos were giant?', show: ['ground', 'fr', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 26], look: [0, 12.2, 0], fov: 56, to: { pos: [1, 4, 24.5], look: [0, 12.2, 0], fov: 54 } },
      update: (w, p, t) => { flAt(w, -3, 0, -4, -.6, 1.6); w.fl.head.rotation.z = .1 * Math.sin(t * 3); w.house.position.set(3.4, 0, -1); stand(w, 1.4, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.head.rotation.y = -.6; } },
    { say: 'Standing on one leg? Taller than your house.', show: ['ground', 'fr', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [6, 3, 22], look: [0, 6, 0], fov: 60, to: { pos: [5.6, 3, 21], look: [0, 6, 0], fov: 58 } },
      update: (w, p, t) => { flAt(w, -1.4, 0, 0, -.3, 1.6); w.house.position.set(2.4, 0, -1); w.fr.rotation.z = .02 * Math.sin(t * 2); } },
    { say: 'Snack time? The whole lake gets slurped.', label: 'SLURP', show: ['ground', 'fr', 'lake', 'shrimp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 22], look: [0, 4.6, 0], fov: 56, to: { pos: [3, 6, 21], look: [0, 4.6, 0], fov: 54 } },
      update: (w, p, t) => { flAt(w, -2, 0, 0, 0, 1.6); neckPose(w.fl, .9 + .1 * Math.sin(t * 8)); w.fl.head.rotation.z = Math.PI * .7; w.lake.position.y = .1 - Math.min(1, p * 1.2) * .25; w.lake.scale.set(1 - Math.min(.6, p * .6), 1, 1); w.fr.updateWorldMatrix(true, true); const h = w.fl.head.getWorldPosition(new w.k.THREE.Vector3()); w.shrimp.children.forEach(s => { const i = s.userData.i, q = (t * 1.2 + i / 6) % 1; s.position.set(h.x + 3 - q * 3, .3 + q * (h.y - .3), (i % 3 - 1) * .6 * (1 - q)); }); } },
    { say: 'And their dance? The whole town joins in.', label: 'STOMP STOMP', show: ['ground', 'fr', 'crowd', 'house'], sky: '#FF9AC0', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => Math.sin(t * 6) > .8 ? .15 : 0,
      cam: { pos: [0, 6, 26], look: [0, 6, 0], fov: 58, to: { pos: [0, 6, 25], look: [0, 6, 0], fov: 56 } },
      update: (w, p, t) => { w.lake.scale.set(1, 1, 1); flAt(w, 0, .3 * Math.abs(Math.sin(t * 6)), -3, -1.2 + .5 * Math.sin(t * 3), 1.5); w.fl.wings.forEach(wg => wg.rotation.x = -wg.userData.z * (.3 + .8 * Math.abs(Math.sin(t * 6)))); w.fl.legB.rotation.z = .5 * Math.sin(t * 6); w.house.position.set(7, 0, -5); w.crowd.children.forEach((c, i) => { c.position.y = .4 * Math.abs(Math.sin(t * 6 + i)); c.userData.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * (1.6 + .8 * Math.sin(t * 6 + i)))); }); } },
    { say: 'Giant flamingos: pretty, cool, or way too pink? Comment below.',
      quiz: { q: 'Giant flamingos are…', options: ['Pretty', 'Cool', 'Way too pink'], answer: 'Made up. Real flamingos turn pink from pigments in the food they eat.' },
      show: ['ground', 'fr'], sky: '#274B73', lightAt: [0, 10, 8], lightDist: 22,
      cam: { pos: [12, 5, 12], look: [0, 6, 0], fov: 56, to: { pos: [15, 5, 4], look: [0, 6, 0] } },
      update: (w, p, t) => { flAt(w, 0, 0, 0, -.8, 1.3); w.fl.head.rotation.z = .1 * Math.sin(t * 3); } },
  ],
};
