// Narrative 23: "In This Town… (season 2: things that talk back)". Object rule: ice cubes with opinions (212 ice cream: 641 views in the slot).
// Hook: the rule under 2 s; first frame shows ice cubes with faces in a glass of juice.

function face(k, parent, pos, s = 1) {
  const { mat, ball, box, group } = k;
  const f = group(pos, parent); f.scale.setScalar(s);
  for (const x of [-.45, .45]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], f); ball(.12, mat('#111111'), [x, .2, .17], f); }
  f.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .03], f));
  f.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.32, .02], f);
  return f;
}
const talk = (f, t, on = true) => f.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1;
const brow = (f, a) => f.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a);


function cube(k, parent) {
  const g = k.group([0, 0, 0], parent); const b = k.box(1, 1, 1, k.mat('#DDF4FF', { glow: .15 }), [0, 0, 0], g); b.material.transparent = true; b.material.opacity = .8; g.f = face(k, g, [0, 0, .52], .38); return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#FFE8B0'), [0, 8, -4], w.wall);
  w.table = box(8, .3, 4, mat('#FFFFFF'), [0, 1.85, 0]);
  w.glass = group(); const gl = cyl(1.3, 1.1, 3, mat('#E8F8FF', { glow: .05 }), [0, 1.5, 0], w.glass, 24); gl.material.transparent = true; gl.material.opacity = .3; w.juice = cyl(1.2, 1.05, 2.2, mat('#FFA63A'), [0, 1.1, 0], w.glass, 24); w.juice.material.transparent = true; w.juice.material.opacity = .7;
  w.cubes = []; for (let i = 0; i < 3; i++) w.cubes.push(cube(k, k.scene));
  w.drip = group(); for (let i = 0; i < 6; i++) { const d = ball(.1, mat('#BFE8FF'), [0, 0, 0], w.drip); d.userData.i = i; }
  w.sun = ball(1.2, mat('#FFD23F', { glow: .9 }), [3.2, 6, -3.6]);
  w.freezer = group(); box(5, 5, 3, mat('#F4F7FA'), [0, 2.5, -1.5], w.freezer); box(4.4, 4.4, .1, mat('#BFE3F2'), [0, 2.6, .02], w.freezer);
  w.hats = group(); for (let i = 0; i < 3; i++) { const h = k.cone(.25, .6, mat(['#E2453C', '#3B6FD6', '#3FA34D'][i]), [0, 0, 0], w.hats, 10); h.userData.i = i; }
  return w;
}

const cubeAt = (c, x, y, z, r = 0, s = 1) => { c.position.set(x, y, z); c.rotation.set(0, r, 0); c.scale.setScalar(s); c.visible = true; c.f.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = 1; }); c.f.mouth.scale.set(1, 1, 1); c.f.rotation.set(0, 0, 0); };

