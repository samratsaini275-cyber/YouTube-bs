// Narrative 7: "Animals at Work". A made-up comedy sketch: giraffes do not clean windows.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the giraffe holding a squeegee next to an office building.

function giraffe(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const skin = mat('#F2C14E', { rough: .7 }), spot = mat('#8B5A2B', { rough: .8 });
  const g = { root: group([0, 0, 0], parent) };
  const b = ball(1.6, skin, [0, 5, 0], g.root); b.scale.set(1.5, .9, .9);
  for (let i = 0; i < 8; i++) { const sp = ball(.35, spot, [-1.6 + (i % 4) * 1, 5.2 + (i % 2) * .5 - .2, (i < 4 ? 1 : -1) * 1.3], g.root); sp.scale.set(1, .8, .3); }
  for (const x of [-1.6, 1.6]) for (const z of [-.6, .6]) { cyl(.2, .18, 4.4, skin, [x, 2.2, z], g.root, 8); box(.45, .3, .45, mat('#3A2A1E'), [x, .15, z], g.root); }
  g.neck = group([1.8, 5.6, 0], g.root);
  g.neckMesh = cyl(.4, .5, 1, skin, [0, .5, 0], g.neck, 10);
  g.neckSpots = [];
  for (let i = 0; i < 4; i++) { const sp = ball(.22, spot, [0, .2 + i * .22, .42], g.neck); sp.scale.set(1, .8, .3); g.neckSpots.push(sp); }
  g.neck.rotation.z = -.35;
  g.head = group([0, 1, 0], g.neck);
  const hd = ball(.6, skin, [.35, 0, 0], g.head); hd.scale.set(1.5, .8, .8);
  for (const z of [-.25, .25]) { ball(.12, mat('#111111'), [.55, .25, z * 1.3], g.head); cyl(.06, .06, .5, skin, [.1, .6, z], g.head, 6); ball(.1, spot, [.1, .9, z], g.head); }
  ball(.1, mat('#3A2A1E'), [1.2, -.05, .15], g.head); ball(.1, mat('#3A2A1E'), [1.2, -.05, -.15], g.head);
  g.squeegee = group([1.3, -.4, 0], g.head);
  cyl(.04, .04, 1.2, mat('#5A3A1E'), [.5, 0, 0], g.squeegee, 6).rotation.z = Math.PI / 2;
  box(.12, .2, 1.2, mat('#2A2A2A'), [1.1, 0, 0], g.squeegee);
  return g;
}
function neckLen(g, L) { g.neckMesh.scale.y = L; g.neckMesh.position.y = L / 2; g.head.position.y = L; g.neckSpots.forEach((s, i) => { s.position.y = (i + .5) / 4 * L; }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9AA3AE', 0);
  w.bldg = group([0, 0, -6]);
  box(16, 40, 6, mat('#5A6E8C'), [0, 20, -3.75], w.bldg);
  w.wins = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 3; c++) { const clear = r === 3 && c === 2; const wn = box(3.6, 3, .1, mat('#BFE6FF', clear ? { opacity: .25, rough: .05 } : { metal: .4, rough: .1 }), [-5 + c * 5, 3 + r * 4.2, .05], w.bldg); if (clear) wn.castShadow = false; w.wins.push(wn); }
  w.smudge = group([0, 0, -5.8]);
  for (let i = 0; i < 6; i++) { const s = ball(.35, mat('#8A8A70', { opacity: .6 }), [5 + (i % 3) * .6 - .6, 16.8 + Math.floor(i / 3) * .6, 0], w.smudge); s.scale.z = .1; s.castShadow = false; }
  w.g = giraffe(k, k.scene); w.gf = w.g.root;
  // inside office: plant + worker
  w.inside = group([5, 14.1, -6.35]);
  box(3.4, .6, 1.4, mat('#8B5A2B'), [0, 0, 1.0], w.inside);
  w.leaves = [];
  for (let i = 0; i < 6; i++) { const l = ball(.35, mat(['#2E8B4A', '#FF4D6D'][i % 2]), [-1.3 + i * .52, .55, 1.0], w.inside); w.leaves.push(l); }
  w.worker = group([.2, -.2, -.05], w.inside); w.worker.scale.set(.9, .9, .3);
  cyl(.5, .55, 1.6, mat('#2F6FD6'), [0, .8, 0], w.worker, 12); ball(.5, mat('#F2C9A0'), [0, 2, 0], w.worker);
  w.weyes = [-.18, .18].map(x => ball(.08, mat('#111111'), [x, 2.1, .46], w.worker));
  return w;
}

