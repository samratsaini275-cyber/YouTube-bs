// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the vault, the jar and the engineer are fictional.

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#2B2F3A', 0);
  w.room = group();
  box(70, 34, 1, mat('#3A3F4D'), [0, 17, -12], w.room);
  for (let i = -3; i <= 3; i++) box(.3, 34, .4, mat('#4A5163'), [i * 9, 17, -11.4], w.room);
  // pedestal and the jar
  w.vault = group([0, 0, 0]);
  cyl(4, 4.6, 6, mat('#C9CED6', { metal: .6, rough: .3 }), [0, 3, 0], w.vault, 32);
  w.jar = group([0, 6, 0], w.vault);
  cyl(2.4, 2.4, 4.4, mat('#BFE6FF', { opacity: .35, rough: .05 }), [0, 2.2, 0], w.jar, 32);
  cyl(2.6, 2.6, .6, mat('#E2453C'), [0, 4.7, 0], w.jar, 32);
  w.cookie = group([0, 1.2, 0], w.jar);
  const ck = cyl(1.5, 1.5, .5, mat('#C98A3E', { rough: .9 }), [0, 0, 0], w.cookie, 24); ck.rotation.x = Math.PI / 2;
  for (const [x, y] of [[-.6, .4], [.5, .6], [.1, -.5], [-.3, -.1], [.7, -.2]]) ball(.2, mat('#3B2314'), [x, y, .28], w.cookie);
  w.crumbs = group([0, 6.3, 0], w.vault);
  for (let i = 0; i < 9; i++) ball(.18, mat('#C98A3E'), [((i * 37) % 7) / 3.5 - 1, 0, ((i * 13) % 5) / 2.5 - 1], w.crumbs);
  // vault cage that closes around the pedestal
  w.cage = group([0, 0, 0]);
  w.bars = [];
  for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; const b = cyl(.18, .18, 14, mat('#8C94A3', { metal: .8, rough: .3 }), [Math.cos(a) * 6.5, 7, Math.sin(a) * 6.5], w.cage, 10); w.bars.push(b); }
  w.cageTop = cyl(7, 7, .6, mat('#8C94A3', { metal: .8 }), [0, 14.2, 0], w.cage, 32);
  // laser grid
  w.lasers = group([0, 0, 0]);
  for (let i = 0; i < 7; i++) { const l = cyl(.06, .06, 30, mat('#FF2D2D', { glow: 3 }), [0, 1.5 + i * 1.6, 9], w.lasers, 6); l.rotation.z = Math.PI / 2 + (i % 2 ? .25 : -.25); l.castShadow = false; }
  // retina scanner on a post
  w.scanner = group([11, 0, 4]);
  box(.6, 9, .6, mat('#5A6070'), [0, 4.5, 0], w.scanner); box(2.4, 1.6, 1, mat('#1E2430'), [0, 9.4, 0], w.scanner);
  w.eye = ball(.5, mat('#22E06B', { glow: 2 }), [0, 9.4, .55], w.scanner);
  // the engineer
  w.guy = group([-9, 0, 5]);
  w.belly = ball(2.4, mat('#F2F2F2'), [0, 3.6, 0], w.guy); ball(1.3, mat('#F2C9A0'), [0, 7.2, 0], w.guy);
  for (const x of [-.45, .45]) ball(.16, mat('#111111'), [x, 7.4, 1.15], w.guy);
  cyl(1.35, 1.35, .7, mat('#FFC21F'), [0, 8.3, 0], w.guy, 20);
  w.guyCrumbs = group([0, 6.4, 1.2], w.guy);
  for (let i = 0; i < 6; i++) ball(.15, mat('#C98A3E'), [((i * 31) % 5) / 3 - .7, ((i * 17) % 3) / 4, 0], w.guyCrumbs);
  return w;
}

function cage(w, up) { w.cage.position.y = up; }
const ALL = ['floor', 'room', 'vault', 'cage', 'lasers', 'scanner'];

