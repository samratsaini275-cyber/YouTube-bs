// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have whiskers. Hook: the premise as a question under 2 s; first frame shows a person with long white cat whiskers.

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
  if (whisk) { p.wh = []; for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const g = group([s * .3, -.08, .7], p.head); const c = cyl(.018, .018, 1.8, mat('#FFFFFF', { glow: .2 }), [s * .9, 0, 0], g, 5); c.rotation.z = Math.PI / 2; g.rotation.z = s * (i - 1) * .18; g.userData = { s, i }; p.wh.push(g); } }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const twitch = (p, t, amt = .08) => p.wh.forEach(g => { const { s, i } = g.userData; g.rotation.z = s * (i - 1) * .18 + amt * Math.sin(t * 9 + i); });

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#E8F0E0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6', true); w.pp = w.p.root;
  w.f = person(k, k.scene, '#E2453C'); w.fr = w.f.root;
  w.door = group(); const dm = mat('#8B5A2B'); box(.3, 5, .6, dm, [-1.6, 2.5, 0], w.door); box(.3, 5, .6, dm, [1.6, 2.5, 0], w.door); box(3.5, .3, .6, dm, [0, 5.1, 0], w.door); box(8, 20, .4, mat('#E8F0E0'), [-5.75, 10, 0], w.door); box(8, 20, .4, mat('#E8F0E0'), [5.75, 10, 0], w.door);
  w.chair = group(); const cm = mat('#C0703F'); box(1.4, .2, 1.4, cm, [0, 1.3, 0], w.chair); box(1.4, 1.6, .2, cm, [0, 2.1, -.6], w.chair); for (const x of [-.6, .6]) for (const z of [-.6, .6]) box(.15, 1.3, .15, cm, [x, .65, z], w.chair);
  w.lamp = group(); cyl(.06, .06, 3, mat('#555555'), [0, 1.5, 0], w.lamp, 8); w.shade = cyl(.4, .7, .7, mat('#FFE9A8', { glow: .2 }), [0, 3.2, 0], w.lamp, 16);
  w.table = group(); box(4, .2, 2, mat('#C0703F'), [0, 2.2, 0], w.table); for (const x of [-1.8, 1.8]) box(.2, 2.2, .2, mat('#C0703F'), [x, 1.1, 0], w.table); w.bowl = cyl(.7, .5, .5, mat('#FFFFFF'), [0, 2.55, .2], w.table, 20); w.soup = cyl(.65, .65, .05, mat('#E8A33A'), [0, 2.78, .2], w.table, 20);
  w.drops = group(); for (let i = 0; i < 6; i++) { const d = ball(.06, mat('#E8A33A'), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const lights = (w, on) => w.k.scene.children.forEach(c => { if (c.isHemisphereLight || c.isDirectionalLight) { c.userData.base ??= c.intensity; c.intensity = c.userData.base * on; } });

export default {
  id: '306',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT WHISKERS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD WHISKERS?'],
  title: 'What would happen if humans had cat whiskers?',
  description: 'Doorways get measured first. The dark? No problem. Hugs are very tickly. And soup? Your whiskers go in first. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'cat', 'whiskers', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human whiskers are made up. Quiz fact: whiskers (vibrissae) are thick hairs set in deep, nerve-rich follicles that sense touch and air movement (Encyclopaedia Britannica, "vibrissa").'],
  setup,
  scenes: [
    { say: 'What if humans had whiskers?', show: ['floor', 'wall', 'pp'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 8.5], look: [0, 4.05, 0], fov: 50, to: { pos: [0, 3.4, 7.8], look: [0, 4.05, 0], fov: 48 } },
      update: (w, p, t) => { lights(w, 1); stand(w, 0, 0, 0); pose(w.p, .3); twitch(w.p, t, .12); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Doorways? Measured first.', show: ['floor', 'pp', 'door'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 9], look: [0, 3.4, 0], fov: 52, to: { pos: [0, 3.6, 8.3], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 1.2, 0); pose(w.p, .3); const touch = Math.min(1, p * 2); w.pp.position.z = 2 - touch * .8; w.p.wh.forEach(g => { const { s, i } = g.userData; g.rotation.y = -s * touch * .25; g.rotation.z = s * (i - 1) * .18; }); w.p.head.rotation.y = .2 * Math.sin(t * 3) * (p > .5 ? 1 : 0); w.p.eyes.forEach(e => e.scale.set(1, p > .5 ? .5 : 1, 1)); } },
    { say: 'The dark? No problem.', show: ['floor', 'wall', 'pp', 'chair', 'lamp'], sky: '#1A2238', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 11], look: [0, 3, 0], fov: 52, to: { pos: [0, 3.4, 10.3], look: [0, 3, 0], fov: 50 } },
      update: (w, p, t) => { lights(w, .25); w.p.wh.forEach(g => g.rotation.y = 0); w.p.eyes.forEach(e => e.scale.set(1, .2, 1)); w.chair.position.set(-1.2, 0, 0); w.lamp.position.set(1.4, 0, -.5); stand(w, -2.6 + p * 5.2, 1.6, Math.PI / 2 - .6); pose(w.p, .3); twitch(w.p, t, .15); w.pp.position.y = .08 * Math.abs(Math.sin(t * 8)); } },
    { say: 'Hugs? Very tickly.', label: 'HEE HEE', show: ['floor', 'wall', 'pp', 'fr'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 9.5], look: [0, 3.4, 0], fov: 50, to: { pos: [0, 3.6, 8.8], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { lights(w, 1); w.pp.position.y = 0; w.p.eyes.forEach(e => e.scale.set(1, 1, 1)); stand(w, -.85, 0, .9); w.fr.position.set(.85, 0, 0); w.fr.rotation.set(0, -.9, 0); w.p.arms.forEach(a => a.rotation.set(-1.3, 0, a.userData.s * -.3)); w.f.arms.forEach(a => a.rotation.set(-1.3, 0, a.userData.s * -.3)); twitch(w.p, t, .2); const giggle = .08 * Math.sin(t * 30); w.f.root.rotation.z = giggle; w.f.mouth.scale.set(1.4, 2, 1); w.f.eyes.forEach(e => e.scale.set(1, .3, 1)); } },
    { say: 'And soup? Whiskers go in first.', label: '*SPLASH*', show: ['floor', 'wall', 'pp', 'table', 'drops'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.6, 4, 7.5], look: [0, 3, 0], fov: 50, to: { pos: [2.4, 4, 6.9], look: [0, 3, 0], fov: 48 } },
      update: (w, p, t) => { w.f.root.rotation.z = 0; stand(w, 0, 1.6, Math.PI); w.pp.rotation.y = Math.PI; w.pp.position.set(0, 0, -1); w.pp.rotation.set(0, 0, 0); const lean = Math.min(1, p * 2); w.p.head.rotation.x = lean * .5; w.p.root.rotation.x = lean * .15; pose(w.p, .3, .5); twitch(w.p, t, .06); w.drops.children.forEach(d => { const i = d.userData.i, r = (t * 2 + i / 6) % 1; d.position.set((i - 2.5) * .35, 2.8 + Math.sin(r * Math.PI) * .7, .2 + r * .4); d.visible = lean >= 1; }); } },
    { say: 'Whiskers: useful, cute, or way too tickly? Comment below.',
      quiz: { q: 'Would you want whiskers?', options: ['Useful', 'Cute', 'Way too tickly'], answer: 'Made up for people. Real whiskers sit in nerve-rich roots that sense touch and air.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.p.root.rotation.x = 0; stand(w, 0, 0, .2); pose(w.p, .3); twitch(w.p, t, .12); } },
  ],
};
