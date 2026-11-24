// Narrative 17: "What Would Happen If… (season 7)". Gary premise (about every fourth episode).
// Hook: the premise as a question under 2 s; first frame shows Gary in a top hat waving a sparkling wand.

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
  w.stage = k.ground('#7A2A3A', 0);
  w.wall = group(); box(30, 14, .3, mat('#3A1A4A'), [0, 7, -3], w.wall); for (let i = 0; i < 12; i++) box(.8, 10, .1, mat(i % 2 ? '#8A1A2A' : '#6A1020'), [-5.5 + i, 5, -2.8], w.wall);
  w.g = gary(k, k.scene, 1.3, null);
  w.top = group([.36, .52, 0], w.g); cyl(.3, .3, .03, mat('#111111'), [0, 0, 0], w.top, 16); cyl(.18, .18, .4, mat('#111111'), [0, .2, 0], w.top, 16); cyl(.185, .185, .06, mat('#E2453C'), [0, .05, 0], w.top, 16);
  w.wand = group(); cyl(.03, .03, .7, mat('#111111'), [0, 0, 0], w.wand, 6); cyl(.032, .032, .1, mat('#FFFFFF'), [0, .32, 0], w.wand, 6);
  w.hat = group(); cyl(.5, .5, .05, mat('#111111'), [0, 0, 0], w.hat, 20); cyl(.32, .32, .8, mat('#111111'), [0, .4, 0], w.hat, 20);
  w.bug = group(); const lb = ball(.25, mat('#E2453C'), [0, 0, 0], w.bug); lb.scale.y = .6; ball(.12, mat('#111111'), [.2, .02, 0], w.bug); for (const [x, z] of [[-.08, .1], [.05, -.12], [-.1, -.08]]) ball(.05, mat('#111111'), [x, .13, z], w.bug);
  w.cards = group(); for (let i = 0; i < 5; i++) { const c = box(.3, .45, .01, mat('#FFFFFF'), [0, 0, 0], w.cards); c.userData.i = i; box(.08, .08, .012, mat(i % 2 ? '#E2453C' : '#111111'), [0, 0, 0], c); }
  w.crumb = box(.2, .14, .16, mat('#D9A35B'), [0, .07, 0], k.scene);
  w.sparkles = group(); for (let i = 0; i < 10; i++) { const s = ball(.05, mat('#FFE07A', { glow: 1 }), [0, 0, 0], w.sparkles); s.userData.i = i; s.castShadow = false; }
  w.cloud = group(); for (let i = 0; i < 6; i++) { const s = ball(.35, mat('#DDDDDD', { opacity: .8 }), [Math.cos(i) * .35, .3 + (i % 2) * .25, Math.sin(i) * .35], w.cloud); s.castShadow = false; }
  w.crowd = group(); w.cr = []; for (let i = 0; i < 4; i++) { const a = gary(k, w.crowd, .9, ['#FFC21F', null, '#5FBF5F', null][i]); a.position.set(-1.8 + i * 1.2, 0, 1.6); a.rotation.y = Math.PI / 2 + Math.PI; w.cr.push(a); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const sparkle = (w, x, y, z, t) => w.sparkles.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2 + t * 3; s.position.set(x + Math.cos(a) * .5, y + Math.sin(a * 2) * .3, z + Math.sin(a) * .5); });

