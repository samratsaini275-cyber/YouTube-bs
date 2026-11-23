// "In This Town" episode 5 (long form). Original story; same town and townspeople as 900–903.
// Rule: in this town, your hair colour shows how you feel. Red angry, blue sad, pink in love, yellow nervous.

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
  w.car = group(); box(4.4, 1.2, 2, mat('#3B82F6', { rough: .3 }), [0, 1, 0], w.car); box(2.4, 1, 1.8, mat('#BFE3F7', { rough: .1 }), [-.2, 2.1, 0], w.car); for (const x of [-1.4, 1.4]) for (const z of [-1, 1]) { const wh = cyl(.45, .45, .3, mat('#222222'), [x, .45, z], w.car, 16); wh.rotation.x = Math.PI / 2; }
  w.stall = group(); box(4, 1.6, 1.4, mat('#A855F7'), [0, .8, 1.2], w.stall); for (let i = 0; i < 4; i++) { const c = ['#E2453C', '#3B82F6', '#111111', '#22C55E'][i]; cyl(.32, .32, .05, mat(c), [-1.2 + i * .8, 1.63, 1.2], w.stall, 16); cyl(.2, .2, .35, mat(c), [-1.2 + i * .8, 1.8, 1.2], w.stall, 16); }
  // park picnic
  w.park = group(); for (let i = 0; i < 10; i++) { const t = group([-14 + i * 3.2, 0, -6 - (i % 3) * 2], w.park); cyl(.3, .35, 2.4, mat('#7A5230'), [0, 1.2, 0], t, 8); ball(1.6, mat(['#2E8B4A', '#3FA34D', '#2A7A40'][i % 3]), [0, 3.4, 0], t); }
  box(5, .06, 3.4, mat('#E2453C'), [0, .04, 0], w.park); for (let i = 0; i < 5; i++) box(.3, .07, 3.4, mat('#FFFFFF'), [-2 + i, .05, 0], w.park);
  box(1, .7, .7, mat('#C8935A'), [1.8, .4, -1], w.park); 
  // hats that can blow away
  const hatG = (c, top) => { const g = group(); cyl(.95, .95, .08, mat(c), [0, 0, 0], g, 24); cyl(.62, .62, top, mat(c), [0, top / 2, 0], g, 24); return g; };
  w.hat = hatG('#E2453C', .5); w.mhat = hatG('#111111', 1);
  w.milo = avatar(k, k.scene, { shirt: '#3B82F6', hair: '#3A2A1A' }).root;
  w.rosie = avatar(k, k.scene, { shirt: '#E2453C', hair: '#C2683A', long: true, skin: '#C68A5A' }).root;
  w.dave = avatar(k, k.scene, { shirt: '#F97316', hair: '#111111' }).root;
  w.lee = avatar(k, k.scene, { shirt: '#22C55E', hair: '#888888', long: true, skin: '#E8C49A' }).root;
  w.barry = avatar(k, k.scene, { shirt: '#8A5A3B', apron: true, hair: '#D9A35B', skin: '#8D5524' }).root;
  w.mayor = avatar(k, k.scene, { shirt: '#222222', pants: '#222222', hair: '#6B6B6B' }).root;
  return w;
}

const H = {};
function A(w, n) {
  if (H[n]) return H[n]; const r = w[n]; const c = r.children; const head = c[5];
  const hair = head.children.filter(m => m.geometry && m.geometry.parameters && Math.abs(m.geometry.parameters.width - 1.34) < .01);
  H[n] = { root: r, legs: [c[0], c[1]], torso: c[2], arms: [c[3], c[4]], head, hair, base: hair.length ? '#' + hair[0].material.color.getHexString() : null, mouth: head.children.find(m => m.geometry && m.geometry.parameters && m.geometry.parameters.width === .42) };
  return H[n];
}
const COL = { angry: '#FF2A2A', sad: '#2F6BFF', love: '#FF5FB8', nervous: '#FFE21F' };
// hair(a, colour or null, glow 0..1); null = natural colour. Every update sets it.
function hair(a, c, g = 0) { if (!a.hair.length) return; const m = a.hair[0].material; m.color.set(c || a.base); if (m.emissive) { m.emissive.set(c || '#000000'); m.emissiveIntensity = c ? g : 0; } a.hair.forEach(h => h.visible = true); }
function rainbow(a, t) { const m = a.hair[0].material; m.color.setHSL((t * .9) % 1, 1, .55); if (m.emissive) { m.emissive.setHSL((t * .9) % 1, 1, .5); m.emissiveIntensity = .8; } }
function P(w, n, x, y, z, ry, t, talk = false, wave = 0, c = null, g = 0) { const a = A(w, n); pose(a, x, y, z, ry, t, talk, wave); hair(a, c, g); return a; }
function bald(a, on) { a.hair.forEach(h => h.visible = !on); }
function walk(a, t, sp = 7) { a.legs[0].rotation.x = .5 * Math.sin(t * sp); a.legs[1].rotation.x = -.5 * Math.sin(t * sp); a.arms[0].rotation.x = -.4 * Math.sin(t * sp); a.arms[1].rotation.x = .4 * Math.sin(t * sp); }
// put a hat on a head, or (fly > 0) send it off on the wind
function hatOn(hat, a, fly = 0) { a.root.updateMatrixWorld(true); const v = new a.root.position.constructor(0, .66, 0); a.head.localToWorld(v); hat.position.set(v.x + fly * 6, v.y + fly * 3 + Math.sin(fly * 9) * .4 * fly, v.z - fly * 2); hat.rotation.set(fly * 4, fly * 2, fly * 6); hat.visible = true; }

