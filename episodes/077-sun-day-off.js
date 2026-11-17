// Narrative 5: "What Would Happen If…". A made-up comedy sketch: the sun does not take days off.
// Hook rule: the premise as a question under 2 s, first frame already showing a sleepy sun in a sleep mask, yawning.

function sunFace(k, parent, r) {
  const { mat, box, cyl, ball, cone, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  const b = ball(r, mat('#FFD21F', { glow: 1.2 }), [0, 0, 0], s.root); b.castShadow = false;
  s.rays = group([0, 0, 0], s.root);
  for (let i = 0; i < 12; i++) { const c = cone(r * .18, r * .5, mat('#FFB020', { glow: 1 }), [0, 0, 0], s.rays, 6); const a = i / 12 * Math.PI * 2; c.position.set(Math.cos(a) * r * 1.25, Math.sin(a) * r * 1.25, 0); c.rotation.z = a - Math.PI / 2; c.castShadow = false; }
  s.mask = group([0, r * .25, r * .2], s.root);
  const band = box(r * 2.1, r * .45, r * .2, mat('#5B3FA6'), [0, 0, r * .78], s.mask); band.castShadow = false;
  s.eyes = [-1, 1].map(x => { const e = box(r * .3, r * .06, r * .05, mat('#2A2A2A'), [x * r * .38, r * .25, r * .98], s.root); e.castShadow = false; return e; });
  s.mouth = ball(r * .18, mat('#B5651D'), [0, -r * .4, r * .9], s.root); s.mouth.castShadow = false;
  s.shades = group([0, r * .25, r * .95], s.root);
  for (const x of [-1, 1]) { const l = cyl(r * .28, r * .28, r * .06, mat('#111111', { metal: .5 }), [x * r * .38, 0, 0], s.shades, 20); l.rotation.x = Math.PI / 2; l.castShadow = false; }
  return s;
}
function house(k, parent, x, z, c) { const g = k.group([x, 0, z], parent); k.box(5, 4, 4, k.mat(c), [0, 2, 0], g); const r = k.cone(3.9, 2.2, k.mat('#8B3A2E'), [0, 5.1, 0], g, 4); r.rotation.y = Math.PI / 4; g.win = k.box(1.4, 1.2, .1, k.mat('#FFE45C', { glow: 0 }), [0, 2.2, 2.05], g); return g; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.town = group();
  w.houses = ['#F4F1E8', '#BFE3EA', '#F7D9A8', '#E6C6E6', '#D6E8C4'].map((c, i) => house(k, w.town, -16 + i * 8, -6 - (i % 2) * 3, c));
  box(80, .05, 5, mat('#4A4F5A'), [0, .03, 4], w.town).castShadow = false;
  w.lamps = [];
  for (let i = 0; i < 4; i++) { const g = group([-15 + i * 10, 0, 7], w.town); cyl(.15, .15, 6, mat('#2A2A2A'), [0, 3, 0], g, 8); const l = ball(.5, mat('#FFE45C', { glow: 0 }), [0, 6.2, 0], g); l.castShadow = false; w.lamps.push(l); }
  w.sun = sunFace(k, k.scene, 4); w.sunG = w.sun.root;
  w.dome = k.mesh(new k.THREE.PlaneGeometry(8, 8), new k.THREE.MeshBasicMaterial({ color: '#050814', transparent: true, opacity: .5, depthTest: false, depthWrite: false }), [0, 0, 0]); w.dome.castShadow = w.dome.receiveShadow = false; w.dome.renderOrder = 999;
  w.moon = ball(2.5, mat('#E8EEF2', { glow: .6 }), [14, 26, -40]); w.moon.castShadow = false;
  w.stars = group();
  for (let i = 0; i < 30; i++) { const s = ball(.2, mat('#FFFFFF', { glow: 3 }), [((i * 37) % 70) - 35, 18 + (i * 13) % 20, -45], w.stars); s.castShadow = false; }
  // people with torches at noon
  w.people = group();
  for (let i = 0; i < 3; i++) { const g = group([-8 + i * 7, 0, 4], w.people); cyl(.8, .9, 3.2, mat(['#E2453C', '#2F6FD6', '#22C55E'][i]), [0, 1.6, 0], g, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], g); const tb = cone(1.2, 6, mat('#FFF4B0', { glow: 1, opacity: .3, double: true }), [1.2, 2.5, 3], g, 16); tb.rotation.x = -Math.PI / 2 + .3; tb.castShadow = false; g.userData.ph = i; }
  // rooster
  w.rooster = group([0, 0, 0]);
  const rb = ball(1.4, mat('#F4F1E8'), [0, 2.2, 0], w.rooster); rb.scale.set(1.2, 1, .9);
  ball(.8, mat('#F4F1E8'), [1.2, 3.6, 0], w.rooster);
  cone(.25, .6, mat('#FFB020'), [1.95, 3.6, 0], w.rooster, 8).rotation.z = -Math.PI / 2;
  for (let i = 0; i < 3; i++) cone(.2, .5, mat('#E0161E'), [1 + i * .25, 4.45, 0], w.rooster, 6);
  for (const z of [-.25, .25]) ball(.1, mat('#111111'), [1.6, 3.8, z], w.rooster);
  for (let i = 0; i < 4; i++) { const f = cone(.35, 1.8, mat(['#2E8B4A', '#B8352E', '#2F2F2F', '#2E8B4A'][i]), [-1.6, 3 + i * .2, -.3 + i * .2], w.rooster, 6); f.rotation.z = .8 + i * .15; }
  for (const z of [-.4, .4]) cyl(.08, .08, 1.2, mat('#FFB020'), [0, .6, z], w.rooster, 6);
  w.notes = group([3.5, 5, 0], w.rooster);
  for (let i = 0; i < 3; i++) { const n = ball(.25, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], w.notes); n.userData.i = i; n.castShadow = false; }
  // solar farm
  w.solar = group([0, 0, -60]);
  w.panels = [];
  for (let i = 0; i < 6; i++) { const g = group([-10 + (i % 3) * 10, 2, (i < 3 ? 0 : 7)], w.solar); box(6, .2, 4, mat('#12233F', { metal: .6, rough: .2 }), [0, 0, 0], g); cyl(.15, .15, 2, mat('#9AA3AE'), [0, -1, 0], g, 8); for (const x of [-1, 1]) ball(.25, mat('#FFFFFF'), [x * .9, .2, 1.6], g); const m = box(1, .08, .1, mat('#FFFFFF'), [0, .2, 1.95], g); m.rotation.z = Math.PI; g.rotation.x = .5; w.panels.push(g); }
  // the beach, far away
  w.beach = group([200, 0, 0]);
  cyl(14, 16, 2, mat('#F2D9A0'), [0, 0, 0], w.beach, 32);
  w.sea = cyl(80, 80, .4, mat('#3E8FD1', { metal: .3, rough: .1 }), [0, -.4, 0], w.beach, 48); w.sea.castShadow = false;
  cyl(.4, .6, 9, mat('#8B5A2B'), [-6, 5, -3], w.beach, 8);
  for (let i = 0; i < 5; i++) { const lf = box(5, .2, 1.2, mat('#2E8B4A'), [-6, 9.6, -3], w.beach); lf.rotation.y = i * 1.25; lf.rotation.z = -.4; lf.translateX(2.2); }
  w.chair = group([2, 1, 2], w.beach);
  const seat = box(4, .3, 3, mat('#E2453C'), [0, 1, 0], w.chair); seat.rotation.z = -.3;
  w.bsun = sunFace(k, w.beach, 2.2); w.bsun.root.position.set(2, 4.2, 2.2);
  w.drink = group([5, 2.6, 3], w.beach); cyl(.4, .3, 1.2, mat('#FF8A1F', { opacity: .8 }), [0, 0, 0], w.drink, 12); box(.05, 1.2, .05, mat('#E2453C'), [.2, .6, 0], w.drink);
  return w;
}

