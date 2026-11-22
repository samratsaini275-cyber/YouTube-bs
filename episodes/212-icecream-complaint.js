// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: ice creams do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the ice cream with a face.

function penguin(k, parent) {
  const { mat, box, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  const b = ball(1, mat('#1C1C24', { rough: .5 }), [0, 1.3, 0], p.body); b.scale.set(.85, 1.25, .8);
  const bl = ball(.8, mat('#FFFFFF'), [0, 1.15, .32], p.body); bl.scale.set(.75, 1.1, .6);
  p.head = group([0, 2.55, 0], p.body); ball(.62, mat('#1C1C24', { rough: .5 }), [0, 0, 0], p.head);
  for (const x of [-.24, .24]) { ball(.15, mat('#FFFFFF'), [x, .1, .5], p.head); ball(.08, mat('#111111'), [x, .1, .62], p.head); }
  const bk = cone(.16, .45, mat('#FF9F1C'), [0, -.12, .7], p.head, 10); bk.rotation.x = Math.PI / 2;
  p.flips = [-1, 1].map(s => { const g = group([s * .8, 1.9, 0], p.body); const f = box(.18, 1.3, .55, mat('#1C1C24'), [s * .1, -.6, 0], g); return g; });
  for (const x of [-.35, .35]) box(.4, .12, .6, mat('#FF9F1C'), [x, .06, .2], p.body);
  p.glasses = group([0, .12, .63], p.head); for (const x of [-.24, .24]) box(.32, .2, .05, mat('#111111', { rough: .2 }), [x, 0, 0], p.glasses); box(.2, .05, .05, mat('#111111'), [0, .04, 0], p.glasses);
  return p;
}

function icecream(k, parent) {
  const { mat, box, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const cn = cone(1.1, 3.4, mat('#D9A35B', { rough: .8 }), [0, 1.7, 0], c.body, 16); cn.rotation.x = Math.PI;
  c.scoop = group([0, 3.9, 0], c.body); ball(1.3, mat('#FF9EC4', { rough: .5 }), [0, 0, 0], c.scoop);
  c.drips = group([0, 0, 0], c.scoop); for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const d = ball(.28, mat('#FF9EC4', { rough: .5 }), [Math.cos(a) * 1.15, -.8, Math.sin(a) * 1.15], c.drips); d.scale.set(1, 1.6, 1); d.userData.i = i; }
  c.cherry = ball(.3, mat('#E2453C', { rough: .3 }), [0, 1.35, 0], c.scoop);
  c.face = group([0, 0, 1.22], c.scoop);
  for (const x of [-.4, .4]) { ball(.24, mat('#FFFFFF'), [x, .2, 0], c.face); ball(.12, mat('#111111'), [x, .2, .16], c.face); }
  c.brows = [-.4, .4].map(x => box(.34, .06, .05, mat('#111111'), [x, .55, .02], c.face));
  c.mouth = box(.45, .1, .05, mat('#5A1E1E'), [0, -.35, 0], c.face);
  return c;
}
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(c, a) { c.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.ground = k.ground('#F2D7A6', 0);
  w.snow = k.ground('#F4FAFF', .01); 
  w.c = icecream(k, k.scene); w.ic = w.c.root;
  w.sun = ball(1.6, mat('#FFD21F', { glow: 1 }), [3.5, 11, -6]); w.sun.castShadow = false;
  w.rays = group(); for (let i = 0; i < 8; i++) { const r = box(.2, 1.2, .2, mat('#FFD21F', { glow: 1 }), [0, 0, 0], w.rays); const a = i / 8 * Math.PI * 2; r.position.set(3.5 + Math.cos(a) * 2.5, 11 + Math.sin(a) * 2.5, -6); r.rotation.z = a - Math.PI / 2; r.castShadow = false; }
  w.puddle = cyl(1.6, 1.6, .05, mat('#FF9EC4', { rough: .2 }), [0, .03, 0], k.scene, 24); w.puddle.castShadow = false;
  w.tongue = group(); const tg = ball(1, mat('#F07A8F'), [0, 0, 0], w.tongue); tg.scale.set(.7, .25, 1.2);
  w.ice = group(); for (let i = 0; i < 4; i++) { const b = box(3 + i, 1.5 + (i % 2), 2.5, mat('#DDF1FF', { rough: .2 }), [-6 + i * 4, .8, -5 - (i % 2) * 2], w.ice); }
  w.p = penguin(k, k.scene); w.pg = w.p.root; w.p.glasses.visible = false;
  w.flakes = group(); for (let i = 0; i < 14; i++) { const f = ball(.1, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  return w;
}

const hold = (w, x, y, z, rz, t, on = true) => { w.ic.position.set(x, y, z); w.ic.rotation.set(0, 0, rz); w.c.scoop.scale.set(1, 1, 1); w.c.drips.children.forEach(d => d.position.y = -.8); talk(w.c, t, on); };

export default {
  id: '212',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ICE CREAM',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS ICE CREAM', 'HAS A COMPLAINT'],
  title: 'This ice cream has a complaint',
  description: 'The sun melts him. Everyone licks him. One wobble and he is on the floor. So the ice cream moved somewhere colder. (A made-up comedy sketch.)',
  tags: ['funny', 'icecream', 'summer', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: ice cream is usually stored at about minus 18 degrees Celsius (0 degrees Fahrenheit) or colder (U.S. Food and Drug Administration, "Refrigerator & Freezer Storage Chart").',
  ],
  setup,
  scenes: [
    {
      say: 'This ice cream has a complaint.',
      show: ['ground', 'ic'], sky: '#9ED2F3', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 5, 11], look: [0, 5.0, 0], fov: 46, to: { pos: [1.3, 5, 10.2], look: [0, 5.0, 0], fov: 44 } },
      update: (w, p, t) => { hold(w, 0, 0, 0, 0, t); grump(w.c, .35); },
    },
    {
      say: 'Every summer, the sun melts him.',
      show: ['ground', 'ic', 'sun', 'rays', 'puddle'], sky: '#FFD58A', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 5, 12], look: [.6, 5.2, 0], fov: 50, to: { pos: [1.3, 5, 11.2], look: [.6, 5.2, 0], fov: 48 } },
      update: (w, p, t) => {
        hold(w, 0, 0, 0, 0, t); grump(w.c, -.3); w.c.scoop.scale.set(1 + .1 * p, 1 - .15 * p, 1 + .1 * p); w.c.drips.children.forEach(d => d.position.y = -.8 - ((t * .8 + d.userData.i / 5) % 1) * 2.5);
        w.puddle.scale.setScalar(.3 + p * .7); w.rays.rotation.z = 0; w.rays.children.forEach((r, i) => r.scale.y = 1 + .3 * Math.sin(t * 6 + i));
      },
    },
    {
      say: 'And everyone licks him. Rude.',
      show: ['ground', 'ic', 'tongue'], sky: '#9ED2F3', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [3, 4.4, 10], look: [.8, 4.4, 0], fov: 46, to: { pos: [2.8, 4.4, 9.2], look: [.8, 4.4, 0], fov: 44 } },
      update: (w, p, t) => { hold(w, 0, 0, 0, 0, t); grump(w.c, .6); const q = (t * 1.3) % 1; w.tongue.position.set(2.6 - Math.sin(q * Math.PI) * 1.1, 4.2 + q * 1.2, .3); w.tongue.rotation.z = .4; w.c.scoop.rotation.z = Math.sin(q * Math.PI) * .12; },
    },
    {
      say: 'One wobble, and splat.',
      show: ['ground', 'ic', 'puddle'], sky: '#9ED2F3', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1, 4, 13], look: [0, 2.4, 0], fov: 52, to: { pos: [.9, 4, 12.2], look: [0, 2.4, 0], fov: 50 } },
      update: (w, p, t) => {
        const q = Math.min(1, Math.max(0, (t - .3) / .5)); hold(w, 2, 0, 0, Math.sin(t * 12) * .15 * (1 - q) + 1.45 * q, t); w.c.scoop.scale.set(1 + .3 * q, 1 - .35 * q, 1 + .3 * q);
        w.puddle.position.set(-2, .03, 0); w.puddle.scale.setScalar(q); grump(w.c, q > .5 ? -.35 : .3); if (q > .5) w.c.mouth.scale.y = 3;
      },
    },
    {
      say: 'So he moved to the snow. With a penguin.',
      show: ['snow', 'ic', 'ice', 'pg', 'flakes'], sky: '#BFE3F7', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [.5, 4, 15], look: [-.2, 2.6, 0], fov: 50, to: { pos: [.5, 4, 14], look: [-.2, 2.6, 0], fov: 48 } },
      update: (w, p, t) => {
        hold(w, 1.3, 0, 0, 0, t, false); w.c.mouth.scale.y = 1.6; grump(w.c, -.35); w.ic.position.y = .2 * Math.abs(Math.sin(t * 4));
        w.pg.position.set(-1.8, 0, 0); w.pg.rotation.y = .3; w.pg.scale.setScalar(1.3); w.p.flips.forEach((f, i) => f.rotation.z = (i ? 1 : -1) * (.3 + .3 * Math.sin(t * 6)));
        w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .35 + i / 14) % 1; f.position.set(-4 + (i % 7) * 1.3, 9 - q * 8, -1 + (i % 3)); });
      },
    },
    {
      say: 'Grumpy ice cream: eat it, freeze it, or let it go? Comment below.',
      quiz: { q: 'What do you do with the grumpy ice cream?', options: ['Eat it', 'Freeze it', 'Let it go'], answer: 'Fun fact: ice cream is usually stored at about minus 18°C or colder.' },
      show: ['ground', 'ic'], sky: '#274B73', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [6, 4.4, 9], look: [0, 4, 0], fov: 46, to: { pos: [-6, 4.4, 9], look: [0, 4, 0] } },
      update: (w, p, t) => { hold(w, 0, 0, 0, 0, t, false); grump(w.c, -.2); },
    },
  ],
};
