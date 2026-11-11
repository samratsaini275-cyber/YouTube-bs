// 3D episode, narrative 2: "Why Is It Built Like That?" Models and airflow are simplified sketches, not simulations.
const FLOW = [300, 0, 0], OLD = [0, -300, 0], R = 6;
const LANES = [-10, -7.5, -5, -2.5, 2.5, 5, 7.5, 10];

function golfBall(k, parent, pos, dimpled, color = '#F7F7F2') {
  const g = k.group(pos, parent);
  k.ball(R, k.mat(color, { rough: .35 }), [0, 0, 0], g);
  if (dimpled) {
    const N = 320, T = k.THREE, im = new T.InstancedMesh(new T.SphereGeometry(.62, 10, 8), k.mat('#BFC5CE', { rough: .6 }), N), d = new T.Object3D();
    for (let i = 0; i < N; i++) {
      const y = 1 - (i + .5) * 2 / N, r = Math.sqrt(1 - y * y), a = i * 2.39996;
      d.position.set(Math.cos(a) * r * (R - .02), y * (R - .02), Math.sin(a) * r * (R - .02)); d.lookAt(0, 0, 0); d.scale.set(1, 1, .16); d.updateMatrix(); im.setMatrixAt(i, d.matrix);
    }
    g.add(im);
  }
  return g;
}

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  // --- hero ball on a tee ---
  w.grass = k.ground('#5FAE57', -10);
  w.hero = golfBall(k, k.scene, [0, 0, 0], true);
  w.tee = cyl(.9, .35, 6, mat('#E8C07A'), [0, -7.6, 0]);
  // --- the old "guttie": smooth brown ball, then one with nicks ---
  w.old = group(OLD);
  w.guttie = golfBall(k, w.old, [0, 0, 0], false, '#7A4B2A');
  w.nicks = group([0, 0, 0], w.old);
  for (let i = 0; i < 26; i++) { const y = 1 - (i + .5) * 2 / 26, r = Math.sqrt(1 - y * y), a = i * 2.39996; const n = box(1.8, .28, .28, mat('#3A2414'), [Math.cos(a) * r * R, y * R, Math.sin(a) * r * R], w.nicks); n.lookAt(OLD[0], OLD[1], OLD[2]); n.rotateZ(i * 1.7); }
  // --- airflow sketch ---
  w.flow = group(FLOW);
  w.smooth = golfBall(k, w.flow, [0, 0, 0], false); w.dimpled = golfBall(k, w.flow, [0, 0, 0], true);
  w.dots = [];
  LANES.forEach((y0, li) => { for (let j = 0; j < 9; j++) { const d = ball(.55, mat('#7FD0FF', { glow: 1.6 }), [0, 0, 0], w.flow); d.castShadow = false; d.userData = { y0, ph: j / 9 + li * .037 }; w.dots.push(d); } });
  w.wake = ball(1, mat('#FF3B30', { glow: .4, opacity: .38 }), [16, 0, 0], w.flow); w.wake.castShadow = false;
  w.drag = group([0, 0, 0], w.flow);
  w.dragShaft = cyl(.7, .7, 1, mat('#FF3B30', { glow: 1 }), [0, 0, 6], w.drag, 10); w.dragShaft.rotation.z = Math.PI / 2;
  w.dragHead = cone(1.8, 3.4, mat('#FF3B30', { glow: 1 }), [0, 0, 6], w.drag, 12); w.dragHead.rotation.z = -Math.PI / 2;
  w.lift = group([0, 0, 0], w.flow);
  cyl(.7, .7, 8, mat('#39D98A', { glow: 1 }), [0, 12, 0], w.lift, 10); cone(1.8, 3.4, mat('#39D98A', { glow: 1 }), [0, 17.6, 0], w.lift, 12);
  return w;
}

// wake: half-height of the dead-air region behind the ball. tilt: how much the wake is bent downward (backspin)
function flow(w, k, t, o) {
  const W = o.wake, tilt = o.tilt || 0;
  w.smooth.visible = !o.dimpled; w.dimpled.visible = !!o.dimpled; if (o.spin) w.dimpled.rotation.z = t * 5;
  w.dots.forEach(d => {
    const { y0, ph } = d.userData, x = -30 + ((t * .38 + ph) % 1) * 60;
    let y = y0 * (1 + (R * R * 1.35) / (x * x + y0 * y0 + 6));
    if (x > 1) { const grow = Math.min(1, (x - 1) / 6); y = Math.sign(y0) * Math.max(Math.abs(y), W * grow + Math.abs(y0) * .25); y -= tilt * Math.max(0, x - 2) * .28; }
    d.position.set(x, y, 0);
  });
  w.wake.scale.set(13, Math.max(.2, W * .95), 2.2); w.wake.position.set(15, -tilt * 3.6, 0); w.wake.rotation.z = -tilt * .27;
  const L = o.dragLen || 0; w.drag.visible = L > 0;
  w.dragShaft.scale.y = Math.max(.01, L); w.dragShaft.position.x = -R - 2 - L / 2 - 3.4; w.dragHead.position.x = -R - 2;
  w.dragShaft.position.z = w.dragHead.position.z = 0; w.dragShaft.position.y = w.dragHead.position.y = 13; w.drag.position.x = 12;
  w.lift.visible = !!o.lift;
}

