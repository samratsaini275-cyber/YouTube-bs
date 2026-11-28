// Narrative 29: "In This Town… (season 5: Gary and the cat)". Season finale (544): the town gives the cat a medal and it passes it to Gary.
// Hook: the rule under 2 s; first frame shows the cat on a stage wearing a gold medal, bunting overhead, Gary in front.

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
  const w = { k };
  w.floor = k.ground('#7DBE5A', 0);
  w.road = box(40, .02, 3, mat('#BFA27A'), [0, .01, 1.2]); w.road.receiveShadow = true;
  w.houses = group(); const cols = ['#F5B041', '#5DADE2', '#EC7063', '#F7DC6F', '#AF7AC5', '#58D68D'];
  for (let i = 0; i < 6; i++) { const h = group([-7.5 + i * 3, 0, -3.5], w.houses); box(1.8, 1.6, 1.6, mat(cols[i]), [0, .8, 0], h); const r = cone(1.5, 1, mat('#922B21'), [0, 2.1, 0], h, 4); r.rotation.y = Math.PI / 4; box(.4, .7, .05, mat('#6E2C00'), [0, .35, .82], h); box(.4, .4, .05, mat('#D6EAF8', { glow: .3 }), [.5, 1.1, .82], h); }
  w.stage = group(); box(3.4, .4, 1.6, mat('#2E86C1'), [0, .2, 0], w.stage); w.stage.position.set(0, 0, -.6);
  w.bunting = group(); const bc = ['#E74C3C', '#F1C40F', '#2ECC71', '#3498DB']; for (let i = 0; i < 12; i++) { const f = cone(.15, .3, mat(bc[i % 4]), [-2.75 + i * .5, 2.6 - Math.sin(i / 11 * Math.PI) * .3, -1.2], w.bunting, 3); f.rotation.x = Math.PI; f.castShadow = false; }
  w.medal = group(); const gold = mat('#F4D03F', { glow: .5, rough: .2 }); const disc = cyl(.3, .3, .05, gold, [0, 0, 0], w.medal, 24); disc.rotation.x = Math.PI / 2; cyl(.18, .18, .06, mat('#D4AC0D', { glow: .4 }), [0, 0, 0], w.medal, 3).rotation.x = Math.PI / 2; box(.08, .7, .02, mat('#C0392B'), [-.12, .45, -.02], w.medal).rotation.z = .2; box(.08, .7, .02, mat('#2471A3'), [.12, .45, -.02], w.medal).rotation.z = -.2;
  w.conf = group(); for (let i = 0; i < 40; i++) { const c = box(.07, .07, .02, mat(['#E74C3C', '#F1C40F', '#3498DB', '#2ECC71', '#9B59B6'][i % 5], { glow: .4 }), [0, 0, 0], w.conf); c.userData.o = [(i * .37) % 1, (i * .61) % 1, (i * .83) % 1]; c.castShadow = false; }
  w.g = gary(k, k.scene, 1.3, '#FFC21F');
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.crowd = []; for (let i = 0; i < 3; i++) { const c = cat(k, k.scene); const col = ['#8A8A8A', '#5D4037', '#FDFEFE'][i]; c.root.traverse(o => { if (o.material && o.material.color && o.material.color.getHexString() === 'f2a04a') o.material = mat(col, { rough: .85 }); }); w.crowd.push(c); }
  return w;
}

