// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858).
// A made-up comedy sketch: people do not have horns. Hook: the premise as a question under 2 s; first frame shows a person with a sparkly spiral horn on their forehead.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box, cone } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.15], p.head);
  p.horn = group([0, .55, .45], p.head); p.horn.rotation.x = .5; const hn = cone(.18, 1.3, mat('#FFE8F4', { glow: .3 }), [0, .65, 0], p.horn, 16); for (let i = 0; i < 5; i++) { const r = k.torus(.15 - i * .025, .025, mat('#FFC2E2'), [0, .15 + i * .22, 0], p.horn); r.rotation.x = Math.PI / 2 + .2; }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#F3E8F7'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#8E44AD'); w.pp = w.p.root;
  w.sparkles = group(); for (let i = 0; i < 10; i++) { const s = ball(.06, mat('#FFE07A', { glow: 1 }), [0, 0, 0], w.sparkles); s.userData.i = i; s.castShadow = false; }
  w.jar = group(); cyl(.35, .35, .7, mat('#E8A33A', { opacity: .85 }), [0, .35, 0], w.jar, 16); w.lid = cyl(.38, .38, .15, mat('#E2453C'), [0, .78, 0], w.jar, 16);
  w.toast = group(); for (let i = 0; i < 3; i++) { const tt = box(.7, .7, .1, mat('#D9A35B'), [0, 0, 0], w.toast); tt.userData.i = i; }
  w.hat = group(); cyl(.9, .9, .06, mat('#3B6FD6'), [0, 0, 0], w.hat, 20); cyl(.6, .65, .6, mat('#3B6FD6'), [0, .3, 0], w.hat, 20);
  w.rainbow = group(); ['#E2453C', '#FF7F2A', '#FFC21F', '#5FBF5F', '#3B6FD6', '#8E44AD'].forEach((c, i) => { const r = k.mesh(new k.THREE.TorusGeometry(3 - i * .25, .12, 8, 40, Math.PI), mat(c, { glow: .5 }), [0, 0, 0], w.rainbow); });
  w.pony = group(); const pm = mat('#FFFFFF'); const pb = ball(1, pm, [0, 2, 0], w.pony); pb.scale.set(1.5, .8, .8); for (const [x, z] of [[-1, -.4], [-1, .4], [1, -.4], [1, .4]]) cyl(.15, .12, 1.6, pm, [x, .8, z], w.pony, 8); const nk = cyl(.3, .3, 1.4, pm, [1.4, 2.8, 0], w.pony, 8); nk.rotation.z = -.5; w.ponyHead = group([1.9, 3.4, 0], w.pony); ball(.45, pm, [0, 0, 0], w.ponyHead).scale.set(1.4, 1, .9); for (const z of [-1, 1]) ball(.08, mat('#111111'), [.35, .12, z * .26], w.ponyHead); const ph = cone(.12, .8, mat('#FFE8F4', { glow: .3 }), [.2, .55, 0], w.ponyHead, 12); ph.rotation.z = -.4; for (let i = 0; i < 4; i++) ball(.25, mat(['#FF5FA2', '#8E44AD', '#3B6FD6', '#5FBF5F'][i]), [1.1 - i * .3, 3.2 - i * .1, -.2], w.pony);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const sparkle = (w, t) => { const v = new w.k.THREE.Vector3(0, 1.3, 0); w.p.horn.updateWorldMatrix(true, false); v.applyMatrix4(w.p.horn.matrixWorld); w.sparkles.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2 + t * 3; s.position.set(v.x + Math.cos(a) * .4, v.y + Math.sin(a * 2) * .25, v.z + Math.sin(a) * .4); }); };

