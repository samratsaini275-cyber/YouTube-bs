// "In This Town" episode 7 (long form). Original story; same town and townspeople as 900–905.
// Rule: in this town, cats say what you are thinking, out loud. Milo proposes to Rosie; her cat nearly ruins it.

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

function makeCat(k, color, parent) {
  const { mat, box, cone, group } = k; const c = { g: group([0, 0, 0], parent) }; const fur = mat(color, { rough: .9 });
  box(1.4, .7, .7, fur, [0, .55, 0], c.g); c.legs = []; for (const x of [-.5, .5]) for (const z of [-.25, .25]) c.legs.push(box(.18, .35, .18, fur, [x, .18, z], c.g));
  c.tail = box(.12, .9, .12, fur, [-.75, .9, 0], c.g); c.tail.rotation.z = .5;
  c.head = group([.85, 1.05, 0], c.g); box(.6, .55, .6, fur, [0, 0, 0], c.head); for (const z of [-.18, .18]) cone(.12, .25, fur, [0, .38, z], c.head, 4);
  for (const z of [-.13, .13]) box(.03, .14, .08, mat('#111111'), [.31, .06, z], c.head); c.mouth = box(.03, .05, .16, mat('#5A1E1E'), [.31, -.13, 0], c.head);
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  box(80, .05, 6, mat('#5E6670', { rough: 1 }), [0, .03, 4], w.town);
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -8], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -8], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -5.95], w.town); }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -3.2], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  w.roses = group(); for (let i = 0; i < 7; i++) { cyl(.05, .05, 1.4, mat('#2E8B4A'), [-3 + i, .7, -1.5], w.roses, 6); ball(.25, mat('#E2453C'), [-3 + i, 1.5, -1.5], w.roses); }
  w.stall = group(); box(4, 1.6, 1.4, mat('#3B82F6'), [0, .8, 1.2], w.stall); for (let i = 0; i < 5; i++) box(.5, .35, .4, mat('#FFFFFF'), [-1.4 + i * .7, 1.78, 1.2], w.stall);
  w.bed = group(); box(4, 1, 6, mat('#8A5A3B'), [0, .5, 0], w.bed); box(3.8, .5, 5.8, mat('#FFFFFF'), [0, 1.2, 0], w.bed); box(3.8, .4, 3.6, mat('#3B82F6'), [0, 1.5, .9], w.bed); box(2, .4, 1, mat('#FFFFFF'), [0, 1.6, -2.3], w.bed);
  w.room = group(); box(30, .2, 20, mat('#C79A6B'), [0, -.1, 0], w.room); box(30, 14, .3, mat('#F3E0C7'), [0, 7, -5], w.room);
  box(3, 2.2, .1, mat('#8A5A3B'), [-6, 5.4, -4.8], w.room); box(2.6, 1.8, .12, mat('#BFD8EE'), [-6, 5.4, -4.75], w.room);
  for (let i = 0; i < 3; i++) { const c = cyl(.1, .1, .6, mat('#FFFFFF'), [3 + i * .5, 2.9, -4.4], w.room, 8); ball(.08, mat('#FFC21F', { glow: 1 }), [3 + i * .5, 3.3, -4.4], w.room); }
  box(3, 2.4, 1.2, mat('#6B4428'), [3.5, 1.2, -4.2], w.room);
  w.sofa = group([0, 0, -2.6], w.room); box(7, 1.4, 2, mat('#7A3E2E', { rough: .9 }), [0, .7, 0], w.sofa); box(7, 2, .6, mat('#7A3E2E', { rough: .9 }), [0, 2, -.8], w.sofa);
  w.ring = group(); const rg = k.torus(.16, .04, mat('#FFC21F', { metal: .9, rough: .2 }), [0, 0, 0], w.ring); rg.rotation.x = 0; ball(.08, mat('#BFF3FF', { glow: .6, rough: .05 }), [0, .2, 0], w.ring);
  w.box = group(); box(.5, .3, .5, mat('#B3262E'), [0, 0, 0], w.box);
  w.cats = group();
  w.c = { dave: makeCat(k, '#888888', w.cats), lee: makeCat(k, '#FFFFFF', w.cats), barry: makeCat(k, '#111111', w.cats), mayor: makeCat(k, '#C8935A', w.cats), biscuit: makeCat(k, '#E8913A', w.cats) };
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
// show only the named cats; each at (x,z) facing ry; talk opens its mouth; s = scale
function cats(w, list, t) { for (const n in w.c) w.c[n].g.visible = false; for (const [n, x, y, z, ry, talk, s] of list) { const c = w.c[n]; c.g.visible = true; c.g.position.set(x, y, z); c.g.rotation.set(0, ry, 0); c.g.scale.setScalar(s || 1.4); c.mouth.scale.y = talk ? 1 + 3 * Math.abs(Math.sin(t * 12)) : 1; c.head.rotation.set(0, 0, talk ? .1 * Math.sin(t * 6) : 0); c.tail.rotation.z = .5 + .2 * Math.sin(t * 3); } }
function kneel(a) { a.legs[0].rotation.x = -1.5; a.legs[1].rotation.x = 1.5; a.root.position.y -= 1.1; }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 28 }, o);
const TOWN = ['ground', 'town', 'cats'];
const IN = { sky: '#F3E0C7', lightAt: [0, 8, 3], lightDist: 26 };
const ROOM = ['room', 'cats'];
const CATR = ry => -Math.PI / 2 + ry; // cat model faces +x; this turns it to face the camera-ish
// Rosie's living room: Milo left, Rosie right, Mr Biscuit on the floor between them
function room(w, t, o = {}) {
  const m = P(w, 'milo', -1.5, 0, 0, .35, t, o.talk === 'milo');
  const r = P(w, 'rosie', 1.5, 0, 0, -.35, t, o.talk === 'rosie');
  cats(w, [['biscuit', 0, 0, 1.2, CATR(0), o.cat, 1.3]], t);
  return [m, r];
}

