// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise + birthday party: the top shorts are cat shorts (749, 424) and the T-rex birthday party (173).
// Hook: the premise as a question under 2 s; first frame shows a cat in a party hat next to a fish-shaped cake.

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
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#F7D6E0'), [0, 8, -4], w.wall); for (let i = 0; i < 9; i++) { const f = cone(.4, .7, mat(['#E2453C', '#3E6FD6', '#F2C94C'][i % 3]), [-6 + i * 1.5, 7, -3.8], w.wall, 3); f.rotation.z = Math.PI; }
  w.table = box(7, .3, 3.4, mat('#FFFFFF'), [0, 2.2, 0]);
  w.cats = []; for (let i = 0; i < 3; i++) w.cats.push(cat(k, k.scene));
  w.hats = []; for (let i = 0; i < 3; i++) { const h = cone(.4, 1, mat(['#3E6FD6', '#E2453C', '#3FA34D'][i]), [0, 0, 0], undefined, 12); w.hats.push(h); }
  w.cake = group(); const fish = ball(1, mat('#9FB8C8'), [0, .5, 0], w.cake); fish.scale.set(1.8, .6, .8); const ft = cone(.6, .8, mat('#9FB8C8'), [-2, .5, 0], w.cake, 3); ft.rotation.z = Math.PI / 2; ball(.1, mat('#111111'), [1.4, .7, .5], w.cake); w.candles = []; for (let i = 0; i < 3; i++) { const cg = group([-.6 + i * .6, 1, 0], w.cake); cyl(.06, .06, .5, mat('#FFFFFF'), [0, .25, 0], cg, 6); const fl = ball(.1, mat('#FFB830', { glow: 1 }), [0, .58, 0], cg); fl.scale.y = 1.6; cg.userData.flame = fl; w.candles.push(cg); }
  w.gift = group(); w.giftBox = box(1.6, 1.4, 1.6, mat('#7C5CC4'), [0, .7, 0], w.gift); box(1.65, .2, .3, mat('#F2C94C'), [0, .7, 0], w.gift); box(.3, 1.45, 1.65, mat('#F2C94C'), [0, .7, 0], w.gift);
  w.toy = group(); const tb = ball(.4, mat('#E2453C'), [0, .4, 0], w.toy); w.paper = group(); for (let i = 0; i < 6; i++) { const pp = box(.6, .02, .6, mat('#7C5CC4'), [0, 0, 0], w.paper); pp.userData.i = i; }
  w.smoke = group(); for (let i = 0; i < 6; i++) { const s = ball(.12, mat('#DDDDDD'), [0, 0, 0], w.smoke); s.userData.i = i; s.castShadow = false; }
  return w;
}

const ctAt = (c, x, y, z, ry, s) => { c.root.position.set(x, y, z); c.root.rotation.set(0, ry, 0); c.root.scale.setScalar(s); c.root.visible = true; c.head.rotation.set(0, 0, 0); c.body.rotation.set(0, 0, 0); c.body.scale.set(1.4, 1, 1); c.paw.position.set(.8, .5, .9); c.paw.rotation.set(0, 0, 0); c.eyes.forEach((e, i) => e.scale.y = i % 2 ? 1.6 : 1); };
const hatsOn = (w) => w.cats.forEach((c, i) => { const h = w.hats[i]; h.visible = c.root.visible; if (!c.root.visible) return; c.root.updateWorldMatrix(true, true); const top = c.head.localToWorld(new w.k.THREE.Vector3(0, 1.4, 0)); h.position.copy(top); h.scale.setScalar(c.root.scale.x * 1.1); h.rotation.set(0, 0, -.15); });
const hideFrom = (w, n) => w.cats.forEach((c, i) => c.root.visible = i < n);

