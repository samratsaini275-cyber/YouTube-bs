// Narrative 30: "What Would Happen If… (season 12: tiny animals and animal-part humans)". Copies 269 elephant ears.
// Hook: the premise as a question under 2 s; first frame shows a person with a big black dog nose, sniffing.

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
const trot = (d, t, sp = 18) => d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * sp + i * Math.PI / 2));

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .01);
  w.wall = group(); box(40, 20, .5, mat('#FEF5E7'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#CA6F1E'); w.pp = w.p.root;
  w.nose = group([0, -.02, .7], w.p.head); const n = ball(.32, mat('#111111', { rough: .3 }), [0, 0, .1], w.nose); n.scale.set(1.3, .9, 1); for (const x of [-.12, .12]) ball(.07, mat('#3A3A3A'), [x, -.08, .38], w.nose);
  w.keys = group(); cyl(.12, .12, .03, mat('#F4D03F'), [0, 0, 0], w.keys, 16).rotation.x = Math.PI / 2; box(.35, .06, .03, mat('#F4D03F'), [.25, 0, 0], w.keys);
  w.cush = group(); box(2.2, .5, 1, mat('#5DADE2'), [0, .25, 0], w.cush); box(2.2, .9, .3, mat('#5DADE2'), [0, .7, -.4], w.cush);
  w.pizza = group(); const pz = cyl(.6, .6, .06, mat('#F5B041'), [0, 0, 0], w.pizza, 6, 0, Math.PI / 3); for (let i = 0; i < 3; i++) cyl(.08, .08, .07, mat('#C0392B'), [.2 + i * .1, .01, .1 * (i - 1)], w.pizza, 10);
  w.waves = group(); for (let i = 0; i < 5; i++) { const s = box(.5, .05, .05, mat('#FDFEFE', { glow: .6 }), [0, 0, 0], w.waves); s.userData.i = i; s.castShadow = false; }
  w.sock = group(); box(.35, .9, .25, mat('#ECF0F1'), [0, .45, 0], w.sock); box(.6, .3, .25, mat('#ECF0F1'), [.15, 0, 0], w.sock); box(.36, .15, .26, mat('#E74C3C'), [0, .85, 0], w.sock);
  w.stink = group(); for (let i = 0; i < 4; i++) { const s = box(.05, .4, .05, mat('#7DCEA0', { glow: .6 }), [0, 0, 0], w.stink); s.userData.i = i; s.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
const sniff = (w, t) => { w.nose.scale.setScalar(1 + .08 * Math.abs(Math.sin(t * 12))); };
const env = { sky: '#FEF5E7', lightAt: [0, 6, 5], lightDist: 14 };
const hide = (w, ...n) => n.forEach(k => w[k].visible = false);

export default {
  id: '554',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE DOG NOSES',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF WE HAD', 'DOG NOSES?'],
  title: 'What would happen if we had dog noses?',
  description: 'Lost keys? Found in seconds. Pizza? You smell it from three streets away. Socks? A terrible mistake. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'dog', 'nose', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human dog noses are made up. Quiz fact: in experiments with an anatomically similar 3D-printed dog\'s nose, the air a dog breathes out pulls scent-laden air toward the nose, and actively sniffing like a dog detected odours up to 18 times better than breathing in continuously (Staymates et al., "Biomimetic sniffing improves the detection performance of a 3D printed nose of a dog and a commercial trace vapor detector", Scientific Reports, 2016).'],
  setup,
  scenes: [
    { say: 'What if we had dog noses?', show: ['floor', 'wall', 'pp'], ...env,
      cam: { pos: [0, 4.4, 8], look: [0, 3, 0], fov: 46, to: { pos: [0, 4.4, 7.4], look: [0, 3, 0], fov: 44 } },
      update: (w, p, t) => { hide(w, 'keys', 'cush', 'pizza', 'waves', 'sock', 'stink'); stand(w, 0, 0, Math.sin(t * 2) * .4); pose(w.p, .3); sniff(w, t); w.p.eyes.forEach(e => e.scale.setScalar(1.2)); } },
    { say: 'Lost keys? Found in seconds.', show: ['floor', 'wall', 'pp', 'keys', 'cush'], ...env,
      cam: { pos: [.4, 3.2, 8.5], look: [.4, 2, 0], fov: 50, to: { pos: [.4, 3.2, 8], look: [.4, 2, 0], fov: 48 } },
      update: (w, p, t) => { hide(w, 'pizza', 'waves', 'sock', 'stink'); stand(w, -.8, .4, .5); pose(w.p, .2, .3); w.pp.rotation.x = .4; sniff(w, t); w.cush.position.set(1.2, 0, -.6); const f = p > .55; w.keys.position.set(1.4, f ? 1.4 + Math.sin(t * 6) * .1 : .52, f ? .2 : -.3); w.keys.rotation.z = f ? t * 3 : 0; } },
    { say: 'Pizza? You smell it from three streets away.', show: ['ground', 'pp', 'pizza', 'waves'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.2, 9], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3.2, 8.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { hide(w, 'keys', 'cush', 'sock', 'stink', 'floor', 'wall'); w.ground.visible = true; stand(w, -1.4, 0, Math.PI / 2 - .3); pose(w.p, .3, .6); sniff(w, t); w.p.head.rotation.y = .3; w.pizza.position.set(2.6, 3.2, -1); w.pizza.rotation.set(.5, t, 0); w.waves.children.forEach(s => { const q = (t * .8 + s.userData.i / 5) % 1; s.position.set(2.2 - q * 3.4, 3.2 + Math.sin(q * 10 + s.userData.i) * .2, -.6 + q * .6); s.rotation.z = Math.sin(q * 10) * .3; }); } },
    { say: 'Socks? A terrible mistake.', show: ['floor', 'wall', 'pp', 'sock', 'stink'], ...env,
      cam: { pos: [.4, 3.4, 6.5], look: [.3, 2.8, 0], fov: 48, to: { pos: [.4, 3.4, 6], look: [.3, 2.8, 0], fov: 46 } },
      update: (w, p, t) => { hide(w, 'keys', 'cush', 'pizza', 'waves'); stand(w, -.6, 0, .3); pose(w.p, .2); w.p.arms[1].rotation.set(-1.3, 0, .2); w.sock.position.set(.9, 2.3, 1); w.sock.rotation.z = .3; const yuck = p > .4; w.p.head.rotation.set(yuck ? -.3 : 0, 0, yuck ? .3 : 0); w.p.eyes.forEach(e => e.scale.set(1, yuck ? .3 : 1, 1)); w.p.mouth.scale.set(1.2, yuck ? 2.5 : 1, 1); w.stink.children.forEach(s => { const q = (t * .7 + s.userData.i / 4) % 1; s.position.set(.8 + (s.userData.i - 1.5) * .15, 3.1 + q * .8, 1); s.rotation.z = Math.sin(q * 8) * .5; }); } },
    { say: 'Dog noses: useful, funny, or super cool? Comment below.',
      quiz: { q: 'Would you want a dog nose?', options: ['Useful', 'Funny', 'Super cool'], answer: 'Fun fact: a 3D-printed dog nose smelled up to 18 times better when it sniffed like a real dog.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 2, 8], look: [0, 3.2, 0], fov: 50, to: { pos: [-1, 2, 8], look: [0, 3.2, 0] } },
      update: (w, p, t) => { hide(w, 'keys', 'cush', 'pizza', 'waves', 'sock', 'stink', 'wall'); stand(w, 0, 0, .2); pose(w.p, .3); sniff(w, t); } },
  ],
};
