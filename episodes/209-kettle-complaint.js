// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: kettles do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the kettle with a face.

function kettle(k, parent) {
  const { mat, box, ball, cyl, cone, group } = k;
  const e = { root: group([0, 0, 0], parent) };
  e.body = group([0, 0, 0], e.root);
  const shell = mat('#7FC8E8', { rough: .35 });
  cyl(1.5, 1.8, 3.2, shell, [0, 1.8, 0], e.body, 24);
  cyl(1.9, 1.9, .3, mat('#2A2A2A'), [0, .15, 0], e.body, 24);
  e.lid = group([0, 3.45, 0], e.body); cyl(1.45, 1.45, .2, shell, [0, 0, 0], e.lid, 24); ball(.3, mat('#2A2A2A'), [0, .25, 0], e.lid);
  const sp = cone(.55, 1.8, shell, [-1.9, 2.6, 0], e.body, 12); sp.rotation.z = Math.PI / 2 - .55;
  const h = k.torus(1, .2, mat('#2A2A2A'), [1.6, 2.2, 0], e.body); h.scale.set(.6, 1, 1);
  e.face = group([0, 1.9, 1.62], e.body);
  for (const x of [-.4, .4]) { ball(.24, mat('#FFFFFF'), [x, .3, 0], e.face); ball(.12, mat('#111111'), [x, .3, .16], e.face); }
  e.brows = [-.4, .4].map(x => box(.36, .06, .05, mat('#111111'), [x, .65, .05], e.face));
  e.mouth = box(.5, .1, .05, mat('#5A1E1E'), [0, -.25, .05], e.face);
  return e;
}
function talk(e, t, on = true) { e.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(e, a) { e.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.counter = k.ground('#E8E2D6', 0);
  w.wall = box(60, 30, .5, mat('#F2C2A0'), [0, 15, -6]); w.wall.castShadow = false;
  w.tiles = group(); for (let i = 0; i < 8; i++) for (let j = 0; j < 4; j++) { const t = box(1.9, 1.9, .05, mat((i + j) % 2 ? '#FFFFFF' : '#E7EEF3'), [-7 + i * 2, 1 + j * 2, -5.7], w.tiles); t.castShadow = false; }
  w.e = kettle(k, k.scene); w.kt = w.e.root;
  w.steam = group(); for (let i = 0; i < 10; i++) { const s = ball(.35, mat('#FFFFFF', { glow: .5 }), [0, 0, 0], w.steam); s.userData.i = i; s.castShadow = false; }
  w.scale = group(); for (let i = 0; i < 10; i++) { const c = box(.4, .1, .3, mat('#D8CBB0'), [0, 0, 0], w.scale); c.userData.i = i; c.castShadow = false; }
  w.mug = group(); cyl(.8, .7, 1.6, mat('#E2453C'), [0, .8, 0], w.mug, 18); cyl(.7, .7, .05, mat('#8A5A2B'), [0, 1.55, 0], w.mug, 18); const mh = k.torus(.45, .12, mat('#E2453C'), [.9, .85, 0], w.mug); mh.scale.set(.7, 1, 1);
  w.phone = group(); box(1.2, .1, 2.2, mat('#111111'), [0, .05, 0], w.phone); box(1, .02, 1.9, mat('#3B82F6', { glow: .6 }), [0, .11, 0], w.phone);
  return w;
}

const place = (w, x, z, ry, t, on = true) => { w.kt.position.set(x, 0, z); w.kt.rotation.set(0, ry, 0); w.e.body.rotation.set(0, 0, 0); w.e.lid.position.set(0, 3.45, 0); w.e.lid.rotation.set(0, 0, 0); talk(w.e, t, on); };
const puff = (w, t, rate, spread, top) => w.steam.children.forEach(s => { const i = s.userData.i, q = (t * rate + i / 10) % 1; s.position.set(-2.8 - q * spread + Math.sin(i * 3) * .3, top + q * 3, Math.cos(i * 2) * .4); s.scale.setScalar(.6 + q * 1.6); });

export default {
  id: '209',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE KETTLE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS KETTLE', 'HAS A COMPLAINT'],
  title: 'This kettle has a complaint',
  description: 'Boiled ten times a day. Forgotten every time. And nobody cleans the gunk inside. So the kettle made a cup of tea, for himself. (A made-up comedy sketch.)',
  tags: ['funny', 'kettle', 'tea', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: at sea level, pure water boils at 100 degrees Celsius; at higher altitude it boils at a lower temperature (Encyclopaedia Britannica, "boiling point").',
  ],
  setup,
  scenes: [
    {
      say: 'This kettle has a complaint.',
      show: ['counter', 'wall', 'tiles', 'kt'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 2.6, 13], look: [0, 2.3, 0], fov: 46, to: { pos: [1.9, 2.6, 12], look: [0, 2.3, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); grump(w.e, .35); },
    },
    {
      say: 'Ten times a day, he boils.',
      show: ['counter', 'wall', 'tiles', 'kt', 'steam'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1, 2.6, 14], look: [-1, 2.4, 0], fov: 48, to: { pos: [.9, 2.6, 13], look: [-1, 2.4, 0], fov: 46 } },
      update: (w, p, t) => { place(w, 0, 0, 0, t); grump(w.e, .55); w.kt.position.x = .06 * Math.sin(t * 45); w.e.lid.position.y = 3.45 + .15 * Math.abs(Math.sin(t * 20)); puff(w, t, 1.2, 2, 3.4); },
    },
    {
      say: 'Then everyone forgets him.',
      show: ['counter', 'wall', 'tiles', 'kt', 'phone'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [3, 2.6, 13], look: [1, 1.9, 0], fov: 46, to: { pos: [2.8, 2.6, 12], look: [1, 1.9, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, .25, t); grump(w.e, -.2); w.phone.position.set(3.2, 0, 1.6); w.phone.rotation.y = .3; w.e.face.position.x = 0; },
    },
    {
      say: 'And the gunk inside? Nobody cleans it.',
      show: ['counter', 'wall', 'tiles', 'kt', 'scale'], sky: '#F2C2A0', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [1.5, 7, 9.5], look: [0, 1.5, 0], fov: 46, to: { pos: [1.4, 6.8, 8.8], look: [0, 1.5, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, t); grump(w.e, .55); w.e.lid.position.set(-1.2, 3.8, -.5); w.e.lid.rotation.z = .9;
        w.scale.children.forEach(c => { const i = c.userData.i; c.position.set(Math.cos(i * 2.1) * .9, 3.3 + .1 * Math.sin(t * 3 + i), Math.sin(i * 2.1) * .9); c.rotation.y = i; });
      },
    },
    {
      say: 'So today, he made tea. For himself.',
      show: ['counter', 'wall', 'tiles', 'kt', 'mug', 'steam'], sky: '#F7C99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [-.5, 3, 14], look: [-1.4, 2.2, 0], fov: 46, to: { pos: [-.5, 3, 13], look: [-1.4, 2.2, 0], fov: 44 } },
      update: (w, p, t) => {
        const tilt = Math.min(1, t / .8) * .7; place(w, .6, 0, 0, t, false); w.e.body.rotation.z = tilt; w.e.mouth.scale.y = 1.6; grump(w.e, -.35); w.mug.position.set(-3.2, 0, 0);
        w.steam.children.forEach(s => { const i = s.userData.i, q = (t * .5 + i / 10) % 1; s.position.set(-3.2 + Math.sin(i * 3) * .3, 1.8 + q * 2.2, Math.cos(i * 2) * .3); s.scale.setScalar(.3 + q * .6); });
      },
    },
    {
      say: 'Grumpy kettle: boil it, clean it, or say thanks? Comment below.',
      quiz: { q: 'What do you do with the grumpy kettle?', options: ['Boil it', 'Clean it', 'Say thanks'], answer: 'Fun fact: water boils at 100°C at sea level, but at a lower temperature up a mountain.' },
      show: ['counter', 'wall', 'tiles', 'kt'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [7, 3.4, 10], look: [0, 2.4, 0], fov: 46, to: { pos: [-7, 3.4, 10], look: [0, 2.4, 0] } },
      update: (w, p, t) => { place(w, 0, 0, 0, t, false); grump(w.e, -.2); },
    },
  ],
};
