// Narrative 11: "What Would Happen If… (season 3, with Gary)". Big-silly-world premise like "homework did itself" (1.1K).
// Hook: the premise as a question under 2 s; first frame shows colourful sweets pouring from the sky onto a delighted person.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = k.box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.houses = group(); for (let i = 0; i < 5; i++) { const x = -16 + i * 8; box(6, 5, 5, mat(['#F2D9B8', '#CFE3F2', '#F7C6D0', '#D9F2C9', '#FFE3A3'][i]), [x, 2.5, -10], w.houses); const r = cone(4.6, 2.6, mat('#B3262E'), [x, 6.3, -10], w.houses, 4); r.rotation.y = Math.PI / 4; }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  const cols = ['#FF4D6D', '#FFD21F', '#22C55E', '#3B82F6', '#A855F7', '#F97316'];
  w.candy = group(); for (let i = 0; i < 60; i++) { const c = i % 3 === 0 ? cyl(.15, .15, .5, mat(cols[i % 6], { glow: .2 }), [0, 0, 0], w.candy, 10) : ball(.22, mat(cols[i % 6], { glow: .2 }), [0, 0, 0], w.candy); c.userData.i = i; c.castShadow = false; }
  w.umb = group(); const u = k.mesh(new k.THREE.SphereGeometry(2.2, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat('#E2453C', { rough: .5 }), [0, 0, 0], w.umb); u.rotation.x = Math.PI; u.material.side = k.THREE.DoubleSide; cyl(.06, .06, 3, mat('#333333'), [0, 1.5, 0], w.umb, 8);
  w.pile = group(); for (let i = 0; i < 40; i++) { const b = ball(.22, mat(cols[i % 6], { glow: .2 }), [Math.cos(i * 2.4) * (i / 40) * 1.6, -.25 - (1 - i / 40) * 1.2 + .3, Math.sin(i * 2.4) * (i / 40) * 1.6], w.pile); b.castShadow = false; }
  w.puddle = cyl(2.6, 2.6, .06, mat('#5A2D14', { rough: .2 }), [0, .04, 0], k.scene, 32); w.puddle.scale.z = .6;
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.16, mat('#5A2D14'), [0, 0, 0], w.splash); s.userData.i = i; s.castShadow = false; }
  w.dent = group(); box(8, 6, 5, mat('#FFFFFF'), [0, 3, 0], w.dent); box(8.4, .5, 5.4, mat('#7FB3E0'), [0, 6.2, 0], w.dent);
  const tooth = group([0, 4.4, 2.6], w.dent); box(1.2, 1, .2, mat('#FFFFFF', { glow: .2 }), [0, .2, 0], tooth); box(.4, .9, .2, mat('#FFFFFF', { glow: .2 }), [-.4, -.5, 0], tooth); box(.4, .9, .2, mat('#FFFFFF', { glow: .2 }), [.4, -.5, 0], tooth); box(1.8, 1.8, .1, mat('#3B82F6'), [0, 0, -.1], tooth);
  box(1.6, 2.6, .1, mat('#8B5A2B'), [0, 1.3, 2.52], w.dent);
  w.queue = group(); for (let i = 0; i < 7; i++) { const q = person(k, w.queue, cols[i % 6]); q.root.position.set(1.4 + i * 1.9, 0, 3.6); q.root.rotation.y = -Math.PI / 2 + .3; q.root.userData.q = q; q.root.userData.i = i; }
  w.table = group(); box(8, .3, 5, mat('#C79A5B'), [0, 3, 0], w.table); cyl(1.6, 1.4, .15, mat('#FFFFFF'), [0, 3.25, 1], w.table, 28);
  w.broc = group(); for (let i = 0; i < 3; i++) { const g = group([-.6 + i * .6, 3.35, 1], w.broc); cyl(.12, .15, .5, mat('#7FBF5A'), [0, .25, 0], g, 8); ball(.32, mat('#2E8B3A'), [0, .6, 0], g); }
  return w;
}

const stand = (w, x, z, ry, mouth = 1) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.mouth.scale.y = mouth; w.p.head.rotation.set(0, 0, 0); };
const rain = (w, t, cx = 0, cz = 0, spread = 10, top = 12) => w.candy.children.forEach(c => { const i = c.userData.i, q = (t * .5 + (i * .618) % 1) % 1; c.position.set(cx + ((i * 3.7) % spread) - spread / 2, top - q * top, cz + ((i * 1.3) % 6) - 3); c.rotation.set(t * 3 + i, t * 2, 0); });

