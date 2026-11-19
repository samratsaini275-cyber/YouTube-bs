// Narrative 8: "Objects With Opinions". A made-up comedy sketch: alarm clocks do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the alarm clock with a face on a bedside table.

function clock(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const c = { root: group([0, 0, 0], parent) };
  c.body = group([0, 0, 0], c.root);
  const face = cyl(1.3, 1.3, .7, mat('#E2453C', { rough: .4 }), [0, 1.6, 0], c.body, 28); face.rotation.x = Math.PI / 2;
  const dial = cyl(1.1, 1.1, .05, mat('#FFFFFF'), [0, 1.6, .37], c.body, 28); dial.rotation.x = Math.PI / 2;
  c.bells = [-1, 1].map(s => { const g = group([s * .8, 2.8, 0], c.body); const b = k.mesh(new k.THREE.SphereGeometry(.45, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat('#C0C0C8', { metal: .8, rough: .2 }), [0, 0, 0], g); g.rotation.z = -s * .5; return g; });
  cyl(.05, .05, 1.6, mat('#C0C0C8', { metal: .8 }), [0, 3.1, 0], c.body, 6).rotation.z = Math.PI / 2;
  for (const s of [-1, 1]) { const l = cyl(.06, .04, .5, mat('#2A2A2A'), [s * .7, .3, 0], c.body, 6); l.rotation.z = s * .4; }
  for (const x of [-.4, .4]) { ball(.2, mat('#FFFFFF'), [x, 1.95, .45], c.body); ball(.1, mat('#111111'), [x, 1.95, .58], c.body); }
  c.mouth = box(.5, .08, .05, mat('#5A1E1E'), [0, 1.2, .42], c.body);
  c.handH = group([0, 1.6, .42], c.body); box(.07, .45, .03, mat('#111111'), [0, .2, 0], c.handH);
  c.handM = group([0, 1.6, .43], c.body); box(.05, .7, .03, mat('#111111'), [0, .32, 0], c.handM);
  return c;
}
function talk(c, t, on = true) { c.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function ring(c, t) { c.body.rotation.z = .12 * Math.sin(t * 40); c.bells.forEach((b, i) => { b.position.y = 2.8 + .05 * Math.sin(t * 60 + i); }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#8B6B4A', 0);
  w.room = group();
  box(40, 20, .5, mat('#3A4A6A'), [0, 10, -8], w.room);
  box(4, 5, .2, mat('#1E2440'), [-6, 8, -7.7], w.room);
  w.moon = ball(.6, mat('#FFF6C2', { glow: 2 }), [-6, 9, -7.5], w.room);
  w.table = group([0, 0, 0]);
  box(3, 3, 3, mat('#C08A48'), [0, 1.5, 0], w.table);
  w.bed = group([-4, 0, 0]);
  box(5, 1.6, 7, mat('#FFFFFF'), [0, .8, 0], w.bed); box(5, 1.2, 6, mat('#2F6FD6'), [0, 1.9, .5], w.bed); box(3, .6, 1.4, mat('#F4F1E8'), [0, 2.1, -2.7], w.bed);
  w.sleeper = group([-4, 2.4, -2.5]); ball(.8, mat('#F2C9A0'), [0, 0, 0], w.sleeper);
  w.c = clock(k, k.scene); w.ck = w.c.root;
  w.arm = group([0, 0, 0]); cyl(.3, .3, 3, mat('#F2C9A0'), [0, 1.5, 0], w.arm, 10); ball(.45, mat('#F2C9A0'), [0, 3.1, 0], w.arm);
  w.rings = group();
  for (let i = 0; i < 3; i++) { const r = k.torus(.6, .05, mat('#FFD21F', { glow: 1.5 }), [0, 0, 0], w.rings); r.userData.i = i; r.castShadow = false; }
  w.zs = group();
  for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zs); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, .2, 0], z); box(.4, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, -.2, 0], z); const d = box(.55, .07, .04, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  w.sat = group([0, 0, 0]);
  box(2.4, .9, .1, mat('#FFFFFF'), [0, 0, 0], w.sat); for (let i = 0; i < 3; i++) box(.5, .5, .12, mat('#E2453C'), [-.7 + i * .7, 0, .01], w.sat);
  return w;
}

