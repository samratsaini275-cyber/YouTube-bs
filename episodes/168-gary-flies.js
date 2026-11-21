// Narrative 11: "What Would Happen If… (season 3, with Gary)". Combines the two best performers: Gary superhero (846) and "everyone could fly" (1.1K).
// Hook: the premise as a question under 2 s; first frame shows Gary with wings and a red cape flying over a picnic blanket.

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
  w.ground = k.ground('#7FB069', 0);
  w.blanket = group(); box(9, .05, 6, mat('#E2453C'), [0, .03, 0], w.blanket); for (let i = 0; i < 4; i++) box(9, .06, .5, mat('#FFFFFF'), [0, .04, -2.25 + i * 1.5], w.blanket);
  w.g = gary(k, k.scene, 2.4, '#FFC21F');
  const wingM = mat('#D8F0FF', { glow: .3 }); wingM.transparent = true; wingM.opacity = .75;
  w.wings = [-1, 1].map(s => { const p = group([0, .55, s * .1], w.g); const wg = ball(.4, wingM, [0, 0, s * .45], p); wg.scale.set(.75, .06, .4); wg.castShadow = false; return p; });
  w.cape = box(.6, .04, .5, mat('#D62828'), [-.55, .5, 0], w.g); w.cape.castShadow = false;
  w.sand = group(); box(1.6, .2, 1.6, mat('#E8C07A'), [0, 0, 0], w.sand); box(1.65, .12, 1.65, mat('#4CAF50'), [0, .15, 0], w.sand); box(1.6, .12, 1.6, mat('#E35D5D'), [0, .27, 0], w.sand); box(1.6, .2, 1.6, mat('#E8C07A'), [0, .43, 0], w.sand);
  w.hill = group(); cone(4, 3, mat('#B5793F', { rough: 1 }), [0, 1.5, 0], w.hill, 24); ball(.5, mat('#3A2A1A'), [0, 2.9, 0], w.hill);
  box(1.4, .05, 9, mat('#555555'), [0, .03, 7], w.hill); for (let i = 0; i < 8; i++) for (const x of [-.6, .6]) ball(.12, mat(i % 2 ? '#FFD21F' : '#FF5050', { glow: 1 }), [x, .12, 3 + i], w.hill);
  w.fans = group(); for (let i = 0; i < 4; i++) { const f = gary(k, w.fans, 1.4, ['#E2453C', '#3B82F6', '#22C55E', '#8B5CF6'][i]); f.position.set(-2.4 + i * 1.6, 0, 4.5); f.rotation.y = -Math.PI / 2; f.userData.i = i; }
  w.bird = group(); const bb = ball(1, mat('#4A6FA5'), [0, 0, 0], w.bird); bb.scale.set(1.5, 1, 1); ball(.7, mat('#4A6FA5'), [1.3, .6, 0], w.bird);
  cone(.25, .7, mat('#FFB020'), [2.1, .55, 0], w.bird, 8).rotation.z = -Math.PI / 2;
  for (const z of [-.3, .3]) { ball(.15, mat('#FFFFFF'), [1.75, .8, z], w.bird); ball(.08, mat('#111111'), [1.87, .82, z], w.bird); }
  w.bw = [-1, 1].map(s => { const p = group([0, .3, s * .6], w.bird); const b = box(1.2, .1, 1.6, mat('#36507A'), [0, 0, s * .8], p); return p; });
  w.leaves = group(); for (let i = 0; i < 14; i++) { const l = box(.4, .04, .25, mat(['#E8A33A', '#C8553D', '#7FB069'][i % 3]), [0, 0, 0], w.leaves); l.userData.i = i; l.castShadow = false; }
  w.trees = group(); for (let i = 0; i < 4; i++) { cyl(.4, .5, 3, mat('#6B4B2E'), [-9 + i * 6, 1.5, -9], w.trees, 8); ball(2, mat('#2E8B4A'), [-9 + i * 6, 4.2, -9], w.trees); }
  return w;
}

const fly = (w, x, y, z, ry, t, flap = 40) => {
  w.g.position.set(x, y, z); w.g.rotation.set(0, ry, .1 * Math.sin(t * 3));
  w.wings.forEach((p, i) => p.rotation.x = (i ? 1 : -1) * .6 * Math.sin(t * flap));
  w.cape.rotation.z = .2 + .15 * Math.sin(t * 12); scurry(w.g, t, 8);
};

