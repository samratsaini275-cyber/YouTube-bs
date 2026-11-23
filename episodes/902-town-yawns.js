// "In This Town" episode 3 (long form). Original story; same town and townspeople as 900 and 901.
// Rule: in this town, a yawn knocks out everyone near you, yourself included. Ends on callbacks to 900 (lies float) and 901 (sorry shrinks).

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

function h1(x) { x = Math.max(0, Math.min(1, x)); return 1 - (1 - x) * (1 - x); }
const lerp = (a, b, x) => a + (b - a) * h1(x);

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -12], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -12], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -9.95], w.town); }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -7.5], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  // roundabout + bus
  w.round = group(); cyl(9.5, 9.5, .04, mat('#5E6670', { rough: 1 }), [0, .02, 0], w.round, 40); cyl(4, 4, .4, mat('#3FA34D'), [0, .2, 0], w.round, 32); cyl(4.2, 4.2, .3, mat('#DDDDDD'), [0, .12, 0], w.round, 32);
  w.bus = group(); box(6, 2.6, 2.4, mat('#FFC21F', { rough: .5 }), [0, 1.8, 0], w.bus); for (let i = 0; i < 4; i++) for (const z of [-1.21, 1.21]) box(1, .9, .02, mat('#1E2A4A', { glow: .1 }), [-2 + i * 1.3, 2.4, z], w.bus); for (const x of [-1.9, 1.9]) for (const z of [-1.1, 1.1]) { const wh = cyl(.5, .5, .3, mat('#222222'), [x, .5, z], w.bus, 16); wh.rotation.x = Math.PI / 2; }
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zz); const m = mat('#FFFFFF', { glow: .8 }); box(.5, .09, .07, m, [0, .22, 0], z); box(.5, .09, .07, m, [0, -.22, 0], z); const d = box(.6, .09, .07, m, [0, 0, 0], z); d.rotation.z = .72; z.userData.i = i; z.traverse(o => o.castShadow = false); }
  // classroom
  w.school = group(); box(30, .2, 20, mat('#B98B5E'), [0, -.1, 0], w.school); box(30, 14, .3, mat('#F3E8C7'), [0, 7, -6], w.school); box(9, 3.6, .1, mat('#2F5D3A'), [0, 5.2, -5.8], w.school); for (let i = 0; i < 4; i++) box(1.4 + i * .3, .1, .02, mat('#FFFFFF'), [-2.8 + i * 1.8, 5.6 - (i % 2) * .9, -5.74], w.school);
  for (let i = 0; i < 3; i++) box(2.2, .2, 1.4, mat('#8A5A3B'), [-4 + i * 4, 1.8, 3], w.school);
  w.kids = []; for (let i = 0; i < 3; i++) w.kids.push(avatar(k, w.school, { shirt: ['#F59E0B', '#06B6D4', '#EC4899'][i], hair: ['#3A2A1A', '#111111', '#D9A35B'][i], long: i === 2 }));
  // coffee stall
  w.stall = group(); box(4, 1.6, 1.4, mat('#6B4428'), [0, .8, 1.2], w.stall); for (let i = 0; i < 6; i++) { cyl(.16, .12, .4, mat('#FFFFFF'), [-1.5 + i * .6, 1.8, 1.2], w.stall, 12); }
  w.podium = group(); box(1.8, 3, 1.2, mat('#6B4428'), [0, 1.5, 1.1], w.podium); box(.08, .6, .08, mat('#333333'), [0, 3.3, 1.2], w.podium); ball(.13, mat('#333333'), [0, 3.65, 1.2], w.podium);
  // party room
  w.party = group(); box(40, .2, 24, mat('#C79A6B'), [0, -.1, 0], w.party); box(40, 14, .3, mat('#F7C6D9'), [0, 7, -6], w.party);
  for (let i = 0; i < 9; i++) { const f = cone(.5, .8, mat(['#E2453C', '#FFC21F', '#3B82F6'][i % 3]), [-8 + i * 2, 8.6, -5.7], w.party, 3); f.rotation.z = Math.PI; }
  box(18, .05, .05, mat('#FFFFFF'), [0, 9, -5.7], w.party);
  box(3, 4.6, .2, mat('#8A5A3B'), [9, 2.3, -5.8], w.party);
  for (let i = 0; i < 6; i++) { const b = ball(.6, mat(['#E2453C', '#FFC21F', '#3B82F6', '#22C55E', '#A855F7', '#F97316'][i]), [-12 + (i % 2) * 1.1, 4 + i * .9, -5.2], w.party); b.scale.y = 1.15; }
  w.cakeT = group(); box(3.4, .2, 2, mat('#FFFFFF'), [0, 2.4, 0], w.cakeT); for (const x of [-1.5, 1.5]) box(.2, 2.4, .2, mat('#DDDDDD'), [x, 1.2, 0], w.cakeT);
  w.cake = group([0, 2.5, 0], w.cakeT); cyl(.9, .9, .6, mat('#F7C6D9'), [0, .3, 0], w.cake, 24); cyl(.6, .6, .5, mat('#FFFFFF'), [0, .85, 0], w.cake, 24); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.28; cyl(.04, .04, .35, mat('#3B82F6'), [Math.cos(a) * .35, 1.27, Math.sin(a) * .35], w.cake, 6); ball(.06, mat('#FFC21F', { glow: 1 }), [Math.cos(a) * .35, 1.5, Math.sin(a) * .35], w.cake); }
  w.crumbs = group([0, 2.5, 0], w.cakeT); cyl(.9, .9, .05, mat('#FFFFFF'), [0, .03, 0], w.crumbs, 24); for (let i = 0; i < 6; i++) box(.1, .08, .1, mat('#F7C6D9'), [Math.cos(i) * .5, .1, Math.sin(i * 2) * .4], w.crumbs);
  w.milo = avatar(k, k.scene, { shirt: '#3B82F6', hair: '#3A2A1A' }).root;
  w.rosie = avatar(k, k.scene, { shirt: '#E2453C', hair: '#C2683A', long: true, skin: '#C68A5A' }).root;
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#8A5A3B', apron: true, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hat: true }).root;
  return w;
}

