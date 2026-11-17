// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his shopping trip are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary next to a towering shopping trolley.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#E8E4DA', 0);
  w.shop = group();
  for (let i = 0; i < 3; i++) { const z = -10 - i * 0; const x = -16 + i * 16; box(10, 14, 3, mat('#C9CED6'), [x, 7, -12], w.shop); for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) box(1.6, 2.2, 1.2, mat(['#E2453C', '#FFD21F', '#22C55E', '#2F6FD6', '#FF8A1F'][(r + c + i) % 5]), [x - 3.6 + c * 1.8, 2 + r * 3.2, -10.6], w.shop); }
  // the trolley (towering over Gary)
  w.trolley = group([5, 0, -2], w.shop);
  const wire = mat('#AEB6C2', { metal: .8, rough: .3 });
  box(8, .2, 5, wire, [0, 4, 0], w.trolley);
  for (const z of [-2.5, 2.5]) box(8, 4, .1, mat('#AEB6C2', { metal: .8, opacity: .5 }), [0, 6, z], w.trolley);
  box(.1, 4, 5, mat('#AEB6C2', { metal: .8, opacity: .5 }), [-4, 6, 0], w.trolley); box(.1, 4, 5, mat('#AEB6C2', { metal: .8, opacity: .5 }), [4, 6, 0], w.trolley);
  for (const [x, z] of [[-3.5, -2], [3.5, -2], [-3.5, 2], [3.5, 2]]) { cyl(.08, .08, 3.6, wire, [x, 2, z], w.trolley, 6); const wh = cyl(.6, .6, .4, mat('#2A2A2A'), [x, .6, z], w.trolley, 14); wh.rotation.x = Math.PI / 2; }
  const handle = cyl(.2, .2, 5.4, mat('#E2453C'), [5, 8.4, 0], w.trolley, 10); handle.rotation.x = Math.PI / 2;
  w.g = gary(k, k.scene, 2);
  w.list = group([0, 0, 0]);
  box(2.4, .03, 3.2, mat('#FFFFFF'), [0, 0, 0], w.list);
  box(1.4, .04, .2, mat('#2F6FD6'), [-.2, .02, -1], w.list);
  w.sugar = ball(.3, mat('#FFFFFF', { glow: .3 }), [.4, .2, .3], w.list); w.sugar.scale.set(1, .8, 1);
  w.sweat = group();
  for (let i = 0; i < 3; i++) { const d = ball(.12, mat('#5BC0EB', { glow: .8 }), [0, 0, 0], w.sweat); d.userData.i = i; d.castShadow = false; }
  // checkout belt and scanner
  w.till = group([0, 0, 60]);
  w.belt = box(16, .3, 4, mat('#2A2A2A'), [0, 3.15, 0], w.till); box(16, 3, 4.2, mat('#5A6070'), [0, 1.5, 0], w.till);
  w.stripes = group([0, 3.32, 0], w.till);
  for (let i = 0; i < 10; i++) box(.15, .02, 3.8, mat('#4A4A4A'), [-7 + i * 1.6, 0, 0], w.stripes).castShadow = false;
  box(3, 1.5, 4, mat('#1E2430'), [6, 4, 0], w.till);
  w.beam = box(.06, .02, 3.6, mat('#FF2020', { glow: 3 }), [6, 3.35, 0], w.till); w.beam.castShadow = false;
  w.screen = group([6, 7, -1.5], w.till);
  box(3.6, 2.2, .2, mat('#1E2430'), [0, 0, 0], w.screen);
  w.scr = box(3.2, 1.8, .05, mat('#E0161E', { glow: 1 }), [0, 0, .12], w.screen);
  w.qmark = group([0, 0, .16], w.screen); box(.3, .8, .02, mat('#FFFFFF', { glow: 1 }), [0, .25, 0], w.qmark); box(.3, .3, .02, mat('#FFFFFF', { glow: 1 }), [0, -.55, 0], w.qmark);
  return w;
}

const SHOP = ['ground', 'shop', 'g'];

