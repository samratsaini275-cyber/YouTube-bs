// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: the self-sharpening pencil is fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (shavings flying off a pencil that is sharpening itself).

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.desk = k.ground('#B07A4A', 0);
  w.paper = box(16, .05, 22, mat('#FBF8EF'), [0, .03, 0], k.scene); w.paper.castShadow = false;
  for (let i = 0; i < 12; i++) box(15, .01, .06, mat('#9FC8E8'), [0, .06, -9 + i * 1.6], k.scene).castShadow = false;
  // the pencil (its length shrinks as it sharpens)
  w.pencil = group([0, 0, 0]);
  w.body = group([0, 0, 0], w.pencil);
  w.shaft = cyl(.6, .6, 12, mat('#FFC21F'), [0, 6, 0], w.body, 6);
  w.eraser = cyl(.62, .62, 1.2, mat('#FF8FA3'), [0, 12.6, 0], w.body, 16);
  w.ferrule = cyl(.64, .64, .6, mat('#C9CED6', { metal: .8 }), [0, 11.9, 0], w.body, 16);
  w.tip = cone(.6, 1.6, mat('#E8C9A0'), [0, -.8, 0], w.pencil, 6); w.tip.rotation.x = Math.PI;
  w.lead = cone(.18, .5, mat('#2A2A2A'), [0, -1.85, 0], w.pencil, 8); w.lead.rotation.x = Math.PI;
  // the built-in sharpener
  w.sharp = group([0, 4, 0], w.pencil);
  box(2, 2.2, 2, mat('#E2453C', { metal: .3 }), [0, 0, 0], w.sharp);
  w.blade = box(.1, 1.6, 1.2, mat('#C9CED6', { metal: .9 }), [1.05, 0, 0], w.sharp);
  w.shavings = group([0, 4, 0], w.pencil);
  for (let i = 0; i < 14; i++) { const s = k.mesh(new k.THREE.TorusGeometry(.35, .08, 6, 12, Math.PI * 1.3), mat(i % 2 ? '#E8C9A0' : '#FFC21F', { double: true }), [0, 0, 0], w.shavings); s.castShadow = false; s.userData = { a: i / 14 * Math.PI * 2, ph: i * .21 }; }
  // the single written word: a short scribble
  w.word = group([-3, .07, 2]);
  for (let i = 0; i < 6; i++) { const s = box(.9, .02, .14, mat('#2A2A2A'), [i * .8, 0, Math.sin(i * 1.7) * .4], w.word); s.rotation.y = Math.sin(i) * .6; s.castShadow = false; }
  w.pile = group([5, 0, -4]);
  for (let i = 0; i < 26; i++) { const s = ball(.35, mat(i % 3 ? '#E8C9A0' : '#FFC21F', { rough: 1 }), [((i * 37) % 9) / 3 - 1.5, .2 + (i % 4) * .25, ((i * 13) % 7) / 3 - 1.2], w.pile); s.scale.y = .4; }
  return w;
}

// len: 1 = full pencil, 0 = a stub
function length(w, len) { const L = Math.max(.08, len); w.shaft.scale.y = L; w.shaft.position.y = 6 * L; w.ferrule.position.y = 12 * L - .1; w.eraser.position.y = 12 * L + .6; w.sharp.position.y = Math.min(4, 6 * L); }
function shave(w, t, on) { w.shavings.visible = on; w.shavings.children.forEach(s => { const p = (t * 1.6 + s.userData.ph) % 1; s.position.set(Math.cos(s.userData.a) * (1.2 + p * 5), w.sharp.position.y + p * 3 - p * p * 6, Math.sin(s.userData.a) * (1.2 + p * 5)); s.rotation.set(t * 6, s.userData.a, t * 4); }); w.sharp.rotation.y = on ? t * 12 : 0; }
const ALL = ['desk', 'paper', 'pencil'];

export default {
  id: '058',
  style: '3d',
  voice: 'v3',
  case: 'THE SELF-SHARPENING PENCIL',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS PENCIL', 'SHARPENS ITSELF.'],
  title: 'Engineers made a pencil that sharpens itself',
  description: 'Always perfectly sharp. Always getting shorter. Very, very quickly. (A made-up pencil.)',
  tags: ['engineering', 'funny', 'badideas', 'pencil', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the self-sharpening pencil and its one-word lifetime are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This pencil sharpens itself.',
      show: ALL, sky: '#F2EEE6', lightAt: [0, 4, 0], lightDist: 20,
      cam: { pos: [8, 6, 14], look: [0, 10, 0], fov: 48, to: { pos: [7, 6, 12], look: [0, 10, 0], fov: 46 } },
      update: (w, p, t) => { length(w, 1 - t * .02); shave(w, t, true); w.pencil.position.set(0, 2, 0); w.pencil.rotation.z = 0; w.word.visible = false; w.pile.visible = false; },
    },
    {
      say: 'After every single word you write.',
      show: ALL, sky: '#EDE7DA', lightAt: [-2, 2, 2], lightDist: 20,
      cam: { pos: [6, 12, 16], look: [0, 3, 1], fov: 44, to: { pos: [5, 11, 14], look: [0, 3, 1], fov: 42 } },
      update: (w, p, t) => { length(w, .95); shave(w, t, false); const x = -3 + Math.min(t, 1.6) * 3; w.pencil.position.set(x, 1.9, 2 + Math.sin(t * 8) * .3); w.pencil.rotation.z = .3; w.word.visible = true; w.word.scale.x = Math.min(1, t / 1.6); w.pile.visible = false; },
    },
    {
      say: 'One word. Then: sharpen.',
      show: ALL, sky: '#F2EEE6', lightAt: [0, 4, 0], lightDist: 20,
      cam: { pos: [8, 5, 13], look: [0, 6, 0], fov: 46, to: { pos: [7, 4.5, 11], look: [0, 5, 0], fov: 44 } },
      shake: (t) => t > .8 ? .15 : 0,
      update: (w, p, t, k) => { length(w, .95 - .87 * k.h.ease(Math.min(1, Math.max(0, (t - .8) / 1.4)))); shave(w, t, t > .8); w.pencil.position.set(0, 2, 0); w.pencil.rotation.z = 0; w.word.visible = true; w.pile.visible = false; },
    },
    {
      say: 'In total, it has written one word.',
      show: [...ALL, 'pile'], sky: '#EDE7DA', lightAt: [2, 2, -1], lightDist: 20,
      cam: { pos: [2, 14, 14], look: [1, 1, -1], fov: 46, to: { pos: [2, 13, 12], look: [1, 1, -1], fov: 44 } },
      update: (w, p, t) => { length(w, .08); shave(w, t, false); w.pencil.position.set(-1, 1.9, -2); w.pencil.rotation.z = Math.PI / 2; w.word.visible = true; w.pile.visible = true; },
    },
    {
      say: 'Quick question. What word would you write? Hello? Help? Or nothing? Comment your answer.',
      quiz: { q: 'What one word would you write?', options: ['Hello', 'Help', 'Nothing'], answer: 'It is a made-up pencil, so choose wisely. You only get one.' },
      show: ALL, sky: '#274B73', lightAt: [0, 4, 0], lightDist: 20,
      cam: { pos: [10, 3, 16], look: [0, 12, 0], fov: 46, to: { pos: [-10, 3, 16], look: [0, 12, 0] } },
      update: (w, p, t) => { length(w, .7); shave(w, t, true); w.pencil.position.set(0, 2, 0); w.pencil.rotation.z = 0; w.word.visible = false; w.pile.visible = false; },
    },
  ],
};
