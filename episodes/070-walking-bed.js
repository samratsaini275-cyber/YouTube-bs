// Narrative 5: "What Would Happen If…". A made-up comedy sketch: beds do not have legs.
// Hook rule: the premise as a question under 2 s, first frame already showing a bed on four legs strolling down a street with someone asleep in it.

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#9AA0A8', 0);
  // street
  w.street = group();
  box(400, .1, 14, mat('#4A4F5A'), [0, .05, 0], w.street).castShadow = false;
  w.dashes = group([0, 0, 0], w.street);
  for (let i = 0; i < 40; i++) box(3, .02, .35, mat('#FFFFFF'), [-80 + i * 6, .12, 0], w.dashes).castShadow = false;
  w.blocks = group([0, 0, 0], w.street);
  const cols = ['#E8C9A0', '#C9D6E8', '#E8B4A0', '#D6E8C4', '#E6C6E6'];
  for (let i = 0; i < 16; i++) { const h = 12 + (i % 3) * 4; box(9, h, 8, mat(cols[i % 5]), [-70 + i * 10, h / 2, -14], w.blocks); for (let r = 0; r < 3; r++) box(6, 1.4, .2, mat('#7FB2D9'), [-70 + i * 10, 3 + r * 3.6, -9.9], w.blocks).castShadow = false; }
  // the bed, with legs
  w.bed = group([0, 0, 0]);
  w.frame = group([0, 0, 0], w.bed);
  box(9, 1, 5, mat('#8B5A2B'), [0, 3.2, 0], w.frame);
  box(8.6, 1, 4.6, mat('#FFFFFF'), [0, 4.1, 0], w.frame);
  w.quilt = box(5.8, .6, 4.8, mat('#E2453C'), [1.3, 4.7, 0], w.frame);
  box(.5, 4, 5, mat('#8B5A2B'), [-4.5, 4.5, 0], w.frame);
  box(2, .8, 3.4, mat('#FFFFFF'), [-3.2, 4.9, 0], w.frame);
  w.legs = [];
  for (const [x, z] of [[-3.8, -2], [3.8, -2], [-3.8, 2], [3.8, 2]]) { const g = group([x, 2.8, z], w.bed); cyl(.3, .25, 2.6, mat('#8B5A2B'), [0, -1.3, 0], g, 10); box(.7, .3, .9, mat('#5A3A1E'), [.2, -2.6, 0], g); w.legs.push(g); }
  // the sleeper, tucked in (head on the pillow)
  w.sleeper = group([-3, 5.6, 0], w.frame);
  ball(.9, mat('#F2C9A0'), [0, 0, 0], w.sleeper);
  for (const z of [-.3, .3]) box(.08, .06, .25, mat('#111111'), [.35, .25, z], w.sleeper).rotation.y = Math.PI / 2;
  w.cap = cone(.8, 1.6, mat('#7FB2E5'), [-.3, .8, 0], w.sleeper, 14); w.cap.rotation.z = .9;
  w.zz = group([-2, 7.5, 0], w.frame);
  for (let i = 0; i < 3; i++) { const z = box(.6 + i * .2, .15, .1, mat('#FFFFFF', { glow: 1.5 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  // office
  w.office = group([0, 0, 80]);
  box(40, 16, .5, mat('#E6E9EE'), [0, 8, -10], w.office);
  for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) box(3.9, .05, 3.9, mat((i + j) % 2 ? '#C9CED6' : '#B5BBC4'), [-18 + i * 4, .03, -9 + j * 4], w.office).castShadow = false;
  box(14, .4, 6, mat('#6B4B2E'), [4, 4, -3], w.office);
  for (const x of [-2, 10]) for (const z of [-5.4, -.6]) box(.4, 4, .4, mat('#5A3A1E'), [x, 2, z], w.office);
  w.screen = box(8, 4.5, .2, mat('#1E2A3A', { glow: .3 }), [4, 10, -9.6], w.office);
  for (let i = 0; i < 4; i++) box(1, 1 + i * .7, .1, mat('#22C55E', { glow: 1 }), [1.5 + i * 1.6, 8.4 + (1 + i * .7) / 2, -9.45], w.office).castShadow = false;
  w.coworkers = group([0, 0, 0], w.office);
  for (const [x, z, c] of [[8, -7, '#2F6FD6'], [11.5, -3, '#22C55E']]) { const g = group([x, 0, z], w.coworkers); cyl(.9, 1.1, 4, mat(c), [0, 2, 0], g, 14); ball(1, mat('#F2C9A0'), [0, 4.8, 0], g); box(1.6, .2, .3, mat('#FFFFFF'), [0, 3.6, .95], g); g.lookAt(-2, 0, -3 + 80); }
  // the abandoned owner at his desk, in pyjamas
  w.owner = group([0, 0, 80]);
  cyl(1, 1.15, 3.6, mat('#7FB2E5'), [0, 1.8, 0], w.owner, 18);
  for (let i = 0; i < 4; i++) cyl(1.02, 1.05, .25, mat('#FFFFFF'), [0, .5 + i * .9, 0], w.owner, 18).castShadow = false;
  ball(1.05, mat('#F2C9A0'), [0, 4.5, 0], w.owner);
  w.oeyes = [-.38, .38].map(x => ball(.16, mat('#111111'), [x, 4.7, .95], w.owner));
  w.omouth = ball(.25, mat('#5A1E1E'), [0, 4.1, .95], w.owner);
  cone(.9, 1.8, mat('#7FB2E5'), [.2, 5.8, -.2], w.owner, 14).rotation.z = -.5;
  return w;
}

function walk(w, t, o = {}) {
  const s = o.speed ?? 6;
  w.bed.position.set(o.x ?? 0, .2 * Math.abs(Math.sin(t * s)), o.z ?? 0); w.bed.rotation.y = o.yaw ?? 0;
  w.legs.forEach((g, i) => { g.rotation.z = (o.still ? 0 : .55) * Math.sin(t * s + (i % 2 ? Math.PI : 0) + (i > 1 ? Math.PI : 0)); });
  w.frame.rotation.z = (o.still ? 0 : .03) * Math.sin(t * s * 2);
  w.sleeper.visible = o.empty !== true; w.zz.visible = o.empty !== true;
  w.zz.children.forEach(z => { const f = (t * .7 + z.userData.i / 3) % 1; z.position.set(f * 1.5, f * 3, 0); z.scale.setScalar(.6 + f); });
  w.quilt.scale.y = o.empty ? .6 : 1;
}
function scroll(w, t, sp = 6) { w.dashes.position.x = -((t * sp) % 6); w.blocks.position.x = -((t * sp) % 10); }
const ST = ['ground', 'street', 'bed'];

export default {
  id: '070',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WALKING BED',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF BEDS', 'COULD WALK?'],
  title: 'What would happen if your bed could walk?',
  description: 'It takes you to work. You never wake up. It has strong opinions about 5 p.m. (A made-up walking bed.)',
  tags: ['whatif', 'funny', 'bed', 'sleep', 'comedy', 'shorts'],
  sources: [
    'Comedy sketch: the walking bed is made up.',
  ],
  setup,
  scenes: [
    {
      say: 'What if beds could walk?',
      show: ST, sky: '#BFD8EE', lightAt: [0, 3, 0], lightDist: 22,
      cam: { pos: [12, 4, 25], look: [0, 9, 0], fov: 48, to: { pos: [10, 4, 22], look: [0, 9, 0], fov: 46 } },
      update: (w, p, t) => { scroll(w, t); walk(w, t); },
    },
    {
      say: 'It carries you to work. Still asleep.',
      show: ST, sky: '#C9DDF0', lightAt: [0, 4, 0], lightDist: 14,
      cam: { pos: [-9, 10, 16], look: [-1, 5, 0], fov: 46, to: { pos: [-8, 9.5, 14], look: [-1.5, 5, 0], fov: 44 } },
      update: (w, p, t) => { scroll(w, t); walk(w, t); },
    },
    {
      say: 'The big meeting? You are in it. Kind of.',
      show: ['office', 'bed'], sky: '#E6E9EE', lightAt: [2, 4, 77], lightDist: 20,
      cam: { pos: [-20, 11, 96], look: [-4, 4.5, 78], fov: 50, to: { pos: [-18, 10.5, 93], look: [-4, 4.5, 78], fov: 48 } },
      update: (w, p, t) => { walk(w, t, { still: true, x: -4, z: 77.5, yaw: -.3 }); w.bed.position.y = 0; },
    },
    {
      say: 'Then at five on the dot, it runs home without you.',
      show: ['office', 'bed', 'owner'], sky: '#FFE3C2', lightAt: [0, 4, 80], lightDist: 22,
      cam: { pos: [4, 8, 106], look: [-2, 5, 81], fov: 52, to: { pos: [4, 8, 104], look: [-2.5, 5, 81], fov: 52 } },
      update: (w, p, t) => {
        walk(w, t, { empty: true, speed: 14, x: -3 - Math.max(0, t - .9) * 9, z: 82, yaw: 0 });
        w.owner.position.set(2, 0, 82); w.oeyes.forEach(e => e.scale.setScalar(1.6)); w.omouth.scale.setScalar(1.4 + .2 * Math.sin(t * 12));
        w.owner.rotation.y = -.6;
      },
    },
    {
      say: 'Walking bed: yes, no, or only on Mondays? Comment below.',
      quiz: { q: 'Would you want a walking bed?', options: ['Yes', 'No', 'Only on Mondays'], answer: 'It is a made-up bed, so you will have to walk to work yourself. Sorry.' },
      show: ST, sky: '#274B73', lightAt: [0, 3, 0], lightDist: 22,
      cam: { pos: [14, 3, 22], look: [0, 13, 0], fov: 46, to: { pos: [-12, 3, 22], look: [0, 13, 0] } },
      update: (w, p, t) => { scroll(w, t); walk(w, t); },
    },
  ],
};
