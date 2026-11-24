// Narrative 18: "What Would Happen If… (season 8)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a silver thimble helmet holding a toothpick sword.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#9FBF6A', 0);
  w.wall = group(); box(30, 14, .3, mat('#CFE6F2'), [0, 7, -3], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  const silver = mat('#C9CED6', { metal: .8, rough: .25 });
  w.helm = group([.36, .5, 0], w.g); cyl(.17, .19, .2, silver, [0, .05, 0], w.helm, 16); box(.02, .06, .2, mat('#333333'), [.17, .04, 0], w.helm); cone(.04, .15, mat('#E2453C'), [0, .22, 0], w.helm, 8);
  w.sword = group([.5, .35, .25], w.g); cyl(.02, .02, .9, mat('#E8C890'), [0, .45, 0], w.sword, 6); w.sword.rotation.z = -.5;
  w.thimble = group(); const th = cyl(1.1, 1.3, 2, silver, [0, 1, 0], w.thimble, 24); for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) { const a = i / 18 * Math.PI * 2; ball(.06, mat('#9AA0A8'), [Math.cos(a) * (1.12 + r * .045), .5 + r * .45, Math.sin(a) * (1.12 + r * .045)], w.thimble); } ball(1.1, silver, [0, 2, 0], w.thimble).scale.y = .3;
  w.gk = group(); const gm = mat('#5BBF4A', { rough: .6 }); const bd = ball(.6, gm, [0, .45, 0], w.gk); bd.scale.set(2, .7, 1); w.gkHead = group([1.4, .55, 0], w.gk); const hd = ball(.45, gm, [0, 0, 0], w.gkHead); hd.scale.set(1.3, .8, 1); for (const z of [-1, 1]) { ball(.16, mat('#FFE45C'), [.25, .2, z * .3], w.gkHead); ball(.08, mat('#111111'), [.33, .22, z * .36], w.gkHead); } w.tongue = box(.8, .05, .12, mat('#E86A8A'), [.9, -.1, 0], w.gkHead);
  w.tail = []; for (let i = 0; i < 6; i++) { const b = ball(.32 - i * .045, gm, [-1.3 - i * .45, .4, 0], w.gk); w.tail.push(b); }
  for (const x of [-.6, .7]) for (const z of [-1, 1]) { const l = ball(.18, gm, [x, .15, z * .65], w.gk); l.scale.set(1.4, .5, 1); }
  for (let i = 0; i < 6; i++) ball(.08, mat('#3E8E33'), [-.8 + i * .32, .85, (i % 2 - .5) * .3], w.gk);
  w.castle = group(); const cm = mat('#E0C9A0'); box(3, 2, 1, cm, [0, 1, 0], w.castle); for (let i = 0; i < 5; i++) box(.4, .4, 1, cm, [-1.3 + i * .65, 2.2, 0], w.castle); box(.8, 1.2, .05, mat('#8B5A2B'), [0, .6, .52], w.castle);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const sway = (w, t, a = .25) => w.tail.forEach((b, i) => b.position.z = a * Math.sin(t * 4 - i * .7) * i * .4);

export default {
  id: '315',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SIR GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A KNIGHT?'],
  title: 'What would happen if Gary the ant was a knight?',
  description: 'His armour is a thimble. His sword is a toothpick. And the dragon? A tiny gecko. Run, Gary. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'knight', 'funny', 'shorts'],
  sources: ['Quiz fact: workers of the Bornean ant Colobopsis explodens can burst their own bodies to spray sticky, toxic fluid at attackers, defending the colony (Laciny et al., ZooKeys, 2018).'],
  setup,
  scenes: [
    { say: 'What if Gary was a knight?', show: ['floor', 'wall', 'g', 'helm', 'sword'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .9, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.sword.rotation.z = -.5 + .3 * Math.sin(t * 4); w.g.rotation.z = .05 * Math.sin(t * 5); } },
    { say: 'His armour? A thimble.', label: '*CLANG*', show: ['floor', 'wall', 'g', 'thimble'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16, shake: (t) => t > .9 && t < 1.2 ? .15 : 0,
      cam: { pos: [0, 2.2, 7.5], look: [0, 1.2, 0], fov: 48, to: { pos: [0, 2.2, 7], look: [0, 1.2, 0], fov: 46 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t, t > 1); w.g.position.x = t > 1 ? (t - 1) * .5 : 0; const drop = Math.min(1, t / .9); w.thimble.scale.setScalar(.55); w.thimble.position.set(w.g.position.x + .1, .32 + 4 * (1 - drop * drop), 0); } },
    { say: 'His sword? A toothpick.', show: ['floor', 'wall', 'g', 'helm', 'sword'], sky: '#CFE6F2', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.2, 1.4, 5.6], look: [0, 1, 0], fov: 46, to: { pos: [1.1, 1.4, 5], look: [0, 1, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); const sw = Math.sin(t * 6); w.sword.rotation.z = -.5 + sw * 1.2; w.g.rotation.y = -1.4 + (p > .5 ? t * 8 : 0); } },
    { say: 'And the dragon? A tiny gecko.', label: 'RUN!', show: ['floor', 'wall', 'g', 'helm', 'sword', 'gk', 'castle'], sky: '#CFE6F2', lightAt: [0, 6, 4], lightDist: 20,
      cam: { pos: [0, 3.2, 13], look: [0, 1.6, 0], fov: 52, to: { pos: [0, 3.2, 12.2], look: [0, 1.6, 0], fov: 50 } },
      update: (w, p, t) => { w.castle.position.set(-3.5, 0, -1.5); w.castle.scale.setScalar(.8); w.gk.position.set(3.6 - Math.max(0, p - .3) * 2, 0, 0); w.gk.rotation.y = Math.PI; sway(w, t); const lick = Math.max(0, Math.sin(t * 5)); w.tongue.scale.x = .3 + lick; w.tongue.position.x = .5 + lick * .4; const flee = p > .35; gy(w, flee ? .4 - (p - .35) * 4 : .4, 0, .6, flee ? Math.PI : 0, t, flee); w.sword.rotation.z = flee ? 1.4 : -.5; } },
    { say: 'Sir Gary: brave, tiny, or totally lost? Comment below.',
      quiz: { q: 'Sir Gary is…', options: ['Brave', 'Tiny', 'Totally lost'], answer: 'One real ant can burst its own body to spray attackers and defend its colony.' },
      show: ['floor', 'g', 'helm', 'sword'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.sword.rotation.z = -.5; w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
