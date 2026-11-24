// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have bat ears. Hook: the premise as a question under 2 s; first frame shows a person with huge pointed bat ears.

function person(k, parent, shirt, whisk = false) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  ball(.1, mat('#E86A8A'), [0, -.02, .76], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  if (false) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#E6DDF2'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#6A4FC4'); w.pp = w.p.root;
  const em = mat('#E8B89A'), inner = mat('#E88A9A');
  w.ears = [-1, 1].map(s => { const e = group([s * .62, .45, 0], w.p.head); const c = cone(.45, 1.5, em, [0, .75, 0], e, 12); c.scale.z = .35; const ci = cone(.3, 1.1, inner, [0, .65, .08], e, 12); ci.scale.z = .2; e.rotation.z = -s * .45; e.userData.s = s; return e; });
  w.f = person(k, k.scene, '#3FA34D'); w.fr = w.f.root;
  w.wallMid = box(.4, 8, 8, mat('#F5EFE0'), [0, 4, 0]);
  w.waves = group(); for (let i = 0; i < 4; i++) { const r = k.torus(.5, .04, mat('#FFFFFF', { glow: .9 }), [0, 0, 0], w.waves); r.userData.i = i; r.castShadow = false; }
  w.mosq = group(); const mb = ball(.08, mat('#222222'), [0, 0, 0], w.mosq); mb.scale.set(2, 1, 1); for (const z of [-1, 1]) { const wg = ball(.09, mat('#DDEEFF', { glow: .3 }), [0, .06, z * .08], w.mosq); wg.scale.set(1.4, .2, 1); }
  w.keys = group(); box(.3, .05, .15, mat('#C9CED6', { metal: .8 }), [0, 0, 0], w.keys); k.torus(.1, .03, mat('#C9CED6', { metal: .8 }), [-.2, 0, 0], w.keys);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(1)); };
const wiggle = (w, t, a = .1) => w.ears.forEach(e => e.rotation.z = -e.userData.s * (.45 + a * Math.sin(t * 7)));
const lights = (w, on) => w.k.scene.children.forEach(c => { if (c.isHemisphereLight || c.isDirectionalLight) { c.userData.base ??= c.intensity; c.intensity = c.userData.base * on; } });

export default {
  id: '321',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BAT EARS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD BAT EARS?'],
  title: 'What would happen if humans had bat ears?',
  description: 'Whispers next door? Heard. Lost keys in the dark? Found. And one mosquito sounds like a jet. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'bat', 'ears', 'comedy', 'shorts'],
  sources: ['Comedy sketch: bat ears on people are made up. Quiz fact: many bats find their way and catch insects in the dark by echolocation, making high-pitched calls and listening for the echoes (Encyclopaedia Britannica, "echolocation").'],
  setup,
  scenes: [
    { say: 'What if humans had bat ears?', show: ['floor', 'wall', 'pp'], sky: '#E6DDF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 11], look: [0, 5, 0], fov: 50, to: { pos: [0, 3.4, 10.3], look: [0, 5, 0], fov: 48 } },
      update: (w, p, t) => { lights(w, 1); stand(w, 0, 0, 0); pose(w.p, .3); wiggle(w, t, .15); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Whispers next door? Heard.', show: ['floor', 'wall', 'pp', 'fr', 'wallMid', 'waves'], sky: '#E6DDF2', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [0, 4, 13], look: [0, 3.4, 0], fov: 54, to: { pos: [0, 4, 12.3], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, -2.2, 0, Math.PI / 2); pose(w.p, .3); wiggle(w, t, .2); w.p.eyes.forEach(e => e.scale.setScalar(1 + (p > .5 ? .4 : 0))); w.p.mouth.scale.set(1.2, p > .5 ? 2.5 : 1, 1); w.fr.position.set(2.4, 0, 0); w.fr.rotation.set(0, -Math.PI / 2, 0); w.f.mouth.scale.set(.5, .5, 1); w.f.arms[1].rotation.set(-2.2, 0, .3); w.waves.children.forEach(r => { const i = r.userData.i, q = (t * .8 + i / 4) % 1; r.position.set(1.6 - q * 3, 3.5, 0); r.rotation.set(0, Math.PI / 2, 0); r.scale.setScalar(.6 + q * .8); r.visible = true; }); } },
    { say: 'Lost keys in the dark? Found.', show: ['floor', 'wall', 'pp', 'keys', 'waves'], sky: '#120E1E', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 10], look: [0, 3, 0], fov: 52, to: { pos: [0, 3.4, 9.3], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { w.f.arms[1].rotation.set(0, 0, .3); lights(w, .25); stand(w, -1.2 + Math.min(p, .6) * 2, 0, .6); pose(w.p, .3, .4); wiggle(w, t, .25); w.p.eyes.forEach(e => e.scale.set(1, .2, 1)); w.keys.position.set(1.8, .05, .6); w.keys.rotation.y = .4; const found = p > .6; if (found) { w.keys.position.set(.4, 1.1 + .1 * Math.sin(t * 6), 1); } w.waves.children.forEach(r => { const i = r.userData.i, q = (t * .9 + i / 4) % 1; r.position.set(w.pp.position.x + .5 + q * 1.4, 3.5 - q * 2.5, .4); r.rotation.set(0, Math.PI / 2, 0); r.scale.setScalar(.5 + q); r.visible = !found; }); } },
    { say: 'And one mosquito? Sounds like a jet.', label: 'BZZZZ!', show: ['floor', 'wall', 'pp', 'mosq'], sky: '#E6DDF2', lightAt: [0, 6, 5], lightDist: 14, shake: () => .06,
      cam: { pos: [0, 3.4, 8.5], look: [0, 3.9, 0], fov: 50, to: { pos: [0, 3.4, 7.8], look: [0, 3.9, 0], fov: 48 } },
      update: (w, p, t) => { lights(w, 1); stand(w, 0, 0, 0); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * 2.6)); wiggle(w, t * 3, .3); w.p.eyes.forEach(e => e.scale.set(1.4, 1.4, 1)); w.p.mouth.scale.set(1.3, 3, 1); w.mosq.position.set(1.8 * Math.sin(t * 3), 4.4 + .4 * Math.sin(t * 7), 1 + .5 * Math.cos(t * 3)); w.mosq.rotation.y = -t * 3; } },
    { say: 'Bat ears: useful, cool, or way too loud? Comment below.',
      quiz: { q: 'Would you want bat ears?', options: ['Useful', 'Cool', 'Way too loud'], answer: 'Made up for people. Real bats hunt in the dark by listening to the echoes of their calls.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 13], look: [0, 4.6, 0], fov: 56, to: { pos: [-1, 1.2, 13], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .3); wiggle(w, t, .15); } },
  ],
};
