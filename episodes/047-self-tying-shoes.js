// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the self-tying shoes are fictional.

function shoe(k, parent, pos) {
  const g = k.group(pos, parent);
  k.box(1.6, .5, 3.4, k.mat('#FFFFFF'), [0, .25, 0], g);
  k.box(1.5, 1.2, 2.6, k.mat('#2F6FD6'), [0, 1, -.3], g);
  k.box(1.52, .9, 1, k.mat('#E2453C'), [0, .85, 1.3], g);
  for (let i = 0; i < 3; i++) k.box(1.2, .08, .1, k.mat('#FFFFFF'), [0, 1.62, .2 - i * .4], g);
  return g;
}

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#7C8796', 0);
  w.side = group();
  box(10, .4, 400, mat('#C9CED6'), [12, .2, 0], w.side);
  for (let i = 0; i < 10; i++) { const h = 14 + (i * 5) % 10; box(10, h, 10, mat(['#E2B07A', '#C97B63', '#8FB3D9', '#B9A2D9'][i % 4]), [24, h / 2, -60 + i * 13], w.side); }
  // the guy
  w.guy = group([0, 0, 0]);
  w.legL = group([-.9, 2.2, 0], w.guy); cyl(.45, .45, 4.4, mat('#334155'), [0, 0, 0], w.legL, 10);
  w.legR = group([.9, 2.2, 0], w.guy); cyl(.45, .45, 4.4, mat('#334155'), [0, 0, 0], w.legR, 10);
  cyl(1.4, 1.5, 4.6, mat('#F59E0B'), [0, 6.7, 0], w.guy, 18); ball(1.2, mat('#F2C9A0'), [0, 10, 0], w.guy);
  for (const x of [-.4, .4]) ball(.14, mat('#111111'), [x, 10.2, 1.1], w.guy);
  w.shoeL = shoe(k, w.guy, [-.9, 0, .4]); w.shoeR = shoe(k, w.guy, [.9, 0, .4]);
  // laces: two loose ends that become a bow, then a bridge joining the shoes
  w.bowL = group([-.9, 1.75, .3], w.guy); w.bowR = group([.9, 1.75, .3], w.guy);
  for (const g of [w.bowL, w.bowR]) { for (const s of [-1, 1]) { const l = k.torus(.35, .08, mat('#FFFFFF'), [s * .35, .15, 0], g); l.rotation.set(Math.PI / 2, 0, 0); } }
  w.link = cyl(.1, .1, 1.8, mat('#FFFFFF'), [0, 1.8, .3], w.guy, 8); w.link.rotation.z = Math.PI / 2;
  w.sparkles = group([0, 2.4, .4], w.guy);
  for (let i = 0; i < 8; i++) { const s = ball(.12, mat('#FFE45C', { glow: 3 }), [0, 0, 0], w.sparkles); s.castShadow = false; s.userData.a = i / 8 * Math.PI * 2; }
  return w;
}

function laces(w, tied, linked) { w.bowL.scale.setScalar(Math.max(.01, tied)); w.bowR.scale.setScalar(Math.max(.01, tied)); w.link.visible = linked; }
function sparkle(w, t, on) { w.sparkles.visible = on; w.sparkles.children.forEach(s => { const r = 1 + (t * 2 % 1) * 2; s.position.set(Math.cos(s.userData.a + t) * r, (t * 2 % 1) * 1.5, Math.sin(s.userData.a + t) * r * .6); }); }
function walk(w, t) { w.legL.rotation.x = .4 * Math.sin(t * 6); w.legR.rotation.x = -.4 * Math.sin(t * 6); }
const ALL = ['floor', 'side', 'guy'];

export default {
  id: '047',
  style: '3d',
  voice: 'v3',
  case: 'THE SELF-TYING SHOES',
  year: 'ENGINEERING NONSENSE',
  hook: ['THESE SHOES', 'TIE THEMSELVES.'],
  title: 'Engineers made shoes that tie themselves',
  description: 'A perfect bow, every time. They take their job very seriously. Maybe too seriously. (Made-up shoes.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'shoes', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the self-tying shoes and the hopping commute are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'These shoes tie themselves.',
      show: ALL, sky: '#9FC3E6', lightAt: [0, 1, 0], lightDist: 15,
      cam: { pos: [7, 7, 15], look: [0, 2.5, 0], fov: 44, to: { pos: [5, 5.5, 11], look: [0, 2, .3], fov: 42 } },
      update: (w, p, t, k) => { w.guy.position.set(0, 0, 0); laces(w, k.h.ease(k.h.win(t, .6, 1.6)), false); sparkle(w, t, t > 1.2); walk(w, 0); },
    },
    {
      say: 'A perfect bow. Every single time.',
      show: ALL, sky: '#A7CCEE', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [-5, 5, 8], look: [0, 1.8, .3], fov: 40, to: { pos: [-4, 4.4, 6.5], look: [0, 1.8, .3], fov: 38 } },
      update: (w, p, t) => { laces(w, 1, false); sparkle(w, t, true); walk(w, 0); },
    },
    {
      say: 'They also tie themselves to each other.',
      show: ALL, sky: '#FFE3C2', lightAt: [0, 1, 0], lightDist: 12,
      cam: { pos: [0, 6, 10], look: [0, 2, .3], fov: 40, to: { pos: [0, 5, 8], look: [0, 2, .3], fov: 38 } },
      update: (w, p, t, k) => { laces(w, 1, t > 1.2); w.link.scale.y = Math.min(1, Math.max(.01, (t - 1.2) * 3)); sparkle(w, t, false); walk(w, 0); },
    },
    {
      say: 'He now gets to work by hopping.',
      show: ALL, sky: '#9FC3E6', lightAt: [0, 4, 0], lightDist: 40,
      cam: { pos: [-18, 9, 26], look: [0, 6, -4], fov: 46, to: { pos: [-16, 9, 18], look: [0, 6, -12], fov: 46 } },
      update: (w, p, t) => { laces(w, 1, true); const hop = Math.abs(Math.sin(t * 4)); w.guy.position.set(0, hop * 3, -t * 4); walk(w, 0); w.guy.rotation.x = -.1 * hop; },
    },
    {
      say: 'It is going great.',
      show: ALL, sky: '#9FC3E6', lightAt: [0, 4, -30], lightDist: 40,
      cam: { pos: [14, 9, -12], look: [0, 6, -30], fov: 46, to: { pos: [12, 8, -16], look: [0, 6, -30], fov: 44 } },
      update: (w, p, t) => { laces(w, 1, true); const hop = Math.abs(Math.sin(t * 4)); w.guy.position.set(0, hop * 3, -30 + Math.sin(t * 2) * 2); w.guy.rotation.x = -.1 * hop; },
    },
    {
      say: 'Quick question. How should he get to work? Option A, hop. Option B, roll. Or option C, buy slip-ons. Comment your answer.',
      quiz: { q: 'How should he get to work?', options: ['Hop', 'Roll', 'Buy slip-ons'], answer: 'The shoes are made up, so any answer works. (C is the smart one.)' },
      show: ALL, sky: '#274B73', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [10, 3, 22], look: [0, 12, 0], fov: 46, to: { pos: [-10, 3, 22], look: [0, 12, 0] } },
      update: (w, p, t) => { laces(w, 1, true); w.guy.position.set(0, Math.abs(Math.sin(t * 4)) * 2, 0); w.guy.rotation.x = 0; },
    },
  ],
};
