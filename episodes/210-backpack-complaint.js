// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: backpacks do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the backpack with a face.

function backpack(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  const cloth = mat('#7A4BC2', { rough: .8 });
  b.main = box(3, 3.8, 1.6, cloth, [0, 2.1, 0], b.body);
  const top = cyl(1.5, 1.5, 1.6, cloth, [0, 4, 0], b.body, 20); top.rotation.x = Math.PI / 2; top.scale.set(1, 1, .5);
  b.pocket = box(2.2, 1.4, .5, mat('#9B6BE0', { rough: .8 }), [0, 1.2, 1], b.body);
  box(2.2, .08, .08, mat('#FFC21F'), [0, 1.85, 1.26], b.body);
  for (const x of [-.9, .9]) box(.35, 3.6, .2, mat('#2A2A2A'), [x, 2.4, -.95], b.body);
  b.face = group([0, 3.1, .82], b.body);
  for (const x of [-.45, .45]) { ball(.26, mat('#FFFFFF'), [x, .2, 0], b.face); ball(.13, mat('#111111'), [x, .2, .17], b.face); }
  b.brows = [-.45, .45].map(x => box(.36, .06, .05, mat('#111111'), [x, .55, .05], b.face));
  b.mouth = box(.55, .1, .05, mat('#5A1E1E'), [0, -.35, .03], b.face);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(b, a) { b.brows.forEach((r, i) => r.rotation.z = (i ? -1 : 1) * a); }

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = {};
  w.floor = k.ground('#9AA5B1', 0);
  w.wall = box(60, 30, .5, mat('#E9EEF3'), [0, 15, -7]); w.wall.castShadow = false;
  w.lockers = group(); for (let i = 0; i < 8; i++) { box(1.9, 7, .4, mat(i % 2 ? '#3B82F6' : '#2F6FD6'), [-7 + i * 2, 3.5, -6.6], w.lockers); box(.2, .6, .1, mat('#C0C8D0'), [-6.4 + i * 2, 3.6, -6.35], w.lockers); }
  w.b = backpack(k, k.scene); w.bp = w.b.root;
  w.books = group(); ['#E2453C', '#22C55E', '#FFC21F', '#3B82F6', '#F97316'].forEach((c, i) => { const bk = box(2.4, .5, 1.6, mat(c), [0, 0, 0], w.books); bk.userData.i = i; });
  w.banana = group(); const ban = k.torus(.8, .22, mat('#E8D44D'), [0, 0, 0], w.banana); ban.scale.set(1, 1, .8); ban.geometry.dispose && 0; for (let i = 0; i < 4; i++) { const sp = ball(.12, mat('#6B4A2B'), [Math.cos(i * 1.4) * .8, Math.sin(i * 1.4) * .8, .2], w.banana); sp.castShadow = false; }
  w.stink = group(); for (let i = 0; i < 6; i++) { const s = ball(.18, mat('#9BCB4A', { glow: .4 }), [0, 0, 0], w.stink); s.userData.i = i; s.castShadow = false; }
  w.beach = group(); const sand = cyl(9, 9, .2, mat('#F2D7A6'), [0, .1, 0], w.beach, 32); sand.receiveShadow = true; const um = group([3, 0, -2], w.beach); cyl(.08, .08, 5, mat('#FFFFFF'), [0, 2.5, 0], um, 8); const top = k.cone(2.4, 1, mat('#E2453C'), [0, 5.2, 0], um, 16);
  w.sun = ball(1.2, mat('#FFD21F', { glow: 1 }), [-5, 11, -6]); w.sun.castShadow = false;
  return w;
}

const place = (w, x, y, z, ry, t, on = true) => { w.bp.position.set(x, y, z); w.bp.rotation.set(0, ry, 0); w.b.body.rotation.set(0, 0, 0); w.b.body.scale.set(1, 1, 1); talk(w.b, t, on); };

