// Narrative 24: "In This Town… (season 3: cats say it out loud)". Non-cat slot: dogs rate their walks out loud.
// Hook: the rule under 2 s; first frame shows a dog in the park holding up a score card, its owner holding the lead.

function dog(k, parent) {
  const { mat, ball, cyl, group } = k;
  const g = { root: group([0, 0, 0], parent) };
  const db = ball(.8, mat('#C98B3E'), [0, 1, 0], g.root); db.scale.set(1.4, .8, .8);
  g.head = group([1.1, 1.6, 0], g.root); ball(.5, mat('#C98B3E'), [0, 0, 0], g.head); for (const z of [-1, 1]) { const ear = ball(.22, mat('#8B5A2B'), [-.1, .4, z * .35], g.head); ear.scale.y = 1.6; ball(.07, mat('#111111'), [.4, .1, z * .2], g.head); } ball(.1, mat('#111111'), [.5, -.05, 0], g.head);
  g.tongue = ball(.1, mat('#E87A8A'), [.42, -.25, 0], g.head); g.tongue.scale.set(.6, 1.4, .8);
  g.legs = []; for (const x of [-.6, .6]) for (const z of [-.3, .3]) { const l = group([x, .8, z], g.root); cyl(.12, .12, .8, mat('#C98B3E'), [0, -.4, 0], l, 6); g.legs.push(l); }
  g.tail = group([-1.1, 1.2, 0], g.root); const tl = cyl(.08, .05, .7, mat('#C98B3E'), [0, .35, 0], g.tail, 6);
  return g;
}

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
  const { mat, box, cyl, ball, group } = k;
  const w = { k };
  w.ground = k.ground('#8CC56A', 0);
  w.path = box(40, .04, 3, mat('#D8C8A0'), [0, .03, 1]);
  w.trees = group(); for (let i = 0; i < 4; i++) { const t = group([-6 + i * 4, 0, -3], w.trees); cyl(.25, .3, 2.4, mat('#7A5A3A'), [0, 1.2, 0], t, 8); ball(1.3, mat('#3E8F3A'), [0, 3.1, 0], t); }
  w.d = dog(k, k.scene); w.dr = w.d.root;
  w.p = person(k, k.scene, '#3B6FD6');
  w.card = group(); box(.7, .55, .04, mat('#FFFFFF'), [0, 0, 0], w.card); w.ng = box(.3, .3, .02, mat('#3FA34D', { glow: .4 }), [0, 0, .03], w.card); w.nr = box(.3, .3, .02, mat('#E2453C', { glow: .4 }), [0, 0, .03], w.card);
  w.puddle = cyl(1.4, 1.4, .04, mat('#6A5034'), [0, .05, 0], undefined, 20);
  w.splash = group(); for (let i = 0; i < 10; i++) { const s = ball(.1, mat('#7A5A3A'), [0, 0, 0], w.splash); s.userData.i = i; }
  w.tub = group(); box(2.6, 1, 1.4, mat('#FFFFFF'), [0, .5, 0], w.tub); w.suds = group(); for (let i = 0; i < 8; i++) ball(.25, mat('#FFFFFF', { glow: .2 }), [-.9 + i * .26, 1.05, (i % 2) * .3 - .15], w.suds);
  w.lead = cyl(.03, .03, 1, mat('#E2453C'), [0, 0, 0], undefined, 6);
  return w;
}

const dgAt = (w, x, z, ry, s) => { w.dr.position.set(x, 0, z); w.dr.rotation.set(0, ry, 0); w.dr.scale.setScalar(s); w.dr.visible = true; w.d.head.rotation.set(0, 0, 0); w.d.legs.forEach(l => l.rotation.set(0, 0, 0)); };
const pAt = (q, x, y, z, ry, s = 1) => { q.root.position.set(x, y, z); q.root.rotation.set(0, ry, 0); q.root.scale.setScalar(s); q.head.rotation.set(0, 0, 0); q.mouth.scale.set(1, 1, 1); q.eyes.forEach(e => e.scale.y = 1); q.root.visible = true; };
const card = (w, good) => { w.dr.updateWorldMatrix(true, true); const at = w.d.head.localToWorld(new w.k.THREE.Vector3(.1, .9, 0)); w.card.position.copy(at); w.card.visible = true; w.ng.visible = good === true; w.nr.visible = good === false; };
const trot = (w, t) => w.d.legs.forEach((l, i) => l.rotation.z = .5 * Math.sin(t * 12 + (i % 3 ? 0 : Math.PI)));
const leadOn = (w) => { w.p.arms[1].updateWorldMatrix(true, true); w.dr.updateWorldMatrix(true, true); const a = w.p.arms[1].localToWorld(new w.k.THREE.Vector3(0, -1.9, 0)); const b = w.d.head.localToWorld(new w.k.THREE.Vector3(-.3, -.35, 0)); w.lead.position.copy(a.clone().add(b).multiplyScalar(.5)); w.lead.scale.y = a.distanceTo(b); w.lead.quaternion.setFromUnitVectors(new w.k.THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize()); w.lead.visible = true; };