const F = (x, y, z, d, frac = .53, side = 0, rise = .5, fov = 46) => { const t = Math.tan(fov * Math.PI / 360); const ly = y + (frac - .5) * 2 * t * d; return { pos: [x + side, y + rise, z + d], look: [x, ly, z], fov, to: { pos: [x + side * .92, y + rise, z + d * .93], look: [x, ly, z], fov: fov - 1 } }; };

const S = (say, o) => Object.assign({ say, sky: '#9ED2F3', lightAt: [0, 7, 2], lightDist: 28 }, o);
const TOWN = ['ground', 'town'];
const PARK = ['ground', 'park'];
const SUN = { sky: '#F7B98A', lightAt: [0, 8, 4], lightDist: 30 };
// picnic: Milo left, Rosie right, sitting on the blanket facing the camera
function picnic(w, t, mc, rc, o = {}) {
  const m = P(w, 'milo', -1.2, 0, 0, .3, t, o.talk === 'milo', 0, mc, o.mg || 0); sit(m); m.root.position.y -= .45;
  const r = P(w, 'rosie', 1.2, 0, 0, -.3, t, o.talk === 'rosie', 0, rc, o.rg || 0); sit(r); r.root.position.y -= .45;
  return [m, r];
}

export default {
  id: '904',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'HAIR SHOWS FEELINGS',
  year: 'IN THIS TOWN',
  hook: ['IN THIS TOWN,', 'HAIR SHOWS FEELINGS.'],
  title: 'In this town, your hair shows how you feel',
  description: 'In this town, your hair changes colour with your feelings. Red is angry, blue is sad, pink is love, yellow is nervous. Tonight I tell Rosie I love her. (An original comedy story.)',
  tags: ['inthistown', 'story', 'funny', 'animation', 'shorts'],
  sources: ['Fiction: an original comedy story. It makes no factual claims.'],
  setup,
  scenes: [
    S('In this town, hair shows moods.', { show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 9, .56), update: (w, p, t) => { const c = [null, COL.angry, COL.sad, COL.love, COL.nervous][Math.min(4, Math.floor(t / .4))]; P(w, 'dave', 0, 0, 0, 0, t, false, 0, c, .5); } }),
    S('Red means angry.', { label: '*RED*', show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 8, .55, 1), update: (w, p, t) => { const a = P(w, 'dave', 0, 0, 0, 0, t, true, 0, COL.angry, .6); a.arms[0].rotation.z = -.4; a.arms[1].rotation.z = .4; a.root.position.y = .08 * Math.abs(Math.sin(t * 10)); } }),
    S('Blue means sad.', { label: '*BLUE*', show: [...TOWN, 'lee'], cam: F(0, 4.65, 0, 8, .55, -1), update: (w, p, t) => { const a = P(w, 'lee', 0, 0, 0, 0, t, false, 0, COL.sad, .5); a.head.rotation.x = .3; } }),
    S('Pink means you\'re in love.', { label: '*PINK*', show: [...TOWN, 'barry'], cam: F(0, 4.65, 0, 8, .55, 1), update: (w, p, t) => { const a = P(w, 'barry', 0, 0, 0, 0, t, false, 0, COL.love, .6); a.head.rotation.z = .15 * Math.sin(t * 3); } }),
    S('And yellow means you\'re nervous.', { label: '*YELLOW*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 8, .55, -1), update: (w, p, t) => { const a = P(w, 'milo', 0, 0, 0, 0, t, false, 0, COL.nervous, .6); a.root.position.x = .04 * Math.sin(t * 50); } }),
    S('This is Dave. His hair is always yellow.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 4.65, 0, 10, .55), update: (w, p, t) => { P(w, 'dave', 0, 0, 0, 0, t, false, 1, COL.nervous, .6); } }),
    S('He is late for everything.', { label: '*DAVE*', show: [...TOWN, 'dave'], cam: F(0, 3.6, 0, 11, .5, 3), update: (w, p, t) => { const a = P(w, 'dave', -4 + p * 8, 0, 0, Math.PI / 2, t, false, 0, COL.nervous, .6); walk(a, t, 14); } }),
    S('Missus Lee\'s hair goes red when someone parks outside her house.', { label: '*MRS LEE*', show: [...TOWN, 'lee', 'car'], cam: F(0, 4, 0, 13, .55, -2), update: (w, p, t) => { w.car.position.set(3 + Math.max(0, .5 - p) * 16, 0, 1); w.car.rotation.y = 0; const angry = p > .55; const a = P(w, 'lee', -1.6, 0, -1, .5, t, angry, 0, angry ? COL.angry : null, .7); if (angry) a.arms[1].rotation.z = 2.6; } }),
    S('Barry has a hat stand. Five dollars each. Business is great.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry'], cam: F(0, 4, 0, 10, .55, 1.5), update: (w, p, t) => { P(w, 'barry', 0, 0, -.4, 0, t, true, 1); } }),
    S('And the mayor? He shaved his head.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor'], cam: F(0, 4.65, 0, 8, .55), update: (w, p, t) => { const a = P(w, 'mayor', 0, 0, 0, 0, t); bald(a, true); } }),
    S('Nobody knows how he feels. Ever.', { label: '*THE MAYOR*', show: [...TOWN, 'mayor'], cam: F(0, 4.65, 0, 6, .55, 1), update: (w, p, t) => { const a = P(w, 'mayor', 0, 0, 0, 0, t); bald(a, true); a.head.rotation.y = .2 * Math.sin(t * 1.2); } }),
    S('And me? I\'m Milo.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55), update: (w, p, t) => { P(w, 'milo', 0, 0, 0, 0, t, false, 1); } }),
    S('Rosie\'s hair has been pink since our bowling date.', { label: '*ROSIE*', show: [...TOWN, 'rosie'], cam: F(0, 4.65, 0, 8, .55, 1), update: (w, p, t) => { P(w, 'rosie', 0, 0, 0, 0, t, false, 1, COL.love, .5); } }),
    S('Tonight, I was going to tell her I love her.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 9, .55, -1), update: (w, p, t) => { P(w, 'milo', 0, 0, 0, 0, t, true); } }),
    S('My hair went yellow. Then very yellow.', { label: '*MILO*', show: [...TOWN, 'milo'], cam: F(0, 4.65, 0, 7, .55), update: (w, p, t) => { const a = P(w, 'milo', 0, 0, 0, 0, t, false, 0, COL.nervous, p < .45 ? .3 : 1.6); a.root.position.x = .05 * Math.sin(t * 50) * (p > .45 ? 1 : 0); } }),
    S('So I bought one of Barry\'s hats.', { label: '*BARRY*', show: [...TOWN, 'stall', 'barry', 'milo', 'hat'], cam: F(1, 4.4, 0, 12, .55, 1.5), update: (w, p, t) => { P(w, 'barry', -.4, 0, -.4, .3, t, false, 1); const m = P(w, 'milo', 2.6, 0, 2.2, -.5, t, false, 0, COL.nervous, 1.6); hatOn(w.hat, m); w.hat.visible = p > .5; } }),
    S('Sunset. A picnic in the park.', { label: '6:45 PM', ...SUN, show: [...PARK, 'milo', 'rosie', 'hat'], cam: F(0, 2.8, 0, 12, .53), update: (w, p, t) => { const [m] = picnic(w, t, COL.nervous, COL.love, { mg: 1.6, rg: .5 }); hatOn(w.hat, m); } }),
    S('Then the wind blew my hat off.', { ...SUN, show: [...PARK, 'milo', 'rosie', 'hat'], cam: F(0, 2.8, 0, 13, .55, -2), update: (w, p, t) => { const [m] = picnic(w, t, COL.nervous, COL.love, { mg: 1.6, rg: .5 }); hatOn(w.hat, m, Math.max(0, t - .6) * .9); } }),
    S('My hair was glowing like a lamp.', { ...SUN, sky: '#E48A6A', show: [...PARK, 'milo', 'rosie'], cam: F(-1.2, 3.2, 0, 6, .53, -.6), update: (w, p, t) => { picnic(w, t, COL.nervous, COL.love, { mg: 3, rg: .5 }); } }),
    S('Rosie laughed.', { label: '*ROSIE*', ...SUN, sky: '#E48A6A', show: [...PARK, 'milo', 'rosie'], cam: F(1.2, 3.2, 0, 6, .53, .6), update: (w, p, t) => { const [, r] = picnic(w, t, COL.nervous, COL.love, { mg: 3, rg: .5 }); r.mouth.scale.y = 1 + 2 * Math.abs(Math.sin(t * 9)); r.root.position.y += .05 * Math.abs(Math.sin(t * 9)); } }),
    S('I said: Rosie, I love you.', { label: '*MILO*', ...SUN, sky: '#E48A6A', show: [...PARK, 'milo', 'rosie'], cam: F(-1.2, 3.2, 0, 6, .53, -.6), update: (w, p, t) => { picnic(w, t, COL.nervous, COL.love, { mg: 3, rg: .5, talk: p > .2 ? 'milo' : null }); A(w, 'milo').head.rotation.y = .5; } }),
    S('Her hair went pink. Then very, very pink.', { label: '*ROSIE*', ...SUN, sky: '#E48A6A', show: [...PARK, 'milo', 'rosie'], cam: F(1.2, 3.2, 0, 6, .53, .6), update: (w, p, t) => { picnic(w, t, COL.nervous, COL.love, { mg: 3, rg: p < .4 ? .6 : 3 }); A(w, 'rosie').head.rotation.y = -.5; } }),
    S('Then it went every colour at once.', { ...SUN, sky: '#C9739A', show: [...PARK, 'milo', 'rosie'], cam: F(1.2, 3.2, 0, 7, .53, 1), update: (w, p, t) => { const [, r] = picnic(w, t, COL.nervous, COL.love, { mg: 3 }); rainbow(r, t * 2); } }),
    S('Nobody in town had ever seen that before.', { ...SUN, sky: '#C9739A', show: [...PARK, 'milo', 'rosie'], cam: F(0, 2.8, 0, 14, .53, 0, 3), update: (w, p, t) => { const [, r] = picnic(w, t, COL.love, COL.love, { mg: 2 }); rainbow(r, t * 2); } }),
    S('Then a big black hat blew past.', { ...SUN, sky: '#C9739A', show: [...PARK, 'milo', 'rosie', 'mhat'], cam: F(0, 2.8, 0, 14, .53, 2), update: (w, p, t) => { const [, r] = picnic(w, t, COL.love, COL.love, { mg: 2 }); rainbow(r, t * 2); w.mhat.position.set(-8 + p * 16, 3 + Math.sin(t * 4) * .6, 1.5); w.mhat.rotation.set(t * 3, t, t * 4); } }),
    S('It was the mayor\'s. And his hair had grown back.', { label: '*THE MAYOR*', ...SUN, sky: '#C9739A', show: [...PARK, 'mayor'], cam: F(4, 4.65, -2, 8, .55, -1), update: (w, p, t) => { const a = P(w, 'mayor', 4, 0, -2, -.3, t); hair(a, null); a.head.rotation.y = p < .4 ? .6 * Math.sin(t * 5) : 0; } }),
    S('Bright pink.', { label: '*PINK*', ...SUN, sky: '#C9739A', show: [...PARK, 'mayor'], cam: F(4, 4.65, -2, 6, .55, -.6), update: (w, p, t) => { P(w, 'mayor', 4, 0, -2, -.3, t, false, 0, COL.love, 1.6); } }),
    S('He was holding hands with Missus Lee.', { label: '*MRS LEE*', ...SUN, sky: '#C9739A', show: [...PARK, 'mayor', 'lee'], cam: F(5.2, 4.65, -2, 11, .55, -1.5), update: (w, p, t) => { const m = P(w, 'mayor', 4, 0, -2, .25, t, false, 0, COL.love, 1.6); const l = P(w, 'lee', 6.4, 0, -2, -.25, t, false, 0, p > .5 ? COL.love : null, 1.2); m.arms[1].rotation.z = .35; l.arms[0].rotation.z = -.35; } }),
    S('The next morning, Barry sold every hat in town.', { label: 'NEXT DAY', show: [...TOWN, 'stall', 'barry', 'dave', 'lee', 'mayor'], cam: F(0, 4.4, 0, 18, .55, 2), update: (w, p, t) => { const b = P(w, 'barry', 0, 0, -.4, 0, t, true, 1, COL.love, .6); const d = P(w, 'dave', -4.5, 0, 1.5, .4, t, false, 0, COL.nervous, .6); const l = P(w, 'lee', 4, 0, 1.5, -.4, t, false, 0, COL.love, .6); const m = P(w, 'mayor', 6.2, 0, 1, -.4, t, false, 0, COL.love, .6); w.stall.children.forEach((c, i) => { if (i > 0) c.visible = p < .5; }); } }),
  ],
};
