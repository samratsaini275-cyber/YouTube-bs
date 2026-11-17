// Narrative 5: "What Would Happen If…". A made-up comedy sketch: it does not rain jelly beans.
// Hook rule: the premise as a question under 2 s, first frame already showing bright jelly beans pouring down on a street.

const COLS = ['#E2453C', '#FFD21F', '#22C55E', '#2F6FD6', '#FF8A1F', '#E46FD6', '#FFFFFF'];

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9AA0A8', 0);
  w.street = group();
  box(120, .1, 14, mat('#4A4F5A'), [0, .05, 0], w.street).castShadow = false;
  for (let i = 0; i < 6; i++) { const h = 12 + (i % 3) * 4; box(9, h, 8, mat(['#E8C9A0', '#C9D6E8', '#E8B4A0'][i % 3]), [-25 + i * 10, h / 2, -14], w.street); for (let r = 0; r < 3; r++) box(6, 1.4, .2, mat('#7FB2D9'), [-25 + i * 10, 3 + r * 3.6, -9.9], w.street).castShadow = false; }
  // falling beans (shared bean materials so the colour switch is one change)
  w.mats = COLS.map(c => mat(c, { rough: .3 }));
  w.black = mat('#141414', { rough: .3 });
  w.rain = group();
  const geo = new k.THREE.SphereGeometry(.28, 12, 8);
  for (let i = 0; i < 160; i++) { const b = new k.THREE.Mesh(geo, w.mats[i % COLS.length]); b.scale.set(1.5, 1, 1); b.userData = { x: ((i * 37) % 60) - 30, z: ((i * 23) % 24) - 12, ph: (i * .137) % 1, c: i % COLS.length }; b.castShadow = false; w.rain.add(b); }
  // piles on the ground
  w.piles = group();
  for (let i = 0; i < 90; i++) { const b = new k.THREE.Mesh(geo, w.mats[i % COLS.length]); b.scale.set(1.5, 1, 1); b.position.set(((i * 41) % 40) - 20, .2, ((i * 29) % 20) - 10); b.rotation.y = i; b.userData.c = i % COLS.length; w.piles.add(b); }
  // the person with an umbrella
  w.guy = group([0, 0, 4]);
  cyl(1, 1.15, 4, mat('#2F6FD6'), [0, 2, 0], w.guy, 18); ball(1.05, mat('#F2C9A0'), [0, 4.9, 0], w.guy);
  w.geyes = [-.38, .38].map(x => ball(.15, mat('#111111'), [x, 5.1, .95], w.guy));
  w.gmouth = box(.6, .15, .1, mat('#111111'), [0, 4.5, 1], w.guy);
  w.umb = group([1.2, 4, .3], w.guy);
  cyl(.06, .06, 3.4, mat('#2A2A2A'), [0, 1.2, 0], w.umb, 8);
  w.canopy = cone(2.6, 1.2, mat('#E2453C', { double: true }), [0, 3, 0], w.umb, 16);
  w.bowl = group([0, 0, 0], w.umb);
  for (let i = 0; i < 40; i++) { const b = new k.THREE.Mesh(geo, w.mats[i % COLS.length]); b.scale.set(1.5, 1, 1); const a = i * 2.4, r = (i % 8) * .25; b.position.set(Math.cos(a) * r, 2.6 + (i % 3) * .15, Math.sin(a) * r); b.userData.c = i % COLS.length; w.bowl.add(b); }
  // the buried car
  w.car = group([-6, 0, -2]);
  box(7, 1.6, 3.4, mat('#22C55E', { metal: .3, rough: .35 }), [0, 1.4, 0], w.car);
  box(3.6, 1.3, 3, mat('#BFE6FF', { opacity: .5 }), [-.4, 2.8, 0], w.car);
  for (const x of [-2.3, 2.3]) for (const z of [-1.7, 1.7]) cyl(.8, .8, .5, mat('#1E2430'), [x, .8, z], w.car, 18).rotation.x = Math.PI / 2;
  w.mound = group([-6, 0, -2]);
  for (let i = 0; i < 260; i++) { const b = new k.THREE.Mesh(geo, w.mats[i % COLS.length]); b.scale.set(1.5, 1, 1); const a = i * 2.39996, r = Math.sqrt(i / 260) * 5.5; b.userData = { x: Math.cos(a) * r * 1.3, z: Math.sin(a) * r * .8, top: (1 - r / 5.5) * 4.6 + .2, c: i % COLS.length }; b.rotation.set(i, i * 2, 0); w.mound.add(b); }
  return w;
}

