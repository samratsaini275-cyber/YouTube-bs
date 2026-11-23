// "In This Town" episode 9 (long form). Original story; follows 907 (the wedding). Same townspeople.
// Rule: in this town, every footprint glows for a whole day. A mystery: who ate the wedding cake?

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
  w.ground = k.ground('#5F8A55', 0);
  w.town = group();
  box(80, .05, 6, mat('#4A5058', { rough: 1 }), [0, .03, 4], w.town);
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -8], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -8], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -5.95], w.town); }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -3.2], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  w.stall = group(); box(4, 1.6, 1.4, mat('#F97316'), [0, .8, 1.2], w.stall); for (let i = 0; i < 4; i++) box(.5, .25, .7, mat('#BFE3F7'), [-1.2 + i * .8, 1.73, 1.2], w.stall);
  w.hall = group(); box(14, 9, 6, mat('#E8E2D0'), [0, 4.5, -10], w.hall); const roof = cone(9, 3, mat('#A0968A'), [0, 10.5, -10], w.hall, 4); roof.rotation.y = Math.PI / 4; roof.scale.z = .5; for (let i = 0; i < 5; i++) cyl(.4, .4, 7, mat('#FFFFFF'), [-5 + i * 2.5, 3.5, -6.6], w.hall, 16); box(2.2, 3.4, .2, mat('#6B4428'), [0, 1.7, -6.9], w.hall);
  w.kitchen = group(); box(30, .2, 20, mat('#DCC9A8'), [0, -.1, 0], w.kitchen); box(30, 14, .3, mat('#BFD8EE'), [0, 7, -5], w.kitchen); box(5, 3, 1.4, mat('#FFFFFF'), [-5, 1.5, -4.2], w.kitchen); box(5, .2, 1.6, mat('#555555'), [-5, 3.05, -4.2], w.kitchen); box(2.2, 4.4, .2, mat('#6B4428'), [6, 2.2, -4.8], w.kitchen);
  box(4, .2, 2.6, mat('#8A5A3B'), [0, 2.4, -1], w.kitchen); for (const x of [-1.7, 1.7]) for (const z of [-2, 0]) box(.2, 2.4, .2, mat('#6B4428'), [x, 1.2, z], w.kitchen);
  cyl(1.1, 1.1, .08, mat('#FFFFFF'), [0, 2.54, -1], w.kitchen, 24); for (let i = 0; i < 7; i++) box(.12, .08, .12, mat('#FFFFFF'), [Math.cos(i * 1.7) * .6, 2.62, -1 + Math.sin(i * 2.3) * .5], w.kitchen);
  w.corridor = group(); box(8, .2, 40, mat('#7A3E2E'), [0, -.1, -10], w.corridor); for (const x of [-4, 4]) box(.3, 9, 40, mat('#E8E2D0'), [x, 4.5, -10], w.corridor); box(8, 9, .3, mat('#E8E2D0'), [0, 4.5, -28], w.corridor); w.door = box(2.2, 4, .2, mat('#6B4428'), [0, 2, -27.8], w.corridor); for (let i = 0; i < 6; i++) box(8, .5, 1, mat('#8A5A3B'), [0, .25 + i * .5, -14 - i], w.corridor);
  w.office = group(); box(20, .2, 16, mat('#7A3E2E'), [0, -.1, 0], w.office); box(20, 12, .3, mat('#E8E2D0'), [0, 6, -4], w.office); box(5, 2.6, 2.4, mat('#4A2E1E'), [0, 1.3, -1.6], w.office); box(1.6, 2.4, .1, mat('#FFFFFF'), [-4, 6, -3.8], w.office);
  w.icing = group(); for (let i = 0; i < 9; i++) { const b = ball(.06 + (i % 3) * .03, mat(['#FFFFFF', '#FFD1E1'][i % 2]), [0, 0, 0], w.icing); b.userData.i = i; b.castShadow = false; }
  // glowing footprint pool
  w.prints = group(); w.fp = []; const pm = mat('#7FF6FF', { glow: 1.2 }), cm = mat('#FFD27F', { glow: 1.2 });
  for (let i = 0; i < 70; i++) { const f = box(.42, .03, .75, pm, [0, .06, 0], w.prints); f.castShadow = false; f.userData.shoe = true; w.fp.push(f); }
  w.pp = []; for (let i = 0; i < 60; i++) { const f = cyl(.13, .13, .03, cm, [0, .06, 0], w.prints, 10); f.castShadow = false; w.pp.push(f); }
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
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); a.arms[0].rotation.x = -.4 * Math.sin(t * sp); a.arms[1].rotation.x = .4 * Math.sin(t * sp); }
// lay shoe prints along a path f(u) -> [x, y, z] for u in 0..1, n prints, visible up to `upto`
function shoes(w, f, n, upto = 1, y0 = .06) { w.fp.forEach(p => p.visible = false); for (let i = 0; i < Math.min(n, w.fp.length); i++) { const u = i / Math.max(1, n - 1); if (u > upto) break; const [x, y, z] = f(u); const [x2, , z2] = f(Math.min(1, u + .01)); const p = w.fp[i]; p.visible = true; const side = i % 2 ? .28 : -.28; const ang = Math.atan2(x2 - x, z2 - z); p.position.set(x + Math.cos(ang) * side, (y || 0) + y0, z - Math.sin(ang) * side); p.rotation.set(0, ang, 0); } }
function paws(w, f, n, upto = 1, y0 = .06) { w.pp.forEach(p => p.visible = false); for (let i = 0; i < Math.min(n, w.pp.length); i++) { const u = i / Math.max(1, n - 1); if (u > upto) break; const [x, y, z] = f(u); const p = w.pp[i]; p.visible = true; p.position.set(x + (i % 2 ? .12 : -.12), (y || 0) + y0, z + (i % 4 < 2 ? .1 : -.1)); } }
function clear(w) { w.fp.forEach(p => p.visible = false); w.pp.forEach(p => p.visible = false); }
function lights(k, level) { k.scene.children.forEach(o => { if (o.isHemisphereLight) o.intensity = .15 + 1.35 * level; if (o.isDirectionalLight) o.intensity = 2.3 * level; }); }
function catPose(w, x, y, z, ry, o = {}) { const c = w.c.biscuit; w.catG.visible = true; w.catG.position.set(x, y, z); w.catG.rotation.order = 'YXZ'; w.catG.rotation.set(o.back ? Math.PI / 2 : 0, ry, 0); w.catG.scale.setScalar(o.s || 1.3); c.mouth.scale.y = o.talk ? 1 + 3 * Math.abs(Math.sin((o.t || 0) * 12)) : 1; c.legs.forEach(l => l.rotation.z = o.back ? .3 * Math.sin((o.t || 0) * 3) : 0); c.head.rotation.set(0, 0, 0); }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };
const TOP = (x, z, h, fov = 50) => ({ pos: [x, h, z + h * .45], look: [x, 0, z], fov, to: { pos: [x, h * .92, z + h * .42], look: [x, 0, z], fov: fov - 1 } });

