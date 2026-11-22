// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: cactuses do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the cactus with a face.

function cactus(k, parent) {
  const { mat, box, ball, cyl, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  cyl(1.3, 1.1, 1.4, mat('#C2683A', { rough: .8 }), [0, .7, 0], c.body, 16);
  const g = mat('#3FA35B', { rough: .6 });
  c.trunk = cyl(.75, .75, 4, g, [0, 3.4, 0], c.body, 14); ball(.75, g, [0, 5.4, 0], c.body);
  c.arms = [-1, 1].map(s => { const a = group([s * .7, 3.2 + (s > 0 ? .4 : 0), 0], c.body); const h = cyl(.35, .35, 1, g, [s * .5, 0, 0], a, 10); h.rotation.z = Math.PI / 2; cyl(.35, .35, 1.3, g, [s * 1, .55, 0], a, 10); ball(.35, g, [s * 1, 1.2, 0], a); return a; });
  for (let i = 0; i < 26; i++) { const a = i * 2.4, y = 1.8 + (i % 13) * .28; const sp = cone(.04, .3, mat('#FFF4C2'), [Math.cos(a) * .78, y, Math.sin(a) * .78], c.body, 4); sp.rotation.z = -Math.cos(a) * Math.PI / 2; sp.rotation.x = Math.sin(a) * Math.PI / 2; sp.castShadow = false; }
  c.flower = group([0, 6.1, 0], c.body); for (let i = 0; i < 5; i++) { const p = ball(.22, mat('#FF5DA2'), [Math.cos(i * 1.256) * .25, 0, Math.sin(i * 1.256) * .25], c.flower); } ball(.14, mat('#FFD21F'), [0, .05, 0], c.flower); c.flower.visible = false;
  c.face = group([0, 4.2, .74], c.body);
  for (const x of [-.25, .25]) { ball(.18, mat('#FFFFFF'), [x, .2, 0], c.face); ball(.09, mat('#111111'), [x, .2, .13], c.face); }
  c.brows = [-.25, .25].map(x => box(.24, .05, .05, mat('#111111'), [x, .44, .04], c.face));
  c.mouth = box(.32, .08, .05, mat('#5A1E1E'), [0, -.18, .02], c.face);
  return c;
}
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(c, a) { c.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.sill = k.ground('#E9E2D3', 0);
  w.wall = box(60, 30, .5, mat('#BFD8C4'), [0, 15, -5]); w.wall.castShadow = false;
  w.window = group(); box(8, 7, .1, mat('#BFE3F7', { glow: .3 }), [0, 7, -4.7], w.window); box(8.4, .3, .3, mat('#FFFFFF'), [0, 10.5, -4.6], w.window); box(.3, 7, .3, mat('#FFFFFF'), [0, 7, -4.6], w.window);
  w.c = cactus(k, k.scene); w.ca = w.c.root;
  w.balloon = group(); const bl = ball(1, mat('#E2453C', { rough: .3 }), [0, 0, 0], w.balloon); bl.scale.y = 1.2; w.pop = group(); for (let i = 0; i < 8; i++) { const p = box(.3, .3, .05, mat('#E2453C'), [0, 0, 0], w.pop); p.userData.i = i; p.castShadow = false; }
  w.can = group(); cyl(.9, 1, 1.4, mat('#22C55E', { metal: .4, rough: .4 }), [0, 0, 0], w.can, 16); const sp = cyl(.12, .2, 2, mat('#22C55E', { metal: .4 }), [1.3, .4, 0], w.can, 8); sp.rotation.z = -1.1;
  w.drops = group(); for (let i = 0; i < 10; i++) { const d = ball(.12, mat('#3BA7E0', { glow: .3 }), [0, 0, 0], w.drops); d.userData.i = i; d.castShadow = false; }
  w.puddle = cyl(2.2, 2.2, .05, mat('#3BA7E0', { rough: .1 }), [0, .03, 0], k.scene, 24); w.puddle.castShadow = false;
  w.hearts = group(); for (let i = 0; i < 4; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.2, m, [-.12, 0, 0], h); ball(.2, m, [.12, 0, 0], h); const c = k.cone(.27, .38, m, [0, -.22, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  w.sand = k.ground('#E8C48A', .01);
  w.dunes = group(); for (let i = 0; i < 5; i++) { const d = ball(3 + i % 2, mat('#E0B676'), [-10 + i * 5, -1.5, -8 - (i % 2) * 3], w.dunes); d.scale.y = .5; }
  w.friends = group(); for (let i = 0; i < 2; i++) { const f = cactus(k, w.friends); f.root.position.set(i ? 3.6 : -3.6, 0, -1.5); f.root.scale.setScalar(.9 + i * .15); f.root.rotation.y = i ? -.4 : .4; f.face.visible = true; f.root.userData.f = f; }
  w.sun = ball(1.6, mat('#FFD21F', { glow: 1 }), [3.5, 11, -6]); w.sun.castShadow = false;
  return w;
}

const pot = (w, x, z, ry, t, on = true) => { w.ca.position.set(x, 0, z); w.ca.rotation.set(0, ry, 0); w.c.body.scale.set(1, 1, 1); w.c.arms.forEach(a => a.rotation.set(0, 0, 0)); w.c.flower.visible = false; talk(w.c, t, on); };

export default {
  id: '217',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CACTUS',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS CACTUS', 'HAS A COMPLAINT'],
  title: 'This cactus has a complaint',
  description: 'Nobody hugs him. Every balloon pops near him. And someone keeps watering him every day. So the cactus moved home, to the desert. (A made-up comedy sketch.)',
  tags: ['funny', 'cactus', 'plants', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: the saguaro cactus can grow to over 12 metres (40 feet) tall and live for more than 150 years (U.S. National Park Service, Saguaro National Park, "Saguaro Cactus").',
  ],
  setup,
  scenes: [
    {
      say: 'This cactus has a complaint.',
      show: ['sill', 'wall', 'window', 'ca'], sky: '#BFD8C4', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 4.6, 9], look: [0, 4.9, 0], fov: 46, to: { pos: [1.3, 4.6, 8.2], look: [0, 4.9, 0], fov: 44 } },
      update: (w, p, t) => { pot(w, 0, 0, 0, t); grump(w.c, .35); },
    },
    {
      say: 'Nobody ever hugs him.',
      show: ['sill', 'wall', 'window', 'ca'], sky: '#BFD8C4', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 4.6, 9], look: [0, 4.9, 0], fov: 46, to: { pos: [1.3, 4.6, 8.2], look: [0, 4.9, 0], fov: 44 } },
      update: (w, p, t) => { pot(w, 0, 0, 0, t); grump(w.c, -.35); const r = .5 + .3 * Math.sin(t * 2); w.c.arms[0].rotation.z = -r; w.c.arms[1].rotation.z = r; },
    },
    {
      say: 'Every balloon near him? Pop.',
      show: ['sill', 'wall', 'window', 'ca', 'balloon', 'pop'], sky: '#BFD8C4', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [2.4, 5, 10], look: [.8, 5, 0], fov: 48, to: { pos: [2.3, 5, 9.2], look: [.8, 5, 0], fov: 46 } },
      update: (w, p, t) => {
        pot(w, 0, 0, 0, t); const q = Math.min(1, t / .9), popped = q >= 1; w.balloon.visible = !popped; w.balloon.position.set(3.4 - q * 1.6, 5.6, 0); grump(w.c, popped ? -.35 : .2); if (popped) w.c.mouth.scale.y = 3;
        w.pop.children.forEach(pc => { const i = pc.userData.i, s = Math.max(0, t - .9) * 3; pc.visible = popped && s < 1.5; pc.position.set(1.8 + Math.cos(i * .8) * s * 1.2, 5.6 + Math.sin(i * .8) * s * 1.2, 0); pc.rotation.z = i + s * 4; });
      },
    },
    {
      say: 'And someone waters him. Every day.',
      show: ['sill', 'wall', 'window', 'ca', 'can', 'drops', 'puddle'], sky: '#BFD8C4', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [2.4, 5, 10.5], look: [.8, 4.6, 0], fov: 48, to: { pos: [2.3, 5, 9.7], look: [.8, 4.6, 0], fov: 46 } },
      update: (w, p, t) => {
        pot(w, 0, 0, 0, t); grump(w.c, .6); w.can.position.set(-3.4, 7.4, 0); w.can.rotation.z = -.5; w.puddle.scale.setScalar(.3 + p * .8);
        w.drops.children.forEach(d => { const i = d.userData.i, q = (t * 1.5 + i / 10) % 1; d.position.set(-1.6 + q * 1.3 + Math.sin(i) * .15, 7 - q * 1.6 - q * q * 1.4, Math.cos(i * 2) * .3); });
      },
    },
    {
      say: 'So he moved to the desert. With friends.',
      show: ['ca', 'sand', 'dunes', 'friends', 'sun', 'hearts'], sky: '#FFD58A', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [1.4, 4.6, 13], look: [0, 3.6, 0], fov: 58, to: { pos: [1.3, 4.6, 12.2], look: [0, 3.6, 0], fov: 56 } },
      update: (w, p, t) => {
        pot(w, 0, .6, 0, t, false); w.c.flower.visible = true; w.c.mouth.scale.y = 1.6; grump(w.c, -.35); w.friends.children.forEach((f, i) => { const ff = f.userData.f; ff.mouth.scale.y = 1.4; ff.brows.forEach((b, j) => b.rotation.z = (j ? 1 : -1) * .3); f.rotation.z = .04 * Math.sin(t * 2 + i); });
        w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .6 + i / 4) % 1; h.position.set(-1 + (i % 2) * 2, 6.6 + q * 2, 0); h.scale.setScalar(Math.sin(q * Math.PI) * 1.2); });
      },
    },
    {
      say: 'Grumpy cactus: water it, hug it, or leave it alone? Comment below.',
      quiz: { q: 'What do you do with the grumpy cactus?', options: ['Water it', 'Hug it', 'Leave it alone'], answer: 'Fun fact: a saguaro cactus can grow over 12 metres tall and live more than 150 years.' },
      show: ['sill', 'wall', 'window', 'ca'], sky: '#274B73', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [6, 4.8, 8], look: [0, 4, 0], fov: 46, to: { pos: [-6, 4.8, 8], look: [0, 4, 0] } },
      update: (w, p, t) => { pot(w, 0, 0, 0, t, false); grump(w.c, -.2); },
    },
  ],
};
