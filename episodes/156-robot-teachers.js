// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; school premise like 074 (homework did itself, ~1.1K views). Reuses Bolt the robot.
// A made-up comedy sketch: robot teachers are made up. Hook: the premise as a question under 2 s; first frame shows Bolt at the blackboard.

function bolt(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  const metal = mat('#8FA6BF', { rough: .35 }), dark = mat('#3A4250');
  for (const x of [-.35, .35]) box(.35, .8, .4, dark, [x, .4, 0], b.root);
  box(1.5, 1.4, 1, metal, [0, 1.5, 0], b.root);
  box(.6, .3, .05, mat('#FFD21F', { glow: 1 }), [0, 1.6, .52], b.root);
  b.head = group([0, 2.2, 0], b.root);
  box(1.2, .9, .9, metal, [0, .45, 0], b.head);
  b.eyes = [-.28, .28].map(x => { const e = cyl(.2, .2, .08, mat('#5CF2FF', { glow: 2 }), [x, .5, .46], b.head, 16); e.rotation.x = Math.PI / 2; return e; });
  b.sockets = [-.28, .28].map(x => { const s = cyl(.17, .17, .05, dark, [x, .5, .44], b.head, 16); s.rotation.x = Math.PI / 2; return s; });
  b.mouth = box(.4, .06, .05, dark, [0, .2, .46], b.head);
  cyl(.04, .04, .4, dark, [0, 1.1, 0], b.head, 6); b.tip = ball(.1, mat('#E2453C', { glow: 1.5 }), [0, 1.35, 0], b.head);
  b.armL = group([-.85, 2.0, 0], b.root); box(.25, .9, .25, metal, [0, -.45, 0], b.armL);
  b.armR = group([.85, 2.0, 0], b.root); box(.25, .9, .25, metal, [0, -.45, 0], b.armR);
  return b;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#B9A27E', 0);
  w.room = group(); box(40, 20, .5, mat('#D8EAD2'), [0, 10, -3], w.room);
  box(6, 3, .1, mat('#2E4A3A'), [0, 3.6, -2.7], w.room); box(6.3, .2, .3, mat('#8B5A2B'), [0, 2.05, -2.6], w.room);
  w.b = bolt(k, k.scene); w.bo = w.b.root;
  w.desks = group(); for (let i = 0; i < 3; i++) { const d = group([-2.6 + i * 2.6, 0, 3], w.desks); box(1.8, .12, 1.1, mat('#D9A55B'), [0, 1.3, 0], d); for (const x of [-.75, .75]) box(.08, 1.3, .08, mat('#8B5A2B'), [x, .65, 0], d); cyl(.5, .55, 1.4, mat(['#2F6FD6', '#E2453C', '#22A06B'][i]), [0, .7, .9], d, 12); ball(.5, mat('#F2C9A0'), [0, 1.95, .9], d); }
  w.scan = cone(1.2, 4, mat('#E2453C', { glow: 1, }), [0, 0, 0], k.scene, 16); w.scan.material.transparent = true; w.scan.material.opacity = .35; w.scan.castShadow = false;
  w.clock = group([2.6, 4.4, -2.6]); const cf = cyl(.6, .6, .1, mat('#FFFFFF'), [0, 0, 0], w.clock, 20); cf.rotation.x = Math.PI / 2; w.hand = box(.06, .5, .05, mat('#111111'), [0, .22, .08], w.clock);
  w.handPivot = group([0, 0, .08], w.clock); w.handPivot.add(w.hand); w.hand.position.set(0, .22, 0);
  w.papers = group(); for (let i = 0; i < 8; i++) { const pg = group([0, 0, 0], w.papers); box(.6, .02, .8, mat('#FFFFFF'), [0, 0, 0], pg); const tick = box(.3, .03, .06, mat('#22C55E', { glow: .8 }), [0, .02, 0], pg); tick.rotation.y = .7; pg.userData.i = i; }
  w.door = group([3.6, 0, -2.4]); box(1.6, 3.4, .2, mat('#8B5A2B'), [0, 1.7, 0], w.door); ball(.1, mat('#FFD21F'), [-.6, 1.7, .15], w.door);
  w.stars = group(); for (let i = 0; i < 3; i++) { const s = ball(.12, mat('#FFD21F', { glow: 1.8 }), [0, 0, 0], w.stars); s.userData.i = i; s.castShadow = false; }
  return w;
}

const reset = (w) => { w.bo.position.set(0, 0, 0); w.bo.rotation.set(0, 0, 0); w.b.armR.rotation.set(0, 0, 0); w.b.armL.rotation.set(0, 0, 0); w.b.head.rotation.set(0, 0, 0); w.b.eyes.forEach(e => { e.material.color.set('#5CF2FF'); e.material.emissive && e.material.emissive.set('#5CF2FF'); }); };

