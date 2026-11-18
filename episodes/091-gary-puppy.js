// Narrative 6: "Gary's Big World". A made-up comedy sketch: Gary the ant (recurring since 032) and his puppy are fictional.
// Hook rule: first line names Gary and the premise, under 2 s; first frame shows Gary in front of an enormous puppy face.

function seg(k, a, b, m, parent, r = .12) {
  const A = new k.THREE.Vector3(...a), B = new k.THREE.Vector3(...b), len = A.distanceTo(B);
  const c = k.cyl(r, r, len, m, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], parent, 8);
  c.quaternion.setFromUnitVectors(new k.THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
  c.castShadow = false;
  return c;
}
function gary(k, parent, s = 2, hat = '#FFC21F') {
  const { mat, ball, group } = k, g = group([0, 0, 0], parent), black = mat('#141414', { rough: .4 });
  g.scale.setScalar(s);
  ball(.28, black, [-.38, .32, 0], g); ball(.2, black, [0, .3, 0], g); ball(.22, black, [.36, .34, 0], g);
  for (const z of [-1, 1]) ball(.07, mat('#FFFFFF', { glow: .4 }), [.5, .42, z * .11], g);
  g.userData.legs = [];
  for (const x of [-.18, 0, .18]) for (const z of [-1, 1]) g.userData.legs.push(seg(k, [x, .3, 0], [x + .05, 0, z * .38], black, g, .03));
  seg(k, [.45, .44, .06], [.75, .78, .2], black, g, .025); seg(k, [.45, .44, -.06], [.75, .78, -.2], black, g, .025);
  if (hat) { const h = k.mesh(new k.THREE.SphereGeometry(.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(hat), [.36, .5, 0], g); h.castShadow = false; }
  return g;
}
function scurry(g, t, sp = 30) { g.userData.legs.forEach((l, i) => { l.rotation.x = .35 * Math.sin(t * sp + i * 1.7); }); }

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.yard = group();
  for (let i = 0; i < 10; i++) box(.4, 4, .4, mat('#FFFFFF'), [-18 + i * 4, 2, -14], w.yard);
  box(40, .3, .2, mat('#FFFFFF'), [0, 3.4, -14], w.yard); box(40, .3, .2, mat('#FFFFFF'), [0, 1.6, -14], w.yard);
  // the puppy (enormous to Gary)
  w.pup = group([0, 0, -6]);
  const fur = mat('#E0B07A', { rough: .9 }), dark = mat('#8B5A2B', { rough: .9 });
  const body = ball(5, fur, [0, 5, -4], w.pup); body.scale.set(1, .9, 1.4);
  w.head = group([0, 8, 2], w.pup);
  ball(4.2, fur, [0, 0, 0], w.head);
  const snout = ball(2, mat('#F2D3A8'), [0, -1.4, 3.4], w.head); snout.scale.set(1.2, .8, .8);
  ball(.7, mat('#111111'), [0, -.8, 4.9], w.head);
  for (const x of [-1.6, 1.6]) { ball(.75, mat('#FFFFFF'), [x, .9, 3.6], w.head); ball(.42, mat('#111111'), [x, .9, 4.2], w.head); }
  w.ears = [-1, 1].map(s => { const g = group([s * 3.2, 1.8, 0], w.head); const e = ball(1.6, dark, [s * .6, -1.6, 0], g); e.scale.set(.5, 1.4, .9); return g; });
  w.tongue = group([0, -2.6, 3.8], w.head); const tg = ball(1, mat('#FF7A99'), [0, -.6, .3], w.tongue); tg.scale.set(1, .4, 1.4);
  w.tail = group([0, 7, -10], w.pup); cyl(.4, .6, 4, fur, [0, 2, 0], w.tail, 10).rotation.x = -.4;
  for (const [x, z] of [[-2.6, 0], [2.6, 0], [-2.6, -8], [2.6, -8]]) cyl(1, 1, 4, fur, [x, 2, z], w.pup, 12);
  w.g = gary(k, k.scene, 2.2);
  w.leash = cyl(.05, .05, 1, mat('#E2453C'), [0, 0, 0], k.scene, 6); w.leash.geometry.translate(0, .5, 0);
  w.drops = group();
  for (let i = 0; i < 10; i++) { const d = ball(.18, mat('#5BC0EB', { glow: .6 }), [0, 0, 0], w.drops); d.userData = { a: i * .63, ph: i * .1 }; d.castShadow = false; }
  w.collar = k.torus(.45, .1, mat('#2F6FD6'), [0, 0, 0], k.scene); w.collar.rotation.x = 0; w.collar.rotation.y = Math.PI / 2;
  w.tag = ball(.15, mat('#FFD21F', { metal: .8 }), [0, 0, 0], k.scene);
  return w;
}

function wag(w, t) { w.tail.rotation.z = .6 * Math.sin(t * 14); w.ears.forEach((e, i) => { e.rotation.z = (i ? -1 : 1) * .1 * Math.sin(t * 6); }); }
function leash(w) { const a = new w.g.position.constructor(), b = new w.g.position.constructor(); w.head.localToWorld(a.set(0, -3.6, 0)); b.copy(w.g.position).add(new a.constructor(.9, .9, 0)); const d = a.clone().sub(b); w.leash.position.copy(b); w.leash.scale.set(1, d.length(), 1); w.leash.quaternion.setFromUnitVectors(new a.constructor(0, 1, 0), d.normalize()); }
const YARD = ['ground', 'yard', 'pup', 'g'];

