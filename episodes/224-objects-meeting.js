// Narrative 13: "Objects With Opinions (season 2)". Season finale: the season's objects hold a meeting.
// Hook rule: first line names the premise under 2 s; first frame shows the objects together with faces.

function football(k, parent) {
  const { mat, ball, box, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  ball(1, mat('#F7F7F7', { rough: .5 }), [0, 0, 0], b.body);
  const pts = [[0, 1, 0], [0, -1, 0], [-.7, .3, -.6], [-.7, -.3, .6], [-.2, .6, -.78], [-.4, -.7, -.6], [-.95, .1, 0]];
  for (const [x, y, z] of pts) { const l = Math.hypot(x, y, z); const p = ball(.3, mat('#1A1A1A'), [x / l * .9, y / l * .9, z / l * .9], b.body); p.scale.setScalar(1); }
  b.face = group([0, 0, 0], b.body);
  for (const z of [-.32, .32]) { ball(.2, mat('#FFFFFF'), [.86, .25, z], b.face); ball(.1, mat('#111111'), [1.02, .25, z], b.face); }
  b.brows = [-.32, .32].map(z => box(.05, .06, .3, mat('#111111'), [.98, .5, z], b.face));
  b.mouth = box(.05, .1, .4, mat('#5A1E1E'), [1, -.3, 0], b.face);
  return b;
}
function pencil(k, parent) {
  const { mat, cyl, cone, ball, box, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  p.shaft = cyl(.5, .5, 6, mat('#FFC21F', { rough: .5 }), [0, 3.6, 0], p.body, 6);
  p.wood = cone(.5, 1.1, mat('#E8C49A'), [0, .05, 0], p.body, 6); p.wood.rotation.x = Math.PI; p.wood.position.y = .55;
  p.lead = cone(.17, .4, mat('#333333'), [0, 0, 0], p.body, 8); p.lead.rotation.x = Math.PI; p.lead.position.y = .02;
  p.band = cyl(.52, .52, .5, mat('#B8BFC9', { metal: .7, rough: .3 }), [0, 6.85, 0], p.body, 12);
  p.eraser = cyl(.5, .5, .7, mat('#F48FB1'), [0, 7.45, 0], p.body, 12);
  p.face = group([0, 4.6, .5], p.body);
  for (const x of [-.2, .2]) { ball(.16, mat('#FFFFFF'), [x, .2, 0], p.face); ball(.08, mat('#111111'), [x, .2, .12], p.face); }
  p.brows = [-.2, .2].map(x => box(.24, .05, .05, mat('#111111'), [x, .42, .05], p.face));
  p.mouth = box(.3, .08, .05, mat('#5A1E1E'), [0, -.15, .03], p.face);
  p.bites = k.group([0, 0, 0], p.body); for (let i = 0; i < 6; i++) { const b = box(.25, .12, .2, mat('#C9A06A'), [Math.cos(i) * .45, 5.6 + (i % 3) * .3, Math.sin(i) * .45], p.bites); b.rotation.y = -i; }
  return p;
}
function kettle(k, parent) {
  const { mat, box, ball, cyl, cone, group } = k;
  const e = { root: group([0, 0, 0], parent) };
  e.body = group([0, 0, 0], e.root);
  const shell = mat('#7FC8E8', { rough: .35 });
  cyl(1.5, 1.8, 3.2, shell, [0, 1.8, 0], e.body, 24);
  cyl(1.9, 1.9, .3, mat('#2A2A2A'), [0, .15, 0], e.body, 24);
  e.lid = group([0, 3.45, 0], e.body); cyl(1.45, 1.45, .2, shell, [0, 0, 0], e.lid, 24); ball(.3, mat('#2A2A2A'), [0, .25, 0], e.lid);
  const sp = cone(.55, 1.8, shell, [-1.9, 2.6, 0], e.body, 12); sp.rotation.z = Math.PI / 2 - .55;
  const h = k.torus(1, .2, mat('#2A2A2A'), [1.6, 2.2, 0], e.body); h.scale.set(.6, 1, 1);
  e.face = group([0, 1.9, 1.62], e.body);
  for (const x of [-.4, .4]) { ball(.24, mat('#FFFFFF'), [x, .3, 0], e.face); ball(.12, mat('#111111'), [x, .3, .16], e.face); }
  e.brows = [-.4, .4].map(x => box(.36, .06, .05, mat('#111111'), [x, .65, .05], e.face));
  e.mouth = box(.5, .1, .05, mat('#5A1E1E'), [0, -.25, .05], e.face);
  return e;
}
function lamp(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const l = { root: group([0, 0, 0], parent) };
  l.body = group([0, 0, 0], l.root);
  cyl(1.2, 1.4, .4, mat('#2F6FD6', { rough: .4 }), [0, .2, 0], l.body, 20);
  cyl(.15, .15, 3.6, mat('#C0C8D0', { metal: .7, rough: .3 }), [0, 2.2, 0], l.body, 10);
  l.bulb = ball(.45, mat('#FFF4C2', { glow: 1 }), [0, 4.1, 0], l.body);
  l.shade = cyl(.9, 1.7, 1.8, mat('#FFC21F', { rough: .7 }), [0, 4.6, 0], l.body, 24); l.shade.material.side = 2;
  l.face = group([0, 4.55, 1.35], l.body); l.face.rotation.x = -.42;
  for (const x of [-.4, .4]) { ball(.22, mat('#FFFFFF'), [x, .15, 0], l.face); ball(.11, mat('#111111'), [x, .15, .15], l.face); }
  l.brows = [-.4, .4].map(x => box(.32, .06, .05, mat('#111111'), [x, .45, .04], l.face));
  l.mouth = box(.4, .09, .05, mat('#5A1E1E'), [0, -.3, .02], l.face);
  l.glow = cyl(.2, 2.6, 3.6, mat('#FFF4C2', { glow: .6 }), [0, 2.1, 0], l.body, 24); l.glow.material.transparent = true; l.glow.material.opacity = .22; l.glow.castShadow = false;
  return l;
}
function duck(k, parent, col = '#FFD21F', s = 1) {
  const { mat, box, ball, cone, group } = k;
  const d = { root: group([0, 0, 0], parent) };
  d.root.scale.setScalar(s);
  d.body = group([0, 0, 0], d.root);
  const b = ball(1.3, mat(col, { rough: .3 }), [0, 1.1, 0], d.body); b.scale.set(1.25, .85, 1);
  const tail = cone(.4, .8, mat(col, { rough: .3 }), [-1.5, 1.6, 0], d.body, 8); tail.rotation.z = .9;
  d.head = group([.9, 2.5, 0], d.body); ball(.8, mat(col, { rough: .3 }), [0, 0, 0], d.head);
  d.beak = group([.75, -.1, 0], d.head); const up = box(.6, .18, .6, mat('#F97316'), [.2, .06, 0], d.beak); d.lower = box(.55, .14, .55, mat('#F97316'), [.18, -.1, 0], d.beak);
  for (const z of [-.38, .38]) { ball(.2, mat('#FFFFFF'), [.55, .3, z], d.head); ball(.1, mat('#111111'), [.68, .3, z], d.head); }
  d.brows = [-.38, .38].map(z => box(.05, .05, .3, mat('#111111'), [.62, .55, z], d.head));
  return d;
}

const talkM = (m, t, on = true, k = 0) => { m.scale.y = on ? 1 + 2.4 * Math.abs(Math.sin(t * 14 + k)) : 1; };

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#B98A5E', 0);
  w.wall = box(60, 30, .5, mat('#E8DCC8'), [0, 15, -6]); w.wall.castShadow = false;
  w.table = group(); box(14, .4, 5, mat('#8A5A3B'), [0, 2, 0], w.table); for (const x of [-6.5, 6.5]) for (const z of [-2, 2]) box(.4, 2, .4, mat('#6B4428'), [x, 1, z], w.table);
  w.banner = group(); box(12, 1.6, .1, mat('#E2453C'), [0, 9.5, -5.6], w.banner);
  w.ball = football(k, k.scene); w.fb = w.ball.root;
  w.pen = pencil(k, k.scene); w.pc = w.pen.root; w.pen.bites.visible = false; w.pc.scale.setScalar(.55);
  w.ket = kettle(k, k.scene); w.kt = w.ket.root; w.kt.scale.setScalar(.8);
  w.lmp = lamp(k, k.scene); w.lp = w.lmp.root; w.lp.scale.setScalar(.75);
  w.dk = duck(k, k.scene); w.dd = w.dk.root; w.dd.scale.setScalar(.75);
  w.gavel = group(); cyl(.25, .25, 1, mat('#6B4428'), [0, 0, 0], w.gavel, 10).rotation.z = Math.PI / 2; cyl(.08, .08, 1.4, mat('#6B4428'), [0, -.7, 0], w.gavel, 8);
  w.sign = group(); box(3.2, 1.6, .1, mat('#FFFFFF'), [0, 1.2, 0], w.sign); box(.12, 2, .12, mat('#8A5A3B'), [0, 0, -.1], w.sign);
  w.hearts = group(); for (let i = 0; i < 6; i++) { const h = group([0, 0, 0], w.hearts); const m = mat('#FF4D6D', { glow: .7 }); ball(.2, m, [-.12, 0, 0], h); ball(.2, m, [.12, 0, 0], h); const c = k.cone(.27, .38, m, [0, -.22, 0], h, 12); c.rotation.x = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

const seat = (w, t, who = -1) => {
  w.fb.position.set(-4.6, 3.2, .6); w.fb.rotation.set(0, -1.4, 0); talkM(w.ball.mouth, t, who === 0);
  w.pc.position.set(-2.3, 2.2, .6); w.pc.rotation.set(0, 0, 0); talkM(w.pen.mouth, t, who === 1);
  w.kt.position.set(0, 2.2, .4); w.kt.rotation.set(0, 0, 0); talkM(w.ket.mouth, t, who === 2);
  w.lp.position.set(2.4, 2.2, .4); w.lp.rotation.set(0, 0, 0); talkM(w.lmp.mouth, t, who === 3);
  w.dd.position.set(4.6, 2.2, .6); w.dd.rotation.set(0, -1.3, 0); w.dk.lower.position.y = who === 4 ? -.1 - .18 * Math.abs(Math.sin(t * 14)) : -.1;
  [w.fb, w.pc, w.kt, w.lp, w.dd].forEach((o, i) => { if (i === who) o.position.y += .15 * Math.abs(Math.sin(t * 7)); });
};

export default {
  id: '224',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE MEETING',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['EVERY OBJECT', 'HAS A COMPLAINT'],
  title: 'Every object has a complaint',
  description: 'Season finale. The football, the pencil, the kettle, the lamp and the rubber duck finally meet. They have demands. (A made-up comedy sketch.)',
  tags: ['funny', 'talkingobjects', 'comedy', 'finale', 'shorts'],
  sources: [
    'Quiz fact: the word "robot" comes from the Czech word "robota", meaning forced labour, and was first used in Karel Čapek\'s 1920 play R.U.R. (Encyclopaedia Britannica, "robot").',
  ],
  setup,
  scenes: [
    {
      say: 'Every object has a complaint.',
      show: ['floor', 'wall', 'table', 'banner', 'fb', 'pc', 'kt', 'lp', 'dd'], sky: '#E8DCC8', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [0, 5.6, 25], look: [0, 4.9, 0], fov: 48, to: { pos: [0, 5.6, 24], look: [0, 4.9, 0], fov: 47 } },
      update: (w, p, t) => { seat(w, t, Math.floor(t * 3) % 5); },
    },
    {
      say: 'So today, they held a meeting.',
      show: ['floor', 'wall', 'table', 'banner', 'fb', 'pc', 'kt', 'lp', 'dd', 'gavel'], sky: '#E8DCC8', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [0, 5.6, 25], look: [0, 4.9, 0], fov: 48, to: { pos: [0, 5.6, 24], look: [0, 4.9, 0], fov: 47 } },
      update: (w, p, t) => { seat(w, t, 2); w.gavel.position.set(.9, 3 + Math.abs(Math.sin(t * 6)) * .8, 1.6); w.gavel.rotation.z = -.4 + .4 * Math.sin(t * 6); },
    },
    {
      say: 'The football said: stop kicking.',
      show: ['floor', 'wall', 'table', 'fb', 'pc'], sky: '#E8DCC8', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [-1.6, 3.8, 7], look: [-3.8, 3.1, 0], fov: 46, to: { pos: [-1.8, 3.8, 6.3], look: [-3.8, 3.1, 0], fov: 44 } },
      update: (w, p, t) => { seat(w, t, 0); w.ball.brows.forEach((b, i) => b.rotation.x = (i ? -1 : 1) * .5); },
    },
    {
      say: 'The kettle said: clean me.',
      show: ['floor', 'wall', 'table', 'kt', 'pc', 'lp'], sky: '#E8DCC8', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [.6, 4, 10.5], look: [0, 3.4, 0], fov: 46, to: { pos: [.6, 4, 9.8], look: [0, 3.4, 0], fov: 44 } },
      update: (w, p, t) => { seat(w, t, 2); w.ket.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * .5); },
    },
    {
      say: 'And the duck? Just wanted a pond.',
      show: ['floor', 'wall', 'table', 'dd', 'lp'], sky: '#E8DCC8', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [6.4, 4, 9], look: [4.8, 3.6, 0], fov: 46, to: { pos: [6.3, 4, 8.3], look: [4.8, 3.6, 0], fov: 44 } },
      update: (w, p, t) => { seat(w, t, 4); w.dk.brows.forEach((b, i) => b.rotation.x = (i ? 1 : -1) * .3); },
    },
    {
      say: 'Fair. Be nice to your stuff.',
      show: ['floor', 'wall', 'table', 'banner', 'fb', 'pc', 'kt', 'lp', 'dd', 'hearts'], sky: '#F7C99A', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [0, 5.6, 25], look: [0, 4.9, 0], fov: 48, to: { pos: [0, 5.6, 24], look: [0, 4.9, 0], fov: 47 } },
      update: (w, p, t) => { seat(w, t, -1); [w.fb, w.pc, w.kt, w.lp, w.dd].forEach((o, i) => o.position.y += .12 * Math.abs(Math.sin(t * 5 + i))); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .6 + i / 6) % 1; h.position.set(-5 + i * 2, 6.5 + q * 2.5, .6); h.scale.setScalar(Math.sin(q * Math.PI) * 1.3); }); },
    },
    {
      say: 'Which object is the grumpiest: the football, the kettle, or the duck? Comment below.',
      quiz: { q: 'Which object is the grumpiest?', options: ['The football', 'The kettle', 'The duck'], answer: 'Fun fact: the word robot comes from a Czech word meaning forced work.' },
      show: ['floor', 'wall', 'table', 'fb', 'pc', 'kt', 'lp', 'dd'], sky: '#274B73', lightAt: [0, 8, 4], lightDist: 22,
      cam: { pos: [6, 5.8, 24], look: [0, 3.6, 0], fov: 48, to: { pos: [-6, 5.8, 24], look: [0, 3.6, 0] } },
      update: (w, p, t) => { seat(w, t, -1); },
    },
  ],
};
