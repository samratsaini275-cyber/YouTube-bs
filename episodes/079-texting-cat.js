// Narrative 5: "What Would Happen If…". A made-up comedy sketch: cats cannot text (yet).
// Hook rule: the premise as a question under 2 s, first frame already showing a cat holding a buzzing phone.

function cat(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#8A8F99', { rough: .9 }), white = mat('#F4F4F0', { rough: .9 });
  const c = { root: group([0, 0, 0], parent) };
  const body = ball(1.6, fur, [0, 1.8, 0], c.root); body.scale.set(1, 1.15, .95);
  ball(1, white, [0, 1.7, 1.1], c.root).scale.set(1, 1.2, .5);
  c.head = group([0, 4.1, .2], c.root);
  ball(1.2, fur, [0, 0, 0], c.head);
  for (const x of [-.7, .7]) { const e = cone(.4, .8, fur, [x, 1.05, 0], c.head, 4); e.rotation.z = x > 0 ? -.3 : .3; }
  c.eyes = [-.45, .45].map(x => { const g = group([x, .15, 1.05], c.head); ball(.28, mat('#FFD21F', { glow: .4 }), [0, 0, 0], g); box(.07, .4, .05, mat('#111111'), [0, 0, .26], g); return g; });
  ball(.12, mat('#FF8FA3'), [0, -.25, 1.15], c.head);
  for (const s of [-1, 1]) for (const y of [-.3, -.45]) { const wk = box(1, .03, .03, mat('#FFFFFF'), [s * .8, y, 1.05], c.head); wk.rotation.z = s * (y + .38) * 1.5; wk.castShadow = false; }
  c.paws = [-.6, .6].map(x => ball(.35, white, [x, 2.4, 1.4], c.root));
  c.tail = group([0, 1, -1.4], c.root); const tl = cyl(.18, .22, 2.6, fur, [0, 1.3, 0], c.tail, 8); tl.rotation.x = -.3;
  c.phone = group([0, 2.1, 1.9], c.root);
  box(1.1, 2, .12, mat('#1E2430'), [0, 0, 0], c.phone);
  c.screen = box(.95, 1.8, .02, mat('#5BC0EB', { glow: .8 }), [0, 0, .07], c.phone);
  c.phone.rotation.x = -1.05;
  return c;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C9B79C', 0);
  w.room = group();
  box(40, 16, .5, mat('#E6D3F0'), [0, 8, -6], w.room);
  box(10, 2, 5, mat('#5B6B9A'), [0, 1, -2.5], w.room); box(10, 3, 1.2, mat('#5B6B9A'), [0, 3, -4.6], w.room);
  w.c = cat(k, k.scene); w.cat = w.c.root;
  // the giant phone screen for the group chat / spam
  w.big = group([0, 8, -5.6]);
  box(7, 12, .3, mat('#1E2430'), [0, 0, 0], w.big);
  box(6.4, 11.2, .05, mat('#F4F6F8'), [0, 0, .18], w.big);
  w.bubbles = [];
  for (let i = 0; i < 9; i++) { const right = i % 3 !== 1; const b = box(right ? 3.6 : 3, .9, .06, mat(right ? '#22C55E' : '#C9CED6'), [right ? .9 : -1.2, 4.6 - i * 1.15, .24], w.big); b.castShadow = false; w.bubbles.push(b); }
  w.fish = group([0, 0, .28], w.big);
  for (let i = 0; i < 9; i++) { const f = cone(.15, .4, mat('#FF8A1F', { glow: .4 }), [2.3, 4.6 - i * 1.15, 0], w.fish, 3); f.rotation.z = Math.PI / 2; f.castShadow = false; }
  w.read = box(2.4, .6, .05, mat('#2F6FD6', { glow: 1 }), [-1.4, 2.3, .26], w.big);
  // the delivery box
  w.parcel = group([0, 0, 0]);
  const card = mat('#C89B5E', { rough: 1 });
  box(4.6, .3, 4, card, [0, .15, 0], w.parcel);
  for (const [x, z, wd, d] of [[0, 2, 4.6, .2], [0, -2, 4.6, .2], [2.3, 0, .2, 4], [-2.3, 0, .2, 4]]) box(wd, 3, d, card, [x, 1.5, z], w.parcel);
  w.gift = group([6, 0, 1]);
  box(2, 1.2, 1.6, mat('#2F6FD6'), [0, .6, 0], w.gift); box(1.6, .3, 1.2, mat('#FFFFFF'), [0, 1.35, 0], w.gift);
  // you, on the sofa
  w.you = group([5, 0, 2]);
  cyl(1, 1.15, 3.6, mat('#E2453C'), [0, 1.8, 0], w.you, 18); ball(1.05, mat('#F2C9A0'), [0, 4.5, 0], w.you);
  w.yeyes = [-.38, .38].map(x => ball(.15, mat('#111111'), [x, 4.7, .95], w.you));
  w.yphone = box(.6, 1, .08, mat('#1E2430'), [.6, 3, 1], w.you);
  w.dark = box(60, 30, .2, mat('#0A0F1E', { opacity: .5 }), [0, 10, 9]); w.dark.castShadow = false;
  return w;
}