export default {
  id: '156',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE ROBOT TEACHER',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF ROBOTS', 'TAUGHT SCHOOL?'],
  title: 'What would happen if robots taught school?',
  description: 'Late homework? It already knows. Lunch lasts forty seconds. Tests are marked before you finish. And the door is still a problem. (A made-up robot teacher.)',
  tags: ['whatif', 'funny', 'robot', 'school', 'teacher', 'shorts'],
  sources: [
    'Comedy sketch: robot teachers are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if robots taught school?',
      show: ['ground', 'room', 'bo'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 2.6, 8.5], look: [0, 3.3, 0], fov: 46, to: { pos: [0, 2.6, 7.7], look: [0, 3.25, 0], fov: 44 } },
      update: (w, p, t) => { reset(w); w.b.armR.rotation.z = .4 + .3 * Math.sin(t * 4); w.b.armR.rotation.x = -1.2; w.b.head.rotation.y = .2 * Math.sin(t * 2); w.b.tip.scale.setScalar(1 + .3 * Math.sin(t * 10)); },
    },
    {
      say: 'Late homework? It already knows.',
      show: ['ground', 'room', 'bo', 'desks', 'scan'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [3, 4.6, 11], look: [0, 2.2, 1.2], fov: 50, to: { pos: [2.8, 4.5, 10.2], look: [0, 2.2, 1.2], fov: 48 } },
      update: (w, p, t) => {
        reset(w); w.b.eyes.forEach(e => { e.material.color.set('#FF3B3B'); e.material.emissive && e.material.emissive.set('#FF3B3B'); });
        w.b.head.rotation.y = .6 * Math.sin(t * 1.5);
        w.scan.position.set(Math.sin(t * 1.5) * 1.6, 1.6, 1.6); w.scan.rotation.set(Math.PI / 2 + .35, 0, -Math.sin(t * 1.5) * .4);
      },
    },
    {
      say: 'Lunch break? Exactly forty seconds.',
      show: ['ground', 'room', 'bo', 'clock'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [.8, 3.2, 9.5], look: [.9, 3.0, 0], fov: 46, to: { pos: [.8, 3.2, 8.8], look: [1.1, 3.1, 0], fov: 44 } },
      update: (w, p, t) => { reset(w); w.handPivot.rotation.z = -t * 6; w.b.armL.rotation.x = -1.5; w.b.armL.rotation.z = -.3; w.b.head.rotation.y = .5; },
    },
    {
      say: 'Tests? Marked before you even finish.',
      show: ['ground', 'room', 'bo', 'desks', 'papers'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 14,
      cam: { pos: [0, 4.4, 11], look: [0, 2.6, 1], fov: 50, to: { pos: [0, 4.3, 10.2], look: [0, 2.6, 1], fov: 48 } },
      update: (w, p, t) => {
        reset(w); w.b.armR.rotation.x = -1.4 + .4 * Math.sin(t * 14); w.b.armL.rotation.x = -1.4 + .4 * Math.sin(t * 14 + 1);
        w.papers.children.forEach(pg => { const i = pg.userData.i; const q = ((t * .9) + i / 8) % 1; pg.position.set((i % 3 - 1) * 2.6 * (1 - q), 1.4 + Math.sin(q * Math.PI) * 2.5, 3 - q * 2.6); pg.rotation.set(q * 6, q * 3, 0); });
      },
    },
    {
      say: 'But it still cannot open the classroom door.',
      show: ['ground', 'room', 'bo', 'door', 'stars'], sky: '#D8EAD2', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [-.6, 3, 9], look: [2.2, 2.6, -1], fov: 46, to: { pos: [-.4, 3, 8.2], look: [2.2, 2.6, -1], fov: 44 } },
      shake: (t) => (t % 1.1) > .7 && (t % 1.1) < .85 ? .08 : 0,
      update: (w, p, t) => {
        reset(w); const c = t % 1.1; const x = 2.6 + Math.min(.4, c * .8) - (c > .8 ? (c - .8) * 2 : 0);
        w.bo.position.set(x, 0, -1.6); w.bo.rotation.y = Math.PI / 2; w.b.head.rotation.z = c > .8 ? .2 : 0;
        w.stars.children.forEach(s => { const a = t * 5 + s.userData.i * 2.1; s.position.set(x + Math.cos(a) * .5, 3.6, -1.6 + Math.sin(a) * .5); });
      },
    },
    {
      say: 'Robot teachers: cool, strict, or a nightmare? Comment below.',
      quiz: { q: 'Would you want a robot teacher?', options: ['Cool', 'Too strict', 'A nightmare'], answer: 'Robot teachers are made up. Your homework is still due.' },
      show: ['ground', 'room', 'bo'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [0, 1.2, 7.5], look: [0, 4.2, 0], fov: 46, to: { pos: [-1.2, 1.2, 7.5], look: [0, 4.2, 0] } },
      update: (w, p, t) => { reset(w); w.b.head.rotation.z = .08 * Math.sin(t * 2); },
    },
  ],
};