const H = {};
function hd(r) { const c = r.children; return { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head: c[5], mouth: c[5].children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) }; }
function A(w, n) { return H[n] || (H[n] = hd(w[n])); }
function P(w, n, x, y, z, ry, t, talk = false, wave = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); a.root.scale.setScalar(1); return a; }
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); }
function yawn(a, f) { a.mouth.scale.y = 1 + 7 * f; a.head.rotation.x = -.35 * f; a.arms[0].rotation.z = -3 * f; a.arms[1].rotation.z = 3 * f; }
// fall over sideways, asleep; f 0..1
function drop(a, f, dir = 1) { a.root.rotation.z = dir * 1.5 * h1(f); a.root.position.y += .5 * h1(f); }
function zz(w, x, y, z, t, s = 1) { w.zz.position.set(x, y, z); w.zz.scale.setScalar(s); w.zz.children.forEach(c => { const q = (t * .5 + c.userData.i / 3) % 1; c.position.set(q * 1.2, q * 2.4, 0); c.scale.setScalar(.5 + q * .8); }); }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const B = {};
function bal(k, key, color) { if (!B[key]) B[key] = balloon(k, color); B[key].g.visible = true; return B[key]; }
function hideB() { for (const key in B) B[key].g.visible = false; }

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 28 }, o);
const TOWN = ['ground', 'town'];
const PARTY = { sky: '#F7C6D9', lightAt: [0, 9, 3], lightDist: 30 };
const GUESTS = ['party', 'cakeT', 'milo', 'dave', 'lee', 'barry', 'mayor'];
// guests stand in an arc facing the camera; the door is at the right (x 9)
const SPOT = { barry: [-5.4, -1.5], lee: [-3, -.4], milo: [-.6, .4], dave: [2, -.2], mayor: [4.6, -1.4] };
function guests(w, t, o = {}) {
  w.cake.visible = !o.eaten; w.crumbs.visible = !!o.eaten; w.cakeT.position.set(0, 0, -3.4);
  for (const n in SPOT) { const s = SPOT[n]; const a = P(w, n, s[0], 0, s[1], o.turn ? .9 : -s[0] * .05, t, o.talk === n); if (o.cheer) { a.arms[0].rotation.z = -2.7; a.arms[1].rotation.z = 2.7; } }
}

