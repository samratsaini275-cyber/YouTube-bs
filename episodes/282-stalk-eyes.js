// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855).
// A made-up comedy sketch: people's eyes are not on stalks. Hook: the premise as a question under 2 s; first frame shows a person whose eyes stretch up on long stalks.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.stalks = [-1, 1].map(s => { const g = group([s * .3, .5, .3], p.head); const st = cyl(.06, .06, 1, mat('#F2C9A0'), [0, .5, 0], g, 8); const eye = group([0, 1, 0], g); ball(.2, mat('#FFFFFF'), [0, 0, 0], eye); ball(.1, mat('#111111'), [0, 0, .16], eye); g.userData = { s, st, eye }; return g; });
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
// stalk length L, lean (x tilt fwd), spread
const eyes = (p, L, lean = 0, spread = .25, yaw = 0) => p.stalks.forEach(g => { const { s, st, eye } = g.userData; st.scale.y = L; st.position.y = L / 2; eye.position.y = L; g.rotation.set(lean, yaw, s * -spread); eye.rotation.set(-lean, 0, s * spread); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.ground = k.ground('#7FB069', .005);
  w.wall = group(); box(40, 20, .5, mat('#E8EEDC'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#E2453C'); w.pp = w.p.root;
  w.fence = group(); box(12, 5.2, .3, mat('#B5651D'), [0, 2.6, 0], w.fence); for (let i = 0; i < 12; i++) box(.06, 5.2, .32, mat('#8B4513'), [-5.5 + i, 2.6, 0], w.fence);
  w.dog = group(); const dm = mat('#C98A4B'); const db = ball(.7, dm, [0, .9, 0], w.dog); db.scale.set(1.4, .8, .8); ball(.5, dm, [1, 1.4, 0], w.dog); for (const z of [-1, 1]) ball(.08, mat('#111111'), [1.4, 1.5, z * .2], w.dog);
  w.crowd = group(); w.cr = []; for (let i = 0; i < 4; i++) { const q = person(k, w.crowd, ['#3B6FD6', '#FFC21F', '#8E44AD', '#5FBF5F'][i]); q.stalks.forEach(g => g.visible = false); for (const x of [-.28, .28]) { k.ball(.14, k.mat('#FFFFFF'), [x, .2, .66], q.head); k.ball(.07, k.mat('#111111'), [x, .2, .78], q.head); } q.root.position.set(-3 + i * 2, 0, -1.4); w.cr.push(q); }
  w.stage = group(); box(8, .8, 3, mat('#5A3C22'), [0, .4, -5], w.stage); w.singer = group(); cyl(.5, .5, 2, mat('#E2453C'), [0, 1.8, -5], w.singer, 10); ball(.45, mat('#F2C9A0'), [0, 3.2, -5], w.singer);
  w.shades = group(); for (const s of [-1, 1]) { const l = cyl(.22, .22, .05, mat('#111111'), [s * .3, 0, 0], w.shades, 14); l.rotation.x = Math.PI / 2; } box(.3, .04, .04, mat('#111111'), [0, 0, 0], w.shades);
  w.book = group(); box(1.4, 1, .1, mat('#3B6FD6'), [0, 0, 0], w.book); box(1.3, .9, .02, mat('#FFFFFF'), [0, 0, .06], w.book);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '282',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE STALK EYES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD SNAIL EYES?'],
  title: 'What would happen if humans had eyes on stalks like snails?',
  description: 'See over any fence. Concerts? Front row, from the back. Reading over shoulders gets way too easy. And sunglasses need a redesign. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'snail', 'eyes', 'comedy', 'shorts'],
  sources: ['Comedy sketch: people do not have eye stalks. Quiz fact: many land snails have eyes at the tips of their upper tentacles and can pull them back in (Encyclopaedia Britannica, "snail").'],
  setup,
  scenes: [
    { say: 'What if humans had snail eyes?', show: ['floor', 'wall', 'pp'], sky: '#E8EEDC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 4, 10], look: [0, 5, 0], fov: 52, to: { pos: [0, 4, 9.2], look: [0, 5, 0], fov: 50 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); pose(w.p, .2); eyes(w.p, .3 + Math.min(1, t * .8) * 1.7, 0, .25 + .1 * Math.sin(t * 3)); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Tall fences? Just peek over.', show: ['ground', 'pp', 'fence', 'dog'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [3, 5.4, 10], look: [0, 4.4, -1], fov: 54, to: { pos: [2.8, 5.4, 9.3], look: [0, 4.4, -1], fov: 52 } },
      update: (w, p, t) => { w.fence.position.set(0, 0, -.8); w.dog.position.set(.4, 0, -3); w.dog.rotation.y = .6; stand(w, 0, .4, Math.PI); pose(w.p, .2); eyes(w.p, .3 + Math.min(1, p * 2) * 2.4, .5, .15); } },
    { say: 'Concerts? Front row, from the back.', show: ['floor', 'wall', 'pp', 'crowd', 'stage'], sky: '#2B1B4F', lightAt: [0, 6, 5], lightDist: 16,
      cam: { pos: [0, 6, 9], look: [0, 4.6, -2], fov: 56, to: { pos: [0, 6, 8.4], look: [0, 4.6, -2], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 1.6, Math.PI); pose(w.p, .2); eyes(w.p, 3.2, .35, .2 + .1 * Math.sin(t * 4)); w.cr.forEach((q, i) => { q.root.rotation.y = Math.PI; q.root.position.y = .2 * Math.max(0, Math.sin(t * 8 + i)); }); } },
    { say: 'Reading over shoulders? Way too easy.', show: ['floor', 'wall', 'pp', 'crowd', 'book'], sky: '#E8EEDC', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [3, 5, 8], look: [.4, 4, 0], fov: 50, to: { pos: [2.8, 5, 7.4], look: [.4, 4, 0], fov: 48 } },
      update: (w, p, t) => { w.cr.forEach((q, i) => { q.root.visible = i === 1; q.root.position.set(.8, 0, -.2); q.root.rotation.y = .3; q.root.position.y = 0; }); w.book.position.set(1.1, 3, .9); w.book.rotation.set(-.5, .3, 0); stand(w, -1.2, -1.6, .5); pose(w.p, .2); eyes(w.p, .3 + Math.min(1, p * 2) * 3.1, 1.45, .08, .24); } },
    { say: 'And sunglasses? They need a redesign.', show: ['ground', 'pp', 'shades'], sky: '#FFC27A', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 4.6, 10], look: [0, 5, 0], fov: 52, to: { pos: [0, 4.6, 9.3], look: [0, 5, 0], fov: 50 } },
      update: (w, p, t) => { w.cr.forEach(q => q.root.visible = true); stand(w, 0, 0, 0); pose(w.p, .2); eyes(w.p, 2, 0, .3); w.p.arms[1].rotation.set(-2.4, 0, .3); w.shades.position.set(.3, 3.75 + Math.min(1, p * 1.5) * .3, .9); w.p.mouth.scale.set(1, .6, 1); } },
    { say: 'Snail eyes: useful, awesome, or way too creepy? Comment below.',
      quiz: { q: 'Would you want snail eyes?', options: ['Useful', 'Awesome', 'Way too creepy'], answer: 'Made up for people. Land snails have eyes on tentacle tips.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.4, 9], look: [0, 5.4, 0], fov: 50, to: { pos: [-1, 1.4, 9], look: [0, 5.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, .2); pose(w.p, .2); eyes(w.p, 1.2 + .8 * Math.sin(t * 2), 0, .3); } },
  ],
};
