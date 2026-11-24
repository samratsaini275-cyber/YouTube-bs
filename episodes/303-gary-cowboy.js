// Narrative 17: "What Would Happen If… (season 7)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a brown cowboy hat.

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
  const { mat, box, cyl, ball, cone, torus, group } = k;
  const w = { k };
  w.dirt = k.ground('#D9B27A', 0);
  w.mesa = group(); for (let i = 0; i < 3; i++) box(6 + i * 2, 3 + i, 3, mat(['#C0703F', '#B5633A', '#A85A34'][i]), [-10 + i * 9, 1.5 + i * .5, -14], w.mesa);
  w.g = gary(k, k.scene, 1.3, null);
  w.hat = group([.36, .56, 0], w.g); const hb = mat('#8B5A2B'); cyl(.32, .32, .03, hb, [0, 0, 0], w.hat, 20); const cr = cyl(.15, .18, .18, hb, [0, .1, 0], w.hat, 14); cyl(.185, .185, .04, mat('#3A2414'), [0, .04, 0], w.hat, 14);
  w.hopper = group(); const gr = mat('#6BBF3B'); const hbdy = ball(.5, gr, [0, .5, 0], w.hopper); hbdy.scale.set(2, .7, .7); ball(.32, gr, [1, .62, 0], w.hopper); for (const z of [-1, 1]) { ball(.09, mat('#FFFFFF'), [1.22, .78, z * .18], w.hopper); ball(.045, mat('#111111'), [1.3, .8, z * .18], w.hopper); seg(k, [1.1, .9, z * .1], [1.6, 1.6, z * .35], gr, w.hopper, .02); seg(k, [-.4, .6, z * .3], [-.2, 1.2, z * .5], mat('#4E9A2A'), w.hopper, .07); seg(k, [-.2, 1.2, z * .5], [-1, .05, z * .55], mat('#4E9A2A'), w.hopper, .05); seg(k, [.5, .4, z * .3], [.6, 0, z * .45], gr, w.hopper, .03); }
  w.rope = group(); const rl = torus(.5, .015, mat('#E8D29A'), [0, 0, 0], w.rope); rl.rotation.x = Math.PI / 2;
  w.lb = group(); const red = mat('#E0281E'); const lbb = ball(.35, red, [0, .3, 0], w.lb); lbb.scale.set(1.2, .65, 1); ball(.17, mat('#141414'), [.42, .27, 0], w.lb); for (let i = 0; i < 4; i++) ball(.07, mat('#141414'), [-.2 + (i % 2) * .3, .5, (i < 2 ? -1 : 1) * .17], w.lb); for (const z of [-1, 1]) ball(.05, mat('#FFFFFF'), [.55, .32, z * .08], w.lb); w.lbw = [-1, 1].map(z => { const wg = box(.5, .01, .3, mat('#CFE8F5', { opacity: .6 }), [-.1, .55, z * .25], w.lb); wg.visible = false; return wg; });
  w.weed = group(); for (let i = 0; i < 10; i++) { const s = seg(k, [0, 0, 0], [Math.cos(i) * .4, Math.sin(i * 1.7) * .4, Math.sin(i) * .4], mat('#A07A44'), w.weed, .02); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '303',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'COWBOY GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A COWBOY?'],
  title: 'What would happen if Gary the ant was a cowboy?',
  description: 'His horse is a grasshopper. His lasso is one hair. The big showdown is with a ladybug. And the ladybug just flies away. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'cowboy', 'funny', 'shorts'],
  sources: ['Quiz fact: some ants tend aphids like livestock, guarding them and collecting the sweet honeydew they make (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a cowboy?', show: ['dirt', 'mesa', 'g', 'hat'], sky: '#F6C982', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .06 * Math.sin(t * 5); w.hat.rotation.z = .1 * Math.sin(t * 3); } },
    { say: 'His horse? A grasshopper.', label: 'BOING', show: ['dirt', 'mesa', 'g', 'hat', 'hopper'], sky: '#F6C982', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2.2, 8], look: [0, 2.3, 0], fov: 52, to: { pos: [0, 2.2, 7.4], look: [0, 2.3, 0], fov: 50 } },
      update: (w, p, t) => { const hop = Math.abs(Math.sin(t * 4)) * 1.4, x = -2.5 + p * 5; w.hopper.position.set(x, hop, 0); w.hopper.rotation.set(0, 0, .15 * Math.cos(t * 4)); gy(w, x - .3, hop + .82, 0, 0, t); w.g.rotation.z = .15 * Math.cos(t * 4); } },
    { say: 'His lasso? One hair.', show: ['dirt', 'mesa', 'g', 'hat', 'rope'], sky: '#F6C982', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.6, 5.2], look: [0, 1.1, 0], fov: 46, to: { pos: [1.3, 1.6, 4.7], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { w.hopper.rotation.set(0, 0, 0); gy(w, 0, 0, .3, -1.4, t); w.rope.position.set(.35 + .1 * Math.cos(t * 10), 1.2, .3 + .1 * Math.sin(t * 10)); w.rope.rotation.set(0, t * 10, .2); } },
    { say: 'The big showdown? A ladybug.', label: 'HIGH NOON', show: ['dirt', 'mesa', 'g', 'hat', 'lb', 'weed'], sky: '#F6C982', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, .7, 6.5], look: [0, .6, 0], fov: 48, to: { pos: [0, .7, 5.8], look: [0, .6, 0], fov: 46 } },
      update: (w, p, t) => { gy(w, -.95, 0, 0, 0, t); w.g.rotation.y = -.25; w.lb.position.set(.95, 0, 0); w.lb.rotation.set(0, Math.PI + .25, 0); w.lbw.forEach(x => x.visible = false); w.weed.position.set(-3 + p * 6, .4 + .2 * Math.abs(Math.sin(t * 5)), -1.2); w.weed.rotation.set(0, 0, -t * 5); } },
    { say: 'And the ladybug? It just flies away.', show: ['dirt', 'mesa', 'g', 'hat', 'lb'], sky: '#F6C982', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 1, 6.5], look: [0, 1, 0], fov: 50, to: { pos: [0, 1.2, 6.2], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { gy(w, -.95, 0, 0, -.25, t); const q = Math.max(0, p - .25); w.lb.position.set(.95 + q * .6, q * 3.2, 0); w.lb.rotation.set(0, Math.PI + .25, 0); w.lbw.forEach((x, i) => { x.visible = q > 0; x.rotation.x = (i ? 1 : -1) * (.3 + .4 * Math.sin(t * 40)); }); w.hat.rotation.z = q > 0 ? -.4 : 0; w.g.rotation.z = q > 0 ? -.12 : 0; } },
    { say: 'Cowboy Gary: cool, tiny, or way too slow? Comment below.',
      quiz: { q: 'Cowboy Gary is…', options: ['Cool', 'Tiny', 'Way too slow'], answer: 'Some real ants herd aphids like cattle, collecting their sweet honeydew.' },
      show: ['dirt', 'g', 'hat'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.hat.rotation.z = 0; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
