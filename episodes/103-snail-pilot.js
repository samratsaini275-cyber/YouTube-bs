// Narrative 7: "Animals at Work". A made-up comedy sketch: snails do not fly planes.
// Hook rule: first line names the animal and the job, under 2 s; first frame shows the snail in a pilot cap on a little plane.

function snail(k, parent, cap = true) {
  const { mat, box, cyl, ball, cone, group } = k;
  const s = { root: group([0, 0, 0], parent) };
  const foot = ball(1.4, mat('#9ACD6A', { rough: .6 }), [0, .7, 0], s.root); foot.scale.set(2.4, .55, 1);
  s.shell = group([-.6, 2.2, 0], s.root);
  k.torus(1.05, .75, mat('#C0703A', { rough: .5 }), [0, 0, 0], s.shell).rotation.x = 0;
  ball(.7, mat('#E09A5A'), [0, 0, 0], s.shell);
  k.torus(.45, .3, mat('#8B4A22'), [0, 0, .5], s.shell).rotation.x = 0;
  s.head = group([2.6, 1.4, 0], s.root);
  ball(.75, mat('#9ACD6A', { rough: .6 }), [0, 0, 0], s.head);
  s.stalks = [-.3, .3].map(z => { const g = group([.1, .5, z], s.head); cyl(.09, .09, 1.4, mat('#9ACD6A'), [0, .7, 0], g, 8); ball(.22, mat('#FFFFFF'), [0, 1.45, 0], g); ball(.11, mat('#111111'), [.15, 1.5, 0], g); return g; });
  if (cap) { cyl(.6, .6, .35, mat('#1E3A8A'), [0, .7, 0], s.head, 18); box(.6, .06, .9, mat('#111111'), [.45, .55, 0], s.head); ball(.12, mat('#FFD21F', { glow: .5 }), [.55, .75, 0], s.head); }
  return s;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.runway = group();
  box(400, .1, 10, mat('#4A4F5A'), [0, .05, 0], w.runway).castShadow = false;
  for (let i = 0; i < 40; i++) box(4, .02, .4, mat('#FFFFFF'), [-80 + i * 8, .12, 0], w.runway).castShadow = false;
  const tower = group([-14, 0, -14], w.runway); cyl(1.4, 1.8, 14, mat('#E8E8E8'), [0, 7, 0], tower, 12); cyl(3, 3, 3, mat('#5BC0EB', { opacity: .7 }), [0, 15.5, 0], tower, 12);
  // the little plane
  w.plane = group([0, 0, 0]);
  const fus = cyl(1.3, .9, 11, mat('#FFD21F', { rough: .3 }), [0, 2.4, 0], w.plane, 20); fus.rotation.z = Math.PI / 2;
  ball(1.3, mat('#FFD21F'), [5.5, 2.4, 0], w.plane);
  box(3, .25, 16, mat('#E2453C'), [.8, 2.2, 0], w.plane);
  box(1.6, .2, 5, mat('#E2453C'), [-5, 2.7, 0], w.plane); box(1.6, 2.6, .2, mat('#E2453C'), [-5, 3.9, 0], w.plane);
  w.prop = group([6.9, 2.4, 0], w.plane); box(.15, 4, .5, mat('#333333'), [0, 0, 0], w.prop);
  for (const z of [-2.2, 2.2]) { cyl(.18, .18, 2, mat('#333333'), [1.5, 1, z], w.plane, 8); const wh = cyl(.7, .7, .4, mat('#1E2430'), [1.5, .7, z], w.plane, 16); wh.rotation.x = Math.PI / 2; }
  w.s = snail(k, w.plane); w.s.root.scale.setScalar(.42); w.s.root.position.set(1.2, 3.55, 0);
  w.auto = snail(k, w.plane, false); w.auto.root.scale.setScalar(.3); w.auto.root.position.set(-2, 3.5, 0);
  w.slime = box(1, .03, 1.2, mat('#C8F0A0', { opacity: .7, rough: .05 }), [0, .12, 0]); w.slime.castShadow = false;
  w.clouds = group();
  for (let i = 0; i < 10; i++) { const c = ball(3 + (i % 3), mat('#FFFFFF'), [-40 + i * 9, 20 + (i % 3) * 4, -20 - (i % 2) * 8], w.clouds); c.scale.y = .5; c.castShadow = false; }
  w.rain = group();
  for (let i = 0; i < 40; i++) { const r = box(.06, 1.2, .06, mat('#BFE8FF', { glow: .6 }), [0, 0, 0], w.rain); r.userData = { x: ((i * 37) % 30) - 15, z: ((i * 17) % 12) - 6, ph: (i * .13) % 1 }; r.castShadow = false; }
  w.zs = group();
  for (let i = 0; i < 3; i++) { const z = group([0, 0, 0], w.zs); box(.5, .08, .05, mat('#FFFFFF', { glow: .8 }), [0, .25, 0], z); box(.5, .08, .05, mat('#FFFFFF', { glow: .8 }), [0, -.25, 0], z); const d = box(.65, .08, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], z); d.rotation.z = Math.PI / 4; z.userData.i = i; }
  return w;
}

function hideHead(s, f) { const v = Math.max(.001, 1 - f); s.head.scale.setScalar(v); }

