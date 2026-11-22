// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Animals + flying (080 everyone could fly 1.1K) + a famous saying.
// Hook: the premise as a question under 2 s; first frame shows a pink pig with little white wings flapping over a farm.

function pig(k, parent) {
  const { mat, cyl, ball, cone, group } = k;
  const pk = mat('#F4A6B8', { rough: .6 });
  const p = { root: group([0, 0, 0], parent) };
  const b = ball(1, pk, [0, 1.3, 0], p.root); b.scale.set(1.4, 1, 1);
  p.head = group([1.3, 1.6, 0], p.root); ball(.7, pk, [0, 0, 0], p.head);
  const sn = cyl(.32, .32, .3, mat('#E88BA2'), [.65, -.1, 0], p.head, 16); sn.rotation.z = Math.PI / 2;
  for (const z of [-.1, .1]) ball(.06, mat('#8A3A50'), [.81, -.1, z], p.head);
  for (const z of [-.28, .28]) { ball(.12, mat('#FFFFFF'), [.45, .25, z], p.head); ball(.06, mat('#111111'), [.55, .25, z], p.head); }
  for (const z of [-.35, .35]) { const e = cone(.2, .35, pk, [0, .65, z], p.head, 4); e.rotation.x = z > 0 ? .4 : -.4; }
  p.legs = []; for (const x of [-.7, .7]) for (const z of [-.45, .45]) p.legs.push(cyl(.16, .16, .7, pk, [x, .35, z], p.root, 8));
  p.wings = [-1, 1].map(s => { const g = group([0, 2.1, s * .55], p.root); const wm = mat('#FFFFFF', { rough: .6 }); for (let i = 0; i < 3; i++) { const f = ball(.35, wm, [0, .05, s * (.3 + i * .3)], g); f.scale.set(.9, .18, 1.1 - i * .15); } return g; });
  return p;
}
const flap = (p, t, sp = 14) => p.wings.forEach((g, i) => g.rotation.x = (i ? 1 : -1) * (.2 + .6 * Math.sin(t * sp)));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#8DBA5A', 0);
  w.barn = group(); box(8, 6, 7, mat('#B3262E'), [0, 3, 0], w.barn); const r = cone(6.2, 3, mat('#5A2A1A'), [0, 7.5, 0], w.barn, 4); r.rotation.y = Math.PI / 4; box(2.5, 3.5, .1, mat('#FFFFFF'), [0, 1.75, 3.55], w.barn);
  w.fence = group(); for (let i = 0; i < 12; i++) box(.2, 1.4, .2, mat('#C79A5B'), [-12 + i * 2.2, .7, 6], w.fence); box(26, .15, .1, mat('#C79A5B'), [0, 1.1, 6], w.fence);
  w.p = pig(k, k.scene); w.pg = w.p.root;
  w.mud = cyl(3, 3, .08, mat('#6B4423', { rough: .3 }), [0, .05, 0], k.scene, 28); w.mud.scale.z = .6;
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.2, mat('#6B4423'), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.basket = group(); cyl(.6, .45, .6, mat('#C79A5B'), [0, 0, 0], w.basket, 12); for (let i = 0; i < 3; i++) ball(.18, mat('#F4EBD8'), [-.2 + i * .2, .3, 0], w.basket);
  w.hay = group(); for (let i = 0; i < 5; i++) { const h = cyl(1, 1, 1.4, mat('#E3C565', { rough: 1 }), [-2 + i * 1.1, .7, (i % 2) * .6], w.hay, 14); h.rotation.x = Math.PI / 2; }
  w.straw = group(); for (let i = 0; i < 12; i++) { const s = box(.5, .05, .08, mat('#E3C565'), [0, 0, 0], w.straw); s.userData.i = i; s.castShadow = false; }
  return w;
}

const fly = (w, x, y, z, ry, t, sp = 14) => { w.pg.position.set(x, y, z); w.pg.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); w.p.legs.forEach((l, i) => l.rotation.z = .2 * Math.sin(t * 8 + i)); flap(w.p, t, sp); };

