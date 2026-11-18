// Narrative 7: "Animals at Work". A made-up comedy sketch: bats are not hotel receptionists.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the bat hanging upside down above a hotel desk with a bell.

function bat(k, parent, s = 1) {
  const { mat, box, cyl, ball, cone, group } = k;
  const fur = mat('#6A5A84', { rough: .7 }), wingM = mat('#7E6E98', { rough: .6, double: true });
  const b = { root: group([0, 0, 0], parent) };
  b.root.scale.setScalar(s);
  b.body = group([0, 0, 0], b.root);
  const bd = ball(.7, fur, [0, 0, 0], b.body); bd.scale.set(.9, 1.2, .8);
  b.head = group([0, -1.05, 0], b.body);
  ball(.55, fur, [0, 0, 0], b.head);
  for (const x of [-.3, .3]) { const e = cone(.2, .55, fur, [x, -.55, 0], b.head, 4); e.rotation.x = Math.PI; ball(.11, mat('#FFFFFF'), [x * .8, .05, .45], b.head); ball(.06, mat('#111111'), [x * .8, .05, .53], b.head); }
  for (const x of [-.08, .08]) { const f = cone(.04, .12, mat('#FFFFFF'), [x, .28, .45], b.head, 4); }
  b.tie = box(.35, .15, .05, mat('#E2453C'), [0, -.65, .6], b.body);
  b.wings = [-1, 1].map(sd => { const g = group([sd * .55, .1, 0], b.body); const w = box(1.6, 1.4, .04, wingM, [sd * .8, -.2, 0], g); return g; });
  for (const x of [-.2, .2]) cyl(.04, .04, .4, fur, [x, .95, 0], b.root, 6);
  return b;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#5A3A2E', 0);
  w.lobby = group();
  box(40, 30, .5, mat('#7A5A8C'), [0, 15, -8], w.lobby);
  box(40, .5, 20, mat('#4A3A5A'), [0, 10.5, 0], w.lobby);
  box(1, 3, 1, mat('#FFD21F', { glow: .3 }), [-8, 7, -7.5], w.lobby);
  for (let i = 0; i < 6; i++) box(.8, .8, .2, mat('#FFE9A8'), [-2.5 + i, 6.5, -7.6], w.lobby);
  w.desk = group([0, 0, 0]);
  box(8, 3.6, 2.4, mat('#8B5A2B'), [0, 1.8, 0], w.desk); box(8.4, .3, 2.8, mat('#E8D2B0'), [0, 3.75, 0], w.desk);
  w.bell = group([2, 3.9, .4], w.desk);
  const dome = k.mesh(new k.THREE.SphereGeometry(.35, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat('#D4AF37', { metal: .8, rough: .2 }), [0, .05, 0], w.bell);
  cyl(.42, .42, .05, mat('#3A2A1E'), [0, 0, 0], w.bell, 16); ball(.07, mat('#D4AF37', { metal: .8 }), [0, .43, 0], w.bell);
  w.perch = cyl(.08, .08, 6, mat('#C0C0C8', { metal: .7 }), [0, 8.4, -.5], k.scene, 8); w.perch.rotation.z = Math.PI / 2;
  w.b = bat(k, k.scene, 1.4); w.bt = w.b.root;
  w.guest = group([0, 0, 0]);
  cyl(.8, .9, 3.2, mat('#2F6FD6'), [0, 1.6, 0], w.guest, 14); ball(.85, mat('#F2C9A0'), [0, 3.9, 0], w.guest);
  box(1.2, 1, .6, mat('#E2453C'), [1.3, .5, 0], w.guest);
  w.zs = group();
  for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zs); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, .2, 0], z); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, -.2, 0], z); const d = box(.55, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  w.family = group();
  w.fam = [];
  for (let i = 0; i < 14; i++) { const f = bat(k, w.family, .6); f.home = [(i % 7) * 1.6 - 5, 8.4 - .57, -1 - Math.floor(i / 7) * 1.4]; w.fam.push(f); }
  w.bar2 = cyl(.06, .06, 14, mat('#C0C0C8', { metal: .7 }), [0, 0, 0], w.family, 8); w.bar2.rotation.z = Math.PI / 2; w.bar2.position.set(0, 8.4, -1);
  w.bar3 = cyl(.06, .06, 14, mat('#C0C0C8', { metal: .7 }), [0, 0, 0], w.family, 8); w.bar3.rotation.z = Math.PI / 2; w.bar3.position.set(0, 8.4, -2.4);
  return w;
}

function hangAt(w, x, t, sway = .05) { w.bt.position.set(x, 8.4 - .95 * 1.4, -.5); w.bt.rotation.set(0, 0, sway * Math.sin(t * 1.5)); w.b.body.rotation.set(0, 0, 0); }

