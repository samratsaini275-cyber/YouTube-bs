// Narrative 15: "What Would Happen If… (season 5)". Body-upgrade premise in the 147 (trunks) mould. Season finale.
// A made-up comedy sketch: people do not glow. Hook: the premise as a question under 2 s; first frame shows a glowing person in a dark room.

function person(k, parent, shirt, glow) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  const skin = mat(glow, { glow: 1 }); p.skin = skin;
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, skin, [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, skin, [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#3A1A10'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#2A1A10'), [0, .7, -.1], p.head);
  p.light = new k.THREE.PointLight(glow, 6, 9, 1.5); p.light.position.set(0, 3, 1.2); p.root.add(p.light);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const dim = (k, on) => k.scene.children.forEach(o => { if (o.isHemisphereLight) o.intensity = on ? .12 : 1.5; if (o.isDirectionalLight) o.intensity = on ? .15 : 2.3; });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#4A4F6A', 0);
  w.ground = k.ground('#2E4A2E', .005);
  w.wall = group(); box(40, 20, .5, mat('#5A6080'), [0, 10, -4], w.wall);
  w.p = person(k, k.scene, '#3B6FD6', '#7CFFB0'); w.pp = w.p.root;
  w.bed = group(); box(4, .8, 6, mat('#6B4B2E'), [0, .4, 0], w.bed); box(3.8, .4, 5.8, mat('#DDDDDD'), [0, 1, 0], w.bed);
  w.blanket = box(3.9, .5, 3.6, mat('#7A3FBF'), [0, 0, 0], k.scene);
  w.friends = group(); w.fr = []; for (let i = 0; i < 2; i++) { const q = person(k, w.friends, ['#E2453C', '#FFC21F'][i], ['#FFB07C', '#7CC8FF'][i]); q.root.position.set(i ? 2.6 : -2.6, 0, -.8); q.root.rotation.y = i ? -.4 : .4; w.fr.push(q); }
  w.bush = group(); for (const [x, y, s] of [[0, .8, 1.1], [.9, .6, .8], [-.9, .6, .8], [0, 1.6, .7]]) ball(s, mat('#2F6B2F'), [x, y, 0], w.bush);
  w.cake = group(); cyl(1, 1, .8, mat('#F2C9A0'), [0, .4, 0], w.cake, 24); cyl(1.02, 1.02, .2, mat('#FF7FA0'), [0, .85, 0], w.cake, 24); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cyl(.05, .05, .4, mat('#FFFFFF'), [Math.cos(a) * .6, 1.15, Math.sin(a) * .6], w.cake, 6); }
  w.table = group(); box(3, .2, 2, mat('#6B4B2E'), [0, 2, 0], w.table); for (const [x, z] of [[-1.3, -.8], [1.3, -.8], [-1.3, .8], [1.3, .8]]) box(.15, 2, .15, mat('#5A3C22'), [x, 1, z], w.table);
  w.moths = group(); for (let i = 0; i < 9; i++) { const m = group([0, 0, 0], w.moths); const wm = mat('#F0E6C8', { glow: .35 }); m.scale.setScalar(1.7); for (const s of [-1, 1]) { const wg = box(.35, .02, .25, wm, [s * .18, 0, 0], m); wg.userData.s = s; } ball(.06, mat('#5A4A3A'), [0, 0, 0], m); m.userData.i = i; m.traverse(o => o.castShadow = false); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '264',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GLOWING HUMANS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'GLOWED IN THE DARK?'],
  title: 'What would happen if humans glowed in the dark?',
  description: 'No more night lights. Sleepovers turn into a disco. Hide and seek is impossible. And moths become your biggest fans. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'glow', 'night', 'comedy', 'shorts'],
  sources: ['Comedy sketch: glowing humans are made up. Quiz fact: fireflies make light with a chemical reaction called bioluminescence.'],
  setup,
  scenes: [
    { say: 'What if humans glowed in the dark?', show: ['floor', 'wall', 'pp'], sky: '#0E1226', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 9], look: [0, 3.95, 0], fov: 50, to: { pos: [0, 3.4, 8.2], look: [0, 3.95, 0], fov: 48 } },
      update: (w, p, t) => { dim(w.k, true); stand(w, 0, 0, 0); pose(w.p, .25); w.p.light.intensity = 6 + 1.5 * Math.sin(t * 4); } },
    { say: 'Night lights? You are the night light.', show: ['floor', 'wall', 'pp', 'bed', 'blanket'], sky: '#0E1226', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.6, 8.4, 8], look: [0, 1.5, -.4], fov: 52, to: { pos: [2.4, 8, 7.4], look: [0, 1.5, -.4], fov: 48 } },
      update: (w, p, t) => { dim(w.k, true); w.bed.position.set(0, 0, 0); w.pp.position.set(0, 1.2, 1.5); w.pp.rotation.set(-Math.PI / 2, 0, 0); w.p.head.rotation.set(0, 0, 0); pose(w.p, .1); w.blanket.position.set(0, 1.9, .9); w.p.eyes.forEach(e => e.visible = Math.sin(t * 2) > -.6); } },
    { say: 'Sleepovers? Instant disco.', label: '*DISCO*', show: ['floor', 'wall', 'pp', 'friends'], sky: '#0E1226', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.8, 10.5], look: [0, 3, 0], fov: 54, to: { pos: [0, 3.8, 9.8], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { dim(w.k, true); w.p.eyes.forEach(e => e.visible = true); stand(w, 0, 0, 0); pose(w.p, 2.4 + .3 * Math.sin(t * 9)); w.pp.position.y = .2 * Math.abs(Math.sin(t * 4.5)); w.fr.forEach((q, i) => { pose(q, 2.2 + .3 * Math.sin(t * 9 + i * 2)); q.root.position.y = .2 * Math.abs(Math.sin(t * 4.5 + i + 1)); q.light.intensity = 6 + 4 * Math.sin(t * 6 + i * 2); }); w.p.light.intensity = 6 + 4 * Math.sin(t * 6); } },
    { say: 'Hide and seek? Found you.', show: ['ground', 'pp', 'bush'], sky: '#0A1420', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4.6, 9.5], look: [0, 2.6, -.6], fov: 50, to: { pos: [0, 4.6, 8.9], look: [0, 2.6, -.6], fov: 48 } },
      update: (w, p, t) => { dim(w.k, true); w.bush.position.set(0, 0, 0); w.bush.scale.setScalar(1.4); stand(w, 0, -1.2, 0); pose(w.p, .1); w.p.light.position.set(0, 2.2, 2.2); w.p.light.intensity = 9; w.p.eyes.forEach(e => e.scale.setScalar(p > .55 ? 1.5 : 1)); w.pp.position.y = p > .5 ? -.25 : -1.3; } },
    { say: 'And moths? Your biggest fans.', show: ['ground', 'pp', 'moths'], sky: '#0A1420', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 9], look: [0, 3.6, 0], fov: 50, to: { pos: [0, 3.6, 8.3], look: [0, 3.6, 0], fov: 48 } },
      update: (w, p, t) => { dim(w.k, true); w.p.light.position.set(0, 3, 1.2); w.p.light.intensity = 7; stand(w, 0, 0, 0); pose(w.p, .5 + .4 * Math.sin(t * 10), .3); w.p.head.rotation.y = .3 * Math.sin(t * 5); w.moths.children.forEach(m => { const i = m.userData.i, a = t * (2 + i * .2) + i; m.position.set(Math.cos(a) * (1.3 + (i % 3) * .3), 3.3 + Math.sin(a * 1.7) * .9, .6 + Math.sin(a) * (1.3 + (i % 3) * .3)); m.children.forEach(c => { if (c.userData.s) c.rotation.z = c.userData.s * .9 * Math.sin(t * 40 + i); }); }); } },
    { say: 'Glowing in the dark: useful, awesome, or way too bright? Comment below.',
      quiz: { q: 'Would you want to glow?', options: ['Useful', 'Awesome', 'Way too bright'], answer: 'Humans do not glow. Fireflies make light with bioluminescence.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { dim(w.k, false); stand(w, 0, 0, .2); pose(w.p, Math.sin(t * 2.5) > 0 ? 2.6 : .2); } },
  ],
};
