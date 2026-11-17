// Narrative 5: "What Would Happen If…". A made-up comedy sketch: dinosaurs are not pets (they are extinct).
// Hook rule: the premise as a question under 2 s, first frame already showing a T. rex on a leash at the park.

function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.park = group();
  box(120, .05, 4, mat('#D9C9A3'), [0, .04, 6], w.park).castShadow = false;
  for (let i = 0; i < 6; i++) { cyl(.6, .8, 4, mat('#6B4B2E'), [-30 + i * 12, 2, -12], w.park, 8); ball(3, mat('#2E8B4A'), [-30 + i * 12, 6, -12], w.park); }
  w.r = rex(k, k.scene); w.dino = w.r.root;
  // the owner on a leash
  w.owner = group([0, 0, 0]);
  w.obody = group([0, 0, 0], w.owner);
  cyl(.8, .9, 3.2, mat('#2F6FD6'), [0, 1.6, 0], w.obody, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.obody);
  w.oeyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 4.05, .78], w.obody));
  w.leash = cyl(.06, .06, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.leash.geometry.translate(0, .5, 0);
  // fetch: the tree
  w.bigtree = group([0, 0, 0]);
  cyl(.7, .9, 7, mat('#6B4B2E'), [0, 0, 0], w.bigtree, 10).rotation.z = Math.PI / 2;
  for (const [x, z] of [[4, 0], [5, 1.5], [5, -1.5]]) ball(2.4, mat('#2E8B4A'), [x, 0, z], w.bigtree);
  // treats
  w.bag = group([0, 0, 0]);
  box(1.6, 2.2, .8, mat('#FF8A1F'), [0, 0, 0], w.bag); box(1, .8, .82, mat('#FFFFFF'), [0, .2, 0], w.bag);
  // living room + vacuum
  w.room = group([0, 0, 80]);
  box(60, 22, .5, mat('#F2D9B8'), [0, 11, -10], w.room);
  box(14, 4, 5, mat('#8B5CF6'), [-4, 2, -6], w.room); box(14, 6, 1.4, mat('#8B5CF6'), [-4, 5, -8.2], w.room);
  w.vac = group([10, 0, 84]);
  box(2.2, 1.4, 1.4, mat('#E2453C'), [0, .8, 0], w.vac); cyl(.12, .12, 4, mat('#9AA3AE', { metal: .7 }), [-.8, 3, 0], w.vac, 8).rotation.z = .4;
  box(1.8, .3, .8, mat('#2A2A2A'), [-1.5, .15, 0], w.vac);
  return w;
}

function leash(w) {
  const a = new w.owner.position.constructor(), b = new w.owner.position.constructor();
  w.r.collar.getWorldPosition(a); w.owner.localToWorld(b.set(.8, 2.6, 0));
  const d = a.clone().sub(b); w.leash.position.copy(b); w.leash.scale.set(1, d.length(), 1);
  w.leash.quaternion.setFromUnitVectors(new a.constructor(0, 1, 0), d.normalize());
}
const PARK = ['ground', 'park', 'dino'];

