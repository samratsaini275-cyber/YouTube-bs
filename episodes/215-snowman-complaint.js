// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: snowmen do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the snowman with a face.

function snowman(k, parent) {
  const { mat, box, ball, cyl, cone, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  const snow = mat('#F4FAFF', { rough: .9 });
  s.base = ball(1.6, snow, [0, 1.4, 0], s.body);
  s.mid = ball(1.15, snow, [0, 3.5, 0], s.body);
  for (let i = 0; i < 3; i++) ball(.12, mat('#222222'), [0, 3.1 + i * .4, 1.1], s.body);
  s.head = group([0, 5.1, 0], s.body); ball(.85, snow, [0, 0, 0], s.head);
  s.nose = cone(.16, .9, mat('#F97316'), [0, -.05, 1.2], s.head, 10); s.nose.rotation.x = Math.PI / 2;
  for (const x of [-.3, .3]) ball(.11, mat('#111111'), [x, .25, .78], s.head);
  s.brows = [-.3, .3].map(x => box(.26, .05, .05, mat('#111111'), [x, .48, .78], s.head));
  s.mouth = box(.4, .08, .05, mat('#333333'), [0, -.4, .78], s.head);
  s.hat = group([0, .75, 0], s.head); cyl(.8, .8, .1, mat('#222222'), [0, 0, 0], s.hat, 20); cyl(.5, .5, .8, mat('#222222'), [0, .45, 0], s.hat, 20);
  s.scarf = k.torus(.75, .18, mat('#E2453C'), [0, 4.35, 0], s.body); s.scarf.rotation.x = Math.PI / 2;
  s.shades = group([0, .25, .82], s.head); for (const x of [-.3, .3]) box(.36, .2, .05, mat('#111111', { rough: .2 }), [x, 0, 0], s.shades); box(.25, .05, .05, mat('#111111'), [0, .05, 0], s.shades);
  return s;
}
function talk(s, t, on = true) { s.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(s, a) { s.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#F4FAFF', 0);
  w.trees = group(); for (let i = 0; i < 6; i++) { const t = group([-10 + i * 4, 0, -8 - (i % 2) * 3], w.trees); cone(1.4, 4, mat('#2E8B4A'), [0, 2.6, 0], t, 8); cone(1, 2, mat('#FFFFFF'), [0, 4.2, 0], t, 8); }
  w.s = snowman(k, k.scene); w.sm = w.s.root;
  w.sun = ball(1.6, mat('#FFD21F', { glow: 1 }), [3.5, 11, -6]); w.sun.castShadow = false;
  w.puddle = cyl(2, 2, .05, mat('#9FD3EE', { rough: .1 }), [0, .03, 0], k.scene, 24); w.puddle.castShadow = false;
  w.balls = group(); for (let i = 0; i < 3; i++) { const b = ball(.45, mat('#FFFFFF'), [0, 0, 0], w.balls); b.userData.i = i; }
  w.puff = group(); for (let i = 0; i < 8; i++) { const p = ball(.2, mat('#FFFFFF'), [0, 0, 0], w.puff); p.userData.i = i; p.castShadow = false; }
  w.carrot = cone(.16, .9, mat('#F97316'), [0, 0, 0], k.scene, 10);
  w.bird = group(); ball(.4, mat('#3B82F6'), [0, 0, 0], w.bird); ball(.28, mat('#3B82F6'), [.4, .25, 0], w.bird); const bk = cone(.1, .3, mat('#FFC21F'), [.72, .25, 0], w.bird, 6); bk.rotation.z = -Math.PI / 2;
  w.sand = cyl(14, 14, .2, mat('#F2D7A6'), [0, .1, 0], k.scene, 32);
  w.sea = box(80, .1, 20, mat('#3BA7E0', { rough: .2 }), [0, .05, -18]); w.sea.castShadow = false;
  w.towel = box(2.4, .05, 4, mat('#E2453C'), [2.6, .25, 0]);
  return w;
}

const stand = (w, x, z, ry, t, on = true) => { w.sm.position.set(x, 0, z); w.sm.rotation.set(0, ry, 0); w.s.body.scale.set(1, 1, 1); w.s.body.position.set(0, 0, 0); w.s.nose.visible = true; w.s.shades.visible = false; talk(w.s, t, on); };

export default {
  id: '215',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SNOWMAN',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SNOWMAN', 'HAS A COMPLAINT'],
  title: 'This snowman has a complaint',
  description: 'The sun melts him. Kids throw snowballs at him. And a bird stole his nose. So the snowman went somewhere new. (A made-up comedy sketch.)',
  tags: ['funny', 'snowman', 'winter', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: fresh snow is mostly air, often around 90 percent by volume (National Snow and Ice Data Center, "Snow and Climate").',
  ],
  setup,
  scenes: [
    {
      say: 'This snowman has a complaint.',
      show: ['ground', 'trees', 'sm'], sky: '#BFE3F7', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 5, 9.5], look: [0, 5.7, 0], fov: 46, to: { pos: [1.3, 5, 8.7], look: [0, 5.7, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, t); grump(w.s, .35); },
    },
    {
      say: 'Every sunny day, he melts.',
      show: ['ground', 'trees', 'sm', 'sun', 'puddle'], sky: '#FFD58A', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [1.4, 5, 12], look: [.6, 5.2, 0], fov: 50, to: { pos: [1.3, 5, 11.2], look: [.6, 5.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, t); grump(w.s, -.3); w.s.body.scale.set(1 + .08 * p, 1 - .18 * p, 1 + .08 * p); w.puddle.scale.setScalar(.4 + p * .8); w.s.head.rotation.z = .1 * p; },
    },
    {
      say: 'Kids throw snowballs at him. All day.',
      show: ['ground', 'trees', 'sm', 'balls', 'puff'], sky: '#BFE3F7', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [3, 5, 11], look: [.6, 5, 0], fov: 48, to: { pos: [2.8, 5, 10.2], look: [.6, 5, 0], fov: 46 } },
      update: (w, p, t) => {
        stand(w, 0, 0, 0, t); grump(w.s, .6);
        w.balls.children.forEach(b => { const i = b.userData.i, q = (t * 1.1 + i / 3) % 1; b.position.set(6 - q * 6, 3 + i * .9 + Math.sin(q * Math.PI) * 1.2, 2 - q * 1.2); b.visible = q < .95; });
        w.puff.children.forEach(pf => { const i = pf.userData.i, q = (t * 1.1 * 3) % 1; pf.position.set(.9 + Math.cos(i) * q * 1.2, 4 + Math.sin(i * 2) * q * 1.2, 1 + Math.sin(i) * .4); pf.scale.setScalar(1 - q); });
      },
    },
    {
      say: 'And a bird stole his nose.',
      show: ['ground', 'trees', 'sm', 'carrot', 'bird'], sky: '#BFE3F7', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [2, 5.4, 10.5], look: [1.2, 5.8, 0], fov: 48, to: { pos: [1.9, 5.4, 9.7], look: [1.2, 5.8, 0], fov: 46 } },
      update: (w, p, t) => {
        stand(w, 0, 0, 0, t); grump(w.s, -.35); w.s.mouth.scale.y = 2.6; const q = Math.min(1, t / 1.6); w.s.nose.visible = q < .25;
        w.bird.position.set(q < .25 ? 3 - q * 10 : .5 + (q - .25) * 6, 5.1 + (q < .25 ? 0 : (q - .25) * 4), 1.6); w.bird.rotation.y = q < .25 ? Math.PI : 0; w.bird.rotation.z = .2 * Math.sin(t * 20);
        w.carrot.visible = q >= .25; w.carrot.position.copy(w.bird.position).add(new w.bird.position.constructor(.95, .2, 0)); w.carrot.rotation.set(0, 0, -Math.PI / 2);
      },
    },
    {
      say: 'So now he lives at the beach. In sunglasses.',
      show: ['sm', 'sand', 'sea', 'towel'], sky: '#7EC8F0', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [1.4, 5, 11], look: [.6, 5.2, 0], fov: 48, to: { pos: [1.3, 5, 10.2], look: [.6, 5.2, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, t, false); w.s.body.position.y = .2; w.s.shades.visible = true; w.s.nose.visible = false; w.s.mouth.scale.y = 1.6; grump(w.s, -.3); w.sm.rotation.z = .03 * Math.sin(t * 2); },
    },
    {
      say: 'Grumpy snowman: build him, save him, or let him melt? Comment below.',
      quiz: { q: 'What do you do with the grumpy snowman?', options: ['Build him', 'Save him', 'Let him melt'], answer: 'Fun fact: fresh snow is mostly air, often about 90% of it.' },
      show: ['ground', 'trees', 'sm'], sky: '#274B73', lightAt: [0, 7, 3], lightDist: 20,
      cam: { pos: [6, 5.4, 9], look: [0, 4.8, 0], fov: 46, to: { pos: [-6, 5.4, 9], look: [0, 4.8, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, t, false); grump(w.s, -.2); },
    },
  ],
};
