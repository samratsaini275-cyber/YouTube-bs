// Narrative 7: "Animals at Work". A made-up comedy sketch: pufferfish do not make balloon animals; nobody is hurt (he just puffs up and floats).
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the pufferfish next to party balloons.

function puffer(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.body = group([0, 0, 0], p.root);
  p.ball = ball(1, mat('#F2C14E', { rough: .5 }), [0, 0, 0], p.body); p.ball.scale.set(1.3, .9, .9);
  ball(.75, mat('#FFF1C8'), [0, -.3, .3], p.body).scale.set(1.3, .7, .8);
  for (const z of [-.45, .45]) { ball(.28, mat('#FFFFFF'), [.75, .25, z], p.body); ball(.14, mat('#111111'), [.95, .27, z * 1.05], p.body); }
  ball(.12, mat('#E2453C'), [1.25, -.1, 0], p.body).scale.set(.6, 1, 1.4);
  p.tail = group([-1.2, 0, 0], p.body); const tf = cone(.5, .8, mat('#E8A33C'), [-.3, 0, 0], p.tail, 4); tf.rotation.z = Math.PI / 2;
  p.fins = [-1, 1].map(s => { const g = group([.1, -.1, s * .85], p.body); const f = box(.5, .05, .4, mat('#E8A33C'), [0, 0, s * .2], g); return g; });
  p.spikes = group([0, 0, 0], p.body);
  for (let i = 0; i < 40; i++) { const u = (i + .5) / 40, th = Math.acos(1 - 2 * u), ph = i * 2.4; const d = new k.THREE.Vector3(Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)); const sp = cone(.08, .3, mat('#C08A30'), [d.x * 1.02, d.y * 1.02, d.z * 1.02], p.spikes, 4); sp.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), d); }
  return p;
}
function puff(p, f) { const s = 1 + f * 1.2; p.ball.scale.set(1.3 + f * .9, .9 + f * 1.3, .9 + f * 1.3); p.spikes.scale.set(1.3 + f * .9, .9 + f * 1.3, .9 + f * 1.3); p.spikes.visible = f > .2; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8C9A0', 0);
  w.room = group();
  box(50, 26, .5, mat('#BFE3F5'), [0, 13, -8], w.room);
  for (let i = 0; i < 9; i++) { const fl = cone(.6, 1, mat(['#E2453C', '#FFD21F', '#22C55E', '#2F6FD6'][i % 4], { double: true }), [-8 + i * 2, 10.5, -7.6], w.room, 3); fl.rotation.z = Math.PI; }
  box(18, .08, .08, mat('#FFFFFF'), [0, 11.1, -7.6], w.room);
  w.balloons = group([0, 0, 0]);
  for (let i = 0; i < 4; i++) { const bl = group([-4 + i * 1.3, 0, -3], w.balloons); const b = ball(.7, mat(['#E2453C', '#2F6FD6', '#22C55E', '#FF4D6D'][i], { rough: .2 }), [0, 4.6 + (i % 2) * .6, 0], bl); b.scale.y = 1.2; cyl(.015, .015, 4, mat('#FFFFFF'), [0, 2.2 + (i % 2) * .3, 0], bl, 4); }
  w.p = puffer(k, k.scene); w.pf = w.p.root;
  w.table = group([3, 0, -1]);
  cyl(2.2, 2.2, .2, mat('#FFFFFF'), [0, 3, 0], w.table, 24); cyl(.2, .2, 3, mat('#9AA3AE'), [0, 1.5, 0], w.table, 8);
  w.cake = group([3, 3.1, -1]);
  cyl(1, 1, .9, mat('#FFB3C7'), [0, .45, 0], w.cake, 20); for (let i = 0; i < 5; i++) { const c = cyl(.05, .05, .4, mat('#FFFFFF'), [Math.cos(i * 1.26) * .6, 1.1, Math.sin(i * 1.26) * .6], w.cake, 6); }
  w.kid = group([0, 0, 0]);
  cyl(.6, .7, 2.2, mat('#8B5CF6'), [0, 1.1, 0], w.kid, 12); ball(.65, mat('#F2C9A0'), [0, 2.75, 0], w.kid);
  w.keyes = [-.22, .22].map(x => ball(.09, mat('#111111'), [x, 2.85, .58], w.kid));
  w.hat = cone(.45, 1, mat('#FFD21F'), [0, 3.6, 0], w.kid, 12);
  w.sneeze = group();
  for (let i = 0; i < 8; i++) { const s = ball(.12, mat('#BFE8FF', { glow: .4, opacity: .8 }), [0, 0, 0], w.sneeze); s.userData = { a: i * .8, ph: (i * .17) % 1 }; s.castShadow = false; }
  return w;
}

