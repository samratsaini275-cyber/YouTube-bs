// Narrative 7: "Animals at Work" (last episode). A made-up comedy sketch: flamingos do not teach ballet; the students just sit down, tired.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the flamingo in a tutu at a ballet barre.

function flamingo(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const pink = mat('#FF8FB1', { rough: .6 });
  const f = { root: group([0, 0, 0], parent) };
  f.body = group([0, 0, 0], f.root);
  const b = ball(1, pink, [0, 4.6, 0], f.body); b.scale.set(1.4, .9, .9);
  f.tutu = cyl(1.6, 1.6, .15, mat('#FFFFFF', { opacity: .85 }), [0, 4.2, 0], f.body, 24);
  f.neckG = group([1.1, 5, 0], f.body);
  const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push(new k.THREE.Vector3(Math.sin(u * Math.PI) * .6, u * 2.6, 0)); }
  k.mesh(new k.THREE.TubeGeometry(new k.THREE.CatmullRomCurve3(pts), 24, .16, 8), pink, [0, 0, 0], f.neckG);
  f.head = group([0, 2.7, 0], f.neckG);
  ball(.38, pink, [0, 0, 0], f.head);
  for (const z of [-.2, .2]) ball(.07, mat('#111111'), [.2, .12, z * 1.2], f.head);
  const bk = cone(.13, .6, mat('#2A2A2A'), [.45, -.15, 0], f.head, 8); bk.rotation.z = -2.2;
  f.legs = [-1, 1].map(s => { const g = group([0, 4, s * .3], f.root); cyl(.06, .06, 4, mat('#FF6B95'), [0, -2, 0], g, 6); box(.5, .06, .3, mat('#FF6B95'), [.15, -4, 0], g); return g; });
  f.wings = [-1, 1].map(s => { const g = group([0, 4.8, s * .85], f.body); const w = ball(.6, mat('#FF9EC4'), [-.2, 0, 0], g); w.scale.set(1.4, .5, .25); return g; });
  return f;
}
function oneLeg(f) { f.legs[1].rotation.z = 0; f.legs[1].position.y = 4; f.legs[1].scale.y = .45; f.legs[1].position.y = 4; f.legs[1].rotation.x = 0; f.legs[1].children[0].position.y = -2; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C08A48', 0);
  w.studio = group();
  box(50, 26, .5, mat('#F4DCE6'), [0, 13, -8], w.studio);
  box(16, 8, .1, mat('#DDEEFF', { metal: .5, rough: .05 }), [0, 6, -7.7], w.studio);
  for (const x of [-7, 7]) cyl(.1, .1, 4, mat('#9AA3AE'), [x, 2, -6.5], w.studio, 6);
  w.barre = cyl(.12, .12, 14, mat('#C08A48'), [0, 4, -6.5], w.studio, 8); w.barre.rotation.z = Math.PI / 2;
  w.clock = group([10, 10, -7.6], w.studio); const cf = cyl(1.2, 1.2, .2, mat('#FFFFFF'), [0, 0, 0], w.clock, 24); cf.rotation.x = Math.PI / 2;
  w.hand = group([0, 0, .15], w.clock); box(.1, 1, .05, mat('#111111'), [0, .45, 0], w.hand);
  w.f = flamingo(k, k.scene); w.fl = w.f.root;
  w.kids = [];
  w.class = group();
  for (let i = 0; i < 4; i++) { const kd = group([-4.5 + i * 3, 0, 3], w.class); const bd = group([0, 0, 0], kd); cyl(.6, .7, 2.6, mat(['#2F6FD6', '#22C55E', '#8B5CF6', '#FFD21F'][i]), [0, 1.9, 0], bd, 12); ball(.65, mat('#F2C9A0'), [0, 3.6, 0], bd); cyl(.15, .15, 1.2, mat('#F2C9A0'), [-.25, .5, 0], bd, 6); const leg2 = group([.25, 1, 0], bd); cyl(.15, .15, 1.2, mat('#F2C9A0'), [0, -.5, 0], leg2, 6); kd.userData = { bd, leg2 }; w.kids.push(kd); }
  w.zs = group();
  for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zs); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, .2, 0], z); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, -.2, 0], z); const d = box(.55, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  return w;
}