function pose(w, t, o = {}) {
  w.cat.position.set(o.x ?? 0, o.y ?? 0, o.z ?? 1); w.cat.rotation.y = o.yaw ?? 0;
  w.c.phone.visible = o.phone !== false; w.c.phone.position.x = .05 * Math.sin(t * 40) * (o.buzz ? 1 : 0);
  w.c.paws.forEach((p, i) => { p.position.y = 2.4 + (o.type ? .15 * Math.abs(Math.sin(t * 18 + i * 1.6)) : 0); });
  w.c.head.rotation.y = o.look ?? 0;
  w.c.tail.rotation.z = .4 * Math.sin(t * 3);
  w.c.eyes.forEach(e => { e.scale.y = (t % 2.6) < .1 ? .1 : 1; });
}
function chat(w, n, fish = false) { w.bubbles.forEach((b, i) => { b.visible = i < n; }); w.fish.visible = fish; w.fish.children.forEach((f, i) => { f.visible = i < n && i % 3 !== 1; }); w.read.visible = false; }
const BASE = ['ground', 'room', 'cat'];

export default {
  id: '079',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE TEXTING CAT',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF CATS', 'COULD TEXT?'],
  title: 'What would happen if cats could text?',
  description: 'Forty messages at 3 a.m. One online order, just for the box. Zero replies. (A made-up cat with a phone.)',
  tags: ['whatif', 'funny', 'cat', 'texting', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the texting cat is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if cats could text?',
      show: BASE, sky: '#E6D3F0', lightAt: [0, 4, 1], lightDist: 14,
      cam: { pos: [3, 6, 15], look: [0, 7.6, 1], fov: 46, to: { pos: [2.5, 6, 13.5], look: [0, 7.6, 1], fov: 44 } },
      update: (w, p, t) => pose(w, t, { y: 2, type: true, buzz: true }),
    },
    {
      say: 'Three a.m.: feed me. Forty times.',
      show: [...BASE, 'big', 'dark'], sky: '#0A0F1E', lightAt: [0, 8, -4], lightDist: 16,
      cam: { pos: [0, 8, 12], look: [0, 8, -5], fov: 50, to: { pos: [0, 8, 10.5], look: [0, 8, -5], fov: 48 } },
      update: (w, p, t) => { pose(w, t, { y: 2, x: 4, type: true }); chat(w, Math.min(9, Math.floor(t * 5)), true); },
    },
    {
      say: 'It joins the family group chat.',
      show: [...BASE, 'big', 'you'], sky: '#E6D3F0', lightAt: [2, 6, 0], lightDist: 18,
      cam: { pos: [2, 7, 18], look: [0, 6, -2], fov: 52, to: { pos: [1.5, 7, 16], look: [0, 6, -2], fov: 50 } },
      update: (w, p, t) => { pose(w, t, { y: 2, x: -3, type: true, look: .4 }); chat(w, Math.min(9, 2 + Math.floor(t * 3))); w.yeyes.forEach(e => e.scale.setScalar(1.5)); },
    },
    {
      say: 'It orders a parcel. Just for the box.',
      show: [...BASE, 'parcel', 'gift'], sky: '#E6D3F0', lightAt: [2, 3, 1], lightDist: 14,
      cam: { pos: [6, 7, 13], look: [2, 2.5, 1], fov: 48, to: { pos: [5.5, 6.5, 11.5], look: [2, 2.5, 1], fov: 46 } },
      update: (w, p, t) => { w.parcel.position.set(0, 0, 1); pose(w, t, { y: .3, phone: false }); },
    },
    {
      say: 'You text back? Left on read.',
      show: [...BASE, 'big', 'you'], sky: '#E6D3F0', lightAt: [0, 6, 0], lightDist: 18,
      cam: { pos: [1, 7, 18], look: [-.8, 6, -2], fov: 52, to: { pos: [.8, 7, 16], look: [-.8, 6, -2], fov: 50 } },
      update: (w, p, t) => {
        pose(w, t, { y: 2, x: -3, look: -1.2 }); chat(w, 0);
        w.bubbles.forEach((b, i) => { b.visible = i === 1 || (i === 0 && t > .3); }); w.read.visible = t > .9;
        w.yeyes.forEach(e => e.scale.setScalar(1.4));
      },
    },
    {
      say: 'Texting cat: cute, annoying, or terrifying? Comment below.',
      quiz: { q: 'A cat that can text would be...', options: ['Cute', 'Annoying', 'Terrifying'], answer: 'It is a made-up cat, but you know the answer is all three.' },
      show: BASE, sky: '#274B73', lightAt: [0, 4, 1], lightDist: 14,
      cam: { pos: [8, 2, 14], look: [0, 9, 1], fov: 46, to: { pos: [-8, 2, 14], look: [0, 9, 1] } },
      update: (w, p, t) => pose(w, t, { y: 2, type: true, buzz: true }),
    },
  ],
};
