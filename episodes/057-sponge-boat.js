// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: the sponge boat is fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (a bright yellow sponge boat bobbing and soaking).

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#6FAF5A', 0);
  w.lakebed = cyl(30, 28, 2, mat('#8C6B4A', { rough: 1 }), [0, -1, 0], k.scene, 64);
  w.lake = cyl(30, 30, .4, mat('#3E8FD1', { metal: .3, rough: .1, opacity: .9 }), [0, .2, 0], k.scene, 64); w.lake.castShadow = false;
  w.trees = group();
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r = 36 + (i % 3) * 3; cyl(.6, .8, 5, mat('#6B4B2E'), [Math.cos(a) * r, 2.5, Math.sin(a) * r], w.trees, 8); cone(3, 7, mat('#2E8B4A'), [Math.cos(a) * r, 8, Math.sin(a) * r], w.trees, 10); }
  // the sponge boat
  w.boat = group([0, .6, 0]);
  w.hull = box(10, 3, 5, mat('#FFD21F', { rough: 1 }), [0, 1.5, 0], w.boat);
  w.holes = [];
  for (let i = 0; i < 14; i++) { const h = ball(.3, mat('#C9A20F', { rough: 1 }), [-4.4 + (i % 7) * 1.4, .7 + Math.floor(i / 7) * 1.4, 2.52], w.boat); h.scale.z = .3; w.holes.push(h); }
  box(10.1, .7, 5.1, mat('#2E8B4A', { rough: 1 }), [0, 3.3, 0], w.boat);   // the green scrubby side on top
  cyl(.12, .12, 6, mat('#8C6B4A'), [0, 6.5, 0], w.boat, 8);
  const sail = k.mesh(new k.THREE.PlaneGeometry(3.4, 4), mat('#FFFFFF', { double: true }), [1.8, 7, 0], w.boat); sail.castShadow = true;
  // the sailor
  w.guy = group([-2.5, 3.65, 0], w.boat);
  cyl(.6, .7, 2.4, mat('#2F6FD6'), [0, 1.2, 0], w.guy, 14); ball(.65, mat('#F2C9A0'), [0, 2.9, 0], w.guy);
  for (const x of [-.22, .22]) ball(.08, mat('#111111'), [x, 3, .6], w.guy);
  cone(.8, .6, mat('#FFFFFF'), [0, 3.6, 0], w.guy, 12);
  return w;
}

// soak: 0 = dry sponge on a full lake, 1 = giant soggy sponge on an empty lakebed
function soak(w, s, t) {
  const g = 1 + s * 1.6;
  w.hull.scale.set(g, 1 + s * 1.2, g); w.hull.material.color.set(s > .3 ? '#D9B21A' : '#FFD21F');
  w.lake.scale.set(1 - s * .97 + .001, 1, 1 - s * .97 + .001); w.lake.visible = s < .99;
  w.boat.position.y = .6 + .2 * Math.sin(t * 2) * (1 - s) - s * .4;
  w.boat.rotation.z = .04 * Math.sin(t * 1.6) * (1 - s);
}
const ALL = ['ground', 'lakebed', 'lake', 'trees', 'boat'];

export default {
  id: '057',
  style: '3d',
  voice: 'v3',
  case: 'THE SPONGE BOAT',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS BOAT IS', 'MADE OF SPONGE.'],
  title: 'Engineers built a boat out of a sponge',
  description: 'Soft. Comfy. Lightweight. For about four seconds. (A made-up boat on a made-up lake.)',
  tags: ['engineering', 'funny', 'badideas', 'boat', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the sponge boat and the disappearing lake are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This boat is made of sponge.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 30,
      cam: { pos: [14, 9, 26], look: [0, 9.5, 0], fov: 48, to: { pos: [12, 8.5, 23], look: [0, 9.5, 0], fov: 46 } },
      update: (w, p, t) => { soak(w, Math.min(.12, t * .05), t); },
    },
    {
      say: 'Engineers wanted it soft and comfy.',
      show: ALL, sky: '#A7D8F5', lightAt: [-2, 4, 0], lightDist: 20,
      cam: { pos: [-8, 9, 10], look: [-2, 5, 0], fov: 42, to: { pos: [-6, 8, 8], look: [-2, 5, 0], fov: 40 } },
      update: (w, p, t) => { soak(w, .12 + t * .03, t); w.guy.rotation.z = .1 * Math.sin(t * 2); },
    },
    {
      say: 'Then it soaked up the whole lake.',
      show: ALL, sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 45,
      cam: { pos: [0, 50, 40], look: [0, 0, 0], fov: 48, to: { pos: [0, 46, 34], look: [0, 0, 0], fov: 48 } },
      update: (w, p, t, k) => { soak(w, .2 + .8 * k.h.ease(Math.min(1, t / 2.4)), t); },
    },
    {
      say: 'Now it does not float. Or move.',
      show: ALL, sky: '#FFE3C2', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [32, 12, 40], look: [0, 7, 0], fov: 48, to: { pos: [28, 11, 35], look: [0, 7, 0], fov: 46 } },
      update: (w, p, t) => { soak(w, 1, t); w.guy.position.y = 3.65 + 3.6 + .1 * Math.sin(t * 2); },
    },
    {
      say: 'Quick question. What should the next boat be made of? Bread? Paper? Or wood? Comment your answer.',
      quiz: { q: 'What should the next boat be made of?', options: ['Bread', 'Paper', 'Wood'], answer: 'It is a made-up boat, so pick any. (Wood is the wild new idea.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 2, 0], lightDist: 30,
      cam: { pos: [14, 3, 24], look: [0, 12, 0], fov: 46, to: { pos: [-14, 3, 24], look: [0, 12, 0] } },
      update: (w, p, t) => { soak(w, .1, t); w.guy.position.y = 3.65; },
    },
  ],
};
