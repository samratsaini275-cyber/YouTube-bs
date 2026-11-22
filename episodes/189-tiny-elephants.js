// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Animal + size swap, like 167 giant cats / 169 tiny dinosaurs.
// Hook: the premise as a question under 2 s; first frame shows a palm-sized grey elephant on a kitchen table next to a mug, trunk raised.

function elephant(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const g = mat('#9AA0A8', { rough: .7 });
  const e = { root: group([0, 0, 0], parent) };
  const b = ball(1, g, [0, 1.5, 0], e.root); b.scale.set(1.35, 1, 1);
  e.head = group([1.2, 2, 0], e.root); ball(.75, g, [0, 0, 0], e.head);
  for (const z of [-.3, .3]) { ball(.12, mat('#FFFFFF'), [.55, .2, z], e.head); ball(.06, mat('#111111'), [.65, .2, z], e.head); }
  e.ears = [-1, 1].map(s => { const ear = ball(.7, mat('#B8A0A8', { rough: .7 }), [-.1, .1, s * .7], e.head); ear.scale.set(.8, 1, .15); return ear; });
  e.trunk = []; let prev = e.head;
  for (let i = 0; i < 5; i++) { const t = group(i ? [0, -.32, 0] : [.65, -.2, 0], prev); cyl(.17 - i * .02, .19 - i * .02, .36, g, [0, -.16, 0], t, 10); e.trunk.push(t); prev = t; }
  e.legs = []; for (const x of [-.7, .7]) for (const z of [-.45, .45]) e.legs.push(cyl(.28, .28, 1, g, [x, .5, z], e.root, 10));
  const tail = cyl(.04, .04, .6, g, [-1.4, 1.5, 0], e.root, 6); tail.rotation.z = .6;
  return e;
}
const trunk = (e, t, up = .4) => e.trunk.forEach((s, i) => s.rotation.z = up * (1 + .3 * Math.sin(t * 3 + i)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#C9A27A', 0);
  w.wall = box(60, 30, .5, mat('#EAF2E3'), [0, 15, -8]); w.wall.castShadow = false;
  w.table = group(); box(14, .4, 8, mat('#8B5A2B'), [0, 3, 0], w.table); for (const x of [-6, 6]) for (const z of [-3, 3]) cyl(.25, .25, 3, mat('#6B4423'), [x, 1.5, z], w.table, 8);
  w.e = elephant(k, k.scene); w.el = w.e.root; w.el.scale.setScalar(.35);
  w.mug = group(); cyl(.7, .6, 1.5, mat('#E2453C'), [0, 3.95, 0], w.mug, 24);
  w.nut = group(); const n1 = ball(.35, mat('#D9A95B'), [-.22, 0, 0], w.nut); n1.scale.set(1, .8, .8); const n2 = ball(.35, mat('#D9A95B'), [.22, 0, 0], w.nut); n2.scale.set(1, .8, .8);
  w.spoon = group(); const bowl = ball(.45, mat('#C9CED6', { rough: .2 }), [0, 0, 0], w.spoon); bowl.scale.set(1.3, .35, 1); cyl(.06, .06, 2.4, mat('#C9CED6', { rough: .2 }), [1.6, .1, 0], w.spoon, 8).rotation.z = Math.PI / 2;
  const wat = ball(.4, mat('#9FD3EE', { glow: .3 }), [0, .06, 0], w.spoon); wat.scale.set(1.2, .2, .9);
  w.drops = group(); for (let i = 0; i < 6; i++) { const d = ball(.05, mat('#9FD3EE', { glow: .6 }), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  w.notes = group(); for (let i = 0; i < 3; i++) { const n = k.torus(.06 + i * .05, .012, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.notes); n.rotation.set(0, Math.PI / 2, 0); n.userData.i = i; n.castShadow = false; }
  w.ants = group(); for (let i = 0; i < 4; i++) { const a = group([0, 0, 0], w.ants); ball(.06, mat('#141414'), [0, .06, 0], a); ball(.05, mat('#141414'), [.09, .07, 0], a); a.userData.i = i; }
  return w;
}

const pose = (w, x, z, ry, t, walk = false) => { w.el.position.set(x, 3.2, z); w.el.rotation.set(0, ry, 0); w.e.legs.forEach((l, i) => l.rotation.z = walk ? .3 * Math.sin(t * 9 + (i % 2) * Math.PI) : 0); w.e.ears.forEach((e, i) => e.rotation.y = (i ? -1 : 1) * .2 * Math.sin(t * 4)); w.e.head.rotation.set(0, 0, 0); };

export default {
  id: '189',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'TINY ELEPHANTS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF ELEPHANTS', 'WERE TINY?'],
  title: 'What would happen if elephants were tiny?',
  description: 'One peanut is a full meal. A spoon is a swimming pool. The mighty trumpet is a squeak. And the ants are finally scared. (A comedy what-if. Real elephants are the largest land animals.)',
  tags: ['whatif', 'elephants', 'funny', 'animals', 'tiny', 'shorts'],
  sources: [
    'Quiz fact: the African bush elephant is the largest living land animal (general zoology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if elephants were tiny?',
      show: ['floor', 'wall', 'table', 'el', 'mug', 'notes'], sky: '#EAF2E3', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.2, 4.3, 4.8], look: [0, 4.05, 0], fov: 42, to: { pos: [1.1, 4.3, 4.4], look: [0, 4.05, 0], fov: 40 } },
      update: (w, p, t) => { w.mug.position.set(-1.6, 0, -.8); pose(w, 0, 0, -1.0, t); trunk(w.e, t, .9); w.notes.visible = false; },
    },
    {
      say: 'Dinner? One peanut. Too big.',
      show: ['floor', 'wall', 'table', 'el', 'nut'], sky: '#EAF2E3', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [.8, 4.2, 4.4], look: [0, 4.2, 0], fov: 42, to: { pos: [.7, 4.2, 4], look: [0, 4.2, 0], fov: 40 } },
      update: (w, p, t) => { pose(w, -.6 + t * .12, 0, -.3, t, true); trunk(w.e, t, .15); w.nut.position.set(w.el.position.x + .9, 3.5, .2); w.nut.rotation.z = -t * 1.5; },
    },
    {
      say: 'A swimming pool? Just a spoon.',
      show: ['floor', 'wall', 'table', 'el', 'spoon', 'drops'], sky: '#EAF2E3', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [.8, 4.8, 3.6], look: [0, 3.9, 0], fov: 42, to: { pos: [.7, 4.8, 3.2], look: [0, 3.9, 0], fov: 40 } },
      update: (w, p, t) => {
        w.spoon.position.set(0, 3.32, 0); pose(w, 0, 0, -.6, t); w.el.position.y = 3.28; w.el.scale.setScalar(.22); trunk(w.e, t, 1.3);
        w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 1.3 + i / 6) % 1; d.position.set(.15 + Math.cos(i) * q * .4, 3.6 + Math.sin(q * Math.PI) * .5, Math.sin(i) * q * .3); });
      },
    },
    {
      say: 'Its mighty trumpet? Basically a squeak.',
      show: ['floor', 'wall', 'table', 'el', 'mug', 'notes'], sky: '#EAF2E3', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1, 4.1, 3.8], look: [0, 4.15, 0], fov: 40, to: { pos: [.9, 4.1, 3.4], look: [0, 4.15, 0], fov: 38 } },
      update: (w, p, t) => {
        w.el.scale.setScalar(.35); w.mug.position.set(-1.6, 0, -.8); pose(w, 0, 0, -.8, t); trunk(w.e, t, -.9); w.notes.visible = t > .4;
        w.el.updateMatrixWorld(true); const v = new w.el.position.constructor(); w.e.trunk[4].getWorldPosition(v); w.notes.children.forEach(n => { const i = n.userData.i, q = (t * 1.4 + i / 3) % 1; n.position.set(v.x + .1 + q * .4, v.y + q * .3, v.z + q * .2); n.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'But the ants? Finally terrified.',
      show: ['floor', 'wall', 'table', 'el', 'ants'], sky: '#EAF2E3', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [.6, 4.2, 5], look: [.3, 3.7, 0], fov: 40, to: { pos: [.55, 4.2, 4.6], look: [.3, 3.7, 0], fov: 38 } },
      shake: (t) => .015,
      update: (w, p, t) => {
        w.notes.visible = false; pose(w, -.8 + t * .3, 0, 0, t, true); trunk(w.e, t, .5);
        w.ants.children.forEach(a => { const i = a.userData.i; a.position.set(.2 + t * .6 + i * .15, 3.2, -.2 + i * .14); a.rotation.y = 0; });
      },
    },
    {
      say: 'A tiny elephant: cute, adorable, or the best pet ever? Comment below.',
      quiz: { q: 'Would you want a tiny elephant?', options: ['Cute', 'Adorable', 'Best pet ever'], answer: 'Real elephants are the biggest land animals on Earth. Not pocket-sized.' },
      show: ['floor', 'wall', 'table', 'el', 'mug'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [2.2, 4.2, 3.6], look: [0, 4.2, 0], fov: 42, to: { pos: [-2.2, 4.2, 3.6], look: [0, 4.2, 0] } },
      update: (w, p, t) => { pose(w, 0, 0, -1.0, t); trunk(w.e, t, .8); },
    },
  ],
};