export default {
  id: '193',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'FLYING PIGS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF PIGS', 'COULD FLY?'],
  title: 'What would happen if pigs could fly?',
  description: 'That old saying finally comes true. Mud baths become dive-bombs. Eggs get air delivery. And landing? Nobody taught them that. (A comedy what-if.)',
  tags: ['whatif', 'pigs', 'funny', 'animals', 'flying', 'shorts'],
  sources: [
    'Quiz fact: "when pigs fly" is an English saying for something that will never happen (common idiom).',
  ],
  setup,
  scenes: [
    {
      say: 'What if pigs could fly?',
      show: ['ground', 'barn', 'fence', 'pg'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 18,
      cam: { pos: [2, 5.5, 11], look: [0, 7.2, 0], fov: 46, to: { pos: [1.8, 5.5, 10.2], look: [0, 7.2, 0], fov: 44 } },
      update: (w, p, t) => { w.barn.position.set(-4, 0, -9); fly(w, 0, 5 + .3 * Math.sin(t * 3), 0, -1.0, t); },
    },
    {
      say: 'That old saying? Finally true.',
      show: ['ground', 'barn', 'fence', 'pg'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 20,
      cam: { pos: [6, 6, 15], look: [0, 6.5, 0], fov: 50, to: { pos: [5.5, 6, 14], look: [1, 6.5, 0], fov: 48 } },
      update: (w, p, t) => { w.barn.position.set(-4, 0, -9); fly(w, -3 + t * 2, 6 + .4 * Math.sin(t * 3), 0, 0, t, 16); w.pg.rotation.z = .1 * Math.sin(t * 2); },
    },
    {
      say: 'Mud baths? Straight from the sky.',
      show: ['ground', 'barn', 'fence', 'pg', 'mud', 'splash'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [4, 4, 14], look: [0, 3.6, 0], fov: 50, to: { pos: [3.6, 4, 13], look: [0, 3.2, 0], fov: 48 } },
      shake: (t) => (t > 1 && t < 1.3) ? .12 : 0,
      update: (w, p, t) => {
        w.barn.position.set(-6, 0, -10); w.mud.position.set(0, .05, 0); const q = Math.min(1, t);
        fly(w, -4 + q * 4, Math.max(0, 8 - q * 8), 0, 0, t); w.pg.rotation.z = -.9 * q; if (t > 1) { w.pg.rotation.z = 0; w.pg.position.y = -.3; flap(w.p, t, 3); }
        w.splash.visible = t > 1; w.splash.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2, r = Math.min(1, (t - 1) * 1.6); s.position.set(Math.cos(a) * r * 3, Math.sin(r * Math.PI) * 2.2, Math.sin(a) * r * 1.8); });
      },
    },
    {
      say: 'Farm chores? Eggs by air.',
      show: ['ground', 'barn', 'fence', 'pg', 'basket'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 18,
      cam: { pos: [3, 5, 13], look: [0, 6, 0], fov: 48, to: { pos: [2.6, 5, 12], look: [.5, 6, 0], fov: 46 } },
      update: (w, p, t) => { w.barn.position.set(-4, 0, -9); fly(w, -2 + t * 1.4, 6, 0, -.3, t, 16); w.basket.position.set(w.pg.position.x + .3, 4.6, .2); w.basket.rotation.z = .1 * Math.sin(t * 4); },
    },
    {
      say: 'But landing? Nobody taught them that.',
      show: ['ground', 'barn', 'fence', 'pg', 'hay', 'straw'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [3, 3.6, 13], look: [0, 3, 0], fov: 50, to: { pos: [2.8, 3.6, 12], look: [0, 3, 0], fov: 48 } },
      shake: (t) => (t > .8 && t < 1.1) ? .1 : 0,
      update: (w, p, t) => {
        w.barn.position.set(-6, 0, -10); w.hay.position.set(.5, 0, -.5); const q = Math.min(1, t / .8);
        fly(w, -6 + q * 6, 6 - q * 4.3, 0, 0, t, t > .8 ? 0 : 18); w.pg.rotation.z = t > .8 ? -1.6 : -.4;
        w.straw.visible = t > .8; w.straw.children.forEach(s => { const i = s.userData.i, a = i / 12 * Math.PI * 2, r = Math.min(1, (t - .8) * 1.5); s.position.set(Math.cos(a) * r * 2.4, 2 + Math.sin(r * Math.PI) * 1.6, Math.sin(a) * r * 1.2); s.rotation.set(i, t * 4, i * 2); });
      },
    },
    {
      say: 'Flying pigs: amazing, weird, or finally? Comment below.',
      quiz: { q: 'Should pigs be able to fly?', options: ['Amazing', 'Weird', 'Finally!'], answer: 'The saying "when pigs fly" means something will never happen. Until now.' },
      show: ['ground', 'barn', 'fence', 'pg'], sky: '#274B73', lightAt: [0, 5, 0], lightDist: 18,
      cam: { pos: [4, 5.5, 9], look: [0, 6.8, 0], fov: 44, to: { pos: [-4, 5.5, 9], look: [0, 6.8, 0] } },
      update: (w, p, t) => { w.barn.position.set(-4, 0, -9); fly(w, 0, 5 + .2 * Math.sin(t * 3), 0, -1.2, t, 10); },
    },
  ],
};
