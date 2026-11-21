// Narrative 10: "What Would Happen If… (season 2)". Same format as 063–082; premise mirrors 069 (snails were super fast, ~1K views).
// A made-up comedy sketch: sloths are slow. Hook: the premise as a question under 2 s; first frame shows a sloth zooming along a branch.

function sloth(k, parent) {
  const { mat, box, cyl, ball, group } = k;
  const fur = mat('#9C7B5B', { rough: .9 }), face = mat('#E8D2B0');
  const s = { root: group([0, 0, 0], parent) };
  const b = ball(.8, fur, [0, 0, 0], s.root); b.scale.set(1.1, 1, .9);
  s.head = group([0, .9, .3], s.root); ball(.55, fur, [0, 0, 0], s.head); const f = ball(.42, face, [0, -.02, .25], s.head); f.scale.set(1.1, .85, .6);
  for (const x of [-.18, .18]) { const p = ball(.13, mat('#3A2A1A'), [x, .05, .48], s.head); p.scale.set(1.4, .8, .5); ball(.06, mat('#FFFFFF'), [x, .07, .56], s.head); ball(.03, mat('#111111'), [x, .07, .6], s.head); }
  s.mouth = box(.15, .03, .03, mat('#3A2A1A'), [0, -.18, .58], s.head);
  s.arms = [-1, 1].map(x => { const a = group([x * .55, .5, 0], s.root); cyl(.14, .14, 1.3, fur, [0, .65, 0], a, 8); return a; });
  return s;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#5E9E4E', 0);
  w.jungle = group(); for (let i = 0; i < 6; i++) { cyl(.5, .6, 9, mat('#6B4B2E'), [-10 + i * 4, 4.5, -6], w.jungle, 8); ball(2.6, mat('#2E8B4A'), [-10 + i * 4, 9.4, -6], w.jungle); }
  w.branch = group(); const br = cyl(.22, .22, 30, mat('#6B4B2E'), [0, 5.6, 0], w.branch, 10); br.rotation.z = Math.PI / 2;
  w.s = sloth(k, k.scene); w.sl = w.s.root;
  w.lines = group(); for (let i = 0; i < 6; i++) { const l = box(1.6, .05, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.track = group(); box(40, .03, 3, mat('#C9502E'), [0, .02, 0], w.track).castShadow = false; for (const z of [-1, 1]) box(40, .04, .08, mat('#FFFFFF'), [0, .03, z * .75], w.track).castShadow = false;
  w.runners = group(); for (let i = 0; i < 2; i++) { const g = group([0, 0, 0], w.runners); cyl(.6, .65, 2.2, mat(['#2F6FD6', '#22A06B'][i]), [0, 1.1, 0], g, 12); ball(.55, mat('#F2C9A0'), [0, 2.7, 0], g); g.userData.i = i; }
  w.flag = group([0, 0, 0]); cyl(.04, .04, 2.6, mat('#333333'), [0, 1.3, 0], w.flag, 6); box(.9, .6, .03, mat('#FFFFFF'), [.45, 2.3, 0], w.flag);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.22, .22, .05, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  w.wave = group(); for (let i = 0; i < 5; i++) { const b = ball(.3, mat('#FFFFFF', { glow: .4 }), [0, 0, 0], w.wave); b.scale.set(1.5, 1, .3); b.userData.i = i; b.castShadow = false; }
  return w;
}

const hang = (w, x, t, zoom = true) => { w.sl.position.set(x, 4.5, 0); w.sl.rotation.set(0, -.2, zoom ? -.25 : 0); w.s.arms.forEach((a, i) => { a.rotation.z = (i ? -1 : 1) * .15 + (zoom ? .5 * Math.sin(t * 30 + i * Math.PI) : 0); }); };
const streak = (w, x, y, on = true) => { w.lines.visible = on; w.lines.children.forEach(l => { const i = l.userData.i; l.position.set(x - 1.4 - (i % 3) * .5, y - .6 + i * .25, .3); }); };

export default {
  id: '161',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE FAST SLOTH',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF SLOTHS', 'WERE SUPER FAST?'],
  title: 'What would happen if sloths were super fast?',
  description: 'Hanging out lasts one second. Naps finish before you blink. Every race is over before "go". But saying hello still takes all day. (A made-up sloth.)',
  tags: ['whatif', 'funny', 'sloth', 'animals', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: super fast sloths are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if sloths were super fast?',
      show: ['ground', 'jungle', 'branch', 'sl', 'lines'], sky: '#BFE3C8', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [0, 4, 10], look: [0, 6.1, 0], fov: 46, to: { pos: [0, 4, 9.2], look: [0, 6.05, 0], fov: 44 } },
      update: (w, p, t) => { const x = ((t * 3) % 3) - 1.5; hang(w, x, t); streak(w, x, 4.6); },
    },
    {
      say: 'Hanging out? Over in one second.',
      show: ['ground', 'jungle', 'branch', 'sl', 'lines'], sky: '#BFE3C8', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [2, 4.4, 12], look: [0, 5, 0], fov: 50, to: { pos: [1.8, 4.4, 11], look: [0, 5, 0], fov: 48 } },
      update: (w, p, t) => { const x = 2.8 * Math.sin(t * 3); hang(w, x, t); streak(w, x, 4.6); w.lines.scale.x = Math.cos(t * 3) > 0 ? 1 : -1; },
    },
    {
      say: 'Naps? Done before you even blink.',
      show: ['ground', 'jungle', 'branch', 'sl', 'zz'], sky: '#BFE3C8', lightAt: [0, 8, 5], lightDist: 14,
      cam: { pos: [.4, 4.2, 8], look: [0, 5.2, 0], fov: 46, to: { pos: [.3, 4.2, 7.2], look: [0, 5.2, 0], fov: 44 } },
      update: (w, p, t) => {
        w.lines.scale.x = 1; hang(w, 0, t, false); const asleep = t < .9; w.s.head.rotation.x = asleep ? .3 : 0; w.s.mouth.scale.x = asleep ? .6 : 1.5;
        w.zz.visible = asleep; w.zz.children.forEach(z => { const q = (t * 2 + z.userData.i / 3) % 1; z.position.set(.6 + q * .6, 5.8 + q, .5); z.scale.setScalar(.6 + q); });
        w.sl.position.y = asleep ? 4.5 : 4.5 + .15 * Math.abs(Math.sin(t * 20));
      },
    },
    {
      say: 'Races? It wins before anyone says go.',
      show: ['ground', 'track', 'sl', 'runners', 'flag', 'lines'], sky: '#9ED2F3', lightAt: [0, 8, 5], lightDist: 16,
      cam: { pos: [0, 4.2, 16], look: [0, 1.8, 0], fov: 50, to: { pos: [0, 4.2, 15], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => {
        w.flag.position.set(3.4, 0, -1.2);
        w.runners.children.forEach(g => { g.position.set(-3.2, 0, g.userData.i ? .6 : -.6); g.rotation.set(0, Math.PI / 2, 0); });
        const x = t < .5 ? -2.4 : Math.min(3.0, -2.4 + (t - .5) * 30); w.sl.position.set(x, .8, 0); w.sl.rotation.set(0, Math.PI / 2 - .3, 0); w.s.arms.forEach(a => a.rotation.z = 0);
        streak(w, x, 1, t > .5 && x < 3.0);
      },
    },
    {
      say: 'But saying hello? Still takes all day.',
      show: ['ground', 'jungle', 'branch', 'sl', 'wave'], sky: '#BFE3C8', lightAt: [0, 8, 5], lightDist: 14,
      cam: { pos: [.3, 4.4, 7], look: [0, 5.3, 0], fov: 44, to: { pos: [.2, 4.4, 6.4], look: [0, 5.3, 0], fov: 42 } },
      update: (w, p, t) => {
        hang(w, 0, t, false); w.s.head.rotation.x = 0; w.s.mouth.scale.set(1, 1 + 2.5 * Math.abs(Math.sin(t * 1.2)), 1);
        w.s.arms[1].rotation.z = -.15 - .8 * Math.min(1, t / 2.5);
        w.wave.children.forEach(b => { const i = b.userData.i; b.visible = i < t * 1.6; b.position.set(.9 + i * .55, 6.6 + i * .12, .4); b.scale.set(1.5 - i * .2, 1 - i * .12, .3); });
      },
    },
    {
      say: 'A super fast sloth: cool, great, or a disaster? Comment below.',
      quiz: { q: 'A super fast sloth would be…', options: ['Cool', 'Great', 'A disaster'], answer: 'Super fast sloths are made up. Real ones take their time.' },
      show: ['ground', 'jungle', 'branch', 'sl'], sky: '#274B73', lightAt: [0, 8, 5], lightDist: 14,
      cam: { pos: [.3, 2.6, 7], look: [0, 6.4, 0], fov: 46, to: { pos: [-1, 2.6, 7], look: [0, 6.4, 0] } },
      update: (w, p, t) => { hang(w, 0, t, false); w.s.mouth.scale.set(1, 1, 1); },
    },
  ],
};
