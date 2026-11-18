// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his phone are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary standing on a giant glowing phone screen.


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
  w.ground = k.ground('#B07A4A', 0);
  w.room = group();
  box(80, 30, .5, mat('#F2D9B8'), [0, 15, -14], w.room);
  // the giant phone lying flat on the table
  w.phone = group();
  box(9, .5, 17, mat('#1A1A22', { rough: .3 }), [0, .25, 0], w.phone);
  box(1.6, .1, .4, mat('#333340'), [0, .52, -7.8], w.phone).castShadow = false;
  w.on = group();
  box(8.2, .05, 15.4, mat('#2F6FD6', { glow: .6 }), [0, .53, 0], w.on).castShadow = false;
  w.keys = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const kk = cyl(.9, .9, .06, mat('#FFFFFF', { glow: .3 }), [-2.6 + c * 2.6, .57, -.5 + r * 2.4], w.on, 20); kk.castShadow = false; w.keys.push(kk); }
  box(6, .06, 1.2, mat('#9ED2F3', { glow: .8 }), [0, .57, -4.6], w.on).castShadow = false;
  w.off = group();
  box(8.2, .05, 15.4, mat('#05050A'), [0, .53, 0], w.off).castShadow = false;
  w.batt = group([0, .58, -1], w.off);
  box(2.4, .06, 4.4, mat('#E0161E', { glow: 2 }), [0, 0, 0], w.batt).castShadow = false;
  box(2, .07, 4, mat('#05050A'), [0, .01, 0], w.batt).castShadow = false;
  box(1.6, .08, .6, mat('#E0161E', { glow: 2 }), [0, .02, 1.4], w.batt).castShadow = false;
  box(1, .06, .5, mat('#E0161E', { glow: 2 }), [0, 0, -2.4], w.batt).castShadow = false;
  w.g = gary(k, k.scene, 2);
  w.flash = box(30, 30, .1, mat('#FFFFFF', { opacity: 0 }), [0, 0, 0], k.scene); w.flash.castShadow = false;
  w.sweat = group();
  for (let i = 0; i < 3; i++) { const d = ball(.1, mat('#5BC0EB', { glow: .8 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  return w;
}

const BASE = ['ground', 'room', 'phone', 'g'];
const PATH = [[-2.6, -.5], [2.6, 6.7], [0, 1.9], [-2.6, 4.3], [2.6, -.5], [0, 6.7]];
function along(t, sp) {
  const u = Math.min(PATH.length - 1.001, t * sp), i = Math.floor(u), f = u - i, a = PATH[i], b = PATH[i + 1];
  return { x: a[0] + (b[0] - a[0]) * f, z: a[1] + (b[1] - a[1]) * f, ang: Math.atan2(-(b[1] - a[1]), b[0] - a[0]), seg: i, f };
}

export default {
  id: '096',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GETS A PHONE',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'GOT A PHONE.'],
  title: 'Gary the ant got a phone',
  description: 'Every phone call is a workout. Every selfie is one eye. The battery never makes it. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'phone', 'ant', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his phone are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant got a phone.',
      show: [...BASE, 'on'], sky: '#F2D9B8', lightAt: [0, 4, 0], lightDist: 18,
      cam: { pos: [5, 7, 13], look: [0, 3.2, -1], fov: 50, to: { pos: [4.6, 6.6, 11.5], look: [0, 3, -1], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-.5, .55, -2.4); w.g.rotation.y = .5; scurry(w.g, t, 8); w.g.position.y = .55; },
    },
    {
      say: 'To call his mum, he runs across every button.',
      show: [...BASE, 'on', 'sweat'], sky: '#F2D9B8', lightAt: [0, 4, 3], lightDist: 18,
      cam: { pos: [6, 11, 15], look: [0, .5, 3], fov: 46, to: { pos: [5.5, 10.5, 13.5], look: [0, .5, 3], fov: 46 } },
      update: (w, p, t) => {
        const a = along(t, 1.6); w.g.position.set(a.x, .55, a.z); w.g.rotation.y = a.ang; scurry(w.g, t, 45); w.g.position.y = .55;
        w.keys.forEach((kk, i) => { kk.material.emissiveIntensity = .3; });
        const near = w.keys.reduce((best, kk) => { const d = Math.hypot(kk.position.x - a.x, kk.position.z - a.z); return d < best.d ? { d, kk } : best; }, { d: 9, kk: null });
        if (near.kk && near.d < .9) near.kk.material.emissiveIntensity = 2.5;
        w.sweat.children.forEach(d => { const f = (t * 1.5 + d.userData.i / 3) % 1; d.position.set(a.x - .5, 2 + f * .6 - f * f * 1.6, a.z + (d.userData.i - 1) * .3); });
      },
    },
    {
      say: 'Selfie time? One giant eye.',
      show: [...BASE, 'on', 'flash'], sky: '#F2D9B8', lightAt: [1, 3, -2], lightDist: 10,
      cam: { pos: [2.6, 1.5, -2.1], look: [.9, 1.4, -2.3], fov: 40, to: { pos: [2.1, 1.48, -2.15], look: [.9, 1.4, -2.3], fov: 38 } },
      update: (w, p, t) => {
        w.keys.forEach(kk => { kk.material.emissiveIntensity = .3; });
        w.g.position.set(0, .55, -2.4); w.g.rotation.y = 0; scurry(w.g, t, 0); w.g.position.y = .55;
        w.flash.position.set(2, 1.5, -2.1); w.flash.rotation.y = Math.PI / 2;
        const f = t - 1.1; w.flash.material.opacity = f > 0 && f < .5 ? .9 * (1 - f / .5) : 0;
      },
    },
    {
      say: 'And the battery dies before the last number.',
      show: [...BASE, 'off'], sky: '#3A3550', lightAt: [0, 4, 3], lightDist: 14,
      cam: { pos: [5, 10, 14], look: [0, .5, 2], fov: 46, to: { pos: [4.5, 9.5, 12.5], look: [0, .5, 2], fov: 46 } },
      update: (w, p, t) => {
        w.flash.material.opacity = 0; w.g.position.set(-.2, .55, 5.6); w.g.rotation.set(0, 1.4, 0); scurry(w.g, t, 0); w.g.position.y = .55;
        w.g.rotation.z = -.2 * Math.min(1, t); w.batt.visible = Math.floor(t * 3) % 2 === 0;
      },
    },
    {
      say: 'Gary\'s first app: games, maps, or a calculator? Comment below.',
      quiz: { q: 'What app should Gary get first?', options: ['Games', 'Maps', 'A calculator'], answer: 'Gary is made up, so any of them. He wants a phone charger more.' },
      show: [...BASE, 'on'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 18,
      cam: { pos: [4, 1.6, 10], look: [0, 4.2, -2], fov: 48, to: { pos: [-4, 1.6, 10], look: [0, 4.2, -2] } },
      update: (w, p, t) => { w.batt.visible = true; w.g.position.set(-.5, .55, 1.4); w.g.rotation.set(0, .5, 0); scurry(w.g, t, 8); w.g.position.y = .55; },
    },
  ],
};
