// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: sandwiches do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the sandwich with a face.

function sandwich(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  const bread = mat('#E9C98F', { rough: .8 }), crust = mat('#B9823F', { rough: .8 });
  s.bottom = group([0, .3, 0], s.body); box(3.2, .5, 3.2, bread, [0, 0, 0], s.bottom); box(3.36, .52, 3.36, crust, [0, 0, 0], s.bottom).scale.set(1, .96, 1);
  s.fill = group([0, .75, 0], s.body);
  box(3.4, .12, 3.4, mat('#5DBB4A'), [0, 0, 0], s.fill); box(3.1, .25, 3.1, mat('#E2453C'), [0, .18, 0], s.fill); box(3.25, .12, 3.25, mat('#FFD21F'), [0, .36, 0], s.fill);
  s.top = group([0, 1.4, 0], s.body); box(3.2, .5, 3.2, bread, [0, 0, 0], s.top); box(3.36, .52, 3.36, crust, [0, 0, 0], s.top).scale.set(1, .96, 1);
  s.face = group([1.7, 0, 0], s.top);
  for (const z of [-.5, .5]) { const e = ball(.28, mat('#FFFFFF'), [0, .55, z], s.face); e.scale.x = .5; ball(.13, mat('#111111'), [.1, .55, z], s.face); }
  s.brows = [-.5, .5].map(z => box(.05, .06, .4, mat('#111111'), [.05, .95, z], s.face));
  s.mouth = box(.05, .12, .7, mat('#5A1E1E'), [.05, 1.0, 0], s.face); s.mouth.position.y = -.05;
  return s;
}
function talk(s, t, on = true) { s.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(s, a) { s.brows.forEach((b, i) => b.rotation.x = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.table = k.ground('#D9B38C', 0);
  w.wall = box(60, 30, .5, mat('#F3E6D0'), [0, 15, -8]); w.wall.castShadow = false;
  w.plate = cyl(3.2, 2.8, .2, mat('#FFFFFF'), [0, .1, 0], k.scene, 32);
  w.s = sandwich(k, k.scene); w.sw = w.s.root;
  w.book = group(); box(5, 1.2, 4, mat('#2F6FD6'), [0, .6, 0], w.book); box(4.8, 1, 3.8, mat('#FFFFFF'), [.12, .6, 0], w.book);
  w.crusts = group(); for (let i = 0; i < 4; i++) { const c = box(3, .35, .35, mat('#B9823F'), [0, .35, 0], w.crusts); c.rotation.y = i * Math.PI / 2 + .3 * Math.sin(i * 5); c.position.set(Math.cos(i * 1.7) * 1.2, .38, Math.sin(i * 1.7) * 1.2); }
  w.fridge = group(); box(6, 9, .3, mat('#EEF3F7'), [0, 4.5, -2.6], w.fridge); for (const y of [2, 5]) box(6, .1, 5, mat('#CFE3F0', { glow: .2 }), [0, y, 0], w.fridge); for (const x of [-3, 3]) box(.3, 9, 5, mat('#EEF3F7'), [x, 4.5, 0], w.fridge);
  w.milk = group(); box(1, 2, 1, mat('#FFFFFF'), [0, 1, 0], w.milk); box(1.02, .6, 1.02, mat('#2F6FD6'), [0, 1.3, 0], w.milk);
  w.flakes = group(); for (let i = 0; i < 12; i++) { const f = ball(.08, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.flakes); f.userData.i = i; f.castShadow = false; }
  w.teeth = group(); w.teeth.up = group([0, 0, 0], w.teeth); w.teeth.dn = group([0, 0, 0], w.teeth); for (let i = 0; i < 5; i++) { box(.4, .6, .35, mat('#FFFFFF'), [0, 0, -1 + i * .5], w.teeth.up); box(.4, .6, .35, mat('#FFFFFF'), [0, 0, -1 + i * .5], w.teeth.dn); } box(.6, .3, 2.8, mat('#E07A8A'), [0, .4, 0], w.teeth.up); box(.6, .3, 2.8, mat('#E07A8A'), [0, -.4, 0], w.teeth.dn);
  return w;
}

const sit = (w, x, y, z, ry, t, on = true) => { w.sw.position.set(x, y, z); w.sw.rotation.set(0, ry, 0); w.s.body.scale.set(1, 1, 1); w.teeth.visible = false; talk(w.s, t, on); };

export default {
  id: '207',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SANDWICH',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SANDWICH', 'HAS A COMPLAINT'],
  title: 'This sandwich has a complaint',
  description: 'Squashed in every lunchbox. Bitten without asking. And his crusts? Always left on the plate. So the sandwich found somewhere safe. (A made-up comedy sketch.)',
  tags: ['funny', 'sandwich', 'lunch', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: the sandwich is named after John Montagu, the 4th Earl of Sandwich (Encyclopaedia Britannica, "sandwich").',
  ],
  setup,
  scenes: [
    {
      say: 'This sandwich has a complaint.',
      show: ['table', 'wall', 'plate', 'sw'], sky: '#F3E6D0', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [11, 3.6, 4.5], look: [0, 2.2, 0], fov: 46, to: { pos: [10, 3.6, 4.1], look: [0, 2.2, 0], fov: 44 } },
      update: (w, p, t) => { sit(w, 0, .2, 0, -.35, t); grump(w.s, .35); },
    },
    {
      say: 'Every lunch, he gets squashed.',
      show: ['table', 'wall', 'sw', 'book'], sky: '#F3E6D0', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [12, 4, 6], look: [0, 2.6, 0], fov: 46, to: { pos: [11, 4, 5.5], look: [0, 2.6, 0], fov: 44 } },
      update: (w, p, t) => {
        sit(w, 0, 0, 0, -.35, t); const q = (t * .8) % 1, sq = q < .3 ? q / .3 : q < .7 ? 1 : 1 - (q - .7) / .3; w.s.body.scale.set(1 + .25 * sq, 1 - .55 * sq, 1 + .25 * sq);
        w.book.position.set(0, 2.1 - 1.2 * sq + (q > .7 ? (q - .7) * 6 : 0), 0); w.book.rotation.y = .2; grump(w.s, .5);
      },
    },
    {
      say: 'Then someone bites him. No warning.',
      show: ['table', 'wall', 'plate', 'sw', 'teeth'], sky: '#F3E6D0', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [11, 3.6, 6], look: [0, 2.0, .6], fov: 46, to: { pos: [10, 3.6, 5.6], look: [0, 2.0, .6], fov: 44 } },
      update: (w, p, t) => { sit(w, 0, .2, 0, -.35, t); const c = Math.min(1, t / .5); w.teeth.visible = true; w.teeth.position.set(.4, 1.2, 2.6); w.teeth.rotation.y = -.35; w.teeth.up.position.y = 1.3 - .9 * c; w.teeth.dn.position.y = -1.3 + .9 * c; if (t > .5) w.s.mouth.scale.y = 3; grump(w.s, t > .5 ? -.3 : .4); w.sw.position.x = t > .5 && t < .9 ? .12 * Math.sin(t * 60) : 0; },
    },
    {
      say: 'And his crusts? Always left behind.',
      show: ['table', 'wall', 'plate', 'crusts'], sky: '#F3E6D0', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [5, 8, 8], look: [0, 1.4, 0], fov: 46, to: { pos: [4.6, 7.6, 7.4], look: [0, 1.4, 0], fov: 44 } },
      update: (w, p, t) => { w.crusts.rotation.y = .1 * Math.sin(t); },
    },
    {
      say: 'So now he lives in the fridge. Cold, but safe.',
      show: ['table', 'sw', 'fridge', 'milk', 'flakes'], sky: '#CFE3F0', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [2, 4.6, 12], look: [0, 2.6, 0], fov: 46, to: { pos: [1.8, 4.6, 11], look: [0, 2.6, 0], fov: 44 } },
      update: (w, p, t) => {
        sit(w, .3, 2.05, .4, -.6, t, false); w.s.mouth.scale.y = 1; grump(w.s, -.25); w.sw.position.x = .3 + .04 * Math.sin(t * 40); w.milk.position.set(-1.8, 2.05, 0);
        w.flakes.children.forEach(f => { const i = f.userData.i, q = (t * .4 + i / 12) % 1; f.position.set(-2.5 + (i % 6), 8.5 - q * 6, -1 + (i % 3)); });
      },
    },
    {
      say: 'Grumpy sandwich: eat it, save it, or say sorry? Comment below.',
      quiz: { q: 'What do you do with the grumpy sandwich?', options: ['Eat it', 'Save it', 'Say sorry'], answer: 'Fun fact: the sandwich is named after the 4th Earl of Sandwich, John Montagu.' },
      show: ['table', 'wall', 'plate', 'sw'], sky: '#274B73', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [11, 4, 6], look: [0, 2.6, 0], fov: 46, to: { pos: [-11, 4, 6], look: [0, 2.6, 0] } },
      update: (w, p, t) => { sit(w, 0, .2, 0, -.35, t, false); grump(w.s, -.2); },
    },
  ],
};
