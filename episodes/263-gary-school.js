// Narrative 15: "What Would Happen If… (season 5)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary with a school bag in front of a chalkboard.

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
  const w = { k };
  w.desk = k.ground('#C8955A', 0);
  w.grass = k.ground('#7FB069', .005);
  w.wall = group(); box(30, 14, .3, mat('#DDE8D0'), [0, 7, -3], w.wall);
  w.board = group(); box(5, 2.6, .1, mat('#2E4A3A'), [0, 2.4, -2.8], w.board); w.chalk = group(); for (let i = 0; i < 3; i++) box(1.6 - i * .3, .08, .02, mat('#F5F5F5', { glow: .3 }), [-1 + i * .2, 3 - i * .5, -2.74], w.chalk);
  w.g = gary(k, k.scene, 1.3, '#E2453C');
  w.bag = group([-.38, .58, 0], w.g); const b = box(.35, .3, .3, mat('#3B6FD6'), [0, 0, 0], w.bag); w.bag.visible = true;
  w.ruler = group(); box(5, .05, .5, mat('#FFE07A'), [0, .025, 0], w.ruler); for (let i = 0; i < 25; i++) box(.02, .06, .15, mat('#333333'), [-2.4 + i * .2, .05, -.15], w.ruler);
  w.pencil = group(); const pc = cyl(.18, .18, 4, mat('#FFC21F'), [0, 0, 0], w.pencil, 6); pc.rotation.z = Math.PI / 2; const tip = cone(.18, .5, mat('#E8C49A'), [-2.25, 0, 0], w.pencil, 6); tip.rotation.z = Math.PI / 2; cyl(.18, .18, .3, mat('#FF7FA0'), [2.15, 0, 0], w.pencil, 6).rotation.z = Math.PI / 2;
  w.grain = box(.1, .1, .1, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], k.scene);
  w.tray = group(); cyl(.5, .5, .04, mat('#B0BEC5'), [0, .02, 0], w.tray, 16);
  w.kids = group(); w.kidAnts = []; for (let i = 0; i < 6; i++) { const a = gary(k, w.kids, .9, ['#FFC21F', '#5FBF5F', '#8E44AD', null, '#FF7F2A', null][i]); a.position.set(-2.4 + (i % 3) * 2.4, 0, -1 - Math.floor(i / 3) * 1.4); a.rotation.y = -1.4; w.kidAnts.push(a); }
  w.leaf = group(); const lf = ball(1.6, mat('#3FA34D'), [0, 0, 0], w.leaf); lf.scale.set(1.6, .08, .8); w.leaf.traverse(o => o.castShadow = false);
  w.paper = group(); box(1.6, .02, 2, mat('#FFFFFF'), [0, .01, 0], w.paper); w.aplus = group(); const am = mat('#E2453C', { glow: .5 }); for (const [x, r] of [[-.12, -.35], [.12, .35]]) { const s = box(.06, .7, .02, am, [x, .35, 0], w.aplus); s.rotation.z = r; } box(.25, .05, .02, am, [0, .3, 0], w.aplus); box(.3, .06, .02, am, [.5, .5, 0], w.aplus); box(.06, .3, .02, am, [.5, .5, 0], w.aplus);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };

export default {
  id: '263',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES TO SCHOOL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WENT TO SCHOOL?'],
  title: 'What would happen if Gary the ant went to school?',
  description: 'Getting to class takes all morning. Lunch is one grain of sugar. Recess is on a leaf. And his homework? The whole colony did it. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'school', 'funny', 'shorts'],
  sources: ['Quiz fact: ants learn routes and some species teach each other the way to food by "tandem running", a leader ant guiding a follower (Franks and Richardson, "Teaching in tandem-running ants", Nature, 2006).'],
  setup,
  scenes: [
    { say: 'What if Gary went to school?', show: ['desk', 'wall', 'board', 'chalk', 'g', 'bag'], sky: '#DDE8D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.g.rotation.z = .08 * Math.sin(t * 10); } },
    { say: 'Walking across the desk? That takes all morning.', label: '8:00 → 11:59', show: ['desk', 'wall', 'g', 'bag', 'ruler', 'pencil'], sky: '#DDE8D0', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2, 7], look: [0, .95, 0], fov: 52, to: { pos: [0, 2, 6.5], look: [0, .95, 0], fov: 50 } },
      update: (w, p, t) => { w.ruler.position.set(0, 0, .3); w.pencil.position.set(.6, .18, -1.2); gy(w, 1.4 - p * 2.8, .05, .3, Math.PI, t, true); } },
    { say: 'Lunch? One grain of sugar.', show: ['desk', 'wall', 'g', 'bag', 'grain', 'tray'], sky: '#DDE8D0', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.3, 5.2], look: [.15, .6, 0], fov: 46, to: { pos: [.7, 1.3, 4.7], look: [.15, .6, 0], fov: 44 } },
      update: (w, p, t) => { w.tray.position.set(.7, 0, .2); w.grain.position.set(.7, .08, .2); w.grain.rotation.y = t; gy(w, -.3, 0, .2, -.6, t); w.g.rotation.z = p > .5 ? .25 * Math.abs(Math.sin(t * 8)) : 0; } },
    { say: 'Recess? Surfing on a leaf.', show: ['grass', 'g', 'bag', 'leaf', 'kids'], sky: '#7EC8F2', lightAt: [2, 8, 6], lightDist: 20,
      cam: { pos: [0, 2.6, 7], look: [0, .9, 0], fov: 50, to: { pos: [0, 2.6, 6.4], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { const x = .7 * Math.sin(t * 1.4); w.leaf.position.set(x, .35 + .15 * Math.sin(t * 3), .6); w.leaf.rotation.set(.15 * Math.sin(t * 2), 0, .2 * Math.sin(t * 2.8)); gy(w, x, .4 + .15 * Math.sin(t * 3), .6, -1.4, t); w.g.rotation.z = w.leaf.rotation.z; w.kidAnts.forEach((a, i) => a.position.y = .1 * Math.max(0, Math.sin(t * 8 + i))); } },
    { say: 'And homework? The whole colony did it.', label: 'A+', show: ['desk', 'wall', 'g', 'bag', 'paper', 'aplus', 'kids'], sky: '#DDE8D0', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [1, 2, 6], look: [0, .6, -.4], fov: 50, to: { pos: [.9, 2, 5.5], look: [0, .6, -.4], fov: 48 } },
      update: (w, p, t) => { w.paper.position.set(.9, 0, .2); w.paper.rotation.y = -.2; w.aplus.position.set(.9, .03, .4); w.aplus.rotation.x = -Math.PI / 2; w.aplus.visible = p > .4; gy(w, -.6, 0, .4, -1.3, t); w.g.rotation.z = .1 * Math.sin(t * 6); w.kidAnts.forEach((a, i) => { a.position.y = .08 * Math.max(0, Math.sin(t * 9 + i)); }); } },
    { say: 'Best class for Gary: lunch, recess, or the test? Comment below.',
      quiz: { q: 'Best class for Gary?', options: ['Lunch', 'Recess', 'The test'], answer: 'Some real ants teach each other routes by tandem running.' },
      show: ['desk', 'g', 'bag'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