export default {
  id: '428',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DOGS RATE WALKS',
  year: 'IN THIS TOWN…',
  hook: ['IN THIS TOWN,', 'DOGS RATE WALKS'],
  title: 'In this town, dogs rate their walks',
  description: 'A short walk? Two stars. A muddy puddle? Five stars. A bath after? Zero stars. (A made-up comedy sketch.)',
  tags: ['inthistown', 'funny', 'dog', 'dogs', 'walk', 'shorts'],
  sources: ['Comedy sketch: dog walk reviews are made up. Quiz fact: dogs can hear sounds up to about 45,000 Hz, while people hear up to about 23,000 Hz (Louisiana State University School of Veterinary Medicine, "How Well Do Dogs and Other Animals Hear?").'],
  setup,
  scenes: [
    { say: 'In this town, dogs rate walks.', show: ['ground', 'path', 'trees', 'card', 'lead'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.2, 2.8, 11], look: [.1, 2.35, 0], fov: 50, to: { pos: [.2, 2.8, 10.5], look: [.1, 2.35, 0], fov: 48 } },
      update: (w, p, t) => { w.puddle.visible = false; w.splash.visible = false; w.tub.visible = false; dgAt(w, .9, 1.2, -1, 1.2); w.d.tail.rotation.x = .5 * Math.sin(t * 14); card(w, null); pAt(w.p, -1.4, 0, .4, .6, .85); pose(w.p, .2, .9); leadOn(w); } },
    { say: 'Short walk? Two stars.', label: '2 STARS', show: ['ground', 'path', 'trees', 'card', 'lead'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [1.1, 2.8, 11], look: [1, 2.2, 0], fov: 50, to: { pos: [1.1, 2.8, 10.5], look: [1, 2.2, 0], fov: 48 } },
      update: (w, p, t) => { const walk = p < .4; dgAt(w, .9 + (walk ? p * 2 : .8), 1.2, walk ? 0 : -1, 1.2); if (walk) trot(w, t); card(w, walk ? null : false); w.card.visible = !walk; pAt(w.p, -1.4 + (walk ? p * 2 : .8), 0, .4, walk ? Math.PI / 2 : .6, .85); pose(w.p, .2, .9); leadOn(w); } },
    { say: 'A muddy puddle? Five stars.', label: '5 STARS', show: ['ground', 'path', 'trees', 'puddle', 'splash', 'card'], sky: '#9ED2F3', lightAt: [4, 14, 10], lightDist: 40,
      cam: { pos: [.2, 2.6, 7.5], look: [0, 1.8, 0], fov: 50, to: { pos: [.2, 2.6, 7], look: [0, 1.8, 0], fov: 48 } },
      update: (w, p, t) => { w.p.root.visible = false; w.lead.visible = false; w.puddle.position.set(0, .05, 1); dgAt(w, 0, 1, -1.2, 1.2); w.dr.position.y = .2 * Math.abs(Math.sin(t * 8)); w.d.tail.rotation.x = .6 * Math.sin(t * 16); card(w, p > .45 ? true : null); w.splash.children.forEach(s => { const i = s.userData.i, q = (t * 1.5 + i / 10) % 1; s.position.set(Math.cos(i * 2.4) * (.5 + q), Math.sin(q * Math.PI) * 1.2, 1 + Math.sin(i * 2.4) * (.3 + q * .5)); }); } },
    { say: 'A bath after? Zero stars.', label: '0 STARS', show: ['ground', 'tub', 'card'], sky: '#BFE3F2', lightAt: [2, 9, 8], lightDist: 26,
      cam: { pos: [.2, 2.8, 7], look: [0, 2, 0], fov: 50, to: { pos: [.2, 2.8, 6.5], look: [0, 2, 0], fov: 48 } },
      update: (w, p, t) => { w.path.visible = false; w.trees.visible = false; w.puddle.visible = false; w.splash.visible = false; w.ground.material = w.k.mat('#DDE8EE'); w.tub.position.set(0, 0, .6); dgAt(w, 0, .5, -1.3, 1); w.dr.position.y = .3; w.d.head.rotation.z = -.2; w.d.tongue.scale.set(.6, .5, .8); card(w, p > .35 ? false : null); } },
    { say: 'Dog walk critics: fair, funny, or way too muddy? Comment below.',
      quiz: { q: 'Dog walk critics are…', options: ['Fair', 'Funny', 'Way too muddy'], answer: 'Made up. Fun fact: dogs hear much higher sounds than people can.' },
      show: ['ground', 'card'], sky: '#274B73', lightAt: [0, 8, 6], lightDist: 18,
      cam: { pos: [2, 2.4, 7], look: [0, 1.6, 0], fov: 52, to: { pos: [-2, 2.4, 7], look: [0, 1.6, 0] } },
      update: (w, p, t) => { w.tub.visible = false; w.ground.material = w.k.mat('#8CC56A'); dgAt(w, 0, 0, -1.2, 1.3); w.d.tail.rotation.x = .5 * Math.sin(t * 14); card(w, true); } },
  ],
};