function rain(w, t, speed = 9) { w.rain.children.forEach(b => { const u = b.userData, f = (t * speed / 20 + u.ph) % 1; b.position.set(u.x, 20 - f * 20, u.z); b.rotation.set(t * 5 + u.ph * 9, u.ph * 6, 0); }); }
function colour(w, black) { for (const g of [w.rain, w.piles, w.bowl, w.mound]) g.children.forEach(b => { b.material = black ? w.black : w.mats[b.userData.c]; }); }
function guy(w, t, o = {}) {
  w.guy.position.set(o.x ?? 0, 0, o.z ?? 4);
  w.umb.rotation.z = o.flip ? Math.PI : 0; if (o.flip) w.umb.position.set(2.6, 6.6, 1.6); else w.umb.position.set(1.2, 4, .3); w.bowl.visible = !!o.flip;
  w.gmouth.scale.set(1, o.frown ? 1 : 1 + .8 * Math.abs(Math.sin(t * 6)), 1); w.gmouth.rotation.z = o.frown ? .3 : 0;
}
const ALL = ['ground', 'street', 'rain', 'piles'];

export default {
  id: '071',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'JELLY BEAN RAIN',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF IT RAINED', 'JELLY BEANS?'],
  title: 'What would happen if it rained jelly beans?',
  description: 'Free snacks from the sky. Bring a bowl. Check the forecast first. (Made-up weather. Please do not eat things off the street.)',
  tags: ['whatif', 'funny', 'jellybeans', 'weather', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: jelly bean rain is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if it rained jelly beans?',
      show: [...ALL, 'guy'], sky: '#BFD8EE', lightAt: [0, 4, 2], lightDist: 22,
      cam: { pos: [10, 4, 24], look: [0, 10.5, 0], fov: 50, to: { pos: [9, 4, 21], look: [0, 10.5, 0], fov: 48 } },
      update: (w, p, t) => { colour(w, false); rain(w, t); guy(w, t); },
    },
    {
      say: 'Umbrellas? Now they are bowls.',
      show: [...ALL, 'guy'], sky: '#C9DDF0', lightAt: [0, 6, 4], lightDist: 14,
      cam: { pos: [11, 6.5, 17], look: [1.6, 4.4, 4], fov: 46, to: { pos: [10, 6.5, 15], look: [1.6, 4.4, 4], fov: 44 } },
      update: (w, p, t) => { colour(w, false); rain(w, t); guy(w, t, { flip: true }); },
    },
    {
      say: 'By lunch, every car is buried.',
      show: [...ALL, 'car', 'mound'], sky: '#BFD8EE', lightAt: [-6, 3, -2], lightDist: 20,
      cam: { pos: [6, 8, 16], look: [-6, 3, -2], fov: 48, to: { pos: [5, 8, 14], look: [-6, 3, -2], fov: 46 } },
      update: (w, p, t, k) => {
        colour(w, false); rain(w, t);
        const fill = k.h.ease(Math.min(1, t / 1.8));
        w.mound.children.forEach(b => { const u = b.userData; b.position.set(u.x, u.top * fill, u.z); b.visible = u.top * fill > .15 || fill > .9; });
      },
    },
    {
      say: 'Then the forecast says: black licorice.',
      show: [...ALL, 'guy'], sky: '#5A6070', lightAt: [0, 6, 4], lightDist: 16,
      cam: { pos: [10, 6.5, 17], look: [1.3, 4.6, 4], fov: 46, to: { pos: [9, 6.5, 15], look: [1.3, 4.6, 4], fov: 44 } },
      shake: (t) => t > .7 && t < 1 ? .2 : 0,
      update: (w, p, t) => { colour(w, t > .7); rain(w, t); guy(w, t, { flip: true, frown: t > .7 }); },
    },
    {
      say: 'Jelly bean rain: catch, hide, or eat? Comment below.',
      quiz: { q: 'What would you do in jelly bean rain?', options: ['Catch them', 'Hide', 'Eat them'], answer: 'It is made-up weather, so catch as many as you like.' },
      show: [...ALL, 'guy'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 22,
      cam: { pos: [14, 3, 22], look: [0, 13, 0], fov: 46, to: { pos: [-12, 3, 22], look: [0, 13, 0] } },
      update: (w, p, t) => { colour(w, false); rain(w, t); guy(w, t, { flip: true }); },
    },
  ],
};
