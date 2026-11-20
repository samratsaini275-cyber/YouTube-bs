// Narrative 8: "Objects With Opinions". A made-up comedy sketch: light bulbs do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the bulb with a face hanging from a ceiling.

function bulb(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const b = { root: group([0, 0, 0], parent) };
  cyl(.03, .03, 3, mat('#2A2A2A'), [0, 1.5, 0], b.root, 6);
  cyl(.35, .4, .6, mat('#9AA3AE', { metal: .8 }), [0, -.2, 0], b.root, 14);
  b.glass = ball(.9, mat('#FFF6C2', { glow: .2, opacity: .9 }), [0, -1.2, 0], b.root); b.glass.scale.set(1, 1.15, 1);
  for (const x of [-.3, .3]) { ball(.14, mat('#FFFFFF'), [x, -1.05, .84], b.root); ball(.07, mat('#111111'), [x, -1.05, .95], b.root); }
  b.mouth = box(.3, .06, .04, mat('#5A3A1E'), [0, -1.45, .88], b.root);
  return b;
}
function talk(b, t, on = true) { b.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function light(b, lvl) { b.glass.material.emissiveIntensity = lvl; }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#8B6B4A', 0);
  w.room = group();
  box(30, 16, .5, mat('#C9D6E8'), [0, 8, -6], w.room); box(30, .5, 14, mat('#E8E8E8'), [0, 12, 0], w.room);
  w.sw = group([4, 5, -5.7], w.room); box(.8, 1.2, .1, mat('#FFFFFF'), [0, 0, 0], w.sw); w.toggle = box(.2, .4, .2, mat('#9AA3AE'), [0, .15, .1], w.sw);
  w.b = bulb(k, k.scene); w.bb = w.b.root;
  w.kid = group([0, 0, 0]); cyl(.6, .7, 2.2, mat('#22C55E'), [0, 1.1, 0], w.kid, 12); ball(.65, mat('#F2C9A0'), [0, 2.75, 0], w.kid);
  w.karm = group([0, 2, 0], w.kid); cyl(.12, .12, 1.4, mat('#22C55E'), [0, .7, 0], w.karm, 6);
  w.moths = group();
  for (let i = 0; i < 5; i++) { const m = group([0, 0, 0], w.moths); ball(.12, mat('#8A7A60'), [0, 0, 0], m); for (const s of [-1, 1]) { const wg = box(.3, .02, .2, mat('#C9B79C'), [s * .15, 0, 0], m); wg.rotation.z = s * .3; } m.userData.i = i; }
  w.spark = group();
  for (let i = 0; i < 8; i++) { const s = box(.08, .5, .08, mat('#FFD21F', { glow: 2 }), [0, 0, 0], w.spark); const a = i / 8 * Math.PI * 2; s.position.set(Math.cos(a) * 1.8, Math.sin(a) * 1.8, 0); s.rotation.z = a - Math.PI / 2; s.castShadow = false; }
  w.dark = box(60, 40, .1, mat('#05050A', { opacity: .55 }), [0, 6, 6], k.scene); w.dark.material.depthTest = false; w.dark.renderOrder = 999; w.dark.castShadow = false;
  return w;
}

export default {
  id: '135',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LIGHT BULB WITH A COMPLAINT',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS LIGHT BULB', 'HAS A COMPLAINT.'],
  title: 'This light bulb has a complaint',
  description: 'Switched on and off a hundred times a day. Surrounded by moths. Then he finally has a bright idea. (A made-up talking light bulb.)',
  tags: ['objectswithopinions', 'funny', 'lightbulb', 'home', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: talking light bulbs are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'This light bulb has a complaint.',
      show: ['ground', 'room', 'bb'], sky: '#C9D6E8', lightAt: [0, 7, 2], lightDist: 12,
      cam: { pos: [1.5, 7.8, 9], look: [0, 11.4, 0], fov: 44, to: { pos: [1.4, 7.8, 8.2], look: [0, 11.3, 0], fov: 42 } },
      update: (w, p, t) => { w.bb.position.set(0, 10.5, 0); w.bb.rotation.z = .04 * Math.sin(t * 2); light(w.b, 1.2); talk(w.b, t, t > .2); },
    },
    {
      say: 'Kids flick him on and off all day.',
      show: ['ground', 'room', 'bb', 'kid', 'dark'], sky: '#C9D6E8', lightAt: [2, 6, 2], lightDist: 14,
      cam: { pos: [2.5, 5.5, 13], look: [1.6, 7.4, -2], fov: 54, to: { pos: [2.3, 5.5, 12], look: [1.6, 7.4, -2], fov: 52 } },
      update: (w, p, t) => {
        const on = Math.sin(t * 9) > 0; light(w.b, on ? 1.4 : 0); w.dark.visible = !on; w.toggle.position.y = on ? .15 : -.15; talk(w.b, t);
        w.bb.position.set(0, 10.5, 0); w.kid.position.set(4, 0, -4.4); w.kid.rotation.y = Math.PI; w.karm.rotation.x = -2.6;
      },
    },
    {
      say: 'And every night, the moths show up.',
      show: ['ground', 'room', 'bb', 'moths'], sky: '#1E2440', lightAt: [0, 7, 2], lightDist: 12,
      cam: { pos: [1.5, 7.5, 6], look: [0, 9, 0], fov: 44, to: { pos: [1.4, 7.5, 5.3], look: [0, 9, 0], fov: 42 } },
      update: (w, p, t) => {
        w.dark.visible = false; light(w.b, 1.6); talk(w.b, t); w.bb.position.set(0, 10.5, 0);
        w.moths.children.forEach((m, i) => { const a = t * 3 + i * 1.26; m.position.set(Math.cos(a) * 1.6, 9.3 + Math.sin(a * 2) * .6, Math.sin(a) * 1.2); m.rotation.y = -a; m.children.forEach((c, j) => { if (j) c.rotation.z = (j === 1 ? 1 : -1) * .5 * Math.sin(t * 30 + i); }); });
      },
    },
    {
      say: 'Then, finally, he has a bright idea.',
      show: ['ground', 'room', 'bb', 'spark'], sky: '#FFE3C2', lightAt: [0, 7, 2], lightDist: 12,
      cam: { pos: [1.5, 7, 7], look: [0, 9, 0], fov: 44, to: { pos: [1.4, 7, 6.2], look: [0, 9, 0], fov: 42 } },
      update: (w, p, t) => { w.dark.visible = false; const f = Math.min(1, Math.max(0, (t - .8) * 2)); light(w.b, 1.2 + f * 3); talk(w.b, t, t < .8); w.bb.position.set(0, 10.5, 0); w.spark.position.set(0, 9.3, 0); w.spark.scale.setScalar(.3 + f * .9 + .1 * Math.sin(t * 8)); w.spark.visible = f > 0; },
    },
    {
      say: 'Light switch: on, off, or a disco? Comment below.',
      quiz: { q: 'What should the light do?', options: ['On', 'Off', 'A disco'], answer: 'This bulb is made up. He votes disco.' },
      show: ['ground', 'room', 'bb'], sky: '#274B73', lightAt: [0, 7, 2], lightDist: 12,
      cam: { pos: [1.5, 4.6, 8], look: [0, 9.2, 0], fov: 44, to: { pos: [-1.5, 4.6, 8], look: [0, 9.2, 0] } },
      update: (w, p, t) => { w.dark.visible = false; w.bb.position.set(0, 10.5, 0); light(w.b, 1.2); talk(w.b, t, false); },
    },
  ],
};
