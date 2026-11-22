// Narrative 13: "Objects With Opinions (season 2)". A made-up comedy sketch: lamps do not talk.
// Hook rule: first line names the object and that it has a complaint, under 2 s; first frame shows the lamp with a face.

function lamp(k, parent) {
  const { mat, box, ball, cyl, group } = k;
  const l = { root: group([0, 0, 0], parent) };
  l.body = group([0, 0, 0], l.root);
  cyl(1.2, 1.4, .4, mat('#2F6FD6', { rough: .4 }), [0, .2, 0], l.body, 20);
  cyl(.15, .15, 3.6, mat('#C0C8D0', { metal: .7, rough: .3 }), [0, 2.2, 0], l.body, 10);
  l.bulb = ball(.45, mat('#FFF4C2', { glow: 1 }), [0, 4.1, 0], l.body);
  l.shade = cyl(.9, 1.7, 1.8, mat('#FFC21F', { rough: .7 }), [0, 4.6, 0], l.body, 24); l.shade.material.side = 2;
  l.face = group([0, 4.55, 1.35], l.body); l.face.rotation.x = -.42;
  for (const x of [-.4, .4]) { ball(.22, mat('#FFFFFF'), [x, .15, 0], l.face); ball(.11, mat('#111111'), [x, .15, .15], l.face); }
  l.brows = [-.4, .4].map(x => box(.32, .06, .05, mat('#111111'), [x, .45, .04], l.face));
  l.mouth = box(.4, .09, .05, mat('#5A1E1E'), [0, -.3, .02], l.face);
  l.glow = cyl(.2, 2.6, 3.6, mat('#FFF4C2', { glow: .6 }), [0, 2.1, 0], l.body, 24); l.glow.material.transparent = true; l.glow.material.opacity = .22; l.glow.castShadow = false;
  return l;
}
function talk(l, t, on = true) { l.mouth.scale.y = on ? 1 + 2.5 * Math.abs(Math.sin(t * 14)) : 1; }
function grump(l, a) { l.brows.forEach((b, i) => b.rotation.z = (i ? -1 : 1) * a); }
function light(l, on) { l.glow.visible = on; l.bulb.material.emissiveIntensity !== undefined && (l.bulb.material.emissiveIntensity = on ? 1 : 0); l.bulb.material.color.set(on ? '#FFF4C2' : '#8A8A8A'); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.table = k.ground('#A0673A', 0);
  w.wall = box(60, 30, .5, mat('#334066'), [0, 15, -5]); w.wall.castShadow = false;
  w.l = lamp(k, k.scene); w.lp = w.l.root;
  w.switch = group(); box(.8, 1.2, .2, mat('#FFFFFF'), [0, 0, 0], w.switch); w.toggle = box(.25, .45, .2, mat('#888888'), [0, 0, .15], w.switch);
  w.moths = group(); for (let i = 0; i < 6; i++) { const m = group([0, 0, 0], w.moths); ball(.12, mat('#8A7A6A'), [0, 0, 0], m); for (const s of [-1, 1]) { const wg = box(.3, .02, .2, mat('#B8A88A'), [s * .18, 0, 0], m); wg.userData.s = s; } m.userData.i = i; m.traverse(o => o.castShadow = false); }
  w.cat = group(); const b = ball(.9, mat('#222222'), [0, .7, 0], w.cat); b.scale.set(1.4, .8, .9); const h = ball(.6, mat('#222222'), [1.1, 1.3, 0], w.cat); for (const z of [-.25, .25]) { cone(.18, .35, mat('#222222'), [1.1, 1.9, z], w.cat, 4); ball(.1, mat('#B8F27A', { glow: .6 }), [1.6, 1.4, z], w.cat); }
  w.sea = k.ground('#2C6FA8', 0);
  w.rock = ball(4, mat('#5A5A5A', { rough: 1 }), [0, -2.4, 0]); w.rock.scale.set(1.2, .7, 1.2);
  w.tower = group(); for (let i = 0; i < 4; i++) cyl(1.5 - i * .15, 1.6 - i * .15, 1.5, mat(i % 2 ? '#FFFFFF' : '#E2453C'), [0, .2 + i * 1.5, 0], w.tower, 20);
  w.beam = group(); const bm = cyl(.4, 3, 14, mat('#FFF4C2', { glow: .7 }), [0, 0, 7], w.beam, 16); bm.rotation.x = Math.PI / 2; bm.material.transparent = true; bm.material.opacity = .3; bm.castShadow = false;
  w.stars = group(); for (let i = 0; i < 14; i++) { const s = ball(.08, mat('#FFFFFF', { glow: 1 }), [-10 + (i * 7.3) % 20, 8 + (i * 3.1) % 6, -8], w.stars); s.castShadow = false; }
  return w;
}

