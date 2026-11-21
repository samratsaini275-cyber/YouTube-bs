// Narrative 10: "What Would Happen If… (season 2)". Combines the top video 081 (dinosaurs were pets, ~1.6K) with 074 (homework did itself, ~1.1K).
// A made-up comedy sketch: dinosaurs are extinct and do not go to school. Hook: the premise as a question under 2 s; first frame shows the T-rex at school.

function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.school = group([0, 0, -10]); box(30, 10, 6, mat('#E8B57A'), [0, 5, 0], w.school); box(30, 1, 6.4, mat('#B3262E'), [0, 10.5, 0], w.school);
  box(4, 6, .2, mat('#8B5A2B'), [0, 3, 3.05], w.school); for (let i = 0; i < 6; i++) box(2.4, 2, .2, mat('#9FD3EE'), [-12 + i * 4.8 + (i > 2 ? 2 : -2), 6.5, 3.05], w.school);
  w.r = rex(k, k.scene); w.dino = w.r.root;
  w.desk = group([0, 0, 0]); box(2.4, .2, 1.6, mat('#D9A55B'), [0, 1.6, 0], w.desk); for (const x of [-1, 1]) box(.15, 1.6, .15, mat('#8B5A2B'), [x, .8, 0], w.desk);
  w.kids = group(); for (let i = 0; i < 4; i++) { const g = group([-7 + i * 4.6, 0, 6], w.kids); cyl(.7, .75, 2.2, mat(['#2F6FD6', '#E2453C', '#22A06B', '#8B5CF6'][i]), [0, 1.1, 0], g, 12); ball(.65, mat('#F2C9A0'), [0, 2.8, 0], g); const arm = group([.7, 2, 0], g); box(.25, 1.4, .25, mat('#F2C9A0'), [0, .7, 0], arm); g.userData.arm = arm; }
  w.volcano = group([0, 0, 0]); cone(2.4, 3.6, mat('#8B5A2B'), [0, 1.8, 0], w.volcano, 16);
  w.lava = group(); for (let i = 0; i < 10; i++) { const l = ball(.3, mat('#FF5A1F', { glow: 1.5 }), [0, 0, 0], w.lava); l.userData.i = i; l.castShadow = false; }
  w.star = group(); ball(.8, mat('#FFD21F', { glow: 1.8 }), [0, 0, 0], w.star);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; const c = cone(.4, 1, mat('#FFD21F', { glow: 1.8 }), [Math.sin(a) * 1, Math.cos(a) * 1, 0], w.star, 4); c.rotation.z = -a; }
  return w;
}

const still = (w, x, z, ry) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); w.r.body.rotation.set(0, 0, 0); w.r.neck.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.z = 0); };

export default {
  id: '160',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DINOSAUR AT SCHOOL',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF DINOSAURS', 'WENT TO SCHOOL?'],
  title: 'What would happen if dinosaurs went to school?',
  description: 'Hands up? Not with those arms. Show and tell gets a volcano. And somehow, top marks again. (A made-up dinosaur student.)',
  tags: ['whatif', 'funny', 'dinosaur', 'trex', 'school', 'shorts'],
  sources: [
    'Comedy sketch: dinosaurs are extinct; this student is made up.',
    'Non-bird dinosaurs died out about 66 million years ago (Smithsonian National Museum of Natural History).',
  ],
  setup,
  scenes: [
    {
      say: 'What if dinosaurs went to school?',
      show: ['ground', 'school', 'dino', 'desk'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [3, 5, 34], look: [1.5, 12, 0], fov: 50, to: { pos: [3, 5, 31], look: [1.5, 12, 0], fov: 48 } },
      update: (w, p, t) => { still(w, -1, 0, -.7); stomp(w.r, t, 4, true); w.desk.position.set(3, 0, 5); w.r.neck.rotation.z = -.1 + .08 * Math.sin(t * 2); },
    },
    {
      say: 'Hands up? Not with those tiny arms.',
      show: ['ground', 'school', 'dino', 'kids'], sky: '#9ED2F3', lightAt: [3, 10, 6], lightDist: 30,
      cam: { pos: [14, 9, 18], look: [2.5, 7.5, 0], fov: 48, to: { pos: [13, 9, 16.5], look: [2.5, 7.5, 0], fov: 46 } },
      update: (w, p, t) => {
        still(w, 0, 0, -.2); stomp(w.r, t, 4, true); w.r.arms.forEach((a, i) => { a.rotation.z = .5 * Math.sin(t * 14 + i * Math.PI) - .4; }); w.r.neck.rotation.z = .25;
        w.kids.children.forEach(g => { g.userData.arm.rotation.z = 0; });
      },
    },
    {
      say: 'Show and tell? It brought a volcano.',
      show: ['ground', 'school', 'dino', 'volcano', 'lava', 'kids'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [6, 7, 30], look: [3, 6, 2], fov: 50, to: { pos: [5.5, 7, 28], look: [3, 6, 2], fov: 48 } },
      shake: (t) => t > 1 ? .08 : 0,
      update: (w, p, t) => {
        still(w, -4, 0, .2); stomp(w.r, t, 4, true); w.volcano.position.set(6, 0, 3);
        w.lava.children.forEach(l => { const q = (t * 1.2 + l.userData.i / 10) % 1; l.visible = t > .8; l.position.set(6 + Math.cos(l.userData.i * 2.4) * q * 2.5, 3.8 + q * 4 - q * q * 3.5, 3 + Math.sin(l.userData.i * 2.4) * q * 2); });
        w.kids.children.forEach((g, i) => { g.position.y = t > 1 ? .3 * Math.abs(Math.sin(t * 8 + i)) : 0; });
      },
    },
    {
      say: 'And somehow, it still gets top marks.',
      show: ['ground', 'school', 'dino', 'star'], sky: '#9ED2F3', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [3, 5, 34], look: [1.5, 12, 0], fov: 50, to: { pos: [3, 5, 31], look: [1.5, 12, 0], fov: 48 } },
      update: (w, p, t) => {
        w.kids.children.forEach(g => g.position.y = 0);
        still(w, -1, 0, -.7); stomp(w.r, t, 6); w.dino.position.y = .4 * Math.abs(Math.sin(t * 6));
        w.star.position.set(2, 20 + .3 * Math.sin(t * 3), 0); w.star.rotation.z = t; w.star.scale.setScalar(Math.min(1.4, t * 1.5));
      },
    },
    {
      say: 'A dinosaur classmate: cool, great, or a disaster? Comment below.',
      quiz: { q: 'Would you want a dinosaur in your class?', options: ['Cool', 'Great', 'A disaster'], answer: 'This student is made up. Dinosaurs died out about 66 million years ago.' },
      show: ['ground', 'school', 'dino'], sky: '#274B73', lightAt: [0, 10, 6], lightDist: 30,
      cam: { pos: [14, 3, 32], look: [0, 16, 0], fov: 46, to: { pos: [-14, 3, 32], look: [0, 16, 0] } },
      update: (w, p, t) => { still(w, -3, 0, -.4); stomp(w.r, t, 4, true); },
    },
  ],
};
