// Narrative 18: "What Would Happen If… (season 8)". Body-upgrade premise (147 trunks 864).
// A made-up comedy sketch: people cannot squirt ink. Hook: the premise as a question under 2 s; first frame shows a person puffing out a dark ink cloud.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box } = k;
  const p = { root: group([0, 0, 0], parent) };
  p.shirtMat = mat(shirt);
  cyl(.8, .85, 2.4, p.shirtMat, [0, 1.5, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, p.shirtMat, [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .25, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));

function setup(k) {
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.floor = k.ground('#D8C9A8', 0);
  w.wall = group(); box(40, 20, .5, mat('#E8F0E0'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#FFFFFF'); w.pp = w.p.root;
  w.ink = group(); w.inkM = mat('#1B1830', { opacity: .85 }); for (let i = 0; i < 16; i++) { const b = ball(.5, w.inkM, [0, 0, 0], w.ink); b.userData.i = i; b.userData.d = [Math.cos(i * 2.4) * (.5 + (i % 4) * .3), Math.sin(i * 1.7) * .6 + (i % 3) * .3, Math.sin(i * 2.4) * .5]; b.castShadow = false; }
  w.spider = group(); const sk = mat('#222222'); ball(.35, sk, [0, 0, 0], w.spider); ball(.22, sk, [.4, 0, 0], w.spider); for (const z of [-1, 1]) for (let i = 0; i < 4; i++) { const l = cyl(.03, .03, .8, sk, [-.1 + i * .12, -.1, z * .4], w.spider, 5); l.rotation.x = z * 1; } for (const z of [-1, 1]) ball(.05, mat('#FFFFFF'), [.58, .08, z * .08], w.spider); w.thread = cyl(.01, .01, 4, mat('#DDDDDD'), [0, 2.2, 0], w.spider, 4);
  w.tub = group(); const tw = mat('#FFFFFF'); box(4, 1.4, .2, tw, [0, .7, 1], w.tub); box(4, 1.4, .2, tw, [0, .7, -1], w.tub); box(.2, 1.4, 2, tw, [-2, .7, 0], w.tub); box(.2, 1.4, 2, tw, [2, .7, 0], w.tub); w.water = box(3.8, .1, 1.8, mat('#7FC8F0', { opacity: .9 }), [0, 1.1, 0], w.tub); w.duck = group([1, 1.25, .3], w.tub); ball(.25, mat('#FFD23F'), [0, 0, 0], w.duck).scale.set(1.3, .9, 1); ball(.16, mat('#FFD23F'), [.22, .22, 0], w.duck); box(.12, .05, .1, mat('#FF9F1C'), [.4, .2, 0], w.duck);
  w.bushes = group(); for (let i = 0; i < 3; i++) ball(1.2, mat('#3E8E41'), [-4 + i * 4, 1, -2], w.bushes);
  w.f = person(k, k.scene, '#E2453C'); w.fr = w.f.root;
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };
// q: 0 = no ink .. 1 = full cloud, around (cx, cy, cz), scale s
const puff = (w, q, cx, cy, cz, s = 1) => w.ink.children.forEach(b => { const d = b.userData.d; b.position.set(cx + d[0] * q * 2 * s, cy + d[1] * q * 2 * s, cz + d[2] * q * 2 * s); b.scale.setScalar(Math.max(.01, q) * (1.2 + (b.userData.i % 3) * .3) * s); b.visible = q > .02; });

export default {
  id: '309',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE OCTOPUS INK',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'COULD SQUIRT INK?'],
  title: 'What would happen if humans could squirt ink like an octopus?',
  description: 'Scared? Squirt. Hide and seek is an instant win. Your white shirt? Ruined. And bath time turns the water black. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'octopus', 'ink', 'comedy', 'shorts'],
  sources: ['Comedy sketch: human ink is made up. Quiz fact: octopuses release clouds of dark ink to confuse predators while they escape (Encyclopaedia Britannica, "octopus").'],
  setup,
  scenes: [
    { say: 'What if humans could squirt ink?', show: ['floor', 'wall', 'pp', 'ink'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 9.5], look: [0, 4.4, 0], fov: 50, to: { pos: [0, 3.4, 8.8], look: [0, 4.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.6, 0, .3); pose(w.p, .5); w.p.mouth.scale.set(1.2, 2, 1); w.p.eyes.forEach(e => e.scale.setScalar(1.3)); puff(w, Math.min(1, Math.max(0, t - .3) * 1.2), 1.2, 2.6, .6, .7); } },
    { say: 'Scared? Squirt.', label: '*SPLURT*', show: ['floor', 'wall', 'pp', 'spider', 'ink'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.4, 3.6, 9], look: [.4, 3.4, 0], fov: 50, to: { pos: [1.3, 3.6, 8.4], look: [.4, 3.4, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, -.6, 0, .4); const drop = Math.min(1, p * 2.5); w.spider.position.set(1, 6.5 - drop * 2.4, .6); w.spider.rotation.set(0, Math.PI / 2, 0); const scared = p > .4; pose(w.p, scared ? 2.4 : .3); w.p.mouth.scale.set(1.2, scared ? 2.2 : 1, 1); w.p.eyes.forEach(e => e.scale.setScalar(scared ? 1.5 : 1)); w.pp.position.y = scared ? .3 * Math.abs(Math.sin((p - .4) * 12)) : 0; puff(w, scared ? Math.min(1, (p - .4) * 3) : 0, .9, 2.8, .9, .6); } },
    { say: 'Hide and seek? Instant win.', show: ['floor', 'wall', 'pp', 'fr', 'ink', 'bushes'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.6, 12], look: [0, 3, 0], fov: 54, to: { pos: [0, 3.6, 11.3], look: [0, 3, 0], fov: 52 } },
      update: (w, p, t) => { w.pp.position.y = 0; w.p.eyes.forEach(e => e.scale.setScalar(1)); w.p.mouth.scale.set(1, 1, 1); stand(w, -2, 0, .3); pose(w.p, .3); const q = Math.min(1, p * 2.4); puff(w, q, -2, 2.4, .2, 1.1); w.pp.visible = true; w.fr.position.set(2.6, 0, 1); w.fr.rotation.set(0, -.6 + .8 * Math.sin(t * 2), 0); w.f.head.rotation.y = .4 * Math.sin(t * 3); w.f.arms.forEach(a => a.rotation.set(0, 0, a.userData.s * .6)); } },
    { say: 'Your white shirt? Ruined.', label: 'OOPS', show: ['floor', 'wall', 'pp', 'ink'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [0, 3.4, 8.5], look: [0, 3.2, 0], fov: 50, to: { pos: [0, 3.4, 7.8], look: [0, 3.2, 0], fov: 48 } },
      update: (w, p, t) => { stand(w, 0, 0, 0); const q = Math.min(1, p * 2); puff(w, q < 1 ? q : Math.max(0, 1 - (p - .5) * 4), 0, 2.2, .8, .7); const c = new w.k.THREE.Color('#FFFFFF').lerp(new w.k.THREE.Color('#242038'), Math.min(1, Math.max(0, p - .3) * 2.5)); w.p.shirtMat.color.copy(c); pose(w.p, .5, .3); w.p.head.rotation.x = .45; w.p.mouth.scale.set(1.3, 1, 1); } },
    { say: 'And bath time? Black water.', show: ['floor', 'wall', 'pp', 'tub', 'ink'], sky: '#E8F0E0', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [1.6, 4.6, 8], look: [0, 1.8, 0], fov: 50, to: { pos: [1.5, 4.6, 7.4], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.p.shirtMat.color.set('#FFFFFF'); stand(w, -.6, 0, .2); w.pp.position.y = -1.5; w.p.head.rotation.x = 0; pose(w.p, 1.2); const q = Math.min(1, p * 1.6); w.water.material.color.copy(new w.k.THREE.Color('#7FC8F0').lerp(new w.k.THREE.Color('#1B1830'), q)); puff(w, q < .6 ? q : 0, 0, 1.2, 0, .5); w.duck.position.y = 1.25 + .05 * Math.sin(t * 3); w.p.mouth.scale.set(1.2, 2, 1); } },
    { say: 'Octopus ink: useful, gross, or way too messy? Comment below.',
      quiz: { q: 'Would you want octopus ink?', options: ['Useful', 'Gross', 'Way too messy'], answer: 'Made up for people. Real octopuses squirt ink clouds to escape predators.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1.2, 12], look: [0, 4.4, 0], fov: 56, to: { pos: [-1, 1.2, 12], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.pp.position.y = 0; stand(w, 0, 0, .2); pose(w.p, .3); } },
  ],
};
