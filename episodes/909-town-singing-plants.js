// "In This Town" episode 10 (long form). Original story; same townspeople as 900–908.
// Rule: in this town, singing makes plants grow. Bad singing makes them grow wrong. The pumpkin contest.

function avatar(k, parent, c) {
  const { mat, box, cyl, ball, group } = k;
  const a = { root: group([0, 0, 0], parent) };
  const skin = mat(c.skin || '#F2C9A0', { rough: .5 }), shirt = mat(c.shirt, { rough: .6 }), pants = mat(c.pants || '#2F3A4F', { rough: .7 });
  a.legs = [-.5, .5].map(x => { const g = group([x, 2, 0], a.root); box(.95, 2, 1, pants, [0, -1, 0], g); return g; });
  a.torso = box(2, 2, 1, shirt, [0, 3, 0], a.root);
  a.arms = [-1.5, 1.5].map(x => { const g = group([x, 3.9, 0], a.root); box(.95, 2, 1, shirt, [0, -.75, 0], g); box(.9, .45, .95, skin, [0, -1.75, 0], g); return g; });
  a.head = group([0, 4.65, 0], a.root);
  cyl(.62, .62, 1.25, skin, [0, 0, 0], a.head, 24);
  for (const x of [-.24, .24]) box(.13, .3, .05, mat('#111111'), [x, .12, .6], a.head);
  a.mouth = box(.42, .08, .05, mat('#5A1E1E'), [0, -.25, .6], a.head);
  if (c.hair) { const hm = mat(c.hair, { rough: .8 }); box(1.34, .35, 1.34, hm, [0, .65, -.02], a.head); if (c.long) box(1.34, 1.3, .3, hm, [0, -.05, -.55], a.head); }
  if (c.hat) { const hm = mat('#111111', { rough: .4 }); cyl(.9, .9, .08, hm, [0, .66, 0], a.head, 24); cyl(.55, .55, 1, hm, [0, 1.2, 0], a.head, 24); }
  if (c.apron) box(1.6, 1.8, .06, mat('#FFFFFF'), [0, 2.9, .53], a.root);
  if (c.weights) for (const x of [-.5, .5]) cyl(.62, .62, .4, mat('#555555', { metal: .6 }), [x, .3, 0], a.root, 16);
  return a;
}
function pose(a, x, y, z, ry, t = 0, talk = false, wave = 0) {
  a.root.position.set(x, y, z); a.root.rotation.set(0, ry, 0);
  a.legs.forEach(l => l.rotation.set(0, 0, 0)); a.arms[0].rotation.set(0, 0, 0); a.arms[1].rotation.set(0, 0, wave ? 2.4 + .3 * Math.sin(t * 8) : 0);
  a.mouth.scale.y = talk ? 1 + 2.5 * Math.abs(Math.sin(t * 13)) : 1; a.head.rotation.set(0, 0, 0);
}
function sit(a) { a.legs.forEach(l => l.rotation.x = -1.5); a.root.position.y -= 1.05; }
function hand(a) { a.root.updateMatrixWorld(true); const v = new a.root.position.constructor(0, -1.95, 0); a.arms[1].localToWorld(v); return v; }

function makeCat(k, color, parent) {
  const { mat, box, cone, group } = k; const c = { g: group([0, 0, 0], parent) }; const fur = mat(color, { rough: .9 });
  box(1.4, .7, .7, fur, [0, .55, 0], c.g); c.legs = []; for (const x of [-.5, .5]) for (const z of [-.25, .25]) c.legs.push(box(.18, .35, .18, fur, [x, .18, z], c.g));
  c.tail = box(.12, .9, .12, fur, [-.75, .9, 0], c.g); c.tail.rotation.z = .5;
  c.head = group([.85, 1.05, 0], c.g); box(.6, .55, .6, fur, [0, 0, 0], c.head); for (const z of [-.18, .18]) cone(.12, .25, fur, [0, .38, z], c.head, 4);
  for (const z of [-.13, .13]) box(.03, .14, .08, mat('#111111'), [.31, .06, z], c.head); c.mouth = box(.03, .05, .16, mat('#5A1E1E'), [.31, -.13, 0], c.head);
  return c;
}