export default {
  id: '210',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BACKPACK',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS BACKPACK', 'HAS A COMPLAINT'],
  title: 'This backpack has a complaint',
  description: 'Stuffed with every book. A banana lost in his pocket for a month. Thrown on the floor every afternoon. So the backpack went on holiday, empty. (A made-up comedy sketch.)',
  tags: ['funny', 'backpack', 'school', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: health guidance commonly advises that a loaded backpack weigh no more than about 10 to 15 percent of the wearer\'s body weight (American Academy of Pediatrics, HealthyChildren.org, "Backpack Safety").',
  ],
  setup,
  scenes: [
    {
      say: 'This backpack has a complaint.',
      show: ['floor', 'wall', 'lockers', 'bp'], sky: '#E9EEF3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 3.6, 13], look: [0, 3.7, 0], fov: 46, to: { pos: [1.9, 3.6, 12], look: [0, 3.7, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t); grump(w.b, .35); },
    },
    {
      say: 'Every day, he carries every book.',
      show: ['floor', 'wall', 'lockers', 'bp', 'books'], sky: '#E9EEF3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 3.6, 15], look: [0, 3.4, 0], fov: 48, to: { pos: [1.9, 3.6, 14], look: [0, 3.4, 0], fov: 46 } },
      update: (w, p, t) => {
        const n = Math.min(5, Math.floor(t * 3.2)); place(w, 0, 0, 0, 0, t); w.b.body.scale.set(1 + n * .05, 1 - n * .06, 1 + n * .05); grump(w.b, .55);
        w.books.children.forEach(bk => { const i = bk.userData.i; bk.visible = i < n + 1; const land = i < n; bk.position.set(.1 * Math.sin(i * 3), land ? 4.6 - n * .23 + i * .5 : 9 - (t * 3.2 % 1) * (4.4 - i * .5), 0); bk.rotation.y = .2 * Math.sin(i * 5); });
      },
    },
    {
      say: 'There\'s a banana in his pocket. From last month.',
      show: ['floor', 'wall', 'lockers', 'bp', 'banana', 'stink'], sky: '#C9D99A', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 2.4, 12], look: [0, 2.3, 0], fov: 46, to: { pos: [1.9, 2.4, 11], look: [0, 2.3, 0], fov: 44 } },
      update: (w, p, t) => {
        place(w, 0, 0, 0, 0, t); grump(w.b, -.3); w.b.mouth.scale.y = 2.6; w.banana.position.set(0, .9 + .5 * Math.min(1, t), 1.4); w.banana.rotation.z = .4; w.banana.scale.setScalar(.7);
        w.stink.children.forEach(s => { const i = s.userData.i, q = (t * .7 + i / 6) % 1; s.position.set(-1.6 + (i % 2) * 3.2, 1.2 + q * 3, 1.4); s.scale.setScalar(Math.sin(q * Math.PI) * 1.4); });
      },
    },
    {
      say: 'And after school? Thrown on the floor.',
      show: ['floor', 'wall', 'lockers', 'bp'], sky: '#E9EEF3', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [2, 3, 13], look: [0, 1.6, 0], fov: 46, to: { pos: [1.9, 3, 12], look: [0, 1.6, 0], fov: 44 } },
      update: (w, p, t) => { const q = Math.min(1, t / .6); place(w, 0, 6 * (1 - q) * (1 - q), 0, 0, t); w.b.body.rotation.x = -1.2 * q; w.b.body.position.y = .3 * q; w.b.body.position.z = .8 * q; grump(w.b, .6); if (q < 1) w.b.mouth.scale.y = 3; },
    },
    {
      say: 'So today, he went on holiday. Empty.',
      show: ['bp', 'beach', 'sun'], sky: '#7EC8F0', lightAt: [0, 7, 3], lightDist: 24,
      cam: { pos: [2, 3, 13], look: [0, 2.6, 0], fov: 46, to: { pos: [1.9, 3, 12], look: [0, 2.6, 0], fov: 44 } },
      update: (w, p, t) => { place(w, 0, .2, 0, 0, t, false); w.b.body.position.set(0, 0, 0); w.b.body.scale.set(1, 1, .7); w.b.mouth.scale.y = 1; grump(w.b, -.3); w.bp.rotation.z = .08 * Math.sin(t * 2); },
    },
    {
      say: 'Grumpy backpack: empty it, wash it, or let it rest? Comment below.',
      quiz: { q: 'What do you do with the grumpy backpack?', options: ['Empty it', 'Wash it', 'Let it rest'], answer: 'Fun fact: doctors suggest a backpack weigh no more than about 10 to 15% of your body weight.' },
      show: ['floor', 'wall', 'lockers', 'bp'], sky: '#274B73', lightAt: [0, 6, 3], lightDist: 20,
      cam: { pos: [7, 3.4, 11], look: [0, 2.6, 0], fov: 46, to: { pos: [-7, 3.4, 11], look: [0, 2.6, 0] } },
      update: (w, p, t) => { place(w, 0, 0, 0, 0, t, false); w.b.body.position.set(0, 0, 0); grump(w.b, -.2); },
    },
  ],
};
