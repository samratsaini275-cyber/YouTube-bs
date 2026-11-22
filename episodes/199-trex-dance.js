// Narrative 12: "What Would Happen If… (season 4: animals and dinosaurs)". Dinosaurs (081 1.7K) + dancing.
// Hook: the premise as a question under 2 s; first frame shows a T-rex on a lit-up dance floor under a disco ball.

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
  w.floor = group(); w.tiles = []; const cols = ['#EC4899', '#3B82F6', '#22C55E', '#FFD21F', '#8B5CF6'];
  for (let i = 0; i < 10; i++) for (let j = 0; j < 8; j++) { const t = box(3.8, .2, 3.8, mat(cols[(i + j) % 5], { glow: .5 }), [-18 + i * 4, .1, -14 + j * 4], w.floor); w.tiles.push(t); t.userData.c = (i + j) % 5; }
  w.ground = k.ground('#1A1A2A', -.05);
  w.r = rex(k, k.scene); w.dino = w.r.root; w.r.collar.visible = false;
  w.disco = group(); ball(2, mat('#DDE3EA', { rough: .05, glow: .3 }), [0, 0, 0], w.disco); cyl(.05, .05, 6, mat('#999999'), [0, 4, 0], w.disco, 4);
  w.beams = group(); for (let i = 0; i < 6; i++) { const b = cyl(.08, .5, 18, mat(cols[i % 5], { glow: 1 }), [0, -9, 0], w.beams, 8); b.material.transparent = true; b.material.opacity = .35; b.castShadow = false; b.userData.i = i; }
  w.town = group(); for (let i = 0; i < 8; i++) { const h = 10 + (i * 5) % 8; const b = box(7, h, 6, mat(['#D9B38C', '#B8C7D9', '#E5C3C3', '#C8D9B8'][i % 4]), [-28 + i * 8, h / 2, -20], w.town); b.userData.i = i; }
  w.cups = group(); for (let i = 0; i < 4; i++) { const c = cyl(.6, .5, 1.2, mat(['#E2453C', '#3B82F6', '#22C55E', '#FFD21F'][i]), [0, 0, 0], w.cups, 12); c.userData.i = i; }
  w.table = box(6, .4, 3, mat('#8B5A2B'), [0, 0, 0]);
  return w;
}

const pose = (w, x, z, ry, t) => { w.dino.position.set(x, 0, z); w.dino.rotation.set(0, ry, 0); stomp(w.r, t, 4, true); w.r.neck.rotation.set(0, 0, 0); w.r.body.rotation.set(0, 0, 0); w.r.arms.forEach(a => a.rotation.set(0, 0, 0)); };
const party = (w, t) => { w.tiles.forEach(tl => tl.material.emissiveIntensity !== undefined && (tl.visible = ((tl.userData.c + Math.floor(t * 4)) % 5) !== 0)); w.disco.rotation.y = t; w.beams.children.forEach(b => { const i = b.userData.i; b.rotation.set(.5 * Math.sin(t * 1.5 + i), 0, .6 * Math.cos(t * 1.2 + i * 1.3)); }); };

export default {
  id: '199',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'DANCING T-REX',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF A T-REX', 'LEARNED TO DANCE?'],
  title: 'What would happen if a T-rex learned to dance?',
  description: 'The moves are mostly tail. Stomping to the beat shakes the whole town. And jazz hands? Very tiny jazz hands. (A comedy what-if.)',
  tags: ['whatif', 'dinosaurs', 'trex', 'dance', 'funny', 'shorts'],
  sources: [
    'Quiz fact reuses 187: birds are living dinosaurs (widely accepted in palaeontology; cited from general knowledge).',
  ],
  setup,
  scenes: [
    {
      say: 'What if a T-rex learned to dance?',
      show: ['ground', 'floor', 'dino', 'disco', 'beams'], sky: '#120A24', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [12, 7, 32], look: [1, 12.6, 0], fov: 46, to: { pos: [11, 7, 30], look: [1, 12.6, 0], fov: 44 } },
      update: (w, p, t) => { party(w, t); w.disco.position.set(4, 20, -2); w.beams.position.set(4, 20, -2); pose(w, -2, 0, -.45, t); w.dino.rotation.y = -.45 + .3 * Math.sin(t * 4); w.r.body.rotation.z = .08 * Math.sin(t * 8); },
    },
    {
      say: 'The moves? Mostly tail.',
      show: ['ground', 'floor', 'dino', 'cups', 'table'], sky: '#120A24', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [6, 10, 32], look: [-3, 8, 0], fov: 50, to: { pos: [5.5, 10, 30], look: [-3, 8, 0], fov: 48 } },
      update: (w, p, t) => {
        party(w, t); pose(w, 2, 0, -.2, t); w.r.tail.forEach((s, i) => s.rotation.y = .9 * Math.sin(t * 5) * (i ? .5 : 1));
        w.table.position.set(-10, 3, 2); const hit = Math.sin(t * 5) > .7 || t > 1.2;
        w.cups.children.forEach(c => { const i = c.userData.i, q = Math.max(0, t - .8); c.position.set(-12 + i * 1.4 - q * 6, 3.8 + q * 4 - q * q * 6, 2 + i * .2); c.rotation.set(q * 3, 0, q * 4 + i); });
      },
    },
    {
      say: 'Stomping to the beat? The whole town shakes.',
      show: ['ground', 'floor', 'dino', 'town'], sky: '#120A24', lightAt: [0, 8, 0], lightDist: 30,
      cam: { pos: [14, 9, 36], look: [0, 9, 0], fov: 50, to: { pos: [13, 9, 34], look: [0, 9, 0], fov: 48 } },
      shake: (t) => .15 * Math.abs(Math.sin(t * 8)),
      update: (w, p, t) => { party(w, t); pose(w, 0, 0, -.4, t); stomp(w.r, t, 8, false); w.dino.position.y = .8 * Math.abs(Math.sin(t * 4)); w.town.children.forEach(b => b.rotation.z = .05 * Math.sin(t * 16 + b.userData.i)); },
    },
    {
      say: 'Jazz hands? Very tiny jazz hands.',
      show: ['ground', 'floor', 'dino', 'disco', 'beams'], sky: '#120A24', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [8, 9, 22], look: [1.5, 9.8, 0], fov: 44, to: { pos: [7.5, 9, 20.5], look: [1.5, 9.8, 0], fov: 42 } },
      update: (w, p, t) => { party(w, t); w.disco.position.set(4, 20, -2); w.beams.position.set(4, 20, -2); pose(w, -2, 0, -.6, t); w.r.arms.forEach((a, i) => a.rotation.set((i ? 1 : -1) * .6 * Math.sin(t * 16), 0, -.8)); w.r.jaw.rotation.z = -.4; w.r.neck.rotation.z = -.2; },
    },
    {
      say: 'A dancing T-rex: amazing, chaotic, or adorable? Comment below.',
      quiz: { q: 'Would you dance with a T-rex?', options: ['Amazing', 'Chaotic', 'Adorable'], answer: 'Fun fact: birds are living dinosaurs. Some of them dance to attract a mate!' },
      show: ['ground', 'floor', 'dino', 'disco', 'beams'], sky: '#274B73', lightAt: [0, 8, 0], lightDist: 28,
      cam: { pos: [14, 7, 26], look: [0, 11, 0], fov: 46, to: { pos: [-10, 7, 28], look: [0, 11, 0] } },
      update: (w, p, t) => { party(w, t); pose(w, 0, 0, -.3, t); w.dino.rotation.y = -.3 + .3 * Math.sin(t * 4); },
    },
  ],
};
