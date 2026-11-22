// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: pencils do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the pencil with a face.

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
function talk(p, t, on = true) { p.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(p, a) { p.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.desk = k.ground('#C79A5B', 0);
  w.wall = box(60, 30, .5, mat('#DCE8F2'), [0, 15, -8]); w.wall.castShadow = false;
  w.paper = box(7, .05, 9, mat('#FFFFFF'), [3, .03, 0]);
  w.p = pencil(k, k.scene); w.pc = w.p.root;
  w.sharp = group(); box(2.2, 1.6, 1.6, mat('#2F6FD6'), [0, .8, 0], w.sharp); cyl(.55, .55, .3, mat('#111111'), [0, 1.6, 0], w.sharp, 12);
  w.shav = group(); for (let i = 0; i < 10; i++) { const s = ball(.22, mat(i % 2 ? '#E8C49A' : '#FFC21F'), [0, 0, 0], w.shav); s.scale.set(1, .25, 1); s.userData.i = i; s.castShadow = false; }
  w.crumbs = group(); for (let i = 0; i < 8; i++) { const c = box(.18, .12, .18, mat('#F48FB1'), [0, 0, 0], w.crumbs); c.userData.i = i; c.castShadow = false; }
  w.scribble = group(); for (let i = 0; i < 8; i++) { const l = box(1.2, .03, .06, mat('#333333'), [1 + (i % 4) * .9, .07, -2 + Math.floor(i / 4) * 1.2], w.scribble); l.rotation.y = .6 * Math.sin(i * 3); l.castShadow = false; }
  w.sofa = group(); box(9, 2.5, 4, mat('#7A4BC2'), [0, 1.25, 0], w.sofa); box(9, 3, 1, mat('#6A3DB0'), [0, 3.5, -1.6], w.sofa); for (const x of [-4.2, 4.2]) box(1, 3, 4, mat('#6A3DB0'), [x, 2.5, 0], w.sofa);
  w.coins = group(); for (let i = 0; i < 4; i++) { const c = cyl(.3, .3, .06, mat('#FFC21F', { metal: .8, rough: .3 }), [-2 + i * 1.1, 2.55, .8 + (i % 2) * .4], w.coins, 14); c.castShadow = false; }
  return w;
}

const stand = (w, x, y, z, ry, t, on = true) => { w.pc.position.set(x, y, z); w.pc.rotation.set(0, ry, 0); w.p.body.rotation.set(0, 0, 0); talk(w.p, t, on); };

export default {
  id: '206',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PENCIL',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS PENCIL', 'HAS A COMPLAINT'],
  title: 'This pencil has a complaint',
  description: 'Sharpened every day. Chewed in every exam. His eraser lasted one week. So the pencil made a run for it. (A made-up comedy sketch.)',
  tags: ['funny', 'pencil', 'school', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: pencil "lead" is a mix of graphite and clay and contains no lead (Royal Society of Chemistry, "Graphite").',
  ],
  setup,
  scenes: [
    {
      say: 'This pencil has a complaint.',
      show: ['desk', 'wall', 'pc', 'paper'], sky: '#DCE8F2', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [1.5, 5, 8], look: [0, 5.5, 0], fov: 46, to: { pos: [1.4, 5, 7.2], look: [0, 5.5, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, t); grump(w.p, .35); w.p.bites.visible = false; },
    },
    {
      say: 'Every day, he gets sharpened.',
      show: ['desk', 'wall', 'pc', 'sharp', 'shav'], sky: '#DCE8F2', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [2, 6, 10], look: [0, 6.6, 0], fov: 64, to: { pos: [1.8, 6, 9.4], look: [0, 6.6, 0], fov: 62 } },
      update: (w, p, t) => {
        w.sharp.position.set(0, 0, 0); stand(w, 0, 1.1, 0, .25 * Math.sin(t * 8), t); w.pc.position.y = 1.1 - .05 * Math.abs(Math.sin(t * 16)); w.p.face.visible = true; grump(w.p, .5); w.p.bites.visible = false; w.p.mouth.scale.y = 3;
        w.shav.children.forEach(s => { const i = s.userData.i, q = (t * 1.3 + i / 10) % 1; s.position.set(Math.cos(i * 2) * (1 + q * 2.5), 1.6 - q * 1.5 + Math.sin(q * Math.PI), Math.sin(i * 2) * (1 + q * 2)); s.rotation.y = t * 4 + i; });
      },
    },
    {
      say: 'In every exam, he gets chewed.',
      show: ['desk', 'wall', 'pc', 'paper'], sky: '#DCE8F2', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [1.5, 4.4, 8], look: [0, 4.6, 0], fov: 46, to: { pos: [1.4, 4.4, 7.2], look: [0, 4.6, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, t); grump(w.p, .55); w.p.bites.visible = true; w.p.bites.children.forEach((b, i) => b.visible = i < 1 + p * 6); w.pc.position.x = .08 * Math.sin(t * 30); },
    },
    {
      say: 'His eraser? Gone in one week.',
      show: ['desk', 'wall', 'pc', 'paper', 'crumbs', 'scribble'], sky: '#DCE8F2', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [1.5, 5.8, 9], look: [.6, 5.4, 0], fov: 46, to: { pos: [1.4, 5.8, 8.2], look: [.6, 5.4, 0], fov: 44 } },
      update: (w, p, t) => {
        stand(w, 0, 0, 0, 0, t); grump(w.p, .5); w.p.bites.visible = true; w.p.eraser.scale.y = Math.max(.05, 1 - p); w.p.eraser.position.y = 7.1 + .35 * Math.max(.05, 1 - p);
        w.crumbs.children.forEach(c => { const i = c.userData.i, q = (t * 1.2 + i / 8) % 1; c.position.set(Math.cos(i * 2.3) * (.6 + q * 1.5), 7.6 - q * 7.4, Math.sin(i * 2.3) * (.6 + q)); });
      },
    },
    {
      say: 'So he hid in the sofa. Forever.',
      show: ['desk', 'wall', 'pc', 'sofa', 'coins'], sky: '#F7C99A', lightAt: [0, 7, 3], lightDist: 22,
      cam: { pos: [1, 5.6, 11], look: [0, 4, 0], fov: 46, to: { pos: [1, 5.6, 10.2], look: [0, 4, 0], fov: 44 } },
      update: (w, p, t) => { w.sofa.position.set(0, 0, -1); w.pc.position.set(.8, 2.2 - Math.min(p * 1.5, 1) * 1.6, .6); w.pc.rotation.set(0, 0, .2); talk(w.p, t, false); w.p.mouth.scale.y = 1; grump(w.p, -.25); w.p.bites.visible = true; w.p.eraser.scale.y = .05; w.p.eraser.position.y = 7.12; },
    },
    {
      say: 'Grumpy pencil: sharpen it, keep it, or set it free? Comment below.',
      quiz: { q: 'What do you do with the grumpy pencil?', options: ['Sharpen it', 'Keep it', 'Set it free'], answer: 'Fun fact: pencil "lead" is graphite mixed with clay. There is no lead in it.' },
      show: ['desk', 'wall', 'pc', 'paper', 'scribble'], sky: '#274B73', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [5, 5, 8], look: [0, 4.6, 0], fov: 46, to: { pos: [-5, 5, 8], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, t, false); grump(w.p, -.2); w.p.bites.visible = true; w.p.eraser.scale.y = .05; w.p.eraser.position.y = 7.12; },
    },
  ],
};
