// Narrative 16: "What Would Happen If… (season 6)". Body-upgrade premise (147 trunks 855). Season finale.
// A made-up comedy sketch: people do not have wheels for feet. Hook: the premise as a question under 2 s; first frame shows a person rolling along on wheels.

function person(k, parent, shirt) {
  const { mat, cyl, ball, group, box, torus } = k;
  const p = { root: group([0, 0, 0], parent) };
  cyl(.8, .85, 2.3, mat(shirt), [0, 1.65, 0], p.root, 14);
  p.arms = [-1, 1].map(s => { const a = group([s * .95, 2.6, 0], p.root); cyl(.18, .18, 1.6, mat(shirt), [0, -.8, 0], a, 8); ball(.22, mat('#F2C9A0'), [0, -1.65, 0], a); a.userData.s = s; return a; });
  p.head = group([0, 3.5, 0], p.root); ball(.75, mat('#F2C9A0'), [0, 0, 0], p.head);
  p.eyes = []; for (const x of [-.28, .28]) { const e = group([x, .2, .66], p.head); ball(.14, mat('#FFFFFF'), [0, 0, 0], e); ball(.07, mat('#111111'), [0, 0, .1], e); p.eyes.push(e); }
  p.mouth = box(.4, .08, .05, mat('#5A2A1A'), [0, -.3, .72], p.head);
  box(1.3, .3, 1.3, mat('#3A2A1A'), [0, .7, -.1], p.head);
  p.wheels = [-1, 1].map(s => { const wg = group([s * .5, .5, 0], p.root); const tyre = cyl(.5, .5, .3, mat('#222222'), [0, 0, 0], wg, 20); tyre.rotation.z = Math.PI / 2; const hub = cyl(.22, .22, .32, mat('#C9D1D9', { metal: .3 }), [0, 0, 0], wg, 12); hub.rotation.z = Math.PI / 2; for (let i = 0; i < 3; i++) { const sp = box(.34, .06, .06, mat('#888888'), [0, 0, 0], wg); sp.rotation.x = i * Math.PI / 3; sp.position.x = s * .17; sp.rotation.y = Math.PI / 2; } return wg; });
  return p;
}
const pose = (p, out, fwd = 0) => p.arms.forEach(a => a.rotation.set(-fwd, 0, a.userData.s * out));
const roll = (p, dist) => p.wheels.forEach(w => w.rotation.x = dist / .5);

function setup(k) {
  const { mat, box, cyl, ball, cone, group } = k;
  const w = { k };
  w.ground = k.ground('#7FB069', 0);
  w.road = group(); box(400, .04, 6, mat('#5A5A5A', { rough: 1 }), [0, .02, 0], w.road); for (let i = 0; i < 40; i++) box(1.6, .05, .2, mat('#FFFFFF'), [-80 + i * 4, .03, 0], w.road);
  w.floor = k.ground('#D8C9A8', .005);
  w.wall = group(); box(40, 20, .5, mat('#E3EAF2'), [0, 10, -5], w.wall);
  w.p = person(k, k.scene, '#2FA36B'); w.pp = w.p.root;
  w.stairs = group(); for (let i = 0; i < 6; i++) box(4, .6, 1, mat('#B0B8C0'), [0, .3 + i * .6, -i * 1], w.stairs);
  w.bus = group(); box(8, 3, 2.8, mat('#FFC21F'), [0, 1.9, 0], w.bus); for (let i = 0; i < 4; i++) box(1.2, 1, .05, mat('#9FD3EE'), [-2.8 + i * 1.8, 2.4, 1.42], w.bus); for (const x of [-2.6, 2.6]) for (const z of [-1.4, 1.4]) { const wh = cyl(.6, .6, .3, mat('#222222'), [x, .6, z], w.bus, 16); wh.rotation.x = Math.PI / 2; }
  w.ramp = group(); const rm = box(4, .3, 4, mat('#A0A8B0'), [0, 1, 0], w.ramp); rm.rotation.x = -.45;
  w.lines = group(); for (let i = 0; i < 6; i++) { const l = box(1.4, .06, .06, mat('#FFFFFF', { glow: .8 }), [0, 0, 0], w.lines); l.userData.i = i; l.castShadow = false; }
  w.kid = person(k, k.scene, '#E2453C'); w.kk = w.kid.root; w.kid.wheels.forEach(x => x.visible = false); for (const s of [-1, 1]) k.box(.35, .5, .6, k.mat('#3A2A1A'), [s * .4, .25, .1], w.kk);
  return w;
}

const stand = (w, x, z, ry) => { w.pp.position.set(x, 0, z); w.pp.rotation.set(0, ry, 0); w.p.head.rotation.set(0, 0, 0); };

