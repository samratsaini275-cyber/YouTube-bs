// Narrative 17: "What Would Happen If… (season 7)". Body-upgrade premise (147 trunks 858).
// A made-up comedy sketch: people do not have shark teeth. Hook: the premise as a question under 2 s; first frame shows a person grinning with rows of pointy teeth.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box, cone } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.grin = group([0, -.28, .66], p.head); box(.6, .22, .05, mat('#5A1E1E'), [0, 0, 0], p.grin); p.teeth = group([0, 0, .03], p.grin); for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const tt = cone(.045, .12, mat('#FFFFFF'), [-.25 + i * .1, r ? -.05 : .05, .01], p.teeth, 4); tt.rotation.z = r ? 0 : Math.PI; }
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#E3EEF2'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.apple = group(); w.applePieces = []; for (let i = 0; i < 4; i++) { const ap = ball(.35, mat('#E2453C'), [0, 0, 0], w.apple); ap.scale.setScalar(1 - i * .2); w.applePieces.push(ap); }
  w.corn = group(); cyl(.25, .25, 1.4, mat('#FFD23F'), [0, 0, 0], w.corn, 12).rotation.z = Math.PI / 2;
  w.dentist = group(); const dm = mat('#FFFFFF'); cyl(.8, .85, 2.6, dm, [0, 1.3, 0], w.dentist, 14); ball(.75, mat('#C69C78'), [0, 3.3, 0], w.dentist); for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, 3.55, .66], w.dentist); ball(.07, mat('#111111'), [x, 3.55, .78], w.dentist); } box(1, .4, .05, mat('#9FD3EE'), [0, 3.1, .72], w.dentist);
  w.toothPile = group(); for (let i = 0; i < 30; i++) { const tt = cone(.08, .2, mat('#FFFFFF'), [0, 0, 0], w.toothPile, 4); tt.userData.i = i; tt.rotation.set(i, i * 2, 0); }
  w.fish = group(); w.fl = []; for (let i = 0; i < 4; i++) { const f = group([0, 0, 0], w.fish); const fb = ball(.4, mat('#FF9F1C'), [0, 0, 0], f); fb.scale.set(1.5, .8, .5); const tl = cone(.3, .4, mat('#FF9F1C'), [-.7, 0, 0], f, 4); tl.rotation.z = Math.PI / 2; ball(.06, mat('#111111'), [.4, .1, .18], f); w.fl.push(f); }
  w.water = box(30, .1, 20, mat('#4AA3DF', { opacity: .4 }), [0, 6, 0], k.scene);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const chomp = (p, t) => { p.grin.scale.y = 1 + .8 * Math.abs(Math.sin(t * 10)); };

export default {
  id: '297',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SHARK TEETH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD SHARK TEETH?'],
  title: 'What would happen if humans had shark teeth?',
  description: 'An apple disappears in two bites. Corn on the cob takes one second. The dentist needs a bigger tray. And the fish? They swim away fast. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'shark', 'teeth', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human shark teeth are made up. Quiz fact: many sharks replace lost teeth throughout their lives and can go through thousands of teeth (Florida Museum of Natural History).'],
  setup,
  scenes: [
    { say: 'What if humans had shark teeth?', show: ['floor', 'wall', 'pp'], sky: '#E3EEF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.2, 5.6], look: [0, 3.15, 0], fov: 46, to: { pos: [0, 3.2, 5.1], look: [0, 3.15, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); w.p.grin.scale.set(1 + Math.min(1, t) * .3, 1 + Math.min(1, t) * .6, 1); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'An apple? Gone in two bites.', show: ['floor', 'wall', 'pp', 'apple'], sky: '#E3EEF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 3.4, 6.6], look: [.3, 3.2, 0], fov: 46, to: { pos: [1.3, 3.4, 6], look: [.3, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, .2); w.p.arms[1].rotation.set(-1.4, 0, .1); w.p.arms[0].rotation.set(0, 0, -.2); chomp(w.p, t); const bites = Math.floor(p * 3); w.apple.position.set(.4, 3, 1.3); w.applePieces.forEach((a, i) => a.visible = i === Math.min(bites, 3) && bites < 3); } },
    { say: 'Corn on the cob? One second.', label: '*CHOMP*', show: ['floor', 'wall', 'pp', 'corn'], sky: '#E3EEF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 3.4, 6.6], look: [.2, 3.2, 0], fov: 46, to: { pos: [1.3, 3.4, 6], look: [.2, 3.2, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, .2); w.p.arms.forEach(a => a.rotation.set(-1.4, 0, a.userData.s * -.2)); chomp(w.p, t * 2); const x = .8 - p * 1.6; w.corn.position.set(x, 3, 1.05); w.corn.children[0].scale.y = Math.max(.05, 1 - Math.max(0, p - .2) * 1.2); } },
    { say: 'The dentist? Needs a bigger tray.', show: ['floor', 'wall', 'pp', 'dentist', 'toothPile'], sky: '#E3EEF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 10], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3.6, 9.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, -1.5, 0, .6); pose(w.p, .2); w.p.grin.scale.set(1.2, 1.8, 1); w.dentist.position.set(1.6, 0, 0); w.dentist.rotation.y = -.6; w.toothPile.children.forEach(tt => { const i = tt.userData.i, h = Math.min(i, Math.floor(p * 40)); tt.visible = i < p * 40; tt.position.set(.1 + Math.sin(i) * .5, .1 + Math.floor(i / 8) * .12, 1 + Math.cos(i * 1.7) * .4); }); } },
    { say: 'And fish? They swim away. Fast.', show: ['floor', 'pp', 'fish', 'water'], sky: '#3A7FB8', lightAt: [0, 9, 5], lightDist: 20,
      cam: { pos: [0, 3.6, 10], look: [0, 3.4, 0], fov: 52, to: { pos: [0, 3.6, 9.4], look: [0, 3.4, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .6 + .3 * Math.sin(t * 3)); w.p.grin.scale.set(1.3, 1.5, 1); w.p.eyes.forEach(e => e.scale.set(1, .6, 1)); w.fl.forEach((f, i) => { const a = t * .8 + i * Math.PI / 2; const r = 1.6 + p * 4; const b = i * Math.PI / 2 + .4; f.position.set(Math.cos(b) * r, 3.8 + .3 * Math.sin(t * 2 + i), Math.sin(b) * r * .6); f.rotation.y = -b; }); } },
    { say: 'Shark teeth: useful, awesome, or way too bitey? Comment below.',
      quiz: { q: 'Would you want shark teeth?', options: ['Useful', 'Awesome', 'Way too bitey'], answer: 'Made up for people. Real sharks regrow teeth all their lives.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); chomp(w.p, t * .5); } },
  ],
};
