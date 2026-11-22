// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: rubber ducks do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the duck with a face.

function duck(k, parent, col = '#FFD21F', s = 1) {
  const { mat, box, ball, cone, group } = k;
  const d = { root: group([0, 0, 0], parent) };
  d.root.scale.setScalar(s);
  d.body = group([0, 0, 0], d.root);
  const b = ball(1.3, mat(col, { rough: .3 }), [0, 1.1, 0], d.body); b.scale.set(1.25, .85, 1);
  const tail = cone(.4, .8, mat(col, { rough: .3 }), [-1.5, 1.6, 0], d.body, 8); tail.rotation.z = .9;
  d.head = group([.9, 2.5, 0], d.body); ball(.8, mat(col, { rough: .3 }), [0, 0, 0], d.head);
  d.beak = group([.75, -.1, 0], d.head); const up = box(.6, .18, .6, mat('#F97316'), [.2, .06, 0], d.beak); d.lower = box(.55, .14, .55, mat('#F97316'), [.18, -.1, 0], d.beak);
  for (const z of [-.38, .38]) { ball(.2, mat('#FFFFFF'), [.55, .3, z], d.head); ball(.1, mat('#111111'), [.68, .3, z], d.head); }
  d.brows = [-.38, .38].map(z => box(.05, .05, .3, mat('#111111'), [.62, .55, z], d.head));
  return d;
}
function talk(d, t, on = true) { d.lower.position.y = on ? -.1 - .18 * Math.abs(Math.sin(t * 14)) : -.1; }
function grump(d, a) { d.brows.forEach((b, i) => b.rotation.x = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#DCEAF2', 0);
  w.tiles = group(); for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) { const t = box(1.9, 1.9, .05, mat((i + j) % 2 ? '#FFFFFF' : '#CFE7F2'), [-9 + i * 2, 1 + j * 2, -6], w.tiles); t.castShadow = false; }
  w.tub = group(); box(12, 3, .4, mat('#FFFFFF'), [0, 1.5, 3], w.tub); box(12, 3, .4, mat('#FFFFFF'), [0, 1.5, -3], w.tub); for (const x of [-6, 6]) box(.4, 3, 6.4, mat('#FFFFFF'), [x, 1.5, 0], w.tub);
  w.water = box(11.6, .2, 5.6, mat('#7FC8E8', { rough: .1 }), [0, 2.2, 0], w.tub); w.water.material.transparent = true; w.water.material.opacity = .8;
  w.d = duck(k, k.scene); w.dk = w.d.root;
  w.hand = group(); ball(1.2, mat('#F2C9A0'), [0, 0, 0], w.hand).scale.set(1, .6, 1.2); for (let i = 0; i < 4; i++) { const f = ball(.35, mat('#F2C9A0'), [-.6 + i * .4, .4, .9], w.hand); f.scale.set(1, 1, 1.6); }
  w.squeak = group(); for (let i = 0; i < 3; i++) { const s = box(.8, .12, .12, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.squeak); s.userData.i = i; s.castShadow = false; }
  w.bubbles = group(); for (let i = 0; i < 12; i++) { const b = ball(.3, mat('#FFFFFF', { glow: .2 }), [0, 0, 0], w.bubbles); b.material.transparent = true; b.material.opacity = .8; b.userData.i = i; b.castShadow = false; }
  w.drain = cyl(.6, .6, .05, mat('#888888', { metal: .8 }), [4.5, 2.32, 0], k.scene, 16);
  w.swirl = group(); for (let i = 0; i < 10; i++) { const s = ball(.12, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.swirl); s.userData.i = i; s.castShadow = false; }
  w.grass = k.ground('#7FB069', .01);
  w.pond = cyl(8, 8, .1, mat('#3BA7E0', { rough: .1 }), [0, .06, 0], k.scene, 32); w.pond.castShadow = false;
  w.real = group(); for (let i = 0; i < 2; i++) { const r = duck(k, w.real, '#8A6A4A', .9); r.root.position.set(-3.2 + i * 6.4, -.2, -1.5 + i * .5); r.root.rotation.y = i ? Math.PI + .3 : -.3; const hd = r.head.children[0]; hd.material = k.mat('#2E8B4A', { rough: .3 }); }
  return w;
}

const bob = (w, x, y, z, ry, t, on = true) => { w.dk.position.set(x, y, z); w.dk.rotation.set(0, ry, 0); w.d.body.scale.set(1, 1, 1); w.d.body.rotation.set(0, 0, 0); talk(w.d, t, on); };