export default {
  id: '284',
  style: '3d',
  voice: 'v3',
  pitch: 1.5,
  case: 'THE WHEEL FEET',
  year: 'WHAT WOULD HAPPEN IF…',
  hook: ['WHAT IF HUMANS', 'HAD WHEELS?'],
  title: 'What would happen if humans had wheels for feet?',
  description: 'The school run takes ten seconds. Stairs? Absolutely not. You can race the bus. And every hill is a skate park. (A made-up body upgrade.)',
  tags: ['whatif', 'funny', 'wheels', 'superpower', 'comedy', 'shorts'],
  sources: ['Comedy sketch: wheel feet are made up. Quiz fact: the oldest known wooden wheel, found in the Ljubljana Marshes in Slovenia, is about 5,000 years old.'],
  setup,
  scenes: [
    { say: 'What if humans had wheels?', show: ['ground', 'road', 'pp', 'lines'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [0, 3.2, 12], look: [0, 4.1, 0], fov: 56, to: { pos: [0, 3.2, 11.3], look: [0, 4.1, 0], fov: 54 } },
      update: (w, p, t) => { stand(w, 0, 1, Math.PI / 2 - .5); pose(w.p, .5); roll(w.p, t * 8); w.p.head.rotation.y = -.9; w.p.mouth.scale.set(1.3, 2, 1); w.pp.rotation.z = -.08; w.lines.children.forEach(l => { const i = l.userData.i, q = (t * 2 + i / 6) % 1; l.position.set(4 - q * 9, 1 + (i % 3) * 1.1, 1.5); }); } },
    { say: 'The school run? Ten seconds.', label: '0:10', show: ['ground', 'road', 'pp', 'lines'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [6, 4, 12], look: [0, 2.6, 0], fov: 52, to: { pos: [5, 4, 11.4], look: [-1, 2.6, 0], fov: 50 } },
      update: (w, p, t) => { const x = 6 - p * 12; stand(w, x, 0, -Math.PI / 2); w.pp.rotation.z = .12; pose(w.p, .6, -.4); roll(w.p, -t * 12); w.p.head.rotation.y = 1.2; w.lines.children.forEach(l => { const i = l.userData.i, q = (t * 3 + i / 6) % 1; l.position.set(x + 1.5 + q * 3, 1 + (i % 3) * 1, 0); }); } },
    { say: 'Stairs? Absolutely not.', show: ['floor', 'wall', 'pp', 'stairs'], sky: '#E3EAF2', lightAt: [0, 6, 5], lightDist: 14,
      cam: { pos: [5, 4, 8], look: [0, 2.6, -.5], fov: 52, to: { pos: [4.6, 4, 7.4], look: [0, 2.6, -.5], fov: 50 } },
      update: (w, p, t) => { w.stairs.position.set(0, 0, -1); const c = t % 1.4, b = c < .7 ? c / .7 : 1 - (c - .7) / .7; stand(w, 0, 1.2 - b * .7, Math.PI); w.pp.rotation.x = -.15 * b; pose(w.p, .4 + .6 * b); roll(w.p, b * 3); w.p.head.rotation.y = Math.PI; w.p.mouth.scale.set(1, 1.6, 1); } },
    { say: 'The bus? You can race it.', show: ['ground', 'road', 'pp', 'bus', 'lines'], sky: '#9ED2F3', lightAt: [4, 10, 8], lightDist: 24,
      cam: { pos: [3, 4.4, 15], look: [0, 2.6, 0], fov: 54, to: { pos: [3, 4.4, 14.3], look: [0, 2.6, 0], fov: 52 } },
      update: (w, p, t) => { w.bus.position.set(-1 + p * .6, 0, -1.6); w.bus.rotation.y = 0; stand(w, 2.2 + p * 1.2, 1.6, Math.PI / 2); w.pp.rotation.z = -.12; pose(w.p, .5, .4); roll(w.p, t * 12); w.p.head.rotation.y = -1.2; w.p.mouth.scale.set(1.3, 2.2, 1); w.lines.children.forEach(l => { const i = l.userData.i, q = (t * 3 + i / 6) % 1; l.position.set(-5 + q * 4, 1 + (i % 3) * 1, 1.6); }); } },
    { say: 'And hills? Every one is a skate park.', label: '*WHEEE*', show: ['ground', 'pp', 'ramp'], sky: '#FFC27A', lightAt: [4, 10, 8], lightDist: 20,
      cam: { pos: [6, 4, 11], look: [0, 3.4, 0], fov: 54, to: { pos: [5.6, 4, 10.4], look: [0, 3.4, 0], fov: 52 } },
      update: (w, p, t) => { w.ramp.position.set(0, 0, 0); const c = (t % 1.8) / 1.8; const air = c > .45 && c < .85; const y = air ? 2.2 + Math.sin((c - .45) / .4 * Math.PI) * 2.6 : (c <= .45 ? c / .45 * 2.2 : 0); stand(w, 0, 2 - Math.min(c, .45) / .45 * 3.4, Math.PI); w.pp.position.y = y; w.pp.rotation.x = air ? -(c - .45) / .4 * Math.PI * 2 : -.4 * (c <= .45 ? 1 : 0); pose(w.p, 2.4); roll(w.p, t * 10); } },
    { say: 'Wheel feet: useful, awesome, or way too fast? Comment below.',
      quiz: { q: 'Would you want wheel feet?', options: ['Useful', 'Awesome', 'Way too fast'], answer: 'Made up. The oldest known wooden wheel is about 5,000 years old.' },
      show: ['floor', 'pp'], sky: '#274B73', lightAt: [0, 5, 4], lightDist: 12,
      cam: { pos: [1, 1, 8], look: [0, 4.6, 0], fov: 48, to: { pos: [-1, 1, 8], look: [0, 4.6, 0] } },
      update: (w, p, t) => { stand(w, .3 * Math.sin(t * 2), 0, .2); w.pp.rotation.x = 0; w.pp.rotation.z = 0; pose(w.p, .3); roll(w.p, Math.sin(t * 2) * .6); } },
  ],
};
