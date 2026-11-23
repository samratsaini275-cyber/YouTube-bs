// "In This Town" episode 2 (long-form, ~90 s). Original story; same town and townspeople as 900.
// Rule: in this town, every time you say sorry, you shrink a little.

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

function h1(x) { x = Math.max(0, Math.min(1, x)); return 1 - (1 - x) * (1 - x); }
const lerp = (a, b, x) => a + (b - a) * h1(x);

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  box(80, .05, 6, mat('#5E6670', { rough: 1 }), [0, .03, 4], w.town);
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -8], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -8], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -5.95], w.town); box(1.1, 1.1, .1, mat('#BFE3F7', { glow: .2 }), [hx + 1.2, 2.8, -5.95], w.town); }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -3.2], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  // Dave's front door, life size
  w.door = group(); box(8, 6, .3, mat('#F2D7A6'), [0, 3, -1], w.door); box(1.4, 2.6, .12, mat('#8A5A3B'), [.6, 1.3, -.8], w.door); ball(.07, mat('#FFC21F', { metal: .8 }), [1.1, 1.3, -.72], w.door); box(1.6, .1, .6, mat('#999999'), [.6, .05, -.5], w.door);
  // Missus Lee's teacup on a table
  w.cup = group(); box(4, .2, 3, mat('#8A5A3B'), [0, -.1, 0], w.cup); const c = cyl(.55, .4, .6, mat('#FFFFFF', { rough: .3 }), [0, .3, 0], w.cup, 24); const tea = cyl(.5, .5, .02, mat('#9C5B2E'), [0, .5, 0], w.cup, 24); const hd = k.torus(.2, .05, mat('#FFFFFF'), [.6, .3, 0], w.cup); hd.rotation.set(0, 0, 0); cyl(.8, .8, .04, mat('#FFFFFF'), [0, .02, 0], w.cup, 24);
  // Barry's stall of tiny ladders
  w.stall = group(); box(4, 1.6, 1.4, mat('#B3262E'), [0, .8, 1.2], w.stall); for (let i = 0; i < 5; i++) { const l = group([-1.4 + i * .7, 1.6, 1.2], w.stall); box(.04, .6, .04, mat('#D9A35B'), [-.12, .3, 0], l); box(.04, .6, .04, mat('#D9A35B'), [.12, .3, 0], l); for (let r = 0; r < 4; r++) box(.24, .03, .03, mat('#D9A35B'), [0, .1 + r * .14, 0], l); }
  // bowling alley
  w.alley = group();
  box(40, .2, 70, mat('#2A2340'), [0, -.11, -20], w.alley);
  for (const x of [-8, 0, 8]) { box(5, .05, 60, mat('#E3B577', { rough: .3 }), [x, .01, -22], w.alley); for (const s of [-1, 1]) box(.6, .06, 60, mat('#555555'), [x + s * 2.8, .0, -22], w.alley); }
  box(40, 14, .4, mat('#1B1630'), [0, 7, -52], w.alley); for (let i = 0; i < 4; i++) { const n = box(40, .2, .1, mat(['#FF4FD8', '#3BE8FF', '#FFC21F', '#FF4FD8'][i], { glow: 1 }), [0, 9 + i * 1.2, -51.7], w.alley); n.castShadow = false; }
  w.pins = group([0, 0, -40], w.alley); const pm = mat('#FFFFFF', { rough: .3 }), pr = mat('#E2453C');
  w.pinList = []; for (let r = 0; r < 4; r++) for (let i = 0; i <= r; i++) { const p = group([(i - r / 2) * 1.0, 0, -r * .9], w.pins); cyl(.22, .3, 1.2, pm, [0, .6, 0], p, 12); cyl(.23, .23, .12, pr, [0, 1.0, 0], p, 12); ball(.2, pm, [0, 1.3, 0], p); w.pinList.push(p); }
  w.bowl = ball(.55, mat('#2F5BD3', { rough: .15, metal: .2 }), [0, .55, 0]);
  w.drink = group(); cyl(.25, .2, .7, mat('#BFE3F7', { rough: .1 }), [0, .35, 0], w.drink, 16); cyl(.22, .22, .5, mat('#F97316'), [0, .3, 0], w.drink, 16);
  w.splash = group(); for (let i = 0; i < 10; i++) { const d = ball(.12, mat('#F97316'), [0, 0, 0], w.splash); d.userData.i = i; d.castShadow = false; }
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
// pose + scale. Every update sets scale, so nothing carries over between scenes.
function P(w, n, x, y, z, ry, t, s = 1, talk = false, wave = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); a.root.scale.setScalar(s); return a; }
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); a.arms[0].rotation.x = -.4 * Math.sin(t * sp); a.arms[1].rotation.x = .4 * Math.sin(t * sp); }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 26 }, o);
const TOWN = ['ground', 'town'];
const ALLEY = ['alley', 'pins'];
const IN = { sky: '#1B1630', lightAt: [0, 9, 2], lightDist: 30 };
// Milo's size through the date: 1 -> .75 -> .55 -> .25
const MS = [1, .75, .55, .25];
function pinsUp(w) { w.pinList.forEach(p => p.rotation.set(0, 0, 0)); }
function date(w, t, ms, rTalk = false, mTalk = false) {
  P(w, 'rosie', 1.4, 0, 0, -.25, t, 1, rTalk); P(w, 'milo', -1.4, 0, 0, .25, t, ms, mTalk); pinsUp(w);
}