export default {
  id: '178',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'CANDY RAIN',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF IT', 'RAINED CANDY?'],
  title: 'What would happen if it rained candy?',
  description: 'Umbrellas become candy bowls. Puddles are chocolate. The dentist is the busiest person in town. And broccoli is still on your plate. (A comedy what-if.)',
  tags: ['whatif', 'candy', 'funny', 'weather', 'sweets', 'shorts'],
  sources: [
    'Comedy what-if; no factual claims.',
  ],
  setup,
  scenes: [
    {
      say: 'What if it rained candy?',
      show: ['ground', 'houses', 'pp', 'candy'], sky: '#F7C6E0', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [1.5, 3.4, 10], look: [0, 4.0, 0], fov: 50, to: { pos: [1.3, 3.4, 9.2], look: [0, 4.0, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, -.1, 2.6); w.p.head.rotation.x = -.35; rain(w, t, 0, 0, 9, 11); },
    },
    {
      say: 'Umbrellas? Now they are candy bowls.',
      show: ['ground', 'houses', 'pp', 'candy', 'umb', 'pile'], sky: '#F7C6E0', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [2, 4, 11], look: [0, 4.6, 0], fov: 50, to: { pos: [1.8, 4, 10.2], look: [0, 4.6, 0], fov: 48 } },
      update: (w, p, t) => {
        stand(w, -.4, 0, .2, 1.6); w.umb.position.set(2.6, 3.2, 0); w.umb.rotation.set(Math.PI, 0, .15); w.pile.position.set(2.25, 5.9, 0); w.pile.scale.setScalar(.6 + Math.min(.6, t * .25));
        rain(w, t, 0, 0, 10, 12);
      },
    },
    {
      say: 'Puddles? Pure chocolate.',
      show: ['ground', 'houses', 'pp', 'candy', 'puddle', 'splash'], sky: '#F7C6E0', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [3, 4, 10], look: [0, 3.2, 0], fov: 50, to: { pos: [2.7, 4, 9.2], look: [0, 3.2, 0], fov: 48 } },
      update: (w, p, t) => {
        w.puddle.position.set(0, .04, 1); const hop = Math.abs(Math.sin(t * 4)); stand(w, -1 + t * .5, 1, .4, 2.2); w.pp.position.y = hop * .8;
        w.splash.children.forEach(s => { const i = s.userData.i, a = i / 10 * Math.PI * 2, q = (t * 4 / Math.PI) % 1; s.position.set(w.pp.position.x + Math.cos(a) * q * 1.8, .1 + Math.sin(q * Math.PI) * 1, 1 + Math.sin(a) * q * 1.2); });
        rain(w, t, 0, 0, 10, 12);
      },
    },
    {
      say: 'The dentist? Busiest person in town.',
      show: ['ground', 'houses', 'dent', 'queue', 'candy'], sky: '#F7C6E0', lightAt: [4, 3, 0], lightDist: 18,
      cam: { pos: [13, 9, 17], look: [3, 4, -1], fov: 52, to: { pos: [12.5, 9, 16], look: [3, 4, -1], fov: 50 } },
      update: (w, p, t) => {
        w.dent.position.set(-2, 0, -2); w.queue.children.forEach(r => { const q = r.userData.q, i = r.userData.i; q.mouth.scale.y = 1 + .8 * Math.abs(Math.sin(t * 3 + i)); q.head.rotation.z = .12 * Math.sin(t * 4 + i); r.position.y = .1 * Math.abs(Math.sin(t * 6 + i)); });
        rain(w, t, 4, 0, 18, 12);
      },
    },
    {
      say: 'But broccoli? Still on your plate.',
      show: ['ground', 'houses', 'pp', 'table', 'broc'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [1.5, 5.6, 9.5], look: [0, 5.2, 0], fov: 46, to: { pos: [1.3, 5.6, 8.7], look: [0, 5.2, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, -2.6, 0, .6); w.pp.position.y = 1.8; w.p.head.rotation.z = .15 * Math.sin(t * 1.5); w.p.head.rotation.x = .25; },
    },
    {
      say: 'Candy rain: amazing, gross, or too sweet? Comment below.',
      quiz: { q: 'Would you want candy rain?', options: ['Amazing', 'Gross', 'Too sweet'], answer: 'It cannot rain candy. But it has rained frogs and fish after storms!' },
      show: ['ground', 'houses', 'pp', 'candy'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [5, 3.4, 8], look: [0, 4.4, 0], fov: 46, to: { pos: [-5, 3.4, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 2.2); w.pp.position.y = 0; w.p.head.rotation.set(-.3, 0, 0); rain(w, t, 0, 0, 9, 11); },
    },
  ],
};
