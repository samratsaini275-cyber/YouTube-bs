// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his camping trip are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary next to his leaf tent in the grass.

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
  const w = {};
  w.ground = k.ground('#5E8F47', 0);
  w.camp = group();
  for (let i = 0; i < 40; i++) { const b = cone(.25, 4 + (i % 4), mat(i % 2 ? '#4E8A3C' : '#6FAF5A'), [((i * 37) % 40) / 2 - 10, 2, -6 - (i % 5)], w.camp, 4); b.rotation.z = Math.sin(i) * .15; }
  // leaf tent
  w.tent = group([3.5, 0, -1], w.camp);
  const leaf = ball(2.6, mat('#3FA34D', { rough: .6, double: true }), [0, 1.2, 0], w.tent); leaf.scale.set(1.4, .9, .9);
  const vein = box(.06, .06, 4.6, mat('#2E7D32'), [0, 2.05, 0], w.tent); vein.rotation.x = .1;
  box(1.8, 1.6, .1, mat('#1E3A1E'), [0, .8, 2.3], w.tent);
  w.g = gary(k, k.scene, 2);
  // campfire: one match
  w.match = group([0, 0, 0]);
  const stick = box(.25, .25, 6, mat('#E8C98A'), [0, .15, 0], w.match);
  w.head = ball(.45, mat('#E2453C'), [0, .2, 3.1], w.match); w.head.scale.set(1, 1, 1.3);
  w.fire = group([0, .4, 3.1], w.match);
  for (let i = 0; i < 3; i++) { const f = cone(.6 - i * .15, 2 - i * .4, mat(['#FF8A1F', '#FFD21F', '#FFFFFF'][i], { glow: 3 }), [0, .8 - i * .1, 0], w.fire, 10); f.castShadow = false; }
  // marshmallow on a pine needle
  w.mallow = group([0, 0, 0]);
  const needle = box(.08, .08, 5, mat('#2E5E2E'), [0, 0, 0], w.mallow); needle.rotation.x = 0;
  w.puff = cyl(.9, .9, 1.4, mat('#FFFFFF', { rough: .9 }), [0, 0, 2.4], w.mallow, 16); w.puff.rotation.x = Math.PI / 2;
  // the rain drop and the flood
  w.drop = ball(1.6, mat('#5BC0EB', { metal: .2, rough: .05, opacity: .85 }), [0, 0, 0]); w.drop.scale.y = 1.3;
  w.lake = cyl(1, 1, .12, mat('#5BC0EB', { metal: .3, rough: .05, opacity: .8 }), [0, .07, 0], k.scene, 32); w.lake.castShadow = false;
  w.raft = group([0, 0, 0]);
  const rl = ball(1, mat('#3FA34D', { rough: .6 }), [0, 0, 0], w.raft); rl.scale.set(1.6, .12, .8);
  w.night = box(60, 30, .2, mat('#0A0F1E', { opacity: .45 }), [0, 10, 9]); w.night.castShadow = false;
  return w;
}

const CAMP = ['ground', 'camp', 'g'];