const gy = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); w.g.scale.setScalar(1.3); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const put = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const crowd = (w, on, t) => w.crowd.forEach((c, i) => { c.root.visible = on; if (on) { put(c, -2.2 + i * 2.2, 0, 1.8, Math.PI + (i - 1) * .3, .3); c.head.rotation.z = .3; c.paw.position.set(.9, .5 + Math.abs(Math.sin(t * 6 + i)) * .5, .9); } });
const confetti = (w, t, on) => { w.conf.visible = on; w.conf.children.forEach(c => { const [a, b, d] = c.userData.o; c.position.set((a - .5) * 6, 4 - ((t * .4 + b) % 1) * 4, (d - .5) * 2.5); c.rotation.set(t * 3 + a * 6, t * 2 + b * 6, 0); }); };
const medalOn = (w, c, sc = 1) => { c.root.updateWorldMatrix(true, true); const hp = c.head.getWorldPosition(new w.k.THREE.Vector3()); const s = c.root.scale.x; w.medal.position.set(hp.x + .25 * s * 2, hp.y - 1.1 * s, hp.z + .3); w.medal.rotation.set(0, 0, 0); w.medal.scale.setScalar(sc); };
const env = { sky: '#F8C471', lightAt: [3, 9, 8], lightDist: 30 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '544',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'MEDAL DAY',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'CATS GET MEDALS'],
  title: 'In this town, cats get medals (season finale, Gary the ant and the cat)',
  description: 'The town gave the cat a medal for best friend of the year. The cat had other ideas. Season finale. (A made-up comedy sketch.)',
  tags: ['inthistown', 'garytheant', 'cat', 'finale', 'funny', 'shorts'],
  sources: [
    'Comedy sketch: medals for cats are made up. Quiz fact: under Olympic rules, gold medals must be at least 92.5 percent silver and are then coated with roughly six grams of pure gold (Encyclopaedia Britannica, "Are Olympic Medals Made of Gold?").',
  ],
  setup,
  scenes: [
    {
      say: 'In this town, cats get medals.',
      show: ['floor', 'road', 'houses', 'stage', 'bunting', 'medal', 'g'], ...env,
      cam: { pos: [0, 5, 8.5], look: [0, 1.4, 0], fov: 50, to: { pos: [0, 5, 8], look: [0, 1.4, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); crowd(w, false, t); put(w.c, .3, .4, -.6, -1.7, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); medalOn(w, w.c); gy(w, -1.4, 0, 1.4, -.4, t); },
    },
    {
      say: 'This one: best friend of the year.',
      show: ['floor', 'road', 'houses', 'stage', 'bunting', 'medal'], ...env,
      cam: { pos: [.3, 2.4, 5.5], look: [.3, 1.5, 0], fov: 50, to: { pos: [.3, 2.4, 5], look: [.3, 1.5, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, true); crowd(w, false, t); w.g.visible = false; put(w.c, .3, .4, -.6, -1.7, .5); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); medalOn(w, w.c); w.medal.rotation.y = Math.sin(t * 3) * .3; },
    },
    {
      say: 'The cat said: not me. Him.',
      show: ['floor', 'road', 'houses', 'stage', 'bunting', 'medal', 'g'], ...env,
      cam: { pos: [-.4, 2.8, 7], look: [-.4, 1.3, 0], fov: 50, to: { pos: [-.4, 2.8, 6.5], look: [-.4, 1.3, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); crowd(w, false, t); put(w.c, .4, .4, -.6, -2.4, .45); medalOn(w, w.c); w.c.paw.position.set(1.4, 1.3, .9); w.c.head.rotation.y = -.3; gy(w, -1.2, 0, 1.2, -.4, t); w.g.rotation.z = .2 * Math.sin(t * 4); },
    },
    {
      say: 'So Gary got the medal. It was bigger than him.',
      show: ['floor', 'road', 'houses', 'stage', 'bunting', 'medal', 'g'], ...env,
      cam: { pos: [-.4, 2, 6.5], look: [-.4, 1, 0], fov: 50, to: { pos: [-.4, 2, 6.1], look: [-.4, 1, 0], fov: 48 } },
      update: (w, p, t) => { confetti(w, t, false); crowd(w, false, t); w.cr.visible = false; gy(w, -.7, 0, 1.2, -.3, t); w.medal.position.set(.35, .5, 1.5); w.medal.scale.setScalar(1.3); w.medal.rotation.set(0, 0, Math.sin(t * 2) * .05); },
    },
    {
      say: 'Best friends. See you next season.',
      show: ['floor', 'road', 'houses', 'stage', 'bunting', 'medal', 'g'], ...env,
      cam: { pos: [0, 3.6, 9], look: [0, 1.4, 0], fov: 52, to: { pos: [0, 3.6, 8.5], look: [0, 1.4, 0], fov: 50 } },
      update: (w, p, t) => { confetti(w, t, true); crowd(w, true, t); put(w.c, .6, .4, -.6, -1.7, .45); w.c.eyes.forEach((e, i) => e.scale.y = i % 2 ? .5 : .3); w.cr.updateWorldMatrix(true, true); const hp = w.c.head.getWorldPosition(new w.k.THREE.Vector3()); gy(w, hp.x - .15, hp.y + .55, hp.z, -.4 + .3 * Math.sin(t * 3), t); w.medal.position.set(hp.x + .1, hp.y + .1, hp.z + .45); w.medal.scale.setScalar(.8); },
    },
    {
      say: 'Best prize: a medal, a trophy, or a crown? Comment below.',
      quiz: { q: 'What is the best prize?', options: ['A medal', 'A trophy', 'A crown'], answer: 'Fun fact: Olympic gold medals are mostly silver, coated with about six grams of gold.' },
      show: ['floor', 'road', 'houses', 'stage', 'bunting', 'g'], sky: '#5DADE2', lightAt: [3, 9, 8], lightDist: 30,
      cam: { pos: [2.4, 3.2, 8.5], look: [0, 1.4, 0], fov: 48, to: { pos: [-2.4, 3.2, 8.5], look: [0, 1.4, 0] } },
      update: (w, p, t) => { confetti(w, t, false); crowd(w, false, t); put(w.c, .8, .4, -.6, -2.4, .45); gy(w, -.8, 0, 1.4, -.5 + .3 * Math.sin(t * 3), t, true); },
    },
  ],
};
