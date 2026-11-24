// Narrative 18: "What Would Happen If… (season 8)". Big-animal premise (167 giant cats 450 and still growing).
// Hook: the premise as a question under 2 s; first frame shows a house-sized bunny next to a house.

function bunny(k, parent) {
  const { mat, ball, cone, box, group } = k;
  const fur = mat('#F2F0EC', { rough: .8 }), pink = mat('#F2A0B0');
  const b = { root: group([0, 0, 0], parent) };
  const bd = ball(1.1, fur, [0, 1.1, 0], b.root); bd.scale.set(1.2, 1, 1);
  b.head = group([1.1, 2.2, 0], b.root); ball(.7, fur, [0, 0, 0], b.head);
  for (const z of [-1, 1]) { ball(.13, mat('#111111', { rough: .2 }), [.5, .2, z * .35], b.head); ball(.04, mat('#FFFFFF', { glow: .6 }), [.6, .25, z * .33], b.head); }
  b.nose = ball(.1, pink, [.7, -.02, 0], b.head); b.teeth = box(.05, .18, .18, mat('#FFFFFF'), [.64, -.25, 0], b.head);
  b.ears = [-1, 1].map(z => { const e = group([-.1, .5, z * .25], b.head); const o = ball(.25, fur, [0, .7, 0], e); o.scale.set(.6, 3, .9); const i = ball(.18, pink, [.08, .7, 0], e); i.scale.set(.4, 2.6, .7); e.rotation.x = z * .2; return e; });
  ball(.35, fur, [-1.3, 1, 0], b.root);
  b.feet = [-1, 1].map(z => { const f = ball(.35, fur, [-.2, .2, z * .7], b.root); f.scale.set(2, .5, .8); return f; });
  return b;
}
const twitch = (b, t) => { b.nose.scale.setScalar(1 + .3 * Math.max(0, Math.sin(t * 18))); b.ears.forEach((e, i) => e.rotation.z = .1 * Math.sin(t * 3 + i)); };
function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, mat(shirt), [0, 1.3, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.4, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.3, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));


