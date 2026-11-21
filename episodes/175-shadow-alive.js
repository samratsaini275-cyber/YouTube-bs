// Narrative 11: "What Would Happen If… (season 3, with Gary)". Everyday-thing-comes-alive premise (trees walk, homework did itself: 1.1K each).
// Hook: the premise as a question under 2 s; first frame shows a person standing still while their shadow on the wall behind waves on its own.

function person(k, parent, shirt, flat = false) {
  const { mat, cyl, ball, box, group } = k;
  const m = c => flat ? mat('#14141C', { rough: 1 }) : mat(c);
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.6, m(shirt), [0, 1.3, 0], p.root, 14);
  p.head = group([0, 3.3, 0], p.root); ball(.75, m('#F2C9A0'), [0, 0, 0], p.head);
  if (!flat) { for (const x of [-.28, .28]) { ball(.16, mat('#FFFFFF'), [x, .15, .64], p.head); ball(.08, mat('#111111'), [x, .15, .78], p.head); } p.mouth = box(.3, .15, .05, mat('#5A1E1E'), [0, -.3, .72], p.head); }
  else { for (const x of [-.28, .28]) ball(.14, mat('#FFFFFF', { glow: .8 }), [x, .15, .7], p.head); }
  p.arms = [-1, 1].map(s => { const g = group([s * .9, 2.3, 0], p.root); cyl(.18, .16, 1.6, m(shirt), [0, -.8, 0], g, 8); ball(.2, m('#F2C9A0'), [0, -1.65, 0], g); return g; });
  p.legs = [-1, 1].map(s => { const g = group([s * .35, .2, 0], p.root); return g; });
  if (flat) p.root.scale.set(1, 1, .04);
  return p;
}

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = {};
  w.ground = k.ground('#CDBFA6', 0);
  w.wall = box(60, 14, .5, mat('#F2E2C4'), [0, 7, -3]); w.wall.castShadow = false;
  w.p = person(k, k.scene, '#2F6FD6'); w.pp = w.p.root;
  w.s = person(k, k.scene, '#000', true); w.sh = w.s.root;
  w.bush = group(); for (let i = 0; i < 5; i++) ball(1.3, mat('#2E8B4A'), [-1.6 + i * .8, 1.1 + (i % 2) * .5, 0], w.bush);
  w.phone = box(.5, .9, .08, mat('#222222'), [0, 0, 0]);
  w.flash = ball(.6, mat('#FFFFFF', { glow: 1 }), [0, 0, 0]); w.flash.castShadow = false;
  w.moon = ball(1.2, mat('#FFF6D0', { glow: 1 }), [6, 11, -2.6]);
  w.zz = group(); for (let i = 0; i < 3; i++) { const z = box(.7, .14, .1, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.zz); z.userData.i = i; z.castShadow = false; }
  w.dust = group(); for (let i = 0; i < 6; i++) { const d = ball(.35, mat('#D8CFC0'), [0, 0, 0], w.dust); d.userData.i = i; d.castShadow = false; }
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.arms.forEach(a => a.rotation.set(0, 0, 0)); w.p.mouth.scale.y = 1; w.p.head.rotation.set(0, 0, 0); };
const shade = (w, x, y = 0) => { w.wall.material.color.set('#F2E2C4'); w.sh.position.set(x, y, -2.7); w.sh.rotation.set(0, 0, 0); w.s.arms.forEach(a => a.rotation.set(0, 0, 0)); w.s.head.rotation.set(0, 0, 0); };

