// Pilot: "In This Town" (new long-form format, ~90 s). Original story; format studied in channel/research-in-this-town.md.
// Rule: in this town every lie becomes a balloon tied to your wrist. Blocky game-style townspeople, own designs.

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

function balloon(k, color) {
  const b = { g: k.group([0, 0, 0]) };
  b.ball = k.ball(1, k.mat(color, { rough: .25 }), [0, 0, 0], b.g); b.ball.scale.y = 1.15;
  b.knot = k.cone(.18, .3, k.mat(color, { rough: .25 }), [0, 0, 0], b.g, 10);
  b.str = k.cyl(.025, .025, 1, k.mat('#FFFFFF'), [0, 0, 0], b.g, 4); b.str.castShadow = false;
  return b;
}
function tie(b, H, r, L, t, ph = 0) {
  const top = H.clone(); top.x += .35 * Math.sin(t * 1.3 + ph) * L / 4; top.y += L; top.z += .2 * Math.cos(t + ph);
  b.ball.scale.set(r, r * 1.15, r); b.ball.position.copy(top); b.ball.position.y += r * 1.1;
  b.knot.position.copy(top); b.knot.position.y += .05; b.knot.rotation.x = Math.PI;
  b.str.position.copy(H).add(top).multiplyScalar(.5); b.str.scale.y = H.distanceTo(top); b.str.quaternion.setFromUnitVectors(new H.constructor(0, 1, 0), top.clone().sub(H).normalize());
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  box(80, .05, 6, mat('#5E6670', { rough: 1 }), [0, .03, 4], w.town);
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -8], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -8], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -5.95], w.town); box(1.1, 1.1, .1, mat('#BFE3F7', { glow: .2 }), [hx + 1.2, 2.8, -5.95], w.town); }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -3.2], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  w.room = group();
  box(24, .2, 16, mat('#C79A6B'), [0, -.1, 0], w.room);
  box(24, 12, .3, mat('#F3E0C7'), [0, 6, -5], w.room);
  w.window = group([6.5, 0, 0], w.room); box(5, 4, .1, mat('#1E2A4A'), [0, 6, -4.8], w.window); box(5.4, .3, .3, mat('#FFFFFF'), [0, 8, -4.75], w.window); box(5.4, .3, .3, mat('#FFFFFF'), [0, 4, -4.75], w.window); box(.3, 4, .3, mat('#FFFFFF'), [0, 6, -4.75], w.window);
  w.dinner = group();
  box(6, .3, 3.4, mat('#8A5A3B'), [0, 2.4, 0], w.dinner); for (const x of [-2.7, 2.7]) for (const z of [-1.4, 1.4]) box(.3, 2.4, .3, mat('#6B4428'), [x, 1.2, z], w.dinner);
  const dish = group([0, 2.6, 0], w.dinner); box(1.8, .5, 1.2, mat('#FFFFFF'), [0, 0, 0], dish); box(1.6, .2, 1, mat('#D9402E'), [0, .3, 0], dish); box(1.6, .1, 1, mat('#F7D774'), [0, .42, 0], dish);
  for (const p of [[-2.2, 0, -2.3, 0], [0, 0, -2.3, 0], [2.2, 0, -2.3, 0]]) { const ch = group([p[0], 0, p[2]], w.dinner); ch.rotation.y = p[3]; box(1.6, .2, 1.6, mat('#6B4428'), [0, 1.3, 0], ch); for (const x of [-.65, .65]) for (const z of [-.65, .65]) box(.15, 1.3, .15, mat('#6B4428'), [x, .65, z], ch); box(1.6, 1.8, .15, mat('#6B4428'), [0, 2.2, -.75], ch); }
  w.milo = avatar(k, k.scene, { shirt: '#3B82F6', hair: '#3A2A1A' }).root;
  w.rosie = avatar(k, k.scene, { shirt: '#E2453C', hair: '#C2683A', long: true, skin: '#C68A5A' }).root;
  w.mum = avatar(k, k.scene, { shirt: '#A855F7', hair: '#C2683A', long: true, skin: '#C68A5A', pants: '#4A2A5A' }).root;
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#8A5A3B', apron: true, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hat: true, weights: true }).root;
  w.av = {}; for (const n of ['milo', 'rosie', 'mum', 'dave', 'lee', 'barry', 'mayor']) w.av[n] = w[n].userData.av = null;
  return w;
}