const stand = (w, x, y, z, ry, rz, t, on = true) => { w.lp.position.set(x, y, z); w.lp.rotation.set(0, ry, rz); w.l.body.position.set(0, 0, 0); light(w.l, true); talk(w.l, t, on); };

export default {
  id: '219',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LAMP',
  year: 'OBJECTS WITH OPINIONS',
  hook: ['THIS LAMP', 'HAS A COMPLAINT'],
  title: 'This lamp has a complaint',
  description: 'On, off, on, off, all night. Moths in his face. And the cat knocks him over. So the lamp got a much bigger job. (A made-up comedy sketch.)',
  tags: ['funny', 'lamp', 'bedroom', 'talkingobjects', 'comedy', 'shorts'],
  sources: [
    'Quiz fact: the Pharos of Alexandria, built in the 3rd century BCE, is one of the earliest known lighthouses and was one of the Seven Wonders of the Ancient World (Encyclopaedia Britannica, "Pharos of Alexandria").',
  ],
  setup,
  scenes: [
    {
      say: 'This lamp has a complaint.',
      show: ['table', 'wall', 'lp'], sky: '#334066', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1.4, 4.8, 9], look: [0, 5.1, 0], fov: 46, to: { pos: [1.3, 4.8, 8.2], look: [0, 5.1, 0], fov: 44 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, 0, t); grump(w.l, .35); },
    },
    {
      say: 'On, off, on, off. All night.',
      show: ['table', 'wall', 'lp', 'switch'], sky: '#334066', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [2, 4.6, 10], look: [.6, 4.4, 0], fov: 48, to: { pos: [1.9, 4.6, 9.2], look: [.6, 4.4, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, 0, t); const on = Math.floor(t * 3) % 2 === 0; light(w.l, on); w.switch.position.set(2.6, 3, -4.6); w.toggle.position.y = on ? .15 : -.15; grump(w.l, .6); w.l.mouth.scale.y = on ? 1 : 2.6; },
    },
    {
      say: 'Moths. Right in his face.',
      show: ['table', 'wall', 'lp', 'moths'], sky: '#334066', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [1.4, 4.8, 9], look: [0, 5.1, 0], fov: 46, to: { pos: [1.3, 4.8, 8.2], look: [0, 5.1, 0], fov: 44 } },
      update: (w, p, t) => {
        stand(w, 0, 0, 0, 0, 0, t); grump(w.l, -.3); w.l.mouth.scale.y = 2.4;
        w.moths.children.forEach(m => { const i = m.userData.i, a = t * (3 + i * .4) + i; m.position.set(Math.cos(a) * (1 + (i % 3) * .4), 4.6 + Math.sin(a * 1.7) * .9, 1.6 + Math.sin(a) * .5); m.children.forEach(c => { if (c.userData.s) c.rotation.z = c.userData.s * Math.sin(t * 40) * .8; }); });
      },
    },
    {
      say: 'And the cat? Knocks him over.',
      show: ['table', 'wall', 'lp', 'cat'], sky: '#334066', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [3.8, 4.4, 13], look: [2.7, 2.6, 0], fov: 52, to: { pos: [3.7, 4.4, 12.2], look: [2.7, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { const q = Math.min(1, Math.max(0, (t - .5) / .4)); w.cat.position.set(-2.6 + Math.min(1, t / .5) * 1.0, 0, 0); stand(w, 0, 0, 0, 0, -q * 1.45, t); grump(w.l, q > .5 ? -.35 : .3); if (q > .5) w.l.mouth.scale.y = 3; w.lp.position.x = q * .3; },
    },
    {
      say: 'So now he runs a lighthouse. Huge.',
      show: ['sea', 'rock', 'tower', 'lp', 'beam', 'stars'], sky: '#0E1630', lightAt: [0, 12, 4], lightDist: 30,
      cam: { pos: [2, 9, 13], look: [0, 9.2, 0], fov: 50, to: { pos: [1.9, 9, 12.2], look: [0, 9.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 6.2, 0, 0, 0, t, false); w.l.mouth.scale.y = 1.8; grump(w.l, -.35); w.beam.position.set(0, 10.6, 0); w.beam.rotation.y = t * 1.5; },
    },
    {
      say: 'Grumpy lamp: switch it off, leave it on, or let it shine? Comment below.',
      quiz: { q: 'What do you do with the grumpy lamp?', options: ['Switch it off', 'Leave it on', 'Let it shine'], answer: 'Fun fact: one of the first lighthouses, the Pharos of Alexandria, was an Ancient Wonder of the World.' },
      show: ['table', 'wall', 'lp'], sky: '#274B73', lightAt: [0, 7, 4], lightDist: 20,
      cam: { pos: [6, 5, 8], look: [0, 4.4, 0], fov: 46, to: { pos: [-6, 5, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { stand(w, 0, 0, 0, 0, 0, t, false); grump(w.l, -.2); },
    },
  ],
};
