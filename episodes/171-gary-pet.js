// Narrative 11: "What Would Happen If… (season 3, with Gary)". Gary-led (every third). Pets are the top topic (081 1.7K).
// Hook: the premise as a question under 2 s; first frame shows Gary walking a little green aphid on a leash.

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

function aphid(k, parent) {
  const { mat, ball, cyl, group } = k, gr = mat('#8BD45A', { rough: .6 });
  const a = { root: group([0, 0, 0], parent) };
  const b = ball(.45, gr, [0, .45, 0], a.root); b.scale.set(1.3, .95, 1);
  a.head = group([.55, .5, 0], a.root); ball(.25, gr, [0, 0, 0], a.head);
  for (const z of [-.12, .12]) { ball(.09, mat('#FFFFFF'), [.18, .08, z], a.head); ball(.045, mat('#111111'), [.25, .08, z], a.head); }
  for (const z of [-.15, .15]) { const c = cyl(.04, .04, .35, gr, [-.45, .8, z], a.root, 6); c.rotation.z = .6; }
  a.legs = []; for (const x of [-.25, 0, .25]) for (const z of [-1, 1]) a.legs.push(seg(k, [x, .25, z * .3], [x + .05, 0, z * .5], mat('#5A8F3A'), a.root, .03));
  return a;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.grass = group(); for (let i = 0; i < 40; i++) { const g = cone(.12, 1.6 + (i % 4) * .4, mat(i % 2 ? '#5E9E4A' : '#6FB357'), [-10 + (i * 1.37) % 20, .9, -3 - (i * .71) % 4], w.grass, 5); g.rotation.z = .1 * Math.sin(i); }
  w.g = gary(k, k.scene, 2.4, '#FFC21F');
  w.a = aphid(k, k.scene); w.ap = w.a.root; w.ap.scale.setScalar(1.4);
  w.leash = cyl(.02, .02, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.leash.castShadow = false;
  w.crumb = box(.3, .25, .3, mat('#D9A95B'), [0, 0, 0]);
  w.drop = ball(1.4, mat('#9FD3EE', { glow: .4 }), [0, 0, 0]); w.drop.material.transparent = true; w.drop.material.opacity = .7; w.drop.castShadow = false;
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.18, mat('#9FD3EE', { glow: .5 }), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.14, m, [-.09, 0, 0], h); ball(.14, m, [.09, 0, 0], h); const c = k.cone(.19, .3, m, [0, -.16, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const g = (w, x, z, ry, t, move = false) => { w.g.position.set(x, 0, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ap = (w, x, z, ry, t, move = false) => { w.ap.position.set(x, 0, z); w.ap.rotation.set(0, ry, 0); w.a.legs.forEach((l, i) => l.rotation.x = move ? .3 * Math.sin(t * 6 + i * 1.7) : 0); w.a.head.rotation.z = .1 * Math.sin(t * 2); };
const leash = (w) => { w.g.updateMatrixWorld(true); w.ap.updateMatrixWorld(true); const A = new w.g.position.constructor(), B = A.clone(); w.g.localToWorld(A.set(.55, .42, 0)); w.a.head.getWorldPosition(B); B.y += .1;
  w.leash.position.copy(A).add(B).multiplyScalar(.5); w.leash.scale.y = A.distanceTo(B); w.leash.quaternion.setFromUnitVectors(new A.constructor(0, 1, 0), B.clone().sub(A).normalize()); };

export default {
  id: '171',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GETS A PET',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'GOT A PET?'],
  title: 'What would happen if Gary the ant got a pet?',
  description: 'Gary adopts an aphid. Walks are very slow. Fetch does not happen. Bath time is one raindrop. Cuddles: ten out of ten. (Gary is made up. Ants really do look after aphids.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: many ant species tend aphids and feed on the sugary honeydew they excrete (a well-documented mutualism; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary the ant got a pet?',
      show: ['ground', 'grass', 'g', 'ap', 'leash'], sky: '#9ED2F3', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [1.5, 1.7, 8], look: [.3, 1.35, 0], fov: 44, to: { pos: [1.3, 1.7, 7.4], look: [.5, 1.35, 0], fov: 42 } },
      update: (w, p, t) => { g(w, -1.6 + t * .3, 0, -.25, t, true); ap(w, 1.8 + t * .3, .4, -.5, t, true); leash(w); },
    },
    {
      say: 'Walks? Very, very slow.',
      show: ['ground', 'grass', 'g', 'ap', 'leash'], sky: '#9ED2F3', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [0, 1.8, 8], look: [0, 1.3, 0], fov: 46, to: { pos: [0, 1.8, 7.4], look: [0, 1.3, 0], fov: 44 } },
      update: (w, p, t) => { g(w, 1.4, 0, Math.PI - .4, t); w.g.position.y = .08 * Math.abs(Math.sin(t * 6)); w.g.userData.legs[0].rotation.x = .5 * Math.sin(t * 12); ap(w, -1.6 + t * .06, .3, 0, t, true); leash(w); },
    },
    {
      say: 'Fetch? The pet just sits there.',
      show: ['ground', 'grass', 'g', 'ap', 'crumb'], sky: '#9ED2F3', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [1, 2, 8.5], look: [0, 1.5, 0], fov: 48, to: { pos: [1, 2, 8], look: [0, 1.5, 0], fov: 46 } },
      update: (w, p, t) => {
        g(w, -2, 0, -.2, t); ap(w, .6, .6, -1.6, t);
        const q = Math.min(1, t / 1.1); w.crumb.position.set(-1 + q * 4.5, .15 + Math.sin(q * Math.PI) * 2.4, .3); w.crumb.rotation.set(t * 5, t * 4, 0);
      },
    },
    {
      say: 'Bath time? One single raindrop.',
      show: ['ground', 'grass', 'g', 'ap', 'drop', 'splash'], sky: '#9AB0C4', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [1, 2, 8.5], look: [0, 1.6, 0], fov: 50, to: { pos: [1, 2, 8], look: [0, 1.6, 0], fov: 48 } },
      shake: (t) => (t > .9 && t < 1.2) ? .1 : 0,
      update: (w, p, t) => {
        g(w, -1.3, 0, -.3, t); ap(w, 1.2, .5, -1.8, t); w.drop.visible = t < .9; w.drop.position.set(0, 9 - t * 9, .3); w.drop.scale.set(1, 1.2, 1);
        w.splash.visible = t >= .9; w.splash.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2, q = Math.min(1, (t - .9) * 2); s.position.set(Math.cos(a) * q * 3, .3 + Math.sin(q * Math.PI) * 1.5, .3 + Math.sin(a) * q * 1.5); });
        w.g.scale.setScalar(t > .9 ? 2.4 * (1 + .05 * Math.sin(t * 30)) : 2.4);
      },
    },
    {
      say: 'But cuddles? Ten out of ten.',
      show: ['ground', 'grass', 'g', 'ap', 'hearts'], sky: '#F7C6D0', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [.6, 1.7, 6.8], look: [0, 1.4, 0], fov: 44, to: { pos: [.5, 1.7, 6.3], look: [0, 1.4, 0], fov: 42 } },
      update: (w, p, t) => {
        w.g.scale.setScalar(2.4); g(w, -1.1, 0, -.15, t); w.g.rotation.z = .08 * Math.sin(t * 3); ap(w, .9, .2, Math.PI + .3, t); w.ap.rotation.z = -.08 * Math.sin(t * 3);
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(-.2 + .4 * Math.sin(i * 2 + t), 1.6 + q * 1.6, .5); h.scale.setScalar(.6 + q * .6); });
      },
    },
    {
      say: 'Gary\'s pet aphid: cute, weird, or a great idea? Comment below.',
      quiz: { q: 'Should Gary keep the aphid?', options: ['Cute', 'Weird', 'Great idea'], answer: 'Real ants do look after aphids, and drink the sweet honeydew they make.' },
      show: ['ground', 'grass', 'g', 'ap', 'leash'], sky: '#274B73', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [3, 1.7, 7], look: [0, 1.6, 0], fov: 44, to: { pos: [-3, 1.7, 7], look: [0, 1.6, 0] } },
      update: (w, p, t) => { g(w, -1.2, 0, -.3, t); ap(w, 1.4, .3, -.6, t); leash(w); },
    },
  ],
};