export default {
  id: '291',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY THE MAGICIAN',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'WAS A MAGICIAN?'],
  title: 'What would happen if Gary the ant was a magician?',
  description: 'Out of the hat comes a ladybug. The card trick uses cards bigger than he is. The crumb vanishes, straight into his mouth. And the grand finale? Poof. (A made-up comedy sketch.)',
  tags: ['whatif', 'gary', 'ant', 'magic', 'funny', 'shorts'],
  sources: ['Quiz fact: some ants keep aphids like livestock, protecting them in exchange for the sweet honeydew they make (Encyclopaedia Britannica, "ant").'],
  setup,
  scenes: [
    { say: 'What if Gary was a magician?', show: ['stage', 'wall', 'g', 'top', 'wand', 'sparkles'], sky: '#3A1A4A', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [1.4, 1.2, 5.6], look: [0, .85, 0], fov: 46, to: { pos: [1.3, 1.2, 5], look: [0, .85, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, 0, 0, .4, -1.4, t); w.wand.position.set(.55, .7, .9); w.wand.rotation.set(0, 0, -.6 + .3 * Math.sin(t * 6)); sparkle(w, .85, 1.1, .9, t); } },
    { say: 'Out of the hat? A ladybug.', label: 'TA-DA', show: ['stage', 'wall', 'g', 'top', 'hat', 'bug', 'wand'], sky: '#3A1A4A', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.6, 5.4], look: [.2, .9, 0], fov: 46, to: { pos: [.7, 1.6, 4.9], look: [.2, .9, 0], fov: 44 } },
      update: (w, p, t) => { gy(w, -.7, 0, .4, -.9, t); w.hat.position.set(.6, 0, .2); w.wand.position.set(.1, .8, .6); w.wand.rotation.set(0, 0, -1); const q = Math.min(1, Math.max(0, (p - .3) * 2.5)); w.bug.position.set(.6, .5 + q * .9, .2); w.bug.visible = q > 0; w.bug.rotation.y = t; } },
    { say: 'Card tricks? The cards are bigger than him.', show: ['stage', 'wall', 'g', 'top', 'cards'], sky: '#3A1A4A', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [0, 1.6, 6], look: [0, 1, 0], fov: 48, to: { pos: [0, 1.6, 5.5], look: [0, 1, 0], fov: 46 } },
      update: (w, p, t) => { gy(w, 0, 0, .3, -1.4, t); w.cards.children.forEach(c => { const i = c.userData.i, a = (i - 2) * .35; c.scale.setScalar(3.2); c.position.set(Math.sin(a) * 1.2, 1.2 + Math.cos(a) * .3, -.2); c.rotation.set(0, 0, -a); }); w.g.rotation.z = .1 * Math.sin(t * 3); } },
    { say: 'The vanishing crumb? Straight into his mouth.', show: ['stage', 'wall', 'g', 'top', 'crumb', 'sparkles'], sky: '#3A1A4A', lightAt: [0, 6, 3], lightDist: 16,
      cam: { pos: [.8, 1.3, 4.8], look: [.2, .7, 0], fov: 44, to: { pos: [.7, 1.3, 4.3], look: [.2, .7, 0], fov: 42 } },
      update: (w, p, t) => { gy(w, -.4, 0, .3, -.9, t); const q = Math.min(1, Math.max(0, (p - .35) * 3)); w.crumb.position.set(.5 - q * .45, .07 + q * .35, .5 - q * .1); w.crumb.visible = q < .95; sparkle(w, .5, .5, .5, t); w.sparkles.visible = q < .1; w.g.rotation.z = q >= .95 ? .15 * Math.sin(t * 10) : 0; } },
    { say: 'And the grand finale? Poof.', label: '*POOF*', show: ['stage', 'wall', 'g', 'top', 'cloud', 'crowd'], sky: '#3A1A4A', lightAt: [0, 6, 3], lightDist: 18,
      cam: { pos: [0, 2, 6.4], look: [0, .9, 0], fov: 50, to: { pos: [0, 2, 5.9], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { const gone = p > .45; gy(w, 0, 0, -.2, -1.4, t); w.g.visible = !gone; w.cloud.position.set(.1, 0, -.2); w.cloud.visible = p > .38 && p < .7; w.cloud.scale.setScalar(.6 + (p - .38) * 3); w.cr.forEach((a, i) => { a.position.y = gone ? .1 * Math.max(0, Math.sin(t * 10 + i)) : 0; }); } },
    { say: 'Magician Gary: amazing, sneaky, or both? Comment below.',
      quiz: { q: 'Magician Gary is…', options: ['Amazing', 'Sneaky', 'Both'], answer: 'Some real ants keep aphids like livestock for their honeydew.' },
      show: ['stage', 'g', 'top'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.6, .3, 4.6], look: [0, 1.6, 0], fov: 44, to: { pos: [-.6, .3, 4.6], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.g.visible = true; gy(w, 0, 0, 0, -1.4, t); w.g.rotation.z = .1 * Math.sin(t * 5); } },
  ],
};
