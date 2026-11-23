// "In This Town" episode 6 (long form). Original story; same town and townspeople as 900–904.
// Rule: in this town, when you blush, your face glows like a light bulb. Blackout scenes dim the scene lights.

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
const lerp = (a, b, x) => a + (b - a) * Math.max(0, Math.min(1, x));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  box(80, .05, 6, mat('#5E6670', { rough: 1 }), [0, .03, 4], w.town);
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -8], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -8], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -5.95], w.town); }
  w.trees = group(); for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -3.2], w.trees); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  w.stall = group(); box(4, 1.6, 1.4, mat('#111111'), [0, .8, 1.2], w.stall); for (let i = 0; i < 5; i++) { const g = group([-1.4 + i * .7, 1.7, 1.2], w.stall); for (const x of [-.13, .13]) box(.2, .12, .04, mat('#222222', { metal: .5 }), [x, 0, 0], g); }
  w.shades = group(); for (const x of [-.24, .24]) box(.36, .2, .06, mat('#111111', { rough: .1 }), [x, .1, 0], w.shades); box(.9, .05, .05, mat('#111111'), [0, .17, 0], w.shades);
  w.podium = group(); box(1.8, 3, 1.2, mat('#6B4428'), [0, 1.5, 1.1], w.podium);
  // the fair
  w.fair = group(); box(70, .05, 30, mat('#4E7A3A', { rough: 1 }), [0, .02, -6], w.fair);
  w.wheel = group([7, 7.5, -10], w.fair); const rim = k.torus(6, .2, mat('#DDDDDD', { metal: .5 }), [0, 0, 0], w.wheel); rim.rotation.x = 0; for (let i = 0; i < 8; i++) { const a = i / 8 * 6.28; const sp = box(.15, 6, .15, mat('#BBBBBB'), [Math.cos(a) * 3, Math.sin(a) * 3, 0], w.wheel); sp.rotation.z = a + Math.PI / 2; }
  w.cars = []; for (let i = 0; i < 8; i++) { const c = box(1, .8, .9, mat(['#E2453C', '#FFC21F', '#3B82F6', '#22C55E'][i % 4]), [0, 0, .6], w.wheel); w.cars.push(c); }
  for (const x of [-2.5, 2.5]) { const l = box(.3, 8.5, .3, mat('#999999'), [7 + x * .6, 3.6, -10.5], w.fair); l.rotation.z = x > 0 ? -.3 : .3; }
  w.bulbs = []; for (let i = 0; i < 24; i++) { const b = ball(.13, mat(['#FFC21F', '#FF5FB8', '#3BE8FF'][i % 3], { glow: 1 }), [-12 + i, 6 + .5 * Math.sin(i * .9), -4], w.fair); b.castShadow = false; w.bulbs.push(b); }
  box(24, .03, .03, mat('#333333'), [-.5, 6.1, -4], w.fair);
  for (let i = 0; i < 3; i++) { const sx = -9 + i * 5; box(3.4, 2.6, 2, mat(['#F7C6C6', '#BFD8EE', '#FFE8A3'][i]), [sx, 1.3, -6], w.fair); const r = box(3.8, .2, 2.4, mat(['#E2453C', '#3B82F6', '#F97316'][i]), [sx, 2.8, -5.8], w.fair); }
  w.milo = avatar(k, k.scene, { shirt: '#3B82F6', hair: '#3A2A1A' }).root;
  w.rosie = avatar(k, k.scene, { shirt: '#E2453C', hair: '#C2683A', long: true, skin: '#C68A5A' }).root;
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#8A5A3B', apron: true, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hair: '#6B6B6B' }).root;
  return w;
}

const H = {};
function A(w, n) { if (H[n]) return H[n]; const r = w[n]; const c = r.children; const head = c[5]; H[n] = { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head, skin: head.children[0].material, mouth: head.children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) }; return H[n]; }
// glow(a, 0..n): blush light on the face (shares the skin material, so hands glow a little too)
function glow(a, g) { a.skin.emissive.set('#FF6A5A'); a.skin.emissiveIntensity = g * .35; }
function P(w, n, x, y, z, ry, t, talk = false, wave = 0, g = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); a.root.scale.setScalar(1); glow(a, g); return a; }
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); }
// scene lighting: 1 = normal day, 0 = blackout. Set in every update.
function lights(k, level) { k.scene.children.forEach(o => { if (o.isHemisphereLight) o.intensity = .06 + 1.44 * level; if (o.isDirectionalLight) o.intensity = 2.3 * level; }); }
function fairSpin(w, t, on = true) { w.wheel.rotation.z = on ? t * .25 : 0; w.cars.forEach((c, i) => { const a = i / 8 * 6.28 + w.wheel.rotation.z; c.position.set(Math.cos(i / 8 * 6.28) * 6, Math.sin(i / 8 * 6.28) * 6, .6); c.rotation.z = -w.wheel.rotation.z; }); w.bulbs.forEach(b => { b.material.emissiveIntensity = on ? 1 : 0; }); }
function shadesOn(w, a) { a.root.updateMatrixWorld(true); const v = new a.root.position.constructor(0, .1, .66); a.head.localToWorld(v); w.shades.position.copy(v); w.shades.rotation.set(0, a.root.rotation.y, 0); w.shades.visible = true; }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 28 }, o);
const DAY = (k) => lights(k, 1);
const TOWN = ['ground', 'town', 'trees'];
const FAIR = ['ground', 'fair'];
const EVE = { sky: '#2C3E6B', lightAt: [0, 8, 3], lightDist: 30 };
const DARK = { sky: '#05070F', lightAt: [0, 8, 3], lightDist: 30 };
const pair = (w, t, mg, rg, o = {}) => { const m = P(w, 'milo', -1.2, 0, 1, .3, t, o.talk === 'milo', 0, mg); const r = P(w, 'rosie', 1.2, 0, 1, -.3, t, o.talk === 'rosie', 0, rg); return [m, r]; };

