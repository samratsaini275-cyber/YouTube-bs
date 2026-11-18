// Narrative 7: "Animals at Work". A made-up comedy sketch: kangaroos do not deliver mail.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the kangaroo in a postal cap with letters in its pouch.

function roo(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#B8774A', { rough: .8 }), light = mat('#E8C49A', { rough: .8 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const b = ball(1.2, fur, [0, 3, 0], r.body); b.scale.set(.9, 1.4, .85); b.rotation.z = -.2;
  const pouch = ball(.75, light, [.55, 2.4, 0], r.body); pouch.scale.set(.6, .8, .9);
  r.letters = [];
  for (let i = 0; i < 3; i++) { const l = box(.06, .7, .55, mat('#FFFFFF'), [1.18, 2.95, -.35 + i * .35], r.body); l.rotation.z = -.25; r.letters.push(l); }
  r.head = group([.5, 4.9, 0], r.body);
  const hd = ball(.55, fur, [0, 0, 0], r.head); hd.scale.set(1.3, .9, .9);
  ball(.25, light, [.6, -.12, 0], r.head);
  ball(.08, mat('#111111'), [.82, -.05, 0], r.head);
  for (const z of [-.25, .25]) { ball(.09, mat('#111111'), [.35, .15, z * 1.2], r.head); const e = cone(.15, .7, fur, [-.15, .65, z], r.head, 6); e.rotation.x = z * .6; }
  r.cap = group([0, .45, 0], r.head);
  cyl(.5, .5, .3, mat('#1E3A8A'), [0, 0, 0], r.cap, 16); box(.5, .05, .7, mat('#111111'), [.45, -.12, 0], r.cap);
  r.arms = [-1, 1].map(s => { const g = group([.6, 3.8, s * .5], r.body); cyl(.12, .1, .9, fur, [.2, -.4, 0], g, 6).rotation.z = .6; return g; });
  r.legs = [-1, 1].map(s => { const g = group([-.3, 2, s * .6], r.root); const th = ball(.6, fur, [0, -.3, 0], g); th.scale.set(1.2, 1, .7); box(1.6, .3, .4, fur, [.5, -1.8, 0], g); cyl(.15, .15, 1.4, fur, [0, -1.1, 0], g, 6); return g; });
  r.tail = group([-.9, 1.8, 0], r.root); const tl = cyl(.3, .1, 2.8, fur, [-1.2, -.6, 0], r.tail, 8); tl.rotation.z = 1.1;
  r.bag = group([0, 0, 0], r.body);
  return r;
}
function hop(r, t, sp = 5) { const f = Math.abs(Math.sin(t * sp)); r.root.position.y = 2.4 * f; r.legs.forEach(g => { g.rotation.z = -.4 * f; }); r.body.rotation.z = -.15 * f; return f; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.street = group();
  box(200, .05, 4, mat('#D9D2C4'), [0, .03, 2], w.street).castShadow = false;
  w.houses = [];
  for (let i = 0; i < 6; i++) { const hg = group([-20 + i * 9, 0, -6], w.street); box(6, 5, 5, mat(['#E8C9A0', '#C9D6E8', '#E8B4A0', '#D6E8C4'][i % 4]), [0, 2.5, 0], hg); const rf = cone(5, 2.6, mat('#8B3A2E'), [0, 6.3, 0], hg, 4); rf.rotation.y = Math.PI / 4; const mb = group([2.4, 0, 3.4], hg); cyl(.08, .08, 1.6, mat('#5A3A1E'), [0, .8, 0], mb, 6); box(.8, .6, 1.1, mat('#2F6FD6'), [0, 1.8, 0], mb); w.houses.push(hg); }
  w.r = roo(k, k.scene); w.kanga = w.r.root;
  w.flying = group();
  for (let i = 0; i < 14; i++) { const l = box(.06, .5, .7, mat('#FFFFFF'), [0, 0, 0], w.flying); l.userData = { a: i * .45, ph: (i * .13) % 1, x: ((i * 37) % 40) - 20 }; l.castShadow = false; }
  return w;
}