export default {
  id: '119',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE PUFFERFISH BALLOON ARTIST',
  year: 'ANIMALS AT WORK',
  hook: ['THIS PUFFERFISH', 'MAKES BALLOONS.'],
  title: 'This pufferfish makes balloons',
  description: 'Every balloon animal is round. Every balloon animal is him. Then the birthday kid sneezes. (A made-up pufferfish.)',
  tags: ['animalsatwork', 'funny', 'pufferfish', 'party', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the pufferfish balloon artist is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This pufferfish makes balloons.',
      show: ['ground', 'room', 'balloons', 'pf'], sky: '#BFE3F5', lightAt: [-1, 4, 0], lightDist: 12,
      cam: { pos: [1.5, 3, 12], look: [-1, 5.4, -1], fov: 48, to: { pos: [1.3, 3, 11], look: [-1, 5.3, -1], fov: 46 } },
      update: (w, p, t) => { puff(w.p, 0); w.pf.position.set(-.6, 3.4 + .15 * Math.sin(t * 3), 0); w.pf.rotation.y = -.5; w.p.tail.rotation.y = .4 * Math.sin(t * 8); w.p.fins.forEach((f, i) => { f.rotation.x = (i ? -1 : 1) * .4 * Math.sin(t * 10); }); },
    },
    {
      say: 'Want a balloon dog? Too bad. Everything is round.',
      show: ['ground', 'room', 'pf', 'kid'], sky: '#BFE3F5', lightAt: [0, 4, 0], lightDist: 12,
      cam: { pos: [1, 3.6, 12], look: [.3, 4, 0], fov: 48, to: { pos: [.9, 3.6, 11], look: [.3, 4, 0], fov: 46 } },
      update: (w, p, t) => {
        const f = Math.min(1, Math.max(0, (t - .8) * 2)); puff(w.p, f); w.pf.position.set(-1, 3.6 + .1 * Math.sin(t * 3), 0); w.pf.rotation.y = -.2;
        w.kid.position.set(2.2, 0, .8); w.kid.rotation.y = -.6; w.keyes.forEach(e => e.scale.setScalar(1)); w.p.tail.rotation.y = .4 * Math.sin(t * 8);
      },
    },
    {
      say: 'Then the birthday kid sneezes.',
      show: ['ground', 'room', 'pf', 'kid', 'table', 'cake', 'sneeze'], sky: '#BFE3F5', lightAt: [1, 4, 0], lightDist: 14,
      cam: { pos: [2, 4, 13], look: [.8, 3.6, 0], fov: 50, to: { pos: [1.8, 4, 12], look: [.8, 3.6, 0], fov: 48 } },
      shake: (t) => t > .9 && t < 1.2 ? .08 : 0,
      update: (w, p, t) => {
        puff(w.p, 0); w.pf.position.set(-1.2, 3.6, .6); w.pf.rotation.y = -.3; w.kid.position.set(1.4, 0, 1.2); w.kid.rotation.set(t > .9 ? -.25 : .1, -.9, 0);
        w.sneeze.children.forEach(s => { const u = s.userData, q = Math.max(0, t - .9) * 1.5; s.visible = q > 0 && q < 1; s.position.set(1.2 - q * 2.4, 2.8 + Math.sin(u.a) * q * .6, 1.4 + Math.cos(u.a) * q * .6); });
      },
    },
    {
      say: 'He puffs up, and floats around for an hour.',
      show: ['ground', 'room', 'pf', 'kid', 'table', 'cake'], sky: '#FFE3C2', lightAt: [0, 6, 0], lightDist: 16,
      cam: { pos: [2, 5, 15], look: [0, 6, 0], fov: 52, to: { pos: [1.8, 5, 14], look: [0, 6.5, 0], fov: 50 } },
      update: (w, p, t) => {
        puff(w.p, 1); w.pf.position.set(-1 + .6 * Math.sin(t * .8), 5 + t * .9, .3); w.pf.rotation.set(0, t * .6, .2 * Math.sin(t * 2));
        w.kid.position.set(1.8, 0, 1.6); w.kid.rotation.set(0, -.6, 0); w.keyes.forEach(e => e.scale.setScalar(1.6));
      },
    },
    {
      say: 'Book the pufferfish: yes, no, or only round balloons? Comment below.',
      quiz: { q: 'Would you book the pufferfish for a party?', options: ['Yes', 'No', 'Only round balloons'], answer: 'He is a made-up balloon artist. No sneezing allowed.' },
      show: ['ground', 'room', 'balloons', 'pf'], sky: '#274B73', lightAt: [-1, 4, 0], lightDist: 12,
      cam: { pos: [1.5, 1.5, 12], look: [-1, 7, -1], fov: 48, to: { pos: [-3, 1.5, 12], look: [-1, 7, -1] } },
      update: (w, p, t) => { puff(w.p, 0); w.pf.position.set(-.6, 3.4 + .15 * Math.sin(t * 3), 0); w.pf.rotation.set(0, -.5, 0); w.p.tail.rotation.y = .4 * Math.sin(t * 8); },
    },
  ],
};