export default {
  id: '103',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE SNAIL PILOT',
  year: 'ANIMALS AT WORK',
  hook: ['THIS SNAIL', 'BECAME A PILOT.'],
  title: 'This snail became a pilot',
  description: 'Takeoff takes three weeks. Rain is a problem. The co-pilot is also a snail. (A made-up snail and a made-up airline.)',
  tags: ['animalsatwork', 'funny', 'snail', 'pilot', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the snail pilot and his airline are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This snail became a pilot.',
      show: ['ground', 'runway', 'plane'], sky: '#9ED2F3', lightAt: [1, 5, 0], lightDist: 16,
      cam: { pos: [4, 4, 13], look: [1.2, 6.6, 0], fov: 46, to: { pos: [3.7, 4, 12], look: [1.2, 6.5, 0], fov: 44 } },
      update: (w, p, t) => { w.plane.position.set(0, 0, 0); w.plane.rotation.set(0, 0, 0); w.prop.rotation.x = 0; w.auto.root.visible = false; hideHead(w.s, 0); w.s.stalks.forEach((g, i) => { g.rotation.z = .15 * Math.sin(t * 3 + i); }); },
    },
    {
      say: 'Takeoff takes three weeks.',
      show: ['ground', 'runway', 'plane', 'slime'], sky: '#9ED2F3', lightAt: [2, 5, 0], lightDist: 20,
      cam: { pos: [8, 4, 18], look: [1, 3, 0], fov: 50, to: { pos: [8.5, 4, 17], look: [1.5, 3, 0], fov: 48 } },
      update: (w, p, t) => {
        const x = t * .25; w.plane.position.set(x, 0, 0); w.plane.rotation.set(0, 0, 0); w.prop.rotation.x = t * .8; w.auto.root.visible = false; hideHead(w.s, 0);
        w.slime.scale.x = 4 + x * 2; w.slime.position.set(-1 + x * .5, .12, 2.2);
        w.s.stalks.forEach((g, i) => { g.rotation.z = -.4; });
      },
    },
    {
      say: 'When it rains, he hides in his shell. Mid-flight.',
      show: ['plane', 'clouds', 'rain'], sky: '#6E7F95', lightAt: [0, 25, 0], lightDist: 30,
      cam: { pos: [6, 26, 18], look: [0, 24, 0], fov: 50, to: { pos: [5.5, 26, 16.5], look: [0, 24, 0], fov: 48 } },
      shake: (t) => t > 1 ? .08 : 0,
      update: (w, p, t) => {
        w.plane.position.set(0, 21 - Math.max(0, t - 1) * 1.2, 0); w.plane.rotation.set(.15 * Math.sin(t * 5), 0, t > 1 ? -.15 - .1 * Math.sin(t * 7) : 0); w.prop.rotation.x = t * 25; w.auto.root.visible = false;
        hideHead(w.s, Math.min(1, Math.max(0, (t - .7) * 3)));
        w.rain.children.forEach(r => { const u = r.userData, f = (t * 1.6 + u.ph) % 1; r.position.set(u.x, 34 - f * 20, u.z); });
      },
    },
    {
      say: 'The autopilot? Also a snail. Both asleep.',
      show: ['plane', 'clouds', 'zs'], sky: '#9ED2F3', lightAt: [0, 25, 0], lightDist: 20,
      cam: { pos: [.3, 25.6, 13], look: [.3, 26.2, 0], fov: 46, to: { pos: [.3, 25.6, 12], look: [.3, 26.1, 0], fov: 44 } },
      update: (w, p, t) => {
        w.plane.position.set(0, 21 + .2 * Math.sin(t * 1.5), 0); w.plane.rotation.set(0, 0, .05 * Math.sin(t)); w.prop.rotation.x = t * 25; w.auto.root.visible = true; hideHead(w.s, 0);
        w.s.stalks.forEach(g => { g.rotation.z = -1; }); w.auto.stalks.forEach(g => { g.rotation.z = -1; });
        w.zs.children.forEach(z => { const f = (t * .5 + z.userData.i / 3) % 1; z.position.set(1.8 + f * 1.4, 25.4 + f * 2.2, 0); z.scale.setScalar(.5 + f * .6); });
      },
    },
    {
      say: 'Would you fly Snail Air: yes, no, or only overnight? Comment below.',
      quiz: { q: 'Would you fly Snail Air?', options: ['Yes', 'No', 'Only overnight'], answer: 'It is a made-up airline. Bring a pillow either way.' },
      show: ['ground', 'runway', 'plane'], sky: '#274B73', lightAt: [1, 5, 0], lightDist: 16,
      cam: { pos: [5, 2.5, 13], look: [1.5, 6.5, 0], fov: 46, to: { pos: [-3, 2.5, 13], look: [1.5, 6.5, 0] } },
      update: (w, p, t) => { w.plane.position.set(0, 0, 0); w.plane.rotation.set(0, 0, 0); w.prop.rotation.x = t * 3; w.auto.root.visible = false; hideHead(w.s, 0); w.s.stalks.forEach((g, i) => { g.rotation.z = .15 * Math.sin(t * 3 + i); }); },
    },
  ],
};