export default {
  id: '125',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ALARM CLOCK WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS ALARM CLOCK', 'HAS A COMPLAINT.'],
  title: 'This alarm clock has a complaint',
  description: 'He does his job. He gets slapped. He gets thrown. So on Saturday, he takes a lie-in. (A made-up talking alarm clock.)',
  tags: ['objectswithopinions', 'funny', 'alarmclock', 'morning', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking alarm clocks are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This alarm clock has a complaint.',
      show: ['ground', 'room', 'table', 'ck'], sky: '#3A4A6A', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [1.5, 2.8, 11], look: [0, 5.6, 0], fov: 44, to: { pos: [1.4, 2.8, 10.3], look: [0, 5.5, 0], fov: 42 } },
      update: (w, p, t) => { w.ck.position.set(0, 3, 0); w.ck.rotation.set(0, -.2, 0); w.c.body.rotation.z = 0; talk(w.c, t, t > .2); w.c.handM.rotation.z = -t; w.c.handH.rotation.z = -1; },
    },
    {
      say: 'He does his job. He gets slapped.',
      show: ['ground', 'room', 'table', 'ck', 'arm', 'rings', 'bed', 'sleeper'], sky: '#5A6A8A', lightAt: [-1, 4, 1], lightDist: 14,
      cam: { pos: [2, 6, 11], look: [-1.2, 3.4, 0], fov: 50, to: { pos: [1.8, 6, 10], look: [-1.2, 3.4, 0], fov: 48 } },
      shake: (t) => t > 1.1 && t < 1.3 ? .1 : 0,
      update: (w, p, t) => {
        w.ck.position.set(0, 3, 0); w.ck.rotation.set(0, -.2, 0); const slap = t > 1.1; talk(w.c, t, !slap);
        if (!slap) ring(w.c, t); else { w.c.body.rotation.z = 0; w.ck.scale.set(1, Math.max(.6, 1 - (t - 1.1) * 2), 1); }
        const a = Math.min(1, Math.max(0, (t - .7) * 2.5)); w.arm.position.set(-2.5 + a * 2.5, 2.6 + (1 - a) * 0, 0); w.arm.rotation.set(0, 0, -Math.PI / 2 + a * .3); w.arm.position.y = 3 + 2.2 * (1 - a) + 1.6 * a;
        w.rings.children.forEach(r => { const f = (t * 2 + r.userData.i / 3) % 1; r.visible = !slap; r.position.set(0, 4.6, 0); r.scale.setScalar(.6 + f * 1.4); r.rotation.x = Math.PI / 2; });
      },
    },
    {
      say: 'On Mondays, he gets thrown across the room.',
      show: ['ground', 'room', 'ck', 'bed', 'sleeper'], sky: '#5A6A8A', lightAt: [0, 5, 0], lightDist: 18,
      cam: { pos: [4, 7, 15], look: [2, 4, -3], fov: 54, to: { pos: [3.6, 7, 14], look: [2.5, 4, -3], fov: 52 } },
      update: (w, p, t) => {
        w.ck.scale.setScalar(1); const f = Math.min(1, t / 1.2); w.ck.position.set(-2 + f * 8, 3 + 5 * Math.sin(f * Math.PI) - f * 1.5, -f * 5); w.ck.rotation.set(t * 3, t * 5, t * 7); talk(w.c, t);
      },
    },
    {
      say: 'So on Saturday, he gave himself a lie-in.',
      show: ['ground', 'room', 'table', 'ck', 'zs', 'sat'], sky: '#FFE3C2', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [1.5, 3.6, 11], look: [0, 4.9, 0], fov: 44, to: { pos: [1.4, 3.6, 10.3], look: [0, 4.9, 0], fov: 42 } },
      update: (w, p, t) => {
        w.ck.position.set(0, 3, 0); w.ck.rotation.set(0, -.2, -.2); talk(w.c, t, false); w.c.body.rotation.z = 0;
        w.zs.children.forEach(z => { const f = (t * .5 + z.userData.i / 3) % 1; z.position.set(.8 + f * 1, 5.6 + f * 1.6, .4); z.scale.setScalar(.6 + f * .6); });
        w.sat.position.set(-1.6, 5.8, -1); w.sat.visible = t > .8;
      },
    },
    {
      say: 'Alarm clock: snooze, smash, or obey? Comment below.',
      quiz: { q: 'What do you do when your alarm rings?', options: ['Snooze', 'Smash', 'Obey'], answer: 'This clock is made up. It votes for a lie-in.' },
      show: ['ground', 'room', 'table', 'ck'], sky: '#274B73', lightAt: [0, 4, 2], lightDist: 10,
      cam: { pos: [1.5, 2.4, 8], look: [0, 5.6, 0], fov: 44, to: { pos: [-1.5, 2.4, 8], look: [0, 5.6, 0] } },
      update: (w, p, t) => { w.ck.position.set(0, 3, 0); w.ck.rotation.set(0, -.2, 0); talk(w.c, t, false); w.c.handM.rotation.z = -t; },
    },
  ],
};
