// "In This Town" episode 8 (long form). Original story; follows 906 (the proposal). Same townspeople.
// Rule: in this town, crying makes it rain, from a little cloud over your head. Happy tears count.

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

const PEOPLE = ['milo', 'rosie', 'dave', 'lee', 'barry', 'mayor', 'dad'];
function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -12], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -12], w.town, 4); r.rotation.y = Math.PI / 4; }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -7], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  w.garden = group(); box(8, .06, 5, mat('#B08A55', { rough: 1 }), [0, .03, -1], w.garden); for (let i = 0; i < 6; i++) { const s = cyl(.05, .05, 1, mat('#8A6A3A'), [-3 + i * 1.2, .5, -1.5], w.garden, 6); s.rotation.z = .5; ball(.2, mat('#8A6A3A'), [-3 + i * 1.2 + .25, .95, -1.5], w.garden); }
  w.stall = group(); box(4, 1.6, 1.4, mat('#22C55E'), [0, .8, 1.2], w.stall); for (let i = 0; i < 4; i++) { const u = group([-1.2 + i * .8, 1.6, 1.2], w.stall); cyl(.03, .03, 1, mat('#333333'), [0, .5, 0], u, 6); cone(.45, .3, mat(['#E2453C', '#3B82F6', '#FFC21F', '#A855F7'][i]), [0, 1.1, 0], u, 8); }
  w.lake = group(); cyl(10, 10, .1, mat('#3B82F6', { rough: .1 }), [0, .06, 0], w.lake, 40); const sg = group([6, 0, 6], w.lake); box(.15, 2.4, .15, mat('#7A5230'), [0, 1.2, 0], sg); box(3.4, 1, .1, mat('#FFFFFF'), [0, 2.3, .05], sg); box(3, .25, .12, mat('#3B82F6'), [0, 2.3, .07], sg);
  // wedding: arch at the back (z -4), two rows of chairs facing it
  w.wed = group(); box(3, .04, 20, mat('#FFFFFF'), [0, .03, -1], w.wed);
  const arch = k.torus(3.2, .25, mat('#FFFFFF'), [0, 3.2, -9.4], w.wed); arch.rotation.x = 0; for (let i = 0; i < 14; i++) { const a = i / 13 * Math.PI; ball(.35, mat(['#FF9FC8', '#FFFFFF', '#FFD1E1'][i % 3]), [Math.cos(a) * 3.2, 3.2 + Math.sin(a) * 3.2, -9.3], w.wed); }
  for (const z of [2.4, 5]) for (const x of [-4.6, -2.6, 2.6, 4.6]) { const ch = group([x, 0, z], w.wed); box(1.6, .2, 1.6, mat('#FFFFFF'), [0, 1.3, 0], ch); box(1.6, 1.8, .15, mat('#FFFFFF'), [0, 2.2, .75], ch); }
  w.cake = group(); cyl(.9, .9, .7, mat('#FFFFFF'), [0, .35, 0], w.cake, 24); cyl(.6, .6, .6, mat('#FFFFFF'), [0, 1, 0], w.cake, 24); cyl(.35, .35, .5, mat('#FFD1E1'), [0, 1.55, 0], w.cake, 24);
  w.water = box(120, 1, 120, mat('#3B82F6', { rough: .05, opacity: .55 }), [0, -1, 0]); w.water.castShadow = false;
  // a rain cloud per person
  w.rain = group(); w.cl = {};
  for (const n of [...PEOPLE, 'cat']) { const g = group([0, 0, 0], w.rain); for (const [x, y, r] of [[-.45, 0, .45], [0, .15, .6], [.45, 0, .45]]) { const b = ball(r, mat('#8A94A6'), [x, y, 0], g); b.castShadow = false; } g.drops = []; for (let i = 0; i < 10; i++) { const d = box(.05, .3, .05, mat('#7FB8FF', { glow: .3 }), [0, 0, 0], g); d.castShadow = false; d.userData.i = i; g.drops.push(d); } w.cl[n] = g; }
  w.c = { biscuit: makeCat(k, '#E8913A', k.scene) }; w.catG = w.c.biscuit.g;
  w.milo = avatar(k, k.scene, { shirt: '#111111', pants: '#111111', hair: '#3A2A1A' }).root;
  const ro = avatar(k, k.scene, { shirt: '#FFFFFF', pants: '#FFFFFF', hair: '#C2683A', long: true, skin: '#C68A5A' }); w.rosie = ro.root; box(1.5, 2.6, .1, mat('#FFFFFF', { opacity: .7 }), [0, -.6, -.72], ro.head);
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#5B3A8A', apron: false, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hat: true }).root;
  const d = avatar(k, k.scene, { shirt: '#1E3A8A', pants: '#1E2A4A', skin: '#A86B42' }); w.dad = d.root; box(1.36, .3, 1.36, mat('#1E3A8A'), [0, .72, 0], d.head); box(1.36, .1, .5, mat('#111111'), [0, .6, .7], d.head); box(.5, .14, .06, mat('#3A2A1A'), [0, -.08, .62], d.head);
  return w;
}

