// Narrative 16: "What Would Happen If… (season 6)". Animal premise (pets and big animals lead the channel's views).
// Hook: the premise as a question under 2 s; first frame shows a purple octopus walking down a street.

function octopus(k, parent, color = '#9B59B6') {
  const { mat, ball, cyl, group } = k;
  const m = mat(color, { rough: .5 });
  const o = { root: group([0, 0, 0], parent), m };
  o.head = ball(1, m, [0, 2.2, 0], o.root); o.head.scale.set(1, 1.2, 1);
  for (const s of [-1, 1]) { ball(.22, mat('#FFFFFF'), [s * .38, 2, .85], o.root); ball(.11, mat('#111111'), [s * .38, 2, 1.04], o.root); }
  o.arms = []; for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const g = group([Math.cos(a) * .6, 1.3, Math.sin(a) * .6], o.root); g.rotation.y = -a; const seg1 = cyl(.18, .12, 1.4, m, [0, -.6, 0], g, 8); const tip = group([0, -1.3, 0], g); cyl(.12, .06, 1, m, [0, -.45, 0], tip, 8); g.userData = { a, i, tip }; o.arms.push(g); }
  return o;
}
const wiggle = (o, t, sp = 4, amt = .4) => o.arms.forEach(g => { const { i, tip } = g.userData; g.rotation.z = .5 + amt * Math.sin(t * sp + i); tip.rotation.z = .4 + amt * Math.sin(t * sp + i + 1); });

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.floor = k.ground('#D8C9A8', .005);
  w.road = group(); box(400, .04, 6, mat('#5A5A5A', { rough: 1 }), [0, .02, 0], w.road);
  w.wall = group(); box(40, 20, .5, mat('#E8E0F0'), [0, 10, -5], w.wall);
  w.o = octopus(k, k.scene); w.oo = w.o.root;
  w.dishes = group(); for (let i = 0; i < 8; i++) { const d = i % 2 ? cyl(.35, .3, .06, mat('#FFFFFF'), [0, 0, 0], w.dishes, 16) : cyl(.18, .15, .4, mat(['#E2453C', '#3B6FD6', '#FFC21F', '#5FBF5F'][i / 2]), [0, 0, 0], w.dishes, 12); d.userData.i = i; }
  w.ink = group(); for (let i = 0; i < 10; i++) { const s = ball(.6 + (i % 3) * .3, mat('#111122', { opacity: .85 }), [0, 0, 0], w.ink); s.userData.i = i; s.castShadow = false; }
  w.sofa = group(); box(5, 1.2, 2, mat('#E2453C'), [0, .6, 0], w.sofa); box(5, 1.8, .5, mat('#C0392B'), [0, 1.8, -.8], w.sofa);
  w.person = group(); const pm = mat('#3B6FD6'); cyl(.8, .85, 2.6, pm, [0, 1.3, 0], w.person, 14); ball(.75, mat('#F2C9A0'), [0, 3.3, 0], w.person); for (const x of [-.28, .28]) { ball(.14, mat('#FFFFFF'), [x, 3.5, .66], w.person); ball(.07, mat('#111111'), [x, 3.5, .78], w.person); } box(1.3, .3, 1.3, mat('#3A2A1A'), [0, 4, -.1], w.person);
  w.hearts = group(); for (let i = 0; i < 5; i++) { const h = group([0, 0, 0], w.hearts); const hm = mat('#FF4F7B', { glow: .8 }); ball(.18, hm, [-.1, 0, 0], h); ball(.18, hm, [.1, 0, 0], h); const c = cone(.25, .32, hm, [0, -.18, 0], h, 10); c.rotation.z = Math.PI; h.userData.i = i; h.traverse(o => o.castShadow = false); }
  return w;
}

