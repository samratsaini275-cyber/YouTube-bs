// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould.
// A made-up comedy sketch: people cannot live on sunlight. Hook: the premise as a question under 2 s; first frame shows a green person arms-up under a big sun.

function person(k, parent, shirt, skin) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent), skin: mat(skin) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, p.skin, [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, p.skin, [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  for (const x of [-.25, .1, .4]) { const lf = ball(.22, mat('#3FA34D'), [x, .7, -.1], p.head); lf.scale.set(1, .4, .6); lf.rotation.z = x; }
  return p;
}
const arms = (p, up) => p.arms.forEach(a => { a.rotation.set(0, 0, a.userData.s * (up ? 2.6 : .15)); });

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#7FBF5A', 0);
  w.sun = group(); ball(1.6, mat('#FFD23F', { glow: 1 }), [0, 0, 0], w.sun); for (let i = 0; i < 10; i++) { const r = box(.25, 1.2, .05, mat('#FFE07A', { glow: 1 }), [0, 0, 0], w.sun); const a = i / 10 * Math.PI * 2; r.position.set(Math.cos(a) * 2.4, Math.sin(a) * 2.4, 0); r.rotation.z = a - Math.PI / 2; }
  w.sun.traverse(o => o.castShadow = false);
  w.cloud = group(); const cm = mat('#9AA3AD'); for (const [x, y, s] of [[0, 0, 1.6], [1.6, -.2, 1.2], [-1.6, -.2, 1.2], [.8, .7, 1.1], [-.7, .6, 1]]) ball(s, cm, [x, y, 0], w.cloud); w.cloud.traverse(o => o.castShadow = false);
  w.p = person(k, k.scene, '#2F6FD6', '#5FBF5F'); w.pp = w.p.root;
  w.crowd = group(); w.others = []; for (let i = 0; i < 4; i++) { const q = person(k, w.crowd, ['#E2453C', '#FFC21F', '#8E44AD', '#FF7F2A'][i], '#5FBF5F'); q.root.position.set(-6 + i * 4, 0, -3 - (i % 2) * 1.5); w.others.push(q); }
  w.office = group(); box(3, 6, 2, mat('#B8C2CC'), [-8, 3, -6], w.office); box(3, 8, 2, mat('#A3AEB9'), [8, 4, -6], w.office); for (const x of [-8, 8]) for (let y = 1; y < 6; y += 1.5) box(2.2, .7, .05, mat('#BFE3F7', { glow: .3 }), [x, y, -4.95], w.office);
  w.towel = box(1.8, .06, 4.4, mat('#FF5FA2'), [0, .03, 0], k.scene);
  w.plate = group(); cyl(.9, .8, .1, mat('#FFFFFF'), [0, 0, 0], w.plate, 20); for (const x of [-.3, .3]) ball(.25, mat('#C24A2A'), [x, .15, 0], w.plate);
  w.cross = group(); for (const r of [.8, -.8]) { const b = box(2.2, .25, .1, mat('#E2453C', { glow: .6 }), [0, 0, 0], w.cross); b.rotation.z = r; }
  w.stomach = group(); const sm = mat('#FFFFFF', { glow: .8 }); for (let i = 0; i < 3; i++) { const b = box(.1, .5, .05, sm, [i * .25 - .25, 0, 0], w.stomach); b.rotation.z = .4; } w.stomach.traverse(o => o.castShadow = false);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '257',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SUNLIGHT DIET',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'ATE SUNLIGHT?'],
  title: 'What would happen if humans ate sunlight?',
  description: 'Lunch? Just stand outside. Cloudy days make everyone hungry. Everybody turns green. And sunbathing becomes dinner. (A made-up body upgrade: plants do this, people do not.)',
  tags: ['whatif', 'funny', 'sun', 'plants', 'comedy', 'shorts'],
  sources: ['Comedy sketch: people living on sunlight is made up. Plants make food from light by photosynthesis.'],
  setup,
  scenes: [
    { say: 'What if humans ate sunlight?', show: ['ground', 'pp', 'sun'], sky: '#7EC8F2', lightAt: [2, 8, 6], lightDist: 16,
      cam: { pos: [0, 3.4, 9.5], look: [0, 3.9, 0], fov: 50, to: { pos: [0, 3.4, 8.6], look: [0, 3.9, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); arms(w.p, true); w.sun.position.set(3.2, 8.6, -4); w.sun.rotation.z = t * .4; w.p.mouth.scale.set(1.4, 2, 1); } },
    { say: 'Lunch? Just stand outside.', label: 'LUNCH BREAK', show: ['ground', 'pp', 'crowd', 'office', 'sun'], sky: '#7EC8F2', lightAt: [2, 8, 6], lightDist: 20,
      cam: { pos: [0, 4.2, 14], look: [0, 3.6, -1], fov: 54, to: { pos: [0, 4.2, 13], look: [0, 3.6, -1], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 1, 0); arms(w.p, true); w.others.forEach((q, i) => { q.arms.forEach(a => a.rotation.z = a.userData.s * (2.6 + .1 * Math.sin(t * 3 + i))); }); w.sun.position.set(0, 10.5, -8); w.sun.rotation.z = t * .4; } },
    { say: 'Cloudy days? Everyone is starving.', show: ['ground', 'pp', 'crowd', 'cloud', 'stomach'], sky: '#8D97A1', lightAt: [2, 8, 6], lightDist: 20,
      cam: { pos: [0, 4, 12], look: [0, 3.4, -1], fov: 52, to: { pos: [0, 4, 11], look: [0, 3.4, -1], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 1, 0); arms(w.p, false); w.p.head.rotation.x = .35; w.others.forEach(q => { q.arms.forEach(a => a.rotation.z = a.userData.s * .15); q.head.rotation.x = .35; }); w.cloud.position.set(0, 9.4, -4); w.stomach.position.set(1.1, 1.0 + .05 * Math.sin(t * 20), 1.2); w.stomach.scale.setScalar(.9 + .2 * Math.abs(Math.sin(t * 6))); } },
    { say: 'Food? Totally pointless.', show: ['ground', 'pp', 'plate', 'cross', 'sun'], sky: '#7EC8F2', lightAt: [2, 8, 6], lightDist: 16,
      cam: { pos: [1.2, 4, 7.6], look: [.4, 3.4, 0], fov: 46, to: { pos: [1.1, 4, 7], look: [.4, 3.4, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, -.6, 0, .25); arms(w.p, false); w.p.head.rotation.y = .3; w.plate.position.set(1.6, 2.4, 1); w.plate.rotation.x = .5; w.cross.position.set(1.6, 2.6, 1.3); w.cross.visible = p > .35; w.cross.scale.setScalar(Math.min(1, (p - .35) * 6) * .8); w.sun.position.set(-4, 9, -6); w.p.mouth.scale.set(.6, 1, 1); } },
    { say: 'And beach days? Now it is dinner.', label: 'ALL YOU CAN EAT', show: ['ground', 'pp', 'towel', 'sun'], sky: '#FFB45A', lightAt: [2, 8, 6], lightDist: 16,
      cam: { pos: [0, 8.6, 1.6], look: [0, .8, -.9], fov: 50, to: { pos: [0, 8, 1.4], look: [0, .8, -.9], fov: 50 } },
      update: (w, p, t) => { w.pp.position.set(0, .85, 1.6); w.pp.rotation.set(-Math.PI / 2, 0, 0); arms(w.p, true); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1.4, 2, 1); w.towel.position.set(0, .03, -.2); w.sun.position.set(3, 9, -6); w.sun.rotation.z = t * .4; } },
    { say: 'Eating sunlight: useful, awesome, or way too weird? Comment below.',
      quiz: { q: 'Would you want to eat sunlight?', options: ['Useful', 'Awesome', 'Way too weird'], answer: 'People cannot do it. Plants make food from light.' },
      show: ['ground', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); arms(w.p, Math.sin(t * 2.5) > 0); } },
  ],
};