const H = {};
function A(w, n) { if (H[n]) return H[n]; const r = w[n]; const c = r.children; H[n] = { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head: c[5], mouth: c[5].children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) }; return H[n]; }
function P(w, n, x, y, z, ry, t, talk = false, wave = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); return a; }
// rain(w, t, names): clouds over these people (others hidden); 'cat' = Mr Biscuit. s scales the cloud.
function rain(w, t, names = [], s = 1) {
  for (const n in w.cl) w.cl[n].visible = false;
  for (const n of names) {
    const g = w.cl[n]; g.visible = true; let top;
    if (n === 'cat') { w.catG.updateMatrixWorld(true); top = w.c.biscuit.head.getWorldPosition(new w.catG.position.constructor()); top.y += .9; }
    else { const a = A(w, n); a.root.updateMatrixWorld(true); top = a.head.getWorldPosition(new a.root.position.constructor()); top.y += 1.9; }
    g.position.copy(top); g.scale.setScalar(s);
    g.drops.forEach(d => { const i = d.userData.i, q = (t * 1.6 + i / 10) % 1; d.position.set(-.6 + (i % 5) * .3, -.4 - q * 2.2, ((i * 7) % 3 - 1) * .15); });
  }
}
function tears(a) { a.mouth.scale.set(1.3, 2.4, 1); a.head.rotation.x = .15; }
function water(w, y) { w.water.position.y = y - .5; w.water.visible = y > 0; }
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };
// reverse shot: camera behind the arch looking at the guests (+z)
const R = (x, y, z, d, frac = .53, side = 0, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + .4, z - d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + .4, z - d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 30 }, o);
const TOWN = ['ground', 'town', 'rain', 'water'];
const WED = ['ground', 'town', 'wed', 'rain', 'water', 'milo', 'rosie', 'dave', 'lee', 'barry', 'mayor', 'dad', 'catG'];
const GREY = { sky: '#8FA3B8' };
const GUESTS = ['ground', 'town', 'wed', 'rain', 'water', 'dave', 'lee', 'mayor', 'dad', 'catG'];
// seats: guests face the arch (-z), i.e. ry = PI
const SEAT = { dad: [2.6, 2.4], lee: [-2.6, 2.4], mayor: [-4.6, 2.4], dave: [4.6, 2.4] };
function wedding(w, t, o = {}) {
  water(w, o.water || 0);
  for (const n in SEAT) { const [x, z] = SEAT[n]; const a = P(w, n, x, 0, z, Math.PI, t); sit(a); a.root.position.y += .05; if ((o.cry || []).includes(n)) tears(a); }
  const b = P(w, 'barry', 0, 0, -8.6, 0, t, o.talk === 'barry');
  const m = P(w, 'milo', -1.6, 0, -7.2, Math.PI / 2, t); const rx = o.rosieX ?? 1.6;
  const r = P(w, 'rosie', rx, 0, o.rosieZ ?? -7.2, o.rosieRy ?? -Math.PI / 2, t);
  w.catG.position.set(-1.4, 0, 4.2); w.catG.rotation.set(0, -Math.PI / 2, 0); w.catG.scale.setScalar(1.2); w.c.biscuit.mouth.scale.y = o.cat ? 1 + 3 * Math.abs(Math.sin(t * 12)) : 1;
  if (o.float) { for (const n of PEOPLE) A(w, n).root.position.y += o.float; w.catG.position.y = (o.water || 0) - .35 + .1 * Math.sin(t * 2); }
  rain(w, t, o.cry || [], o.cs || 1);
  return { m, r, b };
}