// avatar handles live on the root's children; rebuild the handle objects once
const H = {};
function A(w, n) { if (H[n]) return H[n]; const r = w[n]; const c = r.children; H[n] = { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head: c[5], mouth: c[5].children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) }; return H[n]; }

const T = Math.tan(23 * Math.PI / 180);
const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const B = {};
function bal(w, k, key, color) { if (!B[key]) { B[key] = balloon(k, color); } const b = B[key]; b.g.visible = true; return b; }
function hideB() { for (const key in B) B[key].g.visible = false; }

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 26 }, o);
const TOWN = ['ground', 'town'];
const ROOM = ['room', 'dinner'];

export default {
  id: '900',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LIES FLOAT',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'LIES FLOAT.'],
  title: 'In this town, every lie becomes a balloon',
  description: 'In this town, every lie you tell becomes a balloon tied to your wrist. I have never told one. Until dinner at Rosie\'s. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, lies float.', { show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 11, .56), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, 0, t, true); tie(bal(w, k, 'd1', '#E2453C'), hand(A(w, 'dave')), .9, 3.4, t); } }),
    S('Every lie you tell becomes a balloon.', { show: [...TOWN, 'dave'], cam: F(0, 4.6, 0, 13, .52, 2), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, -.2, t, true); tie(bal(w, k, 'd1', '#E2453C'), hand(A(w, 'dave')), .3 + .6 * Math.min(1, t), 3.4, t); } }),
    S('Tied to your wrist. All day.', { show: [...TOWN, 'dave'], cam: F(0, 3.4, 0, 9, .5, -2), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, -.6, t); const a = A(w, 'dave'); a.legs[0].rotation.x = .5 * Math.sin(t * 6); a.legs[1].rotation.x = -.5 * Math.sin(t * 6); a.root.position.x = -1 + t * .5; tie(bal(w, k, 'd1', '#E2453C'), hand(a), .9, 3.4, t); } }),
    S('Little lies, little balloons.', { show: [...TOWN, 'dave'], cam: F(0, 4.6, 0, 12, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, 0, t); tie(bal(w, k, 'd1', '#E2453C'), hand(A(w, 'dave')), .5, 2.6, t); } }),
    S('Big lies? Huge balloons.', { show: [...TOWN, 'dave'], cam: F(0, 6, 0, 20, .62), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, 0, t, true); tie(bal(w, k, 'd1', '#E2453C'), hand(A(w, 'dave')), .5 + 3.5 * Math.min(1, t / .8), 4, t); } }),
    S('This is Dave.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, 0, t, false, 1); for (let i = 0; i < 6; i++) tie(bal(w, k, 'dc' + i, ['#E2453C', '#3B82F6', '#FFC21F', '#22C55E', '#A855F7', '#F97316'][i]), hand(A(w, 'dave')), .7, 3 + (i % 3) * .8, t, i * 1.3); } }),
    S('Dave says he\'s five minutes away. A lot.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 6, 0, 16, .6), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 0, 0, 0, t, true); const n = 6 + Math.floor(p * 10); for (let i = 0; i < n; i++) tie(bal(w, k, 'dc' + i, ['#E2453C', '#3B82F6', '#FFC21F', '#22C55E', '#A855F7', '#F97316'][i % 6]), hand(A(w, 'dave')), .7, 3 + (i % 4) * .8, t, i * 1.3); } }),
    S('He hasn\'t touched the ground since March.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 7, 0, 16, .58), update: (w, p, t, k) => { hideB(); pose(A(w, 'dave'), 0, 2.5 + p * 2 + .2 * Math.sin(t * 2), 0, 0, t); const a = A(w, 'dave'); a.legs[0].rotation.x = .3 * Math.sin(t * 3); a.legs[1].rotation.x = -.3 * Math.sin(t * 3); for (let i = 0; i < 16; i++) tie(bal(w, k, 'dc' + i, ['#E2453C', '#3B82F6', '#FFC21F', '#22C55E', '#A855F7', '#F97316'][i % 6]), hand(a), .7, 3 + (i % 4) * .8, t, i * 1.3); } }),
    S('This is Missus Lee.', { label: '*MRS LEE*', show: [...TOWN, 'lee'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'lee'), 0, 0, 0, 0, t, false, 1); } }),
    S('She told her kids the ice cream van only plays music when it\'s empty.', { label: '*MRS LEE*', show: [...TOWN, 'lee'], cam: F(0, 4.65, 0, 11, .55, 2), update: (w, p, t, k) => { hideB(); pose(A(w, 'lee'), 0, 0, 0, -.2, t, true); tie(bal(w, k, 'l1', '#22C55E'), hand(A(w, 'lee')), .6, 2.8, t); } }),
    S('Her balloon is the size of a bus.', { label: '*MRS LEE*', show: [...TOWN, 'lee'], cam: F(0, 9, 0, 34, .7), update: (w, p, t, k) => { hideB(); pose(A(w, 'lee'), 0, 0, 0, 0, t); tie(bal(w, k, 'l1', '#22C55E'), hand(A(w, 'lee')), .6 + 6 * h1(t / .9), 5, t); } }),
    S('Then there\'s Barry.', { label: '*BARRY*', show: [...TOWN, 'barry'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'barry'), 0, 0, 0, 0, t, false, 1); } }),
    S('Barry sells pins. Five dollars a pop.', { label: '*BARRY*', show: [...TOWN, 'barry', 'dave'], cam: F(1.5, 5, 0, 14, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'barry'), -1.2, 0, 0, .6, t, true); A(w, 'barry').arms[1].rotation.z = 1.4; pose(A(w, 'dave'), 3.6, 0, -.5, -.5, t); if (t < 1.2) tie(bal(w, k, 'dc0', '#E2453C'), hand(A(w, 'dave')), .9, 3.2, t); } }),
    S('The mayor wears ankle weights. Nobody asks why.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor'], cam: F(0, 4.65, 0, 15, .5), update: (w, p, t, k) => { hideB(); pose(A(w, 'mayor'), 0, 0, 0, 0, t, false, 1); for (let i = 0; i < 12; i++) tie(bal(w, k, 'm' + i, ['#FFC21F', '#E2453C', '#3B82F6'][i % 3]), hand(A(w, 'mayor')), .8, 3 + (i % 4) * .9, t, i * 1.7); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'milo'), 0, 0, 0, 0, t, false, 1); } }),
    S('I have never told a lie. Not one.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 3.6, 0, 7, .5, 1.5), update: (w, p, t, k) => { hideB(); pose(A(w, 'milo'), 0, 0, 0, -.3, t);  } }),
    S('Until tonight.', { label: (l) => l < .6 ? '7:58 PM' : '*7:58 PM*', sky: '#2C3E6B', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t, k) => { hideB(); pose(A(w, 'milo'), 0, 0, 0, 0, t); A(w, 'milo').head.rotation.y = .3 * Math.sin(t * 2); } }),
    S('Dinner at Rosie\'s house.', { label: '*ROSIE*', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(0, 3.6, -2.3, 13, .5, 0, 1.5), update: (w, p, t, k) => { hideB(); seat3(w, t, 'rosie'); } }),
    S('Her mum made lasagne.', { label: '*ROSIE\'S MUM*', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(2.2, 3.6, -2.3, 7, .5, .8), update: (w, p, t, k) => { hideB(); seat3(w, t, 'mum'); } }),
    S('It tasted like a wet shoe.', { sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(0, 3.6, -2.3, 6, .5, .6), update: (w, p, t, k) => { hideB(); seat3(w, t, null); A(w, 'milo').mouth.scale.set(1, 3, 1); A(w, 'milo').head.rotation.z = .1 * Math.sin(t * 9); } }),
    S('Then she asked: do you like it?', { label: '8:04 PM', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(2.2, 3.6, -2.3, 7, .5, .8), update: (w, p, t, k) => { hideB(); seat3(w, t, 'mum'); } }),
    S('I said: I love it.', { label: '8:04 PM', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(0, 3.6, -2.3, 7, .5, .6), update: (w, p, t, k) => { hideB(); seat3(w, t, 'milo'); if (t > 1) tie(bal(w, k, 'me', '#3B82F6'), hand(A(w, 'milo')), .3 + .4 * h1((t - 1) / .3), 2, t); } }),
    S('And then my balloon came out.', { sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(0, 5.4, -2.3, 16, .63), update: (w, p, t, k) => { hideB(); seat3(w, t, null); tie(bal(w, k, 'me', '#3B82F6'), hand(A(w, 'milo')), .7 + 3.3 * h1(t / 1.2), 3.8, t); } }),
    S('The biggest balloon in town history.', { sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(0, 6.5, -2.3, 22, .68), update: (w, p, t, k) => { hideB(); seat3(w, t, null); tie(bal(w, k, 'me', '#3B82F6'), hand(A(w, 'milo')), 4 + p, 3.8, t); } }),
    S('Rosie stared at me. Then her balloon appeared too.', { label: '*ROSIE*', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(-2.2, 3.6, -2.3, 9, .58, -.8), update: (w, p, t, k) => { hideB(); seat3(w, t, null); A(w, 'rosie').head.rotation.y = .4; if (p > .45) tie(bal(w, k, 'ro', '#E2453C'), hand(A(w, 'rosie')), .3 + 2.2 * h1((p - .45) / .3), 3.8, t, 1); } }),
    S('She told me she helped cook.', { label: '*ROSIE*', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(-2.2, 3.6, -2.3, 9, .58, -.8), update: (w, p, t, k) => { hideB(); seat3(w, t, 'rosie'); tie(bal(w, k, 'ro', '#E2453C'), hand(A(w, 'rosie')), 2.5, 3.8, t, 1); } }),
    S('Then her mum\'s popped out. The lasagne was from a shop.', { label: '*ROSIE\'S MUM*', sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(2.2, 3.6, -2.3, 10, .6, .8), update: (w, p, t, k) => { hideB(); seat3(w, t, null); A(w, 'mum').mouth.scale.y = 3; if (p > .2) tie(bal(w, k, 'mu', '#A855F7'), hand(A(w, 'mum')), .3 + 3 * h1((p - .2) / .3), 3.8, t, 2); } }),
    S('Three balloons. One table.', { sky: '#F3E0C7', show: [...ROOM, 'rosie', 'milo', 'mum'], cam: F(0, 6, -2.3, 24, .64), update: (w, p, t, k) => { hideB(); lift(w, k, t, p * .8, false); } }),
    S('The whole dinner floated out the window.', { label: '8:07 PM', sky: '#1E2A4A', show: [...TOWN, 'dinner', 'rosie', 'milo', 'mum'], cam: F(0, 12, 0, 30, .58, 6), update: (w, p, t, k) => { hideB(); lift(w, k, t, 6 + p * 5, true); } }),
    S('We passed the mayor. He waved.', { label: '*THE MAYOR*', sky: '#1E2A4A', show: [...TOWN, 'dinner', 'rosie', 'milo', 'mum', 'mayor'], cam: F(4, 13, 0, 28, .55, 4), update: (w, p, t, k) => { hideB(); lift(w, k, t, 12, true); pose(A(w, 'mayor'), 9, 10 + .3 * Math.sin(t * 2), -2, -.6, t, false, 1); for (let i = 0; i < 12; i++) tie(bal(w, k, 'm' + i, ['#FFC21F', '#E2453C', '#3B82F6'][i % 3]), hand(A(w, 'mayor')), .8, 3 + (i % 4) * .9, t, i * 1.7); } }),
    S('We passed Dave. He said he\'d be down in five minutes.', { label: '*DAVE*', sky: '#1E2A4A', show: [...TOWN, 'dinner', 'rosie', 'milo', 'mum', 'dave'], cam: F(-4, 13, 0, 28, .55, -4), update: (w, p, t, k) => { hideB(); lift(w, k, t, 12, true); pose(A(w, 'dave'), -9, 11 + .3 * Math.sin(t * 2), -2, .6, t, true); const n = 16 + (p > .7 ? 1 : 0); for (let i = 0; i < n; i++) tie(bal(w, k, 'dc' + i, ['#E2453C', '#3B82F6', '#FFC21F', '#22C55E', '#A855F7', '#F97316'][i % 6]), hand(A(w, 'dave')), .7, 3 + (i % 4) * .8, t, i * 1.3); } }),
    S('Then Barry flew by. Five dollars each, he said.', { label: '*BARRY*', sky: '#1E2A4A', show: [...TOWN, 'dinner', 'rosie', 'milo', 'mum', 'barry'], cam: F(0, 13, 0, 26, .55), update: (w, p, t, k) => { hideB(); lift(w, k, t, 12, true); pose(A(w, 'barry'), -12 + p * 14, 13, 3, 1.2, t, true); A(w, 'barry').arms[1].rotation.z = 1.4; for (let i = 0; i < 4; i++) tie(bal(w, k, 'ba' + i, '#FFFFFF'), hand(A(w, 'barry')), .9, 3 + i * .5, t, i); } }),
    S('Rosie looked at me and said: best date ever.', { label: '*ROSIE*', sky: '#1E2A4A', show: ['dinner', 'rosie', 'milo', 'mum', 'ground', 'town'], cam: F(-.2, 15.6, -2.3, 9, .55, -.6), update: (w, p, t, k) => { hideB(); lift(w, k, t, 12, true); A(w, 'rosie').head.rotation.y = .35; A(w, 'rosie').mouth.scale.y = 1 + 2.5 * Math.abs(Math.sin(t * 13)) * (p > .5 ? 1 : 0); } }),
    S('No balloon.', { label: '*NO BALLOON.*', sky: '#1E2A4A', show: ['dinner', 'rosie', 'milo', 'mum', 'ground', 'town'], cam: F(-.2, 15.6, -2.3, 7, .52, -.4), update: (w, p, t, k) => { hideB(); lift(w, k, t, 12, true); A(w, 'rosie').head.rotation.y = .35; } }),
  ],
};

