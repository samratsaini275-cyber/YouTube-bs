// Narrative 22: "In This Town… (short format, cats first)". The top short is 906 "In this town, cats say what you're thinking" (968 views at 23:07).
// Hook: the rule under 2 s; first frame shows a cat in front of a TV weather map.

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));





function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#2E3A5A', 0);
  w.studio = group(); box(40, 16, .3, mat('#1E2A4A'), [0, 8, -4], w.studio); w.map = box(7, 4, .1, mat('#3E8FCF', { glow: .4 }), [0, 4.2, -3.8], w.studio); for (let i = 0; i < 3; i++) { const l = ball(.8, mat('#3FA34D', { glow: .3 }), [-2 + i * 2, 4 + (i % 2) * .6, -3.7], w.studio); l.scale.z = .1; }
  w.sun = ball(.6, mat('#FFD54A', { glow: 1 }), [1.8, 5.4, -3.6]); w.cloud = group(); for (let i = 0; i < 3; i++) ball(.45, mat('#DDDDDD'), [-.4 + i * .4, 0, 0], w.cloud); w.cloud.position.set(-1.6, 5.4, -3.6); w.bolt = cone(.25, 1, mat('#FFE14A', { glow: 1 }), [-1.4, 4.4, -3.55], undefined, 3); w.bolt.rotation.z = Math.PI;
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.box = group(); box(2.4, 1.6, 2, mat('#C9965A'), [0, .8, 0], w.box);
  w.rain = group(); for (let i = 0; i < 30; i++) { const d = cyl(.03, .03, .4, mat('#9AD8F5', { glow: .4 }), [0, 0, 0], w.rain, 4); d.userData.i = i; d.castShadow = false; }
  w.town = group(); for (let i = 0; i < 3; i++) { const h = group([-4 + i * 4, 0, -2], w.town); box(3, 2.6, 2.6, mat(['#F2D9B8', '#F7D6E0', '#D8E8F0'][i]), [0, 1.3, 0], h); const r = cone(2.4, 1.6, mat('#7A3A3A'), [0, 3.4, 0], h, 4); r.rotation.y = Math.PI / 4; }
  w.grass = k.ground('#8CC56A', 0);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.umb = group(); const ub = cone(1.2, .6, mat('#E2453C'), [0, 0, 0], w.umb, 10); cyl(.04, .04, 1.4, mat('#333333'), [0, -.7, 0], w.umb, 6);
  w.trail = group(); for (let i = 0; i < 8; i++) { const s = ball(.35, mat('#F2A04A'), [0, 0, 0], w.trail); s.userData.i = i; s.material.transparent = true; s.material.opacity = .45 - i * .05; s.castShadow = false; }
  w.moon = ball(.8, mat('#F4F1D8', { glow: 1 }), [0, 0, 0]);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); w.pp.visible = true; };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.body.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const rainOn = (w, t, on, cx = 0) => w.rain.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 30) % 1; d.position.set(cx - 5 + (i * 1.37) % 10, 8 - q * 8, -1 + (i % 5) * 1.2); d.visible = on; });

export default {
  id: '388',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT FORECAST',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS DO THE WEATHER'],
  title: 'In this town, cats do the weather forecast',
  description: 'Cat asleep in the sun? Sunny. Cat in a box? Rain. Cat running laps at three in the morning? Big storm. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'cat', 'cats', 'weather', 'shorts'],
  sources: ['Comedy sketch: cat weather forecasts are made up. Quiz fact: DNA studies suggest house cats were first domesticated from wildcats in the Near East around 10,000 years ago (Driscoll et al., "The Near Eastern origin of cat domestication", Science, 2007).'],
  setup,
  scenes: [
    { say: 'In this town, cats do the weather.', show: ['floor', 'studio', 'sun', 'cloud', 'cr'], sky: '#1E2A4A', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.5, 3.4, 12], look: [0, 3.4, 0], fov: 50, to: { pos: [1.4, 3.4, 11.3], look: [0, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { w.grass.visible = false; w.pp.visible = false; ctAt(w, -.4, 0, 1.4, -1.2, .9); w.c.paw.position.set(1.8, 1.6, 1.4); w.c.paw.rotation.z = 1.2 + .2 * Math.sin(t * 3); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
    { say: 'Cat asleep in the sun? Sunny.', label: 'SUNNY', show: ['grass', 'town', 'cr', 'moon'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3, 11], look: [0, 1.8, 0], fov: 52, to: { pos: [2, 3, 10.5], look: [0, 1.8, 0], fov: 50 } },
      update: (w, p, t) => { w.moon.position.set(3, 7, -6); w.moon.material.color.set('#FFD54A'); ctAt(w, 0, 0, 1, -1.3, .7); w.c.eyes.forEach(e => e.scale.y = .15); w.c.head.rotation.z = -.4; w.c.body.scale.set(1.4, 1 + .03 * Math.sin(t * 2), 1); } },
    { say: 'Cat in a box? Rain.', label: 'DRIP DRIP', show: ['grass', 'town', 'cr', 'box', 'rain', 'pp', 'umb'], sky: '#7A8AA0', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [2, 3.6, 12], look: [0, 2, 0], fov: 52, to: { pos: [2, 3.6, 11.5], look: [0, 2, 0], fov: 50 } },
      update: (w, p, t) => { w.moon.visible = false; w.box.position.set(-1.4, 0, 1); ctAt(w, -1.4, .5, 1, -1.2, .55); w.c.eyes.forEach(e => e.scale.y = .4); rainOn(w, t, p > .3); stand(w, 2, 1.6, -.5); w.pp.scale.setScalar(.8); pose(w.p, .3, 1.4); w.umb.position.set(2.4, 3.9, 2.2); w.umb.visible = p > .3; } },
    { say: 'Cat running laps at three in the morning? Big storm.', label: 'ZOOMIES!', show: ['grass', 'town', 'cr', 'rain', 'trail', 'moon'], sky: '#141A33', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => t > 1.2 ? .1 : 0,
      cam: { pos: [0, 4, 13], look: [0, 1.8, 0], fov: 54, to: { pos: [0, 4, 12.5], look: [0, 1.8, 0], fov: 52 } },
      update: (w, p, t) => { w.pp.visible = false; w.umb.visible = false; w.moon.visible = true; w.moon.material.color.set('#F4F1D8'); w.moon.position.set(-3, 8, -6); const a = t * 3.5; const x = Math.sin(a) * 4, z = Math.cos(a) * 1.4 + 1; ctAt(w, x, .2 * Math.abs(Math.sin(t * 14)), z, Math.cos(a) > 0 ? 0 : Math.PI, .55); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : 1.6); w.trail.children.forEach(s => { const i = s.userData.i, b = a - (i + 1) * .18; s.position.set(Math.sin(b) * 4, .8, Math.cos(b) * 1.4 + 1); }); rainOn(w, t, t > 1.2); } },
    { say: 'Cat weather: cool, cute, or way too stormy? Comment below.',
      quiz: { q: 'Cat weather forecasts are…', options: ['Cool', 'Cute', 'Way too stormy'], answer: 'Made up. House cats were first tamed about 10,000 years ago.' },
      show: ['grass', 'cr'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { w.rain.children.forEach(d => d.visible = false); ctAt(w, -.6, 0, 0, -.6, .8); w.c.head.rotation.z = .08 * Math.sin(t * 2); } },
  ],
};