export default {
  id: '907',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CRYING MAKES IT RAIN',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'CRYING MAKES IT RAIN.'],
  title: 'In this town, crying makes it rain',
  description: 'In this town, when you cry, a little rain cloud appears over your head. Happy tears count. Today, I married Rosie. Everyone promised not to cry. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, tears make rain.', { ...GREY, show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 11, .5), update: (w, p, t) => { water(w, 0); const a = P(w, 'dave', 0, 0, 0, 0, t); if (t > .5) tears(a); rain(w, t, t > .6 ? ['dave'] : []); } }),
    S('Cry, and a little cloud appears over your head.', { ...GREY, show: [...TOWN, 'dave'], cam: F(0, 5.6, 0, 9, .5, 1.5), update: (w, p, t) => { water(w, 0); tears(P(w, 'dave', 0, 0, 0, 0, t)); rain(w, t, ['dave']); } }),
    S('Even happy tears.', { show: [...TOWN, 'barry'], cam: F(0, 5.4, 0, 10, .5, -1.5), update: (w, p, t) => { water(w, 0); const a = P(w, 'barry', 0, 0, 0, 0, t, false, 1); a.mouth.scale.set(2, 1.5, 1); rain(w, t, ['barry']); } }),
    S('Dave cried at a sad movie. The street flooded.', { label: '*DAVE*', ...GREY, show: [...TOWN, 'dave'], cam: F(0, 4, 0, 14, .5, 2), update: (w, p, t) => { water(w, 2.2 * p); tears(P(w, 'dave', 0, 0, 0, 0, t)); rain(w, t, ['dave'], 1.6); } }),
    S('Missus Lee never cries. Her garden is very dry.', { label: '*MRS LEE*', show: ['ground', 'garden', 'lee', 'rain', 'water'], cam: F(0, 4, 0, 11, .55, 1.5), update: (w, p, t) => { water(w, 0); P(w, 'lee', -2.6, 0, .6, .4, t); rain(w, t, []); } }),
    S('Barry has an umbrella stand. Five dollars each.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry'], cam: F(0, 4.2, 0, 11, .55, 1.5), update: (w, p, t) => { water(w, 0); P(w, 'barry', 0, 0, -.4, 0, t, true, 1); rain(w, t, []); } }),
    S('The mayor cried once. Now there\'s a lake.', { label: '*MAYOR\'S LAKE*', show: ['ground', 'town', 'lake', 'mayor', 'rain', 'water'], cam: F(0, 3, 0, 24, .5, 4, 8), update: (w, p, t) => { water(w, 0); const a = P(w, 'mayor', -4, 0, 9, .4, t, false, 1); rain(w, t, []); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { water(w, 0); P(w, 'milo', 0, 0, 0, 0, t, false, 1); rain(w, t, []); } }),
    S('Today, I married Rosie.', { label: 'THE WEDDING', show: WED, cam: F(0, 4, 2, 22, .5, 3, 3), update: (w, p, t) => { wedding(w, t, { rosieX: 0, rosieZ: 9 - Math.min(1, p * 1.2) * 0, rosieRy: Math.PI }); A(w, 'rosie').root.visible = false; } }),
    S('Everyone promised not to cry.', { show: GUESTS, cam: R(0, 3, 2.4, 15, .5, 0, 48), update: (w, p, t) => { wedding(w, t, { rosieZ: 12 }); A(w, 'rosie').root.visible = false; } }),
    S('Then Rosie walked down the aisle.', { label: '*ROSIE*', show: [...GUESTS, 'rosie'], cam: R(0, 4.4, 1, 11, .52, 1.5, 50), update: (w, p, t) => { const z = 6 - p * 6; const o = wedding(w, t, { rosieX: 0, rosieZ: z, rosieRy: Math.PI }); A(w, 'rosie').root.visible = true; walk(o.r, t, 5); } }),
    S('Her dad cried first.', { label: '*ROSIE\'S DAD*', show: GUESTS, cam: R(2.6, 3.1, 2.4, 6, .55, -.5), update: (w, p, t) => { wedding(w, t, { cry: t > .4 ? ['dad'] : [], rosieX: 1.2 }); } }),
    S('Then Missus Lee. For the first time ever.', { label: '*MRS LEE*', show: GUESTS, cam: R(-2.6, 3.1, 2.4, 6, .55, .5), update: (w, p, t) => { wedding(w, t, { cry: ['dad', ...(t > .4 ? ['lee'] : [])] }); } }),
    S('Then the mayor. Then Dave. Then everyone.', { show: GUESTS, cam: R(0, 3.4, 2.4, 16, .5, 0, 48), update: (w, p, t) => { const c = ['dad', 'lee']; if (p > .2) c.push('mayor'); if (p > .45) c.push('dave'); if (p > .7) c.push('barry', 'cat'); wedding(w, t, { cry: c }); } }),
    S('Soon the water was up to our knees.', { ...GREY, show: GUESTS, cam: R(0, 2.4, 2.4, 15, .5, 2, 48), update: (w, p, t) => { wedding(w, t, { cry: ['dad', 'lee', 'mayor', 'dave'], water: .2 + p, cs: .8 }); } }),
    S('Then up to our waists.', { ...GREY, show: GUESTS, cam: R(0, 3, 2.4, 13, .5, -2, 48), update: (w, p, t) => { wedding(w, t, { cry: ['dad', 'lee', 'mayor', 'dave'], water: 1.2 + p * 1.6, cs: .8 }); } }),
    S('Barry did the ceremony. Five dollars.', { label: '*BARRY*', ...GREY, show: WED, cam: F(0, 4.65, -8.6, 7, .55, .8), update: (w, p, t) => { wedding(w, t, { cry: ['barry'], water: 2.8, talk: 'barry' }); } }),
    S('He said: you may now kiss the bride.', { label: '*BARRY*', ...GREY, show: WED, cam: F(0, 4.65, -8.6, 9, .55, -.8), update: (w, p, t) => { wedding(w, t, { cry: ['barry'], water: 2.8, talk: p > .3 ? 'barry' : null }); } }),
    S('So I kissed my wife.', { ...GREY, show: WED, cam: F(0, 4.65, -7.2, 7, .55, 2), update: (w, p, t) => { const o = wedding(w, t, { cry: ['barry'], water: 2.8 }); const q = h1(t / .8); o.m.root.position.x = -1.6 + 1.05 * q; o.r.root.position.x = 1.6 - 1.05 * q; } }),
    S('Everyone cheered. And the rain stopped.', { show: GUESTS, cam: R(0, 3.6, 2.4, 16, .5, 1.5, 48), update: (w, p, t) => { const o = wedding(w, t, { water: 2.8, cry: p < .4 ? ['dad', 'lee', 'mayor', 'dave', 'barry', 'cat'] : [] }); for (const n in SEAT) { const a = A(w, n); a.arms[0].rotation.z = -2.6; a.arms[1].rotation.z = 2.6; } } }),
    S('So the whole town went for a swim. In their best clothes.', { sky: '#9ED2F3', show: WED, cam: F(0, 3.2, 1, 20, .5, -4, 4), update: (w, p, t) => { const o = wedding(w, t, { water: 2.8, float: .9 + .2 * Math.sin(t * 2) }); for (const n of PEOPLE) { const a = A(w, n); a.arms[0].rotation.z = -1.4 + .4 * Math.sin(t * 3 + n.length); a.arms[1].rotation.z = 1.4 - .4 * Math.sin(t * 3 + n.length); } } }),
    S('And Mister Biscuit said what everyone was thinking.', { label: '*MR BISCUIT*', show: WED, cam: F(-1.4, 3.4, 4.2, 6, .5, -1.5), update: (w, p, t) => { wedding(w, t, { water: 2.8, float: 1 }); } }),
    S('Best. Wedding. Ever.', { label: '*"BEST. WEDDING. EVER."*', show: WED, cam: F(-1.4, 3.5, 4.2, 4.5, .5, -.6), update: (w, p, t) => { wedding(w, t, { water: 2.8, float: 1, cat: true }); } }),
  ],
};
