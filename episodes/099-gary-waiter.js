// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his waiter job are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary in a bow tie carrying a pea on a tray.


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
  w.ground = k.ground('#C9A27A', 0);
  w.cafe = group();
  box(80, 30, .5, mat('#F4E3C8'), [0, 15, -14], w.cafe);
  for (let i = 0; i < 8; i++) box(.4, 30, .1, mat('#E8CFA8'), [-28 + i * 8, 15, -13.7], w.cafe).castShadow = false;
  w.g = gary(k, k.scene, 2);
  w.tie = group([0, 0, 0], w.g);
  for (const s of [-1, 1]) { const b = cone(.08, .14, mat('#E2453C'), [.44, .2, s * .07], w.tie, 6); b.rotation.x = s * Math.PI / 2; }
  w.tray = group([0, 0, 0], w.g);
  cyl(.35, .35, .03, mat('#C0C0C8', { metal: .8 }), [-.1, .75, 0], w.tray, 20);
  ball(.12, mat('#4CAF50'), [-.1, .86, 0], w.tray);
  // the spaghetti noodle
  const pts = []; for (let i = 0; i < 40; i++) pts.push(new k.THREE.Vector3(-i * .5, .12, Math.sin(i * .6) * .8));
  w.noodle = k.mesh(new k.THREE.TubeGeometry(new k.THREE.CatmullRomCurve3(pts), 120, .1, 6), mat('#F2D27A'), [0, 0, 0]);
  // the table, far away
  w.table = group([30, 0, -3]);
  cyl(5, 5, .4, mat('#FFFFFF'), [0, 9, 0], w.table, 32); cyl(.5, .5, 9, mat('#8B5A2B'), [0, 4.5, 0], w.table, 10);
  w.chairs = group([30, 0, -3]);
  for (const s of [-1, 1]) { const c = group([s * 7, 0, 0], w.chairs); box(4, .4, 4, mat('#8B5A2B'), [0, 5, 0], c); box(.4, 6, 4, mat('#8B5A2B'), [s * 2, 8, 0], c); for (const x of [-1.6, 1.6]) for (const z of [-1.6, 1.6]) box(.3, 5, .3, mat('#6B4B2E'), [x, 2.5, z], c); }
  w.note = group([30, 9.3, -3]);
  box(1.6, .05, 1, mat('#FFFFFF'), [0, 0, 0], w.note).castShadow = false;
  for (let i = 0; i < 3; i++) box(1.1, .06, .08, mat('#333333'), [0, .01, -.3 + i * .25], w.note).castShadow = false;
  w.crumb = ball(.4, mat('#D9A35E', { rough: 1 }), [0, 0, 0]); w.crumb.scale.y = .7;
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.18, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const BASE = ['ground', 'cafe', 'g'];

export default {
  id: '099',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY THE WAITER',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'BECAME A WAITER.'],
  title: 'Gary the ant became a waiter',
  description: 'One pea per trip. One noodle per day. One very happy tip. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'waiter', 'restaurant', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his waiter job are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant became a waiter.',
      show: BASE, sky: '#F4E3C8', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.5, 3.4, 9.5], look: [.2, 2.6, 0], fov: 46, to: { pos: [2.3, 3.2, 8.5], look: [.2, 2.5, 0], fov: 44 } },
      update: (w, p, t) => { w.tray.visible = true; w.g.position.set(-.3 + t * .3, 0, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 14); },
    },
    {
      say: 'Table four ordered spaghetti.',
      show: [...BASE, 'noodle'], sky: '#F4E3C8', lightAt: [-4, 3, 0], lightDist: 16,
      cam: { pos: [4.5, 3.8, 8], look: [.2, 1.2, -.5], fov: 50, to: { pos: [5.5, 3.6, 7.5], look: [1.3, 1.2, -.5], fov: 48 } },
      update: (w, p, t) => { w.tray.visible = false; w.noodle.position.set(.4 + t * .8, 0, 0); w.g.position.set(.9 + t * .8, 0, 0); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 45); },
    },
    {
      say: 'By the time he gets there, they have left.',
      show: ['ground', 'cafe', 'table', 'chairs', 'note', 'g'], sky: '#2E3A5A', lightAt: [28, 6, 0], lightDist: 24,
      cam: { pos: [22, 7, 18], look: [29, 5, -2], fov: 52, to: { pos: [22.5, 6.8, 16.5], look: [29, 5, -2], fov: 50 } },
      update: (w, p, t) => { w.tray.visible = false; w.g.position.set(26 + t * .4, 0, 4); w.g.rotation.set(0, .6, 0); scurry(w.g, t, 10); },
    },
    {
      say: 'His tip? One crumb. Best day ever.',
      show: [...BASE, 'crumb', 'hearts'], sky: '#FFE3C2', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.5, 3.2, 9], look: [.6, 2.2, 0], fov: 46, to: { pos: [2.3, 3, 8.2], look: [.6, 2.1, 0], fov: 44 } },
      update: (w, p, t) => {
        w.tray.visible = false; w.crumb.position.set(1.6, .3, .3);
        w.g.position.set(-.2, .6 * Math.abs(Math.sin(t * 5)), 0); w.g.rotation.set(0, .3 + t * 2.5, 0); scurry(w.g, t, 40);
        w.hearts.children.forEach(h => { const f = (t * .8 + h.userData.i / 4) % 1; h.position.set(-.2 + (h.userData.i - 1.5) * .5, 1.6 + f * 2, 0); h.scale.setScalar(1 - f * .5); });
      },
    },
    {
      say: 'Gary\'s next job: chef, pilot, or astronaut? Comment below.',
      quiz: { q: 'What job should Gary try next?', options: ['Chef', 'Pilot', 'Astronaut'], answer: 'Gary is made up, so any of them. Astronaut needs a very small helmet.' },
      show: BASE, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2, 1.2, 9.5], look: [0, 3.4, 0], fov: 46, to: { pos: [-2, 1.2, 9.5], look: [0, 3.4, 0] } },
      update: (w, p, t) => { w.tray.visible = true; w.g.position.set(0, 0, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 10); },
    },
  ],
};
