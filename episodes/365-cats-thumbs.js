// Narrative 21: "What Would Happen If… (season 11: cats and giant animals)". Cat premise: the two most-viewed shorts are cat shorts (749 and 424).
// Hook: the premise as a question under 2 s; first frame shows a cat holding up a paw with a thumb, next to the fridge.

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

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));





function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#E9DCC4', 0);
  w.wall = group(); box(40, 16, .3, mat('#F6E7C8'), [0, 8, -4], w.wall);
  w.c = cat(k, k.scene); w.cr = w.c.root;
  w.thumb = ball(.18, mat('#F2A04A'), [.2, .35, .35], w.c.paw);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.fridge = group(); box(2.4, 5, 2, mat('#EEF2F5'), [0, 2.5, 0], w.fridge); w.fDoor = group([1.2, 0, 1.02], w.fridge); box(2.4, 5, .12, mat('#DDE3E8'), [-1.2, 2.5, 0], w.fDoor); box(.12, 1, .15, mat('#999999'), [-2.2, 2.8, .1], w.fDoor); w.fLight = box(2.2, 4.6, .05, mat('#FFF6C8', { glow: .9 }), [0, 2.5, .95], w.fridge);
  w.fish = group(); const fb = ball(.35, mat('#9FB8C8'), [0, 0, 0], w.fish); fb.scale.set(1.8, .7, .5); const ft = cone(.3, .4, mat('#9FB8C8'), [-.75, 0, 0], w.fish, 3); ft.rotation.z = Math.PI / 2;
  w.table = group(); box(3.4, .2, 2, mat('#A06A3E'), [0, 2.4, 0], w.table); for (const x of [-1.5, 1.5]) for (const z of [-.8, .8]) cyl(.08, .08, 2.4, mat('#7A4E2E'), [x, 1.2, z], w.table, 6);
  w.cup = group(); cyl(.25, .2, .5, mat('#E2453C'), [0, .25, 0], w.cup, 12);
  w.tv = group(); box(3.6, 2.2, .2, mat('#222222'), [0, 2.6, 0], w.tv); w.screen = box(3.3, 1.9, .05, mat('#6FB7E8', { glow: .7 }), [0, 2.6, .12], w.tv); box(.3, 1.4, .3, mat('#333333'), [0, .7, 0], w.tv);
  w.remote = group(); box(.25, .7, .1, mat('#333333'), [0, 0, 0], w.remote); ball(.06, mat('#E2453C', { glow: .6 }), [0, .2, .06], w.remote);
  w.sofa = group(); box(4, 1, 1.6, mat('#7C5CC4'), [0, .7, 0], w.sofa); box(4, 1.4, .4, mat('#6A4AB2'), [0, 1.6, -.6], w.sofa);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const ctAt = (w, x, y, z, ry, s) => { w.cr.position.set(x, y, z); w.cr.rotation.set(0, ry, 0); w.cr.scale.setScalar(s); w.c.head.rotation.set(0, 0, 0); w.c.paw.position.set(.8, .5, .9); w.c.paw.rotation.set(0, 0, 0); w.c.eyes.forEach(e => e.scale.y = e.scale.y < .5 ? 1 : e.scale.y); };