function h1(x) { x = Math.max(0, Math.min(1, x)); return 1 - (1 - x) * (1 - x); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -12], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -12], w.town, 4); r.rotation.y = Math.PI / 4; }
  w.bath = group(); box(20, .2, 14, mat('#DDEFF5'), [0, -.1, 0], w.bath); box(20, 12, .3, mat('#BFE3F7'), [0, 6, -4], w.bath); box(4, 1.4, 2.4, mat('#FFFFFF'), [-3, .7, -2.4], w.bath); cyl(.08, .08, 4, mat('#AAAAAA', { metal: .7 }), [-4.4, 4, -3.5], w.bath, 8);
  w.jungle = group(); for (let i = 0; i < 16; i++) { const v = group([i < 8 ? -8 + i * 2.2 : (i < 12 ? -8 : 8), 0, i < 8 ? -3.4 : -2 + (i % 4) * 1.2], w.jungle); const s = cyl(.12, .16, 1, mat('#2E8B4A'), [0, .5, 0], v, 8); const l = ball(1, mat(['#2E8B4A', '#3FA34D', '#1F7A3A'][i % 3]), [0, 1.2, 0], v); v.userData.i = i; }
  w.stall = group(); box(4, 1.6, 1.4, mat('#FFC21F'), [0, .8, 1.2], w.stall); for (let i = 0; i < 8; i++) ball(.12, mat('#F97316'), [-1.4 + i * .4, 1.72, 1.2], w.stall);
  w.desert = group(); box(14, .06, 8, mat('#E8C98A', { rough: 1 }), [0, .03, -1], w.desert); for (let i = 0; i < 3; i++) { const c = group([-3 + i * 3, 0, -2], w.desert); cyl(.35, .35, 2.4, mat('#3FA34D'), [0, 1.2, 0], c, 10); const a = cyl(.22, .22, 1, mat('#3FA34D'), [.5, 1.6, 0], c, 8); a.rotation.z = -1; }
  // the show: a field with a judging table and three pumpkin plots
  w.show = group(); box(30, .06, 12, mat('#6B8E3A', { rough: 1 }), [0, .03, 0], w.show); box(18, .2, 1, mat('#FFFFFF'), [0, 3, -5], w.show); box(9, 1.2, .1, mat('#E2453C'), [0, 7.5, -5.5], w.show); for (const x of [-8.6, 8.6]) cyl(.15, .15, 8, mat('#FFFFFF'), [x, 4, -5.5], w.show, 8);
  for (const x of [-6, 0, 6]) box(4, .1, 3, mat('#5A3A22', { rough: 1 }), [x, .06, 0], w.show);
  w.pumpkins = {}; for (const [n, x] of [['lee', -6], ['ours', 0], ['mayor', 6]]) { const g = group([x, 0, 0], w.show); const p = group([0, 0, 0], g); for (let i = 0; i < 6; i++) { const r = ball(1, mat('#F28C28', { rough: .5 }), [0, 0, 0], p); r.scale.set(.45, 1, 1); r.rotation.y = i / 6 * Math.PI; } cyl(.12, .14, .5, mat('#3A6B2A'), [0, 1.1, 0], p, 8); g.userData.p = p; w.pumpkins[n] = g; }
  w.cactus = group(); cyl(.5, .5, 3, mat('#3FA34D'), [0, 1.5, 0], w.cactus, 10); const ca = cyl(.3, .3, 1.2, mat('#3FA34D'), [.7, 2, 0], w.cactus, 8); ca.rotation.z = -1;
  w.ribbon = group(); cyl(.5, .5, .06, mat('#FFC21F', { metal: .5 }), [0, 0, 0], w.ribbon, 24); box(.25, .8, .04, mat('#3B82F6'), [-.15, -.6, 0], w.ribbon); box(.25, .8, .04, mat('#3B82F6'), [.15, -.6, 0], w.ribbon);
  w.notes = group(); for (let i = 0; i < 6; i++) { const n = group([0, 0, 0], w.notes); ball(.14, mat('#111111'), [0, 0, 0], n); box(.04, .45, .04, mat('#111111'), [.12, .22, 0], n); n.userData.i = i; n.traverse(o => o.castShadow = false); }
  w.c = { biscuit: makeCat(k, '#E8913A', k.scene) }; w.catG = w.c.biscuit.g;
  w.milo = avatar(k, k.scene, { shirt: '#3B82F6', hair: '#3A2A1A' }).root;
  w.rosie = avatar(k, k.scene, { shirt: '#E2453C', hair: '#C2683A', long: true, skin: '#C68A5A' }).root;
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#8A5A3B', apron: true, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hat: true }).root;
  return w;
}