function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.bn = bunny(k, k.scene); w.br = w.bn.root;
  w.p = person(k, k.scene, '#3B6FD6'); w.pp = w.p.root;
  w.house = group(); box(4, 3.4, 3.4, mat('#F2D9B8'), [0, 1.7, 0], w.house); const roof = cone(3.2, 2.2, mat('#B3262E'), [0, 4.5, 0], w.house, 4); roof.rotation.y = Math.PI / 4; box(1, 1.8, .1, mat('#8B5A2B'), [0, .9, 1.72], w.house);
  w.garden = group(); box(6, .2, 3, mat('#6B4A2A'), [0, .1, 0], w.garden); w.carrots = []; for (let i = 0; i < 6; i++) { const c = group([-2.2 + (i % 3) * 2.2, .2, -.7 + Math.floor(i / 3) * 1.4], w.garden); const r = cone(.25, 1, mat('#F28A1F'), [0, .5, 0], c, 10); r.rotation.x = Math.PI; for (let j = 0; j < 3; j++) { const l = cone(.08, .6, mat('#3FA34D'), [(j - 1) * .1, 1.3, 0], c, 6); l.rotation.z = (j - 1) * .4; } w.carrots.push(c); }
  w.dust = group(); for (let i = 0; i < 10; i++) { const d = ball(.4, mat('#C9B48A'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.pp.scale.setScalar(1); w.p.head.rotation.set(0, 0, 0); w.p.mouth.scale.set(1, 1, 1); };
const bnAt = (w, x, y, z, ry, s) => { w.br.position.set(x, y, z); w.br.rotation.set(0, ry, 0); w.br.scale.setScalar(s); };

export default {
  id: '322',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE GIANT BUNNIES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BUNNIES', 'WERE GIANT?'],
  title: 'What would happen if bunnies were giant?',
  description: 'Your garden? Gone in one bite. One hop clears your house. And one foot thump? An earthquake. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'bunny', 'rabbit', 'giant', 'shorts'],
  sources: ['Comedy sketch: giant bunnies are made up. Quiz fact: a rabbit\'s front teeth never stop growing, so chewing on plants keeps them worn down (Encyclopaedia Britannica, "rabbit").'],
  setup,
  scenes: [
    { say: 'What if bunnies were giant?', show: ['ground', 'br', 'house', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1, 4, 22], look: [-.6, 7.4, 0], fov: 54, to: { pos: [1, 4, 20.5], look: [-.6, 7.4, 0], fov: 52 } },
      update: (w, p, t) => { bnAt(w, -3, 0, -5, -.9, 2.6); twitch(w.bn, t); w.house.position.set(4, 0, -1); stand(w, 1.2, 4, -.3); w.pp.scale.setScalar(.8); pose(w.p, .2); w.p.head.rotation.x = -.4; w.p.head.rotation.y = -.6; } },
    { say: 'Your garden? Gone in one bite.', label: 'CRUNCH', show: ['ground', 'br', 'garden', 'pp'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [3, 6, 18], look: [0, 3.4, 0], fov: 54, to: { pos: [3, 6, 17], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { bnAt(w, -5, 0, -1, -.3, 2); twitch(w.bn, t); w.bn.teeth.scale.y = 1 + .4 * Math.abs(Math.sin(t * 16)); const eaten = Math.floor(Math.max(0, p - .25) * 9); w.carrots.forEach((c, i) => c.visible = i >= eaten); stand(w, 4.4, 3.5, -.6); pose(w.p, eaten > 3 ? 2.4 : .3); w.p.mouth.scale.set(1.2, eaten > 3 ? 3 : 1, 1); } },
    { say: 'One hop? Right over your house.', label: 'BOING', show: ['ground', 'br', 'house'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [0, 6, 22], look: [0, 5.2, 0], fov: 56, to: { pos: [0, 6, 21], look: [0, 5.2, 0], fov: 54 } },
      update: (w, p, t) => { w.bn.teeth.scale.y = 1; w.carrots.forEach(c => c.visible = true); const q = Math.min(1, Math.max(0, (p - .1) * 1.25)); bnAt(w, -4.5 + q * 9, Math.sin(q * Math.PI) * 6.5, 0, 0, 1.3); w.br.rotation.z = .4 * Math.cos(q * Math.PI); w.bn.feet.forEach(f => f.position.x = q > 0 && q < 1 ? -.9 : -.2); w.house.position.set(0, 0, -.5); twitch(w.bn, t); } },
    { say: 'And one foot thump? An earthquake.', label: '*THUMP*', show: ['ground', 'br', 'house', 'pp', 'dust'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40, shake: (t) => (t % .8) < .2 && t > .5 ? .35 : 0,
      cam: { pos: [2, 5, 22], look: [0, 5.6, 0], fov: 56, to: { pos: [2, 5, 21], look: [0, 5.6, 0], fov: 54 } },
      update: (w, p, t) => { w.br.rotation.z = 0; bnAt(w, -4, 0, -2, -.4, 2.6); twitch(w.bn, t); const th = t > .5 && (t % .8) < .2; w.bn.feet.forEach(f => { f.position.x = -.2; f.position.y = th ? .2 : .6; }); w.house.position.set(4, th ? .3 : 0, -1); w.house.rotation.z = th ? .05 : 0; stand(w, 2, 4, -.4); w.pp.position.y = th ? .8 : 0; pose(w.p, 2.4); w.p.mouth.scale.set(1.2, 3, 1); w.dust.children.forEach(d => { const i = d.userData.i, a = i / 10 * Math.PI * 2; const r = 2 + ((t % .8) * 6); d.position.set(-4.5 + Math.cos(a) * r, .3, -2 + Math.sin(a) * r * .6); d.visible = t > .5; }); } },
    { say: 'Giant bunnies: cute, cuddly, or way too bouncy? Comment below.',
      quiz: { q: 'Giant bunnies are…', options: ['Cute', 'Cuddly', 'Way too bouncy'], answer: 'Made up. Real rabbit front teeth never stop growing.' },
      show: ['ground', 'br'], sky: '#274B73', lightAt: [0, 6, 6], lightDist: 16,
      cam: { pos: [10, 3, 8], look: [0, 3.2, 0], fov: 52, to: { pos: [12, 3, 1], look: [0, 3.2, 0] } },
      update: (w, p, t) => { w.house.position.y = 0; w.house.rotation.z = 0; w.bn.feet.forEach(f => f.position.y = .2); bnAt(w, 0, 0, 0, -.6, 1.6); twitch(w.bn, t); } },
  ],
};
