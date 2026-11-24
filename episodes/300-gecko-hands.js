// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858).
// A made-up comedy sketch: people do not have gecko hands. Hook: the premise as a question under 2 s; first frame shows a person waving big green sticky gecko hands.

function person(k, parent, shirt, gecko = true) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.4, mat(shirt), [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => {
    const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8);
    if (gecko) { const g = mat('#6BCB3B'); const palm = ball(.38, g, [0, -1.75, 0], a); palm.scale.set(1, .5, 1); for (let i = 0; i < 4; i++) { const ang = -1.1 + i * .73; ball(.16, mat('#8EE05A'), [Math.sin(ang) * .48, -1.75 - Math.cos(ang) * .3, 0], a).scale.set(1, .6, 1); } }
    else ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a);
    a.userData.s = s; return a;
  });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 30, .5, mat('#E8F0E0'), [0, 15, -5], w.wall);
  w.brick = group(); box(14, 30, .5, mat('#B5533C'), [0, 15, -.6], w.brick); for (let r = 0; r < 24; r++) box(14, .06, .05, mat('#E8D8C0'), [0, r * 1.1 + .5, -.33], w.brick);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.f = person(k, k.scene, '#E2453C', false); w.fr = w.f.root;
  w.phone = group(); box(.5, .9, .08, mat('#222222'), [0, 0, 0], w.phone); box(.42, .78, .02, mat('#5AB0F0', { glow: .5 }), [0, 0, .05], w.phone);
  w.cat = group(); const o = mat('#F0A040'); const cb = ball(.7, o, [0, 0, 0], w.cat); cb.scale.set(1, .8, 1.4); const ch = group([0, .3, .95], w.cat); ball(.5, o, [0, 0, 0], ch); for (const x of [-1, 1]) { cone(.18, .35, o, [x * .28, .45, 0], ch); const e = ball(.09, mat('#FFFFFF'), [x * .18, .1, .42], ch); ball(.045, mat('#111111'), [x * .18, .1, .5], ch); } ball(.07, mat('#E86A8A'), [0, -.05, .5], ch); w.ctail = cyl(.08, .08, 1.2, o, [0, .3, -1.3], w.cat, 8); w.ctail.rotation.x = .8; w.clegs = []; for (const x of [-.35, .35]) for (const z of [-.5, .5]) { const l = cyl(.12, .12, .7, o, [x, -.6, z], w.cat, 8); w.clegs.push(l); }
  w.shakes = group(); for (let i = 0; i < 4; i++) { const s = box(.5, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.shakes); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const handPos = (w, i = 1) => { w.p.arms[i].updateWorldMatrix(true, false); return new w.k.THREE.Vector3(0, -1.75, .3).applyMatrix4(w.p.arms[i].matrixWorld); };

export default {
  id: '300',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GECKO HANDS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD GECKO HANDS?'],
  title: 'What would happen if humans had sticky gecko hands?',
  description: 'Climbing walls? Easy. High fives get stuck. You never drop your phone again. And the cat? Attached forever. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'gecko', 'hands', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human gecko hands are made up. Quiz fact: gecko toes cling using millions of tiny hairs called setae that grip surfaces through van der Waals forces (Autumn et al., Nature 2000, "Adhesive force of a single gecko foot-hair").'],
  setup,
  scenes: [
    { say: 'What if humans had gecko hands?', show: ['floor', 'wall', 'pp'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3, 11.5], look: [0, 4.8, 0], fov: 54, to: { pos: [0, 3, 10.8], look: [0, 4.8, 0], fov: 52 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * (2.4 + .2 * Math.sin(t * 6 + a.userData.s)))); w.p.eyes.forEach(e => e.scale.setScalar(1.3)); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Climbing walls? Easy.', show: ['floor', 'brick', 'pp'], sky: '#9ED2F3', lightAt: [3, 10, 8], lightDist: 22,
      cam: { pos: [0, 4, 13], look: [0, 6, 0], fov: 56, to: { pos: [0, 5, 12.4], look: [0, 7, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); w.pp.position.set(0, 1 + p * 6, 0); w.p.arms.forEach((a, i) => a.rotation.set(0, 0, a.userData.s * (2.6 + .4 * Math.sin(t * 6 + i * Math.PI)))); w.p.head.rotation.y = .3 * Math.sin(t * 2); } },
    { say: 'High fives? You get stuck.', label: 'STUCK', show: ['floor', 'wall', 'pp', 'fr'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.2, 13.5], look: [0, 3.2, 0], fov: 54, to: { pos: [0, 3.2, 12.8], look: [0, 3.2, 0], fov: 52 } },
      update: (w, p, t) => { const pull = Math.max(0, Math.sin(t * 5)) * .25; stand(w, -1.85 - pull, 0, .3); w.fr.position.set(1.85 + pull, 0, 0); w.fr.rotation.set(0, -.3, -.12 - pull * .2); w.pp.rotation.z = .12 + pull * .2; w.p.arms[1].rotation.set(0, 0, 2.2); w.p.arms[0].rotation.set(0, 0, -.3); w.f.arms[0].rotation.set(0, 0, -2.2); w.f.arms[1].rotation.set(0, 0, .3); w.p.mouth.scale.set(1, 2, 1); w.f.mouth.scale.set(1, 2, 1); } },
    { say: 'Drop your phone? Never.', show: ['floor', 'wall', 'pp', 'phone', 'shakes'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.4, 3.2, 9], look: [1.7, 3.2, 0], fov: 50, to: { pos: [2.3, 3.2, 8.4], look: [1.7, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); w.p.arms[0].rotation.set(0, 0, -.3); w.p.arms[1].rotation.set(0, 0, 1.5 + .5 * Math.sin(t * 14)); const h = handPos(w); w.phone.position.copy(h).add(new w.k.THREE.Vector3(.35, -.2, 0)); w.phone.rotation.set(0, 0, w.p.arms[1].rotation.z - 1.5); w.p.mouth.scale.set(1.3, 1, 1); w.shakes.children.forEach(s => { const i = s.userData.i; s.position.set(h.x + .9, h.y + (i - 1.5) * .35, h.z); s.visible = Math.sin(t * 14 + i) > 0; }); } },
    { say: 'And the cat? Stuck on. Forever.', label: 'MEOW', show: ['floor', 'wall', 'pp', 'cat'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.6, 3, 10.5], look: [.8, 3.4, 0], fov: 52, to: { pos: [1.4, 3, 9.9], look: [.8, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -.4, 0, 0); w.p.arms[0].rotation.set(0, 0, -.3); w.p.arms[1].rotation.set(0, 0, 2.2 + .25 * Math.sin(t * 9)); const h = handPos(w); w.cat.position.set(h.x + .3, h.y - .85, h.z); w.cat.rotation.set(0, -.6, .15 * Math.sin(t * 9)); w.clegs.forEach((l, i) => l.rotation.x = .5 * Math.sin(t * 16 + i)); w.ctail.rotation.z = .6 * Math.sin(t * 6); w.p.mouth.scale.set(1, 2, 1); } },
    { say: 'Gecko hands: useful, awesome, or way too sticky? Comment below.',
      quiz: { q: 'Would you want gecko hands?', options: ['Useful', 'Awesome', 'Way too sticky'], answer: 'Made up for people. Real geckos cling with millions of tiny toe hairs.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); w.p.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * (2.3 + .15 * Math.sin(t * 4)))); } },
  ],
};