export default {
  id: '035',
  style: '3d',
  voice: 'v3',
  case: 'THE COOKIE VAULT',
  year: 'ENGINEERING NONSENSE',
  hook: ['NOBODY CAN', 'OPEN THIS JAR.'],
  title: 'Engineers built the most secure cookie jar ever',
  description: 'Lasers. A vault. A retina scanner. And one tiny flaw nobody planned for. (A made-up jar and a made-up engineer.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'cookie', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the cookie vault, its security features and the engineer are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This is the most secure cookie jar ever built.',
      show: ALL, sky: '#151922', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [14, 16, 34], look: [0, 7, 0], fov: 44, to: { pos: [8, 12, 24], look: [0, 7, 0], fov: 42 } },
      update: (w, p, t) => { cage(w, 0); w.cookie.visible = true; w.crumbs.visible = false; w.cookie.rotation.y = t; },
    },
    {
      say: 'Laser tripwires. A steel cage. And a retina scanner.',
      show: ALL, sky: '#1A1220', lightAt: [6, 6, 6], lightDist: 30,
      cam: { pos: [-16, 6, 26], look: [4, 6, 6], fov: 42, to: { pos: [4, 11, 20], look: [11, 9, 4], fov: 36 } },
      update: (w, p, t) => { cage(w, 0); w.cookie.visible = true; w.crumbs.visible = false; w.eye.material.emissiveIntensity = 1 + Math.abs(Math.sin(t * 4)) * 2; },
    },
    {
      say: 'Opening day. The scanner beeps. The cage rises.',
      show: ALL, sky: '#151922', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [-4, 12, 38], look: [0, 8, 0], fov: 46, to: { pos: [-2, 11, 32], look: [0, 8, 0], fov: 44 } },
      update: (w, p, t, k) => { cage(w, 16 * k.h.ease(k.h.win(t, 1.6, 3.2))); w.lasers.visible = t < 1.6; w.cookie.visible = false; w.crumbs.visible = false; },
    },
    {
      say: 'The cookie is gone. Just crumbs.',
      show: ALL, sky: '#2A1A1A', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [2, 13, 10], look: [0, 6.5, 0], fov: 40, to: { pos: [1, 11, 7], look: [0, 6.4, 0], fov: 36 } },
      update: (w) => { cage(w, 16); w.lasers.visible = false; w.cookie.visible = false; w.crumbs.visible = true; },
    },
    {
      say: 'Because the engineer who built it got locked inside. With the cookie. For three days.',
      show: [...ALL, 'guy'], sky: '#151922', lightAt: [-3, 5, 4], lightDist: 20,
      cam: { pos: [9, 13, 32], look: [-2, 6, 2], fov: 44, to: { pos: [6, 11, 26], look: [-2, 6, 2], fov: 42 } },
      update: (w, p, t) => { cage(w, 16); w.lasers.visible = false; w.cookie.visible = false; w.crumbs.visible = true; w.guy.position.set(-4, 0, 5); w.guyCrumbs.visible = true; w.belly.scale.setScalar(1 + .04 * Math.sin(t * 3)); },
    },
    {
      say: 'Quick question. What should the next version add? Option A, more lasers. Option B, a second cookie. Or option C, keep the engineer outside. Comment your answer.',
      quiz: { q: 'What should the next cookie vault add?', options: ['More lasers', 'A second cookie', 'Keep the engineer outside'], answer: 'Made-up vault, so any answer works. (C is the sensible one.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 6, 0], lightDist: 30,
      cam: { pos: [16, 26, 40], look: [0, -2, 0], fov: 46, to: { pos: [-16, 26, 40], look: [0, -2, 0] } },
      update: (w) => { cage(w, 0); w.lasers.visible = true; w.cookie.visible = true; w.crumbs.visible = false; },
    },
  ],
};