function h1(x) { x = Math.max(0, Math.min(1, x)); return 1 - (1 - x) * (1 - x); }
function seat3(w, t, who) {
  w.dinner.position.set(0, 0, 0); w.dinner.rotation.set(0, 0, 0);
  pose(A(w, 'rosie'), -2.2, 0, -2.3, 0, t, who === 'rosie'); sit(A(w, 'rosie'));
  pose(A(w, 'milo'), 0, 0, -2.3, 0, t, who === 'milo'); sit(A(w, 'milo'));
  pose(A(w, 'mum'), 2.2, 0, -2.3, 0, t, who === 'mum'); sit(A(w, 'mum'));
}
function lift(w, k, t, y, out) {
  seat3(w, t, null); const yy = y + .2 * Math.sin(t * 1.5);
  w.dinner.position.set(out ? 2 : 0, yy, 0); w.dinner.rotation.z = .04 * Math.sin(t * 1.2);
  for (const n of ['rosie', 'mum', 'milo']) A(w, n).root.position.y += yy, A(w, n).root.position.x += out ? 2 : 0;
  tie(bal(w, k, 'me', '#3B82F6'), hand(A(w, 'milo')), 5, 3, t); tie(bal(w, k, 'ro', '#E2453C'), hand(A(w, 'rosie')), 2.5, 3, t, 1); tie(bal(w, k, 'mu', '#A855F7'), hand(A(w, 'mum')), 3.3, 3, t, 2);
}
