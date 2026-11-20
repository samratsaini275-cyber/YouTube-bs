// Narrative 8: "Objects With Opinions". A made-up comedy sketch: balloons do not talk; no balloon pops in this one.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the balloon with a face held on a string.

function balloon(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  b.body = group([0, 0, 0], b.root);
  b.skin = ball(1.3, mat('#E2453C', { rough: .15, metal: .1 }), [0, 0, 0], b.body); b.skin.scale.set(1, 1.2, 1);
  cone(.18, .3, mat('#C0392B'), [0, -1.65, 0], b.body, 8).rotation.x = Math.PI;
  ball(.25, mat('#FFFFFF', { glow: .6, opacity: .7 }), [-.5, .6, .9], b.body).scale.set(1, 1.4, .4);
  for (const x of [-.38, .38]) { ball(.2, mat('#FFFFFF'), [x, .2, 1.18], b.body); ball(.1, mat('#111111'), [x, .2, 1.32], b.body); }
  b.mouth = box(.4, .07, .05, mat('#5A1E1E'), [0, -.3, 1.25], b.body);
  b.string = cyl(.015, .015, 5, mat('#FFFFFF'), [0, -4.3, 0], b.root, 4);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.park = group();
  for (let i = 0; i < 6; i++) { cyl(.5, .7, 4, mat('#6B4B2E'), [-15 + i * 6, 2, -10], w.park, 8); ball(2.6, mat('#2E8B4A'), [-15 + i * 6, 5.5, -10], w.park); }
  w.b = balloon(k, k.scene); w.bl = w.b.root;
  w.kid = group([0, 0, 0]);
  cyl(.6, .7, 2.2, mat('#2F6FD6'), [0, 1.1, 0], w.kid, 12); ball(.65, mat('#F2C9A0'), [0, 2.75, 0], w.kid);
  w.kidArm = group([0, 2, .3], w.kid); cyl(.12, .12, 1.2, mat('#2F6FD6'), [0, .6, 0], w.kidArm, 6);
  w.hands = group([0, 0, 0]);
  for (const s of [-1, 1]) { const h = group([s * 1.9, 0, 0], w.hands); ball(.45, mat('#F2C9A0'), [0, 0, 0], h); cyl(.25, .25, 2, mat('#2F6FD6'), [s * 1.1, 0, 0], h, 8).rotation.z = Math.PI / 2; }
  w.town = group([0, 0, 0]);
  for (let i = 0; i < 16; i++) { const h = 3 + (i % 4) * 1.5; const hx = -24 + (i % 8) * 6, hz = -20 + Math.floor(i / 8) * 14; box(4, h, 4, mat(['#E8C9A0', '#C9D6E8', '#E8B4A0', '#D6E8C4'][i % 4]), [hx, h / 2, hz], w.town); }
  w.birds = group();
  for (let i = 0; i < 3; i++) { const b = group([0, 0, 0], w.birds); for (const s of [-1, 1]) { const wg = box(.8, .06, .25, mat('#2A2A2A'), [s * .35, 0, 0], b); wg.rotation.z = s * .4; } b.userData.i = i; }
  w.squeak = group();
  for (let i = 0; i < 3; i++) { const r = k.torus(.5, .05, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], w.squeak); r.userData.i = i; r.castShadow = false; }
  return w;
}