export default {
  id: '091',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'GARY GETS A PUPPY',
  year: 'GARY\'S BIG WORLD',
  hook: ['GARY THE ANT', 'GOT A PUPPY.'],
  title: 'Gary the ant got a puppy',
  description: 'Walks are fast. Bath time is one lick. And the puppy has some ideas about who owns who. (Gary is made up.)',
  tags: ['garytheant', 'funny', 'puppy', 'pets', 'ant', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant (recurring since episode 032) and his puppy are made up.',
  ],
  setup,
  scenes: [
    {
      say: 'Gary the ant got a puppy.',
      show: YARD, sky: '#9ED2F3', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [3, 3, 19], look: [0, 9.5, -2], fov: 52, to: { pos: [3, 3, 17.5], look: [0, 9.5, -2], fov: 50 } },
      update: (w, p, t) => { w.pup.position.set(0, 0, -6); w.pup.rotation.y = 0; w.head.rotation.set(0, 0, .1 * Math.sin(t * 2)); wag(w, t); w.g.position.set(0, 0, 4); w.g.rotation.y = -Math.PI / 2; scurry(w.g, t, 10); w.collar.visible = w.tag.visible = false; },
    },
    {
      say: 'Walkies? The puppy walks him.',
      show: [...YARD, 'leash'], sky: '#A7D8F5', lightAt: [0, 4, 0], lightDist: 30,
      cam: { pos: [-4, 6, 38], look: [-7, 6, -4], fov: 58, to: { pos: [-1, 6, 35], look: [-3, 6, -4], fov: 56 } },
      update: (w, p, t) => {
        const x = -8 + t * 7; w.pup.position.set(x, .3 * Math.abs(Math.sin(t * 10)), -6); w.pup.rotation.y = Math.PI / 2; w.head.rotation.set(0, 0, 0); wag(w, t);
        w.g.position.set(x - 16, 1.5 + 1.2 * Math.abs(Math.sin(t * 10)), -2); w.g.rotation.set(0, 0, .6 * Math.sin(t * 9)); scurry(w.g, t, 50); leash(w); w.collar.visible = w.tag.visible = false;
      },
    },
    {
      say: 'Bath time? One lick.',
      show: [...YARD, 'drops'], sky: '#9ED2F3', lightAt: [0, 4, 2], lightDist: 16,
      cam: { pos: [7, 3, 12], look: [0, 3, 2], fov: 50, to: { pos: [6, 3, 10.5], look: [0, 3, 2], fov: 48 } },
      update: (w, p, t) => {
        w.pup.position.set(0, 0, -6); w.pup.rotation.y = 0; wag(w, t); w.g.rotation.set(0, -Math.PI / 2, 0); scurry(w.g, t, 6);
        const lick = Math.max(0, Math.sin(Math.min(1, Math.max(0, t - .4)) * Math.PI)); w.head.rotation.set(lick * .5, 0, 0); w.tongue.scale.set(1, 1, 1 + lick * 1.5);
        w.g.position.set(0, 0, 4); w.drops.visible = t > .9;
        w.drops.children.forEach(d => { const u = d.userData, f = (t * 1.2 + u.ph) % 1; d.position.set(Math.cos(u.a) * (.5 + f * 2), 1.5 + f * 1.5 - f * f * 3, 4 + Math.sin(u.a) * (.5 + f * 2)); });
        w.collar.visible = w.tag.visible = false;
      },
    },
    {
      say: 'Now the puppy thinks Gary is the pet.',
      show: YARD, sky: '#FFE3C2', lightAt: [0, 3, 3], lightDist: 14,
      cam: { pos: [5, 3, 11], look: [0, 3, 2], fov: 48, to: { pos: [4.5, 3, 9.5], look: [0, 3, 2], fov: 46 } },
      update: (w, p, t) => {
        w.pup.position.set(0, 0, -6); w.pup.rotation.y = 0; w.head.rotation.set(.35, 0, .15 * Math.sin(t * 3)); w.tongue.scale.set(1, 1, 1); wag(w, t);
        w.g.position.set(0, 0, 4); w.g.rotation.set(0, -Math.PI / 2, 0); scurry(w.g, t, 3);
        w.collar.visible = w.tag.visible = true; w.collar.position.set(0, 1.25, 4.15); w.tag.position.set(0, .7, 4.5);
      },
    },
    {
      say: 'Gary\'s next pet: goldfish, cat, or snail? Comment below.',
      quiz: { q: 'What pet should Gary get next?', options: ['A goldfish', 'A cat', 'A snail (hi, Steve)'], answer: 'Gary is made up, so any of them. Steve the snail has already applied.' },
      show: YARD, sky: '#274B73', lightAt: [0, 4, 0], lightDist: 22,
      cam: { pos: [5, 2, 16], look: [0, 9, -2], fov: 50, to: { pos: [-5, 2, 16], look: [0, 9, -2] } },
      update: (w, p, t) => { w.pup.position.set(0, 0, -6); w.head.rotation.set(0, 0, 0); wag(w, t); w.g.position.set(0, 0, 4); w.g.rotation.set(0, -Math.PI / 2, 0); scurry(w.g, t, 10); w.collar.visible = w.tag.visible = false; },
    },
  ],
};
