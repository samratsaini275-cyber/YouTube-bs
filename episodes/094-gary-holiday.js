// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his holiday are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary with a tiny suitcase at a giant airport desk.

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
  w.ground = k.ground('#D9DEE6', 0);
  w.hall = group();
  box(80, 30, .5, mat('#BFD8EE'), [0, 15, -14], w.hall);
  for (let i = 0; i < 6; i++) box(10, 14, .1, mat('#9ED2F3', { glow: .2 }), [-30 + i * 12, 14, -13.6], w.hall).castShadow = false;
  // check-in desk
  w.desk = group([4, 0, -4], w.hall);
  box(12, 6, 4, mat('#5A6070'), [0, 3, 0], w.desk); box(12.4, .4, 4.4, mat('#E8E8E8'), [0, 6.2, 0], w.desk);
  box(4, 2.6, .2, mat('#2F6FD6', { glow: .3 }), [0, 9, -1.5], w.desk);
  w.g = gary(k, k.scene, 2);
  w.case = group([0, 0, 0]);
  box(.9, .7, .4, mat('#E2453C'), [0, .35, 0], w.case); box(.4, .1, .06, mat('#2A2A2A'), [0, .8, 0], w.case);
  // security arch
  w.sec = group([0, 0, 50]);
  for (const x of [-4, 4]) box(1.2, 12, 2, mat('#9AA3AE'), [x, 6, 0], w.sec);
  box(9.2, 1.2, 2, mat('#9AA3AE'), [0, 12.6, 0], w.sec);
  w.alarm = ball(.7, mat('#E0161E', { glow: .2 }), [0, 13.8, 0], w.sec);
  w.flashSec = box(60, 30, .1, mat('#E0161E', { opacity: 0 }), [0, 10, 58], k.scene); w.flashSec.castShadow = false;
  // the cafe floor full of crumbs
  w.cafe = group([0, 0, 100]);
  box(30, .1, 20, mat('#C9B79C'), [0, .05, 0], w.cafe).castShadow = false;
  for (let i = 0; i < 4; i++) { const tb = group([-9 + i * 6, 0, -6], w.cafe); cyl(2.4, 2.4, .3, mat('#FFFFFF'), [0, 7, 0], tb, 24); cyl(.3, .3, 7, mat('#5A6070'), [0, 3.5, 0], tb, 10); }
  w.crumbs = group([0, 0, 100]);
  for (let i = 0; i < 70; i++) { const c = ball(.35 + (i % 3) * .1, mat(['#D9A35E', '#C9853E', '#F2D3A8'][i % 3], { rough: 1 }), [((i * 37) % 120) / 10 - 6, .2, ((i * 23) % 80) / 10 - 3], w.crumbs); c.scale.y = .7; c.rotation.y = i; }
  w.plane = group([20, 22, -12]);
  box(14, 2, 2, mat('#FFFFFF'), [0, 0, 0], w.plane); box(4, .3, 10, mat('#E8E8E8'), [0, 0, 0], w.plane); box(2, 3, .3, mat('#2F6FD6'), [-6.5, 1.5, 0], w.plane);
  w.hearts = group();
  for (let i = 0; i < 4; i++) { const h = ball(.25, mat('#FF4D6D', { glow: 1.5 }), [0, 0, 0], w.hearts); h.userData.i = i; h.castShadow = false; }
  return w;
}

const HALL = ['ground', 'hall', 'g', 'case'];

export default {
  id: '094',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES ON HOLIDAY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT ON HOLIDAY.'],
  title: 'Gary the ant went on holiday',
  description: 'Packed light. Made it through security, mostly. Then he found the airport café. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'holiday', 'airport', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his holiday are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went on holiday.',
      show: HALL, sky: '#BFD8EE', lightAt: [1, 3, 0], lightDist: 18,
      cam: { pos: [-2, 3.5, 15], look: [2, 5.5, -2], fov: 50, to: { pos: [-2, 3.5, 13.5], look: [2, 5.5, -2], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-1.5 + t * .6, 0, 1.5); w.g.rotation.y = 0; scurry(w.g, t, 14); w.case.position.set(w.g.position.x + .3, 0, 2.8); },
    },
    {
      say: 'Security beeps. It is his hard hat.',
      show: ['ground', 'sec', 'g', 'flashSec'], sky: '#D9DEE6', lightAt: [0, 4, 50], lightDist: 18,
      cam: { pos: [7, 5, 68], look: [0, 7.5, 50], fov: 54, to: { pos: [6.5, 5, 66], look: [0, 7.5, 50], fov: 52 } },
      shake: (t) => t > .9 ? .08 : 0,
      update: (w, p, t) => {
        w.g.position.set(0, 0, 54 - Math.min(t, 1) * 4); w.g.rotation.y = Math.PI / 2; scurry(w.g, t, t < 1 ? 14 : 0);
        const on = t > .9 && (t % .4) < .2; w.alarm.material.emissiveIntensity = on ? 3 : .2; w.flashSec.material.opacity = on ? .18 : 0;
      },
    },
    {
      say: 'Then he finds the airport cafe.',
      show: ['ground', 'cafe', 'crumbs', 'g'], sky: '#FFE3C2', lightAt: [0, 4, 100], lightDist: 18,
      cam: { pos: [0, 8, 116], look: [0, 1.5, 100], fov: 50, to: { pos: [0, 7.5, 113], look: [0, 1.5, 100], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-5 + t * 2, 0, 104); w.g.rotation.y = .3; scurry(w.g, t, 20); },
    },
    {
      say: 'Crumbs everywhere. He never boarded.',
      show: ['ground', 'cafe', 'crumbs', 'g', 'plane', 'hearts'], sky: '#9ED2F3', lightAt: [0, 4, 100], lightDist: 22,
      cam: { pos: [4, 2.5, 109], look: [.5, 4, 99], fov: 56, to: { pos: [3.6, 2.5, 107.5], look: [.5, 4.3, 99], fov: 54 } },
      update: (w, p, t) => {
        w.g.position.set(0, .4, 102); w.g.rotation.set(0, .5, -.3); scurry(w.g, t, 2); w.plane.position.set(10 - t * 6, 13 + t, 92);
        w.hearts.children.forEach(h => { const f = (t * .6 + h.userData.i / 4) % 1; h.position.set(-.5 + h.userData.i * .4, 1.8 + f * 2, 102); h.scale.setScalar(.5 + f); });
      },
    },
    {
      say: 'Gary\'s dream holiday: beach, snow, or a bakery? Comment below.',
      quiz: { q: 'Where should Gary go on holiday?', options: ['The beach', 'The snow', 'A bakery'], answer: 'Gary is made up, so anywhere. But we all know it is the bakery.' },
      show: HALL, sky: '#274B73', lightAt: [1, 3, 0], lightDist: 18,
      cam: { pos: [3, 2, 15], look: [2, 7.5, -2], fov: 48, to: { pos: [-4, 2, 15], look: [2, 7.5, -2] } },
      update: (w, p, t) => { w.g.position.set(-1, 0, 1.5); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 10); w.case.position.set(-.7, 0, 2.8); },
    },
  ],
};
