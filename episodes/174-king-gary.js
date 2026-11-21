// Narrative 11: "What Would Happen If… (season 3, with Gary)". Gary-led (every third). Power fantasy like Gary superhero (846, the top Gary video).
// Hook: the premise as a question under 2 s; first frame shows Gary in a gold crown on a throne on top of an ant hill, ants cheering.

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
  w.hill = group(); cone(5, 3.2, mat('#B5793F', { rough: 1 }), [0, 1.6, 0], w.hill, 24);
  w.throne = group(); box(1.6, .3, 1.4, mat('#B3262E'), [0, 0, 0], w.throne); box(.25, 1.8, 1.4, mat('#D4A72C', { glow: .2 }), [-.75, .9, 0], w.throne);
  w.g = gary(k, k.scene, 2.4, null);
  w.crown = group([.36, .58, 0], w.g); w.crown.scale.setScalar(.75); cyl(.3, .26, .22, mat('#FFD21F', { glow: .6 }), [0, 0, 0], w.crown, 10);
  for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; cone(.07, .2, mat('#FFD21F', { glow: .6 }), [Math.cos(a) * .25, .2, Math.sin(a) * .25], w.crown, 4); }
  w.crowd = group(); for (let i = 0; i < 7; i++) { const a = gary(k, w.crowd, 1.3, ['#E2453C', '#3B82F6', '#22C55E', '#8B5CF6', '#F97316', '#EC4899', '#14B8A6'][i]); a.userData.i = i; }
  w.blanket = group(); box(10, .05, 6, mat('#E2453C'), [0, .03, 0], w.blanket); for (let i = 0; i < 4; i++) box(10, .06, .5, mat('#FFFFFF'), [0, .04, -2.25 + i * 1.5], w.blanket);
  ball(.8, mat('#E8C07A'), [-2, .5, 0], w.blanket).scale.set(1.4, .5, 1); ball(.6, mat('#E35D5D'), [2, .6, -1], w.blanket); cyl(.5, .5, 1.2, mat('#F2F2F2'), [1, .6, 1.4], w.blanket, 14);
  w.shoe = group(); box(3.6, 1.2, 1.6, mat('#3A3A3A'), [0, 0, 0], w.shoe); box(3.8, .3, 1.7, mat('#F2F2F2'), [0, -.7, 0], w.shoe); box(1.4, 2.6, 1.4, mat('#2F6FD6'), [-.9, 1.8, 0], w.shoe);
  w.spider = group(); ball(.55, mat('#141414'), [0, .7, 0], w.spider); ball(.32, mat('#141414'), [.65, .65, 0], w.spider);
  for (const z of [-.12, .12]) ball(.07, mat('#FFFFFF', { glow: .6 }), [.92, .75, z], w.spider);
  for (let i = 0; i < 4; i++) for (const z of [-1, 1]) seg(k, [-.2 + i * .2, .7, 0], [-.6 + i * .4, 0, z * 1], mat('#141414'), w.spider, .05);
  box(.7, .5, .3, mat('#8B5A2B'), [-.2, .5, .9], w.spider);
  w.queen = gary(k, k.scene, 3.4, null);
  w.tiara = group([.36, .56, 0], w.queen); w.tiara.scale.setScalar(.7); cyl(.3, .3, .1, mat('#E7C6FF', { glow: .7 }), [0, 0, 0], w.tiara, 12); ball(.12, mat('#FF5ACD', { glow: 1 }), [0, .15, .25], w.tiara);
  w.stop = group(); cyl(.6, .6, .08, mat('#E2453C', { glow: .4 }), [0, 0, 0], w.stop, 8).rotation.x = Math.PI / 2; box(.7, .15, .1, mat('#FFFFFF'), [0, 0, .06], w.stop);
  return w;
}

const king = (w, x, y, z, ry, t, move = false) => { w.g.position.set(x, y, z); w.g.rotation.set(0, ry, 0); if (move) scurry(w.g, t, 14); else w.g.userData.legs.forEach(l => l.rotation.x = 0); };
const cheer = (w, t, cx = 0, cz = 4, spread = 7) => w.crowd.children.forEach(a => { const i = a.userData.i; a.position.set(cx - spread / 2 + i * spread / 6, .25 * Math.abs(Math.sin(t * 7 + i)), cz + (i % 2) * .8); a.rotation.set(0, -Math.PI / 2 + .2 * Math.sin(i), 0); });