export default {
  id: '905',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'BLUSHING GLOWS',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'BLUSHING MAKES YOU GLOW.'],
  title: 'In this town, blushing makes your face glow',
  description: 'In this town, when you blush, your face lights up like a bulb. Then the power went out at the summer fair. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, blushing glows.', { ...EVE, show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 8, .56), update: (w, p, t, k) => { lights(k, .35); P(w, 'dave', 0, 0, 0, 0, t, false, 0, 2.5 * h1((t - .5) / .5)); } }),
    S('Get embarrassed, and your face lights up like a bulb.', { ...EVE, show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 11, .55, 2), update: (w, p, t, k) => { lights(k, .35); const a = P(w, 'dave', 0, 0, 0, 0, t, false, 0, 2.5 + Math.sin(t * 6)); a.head.rotation.x = .25; } }),
    S('This is Dave. He blushes when anyone says his name.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t, k) => { DAY(k); P(w, 'dave', 0, 0, 0, 0, t, false, p < .3 ? 1 : 0, p > .45 ? 2.5 : 0); } }),
    S('He has never won at hide and seek.', { label: '*DAVE*', ...EVE, show: [...TOWN, 'dave'], cam: F(-3, 3.6, -3.2, 12, .5, 2), update: (w, p, t, k) => { lights(k, .15); const a = P(w, 'dave', -3, 0, -4.6, 0, t, false, 0, 3); a.root.position.x = -3 + .9 * Math.sin(t * 1.4); } }),
    S('Barry sells sunglasses. Five dollars each.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry', 'shades'], cam: F(0, 4, 0, 10, .55, 1.5), update: (w, p, t, k) => { DAY(k); const b = P(w, 'barry', 0, 0, -.4, 0, t, true, 1); shadesOn(w, b); } }),
    S('The mayor glows at every speech. So the town turned off the streetlights.', { label: '*THE MAYOR*', ...EVE, show: [...TOWN, 'mayor', 'podium'], cam: F(0, 4.65, 0, 11, .55, 1.5), update: (w, p, t, k) => { lights(k, .2); P(w, 'mayor', 0, 0, 0, 0, t, true, 1, 3); } }),
    S('And Missus Lee? She has never blushed. Not once.', { label: '*MRS LEE*', show: [...TOWN, 'lee'], cam: F(0, 4.65, 0, 8, .55, -1), update: (w, p, t, k) => { DAY(k); P(w, 'lee', 0, 0, 0, 0, t, false, 0, 0); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t, k) => { DAY(k); P(w, 'milo', 0, 0, 0, 0, t, false, 1); } }),
    S('Tonight was the summer fair.', { label: '8:00 PM', ...EVE, show: [...FAIR, 'milo', 'rosie', 'dave', 'lee', 'mayor'], cam: F(1, 5, 0, 22, .55, 3), update: (w, p, t, k) => { lights(k, .55); fairSpin(w, t); pair(w, t, 0, 0); P(w, 'dave', -5, 0, -1, .3, t); P(w, 'lee', 4.5, 0, -1, -.3, t); P(w, 'mayor', 6.2, 0, -.6, -.4, t); } }),
    S('Then the power went out.', { ...DARK, show: [...FAIR, 'milo', 'rosie', 'dave', 'lee', 'mayor'], cam: F(1, 5, 0, 22, .55, 3), update: (w, p, t, k) => { const on = t < .8 || (t > 1 && t < 1.1); lights(k, on ? .55 : 0); fairSpin(w, t, on); pair(w, t, 0, 0); P(w, 'dave', -5, 0, -1, .3, t); P(w, 'lee', 4.5, 0, -1, -.3, t); P(w, 'mayor', 6.2, 0, -.6, -.4, t); } }),
    S('Total darkness.', { label: '*?*', ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(0, 4.65, 1, 9, .55), update: (w, p, t, k) => { lights(k, 0); fairSpin(w, 0, false); pair(w, t, 0, 0); } }),
    S('Then Rosie whispered: Milo, I have an idea.', { label: '*ROSIE*', ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(1.2, 4.65, 1, 6, .55, .6), update: (w, p, t, k) => { lights(k, .03); fairSpin(w, 0, false); pair(w, t, 0, 0, { talk: p > .4 ? 'rosie' : null }); A(w, 'rosie').head.rotation.y = -.5; } }),
    S('She kissed me on the cheek.', { ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(0, 4.65, 1, 7, .55, 1), update: (w, p, t, k) => { lights(k, .03); fairSpin(w, 0, false); const [m, r] = pair(w, t, 0, 0); const q = h1(Math.min(1, t / .7)); r.root.position.x = 1.2 - q * 1.1; r.root.rotation.y = -.3 - q * 1.2; r.head.rotation.x = .1 * q; m.root.rotation.y = .3 - .3 * q; } }),
    S('I lit up like a lighthouse.', { label: '*MILO*', ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(-1.2, 4.65, 1, 7, .55, -.6), update: (w, p, t, k) => { lights(k, .03 + .5 * h1(t / .6)); fairSpin(w, 0, false); pair(w, t, 7 * h1(t / .6), 0); } }),
    S('Everyone could see again.', { ...DARK, show: [...FAIR, 'milo', 'rosie', 'dave', 'lee', 'mayor'], cam: F(1, 5, 0, 22, .55, 3), update: (w, p, t, k) => { lights(k, .5); fairSpin(w, t, false); const [m] = pair(w, t, 7, 0); P(w, 'dave', -5, 0, -1, .5, t, false, 1); P(w, 'lee', 4.5, 0, -1, -.5, t); P(w, 'mayor', 6.2, 0, -.6, -.6, t, false, 1); } }),
    S('The fair went on. For three hours.', { label: '11:00 PM', ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(3, 6, -4, 26, .55, -4), update: (w, p, t, k) => { lights(k, .5); fairSpin(w, t, false); const [m, r] = pair(w, t, 7, 0); } }),
    S('Every time I started to fade, Rosie kissed my cheek again.', { label: '*ROSIE*', ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(0, 4.65, 1, 8, .55, 1), update: (w, p, t, k) => { const kiss = p > .55 && p < .8; const g = p < .55 ? lerp(7, 1.5, p / .55) : 7; lights(k, .08 + .06 * g); fairSpin(w, 0, false); const [m, r] = pair(w, t, g, 0); if (kiss) { r.root.position.x = .1; r.root.rotation.y = -1.5; } } }),
    S('At midnight, she kissed me on the lips.', { label: '12:00 AM', ...DARK, show: [...FAIR, 'milo', 'rosie'], cam: F(0, 4.65, 1, 7, .55, 1), update: (w, p, t, k) => { lights(k, .5); fairSpin(w, 0, false); const [m, r] = pair(w, t, 7, 0); const q = h1(Math.max(0, p - .5) / .3); r.root.position.x = 1.2 - q * .7; m.root.position.x = -1.2 + q * .7; r.root.rotation.y = -.3 - q * 1.27; m.root.rotation.y = .3 + q * 1.27; } }),
    S('The Ferris wheel started turning.', { label: '*!*', ...DARK, show: [...FAIR], cam: { pos: [-2, 4, 18], look: [4, 6.5, -8], fov: 52, to: { pos: [-2, 4, 16], look: [5, 7, -8], fov: 50 } }, update: (w, p, t, k) => { lights(k, .7); fairSpin(w, t, true); w.wheel.rotation.z = t * .8;  } }),
    S('So did every light in town.', { ...DARK, sky: '#101A3A', show: [...TOWN, 'fair'], cam: F(0, 6, -6, 40, .5, 0, 10), update: (w, p, t, k) => { lights(k, .7); fairSpin(w, t, true); } }),
    S('And Missus Lee? The mayor walked her home.', { label: '*MRS LEE*', ...EVE, show: [...TOWN, 'lee', 'mayor'], cam: F(0, 4.65, 0, 11, .55, 1.5), update: (w, p, t, k) => { lights(k, .35); const l = P(w, 'lee', -1 + p * 2.2, 0, 0, 1.4, t); const m = P(w, 'mayor', -2.4 + p * 2.2, 0, -.2, 1.4, t); walk(l, t); walk(m, t); } }),
    S('He said goodnight. And for the first time ever...', { label: '*MRS LEE*', ...EVE, show: [...TOWN, 'lee', 'mayor'], cam: F(.4, 4.65, 0, 9, .55, 1), update: (w, p, t, k) => { lights(k, .3); P(w, 'lee', 1.2, 0, 0, -.6, t); P(w, 'mayor', -.6, 0, -.1, .7, t, p < .4); } }),
    S('...she glowed.', { label: '*MRS LEE (GLOWING)*', ...EVE, show: [...TOWN, 'lee', 'mayor'], cam: F(1.2, 4.65, 0, 6, .55, .5), update: (w, p, t, k) => { lights(k, .3); const l = P(w, 'lee', 1.2, 0, 0, -.6, t, false, 0, 6 * h1(t / .6)); l.head.rotation.x = .2; P(w, 'mayor', -.6, 0, -.1, .7, t); } }),
  ],
};
