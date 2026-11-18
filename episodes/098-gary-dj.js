// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his DJ career are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary standing on a giant record on a turntable.


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

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#2A1E3A', 0);
  w.club = group();
  box(80, 30, .5, mat('#1E1530'), [0, 15, -12], w.club);
  w.lights = [];
  for (let i = 0; i < 8; i++) { const l = ball(.9, mat(['#FF4D6D', '#22C55E', '#2F6FD6', '#FFD21F'][i % 4], { glow: 2 }), [-14 + i * 4, 12 + (i % 2) * 3, -11], w.club); l.castShadow = false; w.lights.push(l); }
  // turntable
  w.deck = group();
  box(14, 1, 12, mat('#3A3A44', { rough: .4 }), [0, .5, 0], w.deck);
  w.rec = group([-1.5, 1.05, 0], w.deck);
  cyl(5, 5, .12, mat('#111114', { rough: .2 }), [0, 0, 0], w.rec, 48);
  for (let r = 1.8; r < 5; r += .6) { const g = k.torus(r, .02, mat('#2A2A30'), [0, .07, 0], w.rec); g.rotation.x = Math.PI / 2; g.castShadow = false; }
  cyl(1.4, 1.4, .14, mat('#E2453C'), [0, .01, 0], w.rec, 32);
  box(.5, .16, .2, mat('#FFD21F'), [.8, .02, 0], w.rec);
  cyl(.15, .15, .6, mat('#C0C0C8', { metal: .8 }), [-1.5, 1.3, 0], w.deck, 10);
  w.arm = group([5, 1, -4], w.deck);
  cyl(.6, .6, .8, mat('#C0C0C8', { metal: .8 }), [0, .4, 0], w.arm, 16);
  const tube = cyl(.12, .12, 6, mat('#C0C0C8', { metal: .8 }), [-1.5, .9, 2.4], w.arm, 8); tube.rotation.x = Math.PI / 2; tube.rotation.z = .55;
  w.g = gary(k, k.scene, 2);
  // the crowd
  w.crowd = group([0, 0, 0]);
  w.fans = [];
  for (let i = 0; i < 3; i++) { const a = gary(k, w.crowd, 2, ['#22C55E', '#FF4D6D', '#2F6FD6'][i]); a.position.set(12 + i * 1.3, 0, -1 + i * 1.1); a.rotation.y = Math.PI; w.fans.push(a); }
  w.crumb = ball(.5, mat('#D9A35E', { rough: 1 }), [15.5, .35, 1.2], w.crowd); w.crumb.scale.y = .7;
  w.notes = group();
  for (let i = 0; i < 5; i++) { const n = group([0, 0, 0], w.notes); ball(.25, mat('#FFFFFF', { glow: 1 }), [0, 0, 0], n).scale.set(1.2, .9, .6); box(.06, .8, .06, mat('#FFFFFF', { glow: 1 }), [.25, .4, 0], n); n.userData.i = i; }
  return w;
}

const BASE = ['ground', 'club', 'deck', 'g'];
function onRecord(w, ang, r, t, sp) {
  const x = -1.5 + Math.cos(ang) * r, z = -Math.sin(ang) * r;
  w.g.position.set(x, 1.12, z); w.g.rotation.set(0, ang + Math.PI, 0); scurry(w.g, t, sp);
}
function pulse(w, t) { w.lights.forEach((l, i) => { l.visible = true; l.material.emissiveIntensity = 1 + 2 * Math.max(0, Math.sin(t * 8 + i)); }); }

