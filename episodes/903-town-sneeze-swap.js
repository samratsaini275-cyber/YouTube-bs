// "In This Town" episode 4 (long form). Original story; same town and townspeople as 900–902.
// Rule: in this town, a sneeze swaps your body with whoever is closest. Shown by swapping heads between bodies.

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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  box(80, .05, 6, mat('#5E6670', { rough: 1 }), [0, .03, 4], w.town);
  const hc = ['#F2D7A6', '#BFD8EE', '#F7C6C6', '#D8E8B8', '#E9D0F0'];
  for (let i = 0; i < 9; i++) { const hx = -24 + i * 6; box(4.4, 4 + (i % 3), 4, mat(hc[i % 5]), [hx, 2 + (i % 3) / 2, -8], w.town); const r = cone(3.4, 2.2, mat('#B3262E'), [hx, 5.2 + (i % 3), -8], w.town, 4); r.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8A5A3B'), [hx, .9, -5.95], w.town); box(1.1, 1.1, .1, mat('#BFE3F7', { glow: .2 }), [hx + 1.2, 2.8, -5.95], w.town); }
  for (let i = 0; i < 8; i++) { const t = group([-21 + i * 6, 0, -3.2], w.town); cyl(.25, .3, 2, mat('#7A5230'), [0, 1, 0], t, 8); ball(1.3, mat('#2E8B4A'), [0, 2.8, 0], t); }
  w.sign = group(); box(.2, 4, .2, mat('#666666'), [0, 2, 0], w.sign); box(3.6, 1.4, .15, mat('#FFFFFF'), [0, 4.2, .1], w.sign); box(3.2, .25, .17, mat('#E2453C'), [0, 4.2, .12], w.sign);
  w.stall = group(); box(4, 1.6, 1.4, mat('#3B82F6'), [0, .8, 1.2], w.stall); for (let i = 0; i < 5; i++) { box(.5, .35, .4, mat('#FFFFFF'), [-1.4 + i * .7, 1.78, 1.2], w.stall); box(.2, .2, .05, mat('#EEEEEE'), [-1.4 + i * .7, 2.05, 1.2], w.stall); }
  w.pepper = group(); cyl(.14, .14, .5, mat('#333333'), [0, .25, 0], w.pepper, 12); ball(.14, mat('#AAAAAA', { metal: .6 }), [0, .52, 0], w.pepper);
  // living room
  w.room = group(); box(30, .2, 20, mat('#C79A6B'), [0, -.1, 0], w.room); box(30, 14, .3, mat('#DCE8D2'), [0, 7, -5], w.room);
  box(3, 2.2, .1, mat('#8A5A3B'), [-6, 5.4, -4.8], w.room); box(2.6, 1.8, .12, mat('#BFD8EE'), [-6, 5.4, -4.75], w.room);
  w.sofa = group([0, 0, -2.6]); box(7, 1.4, 2, mat('#7A3E2E', { rough: .9 }), [0, .7, 0], w.sofa); box(7, 2, .6, mat('#7A3E2E', { rough: .9 }), [0, 2, -.8], w.sofa); for (const x of [-3.4, 3.4]) box(.6, 1.8, 2, mat('#6A3426'), [x, 1.1, 0], w.sofa);
  // cat: body in w.cat, head on w.catSlot so it can be swapped
  w.cat = group(); const fur = mat('#E8913A', { rough: .9 }); box(1.4, .7, .7, fur, [0, .55, 0], w.cat); for (const x of [-.5, .5]) for (const z of [-.25, .25]) box(.18, .35, .18, fur, [x, .18, z], w.cat); const tl = box(.12, .9, .12, fur, [-.75, .9, 0], w.cat); tl.rotation.z = .5;
  w.catSlot = group([.85, 1.05, 0], w.cat);
  w.catHead = group([0, 0, 0], w.catSlot); box(.6, .55, .6, fur, [0, 0, 0], w.catHead); for (const z of [-.18, .18]) { const e = cone(.12, .25, fur, [0, .38, z], w.catHead, 4); } for (const z of [-.13, .13]) box(.03, .14, .08, mat('#111111'), [.31, .06, z], w.catHead); box(.03, .06, .1, mat('#F7A1B5'), [.31, -.08, 0], w.catHead);
  w.milo = avatar(k, k.scene, { shirt: '#3B82F6', hair: '#3A2A1A' }).root;
  w.rosie = avatar(k, k.scene, { shirt: '#E2453C', hair: '#C2683A', long: true, skin: '#C68A5A' }).root;
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#8A5A3B', apron: true, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hat: true }).root;
  const d = avatar(k, k.scene, { shirt: '#1E3A8A', pants: '#1E2A4A', skin: '#A86B42' }); w.dad = d.root;
  box(1.36, .3, 1.36, mat('#1E3A8A'), [0, .72, 0], d.head); box(1.36, .1, .5, mat('#111111'), [0, .6, .7], d.head); box(.5, .14, .06, mat('#3A2A1A'), [0, -.08, .62], d.head); box(.3, .3, .06, mat('#FFC21F', { metal: .6 }), [-.45, 3.6, .52], d.root);
  return w;
}