export default {
  id: '111',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE KANGAROO MAIL CARRIER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS KANGAROO', 'DELIVERS THE MAIL.'],
  title: 'This kangaroo delivers the mail',
  description: 'The letters go in the pouch. Every hop, one flies out. The whole street gets everyone\'s mail. (A made-up kangaroo.)',
  tags: ['animalsatwork', 'funny', 'kangaroo', 'mail', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the kangaroo mail carrier is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This kangaroo delivers the mail.',
      show: ['ground', 'street', 'kanga'], sky: '#9ED2F3', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [4, 3, 14], look: [0, 5.6, 2], fov: 46, to: { pos: [3.7, 3, 13], look: [0, 5.5, 2], fov: 44 } },
      update: (w, p, t) => { w.r.letters.forEach(l => { l.visible = true; }); w.kanga.position.set(0, 0, 2); w.kanga.rotation.y = -1.1; w.r.legs.forEach(g => { g.rotation.z = 0; }); w.r.body.rotation.z = 0; w.r.head.rotation.y = .3 * Math.sin(t * 2); },
    },
    {
      say: 'All the letters go in his pouch.',
      show: ['ground', 'street', 'kanga'], sky: '#9ED2F3', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.5, 4.6, 12.5], look: [.4, 4.4, 2], fov: 44, to: { pos: [2.3, 4.5, 11.5], look: [.4, 4.3, 2], fov: 42 } },
      update: (w, p, t) => { w.r.letters.forEach((l, i) => { l.visible = true; l.position.y = 2.95 + .05 * Math.sin(t * 4 + i); }); w.kanga.position.set(0, 0, 2); w.kanga.rotation.y = -1.2; w.r.legs.forEach(g => { g.rotation.z = 0; }); w.r.body.rotation.z = 0; w.r.arms.forEach(a => { a.rotation.z = .3 * Math.sin(t * 5); }); },
    },
    {
      say: 'But every hop, a letter flies out.',
      show: ['ground', 'street', 'kanga', 'flying'], sky: '#9ED2F3', lightAt: [0, 5, 0], lightDist: 22,
      cam: { pos: [3, 7, 22], look: [2, 4.5, 0], fov: 54, to: { pos: [7, 7, 21], look: [6, 4.5, 0], fov: 52 } },
      update: (w, p, t) => {
        w.flying.children.forEach(l => l.scale.setScalar(1)); const f = hop(w.r, t); w.kanga.position.x = -8 + t * 5; w.kanga.position.z = 2; w.kanga.rotation.y = 0; w.r.letters.forEach((l, i) => { l.visible = i >= Math.floor(t * 1.5); });
        w.flying.children.forEach((l, i) => { const u = l.userData, q = (t * .8 + u.ph) % 1; l.visible = i < t * 6; l.position.set(-8 + (u.ph * 3) * 5 + Math.cos(u.a) * q * 2, 4 + q * 3 - q * q * 6.5, 2 + Math.sin(u.a) * q * 3); l.rotation.set(q * 8, u.a, q * 5); });
      },
    },
    {
      say: 'Now the whole street gets everyone\'s mail.',
      show: ['ground', 'street', 'flying', 'kanga'], sky: '#FFD9A8', lightAt: [0, 6, -2], lightDist: 30,
      cam: { pos: [1, 8, 22], look: [1, 4, -2], fov: 56, to: { pos: [1, 7.6, 20.5], look: [1, 4, -2], fov: 54 } },
      update: (w, p, t) => {
        w.kanga.position.set(3.5, 0, 5); w.kanga.rotation.y = -Math.PI / 2; w.r.legs.forEach(g => { g.rotation.z = 0; }); w.r.body.rotation.z = 0; w.r.letters.forEach(l => { l.visible = false; }); w.r.arms.forEach(a => { a.rotation.z = .8; });
        w.flying.children.forEach(l => { const u = l.userData, q = (t * .35 + u.ph) % 1; l.visible = true; l.scale.setScalar(2.4); l.position.set(u.x * .6, 12 - q * 12, -3 + Math.sin(u.a) * 3); l.rotation.set(q * 6 + u.a, u.a, q * 3); });
      },
    },
    {
      say: 'Kangaroo mail: fast, chaotic, or adorable? Comment below.',
      quiz: { q: 'What is kangaroo mail?', options: ['Fast', 'Chaotic', 'Adorable'], answer: 'It is a made-up mail service. All three, and your letter is next door.' },
      show: ['ground', 'street', 'kanga'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 14,
      cam: { pos: [4, 1.5, 14], look: [0, 7.2, 2], fov: 46, to: { pos: [-3, 1.5, 14], look: [0, 7.2, 2] } },
      update: (w, p, t) => { w.r.arms.forEach(a => { a.rotation.z = 0; }); w.r.letters.forEach(l => { l.visible = true; }); w.kanga.position.set(0, 0, 2); w.kanga.rotation.y = -1.1; w.r.legs.forEach(g => { g.rotation.z = 0; }); w.r.body.rotation.z = 0; w.r.head.rotation.y = .3 * Math.sin(t * 2); },
    },
  ],
};
