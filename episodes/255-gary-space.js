// Narrative 15: "What Would Happen If… (season 5)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a space helmet.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.grass = k.ground('#7FB069', 0);
  w.stars = group(); for (let i = 0; i < 60; i++) { const s = ball(.08, mat('#FFFFFF', { glow: 1 }), [-20 + (i * 7.3) % 40, -6 + (i * 3.7) % 24, -15 - (i % 5)], w.stars); s.castShadow = false; }
  w.moon = group(); const m = ball(30, mat('#C9C9C9', { rough: 1 }), [0, -30, 0], w.moon); for (let i = 0; i < 8; i++) { const c = cyl(1.4 + (i % 3) * .5, 1.4 + (i % 3) * .5, .2, mat('#A8A8A8'), [-8 + i * 2.4, -.02, -3 + (i % 3) * 2], w.moon, 20); }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  const hm = ball(.42, mat('#BFE3F7', { opacity: .35, rough: .05 }), [.4, .46, 0], w.g); hm.castShadow = false;
  w.rocket = group(); cyl(.35, .35, 2.4, mat('#E2453C'), [0, 1.2, 0], w.rocket, 16); cone(.35, .8, mat('#FFFFFF'), [0, 2.8, 0], w.rocket, 16); for (let i = 0; i < 3; i++) { const f = box(.08, .6, .5, mat('#FFC21F'), [Math.cos(i * 2.1) * .35, .3, Math.sin(i * 2.1) * .35], w.rocket); f.rotation.y = -i * 2.1; } cyl(.03, .03, 1.6, mat('#8A6A3A'), [0, -.6, 0], w.rocket, 6);
  w.flameR = cone(.3, 1, mat('#FF8A1F', { glow: 1 }), [0, -.5, 0], w.rocket, 10); w.flameR.rotation.x = Math.PI;
  w.crumb = box(.5, .35, .4, mat('#D9A35B'), [0, 0, 0]);
  w.flag = group(); cyl(.03, .03, 1.4, mat('#CCCCCC'), [0, .7, 0], w.flag, 6); box(.6, .4, .02, mat('#FFC21F'), [.3, 1.2, 0], w.flag);
  w.alien = group(); ball(.25, mat('#5FD85F'), [0, .25, 0], w.alien); ball(.18, mat('#5FD85F'), [0, .6, 0], w.alien); for (const x of [-.07, .07]) ball(.05, mat('#111111'), [x, .65, .15], w.alien); for (const x of [-.08, .08]) { cyl(.01, .01, .2, mat('#5FD85F'), [x, .85, 0], w.alien, 4); ball(.03, mat('#FFE21F', { glow: 1 }), [x, .96, 0], w.alien); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const SPACE = '#0B1026';

export default {
  id: '255',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'SPACE GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WENT TO SPACE?'],
  title: 'What would happen if Gary the ant went to space?',
  description: 'His rocket is a firework. His lunch floats away. And the aliens are even smaller than he is. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'space', 'funny', 'shorts'],
  sources: ['Quiz fact: in 2014 NASA flew ant colonies to the International Space Station to study how they search in low gravity (Countryman et al., "Collective search by ants in microgravity", Frontiers in Ecology and Evolution, 2015).'],
  setup,
  scenes: [
    { say: 'What if Gary went to space?', show: ['grass', 'g'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.6, 6.5], look: [0, 1.1, 0], fov: 46, to: { pos: [1.5, 1.6, 5.9], look: [0, 1.1, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); } },
    { say: 'His rocket? A firework.', label: '3, 2, 1...', show: ['grass', 'g', 'rocket'], sky: '#9ED2F3', lightAt: [0, 6, 3], lightDist: 22,
      cam: { pos: [2, 3, 10], look: [0, 3, 0], fov: 50, to: { pos: [2, 6, 10], look: [0, 7, 0], fov: 50 } },
      update: (w, p, t) => { const up = Math.max(0, t - .9); const y = 1.6 + up * up * 6; w.rocket.position.set(0, y, 0); w.flameR.visible = up > 0; w.flameR.scale.set(1, 1 + .3 * Math.sin(t * 30), 1); gy(w, .5, y + 2.6, 0, -1.4, t); w.g.rotation.z = up > 0 ? .3 * Math.sin(t * 20) : 0; } },
    { say: 'Lunch in zero gravity? It floated away.', show: ['stars', 'g', 'crumb'], sky: SPACE, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, 1.4, 7], look: [.6, 1.2, 0], fov: 46, to: { pos: [1.5, 1.4, 6.4], look: [.6, 1.2, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, .6 + .2 * Math.sin(t * 1.4), 0, -1.4, t); w.g.rotation.z = .3 * Math.sin(t * .8); w.crumb.position.set(.8 + p * 1.8, 1.2 + p * 1.6, 0); w.crumb.rotation.set(t, t * .7, t * .5); } },
    { say: 'He landed on the moon and planted a very small flag.', show: ['stars', 'moon', 'g', 'flag'], sky: SPACE, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.8, 1.4, 6.5], look: [.3, 1, 0], fov: 46, to: { pos: [1.7, 1.4, 6], look: [.3, 1, 0], fov: 44 } },
      update: (w, p, t) => { w.flag.position.set(1, 0, -.2); w.flag.scale.setScalar(.6); gy(w, -.3, 0, 0, -1.4, t); } },
    { say: 'Then he met an alien. Even smaller than him.', label: '*FINALLY*', show: ['stars', 'moon', 'g', 'flag', 'alien'], sky: SPACE, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.2, 1.3, 6.8], look: [.4, .9, 0], fov: 44, to: { pos: [1.1, 1.3, 6.2], look: [.4, .9, 0], fov: 43 } },
      update: (w, p, t) => { w.flag.position.set(1.6, 0, -.6); w.flag.scale.setScalar(.6); w.alien.position.set(1.1, 0, .3); w.alien.rotation.y = -.6; w.alien.position.y = .05 * Math.abs(Math.sin(t * 6)); gy(w, -.5, 0, 0, -1.2, t); } },
    { say: 'Have real ants been to space: never, once, or yes, on the space station? Comment below.',
      quiz: { q: 'Have real ants been to space?', options: ['Never', 'Only in films', 'Yes, on the space station'], answer: 'Answer: yes. NASA sent ants to the space station in 2014.' },
      show: ['stars', 'moon', 'g', 'flag', 'alien'], sky: SPACE, lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.6, .8, 6.5], look: [.3, 1.8, 0], fov: 46, to: { pos: [-1.4, .8, 6.5], look: [.3, 1.8, 0] } },
      update: (w, p, t) => { w.flag.position.set(1.6, 0, -.6); w.flag.scale.setScalar(.6); w.alien.position.set(1.1, 0, .3); w.alien.rotation.y = -.6; gy(w, -.5, 0, 0, -1.2, t); } },
  ],
};
