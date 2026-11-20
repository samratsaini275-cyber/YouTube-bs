// Narrative 8: "Objects With Opinions". A made-up comedy sketch: pillows do not talk; nobody is hurt (the pillow fight is gentle).
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the pillow with a face on a bed.

function pillow(k, parent, color = '#F4F1E8') {
  const { mat, box, cyl, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  p.puff = ball(1, mat(color, { rough: .9 }), [0, 0, 0], p.body); p.puff.scale.set(2, .6, 1.2);
  for (const x of [-.4, .4]) { ball(.16, mat('#FFFFFF'), [x, .25, 1.05], p.body); ball(.08, mat('#111111'), [x, .25, 1.18], p.body); }
  p.mouth = box(.4, .07, .05, mat('#5A1E1E'), [0, -.05, 1.15], p.body);
  return p;
}
function talk(p, t, on = true) { p.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#8B6B4A', 0);
  w.room = group();
  box(40, 20, .5, mat('#C9D6E8'), [0, 10, -8], w.room);
  w.bed = group([0, 0, 0]);
  box(6, 1.8, 9, mat('#8B5A2B'), [0, .9, 0], w.bed); box(5.8, .8, 8.8, mat('#FFFFFF'), [0, 2.2, 0], w.bed);
  box(6.2, 4, .5, mat('#8B5A2B'), [0, 3, -4.6], w.bed);
  w.blanket = box(5.9, .3, 5, mat('#2F6FD6'), [0, 2.75, 1.8], w.bed);
  w.p = pillow(k, k.scene); w.pl = w.p.root;
  w.p2 = pillow(k, k.scene, '#FFD1DC'); w.pl2 = w.p2.root;
  w.drool = ball(.35, mat('#9ED2F3', { opacity: .6, rough: .05 }), [0, 0, 0], k.scene); w.drool.scale.set(1.4, .2, 1);
  w.fist = group([0, 0, 0]); ball(.5, mat('#F2C9A0'), [0, 0, 0], w.fist); cyl(.35, .35, 2.4, mat('#2F6FD6'), [0, 0, 1.4], w.fist, 10).rotation.x = Math.PI / 2;
  w.feathers = group();
  for (let i = 0; i < 12; i++) { const f = box(.3, .03, .12, mat('#FFFFFF'), [0, 0, 0], w.feathers); f.userData = { a: i * .52, ph: (i * .17) % 1 }; f.castShadow = false; }
  w.sign = group([0, 0, 0]);
  cyl(.04, .04, 1.8, mat('#5A3A1E'), [0, .9, 0], w.sign, 6); box(1.6, .9, .05, mat('#FFFFFF'), [0, 1.8, 0], w.sign);
  box(1.3, .14, .06, mat('#E2453C'), [0, 2, .01], w.sign); box(1, .14, .06, mat('#E2453C'), [0, 1.65, .01], w.sign);
  w.book = group([0, 0, 0]); box(1.6, .4, 2.2, mat('#8B3A2E'), [0, 0, 0], w.book); box(1.5, .35, 2.1, mat('#F4F1E8'), [.05, 0, 0], w.book);
  w.head = ball(.8, mat('#F2C9A0'), [0, 0, 0], k.scene);
  return w;
}

export default {
  id: '129',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PILLOW WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS PILLOW', 'HAS A COMPLAINT.'],
  title: 'This pillow has a complaint',
  description: 'Drooled on. Punched to "fluff it up". Thrown in pillow fights. So he went on strike. (A made-up talking pillow.)',
  tags: ['objectswithopinions', 'funny', 'pillow', 'bedtime', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking pillows are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This pillow has a complaint.',
      show: ['ground', 'room', 'bed', 'pl'], sky: '#C9D6E8', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.8, 5.2, 7], look: [0, 5.2, -3.2], fov: 44, to: { pos: [1.7, 5.2, 6.3], look: [0, 5.1, -3.2], fov: 42 } },
      update: (w, p, t) => { w.pl.position.set(0, 3.2, -3.2); w.pl.rotation.set(-.3, 0, 0); w.p.puff.scale.set(2, .6, 1.2); talk(w.p, t, t > .2); },
    },
    {
      say: 'Every night, he gets drooled on.',
      show: ['ground', 'room', 'bed', 'pl', 'drool', 'head'], sky: '#3A4A6A', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.5, 5.5, 3], look: [0, 3.6, -3], fov: 44, to: { pos: [1.4, 5.5, 2.4], look: [0, 3.6, -3], fov: 42 } },
      update: (w, p, t) => { w.pl.position.set(0, 3.2, -3.2); w.pl.rotation.set(-.3, 0, 0); talk(w.p, t); w.head.position.set(-.6, 4, -2.8); w.drool.position.set(-.3, 3.75, -2.2); w.drool.scale.set(1.4 * Math.min(1, .3 + t * .5), .2, 1 * Math.min(1, .3 + t * .5)); },
    },
    {
      say: 'Every morning, he gets punched. To fluff him up.',
      show: ['ground', 'room', 'bed', 'pl', 'fist', 'feathers'], sky: '#FFE3C2', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [2, 5, 4], look: [0, 4, -3], fov: 46, to: { pos: [1.8, 5, 3.3], look: [0, 4, -3], fov: 44 } },
      shake: (t) => Math.sin(t * 8) > .8 ? .06 : 0,
      update: (w, p, t) => {
        w.pl.position.set(0, 3.2, -3.2); w.pl.rotation.set(-.3, 0, 0); talk(w.p, t); const hit = Math.max(0, Math.sin(t * 8));
        w.p.puff.scale.set(2 + hit * .3, .6 - hit * .25, 1.2); w.fist.position.set(.3, 4.6 - hit * .8, -1.6 + hit * .2);
        w.feathers.children.forEach(f => { const u = f.userData, q = (t * 1.3 + u.ph) % 1; f.position.set(Math.cos(u.a) * q * 2, 4 + q * 2 - q * q * 2, -3 + Math.sin(u.a) * q); f.rotation.set(q * 6, u.a, q * 3); });
      },
    },
    {
      say: 'So he went on strike. Now his owner sleeps on a book.',
      show: ['ground', 'room', 'bed', 'pl', 'sign', 'book', 'head'], sky: '#3A4A6A', lightAt: [0, 4, 0], lightDist: 12,
      cam: { pos: [3, 6.5, 7], look: [1.2, 4, -2], fov: 54, to: { pos: [2.9, 6.5, 6.3], look: [1.2, 4, -2], fov: 52 } },
      update: (w, p, t) => {
        w.p.puff.scale.set(2, .6, 1.2); w.pl.position.set(2.1, 3.2, -.2); w.pl.rotation.set(0, -.4, 0); talk(w.p, t, t < 1.8);
        w.sign.position.set(2.6, 2.6, -1.6); w.sign.rotation.y = -.3; w.book.position.set(0, 2.8, -3.2); w.head.position.set(0, 3.7, -3);
      },
    },
    {
      say: 'Pillow: fluff it, flip it, or leave it alone? Comment below.',
      quiz: { q: 'How do you treat your pillow?', options: ['Fluff it', 'Flip it', 'Leave it alone'], answer: 'This pillow is made up. It votes for leave it alone.' },
      show: ['ground', 'room', 'bed', 'pl'], sky: '#274B73', lightAt: [0, 4, 0], lightDist: 10,
      cam: { pos: [1.5, 4.2, 4], look: [0, 5.6, -3.2], fov: 44, to: { pos: [-1.5, 4.2, 4], look: [0, 5.6, -3.2] } },
      update: (w, p, t) => { w.pl.position.set(0, 3.2, -3.2); w.pl.rotation.set(-.3, 0, 0); w.p.puff.scale.set(2, .6, 1.2); talk(w.p, t, false); },
    },
  ],
};
