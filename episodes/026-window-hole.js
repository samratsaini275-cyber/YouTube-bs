// 3D episode, narrative 2: "Why Is It Built Like That?" Models are simplified and not to scale.
// From 026 on: no headline text at the top of the screen; hooks lean on a little fear; descriptions tease.
const OVAL = (k, r, t, m, pos, parent) => { const c = k.cyl(r, r, t, m, pos, parent, 48); c.rotation.x = Math.PI / 2; c.scale.set(.72, 1, 1); return c; };

function setup(k) {
  const { mat, box, cyl, cone, ball, group } = k;
  const w = {};
  // cabin wall with a window, seen from inside
  w.wall = group();
  box(40, 44, 1.2, mat('#EDEAE4', { rough: .8 }), [0, 0, -1.6], w.wall);
  const trim = cyl(8.4, 8.4, 1.4, mat('#D9D4CA'), [0, 0, -1.3], w.wall, 48); trim.rotation.x = Math.PI / 2; trim.scale.set(.72, 1, 1);
  w.panes = group([0, 0, 0], w.wall);
  w.outer = OVAL(k, 7.2, .5, mat('#9FD3FF', { opacity: .35, rough: .1 }), [0, 0, -6], w.panes);
  w.middle = OVAL(k, 7, .4, mat('#CFEAFF', { opacity: .3, rough: .1 }), [0, 0, -4], w.panes);
  w.inner = OVAL(k, 7.4, .3, mat('#FFFFFF', { opacity: .18, rough: .2 }), [0, 0, -2], w.panes);
  w.hole = cyl(.32, .32, .6, mat('#1B1D22'), [0, -5.2, -4], w.panes, 16); w.hole.rotation.x = Math.PI / 2;
  w.fog = OVAL(k, 6.8, 1.4, mat('#FFFFFF', { opacity: .6 }), [0, 0, -5], w.panes); w.fog.castShadow = false;
  // sky and clouds outside
  w.clouds = group([0, -10, -70]);
  for (let i = 0; i < 9; i++) ball(5 + (i % 3) * 2, mat('#FFFFFF', { rough: 1 }), [-40 + i * 10, (i % 2) * 4, -(i % 3) * 8], w.clouds).castShadow = false;
  // pressure arrows
  w.push = group([0, 0, 0], w.wall);
  for (const [x, y] of [[-3, 3], [3, 3], [-3, -3], [3, -3], [0, 0]]) {
    const a = group([x, y, 4], w.push);
    const s = cyl(.35, .35, 3, mat('#FF4D4D', { glow: .8 }), [0, 0, 0], a, 12); s.rotation.x = Math.PI / 2;
    const hd = cone(.9, 1.6, mat('#FF4D4D', { glow: .8 }), [0, 0, -2.2], a, 12); hd.rotation.x = -Math.PI / 2;
  }
  return w;
}
// spread: how far apart the panes are pulled (0 = installed)
function panes(w, spread) {
  w.outer.position.z = -6 - spread * 10; w.middle.position.z = -4 - spread * 4; w.inner.position.z = -2 + spread * 4;
  w.hole.position.z = w.middle.position.z;
}