export default {
  id: '278',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE LAND OCTOPUS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF OCTOPUSES', 'LIVED ON LAND?'],
  title: 'What would happen if octopuses lived on land?',
  description: 'Eight arms means eight dishes at once. Scare one and the room goes dark. They turn invisible on your couch. And the hugs? Eight at a time. (A made-up comedy sketch.)',
  tags: ['whatif', 'funny', 'octopus', 'animals', 'comedy', 'shorts'],
  sources: ['Comedy sketch: octopuses cannot live on land. Quiz facts: octopuses have eight arms, squirt ink to escape, and can change colour to match their surroundings (Smithsonian Ocean).'],
  setup,
  scenes: [
    { say: 'What if octopuses lived on land?', show: ['ground', 'road', 'oo'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [1, 2.6, 9], look: [0, 2.6, 0], fov: 50, to: { pos: [1, 2.6, 8.2], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.o.head.material.color.set('#9B59B6'); w.oo.position.set(-1 + p * 2, .25 * Math.abs(Math.sin(t * 4)), 0); w.oo.rotation.set(0, -.3, .1 * Math.sin(t * 4)); wiggle(w.o, t, 8, .5); } },
    { say: 'Dishes? Eight at once.', label: 'DONE', show: ['floor', 'wall', 'oo', 'dishes'], sky: '#E8E0F0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3, 9], look: [0, 2.8, 0], fov: 52, to: { pos: [0, 3, 8.4], look: [0, 2.8, 0], fov: 50 } },
      update: (w, p, t) => { w.oo.position.set(0, .8, 0); w.oo.rotation.set(0, 0, 0); w.o.arms.forEach(g => { const { i, tip } = g.userData; g.rotation.z = 1.4 + .25 * Math.sin(t * 6 + i); tip.rotation.z = -.3 + .4 * Math.sin(t * 9 + i); }); w.dishes.children.forEach(d => { const i = d.userData.i, a = i / 8 * Math.PI * 2; d.position.set(Math.cos(a) * 1.9, 2.1 + .4 * Math.sin(t * 6 + i), Math.sin(a) * 1.2 + .8); d.rotation.set(Math.sin(t * 5 + i) * .8, 0, Math.cos(t * 5 + i) * .8); }); } },
    { say: 'Scare one? Instant blackout.', label: '*SPLAT*', show: ['floor', 'wall', 'oo', 'ink'], sky: '#E8E0F0', lightAt: [0, 6, 5], lightDist: 14, shake: (t) => t > .8 && t < 1.1 ? .2 : 0,
      cam: { pos: [0, 3, 9], look: [0, 2.6, 0], fov: 52, to: { pos: [0, 3, 8.4], look: [0, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { w.oo.position.set(0, 0, 0); wiggle(w.o, t, 12, .6); const q = Math.max(0, Math.min(1, (t - .8) * 1.4)); w.ink.children.forEach(s => { const i = s.userData.i; s.position.set(Math.sin(i * 2.3) * q * 3.2, 2 + Math.cos(i * 1.7) * q * 2.2, 1 + q * 2.5); s.scale.setScalar(.2 + q * 1.4); s.visible = q > 0; }); } },
    { say: 'Your couch? They just disappear.', show: ['floor', 'wall', 'oo', 'sofa'], sky: '#E8E0F0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 10], look: [0, 2.2, 0], fov: 52, to: { pos: [0, 3.4, 9.4], look: [0, 2.2, 0], fov: 50 } },
      update: (w, p, t) => { w.sofa.position.set(0, 0, -1); w.oo.position.set(.4, .6, -.4); w.oo.scale.setScalar(.8); wiggle(w.o, t, 2, .15); const c = new w.k.THREE.Color('#9B59B6').lerp(new w.k.THREE.Color('#E2453C'), Math.min(1, Math.max(0, (p - .3) * 2.5))); w.o.head.material.color.copy(c); } },
    { say: 'And the hugs? Eight at a time.', show: ['floor', 'wall', 'oo', 'person', 'hearts'], sky: '#FFD6E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [2.6, 3.8, 9], look: [0, 2.6, 0], fov: 50, to: { pos: [2.4, 3.8, 8.4], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { w.o.head.material.color.set('#9B59B6'); w.oo.scale.setScalar(1.1); w.oo.position.set(-1.1, 0, 0); w.oo.rotation.set(0, Math.PI / 2, 0); w.person.position.set(1.1, 0, 0); w.person.rotation.y = -Math.PI / 2; w.o.arms.forEach(g => { const { i, tip } = g.userData; g.rotation.z = (i % 4 < 2 ? 1.2 : .6) + .1 * Math.sin(t * 3 + i); tip.rotation.z = 1 + .2 * Math.sin(t * 3 + i); }); w.hearts.children.forEach(h => { const i = h.userData.i, q = (t * .5 + i / 5) % 1; h.position.set(-.8 + i * .4, 4.2 + q * 2, .3); h.scale.setScalar(1 - q * .5); }); } },
    { say: 'Land octopuses: helpful, scary, or way too slimy? Comment below.',
      quiz: { q: 'Would you want a land octopus?', options: ['Helpful', 'Scary', 'Way too slimy'], answer: 'Real octopuses live in the sea, squirt ink and change colour.' },
      show: ['floor', 'oo'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 3.4, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 3.4, 0] } },
      update: (w, p, t) => { w.oo.scale.setScalar(1); w.oo.position.set(0, .2, 0); w.oo.rotation.set(0, 0, 0); wiggle(w.o, t, 3, .3); } },
  ],
};
