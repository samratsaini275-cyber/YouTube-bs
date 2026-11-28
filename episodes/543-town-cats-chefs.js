// Narrative 29: "In This Town… (season 5: Gary and the cat)". Every episode: a town rule that Gary and the orange cat live through together.
// Hook: the rule under 2 s; first frame shows the cat in a chef hat at a steaming stove, Gary watching.

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

function cat(k, parent) {
  const { mat, ball, cyl, cone, group } = k;
  const org = mat('#F2A04A', { rough: .85 }), wht = mat('#FFF4E6'), pnk = mat('#F49AAE');
  const c = { root: group([0, 0, 0], parent) };
  c.body = ball(1.5, org, [-1.6, 1.4, 0], c.root); c.body.scale.set(1.4, 1, 1);
  c.head = group([.6, 2.4, 0], c.root); ball(1.3, org, [0, 0, 0], c.head); const mz = ball(.6, wht, [.95, -.35, 0], c.head); mz.scale.set(.6, .7, 1.1);
  ball(.15, pnk, [1.3, -.12, 0], c.head);
  c.eyes = []; for (const z of [-1, 1]) { const e = ball(.28, mat('#7BC96F', { glow: .2 }), [1, .35, z * .5], c.head); e.scale.x = .5; const pu = ball(.14, mat('#111111'), [1.13, .35, z * .5], c.head); pu.scale.set(.4, 1.6, .6); c.eyes.push(e, pu); const ear = cone(.45, .8, org, [-.1, 1.15, z * .7], c.head, 4); ear.rotation.x = z * .3; cone(.25, .5, pnk, [.05, 1.1, z * .7], c.head, 4); }
  for (let i = 0; i < 6; i++) { const z = i < 3 ? -1 : 1; const wk = cyl(.015, .015, 1.6, mat('#FFFFFF'), [1.3, -.3 + (i % 3) * .12, z * .9], c.head, 4); wk.rotation.set(Math.PI / 2, 0, (i % 3 - 1) * .2); }
  c.paw = group([.8, .5, .9], c.root); const pw = ball(.5, org, [0, 0, 0], c.paw); pw.scale.set(1.2, .6, 1); ball(.3, wht, [.3, -.1, 0], c.paw);
  for (const z of [-.9]) { const l = ball(.5, org, [.8, .4, z], c.root); l.scale.set(1.2, .6, 1); }
  c.tail = group([-3.4, 1.8, 0], c.root); const tl = cyl(.2, .15, 2.4, org, [0, 1.2, 0], c.tail, 8);
  return c;
}

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  w.floor = k.ground('#ECF0F1', 0);
  w.tiles = group(); for (let i = -8; i <= 8; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2 === 0) { const t = box(1, .01, 1, mat('#B03A2E'), [i, .005, j - 1.5], w.tiles); t.castShadow = false; }
  w.wall = box(40, 16, .3, mat('#D6EAF8'), [0, 8, -3]); w.wall.castShadow = false;
  w.stove = group(); box(2, 1, 1, mat('#7F8C8D'), [0, .5, 0], w.stove); for (const x of [-.5, .5]) cyl(.25, .25, .02, mat('#E74C3C', { glow: .8 }), [x, 1.01, 0], w.stove, 16); w.stove.position.set(-1.6, 0, -2.2);
  w.pot = group(); cyl(.45, .4, .5, mat('#BDC3C7', { rough: .3 }), [0, .25, 0], w.pot, 20); cyl(.42, .42, .02, mat('#F5B041', { glow: .3 }), [0, .46, 0], w.pot, 20); w.pot.position.set(-2.1, 1.02, -2.2);
  w.steam = group(); for (let i = 0; i < 4; i++) { const s = ball(.12, mat('#FDFEFE', { glow: .4 }), [0, 0, 0], w.steam); s.material.transparent = true; s.material.opacity = .6; s.userData.i = i; s.castShadow = false; }
  w.bigBowl = group(); const bw = mat('#FDFEFE', { rough: .3 }); const bb = ball(1.1, bw, [0, 0, 0], w.bigBowl, ); bb.scale.y = .45; w.soup = cyl(1.02, 1.02, .04, mat('#F5B041', { glow: .2 }), [0, .47, 0], w.bigBowl, 24);
  w.tinyBowl = group(); const tb = ball(.18, bw, [0, 0, 0], w.tinyBowl); tb.scale.y = .5; cyl(.16, .16, .02, mat('#F4D03F', { glow: .4 }), [0, .07, 0], w.tinyBowl, 16);
  w.splash = group(); for (let i = 0; i < 10; i++) { const d = ball(.06, mat('#F5B041'), [0, 0, 0], w.splash); d.userData.a = i / 10 * Math.PI * 2; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.hat = group([-.1, 1.15, 0], w.c.head); const hw = mat('#FDFEFE'); cyl(.6, .6, .3, hw, [0, 0, 0], w.hat, 16); ball(.75, hw, [0, .55, 0], w.hat);
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.cr.visible = true; w.c.head.rotation.set(0, 0, 0); w.c.body.scale.set(1.4, 1, 1); w.c.paw.position.set(.8, .5, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const steam = (w, t) => w.steam.children.forEach(s => { const q = (t * .4 + s.userData.i / 4) % 1; s.position.set(-2.1 + Math.sin(q * 6 + s.userData.i) * .15, 1.6 + q * 1.4, -2.2); s.scale.setScalar(.6 + q); });
const env = { sky: '#D6EAF8', lightAt: [2, 7, 6], lightDist: 22 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '543',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CHEF CAT',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS ARE CHEFS'],
  title: 'In this town, cats are chefs (Gary the ant and the cat)',
  description: 'Soup for everyone. Gary got a bowl the size of a pool. So Gary jumped in. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'chef', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: chef cats are made up. Quiz fact: archaeologists excavating ancient Egyptian tombs have found pots of honey thousands of years old that were still preserved; as long as it stays sealed and dry, honey does not go bad (Smithsonian Magazine, "The Science Behind Honey\'s Eternal Shelf Life").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats are chefs.',
      show: ['floor', 'tiles', 'wall', 'stove', 'pot', 'steam', 'g'], ...env,
      cam: { pos: [-.6, 4.2, 8.5], look: [-.6, 1.4, 0], fov: 50, to: { pos: [-.6, 4.2, 8], look: [-.6, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bigBowl', 'tinyBowl', 'splash'); steam(w, t); ctAt(w, -.6, 0, -.8, -2.4, .5); w.c.paw.position.set(1.2, 1.6 + Math.sin(t * 5) * .15, .9); gy(w, .8, 0, 1.4, -2.6, t); },
    },
    {
      say: 'Soup for everyone.',
      show: ['floor', 'tiles', 'wall', 'stove', 'pot', 'steam'], ...env,
      cam: { pos: [-1.6, 2.6, 5], look: [-1.8, 1.6, -1.5], fov: 50, to: { pos: [-1.6, 2.6, 4.6], look: [-1.8, 1.6, -1.5], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bigBowl', 'tinyBowl', 'splash'); steam(w, t); w.g.visible = false; ctAt(w, -1.2, 0, -1, -2.2, .5); w.c.paw.position.set(1.2, 1.8, .9); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); },
    },
    {
      say: 'Gary got a bowl the size of a pool.',
      show: ['floor', 'tiles', 'wall', 'stove', 'pot', 'g', 'bigBowl'], ...env,
      cam: { pos: [0, 2.4, 6.5], look: [0, .9, 0], fov: 50, to: { pos: [0, 2.4, 6], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'tinyBowl', 'steam', 'splash'); w.cr.visible = false; w.g.visible = true; w.bigBowl.position.set(.5, .3, .6); gy(w, -1.3, 0, 1.4, -.3, t); w.g.rotation.z = .2; },
    },
    {
      say: 'So Gary jumped in.',
      show: ['floor', 'tiles', 'wall', 'stove', 'pot', 'g', 'bigBowl', 'splash'], ...env,
      cam: { pos: [0, 2.6, 6.5], look: [0, .9, 0], fov: 50, to: { pos: [0, 2.6, 6], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'tinyBowl', 'steam'); w.cr.visible = false; w.bigBowl.position.set(.5, .3, .6); const f = Math.min(1, p * 2); gy(w, -1.3 + f * 1.7, Math.sin(f * Math.PI) * 1.2 + f * .25, 1.4 - f * .8, -.3, t); w.g.rotation.z = -f * 1.2; const sp = Math.max(0, (p - .5) * 3); w.splash.visible = sp > 0 && sp < 1; w.splash.position.set(.5, .7, .6); w.splash.children.forEach(d => d.position.set(Math.cos(d.userData.a) * sp, Math.sin(sp * Math.PI) * .8, Math.sin(d.userData.a) * sp * .6)); },
    },
    {
      say: 'So the cat made him a tiny one.',
      show: ['floor', 'tiles', 'wall', 'stove', 'pot', 'g', 'tinyBowl'], ...env,
      cam: { pos: [0, 2.4, 6.8], look: [0, 1, 0], fov: 50, to: { pos: [0, 2.4, 6.3], look: [0, 1, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'bigBowl', 'steam', 'splash'); ctAt(w, 1, 0, -.2, -2.3, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.tinyBowl.position.set(.05, .08, 1.3); gy(w, -.6, 0, 1.2, -.3, t); },
    },
    {
      say: 'Best soup: tomato, chicken, or pumpkin? Comment below.',
      quiz: { q: 'What is the best soup?', options: ['Tomato', 'Chicken', 'Pumpkin'], answer: 'Fun fact: pots of honey thousands of years old have been found in Egyptian tombs, still not spoiled.' },
      show: ['floor', 'tiles', 'wall', 'stove', 'pot', 'steam', 'g'], sky: '#5DADE2', lightAt: [2, 7, 6], lightDist: 22,
      cam: { pos: [2.2, 2.8, 7.5], look: [-.2, 1.3, 0], fov: 48, to: { pos: [-2.2, 2.8, 7.5], look: [-.2, 1.3, 0] } },
      update: (w, p, t) => { hide(w, 'bigBowl', 'tinyBowl', 'splash'); steam(w, t); ctAt(w, .8, 0, .2, -2.4, .45); gy(w, -.8, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