export default {
  id: '088',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GOES SHOPPING',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'WENT SHOPPING.'],
  title: 'Gary the ant went shopping',
  description: 'His shopping list has one item on it. The trolley is a skyscraper. The checkout does not believe he exists. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'shopping', 'supermarket', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his trip to the shops are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant went shopping.',
      show: SHOP, sky: '#F4F1E8', lightAt: [2, 4, 0], lightDist: 18,
      cam: { pos: [-2, 3, 15], look: [2.5, 5.5, -2], fov: 50, to: { pos: [-2, 3, 13.5], look: [2.5, 5.5, -2], fov: 48 } },
      update: (w, p, t) => { w.g.position.set(-.5, 0, 1); w.g.rotation.y = .2; scurry(w.g, t, 10); },
    },
    {
      say: 'His shopping list: one grain of sugar.',
      show: [...SHOP, 'list'], sky: '#F4F1E8', lightAt: [0, 3, 1], lightDist: 10,
      cam: { pos: [1, 6.5, 8.5], look: [.6, .6, 1], fov: 44, to: { pos: [1, 6.2, 7.5], look: [.6, .6, 1], fov: 42 } },
      update: (w, p, t) => { w.list.position.set(1.4, .02, 1); w.list.rotation.y = .2; w.g.position.set(-.8, 0, 1); w.g.rotation.y = 0; scurry(w.g, t, 6); },
    },
    {
      say: 'The trolley does not move. At all.',
      show: [...SHOP, 'sweat'], sky: '#F4F1E8', lightAt: [8, 4, -2], lightDist: 16,
      cam: { pos: [13, 3, 7], look: [9, 3.5, -1], fov: 48, to: { pos: [12.5, 3, 6], look: [9, 3.5, -1], fov: 46 } },
      shake: () => .03,
      update: (w, p, t) => {
        w.g.position.set(11.4, 0, -.8); w.g.rotation.y = Math.PI; scurry(w.g, t, 45);
        w.sweat.children.forEach(d => { const f = (t * 1.5 + d.userData.i / 3) % 1; d.position.set(12.2 + f * .6, 1.5 + f * .6 - f * f * 1.6, -.8 + (d.userData.i - 1) * .3); });
      },
    },
    {
      say: 'At the checkout, Gary rides the belt.',
      show: ['ground', 'till', 'g'], sky: '#F4F1E8', lightAt: [0, 5, 60], lightDist: 16,
      cam: { pos: [2, 9, 72], look: [1, 3.5, 60], fov: 48, to: { pos: [2, 8.5, 70], look: [2, 3.5, 60], fov: 46 } },
      update: (w, p, t) => { w.stripes.position.x = (t * 2) % 1.6; w.g.position.set(-5 + t * 3, 3.32, 60); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 3); w.qmark.visible = false; w.scr.material.color.set('#22C55E'); w.scr.material.emissive.set('#22C55E'); },
    },
    {
      say: 'The scanner says: item not found.',
      show: ['ground', 'till', 'g'], sky: '#FFE3E3', lightAt: [6, 5, 60], lightDist: 12,
      cam: { pos: [6, 6.5, 71], look: [4.8, 5, 59.5], fov: 46, to: { pos: [5.8, 6.5, 69.5], look: [4.8, 5.2, 59.5], fov: 44 } },
      shake: (t) => (t % .5) < .1 ? .1 : 0,
      update: (w, p, t) => { w.g.position.set(3.6, 3.32, 60); w.g.rotation.set(0, 0, 0); scurry(w.g, t, 2); w.beam.position.x = 3.9 + .3 * Math.sin(t * 8); w.qmark.visible = true; w.scr.material.color.set('#E0161E'); w.scr.material.emissive.set('#E0161E'); w.scr.material.emissiveIntensity = (t % .5) < .25 ? 2 : .6; },
    },
    {
      say: 'Gary\'s next errand: bank, barber, or gym? Comment below.',
      quiz: { q: 'Where should Gary go next?', options: ['The bank', 'The barber', 'The gym'], answer: 'Gary is made up, so anywhere. He mostly wants to know if the gym has tiny weights.' },
      show: SHOP, sky: '#274B73', lightAt: [2, 4, 0], lightDist: 18,
      cam: { pos: [3, 2, 15], look: [2, 8, -2], fov: 48, to: { pos: [-4, 2, 15], look: [2, 8, -2] } },
      update: (w, p, t) => { w.g.position.set(-.5, 0, 1); w.g.rotation.set(0, .2, 0); scurry(w.g, t, 10); },
    },
  ],
};