export default {
  id: '175',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'LIVING SHADOWS',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF YOUR SHADOW', 'CAME ALIVE?'],
  title: 'What would happen if your shadow came alive?',
  description: 'It gives away your hiding spot. It photobombs every selfie. It leaves without you. And at night it finally gets some sleep. (A comedy what-if.)',
  tags: ['whatif', 'funny', 'shadow', 'comedy', 'imagine', 'shorts'],
  sources: [
    'Comedy what-if; no factual claims.',
  ],
  setup,
  scenes: [
    {
      say: 'What if your shadow came alive?',
      show: ['ground', 'wall', 'pp', 'sh'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [.6, 3, 12], look: [.6, 4.3, 0], fov: 48, to: { pos: [.6, 3, 11.2], look: [.6, 4.3, 0], fov: 46 } },
      update: (w, p, t) => { stand(w, -.9, 1.5, .2); shade(w, 2.1); w.s.arms[1].rotation.z = 2.4 + .4 * Math.sin(t * 9); w.s.head.rotation.z = .15 * Math.sin(t * 3); },
    },
    {
      say: 'Hide and seek? It points right at you.',
      show: ['ground', 'wall', 'pp', 'sh', 'bush'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [2, 3.4, 13], look: [.5, 3.6, 0], fov: 48, to: { pos: [1.8, 3.4, 12], look: [.5, 3.6, 0], fov: 46 } },
      update: (w, p, t) => { w.bush.position.set(-1.2, 0, 2.4); stand(w, -1.2, .8, 0); w.pp.position.y = -.5; w.p.head.rotation.z = .1 * Math.sin(t * 4); shade(w, 2.4); w.s.arms[0].rotation.z = -1.4 - .1 * Math.sin(t * 10); },
    },
    {
      say: 'Selfies? It photobombs every single one.',
      show: ['ground', 'wall', 'pp', 'sh', 'flash'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [.5, 3.6, 9], look: [.3, 4.2, 0], fov: 46, to: { pos: [.4, 3.6, 8.3], look: [.3, 4.2, 0], fov: 44 } },
      update: (w, p, t) => {
        stand(w, -.6, 1.2, .3); w.p.arms[1].rotation.set(-1.2, 0, .5); w.phone.position.set(.9, 3.6, 3.2); w.phone.rotation.set(0, .3, 0);
        shade(w, .6, .3); w.s.arms[0].rotation.z = -2.7; w.s.arms[1].rotation.z = 2.7; w.s.head.rotation.z = .2 * Math.sin(t * 5);
        w.flash.visible = (t % 1) < .1; w.flash.position.set(.9, 3.6, 3.4);
      },
    },
    {
      say: 'Running late? It leaves without you.',
      show: ['ground', 'wall', 'pp', 'sh', 'dust'], sky: '#9ED2F3', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [1.2, 3.4, 14], look: [1.4, 3.8, 0], fov: 54, to: { pos: [1.4, 3.4, 13], look: [1.6, 3.8, 0], fov: 52 } },
      update: (w, p, t) => {
        stand(w, -1.5, 1.5, 0); w.p.mouth.scale.y = 2.4; w.p.arms[0].rotation.z = -.6;
        const x = .2 + t * 2.4; shade(w, x, .2 * Math.abs(Math.sin(t * 12))); w.s.arms.forEach((a, i) => a.rotation.x = (i ? 1 : -1) * .9 * Math.sin(t * 12)); w.sh.rotation.z = -.15;
        w.dust.children.forEach(d => { const q = (t * 2 + d.userData.i / 6) % 1; d.position.set(x - 1 - q * 2, .3 + q * .6, -2.4); d.scale.setScalar(.5 + q); });
      },
    },
    {
      say: 'But at night? It finally gets some sleep.',
      show: ['ground', 'wall', 'sh', 'moon', 'zz'], sky: '#1A2340', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [1, 3, 11], look: [1, 2.6, 0], fov: 48, to: { pos: [1, 3, 10.2], look: [1, 2.6, 0], fov: 46 } },
      update: (w, p, t) => {
        shade(w, -.5, 1.2); w.wall.material.color.set('#2B3557'); w.moon.position.set(3.5, 7, -2.6); w.moon.scale.setScalar(.55); w.sh.rotation.z = -Math.PI / 2; w.sh.position.set(-1.5, 2.6, -2.7); w.s.head.rotation.z = .05 * Math.sin(t * 2);
        w.zz.children.forEach(z => { const i = z.userData.i, q = (t * .6 + i / 3) % 1; z.position.set(2.2 + q * 1.2, 3 + q * 2.5, -2.6); z.scale.setScalar(.6 + q); });
      },
    },
    {
      say: 'A living shadow: cool, weird, or a best friend? Comment below.',
      quiz: { q: 'Would you want a living shadow?', options: ['Cool', 'Weird', 'Best friend'], answer: 'Shadows only copy you. For now.' },
      show: ['ground', 'wall', 'pp', 'sh'], sky: '#274B73', lightAt: [0, 3, 0], lightDist: 14,
      cam: { pos: [4, 3, 10], look: [.5, 4, 0], fov: 46, to: { pos: [-3, 3, 10], look: [.5, 4, 0] } },
      update: (w, p, t) => { stand(w, -.8, 1.5, .2); shade(w, 2.2); w.s.arms[1].rotation.z = 2.4 + .4 * Math.sin(t * 6); },
    },
  ],
};
