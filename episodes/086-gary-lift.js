// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his lift ride are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary at the foot of huge lift doors.

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
  w.ground = k.ground('#C9CED6', 0);
  w.lobby = group();
  box(60, 40, .5, mat('#E6E9EE'), [0, 20, -6], w.lobby);
  for (let i = 0; i < 10; i++) for (let j = 0; j < 5; j++) box(5.9, .05, 5.9, mat((i + j) % 2 ? '#D9DEE6' : '#C3C9D2'), [-27 + i * 6, .03, -3 + j * 6], w.lobby).castShadow = false;
  // lift doors (huge for Gary)
  w.doors = [-1, 1].map(s => { const d = box(6, 16, .4, mat('#AEB6C2', { metal: .8, rough: .2 }), [s * 3, 8, -5.6], w.lobby); return d; });
  box(13, .8, .6, mat('#8A93A0', { metal: .7 }), [0, 16.4, -5.6], w.lobby);
  w.floorlamp = box(3, .9, .2, mat('#1E2430'), [0, 18, -5.65], w.lobby);
  w.digit = box(.5, .6, .05, mat('#FF8A1F', { glow: 2 }), [0, 18, -5.5], w.lobby);
  w.arrow = cone(.35, .5, mat('#22C55E', { glow: 2 }), [1, 18, -5.5], w.lobby, 3); w.arrow.rotation.z = Math.PI;
  // call button panel on the wall
  w.panel = group([8.5, 7, -5.65], w.lobby);
  box(1.4, 2.6, .2, mat('#8A93A0', { metal: .7 }), [0, 0, 0], w.panel);
  w.btnUp = cyl(.35, .35, .15, mat('#FFFFFF', { glow: .2 }), [0, .55, .15], w.panel, 20); w.btnUp.rotation.x = Math.PI / 2;
  w.btnDn = cyl(.35, .35, .15, mat('#FFFFFF', { glow: .2 }), [0, -.55, .15], w.panel, 20); w.btnDn.rotation.x = Math.PI / 2;
  w.g = gary(k, k.scene, 2);
  w.sign = group([-9, 6, -5.6], w.lobby);
  box(4, 2, .1, mat('#2F6FD6'), [0, 0, 0], w.sign);
  box(1, 1.2, .12, mat('#FFFFFF'), [-1, 0, .02], w.sign); box(1.6, .2, .12, mat('#FFFFFF'), [.6, .3, .02], w.sign); box(1.6, .2, .12, mat('#FFFFFF'), [.6, -.3, .02], w.sign);
  w.clock = group([-3, 26, -5.6]);
  const cf = cyl(2, 2, .3, mat('#FFFFFF'), [0, 0, 0], w.clock, 28); cf.rotation.x = Math.PI / 2;
  w.hand = group([0, 0, .2], w.clock); box(.18, 1.6, .05, mat('#111111'), [0, .75, 0], w.hand);
  return w;
}

const LOBBY = ['ground', 'lobby', 'g'];

export default {
  id: '086',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY TAKES THE LIFT',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'TOOK THE LIFT.'],
  title: 'Gary the ant took the lift',
  description: 'The button is very, very high. The climb is very, very long. The destination is... interesting. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'lift', 'elevator', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and the lift are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant took the lift.',
      show: LOBBY, sky: '#E6E9EE', lightAt: [2, 4, -2], lightDist: 20,
      cam: { pos: [3, 3, 16], look: [2, 7, -3], fov: 50, to: { pos: [3, 3, 14.5], look: [2, 7, -3], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(1, 0, -3.5); w.g.rotation.y = Math.PI / 2; scurry(w.g, t, 10); w.doors.forEach((d, i) => { d.position.x = (i ? 1 : -1) * 3; }); },
    },
    {
      say: 'The button is up there.',
      show: LOBBY, sky: '#E6E9EE', lightAt: [8, 4, -4], lightDist: 16,
      cam: { pos: [13, 3, 10], look: [8.5, 4, -5], fov: 50, to: { pos: [12.5, 3, 9], look: [8.5, 4.3, -5], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(8.5, Math.abs(Math.sin(t * 6)) * .8, -4.6); w.g.rotation.y = Math.PI / 2; scurry(w.g, t, 30); },
    },
    {
      say: 'So he climbs. For an hour.',
      show: [...LOBBY, 'clock'], sky: '#E6E9EE', lightAt: [8, 5, -4], lightDist: 18,
      cam: { pos: [14, 4, 10], look: [8, 5, -5], fov: 52, to: { pos: [13, 4.5, 8.5], look: [8, 5.5, -5], fov: 50 } },
      update: (w, p, t, k) => { const c = k.h.ease(Math.min(1, t / 2.2)); w.g.position.set(8.6, .3 + c * 6.3, -5.25); w.g.rotation.set(0, Math.PI / 2, Math.PI / 2); scurry(w.g, t, 30); w.hand.rotation.z = -t * 6; },
    },
    {
      say: 'Ding. The doors open.',
      show: LOBBY, sky: '#E6E9EE', lightAt: [0, 6, -4], lightDist: 20,
      cam: { pos: [4, 6, 18], look: [1, 8, -5], fov: 52, to: { pos: [3.5, 6, 16.5], look: [1, 8, -5], fov: 50 } },
      update: (w, p, t, k) => { w.btnDn.material.emissiveIntensity = 2; const o = k.h.ease(Math.min(1, Math.max(0, t - .5) / 1)); w.doors.forEach((d, i) => { d.position.x = (i ? 1 : -1) * (3 + o * 5.5); }); w.g.position.set(8.6, 6.6, -5.25); w.g.rotation.set(0, Math.PI / 2, Math.PI / 2); scurry(w.g, t, 6); },
    },
    {
      say: 'It goes down. Gary lives on the ground floor.',
      show: LOBBY, sky: '#FFE3C2', lightAt: [0, 4, -2], lightDist: 16,
      cam: { pos: [2, 3, 12], look: [0, 5, -4], fov: 48, to: { pos: [2, 3, 10.5], look: [0, 5, -4], fov: 46 } },
      update: (w, p, t) => { w.doors.forEach((d, i) => { d.position.x = (i ? 1 : -1) * 3; }); w.digit.material.color.set('#FF8A1F'); w.g.position.set(-.5, 0, -3.5); w.g.rotation.set(0, -.4, 0); scurry(w.g, t, 2); w.arrow.visible = (t % .6) < .4; },
    },
    {
      say: 'Gary\'s next ride: escalator, slide, or rocket? Comment below.',
      quiz: { q: 'What should Gary ride next?', options: ['An escalator', 'A slide', 'A rocket'], answer: 'Gary is made up, so any of them. He is very much hoping for the rocket.' },
      show: LOBBY, sky: '#274B73', lightAt: [2, 4, -2], lightDist: 20,
      cam: { pos: [5, 2, 18], look: [1.5, 7, -3], fov: 48, to: { pos: [-3, 2, 18], look: [1.5, 7, -3] } },
      update: (w, p, t) => { w.g.position.set(1, 0, -3.5); w.g.rotation.set(0, Math.PI / 2, 0); scurry(w.g, t, 10); },
    },
  ],
};
