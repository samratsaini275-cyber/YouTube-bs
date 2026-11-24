// Narrative 16: "What Would Happen If… (season 6)". Big-animal premise (167 giant cats 284, 147 trunks 855).
// Hook: the premise as a question under 2 s; first frame shows a huge whale flying over a house.

function whale(k, parent) {
  const { mat, ball, cone, box, group } = k;
  const skin = mat('#4A78B8', { rough: .6 }), belly = mat('#DCE8F2');
  const wh = { root: group([0, 0, 0], parent) };
  const b = ball(1, skin, [0, 0, 0], wh.root); b.scale.set(2.6, 1, 1.1);
  const bl = ball(.95, belly, [.2, -.25, 0], wh.root); bl.scale.set(2.3, .7, .95);
  wh.tail = group([-2.5, 0, 0], wh.root); const tc = cone(.5, 1.4, skin, [-.6, 0, 0], wh.tail, 10); tc.rotation.z = Math.PI / 2; const fl = box(.5, .1, 2, skin, [-1.3, 0, 0], wh.tail);
  wh.fins = [-1, 1].map(s => { const f = box(1, .08, .5, skin, [.8, -.4, s * 1.1], wh.root); f.rotation.x = s * .5; return f; });
  for (const s of [-1, 1]) { ball(.12, mat('#FFFFFF'), [1.9, .1, s * .72], wh.root); ball(.07, mat('#111111'), [1.98, .1, s * .76], wh.root); }
  wh.mouth = box(1.6, .04, 1.6, mat('#2A3A5A'), [1.6, -.35, 0], wh.root); wh.mouth.scale.z = .6;
  return wh;
}
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
  w.wh = whale(k, k.scene); w.ww = w.wh.root;
  w.p = person(k, k.scene, '#FFC21F'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const r = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.shadow = cyl(5, 5, .02, mat('#2A3A2A'), [0, .02, 0], k.scene, 32); w.shadow.scale.z = .5; w.shadow.material.transparent = true; w.shadow.material.opacity = .5; w.shadow.castShadow = false;
  w.notes = group(); for (let i = 0; i < 5; i++) { const n = group([0, 0, 0], w.notes); const nm = mat('#FFFFFF', { glow: .8 }); ball(.2, nm, [0, 0, 0], n).scale.set(1.2, .9, .5); box(.06, .8, .06, nm, [.2, .4, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.drops = group(); for (let i = 0; i < 40; i++) { const d = ball(.08, mat('#9FD3EE', { glow: .3 }), [0, 0, 0], w.drops); d.scale.y = 2; d.userData.i = i; d.castShadow = false; }
  w.spout = group(); for (let i = 0; i < 8; i++) { const s = ball(.25, mat('#CFE8F7', { glow: .3 }), [0, 0, 0], w.spout); s.userData.i = i; s.castShadow = false; }
  w.umb = group(); const um = k.mesh(new k.THREE.SphereGeometry(1.3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat('#E2453C'), [0, 0, 0], w.umb); cyl(.05, .05, 1.6, mat('#333333'), [0, -.8, 0], w.umb, 6);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.pp.scale.setScalar(1); };
const swim = (w, t) => { w.wh.tail.rotation.z = .25 * Math.sin(t * 2.5); w.wh.fins.forEach((f, i) => f.rotation.z = .3 * Math.sin(t * 2.5 + i)); };

export default {
  id: '268',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FLYING WHALES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WHALES', 'COULD FLY?'],
  title: 'What would happen if whales could fly?',
  description: 'A sunny day turns dark in a second. Whale songs become your alarm clock. One sneeze and it rains. And the commute? Best ride ever. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'whale', 'flying', 'animals', 'shorts'],
  sources: ['Comedy sketch: flying whales are made up. Quiz fact: the blue whale is the largest animal known to have ever lived (NOAA Fisheries).'],
  setup,
  scenes: [
    { say: 'What if whales could fly?', show: ['ground', 'ww', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 3, 22], look: [0, 7.4, 0], fov: 54, to: { pos: [0, 3, 20.5], look: [0, 7.4, 0], fov: 52 } },
      update: (w, p, t) => { w.ww.scale.setScalar(3.2); w.ww.position.set(4 - t * 1.4, 15.6 + .4 * Math.sin(t * 1.5), -6); w.ww.rotation.set(0, Math.PI, .05 * Math.sin(t)); swim(w, t); w.house.position.set(-3, 0, -3); stand(w, 2, 3, -.2); pose(w.p, .2); w.p.head.rotation.x = -.5; } },
    { say: 'Sunny day? Suddenly, it is not.', show: ['ground', 'ww', 'pp', 'shadow'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4, 14], look: [0, 4.6, 0], fov: 54, to: { pos: [0, 4, 13], look: [0, 4.6, 0], fov: 52 } },
      update: (w, p, t) => { w.ww.scale.setScalar(4); const x = 14 - p * 20; w.ww.position.set(x, 12, -3); w.ww.rotation.set(0, Math.PI, 0); swim(w, t); w.shadow.position.set(x, .02, 0); stand(w, 0, 1, 0); pose(w.p, .2); w.p.head.rotation.x = -.5; w.p.eyes.forEach(e => e.scale.setScalar(Math.abs(x) < 6 ? 1.5 : 1)); } },
    { say: 'Whale songs? Your new alarm clock.', label: '*WOOOOOO*', show: ['ground', 'ww', 'pp', 'notes'], sky: '#FFC27A', lightAt: [4, 14, 10], lightDist: 40, shake: () => .05,
      cam: { pos: [0, 4, 15], look: [0, 6.8, 0], fov: 56, to: { pos: [0, 4, 14], look: [0, 6.8, 0], fov: 54 } },
      update: (w, p, t) => { w.ww.scale.setScalar(3); w.ww.position.set(1, 11, -6); w.ww.rotation.set(0, -Math.PI / 2 + .2, 0); swim(w, t); w.wh.mouth.scale.y = 1 + 4 * Math.abs(Math.sin(t * 3)); stand(w, 0, 2, 0); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.7)); w.p.mouth.scale.set(1, 2.6, 1); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .5 + i / 5) % 1; n.position.set(-3 + i * 1.5, 9 - q * 5, -2 + q * 3); n.rotation.z = Math.sin(t * 4 + i) * .4; }); } },
    { say: 'A whale sneeze? Instant rain.', show: ['ground', 'ww', 'pp', 'drops', 'spout', 'umb'], sky: '#8D97A1', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 4, 15], look: [0, 6.8, 0], fov: 56, to: { pos: [0, 4, 14], look: [0, 6.8, 0], fov: 54 } },
      update: (w, p, t) => { w.ww.scale.setScalar(3); w.ww.position.set(0, 9.6, -6); w.ww.rotation.set(0, -Math.PI / 2, 0); swim(w, t); w.spout.children.forEach(s => { const i = s.userData.i, q = ((t * 1.2 + i / 8) % 1); s.position.set(Math.sin(i) * q * 1.5, 12.6 + q * 3, -6 + Math.cos(i) * q * 1.5); s.visible = p > .3; }); w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 1.1 + i / 40) % 1; d.position.set(-6 + (i * 2.9) % 12, 12 - q * 12, -3 + (i % 6)); d.visible = p > .4; }); stand(w, 0, 2, 0); pose(w.p, .2); w.p.arms[1].rotation.set(-.4, 0, 1.8); w.umb.position.set(0, 5.4, 2); w.umb.visible = p > .5; } },
    { say: 'And your commute? Best ride ever.', show: ['ground', 'ww', 'pp', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 13, 12.5], look: [0, 11, 0], fov: 54, to: { pos: [0, 13, 11.5], look: [0, 11, 0], fov: 52 } },
      update: (w, p, t) => { w.ww.scale.setScalar(3); const y = 9 + .5 * Math.sin(t * 1.5); w.ww.position.set(0, y, 0); w.ww.rotation.set(0, -.3, .05 * Math.sin(t * 1.5)); swim(w, t); w.house.position.set(-6, 0, -8); w.pp.scale.setScalar(.6); w.pp.position.set(.6, y + 2.8, 0); w.pp.rotation.set(0, -.3, 0); w.p.head.rotation.set(0, 0, 0); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.6)); w.p.mouth.scale.set(1.3, 2.2, 1); } },
    { say: 'Flying whales: amazing, terrifying, or way too wet? Comment below.',
      quiz: { q: 'Would you want flying whales?', options: ['Amazing', 'Terrifying', 'Way too wet'], answer: 'Made up. Blue whales are the biggest animals ever known.' },
      show: ['ground', 'ww'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 12], look: [0, 5.6, 0], fov: 50, to: { pos: [-1, 1, 12], look: [0, 5.6, 0] } },
      update: (w, p, t) => { w.ww.scale.setScalar(1.6); w.ww.position.set(0, 2.6 + .3 * Math.sin(t * 1.5), 0); w.ww.rotation.set(0, -Math.PI / 2 + .5, 0); swim(w, t); } },
  ],
};
