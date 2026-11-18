// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his concert night are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary in front of a giant speaker.

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
  w.ground = k.ground('#1E1A2A', 0);
  w.stage = group();
  box(40, 1, 14, mat('#2A2A3A'), [0, .5, -8], w.stage);
  w.spk = group([0, 1, -6], w.stage);
  box(8, 12, 5, mat('#141418'), [0, 6, 0], w.spk);
  w.cone1 = cyl(3, 3, .5, mat('#3A3A44', { metal: .4 }), [0, 4, 2.5], w.spk, 32); w.cone1.rotation.x = Math.PI / 2;
  w.cone2 = cyl(1.6, 1.6, .5, mat('#3A3A44', { metal: .4 }), [0, 9.5, 2.5], w.spk, 32); w.cone2.rotation.x = Math.PI / 2;
  w.lights = [];
  for (let i = 0; i < 4; i++) { const l = cone(2, 14, mat(['#E2453C', '#2F6FD6', '#22C55E', '#FFD21F'][i], { glow: 1.2, opacity: .25, double: true }), [-12 + i * 8, 14, -6], w.stage, 16); l.castShadow = false; w.lights.push(l); }
  w.g = gary(k, k.scene, 2);
  w.rings = group([0, 5, -3]);
  for (let i = 0; i < 4; i++) { const r = k.torus(1, .12, mat('#FFFFFF', { glow: 1.5, opacity: .35 }), [0, 0, 0], w.rings); r.rotation.x = 0; r.userData.i = i; r.castShadow = false; }
  // crowd hands
  w.crowd = group([0, 0, 50]);
  w.handList = [];
  for (let i = 0; i < 7; i++) { const h = group([-12 + i * 4, 0, (i % 2) * 2], w.crowd); cyl(.9, 1, 10, mat('#F2C9A0'), [0, 5, 0], h, 10); const palm = ball(1.4, mat('#F2C9A0'), [0, 10.5, 0], h); palm.scale.y = .5; w.handList.push(h); }
  // the triangle on stage
  w.tri = group([0, 0, 100]);
  box(30, 1, 12, mat('#2A2A3A'), [0, .5, 0], w.tri);
  const tri = new k.THREE.Shape(); tri.moveTo(0, 3); tri.lineTo(2.6, -1.5); tri.lineTo(-2.6, -1.5); tri.closePath();
  const hole = new k.THREE.Path(); hole.moveTo(0, 2.4); hole.lineTo(2.05, -1.15); hole.lineTo(-2.05, -1.15); hole.closePath(); tri.holes.push(hole);
  const tg = new k.THREE.ExtrudeGeometry(tri, { depth: .25, bevelEnabled: false });
  w.triangle = k.mesh(tg, mat('#C9CED6', { metal: .9, rough: .2 }), [0, 4.5, 0], w.tri);
  cyl(.05, .05, 2.5, mat('#AEB6C2'), [0, 8.7, .1], w.tri, 6);
  w.spot = cone(4, 14, mat('#FFF6C9', { glow: 1.5, opacity: .25, double: true }), [0, 9, 0], w.tri, 24); w.spot.castShadow = false;
  w.notes = group([0, 6, 100]);
  for (let i = 0; i < 4; i++) { const n = group([0, 0, 0], w.notes); ball(.3, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], n); box(.08, 1, .08, mat('#FFD21F', { glow: 1.5 }), [.25, .5, 0], n); n.userData.i = i; }
  return w;
}

function party(w, t) { w.lights.forEach((l, i) => { l.rotation.z = .5 * Math.sin(t * 2 + i); }); const b = 1 + .08 * Math.max(0, Math.sin(t * 12)); w.cone1.scale.set(b, 1, b); }
const STAGE = ['ground', 'stage', 'g'];

