// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people do not have giraffe necks. Hook: the premise as a question under 2 s; first frame shows a person with a very long neck.

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#E3F0D8'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.neck = cyl(.3, .36, 1, mat('#F2C9A0'), [0, 0, 0], w.pp, 12);
  w.spots = group([0, 0, 0], w.pp); for (let i = 0; i < 8; i++) { const s = ball(.12, mat('#C98B4E'), [0, 0, 0], w.spots); s.scale.set(1, 1, .3); s.userData.i = i; }
  w.door = group(); const dm = mat('#8B5A2B'); box(.3, 5.9, .6, dm, [-1.6, 2.95, 0], w.door); box(.3, 5.9, .6, dm, [1.6, 2.95, 0], w.door); box(3.5, .3, .6, dm, [0, 6, 0], w.door);
  w.shelf = group(); box(3, .2, 1, mat('#C0703F'), [0, 0, 0], w.shelf); w.jar = group([0, .2, 0], w.shelf); cyl(.35, .35, .7, mat('#F2B21F', { glow: .1 }), [0, .35, 0], w.jar, 16); cyl(.38, .38, .12, mat('#E2453C'), [0, .76, 0], w.jar, 16);
  w.scarf = group([0, 0, 0], w.pp); for (let i = 0; i < 7; i++) { const r = k.torus(.4, .12, mat(i % 2 ? '#3B6FD6' : '#FFFFFF'), [0, 0, 0], w.scarf); r.userData.i = i; }
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFE45C', { glow: .8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const neckLen = (w, L) => { w.p.head.position.y = 3.2 + L; w.neck.scale.y = L + .5; w.neck.position.y = 2.7 + (L + .5) / 2 - .1; w.spots.children.forEach(s => { const i = s.userData.i; s.position.set(Math.cos(i * 2.3) * .32, 2.9 + i / 8 * L, Math.sin(i * 2.3) * .32 + .02); s.rotation.y = -i * 2.3 + Math.PI / 2; }); w.scarf.visible = false; };
const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.neck.rotation.set(0, 0, 0); };

export default {
  id: '318',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIRAFFE NECK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD GIRAFFE NECKS?'],
  title: 'What would happen if humans had giraffe necks?',
  description: 'Doorways? Duck every time. The top shelf is easy. And winter? You need a very long scarf. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'giraffe', 'neck', 'comedy', 'shorts'],
  sources: ['Comedy sketch: giraffe necks on people are made up. Quiz fact: a giraffe\'s neck has seven vertebrae, the same number as a human neck; each one is just much longer (Encyclopaedia Britannica, "giraffe").'],
  setup,
  scenes: [
    { say: 'What if humans had giraffe necks?', show: ['floor', 'wall', 'pp', 'neck', 'spots'], sky: '#E3F0D8', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [0, 4.6, 14.5], look: [0, 7.4, 0], fov: 52, to: { pos: [0, 4.6, 13.7], look: [0, 7.4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); neckLen(w, 3.2); pose(w.p, .3); w.p.head.rotation.z = .1 * Math.sin(t * 2.5); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Doorways? Duck every time.', label: '*BONK*', show: ['floor', 'wall', 'pp', 'neck', 'spots', 'door', 'stars'], sky: '#E3F0D8', lightAt: [0, 8, 6], lightDist: 18, shake: (t) => t > .7 && t < 1 ? .2 : 0,
      cam: { pos: [14, 5, -.8], look: [0, 5.4, -.8], fov: 52, to: { pos: [13.2, 5, -.8], look: [0, 5.4, -.8], fov: 50 } },
      update: (w, p, t) => { w.p.eyes.forEach(e => e.scale.setScalar(1)); const walk = Math.min(t, .7) / .7; stand(w, 0, -4.4 + walk * 3.5, 0); neckLen(w, 3.2); pose(w.p, .3); const hit = t > .7; w.p.head.position.z = hit ? -.2 : 0; w.p.head.rotation.x = hit ? -.4 : 0; w.p.eyes.forEach(e => e.scale.set(1, hit ? .3 : 1, 1)); w.stars.children.forEach(s => { const a = s.userData.i / 5 * Math.PI * 2 + t * 4; s.position.set(Math.cos(a) * .9, 7.4, w.pp.position.z - .2 + Math.sin(a) * .9); s.visible = hit; }); } },
    { say: 'The top shelf? Easy.', show: ['floor', 'wall', 'pp', 'neck', 'spots', 'shelf'], sky: '#E3F0D8', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [0, 4.5, 13], look: [0, 5.4, 0], fov: 52, to: { pos: [0, 4.5, 12.3], look: [0, 5.4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); neckLen(w, 3.2); pose(w.p, .3); w.shelf.position.set(0, 7.6, -1.2); const grab = p > .5; w.jar.position.set(0, grab ? -1.5 : .2, grab ? 2.1 : 0); w.p.head.rotation.x = grab ? .25 : -.2; w.p.mouth.scale.set(1, grab ? 2.2 : 1, 1); } },
    { say: 'And winter? A very long scarf.', show: ['floor', 'wall', 'pp', 'neck', 'spots', 'scarf'], sky: '#BCD3E8', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [0, 4, 13], look: [0, 5.6, 0], fov: 52, to: { pos: [0, 4, 12.2], look: [0, 5.6, 0], fov: 50 } },
      update: (w, p, t) => { w.p.mouth.scale.set(1, 1, 1); w.jar.position.set(0, .2, 0); stand(w, 0, 0, 0); neckLen(w, 3.2); w.scarf.visible = true; pose(w.p, .3); const n = Math.min(7, Math.floor(p * 9) + 1); w.scarf.children.forEach(r => { const i = r.userData.i; r.position.set(0, 2.9 + i * .45, 0); r.rotation.set(Math.PI / 2, 0, 0); r.visible = i < n; }); w.p.eyes.forEach(e => e.scale.set(1, n >= 7 ? .4 : 1, 1)); w.pp.rotation.z = .03 * Math.sin(t * 20); } },
    { say: 'Giraffe necks: useful, cool, or way too tall? Comment below.',
      quiz: { q: 'Would you want a giraffe neck?', options: ['Useful', 'Cool', 'Way too tall'], answer: 'Made up for people. A giraffe neck has seven bones, the same number as ours.' },
      show: ['floor', 'pp', 'neck', 'spots'], sky: '#274B73', lightAt: [0, 7, 5], lightDist: 16,
      cam: { pos: [1, 1.2, 16], look: [0, 6, 0], fov: 56, to: { pos: [-1, 1.2, 16], look: [0, 6, 0] } },
      update: (w, p, t) => { w.p.eyes.forEach(e => e.scale.setScalar(1)); w.pp.rotation.z = 0; stand(w, 0, 0, .2); neckLen(w, 3.2); pose(w.p, .3); w.p.head.rotation.z = .1 * Math.sin(t * 2); } },
  ],
};