export default {
  id: '216',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE RUBBER DUCK',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS RUBBER DUCK', 'HAS A COMPLAINT'],
  title: 'This rubber duck has a complaint',
  description: 'Squeezed every bath time. Bubbles up his nose. And then, the drain. So the rubber duck found some real ducks. (A made-up comedy sketch.)',
  tags: ['funny', 'rubberduck', 'bath', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: in January 1992 a shipping container of bath toys, including yellow ducks, fell into the Pacific Ocean; some were found on shores thousands of miles away over the following years (Smithsonian Magazine, "The Great Rubber Ducky Spill").',
  ],
  setup,
  scenes: [
    {
      say: 'This rubber duck has a complaint.',
      show: ['floor', 'tiles', 'tub', 'dk'], sky: '#CFE7F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [5, 5, 8.5], look: [.4, 5.4, 0], fov: 46, to: { pos: [4.6, 5, 7.8], look: [.4, 5.4, 0], fov: 44 } },
      update: (w, p, t) => { bob(w, 0, 2, 0, -.5, t); w.dk.position.y = 2 + .08 * Math.sin(t * 3); grump(w.d, .35); },
    },
    {
      say: 'Every bath time, he gets squeezed.',
      show: ['floor', 'tiles', 'tub', 'dk', 'hand', 'squeak'], sky: '#CFE7F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [5, 5, 9], look: [.4, 4.6, 0], fov: 48, to: { pos: [4.6, 5, 8.3], look: [.4, 4.6, 0], fov: 46 } },
      update: (w, p, t) => {
        bob(w, 0, 2, 0, -.5, t); const q = (t * 1.4) % 1, sq = Math.sin(q * Math.PI); w.d.body.scale.set(1 + .15 * sq, 1 - .3 * sq, 1 + .15 * sq); w.hand.position.set(-.2, 4.9 - sq * .9, .2); grump(w.d, .6); w.d.lower.position.y = -.1 - .25 * sq;
        w.squeak.children.forEach(s => { const i = s.userData.i; s.visible = sq > .6; s.position.set(2.4 + i * .3, 4 + (i - 1) * .6, .5); s.rotation.z = (i - 1) * .5; });
      },
    },
    {
      say: 'Bubbles up his nose. Every time.',
      show: ['floor', 'tiles', 'tub', 'dk', 'bubbles'], sky: '#CFE7F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [5, 4.6, 8], look: [.4, 4.6, 0], fov: 46, to: { pos: [4.6, 4.6, 7.3], look: [.4, 4.6, 0], fov: 44 } },
      update: (w, p, t) => { bob(w, 0, 2, 0, -.5, t); grump(w.d, -.3); w.d.lower.position.y = -.3; w.bubbles.children.forEach(b => { const i = b.userData.i, q = (t * .7 + i / 12) % 1; b.position.set(-2.5 + (i % 6) * 1.1, 2.4 + q * 3, -1 + (i % 3) * .9); b.scale.setScalar(.5 + q); }); },
    },
    {
      say: 'And then? The drain.',
      show: ['floor', 'tiles', 'tub', 'dk', 'drain', 'swirl'], sky: '#CFE7F2', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [5, 12, 12], look: [4.5, 2.2, 0], fov: 46, to: { pos: [5, 11.5, 11], look: [4.5, 2.2, 0], fov: 44 } },
      update: (w, p, t) => {
        const a = t * 3, r = Math.max(.4, 2.6 - p * 2.2); bob(w, 4.5 + Math.cos(a) * r, 1.95, Math.sin(a) * r, -a - Math.PI / 2, t); grump(w.d, -.35); w.d.lower.position.y = -.32; w.water.position.y = 2.2 - p * .3;
        w.swirl.children.forEach(s => { const i = s.userData.i, b = a * 1.5 + i * .63, rr = .5 + (i % 5) * .35; s.position.set(4.5 + Math.cos(b) * rr, 2.34, Math.sin(b) * rr); });
      },
    },
    {
      say: 'So he moved to the pond. With real ducks.',
      show: ['grass', 'pond', 'dk', 'real'], sky: '#9ED2F3', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [2, 4.2, 12], look: [0, 2.2, 0], fov: 46, to: { pos: [1.9, 4.2, 11.2], look: [0, 2.2, 0], fov: 44 } },
      update: (w, p, t) => { bob(w, 0, -.15, 1, -1.3, t, false); w.dk.position.y = -.15 + .06 * Math.sin(t * 3); grump(w.d, -.3); w.real.children.forEach((r, i) => r.position.y = -.2 + .06 * Math.sin(t * 3 + i)); },
    },
    {
      say: 'Grumpy duck: squeeze it, keep it, or set it free? Comment below.',
      quiz: { q: 'What do you do with the grumpy rubber duck?', options: ['Squeeze it', 'Keep it', 'Set it free'], answer: 'Fun fact: in 1992 a box of bath ducks fell off a ship, and some washed up on beaches years later.' },
      show: ['floor', 'tiles', 'tub', 'dk'], sky: '#274B73', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [7, 5, 7], look: [0, 3.6, 0], fov: 46, to: { pos: [-7, 5, 7], look: [0, 3.6, 0] } },
      update: (w, p, t) => { bob(w, 0, 2, 0, -.5, t, false); w.water.position.y = 2.2; grump(w.d, -.2); },
    },
  ],
};