export default {
  id: '115',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE BAT RECEPTIONIST',
  year: 'ANIMALS AT WORK',
  hook: ['THIS BAT', 'RUNS A HOTEL DESK.'],
  title: 'This bat runs a hotel desk',
  description: 'Night shift only. Hangs upside down. Asleep all day. Then his whole family checks in. (A made-up bat and a made-up hotel.)',
  tags: ['animalsatwork', 'funny', 'bat', 'hotel', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the bat receptionist and his hotel are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This bat runs a hotel desk.',
      show: ['ground', 'lobby', 'desk', 'perch', 'bt'], sky: '#4A3A5A', lightAt: [0, 7, 3], lightDist: 16,
      cam: { pos: [2.5, 5.5, 16], look: [0, 8.7, 0], fov: 48, to: { pos: [2.3, 5.5, 15], look: [0, 8.6, 0], fov: 46 } },
      update: (w, p, t) => { hangAt(w, 0, t); w.b.wings.forEach((g, i) => { g.rotation.y = 0; }); w.b.head.rotation.z = .15 * Math.sin(t * 2); },
    },
    {
      say: 'Day shift? He is fast asleep.',
      show: ['ground', 'lobby', 'desk', 'perch', 'bt', 'guest', 'zs'], sky: '#FFE3C2', lightAt: [0, 6, 2], lightDist: 16,
      cam: { pos: [4, 5, 13], look: [.5, 6, 0], fov: 50, to: { pos: [3.6, 5, 12], look: [.5, 6, 0], fov: 48 } },
      update: (w, p, t) => {
        hangAt(w, 0, t, .02); w.b.wings.forEach((g, i) => { g.rotation.y = (i ? -1 : 1) * 1.3; }); w.b.head.rotation.z = 0;
        w.guest.position.set(3.5, 0, 3); w.guest.rotation.y = -.6; w.bell.position.y = 3.9 + (Math.sin(t * 10) > .7 ? -.05 : 0);
        w.zs.children.forEach(z => { const f = (t * .5 + z.userData.i / 3) % 1; z.position.set(1 + f * 1, 5.6 + f * 1.6, 0); z.scale.setScalar(.6 + f * .6); });
      },
    },
    {
      say: 'Night shift? He checks guests in. Upside down.',
      show: ['ground', 'lobby', 'desk', 'perch', 'bt', 'guest'], sky: '#1E1530', lightAt: [0, 7, 3], lightDist: 16,
      cam: { pos: [-3, 5, 12], look: [.5, 6, 0], fov: 50, to: { pos: [-2.6, 5, 11], look: [.5, 6, 0], fov: 48 } },
      update: (w, p, t) => {
        hangAt(w, 0, t); w.b.wings.forEach((g, i) => { g.rotation.y = 0; g.rotation.z = (i ? 1 : -1) * .3 * Math.sin(t * 6); }); w.b.head.rotation.z = .2 * Math.sin(t * 3);
        w.guest.position.set(2.5, 0, 3); w.guest.rotation.y = -.4;
      },
    },
    {
      say: 'Then his whole family checks in. All of them.',
      show: ['ground', 'lobby', 'desk', 'perch', 'bt', 'family'], sky: '#1E1530', lightAt: [0, 7, 0], lightDist: 18,
      cam: { pos: [3, 5, 15], look: [0, 7.4, -1], fov: 52, to: { pos: [2.6, 5, 14], look: [0, 7.4, -1], fov: 50 } },
      update: (w, p, t) => {
        hangAt(w, 0, t); w.b.wings.forEach(g => { g.rotation.set(0, 0, 0); });
        w.fam.forEach((f, i) => { const at = i * .12, q = Math.min(1, Math.max(0, (t - at) * 1.4)); const [hx, hy, hz] = f.home; f.root.position.set(hx + (1 - q) * 14, hy + (1 - q) * 2 + .3 * Math.sin(t * 8 + i) * (1 - q), hz); f.root.rotation.set(0, 0, q > .95 ? 0 : Math.PI); f.wings.forEach((g, s) => { g.rotation.y = q < .95 ? (s ? -1 : 1) * .8 * Math.sin(t * 20 + i) : 0; }); });
      },
    },
    {
      say: 'Stay at his hotel: yes, no, or only at night? Comment below.',
      quiz: { q: 'Would you stay at the bat\'s hotel?', options: ['Yes', 'No', 'Only at night'], answer: 'It is a made-up hotel. Check-in starts at sunset.' },
      show: ['ground', 'lobby', 'desk', 'perch', 'bt'], sky: '#274B73', lightAt: [0, 7, 3], lightDist: 16,
      cam: { pos: [2.5, 1.5, 12], look: [0, 7.6, 0], fov: 48, to: { pos: [-2.5, 1.5, 12], look: [0, 7.6, 0] } },
      update: (w, p, t) => { hangAt(w, 0, t); w.b.wings.forEach(g => { g.rotation.set(0, 0, 0); }); w.b.head.rotation.z = .15 * Math.sin(t * 2); },
    },
  ],
};
