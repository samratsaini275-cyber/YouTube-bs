// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his school day are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary on a giant school desk next to a pencil.

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
  w.ground = k.ground('#C9B79C', 0);
  w.room = group();
  box(60, 30, .5, mat('#E8DCC8'), [0, 15, -14], w.room);
  w.board = box(20, 9, .3, mat('#2E4A3A'), [0, 16, -13.6], w.room);
  for (let i = 0; i < 3; i++) box(5 + i * 2, .25, .05, mat('#FFFFFF'), [-3 + i, 18 - i * 2, -13.4], w.room).castShadow = false;
  // the desk Gary is on
  box(24, .8, 14, mat('#C08A48', { rough: .5 }), [0, -.4, 0], w.room);
  w.pencil = group([3, 1, -2], w.room);
  const sh = cyl(.9, .9, 12, mat('#FFC21F'), [0, 0, 0], w.pencil, 6); sh.rotation.z = Math.PI / 2;
  const tp = cone(.9, 2.2, mat('#E8C9A0'), [7.1, 0, 0], w.pencil, 6); tp.rotation.z = -Math.PI / 2;
  const er = cyl(.92, .92, 1.2, mat('#FF8FA3'), [-6.6, 0, 0], w.pencil, 12); er.rotation.z = Math.PI / 2;
  w.paper = box(8, .05, 10, mat('#FFFFFF'), [-6, .03, 1], w.room); w.paper.castShadow = false;
  w.g = gary(k, k.scene, 2);
  // classmates (giant kids' hands up) and teacher
  w.hands = group();
  for (let i = 0; i < 3; i++) { const h = group([-14 + i * 14, 0, -4], w.hands); cyl(1.4, 1.4, 14, mat(['#2F6FD6', '#22C55E', '#8B5CF6'][i]), [0, 7, 0], h, 12); ball(1.8, mat('#F2C9A0'), [0, 15, 0], h); }
  w.star = group([0, 0, 0]);
  const shape = new k.THREE.Shape();
  for (let i = 0; i < 10; i++) { const r = i % 2 ? 1.6 : 4, a = i / 10 * Math.PI * 2 + Math.PI / 2; const x = Math.cos(a) * r, y = Math.sin(a) * r; if (i) shape.lineTo(x, y); else shape.moveTo(x, y); }
  const sg = new k.THREE.ExtrudeGeometry(shape, { depth: .4, bevelEnabled: false }); sg.translate(0, 0, -.2);
  k.mesh(sg, mat('#FFD21F', { glow: .6, metal: .5, rough: .2 }), [0, 0, 0], w.star);
  w.sparkle = group();
  for (let i = 0; i < 12; i++) { const s = box(.2, .2, .2, mat('#FFFFFF', { glow: 2 }), [0, 0, 0], w.sparkle); s.userData = { a: i * .52, ph: i * .08 }; s.castShadow = false; }
  return w;
}

const ROOM = ['ground', 'room', 'g'];

export default {
  id: '092',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO SCHOOL',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO SCHOOL.'],
  title: 'Gary the ant went to school',
  description: 'The pencil is a tree trunk. Nobody can see his hand up. The gold star is... a lot. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'school', 'classroom', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his school day are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to school.',
      show: ROOM, sky: '#E8DCC8', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [-2, 4, 15], look: [1, 5, -2], fov: 50, to: { pos: [-2, 4, 13.5], look: [1, 5, -2], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-1, 0, 1.5); w.g.rotation.y = .2; scurry(w.g, t, 10); },
    },
    {
      say: 'His pencil? A tree trunk.',
      show: ROOM, sky: '#E8DCC8', lightAt: [3, 2, -1], lightDist: 14,
      cam: { pos: [-5, 3.5, 9], look: [0, 1.2, -1], fov: 48, to: { pos: [-4.5, 3.4, 8], look: [0, 1.2, -1], fov: 46 } },
      shake: () => .02,
      update: (w, p, t) => { w.g.position.set(-1.5, 0, -.3); w.g.rotation.y = Math.PI / 2; scurry(w.g, t, 45); },
    },
    {
      say: 'Hand up? Nobody can see it.',
      show: [...ROOM, 'hands'], sky: '#E8DCC8', lightAt: [0, 6, -2], lightDist: 24,
      cam: { pos: [0, 8, 24], look: [0, 9, -4], fov: 54, to: { pos: [0, 8, 21], look: [0, 9, -4], fov: 52 } },
      update: (w, p, t) => { w.g.position.set(0, 0, 3); w.g.rotation.set(0, -Math.PI / 2, -.6); w.g.userData.legs.forEach((l, i) => { l.rotation.x = i === 1 ? -1.4 + .2 * Math.sin(t * 10) : 0; }); },
    },
    {
      say: 'He still got a gold star. It is bigger than his house.',
      show: [...ROOM, 'star', 'sparkle'], sky: '#FFF3C9', lightAt: [0, 3, 1], lightDist: 14,
      cam: { pos: [3, 5, 14], look: [0, 4, 0], fov: 50, to: { pos: [2.6, 5, 12.5], look: [0, 4, 0], fov: 48 } },
      update: (w, p, t, k) => {
        const drop = k.h.ease(Math.min(1, t / .8)); w.star.position.set(1, 18 - 13.5 * drop, -1); w.star.rotation.set(0, Math.sin(t * 2) * .3, 0);
        w.g.position.set(-3, 0, 2); w.g.rotation.set(0, .5, 0); scurry(w.g, t, t > .8 ? 30 : 6); w.g.position.y = t > .8 ? .6 * Math.abs(Math.sin(t * 7)) : 0;
        w.sparkle.children.forEach(s => { const u = s.userData, f = (t * .8 + u.ph) % 1; s.position.set(1 + Math.cos(u.a) * (3 + f * 2), 4.5 + Math.sin(u.a) * (3 + f * 2), -1); s.scale.setScalar(1 - f); });
      },
    },
    {
      say: 'Gary\'s best subject: maths, art, or lunch? Comment below.',
      quiz: { q: 'What is Gary\'s best subject?', options: ['Maths', 'Art', 'Lunch'], answer: 'Gary is made up, but it is definitely lunch.' },
      show: ROOM, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [3, 3, 15], look: [1, 6.5, -2], fov: 48, to: { pos: [-4, 3, 15], look: [1, 6.5, -2] } },
      update: (w, p, t) => { w.g.position.set(-1, 0, 1.5); w.g.rotation.set(0, .2, 0); scurry(w.g, t, 10); },
    },
  ],
};
