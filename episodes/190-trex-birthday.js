// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 1.7K).
// Hook: the premise as a question under 2 s; first frame shows a T-rex in a party hat behind a huge birthday cake with candles.

function rex(k, parent) {
  const { mat, box, cyl, ball, cone, group } = k;
  const g = mat('#5FA05A', { rough: .7 }), belly = mat('#C9E3A0', { rough: .7 });
  const r = { root: group([0, 0, 0], parent) };
  r.body = group([0, 0, 0], r.root);
  const torso = ball(3, g, [0, 7, 0], r.body); torso.scale.set(1.5, 1, .9);
  ball(2.2, belly, [1.4, 6.6, 0], r.body).scale.set(1, .9, .7);
  r.tail = [];
  let prev = r.body;
  for (let i = 0; i < 6; i++) { const t = group(i ? [-1.4, 0, 0] : [-4, 7, 0], prev); cyl(1.4 - i * .2, 1.6 - i * .2, 1.6, g, [-.7, 0, 0], t, 12).rotation.z = Math.PI / 2; r.tail.push(t); prev = t; }
  r.neck = group([3.6, 9, 0], r.body);
  r.head = group([1.2, 1.2, 0], r.neck);
  box(3.6, 2, 2.2, g, [.6, 0, 0], r.head);
  r.jaw = group([-.8, -1, 0], r.head); box(3.4, .7, 2, g, [1.6, -.2, 0], r.jaw);
  for (let i = 0; i < 6; i++) { cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, .9], r.head, 6).rotation.x = Math.PI; cone(.15, .4, mat('#FFFFFF'), [-.6 + i * .5, -.85, -.9], r.head, 6).rotation.x = Math.PI; }
  for (const z of [-.8, .8]) { ball(.35, mat('#FFFFFF'), [0, .6, z * 1.2], r.head); ball(.18, mat('#111111'), [.15, .6, z * 1.35], r.head); }
  r.arms = [-1, 1].map(s => { const a = group([2.6, 7, s * 1.6], r.body); cyl(.25, .2, 1.2, g, [.4, -.4, 0], a, 8).rotation.z = 1; return a; });
  r.legs = [-1, 1].map(s => { const l = group([-.6, 5.2, s * 1.6], r.root); cyl(1, .7, 4, g, [0, -2.2, 0], l, 10); box(1.8, .5, 1.2, g, [.5, -4.3, 0], l); return l; });
  r.collar = k.torus(1.2, .2, mat('#E2453C'), [4.6, 9.4, 0], r.body); r.collar.rotation.x = 0; r.collar.rotation.y = Math.PI / 2;
  return r;
}
function stomp(r, t, sp = 4, still = false) {
  r.legs.forEach((l, i) => { l.rotation.z = still ? 0 : .35 * Math.sin(t * sp + i * Math.PI); });
  r.body.position.y = still ? 0 : .3 * Math.abs(Math.sin(t * sp));
  r.tail.forEach((s, i) => { s.rotation.y = .12 * Math.sin(t * 3 - i * .5); s.rotation.z = i === 0 ? .15 : .05; });
  r.jaw.rotation.z = -.15 - .1 * Math.sin(t * 2);
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#7FB069', 0);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.hat = cone(.9, 2.2, mat('#EC4899', { glow: .2 }), [.4, 2.1, 0], w.r.head, 16); ball(.3, mat('#FFD21F', { glow: .6 }), [.4, 3.25, 0], w.r.head);
  w.cake = group(); cyl(3, 3, 2, mat('#F7C6D0'), [0, 1, 0], w.cake, 28); cyl(2.2, 2.2, 1.6, mat('#FFFFFF'), [0, 2.8, 0], w.cake, 28); cyl(3.05, 3.05, .3, mat('#EC4899'), [0, 2, 0], w.cake, 28);
  w.flames = []; for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; cyl(.08, .08, .8, mat(['#3B82F6', '#22C55E', '#FFD21F'][i % 3]), [Math.cos(a) * 1.4, 4, Math.sin(a) * 1.4], w.cake, 8); w.flames.push(ball(.15, mat('#FFB020', { glow: 1 }), [Math.cos(a) * 1.4, 4.5, Math.sin(a) * 1.4], w.cake)); }
  w.balloons = group(); for (let i = 0; i < 6; i++) { const b = group([0, 0, 0], w.balloons); ball(.8, mat(['#E2453C', '#3B82F6', '#FFD21F', '#22C55E', '#EC4899', '#8B5CF6'][i], { rough: .3 }), [0, 0, 0], b).scale.set(1, 1.2, 1); cyl(.02, .02, 3, mat('#FFFFFF'), [0, -2.2, 0], b, 4); b.userData.i = i; }
  w.gust = group(); for (let i = 0; i < 4; i++) { const g = k.torus(.6 + i * .4, .06, mat('#FFFFFF', { glow: .6 }), [0, 0, 0], w.gust); g.rotation.set(0, Math.PI / 2, 0); g.userData.i = i; g.castShadow = false; }
  w.gift = group(); box(3, 2.4, 3, mat('#3B82F6'), [0, 1.2, 0], w.gift); box(3.05, 2.45, .5, mat('#FFD21F'), [0, 1.2, 0], w.gift); box(.5, 2.45, 3.05, mat('#FFD21F'), [0, 1.2, 0], w.gift); ball(.5, mat('#FFD21F'), [0, 2.6, 0], w.gift);
  w.knife = box(.15, .1, 2.4, mat('#C9CED6', { rough: .2 }), [0, 0, 0]);
  return w;
}