const S = (say, o) => Object.assign({ say, sky: '#3A4A78', lightAt: [0, 7, 2], lightDist: 30 }, o);
const TOWN = ['ground', 'town', 'prints'];
const DUSK = (k) => lights(k, .35);
const circle = u => [Math.cos(u * 12.56) * 3, 0, Math.sin(u * 12.56) * 2 + 1];
const toCake = u => [6 - u * 6, 0, -4 + u * 3];

export default {
  id: '908',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FOOTPRINTS GLOW',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'FOOTPRINTS GLOW.'],
  title: 'In this town, your footprints glow',
  description: 'In this town, every footprint glows for a whole day. The morning after our wedding, the cake was gone. So we followed the footprints. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, footprints glow.', { show: [...TOWN, 'dave'], cam: F(0, 3.4, 0, 12, .55, 2, 2), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; const u = Math.min(1, t / 1.8); const a = P(w, 'dave', -4 + u * 8, 0, 1.5, Math.PI / 2, t); walk(a, t, 9); shoes(w, v => [-4 + v * 8, 0, 1.5], 14, u); } }),
    S('Every step you take glows for a whole day.', { show: [...TOWN, 'dave'], cam: TOP(0, 1.5, 14), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; P(w, 'dave', 4.4, 0, 1.5, 0, t, false, 1); shoes(w, v => [-4 + v * 8, 0, 1.5], 14); } }),
    S('Dave\'s footprints go in circles. He gets lost a lot.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: TOP(0, 1, 16), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; const [x, , z] = circle(p); const a = P(w, 'dave', x, 0, z, Math.atan2(-Math.sin(p * 12.56) * 3, Math.cos(p * 12.56) * 2), t); walk(a, t, 9); shoes(w, circle, 70, p); } }),
    S('Missus Lee\'s go to the mayor\'s house. Every night.', { label: '*MRS LEE*', show: [...TOWN, 'lee'], cam: F(3, 3, -2, 18, .5, -4, 4), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; const a = P(w, 'lee', -6 + p * 12, 0, 2 - p * 6.5, 2.4, t); walk(a, t); shoes(w, v => [-6 + v * 12, 0, 2 - v * 6.5], 30, p); } }),
    S('Barry has a shoe cover stand. Five dollars a pair.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry'], cam: F(0, 4, 0, 10, .55, 1.5), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; clear(w); P(w, 'barry', 0, 0, -.4, 0, t, true, 1); } }),
    S('And me? I\'m Milo. I just got married.', { label: '*MILO*', show: [...TOWN, 'milo', 'rosie'], cam: F(0, 4.65, 0, 12, .55), update: (w, p, t, k) => { lights(k, 1); w.catG.visible = false; clear(w); P(w, 'milo', -1.4, 0, 0, .3, t, false, 1); P(w, 'rosie', 1.4, 0, 0, -.3, t, false, 1); } }),
    S('This morning, our wedding cake was gone.', { label: '7:00 AM', sky: '#BFD8EE', show: ['kitchen', 'prints', 'milo', 'rosie'], cam: F(0, 3, -1, 9, .5, 1.5, 1.5), update: (w, p, t, k) => { lights(k, 1); w.catG.visible = false; clear(w); P(w, 'milo', -2.6, 0, .5, .5, t); P(w, 'rosie', 2.6, 0, .5, -.5, t); A(w, 'rosie').mouth.scale.y = 3; A(w, 'milo').mouth.scale.y = 3; } }),
    S('Someone had eaten the whole thing.', { sky: '#BFD8EE', show: ['kitchen', 'prints'], cam: F(0, 2.6, -1, 4, .5, .5, 1.5), update: (w, p, t, k) => { lights(k, 1); w.catG.visible = false; clear(w); } }),
    S('So we followed the footprints.', { label: '*?*', sky: '#BFD8EE', show: ['kitchen', 'prints', 'milo', 'rosie'], cam: TOP(1, -1, 13), update: (w, p, t, k) => { lights(k, .4); w.catG.visible = false; clear(w); paws(w, u => [u * 6, 0, -1 + u * -3.6], 20); P(w, 'milo', -2.6, 0, .5, 2, t); P(w, 'rosie', -1, 0, 1.5, 2, t); } }),
    S('Out the kitchen door. Past the bakery. Past the lake.', { show: [...TOWN, 'milo', 'rosie'], cam: F(0, 3.2, 1, 16, .5, 3, 3), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; const x = -8 + p * 14; const m = P(w, 'milo', x, 0, 2.4, Math.PI / 2, t); const r = P(w, 'rosie', x - 1.6, 0, 3.4, Math.PI / 2, t); walk(m, t); walk(r, t); clear(w); paws(w, u => [-12 + u * 24, 0, 1.4], 60); } }),
    S('Into the town hall. Up the stairs.', { show: ['ground', 'town', 'hall', 'prints', 'milo', 'rosie'], cam: F(0, 4, -5, 16, .5, 3, 2), update: (w, p, t, k) => { DUSK(k); w.catG.visible = false; const z = -1 - p * 5; const m = P(w, 'milo', -.8, 0, z, Math.PI, t); const r = P(w, 'rosie', .8, 0, z + .4, Math.PI, t); walk(m, t); walk(r, t); clear(w); paws(w, u => [0, 0, 2 - u * 8.8], 30); } }),
    S('Small footprints. Very small. With four feet.', { show: ['corridor', 'prints'], cam: F(0, .2, -10, 5, .5, 0, 2.4), update: (w, p, t, k) => { lights(k, .25); w.catG.visible = false; clear(w); paws(w, u => [0, 0, -6 - u * 7.8], 34); } }),
    S('The trail ended at a door.', { show: ['corridor', 'prints'], cam: F(0, 4.4, -27.8, 14, .5, 0, 3), update: (w, p, t, k) => { lights(k, .3); w.catG.visible = false; clear(w); paws(w, u => [0, u < .5 ? 3 * u * 2 * .5 : 3, -20 - u * 7.6], 24); P(w, 'milo', -2.4, 3, -22, Math.PI, t); P(w, 'rosie', 2.4, 3, -22, Math.PI, t); } }),
    S('Inside was Mister Biscuit.', { label: '*MR BISCUIT*', sky: '#E8E2D0', show: ['office', 'prints'], cam: F(0, 3.2, -1.6, 6, .5, 1), update: (w, p, t, k) => { lights(k, .9); clear(w); catPose(w, 0, 2.6, -1.4, -Math.PI / 2, { back: false, t, s: 1.4 }); } }),
    S('Sitting on the desk. Very full. Covered in icing.', { label: '*MR BISCUIT*', sky: '#E8E2D0', show: ['office', 'prints', 'icing'], cam: F(0, 3.4, -1.4, 6.5, .5, -.8), update: (w, p, t, k) => { lights(k, .9); clear(w); catPose(w, 0, 2.6, -1.4, -Math.PI / 2, { back: false, t, s: 1.4 }); w.catG.scale.set(1.4 * (1 + .3 * p), 1.4, 1.4 * (1 + .3 * p)); w.icing.children.forEach(b => { const i = b.userData.i; b.position.set(Math.cos(i * 1.3) * .6, 3.2 + (i % 3) * .15, -1.2 + Math.sin(i * 2.1) * .3); }); } }),
    S('Rosie asked: did you eat our cake?', { label: '*ROSIE*', sky: '#E8E2D0', show: ['office', 'prints', 'icing', 'rosie', 'milo'], cam: F(0, 4.4, 0, 11, .53, 1.5), update: (w, p, t, k) => { lights(k, .9); clear(w); catPose(w, 0, 2.6, -1.4, -Math.PI / 2, { back: false, t, s: 1.4 }); P(w, 'rosie', 1.6, 0, 1.6, -2.6, t, p > .3); P(w, 'milo', -1.6, 0, 1.6, 2.6, t); } }),
    S('He said what he was thinking.', { label: '*MR BISCUIT*', sky: '#E8E2D0', show: ['office', 'prints', 'icing'], cam: F(0, 3.4, -1.4, 6.5, .5, .8), update: (w, p, t, k) => { lights(k, .9); clear(w); catPose(w, 0, 2.6, -1.4, -Math.PI / 2, { back: false, t, s: 1.4 }); } }),
    S('Yes. Then he burped.', { label: '*"YES."*', sky: '#E8E2D0', show: ['office', 'prints', 'icing'], cam: F(0, 3.4, -1.4, 6, .5, .6), update: (w, p, t, k) => { lights(k, .9); clear(w); catPose(w, 0, 2.6, -1.4, -Math.PI / 2, { back: false, t, s: 1.4, talk: p < .4 || (p > .7 && p < .85) }); if (p > .7) w.catG.position.y += .06 * Math.abs(Math.sin(t * 20)); } }),
    S('His only words: best cake ever.', { label: '*"BEST CAKE EVER."*', sky: '#E8E2D0', show: ['office', 'prints', 'icing', 'rosie', 'milo'], cam: F(0, 4, 0, 10, .53, -1.5), update: (w, p, t, k) => { lights(k, .9); clear(w); catPose(w, 0, 2.6, -1.4, -Math.PI / 2, { back: false, t, s: 1.4, talk: p > .3 }); const r = P(w, 'rosie', 1.6, 0, 1.6, -2.6, t); const m = P(w, 'milo', -1.6, 0, 1.6, 2.6, t); r.mouth.scale.y = 1 + 2 * Math.abs(Math.sin(t * 9)); m.mouth.scale.y = 1 + 2 * Math.abs(Math.sin(t * 9)); } }),
  ],
};