export default {
  id: '114',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIRAFFE WINDOW CLEANER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS GIRAFFE', 'CLEANS WINDOWS.'],
  title: 'This giraffe cleans windows',
  description: 'No ladder. No rope. Just a very long neck, and an office plant that did not survive. (A made-up giraffe.)',
  tags: ['animalsatwork', 'funny', 'giraffe', 'windowcleaner', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the giraffe window cleaner is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This giraffe cleans windows.',
      show: ['ground', 'bldg', 'gf'], sky: '#9ED2F3', lightAt: [2, 8, 2], lightDist: 22,
      cam: { pos: [8, 4.5, 22], look: [3, 12.4, 0], fov: 50, to: { pos: [7.5, 4.5, 20.5], look: [3, 12.2, 0], fov: 48 } },
      update: (w, p, t) => { w.gf.position.set(1.5, 0, 0); w.gf.rotation.y = 0; neckLen(w.g, 3); w.g.neck.rotation.z = -.35; w.g.squeegee.rotation.z = .3 * Math.sin(t * 6); w.g.head.rotation.z = .35; },
    },
    {
      say: 'No ladder needed. He just stretches.',
      show: ['ground', 'bldg', 'gf', 'smudge'], sky: '#9ED2F3', lightAt: [3, 14, 2], lightDist: 30,
      cam: { pos: [12, 9, 30], look: [3, 13, 0], fov: 56, to: { pos: [11.5, 10, 29], look: [3, 15, 0], fov: 56 } },
      update: (w, p, t) => {
        w.gf.position.set(1.5, 0, 0); w.gf.rotation.y = 0; const L = 3 + Math.min(1, t / 1.6) * 7; neckLen(w.g, L); w.g.neck.rotation.z = .05; w.g.head.rotation.z = 0;
        w.g.squeegee.rotation.y = Math.PI / 2; w.g.squeegee.rotation.z = .3 * Math.sin(t * 8); w.smudge.children.forEach(s => { s.visible = t < 2; });
      },
    },
    {
      say: 'Then he spots an office plant. Lunch.',
      show: ['ground', 'bldg', 'gf', 'inside'], sky: '#9ED2F3', lightAt: [5, 17, 0], lightDist: 14,
      cam: { pos: [9.5, 15, 7], look: [4.6, 14.6, -5.2], fov: 48, to: { pos: [9, 15, 6], look: [4.6, 14.6, -5.2], fov: 46 } },
      update: (w, p, t) => {
        w.gf.position.set(1.4, 0, -4.4); w.gf.rotation.y = 0; neckLen(w.g, 8.4); w.g.neck.rotation.z = -.22; w.g.head.rotation.z = .5; w.g.squeegee.visible = false;
        w.leaves.forEach((l, i) => { l.visible = t < .8 + i * .3; }); w.weyes.forEach(e => e.scale.setScalar(1));
      },
    },
    {
      say: 'The office workers are mildly concerned.',
      show: ['ground', 'bldg', 'gf', 'inside'], sky: '#9ED2F3', lightAt: [5, 17, 0], lightDist: 14,
      cam: { pos: [7.5, 15, 3], look: [5, 14.6, -6], fov: 44, to: { pos: [7.2, 15, 2.2], look: [5, 14.6, -6], fov: 42 } },
      update: (w, p, t) => {
        w.gf.position.set(1.4, 0, -4.4); neckLen(w.g, 8.4); w.g.neck.rotation.z = -.22; w.g.head.rotation.z = .5 + .05 * Math.sin(t * 6); w.g.squeegee.visible = false;
        w.leaves.forEach(l => { l.visible = false; }); w.weyes.forEach(e => e.scale.setScalar(1.8)); w.worker.position.x = .8 - Math.min(.6, t * .4);
      },
    },
    {
      say: 'Hire the giraffe: yes, no, or only for high floors? Comment below.',
      quiz: { q: 'Would you hire the giraffe window cleaner?', options: ['Yes', 'No', 'Only for high floors'], answer: 'He is a made-up window cleaner. Hide the plants.' },
      show: ['ground', 'bldg', 'gf'], sky: '#274B73', lightAt: [2, 8, 2], lightDist: 22,
      cam: { pos: [8, 3, 22], look: [3, 14, 0], fov: 50, to: { pos: [0, 3, 22], look: [3, 14, 0] } },
      update: (w, p, t) => { w.g.squeegee.visible = true; w.g.squeegee.rotation.y = 0; w.gf.position.set(1.5, 0, 0); w.gf.rotation.y = 0; neckLen(w.g, 3); w.g.neck.rotation.z = -.35; w.g.squeegee.rotation.z = .3 * Math.sin(t * 6); w.g.head.rotation.z = .35; },
    },
  ],
};