const H = {};
function A(w, n) { if (H[n]) return H[n]; const r = w[n]; const c = r.children; H[n] = { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head: c[5], mouth: c[5].children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) }; return H[n]; }
const PEOPLE = ['milo', 'rosie', 'dave', 'lee', 'barry', 'mayor', 'dad'];
// heads(w, {body: head}) puts each head on a body; anything not listed goes home. Run first in every update.
function heads(w, m = {}) {
  PEOPLE.forEach(n => A(w, n));
  const home = n => n === 'cat' ? [w.catSlot, [0, 0, 0], 1] : [A(w, n).root, [0, 4.65, 0], 1];
  const hd = n => n === 'cat' ? w.catHead : A(w, n).head;
  const placed = new Set(Object.values(m));
  for (const n of [...PEOPLE, 'cat']) if (!placed.has(n)) { const [p, pos] = home(n); p.add(hd(n)); hd(n).position.set(...pos); hd(n).scale.setScalar(1); }
  for (const body in m) { const h = hd(m[body]); const [p, pos] = home(body); p.add(h); h.position.set(...pos); h.scale.setScalar(body === 'cat' ? .45 : m[body] === 'cat' ? 2.1 : 1); }
}
function P(w, n, x, y, z, ry, t, talk = false, wave = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); return a; }
function sneeze(a, t, t0) { const q = t - t0; if (q < 0) return; a.head.rotation.x = q < .35 ? -.4 * q / .35 : .5 * Math.max(0, 1 - (q - .35) * 3); a.mouth.scale.y = q < .35 ? 1 : 4 * Math.max(0, 1 - (q - .35) * 2); }
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); }
function catAt(w, x, y, z, ry) { w.cat.position.set(x, y, z); w.cat.rotation.set(0, ry, 0); w.catHead.rotation.set(0, 0, 0); }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 28 }, o);
const TOWN = ['ground', 'town'];
const IN = { sky: '#DCE8D2', lightAt: [0, 8, 3], lightDist: 26 };
const ROOM = ['room', 'sofa', 'cat'];
// living room seats: Milo left, dad right, on the sofa
function seated(w, t, m = {}, o = {}) {
  heads(w, m);
  const mi = P(w, 'milo', -1.6, 0, -2.3, 0, t, o.talk === 'milo'); sit(mi); mi.root.position.y += .3;
  const da = P(w, 'dad', 1.6, 0, -2.3, 0, t, o.talk === 'dad'); sit(da); da.root.position.y += .3;
  if (o.catLap !== false) catAt(w, -1.6, 2.15, -1.3, 0);
}