export default {
  id: '174',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'KING GARY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF GARY', 'RULED THE WORLD?'],
  title: 'What would happen if Gary the ant ruled the world?',
  description: 'Picnics every day. No stepping on ants, ever. Spiders must move far away. But the queen is still the real boss. (Gary is made up.)',
  tags: ['whatif', 'garytheant', 'funny', 'ant', 'king', 'shorts'],
  sources: [
    'Comedy sketch: Gary the ant is made up.',
    'Quiz fact: an ant queen\'s main job is laying eggs; she does not direct the colony (general entomology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if Gary ruled the world?',
      show: ['ground', 'hill', 'throne', 'g', 'crowd'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [2, 3.6, 11], look: [0, 5.4, 0], fov: 46, to: { pos: [1.8, 3.6, 10.2], look: [0, 5.4, 0], fov: 44 } },
      update: (w, p, t) => { w.throne.position.set(0, 3.25, 0); king(w, .1, 3.4, 0, -.6, t); cheer(w, t, 0, 4.5, 8); },
    },
    {
      say: 'Rule one: picnics every single day.',
      show: ['ground', 'blanket', 'g', 'crowd'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [3, 4, 10], look: [0, 2.6, 0], fov: 50, to: { pos: [2.6, 4, 9.2], look: [0, 2.6, 0], fov: 48 } },
      update: (w, p, t) => { king(w, 0, .05, 1.8, -.4, t); w.g.rotation.z = .1 * Math.sin(t * 6); cheer(w, t, 0, -1, 9); },
    },
    {
      say: 'Rule two: no stepping on ants. Ever.',
      show: ['ground', 'g', 'crowd', 'shoe', 'stop'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [2, 2.6, 11], look: [0, 3.6, 0], fov: 52, to: { pos: [2, 2.6, 10], look: [0, 3.6, 0], fov: 50 } },
      shake: (t) => t < .5 ? .05 : 0,
      update: (w, p, t) => {
        king(w, -2, .05, 1.5, -.3, t); cheer(w, t, 1, 0, 5);
        const y = t < .6 ? 9 - t * 8 : 4.2 + (t - .6) * 3; w.shoe.position.set(1.5, y, 0);
        w.stop.position.set(-1.1, 2.6, 2); w.stop.rotation.set(0, -.3, 0); w.stop.visible = t > .3;
      },
    },
    {
      say: 'Rule three: spiders must move far away.',
      show: ['ground', 'g', 'spider'], sky: '#9ED2F3', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [1, 3, 13], look: [1, 2.2, 0], fov: 54, to: { pos: [1.5, 3, 12.5], look: [1.5, 2.2, 0], fov: 52 } },
      update: (w, p, t) => {
        king(w, -2.5, .05, 1, -.2, t); w.g.rotation.z = -.05;
        w.spider.position.set(1 + t * 1.6, .2 * Math.abs(Math.sin(t * 8)), -.5); w.spider.rotation.set(0, 0, 0); w.spider.scale.setScalar(1.5);
        w.spider.children.forEach((c, i) => { if (i > 3 && i < 12) c.rotation.x = .2 * Math.sin(t * 14 + i); });
      },
    },
    {
      say: 'But the queen? Still the real boss.',
      show: ['ground', 'g', 'queen'], sky: '#B9A6E8', lightAt: [0, 2, 0], lightDist: 14,
      cam: { pos: [2, 3.2, 12], look: [0, .9, 0], fov: 50, to: { pos: [1.8, 3.2, 11.2], look: [0, .9, 0], fov: 48 } },
      update: (w, p, t) => {
        w.queen.position.set(-2.2, .05, -1.2); w.queen.rotation.set(0, -.4, 0);
        king(w, 1.8, .05, 1.2, Math.PI + .3, t); w.g.rotation.z = -.25 - .1 * Math.abs(Math.sin(t * 3)); 
      },
    },
    {
      say: 'King Gary: great, terrible, or a bit much? Comment below.',
      quiz: { q: 'Should Gary rule the world?', options: ['Great', 'Terrible', 'A bit much'], answer: 'Real ant queens mostly lay eggs. They do not give orders.' },
      show: ['ground', 'hill', 'throne', 'g'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 16,
      cam: { pos: [5, 3.8, 8], look: [0, 4.4, 0], fov: 44, to: { pos: [-5, 3.8, 8], look: [0, 4.4, 0] } },
      update: (w, p, t) => { w.throne.position.set(0, 3.25, 0); king(w, .1, 3.4, 0, -Math.PI / 2 + .9, t); },
    },
  ],
};
