// Narrative 7: "Animals at Work". A made-up comedy sketch: a goat hired as a gardener eats the garden.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the goat in a straw hat beside a flower bed.

function goat(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#F4F1E8', { rough: .9 });
  const g = { root: group([0, 0, 0], parent) };
  g.body = group([0, 0, 0], g.root);
  g.belly = ball(1.2, fur, [0, 2.4, 0], g.body); g.belly.scale.set(1.6, 1, 1);
  g.legs = [];
  for (const x of [-1.2, 1.2]) for (const z of [-.6, .6]) { const l = group([x, 1.8, z], g.body); cyl(.18, .15, 1.8, fur, [0, -.9, 0], l, 8); box(.3, .2, .3, mat('#3A2A1E'), [0, -1.8, 0], l); g.legs.push(l); }
  g.head = group([2, 3.3, 0], g.body);
  const hd = ball(.6, fur, [0, 0, 0], g.head); hd.scale.set(1.3, .9, .85);
  ball(.3, mat('#E8D2B0'), [.7, -.15, 0], g.head).scale.set(1, .8, 1);
  for (const z of [-.3, .3]) { ball(.1, mat('#111111'), [.45, .18, z * 1.2], g.head); const h = cone(.1, .7, mat('#9A8A70'), [-.1, .7, z], g.head, 6); h.rotation.z = .5; const e = box(.45, .12, .2, fur, [-.2, .2, z * 2.2], g.head); e.rotation.x = z * 1.6; }
  cone(.12, .45, mat('#E8E2D6'), [.65, -.6, 0], g.head, 6).rotation.x = Math.PI;
  g.jaw = box(.4, .08, .3, mat('#3A2A1E'), [.9, -.3, 0], g.head);
  g.hat = group([0, .55, 0], g.head);
  cyl(.95, .95, .06, mat('#E8C46A', { rough: 1 }), [0, 0, 0], g.hat, 20);
  k.mesh(new k.THREE.SphereGeometry(.45, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat('#E8C46A', { rough: 1 }), [0, .02, 0], g.hat);
  cyl(.47, .47, .12, mat('#E2453C'), [0, .08, 0], g.hat, 16);
  cyl(.06, .03, .7, fur, [-2.2, 2.9, 0], g.body, 6).rotation.z = .9;
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.yard = group();
  box(60, 4, .4, mat('#F4F1E8'), [0, 2, -12], w.yard);
  for (let i = 0; i < 30; i++) box(.3, 4.6, .5, mat('#F4F1E8'), [-29 + i * 2, 2.3, -11.9], w.yard);
  const house = group([-14, 0, -20], w.yard); box(12, 9, 8, mat('#E8B4A0'), [0, 4.5, 0], house); const rf = cone(9, 4, mat('#8B3A2E'), [0, 11, 0], house, 4); rf.rotation.y = Math.PI / 4;
  box(10, .3, 3, mat('#6B4B2E'), [5, .15, -2], w.yard).castShadow = false;
  w.flowers = [];
  w.bed = group([5, 0, -2]);
  for (let i = 0; i < 8; i++) { const f = group([-4.2 + i * 1.2, 0, (i % 2) * .8 - .4], w.bed); cyl(.06, .06, 1.6, mat('#2E8B4A'), [0, .8, 0], f, 6); ball(.35, mat(['#FF4D6D', '#FFD21F', '#8B5CF6', '#FF8A1F'][i % 4]), [0, 1.7, 0], f); ball(.15, mat('#FFE45C'), [0, 1.7, .25], f); w.flowers.push(f); }
  w.hedge = group([-6, 0, -6]);
  w.hedgeBits = [];
  for (let i = 0; i < 6; i++) { const h = ball(1.6, mat('#2E8B4A', { rough: .9 }), [-3 + i * 1.4, 1.6, 0], w.hedge); h.scale.set(1, 1.2, .9); w.hedgeBits.push(h); }
  w.g = goat(k, k.scene); w.gt = w.g.root;
  w.bits = group();
  for (let i = 0; i < 8; i++) { const b = ball(.12, mat(['#FF4D6D', '#2E8B4A'][i % 2]), [0, 0, 0], w.bits); b.userData.i = i; b.castShadow = false; }
  w.owner = group([0, 0, 0]);
  cyl(.8, .9, 3.2, mat('#2F6FD6'), [0, 1.6, 0], w.owner, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.owner);
  w.oeyes = [-.3, .3].map(x => ball(.13, mat('#111111'), [x, 4.05, .78], w.owner));
  w.ohat = group([0, 4.6, 0], w.owner);
  cyl(1.1, 1.1, .08, mat('#5A3A1E'), [0, 0, 0], w.ohat, 20); cyl(.6, .65, .7, mat('#5A3A1E'), [0, .35, 0], w.ohat, 16);
  return w;
}

function chew(g, t, sp = 14) { g.jaw.position.y = -.3 - .06 * Math.abs(Math.sin(t * sp)); g.head.rotation.z = -.15 + .05 * Math.sin(t * sp); }

export default {
  id: '107',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GOAT GARDENER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS GOAT', 'BECAME A GARDENER.'],
  title: 'This goat became a gardener',
  description: 'He plants the flowers. He eats the flowers. He trims the hedge, all of it. (A made-up goat and a made-up garden.)',
  tags: ['animalsatwork', 'funny', 'goat', 'gardening', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the goat gardener and his clients are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This goat became a gardener.',
      show: ['ground', 'yard', 'bed', 'gt'], sky: '#9ED2F3', lightAt: [2, 4, 0], lightDist: 16,
      cam: { pos: [3, 2.5, 15], look: [1.2, 6.6, 1], fov: 48, to: { pos: [2.8, 2.5, 14], look: [1.2, 6.5, 1], fov: 46 } },
      update: (w, p, t) => { w.flowers.forEach(f => { f.visible = true; }); w.gt.position.set(0, 0, 1.5); w.gt.rotation.y = .2; w.g.head.rotation.set(0, .2 * Math.sin(t * 2), 0); w.g.jaw.position.y = -.3; },
    },
    {
      say: 'Step one: plant the flowers. Step two: eat the flowers.',
      show: ['ground', 'yard', 'bed', 'gt', 'bits'], sky: '#9ED2F3', lightAt: [4, 4, -1], lightDist: 16,
      cam: { pos: [6, 5, 12], look: [4, 2.6, -1], fov: 50, to: { pos: [6.5, 5, 11], look: [5, 2.6, -1], fov: 48 } },
      update: (w, p, t) => {
        const x = Math.min(8, t * 2.2); w.gt.position.set(-1 + x, 0, .3); w.gt.rotation.y = 0; chew(w.g, t); w.g.head.rotation.y = 0;
        w.flowers.forEach((f, i) => { f.visible = 5 - 4.2 + i * 1.2 > x + 1.6; });
        w.bits.children.forEach(b => { const f = (t * 2 + b.userData.i / 8) % 1; b.position.set(w.gt.position.x + 2.9 + Math.cos(b.userData.i) * f, 3 - f * 2.5, .3 + Math.sin(b.userData.i) * f); });
      },
    },
    {
      say: 'Then he trims the hedge. All of it.',
      show: ['ground', 'yard', 'hedge', 'gt'], sky: '#9ED2F3', lightAt: [-5, 4, -5], lightDist: 18,
      cam: { pos: [1, 4.5, 10], look: [-5.5, 3, -5], fov: 52, to: { pos: [4, 4.5, 9.5], look: [-2.5, 3, -5], fov: 52 } },
      update: (w, p, t) => {
        w.hedgeBits.forEach((h, i) => { const gone = t > .6 + i * .3; h.visible = !gone; });
        w.gt.position.set(-9.5 + Math.min(7, t * 3.2), 0, -4); w.gt.rotation.y = 0; chew(w.g, t, 18);
        w.g.belly.scale.set(1.6 + Math.min(.8, t * .35), 1 + Math.min(.6, t * .25), 1 + Math.min(.6, t * .25));
      },
    },
    {
      say: 'And for dessert? The client\'s hat.',
      show: ['ground', 'yard', 'gt', 'owner'], sky: '#FFD9A8', lightAt: [1, 4, 0], lightDist: 14,
      cam: { pos: [1, 4.5, 19], look: [.7, 3.2, 0], fov: 48, to: { pos: [.9, 4.5, 18], look: [.7, 3.2, 0], fov: 46 } },
      update: (w, p, t) => {
        w.g.belly.scale.set(2.1, 1.3, 1.3); w.gt.position.set(-1.8, 0, 0); w.gt.rotation.y = 0; chew(w.g, t, 12);
        w.owner.position.set(3.2, 0, 0); w.owner.rotation.y = -Math.PI / 2; w.oeyes.forEach(e => e.scale.setScalar(t > 1.2 ? 1.6 : 1));
        const grab = Math.min(1, Math.max(0, (t - .6) * 2)); w.ohat.position.set(-grab * 2.4, 4.6 - grab * 1.1, 0); w.ohat.scale.setScalar(Math.max(.001, 1 - Math.max(0, t - 1.4) * .8));
      },
    },
    {
      say: 'Hire the goat: yes, no, or only for weeds? Comment below.',
      quiz: { q: 'Would you hire the goat gardener?', options: ['Yes', 'No', 'Only for weeds'], answer: 'He is a made-up gardener. Weeds only, and hide your hat.' },
      show: ['ground', 'yard', 'bed', 'gt'], sky: '#274B73', lightAt: [2, 4, 0], lightDist: 16,
      cam: { pos: [5, 2, 13], look: [2, 7.4, 0], fov: 48, to: { pos: [-2, 2, 13], look: [2, 7.4, 0] } },
      update: (w, p, t) => { w.g.belly.scale.set(1.6, 1, 1); w.flowers.forEach(f => { f.visible = true; }); w.gt.position.set(0, 0, 1.5); w.gt.rotation.y = .2; w.g.head.rotation.set(0, .2 * Math.sin(t * 2), 0); w.g.jaw.position.y = -.3; },
    },
  ],
};