export default {
  id: '382',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CAT BIRTHDAY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS HAD', 'A BIRTHDAY PARTY?'],
  title: 'What would happen if cats had a birthday party?',
  description: 'The cake? Made of tuna. The present? They only want the box. And the candles? Swiped right out. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'birthday', 'shorts'],
  sources: ['Comedy sketch: a cat birthday party is made up. Quiz fact: a 2023 study of cats at a cat café catalogued 276 distinct facial expressions that cats make towards each other (Scott and Florkiewicz, "Feline faces: Unraveling the social function of domestic cat facial signals", Behavioural Processes, 2023).'],
  setup,
  scenes: [
    { say: 'What if cats had a birthday party?', show: ['floor', 'wall', 'table', 'cake'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1.5, 4, 13], look: [0, 4.4, 0], fov: 50, to: { pos: [1.5, 4, 12.3], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { hideFrom(w, 1); w.cake.position.set(1.4, 2.35, .4); ctAt(w.cats[0], -1.6, 2.35, -.6, -.9, .7); w.cats[0].head.rotation.z = .1 * Math.sin(t * 2); w.candles.forEach(c => { c.visible = true; c.userData.flame.visible = true; c.userData.flame.scale.set(1, 1.6 + .3 * Math.sin(t * 20), 1); }); hatsOn(w); } },
    { say: 'The cake? Made of tuna.', label: 'YUM', show: ['floor', 'wall', 'table', 'cake'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [1, 5, 9], look: [0, 2.8, 0], fov: 50, to: { pos: [1, 5, 8.5], look: [0, 2.8, 0], fov: 48 } },
      update: (w, p, t) => { hideFrom(w, 3); w.cake.position.set(0, 2.35, .3); ctAt(w.cats[0], -2.6, 2.35, -.4, -.4, .55); ctAt(w.cats[1], 0, 2.35, -1.2, -1.57, .55); ctAt(w.cats[2], 2.6, 2.35, -.4, -2.6, .55); w.cats.forEach((c, i) => { c.head.rotation.z = -.2 + .1 * Math.sin(t * 6 + i); }); hatsOn(w); } },
    { say: 'The present? They only want the box.', label: 'RIP!', show: ['floor', 'wall', 'gift', 'toy', 'paper'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 3, 9], look: [0, 1.6, 0], fov: 50, to: { pos: [2, 3, 8.5], look: [0, 1.6, 0], fov: 48 } },
      update: (w, p, t) => { hideFrom(w, 1); w.gift.position.set(.6, 0, 0); const open = p > .35; w.toy.position.set(-1.6, 0, 1.2); w.toy.visible = open; w.paper.children.forEach(pp => { const i = pp.userData.i; pp.position.set(.6 + Math.cos(i) * 1.6, .05, Math.sin(i) * 1.4 + .6); pp.rotation.y = i; pp.visible = open; }); const c = w.cats[0]; if (open) { ctAt(c, .5, .45, 0, -1.4, .5); c.eyes.forEach(e => e.scale.y = .2); c.head.rotation.z = -.3; } else { ctAt(c, -1.8, 0, 1, -.6, .5); } hatsOn(w); } },
    { say: 'And the candles? Swiped right out.', label: 'SWISH', show: ['floor', 'wall', 'table', 'cake', 'smoke'], sky: '#F7D6E0', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [2, 4.4, 7], look: [.6, 3, 0], fov: 50, to: { pos: [2, 4.4, 6.5], look: [.6, 3, 0], fov: 48 } },
      update: (w, p, t) => { hideFrom(w, 1); w.cake.position.set(1.4, 2.35, .4); const c = w.cats[0]; ctAt(c, -1.2, 2.35, 0, -.3, .6); const sw = Math.min(1, Math.max(0, (p - .35) * 4)); c.paw.position.set(1 + sw * 1.6, .5 + Math.sin(sw * Math.PI) * .8, .9); const out = sw >= 1; w.candles.forEach((cd, i) => { cd.userData.flame.visible = !out; cd.rotation.z = out ? -.9 : 0; }); w.smoke.children.forEach(s => { const i = s.userData.i, q = (t * .8 + i / 6) % 1; s.position.set(.8 + (i % 3) * .6, 4 + q * 1.4, .4); s.scale.setScalar(.3 + q * .7); s.visible = out; }); hatsOn(w); } },
    { say: 'A cat birthday: cool, cute, or way too fishy? Comment below.',
      quiz: { q: 'A cat birthday party is…', options: ['Cool', 'Cute', 'Way too fishy'], answer: 'Made up. Fun fact: scientists counted 276 different cat facial expressions.' },
      show: ['floor'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [3, 2.5, 7], look: [0, 2, 0], fov: 54, to: { pos: [-2, 2.5, 7], look: [0, 2, 0] } },
      update: (w, p, t) => { hideFrom(w, 1); ctAt(w.cats[0], -.6, 0, 0, -.6, .8); w.cats[0].head.rotation.z = .08 * Math.sin(t * 2); hatsOn(w); } },
  ],
};