export default {
  id: '416',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ICE CUBES TALK',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'ICE CUBES TALK'],
  title: 'In this town, ice cubes can talk',
  description: 'Into the juice? They shiver. Out in the sun? A big dramatic goodbye. Back in the freezer? Party time. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'ice', 'objectswithopinions', 'comedy', 'shorts'],
  sources: ['Comedy sketch: talking ice cubes are made up. Quiz fact: water expands as it freezes, so ice is less dense than liquid water, which is why ice cubes float (Encyclopaedia Britannica, "ice").'],
  setup,
  scenes: [
    { say: 'In this town, ice cubes talk.', show: ['floor', 'wall', 'table', 'glass'], sky: '#FFE8B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 6.4, 5.4], look: [0, 4.6, 0], fov: 50, to: { pos: [0, 6.3, 5], look: [0, 4.6, 0], fov: 48 } },
      update: (w, p, t) => { w.drip.visible = false; w.sun.visible = false; w.freezer.visible = false; w.hats.visible = false; w.glass.position.set(0, 2, 0); w.cubes.forEach((c, i) => { cubeAt(c, -.55 + i * .55, 4.75 + .06 * Math.sin(t * 3 + i), .3 + (i % 2) * .2, (i - 1) * .3, .7); talk(c.f, t + i, i === 1); brow(c.f, -.2); }); } },
    { say: 'Into the juice? They shiver.', label: 'BRRR', show: ['floor', 'wall', 'table', 'glass'], sky: '#FFE8B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 6.4, 5.4], look: [0, 4.8, 0], fov: 50, to: { pos: [0, 6.3, 5], look: [0, 4.8, 0], fov: 48 } },
      update: (w, p, t) => { w.glass.position.set(0, 2, 0); w.cubes.forEach((c, i) => { const q = Math.min(1, Math.max(0, p * 2 - i * .2)); cubeAt(c, -.55 + i * .55 + .05 * Math.sin(t * 40 + i), 6.6 - q * 1.85, .3 + (i % 2) * .2, (i - 1) * .3, .7); talk(c.f, t + i); brow(c.f, .5); }); } },
    { say: 'In the sun? A big dramatic goodbye.', label: 'FAREWELL', show: ['floor', 'wall', 'table', 'sun', 'drip'], sky: '#FFE8B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 3.4, 6], look: [0, 2.3, 0], fov: 50, to: { pos: [.2, 3.4, 5.5], look: [0, 2.3, 0], fov: 48 } },
      update: (w, p, t) => { w.glass.visible = false; w.cubes.forEach((c, i) => c.visible = i === 1); const c = w.cubes[1]; const m = 1.3 * (1 - p * .55); cubeAt(c, 0, 2 + .5 * m, 0, 0, m); c.scale.set(m * 1.1, m * .9, m * 1.1); talk(c.f, t); brow(c.f, .6); c.f.rotation.z = .2 * Math.sin(t * 2); w.drip.children.forEach(d => { const i = d.userData.i; d.position.set((i - 2.5) * .25 * (1 + p), 2.02, .3 + (i % 2) * .2); d.scale.set(1 + p * 2, .3, 1 + p * 2); }); } },
    { say: 'Back in the freezer? Party time.', label: 'PARTY', show: ['floor', 'wall', 'freezer', 'hats'], sky: '#FFE8B0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [0, 2.8, 8], look: [0, 2.1, 0], fov: 50, to: { pos: [0, 2.8, 7.5], look: [0, 2.1, 0], fov: 48 } },
      update: (w, p, t) => { w.sun.visible = false; w.drip.visible = false; w.table.visible = false; w.cubes.forEach((c, i) => { cubeAt(c, -1.2 + i * 1.2, 1.4 + .3 * Math.abs(Math.sin(t * 6 + i)), .8, .2 * Math.sin(t * 5 + i), .8); talk(c.f, t + i); brow(c.f, -.3); c.f.children.forEach(e => { if (e.geometry && e.geometry.type === 'SphereGeometry') e.scale.y = .35; }); }); w.hats.children.forEach(h => { const i = h.userData.i, c = w.cubes[i]; h.position.set(c.position.x, c.position.y + .55 * .8 + .25, c.position.z); h.rotation.z = c.rotation.y; }); } },
    { say: 'Talking ice cubes: cool, funny, or way too dramatic? Comment below.',
      quiz: { q: 'Talking ice cubes are…', options: ['Cool', 'Funny', 'Way too dramatic'], answer: 'Made up. Fun fact: ice floats because water expands when it freezes.' },
      show: ['floor', 'table', 'glass'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [1.2, 6.6, 6], look: [0, 4.2, 0], fov: 52, to: { pos: [-1.2, 6.6, 6], look: [0, 4.2, 0] } },
      update: (w, p, t) => { w.freezer.visible = false; w.hats.visible = false; w.wall.visible = false; w.table.visible = true; w.glass.visible = true; w.glass.position.set(0, 2, 0); w.cubes.forEach((c, i) => { cubeAt(c, -.55 + i * .55, 4.75 + .06 * Math.sin(t * 3 + i), .3 + (i % 2) * .2, (i - 1) * .3, .7); talk(c.f, t + i, Math.sin(t * 2 + i) > 0); brow(c.f, .1); }); } },
  ],
};
