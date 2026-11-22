// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: shoes do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the shoe with a face.

function shoe(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  s.body = group([0, 0, 0], s.root);
  box(4.4, .4, 1.8, mat('#FFFFFF'), [0, .2, 0], s.body);
  const up = mat('#E2453C', { rough: .6 });
  const toe = ball(1, up, [1.2, .75, 0], s.body); toe.scale.set(1.3, .65, .9);
  box(2.6, 1.6, 1.7, up, [-.7, 1.2, 0], s.body);
  box(1.4, .5, 1.75, mat('#FFFFFF'), [-1.6, 2.1, 0], s.body);
  s.laces = group([0, 0, 0], s.body); for (let i = 0; i < 4; i++) { const l = box(.12, .08, 1.2, mat('#FFFFFF'), [.4 - i * .45, 1.55 + i * .16, 0], s.laces); l.rotation.y = (i % 2 ? .4 : -.4); }
  s.face = group([2.45, .85, 0], s.body);
  for (const z of [-.35, .35]) { const e = ball(.22, mat('#FFFFFF'), [0, .2, z], s.face); e.scale.x = .5; ball(.11, mat('#111111'), [.09, .2, z], s.face); }
  s.brows = [-.35, .35].map(z => box(.05, .05, .3, mat('#111111'), [.03, .48, z], s.face));
  s.mouth = box(.05, .08, .45, mat('#5A1E1E'), [.02, -.18, 0], s.face);
  return s;
}
function talk(s, t, on = true) { s.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(s, a) { s.brows.forEach((b, i) => b.rotation.x = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#B98A5E', 0);
  w.wall = box(60, 30, .5, mat('#DDE7D3'), [0, 15, -8]); w.wall.castShadow = false;
  w.s = shoe(k, k.scene); w.sh = w.s.root;
  w.foot = group(); cyl(.9, .9, 7, mat('#2F6FD6'), [-.6, 4.6, 0], w.foot, 14); ball(.9, mat('#F2C9A0'), [-.6, 8, 0], w.foot).scale.set(.1, .1, .1);
  w.stink = group(); for (let i = 0; i < 3; i++) { const g = group([0, 0, 0], w.stink); for (let j = 0; j < 5; j++) { const b = ball(.18, mat('#9BCB4A', { glow: .4 }), [Math.sin(j * 1.3) * .3, j * .35, 0], g); b.castShadow = false; } g.userData.i = i; }
  w.knot = group(); for (let i = 0; i < 6; i++) { const l = k.torus(.35, .07, mat('#FFFFFF'), [Math.cos(i) * .3, 0, Math.sin(i * 2) * .3], w.knot); l.rotation.set(i, i * 2, 0); l.castShadow = false; }
  w.door = group(); box(4, 8, .3, mat('#8A5A3B'), [0, 4, 0], w.door); box(.3, .3, .3, mat('#FFC21F', { metal: .7 }), [1.5, 4, .2], w.door);
  w.mud = group(); for (let i = 0; i < 6; i++) { const m = cyl(.35, .35, .03, mat('#6B4A2B'), [0, .02, 0], w.mud, 10); m.scale.set(1.4, 1, .8); m.userData.i = i; m.castShadow = false; }
  return w;
}

const place = (w, x, z, ry, t, on = true) => { w.sh.position.set(x, 0, z); w.sh.rotation.set(0, ry, 0); w.s.body.rotation.set(0, 0, 0); w.s.body.scale.set(1, 1, 1); talk(w.s, t, on); };

export default {
  id: '208',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SHOE',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS SHOE', 'HAS A COMPLAINT'],
  title: 'This shoe has a complaint',
  description: 'Stepped on all day. Stuck with the smelliest feet. Laces in knots every morning. So the shoe went for a walk on his own. (A made-up comedy sketch.)',
  tags: ['funny', 'shoe', 'trainers', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: each human foot has about 250,000 sweat glands (Cleveland Clinic, "Sweaty Feet (Plantar Hyperhidrosis)").',
  ],
  setup,
  scenes: [
    {
      say: 'This shoe has a complaint.',
      show: ['floor', 'wall', 'sh'], sky: '#DDE7D3', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [9.5, 2.4, 4.8], look: [0, 1.05, 0], fov: 46, to: { pos: [8.7, 2.4, 4.4], look: [0, 1.05, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, -.4, t); grump(w.s, .35); },
    },
    {
      say: 'All day, he gets stepped in.',
      show: ['floor', 'wall', 'sh', 'foot'], sky: '#DDE7D3', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [9, 3.4, 6], look: [0, 1.15, 0], fov: 50, to: { pos: [8.3, 3.4, 5.5], look: [0, 1.15, 0], fov: 48 } },
      update: (w, p, t) => { place(w, 0, 0, -.4, t); const q = Math.min(1, t / .8); w.foot.position.set(0, 4 * (1 - q), 0); w.foot.rotation.y = -.4; w.s.body.scale.set(1 + .08 * q, 1 - .1 * q, 1 + .08 * q); grump(w.s, .55); },
    },
    {
      say: 'And those feet? So smelly.',
      show: ['floor', 'wall', 'sh', 'stink'], sky: '#C9D99A', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [8.5, 1.6, 5.4], look: [0, .9, 0], fov: 48, to: { pos: [7.8, 1.6, 5], look: [0, .9, 0], fov: 46 } },
      update: (w, p, t) => {
        place(w, 0, 0, -.4, t); grump(w.s, -.3); w.s.mouth.scale.y = 2.6; w.sh.position.x = .05 * Math.sin(t * 40);
        w.stink.children.forEach(g => { const i = g.userData.i, q = (t * .6 + i / 3) % 1; g.position.set(-1.2 + i * .6, 2.2 + q * 2.4, Math.sin(i) * .4); g.rotation.y = t + i; g.scale.setScalar(Math.sin(q * Math.PI) * 1.3); });
      },
    },
    {
      say: 'Every morning, knots.',
      show: ['floor', 'wall', 'sh', 'knot'], sky: '#DDE7D3', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [8.5, 1.8, 5], look: [0, .8, 0], fov: 48, to: { pos: [7.8, 1.8, 4.6], look: [0, .8, 0], fov: 46 } },
      update: (w, p, t) => { place(w, 0, 0, -.4, t); grump(w.s, .6); w.knot.position.set(-.3, 2.1, 0); w.knot.rotation.set(t * 2, t * 3, 0); w.knot.scale.setScalar(1 + .5 * p); },
    },
    {
      say: 'So one day, he walked off. Alone.',
      show: ['floor', 'wall', 'sh', 'door', 'mud'], sky: '#F7C99A', lightAt: [0, 6, 2], lightDist: 22,
      cam: { pos: [6, 3.6, 11], look: [-1, 2.4, 0], fov: 46, to: { pos: [5.6, 3.6, 10.2], look: [-1, 2.4, 0], fov: 44 } },
      update: (w, p, t) => {
        w.door.position.set(-6, 0, -2); const x = 3 - p * 7.5; place(w, x, 0, Math.PI, t, false); w.s.mouth.scale.y = 1; grump(w.s, -.25);
        w.s.body.position.y = Math.abs(Math.sin(t * 7)) * .5; w.s.body.rotation.z = .15 * Math.sin(t * 7);
        w.mud.children.forEach(m => { const i = m.userData.i, mx = 3 - i * 1.3; m.visible = mx > x + .5; m.position.set(mx, .02, i % 2 ? .5 : -.5); });
      },
    },
    {
      say: 'Grumpy shoe: wear it, wash it, or let it go? Comment below.',
      quiz: { q: 'What do you do with the grumpy shoe?', options: ['Wear it', 'Wash it', 'Let it go'], answer: 'Fun fact: each human foot has about 250,000 sweat glands.' },
      show: ['floor', 'wall', 'sh'], sky: '#274B73', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [8, 3, 4], look: [0, 1.5, 0], fov: 46, to: { pos: [-8, 3, 4], look: [0, 1.5, 0] } },
      update: (w, p, t) => { place(w, 0, 0, -.4, t, false); w.s.body.position.y = 0; grump(w.s, -.2); },
    },
  ],
};
