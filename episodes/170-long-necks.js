// Narrative 11: "What Would Happen If… (season 3, with Gary)". Body-change premise like "humans had tails" (1.1K).
// Hook: the premise as a question under 2 s; first frame shows a person whose neck stretches up past the trees.

function person(k, parent, shirt, neck = 8) {
  const { mat, cyl, ball, box, group } = k;
  const skin = mat('#F2C9A0');
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.neck = group([0, 2.5, 0], p.root);
  p.neckM = cyl(.28, .32, 1, skin, [0, neck / 2, 0], p.neck, 12); p.neckM.scale.y = neck;
  p.head = group([0, neck + .55, 0], p.neck); ball(.75, skin, [0, 0, 0], p.head);
  for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); }
  p.mouth = box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.trees = group(); for (let i = 0; i < 5; i++) { cyl(.4, .5, 3, mat('#6B4B2E'), [-10 + i * 5, 1.5, -6], w.trees, 8); ball(1.8, mat('#2E8B4A'), [-10 + i * 5, 4, -6], w.trees); }
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.house = group(); box(10, 12, .6, mat('#F2D9B8'), [0, 6, 0], w.house); box(10.4, .8, 1, mat('#B3262E'), [0, 12.4, 0], w.house);
  w.door = box(2, 4, .7, mat('#3A2A1A'), [0, 2, 0], w.house);
  w.stars = group(); for (let i = 0; i < 5; i++) { const s = ball(.18, mat('#FFD21F', { glow: 1 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  w.crowd = group(); const cols = ['#E2453C', '#22C55E', '#8B5CF6', '#F97316', '#3B82F6', '#EC4899'];
  for (let i = 0; i < 6; i++) { const c = person(k, w.crowd, cols[i], 7 + (i % 3)); c.root.position.set(-6 + (i % 3) * 3 + (i > 2 ? 1.5 : 0), 0, i > 2 ? 3 : 0); c.root.rotation.y = Math.PI; c.root.userData.c = c; c.root.userData.i = i; }
  w.stage = group(); box(16, 1.5, 6, mat('#333333'), [0, .75, 0], w.stage); for (let i = 0; i < 5; i++) ball(.4, mat(['#FF4D4D', '#FFD21F', '#4DA6FF', '#22C55E', '#EC4899'][i], { glow: 1 }), [-6 + i * 3, 12, 0], w.stage);
  w.band = person(k, w.stage, '#111111', .2); w.band.root.position.set(0, 1.5, 0);
  w.scarf = group(); for (let i = 0; i < 24; i++) { const r = k.torus(.42, .14, mat(i % 2 ? '#E2453C' : '#FFFFFF'), [0, 0, 0], w.scarf); r.userData.i = i; r.castShadow = false; }
  w.ow = group(); for (let i = 0; i < 6; i++) { const r = k.torus(.45, .05, mat('#FF5050', { glow: .8 }), [0, 0, 0], w.ow); r.userData.i = i; r.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry, t, sway = .08) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.neck.rotation.set(sway * Math.sin(t * 1.5), 0, sway * Math.sin(t * 1.1)); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.y = 1; };
const headPos = (w) => { const v = new w.pp.position.constructor(); w.p.head.getWorldPosition(v); return v; };

export default {
  id: '170',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LONG NECKS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD LONG NECKS?'],
  title: 'What would happen if humans had long necks?',
  description: 'Every doorway is a bonk. Concerts have perfect views. Scarves are fifty metres long. And a sore throat is a lot of throat. (A comedy what-if.)',
  tags: ['whatif', 'funny', 'giraffe', 'humans', 'longneck', 'shorts'],
  sources: [
    'Quiz fact: giraffes have seven neck vertebrae, the same number as humans (Smithsonian National Zoo, giraffe facts; cited from memory).',
  ],
  setup,
  scenes: [
    {
      say: 'What if humans had long necks?',
      show: ['ground', 'trees', 'pp'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [3, 9, 13], look: [0, 12.2, 0], fov: 50, to: { pos: [3, 9.5, 12], look: [0, 12.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, -.2, t); },
    },
    {
      say: 'Doorways? Bonk. Every single time.',
      show: ['ground', 'house', 'pp', 'stars'], sky: '#9ED2F3', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [9, 8, 13], look: [0, 10.5, 1.5], fov: 52, to: { pos: [8.5, 8, 12.5], look: [0, 10.5, 1.5], fov: 50 } },
      shake: (t) => (t > .9 && t < 1.3) ? .15 : 0,
      update: (w, p, t) => {
        const hit = t > .9, z = hit ? 1.7 + .3 * Math.max(0, 1.3 - t) : 6 - t * 4.8;
        stand(w, 0, z, Math.PI, t, .03); w.p.neck.rotation.x = hit ? -.35 : 0; w.p.mouth.scale.y = hit ? 2.4 : 1;
        w.stars.visible = hit; const h = headPos(w); w.stars.children.forEach(s => { const a = t * 6 + s.userData.i * 1.26; s.position.set(h.x + Math.cos(a) * 1.1, h.y + .9, h.z + Math.sin(a) * 1.1); });
      },
    },
    {
      say: 'Concerts? Everyone gets a perfect view.',
      show: ['ground', 'crowd', 'stage'], sky: '#1E2A44', lightAt: [0, 6, 0], lightDist: 22,
      cam: { pos: [-4, 7, 16], look: [0, 8.6, -4], fov: 52, to: { pos: [-3, 7, 15], look: [0, 8.6, -4], fov: 50 } },
      update: (w, p, t) => {
        w.stage.position.set(0, 0, -12);
        w.crowd.children.forEach(r => { const c = r.userData.c, i = r.userData.i; c.neck.rotation.set(.08 * Math.sin(t * 6 + i), 0, .12 * Math.sin(t * 4 + i)); });
        w.band.root.position.y = 1.5 + .3 * Math.abs(Math.sin(t * 8));
      },
    },
    {
      say: 'Scarves? Now they are fifty metres long.',
      show: ['ground', 'trees', 'pp', 'scarf'], sky: '#C9DCEB', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [4, 7, 12], look: [0, 8.4, 0], fov: 52, to: { pos: [3.5, 7, 11], look: [0, 8.4, 0], fov: 50 } },
      update: (w, p, t) => {
        stand(w, 0, 0, -.3, t, .02);
        const n = Math.min(24, Math.floor(t * 12)); w.scarf.children.forEach(r => { const i = r.userData.i; r.visible = i < n; r.position.set(.06 * Math.sin(i), 2.8 + i * .33, 0); r.rotation.set(Math.PI / 2 + .15 * Math.sin(i * 2), 0, .1 * Math.cos(i)); });
      },
    },
    {
      say: 'But a sore throat? That is a lot of throat.',
      show: ['ground', 'trees', 'pp', 'ow'], sky: '#C9DCEB', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [3, 6, 12], look: [0, 7.6, 0], fov: 54, to: { pos: [3, 6, 11], look: [0, 7.6, 0], fov: 52 } },
      update: (w, p, t) => {
        stand(w, 0, 0, -.3, t, .05); w.p.mouth.scale.y = 1.8; w.p.head.rotation.z = .15 * Math.sin(t * 2);
        w.ow.children.forEach(r => { const i = r.userData.i, q = (t * .8 + i / 6) % 1; r.position.set(0, 3 + q * 7.5, 0); r.scale.setScalar(.8 + .6 * Math.sin(q * Math.PI)); r.rotation.set(Math.PI / 2, 0, 0); });
      },
    },
    {
      say: 'Long necks: cool, weird, or a total nightmare? Comment below.',
      quiz: { q: 'Would you want a long neck?', options: ['Cool', 'Weird', 'Total nightmare'], answer: 'Fun fact: a giraffe has seven neck bones. So do you.' },
      show: ['ground', 'trees', 'pp'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 20,
      cam: { pos: [6, 8, 10], look: [0, 10, 0], fov: 48, to: { pos: [-6, 8, 10], look: [0, 10, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, t); },
    },
  ],
};
