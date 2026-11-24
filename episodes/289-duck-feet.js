// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858).
// A made-up comedy sketch: people do not have webbed feet. Hook: the premise as a question under 2 s; first frame shows a person standing on giant orange duck feet.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.feet = [-1, 1].map(s => { const f = group([s * .45, .15, .2], p.root); const org = mat('#FF9F1C'); cyl(.12, .12, .35, org, [0, .15, 0], f, 8); const web = k.mesh(new k.THREE.CircleGeometry(.9, 3, -Math.PI / 6 - Math.PI / 2, Math.PI / 3 * 2), org, [0, .02, .2], f); web.rotation.x = -Math.PI / 2; web.material.side = k.THREE.DoubleSide; const wb = box(1.4, .06, 1.2, org, [0, .02, .7], f); wb.scale.set(1, 1, 1); for (const x of [-.6, 0, .6]) box(.12, .08, 1.3, mat('#E8890A'), [x, .05, .7], f); return f; });
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const waddle = (p, t) => { p.feet.forEach((f, i) => { f.position.y = .15 + .15 * Math.max(0, Math.sin(t * 8 + i * Math.PI)); f.rotation.x = -.3 * Math.max(0, Math.sin(t * 8 + i * Math.PI)); }); p.root.rotation.z = .08 * Math.sin(t * 8); };

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#E8F0E0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.pool = group(); const wtr = cyl(7, 7, .3, mat('#4AA3DF', { opacity: .85 }), [0, .15, 0], w.pool, 40); wtr.scale.z = .5;
  w.shoes = group(); for (let i = 0; i < 6; i++) { const sh = group([-3 + (i % 3) * 3, 3 + Math.floor(i / 3) * 1.6, -4.4], w.shoes); box(.8, .4, .4, mat(['#E2453C', '#3B6FD6', '#FFC21F', '#8E44AD', '#5FBF5F', '#222222'][i]), [0, 0, 0], sh); } box(9, .1, 1, mat('#8B5A2B'), [0, 2.75, -4.4], w.shoes); box(9, .1, 1, mat('#8B5A2B'), [0, 4.35, -4.4], w.shoes);
  w.slaps = group(); for (let i = 0; i < 4; i++) { const s = box(.6, .08, .08, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.slaps); s.userData.i = i; s.castShadow = false; }
  w.ducks = group(); w.dl = []; for (let i = 0; i < 4; i++) { const d = group([0, 0, 0], w.ducks); const y = mat('#FFD23F'); ball(.45, y, [0, .45, 0], d).scale.set(1.3, .9, 1); ball(.3, y, [.45, .9, 0], d); const bk = box(.25, .08, .18, mat('#FF9F1C'), [.75, .88, 0], d); for (const z of [-1, 1]) ball(.05, mat('#111111'), [.6, 1, z * .14], d); w.dl.push(d); }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '289',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DUCK FEET',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD DUCK FEET?'],
  title: 'What would happen if humans had duck feet?',
  description: 'Swimming? Olympic speed. Shoe shopping becomes impossible. Every step goes slap, slap, slap. And the ducks finally let you lead. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'duck', 'feet', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human duck feet are made up. Quiz fact: ducks\' feet have no nerves or blood vessels that feel cold the way ours do, so they can stand on ice (Cornell Lab of Ornithology).'],
  setup,
  scenes: [
    { say: 'What if humans had duck feet?', show: ['floor', 'wall', 'pp'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3, 10.5], look: [0, 3.6, 0], fov: 54, to: { pos: [0, 3, 9.8], look: [0, 3.6, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .3); waddle(w.p, t); w.p.head.rotation.x = .25; w.p.eyes.forEach(e => e.scale.setScalar(1.3)); } },
    { say: 'Swimming? Olympic speed.', label: 'WORLD RECORD', show: ['ground', 'pool', 'pp'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 6, 13], look: [0, 1.2, 0], fov: 52, to: { pos: [0, 6, 12.3], look: [0, 1.2, 0], fov: 50 } },
      update: (w, p, t) => { w.pp.position.set(-5 + p * 10, .5, 0); w.pp.rotation.set(-Math.PI / 2 + .1, 0, Math.PI / 2); w.p.head.rotation.set(0, 0, 0); w.p.arms.forEach((a, i) => a.rotation.set(Math.sin(t * 14 + i * Math.PI) * 1.5, 0, a.userData.s * .4)); w.p.feet.forEach((f, i) => f.rotation.x = .5 * Math.sin(t * 20 + i * Math.PI)); } },
    { say: 'Shoe shopping? Impossible.', show: ['floor', 'wall', 'pp', 'shoes'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 11], look: [0, 3, -1], fov: 54, to: { pos: [0, 3.6, 10.3], look: [0, 3, -1], fov: 52 } },
      update: (w, p, t) => { w.pp.rotation.set(0, 0, 0); w.p.feet.forEach(f => { f.rotation.x = 0; f.position.y = .15; }); stand(w, 0, 0, 0); pose(w.p, .3); w.p.head.rotation.x = .3; w.p.mouth.scale.set(1, .5, 1); w.p.eyes.forEach(e => e.scale.set(1, .5, 1)); } },
    { say: 'Walking? Slap, slap, slap.', label: '*SLAP*', show: ['floor', 'wall', 'pp', 'slaps'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [4, 2.4, 9], look: [0, 2, 0], fov: 52, to: { pos: [3.6, 2.4, 8.4], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 1.4 - p * 2.8, 0, -Math.PI / 2); pose(w.p, .4); waddle(w.p, t); w.slaps.children.forEach(s => { const i = s.userData.i, q = (t * 2 + i / 4) % 1; s.position.set(w.pp.position.x + (i % 2 ? .6 : -.6) * (1 + q), .3, .6 + q); s.rotation.y = i % 2 ? .6 : -.6; s.visible = q < .5; }); } },
    { say: 'And the ducks? You get to lead the line.', show: ['ground', 'pp', 'ducks'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [2.6, 3.4, 13], look: [1.4, 2, 0], fov: 58, to: { pos: [2.2, 3.4, 12.4], look: [1.1, 2, 0], fov: 56 } },
      update: (w, p, t) => { stand(w, 0 - p * 1.5, 0, -Math.PI / 2); pose(w.p, .4); waddle(w.p, t); w.p.head.rotation.y = 1; w.p.mouth.scale.set(1.3, 1.6, 1); w.dl.forEach((d, i) => { d.position.set(w.pp.position.x + 1.8 + i * 1.3, .05 * Math.abs(Math.sin(t * 8 + i)), 0); d.rotation.set(0, Math.PI, .1 * Math.sin(t * 8 + i)); }); } },
    { say: 'Duck feet: useful, awesome, or way too floppy? Comment below.',
      quiz: { q: 'Would you want duck feet?', options: ['Useful', 'Awesome', 'Way too floppy'], answer: 'Made up for people. Real duck feet can stand on ice without freezing.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); waddle(w.p, t * .6); } },
  ],
};
