// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858). Season 7 finale.
// A made-up comedy sketch: people do not have beaver teeth. Hook: the premise as a question under 2 s; first frame shows a person with two huge orange front teeth.

function person(k, parent, shirt, teeth = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.5, .1, .05, mat('#5A2A1A'), [0, -.22, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (teeth) { p.teeth = group([0, -.27, .72], p.head); for (const x of [-.11, .11]) box(.2, .42, .08, mat('#F28C28', { rough: .3 }), [x, -.2, 0], p.teeth); }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const chew = (p, t, on = true) => { p.teeth.position.y = -.27 + (on ? .05 * Math.sin(t * 30) : 0); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .005);
  w.wall = group(); box(40, 20, .5, mat('#E8F0E0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6', true); w.pp = w.p.root;
  w.f = person(k, k.scene, '#E2453C'); w.fr = w.f.root;
  w.cam = group(); box(.8, .55, .3, mat('#222222'), [0, 0, 0], w.cam); cyl(.18, .18, .25, mat('#555555'), [0, 0, .25], w.cam, 14).rotation.x = Math.PI / 2; w.flash = ball(.5, mat('#FFFFFF', { glow: 1 }), [.25, .4, .2], w.cam); w.flash.castShadow = false;
  w.tree = group(); w.trunkTop = group([0, 3.2, 0], w.tree); cyl(.5, .5, 3.2, mat('#7A4E2A'), [0, 1.6, 0], w.tree, 12); cyl(.5, .5, 3, mat('#7A4E2A'), [0, 1.5, 0], w.trunkTop, 12); ball(2.2, mat('#3E8E41'), [0, 4.2, 0], w.trunkTop); w.chips = group(); for (let i = 0; i < 8; i++) { const c = box(.18, .06, .12, mat('#D9B27A'), [0, 0, 0], w.chips); c.userData.i = i; c.castShadow = false; }
  w.pencil = group(); w.pbody = cyl(.12, .12, 2, mat('#FFC21F'), [0, 0, 0], w.pencil, 6); w.pbody.rotation.z = Math.PI / 2; w.ptip = k.cone(.12, .3, mat('#F2C9A0'), [-1.15, 0, 0], w.pencil, 6); w.ptip.rotation.z = Math.PI / 2;
  w.stream = box(30, .06, 3, mat('#4AA3DF', { rough: .2 }), [0, .03, 1]);
  w.dam = group(); for (let i = 0; i < 12; i++) { const l = cyl(.22, .22, 3.2, mat(i % 2 ? '#7A4E2A' : '#8E5F35'), [0, 0, 0], w.dam, 8); l.rotation.x = Math.PI / 2; l.userData.i = i; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '304',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BEAVER TEETH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD BEAVER TEETH?'],
  title: 'What would happen if humans had beaver teeth?',
  description: 'Trees? Timber! Pencils last one second. Your new hobby is building dams. And every photo? Very orange. (A made-up body upgrade. Season 7 finale.)',
  tags: ['whatif', 'funny', 'beaver', 'teeth', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human beaver teeth are made up. Quiz fact: beaver front teeth are orange because their enamel contains iron, which makes it tougher (Gordon et al., Science 2015, Northwestern University).'],
  setup,
  scenes: [
    { say: 'What if humans had beaver teeth?', show: ['floor', 'wall', 'pp'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 8.5], look: [0, 3.7, 0], fov: 50, to: { pos: [0, 3.4, 7.8], look: [0, 3.7, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); chew(w.p, t, t > .6); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Trees? Timber!', label: '*TIMBER*', show: ['ground', 'pp', 'tree', 'chips'], sky: '#9ED2F3', lightAt: [4, 12, 8], lightDist: 30,
      cam: { pos: [5, 4.4, 15], look: [0, 4.6, 0], fov: 56, to: { pos: [4.6, 4.4, 14.3], look: [0, 4.6, 0], fov: 54 } },
      update: (w, p, t) => { w.tree.position.set(0, 0, 0); stand(w, 1.3, .2, -Math.PI / 2); pose(w.p, .4, 1); chew(w.p, t, p < .5); const fall = Math.max(0, (p - .45) * 2.2); w.trunkTop.rotation.z = -Math.min(1.5, fall * fall * 1.6); w.chips.children.forEach(c => { const i = c.userData.i, q = (t * 2 + i / 8) % 1; c.position.set(.7 + q * 1.2, 3.2 + Math.sin(q * Math.PI) * .8, (i % 3 - 1) * .4); c.visible = p < .5; }); } },
    { say: 'Pencils? Gone in a second.', show: ['floor', 'wall', 'pp', 'pencil'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.6, 3.6, 6.5], look: [.4, 3.4, 0], fov: 48, to: { pos: [1.5, 3.6, 6], look: [.4, 3.4, 0], fov: 46 } },
      update: (w, p, t) => { w.pp.position.y = 0; stand(w, 0, 0, 0); w.p.arms[0].rotation.set(0, 0, -.3); w.p.arms[1].rotation.set(-1.3, 0, -.6); const left = Math.max(.02, 1 - p * 1.6); w.pencil.position.set(.25 + left, 3.25, .95); w.pencil.scale.set(left, 1, 1); chew(w.p, t, left > .05); w.p.eyes.forEach(e => e.scale.setScalar(left > .05 ? 1 : 1.4)); } },
    { say: 'New hobby? Building dams.', show: ['ground', 'stream', 'pp', 'dam'], sky: '#9ED2F3', lightAt: [4, 12, 8], lightDist: 30,
      cam: { pos: [3, 5, 12], look: [0, 2, 0], fov: 54, to: { pos: [2.8, 5, 11.3], look: [0, 2, 0], fov: 52 } },
      update: (w, p, t) => { w.p.eyes.forEach(e => e.scale.setScalar(1)); stand(w, 1.7, -1.2, -.6); pose(w.p, .5, .8); chew(w.p, t, false); const n = Math.floor(2 + p * 11); w.dam.children.forEach(l => { const i = l.userData.i; l.position.set(-2.4 + (i % 6) * .45, .22 + Math.floor(i / 6) * .4, 1); l.visible = i < n; }); w.p.mouth.scale.set(1.3, 1.6, 1); } },
    { say: 'And every photo? Very orange.', label: 'SAY CHEESE', show: ['floor', 'wall', 'pp', 'fr', 'cam'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.4, 3.6, 10], look: [0, 3.4, 0], fov: 52, to: { pos: [2.2, 3.6, 9.3], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1.6, 1.4, 1); stand(w, -1.4, 0, .4); pose(w.p, .5); chew(w.p, t, false); w.fr.position.set(2.2, 0, 1.5); w.fr.rotation.set(0, -1.9, 0); w.f.arms.forEach(a => a.rotation.set(-1.5, 0, a.userData.s * -.25)); w.cam.position.set(1.45, 3.5, 1.3); w.cam.rotation.set(0, -1.9, 0); w.flash.visible = p > .55 && p < .7; w.flash.scale.setScalar(p > .55 ? 1 + (p - .55) * 20 : 1); } },
    { say: 'Beaver teeth: useful, awesome, or way too orange? Comment below.',
      quiz: { q: 'Would you want beaver teeth?', options: ['Useful', 'Awesome', 'Way too orange'], answer: 'Made up for people. Real beaver teeth are orange from iron, which toughens them.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 1, 1); stand(w, 0, 0, .2); pose(w.p, .3); chew(w.p, t, true); } },
  ],
};