export default {
  id: '122',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FLAMINGO BALLET TEACHER',
  year: 'ANIMALS AT WORK',
  hook: ['THIS FLAMINGO', 'TEACHES BALLET.'],
  title: 'This flamingo teaches ballet',
  description: 'Lesson one: stand on one leg. Lesson two: keep standing on one leg. For three hours. (A made-up flamingo.)',
  tags: ['animalsatwork', 'funny', 'flamingo', 'ballet', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the flamingo ballet teacher is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This flamingo teaches ballet.',
      show: ['ground', 'studio', 'fl'], sky: '#F4DCE6', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [3, 3.5, 15], look: [.4, 8.8, 0], fov: 48, to: { pos: [2.8, 3.5, 14], look: [.4, 8.7, 0], fov: 46 } },
      update: (w, p, t) => { w.fl.position.set(0, 0, -2); w.fl.rotation.y = .4; oneLeg(w.f); w.f.wings.forEach((g, i) => { g.rotation.x = (i ? -1 : 1) * (.3 + .2 * Math.sin(t * 3)); }); w.f.head.rotation.z = .1 * Math.sin(t * 2); },
    },
    {
      say: 'Lesson one: stand on one leg.',
      show: ['ground', 'studio', 'fl', 'class'], sky: '#F4DCE6', lightAt: [0, 5, 2], lightDist: 18,
      cam: { pos: [2, 6, 18], look: [0, 3.6, 0], fov: 52, to: { pos: [1.8, 6, 17], look: [0, 3.6, 0], fov: 50 } },
      update: (w, p, t) => {
        w.fl.position.set(0, 0, -3); w.fl.rotation.y = .3; oneLeg(w.f);
        w.kids.forEach((kd, i) => { const fall = Math.max(0, t - .7 - i * .25); kd.userData.leg2.rotation.z = 1.2; kd.userData.bd.rotation.z = fall > 0 ? Math.min(1.45, fall * fall * 6) * (i % 2 ? 1 : -1) : .12 * Math.sin(t * 9 + i); });
      },
    },
    {
      say: 'Lesson two: still one leg. For three hours.',
      show: ['ground', 'studio', 'fl', 'class'], sky: '#F4DCE6', lightAt: [0, 5, 2], lightDist: 18,
      cam: { pos: [6, 7, 18], look: [2, 5, -2], fov: 52, to: { pos: [5.6, 7, 17], look: [2.5, 5.5, -2], fov: 50 } },
      update: (w, p, t) => {
        w.fl.position.set(0, 0, -3); w.fl.rotation.y = .3; oneLeg(w.f); w.hand.rotation.z = -t * 6;
        w.kids.forEach((kd, i) => { kd.userData.leg2.rotation.z = 0; kd.userData.bd.rotation.z = (i % 2 ? 1 : -1) * 1.45; });
      },
    },
    {
      say: 'Then he falls asleep. Still on one leg.',
      show: ['ground', 'studio', 'fl', 'zs'], sky: '#C9B8E0', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [3, 5, 13], look: [.4, 6.4, 0], fov: 48, to: { pos: [2.8, 5, 12], look: [.4, 6.4, 0], fov: 46 } },
      update: (w, p, t) => {
        w.fl.position.set(0, 0, -2); w.fl.rotation.y = .4; oneLeg(w.f); w.f.neckG.rotation.z = Math.min(1.6, t * 1.5); w.f.body.rotation.z = .03 * Math.sin(t * 2);
        w.zs.children.forEach(z => { const f = (t * .5 + z.userData.i / 3) % 1; z.position.set(1 + f * 1, 6.2 + f * 1.8, -1.6); z.scale.setScalar(.6 + f * .6); });
      },
    },
    {
      say: 'Take his class: yes, no, or only one lesson? Comment below.',
      quiz: { q: 'Would you take the flamingo\'s ballet class?', options: ['Yes', 'No', 'Only one lesson'], answer: 'He is a made-up teacher. Bring a chair.' },
      show: ['ground', 'studio', 'fl'], sky: '#274B73', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [3, 2, 15], look: [.4, 9.4, 0], fov: 48, to: { pos: [-3, 2, 15], look: [.4, 9.4, 0] } },
      update: (w, p, t) => { w.f.neckG.rotation.z = 0; w.f.body.rotation.z = 0; w.fl.position.set(0, 0, -2); w.fl.rotation.y = .4; oneLeg(w.f); w.f.wings.forEach((g, i) => { g.rotation.x = (i ? -1 : 1) * (.3 + .2 * Math.sin(t * 3)); }); },
    },
  ],
};