export default {
  id: '081',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PET DINOSAUR',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'WERE PETS?'],
  title: 'What would happen if dinosaurs were pets?',
  description: 'Walks are intense. Fetch is a lot. And the vacuum is still the scariest thing in the house. (A made-up pet T. rex.)',
  tags: ['whatif', 'funny', 'dinosaur', 'trex', 'pets', 'shorts'],
  sources: [
    'Comedy sketch: the pet T. rex is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinosaurs were pets?',
      show: [...PARK, 'owner', 'leash'], sky: '#9ED2F3', lightAt: [0, 6, 2], lightDist: 30,
      cam: { pos: [6, 4, 36], look: [1, 14, 0], fov: 50, to: { pos: [5, 4, 32], look: [1, 14, 0], fov: 48 } },
      update: (w, p, t) => { w.dino.position.set(-2 + t * 1.5, 0, 0); w.dino.rotation.y = 0; stomp(w.r, t); w.owner.position.set(-1 + t * 1.5, 0, 6); w.owner.rotation.y = Math.PI / 2; w.obody.rotation.z = 0; leash(w); },
    },
    {
      say: 'Walkies? It walks you.',
      show: [...PARK, 'owner', 'leash'], sky: '#A7D8F5', lightAt: [0, 6, 2], lightDist: 30,
      cam: { pos: [-2, 7, 46], look: [-1, 9, 0], fov: 54, to: { pos: [-1, 7, 43], look: [0, 9, 0], fov: 52 } },
      update: (w, p, t) => { const x = -6 + t * 6; w.dino.position.set(x, 0, 0); w.dino.rotation.y = 0; stomp(w.r, t, 9); w.owner.position.set(x - 5, 1.5 + .8 * Math.abs(Math.sin(t * 9)), 4); w.owner.rotation.y = Math.PI / 2; w.obody.rotation.z = -1.2; w.oeyes.forEach(e => e.scale.setScalar(1.6)); leash(w); },
    },
    {
      say: 'Fetch? It brings back a tree.',
      show: [...PARK, 'owner', 'bigtree'], sky: '#9ED2F3', lightAt: [0, 6, 2], lightDist: 30,
      cam: { pos: [-4, 6, 34], look: [0, 9, 0], fov: 52, to: { pos: [-3, 6, 30], look: [0, 9, 0], fov: 50 } },
      update: (w, p, t) => {
        w.dino.position.set(6 - t * 2, 0, 0); w.dino.rotation.y = Math.PI; stomp(w.r, t, 5);
        const hp = new w.dino.position.constructor(); w.r.head.getWorldPosition(hp); w.bigtree.position.set(hp.x - 3, hp.y - 1, hp.z); w.r.jaw.rotation.z = -.35;
        w.owner.position.set(-6, 0, 5); w.owner.rotation.y = Math.PI / 2; w.obody.rotation.z = 0; w.oeyes.forEach(e => e.scale.setScalar(1.6));
      },
    },
    {
      say: 'Treats? Those tiny arms cannot open the bag.',
      show: [...PARK, 'bag'], sky: '#A7D8F5', lightAt: [3, 8, 0], lightDist: 16,
      cam: { pos: [15, 9, 15], look: [3, 7.5, 0], fov: 48, to: { pos: [14, 9, 13.5], look: [3, 7.5, 0], fov: 46 } },
      update: (w, p, t) => {
        w.dino.position.set(0, 0, 0); w.dino.rotation.y = 0; stomp(w.r, t, 4, true);
        w.r.arms.forEach((a, i) => { a.rotation.z = .3 * Math.sin(t * 14 + i * Math.PI); });
        w.bag.position.set(4.2, 6.2, 0); w.bag.rotation.z = .2 * Math.sin(t * 7); w.r.neck.rotation.z = -.3;
      },
    },
    {
      say: 'And it is still scared of the vacuum.',
      show: ['ground', 'room', 'dino', 'vac'], sky: '#F2D9B8', lightAt: [0, 6, 80], lightDist: 25,
      cam: { pos: [14, 9, 108], look: [0, 7, 80], fov: 52, to: { pos: [13, 9, 105], look: [0, 7, 80], fov: 50 } },
      shake: (t) => .1,
      update: (w, p, t) => {
        w.dino.position.set(-6, -1.5, 76); w.dino.rotation.y = .5; stomp(w.r, t, 4, true); w.r.body.rotation.z = .08 * Math.sin(t * 30); w.r.neck.rotation.z = .5;
        w.vac.position.set(8 - Math.min(t, 1.5) * 2, 0, 84); w.vac.rotation.y = .2 * Math.sin(t * 6);
      },
    },
    {
      say: 'Pet dinosaur: yes, no, or only a small one? Comment below.',
      quiz: { q: 'Would you want a pet dinosaur?', options: ['Yes', 'No', 'Only a small one'], answer: 'It is a made-up pet. Dinosaurs are long extinct, so a cat it is.' },
      show: PARK, sky: '#274B73', lightAt: [0, 6, 2], lightDist: 30,
      cam: { pos: [16, 3, 32], look: [0, 16, 0], fov: 46, to: { pos: [-14, 3, 32], look: [0, 16, 0] } },
      update: (w, p, t) => { w.dino.position.set(0, 0, 0); w.dino.rotation.y = .2; stomp(w.r, t, 4, true); w.r.body.rotation.z = 0; w.r.neck.rotation.z = 0; },
    },
  ],
};
