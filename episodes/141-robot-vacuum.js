// Narrative 8: "Objects With Opinions". A made-up comedy sketch: robot vacuums do not talk; nobody is hurt.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the robot vacuum with a face.

function vac(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const v = { root: group([0, 0, 0], parent) };
  v.body = group([0, 0, 0], v.root);
  cyl(1.2, 1.2, .4, mat('#2B2F36', { rough: .3 }), [0, .25, 0], v.body, 28);
  cyl(1.05, 1.05, .06, mat('#4A5260', { rough: .2 }), [0, .47, 0], v.body, 28);
  v.led = ball(.08, mat('#22E06B', { glow: 2 }), [0, .52, -.5], v.body);
  for (const x of [-.4, .4]) { ball(.22, mat('#FFFFFF'), [x, .6, .6], v.body); ball(.11, mat('#111111'), [x, .65, .78], v.body); }
  v.mouth = box(.5, .06, .05, mat('#C8414B'), [0, .27, 1.2], v.body);
  return v;
}
function talk(v, t, on = true) { v.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#C79F6E', 0);
  w.room = group();
  box(40, 20, .5, mat('#CFE0F0'), [0, 10, -6], w.room);
  w.sofa = group([0, 0, -3.4]);
  box(6, .9, 2.4, mat('#7B5BD6'), [0, .85, 0], w.sofa); box(6, 1.8, .6, mat('#6A4BC4'), [0, 2, -.9], w.sofa);
  for (const x of [-2.8, 2.8]) box(.5, 1.6, 2.4, mat('#6A4BC4'), [x, 1.2, 0], w.sofa);
  for (const x of [-2.6, 2.6]) for (const z of [-1, 1]) box(.2, .4, .2, mat('#3A2A1A'), [x, .2, z], w.sofa);
  w.v = vac(k, k.scene); w.vc = w.v.root;
  w.crumbs = group();
  for (let i = 0; i < 14; i++) { const c = box(.12, .06, .12, mat('#F5D08A'), [Math.cos(i * 2.1) * (1.2 + i * .12), .03, Math.sin(i * 2.1) * (1.2 + i * .12)], w.crumbs); c.userData.a = i * 2.1; }
  w.person = group([0, 0, 0]);
  cyl(.85, .9, 2.0, mat('#2F6FD6'), [0, 1.0, 0], w.person, 14); ball(.8, mat('#F2C9A0'), [0, 2.6, 0], w.person);
  w.ph = box(.5, .8, .1, mat('#1E2227'), [.2, 1.75, .85], w.person);
  w.cat = group([0, 0, 0]);
  const cb = ball(.6, mat('#F2994A'), [0, .45, 0], w.cat); cb.scale.set(1.4, .6, 1); ball(.42, mat('#F2994A'), [0, .8, .75], w.cat);
  for (const x of [-.2, .2]) { cone(.13, .3, mat('#F2994A'), [x, 1.2, .75], w.cat, 4); ball(.07, mat('#111111'), [x, .88, 1.12], w.cat); }
  w.stars = group();
  for (let i = 0; i < 3; i++) { const s = ball(.14, mat('#FFD21F', { glow: 1.8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const park = (w) => { w.vc.position.set(0, 0, 0); w.vc.rotation.set(0, 0, 0); w.v.body.rotation.set(0, 0, 0); };

export default {
  id: '141',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ROBOT VACUUM WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS ROBOT VACUUM', 'HAS A COMPLAINT.'],
  title: 'This robot vacuum has a complaint',
  description: 'Cleans everything. Gets no thanks. Works as a cat taxi. Gets stuck under the same sofa every day. (A made-up talking vacuum.)',
  tags: ['objectswithopinions', 'funny', 'robotvacuum', 'cat', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking robot vacuums are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This robot vacuum has a complaint.',
      show: ['ground', 'room', 'sofa', 'vc'], sky: '#CFE0F0', lightAt: [0, 4, 3], lightDist: 10,
      cam: { pos: [.4, 1.0, 6.2], look: [0, .62, 0], fov: 46, to: { pos: [.3, 1.0, 5.6], look: [0, .6, 0], fov: 44 } },
      update: (w, p, t) => { park(w); talk(w.v, t, t > .2); },
    },
    {
      say: 'He cleans the whole floor. Nobody says thank you.',
      show: ['ground', 'room', 'sofa', 'vc', 'crumbs', 'person'], sky: '#CFE0F0', lightAt: [0, 5, 3], lightDist: 12,
      cam: { pos: [3, 5, 8], look: [0, 1, -.5], fov: 50, to: { pos: [2.7, 4.8, 7.4], look: [0, 1, -.5], fov: 48 } },
      update: (w, p, t) => {
        park(w); const a = t * 1.1; const r = 1.2 + t * .5; w.vc.position.set(Math.cos(a) * r, 0, Math.sin(a) * r); w.vc.rotation.y = -a; talk(w.v, t);
        w.crumbs.children.forEach(c => { c.visible = c.userData.a > a + .3 || c.userData.a < 0; });
        w.person.position.set(-1, .9, -3.2); w.person.rotation.y = .3;
      },
    },
    {
      say: 'The cat rides him like a taxi.',
      show: ['ground', 'room', 'sofa', 'vc', 'cat'], sky: '#FFE3C2', lightAt: [0, 4, 3], lightDist: 10,
      cam: { pos: [3.4, 2.6, 6], look: [0, 1.0, 0], fov: 46, to: { pos: [3, 2.4, 5.4], look: [0, 1.0, 0], fov: 44 } },
      update: (w, p, t) => {
        park(w); w.vc.position.set(-1.5 + t * .9, 0, 0); w.vc.rotation.y = Math.PI / 2; talk(w.v, t);
        w.cat.position.set(-1.5 + t * .9, .5, 0); w.cat.rotation.y = Math.PI / 2; w.cat.children[0].scale.y = .6 + .04 * Math.sin(t * 3);
      },
    },
    {
      say: 'And every day, he gets stuck under the same sofa.',
      show: ['ground', 'room', 'sofa', 'vc', 'stars'], sky: '#CFE0F0', lightAt: [0, 4, 3], lightDist: 10,
      cam: { pos: [4.2, 1.6, 1.6], look: [0, .9, -1.8], fov: 46, to: { pos: [3.8, 1.5, 1.3], look: [0, .8, -1.8], fov: 44 } },
      shake: (t) => t > 1.4 ? .02 : 0,
      update: (w, p, t) => {
        park(w); const z = t < 1.4 ? .4 - t * 1.7 : -2.0 + .12 * Math.sin(t * 14); w.vc.position.set(0, 0, z); w.vc.rotation.y = Math.PI; talk(w.v, t, t > 1.4);
        w.v.body.rotation.x = t > 1.4 ? .06 * Math.sin(t * 14) : 0;
        w.stars.visible = t > 1.5; w.stars.children.forEach(s => { const a = t * 4 + s.userData.i * 2.1; s.position.set(Math.cos(a) * .7, 1.0, -.6 + Math.sin(a) * .4); });
      },
    },
    {
      say: 'Robot vacuums: cleaner, cat taxi, or a pet? Comment below.',
      quiz: { q: 'What is a robot vacuum really?', options: ['A cleaner', 'A cat taxi', 'A pet'], answer: 'This vacuum is made up. Please move the sofa.' },
      show: ['ground', 'room', 'sofa', 'vc'], sky: '#274B73', lightAt: [0, 4, 3], lightDist: 10,
      cam: { pos: [.4, .9, 4.6], look: [0, 1.5, 0], fov: 46, to: { pos: [-.6, .9, 4.6], look: [0, 1.5, 0] } },
      update: (w, p, t) => { park(w); talk(w.v, t, false); },
    },
  ],
};