export default {
  id: '365',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CATS WITH THUMBS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'HAD THUMBS?'],
  title: 'What would happen if cats had thumbs?',
  description: 'They open the fridge every night. They do not knock your cup off the table any more: they throw it. And the TV remote? Theirs now. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'cat', 'cats', 'animals', 'shorts'],
  sources: ['Comedy sketch: cats with thumbs are made up. Quiz fact: some real cats are born with extra toes (polydactyly); the trait is common among the cats at the Hemingway house in Key West (Lettice et al., Human Molecular Genetics, 2008).'],
  setup,
  scenes: [
    { say: 'What if cats had thumbs?', show: ['floor', 'wall', 'cr', 'thumb', 'fridge'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 2.5, 13], look: [0, 2.9, 0], fov: 52, to: { pos: [3, 2.5, 12.5], look: [0, 2.9, 0], fov: 50 } },
      update: (w, p, t) => { ctAt(w, -.6, 0, 0, -.5, 1); w.c.paw.position.set(1.7, 1.5, 1.3); w.c.paw.rotation.z = 1.4 + .15 * Math.sin(t * 5); w.c.head.rotation.z = .08 * Math.sin(t * 2); w.fridge.position.set(3.6, 0, -2); w.fDoor.rotation.y = 0; w.fLight.visible = false; } },
    { say: 'They open the fridge. Every night.', label: 'CREAK…', show: ['floor', 'wall', 'cr', 'thumb', 'fridge', 'fish'], sky: '#2A3150', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 3, 10], look: [1, 2.6, 0], fov: 52, to: { pos: [3, 3, 9.5], look: [1, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.fridge.position.set(1.6, 0, -2); const op = Math.min(1, Math.max(0, (p - .2) * 3)); w.fDoor.rotation.y = op * 1.6; w.fLight.visible = op > .2; ctAt(w, -.6, 0, .6, -.2, .9); w.c.paw.position.set(1.6, 1.8 + op * .3, .9); w.c.paw.rotation.z = 1; w.fish.position.set(.4 + op * .5, 1.5, 1.1); w.fish.visible = op > .6; w.fish.rotation.z = .3 * Math.sin(t * 6); } },
    { say: 'Your cup? They do not knock it off. They throw it.', label: 'YEET', show: ['floor', 'wall', 'cr', 'thumb', 'table', 'cup', 'pp'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 4, 12], look: [1, 3, 0], fov: 54, to: { pos: [3, 4, 11.5], look: [1, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.fLight.visible = false; w.table.position.set(-1, 0, 0); ctAt(w, -1.6, 2.5, 0, -.3, .7); const th = Math.max(0, p - .45) * 3; w.c.paw.position.set(.8 + Math.min(1, th) * .5, .5 + Math.min(1, th) * 1.4, .9); w.cup.position.set(th > 0 ? -.4 + th * 4 : -.4, th > 0 ? 2.5 + Math.sin(Math.min(1, th / 2) * Math.PI) * 3 : 2.5, .4); w.cup.rotation.z = -th * 4; w.cup.visible = w.cup.position.x < 7; stand(w, 3.4, 1.4, -.6); pose(w.p, th > .8 ? 2.4 : .4); w.p.mouth.scale.set(1.2, th > .8 ? 3 : 1, 1); } },
    { say: 'And the TV remote? Theirs now.', label: 'CLICK', show: ['floor', 'wall', 'cr', 'thumb', 'tv', 'remote', 'sofa', 'pp'], sky: '#F6E7C8', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [3, 4.6, 9.5], look: [0, 2.2, -.5], fov: 54, to: { pos: [3, 4.6, 9], look: [0, 2.2, -.5], fov: 52 } },
      update: (w, p, t) => { w.tv.position.set(0, 0, -3); w.sofa.position.set(0, 0, 3); w.sofa.rotation.y = Math.PI; ctAt(w, .8, 1.2, 3, Math.PI / 2, .6); w.c.paw.position.set(1.2, 4.4, .9); w.remote.scale.setScalar(2.2); w.c.paw.rotation.z = 1; w.cr.updateWorldMatrix(true, true); const pw = w.c.paw.getWorldPosition(new w.k.THREE.Vector3()); w.remote.position.set(pw.x, pw.y + .3, pw.z); const ch = Math.floor(t * 2.5) % 4; w.screen.material.color.set(['#6FB7E8', '#F2C94C', '#7BC96F', '#FF5FA2'][ch]); stand(w, -2.6, 2.4, .8); w.pp.scale.setScalar(.8); pose(w.p, 1.6); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Cats with thumbs: cool, cute, or way too dangerous? Comment below.',
      quiz: { q: 'Cats with thumbs are…', options: ['Cool', 'Cute', 'Way too dangerous'], answer: 'Made up. But some real cats are born with extra toes.' },
      show: ['floor', 'cr', 'thumb'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [5, 2.5, 6], look: [0, 2.2, 0], fov: 54, to: { pos: [6, 2.5, 2], look: [0, 2.2, 0] } },
      update: (w, p, t) => { w.screen.material.color.set('#6FB7E8'); ctAt(w, 0, 0, 0, -.5, .9); w.c.paw.position.set(1.7, 1.5, 1.3); w.c.paw.rotation.z = 1.4 + .15 * Math.sin(t * 5); } },
  ],
};