export default {
  id: '902',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'YAWNS KNOCK YOU OUT',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'YAWNS KNOCK YOU OUT.'],
  title: 'In this town, one yawn puts everyone to sleep',
  description: 'In this town, if you yawn, everyone near you falls asleep on the spot. My job at Rosie\'s surprise party was to keep everyone awake. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, yawns knock you out.', { show: [...TOWN, 'dave', 'lee', 'barry'], cam: F(0, 4.2, 0, 15, .56), update: (w, p, t) => { hideB(); const d = P(w, 'dave', 0, 0, 0, 0, t); P(w, 'lee', -2.6, 0, -2.2, .2, t); P(w, 'barry', 2.6, 0, -.8, -.2, t); yawn(d, Math.min(1, t / .6)); const f = (t - 1.05) / .5; if (f > 0) { drop(A(w, 'lee'), f, 1); drop(A(w, 'barry'), f, 1); drop(d, f, 1); } } }),
    S('Yawn, and everyone near you falls asleep. On the spot.', { show: [...TOWN, 'dave', 'lee', 'barry', 'zz'], cam: { pos: [-1.5, 16, 9], look: [-1.5, 0, -.5], fov: 50, to: { pos: [-1.5, 15, 8], look: [-1.5, 0, -.5], fov: 48 } }, update: (w, p, t) => { for (const [n, x, z, dir] of [['dave', 0, 0, 1], ['lee', -2.6, -2.2, 1], ['barry', 2.6, -.8, 1]]) drop(P(w, n, x, 0, z, 0, t), 1, dir); zz(w, -4, 1.2, 0, t); } }),
    S('Even you.', { show: [...TOWN, 'dave', 'zz'], cam: F(-4.4, .6, 0, 4.5, .5, 1, 1.5), update: (w, p, t) => { drop(P(w, 'dave', 0, 0, 0, 0, t), 1, 1); zz(w, -4.6, 1.2, .3, t, .6); } }),
    S('This is Dave.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t) => { P(w, 'dave', 0, 0, 0, 0, t, false, 1); } }),
    S('Dave yawned on the bus once.', { label: '*DAVE*', show: [...TOWN, 'round', 'bus'], cam: F(0, 2, 0, 24, .45, 0, 12), update: (w, p, t) => { const a = t * .5; w.bus.position.set(Math.cos(a) * 7, 0, Math.sin(a) * 7); w.bus.rotation.y = -a; } }),
    S('Everyone fell asleep. Even the driver.', { show: [...TOWN, 'round', 'bus', 'zz'], cam: F(0, 2, 0, 24, .45, 0, 12), update: (w, p, t) => { const a = 1 + t * .5; w.bus.position.set(Math.cos(a) * 7, 0, Math.sin(a) * 7); w.bus.rotation.y = -a; zz(w, w.bus.position.x, 3.4, w.bus.position.z, t, 1.4); } }),
    S('The bus is still going round the roundabout.', { label: 'DAY 41', show: [...TOWN, 'round', 'bus', 'zz'], cam: F(0, 2, 0, 30, .4, 0, 18), update: (w, p, t) => { const a = 2.5 + t * .9; w.bus.position.set(Math.cos(a) * 7, 0, Math.sin(a) * 7); w.bus.rotation.y = -a; zz(w, w.bus.position.x, 3.4, w.bus.position.z, t, 1.4); } }),
    S('This is Missus Lee. She teaches maths.', { label: '*MRS LEE*', sky: '#F3E8C7', show: ['school', 'lee'], cam: F(0, 4.65, -3, 10, .55), update: (w, p, t) => { const a = P(w, 'lee', 0, 0, -3, 0, t, p > .4, p < .4 ? 1 : 0); w.kids.forEach((c, i) => { pose(c, -4 + i * 4, 0, 4.4, Math.PI, t); c.root.scale.setScalar(.7); }); } }),
    S('Nobody has ever reached the end of her lesson.', { label: '*MRS LEE*', sky: '#F3E8C7', show: ['school', 'lee', 'zz'], cam: F(0, 2.4, 1, 15, .5, 4, 3), update: (w, p, t) => { const a = P(w, 'lee', 0, 0, -3, 0, t); yawn(a, Math.min(1, t / .5) * (t < 1.4 ? 1 : 0)); w.kids.forEach((c, i) => { pose(c, -4 + i * 4, 0, 4.4, Math.PI, t); c.root.scale.setScalar(.7); c.head.rotation.x = .9 * h1((t - 1) / .4); c.torso.rotation.x = 0; }); if (t > 1.4) { drop(a, (t - 1.4) / .4, 1); zz(w, 1, 1.4, -3, t); } } }),
    S('Barry sells coffee. Five dollars a cup.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry'], cam: F(0, 4, 0, 10, .55, 1.5), update: (w, p, t) => { P(w, 'barry', 0, 0, -.4, 0, t, true, 1); } }),
    S('The mayor hasn\'t yawned in twelve years.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { const a = P(w, 'mayor', 0, 0, 0, 0, t); a.head.rotation.y = .15 * Math.sin(t * 1.3); } }),
    S('His speeches last three hours.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor', 'podium'], cam: F(0, 4.65, 0, 10, .55, 1.5), update: (w, p, t) => { P(w, 'mayor', 0, 0, 0, 0, t, true, 1); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { P(w, 'milo', 0, 0, 0, 0, t, false, 1); } }),
    S('Tonight is Rosie\'s surprise birthday party.', { label: '8:30 PM', ...PARTY, show: GUESTS, cam: F(-.3, 4.4, -.6, 19, .55), update: (w, p, t) => { hideB(); guests(w, t); } }),
    S('My job: keep everyone awake until she gets here.', { label: '*MILO*', ...PARTY, show: GUESTS, cam: F(-.6, 4.65, .4, 9, .55, 1), update: (w, p, t) => { guests(w, t, { talk: 'milo' }); } }),
    S('Barry sold me nine coffees.', { label: '*BARRY*', ...PARTY, show: GUESTS, cam: F(-4.2, 4.65, -.6, 10, .55, -1.5), update: (w, p, t) => { guests(w, t, { talk: 'barry' }); const m = A(w, 'milo'); m.root.position.x += .06 * Math.sin(t * 60); m.head.rotation.z = .08 * Math.sin(t * 47); } }),
    S('Then the mayor stood up to give a speech.', { label: '8:50 PM', ...PARTY, show: [...GUESTS, 'podium'], cam: F(4.6, 4.65, -1.4, 10, .55, -1), update: (w, p, t) => { w.podium.position.set(4.6, 0, -1.4); guests(w, t, { talk: 'mayor' }); } }),
    S('Dave\'s mouth started to open.', { label: '*DAVE*', ...PARTY, show: GUESTS, cam: F(2, 4.65, -.2, 6, .55, .6), update: (w, p, t) => { guests(w, t); yawn(A(w, 'dave'), .5 * p); } }),
    S('I held it shut.', { ...PARTY, show: GUESTS, cam: F(.7, 4.65, 0, 8, .55, .5), update: (w, p, t) => { guests(w, t); yawn(A(w, 'dave'), .5 * (1 - Math.min(1, t / .4))); const m = A(w, 'milo'); m.root.position.x = .3; m.root.rotation.y = 1.2; m.arms[1].rotation.x = -1.6; m.arms[0].rotation.x = -1.6; m.root.position.z = 0; } }),
    S('Missus Lee\'s eyes were closing.', { label: '*MRS LEE*', ...PARTY, show: GUESTS, cam: F(-3, 4.65, -.4, 6, .55, -.5), update: (w, p, t) => { guests(w, t); const l = A(w, 'lee'); l.head.rotation.x = .5 * p; l.head.rotation.z = .2 * p; } }),
    S('So I poured coffee on her. I didn\'t say sorry. I know what that does.', { ...PARTY, show: GUESTS, cam: F(-1.8, 4.4, 0, 9, .55, 0), update: (w, p, t) => { guests(w, t, { talk: p > .4 ? 'milo' : null }); const m = A(w, 'milo'); m.root.rotation.y = -1; m.arms[0].rotation.x = -1.8 * (p < .4 ? 1 : 0); const l = A(w, 'lee'); if (p > .25) { l.mouth.scale.y = 3; l.root.position.y = .3 * Math.abs(Math.sin(t * 8)); } } }),
    S('Nine o\'clock. Rosie walked in.', { label: '9:00 PM', ...PARTY, show: [...GUESTS, 'rosie'], cam: F(7.5, 4.65, 0, 11, .55, 1), update: (w, p, t) => { guests(w, t, { turn: true }); const r = P(w, 'rosie', 9 - Math.min(1, t / 1.2) * 2, 0, -4.4 + Math.min(1, t / 1.2) * 4, -1.2, t); if (t < 1.2) walk(r, t); } }),
    S('Everyone shouted: surprise!', { label: '*SURPRISE!*', ...PARTY, show: [...GUESTS, 'rosie'], cam: F(0, 4.4, -.6, 21, .55, -3), update: (w, p, t) => { guests(w, t, { turn: true, cheer: true }); P(w, 'rosie', 7, 0, -.4, -1.2, t); } }),
    S('Rosie smiled. Then she yawned.', { label: '*ROSIE*', ...PARTY, show: [...GUESTS, 'rosie'], cam: F(7, 4.65, -.4, 9, .55, -1.5), update: (w, p, t) => { guests(w, t, { turn: true }); const r = P(w, 'rosie', 7, 0, -.4, -.35, t); yawn(r, h1((p - .45) / .3)); } }),
    S('The whole party hit the floor.', { ...PARTY, show: [...GUESTS, 'rosie', 'zz'], cam: F(1, 3, -.6, 22, .5, -3, 3), update: (w, p, t) => { guests(w, t, { turn: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), t / .5, n === 'lee' ? -1 : 1); drop(P(w, 'rosie', 7, 0, -.4, -1.2, t), t / .5, -1); const m = A(w, 'milo'); m.root.position.x += .06 * Math.sin(t * 60); zz(w, 3, 1.4, -.5, t, 1.2); } }),
    S('Everyone except me. Nine coffees.', { label: '*MILO*', ...PARTY, show: [...GUESTS, 'rosie'], cam: F(-.6, 4.65, .4, 8, .55, .8), update: (w, p, t) => { guests(w, t, { turn: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.x += .06 * Math.sin(t * 60); m.head.rotation.z = .08 * Math.sin(t * 47); m.head.rotation.y = .5 * Math.sin(t * 1.5); } }),
    S('So I stood there. Alone. With the cake.', { ...PARTY, show: [...GUESTS, 'rosie'], cam: F(0, 4.2, -4.6, 9, .55, 1.5, 1), update: (w, p, t) => { guests(w, t, { turn: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(0, 0, -4.8); m.root.rotation.y = 0; m.root.position.x += .05 * Math.sin(t * 60); } }),
    S('Rosie woke up at midnight. The cake was gone.', { label: '12:00 AM', ...PARTY, sky: '#B88AA8', show: [...GUESTS, 'rosie'], cam: F(.3, 4.2, -.5, 11, .55, 2.5, 2), update: (w, p, t) => { hideB(); guests(w, t, { eaten: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(-1.2, 0, -.4); m.root.rotation.y = .6; const r = P(w, 'rosie', 1.8, 0, -.6, -.7, t); r.head.rotation.y = -.5 * Math.sin(t * 2); } }),
    S('She asked: did you eat my cake?', { label: '*ROSIE*', ...PARTY, sky: '#B88AA8', show: [...GUESTS, 'rosie'], cam: F(.3, 4.65, -.5, 10, .55, 2), update: (w, p, t) => { hideB(); guests(w, t, { eaten: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(-1.2, 0, -.4); m.root.rotation.y = .6; P(w, 'rosie', 1.8, 0, -.6, -.7, t, true); } }),
    S('I said: no.', { label: '*MILO*', ...PARTY, sky: '#B88AA8', show: [...GUESTS, 'rosie'], cam: F(-1.2, 4.65, -.4, 7, .55, -.6), update: (w, p, t, k) => { hideB(); guests(w, t, { eaten: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(-1.2, 0, -.4); m.root.rotation.y = .6; m.mouth.scale.y = t < .5 ? 1 + 2.5 * Math.abs(Math.sin(t * 13)) : 1; P(w, 'rosie', 1.8, 0, -.6, -.7, t); } }),
    S('And there it was. A balloon. Shaped like a cake.', { ...PARTY, sky: '#B88AA8', show: [...GUESTS, 'rosie'], cam: F(-.4, 6, -.4, 16, .6), update: (w, p, t, k) => { hideB(); guests(w, t, { eaten: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(-1.2, 0, -.4); m.root.rotation.y = .6; P(w, 'rosie', 1.8, 0, -.6, -.7, t); const b = bal(k, 'me', '#F7C6D9'); tie(b, hand(m), .4 + 2.2 * h1(t / .8), 3, t); b.ball.scale.y = b.ball.scale.x * .7; } }),
    S('Rosie laughed and said: best birthday ever.', { label: '*ROSIE*', ...PARTY, sky: '#B88AA8', show: [...GUESTS, 'rosie'], cam: F(1.8, 4.65, -.6, 7, .55, .6), update: (w, p, t, k) => { hideB(); guests(w, t, { eaten: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(-1.2, 0, -.4); m.root.rotation.y = .6; const r = P(w, 'rosie', 1.8, 0, -.6, -.7, t, true); r.root.position.y = .1 * Math.abs(Math.sin(t * 6)); const b = bal(k, 'me', '#F7C6D9'); tie(b, hand(m), 2.6, 3, t); b.ball.scale.y = b.ball.scale.x * .7; } }),
    S('No balloon.', { label: '*NO BALLOON.*', ...PARTY, sky: '#B88AA8', show: [...GUESTS, 'rosie'], cam: F(1.8, 4.65, -.6, 6, .52, .4), update: (w, p, t, k) => { hideB(); guests(w, t, { eaten: true }); for (const n of ['barry', 'lee', 'dave', 'mayor']) drop(A(w, n), 1, n === 'lee' ? -1 : 1); const m = A(w, 'milo'); m.root.position.set(-1.2, 0, -.4); m.root.rotation.y = .6; P(w, 'rosie', 1.8, 0, -.6, -.7, t); } }),
  ],
};
