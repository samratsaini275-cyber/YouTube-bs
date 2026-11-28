// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows a holey yellow cheese moon over the lawn, Gary and the cat staring up.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

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

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  w.floor = k.ground('#145A32', 0);
  w.wall = box(90, 40, .5, mat('#0B1D3A'), [0, 18, -14]); w.wall.castShadow = false;
  w.stars = group(); for (let i = 0; i < 40; i++) { const s = ball(.06 + (i % 3) * .03, mat('#FFF4C2', { glow: 1.2 }), [-12 + (i * 5.3) % 24, 3 + (i * 3.7) % 12, -13.6], w.stars); s.castShadow = false; }
  const ch = mat('#F7DC6F', { glow: .5 }), hole = mat('#D4AC0D', { glow: .3 });
  w.moon = group(); ball(1.4, ch, [0, 0, 0], w.moon); for (let i = 0; i < 7; i++) { const a = i * 2.4, b = (i % 3 - 1) * .6; const h = ball(.22 + (i % 2) * .1, hole, [Math.cos(a) * 1.25 * Math.cos(b), Math.sin(b) * 1.3, Math.sin(a) * 1.25 * Math.cos(b) + .1], w.moon); h.scale.z = .4; h.lookAt(0, 0, 0); } w.moon.position.set(3.5, 8, -12);
  w.surface = group(); const sf = ball(6, ch, [0, -5.6, 0], w.surface); sf.scale.y = .25; for (let i = 0; i < 9; i++) { const h = ball(.3 + (i % 3) * .15, hole, [((i * 1.9) % 8) - 4, -4.12, ((i * 1.3) % 4) - 2.5], w.surface); h.scale.y = .25; } w.bite = ball(.35, mat('#0B1D3A'), [.7, -4.1, 1.3], w.surface); w.bite.scale.y = .5;
  w.rocket = group(); const card = mat('#C49A6C', { rough: .95 }); box(1.1, .9, 1.1, card, [0, .45, 0], w.rocket); const nose = cone(.8, .9, mat('#E74C3C'), [0, 1.35, 0], w.rocket, 4); nose.rotation.y = Math.PI / 4; w.flame = cone(.3, .7, mat('#F39C12', { glow: 2 }), [0, -.35, 0], w.rocket, 10); w.flame.rotation.x = Math.PI; w.flame.castShadow = false;
  w.wedge = group(); const wg = cyl(1, 1, .6, ch, [0, 0, 0], w.wedge, 3, 0, Math.PI / 2.5); wg.rotation.x = Math.PI / 2; for (let i = 0; i < 3; i++) { const h = ball(.12, hole, [.3 + i * .15, -.1 + (i % 2) * .2, .3], w.wedge); h.scale.z = .4; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const env = { sky: '#0B1D3A', lightAt: [2, 8, 6], lightDist: 26 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '534',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CHEESE MOON',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'THE MOON IS CHEESE'],
  title: 'In this town, the moon is cheese (Gary the ant and the cat)',
  description: 'Gary built a rocket out of a cardboard box. The cat came too. Gary took one bite of the moon. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'moon', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: a cheese moon is made up. Quiz fact: NASA\'s six Apollo Moon landings collected 2,196 samples and brought back a total of about 382 kilograms (842 pounds) of lunar material (NASA Science, "NASA\'s Apollo Samples Yield New Information about the Moon").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, the moon is cheese.',
      show: ['floor', 'wall', 'stars', 'moon', 'g'], ...env,
      cam: { pos: [1, 1.6, 8], look: [1.2, 2.6, 0], fov: 52, to: { pos: [1, 1.6, 7.5], look: [1.2, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'surface', 'rocket', 'wedge'); w.moon.visible = true; w.moon.position.set(3, 7.5, -12); ctAt(w, 1.6, 0, .4, -2.2, .5); w.c.head.rotation.z = .45; gy(w, -.1, 0, 1.4, -1.3, t); w.g.rotation.z = .3; },
    },
    {
      say: 'Gary built a rocket. A cardboard box.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'rocket'], ...env,
      cam: { pos: [0, 2, 6.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 2, 6], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'surface', 'wedge'); w.flame.visible = false; w.rocket.position.set(.5, 0, .5); w.rocket.rotation.set(0, 0, 0); w.cr.visible = false; gy(w, -.9, 0, 1.2, -.4, t, Math.sin(t * 2) > 0); },
    },
    {
      say: 'The cat came too. Blast off.',
      show: ['floor', 'wall', 'stars', 'moon', 'g', 'rocket'], ...env,
      cam: { pos: [0, 2.4, 8], look: [0, 2.4, 0], fov: 50, to: { pos: [0, 3.6, 8], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'surface', 'wedge'); w.flame.visible = true; w.flame.scale.setScalar(1 + .2 * Math.sin(t * 30)); const y = p * p * 4; w.rocket.position.set(0, y, .5); w.rocket.rotation.set(0, 0, Math.sin(t * 20) * .03); ctAt(w, .25, y + .85, .5, -1.2, .3); gy(w, -.25, y + .95, .9, -.4, t); },
    },
    {
      say: 'Gary took one bite of the moon.',
      show: ['floor', 'wall', 'stars', 'g', 'surface'], sky: '#05080F', lightAt: [2, 8, 6], lightDist: 26,
      cam: { pos: [0, 1.6, 6], look: [0, 1.2, 0], fov: 50, to: { pos: [0, 1.6, 5.5], look: [0, 1.2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'moon', 'rocket', 'wedge', 'floor'); w.surface.position.set(0, 4.45, 0); w.bite.visible = p > .5; w.cr.visible = false; gy(w, .1, .4, 1.2, 0, t); w.g.rotation.z = p < .5 ? -.25 * Math.abs(Math.sin(t * 8)) : 0; w.g.scale.set(1.3, 1.3, p > .5 ? 1.5 : 1.3); },
    },
    {
      say: 'The cat took the rest home.',
      show: ['floor', 'wall', 'stars', 'g', 'wedge'], ...env,
      cam: { pos: [.4, 2.4, 7.5], look: [.4, 1.7, 0], fov: 50, to: { pos: [.4, 2.4, 7], look: [.4, 1.7, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'moon', 'surface', 'rocket'); w.floor.visible = true; ctAt(w, .8, 0, 0, -2.1, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.wedge.position.set(1.6, .35, .5); w.wedge.rotation.set(0, -.6, 0); w.wedge.scale.setScalar(1.3); gy(w, -.9, 0, 1.4, -.4, t); w.g.scale.set(1.3, 1.3, 1.5); },
    },
    {
      say: 'Best cheese: cheddar, brie, or Swiss? Comment below.',
      quiz: { q: 'What is the best cheese?', options: ['Cheddar', 'Brie', 'Swiss'], answer: 'Made up. But the real Apollo astronauts brought about 382 kilograms of Moon rock back to Earth.' },
      show: ['floor', 'wall', 'stars', 'moon', 'g'], sky: '#274B73', lightAt: [2, 8, 6], lightDist: 26,
      cam: { pos: [2.2, 2.4, 7.5], look: [.3, 1.4, 0], fov: 48, to: { pos: [-1, 2.4, 7.5], look: [.3, 1.4, 0] } },
      update: (w, p, t) => { hide(w, 'surface', 'rocket', 'wedge'); w.floor.visible = true; w.moon.visible = true; ctAt(w, 1.4, 0, -.8, -2.4, .8); gy(w, -.8, 0, 1, -1.4 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
