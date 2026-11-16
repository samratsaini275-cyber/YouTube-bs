// 3D episode, narrative 3: "Engineering Nonsense". A made-up comedy sketch: the noise-cancelling alarm clock is fictional.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.floor = k.ground('#5A4A6A', 0);
  w.room = group();
  box(80, 40, 1, mat('#3B3355'), [0, 20, -14], w.room);
  box(10, 14, .4, mat('#1E2A4A', { glow: .2 }), [-14, 18, -13.6], w.room);   // night window
  ball(1.4, mat('#FFF6C9', { glow: 2 }), [-12, 22, -13.3], w.room);
  // bed with a sleeper
  w.bed = group([2, 0, -2]);
  box(18, 3, 10, mat('#8C6B4A'), [0, 1.5, 0], w.bed); box(18, 1.4, 10, mat('#F4F1EA'), [0, 3.7, 0], w.bed);
  box(5, 1.4, 6, mat('#FFFFFF'), [-6, 5, 0], w.bed);
  w.blanket = box(11, 1.6, 9.6, mat('#4F7BE0'), [2.5, 5, 0], w.bed);
  w.head = ball(1.6, mat('#F2C9A0'), [-5.6, 6.6, 0], w.bed);
  for (const z of [-.5, .5]) box(.5, .1, .1, mat('#111111'), [-4.4, 7, z], w.bed);
  w.zs = group([-5, 9, 0], w.bed);
  for (let i = 0; i < 3; i++) { const zz = box(.9 + i * .3, .9 + i * .3, .15, mat('#C9D8FF', { glow: 1 }), [0, 0, 0], w.zs); zz.castShadow = false; zz.userData.i = i; }
  // nightstand + alarm clock
  w.stand = group([-12, 0, 2]);
  box(5, 5, 5, mat('#6B4B2E'), [0, 2.5, 0], w.stand);
  w.clock = group([0, 5, 0], w.stand);
  cyl(1.8, 1.8, 1.2, mat('#E2453C', { metal: .3 }), [0, 1.9, 0], w.clock, 32).rotation.x = Math.PI / 2;
  k.mesh(new k.THREE.CircleGeometry(1.5, 32), mat('#FFFFFF'), [0, 1.9, .62], w.clock);
  w.hand1 = box(.12, 1.1, .05, mat('#111111'), [0, 2.3, .66], w.clock); w.hand2 = box(.1, .8, .05, mat('#111111'), [.35, 1.9, .66], w.clock); w.hand2.rotation.z = -1.57;
  w.bells = [];
  for (const x of [-1.3, 1.3]) { const b = ball(.8, mat('#D4AF37', { metal: .8, rough: .2 }), [x, 3.6, 0], w.clock); w.bells.push(b); }
  for (const x of [-1.2, 1.2]) cyl(.12, .12, 1, mat('#333333'), [x, .5, 0], w.clock, 8);
  // sound waves: orange go out, blue (cancelling) come back in
  w.waves = group([-12, 8, 2]);
  w.out = []; w.anti = [];
  for (let i = 0; i < 3; i++) { const o = k.torus(1, .12, mat('#FF8A1F', { glow: 2 }), [0, 0, 0], w.waves); o.rotation.x = 0; w.out.push(o); const a = k.torus(1, .22, mat('#1E90FF', { glow: 3 }), [0, 0, 0], w.waves); a.rotation.x = 0; w.anti.push(a); }
  return w;
}

function ring(w, t, on = true) {
  w.clock.rotation.z = on ? .08 * Math.sin(t * 40) : 0;
  w.bells.forEach((b, i) => { b.position.y = 3.6 + (on ? .1 * Math.sin(t * 40 + i * 3) : 0); });
}
function waves(w, t, cancel) {
  w.out.forEach((o, i) => { const p = (t * .8 + i / 3) % 1; o.scale.setScalar(1 + p * 6); o.material.opacity = 1 - p; o.material.transparent = true; o.visible = !cancel || p < .5; });
  w.anti.forEach((a, i) => { const p = (t * .8 + i / 3) % 1; a.scale.setScalar(7 - p * 6); a.material.opacity = p; a.material.transparent = true; a.visible = cancel && p < .5; });
}
function snore(w, t) { w.zs.children.forEach(z => { const p = (t * .5 + z.userData.i / 3) % 1; z.position.set(p * 2.5, p * 4, 0); z.rotation.z = .4; z.scale.setScalar(.5 + p); }); w.blanket.scale.y = 1 + .06 * Math.sin(t * 2); }
const ALL = ['floor', 'room', 'bed', 'stand'];