const H = {};
function A(w, n) { if (H[n]) return H[n]; const r = w[n]; const c = r.children; H[n] = { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head: c[5], mouth: c[5].children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) }; return H[n]; }
function P(w, n, x, y, z, ry, t, talk = false, wave = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); return a; }
function sing(a, t) { a.mouth.scale.y = 1 + 3 * Math.abs(Math.sin(t * 6)); a.head.rotation.z = .12 * Math.sin(t * 3); a.arms[0].rotation.z = -.7; a.arms[1].rotation.z = .7; }
function notes(w, x, y, z, t, on = true) { w.notes.visible = on; w.notes.children.forEach(n => { const i = n.userData.i, q = (t * .6 + i / 6) % 1; n.position.set(x + Math.sin(i * 2 + t * 2) * .8 + q * .6, y + q * 2.6, z); n.scale.setScalar(.6 + q); }); }
function pump(w, n, s) { const g = w.pumpkins[n]; g.userData.p.scale.setScalar(s); g.userData.p.position.y = s; }
function cat(w, x, z, ry, o = {}) { const c = w.c.biscuit; w.catG.visible = true; w.catG.position.set(x, o.y || 0, z); w.catG.rotation.set(0, ry, 0); w.catG.scale.setScalar(o.s || 1.3); c.mouth.scale.y = o.talk ? 1 + 3 * Math.abs(Math.sin((o.t || 0) * 9)) : 1; c.head.rotation.set(0, 0, o.talk ? .12 * Math.sin((o.t || 0) * 3) : 0); }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 30 }, o);
const SHOW = ['ground', 'town', 'show', 'notes'];
const nocat = w => { w.catG.visible = false; };
// the contest base state: pumpkins sized, people placed
function contest(w, t, sz, who = [], o = {}) {
  pump(w, 'lee', sz[0]); pump(w, 'ours', sz[1]); pump(w, 'mayor', sz[2]);
  const l = P(w, 'lee', -8.8, 0, 1.4, .3, t); const m = P(w, 'milo', -2.7, 0, 1.4, .3, t); const r = P(w, 'rosie', 2.7, 0, 1.4, -.3, t); const ma = P(w, 'mayor', 8.8, 0, 1.4, -.3, t);
  for (const n of who) sing(A(w, n), t);
  cat(w, o.catX ?? 4.4, 2.8, -Math.PI / 2, { talk: o.catSing, t, s: 1.2 });
  w.cactus.visible = !!o.cactus; if (o.cactus) { w.cactus.position.set(0, 0, 0); w.cactus.scale.setScalar(o.cactus); }
  return { l, m, r, ma };
}

