// Narrative 7: "Animals at Work". A made-up comedy sketch: crabs are not tailors.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the crab with a tape measure next to a shop dummy.

function crab(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const shell = mat('#E2453C', { rough: .5 });
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const b = ball(1.2, shell, [0, 1.3, 0], c.body); b.scale.set(1.4, .6, 1);
  c.eyes = [-.4, .4].map(x => { const g = group([x, 1.8, .7], c.body); cyl(.07, .07, .7, shell, [0, .35, 0], g, 6); ball(.18, mat('#FFFFFF'), [0, .75, 0], g); ball(.09, mat('#111111'), [0, .78, .14], g); return g; });
  c.claws = [-1, 1].map(s => {
    const arm = group([s * 1.4, 1.4, .6], c.body); cyl(.15, .15, 1, shell, [s * .4, .2, .2], arm, 8).rotation.z = s * -1;
    const claw = group([s * .9, .55, .4], arm); const pc = ball(.45, shell, [0, 0, 0], claw); pc.scale.set(1, .7, .6);
    const top = group([0, .1, .3], claw); box(.2, .14, .6, shell, [0, 0, .3], top);
    const bot = group([0, -.1, .3], claw); box(.2, .14, .6, shell, [0, 0, .3], bot);
    return { arm, claw, top, bot };
  });
  c.legs = [];
  for (const s of [-1, 1]) for (let i = 0; i < 3; i++) { const l = group([s * 1.2, 1, -.4 + i * .4], c.root); const sg = cyl(.07, .05, 1.2, shell, [s * .5, -.4, 0], l, 6); sg.rotation.z = s * .9; c.legs.push(l); }
  c.tape = group([0, 1.5, .9], c.body);
  const tp = cyl(.3, .3, .2, mat('#FFD21F'), [0, 0, 0], c.tape, 16); tp.rotation.x = Math.PI / 2;
  box(1.6, .03, .15, mat('#FFE45C'), [.9, -.1, 0], c.tape);
  return c;
}
function snip(c, t, sp = 12) { c.claws.forEach((C, i) => { const o = .3 * Math.max(0, Math.sin(t * sp + i)); C.top.rotation.x = -o; C.bot.rotation.x = o; }); }
function scuttle(c, t, sp = 14) { c.legs.forEach((l, i) => { l.rotation.x = .4 * Math.sin(t * sp + i * 1.3); }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8D2B0', 0);
  w.shop = group();
  box(50, 26, .5, mat('#B8D8E8'), [0, 13, -8], w.shop);
  for (let i = 0; i < 6; i++) box(1.6, 5, .3, mat(['#E2453C', '#2F6FD6', '#22C55E', '#FFD21F', '#8B5CF6', '#FF8A1F'][i]), [-9 + i * 2, 6, -7.5], w.shop);
  box(16, .3, 1, mat('#8B5A2B'), [-5, 8.8, -7.4], w.shop);
  // the dummy
  w.dummy = group([0, 0, 0]);
  cyl(.12, .12, 3, mat('#5A3A1E'), [0, 1.5, 0], w.dummy, 8); cyl(.8, .2, .2, mat('#5A3A1E'), [0, .1, 0], w.dummy, 12);
  w.jacket = group([0, 4.6, 0], w.dummy);
  cyl(1, 1.1, 2.6, mat('#2A3A6A'), [0, 0, 0], w.jacket, 16); ball(.5, mat('#E8D2B0'), [0, 1.8, 0], w.jacket);
  box(.15, 1.4, .1, mat('#FFFFFF'), [0, .4, 1.05], w.jacket);
  w.pants = group([0, 3.3, 0], w.dummy);
  w.legsP = [-.45, .45].map(x => { const g = group([x, 0, 0], w.pants); cyl(.4, .38, 2.8, mat('#2A3A6A'), [0, -1.4, 0], g, 12); return g; });
  w.c = crab(k, k.scene); w.cr = w.c.root;
  w.fabric = group([0, 0, 0]);
  w.fab = box(3.4, .05, 1.6, mat('#2F6FD6', { double: true }), [0, 0, 0], w.fabric);
  w.scraps = group();
  for (let i = 0; i < 10; i++) { const s = box(.5, .03, .3, mat('#2F6FD6'), [0, 0, 0], w.scraps); s.userData = { a: i * .63, ph: (i * .17) % 1 }; s.castShadow = false; }
  return w;
}

export default {
  id: '117',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE CRAB TAILOR',
  year: 'ANIMALS AT WORK',
  hook: ['THIS CRAB', 'BECAME A TAILOR.'],
  title: 'This crab became a tailor',
  description: 'Built-in scissors. Walks sideways. Every suit comes out crooked, and every pair of trousers comes out as shorts. (A made-up crab.)',
  tags: ['animalsatwork', 'funny', 'crab', 'tailor', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the crab tailor and his shop are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This crab became a tailor.',
      show: ['ground', 'shop', 'dummy', 'cr'], sky: '#B8D8E8', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.5, 2.8, 15], look: [.5, 5.6, 0], fov: 48, to: { pos: [2.3, 2.8, 14], look: [.5, 5.5, 0], fov: 46 } },
      update: (w, p, t) => { w.jacket.rotation.z = 0; w.legsP.forEach(g => g.scale.y = 1); w.dummy.position.set(2.2, 0, -1.5); w.cr.position.set(-1, 0, 1); w.cr.rotation.y = .3; snip(w.c, t, 4); scuttle(w.c, 0); w.c.tape.visible = true; },
    },
    {
      say: 'Good news: free scissors. Built in.',
      show: ['ground', 'shop', 'cr', 'fabric', 'scraps'], sky: '#B8D8E8', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [1, 4.6, 9.5], look: [0, 2.6, .8], fov: 46, to: { pos: [.9, 4.5, 8.7], look: [0, 2.6, .8], fov: 44 } },
      update: (w, p, t) => {
        w.cr.position.set(0, 0, 0); w.cr.rotation.y = 0; snip(w.c, t, 16); scuttle(w.c, 0); w.c.tape.visible = false;
        w.fabric.position.set(0, 1.75, 2.4); w.fab.scale.set(Math.max(.2, 1 - t * .3), 1, 1);
        w.scraps.children.forEach(s => { const u = s.userData, q = (t * 1.4 + u.ph) % 1; s.position.set(Math.cos(u.a) * q * 2, 1.9 + q - q * q * 3, 2.4 + Math.sin(u.a) * q); s.rotation.set(q * 6, u.a, q * 3); });
      },
    },
    {
      say: 'Bad news: he only walks sideways. Every suit comes out crooked.',
      show: ['ground', 'shop', 'dummy', 'cr'], sky: '#B8D8E8', lightAt: [0, 4, 1], lightDist: 14,
      cam: { pos: [2, 4, 13], look: [0, 4.4, 0], fov: 50, to: { pos: [1.8, 4, 12], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => {
        w.dummy.position.set(0, 0, -1.5); w.jacket.rotation.z = Math.min(.45, t * .2); w.legsP.forEach(g => g.scale.y = 1);
        w.cr.position.set(-1.6 + 1.6 * Math.sin(t * 1.5), 0, 1.5); w.cr.rotation.y = 0; scuttle(w.c, t, 18); snip(w.c, t, 10); w.c.tape.visible = false;
      },
    },
    {
      say: 'And every pair of trousers? Shorts.',
      show: ['ground', 'shop', 'dummy', 'cr'], sky: '#FFE3C2', lightAt: [0, 4, 1], lightDist: 14,
      cam: { pos: [2, 3.5, 12], look: [0, 3.8, 0], fov: 48, to: { pos: [1.8, 3.5, 11], look: [0, 3.8, 0], fov: 46 } },
      update: (w, p, t) => {
        w.dummy.position.set(0, 0, -1.5); w.jacket.rotation.z = .45; const cut = Math.min(1, Math.max(0, (t - .4) * 1.5)); w.legsP.forEach(g => g.scale.y = 1 - cut * .7);
        w.cr.position.set(1.8, 0, 1); w.cr.rotation.y = -.5; scuttle(w.c, 0); snip(w.c, t, 14); w.c.tape.visible = false;
      },
    },
    {
      say: 'Crab suit: yes, no, or only shorts? Comment below.',
      quiz: { q: 'Would you get a suit from the crab?', options: ['Yes', 'No', 'Only shorts'], answer: 'He is a made-up tailor. Shorts it is.' },
      show: ['ground', 'shop', 'dummy', 'cr'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 12,
      cam: { pos: [2.5, 1.5, 12], look: [.3, 6, 0], fov: 48, to: { pos: [-2.5, 1.5, 12], look: [.3, 6, 0] } },
      update: (w, p, t) => { w.jacket.rotation.z = .45; w.legsP.forEach(g => g.scale.y = .3); w.dummy.position.set(2.2, 0, -1.5); w.cr.position.set(-1, 0, 1); w.cr.rotation.y = .3; snip(w.c, t, 4); scuttle(w.c, 0); w.c.tape.visible = true; },
    },
  ],
};