const pose = (w, x, z, ry, t) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };

export default {
  id: '190',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'T-REX BIRTHDAY',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T-REX', 'HAD A BIRTHDAY?'],
  title: 'What would happen if a T-rex had a birthday party?',
  description: 'Blowing out the candles blows away the balloons. Cutting the cake is impossible with tiny arms. And presents? Good luck unwrapping. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'birthday', 'funny', 'shorts'],
  sources: [
    'Quiz fact: Tyrannosaurus rex lived at the very end of the Cretaceous and disappeared in the mass extinction about 66 million years ago (general palaeontology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T-rex had a birthday?',
      show: ['ground', 'dino', 'cake', 'balloons'], sky: '#F7E1A8', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [12, 7, 30], look: [1, 11.8, 0], fov: 46, to: { pos: [11, 7, 28], look: [1, 11.8, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -4, -2, -.3, t); w.r.neck.rotation.z = -.15; w.cake.position.set(5, 0, 2); w.flames.forEach((f, i) => { f.visible = true; f.scale.setScalar(1 + .2 * Math.sin(t * 20 + i)); }); w.balloons.children.forEach(b => { const i = b.userData.i; b.position.set(-9 + i * 3.4, 9 + .3 * Math.sin(t * 2 + i), -6); }); },
    },
    {
      say: 'Candles? The balloons blow away too.',
      show: ['ground', 'dino', 'cake', 'balloons', 'gust'], sky: '#F7E1A8', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [12, 7, 32], look: [2, 11, 0], fov: 50, to: { pos: [11, 7, 30], look: [2, 11, 0], fov: 48 } },
      shake: (t) => t > .5 ? .1 : 0,
      update: (w, p, t) => {
        pose(w, -4, -2, -.3, t); w.r.neck.rotation.z = -.25; w.r.jaw.rotation.z = t > .5 ? -.5 : -.1; w.cake.position.set(5, 0, 2);
        w.flames.forEach(f => f.visible = t < .6); w.gust.visible = t > .5;
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.head.localToWorld(v.set(3, -.5, 0));
        w.gust.children.forEach(g => { const i = g.userData.i, q = ((t - .5) * 1.3 + i / 4) % 1; g.position.set(v.x + q * 10, v.y - q * 3, v.z + q * 3); g.scale.setScalar(.5 + q * 2); g.rotation.set(0, Math.PI / 2 - .3, 0); });
        w.balloons.children.forEach(b => { const i = b.userData.i, q = Math.max(0, t - .6); b.position.set(-9 + i * 3.4 + q * 14, 9 + q * 6 + .3 * Math.sin(t * 2 + i), -6 + q * 3); b.rotation.z = -q; });
      },
    },
    {
      say: 'Cutting the cake? Those tiny arms cannot reach.',
      show: ['ground', 'dino', 'cake', 'knife'], sky: '#F7E1A8', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [8, 9, 26], look: [1, 9.5, 0], fov: 46, to: { pos: [7.5, 9, 24.5], look: [1, 9.5, 0], fov: 44 } },
      update: (w, p, t) => {
        pose(w, -3.5, 0, -.2, t); w.r.neck.rotation.z = -.35; w.r.arms.forEach(a => a.rotation.z = -.5 - .4 * Math.abs(Math.sin(t * 6))); w.cake.position.set(4.5, 0, 0);
        w.dino.updateMatrixWorld(true); const v = new w.dino.position.constructor(); w.r.arms[1].localToWorld(v.set(1.1, -.8, 0)); w.knife.position.copy(v); w.knife.rotation.set(0, .5, .3 * Math.sin(t * 6));
      },
    },
    {
      say: 'Presents? Good luck unwrapping.',
      show: ['ground', 'dino', 'gift'], sky: '#F7E1A8', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [12, 6, 28], look: [2, 8, 0], fov: 46, to: { pos: [11, 6, 26], look: [2, 8, 0], fov: 44 } },
      update: (w, p, t) => { pose(w, -3, 0, -.15, t); w.r.body.rotation.z = -.4; w.r.neck.rotation.z = -.7 + .15 * Math.sin(t * 5); w.gift.position.set(5, 0, 1); w.gift.rotation.set(0, .3 + .08 * Math.sin(t * 5), .05 * Math.sin(t * 5)); },
    },
    {
      say: 'A T-rex birthday: epic, chaotic, or adorable? Comment below.',
      quiz: { q: 'Would you go to a T-rex party?', options: ['Epic', 'Chaotic', 'Adorable'], answer: 'Real T-rex lived about 66 million years ago. That is a lot of candles.' },
      show: ['ground', 'dino', 'cake'], sky: '#274B73', lightAt: [0, 6, 0], lightDist: 26,
      cam: { pos: [14, 7, 26], look: [0, 10.5, 0], fov: 46, to: { pos: [-12, 7, 28], look: [0, 10.5, 0] } },
      update: (w, p, t) => { pose(w, -1, -1, -.3, t); w.cake.position.set(5, 0, 2); w.flames.forEach(f => f.visible = true); },
    },
  ],
};