export default {
  id: '023',
  style: '3d',
  voice: 'v3',
  case: 'GOLF BALL DIMPLES',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['WHY THE DIMPLES?', 'SMOOTH FLIES WORSE.'],
  title: 'Why golf balls have dimples',
  description: 'Dimples make the thin layer of air on a golf ball turbulent, so it stays attached longer and leaves a narrower low-pressure wake, which means less drag. They also increase the lift from backspin. Most modern balls have about 300–500 dimples.',
  tags: ['engineering', 'design', 'whyisitbuiltlikethat', 'golf', 'aerodynamics', 'shorts'],
  sources: [
    'Wikipedia, "Golf ball" — https://en.wikipedia.org/wiki/Golf_ball (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'Why are golf balls covered in dimples? Because a smooth ball flies worse. Really.',
      show: ['grass', 'hero', 'tee'], sky: '#BFE3F5', lightAt: [0, 0, 0], lightDist: 40,
      cam: { pos: [22, 8, 34], look: [0, 0, 0], fov: 40, to: { pos: [12, 4, 22], look: [0, 0, 0], fov: 36 } },
      update: (w, p, t) => { w.hero.rotation.y = t * .5; },
    },
    {
      say: 'Golfers found out by accident. Old balls, nicked from use, flew more consistently than smooth new ones. So makers began cutting marks in on purpose.',
      show: ['old'], sky: '#F1D9B5', lightAt: [0, -300, 0], lightDist: 40,
      cam: { pos: [18, -294, 30], look: [0, -300, 0], fov: 40, to: { pos: [-10, -296, 26], look: [0, -300, 0], fov: 38 } },
      label: (t) => t < 2.4 ? 'FOUND BY *ACCIDENT*' : t < 6.4 ? 'NICKED BALLS FLEW *BETTER*' : 'SO: MARKS *ON PURPOSE*', note: 'MODEL SIMPLIFIED',
      update: (w, p, t, k) => { w.guttie.rotation.y = w.nicks.rotation.y = t * .6; const a = k.h.win(t, 2, 3.4); w.nicks.visible = a > 0; w.nicks.scale.setScalar(.98 + a * .03); },
    },
    {
      say: 'Here is why. Air leaves a smooth ball early, and opens a wide, low pressure wake behind it. That wake drags the ball back.',
      show: ['flow'], sky: '#12202F', lightAt: [300, 0, 0], lightDist: 60,
      cam: { pos: [304, 6, 112], look: [304, 0, 0], fov: 40, to: { pos: [308, 4, 100], look: [305, 0, 0], fov: 40 } },
      label: (t) => t < 5 ? 'SMOOTH: A *WIDE WAKE*' : '*MORE* DRAG', note: 'AIRFLOW SKETCH · NOT A SIMULATION',
      update: (w, p, t, k) => flow(w, k, t, { wake: 6.4, dragLen: 9 * k.h.win(t, 4.6, 5.8) }),
    },
    {
      say: 'Dimples stir up the thin layer of air on the surface. Now it hangs on for longer. The wake narrows, and the drag drops.',
      show: ['flow'], sky: '#12301F', lightAt: [300, 0, 0], lightDist: 60,
      cam: { pos: [296, 6, 112], look: [304, 0, 0], fov: 40, to: { pos: [300, 4, 100], look: [305, 0, 0], fov: 40 } },
      label: (t) => t < 5 ? 'DIMPLES: AIR *HANGS ON*' : 'NARROW WAKE · *LESS* DRAG', note: 'AIRFLOW SKETCH · NOT A SIMULATION',
      update: (w, p, t, k) => flow(w, k, t, { dimpled: true, wake: k.h.lerp(6.4, 2.6, k.h.win(t, 2.6, 5)), dragLen: k.h.lerp(9, 4, k.h.win(t, 2.6, 5)) }),
    },
    {
      say: 'There is a second effect. Backspin bends the air downward, and that creates lift, a little like a wing.',
      show: ['flow'], sky: '#1D2B45', lightAt: [300, 0, 0], lightDist: 60,
      cam: { pos: [304, 10, 112], look: [304, 2, 0], fov: 40, to: { pos: [306, 8, 100], look: [305, 2, 0], fov: 40 } },
      label: (t) => t < 2.6 ? 'ADD *BACKSPIN*' : 'BACKSPIN = *LIFT*', note: 'AIRFLOW SKETCH · NOT A SIMULATION',
      update: (w, p, t, k) => flow(w, k, t, { dimpled: true, spin: true, wake: 2.6, tilt: k.h.win(t, 1.6, 3.6), lift: t > 3.2 }),
    },
    {
      say: 'Most modern balls have between {300|three hundred} and {500|five hundred} dimples.',
      show: ['grass', 'hero', 'tee'], sky: '#F3C9A8', lightAt: [0, 0, 0], lightDist: 40,
      cam: { pos: [-14, 6, 22], look: [0, 0, 0], fov: 38, to: { pos: [-8, 3, 15], look: [0, 0, 0], fov: 34 } },
      label: '*300 TO 500* DIMPLES',
      update: (w, p, t) => { w.hero.rotation.y = t * .9; },
    },
    {
      say: 'Quick question. What is the record number of dimples on a single ball? A, {612.|six hundred and twelve.} B, {1,070.|one thousand and seventy.} Or C, {2,400.|two thousand four hundred.} Comment your answer.',
      quiz: { q: 'What is the record number of dimples on a single golf ball?', options: ['612', '1,070', '2,400'], answer: 'B — 1,070: 414 larger dimples and 656 pinhead-sized ones.' },
      show: ['grass', 'hero', 'tee'], sky: '#274B73', lightAt: [0, 0, 0], lightDist: 40,
      cam: { pos: [14, 30, 44], look: [0, -22, 0], fov: 46, to: { pos: [-14, 30, 44], look: [0, -22, 0] } },
      update: (w, p, t) => { w.hero.rotation.y = t * .5; },
    },
  ],
};