export default {
  id: '903',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SNEEZES SWAP BODIES',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'SNEEZES SWAP BODIES.'],
  title: 'In this town, sneezing swaps your body',
  description: 'In this town, when you sneeze, you swap bodies with whoever is closest. Tonight I met Rosie\'s dad. He\'s a police officer. I\'m allergic to his cat. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, sneezes swap you.', { show: [...TOWN, 'dave', 'lee'], cam: F(0, 4.65, 0, 11, .56), update: (w, p, t) => { heads(w, t > 1.1 ? { dave: 'lee', lee: 'dave' } : {}); const d = P(w, 'dave', -1.4, 0, 0, .25, t); P(w, 'lee', 1.4, 0, 0, -.25, t); sneeze(A(w, 'dave'), t, .4); } }),
    S('Sneeze, and you swap with whoever is closest.', { show: [...TOWN, 'dave', 'lee'], cam: F(0, 4.65, 0, 12, .55, 1.5), update: (w, p, t) => { heads(w, { dave: 'lee', lee: 'dave' }); P(w, 'dave', -1.4, 0, 0, .25, t); P(w, 'lee', 1.4, 0, 0, -.25, t); A(w, 'dave').head.rotation.y = .5 * Math.sin(t * 3); A(w, 'lee').head.rotation.y = -.5 * Math.sin(t * 3); } }),
    S('Sneeze again, and you swap back.', { show: [...TOWN, 'dave', 'lee'], cam: F(0, 4.65, 0, 12, .55, -1.5), update: (w, p, t) => { heads(w, t < .9 ? { dave: 'lee', lee: 'dave' } : {}); P(w, 'dave', -1.4, 0, 0, .25, t); P(w, 'lee', 1.4, 0, 0, -.25, t); sneeze(A(w, 'lee'), t, .2); } }),
    S('This is Dave.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t) => { heads(w); P(w, 'dave', 0, 0, 0, 0, t, false, 1); } }),
    S('Dave sneezed next to the mayor.', { label: '*DAVE*', show: [...TOWN, 'dave', 'mayor'], cam: F(0, 4.65, 0, 12, .55, 1.5), update: (w, p, t) => { heads(w, t > 1.2 ? { dave: 'mayor', mayor: 'dave' } : {}); P(w, 'dave', -1.4, 0, 0, .25, t); P(w, 'mayor', 1.4, 0, 0, -.25, t); sneeze(A(w, 'dave'), t, .5); } }),
    S('For one week, Dave ran the town.', { label: '*MAYOR DAVE*', show: [...TOWN, 'mayor'], cam: F(0, 4.65, 0, 9, .55, 1), update: (w, p, t) => { heads(w, { mayor: 'dave', dave: 'mayor' }); P(w, 'mayor', 0, 0, 0, 0, t, true, 1); } }),
    S('He cancelled Mondays.', { label: '*NO MONDAYS*', show: [...TOWN, 'mayor', 'sign'], cam: F(1, 4.4, 0, 11, .52, -1.5), update: (w, p, t) => { heads(w, { mayor: 'dave', dave: 'mayor' }); P(w, 'mayor', -.6, 0, 0, .3, t, true); A(w, 'mayor').arms[1].rotation.z = 1.6; w.sign.position.set(2.2, 0, -.5); } }),
    S('Missus Lee carries pepper everywhere. For emergencies.', { label: '*MRS LEE*', show: [...TOWN, 'lee', 'pepper'], cam: F(0, 4.4, 0, 8, .55, 1), update: (w, p, t) => { heads(w); P(w, 'lee', 0, 0, 0, 0, t, true); const a = A(w, 'lee'); a.arms[1].rotation.x = -1.4; const h = hand(a); w.pepper.position.set(h.x, h.y - .1, h.z + .2); } }),
    S('Barry has a tissue stand. Five dollars each.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry'], cam: F(0, 4, 0, 10, .55, 1.5), update: (w, p, t) => { heads(w); P(w, 'barry', 0, 0, -.4, 0, t, true, 1); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { heads(w); P(w, 'milo', 0, 0, 0, 0, t, false, 1); } }),
    S('Tonight, I finally met Rosie\'s dad.', { label: '7:00 PM', ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(0, 4, -2.3, 12, .52), update: (w, p, t) => { seated(w, t, {}, { talk: 'milo', catLap: false }); catAt(w, 4.5, 0, -1, -1.6); } }),
    S('He\'s a police officer.', { label: '*ROSIE\'S DAD*', ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(1.6, 4, -2.3, 7, .52, .8), update: (w, p, t) => { seated(w, t, {}, { catLap: false }); catAt(w, 4.5, 0, -1, -1.6); A(w, 'dad').head.rotation.y = -.3; } }),
    S('And I\'m allergic to his cat.', { label: '*THE CAT*', ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(3.5, 1, -1, 5, .5, 1, 1), update: (w, p, t) => { seated(w, t, {}, { catLap: false }); catAt(w, 4.5 - p * 2, 0, -1, Math.PI); w.catHead.rotation.y = .3 * Math.sin(t * 2); } }),
    S('The cat sat on my lap.', { ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(-1.6, 3.4, -2.3, 8, .52, -1), update: (w, p, t) => { seated(w, t, {}, { catLap: false }); const q = Math.min(1, t / .9); catAt(w, -1.6 + (1 - q) * 3, 2.15 * Math.sin(q * Math.PI / 2), -1.3, 0); } }),
    S('My nose started to twitch.', { ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(-1.6, 4.3, -2.3, 6, .53, -.5), update: (w, p, t) => { seated(w, t); A(w, 'milo').head.rotation.z = .05 * Math.sin(t * 30) * p; } }),
    S('I held it in. For ten minutes.', { label: '7:10 PM', ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(0, 4, -2.3, 10, .52), update: (w, p, t) => { seated(w, t, {}, { talk: 'dad' }); const m = A(w, 'milo'); m.head.rotation.x = -.15; m.mouth.scale.set(.5, .5, 1); m.root.position.x += .02 * Math.sin(t * 50); } }),
    S('Then I sneezed.', { ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(0, 4, -2.3, 10, .52, 1), update: (w, p, t) => { seated(w, t, t > .9 ? { milo: 'dad', dad: 'milo' } : {}); sneeze(A(w, 'milo'), t, .3); } }),
    S('Now I was Rosie\'s dad.', { ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(1.6, 4.3, -2.3, 6, .53, .6), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo' }); const a = A(w, 'milo'); a.head.rotation.y = -.5 * Math.sin(t * 2); a.arms[1].rotation.x = -1.2; } }),
    S('And he was me.', { ...IN, show: [...ROOM, 'milo', 'dad'], cam: F(-1.6, 4.3, -2.3, 6, .53, -.6), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo' }); const a = A(w, 'dad'); a.head.rotation.y = .5 * Math.sin(t * 2); } }),
    S('Then Rosie walked in.', { label: '*ROSIE*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(0, 4.4, -1, 15, .53), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo' }); const r = P(w, 'rosie', 6 - Math.min(1, t / 1) * 2, 0, 0, -.9, t); if (t < 1) walk(r, t); } }),
    S('She looked at us. Then at the cat.', { label: '*ROSIE*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(4, 4.65, 0, 7, .55, -1), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo' }); const r = P(w, 'rosie', 4, 0, 0, -.9, t); r.head.rotation.x = p > .5 ? .35 : 0; } }),
    S('Her dad, in my body, said: I can explain.', { ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(-1.6, 4.3, -2.3, 7, .53, -.8), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo' }, { talk: p > .5 ? 'dad' : null }); P(w, 'rosie', 4, 0, 0, -.9, t); } }),
    S('Then the cat sneezed.', { label: '*THE CAT*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(-.8, 3, -1.3, 6, .5, -1.5), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo' }); P(w, 'rosie', 2.8, 0, -.4, -.8, t); w.catHead.rotation.z = t < .5 ? .4 * t / .5 : -.4 * Math.max(0, 1 - (t - .5) * 3); } }),
    S('It swapped with Rosie.', { ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(0, 3.4, -.6, 11, .52, 1), update: (w, p, t) => { const sw = t > .4; seated(w, t, sw ? { milo: 'dad', dad: 'milo', rosie: 'cat', cat: 'rosie' } : { milo: 'dad', dad: 'milo' }); P(w, 'rosie', 2.8, 0, -.4, -.8, t); } }),
    S('Rosie was now a cat. A very angry cat.', { label: '*ROSIE (CAT)*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(-.75, 3.2, -1.3, 5, .52, 1.8, .2), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo', rosie: 'cat', cat: 'rosie' }); P(w, 'rosie', 2.8, 0, -.4, -.8, t); const r = A(w, 'rosie'); r.mouth.scale.y = 1 + 2.5 * Math.abs(Math.sin(t * 11)); w.cat.position.y += .1 * Math.abs(Math.sin(t * 8)); } }),
    S('Luckily, Missus Lee was walking past. With her pepper.', { label: '*MRS LEE*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie', 'lee', 'pepper'], cam: F(5, 4.65, .5, 9, .55, 1), update: (w, p, t) => { seated(w, t, { milo: 'dad', dad: 'milo', rosie: 'cat', cat: 'rosie' }); P(w, 'rosie', 2.8, 0, -.4, -.8, t); const l = P(w, 'lee', 5.5, 0, .5, -.7, t, false, 1); const h = hand(A(w, 'lee')); l.arms[0].rotation.x = -1.3; w.pepper.position.set(5.5 + .9, 3, 1.4); } }),
    S('Three sneezes later, everyone was back.', { ...IN, show: [...ROOM, 'milo', 'dad', 'rosie', 'lee'], cam: F(1, 4.2, -1, 15, .53), update: (w, p, t) => { const m = p < .33 ? { milo: 'dad', dad: 'milo', rosie: 'cat', cat: 'rosie' } : p < .66 ? { milo: 'dad', dad: 'milo' } : {}; seated(w, t, m); P(w, 'rosie', 2.8, 0, -.4, -.8, t); P(w, 'lee', 5.5, 0, .5, -.7, t); for (const [n, s] of [['rosie', .25], ['milo', .55], ['dad', .55]]) sneeze(A(w, n), p * 3.3, s * 3.3); } }),
    S('Her dad looked at me and asked: do you love my daughter?', { label: '*ROSIE\'S DAD*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(1.6, 4.3, -2.3, 7, .53, .8), update: (w, p, t) => { seated(w, t, {}, { talk: p > .35 ? 'dad' : null }); P(w, 'rosie', 4, 0, 0, -.9, t); A(w, 'dad').head.rotation.y = -.5; } }),
    S('I said: yes.', { label: '*MILO*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(-1.6, 4.3, -2.3, 6, .53, -.6), update: (w, p, t) => { seated(w, t, {}, { talk: t > .4 && t < 1 ? 'milo' : null }); A(w, 'milo').head.rotation.y = .5; } }),
    S('No balloon.', { label: '*NO BALLOON.*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(0, 4.3, -1.5, 12, .53), update: (w, p, t) => { seated(w, t); P(w, 'rosie', 4, 0, 0, -.9, t, false, 1); } }),
    S('He said: welcome to the family.', { label: '*ROSIE\'S DAD*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(1.6, 4.3, -2.3, 7, .53, .8), update: (w, p, t) => { seated(w, t, {}, { talk: 'dad' }); A(w, 'dad').arms[0].rotation.z = -1.3; P(w, 'rosie', 4, 0, 0, -.9, t); } }),
    S('Then the cat sneezed again.', { label: '*THE CAT*', ...IN, show: [...ROOM, 'milo', 'dad', 'rosie'], cam: F(-1.6, 3.4, -1.8, 7, .5, .8), update: (w, p, t) => { seated(w, t, t > 1 ? { milo: 'cat', cat: 'milo' } : {}); P(w, 'rosie', 4, 0, 0, -.9, t); w.catHead.rotation.z = t < .6 ? .4 * t / .6 : 0; } }),
  ],
};