export default {
  id: '168',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY CAN FLY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'COULD FLY?'],
  title: 'What would happen if Gary the ant could fly?',
  description: 'He airlifts sandwiches. The ant hill gets a runway. Birds get very interested. And the wind is in charge. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'flying', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up. (Some real ants do grow wings for a short mating flight.)',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary the ant could fly?',
      show: ['ground', 'blanket', 'g', 'trees'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [3.5, 2.6, 9], look: [0, 3.6, 0], fov: 46, to: { pos: [3.2, 2.6, 8.3], look: [0, 3.6, 0], fov: 44 } },
      update: (w, p, t) => { fly(w, -.4 + t * .3, 1.9 + .2 * Math.sin(t * 4), 0, -.5, t); },
    },
    {
      say: 'Picnics? He airlifts the whole sandwich.',
      show: ['ground', 'blanket', 'g', 'sand', 'trees'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [3.5, 2.5, 10], look: [0, 3.8, 0], fov: 48, to: { pos: [3.5, 2.5, 9.2], look: [0, 3.8, 0], fov: 46 } },
      update: (w, p, t) => { const y = Math.min(2, .5 + t * 1.2); fly(w, -1.5 + t * .6, y + 1.3, 0, -.3, t, 60); w.sand.position.set(w.g.position.x + .6, y, 0); w.sand.rotation.z = .08 * Math.sin(t * 5); },
    },
    {
      say: 'The ant hill? Now it has a runway.',
      show: ['ground', 'g', 'hill', 'fans', 'trees'], sky: '#9ED2F3', lightAt: [0, 2, 3], lightDist: 18,
      cam: { pos: [9, 4, 17], look: [0, 2.8, 4], fov: 48, to: { pos: [8.5, 4, 16], look: [0, 2.8, 4], fov: 46 } },
      update: (w, p, t) => {
        const q = Math.min(1, t / 2.2); fly(w, 0, Math.max(.05, 2.5 - q * 2.5), 10 - q * 5, Math.PI / 2, t);
        w.fans.children.forEach(f => { f.position.y = .25 * Math.abs(Math.sin(t * 8 + f.userData.i)); });
      },
    },
    {
      say: 'Birds? Suddenly very interested.',
      show: ['ground', 'g', 'bird', 'trees'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [2, 4, 14], look: [0, 4.2, 0], fov: 50, to: { pos: [2, 4, 13], look: [.5, 4.2, 0], fov: 48 } },
      shake: (t) => .04,
      update: (w, p, t) => {
        fly(w, -1 + t * 1.6, 3.2 + .4 * Math.sin(t * 6), 0, 0, t, 70);
        w.bird.position.set(-6 + t * 1.7, 4.2 + .3 * Math.sin(t * 4), 0); w.bird.rotation.set(0, 0, -.1);
        w.bw.forEach((p, i) => p.rotation.x = (i ? 1 : -1) * .7 * Math.sin(t * 9));
      },
    },
    {
      say: 'But the wind? The wind is the boss.',
      show: ['ground', 'g', 'leaves', 'trees'], sky: '#B9C9D6', lightAt: [0, 3, 0], lightDist: 18,
      cam: { pos: [1, 3.5, 12], look: [0, 3.8, 0], fov: 52, to: { pos: [1, 3.5, 11], look: [0, 3.8, 0], fov: 50 } },
      shake: (t) => .06,
      update: (w, p, t) => {
        fly(w, -4 + t * 3.2, 3.5 + .8 * Math.sin(t * 3), 0, 0, t, 80); w.g.rotation.z = t * 5;
        w.leaves.children.forEach(l => { const i = l.userData.i, q = (t * .6 + i / 14) % 1; l.position.set(-8 + q * 16, 1 + (i % 5) * 1.3 + .4 * Math.sin(t * 5 + i), -2 + (i % 3)); l.rotation.set(t * 4 + i, t * 3, i); });
      },
    },
    {
      say: 'Flying Gary: cool, dangerous, or a bit much? Comment below.',
      quiz: { q: 'Should Gary be allowed to fly?', options: ['Cool', 'Dangerous', 'A bit much'], answer: 'Gary is made up. Some real ants do grow wings, but only for one short flight.' },
      show: ['ground', 'blanket', 'g', 'trees'], sky: '#274B73', lightAt: [0, 2, 0], lightDist: 16,
      cam: { pos: [4, 2, 6], look: [0, 2.8, 0], fov: 44, to: { pos: [-4, 2, 6], look: [0, 2.8, 0] } },
      update: (w, p, t) => { fly(w, 0, 2 + .15 * Math.sin(t * 3), 0, -Math.PI / 2 + .9, t); },
    },
  ],
};