export default {
  id: '909',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SINGING GROWS PLANTS',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'SINGING GROWS PLANTS.'],
  title: 'In this town, singing makes plants grow',
  description: 'In this town, plants grow when you sing to them. Bad singing makes them grow wrong. Rosie and I entered the pumpkin contest. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, songs grow plants.', { show: [...SHOW, 'rosie'], cam: F(1.2, 3, .6, 13, .68, 1.5), update: (w, p, t) => { nocat(w); w.cactus.visible = false; pump(w, 'lee', .01); pump(w, 'mayor', .01); pump(w, 'ours', .2 + 1.2 * h1((t - .3) / 1.4)); const r = P(w, 'rosie', 2.6, 0, 1.4, -.5, t); sing(r, t); notes(w, 3, 5.6, 1.4, t); } }),
    S('Sing to a seed, and it grows. Fast.', { show: [...SHOW, 'rosie'], cam: F(1.2, 2.8, .6, 12, .5, -1.5), update: (w, p, t) => { nocat(w); w.cactus.visible = false; pump(w, 'lee', .01); pump(w, 'mayor', .01); pump(w, 'ours', 1.4 + .6 * p); const r = P(w, 'rosie', 2.6, 0, 1.4, -.5, t); sing(r, t); notes(w, 3, 5.6, 1.4, t); } }),
    S('Dave sings in the shower. His bathroom is a jungle.', { label: '*DAVE*', sky: '#BFE3F7', show: ['bath', 'jungle', 'dave', 'notes'], cam: F(0, 4, 0, 12, .55, 1.5), update: (w, p, t) => { nocat(w); const d = P(w, 'dave', -1, 0, 0, 0, t); sing(d, t); notes(w, -.6, 5.6, 0, t); w.jungle.children.forEach(v => { const s = .4 + 1.8 * h1(p * 1.3 - (v.userData.i % 5) * .05); v.scale.set(s, s * 1.6, s); }); } }),
    S('Barry has an earplug stand. Five dollars a pair.', { label: '*BARRY*', show: ['ground', 'town', 'stall', 'barry', 'notes'], cam: F(0, 4, 0, 10, .55, 1.5), update: (w, p, t) => { nocat(w); notes(w, 0, 0, 0, t, false); P(w, 'barry', 0, 0, -.4, 0, t, true, 1); } }),
    S('The mayor can\'t sing at all. His garden is a desert.', { label: '*THE MAYOR*', sky: '#F7D9A0', show: ['ground', 'desert', 'mayor', 'notes'], cam: F(0, 3.6, 0, 13, .55, 2), update: (w, p, t) => { nocat(w); const m = P(w, 'mayor', 0, 0, 1.6, 0, t); if (p > .3) sing(m, t); notes(w, .4, 6.2, 1.6, t, p > .3); } }),
    S('And me? I\'m Milo. I also can\'t sing.', { label: '*MILO*', show: ['ground', 'town', 'milo', 'notes'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { nocat(w); notes(w, 0, 0, 0, t, false); P(w, 'milo', 0, 0, 0, 0, t, false, p < .4 ? 1 : 0); } }),
    S('Today was the giant pumpkin contest.', { label: 'PUMPKIN DAY', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(0, 3.4, 1, 26, .5, 3, 3), update: (w, p, t) => { contest(w, t, [.01, .01, .01]); notes(w, 0, 0, 0, t, false); } }),
    S('Missus Lee sang a love song. Her pumpkin got huge.', { label: '*MRS LEE*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(-7, 3.6, 1, 15, .55, -2), update: (w, p, t) => { contest(w, t, [.3 + 2 * h1(p * 1.2), .01, .01], ['lee']); notes(w, -8.4, 5.6, 1.4, t); } }),
    S('The mayor sang at his. It turned into a cactus.', { label: '*THE MAYOR*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(7, 3.6, 1, 15, .55, 2), update: (w, p, t) => { const o = contest(w, t, [2.3, .01, p < .5 ? .6 : .01], ['mayor']); notes(w, 9.2, 6.2, 1.4, t); w.cactus.visible = p > .5; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(.4 + h1((p - .5) * 3)); } }),
    S('Then it was our turn.', { show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(0, 4, 1.4, 15, .55), update: (w, p, t) => { contest(w, t, [2.3, .25, .01]); notes(w, 0, 0, 0, t, false); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('Rosie sang beautifully. Our pumpkin grew and grew.', { label: '*ROSIE*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(0, 3.6, 1.5, 15, .55, 1.5), update: (w, p, t) => { contest(w, t, [2.3, .25 + 1.8 * h1(p * 1.2), .01], ['rosie']); notes(w, 3.1, 5.6, 1.4, t); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('Then I joined in.', { label: '*MILO*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(-2.7, 4.65, 1.4, 7, .55, -.8), update: (w, p, t) => { contest(w, t, [2.3, 2.05, .01], p > .4 ? ['rosie', 'milo'] : ['rosie']); notes(w, -2.3, 5.6, 1.4, t); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('Then it started shrinking.', { show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(0, 2.4, 0, 10, .5, 1.5, 1), update: (w, p, t) => { contest(w, t, [2.3, 2.05 - 1.6 * h1(p), .01], ['rosie', 'milo']); notes(w, 0, 5.6, 1.4, t); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('Rosie gave me a look. I stopped.', { label: '*ROSIE*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(2.7, 4.65, 1.4, 6, .55, .6), update: (w, p, t) => { const o = contest(w, t, [2.3, .45, .01], p < .5 ? ['milo'] : []); o.r.root.rotation.y = -.9; o.r.mouth.scale.set(1.4, .4, 1); notes(w, 0, 0, 0, t, false); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('Then Mister Biscuit started to sing.', { label: '*MR BISCUIT*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(4.4, 1.6, 2.8, 5, .5, 1.5, .8), update: (w, p, t) => { contest(w, t, [2.3, .45, .01], [], { catSing: p > .3 }); notes(w, 4.4, 2.2, 2.8, t, p > .3); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('Our pumpkin grew. And grew. And grew.', { show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus'], cam: F(0, 5, 0, 28, .5, 3, 4), update: (w, p, t) => { contest(w, t, [2.3, .45 + 5.5 * h1(p * 1.1), .01], [], { catSing: true }); notes(w, 4.4, 2.2, 2.8, t); w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); for (const n of ['lee', 'milo', 'rosie', 'mayor']) A(w, n).mouth.scale.y = 3; } }),
    S('First prize: Mister Biscuit.', { label: '*FIRST PRIZE*', show: [...SHOW, 'lee', 'milo', 'rosie', 'mayor', 'catG', 'cactus', 'ribbon'], cam: F(4.4, 1.8, 2.8, 5, .5, -1.2, .8), update: (w, p, t) => { contest(w, t, [2.3, 6, .01]); notes(w, 0, 0, 0, t, false); w.ribbon.position.set(4.7, 1.4, 2.8); w.ribbon.rotation.set(Math.PI / 2, 0, 0); w.ribbon.rotation.x = 0; w.cactus.visible = true; w.cactus.position.set(6, 0, 0); w.cactus.scale.setScalar(1.4); } }),
    S('By morning, he had eaten half of it.', { label: 'NEXT DAY', show: [...SHOW, 'catG', 'ribbon'], cam: F(0, 3.6, 0, 16, .5, 2, 1), update: (w, p, t) => { pump(w, 'lee', .01); pump(w, 'mayor', .01); pump(w, 'ours', 6); w.pumpkins.ours.userData.p.scale.set(6, 6, 3); w.pumpkins.ours.userData.p.position.z = -3; cat(w, 0, 3.4, -Math.PI / 2, { y: 0, s: 2.2 }); w.catG.scale.set(2.2 * 1.4, 2.2, 2.2); w.ribbon.position.set(.4, 2.6, 4.6); w.cactus.visible = false; notes(w, 0, 0, 0, t, false); } }),
  ],
};