export default {
  id: '134',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BALLOON WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS BALLOON', 'HAS A COMPLAINT.'],
  title: 'This balloon has a complaint',
  description: 'Squeezed for the squeaky noise. Then someone lets go. Turns out, best view in town. (A made-up talking balloon.)',
  tags: ['objectswithopinions', 'funny', 'balloon', 'park', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking balloons are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This balloon has a complaint.',
      show: ['ground', 'park', 'bl', 'kid'], sky: '#9ED2F3', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [2, 3.6, 14], look: [.3, 8.2, 0], fov: 46, to: { pos: [1.8, 3.6, 13], look: [.3, 8.1, 0], fov: 44 } },
      update: (w, p, t) => { w.b.skin.scale.set(1, 1.2, 1); w.bl.position.set(.5, 7.4 + .1 * Math.sin(t * 2), 0); w.bl.rotation.z = .05 * Math.sin(t * 1.5); w.b.string.visible = true; w.kid.position.set(.5, 0, 0); w.kidArm.rotation.x = -.2; talk(w.b, t, t > .2); },
    },
    {
      say: 'People squeeze him for the squeaky noise.',
      show: ['ground', 'park', 'bl', 'hands', 'squeak'], sky: '#9ED2F3', lightAt: [0, 5, 2], lightDist: 12,
      cam: { pos: [1.5, 5.4, 9], look: [0, 5, 0], fov: 46, to: { pos: [1.4, 5.4, 8.2], look: [0, 5, 0], fov: 44 } },
      update: (w, p, t) => {
        const sq = Math.max(0, Math.sin(t * 5)); w.bl.position.set(0, 5, 0); w.bl.rotation.z = 0; w.b.string.visible = false;
        w.b.skin.scale.set(1 - sq * .35, 1.2 + sq * .3, 1); w.hands.position.set(0, 5, 0); w.hands.children.forEach((h, i) => { h.position.x = (i ? 1 : -1) * (1.9 - sq * .5); }); talk(w.b, t);
        w.squeak.children.forEach(r => { const f = (t * 2 + r.userData.i / 3) % 1; r.visible = sq > .6; r.position.set(0, 7, 0); r.rotation.x = Math.PI / 2; r.scale.setScalar(.5 + f * 1.5); });
      },
    },
    {
      say: 'Then someone lets go.',
      show: ['ground', 'park', 'bl', 'kid'], sky: '#9ED2F3', lightAt: [0, 6, 2], lightDist: 20,
      cam: { pos: [3, 3, 14], look: [.3, 7, 0], fov: 50, to: { pos: [3, 5, 14], look: [.3, 11, 0], fov: 50 } },
      update: (w, p, t) => { w.b.skin.scale.set(1, 1.2, 1); w.b.string.visible = true; const f = Math.max(0, t - .4); w.bl.position.set(.5 + f * .4, 7.4 + f * f * 2.2, 0); w.bl.rotation.z = .1 * Math.sin(t * 3); w.kid.position.set(.5, 0, 0); w.kidArm.rotation.x = -2.6; talk(w.b, t); },
    },
    {
      say: 'Twist: best view in town. He loves it up here.',
      show: ['ground', 'town', 'bl', 'birds'], sky: '#BFE3F5', lightAt: [0, 40, 0], lightDist: 40,
      cam: { pos: [0, 38, 9], look: [0, 24, -10], fov: 54, to: { pos: [0, 37.5, 8], look: [0, 24, -10], fov: 52 } },
      update: (w, p, t) => {
        w.bl.position.set(0, 32 + .3 * Math.sin(t * 2), 0); w.bl.rotation.z = .08 * Math.sin(t * 1.5); talk(w.b, t, t < 2);
        w.birds.children.forEach((b, i) => { const a = t * 1.2 + i * 2.1; b.position.set(Math.cos(a) * 3.5, 33 + Math.sin(a * 2) * .5, Math.sin(a) * 2); b.rotation.y = -a; b.children.forEach((wg, s) => { wg.rotation.z = (s ? 1 : -1) * .4 * Math.sin(t * 14 + i); }); });
      },
    },
    {
      say: 'Balloon: hold on, let go, or a sky trip? Comment below.',
      quiz: { q: 'What should the balloon do?', options: ['Hold on', 'Let go', 'A sky trip'], answer: 'This balloon is made up. He picked the sky trip.' },
      show: ['ground', 'park', 'bl', 'kid'], sky: '#274B73', lightAt: [0, 5, 2], lightDist: 14,
      cam: { pos: [2, 2.5, 12], look: [.3, 8.4, 0], fov: 46, to: { pos: [-2, 2.5, 12], look: [.3, 8.4, 0] } },
      update: (w, p, t) => { w.b.skin.scale.set(1, 1.2, 1); w.bl.position.set(.5, 7.4 + .1 * Math.sin(t * 2), 0); w.bl.rotation.z = 0; w.b.string.visible = true; w.kid.position.set(.5, 0, 0); w.kidArm.rotation.x = -.2; talk(w.b, t, false); },
    },
  ],
};
