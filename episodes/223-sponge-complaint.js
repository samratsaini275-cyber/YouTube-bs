// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: kitchen sponges do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the sponge with a face.

function sponge(k, parent, col = '#FFD21F') {
  const { mat, box, ball, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  s.main = box(3, 2, 1.6, mat(col, { rough: 1 }), [0, 1.3, 0], s.body);
  s.scrub = box(3, .4, 1.6, mat('#2E8B4A', { rough: 1 }), [0, .2, 0], s.body);
  for (let i = 0; i < 12; i++) { const h = ball(.1, mat('#C9A21A'), [-1.2 + (i % 6) * .48, .6 + Math.floor(i / 6) * 1.2, .81], s.body); h.scale.z = .3; h.castShadow = false; }
  s.face = group([0, 1.4, .82], s.body);
  for (const x of [-.5, .5]) { ball(.26, mat('#FFFFFF'), [x, .25, 0], s.face); ball(.13, mat('#111111'), [x, .25, .17], s.face); }
  s.brows = [-.5, .5].map(x => box(.38, .06, .05, mat('#111111'), [x, .6, .04], s.face));
  s.mouth = box(.5, .1, .05, mat('#5A1E1E'), [0, -.3, .02], s.face);
  return s;
}
function talk(s, t, on = true) { s.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(s, a) { s.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.counter = k.ground('#C9D3DA', 0);
  w.wall = box(60, 30, .5, mat('#E7F0F4'), [0, 15, -4]); w.wall.castShadow = false;
  w.s = sponge(k, k.scene); w.sp = w.s.root;
  w.hand = group(); ball(1.1, mat('#F2C9A0'), [0, 0, 0], w.hand).scale.set(1.3, .6, 1); for (let i = 0; i < 4; i++) { const f = ball(.32, mat('#F2C9A0'), [-.75 + i * .5, -.3, .75], w.hand); f.scale.set(1, 1.6, 1); }
  w.drips = group(); for (let i = 0; i < 8; i++) { const d = ball(.12, mat('#3BA7E0', { glow: .3 }), [0, 0, 0], w.drips); d.userData.i = i; d.castShadow = false; }
  w.pan = group(); cyl(2.6, 2.4, .5, mat('#2A2A2A', { metal: .5 }), [0, .25, 0], w.pan, 28); const hd = box(3, .25, .4, mat('#2A2A2A'), [3.8, .4, 0], w.pan); w.grease = group([0, 0, 0], w.pan); for (let i = 0; i < 6; i++) { const g = cyl(.4 + (i % 3) * .15, .4, .05, mat('#8A6A1A'), [Math.cos(i * 2) * 1.3, .52, Math.sin(i * 2) * 1.1], w.grease, 12); }
  w.stink = group(); for (let i = 0; i < 6; i++) { const s = ball(.18, mat('#9BCB4A', { glow: .4 }), [0, 0, 0], w.stink); s.userData.i = i; s.castShadow = false; }
  w.sea = k.ground('#2C7FB8', 0); w.sea.material.transparent = true;
  w.sand = k.ground('#E8D2A0', .01);
  w.coral = group(); for (let i = 0; i < 5; i++) { const c = cone(.5, 2 + (i % 2), mat(['#FF7A9A', '#FF9F43', '#A855F7'][i % 3]), [-6 + i * 3, 1.1, -3 - (i % 2) * 2], w.coral, 8); }
  w.family = group(); ['#FF9F43', '#E2453C', '#A855F7'].forEach((col, i) => { const f = sponge(k, w.family, col); f.root.position.set(i === 0 ? -3.8 : i === 1 ? 3.8 : 0, 0, i === 2 ? -2.6 : -1); f.root.scale.setScalar(i === 2 ? 1.2 : .85); f.scrub.visible = false; f.mouth.scale.y = 1.4; f.root.userData.f = f; });
  w.bubbles = group(); for (let i = 0; i < 12; i++) { const b = ball(.15, mat('#FFFFFF', { glow: .3 }), [0, 0, 0], w.bubbles); b.material.transparent = true; b.material.opacity = .7; b.userData.i = i; b.castShadow = false; }
  return w;
}

const place = (w, x, y, z, ry, t, on = true) => { w.sp.position.set(x, y, z); w.sp.rotation.set(0, ry, 0); w.s.body.scale.set(1, 1, 1); w.s.body.rotation.set(0, 0, 0); w.s.scrub.visible = true; talk(w.s, t, on); };

export default {
  id: '223',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SPONGE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SPONGE', 'HAS A COMPLAINT'],
  title: 'This sponge has a complaint',
  description: 'Squeezed every night. Scrubbing the greasiest pans. And he never gets dry, so he smells. So the sponge went looking for his family. (A made-up comedy sketch.)',
  tags: ['funny', 'sponge', 'kitchen', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: sea sponges are animals, among the simplest multicellular animals, with no organs or nervous system (Smithsonian Ocean, "Sponges").',
  ],
  setup,
  scenes: [
    {
      say: 'This sponge has a complaint.',
      show: ['counter', 'wall', 'sp'], sky: '#E7F0F4', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 2.8, 9], look: [0, 1.85, 0], fov: 46, to: { pos: [1, 2.8, 8.2], look: [0, 1.85, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t); grump(w.s, .35); },
    },
    {
      say: 'Every night, he gets squeezed.',
      show: ['counter', 'wall', 'sp', 'hand', 'drips'], sky: '#E7F0F4', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 3.4, 10], look: [0, 1.9, 0], fov: 48, to: { pos: [1, 3.4, 9.2], look: [0, 1.9, 0], fov: 46 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, 0, t); const q = (t * 1.3) % 1, sq = Math.sin(q * Math.PI); w.s.body.scale.set(1 + .12 * sq, 1 - .4 * sq, 1 + .12 * sq); w.hand.position.set(0, 3.1 - sq * .8, 0); grump(w.s, .6); w.s.mouth.scale.y = 1 + 2 * sq;
        w.drips.children.forEach(d => { const i = d.userData.i, f = (t * 1.6 + i / 8) % 1; d.visible = sq > .3; d.position.set(-1.4 + (i % 4) * .9, 1 - f * 1, .9 + (i % 2) * .3); });
      },
    },
    {
      say: 'He scrubs the greasiest pans. Gross.',
      show: ['counter', 'wall', 'sp', 'pan'], sky: '#E7F0F4', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 5, 10], look: [0, 1.6, 0], fov: 48, to: { pos: [1, 4.8, 9.2], look: [0, 1.6, 0], fov: 46 } },
      update: (w, p, t) => { w.pan.position.set(0, 0, -.6); place(w, .7 * Math.sin(t * 8), .5, 0, 0, t); w.sp.rotation.z = .1 * Math.sin(t * 8); grump(w.s, -.35); w.s.mouth.scale.y = 2.6; w.grease.children.forEach((g, i) => g.visible = i >= Math.floor(p * 6)); },
    },
    {
      say: 'And he never dries. So he stinks.',
      show: ['counter', 'wall', 'sp', 'stink'], sky: '#E7F0F4', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1, 2.8, 9], look: [0, 1.85, 0], fov: 46, to: { pos: [1, 2.8, 8.2], look: [0, 1.85, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t); grump(w.s, .6); w.stink.children.forEach(s => { const i = s.userData.i, q = (t * .7 + i / 6) % 1; s.position.set(-1.6 + (i % 2) * 3.2, 1.6 + q * 3, .6); s.scale.setScalar(Math.sin(q * Math.PI) * 1.4); }); },
    },
    {
      say: 'So he moved to the sea. Where his family lives.',
      show: ['sp', 'sand', 'coral', 'family', 'bubbles'], sky: '#2C6FA8', lightAt: [0, 9, 4], lightDist: 24,
      cam: { pos: [1, 3.4, 12], look: [0, 1.3, 0], fov: 52, to: { pos: [1, 3.4, 11.2], look: [0, 1.3, 0], fov: 50 } },
      update: (w, p, t) => {
        place(w, 0, .3, .8, 0, t, false); w.s.scrub.visible = false; w.s.mouth.scale.y = 1.8; grump(w.s, -.35); w.sp.position.y = .3 + .15 * Math.sin(t * 2);
        w.family.children.forEach((f, i) => { const ff = f.userData.f; ff.brows.forEach((b, j) => b.rotation.z = (j ? 1 : -1) * .3); f.position.y = .1 * Math.sin(t * 2 + i); });
        w.bubbles.children.forEach(b => { const i = b.userData.i, q = (t * .5 + i / 12) % 1; b.position.set(-4 + (i % 6) * 1.6, q * 8, -1 + (i % 3)); });
      },
    },
    {
      say: 'Grumpy sponge: squeeze it, dry it, or set it free? Comment below.',
      quiz: { q: 'What do you do with the grumpy sponge?', options: ['Squeeze it', 'Dry it', 'Set it free'], answer: 'Fun fact: real sea sponges are animals, among the simplest on Earth.' },
      show: ['counter', 'wall', 'sp'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [6, 3.4, 8], look: [0, 2, 0], fov: 46, to: { pos: [-6, 3.4, 8], look: [0, 2, 0] } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t, false); grump(w.s, -.2); },
    },
  ],
};
