// 3D episode, narrative 4: "Bad Ideas, Built Anyway". A made-up comedy sketch: the umbrella is fictional.
// Hook rule: first line under 2 s, first frame already mid-joke (rain pouring down under the umbrella onto its owner).

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.street = k.ground('#6E7784', 0);
  w.town = group();
  for (let i = 0; i < 8; i++) { const h = 14 + (i * 5) % 10; box(10, h, 10, mat(['#C97B63', '#8FB3D9', '#B9A2D9', '#E2B07A'][i % 4]), [i % 2 ? 16 : -16, h / 2, -40 + i * 11], w.town); }
  // the person
  w.guy = group([0, 0, 0]);
  cyl(1.1, 1.3, 5, mat('#F59E0B'), [0, 2.5, 0], w.guy, 18); ball(1.1, mat('#F2C9A0'), [0, 6.1, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 6.3, 1], w.guy);
  w.mouth = box(.7, .15, .1, mat('#111111'), [0, 5.7, 1.05], w.guy);
  cyl(.25, .25, 3, mat('#F59E0B'), [.9, 6, 0], w.guy, 8);
  // the umbrella with a tank on top and a shower head underneath
  w.umb = group([.9, 7.5, 0], w.guy);
  cyl(.1, .1, 4.5, mat('#333333', { metal: .6 }), [0, 2, 0], w.umb, 8);
  cone(4.5, 1.8, mat('#22C55E', { rough: .4, double: true }), [0, 5, 0], w.umb, 8);
  cyl(1, 1, 1.6, mat('#38BDF8', { opacity: .8 }), [0, 6.6, 0], w.umb, 16);
  w.head = cyl(.7, .4, .4, mat('#C9CED6', { metal: .8 }), [-.9, 3.9, 0], w.umb, 16);
  // rain: from the sky (bouncing off) and from the shower head (onto the owner)
  w.sky = group([0, 0, 0]);
  for (let i = 0; i < 60; i++) { const d = box(.06, .7, .06, mat('#BFE6FF', { opacity: .8 }), [0, 0, 0], w.sky); d.castShadow = false; d.userData = { x: ((i * 37) % 40) - 20, z: ((i * 23) % 20) - 10, ph: i * .13 }; }
  w.shower = group([0, 0, 0], w.guy);
  for (let i = 0; i < 40; i++) { const d = box(.2, .9, .2, mat('#2EA8FF', { glow: 1 }), [0, 0, 0], w.shower); d.castShadow = false; d.userData = { x: ((i * 7) % 7) * .25 - .45, z: ((i * 11) % 7) * .3 - .9, ph: i * .07 }; }
  w.puddle = cyl(2.6, 2.6, .05, mat('#5BA6D8', { metal: .3, rough: .1 }), [0, .04, 0], w.guy, 32); w.puddle.castShadow = false;
  // a shop window with a sold-out sign
  w.shop = group([-8, 0, -6]);
  box(10, 10, 1, mat('#2A2F38'), [0, 5, 0], w.shop); box(8, 6, .2, mat('#BFE6FF', { opacity: .5 }), [0, 5, .6], w.shop);
  box(5, 1.6, .2, mat('#E0161E', { glow: .6 }), [0, 9, .7], w.shop);
  return w;
}

function rain(w, t, sky = true, shower = true, dry = 0) {
  w.sky.visible = sky;
  w.sky.children.forEach(d => { const u = d.userData; let y = 30 - ((t * 25 + u.ph * 30) % 30); const under = Math.hypot(u.x - .9, u.z) < 4.5 && y < 12.5; if (under) y = 12.5 + (y % 1); d.position.set(u.x, y, u.z); });
  w.shower.visible = shower;
  w.shower.children.forEach(d => { const u = d.userData; const y = 11 - ((t * 14 + u.ph * 10) % 5.5); d.position.set(u.x, y, u.z); });
  w.puddle.scale.setScalar(.6 + Math.min(1, dry) * .6);
}
const ALL = ['street', 'town', 'guy', 'sky'];

export default {
  id: '055',
  style: '3d',
  voice: 'v3',
  case: 'THE RAINING UMBRELLA',
  year: 'BAD IDEAS, BUILT ANYWAY',
  hook: ['THIS UMBRELLA', 'RAINS ON YOU.'],
  title: 'Engineers built an umbrella that rains on you',
  description: 'It blocks every drop of real rain. Then it gets a bit carried away. (A made-up umbrella.)',
  tags: ['engineering', 'funny', 'badideas', 'umbrella', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the umbrella with its own rain is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This umbrella rains on you.',
      show: ALL, sky: '#6F8399', lightAt: [0, 6, 0], lightDist: 25,
      cam: { pos: [8, 6, 16], look: [0, 10, 0], fov: 50, to: { pos: [7, 6, 14], look: [0, 10, 0], fov: 48 } },
      update: (w, p, t) => { rain(w, t, true, true, .6); w.mouth.scale.y = 1; },
    },
    {
      say: 'It blocks the real rain perfectly.',
      show: ALL, sky: '#5E7186', lightAt: [0, 12, 0], lightDist: 25,
      cam: { pos: [-10, 18, 14], look: [1, 12, 0], fov: 46, to: { pos: [-8, 17, 11], look: [1, 12.5, 0], fov: 44 } },
      update: (w, p, t) => { rain(w, t, true, false, .1); },
    },
    {
      say: 'Then it makes its own.',
      show: ALL, sky: '#6F8399', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [5, 7, 10], look: [0, 7, 0], fov: 44, to: { pos: [4, 6.5, 8], look: [0, 7, 0], fov: 42 } },
      update: (w, p, t) => { rain(w, t, true, true, .3 + t * .2); w.mouth.scale.y = 1 + 2 * Math.abs(Math.sin(t * 3)); },
    },
    {
      say: 'Somehow, it sold out.',
      show: [...ALL, 'shop'], sky: '#6F8399', lightAt: [-4, 6, -2], lightDist: 25,
      cam: { pos: [6, 9, 22], look: [-4, 7, -3], fov: 46, to: { pos: [5, 8.5, 19], look: [-4, 7, -3], fov: 44 } },
      update: (w, p, t) => { rain(w, t, true, true, 1); },
    },
    {
      say: 'Quick question. Would you buy one? Yes? No? Or only in summer? Comment your answer.',
      quiz: { q: 'Would you buy one?', options: ['Yes', 'No', 'Only in summer'], answer: 'It is a made-up umbrella, so it is not for sale.' },
      show: ALL, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [12, 4, 22], look: [0, 14, 0], fov: 46, to: { pos: [-12, 4, 22], look: [0, 14, 0] } },
      update: (w, p, t) => { rain(w, t, true, true, 1); },
    },
  ],
};