export default {
  id: '026',
  style: '3d',
  voice: 'v3',
  case: 'THE WINDOW HOLE',
  year: 'WHY IS IT BUILT LIKE THAT?',
  hook: ['A HOLE IN YOUR', 'PLANE WINDOW?'],
  title: 'Why airplane windows have a tiny hole',
  description: 'There is a hole drilled into the window between you and the sky. On purpose. Here is what it is protecting you from.',
  tags: ['engineering', 'design', 'whyisitbuiltlikethat', 'aviation', 'airplane', 'shorts'],
  sources: [
    'TIME, "Here\'s the Perfectly Logical Reason Airplane Windows Have Holes" (Jack Linshi, 1 June 2015), citing pilot Mark Vanhoenacker in Slate — https://time.com/3903109/airplane-window-holes/ (retrieved November 2026)',
  ],
  setup,
  scenes: [
    {
      say: 'There is a hole in your airplane window. Miles above the ground. And someone put it there on purpose.',
      show: ['wall', 'clouds'], sky: '#7FB8EA', lightAt: [0, 0, 0], lightDist: 40,
      cam: { pos: [4, -2, 26], look: [0, -2, -4], fov: 44, to: { pos: [1, -4.6, 9], look: [0, -5, -4], fov: 34 } },
      update: (w, p) => { panes(w, 0); w.fog.visible = false; w.push.visible = false; },
    },
    {
      say: 'Your window is not one sheet of glass. It is three.',
      show: ['wall', 'clouds'], sky: '#8EC5F0', lightAt: [0, 0, -4], lightDist: 40,
      cam: { pos: [30, 8, 14], look: [0, 0, -6], fov: 40, to: { pos: [26, 4, 4], look: [0, 0, -7], fov: 40 } },
      update: (w, p, t, k) => { panes(w, k.h.win(t, .3, 2)); w.fog.visible = false; w.push.visible = false; },
    },
    {
      say: 'The tiny hole is in the middle one.',
      show: ['wall', 'clouds'], sky: '#9AC9EE', lightAt: [0, -5, -8], lightDist: 30,
      cam: { pos: [10, -3, 6], look: [0, -5, -8], fov: 36, to: { pos: [4, -4.6, -1], look: [0, -5.2, -8], fov: 30 } },
      update: (w) => { panes(w, 1); w.fog.visible = false; w.push.visible = false; },
    },
    {
      say: 'Up there, the cabin air is kept at a much higher pressure than the thin air outside. And all of it pushes on your window.',
      show: ['wall', 'clouds'], sky: '#3B5B8C', lightAt: [0, 0, -4], lightDist: 40,
      cam: { pos: [28, 10, 20], look: [0, 0, -4], fov: 42, to: { pos: [22, 6, 14], look: [0, 0, -5], fov: 40 } },
      shake: (t) => .08,
      update: (w, p, t, k) => { panes(w, 0); w.fog.visible = false; w.push.visible = true; w.push.position.z = -1.5 * k.h.win(t, 1, 4) + .3 * Math.sin(t * 6); },
    },
    {
      say: 'The hole lets cabin air into the gap. So the outer pane takes the load. If a pane ever gives way, it is that one. The middle pane is still there.',
      show: ['wall', 'clouds'], sky: '#24385C', lightAt: [0, 0, -6], lightDist: 40,
      cam: { pos: [32, 4, 4], look: [0, 0, -8], fov: 40, to: { pos: [28, 2, -2], look: [0, 0, -9], fov: 38 } },
      update: (w, p, t, k) => {
        panes(w, .7); w.fog.visible = false; w.push.visible = false;
        const g = k.h.win(t, 1.5, 3);
        w.outer.material.color.set(g > .5 ? '#FF6A4D' : '#9FD3FF'); w.outer.material.emissive.set(g > .5 ? '#FF3B30' : '#000000'); w.outer.material.emissiveIntensity = .6 * g;
        w.middle.material.color.set(t > 6.5 ? '#7CFFB0' : '#CFEAFF');
      },
    },
    {
      say: 'Bonus: it lets moisture out of the gap, so your view stays mostly free of fog.',
      show: ['wall', 'clouds'], sky: '#8EC5F0', lightAt: [0, 0, 0], lightDist: 40,
      cam: { pos: [-6, 0, 22], look: [0, 0, -4], fov: 42, to: { pos: [-2, 0, 14], look: [0, 0, -5], fov: 40 } },
      update: (w, p, t, k) => {
        panes(w, 0); w.push.visible = false; w.fog.visible = true; w.fog.material.opacity = .6 * (1 - k.h.win(t, .8, 3.2));
        w.outer.material.color.set('#9FD3FF'); w.outer.material.emissiveIntensity = 0; w.middle.material.color.set('#CFEAFF');
      },
    },
    {
      say: 'Quick question. Which pane is built to carry the pressure? A, the inner pane. B, the middle pane. Or C, the outer pane. Comment your answer.',
      quiz: { q: 'Which window pane is built to carry the cabin pressure?', options: ['The inner pane', 'The middle pane', 'The outer pane'], answer: 'C — the outer pane. The breather hole in the middle pane makes sure the outer pane bears the pressure.' },
      show: ['wall', 'clouds'], sky: '#274B73', lightAt: [0, 0, 0], lightDist: 40,
      cam: { pos: [12, 30, 40], look: [0, -16, -4], fov: 46, to: { pos: [-12, 30, 40], look: [0, -16, -4] } },
      update: (w) => { panes(w, 0); w.fog.visible = false; w.push.visible = false; },
    },
  ],
};