function dim(w, k) { const d = new k.THREE.Vector3(); k.camera.getWorldDirection(d); w.dome.position.copy(k.camera.position).addScaledVector(d, 2); w.dome.quaternion.copy(k.camera.quaternion); }
function night(w, on) { w.lamps.forEach(l => { l.material.emissiveIntensity = on ? 3 : 0; }); w.houses.forEach(h => { h.win.material.emissiveIntensity = on ? 2 : 0; }); }
function sleepy(s, t) { s.mask.visible = true; s.shades.visible = false; s.mouth.scale.set(1, .6 + .9 * Math.max(0, Math.sin(t * 2)), 1); s.rays.rotation.z = t * .2; }
const TOWN = ['ground', 'town'];

export default {
  id: '077',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SUN\'S DAY OFF',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF THE SUN', 'TOOK A DAY OFF?'],
  title: 'What would happen if the sun took a day off?',
  description: 'Noon looks like midnight. The rooster is furious. And the sun is not answering its phone. (A made-up sun with a made-up holiday.)',
  tags: ['whatif', 'funny', 'sun', 'dayoff', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the sun taking a day off is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if the sun took a day off?',
      show: [...TOWN, 'sunG'], sky: '#FFB86B', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [0, 4, 30], look: [0, 15.5, 0], fov: 50, to: { pos: [0, 4, 27], look: [0, 15.5, 0], fov: 48 } },
      update: (w, p, t) => { night(w, false); w.sunG.position.set(4, 13 - t * 1.5, -14); sleepy(w.sun, t); },
    },
    {
      say: 'Lunchtime looks like midnight.',
      show: [...TOWN, 'people', 'moon', 'stars', 'dome'], sky: '#0A0F1E', lightAt: [0, 4, 4], lightDist: 20,
      cam: { pos: [8, 6, 26], look: [0, 4, 2], fov: 50, to: { pos: [7, 6, 23], look: [0, 4, 2], fov: 48 } },
      update: (w, p, t, k) => { dim(w, k); night(w, true); w.people.children.forEach(g => { g.rotation.y = .5 * Math.sin(t * 1.5 + g.userData.ph); }); },
    },
    {
      say: 'The rooster is furious.',
      show: [...TOWN, 'rooster', 'moon', 'stars', 'dome'], sky: '#0A0F1E', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [6, 4, 12], look: [1, 3.5, 0], fov: 46, to: { pos: [5.5, 4, 10.5], look: [1, 3.5, 0], fov: 44 } },
      shake: (t) => .08,
      update: (w, p, t, k) => { dim(w, k); night(w, true); w.rooster.position.set(0, 0, 0); w.rooster.rotation.set(0, -.3, .15 * Math.sin(t * 8)); w.notes.children.forEach(n => { const f = (t + n.userData.i / 3) % 1; n.position.set(f * 3, f * 2, 0); n.scale.setScalar(.5 + f); }); },
    },
    {
      say: 'Solar panels go on strike.',
      show: ['ground', 'solar', 'moon', 'stars', 'dome'], sky: '#0A0F1E', lightAt: [0, 4, -58], lightDist: 22,
      cam: { pos: [6, 9, -38], look: [0, 2, -57], fov: 50, to: { pos: [5, 8.5, -41], look: [0, 2, -57], fov: 48 } },
      update: (w, p, t, k) => { dim(w, k); w.panels.forEach((g, i) => { g.rotation.x = .5 + Math.min(1, t * .8) * .9 + .05 * Math.sin(t * 3 + i); }); },
    },
    {
      say: 'Turns out it went to the beach.',
      show: ['beach'], sky: '#8EC9F0', lightAt: [200, 4, 0], lightDist: 22,
      cam: { pos: [214, 8, 22], look: [201, 4, 1], fov: 50, to: { pos: [212, 7.5, 18], look: [201, 4, 1], fov: 48 } },
      update: (w, p, t) => { w.bsun.mask.visible = false; w.bsun.shades.visible = true; w.bsun.mouth.scale.set(1.4, .6, 1); w.bsun.rays.rotation.z = t * .3; w.bsun.root.rotation.z = -.2; },
    },
    {
      say: 'Sun\'s day off: party, panic, or nap? Comment below.',
      quiz: { q: 'What would you do if the sun took a day off?', options: ['Party', 'Panic', 'Nap'], answer: 'It is a made-up holiday. The real sun is still at work, so wear sunscreen.' },
      show: [...TOWN, 'sunG'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [12, 3, 28], look: [0, 16, -6], fov: 46, to: { pos: [-12, 3, 28], look: [0, 16, -6] } },
      update: (w, p, t) => { night(w, false); w.sunG.position.set(0, 10, -14); sleepy(w.sun, t); },
    },
  ],
};