export default {
  id: '906',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS SAY YOUR THOUGHTS',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'CATS SAY YOUR THOUGHTS.'],
  title: 'In this town, cats say what you\'re thinking',
  description: 'In this town, cats say your thoughts out loud. Tonight I was going to ask Rosie to marry me. Her cat is called Mr Biscuit. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, cats read minds.', { show: [...TOWN, 'dave'], cam: F(0, 3.4, 0, 10, .7, 1.5), update: (w, p, t) => { P(w, 'dave', -1, 0, -.5, .3, t); cats(w, [['dave', 1.5, 0, 1, CATR(-.4), t > .6, 1.6]], t); } }),
    S('And they say what you\'re thinking. Out loud.', { show: [...TOWN, 'dave'], cam: F(1.5, 2, 1, 6, .53, -1), update: (w, p, t) => { P(w, 'dave', -1, 0, -.5, .3, t); cats(w, [['dave', 1.5, 0, 1, CATR(-.4), true, 1.6]], t); } }),
    S('Dave\'s cat tells everyone he\'s not five minutes away.', { label: '*DAVE\'S CAT*', show: [...TOWN, 'dave'], cam: F(1.5, 2, 1, 6, .53, 1), update: (w, p, t) => { P(w, 'dave', -1, 0, -.5, .3, t); cats(w, [['dave', 1.5, 0, 1, CATR(-.4), p > .3, 1.6]], t); } }),
    S('He\'s still in bed.', { label: '*DAVE*', show: ['ground', 'bed', 'dave', 'cats'], cam: { pos: [2, 9, 5.5], look: [0, 1.6, -.6], fov: 46, to: { pos: [1.8, 8.4, 5], look: [0, 1.6, -.6], fov: 45 } }, update: (w, p, t) => { const a = P(w, 'dave', 0, 1.7, 1.4, 0, t); a.root.rotation.x = -Math.PI / 2; a.root.position.z = 2.2; a.root.position.y = 2.1; w.bed.scale.set(2, 1, 1.7); a.mouth.scale.y = .4; cats(w, [['dave', 1.1, 1.75, .6, CATR(.4), false, 1]], t); } }),
    S('Missus Lee\'s cat says she secretly hates her neighbour\'s roses.', { label: '*MRS LEE\'S CAT*', show: [...TOWN, 'lee', 'roses'], cam: F(0, 3.4, 0, 10, .53, 1.5), update: (w, p, t) => { const l = P(w, 'lee', -1.4, 0, -.3, .3, t); cats(w, [['lee', 1.4, 0, .8, CATR(-.3), p > .2, 1.6]], t); if (p > .7) { l.mouth.scale.y = 3; l.arms[0].rotation.z = -2.5; } } }),
    S('Barry\'s cat says his tissues are paper towels.', { label: '*BARRY\'S CAT*', show: [...TOWN, 'barry', 'stall'], cam: F(0, 3.6, 0, 10, .55, 1.5), update: (w, p, t) => { P(w, 'barry', 0, 0, -.4, 0, t); cats(w, [['barry', 1, 1.6, 1.2, CATR(-.3), p > .2, 1]], t); } }),
    S('The mayor\'s cat only ever says two words: Missus Lee.', { label: '*THE MAYOR\'S CAT*', show: [...TOWN, 'mayor'], cam: F(0, 3.6, 0, 10, .55, 1.5), update: (w, p, t) => { const m = P(w, 'mayor', -1, 0, -.5, .3, t); cats(w, [['mayor', 1.5, 0, 1, CATR(-.4), p > .6, 1.6]], t); if (p > .7) m.arms[1].rotation.z = 2.2; } }),
    S('And me? I\'m Milo. I don\'t have a cat.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { P(w, 'milo', 0, 0, 0, 0, t, false, p < .4 ? 1 : 0); cats(w, [], t); } }),
    S('But Rosie does. His name is Mister Biscuit.', { label: '*MR BISCUIT*', ...IN, show: [...ROOM, 'rosie'], cam: F(.6, 2.6, .6, 8, .52, 1), update: (w, p, t) => { P(w, 'rosie', -.4, 0, -.4, .3, t, p < .4); cats(w, [['biscuit', 1.2, 0, .8, CATR(-.3), false, 1.4]], t); } }),
    S('Tonight, I was going to ask Rosie to marry me.', { label: '7:30 PM', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(0, 4, 0, 13, .55), update: (w, p, t) => { room(w, t, { talk: 'milo' }); } }),
    S('The ring was in my pocket.', { ...IN, show: [...ROOM, 'milo', 'rosie', 'ring', 'box'], cam: F(-1.5, 2.6, 0, 4, .5, -.5), update: (w, p, t) => { room(w, t); w.box.position.set(-1.0, 2.6, .55); w.ring.position.set(-1.0, 2.9 + .05 * Math.sin(t * 3), .55); w.ring.rotation.y = t; } }),
    S('The problem was Mister Biscuit.', { label: '*MR BISCUIT*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(0, 1.4, 1.2, 5, .5, 1.5, 1), update: (w, p, t) => { room(w, t); w.c.biscuit.head.rotation.y = .4 * Math.sin(t * 1.5); } }),
    S('If I thought about the ring, he would say it.', { ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(-.6, 3.4, .4, 9, .53, -1.5), update: (w, p, t) => { room(w, t); A(w, 'milo').head.rotation.x = .3; } }),
    S('So I thought about sandwiches. Only sandwiches.', { label: '*THINK: SANDWICH*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(-1.5, 4.65, 0, 6, .55, -.6), update: (w, p, t) => { room(w, t); const m = A(w, 'milo'); m.head.rotation.z = .1 * Math.sin(t * 2); m.mouth.scale.set(.6, .6, 1); } }),
    S('Mister Biscuit said: sandwich.', { label: '*"SANDWICH."*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(0, 1.4, 1.2, 5, .5, -1.5, 1), update: (w, p, t) => { room(w, t, { cat: p > .55 }); } }),
    S('Sandwich. Sandwich. Sandwich.', { label: '*"SANDWICH."*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(0, 2.6, .6, 9, .52, 1.5), update: (w, p, t) => { room(w, t, { cat: true }); } }),
    S('Rosie asked: are you hungry?', { label: '*ROSIE*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(1.5, 4.65, 0, 6, .55, .6), update: (w, p, t) => { room(w, t, { talk: p > .3 ? 'rosie' : null }); A(w, 'rosie').head.rotation.y = -.4; } }),
    S('And I thought: no, I\'ve got a ring.', { ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(-1.5, 4.65, 0, 6, .55, -.6), update: (w, p, t) => { room(w, t); const m = A(w, 'milo'); if (p > .6) { m.mouth.scale.y = 3; m.arms[0].rotation.z = -.6; m.arms[1].rotation.z = .6; } } }),
    S('Mister Biscuit said: ring.', { label: '*"RING."*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(0, 1.4, 1.2, 5, .5, 1.5, 1), update: (w, p, t) => { room(w, t, { cat: p > .55 && p < .85 }); } }),
    S('Rosie froze.', { label: '*ROSIE*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(1.5, 4.65, 0, 5, .55, .4), update: (w, p, t) => { room(w, t); A(w, 'rosie').mouth.scale.set(1.2, 2.2, 1); } }),
    S('So I knelt down.', { ...IN, show: [...ROOM, 'milo', 'rosie', 'ring', 'box'], cam: F(0, 3.4, 0, 11, .53, 2), update: (w, p, t) => { const [m] = room(w, t); const q = h1(t / .7); m.root.position.x = -1.5 + q * .7; if (q > .5) kneel(m); m.arms[1].rotation.x = -1.4 * q; m.root.rotation.y = .35 + .5 * q; w.c.biscuit.g.position.x = -2.6; const hnd = hand(m); w.box.position.set(hnd.x, hnd.y, hnd.z); w.ring.position.set(hnd.x, hnd.y + .25, hnd.z); w.ring.rotation.y = t; w.box.visible = w.ring.visible = q > .6; } }),
    S('I said: Rosie, will you marry me?', { label: '*MILO*', ...IN, show: [...ROOM, 'milo', 'rosie', 'ring', 'box'], cam: F(-.8, 3.4, 0, 7, .53, -1.5), update: (w, p, t) => { const [m] = room(w, t, { talk: 'milo' }); m.root.position.x = -.8; kneel(m); m.arms[1].rotation.x = -1.4; m.root.rotation.y = .85; w.c.biscuit.g.position.x = -2.6; const hnd = hand(m); w.box.position.set(hnd.x, hnd.y, hnd.z); w.ring.position.set(hnd.x, hnd.y + .25, hnd.z); w.ring.rotation.y = t; } }),
    S('She said: yes.', { label: '*ROSIE*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(1.5, 4.65, 0, 6, .55, .6), update: (w, p, t) => { const [, r] = room(w, t, { talk: p > .35 && p < .7 ? 'rosie' : null }); w.c.biscuit.g.position.x = -2.6; r.root.position.y = p > .7 ? .3 * Math.abs(Math.sin(t * 8)) : 0; } }),
    S('No balloon.', { label: '*NO BALLOON.*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(0, 4.4, 0, 9, .55), update: (w, p, t) => { const [m, r] = room(w, t); m.root.position.x = -.5; r.root.position.x = .5; m.root.rotation.y = 1.3; r.root.rotation.y = -1.3; w.c.biscuit.g.position.x = -2.6; } }),
    S('Then Mister Biscuit said what Rosie was thinking.', { label: '*MR BISCUIT*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(-2.6, 1.4, 1.2, 5, .5, -1, 1), update: (w, p, t) => { const [m, r] = room(w, t); m.root.position.x = -.5; r.root.position.x = .5; m.root.rotation.y = 1.3; r.root.rotation.y = -1.3; w.c.biscuit.g.position.x = -2.6; } }),
    S('Finally.', { label: '*"FINALLY."*', ...IN, show: [...ROOM, 'milo', 'rosie'], cam: F(-2.6, 1.6, 1.2, 4, .5, -.5, .8), update: (w, p, t) => { const [m, r] = room(w, t, { cat: t > .15 && t < .9 }); m.root.position.x = -.5; r.root.position.x = .5; m.root.rotation.y = 1.3; r.root.rotation.y = -1.3; w.c.biscuit.g.position.x = -2.6; } }),
  ],
};