export default {
  id: '043',
  style: '3d',
  voice: 'v3',
  case: 'THE SILENT ALARM',
  year: 'ENGINEERING NONSENSE',
  hook: ['THIS ALARM', 'CANCELS ITSELF.'],
  title: 'Engineers gave an alarm clock noise cancelling',
  description: 'It rings right on time. Then it hears itself. (A made-up alarm clock. Please keep using yours.)',
  tags: ['engineering', 'funny', 'engineeringnonsense', 'alarmclock', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the noise-cancelling alarm clock and the nine-day nap are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This alarm clock has noise cancelling.',
      show: ALL, sky: '#2A2440', lightAt: [-8, 4, 0], lightDist: 30,
      cam: { pos: [-4, 13, 30], look: [-7, 5, 0], fov: 46, to: { pos: [-6, 11, 24], look: [-8, 5.5, 0], fov: 44 } },
      update: (w, p, t) => { ring(w, t, false); w.waves.visible = false; snore(w, t); },
    },
    {
      say: 'At seven, it rings.',
      show: [...ALL, 'waves'], sky: '#3A2F55', lightAt: [-12, 6, 2], lightDist: 20,
      cam: { pos: [-6, 10, 14], look: [-12, 7.5, 2], fov: 42, to: { pos: [-7, 9.5, 11], look: [-12, 7.5, 2], fov: 40 } },
      shake: (t) => .2,
      update: (w, p, t) => { ring(w, t); w.waves.visible = true; waves(w, t, false); snore(w, t); },
    },
    {
      say: 'Then it hears itself. And cancels the ring.',
      show: [...ALL, 'waves'], sky: '#2A3E66', lightAt: [-12, 6, 2], lightDist: 20,
      cam: { pos: [-18, 11, 14], look: [-12, 7.5, 2], fov: 44, to: { pos: [-17, 10, 11], look: [-12, 7.5, 2], fov: 42 } },
      update: (w, p, t) => { ring(w, t); w.waves.visible = true; waves(w, t, true); snore(w, t); },
    },
    {
      say: 'Perfect silence.',
      show: ALL, sky: '#1E1A30', lightAt: [-4, 5, 0], lightDist: 25,
      cam: { pos: [-4, 11, 24], look: [-8, 6, 0], fov: 44, to: { pos: [-5, 10, 20], look: [-8, 6, 0], fov: 42 } },
      update: (w, p, t) => { ring(w, t); w.waves.visible = false; snore(w, t); },
    },
    {
      say: 'He has been asleep for nine days.',
      show: ALL, sky: '#16122A', lightAt: [-2, 5, -2], lightDist: 25,
      cam: { pos: [0, 22, 16], look: [-2, 4, -2], fov: 46, to: { pos: [0, 20, 13], look: [-2, 4, -2], fov: 44 } },
      update: (w, p, t) => { ring(w, t, false); w.hand1.rotation.z = -t * 6; w.hand2.rotation.z = -t; w.waves.visible = false; snore(w, t * 1.5); },
    },
    {
      say: 'Quick question. What should the clock do instead? Option A, ring louder. Option B, splash water. Or option C, just let him sleep. Comment your answer.',
      quiz: { q: 'What should the clock do instead?', options: ['Ring louder', 'Splash water', 'Just let him sleep'], answer: 'A made-up clock, so any answer works. (C is the kind one.)' },
      show: ALL, sky: '#274B73', lightAt: [-4, 5, 0], lightDist: 30,
      cam: { pos: [8, 4, 30], look: [-4, 14, 0], fov: 46, to: { pos: [-16, 4, 30], look: [-4, 14, 0] } },
      update: (w, p, t) => { ring(w, t, false); snore(w, t); },
    },
  ],
};