export default {
  id: '090',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES CAMPING',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT CAMPING.'],
  title: 'Gary the ant went camping',
  description: 'A leaf for a tent. A match for a campfire. A marshmallow bigger than he is. Then the weather turned. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'camping', 'outdoors', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his camping trip are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went camping.',
      show: CAMP, sky: '#FFB86B', lightAt: [2, 2, 0], lightDist: 14,
      cam: { pos: [-1, 3, 13], look: [2, 3.6, -1], fov: 50, to: { pos: [-1, 3, 11.5], look: [2, 3.6, -1], fov: 48 } },
      update: (w, p, t) => { w.lake.visible = false; w.g.position.set(-.5, 0, 1.5); w.g.rotation.y = .2; scurry(w.g, t, 10); },
    },
    {
      say: 'His campfire: one match.',
      show: [...CAMP, 'match', 'night'], sky: '#1E1A3A', lightAt: [0, 2, 1], lightDist: 12,
      cam: { pos: [-4, 3.5, 8], look: [.5, 1.5, 1.5], fov: 46, to: { pos: [-3.5, 3.4, 7], look: [.5, 1.5, 1.5], fov: 44 } },
      update: (w, p, t) => { w.lake.visible = false; w.match.position.set(1.5, 0, -1.5); w.match.rotation.y = .3; w.fire.children.forEach((f, i) => { f.scale.y = 1 + .25 * Math.sin(t * 15 + i); }); w.g.position.set(-1, 0, 2); w.g.rotation.y = -.4; scurry(w.g, t, 6); },
    },
    {
      say: 'His marshmallow is bigger than he is.',
      show: [...CAMP, 'match', 'mallow', 'night'], sky: '#1E1A3A', lightAt: [0, 2, 1], lightDist: 12,
      cam: { pos: [-5, 3, 10], look: [.8, 1.8, 0], fov: 48, to: { pos: [-4.6, 3, 9], look: [.8, 1.8, 0], fov: 46 } },
      update: (w, p, t) => { w.lake.visible = false; w.match.position.set(1.5, 0, -1.5); w.match.rotation.y = .3; w.fire.children.forEach((f, i) => { f.scale.y = 1 + .25 * Math.sin(t * 15 + i); }); w.g.position.set(-1.2, 0, 1); w.g.rotation.y = .3; scurry(w.g, t, 4); w.mallow.position.set(-.4, 1.6 + .1 * Math.sin(t * 3), 1.3); w.mallow.rotation.set(-.2, .9, 0); },
    },
    {
      say: 'Then it rained. One drop.',
      show: [...CAMP, 'drop'], sky: '#7A8AA0', lightAt: [2, 3, 0], lightDist: 14,
      cam: { pos: [-1, 4, 13], look: [2, 4, -1], fov: 52, to: { pos: [-1, 4, 11.5], look: [2, 4, -1], fov: 50 } },
      shake: (t) => t > .9 && t < 1.3 ? .3 : 0,
      update: (w, p, t, k) => { const f = Math.min(1, t / .9); w.drop.position.set(1.5, 16 - 14.4 * f * f, 0); w.drop.visible = t < 1; w.lake.visible = t > .9; w.lake.position.set(1.5, .07, 0); w.lake.scale.setScalar(.1 + 7 * k.h.ease(Math.min(1, Math.max(0, (t - .9) / .8)))); w.g.position.set(-.5, 0, 1.5); w.g.rotation.y = .2; scurry(w.g, t, t > .9 ? 40 : 10); },
    },
    {
      say: 'Gary\'s campsite is now a lake.',
      show: [...CAMP, 'raft'], sky: '#7A8AA0', lightAt: [1, 2, 0], lightDist: 14,
      cam: { pos: [4, 5, 11], look: [1, 1.5, 0], fov: 48, to: { pos: [3.6, 5, 9.5], look: [1, 1.5, 0], fov: 46 } },
      update: (w, p, t) => { w.lake.visible = true; w.lake.position.set(1.5, .25, 0); w.lake.scale.setScalar(7); w.raft.position.set(-1 + t * .8, .4 + .08 * Math.sin(t * 3), 1.5); w.raft.rotation.z = .05 * Math.sin(t * 2); w.g.position.set(-1 + t * .8, .5 + .08 * Math.sin(t * 3), 1.5); w.g.rotation.set(0, .3, .05 * Math.sin(t * 2)); scurry(w.g, t, 2); },
    },
    {
      say: 'Gary\'s next trip: mountains, jungle, or sofa? Comment below.',
      quiz: { q: 'Where should Gary go next?', options: ['The mountains', 'The jungle', 'The sofa'], answer: 'Gary is made up, so anywhere. After this trip he is leaning towards the sofa.' },
      show: CAMP, sky: '#274B73', lightAt: [2, 2, 0], lightDist: 14,
      cam: { pos: [3, 2, 13], look: [2, 6, -1], fov: 48, to: { pos: [-3, 2, 13], look: [2, 6, -1] } },
      update: (w, p, t) => { w.lake.visible = false; w.g.position.set(-.5, 0, 1.5); w.g.rotation.set(0, .2, 0); scurry(w.g, t, 10); },
    },
  ],
};