export default {
  id: '292',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE UNICORN HORNS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD UNICORN HORNS?'],
  title: 'What would happen if humans had unicorn horns?',
  description: 'Stuck jar lids? Never again. Breakfast toast on a stick. Hats need a hole. And unicorns finally say hi. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'unicorn', 'horn', 'comedy', 'shorts'],
  sources: ['Comedy sketch: unicorn horns are made up. Quiz fact: the narwhal\'s "horn" is actually a long tooth that can grow up to about 3 metres (NOAA Fisheries).'],
  setup,
  scenes: [
    { say: 'What if humans had unicorn horns?', show: ['floor', 'wall', 'pp', 'sparkles'], sky: '#F3E8F7', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 3.6, 9], look: [0, 3.95, 0], fov: 50, to: { pos: [1.3, 3.6, 8.2], look: [0, 3.95, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, .25); pose(w.p, .2); w.p.head.rotation.z = .06 * Math.sin(t * 3); sparkle(w, t); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Stuck jar lids? Not anymore.', show: ['floor', 'wall', 'pp', 'jar'], sky: '#F3E8F7', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [3, 4, 8], look: [.6, 3.4, 0], fov: 50, to: { pos: [2.8, 4, 7.4], look: [.6, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.4, 0, .6); w.p.head.rotation.x = .35; w.p.arms[1].rotation.set(-1.2, 0, .2); w.p.arms[0].rotation.set(0, 0, -.2); w.jar.position.set(.45, 2.15, 1.35); const open = p > .5; w.lid.position.y = .78 + (open ? Math.min(1, (p - .5) * 4) * 1.2 : 0); w.lid.rotation.y = t * (open ? 10 : 2); } },
    { say: 'Breakfast? Toast on a stick.', show: ['floor', 'wall', 'pp', 'toast'], sky: '#F3E8F7', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.6, 4.4, 7.6], look: [.2, 4, 0], fov: 48, to: { pos: [2.4, 4.4, 7], look: [.2, 4, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, .3); pose(w.p, .2); const v = new w.k.THREE.Vector3(0, 0, 0); w.toast.children.forEach(tt => { const i = tt.userData.i; const q = new w.k.THREE.Vector3(0, .4 + i * .3, 0); w.p.horn.updateWorldMatrix(true, false); q.applyMatrix4(w.p.horn.matrixWorld); tt.position.copy(q); tt.rotation.set(.5, .3, 0); tt.visible = p > i * .2; }); w.p.mouth.scale.set(1.3, 2, 1); } },
    { say: 'Hats? You need a hole.', show: ['floor', 'wall', 'pp', 'hat'], sky: '#F3E8F7', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.6, 4.2, 8.4], look: [0, 4, 0], fov: 48, to: { pos: [1.5, 4.2, 7.8], look: [0, 4, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, .25); pose(w.p, .2); const q = Math.min(1, p * 2); w.hat.position.set(.1, 5.6 - q * .8 + (q >= 1 ? .1 * Math.sin(t * 8) : 0), .5); w.hat.rotation.set(.4, 0, .15 * Math.sin(t * 5)); w.p.eyes.forEach(e => e.scale.set(1, .6, 1)); w.p.mouth.scale.set(1, .6, 1); } },
    { say: 'And unicorns? Finally, they say hi.', show: ['ground', 'pp', 'pony', 'rainbow', 'sparkles'], sky: '#BFE3F7', lightAt: [4, 10, 8], lightDist: 22,
      cam: { pos: [0, 4.4, 14], look: [0, 3.8, 0], fov: 54, to: { pos: [0, 4.4, 13.2], look: [0, 3.8, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -2, 0, .6); pose(w.p, p > .4 ? 2.4 : .2); sparkle(w, t); w.pony.position.set(2.2, 0, -.6); w.pony.rotation.y = Math.PI + .4; w.ponyHead.rotation.z = .15 * Math.sin(t * 3); w.rainbow.position.set(0, 2, -4); w.rainbow.scale.setScalar(1.6); w.rainbow.visible = p > .3; } },
    { say: 'Unicorn horns: useful, magical, or way too sharp? Comment below.',
      quiz: { q: 'Would you want a unicorn horn?', options: ['Useful', 'Magical', 'Way too sharp'], answer: 'Made up. A narwhal\'s "horn" is a giant tooth.' },
      show: ['floor', 'pp', 'sparkles'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8.5], look: [0, 4.8, 0], fov: 48, to: { pos: [-1, 1, 8.5], look: [0, 4.8, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); sparkle(w, t); } },
  ],
};