export default {
  id: '098',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DJ GARY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BECAME A DJ.'],
  title: 'Gary the ant became a DJ',
  description: 'The record is a treadmill. The crowd is three ants and a crumb. They still love him. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'dj', 'music', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his DJ career are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant became a DJ.',
      show: [...BASE, 'notes'], sky: '#1E1530', lightAt: [-1.5, 4, 0], lightDist: 16,
      cam: { pos: [1, 6.5, 10], look: [-1.5, 4, -1], fov: 50, to: { pos: [.8, 6.2, 9], look: [-1.5, 3.8, -1], fov: 48 } },
      update: (w, p, t) => {
        w.rec.rotation.y = 0; onRecord(w, -Math.PI / 2, .2, t, 6); w.g.rotation.y = .3; pulse(w, t);
        w.notes.children.forEach(n => { const f = (t * .6 + n.userData.i / 5) % 1; n.position.set(-7 + n.userData.i * 1.5, 1.5 + f * 2.5, -4); n.rotation.z = .3 * Math.sin(t * 3 + n.userData.i); });
      },
    },
    {
      say: 'He presses play, and the record spins him around.',
      show: [...BASE, 'notes'], sky: '#1E1530', lightAt: [-1.5, 4, 0], lightDist: 16,
      cam: { pos: [3, 10, 10], look: [-1.5, 1, 0], fov: 50, to: { pos: [2.6, 9.5, 9], look: [-1.5, 1, 0], fov: 48 } },
      update: (w, p, t) => {
        const spin = t * (1 + t * .8); w.rec.rotation.y = spin; onRecord(w, spin - Math.PI / 2, 3, t, 50); pulse(w, t);
        w.notes.children.forEach(n => { const f = (t * .8 + n.userData.i / 5) % 1; n.position.set(-4 + n.userData.i * 1.5, 3 + f * 4, -2); });
      },
    },
    {
      say: 'Then he gets flung into the crowd.',
      show: [...BASE, 'crowd'], sky: '#1E1530', lightAt: [6, 4, 0], lightDist: 22,
      cam: { pos: [7, 7, 24], look: [7, 3.5, 0], fov: 54, to: { pos: [7.5, 6.8, 22], look: [8, 3.5, 0], fov: 52 } },
      update: (w, p, t) => {
        w.rec.rotation.y = t * 6; pulse(w, t);
        const f = Math.min(1, t / 1.3), x = -1.5 + f * 15, y = 1.12 + 7 * Math.sin(f * Math.PI) * (1 - f * .5) + f * .9;
        w.g.position.set(x, y, 0); w.g.rotation.set(t * 4, 0, t * 9); scurry(w.g, t, 60);
        w.fans.forEach((a, i) => { a.position.y = 0; scurry(a, t + i, 8); });
      },
    },
    {
      say: 'The crowd is three ants and a crumb. They love him.',
      show: ['ground', 'club', 'crowd', 'g', 'notes'], sky: '#2A1E4A', lightAt: [13, 4, 0], lightDist: 12,
      cam: { pos: [17, 5, 12], look: [13.6, 2.4, 0], fov: 46, to: { pos: [16.6, 4.8, 11], look: [13.6, 2.4, 0], fov: 44 } },
      update: (w, p, t) => {
        pulse(w, t);
        w.fans.forEach((a, i) => { a.position.y = .25 * Math.abs(Math.sin(t * 6 + i)); scurry(a, t + i, 20); });
        w.g.position.set(13.3, 1.5 + .25 * Math.abs(Math.sin(t * 6 + 1)), 0); w.g.rotation.set(.25 * Math.sin(t * 5), -.6 + .2 * Math.sin(t * 3), 0); scurry(w.g, t, 30);
        w.notes.children.forEach(n => { const f = (t * .6 + n.userData.i / 5) % 1; n.position.set(10 + n.userData.i * 1.5, 4 + f * 2, -4); });
      },
    },
    {
      say: 'Gary\'s DJ name: DJ Crumb, Six Legs, or Antonio? Comment below.',
      quiz: { q: 'What should Gary\'s DJ name be?', options: ['DJ Crumb', 'Six Legs', 'Antonio'], answer: 'Gary is made up, so any of them. The crumb votes for DJ Crumb.' },
      show: [...BASE], sky: '#1E1530', lightAt: [-1.5, 4, 0], lightDist: 16,
      cam: { pos: [3, 2.5, 14], look: [-1, 6, 0], fov: 48, to: { pos: [-4, 2.5, 14], look: [-1, 6, 0] } },
      update: (w, p, t) => { w.rec.rotation.y = t * .8; onRecord(w, -Math.PI / 2, .2, t, 6); w.g.rotation.set(0, .3, 0); pulse(w, t); w.lights.forEach(l => { l.visible = false; }); },
    },
  ],
};