export default {
  id: '901',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SORRY SHRINKS',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'SORRY SHRINKS YOU.'],
  title: 'In this town, saying sorry makes you shrink',
  description: 'In this town, every time you say sorry, you get a little smaller. The mayor has never said it once. Then I took Rosie bowling. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, sorry shrinks you.', { show: [...TOWN, 'dave'], cam: F(0, 3.6, 0, 11, .56), update: (w, p, t) => { P(w, 'dave', 0, 0, 0, 0, t, lerp(1, .7, (t - .6) / .8), t > .4 && t < 1.1); } }),
    S('Every time you apologise, you get a little smaller.', { show: [...TOWN, 'dave'], cam: F(0, 2.4, 0, 9, .55, 2), update: (w, p, t) => { const s = .7 - .25 * Math.floor(p * 2.99) / 2; P(w, 'dave', 0, 0, 0, -.2, t, s, true); } }),
    S('Say it a lot? You end up tiny.', { show: [...TOWN, 'dave'], cam: F(0, .8, 0, 4, .55), update: (w, p, t) => { P(w, 'dave', 0, 0, 0, 0, t, lerp(.45, .15, p * 1.4)); } }),
    S('This is Dave.', { label: '*DAVE*', show: ['ground', 'door', 'dave'], cam: F(0, .7, 0, 3.2, .55, .8), update: (w, p, t) => { P(w, 'dave', -.4, 0, 0, .1, t, .15, false, 1); } }),
    S('Dave says sorry to doors.', { label: '*DAVE*', show: ['ground', 'door', 'dave'], cam: F(.3, .7, -.3, 3.4, .55, -.8), update: (w, p, t) => { const a = P(w, 'dave', .1, 0, -.35, Math.PI * .9, t, .15, true); if (t < .9) { a.root.position.z = -.35 + .2 * Math.max(0, .5 - t); } } }),
    S('He is now the size of a mouse.', { label: '*DAVE*', show: ['ground', 'door', 'dave'], cam: F(.4, 1.3, -.4, 6, .5, 1), update: (w, p, t) => { const a = P(w, 'dave', -.4, 0, 0, .3, t, .15); walk(a, t, 10); a.root.position.x = -.8 + p * .9; } }),
    S('This is Missus Lee.', { label: '*MRS LEE*', show: ['ground', 'cup', 'lee'], cam: F(0, .5, 0, 2.4, .55), update: (w, p, t) => { P(w, 'lee', 0, .5, 0, 0, t, .1, false, 1); } }),
    S('She says sorry when other people bump into her.', { label: '*MRS LEE*', show: ['ground', 'cup', 'lee'], cam: F(0, .5, 0, 2.2, .55, .7), update: (w, p, t) => { P(w, 'lee', 0, .5, 0, -.2, t, .1, true); } }),
    S('She lives in a teacup now.', { label: '*MRS LEE*', show: ['ground', 'cup', 'lee'], cam: F(0, .4, 0, 3.6, .5, -1.2, 1.2), update: (w, p, t) => { const a = P(w, 'lee', 0, .45, 0, .4, t, .1); a.root.position.y += .02 * Math.sin(t * 3); a.arms[0].rotation.z = -.6; a.arms[1].rotation.z = .6; } }),
    S('Barry sells tiny ladders. Business is booming.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry', 'dave'], cam: F(0, 3.4, 0, 10, .6, 1.5), update: (w, p, t) => { P(w, 'barry', 0, 0, -.4, 0, t, 1, true, 1); const d = P(w, 'dave', .5 + p * .4, 1.6, 1.4, -1.5, t, .15); walk(d, t, 10); } }),
    S('The mayor has never said sorry. Not once.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor'], cam: F(0, 12, 0, 38, .6), update: (w, p, t) => { P(w, 'mayor', 0, 0, -2, 0, t, 3, t < 1.2); } }),
    S('He is forty feet tall.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor', 'dave'], cam: F(0, 20, -2, 62, .55), update: (w, p, t) => { P(w, 'mayor', 0, 0, -2, 0, t, lerp(3, 5.5, p * 1.5)); P(w, 'dave', 3, 0, 2, 0, t, 1, false, 1); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { P(w, 'milo', 0, 0, 0, 0, t, 1, false, 1); } }),
    S('Since the balloon thing, Rosie and I have been dating.', { label: '*MILO & ROSIE*', show: [...TOWN, 'milo', 'rosie'], cam: F(0, 4.65, 0, 12, .55, 1.5), update: (w, p, t) => { P(w, 'milo', -1.4, 0, 0, .25, t, 1, true); P(w, 'rosie', 1.4, 0, 0, -.25, t, 1, false, 1); } }),
    S('Tonight, I took her bowling.', { label: '7:30 PM', ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(0, 4.65, 0, 12, .55, 1.5), update: (w, p, t) => { date(w, t, 1, false, true); } }),
    S('First throw. The ball slipped.', { label: '7:31 PM', ...IN, show: [...ALLEY, 'milo', 'rosie', 'bowl'], cam: F(0, 3.4, 0, 11, .52, -2), update: (w, p, t) => { date(w, t, 1); const a = A(w, 'milo'); a.arms[1].rotation.x = -2.6 * Math.min(1, t / .7); const x = Math.max(0, t - .7); w.bowl.position.set(-1.4 + 1.2 + x * 2.6, Math.max(.55, 3.4 - x * 6 + 1.2 * Math.sin(Math.min(1, x * 2) * Math.PI)), .6 + x * 2); } }),
    S('It landed on her foot.', { ...IN, show: [...ALLEY, 'milo', 'rosie', 'bowl'], cam: F(1.4, 3.2, 0, 13, .52, 4), update: (w, p, t) => { date(w, t, 1); const r = A(w, 'rosie'); w.bowl.position.set(1.9, .55, .2); if (t > .3) { r.legs[1].rotation.x = 1.1; r.root.position.y = .4 * Math.abs(Math.sin(t * 9)); r.mouth.scale.y = 3; } } }),
    S('I said sorry.', { ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(0, 4.3, 0, 12, .55, -1.5), update: (w, p, t) => { date(w, t, lerp(1, MS[1], (t - .5) / .5), false, t < .6); } }),
    S('Then I stood on her other foot.', { ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(.4, 3.2, 0, 13, .52, 4), update: (w, p, t) => { date(w, t, MS[1]); const m = A(w, 'milo'); m.root.position.x = -1.4 + Math.min(1, t / .8) * 2.1; walk(m, t); if (t > .8) { const r = A(w, 'rosie'); r.legs[0].rotation.x = 1.1; r.mouth.scale.y = 3; r.root.position.y = .4 * Math.abs(Math.sin(t * 9)); } } }),
    S('Sorry again.', { ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(0, 3.5, 0, 10, .55), update: (w, p, t) => { date(w, t, lerp(MS[1], MS[2], (t - .3) / .5), false, t < .5); } }),
    S('Then I knocked her drink over. Sorry, sorry, sorry.', { ...IN, show: [...ALLEY, 'milo', 'rosie', 'drink', 'splash'], cam: F(.6, 2.6, 0, 9, .52, 1), update: (w, p, t) => { const s = p < .45 ? MS[2] : lerp(MS[2], MS[3], (p - .45) / .5); date(w, t, s, false, p > .45); w.drink.position.set(.4, 0, .8); w.drink.rotation.z = Math.min(1.5, Math.max(0, t - .6) * 5); w.splash.children.forEach(d => { const i = d.userData.i, q = Math.max(0, t - .8); d.visible = q > 0; d.position.set(.4 + Math.cos(i) * q * 1.6, Math.max(.05, .6 + Math.sin(i * 3) * q - q * q * 3), .8 + Math.sin(i) * q); }); } }),
    S('I was the size of a bowling pin.', { ...IN, show: [...ALLEY, 'milo'], cam: F(0, 1.3, -40, 6, .5, 1), update: (w, p, t) => { P(w, 'milo', 0, 0, -38.8, 0, t, MS[3] * 1.05); pinsUp(w); A(w, 'milo').head.rotation.y = .4 * Math.sin(t * 2); } }),
    S('Then the mayor walked in.', { label: '*THE MAYOR*', ...IN, show: [...ALLEY, 'milo', 'rosie', 'mayor'], cam: F(0, 9, 0, 36, .6), update: (w, p, t) => { date(w, t, MS[3]); const m = P(w, 'mayor', -10 + p * 7, 0, -8, .9, t, 3); walk(m, t, 4); } }),
    S('He stepped right on Rosie\'s foot.', { label: '*THE MAYOR*', ...IN, show: [...ALLEY, 'milo', 'rosie', 'mayor'], cam: F(1, 6, 0, 30, .6, 4), update: (w, p, t) => { date(w, t, MS[3]); const m = P(w, 'mayor', -2.5, 0, -1.6, 0, t, 3); if (t < .8) m.legs[1].rotation.x = -.8 + t; const r = A(w, 'rosie'); if (t > .8) { r.mouth.scale.y = 3; r.root.position.y = .4 * Math.abs(Math.sin(t * 9)); r.legs[0].rotation.x = 1.1; } } }),
    S('Everyone waited.', { ...IN, show: [...ALLEY, 'milo', 'rosie', 'mayor'], cam: F(-2.5, 14, -1.6, 22, .5, 0, -6), update: (w, p, t) => { date(w, t, MS[3]); P(w, 'mayor', -2.5, 0, -1.6, 0, t, 3); A(w, 'mayor').head.rotation.y = .2 * Math.sin(t * 1.5); } }),
    S('He said: it was the floor\'s fault.', { label: '*THE MAYOR*', ...IN, show: [...ALLEY, 'milo', 'rosie', 'mayor'], cam: F(-2.5, 14, -1.6, 22, .55, 0, -6), update: (w, p, t) => { date(w, t, MS[3]); P(w, 'mayor', -2.5, 0, -1.6, 0, t, 3, p > .35); } }),
    S('Rosie picked me up.', { label: '*ROSIE*', ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(1.4, 4.4, 0, 8, .52, -1), update: (w, p, t) => { P(w, 'rosie', 1.4, 0, 0, -.25, t); const r = A(w, 'rosie'); r.arms[0].rotation.x = -1.2; r.arms[1].rotation.x = -1.2; P(w, 'milo', 1.4, lerp(0, 2.6, t / .8), .9, 0, t, MS[3]); } }),
    S('She grabbed the heaviest ball in the building.', { label: '*ROSIE*', ...IN, show: [...ALLEY, 'milo', 'rosie', 'bowl'], cam: F(1.4, 3.4, 0, 9, .52, 1.5), update: (w, p, t) => { P(w, 'rosie', 1.4, 0, 0, -.25, t); const r = A(w, 'rosie'); r.arms[1].rotation.x = -1; P(w, 'milo', .6, 2.2, .6, 0, t, MS[3]); A(w, 'milo').legs.forEach(l => l.rotation.x = -1.5); w.bowl.scale.setScalar(lerp(1, 1.6, p * 2)); w.bowl.position.set(2.4, 2.2, .7); } }),
    S('And she bowled the mayor.', { ...IN, show: [...ALLEY, 'rosie', 'mayor', 'bowl'], cam: { pos: [6, 8, 12], look: [0, 6, -18], fov: 50, to: { pos: [5, 8, 10], look: [0, 6, -20], fov: 48 } }, update: (w, p, t) => { P(w, 'rosie', 0, 0, 0, Math.PI, t); A(w, 'rosie').arms[1].rotation.x = t < .5 ? 1.5 : -.6; P(w, 'mayor', 0, 0, -24, 0, t, 3); pinsUp(w); const x = Math.max(0, t - .5); w.bowl.scale.setScalar(1.6); w.bowl.position.set(0, .88, -1 - x * 16); const hit = Math.max(0, x - 1.4); A(w, 'mayor').root.rotation.x = -Math.min(1.45, hit * 3); } }),
    S('Strike.', { label: '*STRIKE.*', ...IN, show: [...ALLEY, 'mayor', 'bowl'], cam: F(0, 3, -24, 30, .4, 6, 6), update: (w, p, t) => { P(w, 'mayor', 0, 0, -24, 0, t, 3); A(w, 'mayor').root.rotation.x = -1.45; w.bowl.scale.setScalar(1.6); w.bowl.position.set(1, .88, -27); w.pinList.forEach((q, i) => q.rotation.set(1.4 * Math.cos(i), 0, 1.4 * Math.sin(i))); } }),
    S('The mayor sat up and said: sorry.', { label: '*THE MAYOR*', ...IN, show: [...ALLEY, 'mayor'], cam: F(0, 14, -24, 34, .52), update: (w, p, t) => { const m = P(w, 'mayor', 0, 0, -24, 0, t, p > .65 ? lerp(3, 1, (p - .65) / .3) : 3, p > .7); m.root.rotation.x = -1.45 * (1 - Math.min(1, t / .8)); } }),
    S('First sorry in forty years.', { label: '*THE MAYOR*', ...IN, show: [...ALLEY, 'mayor'], cam: F(0, 4.65, -24, 10, .55), update: (w, p, t) => { P(w, 'mayor', 0, 0, -24, 0, t, 1); A(w, 'mayor').head.rotation.y = .5 * Math.sin(t * 2); } }),
    S('He went home six feet tall. He said it was nice to fit through a door.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor'], sky: '#1E2A4A', cam: F(.5, 4.65, -5, 12, .55, 2), update: (w, p, t) => { const m = P(w, 'mayor', -.5 + p * 2, 0, -5.3, 1.2, t); walk(m, t); } }),
    S('And Rosie? She never said sorry once.', { label: '*ROSIE*', ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(1.4, 4.65, 0, 8, .55, -1), update: (w, p, t) => { P(w, 'rosie', 1.4, 0, 0, -.25, t); P(w, 'milo', .7, 2.2, .7, .4, t, MS[3]); A(w, 'milo').legs.forEach(l => l.rotation.x = -1.5); A(w, 'rosie').arms[0].rotation.x = -1; } }),
    S('She said: best date ever.', { label: '*ROSIE*', ...IN, show: [...ALLEY, 'milo', 'rosie'], cam: F(1.4, 4.65, 0, 6.5, .55, -.6), update: (w, p, t) => { P(w, 'rosie', 1.4, 0, 0, -.25, t, 1, p > .2); P(w, 'milo', .7, 2.2, .7, .4, t, MS[3], false, 1); A(w, 'milo').legs.forEach(l => l.rotation.x = -1.5); A(w, 'rosie').arms[0].rotation.x = -1; } }),
  ],
};