export default {
  id: '093',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO A CONCERT',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT TO A CONCERT.'],
  title: 'Gary the ant went to a concert',
  description: 'The bass is a hurricane. Crowd surfing is a long way down. And then Gary gets his big break. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'concert', 'music', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his concert night are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went to a concert.',
      show: STAGE, sky: '#1E1A2A', lightAt: [0, 4, -2], lightDist: 18,
      cam: { pos: [3, 3, 14], look: [0, 6, -4], fov: 52, to: { pos: [3, 3, 12.5], look: [0, 6, -4], fov: 50 } },
      update: (w, p, t) => { party(w, t); w.g.position.set(0, 0, 3); w.g.rotation.y = -Math.PI / 2; scurry(w.g, t, 12); },
    },
    {
      say: 'The bass drops. So does Gary.',
      show: [...STAGE, 'rings'], sky: '#2A1E3A', lightAt: [0, 4, 0], lightDist: 18,
      cam: { pos: [16, 4, 6], look: [0, 3.5, 5], fov: 50, to: { pos: [15, 4, 6], look: [0, 3.5, 6], fov: 48 } },
      shake: (t) => t > .4 ? .2 : 0,
      update: (w, p, t, k) => {
        party(w, t); const blow = k.h.ease(Math.min(1, Math.max(0, t - .4) / .8));
        w.g.position.set(0, Math.sin(blow * Math.PI) * 2.5, 3 + blow * 4); w.g.rotation.set(blow * 6, -Math.PI / 2, 0); scurry(w.g, t, 50);
        w.rings.children.forEach(r => { const f = (t * 1.2 + r.userData.i / 4) % 1; r.position.z = f * 8; r.scale.setScalar(1 + f * 2); r.visible = t > .4; });
      },
    },
    {
      say: 'Crowd surfing? A long way down.',
      show: ['ground', 'crowd', 'g'], sky: '#2A1E3A', lightAt: [0, 10, 50], lightDist: 20,
      cam: { pos: [6, 14, 64], look: [0, 10, 50], fov: 50, to: { pos: [5, 13.5, 61], look: [0, 10, 50], fov: 48 } },
      update: (w, p, t) => {
        w.handList.forEach((h, i) => { h.position.y = .6 * Math.sin(t * 4 + i); });
        const x = -10 + t * 6; const i = Math.max(0, Math.min(6, Math.round((x + 12) / 4))); const h = w.handList[i];
        w.g.position.set(x, 11.2 + h.position.y, 50 + h.position.z); w.g.rotation.set(0, 0, .2 * Math.sin(t * 6)); scurry(w.g, t, 20);
      },
    },
    {
      say: 'Then he gets his big break. The triangle.',
      show: ['ground', 'tri', 'g', 'notes'], sky: '#1E1A2A', lightAt: [0, 5, 100], lightDist: 14,
      cam: { pos: [4, 6, 112], look: [0, 4.5, 100], fov: 48, to: { pos: [3.5, 6, 110], look: [0, 4.5, 100], fov: 46 } },
      update: (w, p, t) => {
        w.g.position.set(0, 2.97, 100.6); w.g.rotation.set(0, -Math.PI / 2, 0); scurry(w.g, t, 8);
        w.triangle.rotation.y = .15 * Math.sin(t * 9);
        w.notes.children.forEach(n => { const f = (t * .7 + n.userData.i / 4) % 1; n.position.set(-2 + n.userData.i * 1.3, f * 4, 0); n.scale.setScalar(.5 + f); });
      },
    },
    {
      say: 'Gary\'s band: jazz, rock, or opera? Comment below.',
      quiz: { q: 'What band should Gary start?', options: ['Jazz', 'Rock', 'Opera'], answer: 'Gary is made up, so any of them. He is already warming up for the opera.' },
      show: STAGE, sky: '#274B73', lightAt: [0, 4, -2], lightDist: 18,
      cam: { pos: [5, 2, 14], look: [0, 8, -4], fov: 50, to: { pos: [-5, 2, 14], look: [0, 8, -4] } },
      update: (w, p, t) => { party(w, t); w.g.position.set(0, 0, 3); w.g.rotation.set(0, -Math.PI / 2, 0); scurry(w.g, t, 12); },
    },
  ],
};
