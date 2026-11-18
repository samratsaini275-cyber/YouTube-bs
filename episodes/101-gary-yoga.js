// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his yoga class are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary on a purple yoga mat.


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
  w.studio = group();
  box(80, 30, .5, mat('#EADCF2'), [0, 15, -10], w.studio);
  for (let i = 0; i < 3; i++) box(6, 12, .1, mat('#BFE3F5', { glow: .3 }), [-10 + i * 10, 10, -9.7], w.studio).castShadow = false;
  const plant = group([8, 0, -6], w.studio); cyl(1.2, 1, 2.4, mat('#E2453C'), [0, 1.2, 0], plant, 14);
  for (let i = 0; i < 5; i++) { const l = ball(1, mat('#2E8B4A'), [Math.cos(i * 1.3) * .8, 3.4 + (i % 2) * .8, Math.sin(i * 1.3) * .5], plant); l.scale.set(.5, 1.4, .3); l.rotation.z = (i - 2) * .3; }
  box(5, .06, 2.2, mat('#8B5CF6'), [0, .03, 0], w.studio).castShadow = false;
  w.g = gary(k, k.scene, 2);
  w.zs = group();
  for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zs); box(.5, .08, .05, mat('#FFFFFF', { glow: .8 }), [0, .25, 0], z); box(.5, .08, .05, mat('#FFFFFF', { glow: .8 }), [0, -.25, 0], z); const d = box(.65, .08, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  w.stars = group();
  for (let i = 0; i < 5; i++) { const s = ball(.12, mat('#FFD21F', { glow: 2 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const BASE = ['ground', 'studio', 'g'];
function legsUp(g, keep, amt, t) { g.userData.legs.forEach((l, i) => { l.rotation.x = i === keep ? 0 : (i % 2 ? -1 : 1) * amt * (1 + .15 * Math.sin(t * 9 + i)); }); }

export default {
  id: '101',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY DOES YOGA',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TRIED YOGA.'],
  title: 'Gary the ant tried yoga',
  description: 'Six legs. Zero balance. One very relaxing nap at the end. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'yoga', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his yoga class are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant tried yoga.',
      show: BASE, sky: '#EADCF2', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.5, 2.6, 9], look: [0, 3.5, 0], fov: 46, to: { pos: [2.3, 2.6, 8.2], look: [0, 3.4, 0], fov: 44 } },
      update: (w, p, t) => { w.g.position.set(-.3, .06, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 0); },
    },
    {
      say: 'Pose one: stand on one leg.',
      show: [...BASE, 'stars'], sky: '#EADCF2', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [1.5, 3, 10], look: [.2, 3.3, 0], fov: 46, to: { pos: [1.4, 3, 9.2], look: [.2, 3.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.g.userData.legs.forEach((l, i) => { l.rotation.x = .5 * Math.sin(t * 10 + i); });
        const fall = Math.max(0, t - 1.3), z = fall > 0 ? Math.max(-.25, 1.3 - fall * fall * 9) : 1.3 + .12 * Math.sin(t * 7), tip = z <= -.25 ? Math.PI / 2 : 0;
        w.g.position.set(-.3, .06 + .75 * Math.max(0, z) / 1.3, 0); w.g.rotation.set(0, .3, z);
        w.stars.children.forEach(s => { const a = t * 4 + s.userData.i * 1.26; s.position.set(.6 + Math.cos(a) * .7, 1.4, Math.sin(a) * .7); s.visible = tip > 0; });
      },
    },
    {
      say: 'Pose two: touch your toes. All six of them.',
      show: BASE, sky: '#EADCF2', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.8, 2.8, 9], look: [0, 3.2, 0], fov: 46, to: { pos: [2.5, 2.8, 8.2], look: [0, 3.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.g.userData.legs.forEach((l, i) => { l.rotation.x = .6 * Math.sin(t * 12 + i * 1.1); });
        w.g.position.set(-.3, .06 + .3 * Math.abs(Math.sin(t * 3)), 0); w.g.rotation.set(0, .3 + t * 4, .5 * Math.sin(t * 6));
      },
    },
    {
      say: 'Final pose: the nap. He nailed it.',
      show: [...BASE, 'zs'], sky: '#C9B8E0', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2.5, 2.8, 8.5], look: [0, 3.3, 0], fov: 46, to: { pos: [2.3, 2.8, 7.8], look: [0, 3.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.g.position.set(-.3, 1.3, 0); w.g.rotation.set(Math.PI, .3, 0);
        w.g.userData.legs.forEach((l, i) => { l.rotation.x = .1 * Math.sin(t * 2 + i); });
        w.zs.children.forEach(z => { const f = (t * .5 + z.userData.i / 3) % 1; z.position.set(.4 + f * 1.2, 1.4 + f * 2.2, 0); z.scale.setScalar(.6 + f * .6); });
      },
    },
    {
      say: 'Gary\'s next class: karate, ballet, or aerobics? Comment below.',
      quiz: { q: 'What class should Gary try next?', options: ['Karate', 'Ballet', 'Aerobics'], answer: 'Gary is made up, so any of them. He wants a class that ends in a nap.' },
      show: BASE, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 10,
      cam: { pos: [2, 1.2, 9.5], look: [0, 3.4, 0], fov: 46, to: { pos: [-2, 1.2, 9.5], look: [0, 3.4, 0] } },
      update: (w, p, t) => { w.g.position.set(0, .06, 0); w.g.rotation.set(0, .3, 0); scurry(w.g, t, 8); },
    },
  ],
};
