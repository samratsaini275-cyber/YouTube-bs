// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: no such teabag exists.
const SEA = [300, 0, 0];

function teabag(k, parent, pos) {
  const g = k.group(pos, parent);
  const bag = k.box(2.4, 3, .5, k.mat('#E8D9B0', { rough: .2, metal: .3 }), [0, 0, 0], g);   // shiny: it is "waterproof"
  k.box(2.5, .2, .55, k.mat('#C9B88C'), [0, 1.5, 0], g);
  const str = k.cyl(.03, .03, 6, k.mat('#F4F1EA'), [0, 4.5, 0], g, 6); str.castShadow = false;
  k.box(1.4, 1, .1, k.mat('#E2453C'), [0, 7.6, 0], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.table = k.ground('#C9A27A', 0);
  w.wall = box(80, 40, 1, mat('#F3EBDD'), [0, 20, -14], k.scene);
  // the mug
  w.mug = group([0, 0, 0]);
  const cup = k.mesh(new k.THREE.CylinderGeometry(4, 3.6, 8, 40, 1, true), mat('#FFFFFF', { rough: .3, double: true }), [0, 4, 0], w.mug);
  cyl(3.6, 3.6, .3, mat('#FFFFFF'), [0, .15, 0], w.mug, 40);
  const rim = k.torus(4, .18, mat('#FFFFFF'), [0, 8, 0], w.mug);
  const handle = k.torus(1.8, .45, mat('#FFFFFF'), [4.2, 4.4, 0], w.mug); handle.rotation.set(0, 0, Math.PI / 2);
  w.tea = cyl(3.75, 3.75, .2, mat('#8FD3F5', { rough: .05, metal: .2 }), [0, 7.4, 0], w.mug, 40);
  w.bag = teabag(k, k.scene, [0, 14, 0]);
  w.drops = group([0, 0, 0]);
  for (let i = 0; i < 10; i++) { const d = ball(.25, mat('#9FD8F2', { opacity: .9 }), [0, 0, 0], w.drops); d.castShadow = false; d.userData.a = i / 10 * Math.PI * 2; }
  w.steam = group([0, 8, 0]);
  for (let i = 0; i < 5; i++) { const s = ball(.45, mat('#FFFFFF', { opacity: .45 }), [(i - 2) * .9, 0, 0], w.steam); s.castShadow = false; s.userData.ph = i * .6; }
  // the sea test
  w.sea = group(SEA);
  k.mesh(new k.THREE.PlaneGeometry(400, 400), mat('#2E7FC2', { rough: .2 }), [0, 0, 0], w.sea).rotation.x = -Math.PI / 2;
  w.seaBag = teabag(k, w.sea, [0, 1.4, 0]);
  w.buoy = group([8, 0, -6], w.sea); cyl(1.2, 1.2, 3, mat('#E2453C'), [0, 1, 0], w.buoy, 16); cyl(1.2, 1.2, .8, mat('#FFFFFF'), [0, 1.4, 0], w.buoy, 16);
  return w;
}

function bagAt(w, y, wob = 0) { w.bag.position.y = y; w.bag.rotation.z = wob; }
function drops(w, t, on) { w.drops.visible = on; w.drops.children.forEach(d => { const r = 1.8 + (t * 3 % 1) * 3; d.position.set(Math.cos(d.userData.a) * r, 8 + (t * 3 % 1) * 2.5 - ((t * 3 % 1) ** 2) * 3, Math.sin(d.userData.a) * r * .4); }); }
function steam(w, t) { w.steam.children.forEach(s => { s.position.y = ((t * .8 + s.userData.ph) % 3) * 1.6; s.scale.setScalar(.6 + ((t * .8 + s.userData.ph) % 3) * .4); }); }
const ALL = ['table', 'wall', 'mug', 'bag'];

export default {
  id: '040',
  style: '3d',
  voice: 'v3',
  case: 'THE WATERPROOF TEABAG',
  year: 'ENGINEERING NONSENSE',
  hook: ['WATERPROOF', 'TEA BAG.'],
  title: 'Engineers made the world\'s most waterproof teabag',
  description: 'Not one drop gets in. That turned out to be the problem. (A made-up teabag. Please do not try to brew one.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'tea', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the waterproof teabag and its tests are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Engineers built the world\'s most waterproof teabag.',
      show: ALL, sky: '#F3EBDD', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [8, 12, 26], look: [0, 9, 0], fov: 44, to: { pos: [5, 11, 20], look: [0, 10, 0], fov: 42 } },
      update: (w, p, t) => { bagAt(w, 14 + .4 * Math.sin(t * 2), .05 * Math.sin(t * 1.6)); w.drops.visible = w.steam.visible = false; },
    },
    {
      say: 'Not a single drop gets in.',
      show: [...ALL, 'drops'], sky: '#E8F4FA', lightAt: [0, 7, 0], lightDist: 20,
      cam: { pos: [6, 11, 14], look: [0, 8, 0], fov: 40, to: { pos: [4, 10, 11], look: [0, 8, 0], fov: 38 } },
      update: (w, p, t) => { bagAt(w, 8.2 + .6 * Math.abs(Math.sin(t * 3)), 0); drops(w, t, true); w.steam.visible = false; },
    },
    {
      say: 'It passed boiling water. And a week at sea.',
      show: ['sea'], sky: '#9FD0F2', lightAt: [300, 1, 0], lightDist: 30,
      cam: { pos: [312, 8, 20], look: [300, 1.5, 0], fov: 44, to: { pos: [306, 5, 13], look: [300, 1.5, 0], fov: 42 } },
      update: (w, p, t) => { w.seaBag.position.y = 1.6 + .4 * Math.sin(t * 2); w.seaBag.rotation.z = .1 * Math.sin(t * 1.3); w.buoy.position.y = .3 * Math.sin(t * 2 + 1); },
    },
    {
      say: 'There is just one small problem.',
      show: ALL, sky: '#F3EBDD', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [0, 9, 20], look: [0, 7, 0], fov: 40, to: { pos: [0, 9, 16], look: [0, 7, 0], fov: 38 } },
      update: (w, p, t) => { bagAt(w, 8.6, 0); w.drops.visible = false; w.steam.visible = false; },
    },
    {
      say: 'The tea is just hot water.',
      show: [...ALL, 'steam'], sky: '#F3EBDD', lightAt: [0, 7, 0], lightDist: 20,
      cam: { pos: [3, 21, 16], look: [0, 7.5, 0], fov: 42, to: { pos: [2, 19, 13], look: [0, 7.5, 0], fov: 40 } },
      update: (w, p, t) => { bagAt(w, 8.6, 0); w.steam.visible = true; steam(w, t); },
    },
    {
      say: 'Quick question. What should the engineers fix? Option A, the teabag. Option B, the water. Or option C, sell it as hot water. Comment your answer.',
      quiz: { q: 'What should the engineers fix?', options: ['The teabag', 'The water', 'Sell it as hot water'], answer: 'It is a made-up teabag, so all three work. (C has a business plan.)' },
      show: [...ALL, 'steam'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [12, 4, 26], look: [0, 14, 0], fov: 46, to: { pos: [-12, 4, 26], look: [0, 14, 0] } },
      update: (w, p, t) => { bagAt(w, 8.6, 0); steam(w, t); },
    },
  ],
};
